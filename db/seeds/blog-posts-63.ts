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
    body: `<p>중성화하지 않은 수컷 강아지는 나이가 들면서 전립선 문제가 생기기 쉽다. 전립선은 요도를 감싸고 있어서 커지면 소변과 배변에 영향을 줄 수 있다. 다만 증상이 비슷해도 원인은 양성 비대부터 종양까지 다르므로 검사로 구분해야 한다.</p>

<h2>흔한 전립선 문제</h2>
<table>
<thead><tr><th>질환</th><th>특징</th><th>보호자가 알아둘 점</th></tr></thead>
<tbody>
<tr><td>양성 전립선 비대(BPH)</td><td>중성화하지 않은 수컷에서 가장 흔한 전립선 질환. 남성호르몬 영향으로 커진다</td><td>증상이 없는 개체도 많다. 증상이 있다면 혈뇨나 포피에서 피 섞인 분비물이 흔하다</td></tr>
<tr><td>전립선염</td><td>염증·감염. BPH와 함께 나타나기도 한다</td><td>열, 무기력, 통증이 있으면 빨리 진료가 필요하다</td></tr>
<tr><td>전립선 종양</td><td>대표적으로 전립선 선암</td><td>배뇨·배변 곤란이 나타날 수 있고, 중성화한 개에서도 전립선이 커지면 종양을 의심한다</td></tr>
</tbody>
</table>

<h2>어떤 증상이면 진료를 받아야 하나</h2>
<div class="callout-dog">
<strong>진료가 필요한 신호</strong><br>
• 소변에 피가 섞이거나 포피에서 피 섞인 분비물이 나옴<br>
• 소변을 보려 해도 잘 나오지 않거나 자세를 오래 잡음<br>
• 배변할 때 힘을 많이 주거나 변이 가늘어짐<br>
• 열, 심한 무기력, 식욕 없음<br>
• <strong>소변을 거의 못 보는 상태</strong>는 응급이다 — 바로 동물병원으로
</div>

<h2>검사와 진단</h2>
<p>직장 촉진에서 전립선의 크기와 통증 여부를 확인하고, 필요하면 초음파·소변 검사를 한다. 메르크 수의학 매뉴얼에 따르면 BPH의 확진은 세포검사나 조직검사로 하며, 사람의 PSA 같은 전립선 종양 표지자는 개의 전립선에는 없어서 쓸 수 없다. 종양 의심 시에는 조직검사가 필요하다.</p>

<h2>치료 방향</h2>
<ul>
<li><strong>BPH</strong>: 번식 계획이 없다면 중성화가 일반적으로 선택하는 치료다. 번식견은 호르몬 조절 약물이 연구되어 있으나, 정자 품질에 미치는 영향은 아직 논쟁이 있다. 약 선택은 수의사 처방이 필요하다.</li>
<li><strong>전립선염</strong>: 원인과 상태에 따라 수의사가 치료 계획을 세운다.</li>
<li><strong>종양</strong>: 완치를 기대하기 어려운 경우가 많아 수술, 항암, 방사선, 소염제 등을 상태에 맞춰 조합한다. 전립선 전체 절제는 전이 가능성과 요실금 위험 때문에 권장되지 않는다고 알려져 있다.</li>
</ul>

<h2>마지막으로</h2>
<p>소변 색 변화나 배변 곤란은 나이 탓으로 넘기기 쉽다. 중성화하지 않은 중년 이후 수컷이라면 정기검진에서 전립선 촉진을 요청하고, 혈뇨나 배뇨 곤란이 보이면 기다리지 말고 진료를 받자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.merckvetmanual.com/reproductive-system/prostatic-diseases-in-small-animals/benign-prostatic-hyperplasia-in-dogs — Merck Veterinary Manual, Benign Prostatic Hyperplasia in Dogs",
      "https://www.merckvetmanual.com/reproductive-system/prostatic-diseases-in-small-animals/neoplasms-of-the-prostate-in-dogs — Merck Veterinary Manual, Neoplasms of the Prostate in Dogs",
      "https://vcahospitals.com/know-your-pet/prostate-tumors — VCA, Prostate Tumors",
    ],
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
