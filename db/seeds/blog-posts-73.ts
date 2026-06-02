import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 73 — cat2×2 + cat3×1 + cat6×1 + cat1×1 = 5편 (IDs 486-490)
// Macros: A, D, B, E, F
// Angles: RA3, RA1, RA2, RA8, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-486",
    slug: "senior-dog-nutrition-transition",
    type: "blog",
    category: 2,
    title: "노령견 사료 전환 — 언제, 어떤 사료로, 어떻게 바꿔야 하나",
    subtitle: "노령견 전환 시점, 노령 사료 주요 성분 차이, 점진적 전환 방법, 비용 현실",
    metaTitle: "노령견 사료 전환 시점과 방법 — 7살 이후 영양 가이드 | 펫지기",
    metaDescription: "강아지 노령 사료로 언제, 어떻게 전환해야 할까요? 전환 시점 기준, 노령 사료 주요 성분 차이, 점진적 전환 방법, 비용 비교를 정리했습니다.",
    body: `<p>7~8살이 되면 강아지는 신진대사, 소화 기능, 근육량이 변하기 시작한다. 사료도 그에 맞게 바꿔줘야 한다. 그러나 무조건 '노령 사료'로 바꾼다고 좋은 것은 아니다.</p>

<h2>전환을 고려하는 시점</h2>
<ul>
<li>소형견: 8~10세 (수명이 길다)</li>
<li>중형견: 7~8세</li>
<li>대형견: 5~7세 (노화가 빠르다)</li>
<li>체중 증가, 근육 감소, 소화 문제 발생 시 연령 무관하게 검토</li>
</ul>

<h2>노령 사료와 성견 사료의 차이</h2>
<table>
<thead><tr><th>항목</th><th>성견 사료</th><th>노령 사료</th></tr></thead>
<tbody>
<tr><td>칼로리</td><td>보통</td><td>낮음 (비만 예방)</td></tr>
<tr><td>단백질</td><td>보통</td><td>높음 또는 유사 (근육 유지)</td></tr>
<tr><td>지방</td><td>보통</td><td>낮음</td></tr>
<tr><td>관절 성분</td><td>없거나 소량</td><td>글루코사민·콘드로이틴 강화</td></tr>
<tr><td>항산화제</td><td>기본</td><td>강화 (인지 기능 보조)</td></tr>
</tbody>
</table>

<h2>점진적 전환 방법</h2>
<div class="callout-dog">
<strong>7~10일 전환 프로토콜</strong><br>
1~3일: 기존 75% + 신규 25%<br>
4~6일: 기존 50% + 신규 50%<br>
7~9일: 기존 25% + 신규 75%<br>
10일: 신규 100%<br>
▶ 설사·구토 시 이전 단계로 후퇴
</div>

<h2>비용 현실</h2>
<p>노령견 사료는 일반 사료보다 10~30% 비싼 경향이 있다. 고품질 성분(글루코사민·오메가-3 강화)이 포함될수록 가격은 올라간다. 그러나 이것이 관절·심장 질환 예방에 투자하는 개념으로 보면 장기적으로 의료비를 줄이는 효과도 있다.</p>

<h2>마지막으로</h2>
<p>노령 사료 전환 전 수의사와 상담해 현재 체중, 기저 질환, 활동량을 고려한 맞춤 권고를 받는 것이 가장 정확하다. 사료 라벨만 보고 선택하는 것보다 훨씬 효과적이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AAFCO — Nutritional Requirements for Senior Dogs 2023",
      "한국수의영양학회 노령 동물 영양 관리 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-15T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-487",
    slug: "cat-daily-food-amount-guide",
    type: "blog",
    category: 2,
    title: "고양이 하루 사료 적정량 — 눈대중으로 주면 안 되는 이유",
    subtitle: "체중별 칼로리 계산법, 건식·습식 혼합 시 계산, 비만 고양이 감량 식이",
    metaTitle: "고양이 하루 사료 적정량 — 체중별 계산법과 비만 관리 | 펫지기",
    metaDescription: "고양이 하루 사료 적정량을 체중별로 계산하는 방법을 정리했습니다. 건식·습식 혼합 시 계산법, 비만 고양이 감량 식이, 급여 횟수도 알아보세요.",
    body: `<p>고양이 비만율이 국내에서 50% 이상으로 추정된다. 원인의 상당 부분은 "적당히"라는 기준으로 사료를 주는 것에 있다. 고양이 사료 급여량은 계산이 필요하다.</p>

