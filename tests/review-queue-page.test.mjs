import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);
const key = 'synthetic-review-page-key';

function fixture(secret = key) {
  let reads = 0;
  const items = ['pending', 'approved'].map((status, i) => ({
    id: `queue-${i}`, contentId: `content-${i}`, contentType: 'guide', priority: 1,
    status, reason: 'ymyl_required', createdAt: '2026-09-01T00:00:00Z',
    assignedTo: null, notes: null, resolvedAt: null,
  }));
  function FixtureLink({ children, ...props }) { return React.createElement('a', props, children); }
  const stubs = {
    'next/link': FixtureLink,
    'next/navigation': { notFound: () => { throw new Error('notFound'); } },
    '@/db/schema': { reviewQueue: {} },
    '@/db/client': { db: { select: () => {
      reads += 1;
      return { from: () => ({ orderBy: async () => items }) };
    } } },
    'drizzle-orm': { asc: () => undefined },
    './actions': { approveContent: async () => {}, rejectContent: async () => {} },
    'server-only': {},
  };
  function load(relative) {
    const filename = resolve(root, relative);
    const mod = { exports: {} };
    const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX,
        target: ts.ScriptTarget.ES2022, esModuleInterop: true },
    });
    runInNewContext(outputText, {
      module: mod, exports: mod.exports, process: { env: { CRON_SECRET: secret } },
      require: name => {
        if (Object.hasOwn(stubs, name)) return stubs[name];
        if (name === '@/lib/admin-auth') return load('lib/admin-auth.ts');
        if (name === 'react/jsx-runtime') return require(name);
        throw new Error(`Unexpected fixture dependency: ${name}`);
      },
    }, { filename });
    return mod.exports;
  }
  return { page: load('app/admin/review-queue/page.tsx'), get reads() { return reads; } };
}

test('review queue page rejects bad keys before its database read', async () => {
  for (const [secret, supplied] of [[key, undefined], [key, 'wrong'], ['', ''], [' ', ' '], [null, 'undefined']]) {
    const f = fixture(secret);
    await assert.rejects(() => f.page.default({ searchParams: Promise.resolve({ key: supplied }) }), /notFound/);
    assert.equal(f.reads, 0);
  }
});

test('authorized review queue SSR forwards the existing key to both pending-item forms', async () => {
  const f = fixture();
  const html = renderToStaticMarkup(await f.page.default({ searchParams: Promise.resolve({ key }) }));
  assert.equal(f.reads, 1);
  assert.equal((html.match(/type="hidden" name="key"/g) || []).length, 2);
  assert.equal((html.match(new RegExp(`name="key" value="${key}"`, 'g')) || []).length, 2);
  assert.equal((html.match(/<form\b/g) || []).length, 2);
  assert.ok(html.includes('YMYL 검수 큐'));
  assert.ok(html.includes('href="/admin/analytics"'));
  assert.equal(f.page.metadata.robots.index, false);
});

test('review filter links round-trip URL-significant keys without altering form credentials', async () => {
  const specialKey = 'synthetic+key&part#fragment%20';
  const f = fixture(specialKey);
  const html = renderToStaticMarkup(await f.page.default({ searchParams: Promise.resolve({ key: specialKey }) }));
  const links = [...html.matchAll(/href="(\?key=[^"]*)"/g)];
  assert.equal(links.length, 9);
  for (const [, href] of links) {
    assert.equal(new URL(href.replaceAll('&amp;', '&'), 'https://petjigi.kr').searchParams.get('key'), specialKey);
  }
  const inputs = [...html.matchAll(/name="key" value="([^"]*)"/g)];
  assert.equal(inputs.length, 2);
  assert.ok(inputs.every(([, value]) => value.replaceAll('&amp;', '&') === specialKey));
});
