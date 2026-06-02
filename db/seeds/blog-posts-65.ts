import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 65 — cat1×2 + cat5×2 + cat3×1 = 5편 (IDs 446-450)
// Macros: F, B, A, E, F
// Angles: RA3, RA6, RA1, RA4, RA7

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-446",
    slug: "positive-reinforcement-training-guide",
    type: "blog",
    category: 1,
    title: "강아지 양성 강화 훈련 완전 가이드 — 처벌 없이 더 빠르게 배우는 이유",
    subtitle: "양성 강화의 과학적 원리, 타이밍·간식 선택, 기초 5가지 훈련, 실패 없는 훈련 설계",
    metaTitle: "강아지 양성 강화 훈련 — 원리·간식·기초 훈련 완전 가이드 | 펫지기",
    metaDescription: "강아지 양성 강화 훈련의 원리와 방법. 처벌보다 빠른 이유, 타이밍·간식 선택, 앉아·엎드려·기다려 기초 훈련을 정리했습니다.",
    body: `<p>양성 강화(Positive Reinforcement)는 원하는 행동을 할 때 보상을 주는 훈련 방식이다. 처벌 기반 훈련보다 빠르고, 부작용이 없으며, 보호자-강아지 신뢰를 강화한다.</p>

<h2>왜 양성 강화가 효과적인가</h2>
<ul>
<li>행동과 결과가 명확히 연결됨 → 빠른 학습</li>
<li>스트레스 없는 학습 → 기억 고착이 좋음</li>
<li>강아지가 훈련을 즐기게 됨 → 자발적 참여</li>
<li>처벌 기반 방식의 부작용(공격성·공포)이 없음</li>
</ul>

<h2>핵심 원칙 — 타이밍</h2>
<p>원하는 행동이 발생한 직후 0.5~1초 이내에 보상해야 한다. 늦으면 다른 행동과 연결된다. 클리커를 사용하면 정확한 타이밍 마킹에 도움이 된다.</p>

<h2>보상 선택</h2>
<ul>
<li><strong>식품 보상</strong>: 가장 효과적. 작은 크기(콩알 1/3), 빨리 먹을 수 있는 것.</li>
<li><strong>놀이 보상</strong>: 공·터그 장난감. 일부 강아지에서 음식보다 동기 부여 높음.</li>
<li><strong>칭찬</strong>: 단독으로는 효과 약함. 음식과 함께 사용.</li>
</ul>

<h2>기초 훈련 5가지</h2>
<div class="callout-dog">
<strong>기초 5가지 훈련 순서</strong><br>
1. <strong>앉아(Sit)</strong>: 가장 먼저. 간식을 코 위로 올리면 자연스럽게 앉음.<br>
2. <strong>엎드려(Down)</strong>: 앉은 상태에서 간식을 앞발 사이로 유도.<br>
3. <strong>이리와(Come)</strong>: 안전을 위한 필수 훈련.<br>
4. <strong>기다려(Stay)</strong>: 거리·시간 점진적 증가.<br>
5. <strong>눈 마주침(Watch me)</strong>: 집중력 훈련의 기초.
</div>

<h2>마지막으로</h2>
<p>훈련 세션은 짧게(5~10분), 긍정적으로 끝낸다. 어떤 훈련도 강아지가 지치거나 실패 경험이 많은 날에는 중단하는 것이 좋다. '오늘도 잘 했어'라는 기억으로 마무리하는 것이 다음 세션의 성공을 결정한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Karen Pryor — Don't Shoot the Dog",
      "American Veterinary Society of Animal Behavior — Position Statement on Training",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-26T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-447",
    slug: "pregnant-pet-care-guide",
    type: "blog",
    category: 1,
    title: "임신한 반려동물 케어 — 개·고양이 임신 기간 관리 완전 가이드",
    subtitle: "임신 확인 방법, 식이·운동 조정, 출산 준비, 산후 관리",
    metaTitle: "임신한 반려동물 케어 — 개·고양이 임신 관리 가이드 | 펫지기",
    metaDescription: "임신한 강아지·고양이 케어 방법. 임신 확인, 영양·운동 조정, 출산 준비, 산후 관리를 정리했습니다.",
    body: `<p>의도하지 않은 임신이든, 계획된 번식이든 — 임신한 반려동물은 특별한 관리가 필요하다.</p>

