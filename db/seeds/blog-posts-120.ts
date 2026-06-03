import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 120 — cat3×2 + cat1×1 + cat2×1 + cat5×1 = 5편 (IDs 721-725)
// Macros: D, C, B, G, F
// Angles: RA1, RA6, RA3, RA8, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-721",
    slug: "dog-epilepsy-seizure-management",
    type: "blog",
    category: 3,
    title: "강아지 뇌전증 — 발작 응급 대처와 장기 약물 관리",
    subtitle: "발작 유형, 응급 대처 순서, 항경련제(페노바르비탈·포타슘 브로마이드) 치료, 모니터링",
    metaTitle: "강아지 뇌전증(간질) — 발작 응급 대처와 약물 관리 가이드 | 펫지기",
    metaDescription: "강아지 뇌전증 발작 응급 대처와 장기 관리. 발작 유형·원인 감별, 발작 시 즉시 해야 할 것과 하지 말아야 할 것, 페노바르비탈 치료와 혈중 농도 모니터링.",
    body: `<p>강아지가 갑자기 경련을 일으키면 보호자는 극도로 당황한다. 발작 중 무엇을 해야 하는지, 무엇을 하면 안 되는지 미리 알고 있어야 한다.</p>

<h2>발작이란</h2>
<p>뇌신경 세포의 비정상적·과도한 전기 활동으로 인한 갑작스러운 신체 증상이다. 뇌전증(특발성 간질)은 명확한 원인 없이 반복 발작이 일어나는 질환이며, 3~7살에서 처음 발생하는 경우가 많다. 원인 있는 발작(뇌염, 종양, 대사 질환 등)과 감별이 중요하다.</p>

<h2>발작 시 즉시 해야 할 것</h2>
<div class="callout-dog">
<strong>발작 응급 대처 순서</strong><br>
1. 침착하게 — 강아지에게 가까이 있되 손을 물릴 수 있는 곳에 두지 않기<br>
2. 시간 체크: 발작 시작 시각 기록<br>
3. 영상 촬영: 증상 기록 (수의사 진단에 도움)<br>
4. 주변 위험 제거: 가구 모서리, 계단, 높은 곳에서 떨어지지 않도록<br>
5. 5분 이상 발작 지속 시 즉시 응급 병원 이동 (군발 발작·지속 발작은 응급)
</div>

<h2>절대 하지 말 것</h2>
<ul>
<li>입 안에 손·물건 넣지 않기 (혀를 삼키지 않음, 교상 위험)</li>
<li>강하게 잡거나 누르지 않기</li>
<li>물 먹이지 않기</li>
</ul>

<h2>장기 약물 관리</h2>
<ul>
<li><strong>페노바르비탈</strong>: 가장 많이 사용, 경구 투여 1일 2회</li>
<li><strong>포타슘 브로마이드</strong>: 페노바르비탈 병용 또는 단독 사용</li>
<li>약물 시작 기준: 발작 빈도·중증도·간격에 따라 수의사 결정</li>
<li>혈중 농도 모니터링: 투여 4~6주 후, 이후 6개월~1년 주기</li>
<li>간 기능 검사: 페노바르비탈 장기 사용 시 정기 검사 필수</li>
</ul>

<h2>생활 관리</h2>
<ul>
<li>발작 일지 기록: 날짜·시간·지속 시간·증상 기록</li>
<li>약 절대 임의 중단 금지 (반동 발작 위험)</li>
<li>수영, 높은 곳 단독 탐색 등 위험 상황 주의</li>
</ul>

<h2>마지막으로</h2>
<p>뇌전증은 관리되는 질환이다. 약물로 발작을 조절하면 대부분 정상적인 생활이 가능하다. 정기 모니터링을 빠지지 않는 것이 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Bhatti, S.F.M. et al. — International Veterinary Epilepsy Task Force consensus proposals: medical treatment of canine epilepsy in Europe. BMC Vet Res 2015",
      "한국수의신경학회 개 뇌전증 진단·치료 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-11T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-722",
    slug: "cat-inflammatory-bowel-disease-ibd",
    type: "blog",
    category: 3,
    title: "고양이 염증성 장질환(IBD) — 만성 구토·설사의 진짜 원인",
    subtitle: "IBD 유형(림프구성·호산구성·호중구성), 식이 반응성 vs IBD 감별, 조직 생검, 치료",
    metaTitle: "고양이 IBD(염증성 장질환) — 만성 구토·설사 원인·진단·치료 | 펫지기",
    metaDescription: "고양이 염증성 장질환(IBD) 원인과 치료. 만성 구토·설사 원인 감별, 식이 반응성 시험, 위장관 조직 생검 필요성, 스테로이드·식이 치료 원칙을 정리했습니다.",
    body: `<p>고양이가 몇 달째 구토를 반복한다. 원인을 찾으러 검사를 하면 나오는 진단 중 하나가 IBD다. IBD는 무엇이며 어떻게 관리해야 할까.</p>

