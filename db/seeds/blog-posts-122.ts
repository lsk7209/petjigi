import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 122 — cat3×2 + cat1×1 + cat2×1 + cat5×1 = 5편 (IDs 731-735)
// Macros: D, C, B, G, F
// Angles: RA6, RA2, RA8, RA4, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-731",
    slug: "dog-hypoglycemia-small-breed-puppy",
    type: "blog",
    category: 3,
    title: "강아지 저혈당 — 소형 강아지 시기 응급 대처",
    subtitle: "소형 강아지 저혈당 원인, 경련·무기력 증상, 응급 처치, 예방 급여 방법",
    metaTitle: "강아지 저혈당 — 소형 강아지 응급 대처와 예방 가이드 | 펫지기",
    metaDescription: "강아지 저혈당 원인과 응급 대처. 소형 강아지에서 흔한 저혈당 유발 상황, 경련·무기력 증상 인식, 꿀·포도당 응급 처치, 예방 급여 방법을 정리했습니다.",
    body: `<p>소형 강아지가 갑자기 비틀거리거나 경련을 일으키면 저혈당을 먼저 의심해야 한다. 빠른 응급 처치가 생명을 구한다.</p>

<h2>소형 강아지에서 저혈당이 흔한 이유</h2>
<p>소형·초소형견(치와와·포메라니안·몰티즈 등)은 몸집에 비해 대사율이 높고 글리코겐 저장 능력이 낮다. 밥을 거르거나, 스트레스를 받거나, 과도한 활동 후 혈당이 빠르게 떨어질 수 있다. 생후 6개월 미만 어린 강아지에서 특히 위험하다.</p>

<h2>증상</h2>
<div class="callout-dog">
<strong>저혈당 증상 (빠른 인식이 중요)</strong><br>
• 갑작스러운 무기력, 비틀거림<br>
• 눈이 풀리거나 멍한 상태<br>
• 떨림, 근육 경련<br>
• 의식 저하, 반응 없음<br>
• 심한 경우 발작·혼수
</div>

<h2>응급 처치</h2>
<ul>
<li>의식 있음: 꿀, 콘시럽, 포도당 용액을 잇몸에 소량 바르기</li>
<li>바른 후 혈당이 올라오면 증상 호전 → 즉시 병원 이동</li>
<li>의식 없음·경련: 즉시 응급 동물병원 이동 — 집에서 먹이려다 흡인 위험</li>
<li>응급 처치 후에도 반드시 수의사 진찰 필요 (원인 파악)</li>
</ul>

<h2>예방 — 급여 방법</h2>
<ul>
<li>생후 6개월 미만 소형 강아지: 3~4회/일 이상 자주 급여</li>
<li>긴 이동·스트레스 상황 전: 충분한 식이 확인</li>
<li>자동 급식기 사용 또는 보호자 부재 시 소량 급여 장치 활용</li>
<li>급여 시간 간격 8시간 이상 벌어지지 않도록 관리</li>
</ul>

<h2>반복 발생 시</h2>
<ul>
<li>원발성 저혈당증: 인슐린 종양(인슐리노마) 등 기저 질환 배제 검사 필요</li>
<li>반복 저혈당은 수의사 상담으로 원인 파악이 우선</li>
</ul>

<h2>마지막으로</h2>
<p>소형 강아지를 키운다면 꿀 한 병을 항상 준비해 두는 것이 좋다. 빠른 인식과 응급 처치가 몇 분 내로 생사를 가를 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Fascetti, A.J. & Delaney, S.J. — Applied Veterinary Clinical Nutrition. Wiley-Blackwell 2012",
      "한국수의내과학회 소형 강아지 대사 응급 처치 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 상황에서는 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2027-01-16T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-732",
    slug: "cat-urethral-obstruction-male-emergency",
    type: "blog",
    category: 3,
    title: "수컷 고양이 요도 폐색 — 이틀을 다투는 응급 상황",
    subtitle: "요도 폐색 원인, 초기 증상 인식, 즉시 응급 병원 가야 하는 이유, 재발 예방",
    metaTitle: "수컷 고양이 요도 폐색 — 응급 증상 인식과 즉시 대처 가이드 | 펫지기",
    metaDescription: "수컷 고양이 요도 폐색 응급 상황 완전 가이드. 소변 못 보는 고양이 증상 인식, 24시간 내 사망 위험, 즉시 병원 가야 하는 이유, 재발 예방 관리.",
    body: `<p>수컷 고양이가 화장실에 들어가 힘을 주는데 소변이 나오지 않는다. 이것은 즉각적인 응급 상황이다. 24~48시간 내에 치료하지 않으면 목숨을 잃을 수 있다.</p>

