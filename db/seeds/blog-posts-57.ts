import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 57 — cat2×2 + cat4×1 + cat3×1 + cat1×1 = 5편 (IDs 406-410)
// Macros: A, F, B, E, F
// Angles: RA4, RA7, RA2, RA5, RA3

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-406",
    slug: "raw-eggs-for-dogs-guide",
    type: "blog",
    category: 2,
    title: "강아지에게 달걀 줘도 되나 — 날달걀 vs 익힌 달걀",
    subtitle: "달걀의 영양 가치, 살모넬라·아비딘 위험, 날달걀과 익힌 달걀 비교, 급여 방법",
    metaTitle: "강아지 달걀 급여 가이드 — 날달걀 vs 익힌 달걀 비교 | 펫지기",
    metaDescription: "강아지에게 달걀을 줘도 되는지 알아봤습니다. 달걀 영양 가치, 날달걀 살모넬라·아비딘 위험, 익힌 달걀과 비교, 급여량을 정리했습니다.",
    body: `<p>달걀은 단백질과 비타민을 갖춘 식품이라 간식으로 주는 보호자가 많다. 다만 날달걀은 위험 요인이 있어서, 개에게는 완전히 익힌 달걀을 주는 것이 안전하다는 것이 AKC와 FDA의 일반적인 안내다.</p>

<h2>날달걀의 위험</h2>
<table>
<thead><tr><th>위험</th><th>설명</th></tr></thead>
<tbody>
<tr><td>살모넬라</td><td>껍데기가 깨끗하고 금이 없어도 달걀에 살모넬라균이 있을 수 있다고 FDA는 설명한다. 개가 증상이 없어도 대변과 침으로 균을 퍼뜨려 사람이나 다른 반려동물에게 옮길 수 있다</td></tr>
<tr><td>아비딘</td><td>흰자의 아비딘은 비오틴 흡수를 방해할 수 있다. 노른자에 비오틴이 있어 실제 결핍은 드물다고 AKC는 설명하며, 가열하면 아비딘의 영향이 없어진다</td></tr>
</tbody>
</table>
<p>"날달걀을 먹이는 것이 괜찮다"는 의견도 있지만, 대부분의 식품 안전 기관은 날것 급여를 권하지 않는다. 특히 면역이 약한 개, 어린 강아지, 노령견, 가족 중 임산부·영유아·노약자가 있다면 더 조심한다.</p>

<h2>안전하게 주는 법</h2>
<ol>
<li>흰자와 노른자가 단단하게 익도록 삶거나 익힌다.</li>
<li>기름, 버터, 소금, 양념을 넣지 않는다.</li>
<li>작은 개는 잘게 썰어서 준다.</li>
<li>간식으로 가끔, 소량만 준다. 달걀을 주식처럼 많이 주지 않는다.</li>
<li>만진 뒤에는 손과 도마, 식기를 씻는다.</li>
</ol>

<div class="callout-dog">
<strong>날달걀을 먹었다면</strong><br>
• 양이 적고 증상이 없으면 잘 관찰한다<br>
• 구토, 설사, 열, 무기력이 보이면 동물병원에 문의<br>
• 알레르기가 있거나 췌장염 병력이 있는 개는 달걀을 주기 전에 수의사와 상의
</div>

<h2>마지막으로</h2>
<p>달걀은 익혀서 소량 주는 것이 가장 안전하다. 날달걀의 이점이 위험을 상쇄한다고 말하기는 어렵다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.akc.org/expert-advice/nutrition/can-dogs-eat-eggs/ — AKC, Can Dogs Eat Eggs? Benefits, Risks, and How to Feed Them",
      "https://www.fda.gov/food/buy-store-serve-safe-food/what-you-need-know-about-egg-safety — FDA, What You Need to Know About Egg Safety",
      "https://www.fda.gov/animal-veterinary/animal-health-literacy/get-facts-about-salmonella — FDA, Get the Facts about Salmonella",
      "https://vcahospitals.com/know-your-pet/dogs-and-raw-food-diets — VCA, Dogs and Raw Food Diets",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-06T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-407",
    slug: "cat-food-allergy-elimination-diet",
    type: "blog",
    category: 2,
    title: "고양이 음식 알레르기 제거식 테스트 — 8~12주 프로토콜 완전 가이드",
    subtitle: "제거식이 필요한 증상, 단일 단백질·가수분해 단백질 사료 선택, 테스트 중 절대 금지",
    metaTitle: "고양이 음식 알레르기 제거식 테스트 — 8주 프로토콜 가이드 | 펫지기",
    metaDescription: "고양이 음식 알레르기 확인을 위한 제거식 테스트 방법. 증상, 단일 단백질·가수분해 사료 선택, 8~12주 진행법, 도전 테스트 방법을 정리했습니다.",
    body: `<p>고양이가 계속 긁고 털을 뽑거나, 구토와 설사가 반복되면 음식 알레르기를 의심해 볼 수 있다. 하지만 혈액검사나 키트로 확진하기는 어렵고, 가장 믿을 만한 방법은 배제식이(elimination diet) 시험이라고 VCA는 안내한다.</p>

