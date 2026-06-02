import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 44 — cat1×2 + cat4×1 + cat5×1 + cat3×1 = 5편 (IDs 341-345)
// Macros: F, B, A, F, E
// Angles: RA2, RA5, RA7, RA3, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 341 / Cat1 / Macro-F(절차) / Lens-L2 / Hook-H1 / Outro-O3 / Angle-RA2
  {
    id: "blog-341",
    slug: "kitten-first-week-guide",
    type: "blog",
    category: 1,
    title: "새끼 고양이 처음 데려온 첫 주 — 보호자가 꼭 해야 할 것, 하면 안 될 것",
    subtitle: "첫날 격리 방법, 건강 체크 포인트, 예방접종 일정, 사회화 핵심 시기 놓치지 않기",
    metaTitle: "새끼 고양이 첫 주 완전 가이드 — 격리·건강·예방접종 | 펫지기",
    metaDescription: "새끼 고양이를 처음 데려온 첫 주에 해야 할 것과 하면 안 되는 것. 첫날 격리 방법, 건강 체크, 예방접종 일정, 사회화 시기를 정리했습니다.",
    body: `<p>새끼 고양이가 집에 왔다. 설레는 마음과 함께 불안함도 있다. 처음 며칠이 앞으로의 관계를 만드는 중요한 시간이다.</p>

<h2>첫날 — 격리 공간 제공</h2>
<p>처음 집에 온 고양이를 집 전체에 풀어두면 안 된다. 낯선 공간 전체에 압도당해 숨어버리고 적응이 느려진다. 한 방(화장실·거실·침실 중 하나)에 필요한 것을 모두 갖추고 그 공간에서 먼저 익숙해지게 한다.</p>

<div class="callout-cat">
<strong>첫 격리 방에 필요한 것</strong><br>
□ 화장실 + 모래<br>
□ 사료·물 그릇 (화장실과 멀리)<br>
□ 숨을 수 있는 공간 (박스·터널)<br>
□ 이동장 (안전 공간으로 열어둠)<br>
□ 스크래처 1개
</div>

<h2>처음 며칠 — 강요하지 않기</h2>
<p>고양이가 숨어있어도 괜찮다. 억지로 꺼내거나 만지려 하지 않는다. 그 공간에서 조용히 앉아 있거나 간식을 던져주는 방식으로 존재를 알린다. 대부분 1~3일 내에 스스로 나온다.</p>

<h2>첫 주 건강 체크</h2>
<ul>
<li>눈: 분비물(눈곱)이 과도하지 않은지, 충혈 여부</li>
<li>코: 맑은 콧물은 가볍지만 황록색은 감염 신호</li>
<li>귀: 검은 분비물(귀진드기 의심), 냄새</li>
<li>항문 주변: 대변 묻어있으면 설사 여부 확인</li>
<li>배: 딱딱하거나 팽창한 경우 기생충 의심</li>
<li>털: 벼룩 (검은 점 같은 배설물 확인)</li>
</ul>

<h2>첫 동물병원 방문 — 1주일 이내</h2>
<p>입양 후 1주일 이내에 건강검진을 받는다. 이 시점에 확인할 것:</p>
<ul>
<li>기생충 검사 (회충·조충 등)</li>
<li>FIV/FeLV(고양이 에이즈/백혈병) 항체 검사 (구조묘·유기묘)</li>
<li>예방접종 일정 수립</li>
<li>중성화 시기 상담</li>
</ul>

<h2>예방접종 기본 일정</h2>
<table>
<thead><tr><th>시기</th><th>접종 내용</th></tr></thead>
<tbody>
<tr><td>생후 8주</td><td>FVRCP 1차 (범백혈구감소증·허피스·칼리시)</td></tr>
<tr><td>생후 12주</td><td>FVRCP 2차 + 광견병 1차</td></tr>
<tr><td>생후 16주</td><td>FVRCP 3차 + FeLV (외출묘)</td></tr>
<tr><td>이후</td><td>1~3년마다 추가 (FVRCP), 매년 (광견병·FeLV)</td></tr>
</tbody>
</table>

<h2>사회화 시기를 놓치지 말 것</h2>
<p>고양이의 사회화 민감기는 생후 2~7주다. 이 시기에 사람과 충분히 접촉한 고양이가 사람을 더 잘 따른다. 보호소나 분양처에서 이 기간을 어떻게 보냈는지가 성격에 영향을 준다. 입양 이후에도 새끼 고양이 시기에 다양한 경험을 쌓는 것이 중요하다.</p>

<h2>마지막으로</h2>
<p>처음 며칠이 가장 어렵다. 새끼 고양이도 새 집도 서로 낯설다. 기다려주는 것이 빠른 적응을 만드는 역설적인 방법이다. 1주일만 지나면 달라진 모습을 볼 수 있을 것이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "International Cat Care — Bringing a New Kitten Home",
      "American Association of Feline Practitioners — Kitten Vaccination Guidelines",
      "한국고양이보호협회 새끼 고양이 입양 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-04T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 342 / Cat1 / Macro-B(비교) / Lens-L5 / Hook-H2 / Outro-O1 / Angle-RA5
  {
    id: "blog-342",
    slug: "large-dog-vs-small-dog-guide",
    type: "blog",
    category: 1,
    title: "대형견 vs 소형견 — 라이프스타일에 맞는 선택을 위한 현실 비교",
    subtitle: "비용·공간·운동량·의료비·수명 차이, 아이와 노인 가정 적합성, 대표 품종별 성격",
    metaTitle: "대형견 vs 소형견 입양 비교 — 라이프스타일에 맞는 선택 | 펫지기",
    metaDescription: "대형견과 소형견의 비용, 공간, 운동량, 의료비, 수명 차이를 비교했습니다. 아이 있는 가정, 1인 가구, 노인 가정에 맞는 선택 기준을 정리했습니다.",
    body: `<p>강아지를 키우고 싶은데 작은 것을 키울까, 큰 것을 키울까 — 이 선택은 단순한 취향이 아니라 생활 방식 전체와 연관된다.</p>

<h2>크기별 비교 한눈에</h2>
<table>
<thead><tr><th>항목</th><th>소형견 (10kg 이하)</th><th>대형견 (25kg 이상)</th></tr></thead>
<tbody>
<tr><td>필요 공간</td><td>아파트·소형 주거 가능</td><td>넓은 공간 권장, 마당 이상적</td></tr>
<tr><td>운동 요구</td><td>낮~중간</td><td>높음 (하루 1~2시간 이상)</td></tr>
<tr><td>월 사료비</td><td>3~8만 원</td><td>10~25만 원</td></tr>
<tr><td>의료비</td><td>수술 등은 체중 비례 높아질 수 있음</td><td>마취·수술비 전반적으로 높음</td></tr>
<tr><td>기대 수명</td><td>12~16년</td><td>8~12년</td></tr>
<tr><td>미용비</td><td>소형 장모종은 높음</td><td>단모 대형견은 낮음</td></tr>
<tr><td>이동 편의성</td><td>높음</td><td>차량·여행 제약 많음</td></tr>
</tbody>
</table>

<h2>라이프스타일별 추천</h2>
<h3>1인 가구·바쁜 직장인</h3>
<p>운동 요구가 낮은 소형견 또는 독립적인 성격의 성견. 하루 1~2시간 산책으로 만족하는 개체. 아파트 가능한 품종.</p>

<h3>아이 있는 가정</h3>
<p>대형견이 의외로 아이들에게 잘 맞는 경우가 많다. 래브라도·골든 리트리버·버니즈 마운틴독은 온순함으로 유명하다. 소형견은 아이가 거칠게 다루면 부상 또는 공격 반응이 올 수 있다. 품종보다 개체의 사회화 이력이 더 중요하다.</p>

<h3>노인 가정</h3>
<p>끌려다니지 않을 크기, 운동 요구가 낮은 품종이 적합하다. 카발리에 킹 찰스 스패니얼·말티즈·시추 등 차분한 소형견. 대형견은 산책 시 보호자를 넘어뜨릴 위험.</p>

<h2>소형견에 대한 오해</h2>
<p>소형견이 쉽다는 것은 오해다. 말티즈·포메라니안·치와와는 분리불안·과도한 짖음 성향이 강한 경우가 많다. 훈련을 소홀히 하면 "작으니까 괜찮겠지"가 쌓여 나중에 큰 행동 문제로 이어진다.</p>

<h2>대형견에 대한 오해</h2>
<p>대형견이 반드시 마당이 있어야 하는 것은 아니다. 그레이하운드처럼 운동량이 적어 보이는 대형견도 있다. 중요한 것은 일일 운동 요구량이 충족되느냐다.</p>

<h2>마지막으로</h2>
<p>강아지 크기 선택은 로망이 아니라 현실로 결정해야 한다. 10년 이상 함께할 결정이다. 자신의 생활 패턴·주거 환경·가족 구성·예산을 먼저 파악하고, 거기에 맞는 품종과 개체를 찾는 순서가 맞다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Kennel Club — Choosing the Right Dog for Your Lifestyle",
      "Gough, A. et al. — Breed Predispositions to Disease in Dogs and Cats",
      "한국반려동물협회 품종별 입양 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-05T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 343 / Cat4 / Macro-A(원인분석) / Lens-L7 / Hook-H4 / Outro-O2 / Angle-RA7
  {
    id: "blog-343",
    slug: "pet-insurance-claim-rejection-guide",
    type: "blog",
    category: 4,
    title: "펫보험 청구가 거절됐을 때 — 이의 신청 방법과 거절 유형별 대처",
    subtitle: "가장 흔한 거절 사유 5가지, 이의 신청 절차, 금융감독원 민원 접수 방법",
    metaTitle: "펫보험 청구 거절 대처법 — 이의 신청·금감원 민원 가이드 | 펫지기",
    metaDescription: "펫보험 청구가 거절됐을 때 이의 신청하는 방법. 가장 흔한 거절 사유 5가지와 각 유형별 대처법, 금융감독원 민원 접수 절차를 정리했습니다.",
    body: `<p>보험료를 꼬박꼬박 냈는데 청구 시 거절 통보를 받는 것은 당혹스러운 경험이다. 무조건 받아들이기 전에 거절 사유를 정확히 파악하고 이의 신청이 가능한지 확인해야 한다.</p>

<h2>가장 흔한 거절 사유 5가지</h2>

<h3>1. 기존 질환 (Pre-existing Condition)</h3>
<p>가입 전 또는 대기기간 중 이미 진단·치료받은 질환과 관련된 청구는 거절된다. 이의 신청: 진단 시점이 가입 후임을 증명하는 진료기록 확인.</p>

<h3>2. 면책 항목</h3>
<p>약관에 명시된 면책 항목(슬개골 대기기간 미충족, 치과 치료, 미용 목적 등)에 해당하는 경우. 이의 신청: 약관 문구 해석을 구체적으로 다툴 수 있음.</p>

<h3>3. 고지 의무 위반</h3>
<p>가입 시 기존 질환·치료 이력을 숨기거나 부실 신고한 경우. 이의 신청: 실제로 알지 못했던 경우 또는 관련 없음을 주장.</p>

<h3>4. 자해·고의 사고</h3>
<p>보험사가 고의성을 주장하는 경우. 이의 신청: 사고 경위 증거 제출.</p>

<h3>5. 서류 불충분</h3>
<p>진료기록부·영수증·진단서가 누락된 경우. 이의 신청: 해당 서류를 추가 제출하면 재심사 가능.</p>

<h2>이의 신청 절차</h2>
<ol>
<li><strong>거절 통보서 확인</strong>: 거절 사유가 구체적으로 명시되어 있어야 한다. 없다면 요청.</li>
<li><strong>관련 진료기록 수집</strong>: 동물병원에 진료기록 발급 요청 (수의사 소견서 포함 가능).</li>
<li><strong>이의 신청서 작성·제출</strong>: 보험사 고객센터 또는 이메일로 이의 신청서와 추가 서류 제출.</li>
<li><strong>보험사 재심사</strong>: 통상 10~30일 소요.</li>
</ol>

<h2>보험사와 합의가 안 될 때</h2>
<div class="callout-cat">
<strong>외부 조정·민원 기관</strong><br>
• <strong>금융감독원 금융소비자보호처</strong>: 1332 또는 민원24<br>
• <strong>금융분쟁조정위원회</strong>: 법원보다 빠르고 무료<br>
• <strong>소비자원(1372)</strong>: 소비자 피해 구제 신청
</div>

<p>금융감독원 민원을 접수하면 보험사가 더 신중하게 재검토하는 경향이 있다. 억울한 거절이라면 민원을 망설이지 않아도 된다.</p>

<h2>향후 예방 — 가입 전 체크</h2>
<ul>
<li>약관 전문의 면책 항목을 꼼꼼히 읽는다</li>
<li>기존 질환은 성실하게 고지한다 (나중에 면책보다 낫다)</li>
<li>진료 시마다 영수증·진료 내역서를 보관한다</li>
<li>청구 전 보험사 고객센터에 커버 여부를 먼저 확인하는 습관</li>
</ul>

<h2>마지막으로</h2>
<p>거절 통보는 끝이 아니다. 사유를 파악하고 근거를 갖추면 이의 신청으로 뒤집히는 경우도 있다. 포기하기 전에 한 번 더 확인하는 것이 보호자의 권리다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "펫보험 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 보험 민원 처리 절차 안내 2024",
      "한국소비자원 펫보험 분쟁 처리 사례집",
      "금융소비자보호법 제28조 (이의 신청 제도)",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 법적 조언은 관련 기관에 문의하세요.",
    status: "published",
    publishedAt: "2026-07-05T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 344 / Cat5 / Macro-F(절차) / Lens-L3 / Hook-H3 / Outro-O3 / Angle-RA3
  {
    id: "blog-344",
    slug: "cat-scratch-furniture-prevention",
    type: "blog",
    category: 5,
    title: "고양이 가구 긁기 — 막는 방법이 아닌 올바른 장소로 유도하는 방법",
    subtitle: "스크래칭이 왜 필요한지 이해, 소파 보호 방법, 스크래처 위치·소재 선택, 영구적 해결 접근법",
    metaTitle: "고양이 소파 긁기 방지 — 스크래처로 유도하는 방법 | 펫지기",
    metaDescription: "고양이 가구 긁기를 막는 방법이 아닌 올바른 장소로 유도하는 방법. 스크래처 선택과 배치, 소파 보호 방법을 정리했습니다.",
    body: `<p>고양이가 소파를 긁는 것은 나쁜 행동이 아니다. 본능적으로 필요한 행동을 하는 것이다. 막는 것은 임시방편이고, 올바른 장소를 제공하는 것이 영구적 해결이다.</p>

<h2>왜 긁는가</h2>
<ul>
<li><strong>발톱 관리</strong>: 오래된 발톱 껍질을 제거해 새 발톱을 드러냄</li>
<li><strong>스트레칭</strong>: 전체 몸 근육·척추 이완</li>
<li><strong>영역 표시</strong>: 발바닥 분비물로 냄새 표시 + 시각적 스크래치 표시</li>
<li><strong>기분 표현</strong>: 흥분·스트레스 해소</li>
</ul>

<h2>스크래처 선택 — 개체 선호 파악</h2>
<h3>방향</h3>
<ul>
<li><strong>수직형</strong>: 기지개를 켜며 긁고 싶은 본능. 체중을 지탱할 수 있을 만큼 높은 것(60cm 이상).</li>
<li><strong>수평형</strong>: 영역 표시에 더 집중하는 개체에 적합.</li>
<li><strong>기울기형</strong>: 둘 다 즐기는 개체에 좋음.</li>
</ul>

<h3>소재</h3>
<ul>
<li><strong>사이잘 로프</strong>: 가장 보편적, 내구성 좋음</li>
<li><strong>골판지</strong>: 저렴, 많은 고양이 선호, 빨리 닳음</li>
<li><strong>카펫</strong>: 소파 카펫과 구분이 어려워 혼동 가능성</li>
<li><strong>나무</strong>: 자연 소재 선호 개체에</li>
</ul>

<p>고양이마다 선호가 다르므로 처음엔 2~3종류를 시도해본다.</p>

<h2>스크래처 배치 — 위치가 핵심</h2>
<div class="callout-cat">
<strong>효과적인 스크래처 배치 포인트</strong><br>
• 자주 긁는 소파 또는 물건 바로 옆에 놓기<br>
• 잠에서 깨는 침대·캣타워 근처 (기지개 스크래칭)<br>
• 창문 근처 (영역 표시 본능)<br>
• 사람이 자주 있는 공간 (관심 받는 장소에서 긁음)
</div>

<h2>소파 보호 방법 (임시)</h2>
<ul>
<li>양면 테이프 부착 — 대부분의 고양이가 끈적한 감촉을 싫어함</li>
<li>소파 커버 (플라스틱·패브릭 전용 커버)</li>
<li>알루미늄 호일 — 소리와 감촉을 싫어함</li>
<li>시트러스 계열 스프레이 — 일부 고양이에 효과적</li>
</ul>

<p>이 방법들은 해당 장소를 일시적으로 불편하게 만들 뿐이다. 스크래처를 제공하지 않으면 다른 곳을 찾는다.</p>

<h2>유도 훈련</h2>
<ol>
<li>스크래처를 소파 옆에 배치</li>
<li>캣닙 또는 간식으로 스크래처에 유인</li>
<li>스크래처를 사용할 때 즉시 간식으로 보상</li>
<li>점진적으로 스크래처를 원하는 위치로 이동 (10cm/일)</li>
</ol>

<h2>절대 하면 안 되는 것</h2>
<p>발톱을 제거하는 수술(발톱 제거술, Declawing)은 한국에서는 동물보호법으로 금지된 동물 학대 행위다. 발톱을 제거하면 통증·보행 이상·심리적 문제가 생긴다. 선택지가 아니다.</p>

<h2>마지막으로</h2>
<p>스크래칭을 막으려는 노력보다 고양이가 선호하는 스크래처를 찾아 올바른 위치에 놓는 것이 훨씬 효과적이다. 처음엔 여러 종류를 시도해 '이 스크래처가 제일 좋다'는 선호를 파악하면 소파는 자연스럽게 포기한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "International Cat Care — Scratching Behaviour in Cats",
      "ASPCA — Cat Scratching Solutions",
      "한국고양이보호협회 스크래칭 행동 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-06T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 345 / Cat3 / Macro-E(비교분석) / Lens-L1 / Hook-H5 / Outro-O4 / Angle-RA1
  {
    id: "blog-345",
    slug: "dog-atopy-skin-guide",
    type: "blog",
    category: 3,
    title: "강아지 아토피 피부염 — 평생 관리가 필요한 알레르기 피부 질환",
    subtitle: "환경·음식 알레르기 아토피 구분, 가려움·빨간 피부·발 핥기 증상, 샴푸·약물·식이 관리",
    metaTitle: "강아지 아토피 피부염 원인·증상·관리 완전 가이드 | 펫지기",
    metaDescription: "강아지 아토피 피부염은 평생 관리가 필요합니다. 환경·음식 알레르기 구분, 가려움·발 핥기 증상, 샴푸·약물·저알레르겐 식이 관리를 정리했습니다.",
    body: `<p>강아지가 특정 시기만 되면 발을 핥고, 귀를 긁고, 피부가 빨개진다면 아토피 피부염일 가능성이 있다. 아토피는 완치보다 관리가 목표이며, 조기에 시작할수록 삶의 질을 높일 수 있다.</p>

<h2>아토피 피부염이란</h2>
<p>환경 알레르기항원(집먼지진드기·꽃가루·곰팡이 등)에 대한 면역 과반응이다. 피부 장벽이 약해 알레르기항원이 쉽게 침투하고, 이에 면역계가 과반응하며 염증이 생긴다.</p>

<h2>환경 알레르기 vs 음식 알레르기 구분</h2>
<table>
<thead><tr><th>구분</th><th>환경 알레르기 (아토피)</th><th>음식 알레르기</th></tr></thead>
<tbody>
<tr><td>발생 시기</td><td>계절성 (봄·가을) 또는 연중</td><td>연중 지속</td></tr>
<tr><td>발병 나이</td><td>1~3세 이후</td><td>어떤 나이에도 발생</td></tr>
<tr><td>주요 부위</td><td>발·귀·복부·겨드랑이·눈 주변</td><td>발·귀·항문 주변</td></tr>
<tr><td>검사 방법</td><td>알레르기 혈액 검사·피부 반응 검사</td><td>제거식 시험 (8~12주)</td></tr>
</tbody>
</table>

<h2>주요 증상</h2>
<div class="callout-dog">
<strong>아토피 의심 증상 체크</strong><br>
• 발(발가락 사이)을 자주 핥음<br>
• 귀를 긁거나 귀 냄새·분비물<br>
• 복부·겨드랑이·사타구니 피부 발적<br>
• 눈·코 주변 눈물 자국, 갈색 착색<br>
• 피부가 두꺼워지거나 코끼리 피부처럼 변함 (만성)<br>
• 긁다가 2차 감염(세균·효모) 발생
</div>

<h2>관리 방법</h2>
<h3>샴푸 치료</h3>
<p>항균·항진균 또는 보습 의료용 샴푸로 주 2~3회 목욕. 피부 장벽을 강화하고 알레르기항원을 제거한다. 샴푸 후 충분히 헹구고 완전히 건조해야 효과적이다.</p>

<h3>약물 치료</h3>
<ul>
<li><strong>스테로이드 (프레드니솔론 등)</strong>: 빠른 가려움 완화, 장기 사용 시 부작용</li>
<li><strong>사이토포인트 (항체 주사)</strong>: 월 1회 주사, IL-31 차단, 부작용 적음</li>
<li><strong>아포퀠 (오클라시티닙)</strong>: 경구 복용, 빠른 효과, 정기 혈액 모니터링 필요</li>
<li><strong>알레르기 면역 치료 (ASIT)</strong>: 원인 알레르기항원에 대한 장기 탈감작, 근본 치료 접근</li>
</ul>

<h3>식이 관리</h3>
<p>음식 알레르기가 동반된 경우 제거식 테스트를 진행한다. 새로운 단백질 소스(말·오리·캥거루·곤충) 또는 가수분해 단백질 사료로 전환해 음식 알레르기 유발 원을 파악한다. 8~12주간 철저히 진행해야 결과가 의미 있다.</p>

<h2>취약 품종</h2>
<p>웨스트 하이랜드 화이트 테리어·래브라도·골든 리트리버·불독·비글·시츄·포메라니안이 아토피 발병률이 높다. 이 품종을 키운다면 피부 상태를 더 주의깊게 관찰해야 한다.</p>

<h2>마지막으로</h2>
<p>아토피는 완치가 드물다. 그러나 올바른 관리로 가려움을 줄이고 2차 감염을 예방하면 강아지의 삶의 질을 크게 높일 수 있다. 계절마다 증상을 기록하고 수의피부과 전문의와 장기적 관리 계획을 세우는 것을 권장한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Olivry, T. et al. — Diagnosis of canine atopic dermatitis: ICADA guidelines. Vet Dermatology 2015",
      "한국수의피부과학회 아토피 피부염 진단·치료 가이드라인 2024",
      "WSAVA — Dermatology Guidelines for Small Animal Practice",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-06T11:00:00.000Z",
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
  console.log("블로그 포스트 44차 시딩 완료! (blog-341 ~ blog-345)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
