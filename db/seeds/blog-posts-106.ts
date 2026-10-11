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
    body: `<p>반려동물과 해외로 이동하려면 도착 국가의 입국 요건을 충족하고 우리나라에서 출국 검역을 받아야 한다. 국가별 요건이 크게 다르고 준비에 시간이 오래 걸리므로 일정에 여유를 두어야 한다. 이 글은 일반적인 순서와 확인할 점을 정리하며, 최신 요건은 검역본부와 도착 국가의 공고를 확인해야 한다.</p>

<h2>출국 절차의 큰 흐름</h2>
<ol>
<li><strong>도착 국가의 요건 확인</strong>: 월령 제한, 필수 예방접종, 마이크로칩 규격, 광견병 항체검사 요구 여부, 사전 허가 필요 여부, 동반 마릿수 제한을 먼저 확인한다. 농림축산검역본부 누리집의 수출국가별 검역조건에서 볼 수 있다.</li>
<li><strong>마이크로칩·동물등록</strong>: 국가에서 요구하는 규격의 마이크로칩을 삽입한다. 칩 번호가 서류에 맞게 기재되어야 하고, 접종·검사 순서가 중요한 국가가 많아 칩을 먼저 확인한다.</li>
<li><strong>예방접종·광견병 항체검사</strong>: 요구하는 접종을 받고, 필요한 국가는 광견병 항체가 검사를 받는다. 검사 기관과 대기 기간은 국가와 시기에 따라 달라질 수 있다.</li>
<li><strong>건강증명서 발급</strong>: 동물병원에서 방문 국가가 요구하는 양식의 건강증명서를 발급받는다.</li>
<li><strong>검역 예약·검역</strong>: 검역본부의 수출 반려동물 검역 예약 시스템으로 예약한 뒤, 예약일에 건강증명서와 부속서류를 가지고 동물과 함께 방문해 동물검역증명서를 받는다. 마이크로칩 번호 등을 현장에서 확인하므로 동물을 반드시 데려가야 한다.</li>
<li><strong>항공사 확인</strong>: 항공사별 기내/화물 운송 규정, 이동장 규격, 단두종 제한, 계절별 운송 제한을 확인한다.</li>
</ol>

<h2>준비 시기</h2>
<p>항체검사와 대기 기간 등을 고려해 최소 수개월 전부터 준비하는 것이 안전하다는 안내가 있다. 도착 국가에 따라 필요한 기간이 더 길 수 있다.</p>

<div class="callout-dog">
<strong>자주 놓치는 것</strong><br>
• 국가별로 서류 양식과 유효 기간이 다르다 — 발급일 기준으로 며칠 이내여야 하는 경우가 많다<br>
• 마이크로칩보다 접종이 먼저 기록되면 인정되지 않는 국가가 있다<br>
• 환승 국가의 요건도 확인해야 한다<br>
• 귀국 시에도 검역 요건이 있다 (국내 입국 시 검역 증명 요구)
</div>

<h2>동물 건강과 이동 스트레스</h2>
<ul>
<li>장시간 이동 전 수의사에게 건강 상태와 이동 적합성을 상담한다.</li>
<li>단두종, 노령, 심장·호흡기 질환이 있는 동물은 항공 운송이 위험할 수 있다.</li>
<li>이동장에 미리 적응시킨다.</li>
</ul>

<h2>마지막으로</h2>
<p>해외 이동은 '서류 준비'가 절반이다. 도착 국가와 항공사, 검역본부의 최신 공고를 기준으로 일정을 역산해 준비하자. 국내 이동은 <a href="/blog/domestic-pet-travel-regulations">국내 반려동물 이동·교통 규정</a>을 참고한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.dailyvet.co.kr/?p=195680 — 데일리벳, 검역본부 '반려동물과 함께 해외 가려면' 종합 안내서 발간",
      "https://www.mafra.go.kr/bbs/home/792/574492/artclView.do — 농림축산식품부, 반려동물 해외 이동 관련 보도자료",
      "https://cargo.koreanair.com/sites/default/files/2025-02/%EA%B5%AD%EA%B0%80%EB%B3%84%20%EB%B0%98%EB%A0%A4%EB%8F%99%EB%AC%BC%20%EC%95%88%EB%82%B4%EB%AC%B8.pdf — 대한항공 화물, 국가별 반려동물 안내문",
    ],
    disclaimer: "이 글은 일반적인 정보 제공 목적으로 작성되었으며, 법률·세무·소비자 분쟁에 대한 전문가 자문을 대체하지 않습니다. 법령과 제도는 자주 바뀌므로 실제 적용 전 관할 기관(지자체, 한국소비자원, 농림축산검역본부 등)이나 전문가에게 최신 내용을 확인하세요.",
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
    body: `<p>보호소에서 가장 오래 남는 개는 대개 나이 든 대형견이다. 성격과 습관이 이미 자리 잡혀 있어 함께 살기 편하다는 장점이 있지만, 관절과 노화 관련 의료비 같은 현실적인 부담도 있다. 입양 전에 준비해야 할 것을 정리했다.</p>

