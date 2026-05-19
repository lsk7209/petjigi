// 어필리에이트 표시 의무 — 페이지 상단 (표시광고법, 공정거래법)
export function AffiliateNotice({
  type,
}: {
  type: "coupang" | "pet-insurance" | "general";
}) {
  const messages = {
    coupang:
      "이 페이지는 쿠팡파트너스 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받습니다.",
    "pet-insurance":
      "이 페이지에는 제휴 링크가 포함되어 있으며, 사용자가 링크를 통해 가입 시 펫지기가 일정 수수료를 받을 수 있습니다. 콘텐츠의 객관성에는 영향을 주지 않습니다.",
    general:
      "이 페이지에는 제휴 링크가 포함되어 있습니다. 자세한 내용은 어필리에이트 고지 페이지를 참고해 주세요.",
  };

  return (
    <div className="bg-[var(--brand-border)] text-[var(--brand-text-secondary)] text-xs px-4 py-2 rounded-lg mb-4">
      📢 {messages[type]}
    </div>
  );
}
