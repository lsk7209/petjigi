import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 59 — cat1×2 + cat4×1 + cat5×1 + cat3×1 = 5편 (IDs 416-420)
// Macros: B, F, A, E, F
// Angles: RA3, RA7, RA2, RA5, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-416",
    slug: "puppy-mill-awareness-consumer-guide",
    type: "blog",
    category: 1,
    title: "공장식 번식장의 실태 — 소비자가 알아야 하는 것",
    subtitle: "한국 번식장 현황, 건강 문제 통계, 책임 있는 선택을 위한 기준",
    metaTitle: "강아지 공장식 번식장 실태 — 소비자 책임 가이드 | 펫지기",
    metaDescription: "한국 공장식 강아지 번식장의 실태와 문제점. 번식장 출신 강아지의 건강 문제 통계, 책임 있는 소비자 선택 기준을 정리했습니다.",
    body: `<p>귀엽고 건강해 보이는 펫숍 강아지 뒤에는 대부분 번식장이 있다. 알고 선택하는 것이 책임 있는 보호자의 시작이다.</p>

<h2>한국 번식장의 현황</h2>
<p>농림축산식품부 자료에 따르면, 합법적으로 등록된 동물 생산업체만도 수천 개에 달한다. 미등록 번식장까지 합하면 훨씬 많을 것으로 추산된다. 많은 곳에서 어미개가 평생 좁은 케이지에서 반복 임신·출산을 강요받는다.</p>

<h2>번식장 출신 강아지의 건강 문제</h2>
<ul>
<li><strong>유전 질환 발생률 높음</strong>: 근친 교배·무분별한 번식으로 유전적 다양성 감소</li>
<li><strong>사회화 부족</strong>: 어미와의 조기 분리, 자극 없는 환경에서 자람</li>
<li><strong>행동 문제</strong>: 분리불안·공격성·공포증 발생률 높다는 연구 있음</li>
<li><strong>면역 약화</strong>: 스트레스·영양 부족으로 시작부터 약한 면역</li>
</ul>

<h2>펫숍에서 보이는 것들</h2>
<p>유리 케이지 안의 강아지는 건강해 보인다. 그러나 번식장에서의 이력, 어미 상태, 유전 검사 여부는 보이지 않는다. 판매 시점에서 이미 수주가 지난 경우 초기 질환이 잠복 중일 수 있다.</p>

<h2>책임 있는 선택을 위한 기준</h2>
<div class="callout-dog">
<strong>강아지를 맞이하는 책임 있는 방법</strong><br>
① 보호소·구조단체 입양 (생명을 직접 구함)<br>
② 책임 브리더 (어미 직접 확인, 유전 검사, 계약서)<br>
③ 인터넷·SNS 직접 분양 (어미 확인 가능 여부 확인)<br>
④ 펫숍 → 번식장과의 연결 고리 확인 요청
</div>

<h2>소비자의 영향력</h2>
<p>번식장이 존재하는 것은 구매 수요가 있기 때문이다. 책임 있는 선택이 늘어날수록 산업의 방향도 바뀐다. 한 명의 소비자 선택이 다음 번식장 강아지의 어미가 될 수 있는 개의 삶에 영향을 준다.</p>

<h2>마지막으로</h2>
<p>번식장이 존재하는 현실을 바꾸는 것은 법과 제도만으로 되지 않는다. 선택하는 사람이 바뀌어야 한다. 강아지를 선택하기 전에, 그 강아지가 어디서 왔는지를 한 번 더 생각해달라는 것이 이 글의 부탁이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "McMillan, F.D. et al. — Mental Health of Dogs Formerly Used for Commercial Breeding. Applied Animal Behaviour Science 2011",
      "동물권행동 카라 번식장 실태 조사 보고서 2024",
      "농림축산식품부 동물 생산업 등록 현황",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-11T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-417",
    slug: "parrot-bird-adoption-guide",
    type: "blog",
    category: 1,
    title: "앵무새 입양 전에 알아야 할 것 — 수십 년을 함께할 동반자",
    subtitle: "수명 20~80년, 지능과 감정적 요구, 소리 문제, 전문 수의사 필요성, 비용 현실",
    metaTitle: "앵무새 입양 가이드 — 수명·소리·비용·전문 수의사 | 펫지기",
    metaDescription: "앵무새 입양 전 알아야 할 것. 수명 20~80년의 현실, 강한 감정적 요구, 소음 문제, 전문 조류 수의사 필요성, 비용을 정리했습니다.",
    body: `<p>앵무새는 말을 따라 하고 사람과 교감하며 지능이 높아 매력적이다. 하지만 이 특성이 곧 도전이기도 하다. 일반적으로 몸집이 큰 종일수록 수명이 길어서, 대형 앵무는 수십 년을 함께해야 할 수 있다. 입양 전에 현실적인 부담을 먼저 점검하자.</p>

