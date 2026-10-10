"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export interface SidoOption {
  label: string;
  slug: string;
}

// 시도 선택 → 시도 허브로 이동. 현재 위치 권한은 요청하지 않는다.
export function RegionFinder({ options }: { options: SidoOption[] }) {
  const router = useRouter();
  const [slug, setSlug] = useState(options[0]?.slug ?? "");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (slug) router.push(`/sido/${slug}`);
  };

  return (
    <form className="hm-finder" onSubmit={onSubmit}>
      <label className="hm-finder-label" htmlFor="hm-sido-select">
        지역 선택
      </label>
      <div className="hm-finder-row">
        <select
          id="hm-sido-select"
          className="hm-select"
          value={slug}
          onChange={(event) => setSlug(event.target.value)}
        >
          {options.map((option) => (
            <option key={option.slug} value={option.slug}>
              {option.label}
            </option>
          ))}
        </select>
        <button type="submit" className="hm-btn hm-btn--solid">
          시설 찾기
        </button>
      </div>
    </form>
  );
}
