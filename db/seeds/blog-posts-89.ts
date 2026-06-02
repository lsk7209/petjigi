import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 89 — cat2×2 + cat3×1 + cat5×1 + cat4×1 = 5편 (IDs 566-570)
// Macros: A, B, D, F, G
// Angles: RA1, RA5, RA2, RA4, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-566",
    slug: "cat-taurine-deficiency-guide",
    type: "blog",
    category: 2,
    title: "고양이 타우린 결핍 — 생선만 먹이면 안 되는 핵심 이유",
    subtitle: "타우린의 역할, 결핍 시 심근병증·실명 위험, 결핍이 생기는 식이 패턴",
    metaTitle: "고양이 타우린 결핍 — 심근병증·실명 위험과 예방 가이드 | 펫지기",
    metaDescription: "고양이 타우린이 부족하면 심근병증과 실명이 생길 수 있습니다. 타우린 역할, 결핍이 생기는 식이 패턴, 결핍 증상, 예방 방법을 정리했습니다.",
    body: `<p>타우린은 고양이에게 필수 아미노산이다. 사람과 달리 고양이는 체내에서 타우린을 합성하지 못하므로 반드시 음식으로 섭취해야 한다.</p>

<h2>타우린이 필요한 이유</h2>
<ul>
<li>심장근육 기능 유지 (결핍 시 확장성 심근병증)</li>
<li>망막 기능 (결핍 시 중심성 망막 변성 → 실명)</li>
<li>면역 기능, 번식 능력</li>
<li>태아 발달 (임신묘의 타우린 부족은 기형 유발)</li>
</ul>

<h2>결핍이 생기는 식이 패턴</h2>
<div class="callout-cat">
<strong>타우린 결핍 위험 식이</strong><br>
• 수제식(집밥)만 주는 경우 — AAFCO 기준 충족 어려움<br>
• 저품질 사료 — 타우린 함량 불충분<br>
• 참치 통조림(사람용)만 급여 — 가열로 타우린 파괴<br>
• 채식 식이 시도 — 식물성 식품에 타우린 없음<br>
• 오랫동안 조리된 음식 위주 — 열에 의한 타우린 손실
</div>

<h2>결핍 증상</h2>
<ul>
<li>초기: 증상 없음 → 혈액 타우린 수치로만 발견</li>
<li>중기: 활동 감소, 호흡 곤란 (심근병증 진행)</li>
<li>진행: 야간 시력 저하 → 망막 변성</li>
</ul>

<h2>예방과 보충</h2>
<ul>
<li>AAFCO 완전영양식 사료 사용이 가장 안전한 예방</li>
<li>수제식 제공 시 반드시 타우린 보충제 추가 (수의 영양사 처방)</li>
<li>심근병증·망막 변성 진단 시 고용량 타우린 보충 + 식이 교정</li>
</ul>

<h2>마지막으로</h2>
<p>고양이 심근병증의 상당수가 식이 문제에서 온다는 것이 알려져 있다. AAFCO 인증 완전영양식 사료는 이 이유만으로도 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Pion, P.D. et al. — Myocardial failure in cats associated with low plasma taurine: a reversible cardiomyopathy. Science 1987",
      "한국수의영양학회 고양이 필수 영양소 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-25T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-567",
    slug: "dog-homemade-food-safety",
    type: "blog",
    category: 2,
    title: "강아지 집밥 — 영양 균형을 맞추지 않으면 생기는 문제",
    subtitle: "집밥 영양 불균형의 현실, AAFCO 기준, 완전 집밥을 원한다면 해야 할 것",
    metaTitle: "강아지 집밥 영양 균형 — 문제와 올바른 접근법 | 펫지기",
    metaDescription: "강아지 집밥(수제식)의 영양 불균형 위험을 정리했습니다. 닭고기+밥만 주면 생기는 문제, AAFCO 기준, 완전 집밥을 원한다면 해야 할 것을 알아보세요.",
    body: `<p>강아지에게 집밥을 주는 보호자가 늘고 있다. 건강하고 신선한 음식을 주고 싶은 마음은 이해하지만, "균형 잡힌 집밥"은 의도만으로 되지 않는다.</p>

<h2>가장 흔한 집밥 영양 불균형</h2>
<ul>
<li><strong>칼슘 결핍</strong>: 닭가슴살+밥만 주는 경우 → 골격 기형(성장기), 골밀도 저하</li>
<li><strong>인 과다</strong>: 육류 위주 식이 → 칼슘·인 비율 역전</li>
<li><strong>아연·구리 결핍</strong>: 피부·면역 이상</li>
<li><strong>비타민 D 결핍</strong>: 뼈 형성 장애</li>
<li><strong>요오드 결핍</strong>: 갑상선 기능 저하</li>
</ul>

<h2>연구로 확인된 현실</h2>
<p>일반 보호자가 만든 수제식 레시피의 95% 이상에서 하나 이상의 필수 영양소 결핍이 확인됐다는 연구가 있다(Stockman et al., 2013). "다양하게 먹이면 괜찮다"는 것은 잘못된 인식이다.</p>

