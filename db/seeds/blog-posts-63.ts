import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 63 — cat1×2 + cat2×1 + cat3×1 + cat5×1 = 5편 (IDs 436-440)
// Macros: F, B, A, E, F
// Angles: RA4, RA1, RA5, RA3, RA7

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-436",
    slug: "dog-crate-training-step-by-step",
    type: "blog",
    category: 1,
    title: "강아지 크레이트(케이지) 훈련 — 감옥이 아닌 안전 공간으로 만드는 법",
    subtitle: "크레이트를 좋아하게 만드는 단계별 훈련, 올바른 크기 선택, 사용 시간 기준",
    metaTitle: "강아지 크레이트 훈련 — 단계별 긍정 연상 완전 가이드 | 펫지기",
    metaDescription: "강아지 크레이트를 안전 공간으로 만드는 단계별 훈련 방법. 올바른 크기 선택, 시간 기준, 부정 연상을 피하는 방법을 정리했습니다.",
    body: `<p>크레이트(케이지)를 처벌 도구로 사용하면 공포 공간이 된다. 올바른 훈련으로 자발적으로 들어가고 싶어하는 안전 공간으로 만들 수 있다.</p>

<h2>크레이트 선택</h2>
<ul>
<li><strong>크기</strong>: 강아지가 서서 돌아설 수 있는 크기. 너무 크면 구석에 배변한다.</li>
<li><strong>소재</strong>: 플라스틱 하드케이지(안정감), 철망 케이지(환기 좋음), 소프트(이동용)</li>
<li><strong>퍼피</strong>: 성견 크기 케이지에 칸막이로 공간 조절</li>
</ul>

<h2>단계별 훈련</h2>
<ol>
<li>크레이트를 생활 공간에 놓고 문을 열어둠 → 스스로 탐색 기다리기</li>
<li>크레이트 안에 간식을 넣어두되 강요하지 않음</li>
<li>들어가면 즉시 조용히 보상 → '크레이트 = 좋은 것' 연상</li>
<li>문을 닫지 않고 먼저 안에서 식사 훈련</li>
<li>짧게(30초) 문 닫기 → 조용히 있으면 보상 → 점점 늘리기</li>
</ol>

<h2>사용 시간 기준</h2>
<div class="callout-dog">
<strong>월령별 크레이트 최대 시간</strong><br>
• 8~10주: 1시간 이하<br>
• 11~14주: 1~3시간<br>
• 15~16주: 3~4시간<br>
• 17주+: 4시간 (수면 제외 최대)<br>
<br>
하루 대부분을 크레이트에 두는 것은 학대다.
</div>

<h2>크레이트에서 울 때</h2>
<p>훈련 초기 짧은 울음은 무시해야 한다 (나오면 보상이 된다). 단, 30분 이상 지속되면 훈련을 너무 빠르게 진행한 것 — 단계를 되돌린다.</p>

<h2>마지막으로</h2>
<p>잘 훈련된 크레이트는 이동·병원·재난 대피 시 큰 도움이 된다. 인내를 갖고 긍정 경험을 쌓아가면 강아지가 스스로 들어가 낮잠을 자는 공간이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Ian Dunbar — Before and After Getting Your Puppy",
      "ASPCA — Crate Training Your Dog",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-21T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-437",
    slug: "second-cat-right-timing",
    type: "blog",
    category: 1,
    title: "두 번째 고양이를 맞이하는 적절한 시기 — 서두르면 둘 다 불행해진다",
    subtitle: "첫 번째 고양이 안정화 기간, 나이·성격 조합 고려, 합사 준비 체크리스트",
    metaTitle: "두 번째 고양이 맞이하는 시기 — 준비 체크리스트 | 펫지기",
    metaDescription: "두 번째 고양이를 입양하는 적절한 시기와 준비사항. 첫 고양이 안정화 기간, 나이·성격 조합, 합사 준비 체크리스트를 정리했습니다.",
    body: `<p>고양이가 외로워 보인다고, 또는 함께 놀면 좋을 것 같아서 두 번째 고양이를 들이려는 보호자가 많다. 그러나 타이밍과 준비가 중요하다.</p>

<h2>첫 번째 고양이 안정화 기간</h2>
<p>첫 고양이를 입양한 지 6개월 미만이라면 기다리는 것이 좋다. 아직 새 집 환경에 완전히 적응 중이며, 새 가족 구성원의 루틴도 파악 중이다. 이미 영역이 확립된 성묘에 새 개체를 도입하는 것이 더 수월하다.</p>

