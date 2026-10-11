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
    body: `<p>강아지에게 집에서 만든 밥을 먹이려는 보호자가 늘고 있다. 신선한 재료로 만들었다는 만족감은 크지만, 영양 균형을 맞추지 못한 집밥은 시간이 지나 뼈와 장기에 문제를 일으킬 수 있다. 수의학 자료는 집밥 자체를 금지하기보다 "전문가가 설계한 레시피로" 먹일 것을 권한다.</p>

<h2>집밥에서 가장 자주 생기는 문제</h2>
<table>
<thead><tr><th>문제</th><th>설명</th></tr></thead>
<tbody>
<tr><td>칼슘 부족</td><td>코넬 소속 수의 영양 전문가는 집밥에서 가장 흔한 큰 결함으로 칼슘 부족을 꼽는다. 어린 강아지는 골절, 성견은 뼈 약화로 이어질 수 있다</td></tr>
<tr><td>칼슘·인 비율 불균형</td><td>고기 위주 식단은 인이 많고 칼슘이 적어 뼈 질환의 원인이 될 수 있다</td></tr>
<tr><td>비타민·미네랄 보충 누락</td><td>고기와 채소만으로는 필요한 미량 영양소를 채우기 어렵다</td></tr>
<tr><td>레시피 고정</td><td>한 레시피를 오래 그대로 먹이면 부족한 영양소가 계속 쌓일 수 있다</td></tr>
</tbody>
</table>
<p>온라인과 책에 있는 집밥 레시피를 분석한 연구에서 대부분이 필수 영양소를 하나 이상 충족하지 못했다는 결과가 소개된 바 있다. 수의사가 쓴 레시피가 비교적 기준을 충족한 편이었다는 것이 시사점이다.</p>

<h2>안전하게 하려면</h2>
<ol>
<li>수의 영양 전문가(또는 영양을 전문으로 하는 수의사)에게 개의 나이, 체중, 건강 상태에 맞는 레시피를 받는다.</li>
<li>레시피에 포함된 보충제를 빼지 않는다. 개용 종합 비타민·미네랄 믹스와 칼슘 급원이 필요할 수 있다.</li>
<li>재료의 종류와 양을 정확히 계량하고, 임의로 바꾸지 않는다.</li>
<li>건강한 개도 1년에 2회 정도 영양 평가와 체중 점검을 받는다.</li>
<li>질환이 생기면 레시피를 다시 평가받는다.</li>
</ol>

<div class="callout-dog">
<strong>절대 넣지 말아야 할 재료</strong><br>
• 양파, 마늘, 부추 등 파속 식물<br>
• 포도, 건포도<br>
• 초콜릿, 카페인, 자일리톨<br>
• 익힌 뼈(쪼개져서 위장관을 다칠 수 있음), 마카다미아
</div>

<h2>시판 사료와 병행하기</h2>
<ul>
<li>주식은 완전·균형 사료로 두고, 집에서 만든 재료는 전체 열량의 일부 토핑으로 쓰면 영양 불균형 위험이 줄어든다.</li>
<li>신선 급여를 늘릴 때는 소량부터 시작해 변이 묽어지지 않는지 본다.</li>
</ul>

<h2>이런 변화가 보이면 진료</h2>
<ul>
<li>털이 푸석해지거나 빠짐, 피부 문제</li>
<li>체중이 갑자기 늘거나 줄어듦</li>
<li>절뚝거림, 뼈가 약해 보임</li>
<li>구토·설사가 계속됨</li>
</ul>

<h2>마지막으로</h2>
<p>집밥은 사랑의 표현일 수 있지만, 영양 균형이 맞아야 건강에 도움이 된다. 레시피는 전문가와 함께 만들고 정기적으로 점검하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/re-evaluating-your-dogs-diet — Cornell Riney Canine Health Center, Re-evaluating your dog's diet",
      "https://vcahospitals.com/know-your-pet/nutrition---home-made-diets — VCA, Nutrition - Home Made Diets",
      "https://www.merckvetmanual.com/management-and-nutrition/nutrition-small-animals/nutritional-requirements-of-small-animals — Merck Veterinary Manual, Nutritional Requirements of Small Animals",
    ],
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
    body: `<p>나이 든 고양이에게 "신장이 걱정되니 단백질을 줄여야 한다"는 말을 들은 적이 있을 것이다. 하지만 건강한 노령묘에게 단백질을 줄이면 근육이 줄어들 위험이 있다. 핵심은 신장 질환이 진단되었는지, 어느 단계인지에 따라 달라진다는 점이다.</p>

