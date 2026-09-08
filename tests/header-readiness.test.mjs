import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { compile } from 'tailwindcss';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const source = readFileSync(new URL('../components/layout/header.tsx', import.meta.url), 'utf8');

function renderHeader(open = false) {
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, esModuleInterop: true } });
  const fixtureModule = { exports: {} };
  runInNewContext(outputText, { module: fixtureModule, exports: fixtureModule.exports, require: name => {
    if (name === 'next/link') return function FixtureLink({ children, ...props }) { return React.createElement('a', props, children); };
    if (name === 'react') return { ...React, useState: () => [open, () => {}] };
    if (name === 'react/jsx-runtime') return require(name);
    throw new Error(`Unexpected fixture dependency: ${name}`);
  } });
  return renderToStaticMarkup(React.createElement(fixtureModule.exports.Header));
}

test('header visibility compiles above unlayered branding styles at the mobile/desktop boundary', async () => {
  const html = renderHeader();
  const navClasses = html.match(/<nav class="([^"]+)" aria-label="주요 메뉴"/)?.[1].split(' ');
  const buttonClasses = html.match(/<button[^>]+class="([^"]+)"/)?.[1].split(' ');
  assert.ok(navClasses.includes('hidden!'));
  assert.ok(navClasses.includes('md:flex!'));
  assert.ok(buttonClasses.includes('md:hidden!'));
  const compiler = await compile('@theme { --breakpoint-md: 48rem; } @tailwind utilities;');
  const css = compiler.build([...navClasses, ...buttonClasses]);
  assert.match(css, /\.hidden\\!\s*\{\s*display:\s*none\s*!important;/);
  assert.match(css, /\.md\\:flex\\!\s*\{\s*@media\s*\(width\s*>=\s*48rem\)\s*\{\s*display:\s*flex\s*!important;/);
  assert.match(css, /\.md\\:hidden\\!\s*\{\s*@media\s*\(width\s*>=\s*48rem\)\s*\{\s*display:\s*none\s*!important;/);
});

test('header retains desktop links and the closed/open mobile menu semantics', () => {
  const closed = renderHeader();
  const open = renderHeader(true);
  const hrefs = ['/blog', '/guide', '/condition', '/sido/seoul', '/insurance/compare', '/breed'];
  for (const href of hrefs) {
    assert.equal(closed.split(`href="${href}"`).length - 1, 1);
    assert.equal(open.split(`href="${href}"`).length - 1, 2);
  }
  assert.match(closed, /aria-label="메뉴 열기" aria-expanded="false"/);
  assert.match(open, /aria-label="메뉴 닫기" aria-expanded="true"/);
  assert.match(open, /overflow-x-auto/);
  assert.match(open, /<nav class="[^"]*flex flex-col/);
  assert.equal((open.match(/href="\/category\//g) ?? []).length, 6);
  assert.match(closed, /href="\/search"/);
});
