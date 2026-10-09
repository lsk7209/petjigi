import assert from "node:assert/strict";
import test from "node:test";
import { readSeeds } from "./audit-adsense-seeds";

// 기관·연구 귀속 + 구체 수치 조합은 원문 확인 없이 싣지 않는다. 확인된 항목은 ALLOW 에 근거와 함께 등록한다.
const ATTRIBUTION = /(?:AVMA|AKC|WSAVA|Cornell|코넬|ASPCA|VCA|Merck|ACVIM|AAHA|AAFP|ISFM|IRIS|JAVMA|HSUS|PDSA|FDA|CDC|금융감독원|농림축산식품부|한국소비자원|연구에 따르면|조사에 따르면|통계에 따르면|자료에 따르면|보고서에 따르면)/;
const NUMBER = /\d[\d,.]*\s?(?:%|배|만 ?건|만 ?명|만 ?가구|만 ?마리)/;
const ALLOW = [/AAFCO/, /FDA DCM/, /브리드 스탠다드/];

test("출처 귀속이 붙은 구체 통계 문장이 시드 본문에 없다", () => {
  const seen = new Set<string>();
  const offenders: string[] = [];
  for (const r of readSeeds()) {
    if (seen.has(r.slug)) continue;
    seen.add(r.slug);
    for (const s of r.body.replace(/<[^>]+>/g, " ").split(/(?<=[.다요])\s+/)) {
      const t = s.replace(/\s+/g, " ").trim();
      if (t.length < 300 && ATTRIBUTION.test(t) && NUMBER.test(t) && !ALLOW.some((a) => a.test(t))) {
        offenders.push(`${r.slug}: ${t.slice(0, 90)}`);
      }
    }
  }
  assert.deepEqual(offenders, []);
});
