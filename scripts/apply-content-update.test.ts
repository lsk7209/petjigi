import assert from "node:assert/strict";
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { createClient } from "@libsql/client";
import { buildUpdate, changes, restoreChanges, seedRecords } from "./apply-content-update";

test("seed parser distinguishes omitted disclaimer from explicit null and reads a literal update date", () => {
  const dir = mkdtempSync(path.join(tmpdir(), "petjigi-seeds-"));
  try {
    writeFileSync(path.join(dir, "sample.ts"), `const rows = [
      {id: "a", slug: "explicit", title: "A title", metaTitle: "A meta title", subtitle: null, body: "<p>A</p>", disclaimer: null, updatedAt: "2026-10-11T12:00:00.000Z"},
      {id: "b", slug: "absent", body: "<p>B</p>", metaTitle: GENERATED_META, updatedAt: NOW},
    ];`);
    assert.deepEqual(seedRecords("explicit", dir), [{
      id: "a", body: "<p>A</p>", metaDescription: undefined, sources: undefined,
      disclaimer: null, updatedAt: "2026-10-11T12:00:00.000Z", title: "A title", metaTitle: "A meta title", subtitle: null,
    }]);
    assert.equal(seedRecords("absent", dir)[0].title, undefined);
    assert.equal(seedRecords("absent", dir)[0].metaTitle, undefined);
    assert.equal(seedRecords("absent", dir)[0].subtitle, undefined);
    assert.equal(seedRecords("absent", dir)[0].disclaimer, undefined);
    assert.equal(seedRecords("absent", dir)[0].updatedAt, undefined);
  } finally { rmSync(dir, { recursive: true, force: true }); }
});

test("apply changes include explicit null disclaimer and fixed updatedAt; CAS guards their snapshots", () => {
  const current = { body: "old", metaDescription: "meta", sources: "[]", disclaimer: "old note", updatedAt: "2026-10-01T00:00:00.000Z", title: "old title", metaTitle: "old meta", subtitle: "old subtitle" };
  const next = { body: "new", metaDescription: undefined, sources: undefined, disclaimer: null, updatedAt: "2026-10-11T12:00:00.000Z" };
  const keys = changes(current, next);
  assert.deepEqual(keys, ["body", "disclaimer", "updatedAt"]);
  const update = buildUpdate(keys, current, next, "a", "explicit");
  assert.match(update.sql, /disclaimer = \?/);
  assert.match(update.sql, /updated_at = \?/);
  assert.match(update.sql, /disclaimer IS \?/);
  assert.match(update.sql, /updated_at IS \?/);
  assert.deepEqual(update.args.slice(0, 3), ["new", null, "2026-10-11T12:00:00.000Z"]);
  assert.deepEqual(update.args.slice(-2), ["old note", "2026-10-01T00:00:00.000Z"]);
});

test("legacy restore omits missing columns while new backups restore null and original timestamp", () => {
  const current = { body: "new", metaDescription: "meta", sources: "[]", disclaimer: "new note", updatedAt: "2026-10-11T12:00:00.000Z", title: "new title", metaTitle: "new meta title", subtitle: "new subtitle" };
  assert.deepEqual(restoreChanges(current, { body: "old", metaDescription: null, sources: "[]" }), ["body", "metaDescription"]);
  assert.deepEqual(restoreChanges(current, {
    body: "old", metaDescription: null, sources: "[]", disclaimer: null, updatedAt: "2026-10-01T00:00:00.000Z",
  }), ["body", "metaDescription", "disclaimer", "updatedAt"]);
  assert.deepEqual(restoreChanges(current, { ...current, title: "old title", metaTitle: null, subtitle: null }), ["title", "metaTitle", "subtitle"]);
});