<h2>배제식이 시험이란</h2>
<p>알레르기를 일으킬 수 있는 성분을 모두 끊고, 새로운 단백질이나 가수분해 단백질 사료만 일정 기간 먹여 증상이 좋아지는지 보는 검사다. 보통 8주 이상 걸리며 8~12주를 권하는 자료도 있다. 반응이 나타나는 시기는 개체마다 1~9주로 다양하다고 알려져 있다.</p>

<table>
<thead><tr><th>식이 유형</th><th>내용</th><th>유의점</th></tr></thead>
<tbody>
<tr><td>새로운 단백질 식이</td><td>지금까지 먹어본 적 없는 단백질원 사용 (예: 토끼, 사슴, 오리 등 급여 이력에 따라 선택)</td><td>과거 급여 이력을 정확히 알려야 한다</td></tr>
<tr><td>가수분해 단백질 식이</td><td>단백질을 잘게 쪼개 면역계가 반응하기 어렵게 만든 처방식</td><td>수의사가 제품을 선택한다</td></tr>
</tbody>
</table>

<h2>시험이 성공하려면</h2>
<div class="callout-cat">
<strong>시험 기간에 지킬 것</strong><br>
• 정해진 사료 외에 간식·영양제·사람 음식·맛을 입힌 약을 먹이지 않는다<br>
• 다른 고양이의 사료를 먹지 못하게 분리한다<br>
• 피부 증상과 배변 상태를 매일 기록한다<br>
• 중간에 사료를 바꾸거나 한 번이라도 다른 음식을 주면 결과가 무효가 될 수 있다
</div>

<h2>증상이 좋아졌다면</h2>
<p>배제식이로 호전되더라도 그것만으로 확진은 아니다. 원래 먹던 음식을 다시 먹여 증상이 재발하는지 확인하는 재도전(rechallenge)을 거쳐야 원인 성분을 확정할 수 있다. 재도전은 수의사 지시에 따라 한 가지씩 진행한다.</p>

<h2>음식 알레르기가 아닐 수도 있다</h2>
<ul>
<li>벼룩 알레르기와 환경 알레르기도 가려움의 흔한 원인이다.</li>
<li>만성 구토·설사는 염증성 장질환 등 다른 병일 수 있다.</li>
<li>그래서 시험 전에 외부 기생충 관리와 기본 검사를 먼저 하는 것이 좋다.</li>
</ul>

