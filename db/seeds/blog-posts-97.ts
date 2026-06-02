import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 97 — cat1×2 + cat3×1 + cat5×1 + cat6×1 = 5편 (IDs 606-610)
// Macros: F, A, D, B, E
// Angles: RA4, RA2, RA1, RA7, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-606",
    slug: "adult-dog-socialization-guide",
    type: "blog",
    category: 1,
    title: "성견 사회화 — 어릴 때 놓친 것, 성견이 되어서도 가능한가",
    subtitle: "성견 사회화 가능성과 한계, 두려움 기반 반응 개선, 탈감작 접근법",
    metaTitle: "성견 사회화 — 늦게 시작해도 가능한가, 방법과 한계 | 펫지기",
    metaDescription: "성견 사회화 훈련이 가능한지, 어디까지 가능한지 정리했습니다. 어릴 때 놓친 사회화, 두려움 반응 개선, 탈감작 접근법, 전문 도움이 필요한 경우를 알아보세요.",
    body: `<p>어릴 때 사회화 창을 놓쳤다고 포기할 필요 없다. 성견도 사회화가 가능하다. 다만 더 많은 시간과 인내가 필요하다.</p>

<h2>성견 사회화와 키튼·강아지 사회화의 차이</h2>
<p>어린 동물의 사회화 창(3~12주)은 새로운 자극을 중립적으로 받아들이기 쉬운 시기다. 성견은 이미 형성된 반응 패턴을 바꾸는 것이므로 더 어렵지만 불가능하지 않다.</p>

<h2>성견 사회화가 효과 있는 경우</h2>
<ul>
<li>단순히 경험 부족 (사회화 기회가 없었던 것)</li>
<li>특정 자극에 대한 중간 수준의 두려움</li>
<li>보호자와의 신뢰가 이미 형성된 강아지</li>
</ul>

<h2>탈감작+역조건화 접근법</h2>
<div class="callout-dog">
<strong>성견 사회화 핵심 방법</strong><br>
1. 두려운 자극을 임계점 이하 강도로 노출 (보이는 거리, 낮은 볼륨)<br>
2. 자극과 동시에 최고 가치 보상 제공<br>
3. 자극 → 자동으로 보호자를 쳐다보게 되는 단계까지<br>
4. 점진적으로 자극 강도 높이기<br>
▶ 임계점 이상 노출은 역효과 — 서두르지 않기
</div>

<h2>전문 도움이 필요한 경우</h2>
<ul>
<li>공격성이 위험 수준</li>
<li>6개월 이상 혼자 시도해도 개선 없음</li>
<li>특정 자극에 패닉 수준 반응</li>
</ul>
<p>공인 동물행동 전문가(CAAB·CPDT-KA) 상담이 추천된다.</p>

<h2>마지막으로</h2>
<p>성견 사회화는 느리다. 그러나 꾸준히 하면 반드시 변한다. 모든 강아지가 완전히 사회화된 강아지가 될 수는 없지만, 더 편안한 삶을 살 수 있도록 돕는 것은 가능하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Overall, K.L. — Clinical Behavioral Medicine for Small Animals. Mosby 1997",
      "한국반려동물행동상담협회 성견 사회화 훈련 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-14T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-607",
    slug: "newborn-kitten-care-guide",
    type: "blog",
    category: 1,
    title: "갓 태어난 새끼 고양이 케어 — 어미 없이 발견했을 때",
    subtitle: "수유 방법, 체온 유지, 배변 유도, 수의사 연결 시점, 생존율",
    metaTitle: "신생 고양이 케어 — 어미 없는 새끼 고양이 발견 시 완전 가이드 | 펫지기",
    metaDescription: "어미 없는 신생 고양이를 발견했을 때 케어 방법. 수유 방법, 체온 유지, 배변 유도, 수의사 연결 시점, 생존율을 높이는 방법을 정리했습니다.",
    body: `<p>눈도 안 뜬 새끼 고양이를 혼자 발견했다. 어떻게 해야 할까? 첫 몇 시간의 대처가 생존 여부를 결정한다.</p>

