import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 75 — cat1×2 + cat2×1 + cat3×1 + cat5×1 = 5편 (IDs 496-500)
// Macros: F, A, D, B, G
// Angles: RA6, RA4, RA1, RA7, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-496",
    slug: "dog-breed-lifestyle-matching",
    type: "blog",
    category: 1,
    title: "생활 방식에 맞는 견종 선택 — '귀여워서'가 평생의 실수가 되는 이유",
    subtitle: "운동량·훈련 난이도·털 관리·분리불안 성향 기준 견종 비교",
    metaTitle: "견종 선택 가이드 — 생활 방식별 맞는 강아지 비교 | 펫지기",
    metaDescription: "귀여워서만 선택한 견종이 평생의 후회가 되는 경우가 많습니다. 운동량·훈련 난이도·털 관리·분리불안 성향으로 견종을 비교하는 방법을 정리했습니다.",
    body: `<p>국내에서 가장 많이 포기되는 강아지 중 하나가 시베리안 허스키다. 외모에 반해 입양했지만, 하루 2시간 이상 운동이 필요하다는 것을 나중에 알게 된다. 견종 선택은 귀여움이 아닌 생활 방식 매칭이다.</p>

<h2>견종 선택 전 자기 점검</h2>
<ul>
<li>하루 운동 가능 시간: 30분? 1시간? 2시간?</li>
<li>혼자 있는 시간: 매일 몇 시간?</li>
<li>털 관리 의향: 매일 빗질 가능? 미용 주기?</li>
<li>훈련 경험: 초보자인가 경험자인가?</li>
<li>주거 환경: 아파트? 단독주택?</li>
</ul>

<h2>생활 방식별 견종 비교</h2>
<table>
<thead><tr><th>유형</th><th>맞는 견종</th><th>피해야 할 견종</th></tr></thead>
<tbody>
<tr><td>바쁜 직장인(운동 30분)</td><td>말티즈·비숑·시추</td><td>허스키·보더콜리·달마시안</td></tr>
<tr><td>활동적인 커플</td><td>래브라도·골든·웰시코기</td><td>퍼그·불독(운동 제한)</td></tr>
<tr><td>노약자 가정</td><td>포메·치와와·시추</td><td>저먼셰퍼드·대형견 전반</td></tr>
<tr><td>훈련 경험 있는 보호자</td><td>보더콜리·말리노이</td><td>초보자에게 불권장</td></tr>
</tbody>
</table>

<h2>분리불안 성향 주의 품종</h2>
<div class="callout-dog">
<strong>분리불안이 잦은 견종 (혼자 있는 시간 많다면 주의)</strong><br>
• 비글: 짖음 강함, 분리 스트레스 높음<br>
• 라브라도: 사람 의존도 매우 높음<br>
• 시바이누: 독립적이지만 초보 훈련에 어려움
</div>

<h2>마지막으로</h2>
<p>어떤 견종이 "최고"는 없다. 내 생활에 맞는 견종이 최고다. 입양 전 최소 2~3가지 품종의 실제 보호자 경험담을 찾아 읽어보는 것이 유튜브 영상 10개보다 더 도움이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Kennel Club — Dog Breed Selector",
      "한국동물복지협회 품종별 입양 적합성 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-20T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-497",
    slug: "second-cat-introduction-guide",
    type: "blog",
    category: 1,
    title: "두 번째 고양이 도입 — 첫 고양이가 새 고양이를 받아들이는 단계별 방법",
    subtitle: "격리 기간, 냄새 교환, 문을 통한 소통, 시각적 접촉, 완전 합사 기준",
    metaTitle: "두 번째 고양이 도입 — 기존 고양이와 합사 단계별 가이드 | 펫지기",
    metaDescription: "두 번째 고양이를 집에 들일 때 기존 고양이와 합사하는 방법. 격리 기간, 냄새 교환 훈련, 시각적 접촉, 완전 합사까지 단계별 가이드를 정리했습니다.",
    body: `<p>고양이는 영역 동물이다. 새 고양이를 갑자기 기존 고양이와 함께 두면 심각한 갈등이 생길 수 있다. 단계적 도입이 성공의 핵심이다.</p>

<h2>합사 실패의 흔한 원인</h2>
<ul>
<li>격리 없이 바로 합방</li>
<li>너무 빠른 대면</li>
<li>자원 부족 (밥그릇·화장실·잠자는 공간 부족)</li>
<li>기존 고양이의 스트레스 신호 무시</li>
</ul>

<h2>단계별 도입 프로토콜</h2>
<div class="callout-cat">
<strong>합사 단계 (최소 2~4주)</strong><br>
<strong>1단계 (1~7일): 완전 격리</strong><br>
새 고양이를 별도 방에. 각자 밥·물·화장실 제공. 접촉 없음.<br><br>
<strong>2단계 (3~7일): 냄새 교환</strong><br>
수건으로 각자 냄새를 묻혀 교환. 먹이와 함께 제공.<br><br>
<strong>3단계 (3~7일): 문 너머 소통</strong><br>
문 아래 틈으로 발 내밀기, 냄새 맡기.<br><br>
<strong>4단계 (3~7일): 시각적 접촉</strong><br>
문을 조금 열거나 베이비게이트 활용. 공격성 없으면 진행.<br><br>
<strong>5단계: 완전 합사</strong><br>
감시하에 짧은 합방, 점진적 시간 연장.
</div>

