import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 106 — cat3×2 + cat4×1 + cat1×1 + cat2×1 = 5편 (IDs 651-655)
// Macros: D, A, F, B, G
// Angles: RA7, RA1, RA3, RA8, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-651",
    slug: "cat-chronic-gingivitis-prevention",
    type: "blog",
    category: 3,
    title: "고양이 만성 치은염 예방 — 매일 구강 관리의 실제 효과",
    subtitle: "치은염 진행 단계, 칫솔질 외 대안, VOHC 인증 제품, 스케일링 주기",
    metaTitle: "고양이 만성 치은염 예방 — 칫솔질·대안·스케일링 주기 가이드 | 펫지기",
    metaDescription: "고양이 만성 치은염 예방 방법. 치은염 진행 단계, 칫솔질 대안 제품(VOHC 인증), 적절한 스케일링 주기, 집에서 할 수 있는 구강 관리법을 정리했습니다.",
    body: `<p>고양이의 치주 질환은 성묘에서 매우 흔하다. 하지만 칫솔질을 싫어하는 고양이가 많아서 구강 관리를 포기하는 보호자도 많다. 치은염은 초기에는 되돌릴 수 있으므로, 가능한 방법으로 꾸준히 관리하는 것이 중요하다.</p>

<h2>치은염에서 치주 질환으로</h2>
<table>
<thead><tr><th>단계</th><th>상태</th></tr></thead>
<tbody>
<tr><td>초기 치은염</td><td>잇몸이 붉어지고 붓는다. 이 단계에서는 관리로 되돌릴 수 있다</td></tr>
<tr><td>치주염 시작</td><td>치아를 지지하는 조직이 손상되기 시작한다. 입 냄새가 심해진다</td></tr>
<tr><td>진행된 치주염</td><td>치아가 흔들리고 통증이 생기며 식욕이 떨어진다</td></tr>
<tr><td>치아 소실</td><td>치아를 잃고 감염이 전신에 영향을 줄 수 있다</td></tr>
</tbody>
</table>

<h2>칫솔질이 가장 효과적</h2>
<p>수의 치과 자료는 칫솔질 같은 물리적인 플라그 제거를 가장 효과적인 홈케어로 설명한다. 매일 하는 것이 이상적이고, 어렵더라도 주 몇 회라도 꾸준히 하는 것이 아예 하지 않는 것보다 낫다. 사람용 치약은 고양이에게 해로울 수 있어 반드시 고양이용 치약을 쓴다.</p>

<h3>칫솔질 훈련 순서</h3>
<ol>
<li>손가락에 치약을 묻혀 맛을 보게 한다 (며칠)</li>
<li>손가락으로 잇몸과 이를 부드럽게 문지른다</li>
<li>거즈 또는 손가락 칫솔로 바꾼다</li>
<li>작은 고양이용 칫솔로 이어 간다</li>
<li>매번 칭찬과 보상으로 마무리한다</li>
</ol>

<h2>칫솔질이 어려울 때의 대안</h2>
<p>수의구강보건협의회(VOHC)는 블라인드 시험에서 플라그나 치석을 일정 수준 줄였다고 확인된 제품에 인증을 부여한다. 인증 제품도 질환을 완전히 막는다는 뜻은 아니고 칫솔질보다는 수동적인 방법이지만, 대안으로는 의미가 있다.</p>
<ul>
<li>VOHC 인증 치석 관리 사료·간식</li>
<li>VOHC 인증 구강 관리용 물 첨가제, 젤, 겔 타입 제품</li>
<li>치과용 건사료</li>
</ul>
<p>제품은 고양이용인지, 성분이 안전한지 확인하고 수의사와 상담해 선택한다.</p>

<h2>정기 검진과 스케일링</h2>
<ul>
<li>정기 검진 때 구강 검사를 받는다.</li>
<li>치석이 많거나 잇몸 염증이 있으면 마취 하에 스케일링이 필요할 수 있다.</li>
<li>치아 뿌리 상태는 마취 하 방사선 검사로 확인한다.</li>
</ul>

<div class="callout-cat">
<strong>이런 증상이면 진료</strong><br>
• 입 냄새가 심하고 잇몸이 붉거나 피가 난다<br>
• 먹을 때 한쪽으로 씹거나 사료를 흘린다, 식욕이 줄었다<br>
• 침을 많이 흘리거나 입 주변을 발로 문지른다<br>
• 체중이 줄었다
</div>

<h2>마지막으로</h2>
<p>구강 건강은 고양이의 식욕과 전신 건강에 영향을 준다. 칫솔질이 어렵다면 대안과 정기 검진으로라도 꾸준히 관리하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.veterinarypracticenews.com/practical-home-dental-care/ — Veterinary Practice News, Practical home dental care for dogs and cats",
      "https://www.dvm360.com/view/ultimate-guide-veterinary-dental-home-care — dvm360, Ultimate guide to veterinary dental home care",
      "https://vohc.org — VOHC(Veterinary Oral Health Council), 인증 제품 목록",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-12-06T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-652",
    slug: "dog-meningoencephalitis-guide",
    type: "blog",
    category: 3,
    title: "강아지 수막염·뇌염 — 갑작스러운 신경 증상의 원인",
    subtitle: "MUO(원인불명 수막뇌염) 특징, 증상, 치료, 예후, 고위험 소형견",
    metaTitle: "강아지 수막염·뇌염(MUO) — 원인·증상·치료·예후 가이드 | 펫지기",
    metaDescription: "강아지 수막염·뇌염(MUO) 원인과 치료. 원인불명 수막뇌염 특징, 소형견 고위험, 갑작스러운 신경 증상, 스테로이드 치료와 예후를 정리했습니다.",
    body: `<p>강아지가 갑자기 발작을 하거나, 고개가 한쪽으로 기울고, 균형을 잃거나, 시력에 이상이 생긴다면 뇌와 척수의 염증성 질환일 수 있다. 그중 원인을 알 수 없는 비감염성 뇌수막뇌염을 'MUO(원인 불명 수막뇌염)'라고 부른다. 소형견에서 흔하며 빠른 진단과 치료가 중요하다.</p>

