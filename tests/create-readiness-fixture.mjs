// Local synthetic records only. Never reads production credentials or seed scripts.
import { createClient } from '@libsql/client';
import { existsSync, mkdirSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const fixtureFile = resolve(root, '.seo-cache/fixtures/readiness-20260908.sqlite');
if (existsSync(fixtureFile)) throw new Error('Fixture exists; preserve and inspect instead of overwriting');
mkdirSync(dirname(fixtureFile), { recursive: true });
const url = `file:${fixtureFile.replaceAll('\\', '/')}`;
const client = createClient({ url });
try {
  const migrations = resolve(root, 'db/migrations');
  for (const name of readdirSync(migrations).filter(name => /^\d+.*\.sql$/.test(name)).sort()) {
    for (const sql of readFileSync(resolve(migrations, name), 'utf8').split('--> statement-breakpoint')) {
      if (sql.trim()) await client.execute(sql);
    }
  }
  const date = '2026-08-01T00:00:00.000Z';
  for (const [type, slug, reviewerName, reviewedAt, ymyl] of [
    ['blog', 'dog-pancreatitis-symptoms-diet', '검수 대기', null, 1],
    ['guide', 'dog-parasite-prevention-guide', null, null, 0],
    ['blog', 'qa-blog-review-recorded', 'QA Example Reviewer', date, 1],
    ['guide', 'qa-guide-review-recorded', 'QA Example Reviewer', date, 1],
  ]) {
    await client.execute({
      sql: 'INSERT INTO contents (id, slug, type, category, title, body, author_name, reviewer_name, reviewed_at, status, ymyl, published_at, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      args: [`qa-${slug}`, slug, type, ymyl ? 3 : 5, `QA fixture: ${slug}`,
        '<h2>Local QA fixture</h2><p>Synthetic UI test record. Not editorial or medical guidance.</p>',
        'QA Example Editor', reviewerName, reviewedAt, 'published', ymyl, date, date, date],
    });
  }
  console.log(JSON.stringify({ fixtureFile, url, syntheticContentRows: 4, productionAccess: false }));
} finally {
  client.close();
}
