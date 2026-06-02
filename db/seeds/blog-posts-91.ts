import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 91 — cat3×2 + cat4×1 + cat2×1 + cat1×1 = 5편 (IDs 576-580)
// Macros: A, D, F, B, G
// Angles: RA1, RA7, RA5, RA3, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-576",
    slug: "dog-cancer-early-warning-signs",
    type: "blog",
    category: 3,
    title: "강아지 암 조기 경고 신호 10가지 — 보호자가 놓치기 쉬운 것들",
    subtitle: "수의종양학회 권고 증상, 흔한 암 유형별 신호, 정기 검진의 중요성",
    metaTitle: "강아지 암 조기 경고 신호 10가지 — 보호자 체크리스트 | 펫지기",
    metaDescription: "강아지 암 조기 발견을 위한 경고 신호 10가지. 수의종양학회 권고 증상, 흔한 암 유형별 신호, 정기 건강 검진이 중요한 이유를 정리했습니다.",
    body: `<p>반려견 암 사망률의 상당 부분은 조기 발견 실패에서 온다. 증상을 알고 있으면 조기에 발견할 가능성이 높아진다.</p>

<h2>수의종양학회 권고 10대 경고 신호</h2>
<ul>
<li>비정상적으로 지속되거나 커지는 부종·혹</li>
<li>아무는 않는 상처</li>
<li>갑작스러운 체중 감소</li>
<li>식욕 감소</li>
<li>비정상적인 분비물(혈액·고름·악취)</li>
<li>음식 먹기 어려움·삼키기 힘들어함</li>
<li>운동 불내성·무기력</li>
<li>지속적인 파행(절뚝거림)</li>
<li>호흡 곤란·소변·배변 장애</li>
<li>구취 악화·구강 내 출혈</li>
</ul>

<h2>흔한 강아지 암 유형별 신호</h2>
<div class="callout-dog">
<strong>종류별 주요 신호</strong><br>
• <strong>비만세포종</strong>: 피부 혹 (크기 변동)<br>
• <strong>림프종</strong>: 림프절 비대(목·겨드랑이·서혜부)<br>
• <strong>골육종</strong>: 사지 파행, 국소 부종, 대형견<br>
• <strong>비장 종양</strong>: 갑작스러운 쇠약·복부 팽만<br>
• <strong>유선 종양</strong>: 유두 주변 혹 (비중성화 암컷)
</div>

<h2>정기 검진의 중요성</h2>
<p>많은 암이 증상이 없는 단계에서 시작된다. 7세 이상 강아지에서 연 2회 검진, 혈액 검사, 흉부 X-ray가 조기 발견의 핵심이다. 세침흡인(FNA) 검사 5분이 생사를 가를 수 있다.</p>

<h2>마지막으로</h2>
<p>암 진단이 선고가 아니다. 조기에 발견할수록 치료 선택지가 많고, 예후가 훨씬 좋다. 매달 보호자가 강아지 전신을 손으로 만져보는 습관이 가장 쉬운 조기 검진이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Vail, D.M. et al. — Cancer in Dogs and Cats: Medical and Surgical Management. Teton NewMedia 2001",
      "한국수의종양학회 반려동물 암 조기 발견 캠페인 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-30T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-577",
    slug: "dog-leptospirosis-prevention",
    type: "blog",
    category: 3,
    title: "강아지 렙토스피라증 — 물·쥐 접촉으로 감염되는 인수공통 질환",
    subtitle: "렙토스피라 감염 경로, 증상, 사람 감염 위험, 예방 접종",
    metaTitle: "강아지 렙토스피라증 — 감염 경로·증상·사람 전파·예방 접종 | 펫지기",
    metaDescription: "강아지 렙토스피라증 감염 경로와 예방 방법. 물·쥐 접촉을 통한 감염, 신장·간 손상 증상, 사람에게 전파 위험, 예방 접종 기준을 정리했습니다.",
    body: `<p>여름 장마 후 물웅덩이나 야생동물이 있는 지역을 산책하는 강아지에게 렙토스피라 감염 위험이 높아진다. 이 질환은 사람에게도 감염될 수 있다.</p>

<h2>렙토스피라란</h2>
<p>렙토스피라(Leptospira) 세균에 의한 인수공통 감염병이다. 감염된 동물(쥐·다람쥐·야생 동물)의 소변에 오염된 물·토양이 주요 감염원이다. 상처 난 피부 또는 점막을 통해 침투한다.</p>

<h2>감염 위험 상황</h2>
<ul>
<li>침수된 물웅덩이·강가·습지 산책</li>
<li>야생동물(쥐) 서식 지역</li>
<li>여름·장마 기간 (세균 생존에 유리한 환경)</li>
<li>농촌·도심 하천 주변 생활</li>
</ul>

<h2>증상</h2>
<div class="callout-dog">
<strong>렙토스피라 주요 증상</strong><br>
• 갑작스러운 고열, 구토, 식욕 감소<br>
• 신장 손상: 다음·다뇨 또는 소변 감소<br>
• 간 손상: 황달(눈·잇몸 노란색)<br>
• 근육통·움직임 감소<br>
• 심한 경우: 신부전·간부전으로 사망
</div>

