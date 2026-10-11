import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 64 — cat3×2 + cat4×1 + cat6×1 + cat2×1 = 5편 (IDs 441-445)
// Macros: F, E, B, A, F
// Angles: RA1, RA4, RA7, RA2, RA5

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-441",
    slug: "cat-corneal-eye-injury-guide",
    type: "blog",
    category: 3,
    title: "고양이 눈 상처·각막 궤양 — 찡그린 눈을 지나치면 안 되는 이유",
    subtitle: "각막 궤양 원인·증상, 헤르페스 재발 패턴, 각막염 응급 신호, 치료 방법",
    metaTitle: "고양이 각막 궤양·눈 상처 — 증상·응급 신호·치료 가이드 | 펫지기",
    metaDescription: "고양이가 눈을 찡그리거나 반쯤 감고 있으면 각막 궤양일 수 있습니다. 원인, 헤르페스 재발, 응급 신호, 치료 방법을 정리했습니다.",
    body: `<p>고양이가 한쪽 눈을 찡그리거나 반쯤 감고 있다면 피곤해서가 아닐 수 있다. 각막(눈 앞쪽 투명한 층)에 상처가 나는 각막 궤양은 아프고, 깊어지면 눈 손상으로 이어질 수 있어 빠른 진료가 필요하다.</p>

<h2>이런 모습이 보이면 의심한다</h2>
<div class="callout-cat">
<strong>각막 궤양 의심 신호</strong><br>
• 한쪽 눈을 찡그리거나 자꾸 감고 깜빡임<br>
• 앞발로 눈을 비비거나 바닥에 얼굴을 문지름<br>
• 눈물·분비물이 늘고 눈 안쪽 구석에 고임<br>
• 각막이 뿌옇게 보이거나 결막이 붉게 부음<br>
• 밝은 빛을 피함
</div>

<h2>원인</h2>
<table>
<thead><tr><th>원인</th><th>설명</th></tr></thead>
<tbody>
<tr><td>외상</td><td>다른 고양이와의 싸움, 발톱·이물에 긁힘</td></tr>
<tr><td>고양이 헤르페스바이러스</td><td>고양이에서 의심할 만한 원인 중 하나로, 반복되는 눈 문제의 배경이 될 수 있다</td></tr>
<tr><td>속눈썹·눈꺼풀 이상</td><td>각막을 계속 긁는 구조적 문제</td></tr>
<tr><td>눈물 부족 등</td><td>각막 표면이 건조해 상처가 생기기 쉬움</td></tr>
</tbody>
</table>

<h2>병원에서는 어떻게 하나</h2>
<p>형광 염색으로 각막 상처의 위치와 깊이를 확인하고 원인을 살핀다. 얕은 궤양은 항생제 안약이나 연고, 통증 조절, 눈을 비비지 못하게 하는 엘리자베스 칼라로 치료하는 경우가 많다. 헤르페스가 의심되면 항바이러스 치료를 검토한다. VCA 안내에 따르면 깊은 궤양이나 각막 조직이 상당히 소실된 경우에는 안과 전문의 평가와 수술이 필요할 수 있다.</p>

<div class="callout-cat">
<strong>집에서 피해야 할 것</strong><br>
• 사람용 안약이나 이전에 쓰고 남은 안약을 임의로 넣기 — 상처가 있는 눈에 쓰면 악화될 수 있다<br>
• 눈을 직접 닦거나 이물을 억지로 빼기<br>
• 엘리자베스 칼라 없이 방치하기
</div>

<h2>응급에 가까운 경우</h2>
<ul>
<li>동공 크기가 갑자기 서로 달라짐</li>
<li>눈이 한쪽으로 튀어나오거나 표면이 움푹 들어간 듯 보임</li>
<li>눈에 피가 차거나 분비물이 급격히 늘어남</li>
</ul>
<p>이런 경우는 당일 진료를 받는 것이 좋다.</p>

<h2>마지막으로</h2>
<p>각막 궤양은 통증이 크고 변화가 빠를 수 있어서, 눈을 찡그리는 모습이 하루 이상 이어지면 기다리지 말고 진료를 받자. 같은 눈이 반복해서 문제라면 원인 검사를 함께 요청하는 것이 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vcahospitals.com/know-your-pet/corneal-ulcers-in-cats — VCA, Corneal Ulcers in Cats",
      "https://vcahospitals.com/know-your-pet/ulcerative-keratitis-in-cats — VCA, Corneal Ulcers (Ulcerative Keratitis) in Cats",
      "https://www.merckvetmanual.com/emergency-medicine-and-critical-care/ophthalmic-emergencies-in-small-animals/deep-stromal-corneal-ulcers-descemetocele-and-iris-prolapse-in-small-animals — Merck Veterinary Manual, Deep Stromal Corneal Ulcers",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-23T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-442",
    slug: "dog-broken-nail-emergency",
    type: "blog",
    category: 3,
    title: "강아지 발톱이 부러졌을 때 — 집에서 할 수 있는 응급처치",
    subtitle: "발톱 파절 유형, 지혈 방법, 병원 가야 할 시점, 감염 예방 관리",
    metaTitle: "강아지 발톱 부러짐 응급처치 — 지혈·감염 예방 가이드 | 펫지기",
    metaDescription: "강아지 발톱이 부러졌을 때 집에서 할 수 있는 응급처치. 지혈 방법, 퀵 노출 여부 확인, 병원 가야 할 시점, 감염 예방 관리를 정리했습니다.",
    body: `<p>강아지가 갑자기 발을 들고 핥거나 바닥에 피가 묻어 있다면 발톱이 부러졌을 가능성이 있다. 당황하면 강아지도 더 불안해하므로, 먼저 출혈을 멈추고 병원에 갈지 판단하는 순서를 알아두자.</p>

