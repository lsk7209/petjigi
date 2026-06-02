import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 82 — cat3×2 + cat4×1 + cat5×1 + cat1×1 = 5편 (IDs 531-535)
// Macros: D, A, F, B, E
// Angles: RA2, RA7, RA3, RA4, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-531",
    slug: "dog-diabetes-management",
    type: "blog",
    category: 3,
    title: "강아지 당뇨 관리 — 인슐린 투여부터 혈당 모니터링까지",
    subtitle: "강아지 당뇨 원인, 인슐린 투여 방법, 혈당 목표치, 저혈당 응급 대처",
    metaTitle: "강아지 당뇨 관리 — 인슐린 투여·혈당 모니터링 완전 가이드 | 펫지기",
    metaDescription: "강아지 당뇨 진단 후 관리 방법을 정리했습니다. 인슐린 투여 방법, 혈당 목표치, 식이 관리, 저혈당 응급 대처법을 알아보세요.",
    body: `<p>강아지 당뇨는 진단 초기는 혼란스럽지만, 방법을 익히면 일상적으로 관리할 수 있다. 인슐린 투여를 두려워하는 보호자들이 많지만, 대부분 수 주 내에 익숙해진다.</p>

<h2>강아지 당뇨의 특징</h2>
<p>대부분 인슐린 의존성(Type 1 유사)으로, 췌장이 충분한 인슐린을 생산하지 못한다. 인슐린 투여가 표준 치료다. 비중성화 암컷에서 더 흔하며, 중성화 후 당뇨가 개선되는 경우도 있다.</p>

<h2>인슐린 투여 방법</h2>
<div class="callout-dog">
<strong>인슐린 투여 기본 원칙</strong><br>
• 식사 후 즉시 투여 (식욕 확인 후)<br>
• 주사 부위: 목덜미 또는 옆구리 피하<br>
• 매 투여 위치를 약간씩 변경 (피부 경화 예방)<br>
• 먹지 않으면 투여 전 수의사 상담<br>
• 개봉 인슐린은 냉장 보관, 흔들지 않기 (서서히 굴리기)
</div>

<h2>혈당 모니터링</h2>
<ul>
<li>혈당곡선(glucose curve): 12시간 주기 혈당 측정 — 인슐린 용량 조절의 기준</li>
<li>목표 혈당: 공복 100~250mg/dL (수의사 기준에 따라)</li>
<li>연속혈당측정기(CGM) 활용 가능 (리브레 센서 일부 적용)</li>
</ul>

<h2>저혈당 응급 대처</h2>
<ul>
<li>증상: 흔들림·비틀거림·의식 저하·발작</li>
<li>즉시: 꿀·시럽을 잇몸에 소량 발라 즉각 흡수 유도</li>
<li>이후 즉시 응급 동물병원</li>
<li>인슐린 투여 후 반드시 식사 확인이 예방의 핵심</li>
</ul>

<h2>마지막으로</h2>
<p>강아지 당뇨는 처음이 가장 어렵다. 혈당 목표와 인슐린 용량은 개별 조정이 필요하므로 초기에는 수의사와 긴밀히 소통하는 것이 중요하다. 잘 관리된 당뇨견은 수 년을 건강하게 산다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Behrend, E. et al. — Diagnosis of spontaneous canine hyperadrenocorticism: 2012 ACVIM consensus statement. J Vet Intern Med 2013",
      "한국수의내과학회 당뇨 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-07T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-532",
    slug: "cat-diabetes-insulin-guide",
    type: "blog",
    category: 3,
    title: "고양이 당뇨 — 인슐린 투여와 관해(Remission)를 위한 핵심 관리",
    subtitle: "고양이 당뇨 관해 가능성, 저탄수화물 식이, 인슐린 종류, 혈당 모니터링",
    metaTitle: "고양이 당뇨 관리 — 인슐린·저탄수 식이·관해 가능성 가이드 | 펫지기",
    metaDescription: "고양이 당뇨는 관해(완전 회복)가 가능한 경우가 있습니다. 인슐린 종류, 저탄수화물 식이, 혈당 모니터링, 관해를 위한 조기 집중 관리를 정리했습니다.",
    body: `<p>강아지와 달리 고양이 당뇨는 조기에 집중 관리하면 인슐린 투여를 중단할 수 있는 "관해(Remission)"에 이르는 경우가 있다. 이것이 고양이 당뇨 관리의 희망 포인트다.</p>