<h2>건강한 노령묘의 경우</h2>
<ul>
<li>수의학 자료는 단백질이 노화 과정에서 몸을 유지하는 데 중요한 영양소라고 설명한다.</li>
<li>노령묘에게 맞는 단백질, 인, 나트륨의 정확한 비율은 아직 정해지지 않았다고 VCA는 안내한다. 즉 정해진 숫자를 단정할 수 없다.</li>
<li>나이 든 고양이는 증상이 없어도 신장이나 간에 경미한 문제가 있을 수 있다고 가정하고, 인 섭취를 적당히 관리하라는 조언도 있다.</li>
<li>그러므로 건강한 고양이에게 임의로 단백질을 줄이는 것은 권하지 않는다.</li>
</ul>

<h2>신장 질환이 진단되었다면</h2>
<table>
<thead><tr><th>상황</th><th>일반적인 접근</th></tr></thead>
<tbody>
<tr><td>신장 질환 진단 전</td><td>정기 검진(혈액·소변·혈압)으로 확인하고, 식이 변경은 수의사와 상의</td></tr>
<tr><td>신장 질환 진단 후</td><td>인을 조절한 신장 처방식이 주로 쓰인다. 단백질을 어느 정도 조정할지는 병기, 근육 상태, 식욕에 따라 수의사가 판단</td></tr>
<tr><td>식욕이 떨어진 노령묘</td><td>먹는 것이 우선이다. 처방식을 거부하면 영양 부족이 더 큰 문제가 될 수 있어 수의사와 대안을 상의</td></tr>
</tbody>
</table>
<p>사람의 만성 신장 질환에서도 단백질 제한은 근감소 위험과 균형을 봐야 하는 문제로 논의된다. 고양이 연구는 이보다 적어서, 진단 후 식이는 반드시 개체별로 정해야 한다.</p>

<div class="callout-cat">
<strong>이런 변화는 진료 신호</strong><br>
• 물을 많이 마시고 소변이 늘어남<br>
• 체중이 줄고 등뼈와 엉덩이뼈가 도드라짐<br>
• 식욕이 떨어지거나 구토가 반복됨<br>
• 털이 거칠고 입 냄새가 심해짐
</div>

<h2>집에서 할 수 있는 일</h2>
<ul>
<li>6개월~1년마다 혈액·소변·혈압 검사를 받는다 (고령이면 더 자주).</li>
<li>양질의 동물성 단백질이 첫 번째 원료인 사료를 고르되, 구체적인 기준은 수의사와 정한다.</li>
<li>체중과 근육량(등뼈 만졌을 때 느낌)을 정기적으로 확인한다.</li>
<li>수분 섭취를 늘리기 위해 습식 사료를 활용한다.</li>
</ul>

