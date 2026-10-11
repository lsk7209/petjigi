import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 61 — cat3×2 + cat2×1 + cat5×1 + cat1×1 = 5편 (IDs 426-430)
// Macros: A, F, E, F, B
// Angles: RA3, RA1, RA6, RA4, RA7

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-426",
    slug: "dog-ear-hematoma-guide",
    type: "blog",
    category: 3,
    title: "강아지 귀혈종 — 귀가 빵빵하게 부풀었을 때",
    subtitle: "귀혈종 원인(자가 외상·외이염 연관), 자연 치유 vs 수술 기준, 재발 예방",
    metaTitle: "강아지 귀혈종 원인·치료·재발 예방 가이드 | 펫지기",
    metaDescription: "강아지 귀가 빵빵하게 부풀면 귀혈종입니다. 원인인 자가 외상과 외이염 연관성, 자연 치유·배액·수술 기준, 재발 예방법을 정리했습니다.",
    body: `<p>강아지 귓바퀴(이개)가 갑자기 빵빵하게 부풀어 오르면 귀혈종(Aural Hematoma)일 수 있다. 귓바퀴의 피부와 연골 사이에 혈액이 고인 상태로, 만지면 말랑하고 따뜻하며 강아지가 아파하거나 귀를 계속 털 수 있다.</p>

<h2>왜 생기나</h2>
<p>작은 혈관이 터지면서 피가 고이는데, 대개 귀를 심하게 긁거나 머리를 세게 흔들 때 생긴다. 그 배경에는 외이염, 귀 진드기, 알레르기(아토피 피부염·식이 알레르기 등)처럼 귀를 가렵게 만드는 문제가 있는 경우가 많다. 그래서 혈종만 처리하면 같은 귀나 반대쪽 귀에 다시 생길 수 있다.</p>

<h2>치료 선택지 비교</h2>
<table>
<thead><tr><th>방법</th><th>내용</th><th>알아둘 점</th></tr></thead>
<tbody>
<tr><td>치료 없이 경과 관찰</td><td>일부는 저절로 흡수된다</td><td>귀가 두꺼워지고 주름진 이른바 콜리플라워 귀로 남는 경우가 많다</td></tr>
<tr><td>주사기 배액(+스테로이드 주입)</td><td>마취 부담이 적다</td><td>메르크 수의학 매뉴얼은 성공률을 약 절반 정도로 소개하며, 반복 배액이 필요할 수 있다</td></tr>
<tr><td>수술적 배액·봉합</td><td>피를 빼고 세척한 뒤 여러 군데를 봉합해 고인 공간을 없앤다</td><td>실밥은 흉터 조직이 생기도록 보통 3주 정도 유지한다. 마취가 필요하다</td></tr>
</tbody>
</table>
<p>어떤 방법이 맞는지는 혈종의 크기, 통증, 마취 가능 여부, 재발 여부에 따라 수의사가 판단한다.</p>

<div class="callout-dog">
<strong>집에서 하지 말아야 할 것</strong><br>
• 혈종을 직접 바늘로 찌르거나 짜내기 (감염·재발 위험)<br>
• 귀를 문지르거나 세게 눌러 확인하기<br>
• 외이염 약을 임의로 넣기 — 고막 상태를 모르면 위험할 수 있다
</div>

<h2>진료받을 때 확인하면 좋은 질문</h2>
<ul>
<li>귀 안쪽(외이도) 검사와 세포 검사를 함께 했는지</li>
<li>가려움의 원인으로 알레르기를 의심하는지, 어떤 검사를 권하는지</li>
<li>수술 후 붕대·넥칼라를 얼마나 유지하고 언제 재방문하는지</li>
</ul>

<h2>재발을 줄이려면</h2>
<p>귀 긁기가 다시 시작되지 않는지 매일 살핀다. 귀에서 냄새·진물이 나거나 머리를 자주 흔들면 혈종이 없어도 진료 대상이다. 근본 원인 치료가 빠지면 어떤 시술을 해도 다시 생길 수 있다.</p>

<h2>마지막으로</h2>
<p>귀혈종은 응급은 아니지만 통증이 있고 방치하면 귀 모양이 변형될 수 있다. 부기를 발견하면 며칠 안에 수의사 진료를 받고, 원인이 된 가려움까지 함께 치료하는 것이 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vcahospitals.com/know-your-pet/hematoma-of-the-ear-in-dogs — VCA, Hematoma of the Ear in Dogs",
      "https://www.merckvetmanual.com/ear-disorders/diseases-of-the-pinna/auricular-hematomas-in-animals — Merck Veterinary Manual, Auricular Hematomas in Animals",
      "https://www.merckvetmanual.com/dog-owners/ear-disorders-of-dogs/disorders-of-the-outer-ear-in-dogs — Merck Veterinary Manual, Disorders of the Outer Ear in Dogs",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-16T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-427",
    slug: "dog-mast-cell-tumor-guide",
    type: "blog",
    category: 3,
    title: "강아지 비만세포종 — 피부 혹이 전부 지방종은 아니다",
    subtitle: "비만세포종 외관 특징, 등급 분류, 수술 기준, 조기 발견이 중요한 이유",
    metaTitle: "강아지 비만세포종(MCT) — 증상·등급·치료 가이드 | 펫지기",
    metaDescription: "강아지 피부 혹이 비만세포종일 수 있습니다. 외관 특징, 1~3등급 구분, 수술 기준, 항히스타민 전처치 필요성을 정리했습니다.",
    body: `<p>강아지 피부에 혹이 생기면 지방종이겠거니 하고 넘기기 쉽다. 그러나 개 피부 종양에서 흔히 다루는 것 중 하나가 비만세포종(Mast Cell Tumor, MCT)이고, 겉모양이 지방종처럼 보일 수 있다. 그래서 만져지는 혹은 세포검사로 확인하는 것이 안전하다.</p>

