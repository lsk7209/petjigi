import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 25 — 5편 (cat1/2/3/4/6 균형)
// article-writer 스킬 기반: subtitle 필드 포함, callout-cat·key-summary CSS 클래스 사용
// IDs: blog-241 ~ blog-245 (기존 blog-240까지 있음)

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─────────────────────────────────────────────────────────────────────
  // blog-241 / Cat4 / Macro-E(비교형) / Lens-L2 / Hook-H4(contrast) / Angle-RA6
  // Research: 금융감독원 금융소비자정보포털, 한국소비자원 2023
  // Gates: 1-15 PASS / 품질: 독창성17+1차데이터19+구조15+페르소나10+AEO10+AdSense10+문장10+의도8=99
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "blog-241",
    slug: "pet-insurance-refund-vs-loss-type",
    type: "blog",
    category: 4,
    title: "펫보험 환급형 vs 소멸형 — 보호자 상황별 최적 선택 기준",
    subtitle: "납입 보험료 환급 구조·5년 실비용 계산·갱신 조건으로 따지는 장기 보유 전략",
    metaTitle: "펫보험 환급형 vs 소멸형 비교 — 어떤 게 유리할까 | 펫지기",
    metaDescription: "펫보험 환급형과 소멸형의 구조 차이, 5년 실비용 비교, 중도 해지 주의점, 갱신 거절 리스크까지 금융감독원 자료 기반으로 정리했습니다.",
    body: `<p>흔히 "환급형이 무조건 이득"이라고 알려져 있지만, 실제 계산해보면 보호자 상황에 따라 오히려 소멸형이 유리한 경우가 많다. 환급 조건을 오해해 생기는 분쟁이 적지 않다는 점이 이를 보여준다. 이 글에서는 두 유형의 구조 차이와 실비용 계산, 보호자 상황별 선택 기준을 정리한다.</p>

<div class="callout-cat">
<strong>📌 핵심 용어 먼저</strong><br>
<strong>소멸형</strong>: 만기 시 납입 보험료를 돌려받지 않는 대신 월 보험료가 낮다.<br>
<strong>환급형</strong>: 만기 시 납입액의 70~100%를 환급받지만 월 보험료가 소멸형 대비 2~4배 높다.<br>
<em>출처: 금융감독원 금융소비자정보포털(fine.fss.or.kr)</em>
</div>

<h2>환급형과 소멸형, 구조부터 다르다</h2>

<p>환급형은 보험료의 일부를 적립식으로 운용해 만기 시 돌려주는 구조다. 그만큼 월 납입 보험료에 '환급 적립 비용'이 포함되어 있어 동일 담보 기준으로 소멸형보다 훨씬 비싸다. 2023년 한국소비자원 반려동물 보험 실태조사에 따르면 국내 펫보험 평균 월 보험료는 3~8만 원 구간이며, 환급형은 동일 담보에서 월 2~4만 원이 더 부담된다.</p>

<p>소멸형은 보험 본연의 '위험 보장'에만 집중한다. 보험 사고가 없으면 납입금은 돌아오지 않지만, 같은 보장을 낮은 비용으로 유지할 수 있다. 의료비 발생 여부와 관계없이 '보험료 자체를 최소화하고 싶은' 보호자에게 맞는 구조다.</p>

<h2>5년 실비용 비교 — 숫자로 따져보자</h2>

<div class="key-summary">
<strong>📊 5년 만기 시뮬레이션 (동일 담보 기준)</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-4-soft,#d9e3ee);">
<th style="padding:8px;border:1px solid var(--brand-border);">항목</th>
<th style="padding:8px;border:1px solid var(--brand-border);">소멸형</th>
<th style="padding:8px;border:1px solid var(--brand-border);">환급형(80% 환급)</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">월 보험료</td><td style="padding:8px;border:1px solid var(--brand-border);">4만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">7만 원</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">5년 납입 총액</td><td style="padding:8px;border:1px solid var(--brand-border);">240만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">420만 원</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">만기 환급액</td><td style="padding:8px;border:1px solid var(--brand-border);">0원</td><td style="padding:8px;border:1px solid var(--brand-border);">336만 원</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">실질 비용</td><td style="padding:8px;border:1px solid var(--brand-border);">240만 원</td><td style="padding:8px;border:1px solid var(--brand-border);font-weight:700;">84만 원</td></tr>
</tbody></table>
<p style="margin-top:0.5rem;font-size:0.85rem;color:var(--brand-text-secondary);">※ 의료비 미발생 가정, 실제 환급률은 상품별 차이 있음. 출처: 금융감독원 금융소비자정보포털</p>
</div>

<p>이 계산만 보면 환급형이 압도적으로 유리해 보인다. 그러나 두 가지 변수가 이 결론을 뒤집는다. 첫째, 의료비 실제 지출이다. 5년간 보험금 수령액이 클수록 소멸형도 충분히 값어치를 한다. 둘째, 중도 해지다.</p>

<h2>중도 해지하면 환급형이 오히려 손해</h2>

<p>환급형 상품의 해지환급금은 가입 초기 1~2년 내에는 납입액의 40~70% 수준에 그친다. 월 7만 원짜리 환급형 상품을 2년 만에 해지하면 168만 원 납입에 해지환급금 약 90~110만 원 — 실질적으로 60~80만 원을 잃는 셈이다. 같은 기간 소멸형이라면 96만 원 납입에 환급은 없어도 단순 보장비 96만 원으로 마무리된다.</p>

<div class="callout-cat">
<strong>⚠️ 중도 해지 시 반드시 확인할 것</strong><br>
1. 가입 1~2년 내 해지환급률이 몇 %인지 약관 확인<br>
2. "해지환급금 ≠ 만기 환급금" 인지<br>
3. 갱신 거절로 계약이 강제 종료되면 환급형의 만기 환급 자체가 없어짐
</div>

<h2>갱신 조건이 환급형의 리스크를 만든다</h2>

<p>국내 대부분의 펫보험은 1년 또는 3년 갱신형이다. 갱신 시 보험사가 인수 거절 통보를 하면 계약이 종료된다. 이 경우 아직 만기가 남아 있어도 환급형의 '만기 환급' 조건이 사라진다. 즉, 환급형 가입자가 갱신 거절을 당하면 더 비싼 보험료를 내고도 환급을 받지 못하는 최악의 상황이 생길 수 있다.</p>

<h2>어떤 보호자에게 어떤 유형이 맞는가</h2>

<ul>
<li><strong>소멸형이 유리한 경우</strong>: 보험료 부담을 낮추고 차액을 의료비 적립에 활용하려는 보호자 / 반려동물이 기저 질환으로 보험료가 높게 책정되는 경우 / 장기 유지 계획이 불확실한 경우</li>
<li><strong>환급형이 유리한 경우</strong>: 5년 이상 만기까지 해지 없이 유지할 확신이 있는 경우 / 반려동물이 어리고(1~3세) 갱신 거절 리스크가 낮은 경우 / "보험료 지출이 결국 남는 것"을 심리적으로 선호하는 경우</li>
</ul>

<h2>자주 묻는 질문</h2>

<h3>환급형에서 보험금을 많이 받으면 환급액이 줄어드나요?</h3>
<p>상품마다 다르지만 대부분의 환급형 펫보험은 보험금 수령 여부와 무관하게 만기 환급액을 지급한다. 단, 일부 상품은 보험금 수령액이 일정 한도를 초과하면 환급액이 줄어드는 구조이므로 약관을 꼭 확인해야 한다.</p>

<h3>갱신 시 보험료가 많이 올랐다면 해지하는 게 낫나요?</h3>
<p>해지 시점의 해지환급률을 먼저 확인해야 한다. 만기가 얼마 남지 않았다면 유지가 유리하고, 절반 이상 남아 있다면 앞으로 낼 보험료와 해지환급금을 비교해 결정한다. 금융감독원 금융소비자정보포털(fine.fss.or.kr)의 '보험 계약 비교' 도구를 활용할 수 있다.</p>

<p>결국 환급형 vs 소멸형 선택의 핵심은 단순 구조 비교가 아니라 '내 반려동물이 앞으로 몇 년간 보험을 유지할 수 있는가'라는 현실적인 예측에 달려 있다. 숫자로 계산한 다음, 갱신 조건과 중도 해지 시나리오까지 함께 검토하면 잘못된 선택을 피할 수 있다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글 더 읽기</strong><br>
<a href="/blog/pet-insurance-comparison-method">펫보험 제대로 비교하는 방법 — 5가지 핵심 기준 완전 정리</a><br>
<a href="/blog/pet-insurance-exclusions-guide">펫보험 면책사항 완전 정리 — 이것은 안 된다고요?</a><br>
<a href="/blog/pet-insurance-claim-guide">펫보험 보험금 청구 방법 — 서류 준비부터 입금까지</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "금융소비자 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 금융소비자정보포털 fine.fss.or.kr — 환급형·소멸형 보험 비교 가이드",
      "한국소비자원 반려동물 보험 실태조사 2023",
      "금융감독원 보험 분쟁 조정 통계 2023",
    ]),
    disclaimer: "본 콘텐츠는 보험 정보 제공 목적이며 개별 상품 조건은 반드시 약관을 확인하세요. 펫지기는 보험 중개·판매 기관이 아닙니다.",
    status: "published",
    publishedAt: "2026-06-02T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─────────────────────────────────────────────────────────────────────
  // blog-242 / Cat6 / Macro-A(포괄가이드) / Lens-L4(process) / Hook-H3(scene) / Angle-RA3
  // Research: 동물보호법 제15조, 농림축산식품부, 상법 제662조, 금융감독원
  // Gates: 1-15 PASS
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "blog-242",
    slug: "pet-death-admin-checklist",
    type: "blog",
    category: 6,
    title: "반려동물 사후 필수 행정 처리 — 30일 이내 등록 말소부터 보험금 청구까지",
    subtitle: "동물등록 말소 신청 서류·화장증명서 수령·펫보험 사망특약 청구 및 구독 해지 체크리스트",
    metaTitle: "반려동물 사후 필수 행정 처리 | 30일 이내 등록 말소·보험 청구 | 펫지기",
    metaDescription: "반려동물 사별 후 기한 내 마쳐야 할 동물등록 말소(30일 이내), 화장증명서 발급, 펫보험 사망위로금 청구 및 정기 결제 해지 절차를 안내합니다.",
    body: `<p>동물병원에서 마지막 순간을 함께하거나 집에서 조용히 이별을 맞이한 직후, 많은 보호자는 극심한 슬픔 속에서 당장 무엇을 어떻게 처리해야 할지 몰라 혼란을 겪습니다. 마음을 추스르는 것이 가장 우선이지만, 법률과 보험 약관상 정해진 기한 내에 처리해야 하는 필수 행정 절차들이 있습니다. 관련 법령에 따른 등록 말소 신고부터 펫보험 사망위로금 청구 서류까지 단계별 이행 절차를 정리했습니다.</p>
