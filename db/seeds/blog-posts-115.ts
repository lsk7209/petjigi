import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 115 — cat3×2 + cat1×1 + cat2×1 + cat5×1 = 5편 (IDs 696-700)
// Macros: D, A, B, G, F
// Angles: RA4, RA7, RA8, RA2, RA6

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-696",
    slug: "dog-pericardial-effusion-guide",
    type: "blog",
    category: 3,
    title: "강아지 심낭삼출 — 심장 주변에 물이 차는 응급 상황",
    subtitle: "심낭삼출 원인, 심낭압전 응급 신호, 심낭천자, 근본 원인에 따른 예후 차이",
    metaTitle: "강아지 심낭삼출(심낭압전) — 원인·응급 처치·예후 가이드 | 펫지기",
    metaDescription: "강아지 심낭삼출 원인과 응급 처치. 심장 주변에 액체가 차는 심낭삼출, 심낭압전 응급 신호, 심낭천자 처치, 혈관육종 vs 특발성 원인별 예후를 설명합니다.",
    body: `<p>심낭삼출은 심장을 감싸는 심낭 내부에 액체가 차는 상태다. 액체가 빠르게 늘어나면 심장을 압박해 심박출량이 급감하는 응급 상황이 된다.</p>

<h2>심낭삼출이란</h2>
<p>정상적으로 심낭 내에는 소량의 윤활액이 있다. 비정상적인 액체 축적은 출혈이나 삼출로 발생하며, 빠르게 늘어나면 심낭압전(Cardiac Tamponade)으로 진행해 생명을 위협한다.</p>

<h2>주요 원인</h2>
<ul>
<li><strong>심장 혈관육종(HSA)</strong>: 우심방·심낭에 발생하는 악성 종양, 가장 흔한 원인</li>
<li><strong>특발성 심낭삼출</strong>: 원인 불명, 대형견에서 흔함, 예후 상대적으로 좋음</li>
<li><strong>심장 기저부 종양</strong>: 대동맥체 종양 등</li>
<li><strong>감염·심장염</strong>: 드물게 발생</li>
</ul>

<h2>심낭압전 응급 신호</h2>
<div class="callout-dog">
<strong>즉시 응급 병원으로 가야 하는 신호</strong><br>
• 갑작스러운 허탈, 쓰러짐<br>
• 빠른 호흡, 복수(배가 부어오름)<br>
• 잇몸 창백, 맥박 약함<br>
• 극도의 무기력, 운동 불내성<br>
▶ 심낭압전은 즉각적인 심낭천자 없이는 수 분~수 시간 내 사망 가능
</div>

<h2>진단과 응급 처치</h2>
<ul>
<li>심초음파: 심낭 내 액체 확인, 심장 압박 정도 평가</li>
<li>심낭천자(Pericardiocentesis): 심낭에 바늘을 삽입해 액체 제거 — 즉각적 증상 개선</li>
<li>ECG, 흉부 X-ray: 병행 평가</li>
</ul>

<h2>근본 원인별 예후</h2>
<ul>
<li><strong>혈관육종</strong>: 수술·화학요법 병행에도 중간 생존 수개월~1년 이내</li>
<li><strong>특발성</strong>: 반복 심낭천자 또는 심낭절개로 좋은 삶의 질 유지 가능, 중간 생존 수년 이상</li>
<li>원인 감별이 치료 방향 결정에 핵심</li>
</ul>

<h2>마지막으로</h2>
<p>심낭삼출 증상은 다른 심장 질환이나 복수와 비슷해 보일 수 있다. 강아지가 갑자기 심하게 지치고 배가 부어오른다면 즉시 응급 병원으로 가자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Stafford, Johnson M. & Martin, M.W.S. — Pericardial disorders. BSAVA Manual of Canine and Feline Cardiorespiratory Medicine 2007",
      "한국수의심장학회 강아지 심낭삼출 진단 및 치료 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 증상 발생 시 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-12-29T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-697",
    slug: "cat-hcm-daily-management",
    type: "blog",
    category: 3,
    title: "고양이 비대성 심근병증(HCM) 일상 관리 — 진단 후 보호자가 할 일",
    subtitle: "HCM 진단 후 가정 관리, 복용약 이해, 호흡수 모니터링, 응급 상황 기준",
    metaTitle: "고양이 HCM(비대성 심근병증) 일상 관리 — 약·모니터링·응급 기준 | 펫지기",
    metaDescription: "고양이 비대성 심근병증(HCM) 진단 후 일상 관리 방법. 복용약의 역할 이해, 집에서 하는 호흡수 모니터링, 즉시 병원에 가야 하는 응급 신호를 정리했습니다.",
    body: `<p>고양이 HCM(비대성 심근병증) 진단을 받으면 보호자는 두려움과 막막함을 느낀다. 그러나 적절한 관리로 좋은 삶의 질을 오래 유지할 수 있다.</p>