<h2>고양이 당뇨의 특징</h2>
<p>Type 2 유사 — 인슐린 저항성이 주요 원인. 비만, 실내 생활, 고탄수화물 식이가 위험 요인이다. 진단 후 적극적인 관리로 30~50%에서 관해 가능성이 있다는 연구가 있다.</p>

<h2>관해를 위한 핵심 전략</h2>
<div class="callout-cat">
<strong>관해 가능성을 높이는 방법</strong><br>
• 진단 직후 집중 인슐린 치료 (혈당 빠르게 정상화)<br>
• 저탄수화물·고단백 식이로 즉시 전환 (탄수화물 10% 이하 DM 기준)<br>
• 체중 감량 (비만이 인슐린 저항성의 원인)<br>
• 주 1회 이상 혈당 모니터링
</div>

<h2>저탄수화물 식이</h2>
<ul>
<li>습식 사료 중에서 탄수화물 낮은 것 선택</li>
<li>건식 사료는 탄수화물이 높아 당뇨 고양이에게 권장하지 않음</li>
<li>당뇨 처방식(힐스 m/d, 로얄캐닌 Diabetic) 활용</li>
</ul>

<h2>인슐린 종류</h2>
<ul>
<li><strong>프로징크(PZI)</strong>: 고양이 전용, 12시간마다 투여</li>
<li><strong>란투스(글라진)</strong>: 장시간 작용, 12시간마다</li>
<li><strong>인슐린N(NPH)</strong>: 저렴하나 작용 시간이 짧아 조절 어려움</li>
</ul>

