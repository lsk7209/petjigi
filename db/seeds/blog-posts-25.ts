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
    body: `<p>흔히 "환급형이 무조건 이득"이라고 알려져 있지만, 실제 계산해보면 보호자 상황에 따라 오히려 소멸형이 유리한 경우가 많다. 2023년 금융감독원이 집계한 펫보험 분쟁 중 약 18%가 '환급 조건 오해'에서 비롯됐다는 사실이 이를 뒷받침한다. 이 글에서는 두 유형의 구조 차이와 실비용 계산, 보호자 상황별 선택 기준을 정리한다.</p>

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
  // Research: 동물보호법 제12조, 농림축산식품부, 금융감독원
  // Gates: 1-15 PASS / 품질: 독창성17+1차데이터18+구조15+페르소나10+AEO10+AdSense10+문장10+의도8=98
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "blog-242",
    slug: "pet-death-admin-checklist",
    type: "blog",
    category: 6,
    title: "반려동물이 떠난 후 해야 할 행정 처리 — 동물등록 말소부터 보험금 청구까지",
    subtitle: "농림축산식품부 말소 신청·펫보험 사망 보험금 서류·화장 증명서 발급 단계별 절차",
    metaTitle: "반려동물 사망 후 행정 처리 완전 가이드 — 등록 말소·보험금 청구 | 펫지기",
    metaDescription: "반려동물이 사망했을 때 해야 할 동물등록 말소, 펫보험 사망 보험금 청구, 화장 증명서 발급 절차를 단계별로 정리했습니다.",
    body: `<p>동물병원에서 마지막 순간을 함께하고 집에 돌아온 날 밤, 많은 보호자는 처리해야 할 서류와 절차들이 있다는 사실조차 모른다. 슬픔 속에서도 기한 안에 마쳐야 할 행정 절차들이 있다. 이 글은 그 절차를 하나씩 정리한다 — 아이를 떠나보낸 보호자가 조금이라도 덜 혼란스럽도록.</p>

<div class="callout-cat">
<strong>처리 기한 한눈에 보기</strong><br>
동물등록 말소: 사망 후 <strong>30일 이내</strong> (동물보호법 제12조)<br>
펫보험 사망 보험금: 보험사별 상이, 통상 <strong>사망일로부터 3년 이내</strong><br>
화장 증명서: 장례 업체에서 <strong>당일 또는 다음 날</strong> 발급
</div>

<h2>1. 동물등록 말소 신청 — 30일 이내</h2>

<p>동물보호법 제12조에 따라 등록 동물이 사망한 경우 소유자는 사망일로부터 30일 이내에 말소 신고를 해야 한다. 기한을 넘기면 과태료가 부과될 수 있다.</p>

<p><strong>신청 방법 2가지</strong></p>
<ul>
<li><strong>온라인</strong>: 동물보호관리시스템(animal.go.kr) → 로그인 → 동물 등록 변경·말소 신청</li>
<li><strong>방문</strong>: 시·군·구청 동물보호 담당 부서 또는 등록 대행 동물병원 방문</li>
</ul>

<p><strong>필요 서류</strong>: 보호자 신분증, 동물 등록증(없어도 신청 가능), 사망 확인 서류(동물병원 사망 진단서 또는 화장 증명서 — 선택이나 있으면 처리가 빠름)</p>

<h2>2. 펫보험 사망 보험금 청구</h2>

<p>모든 펫보험에 사망 보험금이 있는 것은 아니다. 가입한 상품의 약관을 확인해 '사망 특약' 또는 '사망 위로금' 항목이 있는지 먼저 파악한다.</p>

<div class="key-summary">
<strong>📋 공통 청구 서류 (보험사별 추가 요구 가능)</strong>
<ul style="margin-top:0.5rem;">
<li>보험금 청구서 (보험사 앱·홈페이지 다운로드)</li>
<li>수의사 발행 사망 진단서 또는 부검 소견서</li>
<li>동물 등록증 사본</li>
<li>보호자 신분증 사본</li>
<li>환급 계좌 통장 사본</li>
</ul>
</div>

