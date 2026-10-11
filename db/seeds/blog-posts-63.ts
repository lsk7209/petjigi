import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 63 — cat1×2 + cat2×1 + cat3×1 + cat5×1 = 5편 (IDs 436-440)
// Macros: F, B, A, E, F
// Angles: RA4, RA1, RA5, RA3, RA7

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-436",
    slug: "dog-crate-training-step-by-step",
    type: "blog",
    category: 1,
    title: "강아지 크레이트(케이지) 훈련 — 감옥이 아닌 안전 공간으로 만드는 법",
    subtitle: "크레이트를 좋아하게 만드는 단계별 훈련, 올바른 크기 선택, 사용 시간 기준",
    metaTitle: "강아지 크레이트 훈련 — 단계별 긍정 연상 완전 가이드 | 펫지기",
    metaDescription: "강아지 크레이트를 안전 공간으로 만드는 단계별 훈련 방법. 올바른 크기 선택, 시간 기준, 부정 연상을 피하는 방법을 정리했습니다.",
    body: `<p>크레이트(케이지) 훈련은 강아지에게 안전하고 편안한 개인 공간을 만들어 주는 훈련이다. 핵심은 처음부터 문을 닫아 두는 것이 아니라, 크레이트를 좋은 경험과 연결하는 것이다.</p>

<h2>단계별 진행</h2>
<table>
<thead><tr><th>단계</th><th>할 일</th></tr></thead>
<tbody>
<tr><td>1. 익숙해지기</td><td>문을 열어 둔 크레이트를 거실에 두고 담요와 장난감을 넣어 둔다</td></tr>
<tr><td>2. 들어가 보기</td><td>간식을 입구 근처에 두었다가 점점 안쪽에 둔다. 스스로 들어가면 칭찬한다</td></tr>
<tr><td>3. 문 닫아 보기</td><td>식사를 크레이트 안에서 먹이고 식사 뒤 문을 잠깐 닫는다. 점점 시간을 늘린다</td></tr>
<tr><td>4. 시간 늘리기</td><td>짧은 휴식부터 시작해 천천히 늘린다. 보호자가 곁에 있다가 방을 잠깐 나가는 것으로 확장한다</td></tr>
<tr><td>5. 자발적 입장</td><td>"하우스" 같은 신호를 붙여 스스로 들어가게 한다</td></tr>
<tr><td>6. 좋은 장소로 유지</td><td>간식이 들어 있는 장난감을 줘서 크레이트 시간을 즐겁게 만든다</td></tr>
</tbody>
</table>
<p>AKC는 이 과정을 단계적으로 쌓아 가라고 설명한다. 걸리는 시간은 개의 성격과 과거 경험에 따라 하루에서 몇 달까지 다르다고 하고, VCA는 강아지가 대체로 1~2개월 안에 익숙해진다고 안내한다.</p>

<div class="callout-dog">
<strong>하지 말아야 할 것</strong><br>
• 크레이트를 벌로 사용하기 — 훈련이 크게 후퇴할 수 있다<br>
• 문을 세게 닫거나 큰 소리를 내기<br>
• 울거나 짖을 때마다 바로 꺼내 주기 (진정되기를 기다렸다가 꺼내는 편이 좋다. 다만 배변 신호나 심한 공황은 구분해서 판단)<br>
• 너무 오랜 시간 가두기
</div>

<h2>얼마나 오래 있어도 되나</h2>
<ul>
<li>어린 강아지는 오래 참을 수 없다. 휴먼 소사이어티(HSUS)는 6개월 미만 강아지를 한 번에 3~4시간 넘게 가두지 말라고 안내한다.</li>
<li>VCA는 6개월 무렵까지는 밤새 크레이트에 있는 것을 불편해할 수 있다고 설명한다.</li>
<li>성견도 하루 대부분을 크레이트에 두지 않는다. 운동, 배변, 교감 시간이 충분해야 한다.</li>
</ul>

<h2>문제가 계속되면</h2>
<p>크레이트에서 심하게 짖고 침을 흘리고 발버둥치거나 탈출하려다 다친다면 분리불안이나 공포가 원인일 수 있다. 억지로 계속하지 말고 수의사나 행동 전문가와 상담한다.</p>

<h2>마지막으로</h2>
<p>크레이트는 가두는 곳이 아니라 쉬는 곳이어야 한다. 조급하게 늘리지 않고 좋은 경험을 쌓으면 이동, 병원 방문, 여행에서도 큰 도움이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.akc.org/expert-advice/training/crate-training-step-by-step/ — AKC, Safe and Stress-Free Crate Training: A Step-by-Step Guide",
      "https://www.humanesociety.org/resources/crate-training-101 — Humane Society of the United States, How to Crate Train Your Dog or Puppy",
      "https://vcahospitals.com/know-your-pet/crate-training-your-dog---an-overview — VCA, Life Skills for Pets: Crate Training and Confinement for Puppies and Dogs",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-21T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-437",
    slug: "second-cat-right-timing",
    type: "blog",
    category: 1,
    title: "두 번째 고양이를 맞이하는 적절한 시기 — 서두르면 둘 다 불행해진다",
    subtitle: "첫 번째 고양이 안정화 기간, 나이·성격 조합 고려, 합사 준비 체크리스트",
    metaTitle: "두 번째 고양이 맞이하는 시기 — 준비 체크리스트 | 펫지기",
    metaDescription: "두 번째 고양이를 입양하는 적절한 시기와 준비사항. 첫 고양이 안정화 기간, 나이·성격 조합, 합사 준비 체크리스트를 정리했습니다.",
    body: `<p>고양이를 한 마리 더 데려오고 싶을 때 가장 중요한 것은 "언제"보다 "어떻게 소개하느냐"다. 서두르면 기존 고양이와 새 고양이가 모두 스트레스를 받고, 이후 관계가 오래 나빠질 수 있다.</p>

