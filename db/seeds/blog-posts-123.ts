import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 123 — cat3×2 + cat4×1 + cat2×1 + cat5×1 = 5편 (IDs 736-740)
// Macros: D, C, A, G, F
// Angles: RA7, RA3, RA5, RA1, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-736",
    slug: "dog-nasal-tumor-symptoms-guide",
    type: "blog",
    category: 3,
    title: "강아지 비강 종양 — 한쪽 코피·재채기가 반복될 때",
    subtitle: "비강 종양 증상·고위험 품종, CT 진단, 방사선 치료 선택, 예후",
    metaTitle: "강아지 비강 종양 — 한쪽 코피·재채기 원인·진단·치료 가이드 | 펫지기",
    metaDescription: "강아지 비강 종양 증상과 치료. 한쪽 코피·재채기 반복 증상, 장두종 고위험, CT·비강 내시경 진단, 방사선 치료와 예후, 완화 치료 옵션을 정리했습니다.",
    body: `<p>한쪽 코에서만 계속 피가 나거나 재채기가 반복된다면 비강 종양을 의심해야 한다. 일반적인 비염과 구별하는 것이 중요하다.</p>

<h2>비강 종양의 특징</h2>
<p>비강 및 부비동에서 발생하는 종양으로, 강아지의 비강 종양 중 80%가 악성이다. 장두종(콜리·저먼셰퍼드·에어데일테리어·도베르만)에서 발생률이 높다. 주로 7살 이상에서 발생한다.</p>

<h2>주요 증상</h2>
<div class="callout-dog">
<strong>비강 종양 의심 증상</strong><br>
• 한쪽 코에서만 지속적인 코피(가장 특징적)<br>
• 한쪽 코에서 점성 분비물(투명·황색·혈성)<br>
• 반복적인 재채기<br>
• 얼굴 비대칭 변형 (진행된 경우)<br>
• 안구 돌출·눈물 과다<br>
• 신경 증상(뇌 침범 시)
</div>

<h2>비강 종양 vs 비염 구분</h2>
<ul>
<li>비염: 양측 대칭 증상, 감염 치료에 반응</li>
<li>비강 종양: 한쪽 치우침, 항생제에 반응 없음, 진행성</li>
<li>지속적인 단측 증상 + 항생제 무반응 → CT 검사 필요</li>
</ul>

<h2>진단</h2>
<ul>
<li>CT 또는 MRI: 종양 범위·주변 침범 평가 (X선으로는 불충분)</li>
<li>비강 내시경 + 조직 생검: 확진</li>
<li>흉부 방사선: 폐 전이 확인</li>
</ul>

<h2>치료 선택</h2>
<ul>
<li><strong>방사선 치료</strong>: 비강 종양 표준 치료, 증상 완화 및 생존 기간 연장</li>
<li><strong>항암화학요법</strong>: 방사선 병행 또는 보조 치료</li>
<li><strong>완화 치료</strong>: 방사선 치료 어려운 경우 증상 관리 중심</li>
<li>중앙 생존 기간: 방사선 치료 시 약 12~19개월</li>
</ul>

<h2>마지막으로</h2>
<p>한쪽 코 증상이 수주 이상 지속되면 비강 종양 가능성을 배제하기 위해 CT 검사를 받는 것이 좋다. 조기 진단이 치료 선택의 폭을 넓힌다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Adams, W.M. et al. — Outcome of accelerated radiotherapy alone or accelerated radiotherapy followed by exenteration of the nasal cavity in dogs. J Am Vet Med Assoc 2005",
      "한국수의종양학회 비강 종양 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-18T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-737",
    slug: "cat-hypokalemia-neck-ventroflexion",
    type: "blog",
    category: 3,
    title: "고양이 저칼륨혈증 — 갑자기 목이 처질 때",
    subtitle: "저칼륨혈증 원인·복부 근육 약화·경부 복굴 증상, 진단, 칼륨 보충 치료",
    metaTitle: "고양이 저칼륨혈증 — 목 처짐(경부 복굴) 원인·치료 가이드 | 펫지기",
    metaDescription: "고양이 저칼륨혈증 원인과 치료. 갑자기 목이 처지는 경부 복굴 증상, 만성 신장 질환·구토·설사로 인한 칼륨 소실, 진단 검사, 칼륨 보충 치료 원칙.",
    body: `<p>고양이가 갑자기 머리를 들지 못하고 목이 처진다면 즉시 수의사를 찾아야 한다. 저칼륨혈증으로 인한 근육 약화일 수 있다.</p>

