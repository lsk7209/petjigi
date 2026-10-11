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
    body: `<p>집에서 키우는 화분과 선물받은 꽃다발 중에는 고양이에게 치명적인 것이 있다. 특히 백합과 식물은 아주 적은 양으로도 급성 신부전을 일으킬 수 있다. 위험한 식물을 알고 미리 치우는 것이 중요하다.</p>

<h2>가장 위험한 식물</h2>
<table>
<thead><tr><th>식물</th><th>독성과 증상</th></tr></thead>
<tbody>
<tr><td>백합 (릴리, 나리, 원추리 포함)</td><td>급성 신부전. 꽃가루, 잎, 줄기, 꽃병 물까지 위험할 수 있다. ASPCA는 소량 노출도 치명적일 수 있다고 경고한다</td></tr>
<tr><td>소철(사고야자)</td><td>간 독성이 강하다. 씨앗이 가장 독성이 높고 식물 전체가 위험하다</td></tr>
<tr><td>철쭉·진달래(아젤리아, 로도덴드론)</td><td>구토, 침 흘림, 심장·신경 증상</td></tr>
<tr><td>협죽도(올레안더)</td><td>심장에 영향을 준다</td></tr>
<tr><td>튤립·수선화·히아신스(구근)</td><td>구근에 독성이 많아 구토·설사, 일부는 심장 문제</td></tr>
<tr><td>시클라멘, 칼랑코에</td><td>구토·설사, 심장 리듬 이상 가능</td></tr>
<tr><td>피마자</td><td>씨앗에 강한 독소가 있다</td></tr>
</tbody>
</table>

<div class="callout-cat">
<strong>백합은 즉시 응급</strong><br>
• 고양이가 백합의 잎, 꽃가루를 핥았거나 꽃병 물을 마셨다면 증상이 없어도 즉시 병원에 간다<br>
• 초기에는 구토와 식욕 부진 정도지만 시간이 지나면 신장이 손상되어 위험해질 수 있다 — 빠른 처치가 생존에 결정적이다<br>
• 꽃다발에 백합이 섞여 있다면 집에 들이지 않는다
</div>

<h2>비교적 안전한 식물 (참고)</h2>
<p>ASPCA는 반려동물에게 독성이 없는 식물 목록도 제공한다. 일반적으로 알려진 예로는 스파이더 플랜트, 보스턴 고사리, 야자류 일부 등이 있으나, 이름이 비슷한 종 중 독성이 있는 식물이 있으므로 학명까지 확인해야 한다. '안전한 식물'도 많이 먹으면 구토를 일으킬 수 있다.</p>

<h2>예방 방법</h2>
<ul>
<li>집에 있는 식물의 정확한 종(학명)을 확인한다. 이름표를 보관한다.</li>
<li>독성 식물은 키우지 않거나 고양이가 닿지 못하는 곳에 둔다. 높이만으로는 고양이를 막기 어렵다.</li>
<li>고양이용 풀(귀리, 캣그래스)을 따로 마련해 식물을 갉는 습관을 대체한다.</li>
<li>시든 잎, 떨어진 꽃잎을 즉시 치운다.</li>
<li>선물받은 꽃다발은 구성 식물을 확인한다.</li>
</ul>

<h2>중독이 의심될 때</h2>
<ol>
<li>식물의 이름과 먹은 양, 시간을 확인한다. 식물 사진이나 일부를 챙긴다.</li>
<li>임의로 구토를 시키지 않는다.</li>
<li>즉시 동물병원이나 동물 중독 상담 센터에 연락한다.</li>
<li>입과 털에 묻은 꽃가루는 닦아내되, 병원에 가는 것이 우선이다.</li>
</ol>

<h2>마지막으로</h2>
<p>고양이를 키우는 집에서는 백합과 식물을 아예 들이지 않는 것이 가장 안전하다. 새 식물을 사기 전 반려동물 안전 여부를 확인하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.aspca.org/news/do-you-know-which-flowers-and-plants-are-toxic-pets-our-experts-explain — ASPCA, Which flowers and plants are toxic for your pets?",
      "https://www.birdsandblooms.com/gardening/gardening-basics/poisonous-plants-cats — Birds & Blooms, Poisonous plants every cat owner should avoid",
    ],
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
    body: `<p>반려동물 사료나 간식이 회수(리콜) 대상이라는 소식을 접하면 당황하기 쉽다. 내가 먹이는 제품이 해당되는지 확인하는 방법과 이미 먹인 경우의 대처를 정리한다. 이 글은 일반 정보이며 실제 회수 대상은 공식 공지를 기준으로 확인해야 한다.</p>

