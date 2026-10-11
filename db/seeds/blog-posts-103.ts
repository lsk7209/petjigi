import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 103 — cat3×2 + cat1×1 + cat5×1 + cat2×1 = 5편 (IDs 636-640)
// Macros: D, A, B, F, G
// Angles: RA2, RA1, RA5, RA4, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-636",
    slug: "dog-pannus-eye-disease",
    type: "blog",
    category: 3,
    title: "강아지 파누스(각막 혈관 신생) — 셰퍼드·콜리 보호자 필독",
    subtitle: "파누스 원인, 증상, UV 노출 위험, 치료와 장기 관리",
    metaTitle: "강아지 파누스 — 원인·UV 위험·치료·장기 관리 가이드 | 펫지기",
    metaDescription: "강아지 파누스(각막 혈관 신생) 원인과 치료. 셰퍼드·콜리에서 흔한 이 질환의 증상, UV 노출 악화, 점안제 치료, 선글라스 착용 방법을 정리했습니다.",
    body: `<p>저먼 셰퍼드나 시베리안 허스키 같은 견종에서 눈이 점점 흐려지고 각막에 혈관이 자라는 경우가 있다. 이 질환을 파누스(만성 표재성 각막염)라고 한다. 완치는 어렵지만 관리하면 시력을 지킬 수 있는 경우가 많으므로, 초기 신호와 관리법을 알아 두자.</p>

<h2>파누스란</h2>
<p>파누스는 면역 매개성 각막 질환이다. 각막 표면에 혈관과 색소가 자라 투명성이 떨어지고, 진행하면 시력에 영향을 줄 수 있다. 미국수의안과학회(ACVO)는 파누스를 만성 표재성 각막염과 제3안검의 형질세포 침윤을 가리키는 흔한 용어로 설명한다.</p>

<h2>호발 견종</h2>
<p>저먼 셰퍼드가 대표적이며, 오스트레일리안 셰퍼드, 벨지안 테르뷰렌, 보더콜리, 그레이하운드, 시베리안 허스키 등에서도 보고된다.</p>

<h2>증상</h2>
<ul>
<li>각막의 바깥쪽 가장자리부터 분홍색·갈색·희끄무레한 막이 생겨 중심으로 퍼진다</li>
<li>충혈, 눈물, 눈곱</li>
<li>제3안검(눈 안쪽의 막)이 두꺼워지고 색소가 짙어진다</li>
<li>빛에 예민해지거나 눈을 가늘게 뜬다</li>
</ul>

<div class="callout-dog">
<strong>다음 신호는 빠른 진료가 필요</strong><br>
• 눈을 심하게 비비거나 뜨지 못한다 (통증, 궤양 가능성)<br>
• 각막이 파랗거나 하얗게 급격히 변한다<br>
• 눈 모양이 달라지거나 분비물이 누렇다
</div>

<h2>치료와 관리</h2>
<p>파누스는 완치되는 병이 아니라 평생 관리하는 병이다. 대부분 항염증·면역조절 점안제(스테로이드, 사이클로스포린, 타크로리무스 등)로 조절하며, 약의 종류와 점안 횟수는 수의안과 진료를 통해 개체별로 정한다. 임의로 점안약을 바꾸거나 끊지 않는다. 정기적인 재검진으로 약 용량을 조절하는 것이 중요하다.</p>

<h2>자외선 관리</h2>
<p>자외선은 파누스를 악화시키는 요인으로 알려져 있다. 고지대나 햇빛이 강한 지역일수록 영향이 클 수 있다.</p>
<ul>
<li>한낮 직사광선 아래의 장시간 야외 활동을 줄인다.</li>
<li>개용 UV 차단 고글을 쓰는 방법도 있다. 착용에 익숙해지도록 훈련한다.</li>
<li>눈 주변을 자극하는 먼지·연기를 줄인다.</li>
</ul>

<h2>마지막으로</h2>
<p>조기에 치료를 시작하면 시력을 유지하는 경우가 많다. 호발 견종을 키운다면 눈 모양 변화가 보일 때 바로 안과 진료를 받고, 점안 일정을 꾸준히 지키자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.acvo.org/tips-treatments-tricks/somethings-growing-on-my-dogs-eyes — 미국수의안과학회(ACVO), Chronic Superficial Keratitis and Plasma Cell Infiltrate of the Third Eyelids",
      "https://indyanimaleyeclinic.com/chronic-superficial-keratitis-pannus-dogs/ — Indiana Animal Eye Clinic, Chronic Superficial Keratitis (Pannus)",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-29T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-637",
    slug: "cat-aortic-thromboembolism-guide",
    type: "blog",
    category: 3,
    title: "고양이 대동맥 혈전 색전증 — 갑자기 뒷다리가 마비되는 응급",
    subtitle: "ATE 원인(심근병증 연관), 증상, 생존 예후, 예방을 위한 심장 검진",
    metaTitle: "고양이 대동맥 혈전 색전증 — 뒷다리 마비 응급 원인과 예후 | 펫지기",
    metaDescription: "고양이 대동맥 혈전 색전증(ATE) 원인과 예후. 갑작스러운 뒷다리 마비 증상, 심근병증과의 관계, 생존 가능성, 예방을 위한 심장 검진 방법을 정리했습니다.",
    body: `<p>고양이가 갑자기 뒷다리를 못 쓰고 비명을 지르며, 발이 차갑고 창백하거나 푸르다면 대동맥 혈전 색전증(ATE, 안장 혈전)일 수 있다. 응급 상황이므로 지체 없이 동물병원 응급실로 가야 한다.</p>

