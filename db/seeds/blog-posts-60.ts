import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 60 — cat3×1 + cat5×2 + cat2×1 + cat6×1 = 5편 (IDs 421-425)
// Macros: E, F, A, F, B
// Angles: RA1, RA4, RA6, RA3, RA7

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-421",
    slug: "cat-inflammatory-bowel-disease",
    type: "blog",
    category: 3,
    title: "고양이 염증성 장질환(IBD) — 구토·설사·체중 감소가 반복될 때",
    subtitle: "IBD와 림프종의 차이, 식이 관리, 스테로이드 치료, 조직 검사 필요성",
    metaTitle: "고양이 IBD 염증성 장질환 — 증상·진단·치료 완전 가이드 | 펫지기",
    metaDescription: "고양이 IBD(염증성 장질환)의 증상과 치료. 반복되는 구토·설사·체중 감소, IBD와 림프종 차이, 스테로이드 치료, 식이 관리를 정리했습니다.",
    body: `<p>만성 구토·설사·체중 감소가 반복되는 고양이에서 IBD(Inflammatory Bowel Disease)를 의심해야 한다. 완치보다 조절이 목표인 질환이지만, 적절히 관리하면 좋은 삶의 질을 유지할 수 있다.</p>

<h2>IBD란</h2>
<p>소화관 벽에 만성 염증이 생기는 상태다. 정확한 원인은 불명확하지만 면역계의 비정상적인 반응, 장내 미생물 불균형, 식이 알레르기가 관여한다고 알려져 있다.</p>

<h2>주요 증상</h2>
<ul>
<li>반복되는 구토 (주 2회 이상, 수개월)</li>
<li>간헐적 설사 또는 연변</li>
<li>체중 감소 (근육 소실)</li>
<li>식욕 변동</li>
<li>복부 통증 (만졌을 때 긴장)</li>
</ul>

<h2>IBD vs 림프종 — 구분이 중요하다</h2>
<p>고양이 림프종(소화기)은 IBD와 증상이 매우 유사하다. 혈액검사·초음파로 의심할 수 있지만, 확진을 위해서는 조직 검사(생검)가 필요하다. 치료 방향이 완전히 다르기 때문에 정확한 진단이 중요하다.</p>

<h2>치료</h2>
<ul>
<li><strong>식이 관리</strong>: 항원 제한식(novel protein) 또는 가수분해 단백질 사료로 전환</li>
<li><strong>스테로이드 (프레드니솔론)</strong>: 염증 억제. 대부분의 IBD에 1차 치료.</li>
<li><strong>면역억제제 (클로람부실)</strong>: 스테로이드 단독 효과가 불충분할 때 추가.</li>
<li><strong>비타민B12 보충</strong>: IBD에서 코발라민 결핍이 흔함.</li>
</ul>

<div class="callout-cat">
<strong>IBD 관리 핵심</strong><br>
• 식이 변화를 최소화 (자극 줄이기)<br>
• 스트레스 환경 개선<br>
• 정기 체중 측정 (근육 소실 모니터링)<br>
• 스테로이드 테이퍼링 시 갑자기 끊지 않기
</div>

<h2>마지막으로</h2>
<p>IBD는 고양이에서 매우 흔한 만성 질환이다. 진단 후 적절한 식이와 약물 관리를 시작하면 증상을 크게 개선할 수 있다. 반복되는 소화기 문제가 있다면 조기에 내시경·조직 검사를 포함한 정밀 검진을 권장한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Simpson, K.W. & Jergens, A.E. — Pitfalls and Progress in the Diagnosis and Management of Canine Inflammatory Bowel Disease. Vet Clin North Am 2011",
      "한국고양이수의사회 소화기 질환 임상 가이드라인",
      "ISFM — Feline Inflammatory Bowel Disease Management",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-13T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-422",
    slug: "dog-park-etiquette-complete-guide",
    type: "blog",
    category: 5,
    title: "강아지 공원 에티켓 — 모두가 즐거운 공간을 위한 기준",
    subtitle: "목줄 착용 규정, 개 싸움 중재, 다른 개 동의 없이 접근 금지, 배변 처리",
    metaTitle: "강아지 공원 에티켓 완전 가이드 — 목줄·싸움·배변 | 펫지기",
    metaDescription: "강아지와 공원을 이용할 때 에티켓. 목줄 착용 규정, 개 싸움 대처, 다른 개에게 동의 없이 접근하면 안 되는 이유, 배변 처리를 정리했습니다.",
    body: `<p>강아지 공원은 모든 사람과 동물이 공유하는 공간이다. 에티켓은 지켜야 할 의무가 아니라, 모두가 즐거운 공간을 만드는 방법이다.</p>