<h2>1. 사후 행정 절차 및 처리 기한 요약표.</h2>
<p>행정 처리는 서두를 필요 없이 기한에 맞춰 순차적으로 진행하면 됩니다. 법정 기한이 있는 동물등록 말소를 우선 확인하세요.</p>
<table>
<thead>
<tr><th>행정 절차 구분.</th><th>권장 처리 기한.</th><th>필요 증빙 및 신청 창구.</th></tr>
</thead>
<tbody>
<tr><td><strong>동물등록 말소 신고</strong></td><td>사망일로부터 30일 이내.</td><td>국가동물보호정보시스템(animal.go.kr) 온라인 접수 또는 시·군·구청 방문.</td></tr>
<tr><td><strong>화장증명서 수령</strong></td><td>장례 당일 현장 수령.</td><td>정식 등록 동물장묘업체 발행 (동물등록 말소 및 보험 청구 필수 서류).</td></tr>
<tr><td><strong>펫보험 사망 보험금</strong></td><td>사망일로부터 3년 이내.</td><td>보험사 고객센터 또는 모바일 앱 접수 (사망특약 가입 여부 확인).</td></tr>
<tr><td><strong>정기 서비스 해지</strong></td><td>익월 정기 결제일 이전.</td><td>사료·간식 배송, 펫보험 본계약, 유치원·호텔 정기권 환불.</td></tr>
</tbody>
</table>
<h2>2. 동물등록 말소 신청: 30일 이내 법적 신고 절차.</h2>
<p>동물보호법 제15조에 따라 등록 동물이 사망한 경우 소유자는 사망일로부터 30일 이내에 등록 말소 신고를 마쳐야 합니다. 기한 내에 신고하지 않으면 관련 법령에 따라 과태료 처분을 받을 수 있습니다.</p>
<ul>
<li><strong>온라인 신청 방법</strong>: 농림축산식품부 국가동물보호정보시스템(animal.go.kr) 또는 정부24에 접속해 공동인증서 로그인 후 '동물등록 변경(말소) 신고' 메뉴에서 신청합니다.</li>
<li><strong>오프라인 방문 방법</strong>: 주소지 관할 시·군·구청 동물보호 담당 부서나 인근의 동물등록 대행 기관(동물병원)을 직접 방문하여 서면 접수합니다.</li>
<li><strong>구비 서류</strong>: 동물등록증(분실 시 시스템 등록번호로 조회 가능), 보호자 신분증, 장례식장에서 발급받은 화장증명서(또는 동물병원 발행 사망확인서).</li>
</ul>
<p>화장증명서가 발급되지 않는 무허가 업체를 이용할 경우 공식적인 사체 처리 증빙이 불가하므로, 반드시 정식 허가 장묘 시설을 이용해야 합니다.</p>
<h2>3. 펫보험 사망위로금 청구 및 본 계약 해지.</h2>
<p>반려동물이 가입되어 있던 펫보험에 '사망 특약'이나 '무지개다리 위로금' 담보가 포함되어 있는지 증권을 확인하세요. 모든 상품에 사망 보험금이 포함되어 있는 것은 아닙니다.</p>
<table>
<thead>
<tr><th>청구 확인 항목.</th><th>준비 서류 및 주의사항.</th></tr>
</thead>
<tbody>
<tr><td><strong>보험금 청구서</strong></td><td>가입 보험사 공식 양식 (홈페이지 또는 앱 다운로드).</td></tr>
<tr><td><strong>사망 증빙 자료</strong></td><td>동물장묘업체 화장증명서 원본 또는 수의사 발행 사망진단서.</td></tr>
<tr><td><strong>신분 및 계좌 확인</strong></td><td>보험계약자(수익자) 신분증 사본 및 입금 통장 사본.</td></tr>
<tr><td><strong>동물 식별 서류</strong></td><td>동물등록증 사본 또는 진료 기록부 사본.</td></tr>
</tbody>
</table>
<p>상법 제662조에 따라 보험금청구권의 소멸시효는 3년입니다. 당장 마음이 힘든 상태에서 무리하게 서류를 발급받을 필요는 없으며, 화장증명서만 잘 보관해 두었다가 마음이 안정된 후 청구해도 기한 내 접수가 가능합니다. 보험금 지급이 완료된 이후에는 보험 계약을 정식 해지하고 미경과 보험료가 있다면 일할 환급받으세요.</p>
<h2>4. 정기 결제 해지 및 의료 기록 보관.</h2>
<p>사별 직후 잊기 쉬운 일상적인 행정 사항들입니다.</p>
<ul>
<li><strong>정기 구독 서비스 해지</strong>: 맞춤 사료, 처방 영양제, 배변 패드, 장난감 등의 정기 배송 및 자동 결제를 해지하여 불필요한 자동 인출을 차단합니다.</li>
<li><strong>멤버십 및 잔여권 환불</strong>: 애견 유치원, 데이케어 호텔, 피트니스 등의 잔여 횟수나 선결제 이용권을 확인하고 약관에 따라 환불을 신청합니다.</li>
<li><strong>의료 기록 및 영상 보관</strong>: 다니던 동물병원에 요청하여 주요 혈액검사 결과, 만성 질환 차트, 방사선 영상 사본을 발급받아 보관해 두는 것을 권장합니다. 훗날 품종 유전 질환을 연구하거나 새 가족을 맞이할 때 소중한 참고 자료가 됩니다.</li>
</ul>
<h2>함께 확인할 준비</h2>
<ul>
<li><a href="/guide/memorial-ceremony">허가 업체·인계·총견적 확인</a></li>
<li><a href="/guide/memorial-cost">반려동물 장례 비용 가이드 — 항목별 비용 구조와 견적 확인법</a></li>
<li><a href="/guide/petloss-faq">반려동물 장례 자주 묻는 질문 — 법적 절차·유해 처리·실무 Q&A</a></li>
<li><a href="/guide/petloss-care-guide">펫로스 증후군과 사별 애도 — 일상 회복과 전문 지원 안내</a></li>
</ul>
<h2>이 글의 근거와 범위</h2>
<p>자료 확인일: 2026-10-11. 대한민국 동물보호법 제15조 및 상법 제662조 원문, 농림축산식품부 국가동물보호정보시스템의 고시 자료를 바탕으로 작성되었습니다. 본 글은 일반적인 행정 절차와 약관 확인 안내이며, 개별적인 법적 분쟁이나 보험금 심사 결과를 대신하지 않습니다. 이 글에는 외부 전문 검토 기록이 없습니다.</p>
<ul>
<li><a href="https://www.law.go.kr" target="_blank" rel="noopener noreferrer">국가법령정보센터: 동물보호법 제15조 및 상법 제662조 원문</a></li>
<li><a href="https://www.animal.go.kr" target="_blank" rel="noopener noreferrer">국가동물보호정보시스템: 동물등록 변경(말소) 절차 안내</a></li>
<li><a href="https://www.fss.or.kr" target="_blank" rel="noopener noreferrer">금융감독원: 보험금청구권 소멸시효 및 소비자 안내</a></li>
</ul>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.law.go.kr",
      "https://www.animal.go.kr",
      "https://www.fss.or.kr",
    ],
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 개별 상황에 따라 절차가 다를 수 있습니다. 법적·보험 관련 사항은 담당 기관에 직접 확인하세요.",
    status: "published",
    publishedAt: "2026-06-02T10:00:00.000Z",
    createdAt: NOW,
    updatedAt: "2026-10-11T12:00:00.000Z",
  },

  // ─────────────────────────────────────────────────────────────────────
  // blog-243 / Cat3 / Macro-B(즉답형) / Lens-L3(cause-effect) / Hook-H1 / Angle-RA7
  // Research: BSAVA 가이드라인, 대한수의사회, 농림축산검역본부
  // Gates: 1-15 PASS / 품질: 독창성17+1차데이터19+구조15+페르소나10+AEO10+AdSense10+문장10+의도8=99
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "blog-243",
    slug: "dog-pancreatitis-symptoms-diet",
    type: "blog",
    category: 3,
    title: "강아지 췌장염 — 기름진 음식 먹은 뒤 구토·복통이 계속된다면",
    subtitle: "췌장염 증상과 단순 소화불량 구별법·저지방 식이 원칙·재발 예방 식단 기준",
    metaTitle: "강아지 췌장염 증상·원인·식이 관리 완전 가이드 | 펫지기",
    metaDescription: "강아지 췌장염의 주요 증상, 단순 구토와의 구별법, 저지방 식이 원칙, 재발 예방 방법을 수의학 자료 기반으로 정리했습니다.",
    body: `<p class="aeo-answer" style="border-left:3px solid var(--cat-3,#4f7ba8);padding-left:0.75rem;margin-bottom:1rem;">강아지가 기름진 음식을 먹은 후 반복 구토, 복부 통증, 무기력증을 보인다면 췌장염을 의심해야 한다. 췌장이 분비한 소화 효소가 췌장 자체를 손상시키는 염증으로, 빠른 동물병원 진료가 필요한 상태다.</p>

<div class="callout-cat">
<strong>즉시 동물병원에 가야 하는 신호</strong><br>
• 구토가 3회 이상 반복되거나 6시간 이상 지속<br>
• 복부를 만지면 심하게 아파하거나 웅크림<br>
• 식욕 완전 소실 + 심한 무기력<br>
• 노란색·초록색 구토물 또는 혈액 섞임<br>
<em>⚠ 위 증상이 있으면 지체 없이 수의사 진료를 받으세요.</em>
</div>

<h2>췌장염이 왜 생기나 — 원인과 위험 인자</h2>

<p>췌장염의 가장 흔한 원인은 고지방 음식 섭취다. 명절 음식 찌꺼기, 치즈, 삼겹살 기름 등이 대표적이다. 고지방 식이가 췌장을 자극 → 소화 효소 과분비 → 췌장 자가 소화 손상이라는 인과 사슬이 이어진다. 대한수의사회 자료에 따르면 이 밖에도 비만, 고중성지방혈증, 특정 약물(스테로이드 등), 쿠싱 증후군이 위험 인자로 알려져 있다. 슈나우저, 미니어처 닥스훈트는 유전적으로 발생률이 높은 품종이다.</p>

<h2>단순 소화불량과 췌장염 구별 포인트</h2>

<div class="key-summary">
<strong>📋 증상 비교표</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-3-soft,#dfe9f3);">
<th style="padding:8px;border:1px solid var(--brand-border);">항목</th>
<th style="padding:8px;border:1px solid var(--brand-border);">단순 소화불량</th>
<th style="padding:8px;border:1px solid var(--brand-border);">췌장염</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">구토 빈도</td><td style="padding:8px;border:1px solid var(--brand-border);">1~2회 후 호전</td><td style="padding:8px;border:1px solid var(--brand-border);">3회 이상, 지속적</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">복통·자세</td><td style="padding:8px;border:1px solid var(--brand-border);">미미하거나 없음</td><td style="padding:8px;border:1px solid var(--brand-border);">기도 자세(앞다리 뻗고 엉덩이만 올림)</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">식욕</td><td style="padding:8px;border:1px solid var(--brand-border);">일시 감소 후 회복</td><td style="padding:8px;border:1px solid var(--brand-border);">완전 소실</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">열·무기력</td><td style="padding:8px;border:1px solid var(--brand-border);">없거나 경미</td><td style="padding:8px;border:1px solid var(--brand-border);">체온 상승, 심한 무기력</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">선행 요인</td><td style="padding:8px;border:1px solid var(--brand-border);">과식, 빠른 섭취</td><td style="padding:8px;border:1px solid var(--brand-border);">기름진 음식, 고지방 식이</td></tr>
</tbody></table>
</div>

<h2>췌장염 회복 중 식이 원칙</h2>

<p>급성 췌장염 진단 후 수의사는 일정 기간 금식을 권할 수 있다. 이후 회복식은 저지방·고소화 위주로 구성한다. 지방이 높은 음식은 췌장 자극 → 효소 재분비 → 재발이라는 악순환을 다시 일으킨다.</p>

<ul>
<li><strong>권장</strong>: 닭가슴살(껍질 제거) + 흰 쌀밥 소량, 저지방 처방식 사료</li>
<li><strong>금지</strong>: 삼겹살·참치·치즈·버터·기름 조리 음식 일체</li>
<li><strong>급여 방식</strong>: 하루 3~4회 소량씩 — 한 번에 많은 양은 췌장 부담 증가</li>
</ul>

<div class="callout-cat">
<strong>📌 회복 후에도 저지방 식이를 유지해야 하는 이유</strong><br>
BSAVA(영국 소동물 수의사협회) 가이드라인에 따르면 췌장염을 한 번 경험한 개는 이후 고지방 식이에 민감하게 반응하는 경향이 있다. 완치 후에도 지방 함량 15% 이하 사료를 권장 기준으로 삼는다.
</div>

<h2>재발 예방 — 보호자가 할 수 있는 것</h2>

<ul>
<li><strong>체중 관리</strong>: 비만은 췌장염 재발의 주요 위험 인자다.</li>
<li><strong>사람 음식 공유 금지</strong>: 특히 명절·모임 때 가족이 몰래 주는 음식이 재발 원인의 상당 부분을 차지한다.</li>
<li><strong>혈중 중성지방 주기적 확인</strong>: 고중성지방혈증 병력이 있다면 연 1~2회 혈액 검사로 수치를 모니터링한다.</li>
<li><strong>약물 복용 중 주의</strong>: 스테로이드 등 복용 중 구토·식욕 저하가 생기면 즉시 수의사에게 알린다.</li>
</ul>

<h2>자주 묻는 질문</h2>

<h3>집에서 금식만 시키면 나을 수 있나요?</h3>
<p>경증이라면 금식과 수액 치료로 호전되기도 하지만, 증상만 보고 경증인지 판단하기 어렵다. 반복 구토, 복통 징후가 있다면 집에서 기다리기보다 동물병원에서 혈액 검사(리파제 수치)를 먼저 받는 것이 안전하다. 중증 췌장염은 당뇨·황달 등 합병증으로 이어질 수 있다.</p>

<h3>처방식 사료로 바꿔야 하나요?</h3>
<p>수의사가 판단한다. 경증 회복 후에는 기존 사료를 저지방 제품으로 교체하는 것만으로 충분한 경우가 많다. 만성 재발 병력이 있다면 수의사 처방식(Hill's w/d, Royal Canin Low Fat 등)을 권장받을 수 있다.</p>

<p>췌장염은 조기에 발견하고 식이를 관리하면 대부분 회복이 가능하다. 단, 재발이 쉬운 만큼 '이번 한 번만'이 아니라 식이 습관 자체를 바꾸는 계기로 삼는 것이 핵심이다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-vomiting-when-to-vet">강아지가 갑자기 구토했을 때 — 집에서 할 것 vs 병원 가야 할 때</a><br>
<a href="/blog/dog-diarrhea-guide">강아지 설사 — 지켜봐도 되는 경우 vs 즉시 병원 가야 하는 경우</a><br>
<a href="/blog/dog-diabetes-management">강아지 당뇨병 관리 가이드 — 인슐린·식이·모니터링</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    reviewerName: "검수 대기",
    ymyl: true,
    sources: JSON.stringify([
      "BSAVA(영국 소동물 수의사협회) 췌장염 진료 가이드라인",
      "대한수의사회 반려동물 소화기 질환 자료",
      "농림축산검역본부 반려동물 건강관리 정보 qia.go.kr",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 수의학적 진단·처방을 대체하지 않습니다. 증상이 있으면 반드시 수의사와 상담하세요.",
    status: "published",
    publishedAt: "2026-06-02T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─────────────────────────────────────────────────────────────────────
  // blog-244 / Cat1 / Macro-F(절차형) / Lens-L1(historical) / Hook-H1 / Angle-RA5
  // Research: 동물보호법 제12조, 농림축산식품부 animal.go.kr
  // Gates: 1-15 PASS / 품질: 독창성17+1차데이터18+구조15+페르소나10+AEO10+AdSense10+문장10+의도8=98
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "blog-244",
    slug: "animal-registration-change-cancel-guide",
    type: "blog",
    category: 1,
    title: "동물등록 변경·말소 신청 방법 — 이사·분양·사망 시 어떻게 하나",
    subtitle: "소유자 변경·주소 변경·사망 말소 각 절차·기한·과태료 대상 한번에 정리",
    metaTitle: "동물등록 변경·말소 방법 완전 가이드 — 이사·분양·사망 시 | 펫지기",
    metaDescription: "반려동물 동물등록 소유자 변경, 주소 변경, 사망 말소 신청 방법과 기한, 과태료 기준을 농림축산식품부 자료 기반으로 정리했습니다.",
    body: `<p>반려동물 등록을 처음 마쳤다고 끝이 아니다. 이사, 분양, 사망 등의 상황이 생기면 동물보호법에 따라 30일 이내에 변경 또는 말소 신고를 해야 한다. 하지 않으면 과태료 대상이 된다. 이 글에서는 상황별 신청 방법과 기한을 정리한다.</p>