<h2>대동맥 혈전 색전증이란</h2>
<p>심장에서 생긴 혈전이 대동맥 끝(뒷다리로 갈라지는 지점)에 걸려 혈액 공급이 막히는 상태다. 중년의 수컷에서 더 흔하다고 알려져 있으며, 근본 원인은 대개 비대성 심근병증 같은 심장 질환이다. 심장 질환이 미리 진단되지 않은 고양이에서 처음으로 나타나는 경우도 많다.</p>

<h2>증상</h2>
<div class="callout-cat">
<strong>이런 증상이 갑자기 나타난다</strong><br>
• 한쪽 또는 양쪽 뒷다리의 갑작스러운 마비·절뚝임<br>
• 극심한 통증으로 울부짖음<br>
• 뒷다리 발바닥이 차고 창백하거나 푸른색<br>
• 빠르고 힘든 호흡, 입을 벌린 호흡<br>
• 구토, 불안, 숨는 행동<br>
→ 즉시 응급 병원으로 이동하며, 출발 전에 증상을 알려 준다
</div>

<h2>병원에서 하는 일</h2>
<ul>
<li>통증 조절과 안정화, 산소 공급</li>
<li>심장 초음파·흉부 방사선으로 심장 질환 확인</li>
<li>혈액 검사 (신장, 전해질)</li>
<li>혈전 치료 및 재발 예방 약물, 심부전이 있으면 그 치료</li>
</ul>

<h2>예후</h2>
<p>ATE는 예후가 좋지 않은 경우가 많다. 증상이 심하고 심부전이 동반되면 안락사를 고민해야 할 만큼 힘든 경우도 있고, 치료 반응이 좋으면 다리 기능이 돌아오기도 한다. 재발 가능성이 있어서 퇴원 후에도 심장 관리와 약물 치료가 필요할 수 있다. 정확한 예후는 고양이의 상태와 원인 질환에 따라 크게 다르므로 담당 수의사와 상의한다.</p>

<h2>사전 예방: 심장 질환 조기 발견</h2>
<ul>
<li>중년 이후, 특히 비대성 심근병증 호발 품종(메인쿤, 래그돌 등)은 정기 심장 검진을 고려한다.</li>
<li>안정 시 호흡수가 빠르거나 숨이 가쁘면 병원에 문의한다. 집에서 자는 동안 호흡수를 세어 기록하는 방법이 널리 권장된다.</li>
<li>심장 잡음이 들린다는 진단을 받았다면 초음파로 원인을 확인한다.</li>
</ul>

