import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 27 — cat4×5 + cat6×2 = 7편 (IDs 251-257)
// Macros: A, G, B, F, E, D, A — batch 26(B/D/E/F/C)와 분산
// Angles: RA3, RA8, RA6, RA4, RA7, RA5, RA2

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 251 / Cat4 / Macro-A / Lens-L3(인과) / Hook-H4(contrast) / Outro-O2 / Angle-RA3
  {
    id: "blog-251",
    slug: "vet-bill-reduce-strategy",
    type: "blog",
    category: 4,
    title: "동물병원 진료비 절감 실전 전략 — 아끼는 것과 아끼면 안 되는 것",
    subtitle: "진찰료·검사비·처방비 구조 이해, 2차 진료 활용법, 예방으로 비용 낮추는 현실 가이드",
    metaTitle: "동물병원 진료비 절감 방법 완전 가이드 | 펫지기",
    metaDescription: "동물병원 진료비를 합리적으로 줄이는 방법 — 비용 구조 이해, 2차 진료 활용, 예방 검진 우선 전략을 정리했습니다.",
    body: `<p>흔히 "동물병원은 비싸다"고 하지만, 같은 증상이라도 병원마다 비용 차이가 2~3배 나는 경우가 있다. 한국소비자원 반려동물 진료비 실태조사(2023)에 따르면 동물병원 간 동일 진료 항목의 가격 편차가 최대 5배에 달한다. 무작정 저렴한 곳을 찾는 것이 아니라, 비용 구조를 이해하고 '아낄 수 있는 것'과 '아끼면 안 되는 것'을 구분하는 것이 핵심이다.</p>

<div class="callout-cat">
<strong>아끼면 안 되는 것 먼저</strong><br>
예방접종, 심장사상충 예방, 정기 건강검진 — 이 세 가지는 줄이면 오히려 장기 비용이 늘어난다. 예방 비용 대비 치료 비용은 평균 5~10배 차이.
</div>

<h2>동물병원 비용 구조 이해하기</h2>
<p>동물병원 진료비는 크게 진찰료, 검사비(혈액·영상·배양), 처치·수술비, 약품비, 입원비로 구성된다. 이 중 검사비가 전체의 30~50%를 차지하는 경우가 많다. 검사비를 이해하면 불필요한 지출을 줄일 수 있다.</p>

<h2>비용 절감 전략 1 — 2차 진료·전문 병원 활용</h2>
<p>1차 동물병원에서 치료가 잘 안 될 경우, 같은 병원에서 반복 진료보다 2차 병원(동물 내과·외과 전문)에서 정확한 진단을 받는 것이 장기적으로 더 저렴하다. 대한수의사회는 복잡한 케이스는 전문 병원 진료를 권고하고 있다. 초기 진단이 명확할수록 불필요한 반복 검사가 줄어든다.</p>

<div class="key-summary">
<strong>📋 비용 비교: 1차 병원 반복 vs 2차 전문 진료</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-4-soft,#d9e3ee);">
<th style="padding:8px;border:1px solid var(--brand-border);">시나리오</th>
<th style="padding:8px;border:1px solid var(--brand-border);">예상 비용</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">1차 병원 3회 반복 (원인 미파악)</td><td style="padding:8px;border:1px solid var(--brand-border);">15~30만 원</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">2차 전문 병원 1회 정밀 진단</td><td style="padding:8px;border:1px solid var(--brand-border);">10~20만 원</td></tr>
</tbody></table>
</div>

<h2>비용 절감 전략 2 — 펫보험 청구 최적화</h2>
<p>펫보험이 있다면 보험사 고객센터에 먼저 문의해 보장 범위 확인 후 진료를 받으면 불필요한 자비 지출을 줄일 수 있다. 단, 보험금 청구를 위한 진단서 발급 시 별도 비용(5,000~2만 원)이 발생하므로, 소액 진료는 청구 비용 대비 실익을 따져봐야 한다.</p>

<h2>비용 절감 전략 3 — 예방에 집중</h2>
<p>연 1~2회 정기 건강검진(혈액·소변·영상)은 노령견·노령묘에서 특히 중요하다. 조기 발견된 신장 질환, 심장 질환은 만성화됐을 때의 치료비(연 100만 원 이상)에 비해 훨씬 저렴하게 관리 가능하다. 검진 비용은 병원마다 다르지만 패키지 가격(기본 혈액+소변+X-ray)은 5~10만 원 선이다.</p>

<h2>자주 묻는 질문</h2>
<h3>진단서·소견서 발급 비용이 따로 있나요?</h3>
<p>대부분의 동물병원은 진단서 5,000~2만 원, 소견서 1~3만 원을 별도로 청구한다. 펫보험 청구 시 필요한 경우가 많으니 진료 당일에 함께 요청하면 수의사 방문 횟수를 줄일 수 있다.</p>

<h3>처방전 받아 외부 약국에서 구매할 수 있나요?</h3>
<p>수의사 처방 약품은 동물병원에서 직접 조제·판매하는 것이 원칙이다. 그러나 일부 약품은 인터넷 동물약국에서 처방전 없이 구매 가능하며, 심장사상충 예방약 등은 가격 차이가 있을 수 있다. 단, 처방전 약품을 임의로 교체하는 것은 위험할 수 있으니 반드시 수의사와 상의한다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/vet-cost-breakdown-guide">동물병원 진료비 구조 완전 이해 — 비용 책정과 합리적 이용</a><br>
<a href="/blog/pet-insurance-claim-guide">펫보험 보험금 청구 방법 — 서류 준비부터 입금까지</a><br>
<a href="/blog/dog-health-checkup">강아지 건강검진 — 나이별 주기와 꼭 챙겨야 할 검사 항목</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국소비자원 반려동물 진료비 실태조사 2023",
      "대한수의사회 반려동물 의료 이용 가이드",
      "농림축산검역본부 동물보호 통계 2023",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 개별 진료 상황은 수의사와 상담하세요.",
    status: "published",
    publishedAt: "2026-06-03T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 252 / Cat4 / Macro-G(큐레이션) / Lens-L2(비교) / Hook-H2(stat) / Outro-O4 / Angle-RA8
  {
    id: "blog-252",
    slug: "vet-diagnosis-certificate-guide",
    type: "blog",
    category: 4,
    title: "동물병원 진단서·소견서·진료기록부 발급받는 방법 — 언제 무엇이 필요한가",
    subtitle: "보험 청구·법적 분쟁·입원 이송 시 필요한 서류 종류와 발급 절차·비용",
    metaTitle: "동물병원 진단서 소견서 발급 방법 — 언제 필요한가 | 펫지기",
    metaDescription: "펫보험 청구, 법적 분쟁, 2차 진료 이송 시 필요한 동물병원 진단서·소견서·진료기록부 발급 방법과 비용을 정리했습니다.",
    body: `<p>펫보험 보험금 청구를 시도하다 처음으로 "진단서가 필요합니다"라는 말을 듣는 보호자가 많다. 동물병원에서 발급하는 서류는 진단서, 소견서, 진료기록부, 처방전으로 나뉘며 상황에 따라 필요한 서류가 다르다. 2023년 한국소비자원에 따르면 반려동물 의료 분쟁의 약 12%가 서류 미발급 또는 분실로 인한 보험금 청구 지연에서 발생했다.</p>

<div class="callout-cat">
<strong>📌 서류 미리 요청하는 것이 원칙</strong><br>
수의사가 자발적으로 서류를 발급해주지 않는 경우가 많다. 입원·수술 전 "진단서/소견서도 같이 요청드려도 될까요?"를 먼저 말해두는 것이 좋다. 사후 요청은 추가 방문이 필요할 수 있다.
</div>

<h2>1. 진단서 — 질병명·진단 결과 공식 확인</h2>
<p>진단서는 특정 질환의 진단 결과를 공식 문서로 확인하는 서류다. 펫보험 보험금 청구, 법적 분쟁(물림 사고, 사망 사고), 사망 말소 신고 시 활용된다. 발급 비용은 병원마다 다르지만 5,000~2만 원 수준이다.</p>

<h2>2. 소견서 — 의료적 판단·권고 내용 기록</h2>
<p>소견서는 수의사의 의료적 판단과 치료 권고 사항을 담는 서류다. 2차 진료 의뢰, 장거리 이송, 타 병원 인계 시 사용된다. 진단서보다 유연하게 작성되며 비용은 1~3만 원 수준이다.</p>

<div class="key-summary">
<strong>📋 상황별 필요 서류 요약</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-4-soft,#d9e3ee);">
<th style="padding:8px;border:1px solid var(--brand-border);">상황</th>
<th style="padding:8px;border:1px solid var(--brand-border);">필요 서류</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">펫보험 보험금 청구</td><td style="padding:8px;border:1px solid var(--brand-border);">진단서 또는 진료기록부 + 영수증</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">물림 사고 법적 분쟁</td><td style="padding:8px;border:1px solid var(--brand-border);">진단서 (부상 사실 확인)</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">2차 병원 이송</td><td style="padding:8px;border:1px solid var(--brand-border);">소견서 + 검사 결과지</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">사망 말소 신고</td><td style="padding:8px;border:1px solid var(--brand-border);">진단서 또는 화장 증명서</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">사망 보험금 청구</td><td style="padding:8px;border:1px solid var(--brand-border);">사망 진단서</td></tr>
</tbody></table>
</div>

<h2>3. 진료기록부 사본 — 병원 변경·분쟁 시</h2>
<p>진료기록부는 모든 진료 내역, 처방, 검사 결과가 담긴 원본 의료 기록이다. 병원을 변경하거나 오진 의심 분쟁 시 요청한다. 동물의료법상 수의사는 진료기록부를 3년간 보관해야 한다. 보호자는 해당 기록의 열람·사본 교부를 요청할 권리가 있다.</p>

<h2>4. 처방전 — 약 재구매 시</h2>
<p>장기 복용 약품의 경우 처방전을 받아 보관하면 재방문 없이 전화 주문이 가능한 경우도 있다. 단, 향정신성 약품이나 전문 의약품은 처방전 없이 조제 불가다.</p>

<h2>자주 묻는 질문</h2>
<h3>병원이 서류 발급을 거부하면 어떻게 해야 하나요?</h3>
<p>동물의료법상 수의사는 진료기록부 열람 요청을 정당한 사유 없이 거부할 수 없다. 거부 시 농림축산검역본부(02-500-1600) 또는 한국소비자원(1372)에 민원을 제기할 수 있다.</p>

<h3>서류를 분실했을 때 재발급이 가능한가요?</h3>
<p>진료기록부는 병원이 3년간 보관 의무가 있으므로 재발급 요청이 가능하다. 단, 재발급 비용이 다시 청구될 수 있다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/vet-bill-reduce-strategy">동물병원 진료비 절감 실전 전략 — 아끼는 것과 아끼면 안 되는 것</a><br>
<a href="/blog/pet-insurance-claim-guide">펫보험 보험금 청구 방법 — 서류 준비부터 입금까지</a><br>
<a href="/blog/pet-death-admin-checklist">반려동물이 떠난 후 행정 처리 — 동물등록 말소부터 보험금 청구까지</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국소비자원 반려동물 의료 분쟁 상담 사례 2023",
      "동물의료법(수의사법) 제13조 — 진료기록부 작성·보관 의무",
      "농림축산검역본부 반려동물 의료 이용 안내",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 법적·의료적 분쟁은 전문가와 상담하세요.",
    status: "published",
    publishedAt: "2026-06-03T10:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 253 / Cat4 / Macro-B(즉답) / Lens-L6(비판) / Hook-H1 / Outro-O1 / Angle-RA6
  {
    id: "blog-253",
    slug: "pet-insurance-deductible-fixed-vs-rate",
    type: "blog",
    category: 4,
    title: "펫보험 자기부담금 정액제 vs 정률제 — 어떤 게 유리한가",
    subtitle: "진료비 규모별 실납부액 비교, 보호자 상황별 선택 기준, 자기부담금 낮추는 방법",
    metaTitle: "펫보험 자기부담금 정액 vs 정률 비교 — 어떤 게 유리한가 | 펫지기",
    metaDescription: "펫보험 자기부담금 정액제와 정률제의 실제 납부액 비교, 고액·소액 의료비 상황별 유불리, 선택 기준을 정리했습니다.",
    body: `<p class="aeo-answer" style="border-left:3px solid var(--cat-4,#3a5e87);padding-left:0.75rem;margin-bottom:1rem;">자기부담금 정률제(20~30%)는 고액 진료비에서 보호자 부담이 크고, 정액제(5~10만 원 고정)는 소액 진료에서 유리하다. 진료비가 50만 원 이상이 자주 발생하는 품종·나이라면 정률제 비율이 낮은 상품을 선택하는 것이 유리하다.</p>

<div class="callout-cat">
<strong>자기부담금이란?</strong><br>
보험금이 지급될 때 보호자가 직접 부담하는 비용. 보험사가 전액을 지급하지 않고, 일정 금액 또는 비율을 공제한 뒤 나머지를 지급한다.
</div>

<h2>정액제 vs 정률제 — 구조 차이</h2>
<p>정액제는 진료비와 무관하게 매 청구마다 일정 금액(예: 5만 원)을 공제한다. 정률제는 진료비의 일정 비율(예: 20%)을 보호자가 부담한다. 진료비가 낮을수록 정률제가 유리하고, 높을수록 정액제가 유리한 경향이 있다.</p>

<div class="key-summary">
<strong>📊 진료비별 보호자 실부담액 비교</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-4-soft,#d9e3ee);">
<th style="padding:8px;border:1px solid var(--brand-border);">진료비</th>
<th style="padding:8px;border:1px solid var(--brand-border);">정액제 (5만 원)</th>
<th style="padding:8px;border:1px solid var(--brand-border);">정률제 (20%)</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">10만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">5만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">2만 원</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">30만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">5만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">6만 원</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">50만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">5만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">10만 원</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">100만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">5만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">20만 원</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">300만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">5만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">60만 원</td></tr>
</tbody></table>
<p style="font-size:0.85rem;color:var(--brand-text-secondary);margin-top:0.5rem;">※ 25~30만 원 구간에서 손익분기점이 형성됨 (정액 5만 원 기준)</p>
</div>

<h2>어떤 상황에서 정액제가 유리한가</h2>
<ul>
<li>슬개골 수술, 추간판 수술 등 고액 수술이 예상되는 품종(말티즈, 닥스훈트 등)</li>
<li>노령 반려동물로 고비용 치료 가능성이 높은 경우</li>
<li>만성 질환 관리로 진료비가 매번 크게 발생하는 경우</li>
</ul>

<h2>어떤 상황에서 정률제가 유리한가</h2>
<ul>
<li>어리고 건강해 소액 진료만 발생할 가능성이 높은 경우</li>
<li>정기 예방 접종·검진처럼 진료비가 10~20만 원대에 그치는 경우</li>
<li>보험료를 낮추고 싶은 경우(정률제 상품이 보험료가 낮은 편)</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>자기부담금을 계약 중간에 바꿀 수 있나요?</h3>
<p>대부분의 펫보험은 갱신 시점에 자기부담금 조건을 변경할 수 있다. 계약 중간에는 변경이 불가한 경우가 많으므로, 현재 갱신 일정을 확인한 뒤 갱신 전에 보험사에 조건 변경을 문의한다.</p>

<p>지금 당장 할 수 있는 것은 하나다. 가입한 상품의 약관에서 '자기부담금' 항목을 찾아 정액인지 정률인지 확인하는 것 — 많은 보호자가 이를 모르고 청구 시 처음 확인하는 경우가 있다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-insurance-refund-vs-loss-type">펫보험 환급형 vs 소멸형 — 보호자 상황별 최적 선택 기준</a><br>
<a href="/blog/pet-insurance-exclusions-guide">펫보험 면책사항 완전 정리</a><br>
<a href="/blog/pet-insurance-comparison-method">펫보험 제대로 비교하는 방법 — 5가지 핵심 기준</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "금융소비자 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 금융소비자정보포털 — 펫보험 자기부담금 구조 설명",
      "보험연구원 반려동물 보험 상품 비교 분석 2023",
    ]),
    disclaimer: "본 콘텐츠는 보험 정보 제공 목적이며 개별 상품 조건은 반드시 약관을 확인하세요.",
    status: "published",
    publishedAt: "2026-06-03T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 254 / Cat4 / Macro-F(절차) / Lens-L4(process) / Hook-H3(scene) / Outro-O1 / Angle-RA4
  {
    id: "blog-254",
    slug: "animal-abuse-neglect-report-guide",
    type: "blog",
    category: 4,
    title: "반려동물 학대·방치 신고 절차 — 목격했을 때 어떻게 해야 하나",
    subtitle: "신고 가능 기관·증거 수집 방법·신고 후 처리 과정·보호자 신변 보호",
    metaTitle: "반려동물 학대 신고 방법 완전 가이드 — 절차와 기관 | 펫지기",
    metaDescription: "반려동물 학대·방치를 목격했을 때 신고할 수 있는 기관, 증거 수집 방법, 신고 후 처리 과정을 동물보호법 기준으로 정리했습니다.",
    body: `<p>이웃집 강아지가 며칠째 짖으며 방치되고 있거나, 산책 중 학대 현장을 목격했을 때 많은 사람들이 "신고해야 하는지" 망설인다. 동물보호법 제8조에 따르면 동물 학대는 명백한 범죄다. 신고자는 법적으로 신변이 보호된다. 이 글은 신고 절차와 방법을 단계별로 정리한다.</p>

<div class="callout-cat">
<strong>즉시 신고가 필요한 상황</strong><br>
• 동물이 구타·발차기 등 직접 물리적 폭력을 당하는 경우<br>
• 음식·물 없이 장기간 방치, 악취·부상이 확인되는 경우<br>
• 유기(길에 내버려두는 것) — 동물보호법 위반
</div>

<h2>1단계. 증거 수집 — 신고 전 해야 할 것</h2>
<p>학대 현장을 스마트폰으로 촬영한다. 날짜·시간이 찍히는 영상이나 사진이 가장 효과적이다. 목격자가 있다면 연락처를 받아둔다. 단, 본인의 안전이 최우선이다 — 직접 개입은 위험할 수 있다.</p>

<h2>2단계. 신고 기관 선택</h2>
<ul>
<li><strong>경찰 (112)</strong>: 즉각적인 현장 출동이 필요한 긴급 상황</li>
<li><strong>지자체 동물보호 담당 부서</strong>: 반복적 방치, 위생 불량 등 비긴급 상황. 시·군·구청 민원실 또는 동물보호과</li>
<li><strong>동물보호관리시스템 신고</strong>: animal.go.kr → '동물보호 신고'</li>
<li><strong>동물보호단체</strong>: 직접 구조가 어려울 때 전문 단체에 도움 요청</li>
</ul>

<h2>3단계. 신고 내용 준비</h2>
<ul>
<li>학대 발생 장소 (주소 또는 위치 설명)</li>
<li>피해 동물의 외형 (종류, 색상, 크기)</li>
<li>학대 행위 구체적 내용 (언제, 어떻게)</li>
<li>가해자 특징 (확인 가능한 경우)</li>
<li>촬영 영상·사진</li>
</ul>

<div class="key-summary">
<strong>📋 신고 처리 과정</strong>
<ol style="padding-left:1.2rem;margin-top:0.5rem;">
<li>신고 접수 → 지자체 동물보호 담당자 현장 확인</li>
<li>학대 사실 확인 시 → 동물 임시 격리 또는 구조</li>
<li>수사기관 고발 또는 과태료 처분 (동물보호법 제46조)</li>
<li>가해자 처벌: 최대 3년 이하 징역 또는 3,000만 원 이하 벌금</li>
</ol>
</div>

<h2>4단계. 신고자 신변 보호</h2>
<p>동물보호법 및 개인정보보호법에 따라 신고자의 신원은 공개되지 않는다. 가해자가 신고자를 특정하기 어렵다. 다만 소규모 공동주택 등에서 익명성이 완전하지 않을 수 있으므로, 신고 시 신분 공개 여부를 담당자에게 미리 확인해도 된다.</p>

<h2>자주 묻는 질문</h2>
<h3>밖에서 방치된 것처럼 보이는 동물을 발견했는데, 유기인가요 방목인가요?</h3>
<p>목줄이 없고 몸 상태가 불량(갈비뼈 돌출, 부상, 극심한 탈수)하다면 유기 가능성이 높다. 지자체 동물보호과나 경찰에 신고하면 담당자가 현장 확인 후 구조 여부를 결정한다. 임의로 데려가는 것은 절도죄가 성립할 수 있으니 반드시 신고 절차를 밟는다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/animal-protection-law-2024">2024년 동물보호법 핵심 정리 — 보호자가 알아야 할 의무와 권리</a><br>
<a href="/blog/pet-abandonment-law">반려동물 유기하면 어떻게 되나 — 법적 처벌과 신고 방법</a><br>
<a href="/blog/shelter-dog-adoption-guide">유기견 입양 과정 완전 가이드</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "동물보호법 제8조, 제46조 — 동물 학대 금지 및 처벌 기준 (국가법령정보센터)",
      "농림축산식품부 동물보호관리시스템 animal.go.kr — 신고 절차 안내",
      "한국동물보호연합 학대 신고 가이드",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 법적 상황은 전문가와 상담하세요.",
    status: "published",
    publishedAt: "2026-06-03T12:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 255 / Cat4 / Macro-E(비교) / Lens-L3(인과) / Hook-H4(contrast) / Outro-O2 / Angle-RA7
  {
    id: "blog-255",
    slug: "pet-neighbor-dispute-resolution",
    type: "blog",
    category: 4,
    title: "반려동물로 인한 이웃 분쟁 해결 방법 — 소음·냄새·물림 사고별 대처법",
    subtitle: "법적 책임 범위·아파트 관리규약·민원 처리 순서·합의 방법",
    metaTitle: "반려동물 이웃 분쟁 해결 방법 — 소음·냄새·물림 사고 | 펫지기",
    metaDescription: "반려동물로 인한 이웃 소음·냄새·물림 사고 분쟁 시 법적 책임, 아파트 관리규약, 합의 절차를 정리했습니다.",
    body: `<p>아파트에서 강아지 짖음 민원으로 갈등이 깊어지는 경우가 많다. 법적으로는 반려동물로 인한 소음·냄새·물림 사고에 대한 책임이 보호자에게 있다. 그러나 "얼마나 배상해야 하는지", "어디에 신고해야 하는지"를 정확히 모르면 갈등이 불필요하게 커진다. 이 글에서는 유형별 대처법을 정리한다.</p>

<div class="callout-cat">
<strong>모든 분쟁의 기본 원칙</strong><br>
먼저 당사자 간 대화 → 관리사무소·지자체 조정 → 법적 절차 순으로 진행한다. 첫 번째 대화를 건너뛰면 이후 조정·소송에서 불리하게 작용할 수 있다.
</div>

<h2>소음 분쟁 — 짖음·발소리</h2>
<p>공동주택관리법에 따라 아파트 내 소음 기준은 생활 소음 규제 기준(환경부 고시)을 따른다. 층간 소음 분쟁과 달리 반려동물 짖음은 명확한 법적 기준이 없어 관리규약을 먼저 확인해야 한다. 아파트 관리사무소에 먼저 중재를 요청하는 것이 법적 절차보다 빠르고 효과적이다.</p>

<h2>냄새·위생 분쟁 — 복도·엘리베이터</h2>
<p>공동 공간에서의 위생 문제는 아파트 관리규약 위반으로 관리사무소 민원 처리가 가능하다. 반복적으로 발생한다면 사진·영상 증거를 수집한 뒤 관리사무소 → 지자체 위생과 순으로 민원을 제기한다.</p>

<div class="key-summary">
<strong>📋 유형별 대처 경로</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-4-soft,#d9e3ee);">
<th style="padding:8px;border:1px solid var(--brand-border);">분쟁 유형</th>
<th style="padding:8px;border:1px solid var(--brand-border);">1차 대응</th>
<th style="padding:8px;border:1px solid var(--brand-border);">2차 대응</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">짖음·소음</td><td style="padding:8px;border:1px solid var(--brand-border);">이웃 대화 → 관리사무소</td><td style="padding:8px;border:1px solid var(--brand-border);">층간소음 이웃사이센터(1661-2642)</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">냄새·위생</td><td style="padding:8px;border:1px solid var(--brand-border);">관리사무소 민원</td><td style="padding:8px;border:1px solid var(--brand-border);">지자체 위생과</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">물림 사고</td><td style="padding:8px;border:1px solid var(--brand-border);">즉시 의료처치 + 경찰 신고</td><td style="padding:8px;border:1px solid var(--brand-border);">형사·민사 병행 가능</td></tr>
</tbody></table>
</div>

<h2>물림 사고 — 가장 심각한 분쟁</h2>
<p>민법 제759조에 따라 반려동물이 타인에게 상해를 입히면 보호자가 손해를 배상해야 한다. 물림 사고 시 보호자는 즉시 피해자를 병원에 동행하거나 치료비를 부담해야 한다. 배상액은 치료비, 휴업 손해, 위자료가 포함된다. 사전에 보험(반려동물 배상 책임 특약)에 가입했다면 보험사를 통해 처리할 수 있다.</p>

<h2>자주 묻는 질문</h2>
<h3>이웃이 과도한 배상을 요구하면 어떻게 해야 하나요?</h3>
<p>한국소비자원(1372)이나 대한법률구조공단(132)에서 무료 법률 상담을 받을 수 있다. 배상 합의는 서면으로 진행하고 영수증을 보관하는 것이 원칙이다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/apartment-pet-dispute-guide">아파트에서 반려동물로 인한 분쟁 — 법적 기준과 해결 방법</a><br>
<a href="/blog/pet-dog-bite-liability">반려동물이 사람을 물었을 때 — 법적 책임과 배상</a><br>
<a href="/blog/animal-protection-law-2024">2024년 동물보호법 핵심 정리</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "민법 제759조 — 동물 점유자의 손해배상 책임",
      "공동주택관리법 — 공동생활 방해 행위 제한",
      "층간소음 이웃사이센터 운영 안내 (환경부)",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 법적 분쟁은 전문가와 상담하세요.",
    status: "published",
    publishedAt: "2026-06-03T13:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 256 / Cat6 / Macro-A(포괄) / Lens-L5(사례) / Hook-H3(scene) / Outro-O3 / Angle-RA5
  {
    id: "blog-256",
    slug: "pet-anniversary-memorial-ideas",
    type: "blog",
    category: 6,
    title: "반려동물 기일 추모 방법 — 1주기를 의미 있게 보내는 방식들",
    subtitle: "혼자 또는 가족과 함께하는 추모 의식, 기억을 남기는 방법, 슬픔을 다루는 작은 의례들",
    metaTitle: "반려동물 기일 추모 방법 — 1주기를 의미 있게 | 펫지기",
    metaDescription: "반려동물 기일에 할 수 있는 의미 있는 추모 방법들 — 혼자 또는 가족과 함께, 소박하게 또는 특별하게 기억하는 방식을 정리했습니다.",
    body: `<p>1년이 지났다. 그런데도 여전히 그날 날짜가 달력에 눈에 들어온다. 기일이 되면 어떻게 해야 할지 모르겠다는 보호자가 많다. 아이를 추모하는 방식에 정해진 형식은 없다. 이 글은 기일을 의미 있게 보내는 방법들을 모아 정리한다 — 크거나 거창할 필요 없이, 마음에 맞는 것 하나면 충분하다.</p>

<div class="callout-cat">
<strong>기일 추모는 선택이다</strong><br>
매해 기일을 특별히 챙기는 사람도 있고, 그냥 조용히 지나가는 것이 맞는 사람도 있다. 어떤 방식이든 '제대로 된 방법'은 없다. 지금 자신에게 맞는 방식을 찾는 것이 목적이다.
</div>

<h2>소박하게 혼자 하는 추모</h2>
<ul>
<li><strong>좋아하던 장소에 가기</strong>: 자주 산책하던 공원, 함께 자주 앉았던 자리. 그 공간에 있는 것만으로 충분하다.</li>
<li><strong>좋아하던 간식 먹기</strong>: 아이와 같이 먹던 것, 혹은 아이가 좋아하던 것의 냄새가 나는 것. 기억과 감각은 연결되어 있다.</li>
<li><strong>사진이나 영상 보기</strong>: 평소에 보기 힘들었던 사진첩을 꺼내는 날로 정한다. 슬프더라도 꺼내는 것 자체가 추모다.</li>
<li><strong>짧은 편지 쓰기</strong>: 보내지 않는 편지. "요즘 어때", "네 자리가 아직도 비어 보여" 같은 말을 글로 쓰면 정리가 된다.</li>
</ul>

<h2>가족과 함께하는 추모</h2>
<ul>
<li><strong>좋아하던 음식을 같이 먹으며 이야기하기</strong>: 각자 기억하는 에피소드를 나눈다. 웃기는 것도, 슬픈 것도 괜찮다.</li>
<li><strong>사진 앨범 만들기</strong>: 흩어진 사진을 모아 실물 앨범 또는 디지털 앨범으로 정리하는 시간.</li>
<li><strong>아이의 이름으로 기부하기</strong>: 유기동물 보호단체, 동물병원 봉사 단체에 소액 기부. "○○의 이름으로"라는 메모를 함께 보내는 보호자도 있다.</li>
</ul>

<h2>물리적 기억 남기기</h2>
<ul>
<li><strong>추모 나무 심기</strong>: 화분 또는 마당에 식물을 심고 아이 이름을 붙여준다. 식물이 자라는 것이 살아 있는 기억이 된다.</li>
<li><strong>유골 담은 펜던트·오브젝트</strong>: 화장 후 유골 일부를 담은 메모리얼 주얼리 제작. 국내 몇몇 공방에서 제작 가능.</li>
<li><strong>발바닥 도장 액자</strong>: 생전에 만들어두지 못했다면 발바닥 모양 점토나 잉크 인쇄물로 기억하는 방법도 있다.</li>
</ul>

<h2>온라인 추모</h2>
<p>온라인 반려동물 추모관(일부 지자체 운영)이나 추모 커뮤니티에 글을 올리는 것도 방법이다. 생면부지의 사람들이 댓글로 위로를 건네는 경험이 생각보다 힘이 될 수 있다.</p>

<h2>자주 묻는 질문</h2>
<h3>기일마다 슬픔이 처음처럼 느껴지는 게 정상인가요?</h3>
<p>정상이다. 특히 1주기, 3주기 같은 기념일은 평소보다 감정이 강하게 올라오는 경우가 많다. 애도 심리학에서는 이를 '기념일 반응(Anniversary Reaction)'이라고 부른다. 시간이 지날수록 강도가 낮아지는 경향이 있지만, 완전히 사라지지 않아도 된다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-memorial-15-ways">반려동물 추모 방법 15가지 — 마음을 담은 기억 방식</a><br>
<a href="/blog/petloss-recovery-guide">펫로스 증후군 극복 가이드 — 슬픔을 통과하는 법</a><br>
<a href="/blog/petloss-return-to-daily-life">펫로스 후 일상으로 돌아가기 — 직장과 사회생활을 다시 시작하는 방법</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국애도상담학회 — 기념일 반응(Anniversary Reaction) 자료",
      "보건복지부 정신건강복지센터 — 애도 심리 안내",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 및 회복 지원 목적이며, 전문 심리상담을 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-06-03T14:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 257 / Cat6 / Macro-D(일화→일반화) / Lens-L1(역사) / Hook-H3(scene) / Outro-O2 / Angle-RA2
  {
    id: "blog-257",
    slug: "second-pet-right-timing-guide",
    type: "blog",
    category: 6,
    title: "두 번째 반려동물 입양 — 적절한 시기는 언제인가",
    subtitle: "펫로스 후 새 입양 시기 판단 기준, 성급한 결정의 위험, 준비됐다는 신호",
    metaTitle: "펫로스 후 두 번째 반려동물 입양 시기 — 언제가 적절한가 | 펫지기",
    metaDescription: "반려동물을 잃은 후 새 가족을 맞이하기 적절한 시기 판단 기준, 성급한 입양의 리스크, 준비됐다는 신호를 정리했습니다.",
    body: `<p>동물병원에서 마지막을 함께하고 한 달이 됐다. 여전히 집이 비어 보이는데, 어떤 사람이 "새 강아지를 데려오면 나아질 거야"라고 말했다. 그 말이 위로가 되는 것 같으면서도 어딘가 마음에 걸렸다. 두 번째 반려동물 입양 결정을 내리는 시기는 외부의 기준이 아니라 보호자 내면의 신호에 달려 있다.</p>

<div class="callout-cat">
<strong>빨리 입양한다고 더 빨리 회복되지는 않는다</strong><br>
새로운 반려동물이 슬픔을 '대체'하거나 '치료'해줄 것이라는 기대는 실망으로 이어지기 쉽다. 새 가족은 슬픔이 가라앉은 뒤에 맞이할 때 서로에게 더 공정한 시작이 된다.
</div>

<h2>성급한 입양이 가져올 수 있는 문제</h2>
<p>애도가 충분히 처리되지 않은 상태에서 입양하면, 새 반려동물에게 이전 아이의 그림자가 드리워지는 경우가 있다. "○○만큼 귀엽지 않다", "○○은 이러지 않았는데"라는 무의식적 비교는 새 가족에게도, 보호자에게도 부담이 된다. 한국애도상담학회 자료에 따르면 펫로스 후 입양 결정을 너무 빨리 한 보호자 중 일부는 입양한 동물을 다시 파양하는 경우도 있다.</p>

<h2>준비됐다는 신호들</h2>
<ul>
<li><strong>이전 아이를 그리워하면서도 새 가족을 온전히 환영할 수 있는 마음</strong>: 두 감정이 공존할 수 있다는 것을 느낄 때</li>
<li><strong>새 반려동물을 이전 아이와 분리해서 볼 수 있을 때</strong>: "○○와는 다른 존재"로 처음부터 받아들일 준비</li>
<li><strong>입양 동기가 '공허함을 채우기 위해'가 아닐 때</strong>: 새로운 생명과 함께하고 싶다는 적극적 의지</li>
<li><strong>실용적 준비가 됐을 때</strong>: 시간, 비용, 공간이 다시 갖춰졌는지 확인</li>
</ul>

<h2>시기는 사람마다 다르다</h2>
<p>어떤 보호자는 2개월 만에 준비가 됐다고 느끼고, 어떤 보호자는 2년이 지나도 준비가 안 된 것 같다. 둘 다 정상이다. "○개월은 지나야 한다"는 기준은 없다. 외부 타인의 판단이나 SNS에서 보이는 다른 보호자의 타이밍이 기준이 될 필요는 없다.</p>

<h2>새 가족을 맞이하기 전 점검 목록</h2>
<ul>
<li>이전 아이의 물건을 정리할 준비가 됐는가 (모두 치울 필요는 없지만, 새 반려동물이 헷갈리지 않게)</li>
<li>가족 모두의 동의가 있는가</li>
<li>입양보다 유기동물 보호소 입양을 우선 고려해봤는가</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>이전 반려동물과 같은 품종으로 다시 입양하는 것은 어떤가요?</h3>
<p>개인의 선택이지만, 같은 품종이라도 성격과 습관은 완전히 다른 개체임을 처음부터 인식하는 것이 중요하다. "○○의 대체"로 바라보면 새 가족에게 불공평한 기대를 하게 된다. 처음부터 독립된 존재로 맞이하는 것이 핵심이다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/after-pet-new-family-timing">반려동물을 잃은 후 새 가족을 맞이하는 적절한 시기</a><br>
<a href="/blog/petloss-recovery-guide">펫로스 증후군 극복 가이드 — 슬픔을 통과하는 법</a><br>
<a href="/blog/shelter-dog-adoption-guide">유기견 입양 과정 완전 가이드</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국애도상담학회 — 펫로스 후 입양 결정 시기 관련 자료",
      "American Veterinary Medical Association — Pet Loss and Grief Resources",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 및 회복 지원 목적이며, 전문 심리상담을 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-06-03T15:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

];

async function seed() {
  for (const post of BLOG_POSTS) {
    await db
      .insert(contents)
      .values(post)
      .onConflictDoUpdate({
        target: contents.slug,
        set: { ...post, updatedAt: NOW },
      });
    console.log(`✅ ${post.slug}`);
  }
  console.log("블로그 포스트 27차 시딩 완료! (blog-251 ~ blog-257)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
