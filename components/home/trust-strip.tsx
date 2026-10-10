import { HomeIcon, type HomeIconName } from "./icons";

interface TrustItem {
  icon: HomeIconName;
  title: string;
  body: string;
}

// 문구는 실제 운영 기준과 일치하는 범위로만 쓴다 (검수·인증·실시간 단정 금지).
const TRUST_ITEMS: TrustItem[] = [
  {
    icon: "book",
    title: "신뢰할 수 있는 정보",
    body: "공공데이터와 공식 자료를 바탕으로, 출처와 기준일을 함께 안내합니다.",
  },
  {
    icon: "people",
    title: "반려가족과 함께 성장",
    body: "문의로 남겨 주신 의견을 확인하며 정보를 다듬어 갑니다.",
  },
  {
    icon: "heart",
    title: "모두를 위한 반려문화",
    body: "광고·제휴 링크는 본문과 구분해 표시하고, 추모 페이지에는 광고를 두지 않습니다.",
  },
];

export function TrustStrip() {
  return (
    <section className="hm-trust-strip" aria-labelledby="hm-trust-title">
      <h2 className="sr-only" id="hm-trust-title">
        펫지기의 정보 기준
      </h2>
      <ul className="hm-trust">
        {TRUST_ITEMS.map((item) => (
          <li key={item.title}>
            <span className="hm-trust-icon">
              <HomeIcon name={item.icon} size={24} />
            </span>
            <span>
              <strong>{item.title}</strong>
              {item.body}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
