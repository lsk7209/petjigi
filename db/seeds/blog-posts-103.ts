import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 103 — cat3×2 + cat1×1 + cat5×1 + cat2×1 = 5편 (IDs 636-640)
// Macros: D, A, B, F, G
// Angles: RA2, RA1, RA5, RA4, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-636",
    slug: "dog-pannus-eye-disease",
    type: "blog",
    category: 3,
    title: "강아지 파누스(각막 혈관 신생) — 셰퍼드·콜리 보호자 필독",
    subtitle: "파누스 원인, 증상, UV 노출 위험, 치료와 장기 관리",
    metaTitle: "강아지 파누스 — 원인·UV 위험·치료·장기 관리 가이드 | 펫지기",
    metaDescription: "강아지 파누스(각막 혈관 신생) 원인과 치료. 셰퍼드·콜리에서 흔한 이 질환의 증상, UV 노출 악화, 점안제 치료, 선글라스 착용 방법을 정리했습니다.",
    body: `<p>저먼 셰퍼드·콜리·시베리안 허스키 등에서 눈이 점점 흐릿해지고, 각막에 핏줄이 자라는 경우가 있다. 파누스(Pannus, 각막 혈관 신생)다.</p>

<h2>파누스란</h2>
<p>면역 매개성 질환으로, 각막에 혈관과 색소가 침착되어 투명성이 손실된다. 진행하면 시력 저하·실명으로 이어질 수 있다. 고도가 높은 지역·강한 자외선 노출이 악화 인자다.</p>

<h2>고위험 품종</h2>
<p>저먼 셰퍼드, 콜리, 시베리안 허스키, 오스트레일리안 셰퍼드, 벨지안 말리노이</p>

<h2>증상</h2>
<ul>
<li>각막이 핑크빛·갈색·흰색으로 흐릿해짐</li>
<li>각막 가장자리(외측)에서 시작해 중심으로 진행</li>
<li>충혈·눈물</li>
<li>빛에 민감해짐</li>
</ul>

<h2>UV 노출 관리</h2>
<div class="callout-dog">
<strong>파누스 UV 관리</strong><br>
• 야외 활동 시 강아지 전용 고글·선글라스 착용<br>
• 한낮 직사광선 산책 최소화<br>
• 야외 활동 후 점안제 투여 (처방에 따라)<br>
• 고위험 품종은 정기 안과 검진
</div>

<h2>치료</h2>
<ul>
<li>사이클로스포린 또는 타크롤리무스 점안 — 면역 억제로 진행 억제</li>
<li>스테로이드 점안 — 급성 악화 시 보조</li>
<li>완치 없음, 평생 관리 필요</li>
<li>조기 발견·치료 시 시력 유지 가능</li>
</ul>

<h2>마지막으로</h2>
<p>파누스는 완치가 없지만 점안제와 UV 관리로 진행을 크게 늦출 수 있다. 고위험 품종이라면 5세 이후 연 1회 이상 안과 검진이 권장된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Nell, B. — Immune-mediated keratitis in dogs: an update. Vet Ophthalmol 2008",
      "한국수의안과학회 파누스 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-29T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-637",
    slug: "cat-aortic-thromboembolism-guide",
    type: "blog",
    category: 3,
    title: "고양이 대동맥 혈전 색전증 — 갑자기 뒷다리가 마비되는 응급",
    subtitle: "ATE 원인(심근병증 연관), 증상, 생존 예후, 예방을 위한 심장 검진",
    metaTitle: "고양이 대동맥 혈전 색전증 — 뒷다리 마비 응급 원인과 예후 | 펫지기",
    metaDescription: "고양이 대동맥 혈전 색전증(ATE) 원인과 예후. 갑작스러운 뒷다리 마비 증상, 심근병증과의 관계, 생존 가능성, 예방을 위한 심장 검진 방법을 정리했습니다.",
    body: `<p>고양이가 갑자기 뒷다리를 못 쓰고, 발이 차갑고 창백하며 극도의 통증을 호소한다면 대동맥 혈전 색전증(ATE)이다. 즉각적인 응급 처치가 필요하다.</p>

<h2>대동맥 혈전 색전증이란</h2>
<p>심장(특히 좌심방)에서 형성된 혈전이 대동맥 분지부(saddle thrombus)에 막혀 뒷다리 혈액 공급이 차단되는 상태다. 비대성 심근병증(HCM)이 가장 흔한 기저 원인이다.</p>

<h2>증상</h2>
<div class="callout-cat">
<strong>ATE 즉시 인식 신호</strong><br>
• 갑작스러운 뒷다리 마비 (완전 또는 부분)<br>
• 발이 차고 발바닥이 창백·청색<br>
• 극도의 통증 (비명·울부짖음)<br>
• 호흡 곤란 동반 가능<br>
▶ 즉시 응급 동물병원
</div>

<h2>예후 현실</h2>
<ul>
<li>첫 24~48시간이 결정적</li>
<li>생존율: 약 39~50% (집중 치료 시)</li>
<li>생존 후 재발률: 1년 내 50% 이상</li>
<li>기저 심장 질환(HCM)에 따라 예후 달라짐</li>
</ul>

