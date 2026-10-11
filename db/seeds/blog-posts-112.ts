import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 112 — cat3×1 + cat5×2 + cat4×1 + cat2×1 = 5편 (IDs 681-685)
// Macros: D, F, F, C, G
// Angles: RA1, RA3, RA7, RA5, RA2

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-681",
    slug: "dog-insulinoma-low-glucose",
    type: "blog",
    category: 3,
    title: "강아지 인슐린종 — 저혈당 발작이 반복될 때",
    subtitle: "인슐린종 원인, 저혈당 증상, 응급 혈당 처치, 수술·약물 치료 비교",
    metaTitle: "강아지 인슐린종 — 저혈당 발작 원인·응급 처치·치료 가이드 | 펫지기",
    metaDescription: "강아지 인슐린종 원인과 치료. 췌장 인슐린 분비 종양으로 인한 저혈당 발작 증상, 응급 혈당 처치 방법, 수술 vs 약물 치료 선택 기준을 설명합니다.",
    body: `<p>인슐린종은 췌장의 베타세포에서 생기는 종양으로, 인슐린이 과하게 분비되어 혈당이 위험할 정도로 떨어진다. 중년 이상의 대형견에서 흔한 편이며, 평소에는 멀쩡해 보이다가 갑자기 쓰러지는 식으로 나타나 보호자가 알아차리기 어렵다.</p>

<h2>증상은 저혈당 때문에 생긴다</h2>
<ul>
<li>허약, 비틀거림, 근육 떨림</li>
<li>무기력, 멍한 모습, 운동하기 싫어함</li>
<li>쓰러짐, 발작 (심하면 의식 소실)</li>
</ul>
<p>수의학 자료에 따르면 저혈당 증상은 흥분, 운동, 공복 시간이 길 때 유발되기도 하며, 증상 사이에는 정상으로 보일 수 있다. 혈당이 급격히 떨어지면 신경 증상이 먼저 나타난다. 저혈당이 길게 지속되면 뇌 손상이 남을 수 있다.</p>

<div class="callout-dog">
<strong>쓰러지거나 발작할 때</strong><br>
• 즉시 동물병원으로 가며 출발 전에 전화로 상황을 알린다<br>
• 개가 의식이 있고 삼킬 수 있으면 수의사 지시에 따라 소량의 당분(시럽 등)을 잇몸에 묻히는 방법을 안내받는다 — 의식이 없을 때 입에 억지로 넣으면 질식 위험이 있다<br>
• 호전되어도 반드시 진료를 받는다
</div>

<h2>진단</h2>
<ol>
<li>공복 혈당 측정에서 혈당이 낮은데 인슐린이 비정상적으로 높거나 정상 범위인 경우를 확인한다.</li>
<li>복부 초음파·CT로 췌장 종양과 전이를 평가한다.</li>
<li>저혈당을 일으키는 다른 원인(간 질환, 패혈증, 부신 기능 저하증, 다른 종양)을 배제한다.</li>
</ol>

<h2>치료</h2>
<table>
<thead><tr><th>방법</th><th>내용</th></tr></thead>
<tbody>
<tr><td>응급 치료</td><td>병원에서 포도당을 정맥으로 투여하고 수액으로 혈당을 안정화한다</td></tr>
<tr><td>수술</td><td>가능하면 췌장 종양을 제거한다. 전이가 있으면 완치는 어렵다</td></tr>
<tr><td>약물</td><td>스테로이드 등으로 혈당을 올리는 약물을 장기 복용한다</td></tr>
<tr><td>식이 관리</td><td>소량씩 자주 급여해 혈당을 안정적으로 유지한다. 당분이 많은 간식은 오히려 인슐린 분비를 자극할 수 있어 수의사 지침을 따른다</td></tr>
</tbody>
</table>

<h2>집에서 관리</h2>
<ul>
<li>식사를 소량씩 여러 번으로 나누고 거르지 않게 한다.</li>
<li>격렬한 운동과 흥분을 피한다.</li>
<li>발작·쓰러짐이 있었던 날짜와 상황을 기록한다.</li>
<li>비상 연락처와 응급 병원 위치를 미리 확인한다.</li>
</ul>

<h2>마지막으로</h2>
<p>인슐린종은 완치가 어려운 경우가 많지만 수술과 약물, 식이 관리로 삶의 질을 유지할 수 있다. 쓰러짐이 반복되면 저혈당을 의심하고 검사를 받자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://en.wikivet.net/Insulinoma — WikiVet, Insulinoma",
      "https://www.vetmed.msstate.edu/sites/www.vetmed.msstate.edu/files/presentations/2.10.17%20Insulinoma%20in%20the%20Canine%20%28Tim%20Sullivan%29.pdf — Mississippi State 수의대, Insulinoma in the Canine",
      "https://www.vosd.in/insulinoma-in-dogs — VOSD, Insulinoma in Dogs",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 발작 시 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-12-21T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-682",
    slug: "dog-hot-pavement-paw-burn",
    type: "blog",
    category: 5,
    title: "강아지 여름 아스팔트 발바닥 화상 — 2초 테스트와 예방",
    subtitle: "아스팔트 표면 온도 현실, 2초 테스트, 화상 징후, 산책 시간대·경로 조정",
    metaTitle: "강아지 여름 발바닥 화상 — 2초 테스트와 아스팔트 온도 현실 | 펫지기",
    metaDescription: "강아지 여름 아스팔트 발바닥 화상 예방 방법. 기온 30도 이상 아스팔트 표면 온도, 2초 테스트, 발바닥 화상 징후, 산책 시간·경로 조정 방법을 정리했습니다.",
    body: `<p>한여름의 아스팔트와 콘크리트, 모래는 공기 온도보다 훨씬 뜨거워질 수 있다. 맨발로 걷는 강아지의 발바닥은 짧은 시간에도 화상을 입을 수 있다. 산책 전 간단한 확인과 대처법을 알아 두자.</p>

