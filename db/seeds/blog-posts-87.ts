import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 87 — cat2×2 + cat3×1 + cat5×1 + cat6×1 = 5편 (IDs 556-560)
// Macros: A, D, B, F, E
// Angles: RA4, RA5, RA2, RA3, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-556",
    slug: "cat-food-transition-guide",
    type: "blog",
    category: 2,
    title: "고양이 사료 전환 — 갑자기 바꾸면 안 되는 이유와 단계별 방법",
    subtitle: "사료 전환 이유별 접근법, 7~14일 전환 프로토콜, 거부하는 고양이 대처",
    metaTitle: "고양이 사료 전환 — 갑작스러운 교체 위험과 단계별 방법 | 펫지기",
    metaDescription: "고양이 사료를 갑자기 바꾸면 안 되는 이유와 올바른 전환 방법. 7~14일 단계별 프로토콜, 사료를 거부하는 고양이 대처법, 건식→습식 전환을 정리했습니다.",
    body: `<p>고양이는 먹는 것에 매우 보수적이다. 갑작스러운 사료 전환은 소화 장애를 일으키고, 심하면 지방간으로 이어질 수 있다.</p>

<h2>갑작스러운 전환이 위험한 이유</h2>
<p>고양이의 장내 미생물 균형은 기존 사료에 맞춰져 있다. 갑작스러운 교체는 급성 설사·구토를 유발한다. 또한 고양이는 며칠 굶으면 지방간(간지질증)이 생길 수 있어, "안 먹으면 결국 먹겠지" 전략은 위험하다.</p>

<h2>7~14일 전환 프로토콜</h2>
<table>
<thead><tr><th>기간</th><th>비율</th></tr></thead>
<tbody>
<tr><td>1~3일</td><td>기존 90% + 신규 10%</td></tr>
<tr><td>4~6일</td><td>기존 75% + 신규 25%</td></tr>
<tr><td>7~9일</td><td>기존 50% + 신규 50%</td></tr>
<tr><td>10~12일</td><td>기존 25% + 신규 75%</td></tr>
<tr><td>13~14일</td><td>신규 100%</td></tr>
</tbody>
</table>

<h2>사료를 완강히 거부하는 고양이</h2>
<div class="callout-cat">
<strong>거부 시 전략</strong><br>
• 전환 속도 더 늦추기 (3~4주로 연장)<br>
• 신규 사료를 살짝 데워서 향 강화<br>
• 기존 사료 위에 신규 사료를 소량 뿌리기<br>
• 신규 사료를 손가락으로 직접 주며 익숙하게 하기<br>
• 48시간 이상 아무것도 안 먹으면 즉시 수의사 상담
</div>

<h2>건식→습식 전환 특별 팁</h2>
<ul>
<li>건식에 익숙한 고양이는 질감 변화를 거부할 수 있음</li>
<li>습식 사료에 건식 사료를 소량 섞어 점진적으로</li>
<li>여러 브랜드·질감(파테·청크·무스) 시도</li>
</ul>

<h2>마지막으로</h2>
<p>사료 전환은 서두르지 않는 것이 핵심이다. 특히 처방식으로 전환하는 경우, 거부 때문에 굶기게 되면 오히려 더 위험하다. 수의사와 함께 전략을 세우는 것이 안전하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "WSAVA — Dietary Transition Guidelines for Cats 2023",
      "한국수의영양학회 사료 전환 임상 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-20T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-557",
    slug: "dog-protein-rotation-diet",
    type: "blog",
    category: 2,
    title: "강아지 단백질 순환 식이 — 효과가 있는가, 없는가",
    subtitle: "순환 식이 지지론과 반대론 근거, 알레르기 예방 효과, 올바른 전환 방법",
    metaTitle: "강아지 단백질 순환 식이 — 효과 근거와 올바른 방법 | 펫지기",
    metaDescription: "강아지 단백질 순환 식이(로테이션 다이어트)의 효과를 분석했습니다. 알레르기 예방 근거, 지지론과 반대론 비교, 올바른 순환 방법을 정리했습니다.",
    body: `<p>"한 가지 단백질만 계속 먹이면 알레르기가 생긴다"는 말을 들어본 보호자가 많다. 단백질 순환 식이(Rotation Diet)가 실제로 유효한지 살펴보자.</p>

