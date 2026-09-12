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

// Actual AdSlot + provider + policy matrix. Only framework rendering adapters
// are stubbed; no live credentials, scripts, DB or network are used.
function fixture(env = {}) {
  const cache = new Map();
  function load(relative) {
    const filename = resolve(root, relative);
    if (cache.has(filename)) return cache.get(filename);
    const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), { compilerOptions: {
      module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2020, esModuleInterop: true,
    } });
    const fixtureModule = { exports: {} };
    runInNewContext(outputText, {
      module: fixtureModule, exports: fixtureModule.exports, process: { env },
      require: name => {
        if (name === 'next/link') return function FixtureLink({ children, ...props }) { return React.createElement('a', props, children); };
        if (name === 'next/script') return function FixtureScript({ children, strategy, ...props }) { return React.createElement('script', { ...props, 'data-strategy': strategy }, children); };
        if (name.startsWith('@/components/')) return load(`${name.slice(2)}.tsx`);
        if (name.startsWith('@/lib/')) return load(`${name.slice(2)}.ts`);
        if (name === 'react/jsx-runtime' || name === 'react') return require(name);
        throw new Error(`Unexpected fixture dependency: ${name}`);
      },
    }, { filename });
    cache.set(filename, fixtureModule.exports);
    return fixtureModule.exports;
  }
  const { AdSlot } = load('components/ads/ad-slot.tsx');
  const { AdPolicyProvider } = load('components/providers/ad-policy-provider.tsx');
  return (props = {}, category = 3) => renderToStaticMarkup(React.createElement(AdPolicyProvider, { category },
    React.createElement(AdSlot, { adType: 'adsense', ...props })));
}

for (const [format, height, href] of [
  ['horizontal', 90, '/insurance/compare'], ['rectangle', 250, '/guide'],
  ['vertical', 600, '/insurance/compare'], ['auto', 100, '/guide'],
]) {
  test(`actual ${format} fallback keeps layout/link without unsupported review/count claims`, () => {
    const html = fixture()({ format, className: 'fixture-slot' });
    assert.doesNotMatch(html, /수의사 검토|전문가 검토|200\+/);
    assert.match(html, new RegExp(`min-height:${height}px`));
    assert.ok(html.includes(`href="${href}"`));
    assert.match(html, /class="fixture-slot"/);
    assert.match(html, /role="complementary" aria-label="사이트 추천"/);
    assert.doesNotMatch(html, /<ins|<script/);
  });
}

test('real category6 policy blocks every commercial ad type even with configured IDs', () => {
  const render = fixture({ NEXT_PUBLIC_ADSENSE_ID: 'ca-pub-fixture', NEXT_PUBLIC_AD_SLOT_AUTO: 'fixture-auto' });
  for (const adType of ['adsense', 'pet_insurance', 'pet_food', 'pet_service']) assert.equal(render({ adType }, 6), '');
  assert.match(render({ adType: 'memorial' }, 6), /추모 굿즈 큐레이션/);
  assert.equal(render({ adType: 'memorial' }, 3), '');
  for (const adType of ['pet_insurance', 'pet_food', 'pet_service']) assert.equal(render({ adType }, 3), '');
});

test('configured slots preserve explicit ID precedence, format, reserved height and one push', () => {
  const render = fixture({ NEXT_PUBLIC_ADSENSE_ID: 'ca-pub-fixture', NEXT_PUBLIC_AD_SLOT_RECTANGLE: 'fixture-env-slot' });
  const html = render({ format: 'rectangle', slotId: 'fixture-explicit' });
  assert.match(html, /data-ad-client="ca-pub-fixture"/);
  assert.match(html, /data-ad-slot="fixture-explicit"/);
  assert.doesNotMatch(html, /fixture-env-slot|사이트 추천/);
  assert.match(html, /data-ad-format="rectangle" data-full-width-responsive="true"/);
  assert.match(html, /min-height:250px/);
  assert.equal((html.match(/<ins /g) ?? []).length, 1);
  assert.equal((html.match(/<script /g) ?? []).length, 1);
  assert.match(html, /id="adsense-push-fixture-explicit-rectangle" data-strategy="afterInteractive"/);
  assert.match(render({ format: 'rectangle' }), /data-ad-slot="fixture-env-slot"/);
});

test('incomplete configuration remains a house promo without ad markup', () => {
  for (const env of [{ NEXT_PUBLIC_ADSENSE_ID: 'ca-pub-fixture' }, { NEXT_PUBLIC_AD_SLOT_AUTO: 'fixture-auto' }]) {
    const html = fixture(env)();
    assert.match(html, /사이트 추천/);
    assert.doesNotMatch(html, /<ins|<script/);
  }
});