<h2>MUO란</h2>
<p>VCA 자료에 따르면 MUO는 MRI와 뇌척수액 검사로 의심되지만 조직 검사로 확진되지 않은 비감염성 염증성 뇌 질환의 총칭이다. 대표적으로 육아종성 수막뇌염(GME), 괴사성 수막뇌염(NME), 괴사성 백질뇌염(NLE) 등이 포함된다.</p>

<table>
<thead><tr><th>유형</th><th>호발</th></tr></thead>
<tbody>
<tr><td>GME</td><td>나이·견종 제한이 없으나 중년의 소형견, 암컷에서 흔한 편</td></tr>
<tr><td>NME</td><td>퍼그, 말티즈, 치와와 같은 어린 장난감·소형견종</td></tr>
<tr><td>NLE</td><td>요크셔 테리어 등 일부 소형견종</td></tr>
</tbody>
</table>

<h2>증상</h2>
<ul>
<li>발작, 근육 떨림</li>
<li>머리 기울임, 빙글빙글 돌기, 균형 상실, 걸음 이상</li>
<li>시력 저하·실명, 눈동자 크기 차이</li>
<li>행동 변화, 처짐, 목 통증</li>
</ul>
<p>수 일에 걸쳐 급하게 나타나기도 하고, 몇 주~몇 달에 걸쳐 서서히 진행하기도 한다.</p>

<div class="callout-dog">
<strong>즉시 응급 진료</strong><br>
• 발작이 처음 나타났거나 5분 이상 지속, 연달아 반복된다<br>
• 의식이 흐리거나 걷지 못한다<br>
• 목을 만지면 심하게 아파한다
</div>

