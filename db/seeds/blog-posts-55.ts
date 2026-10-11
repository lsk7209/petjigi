import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 55 — cat2×2 + cat4×1 + cat3×1 + cat6×1 = 5편 (IDs 396-400)
// Macros: F, A, B, E, F
// Angles: RA2, RA5, RA7, RA1, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-396",
    slug: "cat-carbohydrate-diet-truth",
    type: "blog",
    category: 2,
    title: "고양이에게 탄수화물이 나쁜가 — 그레인프리 열풍의 진실",
    subtitle: "고양이 탄수화물 소화 능력, 혈당 반응 특성, 전분이 해롭다는 주장의 근거 검토",
    metaTitle: "고양이 탄수화물 사료 — 그레인프리가 답인가? 과학적 검토 | 펫지기",
    metaDescription: "고양이에게 탄수화물이 나쁜지 과학적으로 검토했습니다. 고양이 탄수화물 소화 능력, 혈당 반응, 그레인프리 주장의 근거와 한계를 정리했습니다.",
    body: `<p>고양이는 육식동물이라서 탄수화물을 먹으면 안 된다는 말과, 고양이도 탄수화물을 소화한다는 말이 함께 돌아다닌다. 연구를 보면 둘 다 단순하게 맞다고 하기 어렵다. 중요한 것은 "곡물이 없다"가 아니라 전체 영양 균형과 개체의 건강 상태다.</p>

<h2>자주 보이는 주장과 실제</h2>
<table>
<thead><tr><th>주장</th><th>수의학 자료가 말하는 것</th></tr></thead>
<tbody>
<tr><td>고양이는 탄수화물을 소화하지 못한다</td><td>고양이는 탄수화물을 어느 정도 소화·흡수할 수 있다는 리뷰가 있다. 다만 야생에서 먹는 먹이는 탄수화물이 적다</td></tr>
<tr><td>탄수화물이 당뇨의 원인이다</td><td>건조 사료의 높은 탄수화물이 비만과 당뇨의 위험 요인일 수 있다는 가설이 있으나 과학자들 사이에 합의는 없다</td></tr>
<tr><td>그레인프리는 저탄수화물이다</td><td>아니다. 곡물을 빼고 감자나 콩 전분을 쓰면 탄수화물이 비슷하거나 더 많을 수 있다</td></tr>
<tr><td>곡물 알레르기가 흔하다</td><td>고양이에서 곡물·글루텐 알레르기는 드문 편이라고 VCA 임상 자료는 설명한다</td></tr>
</tbody>
</table>

<h2>당뇨가 있는 고양이는 다르다</h2>
<p>당뇨 고양이는 저탄수화물 식이를 하면 관리가 쉬워지고 관해 가능성이 더 높다는 보고가 있어, 많은 수의사가 습식 위주의 저탄수화물 식이를 권한다. 이 경우는 일반 가이드가 아니라 수의사가 혈당 상태에 맞춰 식이와 인슐린 계획을 세운다.</p>

<h2>사료를 고를 때 보는 것</h2>
<ul>
<li><strong>완전·균형 영양</strong>: 라벨에 "완전 및 균형 영양(complete and balanced)" 문구가 있는지 본다.</li>
<li><strong>단백질 급원</strong>: 동물성 단백질이 상위 원료인지 확인한다.</li>
<li><strong>습식 비율</strong>: 수분 섭취와 열량 관리에 도움이 된다.</li>
<li><strong>체중과 건강 상태</strong>: 비만, 당뇨, 신장·요로 질환이 있으면 수의사와 식이를 정한다.</li>
<li><strong>그레인프리 마케팅</strong>: 곡물이 없다는 이유만으로 선택하지 않는다.</li>
</ul>

<div class="callout-cat">
<strong>이런 경우는 먼저 진료</strong><br>
• 물을 많이 마시고 소변이 늘었다<br>
• 먹는데도 살이 빠진다<br>
• 체중이 계속 늘고 활동이 줄었다
</div>

<h2>마지막으로</h2>
<p>탄수화물 논쟁에서 확실한 것은 고양이가 육식동물이라는 점과, 건강 상태에 따라 식이를 달리해야 한다는 점이다. 광고 문구보다 라벨의 영양 적합성 표기와 수의사의 판단을 기준으로 삼자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC5753635/ — Cats and Carbohydrates: The Carnivore Fantasy?",
      "https://vcahospitals.com/know-your-pet/whats-in-my-cats-food-designer-diets-grain-free-diets — VCA, What's in My Cat's Food?: Designer Diets, Grain Free Diets",
      "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/feeding-your-cat — Cornell Feline Health Center, Feeding Your Cat",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-01T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-397",
    slug: "dog-food-budget-guide",
    type: "blog",
    category: 2,
    title: "예산 내에서 강아지 잘 먹이기 — 비싼 사료가 무조건 좋은 것은 아니다",
    subtitle: "사료 가격 vs 품질 관계, 저예산 고품질 선택 기준, 습식 혼합으로 영양 보강",
    metaTitle: "강아지 사료 예산 가이드 — 가성비 좋은 사료 선택법 | 펫지기",
    metaDescription: "강아지 사료를 예산 내에서 잘 선택하는 방법. 가격과 품질의 관계, 저예산 고품질 기준, 습식 혼합으로 영양 보강하는 방법을 정리했습니다.",
    body: `<p>"비싼 사료가 좋다"는 것은 어느 정도 맞지만, 가격이 전부는 아니다. 마케팅 비용이 많이 들어간 프리미엄 브랜드가 조용히 만들어진 중가 제품보다 반드시 영양이 뛰어난 것은 아니다.</p>