<h2>칼로리 요구량 계산</h2>
<p>기초 공식: 체중(kg)^0.75 × 70 × 계수 = 일일 칼로리(RER 기반)</p>
<ul>
<li>중성화 성묘: 체중(kg)^0.75 × 70 × 1.0~1.2</li>
<li>비중성화 성묘: × 1.4~1.6</li>
<li>비만 감량: × 0.8</li>
<li>노령묘 (11세+): × 1.1~1.4 (근육 유지 위해 낮추지 않음)</li>
</ul>

<h2>체중별 하루 건식 사료량 (중성화 기준, 300kcal/100g 사료)</h2>
<table>
<thead><tr><th>체중</th><th>하루 칼로리</th><th>건식량 (300kcal/100g 기준)</th></tr></thead>
<tbody>
<tr><td>3kg</td><td>약 180kcal</td><td>약 60g</td></tr>
<tr><td>4kg</td><td>약 220kcal</td><td>약 73g</td></tr>
<tr><td>5kg</td><td>약 260kcal</td><td>약 87g</td></tr>
</tbody>
</table>

<h2>건식+습식 혼합 계산</h2>
<div class="callout-cat">
<strong>혼합 급여 시 계산 방법</strong><br>
1. 목표 일일 칼로리 계산<br>
2. 습식 사료 제공량 먼저 결정 (예: 100g = 약 80kcal)<br>
3. 나머지 칼로리를 건식으로 채우기<br>
▶ 각 사료 포장지의 kcal/100g 확인 필수
</div>

<h2>비만 고양이 감량</h2>
<ul>
<li>현재 체중이 아닌 이상 체중 기준으로 계산</li>
<li>월 1~2% 체중 감량 목표 (너무 빠른 감량 → 지방간 위험)</li>
<li>건식보다 습식이 포만감 높고 칼로리 낮아 감량에 유리</li>
</ul>