<h2>사람 감염 위험</h2>
<p>감염된 강아지의 소변에서 세균이 배출된다. 보호자가 소변에 노출되면 감염될 수 있다. 치료 기간 동안 강아지 소변 처리 시 장갑 착용 권장.</p>

<h2>예방 접종</h2>
<ul>
<li>렙토스피라 백신: 기본 예방접종 항목에 포함 (DA2PPL)</li>
<li>야외 활동이 많은 강아지: 연 1회 이상 접종 권장</li>
<li>접종 후에도 완전 예방이 아닌 증상 완화 효과</li>
</ul>

<h2>마지막으로</h2>
<p>렙토스피라는 조기에 항생제로 치료하면 예후가 좋다. 그러나 늦게 발견하면 신장·간 손상이 영구적이다. 장마 후 강가 산책 후 고열이 발생하면 즉시 수의사 방문이 필요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Schuller, S. et al. — European consensus statement on leptospirosis in dogs and cats. J Small Anim Pract 2015",
      "질병관리청 렙토스피라증 인수공통 감염 안내",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-30T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-578",
    slug: "spay-neuter-myths-facts",
    type: "blog",
    category: 4,
    title: "중성화 수술 오해와 진실 — '살찐다', '성격 변한다'는 사실인가",
    subtitle: "중성화 후 체중 변화 실제 원인, 성격·행동 변화, 건강상 장단점",
    metaTitle: "중성화 수술 오해와 진실 — 살찌는 이유·성격 변화·건강 장단점 | 펫지기",
    metaDescription: "중성화 수술에 대한 오해를 사실로 확인합니다. '살찐다'는 진짜인지, 성격이 변하는지, 건강에 좋은 점과 나쁜 점을 정리했습니다.",
    body: `<p>"중성화하면 살찐다", "성격이 변한다", "자연스럽지 않다"는 이야기가 있다. 이 중 사실인 것과 아닌 것을 구분해보자.</p>

<h2>"중성화하면 살찐다" — 반은 사실</h2>
<p>중성화 후 기초 대사율이 약간 낮아지고, 식욕이 증가하는 경향이 있다. 그러나 살이 찌는 것은 중성화 자체가 아니라 사료량을 줄이지 않았기 때문이다. 중성화 후 10~20% 사료량을 줄이면 체중 유지가 가능하다.</p>

<h2>"성격이 변한다" — 일부 사실</h2>
<ul>
<li>수컷: 테스토스테론 관련 행동(마킹·공격성·탈출 충동) 감소 → 긍정적 변화</li>
<li>암컷: 발정기 관련 행동(울음·초조함) 사라짐 → 긍정적 변화</li>
<li>근본 성격(내향·외향·활발함)은 변하지 않는다</li>
</ul>

<h2>건강상 장점</h2>
<div class="callout-dog">
<strong>중성화 건강 이점</strong><br>
• 암컷: 자궁축농증·유선 종양 위험 크게 감소<br>
• 수컷: 전립선 질환·고환 종양 예방<br>
• 길 잃을 위험(마킹·탈출 감소)<br>
• 전체적 수명 연장 경향
</div>

<h2>건강상 단점 (최신 연구)</h2>
<ul>
<li>일부 대형견에서 특정 암(골육종·비만세포종) 위험 미세 증가 연구 있음</li>
<li>요실금(특히 암컷 대형견 일부)</li>
<li>갑상선 기능 저하 위험 약간 증가</li>
</ul>
<p>단, 대부분의 연구에서 중성화의 전반적 이점이 위험보다 크다고 결론.</p>

<h2>마지막으로</h2>
<p>중성화 여부는 보호자의 결정이다. 그러나 결정의 근거로 잘못된 정보가 사용되지 않았으면 한다. 수의사와 함께 개별 강아지·고양이 상황에 맞는 판단을 내리는 것이 가장 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Kustritz, M.V.R. — Determining optimal age for gonadectomy of dogs and cats. JAVMA 2007",
      "한국수의학회 중성화 수술 효과 및 위험성 리뷰",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-31T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-579",
    slug: "dog-antioxidant-foods-guide",
    type: "blog",
    category: 2,
    title: "강아지에게 줄 수 있는 항산화 식품 — 노화·암 예방에 도움이 될까",
    subtitle: "항산화 식품의 과학적 근거, 블루베리·시금치·당근 급여 방법, 과장된 주장 구분",
    metaTitle: "강아지 항산화 식품 가이드 — 과학 근거와 올바른 급여법 | 펫지기",
    metaDescription: "강아지에게 항산화 식품이 도움이 될까요? 블루베리·시금치·당근 등 항산화 식품의 과학적 근거, 올바른 급여 방법, 과장된 주장을 구분해서 정리했습니다.",
    body: `<p>블루베리가 강아지 인지 기능에 좋다는 연구가 있다. 그러나 항산화 식품의 효과는 "기적 식품"처럼 과장되기도 한다. 실제 근거를 살펴보자.</p>