<h2>가격이 올라가는 요인들</h2>
<ul>
<li>원재료 품질 (실제 영양가에 영향)</li>
<li>브랜드 마케팅·광고 비용 (영양과 무관)</li>
<li>포장 디자인·형태</li>
<li>유통 마진 (국내 수입 프리미엄 브랜드)</li>
<li>'그레인프리', '유기농', '슈퍼푸드' 마케팅 프리미엄</li>
</ul>

<h2>저예산에서 확인해야 할 최소 기준</h2>
<div class="callout-dog">
<strong>가성비 사료 체크리스트</strong><br>
□ AAFCO 또는 FEDIAF 완전영양식 기준 충족<br>
□ 첫 번째 원료가 동물성 단백질 (닭·소·연어 등)<br>
□ 인공 방부제(BHA·BHT) 없음<br>
□ 동물성 단백질 원료 ≥ 단백질 40% (건조 기준)<br>
□ 해당 수명 단계(퍼피/성견/시니어) 표기 있음
</div>

<h2>가성비 좋은 사료 찾는 실용 방법</h2>
<ul>
<li>킬로그램당 가격 계산 — 같은 품질이면 대용량이 저렴</li>
<li>대형 유통업체 자체 PB 브랜드 — 마케팅 비용 없어 가성비 좋은 경우 있음</li>
<li>국내 생산 사료 — 수입 유통 마진 없어 동일 원재료 기준 저렴</li>
<li>구독·정기 배송 할인 활용</li>
</ul>

<h2>습식 혼합으로 영양 보강</h2>
<p>비용을 줄이면서 영양을 보강하는 현실적 방법: 건식 중가 제품을 기본으로 하고, 주 3~4회 습식(파우치·캔)을 소량 혼합한다. 수분 보충과 기호성 향상 두 가지 효과가 있다. 습식을 100%로 하는 것보다 비용 부담이 훨씬 적다.</p>

