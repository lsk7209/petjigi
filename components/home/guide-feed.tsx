import Image from "next/image";
import Link from "next/link";
import { formatHomeDate, type HomeGuideCard } from "@/lib/home-guides";
import { HomeIcon } from "./icons";

const REFERENCE_LINKS = [
  { label: "견종 정보", desc: "강아지 품종별 특징", href: "/breed/dog" },
  { label: "묘종 정보", desc: "고양이 품종별 특징", href: "/breed/cat" },
  {
    label: "펫보험 가이드",
    desc: "보험사별 공식 상품 확인",
    href: "/insurance/compare",
  },
  {
    label: "등록 제도",
    desc: "입양·동물등록 준비 순서",
    href: "/category/adoption",
  },
];

function GuideCard({ card }: { card: HomeGuideCard }) {
  const date = formatHomeDate(card.publishedAt);
  return (
    <li>
      <Link href={card.href} className="hm-gcard">
        <Image
          src={card.thumb}
          alt=""
          width={800}
          height={600}
          sizes="(min-width: 1024px) 280px, 96px"
          className="hm-gcard-img"
        />
        <span className="hm-gcard-text">
          <span className="hm-tag">{card.categoryName}</span>
          <strong>{card.title}</strong>
          {date && card.publishedAt && (
            <time className="hm-date" dateTime={card.publishedAt}>
              {date}
            </time>
          )}
        </span>
      </Link>
    </li>
  );
}

export function GuideFeed({ cards }: { cards: HomeGuideCard[] }) {
  return (
    <div className="hm-feed">
      <section aria-labelledby="hm-guide-title">
        <div className="hm-feed-head">
          <div>
            <h2 className="hm-h2 hm-serif" id="hm-guide-title">
              지금 알아두면 좋은 반려생활 이야기
            </h2>
            <p className="hm-sub">최근 발행한 순서대로 소개합니다.</p>
          </div>
          <Link href="/guide" className="hm-more">
            가이드 전체 보기
            <HomeIcon name="arrow" size={18} />
          </Link>
        </div>
        {cards.length > 0 ? (
          <ul className="hm-glist">
            {cards.map((card) => (
              <GuideCard key={card.href} card={card} />
            ))}
          </ul>
        ) : (
          <p className="hm-empty">
            아직 소개할 가이드가 없어요. 준비되는 대로 이곳에 보여드릴게요.
          </p>
        )}
      </section>

      <section aria-labelledby="hm-ref-title">
        <h2 className="hm-h3" id="hm-ref-title">
          반려생활 백과
        </h2>
        <ul className="hm-ref">
          {REFERENCE_LINKS.map((ref) => (
            <li key={ref.href}>
              <Link href={ref.href}>
                <strong>{ref.label}</strong>
                <span>{ref.desc}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
