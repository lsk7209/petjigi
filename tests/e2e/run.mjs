// 격리 e2e 러너: 합성 fixture DB → production build(.next-verify) → 브라우저 테스트 6종. 운영 시크릿·DB를 쓰지 않는다.
// 사용: pnpm test:e2e   (CI에서는 CHROME_PATH 지정)
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
import { readFileSync, writeFileSync } from 'node:fs';

const root = resolve(import.meta.dirname, '../..');
const tsconfigPath = resolve(root, 'tsconfig.json');
const originalTsconfig = readFileSync(tsconfigPath, 'utf8');
const fixtureFile = resolve(root, '.seo-cache/fixtures/ads-decision.sqlite').replaceAll(String.fromCharCode(92), '/');
const env = {
  ...process.env,
  NEXT_DIST_DIR: '.next-verify',
  TURSO_DATABASE_URL: `file:${fixtureFile}`,
  TURSO_AUTH_TOKEN: '',
  NEXT_PUBLIC_ADSENSE_ID: 'ca-pub-fixture',
  // 격리 fixture: 광고 요청은 Playwright 라우트가 가로채며 실제 Google로 나가지 않는다.
  NEXT_PUBLIC_THIRD_PARTY_RUNTIME: 'production',
  NEXT_PUBLIC_CANONICAL_HOSTS: '127.0.0.1,localhost',
  NEXT_PUBLIC_AD_SLOT_HORIZONTAL: '1',
  NEXT_PUBLIC_AD_SLOT_RECTANGLE: '2',
  NEXT_PUBLIC_AD_SLOT_AUTO: '3',
};
const run = (label, args) => {
  console.log(`\n== ${label}`);
  const r = spawnSync(process.execPath, args, { cwd: root, env, stdio: 'inherit' });
  if (r.status !== 0) throw new Error(`FAILED: ${label} (exit ${r.status})`);
};
try {
  run('fixture', ['tests/e2e/create-ads-fixture.mjs']);
  run('build', ['node_modules/next/dist/bin/next', 'build']);
  for (const t of ['ads-decision', 'smoke', 'content-claims', 'core-guides', 'site-value', 'search']) run(t, [`tests/e2e/${t}.mjs`]);
  console.log('\nE2E 전체 통과');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  // Next adds isolated distDir type paths and reformats this tracked file.
  // Restore only that known generated edit; never overwrite concurrent changes.
  const before = JSON.parse(originalTsconfig);
  const current = JSON.parse(readFileSync(tsconfigPath, 'utf8'));
  const generated = ['.next-verify/types/**/*.ts', '.next-verify/dev/types/**/*.ts'];
  current.include = current.include.filter(entry => !generated.includes(entry) || before.include.includes(entry));
  if (JSON.stringify(current) === JSON.stringify(before)) writeFileSync(tsconfigPath, originalTsconfig);
  else {
    console.error('tsconfig changed outside Next generated paths; preserved for review');
    process.exitCode = 1;
  }
}