<h2>마지막으로</h2>
<p>월 5만 원짜리 사료가 월 20만 원짜리보다 나쁜 사료인 경우도 있고, 반대로 더 균형 잡힌 경우도 있다. 성분표를 읽는 능력이 가격표보다 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Tufts University — Evaluating Dog Foods on a Budget",
      "Consumer Reports — Dog Food Rating Methodology",
      "한국반려동물협회 사료 가성비 선택 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-01T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-398",
    slug: "pet-insurance-renewal-cancel-guide",
    type: "blog",
    category: 4,
    title: "펫보험 갱신과 해지 — 보험료 오를 때 어떻게 결정해야 하나",
    subtitle: "갱신 거절 조건, 나이별 보험료 인상 구조, 해지 시 손해, 타사 이전 주의사항",
    metaTitle: "펫보험 갱신·해지 가이드 — 보험료 인상 대응법 | 펫지기",
    metaDescription: "펫보험 갱신과 해지 시 알아야 할 것. 갱신 거절 조건, 나이별 보험료 인상 구조, 해지 시 손해, 타사 이전 주의사항을 정리했습니다.",
    body: `<p>펫보험은 반려동물이 나이 들수록 보험료 부담이 커질 수 있고, 갱신 때마다 유지·변경·해지를 고민하게 된다. 이 글은 갱신 구조와 결정 전에 확인할 것을 정리한다. 구체적인 인상률이나 연령 제한은 상품마다 달라서 숫자를 단정하지 않는다.</p>

<h2>갱신 구조 알아두기</h2>
<ul>
<li>펫보험은 갱신형이어서, 가입 때 보험료가 낮아도 갱신할 때 반려동물의 나이와 상품 조건에 따라 보험료가 바뀔 수 있다.</li>
<li>2025년 4월 보도에 따르면 금융감독원은 펫보험의 자기부담금을 최소 3만원, 자기부담률을 30% 이상으로 하고 재가입 주기를 기존 3~5년에서 1년으로 줄이도록 권고했다(시행 5월 1일). 이후 판매되는 상품은 이 기준을 반영했을 수 있으니, 내가 가입한 상품이 어느 조건인지 증권과 약관으로 확인한다.</li>
<li>자기부담률을 낮춰 보장을 높일수록 보험료는 대체로 올라간다.</li>
</ul>

<h2>갱신 때 점검할 것</h2>
<table>
<thead><tr><th>점검 항목</th><th>확인 방법</th></tr></thead>
<tbody>
<tr><td>갱신 후 보험료와 보장 내용</td><td>갱신 안내문과 약관, 상품 변경 여부</td></tr>
<tr><td>갱신 가능한 최고 연령</td><td>약관의 갱신·보험기간 조항</td></tr>
<tr><td>지급 이력과 현재 치료 중인 질환</td><td>진료 기록, 청구 내역</td></tr>
<tr><td>갱신 거절·조건 변경 사유</td><td>약관의 계약 해지·갱신 조항을 보험사에 문의해 서면으로 받기</td></tr>
</tbody>
</table>

<h2>타사로 옮길까 고민된다면</h2>
<div class="callout-cat">
<strong>이전 전에 꼭 확인</strong><br>
• 현재 치료 중이거나 이력이 있는 질환은 새 보험에서 가입 전 질병으로 제외될 수 있다<br>
• 새 상품에도 대기기간이 있을 수 있어 공백이 생기지 않게 일정을 맞춘다<br>
• 새 보험의 가입 승인이 확정되기 전에 기존 보험을 해지하지 않는다<br>
• 고령이면 가입 가능한 상품 자체가 제한될 수 있다
</div>
<p>건강하고 치료 이력이 없다면 비교 후 이전을 고려할 수 있지만, 만성 질환을 관리 중이라면 이전이 불리한 경우가 많아 기존 상품 유지가 대안이 된다. 구체적인 조건은 상품마다 달라서 보험사 상담으로 확인해야 한다.</p>

<h2>해지·철회할 때</h2>
<ul>
<li>가입 직후라면 청약 철회를 할 수 있다. 정부 생활법령정보에 따르면 보장성 보험은 보험증권을 받은 날부터 15일과 청약한 날부터 30일 중 먼저 도래하는 기간 안에 철회할 수 있고(금융소비자 보호에 관한 법률 제46조), 이미 보험금 지급 사유가 발생한 뒤에는 효력이 제한될 수 있다. 상품 유형에 따라 적용이 다를 수 있으니 보험사에 확인한다.</li>
<li>중도 해지 시 환급금과 할인 환수 여부는 상품마다 다르다. 해지 전에 환급 예상액을 문의한다.</li>
<li>보험료가 부담이라면 해지에 앞서 보장 한도나 자기부담 조건을 바꾸는 방법을 문의해 볼 수 있다.</li>
</ul>

<h2>마지막으로</h2>
<p>보험료가 오를 때 해지를 서두르기보다, 현재 질환 이력과 대체 상품 조건을 같이 놓고 비교해야 후회가 적다. 금융감독원 파인(fine.fss.or.kr)에서 상품을 비교하고, 최종 조건은 약관으로 확인하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "펫보험 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.dailyvet.co.kr/?p=242198 — 데일리벳, 금감원 '펫보험, 1년 단위 상품만 남기고, 보호자 자기부담 높여라' (2025-04-09 보도)",
      "https://fine.fss.or.kr — 금융감독원 금융상품 통합비교공시(파인)",
      "https://www.easylaw.go.kr/CSP/CnpClsMain.laf?popMenu=ov&csmSeq=1771&ccfNo=1&cciNo=2&cnpClsNo=1 — 생활법령정보, 계약의 청약철회권",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 실제 계약 내용은 해당 보험사 약관을 기준으로 합니다.",
    status: "published",
    publishedAt: "2026-08-02T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-399",
    slug: "cat-asthma-bronchitis-guide",
    type: "blog",
    category: 3,
    title: "고양이 천식·기관지염 — 기침하는 고양이, 헤어볼인지 천식인지",
    subtitle: "고양이 기침 원인 구분, 천식 발작 응급 대처, 코르티코스테로이드 vs 흡입기 치료",
    metaTitle: "고양이 천식·기관지염 — 기침 원인 구분과 치료 가이드 | 펫지기",
    metaDescription: "고양이 기침이 헤어볼인지 천식인지 구분하는 방법. 고양이 천식 발작 응급 대처, 코르티코스테로이드와 흡입기 치료를 비교했습니다.",
    body: `<p>고양이가 기침을 하고 그 뒤에 헛구역질을 하면 헤어볼을 토하려는 것으로 오해하기 쉽다. 하지만 반복되는 기침은 고양이 천식(기관지염)의 대표적인 신호일 수 있다. 천식은 기도에 염증이 생겨 숨쉬기 힘들어지는 만성 질환으로, 평생 관리가 필요하지만 치료와 환경 관리로 상태를 조절할 수 있다.</p>