<h2>저칼륨혈증이란</h2>
<p>혈중 칼륨 농도가 비정상적으로 낮아진 상태다. 칼륨은 신경·근육 기능에 필수적인 전해질이다. 고양이에서 저칼륨혈증은 만성 신장 질환, 지속적인 구토·설사, 이뇨제 사용, 일부 유전 질환 등으로 발생한다.</p>

<h2>증상 — 경부 복굴이 특징적</h2>
<div class="callout-cat">
<strong>저칼륨혈증 주요 증상</strong><br>
• 경부 복굴(cervical ventroflexion): 목이 앞으로 처져 들지 못함<br>
• 전신 근육 약화, 비틀거림<br>
• 뒷다리 약화 (계단 오르기 어려움)<br>
• 무기력, 식욕 저하<br>
• 심한 경우: 호흡 근육 약화, 심장 부정맥
</div>

<h2>원인 파악이 중요</h2>
<ul>
<li>만성 신장 질환(CKD): 가장 흔한 기저 원인</li>
<li>위장관 손실: 반복적 구토·설사</li>
<li>부갑상선 기능 항진증</li>
<li>유전성: 버미즈 저칼륨혈증 (버미즈 고양이에서 드물지만 발생)</li>
</ul>

<h2>진단</h2>
<ul>
<li>혈액 전해질 검사: 혈중 칼륨 수치 확인</li>
<li>일반 혈액·소변 검사: 기저 원인 탐색</li>
<li>정상 혈중 칼륨: 3.5~5.8 mEq/L (2.5 이하 시 심각)</li>
</ul>

<h2>치료 — 칼륨 보충</h2>
<ul>
<li>경구 보충: 글루코네이트 칼륨 (비교적 경증)</li>
<li>정맥 보충: 중증·즉각 교정 필요 시 (희석·속도 조절 필수)</li>
<li>기저 원인 치료 병행: CKD 관리, 구토 원인 치료</li>
<li>장기 저칼륨 경향이 있는 경우: 칼륨 함량 높은 처방식</li>
</ul>