<h2>순환 식이 지지론</h2>
<ul>
<li>다양한 단백질 노출 → 면역계의 "과반응" 방지</li>
<li>영양적 다양성 확보</li>
<li>특정 단백질에 대한 식이 의존도 낮추기</li>
<li>일부 동물 영양학자의 권고</li>
</ul>

<h2>순환 식이 반대론</h2>
<p>식이 알레르기는 반복 노출로 발생한다는 것이 주류 이론이다. 즉, "다양한 단백질을 미리 노출하면 나중에 알레르기가 생긴다"는 반론도 있다. 임상 연구에서 순환 식이가 알레르기 예방에 효과적이라는 강력한 근거는 아직 없다.</p>

<h2>적절한 상황</h2>
<div class="callout-dog">
<strong>순환 식이가 적합한 경우</strong><br>
• 건강한 강아지에서 영양적 다양성 추구<br>
• 특정 단백질 제한 질환이 없는 경우<br>
• 소화가 안정적인 성견<br><br>
<strong>순환 식이를 피해야 하는 경우</strong><br>
• 식이 알레르기 진단 강아지 (단일 단백질 유지 필요)<br>
• 소화 기능이 약한 강아지<br>
• 만성 소화기 질환 보유견
</div>

<h2>올바른 전환 방법</h2>
<ul>
<li>순환 주기: 최소 1~3개월 단위 (매주 바꾸는 것은 부적절)</li>
<li>전환은 항상 7~10일 점진적으로</li>
<li>동일 브랜드 내 단백질 교체가 적응에 유리</li>
</ul>

