import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 90 — cat3×2 + cat1×1 + cat5×1 + cat6×1 = 5편 (IDs 571-575)
// Macros: D, A, B, F, E
// Angles: RA2, RA7, RA8, RA1, RA3

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-571",
    slug: "dog-liver-disease-management",
    type: "blog",
    category: 3,
    title: "강아지 간 질환 — ALT 수치 높게 나왔을 때 알아야 할 것",
    subtitle: "간 수치 의미 해석, 원인별 분류, 저지방·저단백 식이, 간 보호 약물",
    metaTitle: "강아지 간 질환 — ALT 수치·원인·식이·치료 완전 가이드 | 펫지기",
    metaDescription: "강아지 ALT 수치가 높게 나왔을 때 의미와 대처 방법. 간 수치 해석, 원인별 분류, 간 질환 식이 관리, 간 보호 약물(SAMe·밀크씨슬)을 정리했습니다.",
    body: `<p>혈액 검사에서 "ALT가 높아요"라는 말을 들었다. 간 수치 이상은 간 질환의 신호일 수 있지만, 수치 단독으로 심각성을 판단하기는 어렵다.</p>

<h2>간 수치의 의미</h2>
<ul>
<li><strong>ALT(알라닌 아미노전이효소)</strong>: 간세포 손상 시 혈중 상승. 가장 특이적 간 수치.</li>
<li><strong>AST</strong>: 간·근육 손상 시 상승. 덜 특이적.</li>
<li><strong>ALP</strong>: 담도 이상·스테로이드 사용 시 상승.</li>
<li><strong>빌리루빈</strong>: 황달 여부 확인.</li>
</ul>

<h2>주요 원인</h2>
<div class="callout-dog">
<strong>간 수치 상승 원인 분류</strong><br>
• 약물 반응 (NSAIDs·항경련제·스테로이드)<br>
• 지방간 (비만·당뇨·쿠싱 동반)<br>
• 만성 간염 (면역 매개성)<br>
• 구리 축적병 (베들링턴 테리어·달마시안 등)<br>
• 간 종양<br>
• 일시적 상승 (감염·무리한 운동)
</div>

<h2>식이 관리</h2>
<ul>
<li>저지방 식이 (지방간 동반 시)</li>
<li>소화하기 쉬운 단백질 (식물성 또는 유제품 단백질 일부 활용)</li>
<li>간 처방식 사료 (힐스 l/d 등)</li>
<li>비타민 E·항산화 성분 강화</li>
</ul>

<h2>간 보호 약물</h2>
<ul>
<li><strong>SAMe(S-아데노실메티오닌)</strong>: 간세포 보호, 항산화 효과</li>
<li><strong>밀크씨슬(실리마린)</strong>: 간세포 재생 보조</li>
<li><strong>우르소데옥시콜산(UDCA)</strong>: 담즙산 조절</li>
</ul>

<h2>마지막으로</h2>
<p>ALT가 한 번 높게 나왔다고 공황할 필요는 없다. 원인 파악이 우선이고, 원인에 따라 치료 접근이 완전히 달라진다. 반드시 추적 검사를 통해 진행 여부를 확인하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Webster, C.R.L. — Evaluation and diagnosis of canine hepatic disease. Vet Clin North Am 2009",
      "한국수의내과학회 간 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-27T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-572",
    slug: "cat-dental-care-home-guide",
    type: "blog",
    category: 3,
    title: "고양이 치아 관리 — 칫솔질을 싫어하는 고양이 설득하는 방법",
    subtitle: "고양이 치주 질환의 심각성, 칫솔질 훈련 단계, 대안 제품 비교",
    metaTitle: "고양이 치아 관리 — 칫솔질 훈련과 대안 방법 완전 가이드 | 펫지기",
    metaDescription: "고양이 치주 질환의 심각성과 집에서 치아를 관리하는 방법. 칫솔질 거부 고양이 훈련 단계, 치과용 간식·젤·물 첨가제 효과 비교를 정리했습니다.",
    body: `<p>3살 이상 고양이의 70~80%에서 치주 질환이 발견된다는 연구가 있다. 그러나 대부분의 보호자는 고양이가 싫어한다는 이유로 치아 관리를 포기한다.</p>

