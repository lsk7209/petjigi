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
    body: `<p>강아지가 한 번 토했다고 모두 응급은 아니다. 갑자기 시작된 구토는 하루 안에 저절로 좋아지는 경우도 많다. 하지만 어떤 구토는 서둘러 병원에 가야 한다. 이 글은 지켜봐도 되는 경우와 바로 가야 하는 경우를 구분하는 기준을 정리했다.</p>

<h2>상황별 판단</h2>
<table>
<thead><tr><th>상황</th><th>대처</th></tr></thead>
<tbody>
<tr><td>1~2회 토했고 이후 활발하며 잘 마심</td><td>집에서 관찰. 아래 가벼운 구토 관리 참고</td></tr>
<tr><td>구토가 몇 시간 이상 반복됨</td><td>진료 권장. 자료마다 기준 시간이 다르지만 4~12시간 이상 계속되면 상담하라고 안내한다</td></tr>
<tr><td>구토에 열, 무기력, 식욕 저하, 복통, 설사, 탈수가 함께 있음</td><td>당일 진료</td></tr>
<tr><td>생후 4개월 미만 강아지나 노령견, 지병이 있는 개</td><td>빨리 진료. 탈수가 빠르게 진행될 수 있다</td></tr>
<tr><td>피가 섞이거나 이물·독성 물질을 먹었을 가능성</td><td>즉시 응급 진료</td></tr>
</tbody>
</table>

<div class="callout-dog">
<strong>바로 응급실로 가야 하는 경우</strong><br>
• 토하려는 시늉을 계속하는데 아무것도 나오지 않음<br>
• 배가 팽팽하게 부풀고 침을 흘리며 안절부절못함 (위확장·염전 가능성)<br>
• 잇몸이 창백하거나 푸르고 쓰러짐<br>
• 초콜릿, 포도, 자일리톨, 약품 등을 먹은 것이 확실하거나 의심됨<br>
• 이물(양말, 장난감 등)을 삼켰을 가능성
</div>

<h2>토한 내용물로 보는 단서</h2>
<ul>
<li><strong>노란 거품(담즙)</strong>: 빈속에서 흔하다. 반복되면 진료를 받는다.</li>
<li><strong>하얀 거품</strong>: 위 자극이나 공복일 때 나올 수 있다. 헛구역질이 반복되면 응급 가능성도 확인한다.</li>
<li><strong>소화 안 된 사료</strong>: 급하게 먹거나 식도·위 문제일 수 있다.</li>
<li><strong>피 섞임(붉거나 커피 찌꺼기 같은 갈색)</strong>: 위장관 출혈 가능성이 있어 진료가 필요하다.</li>
<li><strong>이물이 섞임</strong>: 장 폐색 가능성이 있다.</li>
</ul>

<h2>가벼운 구토일 때 집에서</h2>
<ol>
<li>구토 직후에는 한 번에 많은 물을 주지 말고 소량씩 나눠 준다.</li>
<li>수의사가 허용하는 범위에서 짧은 시간 음식을 쉬게 하고, 이후 소화가 쉬운 소량의 식사를 천천히 시작한다. 금식 시간은 개체와 나이에 따라 달라서 어린 강아지는 임의로 길게 굶기지 않는다.</li>
<li>사람 약(진통제, 소화제)을 임의로 먹이지 않는다.</li>
<li>구토 횟수와 시각, 모양을 기록하고 사진을 남긴다.</li>
</ol>
<p>탈수는 잇몸을 만져 확인할 수 있다. 정상은 촉촉하고 미끈한데 끈적이거나 마르면 탈수를 의심하고 진료받는다.</p>

<h2>마지막으로</h2>
<p>한 번의 구토보다 중요한 것은 같이 나타나는 증상과 반복 여부다. 어린 강아지, 노령견, 지병이 있는 개는 기준을 더 보수적으로 잡고, 의심되면 일찍 병원에 연락하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vcahospitals.com/know-your-pet/vomiting-in-dogs — VCA, Vomiting in Dogs",
      "https://www.akc.org/expert-advice/health/tummy-troubles-dog-vomiting-require-veterinary-care/ — AKC, Dog Vomiting: When Should You Go to the Vet?",
      "https://vcahospitals.com/know-your-pet/common-emergencies-in-dogs — VCA, Emergencies in Dogs",
    ],
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
    body: `<p>고양이를 새로 데려오거나 길고양이를 구조했을 때 가장 먼저 듣는 검사가 고양이 면역결핍바이러스(FIV)와 고양이 백혈병바이러스(FeLV) 검사다. 간이 키트로 빠르게 확인할 수 있지만, 한 번의 결과만으로 단정하면 안 되는 경우가 있다.</p>

