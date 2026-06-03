import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 124 — cat3×2 + cat1×1 + cat2×1 + cat6×1 = 5편 (IDs 741-745)
// Macros: D, C, B, G, E
// Angles: RA4, RA8, RA2, RA6, RA7

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-741",
    slug: "dog-exocrine-pancreatic-insufficiency",
    type: "blog",
    category: 3,
    title: "강아지 외분비 췌장 기능 부전(EPI) — 먹어도 살이 빠지는 원인",
    subtitle: "EPI 원인·저먼셰퍼드 고위험, 지방변·체중 감소 증상, TLI 진단 검사, 효소 보충 치료",
    metaTitle: "강아지 EPI(외분비 췌장 기능 부전) — 증상·진단·치료 가이드 | 펫지기",
    metaDescription: "강아지 외분비 췌장 기능 부전(EPI) 원인과 치료. 먹어도 살이 빠지는 이유, 지방변·악취 변 증상, TLI 혈액 검사, 췌장 효소 보충과 코발라민 치료.",
    body: `<p>밥을 잘 먹는데 계속 살이 빠지고 변이 기름지며 악취가 심하다면 EPI를 의심해야 한다. 진단이 늦어질수록 영양 결핍이 누적된다.</p>

<h2>EPI란</h2>
<p>외분비 췌장 기능 부전(Exocrine Pancreatic Insufficiency)은 췌장이 소화 효소를 충분히 만들지 못해 음식 소화·흡수가 제대로 이루어지지 않는 질환이다. 저먼셰퍼드·러프콜리에서 유전적 소인이 높고, 만성 췌장염 후유증으로도 발생한다.</p>

<h2>주요 증상</h2>
<div class="callout-dog">
<strong>EPI 의심 증상</strong><br>
• 먹어도 계속 살이 빠짐 (진행성 체중 감소)<br>
• 대량의 지방변(황색, 기름지고 악취 강함)<br>
• 극심한 식욕 증가 (배고픔이 해소되지 않음)<br>
• 간헐적 구토, 가스, 복부 불편감<br>
• 털 상태 악화, 활력 저하
</div>

<h2>진단</h2>
<ul>
<li>혈청 TLI(트립신 유사 면역반응성) 검사: EPI 확진 검사</li>
<li>정상: 5~35 μg/L / EPI: 2.5 이하</li>
<li>코발라민(B12)·엽산 수치: EPI 시 흡수 장애로 결핍 확인</li>
<li>식변(분변 내 지방 확인) 검사: 선별 가능하나 TLI가 더 정확</li>
</ul>

<h2>치료 — 효소 보충이 핵심</h2>
<ul>
<li>췌장 효소 보충제(분말형 췌장 추출물): 매 식사마다 사료에 혼합</li>
<li>식전 30~60분 효소+사료 혼합 → 효소 활성화 후 급여 방식도 있음</li>
<li>코발라민(B12) 보충: 결핍 시 주사 또는 경구 보충</li>
<li>저지방·고소화성 사료 병행: 소화 부담 감소</li>
</ul>

<h2>예후</h2>
<ul>
<li>효소 보충 시작 후 수주 내 증상 개선 시작</li>
<li>대부분 평생 효소 보충 필요</li>
<li>코발라민 결핍 교정 후 회복 속도 빨라짐</li>
<li>적절한 관리 시 정상적인 삶의 질 가능</li>
</ul>

<h2>마지막으로</h2>
<p>EPI는 진단되기 전까지 수개월 이상 영양 결핍 상태가 지속되는 경우가 많다. 먹어도 살이 빠지는 강아지는 TLI 검사부터 요청해보자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Wiberg, M.E. — Exocrine pancreatic insufficiency in dogs. Vet Clin North Am Small Anim Pract 2004",
      "한국수의내과학회 외분비 췌장 질환 진단·치료 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-21T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-742",
    slug: "cat-asthma-chronic-cough",
    type: "blog",
    category: 3,
    title: "고양이 천식 — 기침·헥헥거림이 반복될 때",
    subtitle: "고양이 천식 원인·흡연·향 유발 요인, 기침 자세 특징, 흡입 코르티코스테로이드 치료",
    metaTitle: "고양이 천식 — 기침·헥헥거림 원인·진단·흡입제 치료 가이드 | 펫지기",
    metaDescription: "고양이 천식 원인과 치료. 반복되는 기침·개구 호흡 증상 인식, X선·기관지폐포세척 진단, 흡입 코르티코스테로이드 치료법, 환경 관리 방법.",
    body: `<p>고양이가 허리를 낮추고 목을 앞으로 빼면서 기침하거나 헥헥거린다. 이 자세가 반복된다면 고양이 천식을 의심해야 한다.</p>