<h2>왜 위험한가</h2>
<p>햇볕을 받은 아스팔트는 기온보다 훨씬 뜨거워진다. 보도에 따르면 기온이 20도대 후반~30도 안팎에서도 지면이 위험한 수준으로 달궈질 수 있다. 발바닥 패드는 두껍지만 화상으로부터 완전히 보호되지는 않는다.</p>

<h2>7초 테스트</h2>
<div class="callout-dog">
<strong>손등을 지면에 7초간 대 본다</strong><br>
• 7초를 참기 어렵다면 강아지에게도 너무 뜨겁다<br>
• 이 방법은 대략적인 확인이며, 개가 실제로 밟을 햇볕 드는 지면에서 확인한다<br>
• 검은 아스팔트, 모래, 철제 바닥, 인조 잔디는 특히 뜨겁다
</div>

<h2>화상 신호</h2>
<ul>
<li>절뚝이거나 걷기를 거부한다</li>
<li>발바닥을 핥거나 물어뜯는다</li>
<li>발바닥 패드가 붉거나 물집이 잡힌다, 껍질이 벗겨지거나 색이 어두워진다</li>
<li>발을 들고 있거나 걷다 멈춘다</li>
</ul>

<h2>예방</h2>
<ul>
<li>산책 시간을 이른 아침이나 해진 뒤로 옮긴다.</li>
<li>풀밭, 그늘, 흙길을 고른다.</li>
<li>강아지용 신발이나 발바닥 보호 왁스를 쓴다 (신발은 미리 적응 훈련을 한다).</li>
<li>더운 날은 산책을 짧게 하고 물을 챙긴다.</li>
<li>차량 짐칸이나 철제 바닥에 올려 두지 않는다.</li>
</ul>

