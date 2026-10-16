// Synthetic-only production-build probe. Never reads .env or production database credentials.
import { spawn, spawnSync, execFileSync } from 'node:child_process';
import { createHash, randomBytes } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = '.seo-cache/measure-build';
const output = resolve(root, '.seo-cache/db-measure');
const fixture = resolve(root, '.seo-cache/fixtures/ads-decision.sqlite').replaceAll('\\', '/');
const sourceFiles = ['db/client.ts', 'db/query-metrics.ts', 'lib/db-measured-route.ts', 'lib/db-queries.ts',
  'app/blog/[slug]/page.tsx', 'app/[sigungu]/[type]/page.tsx', 'app/[sigungu]/[type]/[slug]/page.tsx', 'app/api/search/route.ts'];
const sourceHash = () => createHash('sha256').update(sourceFiles.map(file => readFileSync(resolve(root, file))).join('\n')).digest('hex');
const initialSourceHash = sourceHash();
const env = { ...process.env, NEXT_DIST_DIR: dist, DB_QUERY_METRICS: '1',
  TURSO_DATABASE_URL: `file:${fixture}`, TURSO_AUTH_TOKEN: '',
  NEXT_PUBLIC_THIRD_PARTY_RUNTIME: 'preview', NEXT_PUBLIC_ADSENSE_ID: '', NEXT_PUBLIC_GA4_ID: '',
};
const originalTsconfig = readFileSync(resolve(root, 'tsconfig.json'), 'utf8');
const run = args => {
  const result = spawnSync(process.execPath, args, { cwd: root, env, encoding: 'utf8', maxBuffer: 32 * 1024 * 1024 });
  if (result.status !== 0) throw new Error(`Measurement preparation failed: ${args[0]}\n${result.stderr}`);
};
let server;
try {
  mkdirSync(output, { recursive: true });
  run(['tests/e2e/create-ads-fixture.mjs']);
  run(['node_modules/next/dist/bin/next', 'build']);
  const samples = [];
  const scopes = [];
  let pending = '';
  const capture = chunk => {
    pending += chunk.toString();
    const lines = pending.split('\n'); pending = lines.pop();
    for (const line of lines) {
      const index = line.indexOf('{"kind":"db-query-metrics"');
      if (index >= 0) scopes.push(JSON.parse(line.slice(index)));
    }
  };
  const port = 4318;
  const base = `http://127.0.0.1:${port}`;
  server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', String(port), '-H', '127.0.0.1'], {
    cwd: root, env, stdio: ['ignore', 'pipe', 'pipe'],
  });
  server.stdout.on('data', capture);
  server.stderr.on('data', capture);
  let ready = false;
  for (let attempt = 0; attempt < 60; attempt++) {
    if (server.exitCode !== null) throw new Error('Measurement server exited before readiness');
    try { ready = (await fetch(base + '/about', { signal: AbortSignal.timeout(2000) })).status === 200; } catch {}
    if (ready) break;
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  if (!ready) throw new Error('Measurement server not ready');
  for (const [route, path, expectedScopes] of [
    ['blog-detail', '/blog/pet-insurance-guide', 2], ['business-list', '/hwaseong/vet', 2],
    ['business-detail', `/vet/hwaseong/${encodeURIComponent('합성병원')}`, 2], ['search-api', '/api/search?q=합성', 1],
  ]) {
    for (const phase of ['first', 'repeat']) {
      const requestId = randomBytes(16).toString('hex');
      const started = performance.now();
      const response = await fetch(base + path, { headers: { 'x-db-measure-id': requestId }, signal: AbortSignal.timeout(30000) });
      await response.text();
      if (response.status !== 200) throw new Error(`${route} ${phase}: HTTP ${response.status}`);
      const requestMs = performance.now() - started;
      for (let attempt = 0; attempt < 100 && scopes.filter(scope => scope.requestId === requestId).length < expectedScopes; attempt++) {
        await new Promise(resolve => setTimeout(resolve, 20));
      }
      const selected = scopes.filter(scope => scope.requestId === requestId);
      if (selected.length !== expectedScopes) throw new Error(`Incomplete measurement scopes: ${route} ${phase}`);
      const queries = new Map();
      for (const scope of selected) for (const query of scope.queries) {
        const prior = queries.get(query.hash) ?? { ...query, count: 0, durationMs: 0, returnedRows: 0, failures: 0 };
        for (const key of ['count', 'durationMs', 'returnedRows', 'failures']) prior[key] += query[key];
        queries.set(query.hash, prior);
      }
      const queryCount = [...queries.values()].reduce((sum, query) => sum + query.count, 0);
      samples.push({ route, phase, requestMs, queryCount, duplicateQueries: queryCount - queries.size,
        returnedRows: selected.reduce((sum, scope) => sum + scope.returnedRows, 0), rowsRead: null,
        unmeasuredOperations: selected.reduce((sum, scope) => sum + scope.unmeasuredOperations, 0), queries: [...queries.values()] });
    }
  }
  if (sourceHash() !== initialSourceHash) throw new Error('Source changed during measurement; rerun with a stable source tree');
  const report = { measuredAt: new Date().toISOString(), productionAccess: false,
    commit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
    sourceHash: initialSourceHash,
    fixtureHash: createHash('sha256').update(readFileSync(fixture)).digest('hex'),
    method: 'Synthetic SQLite; opt-in production build/start; first HTTP request and repeat in one process (build may warm data caches); headers correlate metadata/page scopes. Ancillary layouts/components outside these scopes are not measured. Measurement mode makes business-detail dynamic and bypasses its normal route cache; no production route-cache/performance conclusions. Scope times overlap; requestMs measures full HTTP response separately.',
    rowsRead: 'unmeasured', samples };
  writeFileSync(resolve(output, 'report.json'), JSON.stringify(report, null, 2));
  console.table(samples.map(sample => Object.fromEntries(Object.entries(sample).filter(([key]) => key !== 'queries'))));
} finally {
  server?.kill();
  const before = JSON.parse(originalTsconfig);
  const path = resolve(root, 'tsconfig.json');
  const current = JSON.parse(readFileSync(path, 'utf8'));
  const generated = [`${dist}/types/**/*.ts`, `${dist}/dev/types/**/*.ts`];
  current.include = current.include.filter(value => !generated.includes(value) || before.include.includes(value));
  if (JSON.stringify(current) === JSON.stringify(before)) writeFileSync(path, originalTsconfig);
  else { console.error('Concurrent tsconfig change preserved'); process.exitCode = 1; }
}
