import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 57 — cat2×2 + cat4×1 + cat3×1 + cat1×1 = 5편 (IDs 406-410)
// Macros: A, F, B, E, F
// Angles: RA4, RA7, RA2, RA5, RA3

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-406",
    slug: "raw-eggs-for-dogs-guide",
    type: "blog",
    category: 2,
    title: "강아지에게 달걀 줘도 되나 — 날달걀 vs 익힌 달걀",
    subtitle: "달걀의 영양 가치, 살모넬라·아비딘 위험, 날달걀과 익힌 달걀 비교, 급여 방법",
    metaTitle: "강아지 달걀 급여 가이드 — 날달걀 vs 익힌 달걀 비교 | 펫지기",
    metaDescription: "강아지에게 달걀을 줘도 되는지 알아봤습니다. 달걀 영양 가치, 날달걀 살모넬라·아비딘 위험, 익힌 달걀과 비교, 급여량을 정리했습니다.",
    body: `<p>달걀은 반려동물에게 줄 수 있는 가장 영양가 높은 자연식 중 하나다. 그러나 날달걀과 익힌 달걀은 다르게 접근해야 한다.</p>

<h2>달걀의 영양 가치</h2>
<ul>
<li><strong>단백질</strong>: 생물가(BV)가 100으로 가장 높은 단백질원 중 하나</li>
<li><strong>루테인·제아잔틴</strong>: 눈 건강</li>
<li><strong>콜린</strong>: 뇌·간 기능</li>
<li><strong>비오틴·리보플라빈</strong>: 피부·털 건강</li>
</ul>

<h2>날달걀의 위험</h2>
<h3>살모넬라</h3>
<p>날달걀에는 살모넬라균이 있을 수 있다. 면역이 정상인 개에서는 감염 확률이 낮지만 0은 아니다. 특히 노령견·면역억제 상태·어린 강아지에서 위험이 높다. 핸들링 후 사람에게도 전파 위험.</p>

<h3>아비딘 (Avidin)</h3>
<p>날달걀 흰자에 있는 아비딘은 비오틴(비타민B7) 흡수를 방해한다. 날달걀 흰자를 장기적으로 많이 먹이면 비오틴 결핍 → 피부·털 문제가 생길 수 있다. 가열하면 아비딘이 변성돼 문제 없다.</p>

<h2>익힌 달걀이 더 안전하다</h2>
<table>
<thead><tr><th>항목</th><th>날달걀</th><th>익힌 달걀</th></tr></thead>
<tbody>
<tr><td>살모넬라 위험</td><td>있음</td><td>없음 (열처리)</td></tr>
<tr><td>아비딘 문제</td><td>있음 (흰자)</td><td>없음 (변성)</td></tr>
<tr><td>단백질 소화율</td><td>51%</td><td>91%</td></tr>
<tr><td>권장 여부</td><td>가끔은 괜찮지만 주의</td><td>권장</td></tr>
</tbody>
</table>

<h2>급여 방법</h2>
<ul>
<li>삶거나 스크램블 (기름·소금 없이)</li>
<li>중형견 기준 주 2~3회, 달걀 1개</li>
<li>소형견은 달걀 1/2개</li>
<li>칼로리 계산에 포함 (달걀 1개 약 70kcal)</li>
</ul>

<h2>마지막으로</h2>
<p>달걀은 영양 밀도가 높은 좋은 간식이다. 익혀서 주면 대부분의 위험이 사라진다. 사람 음식에서 반려동물에게 줄 수 있는 가장 안전하고 영양가 높은 단백질원 중 하나다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Case, L.P. et al. — Canine and Feline Nutrition (3rd ed.)",
      "ASPCA — Are Eggs Safe for Dogs?",
      "한국수의영양학회 자연식 성분 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-06T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-407",
    slug: "cat-food-allergy-elimination-diet",
    type: "blog",
    category: 2,
    title: "고양이 음식 알레르기 제거식 테스트 — 8~12주 프로토콜 완전 가이드",
    subtitle: "제거식이 필요한 증상, 단일 단백질·가수분해 단백질 사료 선택, 테스트 중 절대 금지",
    metaTitle: "고양이 음식 알레르기 제거식 테스트 — 8주 프로토콜 가이드 | 펫지기",
    metaDescription: "고양이 음식 알레르기 확인을 위한 제거식 테스트 방법. 증상, 단일 단백질·가수분해 사료 선택, 8~12주 진행법, 도전 테스트 방법을 정리했습니다.",
    body: `<p>고양이가 반복적으로 구토하거나, 발·귀·얼굴을 긁거나, 탈모가 생긴다면 음식 알레르기를 의심할 수 있다. 확인하는 유일한 방법은 '제거식 테스트(Elimination Diet Trial)'다.</p>

