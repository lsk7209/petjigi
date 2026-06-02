import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 45 — cat2×2 + cat5×1 + cat4×1 + cat1×1 = 5편 (IDs 346-350)
// Macros: F, A, E, B, F
// Angles: RA5, RA2, RA4, RA7, RA3

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 346 / Cat2 / Macro-F(절차) / Lens-L5 / Hook-H1 / Outro-O2 / Angle-RA5
  {
    id: "blog-346",
    slug: "senior-cat-food-transition-guide",
    type: "blog",
    category: 2,
    title: "7살 이후 고양이 식이 — 시니어 사료로 바꿔야 하는 시점과 방법",
    subtitle: "노령 고양이 영양 변화, 단백질 요구량 유지가 중요한 이유, 신장·체중 상태별 사료 선택",
    metaTitle: "시니어 고양이 사료 전환 시기·방법 완전 가이드 | 펫지기",
    metaDescription: "고양이 7살 이후 시니어 사료로 전환해야 하는 이유와 방법. 노령 고양이 단백질 요구량, 신장·체중 상태별 사료 선택 기준을 정리했습니다.",
    body: `<p>고양이가 7살이 됐다. "이제 시니어 사료로 바꿔야 하나?" 많은 보호자들이 가지는 질문이다. 시니어 전환의 시점은 나이 숫자가 아니라 개체의 건강 상태가 기준이 돼야 한다.</p>

<h2>노령 고양이의 영양 요구 변화</h2>
<ul>
<li><strong>단백질</strong>: 노령묘는 단백질 소화·흡수율이 낮아진다. 오히려 단백질 섭취량을 줄이면 안 된다. 고품질 동물성 단백질이 중요하다.</li>
<li><strong>지방</strong>: 소화율이 낮아지므로 소화 가능한 형태의 지방이 필요하다.</li>
<li><strong>수분</strong>: 신장 기능 보호를 위해 더욱 중요해진다.</li>
<li><strong>인(Phosphorus)</strong>: 신장 질환이 있거나 위험이 높으면 인 제한이 필요하다.</li>
</ul>

<h2>'시니어 사료'는 법적 기준이 없다</h2>
<p>AAFCO 기준에는 '시니어' 라이프스테이지가 공식적으로 정의되어 있지 않다. 브랜드마다 '시니어'의 기준과 영양 조성이 다르다. 일부 시니어 사료는 단백질을 줄이는데, 이것이 오히려 노령묘 근육 소실을 촉진할 수 있다.</p>

<h2>상태별 사료 선택 기준</h2>
<div class="callout-cat">
<strong>건강 상태에 따른 접근</strong><br>
• <strong>건강한 시니어 (7~10세)</strong>: 고단백·고수분 성인 사료 유지 또는 시니어 전용 중 단백질 충분한 제품<br>
• <strong>신장 문제 있는 경우</strong>: 수의사 처방 신장 전용식 (저인·제한 단백질)<br>
• <strong>과체중 시니어</strong>: 저칼로리·고섬유질, 단백질 유지<br>
• <strong>저체중 시니어 (근육 감소)</strong>: 고단백·고칼로리, 습식 비중 높이기
</div>

<h2>전환 방법</h2>
<p>갑자기 바꾸면 소화 불량·거부반응이 올 수 있다. 7~14일에 걸쳐 점진적으로 전환한다. 새 사료를 기존 사료와 섞어 비율을 조금씩 늘린다. 식욕이 떨어지면 진행 속도를 늦춘다.</p>

<h2>수의사 검진과 병행</h2>
<p>시니어 고양이는 연 2회 혈액·소변 검사를 권장한다. 신장 수치(크레아티닌·BUN·SDMA)와 갑상선 호르몬(T4) 확인이 핵심이다. 검사 결과에 따라 사료 선택을 조정하는 것이 가장 정확한 접근이다.</p>

<h2>마지막으로</h2>
<p>'7살 됐으니 시니어 사료'가 아니라 '검진 결과에 맞는 사료'가 맞는 방법이다. 수의사와 상의 없이 단백질을 크게 줄이는 것은 오히려 근육 소실을 가속화할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Laflamme, D.P. — Nutrition for Aging Cats and Dogs. Vet Clin North Am 2005",
      "WSAVA Global Nutrition Committee — Senior Pet Nutrition Guidelines",
      "한국수의영양학회 노령 반려동물 영양 관리 지침",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-07T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 347 / Cat2 / Macro-A(원인분석) / Lens-L2 / Hook-H4 / Outro-O3 / Angle-RA2
  {
    id: "blog-347",
    slug: "dog-treat-selection-guide",
    type: "blog",
    category: 2,
    title: "강아지 간식 고르는 법 — 맛있고 안전한 간식의 기준",
    subtitle: "간식 칼로리 10% 규칙, 독성 성분 체크리스트, 기능성 간식 효과 검증, 집에서 만드는 안전한 간식",
    metaTitle: "강아지 간식 고르는 기준 — 안전 성분·칼로리·독성 체크 | 펫지기",
    metaDescription: "강아지 간식 선택 기준. 10% 칼로리 규칙, 자일리톨·포도·양파 등 독성 성분 체크, 기능성 간식 효과, 집에서 만드는 안전한 간식 방법.",
    body: `<p>간식은 훈련 도구이자 유대감을 쌓는 수단이지만, 잘못 선택하면 건강 문제로 이어진다. 무엇을 봐야 하는지 알면 고르기가 훨씬 쉬워진다.</p>

<h2>10% 규칙</h2>
<p>간식은 하루 총 칼로리의 10% 이내여야 한다. 하루 500kcal를 먹는 강아지라면 간식은 50kcal 이하. 작은 트릿 하나가 얼마인지 알고 주는 것이 중요하다. 대부분의 보호자는 간식 칼로리를 과소평가한다.</p>

<h2>독성 성분 체크리스트</h2>
<div class="callout-dog">
<strong>강아지에게 절대 금지인 성분</strong><br>
• <strong>자일리톨</strong>: 껌·당류에 사용. 저혈당·간부전 유발.<br>
• <strong>포도·건포도</strong>: 소량도 신장 부전 가능.<br>
• <strong>양파·마늘·파·부추</strong>: 적혈구 파괴.<br>
• <strong>초콜릿·카카오</strong>: 테오브로민 독성.<br>
• <strong>마카다미아</strong>: 신경·근육 증상.<br>
• <strong>아보카도</strong>: 퍼신 성분 독성.<br>
• <strong>소금·나트륨 과다</strong>: 신장 부담.
</div>

<h2>성분표에서 확인할 것</h2>
<ul>
<li>첫 번째 원료가 동물성 단백질인지</li>
<li>인공 방부제(BHA·BHT·에톡시퀸)가 없는지</li>
<li>인공 색소·향미제가 없는지</li>
<li>'천연 향미' 표기도 출처가 불분명한 경우 있음</li>
</ul>

<h2>기능성 간식 효과 검증</h2>
<ul>
<li><strong>덴탈 츄</strong>: VOHC(수의구강건강위원회) 인증 제품만 효과 검증됨</li>
<li><strong>관절 간식 (글루코사민·콘드로이틴)</strong>: 함량이 충분한 제품이어야 효과 가능. 대부분 간식의 함량은 치료 용량에 미달.</li>
<li><strong>프로바이오틱스 간식</strong>: 유산균 균수·균종이 명시된 제품 선택</li>
<li><strong>스트레스 간식 (L-트리프토판·멜라토닌)</strong>: 보조 효과는 있으나 심한 불안증에는 수의사 상담 필요</li>
</ul>

<h2>안전한 홈메이드 간식</h2>
<ul>
<li><strong>닭가슴살 에어프라이어 육포</strong>: 간 없이 얇게 썰어 150도 40~60분. 냉장 5일.</li>
<li><strong>당근·오이 조각</strong>: 칼로리 낮고 씹는 자극. 대부분의 강아지가 좋아함.</li>
<li><strong>삶은 달걀 흰자</strong>: 고단백 저지방. 노른자는 지방 높아 소량만.</li>
<li><strong>블루베리·수박 (씨 제거)</strong>: 항산화 간식. 너무 많이 주면 설사.</li>
</ul>

<h2>마지막으로</h2>
<p>비싼 간식이 항상 좋은 것은 아니다. 성분표를 읽고, 독성 성분이 없으며, 칼로리를 관리할 수 있는 간식이 좋은 간식이다. 훈련용 작은 트릿이라면 한 번에 한 개씩, 칼로리를 계산하며 줄 것을 권한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA Animal Poison Control Center — Toxic and Non-Toxic Foods",
      "Veterinary Oral Health Council (VOHC) — Accepted Products",
      "한국수의영양학회 간식 급여 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-07T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 348 / Cat5 / Macro-E(비교) / Lens-L4 / Hook-H3 / Outro-O2 / Angle-RA4
  {
    id: "blog-348",
    slug: "two-cats-introduction-guide",
    type: "blog",
    category: 5,
    title: "고양이 두 마리 합사 — 성공과 실패를 가르는 4~6주 단계별 프로토콜",
    subtitle: "바로 합치면 안 되는 이유, 냄새 교환·시각 접촉·직접 접촉 3단계, 실패 신호 대처",
    metaTitle: "고양이 합사 단계별 가이드 — 4~6주 프로토콜 | 펫지기",
    metaDescription: "고양이 두 마리 합사 성공 방법. 바로 합치면 안 되는 이유, 냄새 교환·시각 접촉·직접 접촉 3단계 프로토콜, 실패 신호 대처법을 정리했습니다.",
    body: `<p>두 번째 고양이를 데려오면서 "잘 지내겠지"라며 바로 합쳤다가 피투성이 싸움이 나는 경우가 많다. 고양이 합사는 서두르면 실패하고, 기다리면 성공한다.</p>

<h2>왜 바로 합치면 안 되는가</h2>
<p>고양이는 강한 영역 동물이다. 기존 고양이 입장에서 새 고양이는 갑자기 자신의 영역에 침입한 낯선 존재다. 서로에게 준비 없이 만나게 하면 첫인상이 '위협'이 되어버리고, 이 기억을 지우기가 훨씬 어렵다.</p>

<h2>합사 3단계 프로토콜</h2>
<h3>1단계: 냄새 교환 (1~2주)</h3>
<p>새 고양이는 별도의 방에 격리한다. 밥그릇이나 담요를 두 고양이 방 사이에서 교환해 서로의 냄새를 접하게 한다. 문 아래 간식을 놓아 서로의 냄새와 긍정 경험을 연결한다. 두 고양이 모두 문 앞에서 간식을 먹으면 다음 단계로.</p>

<h3>2단계: 시각 접촉 (1~2주)</h3>
<p>아기 게이트 또는 문을 살짝 열어 서로를 볼 수 있지만 직접 접촉은 불가능하게 한다. 서로를 보는 동안 간식을 주어 긍정 연상을 만든다. 으르렁거리거나 하악질을 하면 뒤로 돌아가 다시 시간을 준다.</p>

<h3>3단계: 직접 접촉 (점진적)</h3>
<p>처음에는 짧게(5~10분), 보호자가 있는 상태에서 직접 만나게 한다. 한 고양이가 다른 고양이를 집요하게 쫓거나 하악질이 지속되면 즉시 분리한다. 점진적으로 시간을 늘려간다.</p>

<h2>좋은 신호 vs 나쁜 신호</h2>
<div class="callout-cat">
<strong>좋은 신호</strong>: 서로 무시하기, 같은 방에 있기, 같은 간식 먹기, 코 인사<br>
<strong>나쁜 신호</strong>: 한 고양이가 숨어서 안 나옴, 식욕·화장실 이용 감소, 털 뭉치, 상처
</div>

<h2>기존 고양이가 우울해진다면</h2>
<p>새 고양이 합류 후 기존 고양이의 식욕·화장실 이용이 줄거나 숨기만 한다면 스트레스가 큰 것이다. 기존 고양이와의 1:1 놀이 시간을 늘리고, 새 고양이 격리 기간을 연장한다. 페로몬 디퓨저(펠리웨이)가 일부 도움이 된다.</p>

<h2>합사가 영원히 안 맞는 경우</h2>
<p>모든 고양이가 다른 고양이와 잘 지낼 수는 없다. 수개월의 시도 후에도 지속적인 싸움이 있다면 영구 분리(각자의 공간)가 필요할 수 있다. 이것은 실패가 아니라 두 고양이의 개성을 인정하는 것이다.</p>

<h2>마지막으로</h2>
<p>합사의 성공률은 충분한 준비 기간이 결정한다. 급할수록 돌아가라 — 4~6주의 인내가 10년의 평화로운 동거를 만든다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "International Cat Care — Introducing a New Cat to Your Home",
      "Pam Johnson-Bennett — Think Like a Cat: How to Raise a Well-Adjusted Cat",
      "한국고양이보호협회 다묘 가정 합사 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-08T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 349 / Cat4 / Macro-B(비교) / Lens-L7 / Hook-H5 / Outro-O1 / Angle-RA7
  {
    id: "blog-349",
    slug: "pet-apartment-rules-guide",
    type: "blog",
    category: 4,
    title: "아파트·공동주택 반려동물 규정 — 키울 수 있는 권리와 이웃과의 경계",
    subtitle: "관리규약 효력·한계, 층간 소음·냄새 분쟁 대처, 엘리베이터 이용 규칙, 입주민 권리 구제",
    metaTitle: "아파트 반려동물 규정 — 권리·분쟁·엘리베이터 규칙 가이드 | 펫지기",
    metaDescription: "아파트 관리규약의 반려동물 규정 효력과 한계. 층간 소음·냄새 분쟁 대처법, 엘리베이터 이용 규칙, 입주민 권리 구제 방법을 정리했습니다.",
    body: `<p>아파트에서 반려동물을 키우다 보면 관리규약·이웃과의 갈등에 부딪히는 경우가 있다. 어디까지가 규약이고, 어디서 내 권리가 시작되는지 알아야 올바르게 대응할 수 있다.</p>

<h2>아파트 관리규약의 효력</h2>
<p>공동주택 관리규약은 입주민 전체 동의로 만든 자치 규범이다. 법령 범위 내에서 규약을 정할 수 있지만, 법률에 위배되거나 지나치게 재산권을 침해하는 규약은 효력이 없을 수 있다.</p>

<p>'반려동물 금지' 규약이 있어도: 이미 키우고 있던 경우·소형 반려동물·소음이 없는 경우 등 세부 상황에 따라 일괄 적용이 제한될 수 있다. 법원 판례는 일방적 반려동물 금지 규약에 엇갈리는 경우가 있다.</p>

<h2>엘리베이터 이용 규칙</h2>
<ul>
<li>대부분 아파트 규약: 동물 이동 시 이동장 또는 목줄 착용 + 엘리베이터 다른 사람 없을 때 이용</li>
<li>법적 의무 규정은 없으나 공동 예절로 통용됨</li>
<li>반려동물을 무서워하는 이웃을 배려하는 것이 갈등 예방에 효과적</li>
</ul>

<h2>이웃 분쟁 유형과 대처</h2>
<h3>층간 소음 (짖음)</h3>
<p>관리사무소를 통한 중재 요청이 첫 단계다. 소음이 지속되면 환경부 층간소음이웃사이센터(1661-2642)를 통해 조정 신청 가능하다. 극단적인 경우 경범죄처벌법(반복적 소음)으로 고발 가능하다.</p>

<h3>냄새 문제</h3>
<p>공용 공간(복도·로비)에 냄새가 퍼지면 관리규약 위반으로 제재 대상이 될 수 있다. 배변 위생 관리, 공용 공간 즉시 처리가 의무다.</p>

<h3>알레르기 주장</h3>
<p>이웃의 반려동물 알레르기를 이유로 키우지 말 것을 요구하는 것은 법적 구속력이 없다.</p>

<div class="callout-cat">
<strong>분쟁 단계별 접근</strong><br>
1단계: 직접 대화 (가장 효과적)<br>
2단계: 관리사무소 중재 요청<br>
3단계: 지자체 분쟁조정위원회<br>
4단계: 법원 민사 조정·소송
</div>

<h2>임대 주택에서 반려동물</h2>
<p>임대차 계약서에 '반려동물 금지'가 명시된 경우 임대인의 동의 없이 키우면 계약 위반이 될 수 있다. 입주 전 반드시 반려동물 허용 여부를 명시적으로 확인하고 특약에 기재해야 한다. 이미 기르고 있다면 임대인과 합의해 계약서 수정을 권장한다.</p>

<h2>마지막으로</h2>
<p>아파트에서 반려동물을 키우는 것은 권리다. 동시에 공동체 안에서 이웃을 배려하는 것도 책임이다. 먼저 배려를 실천하면 대부분의 분쟁은 예방할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "공동주택관리법 제18조 (관리규약의 준칙)",
      "환경부 층간소음이웃사이센터 분쟁 처리 사례 2024",
      "한국소비자원 반려동물 관련 분쟁 조정 사례집",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 법적 분쟁은 관련 기관에 문의하세요.",
    status: "published",
    publishedAt: "2026-07-08T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 350 / Cat1 / Macro-F(절차) / Lens-L3 / Hook-H1 / Outro-O3 / Angle-RA3
  {
    id: "blog-350",
    slug: "puppy-first-vet-visit-guide",
    type: "blog",
    category: 1,
    title: "강아지 첫 동물병원 방문 — 무엇을 확인하고 무엇을 질문할까",
    subtitle: "첫 방문 시기, 챙겨야 할 것, 수의사에게 할 질문 15가지, 예방접종 일정 수립",
    metaTitle: "강아지 첫 동물병원 방문 완전 가이드 — 질문 15가지 | 펫지기",
    metaDescription: "강아지 처음 동물병원 방문 시 확인할 것과 수의사에게 할 질문 15가지. 챙겨갈 것, 예방접종 일정, 중성화 시기까지 정리했습니다.",
    body: `<p>강아지를 처음 데려오면 동물병원 방문이 필수다. 입양 후 1주일 이내를 권장한다. 첫 방문에서 무엇을 확인하고 어떤 질문을 해야 할지 알고 가면 훨씬 알찬 시간이 된다.</p>

<h2>첫 방문 시 챙겨야 할 것</h2>
<ul>
<li>대변 샘플 (기생충 검사용 — 신선할수록 좋음)</li>
<li>이전 접종 기록 (있는 경우)</li>
<li>현재 먹이는 사료 이름·사진</li>
<li>분양처·입양처 정보 (병원 이력이 있다면)</li>
<li>메모한 질문 목록</li>
</ul>

<h2>수의사에게 할 질문 15가지</h2>
<div class="callout-dog">
<strong>예방·관리</strong><br>
1. 예방접종 일정이 어떻게 되나요?<br>
2. 심장사상충·내외부 기생충 예방약 어떻게 주나요?<br>
3. 중성화 수술 적절한 시기가 언제인가요?<br>
4. 이 나이에 먹어도 되는 사료 칼로리가 얼마인가요?<br>
5. 동물 등록은 어디서 할 수 있나요?<br><br>
<strong>건강 상태</strong><br>
6. 지금 체형이 적정한가요?<br>
7. 귀·눈·피부 상태가 정상인가요?<br>
8. 치아 상태가 어떤가요?<br>
9. 대변 검사 결과가 어떻게 됐나요?<br>
10. 이 품종에 특히 주의해야 할 유전 질환이 있나요?<br><br>
<strong>응급·관리</strong><br>
11. 이 병원의 야간·응급 대응이 어떻게 되나요?<br>
12. 구토·설사 시 집에서 할 수 있는 것이 있나요?<br>
13. 중성화 전 임신을 막으려면 어떻게 해야 하나요?<br>
14. 사회화 훈련에 대해 조언해주실 수 있나요?<br>
15. 다음 방문은 언제 오면 되나요?
</div>

<h2>예방접종 기본 일정 (강아지)</h2>
<table>
<thead><tr><th>주령</th><th>접종 내용</th></tr></thead>
<tbody>
<tr><td>6~8주</td><td>DHPP 1차 (종합백신: 홍역·간염·파보·파라인플루엔자)</td></tr>
<tr><td>10~12주</td><td>DHPP 2차 + 보르데텔라(켄넬코프) + 렙토스피라</td></tr>
<tr><td>14~16주</td><td>DHPP 3차 + 광견병 1차</td></tr>
<tr><td>12~16개월</td><td>DHPP + 광견병 추가 (1년 후)</td></tr>
<tr><td>이후</td><td>DHPP 1~3년마다, 광견병 매년 또는 3년마다</td></tr>
</tbody>
</table>

<h2>첫 방문에서 확인되는 것들</h2>
<ul>
<li>전반적 건강 상태 (체중·체형·활력)</li>
<li>귀진드기·벼룩·피부 상태</li>
<li>심장·폐 청진</li>
<li>안구·구강 검사</li>
<li>복부 촉진 (장·신장·비장 등)</li>
</ul>

<h2>마지막으로</h2>
<p>첫 방문은 단순한 건강 검진이 아니라 앞으로 10년 이상 함께할 수의사를 찾는 과정이기도 하다. 질문에 성의 있게 답해주고, 설명이 이해하기 쉬운 수의사를 선택하는 것이 장기적으로 더 중요할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Animal Hospital Association (AAHA) — Puppy Vaccination Guidelines 2022",
      "한국수의사회 반려동물 예방접종 권장 일정",
      "Cornell University — Your New Puppy: First Veterinary Visit",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-09T09:00:00.000Z",
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
  console.log("블로그 포스트 45차 시딩 완료! (blog-346 ~ blog-350)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