<h2>목줄 규정</h2>
<p>대부분의 공공 공원에서 반려동물은 목줄 착용이 의무다. 도심 공원·인도에서 목줄을 하지 않은 개는 동물보호법상 과태료 대상이 될 수 있다. '우리 개는 순해요'는 목줄을 풀어도 된다는 이유가 아니다.</p>

<h2>다른 개에게 허락 없이 다가가지 않기</h2>
<p>가장 흔한 에티켓 실수다. 아무리 사회적인 개라도, 모든 개가 낯선 개를 환영하지는 않는다. 다가가기 전 상대 보호자에게 "인사해도 될까요?"를 먼저 물어야 한다. 상대 개가 긴장해 있거나 보호자가 거절하면 즉시 물러난다.</p>

<h2>개 싸움 발생 시 대처</h2>
<div class="callout-dog">
<strong>개 싸움 중재 시 절대 하면 안 되는 것</strong><br>
• 손으로 입 사이에 끼어들기 — 물릴 위험<br>
• 소리 지르기 — 흥분 강화<br>
<br>
<strong>올바른 대처</strong><br>
• 물통으로 물 뿌리기 (집중력 끊기)<br>
• 뒷다리를 들어 올려 이동시키기 (휠배로 방법)<br>
• 큰 물건(판지·자전거)으로 사이 차단
</div>

<h2>배변 처리</h2>
<ul>
<li>배변 봉투는 항상 여분으로 준비 (1개만 가져오면 부족)</li>
<li>수거 후 지정 쓰레기통에 버리기</li>
<li>잔디 위의 소변도 물로 희석해주면 이웃 배려가 됨</li>
</ul>

<h2>사람을 무서워하는 사람 배려</h2>
<p>어린아이·개를 무서워하는 사람이 지나갈 때는 개를 옆으로 붙여 공간을 확보해준다. '착한 개'라도 상대방의 공포는 실제다.</p>

