import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { gateVerdict, GateScopeError, inferCiBase, resolveGateScope, selectManifestRecords } from "./content-gate-scope";

const run = (cwd: string, ...args: string[]) =>
  execFileSync("git", ["-c", "user.name=t", "-c", "user.email=t@t", "-c", "commit.gpgsign=false", ...args], { cwd, encoding: "utf8" });

function repo(): string {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "gate-"));
  run(dir, "init", "-q", "-b", "main");
  fs.mkdirSync(path.join(dir, "db/seeds"), { recursive: true });
  fs.writeFileSync(path.join(dir, "db/seeds/a.ts"), "line1\nline2\n");
  run(dir, "add", "-A");
  run(dir, "commit", "-qm", "base");
  return dir;
}
const files = (scope: ReturnType<typeof resolveGateScope>) => [...scope.rangesByFile.keys()].filter((k) => scope.rangesByFile.get(k)!.length > 0);

test("로컬 미커밋 변경은 local 모드에서 감지된다", () => {
  const dir = repo();
  fs.appendFileSync(path.join(dir, "db/seeds/a.ts"), "line3\n");
  assert.deepEqual(files(resolveGateScope({ cwd: dir, env: {} })), ["db/seeds/a.ts"]);
});

test("신규 untracked seed는 전체가 변경으로 취급된다", () => {
  const dir = repo();
  fs.writeFileSync(path.join(dir, "db/seeds/new.ts"), "x\ny\n");
  assert.deepEqual(files(resolveGateScope({ cwd: dir, env: {} })), ["db/seeds/new.ts"]);
});

test("커밋된 변경이 있는 깨끗한 작업 사본: 기본 HEAD 비교는 놓치지만 --base 비교는 잡는다", () => {
  const dir = repo();
  run(dir, "checkout", "-qb", "feature");
  fs.appendFileSync(path.join(dir, "db/seeds/a.ts"), "committed\n");
  run(dir, "commit", "-qam", "change");
  assert.deepEqual(files(resolveGateScope({ cwd: dir, env: {} })), []); // 과거 동작: 변경 없음처럼 보임
  assert.deepEqual(files(resolveGateScope({ cwd: dir, baseArg: "main", env: {} })), ["db/seeds/a.ts"]);
});

test("PR 비교(merge commit 포함): base 이후 base 쪽 변경은 제외하고 PR 쪽 변경만 본다", () => {
  const dir = repo();
  run(dir, "checkout", "-qb", "feature");
  fs.writeFileSync(path.join(dir, "db/seeds/pr.ts"), "pr\n");
  run(dir, "add", "-A"); run(dir, "commit", "-qm", "pr change");
  run(dir, "checkout", "-q", "main");
  fs.writeFileSync(path.join(dir, "db/seeds/main-only.ts"), "m\n");
  run(dir, "add", "-A"); run(dir, "commit", "-qm", "main moves");
  run(dir, "checkout", "-q", "feature");
  run(dir, "merge", "-q", "--no-ff", "-m", "merge main", "main");
  assert.deepEqual(files(resolveGateScope({ cwd: dir, baseArg: "main", env: {} })), ["db/seeds/pr.ts"]);
});

test("기준 ref가 없거나 잘못되면 통과시키지 않고 오류", () => {
  const dir = repo();
  assert.throws(() => resolveGateScope({ cwd: dir, baseArg: "no-such-ref", env: {} }), GateScopeError);
  assert.throws(() => resolveGateScope({ cwd: dir, baseArg: "bad ref;rm", env: {} }), GateScopeError);
});

test("CI에서 기준을 알 수 없으면 오류, 알 수 있으면 추론한다", () => {
  const dir = repo();
  assert.throws(() => resolveGateScope({ cwd: dir, env: { CI: "true" } }), GateScopeError);
  assert.equal(inferCiBase({ GITHUB_BASE_REF: "main" }), "origin/main");
  assert.equal(inferCiBase({ GITHUB_EVENT_BEFORE: "0000000000000000000000000000000000000000" }), null);
  assert.equal(inferCiBase({ GITHUB_EVENT_BEFORE: "abc123" }), "abc123");
});

test("실제 변경이 없으면 빈 범위", () => {
  const dir = repo();
  assert.deepEqual(files(resolveGateScope({ cwd: dir, env: {} })), []);
  assert.deepEqual(files(resolveGateScope({ cwd: dir, baseArg: "main", env: {} })), []);
});

test("검사 대상 0건과 차단 0건을 구분한다", () => {
  assert.equal(gateVerdict(0, 0), "NO_RECORDS_TO_CHECK");
  assert.equal(gateVerdict(3, 0), "CHECKED_NO_BLOCKERS");
  assert.equal(gateVerdict(3, 1), "BLOCKED");
});

test("manifest: 반영 대상 slug를 레코드에 대응시키고, 못 찾으면 오류", () => {
  const records = [{ slug: "a" }, { slug: "b" }];
  assert.deepEqual(selectManifestRecords(records, ["b"]), [{ slug: "b" }]);
  assert.throws(() => selectManifestRecords(records, ["zzz"]), GateScopeError);
});