<h2>마지막으로</h2>
<p>배제식이는 번거롭지만 가장 확실한 방법이다. 기간과 규칙을 끝까지 지키는 것이 핵심이므로, 시작 전에 수의사와 사료 선택, 기간, 재도전 계획을 함께 정하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vcahospitals.com/know-your-pet/food-allergies-in-cats — VCA, Food Allergies in Cats",
      "https://vcahospitals.com/know-your-pet/implementing-an-elimination-challenge-diet-trial-cat — VCA, Implementing an Elimination-Challenge Diet Trial (Cat)",
      "https://www.merckvetmanual.com/cat-owners/skin-disorders-of-cats/allergies-of-cats — Merck Veterinary Manual, Allergies of Cats",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-06T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-408",
    slug: "pet-insurance-comparison-hidden-tips",
    type: "blog",
    category: 4,
    title: "펫보험 비교할 때 놓치는 것들 — 보험료보다 중요한 5가지",
    subtitle: "자기부담금 구조·연간 한도·항목별 한도·면책 조항·청구 방식 비교",
    metaTitle: "펫보험 비교 시 놓치는 것 5가지 — 보험료 외 핵심 체크 | 펫지기",
    metaDescription: "펫보험 비교할 때 보험료보다 중요한 것들. 자기부담금 구조, 연간 한도, 항목별 한도, 면책 조항, 청구 방식 5가지 핵심 체크포인트를 정리했습니다.",
    body: `<p>펫보험을 비교할 때 많은 보호자가 월 보험료만 보고 가입한다. 그러나 실제 보험금 수령 경험은 보험료보다 이 5가지가 더 결정적이다.</p>

<h2>1. 자기부담금 구조</h2>
<p>보험금 지급 시 보호자가 부담하는 금액이다. 두 가지 방식이 있다:</p>
<ul>
<li><strong>정액 방식</strong>: 매 청구마다 일정 금액(예: 10,000원) 공제</li>
<li><strong>정률 방식</strong>: 진료비의 일정 비율(예: 20%) 공제</li>
</ul>
<p>고액 진료가 많을 것 같으면 정액 방식이 유리. 소액 다수 청구가 많으면 정률 방식 검토.</p>

<h2>2. 연간 한도 vs 항목별 한도</h2>
<p>연간 보험금 한도가 500만 원이라도, 항목별 한도(예: 수술비 한도 100만 원)가 별도로 있으면 큰 수술 시 보장이 제한된다. 약관에서 '항목별 지급 한도' 조항을 반드시 확인해야 한다.</p>

<h2>3. 면책 조항 범위</h2>
<div class="callout-cat">
<strong>보험사별로 다를 수 있는 면책 항목</strong><br>
• 슬개골 탈구 (대기기간 차이 크게 있음)<br>
• 치과·구강 질환 (미보장인 경우 많음)<br>
• 선천성·유전성 질환<br>
• 중성화 수술<br>
• 미용 목적 처치<br>
• 예방접종·정기검진
</div>

<h2>4. 청구 방식</h2>
<ul>
<li><strong>직접 청구(Direct Claim)</strong>: 병원에서 바로 보험 처리. 보호자가 먼저 지불할 필요 없음. 제휴 병원 여부 확인 필요.</li>
<li><strong>간접 청구(Reimbursement)</strong>: 보호자가 먼저 지불 → 영수증 제출 → 지급. 제출 기한(보통 30~60일) 준수 필요.</li>
</ul>
<p>직접 청구가 편리하지만 제휴 병원이 제한적인 경우가 많다.</p>

<h2>5. 실손 vs 정액 보상</h2>
<ul>
<li><strong>실손</strong>: 실제 진료비에서 자기부담금을 제외한 금액 지급</li>
<li><strong>정액</strong>: 진단명에 따라 정해진 금액 지급</li>
</ul>
<p>실손이 일반적으로 더 유리하지만 보험료가 높은 경향. 정액은 예측 가능하지만 고액 치료에 불리.</p>

<h2>마지막으로</h2>
<p>보험료가 5천 원 더 싸더라도 자기부담금이 높거나 면책 범위가 넓으면 실제 보장이 적다. 비교할 때 총 보험료 × 가입 연수 vs 예상 보장 금액을 계산해보는 것이 현명하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "펫보험 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 반려동물보험 약관 핵심 조항 해설 2024",
      "한국소비자원 펫보험 약관 비교 분석 2025",
      "보험연구원 반려동물보험 시장 현황 리포트",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 실제 계약 내용은 해당 보험사 약관을 기준으로 합니다.",
    status: "published",
    publishedAt: "2026-08-07T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-409",
    slug: "dog-liver-disease-early-signs",
    type: "blog",
    category: 3,
    title: "강아지 간 질환 초기 신호 — 조용히 진행되는 침묵의 장기",
    subtitle: "간의 역할, 황달·복수·무기력 등 증상, 혈액검사 ALT·ALP 해석, 간 보호 식이",
    metaTitle: "강아지 간 질환 초기 신호·혈액검사·관리 가이드 | 펫지기",
    metaDescription: "강아지 간 질환은 증상이 늦게 나타납니다. 황달·복수·무기력 증상, 혈액검사 ALT·ALP 수치 해석, 간 보호 식이를 정리했습니다.",
    body: `<p>간은 증상이 늦게 나타나는 장기다. 초기 만성 간염은 겉으로 아무 증상이 없다가 건강검진 혈액검사에서 처음 발견되는 경우도 있다. 그래서 어떤 신호가 간 질환을 의심하게 하는지, 어떤 검사로 확인하는지 알아두면 도움이 된다.</p>

