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
    body: `<p>고양이는 순수 육식동물이므로 탄수화물이 해롭다는 주장이 널리 퍼져 있다. 이것이 얼마나 과학적으로 뒷받침되는지 살펴보자.</p>

<h2>고양이의 탄수화물 대사 특성</h2>
<p>고양이는 개·인간과 달리 간에서 포도당 합성을 조절하는 효소(glucokinase)가 없거나 매우 낮다. 이는 탄수화물이 많은 식이에서 혈당이 더 높게 유지될 수 있음을 의미한다. 이것이 '고양이는 탄수화물을 처리하지 못한다'는 주장의 핵심 근거다.</p>

<h2>그러나 — 탄수화물을 소화하지 못하는 것은 아니다</h2>
<p>고양이도 전분을 소화하는 아밀라아제가 있다. 개보다 적지만 없지는 않다. 상업용 사료의 일반적인 탄수화물 함량(20~35%)은 고양이가 소화·흡수할 수 있다. '소화 못 한다'와 '이상적인 식이가 아니다'는 다른 이야기다.</p>

<h2>탄수화물과 당뇨의 관계</h2>
<p>고양이 당뇨 발생과 고탄수화물 식이의 관계는 연구에 따라 결과가 엇갈린다. 비만이 당뇨의 가장 강한 위험 요인이며, 단순히 탄수화물 함량보다 총 칼로리와 비만이 더 중요하다는 견해가 우세하다.</p>

<h2>그레인프리가 답인가</h2>
<p>그레인프리 사료는 곡물 대신 콩류(완두콩·렌즈콩)를 주원료로 쓴다. 이는 탄수화물 함량이 비슷하거나 오히려 높은 경우도 있다. 단순히 '곡물 없음'이 '탄수화물 없음'이 아니다.</p>

<div class="callout-cat">
<strong>고양이 사료 선택 실질적 기준</strong><br>
• 단백질 함량 충분 (건조 기준 35~45% 이상)<br>
• 탄수화물이 주원료 상위에 없을 것<br>
• 수분 보충을 위한 습식 병행<br>
• AAFCO 완전영양식 기준 충족<br>
• 특이 알레르기 없다면 곡물 포함 사료도 무관
</div>

<h2>마지막으로</h2>
<p>고양이에게 탄수화물이 '나쁜' 것이 아니라 '필수적이지 않은' 것이다. 고단백·고수분 식이가 고양이의 이상적인 식이에 가깝지만, 탄수화물이 포함된 균형 잡힌 사료를 먹는 고양이도 건강하게 산다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Verbrugghe, A. & Bakovic, M. — Peculiarities of One-Carbon Metabolism in the Strict Carnivorous Cat. Nutrients 2013",
      "Tufts University Cummings Veterinary Medical Center — Cat Carbohydrates",
      "한국수의영양학회 고양이 탄수화물 대사 리뷰",
    ]),
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
    body: `<p>반려동물이 나이 들수록 보험료가 오른다. 어느 시점에서 갱신할지, 타사로 옮길지, 해지할지 — 결정이 쉽지 않다.</p>

<h2>펫보험 갱신 구조</h2>
<p>대부분의 펫보험은 1년 단위로 갱신된다. 갱신 시 나이·지급 이력에 따라 보험료가 인상된다. 5세 이후부터 인상폭이 커지는 경우가 많으며, 7~8세 이후 신규 가입이 제한되는 상품이 많다.</p>

<h2>갱신 거절 조건</h2>
<p>보험사는 일반적으로 계속 갱신을 보장하지만, 다음 경우에 갱신을 거절하거나 조건을 변경할 수 있다:</p>
<ul>
<li>보험사 사업 종료·상품 폐지</li>
<li>다수 건 대규모 부정 청구 이력</li>
<li>약관에 명시된 갱신 상한 나이 도달</li>
</ul>

