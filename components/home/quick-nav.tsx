import Link from "next/link";
import { HomeIcon, type HomeIconName } from "./icons";

interface QuickTile {
  label: string;
  hint: string;
  href: string;
  icon: HomeIconName;
  tone: "sage" | "peach" | "sky" | "butter";
}

const QUICK_TILES: QuickTile[] = [
  {
    label: "동물병원 찾기",
    hint: "우리 동네 시설",
    href: "#hm-local",
    icon: "hospital",
    tone: "sage",
  },
  {
    label: "건강·질병 정보",
    hint: "증상과 질환",
    href: "/condition",
    icon: "health",
    tone: "peach",
  },
  {
    label: "사료·영양",
    hint: "급여 기준",
    href: "/category/nutrition",
    icon: "food",
    tone: "butter",
  },
  {
    label: "생활·케어",
    hint: "일상 관리",
    href: "/category/care",
    icon: "care",
    tone: "sky",
  },
  {
    label: "입양·등록",
    hint: "준비와 제도",
    href: "/category/adoption",
    icon: "adopt",
    tone: "sage",
  },
  {
    label: "보험·제도",
    hint: "비교와 확인",
    href: "/category/insurance",
    icon: "shield",
    tone: "peach",
  },
  {
    label: "장례·추모",
    hint: "마지막 준비",
    href: "/category/memorial",
    icon: "leaf",
    tone: "sky",
  },
];

// 7개 빠른 탐색 타일: 하나의 부드러운 컨테이너 안에 배치
export function QuickNav() {
  return (
    <section className="hm-quick-sec" aria-labelledby="hm-quick-title">
      <div className="hm-wrap">
        <div className="hm-quick-box">
          <div className="hm-quick-intro">
            <h2 className="hm-h2" id="hm-quick-title">
              지금 어떤 정보가
              <br />
              필요하세요?
            </h2>
            <p className="hm-sub">
              상황에 맞는 메뉴를 골라 필요한 정보를 바로 확인해 보세요.
            </p>
          </div>
          <nav className="hm-tiles" aria-label="상황별 빠른 탐색">
            {QUICK_TILES.map((tile) => (
              <Link
                key={tile.href}
                href={tile.href}
                className={`hm-tile hm-tile--${tile.tone}`}
              >
                <span className="hm-tile-icon">
                  <HomeIcon name={tile.icon} />
                </span>
                <strong>{tile.label}</strong>
                <span className="hm-tile-hint">{tile.hint}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </section>
  );
}