<h2>마지막으로</h2>
<p>갑작스러운 뒷다리 마비와 극심한 통증은 시간이 중요하다. 집에서 지켜보지 말고 즉시 응급 병원으로 가자. 평소 호흡수 기록과 정기 검진이 위험을 줄이는 최선의 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://gsvs.org/blog/signs-of-saddle-thrombus-time-sensitive-pet-emergency/ — Great Southern Veterinary, Signs of Saddle Thrombus: A Time-Sensitive Pet Emergency",
      "https://cats.com/feline-aortic-thromboembolism — cats.com, Feline Aortic Thromboembolism (FATE): Causes, Symptoms, & Treatment",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 상황에서는 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-11-29T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-638",
    slug: "designer-dog-crossbreed-reality",
    type: "blog",
    category: 1,
    title: "디자이너 견종의 현실 — 말티푸·포메라니안믹스는 정말 건강한가",
    subtitle: "교배종 건강 주장의 과학적 근거, 실제 건강 위험, 책임 있는 선택",
    metaTitle: "디자이너 견종 건강 현실 — 말티푸·교배종의 실제 위험 | 펫지기",
    metaDescription: "디자이너 견종(말티푸·포메믹스 등)의 건강 주장을 과학적으로 분석했습니다. 교배종이 건강하다는 주장의 근거, 실제 위험, 책임 있는 입양 방법을 정리했습니다.",
    body: `<p>"교배종이 순종보다 건강하다"는 말이 있다. 부분적으로 맞지만, 디자이너 견종 산업의 마케팅 문구이기도 하다.</p>

<h2>교배종 건강 주장의 근거와 한계</h2>
<p>혼혈 강세(Hybrid Vigor)는 유전적 다양성이 높아 일부 열성 유전 질환 발현이 낮아지는 현상이다. 그러나 교배종도 부모 양측의 유전 질환을 모두 가질 수 있다.</p>

<h2>디자이너 견종의 실제 문제</h2>
<div class="callout-dog">
<strong>교배종 건강 위험 현실</strong><br>
• 1세대(F1) 교배종: 부모 유전 질환 불예측<br>
• 소형 디자이너 견종 다수: 수두증·저혈당·치아 과밀 위험<br>
• 무허가 브리더가 "건강한 교배종"으로 마케팅하는 경우 많음<br>
• 부모견 유전 검사 여부 확인이 핵심
</div>

<h2>말티푸·포메믹스 등 인기 교배종 주의사항</h2>
<ul>
<li>부모견(말티즈·푸들 등)의 유전 질환 각각 파악</li>
<li>두 품종의 유전 질환이 합쳐질 가능성 이해</li>
<li>소형 믹스: 저혈당·슬개골 탈구·치아 문제 흔함</li>
</ul>

<h2>책임 있는 선택</h2>
<ul>
<li>부모견 유전 검사 결과 요청</li>
<li>윤리적 브리더 찾기 (방문 가능, 부모 공개)</li>
<li>보호소 혼혈견 입양 고려 — 진정한 혼혈 강세 + 구조 동물 지원</li>
</ul>

<h2>마지막으로</h2>
<p>교배종이 나쁜 것이 아니다. 그러나 "교배종 = 자동으로 건강" 공식은 없다. 부모의 건강과 브리더의 책임감이 품종보다 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bellumori, T.P. et al. — Prevalence of inherited disorders in mixed- and purebred dogs. JAVMA 2013",
      "한국동물복지협회 교배종 건강 정보 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-30T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-639",
    slug: "dog-daily-health-check-routine",
    type: "blog",
    category: 5,
    title: "강아지 매일 하는 건강 체크 — 3분으로 이상 신호 조기 발견",
    subtitle: "눈·귀·코·입·발·피부 체크 방법, 기록 습관, 이상 신호 기준",
    metaTitle: "강아지 매일 건강 체크 — 3분 루틴으로 이상 신호 조기 발견 | 펫지기",
    metaDescription: "강아지 매일 3분 건강 체크 방법. 눈·귀·코·입·발·피부 확인 방법, 이상 신호 기준, 체크 기록 습관으로 조기 발견하는 방법을 정리했습니다.",
    body: `<p>강아지의 몸 상태를 집에서 정기적으로 확인하면 이상 신호를 일찍 발견할 수 있다. 수의사의 진찰을 대체하지는 않지만, 평소 모습을 아는 보호자의 관찰은 매우 가치 있다. 코에서 꼬리까지 순서대로 살피는 루틴을 정리했다.</p>