<h2>마지막으로</h2>
<p>관해는 자동으로 오지 않는다. 진단 직후부터 철저한 식이 관리와 혈당 모니터링을 통해 적극적으로 추구해야 가능성이 열린다. 수의사와 함께 관해 목표를 공유하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Zini, E. et al. — Predictors of clinical remission in cats with diabetes mellitus. J Vet Intern Med 2010",
      "한국고양이수의사회 당뇨 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-08T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-533",
    slug: "pet-apartment-rules-dispute",
    type: "blog",
    category: 4,
    title: "아파트 반려동물 규정 분쟁 — 관리 규약과 법적 한계",
    subtitle: "공동주택 반려동물 규약 효력, 엘리베이터 이동 규정, 분쟁 시 권리 확인",
    metaTitle: "아파트 반려동물 규정 분쟁 — 관리 규약 효력과 권리 가이드 | 펫지기",
    metaDescription: "아파트 반려동물 관리 규약과 법적 한계를 정리했습니다. 엘리베이터 이동 규정, 품종·마리 수 제한 효력, 분쟁 발생 시 보호자의 권리를 알아보세요.",
    body: `<p>"우리 아파트 관리 규약에 반려동물 2마리 이상 금지"라는 말을 들었다. 이것이 법적 효력이 있을까?</p>

<h2>공동주택 관리 규약의 법적 위치</h2>
<p>공동주택관리법에 따라 아파트 입주자대표회의가 관리 규약을 제정할 수 있다. 그러나 이 규약은 입주자 다수결로 만들어지며, 상위 법률(헌법적 거주 이전의 자유 등)을 침해할 수 없다.</p>

<h2>규약으로 규제 가능한 것</h2>
<ul>
<li>엘리베이터 이동 시 이동장 사용 의무</li>
<li>공용 시설 사용 제한 (어린이 놀이터 등)</li>
<li>목줄 의무 착용</li>
<li>배설물 즉시 처리 의무</li>
</ul>

<h2>규약으로 규제가 어려운 것</h2>
<div class="callout-dog">
<strong>관리 규약의 한계</strong><br>
• 절대적 반려동물 사육 금지 → 주거권 침해 소지 있음<br>
• 특정 품종 일방적 금지 → 과도한 제한으로 이의 제기 가능<br>
• 마리 수 제한 → 법적 근거 불명확 (판례 없음)<br>
▶ 단, 실제 분쟁 시 법원 판단은 개별 사안에 따라 다를 수 있음
</div>

<h2>분쟁 시 대처 방법</h2>
<ul>
<li>관리 규약 원문 요청 및 법적 근거 확인</li>
<li>입주자대표회의 규약 변경 요구 (50% 이상 동의 시 가능)</li>
<li>국토교통부 공동주택관리 분쟁조정위원회 신청</li>
<li>필요 시 법률 전문가 상담</li>
</ul>

<h2>마지막으로</h2>
<p>관리 규약은 '관리'를 위한 것이지 '금지'를 위한 수단이 아니다. 실제 피해(소음·냄새)를 전제로 한 합리적 규제는 따라야 하지만, 과도한 제한에 대해서는 절차적으로 이의를 제기할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "공동주택관리법 제19조 (관리 규약) 및 관련 판례",
      "국토교통부 공동주택 관리 분쟁 조정 안내",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 법적 분쟁은 전문가에게 문의하세요.",
    status: "published",
    publishedAt: "2026-10-08T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-534",
    slug: "dog-swimming-water-safety",
    type: "blog",
    category: 5,
    title: "강아지 수영 안전 — 모든 강아지가 수영을 좋아하는 것은 아니다",
    subtitle: "수영 선호 품종, 강에서 바다 안전 주의, 구명조끼 필요성, 외이도 관리",
    metaTitle: "강아지 수영 안전 가이드 — 품종별 선호·구명조끼·귀 관리 | 펫지기",
    metaDescription: "강아지 수영 안전 가이드. 수영 좋아하는 품종과 싫어하는 품종, 강·바다 주의사항, 구명조끼 필요성, 수영 후 외이도 감염 예방법을 정리했습니다.",
    body: `<p>"강아지는 다 수영을 좋아한다"는 오해가 있다. 실제로 물을 무서워하거나 물에서 위험한 품종이 있다. 무작정 물에 넣는 것은 위험하다.</p>

<h2>수영을 즐기는 품종 vs 주의가 필요한 품종</h2>
<table>
<thead><tr><th>수영 선호</th><th>수영 주의</th></tr></thead>
<tbody>
<tr><td>래브라도, 골든</td><td>불독, 퍼그 (단두종 — 호흡 위험)</td></tr>
<tr><td>아이리시 세터</td><td>닥스훈트 (짧은 다리, 높은 중심)</td></tr>
<tr><td>포르투갈 워터 독</td><td>소형견 대부분 (체력 소모 빠름)</td></tr>
<tr><td>노바 스코샤 덕톨링</td><td>이탈리안 그레이하운드 (지방 없어 추위 취약)</td></tr>
</tbody>
</table>

<h2>구명조끼가 필요한 경우</h2>
<div class="callout-dog">
<strong>구명조끼 착용 권장 상황</strong><br>
• 처음 수영하는 강아지<br>
• 단두종 모든 상황<br>
• 보트·카약 탑승 시<br>
• 파도 있는 바다<br>
• 노령견·심장 질환 보유견
</div>

<h2>강·바다 수영 주의사항</h2>
<ul>
<li>강 유속·해류 확인 (강한 흐름은 강한 수영선수도 위험)</li>
<li>녹조 발생 수역 — 독성 시아노박테리아 감염 위험</li>
<li>낚시터 주변 — 낚시 바늘 삼킴 위험</li>
<li>바닷물 과음 방지 — 염분 중독 (구토·탈수)</li>
</ul>

