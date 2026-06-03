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
    body: `<p>중년 이상 강아지에서 피부 밑에 물렁물렁한 혹이 생기는 경우가 흔하다. 많은 경우 양성 지방종이지만, 모든 혹을 방치해서는 안 된다.</p>

<h2>지방종이란</h2>
<p>지방세포의 양성 종양이다. 특징: 부드럽고 이동 가능, 통증 없음, 서서히 성장, 대부분 피부 아래 피하층에 위치. 고령·비만 강아지에서 더 흔하다.</p>

<h2>세침흡인(FNA) 검사 중요성</h2>
<div class="callout-dog">
<strong>모든 혹에 FNA를 해야 하는 이유</strong><br>
• 지방종과 악성 종양(비만세포종·연부조직 육종 등)은 외관만으로 구분 불가<br>
• FNA: 5분 검사, 비용 2~5만 원<br>
• 결과에 따라 치료 계획이 완전히 달라짐<br>
• "지방종이겠지"로 방치했다가 악성을 늦게 발견하는 경우 흔함
</div>

<h2>수술 적응증</h2>
<ul>
<li>FNA 결과 악성 의심 또는 확진 → 즉시 수술</li>
<li>지방종이라도 크기가 커서 움직임을 방해하는 경우</li>
<li>다리·관절 주변으로 자라는 침윤성 지방종</li>
<li>빠른 속도로 성장하는 경우</li>
</ul>

<h2>수술 없이 모니터링</h2>
<ul>
<li>월 1회 크기 측정 기록 (자 또는 사진)</li>
<li>2주 이내 갑자기 커지면 즉시 수의사 방문</li>
<li>3~6개월마다 수의사 확인</li>
</ul>

<h2>마지막으로</h2>
<p>지방종이 맞더라도 FNA 없이 방치하는 것은 위험하다. 5분의 검사가 불필요한 공포와 진짜 위험의 방치를 모두 막아준다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Bergman, P.J. — Soft Tissue Sarcomas. Withrow and MacEwen's Small Animal Clinical Oncology 2013",
      "한국수의종양학회 지방종 임상 가이드라인",
    ]),
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
    body: `<p>"멀쩡하던 강아지가 갑자기 쓰러졌다." 비장 혈관육종 파열은 예고 없이 찾아오는 경우가 많다.</p>

<h2>비장 혈관육종이란</h2>
<p>혈관을 형성하는 세포의 악성 종양이다. 비장에서 가장 흔하게 발생하고, 심장·피부에도 발생한다. 대형견(저먼셰퍼드·골든·래브라도)에서 발생률이 높다.</p>

<h2>경고 신호 없이 찾아오는 이유</h2>
<p>비장 내부에서 천천히 성장하다가 종양이 파열되면 복강 내 출혈이 발생한다. 이때 갑작스러운 빈혈·쇼크가 나타난다. 파열 전까지 증상이 없는 경우가 많아 "침묵의 암"이라 불린다.</p>

<h2>파열 전 미묘한 신호</h2>
<div class="callout-dog">
<strong>파열 전 나타날 수 있는 신호</strong><br>
• 간헐적인 무기력·활동 감소<br>
• 식욕 감소<br>
• 복부 팽만 (파열 직전)<br>
• 창백한 잇몸<br>
▶ 이런 증상이 반복된다면 즉시 복부 초음파
</div>

<h2>고위험 품종 조기 발견</h2>
<ul>
<li>8세 이상 저먼셰퍼드·골든·래브라도: 연 2회 복부 초음파 권장</li>
<li>심장 초음파 병행 (심장형 혈관육종 동반 가능)</li>
</ul>

<h2>치료</h2>
<ul>
<li>비장 절제: 파열 응급 처치 및 진단</li>
<li>항암 화학요법: 수술 후 보조 (독소루비신 기반)</li>
<li>예후: 수술만 하면 평균 1~3개월, 항암 병행 시 4~6개월</li>
</ul>

<h2>마지막으로</h2>
<p>비장 혈관육종의 예후는 현재로서 좋지 않다. 그러나 고위험 품종에서 정기 초음파로 파열 전에 발견한다면 더 많은 선택지가 생긴다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Brown, N.O. et al. — Canine hemangiosarcoma: retrospective analysis of 104 cases. JAVMA 1985",
      "한국수의종양학회 혈관육종 임상 가이드라인",
    ]),
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
