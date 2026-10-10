import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
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

const bySlug = (slug: string) => dedupedSeeds().find((r) => r.slug === slug);

test("dog-walk-guide: 메타 설명이 본문에 없는 '적정 시간' 기준을 약속하지 않는다", () => {
  const src = readFileSync("db/seeds/blog-posts.ts", "utf8");
  const meta = src.match(/slug: "dog-walk-guide"[\s\S]*?metaDescription:\s*"([^"]+)"/)?.[1];
  assert.ok(meta, "dog-walk-guide metaDescription 필요");
  assert.doesNotMatch(meta, /적정 시간/);
});

test("pet-insurance-guide: 출처 없는 일반화 수치(면책 30일·자기부담 10~30%·가입 연령·수명)가 없다", () => {
  const r = bySlug("pet-insurance-guide");
  assert.ok(r, "pet-insurance-guide seed 필요");
  for (const banned of [/보통 30일/, /10~30%/, /3개월~8세/, /13~15년/]) {
    assert.doesNotMatch(r.body, banned, `금지 표현 잔존: ${banned}`);
  }
  assert.match(r.body, /계산 예시\(가정\)/, "보험금 예시는 가정을 명시해야 한다");
});

test("maine-coon-care-guide: 원문 미확인 기관 귀속(VCA·WSAVA·OFA·ASPCA)이 없다", () => {
  const r = bySlug("maine-coon-care-guide");
  assert.ok(r, "maine-coon-care-guide seed 필요");
  assert.doesNotMatch(r.body, /VCA|WSAVA|OFA|ASPCA/);
});