<h2>이런 모습이면 의심한다</h2>
<ul>
<li>마른 기침 후 목을 길게 빼고 헛구역질하는 행동(웅크린 자세)</li>
<li>숨 쉴 때 쌕쌕거림, 특히 내쉴 때 소리가 남</li>
<li>활동량 감소, 쉽게 지침</li>
<li>증상이 심해지면 숨쉬기 힘들어하고 잇몸이 푸르스름해질 수 있음</li>
</ul>

<div class="callout-cat">
<strong>바로 응급실로 가야 하는 경우</strong><br>
• 입을 벌리고 숨을 쉼(개구호흡)<br>
• 잇몸·혀가 푸르거나 창백함<br>
• 배가 크게 오르내리며 힘겹게 숨 쉼<br>
• 가만히 있는데도 숨이 가쁨<br>
→ 집에서 약을 먹이며 지켜볼 상황이 아니다.
</div>

<h2>병원에서 하는 검사</h2>
<p>천식은 증상, 신체검사, 흉부 방사선 같은 결과를 종합하고 다른 원인을 배제해 진단한다. 폐렴, 심장사상충, 폐 기생충, 폐 종양 등 기침을 일으키는 다른 병과 구분해야 하기 때문에 혈액검사와 분변검사부터 시작하고, 치료에 반응하지 않으면 기관지 내시경이나 세포 검사까지 하기도 한다.</p>

