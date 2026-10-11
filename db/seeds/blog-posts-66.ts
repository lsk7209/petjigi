import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 66 — cat2×2 + cat4×1 + cat3×1 + cat6×1 = 5편 (IDs 451-455)
// Macros: A, F, B, E, F
// Angles: RA2, RA5, RA7, RA3, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-451",
    slug: "dog-safe-fruit-guide",
    type: "blog",
    category: 2,
    title: "강아지에게 줄 수 있는 과일 완전 가이드 — 안전과 독성 기준",
    subtitle: "사과·블루베리·수박 vs 포도·아보카도·체리 비교, 급여량 기준, 씨 위험성",
    metaTitle: "강아지 과일 급여 가이드 — 안전한 과일 vs 독성 과일 | 펫지기",
    metaDescription: "강아지에게 줄 수 있는 과일과 피해야 할 과일. 사과·블루베리·수박 급여 방법, 포도·아보카도·체리 독성 이유, 씨 위험성을 정리했습니다.",
    body: `<p>과일은 간식으로 줄 수 있지만 모든 과일이 안전한 것은 아니다. 가장 중요한 것은 포도류를 절대 주지 않는 것과, 씨·속·두꺼운 껍질을 제거하는 것이다.</p>

<h2>절대 주면 안 되는 과일</h2>
<div class="callout-dog">
<strong>포도, 건포도, 커런트</strong><br>
• 신장 손상(급성 신부전)과 연관된 것으로 알려져 있고, 소량으로도 문제가 될 수 있다고 AKC와 VCA가 경고한다<br>
• 독성 성분은 확실히 밝혀지지 않았고 개체에 따라 반응이 달라 안전한 양이 정해져 있지 않다<br>
• 먹었다면 증상이 없어도 즉시 동물병원에 연락한다 (ASPCA 동물독극물센터는 해외 번호이므로 국내에서는 가까운 동물병원이나 24시 응급병원을 이용)
</div>

<h2>줄 수 있는 과일과 주의점</h2>
<table>
<thead><tr><th>과일</th><th>준비 방법</th><th>주의</th></tr></thead>
<tbody>
<tr><td>사과</td><td>씨와 속을 제거해 작게 자른다</td><td>씨에는 시안화물이 있어 먹이지 않는다</td></tr>
<tr><td>블루베리</td><td>그대로 소량</td><td>목에 걸리지 않는 작은 개는 으깨서 준다</td></tr>
<tr><td>바나나</td><td>껍질을 벗겨 소량</td><td>당분이 많아 자주 주지 않는다</td></tr>
<tr><td>딸기, 수박, 멜론</td><td>씨와 껍질을 제거</td><td>수박 씨는 장 폐색 위험이 있어 뺀다</td></tr>
<tr><td>복숭아, 체리 등 씨 있는 과일</td><td>씨(핵)를 완전히 제거</td><td>핵은 질식·장 폐색 위험이 있고 일부 핵에는 시안화물이 있다</td></tr>
</tbody>
</table>
<p>VCA는 두꺼운 껍질, 줄기, 씨, 핵, 속은 치아 손상이나 질식, 위장관 폐색을 일으킬 수 있으니 제거하라고 안내한다.</p>

<h2>급여 요령</h2>
<ul>
<li>간식은 하루 섭취량의 일부로만 주고 주식은 균형 잡힌 사료로 유지한다.</li>
<li>새로운 과일은 한 번에 한 종류, 아주 소량부터 시작한다.</li>
<li>당뇨, 비만, 췌장염 병력이 있는 개는 과일 급여 전에 수의사와 상의한다.</li>
<li>통조림 과일이나 시럽 절임, 가공 주스는 당분과 첨가물 때문에 주지 않는다.</li>
</ul>

<h2>마지막으로</h2>
<p>과일은 포도류만 확실히 피하고 나머지는 씨와 껍질을 정리해 소량만 주면 된다. 먹은 뒤 구토나 설사가 있으면 다음에는 그 과일을 빼고 필요하면 진료받는다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.akc.org/expert-advice/nutrition/fruits-vegetables-dogs-can-and-cant-eat/ — AKC, Fruits and Vegetables Dogs Can or Can't Eat",
      "https://vcahospitals.com/know-your-pet/grape-raisin-and-currant-poisoning-in-dogs — VCA, Grape, Raisin, and Currant Poisoning in Dogs",
      "https://www.aspca.org/pet-care/aspca-poison-control/people-foods-avoid-feeding-your-pets — ASPCA, People Foods to Avoid Feeding Your Pets",
      "https://vcahospitals.com/resources/preventive-dog/nutrition/can-you-feed-pets-certain-fruits-and-veggies — VCA, Can you feed pets certain fruits and veggies",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-28T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-452",
    slug: "cat-tuna-addiction-risks",
    type: "blog",
    category: 2,
    title: "고양이 참치 중독 — 매일 참치를 먹이면 안 되는 이유",
    subtitle: "참치 중독 증상(황색 지방증), 비타민E 결핍, 수은 축적 위험, 안전한 급여 기준",
    metaTitle: "고양이 참치 중독·황색 지방증 — 위험과 안전 급여 가이드 | 펫지기",
    metaDescription: "고양이 참치를 매일 먹이면 황색 지방증이 생길 수 있습니다. 참치 중독 증상, 비타민E 결핍, 수은 축적 위험, 안전한 급여 기준을 정리했습니다.",
    body: `<p>참치 캔 냄새에 달려오는 고양이를 보면 좋아하는 것 같아 자주 주고 싶어진다. 하지만 참치는 주식이나 습관적 간식으로 주기에는 위험이 있다. 수의학 자료가 지적하는 이유를 정리했다.</p>

