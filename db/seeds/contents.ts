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

  // ── 19. 강아지 피부 알레르기 (카테고리 3, YMYL, condition) ───────────────────
  {
    id: "seed-condition-dog-skin-allergy",
    slug: "dog-skin-allergy",
    type: "condition",
    category: 3,
    title: "강아지 피부 알레르기 — 원인·증상·치료·식이 관리",
    metaTitle: "강아지 피부 알레르기 | 원인·긁음·치료·식이 제거법 | 펫지기",
    metaDescription:
      "강아지 피부 가려움·발적·탈모의 원인이 되는 알레르기 유형(음식·환경·접촉)과 진단, 치료, 저알레르기 식이 방법을 정리했습니다.",
    body: `<h2>강아지 피부 알레르기란?</h2>
<p>알레르기는 면역계가 특정 물질(항원)에 과민 반응하는 상태입니다. 강아지에서 피부 알레르기(아토피 피부염·음식 알레르기·접촉성 알레르기)는 매우 흔한 만성 질환으로, 삶의 질에 큰 영향을 미칩니다.</p>

<h2>알레르기 유형 3가지</h2>
<h3>1. 환경성 알레르기 (아토피 피부염, 가장 흔함)</h3>
<ul>
  <li>원인: 집먼지 진드기, 꽃가루, 곰팡이, 풀 등</li>
  <li>특징: 계절성 또는 연중 지속. 발바닥 핥기, 귀 긁기, 얼굴·사타구니 발적이 전형적</li>
  <li>고위험 품종: 불독, 웨스트 하이랜드 테리어, 라브라도, 골든 리트리버, 비글</li>
</ul>
<h3>2. 음식 알레르기</h3>
<ul>
  <li>원인: 소고기, 닭고기, 유제품, 밀, 달걀이 흔한 원인 단백질</li>
  <li>특징: 계절 무관 연중 증상. 귀 감염 반복, 소화 장애 동반 가능</li>
  <li>진단: 8~12주 제거 식이 시험(Novel Protein Diet)이 가장 정확</li>
</ul>
<h3>3. 접촉성 알레르기</h3>
<ul>
  <li>원인: 특정 샴푸, 세제, 금속, 플라스틱 그릇 등</li>
  <li>특징: 접촉 부위에 국소적으로 발적·부종</li>
  <li>원인 제거 후 빠른 호전</li>
</ul>

<h2>주요 증상</h2>
<ul>
  <li>발바닥 핥기·씹기 (갈색 착색이 생기면 만성화 신호)</li>
  <li>귀 반복 감염 (냄새, 분비물, 머리 흔들기)</li>
  <li>얼굴·사타구니·겨드랑이 발적·탈모</li>
  <li>피부 비듬, 기름기, 냄새 증가</li>
  <li>긁어서 생긴 2차 세균·효모 감염</li>
</ul>

<h2>진단</h2>
<ul>
  <li>피부 소파 검사: 세균·말라세지아(효모) 감염 확인</li>
  <li>알레르기 혈청 검사(IgE): 환경 알레르기 항원 확인</li>
  <li>제거 식이 시험 8~12주: 음식 알레르기 확인 금표준</li>
  <li>피부 단자 검사: 수의 피부과 전문의 시행</li>
</ul>

<h2>치료</h2>
<h3>약물 치료</h3>
<ul>
  <li><strong>아포퀠(Oclacitinib)</strong>: JAK 억제제. 가려움 빠른 완화. 장기 사용 시 정기 혈액 검사 필요</li>
  <li><strong>사이토포인트(Cytopoint)</strong>: IL-31 차단 주사. 효과 4~8주 지속</li>
  <li><strong>스테로이드</strong>: 급성기 증상 조절용. 장기 사용 부작용 주의</li>
  <li>항생제·항진균제: 2차 감염 치료</li>
</ul>
<h3>식이 관리 (음식 알레르기)</h3>
<ul>
  <li>제거 식이 기간(8~12주) 중 처방 가수분해 식이 또는 단일 신규 단백질 사료만 급여</li>
  <li>간식·치약·구충제도 알레르기 성분 제외 제품으로 교체</li>
  <li>증상 소실 후 원인 단백질 재도전으로 알레르겐 확인</li>
</ul>
<h3>환경 관리</h3>
<ul>
  <li>집먼지 진드기 감소: HEPA 필터 공기청정기, 침구 주 1회 고온 세탁</li>
  <li>외출 후 발바닥 닦기 (꽃가루 제거)</li>
  <li>알레르기 면역치료(탈감작): 원인 항원을 소량씩 노출해 면역 내성 유도</li>
</ul>`,
    disclaimer:
      "본 콘텐츠는 정보 제공 목적으로만 작성되었으며, 의학적 진단·치료를 대체하지 않습니다. 피부 증상의 원인은 매우 다양해 수의사 진료와 정확한 진단 없이 치료를 시작하면 증상이 악화될 수 있습니다. 반드시 수의사와 상담하세요.",
    sources: [
      "Olivry T et al. — Treatment of canine atopic dermatitis: 2015 updated guidelines, Vet Dermatol",
      "WSAVA Dermatology Guidelines (2020)",
      "대한수의사회 반려동물 피부 질환 관리 지침 (2023)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-20T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 20. 고양이 만성 신부전 (카테고리 3, YMYL, condition) ─────────────────────
  {
    id: "seed-condition-cat-ckd",
    slug: "cat-chronic-kidney-disease",
    type: "condition",
    category: 3,
    title: "고양이 만성 신부전(CKD) — 조기 신호·단계·관리",
    metaTitle: "고양이 만성 신부전(CKD) | 증상·IRIS 단계·식이 관리 | 펫지기",
    metaDescription:
      "고양이 만성 신부전은 7세 이상 고양이의 가장 흔한 질환 중 하나입니다. 조기 신호, IRIS 단계별 치료, 식이 관리를 정리했습니다.",
    body: `<h2>고양이 만성 신부전(CKD)이란?</h2>
<p>만성 신부전(Chronic Kidney Disease, CKD)은 신장 기능이 서서히 소실되는 진행성 질환입니다. 7세 이상 고양이의 약 30~40%에서 발생하는 가장 흔한 노령 질환 중 하나로, 조기 발견과 관리가 삶의 질과 수명 연장에 결정적입니다.</p>

<h2>조기 신호 — 놓치기 쉬운 증상</h2>
<ul>
  <li><strong>물을 많이 마심(다음)</strong>: 건강한 고양이에 비해 음수량이 눈에 띄게 증가</li>
  <li><strong>소변을 많이 봄(다뇨)</strong>: 화장실 방문 횟수·소변량 증가</li>
  <li><strong>체중 감소</strong>: 근육량 감소, 등 척추 돌기가 느껴지기 시작</li>
  <li>식욕 저하, 구토(특히 아침 공복)</li>
  <li>털 윤기 감소, 잦은 그루밍 감소</li>
  <li>무기력, 활동량 감소</li>
</ul>

<h2>IRIS(국제 신장이익학회) 단계 분류</h2>
<table>
  <thead>
    <tr><th>단계</th><th>크레아티닌 (혈중)</th><th>증상</th></tr>
  </thead>
  <tbody>
    <tr><td>1단계</td><td>&lt;1.6 mg/dL</td><td>증상 없음. SDMA 상승으로 조기 발견 가능</td></tr>
    <tr><td>2단계</td><td>1.6~2.8 mg/dL</td><td>가벼운 증상. 대부분 이 시기에 진단</td></tr>
    <tr><td>3단계</td><td>2.9~5.0 mg/dL</td><td>뚜렷한 다음·다뇨, 체중 감소, 구토</td></tr>
    <tr><td>4단계</td><td>&gt;5.0 mg/dL</td><td>심각한 요독증. 집중 치료 필요</td></tr>
  </tbody>
</table>

<h2>진단</h2>
<ul>
  <li>혈액 검사: BUN, 크레아티닌, SDMA (조기 마커), 전해질</li>
  <li>소변 검사: 단백뇨, 비중, 세균 유무</li>
  <li>혈압 측정: CKD와 고혈압 동반 흔함</li>
  <li>복부 초음파: 신장 크기·에코 확인</li>
</ul>

<h2>관리·치료</h2>
<h3>식이 관리 (가장 중요)</h3>
<ul>
  <li><strong>신장 처방식</strong>: 인(Phosphorus) 제한, 단백질 조절, 오메가-3 강화 처방 사료 (수의사 처방 필요)</li>
  <li>충분한 수분 공급: 습식 사료 비중 높이기 또는 흐르는 물 급수기</li>
  <li>임의로 인 수치를 높이는 간식·어류 가공품 제한</li>
</ul>
<h3>약물·보조제</h3>
<ul>
  <li>인 결합제: 음식 내 인 흡수 차단 (수의사 처방)</li>
  <li>고혈압 치료제: 암로디핀 등 (혈압 측정 후 처방)</li>
  <li>단백뇨 감소: RAAS 억제제 처방</li>
  <li>빈혈 치료: 조혈 호르몬 주사 (3~4단계)</li>
</ul>
<h3>모니터링 주기</h3>
<ul>
  <li>1~2단계: 3~6개월마다 혈액·소변·혈압 검사</li>
  <li>3~4단계: 1~3개월마다 (상태에 따라 조정)</li>
</ul>

<h2>예방·조기 발견</h2>
<ul>
  <li>7세 이상 고양이는 연 1~2회 정기 혈액·소변 검사 필수</li>
  <li>SDMA 검사 포함 패널 요청 — 기존 크레아티닌보다 30% 먼저 이상 감지</li>
  <li>음수량 갑자기 증가하면 즉시 수의사 상담</li>
</ul>`,
    disclaimer:
      "본 콘텐츠는 정보 제공 목적으로만 작성되었으며, 의학적 진단·치료를 대체하지 않습니다. 고양이 만성 신부전의 치료 방법과 처방식은 개체의 단계·상태에 따라 다르므로 반드시 수의사와 상담 후 진행하세요.",
    sources: [
      "IRIS Staging of CKD — International Renal Interest Society (2019, 최신 개정)",
      "ISFM Consensus Guidelines on the Diagnosis & Management of Feline CKD (2016)",
      "대한수의사회 고양이 신장 질환 관리 지침 (2023)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-20T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 21. 강아지 분리불안 해결법 (카테고리 5, published) ───────────────────────
  {
    id: "seed-guide-dog-separation-anxiety",
    slug: "dog-separation-anxiety-guide",
    type: "guide",
    category: 5,
    title: "강아지 분리불안 해결법 — 원인부터 단계별 훈련까지",
    metaTitle: "강아지 분리불안 해결 | 원인·증상·훈련 단계별 방법 | 펫지기",
    metaDescription:
      "강아지가 혼자 있을 때 짖기·파괴·배변 실수를 반복한다면 분리불안일 수 있습니다. 원인 분석과 단계별 탈감작 훈련 방법을 정리했습니다.",
    body: `<h2>분리불안이란?</h2>
<p>분리불안(Separation Anxiety)은 강아지가 보호자와 분리되거나 혼자 남겨질 때 극도의 스트레스와 공포를 경험하는 행동 장애입니다. 단순한 '보고 싶음'이 아니라 공황 상태에 가까운 반응으로, 강아지에게 실제 고통을 줍니다.</p>

<h2>분리불안 증상</h2>
<ul>
  <li><strong>보호자 떠나기 직전</strong>: 침 흘리기, 떨기, 문 앞에서 안 떨어지기</li>
  <li><strong>혼자 있는 동안</strong>: 지속적 짖기·울기, 파괴 행동(가구·문틀), 화장실 훈련된 개의 배변 실수</li>
  <li><strong>보호자 귀가 시</strong>: 과도하게 흥분된 반응이 10분 이상 지속</li>
  <li>CCTV·이웃 민원으로 발견되는 경우도 많음</li>
</ul>

<h2>분리불안과 훈련 부족의 차이</h2>
<ul>
  <li>분리불안: 보호자가 없을 때만 증상 발생, 혼자 있는 시간 5분 이내에도 시작</li>
  <li>단순 파괴 행동: 심심함·과잉 에너지가 원인, 산책·운동으로 호전됨</li>
  <li>확인 방법: 외출 후 10분간 CCTV 영상 촬영으로 확인 권장</li>
</ul>

<h2>단계별 탈감작 훈련 (Desensitization)</h2>
<h3>1단계: 출발 신호 중립화</h3>
<ul>
  <li>외출과 연관된 행동(열쇠 집기, 코트 입기)을 외출 없이도 반복해 자극을 중립화</li>
  <li>하루 여러 차례 열쇠를 집었다 내려놓기만 함</li>
</ul>
<h3>2단계: 짧은 분리 연습</h3>
<ul>
  <li>문 너머로 나갔다 즉시 돌아오기(2초) → 3초 → 5초 → 1분 → 5분 순으로 점진적 연장</li>
  <li>성공 기준: 짖음·긁기 없이 기다렸을 때만 시간 연장</li>
  <li>실패 시 이전 단계로 되돌아가기</li>
</ul>
<h3>3단계: 안전 공간 만들기</h3>
<ul>
  <li>켄넬(이동장) 훈련: 켄넬을 좋은 경험과 연결 (그 안에서 간식·밥 주기)</li>
  <li>강요 없이 자발적으로 들어가게 유도</li>
  <li>켄넬은 처벌 도구가 아닌 안전 피난처로 인식시키기</li>
</ul>
<h3>4단계: 출발·귀가 루틴 무감동화</h3>
<ul>
  <li>출발 전 10~15분, 귀가 후 10분은 강아지에게 관심 주지 않기</li>
  <li>조용히 안정된 후에 인사하기 — 과도한 이별·귀가 인사는 분리불안을 강화함</li>
</ul>

<h2>보조 도구 활용</h2>
<ul>
  <li><strong>퍼즐 피더·콩 장난감</strong>: 출발 직전에만 제공 → 외출을 기대하는 경험으로 전환</li>
  <li><strong>칼밍 음악·백색 소음</strong>: 시각 자극 차단, 안정 효과</li>
  <li><strong>페로몬 제품(Adaptil)</strong>: 엄마 개 페로몬 모방. 스트레스 완화 보조</li>
</ul>

<h2>중증 분리불안 시 수의사 상담</h2>
<ul>
  <li>탈감작 훈련에도 진전이 없으면 수의행동학 전문의 상담 권장</li>
  <li>필요 시 항불안 약물 처방 (행동 수정 훈련과 병행)</li>
  <li>훈련 전 갑상선·통증 등 기질적 원인 배제를 위한 신체 검진 권장</li>
</ul>`,
    disclaimer: null,
    sources: [
      "Overall KL — Clinical Behavioral Medicine for Small Animals (2013)",
      "American Veterinary Society of Animal Behavior — Position Statement on Separation Anxiety (2023)",
      "Landsberg GM et al. — Behavior Problems of the Dog and Cat, 3rd Ed. (2013)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-20T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 22. 고양이 중성화 수술 가이드 (카테고리 1, published) ────────────────────
  {
    id: "seed-guide-cat-neutering-guide",
    slug: "cat-neutering-spaying-guide",
    type: "guide",
    category: 1,
    title: "고양이 중성화 수술 완전 가이드 — 시기·비용·회복",
    metaTitle: "고양이 중성화 수술 | 시기·비용·회복 기간·장단점 | 펫지기",
    metaDescription:
      "고양이 중성화(암컷 난소·자궁 제거, 수컷 고환 제거) 수술의 권장 시기, 수술 전후 주의사항, 비용, 건강상 이점을 정리했습니다.",
    body: `<h2>고양이 중성화 수술이란?</h2>
<p>수컷은 고환 제거(Castration), 암컷은 난소·자궁 제거(Ovariohysterectomy, OHE)를 통해 번식 능력을 없애는 수술입니다. 고양이 개체 수 조절, 건강상 이점, 문제 행동 완화 등 다양한 목적으로 권장됩니다.</p>

<h2>권장 수술 시기</h2>
<ul>
  <li><strong>일반적 권장</strong>: 생후 4~6개월 (첫 발정 전)</li>
  <li><strong>수컷</strong>: 고환이 음낭 내로 완전히 하강한 후. 대부분 4~5개월</li>
  <li><strong>암컷</strong>: 첫 발정 전(4~5개월) 수술이 유방 종양 예방 효과 가장 높음</li>
  <li>성묘도 수술 가능하지만 건강 이점은 어릴수록 큼</li>
</ul>

<h2>수술의 건강상 이점</h2>
<h3>암컷</h3>
<ul>
  <li>유방 종양 발생 위험 크게 감소 (첫 발정 전 수술 시 위험 0.5%로 감소)</li>
  <li>자궁 축농증(Pyometra) 예방 — 중성화하지 않은 암컷의 생명을 위협하는 응급 질환</li>
  <li>발정 스트레스·수컷 유인 행동 제거</li>
</ul>
<h3>수컷</h3>
<ul>
  <li>고환 종양 완전 예방</li>
  <li>전립선 비대·전립선염 위험 감소</li>
  <li>영역 표시(스프레이), 무단 탈출, 공격 행동 크게 감소</li>
</ul>

<h2>수술 전 준비</h2>
<ul>
  <li><strong>금식</strong>: 전신마취 전 8~12시간 금식 (물도 6시간 전 중단, 수의사 지시 따를 것)</li>
  <li>건강 상태 확인: 기침·설사·발열 등 이상 시 수술 연기</li>
  <li>이동장 준비: 수술 후 이동 시 흔들림 최소화</li>
</ul>

<h2>수술 후 회복</h2>
<ul>
  <li><strong>당일</strong>: 마취 깨는 중 비틀거림·구토 가능. 따뜻하고 조용한 공간에서 관찰</li>
  <li><strong>1~3일</strong>: 활동량 감소, 식욕 저하 가능. 억지로 먹이지 않아도 됨</li>
  <li><strong>상처 관리</strong>: 핥지 않도록 넥칼라 착용 (7~10일)</li>
  <li><strong>실밥 제거</strong>: 10~14일 후 병원 재방문 (흡수성 실이면 생략)</li>
  <li>2주간 목욕·점프 제한</li>
</ul>

<h2>비용 및 지자체 지원</h2>
<ul>
  <li>수컷 수술비: 5~15만 원 내외</li>
  <li>암컷 수술비: 15~30만 원 내외 (복부 개복 여부에 따라 차이)</li>
  <li><strong>지자체 지원</strong>: 많은 지자체에서 중성화 수술 비용 일부 지원. 거주지 시·군·구청 동물보호팀에 신청 방법 문의</li>
</ul>

<h2>중성화 후 주의사항 — 체중 관리</h2>
<p>중성화 후 기초대사량이 감소하고 식욕이 증가해 비만 위험이 높아집니다. 수술 후 약 6개월 내 사료량을 10~20% 줄이고 정기적으로 체중을 확인하세요.</p>`,
    disclaimer: null,
    sources: [
      "American Veterinary Medical Association — Spay/Neuter Guidelines (2023)",
      "농림축산식품부 반려동물 중성화 수술 지원 사업 안내 (2024)",
      "Korean Journal of Veterinary Clinical Sciences — 반려묘 중성화 현황 (2022)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-20T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },
  // ── 23. 강아지 외이염 (condition, cat.3, YMYL, published) ─────────────────────
  {
    id: "seed-condition-dog-ear-infection",
    slug: "dog-ear-infection",
    type: "condition",
    category: 3,
    title: "강아지 외이염 — 증상·원인·치료 방법",
    metaTitle: "강아지 외이염 증상·원인·치료 | 수의사 검토 | 펫지기",
    metaDescription:
      "강아지 외이염(외이도염) 원인, 주요 증상, 예방법을 수의사 검토를 거쳐 안내합니다. 귀 긁음·냄새·분비물이 있다면 확인하세요.",
    body: `<h2>외이염이란?</h2>
<p>외이염(Otitis Externa)은 귓바퀴부터 고막까지 이어지는 외이도에 염증이 생긴 상태입니다. 강아지에서 매우 흔한 질환으로, 방치하면 중이염·내이염으로 진행될 수 있습니다.</p>

<h2>주요 증상</h2>
<ul>
  <li>귀를 자주 긁거나 바닥에 문지름</li>
  <li>귀에서 불쾌한 냄새가 남</li>
  <li>귀 안에 갈색·노란색·검은색 분비물</li>
  <li>귀가 붉게 부어오름</li>
  <li>머리를 한쪽으로 기울이거나 고개를 흔듦</li>
  <li>귀 주변 털이 빠지거나 피부가 짓무름</li>
</ul>

<h2>주요 원인</h2>
<ul>
  <li><strong>효모(Malassezia)</strong>: 가장 흔한 원인 중 하나. 따뜻하고 습한 귓속에서 과증식</li>
  <li><strong>세균 감염</strong>: Staphylococcus, Pseudomonas 등</li>
  <li><strong>귀 진드기</strong>: Otodectes cynotis. 특히 어린 강아지에서 흔함</li>
  <li><strong>알레르기</strong>: 식이 알레르기나 환경 알레르기가 만성 외이염의 배경인 경우 많음</li>
  <li><strong>귀 구조</strong>: 처진 귀(코커 스파니얼, 바셋 하운드 등)는 통기가 잘 안 되어 발생률이 높음</li>
  <li><strong>이물질·과도한 귀 청소</strong>: 면봉이나 귀 청소 과다 시 정상 귀 환경 파괴</li>
</ul>

<h2>진단 방법</h2>
<p>수의사가 검이경(이경)으로 외이도를 관찰하고, 귀 세척물을 현미경으로 검사(이도 세포진)해 원인균을 확인합니다. 세균 감염 시 배양 감수성 검사를 시행하기도 합니다.</p>

<h2>치료 방향</h2>
<p>치료는 원인에 따라 달라지므로 반드시 수의사의 진단 후 처방을 따르세요. 일반적으로 귀 세정과 처방 이어드롭(귀약)을 병행합니다. 만성·재발성 외이염의 경우 알레르기 원인 파악이 중요합니다.</p>

<h2>예방 및 가정 관리</h2>
<ul>
  <li>수영·목욕 후 귀 안을 부드럽게 건조시켜 줍니다.</li>
  <li>전용 귀 세정제로 주 1~2회 청소 (수의사 지도하에)</li>
  <li>과도한 청소나 면봉 사용은 피합니다.</li>
  <li>알레르기가 원인인 경우 알레르기 유발 원인 파악·관리가 필수입니다.</li>
</ul>

<h3>언제 즉시 병원에 가야 하나요?</h3>
<p>증상이 2~3일 이상 지속되거나, 귀에서 피가 나거나, 머리를 한쪽으로 심하게 기울이는 경우, 평형 감각 이상(빙글빙글 도는 행동)이 보이는 경우 즉시 수의사를 방문하세요.</p>`,
    disclaimer:
      "본 콘텐츠는 일반적인 교육·참고 목적이며 수의학적 진단이나 치료를 대체하지 않습니다. 증상이 의심되면 수의사에게 진료를 받으세요.",
    sources: [
      "Gotthelf LN. Small Animal Ear Diseases, 2nd ed. Saunders/Elsevier (2005)",
      "Nuttall TJ et al. Otitis in the dog and cat. In Practice (2018)",
      "대한수의사회 반려견 외이도 질환 진료 가이드라인 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-16T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 24. 고양이 갑상선기능항진증 (condition, cat.3, YMYL, published) ──────────
  {
    id: "seed-condition-cat-hyperthyroidism",
    slug: "cat-hyperthyroidism",
    type: "condition",
    category: 3,
    title: "고양이 갑상선기능항진증 — 증상·원인·관리",
    metaTitle: "고양이 갑상선기능항진증 증상·원인·관리 | 수의사 검토 | 펫지기",
    metaDescription:
      "노령 고양이에서 흔한 갑상선기능항진증의 증상(체중 감소, 과식, 다음다뇨), 원인, 치료 방향을 수의사 검토를 거쳐 안내합니다.",
    body: `<h2>갑상선기능항진증이란?</h2>
<p>갑상선기능항진증(Hyperthyroidism)은 갑상선에서 갑상선호르몬(T3·T4)이 과다하게 분비되는 질환입니다. 고양이에서 가장 흔한 내분비 질환 중 하나이며, 주로 10세 이상 노령묘에서 발생합니다.</p>

<h2>주요 증상</h2>
<ul>
  <li><strong>체중 감소</strong>: 많이 먹는데도 살이 빠짐 (가장 특징적인 증상)</li>
  <li><strong>식욕 증가</strong>: 항상 배고파하거나 음식에 집착</li>
  <li><strong>활동성 증가·불안</strong>: 밤에 자지 않고 돌아다님, 안절부절</li>
  <li><strong>다음·다뇨</strong>: 물을 많이 마시고 소변량 증가</li>
  <li><strong>구토·설사</strong>: 빠른 음식 섭취로 인한 위장 증상</li>
  <li><strong>털 상태 악화</strong>: 털이 거칠어지거나 엉킴</li>
  <li><strong>심박 증가</strong>: 수의사가 청진 시 확인 가능</li>
</ul>

<h2>원인</h2>
<p>대부분(98%)은 갑상선의 양성 선종(Adenoma) 또는 과형성(Hyperplasia)으로 발생합니다. 갑상선 암종은 드뭅니다. 환경 요인(식이, 캔 사료 포장재의 BPA 등)이 거론되나 명확히 밝혀진 원인은 없습니다.</p>

<h2>진단</h2>
<p>혈액 검사로 T4(총 티록신) 농도를 측정합니다. T4가 정상 범위를 초과하면 갑상선기능항진증으로 진단합니다. 노령묘에서 신장 기능도 함께 확인하는 것이 중요합니다(갑상선 치료 시 신부전이 드러날 수 있어서).</p>

<h2>치료 방향</h2>
<p>치료 방법은 수의사와 함께 고양이의 전신 상태와 보호자 여건을 고려해 결정합니다. 일반적인 치료 방향에는 약물 치료, 방사성 요오드 치료, 수술, 식이 관리 등이 있습니다. 각 방법의 적합 여부는 반드시 수의사가 판단합니다.</p>

<h2>모니터링 및 생활 관리</h2>
<ul>
  <li>치료 시작 후 2~4주 이내에 혈액 검사로 T4·신기능 재검이 필요합니다.</li>
  <li>체중·식욕·활동량 변화를 주기적으로 기록하세요.</li>
  <li>정기 혈액 검사(3~6개월 간격)로 갑상선·신장 기능을 모니터링합니다.</li>
</ul>

<h3>언제 즉시 병원에 가야 하나요?</h3>
<p>호흡 곤란, 입을 벌리고 숨쉬기, 기절, 심한 무기력이 나타나면 즉시 응급 동물병원을 방문하세요.</p>`,
    disclaimer:
      "본 콘텐츠는 일반적인 교육·참고 목적이며 수의학적 진단이나 치료를 대체하지 않습니다. 증상이 의심되면 수의사에게 진료를 받으세요.",
    sources: [
      "Feldman EC, Nelson RW. Feline Hyperthyroidism. In: Canine and Feline Endocrinology (4th ed.) (2015)",
      "Scott-Moncrieff JC. Feline hyperthyroidism. In: Textbook of Veterinary Internal Medicine (2017)",
      "대한수의학회 소동물내과학 교과서 갑상선 질환 챕터 (2021)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-17T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 25. 강아지 고관절 이형성증 (condition, cat.3, YMYL, published) ────────────
  {
    id: "seed-condition-dog-hip-dysplasia",
    slug: "dog-hip-dysplasia",
    type: "condition",
    category: 3,
    title: "강아지 고관절 이형성증(HD) — 증상·원인·관리",
    metaTitle: "강아지 고관절 이형성증 증상·원인·관리 | 수의사 검토 | 펫지기",
    metaDescription:
      "대형견에서 흔한 고관절 이형성증(고관절 형성부전)의 증상, 유전적 원인, 체중·운동 관리 방법을 수의사 검토를 거쳐 안내합니다.",
    body: `<h2>고관절 이형성증이란?</h2>
<p>고관절 이형성증(Hip Dysplasia, HD)은 대퇴골두와 골반 소켓(비구)이 정상적으로 맞물리지 않아 관절이 느슨해지고 관절염으로 진행되는 유전성 골격 질환입니다. 골든 리트리버, 래브라도 리트리버, 저먼 셰퍼드, 로트와일러, 버니즈 마운틴 독 등 대형·초대형견에서 발생률이 높습니다.</p>

<h2>주요 증상</h2>
<ul>
  <li><strong>뒷다리 절뚝임</strong>: 특히 운동 후 또는 잠에서 깬 직후 두드러짐</li>
  <li><strong>계단·점프 기피</strong>: 오르막길이나 뛰는 것을 꺼림</li>
  <li><strong>특이 걸음걸이</strong>: 뒷다리를 모아서 걷는 "토끼 뛰기" 모양</li>
  <li><strong>뒷다리 근육 위축</strong>: 엉덩이 주변 근육이 앞다리보다 가늘어짐</li>
  <li><strong>고관절 통증</strong>: 엉덩이를 만지면 통증 반응</li>
  <li><strong>활동 의욕 저하</strong>: 놀기 싫어하거나 쉽게 지침</li>
</ul>

<h2>원인 및 위험 요인</h2>
<ul>
  <li><strong>유전적 요인</strong>: 가장 큰 원인. 부모 견의 고관절 점수(OFA·BVA·PennHIP) 확인이 중요</li>
  <li><strong>빠른 성장</strong>: 대형견 강아지기에 고칼로리 식이로 너무 빨리 성장하면 관절 부하 증가</li>
  <li><strong>과체중</strong>: 체중이 관절에 추가 부하를 줌</li>
  <li><strong>격렬한 운동</strong>: 어린 시기 과도한 달리기·점프·계단 이용</li>
</ul>

<h2>진단</h2>
<p>수의사가 신체 검사(Ortolani test 등)와 방사선(X-ray) 촬영으로 진단합니다. PennHIP 검사는 2세 미만에서도 발생 위험을 예측할 수 있습니다.</p>

<h2>치료 방향 및 관리</h2>
<p>증상 경중에 따라 내과적(비수술) 또는 외과적(수술) 방법을 선택합니다. 치료 방향은 수의사와 상의하세요.</p>
<ul>
  <li><strong>체중 관리</strong>: 이상 체중 유지가 관절 부하를 줄이는 가장 중요한 요소</li>
  <li><strong>적정 운동</strong>: 수영 등 저충격 유산소 운동은 근육 유지에 도움 — 달리기·점프는 절제</li>
  <li><strong>환경 개선</strong>: 미끄럼 방지 매트, 계단 경사로, 침대·소파 높이 낮추기</li>
  <li><strong>관절 보조제</strong>: 글루코사민·오메가-3 등 — 효과는 개체마다 다를 수 있으며 수의사 상담 권장</li>
</ul>

<h2>예방 — 번식 선택</h2>
<p>입양 전 부모 견의 고관절 검사 결과(OFA Normal 이상)를 확인하세요. 국내 브리더에게 성적증명서를 요청할 수 있습니다.</p>

<h3>언제 즉시 병원에 가야 하나요?</h3>
<p>뒷다리를 전혀 사용하지 못하거나, 극심한 통증으로 울부짖거나, 배변·배뇨 조절 이상이 보이면 즉시 수의사를 방문하세요.</p>`,
    disclaimer:
      "본 콘텐츠는 일반적인 교육·참고 목적이며 수의학적 진단이나 치료를 대체하지 않습니다. 증상이 의심되면 수의사에게 진료를 받으세요.",
    sources: [
      "Orthopedic Foundation for Animals (OFA) — Hip Dysplasia Statistics and Guidelines",
      "Smith GK et al. Evaluation of risk factors for degenerative joint disease. JAVMA (2001)",
      "대한수의사회 반려견 고관절질환 진료 가이드라인 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-18T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 26. 퍼피 첫 해 완전 가이드 (guide, cat.1, published) ─────────────────────
  {
    id: "seed-guide-puppy-first-year",
    slug: "puppy-first-year-guide",
    type: "guide",
    category: 1,
    title: "퍼피 첫 해 완전 가이드 — 입양부터 1세까지",
    metaTitle: "퍼피 첫 해 가이드 | 예방접종·이유식·훈련·사회화 | 펫지기",
    metaDescription:
      "강아지를 처음 맞이하는 첫 해, 예방접종·영양·기본 훈련·사회화까지 월령별로 정리한 퍼피 완전 가이드입니다.",
    body: `<h2>퍼피 입양 전 준비사항</h2>
<p>강아지를 데려오기 전 집을 퍼피 안전하게 만드세요. 전선, 쓰레기통, 세제, 독성 식물은 손이 닿지 않는 곳에 두고, 화장실 위치, 잠자리, 급식 공간을 미리 정해두세요.</p>
<ul>
  <li>급식 그릇·물그릇, 크레이트(이동장) 또는 펜, 배변패드, 산책 줄·하네스, 장난감·씹는 간식</li>
  <li>입양 후 3일 이내: 초기 건강검진 예약 (기존 질환·구충 상태 확인)</li>
  <li>근처 24시간 응급 동물병원 위치·전화번호 사전 파악</li>
</ul>

<h2>월령별 핵심 체크리스트</h2>

<h3>생후 8~10주 — 첫 입양 시기</h3>
<ul>
  <li>1차 종합백신(DHPPL) 접종 또는 접종 여부 확인</li>
  <li>구충 (회충·조충 구충제 투여)</li>
  <li>집 적응 기간: 조용한 환경에서 24~48시간 탐색 시간 주기</li>
  <li>이름 부르기 + 보상 기반 훈련 시작</li>
</ul>

<h3>생후 10~12주 — 사회화 황금기</h3>
<ul>
  <li>2차 종합백신 접종</li>
  <li>다양한 사람·소리·장소에 긍정적으로 노출 (사회화 창기 마감 전 집중)</li>
  <li>배변 훈련 꾸준히: 식후 15분, 낮잠 후, 놀이 후 화장실로 안내</li>
  <li>크레이트 훈련 시작 — 안전한 공간으로 인식하게 긍정 연계</li>
</ul>

<h3>생후 12~16주</h3>
<ul>
  <li>3~5차 종합백신 완성 (수의사 일정에 따라)</li>
  <li>켄넬코프, 코로나장염, 인플루엔자 접종</li>
  <li>기초 명령 훈련: "앉아", "기다려", "이리와" — 짧은 세션(5분 이내) 반복</li>
  <li>목줄·하네스 적응 훈련</li>
</ul>

<h3>생후 4~6개월</h3>
<ul>
  <li>광견병 접종 (생후 3개월 이상, 연 1회 갱신)</li>
  <li>동물등록 (생후 2개월 이상 의무 등록)</li>
  <li>유치→영구치 교체 시기: 씹는 장난감 충분히 제공, 치아 발달 모니터링</li>
  <li>중성화 수술 시기 수의사와 상담 (일반적으로 5~9개월 사이)</li>
</ul>

<h3>생후 6~12개월</h3>
<ul>
  <li>청소년기 에너지 최고조 — 하루 2회 충분한 운동</li>
  <li>그룹 강아지 교실 또는 행동 수업 참여 권장</li>
  <li>연 1회 정기 건강검진 루틴 확립</li>
  <li>성견 사료로의 전환 시기 (수의사 권고에 따라)</li>
</ul>

<h2>퍼피 영양 — 기본 원칙</h2>
<ul>
  <li>AAFCO "All Life Stages" 또는 "Puppy" 영양 기준 충족 제품 선택</li>
  <li>대형견 퍼피는 "Large Breed Puppy" 전용 사료: 칼슘·인 비율이 중요</li>
  <li>하루 급여량을 3~4회로 나눠 급여 (생후 4개월 이후 3회, 6개월 이후 2회로 줄여나감)</li>
  <li>과식·과체중 방지: 갈비뼈가 손으로 만져지되 눈으로 보이지 않는 상태가 이상적</li>
</ul>

<h2>퍼피 행동 문제 대처</h2>
<ul>
  <li><strong>물기</strong>: "아야" 소리 후 놀이 중단 — 이빨이 피부에 닿으면 즉시 중단 신호</li>
  <li><strong>짖기</strong>: 원인 파악 (무서움·지루함·주의 요구) 후 욕구 해소</li>
  <li><strong>분리불안</strong>: 단계적으로 혼자 있는 시간 늘리기, 떠나고 돌아올 때 과도한 반응 자제</li>
  <li><strong>씹기</strong>: 허용된 씹는 장난감으로 리다이렉션</li>
</ul>`,
    disclaimer: null,
    sources: [
      "American Veterinary Society of Animal Behavior — Puppy Socialization Guidelines (2022)",
      "AAHA Canine Vaccination Guidelines (2022)",
      "농림축산검역본부 동물등록제 안내 (2024)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-17T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 27. 고양이 화장실·모래 완전 가이드 (guide, cat.5, published) ──────────────
  {
    id: "seed-guide-cat-litter-guide",
    slug: "cat-litter-guide",
    type: "guide",
    category: 5,
    title: "고양이 화장실·모래 선택 가이드 — 종류별 비교와 위치 설정",
    metaTitle: "고양이 화장실·모래 선택 가이드 | 종류·위치·청소 방법 | 펫지기",
    metaDescription:
      "고양이 화장실 종류(일반형·후드형·자동형)와 모래(벤토나이트·두부·실리카·목재) 비교. 위치 설정과 청소 주기를 정리했습니다.",
    body: `<h2>고양이 화장실의 기본 원칙</h2>
<p>고양이가 화장실을 잘 사용하지 않는 것은 가장 흔한 행동 문제 중 하나입니다. 화장실 문제의 대부분은 올바른 화장실 선택, 위치, 청소 주기로 예방할 수 있습니다.</p>
<p><strong>황금 규칙</strong>: 고양이 수 + 1개 이상의 화장실을 준비하세요.</p>

<h2>화장실 종류 비교</h2>

<h3>오픈형 (일반형)</h3>
<ul>
  <li><strong>장점</strong>: 통기성 좋음, 대부분의 고양이가 선호, 청소 쉬움</li>
  <li><strong>단점</strong>: 모래 비산이 많음, 냄새가 외부로 퍼질 수 있음</li>
  <li><strong>추천 대상</strong>: 화장실 거부가 없는 고양이, 처음 화장실을 세팅할 때</li>
</ul>

<h3>후드형 (뚜껑형)</h3>
<ul>
  <li><strong>장점</strong>: 모래 비산 감소, 냄새 억제, 사생활 보호</li>
  <li><strong>단점</strong>: 공기 순환이 줄어 냄새 축적 빠름(청소 더 자주 필요), 큰 고양이는 협소할 수 있음</li>
  <li><strong>추천 대상</strong>: 모래 비산이 심한 고양이, 집 인테리어 중시</li>
</ul>

<h3>자동 청소형 (전동형)</h3>
<ul>
  <li><strong>장점</strong>: 자동으로 배설물 제거, 보호자 편의성 높음</li>
  <li><strong>단점</strong>: 가격 높음, 소음에 예민한 고양이는 거부 가능, 고장 시 관리 복잡</li>
  <li><strong>추천 대상</strong>: 바쁜 보호자, 다묘 가정</li>
</ul>

<h2>모래 종류 비교</h2>

<h3>벤토나이트(응고형 클레이) 모래</h3>
<ul>
  <li>응고력·탈취력 우수, 가격 합리적</li>
  <li>무거움, 먼지 많음, 폐 질환 위험(먼지 적은 제품 선택 권장)</li>
</ul>

<h3>두부·옥수수 모래</h3>
<ul>
  <li>천연 소재, 가벼움, 먼지 적음, 변기 배출 가능(제품마다 다름)</li>
  <li>응고력이 클레이보다 약할 수 있음, 곰팡이 주의(습기 관리 필요)</li>
</ul>

<h3>실리카 모래</h3>
<ul>
  <li>탈취력 최상, 교체 주기 길음(월 1~2회)</li>
  <li>응고되지 않음(액체 흡수), 고양이에 따라 발바닥 불편 가능</li>
</ul>

<h3>목재(소나무·편백) 모래</h3>
<ul>
  <li>자연 향, 친환경</li>
  <li>고양이에 따라 낯선 향에 거부 반응 가능</li>
</ul>

<h2>화장실 위치 설정</h2>
<ul>
  <li>조용하고 사생활이 보장되는 곳에 배치 (화장실·세탁기 옆은 소음으로 기피 유발)</li>
  <li>식사 공간과 멀리 떨어진 곳</li>
  <li>한 층에 최소 1개 이상 배치</li>
  <li>노령묘·관절 문제가 있는 경우 낮은 입구 화장실 사용</li>
</ul>

<h2>청소 주기</h2>
<ul>
  <li><strong>매일</strong>: 고형 배설물 및 응고된 소변 덩어리 제거</li>
  <li><strong>주 1~2회</strong>: 모래 보충 (응고형 기준)</li>
  <li><strong>월 1~2회</strong>: 화장실 통 전체 세척 후 새 모래 교체</li>
  <li><strong>실리카 모래</strong>: 고형물만 매일 제거, 월 1~2회 전량 교체</li>
</ul>

<h2>화장실 거부 해결 팁</h2>
<p>고양이가 갑자기 화장실을 거부한다면 의학적 원인(FLUTD, 방광염 등)을 먼저 배제해야 합니다. 의학적 문제가 없다면 화장실 크기·모래 종류·위치 변화를 점검하세요.</p>`,
    disclaimer: null,
    sources: [
      "Overall KL. Manual of Clinical Behavioral Medicine for Dogs and Cats. Elsevier (2013)",
      "Ellis SLH et al. ISFM and AAFP Feline Environmental Needs Guidelines. J Feline Med Surg (2013)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-18T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 29. 고양이 사료 선택 가이드 (guide, cat.2, published) ────────────────────
  {
    id: "seed-guide-cat-food-guide",
    slug: "cat-food-guide",
    type: "guide",
    category: 2,
    title: "고양이 사료 선택 가이드 — 습식·건식·생식 비교와 성분 보는 법",
    metaTitle: "고양이 사료 선택 가이드 | 습식·건식·원료 성분 분석 | 펫지기",
    metaDescription:
      "고양이 사료 종류(습식·건식·생식)별 장단점과 성분 표시 보는 법, 나이별 추천 기준을 정리했습니다. AAFCO·FEDIAF 기준 충족 여부 확인 방법도 안내합니다.",
    body: `<h2>고양이에게 올바른 영양이 중요한 이유</h2>
<p>고양이는 육식 동물(Obligate Carnivore)입니다. 개와 달리 타우린·아라키돈산·비타민 A를 음식에서 직접 섭취해야 하며, 단백질 요구량이 매우 높습니다. 영양 불균형은 요로계 질환(FLUTD), 신장 질환, 비만 등 다양한 건강 문제로 이어집니다.</p>

<h2>사료 종류 비교</h2>

<h3>건식 사료 (드라이 키블)</h3>
<ul>
  <li><strong>장점</strong>: 보관 편리, 치석 제거 효과(일부 제품), 비용 효율적</li>
  <li><strong>단점</strong>: 수분 함량 낮음(8~12%) — 수분 섭취량 보충 필요, 탄수화물 함량이 높은 제품 많음</li>
  <li><strong>주의</strong>: 비뇨기 질환이 있거나 물을 잘 마시지 않는 고양이에게는 습식 혼합 급여 권장</li>
</ul>

<h3>습식 사료 (캔·파우치)</h3>
<ul>
  <li><strong>장점</strong>: 수분 함량 높음(70~80%) — 신장·방광 건강에 유리, 단백질 함량 높고 탄수화물 낮음</li>
  <li><strong>단점</strong>: 비용 높음, 개봉 후 빠른 소비 필요, 치석 관리 건식보다 불리</li>
  <li><strong>추천 대상</strong>: FLUTD 이력, 만성신부전 고양이, 물을 잘 마시지 않는 고양이</li>
</ul>

<h3>생식 / 자연식</h3>
<ul>
  <li><strong>장점</strong>: 자연에 가까운 식이, 탄수화물 최소화</li>
  <li><strong>단점</strong>: 영양 불균형 위험(전문 처방 없이는 어려움), 살모넬라·리스테리아 감염 위험, 비용 높음</li>
  <li><strong>주의</strong>: 생식을 선택한다면 반드시 수의사·영양사 처방 레시피를 사용하고 사람용 안전 기준으로 취급하세요.</li>
</ul>

<h2>사료 성분 표시 보는 법</h2>
<p>원료는 무게 순으로 기재됩니다. 첫 번째 성분이 가장 많이 들어 있습니다.</p>
<ul>
  <li><strong>첫 번째 원료가 육류여야 합니다</strong>: "닭고기", "연어", "참치" 등 (명시된 육류 원료 > 육류 분말/부산물 혼합 제품)</li>
  <li><strong>AAFCO 또는 FEDIAF 기준 충족 표시 확인</strong>: "Complete and Balanced" 또는 "완전 영양"</li>
  <li><strong>생애주기 표시 확인</strong>: "All Life Stages", "Adult", "Senior" — 나이에 맞는 제품 선택</li>
  <li><strong>타우린 포함 여부</strong>: 고양이 전용 사료에는 반드시 타우린이 포함돼야 합니다.</li>
</ul>

<h2>생애주기별 선택 기준</h2>
<ul>
  <li><strong>키튼(1세 미만)</strong>: 키튼용 또는 All Life Stages 사료 — 단백질·칼슘·DHA 함량 높은 제품</li>
  <li><strong>성묘(1~7세)</strong>: Adult 고양이용, 체중에 맞는 급여량 준수</li>
  <li><strong>노령묘(7세+)</strong>: Senior 또는 신장 지지 포뮬러 — 인 함량 낮고 단백질 소화율 높은 제품. 수의사와 상담 권장</li>
</ul>

<h2>급여량과 비만 예방</h2>
<ul>
  <li>중성화 고양이는 에너지 요구량이 20~30% 감소합니다 — 사료량도 줄여야 합니다.</li>
  <li>자유 급식(사료를 항상 채워두기)은 비만의 주원인이 됩니다. 정해진 시간에 정해진 양을 급여하세요.</li>
  <li>이상 체중 기준: 갈비뼈를 손으로 느낄 수 있되 눈에 보이지 않아야 합니다.</li>
</ul>`,
    disclaimer: null,
    sources: [
      "Association of American Feed Control Officials (AAFCO) — Model Regulations Cat Nutrient Profiles (2024)",
      "FEDIAF — Nutritional Guidelines for Complete and Complementary Pet Food (2023)",
      "대한수의사회 반려동물 영양 가이드라인 (2022)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-18T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 30. 강아지 영양 기초 가이드 (guide, cat.2, published) ──────────────────────
  {
    id: "seed-guide-dog-nutrition-basics",
    slug: "dog-nutrition-basics",
    type: "guide",
    category: 2,
    title: "강아지 영양 기초 가이드 — 5대 영양소와 올바른 급여 방법",
    metaTitle: "강아지 영양 기초 | 5대 영양소·급여량·금지 음식 | 펫지기",
    metaDescription:
      "강아지에게 필요한 5대 영양소(단백질·지방·탄수화물·비타민·미네랄)와 생애주기별 올바른 급여 방법, 영양제 선택 기준을 정리했습니다.",
    body: `<h2>강아지에게 필요한 5대 영양소</h2>

<h3>1. 단백질</h3>
<p>근육 형성, 효소·호르몬 생성, 면역 기능에 핵심 역할을 합니다. 강아지는 성견 기준 건조 중량(DM) 기준 18% 이상의 단백질이 필요합니다. 좋은 단백질 원료: 닭고기, 소고기, 연어, 달걀 등 명시된 동물성 원료.</p>

<h3>2. 지방</h3>
<p>에너지원, 지용성 비타민(A·D·E·K) 흡수 매개체, 피모 건강에 필요합니다. 오메가-3(EPA·DHA)는 피부·관절·뇌 기능에 도움이 됩니다. 생선 오일이 좋은 오메가-3 공급원입니다.</p>

<h3>3. 탄수화물</h3>
<p>강아지는 탄수화물 필수 요구량이 없지만, 적당량은 에너지 공급·장 건강에 도움이 됩니다. 쌀, 고구마, 귀리 등 소화 가능한 복합 탄수화물이 좋은 선택입니다.</p>

<h3>4. 비타민</h3>
<p>완전 영양(Complete and Balanced) 사료를 먹는 강아지는 추가 비타민 보충이 불필요합니다. 과잉 보충(특히 지용성 비타민 A·D)은 독성을 유발할 수 있습니다.</p>

<h3>5. 미네랄</h3>
<p>칼슘·인의 비율이 특히 중요합니다(1.2:1~2:1). 대형견 퍼피는 칼슘 과잉 섭취 시 골격 이상이 올 수 있으므로 성견용 보조제 추가는 피하세요.</p>

<h2>올바른 사료 선택 방법</h2>
<ul>
  <li>AAFCO "Complete and Balanced" 표시 또는 FEDIAF 기준 충족 확인</li>
  <li>생애주기에 맞는 사료 선택: Puppy / Adult / Senior / Large Breed</li>
  <li>원료 표시 첫 번째가 육류 원료인 제품 선택</li>
  <li>부산물(By-product)은 품질이 낮다는 오해가 있지만, 규격화된 부산물은 영양가가 있습니다. 원료 출처를 신뢰할 수 있는 제조사 선택이 더 중요합니다.</li>
</ul>

<h2>급여량과 급여 횟수</h2>
<ul>
  <li><strong>퍼피(6개월 미만)</strong>: 하루 3~4회 분할 급여</li>
  <li><strong>성견</strong>: 하루 2회 (아침·저녁)</li>
  <li><strong>노령견</strong>: 소량 자주 (소화 기능 저하 고려)</li>
  <li>사료 포장의 권장 급여량은 참고값 — 실제 체중·활동량에 맞게 조절하고 이상 체중 유지를 우선시하세요.</li>
</ul>

<h2>피해야 할 음식</h2>
<p>포도·건포도, 양파·마늘, 초콜릿, 자일리톨, 아보카도, 마카다미아, 알코올, 카페인은 강아지에게 독성이 있습니다.
자세한 내용은 <a href="/guide/pet-toxic-foods-complete-guide">반려동물 금지 음식 완전 가이드</a>를 참고하세요.</p>

<h2>영양제 선택 기준</h2>
<ul>
  <li>완전 영양 사료를 먹는 건강한 강아지에게 대부분의 영양제는 불필요합니다.</li>
  <li>관절 보조제(글루코사민·콘드로이틴): 노령견·대형견에서 고려 가능 — 수의사 상담 권장</li>
  <li>오메가-3(생선 오일): 피부·피모·관절 지원. 적정 용량은 체중 기준으로 계산합니다.</li>
  <li>프로바이오틱스: 장 건강 이슈가 있는 경우 수의사 처방 제품 사용</li>
</ul>`,
    disclaimer: null,
    sources: [
      "AAFCO Dog Food Nutrient Profiles (2024)",
      "National Research Council — Nutrient Requirements of Dogs and Cats (2006)",
      "대한수의사회 반려동물 영양 가이드라인 (2022)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-19T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 31. 강아지 간질·발작 (condition, cat.3, YMYL, published) ──────────────────
  {
    id: "seed-condition-dog-epilepsy",
    slug: "dog-epilepsy",
    type: "condition",
    category: 3,
    title: "강아지 간질·발작 — 증상·원인·응급 대처",
    metaTitle: "강아지 간질·발작 증상·원인·응급 대처 | 수의사 검토 | 펫지기",
    metaDescription:
      "강아지 발작(경련)의 증상, 원인(특발성 간질·뇌종양·저혈당 등), 발작 중 응급 대처 방법을 수의사 검토를 거쳐 안내합니다.",
    body: `<h2>발작이란?</h2>
<p>발작(경련)은 뇌 신경세포에서 비정상적인 전기 활동이 발생하면서 일어나는 갑작스러운 신경 이상 반응입니다. 강아지 발작의 원인은 매우 다양하며, 원인에 따라 치료 방향이 달라집니다.</p>

<h2>발작의 종류와 증상</h2>

<h3>대발작 (Grand Mal)</h3>
<ul>
  <li>갑자기 쓰러짐</li>
  <li>몸 전체 경직 후 팔다리를 자전거 타듯 허공에 흔듦</li>
  <li>의식 소실, 눈 뒤집힘</li>
  <li>침 흘림, 비자발적 배변·배뇨</li>
  <li>대부분 1~2분 이내에 자연 종료</li>
</ul>

<h3>소발작 및 부분 발작</h3>
<ul>
  <li>얼굴 씰룩임, 한쪽 다리만 경련</li>
  <li>갑자기 허공을 무는 "플라이 캐칭" 행동</li>
  <li>일시적 의식 변화 (멍한 상태)</li>
</ul>

<h3>발작 후 상태 (Postictal Phase)</h3>
<p>발작 직후 일시적으로 방향 감각 상실, 눈이 잘 안 보이는 것처럼 행동, 비틀거림, 극도의 피로·배고픔이 나타날 수 있습니다. 수분에서 수 시간 지속될 수 있습니다.</p>

<h2>주요 원인</h2>
<ul>
  <li><strong>특발성 간질</strong>: 가장 흔한 원인. 유전적 성향이 강하며 1~5세 사이에 첫 발작이 시작되는 경우 많음 (비글, 보더 콜리, 골든 리트리버 등에서 발생률 높음)</li>
  <li><strong>구조적/대사성 원인</strong>: 뇌종양, 뇌염, 뇌 외상, 간질환(간성 뇌증), 저혈당, 신부전, 납·독소 중독</li>
  <li><strong>반응성 발작</strong>: 독소·약물·저혈당·전해질 불균형에 의한 일시적 발작 (기저 원인 제거 시 재발 안 함)</li>
</ul>

<h2>발작 중 응급 대처 방법</h2>
<ol>
  <li><strong>침착하게 시간을 확인합니다</strong> — 발작 시간을 재세요. 5분 이상 지속되면 즉시 응급 병원으로.</li>
  <li><strong>다치지 않도록 주변 위험 물체를 치웁니다</strong> — 계단, 날카로운 물체, 가구 모서리</li>
  <li><strong>손을 입 안에 넣지 마세요</strong> — 발작 중 물릴 수 있으며, 개는 발작 중 혀를 삼키지 않습니다.</li>
  <li><strong>어둡고 조용한 환경을 만들어줍니다</strong> — 빛과 소음 자극을 줄이세요.</li>
  <li><strong>발작 후 상태를 관찰합니다</strong> — 완전히 회복되기까지 조용히 곁에 있어주세요.</li>
  <li><strong>영상을 촬영해둡니다</strong> — 수의사 진단에 매우 유용합니다.</li>
</ol>

<h2>즉시 응급실을 가야 하는 경우</h2>
<ul>
  <li>발작이 5분 이상 지속됨 (중적 발작 — Status Epilepticus)</li>
  <li>24시간 이내에 발작이 2회 이상 발생</li>
  <li>발작 후 30분 이상 지나도 의식이 돌아오지 않음</li>
  <li>발작 중 부상이 발생한 경우</li>
</ul>

<h2>진단 및 치료 방향</h2>
<p>혈액 검사, 소변 검사, 뇌 MRI·CT, 뇌척수액 검사 등을 통해 원인을 파악합니다. 특발성 간질은 완치보다 발작 빈도·강도 조절이 목표이며, 수의사 처방에 따라 항간질제를 사용합니다. 약물은 수의사의 처방·모니터링 하에서만 조정해야 합니다.</p>`,
    disclaimer:
      "본 콘텐츠는 일반적인 교육·참고 목적이며 수의학적 진단이나 치료를 대체하지 않습니다. 발작이 의심되면 반드시 수의사에게 진료를 받으세요. 발작 지속 시 즉시 24시간 응급 동물병원을 방문하세요.",
    sources: [
      "Bhatti SFM et al. International Veterinary Epilepsy Task Force Consensus Report. BMC Vet Res (2015)",
      "Berendt M et al. Idiopathic epilepsy in dogs. JSAP (2015)",
      "대한수의학회 소동물신경학 진료 가이드라인 (2021)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-19T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 32. 고양이 치아 건강 관리 (guide, cat.5, published) ──────────────────────
  {
    id: "seed-guide-cat-dental-care",
    slug: "cat-dental-care-guide",
    type: "guide",
    category: 5,
    title: "고양이 치아 건강 관리 — 양치 방법과 치주 질환 예방",
    metaTitle: "고양이 치아 건강 관리 | 양치 방법·치주 질환 예방 | 펫지기",
    metaDescription:
      "고양이 치주 질환(잇몸 질환)은 3세 이상 고양이의 70%에서 발생합니다. 고양이 양치 방법, 치주 질환 증상, 예방 방법을 안내합니다.",
    body: `<h2>고양이 치주 질환, 생각보다 흔합니다</h2>
<p>연구에 따르면 3세 이상 고양이의 약 70%, 5세 이상에서는 거의 대부분이 어느 정도의 치주 질환을 가지고 있습니다. 치주 질환은 구강 문제로 끝나지 않고, 세균이 혈류를 타고 심장·신장·간에 영향을 줄 수 있습니다.</p>

<h2>주요 치주 질환 및 증상</h2>

<h3>치주 질환(Periodontal Disease)</h3>
<ul>
  <li>잇몸 붉어짐·출혈</li>
  <li>구취(입 냄새)</li>
  <li>밥 먹을 때 한쪽으로만 씹기 또는 음식 흘리기</li>
  <li>침 과다 분비</li>
  <li>치아 흔들림 또는 빠짐</li>
</ul>

<h3>치아 흡수성 병변 (FORL/TR)</h3>
<p>고양이 특유의 치아 흡수 질환으로, 치아 뿌리부터 구조가 녹아 극심한 통증을 유발합니다. 고양이는 통증을 숨기는 경향이 있어 발견이 늦어지기 쉽습니다. 정기 구강 검진과 X-ray로만 발견 가능합니다.</p>

<h2>고양이 양치 방법</h2>
<p>이상적인 양치 주기는 매일입니다. 처음 고양이 양치에 도전한다면 인내심을 가지고 단계적으로 진행하세요.</p>

<ol>
  <li><strong>1단계</strong>: 손가락으로 잇몸을 부드럽게 마사지해 손 접근에 익숙하게 합니다 (1~2주)</li>
  <li><strong>2단계</strong>: 손가락에 고양이용 치약을 묻혀 잇몸에 바릅니다 — 사람용 치약은 독성이 있으니 반드시 고양이 전용 사용</li>
  <li><strong>3단계</strong>: 손가락 칫솔 또는 부드러운 어린이 칫솔을 이용해 잇몸 선을 따라 원을 그리며 닦기</li>
  <li><strong>4단계</strong>: 매일 짧게(30~60초) 꾸준히 — 완벽하지 않아도 매일 시도가 중요</li>
</ol>

<h2>양치 외 치아 관리 방법</h2>
<ul>
  <li><strong>덴탈 간식·덴탈 다이어트 사료</strong>: VOHC(수의구강건강위원회) 인증 제품이 효과 근거가 있습니다.</li>
  <li><strong>수분이 많은 음식</strong>: 습식 사료는 입 안 찌꺼기가 적게 남는 편이지만, 치석 예방 효과는 건식 사료·덴탈 간식이 더 큽니다.</li>
  <li><strong>정기 마취 스케일링</strong>: 연 1~2회 수의사 권고에 따라 진행. 고양이는 마취 없이는 제대로 된 스케일링이 어렵습니다.</li>
</ul>

<h2>가정에서 구강 확인하는 법</h2>
<ul>
  <li>월 1회: 입술을 살짝 들어 치아 색(노랑·갈색)과 잇몸 색(분홍색이 정상) 확인</li>
  <li>입 냄새가 심하거나, 잇몸이 빨갛거나, 밥을 잘 못 먹는다면 수의사 방문 필요</li>
</ul>`,
    disclaimer: null,
    sources: [
      "Veterinary Oral Health Council (VOHC) — Accepted Products for Cats (2024)",
      "Niemiec BA. Veterinary Periodontology. Wiley-Blackwell (2013)",
      "대한수의치과학회 반려묘 구강 관리 가이드라인 (2022)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-20T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 33. 강아지 예방접종 스케줄 (guide, cat.3, YMYL, published) ──────────────
  {
    id: "seed-guide-dog-vaccination-schedule",
    slug: "dog-vaccination-schedule",
    type: "guide",
    category: 3,
    title: "강아지 예방접종 스케줄 — 월령별 필수·선택 접종 완전 정리",
    metaTitle: "강아지 예방접종 스케줄 | 퍼피·성견 필수·선택 접종 | 펫지기",
    metaDescription:
      "강아지 필수 예방접종(종합백신·광견병·켄넬코프) 스케줄과 선택 접종, 성견 추가 접종 주기를 수의사 검토를 거쳐 정리했습니다.",
    body: `<h2>예방접종이 중요한 이유</h2>
<p>예방접종은 전염성 질병으로부터 반려견을 보호하는 가장 효과적인 방법입니다. 퍼피는 모체이행항체가 소실되는 시기에 집중 접종이 필요합니다. 일부 질병(광견병 등)은 사람에게도 전파될 수 있으므로 지역사회 보건 관점에서도 중요합니다.</p>

<h2>퍼피 필수 접종 스케줄</h2>

<h3>종합백신 (DHPPL)</h3>
<p>디스템퍼(홍역)·파보바이러스·전염성 간염·파라인플루엔자·렙토스피라를 동시에 예방합니다.</p>
<ul>
  <li><strong>1차</strong>: 생후 6~8주</li>
  <li><strong>2차</strong>: 생후 10~12주 (1차 후 3~4주 간격)</li>
  <li><strong>3차</strong>: 생후 14~16주 (2차 후 3~4주 간격)</li>
  <li><strong>4~5차</strong>: 수의사 권고에 따라 (일부 프로토콜은 4~5차까지)</li>
  <li><strong>추가 접종</strong>: 1차 접종 완료 1년 후, 이후 1~3년마다</li>
</ul>

<h3>코로나장염 (CCV)</h3>
<ul>
  <li>1차: 생후 6~8주 / 2차: 1차 후 3~4주</li>
  <li>추가: 연 1회</li>
</ul>

<h3>켄넬코프 (기관지염 복합백신, Bordetella+기타)</h3>
<ul>
  <li>생후 6~8주부터 시작, 2회 접종 후 연 1회</li>
  <li>동물병원·미용실·호텔 등 다견 환경 이용 전 특히 중요</li>
</ul>

<h3>광견병</h3>
<ul>
  <li>생후 3개월(12주) 이상 1회 → 이후 연 1회 추가 접종</li>
  <li>국내 법정 의무 접종 — 미접종 시 과태료 대상</li>
</ul>

<h2>선택 접종</h2>
<ul>
  <li><strong>인플루엔자</strong>: 다견 환경, 외출이 잦은 강아지에게 권장. 2회 초기 접종 후 연 1회</li>
  <li><strong>라임병 (Borrelia)</strong>: 진드기 노출 위험 지역에서 생활하는 경우 수의사 상담</li>
</ul>

<h2>주의사항</h2>
<ul>
  <li>접종 당일과 다음날은 격렬한 운동과 목욕 자제</li>
  <li>접종 후 15~30분 병원에서 이상반응 관찰 후 귀가</li>
  <li>접종 후 구토·안면 부종·호흡 곤란·갑작스러운 쇄약이 나타나면 즉시 병원 연락</li>
  <li>정확한 접종 일정은 강아지 건강 상태와 생활 환경에 따라 수의사와 상의하세요.</li>
</ul>

<h2>접종 기록 관리</h2>
<p>접종할 때마다 수의사가 발급하는 예방접종 확인서를 받아 보관하세요. 미용실·호텔·반려견 놀이터 이용 시 요구하는 경우가 있습니다.</p>`,
    disclaimer:
      "본 콘텐츠는 일반적인 교육·참고 목적이며 수의학적 처방을 대체하지 않습니다. 실제 접종 일정은 반드시 주치 수의사와 상의하세요.",
    sources: [
      "AAHA Canine Vaccination Guidelines (2022)",
      "World Small Animal Veterinary Association (WSAVA) Vaccination Guidelines (2022)",
      "농림축산검역본부 동물 예방접종 관리 지침 (2024)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-17T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 34. 반려동물 응급처치 기초 가이드 (guide, cat.3, YMYL, published) ──────────
  {
    id: "seed-guide-pet-first-aid",
    slug: "pet-first-aid-guide",
    type: "guide",
    category: 3,
    title: "반려동물 응급처치 기초 가이드 — 상황별 즉각 대응법",
    metaTitle: "반려동물 응급처치 가이드 | 상황별 즉각 대응·응급 신호 | 펫지기",
    metaDescription:
      "강아지·고양이 응급 상황(출혈·골절·독소 섭취·열사병·질식)에서 보호자가 할 수 있는 즉각 대응법과 즉시 병원에 가야 하는 신호를 정리했습니다.",
    body: `<h2>응급처치의 한계를 먼저 이해하세요</h2>
<p>가정 응급처치는 동물병원에 도착하기 전까지 상태 악화를 늦추기 위한 것입니다. 전문 수의사 치료를 대체할 수 없습니다. 응급 상황이라고 판단되면 즉시 전화로 가까운 24시간 응급 동물병원에 연락하고 이동하세요.</p>

<h2>즉시 병원에 가야 하는 응급 신호</h2>
<ul>
  <li>호흡 곤란 또는 파란 잇몸·혀</li>
  <li>경련·발작 (5분 이상 지속 또는 2회 이상)</li>
  <li>실신·의식 저하</li>
  <li>12시간 이상 소변이 전혀 없음 (고양이: FLUTD 의심)</li>
  <li>심한 출혈 (압박으로 멈추지 않는 경우)</li>
  <li>복부 팽창·극심한 통증</li>
  <li>독성 물질 섭취 의심</li>
</ul>

<h2>출혈 응급처치</h2>
<ol>
  <li>깨끗한 천(거즈, 수건)으로 상처 부위를 직접 압박합니다.</li>
  <li>5~10분간 지속 압박 — 중간에 들여다보면 혈병이 떨어집니다.</li>
  <li>천이 흠뻑 젖으면 위에 새 천을 더합니다 (제거하지 않음).</li>
  <li>압박으로 5분 내 멈추지 않으면 즉시 병원으로.</li>
</ol>

<h2>이물질 삼킴·독소 섭취</h2>
<ul>
  <li>섭취한 물질과 양을 파악합니다 (포장지·잔여물 보관).</li>
  <li><strong>임의로 구토를 유발하지 마세요</strong> — 부식성 물질, 날카로운 이물질은 역류 시 더 큰 손상을 줄 수 있습니다.</li>
  <li>즉시 24시간 응급 동물병원 또는 수의사에게 전화합니다.</li>
</ul>

<h2>열사병 (고온 환경 노출)</h2>
<p>증상: 과도한 헐떡임, 잇몸 밝은 빨간색, 구토, 쓰러짐</p>
<ol>
  <li>즉시 서늘한 곳으로 이동합니다.</li>
  <li>상온의 물(차갑지 않게)을 몸에 적십니다 — 얼음 물은 혈관을 수축시켜 역효과</li>
  <li>선풍기·에어컨으로 공기를 순환시킵니다.</li>
  <li>수분을 강제로 먹이지 않습니다 (의식 저하 시 흡인 위험).</li>
  <li>응급처치와 동시에 즉시 병원으로 이동합니다.</li>
</ol>

<h2>질식 (이물질이 기도에 걸린 경우)</h2>
<p>증상: 앞발로 입을 계속 긁음, 입을 과도하게 벌림, 청색증</p>
<ul>
  <li>의식이 있는 경우: 입 안을 빠르게 확인해 보이는 이물질만 제거 (깊이 손을 넣지 않음)</li>
  <li>의식이 있다면 즉시 병원으로 — 가정에서 하임리히 동작은 위험할 수 있어 수의사 지도 하에서만 시도</li>
</ul>

<h2>골절 의심</h2>
<ul>
  <li>부상 부위를 움직이지 않게 합니다 (고정 시도는 추가 손상 위험).</li>
  <li>이동 시 평평한 판자나 단단한 상자 위에 조심스럽게 옮겨 병원으로.</li>
  <li>통증으로 물거나 할퀼 수 있으니 얼굴 근처에 손을 대지 않도록 주의.</li>
</ul>

<h2>평소 준비사항</h2>
<ul>
  <li>가까운 24시간 응급 동물병원 번호를 저장해두기</li>
  <li>반려동물 응급 키트: 붕대·거즈·의료용 테이프·지혈대·생리식염수·체온계 준비</li>
  <li>반려동물 체중·혈액형·알레르기 이력·현재 복용 약물 기록 보관</li>
</ul>`,
    disclaimer:
      "본 콘텐츠는 일반적인 교육·참고 목적이며 전문 수의학적 처치를 대체하지 않습니다. 응급 상황에서는 즉시 24시간 응급 동물병원을 방문하세요.",
    sources: [
      "American Red Cross — Pet First Aid Manual (2023)",
      "BSAVA Manual of Practical Animal Care, 3rd ed. (2022)",
      "대한수의사회 반려동물 응급 대응 가이드 (2023)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-18T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 35. 강아지 췌장염 (condition, cat.3, YMYL, published) ───────────────────────
  {
    id: "seed-condition-dog-pancreatitis",
    slug: "dog-pancreatitis",
    type: "condition",
    category: 3,
    title: "강아지 췌장염 — 증상·원인·식이 관리",
    metaTitle: "강아지 췌장염 증상·원인·식이 관리 | 수의사 검토 | 펫지기",
    metaDescription:
      "강아지 췌장염(급성·만성) 증상, 원인(고지방식·비만·일부 약물), 저지방 식이 관리 방법을 수의사 검토를 거쳐 안내합니다.",
    body: `<h2>췌장염이란?</h2>
<p>췌장염(Pancreatitis)은 췌장에서 소화 효소가 비정상적으로 활성화되어 췌장 자체를 손상시키는 염증 상태입니다. 급성(갑작스럽게 발생)과 만성(반복·지속)으로 나뉩니다. 급성 췌장염은 응급 상황일 수 있습니다.</p>

<h2>주요 증상</h2>
<ul>
  <li>구토 (가장 흔한 증상)</li>
  <li>식욕 감소 또는 완전 거부</li>
  <li>복통 — "기도하는 자세" (앞다리를 뻗고 뒷부분을 들어올리는 자세)</li>
  <li>무기력·활동 저하</li>
  <li>설사</li>
  <li>복부 팽창 또는 복부 촉진 시 통증 반응</li>
  <li>심한 경우: 탈수, 황달, 발열</li>
</ul>

<h2>주요 원인 및 위험 요인</h2>
<ul>
  <li><strong>고지방 음식</strong>: 삼겹살, 치킨 껍질, 기름진 음식을 먹은 후 발생하는 경우 많음 (명절·연휴 후 내원 증가)</li>
  <li><strong>비만</strong>: 과체중 강아지에서 발생률이 높음</li>
  <li><strong>특정 품종</strong>: 미니어처 슈나우저가 유전적으로 가장 높은 위험을 가짐. 코커 스파니얼, 코기, 비글도 주의</li>
  <li><strong>특정 약물</strong>: 일부 약물이 췌장염을 유발할 수 있음 — 처방 약물 부작용 가능성은 수의사에게 문의</li>
  <li><strong>지방혈증</strong>: 혈중 중성지방 농도가 높은 상태</li>
  <li><strong>원인 불명</strong>: 많은 경우 명확한 원인을 특정할 수 없음</li>
</ul>

<h2>진단</h2>
<p>혈액 검사(특히 cPLI — 췌장 리파아제 면역반응성 검사), 복부 초음파 검사로 진단합니다. cPLI 수치 상승과 초음파 소견이 진단에 핵심입니다.</p>

<h2>치료 방향</h2>
<p>급성 췌장염은 입원 치료(수액, 통증 관리, 항구토제)가 필요할 수 있습니다. 회복 후 저지방 식이가 필수적입니다. 치료 방향은 중증도와 원인에 따라 수의사가 결정합니다.</p>

<h2>식이 관리 — 핵심</h2>
<ul>
  <li><strong>저지방 식이</strong>: 지방 함량 10% 이하(건조 중량 기준)의 처방식 또는 저지방 사료 사용</li>
  <li>고지방 음식(삼겹살, 버터, 기름진 간식, 사람 음식 부스러기) 완전 차단</li>
  <li>회복 초기에는 소량씩 자주(하루 3~4회) 급여</li>
  <li>만성 췌장염 강아지는 평생 저지방 식이 유지</li>
</ul>

<h3>즉시 병원에 가야 하는 경우</h3>
<p>구토가 반복되거나, 강한 복통(기도 자세 유지), 무기력이 심하거나, 식음전폐가 12시간 이상 지속될 경우 즉시 수의사를 방문하세요.</p>`,
    disclaimer:
      "본 콘텐츠는 일반적인 교육·참고 목적이며 수의학적 진단이나 치료를 대체하지 않습니다. 증상이 의심되면 수의사에게 진료를 받으세요.",
    sources: [
      "Steiner JM. Canine Pancreatitis. In: Textbook of Veterinary Internal Medicine (8th ed.) (2017)",
      "WSAVA Gastrointestinal Standardization Group — Pancreatitis Guidelines (2019)",
      "대한수의학회 소동물내과 췌장 질환 가이드라인 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-20T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 36. 고양이 천식 (condition, cat.3, YMYL, published) ────────────────────────
  {
    id: "seed-condition-cat-asthma",
    slug: "cat-asthma",
    type: "condition",
    category: 3,
    title: "고양이 천식·기관지염 — 증상·원인·환경 관리",
    metaTitle: "고양이 천식 증상·원인·환경 관리 | 수의사 검토 | 펫지기",
    metaDescription:
      "고양이 천식(고양이 기관지성 천식)의 증상(기침·쌕쌕거림·호흡 곤란), 알레르기 유발 원인, 환경 관리 방법을 수의사 검토를 거쳐 안내합니다.",
    body: `<h2>고양이 천식이란?</h2>
<p>고양이 기관지성 천식(Feline Bronchial Asthma)은 알레르기 유발 항원(알레르겐)에 의한 기도 과민 반응으로 기관지가 좁아지는 만성 호흡기 질환입니다. 모든 연령에서 발생할 수 있으나 젊은 성묘(2~8세)에서 더 자주 나타납니다.</p>

<h2>주요 증상</h2>
<ul>
  <li><strong>기침</strong>: 가장 흔한 증상. "헛구역질"과 혼동하기 쉬움 — 고양이가 목을 길게 빼고 낮은 자세로 기침하는 모습</li>
  <li><strong>쌕쌕거림(천명음)</strong>: 호흡 시 쌕쌕 소리</li>
  <li><strong>호흡 곤란</strong>: 빠르고 얕은 호흡, 입을 벌리고 숨쉬기</li>
  <li><strong>운동 불내성</strong>: 평소보다 쉽게 지침</li>
  <li><strong>청색증</strong>: 잇몸·혀가 파랗게 변하면 응급 상황</li>
</ul>

<h2>주요 원인 — 알레르겐</h2>
<ul>
  <li>고양이 화장실 먼지 (특히 먼지 많은 벤토나이트 모래)</li>
  <li>향기 제품 (방향제, 향초, 에센셜 오일, 담배 연기)</li>
  <li>청소 스프레이, 세제 증기</li>
  <li>꽃가루, 곰팡이 포자</li>
  <li>집먼지 진드기</li>
  <li>일부 고양이 사료 알레르기(드뭄)</li>
</ul>

<h2>진단</h2>
<p>흉부 X-ray(과팽창된 폐, 기관지 주변 음영 증가), 기관지 세척액 세포 검사, 알레르기 검사 등을 통해 진단합니다. 다른 호흡기 질환(심장 질환, 흉수, 폐렴)과 감별이 중요합니다.</p>

<h2>치료 방향</h2>
<p>급성 발작 시 기관지 확장제와 스테로이드 응급 처치가 필요합니다. 장기 관리는 흡입형 스테로이드나 기관지 확장제를 수의사 처방에 따라 사용합니다. 고양이용 흡입기(AeroKat 등)가 사용됩니다. 치료 계획은 수의사와 상의하세요.</p>

<h2>환경 관리 — 재발 예방</h2>
<ul>
  <li><strong>화장실 모래 교체</strong>: 먼지 적은 모래 (두부·목재·실리카 모래 등)로 바꾸기</li>
  <li><strong>향기 제품 사용 금지</strong>: 방향제, 향초, 에센셜 오일 디퓨저, 담배 연기 완전 차단</li>
  <li><strong>청소 중 환기</strong>: 청소 스프레이 사용 시 고양이를 다른 방으로 이동</li>
  <li><strong>공기청정기</strong>: HEPA 필터 공기청정기로 먼지·꽃가루 감소</li>
  <li><strong>침구 자주 세탁</strong>: 집먼지 진드기 감소</li>
</ul>

<h3>즉시 응급실에 가야 하는 경우</h3>
<p>입을 벌리고 숨쉬기, 잇몸·혀가 파란색, 옆으로 쓰러짐, 극도의 호흡 곤란은 즉시 24시간 응급 동물병원을 방문하세요.</p>`,
    disclaimer:
      "본 콘텐츠는 일반적인 교육·참고 목적이며 수의학적 진단이나 치료를 대체하지 않습니다. 호흡 곤란 증상이 있으면 즉시 수의사에게 진료를 받으세요.",
    sources: [
      "Reinero CR. Feline allergic bronchitis. Vet Clin North Am Small Anim Pract (2007)",
      "IRIS — Feline Asthma Management Guidelines (2020)",
      "대한수의학회 소동물호흡기학 교과서 (2021)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-21T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 28. 강아지 운동·산책 가이드 (guide, cat.5, published) ─────────────────────
  {
    id: "seed-guide-dog-exercise-guide",
    slug: "dog-exercise-guide",
    type: "guide",
    category: 5,
    title: "강아지 운동·산책 가이드 — 품종·나이별 적정 운동량",
    metaTitle: "강아지 운동·산책 가이드 | 품종별 적정 운동량·주의사항 | 펫지기",
    metaDescription:
      "강아지 품종·나이에 따른 하루 산책 시간과 운동 방법을 정리했습니다. 과운동·운동 부족 신호와 여름철·겨울철 산책 주의사항도 안내합니다.",
    body: `<h2>운동이 강아지에게 중요한 이유</h2>
<p>충분한 운동은 강아지의 체중 관리, 관절 건강, 심폐 기능, 정신 건강에 필수입니다. 운동이 부족하면 비만, 파괴적 행동, 과잉 짖음, 분리불안이 심해질 수 있습니다.</p>

<h2>품종별 운동 요구량</h2>

<h3>운동량이 많이 필요한 품종 (하루 60~90분 이상)</h3>
<ul>
  <li>보더 콜리, 시베리안 허스키, 골든·래브라도 리트리버, 달마시안, 저먼 셰퍼드, 오스트레일리안 셰퍼드</li>
  <li>이 품종들은 뛰기·던지기·어질리티 같은 고강도 활동을 포함해야 합니다.</li>
</ul>

<h3>중간 운동량 품종 (하루 30~60분)</h3>
<ul>
  <li>비글, 시바이누, 웰시 코기, 스피츠, 박서, 스탠더드 푸들</li>
  <li>규칙적인 산책과 공 놀이로 충족됩니다.</li>
</ul>

<h3>운동량이 적게 필요한 품종 (하루 20~30분)</h3>
<ul>
  <li>말티즈, 시츄, 치와와, 불도그, 퍼그, 바셋 하운드, 프렌치 불도그</li>
  <li>단두종(납작한 코)은 호흡기 특성상 격렬한 운동 시 주의가 필요합니다.</li>
</ul>

<h2>나이별 운동 지침</h2>

<h3>퍼피 (6개월 미만)</h3>
<p>골격이 완성 중이므로 격렬한 운동은 피합니다. "5분 규칙"을 참고하세요 — 월령 × 5분, 하루 2회. 예: 생후 3개월 = 15분 × 2회.</p>

<h3>성견 (1~7세)</h3>
<p>품종별 권장량에 맞춰 하루 1~2회 산책. 주 2~3회는 뛰기·놀이 등 고강도 활동 포함.</p>

<h3>노령견 (7세+)</h3>
<p>운동을 중단하지 말고, 강도와 시간을 줄이세요. 수영 같은 저충격 운동이 관절 부담 없이 근육을 유지하는 데 좋습니다.</p>

<h2>산책 시 주의사항</h2>

<h3>여름철 (6~9월)</h3>
<ul>
  <li>아스팔트 온도 확인: 손등을 5초 올려도 뜨겁다면 산책 금지 (발바닥 화상)</li>
  <li>오전 7시 이전 / 오후 6시 이후 시원한 시간대 산책</li>
  <li>충분한 수분 공급, 산책 중 그늘 쉬기</li>
  <li>단두종·노령견·검은 털 강아지는 열사병 위험이 높습니다.</li>
</ul>

<h3>겨울철 (12~2월)</h3>
<ul>
  <li>소형견·단모종은 방한복 착용 고려</li>
  <li>제설제(염화칼슘)는 발바닥 자극·독성 위험 — 귀가 후 발바닥 닦기</li>
  <li>눈길·빙판에서 노령견 낙상 주의</li>
</ul>

<h2>과운동 & 운동 부족 신호</h2>
<h3>과운동 신호</h3>
<ul>
  <li>운동 후 과도한 헐떡임, 절뚝임, 극심한 피로</li>
  <li>다음 날 일어나기 힘들어함</li>
</ul>

<h3>운동 부족 신호</h3>
<ul>
  <li>집 안에서 과도한 에너지 발산 (가구 씹기, 점프 등)</li>
  <li>체중 증가, 지루함으로 인한 잦은 짖음</li>
</ul>

<h2>실내 운동 아이디어 (날씨가 나쁠 때)</h2>
<ul>
  <li>코 노즈워크 장난감으로 후각 자극 (정신적 피로 유발)</li>
  <li>실내 장애물 코스, 계단 오르내리기 (소형견)</li>
  <li>터그·캐치 게임</li>
</ul>`,
    disclaimer: null,
    sources: [
      "American Kennel Club — Exercise Needs by Breed (2024)",
      "WSAVA Preventive Healthcare Guidelines (2022)",
      "국립동물과학원 반려동물 관리 가이드북 (2023)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-19T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 37. 강아지 당뇨병 (condition, cat.3, YMYL) ─────────────────────────────
  {
    id: "seed-condition-dog-diabetes",
    slug: "dog-diabetes",
    type: "condition",
    category: 3,
    title: "강아지 당뇨병 — 증상·원인·치료 및 관리",
    metaTitle: "강아지 당뇨병 증상·치료 | 인슐린·식이요법 가이드 | 펫지기",
    metaDescription:
      "강아지 당뇨병(진성 당뇨)의 증상(다음·다뇨·체중 감소), 원인, 인슐린 치료 및 저혈당 응급처치 방법을 수의사 검토 자료를 바탕으로 안내합니다.",
    body: `<h2>강아지 당뇨병이란?</h2>
<p>강아지 당뇨병(Diabetes Mellitus)은 췌장에서 인슐린을 충분히 생성하지 못하거나 세포가 인슐린에 반응하지 못해 혈당이 지속적으로 높아지는 대사 질환입니다. 적절히 관리하지 않으면 백내장, 케톤산증 등 심각한 합병증으로 이어질 수 있습니다.</p>

<h2>주요 증상</h2>
<ul>
  <li><strong>다음·다뇨</strong>: 물을 과도하게 마시고 소변량이 급증합니다.</li>
  <li><strong>체중 감소</strong>: 식욕이 있음에도 체중이 빠르게 줄어듭니다.</li>
  <li><strong>식욕 증가</strong>: 배고픔을 자주 호소합니다.</li>
  <li><strong>무기력·기력 저하</strong>: 활동량이 줄고 피로해 보입니다.</li>
  <li><strong>백내장</strong>: 당뇨 진행 시 수정체 혼탁이 빠르게 나타납니다.</li>
</ul>

<h2>원인 및 위험 요인</h2>
<ul>
  <li>비만: 인슐린 저항성을 높이는 가장 큰 위험 요인</li>
  <li>췌장염 병력</li>
  <li>여성호르몬(임신, 황체기 프로게스테론 분비)</li>
  <li>스테로이드 장기 투여</li>
  <li>중성화하지 않은 암컷 — 발생률이 수컷 대비 약 2~3배 높음</li>
</ul>

<h2>진단</h2>
<p>공복 혈당 측정, 소변 내 포도당(당뇨) 확인, 혈청 과당아민 측정으로 진단합니다. 일회성 고혈당(스트레스성)과 감별하기 위해 2회 이상 확인이 필요합니다.</p>

<h2>치료 및 관리</h2>
<h3>인슐린 요법</h3>
<p>대부분의 강아지 당뇨는 인슐린 주사 치료가 필요합니다. 초기 용량은 수의사가 결정하며, 혈당 모니터링(혈당 커브)을 통해 조절합니다. 하루 2회 식사와 동시에 주사하는 것이 일반적입니다.</p>

<h3>식이 관리</h3>
<ul>
  <li>고단백·고섬유질·저지방 처방식 권장</li>
  <li>하루 2회 일정한 시간에 동일 양 급여</li>
  <li>간식은 혈당 변동을 유발하므로 최소화</li>
</ul>

<h3>체중 관리 & 운동</h3>
<p>규칙적인 저강도 운동은 인슐린 감수성을 개선합니다. 단, 급격한 과운동은 저혈당을 유발할 수 있으므로 주의하세요.</p>

<h2>저혈당 응급 대처</h2>
<p>인슐린 과다 투여 시 저혈당이 발생할 수 있습니다. 강아지가 떨거나, 비틀거리거나, 의식이 흐려지면 즉시 잇몸에 꿀이나 포도당 젤을 바르고 동물병원에 연락하세요.</p>

<h2>예후</h2>
<p>지속적으로 인슐린을 관리하면 정상적인 삶의 질을 유지할 수 있습니다. 진단 초기에는 2~4주 간격으로 혈당 모니터링이 필요합니다.</p>`,
    disclaimer:
      "본 정보는 수의학 참고 자료로 제공되며 의학적 진단과 치료를 대체하지 않습니다. 인슐린 용량은 반드시 담당 수의사가 결정해야 합니다. 저혈당 응급 상황 시 즉시 동물병원을 방문하세요.",
    sources: [
      "WSAVA Diabetes Mellitus Management Guidelines (2023)",
      "Feldman EC, Nelson RW. Canine and Feline Endocrinology and Reproduction (4th ed.)",
      "대한수의사회 임상 수의학 가이드라인 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-20T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 38. 고양이 상부 호흡기 감염 (condition, cat.3, YMYL) ──────────────────
  {
    id: "seed-condition-cat-upper-respiratory",
    slug: "cat-upper-respiratory-infection",
    type: "condition",
    category: 3,
    title: "고양이 상부 호흡기 감염 — 증상·원인·치료",
    metaTitle: "고양이 감기 (상부 호흡기 감염) 증상·치료 | 펫지기",
    metaDescription:
      "고양이 상부 호흡기 감염(고양이 감기)의 증상(재채기·콧물·결막염), 원인(허피스 바이러스·칼리시 바이러스), 치료 및 예방 백신 정보를 안내합니다.",
    body: `<h2>고양이 상부 호흡기 감염이란?</h2>
<p>고양이 상부 호흡기 감염(Upper Respiratory Infection, URI)은 고양이 사이에서 매우 흔한 전염성 질환으로, 흔히 "고양이 감기"라고 불립니다. 여러 마리를 함께 키우는 환경이나 보호소, 펫숍에서 급속히 전파될 수 있습니다.</p>

<h2>주요 원인</h2>
<ul>
  <li><strong>고양이 헤르페스 바이러스 1형(FHV-1)</strong>: 전체 URI의 약 40~45% 원인. 회복 후에도 잠복 감염 상태로 남아 스트레스 시 재발 가능</li>
  <li><strong>고양이 칼리시 바이러스(FCV)</strong>: 전체 URI의 약 40% 원인. 구강 궤양을 동반하는 경우 많음</li>
  <li><strong>Bordetella bronchiseptica</strong>: 세균성, 다중 감염에서 함께 나타나는 경우 많음</li>
  <li><strong>Chlamydophila felis</strong>: 주로 결막염 유발</li>
</ul>

<h2>주요 증상</h2>
<ul>
  <li>재채기, 콧물 (맑은 분비물 → 화농성으로 진행)</li>
  <li>결막염, 눈물·눈곱</li>
  <li>발열, 식욕 저하, 무기력</li>
  <li>구강 궤양 (칼리시 바이러스 특징)</li>
  <li>심한 경우 호흡 곤란</li>
</ul>

<h2>진단</h2>
<p>임상 증상으로 추정 진단 후 PCR 검사로 바이러스 종류를 확인할 수 있습니다. 대부분 임상 소견과 병력으로 진단합니다.</p>

<h2>치료</h2>
<h3>지지 요법</h3>
<ul>
  <li>충분한 수분 공급 및 영양 보충</li>
  <li>비강 세척 (생리식염수 분무)으로 분비물 제거</li>
  <li>식욕 부진 시 기호성 높은 사료(습식·온열)로 유도</li>
  <li>온도 및 습도 유지 (가습기 사용)</li>
</ul>
<h3>약물 치료</h3>
<ul>
  <li>항바이러스제 (Famciclovir — FHV-1에 효과적)</li>
  <li>2차 세균 감염 시 항생제 처방</li>
  <li>결막염 치료 안약</li>
</ul>

<h2>예방</h2>
<p>종합 백신(FVRCP)에 FHV-1과 FCV 예방 성분이 포함되어 있습니다. 어린 고양이는 6~8주령부터 3~4주 간격으로 접종 후 성묘는 1~3년마다 추가 접종합니다.</p>

<h2>다묘 가정 관리</h2>
<ul>
  <li>신규 고양이는 2주 이상 격리 후 합가</li>
  <li>감염 고양이 격리, 전용 물그릇·밥그릇 분리</li>
  <li>손 씻기 등 기본 위생 준수</li>
</ul>`,
    disclaimer:
      "본 정보는 수의학 참고 자료로 제공되며 의학적 진단과 치료를 대체하지 않습니다. 고양이가 48시간 이상 먹지 않거나 호흡 곤란 증상을 보이면 즉시 동물병원을 방문하세요.",
    sources: [
      "ABCD (Advisory Board on Cat Diseases) — Feline URI Guidelines (2023)",
      "Gaskell R, et al. Feline Herpesvirus. Vet Res. 2007",
      "대한수의사회 소동물 임상 진료 지침 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-20T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 39. 강아지 겨울철 케어 가이드 (guide, cat.5) ──────────────────────────
  {
    id: "seed-guide-dog-winter-care",
    slug: "dog-winter-care-guide",
    type: "guide",
    category: 5,
    title: "강아지 겨울철 케어 가이드 — 방한·건강·실내 관리",
    metaTitle: "강아지 겨울철 케어 가이드 | 방한·동상·제설제 주의 | 펫지기",
    metaDescription:
      "강아지 겨울 산책 주의사항, 방한복 필요 여부, 제설제 독성, 건조한 날씨 피부 관리까지 겨울철 반려견 케어 완벽 가이드.",
    body: `<h2>강아지도 겨울이 힘들다</h2>
<p>기온이 낮아지면 소형견·단모종·노령견은 체온 유지에 어려움을 겪습니다. 또 빙판과 제설제는 발바닥 부상과 독성 위험을 높입니다. 겨울철 5가지 핵심 케어를 확인하세요.</p>

<h2>1. 방한 — 방한복이 필요한 강아지</h2>
<ul>
  <li>체중 5kg 미만 소형견</li>
  <li>치와와·닥스훈트·프렌치불독 등 단모종</li>
  <li>노령견(7세 이상) 및 만성 질환 보유견</li>
  <li>체지방이 낮은 날씬한 체형</li>
</ul>
<p>기온 5℃ 이하, 바람이 강할 때는 방한복 착용을 권장합니다. 단, 이중모 견종(허스키·사모예드·말라뮤트 등)은 체온 조절 능력이 우수해 불필요합니다.</p>

<h2>2. 산책 — 시간대·노면 주의</h2>
<ul>
  <li><strong>적정 시간</strong>: 오전 10시~오후 3시 가장 따뜻한 시간대 선택</li>
  <li><strong>산책 시간 단축</strong>: 영하 10℃ 이하에서는 기존 산책 시간의 절반 이하로 줄이세요.</li>
  <li><strong>빙판길</strong>: 노령견·관절 질환 보유견은 미끄럼 방지 신발 또는 발바닥 보호 왁스 사용</li>
  <li><strong>제설제(염화칼슘)</strong>: 발바닥 자극과 독성 위험 — 귀가 직후 따뜻한 물로 발 닦기 필수</li>
</ul>

<h2>3. 실내 환경 — 건조·난방 관리</h2>
<ul>
  <li>실내 온도 18~22℃ 유지, 소형견·단모종은 20℃ 이상 권장</li>
  <li>난방기 근처 직접 접촉 금지 (저온 화상 위험)</li>
  <li>가습기로 습도 40~60% 유지 (건조 시 피부·기관지 자극)</li>
  <li>출입구 외풍 차단 — 틈새 아래 문풍지 부착</li>
</ul>

<h2>4. 피부·발바닥 케어</h2>
<p>겨울철 건조한 공기는 피부 각질과 발바닥 갈라짐을 유발합니다.</p>
<ul>
  <li>발바닥 보호 왁스(포우 왁스)를 산책 전후 바르면 갈라짐과 제설제 침투를 예방합니다.</li>
  <li>목욕 후 드라이는 충분히 — 완전히 건조되지 않으면 체온이 급격히 떨어집니다.</li>
  <li>목욕 빈도를 줄이거나(2~4주 → 4~6주), 드라이 샴푸 활용</li>
</ul>

<h2>5. 영양 & 칼로리 조절</h2>
<p>실내 생활이 늘면 칼로리 소비가 줄어 체중이 증가하기 쉽습니다.</p>
<ul>
  <li>운동량 감소에 맞춰 사료량 5~10% 감량 검토</li>
  <li>오메가-3 보충(연어 오일 등)은 피부 건강과 관절 보호에 도움</li>
  <li>물 충분히 마시게 하기 — 겨울에도 탈수는 발생합니다.</li>
</ul>

<h2>동상 & 저체온 응급 신호</h2>
<ul>
  <li><strong>동상 의심 부위</strong>: 귀끝·발바닥·꼬리 끝이 창백하거나 딱딱할 때</li>
  <li><strong>저체온 증상</strong>: 심한 떨림, 느린 호흡, 의식 흐림</li>
  <li><strong>응급 처치</strong>: 따뜻한 실내로 이동, 담요로 감싸기, 즉시 동물병원 방문</li>
</ul>`,
    disclaimer: null,
    sources: [
      "American Kennel Club — Winter Safety Tips for Dogs (2024)",
      "ASPCA — Cold Weather Pet Safety",
      "국립동물과학원 반려동물 계절별 관리 지침 (2023)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-20T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 40. 강아지 사회화 훈련 (guide, cat.5) ─────────────────────────────────
  {
    id: "seed-guide-puppy-socialization",
    slug: "puppy-socialization-guide",
    type: "guide",
    category: 5,
    title: "강아지 사회화 훈련 가이드 — 결정적 시기와 올바른 방법",
    metaTitle: "강아지 사회화 훈련 방법 | 결정적 시기·단계별 가이드 | 펫지기",
    metaDescription:
      "강아지 사회화의 결정적 시기(3~16주령), 사람·동물·환경 적응 훈련법, 흔한 실수와 주의사항을 전문 훈련사 기준으로 안내합니다.",
    body: `<h2>사회화란 무엇인가요?</h2>
<p>사회화(socialization)는 강아지가 다양한 사람, 동물, 환경, 소리에 긍정적으로 적응하는 과정입니다. 사회화가 잘 된 강아지는 낯선 상황에서도 불안·공격성 없이 안정적으로 행동합니다. 반대로 사회화가 부족하면 분리불안, 공격성, 과도한 짖음 등 문제 행동의 원인이 됩니다.</p>

<h2>결정적 시기 — 3~16주령</h2>
<p>생후 3~16주는 강아지 뇌가 새로운 경험을 가장 유연하게 받아들이는 황금기입니다. 이 시기에 긍정적 경험을 많이 쌓을수록 평생 안정적인 성격이 형성됩니다.</p>
<ul>
  <li><strong>3~5주</strong>: 동배 형제·어미와의 상호작용 (브리더 책임 구간)</li>
  <li><strong>5~8주</strong>: 사람 핸들링 경험 시작 (브리더·입양 준비 구간)</li>
  <li><strong>8~12주</strong>: 입양 초기 — 가장 강력한 사회화 효과</li>
  <li><strong>12~16주</strong>: 경험을 확장하고 새로운 환경 노출 지속</li>
</ul>

<h2>사회화 체크리스트 — 경험시켜야 할 것들</h2>
<h3>사람</h3>
<ul>
  <li>다양한 연령대 (어린이, 노인), 다양한 외모(모자, 안경, 수염, 마스크 착용자)</li>
  <li>남성·여성, 다양한 목소리 톤</li>
  <li>유니폼 착용자 (배달원, 청소부 등)</li>
</ul>
<h3>환경</h3>
<ul>
  <li>자동차 소음, 오토바이, 공사 소음, 천둥소리</li>
  <li>엘리베이터, 계단, 미끄러운 바닥, 그레이팅</li>
  <li>동물병원 방문 (치료 없이 간식만 받는 긍정 연습)</li>
  <li>반려동물 동반 카페, 공원, 시장</li>
</ul>
<h3>다른 동물</h3>
<ul>
  <li>예방접종 완료된 건강한 강아지·성견과 통제된 만남</li>
  <li>고양이·소형 동물에 익숙해지기 (다묘·다견 가정 준비 시)</li>
</ul>

<h2>올바른 사회화 방법</h2>
<ul>
  <li><strong>긍정 강화</strong>: 새로운 경험 직후 간식이나 칭찬으로 "안전하다"는 신호를 줍니다.</li>
  <li><strong>단계별 노출</strong>: 소리는 낮은 볼륨 → 점진적으로 높이기. 거리는 멀리 → 천천히 가까이.</li>
  <li><strong>강요 금지</strong>: 두려움을 보이면 즉시 자극을 줄이세요. 억지로 접근시키면 역효과가 납니다.</li>
  <li><strong>짧고 자주</strong>: 1회에 5~15분 짧은 세션을 하루 2~3회 반복합니다.</li>
</ul>

<h2>흔한 실수</h2>
<ul>
  <li>예방접종 완료 전 다른 강아지와 접촉 (감염 위험) — 실내 사회화 클래스나 검증된 성견부터 시작</li>
  <li>나쁜 경험을 억지로 극복시키려는 "홍수 요법" — 트라우마로 역전될 수 있습니다.</li>
  <li>사회화를 16주 이후로 미루기 — 결정적 시기가 지나면 효과가 현저히 감소합니다.</li>
  <li>한 가지 환경만 반복 — 다양성이 핵심입니다.</li>
</ul>

<h2>사회화 이후 — 평생 유지</h2>
<p>성견이 된 후에도 새로운 경험을 꾸준히 제공해야 사회화가 유지됩니다. 특히 장기간 외출이 없거나 이사·새 가족 구성원 추가 등 생활 변화 시 재사회화 훈련이 도움이 됩니다.</p>`,
    disclaimer: null,
    sources: [
      "AVSAB (American Veterinary Society of Animal Behavior) — Puppy Socialization Position Statement (2021)",
      "Dunbar I. Before and After Getting Your Puppy (2004)",
      "KAB(한국동물행동학회) 반려동물 행동 교육 지침 (2023)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-21T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 41. 강아지 관절염 (condition, cat.3, YMYL) ────────────────────────────
  {
    id: "seed-condition-dog-arthritis",
    slug: "dog-arthritis",
    type: "condition",
    category: 3,
    title: "강아지 관절염 — 증상·원인·통증 관리",
    metaTitle: "강아지 관절염 증상·치료·관리 방법 | 펫지기",
    metaDescription:
      "강아지 퇴행성 관절염(DJD)의 증상(절뚝임·기립 어려움·활동 감소), 원인, 진통제 치료, 체중 관리, 물리치료 등 종합적인 관리 방법을 안내합니다.",
    body: `<h2>강아지 관절염이란?</h2>
<p>강아지 관절염(퇴행성 관절 질환, DJD)은 관절 연골이 서서히 닳아 통증과 기능 제한을 유발하는 진행성 질환입니다. 노령견의 약 20%, 7세 이상 대형견의 65% 이상에서 발생한다는 보고가 있습니다.</p>

<h2>주요 증상</h2>
<ul>
  <li>특정 다리를 절뚝이거나 땅에 딛지 않으려 함</li>
  <li>아침에 일어날 때 뻣뻣함, 시간이 지나면 호전</li>
  <li>산책·계단·점프 등 활동량 감소</li>
  <li>만지면 아파하는 특정 관절 부위</li>
  <li>근육 위축 (사용을 줄이므로)</li>
</ul>

<h2>주요 원인 및 위험 요인</h2>
<ul>
  <li><strong>나이</strong>: 연골 세포의 재생 능력 감소</li>
  <li><strong>비만</strong>: 관절에 가해지는 하중 증가</li>
  <li><strong>고관절·주관절 이형성증</strong>: 구조적 이상으로 조기 마모</li>
  <li><strong>이전 부상</strong>: 인대 파열, 골절 후 관절 변형</li>
  <li><strong>품종</strong>: 래브라도·골든 리트리버·독일 셰퍼드·버니즈 마운틴 등 대형견에서 높은 발생률</li>
</ul>

<h2>진단</h2>
<p>X선 검사로 관절 간격 좁아짐, 뼈돌기(골극) 형성 등을 확인합니다. 신체검사에서 관절 범위 제한, 통증 반응, 관절 부종을 평가합니다.</p>

<h2>치료 및 관리</h2>
<h3>약물 치료</h3>
<ul>
  <li><strong>NSAIDs (비스테로이드성 소염진통제)</strong>: 수의사 처방 후 장기 복용 시 신장·간 기능 모니터링 필요</li>
  <li><strong>가파펜틴, 아만타딘</strong>: 신경성 통증 보조 치료</li>
  <li><strong>로베나콕시브(주사형)</strong>: 급성 통증 조절용</li>
</ul>
<h3>보충제</h3>
<ul>
  <li>글루코사민·콘드로이틴: 연골 보호 및 통증 완화 (장기 복용 필요)</li>
  <li>오메가-3 지방산: 항염 효과</li>
  <li>UC-II 콜라겐: 면역 관용 유도 기전으로 관절 통증 감소</li>
</ul>
<h3>체중 관리</h3>
<p>과체중이면 10% 체중 감량만으로도 관절 통증이 크게 줄어듭니다. 처방식 다이어트 사료와 함께 칼로리 제한이 필요합니다.</p>
<h3>운동 및 재활</h3>
<ul>
  <li>저충격 운동: 수영, 수중 러닝머신(하이드로테라피)</li>
  <li>짧고 자주 걷기 — 장시간 산책은 오히려 악화</li>
  <li>부드러운 침구 제공 (관절에 쿠션)</li>
  <li>계단·소파 대신 경사로(ramp) 사용</li>
</ul>

<h2>통증 악화 신호</h2>
<p>기존 약으로 통증이 조절되지 않거나, 3다리로 걷거나, 밥을 안 먹는다면 즉시 수의사와 상담하세요. 약물 용량 조정 또는 다른 치료 옵션이 필요할 수 있습니다.</p>`,
    disclaimer:
      "본 정보는 수의학 참고 자료로 제공되며 의학적 진단·처방을 대체하지 않습니다. NSAIDs는 반드시 수의사 처방 후 사용해야 하며, 임의로 인간용 진통제(아세트아미노펜, 이부프로펜)를 투여하면 치명적입니다.",
    sources: [
      "Johnston SA. Osteoarthritis: Joint Anatomy, Physiology, and Pathobiology. Vet Clin North Am Small Anim Pract. 1997",
      "WSAVA Rehabilitation Guidelines for Small Animal Practice (2023)",
      "대한수의사회 통증 관리 임상 지침 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-21T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 42. 강아지 열사병 (guide, cat.3, YMYL) ────────────────────────────────
  {
    id: "seed-guide-dog-heat-stroke",
    slug: "dog-heat-stroke-guide",
    type: "guide",
    category: 3,
    title: "강아지 열사병 — 증상·응급처치·예방법",
    metaTitle: "강아지 열사병 증상·응급처치·예방 | 여름 필수 가이드 | 펫지기",
    metaDescription:
      "강아지 열사병(열 탈진) 초기 증상, 즉시 할 수 있는 응급처치 방법, 여름철 예방 수칙을 수의사 검토 정보로 안내합니다.",
    body: `<h2>열사병은 생명을 위협하는 응급 상황입니다</h2>
<p>강아지는 발바닥 땀샘과 헐떡임(panting)으로만 체온을 조절합니다. 기온·습도가 높거나 환기가 안 되는 공간에 갇히면 체온이 빠르게 41℃ 이상으로 올라 다장기 부전으로 이어질 수 있습니다. <strong>열사병은 수분 이내에 치명적이 될 수 있습니다.</strong></p>

<h2>고위험 상황</h2>
<ul>
  <li>🚗 <strong>뜨거운 차 안</strong>: 외부 25℃에서 차량 실내는 10분 이내 40℃ 돌파</li>
  <li>☀️ 직사광선 아래 야외 운동·훈련</li>
  <li>🏠 통풍이 없는 실내(비닐하우스, 베란다)</li>
  <li>습도가 높은 환경 — 습도가 높으면 헐떡임 효율이 급감</li>
</ul>

<h2>고위험 품종</h2>
<ul>
  <li>단두종(불독, 퍼그, 프렌치불독, 시추, 페키니즈): 기도가 좁아 헐떡임 효율 낮음</li>
  <li>비만견, 노령견, 심장·호흡기 질환 보유견</li>
  <li>검은 털 또는 두꺼운 이중모 품종</li>
</ul>

<h2>열사병 증상 — 단계별</h2>
<h3>초기 (체온 39~40℃)</h3>
<ul>
  <li>과도하고 거친 헐떡임</li>
  <li>잇몸·혀가 선홍색에서 점차 진한 붉은색으로 변함</li>
  <li>침 과다 분비, 불안·초조</li>
</ul>
<h3>중증 (체온 40~41℃+)</h3>
<ul>
  <li>비틀거림, 쓰러짐</li>
  <li>구토·설사</li>
  <li>잇몸이 창백하거나 흰색으로 변함</li>
  <li>의식 저하, 경련</li>
</ul>

<h2>즉시 할 수 있는 응급처치</h2>
<ol>
  <li><strong>그늘·냉방 공간으로 즉시 이동</strong></li>
  <li><strong>미지근한 물(차가운 물 X)로 몸 전체 적시기</strong> — 차가운 물은 피부 혈관을 수축시켜 체온 발산을 방해합니다.</li>
  <li><strong>선풍기 또는 에어컨으로 증발 냉각 촉진</strong></li>
  <li><strong>발바닥 사이에 알코올 솜 닦기</strong> (증발 효과)</li>
  <li><strong>의식이 있다면 물 조금씩 마시게 하기</strong> — 억지로 물을 먹이면 기도 흡인 위험</li>
  <li><strong>즉시 동물병원 이동</strong> — 응급처치 후에도 반드시 수의사 진료 필요</li>
</ol>
<p>⛔ 얼음물·얼음팩 직접 접촉 금지 — 저체온증 위험 및 말초 혈관 수축</p>

<h2>동물병원에서의 치료</h2>
<ul>
  <li>정맥 수액 요법 (체온 조절 + 탈수 교정)</li>
  <li>산소 공급</li>
  <li>파종성 혈관내 응고증(DIC), 급성 신부전 등 합병증 모니터링</li>
</ul>

<h2>예방 수칙</h2>
<ul>
  <li>차 안에 절대 혼자 두지 마세요 — "잠깐"도 안 됩니다.</li>
  <li>여름 산책은 오전 7시 이전 또는 오후 6시 이후</li>
  <li>아스팔트 온도 확인 — 손등 5초 테스트</li>
  <li>산책 시 물통 필수 휴대</li>
  <li>쿨매트, 쿨링 조끼 활용</li>
  <li>고위험 품종은 여름철 야외 활동 최소화</li>
</ul>`,
    disclaimer:
      "열사병은 응급 상황입니다. 위의 응급처치 후에도 반드시 동물병원을 방문해야 합니다. 가정 처치만으로는 내부 장기 손상 여부를 확인할 수 없습니다.",
    sources: [
      "Bruchim Y, et al. Heatstroke in Dogs: A Retrospective Study of 54 Cases. Vet Emerg Crit Care. 2006",
      "BSAVA Manual of Canine and Feline Emergency and Critical Care (3rd ed.)",
      "대한수의사회 응급처치 임상 지침 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-21T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 43. 고양이 구토 (condition, cat.3, YMYL) ──────────────────────────────
  {
    id: "seed-condition-cat-vomiting",
    slug: "cat-vomiting",
    type: "condition",
    category: 3,
    title: "고양이 구토 — 원인·증상·병원 가야 할 때",
    metaTitle: "고양이 구토 원인·응급 신호 | 언제 병원 가야 할까 | 펫지기",
    metaDescription:
      "고양이 구토의 흔한 원인(헤어볼·음식 급여·독성 물질), 병원에 가야 할 응급 신호, 구토 완화 방법을 수의사 검토 자료로 안내합니다.",
    body: `<h2>고양이 구토는 매우 흔하지만 모든 구토가 정상은 아닙니다</h2>
<p>고양이는 헤어볼(털 뭉치) 배출, 식탐으로 인한 과식, 공복 구토 등 비교적 양성적인 이유로 구토를 하기도 합니다. 그러나 빈번하거나 다른 증상을 동반하면 심각한 질환의 신호일 수 있습니다.</p>

<h2>흔한 원인</h2>
<h3>비교적 양성 원인</h3>
<ul>
  <li><strong>헤어볼(毛球)</strong>: 그루밍 중 삼킨 털이 위장에 쌓여 주기적으로 배출 (원통형 황갈색 덩어리)</li>
  <li><strong>식이 관련</strong>: 너무 빠르게 먹기, 사료 급격 변경, 과식</li>
  <li><strong>공복 구토</strong>: 노란 담즙 구토 — 공복 시간이 너무 길 때</li>
</ul>
<h3>주의가 필요한 원인</h3>
<ul>
  <li>이물질 섭취 (끈·고무줄·플라스틱 등)</li>
  <li>독성 물질 섭취 (식물, 약물, 세제)</li>
  <li>만성 신장 질환(CKD)</li>
  <li>갑상선 기능 항진증</li>
  <li>염증성 장 질환(IBD)</li>
  <li>종양(위장관·간·췌장)</li>
  <li>감염(바이러스·세균·기생충)</li>
</ul>

<h2>즉시 병원에 가야 할 응급 신호</h2>
<ul>
  <li>🚨 24시간 이내 3회 이상 반복 구토</li>
  <li>🚨 혈액이 섞인 구토 (선홍색 또는 커피색)</li>
  <li>🚨 구토와 함께 무기력·식욕 소실</li>
  <li>🚨 복부 팽만, 배를 움츠림, 만지면 아파함</li>
  <li>🚨 소변이 12시간 이상 없음 (특히 수컷)</li>
  <li>🚨 이물질을 먹은 것이 확인된 경우</li>
  <li>🚨 체중 감소를 동반한 만성 구토</li>
</ul>

<h2>진단</h2>
<p>증상 병력, 신체검사, 혈액검사, 소변검사, 복부 X선·초음파로 원인을 감별합니다. 만성 구토는 내시경이나 생검이 필요한 경우도 있습니다.</p>

<h2>가정에서 할 수 있는 것</h2>
<h3>헤어볼 예방</h3>
<ul>
  <li>주 2~3회 정기 빗질로 삼키는 털 양 감소</li>
  <li>헤어볼 케어 사료 또는 보충제 사용</li>
  <li>풀(캣그래스) 화분 제공</li>
</ul>
<h3>과식·급식 예방</h3>
<ul>
  <li>느린 급식 그릇(슬로우 피더) 사용</li>
  <li>하루 2~3회 소량씩 분할 급여</li>
  <li>사료 변경 시 1~2주에 걸쳐 서서히 교체</li>
</ul>
<h3>공복 구토 대처</h3>
<ul>
  <li>취침 전 소량의 사료를 추가 급여</li>
  <li>자동 급식기로 이른 아침 급여 시간 설정</li>
</ul>

<h2>주의 — 절대 먹이면 안 되는 것</h2>
<p>구토 후 가정에서 처방 없이 인간용 항구토제(메토클로프라미드, 온단세트론 등)를 투여하지 마세요. 고양이에게 독성이 있는 약물이 많습니다.</p>`,
    disclaimer:
      "본 정보는 수의학 참고 자료로 제공되며 의학적 진단과 치료를 대체하지 않습니다. 응급 신호가 보이면 즉시 동물병원을 방문하세요. 고양이에게 인간용 약물을 임의 투여하지 마세요.",
    sources: [
      "Trepanier L. Acute Vomiting in Cats. Vet Clin North Am Small Anim Pract. 2010",
      "ISFM Consensus Guidelines on the Diagnosis of Vomiting in Cats (2020)",
      "대한수의사회 소동물 임상 가이드라인 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-21T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 44. 고양이 실내 안전 가이드 (guide, cat.5) ────────────────────────────
  {
    id: "seed-guide-cat-indoor-safety",
    slug: "cat-indoor-safety-guide",
    type: "guide",
    category: 5,
    title: "고양이 실내 안전 가이드 — 위험 요소 완벽 점검",
    metaTitle: "고양이 실내 안전 점검 리스트 | 독성 식물·추락 방지 | 펫지기",
    metaDescription:
      "고양이에게 위험한 실내 환경 요소(독성 식물, 추락 위험, 끈류, 화학물질)를 점검하고 안전한 집을 만드는 방법을 안내합니다.",
    body: `<h2>실내 고양이도 위험에 노출되어 있습니다</h2>
<p>실내 생활이 실외보다 안전하지만, 집 안에도 고양이에게 치명적인 위험 요소가 숨어 있습니다. 입양 전, 또는 새로운 물건을 들이기 전에 반드시 점검하세요.</p>

<h2>1. 독성 식물</h2>
<p>고양이는 식물을 씹거나 핥는 경우가 많아 독성 식물에 의한 중독이 흔합니다.</p>
<h3>절대 금지 식물</h3>
<ul>
  <li><strong>백합류(lily)</strong>: 화분 흙, 꽃가루만 닿아도 급성 신부전 유발 — 단 한 잎도 위험</li>
  <li><strong>알로에 베라</strong>: 구토·설사·떨림</li>
  <li><strong>수선화(나르시서스)</strong>: 구토·경련</li>
  <li><strong>디펜바키아(만년청)</strong>: 구강 점막 자극·부종</li>
  <li><strong>포인세티아</strong>: 구토·설사 (치명적이지는 않으나 위험)</li>
  <li><strong>포도·건포도</strong>: 급성 신부전</li>
</ul>
<h3>비교적 안전한 식물</h3>
<p>캣그래스(귀리·보리 새싹), 캣닙, 스파이더 플랜트 등은 고양이에게 무독성입니다.</p>

<h2>2. 추락 방지 (고층 낙하 증후군)</h2>
<p>고양이는 높은 곳을 좋아하지만, 고층 창문에서의 추락은 심각한 부상을 유발합니다.</p>
<ul>
  <li>모든 창문에 방충망 또는 전용 캣넷(cat net) 설치</li>
  <li>방충망은 고양이 무게에 충분히 견디는 강화 제품 사용</li>
  <li>베란다·테라스는 탈출 방지 펜스 설치</li>
</ul>

<h2>3. 끈·실·고무줄 — 장폐색 위험</h2>
<ul>
  <li>노끈, 낚싯줄, 실, 고무밴드, 머리끈 등은 삼키면 장폐색(linear foreign body) 유발</li>
  <li>장난감의 끈은 감독 없이 두지 마세요</li>
  <li>바늘·실 세트 사용 후 즉시 수납</li>
</ul>

<h2>4. 화학물질 및 약품</h2>
<ul>
  <li><strong>에센셜 오일</strong>: 티트리·페퍼민트·유칼립투스·계피오일 등 — 디퓨저 분무도 위험</li>
  <li><strong>세제·락스</strong>: 희석 후에도 발바닥 흡수 위험 — 환기 후 건조 확인</li>
  <li><strong>항균 물티슈(페놀 계열)</strong>: 고양이 간 대사 불가 성분 포함 제품 주의</li>
  <li><strong>인간용 NSAIDs (아스피린·이부프로펜·아세트아미노펜)</strong>: 소량도 치명적</li>
</ul>

<h2>5. 전선 및 전자제품</h2>
<ul>
  <li>충전 케이블·전선은 고양이가 씹을 수 있어 감전 위험</li>
  <li>케이블 보호 커버 또는 케이블 박스 활용</li>
  <li>세탁기·건조기는 사용 전 고양이 확인 — 숨어 들어가는 경우가 있음</li>
</ul>

<h2>6. 화장실·욕실</h2>
<ul>
  <li>변기 뚜껑 항상 닫기 — 어린 고양이 익수 위험</li>
  <li>변기 세정제(블루 계열) 독성</li>
  <li>샴푸·린스·화장품 수납장에 잠금 고려</li>
</ul>

<h2>응급 연락처</h2>
<p>독성 물질 섭취가 의심되면 24시간 동물병원에 즉시 연락하세요. 국내 동물 독성 정보는 농림축산검역본부(1588-4060)에서 안내받을 수 있습니다.</p>`,
    disclaimer: null,
    sources: [
      "ASPCA Animal Poison Control Center — Toxic and Non-Toxic Plants (2024)",
      "Hovda LR, et al. Blackwell's Five-Minute Veterinary Consult Clinical Companion — Small Animal Toxicology (2016)",
      "대한수의사회 반려동물 가정 안전 지침 (2023)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-21T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 45. 강아지 설사 (condition, cat.3, YMYL) ──────────────────────────────
  {
    id: "seed-condition-dog-diarrhea",
    slug: "dog-diarrhea",
    type: "condition",
    category: 3,
    title: "강아지 설사 — 원인·응급 신호·가정 대처법",
    metaTitle: "강아지 설사 원인·응급 신호·대처 | 병원 가야 할 때 | 펫지기",
    metaDescription:
      "강아지 설사의 흔한 원인(사료 변경·식이 오류·감염), 즉시 병원을 가야 할 응급 신호, 집에서 할 수 있는 관리법을 수의사 검토로 안내합니다.",
    body: `<h2>강아지 설사란?</h2>
<p>설사는 강아지에게 매우 흔한 증상으로, 대부분은 식이성 원인으로 자연히 회복됩니다. 그러나 반복적이거나 혈변이 동반되면 심각한 질환의 신호일 수 있어 주의가 필요합니다.</p>

<h2>흔한 원인</h2>
<h3>식이성 원인</h3>
<ul>
  <li>사료 급격 변경 (1~2주에 걸쳐 서서히 교체해야 함)</li>
  <li>과식, 지방이 많은 음식 섭취</li>
  <li>쓰레기통 뒤지기, 낯선 음식 섭취</li>
  <li>유제품·글루텐 등 음식 불내증</li>
</ul>
<h3>감염성 원인</h3>
<ul>
  <li>세균 감염 (살모넬라, 캄필로박터)</li>
  <li>바이러스 감염 (파보 바이러스 — 접종 미완 강아지 고위험)</li>
  <li>기생충 (지아디아, 회충, 구충)</li>
</ul>
<h3>기타 원인</h3>
<ul>
  <li>스트레스성 설사 (여행, 새 환경)</li>
  <li>항생제·NSAIDs 부작용</li>
  <li>염증성 장 질환(IBD)</li>
  <li>췌장 외분비 기능 부전(EPI)</li>
</ul>

<h2>즉시 병원에 가야 할 응급 신호</h2>
<ul>
  <li>🚨 혈변 (선홍색 또는 검은 타르 색)</li>
  <li>🚨 구토를 동반한 설사</li>
  <li>🚨 24시간 이상 지속되는 설사</li>
  <li>🚨 심한 무기력·식욕 소실</li>
  <li>🚨 퍼피(4개월 미만)의 설사 — 탈수 위험 높음</li>
  <li>🚨 복부 팽만, 경련</li>
  <li>🚨 접종 미완료 강아지의 설사 (파보 바이러스 의심)</li>
</ul>

<h2>가정 대처법 (경미한 급성 설사)</h2>
<h3>금식 후 점진적 급여</h3>
<ul>
  <li>성견: 12~24시간 금식 (신선한 물은 충분히 제공)</li>
  <li>퍼피·노령견: 금식하지 말고 소량씩 자주 급여</li>
  <li>금식 후 삶은 닭가슴살 + 흰쌀밥 (무염) 소량부터 급여</li>
  <li>2~3일에 걸쳐 일반 사료로 점진 전환</li>
</ul>
<h3>수분 공급</h3>
<p>설사로 탈수가 빠르게 진행됩니다. 잇몸을 눌렀다 뗄 때 2초 이내에 분홍색으로 돌아오지 않으면 탈수 신호입니다. 전해질 용액(펫 전용)을 사용할 수 있습니다.</p>

<h2>예방</h2>
<ul>
  <li>사료 변경은 1~2주에 걸쳐 점진적으로</li>
  <li>정기 구충제 투여 (3~6개월마다)</li>
  <li>예방접종 일정 유지 (파보, 디스템퍼)</li>
  <li>쓰레기통·유해 음식 접근 차단</li>
</ul>`,
    disclaimer:
      "본 정보는 수의학 참고 자료로 제공되며 의학적 진단과 치료를 대체하지 않습니다. 응급 신호가 있으면 즉시 동물병원을 방문하세요. 퍼피나 노령견의 설사는 더욱 빠르게 위험해질 수 있습니다.",
    sources: [
      "Tams TR. Handbook of Small Animal Gastroenterology (2nd ed.)",
      "WSAVA Gastrointestinal Standardization Group Guidelines (2021)",
      "대한수의사회 소동물 임상 가이드라인 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 46. 강아지 중성화 가이드 (guide, cat.1) ────────────────────────────────
  {
    id: "seed-guide-dog-neutering-spaying",
    slug: "dog-neutering-spaying-guide",
    type: "guide",
    category: 1,
    title: "강아지 중성화 수술 완벽 가이드 — 시기·장단점·주의사항",
    metaTitle: "강아지 중성화 수술 시기·장단점·비용 | 수의사 검토 | 펫지기",
    metaDescription:
      "강아지 중성화 수술의 적정 시기, 수술 장단점, 비용, 수술 전후 주의사항을 수의사 검토 자료로 안내합니다. 암컷 난소자궁적출·수컷 고환적출 모두 포함.",
    body: `<h2>강아지 중성화 수술이란?</h2>
<p>중성화 수술은 번식 능력을 제거하는 수술입니다. 암컷은 난소자궁적출술(OHE), 수컷은 고환적출술(castration)이 일반적입니다. 개체 수 조절, 호르몬 관련 질환 예방, 행동 개선 등 다양한 이점이 있습니다.</p>

<h2>적정 수술 시기</h2>
<ul>
  <li><strong>소형견 암컷</strong>: 첫 발정 전(6~8개월), 또는 첫 발정 후 3개월</li>
  <li><strong>대형견 암컷</strong>: 12~18개월 (성장 완료 후) — 뼈 성장에 미치는 영향 고려</li>
  <li><strong>수컷</strong>: 6~12개월이 일반적이나 품종과 크기에 따라 다름</li>
</ul>
<p>최적 시기는 품종, 크기, 건강 상태에 따라 달라집니다. 수의사와 상담 후 결정하세요.</p>

<h2>중성화 수술의 장점</h2>
<h3>암컷</h3>
<ul>
  <li>자궁축농증(pyometra) 예방 — 중성화 미수술 암컷에서 매우 흔한 응급 질환</li>
  <li>첫 발정 전 수술 시 유방암 발생 위험 크게 감소</li>
  <li>발정 중 탈출·교통사고 위험 감소</li>
  <li>가성임신(pseudopregnancy) 예방</li>
</ul>
<h3>수컷</h3>
<ul>
  <li>고환암·전립선 질환 예방</li>
  <li>영역 표시(마킹) 행동 감소</li>
  <li>공격성·방랑 행동 완화 (일부 개체)</li>
</ul>

<h2>중성화 수술의 단점 및 주의사항</h2>
<ul>
  <li>비만 위험 증가 — 기초대사량 감소로 체중 관리 필수</li>
  <li>일부 품종(대형견)에서 골관절염·골육종 발생 관계 연구 있음</li>
  <li>호르몬 의존성 행동 특성 소실 (일부 보호자는 변화를 원치 않을 수 있음)</li>
  <li>수술 자체의 마취 위험 (매우 낮지만 고령·기저 질환 보유견은 사전 검사 필요)</li>
</ul>

<h2>수술 전 준비</h2>
<ul>
  <li>수술 전날 밤 자정부터 금식·금수 (정확한 지침은 병원마다 다름)</li>
  <li>수술 당일 아침 체온·컨디션 확인</li>
  <li>기저 질환이 있으면 사전 혈액검사 필수</li>
</ul>

<h2>수술 후 관리</h2>
<ul>
  <li>귀가 당일은 안정을 취하게 하고, 과격한 활동 금지</li>
  <li>엘리자베스 칼라 착용으로 봉합 부위 핥기 방지 (10~14일)</li>
  <li>매일 봉합 부위 확인 — 붓기·분비물·발적 지속 시 병원 연락</li>
  <li>수술 후 2주는 목욕 금지</li>
  <li>식이 조절 시작 — 칼로리를 10~15% 감량</li>
</ul>

<h2>비용</h2>
<p>병원과 지역마다 다르지만, 일반적으로 암컷 15~40만원, 수컷 10~25만원 수준입니다. 일부 지자체에서 중성화 수술 비용 지원 사업을 운영합니다. 거주 지역 동물보호팀에 문의하세요.</p>`,
    disclaimer: null,
    sources: [
      "AVMA (American Veterinary Medical Association) — Elective Surgical Sterilization of Dogs (2023)",
      "Root Kustritz MV. Determining the optimal age for gonadectomy. J Am Vet Med Assoc. 2007",
      "대한수의사회 임상 가이드라인 (2022)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 47. 반려동물 건강검진 가이드 (guide, cat.3, YMYL) ─────────────────────
  {
    id: "seed-guide-pet-health-checkup",
    slug: "pet-health-checkup-guide",
    type: "guide",
    category: 3,
    title: "반려동물 정기 건강검진 가이드 — 주기·항목·준비",
    metaTitle: "반려동물 건강검진 주기·항목·비용 | 강아지·고양이 검진 | 펫지기",
    metaDescription:
      "강아지·고양이 건강검진의 권장 주기, 나이별 검사 항목, 검진 전 준비사항, 예상 비용을 수의사 검토로 안내합니다.",
    body: `<h2>왜 정기 건강검진이 중요한가요?</h2>
<p>반려동물은 증상을 숨기는 경향이 있어 보호자가 눈치채기 전에 이미 질병이 상당히 진행되는 경우가 많습니다. 정기 건강검진은 증상이 없더라도 조기에 질환을 발견하고 치료 비용을 줄이는 가장 효과적인 방법입니다.</p>

<h2>권장 검진 주기</h2>
<ul>
  <li><strong>1~6세 성체</strong>: 연 1회</li>
  <li><strong>7세 이상 노령</strong>: 연 2회 (6개월마다)</li>
  <li><strong>퍼피·키튼 (12개월 미만)</strong>: 예방접종 방문 시 매회 검진 + 1세 종합 검진</li>
  <li><strong>만성 질환 보유 동물</strong>: 수의사 지시에 따라 더 자주</li>
</ul>

<h2>나이별 권장 검사 항목</h2>
<h3>1~6세 (성체 기본 검진)</h3>
<ul>
  <li>신체검사 (체중·체형·심장·폐·복부 촉진·치아)</li>
  <li>혈액 기본 검사 (CBC 전혈구, 생화학 패널)</li>
  <li>소변검사</li>
  <li>분변 기생충 검사</li>
  <li>예방접종 상태 확인</li>
</ul>
<h3>7세 이상 (노령 검진 추가)</h3>
<ul>
  <li>위 항목 + 갑상선 검사 (고양이 필수)</li>
  <li>흉부·복부 X선</li>
  <li>복부 초음파 (장기 크기·종양 확인)</li>
  <li>혈압 측정</li>
  <li>눈 검사 (백내장·녹내장)</li>
</ul>
<h3>대형견 추가 권장</h3>
<ul>
  <li>고관절·주관절 X선 (이형성증 모니터링)</li>
  <li>심장 청진 (심비대·심잡음 평가)</li>
</ul>

<h2>검진 전 준비사항</h2>
<ul>
  <li><strong>금식</strong>: 혈액 지질 검사의 정확도를 위해 8~12시간 금식 권장 (물은 가능)</li>
  <li><strong>소변·대변 샘플</strong>: 방문 당일 아침 채취 (밀폐 용기 보관)</li>
  <li><strong>기록지 준비</strong>: 최근 행동 변화, 먹는 양, 식수량, 배변 상태 메모</li>
  <li><strong>접종 수첩</strong>: 이전 접종·검진 기록 지참</li>
</ul>

<h2>예상 비용 (병원·지역별 차이 있음)</h2>
<ul>
  <li>기본 검진(신체검사 + 혈액 기본): 5~15만원</li>
  <li>혈액 종합 + 소변: 10~25만원</li>
  <li>노령 종합 검진 (X선·초음파 포함): 25~60만원</li>
</ul>
<p>일부 지자체 및 동물병원에서 정기 건강검진 할인 패키지를 운영합니다. 단골 병원에 문의해보세요.</p>

<h2>검진 결과 해석 팁</h2>
<ul>
  <li>혈액 정상 범위는 동물의 나이·품종·성별에 따라 다릅니다. 수치가 범위를 약간 벗어났다고 바로 질환을 의미하지 않습니다.</li>
  <li>중요한 것은 <strong>추세</strong>입니다. 같은 병원에서 동일 장비로 반복 검사해 변화 추이를 파악하세요.</li>
  <li>모르는 용어나 수치는 수의사에게 설명을 요청하세요.</li>
</ul>`,
    disclaimer:
      "본 가이드는 참고 정보로, 개별 반려동물의 건강 상태에 맞는 검진 항목은 담당 수의사와 상담해 결정하세요.",
    sources: [
      "AAHA Senior Care Guidelines for Dogs and Cats (2023)",
      "WSAVA Global Vaccination Guidelines (2022)",
      "대한수의사회 반려동물 예방의학 권고안 (2023)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 48. 고양이 체중 관리·비만 (condition, cat.3, YMYL) ────────────────────
  {
    id: "seed-condition-cat-obesity",
    slug: "cat-obesity",
    type: "condition",
    category: 3,
    title: "고양이 비만 — 원인·진단·식이 관리",
    metaTitle: "고양이 비만 원인·체중 감량 방법 | 수의사 검토 | 펫지기",
    metaDescription:
      "고양이 비만의 원인(과식·실내 생활·중성화), 체형 점수(BCS) 자가 진단, 안전한 체중 감량 방법을 수의사 검토로 안내합니다.",
    body: `<h2>고양이 비만이란?</h2>
<p>고양이 비만은 이상 체중보다 20% 이상 과체중인 상태를 말합니다. 국내 반려 고양이의 약 30~40%가 과체중 또는 비만으로 추정됩니다. 비만은 당뇨병, 관절염, 간지방증(hepatic lipidosis), 하부 요로 질환(FLUTD) 등 심각한 합병증의 위험을 높입니다.</p>

<h2>주요 원인</h2>
<ul>
  <li><strong>과식</strong>: 자유식(free-choice feeding), 고칼로리 간식 과다</li>
  <li><strong>실내 생활</strong>: 운동 부족</li>
  <li><strong>중성화 수술</strong>: 기초대사율 20~30% 감소, 식욕 증가</li>
  <li><strong>나이</strong>: 노령 고양이는 근육량 감소로 지방 축적 용이</li>
  <li><strong>일부 질환</strong>: 갑상선 기능 저하증(드뭄), 쿠싱증후군</li>
</ul>

<h2>체형 점수(BCS)로 자가 진단</h2>
<p>BCS(Body Condition Score) 1~9점 척도에서 4~5점이 이상적입니다.</p>
<ul>
  <li><strong>정상 (4~5점)</strong>: 갈비뼈가 살짝 느껴지며, 위에서 봤을 때 허리 잘록함이 보임</li>
  <li><strong>과체중 (6~7점)</strong>: 갈비뼈에 지방층이 느껴지며, 허리 라인 불분명</li>
  <li><strong>비만 (8~9점)</strong>: 갈비뼈가 느껴지지 않으며, 복부 지방 과다, 등 지방 두드러짐</li>
</ul>

<h2>안전한 체중 감량 방법</h2>
<h3>급격한 다이어트는 위험합니다</h3>
<p>고양이를 갑자기 굶기거나 식이를 급격히 제한하면 간지방증(hepatic lipidosis)이 발생할 수 있습니다. 수의사 지도 하에 천천히 감량하세요.</p>
<h3>목표: 월 1~2% 체중 감량</h3>
<ul>
  <li>현재 사료량을 10~20% 줄이고 반드시 계량컵 사용</li>
  <li>처방 체중 감량 사료(저지방·고단백·고섬유)로 교체 고려</li>
  <li>하루 2~3회 정량 급여 (자유식 금지)</li>
  <li>간식은 하루 칼로리의 10% 이내로 제한</li>
</ul>
<h3>운동 늘리기</h3>
<ul>
  <li>하루 2회 10~15분 낚싯대·레이저 포인터 등 적극적 놀이</li>
  <li>노즈워크 피더, 퍼즐 급식기로 정신 자극 + 느린 식사 유도</li>
  <li>캣타워, 선반 등 수직 공간 활용으로 자발적 활동 증가</li>
</ul>

<h2>관련 합병증</h2>
<ul>
  <li>제2형 당뇨병 (인슐린 저항성)</li>
  <li>관절염 (체중 부하)</li>
  <li>하부 요로 질환 (활동 감소·수분 부족)</li>
  <li>심폐 기능 저하</li>
  <li>피부 청결 유지 어려움 (유연성 감소로 그루밍 불가)</li>
</ul>`,
    disclaimer:
      "본 정보는 수의학 참고 자료로 제공되며 의학적 진단과 치료를 대체하지 않습니다. 고양이 다이어트는 수의사 지도 하에 진행하세요. 급격한 식이 제한은 간지방증을 유발할 수 있습니다.",
    sources: [
      "WSAVA Global Nutrition Guidelines (2021)",
      "German AJ, et al. Obesity in the Cat: Epidemiology and Etiology. J Feline Med Surg. 2010",
      "대한수의사회 영양 관리 임상 지침 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 49. 강아지 눈물자국 (condition, cat.3) ────────────────────────────────
  {
    id: "seed-condition-dog-tear-staining",
    slug: "dog-tear-staining",
    type: "condition",
    category: 3,
    title: "강아지 눈물자국 — 원인·색깔별 감별·관리법",
    metaTitle: "강아지 눈물자국 원인·제거 방법 | 붉은 갈색 색소 | 펫지기",
    metaDescription:
      "강아지 눈물자국의 원인(포르피린 색소, 역속눈썹, 누관 막힘), 색깔별 감별 포인트, 일상 관리법을 안내합니다.",
    body: `<h2>강아지 눈물자국이란?</h2>
<p>강아지 눈물자국(epiphora)은 눈물이 과도하게 흘러 눈 주변과 코 양옆에 갈색·적갈색 자국이 생기는 현상입니다. 말티즈, 시추, 비숑 프리제, 포메라니안, 푸들 등 흰 털 소형견에서 특히 두드러집니다.</p>

<h2>눈물자국의 주요 원인</h2>
<h3>포르피린 색소</h3>
<p>눈물에는 철분 함유 포르피린(porphyrin) 색소가 포함되어 있습니다. 피부에 닿아 산화되면 적갈색으로 변하며, 이것이 대부분 눈물자국의 주요 원인입니다.</p>
<h3>해부학적 원인</h3>
<ul>
  <li><strong>역속눈썹(distichia/trichiasis)</strong>: 눈썹이 각막을 자극해 눈물 분비 증가</li>
  <li><strong>안와(눈구멍) 얕음</strong>: 단두종에서 눈이 돌출되어 눈물이 잘 흘러내림</li>
  <li><strong>누점·누관 협착</strong>: 눈물이 코로 제대로 배출되지 못하고 눈꺼풀로 넘침</li>
</ul>
<h3>환경·식이 원인</h3>
<ul>
  <li>음식 알레르기 또는 불내증</li>
  <li>먼지·연기·향수 등 환경 자극물</li>
  <li>수질 (철분 함량 높은 물)</li>
</ul>
<h3>질환성 원인</h3>
<ul>
  <li>결막염, 각막 궤양</li>
  <li>안압 상승 (녹내장)</li>
  <li>치아 문제 (누관 주변 치아 뿌리 감염)</li>
</ul>

<h2>색깔로 감별하기</h2>
<ul>
  <li><strong>갈색·적갈색</strong>: 포르피린 산화 (일반적)</li>
  <li><strong>흰색·노란색 분비물</strong>: 세균 감염 의심 — 병원 방문 권장</li>
  <li><strong>녹색 분비물</strong>: 세균성 결막염 가능성 높음 — 병원 필요</li>
  <li><strong>갑자기 증가</strong>: 이물질·알레르기·감염 확인 필요</li>
</ul>

<h2>일상 관리법</h2>
<ul>
  <li><strong>하루 1~2회 닦기</strong>: 무향 생리식염수 또는 전용 눈 세정액으로 면봉이나 거즈를 이용해 닦기</li>
  <li><strong>털 정리</strong>: 눈 주변 털이 눈에 닿지 않도록 정기 트리밍</li>
  <li><strong>물 바꾸기</strong>: 정수된 물 제공 (철분 함량 줄이기)</li>
  <li><strong>식이 점검</strong>: 첨가물이 적은 고품질 사료로 교체 고려</li>
</ul>
<h3>병원에서 할 수 있는 치료</h3>
<ul>
  <li>역속눈썹 제거 시술</li>
  <li>누관 세척 (막힌 경우)</li>
  <li>원인 질환 치료</li>
</ul>

<h2>시중 눈물자국 제거제 주의사항</h2>
<p>항생제 성분이 포함된 제품을 수의사 처방 없이 장기 사용하면 내성균 발생 위험이 있습니다. 인터넷에서 판매되는 일부 제품에는 미국 FDA에서 금지된 성분이 포함된 경우도 있으니 주의가 필요합니다.</p>`,
    disclaimer:
      "본 정보는 참고용이며 의학적 진단을 대체하지 않습니다. 눈물 분비량이 갑자기 늘거나, 눈을 긁거나, 눈이 충혈·흐릿하다면 동물병원을 방문하세요.",
    sources: [
      "Gelatt KN. Veterinary Ophthalmology (5th ed.)",
      "ACVO (American College of Veterinary Ophthalmologists) — Epiphora in Dogs",
      "대한수의사회 안과 임상 가이드라인 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 50. 반려동물 펫시터 이용 가이드 (guide, cat.5) ────────────────────────
  {
    id: "seed-guide-pet-sitter",
    slug: "pet-sitter-guide",
    type: "guide",
    category: 5,
    title: "반려동물 펫시터 이용 가이드 — 선택·준비·주의사항",
    metaTitle: "반려동물 펫시터 선택 방법·비용·주의사항 | 펫지기",
    metaDescription:
      "반려동물 펫시터 서비스 종류, 좋은 펫시터 선택 기준, 이용 전 준비사항, 비용, 주의사항을 안내합니다.",
    body: `<h2>펫시터란?</h2>
<p>펫시터는 보호자가 집을 비운 동안 반려동물을 돌봐주는 서비스입니다. 펫호텔과 달리 보호자 집에 방문하거나, 펫시터 집에서 돌봐주는 방식입니다. 환경 변화 스트레스가 적어 예민한 동물에게 적합합니다.</p>

<h2>펫시터 서비스 종류</h2>
<ul>
  <li><strong>방문 돌봄 (Drop-in Visit)</strong>: 하루 1~3회 보호자 집 방문, 밥·물·산책·놀이 제공. 가장 저렴하고 환경 변화 없음</li>
  <li><strong>자택 상주 (House Sitting)</strong>: 펫시터가 보호자 집에 머물며 돌봄. 가장 자연스러운 환경</li>
  <li><strong>펫시터 자택 돌봄 (Boarding)</strong>: 반려동물이 펫시터 집에서 생활. 다른 동물이 없는지 확인 필요</li>
  <li><strong>강아지 산책 (Dog Walking)</strong>: 정해진 시간에 산책 대행</li>
</ul>

<h2>좋은 펫시터 선택 기준</h2>
<ul>
  <li><strong>자격·경험 확인</strong>: 반려동물 관련 자격증(동물보건사·훈련사) 또는 케어 경험 보유 여부</li>
  <li><strong>참고인(레퍼런스)</strong>: 이전 이용자 후기·평점 확인</li>
  <li><strong>사전 만남(Meet & Greet)</strong>: 정식 예약 전 보호자·동물·펫시터가 함께 만나는 시간</li>
  <li><strong>보험 가입 여부</strong>: 사고 시 책임 보상 가능 여부</li>
  <li><strong>응급 대처 능력</strong>: CPR 교육, 근처 동물병원 파악 여부</li>
</ul>

<h2>이용 전 준비사항</h2>
<ul>
  <li>예방접종 증빙서류 준비 (일부 플랫폼 필수)</li>
  <li>사료·간식·약품 정량 및 복용 방법 메모</li>
  <li>단골 동물병원 연락처 + 응급병원 주소 전달</li>
  <li>동물의 특이 사항 (두려워하는 것, 공격 유발 요인, 좋아하는 장난감) 공유</li>
  <li>집 구조 및 잠금 방법 안내 (방문 서비스의 경우)</li>
  <li>여행 중 연락 방법 및 비상 연락처(가족·지인) 전달</li>
</ul>

<h2>예상 비용</h2>
<ul>
  <li>방문 돌봄 (1회 30~60분): 1~3만원</li>
  <li>자택 상주 (1박): 5~12만원</li>
  <li>펫시터 자택 숙박 (1박): 3~8만원</li>
  <li>강아지 산책 (30~60분): 1~2만원</li>
</ul>
<p>가격은 지역, 동물 수, 플랫폼, 개별 펫시터에 따라 다릅니다. 플랫폼을 통하면 플랫폼 수수료가 추가됩니다.</p>

<h2>주의사항</h2>
<ul>
  <li>첫 이용 시 짧은 일정으로 테스트하세요 (1~2일).</li>
  <li>카메라·위치 공유 앱으로 이용 중에도 상태를 확인하세요.</li>
  <li>공격성이 있는 동물은 반드시 사전에 고지하세요.</li>
  <li>이상 징후 발견 시 즉각 연락이 가능한지 확인하세요.</li>
</ul>`,
    disclaimer: null,
    sources: [
      "Pet Sitters International (PSI) — Standards of Practice (2023)",
      "NAPPS (National Association of Professional Pet Sitters) — Client Safety Guidelines",
      "한국펫시터협회 서비스 가이드라인 (2023)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 51. 반려동물 장례 절차 안내 (guide, cat.6, YMYL) ─────────────────────
  {
    id: "seed-guide-memorial-ceremony",
    slug: "memorial-ceremony",
    type: "guide",
    category: 6,
    title: "반려동물 장례 절차 안내 — 접수부터 봉안까지",
    metaTitle: "반려동물 장례 절차 안내 | 접수·화장·봉안 단계별 | 펫지기",
    metaDescription:
      "반려동물 장례의 접수, 안치, 화장, 납골 절차를 단계별로 안내합니다. 합법적 장묘업체 선택 방법과 필요 서류도 함께 정리했습니다.",
    body: `<h2>반려동물 장례를 준비할 때</h2>
<p>소중한 반려동물을 잃은 슬픔 속에서도 장례 절차를 처리해야 하는 현실은 무겁습니다. 미리 절차를 파악해두면 갑작스러운 상황에서도 마음의 여유를 가질 수 있습니다.</p>

<h2>법적 근거</h2>
<p>국내에서 반려동물 사체는 <strong>동물보호법</strong>에 따라 적법하게 처리해야 합니다. 허가된 동물장묘업체를 이용하거나, 자가 처리(자택 매장)의 경우 법적 조건을 확인해야 합니다. 일반 쓰레기봉투 폐기는 불법입니다.</p>

<h2>단계별 장례 절차</h2>
<h3>1단계 — 임시 안치</h3>
<ul>
  <li>반려동물이 사망하면 깨끗한 수건으로 감싸 시원한 곳에 임시 안치합니다.</li>
  <li>장례업체에 연락 시까지 최대 24~48시간 이내에 처리를 시작하는 것이 좋습니다.</li>
  <li>직사광선과 습한 곳을 피하고, 냉장 보관 가능하면 4℃ 이하에서 임시 보관 가능합니다.</li>
</ul>
<h3>2단계 — 장묘업체 연락 및 접수</h3>
<ul>
  <li>합법적 허가를 받은 동물장묘업체에 연락합니다.</li>
  <li>서비스 종류(화장·납골·수목장 등), 비용, 진행 방식, 유해 처리 방법을 확인합니다.</li>
  <li>방문 또는 수거 서비스 선택 (일부 업체는 24시간 수거 서비스 운영).</li>
</ul>
<h3>3단계 — 안치 및 장례식</h3>
<ul>
  <li>업체에 도착하면 반려동물을 전용 안치실에 안치합니다.</li>
  <li>간단한 장례식을 진행하는 업체도 있으며, 보호자가 직접 참여할 수 있습니다.</li>
  <li>꽃 헌화, 사진 촬영, 마지막 인사를 나눌 수 있는 시간을 제공합니다.</li>
</ul>
<h3>4단계 — 화장</h3>
<ul>
  <li>개별 화장: 반려동물 단독 화장 후 유해를 받을 수 있습니다.</li>
  <li>합동 화장: 비용이 낮지만 개별 유해를 돌려받지 못합니다.</li>
  <li>화장 시간은 체중에 따라 1~3시간 정도 소요됩니다.</li>
</ul>
<h3>5단계 — 유해 처리 (납골·산골·수목장)</h3>
<ul>
  <li><strong>납골함 보관</strong>: 업체 납골당 안치 또는 집에 보관</li>
  <li><strong>산골</strong>: 지정 장소에 유해 뿌리기 (법적 조건 확인 필요)</li>
  <li><strong>수목장</strong>: 나무 아래에 유해를 묻어 자연으로 돌아가게 하는 방식</li>
  <li><strong>기념 제품 제작</strong>: 유골을 이용한 다이아몬드·유리공 등 기념품 제작 가능</li>
</ul>

<h2>장묘업체 선택 시 확인사항</h2>
<ul>
  <li>농림축산검역본부 또는 지자체 허가 여부 확인</li>
  <li>개별 화장 여부 명확히 확인 (혼합 화장 불법 여부 질의)</li>
  <li>유해 처리 과정 투명성 (보호자 참관 가능 여부)</li>
  <li>24시간 연락 가능 여부</li>
  <li>전체 비용 사전 안내 (추가 비용 발생 여부)</li>
</ul>

<h2>필요 서류</h2>
<p>일반적으로 별도 서류 없이 진행 가능합니다. 일부 업체에서 반려동물 등록 번호 확인 또는 간단한 신청서 작성을 요구할 수 있습니다.</p>`,
    disclaimer:
      "본 안내는 일반적인 정보 제공 목적이며, 구체적인 절차와 비용은 이용 업체에 직접 확인하시기 바랍니다. 합법적 허가 업체 이용을 강력히 권장합니다.",
    sources: [
      "동물보호법 (농림축산식품부, 2023년 개정)",
      "농림축산검역본부 — 동물장묘업 허가 현황 (2024)",
      "한국반려동물장례협회 서비스 기준 가이드 (2023)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 52. 반려동물 장례 비용 가이드 (guide, cat.6, YMYL) ───────────────────
  {
    id: "seed-guide-memorial-cost",
    slug: "memorial-cost",
    type: "guide",
    category: 6,
    title: "반려동물 장례 비용 가이드 — 유형별 비용 범위",
    metaTitle: "반려동물 장례 비용 | 화장·납골·수목장 가격 비교 | 펫지기",
    metaDescription:
      "반려동물 화장, 납골, 수목장, 기념 제품 등 장례 유형별 평균 비용 범위와 절약 팁을 안내합니다.",
    body: `<h2>반려동물 장례 비용, 얼마나 드나요?</h2>
<p>반려동물 장례 비용은 체중, 서비스 유형, 업체, 지역에 따라 크게 다릅니다. 미리 비용 범위를 파악해두면 갑작스러운 상황에서도 냉정하게 판단할 수 있습니다.</p>

<h2>서비스 유형별 비용 범위</h2>
<h3>화장 서비스</h3>
<ul>
  <li><strong>합동 화장</strong>: 5~15만원 (체중 상관없이 저렴, 개별 유해 불가)</li>
  <li><strong>개별 화장 (소형, 5kg 미만)</strong>: 15~30만원</li>
  <li><strong>개별 화장 (중형, 5~15kg)</strong>: 25~45만원</li>
  <li><strong>개별 화장 (대형, 15kg 이상)</strong>: 40~80만원</li>
</ul>
<h3>안치·납골</h3>
<ul>
  <li><strong>납골당 안치 (1년)</strong>: 10~30만원 (연 갱신)</li>
  <li><strong>납골함 구입</strong>: 3~15만원 (업체·재질에 따라 다름)</li>
</ul>
<h3>수목장</h3>
<ul>
  <li><strong>수목장 진행</strong>: 30~100만원 (전문 업체 기준)</li>
</ul>
<h3>기념 제품</h3>
<ul>
  <li><strong>유골 유리공·보석</strong>: 20~100만원</li>
  <li><strong>발바닥 캐스팅 등</strong>: 5~20만원</li>
</ul>
<h3>추가 서비스</h3>
<ul>
  <li>24시간 수거 서비스: 0~5만원 (거리·업체에 따라)</li>
  <li>장례식·추모예식 진행: 10~30만원</li>
  <li>냉동 안치 (임시 보관): 하루 1~3만원</li>
</ul>

<h2>비용을 결정하는 주요 요인</h2>
<ul>
  <li><strong>체중</strong>: 가장 큰 영향 요인</li>
  <li><strong>지역</strong>: 수도권이 지방보다 다소 높은 경향</li>
  <li><strong>개별 vs. 합동 화장</strong>: 개별 화장이 훨씬 비쌈</li>
  <li><strong>부가 서비스</strong>: 납골·추모예식·기념품 등 선택에 따라 차이</li>
</ul>

<h2>비용 절약 팁</h2>
<ul>
  <li>복수의 업체에 미리 견적을 받아보세요.</li>
  <li>일부 지자체에서 반려동물 장례 비용 지원 사업을 운영합니다. 거주 지역 동물보호팀에 문의하세요.</li>
  <li>합동 화장은 비용이 낮지만 개별 유해를 받지 못합니다. 충분히 고려 후 결정하세요.</li>
  <li>납골당 장기 계약 시 연 비용 할인이 있는 경우도 있습니다.</li>
</ul>

<h2>펫보험으로 장례 비용 지원 가능한가요?</h2>
<p>대부분의 국내 펫보험은 장례 비용을 보장하지 않습니다. 일부 특약 또는 상조 서비스에서 지원하는 경우가 있으므로, 가입 시 약관을 확인하세요.</p>`,
    disclaimer:
      "본 비용 정보는 2024~2025년 기준 평균 범위이며, 업체·지역·서비스 구성에 따라 크게 달라질 수 있습니다. 이용 전 반드시 업체에 직접 견적을 확인하세요.",
    sources: [
      "한국반려동물장례협회 가격 조사 (2024)",
      "농림축산검역본부 동물장묘업 현황 통계 (2024)",
      "소비자원 반려동물 장례 서비스 실태조사 (2023)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 53. 반려동물 장례 자주 묻는 질문 (guide, cat.6, YMYL) ──────────────────
  {
    id: "seed-guide-petloss-faq",
    slug: "petloss-faq",
    type: "guide",
    category: 6,
    title: "반려동물 장례 자주 묻는 질문 — 실무 Q&A",
    metaTitle: "반려동물 장례 FAQ | 서류·유해 처리·가족 참석 Q&A | 펫지기",
    metaDescription:
      "반려동물 장례 절차에서 가장 많이 묻는 질문을 정리했습니다. 필요 서류, 유해 처리 방법, 가족 동반 참석, 장례 전 사망 신고 등 실무 정보를 확인하세요.",
    body: `<h2>반려동물 장례 Q&A</h2>

<h3>Q. 반려동물이 사망했을 때 신고해야 하나요?</h3>
<p>등록된 반려동물(강아지·고양이)은 사망 후 30일 이내에 동물등록 말소 신고를 해야 합니다. 지자체 동물보호 시스템(동물보호관리시스템, APMS) 또는 동물병원·동물등록 대행업체를 통해 처리할 수 있습니다. 신고를 하지 않으면 과태료 부과 대상이 될 수 있습니다.</p>

<h3>Q. 장례식에 가족이 참석할 수 있나요?</h3>
<p>대부분의 허가 장묘업체는 보호자와 가족의 참관을 허용합니다. 화장 시작부터 유해 수습까지 함께할 수 있는 '개별 화장 참관 서비스'를 제공하는 업체가 많습니다. 사전에 업체에 참관 가능 여부와 인원 제한을 확인하세요.</p>

<h3>Q. 유해(유골)는 어떻게 처리할 수 있나요?</h3>
<p>화장 후 유해는 다음과 같은 방법으로 처리할 수 있습니다.</p>
<ul>
  <li><strong>납골당 안치</strong>: 허가 장묘업체의 납골당에 보관 (연 단위 갱신)</li>
  <li><strong>집에 보관</strong>: 납골함에 담아 집 안에 모시는 방법. 법적 규제 없음</li>
  <li><strong>수목장</strong>: 지정된 나무 아래 유해를 뿌리는 방법. 허가된 수목장 업체 이용 권장</li>
  <li><strong>산골</strong>: 바다·산 등에 유해를 뿌리는 방법. 허가 받은 구역 이용 필요</li>
  <li><strong>기념품 제작</strong>: 유해를 활용한 유리구슬·보석 등 제작 가능</li>
</ul>

<h3>Q. 필요한 서류가 있나요?</h3>
<p>반려동물 장례에는 일반적으로 별도 공식 서류가 필요하지 않습니다. 일부 업체에서 간단한 신청서나 반려동물 등록번호 확인을 요청할 수 있습니다. 동물병원에서 사망 확인서(소견서)를 발급받는 경우도 있지만 의무는 아닙니다.</p>

<h3>Q. 동물병원에서 바로 장례업체로 연결되나요?</h3>
<p>일부 동물병원은 협력 장묘업체를 소개해줍니다. 하지만 특정 업체만을 강요해서는 안 됩니다. 보호자가 직접 복수의 허가 업체에 연락해 비교하고 선택할 권리가 있습니다.</p>

<h3>Q. 집에서 직접 매장할 수 있나요?</h3>
<p>자신 소유의 토지에 매장하는 것은 현행법상 금지되어 있지 않지만, 공원·하천·도로 등 공공 장소에의 매장은 법적으로 문제가 될 수 있습니다. 환경 오염 우려와 지역 조례에 따라 다를 수 있으므로, 가급적 허가된 장묘업체를 이용하는 것을 권장합니다.</p>

<h3>Q. 장례 비용은 얼마나 드나요?</h3>
<p>체중, 서비스 유형, 업체, 지역에 따라 크게 다릅니다. 소형견·고양이 개별 화장 기준 15~30만원, 중형견 25~45만원, 대형견 40~80만원이 일반적인 범위입니다. 자세한 내용은 <a href="/guide/memorial-cost">장례 비용 가이드</a>를 참고하세요.</p>

<h3>Q. 펫로스 증후군이 심할 때 어디서 도움을 받나요?</h3>
<p>반려동물과의 이별 후 깊은 슬픔을 느끼는 것은 자연스러운 반응입니다. 한국에서는 동물복지 단체와 일부 심리 상담 기관에서 펫로스 상담을 지원합니다. 주변에 털어놓기 어렵다면 온라인 커뮤니티나 전문 상담사의 도움을 받아보세요.</p>`,
    disclaimer:
      "본 정보는 일반적인 안내 목적이며, 법적·행정적 절차는 관할 지자체와 허가 업체에 직접 확인하시기 바랍니다.",
    sources: [
      "동물보호법 제15조 동물등록 말소 (농림축산식품부, 2023년 개정)",
      "농림축산검역본부 — 동물장묘업 허가 현황 (2024)",
      "한국반려동물장례협회 소비자 안내 가이드 (2023)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 54. 펫보험 보험금 청구 방법 (guide, cat.4, YMYL) ─────────────────────
  {
    id: "seed-guide-pet-insurance-claim",
    slug: "pet-insurance-claim-guide",
    type: "guide",
    category: 4,
    title: "펫보험 보험금 청구 방법 — 서류 준비부터 지급까지",
    metaTitle: "펫보험 보험금 청구 방법 | 서류·앱 청구·거절 대응 | 펫지기",
    metaDescription:
      "펫보험 보험금 청구에 필요한 서류, 앱·우편·팩스 청구 방법, 청구 기한, 지급 거절 사유와 이의신청 방법까지 단계별로 안내합니다.",
    body: `<h2>펫보험 보험금 청구, 언제 어떻게?</h2>
<p>동물병원에서 진료를 받은 후 보험금을 청구하려면 진단서·영수증 등 서류를 준비해 보험사에 제출해야 합니다. 최근에는 모바일 앱으로 간편하게 청구할 수 있는 보험사가 늘고 있습니다.</p>

<h2>보험금 청구 기한</h2>
<p>보험 약관에 따라 다르지만 대부분 <strong>치료일로부터 3년</strong> 이내에 청구해야 합니다. 청구를 미루면 서류 분실 위험이 높아지므로, 치료 후 최대한 빨리 청구하는 것이 좋습니다.</p>

<h2>필요 서류 체크리스트</h2>
<ul>
  <li><strong>보험금 청구서</strong>: 보험사 앱·홈페이지 또는 지점에서 양식 수령</li>
  <li><strong>진료비 영수증</strong>: 동물병원에서 발급 (항목별 내역 포함)</li>
  <li><strong>진단서 또는 소견서</strong>: 입원·수술 청구 시 필요 (통원은 생략 가능한 경우 있음)</li>
  <li><strong>수술 기록지</strong>: 수술 보험금 청구 시 추가 요청 가능</li>
  <li><strong>통장 사본</strong>: 최초 청구 시 또는 계좌 변경 시</li>
</ul>
<p>보험사마다 요구 서류가 다를 수 있으므로, 청구 전 보험사 고객센터나 앱에서 확인하세요.</p>

<h2>청구 방법</h2>
<h3>모바일 앱 청구 (가장 편리)</h3>
<ol>
  <li>보험사 앱 실행 → 보험금 청구 메뉴 선택</li>
  <li>치료 날짜, 병원명, 진료 유형 입력</li>
  <li>영수증·서류 촬영 후 첨부</li>
  <li>계좌 확인 후 제출</li>
</ol>
<p>앱 청구 시 평균 2~5일 이내 지급됩니다.</p>

<h3>우편·팩스 청구</h3>
<p>서류를 출력해 보험사 주소 또는 팩스로 발송합니다. 앱이 없거나 서류가 많을 때 활용합니다. 접수 후 5~10일 소요됩니다.</p>

<h3>지점 방문 청구</h3>
<p>서류를 지참해 담당 대리점 또는 보험사 지점을 방문합니다. 복잡한 건은 직접 방문이 확실합니다.</p>

<h2>청구가 거절될 수 있는 주요 사유</h2>
<ul>
  <li><strong>면책 기간 내 치료</strong>: 가입 후 30일(수술 90일) 이내 발생한 질병</li>
  <li><strong>선천성·유전성 질환</strong>: 약관에 명시된 면책 질환</li>
  <li><strong>고지의무 위반</strong>: 가입 전 기존 질환을 고지하지 않은 경우</li>
  <li><strong>서류 미비</strong>: 진단서·영수증 누락</li>
  <li><strong>보장 한도 초과</strong>: 연간 또는 항목별 한도 소진</li>
</ul>

<h2>거절 시 이의신청 방법</h2>
<p>보험사의 지급 거절 결정에 동의하지 않으면 다음 절차를 이용할 수 있습니다.</p>
<ol>
  <li><strong>보험사 민원 접수</strong>: 보험사 고객센터 또는 소비자보호팀에 이의신청</li>
  <li><strong>금융감독원 민원</strong>: 보험사와 합의가 되지 않으면 금감원(1332)에 민원 접수</li>
  <li><strong>소비자원 분쟁 조정</strong>: 한국소비자원(1372)에 분쟁 조정 신청</li>
</ol>`,
    disclaimer:
      "본 정보는 일반적인 안내 목적이며, 실제 보험금 청구 조건과 절차는 가입한 보험사 약관에 따라 다릅니다. 보험금 청구 전 담당 보험사에 직접 확인하세요.",
    sources: [
      "금융감독원 펫보험 소비자 가이드 (2024)",
      "소비자원 반려동물 보험 분쟁 조정 사례집 (2023)",
      "각 보험사 공식 약관 및 청구 가이드 (2024)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 55. 동물보호법 기초 (guide, cat.4, YMYL) ─────────────────────────────
  {
    id: "seed-guide-animal-protection-law",
    slug: "animal-protection-law-basics",
    type: "guide",
    category: 4,
    title: "동물보호법 기초 — 반려인이 꼭 알아야 할 법률 상식",
    metaTitle: "동물보호법 기초 | 의무·처벌·동물학대·신고 방법 | 펫지기",
    metaDescription:
      "동물보호법에서 반려인이 꼭 알아야 할 내용 — 동물등록 의무, 유기 처벌, 동물학대 신고 방법, 맹견 관리 규정을 정리했습니다.",
    body: `<h2>동물보호법이란?</h2>
<p>동물보호법은 동물의 생명 보호, 안전 보장, 복지 증진을 목적으로 하는 법률입니다. 반려동물 등록 의무, 유기 처벌, 맹견 관리, 동물학대 처벌 규정 등을 담고 있습니다. 2023년 개정을 통해 처벌이 강화되었습니다.</p>

<h2>동물등록 의무</h2>
<ul>
  <li><strong>대상</strong>: 2개월령 이상의 반려견 (고양이는 자율 등록)</li>
  <li><strong>방법</strong>: 마이크로칩(내장형) 또는 등록인식표(외장형)</li>
  <li><strong>기한</strong>: 취득일로부터 30일 이내</li>
  <li><strong>과태료</strong>: 미등록 시 최대 100만 원</li>
  <li><strong>사망 신고</strong>: 사망 후 30일 이내 말소 신고 의무</li>
</ul>

<h2>외출 시 준수사항</h2>
<ul>
  <li><strong>목줄·가슴줄 착용 의무</strong>: 반려견을 동반하면 반드시 목줄 또는 가슴줄 착용</li>
  <li><strong>배설물 수거 의무</strong>: 공공장소에서 배설물 미수거 시 최대 50만 원 과태료</li>
  <li><strong>맹견 입마개 의무</strong>: 지정 맹견(도사견·아메리칸 핏불테리어 등 5종)은 외출 시 입마개 및 2m 이내 목줄 착용 필수</li>
</ul>

<h2>동물 유기 처벌</h2>
<p>반려동물을 유기하면 <strong>300만 원 이하의 과태료</strong>가 부과됩니다. 고의적 유기 반복 시 형사 처벌로 이어질 수 있습니다. 더 이상 양육이 어렵다면 보호센터·입양단체에 인계하거나 공고를 통해 새 가족을 찾아주는 것이 올바른 방법입니다.</p>

<h2>동물학대 처벌</h2>
<ul>
  <li><strong>잔인한 방법으로 죽이거나 다치게 한 경우</strong>: 3년 이하 징역 또는 3천만 원 이하 벌금</li>
  <li><strong>정당한 사유 없이 신체적 고통을 주는 행위</strong>: 2년 이하 징역 또는 2천만 원 이하 벌금</li>
  <li><strong>촬영물 유포</strong>: 동물학대 영상물 배포·공유도 처벌 대상</li>
</ul>

<h2>동물학대 신고 방법</h2>
<ol>
  <li><strong>동물보호 신고전화 110</strong> (24시간) 또는 <strong>112 경찰 신고</strong></li>
  <li>지자체 동물보호팀 또는 시·군·구청 민원</li>
  <li>동물보호관리시스템(APMS) 온라인 신고</li>
  <li>동물보호단체(동물자유연대, KARA 등)에 제보</li>
</ol>
<p>신고 시 날짜·장소·상황을 구체적으로 기록하고, 가능하면 사진·영상 증거를 확보하세요.</p>

<h2>반려동물 관련 분쟁 해결</h2>
<ul>
  <li><strong>수의사 과실 의심</strong>: 한국수의사회 민원 또는 소비자원(1372) 상담</li>
  <li><strong>펫숍·분양 분쟁</strong>: 소비자원 피해 구제 신청</li>
  <li><strong>이웃과의 소음·물림 분쟁</strong>: 지자체 조정 또는 법원 소액심판 활용 가능</li>
</ul>`,
    disclaimer:
      "본 내용은 일반적인 법률 정보 제공 목적이며, 구체적인 법적 판단은 변호사 또는 관할 기관에 문의하세요. 법령은 개정될 수 있으므로 최신 내용은 법제처(law.go.kr)에서 확인하세요.",
    sources: [
      "동물보호법 (농림축산식품부, 2023년 개정 시행)",
      "법제처 국가법령정보센터 law.go.kr",
      "농림축산식품부 동물보호·복지 종합 계획 (2023)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 56. 반려동물 간식 선택 가이드 (guide, cat.2) ──────────────────────────
  {
    id: "seed-guide-pet-treats-guide",
    slug: "pet-treats-guide",
    type: "guide",
    category: 2,
    title: "반려동물 간식 선택 가이드 — 성분·급여량·추천 유형",
    metaTitle: "반려동물 간식 선택 방법 | 성분·급여량·추천 간식 종류 | 펫지기",
    metaDescription:
      "강아지·고양이 간식 선택 시 확인해야 할 성분, 적정 급여량(칼로리 10% 규칙), 좋은 간식과 피해야 할 성분을 정리했습니다.",
    body: `<h2>간식이 필요한 이유, 그리고 주의점</h2>
<p>간식은 훈련 보상, 치아 관리, 관계 강화에 유용합니다. 하지만 칼로리 과잉으로 비만을 유발하거나, 나쁜 성분이 건강을 해칠 수 있습니다. "10% 규칙"을 기억하세요 — 간식은 하루 총 칼로리의 10% 이내로 제한합니다.</p>

<h2>10% 규칙 — 적정 간식량 계산법</h2>
<p>예를 들어 4kg 소형견의 하루 권장 칼로리가 300kcal라면 간식은 30kcal 이내로 유지해야 합니다. 간식 봉투의 100g당 칼로리를 확인해 하루 급여량을 계산하세요.</p>

<h2>좋은 간식 성분 체크리스트</h2>
<ul>
  <li><strong>첫 번째 원재료가 단백질</strong>: 닭고기·소고기·생선 등 육류가 첫 번째 성분이어야 합니다</li>
  <li><strong>단일 원료 제품</strong>: 성분이 단순할수록 알레르기 위험 감소</li>
  <li><strong>AAFCO 또는 FEDIAF 적합 기준</strong>: 인증 마크 확인</li>
  <li><strong>방부제·색소 최소화</strong>: 천연 방부제(비타민 E·C) 사용 제품 선호</li>
  <li><strong>한국 기준</strong>: 농림축산식품부 반려동물 사료 등록 확인</li>
</ul>

<h2>피해야 할 성분</h2>
<ul>
  <li><strong>자일리톨</strong>: 강아지에게 치명적 독성 (저혈당·간부전)</li>
  <li><strong>소금 과잉</strong>: 신장에 부담, 나트륨 함량 확인</li>
  <li><strong>인공 색소·MSG</strong>: 불필요하며 알레르기 유발 가능</li>
  <li><strong>BHA·BHT</strong>: 합성 방부제, 피하는 것이 좋음</li>
  <li><strong>포도·건포도, 양파·마늘, 초콜릿, 아보카도 성분</strong>: 강아지·고양이에 독성</li>
</ul>

<h2>간식 유형별 특징</h2>
<h3>강아지 간식</h3>
<ul>
  <li><strong>육포 간식</strong>: 고단백, 훈련 보상에 탁월. 소금 함량 낮은 제품 선택</li>
  <li><strong>덴탈 껌</strong>: 치석 제거에 도움. 크기와 경도가 강아지 체형에 맞아야 함</li>
  <li><strong>동결건조 간식</strong>: 원재료 영양 보존 우수. 비싸지만 성분이 단순</li>
  <li><strong>퍼피 전용</strong>: 칼슘·인 비율이 성견과 달라 퍼피용 별도 선택 권장</li>
</ul>
<h3>고양이 간식</h3>
<ul>
  <li><strong>액상 간식(크림 타입)</strong>: 수분 보충에 유리. 당분·타우린 함량 확인</li>
  <li><strong>동결건조 육류</strong>: 고단백, 수분 섭취 독려를 위해 물에 불려 급여 가능</li>
  <li><strong>덴탈 간식</strong>: 고양이 구내염 예방을 위한 치아 관리 간식 활용</li>
</ul>

<h2>간식을 훈련에 활용하는 팁</h2>
<ul>
  <li>훈련 보상 간식은 작게(콩알 크기 이하) 잘라 사용하면 과식 방지</li>
  <li>정기 식사 전 간식은 식욕을 감소시킬 수 있으므로 식사 후 또는 식사 사이 시간에 급여</li>
  <li>알레르기 반응(가려움·구토·설사) 발생 시 해당 간식 즉시 중단 후 수의사 상담</li>
</ul>`,
    disclaimer: null,
    sources: [
      "AAFCO (Association of American Feed Control Officials) Nutrient Profiles (2024)",
      "WSAVA Global Nutrition Guidelines (2022)",
      "농림축산식품부 반려동물 사료 관리 지침 (2023)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 57. 강아지 구토 원인과 대처법 (condition, cat.3, YMYL) ─────────────────
  {
    id: "seed-condition-dog-vomiting",
    slug: "dog-vomiting",
    type: "condition",
    category: 3,
    title: "강아지 구토 — 원인·응급 신호·동물병원 방문 기준",
    metaTitle: "강아지 구토 원인·응급 신호·집에서 대처법 | 펫지기",
    metaDescription:
      "강아지 구토의 흔한 원인(급식 속도, 음식 변경, 위장염, 중독)과 즉시 병원에 가야 하는 응급 신호, 집에서 할 수 있는 응급 처치를 안내합니다.",
    body: `<h2>강아지 구토, 언제 걱정해야 하나요?</h2>
<p>강아지가 구토를 한다고 해서 무조건 응급은 아닙니다. 가끔 빠르게 먹었거나 풀을 먹은 후 구토하는 것은 비교적 흔한 일입니다. 그러나 다음의 응급 신호가 있다면 즉시 동물병원을 방문하세요.</p>

<h2>즉시 병원에 가야 하는 응급 신호</h2>
<ul>
  <li><strong>24시간 이내 3회 이상 반복 구토</strong></li>
  <li><strong>혈액이 섞인 구토물</strong> (선홍색 또는 커피색)</li>
  <li><strong>복부 팽창 + 비생산적 구역질</strong> — 위확장·염전(GDV) 의심, 생명 위험</li>
  <li><strong>의식 저하·쇠약·경련</strong> 동반</li>
  <li><strong>독성 물질 섭취 의심</strong> (포도, 자일리톨, 초콜릿 등)</li>
  <li><strong>이물질 삼킴 의심</strong> — 장폐색 위험</li>
  <li><strong>강아지가 노령이거나 기저 질환</strong> 보유 시</li>
</ul>

<h2>흔한 구토 원인</h2>
<h3>경미한 원인 (단발성, 자연 회복 가능)</h3>
<ul>
  <li>빠른 식사 속도 — 노즐 볼(슬로우 피더) 사용으로 예방</li>
  <li>풀 섭취 — 위장 자극물 제거를 위한 본능적 행동</li>
  <li>공복 상태에서 황색 거품 구토 — 공복 구토증(Bilious Vomiting Syndrome), 식사 간격 조절로 개선</li>
  <li>갑작스러운 사료 변경</li>
  <li>과식 또는 운동 직후 식사</li>
</ul>
<h3>의료적 원인 (동물병원 필요)</h3>
<ul>
  <li><strong>급성 위장염</strong>: 가장 흔한 원인. 구토 + 설사 동반 가능</li>
  <li><strong>이물질 삼킴·장폐색</strong>: 지속적 구토, 식욕 저하, 복통</li>
  <li><strong>췌장염</strong>: 고지방 음식 섭취 후 구토 + 복통</li>
  <li><strong>신부전·간질환</strong>: 만성 구토, 식욕 부진, 체중 감소</li>
  <li><strong>중독</strong>: 포도·건포도, 자일리톨, 초콜릿, 제초제 등</li>
  <li><strong>위확장·염전(GDV)</strong>: 대형견 위험. 즉시 응급처치 필요</li>
  <li><strong>장내 기생충</strong>: 반복 구토, 복부 팽창</li>
</ul>

<h2>집에서 할 수 있는 응급 처치</h2>
<p>응급 신호가 없는 단발성 구토라면 다음 조치를 취할 수 있습니다.</p>
<ol>
  <li><strong>2~4시간 절식</strong>: 위장을 쉬게 합니다. 물은 소량씩 계속 제공</li>
  <li><strong>소량씩 부드러운 음식</strong>: 증상이 가라앉으면 삶은 닭고기(무염)·쌀죽 소량 급여</li>
  <li><strong>사료는 서서히 재급여</strong>: 24~48시간 후 일반 사료로 천천히 전환</li>
  <li>2~4시간 후 구토가 재발하거나 상태가 나빠지면 병원 방문</li>
</ol>

<h2>구토 예방 팁</h2>
<ul>
  <li>슬로우 피더 사용 (빠른 식사 방지)</li>
  <li>사료 변경 시 7~10일에 걸쳐 점진적으로</li>
  <li>정기적인 구충제 투여</li>
  <li>독성 음식·물질을 강아지 접근 불가 공간에 보관</li>
</ul>`,
    disclaimer:
      "본 정보는 수의학 참고 자료로 제공되며 의학적 진단과 치료를 대체하지 않습니다. 응급 신호가 하나라도 있다면 즉시 동물병원을 방문하세요.",
    sources: [
      "WSAVA Small Animal Gastrointestinal Guidelines (2022)",
      "Tams TR. Handbook of Small Animal Gastroenterology (2nd ed.)",
      "대한수의사회 소동물 임상 진료 지침 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 58. 고양이 구내염 (condition, cat.3, YMYL) ──────────────────────────
  {
    id: "seed-condition-cat-stomatitis",
    slug: "cat-stomatitis",
    type: "condition",
    category: 3,
    title: "고양이 구내염 — 증상·원인·치료·발치 결정",
    metaTitle: "고양이 구내염 증상·치료 | 발치·스테로이드·면역치료 | 펫지기",
    metaDescription:
      "고양이 구내염(Feline Chronic Gingivostomatitis)의 증상, 원인, 진단, 약물 치료와 발치 수술 결정 기준을 수의사 검토 자료를 바탕으로 안내합니다.",
    body: `<h2>고양이 구내염이란?</h2>
<p>고양이 구내염(Feline Chronic Gingivostomatitis, FCGS)은 고양이에서 가장 흔하고 고통스러운 구강 질환 중 하나입니다. 잇몸과 구강 점막 전체에 심한 염증이 생기며, 제대로 치료하지 않으면 식욕 감소·체중 감소·삶의 질 저하로 이어집니다.</p>

<h2>주요 증상</h2>
<ul>
  <li><strong>극심한 구강 통증</strong> — 입을 벌리거나 음식에 접근할 때 통증 표현</li>
  <li><strong>식욕 감소·음식 회피</strong> — 씹다가 멈추거나 경식을 피함</li>
  <li><strong>과도한 침 흘림</strong> (때로 혈액 섞임)</li>
  <li><strong>심한 구취</strong></li>
  <li><strong>털 그루밍 거부</strong> — 앞발로 입 주위 문지름</li>
  <li><strong>체중 감소·기력 저하</strong></li>
</ul>

<h2>원인</h2>
<p>정확한 원인은 완전히 규명되지 않았지만, 치아 표면 치태에 대한 면역계의 과민 반응이 주된 기전으로 알려져 있습니다.</p>
<ul>
  <li>고양이 칼리시 바이러스(FCV) 감염 연관성</li>
  <li>고양이 헤르페스 바이러스(FHV-1) 감염</li>
  <li>면역 기능 이상 (FIV·FeLV 감염 시 악화 가능)</li>
  <li>구강 내 세균 과증식</li>
</ul>

<h2>진단</h2>
<ul>
  <li>육안 구강 검사 및 치주 탐침 검사</li>
  <li>치과 방사선 — 치근 및 치조골 상태 확인</li>
  <li>구강 조직 생검 — 다른 질환(종양 등) 감별</li>
  <li>FIV·FeLV 혈청 검사</li>
  <li>혈액 검사 — 전신 상태 평가</li>
</ul>

<h2>치료</h2>
<h3>내과적 치료 (임시 완화)</h3>
<ul>
  <li><strong>스테로이드</strong>: 염증 단기 완화. 장기 사용 시 당뇨·감염 위험</li>
  <li><strong>항생제</strong>: 2차 세균 감염 관리</li>
  <li><strong>인터페론</strong>: 면역 조절 목적으로 사용되는 경우 있음</li>
  <li>이 모든 치료는 근본 원인을 제거하지 않아 재발이 흔합니다.</li>
</ul>
<h3>발치 수술 (현재 가장 효과적인 치료)</h3>
<p>전치아 발치(Full Mouth Extraction) 또는 후치아 발치(Caudal Extraction)가 현재까지 가장 높은 장기 완화율을 보입니다.</p>
<ul>
  <li>연구에 따르면 전치아 발치 후 60~80%에서 완전 또는 부분 완화</li>
  <li>발치 후에도 치태가 남지 않으므로 염증 유발 원인 제거</li>
  <li>발치 후 고양이는 대부분 습식 사료로 잘 적응하며, 삶의 질이 크게 향상됨</li>
</ul>
<h3>발치 결정 시 고려사항</h3>
<ul>
  <li>내과 치료에 반응하지 않는 경우 조기 발치 검토</li>
  <li>전신 마취 위험이 있는 노령·기저질환 보유 고양이는 내과 치료와 병행 고려</li>
  <li>치과 전문 수의사 또는 구강 수술 경험이 풍부한 수의사 권장</li>
</ul>

<h2>구내염 예방과 치아 관리</h2>
<ul>
  <li>정기적인 양치(가능한 경우) — 전용 고양이 치약 사용</li>
  <li>치과 전용 간식, 수도에 클로르헥시딘 첨가제 활용</li>
  <li>연 1~2회 스케일링 및 치과 검진</li>
  <li>FCV·FHV 백신 정기 접종</li>
</ul>`,
    disclaimer:
      "본 정보는 수의학 참고 자료로 제공되며 의학적 진단과 치료를 대체하지 않습니다. 구내염 치료 계획(발치 시기 포함)은 반드시 담당 수의사와 충분히 상담 후 결정하세요.",
    sources: [
      "Harley R, et al. A review of feline chronic gingivostomatitis. Vet J. 2011",
      "WSAVA Dental Guidelines for Small Animals (2022)",
      "대한수의사회 고양이 구강 관리 임상 지침 (2023)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 59. 강아지 요로감염 (condition, cat.3, YMYL) ────────────────────────
  {
    id: "seed-condition-dog-urinary-tract-infection",
    slug: "dog-urinary-tract-infection",
    type: "condition",
    category: 3,
    title: "강아지 요로감염 — 증상·원인·치료·예방",
    metaTitle: "강아지 요로감염 증상·치료 | 혈뇨·잦은 배뇨 원인 | 펫지기",
    metaDescription:
      "강아지 요로감염(UTI)의 증상(혈뇨·잦은 배뇨·배뇨 시 통증), 원인, 진단, 항생제 치료, 재발 예방 방법을 안내합니다.",
    body: `<h2>강아지 요로감염이란?</h2>
<p>요로감염(Urinary Tract Infection, UTI)은 세균이 방광·요도 등 하부 요로에 침입해 염증을 일으키는 질환입니다. 암컷 강아지에서 더 흔하며, 재발하기 쉬워 적절한 치료와 예방이 중요합니다.</p>

<h2>주요 증상</h2>
<ul>
  <li><strong>혈뇨</strong> — 소변에 붉은색 또는 갈색 빛이 섞임</li>
  <li><strong>잦은 소변 시도</strong> — 조금씩 자주 소변을 보려 함</li>
  <li><strong>배뇨 시 통증·불편함</strong> — 끙끙거림, 자세 이상</li>
  <li><strong>실내 배변 실수</strong> — 화장실 훈련이 된 강아지가 집 안에서 실수</li>
  <li><strong>외음부·음경 주변 과도한 핥기</strong></li>
  <li><strong>소변 악취 증가</strong></li>
</ul>
<p><strong>응급 신호</strong>: 소변을 전혀 보지 못하거나 극심한 복통·쇠약이 있으면 즉시 병원 방문 (방광 결석·파열 위험)</p>

<h2>원인</h2>
<ul>
  <li><strong>세균 감염</strong>: E. coli, Staphylococcus, Proteus 등 — 가장 흔한 원인</li>
  <li><strong>방광 결석(요로결석)</strong>: 결석이 요로 점막을 자극하여 2차 감염 유발</li>
  <li><strong>해부학적 이상</strong>: 암컷은 요도가 짧아 세균 침입이 쉬움</li>
  <li><strong>면역력 저하</strong>: 당뇨병·쿠싱증후군 등 기저 질환</li>
  <li><strong>생식기 질환</strong>: 자궁축농증 동반 가능</li>
</ul>

<h2>진단</h2>
<ul>
  <li><strong>소변 검사</strong>: 세균·백혈구·적혈구 확인. 가장 기본적인 검사</li>
  <li><strong>소변 배양 및 항생제 감수성 검사</strong>: 적합한 항생제 선택에 필수 (반복 감염 시)</li>
  <li><strong>방사선·초음파</strong>: 방광 결석, 해부학적 이상, 종양 감별</li>
</ul>

<h2>치료</h2>
<h3>항생제 치료</h3>
<p>단순 UTI는 통상 1~2주 항생제 치료로 회복됩니다. 치료 완료 후 재검을 통해 완치를 확인하는 것이 중요합니다. 증상이 사라져도 임의로 약을 중단하면 내성균 발생 위험이 있습니다.</p>
<h3>결석 치료</h3>
<p>방광 결석이 원인이라면 식이 요법 또는 수술적 제거가 필요합니다. 결석 종류에 따라 처방식으로 용해시킬 수 있는 경우도 있습니다.</p>

<h2>재발 예방</h2>
<ul>
  <li><strong>충분한 수분 섭취</strong>: 습식 사료 혼합 또는 별도 수분 보충 권장</li>
  <li><strong>배변 기회 증가</strong>: 소변을 오래 참으면 세균 번식 위험 증가 — 규칙적인 산책</li>
  <li><strong>생식기 주변 청결</strong>: 목욕 및 위생 관리</li>
  <li><strong>당뇨·쿠싱 등 기저 질환 관리</strong>: 전신 건강 유지</li>
  <li><strong>3개월마다 소변 검사</strong>: 재발성 UTI 강아지에게 권장</li>
</ul>`,
    disclaimer:
      "본 정보는 수의학 참고 자료로 제공되며 의학적 진단과 치료를 대체하지 않습니다. 소변을 전혀 보지 못하는 경우 즉시 동물병원을 방문하세요. 항생제는 반드시 수의사 처방에 따라 사용하세요.",
    sources: [
      "Weese JS et al. International Society for Companion Animal Infectious Diseases Consensus Guidelines for the Diagnosis and Treatment of Bacterial UTI (2019)",
      "대한수의사회 소동물 임상 진료 지침 (2022)",
      "WSAVA Small Animal Urogenital Guidelines (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 60. 고양이 FIV·FeLV 바이러스 (condition, cat.3, YMYL) ──────────────
  {
    id: "seed-condition-cat-fiv-felv",
    slug: "cat-fiv-felv",
    type: "condition",
    category: 3,
    title: "고양이 에이즈(FIV)·백혈병(FeLV) — 증상·감염 경로·관리",
    metaTitle: "고양이 에이즈(FIV)·백혈병(FeLV) 증상·검사·관리 | 펫지기",
    metaDescription:
      "고양이 에이즈(FIV)와 백혈병(FeLV) 바이러스의 증상, 감염 경로, 진단 검사, 관리 방법, 함께 사는 고양이 보호 방법을 안내합니다.",
    body: `<h2>고양이 면역결핍 바이러스(FIV) — '고양이 에이즈'</h2>
<p>FIV(Feline Immunodeficiency Virus)는 면역 세포(CD4+ T 림프구)를 파괴해 면역 기능을 서서히 떨어뜨리는 바이러스입니다. 인간 HIV와 유사한 기전이지만, 고양이와 사람 사이에는 전파되지 않습니다.</p>

<h3>FIV 감염 경로</h3>
<ul>
  <li><strong>주 경로</strong>: 깊은 교상(물림 상처) — 수컷 고양이 싸움에서 흔함</li>
  <li>수직감염(어미→새끼)은 드문 편</li>
  <li>일반 접촉(밥그릇·화장실 공유)으로는 거의 전파되지 않음</li>
</ul>

<h3>FIV 증상</h3>
<ul>
  <li>초기: 일시적 발열·림프절 종창 (수주 후 무증상 잠복기 수년)</li>
  <li>진행: 반복적 감염(구강 질환·상부 호흡기 감염), 체중 감소, 기력 저하</li>
  <li>말기: 심각한 면역 억제 상태</li>
</ul>

<h2>고양이 백혈병 바이러스(FeLV)</h2>
<p>FeLV(Feline Leukemia Virus)는 FIV보다 전파가 쉬우며, 면역 억제·빈혈·림프종 등을 유발합니다. 고양이의 중요한 사망 원인 중 하나입니다.</p>

<h3>FeLV 감염 경로</h3>
<ul>
  <li><strong>주 경로</strong>: 침·눈물·오줌·대변 등 분비물 접촉</li>
  <li>그루밍, 밥그릇·화장실 공유로도 전파 가능</li>
  <li>어미 고양이 → 새끼 수직감염 가능</li>
</ul>

<h3>FeLV 증상</h3>
<ul>
  <li>기력 저하, 식욕 감소, 체중 감소</li>
  <li>빈혈 (창백한 잇몸)</li>
  <li>반복적 감염, 상처 회복 지연</li>
  <li>림프절 종창, 복수</li>
</ul>

<h2>진단</h2>
<ul>
  <li><strong>ELISA 혈액 검사</strong>: 동물병원에서 15~30분 이내 결과 확인</li>
  <li>양성 시 2차 확인 검사(IFA 또는 PCR) 권장</li>
  <li>모든 새끼 고양이 입양 시, 외출 후, 새 고양이 합가 전 검사 권장</li>
</ul>

<h2>치료 및 관리</h2>
<p>현재 FIV·FeLV를 완치하는 치료법은 없습니다. 그러나 적절한 관리로 삶의 질을 유지하고 수명을 연장할 수 있습니다.</p>
<ul>
  <li><strong>실내 생활 유지</strong>: 외부 감염원 차단, 다른 고양이에의 전파 방지</li>
  <li><strong>정기 검진</strong>: 6개월~1년마다 혈액 검사, 구강 관리</li>
  <li><strong>균형 잡힌 영양</strong>: 면역력 지원. 날고기·날달걀 등 원료 식품 금지 (면역 저하 시 식중독 위험)</li>
  <li><strong>스트레스 최소화</strong>: 안정적 환경</li>
  <li><strong>2차 감염 치료</strong>: 세균·진균 감염 발생 시 즉시 치료</li>
</ul>

<h2>다묘 가정의 관리</h2>
<ul>
  <li>FIV 양성 고양이: 교상 위험을 줄이면 동거 가능 (물림이 없는 평화로운 가정)</li>
  <li>FeLV 양성 고양이: 음성 고양이와의 분리 격리 또는 FeLV 음성 고양이 FeLV 예방 접종 강력 권장</li>
</ul>

<h2>예방</h2>
<ul>
  <li><strong>FeLV 백신</strong>: 야외 접촉이 있는 고양이 또는 다묘 가정에 권장</li>
  <li>중성화 수술: 영역 다툼 감소 → FIV 전파 위험 감소</li>
  <li>실내 전용 생활: 감염 위험 크게 감소</li>
</ul>`,
    disclaimer:
      "본 정보는 수의학 참고 자료로 제공되며 의학적 진단과 치료를 대체하지 않습니다. FIV·FeLV 양성 판정 시 담당 수의사와 함께 관리 계획을 세우세요.",
    sources: [
      "ABCD (Advisory Board on Cat Diseases) FIV·FeLV Guidelines (2023)",
      "WSAVA Vaccination Guidelines for Small Animal Practitioners (2022)",
      "대한수의사회 고양이 바이러스성 질환 임상 지침 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 61. 노령 고양이 케어 가이드 (guide, cat.3, YMYL) ──────────────────
  {
    id: "seed-guide-senior-cat-care",
    slug: "senior-cat-care-guide",
    type: "guide",
    category: 3,
    title: "노령 고양이 케어 가이드 — 7세 이후 건강 관리",
    metaTitle: "노령 고양이 케어 | 7세 이후 건강검진·식이·증상 체크 | 펫지기",
    metaDescription:
      "고양이는 7세 이후 노령기에 접어듭니다. 노령 고양이에서 흔한 질환, 정기 검진 주기, 식이 관리, 환경 개선 방법을 정리했습니다.",
    body: `<h2>고양이의 노령기 — 언제부터?</h2>
<p>고양이는 7~10세를 '노령기(Senior)', 11세 이상을 '초노령기(Geriatric)'로 분류합니다. 노령 고양이는 겉으로 건강해 보여도 내부 장기 기능이 서서히 저하될 수 있어 정기적인 건강 모니터링이 중요합니다.</p>

<h2>노령 고양이에서 흔한 질환</h2>
<ul>
  <li><strong>만성 신부전(CKD)</strong>: 고양이 노령기 가장 흔한 질환. 조기 발견이 핵심</li>
  <li><strong>갑상선 기능 항진증(Hyperthyroidism)</strong>: 체중 감소 + 식욕 증가 + 다음·다뇨</li>
  <li><strong>고혈압</strong>: 종종 신부전·갑상선 기능 항진증과 동반</li>
  <li><strong>관절염</strong>: 점프 회피, 그루밍 감소</li>
  <li><strong>당뇨병</strong>: 다음·다뇨·체중 감소</li>
  <li><strong>치주 질환</strong>: 통증으로 식욕 감소</li>
  <li><strong>인지 기능 장애(CDS)</strong>: 길 잃음, 밤 울음, 방향감각 이상</li>
</ul>

<h2>정기 검진 주기</h2>
<ul>
  <li><strong>7~10세</strong>: 연 2회 신체 검사 + 혈액·소변 검사</li>
  <li><strong>11세 이상</strong>: 6개월마다 혈액·소변·혈압 검사</li>
  <li>신부전 위험 조기 발견을 위해 SDMA 검사(신부전 조기 마커) 포함 권장</li>
</ul>

<h2>노령 고양이 식이 관리</h2>
<ul>
  <li><strong>노령 전용 사료</strong>: 단백질 품질 우수, 신장 부담 낮은 인(P) 함량 관리</li>
  <li><strong>수분 섭취 증가</strong>: 습식 사료 비중 높이기, 음수대 여러 곳 배치</li>
  <li><strong>칼로리 모니터링</strong>: 활동량 감소로 비만 위험 증가 — 적정 체중 유지</li>
  <li><strong>체중 감소 감지</strong>: 매달 체중 측정. 급격한 체중 감소는 즉시 수의사 상담</li>
</ul>

<h2>환경 개선</h2>
<ul>
  <li><strong>화장실 접근성</strong>: 관절염 고양이를 위해 입구가 낮은 화장실 사용</li>
  <li><strong>침대·쉼터</strong>: 따뜻하고 쉽게 오르내릴 수 있는 낮은 위치 배치</li>
  <li><strong>계단·경사로</strong>: 높은 곳 접근을 위한 경사로 설치</li>
  <li><strong>그루밍 지원</strong>: 등·꼬리 주변은 스스로 닦기 어려우므로 보호자가 빗질 보조</li>
  <li><strong>급격한 변화 최소화</strong>: 낯선 환경·동물 도입은 노령 고양이에게 큰 스트레스</li>
</ul>

<h2>주의해야 할 증상 변화</h2>
<ul>
  <li>물 소비량 갑자기 증가</li>
  <li>화장실 밖 배변·배뇨</li>
  <li>식욕 급격히 감소 또는 증가</li>
  <li>체중 감소 (1~2주 내 10% 이상)</li>
  <li>밤에 갑자기 큰 소리로 울기</li>
  <li>털 상태 악화, 그루밍 거부</li>
</ul>
<p>위 증상 중 하나라도 발견되면 즉시 수의사 상담을 권장합니다.</p>`,
    disclaimer:
      "본 정보는 수의학 참고 자료로 제공되며 의학적 진단과 치료를 대체하지 않습니다. 노령 고양이는 증상이 미약하게 시작되는 경우가 많으므로 정기 검진을 통한 조기 발견이 매우 중요합니다.",
    sources: [
      "ISFM (International Society of Feline Medicine) Senior Cat Guidelines (2021)",
      "AAFP Senior Care Guidelines (2021)",
      "대한수의사회 고양이 노령 관리 임상 지침 (2023)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 62. 강아지 갑상선 기능 저하증 (condition, cat.3, YMYL) ──────────────
  {
    id: "seed-condition-dog-hypothyroidism",
    slug: "dog-hypothyroidism",
    type: "condition",
    category: 3,
    title: "강아지 갑상선 기능 저하증 — 증상·원인·호르몬 치료",
    metaTitle: "강아지 갑상선 기능 저하증 증상·치료 | 체중증가·무기력·털빠짐 | 펫지기",
    metaDescription:
      "강아지 갑상선 기능 저하증(Hypothyroidism)의 주요 증상(체중 증가·무기력·털 빠짐), 원인, 갑상선 호르몬 보충 치료, 예후를 안내합니다.",
    body: `<h2>강아지 갑상선 기능 저하증이란?</h2>
<p>갑상선 기능 저하증(Hypothyroidism)은 갑상선이 충분한 호르몬(T3·T4)을 생산하지 못해 전신 대사가 느려지는 질환입니다. 중·대형견에서 비교적 흔하며, 4~10세 중년 강아지에서 가장 많이 발생합니다.</p>

<h2>주요 증상</h2>
<h3>대사 이상</h3>
<ul>
  <li><strong>체중 증가</strong> — 식이 변화 없이 살이 찜</li>
  <li><strong>무기력·활동량 감소</strong> — 운동을 싫어하고 항상 피곤해 보임</li>
  <li><strong>추위에 민감</strong> — 따뜻한 곳을 찾는 행동 증가</li>
</ul>
<h3>피부·털 변화</h3>
<ul>
  <li><strong>털 빠짐·탈모</strong> — 특히 몸통 양쪽 대칭 탈모가 특징</li>
  <li><strong>건조하고 칙칙한 피부</strong></li>
  <li><strong>피부 색소 침착</strong></li>
</ul>
<h3>기타</h3>
<ul>
  <li>서맥(느린 심박수)</li>
  <li>얼굴 피부 처짐 ('비극적 표정' Tragic Face)</li>
  <li>신경 기능 이상 (드물게: 전정 장애, 말초 신경 장애)</li>
</ul>

<h2>원인</h2>
<ul>
  <li><strong>자가면역성 갑상선염(림프구성 갑상선염)</strong>: 면역계가 갑상선 조직을 파괴 — 가장 흔한 원인(약 50%)</li>
  <li><strong>특발성 갑상선 위축</strong>: 원인 불명으로 갑상선 조직이 지방으로 대체</li>
  <li>갑상선 종양(드묾)</li>
</ul>

<h2>진단</h2>
<ul>
  <li><strong>혈청 T4 측정</strong>: 가장 기본적인 선별 검사</li>
  <li><strong>Free T4(fT4) 측정</strong>: T4가 경계값일 때 추가 확인</li>
  <li><strong>TSH 측정</strong>: 뇌하수체 갑상선 자극 호르몬 — 상승 시 진단 확인</li>
  <li>갑상선 수치는 다른 질병·약물의 영향을 받을 수 있으므로, 전반적 임상 증상과 함께 해석 필요</li>
</ul>

<h2>치료</h2>
<h3>호르몬 보충 요법</h3>
<p>레보티록신(Levothyroxine, T4 합성 제제)을 매일 경구 투여합니다. 대부분 하루 2회 급여하며, 증상 개선에는 수 주~수 개월이 걸립니다.</p>
<ul>
  <li>치료 시작 후 4~8주에 혈중 T4 검사로 용량 조절</li>
  <li>안정화 후 6개월마다 모니터링</li>
  <li>평생 복용이 필요하지만, 비교적 저렴하고 부작용이 적음</li>
</ul>

<h2>예후</h2>
<p>치료에 대한 반응은 매우 좋습니다. 호르몬 보충 치료를 시작하면 수 주 내에 활기가 돌아오고, 2~3개월 내에 털 재성장·체중 정상화가 이루어집니다. 평생 치료가 필요하지만 정상적인 수명을 유지할 수 있습니다.</p>`,
    disclaimer:
      "본 정보는 수의학 참고 자료로 제공되며 의학적 진단과 치료를 대체하지 않습니다. 호르몬 제제는 반드시 수의사의 처방과 모니터링 하에 사용해야 합니다.",
    sources: [
      "Graham PA, Nachreiner RF et al. Etiology and diagnosis of hypothyroidism in dogs. Vet Clin North Am 2001",
      "WSAVA Endocrinology Guidelines (2023)",
      "대한수의사회 소동물 내분비 질환 임상 지침 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 63. 반려동물 이동장 훈련 가이드 (guide, cat.5) ──────────────────────
  {
    id: "seed-guide-carrier-training",
    slug: "carrier-training-guide",
    type: "guide",
    category: 5,
    title: "반려동물 이동장 훈련 — 고양이·강아지 스트레스 없이 적응시키기",
    metaTitle: "반려동물 이동장 훈련 | 고양이·강아지 케이지 적응 방법 | 펫지기",
    metaDescription:
      "고양이·강아지가 이동장(캐리어·켄넬)을 무서워하지 않도록 적응시키는 단계별 훈련 방법을 안내합니다. 동물병원 방문 스트레스를 크게 줄일 수 있습니다.",
    body: `<h2>왜 이동장 훈련이 중요한가?</h2>
<p>대부분의 반려동물은 이동장을 '나쁜 일이 생기기 전 잠깐 갇히는 곳'으로 기억합니다. 평소 이동장을 안전하고 편안한 공간으로 인식시키면, 동물병원 방문·이사·여행 시 스트레스를 크게 줄일 수 있습니다.</p>

<h2>이동장 선택</h2>
<ul>
  <li><strong>고양이</strong>: 위가 열리는 상자형(탑 오프닝) 권장 — 검진 시 고양이를 꺼내기 쉬움</li>
  <li><strong>소형견</strong>: 천 재질 소프트 케리어 또는 하드 케이스 모두 가능</li>
  <li>크기: 반려동물이 일어서고 돌아설 수 있을 만큼 충분히 커야 함</li>
</ul>

<h2>단계별 이동장 적응 훈련</h2>
<h3>1단계: 이동장을 생활 공간에 두기</h3>
<ul>
  <li>이동장 문을 열어둔 채 거실 등 편안한 공간에 배치</li>
  <li>억지로 집어넣지 않고, 자발적으로 탐색하도록 둠</li>
  <li>이동장 안에 좋아하는 담요·장난감을 넣어 매력적인 공간으로 연출</li>
</ul>
<h3>2단계: 간식으로 긍정 연결</h3>
<ul>
  <li>이동장 입구에 간식을 놓고, 자발적으로 들어갈 때 칭찬·보상</li>
  <li>처음에는 입구 근처, 점차 안쪽 깊이 간식 배치</li>
  <li>절대 강제로 밀어 넣지 않음</li>
</ul>
<h3>3단계: 문 닫는 연습</h3>
<ul>
  <li>반려동물이 이동장 안에서 편안해지면 문을 잠깐 닫았다가 즉시 열기</li>
  <li>차분하게 반응하면 칭찬 + 간식</li>
  <li>점진적으로 문 닫힌 시간 연장 (10초 → 1분 → 5분)</li>
</ul>
<h3>4단계: 들어 옮기기 연습</h3>
<ul>
  <li>이동장째 짧은 거리를 이동 — 집 안에서 다른 방으로 옮기기</li>
  <li>차에 잠깐 태웠다가 돌아오기</li>
  <li>처음에는 짧게, 좋은 경험으로 마무리</li>
</ul>

<h2>고양이 특별 팁</h2>
<ul>
  <li>페리웨이(Feliway) 스프레이를 이동장 안에 뿌리면 안정 효과</li>
  <li>이동장을 고양이의 쉬는 공간(침대·소파 옆)에 항상 놔두어 '일상의 공간'으로 인식</li>
  <li>병원 방문 전 이동장에 3~4시간 안정 기간 확보</li>
</ul>

<h2>강아지 특별 팁</h2>
<ul>
  <li>쿨다운 명령('하우스' 또는 '들어가')을 이동장과 연결해 훈련</li>
  <li>여행 전날 케리어 안에서 자게 하거나 간식을 주면 좋은 연상 강화</li>
  <li>차멀미가 있는 강아지는 소량 식사 후 1~2시간 뒤 탑승 권장</li>
</ul>`,
    disclaimer: null,
    sources: [
      "American Association of Feline Practitioners (AAFP) Cat Friendly Practice Guidelines (2021)",
      "AVSAB Positive Reinforcement Position Statement (2021)",
      "대한수의사회 반려동물 행동 복지 가이드 (2022)",
    ],
    ymyl: false,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 64. 강아지 파보바이러스 (condition, cat.3, YMYL) ─────────────────────
  {
    id: "seed-condition-dog-parvovirus",
    slug: "dog-parvovirus",
    type: "condition",
    category: 3,
    title: "강아지 파보바이러스 — 증상·감염·치료·예방 접종",
    metaTitle: "강아지 파보바이러스 증상·치료·예방 | 퍼피 필수 접종 | 펫지기",
    metaDescription:
      "강아지 파보바이러스(Parvovirus)의 위험한 증상(혈변·구토·급격한 탈수), 감염 경로, 집중 치료, 예방 접종 스케줄을 안내합니다.",
    body: `<h2>강아지 파보바이러스란?</h2>
<p>파보바이러스(Canine Parvovirus, CPV)는 강아지에서 발생하는 가장 치명적인 바이러스성 질환 중 하나입니다. 특히 생후 6~20주 미접종 퍼피에서 치사율이 높습니다. 그러나 예방 접종으로 완전히 예방할 수 있습니다.</p>

<h2>주요 증상</h2>
<ul>
  <li><strong>혈변·혈성 설사</strong> — 악취가 매우 심한 혈변이 특징적 증상</li>
  <li><strong>심한 구토</strong> — 반복적, 빠른 탈수 유발</li>
  <li><strong>급격한 탈수·쇠약</strong> — 빠르게 악화</li>
  <li><strong>발열 또는 저체온</strong></li>
  <li><strong>식욕 완전 소실·무기력</strong></li>
  <li><strong>복통·배 팽만</strong></li>
</ul>
<p><strong>응급 상황</strong>: 퍼피에서 이 증상들이 나타나면 즉시(수 시간 내) 동물병원에 방문해야 합니다. 치료가 늦어지면 24~72시간 내 사망할 수 있습니다.</p>

<h2>감염 경로</h2>
<ul>
  <li><strong>분변-구강 경로</strong>: 감염된 강아지의 대변 접촉 — 직접 또는 오염된 토양·물건 통해</li>
  <li>바이러스는 환경에서 수개월~1년 이상 생존 가능 (일반 세제로는 불활성화 안 됨)</li>
  <li><strong>사람의 신발·옷·손</strong>: 오염된 환경 접촉 후 집으로 바이러스 전파 가능</li>
  <li>야외 산책, 강아지 집단 시설(펫숍·브리더) 접촉을 통한 노출 위험</li>
</ul>

<h2>진단</h2>
<ul>
  <li><strong>항원 키트 검사(ELISA)</strong>: 대변으로 15~30분 이내 양성 확인 가능</li>
  <li>혈액 검사: 백혈구 감소증(면역 세포 파괴)이 특징적</li>
</ul>

<h2>치료</h2>
<p>파보바이러스 자체를 죽이는 항바이러스제는 없습니다. 입원 집중 치료로 강아지의 면역계가 바이러스를 이길 수 있도록 지지합니다.</p>
<ul>
  <li><strong>정맥 수액</strong>: 탈수·전해질 교정이 가장 중요</li>
  <li><strong>구토·설사 억제제</strong>: 증상 완화</li>
  <li><strong>항생제</strong>: 2차 세균 감염 예방 (면역 저하 상태)</li>
  <li><strong>영양 공급</strong>: 경관 급식 또는 정맥 영양</li>
  <li>집중 치료 시 생존율 약 80~90%. 입원 치료 없이는 생존율 급격히 감소</li>
</ul>

<h2>예방 — 접종이 가장 확실한 방법</h2>
<ul>
  <li><strong>종합 백신(DHPPL)</strong>에 파보바이러스 예방 성분이 포함되어 있습니다</li>
  <li>퍼피: 6~8주령부터 2~4주 간격으로 총 3~4회, 16주 완료</li>
  <li>성견: 1~3년마다 추가 접종</li>
  <li>접종 완료 전 강아지는 야외 산책·다른 강아지와의 접촉을 최소화</li>
</ul>

<h2>환경 소독</h2>
<p>파보바이러스는 일반 세제로 불활성화되지 않습니다. 오염된 환경은 <strong>차아염소산나트륨(bleach) 1:32 희석액</strong> 또는 전용 동물 바이러스 소독제로 소독해야 합니다.</p>`,
    disclaimer:
      "본 정보는 수의학 참고 자료로 제공되며 의학적 진단과 치료를 대체하지 않습니다. 파보바이러스 의심 증상은 즉시 동물병원을 방문하세요. 예방 접종 스케줄은 담당 수의사와 상의하세요.",
    sources: [
      "WSAVA Vaccination Guidelines for Small Animal Practitioners (2022)",
      "Decaro N, Buonavoglia C. Canine parvovirus. Vet Clin North Am Small Anim Pract. 2012",
      "대한수의사회 소동물 예방의학 임상 지침 (2022)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ── 65. 동물병원 선택 가이드 (guide, cat.3, YMYL) ───────────────────────
  {
    id: "seed-guide-animal-hospital-guide",
    slug: "animal-hospital-guide",
    type: "guide",
    category: 3,
    title: "동물병원 선택 가이드 — 믿을 수 있는 병원 고르는 기준",
    metaTitle: "동물병원 선택 가이드 | 일반·전문·응급 병원 차이·체크리스트 | 펫지기",
    metaDescription:
      "반려동물에게 맞는 동물병원을 선택하는 기준을 안내합니다. 일반·2차 전문·응급 병원의 차이, 방문 전 체크리스트, 전문 진료과 설명을 포함합니다.",
    body: `<h2>동물병원, 어떻게 선택할까?</h2>
<p>처음 반려동물을 입양했거나 이사를 했다면 '단골 동물병원'을 정하는 것이 중요합니다. 응급 상황이 생기기 전에 미리 신뢰할 수 있는 병원을 파악해두면 마음이 훨씬 든든합니다.</p>

<h2>동물병원 종류</h2>
<h3>1차 일반 동물병원 (GP, General Practice)</h3>
<ul>
  <li>예방접종, 건강검진, 일반 질병 진료, 중성화 수술 등 기본 서비스 제공</li>
  <li>집 근처에서 정기적으로 방문하는 주치의 역할</li>
  <li>전반적 건강 관리와 예방 의학의 핵심</li>
</ul>
<h3>2차 전문 동물병원</h3>
<ul>
  <li>내과·외과·피부과·안과·치과·신경과·종양학 등 전문과 별도 운영</li>
  <li>1차 병원 의뢰서를 통해 방문하거나 직접 예약 가능</li>
  <li>복잡한 진단·수술·전문 치료가 필요할 때 이용</li>
</ul>
<h3>24시간 응급 동물병원</h3>
<ul>
  <li>야간·주말 응급 처치 전문</li>
  <li>경련, 호흡 곤란, 외상, 중독 등 응급 상황에 즉시 방문</li>
  <li>거주지 주변 24시간 응급 병원 위치를 미리 저장해두세요</li>
</ul>

<h2>좋은 동물병원 고르는 체크리스트</h2>
<ul>
  <li>✓ <strong>수의사 자격·경력 공개 여부</strong></li>
  <li>✓ <strong>기본 검사 장비 보유</strong>: 혈액 분석기, X-ray, 초음파</li>
  <li>✓ <strong>예약 시스템 운영</strong>: 긴 대기 없이 진료 가능 여부</li>
  <li>✓ <strong>투명한 진료비 안내</strong>: 사전 비용 설명, 영수증 내역 제공</li>
  <li>✓ <strong>의사소통 편의성</strong>: 수의사가 충분히 설명해주고 질문을 받아주는지</li>
  <li>✓ <strong>입원 시설 위생 상태</strong></li>
  <li>✓ <strong>24시간 응급 연락 가능 여부</strong> (또는 연계 응급병원 안내)</li>
</ul>

<h2>첫 방문 시 확인할 것들</h2>
<ol>
  <li>진료 전 예방접종 이력·병력 정보 공유 → 전 병원 진료 기록 지참</li>
  <li>진료비 예상 범위 사전 문의</li>
  <li>수의사의 설명이 이해하기 쉬운지 확인</li>
  <li>처방전 발급 여부 (약 구매 시 이용)</li>
</ol>

<h2>품종별 전문 진료 필요 여부</h2>
<ul>
  <li><strong>단두종(불독·퍼그·프렌치 불독)</strong>: 호흡기 전문 진료 경험 병원 권장</li>
  <li><strong>대형 외과 질환</strong>: 십자인대·고관절 수술 → 정형외과 전문의 보유 병원</li>
  <li><strong>고양이 전문</strong>: 고양이 특화 진료 병원(Cat Friendly Clinic) 인증 여부 확인</li>
  <li><strong>소동물(이그조틱)</strong>: 토끼·기니피그 등 — 이그조틱 동물 전문 병원 별도 확인 필수</li>
</ul>

<h2>동물병원 찾기</h2>
<p>펫지기에서 지역별 동물병원을 검색하거나, 농림축산검역본부 동물병원 찾기 서비스(APMS)를 이용할 수 있습니다.</p>`,
    disclaimer:
      "본 정보는 일반적인 안내 목적이며, 특정 병원을 추천하거나 보증하지 않습니다. 방문 전 직접 병원에 연락해 진료 범위와 예약 가능 여부를 확인하세요.",
    sources: [
      "농림축산검역본부 동물병원 찾기 서비스 (apms.go.kr)",
      "WSAVA Guidelines for Small Animal General Practice (2022)",
      "한국수의사회 동물병원 품질 기준 (2023)",
    ],
    ymyl: true,
    status: "published",
    publishedAt: "2026-05-22T00:00:00.000Z",
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
