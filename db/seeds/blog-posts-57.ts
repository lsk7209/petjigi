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
    body: `<p>고양이를 세 마리 이상 키우면 눈에 보이는 싸움이 없어도 보이지 않는 갈등과 스트레스가 쌓일 수 있다. 고양이는 영역과 자원에 민감해서, 자원을 충분히 나누고 피할 공간을 만들어 주는 것이 평화의 핵심이다.</p>

<h2>자원은 넉넉하게, 흩어서</h2>
<table>
<thead><tr><th>자원</th><th>권장</th></tr></thead>
<tbody>
<tr><td>화장실</td><td>고양이 수 + 1개 이상, 집 안 최소 두 곳 이상에 분산 (예: 세 마리면 네 개)</td></tr>
<tr><td>밥·물그릇</td><td>여러 곳에 두어 한 마리가 독점하지 못하게 한다</td></tr>
<tr><td>휴식 장소</td><td>고양이마다 선호하는 자리가 있으니 침상·캣타워·숨을 곳을 넉넉히</td></tr>
<tr><td>수직 공간</td><td>선반, 캣타워, 창가 자리로 서로 마주치지 않고 지낼 수 있게 한다</td></tr>
</tbody>
</table>
<p>ASPCA는 고양이 사이의 갈등이 화장실 문제로 나타나기도 한다고 설명한다. 서로 직접 싸우지 않아도 긴장이 스트레스가 되어 배변 실수나 마킹이 생길 수 있다.</p>

<h2>갈등 신호 알아보기</h2>
<ul>
<li>한 마리가 계속 높은 곳이나 숨은 곳에서 나오지 않음</li>
<li>밥그릇이나 화장실 앞에서 길을 막고 노려봄</li>
<li>쫓아다니기, 하악질, 때리기</li>
<li>평소와 다른 곳에서 소변을 봄, 식욕 저하, 과도한 그루밍</li>
</ul>

<div class="callout-cat">
<strong>이럴 땐 진료·상담</strong><br>
• 화장실 실수가 갑자기 시작됨 — 방광염이나 요로 질환일 수 있어 진료가 먼저<br>
• 상처가 날 정도의 싸움<br>
• 한 마리가 하루 이상 먹지 않음
</div>

<h2>평화를 유지하는 방법</h2>
<ol>
<li><strong>식사 장소 분리</strong>: 눈치 보는 고양이는 별도 장소에서 먹게 한다.</li>
<li><strong>놀이 시간 개별화</strong>: 한 마리씩 시간을 내어 놀아 주면 갈등이 줄어든다.</li>
<li><strong>신선한 환경</strong>: 장난감을 돌려 쓰고 창가 자리를 마련한다.</li>
<li><strong>일시적 분리 공간</strong>: 갈등이 생기면 한 마리가 따로 쉴 수 있는 공간을 만든다.</li>
<li><strong>변화는 천천히</strong>: 가구를 옮기거나 새 고양이를 들이는 등의 변화는 단계적으로 한다.</li>
</ol>

<h2>새 식구를 들일 때</h2>
<p>기존 고양이가 여러 마리라도 분리와 냄새 교환을 거친 단계적 소개가 필요하다. 건강검진을 먼저 하고, 전염병 위험이 있으면 검사 결과를 확인한다.</p>

<h2>마지막으로</h2>
<p>고양이는 공동생활을 위해 만들어진 동물이 아니라, 필요에 따라 공간을 나누며 사는 동물이다. 자원과 수직 공간을 넉넉히 마련하고, 작은 신호를 놓치지 않는 것이 다묘 가정의 평화를 만든다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://vcahospitals.com/know-your-pet/cat-behavior-problems--aggression-in-cats-fear-and-territorial-to-other-household-cats — VCA, Cat Behavior Problems - Aggression in Cats, Fear and Territorial to Other Household Cats",
      "https://www.aspca.org/pet-care/cat-care/common-cat-behavior-issues/litter-box-problems — ASPCA, Litter Box Problems",
      "https://icatcare.org/advice/aggression-between-cats — International Cat Care, Aggression between cats",
    ],
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