<h2>참치를 많이 먹이면 생길 수 있는 문제</h2>
<table>
<thead><tr><th>문제</th><th>설명</th></tr></thead>
<tbody>
<tr><td>영양 불균형</td><td>VCA는 참치가 고양이에게 필요한 영양소가 부족하고 불포화지방이 많다고 설명하며, 어떤 연령의 고양이에게도 참치를 급여하지 말라고 안내한다</td></tr>
<tr><td>비타민 E 결핍과 황색지방증(pansteatitis)</td><td>메르크 수의학 매뉴얼에 따르면 참치 캔을 많이 먹은 고양이에서 비타민 E 결핍과 지방 조직의 염증이 보고되었다. 배를 만지면 아파하고 무기력해지며 털이 거칠어질 수 있다</td></tr>
<tr><td>수은</td><td>참치 같은 시판 어류 제품이 사람과 고양이의 장기 수은 중독 원인이 된 사례가 있다. 중독되면 뒷다리가 뻣뻣해지거나 균형을 잃고 떨 수 있으며 신경 증상은 되돌리기 어려울 수 있다</td></tr>
</tbody>
</table>

<h2>왜 고양이가 참치에 집착하나</h2>
<p>생선 냄새와 맛은 고양이에게 강한 기호성을 준다. 한 번 맛을 들이면 다른 사료를 거부하는 편식으로 이어질 수 있다. 이것이 중독처럼 보이는 이유다. 영양학적으로 필요해서가 아니라 기호성이 높아서 찾는 것이다.</p>

<div class="callout-cat">
<strong>이런 변화가 보이면 진료</strong><br>
• 참치만 찾고 사료를 거부하는 날이 며칠 이어짐<br>
• 만졌을 때 배를 아파함, 무기력, 털이 푸석해짐<br>
• 걸음이 불안정하거나 떨림<br>
• 24시간 이상 아무것도 먹지 않음 — 특히 비만 고양이는 식사를 거르면 위험할 수 있다
</div>

<h2>어떻게 줄이나</h2>
<ul>
<li>참치를 줄 때는 가끔 아주 소량만, 양념·소금이 없는 것으로 한정한다. 습관이 되지 않게 한다.</li>
<li>완전·균형 영양을 갖춘 고양이용 습식 사료 중 생선 맛 제품으로 기호성을 채운다.</li>
<li>기존 사료에 새 사료를 조금씩 섞어 1~2주에 걸쳐 바꾼다.</li>
<li>식사량을 정해 두고, 간식은 하루 섭취량의 소량으로 제한한다.</li>
</ul>