<h2>시니어 대형견 입양의 장점</h2>
<ul>
<li><strong>성격을 알 수 있다</strong>: 몸집, 활동성, 기질이 이미 드러나 생활에 맞는지 판단하기 쉽다.</li>
<li><strong>기본 생활 습관</strong>: 배변과 기본 매너가 갖춰진 경우가 많다.</li>
<li><strong>적응이 빠른 편</strong>: 강아지에 비해 파괴 행동과 에너지 소모가 적고 안정된 편이다.</li>
<li><strong>입양 기회가 적은 아이에게 집을 준다</strong>.</li>
</ul>

<h2>입양 전에 알아야 할 현실</h2>
<table>
<thead><tr><th>항목</th><th>내용</th></tr></thead>
<tbody>
<tr><td>관절 질환</td><td>대형견은 고관절 이형성증, 골관절염이 흔하다. 계단·점프가 힘들 수 있다</td></tr>
<tr><td>수명</td><td>대형견은 소형견보다 수명이 짧은 경향이 있어 함께할 시간이 상대적으로 짧을 수 있다</td></tr>
<tr><td>의료비</td><td>정기 검진, 노령 질환 약물, 응급 치료 비용을 예상한다. 입양 전에 비용 한도를 정해 두면 좋다</td></tr>
<tr><td>체력</td><td>젊은 개보다 체력이 약해 산책 강도를 줄이고 휴식을 늘려야 한다</td></tr>
<tr><td>일상 돌봄</td><td>일어서기 어려워하면 부축이 필요하다. 체중이 큰 개는 이동 보조 도구가 필요할 수 있다</td></tr>
</tbody>
</table>

<h2>입양 전 확인 질문</h2>
<ul>
<li>건강 기록과 알려진 질환, 복용 중인 약</li>
<li>종합 검진(혈액·소변·치아) 결과 — 가능하면 입양 전후로 노령 검진을 받는다</li>
<li>다른 동물, 아이와의 관계, 분리불안 여부</li>
<li>보호소에서의 식사량, 운동 습관</li>
</ul>

<h2>집 준비</h2>
<ul>
<li>미끄럼 방지 매트, 낮고 푹신한 침대(관절 지지)</li>
<li>계단 경사로, 차량 탑승 경사로</li>
<li>식기를 높이에 맞게 올려 목·관절 부담을 줄인다</li>
<li>평평한 산책로와 쉬어 갈 그늘</li>
</ul>

<div class="callout-dog">
<strong>입양 후 첫 몇 주</strong><br>
• 조용한 공간과 일정한 일과로 안정시킨다<br>
• 새 환경에서는 이전 습관과 달라 보일 수 있다 — 시간을 준다<br>
• 통증·식욕 변화·소변 이상은 기록해 병원에 알린다<br>
• 정기 건강 검진 계획을 바로 세운다
</div>