<h2>IBD란</h2>
<p>위장관 점막에 만성 염증 세포가 침윤되는 질환이다. 원인은 아직 완전히 밝혀지지 않았으며, 면역계 이상·장내 세균총·식이 항원이 복합적으로 관여한다. 림프구성·플라즈마세포성(가장 흔함), 호산구성, 호중구성 등 유형이 있다.</p>

<h2>증상</h2>
<ul>
<li>만성·간헐적 구토</li>
<li>설사·무른 변 (소장형은 대량 설사, 대장형은 점액·혈변)</li>
<li>체중 감소, 식욕 변화</li>
<li>단백 손실성 장병증(심한 경우): 저알부민혈증, 복수</li>
</ul>

<h2>진단</h2>
<div class="callout-cat">
<strong>IBD 진단 접근</strong><br>
• 혈액검사: 빈혈·저알부민혈증·엽산·코발라민(B12) 수치<br>
• 영상검사: 복부 초음파 (장벽 두께·층 구조 평가)<br>
• 식이 반응 시험: 새로운 단백질(가수분해·신규 단백) 8~12주 급여<br>
• 확진: 위내시경·장내시경 또는 수술 생검으로 조직 검사<br>
▶ 식이 반응성이면 IBD와 구분, 식이로 관리 가능
</div>

<h2>IBD 치료</h2>
<ul>
<li>식이 관리: 가수분해 단백 또는 새로운 단백질 처방식 유지</li>
<li>코발라민(B12) 보충: 결핍 시 주사 또는 경구 보충</li>
<li>스테로이드(프레드니솔론): 식이 반응 없는 중증 IBD</li>
<li>클로람부실 병행: 스테로이드 단독 효과 부족 시</li>
<li>프로바이오틱스: 보조적으로 사용 가능</li>
</ul>

<h2>IBD와 장 림프종 감별</h2>
<p>고양이 IBD와 소세포 림프종은 증상·조직 소견이 비슷해 감별이 어렵다. 조직 생검 + 면역조직화학 검사가 중요하며, 두 질환의 치료 반응도 비슷하게 나타나는 경우가 많다.</p>

