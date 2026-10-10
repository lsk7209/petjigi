import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ts from 'typescript';

const require = createRequire(import.meta.url);
const source = readFileSync(new URL('../components/layout/header.tsx', import.meta.url), 'utf8');
const css = readFileSync(new URL('../components/layout/header.css', import.meta.url), 'utf8');

function renderHeader(open = false) {
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, target: ts.ScriptTarget.ES2020, esModuleInterop: true } });
  const fixtureModule = { exports: {} };
  runInNewContext(outputText, { module: fixtureModule, exports: fixtureModule.exports, require: name => {
    if (name === 'next/link') return function FixtureLink({ children, ...props }) { return React.createElement('a', props, children); };
    if (name === 'react') return { ...React, useState: () => [open, () => {}], useEffect: () => {}, useRef: () => ({ current: null }) };
    if (name === 'react/jsx-runtime') return require(name);
    if (name === './header.css') return {};
    throw new Error(`Unexpected fixture dependency: ${name}`);
  } });
  return renderToStaticMarkup(React.createElement(fixtureModule.exports.Header));
}

test('header visibility rules are specific enough to beat the unlayered .pj-nav display and switch at 1100px', () => {
  assert.match(css, /\.pj-header \.pj-only-desktop \{ display: none; \}/);
  assert.match(css, /@media \(min-width: 1100px\) \{[^@]*\.pj-header \.pj-only-desktop \{ display: flex; \}[^@]*\.pj-header \.pj-only-mobile \{ display: none; \}/);
  const html = renderHeader();
  assert.match(html, /<nav class="pj-nav pj-only-desktop" aria-label="주요 메뉴"/);
  assert.match(html, /<button[^>]+class="pj-menu-btn pj-only-mobile"/);
});

test('header has the 8 spec menu links, a real GET search form and brand name', () => {
  const closed = renderHeader();
  const nav = closed.match(/<nav class="pj-nav[^>]*>(.*?)<\/nav>/)[1];
  const hrefs = ['/#hm-local', '/condition', '/category/nutrition', '/category/care', '/category/adoption', '/category/insurance', '/category/memorial', '/guide'];
  for (const href of hrefs) assert.equal(nav.split(`href="${href}"`).length - 1, 1, href);
  assert.equal((nav.match(/<a /g) ?? []).length, 8);
  const form = closed.match(/<form[^>]*>/)[0];
  for (const attr of ['action="/search"', 'method="get"', 'role="search"']) assert.ok(form.includes(attr), attr);
  const input = closed.match(/<input[^>]*>/)[0];
  for (const attr of ['type="search"', 'name="q"']) assert.ok(input.includes(attr), attr);
  assert.match(closed, /<label[^>]+for="header-search"/);
  assert.match(closed, />펫지기</);
  assert.doesNotMatch(closed, /로그인|회원가입|상담/);
});

test('mobile menu exposes aria state and repeats links plus search when open', () => {
  const closed = renderHeader();
  const open = renderHeader(true);
  assert.match(closed, /aria-label="메뉴 열기" aria-expanded="false" aria-controls="pj-mobile-menu"/);
  assert.doesNotMatch(closed, /id="pj-mobile-menu"/);
  assert.match(open, /aria-label="메뉴 닫기" aria-expanded="true"/);
  assert.match(open, /id="pj-mobile-menu"/);
  for (const href of ['/condition', '/guide', '/category/memorial']) {
    assert.equal(open.split(`href="${href}"`).length - 1, 2, href);
  }
  assert.match(open, /id="mobile-search"/);
});

test('header source closes the menu with Escape and returns focus to the trigger', () => {
  assert.match(source, /e\.key === "Escape"/);
  assert.match(source, /triggerRef\.current\?\.focus\(\)/);
});
