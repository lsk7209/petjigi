// 광고 판정 브라우저 검증용 합성 fixture DB. 운영 접속·시크릿 없음.
import { createClient } from '@libsql/client';
import { mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const FIXTURE_FILE = resolve(root, '.seo-cache/fixtures/ads-decision.sqlite');
mkdirSync(dirname(FIXTURE_FILE), { recursive: true });
rmSync(FIXTURE_FILE, { force: true });
const client = createClient({ url: `file:${FIXTURE_FILE.replaceAll(String.fromCharCode(92), '/')}` });
try {
  const migrations = resolve(root, 'db/migrations');
  for (const name of readdirSync(migrations).filter(n => /^\d+.*\.sql$/.test(n)).sort()) {
    for (const sql of readFileSync(resolve(migrations, name), 'utf8').split('--> statement-breakpoint')) {
      if (sql.trim()) await client.execute(sql);
    }
  }
  const d = '2026-08-01T00:00:00.000Z';
  await client.execute({
    sql: 'INSERT INTO regions (code, sido, sido_slug, sigungu, sigungu_slug, full_name) VALUES (?,?,?,?,?,?)',
    args: ['41590', '경기도', 'gyeonggi', '화성시', 'hwaseong', '경기도 화성시'],
  });
  for (const [id, type, category, name] of [['b-funeral', 'funeral', 6, '합성추모'], ['b-vet', 'vet', 3, '합성병원']]) {
    await client.execute({
      sql: 'INSERT INTO businesses (id,type,category,name,address,address_sido,address_sigungu,status,source,last_synced_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
      args: [id, type, category, name, '경기도 화성시 합성로 1', '경기도', '화성시', 'active', 'fixture', d, d, d],
    });
  }
  await client.execute({
    sql: 'INSERT INTO contents (id,slug,type,category,title,body,author_name,status,ymyl,published_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
    args: ['c-guide', 'fixture-guide', 'guide', 5, 'QA 합성 가이드', '<h2>합성</h2><p>합성 본문입니다.</p>', 'QA', 'published', 0, d, d, d],
  });
  console.log(JSON.stringify({ FIXTURE_FILE, productionAccess: false }));
} finally {
  client.close();
}