<h2>비만세포종이란</h2>
<p>비만세포에서 생기는 종양으로, 주로 피부와 피하에서 발견된다. 비만세포는 히스타민 같은 물질을 가지고 있어서, 종양이 자극받거나 커지면 이런 물질이 나와 주변이나 전신에 영향을 줄 수 있다. 일부 개에서는 위궤양이 동반되고, 구토·설사·부종·멍·허탈 같은 증상이 나타나기도 한다.</p>

<h2>진단은 어떻게 하나</h2>
<table>
<thead><tr><th>단계</th><th>내용</th></tr></thead>
<tbody>
<tr><td>세침흡인검사(FNA)</td><td>혹의 세포를 뽑아 특징적인 과립을 확인한다. 메르크 수의학 매뉴얼은 피부 종양을 절제하기 전에 세침흡인으로 비만세포종을 배제하라고 안내한다</td></tr>
<tr><td>조직검사</td><td>등급과 절제 경계를 확인하는 데 필요하다. 세포검사만으로는 예후와 연결되는 등급을 대신할 수 없다</td></tr>
<tr><td>병기 설정</td><td>혈액검사, 가까운 림프절 세포검사, 영상검사 등을 상황에 맞게 조합한다. 저등급에서는 간·비장 검사의 필요성에 대한 연구도 있어 수의사가 판단한다</td></tr>
</tbody>
</table>

<h2>예후에 영향을 주는 요인</h2>
<ul>
<li>수술 당시 종양 크기: 지름 3cm를 넘으면 생존 기간이 짧아지는 경향이 보고되어 있다.</li>
<li>불완전 절제, 빠른 성장, 점막과 피부 경계·주둥이·배·포피·발톱 아래 같은 부위 발생은 더 공격적인 경과와 연관된다.</li>
<li>진단 시 전신 증상이 있는 경우.</li>
<li>조직 등급: 저등급은 국소 치료로 좋은 경과를 보이는 경우가 많고, 고등급일수록 추가 치료가 필요하다.</li>
</ul>

<div class="callout-dog">
<strong>빨리 진료받아야 하는 경우</strong><br>
• 새로 생겼거나 빠르게 커지는 혹<br>
• 혹이 붉어지거나 진물·출혈이 있음<br>
• 혹이 있으면서 구토, 검은 변, 식욕 저하, 무기력이 함께 나타남<br>
• 혹 주변이 멍들거나 붓는 경우
</div>

<h2>치료 방향</h2>
<p>비만세포종으로 확인되면 넓고 깊은 절제를 계획하는 것이 일반적인 원칙이다. 절제 범위는 등급과 위치에 따라 달라지고, 병리 결과에 따라 추가 수술, 방사선, 약물 치료가 논의된다. 수술 전후 약 사용은 수의사가 판단한다. 집에서 혹을 문지르거나 짜면 자극으로 증상이 악화될 수 있으니 하지 않는다.</p>

