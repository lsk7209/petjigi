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
    body: `<p>앵무새는 매력적인 반려동물이다. 말을 하고, 사람과 교감하고, 지능이 높다. 그러나 이 특성들이 곧 도전이기도 하다.</p>

<h2>수명의 현실</h2>
<p>앵무새는 종에 따라 수명이 크게 다르다:</p>
<ul>
<li>코카티엘: 15~25년</li>
<li>아프리카 그레이 앵무: 40~60년</li>
<li>맥코 앵무: 50~80년</li>
<li>코뉴어: 20~30년</li>
</ul>
<p>맥코를 입양하는 것은 평생 파트너를 맞이하는 것이다. 유언장에 앵무새를 포함하는 사람들이 있다.</p>

<h2>강한 감정적·사회적 요구</h2>
<p>앵무새는 야생에서 무리를 이루어 사는 사회적 동물이다. 하루 몇 시간의 상호작용이 필요하며, 무시당하면 심각한 심리적 문제(깃털 뽑기·자해)가 생긴다. 혼자서도 잘 지낼 것이라는 생각은 오해다.</p>

<h2>소리 문제</h2>
<p>많은 앵무새 종이 매우 시끄럽다. 맥코·코뉴어는 아파트에서 이웃 분쟁의 원인이 될 수 있다. 코카티엘·버드젯이 상대적으로 조용한 편이다.</p>

<div class="callout-cat">
<strong>아파트 거주자에게 적합한 종</strong><br>
• 코카티엘: 비교적 조용, 애교 많음<br>
• 버드젯(왕관앵무): 작고 말 배우기 좋음<br>
• 파이오너스 앵무: 조용한 큰 앵무<br>
<br>
<strong>주의가 필요한 종 (소음)</strong><br>
• 맥코·아마존·코뉴어 계열
</div>

<h2>전문 조류 수의사 필요</h2>
<p>앵무새는 엑조틱 동물이다. 일반 동물병원에서 진료가 어려운 경우가 많다. 입양 전 조류 전문 수의사가 근처에 있는지 확인하는 것이 필수다.</p>

<h2>마지막으로</h2>
<p>앵무새는 제대로 케어하면 인생 최고의 동반자가 될 수 있다. 그러나 충분한 시간·관심·전문 지식이 있어야 한다. 충동적으로 결정하기보다 최소 3~6개월 공부하고 결정할 것을 권장한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Speer, B.L. — Current Therapy in Avian Medicine and Surgery",
      "World Parrot Trust — Parrot Adoption Guide",
      "한국조류협회 반려조류 입양 가이드",
    ]),
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
    body: `<p>강아지와 함께하는 등산은 두 배로 즐거운 경험이다. 그러나 강아지의 체력과 건강 상태를 고려한 준비가 필요하다.</p>

<h2>등산에 적합한 강아지 확인</h2>
<ul>
<li>나이: 성장판이 닫힌 성견(소형 12개월, 대형 18~24개월) 이상</li>
<li>건강: 관절·심장·호흡기 문제가 없는 개체</li>
<li>주의: 단두종(불독·퍼그)은 호흡 문제로 과격한 등산 부적합</li>
<li>처음이라면: 짧은 거리·완만한 경사부터 시작</li>
</ul>

<h2>등산 전 준비물</h2>
<div class="callout-dog">
<strong>등산 필수 준비물</strong><br>
□ 물 (강아지 체중 1kg당 60ml/시간 추가 준비)<br>
□ 접이식 물그릇<br>
□ 간식 (고칼로리 에너지 보충용)<br>
□ 목줄 + 이름표 (이탈 방지)<br>
□ 응급 키트 (거즈·반창고·지혈분말)<br>
□ 발바닥 왁스 (거친 돌·뜨거운 바위 대비)
</div>

<h2>등산 중 수분 관리</h2>
<p>강아지는 헐떡임으로 수분을 빠르게 잃는다. 30~45분마다 물을 제공한다. 산 속 계곡물을 직접 마시게 하면 기생충 감염 위험이 있다 — 가져온 물을 준다.</p>

<h2>피로·탈진 신호</h2>
<ul>
<li>발걸음이 느려지거나 멈춤</li>
<li>과도한 헐떡임 (평소보다 빠르고 깊음)</li>
<li>뒤처지거나 않으려 함</li>
<li>발바닥 들어올리기 (통증 신호)</li>
</ul>
<p>이 신호가 보이면 그늘에서 충분히 쉬고, 심하면 하산한다.</p>

<h2>등산로 에티켓</h2>
<ul>
<li>목줄 착용 필수 (국립공원은 법적 의무)</li>
<li>좁은 길에서 사람이 지나갈 때 옆으로 비켜주기</li>
<li>배변 수거 필수 — 자연 환경 오염 방지</li>
<li>야생 동물 추적하지 않도록 통제</li>
</ul>

<h2>마지막으로</h2>
<p>강아지와 함께하는 등산은 두 사람 모두에게 최고의 신체·정신 건강 활동이다. 강아지의 능력에 맞는 코스와 충분한 준비로 안전하고 즐거운 산행을 만들어보자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Kennel Club — Hiking with Dogs Safety Guide",
      "국립공원관리공단 반려동물 탐방 안내",
      "한국반려동물협회 야외 활동 안전 가이드",
    ]),
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