test("title, meta title, and subtitle updates guard concurrent edits", () => {
  const current = { body: "body", metaDescription: null, sources: null, disclaimer: null, updatedAt: "date", title: "old title", metaTitle: "old meta", subtitle: "old subtitle" };
  const next = { title: "new title", metaTitle: "new meta", subtitle: null };
  assert.deepEqual(changes(current, next), ["title", "metaTitle", "subtitle"]);
  const update = buildUpdate(changes(current, next), current, next, "a", "explicit");
  assert.match(update.sql, /title = \?, meta_title = \?, subtitle = \?/);
  assert.match(update.sql, /title IS \? AND meta_title IS \? AND subtitle IS \?/);
  assert.deepEqual(update.args.slice(-3), ["old title", "old meta", "old subtitle"]);
  const snapshotUpdate = buildUpdate(["body"], current, { body: "new body" }, "a", "explicit", true, current);
  for (const column of ["body", "meta_description", "sources", "disclaimer", "updated_at", "title", "meta_title", "subtitle"])
    assert.match(snapshotUpdate.sql, new RegExp(`${column} IS \\?`), column);
});

test("local SQLite apply and restore preserve publication and review metadata; stale CAS fails", async () => {
  const client = createClient({ url: ":memory:" });
  try {
    await client.execute("CREATE TABLE contents (id TEXT PRIMARY KEY, slug TEXT, status TEXT, published_at TEXT, reviewer_name TEXT, reviewed_at TEXT, title TEXT, meta_title TEXT, subtitle TEXT, body TEXT, meta_description TEXT, sources TEXT, disclaimer TEXT, updated_at TEXT)");
    await client.execute({ sql: "INSERT INTO contents VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", args: [
      "a", "explicit", "published", "2026-05-01T00:00:00.000Z", "Reviewer", "2026-04-30T00:00:00.000Z",
      "old title", "old meta", "old subtitle", "old", "meta", "[]", "old note", "2026-10-01T00:00:00.000Z",
    ] });
    const current = { body: "old", metaDescription: "meta", sources: "[]", disclaimer: "old note", updatedAt: "2026-10-01T00:00:00.000Z", title: "old title", metaTitle: "old meta", subtitle: "old subtitle" };
    const next = { body: "new", disclaimer: null, updatedAt: "2026-10-11T12:00:00.000Z", title: "new title", metaTitle: "new meta", subtitle: null };
    const update = buildUpdate(changes(current, next), current, next, "a", "explicit");
    assert.equal((await client.execute(update)).rowsAffected, 1);
    assert.equal((await client.execute(update)).rowsAffected, 0, "stale snapshot rejected");
    const restore = buildUpdate(restoreChanges({ ...current, ...next }, current), { ...current, ...next }, current, "a", "explicit", false);
    assert.equal((await client.execute(restore)).rowsAffected, 1);
    const row = (await client.execute("SELECT * FROM contents")).rows[0];
    assert.equal(row.body, "old");
    assert.equal(row.title, "old title");
    assert.equal(row.meta_title, "old meta");
    assert.equal(row.subtitle, "old subtitle");
    assert.equal(row.disclaimer, "old note");
    assert.equal(row.updated_at, "2026-10-01T00:00:00.000Z");
    assert.equal(row.status, "published");
    assert.equal(row.published_at, "2026-05-01T00:00:00.000Z");
    assert.equal(row.reviewer_name, "Reviewer");
    assert.equal(row.reviewed_at, "2026-04-30T00:00:00.000Z");
    const guarded = buildUpdate(["body"], current, {
      body: "new", disclaimer: current.disclaimer, updatedAt: current.updatedAt,
    }, "a", "explicit");
    await client.execute("UPDATE contents SET disclaimer = 'concurrent note' WHERE id = 'a'");
    assert.equal((await client.execute(guarded)).rowsAffected, 0, "stale disclaimer rejected");
    await client.execute("UPDATE contents SET disclaimer = 'old note', updated_at = '2026-10-02T00:00:00.000Z' WHERE id = 'a'");
    assert.equal((await client.execute(guarded)).rowsAffected, 0, "stale updatedAt rejected");
    await client.execute("UPDATE contents SET updated_at = '2026-10-01T00:00:00.000Z', title = 'concurrent title' WHERE id = 'a'");
    const titleGuarded = buildUpdate(["body"], current, { body: "new", title: "new title", metaTitle: "new meta" }, "a", "explicit");
    assert.equal((await client.execute(titleGuarded)).rowsAffected, 0, "stale title rejected");
    await client.execute("UPDATE contents SET title = 'old title', meta_title = 'concurrent meta' WHERE id = 'a'");
    assert.equal((await client.execute(titleGuarded)).rowsAffected, 0, "stale meta title rejected");
    await client.execute("UPDATE contents SET meta_title = 'old meta', subtitle = 'concurrent subtitle' WHERE id = 'a'");
    const subtitleGuarded = buildUpdate(["body"], current, { body: "new", subtitle: null }, "a", "explicit");
    assert.equal((await client.execute(subtitleGuarded)).rowsAffected, 0, "stale subtitle rejected");
    await client.execute("UPDATE contents SET title = 'live title', meta_title = 'live meta', subtitle = 'live subtitle', body = 'changed body' WHERE id = 'a'");
    const live = { ...current, title: "live title", metaTitle: "live meta", subtitle: "live subtitle", body: "changed body" };
    const oldBackup = { body: "old", metaDescription: current.metaDescription, sources: current.sources };
    assert.equal((await client.execute(buildUpdate(restoreChanges(live, oldBackup), live, oldBackup, "a", "explicit", false))).rowsAffected, 1);
    const legacyRow = (await client.execute("SELECT title, meta_title, subtitle, body FROM contents")).rows[0];
    assert.deepEqual([legacyRow.title, legacyRow.meta_title, legacyRow.subtitle, legacyRow.body], ["live title", "live meta", "live subtitle", "old"]);
  } finally { client.close(); }
});

