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
    body: `<p>강아지가 소변에 피가 섞이거나 자주 화장실을 가고 힘을 주면 방광염으로 생각하기 쉽다. 그런데 방광결석도 증상이 비슷해서, 소변검사와 영상검사로 구분해야 한다. 결석의 종류에 따라 치료법이 완전히 달라지기 때문이다.</p>

<h2>흔한 증상</h2>
<ul>
<li>혈뇨 (가장 흔한 신호 중 하나)</li>
<li>소변을 볼 때 힘을 주거나 소량씩 자주 봄</li>
<li>배뇨 시 통증, 생식기 핥기</li>
<li>화장실이 아닌 곳에서의 배뇨</li>
</ul>

<div class="callout-dog">
<strong>응급 신호</strong><br>
• 소변을 거의 보지 못하고 계속 시도함<br>
• 배가 부풀고 아파함, 구토, 무기력<br>
→ 결석이 요도를 막으면 방광이 터지거나 신장 기능이 나빠질 수 있다. 바로 응급 진료를 받는다.
</div>

<h2>결석 종류에 따른 차이</h2>
<table>
<thead><tr><th>종류</th><th>특징</th><th>치료 방향</th></tr></thead>
<tbody>
<tr><td>스트루바이트</td><td>세균 감염과 연관된 경우가 많다</td><td>처방식과 항생제로 녹이는 방법을 시도할 수 있다. 몇 주에서 몇 달까지 걸릴 수 있다</td></tr>
<tr><td>칼슘옥살레이트</td><td>식이로 녹일 수 없다</td><td>물리적으로 제거해야 하며, 이후 재발 방지에 수분 섭취가 핵심이다</td></tr>
<tr><td>요산염, 시스틴 등</td><td>드물고 특수 식이나 약물이 필요할 수 있다</td><td>종류 분석 후 수의사가 계획</td></tr>
</tbody>
</table>

<h2>진단과 제거 방법</h2>
<ul>
<li><strong>검사</strong>: 소변검사(산도, 결정, 세균), 소변 배양, 혈액검사, 방사선·초음파로 크기와 개수를 본다.</li>
<li><strong>수술</strong>: 방광을 열어 결석을 제거하는 방법으로 가장 빠르게 해결되는 경우가 많다.</li>
<li><strong>비수술 방법</strong>: 요도를 통해 작은 결석을 씻어내는 방법(요도수압추진법)이 있고 상황에 따라 선택한다.</li>
<li><strong>식이 용해</strong>: 스트루바이트 등 일부에서 가능하며 감염 치료와 병행한다.</li>
</ul>
<p>제거한 결석은 성분 분석을 의뢰해야 재발 방지 계획을 세울 수 있다.</p>

<h2>재발을 줄이려면</h2>
<ul>
<li>물을 충분히 마시게 한다. 습식 사료를 병행하거나 신선한 물그릇을 여러 곳에 둔다.</li>
<li>수의사가 처방한 식이를 지키고 간식, 사람 음식을 임의로 더하지 않는다.</li>
<li>배뇨를 참지 않도록 산책과 배뇨 기회를 충분히 준다.</li>
<li>정기적으로 소변검사나 영상검사로 재발을 확인한다.</li>
</ul>

<h2>마지막으로</h2>
<p>혈뇨와 배뇨 곤란은 단순 방광염 같아 보여도 결석일 수 있다. 증상이 반복되면 소변검사와 영상검사로 원인을 확인하고, 결석 종류에 맞는 치료와 재발 관리를 하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vcahospitals.com/know-your-pet/bladder-stones-in-dogs — VCA, Bladder Stones in Dogs",
      "https://www.merckvetmanual.com/urinary-system/urolithiasis-in-small-animals/urolithiasis-in-dogs — Merck Veterinary Manual, Urolithiasis in Dogs",
      "https://vcahospitals.com/know-your-pet/nutritional-concerns-for-dogs-with-bladder-stones — VCA, Nutritional Concerns for Dogs with Bladder Stones",
    ],
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
    body: `<p>반려동물을 잃은 뒤 기억을 몸이나 공간에 남기고 싶어 하는 사람들이 있다. 타투, 유골 기념물, 집 안 추모 공간 같은 방법과 결정하기 전에 확인할 점을 정리한다. 어느 쪽이든 옳고 그름은 없다.</p>