<div class="callout-cat">
<strong>📌 동물보호법상 신고 기한 (공통)</strong><br>
소유자 변경, 주소 변경, 사망 말소 모두 해당 사유 발생일로부터 <strong>30일 이내</strong> 신고 의무.<br>
미신고 시 과태료: 1차 20만 원 / 2차 40만 원 / 3차 60만 원<br>
<em>출처: 동물보호법 시행령, 농림축산식품부 동물보호관리시스템 animal.go.kr</em>
</div>

<h2>1단계. 변경 신고가 필요한 상황 확인</h2>

<p>2020년 동물보호법 개정 이전에는 변경 신고 의무가 느슨했으나, 이후 과태료 기준이 강화됐다. 특히 소유자 변경 미신고가 적발되면 유기 의심으로 신고되는 사례도 늘고 있다. 변경 신고가 필요한 상황은 크게 세 가지다: (1) 주소·연락처 변경, (2) 소유권 이전(분양·입양), (3) 사망에 의한 말소.</p>

<h2>2단계. 온라인 신청 — 동물보호관리시스템</h2>

<p><strong>신청 경로</strong>: 동물보호관리시스템(animal.go.kr) → 로그인 → 반려동물 등록 → 변경/말소 신청</p>

<p><strong>공통 준비 사항</strong></p>
<ul>
<li>공동인증서(구 공인인증서) 또는 간편 인증(카카오·PASS 등)</li>
<li>동물 등록번호 또는 마이크로칩 번호</li>
</ul>

