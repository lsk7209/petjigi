import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 100 — cat3×2 + cat1×1 + cat5×1 + cat6×1 = 5편 (IDs 621-625)
// Macros: D, A, F, B, E
// Angles: RA2, RA1, RA4, RA7, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-621",
    slug: "dog-lipoma-fatty-tumor-guide",
    type: "blog",
    category: 3,
    title: "강아지 지방종 — 혹이 생겼는데 수술이 필요한가",
    subtitle: "지방종 특징, 악성 종양과 구분하는 방법, 수술 적응증, 모니터링 방법",
    metaTitle: "강아지 지방종 — 악성 종양과 구분·수술 기준·모니터링 가이드 | 펫지기",
    metaDescription: "강아지 지방종 특징과 악성 종양을 구분하는 방법. 지방종 세침흡인 검사, 수술이 필요한 경우와 그렇지 않은 경우, 집에서 모니터링하는 방법을 정리했습니다.",
    body: `<p>중년 이상의 강아지 피부 밑에 말랑한 혹이 만져지는 경우가 흔하다. 상당수는 양성인 지방종이지만, 외관과 촉감만으로는 악성 종양과 구분할 수 없다. 혹이 생겼을 때 해야 할 일과 수술을 고려하는 기준을 정리했다.</p>

<h2>지방종이란</h2>
<p>지방종(lipoma)은 지방세포로 이루어진 양성 종양이다. 대개 피부 밑에서 부드럽고 움직이며 통증이 없고 천천히 자란다. 코넬대 수의과대학은 지방종이 중년 이후, 비만한 개에서 흔하다고 설명한다.</p>

<h2>모든 혹은 검사가 먼저</h2>
<div class="callout-dog">
<strong>세침흡인검사(FNA)가 필요한 이유</strong><br>
• 지방종과 비만세포종, 연부조직 육종 등은 만져서는 구분하기 어렵다<br>
• FNA는 가는 바늘로 세포를 채취해 현미경으로 보는 간단한 검사로, 대개 마취 없이 진행한다<br>
• 일부 세포만 채취하므로 결과가 모호하면 조직검사를 추가할 수 있다<br>
• 새로운 혹이 생길 때마다 각각 검사하는 것이 안전하다
</div>

<h2>지방종의 종류</h2>
<table>
<thead><tr><th>종류</th><th>특징</th></tr></thead>
<tbody>
<tr><td>단순 지방종</td><td>가장 흔하다. 피하에 경계가 분명하게 만져진다</td></tr>
<tr><td>침윤성 지방종</td><td>근육 등 주변 조직으로 파고든다. 비교적 빨리 자라고 수술 후 재발 위험이 높다</td></tr>
</tbody>
</table>

<h2>수술을 고려하는 경우</h2>
<p>양성 지방종은 대개 제거가 필수는 아니다. 다음과 같을 때 수술을 상의한다.</p>
<ul>
<li>FNA 결과 악성이 의심되거나 확인된 경우</li>
<li>겨드랑이·사타구니처럼 걸음을 방해하거나 호흡·배변을 방해하는 위치인 경우</li>
<li>빠르게 커지거나 침윤성이 의심되는 경우</li>
<li>커져서 궤양, 감염, 피부 손상이 생긴 경우</li>
</ul>
<p>혹이 작을 때 제거하는 것이 수술 범위와 회복 면에서 유리하다는 의견이 있다. 크기가 커지면 수술 후 장액종(seroma) 같은 합병증 가능성도 높아질 수 있다. 미용 목적의 제거는 마취 위험을 고려해 신중히 결정한다.</p>

<h2>관찰할 때 기록할 것</h2>
<ul>
<li>크기(자로 재거나 사진으로 비교), 위치, 개수</li>
<li>촉감 변화 (딱딱해짐, 열감, 붉어짐)</li>
<li>성장 속도, 개의 불편 여부</li>
</ul>

<h2>예방과 관리</h2>
<p>지방종은 비만과 연관이 있다고 알려져 있어 체중 관리가 도움이 된다. 다만 날씬한 개에서도 생길 수 있다. 정기 검진 때마다 몸 전체를 만져 혹이 있는지 확인하고, 이 글의 정보는 진단이 아니므로 반드시 수의사의 검사를 받자.</p>

<h2>마지막으로</h2>
<p>'지방종이겠지' 하고 두면 악성 종양을 놓칠 수 있다. 새로 만져지는 혹은 검사부터 받자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-information/lipomas-dogs — Cornell Riney Canine Health Center, Lipomas in Dogs",
      "https://www.petmd.com/blogs/fullyvetted/2008/december/fatty-tumors-lumpy-bumpy-lipomas-and-their-care-6645 — PetMD, Lipoma in Dogs",
      "https://www.amcny.org/?p=75393 — Animal Medical Center, My Dog Has a Fatty Tumor, Now What?",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-21T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-622",
    slug: "dog-splenic-hemangiosarcoma-guide",
    type: "blog",
    category: 3,
    title: "강아지 비장 혈관육종 — 갑작스러운 쇼크의 숨은 원인",
    subtitle: "비장 혈관육종 특성, 경고 신호 없이 찾아오는 이유, 조기 발견 방법",
    metaTitle: "강아지 비장 혈관육종 — 갑작스러운 쇼크 원인과 조기 발견 가이드 | 펫지기",
    metaDescription: "강아지 비장 혈관육종이 갑작스러운 쇼크를 일으키는 이유. 증상 없이 진행되는 특성, 고위험 품종, 조기 발견을 위한 정기 검진 방법을 정리했습니다.",
    body: `<p>혈관육종(hemangiosarcoma)은 혈관 내피세포에서 생기는 악성 종양으로, 노령의 대형견 비장에서 가장 흔히 발견된다. 초기에는 증상이 거의 없다가 종양이 파열되면 갑자기 쓰러지는 응급 상황으로 나타나는 경우가 많다. 어떤 신호를 알아야 하고, 진단과 치료는 어떻게 이뤄지는지 정리했다.</p>

