import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, extname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const secret = "review-approval-fixture-secret";

const contents = Object.fromEntries([
  "id", "slug", "type", "category", "ymyl", "title", "subtitle", "metaTitle", "metaDescription", "body", "authorName",
  "authorCredential", "reviewedAt", "reviewerName", "sources", "disclaimer", "status", "publishedAt", "updatedAt",
].map((name) => [name, `contents.${name}`]));
const reviewQueue = Object.fromEntries([
  "id", "contentId", "contentType", "priority", "reason", "assignedTo", "status", "notes", "createdAt", "resolvedAt",
].map((name) => [name, `reviewQueue.${name}`]));

function clone(value) {
  return structuredClone(value);
}

function columnName(column) {
  return String(column).split(".").at(-1);
}

function eq(column, value) {
  return { kind: "eq", column: columnName(column), value };
}

function and(...conditions) {
  return { kind: "and", conditions };
}

function matches(row, predicate) {
  if (!predicate) return true;
  if (predicate.kind === "eq") return row[predicate.column] === predicate.value;
  if (predicate.kind === "and") return predicate.conditions.every((condition) => matches(row, condition));
  return true;
}

function makeRecord(overrides = {}) {
  return {
    id: "content-1", slug: "fixture-condition", type: "condition", category: 3, ymyl: true,
    title: "검토 대상", subtitle: null, metaTitle: null, metaDescription: null, body: "안전한 본문", authorName: "검토 에디터",
    authorCredential: "수의학 전공 콘텐츠 에디터", reviewedAt: "2026-09-08T00:00:00.000Z",
    reviewerName: "홍길동 수의사", sources: ["https://example.test/a", "https://example.test/b"],
    disclaimer: "의료 정보 면책문", status: "review_queue", publishedAt: null,
    createdAt: "2026-09-01T00:00:00.000Z", updatedAt: "2026-09-01T00:00:00.000Z",
    ...overrides,
  };
}

function makeQueue(overrides = {}) {
  return {
    id: "queue-1", contentId: "content-1", contentType: "condition", priority: 1,
    reason: "ymyl_required", assignedTo: null, status: "pending", notes: null,
    createdAt: "2026-09-01T00:00:00.000Z", resolvedAt: null, ...overrides,
  };
}

function makeFakeDb({ content = makeRecord(), queue = makeQueue(), failWrite = 0 } = {}) {
  const state = { contents: content ? [clone(content)] : [], reviewQueue: queue ? [clone(queue)] : [] };
  const audit = { reads: 0, writes: 0, transactions: 0, notifications: 0, revalidations: 0 };

  function rowsFor(table) {
    return table === reviewQueue ? state.reviewQueue : state.contents;
  }

  function select(selection) {
    return {
      from(table) {
        const query = {
          predicate: undefined,
          where(predicate) { this.predicate = predicate; return this; },
          orderBy() { return this; },
          limit() { return this; },
          async get() {
            audit.reads += 1;
            const row = rowsFor(table).find((candidate) => matches(candidate, this.predicate));
            return project(row, selection);
          },
          async all() {
            audit.reads += 1;
            return rowsFor(table).filter((candidate) => matches(candidate, this.predicate)).map((row) => project(row, selection));
          },
        };
        return query;
      },
    };
  }

  function project(row, selection) {
    if (!row) return undefined;
    if (!selection) return clone(row);
    return Object.fromEntries(Object.entries(selection).map(([key, column]) => [key, row[columnName(column)]]));
  }

  function update(table) {
    return {
      data: undefined,
      set(data) { this.data = data; return this; },
      where(predicate) {
        const run = async () => {
          audit.writes += 1;
          if (failWrite === audit.writes) throw new Error("fixture second write failure");
          for (const row of rowsFor(table)) if (matches(row, predicate)) Object.assign(row, this.data);
          return { rowsAffected: 1 };
        };
        return { run, then: (resolvePromise, rejectPromise) => run().then(resolvePromise, rejectPromise) };
      },
    };
  }

  const db = {
    select,
    update,
    async transaction(callback) {
      audit.transactions += 1;
      const snapshot = clone(state);
      try {
        return await callback({ select, update });
      } catch (error) {
        state.contents = snapshot.contents;
        state.reviewQueue = snapshot.reviewQueue;
        throw error;
      }
    },
  };
  return { db, state, audit };
}