<h2>제거식 테스트가 필요한 증상</h2>
<ul>
<li>반복적인 구토·설사 (주 2회 이상, 수개월)</li>
<li>발·귀·배·얼굴 가려움</li>
<li>만성 외이염</li>
<li>털 뭉치·탈모 (과도한 그루밍)</li>
</ul>

<h2>제거식의 기본 원칙</h2>
<p>이전에 먹어본 적 없는 새로운 단백질·탄수화물 원료를 먹이면서 기존 알레르기항원을 제거한다. 이전 사료의 성분과 겹치지 않는 것이 핵심이다.</p>

<h2>사료 선택</h2>
<div class="callout-cat">
<strong>제거식 사료 종류</strong><br>
• <strong>단일 단백질(Novel Protein)</strong>: 이전에 먹어본 적 없는 고기 (오리·토끼·캥거루·사슴·곤충)<br>
• <strong>가수분해 단백질(Hydrolyzed)</strong>: 단백질을 아주 작게 분해해 면역 반응 최소화 (수의사 처방식 권장)<br>
• 홈쿡: 이전에 안 먹어본 단일 단백질 + 탄수화물
</div>

<h2>8~12주 프로토콜</h2>
<ol>
<li>제거식 사료로 100% 전환 (7~10일 점진적 전환)</li>
<li>8~12주 엄격히 유지</li>
<li><strong>테스트 중 절대 금지</strong>: 기존 사료·간식·사람 음식·다른 동물 사료</li>
<li>증상이 개선되면 → 원래 사료 재도전(Challenge)</li>
<li>증상 재발 → 음식 알레르기 확진</li>
</ol>

<h2>왜 8~12주가 필요한가</h2>
<p>면역 반응이 완전히 가라앉고 피부·소화기가 회복되는 데 시간이 필요하다. 4주 만에 판단하면 오진 가능성이 높다.</p>