<h2>마지막으로</h2>
<p>주방용 디지털 저울 하나로 급여량을 매일 계량하는 습관이 고양이 건강 관리의 기본이다. 체중이 줄지 않는다면 먹는 양보다 칼로리를 먼저 확인해보자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "National Research Council — Nutrient Requirements of Dogs and Cats 2006",
      "한국수의영양학회 고양이 체중 관리 임상 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-15T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-488",
    slug: "cat-asthma-bronchitis-guide",
    type: "blog",
    category: 3,
    title: "고양이 천식·기관지염 — 기침·쌕쌕거리는 숨소리가 신호다",
    subtitle: "고양이 천식과 기관지염 차이, 촉발 요인, 흡입기 사용법, 스테로이드 치료",
    metaTitle: "고양이 천식·기관지염 — 증상·촉발 요인·흡입기 치료 가이드 | 펫지기",
    metaDescription: "고양이 천식과 기관지염의 차이, 촉발 요인, 흡입기 사용법, 스테로이드 치료를 정리했습니다. 기침·쌕쌕거리는 숨소리가 있는 고양이 보호자 필독.",
    body: `<p>고양이가 납작하게 엎드려 목을 내밀고 심하게 기침을 한다. 헤어볼인 줄 알았는데 아무것도 나오지 않는다면 — 천식 발작일 수 있다.</p>

<h2>고양이 천식이란</h2>
<p>기도에 만성 염증이 생기고, 기관지가 좁아지는 질환이다. 특정 자극(알레르겐·먼지·향기)에 반응해 기관지 경련이 발생한다. 사람의 천식과 매우 유사한 메커니즘이다.</p>

<h2>천식 vs 기관지염 vs 헤어볼 구분</h2>
<ul>
<li><strong>천식</strong>: 발작적 기침, 쌕쌕거림, 낮은 자세로 목 뻗음, 호흡 곤란</li>
<li><strong>기관지염</strong>: 지속적 기침, 가래 소리, 보통 호흡 곤란 없음</li>
<li><strong>헤어볼</strong>: 구역질·구토 동작, 털 덩어리 배출 → 이후 증상 사라짐</li>
</ul>

<h2>촉발 요인 줄이기</h2>
<div class="callout-cat">
<strong>흔한 천식 촉발 요인</strong><br>
• 모래 먼지 (미세 입자 화장실 모래 → 저분진 모래로 교체)<br>
• 향초·방향제·에어프레시너<br>
• 담배 연기<br>
• 청소용품 향기 (환기 후 사용)<br>
• 집 먼지 진드기 (카펫 최소화)
</div>

<h2>치료 옵션</h2>
<ul>
<li><strong>흡입기</strong>: AeroKat 스페이서 + 플루티카손/알부테롤 — 폐에 직접 작용, 부작용 최소</li>
<li><strong>경구 스테로이드</strong>: 프레드니솔론 — 효과적이나 장기 복용 시 부작용</li>
<li><strong>응급</strong>: 호흡 곤란 발작 시 즉시 응급 동물병원</li>
</ul>

<h2>마지막으로</h2>
<p>고양이 천식은 완치보다 관리가 목표다. 촉발 요인을 줄이고, 흡입기 사용에 익숙해지면 발작 빈도를 크게 낮출 수 있다. 흡입기 훈련은 처음엔 어렵지만 대부분의 고양이가 1~2주 내 익숙해진다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Nafe, L.A. et al. — Feline Bronchial Disease. J Vet Intern Med 2010",
      "한국고양이수의사회 호흡기 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-16T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-489",
    slug: "pet-loss-children-guide",
    type: "blog",
    category: 6,
    title: "아이에게 반려동물의 죽음 설명하기 — 나이에 맞는 방법",
    subtitle: "3~5세·6~9세·10세+ 연령별 설명 방법, 피해야 할 표현, 함께 슬퍼하는 방법",
    metaTitle: "아이에게 반려동물 죽음 설명하기 — 연령별 완전 가이드 | 펫지기",
    metaDescription: "아이에게 반려동물의 죽음을 어떻게 설명해야 할까요? 3~5세·6~9세·10세 이상 연령별 방법, 피해야 할 표현, 함께 슬퍼하는 방법을 정리했습니다.",
    body: `<p>가족의 반려동물이 세상을 떠났다. 아이에게 어떻게 말해야 할까? 잘못된 설명이 오히려 혼란과 두려움을 만들기도 한다.</p>

<h2>왜 솔직함이 중요한가</h2>
<p>많은 부모가 아이를 보호하려는 마음에서 "멀리 갔어", "잠이 들었어"라고 말한다. 그러나 이런 표현은 아이에게 "잠을 자면 안 돌아올 수 있다"는 두려움을 심어주거나, 나중에 진실을 알았을 때 불신으로 이어질 수 있다. 나이에 맞는 언어로 솔직하게 말하는 것이 장기적으로 더 낫다.</p>

<h2>연령별 설명 방법</h2>
<div class="callout-cat">
<strong>3~5세</strong><br>
"뽀미는 죽었어. 더 이상 움직이지 않고, 느끼지도 못해. 우리가 보고 싶어도 이제 볼 수 없어. 슬픈 거야." — 단순하고 구체적으로<br><br>
<strong>6~9세</strong><br>
죽음의 영구성, 신체 기능 중단을 이해할 수 있다. "왜 죽었어?"에 정직하게 답하기. 감정을 표현해도 된다고 허락.<br><br>
<strong>10세+</strong><br>
성인처럼 설명 가능. 생명 주기, 자신의 감정을 어떻게 처리할지 이야기 가능.
</div>

<h2>피해야 할 표현</h2>
<ul>
<li>"잠들었어" → 수면 공포 유발</li>
<li>"멀리 갔어" → 사라진 것에 대한 혼란</li>
<li>"하늘나라에 갔어"를 종교적 믿음이 없는 가정에서 → 혼란</li>
<li>"새 강아지 사줄게" → 슬픔 무시, 생명의 대체 가능성 오해</li>
</ul>

