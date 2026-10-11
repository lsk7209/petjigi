import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 99 — cat2×2 + cat3×1 + cat5×1 + cat4×1 = 5편 (IDs 616-620)
// Macros: A, B, D, F, G
// Angles: RA7, RA5, RA2, RA1, RA3

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-616",
    slug: "cat-urinary-prescription-diet-guide",
    type: "blog",
    category: 2,
    title: "고양이 요로 처방식 — 결석 종류에 따라 다른 사료가 필요하다",
    subtitle: "스트루바이트 vs 옥살산칼슘 결석 차이, 식이 pH 조절, 처방식 선택법",
    metaTitle: "고양이 요로 처방식 — 결석 종류별 식이 선택 완전 가이드 | 펫지기",
    metaDescription: "고양이 요로 처방식을 결석 종류에 맞게 선택하는 방법. 스트루바이트와 옥살산칼슘 결석 차이, pH 조절 식이 원리, 처방식 브랜드 비교를 정리했습니다.",
    body: `<p>모든 요로 처방식이 같은 것이 아니다. 결석 종류에 따라 처방식이 달라져야 한다. 잘못된 처방식은 오히려 다른 종류의 결석을 유발할 수 있다.</p>

<h2>고양이 요로 결석 두 가지</h2>
<table>
<thead><tr><th>구분</th><th>스트루바이트</th><th>옥살산칼슘</th></tr></thead>
<tbody>
<tr><td>원인</td><td>알칼리 소변, 세균 감염</td><td>산성 소변, 고칼슘</td></tr>
<tr><td>해소 가능?</td><td>식이로 용해 가능</td><td>수술 또는 레이저 필요</td></tr>
<tr><td>식이 목표</td><td>소변 산성화</td><td>소변 중성화, 칼슘 제한</td></tr>
<tr><td>흔한 고양이</td><td>수컷, 비만 실내묘</td><td>고령·수컷</td></tr>
</tbody>
</table>

<h2>처방식 선택의 중요성</h2>
<div class="callout-cat">
<strong>처방식 선택 실수 예시</strong><br>
• 스트루바이트 처방식(산성화) → 옥살산칼슘 발생 위험<br>
• 옥살산칼슘 처방식(중성화) → 스트루바이트 재발 위험<br>
▶ 초음파·X-ray + 소변 검사로 결석 종류 확인 먼저
</div>

<h2>주요 처방식 브랜드 비교</h2>
<ul>
<li><strong>힐스 c/d</strong>: 스트루바이트·FLUTD 예방 (가장 널리 사용)</li>
<li><strong>로얄캐닌 Urinary S/O</strong>: 스트루바이트 + 일부 옥살산칼슘</li>
<li><strong>힐스 u/d</strong>: 옥살산칼슘 및 신장 겸용</li>
<li><strong>로얄캐닌 Oxalate</strong>: 옥살산칼슘 전용</li>
</ul>

<h2>수분 섭취가 핵심</h2>
<p>어떤 결석이든 충분한 수분 섭취가 예방의 기본이다. 처방식 습식을 병행하거나 급수기를 사용해 소변을 묽게 유지하는 것이 가장 중요한 예방이다.</p>

<h2>마지막으로</h2>
<p>요로 처방식은 수의사 처방 없이 임의로 선택하면 오히려 해가 될 수 있다. 결석 종류 확인 후 처방식을 선택하는 것이 필수다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bartges, J.W. & Callens, A.J. — Urolithiasis. Vet Clin North Am 2015",
      "한국수의영양학회 고양이 요로 질환 처방식 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-19T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-617",
    slug: "dog-food-allergy-blood-test-myths",
    type: "blog",
    category: 2,
    title: "강아지 알레르기 혈액 검사 — 믿을 수 있는가",
    subtitle: "알레르기 혈청 검사의 한계, 제거 식이가 유일한 진단, 검사 남용 문제",
    metaTitle: "강아지 알레르기 혈액 검사 신뢰성 — 진단의 한계와 올바른 방법 | 펫지기",
    metaDescription: "강아지 식이 알레르기 혈액 검사의 한계를 정리했습니다. 혈청 검사 신뢰성 문제, 제거 식이가 유일한 확진 방법인 이유, 올바른 알레르기 진단 방법을 알아보세요.",
    body: `<p>강아지의 가려움과 피부 문제가 식이 알레르기 때문이라는 의심이 들 때, 혈액·침·털로 알레르기를 검사해 준다는 상품이 많다. 하지만 이 검사들은 신뢰성이 낮다는 연구가 있다. 식이 알레르기를 진단하는 기준은 제한식 식이 시험이다.</p>

