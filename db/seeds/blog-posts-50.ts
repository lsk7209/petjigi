import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 50 — cat2×1 + cat3×2 + cat5×1 + cat6×1 = 5편 (IDs 371-375)
// Macros: F, A, E, F, B
// Angles: RA2, RA5, RA1, RA4, RA7

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 371 / Cat2 / Macro-F(절차) / Lens-L2 / Hook-H1 / Outro-O2 / Angle-RA2
  {
    id: "blog-371",
    slug: "puppy-food-transition-timing",
    type: "blog",
    category: 2,
    title: "강아지 사료 언제 바꿔야 할까 — 퍼피에서 성견, 성견에서 시니어까지",
    subtitle: "품종별 성견 전환 시기, 전환 중 설사·거부 대처, 성분 비교 포인트",
    metaTitle: "강아지 사료 전환 시기 — 퍼피→성견→시니어 완전 가이드 | 펫지기",
    metaDescription: "강아지 사료를 언제 바꿔야 하는지 품종별로 정리했습니다. 퍼피→성견→시니어 전환 시기, 7~10일 전환 방법, 설사·거부 시 대처법.",
    body: `<p>강아지는 생애 주기에 따라 필요한 영양이 달라진다. 같은 사료를 10년 내내 먹이는 것은 최선이 아닐 수 있다.</p>

<h2>퍼피에서 성견 사료로</h2>
<p>퍼피 사료는 성장을 위해 칼로리·단백질·칼슘이 높다. 성장이 완료된 후에도 퍼피 사료를 계속 먹이면 비만·관절 부담이 생길 수 있다.</p>

<table>
<thead><tr><th>품종 크기</th><th>전환 시기</th></tr></thead>
<tbody>
<tr><td>소형견 (10kg 이하)</td><td>생후 12개월</td></tr>
<tr><td>중형견 (10~25kg)</td><td>생후 12~15개월</td></tr>
<tr><td>대형견 (25~45kg)</td><td>생후 18~24개월</td></tr>
<tr><td>초대형견 (45kg 이상)</td><td>생후 24개월</td></tr>
</tbody>
</table>

<h2>성견에서 시니어 사료로</h2>
<p>7세 이상부터 시니어로 분류되지만, 건강한 강아지는 더 늦게 전환해도 된다. 대형견은 6세부터, 소형견은 7~8세부터가 일반적이다. 수의사의 검진 결과와 체중·활동량을 기준으로 결정한다.</p>

<h2>전환 방법 — 7~10일 점진적</h2>
<div class="callout-dog">
<strong>전환 비율 (일수별)</strong><br>
1~2일: 기존 75% + 신규 25%<br>
3~4일: 기존 50% + 신규 50%<br>
5~6일: 기존 25% + 신규 75%<br>
7일~: 신규 100%
</div>

<h2>전환 중 문제 대처</h2>
<ul>
<li><strong>설사</strong>: 전환 속도를 늦추고 기존 사료 비율을 높인다</li>
<li><strong>거부</strong>: 더 작은 비율(10%)로 시작해 천천히 늘린다</li>
<li><strong>구토</strong>: 즉시 전환 중단하고 기존 사료로 복귀. 사료가 맞지 않을 수 있음.</li>
</ul>

<h2>같은 브랜드 내 전환 vs 다른 브랜드 전환</h2>
<p>같은 브랜드 내에서 라이프스테이지만 바꾸는 경우(예: 로얄캐닌 퍼피 → 로얄캐닌 어덜트)는 소화 적응이 빠르다. 브랜드 자체를 바꾸는 경우는 더 천천히 전환한다.</p>

<h2>마지막으로</h2>
<p>사료 전환은 강아지의 소화 시스템이 새로운 성분에 적응하는 과정이다. 서두르지 않고 7~10일에 걸쳐 진행하면 대부분의 문제를 예방할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AAFCO — Life Stage Labeling for Dog Foods",
      "Waltham Centre for Pet Nutrition — Life Stage Feeding Guidelines",
      "대한수의사회 반려견 사료 전환 권장 지침",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-19T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 372 / Cat3 / Macro-A(원인분석) / Lens-L5 / Hook-H2 / Outro-O1 / Angle-RA5
  {
    id: "blog-372",
    slug: "cat-flutd-lower-urinary-guide",
    type: "blog",
    category: 3,
    title: "고양이 하부 요로기 질환(FLUTD) — 수컷 고양이 보호자가 꼭 알아야 할 것",
    subtitle: "방광염·요석증·특발성방광염·요도막힘 구분, 소변 못 보는 긴급 신호, 예방 식이",
    metaTitle: "고양이 FLUTD 하부 요로기 질환 — 증상·응급 신호·예방 | 펫지기",
    metaDescription: "고양이 FLUTD(하부 요로기 질환)는 수컷에서 요도 막힘으로 응급이 됩니다. 방광염·요석증·특발성 구분, 소변 못 보는 신호, 예방 식이를 정리했습니다.",
    body: `<p>고양이가 화장실을 자주 들락거리면서 소변을 거의 못 보거나, 화장실 밖에서 소변을 본다면 — 하부 요로기 문제를 의심해야 한다. 특히 수컷 고양이에서 요도 막힘이 생기면 생명을 위협하는 응급 상황이 된다.</p>

<h2>FLUTD란</h2>
<p>Feline Lower Urinary Tract Disease. 방광·요도를 포함한 하부 요로기에 영향을 미치는 질환의 총칭이다. 여러 원인이 있다.</p>

<h2>FLUTD 원인 구분</h2>
<table>
<thead><tr><th>원인</th><th>특징</th><th>성별</th></tr></thead>
<tbody>
<tr><td>특발성 방광염(FIC)</td><td>원인 불명, 스트레스 연관. 가장 흔함(50~60%)</td><td>양성 모두, 수컷이 더 위험</td></tr>
<tr><td>요석증(Urolithiasis)</td><td>방광·요도 결석. 스트루바이트·옥살산칼슘</td><td>양성 모두</td></tr>
<tr><td>세균성 방광염</td><td>고양이에서 비교적 드묾. 노령묘·면역저하에서</td><td>양성 모두</td></tr>
<tr><td>요도 마개(Urethral Plug)</td><td>점액+결정+세포 덩어리. 수컷에서 막힘 위험</td><td>수컷</td></tr>
</tbody>
</table>

<h2>즉시 응급실이 필요한 신호</h2>
<div class="callout-cat">
<strong>수컷 고양이 — 소변 못 보면 응급</strong><br>
• 화장실에 자주 가지만 소변이 전혀 안 나옴<br>
• 배에 힘을 주며 고통스러운 표정<br>
• 페니스를 자꾸 핥음<br>
• 무기력해지거나 구토<br>
→ 요도 막힘 의심 — 24시간 내 치료 없으면 사망 가능
</div>

<h2>집에서 할 수 있는 예방</h2>
<ul>
<li><strong>수분 섭취 늘리기</strong>: 습식 사료 비중 높이기, 워터파운틴 설치</li>
<li><strong>스트레스 관리</strong>: 루틴 유지, 충분한 환경 풍요화 (FIC 예방)</li>
<li><strong>요로 처방식</strong>: 요석증 이력이 있다면 수의사 처방 요로 케어 사료</li>
<li><strong>복수 화장실</strong>: 고양이 수 + 1개 원칙, 항상 청결 유지</li>
</ul>

<h2>마지막으로</h2>
<p>FLUTD는 재발이 잦다. 한 번 경험했다면 수분 관리·스트레스 감소를 평생 지속해야 한다. 특히 수컷 중성화 고양이를 키운다면 소변 빈도와 양을 정기적으로 확인하는 습관이 생명을 구할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Hostutler, R.A. et al. — Recent concepts in feline lower urinary tract disease. Vet Clin North Am 2005",
      "ISFM — Feline Lower Urinary Tract Disease Guidelines",
      "한국고양이수의사회 비뇨기 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 소변 이상 시 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-07-20T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 373 / Cat3 / Macro-E(비교) / Lens-L1 / Hook-H4 / Outro-O2 / Angle-RA1
  {
    id: "blog-373",
    slug: "dog-eye-discharge-cherry-eye",
    type: "blog",
    category: 3,
    title: "강아지 눈 분비물과 체리아이 — 정상과 비정상의 경계",
    subtitle: "눈곱 색깔·양 해석, 체리아이(3번째 눈꺼풀 탈출) 원인·치료, 안구 질환 조기 발견 포인트",
    metaTitle: "강아지 눈 분비물·체리아이 가이드 — 정상 vs 비정상 | 펫지기",
    metaDescription: "강아지 눈 분비물 색깔과 양으로 정상·비정상 구분. 체리아이(3번째 눈꺼풀 탈출) 원인과 치료, 안구 질환 조기 발견 체크리스트를 정리했습니다.",
    body: `<p>강아지 눈에 분비물이 생기는 것은 매우 흔하다. 대부분은 정상적인 것이지만, 색깔·양·동반 증상을 보면 문제가 있는지 구분할 수 있다.</p>

<h2>눈 분비물 색깔별 해석</h2>
<table>
<thead><tr><th>색깔</th><th>의미</th><th>대처</th></tr></thead>
<tbody>
<tr><td>투명 또는 약간 노란색</td><td>정상 눈곱</td><td>닦아주기</td></tr>
<tr><td>갈색 (눈물 자국)</td><td>과도한 눈물 분비 (정상 또는 막힌 눈물관)</td><td>자주 닦기, 지속 시 검진</td></tr>
<tr><td>황록색 (짙은 고름)</td><td>세균 감염</td><td>병원 방문 필요</td></tr>
<tr><td>선홍색 (혈액)</td><td>외상·심한 염증</td><td>즉시 병원</td></tr>
</tbody>
</table>

<h2>체리아이(Cherry Eye)란</h2>
<p>강아지의 눈에는 3번째 눈꺼풀(순막, nictitating membrane)이 있다. 체리아이는 이 순막 안에 있는 루빈샘(분비선)이 탈출해 눈 내측 모서리에 붉고 둥근 덩어리가 보이는 상태다. 이름처럼 체리처럼 생겼다.</p>

<h3>주로 발생하는 품종</h3>
<p>코커스패니얼·비글·불독·차우차우·레트리버·샤르페이 — 순막 인대가 약한 품종에서 흔하다.</p>

<h3>치료</h3>
<p>체리아이는 저절로 낫지 않는다. 방치하면 분비선이 건조해져 영구 손상된다. 치료는 수술 — 분비선을 원래 위치로 고정하는 방법(제거 X)이 권장된다. 분비선을 제거하면 건성 각결막염(KCS, dry eye) 위험이 높아진다.</p>

<h2>안구 질환 조기 발견 체크리스트</h2>
<div class="callout-dog">
<strong>정기 확인 항목</strong><br>
□ 눈이 충혈되거나 흐릿해 보임<br>
□ 한쪽 눈을 찡그리거나 자주 깜빡임<br>
□ 빛을 피하는 행동<br>
□ 눈 주변을 자꾸 긁음<br>
□ 동공 크기가 좌우 다름<br>
□ 눈에서 냄새가 남
</div>

<h2>눈물 자국(눈 주위 갈색 착색)</h2>
<p>말티즈·시추·페키니즈 등 흰 털 소형견에서 흔하다. 과도한 눈물이 털에 스며들어 산화되는 것이다. 원인 제거(눈물관 막힘 교정, 음식 알레르기 관리)가 근본 해결이다. 상업용 눈물 자국 제거제는 효과가 제한적이며 자극 성분 주의.</p>

<h2>마지막으로</h2>
<p>눈은 한 번 손상되면 회복이 어렵다. 체리아이·심한 분비물·충혈이 보이면 망설이지 않고 병원을 방문하는 것이 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Gelatt, K.N. — Veterinary Ophthalmology (5th ed.)",
      "American College of Veterinary Ophthalmologists — Cherry Eye Fact Sheet",
      "대한수의안과학회 안과 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-20T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 374 / Cat5 / Macro-F(절차) / Lens-L4 / Hook-H3 / Outro-O3 / Angle-RA4
  {
    id: "blog-374",
    slug: "pet-photo-tips-guide",
    type: "blog",
    category: 5,
    title: "반려동물 사진 잘 찍는 법 — 스마트폰으로 작가 같은 사진 만들기",
    subtitle: "눈높이 앵글, 연속 촬영 활용, 자연광 세팅, 고양이·강아지별 포인트",
    metaTitle: "반려동물 사진 잘 찍는 법 — 스마트폰 촬영 팁 완전 가이드 | 펫지기",
    metaDescription: "스마트폰으로 반려동물 사진을 잘 찍는 방법. 눈높이 앵글, 자연광 활용, 연속 촬영, 고양이와 강아지 사진 찍는 각각의 팁을 정리했습니다.",
    body: `<p>반려동물 사진은 어렵다. 움직이고, 눈을 맞추지 않고, 셔터를 누르는 순간 옆을 보거나 눈을 감는다. 몇 가지 원칙을 알면 훨씬 자주 좋은 사진을 건질 수 있다.</p>

<h2>가장 중요한 원칙 — 눈높이 앵글</h2>
<p>위에서 내려다보고 찍는 사진은 반려동물이 작고 평면적으로 보인다. 반려동물의 눈 높이에서 찍는 것이 가장 생동감 있는 사진을 만든다. 바닥에 엎드리거나 낮게 앉아서 찍자.</p>

<h2>자연광이 최고의 조명</h2>
<ul>
<li>창문 옆 자연광이 실내 최고의 조명이다</li>
<li>직사광선보다 창문에서 약간 떨어진 간접광이 부드럽다</li>
<li>플래시는 눈이 빨개지고 반려동물을 놀라게 한다 — 끄기</li>
<li>실외: 그늘이 있는 흐린 날이 오히려 사진에 좋다. 직사광선은 강한 그림자 생성.</li>
</ul>

<h2>연속 촬영 활용</h2>
<p>스마트폰 연속 촬영 기능을 적극 활용한다 (셔터 버튼 길게 누름). 움직이는 반려동물의 경우 한 번에 10~20장을 찍고 그중 가장 좋은 것을 선택하는 방식이 효과적이다.</p>

<h2>주목을 끄는 방법</h2>
<ul>
<li>간식이나 장난감을 카메라 위에 들거나 옆에 붙이기</li>
<li>재미있는 소리 내기 (쪽쪽·찍찍·바스락)</li>
<li>강아지: 이름을 부른 직후 찍기</li>
<li>고양이: 억지로 눈 맞추려 하지 말고 자연스러운 순간 포착</li>
</ul>

<h2>고양이 사진 특별 팁</h2>
<div class="callout-cat">
<strong>고양이 사진 골든타임</strong><br>
• 일어나기 직전 (눈 초점 선명·움직임 적음)<br>
• 창문 앞에서 밖을 볼 때<br>
• 그루밍 중 잠깐 멈출 때<br>
• 좁은 박스·가방에 들어간 순간
</div>

<h2>강아지 사진 특별 팁</h2>
<ul>
<li>산책 전 에너지가 넘칠 때보다 산책 후 편안한 상태가 포착하기 쉽다</li>
<li>간식이나 공을 든 손을 카메라 방향으로 가져오면 자연스럽게 카메라를 바라봄</li>
<li>놀이 중 액션 사진: 연속 촬영 + 스포츠 모드</li>
</ul>

<h2>마지막으로</h2>
<p>좋은 사진보다 많은 사진이 낫다. 찍으면 찍을수록 좋은 순간을 건질 확률이 높아진다. 나중에 후회하지 않으려면 일상의 평범한 순간들을 자주 찍어두는 것을 권한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "National Geographic — Pet Photography Tips",
      "Android Authority — Smartphone Photography Guide for Pets",
      "한국반려동물사진가협회 촬영 팁 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-21T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 375 / Cat6 / Macro-B(비교) / Lens-L7 / Hook-H8 / Outro-O4 / Angle-RA7
  {
    id: "blog-375",
    slug: "petloss-grief-support-resources",
    type: "blog",
    category: 6,
    title: "펫로스 이후 혼자 감당하지 않아도 된다 — 도움 받을 수 있는 곳들",
    subtitle: "한국 펫로스 지원 기관, 온라인 커뮤니티, 심리 상담 연결 방법, 언제 전문가가 필요한가",
    metaTitle: "펫로스 슬픔 지원 — 도움 받을 수 있는 곳 안내 | 펫지기",
    metaDescription: "반려동물 상실 후 슬픔을 혼자 감당하지 않아도 됩니다. 한국 펫로스 지원 기관, 온라인 커뮤니티, 심리 상담 연결 방법, 전문가가 필요한 시점을 정리했습니다.",
    body: `<p>반려동물을 잃고 나서 "이렇게까지 힘든 게 정상인가?"라는 생각이 든다면 — 정상이다. 그리고 혼자 감당하지 않아도 된다는 것을 알았으면 한다.</p>

<h2>펫로스 슬픔은 진짜 슬픔이다</h2>
<p>과거에는 반려동물 상실이 '단순한 것'으로 여겨졌다. 지금은 심리학에서 펫로스가 인간 관계의 상실과 동급의 슬픔 반응을 유발한다는 것이 인정된다. "그냥 동물인데"라는 말로 자신의 슬픔을 작게 만들 필요가 없다.</p>

<h2>슬픔의 단계는 순서대로 오지 않는다</h2>
<p>퀴블러-로스의 5단계(부정-분노-협상-우울-수용)는 모든 사람에게 같은 순서로 오지 않는다. 어떤 단계를 건너뛰거나, 여러 단계가 동시에 오거나, 이미 지나간 단계로 돌아오기도 한다. 이 모두 정상이다.</p>

<h2>도움을 받을 수 있는 곳</h2>
<h3>국내 펫로스 관련 기관·단체</h3>
<ul>
<li><strong>한국펫로스증후군연구회</strong>: 펫로스 관련 정보 및 상담 연결</li>
<li><strong>동물권행동 카라 — 펫로스 지원</strong>: 상담 프로그램 운영</li>
<li><strong>지역 정신건강복지센터 (1577-0199)</strong>: 무료 심리 상담 연결</li>
</ul>

<h3>온라인 커뮤니티</h3>
<ul>
<li>네이버 카페 '펫로스 극복' 계열 커뮤니티</li>
<li>인스타그램 해시태그 #펫로스 — 같은 경험을 나누는 보호자들</li>
</ul>

<h2>전문 심리 상담이 필요한 시점</h2>
<div class="callout-cat">
<strong>이런 증상이 6주 이상 지속되면 전문가 상담 권장</strong><br>
• 일상 기능 저하 (일·대인관계 어려움)<br>
• 식욕 소실 또는 수면 장애<br>
• 반려동물에 대한 생각이 하루 종일 떠나지 않음<br>
• 깊은 죄책감 ('내가 더 잘했어야 했는데')<br>
• 새 반려동물에 대한 극단적 거부감 또는 집착
</div>

<h2>주변 사람에게 말하기 어려울 때</h2>
<p>"반려동물을 잃은 슬픔이 이렇게 클 줄 몰랐다"라고 이해받지 못하는 경우가 있다. 그럴 때는 같은 경험을 한 사람들과 연결되는 것이 가장 도움이 된다. 온라인 커뮤니티에서 이름 없이 이야기를 나누는 것만으로도 위로가 된다.</p>

<h2>마지막으로</h2>
<p>슬픔을 빨리 끝내려 하지 않아도 된다. 도움을 받는 것이 약한 것이 아니다. 그 슬픔의 크기는 그만큼 깊이 사랑했다는 것이며, 그 사랑은 누구도 빼앗아 갈 수 없다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Worden, J.W. — Grief Counseling and Grief Therapy",
      "Association for Pet Loss and Bereavement — Support Resources",
      "한국펫로스증후군연구회 상담 지원 현황 2024",
    ]),
    disclaimer: "심리적 어려움이 지속된다면 전문 심리 상담사나 정신건강 전문가에게 도움을 요청하세요.",
    status: "published",
    publishedAt: "2026-07-21T11:00:00.000Z",
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
  console.log("블로그 포스트 50차 시딩 완료! (blog-371 ~ blog-375)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