function load(relative, stubs, env = { CRON_SECRET: secret, NEXT_PUBLIC_SITE_URL: "https://petjigi.kr" }) {
  const cache = new Map();
  function filenameFor(path) {
    if (extname(path)) return path;
    for (const extension of [".ts", ".tsx"]) {
      const candidate = `${path}${extension}`;
      try { readFileSync(candidate); return candidate; } catch {}
    }
    return `${path}.ts`;
  }
  function loadFile(path) {
    const filename = filenameFor(path);
    if (cache.has(filename)) return cache.get(filename);
    const source = readFileSync(filename, "utf8");
    const { outputText } = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    });
    const fixtureModule = { exports: {} };
    cache.set(filename, fixtureModule.exports);
    runInNewContext(outputText, {
      module: fixtureModule,
      exports: fixtureModule.exports,
      process: { env },
      require(name) {
        if (Object.hasOwn(stubs, name)) return stubs[name];
        if (name === "server-only") return {};
        if (name.startsWith("@/")) return loadFile(resolve(root, name.slice(2)));
        if (name.startsWith(".")) return loadFile(resolve(dirname(filename), name));
        if (name === "react/jsx-runtime" || name === "react") return require(name);
        throw new Error(`Unexpected fixture dependency: ${name}`);
      },
    }, { filename });
    return fixtureModule.exports;
  }
  return loadFile(resolve(root, relative));
}

function helperFixture(options = {}) {
  const fake = makeFakeDb(options);
  const effects = [];
  const approvalModule = load("lib/review-queue.ts", {
    "@/db/client": { db: fake.db },
    "@/db/schema": { contents, reviewQueue },
    "drizzle-orm": { and, eq },
    "@/lib/seo/index-now": { pingIndexNow: async (urls) => { fake.audit.notifications += 1; effects.push(["indexnow", urls]); } },
    "@/lib/seo/google-indexing": { notifyGoogleIndexing: async (url) => { fake.audit.notifications += 1; effects.push(["google", url]); } },
    "next/cache": { revalidatePath: (path) => { fake.audit.revalidations += 1; effects.push(["path", path]); }, revalidateTag: () => {} },
  });
  return { ...fake, effects, approvalModule };
}

function integrationFixture(options = {}, env = { CRON_SECRET: secret, NEXT_PUBLIC_SITE_URL: "https://petjigi.kr" }) {
  const fake = makeFakeDb(options);
  const effects = [];
  const stubs = {
    "@/db/client": { db: fake.db },
    "@/db/schema": { contents, reviewQueue },
    "drizzle-orm": { and, asc: () => undefined, eq },
    "next/server": responseStub(),
    "@/lib/seo/index-now": { pingIndexNow: async (urls) => {
      fake.audit.notifications += 1;
      if (options.failEffects) throw new Error("fixture notification failure");
      effects.push(["indexnow", urls]);
    } },
    "@/lib/seo/google-indexing": {
      notifyGoogleIndexing: async (url) => { fake.audit.notifications += 1; effects.push(["google", url]); },
      submitSitemapToGSC: async () => { fake.audit.notifications += 1; effects.push(["sitemap"]); },
    },
    "next/cache": {
      revalidatePath: (path) => { fake.audit.revalidations += 1; effects.push(["path", path]); },
      revalidateTag: (tag) => {
        fake.audit.revalidations += 1;
        if (options.failEffects) throw new Error("fixture cache failure");
        effects.push(["tag", tag]);
      },
    },
  };
  return {
    ...fake,
    effects,
    actionExports: load("app/admin/review-queue/actions.ts", stubs, env),
    patchRoute: load("app/api/review-queue/[id]/route.ts", stubs, env),
    collectionRoute: load("app/api/review-queue/route.ts", stubs, env),
  };
}

