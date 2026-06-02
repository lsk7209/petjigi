import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 71 — cat3×2 + cat4×1 + cat5×1 + cat2×1 = 5편 (IDs 476-480)
// Macros: A, D, F, B, E
// Angles: RA2, RA7, RA1, RA4, RA6

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-476",
    slug: "dog-cushings-syndrome-guide",
    type: "blog",
    category: 3,
    title: "강아지 쿠싱 증후군 — 물 많이 마시고 배가 빵빵해지는 이유",
    subtitle: "쿠싱 증후군 원인(뇌하수체·부신), 주요 증상 7가지, 진단 검사, 치료 옵션",
    metaTitle: "강아지 쿠싱 증후군 — 원인·증상·진단·치료 완전 가이드 | 펫지기",
    metaDescription: "강아지 쿠싱 증후군(부신피질기능항진증) 원인, 물 많이 마시는 증상, 배 빵빵해지는 이유, 진단 검사와 치료 옵션을 정리했습니다.",
    body: `<p>중년 이상의 강아지가 갑자기 물을 많이 마시고, 소변을 자주 보고, 배가 처지면서 털이 빠진다면 쿠싱 증후군을 의심해볼 수 있다.</p>

<h2>쿠싱 증후군이란</h2>
<p>부신피질호르몬(코르티솔)이 과다 분비되는 질환이다. 원인은 두 가지다: ① 뇌하수체 종양(PDH — 전체의 85%) ② 부신 종양(ADH). 뇌하수체에서 ACTH가 과다 분비되면 부신이 자극을 받아 코르티솔을 과다 생산한다.</p>

<h2>주요 증상 7가지</h2>
<ul>
<li>다음(물 많이 마심)·다뇨(소변 많이 봄)</li>
<li>다식(식욕 증가)</li>
<li>복부 팽만 ("팟 벨리" — 간 비대+근육 약화)</li>
<li>좌우 대칭 탈모 (옆구리·등 중심)</li>
<li>피부 얇아짐·색소 침착</li>
<li>근육 약화·운동 불내성</li>
<li>반복적 피부 감염</li>
</ul>

<h2>진단 검사</h2>
<div class="callout-dog">
<strong>쿠싱 진단 과정</strong><br>
1. 혈액·소변 검사 (기본 스크리닝)<br>
2. 저용량 덱사메타손 억제 시험(LDDS) 또는 ACTH 자극 시험<br>
3. 초음파 (부신 크기 확인 — PDH vs ADH 감별)<br>
4. 필요 시 CT/MRI (뇌하수체 종양 위치 확인)
</div>

<h2>치료 옵션</h2>
<ul>
<li><strong>약물</strong>: 트릴로스탄(Trilostane) 또는 미토탄(Mitotane) — 부신 기능 억제</li>
<li><strong>수술</strong>: 부신 종양이 원인인 경우 적출 가능</li>
<li><strong>방사선</strong>: 뇌하수체 종양 크기가 클 경우 고려</li>
</ul>
<p>치료 후 정기적인 혈액 검사로 코르티솔 수치를 모니터링해야 한다.</p>

<h2>마지막으로</h2>
<p>쿠싱 증후군은 초기에 발견할수록 관리가 쉽다. 중년 이후 강아지에서 물 섭취·소변량이 갑자기 늘었다면 방치하지 말고 수의사 검진을 받는 것이 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Feldman, E.C. & Nelson, R.W. — Hyperadrenocorticism (Cushing's Syndrome). Canine and Feline Endocrinology 2015",
      "한국수의내과학회 내분비 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-10T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-477",
    slug: "cat-urinary-blockage-prevention",
    type: "blog",
    category: 3,
    title: "고양이 요로폐색 예방 — 수컷 고양이 보호자 필독",
    subtitle: "요로폐색 위험 요인, 예방 식이, 스트레스 관리, 응급 신호 인지",
    metaTitle: "고양이 요로폐색 예방 — 수컷 고양이 위험 요인과 예방법 | 펫지기",
    metaDescription: "고양이 요로폐색은 수컷에서 치명적인 응급입니다. 위험 요인, 예방 식이, 스트레스 관리, 응급 신호 인지법을 정리했습니다.",
    body: `<p>수컷 고양이의 요로폐색은 24시간 내에 사망에 이를 수 있는 응급 상황이다. 예방이 치료보다 훨씬 쉽고, 예방은 충분히 가능하다.</p>