<h2>수명: 사람보다 오래 살 수 있다</h2>
<p>일리노이대 수의과대학은 앵무새가 종이 클수록 오래 사는 경향이 있고, 대형 앵무는 수십 년을 산다고 설명한다. 코카티엘·사랑앵무 같은 소형종은 상대적으로 짧지만 그래도 10년 안팎 이상을 함께한다. 내가 돌볼 수 없게 될 때를 대비한 계획(가족 인계 등)까지 고려해야 한다.</p>

<table>
<thead><tr><th>구분</th><th>소형종 (사랑앵무·코카티엘)</th><th>중·대형종 (코뉴어·그레이·마코)</th></tr></thead>
<tbody>
<tr><td>수명</td><td>상대적으로 짧음</td><td>수십 년, 보호자보다 오래 살 수도</td></tr>
<tr><td>소음</td><td>비교적 적음</td><td>크고 높은 소리, 아파트 이웃 갈등 가능</td></tr>
<tr><td>케이지·공간</td><td>보통</td><td>넓은 케이지와 케이지 밖 활동 공간 필요</td></tr>
<tr><td>교감 시간</td><td>매일 필요</td><td>매일 여러 시간 상호작용 필요</td></tr>
<tr><td>관리 난이도</td><td>상대적으로 낮음</td><td>높음</td></tr>
</tbody>
</table>

<h2>사회적 욕구와 행동 문제</h2>
<p>앵무새는 야생에서 무리 생활을 하는 사회적 동물이라 혼자 오래 두면 스트레스를 받는다. 깃털 뽑기는 흔히 심리 문제로만 생각하지만, 영국 왕립수의대(RVC)의 엑조틱 진료 자료는 가장 흔한 원인이 질병과 관련된 것이고 스트레스·지루함은 상대적으로 드물다고 설명한다. 여러 원인이 겹치는 경우도 많으므로, 깃털을 뽑거나 피부가 손상되면 환경만 탓하지 말고 먼저 조류 진료를 받아야 한다.</p>

<div class="callout-cat">
<strong>깃털 뽑기·자해가 보이면</strong><br>
• 피부에 상처나 염증이 있으면 바로 조류 진료 가능한 병원에 연락한다<br>
• 환경 변화(이사·새 가구), 교감 시간 부족, 수면 부족, 영양 불균형도 함께 점검한다<br>
• 원인을 스스로 단정하지 말고 검사로 질병을 먼저 배제한다
</div>

<h2>소음과 주거 환경</h2>
<p>많은 앵무새가 아침저녁으로 크게 운다. 공동주택에서는 이웃 분쟁으로 이어질 수 있어서 입양 전에 소리 크기를 종별로 확인해야 한다. 코카티엘·사랑앵무는 상대적으로 조용하지만 완전히 조용한 종은 없다고 생각하는 게 안전하다.</p>

<h2>수의사와 식이</h2>
<ul>
<li><strong>조류 진료 병원 확인</strong>: 앵무새는 엑조틱 동물이라 일반 동물병원에서 진료하지 않는 곳이 많다. 입양 전에 가까운 조류 진료 병원을 확인한다.</li>
<li><strong>식이</strong>: 씨앗만 먹이면 영양 결핍이 생길 수 있다. 펠릿과 신선한 채소를 포함한 균형 식단을 수의사와 상의한다.</li>
<li><strong>정기 검진</strong>: 새는 아픈 것을 숨기는 경향이 있어 정기 검진이 도움이 된다.</li>
<li><strong>안전한 환경</strong>: 테프론(불소수지) 코팅 조리기구에서 나오는 연기 등 조류에 치명적인 공기 오염에 주의하고, 케이지 밖에서는 창문·선풍기·다른 반려동물로부터 보호한다.</li>
</ul>