<h2>왜 간편 검사가 믿을 만하지 않은가</h2>
<ul>
<li><strong>혈액(IgE)·침(IgA, IgM) 검사</strong>: 2019년 수의학 학술지의 연구는 침과 혈액의 음식 특이 항체 검사가 개의 이상 식이 반응을 진단하는 데 신뢰할 수 없다고 결론지었다. 건강한 개도 양성이 나올 수 있고, 알레르기가 있는 개가 음성이 나올 수도 있다.</li>
<li><strong>털 검사</strong>: 일부 연구에서 물이나 가짜 털로 검사해도 비슷한 양성 결과가 나왔다는 보고가 있으며, 정확도를 검증한 자료를 제시하지 못한 업체가 많았다.</li>
<li>혈청 검사는 반복 검사 시 결과가 달라지는 등 재현성과 정확도가 떨어지는 것으로 보고되었다.</li>
</ul>

<div class="callout-dog">
<strong>결과표만 보고 사료를 바꾸지 마세요</strong><br>
• 양성으로 나온 재료를 모두 끊으면 영양 불균형이 생길 수 있다<br>
• 음성이라고 안심해서 진짜 원인(벼룩, 환경 알레르기)을 놓칠 수 있다<br>
• 진단은 수의사와 함께 식이 시험으로 확인한다
</div>

<h2>제대로 된 진단: 제한식 식이 시험</h2>
<ol>
<li><strong>다른 원인 먼저 배제</strong>: 벼룩 알레르기, 환경 알레르기(아토피), 감염(세균·곰팡이), 옴 등 피부 질환을 먼저 확인·치료한다.</li>
<li><strong>제한식 급여</strong>: 새로운 단백질 식이 또는 가수분해 단백질 처방식만 보통 8~12주 정도 먹인다. 이 기간에는 간식, 맛이 첨가된 약, 사람 음식, 영양제를 모두 중단한다.</li>
<li><strong>증상 평가</strong>: 가려움이 호전되었는지 기록한다.</li>
<li><strong>재도전</strong>: 이전 식사를 다시 먹여 증상이 재발하면 식이 알레르기로 확진한다.</li>
<li><strong>장기 관리</strong>: 문제 재료를 확인해 피하는 식단을 정한다.</li>
</ol>

<h2>흔한 오해</h2>
<table>
<thead><tr><th>오해</th><th>사실</th></tr></thead>
<tbody>
<tr><td>곡물이 알레르기 원인이다</td><td>많은 연구에서 단백질 원(소고기, 유제품, 닭고기 등)이 흔한 원인으로 보고되며 곡물만의 문제로 단정할 수 없다</td></tr>
<tr><td>한 번 검사하면 평생 피할 재료를 알 수 있다</td><td>간편 검사는 신뢰성이 낮아 식이 시험 없이는 확정할 수 없다</td></tr>
<tr><td>알레르기는 어릴 때만 생긴다</td><td>나이에 상관없이 생길 수 있다</td></tr>
<tr><td>가려우면 식이 알레르기다</td><td>벼룩·환경 알레르기가 더 흔한 경우가 많다</td></tr>
</tbody>
</table>

