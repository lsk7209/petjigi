import Link from "next/link";

const SERVICE_QUESTIONS: Record<string, readonly string[]> = {
  vet: ["우리 동물의 종과 현재 증상을 진료할 수 있나요?", "오늘 접수·응급 수용이 가능한가요? 어렵다면 연락할 병원이 있나요?", "가져갈 기록과 검사 전 준비, 예상 비용 안내 방식은 무엇인가요?"],
  funeral: ["동물장묘업 허가 정보와 실제 진행 장소를 공식 목록에서 확인할 수 있나요?", "기본 비용과 추가 비용, 포함된 절차를 견적서로 받을 수 있나요?", "이동·안치 방법과 준비 서류는 어떻게 안내받나요?"],
  sale: ["공공데이터의 업체명·주소·전화와 실제 상담 장소가 일치하나요?", "업종에 필요한 허가·등록 정보와 계약 내용을 확인할 수 있나요?", "건강 기록·인계 서류와 분쟁 시 연락할 창구를 확인할 수 있나요?"],
};

export function VisitQuestions({ type }: { type: string }) {
  const questions = SERVICE_QUESTIONS[type] ?? ["오늘 운영 시간과 예약 필요 여부는 무엇인가요?", "우리 동물의 종·상태에 맞는 서비스를 제공하나요?", "포함 서비스·추가 비용과 실제 방문 주소는 무엇인가요?"];
  const guide = type === "vet" ? "/guide/animal-hospital-guide" : type === "funeral" ? "/guide/memorial-ceremony" : type === "sale" ? "/guide/dog-adoption-checklist" : "/category/care";
  return (
    <section aria-label="방문 전 직접 확인할 질문" className="my-6 rounded-xl border border-[var(--brand-border)] p-4" data-visit-questions>
      <h2 className="text-base font-bold text-[var(--brand-text)]">방문 전 직접 확인할 질문</h2>
      <p className="mt-2 text-sm text-[var(--brand-text-secondary)]">공공데이터의 수집일은 업체의 현재 영업 상태를 확인한 날짜가 아닙니다. 주소가 목록 지역과 다르면 실제 위치와 관할 정보도 문의하세요.</p>
      <ul className="mt-3 space-y-2 pl-5 list-disc text-sm text-[var(--brand-text-secondary)]">{questions.map((question) => <li key={question}>{question}</li>)}</ul>
      <div className="mt-3 flex flex-wrap gap-4 text-sm">
        <Link href={guide} className="underline text-[var(--brand-accent)]">관련 준비 안내</Link>
        <Link href="/contact" className="underline text-[var(--brand-accent)]">잘못된 정보 문의</Link>
        {type === "funeral" && <a href="https://www.animal.go.kr/front/awtis/shop/salesList.do?menuNo=5000000023" target="_blank" rel="noopener noreferrer" className="underline text-[var(--brand-accent)]">공식 장묘업체 목록</a>}
      </div>
    </section>
  );
}