<h2>치료와 관리</h2>
<table>
<thead><tr><th>방법</th><th>내용</th></tr></thead>
<tbody>
<tr><td>스테로이드</td><td>기도 염증을 줄이는 핵심 치료. 먹는 약과 흡입제가 있고, 흡입제가 증상 조절 면에서 더 나으며 전신 부작용이 적다고 알려져 있다</td></tr>
<tr><td>기관지확장제</td><td>보조 치료로 쓰이며 단독 치료로는 권하지 않는다. 응급 시 병원에서 투여한다</td></tr>
<tr><td>흡입 챔버·마스크</td><td>고양이용 흡입기와 챔버를 써서 약을 흡입시킨다. 사용법을 병원에서 배운다</td></tr>
<tr><td>환경 관리</td><td>담배 연기, 향수·방향제, 먼지, 곰팡이, 꽃가루 같은 자극 요인을 줄인다</td></tr>
</tbody>
</table>
<p>장기간 스테로이드를 먹이면 당뇨 같은 부작용이 생길 수 있으므로 정기 점검을 하며 가장 적은 양으로 조절한다. 약 종류와 용량은 수의사가 정한다.</p>

<h2>집에서 해볼 수 있는 일</h2>
<ul>
<li>실내 흡연을 하지 않고 향이 강한 제품을 줄인다.</li>
<li>먼지가 적은 모래로 바꿔 보고, 환기를 자주 한다.</li>
<li>기침 횟수와 시점, 호흡 상태를 영상으로 남겨 진료 때 보여준다.</li>
<li>가만히 쉴 때 1분 동안 가슴이 오르내리는 횟수를 세어 기록한다. 평소보다 늘어나면 진료 대상이다.</li>
</ul>