<h2>마지막으로</h2>
<p>식이 알레르기가 의심되면 검사 키트 대신 수의사와 함께 식이 시험을 계획하자. 시간이 걸리지만 가장 확실한 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.veterinarypracticenews.com/the-pros-and-cons-of-food-allergy-testing/ — Veterinary Practice News, The pros and cons of food allergy testing",
      "https://academy.royalcanin.com/en/veterinary/testing-for-food-specific-antibodies-in-saliva-and-blood-of-food-allergic-and-healthy-dogs — Royal Canin Academy, Testing for food-specific antibodies in saliva and blood of food-allergic and healthy dogs",
      "https://vethelpdirect.com/vetblog/2023/11/19/allergy-tests-on-dog-hair-do-they-work/ — VetHelpDirect, Allergy tests on dog hair: do they work?",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-19T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-618",
    slug: "cat-felv-management-guide",
    type: "blog",
    category: 3,
    title: "고양이 FeLV(백혈병 바이러스) — 진단 후 알아야 할 것",
    subtitle: "FeLV 전파 경로, 예후, FIV와의 차이, 관리 방법, 다묘 가정 위험",
    metaTitle: "고양이 FeLV(백혈병 바이러스) — 전파·예후·관리·다묘 가정 가이드 | 펫지기",
    metaDescription: "고양이 FeLV(고양이 백혈병 바이러스) 진단 후 알아야 할 것들. FIV와의 차이, 전파 경로, 예후와 수명, 다묘 가정 위험도, 관리 방법을 정리했습니다.",
    body: `<p>고양이 백혈병 바이러스(FeLV) 양성 진단을 받으면 막막하지만, 양성이라고 해서 곧바로 남은 시간이 짧은 것은 아니다. 감염 양상에 따라 경과가 다르고, 올바른 관리와 정기 검진으로 오랜 시간 건강하게 지내는 고양이도 있다. 진단 후 알아야 할 점을 정리했다.</p>

<h2>FeLV란</h2>
<p>FeLV는 고양이 사이에서 침, 코 분비물, 그루밍, 밥그릇·물그릇 공유, 물림, 어미에서 새끼로의 수직 감염으로 전파되는 레트로바이러스다. 감염되면 면역 기능 저하, 빈혈, 림프종 같은 종양 위험이 높아질 수 있다. 감염 후 경과는 고양이의 면역 반응에 따라 달라 하나의 경로로 정해지지 않는다.</p>

<h2>검사</h2>
<ul>
<li>1차 검사는 혈액 항원 검사(신속 키트)이며, 양성이면 확인 검사(다른 방법 또는 재검사)를 한다.</li>
<li>감염 초기에는 음성이 나올 수 있어 몇 주 뒤 재검사를 권하는 경우가 있다.</li>
<li>건강한 고양이에게 무작위로 검사하면 위양성이 나올 수 있어, 위험 요인이나 임상 증상이 있을 때 검사하도록 권하는 지침도 있다. 새로 입양한 고양이는 기존 고양이와 합사하기 전에 검사하는 것이 일반적이다.</li>
</ul>

<h2>양성 진단 후 관리</h2>
<table>
<thead><tr><th>항목</th><th>내용</th></tr></thead>
<tbody>
<tr><td>실내 생활</td><td>다른 고양이에게 옮기지 않고, 외부 병원체에 노출되지 않도록 실내에서만 지낸다</td></tr>
<tr><td>정기 검진</td><td>6개월마다 또는 수의사가 권하는 간격으로 혈액 검사, 체중, 구강 검사를 한다</td></tr>
<tr><td>식이</td><td>조리하지 않은 날고기·살균하지 않은 우유는 피하고 균형 잡힌 사료를 먹인다</td></tr>
<tr><td>중성화</td><td>스트레스와 싸움, 도주를 줄이기 위해 권장된다</td></tr>
<tr><td>백신 계획</td><td>면역이 저하된 고양이는 접종 계획을 수의사와 개체별로 상담한다</td></tr>
<tr><td>항바이러스 치료</td><td>일부 약물이 바이러스 양을 줄일 수 있으나 부작용이 있고 모든 경우에 효과적이지는 않다. 수의사와 상의한다</td></tr>
</tbody>
</table>

<h2>다묘 가정</h2>
<ul>
<li>양성 고양이는 음성 고양이와 분리하는 것이 안전하다. 예방접종을 완료한 음성 고양이와 함께 지내는 방법은 위험을 완전히 없애지 못하므로 수의사와 상의한다.</li>
<li>밥그릇, 물그릇, 화장실을 공유하지 않게 한다.</li>
<li>FeLV 백신은 감염 위험이 있는 고양이에게 권장된다. 생활 환경에 따라 접종 여부를 수의사와 정한다.</li>
</ul>

<div class="callout-cat">
<strong>이런 증상이면 바로 진료</strong><br>
• 며칠 이상 식욕이 줄거나 체중이 빠진다<br>
• 잇몸이 창백하고 처진다 (빈혈 가능성)<br>
• 림프절이 붓거나 호흡이 가쁘다<br>
• 구내염, 만성 설사, 반복되는 감염이 있다
</div>

<h2>마지막으로</h2>
<p>FeLV 양성이어도 실내 생활, 정기 검진, 스트레스 관리로 삶의 질을 유지할 수 있다. 검사 결과가 나오면 수의사와 장기 관리 계획을 세우자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.aspcapro.org/sites/default/files/2023-11/felv-testing-management-2023.pdf — ASPCA Pro, FeLV testing and management (2023)",
      "https://merck-animal-health-usa.com/offload-downloads/feline-leukemia-virus — Merck Animal Health, Feline Leukemia Virus",
      "https://scienceinsights.org/is-there-a-cure-for-feline-leukemia-what-vets-say/ — Science Insights, Is there a cure for feline leukemia?",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-20T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-619",
    slug: "cat-toxic-indoor-plants-list",
    type: "blog",
    category: 5,
    title: "고양이에게 독성인 실내 식물 — 인테리어 전에 확인해야 할 목록",
    subtitle: "고독성·중독성·저독성 식물 분류, 중독 증상, 안전한 대체 식물",
    metaTitle: "고양이 독성 실내 식물 — 고독성·중독성·안전 식물 완전 목록 | 펫지기",
    metaDescription: "고양이에게 독성인 실내 식물을 정리했습니다. 백합·몬스테라·포인세티아 등 고독성 식물, 중독 증상, 고양이와 함께해도 안전한 대체 식물을 알아보세요.",
    body: `<p>예쁜 실내 식물이 고양이에게 치명적일 수 있다. 고양이가 어떤 식물이든 입에 넣는 경우가 있으므로, 미리 확인하는 것이 중요하다.</p>