<h2>둘째를 들이기 전에 점검할 것</h2>
<ul>
<li><strong>기존 고양이의 성격</strong>: 사교적이고 다른 고양이와 잘 지낸 경험이 있는지. 겁이 많거나 영역 의식이 강하면 더 천천히 진행한다.</li>
<li><strong>공간</strong>: 새 고양이가 한동안 지낼 별도의 방, 그리고 두 마리가 피할 수 있는 여분의 공간이 있는지.</li>
<li><strong>자원</strong>: 화장실, 밥그릇, 물그릇, 휴식 장소를 늘릴 수 있는지.</li>
<li><strong>건강</strong>: 새 고양이의 건강검진과 필요한 검사(전염병 등)를 받았는지. 고양이 백혈병·면역결핍 검사는 합사 전에 하는 것이 일반적이다.</li>
<li><strong>시간과 비용</strong>: 진료비와 관리 시간이 늘어난다.</li>
</ul>

<h2>소개 과정 (단계별)</h2>
<table>
<thead><tr><th>단계</th><th>할 일</th><th>다음 단계 조건</th></tr></thead>
<tbody>
<tr><td>1. 분리</td><td>새 고양이를 기존 고양이가 쓰지 않는 방에 두고 적응시킨다. 각자 화장실·밥그릇·잠자리를 쓴다</td><td>새 고양이가 편안히 먹고 쉬며 화장실을 쓴다 (며칠~1~2주 이상)</td></tr>
<tr><td>2. 냄새 교환</td><td>담요나 장난감을 서로 바꿔 주고, 방을 번갈아 탐색하게 한다. 문 양쪽에서 밥을 먹게 해 냄새를 좋은 경험과 연결한다</td><td>서로의 냄새에 흥분하거나 하악질을 하지 않는다</td></tr>
<tr><td>3. 시각 접촉</td><td>문을 살짝 열거나 아기 문(게이트)을 통해 잠깐씩 서로 보게 한다. 간식·놀이로 긍정적으로 연결한다</td><td>두 마리가 느긋한 모습을 보인다</td></tr>
<tr><td>4. 감독하의 만남</td><td>짧은 시간 같이 둔다. 끝나면 다시 분리한다</td><td>싸움 없이 무심하게 지낸다</td></tr>
<tr><td>5. 자유 접촉</td><td>처음에는 몇 분만 감독 없이 두고 점차 늘린다</td><td>수 주에 걸쳐 안정</td></tr>
</tbody>
</table>
<p>소개에 걸리는 시간은 며칠에서 몇 달까지 다양하다. 하악질이나 때리기가 나타나면 마지막으로 잘 되었던 단계로 돌아가 속도를 늦춘다. 어떤 성묘는 다른 성묘를 끝내 받아들이지 못하기도 한다.</p>