<h2>어떤 병인가</h2>
<p>코넬대 수의과대학은 혈관육종이 비장이나 심장에서 흔히 발생하며 노령, 대형 견종에서 많다고 설명한다. 혈액이 풍부한 종양이라 파열하면 복강이나 심낭 안으로 출혈이 일어날 수 있다. 저먼 셰퍼드, 골든 리트리버, 래브라도 리트리버 등이 호발 견종으로 알려져 있다.</p>

<h2>증상</h2>
<table>
<thead><tr><th>시기</th><th>신호</th></tr></thead>
<tbody>
<tr><td>초기 (모호함)</td><td>기운 없음, 운동을 싫어함, 식욕 감소, 잇몸이 창백해졌다 돌아옴</td></tr>
<tr><td>출혈이 있을 때</td><td>갑작스러운 쓰러짐·심한 허약, 창백한 잇몸, 빠르고 힘든 호흡, 배가 부풀어 오름</td></tr>
<tr><td>일시적 회복</td><td>출혈이 멈추면 잠깐 괜찮아 보일 수 있으나 다시 출혈할 수 있다</td></tr>
</tbody>
</table>

<div class="callout-dog">
<strong>응급 신호</strong><br>
• 갑자기 쓰러지거나 일어나지 못한다<br>
• 잇몸이 하얗거나 매우 창백하다<br>
• 숨이 가쁘고 배가 급격히 팽창했다<br>
→ 즉시 응급 동물병원으로 이동한다. 중간에 증상이 나아져도 진료는 받아야 한다
</div>

<h2>비장 종괴가 있다고 모두 악성은 아니다</h2>
<p>비장에 혹이 발견되었다고 해서 모두 혈관육종은 아니다. 양성 혈종이나 결절성 과형성 같은 양성 병변도 있다. 하지만 수술 전에는 구분하기가 어렵다. 영상 검사(복부 초음파, 흉부 방사선), 혈액 검사, 심장 초음파로 전이와 심장 침범 여부를 확인하고, 수술 후 조직 검사로 확진한다.</p>

<h2>치료와 예후</h2>
<ul>
<li><strong>수술</strong>: 비장 적출이 기본이다. 출혈이 있는 응급 상황에서는 안정화(수액, 수혈)를 먼저 한다.</li>
<li><strong>항암 치료</strong>: 수술 후 전이를 늦추기 위해 항암제를 병행하기도 한다.</li>
<li><strong>예후</strong>: 악성 혈관육종은 전이가 빠른 경우가 많아 예후가 좋지 않은 편이다. 생존 기간은 병기와 치료 방식에 따라 크게 다르므로 담당 수의사나 종양 전문의와 상의한다.</li>
<li><strong>완화 치료</strong>: 수술이나 항암 치료가 어려우면 삶의 질을 유지하는 완화 치료를 선택할 수 있다.</li>
</ul>

<h2>조기 발견을 위한 정기 검진</h2>
<ul>
<li>대형견은 중년 이후 복부 초음파를 포함한 정기 검진을 고려한다.</li>
<li>만성적인 무기력, 체중 감소, 빈혈이 있으면 원인을 확인한다.</li>
<li>혈관육종은 예방할 수 있는 방법이 확립되어 있지 않다.</li>
</ul>