<h2>화상을 입었을 때</h2>
<ol>
<li>즉시 그늘로 옮기고 걷지 못하게 한다. 필요하면 안아서 이동한다.</li>
<li>흐르는 시원한 물(차가운 얼음물이 아닌 시원한 물)로 발을 식힌다.</li>
<li>핥지 못하게 넥칼라를 씌우고 발을 깨끗한 천으로 느슨하게 감싼다.</li>
<li>물집, 심한 붓기, 패드가 벗겨졌다면 병원에 간다. 화상 부위에 연고를 임의로 바르지 않는다.</li>
</ol>

<h2>마지막으로</h2>
<p>손등 테스트를 습관으로 하고, 뜨거운 시간대를 피하면 발바닥 화상 대부분을 막을 수 있다. 열사병 예방은 <a href="/guide/pet-heatstroke-prevention-complete-guide">반려동물 열사병 예방·응급 가이드</a>를 함께 참고하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동·케어 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.webvet.com/hot-pavement-and-dog-paws/ — WebVet, Hot pavement and dog paws",
      "https://wjla.com/features/for-pets-sake/protecting-your-dogs-paws-during-summer-heat — WJLA, Protecting your dog's paws during summer heat",
      "https://www.kfvs12.com/2026/06/23/hot-pavement-can-burn-dogs-paws-less-than-minute/ — KFVS12, Hot pavement can burn dogs' paws in less than a minute",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-22T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-683",
    slug: "pet-friendly-accommodation-selection",
    type: "blog",
    category: 5,
    title: "반려동물 동반 숙박 선택 기준 — 체크하지 않으면 낭패",
    subtitle: "숙박 사전 확인 항목, 반려동물 체중·견종 제한, 추가 요금, 객실 환경 체크",
    metaTitle: "반려동물 동반 숙박 선택 기준 — 사전 확인 체크리스트 | 펫지기",
    metaDescription: "반려동물 동반 숙박 선택 시 확인해야 할 것들. 체중·견종 제한, 추가 요금, 객실 환경, 근처 산책 공간 등 놓치면 낭패 보는 체크리스트를 정리했습니다.",
    body: `<p>반려동물 동반 숙박이 가능하다고 표시된 곳도 세부 조건이 다 다르다. 미리 확인하지 않으면 도착해서 입장 거절을 당할 수 있다.</p>

<h2>예약 전 필수 확인 사항</h2>
<ul>
<li>허용 동물 종류 (강아지 only? 고양이 가능?)</li>
<li>체중 제한 (10kg 이하 only인 경우 흔함)</li>
<li>견종 제한 (맹견 지정 견종 입실 불가인 경우 있음)</li>
<li>동물 수 제한 (1마리 only?)</li>
<li>반려동물 추가 요금 여부와 금액</li>
</ul>

<h2>객실 환경 확인</h2>
<div class="callout-dog">
<strong>반려동물 동반 객실 체크포인트</strong><br>
• 객실 내 반려동물 전용 침구 제공 여부<br>
• 발코니·창문 탈출 방지 여부 확인<br>
• 이전 반려동물 냄새 (후기 참고)<br>
• 카펫 vs 바닥재 (미끄럼·청소 관련)<br>
• 반려동물 혼자 두기 정책 (외출 시 케이지 필요 여부)
</div>

<h2>주변 환경 확인</h2>
<ul>
<li>근처 산책 가능 공간 여부</li>
<li>반려동물 동반 식당 또는 테라스 좌석</li>
<li>근처 동물병원 위치 (긴급 상황 대비)</li>
</ul>

<h2>준비물 체크리스트</h2>
<ul>
<li>이동 가방·케이지 (이동 중 안전)</li>
<li>평소 사료·물그릇 (낯선 환경 식이 변화 최소화)</li>
<li>배변패드·봉투 다수</li>
<li>좋아하는 장난감·담요 (안정감)</li>
<li>동물등록증·예방접종 증명서 (일부 숙박에서 요구)</li>
</ul>

<h2>마지막으로</h2>
<p>사전에 전화 또는 메시지로 구체적인 조건을 확인하는 것이 온라인 안내보다 정확하다. 현장 도착 후 거절은 여행 전체를 망칠 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동·케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물문화협회 반려동물 동반 여행 안전 가이드",
      "한국관광공사 반려동물 동반 관광 실태 조사 (2023)",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-22T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-684",
    slug: "pet-medical-expense-tax-info",
    type: "blog",
    category: 4,
    title: "반려동물 의료비 세액공제 — 현재 공제 대상 여부 총정리",
    subtitle: "현행 세액공제 적용 여부, 입법 논의 현황, 실제 절세 가능한 방법",
    metaTitle: "반려동물 의료비 세액공제 — 현재 가능한가? 현황 총정리 | 펫지기",
    metaDescription: "반려동물 의료비 세액공제 현황을 정리했습니다. 현재 공제 여부, 입법 논의 진행 상황, 반려동물 관련 실제 절세 가능한 방법을 알기 쉽게 설명합니다.",
    body: `<p>반려동물 진료비는 부담이 큰데, 연말정산에서 공제받을 수 있는지 문의가 많다. 세법은 자주 바뀌므로 이 글은 확인된 현황과 한계를 정리한다. 실제 적용은 국세청이나 세무사를 통해 최신 세법으로 확인해야 한다.</p>

