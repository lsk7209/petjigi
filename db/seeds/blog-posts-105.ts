import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 105 — cat2×2 + cat3×1 + cat5×1 + cat6×1 = 5편 (IDs 646-650)
// Macros: D, A, B, F, E
// Angles: RA4, RA1, RA2, RA4, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-646",
    slug: "dog-dehydration-check-guide",
    type: "blog",
    category: 2,
    title: "강아지 탈수 확인법 — 집에서 30초로 체크하는 방법",
    subtitle: "피부 탄성 검사, 잇몸 수분 확인, 탈수 증상 단계, 즉시 병원 기준",
    metaTitle: "강아지 탈수 확인법 — 피부 탄성·잇몸 체크 30초 가이드 | 펫지기",
    metaDescription: "강아지 탈수 여부를 집에서 30초에 확인하는 방법. 피부 탄성 검사, 잇몸 수분 확인법, 탈수 정도별 증상, 즉시 동물병원에 가야 하는 기준을 정리했습니다.",
    body: `<p>강아지 탈수는 빠르게 악화될 수 있다. 집에서 간단히 확인하는 방법을 알면 응급 여부를 빠르게 판단할 수 있다.</p>

<h2>피부 탄성 검사</h2>
<p>목덜미 또는 어깨 사이 피부를 1~2초 잡아당긴 후 놓는다.</p>
<ul>
<li><strong>정상</strong>: 즉시 원래 위치로 돌아옴</li>
<li><strong>경도 탈수</strong>: 1~2초 지연</li>
<li><strong>중도 이상</strong>: 3초 이상 지연 또는 주름이 남음</li>
</ul>

<h2>잇몸 수분 확인</h2>
<div class="callout-dog">
<strong>잇몸 습도 검사</strong><br>
1. 잇몸을 손가락으로 눌러 흰색 만들기<br>
2. 손가락 뗀 후 분홍색 돌아오는 시간 확인<br>
• 1~2초 이내: 정상 (모세혈관 충전 시간)<br>
• 2초 이상: 탈수·순환 저하 의심<br>
• 잇몸 끈적함(건조): 탈수 신호
</div>

<h2>탈수 정도별 증상</h2>
<table>
<thead><tr><th>정도</th><th>증상</th><th>대처</th></tr></thead>
<tbody>
<tr><td>경도(5%)</td><td>약간 무기력, 음수 감소</td><td>수분 공급 + 경과 관찰</td></tr>
<tr><td>중도(7~9%)</td><td>무기력, 눈 침침, 피부 탄성 저하</td><td>당일 수의사 방문</td></tr>
<tr><td>중증(10%+)</td><td>눈 꺼짐, 쇼크, 의식 저하</td><td>즉시 응급 병원</td></tr>
</tbody>
</table>

<h2>집에서 수분 공급</h2>
<ul>
<li>경도 탈수: 소량씩 자주 물 제공</li>
<li>전해질 용액(수의사 처방) 활용</li>
<li>강제로 많이 마시게 하지 않기 (구토 유발 가능)</li>
</ul>

<h2>마지막으로</h2>
<p>탈수는 원인이 있다. 단순 더위·운동 후 탈수는 수분 보충으로 회복되지만, 구토·설사·질환 동반 탈수는 즉시 수의사 방문이 필요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국수의응급의학회 탈수 임상 가이드라인",
      "Dibartola, S.P. — Disorders of Sodium and Water. Fluid Therapy 2006",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-04T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-647",
    slug: "cat-iodine-restricted-hyperthyroid-diet",
    type: "blog",
    category: 2,
    title: "고양이 갑상선항진증 요오드 제한 식이 — 힐스 y/d 완전 해설",
    subtitle: "요오드 제한 식이 원리, 효과와 한계, 완전 제한의 어려움, 사용 조건",
    metaTitle: "고양이 갑상선항진증 요오드 제한 식이 — y/d 효과와 한계 | 펫지기",
    metaDescription: "고양이 갑상선항진증 치료에 사용되는 요오드 제한 식이(힐스 y/d) 완전 해설. 원리, 효과와 한계, 완전 제한이 어려운 이유, 올바른 사용 조건을 정리했습니다.",
    body: `<p>갑상선항진증 치료에 "약 없이 식이만으로" 가능한 방법이 있다 — 요오드 제한 식이다. 그러나 엄격한 조건이 필요하다.</p>

<h2>요오드 제한 식이 원리</h2>
<p>갑상선 호르몬은 요오드를 원료로 만들어진다. 식이에서 요오드를 극도로 제한하면 갑상선 호르몬 생산이 감소한다. 힐스 y/d가 국내에서 가장 알려진 요오드 제한 처방식이다.</p>

<h2>효과</h2>
<ul>
<li>요오드를 철저히 제한하면 T4 수치 정상화 가능</li>
<li>약물 부작용이 걱정되는 고양이에게 대안</li>
<li>경증~중등도 갑상선항진증에서 효과 확인</li>
</ul>

