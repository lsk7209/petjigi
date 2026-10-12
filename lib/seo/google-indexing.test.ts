import assert from "node:assert/strict";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import test from "node:test";
import {
  IndexingApiMisuseError,
  assertIndexingApiEligible,
  notifyGoogleBatch,
  notifyGoogleIndexing,
} from "./google-indexing";

test("일반 콘텐츠 종류는 Indexing API 호출 전에 실패한다", async () => {
  for (const kind of ["blog", "guide", "condition", "region"]) {
    assert.throws(() => assertIndexingApiEligible(kind), IndexingApiMisuseError);
    await assert.rejects(() => notifyGoogleIndexing("https://petjigi.kr/blog/x", kind as never), IndexingApiMisuseError);
    await assert.rejects(() => notifyGoogleBatch(["https://petjigi.kr/blog/x"], kind as never), IndexingApiMisuseError);
  }
  assert.doesNotThrow(() => assertIndexingApiEligible("job_posting"));
});

function sourceFiles(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    if (["node_modules", ".next", ".next-verify", ".git", ".seo-cache"].includes(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) sourceFiles(full, out);
    else if (/\.(ts|tsx|mjs)$/.test(name) && !/\.test\./.test(name)) out.push(full);
  }
  return out;
}

test("앱·스크립트 어디에서도 Indexing API 함수를 호출하지 않는다 (정의 파일 제외)", () => {
  const offenders: string[] = [];
  for (const dir of ["app", "components", "lib", "scripts", "etl"]) {
    for (const file of sourceFiles(join(process.cwd(), dir))) {
      if (file.replaceAll("\\", "/").endsWith("lib/seo/google-indexing.ts")) continue;
      const text = readFileSync(file, "utf8");
      if (/notifyGoogle(Indexing|Batch)\s*\(|urlNotifications:publish/.test(text)) offenders.push(file);
    }
  }
  assert.deepEqual(offenders, []);
});
