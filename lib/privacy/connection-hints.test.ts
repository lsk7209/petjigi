import fs from 'node:fs';
import assert from 'node:assert/strict';
import test from 'node:test';
test('root layout does not bypass runtime gates with unconditional third-party connection hints',()=>{
 assert.doesNotMatch(fs.readFileSync('app/layout.tsx','utf8'),/<link[^>]+(?:preconnect|dns-prefetch)[^>]+(?:googlesyndication|googletagmanager|google-analytics|kakao)/);
});