<h2>현재 공제 가능한가</h2>
<p>현행 연말정산의 의료비 세액공제는 사람의 의료비를 대상으로 하며, 일반적으로 반려동물 진료비는 공제 대상이 아니라고 안내된다. 반려동물 진료비에 대한 세제 혜택은 법안과 공약 단계에서 여러 차례 논의되어 왔다.</p>

<table>
<thead><tr><th>구분</th><th>내용</th></tr></thead>
<tbody>
<tr><td>세액공제 법안 (2026년 3월 보도)</td><td>근로소득자의 반려동물 진료비 중 일정 금액을 넘는 부분에 세액공제를 적용하는 소득세법 개정안이 발의되었다는 보도가 있다. 국회 처리 여부는 별도로 확인해야 한다</td></tr>
<tr><td>부가가치세 면세</td><td>진료 항목 표준화가 선행되어야 한다는 전망이 있었고, 면세 법안이 회기 만료로 폐기된 사례가 보도되었다</td></tr>
<tr><td>과거 정당 공약</td><td>소득공제·면세 공약이 발표된 적이 있으나 시행된 제도가 아니다</td></tr>
</tbody>
</table>

<div class="callout-dog">
<strong>주의</strong><br>
• 블로그나 SNS에서 '반려동물 진료비 연말정산 환급' 방법을 소개하는 글은 사실이 아닐 수 있다<br>
• 제도가 도입되더라도 대상 항목, 한도, 증빙(진료비 세부내역서) 요건이 정해진다
</div>

<h2>지금 할 수 있는 비용 대비책</h2>
<ul>
<li><strong>진료비 기록 보관</strong>: 영수증과 진료비 세부내역서를 보관해 두면 제도가 도입될 때 증빙으로 쓸 수 있다.</li>
<li><strong>펫보험</strong>: 보장 범위와 면책 항목을 확인하고 비교한다 (<a href="/insurance/compare">펫보험 비교</a>).</li>
<li><strong>예비 자금</strong>: 매달 일정 금액을 반려동물 의료비 용도로 저축한다.</li>
<li><strong>진료비 절약</strong>: 정기 검진과 예방으로 큰 지출을 줄인다 (<a href="/blog/vet-cost-saving-guide">병원비 절약 가이드</a>).</li>
<li><strong>지자체 지원</strong>: 일부 지자체는 중성화, 동물등록, 취약계층 진료비 등을 지원한다. 거주지 지자체 공고를 확인한다.</li>
</ul>