<h2>나이·성격 조합</h2>
<ul>
<li><strong>성묘 + 새끼</strong>: 많은 성묘가 자신보다 어린 개체를 용인한다. 단, 성묘가 놀이 참여를 강요받는 스트레스 방지 필요.</li>
<li><strong>비슷한 연령</strong>: 에너지 수준이 맞아 자연스럽게 어울리는 경우 많다.</li>
<li><strong>성묘 + 성묘</strong>: 성격이 이미 확립되어 합사가 가장 어려울 수 있다.</li>
<li><strong>독립적 성격 + 사교적 성격</strong>: 좋지 않은 조합 — 사교적인 고양이가 독립적인 개체를 끊임없이 귀찮게 할 수 있다.</li>
</ul>

<h2>합사 준비 체크리스트</h2>
<div class="callout-cat">
<strong>두 번째 고양이 맞이 전 준비</strong><br>
□ 격리 가능한 별도 방 확보<br>
□ 화장실 N+1개 준비<br>
□ 각자 식사·물 공간 분리<br>
□ 캣타워·선반 추가 (수직 공간)<br>
□ 페로몬 디퓨저 구입<br>
□ 4~6주 합사 프로토콜 계획
</div>

<h2>마지막으로</h2>
<p>두 번째 고양이를 위한 '고양이 외로움' 해소는 좋은 의도다. 그러나 첫 번째 고양이가 사람과의 관계만으로도 충분히 행복한 경우가 많다. 정말 필요한지, 합사 실패 시 두 마리 모두 평생 분리 생활을 해야 할 수도 있다는 것을 알고 결정해야 한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "International Cat Care — Getting a Second Cat",
      "한국고양이보호협회 다묘 입양 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-21T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-438",
    slug: "dog-safe-fish-guide",
    type: "blog",
    category: 2,
    title: "강아지에게 줄 수 있는 생선 — 안전한 것과 주의할 것",
    subtitle: "연어·고등어·정어리 vs 참치·날생선 비교, 뼈 위험, 조리 방법",
    metaTitle: "강아지 생선 급여 — 안전한 생선과 주의할 것 가이드 | 펫지기",
    metaDescription: "강아지에게 줄 수 있는 생선과 주의할 생선. 연어·고등어·정어리 효능, 참치 중금속 위험, 날생선·뼈 위험, 안전한 조리 방법을 정리했습니다.",
    body: `<p>생선은 강아지에게 좋은 단백질과 오메가3를 제공하는 식품이다. 그러나 종류·가공 방법에 따라 위험할 수 있다.</p>

<h2>강아지에게 좋은 생선</h2>
<ul>
<li><strong>연어</strong>: 오메가3 풍부, 반드시 완전히 익혀서 (날 연어 — 고독소균·기생충 위험)</li>
<li><strong>정어리</strong>: EPA+DHA 높음, 중금속 낮음, 통조림(무염)도 가능</li>
<li><strong>고등어</strong>: 오메가3 우수, 소량 급여 (지방 많음)</li>
<li><strong>흰살 생선(명태·대구·도미)</strong>: 지방 낮음, 소화 쉬움</li>
</ul>

<h2>주의할 생선</h2>
<ul>
<li><strong>참치</strong>: 수은 축적 위험 (특히 참다랑어). 소량·간식으로만. 매일 급여 금지.</li>
<li><strong>날생선</strong>: 연어살모넬라증·기생충 위험. 반드시 완전히 가열.</li>
<li><strong>훈제·염장 생선</strong>: 나트륨 과다. 금지.</li>
<li><strong>가시 있는 생선</strong>: 잔가시 제거 필수. 큰 가시는 소화관 천공 위험.</li>
</ul>

<div class="callout-dog">
<strong>안전한 급여 방법</strong><br>
• 완전히 익히기 (165°F/74°C 이상)<br>
• 모든 가시 제거<br>
• 간·양념 없이<br>
• 체중 10kg 기준 주 2~3회 50~80g 이내
</div>

<h2>마지막으로</h2>
<p>생선은 훌륭한 단백질·오메가3 공급원이다. 익히고, 가시 빼고, 소량 급여하면 건강한 식이 보완이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA — Fish for Dogs",
      "한국수의영양학회 생선 급여 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-22T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-439",
    slug: "male-dog-prostate-disease-guide",
    type: "blog",
    category: 3,
    title: "수컷 강아지 전립선 질환 — 중성화 안 한 개에서 흔한 이유",
    subtitle: "전립선 비대·농양·낭종·종양 구분, 소변 이상·배변 어려움 증상, 중성화 예방 효과",
    metaTitle: "수컷 강아지 전립선 질환 — 증상·치료·중성화 예방 | 펫지기",
    metaDescription: "중성화 안 한 수컷 강아지에서 흔한 전립선 질환. 전립선 비대·농양·종양 구분, 소변·배변 이상 증상, 중성화 예방 효과를 정리했습니다.",
    body: `<p>중성화하지 않은 수컷 강아지는 나이가 들면서 전립선 문제가 생길 가능성이 높다. 5세 이상 미중성화 수컷의 60% 이상에서 어느 정도의 전립선 비대가 발견된다.</p>

