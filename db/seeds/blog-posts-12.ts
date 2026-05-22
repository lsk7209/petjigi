import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

const NOW = new Date().toISOString();

function scheduleDate(index: number): string {
  const start = new Date("2026-05-22T10:00:00");
  const d = new Date(start.getTime() + index * 5 * 60 * 60 * 1000);
  return d.toISOString();
}

const BLOG_POSTS_12: NewContent[] = [
  // ── 111. 고양이 스트레스 신호 (cat5) ──
  {
    id: "blog-cat-stress-signals-guide",
    slug: "cat-stress-signals-guide",
    type: "blog",
    category: 5,
    title: "고양이 스트레스 신호 — 집사가 놓치기 쉬운 행동 10가지",
    metaTitle: "고양이 스트레스 신호 10가지 | 숨음·과그루밍·밥 안 먹음 | 펫지기",
    metaDescription: "고양이 스트레스 초기 신호 10가지와 원인. 숨기·과그루밍·식욕 감소·화장실 밖 배뇨·공격성 변화 구별법과 스트레스 줄이는 환경 관리.",
    body: `<p>고양이는 스트레스를 받아도 드러내지 않는 경향이 있다. 야생에서 약한 모습을 보이면 포식자의 표적이 되는 본능이 남아 있기 때문이다. 보호자가 신호를 알아채지 못하면 스트레스가 쌓여 건강 문제로 발전할 수 있다.</p>

<h2>고양이 스트레스 신호 10가지</h2>
<ol>
  <li><strong>평소보다 많이 숨거나 혼자 있으려 함</strong>: 익숙한 보호자를 피한다면 불안이나 통증 신호</li>
  <li><strong>과그루밍</strong>: 한 부위를 반복해서 핥아 탈모가 생긴다 — 강박적 그루밍</li>
  <li><strong>식욕 감소</strong>: 스트레스는 소화기에 직접 영향을 준다</li>
  <li><strong>화장실 밖 배뇨·배변</strong>: 스트레스성 FLUTD나 행동 문제</li>
  <li><strong>공격성 증가</strong>: 갑자기 물거나 할퀴는 빈도 증가</li>
  <li><strong>반복적인 구토</strong>: 스트레스가 소화기 증상을 유발하기도 함</li>
  <li><strong>발성 변화</strong>: 평소보다 많이 울거나 조용해짐</li>
  <li><strong>동공이 자주 크게 열림</strong>: 고긴장 상태의 신체 반응</li>
  <li><strong>그루밍 중단</strong>: 우울 또는 통증으로 자기 관리를 포기</li>
  <li><strong>소변·배변 양 변화</strong>: 다음증이나 변비가 스트레스와 연관될 수 있다</li>
</ol>

<h2>흔한 스트레스 원인</h2>
<ul>
  <li>환경 변화: 이사, 리모델링, 새 가구</li>
  <li>일상 변화: 보호자 스케줄 변화, 손님 방문</li>
  <li>새 가족 구성원: 새 반려동물, 아기 출생</li>
  <li>화장실 문제: 청결도 부족, 화장실 위치 변경</li>
  <li>다묘 갈등: 자원(음식·화장실·공간) 경쟁</li>
  <li>실외 스트레스: 창밖에서 보이는 낯선 고양이</li>
</ul>

<h2>스트레스 줄이는 환경 관리</h2>
<ul>
  <li>예측 가능한 루틴 유지 (식사·놀이 시간 일정하게)</li>
  <li>충분한 은신처 제공 (각 고양이마다 혼자 쉴 수 있는 공간)</li>
  <li>자원의 충분한 확보 (화장실·밥그릇: 고양이 수+1개)</li>
  <li>페로몬 디퓨저 활용 (펠리웨이 등)</li>
  <li>환경 풍요화로 지루함 해소 (<a href="/blog/cat-environmental-enrichment">환경 풍요화 가이드</a> 참고)</li>
</ul>

<h2>언제 동물병원에 가야 하나</h2>
<p>스트레스 신호가 2주 이상 지속되거나, 식욕·배뇨·배변에 변화가 있다면 먼저 신체 질환을 배제해야 한다. 행동 문제처럼 보이는 증상이 실제로는 통증이나 질환의 표현인 경우가 있기 때문이다. 행동 문제가 확인된 후에도 지속된다면 수의사 또는 동물행동전문가와 상담한다.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(80),
    authorName: "펫지기 에디터",
    sources: [
      "International Society of Feline Medicine (ISFM) — Feline Stress and Wellbeing",
      "American Association of Feline Practitioners (AAFP) — Feline Behavior Guidelines",
      "Cornell Feline Health Center — Stress in Cats",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 112. 강아지 하울링 가이드 (cat5) ──
  {
    id: "blog-dog-howling-guide",
    slug: "dog-howling-guide",
    type: "blog",
    category: 5,
    title: "강아지 하울링 — 원인별로 다른 해결 접근법",
    metaTitle: "강아지 하울링 원인과 줄이는 법 | 분리불안·소리·훈련 | 펫지기",
    metaDescription: "강아지 하울링 주요 원인(분리불안·소리 반응·의사소통)과 원인별 해결 방법. 분리불안 하울링 vs 소리 유발 하울링 구별, 훈련으로 줄이는 법.",
    body: `<p>강아지 하울링은 보호자가 직접 듣는 것보다 이웃이 먼저 알려주는 경우가 많다. 보호자가 없을 때 강아지가 얼마나 울고 있는지 모르는 경우가 많기 때문이다. 하울링은 강아지의 자연스러운 의사소통 방식이지만, 과도하면 이웃 갈등을 일으키고 강아지 스트레스의 지표이기도 하다.</p>

<h2>하울링의 주요 원인</h2>

<h3>분리불안</h3>
<p>보호자가 외출한 직후부터 하울링이 시작된다면 분리불안이 원인일 가능성이 높다. 분리불안은 훈련과 행동 수정이 필요한 상태로, <a href="/blog/dog-separation-anxiety">강아지 분리불안 가이드</a>에서 구체적인 대응법을 확인하자.</p>

<h3>소리에 대한 반응</h3>
<p>사이렌, 다른 개 짖음, 악기 소리에 반응해 하울링하는 것은 개의 자연스러운 의사소통 방식이다. 이 유형의 하울링은 일반적으로 소리가 사라지면 멈춘다. 소리 자체를 차단하거나, 특정 소리에 무반응을 유지할 때 보상을 주는 방식으로 줄일 수 있다.</p>

<h3>관심·욕구 표현</h3>
<p>배고픔, 놀아달라는 요구, 화장실을 가고 싶을 때 보호자의 반응을 유도하기 위한 하울링이다. 하울링할 때 반응하지 않고, 조용할 때 욕구를 충족시켜 주는 것이 원칙이다.</p>

<h3>신체적 불편·통증</h3>
<p>갑자기 하울링이 시작됐거나 특정 자세·움직임에서만 하울링한다면 통증 신호일 수 있다. 이 경우 동물병원 진찰이 필요하다.</p>

<h2>하울링 줄이는 훈련 원칙</h2>
<ul>
  <li>하울링할 때 반응하지 않는다 — 관심이 생길수록 강화된다</li>
  <li>조용한 순간을 포착해 즉시 칭찬·간식을 준다</li>
  <li>"조용히" 명령을 일관성 있게 가르친다: 짖으면 조용히 명령 → 2초 조용하면 보상, 점차 시간을 늘린다</li>
  <li>외출 전 충분한 운동으로 에너지를 소모시킨다</li>
</ul>

<h2>현실적인 이웃 관리</h2>
<p>훈련을 시작하기 전 이웃에게 먼저 알리고 양해를 구하는 것이 관계 유지에 도움이 된다. CCTV나 녹음 기기로 혼자 있을 때 강아지 상태를 확인하면 하울링 패턴과 원인을 파악하는 데 도움이 된다. 아파트 분쟁 예방에 대한 내용은 <a href="/blog/apartment-pet-dispute-guide">아파트 반려동물 분쟁 가이드</a>를 참고하자.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(81),
    authorName: "펫지기 에디터",
    sources: [
      "American Kennel Club (AKC) — Why Do Dogs Howl?",
      "American Veterinary Society of Animal Behavior (AVSAB) — Behavior Management",
      "WSAVA — Behavior and Mental Health Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 113. 고양이 식욕 부진 가이드 (cat5) ──
  {
    id: "blog-cat-appetite-loss-guide",
    slug: "cat-appetite-loss-guide",
    type: "blog",
    category: 5,
    title: "고양이 밥 안 먹을 때 — 원인과 식욕 돌리는 방법",
    metaTitle: "고양이 밥 안 먹음 원인 | 사료 거부·식욕 부진 해결법 | 펫지기",
    metaDescription: "고양이가 밥을 갑자기 안 먹을 때 원인(사료 교체·스트레스·질병)과 식욕을 돌리는 방법. 24시간 이상 식욕 부진 시 동물병원 가야 하는 이유.",
    body: `<p>고양이가 밥 앞에서 등을 돌린다. 처음엔 까다로운 입맛 탓이라고 생각하지만, 고양이는 24~48시간 이상 먹지 않으면 심각한 건강 문제(간지방증)가 시작될 수 있다. 식욕 부진의 원인을 파악하고 빠르게 대응하는 것이 중요하다.</p>

<h2>식욕 부진의 흔한 원인</h2>

<h3>사료 변화 또는 음식 거부</h3>
<p>갑작스러운 사료 교체, 새로운 맛·브랜드, 사료가 오래됐거나 산화된 경우. 고양이는 음식 변화에 매우 예민하다. 사료 교체는 7~14일에 걸쳐 서서히 해야 한다.</p>

<h3>스트레스</h3>
<p>이사, 새 동물, 낯선 방문객, 화장실 문제, 다묘 갈등 등 환경 스트레스가 식욕에 직접 영향을 준다.</p>

<h3>신체 질환</h3>
<p>치아 통증, 구내염, 호흡기 감염(코막힘으로 냄새를 못 맡아 식욕 감소), 위장 문제, 신장 질환, 갑상선 문제 등 다양한 질환이 원인이 된다. 특히 구강 통증은 식욕 부진의 주요 원인 중 하나다.</p>

<h3>불편한 식사 환경</h3>
<p>그릇이 너무 작거나 수염이 닿는 것을 싫어하는 수염 스트레스, 화장실·물그릇과 너무 가까운 위치, 다묘 가정에서 밥을 빼앗기는 상황 등이 원인이 될 수 있다.</p>

<h2>집에서 시도해 볼 것들</h2>
<ul>
  <li>사료를 미지근하게 데운다 (체온 정도 — 향이 올라와 식욕 자극)</li>
  <li>사료에 소량의 닭 육수(무염)나 참치 통조림 국물을 섞는다</li>
  <li>다른 질감 사료 시도 (건식을 먹던 경우 습식으로)</li>
  <li>그릇을 납작한 평접시로 교체 (수염 스트레스 해소)</li>
  <li>조용하고 안전한 식사 공간 마련</li>
</ul>

<h2>즉시 동물병원에 가야 하는 경우</h2>
<ul>
  <li>24시간 이상 전혀 먹지 않는 경우 — 특히 과체중 고양이는 12~24시간도 위험</li>
  <li>구토·설사를 동반한 식욕 부진</li>
  <li>무기력·침 흘림·황달(눈·잇몸이 노래짐)</li>
  <li>체중이 갑자기 빠지는 경우</li>
</ul>
<p>고양이 간지방증(지방간)은 72시간 이상 굶은 경우 시작될 수 있으며, 치료가 어려운 합병증이다. 식욕 부진을 가볍게 보지 말자. 고양이 구강 건강은 <a href="/blog/cat-dental-care">고양이 치아 관리 가이드</a>를 참고하자.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(82),
    authorName: "펫지기 에디터",
    sources: [
      "Cornell Feline Health Center — Why Won't My Cat Eat?",
      "American Association of Feline Practitioners (AAFP) — Hepatic Lipidosis",
      "WSAVA — Nutritional Assessment Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 114. 강아지 공포 관리 (cat5) ──
  {
    id: "blog-dog-fear-management",
    slug: "dog-fear-management",
    type: "blog",
    category: 5,
    title: "강아지 공포 반응 — 천둥·폭죽·낯선 것에 떠는 강아지 돕는 법",
    metaTitle: "강아지 공포 관리 | 천둥·폭죽·낯선 것 공포 줄이는 방법 | 펫지기",
    metaDescription: "강아지 천둥·폭죽 소리 공포와 낯선 자극에 대한 공포 반응 관리. 떨기·숨기·헐떡임 공포 신호 구별, 둔감화 훈련, 즉각 도움 방법.",
    body: `<p>천둥소리에 화장실로 숨거나, 설날·추석 폭죽 소리에 격렬히 떠는 강아지를 보면 보호자도 마음이 아프다. 공포는 강아지에게 실제 생리적 고통이다. 적절한 방법으로 돕는 것이 강아지의 삶의 질에 중요하다.</p>

<h2>공포 신호 알아보기</h2>
<ul>
  <li>떨기, 헐떡이기</li>
  <li>은신처로 숨거나 보호자에게 찰싹 붙으려 함</li>
  <li>꼬리를 다리 사이로 집어넣음</li>
  <li>귀를 뒤로 납작하게 눕힘</li>
  <li>침 흘림, 하품</li>
  <li>통제 안 되는 배변</li>
  <li>파괴적 행동 (탈출 시도, 물건 파괴)</li>
</ul>

<h2>즉각 도움 — 공포 상황에서 할 수 있는 것</h2>
<ul>
  <li>안전한 은신처를 제공한다 (이동장, 소파 아래, 침대 아래 등 강아지가 선택하는 곳)</li>
  <li>창문을 닫고 커튼을 쳐 소리·빛을 줄인다</li>
  <li>백색소음(선풍기, 클래식 음악)으로 외부 소리를 마스킹한다</li>
  <li>껴안아 달라고 한다면 안아줘도 된다 — 공포를 강화한다는 오래된 속설은 사실이 아니다</li>
  <li>평소처럼 침착하게 행동한다 — 과도하게 달래거나 걱정스러운 모습을 보이면 강아지가 더 불안해할 수 있다</li>
</ul>

<h2>불안 완화 도구</h2>
<ul>
  <li><strong>썬더셔츠(압박 조끼)</strong>: 전신 압박이 불안을 줄이는 효과. 일부 강아지에서 효과적이다.</li>
  <li><strong>DAP(개 진정 페로몬) 디퓨저</strong>: 개의 모성 페로몬을 모방한 합성 물질로 불안 완화 효과가 있다는 연구가 있다.</li>
  <li><strong>진정제·약물</strong>: 극심한 공포반응에는 수의사가 상황에 맞는 약물을 처방할 수 있다. 임의로 사람용 진정제 등을 투여하면 안 된다.</li>
</ul>

<h2>장기적 둔감화 훈련</h2>
<p>천둥소리를 녹음한 음원을 매우 낮은 볼륨으로 틀면서 간식이나 놀이를 연결한다. 며칠 후 볼륨을 조금씩 올린다. 강아지가 소리에 반응하지 않을 때 즉시 보상한다. 이 과정은 수 주에 걸쳐 서서히 진행한다 — 조급하게 볼륨을 높이면 역효과가 난다. <a href="/blog/dog-social-skills-training">강아지 사회성 훈련</a>의 둔감화 원칙과 동일하다.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(83),
    authorName: "펫지기 에디터",
    sources: [
      "American Veterinary Society of Animal Behavior (AVSAB) — Fear and Anxiety in Dogs",
      "American Kennel Club (AKC) — How to Help a Scared Dog",
      "WSAVA — Behavior and Mental Health Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 115. 강아지 켄넬 훈련 (cat5) ──
  {
    id: "blog-dog-crate-training-guide",
    slug: "dog-crate-training-guide",
    type: "blog",
    category: 5,
    title: "강아지 켄넬 훈련 — 이동장을 안전한 공간으로 만드는 법",
    metaTitle: "강아지 켄넬 훈련 방법 | 이동장 거부 해결·단계별 적응 | 펫지기",
    metaDescription: "강아지 켄넬(이동장) 훈련 단계별 방법. 크기 선택, 거부하는 강아지 적응시키기, 밤에 우는 새끼 강아지 대처, 켄넬을 안전한 쉼터로 만드는 원칙.",
    body: `<p>켄넬(이동장·크레이트)을 새끼 강아지 때 올바르게 소개하면 평생의 안전 쉼터가 된다. 동물병원 방문, 여행, 이동 시에도 스트레스가 줄어들고, 분리불안 예방에도 도움이 된다. 켄넬을 벌칙의 공간으로 사용하면 오히려 역효과가 난다.</p>

<h2>켄넬 크기 선택</h2>
<p>켄넬은 강아지가 서고, 돌고, 편안하게 누울 수 있는 크기가 적당하다. 너무 크면 안쪽 한 귀퉁이에서 배변하는 경우가 생겨 배변 훈련을 방해한다. 성장하는 강아지라면 성견 크기 켄넬에 칸막이를 넣어 점차 공간을 늘리는 방법이 경제적이다.</p>

<h2>단계별 적응 훈련</h2>
<ol>
  <li><strong>소개 단계</strong>: 문을 열어두고 켄넬 안에 간식과 좋아하는 장난감을 넣어둔다. 강아지가 스스로 들어가면 칭찬하고, 절대 강제로 밀어 넣지 않는다.</li>
  <li><strong>식사 단계</strong>: 켄넬 앞에서 밥을 주다가 점차 안쪽으로 옮긴다. 밥을 켄넬 안에서 먹게 되면 긍정적인 연상이 형성된다.</li>
  <li><strong>단시간 체류</strong>: 강아지가 들어가 있을 때 문을 살짝 닫고 1~2분 후 열어준다. 점차 시간을 늘린다.</li>
  <li><strong>보호자 존재 하 체류</strong>: 같은 방에 있으면서 켄넬 체류 시간을 30분까지 늘린다.</li>
  <li><strong>보호자 외출 체류</strong>: 이전 단계가 잘 됐을 때 짧은 외출부터 시작한다.</li>
</ol>

<h2>새끼 강아지가 밤에 우는 경우</h2>
<p>처음 며칠은 낑낑거리는 것이 정상이다. 켄넬을 침대 옆에 두고 손을 뻗어 댈 수 있게 하면 안정감을 준다. 울 때마다 꺼내주면 "울면 나온다"는 학습이 생기므로, 울음이 잠깐 멈추는 순간에 조용히 문을 열어준다. 첫 2~3주가 지나면 대부분 적응한다.</p>

<h2>켄넬 훈련 원칙 — 하지 말아야 할 것</h2>
<ul>
  <li>벌로 강제로 넣기</li>
  <li>너무 오랜 시간 가두기 (성견 기준 최대 4~5시간, 새끼 강아지는 더 짧게)</li>
  <li>켄넬 안에서 먹이를 주다가 식사 시간이 아닐 때 가두기</li>
  <li>강아지가 켄넬을 싫어하는데 훈련 없이 억지로 이동 시 사용하기</li>
</ul>
<p>켄넬 훈련은 분리불안 예방과도 연결된다. <a href="/blog/dog-separation-anxiety">강아지 분리불안 가이드</a>도 함께 읽어보자.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(84),
    authorName: "펫지기 에디터",
    sources: [
      "American Kennel Club (AKC) — Crate Training Guide",
      "American Humane — Crate Training Your Dog",
      "American Veterinary Society of Animal Behavior (AVSAB) — Puppy Training Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 116. 강아지 사회적 공격성 (cat5) ──
  {
    id: "blog-dog-social-aggression-guide",
    slug: "dog-social-aggression-guide",
    type: "blog",
    category: 5,
    title: "강아지 공격성 — 원인 이해와 보호자가 할 수 있는 관리",
    metaTitle: "강아지 공격성 원인과 관리 | 으르렁·물기·공포성 공격성 | 펫지기",
    metaDescription: "강아지 공격성 유형(공포성·자원 보호·영역성)과 원인, 보호자가 할 수 있는 안전한 관리. 으르렁을 혼내면 안 되는 이유, 전문가 도움이 필요한 시점.",
    body: `<p>강아지가 으르렁거리거나 무는 행동은 보호자를 당황하게 만든다. 많은 보호자가 즉시 혼내야 한다고 생각하지만, 공격성의 원인을 이해하지 않고 억압하면 오히려 더 위험한 상황이 생길 수 있다.</p>

<h2>으르렁거리는 것을 혼내면 안 되는 이유</h2>
<p>으르렁거림은 강아지가 불편함을 전달하는 경고 신호다. 이 신호를 억압하면 강아지는 경고 없이 무는 방향으로 행동이 바뀔 수 있다. 미국수의동물행동학회(AVSAB)는 "으르렁거림은 처벌하지 않는다 — 원인을 찾는 것이 우선"이라고 밝힌다.</p>

<h2>공격성의 주요 유형</h2>

<h3>공포성 공격성</h3>
<p>가장 흔한 유형. 두려운 상황에서 "도망칠 수 없다"고 느낄 때 공격으로 반응한다. 귀를 뒤로 눕히고, 꼬리를 내리고 낮은 자세에서 나오는 공격이 특징이다. 충분한 사회화가 예방의 핵심이다.</p>

<h3>자원 보호(Resource Guarding)</h3>
<p>밥그릇, 장난감, 쉬는 자리 등 가치 있는 자원을 지키기 위한 공격성이다. 강아지가 자원 근처에서 몸을 경직시키거나 낮게 으르렁거리는 것이 신호다. 자원에 접근할 때 간식을 줘서 "사람이 오면 좋은 것이 온다"는 학습으로 개선할 수 있다.</p>

<h3>통증 유발 공격성</h3>
<p>통증이 있는 부위를 건드렸을 때 반응하는 공격이다. 평소 온순한 강아지가 특정 신체 부위를 건드릴 때 갑자기 공격한다면 통증 또는 질환을 먼저 확인한다. 동물병원 검진이 먼저다.</p>

<h2>보호자가 할 수 있는 관리</h2>
<ul>
  <li>공격 상황을 미리 피한다 (공격 유발 자극 제거)</li>
  <li>강아지가 불편한 상황에 강제로 노출하지 않는다</li>
  <li>으르렁거릴 때 혼내지 않고 상황에서 안전하게 벗어난다</li>
  <li>긍정 강화 훈련으로 신뢰를 쌓는다</li>
</ul>

<h2>전문가 도움이 필요한 시점</h2>
<p>공격 빈도가 늘거나, 경고 없이 문다거나, 보호자·가족을 향한 공격이라면 반드시 동물행동전문가 또는 AVSAB 인증 수의 행동 전문의와 상담이 필요하다. 신체적 처벌(때리기, 전기충격)은 공격성을 악화시키는 것으로 연구에서 일관되게 나타난다. <a href="/blog/dog-social-skills-training">강아지 사회성 훈련</a>도 함께 참고하자.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(85),
    authorName: "펫지기 에디터",
    sources: [
      "American Veterinary Society of Animal Behavior (AVSAB) — Dog Aggression Position Statement",
      "American Kennel Club (AKC) — Understanding Dog Aggression",
      "WSAVA — Behavior and Mental Health Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 117. 고양이 클리커 훈련 (cat5) ──
  {
    id: "blog-cat-clicker-training-guide",
    slug: "cat-clicker-training-guide",
    type: "blog",
    category: 5,
    title: "고양이 클리커 훈련 — 고양이도 훈련이 가능하다",
    metaTitle: "고양이 클리커 훈련 방법 | 앉아·하이파이브·약 먹이기 응용 | 펫지기",
    metaDescription: "고양이 클리커 훈련 기초부터 실전 응용까지. 클리커 원리, 첫 번째 단계(클리커 연결), 앉아·하이파이브 훈련법, 훈련을 약 먹이기·스트레스 줄이기에 활용.",
    body: `<p>"고양이는 훈련이 안 된다"는 말은 잘못된 상식이다. 고양이는 강아지보다 독립적이고 동기 부여 방식이 다를 뿐, 훈련이 충분히 가능하다. 클리커 훈련은 고양이의 자발적 행동을 강화하는 가장 효과적인 방법이다.</p>

<h2>클리커 훈련의 원리</h2>
<p>클리커는 짧고 일관된 "딸깍" 소리를 내는 도구다. 이 소리를 "보상이 온다"는 신호로 학습시켜, 고양이가 올바른 행동을 했을 때 정확한 타이밍에 신호를 보내 보상을 예고한다. 사람의 칭찬보다 일관성이 높고, 타이밍이 정확해 학습 속도가 빠르다.</p>

<h2>1단계 — 클리커와 간식 연결하기</h2>
<p>클리커를 "딸깍" 하고 즉시 간식을 준다. 이것을 10~15회 반복한다. 고양이가 클리커 소리에 기대하는 눈빛을 보이면 준비가 된 것이다. 간식은 고양이가 매우 좋아하는 것(참치, 닭가슴살 소량)으로 시작한다.</p>

<h2>2단계 — 간단한 행동 훈련</h2>

<h3>앉아 훈련</h3>
<p>고양이가 자연스럽게 앉을 때 즉시 클리커를 누르고 간식을 준다. 앉는 순간을 포착해 보상을 반복하면 앉는 행동과 클리커 소리가 연결된다. "앉아" 명령어를 행동 직전에 추가하면 명령어 훈련이 된다.</p>

<h3>하이파이브</h3>
<p>손바닥을 고양이 앞에 내밀면 고양이가 발로 건드리는 순간 클리커+간식. 점차 손을 높이 들고 발을 더 올려야 닿도록 유도한다.</p>

<h2>훈련 시 주의사항</h2>
<ul>
  <li>훈련 시간은 1회 5~10분 이내로 짧게 (고양이 집중 시간 한계)</li>
  <li>고양이가 훈련을 원하지 않으면 강제하지 않는다</li>
  <li>실패해도 절대 벌을 주지 않는다</li>
  <li>간식 칼로리를 하루 총량의 10% 이내로 조절한다</li>
</ul>

<h2>클리커 훈련의 실용적 응용</h2>
<p>클리커 훈련은 단순한 재주를 가르치는 것을 넘어 실용적으로 활용된다:</p>
<ul>
  <li>동물병원 방문 시 이동장 들어가기 훈련</li>
  <li>약 먹이기 거부 개선</li>
  <li>발톱 손질·빗질 거부 완화</li>
  <li>스트레스 상황에서 이동하게 하기</li>
</ul>
<p>간식 선택에 대해서는 <a href="/blog/cat-treats-guide">고양이 간식 선택 가이드</a>를 참고하자.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(86),
    authorName: "펫지기 에디터",
    sources: [
      "American Association of Feline Practitioners (AAFP) — Feline Training Guidelines",
      "Karen Pryor Clicker Training — Training Cats",
      "Cornell Feline Health Center — Understanding Cat Behavior",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 118. 강아지 수영 가이드 (cat5) ──
  {
    id: "blog-dog-swimming-guide",
    slug: "dog-swimming-guide",
    type: "blog",
    category: 5,
    title: "강아지 수영 — 처음 물에 데려가는 법과 안전 수칙",
    metaTitle: "강아지 수영 방법·안전 수칙 | 처음 물 적응·익사 예방 | 펫지기",
    metaDescription: "강아지 수영 처음 시작하는 법과 안전 수칙. 물을 무서워하는 강아지 적응법, 강아지 구명조끼 필요성, 수영 후 귀·피부 관리, 피해야 할 장소.",
    body: `<p>수영은 강아지에게 관절에 부담 없이 근육을 강화할 수 있는 최고의 운동이다. 특히 관절염이 있는 강아지, 노령견, 재활 중인 강아지에게 수중 운동은 수의사들이 권장하는 방법이다. 하지만 모든 강아지가 본능적으로 헤엄치는 것은 아니다.</p>

<h2>수영을 못 하거나 어려운 강아지</h2>
<p>불독, 퍼그, 도베르만, 복서 등 짧은 다리 또는 무거운 체형의 강아지는 수영이 어렵거나 매우 빨리 지친다. 이 품종들에게는 반드시 구명조끼를 착용시키고 보호자가 곁에서 지원해야 한다.</p>

<h2>처음 물에 데려가는 법</h2>
<ol>
  <li>얕은 물에서 시작한다 (발목~무릎 깊이). 강아지가 자신감을 갖게 한다.</li>
  <li>강제로 물에 던지거나 밀지 않는다 — 물에 대한 공포를 심어줄 수 있다.</li>
  <li>보호자가 먼저 물에 들어가 강아지를 초대한다.</li>
  <li>물을 좋아하는 다른 강아지가 있으면 함께 입수하면 효과적이다.</li>
  <li>물속에서 좋아하는 장난감을 던져 관심을 유도한다.</li>
  <li>처음엔 짧은 시간만 — 피로나 스트레스 전에 긍정적으로 마무리한다.</li>
</ol>

<h2>구명조끼 — 필요한 강아지</h2>
<ul>
  <li>수영을 처음 배우는 모든 강아지</li>
  <li>수영이 어려운 체형 품종</li>
  <li>파도가 있는 바다, 강한 조류가 있는 강</li>
  <li>보트 탑승 시</li>
  <li>노령견, 장애가 있는 강아지</li>
</ul>

<h2>피해야 할 장소</h2>
<ul>
  <li>조류가 강하거나 깊이를 알 수 없는 강·바다</li>
  <li>조류(녹조·청조) 발생 구역 — 독소가 강아지에게 치명적</li>
  <li>수질 오염 의심 지역</li>
  <li>반려동물 출입 금지 구역</li>
</ul>

<h2>수영 후 관리</h2>
<ul>
  <li>귀를 충분히 건조시킨다 — 물이 귀에 남으면 외이염 위험이 높아진다</li>
  <li>깨끗한 물로 헹궈 염소·소금·조류 제거</li>
  <li>완전히 말린다 — 습기가 피부 트러블 원인</li>
</ul>
<p>수영을 포함한 강아지 운동과 산책에 대한 더 많은 정보는 <a href="/blog/dog-walk-guide">강아지 산책 완전 가이드</a>를 참고하자.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(87),
    authorName: "펫지기 에디터",
    sources: [
      "American Kennel Club (AKC) — Dog Swimming Safety",
      "AVMA — Water Safety for Pets",
      "WSAVA — Preventive Healthcare and Exercise Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 119. 고양이 문제 행동 가이드 (cat5) ──
  {
    id: "blog-cat-problem-behavior-guide",
    slug: "cat-problem-behavior-guide",
    type: "blog",
    category: 5,
    title: "고양이 문제 행동 TOP 5 — 보호자를 힘들게 하는 것들의 해결책",
    metaTitle: "고양이 문제 행동 해결 | 새벽 울음·물기·가구 파괴·화장실 밖 배변 | 펫지기",
    metaDescription: "고양이 보호자가 가장 많이 겪는 문제 행동 5가지 원인과 해결법. 새벽 울음·물고 할퀴기·가구 긁기·화장실 밖 배변·무분별한 점프 관리.",
    body: `<p>고양이와 함께 사는 것은 즐겁지만, 특정 행동이 보호자를 지치게 만들기도 한다. 고양이의 "문제 행동"은 대부분 본능적 욕구가 충족되지 않거나, 스트레스, 또는 의학적 원인에서 비롯된다. 원인을 알면 해결책이 보인다.</p>

<h2>1. 새벽 울음 · 새벽 활동</h2>
<p>황혼과 새벽 활동성이 높은 고양이의 본능이다. 해결책: 자기 전 격렬한 사냥 놀이(15~20분) → 식사 → 수면 루틴을 만든다. 자동 급식기로 새벽 식사를 자동화한다. 반응하면 습관이 강화되므로, 울어도 일어나지 않는 것이 핵심이다. 장기적으로는 낮 동안 환경 자극을 풍부하게 해 낮에 더 활동하게 한다.</p>

<h2>2. 물기 · 할퀴기</h2>
<p>플레이 어그레션(놀이성 공격)이 대부분이다. 손을 장난감처럼 흔들면 고양이는 실제 사냥감으로 인식한다. 해결책: 손으로 직접 놀지 않는다. 모든 놀이는 낚싯대·완드 장난감으로 한다. 물기 시작하면 놀이를 즉시 중단하고 자리를 피한다. <a href="/blog/cat-environmental-enrichment">환경 풍요화</a>로 사냥 욕구를 충분히 채운다.</p>

<h2>3. 가구 긁기</h2>
<p>영역 표시와 발톱 관리, 스트레칭의 본능적 욕구다. 해결책: 고양이가 주로 긁는 가구 바로 옆에 스크래처를 둔다. 선호 소재(사이잘삼, 카펫, 골판지)와 방향(수직·수평)을 파악해 제공한다. 현재 긁는 가구에는 양면테이프를 임시로 붙인다. 절대 긁기 자체를 막으려 하지 않는다.</p>

<h2>4. 화장실 밖 배변</h2>
<p>원인 파악이 먼저다. ① 화장실이 더럽다 → 하루 2회 청소 ② 화장실 위치·모래가 싫다 → 위치 변경, 모래 교체 시도 ③ 다묘 갈등 → 고양이 수+1개 화장실 ④ 의학적 원인 → FLUTD, 변비 가능성으로 동물병원 방문. 화장실 문제의 70% 이상이 화장실 관리 문제에서 비롯된다.</p>

<h2>5. 무분별한 점프 · 카운터 서핑</h2>
<p>고양이가 원래 높은 곳을 좋아하는 것은 본능이다. 식탁이나 주방 조리대에 올라오는 것이 문제라면: 그 높이보다 더 매력적인 허가 공간(캣타워, 선반)을 제공한다. 올라가지 말아야 할 곳에는 시트지나 알루미늄 포일을 임시로 덮는다 — 발바닥 느낌이 싫어서 피하게 된다. 음식물을 조리대 위에 두지 않으면 동기 자체가 줄어든다.</p>

<p>문제 행동이 갑자기 나타났거나 의학적 원인이 의심된다면 동물병원을 먼저 방문한다. 행동 문제의 이면에 통증이나 질환이 있는 경우가 있다. 스트레스 신호는 <a href="/blog/cat-stress-signals-guide">고양이 스트레스 신호 가이드</a>를 함께 참고하자.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(88),
    authorName: "펫지기 에디터",
    sources: [
      "American Association of Feline Practitioners (AAFP) — Feline Behavior Guidelines",
      "International Society of Feline Medicine (ISFM) — Problem Behavior Management",
      "Cornell Feline Health Center — Cat Behavior and Training",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 120. 강아지 아파트 생활 가이드 (cat5) ──
  {
    id: "blog-dog-apartment-living-guide",
    slug: "dog-apartment-living-guide",
    type: "blog",
    category: 5,
    title: "아파트에서 강아지 키우기 — 실내 생활 행복하게 만드는 법",
    metaTitle: "아파트 강아지 키우기 | 실내 운동·소음·층간 문제 관리 | 펫지기",
    metaDescription: "아파트에서 강아지 행복하게 키우는 법. 좁은 공간 운동 해결법, 층간 소음 예방, 이웃 배려, 아파트에 적합한 견종 특성, 엘리베이터 에티켓.",
    body: `<p>아파트에서 강아지를 키우는 것이 가능한지 묻는 사람들이 있다. 가능하다. 다만 강아지의 욕구를 충족시키는 방식이 달라야 한다. 넓은 마당 대신 규칙적인 산책과 실내 자극으로 강아지를 충분히 행복하게 할 수 있다.</p>

<h2>아파트에 잘 맞는 강아지 특성</h2>
<p>작은 공간에서 잘 사는 강아지의 공통점은 "크기"가 아니라 "에너지 레벨"이다. 소형견도 에너지가 넘치는 품종(잭 러셀 테리어, 비글)은 아파트에서 힘들 수 있고, 대형견이라도 차분한 품종(그레이트 데인, 불마스티프)은 의외로 실내 생활에 잘 적응한다. 중요한 것은 개별 강아지의 성격이다.</p>

<h2>운동 욕구 충족 — 규칙적 산책이 핵심</h2>
<p>아파트 강아지에게 산책은 선택이 아닌 필수다. 하루 2회, 총 45분~1시간 이상의 산책으로 신체 운동과 후각 자극을 동시에 충족한다. 날씨가 나쁜 날은 실내 운동으로 대체한다:</p>
<ul>
  <li>계단 오르내리기 (관절이 건강한 강아지에 한해)</li>
  <li>실내 숨바꼭질 (강아지 이름 부르며 찾기)</li>
  <li>터그 놀이</li>
  <li>퍼즐 피더, 냄새 찾기 게임</li>
</ul>

<h2>층간 소음 예방</h2>
<ul>
  <li>미끄럼 방지 매트와 카펫으로 발소리·뛰는 소리 감소</li>
  <li>강아지 발 패드에 논슬립 양말 착용 (미끄러짐 + 소음 동시 해결)</li>
  <li>강아지 점프를 최소화하는 환경 (소파·침대에 경사로 제공)</li>
  <li>짖음 훈련으로 불필요한 짖음 줄이기</li>
</ul>

<h2>엘리베이터·공용 공간 에티켓</h2>
<ul>
  <li>엘리베이터에 사람이 있으면 다음 엘리베이터를 기다리거나 계단 이용</li>
  <li>복도·계단에서는 짧은 리드줄로 통제</li>
  <li>이웃을 만났을 때 강아지가 달려가지 않도록 앉혀두기</li>
  <li>배변은 반드시 즉시 처리</li>
</ul>

<h2>혼자 있는 시간 관리</h2>
<p>직장인 보호자라면 하루 8~10시간 혼자 있는 경우가 있다. 강아지 CCTV로 상태를 확인하고, 필요하다면 반려동물 데이케어를 활용한다. 분리불안이 있다면 <a href="/blog/dog-separation-anxiety">강아지 분리불안 가이드</a>를 참고하자. 켄넬 훈련이 혼자 있는 시간을 안전하게 관리하는 데 도움이 된다. <a href="/blog/dog-crate-training-guide">강아지 켄넬 훈련 가이드</a>도 함께 읽어보자.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(89),
    authorName: "펫지기 에디터",
    sources: [
      "American Kennel Club (AKC) — Apartment Dogs Guide",
      "AVMA — Responsible Pet Ownership",
      "WSAVA — Preventive Healthcare Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },
];

async function seed() {
  console.log("블로그 포스트 12차 시딩 시작...");
  for (const post of BLOG_POSTS_12) {
    await db.insert(contents).values(post).onConflictDoNothing();
    console.log(`✅ ${post.slug}`);
  }
  console.log("블로그 포스트 12차 시딩 완료!");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