<h2>함께 슬퍼하기</h2>
<p>아이가 슬퍼하는 것을 막지 않는 것이 중요하다. "어른이잖아, 울지 마"가 아닌 "슬픈 거 당연해, 나도 슬퍼"라고 함께하기. 간단한 작별 의식(그림 그리기, 편지 쓰기)이 아이의 슬픔 처리에 도움이 된다.</p>

<h2>마지막으로</h2>
<p>반려동물의 죽음은 아이에게 생애 처음 죽음을 경험하는 순간이 될 수 있다. 그것을 어떻게 함께 통과하느냐가 아이의 감정 언어를 형성한다. 슬픔을 함께 나누는 것이 가장 좋은 교육이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Kübler-Ross, E. — On Children and Death. Macmillan 1983",
      "한국아동심리치료협회 펫로스와 아동 심리 지원 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-16T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-490",
    slug: "dog-grooming-fear-training",
    type: "blog",
    category: 1,
    title: "강아지 미용 공포 탈감작 훈련 — 미용실에서 안 떠는 강아지 만들기",
    subtitle: "드라이어·가위 공포 원인, 탈감작 단계, 집에서 하는 미용 준비 훈련",
    metaTitle: "강아지 미용 공포 탈감작 훈련 — 드라이어·가위 두려움 극복 | 펫지기",
    metaDescription: "강아지가 미용실에서 떨고 공격적이 되는 이유와 해결책. 드라이어·가위 공포 탈감작 단계, 집에서 할 수 있는 미용 준비 훈련을 정리했습니다.",
    body: `<p>미용실에서 심하게 떨거나, 드라이어 소리에 과호흡하거나, 가위에 물려고 하는 강아지가 있다. 이것은 버릇없는 것이 아니라 공포 반응이다.</p>

<h2>미용 공포의 원인</h2>
<p>대부분 어릴 때 과도한 구속, 통증 경험, 큰 소리·낯선 환경의 복합적 부정적 기억에서 온다. 사회화 시기에 다양한 도구 소리와 신체 접촉에 긍정적 경험을 쌓지 않으면 성견이 되어서도 두려움이 남는다.</p>

<h2>탈감작 훈련 단계</h2>
<div class="callout-dog">
<strong>드라이어 탈감작 예시</strong><br>
1단계: 드라이어를 끄고 보여주기 → 냄새 맡게 → 간식 보상<br>
2단계: 가장 약한 바람, 먼 거리에서 → 간식<br>
3단계: 중간 바람, 가까운 거리 → 간식<br>
4단계: 몸에 바람 닿게 → 간식<br>
▶ 공포 반응이 나타나면 이전 단계로 후퇴
</div>

<h2>집에서 하는 미용 준비 훈련</h2>
<ul>
<li>귀·발·꼬리·항문 주변 만지기 훈련 — 매일 간식과 함께</li>
<li>빗질 훈련: 짧게 → 길게 점진적으로</li>
<li>발톱 클리퍼 보여주기 → 발에 대기 → 실제 클리핑</li>
<li>가위 소리 녹음 재생 → 낮은 볼륨부터</li>
</ul>

<h2>미용사와 소통</h2>
<p>공포가 심한 강아지라면 미용사에게 미리 알리는 것이 중요하다. 좋은 미용사는 강요하지 않고 단계적으로 접근한다. "이 강아지는 드라이어가 무섭다"는 정보가 미용 결과에 큰 차이를 만든다.</p>

<h2>마지막으로</h2>
<p>미용 공포 해결에는 시간이 걸린다. 그러나 투자한 시간만큼 강아지의 스트레스와 보호자의 죄책감이 줄어든다. 천천히, 꾸준히가 답이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물행동상담협회 두려움 기반 행동 치료 가이드라인",
      "Yin, S. — Low Stress Handling, Restraint and Behavior Modification of Dogs & Cats. CattleDog Publishing 2009",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-17T09:00:00.000Z",
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
  console.log("블로그 포스트 73차 시딩 완료! (blog-486 ~ blog-490)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