<h2>마지막으로</h2>
<p>제거식 테스트는 인내가 필요하지만 음식 알레르기를 확인하는 유일한 방법이다. 혈액 알레르기 검사는 음식 알레르기 진단에 신뢰도가 낮다. 수의사와 함께 계획하고 진행하는 것을 권장한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Guilford, W.G. — Adverse reactions to food — Gastrointestinal food hypersensitivity. Veterinary Gastroenterology 1996",
      "WSAVA Nutritional Assessment — Food Allergy Protocol",
      "한국수의피부과학회 음식 알레르기 진단 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-06T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-408",
    slug: "pet-insurance-comparison-hidden-tips",
    type: "blog",
    category: 4,
    title: "펫보험 비교할 때 놓치는 것들 — 보험료보다 중요한 5가지",
    subtitle: "자기부담금 구조·연간 한도·항목별 한도·면책 조항·청구 방식 비교",
    metaTitle: "펫보험 비교 시 놓치는 것 5가지 — 보험료 외 핵심 체크 | 펫지기",
    metaDescription: "펫보험 비교할 때 보험료보다 중요한 것들. 자기부담금 구조, 연간 한도, 항목별 한도, 면책 조항, 청구 방식 5가지 핵심 체크포인트를 정리했습니다.",
    body: `<p>펫보험을 비교할 때 많은 보호자가 월 보험료만 보고 가입한다. 그러나 실제 보험금 수령 경험은 보험료보다 이 5가지가 더 결정적이다.</p>

<h2>1. 자기부담금 구조</h2>
<p>보험금 지급 시 보호자가 부담하는 금액이다. 두 가지 방식이 있다:</p>
<ul>
<li><strong>정액 방식</strong>: 매 청구마다 일정 금액(예: 10,000원) 공제</li>
<li><strong>정률 방식</strong>: 진료비의 일정 비율(예: 20%) 공제</li>
</ul>
<p>고액 진료가 많을 것 같으면 정액 방식이 유리. 소액 다수 청구가 많으면 정률 방식 검토.</p>

<h2>2. 연간 한도 vs 항목별 한도</h2>
<p>연간 보험금 한도가 500만 원이라도, 항목별 한도(예: 수술비 한도 100만 원)가 별도로 있으면 큰 수술 시 보장이 제한된다. 약관에서 '항목별 지급 한도' 조항을 반드시 확인해야 한다.</p>

<h2>3. 면책 조항 범위</h2>
<div class="callout-cat">
<strong>보험사별로 다를 수 있는 면책 항목</strong><br>
• 슬개골 탈구 (대기기간 차이 크게 있음)<br>
• 치과·구강 질환 (미보장인 경우 많음)<br>
• 선천성·유전성 질환<br>
• 중성화 수술<br>
• 미용 목적 처치<br>
• 예방접종·정기검진
</div>

<h2>4. 청구 방식</h2>
<ul>
<li><strong>직접 청구(Direct Claim)</strong>: 병원에서 바로 보험 처리. 보호자가 먼저 지불할 필요 없음. 제휴 병원 여부 확인 필요.</li>
<li><strong>간접 청구(Reimbursement)</strong>: 보호자가 먼저 지불 → 영수증 제출 → 지급. 제출 기한(보통 30~60일) 준수 필요.</li>
</ul>
<p>직접 청구가 편리하지만 제휴 병원이 제한적인 경우가 많다.</p>

<h2>5. 실손 vs 정액 보상</h2>
<ul>
<li><strong>실손</strong>: 실제 진료비에서 자기부담금을 제외한 금액 지급</li>
<li><strong>정액</strong>: 진단명에 따라 정해진 금액 지급</li>
</ul>
<p>실손이 일반적으로 더 유리하지만 보험료가 높은 경향. 정액은 예측 가능하지만 고액 치료에 불리.</p>

<h2>마지막으로</h2>
<p>보험료가 5천 원 더 싸더라도 자기부담금이 높거나 면책 범위가 넓으면 실제 보장이 적다. 비교할 때 총 보험료 × 가입 연수 vs 예상 보장 금액을 계산해보는 것이 현명하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "펫보험 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 반려동물보험 약관 핵심 조항 해설 2024",
      "한국소비자원 펫보험 약관 비교 분석 2025",
      "보험연구원 반려동물보험 시장 현황 리포트",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 실제 계약 내용은 해당 보험사 약관을 기준으로 합니다.",
    status: "published",
    publishedAt: "2026-08-07T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-409",
    slug: "dog-liver-disease-early-signs",
    type: "blog",
    category: 3,
    title: "강아지 간 질환 초기 신호 — 조용히 진행되는 침묵의 장기",
    subtitle: "간의 역할, 황달·복수·무기력 등 증상, 혈액검사 ALT·ALP 해석, 간 보호 식이",
    metaTitle: "강아지 간 질환 초기 신호·혈액검사·관리 가이드 | 펫지기",
    metaDescription: "강아지 간 질환은 증상이 늦게 나타납니다. 황달·복수·무기력 증상, 혈액검사 ALT·ALP 수치 해석, 간 보호 식이를 정리했습니다.",
    body: `<p>간은 재생 능력이 뛰어나 70%가 손상될 때까지 증상이 나타나지 않는 경우가 있다. 이 때문에 '침묵의 장기'라 불린다.</p>

<h2>간이 하는 일</h2>
<ul>
<li>해독 (약물·독소·대사 산물 분해)</li>
<li>단백질·응혈인자 합성</li>
<li>담즙 생성 (지방 소화)</li>
<li>혈당 조절 (글리코겐 저장)</li>
</ul>

<h2>간 질환의 초기~중기 신호</h2>
<div class="callout-dog">
<strong>간 문제 의심 신호</strong><br>
• 식욕 감소·체중 감소<br>
• 무기력<br>
• 구토·설사 (비특이적)<br>
• 다음·다뇨 (간성 당뇨 가능성)<br>
• 황달 (잇몸·공막·피부 노란색) — 중등도 이상<br>
• 복부 팽창 (복수 — 중증)<br>
• 간성 뇌증 증상 (배회·멍함·발작) — 중증
</div>

<h2>혈액검사 결과 해석</h2>
<table>
<thead><tr><th>항목</th><th>의미</th></tr></thead>
<tbody>
<tr><td>ALT (GPT)</td><td>간세포 손상 지표. 높으면 간세포 염증·괴사.</td></tr>
<tr><td>ALP (알칼리인산분해효소)</td><td>담즙 흐름 장애·골 문제. 쿠싱증후군에서도 상승.</td></tr>
<tr><td>총 빌리루빈</td><td>황달 정도. 높으면 간·담도·용혈 문제.</td></tr>
<tr><td>알부민</td><td>간 합성 기능. 낮으면 만성 간 기능 저하.</td></tr>
</tbody>
</table>

<h2>원인별 간 질환</h2>
<ul>
<li>간염 (세균·바이러스·독소·면역 매개)</li>
<li>간 지방증 (비만·당뇨)</li>
<li>간 종양 (노령견)</li>
<li>간문맥 단락 (선천성 — 소형 품종 많음)</li>
<li>구리 축적 질환 (베들링턴·달마시안 품종)</li>
</ul>