<h2>임신 기간</h2>
<ul>
<li><strong>강아지</strong>: 약 63일 (58~68일)</li>
<li><strong>고양이</strong>: 약 63~65일 (63~69일)</li>
</ul>

<h2>임신 확인 방법</h2>
<ul>
<li>교배 후 3~4주: 복부 초음파로 태아 확인 가능</li>
<li>교배 후 5주: 복부 촉진으로 확인 가능 (수의사)</li>
<li>교배 후 7주: X-ray로 태아 수 정확히 파악</li>
<li>체중 증가·유두 발달·식욕 변화가 임신 신호</li>
</ul>

<h2>임신 중 식이 조정</h2>
<div class="callout-dog">
<strong>임신 기간 영양 조정</strong><br>
• 임신 초기 4주: 기존 사료 유지<br>
• 5주부터: 퍼피 사료(고칼로리·고단백)로 전환<br>
• 후기: 급식량 25~50% 증가<br>
• 출산 직전: 소량씩 더 자주 (자궁이 위장 압박)
</div>

<h2>운동 조정</h2>
<ul>
<li>임신 초기: 정상 운동 유지</li>
<li>임신 후기(7주+): 격렬한 운동·점프 제한</li>
<li>출산 1주 전: 짧은 산책만</li>
</ul>

<h2>출산 준비</h2>
<ul>
<li>조용하고 따뜻한 분만 공간 사전 준비 (박스+담요)</li>
<li>출산 예정 1~2주 전 분만 공간에 익숙하게</li>
<li>담당 수의사 연락처 및 야간 응급 병원 파악</li>
<li>출산 1주 전부터 매일 직장 체온 측정 (100°F 이하로 떨어지면 24시간 내 출산)</li>
</ul>

