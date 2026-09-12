import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const empty = () => null;
const baseContent = {
  id: 'fixture', slug: 'fixture', type: 'condition', category: 3, title: '검토 증거 테스트',
  body: '<h2>본문</h2><p>내용</p><h3>질문?</h3><p>답변</p>', status: 'published', ymyl: true,
  publishedAt: '2026-09-01T00:00:00.000Z', createdAt: '2026-09-01T00:00:00.000Z',
  updatedAt: '2026-09-01T00:00:00.000Z', authorName: '펫지기 편집팀', metaDescription: null,
};

function fixtureLoader(content = baseContent, conditions = []) {
  const cache = new Map();
  const query = { from: () => query, where: () => query, orderBy: () => query, limit: async () => [], get: async () => content };
  const stubs = {
    'next/link': ({ children, ...props }) => React.createElement('a', props, children),
    'next/navigation': { notFound: () => { throw new Error('unexpected notFound'); } },
    'next/og': { ImageResponse: class ImageResponse { constructor(element, options) { this.element = element; this.options = options; } } },
    '@/db/client': { db: { select: () => query } }, '@/db/schema': { contents: {} },
    'drizzle-orm': { and: () => undefined, desc: () => undefined, eq: () => undefined, lte: () => undefined, ne: () => undefined },
    '@/lib/db-queries': { getCachedAllConditions: async () => conditions },
    '@/components/content/ymyl-disclaimer': { YmylDisclaimer: empty }, '@/components/ads/ad-slot': { AdSlot: empty },
    '@/components/providers/ad-policy-provider': { AdPolicyProvider: ({ children }) => children },
    '@/components/content/table-of-contents': { TableOfContents: empty }, '@/components/content/reading-progress': { ReadingProgress: empty },
    '@/components/content/share-buttons': { ShareButtons: empty }, '@/components/content/category-cta': { CategoryCta: empty },
    '@/components/analytics/scroll-depth-tracker': { ScrollDepthTracker: empty }, '@/components/analytics/outbound-link-tracker': { OutboundLinkTracker: empty },
    '@/components/analytics/condition-view-tracker': { ConditionViewTracker: empty },
  };
  function filenameFor(path) {
    if (extname(path)) return path;
    for (const extension of ['.ts', '.tsx']) { const candidate = `${path}${extension}`; try { readFileSync(candidate); return candidate; } catch {} }
    return `${path}.ts`;
  }
  function load(relative) {
    const filename = filenameFor(resolve(root, relative));
    if (cache.has(filename)) return cache.get(filename);
    const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, esModuleInterop: true } });
    const fixtureModule = { exports: {} };
    runInNewContext(outputText, { module: fixtureModule, exports: fixtureModule.exports, process: { env: { NEXT_PUBLIC_SITE_URL: 'https://petjigi.kr' } }, require: name => {
      if (Object.hasOwn(stubs, name)) return stubs[name];
      if (name.startsWith('@/')) return load(name.slice(2));
      if (name.startsWith('.')) return load(resolve(dirname(filename), name));
      if (name === 'react/jsx-runtime' || name === 'react') return require(name);
      throw new Error(`Unexpected fixture dependency: ${name}`);
    } }, { filename });
    cache.set(filename, fixtureModule.exports); return fixtureModule.exports;
  }
  return load;
}

for (const [kind, review] of [
  ['missing', {}], ['placeholder', { reviewerName: ' 검수 대기 ', reviewedAt: '2026-09-02T00:00:00.000Z' }],
  ['invalid-date', { reviewerName: '홍길동 수의사', reviewedAt: '2026-02-30T00:00:00.000Z' }],
  ['valid', { reviewerName: '홍길동 수의사', reviewedAt: '2026-09-02T00:00:00.000Z' }],
  ['timezone-offset', { reviewerName: '홍길동 수의사', reviewedAt: '2026-09-08T01:00:00+09:00' }],
]) {
  test(`condition SSR ${kind} review evidence has header/schema/date parity`, async () => {
    const page = fixtureLoader({ ...baseContent, ...review })('app/condition/[slug]/page.tsx');
    const html = renderToStaticMarkup(await page.default({ params: Promise.resolve({ slug: 'fixture' }) }));
    const metadata = await page.generateMetadata({ params: Promise.resolve({ slug: 'fixture' }) });
    assert.ok(html.includes('검토 증거 테스트') && html.includes('2026-09-01 발행') && html.includes('펫지기 편집팀'));
    assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
    assert.ok(html.includes('주의가 필요한 정보'));
    assert.match(html, /<h2 id="[^"]+">본문<\/h2><p>내용<\/p>/);
    assert.equal(metadata.alternates.canonical, '/condition/fixture');
    assert.doesNotMatch(metadata.description, /전문가 검토/);
    assert.ok(html.includes('"datePublished":"2026-09-01T00:00:00.000Z"'));
    if (kind === 'valid' || kind === 'timezone-offset') {
      assert.ok(html.includes(`${review.reviewedAt.slice(0, 10)} 홍길동 수의사 검토 정보`));
      assert.ok(html.includes('"reviewedBy":{"@type":"Person","name":"홍길동 수의사"}'));
    } else {
      assert.doesNotMatch(html, /검토 정보|"reviewedBy"/);
    }
  });
}

