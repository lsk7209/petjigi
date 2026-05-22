import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

const NOW = new Date().toISOString();

const YMYL_DISCLAIMER =
  "이 글은 일반적인 정보 제공 목적으로 작성되었으며, 수의학적 진단·처방·치료를 대체하지 않습니다. 반려동물의 건강 이상이 의심될 경우 반드시 동물병원에서 수의사의 진료를 받으세요.";

function scheduleDate(index: number): string {
  const start = new Date("2026-05-22T10:00:00");
  const d = new Date(start.getTime() + index * 5 * 60 * 60 * 1000);
  return d.toISOString();
}

const BLOG_POSTS_8: NewContent[] = [
  // ── 71. 강아지 심장 질환 가이드 (cat3, YMYL) ──
  {
    id: "blog-dog-heart-disease-guide",
    slug: "dog-heart-disease-guide",
    type: "blog",
    category: 3,
    title: "강아지 심장 질환 — 초기 신호와 생활 관리 가이드",
    metaTitle: "강아지 심장 질환 증상·관리 | MVD·기침·운동불내성 초기 신호 | 펫지기",
    metaDescription: "강아지 심장 질환(MVD·DCM) 초기 신호와 집에서 할 수 있는 관리법. 기침·호흡 수 증가·운동 불내성 구별, 정기 청진 중요성, 생활 관리 팁.",
    body: `<p>미국수의심장학회(ACVIM) 통계에 따르면 강아지의 약 10%, 소형 노령견의 경우 75% 이상이 어떤 형태의 심장 질환을 가지고 있다. 그러나 심장 질환은 초기에 뚜렷한 증상이 없어 정기 검진에서 우연히 발견되는 경우가 많다.</p>

<h2>강아지 심장 질환 유형</h2>
<ul>
  <li><strong>승모판 질환(MVD, Mitral Valve Disease)</strong>: 소형견에서 가장 흔한 심장 질환. 카발리에 킹 찰스 스패니얼, 닥스훈트, 말티즈, 푸들 등에서 유전적 발생률이 높다.</li>
  <li><strong>확장성 심근병증(DCM, Dilated Cardiomyopathy)</strong>: 대형견에서 주로 발생. 도베르만, 복서, 그레이트 데인 등에서 유전적 위험이 높다.</li>
</ul>

<h2>초기 신호 — 놓치기 쉬운 것들</h2>
<ul>
  <li><strong>수면 중 호흡수 증가</strong>: 건강한 강아지의 안정 시 호흡수는 분당 15~30회다. 수면 중 30회를 초과하면 심폐 문제의 신호일 수 있다. ACVIM은 보호자에게 수면 중 호흡수를 주 1회 측정하도록 권고한다.</li>
  <li><strong>운동 불내성</strong>: 산책 도중 자주 멈추거나 예전보다 일찍 지치는 경우</li>
  <li><strong>밤 기침</strong>: 자고 일어난 직후 또는 흥분 후 반복적인 기침 — 폐부종 초기 신호일 수 있다</li>
  <li><strong>배 팽만</strong>: 복강에 액체(복수)가 차는 경우</li>
</ul>

<h2>청진 — 가장 중요한 정기 검진</h2>
<p>심장 잡음은 청진으로 발견되는 경우가 대부분이다. 소형 노령견은 연 1~2회 정기 청진을 받는 것이 조기 발견에 핵심이다. 잡음이 발견되면 심장 초음파(에코)로 정확한 진단을 받는다.</p>

<h2>집에서 할 수 있는 관리</h2>
<ul>
  <li>수면 중 호흡수를 주기적으로 측정해 기록한다 (앱이나 노트에 날짜와 함께)</li>
  <li>과도한 흥분, 과격한 운동을 피한다</li>
  <li>나트륨 과다 식품(가공식품, 훈제 간식)을 피한다 — 처방식이 필요한 경우 수의사와 상의</li>
  <li>급격한 기후 변화(폭염·혹한) 노출을 최소화한다</li>
</ul>

<h2>심장 질환과 펫보험</h2>
<p>심장 질환은 장기적 치료가 필요한 질환이다. 조기에 발견할수록 관리 비용이 줄어든다. 심장 질환 보장 여부를 <a href="/insurance/compare">펫보험 비교</a>에서 미리 확인해 두자. 강아지 정기 건강검진 항목은 <a href="/blog/dog-health-checkup">강아지 건강검진 가이드</a>에서 확인할 수 있다.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(40),
    authorName: "펫지기 에디터",
    sources: [
      "American College of Veterinary Internal Medicine (ACVIM) — Heart Disease Consensus Guidelines",
      "Merck Veterinary Manual — Heart Disease in Dogs",
      "WSAVA — Cardiac Disease Management",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 72. 고양이 호흡기 문제 가이드 (cat3, YMYL) ──
  {
    id: "blog-cat-respiratory-problems-guide",
    slug: "cat-respiratory-problems-guide",
    type: "blog",
    category: 3,
    title: "고양이 재채기·콧물·호흡 곤란 — 원인과 응급 판단 기준",
    metaTitle: "고양이 재채기·콧물·호흡곤란 원인 | 상부호흡기감염·천식 | 펫지기",
    metaDescription: "고양이 재채기·콧물·거친 호흡 흔한 원인과 집에서 지켜볼 수 있는 경우 vs 즉시 응급 병원 가야 하는 신호. 상부호흡기감염·천식·비용종 구별법.",
    body: `<p>고양이가 재채기를 하거나 콧물을 흘린다. 단순 감기처럼 보이지만 고양이의 호흡기 문제는 원인이 다양하고, 일부는 즉각적인 응급 처치가 필요하다.</p>

<h2>즉시 동물병원(응급)으로 가야 하는 신호</h2>
<p>다음 중 하나라도 해당되면 즉시 응급 동물병원으로 이동한다:</p>
<ul>
  <li>입을 벌리고 숨을 쉬거나 목을 쭉 빼고 호흡 (고양이는 정상적으로 입으로 숨 쉬지 않는다)</li>
  <li>배를 격렬하게 움직이며 호흡하거나 옆구리가 심하게 들썩임</li>
  <li>잇몸·혀가 파랗거나 창백함 (산소 부족)</li>
  <li>앞발을 벌리고 구부린 자세로 움직이지 않음</li>
</ul>

<h2>고양이 상부호흡기감염 (URI)</h2>
<p>사람의 감기와 유사한 바이러스성 감염이다. 헤르페스바이러스(FHV-1)와 칼리시바이러스(FCV)가 가장 흔한 원인으로, WSAVA에 따르면 고양이 상부호흡기감염의 90% 이상을 차지한다.</p>
<ul>
  <li>재채기, 콧물(맑은 색), 눈곱</li>
  <li>발열, 식욕 감소</li>
  <li>헤르페스 감염은 평생 잠복했다가 스트레스 시 재발</li>
</ul>

<h2>고양이 천식 (Feline Asthma)</h2>
<p>고양이 천식은 알러지성 기도 염증으로, 갑작스러운 기침 발작이 특징이다. 배를 대고 납작하게 엎드려 목을 길게 빼고 기침하는 자세가 전형적이다. 진단은 흉부 방사선과 기관지 세척으로 확인하며, 치료 방향은 수의사가 결정한다.</p>

<h2>비용종 (Nasal Polyps)</h2>
<p>콧속이나 중이 내 양성 조직 증식이다. 페르시안, 샴 등에서 상대적으로 흔하며 지속적인 콧물, 코막힘, 코 고는 소리가 특징이다. 진단은 내시경 또는 영상 검사가 필요하다.</p>

<h2>집에서 지켜볼 수 있는 경우</h2>
<p>성묘이고, 식욕·활동성이 유지되며, 콧물이 맑은 색이고 재채기 빈도가 많지 않다면 수분 보충과 주변 환경 청결 유지로 며칠 경과를 관찰할 수 있다. 가습기 사용이 콧물 배출에 도움이 될 수 있다. 단, 3~5일 이상 개선이 없거나 악화되면 동물병원을 방문한다.</p>

<p>고양이 건강 정기검진과 예방접종이 호흡기 감염 예방의 기본이다. 예방접종 관련 정보는 <a href="/guide">펫지기 가이드</a>에서 확인하자.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(41),
    authorName: "펫지기 에디터",
    sources: [
      "WSAVA — Feline Upper Respiratory Tract Disease Guidelines",
      "Cornell Feline Health Center — Respiratory Infections in Cats",
      "Merck Veterinary Manual — Feline Asthma",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 73. 강아지 암 조기 발견 (cat3, YMYL) ──
  {
    id: "blog-dog-cancer-early-detection",
    slug: "dog-cancer-early-detection",
    type: "blog",
    category: 3,
    title: "강아지 암 조기 발견 — 보호자가 알아야 할 10가지 신호",
    metaTitle: "강아지 암 초기 증상 10가지 | 조기 발견·정기 검진 중요성 | 펫지기",
    metaDescription: "강아지 암 조기 발견을 위한 10가지 신호. 혹·체중 감소·출혈·지속 기침·식욕 감소 구별법과 정기 전신 검진 중요성, 노령견 암 발생률 통계.",
    body: `<p>미국수의학회(AVMA) 보고에 따르면 10세 이상 강아지의 약 50%가 암으로 사망한다. 그러나 암은 조기에 발견할수록 치료 선택지가 넓어지고 예후가 개선된다. 보호자가 정기적으로 체크해야 할 신호들을 알아두는 것이 중요하다.</p>

<h2>보호자가 집에서 확인할 수 있는 10가지 신호</h2>
<ol>
  <li><strong>만져지는 혹 또는 종창</strong>: 새로 생긴 혹이나 기존 혹의 변화(커짐, 딱딱해짐, 불규칙한 경계)</li>
  <li><strong>원인 불명의 체중 감소</strong>: 식이 변화 없이 급격히 빠지는 체중</li>
  <li><strong>식욕 감소 또는 삼키기 어려움</strong>: 지속적인 식욕 부진</li>
  <li><strong>비정상적인 출혈 또는 분비물</strong>: 코·입·귀·눈·생식기에서 이유 없는 출혈</li>
  <li><strong>지속적인 기침 또는 호흡 곤란</strong>: 치료에 반응하지 않는 기침</li>
  <li><strong>상처 또는 궤양이 낫지 않는 경우</strong>: 몇 주 이상 치유되지 않는 피부 병변</li>
  <li><strong>악취 (구강·코·귀·항문)</strong>: 갑작스럽게 심해진 악취</li>
  <li><strong>운동 불내성·무기력</strong>: 이유 없이 급격히 줄어든 활동성</li>
  <li><strong>관절 통증 또는 절뚝임</strong>: 특히 대형견의 갑작스러운 절뚝임 — 골육종 가능성</li>
  <li><strong>배뇨·배변 이상</strong>: 혈뇨, 혈변, 배변 자세 이상</li>
</ol>

<h2>월간 홈 체크 루틴</h2>
<p>매월 1회, 강아지를 조용한 시간에 앉혀두고 머리부터 꼬리까지 손으로 천천히 만져본다. 특히 목, 겨드랑이, 사타구니 림프절 위치를 기억해 두고 변화를 확인한다. 새로 생긴 것이 있으면 사진을 찍어 기록해 두고 동물병원 방문 시 보여준다.</p>

<h2>정기 전신 검진의 중요성</h2>
<p>AVMA는 7세 이상 노령견에게 연 2회 전신 검진(혈액검사·소변검사·흉부 방사선 포함)을 권고한다. 영상 검사 없이는 내부 종양을 발견하기 어렵다. 증상이 없어도 정기 검진을 소홀히 하지 않는 것이 핵심이다.</p>

<h2>발견했을 때</h2>
<p>무언가를 발견했다고 해서 바로 최악의 상황을 가정할 필요는 없다. 대부분의 혹은 양성이다. 하지만 수의사의 확인을 통해 악성 여부를 판단하는 것이 전부다. 미루지 않는 것이 가장 중요하다. <a href="/insurance/compare">펫보험</a>으로 암 진단 및 치료 비용에 대비해 두는 것도 현실적인 선택이다.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(42),
    authorName: "펫지기 에디터",
    sources: [
      "American Veterinary Medical Association (AVMA) — Cancer in Dogs",
      "Veterinary Cancer Society — Ten Warning Signs of Cancer",
      "WSAVA — Senior Pet Care and Cancer Screening Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 74. 고양이 구내염 가이드 (cat3, YMYL) ──
  {
    id: "blog-cat-stomatitis-guide",
    slug: "cat-stomatitis-guide",
    type: "blog",
    category: 3,
    title: "고양이 구내염 — 밥 안 먹고 침 흘린다면 확인해야 할 것",
    metaTitle: "고양이 구내염 증상·원인·치료 | 통증·침흘림·식욕감소 | 펫지기",
    metaDescription: "고양이 구내염(FCGS) 원인과 증상. 식욕 감소·침 흘림·그루밍 기피 신호, 발치 치료 선택, 집에서 할 수 있는 구강 관리법.",
    body: `<p>고양이가 갑자기 밥을 잘 안 먹거나 먹다가 멈추거나, 입에서 침을 흘리기 시작했다면 구강 통증을 의심해야 한다. 고양이 구내염(FCGS, Feline Chronic Gingivostomatitis)은 잇몸과 구강 점막에 발생하는 심한 만성 염증으로, 고양이가 경험하는 가장 고통스러운 질환 중 하나로 꼽힌다.</p>

<h2>구내염 주요 증상</h2>
<ul>
  <li>밥을 먹다가 갑자기 멈추거나, 한쪽으로만 씹거나, 음식을 흘리는 행동</li>
  <li>평소보다 침을 많이 흘림 (때로 혈액이 섞인 침)</li>
  <li>입 주변을 자꾸 발로 닦는 행동</li>
  <li>그루밍을 중단하거나 급격히 줄임 (입이 아파서)</li>
  <li>구강에서 심한 악취</li>
  <li>무기력, 체중 감소</li>
</ul>

<h2>원인과 기전</h2>
<p>정확한 원인은 아직 완전히 밝혀지지 않았다. 구강 내 세균·치석에 대한 면역계의 과도한 반응이 주요 메커니즘으로 보인다. FIV, FeLV, 칼리시바이러스 감염이 동반되거나 유발 인자가 되는 경우가 있다. Cornell Feline Health Center에 따르면 전체 고양이의 약 0.7~12%에서 발생한다.</p>

<h2>치료 선택지</h2>
<p>구내염 치료는 수의사의 구강 검사와 치과 방사선 촬영을 기반으로 결정된다. 약물 치료(항생제, 스테로이드, 면역조절제)로 일시적 개선이 가능하지만 재발이 흔하다. 전체 발치 또는 후구치 발치가 증상을 완전히 해소하는 가장 효과적인 방법으로 알려져 있으며, 적극적 발치 후 60~80%의 고양이에서 증상이 크게 개선된다고 보고된다.</p>

<h2>집에서 할 수 있는 구강 관리</h2>
<p>구내염이 없더라도 일상적인 구강 관리는 예방에 중요하다. 고양이가 허용한다면 하루 한 번 부드러운 고양이용 칫솔로 닦아주는 것이 가장 효과적이다. 칫솔질이 어렵다면 덴탈 간식(VOHC 인증)이나 구강 세정 젤이 보조 방법이 될 수 있다.</p>

<p>구내염 치료는 비용이 클 수 있다. <a href="/insurance/compare">펫보험</a>의 치과 치료 보장 여부를 미리 확인해 두자. 고양이 치아 관리 방법은 <a href="/blog/cat-dental-care">고양이 치아 관리 가이드</a>에서 더 자세히 확인할 수 있다.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(43),
    authorName: "펫지기 에디터",
    sources: [
      "Cornell Feline Health Center — Stomatitis in Cats",
      "Journal of Feline Medicine and Surgery — Feline Chronic Gingivostomatitis",
      "WSAVA — Dental Disease Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 75. 강아지 IVDD 가이드 (cat3, YMYL) ──
  {
    id: "blog-dog-ivdd-guide",
    slug: "dog-ivdd-guide",
    type: "blog",
    category: 3,
    title: "강아지 추간판 질환(IVDD) — 갑자기 뒷다리를 못 쓴다면",
    metaTitle: "강아지 IVDD 추간판 질환 | 증상·응급 신호·치료·예방 | 펫지기",
    metaDescription: "강아지 추간판 질환(IVDD) 증상과 즉각 응급이 필요한 신호. 닥스훈트·비글·코기 고위험 견종, 수술 vs 내과 치료 선택 기준, 재활과 예방법.",
    body: `<p>닥스훈트를 키우는 보호자라면 한 번쯤 들어봤을 질환이다. 아침에 멀쩡하던 강아지가 갑자기 뒷다리를 질질 끌거나 계단을 못 오른다. 추간판 질환(IVDD, Intervertebral Disc Disease)은 척추 사이의 디스크가 탈출해 척수를 압박하는 질환이다.</p>

<h2>고위험 견종</h2>
<p>척추가 길고 다리가 짧은 연골이영양증(chondrodystrophic) 견종에서 IVDD 발생률이 높다:</p>
<ul>
  <li>닥스훈트: 가장 높은 발생률</li>
  <li>비글, 페키니즈, 코커 스패니얼, 바셋 하운드</li>
  <li>웰시 코기, 시추, 포메라니안</li>
</ul>

<h2>증상 등급과 응급 판단</h2>
<p>ACVIM은 IVDD 증상을 5등급으로 분류한다:</p>
<ul>
  <li>1등급: 통증만 있고 신경 이상 없음 — 절뚝이거나 등을 굽히는 행동</li>
  <li>2등급: 경미한 보행 이상 (비틀거림)</li>
  <li>3등급: 심한 보행 이상 (혼자 일어나기 어려움)</li>
  <li>4등급: 마비이지만 통증 감각 있음</li>
  <li>5등급: 완전 마비 + 통증 감각 없음 — <strong>즉각 응급 진료 필요</strong></li>
</ul>
<p>3~5등급은 즉시 동물병원 응급 진료가 필요하며, 특히 5등급은 수술 가능 시간이 짧다.</p>

<h2>치료 선택</h2>
<p>1~2등급은 내과적 관리(안정·소염 치료)로 회복을 기대할 수 있다. 3등급 이상이나 내과 치료에 반응하지 않는 경우 외과적 감압 수술을 고려한다. 수술 성공률은 증상 등급과 수술 타이밍에 따라 다르며, 수의사의 개별 평가가 필수다.</p>

<h2>집에서 할 수 있는 예방</h2>
<ul>
  <li>계단, 소파 오르내리기를 제한하고 경사로를 활용한다</li>
  <li>체중 관리 — 과체중은 척추 부담을 가중시킨다</li>
  <li>안아 올릴 때 몸 전체를 받쳐 척추에 무리가 가지 않도록 한다</li>
  <li>닥스훈트 등 고위험 견종은 점프나 낙상을 최대한 예방한다</li>
</ul>

<p>IVDD는 수술 비용이 크고 재활이 필요한 질환이다. <a href="/insurance/compare">펫보험</a>에서 IVDD 보장 여부와 수술 한도를 미리 확인해 두자. 관절 건강 관련 내용은 <a href="/blog/dog-arthritis-management">강아지 관절염 관리</a>도 참고하자.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(44),
    authorName: "펫지기 에디터",
    sources: [
      "American College of Veterinary Internal Medicine (ACVIM) — IVDD Consensus Guidelines",
      "Merck Veterinary Manual — Intervertebral Disc Disease",
      "Cornell University College of Veterinary Medicine — IVDD in Dogs",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 76. 고양이 결막염 가이드 (cat3, YMYL) ──
  {
    id: "blog-cat-conjunctivitis-guide",
    slug: "cat-conjunctivitis-guide",
    type: "blog",
    category: 3,
    title: "고양이 결막염 — 눈이 빨갛고 눈곱이 심하다면",
    metaTitle: "고양이 결막염 원인·증상·치료 | 헤르페스·칼리시·클라미디아 | 펫지기",
    metaDescription: "고양이 결막염 주요 원인(헤르페스·칼리시바이러스·클라미디아)과 증상. 집에서 할 수 있는 눈 청소법, 동물병원 치료가 필요한 기준.",
    body: `<p>고양이 눈이 빨개지거나 한쪽 눈이 자꾸 감기거나 눈곱이 갑자기 많아졌다면 결막염을 의심해 볼 수 있다. 고양이 결막염은 매우 흔하지만, 원인에 따라 치료 방향이 다르기 때문에 집에서 임의로 눈약을 넣는 것은 위험할 수 있다.</p>

<h2>주요 원인</h2>
<ul>
  <li><strong>헤르페스바이러스(FHV-1)</strong>: 가장 흔한 원인. 어린 고양이나 다묘 환경에서 빈번. 스트레스로 재발하며, 각막 병변(각막궤양)을 유발할 수 있다.</li>
  <li><strong>칼리시바이러스(FCV)</strong>: 상부호흡기 감염과 동반. 구강 궤양이 함께 나타나는 경우가 많다.</li>
  <li><strong>클라미디아(Chlamydophila felis)</strong>: 주로 결막만 침범. 어린 고양이에서 더 흔하며, 사람에게 드물게 전염 가능.</li>
  <li><strong>이물질 또는 자극</strong>: 먼지, 연기, 샴푸 등 자극 물질에 의한 일시적 결막 충혈</li>
  <li><strong>알러지</strong>: 계절성 또는 환경 알러지 반응</li>
</ul>

<h2>증상</h2>
<ul>
  <li>눈 충혈 (흰자위가 빨개짐)</li>
  <li>눈물이 과다하거나 눈곱이 많아짐 (색: 맑음~노란색·초록색)</li>
  <li>한쪽 또는 양쪽 눈이 자꾸 감김</li>
  <li>눈을 발로 비비는 행동</li>
</ul>

<h2>집에서 할 수 있는 눈 관리</h2>
<p>눈 주변 눈곱은 청결한 면 거즈나 습한 면봉으로 부드럽게 닦아준다. 눈 안쪽에서 바깥쪽 방향으로 닦는다. 여러 고양이가 있다면 교차 감염 예방을 위해 각각의 도구를 사용한다. 사람용 눈약, 안약은 절대 사용하지 않는다.</p>

<h2>동물병원 진료가 필요한 경우</h2>
<ul>
  <li>눈곱이 노란색·초록색이거나 양이 많은 경우</li>
  <li>눈을 완전히 못 뜨는 경우</li>
  <li>2~3일 이상 개선 없거나 악화되는 경우</li>
  <li>각막이 뿌옇거나 눈에 궤양이 의심되는 경우</li>
</ul>
<p>고양이 눈 건강 관리 및 다른 눈 문제는 <a href="/blog/dog-eye-problems-guide">강아지 눈 문제 가이드</a>와 함께 참고하자. 헤르페스 양성 고양이의 경우 스트레스 관리가 재발 예방에 핵심이다.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(45),
    authorName: "펫지기 에디터",
    sources: [
      "WSAVA — Feline Upper Respiratory Disease Guidelines",
      "Cornell Feline Health Center — Eye Infections in Cats",
      "Merck Veterinary Manual — Conjunctivitis in Cats",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 77. 강아지 알러지성 비염 (cat3, YMYL) ──
  {
    id: "blog-dog-allergic-rhinitis-guide",
    slug: "dog-allergic-rhinitis-guide",
    type: "blog",
    category: 3,
    title: "강아지 재채기·콧물 잦다면 — 알러지 비염 원인과 관리",
    metaTitle: "강아지 알러지 비염 증상·원인·관리 | 콧물·재채기·역재채기 | 펫지기",
    metaDescription: "강아지 잦은 재채기·콧물 원인과 알러지 비염 구별법. 역재채기 정상 여부, 환경 알러지·식이 알러지 관리, 동물병원 진료 기준.",
    body: `<p>강아지가 자꾸 재채기를 하거나 콧물을 흘린다. 사람처럼 알러지 비염인지, 아니면 다른 문제인지 궁금하다. 강아지에게도 알러지성 비염이 있지만, 원인과 증상이 사람과 다소 다르다.</p>

<h2>역재채기 — 먼저 이것을 확인하자</h2>
<p>강아지가 갑자기 콧속으로 공기를 빠르게 들이마시며 거위 소리 같은 기이한 소리를 내는 것은 역재채기(reverse sneezing)다. 실제 재채기와 달리 공기를 안으로 흡입하는 것이 특징이다. 소형견, 단두종에서 흔하며 대부분 수십 초 이내에 자연스럽게 멈추고 건강에 해롭지 않다. 빈도가 갑자기 늘거나 지속 시간이 길어지면 동물병원에서 확인한다.</p>

<h2>알러지 비염 증상</h2>
<ul>
  <li>맑은 콧물 — 노란색·초록색이면 감염 의심</li>
  <li>반복적인 재채기 (특히 특정 계절이나 환경에서)</li>
  <li>코를 바닥에 문지르거나 앞발로 얼굴을 비비는 행동</li>
  <li>눈 충혈, 눈물 흘림 동반 (알러지성인 경우)</li>
</ul>

<h2>환경 알러지 관리</h2>
<p>꽃가루, 집먼지진드기, 곰팡이 포자가 흔한 환경 알러지 유발 물질이다. 실내 공기청정기 사용, 침구류 정기 세탁(고온), 환기 시 꽃가루 농도 확인이 도움이 된다. 항원 피부반응 검사(intradermal test)나 혈청 알러지 검사로 원인 항원을 특정할 수 있다.</p>

<h2>식이 알러지와의 구별</h2>
<p>식이 알러지는 피부 증상(가려움, 발진)과 동반되는 경우가 많다. 비염 증상과 피부 증상이 함께 있다면 식이 알러지 가능성도 고려해 수의사와 상의한다.</p>

<h2>동물병원에서 확인해야 하는 경우</h2>
<ul>
  <li>노란색·초록색 콧물 또는 코에서 피가 나는 경우</li>
  <li>한쪽 콧구멍에서만 분비물이 나오는 경우 (비강 내 종양, 이물질 가능성)</li>
  <li>얼굴 비대칭이 생기거나 코 위 피부가 부어 보이는 경우</li>
  <li>증상이 2주 이상 지속되거나 점점 심해지는 경우</li>
</ul>
<p>강아지 피부 알러지와의 연관성을 확인하려면 <a href="/blog/dog-skin-problems">강아지 피부 문제 가이드</a>를 함께 읽어보자.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(46),
    authorName: "펫지기 에디터",
    sources: [
      "Merck Veterinary Manual — Rhinitis in Dogs",
      "American Kennel Club (AKC) — Dog Allergies and Sneezing",
      "WSAVA — Allergy and Dermatology Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 78. 고양이 변비 가이드 (cat3, YMYL) ──
  {
    id: "blog-cat-constipation-guide",
    slug: "cat-constipation-guide",
    type: "blog",
    category: 3,
    title: "고양이 변비 — 원인·증상·응급 신호·집에서 할 수 있는 것",
    metaTitle: "고양이 변비 원인·증상·치료 | 화장실 자주 가는데 못 봄 | 펫지기",
    metaDescription: "고양이 변비 원인과 증상 구별법. 거대결장증·탈수·헤어볼·스트레스 원인, 즉시 동물병원 가야 하는 신호, 섬유소·수분 보충으로 예방하는 방법.",
    body: `<p>고양이가 화장실을 자주 들락날락하면서 오래 앉아 있는데 배변이 없거나 아주 적다면 변비를 의심해야 한다. 변비는 고양이에서 흔한 문제이지만, 거대결장증으로 발전하거나 소변 막힘(수컷)과 혼동될 수 있어 주의가 필요하다.</p>

<h2>변비 vs 요도 폐색 — 반드시 구별해야 한다</h2>
<p>화장실을 반복해서 가면서 아무것도 못 나오는 경우, 소변이 막힌 것인지 변비인지 먼저 확인해야 한다. 특히 수컷 고양이에서 소변 폐색은 즉각적인 응급 상황이다. 배변과 배뇨 중 어느 것인지를 관찰하거나, 화장실에서 소변 흔적(응고된 모래)이 있는지 확인한다. 불확실하다면 즉시 동물병원으로 가는 것이 안전하다.</p>

<h2>고양이 변비 흔한 원인</h2>
<ul>
  <li><strong>탈수</strong>: 가장 흔한 원인. 건식 사료 위주 식단, 물 섭취 부족</li>
  <li><strong>헤어볼 과다</strong>: 소화관 내 털 축적이 배변을 방해</li>
  <li><strong>스트레스</strong>: 환경 변화, 화장실 청결 불량</li>
  <li><strong>운동 부족</strong>: 실내 비활동적 생활</li>
  <li><strong>거대결장증(megacolon)</strong>: 결장 근육의 만성 이완으로 배변 능력 저하 — 반복되는 변비의 결과물인 경우가 많다</li>
  <li><strong>이물질 삽입</strong>: 털, 뼈 조각 등</li>
</ul>

<h2>집에서 할 수 있는 조치 (경미한 변비)</h2>
<ul>
  <li>수분 섭취 늘리기 — 습식 사료로 전환하거나 혼합 급여</li>
  <li>섬유소 보충 — 정제 사이 헬리움 섬유소(실리움) 수의사 지도 하 소량 추가</li>
  <li>활동량 늘리기 — 하루 15~20분 놀이 시간 확보</li>
  <li>화장실 청결 유지 — 하루 2회 이상 청소</li>
</ul>
<p>단, 집에서 설사약이나 관장을 임의로 시도하면 위험할 수 있다.</p>

<h2>즉시 동물병원 가야 하는 경우</h2>
<ul>
  <li>48시간 이상 배변이 전혀 없는 경우</li>
  <li>구토 동반 변비 — 장폐색 가능성</li>
  <li>배에 딱딱한 덩어리가 만져지는 경우</li>
  <li>극도의 무기력, 식욕 소실</li>
  <li>변비가 반복되는 경우 (거대결장증 진단 필요)</li>
</ul>
<p>수분 섭취 늘리는 방법은 <a href="/blog/cat-water-intake-tips">고양이 물 섭취 늘리는 법</a>을, 헤어볼 관리는 <a href="/blog/cat-grooming-hairball-prevention">고양이 헤어볼 예방 가이드</a>를 참고하자.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(47),
    authorName: "펫지기 에디터",
    sources: [
      "Cornell Feline Health Center — Constipation in Cats",
      "Merck Veterinary Manual — Constipation and Obstipation in Cats",
      "WSAVA — Gastrointestinal Disease Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 79. 강아지 발톱 부러짐 가이드 (cat3, YMYL) ──
  {
    id: "blog-dog-broken-nail-guide",
    slug: "dog-broken-nail-guide",
    type: "blog",
    category: 3,
    title: "강아지 발톱이 부러졌을 때 — 응급 처치와 동물병원 가야 하는 기준",
    metaTitle: "강아지 발톱 부러짐 응급 처치 | 출혈 지혈·감염 예방·병원 기준 | 펫지기",
    metaDescription: "강아지 발톱이 부러지거나 뽑혔을 때 집에서 할 수 있는 응급 처치. 출혈 지혈 방법, 감염 신호, 즉시 동물병원에 가야 하는 경우.",
    body: `<p>산책 중이나 실내에서 강아지가 갑자기 다리를 들고 낑낑거리거나, 바닥에 핏자국이 있다면 발톱 부러짐을 의심할 수 있다. 발톱이 부러지면 매우 아프고 출혈이 심할 수 있어 보호자가 당황하기 쉽다. 상황을 차분하게 파악하고 적절히 대처하는 방법을 알아두자.</p>

<h2>발톱 부러짐의 종류</h2>
<ul>
  <li><strong>발톱 끝 일부 갈라짐</strong>: 통증이 적고 출혈이 없거나 소량인 경우</li>
  <li><strong>발톱 중간에서 부러짐 (혈관 노출)</strong>: 통증이 심하고 출혈이 많음 — 발톱 안쪽에 혈관(퀵)이 포함된 경우</li>
  <li><strong>발톱이 완전히 뽑힌 경우</strong>: 강한 출혈, 극심한 통증 — 동물병원 응급 처치 필요</li>
</ul>

<h2>집에서 할 수 있는 응급 처치</h2>
<p>강아지를 안정시키고 다친 발을 살핀다. 강아지가 통증으로 물 수 있으므로 주의하며 접근한다.</p>

<h3>출혈 지혈</h3>
<ul>
  <li>깨끗한 거즈나 수건으로 부상 부위를 부드럽게 5~10분 압박한다</li>
  <li>지혈 파우더(지혈제)나 전분(콘스타치)을 소량 눌러대면 지혈에 도움이 된다</li>
  <li>혈관이 노출된 경우 지혈 후에도 감염 예방이 필요하다</li>
</ul>

<h3>부러진 발톱 처리</h3>
<ul>
  <li>발톱 끝만 갈라진 경우: 손질 가위로 날카로운 부분을 부드럽게 다듬을 수 있다</li>
  <li>발톱이 반쯤 부러져 매달린 경우: 집에서 완전히 제거하려 하지 않는다 — 잡아당기면 통증이 심해지고 추가 손상이 생긴다. 동물병원에서 처리한다.</li>
</ul>

<h2>동물병원에 가야 하는 경우</h2>
<ul>
  <li>발톱이 완전히 뽑혔거나 뿌리에서 부러진 경우</li>
  <li>10분 이상 지혈을 해도 출혈이 멈추지 않는 경우</li>
  <li>부상 부위에 붉음·부종·분비물 등 감염 신호가 있는 경우</li>
  <li>강아지가 발에 체중을 전혀 못 싣는 경우</li>
</ul>

<h2>감염 신호 모니터링</h2>
<p>응급 처치 후 2~3일은 매일 부상 부위를 확인한다. 발이 붉어지거나 부어오르거나 분비물이 나오면 감염 가능성이 있으므로 동물병원을 방문한다.</p>
<p>발톱 부러짐 예방을 위한 정기적인 발톱 관리는 <a href="/blog/dog-nail-trimming-guide">강아지 발톱 손질 가이드</a>를 참고하자.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(48),
    authorName: "펫지기 에디터",
    sources: [
      "American Kennel Club (AKC) — What to Do If Your Dog Breaks a Nail",
      "Merck Veterinary Manual — Nail and Claw Disorders in Dogs",
      "AVMA — Basic Pet First Aid",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 80. 노령견 건강 관리 (cat3, YMYL) ──
  {
    id: "blog-senior-dog-health-management",
    slug: "senior-dog-health-management",
    type: "blog",
    category: 3,
    title: "노령견 건강 관리 — 7세부터 달라지는 돌봄의 기준",
    metaTitle: "노령견 건강 관리 가이드 | 7세+ 검진·영양·관절·인지 기능 | 펫지기",
    metaDescription: "7세 이상 노령견 건강 관리 핵심. 연 2회 검진 항목, 체중·관절·구강·인지 기능 모니터링 방법, 노령견 사료 선택, 삶의 질 유지 팁.",
    body: `<p>강아지는 사람보다 빠르게 나이 든다. 소형견 기준 7세, 대형견은 5~6세면 노령에 접어든다. 미국동물병원협회(AAHA)는 이 시점부터 건강 관리 전략을 바꿔야 한다고 권고한다. 노령견은 증상을 잘 드러내지 않으므로 더 적극적인 모니터링이 필요하다.</p>

<h2>연 2회 검진이 필수인 이유</h2>
<p>AAHA와 WSAVA는 7세 이상 강아지에게 연 2회 전신 검진을 권고한다. 사람으로 치면 노령견의 6개월은 인간 3~5년에 해당한다. 반년마다 검진을 받아도 많은 질환을 놓칠 수 있다.</p>
<p>검진 항목: 전신 신체검사, 혈액검사(CBC·화학검사), 소변검사, 혈압 측정. 필요 시 흉부 방사선, 복부 초음파, 갑상선 검사 추가.</p>

<h2>집에서 모니터링할 것들</h2>

<h3>체중과 근육량</h3>
<p>월 1회 체중을 측정한다. 식사량 변화 없이 체중이 빠진다면 근감소증, 갑상선 질환, 암, 내장 질환 등의 신호일 수 있다. 갈비뼈를 손으로 눌렀을 때 쉽게 만져지면 정상이지만 도드라지면 저체중이다.</p>

<h3>인지 기능 — CDS 신호</h3>
<p>노령견의 인지 기능 장애(CDS, Cognitive Dysfunction Syndrome)는 개 버전의 치매다. 증상:</p>
<ul>
  <li>밤에 갑자기 짖거나 불안해함</li>
  <li>익숙한 공간에서 방향 감각 혼란</li>
  <li>보호자를 알아보지 못하는 것처럼 행동</li>
  <li>대소변 실수 증가</li>
</ul>
<p>AAHA 통계에 따르면 11~12세 강아지의 28%, 15~16세의 68%에서 CDS 징후가 나타난다.</p>

<h3>관절과 이동성</h3>
<p>아침에 일어나기 힘들어하거나 계단을 주저하면 관절 통증의 초기 신호다. <a href="/blog/dog-arthritis-management">강아지 관절염 관리 가이드</a>에서 환경 개선 방법을 확인하자.</p>

<h2>노령견 사료와 영양</h2>
<p>노령견은 근육 유지를 위해 단백질이 충분해야 하고, 체중 증가 방지를 위해 칼로리를 조절해야 한다. 신장·심장 기능에 이상이 있다면 수의사가 처방식을 권할 수 있다. <a href="/blog/dog-calorie-calculation">강아지 칼로리 계산법</a>과 <a href="/blog/dog-supplements-guide">영양제 가이드</a>도 함께 참고하자.</p>

<h2>삶의 질 유지</h2>
<p>노령견도 적절한 자극과 활동이 필요하다. 산책은 짧고 규칙적으로, 후각 자극 활동(냄새 맡기 산책)이 인지 기능 유지에 도움이 된다고 연구되고 있다. 통증이 있는 노령견을 위해 안락한 침구와 미끄럼 방지 환경을 만들어주는 것이 삶의 질을 크게 높인다.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(49),
    authorName: "펫지기 에디터",
    sources: [
      "American Animal Hospital Association (AAHA) — Senior Care Guidelines",
      "WSAVA — Senior Pet Care Guidelines",
      "Merck Veterinary Manual — Cognitive Dysfunction Syndrome in Dogs",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },
];

async function seed() {
  console.log("블로그 포스트 8차 시딩 시작...");
  for (const post of BLOG_POSTS_8) {
    await db.insert(contents).values(post).onConflictDoNothing();
    console.log(`✅ ${post.slug}`);
  }
  console.log("블로그 포스트 8차 시딩 완료!");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
