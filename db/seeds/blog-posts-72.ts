import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 72 — cat1×2 + cat3×1 + cat5×1 + cat4×1 = 5편 (IDs 481-485)
// Macros: D, A, B, F, G
// Angles: RA8, RA4, RA7, RA2, RA3

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-481",
    slug: "senior-dog-adoption-guide",
    type: "blog",
    category: 1,
    title: "노령견 입양 — 7살 이상 강아지를 입양한다는 것의 의미",
    subtitle: "노령견 입양의 현실, 장점, 준비사항, 의료비 계획, 짧은 시간의 아름다움",
    metaTitle: "노령견 입양 — 7살 이상 강아지 입양 가이드와 현실 | 펫지기",
    metaDescription: "노령견 입양은 특별한 선택입니다. 7살 이상 강아지 입양의 현실적 장점, 준비사항, 의료비 계획, 짧지만 깊은 함께하는 시간을 정리했습니다.",
    body: `<p>보호소에서 노령견은 가장 나중에 입양된다. 어린 강아지보다 남은 시간이 짧다는 이유에서다. 그러나 노령견 입양을 경험한 보호자들은 종종 "그것이 오히려 더 깊은 관계를 만들었다"고 말한다.</p>

<h2>노령견 입양의 장점</h2>
<ul>
<li>훈련·사회화가 이미 된 경우가 많다</li>
<li>에너지 레벨이 예측 가능하고 낮다</li>
<li>어린 강아지 특유의 파괴 행동이 없다</li>
<li>이미 성격이 형성되어 내 생활 방식과 맞는지 판단하기 쉽다</li>
</ul>

<h2>준비해야 할 것들</h2>
<div class="callout-dog">
<strong>노령견 입양 전 준비사항</strong><br>
• 입양 직후 종합 건강 검진 (기저 질환 파악)<br>
• 관절·심장·신장 등 노령 질환 대비 의료비 계획<br>
• 미끄럼 방지 매트, 낮은 침대, 경사로 설치<br>
• 인근 24시간 동물병원 파악<br>
• 펫보험 (노령견은 보험 가입 제한 있으므로 미리 확인)
</div>

<h2>의료비 현실</h2>
<p>노령견은 건강한 상태로 입양되더라도 1~2년 내 노령 질환이 발생할 가능성이 있다. 연간 의료비 예산을 최소 30~100만 원 이상으로 설정하는 것이 현실적이다. 예상치 못한 응급 상황에 대비한 비상금도 필요하다.</p>

<h2>짧은 시간의 깊이</h2>
<p>노령견과 함께하는 시간이 짧을 수 있다. 그러나 많은 보호자들이 "처음부터 함께한 것보다 더 강렬하게 사랑했다"고 말한다. 남은 시간을 아는 것이 오히려 매 순간을 더 소중하게 만들기도 한다.</p>

<h2>마지막으로</h2>
<p>노령견 입양은 자선이 아니다. 그 개도 당신에게 무언가를 준다 — 다 자란 사랑, 고요한 동반자 관계, 그리고 남은 시간을 함께할 누군가. 그것은 충분히 아름다운 선택이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국동물복지협회 노령 동물 입양 현황 보고서 2023",
      "ASPCA — Adopting a Senior Dog",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-12T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-482",
    slug: "rescue-cat-333-rule",
    type: "blog",
    category: 1,
    title: "구조묘 입양 후 3-3-3 규칙 — 왜 서두르면 안 되는가",
    subtitle: "3일·3주·3개월 각 단계 특징, 단계별 보호자 행동 지침, 숨는 고양이 대처법",
    metaTitle: "구조묘 3-3-3 규칙 — 입양 후 적응 단계별 행동 가이드 | 펫지기",
    metaDescription: "구조묘 입양 후 적응을 돕는 3-3-3 규칙. 처음 3일·3주·3개월 각 단계 특징과 보호자 행동 지침, 숨는 고양이 대처법을 정리했습니다.",
    body: `<p>구조된 고양이를 입양했는데 침대 밑에서 나오질 않는다. 먹지도 않는다. 불렀는데 무반응이다. 이것은 고양이가 문제가 아니라, 정상적인 적응 과정이다.</p>

<h2>3-3-3 규칙이란</h2>
<p>구조·보호소 출신 고양이의 적응을 3단계로 나누는 가이드라인이다. 각 단계가 며칠·몇 주·몇 달 단위로 진행되며, 보호자가 각 단계에서 어떻게 행동해야 하는지를 제시한다.</p>

<h2>처음 3일 — 극도의 경계</h2>
<ul>
<li>고양이는 완전히 얼어붙어 있다</li>
<li>음식·물·화장실 위치만 조용히 알려주기</li>
<li>강제로 꺼내거나 만지지 않기</li>
<li>작은 방에서 시작 — 넓은 공간은 더 불안하게 만든다</li>
</ul>

<h2>3주 후 — 규칙 파악 시작</h2>
<div class="callout-cat">
<strong>3주 단계 신호</strong><br>
• 밥 먹는 것을 보여주기 시작<br>
• 화장실을 스스로 찾아감<br>
• 보호자의 냄새에 익숙해짐<br>
• 천천히 가까이 다가오는 시도<br>
▶ 이 시기에 강요는 금물 — 고양이가 먼저 다가올 때까지
</div>