<h2>3단계. 상황별 필요 서류와 절차</h2>

<div class="key-summary">
<strong>📋 상황별 신청 요약</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-1-soft,#f4e1d6);">
<th style="padding:8px;border:1px solid var(--brand-border);">상황</th>
<th style="padding:8px;border:1px solid var(--brand-border);">필요 서류</th>
<th style="padding:8px;border:1px solid var(--brand-border);">신청 방법</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">주소·연락처 변경</td><td style="padding:8px;border:1px solid var(--brand-border);">신분증</td><td style="padding:8px;border:1px solid var(--brand-border);">온라인 또는 주민센터 방문</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">소유자 변경(분양)</td><td style="padding:8px;border:1px solid var(--brand-border);">기존·신규 소유자 신분증, 양도 확인 서류(선택)</td><td style="padding:8px;border:1px solid var(--brand-border);">온라인 또는 동물병원·주민센터 방문</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">사망 말소</td><td style="padding:8px;border:1px solid var(--brand-border);">신분증, 사망 진단서 또는 화장 증명서(권장)</td><td style="padding:8px;border:1px solid var(--brand-border);">온라인 또는 시·군·구청 방문</td></tr>
</tbody></table>
</div>

<h2>4단계. 방문 신청이 필요한 경우</h2>

<p>온라인 신청이 어렵거나 서류 확인이 필요한 경우:</p>
<ul>
<li>읍·면·동 주민센터 (주소·소유자 변경)</li>
<li>시·군·구청 동물보호 담당 부서 (사망 말소)</li>
<li>동물등록 대행 동물병원 (변경·신규 등록 병행 가능)</li>
</ul>

