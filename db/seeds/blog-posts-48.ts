import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 48 — cat2×2 + cat3×1 + cat5×1 + cat6×1 = 5편 (IDs 361-365)
// Macros: A, F, E, F, B
// Angles: RA2, RA5, RA3, RA7, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 361 / Cat2 / Macro-A(원인분석) / Lens-L2 / Hook-H3 / Outro-O1 / Angle-RA2
  {
    id: "blog-361",
    slug: "dog-homemade-food-guide",
    type: "blog",
    category: 2,
    title: "강아지 집밥(홈쿡) — 잘 만들면 좋고 잘못 만들면 위험한 이유",
    subtitle: "영양 불균형의 실질적 위험, 안전한 재료 목록, 칼슘·인 비율 맞추는 법, 전문가 레시피 활용",
    metaTitle: "강아지 홈쿡(집밥) 가이드 — 영양 균형·안전 재료·주의사항 | 펫지기",
    metaDescription: "강아지 집밥은 잘못 만들면 영양 불균형으로 위험합니다. 안전한 재료 목록, 칼슘·인 비율, 검증된 레시피 사용법을 정리했습니다.",
    body: `<p>강아지에게 집에서 만든 신선한 음식을 먹이고 싶은 마음은 자연스럽다. 그러나 집밥이 건강하려면 반드시 영양 균형이 맞아야 한다. 좋은 재료를 써도 균형이 맞지 않으면 오히려 사료보다 나쁜 결과가 생길 수 있다.</p>

<h2>가장 흔한 영양 불균형 문제</h2>
<ul>
<li><strong>칼슘 부족</strong>: 뼈 없이 육류만 급여하면 칼슘:인 비율이 심각하게 무너짐. 성장기 강아지에서 뼈 발달 장애.</li>
<li><strong>아연 부족</strong>: 피부·면역 문제 유발</li>
<li><strong>요오드 부족</strong>: 갑상선 기능 저하</li>
<li><strong>비타민D·E 불균형</strong>: 근육·뼈·면역 문제</li>
</ul>

<h2>강아지에게 안전한 재료</h2>
<div class="callout-dog">
<strong>사용 가능 재료</strong><br>
• <strong>단백질</strong>: 닭·오리·소·돼지(지방 제거)·연어(익힌 것)<br>
• <strong>탄수화물</strong>: 흰쌀·고구마·귀리<br>
• <strong>채소</strong>: 당근·브로콜리·주키니·시금치(소량)<br>
• <strong>과일</strong>: 블루베리·사과(씨 제거)·수박(씨 제거)<br><br>
<strong>절대 사용 금지</strong><br>
• 양파·마늘·파·부추 (적혈구 파괴)<br>
• 포도·건포도 (신장 독성)<br>
• 초콜릿·자일리톨·아보카도
</div>

<h2>칼슘·인 비율 맞추기</h2>
<p>닭가슴살 100g의 칼슘:인 비율은 약 1:20 (칼슘이 극히 부족). 강아지 요구량은 1~2:1이다. 가공육 없이 집밥만 먹이려면 반드시 칼슘 보충이 필요하다. 방법:</p>
<ul>
<li>생골(날뼈) 포함 — 뼈와 살의 비율 조정</li>
<li>달걀 껍질 파우더 (건조·분쇄) — 식품 등급 칼슘원</li>
<li>수의사 처방 칼슘 보충제</li>
</ul>

<h2>전문가 검증 레시피 사용</h2>
<p>무작위 레시피는 위험하다. 영양사 또는 수의영양사가 작성한 레시피를 사용해야 한다. 추천 방법:</p>
<ul>
<li>BalanceIT.com — 수의영양사 검증 레시피 (영문)</li>
<li>국내 수의영양 전문가와 상담</li>
<li>홈쿡 + 상업 사료 병행 (50:50) — 영양 불균형 리스크 최소화</li>
</ul>

<h2>마지막으로</h2>
<p>집밥을 줄 수 있다. 하지만 레시피 없이 냉장고에 있는 것들로 대충 만들면 안 된다. 전문가 검증 레시피를 기반으로, 필요한 보충제를 정확히 넣는 것이 집밥의 전제 조건이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Stockman, J. et al. — Evaluation of recipes for home-prepared diets. JAVMA 2013",
      "BalanceIT.com — Veterinary Nutritionist Formulated Recipes",
      "한국수의영양학회 자가조리식 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-14T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 362 / Cat2 / Macro-F(절차) / Lens-L5 / Hook-H1 / Outro-O3 / Angle-RA5
  {
    id: "blog-362",
    slug: "senior-cat-protein-nutrition",
    type: "blog",
    category: 2,
    title: "노령 고양이에게 단백질을 줄이면 안 되는 이유",
    subtitle: "근육 감소증(사코페니아), 고단백 저인산 조합의 의미, 신장 문제 있을 때 단백질 조절 기준",
    metaTitle: "노령 고양이 단백질 영양 — 줄이면 안 되는 이유 완전 가이드 | 펫지기",
    metaDescription: "노령 고양이에게 단백질을 줄이면 근육 감소증이 생깁니다. 사코페니아 예방, 고단백 저인산 조합의 의미, 신장 문제 시 단백질 기준을 정리했습니다.",
    body: `<p>'노령이니까 단백질을 줄여야 한다'는 인식이 있다. 그러나 이것은 잘못된 통념이다. 건강한 노령묘에게 단백질을 줄이는 것은 오히려 근육 소실을 가속화한다.</p>

<h2>노령 고양이와 단백질 소화</h2>
<p>7세 이상 고양이는 단백질과 지방의 소화 흡수율이 낮아진다. 같은 양을 먹어도 실제로 흡수되는 단백질이 적다는 의미다. 따라서 노령묘에게는 오히려 고품질 단백질을 충분히 공급해야 한다.</p>

<h2>근육 감소증(사코페니아)</h2>
<p>노령 고양이에서 근육량이 감소하는 현상이다. 갈비뼈가 두드러지고 등뼈가 느껴지는 것이 특징이다. 사코페니아는 체중계 숫자가 정상이어도 근육은 줄고 지방은 늘어난 상태일 수 있다. 충분한 단백질 섭취와 가벼운 운동이 예방 및 진행 둔화에 도움이 된다.</p>

<h2>신장 질환이 있을 때는?</h2>
<p>CKD(만성 신장 질환)가 있는 고양이에서는 단백질 제한이 필요할 수 있다. 그러나 무조건 줄이는 것이 아니라 IRIS 병기와 수치에 따라 조정한다.</p>

<table>
<thead><tr><th>상태</th><th>단백질 전략</th></tr></thead>
<tbody>
<tr><td>건강한 시니어</td><td>고단백 유지 (최소 40% 건조 기준)</td></tr>
<tr><td>CKD 1~2기</td><td>단백질 약간 제한 + 인 제한 시작</td></tr>
<tr><td>CKD 3~4기</td><td>처방 신장식 (저인·제한 단백질)</td></tr>
</tbody>
</table>

<h2>고단백 저인산(Phosphorus) 조합</h2>
<p>신장 부담 없이 근육을 유지하려면 단백질은 충분하면서 인은 제한하는 것이 이상적이다. 닭·칠면조 같은 흰살육류는 인이 상대적으로 낮다. 어류(참치·연어)는 단백질과 인이 모두 높아 신장 문제가 있는 노령묘에는 주의가 필요하다.</p>

<h2>마지막으로</h2>
<p>노령묘 식이의 핵심은 '줄이기'가 아니라 '질 높이기'다. 흡수 가능한 고품질 단백질을 충분히 공급하면서 인·나트륨을 관리하는 것이 목표다. 수의사의 혈액 검사 결과를 기반으로 개체별로 조정하는 것이 가장 정확하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Laflamme, D.P. & Hannah, S.S. — Increased dietary protein promotes fat loss and reduces loss of lean body mass during weight loss in cats. Int J Appl Res Vet Med 2005",
      "IRIS Staging of CKD — Dietary Recommendations",
      "한국수의영양학회 노령묘 영양 관리 가이드라인 2024",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-15T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 363 / Cat3 / Macro-E(비교) / Lens-L3 / Hook-H2 / Outro-O2 / Angle-RA3
  {
    id: "blog-363",
    slug: "cat-fip-treatment-guide",
    type: "blog",
    category: 3,
    title: "고양이 FIP(전염성 복막염) — 한때 불치였던 병이 치료 가능해진 현재",
    subtitle: "FIP 습식·건식 형태 차이, GS-441524 항바이러스제 현황, 치료 비용과 성공률",
    metaTitle: "고양이 FIP 치료 — 항바이러스제 GS-441524 현황 가이드 | 펫지기",
    metaDescription: "고양이 FIP(전염성 복막염)는 과거 불치병이었지만 이제 치료 가능합니다. 습식·건식 형태 차이, GS-441524 항바이러스제, 치료 비용·성공률을 정리했습니다.",
    body: `<p>FIP(Feline Infectious Peritonitis, 고양이 전염성 복막염)는 한때 진단받으면 몇 주 내 사망하는 불치병이었다. 그러나 2019년부터 항바이러스제 치료가 가능해지면서 많은 고양이가 회복하고 있다.</p>

<h2>FIP란</h2>
<p>고양이 코로나바이러스(FCoV)가 변이되어 치명적인 형태로 발전하는 질환이다. FCoV 자체는 흔하고 대부분 무해하지만(위장염 정도), 일부 개체에서 변이가 일어나 FIP가 된다. 전파는 직접적이지 않으며, 코로나바이러스 자체가 고양이 간 전파된다.</p>

<h2>습식형 vs 건식형</h2>
<table>
<thead><tr><th>구분</th><th>습식형(Wet/Effusive)</th><th>건식형(Dry/Non-Effusive)</th></tr></thead>
<tbody>
<tr><td>특징</td><td>복강·흉강에 삼출액 축적</td><td>육아종성 병변</td></tr>
<tr><td>증상</td><td>복부·가슴 팽창, 호흡 곤란</td><td>신경 증상, 눈 문제, 서서히 쇠약</td></tr>
<tr><td>진행 속도</td><td>빠름 (수주 내)</td><td>느림 (수개월)</td></tr>
<tr><td>진단</td><td>삼출액 검사, 혈액 검사</td><td>더 어려움 — 조직 검사 필요한 경우</td></tr>
</tbody>
</table>

<h2>GS-441524 치료</h2>
<p>항바이러스제 GS-441524(또는 유도체 GC376)는 FIP 치료에 혁명적인 변화를 가져왔다. 12주 이상 투여 시 70~85%의 회복률이 보고된다.</p>

<div class="callout-cat">
<strong>치료 현황 (2025 기준)</strong><br>
• GS-441524: 한국에서 일부 병원에서 처방 가능 (공식 허가는 진행 중)<br>
• 치료 기간: 12주 이상 (신경형·눈 형태는 더 길게)<br>
• 비용: 월 30~80만 원 수준 (체중·형태에 따라 다름)<br>
• 치료 종료 후 모니터링 필수
</div>

<h2>조기 진단이 중요한 이유</h2>
<p>습식형 FIP는 진행이 빠르다. 복부 팽창·호흡 곤란·발열·식욕 저하가 동시에 나타나면 즉시 병원을 찾아야 한다. FIP 치료 경험이 있는 수의사 또는 고양이 전문 병원을 선택하는 것이 중요하다.</p>

<h2>마지막으로</h2>
<p>FIP는 더 이상 무조건 죽음을 의미하지 않는다. 그러나 여전히 치료 비용이 높고, 조기 진단이 치료 성공률에 중요하다. FIP 진단을 받았다면 포기하지 말고 치료 경험 있는 병원을 찾기를 권한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Pedersen, N.C. et al. — A randomized dose-escalation study of GS-441524 in cats with naturally occurring FIP. J Feline Med Surg 2019",
      "한국고양이수의사회 FIP 진단·치료 가이드라인 2024",
      "Cornell Feline Health Center — Feline Infectious Peritonitis",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-15T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 364 / Cat5 / Macro-F(절차) / Lens-L7 / Hook-H4 / Outro-O3 / Angle-RA7
  {
    id: "blog-364",
    slug: "dog-alone-time-training-guide",
    type: "blog",
    category: 5,
    title: "강아지 혼자 있는 시간 늘리기 — 분리불안 없이 독립심 키우는 방법",
    subtitle: "분리불안 vs 일반적 불안 구분, 혼자 있기 훈련 단계별, 출퇴근 루틴 만드는 법",
    metaTitle: "강아지 혼자 있기 훈련 — 분리불안 예방·독립심 키우기 | 펫지기",
    metaDescription: "강아지가 혼자 있는 시간을 늘리는 방법. 분리불안과 일반 불안의 차이, 혼자 있기 단계별 훈련, 출퇴근 루틴 만드는 법을 정리했습니다.",
    body: `<p>직장인 보호자라면 하루 8~10시간 강아지를 혼자 둬야 하는 현실이 있다. 처음부터 이것이 익숙한 강아지는 없다. 훈련으로 만들어야 한다.</p>

<h2>분리불안 vs 일반적인 불안</h2>
<p>분리불안은 보호자가 없는 것에 대한 극심한 공포·패닉이다. 일반적인 불안(지루함·에너지 과잉)과 구분해야 접근법이 다르다.</p>
<ul>
<li><strong>분리불안 신호</strong>: 보호자 나가자마자 즉시 시작되는 짖음·파괴·자해·대소변 실수. 귀가 시 극도로 흥분.</li>
<li><strong>일반 불안/지루함</strong>: 보호자가 나간 지 한참 후에 시작. 간식·장난감으로 해결 가능.</li>
</ul>

<h2>혼자 있기 단계별 훈련</h2>
<h3>1단계: 짧은 분리부터 (5초~1분)</h3>
<p>방문을 닫고 5초 후 돌아온다. 강아지가 조용하면 간식을 준다. 점차 시간을 1분, 5분, 10분으로 늘린다. 이 단계에서 흥분하면 시간을 더 짧게 줄인다.</p>

<h3>2단계: 다른 방 → 다른 층 → 외출</h3>
<p>눈에 보이지 않는 거리에서 시작해 점점 거리를 늘린다. 외출은 처음엔 5분, 10분, 30분으로 늘린다. 귀가 시 강아지가 흥분해 있으면 차분해질 때까지 인사를 하지 않는다 (흥분 강화 방지).</p>

<h3>3단계: 출퇴근 루틴 만들기</h3>
<p>나가기 전 30분~1시간 전에 산책·놀이로 에너지를 소진시킨다. 나갈 때와 올 때 똑같은 루틴을 만든다. "나갔다 올게"보다는 조용하고 평범하게 나가는 것이 좋다 (이별 의식이 흥분을 강화할 수 있다).</p>

<div class="callout-dog">
<strong>혼자 있는 시간을 위한 도구</strong><br>
• Kong에 사료·간식 채워두기<br>
• 음악 또는 TV 켜두기 (백색 소음)<br>
• 창문 뷰 제공 (지루함 감소)<br>
• 자동 급수기·급식기
</div>

<h2>분리불안이 심한 경우</h2>
<p>위 방법으로 해결되지 않는 심한 분리불안은 행동 수의사 또는 전문 트레이너의 도움이 필요하다. 약물 치료(항불안제·SSRI)가 병행되면 훈련 효과가 높아진다.</p>

<h2>마지막으로</h2>
<p>강아지가 혼자 있을 수 있는 능력은 타고나지 않는다. 어릴 때부터 단계적으로 훈련한 강아지는 6~8시간의 독립적인 시간을 잘 견딘다. 서두르지 않고 성공 경험을 차곡차곡 쌓아가는 것이 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Overall, K.L. — Clinical Behavioral Medicine for Small Animals",
      "AVSAB — Position Statement on Separation Anxiety",
      "한국반려동물행동상담협회 분리불안 훈련 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-16T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 365 / Cat6 / Macro-B(비교) / Lens-L6 / Hook-H8 / Outro-O4 / Angle-RA8
  {
    id: "blog-365",
    slug: "petloss-anniversary-grief",
    type: "blog",
    category: 6,
    title: "반려동물 기일 — 슬픔이 다시 찾아오는 날, 어떻게 보낼까",
    subtitle: "기일·생일·입양일에 다시 오는 슬픔의 정상성, 혼자 또는 함께 기억하는 방법",
    metaTitle: "반려동물 기일 — 다시 찾아오는 슬픔을 다루는 방법 | 펫지기",
    metaDescription: "반려동물 기일에 슬픔이 다시 찾아오는 것은 정상입니다. 기일·생일에 슬픔이 더 강해지는 이유와 혼자 또는 함께 기억하는 방법을 담았습니다.",
    body: `<p>반려동물이 떠나고 몇 달, 혹은 몇 년이 지났어도 기일이나 생일이 되면 다시 눈물이 나는 경우가 있다. 충분히 슬퍼했다고 생각했는데, 왜 또 이러는 걸까 싶어 자신을 탓하기도 한다. 그럴 필요 없다.</p>

<h2>기념일 반응(Anniversary Reaction)이란</h2>
<p>특정 날짜에 슬픔·불안·공허함이 다시 강하게 찾아오는 현상이다. 정신건강 전문가들이 인정하는 정상적인 슬픔 반응이다. 반려동물을 잃은 후에도 자주 나타난다.</p>

<p>이것은 슬픔이 '아직도 처리가 안 됐다'는 신호가 아니다. 그 존재를 깊이 사랑했다는 증거이며, 기억이 살아있다는 것이다.</p>

<h2>왜 기일에 더 강하게 느끼는가</h2>
<ul>
<li>날짜가 기억을 촉발하는 강력한 앵커 역할을 함</li>
<li>그 날 무엇을 했는지, 마지막 모습이 어땠는지가 선명하게 떠오름</li>
<li>계절·날씨·빛이 그때와 비슷하면 감각 기억이 더해짐</li>
</ul>

<h2>기일을 보내는 방법들</h2>
<h3>혼자 기억하기</h3>
<ul>
<li>좋아했던 간식을 먹거나, 자주 갔던 산책길을 걷는 것</li>
<li>사진을 꺼내보거나 영상을 다시 보는 것</li>
<li>일기에 그 이름을 쓰는 것</li>
<li>꽃을 하나 사서 방에 두는 것</li>
</ul>

<h3>함께 기억하기</h3>
<ul>
<li>함께 그 동물을 알던 사람과 이야기 나누기</li>
<li>SNS에 추모 포스트 올리기 — 기억을 나누는 것</li>
<li>동물 보호 단체에 소액 기부하기</li>
</ul>

<h2>오늘은 슬퍼도 된다</h2>
<p>슬픔을 억누르려 하거나 바쁘게 지내려 하는 것이 항상 맞는 방법은 아니다. 오늘만큼은 그 존재를 충분히 기억하고 슬퍼하는 것도 괜찮다.</p>

<p>사랑했기 때문에 슬프다. 슬프다는 것은 아직 그 사랑이 남아있다는 것이다.</p>

<h2>마지막으로</h2>
<p>기일이 매년 찾아오고, 매년 조금씩 다른 방식으로 슬프다. 해가 갈수록 선명한 아픔보다는 따뜻한 그리움으로 바뀌는 것이 많은 사람의 경험이다. 그 과정을 서두르지 않아도 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Worden, J.W. — Grief Counseling and Grief Therapy (4th ed.)",
      "Association for Pet Loss and Bereavement — Anniversary Reactions",
      "한국펫로스증후군연구회 애도 단계 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-16T11:00:00.000Z",
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
  console.log("블로그 포스트 48차 시딩 완료! (blog-361 ~ blog-365)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