<h2>올바른 집밥 접근법</h2>
<div class="callout-dog">
<strong>집밥을 주고 싶다면</strong><br>
• 방법 1: AAFCO 완전영양식 사료를 주식으로, 집밥은 10~20% 보완용<br>
• 방법 2: 수의 영양사(RVN) 처방 수제식 레시피 사용<br>
• 방법 3: 균형 보완제 사용 (밸런스IT 등) + 처방 레시피 준수<br>
▶ 인터넷 레시피 그대로 따라하는 것은 위험
</div>

<h2>마지막으로</h2>
<p>집밥이 나쁜 것이 아니다. 그러나 영양 균형 없는 집밥은 사랑이 독이 될 수 있다. 주식은 완전영양식으로, 집밥은 보완으로 활용하는 것이 현실적이고 안전한 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Stockman, J. et al. — Evaluation of recipes of home-prepared maintenance diets for dogs. JAVMA 2013",
      "한국수의영양학회 수제식 영양 균형 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-25T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-568",
    slug: "cat-ringworm-treatment",
    type: "blog",
    category: 3,
    title: "고양이 피부사상균증(링웜) — 사람에게도 옮는 진균 감염",
    subtitle: "링웜 증상, 사람 감염 위험, 치료 방법, 가정 내 환경 소독",
    metaTitle: "고양이 링웜(피부사상균증) — 사람 전파·치료·환경 소독 가이드 | 펫지기",
    metaDescription: "고양이 링웜(피부사상균증)은 사람에게도 감염될 수 있습니다. 증상 확인법, 치료 방법(항진균제·샴푸), 가정 내 환경 소독, 사람 감염 예방을 정리했습니다.",
    body: `<p>고양이 털에 동그란 탈모 반점이 생겼다. 비듬·딱지가 동반된다면 링웜(피부사상균증)일 수 있다. 고양이에게 치료가 필요한 것은 물론, 사람에게도 옮을 수 있어 주의가 필요하다.</p>

<h2>링웜이란</h2>
<p>사상균(Microsporum canis가 주원인)에 의한 진균 감염이다. 이름과 달리 벌레와는 관계없다. 고양이의 피부·털·발톱을 침범한다. 키튼과 면역 저하 고양이에서 더 잘 발생한다.</p>

<h2>증상</h2>
<ul>
<li>원형 또는 불규칙한 탈모 반점 (특히 얼굴·귀·앞발)</li>
<li>비듬·딱지·가려움 (경미한 경우도 있음)</li>
<li>털이 부서지거나 끊어짐</li>
<li>증상 없는 보균 고양이도 있음 (전파 위험)</li>
</ul>

<h2>사람 감염 위험</h2>
<div class="callout-cat">
<strong>사람 전파 예방</strong><br>
• 고양이 만진 후 손 씻기<br>
• 고양이 침구·카펫 정기 세탁<br>
• 면역저하자·어린이·임산부 직접 접촉 최소화<br>
• 사람에서 링웜 발생 시 피부과 치료
</div>

<h2>치료 방법</h2>
<ul>
<li><strong>경구 항진균제</strong>: 이트라코나졸·테르비나핀 — 6~8주 투약</li>
<li><strong>항진균 샴푸·스프레이</strong>: 클로트리마졸·마이코나졸 — 주 2~3회</li>
<li><strong>병변 주변 털 제거</strong>: 환경 오염 감소</li>
</ul>

<h2>환경 소독</h2>
<p>사상균은 환경에서 수개월 생존한다. 1:10 희석 락스 소독(고양이 접근 전 완전 건조), 침구·카펫 세탁, 진공 청소기로 털 제거가 필요하다.</p>

<h2>마지막으로</h2>
<p>링웜은 치료에 시간이 걸리지만, 꾸준히 치료하면 완치된다. 중간에 임의로 치료를 중단하면 재발하므로 수의사 지시에 따라 완료까지 유지하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Moriello, K.A. — Treatment of dermatophytosis in dogs and cats. Vet Med 2004",
      "한국수의피부학회 피부사상균증 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-26T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-569",
    slug: "multi-cat-territory-management",
    type: "blog",
    category: 5,
    title: "다묘 가정 영역 관리 — 고양이들이 평화롭게 사는 공간 설계",
    subtitle: "수직 공간, 핫스팟 분산, 자원 배치 원칙, 영역 갈등 조기 감지",
    metaTitle: "다묘 가정 영역 관리 — 수직 공간·자원 배치·갈등 예방 가이드 | 펫지기",
    metaDescription: "고양이 여러 마리가 평화롭게 사는 공간 설계 방법. 수직 공간 확보, 자원 배치 원칙, 영역 핫스팟 분산, 갈등 조기 감지 방법을 정리했습니다.",
    body: `<p>고양이는 영역 동물이다. 여러 마리가 함께 살면 보이지 않는 영역 경쟁이 지속된다. 공간 설계로 갈등을 크게 줄일 수 있다.</p>