<h2>마지막으로</h2>
<p>혹의 크기가 작아도 겉모양으로 양성이라고 판단할 수 없다. 새로 생긴 혹은 한 번은 세포검사를 받고, 비만세포종이면 등급과 병기를 확인해 치료 계획을 세우는 것이 순서다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.merckvetmanual.com/dog-owners/skin-disorders-of-dogs/tumors-of-the-skin-in-dogs — Merck Veterinary Manual, Tumors of the Skin in Dogs",
      "https://www.merckvetmanual.com/integumentary-system/tumors-of-the-skin-and-soft-tissues/lymphocytic-histiocytic-and-related-cutaneous-tumors-in-animals — Merck Veterinary Manual, Lymphocytic, Histiocytic, and Related Cutaneous Tumors in Animals",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9506313/ — The Role of Fine Needle Aspiration of Liver and Spleen in the Staging of Low-Grade Canine Cutaneous Mast Cell Tumor",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-16T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-428",
    slug: "dog-food-topper-guide",
    type: "blog",
    category: 2,
    title: "강아지 사료 토퍼 활용 가이드 — 건식 사료를 더 맛있게 만드는 방법",
    subtitle: "토퍼 종류, 칼로리 계산 원칙, 건강에 도움이 되는 토퍼 vs 단순 기호성 토퍼",
    metaTitle: "강아지 사료 토퍼 완전 가이드 — 종류·칼로리·활용법 | 펫지기",
    metaDescription: "강아지 사료 토퍼 종류와 활용 방법. 칼로리 계산 원칙, 건강에 도움이 되는 토퍼, 편식·노령견에게 활용하는 방법을 정리했습니다.",
    body: `<p>편식하는 강아지, 입맛이 줄어든 노령견, 늘 같은 사료에 질린 강아지에게 토퍼(사료 위에 올려 주는 소량의 첨가식)는 식사를 더 매력적으로 만드는 방법이다. 다만 토퍼는 완전한 식사가 아니므로 열량과 안전성을 먼저 따져야 한다.</p>

<h2>토퍼의 종류</h2>
<table>
<thead><tr><th>종류</th><th>예시</th><th>주의</th></tr></thead>
<tbody>
<tr><td>동물성 단백질</td><td>삶은 닭가슴살(껍질·양념 제외), 삶은 달걀, 무염 캔 참치 소량, 동결건조 육류</td><td>양념·소금·뼈 제외. 날것은 세균 위험</td></tr>
<tr><td>채소·과일</td><td>찐 단호박, 당근, 블루베리</td><td>포도·건포도·양파·마늘 등 개에게 위험한 식품은 절대 금지</td></tr>
<tr><td>수분 보충</td><td>양념 없는 사골·닭육수, 육수 얼음</td><td>소금·양파·마늘이 들어간 육수는 사용하지 않는다</td></tr>
<tr><td>상업 제품</td><td>동결건조 토퍼, 습식 소량, 프로바이오틱스 가루</td><td>성분표와 열량 확인, 알레르기 원료 확인</td></tr>
</tbody>
</table>

<h2>열량 관리: 10% 이하</h2>
<p>UC 데이비스 수의영양 서비스는 간식과 추가 급여 식품이 하루 열량의 10%를 넘지 않아야 하고, 나머지 90% 이상은 완전하고 균형 잡힌 식사에서 나와야 한다고 안내한다. 토퍼도 여기에 포함된다. 토퍼를 올린 만큼 사료량을 줄이는 것이 기본이다.</p>
<div class="callout-dog">
<strong>계산 예시</strong><br>
하루 필요 열량이 400kcal인 강아지 → 토퍼와 간식 합계 40kcal 이내<br>
토퍼를 더한 날은 사료를 같은 열량만큼 줄인다<br>
※ 개체별 필요 열량은 체중, 나이, 활동량에 따라 다르므로 수의사와 확인한다
</div>

<h2>토퍼를 쓰기 전에 확인할 것</h2>
<ul>
<li><strong>식욕 저하의 원인</strong>: 갑자기 먹지 않는 것은 치과 질환, 위장 질환, 통증 등의 신호일 수 있다. 토퍼로 덮기 전에 진료를 받는다.</li>
<li><strong>질환이 있는 경우</strong>: 신장·췌장·알레르기 질환이 있거나 처방식을 먹는 강아지는 토퍼가 치료식에 방해가 될 수 있다.</li>
<li><strong>알레르기</strong>: 새 단백질을 한 번에 여러 가지 주지 말고 하나씩 시도한다.</li>
</ul>

<h2>편식하는 강아지에게 활용하기</h2>
<p>토퍼만 골라 먹고 사료를 거부하는 습관이 생길 수 있다. 사료와 잘 섞어 주고, 먹지 않을 때 더 맛있는 토퍼를 계속 올려 주는 식으로 반응하지 않는 것이 좋다. 식사 시간을 정해 10~15분 후에 치우는 규칙도 도움이 된다.</p>

<h2>마지막으로</h2>
<p>토퍼는 식사의 즐거움을 더해 주는 도구다. 10% 규칙과 안전한 재료만 지키면 건강한 습관이 된다. 식욕 변화가 계속되면 진료가 먼저다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://healthtopics.vetmed.ucdavis.edu/node/916 — UC Davis 수의대, Treat guidelines for dogs",
      "https://www.akc.org/expert-advice/nutrition/how-many-treats-can-dog-have/ — AKC, How many treats can a dog have",
      "https://www.dogfoodadvisor.com/dog-feeding-tips/how-to-use-dog-food-toppers/ — Dog Food Advisor, How to use dog food toppers",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-17T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-429",
    slug: "dog-home-grooming-basics",
    type: "blog",
    category: 5,
    title: "강아지 집에서 미용하기 — 전문 미용 사이 관리하는 방법",
    subtitle: "브러싱·귀 청소·발톱·항문낭 관리 주기, 미용 도구 선택, 강아지가 싫어할 때 대처",
    metaTitle: "강아지 집 미용 관리 가이드 — 브러싱·귀·발톱·항문낭 | 펫지기",
    metaDescription: "강아지를 집에서 미용하는 방법. 브러싱·귀 청소·발톱·항문낭 관리 주기와 방법, 필요한 도구, 싫어하는 강아지 훈련을 정리했습니다.",
    body: `<p>전문 미용실을 4~8주마다 방문해도 그 사이의 관리는 보호자 몫이다. 집에서 할 수 있는 기본 미용 관리를 알아두면 강아지의 건강과 위생을 유지하는 데 크게 도움이 된다.</p>