<h2>먼저 확인할 것 — 어미가 있는가</h2>
<p>어미 고양이는 먹이를 구하러 자리를 비우기도 한다. 새끼가 울고 있지 않고, 따뜻하다면 2~4시간 기다려보자. 어미가 돌아오지 않거나, 새끼가 차갑고 울고 있으면 구조가 필요하다.</p>

<h2>즉시 해야 할 것 (체온 유지)</h2>
<div class="callout-cat">
<strong>신생 고양이 체온 유지</strong><br>
• 적정 체온: 38~39도<br>
• 보온 방법: 수건으로 감싸기 + 핫팩(수건 사이에 넣어 직접 접촉 금지)<br>
• 전기장판: 강도 최약 + 반만 깔기 (이동 가능하게)<br>
• 저체온 고양이: 따뜻해지기 전까지 수유 금지
</div>

<h2>수유 방법</h2>
<ul>
<li>고양이 전용 대용 모유(KMR) 구입 — 일반 우유 금지 (유당 불내증)</li>
<li>주사기 또는 신생 고양이 전용 젖병 사용</li>
<li>수유 주기: 0~1주 2시간마다, 1~2주 3시간마다</li>
<li>등을 세운 자세 (엎드려서 수유 — 흡인 방지)</li>
</ul>

<h2>배변 유도</h2>
<p>어미 고양이는 핥아서 배변을 유도한다. 사람이 대신할 때: 따뜻한 물 적신 면봉·거즈로 항문·생식기 주변을 가볍게 자극한다. 매 수유 후 필수.</p>

<h2>즉시 수의사 연결</h2>
<ul>
<li>가능하면 동물병원으로 — 신생 고양이 전문 케어 필요</li>
<li>고양이 구조 단체 연결 (보육 경험 있는 위탁 가정)</li>
<li>혼자 키우는 경우 야간 수유 계획 필수</li>
</ul>