<h2>왜 수컷에서 더 위험한가</h2>
<p>수컷 고양이의 요도는 암컷보다 훨씬 좁고 길다. 결석·점액마개·경련 등으로 폐색이 생기면 소변이 나오지 않고, 독소가 혈중에 축적되어 수 시간 내 신부전·사망으로 이어질 수 있다.</p>

<h2>위험 요인</h2>
<ul>
<li>건식 사료만 급여 (수분 부족)</li>
<li>비만</li>
<li>스트레스 (이사, 새 동물 도입, 환경 변화)</li>
<li>마그네슘·인 과다 급여</li>
<li>과거 요로 질환 병력</li>
</ul>

<h2>예방 식이</h2>
<div class="callout-cat">
<strong>요로 건강 유지 식이 전략</strong><br>
• 습식 사료 비중 높이기 (50% 이상 권장)<br>
• 흐르는 물 급수기 → 음수량 증가<br>
• 마그네슘 함량 낮은 사료 선택<br>
• 처방식 요로 케어 사료 (스트루바이트·옥살산칼슘 결석 예방)
</div>

<h2>스트레스 관리</h2>
<p>FLUTD(하부 요로 질환)의 30~50%는 특발성(원인 불명)이며, 스트레스가 주요 유발 요인이다. 환경 풍부화, 일정한 루틴 유지, 은신처 확보가 중요하다.</p>

<h2>응급 신호 — 즉시 동물병원</h2>
<ul>
<li>화장실을 들락날락하는데 소변이 안 나옴</li>
<li>소변 자세에서 비명·신음</li>
<li>혈뇨 + 소변량 급감</li>
<li>무기력, 구토, 복부 팽창</li>
</ul>