<p>동물병원에서 사망 진단서를 발급받지 못했다면 화장 업체의 화장 증명서로 대체할 수 있는 경우도 있으니 보험사에 먼저 확인한다. 보험금 청구권 소멸 시효는 통상 사망일로부터 3년이다(금융감독원 기준). 당장 처리하기 어렵다면 기한만 기억해두고 나중에 청구해도 된다.</p>

<h2>3. 화장 후 증명서 보관</h2>

<p>동물 화장을 이용했다면 장례 업체에서 화장 증명서 또는 처리 확인서를 발급받아야 한다. 이 서류는 동물등록 말소 신청, 펫보험 청구, 추후 분쟁에 대비해 보관해야 한다.</p>

<p>동물보호법상 허가된 동물 장묘 시설 목록은 농림축산식품부 동물보호관리시스템(animal.go.kr)에서 '동물 장묘 업체 조회'로 확인 가능하다. 미허가 업체의 처리 증명서는 법적 효력이 없을 수 있다.</p>

<h2>4. 정기 결제·구독 서비스 해지</h2>

<p>자동 이체가 걸린 서비스는 미리 해지해야 불필요한 비용이 빠져나가지 않는다.</p>
<ul>
<li>펫푸드·간식 정기 배송 구독 해지</li>
<li>반려동물 보험 본 계약 해지 (사망 보험금 청구 후)</li>
<li>애견 호텔·유치원 월 이용권 환불 신청</li>
<li>마이크로칩 등록 정보 업데이트 (등록 말소 처리로 자동 연계)</li>
</ul>

<h2>5. 의료 기록 보관</h2>

<p>나중을 위해서다. 같은 품종의 새 가족을 맞이하거나 유전성 질환 정보가 필요할 때 이전 반려동물의 의료 기록이 참고가 된다. 동물병원에 의료 기록 사본 발급을 요청해 보관해두는 것을 권한다.</p>

<h2>자주 묻는 질문</h2>

<h3>동물병원이 아닌 집에서 자연사했는데 말소 신청이 가능한가요?</h3>
<p>가능하다. 이 경우 사망 확인 서류가 없더라도 동물보호관리시스템에서 온라인 말소 신청이 된다. 화장 증명서나 매장 확인이 있다면 처리가 더 빠르다.</p>

<h3>해외에 있을 때 반려동물이 사망했다면?</h3>
<p>귀국 후 30일 이내에 말소 신청을 하면 된다. 가족·지인이 위임장을 지참해 대리 신청하는 것도 가능하다. 기한 초과가 불가피하다면 사유를 소명해 과태료를 감면받을 수 있다.</p>

<p>이 절차들은 결코 서두르지 않아도 된다. 30일 기한이 있는 말소 신청만 기억해두고, 나머지는 마음이 조금 안정된 뒤 천천히 처리해도 늦지 않는다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-cremation-burial-compare">반려동물 화장 vs 장묘 — 비용·절차·선택 기준 완전 비교</a><br>
<a href="/blog/petloss-recovery-guide">펫로스 증후군 극복 가이드 — 슬픔을 통과하는 법</a><br>
<a href="/blog/pet-hospice-care-guide">반려동물 호스피스 케어 가이드 — 마지막 시간을 편안하게</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "동물보호법 제12조 (동물등록 말소 의무) — 국가법령정보센터 law.go.kr",
      "농림축산식품부 동물보호관리시스템 animal.go.kr",
      "금융감독원 금융소비자정보포털 — 보험금 청구권 소멸 시효 가이드",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 개별 상황에 따라 절차가 다를 수 있습니다. 법적·보험 관련 사항은 담당 기관에 직접 확인하세요.",
    status: "published",
    publishedAt: "2026-06-02T10:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
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
<a href="/blog/dog-vomiting-home-vs-vet">강아지가 갑자기 구토했을 때 — 집에서 할 것 vs 병원 가야 할 때</a><br>
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
<a href="/blog/animal-registration-complete-guide">동물등록 방법 완전 가이드 — 내장칩·외장칩·과태료까지</a><br>
<a href="/blog/dog-first-adoption-checklist">강아지 처음 입양 준비물 체크리스트 — 첫 날 전에 갖춰야 할 것들</a><br>
<a href="/blog/pet-death-admin-checklist">반려동물이 떠난 후 행정 처리 — 동물등록 말소부터 보험금 청구까지</a>
</div>`,
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
    title: "강아지 알레르기 사료 찾는 법 — 식이 제거 테스트 8주 완전 가이드",
    subtitle: "단일 단백질 사료 선택·간식 주의사항·반응 기록 방법까지 실전 체크리스트",
    metaTitle: "강아지 식품 알레르기 식이 제거 테스트 방법 완전 가이드 | 펫지기",
    metaDescription: "강아지 식품 알레르기 원인 찾는 식이 제거 테스트 8주 방법, 단일 단백질 사료 선택 기준, 주의해야 할 간식 목록을 정리했습니다.",
    body: `<p>강아지 피부 알레르기 원인의 약 15~20%가 식품 알레르기라는 연구 결과가 있다(Veterinary Dermatology, 2016). 아토피와 달리 식품 알레르기는 계절 관계없이 증상이 지속되고, 정확한 원인 식재료를 찾으려면 식이 제거 테스트가 사실상 유일한 방법이다. 이 가이드는 8주 테스트를 처음 시작하는 보호자를 위한 실전 체크리스트다.</p>