<h2>마지막으로</h2>
<p>비장 종양은 어느 순간 응급으로 변할 수 있다. 호발 견종을 키운다면 정기 검진을 받고, 쓰러지거나 잇몸이 창백하면 즉시 응급실로 가자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-information/hemangiosarcoma-dogs — Cornell Riney Canine Health Center, Hemangiosarcoma in Dogs",
      "https://vcahospitals.com/know-your-pet/vascular-tumors — VCA, Visceral Vascular Tumors - Hemangioma and Hemangiosarcoma",
      "https://www.akc.org/expert-advice/health/hemangiosarcoma-in-dogs/ — AKC, Hemangiosarcoma in Dogs",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-22T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-623",
    slug: "cat-dog-first-meeting-guide",
    type: "blog",
    category: 1,
    title: "고양이와 강아지 첫 만남 — 평화로운 공존을 위한 단계별 방법",
    subtitle: "종간 소개 프로토콜, 격리 기간, 강아지 통제 훈련, 갈등 신호 인지",
    metaTitle: "고양이·강아지 첫 만남 — 평화로운 공존 단계별 가이드 | 펫지기",
    metaDescription: "고양이와 강아지가 처음 만날 때 평화롭게 공존시키는 방법. 격리 기간, 냄새 교환, 강아지 통제 훈련, 갈등 신호 인지, 완전 합방 기준을 정리했습니다.",
    body: `<p>고양이가 있는 집에 강아지를 입양하거나, 반대의 경우가 점점 많아지고 있다. 신중한 소개가 평생의 관계를 결정한다.</p>

<h2>핵심 원칙</h2>
<p>강아지는 고양이를 쫓는 것이 본능이다. 고양이는 쫓기는 것을 위협으로 인식한다. 처음부터 강제 대면은 양쪽 모두에게 트라우마가 된다.</p>

<h2>소개 단계</h2>
<div class="callout-cat">
<strong>고양이·강아지 소개 프로토콜</strong><br>
1단계 (3~7일): 완전 격리. 각자의 냄새에 익숙해지기<br>
2단계 (3~7일): 수건 냄새 교환. 서로의 냄새 + 간식 연결<br>
3단계 (3~7일): 문 통해 소통. 강아지 리드줄 필수<br>
4단계: 강아지 리드줄 착용 + 고양이 자유 이동 가능<br>
5단계: 감시하에 짧은 합방
</div>

<h2>강아지 통제 훈련 필수</h2>
<ul>
<li>"앉아"·"기다려" 명령어 안정적으로 작동해야 합방 시작</li>
<li>고양이를 쫓거나 응시하면 즉시 리다이렉션</li>
<li>고양이가 달리면 추격 본능 자극 — 이 상황을 만들지 않기</li>
</ul>

<h2>고양이를 위한 탈출 공간</h2>
<ul>
<li>강아지가 따라올 수 없는 높은 공간</li>
<li>강아지 게이트로 분리된 고양이 전용 방</li>
<li>고양이가 언제든 피할 수 있어야 진행 가능</li>
</ul>

<h2>마지막으로</h2>
<p>고양이와 강아지의 공존은 가능하다. 그러나 서두르면 반드시 갈등이 생긴다. 각 동물의 속도에 맞게 천천히 진행하면 결국 함께 자는 사이가 될 수도 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Landsberg, G. et al. — Handbook of Behavior Problems of the Dog and Cat. Elsevier 2013",
      "한국반려동물행동상담협회 종간 소개 프로토콜",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-22T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-624",
    slug: "dog-hiking-safety-guide",
    type: "blog",
    category: 5,
    title: "반려견과 등산 — 즐거운 산행을 위한 안전 수칙",
    subtitle: "강아지 등산 적합 조건, 발바닥 보호, 수분 관리, 자연보호구역 규정",
    metaTitle: "반려견 등산 안전 가이드 — 적합 조건·발바닥·수분·법규 | 펫지기",
    metaDescription: "반려견과 함께 등산할 때 안전 수칙. 등산에 적합한 강아지 조건, 발바닥 보호 방법, 수분 관리, 자연공원 반려동물 규정을 정리했습니다.",
    body: `<p>반려견과 등산은 좋은 활동이지만, 준비 없이 나서면 강아지와 보호자 모두에게 힘든 경험이 될 수 있다.</p>

<h2>등산에 적합한 강아지 조건</h2>
<ul>
<li>1세 이상 (성장판 완성 후 장거리 운동)</li>
<li>기본 체력·운동 내성 확인</li>
<li>예방접종·구충 완료</li>
<li>단두종·심장 질환 보유견 — 장거리 등산 부적합</li>
</ul>