<h2>마지막으로</h2>
<p>나이 든 대형견의 입양은 시간이 짧을 수 있지만 그만큼 가치 있는 선택이다. 비용과 돌봄 부담을 현실적으로 계산하고 준비하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.calgary.ca/pets/adoption/senior-dogs.html — City of Calgary, Adopting a senior dog",
      "https://www.hillspet.co.nz/dog-care/new-pet-parent/adopting-senior-dog-benefits — Hill's Pet, Benefits of adopting a senior dog",
    ],
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
    body: `<p>새끼 고양이는 어미젖을 먹다가 생후 4주 무렵부터 고형식에 관심을 보이기 시작한다. 이유 과정은 서서히 진행되며, 대개 6~7주 무렵 대부분의 영양을 고형식으로 섭취한다. 어미와 함께 있는 새끼와 사람이 키우는 고아 새끼의 접근법을 정리했다.</p>

<h2>시기</h2>
<table>
<thead><tr><th>상황</th><th>시작 시기</th></tr></thead>
<tbody>
<tr><td>어미와 함께 있는 새끼</td><td>생후 약 4주에 고형식에 관심을 보이기 시작한다</td></tr>
<tr><td>어미 없이 분유로 키우는 새끼</td><td>생후 약 3주경부터 시도하는 경우가 많다</td></tr>
<tr><td>이유 완료</td><td>대개 생후 6~7주 무렵</td></tr>
</tbody>
</table>
<p>개체마다 속도가 다르므로 억지로 서두르지 않는다. 급하게 젖을 떼면 어미와 새끼 모두 스트레스를 받는다.</p>

<h2>단계별 진행</h2>
<ol>
<li><strong>죽(그루얼) 만들기</strong>: 새끼 고양이용 캔(습식)에 새끼고양이용 대체 분유 또는 따뜻한 물을 섞어 오트밀 정도의 묽기로 만든다. 한 자료는 캔 2 : 분유(물) 1 정도를 기준으로 제시한다.</li>
<li><strong>납작한 접시에 주기</strong>: 낮고 넓은 접시에 담아 준다. 처음에는 손가락에 묻혀 맛을 보게 한다. 처음 며칠은 매우 지저분하다.</li>
<li><strong>점차 되게</strong>: 물이나 분유 비율을 줄이고 질감을 서서히 되직하게 한다.</li>
<li><strong>습식·소량의 건식 병행</strong>: 5~6주 이후 새끼 고양이용 건사료를 불려서 또는 그대로 접시에 둔다.</li>
<li><strong>깨끗한 물</strong>: 고형식을 먹기 시작하면 항상 신선한 물을 준다.</li>
</ol>

<div class="callout-cat">
<strong>주의</strong><br>
• 반드시 새끼 고양이용(성장기용) 식사를 준다 — 성묘 사료는 영양이 부족하다<br>
• 소 또는 사람용 우유는 설사를 일으킬 수 있어 주지 않는다<br>
• 억지로 입에 넣어 흡인하지 않게 한다<br>
• 체중이 늘지 않거나 설사가 있으면 바로 병원에 간다
</div>

<h2>체중과 건강 확인</h2>
<ul>
<li>이유기 새끼는 매일 또는 이틀에 한 번 체중을 잰다. 체중이 늘지 않거나 줄면 위험 신호다.</li>
<li>배변이 정상인지(굳기·횟수), 눈곱·콧물이 없는지 본다.</li>
<li>구충 일정과 첫 예방접종 시기를 수의사와 상의한다.</li>
</ul>

<h2>화장실 훈련</h2>
<p>고형식을 먹기 시작할 무렵 얕은 화장실과 고운 모래(또는 덩어리지지 않는 모래)를 마련한다. 새끼가 모래를 먹으려 하면 안전한 제품으로 바꾸고 감독한다.</p>

<h2>마지막으로</h2>
<p>이유는 며칠에 끝나는 과정이 아니라 몇 주에 걸쳐 새끼의 속도에 맞춰 진행하는 일이다. 어린 새끼나 고아 새끼는 반드시 수의사의 안내를 받으며 키우자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.maddiesfund.org/transitioning-kittens-and-puppies-to-solid-food/presentation_content/external_files/Transitioning%20Kittens%20and%20Puppies%20to%20Solid%20Food-%20Transcript.pdf — Maddie's Fund, Transitioning Kittens and Puppies to Solid Food",
      "https://network.bestfriends.org/sites/default/files/inline-files/Weaning%20Kittens.pdf — Best Friends Animal Society, Weaning Kittens",
      "https://cats.com/?p=74355 — cats.com, When Do Kittens Start Eating Food? A Vet Explains",
    ],
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