<h2>마지막으로</h2>
<p>고양이는 아픈 것을 숨기는 동물이라 기침이 보일 때는 이미 진행된 경우가 많다. 반복되는 기침을 헤어볼로 넘기지 말고, 기침 영상과 함께 진료를 받는 것이 가장 정확한 출발점이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.merckvetmanual.com/respiratory-system/respiratory-diseases-of-small-animals/feline-bronchial-asthma — Merck Veterinary Manual, Feline Bronchial Asthma",
      "https://www.merckvetmanual.com/cat-owners/lung-and-airway-disorders-of-cats/tracheobronchitis-bronchitis-bronchial-asthma-in-cats — Merck Veterinary Manual, Tracheobronchitis (Bronchitis, Bronchial Asthma) in Cats",
      "https://vcahospitals.com/know-your-pet/inhalant-treatment-for-feline-asthma-and-bronchitis — VCA, Asthma and Bronchitis in Cats",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-02T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-400",
    slug: "pet-memorial-park-guide",
    type: "blog",
    category: 6,
    title: "반려동물 추모공원 이용 가이드 — 납골당·수목장·자연장 선택과 방문",
    subtitle: "전국 반려동물 추모공원 이용 방법, 방문 에티켓, 기일·생일 방문 루틴 만들기",
    metaTitle: "반려동물 추모공원 이용 가이드 — 납골당·수목장·방문 방법 | 펫지기",
    metaDescription: "반려동물 추모공원 이용 방법. 납골당, 수목장, 자연장 차이, 방문 에티켓, 기일·생일에 방문하는 루틴 만들기를 정리했습니다.",
    body: `<p>반려동물 추모공원(봉안시설)은 화장한 유골을 안치하고 찾아와 추모할 수 있는 전용 공간이다. 종류와 계약 조건이 다양하므로 비용만 비교하지 말고 등록 여부, 계약 기간, 폐업 시 대책을 함께 확인해야 한다.</p>

<h2>추모 시설의 종류</h2>
<table>
<thead><tr><th>유형</th><th>특징</th><th>확인할 점</th></tr></thead>
<tbody>
<tr><td>봉안당(실내 안치)</td><td>유골함을 건물 안치대에 모신다. 날씨와 상관없이 방문하기 쉽다</td><td>계약 기간, 갱신 조건, 연간 관리비</td></tr>
<tr><td>봉안묘·개별 구획</td><td>시설 안 지정 구획에 모신다. 표지석 설치 가능 여부는 시설마다 다르다</td><td>구획 크기, 사용 기간, 이전 가능 여부</td></tr>
<tr><td>자연장 형태</td><td>유골을 지정 구역에 모시는 방식. 개별 위치 표시가 어려울 수 있다</td><td>합법적으로 운영되는지, 추모 방식</td></tr>
</tbody>
</table>
<p>비용은 시설, 지역, 크기, 계약 기간에 따라 크게 다르다. 여러 곳의 견적을 서면으로 비교하고, 연간 관리비와 갱신 시 인상 가능성까지 확인한다.</p>

<h2>등록 업체인지 먼저 확인</h2>
<div class="callout-cat">
<strong>동물장묘업은 등록 업종</strong><br>
• 동물장묘업은 시설·인력 기준을 갖추어 관할 지자체에 등록해야 하는 업종이다<br>
• 등록 없이 영업하는 업체가 있다는 보도가 있으니, 등록증을 보여 달라고 요청하고 지자체에 확인한다<br>
• 땅에 직접 묻는 것은 허용되지 않으므로 등록된 시설을 이용한다
</div>

<h2>추모공원 선택 체크리스트</h2>
<ul>
<li>등록 여부(등록증, 지자체 확인)</li>
<li>개별 화장 보증과 입회 가능 여부</li>
<li>계약 기간, 갱신 조건, 연간 관리비, 추가 비용</li>
<li>폐업·이전 시 유골 처리와 환불 규정</li>
<li>방문 시간, 접근성, 주차</li>
<li>직접 방문해 시설 관리 상태 확인</li>
</ul>

<h2>방문 에티켓</h2>
<ul>
<li>다른 보호자의 추모를 방해하지 않도록 조용히 한다.</li>
<li>음식물·꽃 반입은 시설 규정을 확인한다.</li>
<li>아이와 함께 방문한다면 미리 장소의 의미를 설명해 준다.</li>
</ul>

<h2>비용 부담이 클 때</h2>
<p>장기 봉안이 부담스럽다면 합동 화장 후 별도 의식을 하거나, 개별 화장 후 유골을 집에 모시고 기념물을 만드는 방법도 있다. 선택하기 전에 업체와 지자체에 가능 여부를 확인한다. 화장 방식은 <a href="/blog/pet-cremation-vs-burial">반려동물 화장 vs 장묘 비교</a>를, 다양한 추모 방법은 <a href="/blog/pet-memorial-ideas">반려동물 추모 아이디어</a>를 참고한다.</p>

<h2>마지막으로</h2>
<p>추모공원은 한 번 정하면 바꾸기 어렵다. 슬픔 속에서 서두르지 말고, 계약서를 읽고 방문해서 확인한 뒤 결정하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.dailyvet.co.kr/?p=276994 — 데일리벳, 동물장례식장 이용 비율 늘었지만 여전히 반려동물 사체를 땅에 묻는 경우 가장 많아",
      "https://www.dailyvet.co.kr/print?id=36364 — 데일리벳, 반려동물 사체 동물장묘업소서 처리 가능토록 법적 기반 마련",
      "https://magazine.hankyung.com/business/article/202109013621b — 한경 매거진, 동물장묘업 등록 없이 고양이 장례 치러…벌금 확정",
    ],
    disclaimer: "이 글은 일반적인 정보 제공 목적으로 작성되었으며, 수의학적 진단·상담이나 법률 자문을 대체하지 않습니다. 장묘·사체 처리 기준은 법령과 지자체에 따라 달라질 수 있으니 진행 전 관할 지자체 등 공식 기관에서 확인하시고, 슬픔이 일상생활을 어렵게 하면 전문 상담을 받으세요.",
    status: "published",
    publishedAt: "2026-08-03T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

];

async function seed() {
  for (const post of BLOG_POSTS) {
    await db.insert(contents).values(post).onConflictDoUpdate({
      target: contents.slug,
      set: { ...post, updatedAt: NOW },
    });
    console.log(`✅ ${post.slug}`);
  }
  console.log("블로그 포스트 55차 시딩 완료! (blog-396 ~ blog-400)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