<div class="callout-cat">
<strong>이런 경우는 전문가 상담</strong><br>
• 한 마리가 계속 숨거나 먹지 않음<br>
• 지속적인 공격, 상처가 날 정도의 싸움<br>
• 화장실 실수, 소변 마킹이 생김<br>
→ 수의사와 행동 전문가에게 문의한다. 스트레스로 방광염 등 질환이 올 수 있다.
</div>

<h2>마지막으로</h2>
<p>둘째를 맞이하는 "적절한 시기"는 날짜가 아니라 준비된 공간과 천천히 진행할 마음이 있을 때다. 단계마다 두 마리가 편안한지 확인하고, 급하게 합치지 말자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://icatcare.org/articles/introducing-cats — International Cat Care, Introducing Cats",
      "https://vcahospitals.com/know-your-pet/introducing-new-adult-cats — VCA, Introducing New Adult Cats",
      "https://www.aspca.org/pet-care/cat-care/common-cat-behavior-issues/aggression-between-cats-your-household — ASPCA, Aggression Between Cats in Your Household",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-21T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-438",
    slug: "dog-safe-fish-guide",
    type: "blog",
    category: 2,
    title: "강아지에게 줄 수 있는 생선 — 안전한 것과 주의할 것",
    subtitle: "연어·고등어·정어리 vs 참치·날생선 비교, 뼈 위험, 조리 방법",
    metaTitle: "강아지 생선 급여 — 안전한 생선과 주의할 것 가이드 | 펫지기",
    metaDescription: "강아지에게 줄 수 있는 생선과 주의할 생선. 연어·고등어·정어리 효능, 참치 중금속 위험, 날생선·뼈 위험, 안전한 조리 방법을 정리했습니다.",
    body: `<p>생선은 단백질과 지방산을 제공해서 간식이나 토핑으로 쓰는 보호자가 많다. 하지만 어떤 생선을 어떻게 조리하느냐에 따라 안전하기도 하고 위험하기도 하다. 핵심은 익히고, 뼈를 제거하고, 양념 없이 소량만 주는 것이다.</p>

<h2>안전하게 주려면</h2>
<table>
<thead><tr><th>항목</th><th>권장</th><th>이유</th></tr></thead>
<tbody>
<tr><td>조리</td><td>충분히 익히고 양념·기름·소금 없이</td><td>생선을 날것으로 주면 세균과 기생충 위험이 있다</td></tr>
<tr><td>뼈</td><td>가시를 완전히 제거한 살코기</td><td>작고 부서지기 쉬운 가시는 목에 걸리거나 장을 다치게 할 수 있다</td></tr>
<tr><td>양</td><td>간식 수준으로 가끔 소량</td><td>생선만 많이 주면 영양 균형이 깨진다. 주식은 균형 잡힌 사료여야 한다</td></tr>
<tr><td>종류</td><td>대형 장수 어종보다 연어·틸라피아 같은 작은 어종 위주</td><td>수은은 큰 포식 어종에 더 많이 쌓인다. AKC는 신선한 참치가 연어나 틸라피아보다 수은이 훨씬 많다고 설명한다</td></tr>
</tbody>
</table>

<h2>날연어는 특히 위험하다</h2>
<p>미국 서북부 등에서는 날연어나 날송어에 붙은 흡충과 그 안의 세균 때문에 "연어 중독(salmon poisoning disease)"이 생길 수 있다. 메르크 수의학 매뉴얼에 따르면 치료하지 않으면 치명적일 수 있고, 증상은 먹은 뒤 일주일 안팎에 시작되는 경우가 많다. 한국에서 흔히 먹는 회나 말린 생선, 강가·해변에서 주운 생선을 개에게 주지 않는 것이 안전하다. 날생선을 먹었다면 증상이 없어도 수의사에게 알린다.</p>

<div class="callout-dog">
<strong>이런 생선 제품은 피한다</strong><br>
• 양념·소금·기름이 들어간 통조림이나 조림, 훈제 제품<br>
• 가시가 있는 채로 구운 생선, 생선 머리·뼈<br>
• 날생선, 회, 젓갈<br>
• 알레르기나 소화 문제가 있는 개에게 처음 먹이는 새로운 생선
</div>

<h2>처음 먹일 때</h2>
<ul>
<li>아주 소량부터 시작하고 24시간 정도 구토, 설사, 가려움이 없는지 본다.</li>
<li>췌장염 병력이 있거나 식이 관리 중인 개는 지방이 많은 생선을 먹이기 전에 수의사와 상의한다.</li>
<li>먹은 뒤 반복 구토, 혈변, 심한 무기력이 있으면 바로 진료받는다.</li>
</ul>

<h2>마지막으로</h2>
<p>익힌 무가미 살코기를 가끔 조금 주는 정도가 안전한 선이다. 날생선, 가시, 양념이 들어간 제품만 피해도 대부분의 사고를 막을 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.akc.org/expert-advice/nutrition/can-dogs-eat-fish/ — AKC, Can Dogs Eat Fish?",
      "https://www.akc.org/expert-advice/nutrition/can-dogs-eat-salmon/ — AKC, Can Dogs Eat Salmon?",
      "https://vcahospitals.com/know-your-pet/salmon-poisoning — VCA, Salmon Poisoning",
      "https://www.merckvetmanual.com/dog-owners/disorders-affecting-multiple-body-systems-of-dogs/salmon-poisoning-disease-and-elokomin-fluke-fever-in-dogs — Merck Veterinary Manual, Salmon Poisoning Disease and Elokomin Fluke Fever in Dogs",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-22T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-439",
    slug: "male-dog-prostate-disease-guide",
    type: "blog",
    category: 3,
    title: "수컷 강아지 전립선 질환 — 중성화 안 한 개에서 흔한 이유",
    subtitle: "전립선 비대·농양·낭종·종양 구분, 소변 이상·배변 어려움 증상, 중성화 예방 효과",
    metaTitle: "수컷 강아지 전립선 질환 — 증상·치료·중성화 예방 | 펫지기",
    metaDescription: "중성화 안 한 수컷 강아지에서 흔한 전립선 질환. 전립선 비대·농양·종양 구분, 소변·배변 이상 증상, 중성화 예방 효과를 정리했습니다.",
    body: `<p>중성화하지 않은 수컷 강아지는 나이가 들면서 전립선 문제가 생기기 쉽다. 전립선은 요도를 감싸고 있어서 커지면 소변과 배변에 영향을 줄 수 있다. 다만 증상이 비슷해도 원인은 양성 비대부터 종양까지 다르므로 검사로 구분해야 한다.</p>