<h2>마지막으로</h2>
<p>일상적으로 주지 않는다는 원칙이 중요하다. 이미 참치만 먹는 습관이 생겼다면 서두르지 말고 단계적으로 바꾸고, 먹지 않는 기간이 길어지면 병원에 상담하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vcahospitals.com/resources/preventive-cat/nutrition/true-or-false-milk-and-tuna-are-great-foods-for-cats — VCA, True or False: Milk and tuna are great foods for cats",
      "https://www.merckvetmanual.com/management-and-nutrition/nutrition-small-animals/nutritional-requirements-of-small-animals — Merck Veterinary Manual, Nutritional Requirements of Small Animals",
      "https://www.merckvetmanual.com/special-pet-topics/poisoning/mercury-poisoning — Merck Veterinary Manual, Mercury Poisoning",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-29T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-453",
    slug: "pet-emergency-vet-preparation",
    type: "blog",
    category: 3,
    title: "응급 동물병원 준비 — 위기 순간에 당황하지 않는 방법",
    subtitle: "24시간 응급 동물병원 미리 파악, 응급 정보 카드 만들기, 이동 중 응급처치",
    metaTitle: "응급 동물병원 사전 준비 — 위기 대응 완전 가이드 | 펫지기",
    metaDescription: "응급 상황을 대비한 동물병원 준비 방법. 24시간 응급 병원 사전 파악, 응급 정보 카드 작성, 이동 중 할 수 있는 응급처치를 정리했습니다.",
    body: `<p>응급은 예고 없이 온다. 밤 11시에 강아지가 갑자기 경련을 일으키거나, 고양이가 소변을 못 보는 상황이 생겼을 때 — 미리 준비된 사람은 다르게 행동한다.</p>

<h2>지금 당장 해야 할 준비</h2>
<h3>24시간 응급 동물병원 파악</h3>
<ul>
<li>가까운 야간·응급 진료 가능 동물병원과 대체 병원을 미리 파악</li>
<li>전화번호를 스마트폰 즐겨찾기에 저장</li>
<li>운전 경로 미리 확인 (밤에도 찾을 수 있게)</li>
<li>주치 동물병원의 야간 응급 연계 병원 확인</li>
</ul>
<p>병원 명칭만 보고 24시간 진료를 단정하지 말고, 진료 시간·대상 동물·야간 접수 방법을 공식 채널이나 전화로 확인한다.</p>

<h3>응급 정보 카드 만들기</h3>
<div class="callout-dog">
<strong>응급 정보 카드 내용</strong><br>
• 반려동물 이름·종·나이·체중<br>
• 현재 복용 중인 약 (이름·용량)<br>
• 기저 질환·알레르기<br>
• 혈액형 (확인된 경우)<br>
• 주치 수의사 연락처<br>
• 응급 진료 가능 병원과 대체 병원 연락처<br>
• 보호자 긴급 연락처
</div>

<h2>응급 이동 중 할 것</h2>
<ul>
<li>안전하게 이동장·담요에 감싸 움직임 최소화</li>
<li>이동 중 동물병원에 전화 → 상황 설명 → 도착 전 준비 요청</li>
<li>운전 중 강아지를 혼자 조수석에 두지 않기 (사고 위험)</li>
<li>호흡·의식 상태 2인 이동 시 동승자가 모니터링</li>
</ul>

<h2>응급 상황별 즉시 연락 기준</h2>
<ul>
<li>짧은 시간에 구토·설사가 반복되거나 피가 보임 → 신속히 동물병원에 연락</li>
<li>소변을 보려고 반복해서 시도하지만 나오지 않음 → 응급 진료 문의</li>
<li>발작이 시작됨 → 주변을 안전하게 치우고 시간을 잰 뒤, 안전해지는 즉시 수의사에게 연락</li>
<li>의식 저하·쓰러짐·호흡 곤란 → 가까운 응급 동물병원으로 이동</li>
<li>독성 물질 섭취 의심 → 제품 용기와 섭취 정보를 확보하고 즉시 수의사에게 연락. 지시 없이 구토를 유도하거나 약을 주지 않음</li>
</ul>

<h2>마지막으로</h2>
<p>응급 준비는 평소에 해둘 수 있다. 야간 접수 방법과 이동 경로는 바뀔 수 있으므로 정기적으로 다시 확인한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 정보 편집팀",
    ymyl: true,
    sources: JSON.stringify([
      "American Animal Hospital Association — Help! Is This a Pet Emergency? (2024-09-05) https://www.aaha.org/resources/help-is-this-a-pet-emergency/",
      "American Veterinary Medical Association — Pet First Aid (2025) https://ebusiness.avma.org/files/ProductDownloads/mcm-client-brochures-pet-first-aid-2025.pdf",
    ]),
    disclaimer: "이 글은 일반적인 준비 정보이며 수의학적 진단·처치를 대체하지 않습니다. 응급 징후가 있거나 판단이 어렵다면 즉시 가까운 동물병원에 연락하고 수의사의 지시를 따르세요.",
    status: "published",
    publishedAt: "2026-08-29T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-454",
    slug: "dog-degenerative-myelopathy-guide",
    type: "blog",
    category: 3,
    title: "강아지 척수 변성증(DM) — 뒷다리 약해지는 노령견의 신경 질환",
    subtitle: "DM과 디스크 차이, 단계별 진행, 재활 치료로 삶의 질 유지, 반려차 활용",
    metaTitle: "강아지 척수 변성증(DM) — 증상·진행·재활 관리 가이드 | 펫지기",
    metaDescription: "강아지 척수 변성증(DM) 뒷다리 약해지는 진행성 신경 질환. DM과 디스크 차이, 단계별 진행, 재활 치료, 반려차(카트) 활용을 정리했습니다.",
    body: `<p>노령견의 뒷다리가 서서히 약해지고 발을 끌며 걷고, 시간이 지날수록 심해진다면 퇴행성 척수병증(Degenerative Myelopathy, DM)을 포함해 여러 신경 질환을 생각해 볼 수 있다. DM은 척수가 서서히 퇴화하는 진행성 질환으로, 완치법은 없다.</p>