<h2>완전 제한의 어려움</h2>
<div class="callout-cat">
<strong>요오드 제한 식이의 현실적 제약</strong><br>
• y/d 이외 모든 음식 완전 차단 필수<br>
• 생선 냄새 나는 트릿 1개만 먹어도 효과 무효<br>
• 다묘 가정: 다른 고양이 밥 접근 차단 필수<br>
• 야외 접근 고양이 → 불가능<br>
• 고양이가 y/d를 거부하면 대안 없음
</div>

<h2>요오드 제한 식이가 적합한 경우</h2>
<ul>
<li>완전 실내 고양이</li>
<li>혼자 키우는 경우</li>
<li>y/d를 잘 먹는 고양이</li>
<li>약물 부작용 이력 있는 경우</li>
</ul>

<h2>마지막으로</h2>
<p>요오드 제한 식이는 조건이 충족되면 효과적인 대안이지만, 엄격한 관리 없이는 실패한다. 수의사와 함께 T4 모니터링을 유지하면서 진행하는 것이 필수다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "van der Kooij, M. et al. — Iodine-restricted diet as treatment for feline hyperthyroidism. J Vet Intern Med 2014",
      "한국수의영양학회 갑상선항진증 식이 처방 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-04T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-648",
    slug: "dog-hip-dysplasia-management",
    type: "blog",
    category: 3,
    title: "강아지 고관절 이형성증 — 대형견 통증의 주요 원인",
    subtitle: "고관절 이형성증 진단 기준, 품종별 위험, 체중 관리의 중요성, 수술 vs 관리",
    metaTitle: "강아지 고관절 이형성증 — 진단·체중 관리·수술 기준 가이드 | 펫지기",
    metaDescription: "강아지 고관절 이형성증 원인과 관리 방법. 고위험 품종, 진단 기준(OFA·PennHIP), 체중 관리 중요성, 수술과 보존 치료 비교를 정리했습니다.",
    body: `<p>대형견이 뒷다리를 절뚝이거나, 앉았다 일어날 때 힘들어하거나, "토끼 달리기" 처럼 뒷다리를 함께 움직인다면 고관절 이형성증을 의심해볼 수 있다.</p>

<h2>고관절 이형성증이란</h2>
<p>고관절(엉덩이 관절)의 비정상적인 발달로 관절면이 맞지 않아 불안정성·염증·관절염으로 진행하는 질환이다. 유전적 요인이 크지만 성장기 영양·운동도 영향을 미친다.</p>

<h2>고위험 품종</h2>
<p>저먼 셰퍼드, 래브라도, 골든 리트리버, 로트와일러, 세인트버나드, 오스트레일리안 셰퍼드</p>

<h2>체중 관리의 핵심 역할</h2>
<div class="callout-dog">
<strong>체중과 고관절 이형성증 관계</strong><br>
• 과체중 강아지: 고관절 압력 증가 → 더 빠른 진행<br>
• 성장기 과잉 칼로리: 발달 이상 악화 위험<br>
• 이상 체중 유지: 수술 없이 통증 조절 가능성 높음<br>
• 체중 1kg 감량 → 관절 압력 4kg 감소 효과
</div>

<h2>수술 vs 보존 치료</h2>
<ul>
<li><strong>TPO/DPO(골반 절골술)</strong>: 어린 강아지(1세 미만) 조기 수술 — 관절 접면 개선</li>
<li><strong>FHO(대퇴골두 절제)</strong>: 대형견 제외 소형·중형견에서 통증 완화</li>
<li><strong>THA(전고관절 치환술)</strong>: 심한 관절염 동반 성견에서 최고 결과</li>
<li><strong>보존 치료</strong>: 체중 관리 + 재활 + 진통제 — 경도에서 삶의 질 유지 가능</li>
</ul>

<h2>마지막으로</h2>
<p>고관절 이형성증 진단을 받았다고 즉시 수술이 필요하지 않다. 증상 정도·나이·체중에 따라 수의사와 함께 최선의 방법을 선택하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Smith, G.K. et al. — Lifelong diet restriction and radiographic evidence of osteoarthritis of the hip joint in dogs. JAVMA 2006",
      "한국수의외과학회 고관절 이형성증 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-12-05T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-649",
    slug: "dog-nail-grinding-dremel-guide",
    type: "blog",
    category: 5,
    title: "강아지 발톱 그라인더(드레멜) 사용법 — 클리퍼가 무서운 강아지에게",
    subtitle: "그라인더 vs 클리퍼 차이, 훈련 방법, 안전 주의사항, 과열 방지",
    metaTitle: "강아지 발톱 그라인더 사용법 — 클리퍼 대안 완전 가이드 | 펫지기",
    metaDescription: "강아지 발톱 그라인더(드레멜) 올바른 사용 방법. 클리퍼와 비교, 소리 적응 훈련, 털 말림 방지, 과열 방지, 단계별 사용법을 정리했습니다.",
    body: `<p>발톱 클리퍼를 무서워하는 강아지에게 그라인더가 대안이 될 수 있다. 소리 적응 훈련이 필요하지만, 익숙해지면 매우 효과적이다.</p>

