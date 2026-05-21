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

  // ── 10. 고양이 입양 가이드 (카테고리 1, published) ──────────────────────────
  {
    id: "seed-guide-cat-adoption-checklist",
    slug: "cat-adoption-checklist",
    type: "guide",
    category: 1,
    title: "고양이 입양 전 체크리스트 — 준비부터 첫 검진까지",
    metaTitle: "고양이 입양 체크리스트 | 준비·비용·공간 구성 | 펫지기",
    metaDescription:
      "고양이를 처음 입양하기 전 확인해야 할 13가지 체크리스트. 공간 구성, 초기 비용, 중성화 수술 시기까지 단계별 안내.",
    body: `<h2>고양이 입양 전 자가 점검</h2>
<ol>
  <li><strong>주거 환경</strong>: 실내 탈출 경로(창문·베란다) 안전망 설치 가능 여부 확인</li>
  <li><strong>알레르기</strong>: 동거인 전원의 고양이 알레르기 확인 (의원에서 피부 반응 검사 권장)</li>
  <li><strong>시간 투자</strong>: 하루 최소 1~2시간 상호작용 및 환경 관리</li>
  <li><strong>재정 계획</strong>: 월 평균 사료·화장실·병원비 약 8~15만 원 예산</li>
  <li><strong>장기 계획</strong>: 15~20년의 생애주기 책임 의지</li>
  <li><strong>타 반려동물</strong>: 현재 키우는 동물과 합사 가능성 사전 조사</li>
</ol>

<h2>공간 구성 — 고양이가 좋아하는 환경</h2>
<ul>
  <li><strong>캣타워 또는 높은 공간</strong>: 고양이는 높은 곳에서 영역을 파악하는 본능이 있어 최소 1개 권장</li>
  <li><strong>화장실</strong>: 고양이 수 + 1개 원칙 (1마리면 화장실 2개). 조용하고 개방된 위치에 배치</li>
  <li><strong>은신처</strong>: 스트레스 시 숨을 수 있는 박스·침대 배치</li>
  <li><strong>스크래처</strong>: 소파·가구 손상 방지 및 발톱 관리용. 수직·수평형 각 1개 권장</li>
  <li><strong>창문 낙하 방지</strong>: 방충망은 고양이 무게를 버티지 못합니다. 전용 안전망 필수</li>
</ul>

<h2>초기 필수 용품 목록</h2>
<ul>
  <li>사료 그릇 (도자기·스테인리스 권장, 플라스틱은 여드름 유발 가능)</li>
  <li>정수기 또는 흐르는 물 급수기 (고양이는 흐르는 물을 선호)</li>
  <li>화장실 및 모래 (무향 응고형이 기초 추천)</li>
  <li>캣타워 또는 선반</li>
  <li>이동장 (병원 방문·긴급 대피용)</li>
  <li>장난감 (낚싯대형, 공, 터널 등)</li>
</ul>

<h2>입양 직후 동물병원 방문 (1주일 이내)</h2>
<ul>
  <li>기초 건강 검진: 체중·체온·기생충 여부</li>
  <li>구충제 투여 (회충·기생충)</li>
  <li>기본 예방접종 일정 수립 (FVRCP 3종)</li>
  <li>중성화 수술 시기 상담: 보통 생후 4~6개월이 권장 시기</li>
  <li>등록(microchip) 여부 확인 — 고양이는 의무 등록 대상은 아니지만 분실 예방에 권장</li>
</ul>

<h2>고양이 입양 경로 비교</h2>
<ul>
  <li><strong>보호소·유기묘 입양</strong>: 중성화·접종 완료된 경우 많음. 입양비 5~10만 원 내외</li>
  <li><strong>브리더 분양</strong>: 혈통서·건강보증 확인. 분양가 30만~200만 원 이상</li>
  <li><strong>임시보호 후 입양</strong>: 성격 파악 후 결정 가능. 펫지기 지역 보호센터 검색 활용</li>
</ul>`,
    disclaimer: null,
    sources: [
      "농림축산식품부 동물보호법 반려묘 등록 관련 조항 (2024)",
      "American Association of Feline Practitioners (AAFP) 고양이 일반 관리 가이드라인 (2023)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-16T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 11. 반려동물 위험 음식 완전 정리 (카테고리 2, published) ──────────────────
  {
    id: "seed-guide-pet-toxic-foods",
    slug: "pet-toxic-foods-complete-guide",
    type: "guide",
    category: 2,
    title: "반려동물에게 위험한 음식 완전 정리 — 개·고양이 공통·종별",
    metaTitle: "반려동물 위험 음식 | 개·고양이 금지 먹이 완전 목록 | 펫지기",
    metaDescription:
      "포도, 초콜릿, 양파, 자일리톨 등 개와 고양이에게 절대 금지인 음식과 위험한 이유를 수의학 자료 기반으로 정리했습니다.",
    body: `<h2>왜 사람 음식이 반려동물에게 위험한가?</h2>
<p>사람과 반려동물은 음식을 처리하는 대사 경로가 다릅니다. 사람에게 무해하거나 심지어 건강에 좋은 음식이 개·고양이에게는 독으로 작용할 수 있습니다. 아래 목록은 수의학 독성학 자료를 기반으로 작성했습니다.</p>

<h2>개와 고양이 공통 위험 음식</h2>

<h3>포도·건포도·커런트</h3>
<p><strong>위험도: 매우 높음</strong><br>
신부전을 유발합니다. 소량(포도 1~2알)으로도 심각한 신장 손상이 보고되었습니다. 특정 개체는 더 민감하게 반응합니다. 섭취 즉시 수의사 연락.</p>

<h3>양파·마늘·파·부추·쪽파</h3>
<p><strong>위험도: 높음</strong><br>
적혈구를 산화·파괴하는 티오황산염 성분이 들어 있습니다. 가열해도 독성이 사라지지 않습니다. 지속적 소량 섭취(탕, 소스)도 누적으로 위험합니다.</p>

<h3>초콜릿·코코아·카카오</h3>
<p><strong>위험도: 높음</strong><br>
테오브로민과 카페인이 심장·신경에 독성을 나타냅니다. 다크 초콜릿이 밀크 초콜릿보다 훨씬 위험합니다. 체중 1kg당 약 100~200mg의 테오브로민이 치명적일 수 있습니다.</p>

<h3>자일리톨 (Xylitol) 함유 식품</h3>
<p><strong>위험도: 매우 높음 (개)</strong><br>
껌, 일부 사탕, 토마토 케첩, 팝콘, 치약에 포함된 자일리톨은 개에게 심각한 저혈당·간부전을 유발합니다. 고양이는 상대적으로 덜 민감하지만 역시 피해야 합니다.</p>

<h3>알코올·효모 반죽</h3>
<p><strong>위험도: 높음</strong><br>
소량의 알코올도 저혈당·중추신경 억제를 유발합니다. 효모 반죽은 위장에서 발효되며 에탄올과 가스를 생성해 복통·위 파열 위험이 있습니다.</p>

<h3>카페인 (커피·차·에너지드링크)</h3>
<p><strong>위험도: 높음</strong><br>
심박 수 증가, 경련, 사망 위험. 체중이 적을수록 위험도가 높습니다.</p>

<h3>마카다미아 너트</h3>
<p><strong>위험도: 중간~높음 (개)</strong><br>
구토, 고열, 후지 마비 증상을 유발합니다. 독성 기전은 아직 완전히 밝혀지지 않았습니다.</p>

<h3>아보카도</h3>
<p><strong>위험도: 중간</strong><br>
퍼신(Persin) 성분이 심근 손상, 호흡 곤란, 구토를 일으킬 수 있습니다. 씨·껍질이 특히 위험합니다.</p>

<h2>고양이에게 추가로 위험한 음식</h2>
<ul>
  <li><strong>참치 과다</strong>: 수은 축적, 비타민 E 결핍, 고양이 지방 축적증 유발. 간식으로 주 1~2회 소량만</li>
  <li><strong>우유·유제품</strong>: 성묘 대부분은 유당불내증으로 설사 유발. 고양이 전용 우유 사용</li>
  <li><strong>생선 생뼈</strong>: 가시 천공 위험. 조리된 닭뼈도 날카롭게 부러져 위험</li>
  <li><strong>날달걀 흰자</strong>: 아비딘 성분이 비오틴 흡수를 방해 (비타민 B7 결핍)</li>
</ul>

<h2>섭취 의심 시 즉각 행동 요령</h2>
<ol>
  <li>섭취한 음식 종류와 양을 파악합니다.</li>
  <li>즉시 동물병원 또는 24시간 응급 클리닉에 전화합니다.</li>
  <li>임의로 구토를 유발하지 마세요 — 일부 물질은 구토 시 더 큰 손상을 줄 수 있습니다.</li>
  <li>포장지·음식 샘플을 가져가면 수의사 진단에 도움이 됩니다.</li>
</ol>`,
    disclaimer: null,
    sources: [
      "ASPCA Animal Poison Control Center — Toxic and Non-Toxic Plants & Foods (2024)",
      "Pet Poison Helpline — Food Hazards List (2024)",
      "대한수의사회 반려동물 독성물질 대응 가이드라인 (2023)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-16T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 12. 노령견 케어 가이드 (카테고리 5, published) ────────────────────────────
  {
    id: "seed-guide-senior-dog-care",
    slug: "senior-dog-care-guide",
    type: "guide",
    category: 5,
    title: "노령견 케어 가이드 — 7세 이후 건강·생활 관리",
    metaTitle: "노령견 케어 | 7세 이후 건강검진·식이·운동 관리 | 펫지기",
    metaDescription:
      "강아지 7세 이후 노화 신호와 건강검진 주기, 관절·치아·인지기능 관리 방법을 정리했습니다. 노령견 삶의 질을 높이는 실용 가이드.",
    body: `<h2>강아지는 언제부터 노령견인가?</h2>
<p>일반적으로 소형견은 만 10~12세, 중형견은 8~10세, 대형견은 6~8세부터 '시니어'로 분류합니다. 대형견일수록 노화가 빨리 진행됩니다. 나이보다 중요한 것은 각 반려견의 건강 상태이며, 주치 수의사와 함께 관리 계획을 세우세요.</p>

<h2>노화의 주요 신호</h2>
<ul>
  <li><strong>관절·보행 변화</strong>: 계단 오르기 꺼림, 자리에서 일어날 때 시간이 걸림, 뒷다리 약해짐</li>
  <li><strong>시력·청력 저하</strong>: 낯선 환경에서 혼란, 큰 소리에 반응이 줄어듦</li>
  <li><strong>수면 증가</strong>: 하루 수면 시간이 14~16시간 이상으로 늘어남</li>
  <li><strong>식욕 변화</strong>: 식사를 거르거나 먹는 속도가 느려짐</li>
  <li><strong>체중 변화</strong>: 근육량 감소(근감소증) 또는 대사 저하로 인한 체중 증가</li>
  <li><strong>인지기능 저하(CDS)</strong>: 밤에 목적 없이 배회, 익숙한 장소에서 길을 잃는 것처럼 행동</li>
</ul>

<h2>노령견 건강검진 주기</h2>
<p>7세 이상부터는 연 1회 검진으로는 부족합니다. 일반적으로 아래 주기를 권장합니다.</p>
<ul>
  <li><strong>신체 검사 + 기초 혈액 검사</strong>: 6개월마다</li>
  <li><strong>소변 검사 + 혈압 측정</strong>: 6~12개월마다</li>
  <li><strong>흉부 X-레이 + 복부 초음파</strong>: 연 1회 (심장·폐·복강 이상 조기 발견)</li>
  <li><strong>안과·구강 검사</strong>: 연 1회</li>
</ul>

<h2>노령견 식이 관리</h2>
<ul>
  <li><strong>시니어 사료로 전환</strong>: 칼로리 낮추고 관절 보호 성분(글루코사민, 콘드로이틴) 강화된 제품 선택</li>
  <li><strong>급여 횟수 조정</strong>: 1일 2~3회 소량씩. 식후 위가 꽉 차면 위장 부담 증가</li>
  <li><strong>수분 섭취 확인</strong>: 신장 기능 저하 예방을 위해 습식 사료 혼합 급여 고려</li>
  <li><strong>보조제 상담</strong>: 오메가-3(어유), 항산화제는 수의사 처방 후 복용</li>
</ul>

<h2>관절·운동 관리</h2>
<ul>
  <li>짧고 자주 산책: 장시간 1회보다 20~30분씩 2~3회 권장</li>
  <li>미끄럼 방지 매트: 마루·타일에 카펫·매트 깔기 (관절 부담 감소)</li>
  <li>계단 램프: 소파·침대 올라가기 위한 완만한 경사로 제공</li>
  <li>수중 물리치료: 관절에 부담 없이 근력 유지 가능</li>
</ul>

<h2>인지기능 저하(CDS) 관리</h2>
<ul>
  <li>일정한 하루 루틴 유지 (식사·산책·취침 시간 고정)</li>
  <li>후각 자극 게임: 음식 숨기기 놀이로 두뇌 활성화</li>
  <li>야간 배회 시 야간 조명 설치로 안전 확보</li>
  <li>수의사 처방 인지기능 보조 사료 또는 약물 고려</li>
</ul>`,
    disclaimer: null,
    sources: [
      "American Animal Hospital Association — Senior Care Guidelines (2023)",
      "대한수의사회 반려동물 노령 관리 지침 (2022)",
      "Journal of Veterinary Internal Medicine — Canine Cognitive Dysfunction (2022)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-17T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 13. 강아지 치아·구강 관리 (카테고리 5, published) ────────────────────────
  {
    id: "seed-guide-dog-dental-care",
    slug: "dog-dental-care-guide",
    type: "guide",
    category: 5,
    title: "강아지 치아·구강 관리 — 칫솔질부터 스케일링까지",
    metaTitle: "강아지 치아 관리 | 칫솔질·스케일링·구강 질환 예방 | 펫지기",
    metaDescription:
      "강아지 구강 관리의 핵심인 칫솔질 방법, 치석 제거, 스케일링 시기, 구강 질환 조기 신호를 정리했습니다.",
    body: `<h2>왜 구강 관리가 중요한가?</h2>
<p>3세 이상 강아지의 약 80%가 치주 질환을 앓고 있습니다. 구강 세균은 혈액을 통해 심장·신장·간에 영향을 미쳐 전신 질환으로 이어질 수 있습니다. 정기적인 칫솔질은 반려견의 수명을 최대 2~3년 연장할 수 있다는 연구도 있습니다.</p>

<h2>올바른 칫솔질 방법</h2>

<h3>준비물</h3>
<ul>
  <li>반려동물 전용 칫솔 (손가락 칫솔 또는 소형 헤드 칫솔)</li>
  <li>반려동물 전용 치약 (불소 없는 제품 필수 — 사람용 치약은 독성)</li>
</ul>

<h3>단계별 방법 (처음 시도 시)</h3>
<ol>
  <li><strong>1주차</strong>: 손가락에 치약을 묻혀 치아·잇몸을 부드럽게 만져 치약 맛에 익숙하게</li>
  <li><strong>2주차</strong>: 손가락 칫솔로 앞니부터 닦기 시작. 30초 이내</li>
  <li><strong>3주차 이후</strong>: 일반 칫솔로 전환, 원형 운동으로 잇몸선까지 닦기. 목표 2분</li>
  <li>칫솔질 후 항상 칭찬·간식으로 긍정 경험 형성</li>
</ol>

<h3>칫솔질 빈도</h3>
<ul>
  <li>이상적: 매일 (혹은 주 3~4회 이상)</li>
  <li>최소: 주 2~3회 이하로는 치석 예방 효과가 크게 떨어집니다</li>
</ul>

<h2>칫솔질 대안 도구 비교</h2>
<table>
  <thead>
    <tr><th>도구</th><th>효과</th><th>주의사항</th></tr>
  </thead>
  <tbody>
    <tr><td>덴탈 껌·스틱</td><td>기계적 치석 제거 보조</td><td>주성분 확인 (자일리톨 금지), 과식 주의</td></tr>
    <tr><td>구강 청결제 (물에 첨가)</td><td>세균 억제</td><td>알코올 없는 제품 선택</td></tr>
    <tr><td>덴탈 와이프·거즈</td><td>잇몸 마사지 효과</td><td>칫솔질 대체 불가, 보조 사용</td></tr>
    <tr><td>로우하이드·우육 뼈</td><td>물리적 치석 제거</td><td>소화 위험 있어 수의사 상담 후 선택</td></tr>
  </tbody>
</table>

<h2>스케일링 — 시기와 절차</h2>
<p>칫솔질만으로 제거되지 않은 치석은 전문 스케일링이 필요합니다.</p>
<ul>
  <li><strong>권장 주기</strong>: 소형견 연 1~2회, 대형견 1~3년에 1회 (치석 형성 속도에 따라 조정)</li>
  <li><strong>절차</strong>: 전신마취 → 초음파 스케일링 → 치아 연마(폴리싱) → 불소 도포</li>
  <li><strong>비용</strong>: 10~30만 원 내외 (병원·규모에 따라 상이)</li>
  <li><strong>전마취 전 혈액 검사 권장</strong>: 전신마취 안전성 확인</li>
</ul>

<h2>치주 질환 조기 신호</h2>
<ul>
  <li>입 냄새(구취): 가장 흔한 초기 신호</li>
  <li>잇몸 빨개짐·출혈: 칫솔질 시 피가 남</li>
  <li>치아 색 변화: 노랗거나 갈색 치석 형성</li>
  <li>씹기 불편: 딱딱한 음식 거부, 한쪽으로만 씹음</li>
  <li>침 과다 분비: 구강 통증 신호</li>
</ul>`,
    disclaimer: null,
    sources: [
      "VOHC (Veterinary Oral Health Council) — Accepted Products List (2024)",
      "대한수의사회 구강 관리 권고 기준 (2023)",
      "American Veterinary Dental College — Home Care Guide (2024)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-17T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ══ CONDITION 타입 (질병·증상) ══════════════════════════════════════════════

  // ── 14. 고양이 하부요로기질환 FLUTD (카테고리 3, YMYL, condition) ─────────────
  {
    id: "seed-condition-cat-flutd",
    slug: "cat-flutd",
    type: "condition",
    category: 3,
    title: "고양이 하부요로기질환 (FLUTD)",
    metaTitle: "고양이 하부요로기질환(FLUTD) — 증상·원인·치료 | 펫지기",
    metaDescription:
      "고양이 화장실 빈번한 방문, 혈뇨, 소변 실패(요도 막힘)는 FLUTD 신호입니다. 원인·진단·치료·식이 관리를 수의학 자료로 정리했습니다.",
    body: `<h2>FLUTD란?</h2>
<p>FLUTD(Feline Lower Urinary Tract Disease, 고양이 하부요로기질환)는 방광과 요도에 영향을 주는 일련의 질환군을 뜻합니다. 고양이에게 가장 흔한 질환 중 하나로, 특히 수컷 고양이의 요도 막힘(요도 폐색)은 48시간 이내 치명적일 수 있는 응급 상황입니다.</p>

<h2>주요 원인 유형</h2>
<ul>
  <li><strong>특발성 방광염(FIC, 55~65%)</strong>: 뚜렷한 기질적 원인 없이 스트레스·환경 변화로 발생. 가장 흔한 원인</li>
  <li><strong>방광 결석·방광사(Crystals, 15~20%)</strong>: 스트루바이트 또는 수산칼슘 결정. 식이와 관련</li>
  <li><strong>요도 폐색(10%)</strong>: 결석·점액 마개로 요도가 막힘. 수컷 고양이에서만 발생(요도가 더 좁음)</li>
  <li><strong>세균성 방광염(1~5%)</strong>: 노령 고양이·면역 저하 고양이에서 더 흔함</li>
</ul>

<h2>증상 — 즉시 병원이 필요한 신호</h2>
<ul>
  <li>화장실을 자주 방문하지만 소변이 나오지 않음 (긴박뇨)</li>
  <li>소변 중 통증으로 울음 소리</li>
  <li>혈뇨 (소변이 빨간색 또는 분홍빛)</li>
  <li>소변을 화장실 밖에 봄 (긴박뇨로 실수)</li>
  <li><strong>12시간 이상 소변이 전혀 없음 → 즉시 응급 병원 방문</strong></li>
  <li>복부 통증, 무기력, 식욕 저하, 구토 (요도 폐색 시 빠르게 악화)</li>
</ul>

<h2>진단</h2>
<ul>
  <li>소변 검사 (분석·배양): 결정·세균·혈구 확인</li>
  <li>복부 방사선·초음파: 결석·방광벽 두께 확인</li>
  <li>혈액 검사: 신부전 동반 여부 확인</li>
</ul>

<h2>치료</h2>
<h3>요도 폐색 (응급)</h3>
<ul>
  <li>요도 카테터 삽입으로 막힌 요도 개방</li>
  <li>수액 치료로 신장 기능 회복</li>
  <li>입원 치료 필요 (1~3일 이상)</li>
</ul>
<h3>특발성 방광염(FIC)</h3>
<ul>
  <li>스트레스 요인 제거 (환경 풍부화, 화장실 위치·개수 조정)</li>
  <li>수분 섭취 증가: 습식 사료 전환 또는 흐르는 물 급수기</li>
  <li>진통제·항경련제 처방</li>
</ul>

<h2>예방 — 식이·환경 관리</h2>
<ul>
  <li><strong>습식 사료 급여</strong>: 수분 섭취가 FLUTD 예방의 핵심. 습식 비중을 높이거나 건식에 물 추가</li>
  <li><strong>화장실 청결</strong>: 하루 1~2회 이상 청소. 고양이 수 + 1개 원칙</li>
  <li><strong>스트레스 감소</strong>: 이사·새 동물 도입 시 점진적 적응, 안정된 루틴 유지</li>
  <li><strong>처방식 사료</strong>: 결석 형성 이력이 있다면 수의사 처방 비뇨기 케어 사료 권장</li>
</ul>`,
    disclaimer:
      "본 콘텐츠는 정보 제공 목적으로만 작성되었으며, 의학적 진단·치료를 대체하지 않습니다. 특히 고양이 요도 폐색(12시간 이상 소변 없음)은 즉각적인 응급 수의 치료가 필요한 상황입니다. 증상이 의심될 경우 즉시 동물병원을 방문하세요.",
    sources: [
      "Hostutler RA et al. — Feline Idiopathic Cystitis, Vet Clin North Am Small Anim Pract (2005)",
      "WSAVA Lower Urinary Tract Disease Guidelines (2020)",
      "대한수의사회 고양이 비뇨기 질환 관리 지침 (2023)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-18T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 15. 강아지 심장사상충 (카테고리 3, YMYL, condition) ──────────────────────
  {
    id: "seed-condition-dog-heartworm",
    slug: "dog-heartworm",
    type: "condition",
    category: 3,
    title: "강아지 심장사상충 — 감염 경로·증상·예방",
    metaTitle: "강아지 심장사상충 | 감염 경로·증상·예방약 비교 | 펫지기",
    metaDescription:
      "모기가 옮기는 심장사상충은 예방이 치료보다 훨씬 중요합니다. 감염 경로, 초기 증상, 예방약 종류와 투여 주기를 정리했습니다.",
    body: `<h2>심장사상충이란?</h2>
<p>심장사상충(Dirofilaria immitis)은 모기가 매개하는 기생충으로, 성충이 심장·폐동맥에 자리 잡아 순환기·호흡기에 심각한 손상을 줍니다. 국내에서도 감염 사례가 보고되고 있어 실내견도 안심할 수 없습니다.</p>

<h2>감염 경로</h2>
<ol>
  <li>심장사상충에 감염된 개를 모기가 흡혈</li>
  <li>모기 체내에서 유충(L3) 발육 (약 10~14일)</li>
  <li>같은 모기가 건강한 개를 흡혈할 때 유충 주입</li>
  <li>개 체내에서 약 6개월 후 성충으로 발육, 심장·폐동맥 정착</li>
  <li>성충 수명 5~7년, 감염 방치 시 계속 기생</li>
</ol>

<h2>증상 — 단계별</h2>
<h3>초기 (성충 소수, 6개월~1년)</h3>
<ul>
  <li>증상 거의 없음 (잠복기). 혈액 검사로만 확인 가능</li>
</ul>
<h3>중기</h3>
<ul>
  <li>운동 후 기침, 운동 불내성 (쉽게 지침)</li>
  <li>식욕 감소, 체중 감소</li>
</ul>
<h3>말기 (심한 감염)</h3>
<ul>
  <li>지속적 기침, 호흡 곤란</li>
  <li>복수 (배가 부음), 실신</li>
  <li>갑작스러운 사망 (폐동맥 혈전)</li>
</ul>

<h2>진단</h2>
<ul>
  <li><strong>항원 검사 (혈액)</strong>: 성충 암컷 항원 검출. 가장 흔히 사용</li>
  <li><strong>마이크로필라리아 검사</strong>: 혈액 내 유충 확인</li>
  <li>흉부 방사선·심장 초음파: 심장·폐 손상 정도 평가</li>
</ul>

<h2>예방 — 가장 중요한 관리</h2>
<p>예방이 치료보다 훨씬 안전하고 경제적입니다. 국내 모기 활동 시기(3~11월)에는 매월 예방약 투여를 권장합니다.</p>
<table>
  <thead>
    <tr><th>예방약 유형</th><th>투여 방법</th><th>주기</th><th>추가 예방</th></tr>
  </thead>
  <tbody>
    <tr><td>먹는 약 (이버멕틴 계열)</td><td>경구</td><td>월 1회</td><td>일부는 내부 기생충도 예방</td></tr>
    <tr><td>바르는 약 (스폿온)</td><td>등에 도포</td><td>월 1회</td><td>외부 기생충 동시 예방</td></tr>
    <tr><td>주사형 (예방 지속성)</td><td>수의사 주사</td><td>6개월~1년</td><td>수의사 처방 필수</td></tr>
  </tbody>
</table>

<h3>예방약 투여 전 주의사항</h3>
<ul>
  <li>처음 예방약 투여 전 혈액 항원 검사 권장 (기존 감염 여부 확인)</li>
  <li>감염 상태에서 예방약 투여 시 쇼크 반응 위험</li>
  <li>콜리·셰틀랜드 쉽독 등 MDR1 유전자 돌연변이 견종은 이버멕틴 독성 반응 위험 → 수의사 상담 필수</li>
</ul>

<h2>치료 (감염 시)</h2>
<ul>
  <li>멜라르소민(Melarsomine) 주사: 성충 사멸 약물. 엄격한 안정이 필요</li>
  <li>성충 사멸 후 죽은 기생충이 혈전을 유발할 수 있어 수개월 운동 제한 필수</li>
  <li>폐·심장 손상 정도에 따라 수술 필요할 수 있음</li>
</ul>`,
    disclaimer:
      "본 콘텐츠는 정보 제공 목적으로만 작성되었으며, 의학적 진단·치료를 대체하지 않습니다. 심장사상충 예방약은 반드시 수의사 처방 또는 권고에 따라 투여하세요. 특히 MDR1 돌연변이 의심 품종은 수의사와 필수 상담 후 적합한 예방약을 선택하세요.",
    sources: [
      "American Heartworm Society — Current Canine Guidelines (2018, 최신 개정)",
      "농림축산검역본부 반려동물 기생충 관리 지침 (2023)",
      "Companion Animal Parasite Council (CAPC) — Dirofilaria immitis (2024)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-18T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 16. 강아지 켄넬코프 (카테고리 3, YMYL, condition) ────────────────────────
  {
    id: "seed-condition-dog-kennel-cough",
    slug: "dog-kennel-cough",
    type: "condition",
    category: 3,
    title: "강아지 켄넬코프 (전염성 기관지염)",
    metaTitle: "강아지 켄넬코프 | 증상·전염·예방접종·치료 | 펫지기",
    metaDescription:
      "강아지 특유의 거위 울음 같은 기침이 특징인 켄넬코프(전염성 기관지염). 감염 경로, 증상, 예방접종 방법을 정리했습니다.",
    body: `<h2>켄넬코프란?</h2>
<p>켄넬코프(Kennel Cough, 전염성 기관기관지염 Canine Infectious Tracheobronchitis)는 강아지 기도에 감염을 일으키는 복합 감염 질환입니다. 여러 바이러스·세균이 단독 또는 복합으로 감염하며, 전염성이 매우 강해 집단 사육 환경(켄넬·미용실·펫호텔)에서 빠르게 확산됩니다.</p>

<h2>주요 원인 병원체</h2>
<ul>
  <li><strong>Bordetella bronchiseptica (세균)</strong>: 가장 흔한 원인. 켄넬코프 예방 백신의 주 타겟</li>
  <li><strong>개 파라인플루엔자 바이러스</strong>: 종합 백신(DHPPL)에 포함</li>
  <li><strong>개 아데노바이러스 2형</strong>: 종합 백신으로 예방 가능</li>
  <li>개 호흡기 코로나바이러스, 개 인플루엔자 등도 복합 감염 원인</li>
</ul>

<h2>증상</h2>
<ul>
  <li><strong>특징적인 기침</strong>: '거위 울음 소리', '꽥꽥', '혹혹' 하는 반복적인 건성 기침</li>
  <li>기침 후 구역질하는 것처럼 보임 (실제 구토가 아님)</li>
  <li>콧물, 재채기, 눈 분비물</li>
  <li>경증: 식욕·활동량 정상, 기침만 있음</li>
  <li>중증: 발열, 식욕 부진, 무기력, 폐렴으로 진행 가능</li>
</ul>

<h3>병원 방문이 필요한 신호</h3>
<ul>
  <li>기침이 7~10일 이상 지속 또는 악화</li>
  <li>발열(39.5°C 이상), 식욕 완전 저하, 무기력</li>
  <li>호흡 곤란, 청색증 (입술·잇몸이 파랗게 변함)</li>
  <li>자견·노령견·면역저하 개체 (폐렴 진행 위험 높음)</li>
</ul>

<h2>전염 경로와 격리</h2>
<ul>
  <li>감염된 개의 기침·재채기 비말로 직접 전파</li>
  <li>오염된 물그릇·장난감·사람 손을 통한 간접 전파</li>
  <li>증상 발현 시 <strong>최소 2주 다른 개와 접촉 금지</strong></li>
  <li>공동 시설(미용실·펫호텔) 예약 취소 및 담당자에게 통보 권장</li>
</ul>

<h2>치료</h2>
<ul>
  <li><strong>경증</strong>: 충분한 휴식과 수분 공급. 5~10일 내 자연 회복 가능</li>
  <li><strong>세균성 감염 시</strong>: 수의사 처방 항생제 투여 (도시사이클린 등)</li>
  <li><strong>기침 완화</strong>: 기침 억제제 처방 (수의사 진료 후)</li>
  <li>폐렴 동반 시 입원 치료</li>
</ul>

<h2>예방</h2>
<ul>
  <li><strong>켄넬코프 예방 백신</strong>: 주사형 또는 비강(코) 점적형. 기초 2회 후 연 1회 추가</li>
  <li>다중 시설(펫호텔·미용·어린이집) 이용 전 예방접종 완료 확인</li>
  <li>환기 잘 되는 환경 유지, 집단 시설 이용 후 건강 상태 관찰</li>
</ul>`,
    disclaimer:
      "본 콘텐츠는 정보 제공 목적으로만 작성되었으며, 의학적 진단·치료를 대체하지 않습니다. 켄넬코프 증상과 유사한 기침은 심장 질환, 기관 허탈, 이물질 등 다양한 원인일 수 있습니다. 기침이 지속되면 반드시 수의사 진료를 받으세요.",
    sources: [
      "Ford RB — Canine Infectious Tracheobronchitis, Vet Med Today (2022)",
      "WSAVA Vaccination Guidelines — Canine (2022)",
      "대한수의사회 반려견 전염성 호흡기 질환 관리 지침 (2023)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-18T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ══ 추가 GUIDE ════════════════════════════════════════════════════════════

  // ── 17. 반려견 마이크로칩 등록 가이드 (카테고리 1, published) ─────────────────
  {
    id: "seed-guide-microchip-registration",
    slug: "pet-microchip-registration-guide",
    type: "guide",
    category: 1,
    title: "반려견 마이크로칩 등록 완전 가이드 — 절차·비용·조회",
    metaTitle: "반려견 마이크로칩 등록 방법 | 의무·비용·APMS 조회 | 펫지기",
    metaDescription:
      "2개월 이상 반려견은 마이크로칩(내장형) 또는 인식표(외장형) 등록이 의무입니다. 등록 절차, 비용, APMS 조회 방법을 단계별로 안내합니다.",
    body: `<h2>동물등록제란?</h2>
<p>동물보호법에 따라 2개월 이상의 반려견(개)은 의무적으로 동물등록을 해야 합니다. 등록 미이행 시 1차 20만 원, 2차 40만 원, 3차 60만 원의 과태료가 부과됩니다(2024년 기준). 고양이는 현재 의무 대상이 아니지만 분실 예방을 위해 권장합니다.</p>

<h2>등록 방법 3가지</h2>
<h3>1. 내장형 마이크로칩 (가장 권장)</h3>
<ul>
  <li>15자리 국제 표준 칩(ISO 11784/11785)을 목 뒷부분 피하에 주입</li>
  <li>시술: 동물병원 수의사 직접 시행. 약 2~3만 원</li>
  <li>평생 영구 등록, 분리·위변조 불가</li>
  <li>스캐너로 언제든 조회 가능</li>
</ul>
<h3>2. 외장형 인식표</h3>
<ul>
  <li>목걸이에 부착하는 RFID 인식표</li>
  <li>등록 비용 약 5천 원~1만 원</li>
  <li>분실·손상 위험 있음. 마이크로칩보다 신뢰성 낮음</li>
</ul>
<h3>3. 등록 대행업체</h3>
<ul>
  <li>동물보호관리시스템(APMS)에서 조회 가능한 등록 대행 업체 방문</li>
  <li>일부 지자체에서 무료 등록 지원 (매년 등록 캠페인 확인 권장)</li>
</ul>

<h2>등록 절차 단계별 안내</h2>
<ol>
  <li>등록 가능 기관 확인: APMS(apms.go.kr) → 동물등록대행업체 검색</li>
  <li>방문 지참 서류: 신분증 (보호자 본인)</li>
  <li>동물 정보 입력: 품종·털색·성별·중성화 여부·출생연도</li>
  <li>마이크로칩 시술 (내장형 선택 시)</li>
  <li>동물등록증(인증서) 발급</li>
</ol>

<h2>APMS 등록 정보 조회·변경</h2>
<ul>
  <li>조회: APMS(apms.go.kr) → "동물등록 조회" → 등록번호 또는 보호자 정보로 조회</li>
  <li>정보 변경: 주소 이사, 보호자 변경 시 30일 이내 변경 신고 의무</li>
  <li>반려동물 사망 시: 30일 이내 말소 신고</li>
</ul>

<h2>지자체 무료 등록 지원</h2>
<p>매년 4~5월 '동물등록 집중 홍보 기간'에 전국 지자체에서 마이크로칩 무료 또는 저가 시술을 지원합니다. 거주 지역 주민센터 또는 시·군·구청 동물보호팀에 문의하세요.</p>`,
    disclaimer: null,
    sources: [
      "농림축산식품부 동물보호법 제15조 동물등록 (2024)",
      "농림축산검역본부 동물보호관리시스템 APMS apms.go.kr (2024)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-19T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 18. 실내 고양이 환경 풍부화 가이드 (카테고리 5, published) ─────────────────
  {
    id: "seed-guide-indoor-cat-enrichment",
    slug: "indoor-cat-enrichment-guide",
    type: "guide",
    category: 5,
    title: "실내 고양이 환경 풍부화 — 스트레스 줄이고 행복하게",
    metaTitle: "실내 고양이 환경 풍부화 | 캣타워·후각자극·놀이 방법 | 펫지기",
    metaDescription:
      "실내에서만 사는 고양이의 스트레스와 문제 행동을 줄이는 환경 풍부화(Environmental Enrichment) 방법을 정리했습니다.",
    body: `<h2>왜 환경 풍부화가 필요한가?</h2>
<p>야생 고양이는 하루 8~10시간을 사냥·탐색에 씁니다. 실내 고양이는 이 본능적 욕구가 충족되지 않으면 만성 스트레스·비만·과도한 그루밍·공격성·우울 등 문제 행동이 생깁니다. 환경 풍부화는 고양이의 정신적·신체적 건강을 지키는 핵심 관리입니다.</p>

<h2>1. 수직 공간 확보</h2>
<ul>
  <li><strong>캣타워</strong>: 고양이는 높은 곳에서 영역을 파악합니다. 천장 가까운 높이의 캣타워 1개 이상 권장</li>
  <li><strong>캣워크·선반</strong>: 벽면 선반을 계단식으로 배치하면 넓은 수직 동선 제공</li>
  <li><strong>창문 옆 해먹·선반</strong>: 외부 세계를 볼 수 있는 '고양이 TV' 역할. 새 먹이대 설치도 효과적</li>
</ul>

<h2>2. 사냥 본능 충족 — 놀이</h2>
<ul>
  <li><strong>낚싯대 장난감</strong>: 하루 2회 이상, 1회 10~15분 인터랙티브 놀이. 먹이 포획 → 포만감 → 그루밍 → 수면의 사냥 사이클 완성</li>
  <li><strong>퍼즐 피더</strong>: 음식을 얻기 위해 조작하는 장치. 두뇌 자극 + 급식 속도 조절</li>
  <li><strong>자동 장난감</strong>: 혼자 있을 때 자동 움직임 장난감 활용 (단독으로 두지 말고 안전성 확인)</li>
  <li>장난감은 정기적으로 교체·순환해 신선함 유지</li>
</ul>

<h2>3. 후각 자극</h2>
<ul>
  <li><strong>캣닙·캣그라스</strong>: 약 50~70% 고양이가 캣닙에 반응. 스트레스 해소에 효과적</li>
  <li><strong>허브 냄새</strong>: 캐모마일, 은행나무잎을 접시에 올려 후각 자극</li>
  <li><strong>외출 아이템 냄새</strong>: 보호자가 외출 후 가져온 물건 냄새로 간접 탐색</li>
</ul>

<h2>4. 은신처와 안전 공간</h2>
<ul>
  <li>스트레스 상황(손님 방문·공사·이사)에서 숨을 수 있는 박스·동굴형 침대 필수</li>
  <li>강요 없이 고양이가 자발적으로 나올 때까지 기다려주기</li>
  <li>다묘 가정: 각 고양이의 개인 공간 확보 (자원은 고양이 수 + 1 원칙)</li>
</ul>

<h2>5. 사회적 상호작용</h2>
<ul>
  <li>하루 최소 15~30분 집중적인 상호작용 시간 확보</li>
  <li>고양이가 원할 때 상호작용하고, 원치 않을 때는 강요하지 않기</li>
  <li>일정한 루틴 유지: 고양이는 예측 가능한 환경을 좋아함</li>
</ul>

<h2>문제 행동 신호와 대응</h2>
<ul>
  <li><strong>과도한 그루밍·탈모</strong>: 스트레스 신호. 환경 요인 점검 + 수의사 상담</li>
  <li><strong>화장실 외 배변</strong>: FLUTD 가능성 배제 후 화장실 환경 개선</li>
  <li><strong>공격성 증가</strong>: 통증·질환 여부 먼저 확인. 환경 풍부화 강화</li>
</ul>`,
    disclaimer: null,
    sources: [
      "Ellis SLH et al. — ISFM/AAFP Feline Environmental Needs Guidelines (2013)",
      "AAFP Indoor Cat Initiative (2024) — indoorpet.osu.edu",
      "대한수의사회 고양이 행동·복지 관리 지침 (2022)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-19T00:00:00.000Z",
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