<h2>마지막으로</h2>
<p>목이 처진 고양이는 응급 상황이다. 빠른 진단과 칼륨 보충으로 대부분 단기간에 증상이 회복된다. 기저 원인을 함께 관리하지 않으면 재발한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "DiBartola, S.P. — Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice. Elsevier 2012",
      "한국고양이수의사회 전해질 이상 관리 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 상황에서는 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2027-01-19T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-738",
    slug: "stray-dog-rescue-process-korea",
    type: "blog",
    category: 4,
    title: "국내 유기견 구조 절차 — 발견부터 보호소 입소까지",
    subtitle: "유기견 발견 신고 방법, 포획·임시 보호 절차, 공고 기간, 입양 전환 조건",
    metaTitle: "국내 유기견 구조 절차 — 발견·신고·임시 보호·입양 완전 가이드 | 펫지기",
    metaDescription: "국내 유기견 구조 절차 완전 가이드. 유기견 발견 시 신고 방법, 지자체·민간 구조 절차, 공고 기간 10일 이해, 임시 보호 신청과 입양 전환 조건.",
    body: `<p>길에서 유기견을 발견했을 때 어떻게 해야 하는지 모르는 경우가 많다. 올바른 절차를 알면 동물도 보호자도 안전하게 다음 단계로 넘어갈 수 있다.</p>

<h2>유기견 발견 시 첫 단계</h2>
<ul>
<li>마이크로칩 확인: 인근 동물병원에서 스캔 요청 (무료 또는 소액)</li>
<li>원래 소유자 연락: 마이크로칩 있으면 등록 정보 확인</li>
<li>마이크로칩 없거나 소유자 불명: 지자체 신고 진행</li>
</ul>

<h2>공식 신고 방법</h2>
<div class="callout-dog">
<strong>유기견 신고 채널</strong><br>
• 동물보호관리시스템(APMS): www.animal.go.kr 온라인 신고<br>
• 지자체 동물보호 담당 부서: 시군구청 환경·위생과 또는 동물보호팀<br>
• 유기동물 포획 요청: 지자체 공식 포획 인력 파견 가능<br>
• 112 신고: 도로 위 위험한 유기동물 즉시 대응
</div>

<h2>공고 기간과 의미</h2>
<ul>
<li>지자체 보호소 입소 후 10일간 공고 게시 (APMS 공개)</li>
<li>공고 기간 중 원래 소유자 귀환 가능</li>
<li>공고 기간 만료 후: 입양·민간 보호단체 이전·자연사 처리</li>
<li>10일은 생명 기한이기도 하므로 입양 의사 있으면 조기 신청 권장</li>
</ul>

<h2>임시 보호 신청</h2>
<ul>
<li>지자체 담당자에게 임시 보호 신청 → 공식 임시 보호자 등록</li>
<li>등록 없이 데려가면 추후 법적 분쟁 발생 가능</li>
<li>임시 보호 기간: 보통 공고 기간(10일) 포함</li>
<li>공고 종료 후 입양 전환 신청 가능</li>
</ul>

<h2>민간 구조단체 연계</h2>
<ul>
<li>임시 보호 여건이 안 될 경우: 민간 동물보호단체에 연락</li>
<li>단체마다 수용 가능 여부 다름 — 사전 문의 필수</li>
<li>단체 통한 구조도 반드시 지자체 신고 병행 권장</li>
</ul>

<h2>마지막으로</h2>
<p>유기견 구조는 선의만으로 되지 않는다. 공식 절차를 밟아야 동물도 보호받고 구조자도 보호된다. 신고 → 임시 보호 → 공고 → 입양의 흐름을 기억하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "농림축산식품부 동물보호법 시행령 및 유기동물 관리 지침 2023",
      "동물자유연대 유기동물 구조·신고 가이드",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 실제 법적 사항은 해당 지자체 담당 부서에 확인하시기 바랍니다.",
    status: "published",
    publishedAt: "2027-01-19T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-739",
    slug: "cat-calorie-calculation-obesity-prevention",
    type: "blog",
    category: 2,
    title: "고양이 사료 칼로리 계산 — 비만 예방 급여량 기준",
    subtitle: "고양이 하루 칼로리 요구량 계산법, RER·DER 공식, 비만 고양이 감량 급여 원칙",
    metaTitle: "고양이 사료 칼로리 계산 — 비만 예방 정확한 급여량 계산법 | 펫지기",
    metaDescription: "고양이 하루 칼로리 요구량 계산 방법. RER·DER 공식, 중성화·실내·시니어 보정, 비만 고양이 안전한 칼로리 감량 방법, 급여량 기준을 정리했습니다.",
    body: `<p>국내 반려 고양이의 상당수가 과체중이다. 정확한 칼로리 계산 없이 "권장량대로" 주면 개체 상황에 따라 과급여가 된다.</p>

<h2>왜 정확한 급여량이 중요한가</h2>
<p>사료 포장의 권장 급여량은 평균값이다. 중성화 여부·활동량·나이·실내 생활 여부에 따라 실제 필요량은 권장량보다 20~40% 적을 수 있다. 특히 중성화된 실내 고양이는 과체중 고위험군이다.</p>

<h2>기초 대사 에너지(RER) 계산</h2>
<div class="callout-cat">
<strong>RER 계산 공식</strong><br>
RER(kcal/일) = 70 × (체중kg)^0.75<br><br>
예시: 4kg 고양이<br>
RER = 70 × (4)^0.75 = 70 × 2.83 ≈ 198 kcal/일
</div>

<h2>일일 에너지 요구량(DER) — 보정 계수 적용</h2>
<ul>
<li>중성화 성묘(실내): RER × 1.2</li>
<li>비중성화 성묘(활동적): RER × 1.4</li>
<li>시니어(7살 이상): RER × 1.1~1.2</li>
<li>비만 고양이 감량: RER × 0.8~1.0</li>
<li>임신·수유: RER × 1.6~2.0 (수의사 지침 우선)</li>
</ul>

<h2>실제 급여량 계산</h2>
<ul>
<li>DER ÷ 사료 kcal/100g = 하루 급여량(g)</li>
<li>사료 칼로리는 제품 라벨 또는 제조사 홈페이지에서 확인</li>
<li>습식·건식 혼합 시 각각 칼로리 합산 필요</li>
</ul>