<h2>고양이 천식이란</h2>
<p>하부 기도의 만성 염증과 기관지 경련으로 인한 호흡 곤란 질환이다. 흡입 알레르겐(먼지·꽃가루·흡연·향수·모래 화장실 분진)에 의해 유발된다. 샴·히말라얀에서 발생률이 높다고 알려져 있다.</p>

<h2>증상</h2>
<div class="callout-cat">
<strong>고양이 천식 특징적 증상</strong><br>
• 기침: 허리를 낮추고 목을 앞으로 뺀 자세<br>
• 개구 호흡: 입을 벌리고 숨쉬기 (고양이에서는 비정상)<br>
• 헥헥거림, 숨찬 소리<br>
• 청색증: 심한 발작 시 잇몸·혀가 보라색으로 변함<br>
▶ 개구 호흡·청색증은 즉시 응급 처치 필요
</div>

<h2>진단</h2>
<ul>
<li>흉부 방사선: 과팽창 패턴, 기관지 비후</li>
<li>기관지폐포세척(BAL): 확진 및 감별 진단</li>
<li>호산구 증가: 알레르기성 천식 시사</li>
<li>심장 사상충·폐충 감별 필요</li>
</ul>

<h2>치료 — 흡입 코르티코스테로이드</h2>
<ul>
<li>흡입 코르티코스테로이드(플루티카손): 장기 관리의 핵심, 부작용 적음</li>
<li>흡입 기관지 확장제(살부타몰): 급성 발작 시 응급 사용</li>
<li>경구 스테로이드: 흡입제 사용 불가 시, 또는 중증 발작</li>
<li>AeroKat 흡입기: 고양이 전용 스페이서, 집에서 사용 가능</li>
</ul>

<h2>환경 관리</h2>
<ul>
<li>실내 흡연 절대 금지</li>
<li>향초·에어프레셔너·방향제 사용 제한</li>
<li>모래 화장실 → 먼지 적은 저분진 모래로 교체</li>
<li>공기청정기: HEPA 필터 사용 권장</li>
<li>카펫 → 마루로 교체 고려</li>
</ul>

