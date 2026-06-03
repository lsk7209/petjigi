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
    body: `<p>강아지가 아무런 이유 없이 발작을 하거나, 허약해지거나, 비틀거린다면 저혈당이 원인일 수 있다. 그리고 그 원인 중 하나가 인슐린종이다.</p>

<h2>인슐린종이란</h2>
<p>인슐린종(Insulinoma)은 췌장의 인슐린 분비 세포(베타 세포)에서 발생하는 종양이다. 종양이 인슐린을 과도하게 분비해 혈당이 비정상적으로 낮아진다. 중·노령 중대형견에서 더 흔하다.</p>

<h2>저혈당 증상</h2>
<div class="callout-dog">
<strong>인슐린종 저혈당 증상 — 응급 신호</strong><br>
• 갑작스러운 무기력, 힘이 빠짐<br>
• 비틀거림, 넘어짐<br>
• 경련·발작<br>
• 의식 저하<br>
▶ 발작 중 포도당(꿀 한 스푼, 콘시럽)을 잇몸에 바르고 즉시 응급 병원으로
</div>

<h2>진단</h2>
<ul>
<li>혈당 측정: 공복 저혈당 확인 (60 mg/dL 미만)</li>
<li>인슐린 수치 동시 측정: 혈당 낮은데 인슐린 높으면 인슐린종 강력 의심</li>
<li>복부 초음파: 췌장 내 종괴 확인</li>
<li>CT: 췌장 종괴 위치, 전이 여부 평가</li>
</ul>

<h2>치료 선택</h2>
<ul>
<li><strong>수술(췌장 종괴 절제)</strong>: 완치 또는 장기 관해 가능성, 전이 없을 때 우선 고려</li>
<li><strong>약물 치료</strong>: 디아족사이드(인슐린 분비 억제), 수술 불가 시 또는 보조 치료</li>
<li><strong>식이 관리</strong>: 소량 잦은 급여로 혈당 안정화, 단순당 제한</li>
</ul>

<h2>예후</h2>
<p>수술로 종괴를 제거해도 재발 위험이 있으며 중간 생존 기간은 1~2년이다. 전이가 있는 경우 약물로 증상 조절에 집중한다.</p>

<h2>마지막으로</h2>
<p>저혈당 발작은 뇌 손상을 일으킬 수 있다. 반복적인 발작이나 의식 저하는 즉각 응급 처치가 필요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Polton, G.A. et al. — Insulin-secreting tumours of the canine pancreas. Vet Comp Oncol 2007",
      "한국수의내과학회 강아지 인슐린종 진단 및 치료 가이드라인",
    ]),
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
    body: `<p>기온이 30°C를 넘는 날 아스팔트 표면 온도는 50~70°C를 웃돈다. 강아지 발바닥은 두껍지만 이 온도에서는 수 분 만에 화상을 입을 수 있다.</p>

<h2>아스팔트 표면 온도 현실</h2>
<ul>
<li>기온 30°C → 아스팔트 60°C 이상 가능</li>
<li>기온 35°C → 아스팔트 70°C 이상 가능</li>
<li>콘크리트는 아스팔트보다 약 5~10°C 낮음 (그래도 위험)</li>
<li>그늘진 곳: 훨씬 낮음 — 경로 설계 핵심</li>
</ul>

<h2>2초 테스트</h2>
<div class="callout-dog">
<strong>산책 전 2초 테스트</strong><br>
손등(손바닥 아닌 손등)을 아스팔트에 7초 댄다.<br>
• 7초 버틸 수 없으면 → 강아지 발바닥도 위험<br>
• 7초 버틸 수 있어도 30분 이상 걷기는 위험<br>
▶ 오전 10시 이전, 오후 6시 이후 산책이 안전합니다
</div>

<h2>발바닥 화상 징후</h2>
<ul>
<li>산책 중 또는 귀가 후 절뚝거림</li>
<li>발을 들고 걷거나 걷기 거부</li>
<li>발바닥 과도하게 핥기</li>
<li>발바닥 패드 붉어짐, 부어오름, 물집, 벗겨짐</li>
</ul>

<h2>화상 시 응급 처치</h2>
<ul>
<li>즉시 시원한 물로 발 식히기 (얼음 금지)</li>
<li>추가 자극 없이 안정</li>
<li>수의사 연락: 화상 정도에 따라 항생제·붕대 처치 필요</li>
</ul>

<h2>예방 방법</h2>
<ul>
<li>아침·저녁 산책 시간대 선택</li>
<li>잔디·흙 경로 우선 선택</li>
<li>강아지 부티: 여름에도 유효, 착용 훈련 필요</li>
<li>포 왁스(발바닥 보호크림): 여름도 사용 가능</li>
</ul>

<h2>마지막으로</h2>
<p>강아지는 뜨겁다고 말하지 못한다. 보호자가 먼저 확인해야 한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동·케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물수의사회 여름철 반려동물 안전 관리 지침",
      "Journal of the American Veterinary Medical Association — Thermal burns in dogs from hot surfaces",
    ]),
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
    body: `<p>반려동물 의료비가 수십만 원, 수백만 원이 드는 경우도 있다. "이 비용을 세액공제 받을 수 있을까?"라는 질문을 많이 한다. 현재 상황을 정확히 정리해보자.</p>

<h2>현재 상황: 공제 안 됩니다</h2>
<p>2026년 현재, 반려동물 의료비는 소득세법상 의료비 세액공제 대상이 아니다. 의료비 세액공제는 사람(본인 및 부양가족)을 위한 의료비에 한정된다. 반려동물은 부양가족으로 인정되지 않는다.</p>

<h2>입법 논의 현황</h2>
<div class="callout-dog">
<strong>반려동물 의료비 세제 혜택 관련 논의</strong><br>
• 반려동물 의료비 세액공제 법안이 국회에서 여러 차례 발의<br>
• 2022~2024년 관련 개정 법안 제출 이력 있음<br>
• 현재까지 본회의 통과 없이 계류 중<br>
▶ 입법이 이루어지기 전까지는 공제 불가 — 국회 입법 현황 모니터링 필요
</div>

<h2>반려동물 관련 실제 절세 가능한 항목</h2>
<ul>
<li><strong>사업자 등록 반려동물 관련 업종</strong>: 업무 관련 동물 의료비·용품비 사업 경비 처리 가능 (세무사 상담 필요)</li>
<li><strong>펫보험 보험료</strong>: 현재 보험료 소득공제 해당 없음 (보장성 보험 공제 대상 아님)</li>
<li><strong>반려동물 관련 부가가치세</strong>: 동물병원 진료비는 부가세 면세 (이미 적용 중)</li>
</ul>

<h2>동물병원 진료비 부가세 면세</h2>
<p>동물병원 진료·수술·입원비는 부가가치세가 면세다. 다만 미용·호텔·훈련 서비스는 부가세 과세 대상이다.</p>

<h2>마지막으로</h2>
<p>반려동물 의료비 세액공제는 아직 현실이 아니다. 법 개정 동향을 관심 있게 지켜보고, 현재 가능한 절세 방법(펫보험 가입으로 실질 부담 경감 등)을 활용하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 보험·법률 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "국세청 의료비 세액공제 적용 대상 안내",
      "국회 의안정보시스템 반려동물 의료비 세액공제 관련 발의 법안 현황",
    ]),
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