<h2>예방 — 심장 검진</h2>
<ul>
<li>메인쿤·래그돌·브리티시쇼트헤어 등 HCM 고위험 품종: 2세부터 정기 심장 초음파</li>
<li>심잡음 확인 시 즉시 심장 초음파</li>
<li>HCM 진단 시 항혈전제(클로피도그렐) 처방 논의</li>
</ul>

<h2>마지막으로</h2>
<p>ATE는 갑자기 찾아오지만, 기저 심장 질환이 있는 경우 예측 가능한 상황에서 발생한다. 고위험 품종의 정기 심장 검진이 최선의 예방이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Smith, S.A. et al. — Arterial thromboembolism in cats: acute crisis in 127 cases and long-term management. J Vet Intern Med 2003",
      "한국고양이수의사회 심장 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 상황에서는 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-11-29T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-638",
    slug: "designer-dog-crossbreed-reality",
    type: "blog",
    category: 1,
    title: "디자이너 견종의 현실 — 말티푸·포메라니안믹스는 정말 건강한가",
    subtitle: "교배종 건강 주장의 과학적 근거, 실제 건강 위험, 책임 있는 선택",
    metaTitle: "디자이너 견종 건강 현실 — 말티푸·교배종의 실제 위험 | 펫지기",
    metaDescription: "디자이너 견종(말티푸·포메믹스 등)의 건강 주장을 과학적으로 분석했습니다. 교배종이 건강하다는 주장의 근거, 실제 위험, 책임 있는 입양 방법을 정리했습니다.",
    body: `<p>"교배종이 순종보다 건강하다"는 말이 있다. 부분적으로 맞지만, 디자이너 견종 산업의 마케팅 문구이기도 하다.</p>

<h2>교배종 건강 주장의 근거와 한계</h2>
<p>혼혈 강세(Hybrid Vigor)는 유전적 다양성이 높아 일부 열성 유전 질환 발현이 낮아지는 현상이다. 그러나 교배종도 부모 양측의 유전 질환을 모두 가질 수 있다.</p>

<h2>디자이너 견종의 실제 문제</h2>
<div class="callout-dog">
<strong>교배종 건강 위험 현실</strong><br>
• 1세대(F1) 교배종: 부모 유전 질환 불예측<br>
• 소형 디자이너 견종 다수: 수두증·저혈당·치아 과밀 위험<br>
• 무허가 브리더가 "건강한 교배종"으로 마케팅하는 경우 많음<br>
• 부모견 유전 검사 여부 확인이 핵심
</div>

<h2>말티푸·포메믹스 등 인기 교배종 주의사항</h2>
<ul>
<li>부모견(말티즈·푸들 등)의 유전 질환 각각 파악</li>
<li>두 품종의 유전 질환이 합쳐질 가능성 이해</li>
<li>소형 믹스: 저혈당·슬개골 탈구·치아 문제 흔함</li>
</ul>

<h2>책임 있는 선택</h2>
<ul>
<li>부모견 유전 검사 결과 요청</li>
<li>윤리적 브리더 찾기 (방문 가능, 부모 공개)</li>
<li>보호소 혼혈견 입양 고려 — 진정한 혼혈 강세 + 구조 동물 지원</li>
</ul>

<h2>마지막으로</h2>
<p>교배종이 나쁜 것이 아니다. 그러나 "교배종 = 자동으로 건강" 공식은 없다. 부모의 건강과 브리더의 책임감이 품종보다 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bellumori, T.P. et al. — Prevalence of inherited disorders in mixed- and purebred dogs. JAVMA 2013",
      "한국동물복지협회 교배종 건강 정보 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-30T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-639",
    slug: "dog-daily-health-check-routine",
    type: "blog",
    category: 5,
    title: "강아지 매일 하는 건강 체크 — 3분으로 이상 신호 조기 발견",
    subtitle: "눈·귀·코·입·발·피부 체크 방법, 기록 습관, 이상 신호 기준",
    metaTitle: "강아지 매일 건강 체크 — 3분 루틴으로 이상 신호 조기 발견 | 펫지기",
    metaDescription: "강아지 매일 3분 건강 체크 방법. 눈·귀·코·입·발·피부 확인 방법, 이상 신호 기준, 체크 기록 습관으로 조기 발견하는 방법을 정리했습니다.",
    body: `<p>강아지의 이상을 가장 먼저 알아채는 것은 보호자다. 매일 3분의 건강 체크 습관이 수의사 방문보다 빠른 조기 발견을 가능하게 한다.</p>

