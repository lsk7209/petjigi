import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 33 — cat4×2 + cat5×3 = 5편 (IDs 286-290)
// Macros: F, E, A, G, C
// Angles: RA3, RA4, RA6, RA8, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 286 / Cat4 / Macro-F(절차) / Lens-L4 / Hook-H3 / Outro-O1 / Angle-RA3
  {
    id: "blog-286",
    slug: "pet-travel-airline-rules-guide",
    type: "blog",
    category: 4,
    title: "반려동물 비행기 탑승 규정 완전 가이드 — 국내선·국제선 기준과 준비 절차",
    subtitle: "항공사별 크기·무게 제한, 케어링·켄넬 기준, 건강증명서 발급 시기, 기내 반입 vs 화물칸 기준",
    metaTitle: "반려동물 비행기 탑승 규정 국내선 국제선 완전 가이드 | 펫지기",
    metaDescription: "반려동물과 비행기 탑승 시 항공사별 무게·크기 기준, 케어링·켄넬 규격, 건강증명서 발급 방법, 기내 반입과 화물칸 차이를 정리했습니다.",
    body: `<p>반려동물과 함께 비행기를 타기로 결정했다면 적어도 출발 2개월 전부터 준비해야 한다. 항공사마다 규정이 다르고, 건강증명서 유효기간이 짧아 타이밍 관리가 중요하다. 규정을 몰랐다가 탑승 당일 공항에서 거절되는 사례가 매년 발생한다.</p>

<div class="callout-cat">
<strong>준비 타임라인 (출발 기준)</strong><br>
• D-60: 항공사 반려동물 예약 (좌석 수 제한, 조기 마감)<br>
• D-14: 수의사 예약 (건강증명서 발급)<br>
• D-10 이내: 건강증명서 발급 (유효기간 10일 이내인 경우 많음)<br>
• D-당일: 공항 3시간 전 도착, 케어링 무게 포함 체크인
</div>

<h2>1단계. 기내 반입 vs 화물칸 — 어떤 기준인가</h2>
<p>기내 반입: 케어링 포함 총 무게 5~8kg 이하 (항공사별 다름), 케어링이 좌석 하부에 들어가야 함. 화물칸: 초과 시. 화물칸은 온도 관리가 되지만 스트레스가 크고, 단두종(퍼그·프렌치 불독)은 화물칸 탑승 자체를 금지하는 항공사도 있다.</p>

<div class="key-summary">
<strong>📋 주요 국내 항공사 반려동물 정책 비교 (2024 기준, 변경될 수 있음)</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-4-soft,#d9e3ee);">
<th style="padding:8px;border:1px solid var(--brand-border);">항공사</th>
<th style="padding:8px;border:1px solid var(--brand-border);">기내 반입 총 무게</th>
<th style="padding:8px;border:1px solid var(--brand-border);">추가 요금</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">대한항공</td><td style="padding:8px;border:1px solid var(--brand-border);">7kg 이하</td><td style="padding:8px;border:1px solid var(--brand-border);">국내선 2만~3만 원대</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">아시아나항공</td><td style="padding:8px;border:1px solid var(--brand-border);">7kg 이하</td><td style="padding:8px;border:1px solid var(--brand-border);">항공사 문의</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">제주항공</td><td style="padding:8px;border:1px solid var(--brand-border);">5kg 이하</td><td style="padding:8px;border:1px solid var(--brand-border);">국내선 1~2만 원대</td></tr>
</tbody></table>
<p style="font-size:0.85rem;color:var(--brand-text-secondary);margin-top:0.5rem;">※ 정책은 수시 변경됨. 반드시 해당 항공사 최신 규정 확인 필요.</p>
</div>

<h2>2단계. 건강증명서 발급</h2>
<ul>
<li>수의사 발급 건강증명서는 발급일로부터 7~10일 이내 유효 (항공사·국가별 다름)</li>
<li>국제선은 목적지 국가의 입국 요건(광견병 항체 검사, 마이크로칩 등)도 별도 확인 필요</li>
<li>일부 국가(영국·호주·뉴질랜드)는 엄격한 검역 요건 — 최소 수개월 전 준비 필요</li>
</ul>

<h2>3단계. 케어링·켄넬 준비</html2>
<ul>
<li>항공사가 지정한 규격(가로×세로×높이)을 정확히 맞춰야 함</li>
<li>케어링 안에서 강아지가 서고 돌아설 수 있어야 함</li>
<li>여분의 흡수 패드, 물그릇, 간식 준비</li>
<li>출발 4~6시간 전부터 금식 (구토 예방)</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>비행 전 진정제를 먹여도 되나요?</h3>
<p>대부분의 수의사는 권장하지 않는다. 진정제가 기압 변화와 맞물려 호흡에 영향을 줄 수 있고, 특히 단두종에서 위험성이 높다. 수의사와 먼저 상담하지 않고 임의로 진정제를 사용하면 안 된다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-moving-new-home-adaptation">반려동물과 이사하기 — 새 집 적응을 돕는 단계별 가이드</a><br>
<a href="/blog/pet-rental-contract-guide">반려동물과 전세·월세 계약 — 특약·분쟁 예방 가이드</a><br>
<a href="/blog/pet-car-sickness-guide">강아지 차 멀미 — 원인과 예방 완전 가이드</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·금융 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "국토교통부 항공법 — 반려동물 기내 탑승 관련 규정",
      "농림축산검역본부 — 반려동물 해외 입국 검역 요건",
      "대한항공·아시아나항공·제주항공 반려동물 탑승 안내 페이지",
    ]),
    disclaimer: "항공사 정책과 각국 입국 요건은 수시로 변경됩니다. 반드시 해당 항공사와 목적지 대사관에 최신 정보를 확인하세요.",
    status: "published",
    publishedAt: "2026-06-07T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 287 / Cat4 / Macro-E(비교) / Lens-L3 / Hook-H4 / Outro-O2 / Angle-RA4
  {
    id: "blog-287",
    slug: "pet-sitter-dogwalker-contract-guide",
    type: "blog",
    category: 4,
    title: "펫시터·도그워커 고용 시 확인해야 할 계약 사항 — 사고 대비 체크리스트",
    subtitle: "보험 가입 여부, 사고 배상 책임, 계약서 필수 항목, 검증된 펫시터 찾는 방법",
    metaTitle: "펫시터 도그워커 고용 계약 체크리스트 완전 가이드 | 펫지기",
    metaDescription: "펫시터·도그워커 고용 시 보험 가입 확인, 사고 배상 책임, 계약서 필수 항목, 신뢰할 수 있는 펫시터 찾는 방법을 정리했습니다.",
    body: `<p>흔히 "반려동물을 맡기는 건 가족끼리 하는 일"이라고 생각하지만, 전문 펫시터·도그워커를 고용할 때는 명확한 계약이 필요하다. 한국소비자원에 따르면 반려동물 위탁 관련 피해 상담은 연간 수백 건이며, 사고 발생 시 배상을 두고 분쟁이 잦다.</p>

<div class="callout-cat">
<strong>계약 없이 시작하면 안 되는 이유</strong><br>
구두 합의는 사고 발생 시 배상 책임 소재가 불명확해진다. 반려동물이 도망가거나 다쳤을 때 "몇만 원짜리 일"이 수백만 원 분쟁이 되는 사례가 있다.
</div>

<h2>펫시터 vs 도그워커 — 역할과 책임 차이</h2>
<div class="key-summary">
<strong>📋 역할별 비교</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-4-soft,#d9e3ee);">
<th style="padding:8px;border:1px solid var(--brand-border);">구분</th>
<th style="padding:8px;border:1px solid var(--brand-border);">펫시터</th>
<th style="padding:8px;border:1px solid var(--brand-border);">도그워커</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">서비스 내용</td><td style="padding:8px;border:1px solid var(--brand-border);">댁 방문 또는 자택 위탁 돌봄</td><td style="padding:8px;border:1px solid var(--brand-border);">산책 대행 (1~2시간)</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">위험 상황</td><td style="padding:8px;border:1px solid var(--brand-border);">의료 응급, 이탈, 이물질 섭취</td><td style="padding:8px;border:1px solid var(--brand-border);">이탈, 다른 개와 싸움, 도로 사고</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">필요 자격</td><td style="padding:8px;border:1px solid var(--brand-border);">법정 자격 없음 (민간 자격증 있음)</td><td style="padding:8px;border:1px solid var(--brand-border);">법정 자격 없음</td></tr>
</tbody></table>
</div>

<h2>계약서 필수 항목 7가지</h2>
<ol style="padding-left:1.2rem;">
<li><strong>서비스 범위</strong>: 산책·사료 급여·약 투여 등 구체적으로 명시</li>
<li><strong>비용과 지불 방법</strong>: 추가 비용 발생 조건 포함</li>
<li><strong>보험 가입 여부</strong>: 반려동물 배상 책임 보험 또는 영업 배상 책임 보험</li>
<li><strong>사고 발생 시 처리 절차</strong>: 즉각 연락, 병원 비용 부담 주체</li>
<li><strong>반려동물 건강 정보 공유</strong>: 약 복용, 알레르기, 응급 연락처</li>
<li><strong>위탁 기간과 취소 정책</strong></li>
<li><strong>분쟁 해결 방법</strong>: 한국소비자원 조정 또는 관할 법원</li>
</ol>

<h2>신뢰할 수 있는 펫시터 찾는 방법</h2>
<ul>
<li>반려동물 관련 자격증 보유 여부 확인 (반려동물행동상담사, 애견훈련사 등 민간 자격증)</li>
<li>반려동물 배상 책임 보험 가입 여부 확인 (서비스 전 증서 요청)</li>
<li>이전 고객 후기·평점 확인</li>
<li>첫 방문 또는 시험 산책 미리 진행</li>
<li>긴급 상황 시 연락 가능한 주 연락처 + 보조 연락처 확보</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>펫시터가 맡기는 동안 반려동물이 다치면 누가 책임지나요?</h3>
<p>계약서에 책임 조항이 없다면 법적으로 판단이 복잡해진다. 민법 759조(동물 점유자 책임)에 따르면 동물을 점유하는 사람(위탁 기간 중 펫시터)이 손해 배상 책임을 지는 경우가 있다. 계약서에 명확히 규정해두는 것이 분쟁 예방의 핵심이다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-consumer-rights-guide">반려동물 소비자 권리 — 분쟁·환불·민원 처리 완전 가이드</a><br>
<a href="/blog/multi-pet-insurance-strategy">다묘·다견 가정 펫보험 전략</a><br>
<a href="/blog/pet-neighbor-dispute-resolution">반려동물로 인한 이웃 분쟁 해결 방법</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·금융 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국소비자원 반려동물 위탁 피해 상담 현황",
      "민법 제759조 — 동물 점유자 손해배상 책임",
      "농림축산식품부 반려동물 관련 서비스업 안내",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 법적 분쟁은 전문가와 상담하세요.",
    status: "published",
    publishedAt: "2026-06-07T10:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 288 / Cat5 / Macro-A / Lens-L2 / Hook-H4 / Outro-O2 / Angle-RA6
  {
    id: "blog-288",
    slug: "dog-summer-heat-cooling-guide",
    type: "blog",
    category: 5,
    title: "강아지 여름 더위 식히는 법 — 열사병 예방부터 냉각 방법까지",
    subtitle: "열사병 증상과 응급 대처, 집 안 온도 관리, 산책 시간대 선택, 냉각 제품 비교",
    metaTitle: "강아지 여름 더위 식히는 방법 열사병 예방 완전 가이드 | 펫지기",
    metaDescription: "강아지 여름 열사병 예방법, 증상 확인, 응급 냉각 방법, 산책 시간대 선택, 집 안 온도 관리, 쿨링 제품 비교를 정리했습니다.",
    body: `<p>흔히 강아지가 헥헥거리는 것을 "더운가 보다"라고 가볍게 넘기지만, 빠른 헥헥거림은 열사병의 초기 신호일 수 있다. 강아지는 발바닥과 혀 외에는 땀샘이 없어 체온 조절이 인간보다 훨씬 취약하다. 매년 여름 열사병으로 응급 처치가 필요한 반려견 사례가 급증한다.</p>

<div class="callout-cat">
<strong>즉시 응급실 — 열사병 신호</strong><br>
• 과호흡·심한 헥헥거림이 10분 이상 지속<br>
• 침 흘림, 구토, 비틀거림<br>
• 잇몸이 붉거나 창백해짐<br>
• 의식 저하 또는 쓰러짐<br>
<em>이 증상이 보이면 즉시 시원한 물로 몸을 적시며 병원으로 이동</em>
</div>

<h2>산책 시간대 선택 — 발바닥 화상 방지</h2>
<p>아스팔트 표면 온도는 기온이 30℃일 때 60℃를 넘을 수 있다. 강아지 발바닥 화상을 확인하는 방법: 손등을 아스팔트에 5초간 붙이기 — 불편하면 강아지도 위험하다.</p>
<ul>
<li><strong>안전한 시간대</strong>: 오전 7시 이전, 오후 7시 이후</li>
<li><strong>피해야 할 시간</strong>: 오전 10시 ~ 오후 5시</li>
<li><strong>대안</strong>: 실내 트레드밀, 실내 놀이, 냉방된 장소에서 훈련</li>
</ul>

<h2>집 안 온도 관리</h2>
<ul>
<li>실내 적정 온도: 22~26℃ 유지 권장</li>
<li>바닥이 가장 시원 — 강아지가 바닥에 누워 있으면 자연 냉각 중</li>
<li>쿨링 매트: 겔 타입(자가 냉각)이 가장 실용적. 강아지가 직접 올라가도록 유도</li>
<li>선풍기 단독 사용은 효과 제한적 — 에어컨 없는 환경에서는 물을 적신 타월을 몸에 얹어주기</li>
</ul>

<div class="key-summary">
<strong>📋 여름 냉각 방법 비교</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-5-soft,#dfe9e2);">
<th style="padding:8px;border:1px solid var(--brand-border);">방법</th>
<th style="padding:8px;border:1px solid var(--brand-border);">효과</th>
<th style="padding:8px;border:1px solid var(--brand-border);">비용</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">에어컨</td><td style="padding:8px;border:1px solid var(--brand-border);">★★★</td><td style="padding:8px;border:1px solid var(--brand-border);">전기세</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">쿨링 매트</td><td style="padding:8px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:8px;border:1px solid var(--brand-border);">3~8만 원</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">냉수 목욕</td><td style="padding:8px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:8px;border:1px solid var(--brand-border);">무료</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">얼음 간식</td><td style="padding:8px;border:1px solid var(--brand-border);">★☆☆</td><td style="padding:8px;border:1px solid var(--brand-border);">무료</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">쿨링 조끼</td><td style="padding:8px;border:1px solid var(--brand-border);">★★☆</td><td style="padding:8px;border:1px solid var(--brand-border);">1~4만 원</td></tr>
</tbody></table>
</div>

<h2>자주 묻는 질문</h2>
<h3>털을 밀면 더 시원한가요?</h3>
<p>이중모 견종(포메라니안, 허스키, 골든리트리버 등)은 털을 밀면 오히려 체온 조절 기능이 손상된다. 속털이 단열재이자 냉각재 역할을 동시에 하기 때문이다. 단일모 견종(푸들, 비숑)은 미용 컷으로 더위 해소가 가능하다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-summer-paw-protection">강아지 여름 발바닥 보호 — 뜨거운 아스팔트 화상 예방법</a><br>
<a href="/blog/dog-walk-guide">강아지 산책 완전 가이드 — 거리·횟수·목줄 선택까지</a><br>
<a href="/blog/dog-coat-care-guide">강아지 털 관리 완전 가이드 — 빗질·도구·견종별 주의사항</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AVMA — 반려동물 열사병 예방 및 응급 처치 가이드",
      "대한수의사회 반려동물 하절기 건강 관리 자료",
      "농림축산검역본부 반려동물 건강관리 정보 qia.go.kr",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-07T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 289 / Cat5 / Macro-G(큐레이션) / Lens-L6 / Hook-H1 / Outro-O1 / Angle-RA8
  {
    id: "blog-289",
    slug: "dog-nail-trimming-complete-guide",
    type: "blog",
    category: 5,
    title: "강아지 발톱 관리 완전 가이드 — 직접 자르는 방법과 주기",
    subtitle: "발톱 자르는 적정 길이 기준, 혈관 위치 확인법, 과도하게 자른 경우 응급 처치",
    metaTitle: "강아지 발톱 자르는 방법과 주기 완전 가이드 | 펫지기",
    metaDescription: "강아지 발톱 관리 방법, 적정 길이 기준, 혈관(퀵) 확인법, 발톱 너무 자른 경우 응급 처치, 발톱 자르는 빈도를 정리했습니다.",
    body: `<p>발톱 소리가 바닥에 딸깍딸깍 들리기 시작했다면 너무 자란 것이다. 많은 보호자가 발톱 관리를 두려워해서 미루지만, 길어진 발톱은 관절 부담을 주고 보행 자세를 변형시킬 수 있다. 이 글은 집에서 안전하게 발톱을 관리하는 방법을 단계별로 정리한다.</p>

<div class="callout-cat">
<strong>발톱이 너무 자랐다는 신호</strong><br>
• 바닥에 발톱 소리가 날 때<br>
• 앉을 때 발이 자연스럽지 않고 꺾임<br>
• 발톱이 발바닥 패드 방향으로 굽기 시작<br>
• 걸을 때 자꾸 발을 들어 올림
</div>

<h2>발톱 자르기 전 준비물</h2>
<ul>
<li><strong>반려동물 전용 발톱깎이</strong>: 가위형(소형견) 또는 기요틴형(중·대형견). 사람 것은 발톱을 으스러뜨릴 수 있어 절대 사용 금지</li>
<li><strong>지혈제(스테이프틱 또는 밀가루)</strong>: 혈관을 자른 경우 응급용</li>
<li><strong>밝은 손전등</strong>: 혈관(퀵) 위치 확인용 (흰색 발톱에 유용)</li>
<li><strong>간식</strong>: 발톱 자르기 전후 보상용</li>
</ul>

<h2>혈관(퀵) 위치 확인하기</h2>
<ul>
<li><strong>흰색·투명 발톱</strong>: 분홍색 혈관이 육안으로 보임. 혈관 끝에서 2mm 여유를 두고 자름</li>
<li><strong>검정·어두운 발톱</strong>: 혈관이 안 보임. 조금씩 잘라가면서 자른 단면 관찰. 단면에 흰색 점이 보이면 혈관 근처 — 중단</li>
</ul>

<h2>발톱 자르기 단계</h2>
<ol style="padding-left:1.2rem;">
<li>강아지를 옆으로 눕히거나 무릎에 앉히기 (편안한 자세)</li>
<li>발목을 가볍게 잡고 발톱을 빛에 비춰 혈관 위치 확인</li>
<li>45도 각도로 끝부분부터 조금씩 자름</li>
<li>자를 때마다 단면 확인 — 흰색 점이 보이면 중단</li>
<li>거친 면은 손톱 파일로 정리</li>
<li>완료 후 간식으로 보상</li>
</ol>

<div class="key-summary">
<strong>📋 강아지 크기별 발톱 관리 주기</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-5-soft,#dfe9e2);">
<th style="padding:8px;border:1px solid var(--brand-border);">견종</th>
<th style="padding:8px;border:1px solid var(--brand-border);">활동량</th>
<th style="padding:8px;border:1px solid var(--brand-border);">권장 주기</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">소형견 (실내)</td><td style="padding:8px;border:1px solid var(--brand-border);">낮음</td><td style="padding:8px;border:1px solid var(--brand-border);">2~3주마다</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">중·대형견 (야외)</td><td style="padding:8px;border:1px solid var(--brand-border);">높음</td><td style="padding:8px;border:1px solid var(--brand-border);">4~6주마다 (마모로 느림)</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">노령견</td><td style="padding:8px;border:1px solid var(--brand-border);">낮음</td><td style="padding:8px;border:1px solid var(--brand-border);">2주마다 (자주 확인)</td></tr>
</tbody></table>
</div>

<h2>자주 묻는 질문</h2>
<h3>혈관을 잘라 피가 났어요. 어떻게 해야 하나요?</h3>
<p>당황하지 말고: 지혈제(스테이프틱)를 발라 5~10분 압박한다. 없으면 밀가루나 전분을 발라도 된다. 출혈이 10분 이상 멈추지 않으면 동물병원에 방문한다. 강아지에게 긍정적 반응("잘했어!")을 보여줘 다음 번 거부감을 줄인다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-paw-care-guide">강아지 발바닥 관리 완전 가이드 — 갈라짐·화상·이물질 대처법</a><br>
<a href="/blog/dog-grooming-types-guide">강아지 미용 종류와 주기 — 견종별 관리법</a><br>
<a href="/blog/dog-bath-guide">강아지 목욕 주기와 방법 — 집에서 안전하게 씻기는 완전 가이드</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AVMA — 반려동물 발톱 관리 가이드",
      "대한수의사회 반려동물 케어 자료",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-07T12:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 290 / Cat5 / Macro-C(통계) / Lens-L1 / Hook-H2(stat) / Outro-O4 / Angle-RA1
  {
    id: "blog-290",
    slug: "dog-obesity-prevention-activity-guide",
    type: "blog",
    category: 5,
    title: "강아지 비만 예방 — 체중 관리와 적정 운동량의 현실적인 기준",
    subtitle: "BCS 점수 측정법, 견종별 운동 권장량, 살 안 빠지는 이유, 간식 칼로리 함정",
    metaTitle: "강아지 비만 예방 체중 관리 운동량 가이드 | 펫지기",
    metaDescription: "강아지 비만 판정 기준(BCS), 견종별 적정 운동량, 체중 감량이 안 되는 이유, 간식 칼로리 관리 방법을 정리했습니다.",
    body: `<p>국내 반려견의 약 25~40%가 과체중 또는 비만이라는 연구 결과가 있다(대한수의사회). 비만은 관절 질환, 당뇨, 심장 질환, 암 발생률을 높이고 평균 수명을 최대 2년 단축시킨다. 그러나 "통통한 게 귀엽다"는 인식으로 보호자가 인지하지 못하는 경우가 많다.</p>

<div class="callout-cat">
<strong>집에서 비만 여부 확인하는 방법 (BCS)</strong><br>
양손으로 갈비뼈를 양쪽에서 감싸본다.<br>
• <strong>정상</strong>: 갈비뼈가 손가락에 닿음 (살짝 지방층 있음)<br>
• <strong>과체중</strong>: 지방층이 두꺼워 갈비뼈가 안 닿음<br>
• <strong>비만</strong>: 허리 라인이 보이지 않고 복부가 늘어짐
</div>

<h2>견종별 적정 운동량 기준</h2>
<p>단순히 "많이 산책하면 된다"는 것은 반만 맞다. 운동량보다 식이 칼로리 관리가 체중에 더 큰 영향을 준다. 그러나 근육량 유지와 신진대사 활성화를 위해 품종에 맞는 운동이 필요하다.</p>

<div class="key-summary">
<strong>📊 견종별 일일 운동 권장량</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-5-soft,#dfe9e2);">
<th style="padding:8px;border:1px solid var(--brand-border);">그룹</th>
<th style="padding:8px;border:1px solid var(--brand-border);">견종 예</th>
<th style="padding:8px;border:1px solid var(--brand-border);">일일 운동량</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">저활동 소형견</td><td style="padding:8px;border:1px solid var(--brand-border);">시츄, 불도그, 페키니즈</td><td style="padding:8px;border:1px solid var(--brand-border);">30분 이내 산책</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">중활동 소형·중형</td><td style="padding:8px;border:1px solid var(--brand-border);">말티즈, 비글, 코커스파니엘</td><td style="padding:8px;border:1px solid var(--brand-border);">30~60분</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">고활동 중·대형</td><td style="padding:8px;border:1px solid var(--brand-border);">래브라도, 골든, 보더콜리</td><td style="padding:8px;border:1px solid var(--brand-border);">60~90분 이상</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">노령견 (7세+)</td><td style="padding:8px;border:1px solid var(--brand-border);">모든 견종</td><td style="padding:8px;border:1px solid var(--brand-border);">20~30분 저강도</td></tr>
</tbody></table>
<p style="font-size:0.85rem;color:var(--brand-text-secondary);margin-top:0.5rem;">출처: AVMA 반려견 운동 가이드라인</p>
</div>

<h2>살이 안 빠지는 이유 — 보호자가 놓치는 것</h2>
<ul>
<li><strong>간식 칼로리 계산 누락</strong>: 간식·보상 식품의 칼로리를 식사에서 빼지 않으면 총 섭취량이 초과됨</li>
<li><strong>사료 컵 계량 오차</strong>: 종이컵이나 어림으로 재면 30~50% 오차가 생김 → 그램 저울 사용</li>
<li><strong>가족 중 몰래 주는 사람</strong>: 모든 가족이 간식 제한에 동참해야 효과</li>
<li><strong>운동만으로 해결 시도</strong>: 칼로리 초과 없이는 운동만으로 감량이 어렵다</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>수의사가 "좀 살 빼세요"라고 했는데 어디서 시작해야 하나요?</h3>
<p>1단계: 현재 사료의 하루 급여량을 그램 저울로 측정한다. 2단계: 사료 포장지의 권장 급여량(현재 체중이 아닌 목표 체중 기준)으로 조정한다. 3단계: 간식을 하루 총 칼로리의 10% 이내로 제한한다. 이 세 가지만 지켜도 첫 한 달에 차이가 난다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-daily-calorie-guide">강아지 하루 칼로리 계산법 — 비만 예방의 첫걸음</a><br>
<a href="/blog/dog-walk-guide">강아지 산책 완전 가이드 — 거리·횟수·목줄 선택까지</a><br>
<a href="/blog/dog-food-transition-method">강아지 사료 교체 방법 — 소화 문제 없이 새 사료로 바꾸는 7~10일 가이드</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "대한수의사회 반려견 비만 실태 및 관리 자료",
      "AVMA — 반려견 체중 관리 및 운동 가이드라인",
      "WSAVA 영양 가이드라인 — 반려동물 비만 판정 기준(BCS)",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-07T13:00:00.000Z",
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
  console.log("블로그 포스트 33차 시딩 완료! (blog-286 ~ blog-290)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