<h2>고독성 식물 (즉시 응급)</h2>
<div class="callout-cat">
<strong>고양이 치명적 독성 식물</strong><br>
• <strong>백합(Lily) 전체 종류</strong>: 극소량으로도 신부전 유발 — 즉시 응급<br>
• <strong>협죽도(Oleander)</strong>: 심장 독성<br>
• <strong>대황(Rhubarb)</strong>: 신장 독성<br>
• <strong>아이비(포도 Hedera)</strong>: 구토·설사·피부 자극<br>
• <strong>딥라도레나·절란(Dieffenbachia)</strong>: 구강·소화기 자극
</div>

<h2>중독성 식물 (소량 섭취 시 불쾌감)</h2>
<ul>
<li>몬스테라·필로덴드론: 구강 자극·구토</li>
<li>포인세티아: 경미한 소화기 자극</li>
<li>알로에 베라: 구토·설사</li>
<li>스파티필름(Peace Lily): 구강 자극</li>
<li>선인장: 가시 상처 위험</li>
</ul>

<h2>안전한 대체 식물</h2>
<ul>
<li>스파이더 플랜트 (Spider Plant): 가장 안전한 실내 식물 중 하나</li>
<li>마란타 (Prayer Plant): 안전</li>
<li>에어플랜트 (Tillandsia): 안전</li>
<li>캣그라스 (고양이 풀): 고양이 전용 — 무해하고 즐겨 먹음</li>
</ul>