<h2>기본 원칙</h2>
<ul>
<li>강아지가 편안할 때, 조용한 곳에서 한다. 간식과 칭찬으로 좋은 경험을 만든다.</li>
<li>PDSA는 코에서 꼬리 순서로 적어도 일주일에 몇 번 확인하라고 안내한다. 식사·산책 같은 일상 속에서 간단히 보는 것도 좋다.</li>
<li>평소 상태를 기억하거나 사진으로 남겨서 비교한다.</li>
</ul>

<h2>체크리스트</h2>
<table>
<thead><tr><th>부위</th><th>정상</th><th>이상 신호</th></tr></thead>
<tbody>
<tr><td>눈</td><td>맑고 흰자가 깨끗, 양쪽 동공 크기 비슷</td><td>눈곱 증가, 충혈, 눈을 가늘게 뜸, 흐림</td></tr>
<tr><td>코</td><td>콧물 없음</td><td>누런 콧물, 코피, 갈라지고 딱지 앉음</td></tr>
<tr><td>귀</td><td>깨끗하고 냄새 없음</td><td>냄새, 분비물, 붉음, 머리 흔들기</td></tr>
<tr><td>입</td><td>잇몸 분홍색, 심한 입 냄새 없음</td><td>잇몸이 창백·붉음·출혈, 치석 많음, 부러진 이</td></tr>
<tr><td>피부·털</td><td>윤기, 혹 없음</td><td>혹, 발진, 탈모, 비듬, 벼룩 오물(검은 가루)</td></tr>
<tr><td>몸통</td><td>갈비뼈가 가볍게 만져짐, 허리 라인</td><td>복부 팽만, 만지면 아파함, 체중 변화</td></tr>
<tr><td>발·발톱</td><td>패드 매끄러움, 발가락 사이 깨끗</td><td>갈라짐, 붓기, 발톱 부러짐, 절뚝임, 핥기</td></tr>
<tr><td>항문·생식기</td><td>깨끗</td><td>분비물, 붓기, 엉덩이를 끌기</td></tr>
</tbody>
</table>

<h2>체형 점수 간단 확인</h2>
<ul>
<li>갈비뼈를 세게 누르지 않고 만질 수 있어야 한다.</li>
<li>위에서 보았을 때 허리 라인이 있고, 옆에서 보았을 때 배가 올라가 있어야 한다.</li>
<li>갈비뼈가 안 만져지면 과체중, 지나치게 튀어나오면 저체중일 수 있다.</li>
</ul>

<h2>매일 관찰할 것</h2>
<ul>
<li>식욕, 음수량</li>
<li>대소변의 양, 모양, 색, 횟수</li>
<li>활동량, 걸음걸이, 호흡</li>
<li>평소와 다른 행동 (숨기, 울음, 공격성)</li>
</ul>

<div class="callout-dog">
<strong>병원에 가야 하는 경우</strong><br>
• 하루 이상 먹지 않거나 물을 마시지 않는다<br>
• 반복되는 구토·설사, 혈변, 혈뇨<br>
• 호흡이 가쁘거나 기침이 계속된다<br>
• 새로 생긴 혹이 커진다
</div>