<h2>마지막으로</h2>
<p>신생 고양이 사육은 매우 어렵다. 경험 없는 사람의 생존율은 경험자보다 낮다. 가능하다면 고양이 보호 단체에 연결하는 것이 새끼 고양이에게 가장 좋은 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국동물복지협회 신생 고양이 구조 및 케어 가이드라인",
      "Sparkes, A.H. — Orphaned and Abandoned Kittens. J Feline Med Surg 2016",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-14T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-608",
    slug: "dog-obesity-health-risks",
    type: "blog",
    category: 3,
    title: "강아지 비만 — '통통해서 귀엽다'가 수명을 2년 줄이는 이유",
    subtitle: "과체중의 건강 위험, BCS 자가 진단, 안전한 체중 감량 속도, 운동 제한 비만견",
    metaTitle: "강아지 비만 건강 위험 — BCS 진단·감량 방법·운동 가이드 | 펫지기",
    metaDescription: "강아지 비만이 건강에 미치는 영향. BCS 자가 진단법, 과체중의 구체적 건강 위험, 안전한 체중 감량 속도, 관절 문제 비만견 운동 방법을 정리했습니다.",
    body: `<p>강아지 과체중은 '귀여움'이 아니라 건강 문제다. 연구에 따르면 이상 체중 유지 강아지는 과체중 강아지보다 평균 1.8년 더 오래 산다.</p>

<h2>과체중의 건강 위험</h2>
<ul>
<li>관절 질환 악화 (슬개골·관절염 조기 발생)</li>
<li>당뇨 위험 증가</li>
<li>심장·호흡기 부담 증가</li>
<li>수술 위험 증가 (마취 합병증)</li>
<li>면역 기능 저하</li>
<li>종양 발생률 증가</li>
</ul>

<h2>BCS(신체충실지수) 자가 진단</h2>
<div class="callout-dog">
<strong>BCS 자가 확인 방법</strong><br>
• <strong>갈비뼈</strong>: 쉽게 만져지면 정상, 안 만져지면 과체중<br>
• <strong>허리선</strong>: 위에서 봤을 때 허리가 잘록한 모래시계 → 정상<br>
• <strong>복부선</strong>: 옆에서 봤을 때 배가 올라가야 정상<br>
• BCS 5/9 = 이상 체중<br>
• BCS 6~7/9 = 과체중<br>
• BCS 8~9/9 = 비만
</div>

<h2>안전한 체중 감량 속도</h2>
<ul>
<li>월 1~2% 체중 감량 목표 (너무 빠른 감량 위험)</li>
<li>현재 사료량 10~20% 감량 시작</li>
<li>포만감 유지: 고단백·고섬유 감량식 사료 활용</li>
<li>간식 완전 제거 또는 칼로리 계산에 포함</li>
</ul>

<h2>운동 제한 비만견</h2>
<ul>
<li>관절 손상된 비만견: 수중 트레드밀·수영이 가장 안전</li>
<li>단두종 비만견: 더운 날 강도 높은 운동 절대 금지</li>
<li>체중이 줄면서 운동량 점진적 증가</li>
</ul>

<h2>마지막으로</h2>
<p>비만을 방치하는 것이 가혹한 것이다. 사료량 관리와 규칙적인 운동 — 이 두 가지만으로 대부분의 비만은 해결 가능하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Kealy, R.D. et al. — Effects of diet restriction on life span and age-related changes in dogs. JAVMA 2002",
      "한국수의내과학회 비만 관리 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-15T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-609",
    slug: "dog-boredom-behavior-solutions",
    type: "blog",
    category: 5,
    title: "강아지 지루함 행동 — 파괴·짖음·과잉 핥기의 진짜 원인",
    subtitle: "지루함 행동의 종류, 뇌 자극 부족이 원인인 경우, 환경 개선 방법",
    metaTitle: "강아지 지루함 행동 해결 — 파괴·짖음·핥기 원인과 대처 | 펫지기",
    metaDescription: "강아지 파괴·짖음·과잉 핥기의 원인이 지루함인 경우 해결 방법. 지루함 행동의 종류, 뇌 자극 부족 여부 확인, 환경 개선과 일상 루틴 수정을 정리했습니다.",
    body: `<p>강아지가 혼자 있을 때 소파를 뜯고, 쓰레기통을 뒤지고, 자신의 발을 핥는다. 이것이 단순히 "나쁜 습관"이 아닌 지루함 신호일 수 있다.</p>

<h2>지루함 행동 체크리스트</h2>
<ul>
<li>파괴 행동 (가구·신발·쓰레기)</li>
<li>과도한 짖음 (혼자 있을 때)</li>
<li>자신의 발·꼬리·몸을 반복적으로 핥기</li>
<li>같은 경로를 반복해서 걷기 (페이싱)</li>
<li>집 안을 끊임없이 탐색</li>
</ul>

<h2>지루함인지 확인하는 방법</h2>
<div class="callout-dog">
<strong>지루함 vs 분리불안 구분</strong><br>
• <strong>지루함</strong>: 보호자 귀가 후에도 파괴 행동. 오전보다 오후에 더 심함.<br>
• <strong>분리불안</strong>: 보호자 떠난 직후 시작. CCTV에서 초조한 모습.<br>
▶ CCTV로 혼자 있을 때 행동 확인이 정확한 방법
</div>

<h2>지루함 해결 환경 개선</h2>
<ul>
<li>퍼즐 피더: 밥을 그냥 주지 않고 퍼즐로 (하루 1회 이상)</li>
<li>노즈워크 매트: 간식 숨기기 → 찾기</li>
<li>창문 버드워칭 환경</li>
<li>Kong 냉동 간식 (외출 직전 제공)</li>
<li>라디오·TV 배경음 (고요함보다 익숙한 소리)</li>
</ul>

