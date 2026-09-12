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
const emptyComponent = () => null;
const stubs = {
  'next/link': ({ children, ...props }) => React.createElement('a', props, children),
  '@/lib/db-queries': {
    getCachedStats: async () => ({ businesses: 35000, shelters: 309, rescued: 27000 }),
    getCachedRecentGuides: async () => [],
    getCachedRecentBlogPosts: async () => [],
  },
  '@/components/forms/subscribe-form': { SubscribeForm: emptyComponent },
  '@/components/ads/ad-slot': { AdSlot: emptyComponent },
  '@/components/providers/ad-policy-provider': { AdPolicyProvider: ({ children }) => children },
  '@/components/content/adsense-trust-section': { AdsenseTrustSection: emptyComponent },
};

function load(relative) {
  const filename = resolve(root, relative);
  if (cache.has(filename)) return cache.get(filename);
  const source = readFileSync(filename, 'utf8');
  const { outputText } = ts.transpileModule(source, { compilerOptions: {
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

const home = load('app/page.tsx');
const about = load('app/about/page.tsx');
const contact = load('app/contact/page.tsx');
const homeHtml = renderToStaticMarkup(await home.default());
const aboutHtml = renderToStaticMarkup(about.default());
const contactHtml = renderToStaticMarkup(contact.default());

test('rendered home keeps heading, canonical, live counts and primary routes', () => {
  assert.equal((homeHtml.match(/<h1[ >]/g) ?? []).length, 1);
  assert.equal(home.metadata.alternates.canonical, '/');
  for (const href of ['/sido/seoul', '/category/health', '/insurance', '/breed']) {
    assert.ok(homeHtml.includes(`href="${href}"`), href);
  }
  assert.ok(homeHtml.includes('35천+'));
});

test('home has no invisible FAQ or term markup', () => {
  assert.doesNotMatch(homeHtml, /"@type":"(?:FAQPage|DefinedTermSet)"/);
});

test('rendered home describes scheduled cadence without a daily freshness guarantee', () => {
  assert.match(readFileSync(resolve(root, '.github/workflows/etl-businesses.yml'), 'utf8'), /0 18 1,15 \* \*/);
  assert.match(readFileSync(resolve(root, '.github/workflows/etl-shelters.yml'), 'utf8'), /0 19 1 \* \*/);
  assert.match(readFileSync(resolve(root, '.github/workflows/etl-rescued-animals.yml'), 'utf8'), /0 20 \* \* \*/);
  assert.doesNotMatch(homeHtml, /매일 동기화|매일 갱신/);
  for (const value of ['월 2회', '월 1회', '수집을 예약', '지연']) assert.ok(homeHtml.includes(value), value);
});

test('home does not guarantee expert review based on site membership', () => {
  assert.doesNotMatch(homeHtml, /수의사 검토를 거친|수의사·변호사 검토|수의사·전문가 검토/);
});

test('about explains available review metadata and keeps existing identity/canonical', () => {
  assert.doesNotMatch(aboutHtml, /콘텐츠는 전문가 검토를 거친 후 발행합니다/);
  assert.ok(aboutHtml.includes('검토자와 검토일이 기록된 콘텐츠'));
  assert.ok(aboutHtml.includes('contact@petjigi.kr'));
  assert.equal(about.metadata.alternates.canonical, 'https://petjigi.kr/about');
});

test('contact copy and metadata preserve contact route without an unsupported review promise', () => {
  assert.doesNotMatch(contactHtml, /수의사·전문가 검토를 거친|월 2회 전문가 검토/);
  assert.doesNotMatch(contact.metadata.description, /전문가 검토/);
  assert.ok(contactHtml.includes('href="mailto:contact@petjigi.kr"'));
  assert.ok(contactHtml.includes('"@type":"ContactPage"'));
  assert.equal(contact.metadata.alternates.canonical, '/contact');
});