<h2>마지막으로</h2>
<p>만성 구토·설사를 "원래 그런 고양이"로 방치하지 않는 것이 중요하다. 조기 진단과 적절한 식이·약물 관리로 삶의 질을 유지할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Jergens, A.E. — Feline idiopathic inflammatory bowel disease. J Feline Med Surg 2012",
      "한국수의내과학회 고양이 위장관 질환 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-11T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-723",
    slug: "cat-breed-personality-before-adoption",
    type: "blog",
    category: 1,
    title: "고양이 품종별 성격 특성 — 입양 전 알아야 할 현실",
    subtitle: "메인쿤·페르시안·샴·벵갈·라가머핀 등 주요 품종 성격, 에너지, 독립성, 보호자 궁합",
    metaTitle: "고양이 품종별 성격 — 입양 전 궁합 맞는 품종 찾는 법 | 펫지기",
    metaDescription: "고양이 품종별 성격 특성과 입양 전 궁합 확인법. 메인쿤·페르시안·샴·벵갈 에너지·독립성·애정도 비교, 내 라이프스타일에 맞는 품종 선택 기준.",
    body: `<p>고양이는 다 비슷하게 도도할 것 같지만, 품종에 따라 성격과 에너지 수준이 크게 다르다. 입양 전 품종 특성을 알면 함께 사는 데 훨씬 편하다.</p>

<h2>주요 품종 성격 비교</h2>
<p>품종별 성격은 개체 차이가 있지만, 일반적인 경향을 파악하면 기대 수준을 조정할 수 있다.</p>

<h2>사람 친화적·애정 많은 품종</h2>
<div class="callout-cat">
<strong>사람과 가깝게 지내는 품종</strong><br>
• <strong>메인쿤</strong>: 개 같은 성격, 사람 따르기, 물 좋아함, 에너지 높음<br>
• <strong>라가머핀·랙돌</strong>: 안기기 좋아함, 온순, 에너지 낮음<br>
• <strong>버만</strong>: 조용하고 다정, 독립성 보통<br>
• <strong>스핑크스</strong>: 체온 유지 위해 사람 곁을 좋아함, 장난기 많음
</div>

<h2>활발하고 에너지 높은 품종</h2>
<ul>
<li><strong>샴</strong>: 매우 수다스럽고 요구 많음, 혼자 있는 것 싫어함</li>
<li><strong>벵갈</strong>: 높은 에너지, 탐색·활동 필수, 자극 부족 시 문제 행동</li>
<li><strong>아비시니안</strong>: 활발, 호기심 왕성, 장난감 필수</li>
</ul>

<h2>조용하고 독립적인 품종</h2>
<ul>
<li><strong>페르시안</strong>: 조용하고 느긋함, 에너지 낮음, 그루밍 많이 필요</li>
<li><strong>브리티시 쇼트헤어</strong>: 독립적, 안기 싫어하는 편, 안정적</li>
<li><strong>러시안 블루</strong>: 낯선 사람에 조심스럽지만 가족에게 애정, 예민함</li>
</ul>

<h2>내 라이프스타일과 궁합 맞추기</h2>
<ul>
<li>혼자 집에 오래 있는 환경 → 독립성 높은 품종 또는 2마리 입양 고려</li>
<li>노인·조용한 가정 → 에너지 낮은 품종(페르시안·랙돌)</li>
<li>어린아이 있는 가정 → 온순하고 사회성 높은 품종</li>
<li>처음 고양이 입양 → 극단적으로 에너지 높은 품종(벵갈 등)은 신중히</li>
</ul>

<h2>마지막으로</h2>
<p>품종 성격은 경향이지 절대 기준이 아니다. 구조 혼합묘도 충분히 좋은 반려동물이다. 중요한 것은 내 생활 방식과 맞는 아이를 만나는 것이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국고양이협회(KCA) 품종별 특성 공식 자료",
      "Bradshaw, J.W.S. — Cat Sense. Basic Books 2013",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-12T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-724",
    slug: "dog-wet-dry-food-mixing-guide",
    type: "blog",
    category: 2,
    title: "강아지 건식·습식 혼합 급여 — 비율과 장단점",
    subtitle: "건식·습식 혼합 급여 방법, 칼로리 계산, 혼합 시 주의사항, 소화 문제 예방",
    metaTitle: "강아지 건식·습식 혼합 급여 — 올바른 비율과 주의사항 | 펫지기",
    metaDescription: "강아지 건식·습식 사료 혼합 급여 방법. 혼합 시 칼로리 계산법, 과잉 급여 방지, 소화 문제 예방, 전환 시 주의사항, 혼합 급여 장단점을 정리했습니다.",
    body: `<p>건식 사료만 먹이다가 습식을 섞어주면 훨씬 잘 먹는다. 그러나 섞는 방법을 모르면 과급여·소화 문제가 생길 수 있다.</p>

<h2>혼합 급여의 장점</h2>
<ul>
<li>수분 섭취 증가 (비뇨기 건강에 유리)</li>
<li>기호성 향상 (식욕 부진 개체에 유용)</li>
<li>영양 다양성 (다른 단백질 원료 조합 가능)</li>
</ul>

<h2>혼합 급여의 단점</h2>
<ul>
<li>칼로리 계산 복잡해짐</li>
<li>과급여 위험: 습식을 "토핑"으로 생각하고 건식도 그대로 주면 과잉</li>
<li>습식 개봉 후 변질 속도 빠름 (냉장 보관 24~48시간)</li>
</ul>

<h2>올바른 혼합 비율 계산</h2>
<div class="callout-dog">
<strong>칼로리 기반 혼합 계산법</strong><br>
1. 강아지 하루 필요 칼로리 파악 (수의사 또는 사료 라벨 기준)<br>
2. 습식 비율 결정 (예: 습식 30%, 건식 70%)<br>
3. 습식 30%의 칼로리 계산 → 그에 해당하는 무게 파악<br>
4. 나머지 70%를 건식으로 채움<br>
▶ 두 개를 각각 "권장량"으로 합산하면 과급여
</div>

<h2>혼합 시 주의사항</h2>
<ul>
<li>같은 브랜드 건식·습식 조합이 영양 불균형 위험 낮음</li>
<li>다른 단백질 원료 조합: 알레르기 반응 모니터링 필요</li>
<li>소화 전환: 새로운 습식 도입 시 5~7일에 걸쳐 점진적으로 비율 높이기</li>
<li>남은 습식 보관: 개봉 후 냉장 최대 48시간</li>
</ul>