<h2>갈등 신호 인지</h2>
<ul>
<li>하악질·그로울링 → 정상 (너무 빠르게 진행하지 말 것)</li>
<li>심각한 공격·부상 → 단계 후퇴</li>
<li>기존 고양이의 식욕 감소·숨기 → 스트레스 심화 신호</li>
</ul>

<h2>마지막으로</h2>
<p>합사는 몇 주에서 몇 달이 걸릴 수 있다. 서두르면 반드시 갈등이 생긴다. 기존 고양이를 우선순위에 두고, 새 고양이가 천천히 자리를 잡도록 기다리는 것이 모두에게 가장 빠른 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Ellis, S.L.H. & Howell, T.J. — Introduction of Cats in Multicat Homes. J Feline Med Surg 2016",
      "한국고양이보호자연합 다묘 가정 입양 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-20T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-498",
    slug: "dog-calcium-phosphorus-diet",
    type: "blog",
    category: 2,
    title: "강아지 칼슘·인 균형 — 집밥 사료 보완 시 반드시 알아야 할 것",
    subtitle: "칼슘·인 비율 중요성, 닭고기·쌀밥만 먹이면 생기는 문제, 균형 맞추는 방법",
    metaTitle: "강아지 칼슘·인 균형 — 집밥 급여 시 영양 불균형 예방 | 펫지기",
    metaDescription: "강아지에게 집밥을 줄 때 가장 흔한 영양 불균형이 칼슘·인 불균형입니다. 올바른 칼슘·인 비율, 닭고기만 먹이면 생기는 문제, 균형 맞추는 방법을 정리했습니다.",
    body: `<p>"닭가슴살이 건강하다"는 것은 맞는 말이다. 그러나 닭가슴살만 먹이면 오히려 뼈 건강에 심각한 문제가 생길 수 있다.</p>

<h2>칼슘·인 비율이 왜 중요한가</h2>
<p>칼슘과 인은 뼈와 치아 형성에 함께 작용한다. 적정 비율은 1.2~1.4 : 1 (칼슘 : 인)이다. 비율이 깨지면 뼈 흡수 촉진, 구루병(강아지), 골격 기형(대형 성장기 강아지에서 심각)이 나타날 수 있다.</p>

<h2>닭고기만 먹이면 생기는 문제</h2>
<p>닭가슴살은 인이 높고 칼슘이 매우 낮은 식품이다. 닭고기 위주 식단을 장기간 유지하면 칼슘 부족·인 과다로 이어진다. 특히 성장기 강아지에서 골격 기형이 발생할 위험이 크다.</p>

<h2>균형 맞추는 방법</h2>
<div class="callout-dog">
<strong>집밥 칼슘 보충 방법</strong><br>
• 뼈째 식품 사용 (닭목뼈·닭등뼈 등) — 칼슘·인 자연 균형<br>
• 달걀껍질 분말 (1g = 약 380mg 칼슘) — 첨가 방식<br>
• 수의사 처방 칼슘 보충제<br>
• AAFCO 완전영양식 사료로 대부분을 커버하고 집밥은 10~20% 보완용으로만
</div>

<h2>집밥 식단 작성 권장</html2>
<p>집밥을 주식으로 제공하려면 수의 영양사 또는 수의사와 함께 처방 식단을 만드는 것이 가장 안전하다. "균형 잡힌 집밥"은 아무 재료나 섞는다고 되지 않는다.</p>

<h2>마지막으로</h2>
<p>집밥은 장점도 있지만, 영양 불균형 위험이 있다. 주식이 아닌 보완식으로 활용하고, 주식은 AAFCO 완전영양식 사료를 기준으로 하는 것이 현실적으로 가장 안전하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "National Research Council — Mineral Requirements of Dogs. Nutrient Requirements 2006",
      "한국수의영양학회 집밥 영양 균형 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-21T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-499",
    slug: "dog-tick-prevention-guide",
    type: "blog",
    category: 3,
    title: "강아지 진드기 예방 — 풀밭 산책 전 알아야 할 것",
    subtitle: "진드기 매개 질환(라임병·중증열성혈소판감소증), 예방약 종류, 진드기 발견 시 처리",
    metaTitle: "강아지 진드기 예방 — 라임병·SFTS·예방약 완전 가이드 | 펫지기",
    metaDescription: "강아지 진드기 예방 방법을 정리했습니다. 진드기 매개 라임병·SFTS 위험, 예방약 종류와 효과, 진드기 발견 시 안전하게 제거하는 방법을 알아보세요.",
    body: `<p>봄·가을 야외 산책 후 강아지 털에서 진드기를 발견하는 경우가 많다. 진드기는 단순히 불쾌한 것을 넘어 심각한 질환을 전파할 수 있다.</p>