<h2>전립선 질환 종류</h2>
<ul>
<li><strong>양성 전립선 비대(BPH)</strong>: 가장 흔함. 호르몬(DHT) 자극으로 전립선이 커진다.</li>
<li><strong>전립선 농양</strong>: 세균 감염으로 고름. 증상 심하고 전신 영향.</li>
<li><strong>전립선 낭종</strong>: 액체 찬 주머니. 크면 방광·직장 압박.</li>
<li><strong>전립선 종양</strong>: 드물지만 예후 나쁨. 중성화 개에서도 발생 가능.</li>
</ul>

<h2>주요 증상</h2>
<div class="callout-dog">
<strong>전립선 문제 의심 신호</strong><br>
• 소변이 가늘거나 방울방울 나옴<br>
• 혈뇨<br>
• 배변 어려움 (전립선이 직장 압박)<br>
• 뒷다리 힘 약해짐·비틀거림<br>
• 고열·무기력 (농양 의심 시 응급)
</div>

<h2>치료 방법</h2>
<ul>
<li><strong>중성화 수술</strong>: BPH의 가장 효과적인 치료·예방. 중성화 후 전립선이 빠르게 축소됨.</li>
<li><strong>항생제</strong>: 세균성 농양에 필수</li>
<li><strong>수술적 배액·절제</strong>: 큰 낭종·농양에 필요한 경우</li>
</ul>

<h2>마지막으로</h2>
<p>중성화는 전립선 비대의 가장 효과적인 예방이다. 번식 계획이 없는 수컷이라면 적절한 시기에 중성화를 고려하는 것이 장기 건강 관리에 유리하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Root Kustritz, M.V. — Clinical Canine and Feline Reproduction",
      "대한수의사회 비뇨생식기 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-22T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-440",
    slug: "rainy-day-indoor-cat-activities",
    type: "blog",
    category: 5,
    title: "비 오는 날 고양이와 함께하기 — 실내에서 자극을 만드는 10가지 방법",
    subtitle: "비 소리에 예민한 고양이 달래기, 날씨 변화 스트레스 줄이기, 특별한 놀이 루틴",
    metaTitle: "비 오는 날 고양이 실내 놀이 10가지 | 펫지기",
    metaDescription: "비 오는 날 고양이와 실내에서 자극을 만드는 방법 10가지. 비 소리 예민한 고양이 달래기, 날씨 변화 스트레스 관리, 특별한 놀이 루틴을 정리했습니다.",
    body: `<p>비 오는 날 고양이는 대부분 창문 앞에서 빗소리를 들으며 낮잠을 잔다. 하지만 천둥·강한 비바람에 예민한 고양이도 있고, 실내 루틴이 망가지면 에너지가 남는 경우도 있다.</p>

<h2>비 소리에 예민한 고양이 달래기</h2>
<ul>
<li>안전한 숨는 공간 추가 제공 (닫힌 박스·침대 아래)</li>
<li>TV·음악으로 빗소리 차단</li>
<li>페로몬 디퓨저(펠리웨이) 작동</li>
<li>보호자가 옆에 있어주는 것 (강요 없이)</li>
</ul>

<h2>비 오는 날 실내 활동 10가지</h2>
<ol>
<li><strong>새 박스 탐험</strong>: 빈 택배 박스는 언제나 성공적인 자극</li>
<li><strong>종이 뭉치 공</strong>: 구겨진 종이 공을 던져주면 열광하는 고양이 많음</li>
<li><strong>숨바꼭질</strong>: 고양이 눈 앞에서 담요 뒤에 숨고 다시 나타나기</li>
<li><strong>낚싯대 집중 놀이</strong>: 평소보다 더 긴 15~20분 세션</li>
<li><strong>터널 탐험</strong>: 고양이 터널을 다른 방향으로 배치해 새로운 느낌</li>
<li><strong>퍼즐 피더 도전</strong>: 평소보다 어려운 레벨의 퍼즐 사용</li>
<li><strong>캣닙 타임</strong>: 평소와 다른 요일에 제공 → 신선함</li>
<li><strong>손가락 미로</strong>: 담요 아래 손가락을 움직여 사냥 유도</li>
<li><strong>새 장난감 데뷔</strong>: 비 오는 날을 새 장난감 공개 날로 활용</li>
<li><strong>그루밍 시간</strong>: 편안한 상태에서 긴 브러싱 세션</li>
</ol>

<h2>마지막으로</h2>
<p>비 오는 날은 보호자와 고양이가 집에 함께 있는 특별한 날이다. 서로의 페이스를 존중하면서 조용하게 함께하는 시간 자체가 고양이에게 큰 자극이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "International Cat Care — Indoor Activities for Cats",
      "한국고양이보호협회 실내 자극 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-23T09:00:00.000Z",
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
  console.log("블로그 포스트 63차 시딩 완료! (blog-436 ~ blog-440)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
