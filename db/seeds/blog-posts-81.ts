import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 81 — cat1×2 + cat3×1 + cat5×1 + cat2×1 = 5편 (IDs 526-530)
// Macros: F, A, D, B, G
// Angles: RA6, RA4, RA2, RA4, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-526",
    slug: "mixed-breed-vs-purebred-health",
    type: "blog",
    category: 1,
    title: "믹스견·믹스묘 vs 순종 — 건강 수명은 누가 더 길까",
    subtitle: "혼혈 강점(Hybrid Vigor) 연구, 순종 유전 질환, 장단점 비교",
    metaTitle: "믹스견·믹스묘 vs 순종 건강 비교 — 수명·유전 질환·장단점 | 펫지기",
    metaDescription: "믹스견·믹스묘와 순종 강아지·고양이의 건강 차이를 비교했습니다. 혼혈 강점(Hybrid Vigor) 연구, 순종 유전 질환, 입양 시 고려할 장단점을 정리했습니다.",
    body: `<p>"믹스가 건강하다"는 말을 많이 들어봤을 것이다. 실제로 연구로 확인된 사실이지만, 순종이 모두 건강하지 않다는 뜻도 아니다.</p>

<h2>혼혈 강점(Hybrid Vigor)이란</h2>
<p>서로 다른 유전자 풀이 합쳐질 때 유전적 다양성이 높아지고, 열성 유전 질환 발현 가능성이 낮아지는 현상이다. 학술적으로 "잡종강세(heterosis)"라고 한다.</p>

<h2>연구로 확인된 차이</h2>
<ul>
<li>2013년 UC Davis 연구: 10개 유전 질환 중 8개에서 순종이 더 높은 발생률</li>
<li>믹스견 평균 수명: 순종 대비 1.2년 길다는 보고</li>
<li>그러나 심장 질환·백내장 일부는 순종 vs 믹스 차이 미미</li>
</ul>

<h2>순종 품종별 주요 유전 질환</h2>
<div class="callout-dog">
<strong>품종별 고위험 유전 질환</strong><br>
• 카발리에 KCS: 승모판 질환(MVD) 유전율 높음<br>
• 달마시안: 청각 장애<br>
• 버미즈 고양이: 머리 기형<br>
• 스코티시 폴드: 골연골 이형성증 (귀 접힘 자체가 유전 질환)<br>
• 도베르만: 확장성 심근병증(DCM)
</div>

<h2>믹스견의 단점</h2>
<ul>
<li>외모·성격·크기가 불예측적</li>
<li>일부 두 품종 교배 믹스(F1)는 부모 양쪽 유전 질환 모두 가질 수 있음</li>
</ul>

<h2>마지막으로</h2>
<p>순종이라고 모두 아프고, 믹스라고 모두 건강한 것은 아니다. 개체의 건강력과 부모 이력이 중요하다. 믹스견·믹스묘도 충분히 사랑스럽고 건강하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bellumori, T.P. et al. — Prevalence of inherited disorders in mixed- and purebred dogs. JAVMA 2013",
      "한국동물복지협회 품종별 건강 데이터 리뷰",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-05T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-527",
    slug: "dog-adoption-preparation-checklist",
    type: "blog",
    category: 1,
    title: "강아지 입양 전 준비 체크리스트 — 집을 '강아지 안전 구역'으로 만드는 법",
    subtitle: "입양 전 구매 목록, 위험한 식물·물건 제거, 탈출 차단, 동물병원 예약",
    metaTitle: "강아지 입양 전 준비 체크리스트 — 집 안전 구역 만들기 | 펫지기",
    metaDescription: "강아지를 입양하기 전에 집을 안전하게 만드는 체크리스트. 구매 목록, 위험한 식물·물건 제거, 탈출 차단, 동물병원 예약, 첫날 준비까지 정리했습니다.",
    body: `<p>강아지 입양 당일은 준비가 됐을 때 해야 한다. 미리 집을 안전하게 만들고 필요한 것을 갖춰두면 첫날부터 훨씬 여유롭다.</p>

<h2>구매 목록</h2>
<ul>
<li>밥그릇·물그릇 (스테인리스 또는 세라믹 권장)</li>
<li>이동장 (크레이트 훈련용)</li>
<li>침대 또는 매트 (이동장 안에 넣을 수 있는 크기)</li>
<li>목줄·하네스·리드줄</li>
<li>입양 전 먹던 사료 (급격한 전환 방지)</li>
<li>기본 장난감 (씹는 것, 소리나는 것)</li>
<li>배변 패드·청소 용품</li>
</ul>

<h2>집 안전 점검</h2>
<div class="callout-dog">
<strong>강아지 위험 요소 제거</strong><br>
• 독성 식물 제거: 알로에·튤립·아이비·포인세티아<br>
• 전선·충전기 케이블 정리 (씹기 사고 예방)<br>
• 낮은 선반·서랍 잠금<br>
• 화장실·세탁기 문 항상 닫기<br>
• 발코니·창문 탈출 차단망 확인
</div>

