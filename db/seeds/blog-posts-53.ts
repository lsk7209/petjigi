import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 53 — cat4×2 + cat3×1 + cat6×1 + cat5×1 = 5편 (IDs 386-390)
// Macros: F, A, E, B, F
// Angles: RA2, RA5, RA3, RA8, RA6

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 386 / Cat4 / Macro-F / Lens-L2 / Hook-H1 / Outro-O2 / Angle-RA2
  {
    id: "blog-386",
    slug: "pet-hotel-boarding-checklist",
    type: "blog",
    category: 4,
    title: "반려동물 호텔·위탁 맡기기 전 체크리스트 — 안전한 곳 고르는 기준",
    subtitle: "등록 여부 확인, 방문 점검 포인트, 위탁 중 비상 연락 체계, 귀가 후 주의 관찰",
    metaTitle: "반려동물 호텔·위탁 선택 체크리스트 — 안전 기준 완전 가이드 | 펫지기",
    metaDescription: "반려동물 호텔이나 위탁을 맡기기 전 확인해야 할 것들. 등록 여부, 방문 점검 포인트, 비상 연락 체계, 귀가 후 관찰 사항을 정리했습니다.",
    body: `<p>여행이나 출장 때 반려동물을 맡겨야 한다면, 어떤 곳이 안전한지 판단하는 기준이 필요하다. 모든 펫호텔이 같은 수준이 아니다.</p>

<h2>법적 등록 여부 확인</h2>
<p>반려동물 위탁업은 동물보호법상 '동물 위탁관리업'으로 등록이 필요하다. 미등록 업체는 위생·안전 관리 기준이 없다. 업체에 등록증을 요청하거나 지자체 동물보호과에서 확인할 수 있다.</p>

<h2>사전 방문 점검 포인트</h2>
<div class="callout-dog">
<strong>현장 방문 시 확인 체크리스트</strong><br>
□ 케이지·공간이 충분히 넓은가 (최소 3배 체장)<br>
□ 환기·청결 상태<br>
□ 다른 동물과의 분리 여부 (종별·크기별)<br>
□ 직원 수 대비 동물 수 (과밀 여부)<br>
□ CCTV 운영 여부 (원격 모니터링 가능 여부)<br>
□ 비상 시 연결된 동물병원 여부<br>
□ 화재·재난 대피 계획 존재 여부
</div>

<h2>맡기기 전 준비</h2>
<ul>
<li>현재 복용 약·의료 기록 사본 전달</li>
<li>평소 먹던 사료 충분히 준비 (식이 변화로 인한 소화 문제 예방)</li>
<li>평소 쓰던 담요·장난감 (냄새가 배어 있어 안정 효과)</li>
<li>긴급 연락처·주치 수의사 정보 제공</li>
<li>알레르기·기저 질환·특이사항 서면 전달</li>
</ul>

<h2>위탁 중 소통</h2>
<ul>
<li>정기 사진/영상 업데이트를 요청할 수 있는 업체가 바람직</li>
<li>하루 1~2회 간단한 상태 보고</li>
<li>이상 징후 발생 시 즉시 연락 체계 사전 확인</li>
</ul>

<h2>귀가 후 주의 관찰</h2>
<ul>
<li>식욕·음수량 변화</li>
<li>구토·설사 (스트레스성 또는 감염)</li>
<li>피부·귀 상태 (다른 동물과 접촉 후 기생충·피부염)</li>
<li>행동 변화 (과도한 은둔·짖음)</li>
</ul>

<h2>마지막으로</h2>
<p>좋은 펫호텔은 방문을 환영하고, 질문에 성실히 답하며, 비상시 연결된 병원이 있다. 가격이 낮다고 좋은 선택이 아니다. 반려동물을 잠시 맡기는 것도 신뢰 관계가 필요한 일이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "동물보호법 시행규칙 — 동물 위탁관리업 등록 기준",
      "한국동물위탁관리협회 안전 기준 가이드",
      "농림축산식품부 반려동물 관련 영업 등록·허가 안내 2024",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-27T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 387 / Cat4 / Macro-A / Lens-L5 / Hook-H4 / Outro-O3 / Angle-RA5
  {
    id: "blog-387",
    slug: "pet-abroad-emigration-guide",
    type: "blog",
    category: 4,
    title: "반려동물과 해외 이민·장기 출국 — 나라별 입국 요건 준비 방법",
    subtitle: "국가별 검역 요건, 마이크로칩·광견병 항체가 검사, 항공 이동 방법, 준비 타임라인",
    metaTitle: "반려동물 해외 이민·출국 준비 — 검역·항체가·항공 가이드 | 펫지기",
    metaDescription: "반려동물과 해외 이민 또는 장기 출국 시 준비사항. 국가별 검역 요건, 마이크로칩, 광견병 항체가 검사, 항공 이동 방법과 준비 타임라인을 정리했습니다.",
    body: `<p>해외 이민이나 장기 체류 시 반려동물을 데려가려면 최소 수개월 전부터 준비해야 한다. 입국 요건을 맞추지 못하면 도착 시 격리 또는 입국 거부가 될 수 있다.</p>

<h2>국가별 규제 수준</h2>
<p>나라마다 요건이 크게 다르다. 일반적으로 세 그룹으로 나뉜다:</p>
<ul>
<li><strong>엄격 (호주·뉴질랜드·영국·하와이)</strong>: 장기 격리 또는 매우 엄격한 사전 요건</li>
<li><strong>중간 (EU·미국 본토·캐나다·일본)</strong>: 마이크로칩·광견병 백신 + 국가별 추가 요건</li>
<li><strong>상대적으로 간단 (일부 동남아·중남미)</strong>: 마이크로칩 + 건강증명서 수준</li>
</ul>

<h2>거의 모든 나라에서 공통으로 필요한 것</h2>
<ul>
<li>ISO 표준 마이크로칩 (15자리)</li>
<li>광견병 백신 (유효 기간 내)</li>
<li>공인 수의사 발급 국제 건강증명서 (출국 전 10일 이내)</li>
<li>농림축산검역본부 발급 동물검역증명서</li>
</ul>

<h2>광견병 항체가(Titer) 검사가 필요한 나라</h2>
<p>호주·뉴질랜드·영국·일본·하와이 등 광견병 청정국은 항체가 검사(FAVN 또는 RFFIT)를 요구한다. 검사 → 결과 통보 → 대기기간(6개월)까지 필요한 경우도 있다. 준비에 최소 6~12개월이 필요하다.</p>

<div class="callout-cat">
<strong>일본 입국 타임라인 예시</strong><br>
1. 마이크로칩 삽입<br>
2. 광견병 백신 2회 (초회 + 30일 후)<br>
3. 항체가 검사 (2차 백신 후 30일 이상 후)<br>
4. 6개월 대기 (항체가 검사일로부터)<br>
5. 출국 전 40일~180일 이내 추가 광견병 백신<br>
6. 출국 전 10일 이내 건강증명서 발급<br>
→ 최소 7~8개월 소요
</div>

<h2>항공 이동 방법</h2>
<ul>
<li><strong>기내 동반(Cabin)</strong>: 소형 반려동물(8~10kg 이하), 항공사 정책 확인 필수</li>
<li><strong>화물칸 수하물(Cargo)</strong>: 중·대형견, 정해진 규격의 견고한 케이지 필요</li>
<li><strong>전문 펫 배송 업체</strong>: 전 과정 대행, 비용 높음</li>
</ul>

<h2>마지막으로</h2>
<p>해외 이민 시 반려동물 준비는 일찍 시작할수록 좋다. 목적지 국가의 공식 정보를 직접 확인하고(한국 대사관 또는 목적지 농무부 웹사이트), 농림축산검역본부에 문의하는 것이 가장 정확하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "농림축산검역본부 반려동물 해외 반출 안내 2024",
      "USDA APHIS — Traveling with Pets",
      "일본 농림수산성 동물 검역 안내",
    ]),
    disclaimer: "이 글은 참고용이며 목적지 국가의 최신 규정을 공식 경로를 통해 반드시 확인하세요.",
    status: "published",
    publishedAt: "2026-07-27T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 388 / Cat3 / Macro-E / Lens-L3 / Hook-H3 / Outro-O2 / Angle-RA3
  {
    id: "blog-388",
    slug: "dog-bladder-stones-guide",
    type: "blog",
    category: 3,
    title: "강아지 방광결석 — 소변 이상의 숨겨진 원인",
    subtitle: "스트루바이트·옥살산칼슘 결석 차이, 혈뇨·빈뇨·배뇨 곤란 증상, 식이 용해 vs 수술 기준",
    metaTitle: "강아지 방광결석 증상·치료·예방 완전 가이드 | 펫지기",
    metaDescription: "강아지 방광결석의 스트루바이트·옥살산칼슘 차이, 혈뇨·빈뇨 증상, 식이 용해와 수술 기준, 재발 예방 방법을 정리했습니다.",
    body: `<p>강아지가 자주 소변을 보거나 피가 섞인 소변을 본다면 방광결석이 원인일 수 있다. 결석의 종류에 따라 치료 방법이 완전히 달라진다.</p>

<h2>방광결석의 주요 종류</h2>
<table>
<thead><tr><th>종류</th><th>원인</th><th>특징</th></tr></thead>
<tbody>
<tr><td>스트루바이트 (Struvite)</td><td>세균 감염 (요소분해균), 알칼리 소변</td><td>암컷에서 더 흔함. 처방식으로 용해 가능.</td></tr>
<tr><td>옥살산칼슘 (Calcium Oxalate)</td><td>고칼슘혈증, 산성 소변, 유전</td><td>수술 필요. 달마시안·비숑·포메라니안에 흔함.</td></tr>
<tr><td>요산 (Urate)</td><td>달마시안 유전 소인, 간문맥 단락</td><td>달마시안에서 특히 흔함.</td></tr>
</tbody>
</table>

<h2>주요 증상</h2>
<div class="callout-dog">
<strong>방광결석 의심 증상</strong><br>
• 자주 소변을 보려 하지만 양이 적음<br>
• 소변에 피가 섞임 (혈뇨)<br>
• 소변 볼 때 고통스러운 자세<br>
• 집 안에서 소변 실수<br>
• 소변을 전혀 못 보는 경우 (완전 폐색 — 응급)
</div>

<h2>진단 방법</h2>
<ul>
<li>복부 X-ray: 스트루바이트·옥살산칼슘 결석은 X-ray에 보임</li>
<li>복부 초음파: 모든 종류 결석 확인 가능</li>
<li>소변 검사 (침전물·pH·세균)</li>
<li>혈액검사: 신장 기능 확인</li>
</ul>

<h2>치료 기준</h2>
<ul>
<li><strong>스트루바이트</strong>: 항생제 + 처방식 용해 식이 (2~3개월). 감염이 없는 경우 처방식만으로도 용해 가능.</li>
<li><strong>옥살산칼슘</strong>: 자연 용해 불가 — 방광 세척(Water Urohydropulsion) 또는 수술로 제거.</li>
<li><strong>요도 폐색</strong>: 즉시 응급 처치 (카테터 삽입 또는 수술)</li>
</ul>

<h2>재발 예방</h2>
<ul>
<li>수분 섭취 증가 (습식 사료 또는 음수량 늘리기)</li>
<li>결석 종류에 따른 처방 예방식 유지</li>
<li>정기 소변 검사 (3~6개월 마다)</li>
<li>비만 관리 (비만이 결석 위험 높임)</li>
</ul>

<h2>마지막으로</h2>
<p>방광결석은 재발이 잦다. 한 번 경험했다면 결석 종류를 알고 그에 맞는 장기 관리 계획을 세우는 것이 중요하다. 수분 섭취를 늘리는 것이 모든 종류의 결석 예방에 도움이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Lulich, J.P. et al. — Worldwide prevalence of uroliths in dogs. Journal of Small Animal Practice 2016",
      "WSAVA Urolith Management Guidelines",
      "대한수의사회 비뇨기 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-28T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 389 / Cat6 / Macro-B / Lens-L6 / Hook-H8 / Outro-O4 / Angle-RA8
  {
    id: "blog-389",
    slug: "pet-memorial-tattoo-artwork-ideas",
    type: "blog",
    category: 6,
    title: "반려동물 추모 타투와 아트워크 — 몸과 공간에 기억을 새기는 방법",
    subtitle: "반려동물 추모 타투 디자인 아이디어, 유골 사용 추모 예술, 공간 추모 방법",
    metaTitle: "반려동물 추모 타투·아트워크 아이디어 | 펫지기",
    metaDescription: "반려동물을 추모하는 타투, 유골 활용 추모 예술, 공간 추모 방법 등 몸과 공간에 기억을 새기는 다양한 방법을 정리했습니다.",
    body: `<p>반려동물을 잃은 후 그 기억을 영원히 간직하고 싶을 때, 몸이나 공간에 새기는 방법을 선택하는 사람들이 있다. 그것은 개인적인 애도의 방식이며, 옳고 그름이 없다.</p>

<h2>반려동물 추모 타투</h2>
<p>반려동물 추모 타투는 점점 더 일반적이 되고 있다. 발도장·실루엣·초상화·이름·생몰 연도 등 다양한 형태가 있다.</p>

<h3>디자인 아이디어</h3>
<ul>
<li><strong>발도장</strong>: 실제 발도장을 타투 스튜디오에 가져가 그대로 새기는 방법</li>
<li><strong>실루엣</strong>: 좋아했던 자세·옆모습 실루엣 — 미니멀하면서 상징적</li>
<li><strong>초상화 스타일</strong>: 사진 기반 세밀한 털·눈 표현</li>
<li><strong>이름 + 별자리·꽃</strong>: 이름과 함께 태어난 달의 꽃이나 별자리</li>
<li><strong>심플 라인아트</strong>: 단순한 선화로 표현, 세월이 지나도 흐릿해지지 않는 장점</li>
</ul>

<h3>주의사항</h3>
<ul>
<li>충분한 시간이 지난 후 결정하는 것을 권장 — 슬픔이 가장 강할 때보다 기억이 온화해진 후</li>
<li>반려동물 초상화를 전문으로 하는 타투이스트 선택</li>
<li>위치는 자주 볼 수 있으면서 개인적인 곳</li>
</ul>

<h2>유골을 활용한 추모 예술</h2>
<ul>
<li><strong>유리 유골 기념품</strong>: 유골 일부를 넣어 만든 유리볼·펜던트</li>
<li><strong>유골 보석</strong>: 화학적 처리로 다이아몬드·루비 등으로 변환하는 서비스</li>
<li><strong>유골 페인팅</strong>: 유골 일부를 물감에 섞어 초상화 제작 (전문 업체 서비스)</li>
<li><strong>수목장</strong>: 나무 아래에 유골을 묻고 나무로 기억</li>
</ul>

<h2>공간 추모 방법</h2>
<div class="callout-cat">
<strong>집 안 추모 공간 아이디어</strong><br>
• 작은 선반: 사진 + 가장 좋아했던 장난감 + 캔들<br>
• 화분: 이름 새긴 돌 + 좋아하는 식물<br>
• 사진 액자: 가장 좋은 사진 인화해 주요 장소에<br>
• 맞춤 제작 쿠션: 사진 프린팅 쿠션
</div>

<h2>마지막으로</h2>
<p>추모의 방법에는 정해진 형식이 없다. 타투이든, 나무 한 그루이든, 사진 한 장이든 — 그 존재를 기억하는 방식이라면 무엇이든 의미가 있다. 기억하는 것 자체가 사랑이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Association for Pet Loss and Bereavement — Memorial Ideas",
      "한국반려동물기념품협회 추모 서비스 현황 2024",
      "American Kennel Club — Ways to Remember Your Pet",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-28T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 390 / Cat5 / Macro-F / Lens-L5 / Hook-H3 / Outro-O3 / Angle-RA6
  {
    id: "blog-390",
    slug: "autumn-pet-care-guide",
    type: "blog",
    category: 5,
    title: "가을 반려동물 케어 — 털갈이·건조함·진드기 시즌을 대비하는 방법",
    subtitle: "가을 털갈이 관리, 건조한 날씨 피부 관리, 진드기 예방, 낮 짧아지는 계절 루틴 조정",
    metaTitle: "가을 반려동물 케어 가이드 — 털갈이·건조·진드기 대비 | 펫지기",
    metaDescription: "가을철 반려동물 케어 가이드. 털갈이 집중 관리, 건조한 날씨 피부 보습, 진드기 예방, 낮이 짧아지는 계절 루틴 조정 방법을 정리했습니다.",
    body: `<p>가을은 반려동물에게도 전환의 계절이다. 여름의 더위가 지나가면서 털갈이가 시작되고, 공기가 건조해지며, 진드기가 아직 활동하는 시기다.</p>

<h2>가을 털갈이 집중 관리</h2>
<p>많은 개·고양이가 봄과 가을에 두 번 큰 털갈이를 한다. 특히 이중 모(언더코트가 있는 품종)는 털이 뭉쳐 피부 문제가 생길 수 있다.</p>

<ul>
<li>브러싱 주기를 평소 2배로 늘리기</li>
<li>언더코트 제거용 슬리커·퍼미네이터 활용</li>
<li>목욕 후 완전 건조 필수 (털 뭉침 방지)</li>
<li>실내 청소기·공기청정기 운용 강화</li>
</ul>

<h2>건조한 날씨 피부 관리</h2>
<p>가을부터 실내 난방이 시작되면 습도가 급격히 낮아진다. 강아지·고양이 피부도 건조해지기 쉽다.</p>
<ul>
<li>가습기로 실내 습도 40~60% 유지</li>
<li>음수량 확인 (건조한 환경에서 더 많이 마셔야 함)</li>
<li>발바닥 보습 크림 (반려동물용) 주기적 적용</li>
<li>건조한 피부 → 가려움·비듬 → 오메가3 보충이 도움이 될 수 있음</li>
</ul>

<h2>가을 진드기 주의</h2>
<p>진드기는 봄·여름이 절정이지만 가을(9~11월)에도 활발히 활동한다. 낙엽이 쌓인 곳에 진드기가 많다.</p>
<ul>
<li>산책 후 전신 확인 (귀 뒤·겨드랑이·발가락 사이 중점)</li>
<li>진드기 예방약 10~11월까지 지속 투여</li>
<li>진드기 발견 시 전용 족집게로 피부와 수평으로 회전하며 제거</li>
</ul>

<h2>루틴 조정 — 낮이 짧아지는 계절</h2>
<div class="callout-dog">
<strong>가을 루틴 체크포인트</strong><br>
• 이른 저녁 산책으로 일조량 최대 활용<br>
• 반사 리쉬·LED 목걸이 — 어두워진 저녁 시인성 확보<br>
• 일조량 감소로 인한 계절성 우울 (일부 동물에서 활동 감소)<br>
• 연간 건강검진 — 가을이 혈액검사 적기
</div>

<h2>마지막으로</h2>
<p>가을은 여름의 더위와 겨울의 추위 사이 건강 관리의 황금 시기다. 털갈이 대응과 진드기 예방을 겨울 전에 완료해두면 다음 계절이 훨씬 편안해진다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Kennel Club — Fall Pet Care Tips",
      "CAPC (Companion Animal Parasite Council) — Tick Seasonal Activity Data",
      "한국반려동물협회 계절별 반려동물 케어 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-29T09:00:00.000Z",
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
  console.log("블로그 포스트 53차 시딩 완료! (blog-386 ~ blog-390)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
