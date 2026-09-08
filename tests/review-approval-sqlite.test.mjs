import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { runInNewContext } from 'node:vm';
import test from 'node:test';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import ts from 'typescript';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const require = createRequire(import.meta.url);

// Actual installed libSQL/Drizzle and actual schema, isolated entirely in memory.
// Production db/client and all environment/credential files are never imported.
async function fixture() {
  // The driver detaches its connection for a transaction. Shared cache plus a
  // keeper keeps the same in-memory DB alive for post-commit/rollback assertions.
  const url = 'file::memory:?cache=shared';
  const keeper = createClient({ url });
  const client = createClient({ url });
  const db = drizzle(client);
  const cache = new Map();
  let schema;
  function load(relative) {
    const filename = resolve(root, relative);
    if (cache.has(filename)) return cache.get(filename);
    const mod = { exports: {} };
    const { outputText } = ts.transpileModule(readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
    });
    runInNewContext(outputText, {
      module: mod, exports: mod.exports,
      require: name => {
        if (name === 'server-only') return {};
        if (name === '@/db/client') return { db };
        if (name === '@/db/schema') return schema;
        if (name.startsWith('@/')) return load(`${name.slice(2)}.ts`);
        if (name.startsWith('.')) return load(`${resolve(dirname(filename), name)}.ts`);
        if (name === 'drizzle-orm' || name === 'drizzle-orm/sqlite-core') return require(name);
        throw new Error(`Unexpected fixture dependency: ${name}`);
      },
    }, { filename });
    cache.set(filename, mod.exports);
    return mod.exports;
  }
  schema = { ...load('db/schema/contents.ts'), ...load('db/schema/review-queue.ts') };
  await client.executeMultiple(`
    DROP TABLE IF EXISTS review_queue;
    DROP TABLE IF EXISTS contents;
    CREATE TABLE contents (
      id TEXT PRIMARY KEY, slug TEXT NOT NULL UNIQUE, type TEXT NOT NULL,
      category INTEGER NOT NULL, title TEXT NOT NULL, subtitle TEXT, meta_title TEXT,
      meta_description TEXT, body TEXT NOT NULL, author_name TEXT, author_credential TEXT,
      reviewed_at TEXT, reviewer_name TEXT, status TEXT NOT NULL, ymyl INTEGER NOT NULL,
      sources TEXT, disclaimer TEXT, published_at TEXT, created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE review_queue (
      id TEXT PRIMARY KEY, content_id TEXT NOT NULL, content_type TEXT NOT NULL,
      priority INTEGER NOT NULL, reason TEXT, assigned_to TEXT, status TEXT NOT NULL,
      notes TEXT, created_at TEXT NOT NULL, resolved_at TEXT
    );
  `);
  const time = '2026-09-01T00:00:00.000Z';
  await db.insert(schema.contents).values({
    id: 'fixture-content', slug: 'fixture-content', type: 'guide', category: 3,
    title: '검수 경로 테스트', body: '합성 테스트 본문', status: 'review_queue', ymyl: true,
    authorName: '테스트 작성자', authorCredential: '테스트 자격 기록',
    reviewerName: '테스트 검수자', reviewedAt: time,
    sources: ['테스트 출처 A', '테스트 출처 B'], disclaimer: '테스트 면책문',
    createdAt: time, updatedAt: time,
  });
  await db.insert(schema.reviewQueue).values({
    id: 'fixture-queue', contentId: 'fixture-content', contentType: 'guide',
    priority: 1, reason: 'ymyl_required', status: 'pending', createdAt: time,
  });
  return { client, keeper, db, schema, approval: load('lib/review-queue.ts') };
}

test('actual libSQL commits the reviewed content and queue together', async () => {
  const f = await fixture();
  try {
    await f.approval.approveReviewQueueItem('fixture-queue');
    const content = await f.db.select().from(f.schema.contents).get();
    const queue = await f.db.select().from(f.schema.reviewQueue).get();
    assert.equal(content.status, 'published');
    assert.equal(queue.status, 'approved');
    assert.ok(content.publishedAt);
    assert.equal(content.publishedAt, queue.resolvedAt);
    assert.equal(content.body, '합성 테스트 본문');
    assert.equal(content.reviewerName, '테스트 검수자');
  } finally { f.client.close(); f.keeper.close(); }
});

test('actual libSQL rolls content back when the queue write aborts', async () => {
  const f = await fixture();
  try {
    await f.client.execute(`CREATE TRIGGER fixture_abort_queue BEFORE UPDATE ON review_queue
      BEGIN SELECT RAISE(ABORT, 'fixture queue write abort'); END`);
    await assert.rejects(() => f.approval.approveReviewQueueItem('fixture-queue'));
    const content = await f.db.select().from(f.schema.contents).get();
    const queue = await f.db.select().from(f.schema.reviewQueue).get();
    assert.equal(content.status, 'review_queue');
    assert.equal(content.publishedAt, null);
    assert.equal(content.updatedAt, '2026-09-01T00:00:00.000Z');
    assert.equal(queue.status, 'pending');
    assert.equal(queue.resolvedAt, null);
  } finally { f.client.close(); f.keeper.close(); }
});

test('actual libSQL rejects incomplete evidence without changing either row', async () => {
  const f = await fixture();
  try {
    await f.db.update(f.schema.contents).set({ authorCredential: '   ' })
      .where(eq(f.schema.contents.id, 'fixture-content'));
    await assert.rejects(() => f.approval.approveReviewQueueItem('fixture-queue'),
      error => error.status === 422);
    const content = await f.db.select().from(f.schema.contents).get();
    const queue = await f.db.select().from(f.schema.reviewQueue).get();
    assert.equal(content.status, 'review_queue');
    assert.equal(content.publishedAt, null);
    assert.equal(queue.status, 'pending');
    assert.equal(queue.resolvedAt, null);
  } finally { f.client.close(); f.keeper.close(); }
});