<h2>진드기 매개 주요 질환</h2>
<ul>
<li><strong>라임병</strong>: 보렐리아균 감염, 관절·신경·심장 침범, 국내 발생 증가 추세</li>
<li><strong>중증열성혈소판감소증(SFTS)</strong>: 사람에게 치명적 (치사율 10~30%), 강아지는 보균 숙주</li>
<li><strong>아나플라스마증</strong>: 발열·식욕 감소·혈소판 감소</li>
<li><strong>에를리키아증</strong>: 발열·출혈 경향</li>
</ul>

<h2>진드기 예방약 종류</h2>
<div class="callout-dog">
<strong>진드기 예방 방법 비교</strong><br>
• <strong>경구 예방약(브라벡토·넥스가드 등)</strong>: 1~3개월 지속, 물에 씻겨도 효과 유지<br>
• <strong>국소도포형(프론트라인 등)</strong>: 월 1회, 목 뒤 피부 도포<br>
• <strong>진드기 구충 목걸이(세레스토 등)</strong>: 7~8개월 지속<br>
▶ 완전한 예방은 없음 — 예방약 + 귀가 후 검사 병행
</div>

<h2>진드기 발견 시 처리</h2>
<ul>
<li>알코올·불·바세린 사용 금지 (독소 주입 위험)</li>
<li>진드기 전용 핀셋 또는 뾰족한 핀셋으로 피부 가까이 잡아 수직으로 당김</li>
<li>비틀거나 짜지 않기</li>
<li>제거 후 손 씻기, 상처 소독</li>
<li>2~3주 내 발열·무기력·식욕 감소 발생 시 즉시 수의사 방문</li>
</ul>

<h2>마지막으로</h2>
<p>SFTS는 반려동물에서 사람으로 전파될 수 있다는 연구가 있다. 진드기 예방은 강아지만의 문제가 아니라 가족 전체의 건강 문제다. 봄·여름·가을 예방약 꾸준히 투약하는 것이 가장 확실한 예방이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "질병관리청 SFTS 매개체 감시 및 관리 지침 2023",
      "한국수의기생충학회 외부 기생충 예방 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-21T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-500",
    slug: "dog-playdate-setup-guide",
    type: "blog",
    category: 5,
    title: "강아지 플레이데이트 설계 — 좋은 만남과 나쁜 만남의 차이",
    subtitle: "플레이데이트 적합 강아지 조건, 만남 장소·시간 설계, 갈등 신호 인지, 마무리법",
    metaTitle: "강아지 플레이데이트 설계 — 성공적인 만남을 위한 가이드 | 펫지기",
    metaDescription: "강아지 플레이데이트를 성공적으로 설계하는 방법. 적합한 강아지 조건, 만남 장소·시간 설계, 갈등 신호 인지, 깔끔하게 마무리하는 방법을 정리했습니다.",
    body: `<p>강아지들이 잘 노는 모습을 보고 싶어 플레이데이트를 기획하지만, 잘못 설계하면 싸움이나 부상으로 끝날 수 있다.</p>

<h2>플레이데이트가 맞는 강아지</h2>
<ul>
<li>기본 사회화가 된 강아지</li>
<li>공격적 이력이 없는 강아지</li>
<li>비슷한 체급 (에너지 차이가 너무 크면 한쪽이 압도됨)</li>
<li>백신·구충이 완료된 강아지 (상대방 보호자에게도 확인)</li>
</ul>

<h2>만남 장소 설계</h2>
<div class="callout-dog">
<strong>좋은 플레이데이트 환경</strong><br>
• 중립 공간 (어느 쪽도 "내 구역"이 아닌 공원, 도그런)<br>
• 한쪽 강아지의 집은 피하기 — 영역 방어 본능 자극<br>
• 충분히 넓은 공간 — 탈출 경로 있어야 함<br>
• 첫 만남은 리드줄로, 익숙해지면 오프리드
</div>

<h2>갈등 신호 인지</h2>
<ul>
<li>꼬리를 높이 세우고 뻣뻣하게 움직임 → 긴장 신호</li>
<li>한 쪽이 계속 도망가는데 쫓아감 → 개입 필요</li>
<li>으르렁거림 → 경고 신호, 중단 고려</li>
<li>배를 드러냄·무릎 앉음 → 복종 신호, 계속 진행 가능</li>
</ul>

<h2>성공적인 마무리</h2>
<ul>
<li>강아지가 지치기 전에 끝내기 (에너지 충분할 때)</li>
<li>좋은 경험으로 끝나도록 간식·칭찬으로 마무리</li>
<li>귀가 후 충분한 휴식 시간 제공</li>
</ul>

<h2>마지막으로</h2>
<p>플레이데이트는 사회성 발달에 좋지만, 억지로 사교를 강요하지 않는 것도 중요하다. 일부 강아지는 다른 개보다 사람과 노는 것을 더 좋아한다. 강아지의 신호를 읽고 그 성향을 존중하는 것이 진정한 배려다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bekoff, M. — The Emotional Lives of Animals. New World Library 2007",
      "한국반려동물행동상담협회 개 간 상호작용 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-22T09:00:00.000Z",
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
  console.log("블로그 포스트 75차 시딩 완료! (blog-496 ~ blog-500)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
