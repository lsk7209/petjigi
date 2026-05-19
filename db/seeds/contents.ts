import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

const NOW = new Date().toISOString();

const SEED_CONTENTS: NewContent[] = [
  // ── 1. 펫로스 케어 가이드 (카테고리 6, YMYL, published) ────────────────────
  {
    id: "seed-guide-petloss-care",
    slug: "petloss-care-guide",
    type: "guide",
    category: 6,
    title: "펫로스 케어 가이드 — 반려동물을 떠나보낸 후 회복하기",
    metaTitle: "펫로스 케어 가이드 | 반려동물 사별 후 회복 방법 | 펫지기",
    metaDescription:
      "반려동물을 잃은 슬픔(펫로스)을 건강하게 회복하는 단계별 방법과 전문가 조언을 안내합니다.",
    body: `<h2>펫로스란?</h2>
<p>펫로스(Pet Loss)는 반려동물과의 사별 이후 경험하는 깊은 슬픔과 상실감을 말합니다. 이 감정은 가족을 잃은 슬픔과 동일한 심리적 무게를 가지며, 부정·분노·협상·우울·수용의 단계를 거칩니다.</p>

<h2>1단계 — 슬픔을 있는 그대로 인정하기</h2>
<p>슬픔을 억누르거나 "별것 아니다"라고 자책하지 마세요. 반려동물과의 유대는 진실하고 소중한 것입니다. 울어도 되고, 사진을 꺼내봐도 됩니다.</p>
<ul>
  <li>슬픔의 감정을 일기나 편지 형태로 적어보세요.</li>
  <li>반려동물과의 추억이 담긴 앨범을 정리해 보세요.</li>
  <li>가족·친구에게 솔직하게 감정을 나누세요.</li>
</ul>

<h2>2단계 — 일상 리듬 회복하기</h2>
<p>반려동물과 함께하던 일과(산책, 밥 주기 등)가 사라지면 하루 구조가 무너질 수 있습니다. 의식적으로 새 루틴을 만드세요.</p>
<ul>
  <li>규칙적인 수면·식사 시간을 유지하세요.</li>
  <li>가벼운 산책이나 운동을 시작해 보세요.</li>
  <li>반려동물이 즐겼던 공간에 추모 코너를 만들어도 좋습니다.</li>
</ul>

<h2>3단계 — 전문적 도움 구하기</h2>
<p>슬픔이 2주 이상 일상 기능을 방해한다면 전문 상담을 고려하세요.</p>
<ul>
  <li><strong>정신건강복지센터</strong>: 무료 전화 상담 1577-0199</li>
  <li><strong>자살예방상담전화</strong>: 24시간 1393</li>
  <li>펫로스 온라인 커뮤니티나 자조 모임 참여</li>
</ul>

<h2>4단계 — 새 반려동물 입양 결정</h2>
<p>충분한 애도 기간 없이 서둘러 새 동물을 입양하면 비교·죄책감이 생길 수 있습니다. 준비가 됐다고 느껴질 때, 주변의 압박 없이 스스로 결정하세요.</p>`,
    disclaimer:
      "본 콘텐츠는 정보 제공 및 슬픔 회복 지원 목적이며, 전문 심리상담을 대체하지 않습니다. 펫로스로 일상이 어렵다면 전문 심리상담사 또는 정신건강복지센터(1577-0199)의 도움을 받으세요.",
    sources: [
      "American Veterinary Medical Association — Pet Loss Support (2023)",
      "한국 정신건강복지센터 슬픔 상담 가이드라인 (2022)",
      "Kübler-Ross E. On Death and Dying (1969) — 슬픔 5단계 모델",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-01T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 2. 강아지 입양 체크리스트 (카테고리 1, published) ──────────────────────
  {
    id: "seed-guide-dog-adoption-checklist",
    slug: "dog-adoption-checklist",
    type: "guide",
    category: 1,
    title: "강아지 입양 전 체크리스트 — 준비부터 동물등록까지",
    metaTitle: "강아지 입양 체크리스트 | 준비·비용·동물등록 | 펫지기",
    metaDescription:
      "강아지를 처음 입양하기 전 확인해야 할 14가지 체크리스트. 생활 환경, 초기 비용, 동물등록 방법까지 단계별 안내.",
    body: `<h2>입양 전 자가 점검 (7가지)</h2>
<ol>
  <li><strong>주거 환경</strong>: 아파트 규약상 반려동물 허용 여부 확인</li>
  <li><strong>시간 투자</strong>: 하루 최소 2시간 이상 케어 가능 여부</li>
  <li><strong>가족 동의</strong>: 동거인 전원의 알레르기·동의 여부</li>
  <li><strong>재정 계획</strong>: 월 평균 사료·병원비 약 10~20만 원 예산</li>
  <li><strong>장기 계획</strong>: 15년 이상의 생애주기 책임 의지</li>
  <li><strong>여행 대처</strong>: 출장·여행 시 돌봄 계획 수립</li>
  <li><strong>품종 선택</strong>: 생활 패턴에 맞는 에너지 레벨 확인</li>
</ol>

<h2>입양 직후 준비물 (7가지)</h2>
<ul>
  <li>사료 및 물그릇 (스테인리스 권장)</li>
  <li>켄넬 또는 이동장</li>
  <li>배변 패드 또는 야외 배변 훈련 용품</li>
  <li>목줄·하네스·리드줄</li>
  <li>기초 장난감 (씹기 장난감 포함)</li>
  <li>동물병원 예약 (첫 방문은 1주일 이내)</li>
  <li>동물등록 예약</li>
</ul>

<h2>동물등록 필수 안내</h2>
<p>2개월령 이상 개는 <strong>동물보호법</strong>에 따라 의무 등록 대상입니다.</p>
<ul>
  <li>등록 방법: 내장형 마이크로칩 삽입 (수의사 시행, 약 1~2만 원)</li>
  <li>등록 기관: 지자체 지정 동물병원 또는 동물보호관리시스템(APMS) 검색</li>
  <li>미등록 시 과태료: 최대 60만 원</li>
</ul>

<h2>첫 동물병원 방문 체크리스트</h2>
<ul>
  <li>건강 기초 검진 (체중·체온·심장음 청진)</li>
  <li>구충제 투여 (내·외부 기생충)</li>
  <li>기초 예방접종 일정 상담 (DHPPL, 코로나, 광견병 등)</li>
  <li>중성화 수술 시기 상담</li>
</ul>`,
    disclaimer: null,
    sources: [
      "농림축산식품부 동물보호법 시행규칙 제9조 (2024)",
      "농림축산식품부 동물보호관리시스템(APMS) apms.go.kr",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-05T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 3. 반려동물 예방접종 일정 (카테고리 3, YMYL, review_queue) ─────────────
  {
    id: "seed-guide-vaccination-schedule",
    slug: "pet-vaccination-schedule",
    type: "guide",
    category: 3,
    title: "반려동물 예방접종 일정 완전 정리 — 강아지·고양이",
    metaTitle: "강아지 고양이 예방접종 일정 | 시기·종류·비용 | 펫지기",
    metaDescription:
      "강아지(DHPPL·광견병)와 고양이(FVRCP·FeLV) 예방접종 시기, 횟수, 비용을 수의학 가이드라인 기반으로 정리했습니다.",
    body: `<h2>강아지 예방접종 일정</h2>
<table>
  <thead>
    <tr><th>접종명</th><th>시기</th><th>추가 접종</th></tr>
  </thead>
  <tbody>
    <tr><td>DHPPL (종합백신)</td><td>6~8주령 시작, 3~4주 간격 3회</td><td>매년 1회</td></tr>
    <tr><td>코로나 장염</td><td>6~8주령 시작, 2~3회</td><td>매년 1회</td></tr>
    <tr><td>켄넬코프 (기관지염)</td><td>8주령 이후 2회</td><td>매년 1회</td></tr>
    <tr><td>광견병</td><td>3개월령 이후 1회</td><td>매년 1회 (법적 의무)</td></tr>
    <tr><td>인플루엔자</td><td>8주령 이후 2회</td><td>매년 1회 (선택)</td></tr>
  </tbody>
</table>

<h2>고양이 예방접종 일정</h2>
<table>
  <thead>
    <tr><th>접종명</th><th>시기</th><th>추가 접종</th></tr>
  </thead>
  <tbody>
    <tr><td>FVRCP (종합백신)</td><td>8~9주령 시작, 3~4주 간격 3회</td><td>매년 또는 3년마다</td></tr>
    <tr><td>FeLV (백혈병)</td><td>8주령 이후 2회</td><td>매년 (외출 고양이)</td></tr>
    <tr><td>광견병</td><td>3개월령 이후</td><td>매년 또는 3년마다</td></tr>
  </tbody>
</table>

<h2>예방접종 전후 주의사항</h2>
<ul>
  <li>접종 당일: 목욕·과격한 운동 금지</li>
  <li>접종 후 20~30분: 병원 내 관찰 (아나필락시스 반응 모니터링)</li>
  <li>이상 반응: 부종·구토·호흡곤란 발생 시 즉시 병원 방문</li>
  <li>체온이 39.5°C 이상이거나 컨디션이 나쁠 때는 접종 연기</li>
</ul>

<h2>예상 비용</h2>
<p>동물병원마다 다르지만 일반적으로 아래 범위입니다 (2025년 기준).</p>
<ul>
  <li>강아지 종합백신 1회: 약 2~4만 원</li>
  <li>광견병 접종: 약 1~2만 원</li>
  <li>고양이 종합백신 1회: 약 2~3만 원</li>
</ul>`,
    disclaimer:
      "본 콘텐츠는 정보 제공 목적으로만 작성되었으며, 의학적 진단·치료를 대체하지 않습니다. 반려동물의 건강 문제는 반드시 수의사와 상담하세요. 접종 일정은 반려동물의 건강 상태·생활 환경에 따라 달라질 수 있습니다.",
    sources: [
      "WSAVA Vaccination Guidelines 2022 (세계소동물수의사회)",
      "농림축산식품부 동물보호법 제13조 광견병 예방접종 의무",
      "대한수의사회 예방접종 권고 지침 (2023)",
    ],
    ymyl: true,
    status: "review_queue",
    publishedAt: null,
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 4. 펫보험 가입 전 확인사항 (카테고리 4, YMYL, review_queue) ────────────
  {
    id: "seed-guide-pet-insurance-checklist",
    slug: "pet-insurance-before-joining",
    type: "guide",
    category: 4,
    title: "펫보험 가입 전 꼭 확인해야 할 7가지",
    metaTitle: "펫보험 가입 전 체크리스트 | 면책·보장범위·비교 | 펫지기",
    metaDescription:
      "펫보험 가입 전 선천성 질환 면책, 보장 한도, 자기부담금 등 놓치기 쉬운 핵심 7가지를 정리했습니다.",
    body: `<h2>1. 선천성·유전성 질환 면책 조항 확인</h2>
<p>많은 펫보험 상품이 선천성·유전성 질환을 보장에서 제외합니다. 품종별 다발 질환(예: 말티즈의 슬개골 탈구, 페르시안의 PKD)이 면책 목록에 포함되는지 반드시 약관을 확인하세요.</p>

<h2>2. 보장 한도와 자기부담금</h2>
<ul>
  <li>연간 보장 한도: 200만~1,000만 원 이상까지 다양</li>
  <li>자기부담금: 10~30% (청구 금액에서 차감)</li>
  <li>1회 청구 최저 금액(면책 금액): 대개 1~3만 원</li>
</ul>

<h2>3. 보장 범위 (입원·통원·수술)</h2>
<p>상품에 따라 입원만 보장하거나, 통원·수술을 별도 특약으로 운용합니다. 실제로 많이 발생하는 통원 진료까지 보장되는지 확인하세요.</p>

<h2>4. 갱신 조건과 보험료 인상률</h2>
<ul>
  <li>1년 갱신형 vs. 장기 확정형 차이 이해</li>
  <li>나이 증가 시 보험료 인상폭 확인 (고령 반려동물은 급격히 상승)</li>
  <li>갱신 거절 조건 (중증 질환 이력 시 갱신 불가 여부)</li>
</ul>

<h2>5. 가입 연령 제한 및 대기 기간</h2>
<ul>
  <li>신규 가입: 대부분 생후 61일~8세 이하</li>
  <li>대기 기간: 가입 후 15~30일은 보장 적용 제외</li>
  <li>기존 질환: 가입 전 진단받은 질병은 보장 제외</li>
</ul>

<h2>6. 청구 절차 편의성</html>
<ul>
  <li>앱 청구 vs. 서류 제출 방식 비교</li>
  <li>지급 소요 시간 (실손보험 방식 vs. 바우처 방식)</li>
  <li>동물병원 직접 청구(실시간 청구) 가능 여부</li>
</ul>

<h2>7. 보험사 지급 안정성</h2>
<p>반려동물보험은 금융감독원 공시 자료를 통해 사업비율·지급여력비율을 확인할 수 있습니다. 장기 상품인 만큼 보험사의 재무 건전성도 고려하세요.</p>

<h2>주요 상품 비교 참고처</h2>
<ul>
  <li>금융감독원 보험다모아: <a href="https://e-insmarket.or.kr" target="_blank" rel="noopener">e-insmarket.or.kr</a></li>
  <li>보험개발원 펫보험 비교공시</li>
</ul>`,
    disclaimer:
      "본 콘텐츠는 보험·법률 정보 제공 목적이며, 개별 상황에 따라 적용이 다를 수 있습니다. 본 사이트는 보험 중개·법률 자문 기관이 아닙니다. 구체적인 가입 결정은 보험 전문가 또는 금융감독원 공시를 참고하세요.",
    sources: [
      "금융감독원 보험다모아 e-insmarket.or.kr (2025)",
      "보험개발원 반려동물보험 비교공시 (2024)",
      "소비자원 반려동물보험 실태조사 보고서 (2023)",
    ],
    ymyl: true,
    status: "review_queue",
    publishedAt: null,
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 5. 강아지 기초 훈련법 (카테고리 5, published) ──────────────────────────
  {
    id: "seed-guide-dog-basic-training",
    slug: "dog-basic-training-guide",
    type: "guide",
    category: 5,
    title: "강아지 기초 훈련법 — 앉아·기다려·이리와 3주 완성",
    metaTitle: "강아지 기초 훈련 | 앉아 기다려 이리와 방법 | 펫지기",
    metaDescription:
      "긍정 강화 원리를 활용해 강아지에게 앉아·기다려·이리와를 3주 안에 가르치는 단계별 훈련 가이드.",
    body: `<h2>긍정 강화(Positive Reinforcement) 원칙</h2>
<p>올바른 행동 직후 보상(간식·칭찬·놀이)을 주어 행동을 강화합니다. 처벌 기반 훈련은 불안·공격성을 유발할 수 있어 현대 행동학에서는 권장하지 않습니다.</p>
<ul>
  <li>보상 타이밍: 행동 후 0.5초 이내가 가장 효과적</li>
  <li>훈련 시간: 1회 5분 이내, 하루 3~5회</li>
  <li>간식 크기: 쌀알 크기 (과체중 방지)</li>
</ul>

<h2>1주차 — 앉아(Sit)</h2>
<ol>
  <li>간식을 손에 쥐고 강아지 코 앞에 가져갑니다.</li>
  <li>천천히 손을 뒤로 이동하면 강아지가 자연스럽게 앉습니다.</li>
  <li>앉는 순간 "앉아"라고 말하고 즉시 간식 제공.</li>
  <li>10회 반복 후 손 동작 없이 언어 명령만으로 유도합니다.</li>
</ol>

<h2>2주차 — 기다려(Stay)</h2>
<ol>
  <li>"앉아" 명령 성공 후 "기다려"와 함께 손바닥을 펼쳐 보입니다.</li>
  <li>처음에는 2~3초만 기다리게 하고 간식 제공.</li>
  <li>매일 1~2초씩 시간을 늘려 1분까지 연장합니다.</li>
  <li>실패 시 이전 단계로 돌아가 성공 경험을 쌓습니다.</li>
</ol>

<h2>3주차 — 이리와(Come)</h2>
<ol>
  <li>리드줄 연결 후 뒤로 물러서며 "이리와"라고 부릅니다.</li>
  <li>강아지가 오면 과하게 칭찬하고 간식 제공.</li>
  <li>성공률 80% 이상이 되면 실외(공원 등)에서도 연습합니다.</li>
  <li>부를 때 절대 혼내지 않기 — "이리와 = 좋은 일이 생긴다" 연상이 핵심.</li>
</ol>

<h2>훈련이 잘 안 될 때 체크리스트</h2>
<ul>
  <li>배고프지 않은 상태인가? (간식 효과 저하)</li>
  <li>훈련 장소가 너무 자극적(소음·다른 개)이지 않은가?</li>
  <li>명령어가 가족마다 다르지 않은가? (통일 필수)</li>
  <li>훈련 시간이 너무 길지 않은가? (집중력 한계 5분)</li>
</ul>`,
    disclaimer: null,
    sources: [
      "Karen Pryor — Don't Shoot the Dog (1984, 긍정 강화 훈련 바이블)",
      "American Kennel Club Basic Training Guide (2024)",
      "대한수의사회 동물행동 클리닉 권고 기준 (2022)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-10T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 6. 고양이 기본 예방접종 스케줄 (카테고리 3, YMYL, published) ─────────────
  {
    id: "seed-guide-cat-vaccination-schedule",
    slug: "cat-vaccination-schedule",
    type: "guide",
    category: 3,
    title: "고양이 예방접종 스케줄 — 기초부터 추가접종까지",
    metaTitle: "고양이 예방접종 스케줄 | 시기·종류·실내외 차이 | 펫지기",
    metaDescription:
      "고양이 필수 예방접종(범백혈구감소증·칼리시바이러스·허피스바이러스)과 추가접종 시기를 수의학 가이드라인 기반으로 정리했습니다. 실내고양이와 외출고양이의 차이도 안내합니다.",
    body: `<h2>고양이에게 예방접종이 필요한 이유</h2>
<p>고양이는 독립적인 동물이지만 바이러스성 질환에는 취약합니다. 특히 범백혈구감소증(고양이 파보바이러스)은 치사율이 높고, 칼리시바이러스·허피스바이러스는 전염성이 강해 다묘 가정에서 순식간에 퍼질 수 있습니다. 규칙적인 예방접종은 고양이의 생명을 지키는 가장 효과적인 방법입니다.</p>

<h2>핵심 3종 백신 (Core Vaccine)</h2>
<p>WSAVA(세계소동물수의사회)는 아래 3종을 모든 고양이에게 필수 접종으로 권고합니다.</p>
<ul>
  <li><strong>범백혈구감소증 (FPV)</strong>: 고양이 파보바이러스로 인한 중증 장염. 새끼 고양이 치사율 최대 90%.</li>
  <li><strong>칼리시바이러스 (FCV)</strong>: 상부 호흡기 감염, 구내염, 관절통 유발. 환경 저항성이 강해 실내 전파 위험.</li>
  <li><strong>허피스바이러스 (FHV-1)</strong>: 코·눈 점막 염증, 만성 결막염 원인. 감염 후 평생 잠복 가능.</li>
</ul>
<p>세 가지는 보통 <strong>3종 혼합백신(FVRCP)</strong>으로 한 번에 접종합니다.</p>

<h2>추가 접종 (Non-Core Vaccine)</h2>
<ul>
  <li><strong>코로나바이러스 (FCoV)</strong>: 다묘 가정 및 외출 고양이에게 권고. 복막염(FIP)으로 진행될 수 있어 위험합니다.</li>
  <li><strong>광견병</strong>: 국내 법정 의무 접종은 아니지만, 외출 고양이나 해외 이동이 예정된 경우 필수. 일부 지자체에서 무료 접종을 지원합니다.</li>
  <li><strong>고양이 백혈병 (FeLV)</strong>: 외출 고양이 또는 다묘 가정에서 강력 권고. 바이러스 감염 시 면역 억제 및 종양 위험.</li>
</ul>

<h2>접종 시기 — 일정표</h2>
<table>
  <thead>
    <tr><th>주령/시기</th><th>접종 항목</th><th>비고</th></tr>
  </thead>
  <tbody>
    <tr><td>8주령</td><td>FVRCP 1차</td><td>첫 접종</td></tr>
    <tr><td>12주령</td><td>FVRCP 2차, FeLV 1차 (해당 시)</td><td>3~4주 간격</td></tr>
    <tr><td>16주령</td><td>FVRCP 3차, FeLV 2차, 광견병 (해당 시)</td><td>기초 접종 완료</td></tr>
    <tr><td>1년 후</td><td>FVRCP 추가, FeLV 추가 (해당 시)</td><td>매년 또는 3년마다</td></tr>
  </tbody>
</table>

<h2>실내고양이 vs 외출고양이 차이</h2>
<ul>
  <li><strong>실내고양이</strong>: FVRCP 3종 핵심 백신은 필수. FeLV·코로나바이러스는 수의사와 상담 후 결정.</li>
  <li><strong>외출고양이</strong>: 핵심 백신 외 FeLV, 광견병, 코로나바이러스 모두 권고. 외부 고양이와의 접촉 위험이 높아 매년 추가 접종 필요.</li>
</ul>

<h2>접종 전후 주의사항</h2>
<ul>
  <li>접종 당일: 목욕·이동 스트레스 최소화</li>
  <li>접종 후 15~20분: 동물병원 내 대기 (아나필락시스 반응 관찰)</li>
  <li>이상 반응: 안면 부종, 구토, 호흡 이상 발생 시 즉시 병원 방문</li>
  <li>발열(39.5°C 이상), 식욕 부진, 기력 저하 상태에서는 접종 연기</li>
</ul>`,
    disclaimer:
      "본 콘텐츠는 정보 제공 목적으로만 작성되었으며, 의학적 진단·치료를 대체하지 않습니다. 반려묘의 접종 일정은 건강 상태·생활 환경·지역 발생 질환에 따라 달라질 수 있으므로, 반드시 수의사와 상담 후 접종 일정을 확인하세요.",
    sources: [
      "WSAVA Vaccination Guidelines for Small Animal Practitioners 2022",
      "대한수의사회 고양이 예방접종 권고 지침 (2023)",
      "농림축산검역본부 동물 전염병 예방 관리 지침 (2024)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-10T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 7. 반려견 슬개골 탈구 (카테고리 3, YMYL, published) ──────────────────────
  {
    id: "seed-guide-dog-patellar-luxation",
    slug: "dog-patellar-luxation",
    type: "guide",
    category: 3,
    title: "반려견 슬개골 탈구 — 증상·단계·치료",
    metaTitle: "반려견 슬개골 탈구 | 증상·1~4등급·치료 방법 | 펫지기",
    metaDescription:
      "소형견에게 흔한 슬개골 탈구의 1~4등급 증상과 물리치료·수술 치료 기준을 수의학 자료 기반으로 정리했습니다.",
    body: `<h2>슬개골 탈구란?</h2>
<p>슬개골(무릎뼈)이 대퇴골 홈(활차구)에서 이탈하는 정형외과 질환입니다. 내측 탈구(MPL)가 소형견에서 압도적으로 많으며, 방치 시 전방십자인대 파열·관절염으로 이어질 수 있습니다.</p>

<h2>고위험 품종</h2>
<p>유전적으로 활차구가 얕게 형성되거나 다리 정렬이 내측으로 치우친 품종에서 발병률이 높습니다.</p>
<ul>
  <li><strong>포메라니안</strong>: 소형·경량 구조로 관절에 부담 집중</li>
  <li><strong>말티즈</strong>: 국내 발병 보고 건수 최상위 품종</li>
  <li><strong>치와와</strong>: 체중 대비 관절 취약, 선천성 비율 높음</li>
  <li>그 외: 토이 푸들, 요크셔 테리어, 비숑 프리제 등</li>
</ul>

<h2>1~4등급 분류</h2>
<table>
  <thead>
    <tr><th>등급</th><th>특징</th><th>자연 복위</th></tr>
  </thead>
  <tbody>
    <tr><td>1등급</td><td>손으로 밀면 탈구되나 놓으면 자연 복위</td><td>자동 복위</td></tr>
    <tr><td>2등급</td><td>굴곡 시 탈구, 다리 펴면 복위. 간헐적 파행</td><td>수동 복위 가능</td></tr>
    <tr><td>3등급</td><td>항상 탈구 상태. 수동으로 복위 가능하나 곧 재탈구</td><td>수동 복위 가능</td></tr>
    <tr><td>4등급</td><td>영구 탈구. 수동 복위 불가, 심각한 보행 장애</td><td>복위 불가</td></tr>
  </tbody>
</table>

<h2>주요 증상</h2>
<ul>
  <li><strong>다리 들어올리기</strong>: 걷다가 갑자기 한쪽 뒷다리를 들고 깽깽이 걸음</li>
  <li><strong>까치발 걷기</strong>: 발 끝으로만 걷는 자세, 무릎 구부림 감소</li>
  <li><strong>관절 소리</strong>: 슬개골 이동 시 '뚝' 또는 '딸깍' 소리</li>
  <li><strong>앉기 거부·계단 회피</strong>: 통증으로 인한 행동 변화</li>
  <li><strong>뒷다리 X자 정렬</strong>: 서 있을 때 뒷발이 안쪽으로 모임</li>
</ul>

<h2>치료 방법</h2>
<h3>보존적 치료 (1~2등급 경계)</h3>
<ul>
  <li>체중 관리: 이상 체중 유지로 관절 부담 경감</li>
  <li>물리치료: 수중 트레드밀·마사지·근력 강화 운동</li>
  <li>보조제: 관절 보조제(글루코사민·콘드로이틴) — 수의사 처방 필요</li>
  <li>미끄럼 방지: 바닥 매트 설치, 계단·소파 점프 제한</li>
</ul>
<h3>수술 치료 (2등급 이상 증상 지속·3~4등급)</h3>
<ul>
  <li><strong>활차구 성형술(Trochleoplasty)</strong>: 활차구를 더 깊게 파는 수술</li>
  <li><strong>경골 조면 전위술(TTO)</strong>: 슬개인대 부착 뼈를 이동해 정렬 교정</li>
  <li><strong>관절낭 봉합술</strong>: 관절낭 긴장도 조정</li>
  <li>수술 비용: 한쪽 기준 약 80~200만 원 (병원·등급·술기에 따라 상이)</li>
</ul>

<h2>예방과 사전 관리</h2>
<ul>
  <li>고위험 품종은 생후 6개월 이내 정기 정형외과 검진 권고</li>
  <li>소파·침대 등 높은 곳에서 무리한 점프 제한</li>
  <li>비만 예방: 슬개골에 가해지는 하중을 체중의 3~4배로 가정</li>
</ul>`,
    disclaimer:
      "본 콘텐츠는 정보 제공 목적으로만 작성되었으며, 의학적 진단·치료를 대체하지 않습니다. 슬개골 탈구 의심 증상이 있다면 반드시 수의사 진료 후 등급 평가를 받으세요. 등급과 치료 방법은 개별 반려동물의 상태에 따라 달라집니다.",
    sources: [
      "Veterinary Surgery — Patellar Luxation in Dogs (2023)",
      "대한수의사회 소동물 정형외과 가이드라인 (2022)",
      "American College of Veterinary Surgeons — Patellar Luxation (2024)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-10T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 8. 사료 성분표 읽는 법 (카테고리 2, published) ──────────────────────────
  {
    id: "seed-guide-dog-food-label-guide",
    slug: "dog-food-label-guide",
    type: "guide",
    category: 2,
    title: "강아지 사료 성분표 읽는 법 — 원재료·영양소 분석",
    metaTitle: "강아지 사료 성분표 읽는 법 | 원재료·AAFCO 기준 | 펫지기",
    metaDescription:
      "강아지 사료 라벨에서 원재료 순서, 조단백·조지방 수치, 피해야 할 인공 첨가물을 쉽게 해석하는 방법을 안내합니다.",
    body: `<h2>사료 성분표를 읽어야 하는 이유</h2>
<p>사료 포장 앞면의 광고 문구보다 성분표(Ingredient List)와 영양 성분표(Guaranteed Analysis)가 사료 품질을 판단하는 핵심 정보입니다. 성분표를 읽을 줄 알면 마케팅에 속지 않고 반려견에게 맞는 사료를 고를 수 있습니다.</p>

<h2>1. 원재료 목록 — 순서가 전부다</h2>
<p>성분표의 원재료는 <strong>함량이 많은 순서</strong>로 표기됩니다. 첫 번째 원재료가 무엇인지 반드시 확인하세요.</p>
<ul>
  <li><strong>좋은 예</strong>: "닭고기(Chicken), 고구마, 완두콩…" — 실제 육류가 1순위</li>
  <li><strong>주의 예</strong>: "옥수수, 닭 부산물 가루, 대두박…" — 곡물·부산물 가루가 상위권</li>
  <li><strong>성분 분리(Splitting) 주의</strong>: "옥수수 가루, 옥수수 전분, 옥수수 글루텐"처럼 같은 원료를 쪼개어 각각 표기하면 전체 비중이 높아도 순위가 뒤로 밀립니다.</li>
</ul>

<h2>2. 영양 성분 보장치 (Guaranteed Analysis) 해석</h2>
<table>
  <thead>
    <tr><th>항목</th><th>의미</th><th>성견 권장 범위 (건식 기준)</th></tr>
  </thead>
  <tbody>
    <tr><td>조단백 (Crude Protein)</td><td>총 단백질 최소 함량</td><td>18% 이상 (활동량에 따라 25%+ 권장)</td></tr>
    <tr><td>조지방 (Crude Fat)</td><td>총 지방 최소 함량</td><td>5~15% (품종·나이·활동량에 따라 조정)</td></tr>
    <tr><td>조섬유 (Crude Fiber)</td><td>식이섬유 최대 함량</td><td>5% 이하 권장</td></tr>
    <tr><td>수분 (Moisture)</td><td>함수율 최대치</td><td>건식 10% 이하, 습식 75~85%</td></tr>
  </tbody>
</table>
<p>수분 함량이 다른 사료를 비교할 때는 <strong>건물 기준(Dry Matter Basis)</strong>으로 환산해야 정확한 비교가 됩니다.</p>

<h2>3. 피해야 할 성분</h2>
<ul>
  <li><strong>인공 방부제 BHA·BHT·에톡시퀸</strong>: 발암 가능성 논란. 천연 방부제(혼합 토코페롤, 로즈마리 추출물)를 선택하세요.</li>
  <li><strong>인공 색소</strong>: Red 40, Yellow 5·6 등. 사료 색은 반려견에게 의미 없으며 알레르기 유발 가능.</li>
  <li><strong>부산물 가루(Meat By-Product Meal) 과다</strong>: 일부 부산물은 단백질원으로 활용 가능하지만, 성분 불명확 제품은 주의.</li>
  <li><strong>고과당 옥수수 시럽·설탕</strong>: 혈당 급등, 비만, 충치 위험.</li>
  <li><strong>정제 소금 과다</strong>: 신장 질환 위험. 건식 사료 나트륨은 0.3% 이하 권장.</li>
</ul>

<h2>4. AAFCO 기준 확인</h2>
<p>미국사료협회(AAFCO)는 반려동물 사료의 영양 최저 기준을 제시하며, 국내 프리미엄 사료 대부분이 이 기준을 준용합니다.</p>
<ul>
  <li>라벨에 <strong>"AAFCO 기준 충족" 또는 "Complete & Balanced"</strong> 문구가 있으면 기초 영양은 보장됩니다.</li>
  <li>"보충식" 또는 "Complementary Food"로 표기된 제품은 단독 급여가 부적합합니다.</li>
  <li>생애 단계 구분: "자견용(Puppy)", "성견용(Adult)", "노령견용(Senior)"이 다르니 현재 반려견 나이에 맞는 제품을 선택하세요.</li>
</ul>

<h2>성분표 체크 요약</h2>
<ol>
  <li>첫 번째 원재료가 실제 육류인가?</li>
  <li>조단백 18% 이상인가?</li>
  <li>BHA·BHT·인공 색소가 없는가?</li>
  <li>AAFCO "Complete & Balanced" 문구가 있는가?</li>
  <li>반려견 생애 단계(자견/성견/노령견)에 맞는가?</li>
</ol>`,
    disclaimer: null,
    sources: [
      "AAFCO Dog Food Nutrient Profiles 2023 (미국사료협회)",
      "농림축산식품부 사료관리법 및 사료 성분표 표기 기준 (2024)",
      "Small Animal Clinical Nutrition 5th Edition — Mark Morris Institute (2010)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-15T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 9. 반려동물 동반 여행 가이드 (카테고리 5, published) ─────────────────────
  {
    id: "seed-guide-pet-friendly-travel-guide",
    slug: "pet-friendly-travel-guide",
    type: "guide",
    category: 5,
    title: "반려동물 동반 여행 — 준비물·주의사항·국내 명소",
    metaTitle: "반려동물 동반 여행 준비 | 준비물·주의사항·명소 | 펫지기",
    metaDescription:
      "반려동물과 함께하는 국내 여행 준비물, 차량 이동 안전 수칙, 동반 가능 숙박·카페·해수욕장 이용 팁을 정리했습니다.",
    body: `<h2>여행 전 필수 준비물</h2>
<p>반려동물과의 여행은 철저한 사전 준비가 절반입니다. 출발 전 아래 항목을 빠짐없이 챙기세요.</p>

<h3>서류·등록 확인</h3>
<ul>
  <li><strong>동물등록증 또는 등록 확인서</strong>: 분실·사고 시 신원 확인에 필수</li>
  <li><strong>건강증명서 (Health Certificate)</strong>: 일부 숙박 시설에서 요구. 동물병원에서 발급 (보통 여행 10일 이내 발급분)</li>
  <li><strong>예방접종 수첩</strong>: 광견병·종합백신 접종 기록</li>
  <li>해외 여행 시: 광견병 항체가 검사서, 마이크로칩 인식 확인 필수</li>
</ul>

<h3>여행 필수 용품</h3>
<ul>
  <li>이동장(켄넬): IATA 규격 이상, 충분한 환기 필요</li>
  <li>평소 먹던 사료·간식 (낯선 음식은 소화 장애 유발)</li>
  <li>물과 물그릇 (현지 물 변화로 설사 유발 가능)</li>
  <li>배변 봉투·패드·청결 시트</li>
  <li>응급 약품: 소독약, 지혈대, 지사제 (수의사 처방품)</li>
  <li>여행지 인근 24시간 동물병원 번호 저장</li>
</ul>

<h2>차량 이동 안전 수칙</h2>
<p>차량 이동 중 반려동물이 자유롭게 돌아다니면 운전자 주의력을 분산시키고 급제동 시 심각한 부상 위험이 있습니다.</p>
<ul>
  <li><strong>이동장 고정</strong>: 뒷좌석 또는 트렁크에 이동장을 시트 벨트로 고정</li>
  <li><strong>반려동물용 안전벨트</strong>: 하네스 형태로 시트 벨트와 연결하는 제품 활용</li>
  <li><strong>창문 개방 주의</strong>: 머리를 내미는 행동은 비산물 안구 손상, 낙하 위험</li>
  <li><strong>휴게소 정차</strong>: 2시간마다 10~15분 휴식, 수분 보충</li>
  <li><strong>차내 온도</strong>: 여름철 단시간이라도 반려동물을 차 안에 홀로 두지 마세요. 열사병 사망 사고 다수 발생.</li>
</ul>

<h2>국내 반려동물 동반 가능 시설 유형</h2>
<h3>반려동물 동반 카페</h3>
<ul>
  <li>입장 전 예방접종 완료 여부 확인 요청하는 카페가 많습니다</li>
  <li>소형견 전용, 대형견 전용으로 구분된 곳도 있으니 사전 문의 필수</li>
  <li>다른 반려동물과 합사 공간에서는 목줄 유지를 권장합니다</li>
</ul>
<h3>반려동물 동반 숙박</h3>
<ul>
  <li>예약 시 반드시 반려동물 동반 가능 여부·추가 요금·규모(체중 제한) 확인</li>
  <li>체크인 시 반려동물 동반 등록, 일부 시설은 보증금 요구</li>
  <li>객실 내 가구·카펫 손상 방지를 위해 이동장 사용 권장</li>
</ul>
<h3>반려동물 동반 해수욕장·공원</h3>
<ul>
  <li>제주 함덕·협재 해수욕장, 강원 낙산·속초 해수욕장 일부 구역 허용</li>
  <li>국립공원 대부분은 반려동물 출입 제한 구역 존재 (사전 확인 필수)</li>
  <li>목줄 필수, 배변 처리 후 봉투 반드시 지참</li>
</ul>

<h2>여행 중 절대 금지 음식</h2>
<p>사람 음식을 나눠주고 싶은 마음은 이해하지만, 반려동물에게는 치명적인 음식이 있습니다.</p>
<ul>
  <li><strong>포도·건포도</strong>: 신부전 유발, 소량도 치명적</li>
  <li><strong>초콜릿·카카오</strong>: 심장독성 물질(테오브로민), 경련·사망 가능</li>
  <li><strong>양파·마늘·파</strong>: 적혈구 파괴, 용혈성 빈혈 유발</li>
  <li><strong>자일리톨 함유 식품</strong>: 껌·과자 등. 저혈당·간부전 위험</li>
  <li><strong>아보카도</strong>: 퍼신(Persin) 성분이 심근 손상 유발</li>
  <li><strong>알코올·카페인</strong>: 소량으로도 중추신경 억제, 사망 위험</li>
</ul>

<h2>여행 후 확인 사항</h2>
<ul>
  <li>귀·발바닥 확인: 모래·이물질 제거, 물집·상처 점검</li>
  <li>진드기 검사: 풀밭·숲 방문 후 귀 안쪽·발가락 사이 등 확인</li>
  <li>식욕·배변 상태 2~3일 관찰: 이상 시 동물병원 방문</li>
</ul>`,
    disclaimer: null,
    sources: [
      "농림축산식품부 반려동물 이동 및 여행 안전 지침 (2024)",
      "한국소비자원 반려동물 동반 여행 서비스 실태조사 (2023)",
      "ASPCA — People Foods to Avoid Feeding Your Pets (2024)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-15T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },
];

async function seedContents() {
  console.log(`Seeding ${SEED_CONTENTS.length} contents...`);

  for (const content of SEED_CONTENTS) {
    await db
      .insert(contents)
      .values(content)
      .onConflictDoUpdate({
        target: contents.id,
        set: {
          title: content.title,
          metaTitle: content.metaTitle,
          metaDescription: content.metaDescription,
          body: content.body,
          disclaimer: content.disclaimer,
          sources: content.sources,
          ymyl: content.ymyl,
          status: content.status,
          publishedAt: content.publishedAt,
          updatedAt: NOW,
        },
      });
    console.log(`  ✓ ${content.slug}`);
  }

  console.log("Contents seeded.");
}

seedContents().catch(console.error);
