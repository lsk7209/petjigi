import type { Business } from "@/db/schema";

export function localBusinessSchema(business: Business) {
  const typeMap: Record<string, string> = {
    vet: "VeterinaryCare",
    grooming: "LocalBusiness",
    funeral: "LocalBusiness",
    boarding: "LocalBusiness",
    sale: "PetStore",
    breeder: "LocalBusiness",
    transport: "LocalBusiness",
    exhibition: "LocalBusiness",
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
    telephone: business.phone,
    ...(business.lat && business.lng
      ? {
          geo: {
            "@type": "GeoCoordinates",
            latitude: business.lat,
            longitude: business.lng,
          },
        }
      : {}),
  };
}

export function articleSchema({
  title,
  url,
  authorName,
  authorCredential,
  publishedAt,
  reviewedAt,
  reviewerName,
  isYmyl,
}: {
  title: string;
  url: string;
  authorName?: string | null;
  authorCredential?: string | null;
  publishedAt?: string | null;
  reviewedAt?: string | null;
  reviewerName?: string | null;
  isYmyl?: boolean;
}) {
  return {
    "@context": "https://schema.org",
    "@type": isYmyl ? "MedicalWebPage" : "Article",
    headline: title,
    url,
    ...(authorName
      ? {
          author: {
            "@type": "Person",
            name: authorName,
            description: authorCredential ?? undefined,
          },
        }
      : {}),
    ...(publishedAt ? { datePublished: publishedAt } : {}),
    ...(reviewedAt
      ? {
          dateModified: reviewedAt,
          reviewedBy: reviewerName
            ? { "@type": "Person", name: reviewerName }
            : undefined,
        }
      : {}),
    publisher: {
      "@type": "Organization",
      name: "펫지기",
      url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.com",
    },
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