<h2>탈출 방지</h2>
<ul>
<li>현관문 이중 게이트 설치 (외출 시 강아지 탈출 방지)</li>
<li>베란다 난간 간격 확인 (소형견 빠져나갈 수 있음)</li>
<li>마당 울타리 점검</li>
</ul>

<h2>동물병원 준비</h2>
<ul>
<li>집 근처 동물병원 2~3곳 미리 파악</li>
<li>24시간 응급 동물병원 번호 저장</li>
<li>입양 후 1주 내 첫 건강 검진 예약</li>
</ul>

<h2>마지막으로</h2>
<p>강아지는 입양 당일부터 모든 것을 탐색한다. 준비되지 않은 집에서의 첫날은 강아지와 보호자 모두에게 힘든 시간이 된다. 30분의 준비가 첫 1주를 바꾼다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA Animal Poison Control — Plants Toxic to Dogs",
      "한국동물복지협회 강아지 입양 전 체크리스트 2023",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-05T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-528",
    slug: "dog-atopic-environment-management",
    type: "blog",
    category: 3,
    title: "강아지 아토피 관리 — 환경 개선으로 긁는 횟수 줄이는 방법",
    subtitle: "집 먼지 진드기 제거, 공기 청정기 선택, 목욕 주기, 산책 후 관리",
    metaTitle: "강아지 아토피 환경 관리 — 집 먼지 진드기·공기·목욕 가이드 | 펫지기",
    metaDescription: "강아지 아토피 증상을 줄이는 환경 관리 방법. 집 먼지 진드기 제거, 공기 청정기 선택, 최적 목욕 주기, 산책 후 알레르겐 제거법을 정리했습니다.",
    body: `<p>아토피 강아지에게 약만큼 중요한 것이 환경 관리다. 알레르겐을 줄이면 약의 용량을 낮추거나 증상 안정 기간을 늘릴 수 있다.</p>

<h2>집 먼지 진드기 제거</h2>
<p>아토피 강아지의 가장 흔한 알레르겐은 집 먼지 진드기다. 진드기는 습도 70% 이상, 온도 25도 이상에서 번식한다.</p>
<ul>
<li>침구 주 2회 이상 60도 이상 세탁·건조</li>
<li>강아지 침대 주 1회 세탁</li>
<li>카펫·소파 진드기 방지 커버 사용</li>
<li>습도 50% 이하 유지 (제습기 활용)</li>
</ul>

<h2>공기 청정기 선택</h2>
<div class="callout-dog">
<strong>아토피용 공기 청정기 기준</strong><br>
• HEPA 필터 필수 (0.3μm 미립자 99.97% 포집)<br>
• 꽃가루·곰팡이 포집 가능<br>
• 오존 발생형 공기 청정기는 오히려 호흡기 자극 가능 (피할 것)<br>
• 강아지가 자는 방 중심 설치
</div>

<h2>최적 목욕 주기</h2>
<p>아토피 강아지는 주 1~2회 목욕이 오히려 피부 장벽을 회복시키는 데 도움이 된다. 단, 동물 전용 무자극 또는 처방 샴푸 사용이 조건이다. 인간용 샴푸는 pH가 달라 피부 장벽을 손상시킨다.</p>

<h2>산책 후 관리</h2>
<ul>
<li>발·배 닦기: 알레르겐 제거 가장 효과적</li>
<li>발 담그기: 수건보다 짧은 물 담근 물로 헹구기</li>
<li>귀 닦기: 귀 감염 예방 (귀 아토피 흔함)</li>
</ul>

<h2>마지막으로</h2>
<p>환경 개선은 즉각적인 효과보다 누적되는 효과가 크다. 꾸준히 관리하면 약을 줄이면서도 증상 안정 기간을 길게 유지할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Olivry, T. et al. — Treatment of canine atopic dermatitis: 2015 updated guidelines. BMC Vet Res 2015",
      "한국수의피부학회 아토피 환경 관리 지침",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-06T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-529",
    slug: "cat-scratching-post-selection",
    type: "blog",
    category: 5,
    title: "고양이 스크래처 선택 — 왜 사놓은 스크래처를 안 쓰는가",
    subtitle: "스크래처 재질·방향·높이 기준, 올바른 위치 배치, 소파 긁기 방지법",
    metaTitle: "고양이 스크래처 선택 — 안 쓰는 이유와 올바른 선택·배치법 | 펫지기",
    metaDescription: "고양이가 사놓은 스크래처를 무시하고 소파만 긁는 이유. 스크래처 재질·방향·높이 기준, 올바른 위치 배치, 소파 긁기 방지법을 정리했습니다.",
    body: `<p>비싸게 산 스크래처를 고양이가 쳐다보지도 않고 소파만 긁는다. 스크래처 선택과 배치에 과학이 있다.</p>

<h2>고양이가 긁는 이유</h2>
<p>발톱 관리(겉 껍질 제거)가 주 목적이지만, 스트레칭, 영역 표시(시각적+페로몬), 감정 표현도 겹쳐있다. 긁는 것 자체를 막을 수 없다 — 어디서 긁을지를 유도하는 것이 목표다.</p>

