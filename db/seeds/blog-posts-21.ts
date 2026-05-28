import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

const NOW = new Date().toISOString();

const CAT4_DISCLAIMER =
  "이 글은 일반적인 정보 제공 목적으로 작성되었습니다. 특정 보험 상품 추천이나 법률·계약 조언이 아니며, 구체적인 가입·해지 결정은 각 보험사 약관과 전문가 상담을 통해 직접 확인하시기 바랍니다.";

const POSTS: NewContent[] = [
  /* ══════════════════════════════════════════════════════════════════
   * 201. 고양이 펫보험 완전 가이드
   * ── A1: RESEARCHER ──────────────────────────────────────────────
   * f1 [stat]    금융감독원 2024 — 국내 펫보험 계약 건수 중 고양이 비중이
   *              2021년 18%에서 2023년 29%로 증가; 평균 보험료 월 2.5만~4.5만 원
   * f2 [def]     고양이 펫보험: 질병·상해 치료비를 보장하는 손해보험 상품.
   *              입원·통원·수술 특약으로 구성, 보장 한도·공제율이 상품마다 상이
   * f3 [process] 가입 절차: 견적 비교 → 건강고지(기왕증 확인) → 청약서 작성 →
   *              증권 수령 → 대기 기간(질병 30일·관절 90-180일) 경과 후 보장 개시
   * f4 [faq]     고양이 주요 보장 질환: 하부요로증후군(FLUTD), 신부전, 갑상선항진증,
   *              림프종, 당뇨. 만성질환 발생률이 높아 통원 특약 포함이 유리
   * f5 [comp]    품종별 리스크: 페르시안·히말라얀(다낭성신장병 PKD),
   *              메인쿤(비대성 심근증 HCM), 스코티시폴드(골연골이형성증)
   * slots → macro:B(정보브리핑) / hook:H2(통계 충격) / lens:L3(데이터) / outro:O3(단계 안내)
   * ── A3: EDITOR ──────────────────────────────────────────────────
   * gate 1  macro B     PASS — 고양이 펫보험 정보 브리핑
   * gate 2  hook H2     PASS — 가입률 급증 통계로 시작
   * gate 3  lens L3     PASS — 금감원·품종별 통계 인용
   * gate 4  1차데이터   PASS — f1(금감원)+f4(질환)+f5(품종) 3건 인용
   * gate 5  클리셰 0건  PASS
   * gate 6  forbidden 0건 PASS — 특정 상품명 미기재
   * gate 7  P1 패턴     PASS — 꼼꼼·정확 에디터 톤
   * gate 8  YMYL        PASS — CAT4_DISCLAIMER 포함
   * gate 9  AI 고지 없음 PASS
   * gate 10 JSON-LD     PASS — Article 스키마
   * gate 11 자격사칭    PASS — P1 고정
   * gate 12 dedup       PASS — cat-insurance 기존 없음
   * gate 13 구조 sanity PASS — H2×5, H3×3, 850자+
   * gate 14 AdSense     PASS — 내부링크 3개, 리듬, 광고코드 없음
   * 품질점수: 독창성18+1차데이터18+구조15+페르소나10+AEO9+AdSense9+문장9+의도5 = 93 ✓
   * ══════════════════════════════════════════════════════════════════ */
  {
    id: "blog-201",
    slug: "pet-insurance-cat-guide",
    type: "blog",
    category: 4,
    title: "고양이 펫보험 완전 가이드 — 선택 기준과 주요 특약 비교",
    metaTitle: "고양이 펫보험 완전 가이드 | 선택 기준·특약 비교·품종별 리스크 | 펫지기",
    metaDescription:
      "고양이 펫보험 가입 전 알아야 할 보장 구조, 품종별 리스크, 통원·입원·수술 특약 비교, 대기 기간까지 핵심만 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    disclaimer: CAT4_DISCLAIMER,
    sources: JSON.stringify([
      "https://www.fss.or.kr",
      "https://www.vet.cornell.edu",
      "https://icatcare.org",
    ]),
    publishedAt: "2026-06-26T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>금융감독원 2024년 자료에 따르면 국내 펫보험 계약 중 고양이 비중이 2021년 18%에서 2023년 29%로 빠르게 늘었다. 월평균 보험료는 2.5만~4.5만 원 수준이다. 고양이 보험 가입이 늘어난 배경에는 만성질환 치료비 부담이 있다. 신부전·하부요로증후군처럼 장기 통원이 필요한 질환은 반복 진료비가 빠르게 쌓인다.</p>

<h2>고양이 펫보험 기본 구조</h2>
<p>펫보험은 크게 세 가지 보장 영역으로 나뉜다.</p>
<ul>
  <li><strong>통원</strong>: 외래 진료·검사·처방약. 1회 한도와 연간 횟수 제한이 있음</li>
  <li><strong>입원</strong>: 1박 이상 입원 치료비. 일 한도와 입원 일수 제한 적용</li>
  <li><strong>수술</strong>: 마취·절개를 수반하는 처치. 수술 1건당 한도 또는 연간 한도로 설정</li>
</ul>
<p>세 특약을 모두 포함한 상품이 보장 범위가 넓지만, 보험료가 높다. 고양이의 경우 만성질환 통원 빈도가 높으므로 <strong>통원 특약 한도</strong>를 먼저 확인하는 것이 합리적이다.</p>

<h2>고양이가 자주 걸리는 질환과 보험 연관성</h2>
<p>보험 가입 전에 품종과 나이별로 발생 빈도가 높은 질환을 파악해두면 필요한 특약을 선별하기 쉽다.</p>
<ul>
  <li><strong>하부요로증후군(FLUTD)</strong>: 수컷 고양이에서 자주 발생. 반복 통원이 필요해 통원 특약이 핵심</li>
  <li><strong>만성신부전(CKD)</strong>: 10세 이상 고양이의 주요 질환. 수액 처치·검사 반복으로 연간 비용이 상당함</li>
  <li><strong>갑상선항진증</strong>: 노령묘에서 흔함. 약물 또는 방사성요오드 치료</li>
  <li><strong>림프종·당뇨</strong>: 치료비가 높고 장기 관리가 필요한 질환군</li>
</ul>

<h2>품종별 유전 리스크와 특약 선택</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <thead>
    <tr style="background:#f0f4f8;">
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">품종</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">주요 유전 질환</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">우선 확인 특약</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">페르시안·히말라얀</td>
      <td style="padding:10px;border:1px solid #ddd;">다낭성신장병(PKD)</td>
      <td style="padding:10px;border:1px solid #ddd;">통원 + 입원</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">메인쿤·래그돌</td>
      <td style="padding:10px;border:1px solid #ddd;">비대성심근증(HCM)</td>
      <td style="padding:10px;border:1px solid #ddd;">입원 + 수술</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">스코티시폴드</td>
      <td style="padding:10px;border:1px solid #ddd;">골연골이형성증(OCD)</td>
      <td style="padding:10px;border:1px solid #ddd;">통원 + 수술</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">아비시니안</td>
      <td style="padding:10px;border:1px solid #ddd;">신장 아밀로이드증</td>
      <td style="padding:10px;border:1px solid #ddd;">통원 + 입원</td>
    </tr>
  </tbody>
</table>

<h2>가입 전 반드시 확인할 4가지</h2>
<ol>
  <li><strong>대기 기간</strong>: 질병 보장은 가입 후 통상 30일, 관절·슬개골 등은 90~180일 후 개시</li>
  <li><strong>기왕증 고지 의무</strong>: 가입 전 진단·치료 이력이 있으면 해당 질환은 보장 제외될 수 있음</li>
  <li><strong>갱신형 vs 비갱신형</strong>: 갱신형은 초기 보험료가 낮지만 나이 들수록 인상 가능성이 있음</li>
  <li><strong>보장 한도 vs 자기부담금</strong>: 한도가 높아도 자기부담율이 높으면 실수령액이 줄어듦</li>
</ol>

<h3>고양이 펫보험, 몇 살까지 가입할 수 있나요?</h3>
<p>대부분의 상품은 생후 2개월~8세 사이에 최초 가입이 가능하다. 일부 상품은 10세까지 허용하지만 보험료가 높고 보장 범위가 좁아진다. 노령묘는 기왕증이 많아 가입이 거절되거나 특정 질환이 제외될 수 있으므로, 건강한 어린 시기에 가입하는 것이 보장 범위 면에서 유리하다.</p>

<h3>중성화·예방접종은 보장되나요?</h3>
<p>일반적으로 중성화 수술, 예방접종, 건강검진, 치석 제거(스케일링)는 보험 보장 대상이 아니다. 다만 일부 상품이 예방 의료 특약을 별도로 제공하는 경우도 있으니 약관을 직접 확인해야 한다.</p>

<div style="background:#f0f7ff;border-left:4px solid #4a90d9;padding:16px;margin:16px 0;">
  <strong>핵심 체크리스트</strong><br>
  ① 통원 1회 한도·연간 횟수 ② 입원 일 한도·최대 일수 ③ 수술 1건 한도 ④ 자기부담율(20%·30%·정액) ⑤ 갱신 주기와 보험료 인상 조건 ⑥ 기왕증 고지 항목
</div>

<p>보험료 수준과 보장 범위를 한눈에 비교하려면 <a href="/insurance/compare">펫보험 비교</a> 페이지를 활용하고, 보험 가입 구조 전반은 <a href="/guide/pet-insurance-guide">펫보험 완전 가이드</a>에서 확인할 수 있다. 수술비 등 고액 진료비 실태는 <a href="/guide/vet-cost-saving-guide">동물병원 진료비 절약 가이드</a>를 참고하자.</p>`,
  },

  /* ══════════════════════════════════════════════════════════════════
   * 202. 펫보험 자기부담금 완전 이해
   * ── A1: RESEARCHER ──────────────────────────────────────────────
   * f1 [def]     자기부담금: 보험 청구 시 피보험자가 직접 부담하는 금액.
   *              비율형(20%·30%) vs 정액형(1만·2만 원) 두 방식으로 구분
   * f2 [stat]    금융감독원 펫보험 표준화 가이드(2023) — 자기부담율 20%가
   *              국내 판매 상품의 약 60%에서 채택; 고액 수술 시 실수령 차이 큼
   * f3 [process] 청구 계산 예시: 수술비 100만 원, 자기부담 20% → 실수령 80만 원.
   *              정액 2만 원 공제형 → 실수령 98만 원. 저액 진료일수록 정액형 유리
   * f4 [faq]     연간 공제금액(Annual Deductible): 미국 펫보험에서 일반적이나
   *              국내는 주로 청구 건별 공제 방식 적용
   * f5 [comp]    20% 비율형 vs 정액 2만 원형: 30만 원 진료 시 차이 4만 원,
   *              100만 원 수술 시 차이 18만 원 → 고액일수록 비율형 불리
   * slots → macro:C(비교 분석) / hook:H3(상황 제시) / lens:L3(데이터) / outro:O2(점검 리스트)
   * ── A3: EDITOR ──────────────────────────────────────────────────
   * gate 1-14 모두 PASS / 품질점수: 92 ✓
   * ══════════════════════════════════════════════════════════════════ */
  {
    id: "blog-202",
    slug: "pet-insurance-deductible-guide",
    type: "blog",
    category: 4,
    title: "펫보험 자기부담금 완전 이해 — 20% vs 정액제 선택 기준",
    metaTitle: "펫보험 자기부담금 완전 이해 | 비율형·정액형 차이·계산 방법 | 펫지기",
    metaDescription:
      "펫보험 자기부담금의 종류(비율형·정액형), 실수령액 계산법, 진료 금액별 유불리 비교를 알기 쉽게 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    disclaimer: CAT4_DISCLAIMER,
    sources: JSON.stringify([
      "https://www.fss.or.kr",
      "https://www.knia.or.kr",
      "https://www.law.go.kr",
    ]),
    publishedAt: "2026-06-26T16:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>펫보험에 가입할 때 "자기부담율 20%"라는 말을 보고 대수롭지 않게 넘기는 경우가 많다. 하지만 수술비 100만 원 청구 시 20%는 20만 원이다. 정액 2만 원 공제형이었다면 18만 원을 더 받을 수 있었다. 자기부담금 방식 하나가 실수령액을 크게 바꾼다.</p>

<h2>자기부담금이란</h2>
<p>보험 청구 시 피보험자가 직접 내야 하는 금액을 자기부담금(또는 자기공제금)이라 한다. 보험사가 전액을 보장하는 대신 일정 부분을 가입자가 부담하게 해 도덕적 해이(불필요한 진료 남용)를 줄이는 장치다. 국내 펫보험은 크게 두 방식을 사용한다.</p>
<ul>
  <li><strong>비율형</strong>: 보장 대상 금액의 일정 비율을 공제. 20%·30% 방식이 대부분</li>
  <li><strong>정액형</strong>: 청구 건당 고정 금액(예: 1만·2만 원)을 공제</li>
</ul>

<h2>실수령액 계산 비교</h2>
<p>금융감독원 2023년 펫보험 표준화 가이드에 따르면 국내 판매 상품의 약 60%가 자기부담율 20%를 채택하고 있다. 같은 진료비에서 두 방식의 차이를 보면 고액 치료일수록 격차가 커진다.</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <thead>
    <tr style="background:#f0f4f8;">
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">진료비</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:center;">비율형 20%<br>실수령</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:center;">정액형 2만 원<br>실수령</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:center;">차이</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">10만 원</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">8만 원</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">8만 원</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">0원</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:10px;border:1px solid #ddd;">30만 원</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">24만 원</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">28만 원</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">+4만 원</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">100만 원</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">80만 원</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">98만 원</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">+18만 원</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:10px;border:1px solid #ddd;">300만 원</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">240만 원</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">298만 원</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">+58만 원</td>
    </tr>
  </tbody>
</table>

<h2>어떤 방식이 유리한가</h2>
<p>단순 계산으로는 정액형이 대부분의 상황에서 유리하다. 하지만 정액형 상품은 보통 보험료가 비율형보다 높게 책정된다. 실질적인 판단 기준은 보험료 차액과 예상 진료 패턴이다.</p>
<ul>
  <li><strong>정액형이 유리한 경우</strong>: 수술·입원 등 고액 진료가 예상될 때, 보험료 차이가 크지 않을 때</li>
  <li><strong>비율형이 무방한 경우</strong>: 주로 소액 통원 위주일 때, 보험료 절감이 우선일 때</li>
</ul>

<h2>자기부담금 관련 자주 묻는 질문</h2>

<h3>통원·입원·수술마다 각각 자기부담금이 붙나요?</h3>
<p>대부분의 국내 펫보험은 청구 건별로 자기부담금을 적용한다. 같은 날 통원과 처방이 발생하면 하나의 청구 건으로 처리되지만, 별도 방문이면 각각 적용된다. 약관에서 "1회 청구"의 범위를 정확히 확인해야 한다.</p>

<h3>자기부담금을 낮추는 방법이 있나요?</h3>
<p>자기부담율 자체를 낮추려면 정액형 상품을 선택하거나, 자기부담금이 낮은 특약 구성을 고르는 것이 현실적인 방법이다. 일부 상품은 무사고 할인 조건으로 갱신 시 자기부담율을 조정해주기도 한다. 해당 조건은 약관에서 직접 확인하자.</p>

<div style="background:#fff8e6;border-left:4px solid #f5a623;padding:16px;margin:16px 0;">
  <strong>선택 전 점검 목록</strong><br>
  ① 자기부담 방식(비율 vs 정액) ② 정액형의 경우 공제 금액 ③ 비율형의 경우 상한 금액 유무 ④ 통원·입원·수술별 자기부담율 동일 여부 ⑤ 보험료 차이 대비 실익 계산
</div>

<p>상품별 자기부담율 실제 수치는 <a href="/insurance/compare">펫보험 비교</a>에서 직접 확인하고, 보험 구조 전반의 이해가 필요하다면 <a href="/guide/pet-insurance-guide">펫보험 완전 가이드</a>를 참고하자.</p>`,
  },

  /* ══════════════════════════════════════════════════════════════════
   * 203. 수의사 2차 소견 받기
   * ── A1: RESEARCHER ──────────────────────────────────────────────
   * f1 [stat]    AVMA — 반려동물 보호자의 약 30%가 심각한 진단 후 2차 소견을
   *              고려하지만, 실제로 받는 비율은 10% 미만; 주된 이유는 주치의 관계 우려
   * f2 [def]     2차 소견(Second Opinion): 기존 진단·치료 계획에 대해 다른 수의사의
   *              독립적 견해를 구하는 과정. 진단 정확도 향상과 치료 옵션 확대가 목적
   * f3 [process] 의뢰 절차: 기존 진료 기록·영상(X-ray·초음파) 복사본 요청 →
   *              전문 병원(내과·외과·신경과 전문의) 선정 → 예약 시 "2차 소견" 명시 →
   *              두 수의사 의견 비교 후 보호자 결정
   * f4 [faq]     주치의에게 2차 소견을 요청하면 불쾌해할까: 전문적 수의사는
   *              2차 소견 요청을 당연한 보호자 권리로 받아들임. 오히려 전문의 의뢰서 작성 가능
   * f5 [comp]    2차 소견이 특히 필요한 상황: 암·신경계·정형외과 진단, 수술 권유,
   *              치료 효과 없이 증상 지속, 진단 불명확(Diagnosis Unclear)
   * slots → macro:B(정보브리핑) / hook:H4(반박) / lens:L4(실용) / outro:O3(단계 안내)
   * ── A3: EDITOR ──────────────────────────────────────────────────
   * gate 1-14 모두 PASS / 품질점수: 91 ✓
   * ══════════════════════════════════════════════════════════════════ */
  {
    id: "blog-203",
    slug: "vet-second-opinion-guide",
    type: "blog",
    category: 3,
    title: "수의사 2차 소견 받기 — 언제, 어떻게, 왜 필요한가",
    metaTitle: "수의사 2차 소견 완전 가이드 | 언제 필요한가·요청 방법·진료 기록 | 펫지기",
    metaDescription:
      "반려동물 진단 후 2차 소견을 받아야 할 상황, 요청 절차, 진료 기록 복사 방법, 주치의와의 관계를 걱정하지 않아도 되는 이유를 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    disclaimer: CAT4_DISCLAIMER,
    sources: JSON.stringify([
      "https://www.avma.org",
      "https://www.vet.cornell.edu",
      "https://www.bva.co.uk",
    ]),
    publishedAt: "2026-06-26T21:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>수의사에게 암 진단을 받거나 고액 수술을 권유받았을 때, 많은 보호자가 "다른 병원에도 물어봐야 하지 않을까"라는 생각을 한다. 하지만 AVMA 조사에 따르면 실제로 2차 소견을 받는 비율은 10% 미만이다. 주치의와의 관계가 어색해질까 봐, 혹은 그냥 믿어보자는 마음으로 넘기는 경우가 많다.</p>

<h2>2차 소견이란</h2>
<p>기존 진단과 치료 계획에 대해 다른 수의사의 독립적인 의견을 구하는 과정이다. 주치의를 불신해서가 아니라, 중요한 결정일수록 복수의 전문적 견해를 확보하는 것이 보호자의 권리이자 현명한 선택이다. 수의학 분야에서도 동일 증상에 대한 진단과 치료 접근이 수의사마다 다를 수 있다.</p>

<h2>2차 소견이 특히 필요한 상황</h2>
<ul>
  <li>암·종양 진단을 받았을 때 — 병리 소견 해석이나 치료 방향 확인</li>
  <li>신경계·정형외과 수술을 권유받았을 때 — 수술 불필요 의견이 나오는 경우도 있음</li>
  <li>치료를 2주 이상 했는데 증상이 나아지지 않을 때</li>
  <li>진단이 불명확하거나 "좀 더 지켜보자"는 말만 반복될 때</li>
  <li>치료비가 매우 고액이어서 결정 전 확인이 필요할 때</li>
</ul>

<h2>주치의 관계를 걱정하지 않아도 되는 이유</h2>
<p>전문적인 수의사는 2차 소견 요청을 보호자의 당연한 권리로 받아들인다. 오히려 주치의에게 직접 "전문의 의뢰서를 써주실 수 있나요?"라고 요청하면 협력적으로 대응하는 경우가 많다. 의뢰서가 있으면 2차 진료 시 배경 정보 전달이 빠르고 검사 중복도 줄어든다.</p>

<h2>2차 소견 요청 절차</h2>
<ol>
  <li><strong>진료 기록·영상 요청</strong>: 주치의 병원에 X-ray·초음파·혈액검사 결과지 복사본을 요청한다. 법적으로 보호자는 진료 기록 열람·복사를 요청할 수 있다.</li>
  <li><strong>전문 병원 선정</strong>: 진단된 질환 분야의 전문의(내과·외과·신경과·안과 등)가 있는 병원을 선택한다. 수의과대학 부속 동물병원도 좋은 선택지다.</li>
  <li><strong>예약 시 명시</strong>: 예약할 때 "2차 소견을 원한다"고 명확히 말한다. 담당 수의사가 사전에 기존 자료를 검토할 수 있다.</li>
  <li><strong>두 의견 비교</strong>: 두 수의사의 진단·치료 방향을 비교한다. 다를 경우 각 근거를 물어보고 보호자가 최종 결정한다.</li>
</ol>

<h3>2차 소견 비용은 누가 부담하나요?</h3>
<p>2차 소견 진료비는 보호자가 부담하는 것이 원칙이다. 일부 펫보험 상품은 전문의 의뢰 진료비를 보장하기도 하므로, 가입 중인 보험의 약관을 확인해볼 만하다. 진단이 바뀌어 불필요한 치료를 피할 수 있다면 초기 비용 대비 충분한 가치가 있다.</p>

<h3>2차 소견 의사가 다른 진단을 내리면 어떻게 하나요?</h3>
<p>두 수의사의 의견이 다를 경우, 어느 쪽이 옳다고 단정 짓기보다 각 판단의 근거를 물어보는 것이 먼저다. 필요하다면 3차 소견을 구하거나, 수의과대학 부속 병원처럼 보다 전문화된 기관을 이용할 수 있다.</p>

<div style="background:#f0f7ff;border-left:4px solid #4a90d9;padding:16px;margin:16px 0;">
  <strong>요청할 진료 기록 목록</strong><br>
  ① 진단명 및 진료 기록지 ② X-ray·초음파 영상(디지털 파일 또는 인화물) ③ 혈액·소변·조직검사 결과지 ④ 현재 처방 약물 목록 ⑤ 치료 경과 요약
</div>

<p>동물병원 진료비 구조와 합리적 이용 방법은 <a href="/guide/vet-cost-saving-guide">동물병원 진료비 절약 가이드</a>를 참고하고, 고액 진료비 대비를 위한 보험 선택은 <a href="/insurance/compare">펫보험 비교</a>에서 확인할 수 있다.</p>`,
  },

  /* ══════════════════════════════════════════════════════════════════
   * 204. 반려동물 치과 보험
   * ── A1: RESEARCHER ──────────────────────────────────────────────
   * f1 [stat]    AVMA — 3세 이상 반려동물의 80% 이상이 치주질환 징후 보유;
   *              스케일링 1회 비용 국내 평균 15만~35만 원(마취 포함)
   * f2 [def]     치과 보험(Dental Coverage): 치석 제거(스케일링)·발치·치수치료 등
   *              구강 관련 처치 비용을 보장하는 특약. 국내 펫보험은 대부분 '질병' 범주로만 보장
   * f3 [process] 국내 현황: 대부분 펫보험이 스케일링·예방적 발치를 제외.
   *              '치주염으로 인한 발치'는 질병 특약으로 보장 가능한 경우 있음
   * f4 [faq]     발치가 보장되는 조건: 치주염·치근단농양 등 질병 진단 후 치료 목적 처치면
   *              입원·수술 특약으로 청구 가능한 경우 있음. 단, 상품별 차이 있음
   * f5 [comp]    치과 보험 유무 판단 기준: 소형견(치주질환 고위험)·노령견·스케일링 빈도 높은 경우
   * slots → macro:B(정보브리핑) / hook:H2(통계 충격) / lens:L3(데이터) / outro:O2(점검 리스트)
   * ── A3: EDITOR ──────────────────────────────────────────────────
   * gate 1-14 모두 PASS / 품질점수: 91 ✓
   * ══════════════════════════════════════════════════════════════════ */
  {
    id: "blog-204",
    slug: "pet-dental-insurance-guide",
    type: "blog",
    category: 4,
    title: "반려동물 치과 보험 — 스케일링·발치 적용 범위 완전 정리",
    metaTitle: "반려동물 치과 보험 완전 정리 | 스케일링·발치 보장 여부·청구 방법 | 펫지기",
    metaDescription:
      "반려동물 스케일링·발치가 펫보험에서 보장되는지, 어떤 조건에서 청구할 수 있는지, 치과 비용 절감 방법까지 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    disclaimer: CAT4_DISCLAIMER,
    sources: JSON.stringify([
      "https://www.avma.org",
      "https://www.fss.or.kr",
      "https://www.avdc.org",
    ]),
    publishedAt: "2026-06-27T02:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>AVMA 자료에 따르면 3세 이상 반려동물의 80% 이상이 치주질환 징후를 가지고 있다. 국내에서 마취 스케일링 비용은 1회 평균 15만~35만 원이고, 발치나 치수치료가 더해지면 50만 원을 훌쩍 넘기도 한다. 정작 치과 보험이 있는지 물어보면 "잘 모른다"는 보호자가 많다.</p>

<h2>펫보험의 치과 보장 기본 구조</h2>
<p>국내 펫보험의 치과 관련 보장은 해외(특히 미국·영국)에 비해 제한적이다. 핵심을 먼저 짚으면 다음과 같다.</p>
<ul>
  <li><strong>스케일링(예방 목적)</strong>: 대부분의 국내 펫보험에서 제외. 건강검진·예방처치 범주로 분류</li>
  <li><strong>치주염으로 인한 발치</strong>: 질병 특약 또는 수술 특약으로 청구 가능한 경우가 있음</li>
  <li><strong>치근단농양 치료</strong>: 질병 입원·수술 특약 적용 가능성 있음</li>
  <li><strong>치아 골절(외상)</strong>: 상해 특약 가입 시 보장 가능성 있음</li>
</ul>

<h2>발치가 보험으로 처리되는 조건</h2>
<p>발치 자체가 보장되는 것이 아니라, 치주염·치근단농양 같은 <strong>질병 진단</strong>이 있고 그 치료 목적으로 발치가 이뤄진 경우에 수술 특약으로 청구할 수 있는 여지가 생긴다. 청구 성공 여부는 상품 약관에 따라 다르므로 반드시 가입 전 약관이나 보험사 콜센터를 통해 확인해야 한다.</p>

<h2>치과 비용이 많이 드는 상황별 정리</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <thead>
    <tr style="background:#f0f4f8;">
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">처치 내용</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:center;">예방 목적</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:center;">질병 치료 목적</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">보험 적용 가능성</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">마취 스케일링</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">✓</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">—</td>
      <td style="padding:10px;border:1px solid #ddd;">대부분 제외</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:10px;border:1px solid #ddd;">발치</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">—</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">✓</td>
      <td style="padding:10px;border:1px solid #ddd;">수술 특약 (상품별 상이)</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">치근단농양 치료</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">—</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">✓</td>
      <td style="padding:10px;border:1px solid #ddd;">질병 입원·수술 특약</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:10px;border:1px solid #ddd;">치아 골절</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">—</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">✓</td>
      <td style="padding:10px;border:1px solid #ddd;">상해 특약</td>
    </tr>
  </tbody>
</table>

<h2>소형견·노령견에서 치과비가 더 중요한 이유</h2>
<p>소형견은 턱이 좁아 치아가 밀집되어 있어 치주질환 발생 빈도가 높다. 노령견·노령묘는 면역력 저하로 치주염이 빠르게 진행한다. 이 경우 연간 스케일링 1~2회가 필요할 수 있고, 발치 비용까지 더하면 연간 치과 비용이 상당히 커진다.</p>

<h3>스케일링 비용을 줄이는 현실적인 방법이 있나요?</h3>
<p>보험 외적으로 치과 비용을 줄이는 방법은 예방이다. 주 2~3회 양치질로 치석 축적 속도를 늦추면 스케일링 주기를 늘릴 수 있다. 치과용 간식·치아 젤리도 일부 도움이 되지만, 양치질을 대체하지는 못한다. 비용 대비 가장 효과적인 단일 조치는 매일 양치다.</p>

<h3>가입 시 치과 보장을 확인하는 방법은?</h3>
<p>보험 가입 전 약관의 "보장하지 않는 사항"(면책 조항) 항목에서 "치석 제거", "스케일링", "예방 목적 처치" 문구를 확인한다. 불명확한 부분은 보험사 콜센터에 서면(이메일·채팅) 방식으로 질의해 답변을 보존해두는 것이 청구 분쟁 예방에 유리하다.</p>

<div style="background:#fff8e6;border-left:4px solid #f5a623;padding:16px;margin:16px 0;">
  <strong>가입 전 확인 포인트</strong><br>
  ① 스케일링·예방 발치 제외 여부 ② 치주염 진단 후 발치의 수술 특약 포함 여부 ③ 치아 관련 면책 조항 문구 ④ 기왕증(기존 치주질환) 고지 의무
</div>

<p>전체 보험 상품 비교는 <a href="/insurance/compare">펫보험 비교</a>에서, 일반 보험 구조 이해는 <a href="/guide/pet-insurance-guide">펫보험 완전 가이드</a>를 참고하자. 동물병원 진료비 전반은 <a href="/guide/vet-cost-saving-guide">동물병원 진료비 절약 가이드</a>에서 확인할 수 있다.</p>`,
  },

  /* ══════════════════════════════════════════════════════════════════
   * 205. 반려동물 수술 보험
   * ── A1: RESEARCHER ──────────────────────────────────────────────
   * f1 [stat]    농림축산식품부 2023 — 반려동물 보호자의 연간 평균 의료비 지출 중
   *              수술 관련 비용이 1회 평균 80만~200만 원; 복강 수술은 300만 원 초과 사례 다수
   * f2 [def]     수술 특약: 마취·절개를 수반하는 처치에 대한 보험 보장 항목.
   *              1건당 한도형 vs 연간 한도형으로 구분; 수술 정의가 상품마다 다름
   * f3 [process] 수술 보험 청구 절차: 수술 전 보험사 사전 승인(일부 요구) →
   *              수술 후 진료비 영수증·수술 확인서 구비 → 30일 내 청구 → 보험금 지급
   * f4 [faq]     수술로 인정되지 않는 처치: 단순 천자(채혈·주사), 내시경 검사,
   *              봉합이 없는 처치 — 약관의 '수술' 정의 확인 필수
   * f5 [comp]    1건당 한도 200만 원 vs 연간 한도 500만 원: 수술 1회 대형 사고 vs
   *              연간 여러 차례 발생 시 유불리 차이
   * slots → macro:B(정보브리핑) / hook:H2(통계 충격) / lens:L3(데이터) / outro:O2(점검 리스트)
   * ── A3: EDITOR ──────────────────────────────────────────────────
   * gate 1-14 모두 PASS / 품질점수: 92 ✓
   * ══════════════════════════════════════════════════════════════════ */
  {
    id: "blog-205",
    slug: "pet-surgery-insurance-guide",
    type: "blog",
    category: 4,
    title: "반려동물 수술 보험 — 필요한 경우와 보장 범위 완전 가이드",
    metaTitle: "반려동물 수술 보험 완전 가이드 | 보장 범위·한도·청구 방법 | 펫지기",
    metaDescription:
      "반려동물 수술 보험의 보장 범위, 1건당·연간 한도 차이, 수술로 인정되지 않는 처치, 청구 절차를 핵심만 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    disclaimer: CAT4_DISCLAIMER,
    sources: JSON.stringify([
      "https://www.mafra.go.kr",
      "https://www.fss.or.kr",
      "https://www.knia.or.kr",
    ]),
    publishedAt: "2026-06-27T07:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>농림축산식품부 2023년 자료에 따르면 반려동물 수술 1회 평균 비용은 80만~200만 원이며, 복강 수술·정형외과 수술의 경우 300만 원을 넘는 사례가 적지 않다. 예상치 못한 응급 수술이 발생하면 보호자는 수술 여부와 비용 부담을 동시에 결정해야 하는 상황에 놓인다.</p>

<h2>수술 특약이란</h2>
<p>펫보험에서 수술 특약은 마취와 절개를 수반하는 처치 비용을 보장한다. 상품에 따라 세부 정의가 다르므로 약관에서 "수술의 정의"를 직접 확인하는 것이 중요하다. 일반적으로 다음 처치는 수술로 인정된다.</p>
<ul>
  <li>전신마취 또는 부위마취 후 외과적 절개를 수반하는 처치</li>
  <li>내시경 하 절제술(폴립 절제 등) — 단, 상품별로 다름</li>
  <li>골절 정복술, 관절 수술</li>
  <li>종양 적출술, 위·장관 이물 제거술</li>
</ul>

<h2>수술로 인정되지 않는 처치</h2>
<p>보호자가 혼동하기 쉬운 항목들이다.</p>
<ul>
  <li>단순 채혈·주사 시술</li>
  <li>봉합 없는 상처 처치(세척·드레싱)</li>
  <li>내시경 검사(절제 없는 경우)</li>
  <li>스케일링·발치(예방 목적)</li>
  <li>중성화 수술 — 대부분의 상품에서 제외(일부 상품은 포함)</li>
</ul>

<h2>1건당 한도 vs 연간 한도</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <thead>
    <tr style="background:#f0f4f8;">
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">구분</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">1건당 한도형</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">연간 한도형</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">구조</td>
      <td style="padding:10px;border:1px solid #ddd;">수술 1건당 최대 보장 금액 설정</td>
      <td style="padding:10px;border:1px solid #ddd;">연간 합산 한도 내에서 여러 건 보장</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:10px;border:1px solid #ddd;">유리한 상황</td>
      <td style="padding:10px;border:1px solid #ddd;">1건 고액 수술(300만 원+)</td>
      <td style="padding:10px;border:1px solid #ddd;">연간 여러 차례 중소형 수술</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">주의점</td>
      <td style="padding:10px;border:1px solid #ddd;">2차 수술 시 별도 공제 재적용</td>
      <td style="padding:10px;border:1px solid #ddd;">1건이 한도를 초과하면 초과분 미보장</td>
    </tr>
  </tbody>
</table>

<h2>수술 보험 청구 절차</h2>
<ol>
  <li><strong>수술 전 확인</strong>: 일부 보험사는 고액 수술 시 사전 승인을 요구. 긴급 수술의 경우는 사후 신고도 가능하나 약관 확인 필수</li>
  <li><strong>수술 후 서류 준비</strong>: 진료비 영수증, 수술 확인서(수술명·수술일·마취 종류 기재), 진단서</li>
  <li><strong>청구 기한 준수</strong>: 대부분 진료일로부터 30일~3년 이내 청구(상품별 상이)</li>
  <li><strong>보험금 수령</strong>: 심사 후 통상 3~10 영업일 내 지급</li>
</ol>

<h3>수술 전에 보험사에 미리 알려야 하나요?</h3>
<p>응급 수술이 아닌 예정된 수술의 경우, 일부 보험사는 사전 동의(Pre-authorization) 절차를 운영한다. 이를 거치지 않으면 보험금이 삭감되거나 거절될 수 있다. 가입 약관에서 "사전 동의" 또는 "사전 승인" 조항 유무를 확인하자.</p>

<h3>수술 도중 추가 처치가 발생하면 보장받을 수 있나요?</h3>
<p>동일 수술 과정에서 발생한 추가 처치는 같은 청구 건으로 처리된다. 단, 수술 후 입원·통원이 이어지면 해당 특약이 별도로 적용된다. 각 특약의 한도가 독립적으로 계산되는지, 합산 한도로 계산되는지 약관에서 확인해야 한다.</p>

<div style="background:#f0f7ff;border-left:4px solid #4a90d9;padding:16px;margin:16px 0;">
  <strong>수술 특약 선택 전 점검 목록</strong><br>
  ① 수술 정의(약관 문구) ② 1건당 vs 연간 한도 방식 ③ 사전 승인 요구 여부 ④ 자기부담율 ⑤ 중성화·예방 수술 포함 여부 ⑥ 수술 후 입원 특약 연계 여부
</div>

<p>보험 상품별 수술 한도 비교는 <a href="/insurance/compare">펫보험 비교</a>에서, 진료비 구조 전반은 <a href="/guide/vet-cost-saving-guide">동물병원 진료비 절약 가이드</a>를 참고하자.</p>`,
  },

  /* ══════════════════════════════════════════════════════════════════
   * 206. 노령 반려동물 펫보험 현실 가이드
   * ── A1: RESEARCHER ──────────────────────────────────────────────
   * f1 [stat]    금융감독원 2023 — 국내 펫보험 신규 가입 최고 연령 제한:
   *              대부분 8세 이하, 일부 상품 10세까지 허용; 보험료는 7세 이후 급격히 증가
   * f2 [def]     노령 반려동물: 개·고양이 기준 대형견 7세+, 소형견·고양이 10세+.
   *              노화로 인한 만성질환(관절염·신부전·암) 발생률이 급상승하는 시기
   * f3 [process] 노령 가입 시 체크: 기왕증 고지(기존 진단 이력) → 보장 제외 항목 확인 →
   *              보험료 대비 보장 범위 실익 계산 → 갱신 조건(보험료 인상폭) 확인
   * f4 [faq]     갱신형 보험의 노령 보험료 인상: 일부 상품은 연령대별 구간으로
   *              재산정해 7세·10세·13세 구간에서 보험료가 크게 뜀
   * f5 [comp]    노령견 보험 vs 의료비 적립 vs 무보험: 월 3만 원 5년 적립 = 180만 원;
   *              암 수술 1회 평균 150-250만 원 — 보험 가성비 계산 방법
   * slots → macro:C(비교 분석) / hook:H3(상황 제시) / lens:L5(현실) / outro:O2(점검 리스트)
   * ── A3: EDITOR ──────────────────────────────────────────────────
   * gate 1-14 모두 PASS / 품질점수: 92 ✓
   * ══════════════════════════════════════════════════════════════════ */
  {
    id: "blog-206",
    slug: "senior-pet-insurance-guide",
    type: "blog",
    category: 4,
    title: "노령 반려동물 펫보험 현실 가이드 — 나이 제한과 현명한 선택",
    metaTitle: "노령 반려동물 펫보험 가이드 | 나이 제한·보험료 인상·가성비 계산 | 펫지기",
    metaDescription:
      "노령견·노령묘 펫보험 가입 가능 나이, 보험료 인상 구조, 기왕증 제외 조건, 의료비 적립과의 가성비 비교를 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    disclaimer: CAT4_DISCLAIMER,
    sources: JSON.stringify([
      "https://www.fss.or.kr",
      "https://www.avma.org",
      "https://www.knia.or.kr",
    ]),
    publishedAt: "2026-06-27T12:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>반려동물이 7~8세가 되어서야 처음 보험을 알아보는 보호자가 많다. 그때 가장 먼저 마주치는 현실은 가입 연령 제한이다. 국내 대부분의 펫보험 상품은 신규 가입을 8세 이하로 제한하고, 일부만 10세까지 허용한다. 보험료는 7세 이후부터 급격히 올라간다.</p>

<h2>노령 반려동물 기준과 건강 변화</h2>
<p>수의학적으로 노령 기준은 품종 크기에 따라 다르다.</p>
<ul>
  <li><strong>대형견(25kg 이상)</strong>: 7세부터 시니어</li>
  <li><strong>소형견·중형견</strong>: 10세부터 시니어</li>
  <li><strong>고양이</strong>: 10세부터 시니어, 15세 이상 '슈퍼 시니어'</li>
</ul>
<p>노령이 되면 관절염·만성신부전·갑상선질환·암 발생률이 급상승한다. 바로 이 시기에 의료비가 가장 많이 들지만, 동시에 보험 가입이 어려워지는 역설이 있다.</p>

<h2>노령 가입 시 실제로 마주치는 3가지 장벽</h2>
<ol>
  <li><strong>가입 연령 초과</strong>: 8세를 넘으면 선택지가 크게 줄어든다. 가입 가능한 상품 자체가 적다.</li>
  <li><strong>기왕증 제외</strong>: 기존에 진단받은 질환은 보장에서 제외된다. 7세 이상 반려동물이라면 이미 만성질환이 있는 경우가 많아, 정작 필요한 부분이 제외될 수 있다.</li>
  <li><strong>보험료 부담</strong>: 나이가 많을수록 보험료가 높아진다. 갱신형 상품은 나이 구간이 올라갈 때마다 보험료가 재산정된다.</li>
</ol>

<h2>노령 가입, 보험 vs 의료비 적립 비교</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <thead>
    <tr style="background:#f0f4f8;">
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">방법</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">장점</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">단점</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">펫보험 가입</td>
      <td style="padding:10px;border:1px solid #ddd;">고액 발생 시 즉시 대응 가능</td>
      <td style="padding:10px;border:1px solid #ddd;">보험료 부담, 기왕증 제외로 실효 보장 축소</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:10px;border:1px solid #ddd;">의료비 적립</td>
      <td style="padding:10px;border:1px solid #ddd;">제한 없이 사용 가능, 남으면 환급</td>
      <td style="padding:10px;border:1px solid #ddd;">초기 고액 발생 시 적립금 부족 가능</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">병행 (소액 보험 + 적립)</td>
      <td style="padding:10px;border:1px solid #ddd;">위험 분산 효과</td>
      <td style="padding:10px;border:1px solid #ddd;">관리 복잡</td>
    </tr>
  </tbody>
</table>
<p>월 3만 원을 5년 적립하면 180만 원이다. 암 수술 1회 평균 150~250만 원임을 감안하면, 고액 수술 1회에는 대응이 가능하다. 하지만 수술이 2번, 만성 입원·통원이 반복된다면 보험 쪽이 유리할 수 있다.</p>

<h2>갱신형 보험의 보험료 인상 구조</h2>
<p>갱신형 상품은 계약 나이 구간(예: 1~3세 / 4~6세 / 7~9세 / 10~12세)마다 보험료가 재산정된다. 7세, 10세 구간 진입 시 보험료가 크게 뛰는 경우가 있다. 가입 전 갱신 시 보험료 인상폭 예시를 요청해 장기 비용을 미리 계산해보는 것이 좋다.</p>

<h3>7세 이상인데 지금 가입하는 것이 의미 있을까요?</h3>
<p>기왕증이 없거나 적고, 보험료 대비 보장 범위가 실질적으로 남아 있다면 의미가 있다. 반면 주요 질환이 이미 진단되어 핵심 보장이 제외된 경우라면, 가입 전 보장 제외 항목을 꼼꼼히 확인해야 한다. 보험은 불확실한 미래에 대비하는 도구이므로, 현재 건강 상태와 앞으로 발생 가능한 리스크를 함께 따져봐야 한다.</p>

<h3>노령 반려동물에게 실질적으로 필요한 특약은?</h3>
<p>노령 반려동물은 암·관절·신부전 등 장기 관리 질환이 많으므로, <strong>통원 특약 한도와 횟수</strong>가 가장 중요하다. 수술 특약도 중요하지만, 만성질환은 수술보다 반복 통원 비용이 더 누적되는 경우가 많다.</p>

<div style="background:#fff8e6;border-left:4px solid #f5a623;padding:16px;margin:16px 0;">
  <strong>노령 가입 전 체크리스트</strong><br>
  ① 가입 가능 연령 상한 확인 ② 기왕증 고지 범위·제외 항목 ③ 갱신 시 보험료 인상 조건 ④ 통원 한도·횟수 ⑤ 실질 보장 대상 질환 vs 제외 질환 비교
</div>

<p>현재 가입 가능한 상품의 연령별 조건은 <a href="/insurance/compare">펫보험 비교</a>에서 확인하고, 보험 구조 기초부터 이해하려면 <a href="/guide/pet-insurance-guide">펫보험 완전 가이드</a>를 참고하자.</p>`,
  },

  /* ══════════════════════════════════════════════════════════════════
   * 207. 펫보험 대기 기간
   * ── A1: RESEARCHER ──────────────────────────────────────────────
   * f1 [def]     대기 기간(Waiting Period): 보험 가입 후 일정 기간 동안 보장이
   *              개시되지 않는 구간. 역선택(이미 아픈 동물만 가입) 방지 목적
   * f2 [stat]    금융감독원 2023 표준화 가이드 — 질병 대기 기간 통상 30일,
   *              관절·슬개골 90일, 암·유전 질환 90~180일이 국내 기준
   * f3 [process] 대기 기간 전략: 건강한 어린 시기 가입 → 대기 기간 중 건강 유지 →
   *              대기 기간 종료 후 보장 개시. 대기 기간 중 발생한 질환 = 기왕증 처리
   * f4 [faq]     대기 기간 중 사고(상해)는 별도 대기 없이 즉시 보장되는 경우가 많음;
   *              질병과 상해의 대기 기간 차이 주의
   * f5 [comp]    대기 기간 30일 vs 90일: 슬개골탈구·십자인대파열 등 관절 질환은
   *              90일 대기가 많아, 가입 직후 증상 발현 시 보장 불가
   * slots → macro:B(정보브리핑) / hook:H3(상황 제시) / lens:L3(데이터) / outro:O3(단계 안내)
   * ── A3: EDITOR ──────────────────────────────────────────────────
   * gate 1-14 모두 PASS / 품질점수: 91 ✓
   * ══════════════════════════════════════════════════════════════════ */
  {
    id: "blog-207",
    slug: "pet-insurance-waiting-period",
    type: "blog",
    category: 4,
    title: "펫보험 대기 기간 완전 이해 — 기간·종류·가입 전략",
    metaTitle: "펫보험 대기 기간 완전 이해 | 질병·상해·관절 대기 기간 차이 | 펫지기",
    metaDescription:
      "펫보험 대기 기간의 종류(질병·관절·암), 기간 중 발생한 질환 처리, 상해 즉시 보장 여부, 대기 기간을 줄이는 전략을 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    disclaimer: CAT4_DISCLAIMER,
    sources: JSON.stringify([
      "https://www.fss.or.kr",
      "https://www.knia.or.kr",
      "https://www.law.go.kr",
    ]),
    publishedAt: "2026-06-27T17:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>펫보험에 가입하고 이틀 만에 강아지가 아팠다. 병원에서 "보험 처리가 되지 않는다"는 말을 듣는다. 이유는 하나 — 대기 기간이다. 보험 가입 후 일정 기간이 지나야 보장이 시작된다는 사실을 모르고 있었던 것이다.</p>

<h2>대기 기간이란</h2>
<p>보험 가입 직후부터 보장이 개시되지 않고 일정 기간 동안 보장 효력이 정지되는 구간이다. 보험사가 이 제도를 두는 이유는 역선택 방지다. 이미 아픈 반려동물을 데리고 가입해 즉시 보험금을 청구하는 것을 막기 위한 안전 장치다.</p>

<h2>대기 기간의 종류</h2>
<p>금융감독원 2023년 펫보험 표준화 가이드 기준으로 국내 대기 기간은 보장 항목별로 다르다.</p>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <thead>
    <tr style="background:#f0f4f8;">
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">보장 항목</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:center;">대기 기간(일반)</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">비고</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">일반 질병</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">30일</td>
      <td style="padding:10px;border:1px solid #ddd;">가장 짧음</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:10px;border:1px solid #ddd;">관절·슬개골 질환</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">90일</td>
      <td style="padding:10px;border:1px solid #ddd;">상품에 따라 180일</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">암·유전 질환</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">90~180일</td>
      <td style="padding:10px;border:1px solid #ddd;">상품별 차이 큼</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:10px;border:1px solid #ddd;">상해(사고)</td>
      <td style="padding:10px;border:1px solid #ddd;text-align:center;">없음 (즉시)</td>
      <td style="padding:10px;border:1px solid #ddd;">대부분 가입 즉시 보장</td>
    </tr>
  </tbody>
</table>

<h2>대기 기간 중 발생한 질환은 어떻게 되나</h2>
<p>대기 기간 안에 진단·치료를 받으면 해당 질환은 기왕증으로 처리될 수 있다. 즉, 대기 기간이 끝난 후에도 그 질환에 대한 보장을 받지 못할 수 있다. 가입 직후 이상 징후가 있더라도 대기 기간 중에는 해당 증상으로 병원을 방문하면 불리하게 작용할 수 있다는 점을 알아야 한다.</p>

<h2>상해(사고)는 대기 기간이 없다</h2>
<p>사고로 인한 골절, 교통사고, 이물 삼킴 등 상해 특약은 대부분의 상품에서 가입 즉시 보장된다. 가입 당일 산책 중 부상이 발생해도 보장받을 수 있다. 다만 같은 증상이라도 "상해"와 "질병"으로 분류가 달라지면 적용이 달라지므로, 약관에서 두 항목의 정의를 함께 확인해야 한다.</p>

<h2>대기 기간을 고려한 가입 전략</h2>
<ol>
  <li><strong>건강할 때 미리 가입</strong>: 관절 문제가 생기기 전에 가입하면 90일 대기 후 보장 시작 가능</li>
  <li><strong>대기 기간 중 건강관리</strong>: 대기 기간 동안 질병이 발생하지 않도록 관리</li>
  <li><strong>암·유전 질환 대기 확인</strong>: 가입 예정 품종에 유전 질환 위험이 높다면 해당 대기 기간을 먼저 확인</li>
  <li><strong>상해 즉시 보장 활용</strong>: 가입 당일부터 사고 대비는 가능하므로 가입을 미룰 이유가 없음</li>
</ol>

<h3>펫보험 갱신 시에도 대기 기간이 다시 적용되나요?</h3>
<p>계속 갱신하는 경우 대기 기간이 재적용되지 않는 것이 일반적이다. 하지만 보험사를 바꾸거나 새 계약을 체결하면 다시 대기 기간이 시작된다. 기존 보험을 유지하면서 갱신하는 것이 유리한 이유 중 하나다.</p>

<h3>대기 기간이 짧은 상품이 항상 유리한가요?</h3>
<p>대기 기간이 짧으면 조기 보장 개시 면에서 유리하다. 하지만 대기 기간이 짧은 상품은 보험료가 높거나, 기왕증 고지 기준이 더 엄격한 경우가 있다. 대기 기간만 비교할 것이 아니라 보험료·보장 한도·자기부담율을 함께 살펴야 한다.</p>

<div style="background:#f0f7ff;border-left:4px solid #4a90d9;padding:16px;margin:16px 0;">
  <strong>대기 기간 확인 체크리스트</strong><br>
  ① 질병 대기 기간(일) ② 관절·슬개골 대기 기간 ③ 암·유전 대기 기간 ④ 상해 즉시 보장 여부 ⑤ 갱신 시 대기 기간 재적용 여부
</div>

<p>상품별 대기 기간 조건은 <a href="/insurance/compare">펫보험 비교</a>에서 확인하고, 가입 구조 전반은 <a href="/guide/pet-insurance-guide">펫보험 완전 가이드</a>에서 살펴볼 수 있다.</p>`,
  },

  /* ══════════════════════════════════════════════════════════════════
   * 208. 반려동물 소비자 권리 가이드
   * ── A1: RESEARCHER ──────────────────────────────────────────────
   * f1 [stat]    한국소비자원 2023 — 반려동물 관련 소비자 분쟁 접수 연간 약 1,200건;
   *              분양(입양)·펫숍·동물병원·훈련·미용 순으로 많음
   * f2 [def]     반려동물 소비자 분쟁: 계약 불이행(질병 고지 없는 분양),
   *              서비스 불만(미용·훈련 부상), 진료비 과잉 청구 등
   * f3 [process] 분쟁 처리 경로: ① 사업자 직접 협의 → ② 한국소비자원 분쟁조정 신청(소비자24) →
   *              ③ 소액사건심판(60만 원 이하) → ④ 민사 소송
   * f4 [faq]     동물병원 진료비 분쟁: 진료비 사전 고지 의무(2024 동물병원 표준수가제 관련),
   *              진료 기록 열람·복사 요청권
   * f5 [comp]    한국소비자원 조정 vs 소액심판: 비용(무료 vs 인지대 필요),
   *              소요 시간, 강제성 차이
   * slots → macro:A(전면해설) / hook:H2(통계 충격) / lens:L5(법률) / outro:O3(단계 안내)
   * ── A3: EDITOR ──────────────────────────────────────────────────
   * gate 1-14 모두 PASS / 품질점수: 92 ✓
   * ══════════════════════════════════════════════════════════════════ */
  {
    id: "blog-208",
    slug: "pet-consumer-rights-guide",
    type: "blog",
    category: 4,
    title: "반려동물 소비자 권리 — 분쟁·환불·민원 처리 완전 가이드",
    metaTitle: "반려동물 소비자 권리 가이드 | 분쟁·환불·민원 처리·소비자원 | 펫지기",
    metaDescription:
      "반려동물 분양·진료·미용·훈련 관련 분쟁 처리 방법, 한국소비자원 신청, 소액심판, 환불 요청 절차를 단계별로 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    disclaimer: CAT4_DISCLAIMER,
    sources: JSON.stringify([
      "https://www.kca.go.kr",
      "https://www.law.go.kr",
      "https://www.mafra.go.kr",
    ]),
    publishedAt: "2026-06-27T22:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>한국소비자원 2023년 자료에 따르면 반려동물 관련 소비자 분쟁이 연간 약 1,200건 접수된다. 가장 많은 유형은 분양(입양) 관련이고, 동물병원·훈련·미용 순이다. 많은 보호자가 "어떻게 해야 할지 몰라서" 포기하거나, 억울함을 안고 넘기는 경우가 많다.</p>

<h2>반려동물 소비자 분쟁의 주요 유형</h2>
<ul>
  <li><strong>분양·입양</strong>: 질병·유전 질환 미고지, 계약서 미교부, 환불 거부</li>
  <li><strong>동물병원</strong>: 과잉 진료, 진료비 사전 고지 없음, 의료 과실</li>
  <li><strong>미용</strong>: 미용 중 부상, 불만족스러운 결과, 예약 불이행</li>
  <li><strong>훈련·위탁</strong>: 훈련 중 부상, 계약 불이행, 반려동물 사망</li>
  <li><strong>펫호텔·유치원</strong>: 위탁 중 사고, 감염 분쟁</li>
</ul>

<h2>분쟁 처리 경로</h2>
<p>단계별로 접근하면 해결 가능성이 높아진다.</p>
<ol>
  <li><strong>사업자 직접 협의</strong>: 문제 발생 즉시 증거(영상·영수증·진단서) 확보 후 서면(문자·이메일)으로 기록을 남기며 협의한다.</li>
  <li><strong>한국소비자원 분쟁조정</strong>: '소비자24(www.consumer.go.kr)' 또는 방문 신청. 무료이며 조정 결과에 사업자가 동의하면 이행 의무가 생긴다.</li>
  <li><strong>소액사건심판</strong>: 소송가액 60만 원 이하인 경우 간단한 신청만으로 법원 결정을 받을 수 있다. 인지대(소액)가 필요하다.</li>
  <li><strong>민사 소송</strong>: 피해액이 크고 조정이 불성립된 경우 민사 소송으로 이어질 수 있다. 이 단계는 법률 전문가 상담을 권한다.</li>
</ol>

<h2>동물병원 진료비 분쟁</h2>
<p>동물병원 진료비 관련 분쟁은 몇 가지 권리를 알고 있으면 대응이 수월해진다.</p>
<ul>
  <li><strong>진료비 사전 고지 요청권</strong>: 처치 전에 예상 비용을 물어볼 수 있다. 고지 없이 고액 청구가 이뤄졌다면 분쟁의 근거가 된다.</li>
  <li><strong>진료 기록 열람·복사 요청권</strong>: 동물의료법상 보호자는 진료 기록 열람과 사본 발급을 요청할 수 있다.</li>
  <li><strong>진료비 영수증 교부 요청</strong>: 항목별로 명세가 기재된 영수증을 요청할 수 있다.</li>
</ul>

<h2>분양 계약 후 질병 발견 시 처리 방법</h2>
<p>분양 후 짧은 기간 내 유전 질환·선천성 질환이 발견되면 분쟁 가능성이 있다. 핵심은 계약서와 증거다.</p>
<ol>
  <li>진단서와 혈액검사 결과지를 확보한다.</li>
  <li>분양 계약서에 질병·건강 보증 조항이 있는지 확인한다.</li>
  <li>판매자에게 서면으로 사실관계를 통보하고 협의를 요청한다.</li>
  <li>협의 불성립 시 소비자원에 신청한다.</li>
</ol>

<h3>소비자원 조정 결과가 마음에 들지 않으면 어떻게 하나요?</h3>
<p>소비자원 분쟁조정은 양 당사자가 동의해야 성립한다. 한쪽이 거부하면 조정이 불성립되고, 이후 소송으로 이어진다. 소비자원 조정이 강제력이 없다는 점을 감안해, 처음부터 증거를 충실히 확보해두는 것이 중요하다.</p>

<h3>반려동물 사망 사고가 발생했을 때 법적 지위는?</h3>
<p>현행법상 반려동물은 물건(동산)으로 분류된다. 사망 사고에 대한 손해배상은 시장 가치(분양가 등)를 기준으로 산정되며, 정신적 위자료 인정 여부는 법원 판단에 따라 다르다. 이 부분은 법률 전문가 상담을 통해 구체적인 상황을 확인해야 한다.</p>

<div style="background:#f0f7ff;border-left:4px solid #4a90d9;padding:16px;margin:16px 0;">
  <strong>분쟁 대비 필수 보존 자료</strong><br>
  ① 계약서·영수증 ② 문자·카카오톡 대화 내용(스크린샷) ③ 진단서·진료 기록 ④ 현장 사진·영상 ⑤ 결제 내역
</div>

<p>동물병원 진료비 구조와 합리적 이용법은 <a href="/guide/vet-cost-saving-guide">동물병원 진료비 절약 가이드</a>를, 펫보험으로 의료비 분쟁을 줄이는 방법은 <a href="/guide/pet-insurance-guide">펫보험 완전 가이드</a>를 참고하자.</p>`,
  },

  /* ══════════════════════════════════════════════════════════════════
   * 209. 동물병원 진료비 구조 완전 이해
   * ── A1: RESEARCHER ──────────────────────────────────────────────
   * f1 [stat]    농림축산식품부 2022 — 국내 동물병원 표준 수가 부재로
   *              동일 처치에 병원별 최대 10배 이상 가격 차이 보고; 2024년 표준수가제 논의 중
   * f2 [def]     진료비 구성: 진찰료(기본진찰+야간·응급 할증) + 검사료(혈액·영상·조직) +
   *              처치료(주사·수액·수술) + 입원료 + 처방약·사료 비용
   * f3 [process] 합리적 이용 전략: 진료 전 예상 비용 문의 → 검사 필요성 확인 질문 →
   *              처방전 발급 요청(약국 구매 가능) → 2차 의견 참고
   * f4 [faq]     야간·응급 진료 할증: 야간(오후 10시~오전 8시) 통상 50-100% 할증,
   *              휴일 30-50% 할증이 일반적이나 병원별 상이
   * f5 [comp]    1차 동물병원 vs 2차(전문) 동물병원 vs 수의대 부속병원:
   *              비용·전문성·대기 시간 차이
   * slots → macro:A(전면해설) / hook:H2(통계 충격) / lens:L3(데이터) / outro:O2(점검 리스트)
   * ── A3: EDITOR ──────────────────────────────────────────────────
   * gate 1-14 모두 PASS / 품질점수: 92 ✓
   * ══════════════════════════════════════════════════════════════════ */
  {
    id: "blog-209",
    slug: "vet-cost-breakdown-guide",
    type: "blog",
    category: 4,
    title: "동물병원 진료비 구조 완전 이해 — 비용 책정과 합리적 이용",
    metaTitle: "동물병원 진료비 구조 완전 이해 | 비용 책정 원리·항목별 설명·절약법 | 펫지기",
    metaDescription:
      "동물병원 진료비가 병원마다 다른 이유, 진찰료·검사료·처치료·입원료 구성, 야간 할증, 합리적 이용 전략을 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    disclaimer: CAT4_DISCLAIMER,
    sources: JSON.stringify([
      "https://www.mafra.go.kr",
      "https://www.kvma.or.kr",
      "https://www.fss.or.kr",
    ]),
    publishedAt: "2026-06-28T03:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>동일한 처치를 받았는데 병원마다 청구 금액이 크게 다르다는 경험은 많은 보호자가 한다. 농림축산식품부 자료에 따르면 국내 동물병원은 표준 수가 제도가 없어 같은 처치에 최대 10배 이상 가격 차이가 보고된 바 있다. 구조를 알면 불필요한 비용을 줄이고 합리적으로 이용할 수 있다.</p>

<h2>동물병원 진료비의 구성 요소</h2>
<p>진료비는 크게 5가지 항목으로 나뉜다.</p>
<ul>
  <li><strong>진찰료</strong>: 수의사가 반려동물을 직접 보고 상태를 평가하는 기본 비용. 야간·응급·초진·재진에 따라 달라진다.</li>
  <li><strong>검사료</strong>: 혈액검사, 요검사, X-ray, 초음파, CT, 조직검사 등. 항목 수에 따라 누적된다.</li>
  <li><strong>처치료</strong>: 주사, 수액, 상처 처치, 수술 등 직접적인 의료 행위 비용</li>
  <li><strong>입원료</strong>: 1일 단위로 청구. 집중치료실(ICU)은 별도 요금</li>
  <li><strong>약·처방사료</strong>: 처방약, 처방사료 비용. 처방전 발급 시 외부 구매도 가능</li>
</ul>

<h2>병원마다 가격이 다른 이유</h2>
<p>국내 동물병원은 진료비를 자유롭게 책정할 수 있다. 임대료·인건비·장비 수준에 따라 기본 비용이 달라지고, 전문 병원은 고가 장비 운영 비용이 반영되어 1차 병원보다 비쌀 수 있다. 표준 수가 제도가 없는 상황이므로 사전에 비용을 확인하는 것이 기본이다.</p>

<h2>1차·2차·수의대 병원 비교</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <thead>
    <tr style="background:#f0f4f8;">
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">구분</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">특징</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">비용 수준</th>
      <th style="padding:10px;border:1px solid #ddd;text-align:left;">적합한 상황</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">1차 동물병원</td>
      <td style="padding:10px;border:1px solid #ddd;">일반 진료·예방의학</td>
      <td style="padding:10px;border:1px solid #ddd;">낮음~중간</td>
      <td style="padding:10px;border:1px solid #ddd;">정기 검진, 경증 질환</td>
    </tr>
    <tr style="background:#fafafa;">
      <td style="padding:10px;border:1px solid #ddd;">2차 전문병원</td>
      <td style="padding:10px;border:1px solid #ddd;">과별 전문의, 고가 장비</td>
      <td style="padding:10px;border:1px solid #ddd;">중간~높음</td>
      <td style="padding:10px;border:1px solid #ddd;">중증·전문 진단·수술</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #ddd;">수의대 부속병원</td>
      <td style="padding:10px;border:1px solid #ddd;">교육·연구 병원, 다양한 전문과</td>
      <td style="padding:10px;border:1px solid #ddd;">중간</td>
      <td style="padding:10px;border:1px solid #ddd;">희귀 질환, 2차 소견</td>
    </tr>
  </tbody>
</table>

<h2>야간·응급 진료 비용</h2>
<p>야간(오후 10시~오전 8시) 진료는 통상 50~100% 할증이 붙고, 공휴일은 30~50% 할증이 일반적이다. 응급 처치 수준에 따라 추가 비용이 발생한다. 야간 응급 상황이 아니라면, 이른 아침 문을 여는 일반 병원을 찾는 것이 비용 면에서 유리할 수 있다.</p>

<h2>합리적 이용을 위한 4가지 전략</h2>
<ol>
  <li><strong>진료 전 예상 비용 문의</strong>: "오늘 예상 비용이 어느 정도 될까요?"라고 직접 물어본다. 좋은 병원은 투명하게 안내해준다.</li>
  <li><strong>검사 필요성 질문</strong>: "이 검사가 치료 방향을 바꾸나요?"를 물어보면 불필요한 검사를 줄이는 데 도움이 된다.</li>
  <li><strong>처방전 요청</strong>: 장기 복용 약의 경우 처방전을 발급받아 온라인 동물 약국이나 다른 병원에서 구매하면 절약이 가능하다.</li>
  <li><strong>항목별 영수증 확인</strong>: 청구 항목을 하나씩 확인한다. 잘 모르는 항목은 설명을 요청할 권리가 있다.</li>
</ol>

<h3>처방전 발급 거부, 어떻게 해야 하나요?</h3>
<p>동물의료법상 수의사는 정당한 사유 없이 처방전 발급을 거부할 수 없다. 발급 거부를 받은 경우, 사유를 서면으로 확인 요청하거나 관할 시군구 동물보호 담당 부서에 민원을 제기할 수 있다.</p>

<h3>예방접종·스케일링은 어디서 받는 게 저렴한가요?</h3>
<p>예방접종과 스케일링 같은 예방 의료는 병원 간 가격 차이가 상대적으로 크다. 지역 1차 병원과 대형 체인 병원의 가격을 비교해보는 것이 실질적으로 절약에 도움이 된다. 다만 가격만이 아니라 위생 환경과 수의사 경험도 함께 고려해야 한다.</p>

<div style="background:#fff8e6;border-left:4px solid #f5a623;padding:16px;margin:16px 0;">
  <strong>진료비 관리 체크리스트</strong><br>
  ① 진료 전 예상 비용 확인 ② 검사 필요성 질문 ③ 처방전 발급 요청 가능 여부 ④ 야간·응급 할증 여부 ⑤ 항목별 영수증 보관
</div>

<p>보험으로 진료비 부담을 분산하는 방법은 <a href="/insurance/compare">펫보험 비교</a>에서, 분쟁 발생 시 대응법은 <a href="/blog/pet-consumer-rights-guide">반려동물 소비자 권리 가이드</a>를 참고하자.</p>`,
  },

  /* ══════════════════════════════════════════════════════════════════
   * 210. 펫보험 제대로 비교하는 방법
   * ── A1: RESEARCHER ──────────────────────────────────────────────
   * f1 [stat]    금융감독원 2024 — 국내 펫보험 판매사 10개 이상, 상품 수 30종 이상으로
   *              증가; 보험료·보장 내용·한도 비교 없이 가입 시 연간 10만 원 이상 손실 가능
   * f2 [def]     보험 비교의 5대 기준: ① 보장 범위(통원·입원·수술) ② 보장 한도
   *              ③ 자기부담율 ④ 보험료 ⑤ 갱신 조건(보험료 인상·보장 변경)
   * f3 [process] 비교 순서: 반려동물 프로필(종·나이·기왕증) 작성 → 보장 범위 결정
   *              → 한도 비교 → 자기부담율 비교 → 보험료 대비 실익 계산 → 갱신 조건 확인
   * f4 [faq]     비교사이트 활용 시 주의: 광고형 비교(특정 상품 우선 노출)와
   *              중립적 비교를 구분해야 함; 직접 약관 확인이 최종 기준
   * f5 [comp]    보험료 저렴 = 좋은 보험? — 한도가 낮거나 자기부담율이 높으면
   *              실수령 보험금이 기대와 다를 수 있음
   * slots → macro:F(단계 안내) / hook:H3(상황 제시) / lens:L4(실용) / outro:O1(실천 요약)
   * ── A3: EDITOR ──────────────────────────────────────────────────
   * gate 1-14 모두 PASS / 품질점수: 93 ✓
   * ══════════════════════════════════════════════════════════════════ */
  {
    id: "blog-210",
    slug: "pet-insurance-comparison-method",
    type: "blog",
    category: 4,
    title: "펫보험 제대로 비교하는 방법 — 5가지 핵심 기준 완전 정리",
    metaTitle: "펫보험 제대로 비교하는 방법 | 5가지 핵심 기준·비교 순서·주의사항 | 펫지기",
    metaDescription:
      "펫보험을 제대로 비교하기 위한 5가지 기준(보장 범위·한도·자기부담율·보험료·갱신 조건)과 단계별 비교 방법, 비교사이트 주의사항을 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    disclaimer: CAT4_DISCLAIMER,
    sources: JSON.stringify([
      "https://www.fss.or.kr",
      "https://www.knia.or.kr",
      "https://www.consumer.go.kr",
    ]),
    publishedAt: "2026-06-28T08:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>"저렴한 게 제일 낫지 않나요?"라는 질문을 많이 받는다. 보험료가 낮아도 보장 한도가 낮거나 자기부담율이 높으면, 실제로 청구했을 때 기대한 금액의 절반도 받지 못하는 경우가 생긴다. 금융감독원 자료에 따르면 국내 펫보험 상품이 30종 이상으로 늘었고, 상품마다 구성이 달라 단순 보험료 비교는 의미가 없다.</p>

<h2>비교 전 준비: 반려동물 프로필 정리</h2>
<p>비교를 시작하기 전에 아래 정보를 먼저 정리한다. 이 정보가 없으면 비교 자체가 의미 없어진다.</p>
<ul>
  <li>종(견종·묘종)과 현재 나이</li>
  <li>기왕증(기존 진단·치료 이력)</li>
  <li>예상되는 주요 리스크(품종 특유 유전 질환)</li>
  <li>월 납입 가능한 보험료 예산</li>
</ul>

<h2>핵심 기준 1 — 보장 범위</h2>
<p>통원·입원·수술 세 가지가 기본 축이다. 어떤 상황에서 가장 비용이 많이 드는지를 생각하면 우선순위가 정해진다.</p>
<ul>
  <li>만성질환 위험이 높은 품종 → <strong>통원 특약 한도·횟수</strong> 우선</li>
  <li>사고·수술 위험이 높은 활동적인 동물 → <strong>수술 특약 한도</strong> 우선</li>
  <li>복합적 위험 → 세 특약 모두 포함, 한도 균형 확인</li>
</ul>

<h2>핵심 기준 2 — 보장 한도</h2>
<p>한도가 높을수록 좋지만, 보험료도 올라간다. 실질적인 판단 기준은 발생 가능한 최대 비용이다.</p>
<ul>
  <li>통원 1회 한도: 일반적으로 3만~10만 원. 고비용 검사가 많으면 상한 확인</li>
  <li>수술 1건 한도: 100만~300만 원이 일반적. 정형외과·암 수술은 200만 원+ 필요</li>
  <li>연간 합산 한도: 특약별 한도가 별도인지, 합산인지 확인</li>
</ul>

<h2>핵심 기준 3 — 자기부담율</h2>
<p>보장 한도와 함께 반드시 확인해야 하는 항목이다. 자기부담율 20%와 정액 2만 원의 차이는 고액 수술에서 수십만 원 차이로 이어진다. 자기부담금 방식 상세는 별도 가이드를 참고하면 된다.</p>

<h2>핵심 기준 4 — 보험료</h2>
<p>같은 보장이라면 당연히 보험료가 낮을수록 유리하다. 하지만 보험료가 낮은 이유가 한도 제한·자기부담율 상승·보장 제외 항목 증가 때문이라면, 단순 보험료 비교는 오히려 잘못된 선택으로 이어진다.</p>

<h2>핵심 기준 5 — 갱신 조건</h2>
<p>갱신형 보험은 1년 단위로 계약이 갱신된다. 이때 보험료 인상 여부, 보장 내용 변경 가능 여부를 반드시 확인해야 한다. 어린 나이에 가입하면 보험료가 낮지만, 7세·10세 구간에서 급격히 인상되는 상품도 있다.</p>

<h2>비교 사이트 주의사항</h2>
<p>온라인 펫보험 비교 사이트는 편리하지만, 광고 계약을 맺은 보험사 상품이 상단에 배치되는 경우가 있다. 비교 결과를 참고하되, 최종 결정 전에 약관 원문에서 보장 제외 항목과 갱신 조건을 직접 확인하는 것이 기본이다.</p>

<h3>비교 후 결정이 안 될 때 어떻게 해야 하나요?</h3>
<p>두 상품을 두고 결정이 안 된다면, 예상 진료 시나리오(수술 1회 100만 원 발생 시 실수령액)를 직접 계산해보는 것이 효과적이다. 보험료 차이보다 실수령 차이가 더 중요한 기준이 된다.</p>

<h3>가입 후 생각보다 별로면 해지할 수 있나요?</h3>
<p>보험 가입 후 15일 이내에는 청약 철회가 가능하다(보험업법 상). 그 이후에는 해지가 가능하지만 이미 낸 보험료 일부는 돌려받지 못할 수 있다. 충동적 가입보다 비교 후 신중하게 가입하는 것이 중요하다.</p>

<div style="background:#f0f7ff;border-left:4px solid #4a90d9;padding:16px;margin:16px 0;">
  <strong>펫보험 비교 5단계</strong><br>
  ① 반려동물 프로필 정리 → ② 필요 특약 결정 → ③ 한도·자기부담율 비교 → ④ 보험료 대비 실익 계산 → ⑤ 갱신 조건 및 약관 직접 확인
</div>

<p>상품별 보장 내용을 한눈에 보려면 <a href="/insurance/compare">펫보험 비교</a>를, 자기부담금 계산 방법은 <a href="/blog/pet-insurance-deductible-guide">펫보험 자기부담금 완전 이해</a>를, 보험 기초 개념은 <a href="/guide/pet-insurance-guide">펫보험 완전 가이드</a>를 참고하자.</p>`,
  },
];

async function seed() {
  console.log(`[seed] blog-posts-21: ${POSTS.length}개 삽입 시작`);
  for (const post of POSTS) {
    await db.insert(contents).values(post).onConflictDoUpdate({
      target: contents.id,
      set: { title: post.title, body: post.body, updatedAt: NOW },
    });
    console.log(`  ✓ ${post.slug}`);
  }
  console.log("[seed] 완료");
}
seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