<h2>추모 타투</h2>
<h3>디자인 아이디어</h3>
<ul>
<li><strong>발도장</strong>: 실제 발도장이나 코 도장을 본떠 새긴다.</li>
<li><strong>실루엣</strong>: 좋아했던 자세의 옆모습을 단순하게 표현한다.</li>
<li><strong>초상화</strong>: 사진을 바탕으로 한 사실적 표현. 전문 작가가 필요하다.</li>
<li><strong>이름·날짜</strong>: 이름과 함께 별자리나 꽃을 더한다.</li>
<li><strong>라인 아트</strong>: 단순한 선으로 표현하면 시간이 지나도 모양이 유지되기 쉽다.</li>
</ul>

<h3>결정하기 전에</h3>
<ul>
<li>슬픔이 가장 강한 시기보다 마음이 어느 정도 가라앉은 뒤에 정한다. 영구적인 결정이다.</li>
<li>작가의 포트폴리오와 위생 관리(1회용 바늘, 소독)를 확인하고, 시술 관련 법·제도는 변동이 있으므로 업소 선택에 신중을 기한다.</li>
<li>알레르기, 피부 질환, 임신 중 여부 등 건강 상태를 시술 전에 알리고, 필요하면 의사와 상담한다.</li>
<li>유골이나 털을 잉크에 섞는 서비스는 위생과 안전 문제가 있을 수 있어 신중히 알아본다.</li>
</ul>

<h2>유골과 털을 활용한 기념물</h2>
<ul>
<li><strong>유리 기념물, 보석</strong>: 유골 일부로 제작하는 서비스. 업체의 신뢰도와 환불·분실 규정을 확인한다.</li>
<li><strong>털·발도장 키트</strong>: 사진과 함께 액자에 담는다.</li>
<li><strong>맞춤 제작품</strong>: 사진을 이용한 쿠션, 액자, 일러스트.</li>
</ul>

<h2>집 안 추모 공간</h2>
<div class="callout-cat">
<strong>작게 시작하는 아이디어</strong><br>
• 선반 한 칸에 사진, 목줄, 좋아하던 장난감, 작은 조명<br>
• 화분에 이름을 적은 돌과 식물<br>
• 가장 좋아하는 사진 한 장을 자주 보는 곳에 걸기<br>
• 함께한 이야기를 적은 작은 앨범
</div>

<h2>선택이 어렵다면</h2>
<p>당장 결정하지 않아도 된다. 사진과 물건을 안전하게 보관해 두고, 시간이 지난 뒤 마음이 가는 방식을 고르는 것도 방법이다. 마음이 오래 힘들다면 상담이나 <a href="/blog/petloss-grief-support-resources">펫로스 지원 모임</a> 같은 도움을 찾아보자.</p>