<h2>브러싱</h2>
<ul>
<li><strong>단모종</strong>: 주 1~2회 고무 브러시 또는 핀 브러시</li>
<li><strong>장모종</strong>: 매일~격일 슬리커 브러시 + 콤</li>
<li><strong>환절기</strong>: 주기 2배로 늘리기</li>
</ul>
<p>브러싱은 피부 혈액순환을 돕고 피부 상태를 확인하는 기회가 된다.</p>

<h2>귀 청소</h2>
<p>건강한 귀는 주 1회, 귀 문제가 있는 품종은 목욕 후마다 청소한다. 반려동물용 귀 세정제를 사용하며, 면봉은 귀 입구만.</p>

<h2>발톱 관리</h2>
<p>바닥에 발톱 소리가 나면 너무 긴 것이다. 2~4주 간격으로 확인·관리한다. 혈관(퀵)을 조금씩 자르며 신중하게.</p>

<h2>항문낭 관리</h2>
<p>강아지가 바닥에 엉덩이를 끌거나 항문 주변을 핥는다면 항문낭이 찼을 수 있다. 소형견·비만견은 특히 막히기 쉽다. 외부 짜기는 집에서 할 수 있지만, 처음이라면 수의사에게 방법을 배운 후 시도한다.</p>

<div class="callout-dog">
<strong>집 미용 도구 기본 세트</strong><br>
□ 품종에 맞는 브러시<br>
□ 발톱깎이<br>
□ 귀 세정제 + 솜볼<br>
□ 동결건조 간식 (긍정 강화용)
</div>