<h2>마지막으로</h2>
<p>단백질 순환이 "나쁜 것"은 아니지만, 알레르기 예방의 특효약도 아니다. 건강한 강아지에게 다양한 식이를 제공하고 싶다면 시도해볼 수 있지만, 알레르기가 이미 있는 강아지에게는 금물이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Verlinden, A. et al. — Food hypersensitivity reactions in dogs and cats: a review. Crit Rev Food Sci Nutr 2006",
      "한국수의영양학회 식이 알레르기 예방 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-20T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-558",
    slug: "cat-inflammatory-bowel-disease",
    type: "blog",
    category: 3,
    title: "고양이 염증성 장질환(IBD) — 만성 구토·설사의 숨은 원인",
    subtitle: "IBD vs 림프종 구분 중요성, 진단 방법, 식이·스테로이드 치료, 장기 관리",
    metaTitle: "고양이 IBD(염증성 장질환) — 진단·치료·림프종 구분 가이드 | 펫지기",
    metaDescription: "고양이 만성 구토·설사의 원인 IBD(염증성 장질환)를 정리했습니다. 림프종과 구분이 중요한 이유, 진단 방법, 식이 관리, 스테로이드 치료를 알아보세요.",
    body: `<p>고양이가 만성적으로 구토하거나 설사를 반복한다. 단순 사료 문제가 아닐 수 있다. 염증성 장질환(IBD)은 만성 소화기 증상의 흔한 원인이다.</p>

<h2>IBD란</h2>
<p>장 점막에 만성 염증세포가 침윤하는 질환이다. 주로 림프구형(lymphocytic-plasmacytic IBD)으로, 식이 항원이나 장내 미생물에 대한 비정상 면역 반응이 원인으로 추정된다.</p>

<h2>IBD vs 저등급 림프종 — 구분이 매우 중요</h2>
<p>두 질환은 증상이 거의 동일하다. 그러나 치료가 완전히 다르다. IBD는 식이+스테로이드, 저등급 림프종은 화학요법(클로람부실). 반드시 생검으로 구분해야 한다.</p>

<h2>진단</h2>
<div class="callout-cat">
<strong>IBD 진단 과정</strong><br>
1. 혈액 검사: 코발라민(B12)·엽산 결핍 확인<br>
2. 초음파: 장 벽 두꺼워짐 확인<br>
3. 내시경 생검 또는 개복 생검: IBD vs 림프종 구분<br>
▶ 세포학만으로는 구분 불가 — 조직학 필수
</div>

<h2>치료</h2>
<ul>
<li><strong>식이 관리</strong>: 가수분해 또는 신단백질 처방식 (식이 반응성 IBD 경우)</li>
<li><strong>프레드니솔론</strong>: 면역 억제, 염증 조절</li>
<li><strong>코발라민 보충</strong>: IBD에서 흡수 장애로 결핍 흔함, 주사 보충</li>
<li><strong>프로바이오틱스</strong>: 장내 균형 보조</li>
</ul>

<h2>장기 관리</h2>
<ul>
<li>증상 안정 후 스테로이드 점진적 감량</li>
<li>식이 변경 금지 (안정화 후)</li>
<li>3~6개월 추적 혈액·초음파</li>
</ul>

<h2>마지막으로</h2>
<p>IBD는 완치보다 관리가 목표다. 그러나 식이+약물로 충분히 증상을 조절하고 삶의 질을 유지할 수 있다. 림프종과 구분을 위한 생검 투자가 치료 방향을 바꾼다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Jergens, A.E. — Feline Idiopathic Inflammatory Bowel Disease. J Feline Med Surg 2012",
      "한국고양이수의사회 소화기 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-21T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-559",
    slug: "senior-dog-mobility-aids",
    type: "blog",
    category: 5,
    title: "노령견 이동 보조 도구 — 다리가 불편한 강아지를 돕는 방법",
    subtitle: "반려 휠체어, 슬링·하네스, 경사로, 미끄럼 방지 용품, 비용과 선택 기준",
    metaTitle: "노령견 이동 보조 도구 — 반려차·슬링·경사로 선택 가이드 | 펫지기",
    metaDescription: "다리가 불편한 노령견을 위한 이동 보조 도구를 정리했습니다. 반려 휠체어, 슬링·하네스, 경사로, 미끄럼 방지 용품 선택 기준과 비용을 알아보세요.",
    body: `<p>뒷다리가 약해진 노령견, 척수 손상 후 재활 중인 강아지, 관절염으로 움직임이 줄어든 개에게 이동 보조 도구가 삶의 질을 크게 높일 수 있다.</p>

<h2>반려 휠체어(카트)</h2>
<p>뒷다리를 전혀 못 쓰는 경우 가장 효과적이다. 앞다리로 이동하며 일상생활이 가능해진다. 맞춤 제작이 이상적이지만 국내에서 구매 가능한 기성품도 있다.</p>
<ul>
<li>비용: 국산 기성품 15~30만 원, 맞춤 제작 30~80만 원</li>
<li>적응 기간: 보통 1~2주 (점진적으로 사용 시간 늘리기)</li>
</ul>

<h2>슬링·후지 하네스</h2>
<div class="callout-dog">
<strong>슬링·하네스 활용 상황</strong><br>
• 뒷다리 약화 초기 또는 수술 회복기<br>
• 계단 보조 이동<br>
• 산책 중 피로 시 보조<br>
• 비용: 2~8만 원 (간단한 천 슬링 ~ 전용 하네스)
</div>

<h2>가정 내 환경 개선</h2>
<ul>
<li><strong>경사로</strong>: 소파·침대 접근용. 소형견 2~4만 원, 대형견용 5~15만 원.</li>
<li><strong>미끄럼 방지 매트</strong>: 전 가정 바닥에 깔기. 관절 부담 크게 감소.</li>
<li><strong>강아지 양말</strong>: 미끄럼 방지 + 발바닥 보호.</li>
<li><strong>낮은 밥그릇대</strong>: 경추 관절염 강아지에게 올바른 높이 유지.</li>
</ul>