<h2>3개월 후 — 진짜 성격 드러남</h2>
<p>3개월이 지나야 그 고양이의 진짜 성격이 나타난다. 입양 초기에 소극적이었던 고양이가 알고 보니 매우 활발한 경우도 있고, 그 반대도 있다. 3개월 전 "이 고양이랑 안 맞는다"는 판단은 성급하다.</p>

<h2>숨는 고양이 대처법</h2>
<ul>
<li>억지로 끄집어내지 않기</li>
<li>숨은 장소 옆에서 조용히 앉아있기 (강요 없이)</li>
<li>맛있는 간식을 가까이 두기</li>
<li>목소리에 익숙해지게 조용히 말 걸기</li>
</ul>

<h2>마지막으로</h2>
<p>구조묘 적응에는 시간이 필요하다. 그 시간이 얼마나 걸리든 그것이 실패가 아니다. 기다리는 것이 사랑이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국동물복지협회 구조 동물 입양 적응 가이드",
      "Ellis, S.L.H. — Recognizing and Assessing Feline Fear. J Feline Med Surg 2009",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-13T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-483",
    slug: "dog-heartworm-prevention",
    type: "blog",
    category: 3,
    title: "강아지 심장사상충 예방 — 1년에 한 번 검사와 매달 예방약이 중요한 이유",
    subtitle: "심장사상충 감염 경로, 예방약 종류, 검사 주기, 양성 판정 시 치료 과정",
    metaTitle: "강아지 심장사상충 예방 — 예방약·검사 주기·감염 경로 가이드 | 펫지기",
    metaDescription: "강아지 심장사상충 예방의 중요성을 정리했습니다. 모기를 통한 감염 경로, 예방약 종류, 연 1회 검사 이유, 양성 판정 시 치료 과정을 알아보세요.",
    body: `<p>심장사상충은 예방이 쉽고 치료가 어렵다. 매달 예방약을 먹이는 습관 하나가 매우 큰 차이를 만든다.</p>

<h2>심장사상충이란</h2>
<p>모기가 매개하는 기생충(Dirofilaria immitis)이다. 감염된 모기에게 물리면 유충이 혈관을 통해 심장·폐동맥에 자리를 잡고 성충으로 자란다. 성충은 최대 30cm에 이르며, 치료하지 않으면 심부전으로 이어진다.</p>

<h2>예방이 치료보다 훨씬 쉬운 이유</h2>
<ul>
<li>예방약: 월 1회 투약, 비용 1만 원대</li>
<li>치료: 비소 기반 주사 처치, 수개월 엄격한 운동 제한, 50~200만 원</li>
<li>치료 과정에서 사상충 사멸 시 폐동맥 색전증 위험</li>
</ul>

<h2>예방약 종류</h2>
<div class="callout-dog">
<strong>심장사상충 예방약 종류</strong><br>
• <strong>경구형</strong>: 하트가드(이버멕틴), 인터셉터(밀베마이신) — 월 1회 투약<br>
• <strong>국소도포형</strong>: 혁명(세라멕틴) — 월 1회 피부 도포<br>
• <strong>주사형</strong>: 프로하트(목시덱틴) — 6개월~12개월 지속<br>
▶ 강아지 체중에 맞는 용량 선택 필수
</div>

<h2>연 1회 검사가 필요한 이유</h2>
<p>예방약을 꾸준히 먹여도 투약 날짜를 잊거나, 토해내는 경우 감염될 수 있다. 연 1회 항원 검사로 감염 여부를 확인하는 것이 권장된다. 조기에 발견할수록 치료 성공률이 높다.</p>

<h2>마지막으로</h2>
<p>심장사상충 예방은 매달 달력에 표시해두는 습관으로 충분하다. 1만 원짜리 예방이 수백만 원 치료를 막는다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "American Heartworm Society — Canine Heartworm Disease Guidelines 2023",
      "한국수의기생충학회 심장사상충 예방 지침",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-13T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-484",
    slug: "dog-separation-anxiety-protocol",
    type: "blog",
    category: 5,
    title: "강아지 분리불안 단계별 훈련 프로토콜",
    subtitle: "분리불안 경증·중증 구분, 단계별 독립 훈련, 보조 도구, 약물 병행 시점",
    metaTitle: "강아지 분리불안 훈련 — 경증·중증 단계별 완전 가이드 | 펫지기",
    metaDescription: "강아지 분리불안을 단계별로 훈련하는 방법을 정리했습니다. 경증과 중증 구분 기준, 단계별 독립 훈련, 보조 도구 활용, 약물 병행 시점을 알아보세요.",
    body: `<p>분리불안은 강아지가 보호자와 분리될 때 극도의 불안을 경험하는 상태다. 단순한 '습관'이 아니라 실제 심리적 고통이므로, 처벌이 아닌 체계적인 훈련으로 접근해야 한다.</p>