<h2>DM의 특징</h2>
<ul>
<li>뒷다리에서 시작해 균형 잡기와 협응이 점점 어려워진다.</li>
<li>초기에는 뒷발등을 끌거나 누웠다 일어나기 힘들어하는 모습이 관절염과 비슷해 놓치기 쉽다.</li>
<li>진행하면 뒷다리로 서지 못하고, 이후 앞다리에도 영향을 줄 수 있다.</li>
<li>SOD1 유전자 변이가 가장 잘 알려진 위험 요인이다. 이 변이는 열성으로 유전되며, 변이가 있다고 모두 발병하는 것은 아니다.</li>
</ul>

<h2>비슷한 병과 구분하기</h2>
<table>
<thead><tr><th>구분</th><th>DM</th><th>디스크 등 척수 압박 질환</th></tr></thead>
<tbody>
<tr><td>시작</td><td>대체로 서서히 진행</td><td>갑자기 악화되기도 한다</td></tr>
<tr><td>통증</td><td>뚜렷하지 않은 경우가 많다</td><td>통증을 보이는 경우가 많다</td></tr>
<tr><td>치료</td><td>원인 치료법 없음. 재활·보조 중심</td><td>진단에 따라 약물이나 수술이 도움이 될 수 있다</td></tr>
</tbody>
</table>
<p>DM에는 단일 확정 검사가 없다. 임상 증상과 신경학적 검사, MRI 등으로 척수 압박 병변이나 염증성 질환 같은 다른 원인을 배제하고 진단하며, 유전자 검사는 보조 자료로 쓰인다. 그래서 수의사가 감별 진단을 거치는 과정이 꼭 필요하다.</p>

<div class="callout-dog">
<strong>이런 변화는 빨리 진료</strong><br>
• 갑자기 뒷다리를 못 쓰거나 심하게 아파함<br>
• 소변·대변을 가리지 못하게 됨<br>
• 호흡이 가빠지거나 삼키기 어려워 보임<br>
→ DM 외의 원인일 수 있고, 일부는 빠른 치료가 중요하다.
</div>

<h2>진행을 늦추기 위한 관리</h2>
<ul>
<li><strong>재활</strong>: 물리치료와 규칙적인 운동이 진행을 늦추는 데 도움이 될 수 있다고 보고된 연구가 있다. 소규모 연구가 많아 개체별 효과는 다를 수 있다.</li>
<li><strong>생활 환경</strong>: 미끄럼 방지 매트, 계단 대신 경사로, 체중 관리로 부담을 줄인다.</li>
<li><strong>보조기구</strong>: 뒷다리 지지대나 휠체어(카트)는 이동성을 유지하는 데 도움이 될 수 있어 재활 담당 수의사와 상담해 선택한다.</li>
<li><strong>2차 문제 관리</strong>: 욕창, 요로 감염, 근육 소실은 진행 단계에서 생길 수 있어 정기 점검이 필요하다.</li>
</ul>