<h2>진단</h2>
<ol>
<li>신경학적 검사와 혈액 검사</li>
<li>MRI (뇌 병변 확인)</li>
<li>뇌척수액 검사 (염증 세포 확인, 감염 배제)</li>
<li>감염성 원인(세균, 바이러스, 곰팡이, 기생충) 배제 검사</li>
</ol>
<p>비슷한 증상을 보이는 뇌종양, 감염성 뇌염, 대사성 원인 등을 감별해야 해서 신경과 진료가 가능한 병원이 필요할 수 있다.</p>

<h2>치료와 예후</h2>
<p>치료의 중심은 면역억제 치료(스테로이드와 다른 면역억제제 병용)이며, 감염 가능성이 배제되기 전에는 항생제를 쓰기도 한다. 발작이 있으면 항경련제를 사용한다. 약물 프로토콜은 의료진이 개체에 맞춰 정하며, 보호자가 임의로 약을 중단하면 재발할 수 있다.</p>
<p>예후는 유형과 치료 반응에 따라 다르다. 2024년 한 후향 연구에서는 치료를 해도 일정 비율이 진단 초기에 사망하는 것으로 보고되었으며, 한편 치료에 잘 반응해 수개월~수년 안정적으로 지내는 개체도 있다. 재발 가능성이 있어서 장기 추적 검사가 필요하다.</p>

<h2>집에서 도울 수 있는 것</h2>
<ul>
<li>약 복용 시간을 기록하고 정확히 지킨다.</li>
<li>발작 시 영상으로 촬영해 수의사에게 보여 준다. 입에 손을 넣지 않는다.</li>
<li>미끄러운 바닥을 매트로 덮고 높은 곳 이동을 막는다.</li>
<li>스테로이드 부작용(다음·다뇨, 식욕 증가)을 기록하고 정기 검진을 받는다.</li>
</ul>