<h2>왜 수컷 고양이에서 많이 발생하나</h2>
<p>수컷 고양이의 요도는 암컷보다 훨씬 길고 좁다. 요도 플러그(점액·결정 혼합물), 요결석, 경련으로 쉽게 막힌다. 실내 생활·건식 사료 위주·비만 고양이에서 위험이 높다.</p>

<h2>증상 인식 — 이걸 보면 즉시 응급</h2>
<div class="callout-cat">
<strong>즉시 응급 병원 가야 하는 신호</strong><br>
• 화장실에서 자꾸 힘주지만 소변이 나오지 않음<br>
• 화장실 밖에서 쪼그려 앉기<br>
• 배를 핥거나 배 만지면 통증 반응<br>
• 울음, 힘주기 동작 반복<br>
• 무기력, 구토, 식욕 없음 동반<br>
▶ 12~24시간 방치 시 신부전·심정지 위험
</div>

<h2>진단과 치료</h2>
<ul>
<li>요도 카테터 삽입으로 폐색 해소</li>
<li>수액 치료: 고칼륨혈증·신부전 교정</li>
<li>입원 모니터링: 자발 배뇨 확인까지</li>
<li>심한 경우 또는 재발 반복: 요도 성형술(PU 수술) 고려</li>
</ul>

<h2>재발 예방</h2>
<ul>
<li>습식 사료 전환: 수분 섭취 증가가 가장 중요한 예방</li>
<li>하부 요로 건강식(처방식): 수의사 처방</li>
<li>음수량 늘리기: 분수형 급수기, 여러 곳에 물그릇 배치</li>
<li>스트레스 관리: 다묘 가정 갈등, 환경 변화 최소화</li>
<li>체중 관리</li>
</ul>