<h2>마지막으로</h2>
<p>요로폐색은 "내일 병원 가야지"라는 생각이 치명적인 결과를 만드는 질환이다. 응급 신호를 인지하고 즉시 병원으로 가는 것이 고양이 생명을 구한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Lund, E.M. et al. — Health status and population characteristics of cats examined at private veterinary practices in the United States. JAVMA 1999",
      "한국고양이수의사회 비뇨기 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-10T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-478",
    slug: "animal-abuse-reporting-guide",
    type: "blog",
    category: 4,
    title: "동물학대 신고 — 어떻게, 어디에 신고해야 하나",
    subtitle: "동물보호법상 학대 행위 정의, 신고 기관, 신고 절차, 신고 후 처리 과정",
    metaTitle: "동물학대 신고 방법 — 기관·절차·처리 과정 완전 가이드 | 펫지기",
    metaDescription: "동물학대를 목격했을 때 어디에, 어떻게 신고해야 할까요? 동물보호법상 학대 정의, 신고 기관별 역할, 신고 절차와 처리 과정을 정리했습니다.",
    body: `<p>동물학대를 목격했지만 신고 방법을 몰라 그냥 지나쳤다는 경우가 많다. 신고 절차를 미리 알아두면 동물을 실제로 도울 수 있다.</p>

<h2>동물보호법상 학대 행위</h2>
<p>동물보호법 제10조는 동물 학대를 금지하고 있다. 주요 해당 행위:</p>
<ul>
<li>목적 없이 잔인하게 신체에 고통을 주는 행위</li>
<li>도구·약물 등으로 상해를 입히는 행위</li>
<li>적절한 사육 관리 의무 미이행 (방치·굶김)</li>
<li>불필요한 신체 절단</li>
<li>반려동물 유기</li>
</ul>

<h2>신고 기관</h2>
<div class="callout-dog">
<strong>동물학대 신고 채널</strong><br>
• <strong>경찰(112)</strong>: 현행범 또는 즉각적 위험 상황<br>
• <strong>지자체 동물보호 부서</strong>: 지속적 학대 신고·조사 요청<br>
• <strong>농림축산검역본부(1588-9060)</strong>: 학대 신고 전화<br>
• <strong>동물보호단체</strong>: 한국동물보호협회 등 신고 접수 및 지원
</div>

<h2>신고 시 준비할 것</h2>
<ul>
<li>학대 행위 사진·영상 (가능하면)</li>
<li>발생 장소, 날짜, 시간</li>
<li>학대자 인상착의 또는 차량 번호</li>
<li>동물 종류, 외상 상태</li>
</ul>

<h2>신고 후 처리 과정</h2>
<p>지자체 동물보호 담당 공무원 또는 경찰이 현장 확인을 한다. 학대가 확인되면 동물 즉시 격리 및 행정처분·형사 고발이 가능하다. 동물보호법 위반 시 최대 3년 이하 징역 또는 3천만 원 이하 벌금이다.</p>

<h2>마지막으로</h2>
<p>신고는 불필요한 개입이 아니다. 목격자의 신고가 동물을 구할 수 있는 유일한 방법인 경우가 많다. 확실하지 않아도 의심되면 신고하는 것이 옳다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "동물보호법 제10조 (동물 학대 금지) 및 제97조 (벌칙)",
      "농림축산식품부 동물학대 신고·처리 절차 안내",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 긴급 상황에서는 즉시 112에 신고하세요.",
    status: "published",
    publishedAt: "2026-09-11T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-479",
    slug: "dog-car-travel-safety",
    type: "blog",
    category: 5,
    title: "강아지 차량 이동 안전 — 이동장 없이 달리면 생기는 일",
    subtitle: "차량 이동 중 강아지 안전 고정법, 이동장 vs 안전벨트 비교, 멀미 예방",
    metaTitle: "강아지 차량 이동 안전 — 고정 방법·이동장·멀미 예방 가이드 | 펫지기",
    metaDescription: "강아지를 차에 태울 때 안전하게 고정하는 방법을 정리했습니다. 이동장 vs 안전벨트 비교, 조수석 위험성, 멀미 예방법을 알아보세요.",
    body: `<p>강아지를 무릎에 앉히거나 차 안에서 자유롭게 두는 것은 사고 시 강아지와 탑승자 모두에게 위험하다. 시속 50km 충돌 시 10kg 강아지는 500kg의 충격력을 갖는다.</p>

<h2>차량 이동 시 올바른 고정 방법</h2>
<ul>
<li><strong>이동장 고정</strong>: 뒷좌석 바닥 또는 트렁크 — 안전벨트로 고정</li>
<li><strong>차량용 안전벨트 하네스</strong>: 슬링 타입보다 하네스+안전벨트 연결 방식</li>
<li><strong>반려견 전용 카시트</strong>: 소형견용 — 시트에 고정 + 하네스 연결</li>
</ul>

<h2>이동장 vs 안전벨트 하네스</h2>
<div class="callout-dog">
<strong>안전성 비교</strong><br>
• <strong>이동장</strong>: 충격 분산 우수, 강아지 움직임 제한 → 사고 시 가장 안전<br>
• <strong>안전벨트 하네스</strong>: 편의성 좋음, 단 품질 차이 크다 — 충돌 테스트 통과 제품 선택<br>
• <strong>그냥 안음</strong>: 절대 금지 — 에어백 전개 시 즉사 위험
</div>

<h2>조수석이 위험한 이유</h2>
<p>조수석 에어백은 성인 기준으로 설계되어 있다. 소형견·고양이가 조수석에 있을 경우 에어백 전개 시 치명적인 충격을 받을 수 있다. 강아지는 반드시 뒷좌석 또는 트렁크에 고정해야 한다.</p>

