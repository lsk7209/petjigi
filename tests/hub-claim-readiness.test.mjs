import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const cache = new Map();
const records = [
  { slug: 'fixture-health', title: '보존할 건강 제목', category: 3, ymyl: true, publishedAt: '2026-09-01', metaDescription: '원래 설명', authorName: '기록된 작성자' },
  { slug: 'fixture-care', title: '보존할 케어 제목', category: 5, ymyl: false, publishedAt: '2026-09-02', metaDescription: '다른 설명' },
];
const stubs = {
  'next/link': ({ children, ...props }) => React.createElement('a', props, children),
  'next/navigation': { notFound: () => { throw new Error('NOT_FOUND'); } },
  'next/og': { ImageResponse: class { constructor(element, options) { this.element = element; this.options = options; } } },
  '@/lib/db-queries': { getCachedAllGuides: async () => records, getCachedAllBlogPosts: async () => records },
  '@/components/ads/ad-slot': { AdSlot: () => null },
  '@/components/providers/ad-policy-provider': { AdPolicyProvider: ({ children }) => children },
  '@/components/content/ymyl-disclaimer': { YmylDisclaimer: () => null },
};

function load(relative) {
  const filename = resolve(root, relative);
  if (cache.has(filename)) return cache.get(filename);
  const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), { compilerOptions: {
    module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
    target: ts.ScriptTarget.ES2020, esModuleInterop: true,
  } });
  const fixtureModule = { exports: {} };
  runInNewContext(outputText, {
    module: fixtureModule, exports: fixtureModule.exports, URLSearchParams,
    process: { env: { NEXT_PUBLIC_SITE_URL: 'https://petjigi.kr' } },
    require: name => {
      if (Object.hasOwn(stubs, name)) return stubs[name];
      if (name.startsWith('@/lib/')) return load(`${name.slice(2)}.ts`);
      if (name.startsWith('.')) return load(`${resolve(dirname(filename), name)}.ts`);
      if (name === 'react/jsx-runtime' || name === 'react') return require(name);
      throw new Error(`Unexpected fixture dependency: ${name}`);
    },
  }, { filename });
  cache.set(filename, fixtureModule.exports);
  return fixtureModule.exports;
}

const guide = load('app/guide/page.tsx');
const blog = load('app/blog/page.tsx');
const insurance = load('app/insurance/page.tsx');
const guideHtml = renderToStaticMarkup(await guide.default());
const blogHtml = renderToStaticMarkup(await blog.default({ searchParams: Promise.resolve({}) }));
const schemas = html => [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map(match => JSON.parse(match[1]));
const visibleText = html => html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ');
const unsupported = /전문가 검토|수의사 검토|수의사·전문가 검토|전문가 검수/;

test('guide hub keeps records, links, heading and canonical without category-as-review badge', () => {
  assert.equal((guideHtml.match(/<h1[ >]/g) ?? []).length, 1);
  assert.equal(guide.metadata.alternates.canonical, '/guide');
  for (const row of records) {
    assert.ok(guideHtml.includes(row.title));
    assert.ok(guideHtml.includes(`href="/guide/${row.slug}"`));
    assert.ok(guideHtml.includes(row.metaDescription));
  }
  assert.equal((visibleText(guideHtml).match(/주의가 필요한 정보/g) ?? []).length, 1);
  assert.doesNotMatch(guideHtml, unsupported);
  assert.doesNotMatch(JSON.stringify(guide.metadata), unsupported);
});

test('guide FAQ markup matches visible questions and answers, with no hidden term definitions', () => {
  const data = schemas(guideHtml);
  assert.ok(data.some(s => s['@type'] === 'BreadcrumbList'));
  assert.ok(data.some(s => s['@type'] === 'ItemList'));
  assert.ok(!data.some(s => s['@type'] === 'DefinedTermSet'));
  const faq = data.find(s => s['@type'] === 'FAQPage');
  assert.equal(faq.mainEntity.length, 3);
  const visible = visibleText(guideHtml);
  for (const q of faq.mainEntity) {
    assert.ok(visible.includes(q.name), q.name);
    assert.ok(visible.includes(q.acceptedAnswer.text), q.acceptedAnswer.text);
  }
  assert.doesNotMatch(visible, /정기적으로 검토합니다/);
});

test('blog category labels and guide links do not assert expert review', async () => {
  assert.doesNotMatch(blogHtml, unsupported);
  assert.equal((visibleText(blogHtml).match(/주의가 필요한 정보/g) ?? []).length, 1);
  assert.equal((blogHtml.match(/<h1[ >]/g) ?? []).length, 1);
  assert.ok(blogHtml.includes('href="/guide"'));
  for (const row of records) assert.ok(blogHtml.includes(`href="/blog/${row.slug}"`));
  const filtered = renderToStaticMarkup(await blog.default({ searchParams: Promise.resolve({ cat: '3' }) }));
  assert.ok(filtered.includes('보존할 건강 제목'));
  assert.ok(!filtered.includes('보존할 케어 제목'));
  const metadata = await blog.generateMetadata({ searchParams: Promise.resolve({ cat: '3', q: '건강' }) });
  assert.equal(metadata.alternates.canonical, '/blog?cat=3');
  assert.equal(metadata.robots.index, false);
  const searched = renderToStaticMarkup(await blog.default({ searchParams: Promise.resolve({ q: '건강' }) }));
  assert.match(searched, /<a href="\/blog"[^>]*aria-label="검색 초기화"/);
  assert.ok(searched.includes('보존할 건강 제목'));
  assert.ok(!searched.includes('보존할 케어 제목'));
});

test('insurance metadata is neutral and existing page/navigation remain available', () => {
  assert.doesNotMatch(JSON.stringify(insurance.metadata), unsupported);
  assert.equal(insurance.metadata.alternates.canonical, '/insurance');
  const html = renderToStaticMarkup(insurance.default());
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1);
  assert.ok(html.includes('href="/insurance/compare"'));
  assert.ok(schemas(html).some(s => s['@type'] === 'FAQPage'));
});

for (const relative of ['app/insurance/opengraph-image.tsx', 'app/insurance/compare/opengraph-image.tsx']) {
  test(`actual OG element tree has neutral copy and unchanged image contract: ${relative}`, () => {
    const og = load(relative);
    const response = og.default();
    const html = renderToStaticMarkup(response.element);
    assert.doesNotMatch(html, unsupported);
    assert.match(html, /보험·법률 정보/);
    assert.ok(html.includes('petjigi.kr'));
    assert.equal(og.runtime, 'edge');
    assert.equal(og.contentType, 'image/png');
    assert.equal(response.options.width, 1200);
    assert.equal(response.options.height, 630);
  });
}

test('insurer OG awaits Next 16 Promise params for every known insurer and rejects unknown insurers', async () => {
  const og = load('app/insurance/[insurer]/opengraph-image.tsx');
  for (const [insurer, name] of Object.entries({ hyundai: '현대해상', db: 'DB손보', kb: 'KB손보', samsung: '삼성화재', hanwha: '한화손보', meritz: '메리츠화재' })) {
    const response = await og.default({ params: Promise.resolve({ insurer }) });
    const html = renderToStaticMarkup(response.element);
    assert.ok(html.includes(name), insurer);
    assert.doesNotMatch(html, unsupported);
    assert.equal(response.options.width, 1200);
    assert.equal(response.options.height, 630);
  }
  assert.equal(og.runtime, 'edge');
  assert.equal(og.contentType, 'image/png');
  await assert.rejects(() => og.default({ params: Promise.resolve({ insurer: 'unknown-fixture' }) }), /NOT_FOUND/);
});
