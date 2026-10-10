import Image from "next/image";
import Link from "next/link";

interface HealthLink {
  label: string;
  hint: string;
  href: string;
}

// 종별 건강 콘텐츠 분류가 데이터에 없으므로, 탭 대신 실제 존재하는 페이지로 연결한다.
const PET_LINKS: { pet: string; links: HealthLink[] }[] = [
  {
    pet: "강아지",
    links: [
      {
        label: "강아지 견종 도감",
        hint: "품종별 특징과 관리",
        href: "/breed/dog",
      },
    ],
  },
  {
    pet: "고양이",
    links: [
      {
        label: "고양이 묘종 도감",
        hint: "품종별 특징과 관리",
        href: "/breed/cat",
      },
    ],
  },
];

const COMMON_LINKS: HealthLink[] = [
  { label: "질병·증상 정보", hint: "출처와 주의사항 함께", href: "/condition" },
  {
    label: "건강·의료 가이드",
    hint: "병원 방문 전 확인할 점",
    href: "/category/health",
  },
];

export function HealthPanel() {
  return (
    <section
      className="hm-panel hm-panel--health"
      aria-labelledby="hm-health-title"
    >
      <div className="hm-panel-body">
        <h2 className="hm-h2" id="hm-health-title">
          우리 아이의 건강,
          <br />
          차근차근 알아보세요
        </h2>
        <p className="hm-sub">
          증상 정보는 참고용이며 진단을 대신하지 않습니다. 걱정되는 증상은
          동물병원에 문의하세요.
        </p>
        <div className="hm-pets">
          {PET_LINKS.map(({ pet, links }) => (
            <div key={pet} className="hm-pet">
              <h3>{pet}</h3>
              {links.map((link) => (
                <Link key={link.href} href={link.href}>
                  <strong>{link.label}</strong>
                  <span>{link.hint}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>
        <ul className="hm-health-links">
          {COMMON_LINKS.map((link) => (
            <li key={link.href}>
              <Link href={link.href}>
                <strong>{link.label}</strong>
                <span>{link.hint}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="hm-panel-art">
        <Image
          src="/images/home/health-dog.webp"
          alt=""
          width={1200}
          height={900}
          sizes="(min-width: 1024px) 320px, 60vw"
          className="hm-panel-photo hm-panel-photo--frame"
        />
      </div>
    </section>
  );
}