<h2>입양 전 점검표</h2>
<ol>
<li>종별 수명과 성격, 소음 수준을 공부했는가</li>
<li>하루에 충분한 교감 시간을 낼 수 있는가</li>
<li>인근에 조류 진료 병원이 있는가</li>
<li>평생 책임질 수 없을 때의 대안(가족 인계)이 있는가</li>
<li>야생 포획 개체가 아닌 합법적으로 번식·유통된 개체인가 (출처·서류 확인)</li>
</ol>

<h2>마지막으로</h2>
<p>앵무새는 제대로 돌보면 훌륭한 동반자가 된다. 그러나 충동 입양은 앵무새에게도 보호자에게도 불행한 결말이 되기 쉽다. 충분히 공부하고 시간을 두고 결정하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://vetmed.illinois.edu/pet-health-columns/parrots-husbandry/ — 일리노이대 수의과대학, Parrots Are Forever",
      "https://www.rvc.ac.uk/Media/Default/small-animal/documents/Excessive-Feather-plucking-in-pet-birds%202017.pdf — Royal Veterinary College, Excessive feather plucking in pet birds",
      "https://www.dvm360.com/view/understanding-feather-loss-vocalization-and-other-parrot-behavior-problems — dvm360, Understanding feather loss, vocalization and other parrot behavior problems",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-11T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-418",
    slug: "pet-camping-outdoor-guide",
    type: "blog",
    category: 4,
    title: "반려동물과 캠핑·야외 활동 — 규정·안전·에티켓 완전 가이드",
    subtitle: "반려동물 허용 캠핑장 확인, 진드기·뱀 노출, 야생 동물 조우 대처, 무더위 관리",
    metaTitle: "반려동물 캠핑·야외 활동 가이드 — 규정·안전·에티켓 | 펫지기",
    metaDescription: "반려동물과 캠핑하거나 야외 활동 시 알아야 할 것. 허용 캠핑장 확인, 진드기·뱀 노출 대처, 야생 동물 조우, 무더위 관리를 정리했습니다.",
    body: `<p>반려동물과의 캠핑은 특별한 경험이다. 그러나 야외 환경에는 평소와 다른 위험 요소들이 있다.</p>

<h2>캠핑 전 준비</h2>
<ul>
<li>예방접종·내외부 기생충 예방이 최신 상태인지 확인</li>
<li>방문할 캠핑장의 반려동물 허용 정책 사전 확인</li>
<li>여분 사료·물·익숙한 담요·응급 키트 준비</li>
<li>마이크로칩·목줄 이름표 확인 (낯선 환경에서 이탈 위험 높음)</li>
</ul>

<h2>진드기 노출 관리</h2>
<p>풀숲·낙엽·잡목 지역은 진드기 서식지다. 산책 후 귀 뒤·겨드랑이·발가락 사이·항문 주변을 세밀히 확인한다. 예방약은 캠핑 전 미리 투여한다.</p>

<h2>야생 동물 조우</h2>
<div class="callout-dog">
<strong>야외 위험 요소 대처</strong><br>
• <strong>뱀</strong>: 쫓아다니지 않게 즉시 멀리 이동. 물렸다면 움직임 최소화 + 즉시 병원.<br>
• <strong>야생 동물 먹이</strong>: 독초·유독 버섯·죽은 동물 흔적 섭취 주의<br>
• <strong>야생 동물 배설물·수계</strong>: 렙토스피라 등 전파 가능
</div>

<h2>무더위 캠핑 주의사항</h2>
<ul>
<li>텐트 내부는 낮에 50°C 이상 — 강아지를 텐트 안에 홀로 두지 않기</li>
<li>그늘 확보 필수</li>
<li>물 공급 늘리기 (활동량 증가로 수분 소모 많음)</li>
<li>아스팔트·모래 표면 온도 확인</li>
</ul>

<h2>캠핑장 에티켓</h2>
<ul>
<li>다른 캠퍼와 거리 유지 — 동물을 무서워하는 사람 배려</li>
<li>짖음 제어 — 저녁·밤에 과도한 소음 자제</li>
<li>배변 즉시 수거 — 자연 환경 오염 방지</li>
<li>야생 동물 먹이 주지 않기 — 생태계 교란</li>
</ul>

<h2>마지막으로</h2>
<p>반려동물과의 캠핑은 즐거운 기억이 된다. 안전 준비만 충분히 하면 야외에서도 함께 아름다운 경험을 나눌 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Kennel Club — Camping with Your Dog",
      "CAPC — Parasite Prevention Guidelines for Outdoor Activities",
      "한국반려동물협회 야외 활동 안전 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-12T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-419",
    slug: "dog-hiking-mountain-safety",
    type: "blog",
    category: 5,
    title: "강아지와 등산·하이킹 — 안전하게 산을 오르기 위한 준비",
    subtitle: "강아지 등산 적합 여부 확인, 물·간식 준비, 발바닥 보호, 피로 신호 읽기",
    metaTitle: "강아지 등산·하이킹 완전 가이드 — 안전 준비·물·발바닥 | 펫지기",
    metaDescription: "강아지와 등산할 때 안전 준비. 적합한 강아지 확인, 물·간식 준비, 발바닥 보호, 등산 중 피로·탈진 신호를 정리했습니다.",
    body: `<p>강아지와 함께하는 등산과 하이킹은 좋은 운동이 되지만, 개는 땀으로 체온을 식히지 못해 쉽게 과열되고 발바닥도 다치기 쉽다. 코스 선택부터 준비물, 현장 매너까지 점검해 보자.</p>