test("CLI refuses old or stale backup files without modifying local SQLite or evidence", async () => {
  const dir = mkdtempSync(path.join(tmpdir(), "petjigi-apply-"));
  const slug = "memorial-ceremony";
  const seed = seedRecords(slug).find((record) => record.id === "seed-guide-memorial-ceremony");
  assert.ok(seed);
  const current = { body: "before", metaDescription: "before meta", sources: "[]", disclaimer: "before disclaimer", updatedAt: "2026-10-01T00:00:00.000Z", title: "before title", metaTitle: "before meta title", subtitle: "before subtitle" };
  const dbFile = path.join(dir, "fixture.sqlite");
  const url = `file:${dbFile.replaceAll("\\", "/")}`;
  const backupFile = path.join(dir, `${slug}.${seed.id}.content.json`);
  try {
    const sql = (statement: string, args: (string | null)[] = []) => {
      const code = `import { createClient } from '@libsql/client';
        const db = createClient({ url: process.argv[1] });
        try { const result = await db.execute({ sql: process.argv[2], args: JSON.parse(process.argv[3]) });
          console.log(JSON.stringify(result.rows)); } finally { await db.close(); }`;
      const result = spawnSync(process.execPath, ["--input-type=module", "-e", code, url, statement, JSON.stringify(args)], {
        cwd: process.cwd(), encoding: "utf8",
      });
      assert.equal(result.status, 0, result.stderr);
      return JSON.parse(result.stdout);
    };
    sql("CREATE TABLE contents (id TEXT PRIMARY KEY, slug TEXT, status TEXT, title TEXT, meta_title TEXT, subtitle TEXT, body TEXT, meta_description TEXT, sources TEXT, disclaimer TEXT, updated_at TEXT)");
    sql("INSERT INTO contents VALUES (?,?,?,?,?,?,?,?,?,?,?)", [
      seed.id, slug, "published", current.title, current.metaTitle, current.subtitle, current.body, current.metaDescription, current.sources, current.disclaimer, current.updatedAt,
    ]);
    const run = (args = ["--apply", slug]) => {
      const result = spawnSync(process.execPath, ["node_modules/tsx/dist/cli.mjs", "scripts/apply-content-update.ts", ...args], {
        cwd: process.cwd(), encoding: "utf8",
        env: { ...process.env, TURSO_DATABASE_URL: url, TURSO_AUTH_TOKEN: "", BACKUP_DIR: dir },
      });
      assert.equal(result.status, 0, result.stderr);
      return JSON.parse(result.stdout).results;
    };
    const readRow = () => sql("SELECT title, meta_title, subtitle, body FROM contents")[0];
    const expectedFile = path.join(dir, "expected.json");
    const manifestFile = path.join(dir, "manifest.json");
    const rawSnapshot = sql("SELECT * FROM contents")[0];
    writeFileSync(expectedFile, JSON.stringify([rawSnapshot]));
    writeFileSync(manifestFile, JSON.stringify({ entries: [{ id: seed.id, slug, changedFields: ["body", "unknownField"] }] }));
    const dryRun = run(["--expected-snapshot", expectedFile, "--manifest", manifestFile, slug]);
    assert.equal(dryRun.length, 1, "option paths are not parsed as slugs");
    assert.equal(dryRun[0].result, "would_update");
    assert.deepEqual(dryRun[0].changes.map((change: { column: string }) => change.column), ["body"]);
    assert.equal(readRow().body, current.body);
    assert.equal(readFileSync(expectedFile, "utf8"), JSON.stringify([rawSnapshot]));
    assert.equal(run(["--apply", "--expected-snapshot", expectedFile, "--manifest", manifestFile, slug])[0].result, "updated");
    assert.equal(readRow().body, seed.body);
    assert.equal(readRow().title, current.title, "body-only manifest preserves live title");
    assert.equal(readRow().meta_title, current.metaTitle, "body-only manifest preserves live meta title");
    assert.equal(readRow().subtitle, current.subtitle, "body-only manifest preserves live subtitle");
    assert.equal(sql("SELECT updated_at FROM contents")[0].updated_at, current.updatedAt, "body-only manifest preserves live update date");
    assert.equal(run(["--apply", "--expected-snapshot", expectedFile, slug])[0].result, "skip_snapshot_conflict");
    assert.equal(run(["--restore", "--yes", "--expected-snapshot", expectedFile, slug])[0].result, "skip_snapshot_conflict");
    const originalBackup = readFileSync(backupFile, "utf8");
    assert.deepEqual(JSON.parse(originalBackup), current);
    sql("UPDATE contents SET title = ?, meta_title = ?, subtitle = ?, body = ?, meta_description = ?, sources = ?, disclaimer = ?, updated_at = ? WHERE id = ?", [
      current.title, current.metaTitle, current.subtitle, current.body, current.metaDescription, current.sources, current.disclaimer, current.updatedAt, seed.id,
    ]);
    writeFileSync(expectedFile, JSON.stringify([{ ...rawSnapshot, body: "stale" }]));
    assert.equal(run(["--apply", "--expected-snapshot", expectedFile, slug])[0].result, "skip_snapshot_conflict");
    assert.equal(readRow().body, current.body);
    assert.equal(readFileSync(backupFile, "utf8"), originalBackup);
    writeFileSync(expectedFile, JSON.stringify([rawSnapshot]));
    writeFileSync(manifestFile, JSON.stringify({ entries: [] }));
    assert.equal(run(["--apply", "--expected-snapshot", expectedFile, "--manifest", manifestFile, slug])[0].result, "skip_manifest_conflict");
    assert.equal(readRow().body, current.body);
    assert.equal(readFileSync(backupFile, "utf8"), originalBackup);
    writeFileSync(manifestFile, JSON.stringify({ entries: [
      { id: seed.id, slug, changedFields: ["body"] }, { id: seed.id, slug, changedFields: ["body"] },
    ] }));
    assert.equal(run(["--apply", "--expected-snapshot", expectedFile, "--manifest", manifestFile, slug])[0].result, "skip_manifest_conflict");
    assert.equal(readRow().body, current.body);
    writeFileSync(expectedFile, "[]");
    assert.equal(run(["--apply", "--expected-snapshot", expectedFile, slug])[0].result, "skip_snapshot_conflict");
    assert.equal(run(["--apply", "--expected-snapshot", expectedFile, "missing-slug"])[0].result, "skip_snapshot_conflict");
    assert.equal(readRow().body, current.body);
    assert.equal(readFileSync(backupFile, "utf8"), originalBackup);
    const missingArg = spawnSync(process.execPath, ["node_modules/tsx/dist/cli.mjs", "scripts/apply-content-update.ts", "--expected-snapshot", "--apply", slug], {
      cwd: process.cwd(), encoding: "utf8", env: { ...process.env, TURSO_DATABASE_URL: url, TURSO_AUTH_TOKEN: "", BACKUP_DIR: dir },
    });
    assert.notEqual(missingArg.status, 0);
    assert.match(missingArg.stderr, /requires a file/);
    const missingManifestArg = spawnSync(process.execPath, ["node_modules/tsx/dist/cli.mjs", "scripts/apply-content-update.ts", "--manifest", "--apply", slug], {
      cwd: process.cwd(), encoding: "utf8", env: { ...process.env, TURSO_DATABASE_URL: url, TURSO_AUTH_TOKEN: "", BACKUP_DIR: dir },
    });
    assert.notEqual(missingManifestArg.status, 0);
    assert.match(missingManifestArg.stderr, /requires a file/);
    const scalarBackupDir = path.join(dir, "scalar-backups");
    for (const scalar of [null, false, 0, ""]) {
      writeFileSync(expectedFile, JSON.stringify(scalar));
      const invalidSnapshot = spawnSync(process.execPath, ["node_modules/tsx/dist/cli.mjs", "scripts/apply-content-update.ts", "--apply", "--expected-snapshot", expectedFile, slug], {
        cwd: process.cwd(), encoding: "utf8",
        env: { ...process.env, TURSO_DATABASE_URL: url, TURSO_AUTH_TOKEN: "", BACKUP_DIR: scalarBackupDir },
      });
      assert.notEqual(invalidSnapshot.status, 0);
      assert.match(invalidSnapshot.stderr, /must contain a JSON array/);
      assert.equal(readRow().body, current.body);
      assert.equal(existsSync(scalarBackupDir), false, "invalid snapshot cannot create a backup");
    }
    for (const backup of [
      { body: current.body, metaDescription: current.metaDescription, sources: current.sources },
      { body: current.body, metaDescription: current.metaDescription, sources: current.sources, disclaimer: current.disclaimer, updatedAt: current.updatedAt },
      { ...current, subtitle: undefined },
      { ...current, body: "stale before" },
    ]) {
      const raw = JSON.stringify(backup);
      writeFileSync(backupFile, raw);
      assert.equal(run()[0].result, "skip_backup_conflict");
      assert.deepEqual(readRow(), { title: current.title, meta_title: current.metaTitle, subtitle: current.subtitle, body: current.body });
      assert.equal(readFileSync(backupFile, "utf8"), raw);
    }
    const reusable = JSON.stringify(current);
    writeFileSync(backupFile, reusable);
    assert.equal(run()[0].result, "updated");
    assert.deepEqual(readRow(), { title: seed.title, meta_title: seed.metaTitle, subtitle: seed.subtitle === undefined ? current.subtitle : seed.subtitle, body: seed.body });
    assert.equal(readFileSync(backupFile, "utf8"), reusable);
    assert.equal(run()[0].result, "noop_identical", "idempotent apply skips stale backup validation");
  } finally { rmSync(dir, { recursive: true, force: true, maxRetries: 5, retryDelay: 100 }); }
});

test("shortHash는 값이 같으면 같고 null은 null이다", async () => {
  const { shortHash } = await import("./apply-content-update");
  assert.equal(shortHash(null), null);
  assert.equal(shortHash("a"), shortHash("a"));
  assert.notEqual(shortHash("a"), shortHash("b"));
  assert.equal(shortHash("a")?.length, 12);
});
