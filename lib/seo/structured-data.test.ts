import assert from "node:assert/strict";
import test from "node:test";
import type { Business } from "@/db/schema";
import { resolveArticleDates } from "./article-dates";
import {
  articleSchema,
  isOrganizationAuthor,
  localBusinessSchema,
} from "./structured-data";

const NOW = new Date("2026-10-12T00:00:00Z");

function business(over: Partial<Business> = {}): Business {
  return {
    id: "b1",
    type: "vet",
    category: 3,
    name: "행복동물병원",
    legalName: null,
    address: "서울특별시 노원구 1",
    addressSido: "서울특별시",
    addressSigungu: "노원구",
    addressDong: null,
    lat: null,
    lng: null,
    phone: null,
    licenseDate: null,
    status: "active",
    scale: null,
    source: "test",
    rawData: null,
    lastSyncedAt: "2026-10-01",
    createdAt: "2026-10-01",
    updatedAt: "2026-10-01",
    ...over,
  } as Business;
}

test("LocalBusiness url은 전달받은 canonical과 정확히 같다 (주소 시군구가 아닌 route slug 기준)", () => {
  const canonical = "https://petjigi.kr/vet/nowon-gu/%ED%96%89%EB%B3%B5";
  const ld = localBusinessSchema({
    business: business(),
    canonicalUrl: canonical,
  });
  assert.equal(ld.url, canonical);
});

test("null 주소·전화·좌표는 속성 자체를 생략", () => {
  const ld = localBusinessSchema({
    business: business({
      address: "",
      addressSido: null,
      addressSigungu: null,
      phone: null,
    }),
    canonicalUrl: "https://petjigi.kr/vet/x/y",
  }) as Record<string, unknown>;
  assert.equal("address" in ld, false);
  assert.equal("telephone" in ld, false);
  assert.equal("geo" in ld, false);
  assert.doesNotMatch(JSON.stringify(ld), /null|undefined/);
});

test("좌표 0,0도 값이 있으면 출력, 한쪽만 있으면 생략", () => {
  const both = localBusinessSchema({
    business: business({ lat: 37.5, lng: 127 }),
    canonicalUrl: "https://petjigi.kr/a",
  }) as Record<string, unknown>;
  assert.ok(both.geo);
  const one = localBusinessSchema({
    business: business({ lat: 37.5, lng: null }),
    canonicalUrl: "https://petjigi.kr/a",
  }) as Record<string, unknown>;
  assert.equal("geo" in one, false);
});

test("Article 날짜: 수정일은 updatedAt, reviewedAt으로 대체하지 않음", () => {
  const ld = articleSchema({
    title: "t",
    url: "https://petjigi.kr/blog/a",
    publishedAt: "2026-09-01T00:00:00Z",
    updatedAt: "2026-10-01T00:00:00Z",
    reviewedAt: "2026-10-10",
  });
  assert.equal(ld.dateModified, "2026-10-01T00:00:00Z");
  assert.equal(ld.datePublished, "2026-09-01T00:00:00Z");
});

test("미래 날짜 금지 / 수정일이 발행일보다 빠르면 발행일로 대체", () => {
  const future = resolveArticleDates({
    publishedAt: "2026-09-01",
    updatedAt: "2027-01-01",
    now: NOW,
  });
  assert.equal(future.dateModified, "2026-09-01");
  const reversed = resolveArticleDates({
    publishedAt: "2026-09-01",
    updatedAt: "2026-08-01",
    now: NOW,
  });
  assert.equal(reversed.dateModified, "2026-09-01");
  const futurePub = resolveArticleDates({
    publishedAt: "2027-01-01",
    updatedAt: "2027-02-01",
    now: NOW,
  });
  assert.deepEqual(futurePub, {
    datePublished: undefined,
    dateModified: undefined,
  });
  const invalid = resolveArticleDates({
    publishedAt: "bad",
    updatedAt: null,
    now: NOW,
  });
  assert.equal(invalid.dateModified, undefined);
});

test("조직형 저자는 Person이 아니라 Organization", () => {
  assert.equal(isOrganizationAuthor("펫지기 에디터팀"), true);
  assert.equal(isOrganizationAuthor("펫지기 편집팀"), true);
  assert.equal(isOrganizationAuthor("김하나"), false);
  const org = articleSchema({
    title: "t",
    url: "https://petjigi.kr/x",
    authorName: "펫지기 에디터팀",
    authorCredential: "에디터",
  }) as { author: { "@type": string; description?: string } };
  assert.equal(org.author["@type"], "Organization");
  assert.equal(org.author.description, undefined);
  const person = articleSchema({
    title: "t",
    url: "https://petjigi.kr/x",
    authorName: "김하나",
  }) as {
    author: { "@type": string };
  };
  assert.equal(person.author["@type"], "Person");
});

test("건강 글도 Article — Patient·MedicalWebPage 미사용", () => {
  const ld = JSON.stringify(
    articleSchema({ title: "t", url: "https://petjigi.kr/x", isYmyl: true }),
  );
  assert.match(ld, /"@type":"Article"/);
  assert.doesNotMatch(ld, /Patient|MedicalWebPage|MedicalAudience/);
});
