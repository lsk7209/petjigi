import type { Business } from "@/db/schema";

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

export function localBusinessSchema(business: Business) {
  const typeMap: Record<string, string> = {
    vet: "VeterinaryCare",
    grooming: "HealthAndBeautyBusiness",
    funeral: "LocalBusiness",
    boarding: "LodgingBusiness",
    sale: "PetStore",
    breeder: "LocalBusiness",
    transport: "LocalBusiness",
    exhibition: "TouristAttraction",
  };

  return {
    "@context": "https://schema.org",
    "@type": typeMap[business.type] ?? "LocalBusiness",
    name: business.name,
    address: {
      "@type": "PostalAddress",
      streetAddress: business.address,
      addressLocality: business.addressSigungu,
      addressRegion: business.addressSido,
      addressCountry: "KR",
    },
    telephone: business.phone ?? undefined,
    url: `${SITE_URL}/${business.type}/${business.addressSigungu ?? ""}/${encodeURIComponent(business.name)}`,
    ...(business.lat && business.lng
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: business.lat,
            longitude: business.lng,
          },
          hasMap: `https://map.kakao.com/?q=${encodeURIComponent(business.name + " " + (business.address ?? ""))}`,
        }
      : {}),
    openingHoursSpecification: undefined,
    priceRange: undefined,
  };
}

export function articleSchema({
  title,
  url,
  description,
  authorName,
  authorCredential,
  publishedAt,
  reviewedAt,
  reviewerName,
  isYmyl,
  imageUrl,
}: {
  title: string;
  url: string;
  description?: string | null;
  authorName?: string | null;
  authorCredential?: string | null;
  publishedAt?: string | null;
  reviewedAt?: string | null;
  reviewerName?: string | null;
  isYmyl?: boolean;
  imageUrl?: string | null;
}) {
  return {
    "@context": "https://schema.org",
    "@type": isYmyl ? "MedicalWebPage" : "Article",
    headline: title,
    ...(description ? { description } : {}),
    url,
    inLanguage: "ko-KR",
    isAccessibleForFree: true,
    ...(imageUrl ? { image: imageUrl } : {}),
    ...(isYmyl
      ? {
          audience: { "@type": "Patient" },
          medicalAudience: { "@type": "MedicalAudience", audienceType: "Caregiver" },
        }
      : {}),
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "[data-speakable]"],
    },
    ...(authorName
      ? {
          author: {
            "@type": "Person",
            name: authorName,
            ...(authorCredential ? { description: authorCredential } : {}),
          },
        }
      : {
          author: {
            "@type": "Organization",
            name: "펫지기",
            url: SITE_URL,
          },
        }),
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    ...(reviewedAt
      ? {
          dateModified: reviewedAt,
          ...(reviewerName
            ? { reviewedBy: { "@type": "Person", name: reviewerName } }
            : {}),
        }
      : publishedAt
      ? { dateModified: publishedAt }
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