<h2>재질별 선호도</h2>
<table>
<thead><tr><th>재질</th><th>특징</th></tr></thead>
<tbody>
<tr><td>사이잘 삼(sisal)</td><td>가장 인기, 발톱 속 잘 걸림</td></tr>
<tr><td>골판지</td><td>수평형 선호 고양이에게 좋음, 소모품</td></tr>
<tr><td>카펫</td><td>집에 카펫 있으면 혼동 가능</td></tr>
<tr><td>목재</td><td>일부 선호, 영역 표시에 효과적</td></tr>
</tbody>
</table>

<h2>스크래처 선택 기준</h2>
<div class="callout-cat">
<strong>올바른 스크래처 조건</strong><br>
• <strong>높이</strong>: 고양이가 최대로 뻗었을 때 닿는 높이 (일반적으로 90cm+)<br>
• <strong>안정성</strong>: 흔들리지 않아야 함 — 불안정하면 사용 거부<br>
• <strong>방향</strong>: 수직형(대부분), 수평형(일부 선호), 개별 차이 확인<br>
• <strong>소파 옆 배치</strong>: 기존 긁는 장소 바로 옆에 놓기 (점진적 이동)
</div>

<h2>소파 긁기 방지</h2>
<ul>
<li>소파 모서리에 스크래처 직접 붙이기</li>
<li>두꺼운 테이프나 알루미늄 포일로 소파 커버 (질감 차단)</li>
<li>스크래처 사용 시 즉시 간식 보상</li>
<li>페로몬 스프레이를 스크래처에 (영역 유도)</li>
</ul>

<h2>마지막으로</h2>
<p>스크래처를 고르는 것보다 어디에, 어떻게 배치하느냐가 더 중요하다. 고양이가 자주 있는 공간, 이미 긁는 장소 옆에 놓는 것이 성공의 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bradshaw, J.W.S. — The behaviour of the domestic cat. CABI 2012",
      "한국고양이보호자연합 스크래처 사용 행동 분석",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-06T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-530",
    slug: "cat-omega3-fish-oil-guide",
    type: "blog",
    category: 2,
    title: "고양이 오메가-3 — 언제, 얼마나, 어떤 제품을 줘야 하나",
    subtitle: "오메가-3 효능 근거, EPA·DHA vs ALA 차이, 어유 선택 기준, 용량 가이드",
    metaTitle: "고양이 오메가-3 보충제 가이드 — 효능·용량·제품 선택법 | 펫지기",
    metaDescription: "고양이에게 오메가-3를 주어야 할 때와 방법을 정리했습니다. EPA·DHA와 ALA 차이, 어유 보충제 선택 기준, 체중별 용량 가이드를 알아보세요.",
    body: `<p>오메가-3는 고양이에게 가장 많이 추천되는 보충제 중 하나다. 그러나 종류·용량·시기를 모르면 효과를 기대하기 어렵다.</p>

<h2>오메가-3가 도움이 되는 상황</h2>
<ul>
<li>피부·털 상태 개선 (건조한 피부·비듬·털 윤기)</li>
<li>염증 감소 (관절염·아토피·IBD)</li>
<li>신장 보호 (CKD 고양이에서 일부 연구 확인)</li>
<li>심장 기능 보조 (심근병증)</li>
</ul>

<h2>EPA·DHA vs ALA 차이</h2>
<p>생선 기름(어유)에 들어있는 EPA·DHA가 직접 효과를 낸다. 아마씨유에 들어있는 ALA는 고양이 체내에서 EPA·DHA로 전환이 매우 낮다. 고양이에게는 반드시 어유(EPA·DHA 직접 함유)가 필요하다.</p>

<h2>어유 선택 기준</h2>
<div class="callout-cat">
<strong>고양이용 어유 선택 포인트</strong><br>
• 정어리·멸치·청어 등 소형 어류 원료 (중금속 축적 적음)<br>
• EPA+DHA 함량 명시된 제품<br>
• 산화 방지를 위한 비타민E 포함 여부<br>
• 인간용 생선 기름도 성분 확인 후 사용 가능
</div>

<h2>용량 가이드</h2>
<ul>
<li>일반 보충: EPA+DHA 기준 체중 1kg당 25~50mg/일</li>
<li>치료 목적(CKD·IBD): 수의사 처방 용량 따를 것</li>
<li>처음에는 낮은 용량으로 시작 (소화 적응)</li>
<li>지방 함량이 높으므로 비만 고양이에게는 주의</li>
</ul>

<h2>마지막으로</h2>
<p>오메가-3는 단기간 효과보다 수주~수개월의 꾸준한 보충으로 효과가 나타난다. 저품질 제품은 산화(산패)되어 오히려 해로울 수 있으니 신뢰할 수 있는 제품을 선택하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bauer, J.E. — Therapeutic use of fish oils in companion animals. JAVMA 2011",
      "한국수의영양학회 오메가-3 보충제 사용 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-07T09:00:00.000Z",
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
  console.log("블로그 포스트 81차 시딩 완료! (blog-526 ~ blog-530)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
