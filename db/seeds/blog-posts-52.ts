import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 52 — cat3×2 + cat2×1 + cat5×1 + cat1×1 = 5편 (IDs 381-385)
// Macros: A, F, E, F, B
// Angles: RA3, RA1, RA6, RA4, RA7

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 381 / Cat3 / Macro-A / Lens-L3 / Hook-H2 / Outro-O1 / Angle-RA3
  {
    id: "blog-381",
    slug: "dog-vomiting-when-to-worry",
    type: "blog",
    category: 3,
    title: "강아지 구토 — 괜찮은 구토와 위험한 구토를 구분하는 법",
    subtitle: "구토물 색깔·내용물별 원인, 급성 vs 만성 구토, 즉시 병원이 필요한 신호 7가지",
    metaTitle: "강아지 구토 원인 구분 — 괜찮은 경우 vs 병원 가야 할 때 | 펫지기",
    metaDescription: "강아지 구토의 원인을 구토물 색깔·내용물로 구분하는 방법. 급성·만성 구토 차이, 즉시 병원이 필요한 신호 7가지를 정리했습니다.",
    body: `<p>강아지가 구토하면 보호자는 당황한다. 그러나 강아지의 모든 구토가 위험한 것은 아니다. 풀을 먹고 토하는 것부터 치명적인 이물질 막힘까지 — 원인과 신호를 아는 것이 중요하다.</p>

<h2>구토물 색깔·내용물별 원인 추정</h2>
<table>
<thead><tr><th>구토물</th><th>가능한 원인</th></tr></thead>
<tbody>
<tr><td>소화된 음식 (갈색)</td><td>과식, 급식 속도, 식이 변화</td></tr>
<tr><td>소화 안 된 음식 (원형 그대로)</td><td>너무 빨리 먹음, 식도 문제</td></tr>
<tr><td>노란/녹색 거품 (담즙)</td><td>공복 위산, 담낭 문제</td></tr>
<tr><td>흰 거품</td><td>공복, 위산 과다, 헤어볼 전조</td></tr>
<tr><td>풀</td><td>위장 불편감 완화 본능 (대부분 정상)</td></tr>
<tr><td>검은색 (타르 같음)</td><td>상부 소화관 출혈 — 즉시 병원</td></tr>
<tr><td>선홍색 혈액</td><td>식도·위 출혈 — 즉시 병원</td></tr>
</tbody>
</table>

<h2>즉시 병원이 필요한 신호 7가지</h2>
<div class="callout-dog">
<strong>즉시 병원으로</strong><br>
① 구토물에 피가 있음<br>
② 토하려는 자세를 반복하지만 아무것도 안 나옴 (이물질 막힘·고창증)<br>
③ 24시간 내 3회 이상 반복<br>
④ 무기력·식욕 소실 동반<br>
⑤ 복부 팽창·딱딱함<br>
⑥ 새끼 강아지 (파보 의심)<br>
⑦ 독성 물질 섭취 직후
</div>

<h2>급성 vs 만성 구토</h2>
<ul>
<li><strong>급성</strong>: 갑자기 시작, 단기간. 식이 변화·과식·이물질 섭취가 주요 원인. 1~2일 금식·회복식으로 호전 가능.</li>
<li><strong>만성</strong>: 주 1~2회 이상, 수주~수개월 지속. 염증성 장질환(IBD)·췌장·신장·간 문제 등 기저 질환 의심. 혈액검사·초음파 필요.</li>
</ul>

<h2>집에서 할 수 있는 처치</h2>
<p>위험 신호가 없는 가벼운 구토(1~2회, 정상 활력)의 경우:</p>
<ul>
<li>4~6시간 금식 (물은 소량씩 유지)</li>
<li>회복식: 삶은 닭가슴살 + 흰쌀밥 (간 없이, 부드럽게)</li>
<li>24시간 후 일반 사료로 점진 전환</li>
</ul>

<h2>마지막으로</h2>
<p>강아지 구토는 빈도·내용물·동반 증상 세 가지로 판단한다. 하루 한 번 가벼운 구토는 기다려볼 수 있다. 그러나 피가 보이거나 계속 반복된다면 지체하지 않는 것이 원칙이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Merck Veterinary Manual — Vomiting in Dogs",
      "WSAVA Nutritional Support Guidelines",
      "대한수의사회 소화기 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-24T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 382 / Cat3 / Macro-F / Lens-L1 / Hook-H1 / Outro-O3 / Angle-RA1
  {
    id: "blog-382",
    slug: "cat-fiv-felv-testing-guide",
    type: "blog",
    category: 3,
    title: "고양이 에이즈(FIV)·백혈병(FeLV) — 검사·관리·함께 사는 법",
    subtitle: "FIV·FeLV 감염 경로·증상 차이, 양성 고양이 관리 방법, 다묘 가정 격리 기준",
    metaTitle: "고양이 FIV 에이즈·FeLV 백혈병 — 검사·관리 완전 가이드 | 펫지기",
    metaDescription: "고양이 FIV(에이즈)와 FeLV(백혈병)의 감염 경로, 증상 차이, 양성 고양이 관리 방법, 다묘 가정 격리 기준을 정리했습니다.",
    body: `<p>고양이 구조·입양 시 FIV와 FeLV 검사는 필수다. 양성 결과를 받더라도 적절한 관리로 오랫동안 건강하게 살 수 있다.</p>

<h2>FIV와 FeLV 차이</h2>
<table>
<thead><tr><th>항목</th><th>FIV (고양이 면역결핍)</th><th>FeLV (고양이 백혈병)</th></tr></thead>
<tbody>
<tr><td>감염 경로</td><td>깊은 교상(물림)</td><td>타액·분비물·수직감염</td></tr>
<tr><td>전파력</td><td>낮음 (싸움 없이는 거의 전파 안 됨)</td><td>높음 (같은 밥그릇·그루밍)</td></tr>
<tr><td>잠복기</td><td>수년 (비활성)</td><td>수주~수개월</td></tr>
<tr><td>주요 영향</td><td>면역 저하</td><td>빈혈·종양·면역 저하</td></tr>
<tr><td>예후</td><td>관리 시 수명 비슷</td><td>FIV보다 예후 나쁨</td></tr>
<tr><td>백신</td><td>있음 (효과 제한적)</td><td>있음 (효과적)</td></tr>
</tbody>
</table>

<h2>양성 고양이 관리 방법</h2>
<div class="callout-cat">
<strong>FIV·FeLV 양성 고양이 관리 원칙</strong><br>
• 실내 전용 사육 (외부 감염 차단, 다른 고양이 보호)<br>
• 연 2회 혈액검사·건강검진<br>
• 균형 잡힌 식이·스트레스 최소화<br>
• 감염·상처 조기 치료<br>
• 생식 사료 금지 (면역 저하 상태에서 세균 위험)<br>
• 중성화 (면역 부담 감소)
</div>

<h2>다묘 가정에서의 격리 기준</h2>
<ul>
<li><strong>FIV 양성</strong>: 싸우지 않는다면 다른 고양이와 같은 공간 가능. 단, 음식 그릇 분리 권장.</li>
<li><strong>FeLV 양성</strong>: 다른 고양이와 분리 필요. 타액 접촉으로 전파 가능하므로 같은 공간 생활은 위험.</li>
</ul>

<h2>검사 시기</h2>
<ul>
<li>입양 직후 (보호소·길거리 출신)</li>
<li>새로운 고양이 추가 전</li>
<li>외출하는 고양이 — 연 1회</li>
<li>병이 자주 걸리거나 면역 저하 의심 시</li>
</ul>

<h2>마지막으로</h2>
<p>FIV·FeLV 양성 진단이 사형선고는 아니다. 많은 양성 고양이가 정기 관리를 받으며 10년 이상 사는 경우도 있다. 관리의 핵심은 실내 사육·스트레스 최소화·정기 검진이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Hartmann, K. — Feline Immunodeficiency Virus Infection. Vet Immunol Immunopathol 2011",
      "ABCD (Advisory Board on Cat Diseases) — FeLV and FIV Guidelines",
      "한국고양이수의사회 FIV·FeLV 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-25T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 383 / Cat2 / Macro-E / Lens-L6 / Hook-H4 / Outro-O2 / Angle-RA6
  {
    id: "blog-383",
    slug: "dog-omega3-supplement-guide",
    type: "blog",
    category: 2,
    title: "강아지 오메가3 보충제 — 언제 줘야 하고 얼마나 줘야 하나",
    subtitle: "EPA·DHA 효능, 생선오일 vs 크릴오일 vs 조류 오일 비교, 용량 계산법, 과잉 위험",
    metaTitle: "강아지 오메가3 보충제 완전 가이드 — 용량·종류·효과 | 펫지기",
    metaDescription: "강아지 오메가3 보충제 효과와 선택 방법. EPA·DHA 역할, 생선오일·크릴오일·조류오일 비교, 체중별 용량 계산법, 과잉 복용 주의사항.",
    body: `<p>오메가3는 반려동물 보충제 중 가장 근거가 많은 제품 중 하나다. 그러나 종류와 용량이 중요하며, 무조건 많이 준다고 좋은 것이 아니다.</p>

<h2>EPA와 DHA — 핵심 성분</h2>
<ul>
<li><strong>EPA (Eicosapentaenoic Acid)</strong>: 항염증 효과, 관절·피부·심장 건강</li>
<li><strong>DHA (Docosahexaenoic Acid)</strong>: 뇌·눈 발달, 신경계 기능</li>
</ul>
<p>ALA(식물성 오메가3, 아마씨오일)는 강아지에서 EPA/DHA로 전환율이 매우 낮아 효과가 적다. 동물성 오메가3(생선오일 등)가 권장된다.</p>

<h2>오메가3 종류 비교</h2>
<table>
<thead><tr><th>종류</th><th>EPA/DHA</th><th>특징</th></tr></thead>
<tbody>
<tr><td>생선오일 (연어·고등어·정어리)</td><td>높음</td><td>가장 경제적, 중금속 정제 여부 확인</td></tr>
<tr><td>크릴오일</td><td>중간</td><td>흡수율 높다는 주장, 비용 높음</td></tr>
<tr><td>조류오일 (algae oil)</td><td>DHA 위주</td><td>비건·지속가능, EPA 함량 낮음</td></tr>
<tr><td>대구 간유 (cod liver oil)</td><td>낮음</td><td>비타민A·D 과잉 위험, 오메가3 단독 목적엔 부적합</td></tr>
</tbody>
</table>

<h2>용량 계산</h2>
<p>WSAVA 권장: 체중 1kg당 EPA+DHA 합계 50~100mg/일이 일반적 참고치다. 예: 10kg 강아지 → 500~1000mg/일.</p>
<p>항염증·관절 목적이라면 더 높은 용량(150~300mg/kg)을 사용하는 경우도 있다. 단, 수의사와 상담 후 결정.</p>

<h2>과잉 복용 주의사항</h2>
<ul>
<li>과도한 용량 → 혈액 응고 장애, 면역 기능 저하</li>
<li>칼로리 기여 (지방) → 비만 고위험군 주의</li>
<li>항응고제 복용 중인 강아지 → 수의사 상담 필수</li>
</ul>

<h2>효과를 기대할 수 있는 상황</h2>
<ul>
<li>피부·털 상태 개선 (가장 보호자 체감 높음)</li>
<li>관절염 통증 완화 (항염 효과)</li>
<li>아토피 증상 보조</li>
<li>인지기능 저하 예방 (노령견)</li>
</ul>

<h2>마지막으로</h2>
<p>오메가3는 건강한 강아지에게도 유익하며, 특히 피부·관절 문제가 있는 경우 보조 치료로 의미가 있다. 단, 사람용 고용량 제품을 임의로 주는 것보다 반려동물용 또는 수의사 처방 제품을 선택하는 것이 안전하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Lenox, C.E. & Bauer, J.E. — Potential Adverse Effects of Omega-3 Fatty Acids. JAAHA 2013",
      "WSAVA Global Nutrition Committee — Omega-3 Supplementation Guidelines",
      "한국수의영양학회 지방산 보충제 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-25T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 384 / Cat5 / Macro-F / Lens-L4 / Hook-H3 / Outro-O2 / Angle-RA4
  {
    id: "blog-384",
    slug: "pet-carrier-training-complete",
    type: "blog",
    category: 5,
    title: "이동장 훈련 완전 가이드 — 고양이·강아지가 이동장을 좋아하게 만들기",
    subtitle: "이동장 거부 원인, 단계별 긍정 연상 훈련, 응급 시에도 빠르게 넣는 방법",
    metaTitle: "이동장 훈련 완전 가이드 — 고양이·강아지 긍정 연상 만들기 | 펫지기",
    metaDescription: "이동장을 싫어하는 고양이·강아지를 훈련시키는 방법. 거부 원인, 단계별 긍정 연상 훈련, 응급 상황에서 빠르게 넣는 방법을 정리했습니다.",
    body: `<p>병원 갈 때마다 이동장 넣기가 전쟁이라면, 이동장 자체가 '나쁜 일 예고'로 학습된 것이다. 평소 이동장을 친숙한 공간으로 만들면 달라진다.</p>

<h2>왜 이동장을 싫어하는가</h2>
<ul>
<li>이동장이 병원·불쾌한 경험과 연결된 기억</li>
<li>평소에는 숨겨두다 사용 직전에만 꺼냄</li>
<li>이동장 안이 좁고 어두워 불안감</li>
<li>이동장 소재 특유의 냄새</li>
</ul>

<h2>단계별 긍정 연상 훈련</h2>
<h3>1단계: 이동장을 생활 공간에 상시 배치</h3>
<p>이동장 문을 열어두고 집 안 평소 자리에 놓는다. 강요하지 않는다. 고양이·강아지가 스스로 탐색하게 한다.</p>

<h3>2단계: 이동장 안을 매력적으로</h3>
<p>평소 쓰던 담요·체취가 배인 옷을 이동장 안에 넣는다. 이동장 안에 간식을 넣어두되 문은 열어둔다. 캣닙 (고양이) 또는 좋아하는 장난감도 활용 가능.</p>

<h3>3단계: 들어가면 간식 보상</h3>
<p>스스로 들어갈 때마다 조용히 간식을 준다. 문을 닫지 않은 상태에서 반복한다. '이동장 = 좋은 것'이라는 연상이 만들어지면 다음 단계로.</p>

<h3>4단계: 문 닫기 연습</h3>
<p>짧게 (3초) 문을 닫았다 열기. 간식 보상. 점점 시간 늘리기. 나중엔 들고 짧은 거리 이동.</p>

<div class="callout-cat">
<strong>고양이 이동장 선택 팁</strong><br>
• 하드케이스 (플라스틱) — 구조적 안전, 위에서 여는 타입이 병원에서 편리<br>
• 충분한 크기 — 몸을 돌릴 수 있을 것<br>
• 환기 구멍 충분<br>
• 수건으로 덮으면 더 안정적 (어두워서 안심)
</div>

<h2>응급 시 빠르게 넣는 방법</h2>
<p>훈련이 덜 된 상태에서 즉시 이동이 필요할 때:</p>
<ul>
<li>이동장 상부 뚜껑을 열고 위에서 넣기 (고양이)</li>
<li>수건으로 감싸서 안정화 후 넣기</li>
<li>이동장 안에 음식을 넣어 유인</li>
</ul>

<h2>마지막으로</h2>
<p>이동장 훈련은 응급 시를 위한 투자다. 이동장이 안전한 공간으로 인식된 고양이·강아지는 병원 방문도, 이사도, 재난 대피도 훨씬 수월해진다. 오늘 이동장을 꺼내 생활 공간에 놓아두는 것이 첫걸음이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "International Cat Care — Training Your Cat to Accept a Carrier",
      "American Humane Society — Crate and Carrier Training",
      "한국반려동물행동상담협회 이동장 훈련 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-26T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 385 / Cat1 / Macro-B / Lens-L7 / Hook-H5 / Outro-O1 / Angle-RA7
  {
    id: "blog-385",
    slug: "dog-neutering-timing-complete",
    type: "blog",
    category: 1,
    title: "강아지 중성화 시기 — 소형견과 대형견이 달라야 하는 이유",
    subtitle: "중성화 최적 시기 최신 연구, 조기 중성화 위험, 암수 차이, 중성화 후 관리",
    metaTitle: "강아지 중성화 시기 완전 가이드 — 품종·크기별 최적 시점 | 펫지기",
    metaDescription: "강아지 중성화 최적 시기는 품종과 크기에 따라 다릅니다. 소형견 vs 대형견 차이, 조기 중성화 위험, 암수 차이, 중성화 후 관리를 정리했습니다.",
    body: `<p>'6개월에 중성화하면 된다'는 것이 과거의 표준이었다. 최신 연구는 이것이 모든 견종에 적용되지 않으며, 특히 대형견에서 조기 중성화가 건강 문제를 높일 수 있음을 보여준다.</p>

<h2>중성화의 기본 장점</h2>
<ul>
<li>원하지 않는 임신 예방</li>
<li>수컷: 전립선 비대·고환 종양 위험 감소, 영역 표시·도주 충동 감소</li>
<li>암컷: 자궁축농증(자궁에 고름)·유선종양 예방 (조기 중성화 시 특히 효과적)</li>
</ul>

<h2>시기 권장 — 크기별 차이</h2>
<table>
<thead><tr><th>견종 크기</th><th>권장 중성화 시기</th></tr></thead>
<tbody>
<tr><td>소형견 (10kg 이하)</td><td>생후 6개월 전후 (기존 표준 유지)</td></tr>
<tr><td>중형견 (10~25kg)</td><td>생후 9~12개월 (성장 완료 근접)</td></tr>
<tr><td>대형견 (25~45kg)</td><td>생후 12~18개월</td></tr>
<tr><td>초대형견 (45kg+)</td><td>생후 18~24개월</td></tr>
</tbody>
</table>

<h2>조기 중성화 위험 (최신 연구)</h2>
<p>UC Davis 연구에 따르면 래브라도·골든 리트리버 등 대형견에서 1년 미만 조기 중성화 시 다음 위험이 높아졌다:</p>
<ul>
<li>관절 질환 (고관절 이형성증·CCL 파열) 위험 증가</li>
<li>일부 암 발생률 증가</li>
<li>비만 경향 (기초대사량 저하)</li>
</ul>

<h2>암컷 중성화 — 첫 발정 전이 중요</h2>
<p>암컷 유선종양 예방 효과는 첫 발정 전 중성화가 99%, 1~2회 발정 후 92%, 그 이후 크게 감소한다. 암컷이라면 첫 발정(소형견 6~10개월, 대형견 10~14개월) 전에 중성화하는 것이 유선종양 예방에 효과적이다.</p>

<h2>중성화 후 관리</h2>
<ul>
<li>수술 후 2주간 활동 제한, 봉합 부위 핥지 않게 넥칼라 착용</li>
<li>기초대사량 저하 → 사료량 10~20% 감량 (비만 예방)</li>
<li>정기 체중 측정으로 모니터링</li>
</ul>

<h2>마지막으로</h2>
<p>중성화 시기는 품종·크기·성별에 따라 달라야 한다. 담당 수의사와 상담해 개체에 맞는 시기를 결정하는 것이 가장 정확하다. '무조건 6개월'은 더 이상 모든 강아지에게 적용되지 않는다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Hart, B.L. et al. — Long-term health effects of neutering dogs. PLOS ONE 2014",
      "American Veterinary Medical Association — Canine Spay-Neuter Statement",
      "대한수의사회 반려동물 중성화 수술 권고 지침",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 중성화 시기는 수의사와 상담하세요.",
    status: "published",
    publishedAt: "2026-07-26T11:00:00.000Z",
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
  console.log("블로그 포스트 52차 시딩 완료! (blog-381 ~ blog-385)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