<h2>갱신 vs 타사 이전 결정 기준</h2>
<table>
<thead><tr><th>상황</th><th>권장 결정</th></tr></thead>
<tbody>
<tr><td>기저 질환·치료 이력 있음</td><td>갱신 유지 (이전 시 새 대기기간 + 기존 질환 면책)</td></tr>
<tr><td>건강하고 보험료 부담이 큼</td><td>타사 비교 후 이전 고려 가능</td></tr>
<tr><td>7세 이상</td><td>신규 가입 가능 상품 극히 제한 — 갱신 유지 원칙</td></tr>
</tbody>
</table>

<div class="callout-cat">
<strong>타사 이전 시 주의사항</strong><br>
• 기존 질환은 새 보험에서 기존 질환으로 면책됨<br>
• 새 대기기간 시작 (30~180일 다시 기다림)<br>
• 만성 질환 관리 중이라면 이전이 불리<br>
• 이전 전 현재 보험 해지 → 공백기간 생기지 않게
</div>

<h2>해지 시 손해 최소화</h2>
<ul>
<li>연납 가입 시 중도 해지는 미사용 기간 환급 가능 (단기 할인 환수 조항 확인)</li>
<li>갱신 시점 전 해지가 아닌 갱신 거절 방식 활용 가능</li>
<li>가입 후 15일 이내 '청약 철회'는 전액 환불</li>
</ul>

<h2>마지막으로</h2>
<p>기저 질환이 생긴 이후에는 타사 이전이 오히려 불리하다. 젊고 건강할 때 보험을 유지하는 것이 장기적으로 가장 합리적이다. 보험료 인상이 부담스럽더라도 갑자기 해지하기 전에 조건을 비교해보는 것이 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "펫보험 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 보험 갱신 및 해지 관련 소비자 안내 2024",
      "한국소비자원 펫보험 갱신 분쟁 사례집",
      "보험업법 제102조의3 (갱신 거절 제한)",
    ]),
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
    body: `<p>고양이가 무언가를 토하려는 듯 엎드려 목을 쭉 뻗고 기침하는 자세는 헤어볼 때와 비슷하다. 그러나 반복된다면 천식 또는 기관지염을 의심해야 한다.</p>

<h2>고양이 기침 원인 구분</h2>
<table>
<thead><tr><th>원인</th><th>특징</th></tr></thead>
<tbody>
<tr><td>헤어볼</td><td>기침 후 털 덩어리 나옴, 주 1~2회</td></tr>
<tr><td>천식</td><td>헐떡임, 입 벌리고 숨 쉼, 발작적 기침, 알레르기항원 연관</td></tr>
<tr><td>기관지염</td><td>만성 기침, 천식과 유사하나 발작 없는 경우 많음</td></tr>
<tr><td>상기도 감염</td><td>재채기·콧물 동반</td></tr>
<tr><td>심장 문제</td><td>노령묘에서, 복수 또는 피로 동반</td></tr>
</tbody>
</table>

<h2>천식 발작 응급 대처</h2>
<div class="callout-cat">
<strong>발작 중 보호자가 할 것</strong><br>
• 고양이를 안정시키고 조용히 앉혀둠<br>
• 스프레이·향수·청소 중이었다면 환기<br>
• 입 벌리고 숨 쉰다면 즉시 응급 병원<br>
• 5분 이상 지속되면 응급
</div>

<h2>천식 유발 요인 관리</h2>
<ul>
<li>향수·방향제·스프레이 사용 금지</li>
<li>먼지 많은 모래 → 저분진 모래로 교체</li>
<li>담배 연기 차단</li>
<li>화분 꽃가루 관리</li>
<li>공기청정기 사용</li>
</ul>

<h2>치료 방법 비교</h2>
<ul>
<li><strong>경구 코르티코스테로이드 (프레드니솔론)</strong>: 빠른 효과, 장기 사용 시 당뇨·부신 억제 부작용</li>
<li><strong>흡입 스테로이드 (플루티카손 + AeroCat 스페이서)</strong>: 전신 부작용 적음, 기술 습득 필요, 비용 높음. 장기 관리에 선호</li>
<li><strong>기관지 확장제 (살부타몰/알부테롤)</strong>: 발작 시 구조 흡입기로 사용</li>
</ul>

<h2>마지막으로</h2>
<p>고양이 천식은 완치보다 조절이 목표다. 유발 요인을 파악하고 제거하는 것이 약물만큼 중요하다. 반복적인 기침이 있다면 흉부 X-ray와 기관지 분비물 검사로 확진하는 것을 권장한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Reinero, C.R. — Feline Allergic Bronchitis/Asthma: Management Strategies. JVIM 2011",
      "한국고양이수의사회 호흡기 질환 임상 가이드라인",
      "ISFM — Feline Respiratory Disease Management",
    ]),
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
    body: `<p>반려동물의 유골을 어디에 안치하고, 어떻게 기억을 이어갈지 — 추모공원은 그 물리적 공간이 되어준다.</p>