<h2>마지막으로</h2>
<p>집 미용 관리는 강아지와의 신뢰를 쌓는 시간이기도 하다. 짧게, 자주, 긍정적으로 진행하는 것이 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Kennel Club — Home Grooming Guide",
      "한국반려동물미용협회 가정 미용 관리 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-17T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-430",
    slug: "cat-coat-color-personality-myth",
    type: "blog",
    category: 1,
    title: "삼색 고양이·고등어 고양이 — 색깔로 성격을 판단해도 될까",
    subtitle: "털 색깔과 성격의 과학적 연관성, 삼색 암컷 유전학, 고양이 성격에 진짜 영향 미치는 요인",
    metaTitle: "고양이 털 색깔과 성격 — 삼색·고등어 오해와 진실 | 펫지기",
    metaDescription: "고양이 털 색깔과 성격의 관계를 과학적으로 살펴봤습니다. 삼색 고양이가 예민하다는 통념, 털 색깔 유전학, 성격에 진짜 영향을 미치는 요인을 정리했습니다.",
    body: `<p>'삼색 고양이는 성격이 까다롭다', '치즈 고양이는 순하다' — 이런 이야기를 들어 봤을 것이다. 털 색과 성격 사이에 정말 관계가 있는지, 연구가 말하는 것과 말하지 않는 것을 정리했다.</p>

<h2>UC 데이비스 설문 연구</h2>
<p>UC 데이비스 수의과대학 연구진은 1,200여 명의 고양이 보호자를 대상으로 설문을 했다. 그 결과 삼색(칼리코)과 별갑(토터셸) 고양이가 사람과 상호작용할 때 쉭쉭거리거나 물고 할퀴는 행동이 더 많다고 보호자들이 보고했다. 회색+흰색, 검정+흰색 고양이도 그런 행동이 약간 더 많다고 나타났다.</p>

<div class="callout-cat">
<strong>이 결과를 해석할 때 주의할 점</strong><br>
• 보호자가 직접 답한 설문이라 '삼색은 까칠하다'는 고정관념이 응답에 영향을 줬을 수 있다<br>
• 표본이 제한적이고, 털 색과 성격 사이의 유전적 연결은 입증되지 않았다<br>
• 연구진도 추가 연구가 필요하다고 밝혔다
</div>

<h2>삼색·별갑이 거의 암컷인 이유</h2>
<p>삼색·별갑 고양이는 대부분 암컷이다. 털의 검정/주황 색소 유전자가 X 염색체에 있고, 암컷은 X 염색체가 2개이므로 두 가지 색이 한 몸에 나타날 수 있기 때문이다. 수컷 삼색은 염색체 이상 등으로 매우 드물다. 이것은 털 색의 유전학이지 성격의 유전학이 아니다.</p>

<h2>성격에 영향을 주는 요소</h2>
<table>
<thead><tr><th>요소</th><th>설명</th></tr></thead>
<tbody>
<tr><td>어린 시기의 사회화</td><td>생후 초기(대략 2~7주)에 사람과 접촉한 경험이 이후 사람에 대한 태도에 큰 영향을 준다</td></tr>
<tr><td>부모 고양이의 기질</td><td>유전적 기질이 일부 전달될 수 있다</td></tr>
<tr><td>환경과 경험</td><td>입양 후 환경, 스트레스, 일과, 보호자와의 상호작용</td></tr>
<tr><td>건강 상태</td><td>통증이나 질환이 있으면 예민해지거나 공격적으로 보일 수 있다</td></tr>
<tr><td>중성화 여부</td><td>성호르몬과 관련된 행동에 영향</td></tr>
</tbody>
</table>

<h2>입양할 때는 어떻게 고를까</h2>
<ul>
<li>색 대신 그 고양이를 직접 만나서 반응을 본다.</li>
<li>보호소 직원에게 성격과 지내는 모습을 묻는다.</li>
<li>낯선 사람에게 다가오는지, 만지면 어떻게 하는지 천천히 관찰한다.</li>
<li>공격적으로 보인다면 먼저 통증이나 질환이 있는지 확인한다.</li>
</ul>

<h2>결론</h2>
<p>털 색은 성격을 예측하는 믿을 만한 도구가 아니다. 같은 색이라도 사회화와 환경에 따라 성격은 크게 달라진다. 고양이를 색이 아니라 한 마리의 개체로 만나 보자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.mentalfloss.com/animals/cats/why-tortoiseshell-and-calico-cats-are-extra-feisty — Mental Floss, Why Tortoiseshell and Calico Cats Are Extra Feisty",
      "https://www.cattownoakland.org/cat-town-blog/2021/03/fascinating-facts-about-tortoiseshell-cats — Cat Town Oakland, Fascinating Facts About Tortoiseshell Cats",
      "https://www.catster.com/guides/tortitude-unique-personality-tortoiseshell-cats-fact-fiction — Catster, Tortitude: fact or fiction",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-18T09:00:00.000Z",
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
  console.log("블로그 포스트 61차 시딩 완료! (blog-426 ~ blog-430)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