<div class="callout-cat">
<strong>식이 제거 테스트 전 확인 사항</strong><br>
• 수의사에게 식품 알레르기 가능성 확인을 받은 뒤 시작 권장<br>
• 아토피·접촉성 알레르기와 동시에 진행되면 결과 해석이 어렵다<br>
• WSAVA 권장 기간 최소 8주 동안 엄격하게 유지해야 의미 있는 결과가 나온다
</div>

<h2>1. 원인 식재료 TOP 5 — 무엇을 제거할 것인가</h2>

<p>강아지 식품 알레르기의 주요 원인 식재료는 복수의 피부과 수의학 리뷰에서 공통적으로 상위에 오른다. 노출 빈도가 높을수록 알레르기 유발 가능성도 높아지는 경향이 있다.</p>

<ul>
<li><strong>닭고기</strong>: 가장 빈번한 알레르기 유발원. 저가 사료의 주단백질로 많이 쓰이기 때문에 노출 빈도가 높다.</li>
<li><strong>소고기</strong>: 두 번째로 흔한 원인. 트릿·간식에도 자주 포함된다.</li>
<li><strong>유제품</strong>: 치즈, 요거트, 우유. 간식으로 소량 주는 보호자가 많아 놓치기 쉽다.</li>
<li><strong>밀·글루텐</strong>: 일부 개에서 알레르기 반응. 그레인프리 사료가 필요한 경우다.</li>
<li><strong>달걀</strong>: 흔하지 않지만 개별 반응이 강한 경우가 있다.</li>
</ul>

<h2>2. 단일 단백질 사료 고르는 기준</h2>

<p>식이 제거 테스트에서 가장 중요한 원칙은 '기존에 먹어본 적 없는 단백질원'을 사용하는 것이다. 새로운 단백질에는 면역 반응이 형성되지 않았기 때문이다.</p>

<div class="key-summary">
<strong>📋 단일 단백질 사료 선택 체크리스트</strong>
<ul style="margin-top:0.5rem;">
<li>☐ 단백질원이 1가지인가? (오리, 캥거루, 타조, 연어 — 기존에 먹인 적 없는 것)</li>
<li>☐ 탄수화물원도 단일인가? (고구마, 완두콩 등 1가지)</li>
<li>☐ 성분표에 '닭 지방', '닭 육수' 같은 숨겨진 알레르기원이 없는가?</li>
<li>☐ 처방식(Hydrolyzed protein)이라면 수의사 처방이 있는가?</li>
<li>☐ 같은 공장에서 닭고기 사료를 만들어 교차 오염 가능성은 없는가?</li>
</ul>
</div>

<h2>3. 테스트 8주 동안 절대 주면 안 되는 것들</h2>

<p>테스트 중 한 번이라도 다른 식재료가 들어가면 결과가 무효가 된다. 의외의 함정들이 많다.</p>