<h2>멀미 예방</h2>
<ul>
<li>출발 2~3시간 전 금식 (구토 위험 감소)</li>
<li>짧은 이동부터 시작해 점진적으로 시간 늘리기</li>
<li>창문 약간 열어 환기</li>
<li>심한 멀미는 수의사 처방 항구토제 활용</li>
</ul>

<h2>마지막으로</h2>
<p>강아지 차량 이동 안전은 선택이 아니다. 고정되지 않은 강아지는 사고 시 탑승자에게도 위험이 된다. 이동장 하나가 생명을 구한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Center for Pet Safety — Crash Test Results for Pet Restraint Systems 2020",
      "한국교통안전공단 반려동물 차량 이동 안전 지침",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-11T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-480",
    slug: "cat-elimination-diet-guide",
    type: "blog",
    category: 2,
    title: "고양이 알레르기 제거 식이 — 제대로 하는 방법과 흔한 실수",
    subtitle: "식이 알레르기 vs 환경 알레르기 구분, 가수분해 vs 신단백질 식이, 제거 식이 기간",
    metaTitle: "고양이 식이 알레르기 제거 식이 — 올바른 방법과 주의사항 | 펫지기",
    metaDescription: "고양이 식이 알레르기를 정확히 진단하는 제거 식이 방법. 가수분해 사료 vs 신단백질 사료 차이, 제거 식이 기간, 흔한 실수를 정리했습니다.",
    body: `<p>고양이가 긁거나, 반복적으로 구토·설사를 하거나, 귀 감염이 자꾸 재발한다면 식이 알레르기가 원인일 수 있다. 확인 방법은 제거 식이(Elimination Diet)다.</p>

<h2>식이 알레르기와 환경 알레르기 구분</h2>
<p>증상만으로는 식이 알레르기와 환경 알레르기(먼지·꽃가루·곰팡이)를 구분하기 어렵다. 식이 알레르기는 연중 지속적인 증상, 환경 알레르기는 계절적 변동이 특징이다. 제거 식이는 식이 알레르기 여부를 확인하는 가장 정확한 방법이다.</p>

<h2>제거 식이 방법</h2>
<div class="callout-cat">
<strong>제거 식이 두 가지 접근법</strong><br>
<strong>1. 가수분해 사료(Hydrolyzed Protein Diet)</strong><br>
단백질을 분자 수준으로 분해 → 면역 반응 유발 크기 이하<br>
대표: 힐스 z/d, 로얄캐닌 Anallergenic<br><br>
<strong>2. 신단백질 식이(Novel Protein Diet)</strong><br>
기존에 먹어본 적 없는 단백질 원료 사용<br>
예: 오리·사슴·캥거루·토끼
</div>

<h2>제거 식이 기간</h2>
<ul>
<li>최소 8주 — 일부 고양이는 12주 필요</li>
<li>기간 중 다른 음식·간식·영양제 완전 차단</li>
<li>가족 구성원 모두 동의 필수 (몰래 주는 간식이 실험을 망친다)</li>
</ul>

<h2>흔한 실수</h2>
<ul>
<li>기간 중 닭고기 간식 1번 → 처음부터 다시 시작</li>
<li>시판 신단백질 사료 중 "성분표에 닭고기 포함" → 유효하지 않음</li>
<li>4주에 증상 개선 없다고 포기 → 8주까지 유지 필요</li>
</ul>

<h2>마지막으로</h2>
<p>제거 식이는 귀찮고 긴 과정이지만, 식이 알레르기를 확인하는 유일하게 정확한 방법이다. 수의사의 지도 하에 진행하면 처방식 사료 선택과 기간 관리에 훨씬 도움이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Mueller, R.S. et al. — Diagnosis and management of food allergy and intolerance in dogs and cats. Aust Vet J 2000",
      "한국수의피부학회 식이 알레르기 임상 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-12T09:00:00.000Z",
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
  console.log("블로그 포스트 71차 시딩 완료! (blog-476 ~ blog-480)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