<h2>상태별 판단</h2>
<table>
<thead><tr><th>상태</th><th>대처</th></tr></thead>
<tbody>
<tr><td>끝만 살짝 갈라짐, 출혈 없음</td><td>날카로운 부분만 정리하고 며칠간 붓기·절뚝임을 확인</td></tr>
<tr><td>피가 나고 아파함 (혈관과 신경이 있는 부분이 노출)</td><td>아래 지혈 방법을 시도한 뒤 진료 권장</td></tr>
<tr><td>부러진 조각이 덜렁거림, 뿌리째 빠짐</td><td>억지로 떼지 말고 진료. VCA는 제거를 대개 병원에서 하라고 안내한다</td></tr>
</tbody>
</table>

<h2>집에서 할 수 있는 응급 지혈</h2>
<ol>
<li>강아지를 안정시키고, 물릴 수 있으니 입 근처를 조심한다.</li>
<li>깨끗한 거즈나 수건으로 발가락을 감싸 눌러 압박한다. 보통 5~10분 안에 멎는다.</li>
<li>계속 나오면 지혈 가루(스타이프틱)나 질산은 막대를 쓴다. 없으면 옥수수 전분이나 밀가루로 대신하기도 한다.</li>
<li>피가 멎으면 핥지 못하게 넥칼라나 가벼운 붕대로 보호한다. 붕대는 너무 조이지 않게 한다.</li>
</ol>

<div class="callout-dog">
<strong>바로 병원에 가야 하는 경우</strong><br>
• 10~15분 압박해도 출혈이 멈추지 않음<br>
• 부러진 조각이 붙어 있어 제거가 필요함<br>
• 발가락·발등이 붓고 열감이 있거나 고름이 나옴<br>
• 발을 전혀 딛지 못하거나 며칠이 지나도 절뚝임
</div>

<h2>회복 중 관리</h2>
<ul>
<li>발톱 아래는 뼈와 가까워 감염이 생기면 깊어질 수 있다. 붓기, 붉어짐, 고름, 냄새를 매일 확인한다.</li>
<li>핥거나 물어뜯지 못하게 한다.</li>
<li>필요하면 수의사가 항생제나 진통제를 처방한다. 사람용 진통제를 임의로 주지 않는다.</li>
</ul>

<h2>예방</h2>
<p>발톱이 너무 길면 바닥에 걸려 부러지기 쉽다. 정기적으로 다듬고, 산책 후 발을 살피는 습관이 가장 좋은 예방이다.</p>