<h2>마지막으로</h2>
<p>DM은 보호자에게 긴 돌봄을 요구하는 병이다. 정확한 진단을 먼저 받고, 재활과 환경 정비로 편안한 시간을 늘리는 데 초점을 맞추자. 삶의 질에 관한 결정은 수의사와 충분히 상의하는 것이 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vcahospitals.com/know-your-pet/degenerative-myelopathy-in-dogs — VCA, Degenerative Myelopathy in Dogs",
      "https://www.merckvetmanual.com/nervous-system/congenital-and-inherited-anomalies-of-the-nervous-system-in-small-animals/congenital-and-inherited-spinal-cord-disorders-in-dogs-and-cats — Merck Veterinary Manual, Congenital and Inherited Spinal Cord Disorders in Dogs and Cats",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10374290/ — Intensive neurorehabilitation and allogeneic stem cells transplantation in canine degenerative myelopathy",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-30T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-455",
    slug: "remaining-pet-grief-behavior",
    type: "blog",
    category: 6,
    title: "남겨진 반려동물도 슬퍼한다 — 동반 동물의 애도 행동 이해하기",
    subtitle: "함께 살던 동물이 죽었을 때 남겨진 개·고양이 행동 변화, 도와주는 방법",
    metaTitle: "남겨진 반려동물의 슬픔 — 동반 동물 애도 행동 가이드 | 펫지기",
    metaDescription: "함께 살던 반려동물이 죽었을 때 남겨진 개·고양이의 행동 변화. 식욕 감소·수색 행동·무기력 의미와 도와주는 방법을 정리했습니다.",
    body: `<p>함께 살던 개가 떠난 뒤 남겨진 고양이가 이틀째 밥을 먹지 않고 함께 자던 자리를 맴돈다. 이것이 슬픔일까? 동물이 사람과 같은 방식으로 슬퍼하는지는 과학적으로 단정하기 어렵지만, 동반 동물이 사라진 뒤 행동이 달라지는 경우는 흔히 관찰된다.</p>

<h2>남겨진 동물에게서 보이는 변화</h2>
<table>
<thead><tr><th>변화</th><th>예시</th></tr></thead>
<tbody>
<tr><td>식욕·음수량</td><td>밥을 남기거나 물을 덜 마신다</td></tr>
<tr><td>활동</td><td>무기력하거나 평소보다 많이 잔다</td></tr>
<tr><td>수색 행동</td><td>떠난 아이의 자리·물건을 계속 확인한다</td></tr>
<tr><td>애착 변화</td><td>보호자에게 더 달라붙거나 반대로 숨는다</td></tr>
<tr><td>발성</td><td>평소와 다른 울음·신음</td></tr>
</tbody>
</table>
<p>이런 변화는 상실 때문일 수도 있지만 질병이나 보호자의 슬픔, 집안 분위기 변화에서 올 수도 있다. 원인을 단정하지 말고 몸 상태를 먼저 살펴야 한다.</p>

<h2>얼마나 지속되나</h2>
<p>정해진 기간은 없다. 개체의 성격, 함께한 기간, 유대 정도에 따라 달라지며, 일반적으로는 시간이 지나면서 서서히 안정되는 경우가 많다. 변화가 오래 이어지거나 점점 심해진다면 진료를 받는다.</p>

<div class="callout-cat">
<strong>바로 병원에 가야 하는 경우</strong><br>
• 고양이가 하루 이상 거의 먹지 않는다 — 고양이는 식욕이 떨어지면 간에 문제가 생길 수 있어 방치하지 않는다<br>
• 구토·설사, 배뇨 이상, 숨쉬기 곤란이 동반된다<br>
• 개가 이틀 이상 먹지 않거나 심하게 처진다<br>
• 떠난 아이가 전염성 질환으로 사망한 경우 남은 아이의 검진이 필요한지 수의사에게 확인한다
</div>

<h2>도와주는 방법</h2>
<ul>
<li><strong>루틴 유지</strong>: 식사, 산책, 놀이 시간을 평소와 같게 한다.</li>
<li><strong>1:1 시간</strong>: 짧더라도 둘만의 놀이와 쓰다듬는 시간을 늘린다.</li>
<li><strong>무리한 위로 금지</strong>: 억지로 안거나 달래지 않고, 편안한 거리를 존중한다.</li>
<li><strong>환경 점검</strong>: 떠난 아이의 물건을 갑자기 모두 치우지 말고 서서히 정리한다. 냄새가 안정감을 주기도 한다.</li>
<li><strong>보호자의 감정</strong>: 보호자의 우울감과 불안도 동물에게 영향을 줄 수 있다. 보호자 자신의 휴식과 도움도 중요하다.</li>
</ul>

<h2>새 동반 동물은 신중하게</h2>
<p>남은 아이가 외로워 보여 곧바로 새 식구를 들이고 싶을 수 있지만, 새로운 동물은 오히려 스트레스가 될 수 있다. 남은 아이의 상태가 안정된 뒤에, 성격이 맞는 동물을 천천히 소개하는 것이 좋다.</p>

<h2>마지막으로</h2>
<p>남겨진 동물도 변화를 겪고 있다. 보호자도 슬픔 속에 있는 힘든 때이지만, 아이의 달라진 행동을 알아차리고 규칙적인 일상을 지켜 주는 것이 가장 큰 도움이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://avma.org/resources-tools/avma-policies/avma-animal-loss-support-services — AVMA, Animal loss support services",
      "https://www.samhsa.gov/resource/dbhis/pet-loss-grief — SAMHSA, Pet Loss and Grief",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-30T11:00:00.000Z",
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
  console.log("블로그 포스트 66차 시딩 완료! (blog-451 ~ blog-455)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
