import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 28 — cat1×4 + cat2×3 = 7편 (IDs 258-264)
// Macros: C, A, G, B, F, E, D
// Angles: RA1, RA6, RA8, RA3, RA4, RA7, RA5

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 258 / Cat1 / Macro-C(통계중심) / Lens-L1(역사) / Hook-H2(stat) / Outro-O4 / Angle-RA1
  {
    id: "blog-258",
    slug: "cat-breed-guide-personality-environment",
    type: "blog",
    category: 1,
    title: "고양이 품종별 성격 완전 비교 — 활동량·친화도·독립성으로 고르는 법",
    subtitle: "러시안블루·페르시안·터키시앙고라·뱅갈 등 10종 생활 환경별 적합도 분석",
    metaTitle: "고양이 품종별 성격 비교 완전 가이드 | 펫지기",
    metaDescription: "활동량, 친화도, 독립성, 털 관리 난이도로 비교하는 주요 고양이 품종 10종 — 1인 가구·아이 있는 가정·첫 집사별 추천 포함.",
    body: `<p>국내 고양이 양육 가구는 2023년 기준 약 260만 가구로 2018년 대비 40% 증가했다(농림축산식품부). 고양이를 처음 입양하는 집사 중 절반 이상이 "외모만 보고 골랐다가 성격이 맞지 않아 당황했다"고 답한다. 품종마다 활동량, 친화도, 독립성, 털 관리 요구도가 크게 다르다. 이 글에서는 주요 10종을 4가지 기준으로 비교한다.</p>

<div class="callout-cat">
<strong>품종 특성은 경향일 뿐</strong><br>
같은 품종이어도 개체별 성격 차이가 크다. 브리더나 보호소에서 실제로 상호작용해보는 것이 품종 통계보다 더 중요하다.
</div>

<h2>비교 기준 4가지</h2>
<ul>
<li><strong>활동량</strong>: 하루 얼마나 놀이 상호작용이 필요한가 (높음/중간/낮음)</li>
<li><strong>친화도</strong>: 사람·어린이·다른 동물과 어울리는 정도</li>
<li><strong>독립성</strong>: 혼자 있는 시간을 잘 견디는가</li>
<li><strong>털 관리</strong>: 빗질·미용 빈도와 난이도</li>
</ul>

<div class="key-summary">
<strong>📊 주요 품종 10종 비교</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.875rem;">
<thead><tr style="background:var(--cat-1-soft,#f4e1d6);">
<th style="padding:7px;border:1px solid var(--brand-border);">품종</th>
<th style="padding:7px;border:1px solid var(--brand-border);">활동량</th>
<th style="padding:7px;border:1px solid var(--brand-border);">친화도</th>
<th style="padding:7px;border:1px solid var(--brand-border);">독립성</th>
<th style="padding:7px;border:1px solid var(--brand-border);">털 관리</th>
</tr></thead>
<tbody>
<tr><td style="padding:7px;border:1px solid var(--brand-border);">뱅갈</td><td style="padding:7px;border:1px solid var(--brand-border);">★★★</td><td style="padding:7px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:7px;border:1px solid var(--brand-border);">★☆☆</td><td style="padding:7px;border:1px solid var(--brand-border);">쉬움</td></tr>
<tr><td style="padding:7px;border:1px solid var(--brand-border);">시암</td><td style="padding:7px;border:1px solid var(--brand-border);">★★★</td><td style="padding:7px;border:1px solid var(--brand-border);">★★★</td><td style="padding:7px;border:1px solid var(--brand-border);">★☆☆</td><td style="padding:7px;border:1px solid var(--brand-border);">쉬움</td></tr>
<tr><td style="padding:7px;border:1px solid var(--brand-border);">메인쿤</td><td style="padding:7px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:7px;border:1px solid var(--brand-border);">★★★</td><td style="padding:7px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:7px;border:1px solid var(--brand-border);">중간</td></tr>
<tr><td style="padding:7px;border:1px solid var(--brand-border);">러시안블루</td><td style="padding:7px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:7px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:7px;border:1px solid var(--brand-border);">★★★</td><td style="padding:7px;border:1px solid var(--brand-border);">쉬움</td></tr>
<tr><td style="padding:7px;border:1px solid var(--brand-border);">페르시안</td><td style="padding:7px;border:1px solid var(--brand-border);">★☆☆</td><td style="padding:7px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:7px;border:1px solid var(--brand-border);">★★★</td><td style="padding:7px;border:1px solid var(--brand-border);">어려움</td></tr>
<tr><td style="padding:7px;border:1px solid var(--brand-border);">아비시니안</td><td style="padding:7px;border:1px solid var(--brand-border);">★★★</td><td style="padding:7px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:7px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:7px;border:1px solid var(--brand-border);">쉬움</td></tr>
<tr><td style="padding:7px;border:1px solid var(--brand-border);">노르웨이숲</td><td style="padding:7px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:7px;border:1px solid var(--brand-border);">★★★</td><td style="padding:7px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:7px;border:1px solid var(--brand-border);">중간</td></tr>
<tr><td style="padding:7px;border:1px solid var(--brand-border);">브리티시숏헤어</td><td style="padding:7px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:7px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:7px;border:1px solid var(--brand-border);">★★★</td><td style="padding:7px;border:1px solid var(--brand-border);">쉬움</td></tr>
<tr><td style="padding:7px;border:1px solid var(--brand-border);">랙돌</td><td style="padding:7px;border:1px solid var(--brand-border);">★☆☆</td><td style="padding:7px;border:1px solid var(--brand-border);">★★★</td><td style="padding:7px;border:1px solid var(--brand-border);">★★★</td><td style="padding:7px;border:1px solid var(--brand-border);">중간</td></tr>
<tr><td style="padding:7px;border:1px solid var(--brand-border);">코리안숏헤어(코숏)</td><td style="padding:7px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:7px;border:1px solid var(--brand-border);">★★★</td><td style="padding:7px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:7px;border:1px solid var(--brand-border);">쉬움</td></tr>
</tbody></table>
</div>

<h2>생활 상황별 추천</h2>
<ul>
<li><strong>1인 가구·직장인</strong>: 러시안블루, 브리티시숏헤어, 랙돌 — 독립성이 높아 혼자 있는 시간을 잘 견딤</li>
<li><strong>아이 있는 가정</strong>: 메인쿤, 노르웨이숲, 코리안숏헤어 — 친화도 높고 온순</li>
<li><strong>처음 키우는 집사</strong>: 코리안숏헤어, 브리티시숏헤어 — 털 관리가 쉽고 성격이 무난</li>
<li><strong>놀이를 많이 해줄 수 있는 가정</strong>: 뱅갈, 시암, 아비시니안 — 활동량이 높아 충분한 상호작용 필요</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>스코티시 폴드는 왜 없나요?</h3>
<p>스코티시 폴드는 접힌 귀를 만드는 유전자가 연골·관절 이상을 동반한다. 세계고양이협회(WCF)를 포함한 여러 국제 단체에서 번식을 권고하지 않고 있다. 이미 가정에 있는 개체를 돌보는 것과 별개로, 신규 입양을 권장하지 않아 목록에 포함하지 않았다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/cat-breed-selection-guide">고양이 품종 선택 가이드 — 성격과 환경에 맞는 품종 고르는 법</a><br>
<a href="/blog/cat-first-adoption-checklist">고양이 처음 입양 전 준비물 체크리스트</a><br>
<a href="/blog/shelter-cat-adoption-guide">유기묘 입양 완전 가이드</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "농림축산식품부 동물보호 실태조사 2023 — 고양이 양육 가구 현황",
      "TICA(국제고양이협회) 품종별 특성 가이드",
      "대한수의사회 고양이 품종 건강 특성 자료",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-03T16:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 259 / Cat1 / Macro-A / Lens-L4(process) / Hook-H1 / Outro-O2 / Angle-RA6
  {
    id: "blog-259",
    slug: "dog-separation-anxiety-prevention-guide",
    type: "blog",
    category: 1,
    title: "강아지 분리불안 예방 가이드 — 입양 첫 주부터 시작하는 훈련법",
    subtitle: "혼자 있는 시간 늘리는 단계별 방법, 분리불안 신호 조기 발견, 방치와 훈련의 차이",
    metaTitle: "강아지 분리불안 예방 방법 완전 가이드 | 펫지기",
    metaDescription: "강아지 분리불안 예방을 위한 입양 첫 주부터 시작하는 훈련법, 조기 신호 발견, 분리 시간 단계적 늘리는 방법을 정리했습니다.",
    body: `<p>분리불안을 가진 강아지를 혼자 두면 짖음, 파괴, 자해까지 발생할 수 있다. 입양 첫 주부터 올바른 훈련을 시작하면 분리불안 발생 가능성을 크게 낮출 수 있다. 이 글은 예방 중심의 단계별 접근법을 정리한다.</p>

<div class="callout-cat">
<strong>분리불안은 치료보다 예방이 훨씬 쉽다</strong><br>
이미 분리불안이 생겼다면 행동 교정에 수개월이 걸릴 수 있다. 입양 직후 1~2주의 훈련이 이후 1~2년의 노력을 대신한다.
</div>

<h2>분리불안이란 무엇인가</h2>
<p>분리불안은 보호자가 없을 때 극도의 스트레스를 경험하는 상태다. 단순한 외로움이 아니라 불안 장애에 가깝다. 파괴 행동, 짖음, 실내 배변, 자해, 탈출 시도 등이 나타난다. ASPCA에 따르면 반려견의 약 14~40%가 어느 정도의 분리불안을 가진다.</p>

<h2>1단계. 독립적인 공간 만들기 (입양 1~3일)</h2>
<p>강아지가 보호자 없이도 편안하게 있을 수 있는 공간(켄넬, 펜스 공간)을 처음부터 정해준다. 이 공간에서 간식을 먹이고, 장난감을 두어 긍정적 연상을 만든다. 처음에는 보호자가 옆에 있는 상태에서 공간에 익숙해지도록 한다.</p>

<h2>2단계. 혼자 있는 시간 단계별로 늘리기</h2>
<div class="key-summary">
<strong>📋 분리 시간 증가 가이드</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-1-soft,#f4e1d6);">
<th style="padding:8px;border:1px solid var(--brand-border);">주차</th>
<th style="padding:8px;border:1px solid var(--brand-border);">목표 분리 시간</th>
<th style="padding:8px;border:1px solid var(--brand-border);">방법</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">1주차</td><td style="padding:8px;border:1px solid var(--brand-border);">5~10분</td><td style="padding:8px;border:1px solid var(--brand-border);">다른 방에 잠깐 있다 돌아오기</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">2주차</td><td style="padding:8px;border:1px solid var(--brand-border);">30분~1시간</td><td style="padding:8px;border:1px solid var(--brand-border);">외출했다 돌아오기 (반응 무관심)</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">3~4주차</td><td style="padding:8px;border:1px solid var(--brand-border);">2~4시간</td><td style="padding:8px;border:1px solid var(--brand-border);">콩 장난감 제공, 카메라로 모니터링</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">5주차 이후</td><td style="padding:8px;border:1px solid var(--brand-border);">4~6시간</td><td style="padding:8px;border:1px solid var(--brand-border);">성인 기준 최대 분리 시간 도달</td></tr>
</tbody></table>
</div>

<h2>3단계. 출퇴근 루틴을 드라마틱하게 만들지 않기</h2>
<p>떠날 때 작별 인사를 길게 하거나 돌아올 때 과도하게 흥분해서 맞이하면 강아지에게 "보호자 없는 시간 = 비상 상황"이라는 신호가 될 수 있다. 떠날 때와 돌아올 때 모두 무관심하게 처리하는 것이 의외로 중요하다.</p>

<h2>분리불안 조기 신호 발견하기</h2>
<ul>
<li>보호자가 준비를 시작할 때(신발 신는 등) 이미 불안해하는 경우</li>
<li>보호자가 외출 후 30분 이내에 짖음·파괴가 집중되는 경우</li>
<li>보호자가 돌아왔을 때 과도하게 흥분하고 오래 진정이 안 되는 경우</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>강아지를 두 마리 키우면 분리불안이 줄어드나요?</h3>
<p>어느 정도 도움이 될 수 있지만, 두 마리 모두 분리불안이 생기는 경우도 있다. 분리불안 예방 훈련은 반려동물 수와 무관하게 각각 진행하는 것이 원칙이다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-basic-training-guide">강아지 기본 훈련 가이드</a><br>
<a href="/blog/dog-socialization-training">강아지 사회화 훈련 황금기 — 생후 3~14주 완벽 활용법</a><br>
<a href="/blog/dog-adoption-impulse-check-5-questions">강아지 입양 전 꼭 물어봐야 할 현실 질문 5가지</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA — 분리불안 유병률 및 행동 교정 가이드",
      "대한수의사회 반려동물 행동 문제 자료",
      "농림축산검역본부 반려동물 복지 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-03T17:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 260 / Cat1 / Macro-G / Lens-L6(비판) / Hook-H4 / Outro-O1 / Angle-RA8
  {
    id: "blog-260",
    slug: "pet-contract-adoption-guide",
    type: "blog",
    category: 1,
    title: "반려동물 분양·입양 계약서 작성법 — 꼭 포함해야 할 내용과 주의사항",
    subtitle: "브리더·보호소·개인 분양 시 계약서 필수 항목, 사기 예방 체크포인트, 반환 조건",
    metaTitle: "반려동물 분양 입양 계약서 작성 방법 완전 가이드 | 펫지기",
    metaDescription: "반려동물 분양·입양 시 계약서에 반드시 포함해야 할 항목, 분쟁 예방을 위한 체크포인트, 브리더·보호소별 주의사항을 정리했습니다.",
    body: `<p>흔히 반려동물 분양을 사람 간의 신뢰로만 처리하다가 건강 이상, 혈통 허위 고지, 입금 후 연락 두절 등의 피해가 생긴다. 한국소비자원에 따르면 반려동물 분양 관련 피해 상담 건수는 연 2,000건 이상이며, 계약서 없이 진행한 경우 피해 구제가 훨씬 어렵다. 계약서 한 장이 분쟁을 막는 가장 확실한 방법이다.</p>

<div class="callout-cat">
<strong>계약서를 거부하는 판매자는 위험 신호</strong><br>
합법적인 브리더나 보호소는 계약서 작성을 거부하지 않는다. "우리 집 아이가 건강한데 계약서가 왜 필요해요?"라고 하면, 그 자체로 신중하게 검토해야 한다.
</div>

<h2>필수 포함 항목 7가지</h2>
<ol>
<li><strong>분양자·입양자 정보</strong>: 이름, 연락처, 주소 (실명 확인)</li>
<li><strong>동물 정보</strong>: 품종, 생년월일, 성별, 마이크로칩 번호, 외형 특징</li>
<li><strong>건강 상태 고지</strong>: 예방접종 내역, 기존 질환 유무, 검진 날짜</li>
<li><strong>분양가 및 지불 방법</strong>: 금액, 계좌 정보, 입금 확인 방법</li>
<li><strong>반환·교환 조건</strong>: 유전 질환 발견 시 처리 방법, 기간 조건</li>
<li><strong>소유권 이전 시점</strong>: 언제 소유권이 이전되는지 명확히</li>
<li><strong>분쟁 시 해결 방법</strong>: 한국소비자원 조정 또는 법원 관할 명시</li>
</ol>

<div class="key-summary">
<strong>📋 분양 경로별 추가 확인 사항</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-1-soft,#f4e1d6);">
<th style="padding:8px;border:1px solid var(--brand-border);">경로</th>
<th style="padding:8px;border:1px solid var(--brand-border);">추가 확인</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">브리더</td><td style="padding:8px;border:1px solid var(--brand-border);">동물판매업 등록증, 혈통서 진위 확인</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">보호소·입양단체</td><td style="padding:8px;border:1px solid var(--brand-border);">단체 등록 여부, 중성화 조건, 정기 방문 여부</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">개인 분양</td><td style="padding:8px;border:1px solid var(--brand-border);">신분증 확인, 현장 방문, 부모 동물 상태 확인</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">온라인 플랫폼</td><td style="padding:8px;border:1px solid var(--brand-border);">선금 요청 거절, 실물 확인 전 입금 금지</td></tr>
</tbody></table>
</div>

<h2>분양 사기 예방 체크포인트</h2>
<ul>
<li>선금 후 실물 확인이 안 되면 거래 진행하지 않는다</li>
<li>지나치게 저렴한 가격은 건강 문제나 허위 품종의 신호일 수 있다</li>
<li>실제 사진 대신 모델 사진만 보내는 경우 주의</li>
<li>계약서 서명 전 동물 등록증 또는 예방접종 증명서 원본을 확인한다</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>분양 후 질환이 발견됐을 때 환불이 가능한가요?</h3>
<p>계약서에 반환·교환 조건이 명시됐다면 그 조건에 따른다. 없다면 민법상 하자담보 책임(6개월 이내)으로 손해배상을 청구할 수 있다. 단, 증거 확보가 어렵기 때문에 계약서와 진단서를 모두 보관해야 한다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-adoption-vs-purchase">반려동물 분양 vs 입양 — 장단점 완벽 비교</a><br>
<a href="/blog/animal-registration-change-cancel-guide">동물등록 변경·말소 신청 방법</a><br>
<a href="/blog/dog-breed-selection-guide">강아지 품종 선택 가이드</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 정책 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국소비자원 반려동물 분양 피해 상담 현황 2023",
      "동물보호법 제34조 — 동물 판매업 등록 의무",
      "민법 하자담보 책임 규정 (제580조)",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-03T18:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 261 / Cat1 / Macro-B / Lens-L3 / Hook-H1 / Outro-O1 / Angle-RA3
  {
    id: "blog-261",
    slug: "puppy-first-night-home-guide",
    type: "blog",
    category: 1,
    title: "강아지 첫날 밤 — 울음 달래는 법과 보호자가 해야 할 것",
    subtitle: "첫 밤 켄넬 환경 세팅, 울음의 의미, 달래는 방법과 절대 하면 안 되는 것",
    metaTitle: "강아지 첫날 밤 울음 달래는 법 — 처음 집에 온 날 가이드 | 펫지기",
    metaDescription: "강아지가 처음 집에 온 첫날 밤 울음을 달래는 방법, 켄넬 환경 세팅, 해야 할 것과 하면 안 되는 것을 정리했습니다.",
    body: `<p class="aeo-answer" style="border-left:3px solid var(--cat-1,#c97d5b);padding-left:0.75rem;margin-bottom:1rem;">강아지가 첫날 밤 우는 가장 큰 이유는 엄마·형제들과 분리된 낯선 환경에 대한 불안이다. 이때 달래는 방법이 이후 분리불안 형성에 영향을 미칠 수 있다. 울 때마다 안아주면 "울면 안아주는" 패턴이 생기므로, 환경을 안정적으로 만들면서 조금씩 혼자 있는 시간에 익숙해지도록 돕는 것이 핵심이다.</p>

<div class="callout-cat">
<strong>첫날 밤 원칙</strong><br>
• 지나친 반응(울 때마다 달려가기)도, 완전 무시도 좋지 않다<br>
• 따뜻하고 안전한 환경을 만드는 것이 달래기보다 먼저다<br>
• 이미 지쳐있을 강아지에게는 자극보다 조용한 환경이 더 중요하다
</div>

<h2>환경 세팅 — 첫날 밤 켄넬 구성</h2>
<ul>
<li><strong>크기</strong>: 서고 돌아설 수 있는 정도면 충분. 너무 크면 오히려 불안해한다</li>
<li><strong>온도</strong>: 새끼 강아지는 체온 조절이 미숙 — 담요나 핫팩을 수건으로 감싸 켄넬 한쪽에 둔다 (직접 접촉 금지)</li>
<li><strong>심장 박동 소리</strong>: 엄마 심장 소리를 흉내 낸 틱톡 심장 소리 기기 또는 유튜브 음원이 안정에 도움이 된다는 보고가 있다</li>
<li><strong>보호자 냄새</strong>: 입던 옷이나 수건을 켄넬에 넣어주면 안심 효과가 있다</li>
</ul>

<h2>울음의 종류 파악하기</h2>
<ul>
<li><strong>낑낑/끙끙</strong>: 낯선 환경 불안 — 환경 안정화가 우선</li>
<li><strong>짖음</strong>: 더 강한 불안 또는 배변 욕구 — 배변 패드 확인 후 무시하거나 조용히 달랜다</li>
<li><strong>끊임없는 울음 + 구토</strong>: 멀미나 스트레스 과부하 — 물을 소량 제공하고 수의사에게 연락</li>
</ul>

<h2>하면 안 되는 것</h2>
<ul>
<li>울 때마다 안아주기 — "울면 관심을 받는다"는 패턴이 굳어짐</li>
<li>큰 소리로 "그만" 하기 — 더 불안해진다</li>
<li>처벌하기 — 아직 규칙을 학습하지 못한 아이에게 처벌은 신뢰를 무너뜨린다</li>
<li>밤새 켄넬에서 꺼내어 같이 자기 — 첫날부터 습관이 된다</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>며칠이나 울까요?</h3>
<p>대부분의 강아지는 3~7일 내에 새 환경에 적응한다. 그 이상 지속되거나 식욕 저하·무기력이 동반된다면 수의사에게 상담하는 것이 좋다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-first-week-guide">강아지를 처음 집에 데려온 첫 주 가이드</a><br>
<a href="/blog/dog-separation-anxiety-prevention-guide">강아지 분리불안 예방 가이드</a><br>
<a href="/blog/dog-first-adoption-checklist">강아지 처음 입양 준비물 체크리스트</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA — 신규 반려동물 적응 기간 가이드",
      "대한수의사회 반려동물 행동 상담 자료",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-04T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 262 / Cat2 / Macro-F / Lens-L4 / Hook-H3 / Outro-O1 / Angle-RA4
  {
    id: "blog-262",
    slug: "dog-food-transition-method",
    type: "blog",
    category: 2,
    title: "강아지 사료 교체 방법 — 소화 문제 없이 새 사료로 바꾸는 7~10일 가이드",
    subtitle: "단계별 혼합 비율, 교체 시 흔한 실수, 설사·구토 시 대처법",
    metaTitle: "강아지 사료 교체 방법 완전 가이드 — 소화 문제 없이 | 펫지기",
    metaDescription: "강아지 사료를 소화 문제 없이 바꾸는 7~10일 단계별 방법, 교체 시 흔한 실수, 설사·구토 발생 시 대처법을 정리했습니다.",
    body: `<p>새 사료 봉투가 도착했는데 바로 바꾸면 안 된다는 건 알겠는데, 정확히 얼마나 걸려야 하는지 모르겠다는 보호자가 많다. 강아지의 장내 미생물은 사료 변화에 민감해서 갑작스러운 교체는 설사·구토·식욕 저하로 이어질 수 있다. 이 글은 7~10일 사료 전환 방법을 단계별로 정리한다.</p>

<div class="callout-cat">
<strong>교체 속도보다 장 반응이 기준</strong><br>
7일 가이드는 평균값이다. 강아지의 변 상태가 정상이면 빠르게 진행해도 되고, 묽은 변이 나오면 속도를 늦추는 것이 맞다.
</div>

<h2>1단계. 사료 교체 전 준비</h2>
<ul>
<li>새 사료 성분표 확인 — 기존 사료와 단백질원이 크게 다르지 않으면 전환이 수월하다</li>
<li>기존 사료 충분히 남겨두기 — 전환 기간 중 기존 사료가 필요하다</li>
<li>강아지 현재 변 상태를 기준으로 기록 — 교체 중 비교 기준이 된다</li>
</ul>

<h2>2단계. 7~10일 혼합 비율 가이드</h2>
<div class="key-summary">
<strong>📋 사료 혼합 비율 (기존:새)</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-2-soft,#f6e6cd);">
<th style="padding:8px;border:1px solid var(--brand-border);">기간</th>
<th style="padding:8px;border:1px solid var(--brand-border);">기존 사료</th>
<th style="padding:8px;border:1px solid var(--brand-border);">새 사료</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">1~2일</td><td style="padding:8px;border:1px solid var(--brand-border);">75%</td><td style="padding:8px;border:1px solid var(--brand-border);">25%</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">3~4일</td><td style="padding:8px;border:1px solid var(--brand-border);">50%</td><td style="padding:8px;border:1px solid var(--brand-border);">50%</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">5~6일</td><td style="padding:8px;border:1px solid var(--brand-border);">25%</td><td style="padding:8px;border:1px solid var(--brand-border);">75%</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">7일 이후</td><td style="padding:8px;border:1px solid var(--brand-border);">0%</td><td style="padding:8px;border:1px solid var(--brand-border);">100%</td></tr>
</tbody></table>
</div>

<h2>3단계. 장 반응 모니터링</h2>
<p>매 급여 후 변 상태를 확인한다. 정상 변은 형태가 유지되고 표면이 촉촉하다. 묽거나 물 같은 설사가 나오면 새 사료 비율을 전 단계로 되돌리고 2~3일 유지한 뒤 다시 시도한다.</p>

<h2>흔한 실수</h2>
<ul>
<li><strong>간식 변경도 함께하기</strong>: 사료 전환 기간에 새 간식도 함께 바꾸면 원인을 알 수 없게 된다. 한 번에 하나씩</li>
<li><strong>강아지가 잘 먹는다고 빨리 바꾸기</strong>: 잘 먹는다고 장이 이미 적응된 것은 아니다</li>
<li><strong>설사가 나도 계속 진행하기</strong>: 전 단계로 반드시 돌아간다</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>새 사료를 완전히 거부하는 경우 어떻게 하나요?</h3>
<p>새 사료 위에 기존 사료를 조금 얹거나, 치킨 육수를 소량 끼얹어 향을 더하는 방법이 도움이 된다. 3일 이상 거부하면 사료 자체가 맞지 않는 경우일 수 있으니 다른 옵션을 고려한다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-food-storage-guide">강아지 사료 올바른 보관법 — 산화·곰팡이 막는 실전 방법</a><br>
<a href="/blog/dog-allergy-elimination-diet-test">강아지 알레르기 사료 찾는 법 — 식이 제거 테스트 8주 완전 가이드</a><br>
<a href="/blog/dog-daily-calorie-guide">강아지 하루 칼로리 계산법 — 비만 예방의 첫걸음</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "WSAVA(세계소동물수의사협회) 영양 가이드라인 — 사료 전환 권고 기간",
      "대한수의사회 반려동물 소화기 건강 자료",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-04T10:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 263 / Cat2 / Macro-E / Lens-L2 / Hook-H4 / Outro-O2 / Angle-RA7
  {
    id: "blog-263",
    slug: "dog-wet-vs-dry-food-comparison",
    type: "blog",
    category: 2,
    title: "강아지 습식 사료 vs 건식 사료 — 수분·소화율·비용으로 완전 비교",
    subtitle: "혼합 급여 방법, 상황별 유리한 선택, 강아지 나이·건강 상태에 따른 가이드",
    metaTitle: "강아지 습식 사료 vs 건식 사료 비교 완전 가이드 | 펫지기",
    metaDescription: "강아지 습식 사료와 건식 사료의 수분 함량, 소화율, 비용, 치아 건강 영향을 비교하고 혼합 급여 방법과 상황별 선택 기준을 정리했습니다.",
    body: `<p>흔히 "건식 사료가 치아에 좋다"고 알려져 있지만, 실제로 크런치 동작만으로 치태가 충분히 제거되지 않는다는 연구 결과가 있다(Veterinary Dentistry, 2021). 습식 vs 건식 논쟁의 실제 핵심은 치아가 아니라 수분 섭취와 소화율에 있다. 이 글에서는 두 유형을 실질적인 기준으로 비교한다.</p>

<div class="callout-cat">
<strong>어떤 사료든 "내 강아지에게 맞는지"가 가장 중요하다</strong><br>
사료 유형보다 특정 브랜드·제품의 성분 품질, 강아지의 나이·건강 상태, 급여 방법이 더 큰 영향을 미친다.
</div>

<div class="key-summary">
<strong>📊 습식 vs 건식 사료 비교</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-2-soft,#f6e6cd);">
<th style="padding:8px;border:1px solid var(--brand-border);">기준</th>
<th style="padding:8px;border:1px solid var(--brand-border);">습식 사료</th>
<th style="padding:8px;border:1px solid var(--brand-border);">건식 사료</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">수분 함량</td><td style="padding:8px;border:1px solid var(--brand-border);">70~80%</td><td style="padding:8px;border:1px solid var(--brand-border);">8~12%</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">단백질(건물 기준)</td><td style="padding:8px;border:1px solid var(--brand-border);">높은 편</td><td style="padding:8px;border:1px solid var(--brand-border);">제품별 차이 큼</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">소화율</td><td style="padding:8px;border:1px solid var(--brand-border);">높음</td><td style="padding:8px;border:1px solid var(--brand-border);">중간</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">비용 (일반 제품)</td><td style="padding:8px;border:1px solid var(--brand-border);">건식의 2~4배</td><td style="padding:8px;border:1px solid var(--brand-border);">낮음</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">보관</td><td style="padding:8px;border:1px solid var(--brand-border);">개봉 후 냉장 1~2일</td><td style="padding:8px;border:1px solid var(--brand-border);">개봉 후 4~6주</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">치아 관리</td><td style="padding:8px;border:1px solid var(--brand-border);">치태 제거 없음</td><td style="padding:8px;border:1px solid var(--brand-border);">약간의 마찰 효과 (제한적)</td></tr>
</tbody></table>
</div>

<h2>습식 사료가 유리한 경우</h2>
<ul>
<li>수분 섭취가 부족한 강아지 (물을 잘 안 마시는 경우)</li>
<li>신장 건강 관리가 필요한 경우</li>
<li>이빨 발치 후 회복 기간</li>
<li>노령견으로 소화력이 약해진 경우</li>
<li>식욕이 없거나 사료를 거부하는 경우</li>
</ul>

<h2>건식 사료가 유리한 경우</h2>
<ul>
<li>비용 대비 영양 효율을 중시하는 경우</li>
<li>보관 편의가 중요한 경우</li>
<li>치아 마찰 효과(제한적)를 원하는 경우</li>
<li>여러 마리를 키워 대용량 급여가 필요한 경우</li>
</ul>

<h2>혼합 급여 방법</h2>
<p>건식 사료를 기본으로 하고 습식을 토핑으로 소량 올려주는 방식이 가장 흔하다. 이 때 총 칼로리가 초과되지 않도록 건식 사료량을 줄여야 한다. 습식을 30% 추가했다면 건식은 30% 줄이는 방식으로 조정한다.</p>

<h2>자주 묻는 질문</h2>
<h3>습식 사료만 먹이면 치아에 문제가 생기나요?</h3>
<p>치태·치석은 사료 유형보다 칫솔질, 덴탈 껌, 물에 의한 희석 정도에 더 영향을 받는다. 습식 사료만 먹여도 정기적인 칫솔질과 수의사 스케일링으로 치아 건강을 유지할 수 있다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-water-intake-guide">강아지 물 얼마나 마셔야 할까 — 탈수 신호와 수분 관리</a><br>
<a href="/blog/dog-food-transition-method">강아지 사료 교체 방법 — 소화 문제 없이 새 사료로 바꾸는 7~10일 가이드</a><br>
<a href="/blog/dog-daily-calorie-guide">강아지 하루 칼로리 계산법 — 비만 예방의 첫걸음</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Veterinary Dentistry (2021) — 건식 사료와 치태 제거 효과 연구",
      "WSAVA 영양 가이드라인 — 습식·건식 사료 비교",
      "대한수의사회 반려동물 영양 관리 자료",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-04T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 264 / Cat2 / Macro-D / Lens-L5(사례) / Hook-H3(scene) / Outro-O4 / Angle-RA5
  {
    id: "blog-264",
    slug: "cat-snack-selection-guide",
    type: "blog",
    category: 2,
    title: "고양이 간식 잘 고르는 법 — 성분 읽기부터 급여량까지 완전 정리",
    subtitle: "단백질 함량 기준, 첨가물 확인법, 하루 칼로리 10% 원칙, 나이별 주의 간식",
    metaTitle: "고양이 간식 고르는 방법 완전 가이드 — 성분·급여량 | 펫지기",
    metaDescription: "고양이 간식 성분표 읽는 법, 피해야 할 첨가물, 하루 적정 급여량, 나이별 주의해야 할 간식 종류를 정리했습니다.",
    body: `<p>편의점 진열대에서 고양이 얼굴 사진이 크게 붙은 간식을 집어들었다. 성분표를 봤는데 뭐가 뭔지 모르겠다. 많은 집사들이 포장 디자인으로 간식을 고른다. 그러나 간식은 영양 보충 목적이 아니라 보상·훈련·관계 형성 도구이기 때문에, 성분보다 급여 방식이 더 중요한 경우가 많다. 이 글은 간식 선택의 기준을 정리한다.</p>

<div class="callout-cat">
<strong>간식의 기본 원칙</strong><br>
고양이 간식은 하루 총 칼로리의 10% 이내가 원칙이다(WSAVA). 4kg 고양이 기준 하루 허용 간식 칼로리는 약 20~25kcal — 대부분의 간식 한 봉지(30g)가 이미 50~80kcal이다.
</div>

<h2>성분표에서 확인할 것</h2>
<ul>
<li><strong>단백질원의 위치</strong>: 성분표 첫 번째 항목이 동물성 단백질(닭고기, 참치 등)이어야 좋다. 밀가루·옥수수 전분이 앞에 나오면 탄수화물이 주성분이다</li>
<li><strong>수분 함량</strong>: 습식 간식(파우치, 스틱)은 수분 섭취에 도움이 된다</li>
<li><strong>피해야 할 첨가물</strong>: 양파·파 추출물, 포도씨 추출물, 소르빈산칼륨 과다(방부제), 인공 색소</li>
<li><strong>나트륨 함량</strong>: 신장 질환 병력이 있는 고양이는 나트륨이 낮은 제품 선택</li>
</ul>

<h2>간식 유형별 특징</h2>
<div class="key-summary">
<strong>📋 주요 간식 유형 비교</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-2-soft,#f6e6cd);">
<th style="padding:8px;border:1px solid var(--brand-border);">유형</th>
<th style="padding:8px;border:1px solid var(--brand-border);">장점</th>
<th style="padding:8px;border:1px solid var(--brand-border);">주의</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">동결건조 육류</td><td style="padding:8px;border:1px solid var(--brand-border);">단백질 고함량, 첨가물 적음</td><td style="padding:8px;border:1px solid var(--brand-border);">고칼로리, 소량만</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">파우치(습식)</td><td style="padding:8px;border:1px solid var(--brand-border);">수분 공급, 기호성 높음</td><td style="padding:8px;border:1px solid var(--brand-border);">개봉 후 빨리 소비</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">크런치</td><td style="padding:8px;border:1px solid var(--brand-border);">훈련용 소량 급여 편리</td><td style="padding:8px;border:1px solid var(--brand-border);">탄수화물 높은 경우 있음</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">덴탈 간식</td><td style="padding:8px;border:1px solid var(--brand-border);">치태 관리 효과</td><td style="padding:8px;border:1px solid var(--brand-border);">효과에 근거 있는 제품 선택</td></tr>
</tbody></table>
</div>

<h2>나이별 주의 간식</h2>
<ul>
<li><strong>새끼 고양이(6개월 미만)</strong>: 일반 성묘 간식 금지. 소화기 미성숙 — 키튼 전용만</li>
<li><strong>시니어 고양이(7세 이상)</strong>: 나트륨·인 함량 낮은 제품 선택. 신장 기능 고려</li>
<li><strong>비만 고양이</strong>: 저칼로리 간식 선택 또는 양을 절반으로 줄임</li>
<li><strong>신장 질환 고양이</strong>: 반드시 수의사 처방 또는 신장 전용 제품</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>간식을 너무 많이 줬을 때 어떻게 해야 하나요?</h3>
<p>당일 사료 급여량을 간식 칼로리만큼 줄인다. 하루 총 칼로리가 기준 이내라면 단기적으로 큰 문제가 없다. 단, 매일 반복되면 영양 불균형이 생기므로 10% 규칙을 일상적으로 지키는 것이 중요하다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/cat-toxic-foods-list">고양이 먹으면 안 되는 음식 완전 목록 — 독성 원인까지</a><br>
<a href="/blog/cat-obesity-diet-management-guide">고양이 비만 관리 가이드 — 체중 측정부터 다이어트 사료 전환까지</a><br>
<a href="/blog/cat-water-intake-guide">고양이 수분 섭취 늘리는 법</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "WSAVA 영양 가이드라인 — 간식 급여 비율 권고",
      "대한수의사회 반려동물 영양 상담 자료",
      "농림축산검역본부 반려동물 먹이 안전 정보",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-04T12:00:00.000Z",
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
  console.log("블로그 포스트 28차 시딩 완료! (blog-258 ~ blog-264)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