<h2>치주 질환이 심각한 이유</h2>
<p>치주 질환의 세균은 혈류를 통해 심장·신장·간으로 이동할 수 있다. 만성 치주 질환이 전신 염증·장기 손상에 기여한다는 연구가 쌓이고 있다. "입 냄새"로 넘기지 말아야 한다.</p>

<h2>칫솔질 훈련 단계</h2>
<div class="callout-cat">
<strong>거부하는 고양이 칫솔질 훈련</strong><br>
1단계: 손가락으로 잇몸 터치 → 간식 (1~2주)<br>
2단계: 치약 맛보기 (고양이 전용 치약 — 사람용 금지!)<br>
3단계: 손가락에 치약 묻혀 잇몸·치아 마사지<br>
4단계: 핑거 칫솔 도입<br>
5단계: 작은 칫솔 → 점진적 확대<br>
▶ 매일 짧게, 저항하면 단계 후퇴
</div>

<h2>칫솔질이 불가능할 때 대안</h2>
<table>
<thead><tr><th>방법</th><th>효과 수준</th><th>사용법</th></tr></thead>
<tbody>
<tr><td>VOHC 인증 치과 간식</td><td>중간</td><td>매일 1~2개</td></tr>
<tr><td>치과용 물 첨가제</td><td>낮음~중간</td><td>매일 물에 첨가</td></tr>
<tr><td>치과용 젤·스프레이</td><td>중간</td><td>직접 구강 도포</td></tr>
<tr><td>치과 전용 건식 사료</td><td>낮음~중간</td><td>주식 대체</td></tr>
</tbody>
</table>

