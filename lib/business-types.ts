// 비교 도구가 다루는 업종(등록대행 기관은 읍면동·인허가 정보가 없어 제외)
export const COMPARE_TYPES = [
  { type: "vet", label: "동물병원" },
  { type: "grooming", label: "펫미용" },
  { type: "boarding", label: "펫호텔" },
  { type: "funeral", label: "장묘업체" },
  { type: "sale", label: "분양업체" },
  { type: "breeder", label: "브리더" },
  { type: "transport", label: "반려동물 운송" },
  { type: "exhibition", label: "체험전시" },
] as const;

export type CompareType = (typeof COMPARE_TYPES)[number]["type"];

export function findCompareType(type: string) {
  return COMPARE_TYPES.find((t) => t.type === type) ?? null;
}