<h2>간 질환에서 보이는 신호</h2>
<ul>
<li>식욕 저하, 구토, 설사</li>
<li>물을 많이 마시고 소변을 많이 봄</li>
<li>체중 감소</li>
<li>눈 흰자·잇몸·피부가 노랗게 변하는 황달</li>
<li>배에 물이 차서 불러 옴</li>
<li>멍한 상태, 방향 감각 상실, 발작 같은 신경 증상이 오락가락함</li>
</ul>
<p>이 신호들은 다른 질환에서도 나타나므로, 증상만으로 간 질환이라고 판단할 수 없다.</p>

<div class="callout-dog">
<strong>빨리 진료받아야 하는 경우</strong><br>
• 황달이 보임<br>
• 반복 구토와 식욕 부진이 이어짐<br>
• 배가 급격히 불러 옴<br>
• 비틀거림, 발작, 의식 저하
</div>

<h2>어떤 검사로 확인하나</h2>
<table>
<thead><tr><th>검사</th><th>알 수 있는 것</th></tr></thead>
<tbody>
<tr><td>혈액검사(간 효소)</td><td>간 세포 손상 여부를 보는 첫 단서. 국소적인 병변에서는 효소 수치가 먼저 오른다</td></tr>
<tr><td>담즙산·빌리루빈</td><td>간의 기능 상태를 평가. 손상이 진행되면 담즙산, 이어서 빌리루빈이 오르는 경향이 있다</td></tr>
<tr><td>복부 초음파</td><td>간의 모양, 복수, 결절 여부 확인</td></tr>
<tr><td>응고 검사</td><td>출혈 위험 평가</td></tr>
<tr><td>간 조직검사</td><td>만성 간염 같은 정확한 진단에 필요</td></tr>
</tbody>
</table>
<p>담즙산 검사가 모든 간 질환에서 이상으로 나오는 것은 아니어서, 수의사는 여러 검사 결과를 종합해 판단한다.</p>

<h2>집에서 도움이 되는 관리</h2>
<ul>
<li>수의사가 지정한 식단과 약을 지킨다. 간 질환 식이는 원인과 상태에 따라 달라진다.</li>
<li>사람용 영양제나 진통제, 허브 제품을 임의로 먹이지 않는다. 간에 부담을 줄 수 있다.</li>
<li>정기 혈액검사 일정을 지킨다. 간 수치 이상을 한 번 들은 적이 있다면 추적이 중요하다.</li>
</ul>