<h2>마지막으로</h2>
<p>칫솔질이 가장 효과적이지만, 못한다면 다른 방법이라도 하는 것이 안 하는 것보다 낫다. 연 1~2회 수의사 구강 검진이 병행되면 가장 이상적이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Lund, E.M. et al. — Oral disease in cats. J Vet Dent 1998",
      "한국수의치과학회 고양이 치아 관리 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-28T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-573",
    slug: "dog-rehoming-considerations",
    type: "blog",
    category: 1,
    title: "반려견 재입양을 고려할 때 — 포기가 아닌 최선을 위한 결정",
    subtitle: "재입양이 적절한 경우와 아닌 경우, 올바른 재입양 방법, 죄책감 다루기",
    metaTitle: "반려견 재입양 — 고려 기준·올바른 방법·죄책감 다루기 | 펫지기",
    metaDescription: "반려견 재입양을 고려할 때 알아야 할 것들. 재입양이 최선인 경우와 아닌 경우, 올바른 재입양 방법, 재입양 결정 후 죄책감을 다루는 방법을 정리했습니다.",
    body: `<p>반려견을 다른 가정에 보내는 것을 생각한다는 것이 얼마나 힘든 결정인지 안다. 이 글은 그 결정을 쉽게 만들려는 것이 아니라, 진지하게 고려 중인 분들을 위해 쓰였다.</p>

<h2>재입양을 진지하게 고려하는 상황</h2>
<ul>
<li>심각한 공격성 — 가족 중 어린이·노인이 다칠 위험</li>
<li>보호자의 심각한 건강 문제 (더 이상 돌볼 수 없는 상황)</li>
<li>강아지의 욕구를 전혀 충족시킬 수 없는 환경 (장기간 독거·여행이 잦은 직업)</li>
<li>가족 구성원의 심각한 알레르기</li>
</ul>

<h2>먼저 시도해볼 것</h2>
<div class="callout-dog">
<strong>재입양 전 대안 고려</strong><br>
• 행동 문제: 공인 행동 전문가 상담 (많은 경우 해결 가능)<br>
• 시간 부족: 도그워커·펫시터 활용<br>
• 알레르기: 알레르기 전문의 치료 + 청결 관리 병행<br>
• 훈련 불가: 전문 훈련사 위탁 훈련
</div>

<h2>재입양이 최선일 때</h2>
<p>모든 대안을 진지하게 시도했고, 강아지의 삶의 질과 가족의 안전이 공존하기 어렵다면 재입양은 강아지를 위한 결정이기도 하다. 행복하게 받아줄 수 있는 가정이 그 강아지에게는 더 좋은 삶일 수 있다.</p>

<h2>올바른 재입양 방법</h2>
<ul>
<li>보호소에 바로 맡기기보다 직접 새 가정 찾기</li>
<li>강아지에 대한 정확한 정보 공유 (성격·병력·행동 특성)</li>
<li>새 가정 방문·인터뷰로 적합성 확인</li>
<li>동물 보호 단체 연계 지원 요청</li>
</ul>

<h2>마지막으로</h2>
<p>재입양을 선택한 보호자를 쉽게 판단하지 마라. 모든 상황은 다르다. 중요한 것은 그 이후로 강아지가 잘 지내는 것이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Diesel, G. et al. — Factors affecting the success of rehabilitation of rescued dogs. Vet Rec 2008",
      "한국동물복지협회 재입양 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-28T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-574",
    slug: "cat-body-language-guide",
    type: "blog",
    category: 5,
    title: "고양이 바디랭귀지 — '괜찮아요'와 '그만해요'를 구분하는 방법",
    subtitle: "꼬리·귀·자세·눈동자 신호, 배 보여줄 때 의미, 물기 전 경고 신호",
    metaTitle: "고양이 바디랭귀지 완전 가이드 — 괜찮아·그만해 신호 해석 | 펫지기",
    metaDescription: "고양이 바디랭귀지를 이해하는 방법. 꼬리·귀·자세·눈동자 신호 해석, 배를 보여줄 때 진짜 의미, 물기 전 경고 신호를 정리했습니다.",
    body: `<p>고양이가 갑자기 손을 물었다. "왜 갑자기?"라고 생각하지만, 고양이는 이미 여러 번 신호를 보냈다. 바디랭귀지를 읽으면 물리지 않는다.</p>

<h2>꼬리 신호</h2>
<ul>
<li><strong>수직으로 세우기</strong>: 행복·인사 신호 (가장 긍정적)</li>
<li><strong>부드럽게 흔들기</strong>: 집중·관심</li>
<li><strong>좌우로 크게 흔들기</strong>: 짜증·흥분 → 물기 직전 경고</li>
<li><strong>몸에 바짝 붙임</strong>: 두려움</li>
<li><strong>꼬리 끝만 흔들기</strong>: 집중하고 있음 (놀이 또는 긴장)</li>
</ul>

<h2>귀·눈 신호</h2>
<table>
<thead><tr><th>신호</th><th>의미</th></tr></thead>
<tbody>
<tr><td>귀 앞으로</td><td>호기심·집중</td></tr>
<tr><td>귀 옆으로 납작(비행기 귀)</td><td>극도의 불안·공격 전</td></tr>
<tr><td>동공 세로로 좁게</td><td>이완·행복</td></tr>
<tr><td>동공 크게 확장</td><td>각성·두려움·흥분</td></tr>
<tr><td>눈 천천히 깜빡</td><td>신뢰·애정 신호</td></tr>
</tbody>
</table>

<h2>배 보여줄 때</h2>
<div class="callout-cat">
<strong>배를 보여줄 때 의미</strong><br>
• 이완·신뢰의 표현 — "나 편안해요"<br>
• 배 만지라는 신호가 아닌 경우가 많음<br>
• 배를 갑자기 만지면 반사적으로 물거나 할퀴는 경우 흔함<br>
• 배 만지기를 허용하는 고양이도 있지만 개체 차가 크다
</div>