<h2>발바닥 보호</h2>
<div class="callout-dog">
<strong>등산 중 발바닥 관리</strong><br>
• 뾰족한 돌·나뭇가지 → 발바닥 찢김 위험<br>
• 신발(부티) 또는 발바닥 왁스 도포<br>
• 2~3시간마다 발바닥 확인 (출혈·마찰)<br>
• 귀가 후 발 씻기 + 건조<br>
• 진드기 확인: 귀·발가락 사이·겨드랑이
</div>

<h2>수분 관리</h2>
<ul>
<li>강아지 전용 접이식 물그릇 지참</li>
<li>30~40분마다 물 제공</li>
<li>계곡물 직접 마시게 하지 않기 (기생충 위험)</li>
<li>더운 날 → 시간당 50ml/kg 기준 수분 공급</li>
</ul>

<h2>법규 확인 필수</h2>
<ul>
<li>국립공원: 탐방로 반려동물 동반 금지 구역 확인</li>
<li>도립·군립 공원: 지역별 다름 — 사전 확인</li>
<li>목줄 필수 (야생동물 보호 + 다른 탐방객 안전)</li>
</ul>

<h2>마지막으로</h2>
<p>강아지 체력을 과신하지 마라. 강아지는 피곤해도 보호자를 따라온다. 보호자가 강아지의 피로도를 먼저 읽고 적절히 조절하는 것이 안전한 산행의 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "국립공원공단 반려동물 탐방 안내",
      "한국수의응급의학회 야외 활동 안전 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-23T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-625",
    slug: "anticipatory-grief-pet-guide",
    type: "blog",
    category: 6,
    title: "예기 슬픔 — 반려동물이 아직 살아있는데 이미 슬픈 이유",
    subtitle: "예기 슬픔이란, 죄책감 다루기, 남은 시간을 현재에 집중하는 방법",
    metaTitle: "반려동물 예기 슬픔 — 아직 살아있는데 슬픈 감정 다루기 | 펫지기",
    metaDescription: "반려동물이 아직 살아있는데 미리 슬퍼지는 '예기 슬픔'을 다루는 방법. 예기 슬픔이 정상인 이유, 죄책감 다루기, 지금 이 순간에 집중하는 방법을 정리했습니다.",
    body: `<p>말기 진단을 받은 반려동물 옆에서 미리 울고 있다. "아직 살아있는데"라는 죄책감이 든다. 이것은 정상적인 인간의 반응이다.</p>

<h2>예기 슬픔이란</h2>
<p>상실이 실제로 일어나기 전에 경험하는 슬픔이다. 심리학에서 공식적으로 인정되는 개념이다. 말기 질환 가족·반려동물을 돌볼 때 매우 흔하게 경험한다.</p>

<h2>예기 슬픔이 정상인 이유</h2>
<ul>
<li>사랑하는 존재를 잃을 것이라는 현실 인식에서 온다</li>
<li>미리 슬퍼한다고 나중에 덜 슬픈 것은 아니다</li>
<li>그것이 애도의 일부를 미리 통과하는 것일 수 있다</li>
<li>죄책감이 드는 것도 정상 — "아직 살아있는데"라는 생각은 당연하다</li>
</ul>

<h2>죄책감 다루기</h2>
<div class="callout-cat">
<strong>예기 슬픔의 죄책감에 대해</strong><br>
• 미리 슬퍼하는 것이 반려동물을 배신하는 게 아니다<br>
• 슬픔은 사랑의 증거다<br>
• 반려동물은 보호자의 에너지를 느낀다 — 슬프더라도 곁에 있는 것이 위로<br>
• 자기 감정을 억누를 필요 없다
</div>

<h2>지금 이 순간에 집중하는 방법</h2>
<ul>
<li>"오늘은 좋은 날인가" — 오늘 이 순간을 충분히 경험하기</li>
<li>남은 시간에 함께 좋아하는 것 하기</li>
<li>사진·영상 많이 찍어두기</li>
<li>나중에 후회할 것 같은 것들 지금 하기</li>
</ul>

<h2>마지막으로</h2>
<p>예기 슬픔을 경험하고 있다면 당신은 이미 좋은 보호자다. 그 슬픔이 얼마나 깊이 사랑하는지를 말해준다. 지금 이 순간, 곁에 있어 주는 것이 가장 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Lindemann, E. — Symptomatology and management of acute grief. Am J Psychiatry 1944",
      "한국펫로스증후군연구회 예기 슬픔 상담 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-23T11:00:00.000Z",
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
  console.log("블로그 포스트 100차 시딩 완료! (blog-621 ~ blog-625)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