<h2>HCM이란 간단히</h2>
<p>심장 근육(특히 좌심실)이 두꺼워져 혈액을 제대로 채우지 못하는 질환이다. 고양이에서 가장 흔한 심장 질환으로, 메인쿤·랙돌·페르시안 등 특정 품종에서 유전성이 확인됐다.</p>

<h2>진단 후 처방약의 역할</h2>
<div class="callout-cat">
<strong>HCM 고양이에게 처방되는 주요 약물</strong><br>
• <strong>아테놀롤</strong>: 심박수 조절, 심근 부담 감소<br>
• <strong>딜티아젬</strong>: 심박수·심근 수축력 조절<br>
• <strong>후로세마이드(이뇨제)</strong>: 폐부종·흉수 시 액체 제거<br>
• <strong>클로피도그렐</strong>: 혈전 예방 (혈전색전증 위험 있는 경우)<br>
▶ 처방약은 임의로 중단하거나 조절하지 마세요
</div>

<h2>집에서 하는 호흡수 모니터링</h2>
<ul>
<li>수면 중 분당 호흡수 측정: 정상 20~30회/분</li>
<li>30회 이상 반복 측정 시: 수의사 연락</li>
<li>측정 방법: 가슴·배가 오르내리는 것 30초 세고 2배 = 분당 호흡수</li>
<li>매일 같은 시간에 기록하면 변화 파악 용이</li>
</ul>

<h2>즉시 응급 병원으로 가야 하는 신호</h2>
<ul>
<li>갑작스러운 호흡 곤란 (입으로 숨, 배로 호흡)</li>
<li>뒷다리 마비 또는 갑작스러운 울음 (혈전색전증 의심)</li>
<li>잇몸 창백 또는 파란색</li>
<li>수면 중 호흡수 40회 이상</li>
</ul>

<h2>생활 관리</h2>
<ul>
<li>스트레스 최소화: 이사·동물 추가 도입 등 스트레스 요인 신중히</li>
<li>염분 제한: 심부전 진행 시 저염 식이 권장 가능 (수의사 상담)</li>
<li>정기 심초음파: 3~6개월 간격으로 진행 모니터링</li>
</ul>

