import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 29 — cat4×3 + cat3×1 + cat6×2 = 6편 (IDs 265-270)
// Macros: A, C, G, B, F, E
// Angles: RA6, RA1, RA8, RA7, RA3, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 265 / Cat4 / Macro-A / Lens-L3 / Hook-H4 / Outro-O2 / Angle-RA6
  {
    id: "blog-265",
    slug: "pet-insurance-coverage-reduced-at-renewal",
    type: "blog",
    category: 4,
    title: "펫보험 갱신 시 보장 범위가 줄어든다? — 조건 변경 유형과 대응법",
    subtitle: "특약 삭제·면책 추가·보장 한도 감소 사례, 갱신 전 반드시 비교해야 할 항목",
    metaTitle: "펫보험 갱신 시 보장 범위 변경 유형과 대응법 | 펫지기",
    metaDescription: "펫보험 갱신 시 특약 삭제, 면책 추가, 보장 한도 감소 등 보장 범위가 줄어드는 경우와 갱신 전 반드시 확인해야 할 항목을 정리했습니다.",
    body: `<p>갱신 안내문이 왔는데 "보험료가 올랐다"는 것만 봤지, 보장 조건 변경 내용은 제대로 읽지 않았다는 보호자가 많다. 흔히 '자동 갱신'이 '동일 조건 갱신'을 의미한다고 생각하지만, 실제로는 다르다. 보험사는 갱신 시 보장 한도·면책 조건·특약 구성을 바꿀 수 있다. 금융감독원에 따르면 갱신 조건 변경 관련 민원이 전체 보험 민원의 상위 유형에 포함된다.</p>

<div class="callout-cat">
<strong>갱신 안내문 받으면 반드시 확인할 것</strong><br>
"갱신 안내" 문서 안에 작은 글씨로 조건 변경 사항이 있다. 보험료 변동만 보지 말고, 전체 보장 표를 이전 계약서와 비교한다.
</div>

<h2>갱신 시 보장이 줄어드는 주요 유형</h2>

<h3>유형 1 — 특약 자동 삭제</h3>
<p>기존에 가입했던 특정 특약(입원비 특약, 수술비 특약 등)이 갱신 시 판매 중단·조건 변경으로 자동 삭제되는 경우가 있다. 특약이 삭제됐다면 새 특약 추가 가입이 필요하지만, 이 시점에서 나이·건강 상태에 따라 추가 가입이 거절될 수 있다.</p>

<h3>유형 2 — 면책 조건 추가</h3>
<p>갱신 기간 중 발생한 특정 질환을 이후 계약에서 면책(보장 제외)으로 처리하는 경우다. 예를 들어 갱신 기간 중 슬개골 수술을 받았다면, 다음 계약에서 슬개골 관련 질환 전체를 면책으로 추가하는 경우가 있다.</p>

<h3>유형 3 — 보장 한도 감소</h3>
<p>연간 보장 한도, 1회 청구 한도 등이 갱신 시 줄어드는 경우다. 보험료가 같거나 올랐더라도 보장 한도가 줄었다면 실질적인 가치 하락이다.</p>

<div class="key-summary">
<strong>📋 갱신 전 비교 체크리스트</strong>
<ul style="margin-top:0.5rem;">
<li>☐ 기존 계약의 특약 목록 vs 갱신 계약의 특약 목록 비교</li>
<li>☐ 연간 보장 한도·1회 청구 한도 변경 여부</li>
<li>☐ 새로 추가된 면책 조건 (특히 최근 진료 질환 관련)</li>
<li>☐ 자기부담금 비율·금액 변경 여부</li>
<li>☐ 보험료 인상 대비 보장 한도 변화 비율</li>
</ul>
</div>

<h2>보장이 줄었을 때 대응 방법</h2>
<ul>
<li><strong>보험사에 이의 제기</strong>: 금융소비자 보호에 관한 법률에 따라 갱신 조건 변경 사유를 서면으로 요청할 수 있다</li>
<li><strong>타 보험사 비교 후 전환</strong>: 단, 기존 질환이 새 계약에서 면책이 될 수 있으므로 신중히 비교</li>
<li><strong>금융감독원 민원 접수</strong>: fine.fss.or.kr → 민원·분쟁 조정 → 보험 분쟁 접수</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>보험사가 갱신 거절 또는 조건 변경을 사전에 알려줘야 하나요?</h3>
<p>금융소비자 보호에 관한 법률에 따라 갱신 30일 전까지 갱신 조건 변경 내용을 서면·전자문서로 통지할 의무가 있다. 통지 없이 조건이 변경됐다면 이의 제기 및 원상회복 요구가 가능하다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-insurance-renewal-rejection-guide">펫보험 갱신 거절 사유 5가지</a><br>
<a href="/blog/pet-insurance-refund-vs-loss-type">펫보험 환급형 vs 소멸형 선택 기준</a><br>
<a href="/blog/pet-insurance-exclusions-guide">펫보험 면책사항 완전 정리</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "금융소비자 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융소비자 보호에 관한 법률 제19조 — 보험 갱신 조건 변경 통지 의무",
      "금융감독원 보험 분쟁 조정 통계 및 주요 사례",
      "보험연구원 반려동물 보험 갱신 현황 분석",
    ]),
    disclaimer: "본 콘텐츠는 보험 정보 제공 목적이며 개별 상품 조건은 반드시 약관을 확인하세요.",
    status: "published",
    publishedAt: "2026-06-04T13:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 266 / Cat4 / Macro-C / Lens-L2 / Hook-H2 / Outro-O4 / Angle-RA1
  {
    id: "blog-266",
    slug: "dog-neuter-insurance-claim",
    type: "blog",
    category: 4,
    title: "강아지·고양이 중성화 수술 비용과 펫보험 보상 여부 — 2024년 기준 정리",
    subtitle: "중성화 수술 평균 비용, 보험 적용 여부, 보험사별 차이, 수술 전 확인할 것",
    metaTitle: "강아지 고양이 중성화 수술 비용과 펫보험 보상 가이드 | 펫지기",
    metaDescription: "강아지·고양이 중성화 수술 평균 비용, 펫보험 보상 여부, 보험사별 적용 기준, 수술 전 보험사 확인 방법을 정리했습니다.",
    body: `<p>2023년 농림축산식품부 동물등록 통계에 따르면 국내 등록 반려견의 약 62%가 중성화 수술을 받은 것으로 나타났다. 고양이는 이 비율이 더 높다. 중성화 수술은 흔한 수술이지만, 비용이 적지 않고 펫보험 적용 여부가 상품마다 다르다. 수술 전에 보험 적용 여부를 확인해두는 것이 중요하다.</p>

<div class="callout-cat">
<strong>중성화 수술은 대부분의 펫보험에서 면책</strong><br>
국내 주요 펫보험 대부분은 선택적(예방 목적) 수술로 분류해 중성화를 면책으로 처리한다. 단, 자궁축농증·고환 종양 등 질환 치료 목적의 중성화는 보상 가능한 경우가 있다.
</div>

<h2>중성화 수술 평균 비용 (2024년 기준)</h2>

<div class="key-summary">
<strong>📊 중성화 수술 비용 범위</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-4-soft,#d9e3ee);">
<th style="padding:8px;border:1px solid var(--brand-border);">구분</th>
<th style="padding:8px;border:1px solid var(--brand-border);">최저</th>
<th style="padding:8px;border:1px solid var(--brand-border);">일반</th>
<th style="padding:8px;border:1px solid var(--brand-border);">고가</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">소형견(수컷)</td><td style="padding:8px;border:1px solid var(--brand-border);">15만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">25~45만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">60만 원↑</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">소형견(암컷)</td><td style="padding:8px;border:1px solid var(--brand-border);">25만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">35~70만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">100만 원↑</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">고양이(수컷)</td><td style="padding:8px;border:1px solid var(--brand-border);">10만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">15~30만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">50만 원↑</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">고양이(암컷)</td><td style="padding:8px;border:1px solid var(--brand-border);">15만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">25~50만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">80만 원↑</td></tr>
</tbody></table>
<p style="font-size:0.85rem;color:var(--brand-text-secondary);margin-top:0.5rem;">※ 마취비·입원비·검사비 포함 기준. 병원·지역·체중에 따라 차이 있음. 출처: 한국소비자원 동물병원 진료비 조사 2023</p>
</div>

<h2>펫보험 보상 여부 — 상황별 정리</h2>
<ul>
<li><strong>예방 목적 중성화</strong>: 대부분 면책 (선택적 수술로 분류)</li>
<li><strong>자궁축농증 치료 목적 적출</strong>: 대부분 보상 가능 (질병 치료)</li>
<li><strong>고환 종양·잠복 고환 치료 목적</strong>: 보상 가능한 경우 있음 (보험사별 확인 필수)</li>
<li><strong>난소 낭종 치료 목적</strong>: 대부분 보상 가능</li>
</ul>

<h2>수술 전 보험사에 확인해야 하는 이유</h2>
<p>같은 수술이라도 보험사마다 보상 기준이 다르다. "자궁축농증 치료를 위한 자궁 적출"과 "예방적 자궁 적출"은 기록 방식에 따라 보상 여부가 달라질 수 있다. 수술 전 보험사 고객센터에 수의사 소견서를 제출하고 사전 확인을 받아두면 분쟁을 예방할 수 있다.</p>

<h2>자주 묻는 질문</h2>
<h3>중성화 비용이 다른 이유가 있나요?</h3>
<p>마취 방법, 복강경 사용 여부, 입원 기간, 사전 혈액검사 포함 여부에 따라 비용이 크게 달라진다. 복강경 수술은 회복이 빠르지만 비용이 30~50% 더 높다. 사전 혈액검사는 마취 안전성을 높이므로 생략하지 않는 것이 권장된다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-neuter-surgery-guide">강아지 중성화 수술 완전 가이드 — 시기·비용·회복까지</a><br>
<a href="/blog/cat-neuter-surgery-guide">고양이 중성화 수술 — 시기·비용·회복까지 한 번에</a><br>
<a href="/blog/pet-insurance-claim-guide">펫보험 보험금 청구 방법</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 의료 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "농림축산식품부 동물등록 통계 2023",
      "한국소비자원 동물병원 진료비 실태조사 2023",
      "금융감독원 금융소비자정보포털 — 펫보험 면책 기준",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 보험 보상 여부는 반드시 해당 보험사에 직접 확인하세요.",
    status: "published",
    publishedAt: "2026-06-04T14:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 267 / Cat4 / Macro-G / Lens-L5 / Hook-H3 / Outro-O1 / Angle-RA8
  {
    id: "blog-267",
    slug: "pet-legal-will-trust-guide",
    type: "blog",
    category: 4,
    title: "반려동물 유언 계획 — 내가 없을 때 아이를 지키는 법적 방법",
    subtitle: "반려동물 위탁 지정, 유언장 작성 주의사항, 신탁 활용법, 가족 동의서 준비",
    metaTitle: "반려동물 유언장 위탁 계획 완전 가이드 | 펫지기",
    metaDescription: "내가 먼저 세상을 떠날 경우 반려동물을 보호하기 위한 유언 계획, 위탁 지정 방법, 신탁 활용, 법적 주의사항을 정리했습니다.",
    body: `<p>오래 아프고 있는데 아이가 걱정됩니다. 내가 먼저 가면 어떻게 될까요 — 이런 질문을 보내오는 보호자가 있다. 법적으로 반려동물은 재산으로 분류되어 직접 유산을 남길 수 없다. 그러나 위탁 계획, 유언장 작성, 신탁 활용으로 아이의 미래를 준비할 수 있다.</p>

<div class="callout-cat">
<strong>가장 먼저 해야 할 것 — 위탁자 지정</strong><br>
법적 절차보다 앞서, 실제로 아이를 맡아줄 수 있는 사람이 있는지 확인하고 동의를 받는 것이 가장 중요하다. 모든 법적 준비는 위탁 동의가 전제되어야 의미가 있다.
</div>

<h2>1. 유언장에 위탁 의사 표시하기</h2>
<p>민법상 유언장에 반려동물을 직접 상속받을 주체로 지정할 수 없다. 그러나 위탁 받을 사람에게 일정 금액의 재산을 남기면서 "그 재산을 반려동물 돌봄에 사용해달라"는 조건을 붙이는 방식이 가능하다. 이를 '부담부 증여' 또는 '부담부 유증'이라고 한다. 법적 구속력이 있으나, 실제 이행 여부를 강제하기 어렵다.</p>

<h2>2. 반려동물 신탁</h2>
<p>일부 선진국(미국, 일본 등)에서는 반려동물 신탁이 법제화됐다. 한국에서는 2024년 현재 공식 제도화되지 않았으나, 민사 신탁(사적 신탁) 형태로 활용이 가능하다. 신탁 기관에 자산을 위탁하면서 "이 자산은 ○○(반려동물) 돌봄 목적으로만 사용하라"는 조건을 붙이는 방식이다. 법무사·변호사 상담이 필요하다.</p>

<div class="key-summary">
<strong>📋 위탁 계획 준비 단계</strong>
<ol style="padding-left:1.2rem;margin-top:0.5rem;">
<li>위탁 동의자 확정 (가족·지인 중 실제로 키울 수 있는 사람)</li>
<li>위탁자에게 동물 정보 전달 (의료 기록, 병원, 특이 사항)</li>
<li>돌봄 비용 지원 방법 결정 (통장 이체, 유언 재산 지정)</li>
<li>유언장 또는 공증 문서 작성 (법무사·공증인 도움)</li>
<li>주기적 업데이트 (위탁자 상황 변화 시 수정)</li>
</ol>
</div>

<h2>3. 가족 동의서·위탁 각서</h2>
<p>법적 구속력은 약하지만, 위탁 받을 사람과 서면으로 동의서를 작성해두면 실질적인 책임감을 높일 수 있다. 동의서에는 돌봄 조건, 지원 금액, 파양 시 대안 등을 명시한다.</p>

<h2>4. 펫케어 계획서 작성</h2>
<p>아이의 정보를 상세히 기록한 문서를 만들어 위탁자에게 미리 전달한다: 담당 동물병원·수의사 연락처, 복용 약물, 알레르기·기피 식품, 성격 특이사항, 일상 루틴. 이 문서가 있으면 위탁 초기 적응 기간이 훨씬 수월하다.</p>

<h2>자주 묻는 질문</h2>
<h3>위탁자가 아이를 파양하면 막을 방법이 있나요?</h3>
<p>법적으로 완전히 막기는 어렵다. 부담부 유증의 경우 조건 불이행 시 유언 집행자가 반환 청구를 할 수 있으나 복잡한 절차가 필요하다. 위탁자를 신중하게 선택하고, 대안 위탁자를 복수로 지정해두는 것이 현실적이다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-will-guardian-guide">반려동물을 위한 유언장 작성 가이드 — 내가 없을 때 아이를 지키는 법</a><br>
<a href="/blog/animal-protection-law-2024">2024년 동물보호법 핵심 정리</a><br>
<a href="/blog/pet-death-admin-checklist">반려동물이 떠난 후 행정 처리</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "민법 제1073조 이하 — 유언 및 부담부 증여 관련 규정",
      "대한법률구조공단 — 반려동물 법적 지위 및 상속 관련 안내",
      "법무부 공증 제도 안내",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 법적 계획은 반드시 전문 법률가와 상담하세요.",
    status: "published",
    publishedAt: "2026-06-04T15:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 268 / Cat3 / Macro-B / Lens-L3 / Hook-H1 / Outro-O1 / Angle-RA7
  {
    id: "blog-268",
    slug: "dog-cataract-eye-cloudy-guide",
    type: "blog",
    category: 3,
    title: "강아지 백내장 — 눈이 하얗게 흐려진다면 알아야 할 것",
    subtitle: "백내장 증상과 노안·핵경화 구별법, 진행 단계별 관리, 수술 기준",
    metaTitle: "강아지 백내장 증상·진행·수술 기준 완전 가이드 | 펫지기",
    metaDescription: "강아지 눈이 하얗게 흐려질 때 백내장·노안·핵경화의 차이, 진행 단계별 관리, 수술이 필요한 기준을 정리했습니다.",
    body: `<p class="aeo-answer" style="border-left:3px solid var(--cat-3,#4f7ba8);padding-left:0.75rem;margin-bottom:1rem;">강아지 눈이 하얗게 흐려지는 원인은 크게 세 가지다: 백내장, 핵경화(핵다짐증), 각막 문제. 이 중 백내장만 실명으로 이어질 수 있으며 수술 치료가 가능하다. 핵경화는 노화에 의한 것으로 시력에 큰 영향을 주지 않는다. 두 가지를 구별하려면 수의사의 검안경 검사가 필요하다.</p>

<div class="callout-cat">
<strong>즉시 수의사에게 가야 하는 신호</strong><br>
• 눈의 흐림이 갑자기 생겼거나 빠르게 진행되는 경우<br>
• 한쪽 눈만 흐려지거나 붉어지는 경우<br>
• 걷다가 물건에 자주 부딪히는 경우<br>
• 눈의 흐림과 함께 눈물·눈곱이 많아진 경우
</div>

<h2>백내장 vs 핵경화 — 눈으로 구별하는 방법</h2>

<div class="key-summary">
<strong>📋 특징 비교</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-3-soft,#dfe9f3);">
<th style="padding:8px;border:1px solid var(--brand-border);">항목</th>
<th style="padding:8px;border:1px solid var(--brand-border);">백내장</th>
<th style="padding:8px;border:1px solid var(--brand-border);">핵경화</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">흐림 색상</td><td style="padding:8px;border:1px solid var(--brand-border);">불투명한 흰색·회색</td><td style="padding:8px;border:1px solid var(--brand-border);">청회색, 빛에 반짝임</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">위치</td><td style="padding:8px;border:1px solid var(--brand-border);">수정체 전체 또는 일부</td><td style="padding:8px;border:1px solid var(--brand-border);">수정체 중심(핵)</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">시력 영향</td><td style="padding:8px;border:1px solid var(--brand-border);">심각, 실명 가능</td><td style="padding:8px;border:1px solid var(--brand-border);">경미, 야간 시력 약간 저하</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">발생 나이</td><td style="padding:8px;border:1px solid var(--brand-border);">어느 나이든 가능</td><td style="padding:8px;border:1px solid var(--brand-border);">통상 6세 이상 노령견</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">치료</td><td style="padding:8px;border:1px solid var(--brand-border);">수술(인공수정체 삽입)</td><td style="padding:8px;border:1px solid var(--brand-border);">치료 불필요</td></tr>
</tbody></table>
</div>

<h2>백내장 진행 4단계</h2>
<ul>
<li><strong>초기</strong>: 수정체 10% 미만 혼탁, 시력 영향 적음</li>
<li><strong>미성숙</strong>: 10~90% 혼탁, 시력 저하 시작</li>
<li><strong>성숙</strong>: 90% 이상 혼탁, 빛 인식만 가능</li>
<li><strong>과숙</strong>: 수정체 단백질 분해 시작, 포도막염 위험 증가</li>
</ul>

<p>수술은 미성숙~성숙 단계에서 가장 예후가 좋다. 과숙 단계로 진행되면 합병증 위험이 높아져 수술 결과가 나빠질 수 있다.</p>

<h2>수술 여부를 결정할 때 고려할 사항</h2>
<ul>
<li>현재 시력 저하 정도와 생활 불편</li>
<li>반대쪽 눈 시력 상태</li>
<li>강아지의 전반적 건강 상태 (마취 감당 가능 여부)</li>
<li>수술 비용: 한쪽 눈 기준 80~150만 원 수준</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>점안약으로 백내장을 늦출 수 있나요?</h3>
<p>일부 점안약(N-아세틸카르노신 등)이 효과가 있다고 주장하지만, 현재 수의학적으로 명확히 입증된 약물 치료는 없다. 수술이 유일하게 효과가 인정된 치료 방법이다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-eye-care-guide">강아지 눈 관리 완전 가이드 — 눈곱·눈물·충혈 원인과 대처법</a><br>
<a href="/blog/senior-dog-health-guide">노령견 건강 관리 — 7세부터 달라지는 돌봄의 기준</a><br>
<a href="/blog/dog-health-checkup">강아지 건강검진 — 나이별 주기와 꼭 챙겨야 할 검사 항목</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    reviewerName: "검수 대기",
    ymyl: true,
    sources: JSON.stringify([
      "대한수의안과학회 강아지 백내장 진료 가이드",
      "ACVO(미국수의안과학회) — 백내장 단계 분류 기준",
      "농림축산검역본부 반려동물 안과 건강 정보",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 수의학적 진단·처방을 대체하지 않습니다. 증상이 있으면 반드시 수의사와 상담하세요.",
    status: "published",
    publishedAt: "2026-06-04T16:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 269 / Cat6 / Macro-F / Lens-L4 / Hook-H3 / Outro-O2 / Angle-RA3
  {
    id: "blog-269",
    slug: "pet-memorial-photo-video-album",
    type: "blog",
    category: 6,
    title: "반려동물 추모 사진·영상 앨범 만들기 — 디지털·실물 각각 방법 정리",
    subtitle: "스마트폰 사진 정리법, 유튜브·구글포토 활용, 실물 포토북 제작 서비스",
    metaTitle: "반려동물 추모 앨범 만들기 — 디지털 실물 가이드 | 펫지기",
    metaDescription: "반려동물 사진·영상으로 추모 앨범을 만드는 방법 — 스마트폰 정리법, 구글포토·YouTube 활용, 실물 포토북 제작 서비스를 정리했습니다.",
    body: `<p>아이가 떠난 뒤 스마트폰 사진첩에 쌓여 있던 수백 장의 사진들이 갑자기 다르게 보이기 시작했다. 어떤 보호자는 그 사진들을 정리하지 못하고 몇 달을 보냈다. 어떤 보호자는 반대로 그 사진을 정리하는 작업 자체가 추모의 시간이 됐다고 했다. 이 글은 추모 앨범을 만드는 방법들을 정리한다.</p>

<div class="callout-cat">
<strong>준비가 됐을 때 시작해도 된다</strong><br>
추모 앨범을 언제 만들어야 한다는 기한은 없다. 아직 사진을 보기 힘들다면 나중으로 미뤄도 된다. 다만, 스마트폰을 교체하거나 클라우드 저장 공간이 초기화되기 전에 백업만 미리 해두는 것은 권장한다.
</div>

<h2>1단계. 사진·영상 백업 먼저</h2>
<ul>
<li><strong>구글 포토</strong>: 고화질 무제한 백업 (구글 원 구독 시). 날짜별·장소별 자동 정리</li>
<li><strong>iCloud</strong>: 아이폰 사용자는 자동 백업이 이미 되고 있을 가능성이 높음</li>
<li><strong>외장 하드·USB</strong>: 클라우드에 의존하지 않는 물리적 백업</li>
</ul>

<h2>2단계. 디지털 추모 앨범 만들기</h2>
<ul>
<li><strong>구글 포토 앨범</strong>: '앨범 만들기' 기능으로 아이 이름 앨범 생성, 원하는 사진만 모음. 공유 링크로 가족과 공유 가능</li>
<li><strong>유튜브 비공개 업로드</strong>: 영상 클립들을 하나로 합쳐 비공개 영상으로 업로드. 링크를 가진 사람만 볼 수 있어 프라이버시 보호</li>
<li><strong>슬라이드쇼 영상</strong>: 구글 포토 '무비 만들기' 또는 iMovie(아이폰) 앱으로 자동 슬라이드쇼 제작. 배경 음악 추가 가능</li>
</ul>

<h2>3단계. 실물 포토북 제작</h2>
<p>디지털 보다 손에 잡히는 물건으로 남기고 싶은 보호자를 위한 옵션이다.</p>

<ul>
<li><strong>국내 포토북 서비스</strong>: 스냅스, 포토모, 포스타 등에서 A5~A4 사이즈 포토북 제작. 1권 기준 2~5만 원</li>
<li><strong>포토 달력</strong>: 12개월 사진을 달력으로 제작. 매달 다른 사진으로 기억</li>
<li><strong>액자 세트</strong>: 좋아하던 사진 3~5장을 액자 세트로 구성</li>
</ul>

<h2>영상 추모를 위한 팁</h2>
<ul>
<li>짧은 영상 클립이 많다면 YouTube Shorts로 모아 비공개 채널 운영</li>
<li>아이 이름으로 유튜브 채널을 개설해 영상을 저장해두는 보호자도 있다</li>
<li>음악은 아이가 좋아했던 소리(간식 소리, 장난감 소리)나 평화로운 음악으로</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>사진이 너무 많아서 어디서 시작해야 할지 모르겠어요</h3>
<p>전체를 한꺼번에 정리하려 하지 않아도 된다. 먼저 10장만 골라보는 것으로 시작한다. "아이를 처음 만난 날", "제일 좋아하던 장난감과 함께", "마지막으로 함께한 날" 같은 테마로 구분하면 선택하기 쉽다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-anniversary-memorial-ideas">반려동물 기일 추모 방법 — 1주기를 의미 있게 보내는 방식들</a><br>
<a href="/blog/pet-memorial-15-ways">반려동물 추모 방법 15가지 — 마음을 담은 기억 방식</a><br>
<a href="/blog/petloss-recovery-guide">펫로스 증후군 극복 가이드</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국애도상담학회 — 추모 의례와 슬픔 처리 방법 자료",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 및 회복 지원 목적이며, 전문 심리상담을 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-06-04T17:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 270 / Cat6 / Macro-E / Lens-L6 / Hook-H4 / Outro-O3 / Angle-RA4
  {
    id: "blog-270",
    slug: "pet-hospice-vet-questions-guide",
    type: "blog",
    category: 6,
    title: "반려동물 마지막 시간, 수의사에게 꼭 물어봐야 할 것들",
    subtitle: "호스피스 단계에서 보호자가 해야 할 준비, 통증 관리 기준, 안락사 결정 전 질문",
    metaTitle: "반려동물 호스피스 마지막 시간 수의사 질문 가이드 | 펫지기",
    metaDescription: "반려동물의 마지막 시간, 수의사에게 꼭 물어봐야 할 통증 관리, 호스피스 결정, 안락사 기준, 보호자 준비 방법을 정리했습니다.",
    body: `<p>흔히 "수의사가 알아서 해줄 거야"라고 생각하고 질문을 망설인다. 하지만 말기 반려동물의 돌봄은 보호자가 적극적으로 정보를 요청해야 더 나은 결정을 할 수 있다. 이 글은 수의사에게 꼭 물어봐야 할 질문들과, 그 답을 들었을 때 보호자가 준비해야 할 것들을 정리한다.</p>

<div class="callout-cat">
<strong>수의사도 보호자가 물어봐 주기를 기다린다</strong><br>
바쁜 진료 환경에서 수의사가 모든 것을 먼저 설명하기 어렵다. 아래 질문들을 메모해서 진료 시간에 하나씩 물어보는 것이 최선이다.
</div>

<h2>통증 관리에 대해 물어볼 것</h2>
<ul>
<li>"지금 아이가 통증이 있는 상태인가요? 어떤 신호를 봐야 하나요?"</li>
<li>"통증 완화를 위해 집에서 할 수 있는 것이 있나요?"</li>
<li>"처방된 약이 효과가 없을 때 어떻게 해야 하나요?"</li>
<li>"통증이 심해지면 입원 처치와 집 돌봄 중 어느 쪽이 더 편안할까요?"</li>
</ul>

<h2>예후와 삶의 질에 대해 물어볼 것</h2>
<ul>
<li>"앞으로 얼마나 좋은 시간이 남아 있을까요? 현실적으로 알고 싶습니다."</li>
<li>"아이가 여전히 즐거움을 느끼는지 어떻게 알 수 있나요?"</li>
<li>"삶의 질이 나쁘다는 신호는 무엇인가요?"</li>
</ul>

<div class="key-summary">
<strong>📋 삶의 질 평가 체크리스트 (HHHHHMM 척도 기반)</strong>
<ul style="margin-top:0.5rem;">
<li>☐ Hurt (통증): 통증이 관리되고 있는가?</li>
<li>☐ Hunger (식욕): 스스로 먹으려 하는가?</li>
<li>☐ Hydration (수분): 물을 마시거나 탈수 증상이 없는가?</li>
<li>☐ Hygiene (위생): 스스로 몸을 정리할 수 있거나 욕창이 없는가?</li>
<li>☐ Happiness (행복): 좋아하던 것에 반응하는가?</li>
<li>☐ Mobility (이동성): 스스로 움직일 수 있는가?</li>
<li>☐ More good days (좋은 날): 좋은 날이 나쁜 날보다 많은가?</li>
</ul>
<p style="font-size:0.85rem;color:var(--brand-text-secondary);margin-top:0.5rem;">5개 이상 '아니오'라면 삶의 질에 대한 수의사 상담이 필요하다.</p>
</div>

<h2>안락사 결정 전 물어볼 것</h2>
<ul>
<li>"지금이 안락사를 고려할 시점인가요, 아니면 아직인가요?"</li>
<li>"안락사 과정이 어떻게 진행되는지 설명해주실 수 있나요?"</li>
<li>"제가 함께 있을 수 있나요?"</li>
<li>"안락사 후 유해 처리 방법에는 어떤 것이 있나요?"</li>
</ul>

<h2>보호자가 준비할 것</h2>
<ul>
<li>마지막 시간을 함께할 장소 결정 (병원 vs 가정 방문 수의사)</li>
<li>가족 모두에게 알리고 함께할 시간 조율</li>
<li>이후 행정 처리(등록 말소, 보험금) 미리 파악</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>수의사에게 "아직 안락사 시점이 아니다"라는 말을 들었지만 불안합니다</h3>
<p>그 불안은 정상이다. 수의사의 판단과 함께 본인이 매일 관찰하는 아이의 상태를 기록해두면 변화를 파악하는 데 도움이 된다. 불안하다면 다른 수의사에게 2차 소견을 구하는 것도 보호자의 권리다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-hospice-care-guide">반려동물 호스피스 케어 가이드 — 마지막 시간을 편안하게</a><br>
<a href="/blog/pet-euthanasia-guide">반려동물 안락사 — 결정부터 이후까지, 알아야 할 모든 것</a><br>
<a href="/blog/pet-last-signs-guide">반려동물의 마지막 징후 — 곁에 있어줘야 할 때를 알아보는 법</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "HHHHHMM Quality of Life Scale (Dr. Alice Villalobos) — 반려동물 삶의 질 평가 척도",
      "대한수의사회 말기 동물 완화 의료 가이드",
      "한국애도상담학회 — 반려동물 호스피스 돌봄 관련 자료",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 수의학적 진단·처방을 대체하지 않습니다. 반드시 담당 수의사와 상담하세요.",
    status: "published",
    publishedAt: "2026-06-04T18:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

];

async function seed() {
  for (const post of BLOG_POSTS) {
    await db
      .insert(contents)
      .values(post)
      .onConflictDoUpdate({
        target: contents.slug,
        set: { ...post, updatedAt: NOW },
      });
    console.log(`✅ ${post.slug}`);
  }
  console.log("블로그 포스트 29차 시딩 완료! (blog-265 ~ blog-270)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