<h2>마지막으로</h2>
<p>발견한 이상 신호는 날짜와 사진과 함께 기록해 병원에 가져가자. 집에서 진단하려 하지 말고 확인과 기록에 집중하는 것이 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://vcahospitals.com/know-your-pet/giving-your-dog-a-thorough-home-check-up — VCA, Giving your dog a thorough home check-up",
      "https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/all-pets/how-to-give-your-pet-a-health-check-at-home — PDSA, How to give your pet a health check at home",
      "https://www.humaneworld.org/resources/my-dog-sick-try-home-exam — Humane World for Animals, My dog is sick? Try a home exam",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-30T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-640",
    slug: "cat-food-palatability-tips",
    type: "blog",
    category: 2,
    title: "고양이 밥투정 해결 — 사료를 거부하는 고양이 설득하는 방법",
    subtitle: "밥투정 원인 파악, 사료 기호성 높이기, 강제 급여의 위험, 의학적 원인 확인",
    metaTitle: "고양이 밥투정 해결 — 사료 거부 원인과 기호성 높이기 방법 | 펫지기",
    metaDescription: "고양이가 사료를 거부할 때 해결하는 방법. 밥투정 원인 파악, 사료 기호성 높이는 방법, 강제 급여의 위험, 의학적 원인이 숨어있는 경우를 정리했습니다.",
    body: `<p>고양이가 사료를 잘 먹지 않으면 입맛이 까다로운 것인지, 몸이 아픈 것인지부터 구분해야 한다. 입맛 문제라면 온도, 질감, 그릇, 환경을 조정해 볼 수 있다. 다만 하루 이상 거의 먹지 않으면 지방간 위험이 있어 병원에 가야 한다.</p>

<h2>먼저 질환 배제</h2>
<p>식욕 부진의 흔한 원인은 치과 질환, 신장병, 소화기 질환, 통증, 스트레스다. 수의 자료는 먼저 의학적 원인을 배제하는 것이 중요하다고 강조한다. 아래 팁은 이상이 없다고 확인된 뒤 쓰는 것이 안전하다.</p>

<div class="callout-cat">
<strong>이 경우는 지켜보지 말고 병원</strong><br>
• 24시간 이상 거의 먹지 않는다 (특히 비만묘는 며칠 굶으면 지방간이 생길 수 있다)<br>
• 구토·설사, 침 흘림, 입 냄새가 있다<br>
• 체중이 줄고 있다<br>
• 입을 만지지 못하게 하거나 한쪽으로 씹는다
</div>

<h2>입맛을 돌리는 방법</h2>
<table>
<thead><tr><th>방법</th><th>설명</th></tr></thead>
<tbody>
<tr><td>살짝 데우기</td><td>습식 사료를 체온 정도로 살짝 데우면 냄새가 강해져 식욕을 자극한다. 뜨겁지 않게 한다</td></tr>
<tr><td>질감 바꾸기</td><td>무스, 다진 형태, 국물형 등 선호하는 질감을 찾는다</td></tr>
<tr><td>그릇 조정</td><td>넓고 얕은 그릇이 수염이 닿지 않아 편하다. 밥과 물, 화장실은 서로 떨어뜨려 둔다</td></tr>
<tr><td>조용한 환경</td><td>시끄럽거나 다른 동물이 가까운 곳은 피한다</td></tr>
<tr><td>소량 자주</td><td>신선한 사료를 소량씩 자주 준다. 남은 습식은 오래 두지 않는다</td></tr>
<tr><td>토핑 소량</td><td>익힌 닭고기 육수나 참치 국물을 소량 올리는 방법이 소개된다. 양념·소금·양파가 든 음식은 피한다</td></tr>
</tbody>
</table>

<h2>사료를 바꿀 때</h2>
<ul>
<li>새 사료는 기존 사료에 조금씩 섞어 7~10일에 걸쳐 바꾼다.</li>
<li>갑자기 바꾸면 거부하거나 소화 문제가 생길 수 있다.</li>
<li>먹지 않는다고 곧바로 간식으로 채우면 편식이 굳어질 수 있다.</li>
</ul>

<h2>피해야 할 것</h2>
<ul>
<li>사람 음식으로 대신하기 (양파, 마늘, 초콜릿 등은 위험)</li>
<li>며칠 지켜보다가 병원에 가기</li>
<li>억지로 입에 넣어 먹이기 — 스트레스가 되고 흡인 위험이 있다</li>
</ul>

<h2>마지막으로</h2>
<p>고양이의 식욕 변화는 건강의 가장 빠른 신호다. 팁으로 하루 이틀 안에 개선되지 않으면 원인을 찾으러 병원에 가자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://vcacanada.com/know-your-pet/feline-picky-eaters — VCA Canada, My Cat Won't Eat: Feeding Picky Eaters",
      "https://www.pdsa.org.uk/media/9540/phh_cat_s_my-cat-isnt-eating.pdf — PDSA, My cat isn't eating",
      "https://petfolk.com/petfolklore/cat-not-eating-what-to-do — Petfolk, What to do when your cat isn't eating",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-01T09:00:00.000Z",
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
  console.log("블로그 포스트 103차 시딩 완료! (blog-636 ~ blog-640)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