<h2>마지막으로</h2>
<p>HCM은 관리 불가능한 병이 아니다. 호흡수 모니터링과 약 복용, 정기 검진이 루틴이 되면 고양이와 함께하는 시간이 길어진다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Paige, C.F. et al. — Prevalence of cardiomyopathy in apparently healthy cats. JAVMA 2009",
      "한국수의심장학회 고양이 비대성 심근병증 관리 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 처방 없이 약을 조절하지 마세요.",
    status: "published",
    publishedAt: "2026-12-29T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-698",
    slug: "rabbit-adoption-beginner-complete",
    type: "blog",
    category: 1,
    title: "토끼 입양 입문 — 생각보다 어려운 반려 토끼의 현실",
    subtitle: "토끼의 실제 케어 요구, 단독 외로움 vs 사회적 니즈, 전문 수의사 필요성, 수명",
    metaTitle: "토끼 입양 입문 가이드 — 케어 요구·수의사·현실적 조언 | 펫지기",
    metaDescription: "토끼 입양 전 알아야 할 현실. 토끼의 실제 케어 요구, 수의사 접근성 문제, 사회적 니즈, 소화기 응급, 수명과 장기 책임까지 입양 전 체크리스트를 정리했습니다.",
    body: `<p>토끼는 조용하고 쉬울 것 같다는 인식이 있다. 그러나 토끼는 전문적인 케어가 필요한 동물이다. 입양 전 현실을 알아야 한다.</p>

<h2>토끼는 "쉬운 동물"이 아니다</h2>
<p>토끼는 강아지나 고양이보다 스트레스에 민감하다. 소화기가 매우 취약해 먹기를 멈추면(GI Stasis) 수 시간 내 위험해질 수 있다. 적절한 환경·식이·사회화가 모두 필요하다.</p>

<h2>필수 식이 — 건초가 핵심</h2>
<ul>
<li>건초(티모시·오처드 등): 식사의 70~80%, 하루 종일 무제한 제공</li>
<li>신선 채소: 매일 소량, 도입은 천천히</li>
<li>펠릿: 소량 보조 (과다 급여 금지)</li>
<li>과일·당근: 당분 높아 소량만 (간식)</li>
</ul>

<h2>소화기 응급 — GI Stasis</h2>
<div class="callout-dog">
<strong>즉시 수의사 연락이 필요한 토끼 신호</strong><br>
• 4~6시간 이상 먹지 않거나 배변이 없음<br>
• 복부 팽창, 이를 갈거나 무기력<br>
• 웅크리거나 자세 바꾸며 불편 표현<br>
▶ GI Stasis는 토끼 응급의 가장 흔한 원인입니다
</div>

<h2>수의사 접근성 확인 필수</h2>
<ul>
<li>모든 수의사가 토끼를 진료하지 않음</li>
<li>입양 전 근처에 토끼 전문 또는 exotic 동물 진료 수의사 있는지 확인</li>
<li>야간·응급 진료 가능 여부도 사전 확인</li>
</ul>

<h2>사회적 니즈</h2>
<ul>
<li>토끼는 사회적 동물, 혼자 오래 있으면 외로움과 우울감 가능</li>
<li>쌍으로 키우는 것이 이상적 (중성화 후 동성 or 이성 쌍)</li>
<li>하루 최소 몇 시간 이상 방 밖 자유 활동 시간 필요</li>
</ul>

<h2>수명과 장기 책임</h2>
<ul>
<li>평균 수명: 8~12년 (잘 관리하면 더 긴 경우도)</li>
<li>중성화: 암컷은 자궁암 예방을 위해 특히 권장</li>
<li>장기 책임: 10년 이상 케어할 준비가 있는가</li>
</ul>

<h2>마지막으로</h2>
<p>토끼는 충분히 사랑스러운 반려동물이다. 그러나 "쉬워서" 시작한다면 토끼에게도, 보호자에게도 어려운 경험이 된다. 현실을 알고 시작한 보호자가 오래 함께할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국 소동물 수의사회 토끼 기본 케어 가이드라인",
      "Meredith, A. & Flecknell, P. — BSAVA Manual of Rabbit Medicine and Surgery 2006",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-30T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-699",
    slug: "cat-freeze-dried-raw-comparison",
    type: "blog",
    category: 2,
    title: "고양이 동결건조 사료 vs 생식 — 어떤 것이 더 안전한가",
    subtitle: "동결건조 공정의 세균 처리, 생식과의 영양 차이, 안전성 비교, 선택 기준",
    metaTitle: "고양이 동결건조 사료 vs 생식 비교 — 안전성·영양·선택 기준 | 펫지기",
    metaDescription: "고양이 동결건조 사료와 생식의 안전성을 비교했습니다. 동결건조 공정의 세균 처리 효과, 생식과의 영양 차이, 적절한 선택 기준을 알기 쉽게 설명합니다.",
    body: `<p>동결건조 사료는 생식의 "안전한 대안"처럼 마케팅된다. 실제로 그럴까? 동결건조가 생식과 어떻게 다른지 정확히 알아보자.</p>

<h2>동결건조 공정이란</h2>
<p>동결건조(Freeze-drying)는 식품을 급속 냉동한 뒤 진공 상태에서 수분을 제거하는 공정이다. 가열을 하지 않아 단백질·영양소 변성이 적다. 그러나 가열이 아니기 때문에 세균을 완전히 제거하지 못할 수 있다.</p>

<h2>세균 안전성 비교</h2>
<div class="callout-cat">
<strong>동결건조 vs 생식 세균 위험 비교</strong><br>
• <strong>생식</strong>: 살모넬라·리스테리아·캄필로박터 오염 위험 높음<br>
• <strong>동결건조</strong>: 동결 자체로 세균 수 감소하지만 완전 제거 불가, 일부 제품에서 살모넬라 검출 사례<br>
• <strong>고압처리(HPP)</strong>: 일부 동결건조 제품에 추가 적용, 세균 억제 효과 있음<br>
▶ 동결건조가 생식보다 상대적으로 안전하나 무균은 아님
</div>

<h2>영양 차이</h2>
<ul>
<li>동결건조: 수분만 제거, 단백질·지방·영양소 대부분 보존</li>
<li>생식과 영양 프로필 유사 (수분 공급은 물 따로 필요)</li>
<li>가수분해·가열 사료보다 영양 변성 적음</li>
</ul>

<h2>제품 선택 기준</h2>
<ul>
<li>AAFCO 영양 완전성 인증 여부 확인</li>
<li>HPP(고압처리) 공정 적용 여부</li>
<li>단순 동결건조만 된 제품보다 영양 검증 있는 브랜드 선택</li>
<li>면역 저하 고양이·새끼 고양이에게는 여전히 주의 필요</li>
</ul>