<h2>마지막으로</h2>
<p>추모의 방식에 정답은 없다. 기억하는 마음이 가장 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://avma.org/resources-tools/avma-policies/avma-animal-loss-support-services — AVMA, Animal loss support services",
      "https://www.samhsa.gov/resource/dbhis/pet-loss-grief — SAMHSA, Pet Loss and Grief",
    ],
    disclaimer: "이 글은 일반적인 정보 제공 목적으로 작성되었으며, 수의학적 진단·상담이나 법률 자문을 대체하지 않습니다. 장묘·사체 처리 기준은 법령과 지자체에 따라 달라질 수 있으니 진행 전 관할 지자체 등 공식 기관에서 확인하시고, 슬픔이 일상생활을 어렵게 하면 전문 상담을 받으세요.",
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
    body: `<p>가을은 산책하기 좋은 계절이지만, 털갈이, 진드기, 곰팡이·버섯, 쥐약 같은 계절 위험이 함께 온다. 날이 선선해졌다고 예방을 느슨하게 하지 말고, 가을에 특히 늘어나는 요인을 점검하자.</p>

<h2>가을에 주의할 위험</h2>
<table>
<thead><tr><th>위험</th><th>설명</th><th>대처</th></tr></thead>
<tbody>
<tr><td>쥐약(살서제)</td><td>쥐가 실내로 들어오는 시기에 사용이 늘어난다. 항응고제는 내출혈을, 일부 제품은 칼슘 이상과 신장 손상을 일으킬 수 있다</td><td>반려동물이 닿지 않게 두고, 먹었다면 증상이 없어도 즉시 병원에 연락</td></tr>
<tr><td>버섯</td><td>대부분은 무해하지만 일부는 매우 위험하고 구분이 어렵다</td><td>버섯이 자라는 곳을 피하고, 먹었다면 샘플을 챙겨 병원으로</td></tr>
<tr><td>진드기·벼룩</td><td>가을에도 활동하며 진드기는 라임병 등을 옮길 수 있다</td><td>연중 예방약을 수의사와 정하고, 산책 후 몸을 확인</td></tr>
<tr><td>렙토스피라증</td><td>가을 비 뒤 고인 물과 야생동물 소변에서 전파될 수 있다</td><td>고인 물을 마시지 못하게 하고, 백신 여부를 수의사와 상의</td></tr>
<tr><td>기타 가정 위험</td><td>방충제(좀약), 부동액, 퇴비 더미, 핼러윈 사탕(초콜릿·자일리톨)</td><td>보관 장소를 점검</td></tr>
</tbody>
</table>

<h2>털갈이와 피부</h2>
<ul>
<li>털이 많이 빠지는 시기에는 빗질을 자주 해서 죽은 털을 제거한다.</li>
<li>털 빠짐과 함께 피부가 붉거나 비듬, 가려움, 탈모 부위가 있으면 피부 질환일 수 있어 진료를 받는다.</li>
<li>건조한 공기로 피부가 마르면 보습과 가습에 신경 쓴다.</li>
</ul>

<div class="callout-dog">
<strong>바로 병원에 가야 하는 경우</strong><br>
• 쥐약이나 버섯을 먹었을 가능성이 있다<br>
• 잇몸·소변·대변에 피가 보이거나 쉽게 멍이 든다<br>
• 구토, 처짐, 비틀거림이 갑자기 나타난다
</div>

<h2>산책과 일상</h2>
<ul>
<li>해가 짧아지면 저녁 산책 때 반사 목줄이나 불빛을 쓴다.</li>
<li>낙엽 속에는 진드기나 곰팡이, 날카로운 이물이 있을 수 있어 낙엽을 파헤치지 않게 한다.</li>
<li>일교차가 커지면 어린 개, 노령견, 얇은 털의 개는 가볍게 보온한다.</li>
<li>야외 활동이 줄고 식욕이 늘면 체중이 늘 수 있어 식사량을 점검한다.</li>
</ul>

<h2>마지막으로</h2>
<p>가을은 위험이 줄어드는 계절이 아니라 위험의 종류가 바뀌는 계절이다. 예방약 일정, 가정 내 독성 물질 보관, 산책 후 점검만 챙겨도 대부분의 사고를 막을 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.aspca.org/pet-care/general-pet-care/autumn-safety-tips — ASPCA, Autumn Safety Tips",
      "https://vcahospitals.com/resources/lifestyle-dog/hazards-safety/fall-safety-tips-for-pets — VCA, Fall safety tips for pets",
      "https://www.petpoisonhelpline.com/pet-safety-tips/fall-toxins/ — Pet Poison Helpline, Common Fall Toxins",
    ],
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