<h2>회수가 발생하는 이유</h2>
<ul>
<li>세균(살모넬라 등)이나 곰팡이독소 오염</li>
<li>영양 성분 결함(과다·결핍)</li>
<li>이물질 혼입, 표시사항 위반</li>
<li>드물게는 병원성 바이러스 검출 사례도 있다. 2023년에는 고병원성 AI가 검출된 고양이 생식사료에 대해 회수·폐기 명령이 내려진 사례가 보도되었다.</li>
</ul>

<h2>내 제품이 해당되는지 확인</h2>
<ol>
<li>포장의 <strong>제품명, 제조일자·유통기한, 제조번호(로트)</strong>를 확인한다.</li>
<li>제조사 공지, 농림축산식품부·지자체의 공고, 식품안전나라 등 공식 채널에서 회수 정보를 확인한다.</li>
<li>대상이면 제조사나 구입처에 연락해 반품·환불 절차를 확인한다.</li>
<li>포장지와 영수증을 보관한다 (사진을 찍어 두기).</li>
</ol>

<h2>회수 대상 제품을 발견했다면</h2>
<div class="callout-dog">
<strong>즉시 해야 할 일</strong><br>
• 더 이상 먹이지 않고 밀봉해서 보관한다 (회수·검사에 필요할 수 있다)<br>
• 다른 동물이 먹지 못하게 한다<br>
• 이미 먹인 경우 구토, 설사, 식욕 부진, 처짐, 호흡 이상을 관찰한다<br>
• 증상이 있으면 남은 제품 정보(제조번호, 사진)와 함께 병원에 간다<br>
• 만진 뒤에는 손을 씻는다 (사람도 세균에 감염될 수 있다)
</div>

<h2>증상별 병원 방문 기준</h2>
<table>
<thead><tr><th>증상</th><th>조치</th></tr></thead>
<tbody>
<tr><td>구토·설사 1~2회, 활기 정상</td><td>사료를 중단하고 상태를 관찰, 지속되면 진료</td></tr>
<tr><td>반복 구토, 혈변, 식욕 부진, 처짐</td><td>당일 진료</td></tr>
<tr><td>호흡 곤란, 발작, 비틀거림</td><td>즉시 응급 병원</td></tr>
</tbody>
</table>
<p>발열·호흡 증상이 있는 고양이가 특정 생식사료를 먹었다면 가축방역기관에 신고하도록 안내된 사례가 있다. 공식 공지의 안내를 따른다.</p>

<h2>사료를 바꿀 때</h2>
<p>다른 사료로 바꿀 때는 7~10일에 걸쳐 서서히 전환한다 (<a href="/blog/puppy-food-transition-timing">사료 전환 가이드</a>). 급하게 바꾸면 소화 문제가 생길 수 있다.</p>

<h2>평소 대비</h2>
<ul>
<li>사료 포장의 제조번호를 사진으로 남기고, 큰 포장은 원 포장지째 보관한다.</li>
<li>사료를 소분할 때는 로트 정보를 같이 보관한다.</li>
<li>제조사 공지를 받을 수 있게 구매 채널 알림을 켜 둔다.</li>
</ul>

<h2>마지막으로</h2>
<p>회수 소식을 들으면 우선 제조번호를 확인하고, 해당되면 먹이를 중단하고 증상을 관찰하자. 이상이 있으면 증거 사진과 함께 병원에 가자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.dailyvet.co.kr/?p=190431 — 데일리벳, 고병원성 AI 검출 고양이 사료 전량 회수",
      "https://www.mafra.go.kr/bbs/home/792/566734/artclView.do — 농림축산식품부, 반려동물 사료 안전성·표시사항 특별점검 추진",
      "https://www.metroseoul.co.kr/article/20230802500690 — 메트로서울, 사료 회수 관련 보도",
    ],
    disclaimer: "이 글은 일반적인 정보 제공 목적으로 작성되었으며, 법률·세무·소비자 분쟁에 대한 전문가 자문을 대체하지 않습니다. 법령과 제도는 자주 바뀌므로 실제 적용 전 관할 기관(지자체, 한국소비자원, 농림축산검역본부 등)이나 전문가에게 최신 내용을 확인하세요.",
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
