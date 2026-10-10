import assert from "node:assert/strict";
import test from "node:test";
import { readSeeds } from "./audit-adsense-seeds";

const SUMMARY_BLOCK = /이 글 핵심 요약[\s\S]*?<\/ul>/;
const PERCENT = /\d[\d.]*\s?%/g;

function dedupedSeeds() {
  const seen = new Set<string>();
  return readSeeds().filter((r) => (seen.has(r.slug) ? false : (seen.add(r.slug), true)));
}

// 정정된 주장이 핵심 요약에만 남는 일을 막는다: 요약의 % 수치는 본문 다른 곳에도 있어야 한다.
test("핵심 요약의 % 수치는 본문에 근거 문장이 있다", () => {
  const offenders: string[] = [];
  for (const r of dedupedSeeds()) {
    const summary = r.body.match(SUMMARY_BLOCK)?.[0];
    if (!summary) continue;
    const rest = r.body.replace(summary, "");
    for (const n of summary.replace(/<[^>]+>/g, " ").match(PERCENT) ?? []) {
      if (!rest.includes(n.replace(/\s/g, ""))) offenders.push(`${r.slug}: 요약 수치 ${n} 가 본문에 없음`);
    }
  }
  assert.deepEqual(offenders, []);
});

const WALK = () => dedupedSeeds().find((r) => r.slug === "dog-walk-guide");

test("dog-walk-guide: 원문 미확인 수치·기관 귀속이 본문·요약·출처에 없다", () => {
  const r = WALK();
  assert.ok(r, "dog-walk-guide seed 필요");
  const all = `${r.body} ${r.sources}`;
  for (const banned of [/43\s?%/, /552만/, /AVMA/, /한국소비자원/, /60°C/, /5만 원/, /광견병 예방접종을 연 1회/]) {
    assert.doesNotMatch(all, banned, `금지 표현 잔존: ${banned}`);
  }
});

test("dog-walk-guide: 산책 시간 단위가 총량/회당으로 섞이지 않는다", () => {
  const r = WALK();
  assert.ok(r);
  assert.doesNotMatch(r.body.replace(/<[^>]+>/g, " "), /\d+\s?~\s?\d+분\s?[×x]\s?\d/, "분 × 횟수 표기 금지(단위 혼동)");
});
