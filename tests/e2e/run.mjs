// 격리 e2e 러너: 합성 fixture DB → production build(.next-verify) → 브라우저 테스트 3종. 운영 시크릿·DB를 쓰지 않는다.
// 사용: pnpm test:e2e   (CI에서는 CHROME_PATH 지정)
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '../..');
const fixtureFile = resolve(root, '.seo-cache/fixtures/ads-decision.sqlite').replaceAll(String.fromCharCode(92), '/');
const env = {
  ...process.env,
  NEXT_DIST_DIR: '.next-verify',
  TURSO_DATABASE_URL: `file:${fixtureFile}`,
  TURSO_AUTH_TOKEN: '',
  NEXT_PUBLIC_ADSENSE_ID: 'ca-pub-fixture',
  NEXT_PUBLIC_AD_SLOT_HORIZONTAL: '1',
  NEXT_PUBLIC_AD_SLOT_RECTANGLE: '2',
  NEXT_PUBLIC_AD_SLOT_AUTO: '3',
};
const run = (label, args) => {
  console.log(`\n== ${label}`);
  const r = spawnSync(process.execPath, args, { cwd: root, env, stdio: 'inherit' });
  if (r.status !== 0) { console.error(`FAILED: ${label} (exit ${r.status})`); process.exit(r.status || 1); }
};
run('fixture', ['tests/e2e/create-ads-fixture.mjs']);
run('build', ['node_modules/next/dist/bin/next', 'build']);
for (const t of ['ads-decision', 'smoke', 'content-claims']) run(t, [`tests/e2e/${t}.mjs`]);
console.log('\nE2E 전체 통과');