<h2>매일 3분 체크 루틴</h2>
<ul>
<li><strong>눈</strong>: 분비물 색(투명·흰색 정상, 노란·녹색 이상), 충혈, 각막 탁해짐</li>
<li><strong>귀</strong>: 냄새, 분비물, 과도한 긁기</li>
<li><strong>코</strong>: 분비물(맑은 약간은 정상, 두껍거나 색 있으면 이상)</li>
<li><strong>입</strong>: 잇몸 색(분홍 정상, 창백·파랑·노랑 이상), 냄새, 치석</li>
<li><strong>발</strong>: 발바닥 상처·마모, 발가락 사이 붓기</li>
<li><strong>피부·털</strong>: 새로운 혹·탈모·가려움 부위</li>
</ul>

<h2>잇몸 색 응급 기준</h2>
<div class="callout-dog">
<strong>잇몸 색으로 응급 판단</strong><br>
• 분홍색: 정상<br>
• 창백한 분홍~흰색: 빈혈·쇼크 → 응급<br>
• 파란색(청색증): 산소 부족 → 즉시 응급<br>
• 노란색(황달): 간·담즙 문제 → 당일 병원<br>
• 밝은 빨간색: 발열·패혈증 → 즉시 응급
</div>

<h2>기록 습관</h2>
<ul>
<li>스마트폰 메모·앱으로 간단히 기록</li>
<li>새 혹이나 변화 발견 시 사진 찍어 기록</li>
<li>수의사 방문 시 기록 공유 → 훨씬 정확한 진단</li>
</ul>

<h2>언제 바로 병원에 가야 하는가</h2>
<ul>
<li>잇몸이 창백·파랗게 변한 경우</li>
<li>의식·반응이 저하된 경우</li>
<li>24시간 이상 식음 거부</li>
<li>구토·설사 + 혈액 포함</li>
</ul>

<h2>마지막으로</h2>
<p>매일 3분 체크는 검진이 아니라 "오늘 내 강아지가 어제와 다른가"를 확인하는 것이다. 변화를 아는 것이 조기 발견의 시작이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA — At-Home Pet Health Checks",
      "한국수의사회 가정 반려동물 건강 모니터링 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-30T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-640",
    slug: "cat-food-palatability-tips",
    type: "blog",
    category: 2,
    title: "고양이 밥투정 해결 — 사료를 거부하는 고양이 설득하는 방법",
    subtitle: "밥투정 원인 파악, 사료 기호성 높이기, 강제 급여의 위험, 의학적 원인 확인",
    metaTitle: "고양이 밥투정 해결 — 사료 거부 원인과 기호성 높이기 방법 | 펫지기",
    metaDescription: "고양이가 사료를 거부할 때 해결하는 방법. 밥투정 원인 파악, 사료 기호성 높이는 방법, 강제 급여의 위험, 의학적 원인이 숨어있는 경우를 정리했습니다.",
    body: `<p>고양이 밥투정은 보호자를 지치게 한다. 그러나 단순한 까다로움인지, 실제 문제가 있는지 구분하는 것이 먼저다.</p>

<h2>밥투정 원인 파악</h2>
<ul>
<li><strong>단순 선호도</strong>: 익숙한 사료를 선호하는 것은 정상</li>
<li><strong>급격한 사료 전환</strong>: 갑자기 바꾸면 거부 당연</li>
<li><strong>신선도</strong>: 상온 장시간 방치 → 산화</li>
<li><strong>밥그릇</strong>: 플라스틱 냄새, 수염 닿는 불편함</li>
<li><strong>의학적 원인</strong>: 구강 통증·메스꺼움·전신 질환</li>
</ul>

<h2>이런 경우 수의사 먼저</h2>
<div class="callout-cat">
<strong>밥투정이 아닌 질환 신호</strong><br>
• 갑자기 먹던 사료 거부 + 활기 감소<br>
• 48시간 이상 거의 안 먹음<br>
• 체중 급감<br>
• 구토·구역질 동반<br>
▶ 이런 경우 원인 파악 없이 사료 바꾸는 것은 진단 지연
</div>

<h2>기호성 높이는 방법</h2>
<ul>
<li>사료를 살짝 데우기 (40도 이하, 향 강화)</li>
<li>무염 닭고기 육수나 참치 국물 소량 첨가</li>
<li>퓌레형 토퍼 추가 (고양이 스낵 타입)</li>
<li>새 사료는 7~10일에 걸쳐 점진적 전환</li>
<li>수염 닿지 않는 넓은 접시형 그릇으로 교체</li>
</ul>

<h2>강제 급여의 위험</h2>
<p>"굶으면 결국 먹겠지"는 고양이에게 위험하다. 3~5일 이상 음식 섭취 부족 → 지방간 위험. 특히 비만 고양이에서 더 빠르게 진행한다.</p>

<h2>마지막으로</h2>
<p>고양이 밥투정 해결의 핵심은 원인 파악이다. 의학적 원인을 먼저 배제하고, 환경·신선도·그릇 등 단순한 요인을 하나씩 조정하는 것이 답이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국수의영양학회 고양이 기호성 관리 가이드라인",
      "Becvarova, I. & Prochazka, Z. — Feeding behavior of cats. Vet Focus 2015",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-01T09:00:00.000Z",
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
  console.log("블로그 포스트 103차 시딩 완료! (blog-636 ~ blog-640)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