<h2>고양이 영역의 특성</h2>
<p>고양이는 수직 공간도 영역으로 인식한다. 높은 곳은 서열이 높거나 자신감 있는 고양이가 차지하는 경향이 있다. 수평 공간만 확보하는 것은 부족하다.</p>

<h2>수직 공간 확보</h2>
<ul>
<li>캣타워·캣워크·선반: 고양이 수만큼 별도 최고 지점 확보</li>
<li>냉장고·책장 위 접근 허용</li>
<li>창문 패드 여러 개 — 다른 방향·다른 높이</li>
</ul>

<h2>자원 배치 원칙</h2>
<div class="callout-cat">
<strong>다묘 가정 자원 공식</strong><br>
• 화장실: 고양이 수 + 1개, 분리된 위치<br>
• 밥그릇: 각자 별도, 다른 방향 배치<br>
• 물그릇: 여러 곳 분산<br>
• 잠자는 공간: 각자 전용 + 공유 공간 분리<br>
• 스크래처: 최소 2개, 다른 공간
</div>

<h2>영역 핫스팟 분산</h2>
<p>한 곳에 자원이 집중되면 그 공간이 고갈이 되어 갈등의 원천이 된다. 화장실·밥·물·잠자리·스크래처를 집 전체에 분산시키면 고양이 한 마리가 모든 자원을 독점할 수 없게 된다.</p>

<h2>갈등 조기 감지</h2>
<ul>
<li>한 고양이가 특정 공간을 피하거나 고립됨</li>
<li>식욕·음수 감소</li>
<li>과잉 그루밍 또는 탈모</li>
<li>조용한 하악질·긴장</li>
</ul>

<h2>마지막으로</h2>
<p>다묘 가정의 평화는 공간에 투자하는 것이다. 자원이 충분하고 각자의 공간이 있으면 대부분의 고양이는 공존할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bradshaw, J.W.S. — Cat Sense. Basic Books 2013",
      "한국고양이보호자연합 다묘 가정 환경 설계 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-26T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-570",
    slug: "dog-leash-law-and-vicious-dogs",
    type: "blog",
    category: 4,
    title: "강아지 목줄 의무와 맹견 관리 — 법적 기준 완전 정리",
    subtitle: "동물보호법 목줄·입마개 의무 대상, 맹견 5종 기준, 위반 과태료, 맹견 보험",
    metaTitle: "강아지 목줄 의무·맹견 관리 — 동물보호법 법적 기준 가이드 | 펫지기",
    metaDescription: "강아지 목줄 의무와 맹견 관리 법적 기준을 정리했습니다. 목줄 의무 대상, 맹견 5종 기준과 입마개 의무, 위반 과태료, 맹견 책임보험을 알아보세요.",
    body: `<p>산책 중 목줄을 하지 않아 사고가 나거나, "우리 강아지는 안 물어요"라며 입마개를 거부하는 경우가 있다. 법적 기준을 알면 불필요한 분쟁을 피할 수 있다.</p>

<h2>목줄 의무 기준</h2>
<p>동물보호법 제16조: 반려견을 동반해 외출할 때 목줄 또는 이동장을 사용해야 한다. 목줄 길이는 원칙적으로 2m 이내로 관리해야 한다.</p>

<h2>맹견 5종과 추가 의무</h2>
<div class="callout-dog">
<strong>동물보호법상 맹견 (2024년 기준)</strong><br>
• 도사견, 핏불테리어, 아메리칸 스태퍼드셔 테리어<br>
• 스태퍼드셔 불 테리어, 로트와일러<br><br>
<strong>맹견 의무 사항</strong><br>
• 외출 시 목줄 + 입마개 착용 필수<br>
• 맹견 책임보험 가입 의무<br>
• 맹견 소유자 교육 이수 의무<br>
• 맹견 입양 시 신고 의무
</div>

<h2>위반 과태료</h2>
<ul>
<li>목줄 미착용: 최대 50만 원</li>
<li>맹견 입마개 미착용: 최대 300만 원</li>
<li>맹견 보험 미가입: 최대 300만 원</li>
<li>반복 위반 시 가중 처분</li>
</ul>

<h2>오프리드 공간</h2>
<p>공식 지정된 반려동물 놀이터(도그런) 내에서는 목줄 해제가 허용된다. 일반 공원·주택가에서 임의 오프리드는 법적 위반이다.</p>

<h2>마지막으로</h2>
<p>목줄은 사랑하는 강아지를 지키는 것이기도 하다. 사고 예방 + 법적 의무 이행 + 이웃과의 관계 유지 — 목줄 착용의 이유는 충분하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "동물보호법 제16조 (맹견의 관리) 및 제16조의2",
      "농림축산식품부 맹견 관리 지침 2024",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 법적 기준은 최신 법령을 확인하세요.",
    status: "published",
    publishedAt: "2026-10-27T09:00:00.000Z",
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
  console.log("블로그 포스트 89차 시딩 완료! (blog-566 ~ blog-570)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