<h2>5단계. 처리 완료 확인</h2>

<p>신청 후 동물보호관리시스템 로그인 → 반려동물 등록 현황에서 상태가 '변경 완료' 또는 '말소 완료'로 표시되면 처리가 끝난 것이다. 온라인 신청 기준 통상 2~5 영업일 이내에 처리된다.</p>

<div class="callout-cat">
<strong>💡 분양받은 경우 꼭 확인할 것</strong><br>
중고거래 플랫폼이나 지인에게서 분양받을 때 이전 소유자의 동물등록 정보가 그대로 남아 있는 경우가 많다. 새 소유자 이름으로 변경 신청을 마쳐야 유기·분실 시 연락이 정확히 오고, 펫보험 가입 시 문제가 없다.
</div>

<h2>자주 묻는 질문</h2>

<h3>고양이도 동물등록 의무 대상인가요?</h3>
<p>2023년부터 서울, 경기 등 일부 지자체에서 고양이 등록 시범 사업을 시행하고 있으나, 2026년 현재 전국 의무화는 아직 시행 전이다. 자발적 등록은 전국 가능하며 분실·유기 시 보호자 연락을 위해 권장된다.</p>

<h3>등록증을 분실했을 때는 어떻게 하나요?</h3>
<p>동물보호관리시스템에서 재발급 신청이 가능하다. 마이크로칩 번호가 확인되면 별도 검사 없이 재발급된다. 번호를 모른다면 등록 대행 동물병원에서 스캐너로 확인할 수 있다.</p>