<h2>마지막으로</h2>
<p>공원 에티켓은 결국 공감이다. 내 강아지가 다른 강아지에게 갑자기 달려들면 어떨지, 내 강아지가 내 옆을 지나가면 어떨지 한 번 더 생각해보는 것이 시작이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Kennel Club — Dog Park Etiquette",
      "동물보호법 제13조 (반려동물 안전 관리 의무)",
      "한국반려동물협회 공공장소 에티켓 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-14T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-423",
    slug: "pet-friendly-cafe-restaurant-guide",
    type: "blog",
    category: 5,
    title: "반려동물 동반 카페·식당 이용 가이드 — 함께 나가는 기쁨",
    subtitle: "반려동물 동반 가능 여부 사전 확인, 현장 에티켓, 음식·음료 주의사항",
    metaTitle: "반려동물 동반 카페·식당 에티켓 완전 가이드 | 펫지기",
    metaDescription: "반려동물 동반 카페·식당 이용 방법. 사전 확인 방법, 현장 에티켓, 강아지·고양이에게 위험한 음식·음료 주의사항을 정리했습니다.",
    body: `<p>반려동물 동반 카페와 식당이 늘고 있다. 함께 나가는 경험은 반려동물과의 유대를 높이는 좋은 방법이다. 에티켓을 알고 가면 모두가 즐거운 시간이 된다.</p>

<h2>방문 전 확인사항</h2>
<ul>
<li>반려동물 허용 여부 전화·SNS로 사전 확인 (표시되어 있어도 시즌·좌석별로 다를 수 있음)</li>
<li>크기·종 제한 여부 (소형견만 가능한 곳 많음)</li>
<li>케이지 필요 여부</li>
<li>예방접종 증명서 요구 여부 (일부 펫카페)</li>
</ul>

<h2>방문 전 준비</h2>
<ul>
<li>충분한 산책으로 에너지 소진 → 실내에서 차분하게</li>
<li>휴대용 물그릇·간식·배변 봉투</li>
<li>목줄·하네스 착용</li>
<li>짧은 리드줄로 보호자 가까이 유지</li>
</ul>

<h2>현장 에티켓</h2>
<div class="callout-dog">
<strong>반려동물 동반 외출 에티켓</strong><br>
• 테이블 위에 올려두지 않기<br>
• 다른 테이블 방문·손님 식사에 방해되지 않게<br>
• 배변 시 즉시 처리 및 직원에게 알림<br>
• 과도한 짖음 시 잠시 밖으로<br>
• 다른 반려동물과의 접촉은 상대 동의 후
</div>

<h2>반려동물에게 위험한 카페 음식</h2>
<ul>
<li><strong>카페 음료</strong>: 커피·녹차·에너지 음료 — 카페인 독성</li>
<li><strong>초콜릿 케이크·코코아</strong>: 테오브로민 독성</li>
<li><strong>자일리톨 함유 식품</strong> (무설탕 껌·젤리): 극히 위험</li>
<li><strong>포도·건포도</strong>: 신장 독성</li>
<li><strong>양파·마늘</strong>: 적혈구 파괴</li>
</ul>

<h2>마지막으로</h2>
<p>반려동물 동반 외출은 준비가 전부다. 충분한 운동으로 에너지를 소진하고, 안전한 리드줄로 통제하며, 주변에 대한 배려를 갖추면 어디서든 환영받는 보호자와 반려동물이 될 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA Animal Poison Control — Toxic Foods for Pets",
      "한국반려동물협회 반려동물 동반 외출 에티켓 가이드",
      "농림축산식품부 반려동물 동반 가능 시설 정책",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-14T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-424",
    slug: "homemade-cat-food-guide",
    type: "blog",
    category: 2,
    title: "고양이 집밥(홈쿡) — 강아지와 다른 고양이 식이의 까다로운 기준",
    subtitle: "고양이 필수 영양소(타우린·아라키돈산·비타민A), 절대 금지 재료, 검증 레시피 활용",
    metaTitle: "고양이 집밥(홈쿡) 가이드 — 타우린·필수 영양소·금지 재료 | 펫지기",
    metaDescription: "고양이 집밥은 강아지보다 더 까다롭습니다. 타우린, 아라키돈산, 비타민A 등 고양이 필수 영양소, 절대 금지 재료, 안전한 레시피 활용법을 정리했습니다.",
    body: `<p>고양이 집밥은 강아지보다 훨씬 까다롭다. 고양이는 자체 합성하지 못하는 필수 영양소가 많아 식이 오류가 심각한 결핍으로 이어질 수 있다.</p>

<h2>고양이 필수 영양소 — 체내 합성 불가</h2>
<ul>
<li><strong>타우린</strong>: 심장·눈 건강에 필수. 식물성으로 공급 불가. 결핍 시 확장성 심근병증·망막 퇴화.</li>
<li><strong>아라키돈산(AA)</strong>: 오메가6 지방산. 고양이는 체내 합성 불가 — 동물성 지방에서만 공급.</li>
<li><strong>비타민A (레티놀)</strong>: 고양이는 베타카로틴을 레티놀로 전환 불가. 간·생선에서 공급 필요.</li>
<li><strong>니아신(B3)</strong>: 고양이는 트립토판에서 전환 불가 — 동물성으로 공급.</li>
</ul>

<h2>고양이에게 절대 금지 재료</h2>
<div class="callout-cat">
<strong>고양이 금지 식품</strong><br>
• 양파·마늘·파·부추 (적혈구 파괴 — 개보다 민감)<br>
• 포도·건포도<br>
• 날 달걀 흰자 (아비딘 → 비오틴 결핍)<br>
• 생선 다량 급여 (비타민B1 결핍, 중금속 축적)<br>
• 우유·유제품 (유당 불내증)<br>
• 개 사료 장기 급여 (타우린·필수 영양소 부족)
</div>

<h2>안전한 집밥을 위한 조건</h2>
<ul>
<li><strong>전문 레시피 사용 필수</strong>: BalanceIT.com 등 수의영양사 검증 레시피</li>
<li>타우린 보충제 별도 추가 (조리 과정에서 파괴됨)</li>
<li>닭·오리·칠면조 등 다양한 동물성 단백질 위주</li>
<li>탄수화물 최소화 (고양이는 탄수화물 소화 효소 적음)</li>
<li>정기 혈액검사로 영양 상태 모니터링</li>
</ul>