<h2>습식 단독 급여도 가능</h2>
<p>습식 단독 급여는 영양 균형이 맞는 완전 사료(AAFCO 또는 FEDIAF 인증)라면 문제없다. 단, 치아 관리를 위한 씹기 보조(덴탈 껌 등)를 추가하는 것이 좋다.</p>

<h2>마지막으로</h2>
<p>혼합 급여의 핵심은 전체 칼로리를 유지하는 것이다. 습식을 더하는 만큼 건식을 줄이는 것만 기억하면 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AAFCO — Dog and Cat Food Nutrient Profiles 2023",
      "한국수의영양학회 반려동물 급여 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-12T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-725",
    slug: "dog-muzzle-positive-training",
    type: "blog",
    category: 5,
    title: "강아지 입마개 훈련 — 처벌 없이 자연스럽게 익히기",
    subtitle: "입마개 필요성, 바구니형 vs 밴드형 선택, 탈감작·역조건화 단계별 방법",
    metaTitle: "강아지 입마개 훈련 — 긍정 강화로 자연스럽게 익히는 방법 | 펫지기",
    metaDescription: "강아지 입마개 탈감작 훈련 방법. 입마개가 필요한 상황, 바구니형 vs 밴드형 차이, 단계별 탈감작·역조건화 훈련, 입마개 착용 거부 해결법을 정리했습니다.",
    body: `<p>입마개는 처벌 도구가 아니다. 강아지가 스스로 입마개를 "좋은 것"으로 느끼게 훈련하면 병원·산책·응급 상황에서 안전을 지키는 도구가 된다.</p>

<h2>입마개가 필요한 상황</h2>
<ul>
<li>동물병원 처치 중 (통증·공포로 인한 교상 예방)</li>
<li>낯선 개·사람에게 교상 위험이 있는 경우</li>
<li>리쉬 반응성이 강하고 교상 이력이 있는 경우</li>
<li>응급 처치 시 (부상으로 통증이 있는 경우)</li>
</ul>

<h2>입마개 종류 선택</h2>
<div class="callout-dog">
<strong>입마개 유형 비교</strong><br>
• <strong>바구니형(Basket Muzzle)</strong>: 입을 자연스럽게 열 수 있음, 물 마시기·간식 받기 가능, 장시간 착용에 적합, 훈련 적합<br>
• <strong>밴드형(Soft Muzzle)</strong>: 입 완전 밀착, 짧은 처치에만, 장시간 착용 금지(열 발산 제한)<br>
▶ 훈련 목적에는 바구니형 권장
</div>

<h2>단계별 탈감작 훈련</h2>
<ul>
<li><strong>1단계</strong>: 입마개를 바닥에 놓고 옆에서 간식 제공 (존재에 익숙해지기)</li>
<li><strong>2단계</strong>: 입마개 안에 간식 넣어 스스로 코를 넣게 하기</li>
<li><strong>3단계</strong>: 코를 넣은 상태를 2~3초 유지 + 칭찬</li>
<li><strong>4단계</strong>: 버클 잠그지 않고 착용 상태 유지 시간 늘리기</li>
<li><strong>5단계</strong>: 버클 잠그고 짧게 착용 → 점차 시간 늘리기</li>
</ul>
<p>각 단계는 10~15회 성공 후 다음으로 이동. 억지로 씌우지 않기.</p>

<h2>훈련 포인트</h2>
<ul>
<li>입마개를 쓰면 항상 좋은 일(산책, 간식)이 따라온다는 연결 만들기</li>
<li>처음에는 하루 5분 이하로 짧게</li>
<li>착용 거부 시 이전 단계로 돌아가기</li>
<li>착용 후 즉시 제거하지 않기 (제거가 보상이 되면 안 됨)</li>
</ul>

<h2>마지막으로</h2>
<p>입마개 훈련은 위기 상황이 오기 전에 미리 해두는 것이 좋다. 평소에 "좋은 것"으로 만들어 두면 필요한 순간에 강아지와 보호자 모두 안전하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 훈련·행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Muzzle Up! Project — Positive Muzzle Training Protocol",
      "한국반려동물행동교정사협회 입마개 훈련 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-13T09:00:00.000Z",
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
  console.log("블로그 포스트 120차 시딩 완료! (blog-721 ~ blog-725)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