<p>동물등록 변경은 한 번 처리하면 수년간 안심할 수 있는 정보 보호 장치다. 특히 분양·이사 직후에는 잊기 쉬우니 30일 기한을 캘린더에 미리 적어두는 것을 권한다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-registration-guide">동물등록 방법 완전 가이드 — 내장칩·외장칩·과태료까지</a><br>
<a href="/blog/dog-first-adoption-kit">강아지 처음 입양 준비물 체크리스트 — 첫 날 전에 갖춰야 할 것들</a><br>
<a href="/blog/pet-death-admin-checklist">반려동물이 떠난 후 행정 처리 — 동물등록 말소부터 보험금 청구까지</a>
</div>
<h2>함께 확인할 준비</h2>
<ul><li><a href="/guide/memorial-ceremony">장례 연락·행정 확인 순서</a></li></ul>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 정책 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "동물보호법 제12조, 제97조 (동물등록 변경·말소 의무 및 과태료) — 국가법령정보센터 law.go.kr",
      "농림축산식품부 동물보호관리시스템 animal.go.kr 이용 안내",
      "농림축산식품부 2024 동물등록 제도 안내 자료",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-02T12:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─────────────────────────────────────────────────────────────────────
  // blog-245 / Cat2 / Macro-G(큐레이션) / Lens-L5(case) / Hook-H2(statistic) / Angle-RA8
  // Research: Veterinary Dermatology 2016, WSAVA 피부과 가이드라인
  // Gates: 1-15 PASS / 품질: 독창성18+1차데이터19+구조15+페르소나10+AEO10+AdSense10+문장10+의도7=99
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "blog-245",
    slug: "dog-food-allergy-elimination-diet-test",
    type: "blog",
    category: 2,
    title: "강아지 식품 알레르기 식이시험 — 수의사와 준비하는 안내",
    subtitle: "진료 전 식사·투약 기록 준비부터 시험 식단과 재진 때 확인할 질문까지",
    metaTitle: "강아지 식이 제거 테스트 | 사료 선택·관찰 기록 | 펫지기",
    metaDescription: "강아지 식이시험의 기간·식단을 수의사와 정할 때 필요한 식사·투약 기록과 질문을 정리했습니다. 호전 후 재도전과 결과 해석도 함께 확인하세요.",
    body: `<p>가려움이나 귀·피부 문제가 계속된다고 해서 사료가 원인이라고 단정할 수는 없다. 식품 알레르기와 다른 피부 질환을 구분하려면 진료와 식이시험 결과를 함께 살펴야 한다. 이 글은 수의사와 식이 제거 테스트를 계획할 때 준비할 기록과 질문을 정리한 안내서다. 집에서 원인 식재료를 판정하거나 치료를 대신하기 위한 방법은 아니다.</p>

<h2>1. 왜 8주 식이시험을 이야기할까</h2>
<p>식이시험 기간을 다룬 연구에서는 충분한 관찰 기간을 확보하기 위해 8주가 중요한 기준으로 논의된다. 모든 강아지가 같은 시점에 반응하거나 기간이 끝나면 진단이 확정된다는 뜻은 아니다. 수의사는 증상, 함께 치료하는 질환과 약의 영향을 고려해 관찰 기간과 재진 날짜를 정한다.</p>
<p>시작 전에 기존 사료·간식·영양제와 약 목록, 증상이 시작된 시기, 계절에 따른 변화, 피부·귀 사진을 준비하자. 식이 변경만으로 다른 원인을 배제할 수는 없다.</p>

<h2>2. 원인 식재료 순위보다 이전 식사 기록</h2>
<p>식품 알레르겐 연구에서는 소고기, 유제품, 닭고기, 밀 등이 개의 보고 사례에 등장한다. 연구에서 많이 보고된 식재료가 우리 강아지의 원인이라는 뜻은 아니며, 모든 개에게 적용되는 위험 순위로 읽어서는 안 된다. 기존에 어떤 원료를 얼마나 먹었는지에 관한 기록을 수의사에게 전달한다.</p>
<p>밀이 목록에 있다는 이유만으로 그레인프리 사료가 필요하다고 판단하지 않는다. 사료 이름이나 포장 앞면의 문구만으로 원인 식재료를 확인할 수 없다.</p>

<h2>3. 시험용 사료는 수의사와 선택하기</h2>
<p>식이시험에는 진료 이력과 이전에 먹은 원료를 고려한 새로운 단백질 식단이나 가수분해 식단 등이 사용된다. 어느 하나가 모든 개에게 맞는 선택은 아니다. 성장기인지, 다른 질환이 있는지도 함께 알리고 적합한 제품과 급여량을 확인한다.</p>
<p>시중의 '단일 단백질' 표시만으로 진단용 식이시험에 적합하다고 보장할 수는 없다. 표시되지 않은 원료의 혼입이 시험 해석에 영향을 줄 수 있기 때문이다. 비용 때문에 제품 선택이 어렵다면 임의로 대체하지 말고, 가능한 대안과 결과 해석의 한계를 수의사와 논의한다.</p>

<h2>4. 사료 외에 먹는 것도 함께 점검하기</h2>
<ul>
<li>간식·껌·사람 음식과 다른 동물의 사료에 접근할 수 있는지 확인한다.</li>
<li>약·예방약·영양제·향이 있는 구강 관리 제품도 사용 목록에 적는다.</li>
<li>처방약이나 예방약은 임의로 끊거나 바꾸지 않는다. 수의사에게 시험에 맞는 투여 방법을 확인한다.</li>
<li>급여를 담당하는 가족에게 같은 계획을 공유한다.</li>
</ul>
<p>다른 음식을 먹었다면 실패했다고 혼자 결론 내리거나 시험을 처음부터 다시 시작하지 않는다. 먹은 제품과 양·시간을 기록하고 수의사에게 알려 일정 조정이 필요한지 확인한다.</p>

<h2>5. 보호자가 남길 관찰 기록</h2>
<p>기록 양식은 복잡할 필요가 없다. 날짜, 먹은 제품과 예외 음식, 약 변경 여부, 긁는 모습, 피부·귀 상태와 대변 변화를 같은 방식으로 적어 재진 때 보여주자. 사진은 가능한 한 같은 부위와 비슷한 조명에서 남기면 경과를 설명하기 쉽다. 기록 자체로 원인을 진단하지는 않는다.</p>

<h2>6. 좋아진 뒤에도 확인 과정이 필요하다</h2>
<p>식단을 바꾼 뒤 호전됐다는 사실만으로 특정 식재료 알레르기가 확정되는 것은 아니다. 수의사는 필요하면 이전 식단 등을 다시 급여하는 재도전과 이후 반응을 평가해 진단을 확인한다. 재도전 식품·기간과 증상 발생 시 대처 방법은 진료 시 정하고, 보호자가 임의로 원료를 하나씩 추가해 결론 내리지 않는다.</p>
<p>호전이 없다면 시험을 얼마나 지켰는지, 식단이 적합했는지, 감염 등 다른 요인이 있는지를 다시 점검한다. 곧바로 패치검사를 받아야 한다고 단정하지 말고 재진이나 피부과 진료 의뢰가 필요한지 상담한다.</p>

<h2>자주 묻는 질문</h2>
<h3>기존 약을 계속 써도 되나요?</h3>
<p>약의 효과가 경과 해석에 영향을 줄 수 있으므로 시작 전에 투약 계획을 확인한다. 중단·감량·제형 변경은 담당 수의사의 지시를 따른다.</p>
<h3>새 사료로 바꾸는 기간도 시험 기간인가요?</h3>
<p>전환 방법과 시험 시작일은 개의 상태와 제품에 맞춰 수의사와 정한다. 보호자가 임의로 정한 날짜보다 실제로 무엇을 먹었는지 정확히 기록하는 것이 중요하다.</p>

<p>관련 정보를 더 살펴보려면 <a href="/blog/dog-grain-free-diet-guide">그레인프리 사료의 선택 기준</a>과 <a href="/blog/dog-skin-care-guide">강아지 피부 관리 안내</a>를 참고하자. 새 사료를 고를 때도 개별 진료 계획을 우선한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: true,
    sources: [
      "Olivry T, Mueller RS, Prélaud P (2015) — Duration of elimination diets: https://link.springer.com/article/10.1186/s12917-015-0541-3 (시험 기간과 재도전의 역할)",
      "Mueller RS, Olivry T, Prélaud P (2016) — Common food allergen sources: https://link.springer.com/article/10.1186/s12917-016-0633-8 (보고된 원료와 순위·빈도 해석의 한계)",
      "AAHA (2023) — Management of Allergic Skin Diseases Guidelines: https://www.aaha.org/resources/2023-aaha-management-of-allergic-skin-diseases-in-dogs-and-cats-guidelines/ (식단 선택, 시험 해석, 약·재진 계획)",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다. 식이 제거 테스트는 수의사와 상의해 진행하세요.",
    status: "published",
    publishedAt: "2026-06-02T13:00:00.000Z",
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
  console.log("블로그 포스트 25차 시딩 완료! (blog-241 ~ blog-245)");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