<h2>간 보호 식이</h2>
<ul>
<li>저지방·고품질 단백질</li>
<li>항산화 성분 (비타민E·C)</li>
<li>SAMe (S-아데노실메티오닌) — 간 보호 보충제 (수의사 처방)</li>
<li>밀크시슬 (실리마린) — 간 세포 보호 효과, 일부 연구 지지</li>
</ul>

<h2>마지막으로</h2>
<p>간 질환은 조기에 발견할수록 예후가 좋다. 7세 이상 강아지의 정기 혈액검사에 간 수치(ALT·ALP·빌리루빈)가 포함되어 있는지 확인하자. 증상이 없어도 수치 이상이 먼저 발견되는 경우가 많다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Webster, C.R.L. — History, Clinical Signs, and Physical Findings in Hepatobiliary Disease. Vet Clin North Am 2009",
      "WSAVA Liver Disease Guidelines",
      "대한수의사회 소화기 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-07T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-410",
    slug: "multi-cat-household-harmony",
    type: "blog",
    category: 1,
    title: "다묘 가정 평화 유지하기 — 3마리 이상 고양이가 함께 사는 법",
    subtitle: "자원 분산 원칙, 집단 내 긴장 신호 읽기, 갈등 중재 방법, 다묘 가정 스트레스 관리",
    metaTitle: "다묘 가정 갈등 예방·관리 가이드 — 3마리 이상 함께 사는 법 | 펫지기",
    metaDescription: "3마리 이상 고양이가 함께 사는 다묘 가정 관리법. 자원 분산 원칙, 집단 내 긴장 신호, 갈등 중재, 스트레스 관리 방법을 정리했습니다.",
    body: `<p>고양이가 많을수록 아름답게도, 복잡하게도 될 수 있다. 다묘 가정의 평화는 자연스럽게 생기지 않는다 — 환경 설계로 만들어야 한다.</p>

<h2>고양이는 독거 동물이다</h2>
<p>고양이는 야생에서 단독 생활을 한다. 여러 마리가 함께 사는 것은 자연스러운 상태가 아니다. 좋은 다묘 가정은 각 고양이가 '원할 때 혼자 있을 수 있는' 환경을 제공해야 한다.</p>

<h2>자원 분산 원칙</h2>
<div class="callout-cat">
<strong>다묘 가정 자원 공식</strong><br>
• <strong>화장실</strong>: 고양이 수 + 1개 (3마리 → 4개)<br>
• <strong>음식·물 그릇</strong>: 고양이 수 + 1세트, 다른 방이나 공간에 분산<br>
• <strong>잠자는 공간</strong>: 고양이 수 이상, 높이 다양화<br>
• <strong>스크래처</strong>: 각 공간마다 1개 이상<br>
→ 자원 부족이 갈등의 가장 흔한 원인
</div>

<h2>집단 내 긴장 신호 읽기</h2>
<ul>
<li><strong>소극적 공격</strong>: 한 고양이가 다른 고양이가 지나갈 때 막고 있음 (공간 통제)</li>
<li><strong>응시</strong>: 직접 눈을 맞추며 장시간 응시 — 지배적 행동</li>
<li><strong>과도한 그루밍 또는 식욕 변화</strong>: 스트레스 신호</li>
<li><strong>화장실 밖 배변</strong>: 스트레스 또는 영역 표시</li>
</ul>

<h2>갈등 중재 방법</h2>
<ul>
<li>공격하는 고양이와 피하는 고양이의 분리 → 재도입 프로토콜</li>
<li>페로몬 디퓨저(펠리웨이 멀티캣) 설치 — 사회적 긴장 완화</li>
<li>공격하는 개체와 1:1 놀이 증가 → 에너지 소진</li>
<li>수직 공간 늘리기 → 회피 가능한 경로 확보</li>
</ul>

<h2>마지막으로</h2>
<p>다묘 가정에서 완벽한 조화는 없다. 목표는 모든 개체가 스트레스 없이 자원에 접근하고, 원할 때 혼자 있을 수 있는 환경이다. 자원을 충분히 제공하고 공간을 풍부하게 만드는 것이 갈등의 80%를 예방한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bradshaw, J.W.S. — Cat Sense: How the New Feline Science Can Make You a Better Friend to Your Pet",
      "International Cat Care — Multi-Cat Households",
      "한국고양이보호협회 다묘 가정 관리 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-08T09:00:00.000Z",
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
  console.log("블로그 포스트 57차 시딩 완료! (blog-406 ~ blog-410)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