<h2>비용 합리적으로 관리하는 방법</h2>
<ul>
<li>DIY 슬링: 두꺼운 천·수건으로 임시 제작 가능</li>
<li>중고 반려 휠체어: 온라인 커뮤니티에서 교환·구입</li>
<li>수중 트레드밀 재활: 전문 병원보다 재활 전문 센터가 비용 낮음</li>
</ul>

<h2>마지막으로</h2>
<p>이동성이 유지되면 노령견의 정신 건강과 수명 모두에 긍정적인 영향을 준다. 작은 경사로 하나, 미끄럼 방지 매트 하나가 강아지의 일상을 바꿀 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국수의재활학회 노령견 이동 보조 가이드라인",
      "Millis, D.L. & Levine, D. — Canine Rehabilitation and Physical Therapy. Elsevier 2014",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-21T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-560",
    slug: "petloss-support-community-guide",
    type: "blog",
    category: 6,
    title: "펫로스 지지 모임 — 혼자 슬퍼하지 않아도 된다",
    subtitle: "펫로스 지지 모임 종류, 온라인 커뮤니티 활용법, 전문 상담 연결 방법",
    metaTitle: "펫로스 지지 모임 — 온라인 커뮤니티·전문 상담 활용 가이드 | 펫지기",
    metaDescription: "반려동물을 떠나보낸 후 혼자 슬퍼하지 않아도 됩니다. 펫로스 지지 모임 종류, 온라인 커뮤니티 활용법, 전문 심리 상담 연결 방법을 정리했습니다.",
    body: `<p>"강아지 한 마리 죽었다고 이렇게까지 힘들어하냐"는 말을 들어본 보호자가 많다. 이해받지 못하는 슬픔은 더 깊어진다. 같은 경험을 한 사람들과의 연결이 회복에 도움이 된다.</p>

<h2>펫로스 슬픔이 오해받는 이유</h2>
<p>사람을 잃은 슬픔은 사회적으로 인정받지만, 반려동물 슬픔은 "동물인데"라는 말로 축소되기 쉽다. 그러나 연구는 반려동물 상실이 인간 가족 상실에 준하는 정도의 심리적 충격을 줄 수 있다고 말한다.</p>

<h2>온라인 지지 커뮤니티</h2>
<div class="callout-cat">
<strong>국내 펫로스 커뮤니티 유형</strong><br>
• 네이버 카페: "펫로스 증후군", "반려동물 이별 모임" 검색<br>
• 오픈 카카오톡 채팅: "펫로스 나눔" 등 주제별 모임<br>
• 인스타그램 해시태그: #펫로스 #무지개다리 — 비슷한 경험자 발견<br>
• 반려동물 장례식장 부설 추모 공간 프로그램
</div>

<h2>오프라인 지지 모임</h2>
<ul>
<li>일부 동물병원·장례식장에서 정기 추모 모임 운영</li>
<li>한국심리학회 인증 상담사 중 동물 관련 상실 전문 분야 검색</li>
<li>지역 복지관 내 "반려동물 이별" 주제 모임 (점점 늘고 있음)</li>
</ul>

<h2>전문 심리 상담</h2>
<ul>
<li>6주 이상 일상생활 기능 저하가 지속되면 전문 상담 권장</li>
<li>한국심리치료학회 상담사 연결: 학회 홈페이지 상담사 찾기</li>
<li>온라인 심리 상담 플랫폼 (마음이음·트로스트 등)에서 비대면 가능</li>
</ul>

<h2>마지막으로</h2>
<p>슬픔을 혼자 견디는 것이 강한 것이 아니다. 연결되는 것이 회복의 시작이다. 한 사람이라도 "나도 그랬어"라고 말해주는 순간, 그 슬픔이 조금 가벼워진다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국펫로스증후군연구회 지지 모임 효과 연구",
      "Sharkin, B.S. & Knox, D. — Pet loss: Issues and implications for the psychologist. Professional Psychology 2003",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-22T09:00:00.000Z",
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
  console.log("블로그 포스트 87차 시딩 완료! (blog-556 ~ blog-560)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