<h2>마지막으로</h2>
<p>"노령묘는 단백질을 줄여라"는 말은 모든 고양이에게 맞지 않는다. 건강한 노령묘는 근육 유지를, 신장 질환이 있는 고양이는 병기에 맞는 식이를 목표로 하고, 어느 쪽이든 정기 검진 결과로 결정하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://vcahospitals.com/know-your-pet/feeding-mature-senior-and-geriatric-cats — VCA, Feeding Mature, Senior, and Geriatric Cats",
      "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/chronic-kidney-disease — Cornell Feline Health Center, Chronic Kidney Disease",
      "https://icatcare.org/articles/chronic-kidney-disease-ckd-in-cats — International Cat Care, Chronic kidney disease (CKD) in cats",
    ],
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
    body: `<p>반려동물이 떠난 지 몇 달 혹은 몇 해가 지났는데도 기일이나 생일, 함께한 계절이 돌아오면 다시 눈물이 나는 경우가 있다. 충분히 슬퍼했다고 생각했는데 왜 또 이러는지 스스로 의아할 수 있지만, 이는 드물지 않은 반응이다.</p>

<h2>기념일 반응이란</h2>
<p>특정한 날짜나 계절이 돌아올 때 슬픔, 불안, 공허함이 다시 강해지는 현상을 기념일 반응이라고 부른다. 사람을 잃은 경우에 흔히 설명되는데, 반려동물을 잃은 슬픔도 가족을 잃은 슬픔과 유사하다고 미국수의사회(AVMA)가 인정한다. 이 반응이 슬픔이 아직 해결되지 않았다는 뜻은 아니다. 그만큼 깊이 사랑했고 기억이 살아 있다는 신호다.</p>

<h2>기일에 더 강하게 느끼는 이유</h2>
<ul>
<li>날짜가 기억을 불러오는 강한 단서가 된다.</li>
<li>그날 있었던 일, 마지막 모습이 선명하게 떠오른다.</li>
<li>계절, 날씨, 빛 같은 감각 자극이 당시와 비슷하면 기억이 더 쉽게 되살아난다.</li>
</ul>

<h2>기일을 보내는 방법</h2>
<table>
<thead><tr><th>방식</th><th>예시</th></tr></thead>
<tbody>
<tr><td>혼자 기억하기</td><td>사진·영상을 보기, 함께 걷던 길 걷기, 좋아하던 간식 사진 올려 두기, 편지나 일기 쓰기</td></tr>
<tr><td>함께 기억하기</td><td>그 아이를 알던 사람과 이야기 나누기, 추모 모임이나 온라인 커뮤니티 참여</td></tr>
<tr><td>의미 있는 행동</td><td>보호소에 소액 기부, 물품 기증, 나무 한 그루 심기(허용된 장소에서)</td></tr>
</tbody>
</table>

<h2>미리 준비하면 도움이 되는 것</h2>
<ul>
<li>기일이 다가오는 시기를 달력에 표시해 두고, 그날의 일정을 가볍게 비워 둔다.</li>
<li>마음이 힘들 때 연락할 사람을 정해 둔다.</li>
<li>무리해서 바쁘게 지내려 하지 않아도 된다. 슬퍼할 시간을 허용하는 것도 괜찮다.</li>
</ul>

<div class="callout-cat">
<strong>전문 도움이 필요한 신호</strong><br>
• 몇 주 이상 잠을 거의 못 자거나 식사를 못 한다<br>
• 일상생활(출근·가사)을 유지하기 어렵다<br>
• 스스로를 해치고 싶은 생각이 든다 → 즉시 정신건강 위기상담(109) 또는 가까운 의료기관에 연락한다
</div>

<h2>마지막으로</h2>
<p>기일은 해마다 찾아오고, 해마다 조금씩 다르게 아프다. 많은 사람에게 시간이 지나면서 날카로운 아픔은 점차 따뜻한 그리움으로 바뀐다. 그 과정을 서두르지 않아도 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://avma.org/resources-tools/avma-policies/avma-animal-loss-support-services — AVMA, Animal loss support services",
      "https://www.samhsa.gov/resource/dbhis/pet-loss-grief — SAMHSA, Pet Loss and Grief",
      "https://vcahospitals.com/west-los-angeles/specialty/departments/pet-loss-support — VCA West Los Angeles, Pet Loss Support",
    ],
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