<h2>마지막으로</h2>
<p>발톱 파절은 흔하지만 통증이 크고 감염 위험이 있다. 지혈이 잘 되면 대부분 안정되지만, 조각이 남았거나 출혈이 계속되면 지체하지 말고 진료를 받자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vcahospitals.com/know-your-pet/first-aid-for-broken-nails-in-dogs — VCA, First Aid for Broken Nails",
      "https://vcahospitals.com/know-your-pet/first-aid-for-bleeding-in-dogs — VCA, First Aid for Bleeding in Dogs",
      "https://www.merckvetmanual.com/special-pet-topics/emergencies/minor-injuries-and-accidents — Merck Veterinary Manual, Minor Injuries and Accidents",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-24T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-443",
    slug: "pet-insurance-hereditary-coverage",
    type: "blog",
    category: 4,
    title: "펫보험 유전·선천성 질환 보장 — 약관 속 함정 읽는 법",
    subtitle: "유전 질환 면책 조항 해석, 슬개골·고관절이형성증 대기기간, 가입 전 검사 활용",
    metaTitle: "펫보험 유전·선천성 질환 보장 — 약관 함정 해석 가이드 | 펫지기",
    metaDescription: "펫보험 유전·선천성 질환 보장 여부와 약관 함정. 슬개골·고관절이형성증 대기기간, 유전 질환 면책 해석, 가입 전 검사 활용법을 정리했습니다.",
    body: `<p>펫보험 가입 시 '유전 질환·선천성 질환'이 어떻게 처리되는지는 보험사마다 다르며, 약관을 세심하게 읽지 않으면 큰 실망을 할 수 있다.</p>

<h2>유전 질환 면책의 두 가지 방식</h2>
<ul>
<li><strong>전면 면책</strong>: 유전적으로 발생하는 모든 질환 미보장</li>
<li><strong>진단 후 면책</strong>: 가입 후 처음 진단된 것은 보장, 가입 전 이미 있던 것만 면책</li>
</ul>
<p>같은 '유전 질환 면책' 표현이라도 실제 적용 방식이 다를 수 있다. 약관 원문을 확인해야 한다.</p>

<h2>슬개골 탈구 — 대기기간이 가장 긴 항목</h2>
<p>소형견에서 가장 흔한 유전 소인 질환이다. 대부분의 보험사에서 90~180일 대기기간이 있다. 일부는 '1도 이상 진단력 있으면 영구 면책'으로 처리한다. 가입 시점의 슬개골 상태가 중요하다.</p>

<div class="callout-cat">
<strong>약관에서 확인할 핵심 표현</strong><br>
• "유전적 소인에 의한 질환" 범위<br>
• 슬개골·고관절 대기기간 (일 수)<br>
• "가입 전 진단" vs "진단 여부 불문"<br>
• 건강검진 후 가입 시 면책 범위 변경 여부
</div>

<h2>가입 전 검사를 활용하기</h2>
<p>일부 보험사는 가입 전 건강검진 기록을 제출하면 보장 범위가 명확해진다. 검진에서 이상이 없다면 이후 발병도 기존 질환 면책이 어렵다. 가입 후 즉시 첫 검진을 받으면 '기록'이 생겨 이후 분쟁을 줄일 수 있다.</p>

<h2>마지막으로</h2>
<p>유전 질환이 우려된다면 품종 특화 유전 질환이 잘 보장되는 상품을 선택하거나, 보험사에 특정 질환의 보장 여부를 직접 문의하는 것이 가장 확실하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "펫보험 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 펫보험 표준약관 해설",
      "한국소비자원 펫보험 분쟁 사례집 2025",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 실제 계약 내용은 해당 보험사 약관을 기준으로 합니다.",
    status: "published",
    publishedAt: "2026-08-24T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-444",
    slug: "prolonged-grief-petloss-guide",
    type: "blog",
    category: 6,
    title: "펫로스 슬픔이 오래 지속될 때 — 복잡 애도와 일반 슬픔의 차이",
    subtitle: "복잡 애도 증상, 언제 전문가가 필요한가, 슬픔 처리를 돕는 방법",
    metaTitle: "펫로스 복잡 애도 — 언제 전문 상담이 필요한가 | 펫지기",
    metaDescription: "펫로스 슬픔이 오래 지속될 때. 복잡 애도와 일반 슬픔의 차이, 전문 상담이 필요한 증상, 슬픔 처리를 돕는 방법을 정리했습니다.",
    body: `<p>반려동물을 잃은 후 슬픔은 자연스러운 반응이다. 그러나 슬픔이 수개월 이상 일상 기능을 방해한다면, 혼자 감당하기 어려운 수준일 수 있다.</p>

<h2>일반 슬픔 vs 복잡 애도</h2>
<table>
<thead><tr><th>구분</th><th>일반 슬픔</th><th>복잡 애도 (PGD)</th></tr></thead>
<tbody>
<tr><td>기간</td><td>수주~수개월 점진적 완화</td><td>6개월 이상 지속·악화</td></tr>
<tr><td>일상 기능</td><td>회복 가능</td><td>지속적 저하</td></tr>
<tr><td>미래 전망</td><td>서서히 생긴다</td><td>미래에 대한 의미 상실</td></tr>
<tr><td>사회 관계</td><td>회복됨</td><td>지속적 회피</td></tr>
</tbody>
</table>