function request({ authorization = `Bearer ${secret}`, body, jsonError = false } = {}) {
  return {
    headers: { get: (name) => name === "authorization" ? authorization : null },
    json: async () => { if (jsonError) throw new Error("invalid json"); return body; },
  };
}

function formWithKey(key) {
  const form = new FormData();
  form.set("key", key);
  return form;
}

function responseStub() {
  return { NextResponse: { json: (body, init = {}) => ({ body, status: init.status ?? 200 }) } };
}

test("approval helper is the single exported mutation boundary", () => {
  const source = readFileSync(resolve(root, "lib/review-queue.ts"), "utf8");
  assert.match(source, /export\s+(?:async\s+)?function\s+approveReviewQueueItem\s*\(/);
  assert.match(source, /class\s+ReviewApprovalError|export\s+class\s+ReviewApprovalError/);
  for (const file of ["app/admin/review-queue/actions.ts", "app/api/review-queue/[id]/route.ts"]) {
    const sourceFile = readFileSync(resolve(root, file), "utf8");
    assert.match(sourceFile, /approveReviewQueueItem/);
  }
});

test("approval helper blocks invalid YMYL evidence before writes, including category and ymyl mismatches", async () => {
  const cases = [
    makeRecord({ authorCredential: null }),
    makeRecord({ sources: ["https://example.test/only-one", "  "] }),
    makeRecord({ reviewerName: "검수 대기" }),
    makeRecord({ reviewedAt: "2026-02-30" }),
    makeRecord({ category: 3, ymyl: false, authorCredential: null }),
    makeRecord({ category: 5, ymyl: true, authorCredential: null }),
    makeRecord({ title: "치료한다는 표현" }),
    makeRecord({ subtitle: "치료한다는 표현" }),
    makeRecord({ metaTitle: "치료한다는 표현" }),
    makeRecord({ metaDescription: "치료한다는 표현" }),
    makeRecord({ body: "치료한다는 표현" }),
  ];
  for (const content of cases) {
    const fixture = helperFixture({ content });
    await assert.rejects(() => fixture.approvalModule.approveReviewQueueItem("queue-1", {}), (error) => error?.status === 422);
    assert.equal(fixture.audit.writes, 0);
    assert.equal(fixture.audit.notifications, 0);
    assert.equal(fixture.state.contents[0].status, "review_queue");
    assert.equal(fixture.state.reviewQueue[0].status, "pending");
  }
});

test("complete evidence permits publication when either the category or stored ymyl flag requires the gate", async () => {
  for (const content of [
    makeRecord({ category: 3, ymyl: false }),
    makeRecord({ category: 5, ymyl: true }),
  ]) {
    const fixture = helperFixture({ content });
    await fixture.approvalModule.approveReviewQueueItem("queue-1", {});
    assert.equal(fixture.state.contents[0].status, "published");
    assert.equal(fixture.state.reviewQueue[0].status, "approved");
  }
});

test("approval helper returns 404/422/409 without writes for absent content, type mismatch, invalid slug, or state", async () => {
  const cases = [
    { content: null, queue: makeQueue(), status: 404 },
    { content: makeRecord({ type: "breed" }), queue: makeQueue({ contentType: "breed" }), status: 422 },
    { content: makeRecord({ type: "blog" }), queue: makeQueue({ contentType: "condition" }), status: 422 },
    { content: makeRecord({ category: 7 }), queue: makeQueue(), status: 422 },
    { content: makeRecord({ slug: "../not-a-slug" }), queue: makeQueue(), status: 422 },
    { content: makeRecord({ slug: "has/query?" }), queue: makeQueue(), status: 422 },
    { content: makeRecord({ status: "archived" }), queue: makeQueue(), status: 409 },
    { content: makeRecord({ status: "published" }), queue: makeQueue({ reason: "ymyl_required" }), status: 409 },
    { content: makeRecord(), queue: makeQueue({ status: "approved" }), status: 409 },
  ];
  for (const options of cases) {
    const fixture = helperFixture(options);
    await assert.rejects(() => fixture.approvalModule.approveReviewQueueItem("queue-1", {}), (error) => error?.status === options.status);
    assert.equal(fixture.audit.writes, 0);
    assert.equal(fixture.audit.notifications, 0);
  }
});

test("periodic review may republish an already published record without changing its original publishedAt", async () => {
  const originalPublishedAt = "2026-08-01T00:00:00.000Z";
  const fixture = helperFixture({
    content: makeRecord({ status: "published", publishedAt: originalPublishedAt }),
    queue: makeQueue({ reason: "periodic" }),
  });
  await fixture.approvalModule.approveReviewQueueItem("queue-1", {});
  assert.equal(fixture.state.contents[0].status, "published");
  assert.equal(fixture.state.contents[0].publishedAt, originalPublishedAt);
  assert.equal(fixture.state.reviewQueue[0].status, "approved");
});

test("approval helper atomically publishes full YMYL guide/blog/condition but has no external side effects", async () => {
  for (const type of ["guide", "blog", "condition"]) {
    const fixture = helperFixture({ content: makeRecord({ type, slug: `fixture-${type}` }), queue: makeQueue({ contentType: type }) });
    const result = await fixture.approvalModule.approveReviewQueueItem("queue-1", { notes: "검토 완료", assignedTo: "reviewer", reviewerName: "현재 검토자" });
    assert.equal(fixture.state.contents[0].status, "published");
    assert.equal(fixture.state.reviewQueue[0].status, "approved");
    assert.equal(result.content.slug, `fixture-${type}`);
    assert.equal(result.content.type, type);
    assert.equal(result.path, `/${type}/fixture-${type}`);
    assert.deepEqual(fixture.effects, []);
  }
});

test("approval helper rolls back both records and produces no external effects if its second write fails", async () => {
  const fixture = helperFixture({ failWrite: 2 });
  await assert.rejects(() => fixture.approvalModule.approveReviewQueueItem("queue-1", {}), /fixture second write failure/);
  assert.equal(fixture.state.contents[0].status, "review_queue");
  assert.equal(fixture.state.reviewQueue[0].status, "pending");
  assert.equal(fixture.audit.notifications, 0);
  assert.equal(fixture.audit.revalidations, 0);
});

test("admin actions validate missing, wrong, and missing-configured keys before database access", async () => {
  const db = { select: () => { throw new Error("database must not be read"); } };
  const stubs = { "@/db/client": { db }, "@/db/schema": { contents, reviewQueue }, "drizzle-orm": { eq }, "next/cache": { revalidatePath: () => {}, revalidateTag: () => {} }, "@/lib/seo/index-now": { pingIndexNow: async () => {} }, "@/lib/seo/google-indexing": { notifyGoogleIndexing: async () => {}, submitSitemapToGSC: async () => {} } };
  for (const [env, form] of [
    [{ CRON_SECRET: secret }, new FormData()],
    [{ CRON_SECRET: secret }, formWithKey("wrong-key")],
    [{ CRON_SECRET: "" }, formWithKey(secret)],
  ]) {
    const actionExports = load("app/admin/review-queue/actions.ts", stubs, env);
    for (const action of [actionExports.approveContent, actionExports.rejectContent]) {
      await assert.rejects(() => action("queue-1", form), /Unauthorized/);
    }
  }
});

test("actual admin action delegates to the gate, then emits type-correct postcommit effects only after success", async () => {
  const fixture = integrationFixture({ content: makeRecord({ type: "condition", slug: "fixture-condition" }), queue: makeQueue({ contentType: "condition" }) });
  await fixture.actionExports.approveContent("queue-1", formWithKey(secret));
  assert.equal(fixture.state.contents[0].status, "published");
  assert.equal(fixture.state.reviewQueue[0].status, "approved");
  assert.ok(fixture.effects.some(([kind, urls]) => kind === "indexnow" && urls.includes("https://petjigi.kr/condition/fixture-condition")));
  assert.ok(fixture.effects.some(([kind, path]) => kind === "path" && path === "/condition/fixture-condition"));
  assert.ok(fixture.effects.some(([kind, tag]) => kind === "tag" && tag === "guides"));

  const invalid = integrationFixture({ content: makeRecord({ disclaimer: null }) });
  await assert.rejects(() => invalid.actionExports.approveContent("queue-1", formWithKey(secret)), (error) => error?.status === 422);
  assert.equal(invalid.audit.writes, 0);
  assert.deepEqual(invalid.effects, []);
});

test("postcommit notification and cache failures do not misreport a rolled-back approval", async () => {
  const action = integrationFixture({ failEffects: true });
  await action.actionExports.approveContent("queue-1", formWithKey(secret));
  assert.equal(action.state.contents[0].status, "published");
  assert.equal(action.state.reviewQueue[0].status, "approved");
  const api = integrationFixture({ failEffects: true });
  const result = await api.patchRoute.PATCH(request({ body: { status: "approved" } }),
    { params: Promise.resolve({ id: "queue-1" }) });
  assert.equal(result.status, 200);
  assert.equal(result.body.indexNow, "failed");
  assert.equal(result.body.cache, "failed");
  assert.equal(api.state.contents[0].status, "published");
  assert.equal(api.state.reviewQueue[0].status, "approved");
});

test("review API routes fail closed for blank secrets and malformed client bodies", async () => {
  const blank = integrationFixture({}, { CRON_SECRET: "" });
  assert.equal((await blank.collectionRoute.GET(request({ authorization: "Bearer undefined" }))).status, 401);
  assert.equal((await blank.collectionRoute.POST(request({ authorization: "Bearer undefined", body: { contentId: "x", contentType: "guide" } }))).status, 401);

  const configured = integrationFixture();
  for (const input of [
    undefined, null, [], { contentId: 1, contentType: "guide" }, { contentId: "x", contentType: 1 },
    { contentId: "x", contentType: "guide", reason: 42 }, { contentId: "x", contentType: "guide", priority: "3" },
  ]) {
    const result = await configured.collectionRoute.POST(request({ body: input, jsonError: input === undefined }));
    assert.equal(result.status, 400);
  }
  assert.equal(configured.audit.reads, 0);
  assert.equal(configured.audit.writes, 0);
});

test("actual review PATCH uses the approval gate, preserves nonapproval updates, and emits only postcommit effects", async () => {
  const fixture = integrationFixture({ content: makeRecord({ type: "blog", slug: "fixture-blog" }), queue: makeQueue({ contentType: "blog" }) });
  const params = { params: Promise.resolve({ id: "queue-1" }) };
  assert.equal((await fixture.patchRoute.PATCH(request({ authorization: "Bearer undefined", body: { status: "approved" } }), params)).status, 401);
  for (const body of [null, [], { status: 42 }, { notes: 42 }, { assignedTo: 42 }, { reviewerName: 42 }]) {
    assert.equal((await fixture.patchRoute.PATCH(request({ body }), params)).status, 400);
  }
  const denied = await fixture.patchRoute.PATCH(request({ body: { status: "approved", reviewerName: "검수 대기" } }), params);
  assert.equal(denied.status, 422);
  assert.equal(fixture.audit.writes, 0);
  assert.deepEqual(fixture.effects, []);

  const notes = await fixture.patchRoute.PATCH(request({ body: { status: "in_review", notes: "확인", assignedTo: "reviewer" } }), params);
  assert.equal(notes.status, 200);
  assert.equal(fixture.state.reviewQueue[0].status, "in_review");
  assert.equal(fixture.state.reviewQueue[0].notes, "확인");

  const approved = await fixture.patchRoute.PATCH(request({ body: { status: "approved", reviewerName: "현재 검토자" } }), params);
  assert.equal(approved.status, 200);
  assert.equal(fixture.state.contents[0].status, "published");
  assert.equal(approved.body.published.url, "https://petjigi.kr/blog/fixture-blog");
  assert.ok(fixture.effects.some(([kind, path]) => kind === "path" && path === "/blog/fixture-blog"));
});
