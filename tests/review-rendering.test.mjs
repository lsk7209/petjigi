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
const emptyComponent = () => null;

function renderFixture(relative, content) {
  const cache = new Map();
  const db = {
    select: () => {
      const query = {
        from: () => query,
        where: () => query,
        orderBy: () => query,
        limit: async () => [],
        get: async () => content,
      };
      return query;
    },
  };
  const stubs = {
    'next/link': ({ children, ...props }) => React.createElement('a', props, children),
    'next/navigation': { notFound: () => { throw new Error('unexpected notFound'); } },
    '@/db/client': { db },
    '@/db/schema': { contents: {} },
    'drizzle-orm': {
      and: () => undefined, desc: () => undefined, eq: () => undefined,
      gt: () => undefined, lt: () => undefined, lte: () => undefined, ne: () => undefined,
    },
    '@/components/content/ymyl-disclaimer': { YmylDisclaimer: emptyComponent },
    '@/components/ads/ad-slot': { AdSlot: emptyComponent },
    '@/components/providers/ad-policy-provider': { AdPolicyProvider: ({ children }) => children },
    '@/components/content/table-of-contents': { TableOfContents: emptyComponent },
    '@/components/content/reading-progress': { ReadingProgress: emptyComponent },
    '@/components/content/share-buttons': { ShareButtons: emptyComponent },
    '@/components/content/category-cta': { CategoryCta: emptyComponent },
    '@/components/analytics/scroll-depth-tracker': { ScrollDepthTracker: emptyComponent },
    '@/components/analytics/outbound-link-tracker': { OutboundLinkTracker: emptyComponent },
    '@/components/analytics/guide-view-tracker': { GuideViewTracker: emptyComponent },
  };

  function load(relativePath) {
    const filename = resolve(root, relativePath);
    if (cache.has(filename)) return cache.get(filename);
    const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), { compilerOptions: {
      module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2020, esModuleInterop: true,
    } });
    const fixtureModule = { exports: {} };
    runInNewContext(outputText, {
      module: fixtureModule, exports: fixtureModule.exports,
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

  return load(relative);
}

const baseContent = {
  id: 'fixture', slug: 'fixture', type: 'guide', category: 3, title: '검토 증거 테스트',
  body: '<h2>본문</h2><p>내용</p>', status: 'published', ymyl: true,
  publishedAt: '2026-09-01T00:00:00.000Z', createdAt: '2026-09-01T00:00:00.000Z',
  updatedAt: '2026-09-01T00:00:00.000Z', authorName: '펫지기 편집팀',
};

const reviewCases = [
  ['missing', {}],
  ['placeholder', { reviewerName: ' 검수 대기 ', reviewedAt: '2026-09-02T00:00:00.000Z' }],
  ['valid', { reviewerName: '홍길동 수의사', reviewedAt: '2026-09-02T00:00:00.000Z' }],
  ['offset', { reviewerName: '홍길동 수의사', reviewedAt: '2026-09-08T01:00:00+09:00' }],
];

for (const [kind, review] of reviewCases) {
  for (const [type, path] of [
    ['blog', 'app/blog/[slug]/page.tsx'],
    ['guide', 'app/guide/[slug]/page.tsx'],
  ]) {
    test(`${type} SSR ${kind} review evidence keeps header and schema aligned`, async () => {
      const page = renderFixture(path, { ...baseContent, type, ...review });
      const html = renderToStaticMarkup(await page.default({ params: Promise.resolve({ slug: 'fixture' }) }));
      const metadata = await page.generateMetadata({ params: Promise.resolve({ slug: 'fixture' }) });
      const hasEvidence = kind === 'valid' || kind === 'offset';

      assert.ok(html.includes('검토 증거 테스트'));
      assert.ok(html.includes('2026-09-01 발행'));
      assert.match(html, /<h2(?:\s[^>]*)?>본문<\/h2><p>내용<\/p>/);
      assert.ok(html.includes('주의가 필요한 정보'));
      assert.doesNotMatch(html, /전문가 검토/);
      assert.equal(metadata.alternates.canonical, `/${type}/fixture`);
      assert.doesNotMatch(metadata.description, /수의사·전문가 검토를 거친/);
      assert.ok(html.includes('"datePublished":"2026-09-01T00:00:00.000Z"'));

      if (hasEvidence) {
        assert.ok(html.includes(`${review.reviewedAt.slice(0, 10)} 홍길동 수의사 검토 정보`));
        assert.ok(html.includes('"reviewedBy":{"@type":"Person","name":"홍길동 수의사"}'));
      } else {
        assert.doesNotMatch(html, /검토 정보/);
        assert.doesNotMatch(html, /"reviewedBy"/);
      }
    });
  }
}