<h2>흔한 전립선 문제</h2>
<table>
<thead><tr><th>질환</th><th>특징</th><th>보호자가 알아둘 점</th></tr></thead>
<tbody>
<tr><td>양성 전립선 비대(BPH)</td><td>중성화하지 않은 수컷에서 가장 흔한 전립선 질환. 남성호르몬 영향으로 커진다</td><td>증상이 없는 개체도 많다. 증상이 있다면 혈뇨나 포피에서 피 섞인 분비물이 흔하다</td></tr>
<tr><td>전립선염</td><td>염증·감염. BPH와 함께 나타나기도 한다</td><td>열, 무기력, 통증이 있으면 빨리 진료가 필요하다</td></tr>
<tr><td>전립선 종양</td><td>대표적으로 전립선 선암</td><td>배뇨·배변 곤란이 나타날 수 있고, 중성화한 개에서도 전립선이 커지면 종양을 의심한다</td></tr>
</tbody>
</table>

<h2>어떤 증상이면 진료를 받아야 하나</h2>
<div class="callout-dog">
<strong>진료가 필요한 신호</strong><br>
• 소변에 피가 섞이거나 포피에서 피 섞인 분비물이 나옴<br>
• 소변을 보려 해도 잘 나오지 않거나 자세를 오래 잡음<br>
• 배변할 때 힘을 많이 주거나 변이 가늘어짐<br>
• 열, 심한 무기력, 식욕 없음<br>
• <strong>소변을 거의 못 보는 상태</strong>는 응급이다 — 바로 동물병원으로
</div>