<h2>그라인더 vs 클리퍼</h2>
<table>
<thead><tr><th>구분</th><th>그라인더</th><th>클리퍼</th></tr></thead>
<tbody>
<tr><td>소리</td><td>있음 (적응 필요)</td><td>없거나 약함</td></tr>
<tr><td>퀵 절단 위험</td><td>낮음 (마모식)</td><td>있음</td></tr>
<tr><td>날카로운 마감</td><td>부드러움</td><td>뾰족할 수 있음</td></tr>
<tr><td>시간</td><td>느림</td><td>빠름</td></tr>
<tr><td>털 엉킴</td><td>주의 필요</td><td>없음</td></tr>
</tbody>
</table>

<h2>소리 적응 훈련</h2>
<div class="callout-dog">
<strong>그라인더 적응 단계</strong><br>
1단계: 꺼진 그라인더 보여주기 → 간식<br>
2단계: 켜고 멀리서 소리 들려주기 → 간식<br>
3단계: 켜서 발 근처 (닿지 않게) → 간식<br>
4단계: 발 접촉 (발톱 없이) → 간식<br>
5단계: 실제 발톱 갈기 (짧게) → 간식
</div>

<h2>사용 시 주의사항</html2>
<ul>
<li><strong>과열 방지</strong>: 발톱 한 개당 3~5초씩 끊어서 (지속 접촉 금지)</li>
<li><strong>털 말림</strong>: 장모종은 발 주변 털을 손으로 잡아 분리</li>
<li><strong>속도 설정</strong>: 시작은 저속, 익숙해지면 중속</li>
<li><strong>발 고정</strong>: 너무 강하게 잡지 않기 (스트레스 증가)</li>
</ul>

<h2>마지막으로</h2>
<p>그라인더는 처음 적응이 필요하지만, 퀵 절단 공포 없이 부드럽게 발톱을 관리할 수 있는 좋은 도구다. 천천히 적응시키면 대부분의 강아지가 클리퍼보다 더 잘 받아들인다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물미용협회 발톱 관리 가이드라인",
      "Yin, S. — Perfect Puppy in 7 Days. CattleDog Publishing 2011",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-05T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-650",
    slug: "petloss-returning-to-daily-life",
    type: "blog",
    category: 6,
    title: "펫로스 후 일상 복귀 — '이제 괜찮아도 되는가'라는 죄책감",
    subtitle: "회복이 배신이 아닌 이유, 웃을 수 있는 날이 오는 것의 의미, 새로운 관계",
    metaTitle: "펫로스 후 일상 복귀 — 회복의 죄책감과 다시 웃는 날의 의미 | 펫지기",
    metaDescription: "반려동물을 떠나보낸 후 일상으로 돌아오는 과정. 회복이 잊어버리는 것이 아닌 이유, 죄책감 없이 웃을 수 있는 날, 새로운 반려동물 관계에 대해 정리했습니다.",
    body: `<p>어느 날 문득 웃고 있다는 것을 발견한다. 그리고 곧바로 죄책감이 든다. "벌써 잊어버리는 건가?" — 그것은 잊어버리는 것이 아니다.</p>

<h2>회복이 배신이 아닌 이유</h2>
<p>슬픔은 파도와 같다. 처음에는 파도가 끊임없이 밀려와 숨을 쉴 수 없다. 시간이 지나면서 파도 사이의 간격이 생긴다. 그 간격이 잊어버리는 것이 아니라 숨 쉬는 것이다. 반려동물은 당신이 웃기를 원했을 것이다.</p>

<h2>죄책감을 다루는 방법</h2>
<ul>
<li>"괜찮아도 된다"는 허락을 스스로에게 주기</li>
<li>기억하는 방식이 달라지는 것 — 아픔에서 따뜻함으로</li>
<li>좋은 기억을 떠올릴 때 슬픔보다 미소가 먼저 오는 날이 온다 — 그것이 치유</li>
</ul>

<h2>일상이 회복되는 신호</h2>
<div class="callout-cat">
<strong>회복의 자연스러운 신호</strong><br>
• 평소처럼 밥을 먹을 수 있음<br>
• 반려동물 이야기를 다른 사람에게 할 수 있음<br>
• 길에서 강아지·고양이를 보고 미소가 생김<br>
• 하루 중 울지 않는 시간이 생김
</div>

<h2>새로운 반려동물과의 관계</h2>
<p>새 반려동물을 입양하는 것이 이전 반려동물을 대체하는 것이 아니다. 각각의 관계는 독립적이다. 준비가 됐을 때 — 그것이 한 달 후든 3년 후든 — 새로운 관계를 시작하는 것은 괜찮다.</p>

<h2>마지막으로</h2>
<p>당신이 회복한다는 것은 당신이 충분히 사랑했다는 증거다. 그리고 사랑할 수 있는 사람이 아직 있다는 뜻이기도 하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Worden, J.W. — Grief Counseling and Grief Therapy. Springer Publishing 2008",
      "한국펫로스증후군연구회 애도 회복 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-06T09:00:00.000Z",
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
  console.log("블로그 포스트 105차 시딩 완료! (blog-646 ~ blog-650)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