<h2>집밥 100%는 고위험</h2>
<p>전문 레시피 없이 집밥만 먹이면 타우린·비타민A 등 필수 영양소 결핍이 생길 수 있다. 증상이 수년 후에 나타나기 때문에 보호자가 인지하기 어렵다. 집밥을 주고 싶다면 전체 식이의 30~50% 이하로 제한하고 나머지는 AAFCO 완전영양식으로 보완하는 것이 안전하다.</p>

<h2>마지막으로</h2>
<p>고양이 집밥은 좋은 의도에서 시작하더라도 충분한 정보 없이는 위험하다. 수의사 또는 수의영양사와 상담 후 검증된 레시피를 기반으로 시작하는 것을 강력히 권장한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Pion, P.D. et al. — Myocardial failure in cats associated with low plasma taurine. Science 1987",
      "BalanceIT.com — Veterinary Nutritionist Formulated Cat Recipes",
      "한국수의영양학회 고양이 필수 영양소 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 집밥 전환 시 수의사 또는 수의영양사와 상담하세요.",
    status: "published",
    publishedAt: "2026-08-15T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-425",
    slug: "petloss-legacy-donation-memorial",
    type: "blog",
    category: 6,
    title: "반려동물을 기억하는 기부 — 그 사랑을 다른 생명으로 이어가기",
    subtitle: "반려동물 이름으로 하는 기부, 추모 펀드, 보호소에 물품 기증하는 방법",
    metaTitle: "반려동물 추모 기부 — 기증·기부로 사랑 이어가기 가이드 | 펫지기",
    metaDescription: "반려동물을 잃은 후 그 이름으로 할 수 있는 기부와 기증. 동물 보호 단체 기부, 물품 기증, 추모 펀드 방법을 정리했습니다.",
    body: `<p>반려동물을 보내고 난 후, 그 사랑이 다른 형태로 계속되길 바라는 보호자들이 있다. 기부와 기증은 그 존재가 떠난 후에도 세상에 좋은 흔적을 남기는 방법이다.</p>

<h2>반려동물 이름으로 기부하기</h2>
<p>많은 동물보호단체는 추모 기부(Memorial Donation)를 받는다. 특정 고양이나 강아지의 이름으로 기부하면, 단체에서 추모 감사 편지나 인증서를 발행해주는 경우도 있다.</p>

<h3>기부 가능한 기관</h3>
<ul>
<li>동물권행동 카라</li>
<li>동물자유연대</li>
<li>한국동물보호연합</li>
<li>지역 동물보호센터 또는 입양했던 구조단체</li>
</ul>

<h2>물품 기증</h2>
<p>반려동물이 떠나면 쓰지 못하는 용품들이 남는다. 이것들을 보호소나 구조단체에 기증하면 다른 동물들에게 쓰인다.</p>

<div class="callout-cat">
<strong>기증 가능한 물품 예시</strong><br>
• 미개봉 사료·간식<br>
• 이동장·케이지<br>
• 담요·침대 (세탁 후)<br>
• 장난감 (위생적으로 양호한 것)<br>
• 미개봉 의약품 (보호소 약사 지침에 따름)<br>
<br>
→ 기증 전 해당 단체에 필요 물품 확인 필수
</div>

<h2>추모 펀드 만들기</h2>
<p>일부 단체에서는 특정 동물 이름의 추모 기금을 만들어 지속적인 후원금이 모이게 하는 프로그램을 운영한다. SNS에서 '#OO를_기억하며' 같은 해시태그로 주변에 알리고 함께 기부하는 방식도 늘고 있다.</p>

<h2>이 행동이 주는 의미</h2>
<p>기부는 슬픔을 행동으로 전환하는 방법이다. 심리적으로 상실감을 의미 있는 행위로 바꾸는 것이 애도 과정에서 도움이 된다는 연구도 있다. 그 동물의 이름으로 새로운 생명이 도움을 받는다 — 이보다 아름다운 추모가 있을까.</p>

<h2>마지막으로</h2>
<p>그 사랑은 끝나지 않는다. 다른 형태로 계속될 수 있다. 기부하거나 물품을 나누거나, SNS에서 사랑했던 이야기를 나누는 것 — 모두 그 존재를 세상에 남기는 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Association for Pet Loss and Bereavement — Donating in Memory",
      "Worden, J.W. — Grief Counseling and Grief Therapy",
      "한국동물보호연합 추모 기부 프로그램 안내",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-15T11:00:00.000Z",
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
  console.log("블로그 포스트 60차 시딩 완료! (blog-421 ~ blog-425)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
