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
