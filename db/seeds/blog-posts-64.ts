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
    body: `<p>고양이가 한쪽 눈을 찡그리거나 반쯤 감고 있다면, 단순한 피로가 아닐 수 있다. 각막 상처·궤양은 빠르게 악화될 수 있는 눈 질환이다.</p>

<h2>각막 궤양의 주요 원인</h2>
<ul>
<li>고양이 헤르페스바이러스(FHV-1) 재활성화 — 가장 흔함</li>
<li>다른 고양이와의 싸움(발톱 상처)</li>
<li>눈꺼풀 안으로 말린 속눈썹</li>
<li>이물질(먼지·모래)</li>
<li>건성 각결막염(KCS, 눈물 부족)</li>
</ul>

<h2>증상</h2>
<div class="callout-cat">
<strong>각막 궤양 의심 신호</strong><br>
• 눈을 찡그리거나 반쯤 감음<br>
• 빛을 피하는 행동<br>
• 눈에서 분비물(투명~황록색)<br>
• 눈 주변 긁기<br>
• 각막이 뿌옇게 보임 (부종)<br>
→ 24시간 이상 지속되면 병원 필수
</div>

<h2>헤르페스 관련 각막 병변</h2>
<p>FHV-1은 신경계에 잠복하다가 스트레스·면역 저하 시 재활성화된다. 반복적으로 같은 눈에 문제가 생긴다면 헤르페스를 의심해야 한다. 라이신 보충, 항바이러스 안약(트리플루리딘)이 도움이 될 수 있다.</p>

<h2>치료</h2>
<ul>
<li>항생제 안약 (세균 2차 감염 예방)</li>
<li>항바이러스 안약 (헤르페스 원인 시)</li>
<li>아트로핀 (통증 완화, 일부)</li>
<li>넥칼라 착용 (긁지 않게)</li>
<li>심한 경우 수술적 처치</li>
</ul>

<h2>마지막으로</h2>
<p>눈 문제는 48시간 이내 치료를 시작하는 것이 예후에 결정적이다. 눈을 찡그리는 고양이를 그냥 두지 않는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Gelatt, K.N. — Veterinary Ophthalmology (5th ed.)",
      "한국수의안과학회 각막 질환 임상 가이드라인",
    ]),
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
    body: `<p>강아지가 갑자기 발을 들고 핥거나, 바닥에 피가 보인다면 발톱 파절일 가능성이 있다. 놀라지 않고 차분히 대처하면 대부분 집에서 응급 관리가 가능하다.</p>

<h2>발톱 파절 유형</h2>
<ul>
<li><strong>끝 부분만 부러짐</strong>: 퀵(혈관)에 닿지 않음 → 집에서 관리 가능</li>
<li><strong>퀵 노출</strong>: 출혈·통증 → 응급처치 후 병원 권장</li>
<li><strong>발톱 뿌리부터 완전 탈락</strong>: 즉시 병원</li>
</ul>

<h2>집에서 할 수 있는 응급처치</h2>
<ol>
<li>강아지를 차분하게 한 후 발을 확인</li>
<li>출혈이 있으면 깨끗한 거즈로 3~5분 압박</li>
<li>지혈분말(퀵스탑) 또는 옥수수 전분으로 지혈</li>
<li>부러진 발톱이 매달려 있다면 더 손상되지 않게 안정화</li>
<li>발에 임시 붕대를 가볍게 감아 더러워지지 않게</li>
</ol>

<div class="callout-dog">
<strong>즉시 병원이 필요한 경우</strong><br>
• 발톱이 뿌리부터 완전히 빠진 경우<br>
• 10분 이상 지혈이 안 되는 경우<br>
• 발을 아예 사용하지 못할 정도의 통증<br>
• 발톱 주변 피부가 손상된 경우
</div>

<h2>감염 예방</h2>
<ul>
<li>야외 산책 전 발톱 부위 보호</li>
<li>2~3일간 발 상태 확인 (붓기·화농 여부)</li>
<li>핥지 않도록 넥칼라 또는 발 양말 착용</li>
</ul>

<h2>마지막으로</h2>
<p>발톱 파절은 매우 흔한 부상이다. 지혈만 되면 대부분 자연 회복된다. 그러나 퀵이 노출된 경우엔 감염 예방을 위한 항생제 처방이 필요할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Veterinary Partner — Broken Toenails in Dogs",
      "대한수의사회 응급처치 가이드라인",
    ]),
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