<h2>마지막으로</h2>
<p>고양이 천식은 완치보다 관리가 목표다. 흡입 치료와 환경 개선을 병행하면 발작 빈도를 크게 줄일 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Padrid, P.A. — Feline asthma: diagnosis and treatment. Vet Clin North Am Small Anim Pract 2000",
      "한국고양이수의사회 천식 및 하부 기도 질환 관리 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-21T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-743",
    slug: "blind-deaf-dog-adoption-guide",
    type: "blog",
    category: 1,
    title: "시각·청각 장애견 입양 — 특수 요구 반려견과 함께",
    subtitle: "시각·청각 장애견 특성 이해, 안전 환경 구성, 훈련 방법 차이, 입양 전 준비 사항",
    metaTitle: "시각·청각 장애견 입양 — 특수 요구 반려견 함께하기 가이드 | 펫지기",
    metaDescription: "시각·청각 장애견 입양 준비 가이드. 청각 장애견 손동작 훈련, 시각 장애견 안전 환경 구성, 입양 전 준비 사항, 장애견과 함께하는 생활 현실.",
    body: `<p>시각이나 청각에 장애가 있는 강아지도 행복하게 살 수 있다. 다른 방식으로 세상을 경험할 뿐이다. 조금 다른 준비가 필요하다.</p>

<h2>청각 장애견 — 달마시안·화이트 품종 고위험</h2>
<p>선천성 청각 장애는 달마시안·화이트 잭 러셀·화이트 불독 등 흰색 털·파란 눈 품종에서 높은 비율로 발생한다. 귀의 달팽이관 이상이 원인이다. 소리 대신 시각 신호와 진동으로 소통한다.</p>

<h2>청각 장애견 훈련 방법</h2>
<div class="callout-dog">
<strong>청각 장애견 훈련 핵심</strong><br>
• 모든 명령어를 손 신호(수화)로 대체<br>
• 진동 목걸이(충격 아닌 진동 기능): 거리에서 주의 끌기용<br>
• 플래시라이트: 멀리서 신호 보내기<br>
• 눈 맞춤 훈련: 보호자를 자주 확인하도록 훈련<br>
• 잠든 중 건드릴 때: 갑작스러운 접촉 전 진동으로 알리기
</div>

<h2>시각 장애견 안전 환경 구성</h2>
<ul>
<li>가구 배치 고정: 자주 바꾸지 않기 → 공간 지도 형성 가능</li>
<li>날카로운 가구 모서리 보호</li>
<li>계단·낭떠러지: 울타리로 차단</li>
<li>수영장·연못: 접근 제한</li>
<li>향기 마커: 다른 공간에 다른 냄새 스프레이로 공간 인식 보조</li>
</ul>

<h2>시각 장애견 훈련</h2>
<ul>
<li>언어 명령어 훈련이 더 중요 (시각 신호 불가)</li>
<li>접근 전 항상 목소리로 먼저 알리기</li>
<li>처음 환경 소개: 보호자와 함께 천천히 전체 공간 탐색</li>
<li>코 활용 촉진: 노즈워크, 냄새 탐색 훈련으로 공간 파악 보조</li>
</ul>

<h2>입양 전 준비 사항</h2>
<ul>
<li>수의사 진단 확인: 장애 유형·원인 명확히 파악</li>
<li>가정 환경 안전 점검</li>
<li>장애견 경험 있는 트레이너 연결 가능 여부</li>
<li>심리적 준비: 더 많은 인내와 일관성 필요</li>
</ul>

<h2>마지막으로</h2>
<p>장애견은 약하지 않다. 세상을 다르게 경험할 뿐이다. 준비된 보호자와 함께라면 충분히 행복한 삶이 가능하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Strain, G.M. — Deafness in dogs and cats. J Vet Behav 2012",
      "한국반려동물행동교정사협회 특수 요구 반려견 훈련 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-22T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-744",
    slug: "pet-vitamin-d-toxicity-risk",
    type: "blog",
    category: 2,
    title: "반려동물 비타민D 과잉 — 보충제 과다 투여의 위험",
    subtitle: "비타민D 독성 증상, 과다 투여 원인, 고칼슘혈증 신장 손상, 적정 비타민D 기준",
    metaTitle: "반려동물 비타민D 과잉 독성 — 보충제 과다 투여 위험 가이드 | 펫지기",
    metaDescription: "반려동물 비타민D 과잉 독성 위험. 개·고양이 비타민D 과다 투여 증상(다음다갈증·구토·무기력), 고칼슘혈증 신장 손상, 적정 비타민D 함량 기준.",
    body: `<p>건강에 좋다고 알려진 비타민D도 과하면 반려동물에게 독이 된다. 보충제를 사람 기준으로 먹이거나 사료 외 추가 급여하면 위험할 수 있다.</p>

<h2>비타민D 독성이 발생하는 경로</h2>
<ul>
<li>사람용 비타민D 보충제를 반려동물에게 급여</li>
<li>비타민D 함량 높은 보충제 중복 사용</li>
<li>비타민D 과량 처방식 사료 + 별도 보충제 병행</li>
<li>살서제(쥐약): 일부 제품이 비타민D 성분 포함 → 섭취 시 독성</li>
</ul>

<h2>비타민D 독성 증상</h2>
<div class="callout-dog">
<strong>비타민D 과잉 독성 증상</strong><br>
• 다음다갈증(물 많이 마시고 소변 많이 봄)<br>
• 구토, 식욕 저하, 체중 감소<br>
• 무기력, 쇠약<br>
• 관절 통증, 경직<br>
• 심한 경우: 신부전, 심장 이상, 연조직 석회화<br>
▶ 증상은 섭취 후 12~36시간 내 시작
</div>

<h2>기전 — 왜 위험한가</h2>
<p>비타민D 과잉은 혈중 칼슘 농도를 비정상적으로 높인다(고칼슘혈증). 과잉 칼슘은 신장·심장·혈관에 석회화를 일으키며 신부전으로 이어질 수 있다.</p>

<h2>진단과 치료</h2>
<ul>
<li>혈청 칼슘·인·비타민D 수치 검사</li>
<li>즉각 급여 중단, 수액 치료로 칼슘 배출 촉진</li>
<li>코르티코스테로이드: 칼슘 흡수 억제</li>
<li>신장 손상 정도에 따라 예후 달라짐</li>
</ul>

