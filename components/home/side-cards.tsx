import Image from "next/image";
import Link from "next/link";

// 장례·추모: 차분한 안내 카드. 판매·압박 문구와 광고를 두지 않는다.
export function MemorialCard() {
  return (
    <section
      className="hm-side hm-memorial"
      aria-labelledby="hm-memorial-title"
    >
      <Image
        src="/images/home/memorial.webp"
        alt="햇살이 비치는 흰 데이지 꽃밭 (AI 생성 이미지)"
        width={1400}
        height={1050}
        sizes="(min-width: 1024px) 400px, 100vw"
        className="hm-side-img"
      />
      <div className="hm-side-body">
        <h2 className="hm-h3 hm-serif" id="hm-memorial-title">
          함께한 시간에
          <br />
          감사합니다
        </h2>
        <p>
          마지막 인사도,
          <br />
          차분히 준비할 수 있도록 안내합니다.
        </p>
        <Link href="/category/memorial" className="hm-btn hm-btn--line">
          장례·추모 안내 보기
        </Link>
      </div>
    </section>
  );
}

// 반려가족 메시지 카드: 통계·인증·신청폼 없이 문구와 일러스트만 둔다.
export function MessageCard() {
  return (
    <aside className="hm-side hm-message" aria-label="반려가족에게 전하는 말">
      <div className="hm-side-body">
        <p className="hm-quote hm-serif">
          작은 생명도
          <br />
          세상을 더 따뜻하게 만듭니다.
        </p>
      </div>
      <Image
        src="/images/home/message.webp"
        alt=""
        width={1200}
        height={900}
        sizes="(min-width: 1024px) 400px, 100vw"
        className="hm-side-img"
      />
    </aside>
  );
}