<h2>비만 고양이 안전한 감량 원칙</h2>
<ul>
<li>주당 1~2% 체중 감소 목표 (급격한 감량 금지)</li>
<li>3일 이상 식욕 감소·완전 거부: 지방간 위험 → 수의사 상담</li>
<li>처방 다이어트 사료: 저칼로리 + 포만감 유지 설계</li>
<li>자유 급여 방식에서 정량 급여 방식으로 전환이 핵심</li>
</ul>

<h2>마지막으로</h2>
<p>칼로리 계산이 번거롭다면, 중성화 실내 고양이에게 권장량의 70~80%를 주는 것부터 시작해도 좋다. 정기 체중 측정으로 조절해 가면 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Zoran, D.L. — Obesity in dogs and cats: a metabolic and endocrine disorder. Vet Clin North Am 2010",
      "한국수의영양학회 반려동물 비만 관리 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-20T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-740",
    slug: "dog-nose-work-scent-training-basics",
    type: "blog",
    category: 5,
    title: "강아지 노즈워크 — 집에서 하는 후각 훈련 기초",
    subtitle: "노즈워크 효과, 기초 냄새 탐지 훈련 방법, 레벨별 진행, 집에서 할 수 있는 활동",
    metaTitle: "강아지 노즈워크 — 집에서 하는 후각 훈련 기초 완전 가이드 | 펫지기",
    metaDescription: "강아지 노즈워크 기초 가이드. 후각 자극이 강아지 스트레스를 줄이는 이유, 상자 탐색·집 안 숨기기 단계별 훈련 방법, 노즈워크 경기 입문 안내.",
    body: `<p>강아지에게 코를 쓰는 것은 먹는 것만큼 만족스러운 행동이다. 노즈워크는 집 안에서도 충분한 정신적 자극을 주는 가장 쉬운 훈련이다.</p>

<h2>노즈워크의 효과</h2>
<ul>
<li>후각 자극은 뇌를 활발하게 사용 → 정신적 피로감 제공</li>
<li>불안·과잉 행동 감소 (특히 실내 과잉 에너지 방출)</li>
<li>나이 든 개, 부상 중인 개도 할 수 있는 저강도 활동</li>
<li>사람과의 긍정적 상호작용 증가</li>
</ul>

<h2>기초 — 상자 탐색</h2>
<div class="callout-dog">
<strong>상자 탐색 기초 훈련</strong><br>
1. 종이상자 5~10개를 바닥에 배치<br>
2. 그 중 하나에 간식 숨기기<br>
3. 강아지가 스스로 냄새 맡아 찾으면 즉시 보상<br>
4. 찾는 상자를 점점 비슷한 것들 중에 숨기기<br>
▶ 처음에는 눈앞에서 숨기는 모습 보여줘도 됨
</div>

<h2>집 안 숨기기 단계별 진행</h2>
<ul>
<li>레벨 1: 보이는 곳에 놓기 → 찾으면 보상</li>
<li>레벨 2: 방석 아래, 선반 옆 등 살짝 숨기기</li>
<li>레벨 3: 방 여러 곳에 숨기고 "찾아!" 신호로 탐색 시작</li>
<li>레벨 4: 특정 향(clove·birch·아니스 오일)을 단서로 훈련 → 공인 노즈워크 경기 준비 가능</li>
</ul>

<h2>훈련 팁</h2>
<ul>
<li>항상 성공 경험으로 끝내기 (마지막 숨기기는 쉽게)</li>
<li>강아지가 먼저 코를 사용하게 기다리기 (인도하지 않기)</li>
<li>5~10분 세션, 하루 1~2회면 충분</li>
<li>강아지가 지루해 보이면 난이도를 높여도 됨</li>
</ul>

<h2>노즈워크 경기 입문</h2>
<p>국내에도 강아지 노즈워크 경기(한국 K9 노즈워크 협회 등)가 운영되고 있다. 기초 훈련이 완성되면 공인 향(타겟 향)을 사용하는 경기 훈련으로 발전할 수 있다.</p>

<h2>마지막으로</h2>
<p>노즈워크는 장소·도구·비용이 거의 필요 없는 훈련이다. 오늘 상자 5개와 간식만 있으면 시작할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 훈련·행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Gadbois, S. & Reeve, C. — Canine olfaction: scent, sign, and situation. Domestic Dog Cognition 2014",
      "한국K9노즈워크협회 기초 훈련 매뉴얼",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-20T11:00:00.000Z",
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
  console.log("블로그 포스트 123차 시딩 완료! (blog-736 ~ blog-740)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