<h2>마지막으로</h2>
<p>MUO는 진단과 치료에 전문 장비와 경험이 필요한 질환이다. 신경 증상이 보이면 지체하지 말고 신경과 진료가 가능한 병원에서 상담받자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vcahospitals.com/know-your-pet/meningoencephalitis-of-unknown-origin — VCA, Meningoencephalitis of Unknown Origin",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC11099754 — PMC, MUO 후향 연구(2024)",
      "https://vcahospitals.com/know-your-pet/meningitis-in-dogs — VCA, Meningitis in Dogs",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 상황에서는 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-12-07T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-653",
    slug: "pet-international-travel-microchip",
    type: "blog",
    category: 4,
    title: "반려동물 해외 출국·입국 — 마이크로칩·검역·서류 완전 가이드",
    subtitle: "국가별 검역 기준, 마이크로칩 국제 표준, 광견병 항체 검사, 허용 기간",
    metaTitle: "반려동물 해외 여행 — 마이크로칩·검역 서류·국가별 규정 | 펫지기",
    metaDescription: "반려동물과 해외 여행 시 필요한 서류와 절차. 마이크로칩 국제 표준, 광견병 항체 검사, 국가별 검역 기준, 한국 귀국 시 절차를 정리했습니다.",
    body: `<p>반려동물과 해외로 이동하는 것은 복잡한 서류와 절차가 필요하다. 나라마다 다른 기준 때문에 준비를 6개월 이상 전에 시작해야 하는 경우도 있다.</p>

<h2>마이크로칩 국제 표준</h2>
<p>국제 표준 마이크로칩은 ISO 11784/11785 규격(15자리 숫자)이다. 국내 마이크로칩 대부분이 이 규격을 따른다. 오래된 비표준 칩이 있다면 출국 전 확인 필요.</p>

<h2>한국 출국 기본 서류</h2>
<ul>
<li>수의사 발급 건강증명서(영문)</li>
<li>예방접종 증명서(광견병 포함)</li>
<li>마이크로칩 확인서</li>
<li>농림축산검역본부 수출검역증명서</li>
</ul>

<h2>국가별 주요 차이</h2>
<div class="callout-dog">
<strong>대표 국가 검역 기준</strong><br>
• <strong>미국</strong>: 광견병 백신 증명 필수. 하와이·괌은 별도 엄격 기준.<br>
• <strong>유럽 EU</strong>: EU 동물여권 또는 ISO 마이크로칩 + 광견병 항체 검사<br>
• <strong>일본</strong>: 광견병 항체 검사 + 6개월 이상 준비 기간 (가장 엄격)<br>
• <strong>호주·뉴질랜드</strong>: 최소 3~6개월 격리 검역 가능성
</div>

<h2>광견병 항체 검사</h2>
<ul>
<li>일부 국가 입국 시 필수: 0.5 IU/mL 이상이 기준</li>
<li>광견병 예방접종 후 30일 이상 경과 후 채혈</li>
<li>FAVN 검사: 특정 인증 기관에서만 가능</li>
<li>결과까지 2~4주 소요</li>
</ul>

<h2>한국 귀국 시</h2>
<p>한국 입국도 검역이 필요하다. 수출국 발행 건강증명서 + 예방접종 증명서. 일부 국가 출발 시 추가 검역 격리 가능성 있음(고위험 국가).</p>

<h2>마지막으로</h2>
<p>반려동물 해외 여행은 최소 6개월 전 해당 국가 대사관·농림축산검역본부에 최신 기준을 확인하는 것이 필수다. 규정이 자주 바뀐다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "농림축산검역본부 반려동물 수출입 검역 안내",
      "USDA APHIS — Traveling Internationally with Pets",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-07T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-654",
    slug: "large-breed-senior-dog-adoption",
    type: "blog",
    category: 1,
    title: "대형 노령견 입양 — 7살 이상 래브라도·골든의 실제 케어",
    subtitle: "대형 노령견 특유의 건강 과제, 공간·운동 관리, 의료비 현실, 짧지 않은 남은 시간",
    metaTitle: "대형 노령견 입양 — 7살 이상 래브라도·골든 케어 현실 가이드 | 펫지기",
    metaDescription: "대형 노령견 입양을 고려하는 분들을 위한 현실 가이드. 대형견 특유의 건강 과제, 관절·심장 관리, 의료비 준비, 남은 시간을 함께하는 의미를 정리했습니다.",
    body: `<p>대형 노령견은 소형 노령견과 다른 도전이 있다. 그러나 그만큼 보호자에게 돌아오는 것도 크다.</p>

<h2>대형 노령견 특유의 건강 과제</h2>
<ul>
<li>관절 질환: 고관절·슬개골 이형성증 고위험</li>
<li>심장 질환: 확장성 심근병증(DCM) 대형견 발생률 높음</li>
<li>종양: 비장 혈관육종·골육종 대형견 호발</li>
<li>척추 질환: 체중 부하로 인한 디스크 질환</li>
</ul>

<h2>입양 전 준비</h2>
<div class="callout-dog">
<strong>대형 노령견 입양 전 체크</strong><br>
• 충분한 공간: 넓고 장애물 없는 이동 경로<br>
• 미끄럼 방지: 전 가정 매트 필수<br>
• 높이 조절: 낮은 밥그릇 받침대, 낮은 침대<br>
• 계단: 가능하면 경사로로 대체<br>
• 차량: 대형견 보조 계단 또는 리프트
</div>

<h2>의료비 현실</h2>
<ul>
<li>월 기본 관절 보충제·진통제: 3~8만 원</li>
<li>심장 초음파 연 1회: 10~15만 원</li>
<li>응급 수술 가능성: 100~300만 원 대비 필요</li>
<li>대형견 펫보험 가입 가능 여부 미리 확인</li>
</ul>