<h2>경증 vs 중증 구분</h2>
<ul>
<li><strong>경증</strong>: 외출 후 10~15분 내 진정, 파괴 행동 경미, 귀가 후 과도한 흥분</li>
<li><strong>중증</strong>: 외출 직후 계속 짖거나 울음, 자해·파괴 행동, 혼자 있을 때 먹지도 않음</li>
</ul>

<h2>단계별 독립 훈련 (경증 기준)</h2>
<div class="callout-dog">
<strong>독립 훈련 단계</strong><br>
1단계: 방 나갔다가 3초 후 복귀 → 차분하게 인사<br>
2단계: 5초 → 10초 → 30초 → 1분 (점진적 연장)<br>
3단계: 문 밖 나갔다가 복귀<br>
4단계: 30분 → 1시간 → 2시간 (목표)<br>
▶ 불안 신호 보이면 이전 단계로 후퇴 — 서두르지 않기
</div>

<h2>보조 도구 활용</h2>
<ul>
<li>Kong 냉동 간식: 외출 직전 제공 → 외출과 긍정적 연결</li>
<li>DAP 페로몬 디퓨저: 불안 감소 보조 효과</li>
<li>배경 소리: 클래식 음악 또는 TV (고요함보다 익숙한 소리)</li>
</ul>

<h2>약물 병행 시점</h2>
<p>중증 분리불안은 훈련만으로 해결이 어렵다. 행동 수의사 상담을 통해 항불안제(플루옥세틴·클로미프라민 등)를 훈련과 병행하면 효과적이다. 약물은 훈련을 대체하는 것이 아니라 훈련이 가능한 상태로 만들어주는 역할이다.</p>

<h2>마지막으로</h2>
<p>분리불안 훈련은 주 단위, 월 단위의 인내가 필요하다. 단계를 서두르면 오히려 악화된다. 꾸준히, 천천히, 그 강아지의 속도에 맞추는 것이 가장 빠른 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Flannigan, G. & Dodman, N.H. — Risk factors and behaviors associated with separation anxiety in dogs. JAVMA 2001",
      "한국반려동물행동상담협회 분리불안 치료 프로토콜",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-14T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-485",
    slug: "pet-airplane-travel-regulation",
    type: "blog",
    category: 4,
    title: "반려동물 항공 이동 규정 — 기내 vs 화물칸, 항공사별 차이",
    subtitle: "기내 반입 조건, 화물칸 위험성, 국제선 입국 검역, 항공사별 정책 차이",
    metaTitle: "반려동물 항공 이동 규정 — 기내 반입·화물칸·검역 완전 가이드 | 펫지기",
    metaDescription: "반려동물 항공 이동 규정을 정리했습니다. 기내 반입 조건, 화물칸 위험성, 국제선 입국 검역 절차, 주요 항공사별 정책 차이를 알아보세요.",
    body: `<p>반려동물을 비행기에 태우는 것은 생각보다 복잡한 과정이다. 항공사마다 규정이 다르고, 잘못 준비하면 탑승이 거절될 수 있다.</p>

<h2>기내 반입 조건 (일반적 기준)</h2>
<ul>
<li>소형견·고양이 한정 (체중 기준 일반적으로 7~10kg 이하, 이동장 포함)</li>
<li>이동장 크기 기준 (좌석 아래 들어가는 크기 — 약 55×40×20cm)</li>
<li>이동장 안에서 편히 서고 돌 수 있을 것</li>
<li>항공사 사전 예약 필수 (1~2기 한정)</li>
</ul>

<h2>화물칸 위험성</h2>
<div class="callout-dog">
<strong>화물칸 이동 주의사항</strong><br>
• 온도·압력 조절이 되지만 기내보다 스트레스 높음<br>
• 단두종(퍼그·프렌치불독 등)은 호흡 위험으로 많은 항공사 금지<br>
• 여름 고온 시즌 화물칸 반려동물 사망 사례 보고<br>
• 불가피한 경우 이른 아침 또는 저녁 비행편 선택
</div>

<h2>국제선 입국 검역</h2>
<p>국가별 검역 요건이 다르다. 한국 입국 기준: 광견병 예방접종 증명서, 건강 증명서(영문), 마이크로칩 확인. 일부 국가(뉴질랜드·호주 등)는 수개월 검역 격리가 필요하다.</p>

<h2>항공사별 정책 차이</h2>
<ul>
<li>대한항공·아시아나: 기내 반입 가능 (소형), 화물칸 선택 가능</li>
<li>LCC 항공사 다수: 화물칸 전용 또는 반려동물 운송 미제공</li>
<li>예약 전 항공사 홈페이지 최신 정책 반드시 확인</li>
</ul>

<h2>마지막으로</h2>
<p>항공 이동은 반려동물에게 큰 스트레스다. 불가피한 경우라면 수의사 상담을 통해 안정제 필요 여부를 확인하고, 항공사 정책을 최소 2주 전에 확인해 사전 예약하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "국토교통부 항공안전법 제70조 (항공화물 운송 기준)",
      "농림축산검역본부 반려동물 수출입 검역 안내",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-14T11:00:00.000Z",
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
  console.log("블로그 포스트 72차 시딩 완료! (blog-481 ~ blog-485)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