<h2>어떤 경우에 동결건조가 적합할까</h2>
<ul>
<li>생식에 관심 있지만 세균 위험이 걱정되는 경우</li>
<li>여행·보관이 편리한 형태가 필요한 경우</li>
<li>기존 사료에 토퍼(toppers)로 소량 추가하는 경우</li>
</ul>

<h2>마지막으로</h2>
<p>동결건조 사료는 생식보다 상대적으로 안전하고 편리한 선택지이지만, 세균 위험이 완전히 없는 것은 아니다. 브랜드와 공정 확인이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물영양학회 동결건조 사료 안전성 및 영양 가이드라인",
      "FDA — Raw Pet Food Diets can be Dangerous to You and Your Pet (2018)",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-30T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-700",
    slug: "dog-enrichment-interactive-toys",
    type: "blog",
    category: 5,
    title: "강아지 인리치먼트 — 집 안에서 정신적 자극 주는 방법",
    subtitle: "인리치먼트의 의미, 노즈워크·Kong·퍼즐 피더 활용, DIY 아이디어, 과자극 주의",
    metaTitle: "강아지 인리치먼트 — 집 안 정신적 자극 방법과 노즈워크 가이드 | 펫지기",
    metaDescription: "강아지 인리치먼트 방법을 정리했습니다. 노즈워크·Kong·퍼즐 피더 활용법, 집에서 쉽게 하는 DIY 인리치먼트 아이디어, 과자극 방지 주의사항을 설명합니다.",
    body: `<p>강아지는 몸뿐만 아니라 머리도 써야 한다. 정신적 자극 없이 몸 운동만 하면 여전히 불안하고 지루한 개가 된다. 인리치먼트가 답이다.</p>

<h2>인리치먼트란</h2>
<p>인리치먼트(Enrichment)는 강아지의 자연스러운 행동 욕구(냄새 맡기, 씹기, 탐색, 문제 해결)를 집 안에서 충족시켜주는 활동이다. 산책과 함께 병행하면 훨씬 더 만족스러운 강아지를 만든다.</p>

<h2>노즈워크 — 가장 효과적인 인리치먼트</h2>
<ul>
<li>강아지의 후각 능력은 인간의 1만~10만 배</li>
<li>코로 탐색하는 것이 강아지에게 가장 만족스러운 활동 중 하나</li>
<li>노즈워크 15분 = 산책 30분~1시간의 정신적 피로 효과</li>
</ul>

<h2>쉬운 인리치먼트 방법</h2>
<div class="callout-dog">
<strong>집에서 바로 할 수 있는 인리치먼트</strong><br>
• <strong>노즈워크 매트</strong>: 건식 사료를 매트 사이사이에 숨겨서 코로 찾게 하기<br>
• <strong>Kong</strong>: 간식을 채워 냉동 후 제공 — 30분~1시간 집중<br>
• <strong>퍼즐 피더</strong>: 사료를 퍼즐로 풀어야 꺼낼 수 있는 장난감<br>
• <strong>머핀 틀 노즈워크</strong>: 테니스공으로 머핀 틀 구멍 덮고 간식 숨기기<br>
• <strong>냄새 산책</strong>: 강아지가 냄새 맡는 속도에 맞춰 천천히 산책
</div>

<h2>난이도 조절</h2>
<ul>
<li>처음에는 쉬운 난이도에서 시작 — 성공 경험이 중요</li>
<li>강아지가 포기하거나 좌절하면 난이도를 낮추기</li>
<li>서로 다른 종류의 인리치먼트를 번갈아 사용</li>
</ul>

<h2>과자극 주의</h2>
<ul>
<li>퍼즐 피더를 매 끼니마다 쓰면 오히려 스트레스</li>
<li>하루 1~2회, 각 10~20분 정도가 적당</li>
<li>끝난 후 강아지가 눕거나 조용히 쉬면 적절한 자극이었다는 신호</li>
</ul>

<h2>마지막으로</h2>
<p>인리치먼트는 특별한 도구가 없어도 할 수 있다. 집에 있는 종이컵, 머핀 틀, 수건 한 장으로 시작할 수 있다. 강아지에게 문제를 풀어주는 것이 아니라 스스로 풀 기회를 주는 것이 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동·케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Rehn, T. & Keeling, L.J. — The effect of time left alone at home on dog welfare. Appl Anim Behav Sci 2011",
      "한국동물행동의학회 반려견 인리치먼트 실천 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-31T09:00:00.000Z",
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
  console.log("블로그 포스트 115차 시딩 완료! (blog-696 ~ blog-700)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