<h2>마지막으로</h2>
<p>간 수치 상승은 원인이 다양하고 일시적일 수도 있다. 수치가 높다는 말을 들었다면 바로 영양제를 사기보다 원인 검사를 먼저 하고, 재검사 시기를 수의사와 정하는 것이 순서다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.merckvetmanual.com/dog-owners/digestive-disorders-of-dogs/disorders-of-the-liver-and-gallbladder-in-dogs — Merck Veterinary Manual, Disorders of the Liver and Gallbladder in Dogs",
      "https://vcahospitals.com/know-your-pet/chronic-hepatitis-in-dogs — VCA, Chronic Hepatitis in Dogs",
      "https://vcahospitals.com/know-your-pet/liver-disease---testing — VCA, Testing for Liver Disease",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-07T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-410",
    slug: "multi-cat-household-harmony",
    type: "blog",
    category: 1,
    title: "다묘 가정 평화 유지하기 — 3마리 이상 고양이가 함께 사는 법",
    subtitle: "자원 분산 원칙, 집단 내 긴장 신호 읽기, 갈등 중재 방법, 다묘 가정 스트레스 관리",
    metaTitle: "다묘 가정 갈등 예방·관리 가이드 — 3마리 이상 함께 사는 법 | 펫지기",
    metaDescription: "3마리 이상 고양이가 함께 사는 다묘 가정 관리법. 자원 분산 원칙, 집단 내 긴장 신호, 갈등 중재, 스트레스 관리 방법을 정리했습니다.",
    body: `<p>고양이가 많을수록 아름답게도, 복잡하게도 될 수 있다. 다묘 가정의 평화는 자연스럽게 생기지 않는다 — 환경 설계로 만들어야 한다.</p>

<h2>고양이는 독거 동물이다</h2>
<p>고양이는 야생에서 단독 생활을 한다. 여러 마리가 함께 사는 것은 자연스러운 상태가 아니다. 좋은 다묘 가정은 각 고양이가 '원할 때 혼자 있을 수 있는' 환경을 제공해야 한다.</p>

<h2>자원 분산 원칙</h2>
<div class="callout-cat">
<strong>다묘 가정 자원 공식</strong><br>
• <strong>화장실</strong>: 고양이 수 + 1개 (3마리 → 4개)<br>
• <strong>음식·물 그릇</strong>: 고양이 수 + 1세트, 다른 방이나 공간에 분산<br>
• <strong>잠자는 공간</strong>: 고양이 수 이상, 높이 다양화<br>
• <strong>스크래처</strong>: 각 공간마다 1개 이상<br>
→ 자원 부족이 갈등의 가장 흔한 원인
</div>

<h2>집단 내 긴장 신호 읽기</h2>
<ul>
<li><strong>소극적 공격</strong>: 한 고양이가 다른 고양이가 지나갈 때 막고 있음 (공간 통제)</li>
<li><strong>응시</strong>: 직접 눈을 맞추며 장시간 응시 — 지배적 행동</li>
<li><strong>과도한 그루밍 또는 식욕 변화</strong>: 스트레스 신호</li>
<li><strong>화장실 밖 배변</strong>: 스트레스 또는 영역 표시</li>
</ul>

<h2>갈등 중재 방법</h2>
<ul>
<li>공격하는 고양이와 피하는 고양이의 분리 → 재도입 프로토콜</li>
<li>페로몬 디퓨저(펠리웨이 멀티캣) 설치 — 사회적 긴장 완화</li>
<li>공격하는 개체와 1:1 놀이 증가 → 에너지 소진</li>
<li>수직 공간 늘리기 → 회피 가능한 경로 확보</li>
</ul>

<h2>마지막으로</h2>
<p>다묘 가정에서 완벽한 조화는 없다. 목표는 모든 개체가 스트레스 없이 자원에 접근하고, 원할 때 혼자 있을 수 있는 환경이다. 자원을 충분히 제공하고 공간을 풍부하게 만드는 것이 갈등의 80%를 예방한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bradshaw, J.W.S. — Cat Sense: How the New Feline Science Can Make You a Better Friend to Your Pet",
      "International Cat Care — Multi-Cat Households",
      "한국고양이보호협회 다묘 가정 관리 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-08T09:00:00.000Z",
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
  console.log("블로그 포스트 57차 시딩 완료! (blog-406 ~ blog-410)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