<h2>마지막으로</h2>
<p>제도가 바뀌면 새 규정을 확인해야 한다. 지금은 공제를 기대하기보다 영수증을 보관하고 보험과 예비 자금으로 대비하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 보험·법률 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.dailyvet.co.kr/print?id=275594 — 데일리벳, 반려동물 진료비 세액공제 적용 추진",
      "https://www.taxwatch.co.kr/article/tax/2022/10/05/0003 — 택스워치, 반려동물 진료비 부가세 면세 관련",
      "https://www.dailyvet.co.kr/?p=126530 — 데일리벳, 반려동물 진료비 관련 세제",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-23T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-685",
    slug: "dog-fiber-constipation-diarrhea",
    type: "blog",
    category: 2,
    title: "강아지 식이섬유 — 변비와 설사 양방향 관리",
    subtitle: "수용성·불용성 식이섬유 차이, 변비 시 섬유 활용, 설사 시 섬유 활용, 급원 선택",
    metaTitle: "강아지 식이섬유 — 변비·설사 양방향 관리 방법 | 펫지기",
    metaDescription: "강아지 식이섬유의 변비·설사 양방향 관리 방법. 수용성·불용성 식이섬유 차이, 변비 시와 설사 시 다른 섬유 선택법, 호박·사이리움 급원을 설명합니다.",
    body: `<p>식이섬유는 변비를 해결하는 데만 쓰는 것이 아니다. 올바른 종류를 선택하면 설사에도, 변비에도 도움이 된다.</p>

<h2>식이섬유 두 종류</h2>
<ul>
<li><strong>수용성 식이섬유</strong>: 물에 녹아 겔을 형성, 장 통과 속도 조절, 변을 부드럽게, 프리바이오틱 역할 (예: 사이리움, 사탕무 펄프, 이눌린)</li>
<li><strong>불용성 식이섬유</strong>: 물에 녹지 않음, 장 운동 자극, 부피 증가로 변비 해소 (예: 쌀겨, 귀리 겨)</li>
</ul>

<h2>변비 시 식이섬유 활용</h2>
<div class="callout-dog">
<strong>강아지 변비 — 식이섬유 도움 방법</strong><br>
• 호박 퓨레(통조림 무가당): 수용성+불용성 혼합, 소량(1~2 티스푼)부터<br>
• 사이리움 허스크: 반드시 충분한 물과 함께 (물 없으면 악화)<br>
• 수분 섭취 증가: 습식 사료 추가 또는 물 급여량 확인<br>
▶ 3일 이상 변을 보지 못하면 수의사 진료 필요
</div>

<h2>설사 시 식이섬유 활용</h2>
<ul>
<li>수용성 식이섬유(사이리움, 사탕무 펄프): 장 내 수분을 흡수해 변 성상 안정화</li>
<li>호박 퓨레: 급성 설사 시 소량 사용 가능</li>
<li>프로바이오틱스와 병행 효과적</li>
<li>48시간 이상 설사 지속, 혈변, 무기력 동반 시 수의사 진료</li>
</ul>

<h2>과다 섭유 섭취 주의</h2>
<ul>
<li>과다 섭취 시 장 내 가스, 복부 팽만</li>
<li>미네랄 흡수 방해 가능 (과다 시)</li>
<li>항상 소량부터 시작해 반응 확인</li>
</ul>

<h2>사료 내 섬유 함량 확인</h2>
<p>사료 성분표의 조섬유(Crude Fiber) 수치는 실제 총 식이섬유의 일부만 반영한다. 사탕무 펄프·사이리움이 성분표에 보이면 발효성 섬유가 포함된 것이다.</p>

<h2>마지막으로</h2>
<p>식이섬유는 약이 아니지만 장 건강의 기초다. 소화 문제가 반복된다면 섬유 종류와 양을 점검해보자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물영양학회 강아지 소화기 건강을 위한 식이섬유 가이드라인",
      "Fahey, G.C. et al. — Dietary fiber and prebiotics in companion animals. J Anim Sci 2004",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-23T11:00:00.000Z",
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
  console.log("블로그 포스트 112차 시딩 완료! (blog-681 ~ blog-685)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
