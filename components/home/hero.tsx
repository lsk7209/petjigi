import Image from "next/image";
import Link from "next/link";

// 히어로: 큰 배경 비주얼 + 왼쪽 아이보리 마스크로 텍스트 가독성 확보
export function HomeHero() {
  return (
    <section className="hm-hero" aria-label="사이트 소개">
      <div className="hm-wrap">
        <div className="hm-hero-stage">          <div className="hm-hero-copy">
            <p className="hm-eyebrow">
              반려동물을 위한 믿을 수 있는 정보, 펫지기
            </p>
            <h1 className="hm-h1" data-speakable>
              함께하는 모든 순간,
              <br />
              반려가족의 든든한 안내서
            </h1>
            <p className="hm-lead">
              동물병원부터 건강·생활 정보, 입양, 보험,
              <br />
              그리고 마지막 인사까지.
              <br />
              펫지기가 반려생활의 모든 순간을 함께합니다.
            </p>
            <div className="hm-actions">
              <Link href="#hm-local" className="hm-btn hm-btn--solid">
                우리 동네 동물병원 찾기
              </Link>
              <Link href="/guide" className="hm-btn hm-btn--line">
                반려생활 가이드 보기
              </Link>
            </div>
          </div>

          <div className="hm-hero-photo">
            <Image
              src="/images/home/hero.webp"
              alt="크림색 이불 위에 함께 있는 강아지와 고양이 (AI 생성 이미지)"
              fill
              preload
              sizes="(min-width: 1280px) 1240px, 100vw"
              className="hm-hero-img"
            />
            <div className="hm-hero-mask" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}