<h2>짧지 않은 남은 시간</h2>
<p>7살 대형견의 평균 남은 수명은 3~5년이다. 소형견보다 짧지만, 3~5년은 결코 짧지 않다. 그 시간 동안 대형견만이 줄 수 있는 따뜻함과 안정감이 있다.</p>

<h2>마지막으로</h2>
<p>대형 노령견 입양은 더 많은 준비가 필요하지만, 충분한 준비 위에서 시작하면 그 시간은 기억에 남을 것이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국동물복지협회 대형 노령견 입양 현황 보고서",
      "Bonnett, B.N. et al. — Mortality in over 350,000 insured Swedish dogs from 1995–2000. Acta Vet Scand 2005",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-08T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-655",
    slug: "kitten-weaning-solid-food-transition",
    type: "blog",
    category: 2,
    title: "키튼 이유식에서 고형식으로 — 4~8주 전환 단계별 방법",
    subtitle: "이유 시작 시기, 단계별 식이 전환, 고형식 거부 시 대처, 영양 기준",
    metaTitle: "키튼 이유 단계 — 4~8주 이유식·고형식 전환 완전 가이드 | 펫지기",
    metaDescription: "새끼 고양이 이유 과정과 고형식 전환 방법. 이유 시작 적정 시기, 4~8주 단계별 식이 전환, 고형식 거부 시 대처, 키튼 영양 요구량을 정리했습니다.",
    body: `<p>새끼 고양이의 이유 과정은 자연스럽게 진행되지만, 인위적으로 도와야 하는 경우(구조 키튼 등)에는 올바른 방법이 중요하다.</p>

<h2>이유 시작 시기</h2>
<ul>
<li>자연 이유: 어미가 새끼에게 고형식 먹는 것을 보여주기 시작 (3~4주)</li>
<li>인공 이유: 3~4주령부터 시작 가능</li>
<li>너무 이른 이유 (2주 미만): 소화기 미성숙 → 설사·영양 불량</li>
</ul>

<h2>단계별 전환</h2>
<table>
<thead><tr><th>주령</th><th>식이</th></tr></thead>
<tbody>
<tr><td>3~4주</td><td>KMR(고양이 대용 모유) 위주, 고형 시도 시작</td></tr>
<tr><td>4~5주</td><td>KMR + 고형 습식 사료 1:1 퓌레 형태</td></tr>
<tr><td>5~6주</td><td>점차 고형식 비율 높이기</td></tr>
<tr><td>7~8주</td><td>고형 습식 사료 주식, KMR 보완</td></tr>
<tr><td>8주 이상</td><td>고형 사료 주식, KMR 중단</td></tr>
</tbody>
</table>

<h2>고형식 거부 시 대처</h2>
<div class="callout-cat">
<strong>이유 거부 대처 방법</strong><br>
• 고형식을 따뜻하게 데우기<br>
• 손가락에 묻혀서 핥게 하기<br>
• 접시 여러 종류 시도<br>
• 억지로 먹이지 않기 (거부감 형성)<br>
• 48시간 이상 먹지 않으면 수의사 확인
</div>

<h2>키튼 영양 기준</h2>
<ul>
<li>키튼 전용 사료: 성묘보다 단백질·지방·칼슘 높음</li>
<li>AAFCO "성장기" 인증 필수</li>
<li>일반 성묘 사료로 키튼 먹이지 말 것 (영양 부족)</li>
</ul>

<h2>마지막으로</h2>
<p>이유 과정은 천천히 진행하는 것이 원칙이다. 서두르면 소화 장애가 오고, 너무 늦으면 모유에만 의존하게 된다. 8주 이전 입양은 이 과정이 완성되지 않았을 가능성이 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국고양이수의사회 키튼 영양 가이드라인",
      "Buffington, C.A.T. et al. — Nutrition assessment guidelines. J Vet Intern Med 2004",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-08T11:00:00.000Z",
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
  console.log("블로그 포스트 106차 시딩 완료! (blog-651 ~ blog-655)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