<h2>마지막으로</h2>
<p>임신은 자연스러운 과정이지만 수의사와 정기 모니터링이 필수다. 특히 첫 출산·소형견·고령 동물에서 난산 위험이 있으므로 응급 연락처를 항상 준비해둔다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Root Kustritz, M.V. — Pregnancy Diagnosis and Abnormalities of Pregnancy in the Dog",
      "대한수의사회 번식 관리 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-26T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-448",
    slug: "anxiety-vest-thunder-shirt-guide",
    type: "blog",
    category: 5,
    title: "강아지 불안 조끼(썬더셔츠) — 효과가 있는지, 언제 사용하는지",
    subtitle: "압박 효과의 원리, 효과 있는 개체 vs 없는 개체, 올바른 착용법, 보완 방법",
    metaTitle: "강아지 썬더셔츠·불안 조끼 효과 — 언제 사용하는가 가이드 | 펫지기",
    metaDescription: "강아지 불안 조끼(썬더셔츠) 효과와 사용법. 압박 효과 원리, 효과 있는 개체, 올바른 착용법, 불안 대처 보완 방법을 정리했습니다.",
    body: `<p>천둥·폭죽·이사·병원 방문 등 불안 상황에서 강아지에게 불안 조끼(썬더셔츠)를 입히는 보호자가 많다. 효과가 있는 것인지, 어떻게 사용해야 하는지 알아보자.</p>

<h2>압박 효과의 원리</h2>
<p>불안 조끼는 가슴·몸통에 지속적인 압박을 가해 신경계를 진정시키는 것을 목표로 한다. 사람의 심부 압박 요법(Deep Touch Pressure Therapy)에서 영감을 받은 제품이다.</p>

<h2>연구에서의 효과</h2>
<p>일부 연구에서 천둥·불꽃놀이 공포에 대한 불안 행동을 유의미하게 줄였다는 결과가 있다. 그러나 모든 강아지에게 효과적이지는 않으며, 약물 없이는 심한 불안에 충분하지 않다는 결론도 있다.</p>

<div class="callout-dog">
<strong>불안 조끼가 도움이 되는 경우</strong><br>
• 경~중등도 불안<br>
• 천둥·폭죽 등 특정 자극에 대한 반응<br>
• 이동장·차 이동 중 스트레스<br>
• 분리 불안 초기<br><br>
<strong>단독으로는 부족한 경우</strong><br>
• 심한 패닉 반응<br>
• 자해·파괴 수준의 분리불안<br>
→ 행동 수의사 상담 + 약물 병행 필요
</div>

<h2>올바른 착용법</h2>
<ul>
<li>불안 자극 발생 전 미리 착용 (자극과 함께 입히면 불안과 연결될 수 있음)</li>
<li>몸통을 가볍게 감싸는 압박 (숨 막히지 않을 정도)</li>
<li>최대 연속 2시간 착용 후 휴식</li>
<li>처음엔 짧게 입혀 익숙하게 한 후 실제 사용</li>
</ul>

<h2>마지막으로</h2>
<p>불안 조끼는 만능 해결책이 아니다. 그러나 훈련과 함께 사용하면 불안 관리에 도움이 될 수 있는 도구다. 비용 대비 시도해볼 만한 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "King, C. et al. — The Effect of a Pressure Wrap on the Behaviour of Dogs Experiencing Fear. JAVMA 2014",
      "한국반려동물행동상담협회 불안 관리 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-27T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-449",
    slug: "cat-cardboard-box-psychology",
    type: "blog",
    category: 5,
    title: "고양이가 박스를 좋아하는 이유 — 과학으로 읽는 고양이 심리",
    subtitle: "은신처 본능, 체온 유지, 스트레스 완충 효과, 사각형 착시 실험",
    metaTitle: "고양이 박스 좋아하는 이유 — 과학적 심리 설명 | 펫지기",
    metaDescription: "고양이가 박스를 그토록 좋아하는 이유를 과학으로 설명했습니다. 은신처 본능, 체온 유지, 스트레스 완충 효과, 사각형 착시 실험 결과를 정리했습니다.",
    body: `<p>택배가 오면 고양이는 박스에 먼저 들어간다. 비어있는 박스가 작을수록 더 좋아한다. 왜 그럴까.</p>

<h2>이유 1 — 은신처 본능</h2>
<p>고양이는 야생에서 포식자이면서 동시에 더 큰 포식자의 먹이이기도 했다. 사방이 막힌 공간은 배후에서 공격받지 않는 안전한 위치다. 박스 안에서 나가는 것은 보이지만, 들어오는 것은 막히는 구조가 '안전'을 의미한다.</p>

<h2>이유 2 — 체온 유지</h2>
<p>골판지는 훌륭한 단열재다. 고양이의 이상 체온은 38.5~39.2°C로 사람보다 높다. 차가운 방바닥보다 골판지 안이 따뜻하고 편안하다.</p>

<h2>이유 3 — 스트레스 완충 효과</h2>
<p>네덜란드 연구에서 보호소 고양이에게 박스를 제공했을 때 스트레스 행동이 크게 줄었다는 결과가 있다. 박스는 단순한 장난감이 아니라 심리적 안전 공간이다.</p>

<h2>이유 4 — 사각형 착시 실험</h2>
<p>2021년 연구에서 고양이가 바닥에 테이프로 그린 사각형 안에도 앉으려 한다는 것이 밝혀졌다. 심지어 착시로 만든 사각형(카니자 사각형)에도 앉으려 했다. 사각형 자체가 고양이에게 '들어가야 할 것'처럼 보인다는 이론이다.</p>

<h2>박스를 더 좋게 만들어주기</h2>
<ul>
<li>위에 구멍을 내 고양이가 들여다볼 수 있게</li>
<li>안에 평소 쓰던 담요 깔기</li>
<li>여러 박스를 연결해 미로 만들기</li>
<li>캣닙 소량 뿌리기</li>
</ul>

