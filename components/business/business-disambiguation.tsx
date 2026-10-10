import Link from "next/link";
import type { BusinessCandidate } from "@/lib/business-detail-match";

interface DisambiguationCandidate extends BusinessCandidate {
  address: string;
  phone: string | null;
}

const kakaoMapUrl = (c: DisambiguationCandidate) =>
  `https://map.kakao.com/?q=${encodeURIComponent(`${c.address} ${c.name}`)}`;
const naverMapUrl = (c: DisambiguationCandidate) =>
  `https://map.naver.com/p/search/${encodeURIComponent(`${c.address} ${c.name}`)}`;

/** 같은 URL로 구분되지 않는 업체가 둘 이상일 때: 임의의 한 곳을 고르지 않고 주소·전화·지도로 확인하게 한다. */
export function BusinessDisambiguation({
  name,
  typeLabel,
  listingHref,
  candidates,
}: {
  name: string;
  typeLabel: string;
  listingHref: string;
  candidates: DisambiguationCandidate[];
}) {
  return (
    <main className="max-w-3xl mx-auto px-4 py-10" data-ads-policy="block">
      <h1 className="text-2xl font-extrabold text-[var(--brand-text)] mb-2">
        &lsquo;{name}&rsquo; {typeLabel} {candidates.length}곳
      </h1>
      <p className="text-sm text-[var(--brand-text-secondary)] mb-6">
        같은 이름의 {typeLabel}이 여러 곳 등록되어 있어 이 주소만으로는 한 곳을 정할 수 없습니다.
        아래 주소와 전화번호로 찾는 곳을 확인해 주세요.
      </p>
      <ul className="space-y-3" aria-label={`${name} 후보 목록`}>
        {candidates.map((c) => (
          <li key={c.id} className="border border-[var(--brand-border)] rounded-xl p-4 text-sm">
            <p className="font-semibold text-[var(--brand-text)]">{c.address}</p>
            {c.phone && <p className="text-[var(--brand-text-secondary)] mt-1">전화 {c.phone}</p>}
            <p className="mt-2 flex gap-4 text-xs font-semibold">
              <a href={kakaoMapUrl(c)} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-accent)] hover:underline">카카오맵에서 확인</a>
              <a href={naverMapUrl(c)} target="_blank" rel="noopener noreferrer" className="text-[var(--brand-accent)] hover:underline">네이버지도에서 확인</a>
            </p>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs">
        <Link href={listingHref} className="text-[var(--brand-accent)] hover:underline font-semibold">{typeLabel} 전체 목록 보기 →</Link>
      </p>
    </main>
  );
}