<h2>마지막으로</h2>
<p>수컷 고양이의 소변 문제는 "지켜보자"가 없다. 소변을 못 본다는 것을 확인한 순간 즉시 동물병원으로 가는 것이 유일한 선택이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Bartges, J.W. & Polzin, D.J. — Nephrology and Urology of Small Animals. Wiley-Blackwell 2011",
      "한국고양이수의사회 하부 요로 질환 응급 처치 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 상황에서는 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2027-01-16T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-733",
    slug: "indoor-vs-outdoor-cat-lifespan",
    type: "blog",
    category: 1,
    title: "실내 vs 실외 고양이 수명 차이 — 데이터가 말하는 것",
    subtitle: "실내·실외·혼합 생활 방식에 따른 평균 수명 차이, 외출 고양이 위험 요소, 실내 환경 풍부화",
    metaTitle: "실내 vs 실외 고양이 수명 차이 — 데이터와 현실 비교 | 펫지기",
    metaDescription: "실내 vs 실외 고양이 수명 차이를 데이터로 비교. 외출 고양이 교통사고·감염병·싸움 위험, 실내 고양이 비만·지루함 문제, 균형 잡힌 실내 환경 풍부화 방법.",
    body: `<p>고양이를 실내에서만 키울지, 밖에도 내보낼지는 많은 보호자가 고민하는 문제다. 데이터는 명확하게 말한다.</p>

<h2>수명 차이 — 연구 결과</h2>
<p>여러 연구에 따르면 완전 실내 고양이의 평균 수명은 12~18년, 완전 실외 또는 혼합 고양이는 2~5년으로 보고된다. 차이의 원인은 복합적이지만 외출이 수명을 크게 단축시킨다는 결론은 일관된 편이다.</p>

<h2>실외 고양이의 위험 요소</h2>
<div class="callout-cat">
<strong>외출 고양이 주요 위험</strong><br>
• 교통사고: 실외 고양이 사망 원인 1위<br>
• 감염병: FIV(고양이 에이즈)·FeLV(고양이 백혈병)·FIP 등 전파 위험<br>
• 외상: 다른 고양이 또는 동물과의 싸움<br>
• 중독: 살충제·부동액·독이 든 먹이<br>
• 포획·유기: 타인에 의한 피해 가능성
</div>

<h2>실내 고양이의 과제</h2>
<ul>
<li>비만 위험: 운동 부족 + 과급여</li>
<li>정신적 자극 부족: 지루함, 스트레스성 과식·과그루밍</li>
<li>하부 요로 질환: 수분 섭취 부족, 스트레스</li>
</ul>

<h2>실내 환경 풍부화 방법</h2>
<ul>
<li>캣타워·선반: 높은 곳 탐색 욕구 충족</li>
<li>창문 새 모이대·창틀 공간: 시각 자극</li>
<li>매일 10~15분 놀이: 낚시대·터널·레이저</li>
<li>퍼즐 급식기: 인지 자극</li>
<li>다묘 가정: 적절한 사회화 제공 (단, 갈등 관리 필요)</li>
</ul>

<h2>절충안 — 통제된 야외 접근</h2>
<ul>
<li>리쉬 산책: 일부 고양이에게 훈련 가능</li>
<li>캐티오(catio): 외부와 격리된 야외 울타리 공간</li>
<li>베란다 안전망: 높이·틈새 탈출 방지</li>
</ul>

<h2>마지막으로</h2>
<p>완전 실내 생활이 고양이의 수명을 가장 잘 보호한다. 그러나 실내 환경을 풍요롭게 만드는 노력이 함께해야 한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Rochlitz, I. — A review of the housing requirements of domestic cats kept in the home. Appl Anim Behav Sci 2005",
      "한국고양이협회 실내 고양이 행동 풍부화 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-17T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-734",
    slug: "dog-food-label-ingredient-reading",
    type: "blog",
    category: 2,
    title: "강아지 사료 라벨 읽는 법 — 성분표 순서의 의미",
    subtitle: "원재료 표기 순서 원칙, 고기 부산물 이해, 수분 희석 트릭, AAFCO 인증 확인",
    metaTitle: "강아지 사료 라벨 읽기 — 성분표·원재료 순서·AAFCO 인증 해석법 | 펫지기",
    metaDescription: "강아지 사료 라벨 읽는 법. 원재료 표기 순서의 의미, 고기 부산물과 신선육 차이, 수분 희석 원재료 트릭, AAFCO 영양 인증 표기 확인법을 정리했습니다.",
    body: `<p>사료 라벨을 보면 정보가 많지만 어떻게 읽어야 할지 모르는 경우가 많다. 핵심만 알면 좋은 사료를 고르는 데 도움이 된다.</p>

<h2>원재료 표기 순서의 원칙</h2>
<p>사료 성분은 함량이 많은 것부터 순서대로 표기된다(무게 기준). 1번 성분이 가장 많이 들어갔다는 의미다. "닭고기"가 1번이면 닭고기가 가장 많이 포함된 것이다.</p>

<h2>신선육 vs 건조육 표기 트릭</h2>
<div class="callout-dog">
<strong>수분 희석 트릭 이해</strong><br>
• 신선 닭고기는 70~80%가 수분 → 처리 후 실제 단백질 양은 적을 수 있음<br>
• "닭고기 분말(건조)" 표기: 수분 제거 후 단백질 농축 형태<br>
• 신선육이 1번이어도 건조 처리 후 실제 비율은 낮을 수 있음<br>
• 표기 방식보다 전체 단백질 함량 수치(보증 성분)를 함께 확인
</div>

<h2>고기 부산물 이해</h2>
<ul>
<li>고기 부산물(by-product): 내장·폐·비장 등 도축 부산물</li>
<li>나쁜 원료가 아님 — 영양가 있는 부위 포함 가능</li>
<li>"고기 부산물 분말"은 성분 다양도 높고 소화율은 제품마다 다름</li>
<li>중요한 것: 어떤 동물의 부산물인지 구체적 표기 여부 (불특정 동물 부산물은 신중)</li>
</ul>

<h2>보증 성분 확인</h2>
<ul>
<li>조단백질, 조지방, 조섬유, 수분이 최소 표기</li>
<li>강아지 일반 성견: 조단백질 18% 이상, 조지방 5% 이상 기준</li>
<li>키튼·시니어·다이어트 제품은 기준치 다름</li>
</ul>

