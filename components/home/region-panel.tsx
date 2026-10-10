import Image from "next/image";
import Link from "next/link";
import { RegionFinder, type SidoOption } from "./region-finder";

// 데이터가 수집·등록된 시·도만 노출한다. 준비 중인 지역은 나열하지 않는다.
const ACTIVE_SIDO: SidoOption[] = [
  { label: "서울", slug: "seoul" },
  { label: "경기", slug: "gyeonggi" },
  { label: "부산", slug: "busan" },
  { label: "인천", slug: "incheon" },
  { label: "대구", slug: "daegu" },
  { label: "광주", slug: "gwangju" },
  { label: "대전", slug: "daejeon" },
  { label: "울산", slug: "ulsan" },
  { label: "세종", slug: "sejong" },
];

const FACILITY_TYPES = ["동물병원", "펫미용", "펫호텔", "장묘업체"];

// 장식용 지도 일러스트: 핀은 클릭할 수 없는 그림이다.
function MapArt() {
  return (
    <svg
      className="hm-map"
      viewBox="0 0 220 150"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M12 40l48-18 52 20 48-22 48 16v90l-48-16-48 22-52-20-48 18z"
        fill="#fff"
        stroke="#e4d6c6"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M60 22v90M112 42v90M160 20v90"
        stroke="#efe3d4"
        strokeWidth="2"
      />
      <path
        d="M20 96c30-10 50 8 80-4s56-4 100-20"
        stroke="#cfe0ea"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
      />
      {[
        [62, 62],
        [118, 82],
        [168, 52],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`} transform={`translate(${x} ${y})`}>
          <path
            d="M0 0c-9-11-12-16-12-22a12 12 0 0 1 24 0c0 6-3 11-12 22z"
            fill="#d99158"
          />
          <circle cy="-22" r="4.5" fill="#fff" />
        </g>
      ))}
    </svg>
  );
}

export function RegionPanel() {
  return (
    <section
      id="hm-local"
      className="hm-panel hm-panel--local"
      aria-labelledby="hm-local-title"
    >
      <div className="hm-panel-body">
        <h2 className="hm-h2" id="hm-local-title">
          우리 동네
          <br />
          반려시설을 찾아보세요
        </h2>
        <p className="hm-sub">
          시·도를 고르면 시군구별 동물병원과 반려시설 정보를 확인할 수 있어요.
        </p>
        <RegionFinder options={ACTIVE_SIDO} />
        <ul className="hm-types" aria-label="확인할 수 있는 시설 유형">
          {FACILITY_TYPES.map((type) => (
            <li key={type}>{type}</li>
          ))}
        </ul>
        <nav className="hm-chips" aria-label="시·도 바로가기">
          {ACTIVE_SIDO.map((sido) => (
            <Link key={sido.slug} href={`/sido/${sido.slug}`}>
              {sido.label}
            </Link>
          ))}
        </nav>
        <p className="hm-note">
          공공데이터 기준 정보이며 운영 여부와 진료 가능 항목은 방문 전 전화로
          확인해 주세요. 데이터가 등록된 지역만 표시합니다.
        </p>
      </div>
      <div className="hm-panel-art">
        <MapArt />
        <Image
          src="/images/home/local-dog.webp"
          alt=""
          width={1200}
          height={900}
          sizes="(min-width: 1024px) 320px, 60vw"
          className="hm-panel-photo"
        />
      </div>
    </section>
  );
}