<h2>중독 증상 발생 시</h2>
<ul>
<li>식물 이름 확인 즉시</li>
<li>ASPCA 동물 독성 데이터베이스(aspca.org) 확인</li>
<li>즉시 동물병원 또는 동물 중독 상담 전화</li>
</ul>

<h2>마지막으로</h2>
<p>특히 백합은 화분뿐 아니라 꽃다발로 집에 들어오는 경우가 있다. 고양이가 있는 가정에 백합 반입은 생명을 위협할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA Animal Poison Control — Toxic and Non-Toxic Plants for Cats",
      "한국수의응급의학회 식물 중독 임상 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-20T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-620",
    slug: "pet-food-recall-response-guide",
    type: "blog",
    category: 4,
    title: "사료 리콜 시 대처 방법 — 먹이던 사료가 리콜됐을 때",
    subtitle: "국내 리콜 정보 확인 경로, 즉각 조치, 수의사 방문 기준, 환불 청구",
    metaTitle: "사료 리콜 대처 — 국내 확인 경로·즉각 조치·환불 청구 가이드 | 펫지기",
    metaDescription: "반려동물 사료 리콜 정보를 확인하고 대처하는 방법. 국내 리콜 정보 확인 경로, 리콜 사료 먹였을 때 즉각 조치, 수의사 방문 기준, 환불 청구를 정리했습니다.",
    body: `<p>인터넷에서 "내가 먹이는 사료가 리콜됐다"는 소식을 접했다. 어떻게 해야 할까?</p>

<h2>리콜 정보 확인 경로</h2>
<ul>
<li>농림축산검역본부(www.qia.go.kr) — 국내 공식 리콜 정보</li>
<li>FDA(미국): 해외 수입 제품 리콜 정보 (www.fda.gov/animal-veterinary)</li>
<li>제조사 공식 홈페이지·SNS</li>
<li>반려동물 커뮤니티는 확인되지 않은 정보 포함될 수 있음 — 공식 채널로 확인</li>
</ul>

<h2>리콜 사료를 확인하는 방법</h2>
<div class="callout-dog">
<strong>내 제품 리콜 여부 확인</strong><br>
• 제품명 + 생산 일자 + 로트 번호 확인<br>
• 리콜은 특정 로트(batch)만인 경우가 많음<br>
• 포장 사진과 리콜 대상 조건 대조<br>
• 불확실하면 제조사 고객센터 문의
</div>

<h2>이미 먹였을 때 즉각 조치</h2>
<ul>
<li>즉시 해당 사료 급여 중단</li>
<li>남은 사료 밀봉 보관 (증거 보존)</li>
<li>리콜 원인 확인 (세균·독소·이물질 등)</li>
<li>강아지·고양이 이상 증상 모니터링 24~72시간</li>
</ul>

<h2>수의사 방문 기준</h2>
<ul>
<li>구토·설사·혈변·무기력 발생 시 즉시 방문</li>
<li>살모넬라·아플라톡신 등 심각한 오염이면 증상 없어도 방문 권장</li>
<li>방문 시 리콜 정보와 섭취 기간 알리기</li>
</ul>

<h2>환불·손해배상</h2>
<ul>
<li>구매처 또는 제조사에 환불 요청 (영수증·포장 보존)</li>
<li>치료비 발생 시 진단서와 함께 손해배상 청구 가능</li>
<li>한국소비자원 피해구제 접수 가능</li>
</ul>

<h2>마지막으로</h2>
<p>리콜은 안전을 위한 조치다. 공식 확인 없이 커뮤니티 소식만으로 패닉하지 말고, 공식 경로에서 확인하는 것이 먼저다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "농림축산검역본부 반려동물 사료 안전관리 안내",
      "한국소비자원 반려동물 용품 피해구제 절차 안내",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-21T09:00:00.000Z",
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
  console.log("블로그 포스트 99차 시딩 완료! (blog-616 ~ blog-620)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