<h2>두 바이러스 한눈에 보기</h2>
<table>
<thead><tr><th>구분</th><th>FIV</th><th>FeLV</th></tr></thead>
<tbody>
<tr><td>이름</td><td>고양이 면역결핍바이러스</td><td>고양이 백혈병바이러스</td></tr>
<tr><td>주요 감염 경로</td><td>주로 싸움 중 깊은 물림 상처</td><td>긴밀한 접촉(그루밍, 그릇 공유 등)과 어미에서 새끼로 전파</td></tr>
<tr><td>예방</td><td>격리와 중성화, 실내 생활 등 관리</td><td>백신이 있으나 위험도에 맞춰 수의사와 상의</td></tr>
</tbody>
</table>

<h2>언제 검사하나</h2>
<ul>
<li>새로 입양하거나 구조한 고양이는 집에 있는 고양이와 합치기 전에 검사한다.</li>
<li>다른 고양이와 접촉했거나 물린 상처가 있었을 때.</li>
<li>만성 구내염, 체중 감소, 잦은 감염 등 원인 모를 건강 문제가 있을 때.</li>
</ul>

<h2>결과를 읽는 요령</h2>
<p>미국고양이수의사회(AAFP) 지침은 새로 들인 고양이를 격리하고 도착 즉시 검사하라고 권한다. 음성이어도 감염 직후에는 양성으로 나오지 않을 수 있어서, 최소 FeLV는 30일, FIV는 60일 이상 간격을 두고 다시 검사하도록 안내한다. 이 지침은 2008년 자료이므로, 실제 일정은 담당 수의사의 최신 판단을 따른다.</p>

<div class="callout-cat">
<strong>새끼 고양이는 특히 주의</strong><br>
• 어미가 FIV 양성이면 모유로 받은 항체 때문에 새끼가 몇 개월간 양성으로 나올 수 있다<br>
• iCatCare는 4개월령 이후 재검사, 그래도 양성이면 2개월 뒤 재검사, 6개월령 이후에도 양성일 때 실제 감염 가능성이 높다고 안내한다<br>
• 한 번 양성이 나왔다고 서둘러 결론 내리지 말 것
</div>

<h2>양성이 나왔다면</h2>
<ul>
<li>간이 검사는 100% 정확하지 않다. 확인 검사(다른 방식 검사나 PCR)를 요청한다.</li>
<li>FIV 백신 접종 이력이 있는 고양이는 양성이 감염을 뜻하지 않을 수 있다.</li>
<li>양성 고양이의 관리와 다묘 가정의 격리·합사 계획은 수의사와 함께 세운다.</li>
</ul>

<h2>마지막으로</h2>
<p>검사는 새 가족을 지키기 위한 첫 단계다. 결과가 애매하면 시기를 두고 재검사하고, 양성이라도 바로 결론짓지 말고 확인 검사와 전문 상담을 거치자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://catvets.com/wp-content/uploads/2024/01/RetrovirusGLS.pdf — AAFP, 2008 Feline Retrovirus Management Guidelines",
      "https://icatcare.org/resources/fiv-cat-friendly-decision-making.pdf — iCatCare, FIV infection and testing in unowned cats",
      "https://icatcare.org/resources/felv-cat-friendly-decision-making.pdf — iCatCare, FeLV infection and testing in unowned cats",
    ],
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

<h2>용량은 수의사와 정하세요</h2>
<p>적정 용량은 제품의 EPA·DHA 함량, 체중, 복용 목적(피부·관절·기저질환), 복용 중인 약에 따라 달라집니다. 제품 라벨의 급여량을 확인하고, 특히 항염증·관절 목적이나 질환이 있는 경우에는 용량을 임의로 늘리지 말고 수의사와 상담해 결정하세요.</p>

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
<p>대형견은 1년 미만 조기 중성화 시 다음 위험이 높아질 수 있다는 연구 결과가 있다:</p>
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