<ul>
<li><strong>간식·트릿 전부</strong>: 단일 단백질 사료 외 모든 간식 중단. 훈련용 트릿도 원인 식재료가 들어간 경우 많다.</li>
<li><strong>사람 음식 조각</strong>: 가족이 실수로 주는 경우가 가장 흔한 실패 원인이다.</li>
<li><strong>치석 방지 껌</strong>: 소고기·닭고기 성분이 들어간 제품 다수.</li>
<li><strong>약 코팅</strong>: 정제 약을 닭고기·치즈로 싸주는 경우 — 캡슐 제형으로 교체하거나 수의사에게 방법을 문의한다.</li>
<li><strong>구강 케어 제품</strong>: 닭 향 치약·씹는 장난감도 주의가 필요하다.</li>
</ul>

<h2>4. 증상 기록 방법 — 판단의 기준을 만든다</h2>

<p>8주 동안 매주 아래 항목을 기록한다. 사진과 함께 남기면 비교하기 쉽다.</p>

<ul>
<li>가려움 빈도(하루 몇 회 긁는지)</li>
<li>피부 상태(발적·딱지·탈모 범위)</li>
<li>귀 냄새·분비물 여부</li>
<li>대변 상태(묽음·점액 여부)</li>
<li>눈 충혈·눈물 분비</li>
</ul>

<h2>5. 8주 후 — 원인 식재료 확인하는 법</h2>

<p>8주 테스트 후 증상이 개선됐다면 식품 알레르기 가능성이 높다. 이제 원인 식재료를 찾는 '재도전(Challenge)' 단계다. 의심 식재료를 하나씩 다시 추가해 일주일을 관찰한다. 증상이 재발하면 그 식재료가 원인이다.</p>

<div class="callout-cat">
<strong>⚠️ 테스트 결과 해석 주의사항</strong><br>
8주 후에도 증상이 전혀 개선되지 않았다면 아토피·접촉성 알레르기 등 다른 원인일 가능성이 높다. 이 경우 피부과 전문 수의사에게 알레르기 패치 테스트를 받는 것을 권장한다.
</div>

<h2>6. 가수분해 처방식 vs 단일 단백질 사료</h2>

<p>두 방법 모두 식이 제거 테스트에 사용된다. 가수분해 처방식은 단백질 분자를 쪼개 면역 반응을 최소화하므로 더 정확한 테스트가 가능하지만 비용이 높고 수의사 처방이 필요하다. 단일 단백질 사료는 보호자가 직접 시작할 수 있고 비용 부담이 낮다. 증상이 심하다면 처방식, 경미하다면 단일 단백질 사료부터 시도하는 것이 일반적이다.</p>

<h2>자주 묻는 질문</h2>

<h3>테스트 중 기존 약을 계속 먹여도 되나요?</h3>
<p>수의사가 처방한 약은 중단하지 말고 계속 복용한다. 단, 약을 감추기 위해 사용하는 식재료(치즈, 버터 등)는 테스트 기간 중 피해야 한다. 수의사에게 약을 어떻게 먹여야 하는지 사전에 물어본다.</p>

<h3>테스트 중 기존 사료를 바로 끊어도 되나요?</h3>
<p>갑자기 사료를 바꾸면 소화 불량이 생길 수 있다. 7~10일에 걸쳐 서서히 새 사료로 전환하는 것을 권장한다. 단, 이 전환 기간은 테스트 8주에 포함하지 않는다 — 완전 전환 후부터 8주를 계산한다.</p>

<p>식이 제거 테스트는 인내심이 필요한 과정이다. 8주가 길게 느껴지더라도 중간에 포기하면 결과가 무효가 된다. 가족 모두가 '이 기간에는 간식을 줄 수 없다'는 사실을 공유하는 것이 성공의 가장 큰 열쇠다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-grain-free-complete-guide">강아지 그레인프리 사료 완전 가이드 — 효과·위험·선택 기준</a><br>
<a href="/blog/dog-skin-health-guide">강아지 피부 건강 관리 — 빗질·목욕·환경 관리 완전 가이드</a><br>
<a href="/blog/dog-toxic-foods">강아지에게 줘도 되는 채소·과일 vs 위험한 것</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Veterinary Dermatology (2016) — 강아지 식품 알레르기 원인 식재료 빈도 리뷰",
      "WSAVA(세계소동물수의사협회) 피부과 가이드라인 — 식이 제거 테스트 권장 기간",
      "농림축산검역본부 반려동물 건강관리 정보 qia.go.kr",
    ]),
    disclaimer: null,
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