<h2>추모공원 시설 종류</h2>
<ul>
<li><strong>납골당(봉안당)</strong>: 화장 후 유골함을 안치하는 공간. 방문해 직접 볼 수 있음. 연간 관리비 발생.</li>
<li><strong>수목장</strong>: 지정된 나무 뿌리 근처에 유골 매장. 나무로 기억하는 방식. 관리 기간·연장 여부 확인.</li>
<li><strong>자연장(잔디장)</strong>: 지정 구역 땅에 유골 매장. 비석 없이 좌표 또는 기념 돌로 표시하는 경우 많음.</li>
</ul>

<h2>이용 전 확인사항</h2>
<div class="callout-cat">
<strong>추모공원 선택 체크리스트</strong><br>
□ 동물보호법상 등록된 동물 장묘업체인지 (APMS 확인)<br>
□ 개별 구획이 영구 보장인지, 기간 계약인지<br>
□ 연간 관리비 및 갱신 조건<br>
□ 방문 시간·접근성<br>
□ 개별 납골당은 시건 장치·개인 열쇠 여부<br>
□ 유골 이전·이장 가능 여부
</div>

<h2>방문 에티켓</h2>
<ul>
<li>다른 방문자의 슬픔을 존중해 조용한 방문</li>
<li>음식·꽃은 시설 규정에 따라 허용 여부 확인</li>
<li>납골당 내 사진 촬영은 다른 개체 안치 공간이 포함되지 않도록</li>
<li>시설 청결 유지 — 가져온 것은 가져가기</li>
</ul>

<h2>기일·생일 방문 루틴 만들기</h2>
<p>정기적인 방문 루틴은 슬픔을 건강하게 처리하는 방법이 될 수 있다. 기일·생일에 꽃을 가져오거나, 평소 즐겨먹던 간식을 올려두는 것은 기억을 이어가는 의식이다. 가족과 함께 방문하면 공유된 추모가 된다.</p>

<h2>멀리 살아 자주 방문하지 못할 때</h2>
<ul>
<li>시설에서 대리 관리(청소·꽃 교체) 서비스를 제공하는 곳도 있음</li>
<li>온라인 추모 공간(사진·메시지 남기기)을 운영하는 추모공원 증가 추세</li>
</ul>

<h2>마지막으로</h2>
<p>추모공원은 반려동물이 떠난 후 보호자에게 '찾아갈 수 있는 장소'를 제공한다. 어떤 형태로 기억하든 — 정기적으로 찾아가는 것 자체가 사랑을 지속하는 방식이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "동물보호법 시행규칙 동물 장묘업 등록 기준",
      "한국반려동물장례협회 추모공원 서비스 현황 2024",
      "농림축산식품부 동물보호관리시스템 장묘업 등록 현황",
    ]),
    disclaimer: null,
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