<h2>출발 전 준비</h2>
<ul>
<li><strong>건강 점검</strong>: 장거리 산행 전에 수의사와 관절·심장 상태를 확인한다.</li>
<li><strong>체력 단련</strong>: 짧은 코스부터 시작해 거리를 서서히 늘린다. 갑작스러운 장시간 활동은 부상 위험이 크다.</li>
<li><strong>동반 가능 확인</strong>: 국립공원·지자체 구역은 반려견 동반 규정(줄 길이, 입장 가능 여부)이 다르다. 사전에 확인한다.</li>
<li><strong>예방접종·구충</strong>: 야생동물 접촉이나 진드기에 대비해 예방 계획을 수의사와 확인한다.</li>
</ul>

<h2>준비물</h2>
<table>
<thead><tr><th>준비물</th><th>이유</th></tr></thead>
<tbody>
<tr><td>충분한 물과 접이식 그릇</td><td>정체된 하천·웅덩이 물은 기생충과 세균(렙토스피라 등)에 오염되었을 수 있다</td></tr>
<tr><td>짧고 고정된 줄 (신축형 줄은 지양)</td><td>신축형이나 너무 긴 줄은 덤불에 엉킨다</td></tr>
<tr><td>발 보호 신발, 응급 키트</td><td>거친 바위나 뜨거운 바닥에서 발바닥을 보호하고 상처에 대비</td></tr>
<tr><td>배변봉투, 간식</td><td>배설물은 반드시 수거하고 에너지를 보충</td></tr>
<tr><td>진드기 제거 도구</td><td>산행 후 확인하고 발견하면 빠르게 제거</td></tr>
</tbody>
</table>

<div class="callout-dog">
<strong>과열·탈진 신호 — 즉시 쉬고 병원 연락</strong><br>
• 과도한 헐떡임, 침 흘림, 잇몸이 붉거나 창백함<br>
• 비틀거림, 주저앉음, 반응이 둔함<br>
• 구토나 설사<br>
→ 그늘에서 쉬게 하고 물을 조금씩 마시게 하며, 호전되지 않으면 서둘러 하산해 진료받는다.
</div>

<h2>산에서의 매너와 안전</h2>
<ul>
<li>오는 사람이나 다른 개를 만나면 줄을 짧게 잡고 길가로 비켜선다.</li>
<li>야생동물을 쫓지 않게 "기다려", "이리 와" 신호를 미리 훈련한다.</li>
<li>무더운 시간대를 피해 이른 시간에 출발한다.</li>
<li>배설물을 치우고 쓰레기를 가져온다.</li>
</ul>

<h2>산행 후</h2>
<ul>
<li>몸 전체, 귀, 발가락 사이에서 진드기와 상처를 확인한다.</li>
<li>발바닥이 갈라지거나 헐지 않았는지 본다.</li>
<li>다음 날까지 절뚝임, 식욕 저하, 구토가 있으면 진료를 받는다.</li>
</ul>