<h2>물기 전 경고 신호</h2>
<ul>
<li>꼬리 크게 흔들기</li>
<li>피부 파르르 떨림</li>
<li>귀 뒤로·납작</li>
<li>동공 확장</li>
<li>하악질</li>
</ul>
<p>이 신호를 무시하면 물린다. 멈추는 것이 올바른 반응이다.</p>

<h2>마지막으로</h2>
<p>고양이를 이해하는 것은 언어를 배우는 것과 같다. 처음에는 어렵지만, 신호를 알면 고양이도 보호자도 훨씬 행복해진다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Turner, D.C. & Bateson, P. — The Domestic Cat: The Biology of its Behaviour. Cambridge University Press 2014",
      "한국고양이보호자연합 고양이 신호 해석 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-29T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-575",
    slug: "pet-hospice-care-guide",
    type: "blog",
    category: 6,
    title: "반려동물 호스피스 케어 — 마지막 시간을 편안하게 보내는 방법",
    subtitle: "호스피스 케어란, 통증 조절, 편안한 환경 만들기, 보호자 돌봄",
    metaTitle: "반려동물 호스피스 케어 — 마지막 시간을 위한 완전 가이드 | 펫지기",
    metaDescription: "반려동물 호스피스 케어 방법. 치료 중단과 편안함 선택, 통증 조절, 집에서 할 수 있는 환경 개선, 마지막 시간을 함께 보내는 보호자 가이드.",
    body: `<p>치료를 계속하는 것보다 남은 시간을 편안하게 보내주는 것이 더 나은 사랑일 때가 있다. 반려동물 호스피스는 그 선택을 위한 케어다.</p>

<h2>호스피스 케어란</h2>
<p>치유를 목표로 하지 않고, 남은 시간 동안 통증과 불편을 최소화해 삶의 질을 최대화하는 케어다. 적극적 치료 대신 편안함(comfort care)에 집중한다. 이것은 포기가 아니라 다른 형태의 사랑이다.</p>

<h2>호스피스 케어 시작을 고려하는 시점</h2>
<ul>
<li>치료의 부작용이 이득보다 클 때</li>
<li>여명이 짧을 것으로 예상될 때</li>
<li>이동·병원 방문 자체가 극도의 스트레스를 줄 때</li>
<li>보호자가 남은 시간의 질을 선택했을 때</li>
</ul>

<h2>통증 조절</h2>
<div class="callout-cat">
<strong>호스피스 통증 관리</strong><br>
• 수의사 처방 진통제 (오피오이드·NSAIDs·가바펜틴)<br>
• 필요 시 가정 방문 수의사 활용<br>
• 통증 신호 모니터링: 식욕·움직임·표정·반응성<br>
• 과잉 처치보다 고통 없는 마지막 시간이 우선
</div>

<h2>편안한 환경 만들기</h2>
<ul>
<li>따뜻하고 부드러운 침대 (관절 통증 완화)</li>
<li>가장 좋아하는 장소에서 쉴 수 있게</li>
<li>음식·물은 쉽게 접근할 수 있는 위치</li>
<li>좋아하는 사람들과 함께 있는 시간</li>
<li>과도한 자극·소음 최소화</li>
</ul>

<h2>보호자 스스로 돌보기</h2>
<p>호스피스 기간은 보호자에게도 극도로 힘든 시간이다. 지인에게 도움 요청하기, 짧은 휴식 취하기, 감정을 표현할 공간 찾기가 필요하다. 본인이 지쳐 있으면 반려동물을 잘 돌볼 수 없다.</p>

<h2>마지막으로</h2>
<p>호스피스 케어를 선택하는 것은 어렵고 용기 있는 결정이다. 최선의 치료가 아닌 최선의 사랑을 선택하는 것이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Downing, R. — Palliative Care and Hospice. Vet Clin North Am 2011",
      "한국수의완화의학연구회 반려동물 호스피스 케어 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-29T11:00:00.000Z",
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
  console.log("블로그 포스트 90차 시딩 완료! (blog-571 ~ blog-575)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