<h2>항산화제란</h2>
<p>자유 라디칼(활성 산소)의 손상을 억제하는 물질이다. 노화·암·만성 염증과 자유 라디칼의 관련성이 연구로 확인되어 있다. 그러나 "항산화 식품 먹으면 암이 낫는다"는 것은 과장이다.</p>

<h2>근거가 있는 항산화 식품</h2>
<div class="callout-dog">
<strong>강아지에게 안전한 항산화 식품</strong><br>
• <strong>블루베리</strong>: 인지 기능 개선 연구 있음. 씻어서 소량.<br>
• <strong>당근</strong>: 베타카로틴. 저칼로리 간식.<br>
• <strong>시금치</strong>: 소량 (옥살산 과다 주의).<br>
• <strong>브로콜리</strong>: 비타민C·K. 소량 (과다 시 소화 장애).<br>
• <strong>고구마</strong>: 베타카로틴 풍부. 삶아서 소량.
</div>

<h2>과장된 주장 구분하기</h2>
<ul>
<li>"암 예방 확정" → 인간 연구를 동물에 직접 적용 불가</li>
<li>"노화 역전" → 과학적 근거 없는 마케팅 표현</li>
<li>"대용량 복용 = 더 효과" → 일부 항산화제는 과다 시 독성</li>
</ul>

<h2>올바른 활용법</h2>
<ul>
<li>간식 또는 주식 보완으로 소량 활용</li>
<li>주식(AAFCO 완전영양식 사료)의 항산화 성분이 기본</li>
<li>보충제보다 자연 식품에서 섭취</li>
</ul>

<h2>마지막으로</h2>
<p>항산화 식품은 좋은 보완이지 만능 치료제가 아니다. 블루베리 한 줌이 일상의 좋은 간식이 될 수 있지만, 의약품 수준의 효과를 기대하는 것은 현실적이지 않다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Milgram, N.W. et al. — Antioxidant supplementation effects on cognitive function in aged dogs. JNAVMS 2002",
      "한국수의영양학회 항산화 영양소 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-31T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-580",
    slug: "rabbit-adoption-beginner-guide",
    type: "blog",
    category: 1,
    title: "토끼 입양 초보자 가이드 — '쉬운 반려동물'이라는 오해",
    subtitle: "토끼의 실제 돌봄 요구량, 수명, 의료비, 사회화 필요성, 적합한 보호자 유형",
    metaTitle: "토끼 입양 가이드 — 쉽지 않은 토끼 돌봄의 현실 | 펫지기",
    metaDescription: "토끼가 '쉬운 반려동물'이라는 오해를 바로잡습니다. 토끼의 실제 돌봄 요구량, 수명, 의료비, 사회화, 알아야 할 건강 정보를 정리했습니다.",
    body: `<p>토끼는 '쉬운 반려동물'로 알려져 있다. 그러나 실제로는 개·고양이보다 더 까다로운 돌봄이 필요할 수 있다.</p>

<h2>'쉽다'는 오해</h2>
<ul>
<li>케이지에만 두면 된다 → 매일 최소 3~4시간 자유 시간이 필요</li>
<li>혼자 있어도 괜찮다 → 사회적 동물, 고독에 약함</li>
<li>채소만 주면 된다 → 건초 기반 식이 필수, 채소는 보완</li>
<li>냄새 없다 → 화장실 매일 청소 안 하면 심한 냄새</li>
</ul>

<h2>토끼 돌봄 현실</h2>
<div class="callout-dog">
<strong>토끼 일상 케어 요구</strong><br>
• 건초(티모시 등): 무제한 제공 (소화 기관 건강 핵심)<br>
• 자유 운동: 하루 3~4시간 이상<br>
• 화장실: 매일 청소<br>
• 사회적 접촉: 하루 최소 1~2시간 직접 교감<br>
• 중성화: 암컷은 자궁암 예방 위해 권장 (2살 이전)
</div>

<h2>수명과 의료비</h2>
<ul>
<li>수명: 8~12년 (생각보다 길다)</li>
<li>의료비: 전문 토끼 수의사 필요 (일반 동물병원이 아닐 수 있음)</li>
<li>흔한 질환: 부정교합·위장 정체(GI Stasis)·자궁 종양</li>
<li>GI Stasis: 위장이 멈추는 응급 — 48시간 내 사망 가능</li>
</ul>

<h2>적합한 보호자 유형</h2>
<ul>
<li>토끼의 비언어적 신호를 읽을 수 있는 섬세한 보호자</li>
<li>매일 충분한 상호작용 시간이 있는 보호자</li>
<li>토끼 전문 수의사가 근처에 있는 환경</li>
</ul>

<h2>마지막으로</h2>
<p>토끼는 관리하기 쉬운 반려동물이 아니다. 하지만 토끼의 언어를 이해하고, 충분한 시간을 주는 보호자에게는 매우 깊은 유대를 보여준다. 충분히 알고 선택하는 것이 모두에게 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Meredith, A. & Johnson-Delaney, C. — BSAVA Manual of Exotic Pets. BSAVA 2010",
      "한국반려토끼보호자연합 토끼 입양 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-01T09:00:00.000Z",
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
  console.log("블로그 포스트 91차 시딩 완료! (blog-576 ~ blog-580)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