<h2>수영 후 귀 관리</h2>
<p>수영 후 물이 귀에 남으면 외이도 감염(이도염)이 생기기 쉽다. 수영 후 즉시 귀 닦기, 수의사 처방 건조 이어드롭 사용이 예방의 핵심이다.</p>

<h2>마지막으로</h2>
<p>수영이 처음인 강아지에게는 얕은 물에서 천천히 적응시키는 것이 중요하다. 강요는 금물이며, 물을 즐기지 않는 강아지도 그것이 완전히 정상이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Beaver, B.V. — Canine Behavior: Insights and Answers. Saunders 2009",
      "한국수의응급의학회 수상 안전 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-09T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-535",
    slug: "stray-dog-behavior-understanding",
    type: "blog",
    category: 1,
    title: "유기견 행동 이해 — 왜 처음에 낯선 사람을 무서워하는가",
    subtitle: "유기·학대 경험이 행동에 미치는 영향, 두려움 기반 반응 이해, 신뢰 쌓는 방법",
    metaTitle: "유기견 행동 이해 — 두려움 반응 원인과 신뢰 쌓는 방법 | 펫지기",
    metaDescription: "유기견이 낯선 사람을 무서워하는 이유와 이해 방법. 유기·학대 경험이 행동에 미치는 영향, 두려움 기반 반응의 의미, 단계적으로 신뢰를 쌓는 방법을 정리했습니다.",
    body: `<p>유기견 입양 후 강아지가 손을 피하고, 큰 소리에 극도로 반응하며, 특정 사람에게 공격적이라면 — 이것은 버릇없는 것이 아니다. 과거 경험이 만든 생존 반응이다.</p>

<h2>두려움 기반 반응이란</h2>
<p>과거의 부정적 경험(학대·방치·방치·갑작스러운 환경 변화)이 뇌에 강하게 각인되면, 유사한 자극에 극도의 반응을 보이게 된다. 이것은 생존을 위한 학습이지 성격 문제가 아니다.</p>

<h2>흔한 두려움 반응 유형</h2>
<ul>
<li>손이 올라오면 피하거나 웅크림 — 손에 의한 체벌 학습</li>
<li>남성·키 큰 사람·특정 모자·우산에 과반응 — 특정 외모 연상</li>
<li>큰 소리(냄비·폭죽)에 패닉 — 소리 트라우마</li>
<li>혼자 두면 파괴·울음 — 버려짐의 기억</li>
</ul>

<h2>신뢰를 쌓는 방법</h2>
<div class="callout-dog">
<strong>유기견 신뢰 구축 핵심 원칙</strong><br>
1. 강요하지 않기 — 모든 접근은 강아지가 선택<br>
2. 간식으로 긍정 연결 — 무서운 자극 + 맛있는 것 반복<br>
3. 예측 가능한 루틴 — 불확실성이 두려움을 키움<br>
4. 천천히 — 회복에는 주 단위, 월 단위가 필요할 수 있음<br>
5. 절대 처벌하지 않기 — 두려움 기반 행동에 처벌은 악화
</div>

<h2>전문 도움이 필요한 경우</h2>
<ul>
<li>공격성이 심해 부상 위험</li>
<li>6개월 이상 관리해도 개선 없음</li>
<li>특정 트리거에 극도의 패닉</li>
</ul>
<p>행동 수의사 또는 공인 반려동물 행동 전문가 상담을 권장한다.</p>

<h2>마지막으로</h2>
<p>유기견의 회복에는 시간이 걸린다. 그러나 많은 유기견이 시간과 인내 속에서 신뢰를 회복하고 가족의 든든한 일원이 된다. 포기하지 않는 보호자가 그것을 만든다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Overall, K.L. — Manual of Clinical Behavioral Medicine for Dogs and Cats. Elsevier 2013",
      "한국반려동물행동상담협회 두려움 기반 행동 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-09T11:00:00.000Z",
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
  console.log("블로그 포스트 82차 시딩 완료! (blog-531 ~ blog-535)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