<h2>적정 비타민D 기준</h2>
<ul>
<li>완전 균형 사료(AAFCO 인증)를 먹이는 경우: 추가 비타민D 보충 불필요</li>
<li>수의사 처방 없이 비타민D 단독 보충제 급여는 권장하지 않음</li>
<li>강아지·고양이의 비타민D 필요량은 사람과 다름 — 사람용 기준 적용 금지</li>
</ul>

<h2>마지막으로</h2>
<p>좋은 것도 과하면 독이다. 완전 균형 사료를 먹이고 있다면 별도 비타민D 보충은 필요 없다. 보충제를 추가하고 싶다면 먼저 수의사와 상담하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Dittmer, K.E. & Thompson, K.G. — Vitamin D metabolism and rickets in domestic animals. Vet Pathol 2011",
      "한국수의영양학회 반려동물 지용성 비타민 독성 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-22T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-745",
    slug: "pet-loss-anniversary-memorial-day",
    type: "blog",
    category: 6,
    title: "반려동물 기일 — 기억의 날을 어떻게 보낼 것인가",
    subtitle: "기일의 의미, 슬픔을 다루는 방법, 혼자 또는 함께 추모하는 방식, 다음 해로 이어가기",
    metaTitle: "반려동물 기일 — 기억의 날을 보내는 방법과 추모의 의미 | 펫지기",
    metaDescription: "반려동물 기일을 보내는 방법과 추모의 의미. 기일이 슬픔 처리에 도움이 되는 이유, 혼자 또는 함께 추모하는 방식, 반복되는 기일을 통한 치유.",
    body: `<p>아이가 떠난 지 1년이 지났다. 기일이 다가오면 다시 그날의 감정이 올라온다. 기일을 어떻게 보내야 할지, 또는 어떻게 보내면 좋은지 알고 싶은 보호자들이 많다.</p>

<h2>기일이 가진 의미</h2>
<p>기일은 슬픔을 다시 불러오는 날이기도 하지만, 함께한 시간을 기억하고 기리는 날이기도 하다. 슬픔 연구들은 특정 날짜에 의식(ritual)을 가지는 것이 애도 과정에 도움이 된다고 말한다. 기일을 "피해야 할 날"이 아니라 "기억하는 날"로 바꾸는 것이 치유에 도움이 된다.</p>

<h2>혼자 보내는 추모 방법</h2>
<ul>
<li>아이의 사진을 꺼내 천천히 보기</li>
<li>함께 자주 갔던 장소 방문하기</li>
<li>좋아했던 간식 또는 장난감을 추모 공간에 놓기</li>
<li>일기나 편지 쓰기 — 하고 싶었던 말 담기</li>
<li>기부: 유기 동물 보호 단체에 소액 기부</li>
</ul>

<h2>함께 추모하는 방식</h2>
<div class="callout-cat">
<strong>함께하는 추모 아이디어</strong><br>
• 가족과 아이의 이야기 나누기<br>
• 반려동물을 아는 친구들과 사진 공유<br>
• 온라인 추모 페이지에 기억 남기기<br>
• 비슷한 상실을 경험한 사람들의 커뮤니티 참여<br>
▶ 혼자 삭히는 것보다 나누는 것이 치유에 더 빠른 경우 많음
</div>

<h2>슬픔이 다시 강해지는 것에 대해</h2>
<p>기일에 슬픔이 다시 강해지는 것은 완전히 자연스럽다. "이미 이겨냈다고 생각했는데"라는 자책은 필요 없다. 슬픔은 직선으로 나아가지 않는다. 기일에 강해지는 것은 그 아이를 여전히 깊이 사랑하고 있다는 의미다.</p>

<h2>다음 해로 이어가기</h2>
<ul>
<li>매년 기일을 기억하는 작은 의식을 정해두기</li>
<li>아이가 좋아했던 것을 기억하는 행동 반복</li>
<li>시간이 지날수록 슬픔보다 감사가 커지는 것이 자연스러운 과정</li>
</ul>

<h2>마지막으로</h2>
<p>기일은 끝이 아니다. 그 아이와의 기억이 살아있다는 날이다. 어떤 방식으로든, 그 날을 기억하는 것 자체가 충분히 의미 있는 추모다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 장례·추모 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Packman, W. et al. — Pet loss and human bereavement: A review. Death Stud 2011",
      "한국동물복지협회 반려동물 상실 슬픔 지원 가이드",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 심한 슬픔이 지속되는 경우 전문 상담을 권장합니다.",
    status: "published",
    publishedAt: "2027-01-23T09:00:00.000Z",
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
  console.log("블로그 포스트 124차 시딩 완료! (blog-741 ~ blog-745)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