<h2>검사와 진단</h2>
<p>직장 촉진에서 전립선의 크기와 통증 여부를 확인하고, 필요하면 초음파·소변 검사를 한다. 메르크 수의학 매뉴얼에 따르면 BPH의 확진은 세포검사나 조직검사로 하며, 사람의 PSA 같은 전립선 종양 표지자는 개의 전립선에는 없어서 쓸 수 없다. 종양 의심 시에는 조직검사가 필요하다.</p>

<h2>치료 방향</h2>
<ul>
<li><strong>BPH</strong>: 번식 계획이 없다면 중성화가 일반적으로 선택하는 치료다. 번식견은 호르몬 조절 약물이 연구되어 있으나, 정자 품질에 미치는 영향은 아직 논쟁이 있다. 약 선택은 수의사 처방이 필요하다.</li>
<li><strong>전립선염</strong>: 원인과 상태에 따라 수의사가 치료 계획을 세운다.</li>
<li><strong>종양</strong>: 완치를 기대하기 어려운 경우가 많아 수술, 항암, 방사선, 소염제 등을 상태에 맞춰 조합한다. 전립선 전체 절제는 전이 가능성과 요실금 위험 때문에 권장되지 않는다고 알려져 있다.</li>
</ul>

<h2>마지막으로</h2>
<p>소변 색 변화나 배변 곤란은 나이 탓으로 넘기기 쉽다. 중성화하지 않은 중년 이후 수컷이라면 정기검진에서 전립선 촉진을 요청하고, 혈뇨나 배뇨 곤란이 보이면 기다리지 말고 진료를 받자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.merckvetmanual.com/reproductive-system/prostatic-diseases-in-small-animals/benign-prostatic-hyperplasia-in-dogs — Merck Veterinary Manual, Benign Prostatic Hyperplasia in Dogs",
      "https://www.merckvetmanual.com/reproductive-system/prostatic-diseases-in-small-animals/neoplasms-of-the-prostate-in-dogs — Merck Veterinary Manual, Neoplasms of the Prostate in Dogs",
      "https://vcahospitals.com/know-your-pet/prostate-tumors — VCA, Prostate Tumors",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-22T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-440",
    slug: "rainy-day-indoor-cat-activities",
    type: "blog",
    category: 5,
    title: "비 오는 날 고양이와 함께하기 — 실내에서 자극을 만드는 10가지 방법",
    subtitle: "비 소리에 예민한 고양이 달래기, 날씨 변화 스트레스 줄이기, 특별한 놀이 루틴",
    metaTitle: "비 오는 날 고양이 실내 놀이 10가지 | 펫지기",
    metaDescription: "비 오는 날 고양이와 실내에서 자극을 만드는 방법 10가지. 비 소리 예민한 고양이 달래기, 날씨 변화 스트레스 관리, 특별한 놀이 루틴을 정리했습니다.",
    body: `<p>비 오는 날이나 집에서만 지내는 고양이는 활동량이 줄고 지루해지기 쉽다. 실내 고양이에게는 사냥과 탐색의 기회를 의도적으로 만들어 주는 환경 풍부화(enrichment)가 중요하다. 비싼 장비 없이도 집에 있는 물건으로 할 수 있는 놀이를 정리했다.</p>

<h2>10가지 실내 놀이</h2>
<table>
<thead><tr><th>놀이</th><th>방법</th><th>안전 포인트</th></tr></thead>
<tbody>
<tr><td>1. 낚싯대 사냥 놀이</td><td>숨었다 나타나는 움직임으로 추적·덮치기를 유도</td><td>끈 달린 장난감은 놀이 후 꼭 치우기</td></tr>
<tr><td>2. 간식 숨기기</td><td>하루 사료 일부를 여러 곳에 숨겨 찾게 한다</td><td>전체 열량 안에서 조절</td></tr>
<tr><td>3. 퍼즐 급식기</td><td>굴리거나 건드려야 사료가 나온다</td><td>처음엔 쉬운 단계부터</td></tr>
<tr><td>4. 박스·종이봉투 탐험</td><td>택배 상자에 구멍을 내거나 종이봉투를 펼쳐 둔다</td><td>손잡이 끈 제거, 테이프·스테이플러 핀 제거</td></tr>
<tr><td>5. 탁구공 굴리기</td><td>빈 욕조나 복도에서 굴려 쫓게 한다</td><td>삼키지 않는 크기인지 확인</td></tr>
<tr><td>6. 창가 관찰대</td><td>창가에 안전한 자리를 만들고 밖을 볼 수 있게 한다</td><td>방충망·창문 잠금 확인</td></tr>
<tr><td>7. 캣타워·선반 오르기</td><td>높은 곳을 오르내리는 길을 만든다</td><td>미끄럽지 않고 안정적인지 확인</td></tr>
<tr><td>8. 터널 놀이</td><td>종이 터널이나 접이식 터널을 설치</td><td>너무 좁지 않게</td></tr>
<tr><td>9. 새 소리·영상</td><td>고양이용 영상을 틀어 관찰하게 한다</td><td>너무 오래 보여 주지 않고 실제 놀이로 이어지게</td></tr>
<tr><td>10. 훈련 놀이</td><td>간식으로 "앉아", 손 맞추기 같은 간단한 신호를 가르친다</td><td>짧게, 즐겁게</td></tr>
</tbody>
</table>

<h2>놀이 시간 정하기</h2>
<ul>
<li>하루에 짧은 놀이를 몇 번 나눠서 한다. 한 번에 10분 안팎이 적당하다.</li>
<li>고양이가 활동적인 새벽과 해질 무렵에 맞추면 반응이 좋다.</li>
<li>놀이를 마칠 때는 "잡았다"는 만족감을 주는 마무리를 하고 간식을 준다.</li>
<li>장난감은 한 번에 몇 개만 내어 두고 주기적으로 바꾼다.</li>
</ul>

<div class="callout-cat">
<strong>위험한 놀이용품</strong><br>
• 끈, 리본, 털실, 고무줄, 비닐 — 삼키면 장폐색 위험<br>
• 작은 부품이 떨어지는 장난감, 깃털이 빠지는 제품<br>
• 레이저만으로 놀이를 끝내기 — 잡는 만족이 없어 좌절감이 쌓일 수 있다<br>
→ Cornell 고양이건강센터는 "아이에게 안전하지 않다면 고양이에게도 안전하지 않다"고 안내한다.
</div>

<h2>놀이가 줄었다면</h2>
<p>갑자기 활동량이 줄고 놀이에 관심을 잃거나 숨는 시간이 늘면 기분 탓만이 아니라 통증이나 질병 신호일 수 있다. 며칠 이상 계속되면 진료를 받는다.</p>

<h2>마지막으로</h2>
<p>실내 고양이에게 놀이는 운동이자 정신적 자극이다. 집에 있는 안전한 물건으로 하루 몇 번 사냥 놀이를 만들어 주면 지루함과 체중 문제를 함께 줄일 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://vcahospitals.com/know-your-pet/cat-behavior-and-training---enrichment-for-indoor-cats — VCA, Cat Behavior and Training - Enrichment for Indoor Cats",
      "https://icatcare.org/articles/playing-with-your-cat — International Cat Care, Playing with your cat",
      "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/safe-toys-and-gifts — Cornell Feline Health Center, Safe toys and gifts",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-23T09:00:00.000Z",
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
  console.log("블로그 포스트 63차 시딩 완료! (blog-436 ~ blog-440)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
