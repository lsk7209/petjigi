import type { Business } from "@/db/schema";
import { getReviewEvidence } from "@/lib/ymyl";
import { resolveArticleDates } from "@/lib/seo/article-dates";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "펫지기",
    alternateName: "PetJigi",
    url: SITE_URL,
    description: "반려동물과 함께하는 모든 결정 — 입양부터 장례까지. 공공데이터 기반 신뢰할 수 있는 반려동물 정보.",
    inLanguage: "ko-KR",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "펫지기",
    alternateName: "PetJigi",
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/icon.png`,
      width: 512,
      height: 512,
    },
    description: "공공데이터 기반 반려동물 정보 서비스",
    foundingDate: "2026",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: `${SITE_URL}/contact`,
      availableLanguage: { "@type": "Language", name: "Korean" },
    },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function localBusinessSchema({
  business,
  canonicalUrl,
}: {
  business: Business;
  /** 페이지 canonical URL과 정확히 같은 값 (route의 sigungu slug 기준) */
  canonicalUrl: string;
}) {
  const typeMap: Record<string, string> = {
    vet: "VeterinaryCare",
    grooming: "HealthAndBeautyBusiness",
    funeral: "LocalBusiness",
    boarding: "LodgingBusiness",
    sale: "PetStore",
    registration: "LocalBusiness",
    breeder: "LocalBusiness",
    transport: "LocalBusiness",
    exhibition: "TouristAttraction",
  };

  const address = compact({
    streetAddress: nonBlank(business.address),
    addressLocality: nonBlank(business.addressSigungu),
    addressRegion: nonBlank(business.addressSido),
  });
  const hasCoords = Number.isFinite(business.lat) && Number.isFinite(business.lng) && business.lat != null && business.lng != null;

  return {
    "@context": "https://schema.org",
    "@type": typeMap[business.type] ?? "LocalBusiness",
    name: business.name,
    ...(Object.keys(address).length > 0
      ? { address: { "@type": "PostalAddress", ...address, addressCountry: "KR" } }
      : {}),
    ...(nonBlank(business.phone) ? { telephone: nonBlank(business.phone) } : {}),
    url: canonicalUrl,
    ...(hasCoords
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: business.lat,
            longitude: business.lng,
          },
        }
      : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "[data-speakable]"],
    },
  };
}

function nonBlank(v: string | null | undefined): string | undefined {
  return v && v.trim() ? v.trim() : undefined;
}

function compact<T extends Record<string, string | undefined>>(obj: T): Record<string, string> {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined)) as Record<string, string>;
}

/** 개인 저자명으로 볼 수 없는 조직·팀 표기 (Person으로 내보내지 않는다) */
const ORGANIZATION_AUTHOR_PATTERN = /편집팀|에디터팀|편집부|에디터|편집|팀$|펫지기|editorial|team/i;

export function isOrganizationAuthor(name: string): boolean {
  return ORGANIZATION_AUTHOR_PATTERN.test(name.trim());
}

function authorNode(authorName?: string | null, authorCredential?: string | null) {
  if (authorName && !isOrganizationAuthor(authorName)) {
    return {
      "@type": "Person",
      name: authorName,
      ...(authorCredential ? { description: authorCredential } : {}),
    };
  }
  return { "@type": "Organization", name: authorName?.trim() || "펫지기", url: SITE_URL };
}

export function articleSchema({
  title,
  subtitle,
  url,
  description,
  authorName,
  authorCredential,
  publishedAt,
  updatedAt,
  reviewedAt,
  reviewerName,
  imageUrl,
  wordCount,
}: {
  title: string;
  subtitle?: string | null;
  url: string;
  description?: string | null;
  authorName?: string | null;
  authorCredential?: string | null;
  publishedAt?: string | null;
  /** 실제 수정일(contents.updatedAt). reviewedAt으로 대체하지 않는다 */
  updatedAt?: string | null;
  reviewedAt?: string | null;
  reviewerName?: string | null;
  /** @deprecated 반려동물 건강 글도 Article로 표시하므로 사용하지 않는다 */
  isYmyl?: boolean;
  imageUrl?: string | null;
  wordCount?: number;
}) {
  const effectiveDescription = subtitle ?? description;
  const reviewEvidence = getReviewEvidence({ reviewedAt, reviewerName });
  const { datePublished, dateModified } = resolveArticleDates({ publishedAt, updatedAt });
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    ...(subtitle ? { alternativeHeadline: subtitle } : {}),
    ...(effectiveDescription ? { description: effectiveDescription } : {}),
    url,
    mainEntityOfPage: url,
    inLanguage: "ko-KR",
    isAccessibleForFree: true,
    ...(wordCount ? { wordCount } : {}),
    ...(imageUrl ? { image: imageUrl } : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-speakable]"],
    },
    author: authorNode(authorName, authorCredential),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(reviewEvidence
      ? { reviewedBy: { "@type": "Person", name: reviewEvidence.reviewerName } }
      : {}),
    publisher: {
      "@type": "Organization",
      name: "펫지기",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/icon.png`,
      },
    },
    isPartOf: {
      "@type": "WebSite",
      name: "펫지기",
      url: SITE_URL,
    },
  };
}

export function faqSchema(items: { question: string; answer: string; url?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
        ...(item.url ? { url: item.url } : {}),
      },
    })),
  };
}

/** 카테고리·허브 페이지용 DefinedTermSet (GEO — AI 정의 노출) */
export function definedTermSetSchema(name: string, terms: { name: string; description: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    name,
    inLanguage: "ko-KR",
    hasDefinedTerm: terms.map((t) => ({
      "@type": "DefinedTerm",
      name: t.name,
      description: t.description,
      inDefinedTermSet: name,
    })),
  };
}

/** HowTo 스키마 (단계별 가이드 — AEO) */
export function howToSchema(name: string, steps: { name: string; text: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    inLanguage: "ko-KR",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  };
}

export function speakableSchema(cssSelectors: string[]) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };
}

/** ItemList — 목록 페이지(가이드·블로그·견종 등)의 AI 추출 최적화 (AEO/GEO) */
export function itemListSchema(
  items: { position: number; name: string; url: string; description?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    numberOfItems: items.length,
    itemListElement: items.map((item) => ({
      "@type": "ListItem",
      position: item.position,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

/** CollectionPage — 카테고리·허브 페이지 타입 명시 */
export function collectionPageSchema(
  name: string,
  url: string,
  description?: string
) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name,
    url,
    inLanguage: "ko-KR",
    ...(description ? { description } : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-speakable]"],
    },
    publisher: {
      "@type": "Organization",
      name: "펫지기",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/icon.png` },
    },
    isPartOf: { "@type": "WebSite", name: "펫지기", url: SITE_URL },
  };
}