<h2>마지막으로</h2>
<p>개의 체력과 컨디션에 맞춰 코스를 정하고, 물과 휴식을 충분히 주자. 무리하지 않고 안전하게 돌아오는 것이 목표다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.akc.org/expert-advice/lifestyle/tips-for-hiking-with-your-dog/ — AKC, Hiking With Your Dog: Expert Safety, Training, and Gear Tips",
      "https://vcahospitals.com/resources/lifestyle-dog/hiking-with-your-dog-101 — VCA, Hiking with your dog 101",
      "https://www.avma.org/resources-tools/veterinarians-and-public-health/disease-precautions-outdoor-companion-animals — AVMA, Disease precautions for outdoor enthusiasts and their companion animals",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-12T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-420",
    slug: "dog-lyme-disease-tick-prevention",
    type: "blog",
    category: 3,
    title: "강아지 라임병·진드기 매개 질환 — 산책 후 확인해야 하는 이유",
    subtitle: "라임병·아나플라스마증·바베시아증 원인, 진드기 제거 방법, 예방약 종류 비교",
    metaTitle: "강아지 라임병·진드기 매개 질환 — 예방과 제거 가이드 | 펫지기",
    metaDescription: "강아지에게 진드기가 전파하는 라임병, 아나플라스마증, 바베시아증의 증상과 예방. 진드기 올바른 제거 방법과 예방약 종류를 정리했습니다.",
    body: `<p>진드기는 단순한 피부 자극이 아니다. 라임병·아나플라스마증·바베시아증 등 심각한 질환을 전파한다. 산책 후 진드기 확인이 왜 중요한지 알아보자.</p>

<h2>진드기 매개 주요 질환</h2>
<table>
<thead><tr><th>질환</th><th>원인균</th><th>주요 증상</th></tr></thead>
<tbody>
<tr><td>라임병</td><td>Borrelia burgdorferi (참진드기 매개)</td><td>절름거림, 발열, 무기력, 신장 합병증</td></tr>
<tr><td>아나플라스마증</td><td>Anaplasma spp.</td><td>발열, 무기력, 혈소판 감소</td></tr>
<tr><td>바베시아증</td><td>Babesia spp. (원충)</td><td>빈혈, 황달, 발열 — 치명적 가능</td></tr>
<tr><td>에를리히아증</td><td>Ehrlichia spp.</td><td>발열, 무기력, 출혈 경향</td></tr>
</tbody>
</table>

<h2>진드기 확인 및 제거</h2>
<p>진드기는 흡혈을 시작한 후 24~48시간 이내에 제거하면 질환 전파 위험이 크게 낮아진다.</p>

<div class="callout-dog">
<strong>올바른 진드기 제거 방법</strong><br>
1. 전용 진드기 핀셋(족집게) 사용<br>
2. 피부와 최대한 가까이 집기<br>
3. 비틀지 않고 수직으로 서서히 당기기<br>
4. 잡아당긴 후 상처 소독<br>
<br>
<strong>하면 안 되는 것</strong><br>
• 손가락으로 짜내기 (내용물 역류)<br>
• 알코올·매니큐어·불로 죽이려 하기
</div>

<h2>진드기 예방약 종류</h2>
<ul>
<li><strong>경구 약 (이소옥사졸린 계열: 넥스가드·심파리카·브라벡토)</strong>: 1~3개월 지속. 진드기 흡혈 후 수시간 내 사망. 편리성 높음.</li>
<li><strong>피부 점적 (스팟온: 프론트라인·어드밴틱스)</strong>: 피부에 바름. 월 1회. 접촉 기피 효과.</li>
<li><strong>진드기 목걸이 (세레스토)</strong>: 8개월 지속. 기피+구제 효과.</li>
</ul>

<h2>진드기 확인 부위</h2>
<p>산책 후 귀 뒤·겨드랑이·서혜부·발가락 사이·꼬리 아래를 손가락으로 꼼꼼히 만져본다. 특히 참나무·풀숲을 다녀온 후에는 반드시 확인한다.</p>

<h2>마지막으로</h2>
<p>진드기 예방약은 4~11월 전 기간 투여하는 것이 안전하다. 야외 활동이 많은 개라면 연중 투여도 권장된다. 산책 후 진드기 확인과 예방약 투여 — 이 두 가지가 진드기 매개 질환 예방의 전부다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "CAPC (Companion Animal Parasite Council) — Tick-Borne Disease Guidelines",
      "Straubinger, R.K. — Lyme Disease in Dogs. Vet Clin North Am 2000",
      "대한수의사회 진드기 매개 질환 예방 가이드",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-13T09:00:00.000Z",
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
  console.log("블로그 포스트 59차 시딩 완료! (blog-416 ~ blog-420)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