<h2>전문가 상담이 필요한 신호</h2>
<ul>
<li>6개월 이상 지속적인 수면·식욕 문제</li>
<li>일·학교·대인 관계 기능이 심하게 저하됨</li>
<li>반려동물 죽음이 자신의 잘못이라는 과도한 죄책감</li>
<li>삶의 의미를 잃었다는 생각</li>
<li>자해·자살에 대한 생각</li>
</ul>

<div class="callout-cat">
<strong>도움 받을 수 있는 곳</strong><br>
• 정신건강 위기 상담: 1577-0199<br>
• 한국펫로스증후군연구회<br>
• 지역 정신건강복지센터 (무료 상담)
</div>

<h2>슬픔 처리를 돕는 방법</h2>
<ul>
<li>슬픔을 억누르지 않고 표현하기 (일기·이야기)</li>
<li>추모 의식 만들기 (기일에 꽃 가져오기 등)</li>
<li>같은 경험을 한 사람들과 연결되기</li>
<li>충분한 수면·식사·가벼운 신체 활동</li>
</ul>

<h2>마지막으로</h2>
<p>슬픔이 깊다는 것은 사랑이 깊다는 것이다. 도움을 받는 것은 약한 것이 아니다. 너무 힘들다면 오늘 한 번의 전화가 달라지는 시작이 될 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Shear, M.K. et al. — Complicated Grief and Related Bereavement Issues. JAMA 2012",
      "Association for Pet Loss and Bereavement — When Grief Doesn't Ease",
    ]),
    disclaimer: "심리적 어려움이 지속된다면 전문 심리 상담사에게 즉시 도움을 요청하세요.",
    status: "published",
    publishedAt: "2026-08-25T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-445",
    slug: "senior-cat-hydration-strategies",
    type: "blog",
    category: 2,
    title: "노령 고양이 수분 충족 전략 — 신장 지키는 가장 기본적인 방법",
    subtitle: "노령묘 수분 부족이 신장에 미치는 영향, 마시게 만드는 방법 6가지, 피하수액 가정 관리",
    metaTitle: "노령 고양이 수분 섭취 늘리기 — 신장 보호 전략 6가지 | 펫지기",
    metaDescription: "노령 고양이 신장 보호를 위한 수분 섭취 전략. 물 안 마시는 노령묘 대책, 마시게 만드는 방법 6가지, 피하수액 가정 관리를 정리했습니다.",
    body: `<p>노령 고양이의 신장 건강에서 수분 관리는 가장 효과적이면서 가장 저비용의 개입이다. 조금 더 마시게 만드는 것만으로도 신장 부담이 크게 줄어든다.</p>

<h2>노령묘와 수분 부족의 악순환</h2>
<p>노령 고양이는 갈증을 덜 느끼고, 신장 기능이 저하되면서 소변 농축 능력이 줄어들어 더 많은 물이 필요해진다. 그러나 마시는 양은 줄어든다. 이 악순환이 신장 기능을 더 빠르게 악화시킨다.</p>

<h2>수분 섭취 늘리기 방법 6가지</h2>
<ol>
<li><strong>습식 사료 비중 높이기</strong>: 가장 효과적. 건식에서 습식으로 전환 시 총 수분 섭취 2~3배 증가.</li>
<li><strong>워터 파운틴</strong>: 흐르는 물 선호하는 고양이에 효과적. 세라믹 소재 권장.</li>
<li><strong>물그릇 여러 곳에 배치</strong>: 각 방에 1개씩. 화장실과 분리.</li>
<li><strong>건식 사료에 물 첨가</strong>: 건식에 따뜻한 물을 조금 부어 기호성+수분 동시 향상.</li>
<li><strong>치킨 브로스 소량 추가</strong>: 무염·무양파. 냄새로 유인 효과.</li>
<li><strong>물 그릇 소재 변경</strong>: 플라스틱 → 세라믹·유리·스테인리스로 교체.</li>
</ol>

<div class="callout-cat">
<strong>CKD 고양이 피하수액 가정 관리</strong><br>
중증 CKD에서 수의사가 가정 피하수액을 처방하는 경우가 있다.<br>
처음엔 무서워 보이지만 익숙해지면 집에서 관리 가능.<br>
용량·주기는 수의사 지시에 따름.
</div>

<h2>마지막으로</h2>
<p>노령 고양이의 물 섭취량을 조금이라도 늘리는 것이 다른 어떤 보충제보다 신장에 효과적이다. 오늘부터 워터 파운틴 하나, 습식 사료 비중 늘리기부터 시작해보자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "IRIS — CKD Management Guidelines for Cats",
      "한국고양이수의사회 노령묘 수분 관리 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-25T11:00:00.000Z",
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
  console.log("블로그 포스트 64차 시딩 완료! (blog-441 ~ blog-445)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