<h2>마지막으로</h2>
<p>택배 박스를 바로 버리지 말고 하루이틀 고양이에게 줘보자. 비용 0원의 최고 장난감이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Vinke, C.M. et al. — Will a hiding box provide stress reduction for shelter cats? Applied Animal Behaviour Science 2014",
      "Smith, G.E. et al. — If I fits I sits: A citizen science investigation into illusory contour susceptibility in domestic cats. Applied Animal Behaviour Science 2021",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-27T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-450",
    slug: "dog-skin-lump-guide",
    type: "blog",
    category: 3,
    title: "강아지 피부 혹 발견했을 때 — 어떤 것이 위험하고 어떤 것이 괜찮은가",
    subtitle: "지방종·낭종·비만세포종·유선종양 비교, 세침흡인검사 설명, 자가 체크 방법",
    metaTitle: "강아지 피부 혹 종류 구분 — 지방종·낭종·종양 비교 가이드 | 펫지기",
    metaDescription: "강아지 피부 혹 종류와 구분법. 지방종·낭종·비만세포종·유선종양 차이, 세침흡인검사(FNA) 설명, 집에서 할 수 있는 자가 체크 방법을 정리했습니다.",
    body: `<p>강아지를 쓰다듬다가 혹을 발견했다. 크기도 모양도 여러 가지다. 어떤 것은 지방종이고 어떤 것은 종양일 수 있다. 외관만으로 구분할 수 없기 때문에 세포 검사가 필요하다.</p>

<h2>흔한 피부 혹 종류</h2>
<table>
<thead><tr><th>종류</th><th>특징</th><th>위험도</th></tr></thead>
<tbody>
<tr><td>지방종(Lipoma)</td><td>부드럽고 움직임. 천천히 자람.</td><td>낮음 (양성)</td></tr>
<tr><td>피지낭종</td><td>작고 단단. 짜면 흰 물질 나옴.</td><td>낮음 (양성)</td></tr>
<tr><td>비만세포종(MCT)</td><td>만지면 변화. 불규칙. 어디서나 발생.</td><td>높음 (악성)</td></tr>
<tr><td>유선종양</td><td>유두 주변. 암컷·비중성화에서 흔함.</td><td>50% 악성</td></tr>
<tr><td>히스티오사이토마</td><td>어린 강아지. 빨간 단추 모양. 자연 소실.</td><td>낮음 (양성)</td></tr>
</tbody>
</table>

<h2>세침흡인검사(FNA)란</h2>
<p>혹에 가는 바늘을 찔러 세포를 채취해 현미경으로 확인하는 검사다. 국소마취 없이도 가능하고, 대부분의 강아지가 잘 견딘다. 5~10분 이내로 끝나며 외래에서 가능하다. 모든 혹에 대해 권장되는 첫 번째 검사다.</p>

<h2>즉시 검사가 필요한 혹</h2>
<div class="callout-dog">
<strong>빠른 검사 권장</strong><br>
• 만지면 크기·모양이 바뀌는 혹<br>
• 빠르게 커지는 혹 (1~2주 내 2배 이상)<br>
• 피부 표면이 궤양화·출혈되는 혹<br>
• 유두 근처 단단한 혹 (암컷)<br>
• 노령견에서 새로 생긴 모든 혹
</div>

<h2>자가 체크 습관</h2>
<p>매달 한 번 전신을 손으로 천천히 만져보는 습관을 들이면 새로 생긴 혹을 조기에 발견할 수 있다. 발견 시 날짜·크기·위치를 메모해 변화를 추적한다.</p>

<h2>마지막으로</h2>
<p>대부분의 피부 혹은 양성이다. 그러나 비만세포종처럼 외관이 양성처럼 보여도 악성인 경우도 있다. 발견한 혹을 방치하지 않고 세포 검사를 받는 것이 가장 현명한 대처다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Withrow, S.J. et al. — Withrow and MacEwen's Small Animal Clinical Oncology",
      "대한수의종양학회 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-28T09:00:00.000Z",
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
  console.log("블로그 포스트 65차 시딩 완료! (blog-446 ~ blog-450)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