test('condition detail preserves a stored meta description', async () => {
  const page = fixtureLoader({ ...baseContent, metaDescription: '저장된 설명' })('app/condition/[slug]/page.tsx');
  const metadata = await page.generateMetadata({ params: Promise.resolve({ slug: 'fixture' }) });
  assert.equal(metadata.description, '저장된 설명');
});

test('condition hub metadata and schemas avoid unsupported review claims and invisible FAQ/terms', async () => {
  const page = fixtureLoader(baseContent, [{ slug: 'dog-fixture', title: '테스트 질환', metaDescription: '설명' }])('app/condition/page.tsx');
  const html = renderToStaticMarkup(await page.default());
  assert.equal(page.metadata.alternates.canonical, '/condition');
  assert.doesNotMatch(page.metadata.title, /수의사 검토/);
  assert.doesNotMatch(page.metadata.description, /수의사 검토|전문가 검토/);
  assert.doesNotMatch(html, /수의사 검토|전문가 검토|DefinedTermSet/);
  assert.doesNotMatch(html, /"@type":"FAQPage"|반려동물 질병 정보는 어떤 기준으로 작성되나요\?|질병 증상이 의심될 때 어떻게 해야 하나요\?/);
});

function collectText(node, output = []) {
  if (typeof node === 'string') output.push(node);
  if (node && typeof node === 'object') React.Children.forEach(node.props?.children, child => collectText(child, output));
  return output.join('');
}

test('condition popular links only include available records without changing cards or schema', async () => {
  const conditions = [
    { slug: 'cat-flutd', title: '고양이 FLUTD', metaDescription: '현재 발행된 항목' },
    { slug: 'dog-heartworm', title: '심장사상충', metaDescription: '발행된 항목' },
    { slug: 'other-published-condition', title: '기록 기반 카드', metaDescription: '설명' },
  ];
  const page = fixtureLoader(baseContent, conditions)('app/condition/page.tsx');
  const html = renderToStaticMarkup(await page.default());
  const popular = html.match(/<section[^>]+aria-label="인기 질환"[^>]*>([\s\S]*?)<\/section>/)?.[1];
  assert.ok(popular);
  assert.deepEqual([...popular.matchAll(/href="([^"]+)"/g)].map(match => match[1]), ['/condition/cat-flutd', '/condition/dog-heartworm']);
  assert.match(popular, /🚽 고양이 FLUTD/);
  assert.match(popular, /🦟 심장사상충/);
  assert.doesNotMatch(html, /href="\/condition\/dog-patellar-luxation"/);
  for (const condition of conditions) assert.ok(html.includes(`href="/condition/${condition.slug}"`));
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
  assert.equal(page.metadata.alternates.canonical, '/condition');
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
  const items = schemas.find(schema => schema['@type'] === 'ItemList').itemListElement;
  assert.deepEqual(items.map(item => item.url), conditions.map(condition => `https://petjigi.kr/condition/${condition.slug}`));
});

test('condition empty list keeps preparation message without dangling popular navigation', async () => {
  const page = fixtureLoader(baseContent, [])('app/condition/page.tsx');
  const html = renderToStaticMarkup(await page.default());
  assert.match(html, /질환 정보를 준비 중입니다\./);
  assert.doesNotMatch(html, /aria-label="인기 질환"|href="\/condition\/|"@type":"ItemList"/);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
});

test('condition OG routes use neutral labels with unchanged PNG dimensions', async () => {
  const hub = fixtureLoader()('app/condition/opengraph-image.tsx');
  const detail = fixtureLoader(baseContent)('app/condition/[slug]/opengraph-image.tsx');
  const hubImage = hub.default();
  const detailImage = await detail.default({ params: Promise.resolve({ slug: 'fixture' }) });
  for (const image of [hubImage, detailImage]) {
    assert.equal(image.options.width, 1200); assert.equal(image.options.height, 630);
    const text = collectText(image.element);
    assert.ok(text.trim().length > 0);
    assert.doesNotMatch(text, /수의사 검토|전문가 검토/);
  }
  assert.notEqual(hub.runtime, 'edge'); assert.notEqual(detail.runtime, 'edge');
  assert.equal(hub.contentType, 'image/png'); assert.equal(detail.contentType, 'image/png');
});