<h2>일상 루틴 수정</h2>
<ul>
<li>출근 전 10~15분 노즈워크 또는 훈련</li>
<li>저녁 산책 강도 높이기</li>
<li>주 2~3회 도그카페·도그런 방문</li>
</ul>

<h2>마지막으로</h2>
<p>지루함 행동은 강아지의 욕구가 충족되지 않는다는 신호다. 처벌로는 해결되지 않는다 — 원인(지루함)을 해결해야 행동이 바뀐다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Rehn, T. & Keeling, L.J. — Home alone: the effects of owner absence on dog welfare. Applied Animal Behaviour Science 2011",
      "한국반려동물행동상담협회 지루함 행동 해결 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-15T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-610",
    slug: "end-of-life-signs-in-pets",
    type: "blog",
    category: 6,
    title: "반려동물의 임종 신호 — '이제 다 됐다'는 것을 어떻게 아는가",
    subtitle: "임종 전 행동·신체 변화, 마지막 시간을 편안하게 보내는 방법, 보호자 마음 준비",
    metaTitle: "반려동물 임종 신호 — 마지막 시간 인식과 편안한 마무리 | 펫지기",
    metaDescription: "반려동물이 임종에 가까워졌을 때 나타나는 신호. 행동·신체 변화 인식법, 마지막 시간을 편안하게 보내는 방법, 보호자의 마음 준비를 정리했습니다.",
    body: `<p>이 글은 마지막을 서두르기 위해 쓰인 것이 아니다. 다가오는 시간을 인식하고, 남은 시간을 가장 편안하게 보내주기 위한 글이다.</p>

<h2>임종이 가까워질 때 나타나는 신호</h2>
<ul>
<li><strong>음식·물 거부</strong>: 가장 흔한 신호. 몸이 소화를 위한 에너지를 쓰지 않으려 함.</li>
<li><strong>극도의 무기력</strong>: 좋아하던 활동에도 반응 없음</li>
<li><strong>호흡 변화</strong>: 불규칙하거나 느려짐</li>
<li><strong>체온 저하</strong>: 발·귀가 차가워짐</li>
<li><strong>혼자 있으려 함</strong>: 조용하고 어두운 곳으로 이동</li>
<li><strong>대소변 조절 어려움</strong></li>
</ul>

<h2>마지막 시간을 편안하게</h2>
<div class="callout-cat">
<strong>마지막 시간 환경</strong><br>
• 가장 좋아하는 장소에서 편안하게<br>
• 부드럽고 따뜻한 침대<br>
• 큰 소리·갑작스러운 움직임 최소화<br>
• 보호자의 조용한 존재감 (곁에 있어 주기)<br>
• 좋아하는 냄새·담요 가까이 두기
</div>

<h2>보호자로서 할 수 있는 것</h2>
<ul>
<li>억지로 먹이거나 마시게 하지 않기 — 편안함이 우선</li>
<li>좋아하는 음식을 소량 제공 (먹고 싶다면)</li>
<li>가능하면 함께 있어 주기</li>
<li>사랑한다는 말 전하기 — 고양이·강아지는 목소리를 느낀다</li>
</ul>

<h2>안락사를 선택하는 경우</h2>
<p>자연사를 기다릴지, 안락사를 선택할지는 보호자와 수의사가 함께 결정한다. 통증이 심하고 조절이 어렵다면 안락사가 더 인도적일 수 있다.</p>

<h2>마지막으로</h2>
<p>마지막은 늘 너무 갑작스럽고 너무 일찍 온다. 그 마지막 시간에 곁에 있어 준 것, 편안하게 해주려 노력한 것 — 그것이 당신이 줄 수 있는 마지막 사랑이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Shanan, A. — A veterinarian's role in helping clients with the decision to euthanize. J Vet Behav 2011",
      "한국수의완화의학연구회 임종 케어 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-16T09:00:00.000Z",
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
  console.log("블로그 포스트 97차 시딩 완료! (blog-606 ~ blog-610)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