<h2>AAFCO 영양 인증 확인</h2>
<ul>
<li>"AAFCO 기준 충족" 또는 "완전·균형 식이" 표기 확인</li>
<li>성장기(all life stages 또는 growth): 강아지·키튼에 적합</li>
<li>성견 유지(adult maintenance): 성견 전용</li>
<li>인증 없는 제품: 영양 균형 미보장 가능</li>
</ul>

<h2>마지막으로</h2>
<p>사료 라벨 읽기는 처음엔 복잡해 보이지만, 1~2가지 기준만 알아도 선택이 쉬워진다. 원재료 1번 고기 확인 + AAFCO 인증 확인이 기본이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AAFCO — Official Publication 2023, Pet Food Labeling",
      "한국펫푸드협회 반려동물 사료 성분표 이해 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-17T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-735",
    slug: "dog-crate-training-safe-space",
    type: "blog",
    category: 5,
    title: "강아지 크레이트 훈련 — 안식처로 만드는 단계별 방법",
    subtitle: "크레이트 크기 선택, 긍정 연결 훈련 단계, 장시간 사용 시 주의, 분리불안 보조 역할",
    metaTitle: "강아지 크레이트 훈련 — 안식처로 만드는 단계별 완전 가이드 | 펫지기",
    metaDescription: "강아지 크레이트 훈련 단계별 가이드. 크레이트 크기 선택법, 처벌 없이 안식처로 만드는 방법, 장시간 사용 주의사항, 분리불안 보조 역할을 정리했습니다.",
    body: `<p>크레이트를 가두는 도구로 쓰면 안 된다. 제대로 훈련된 크레이트는 강아지가 스스로 들어가 쉬고 싶어 하는 안식처가 된다.</p>

<h2>크레이트의 긍정적 역할</h2>
<ul>
<li>강아지만의 안전하고 조용한 공간 제공</li>
<li>이동 시 안전 확보 (차량, 비행기)</li>
<li>병원 입원·처치 시 스트레스 감소</li>
<li>분리불안 완화 보조 (제대로 훈련된 경우)</li>
</ul>

<h2>크레이트 크기 선택</h2>
<div class="callout-dog">
<strong>크레이트 크기 기준</strong><br>
• 서기·돌기·눕기가 편안한 최소 크기<br>
• 너무 크면 한쪽에 배변하고 한쪽에서 자는 문제 발생<br>
• 강아지 성견 크기 기준으로 선택 (키우면서 크기 조절 가능한 제품 있음)<br>
• 소재: 철장형(통기성 좋음), 에어크레이트(이동 편리)
</div>

<h2>단계별 훈련 방법</h2>
<ul>
<li><strong>1단계</strong>: 크레이트 문 열어두고 주변에 간식 뿌리기</li>
<li><strong>2단계</strong>: 크레이트 안에 간식 넣어 스스로 들어가게 하기</li>
<li><strong>3단계</strong>: 들어가서 먹고 나오는 것 반복 (강제 안 함)</li>
<li><strong>4단계</strong>: 들어간 상태에서 문 닫기 → 1~2분 후 열기</li>
<li><strong>5단계</strong>: 점진적으로 안에 머무는 시간 늘리기</li>
</ul>
<p>각 단계에서 불안 신호(짖기, 긁기)가 없어야 다음 단계로 이동한다.</p>

<h2>장시간 사용 주의사항</h2>
<ul>
<li>성견: 4~6시간 이상 크레이트에 가두지 않기</li>
<li>강아지(3개월 이하): 2~3시간이 한계 (방광 조절 미숙)</li>
<li>처벌 목적으로 넣지 않기 → 부정적 연상 형성</li>
<li>야단친 직후 크레이트에 넣지 않기</li>
</ul>

<h2>마지막으로</h2>
<p>크레이트 훈련에 성공하면 강아지는 스스로 쉬고 싶을 때 크레이트로 들어간다. 그것이 진짜 안식처가 된 신호다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 훈련·행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Yin, S. — Low Stress Handling, Restraint and Behavior Modification of Dogs and Cats. CattleDog Publishing 2009",
      "한국반려동물행동교정사협회 크레이트 훈련 표준 프로토콜",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-18T09:00:00.000Z",
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
  console.log("블로그 포스트 122차 시딩 완료! (blog-731 ~ blog-735)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
