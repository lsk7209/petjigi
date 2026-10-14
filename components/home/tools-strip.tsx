import Link from "next/link";
import { COMPARE_TYPES } from "@/lib/business-types";

// 홈에는 일상 이용이 많은 업종만 노출한다(장묘는 /tools 허브에서만).
const HOME_COMPARE_TYPES = COMPARE_TYPES.filter((t) =>
  ["vet", "grooming", "boarding"].includes(t.type),
);

export function ToolsStrip() {
  return (
    <section className="hm-tools" aria-labelledby="hm-tools-title">
      <h2 className="hm-h3" id="hm-tools-title">
        우리 동네 데이터 비교
      </h2>
      <p className="hm-tools-desc">
        전국 시도·시군구별 업체 수와 전화번호 기재율을 공공데이터 기준으로 비교합니다.
      </p>
      <ul className="hm-tools-list">
        {HOME_COMPARE_TYPES.map((t) => (
          <li key={t.type}>
            <Link href={`/tools/region-compare/${t.type}`} className="hm-btn hm-btn--line">
              {t.label} 지역 비교
            </Link>
          </li>
        ))}
        <li>
          <Link href="/tools" className="hm-btn hm-btn--line">
            반려동물 도구 모두 보기
          </Link>
        </li>
      </ul>
    </section>
  );
}
