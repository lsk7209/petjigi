import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 108 — cat3×2 + cat4×1 + cat5×1 + cat2×1 = 5편 (IDs 661-665)
// Macros: D, A, C, F, G
// Angles: RA1, RA6, RA4, RA8, RA3

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-661",
    slug: "dog-imha-immune-hemolytic-anemia",
    type: "blog",
    category: 3,
    title: "강아지 면역매개 용혈성 빈혈(IMHA) — 갑작스러운 빈혈의 원인",
    subtitle: "IMHA 원인·유발 인자, 증상, 응급 처치 필요성, 스테로이드 치료, 재발 관리",
    metaTitle: "강아지 IMHA(면역매개 용혈성 빈혈) — 증상·치료·재발 관리 가이드 | 펫지기",
    metaDescription: "강아지 면역매개 용혈성 빈혈(IMHA) 원인과 치료법. 갑작스러운 빈혈 증상, 응급 수혈 필요 여부, 스테로이드 면역 억제 치료, 재발 방지 관리를 설명합니다.",
    body: `<p>IMHA는 면역계가 자신의 적혈구를 공격해 파괴하는 자가면역 질환이다. 빠르게 진행하면 수혈이 필요한 응급 상황이 된다.</p>

<h2>원인과 유발 인자</h2>
<ul>
<li><strong>일차성(특발성)</strong>: 원인 불명의 자가면역 반응 — 가장 흔한 유형</li>
<li><strong>이차성</strong>: 감염(에를리키아·바베시아), 약물 반응, 종양, 다른 면역 질환에 의해 유발</li>
<li>봄~여름 계절적 발생 증가 보고 있음 (진드기 매개 감염과 연관 추정)</li>
</ul>

<h2>주요 증상</h2>
<div class="callout-dog">
<strong>즉시 동물병원으로 가야 하는 IMHA 징호</strong><br>
• 잇몸·혀·눈 흰자가 창백하거나 노랗게 변함 (황달)<br>
• 극도의 무기력, 일어서지 못함<br>
• 빠른 호흡, 심박수 증가<br>
• 소변이 붉거나 갈색 (혈색소뇨)<br>
▶ 이 증상은 응급입니다 — 다음날 방문이 아닌 즉시 응급 병원으로
</div>

<h2>진단</h2>
<ul>
<li>CBC: 심한 빈혈 (PCV/HCT 급격히 낮음), 구상적혈구(구형 적혈구) 관찰</li>
<li>쿰스 검사(Coombs test): 면역 매개 빈혈 확인</li>
<li>혈액 도말: 적혈구 형태 확인</li>
<li>진드기 매개 감염 검사: 이차성 원인 배제</li>
</ul>

<h2>치료</h2>
<ul>
<li>면역 억제: 프레드니솔론 고용량 ± 아자티오프린·사이클로스포린</li>
<li>수혈: PCV가 극도로 낮을 때 (생명 유지)</li>
<li>혈전 예방: 아스피린·클로피도그렐 (IMHA는 혈전 형성 위험 높음)</li>
</ul>

<h2>예후와 재발</h2>
<p>IMHA의 급성기 사망률은 30~40%에 달한다. 생존 이후에도 재발 위험이 있어 스테로이드 감량은 반드시 수의사 지시에 따라 천천히 진행해야 한다. 정기 CBC 모니터링이 필수다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Weinkle, T.K. et al. — Evaluation of prognostic factors in canine IMHA. JAVMA 2005",
      "한국수의내과학회 면역매개 혈액 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 증상 발생 시 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-12-11T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-662",
    slug: "cat-corneal-ulcer-guide",
    type: "blog",
    category: 3,
    title: "고양이 각막 궤양 — 눈 비비는 행동, 집에서 기다리면 안 되는 이유",
    subtitle: "각막 궤양 원인, 단계별 심각도, 즉시 내원 신호, 치료 방법",
    metaTitle: "고양이 각막 궤양 — 증상·심각도·즉시 내원 기준 가이드 | 펫지기",
    metaDescription: "고양이 각막 궤양 원인과 치료. 눈 비비는 행동이 위험한 이유, 단계별 심각도, 즉시 동물병원에 가야 하는 신호, 각막 궤양 치료 방법을 정리했습니다.",
    body: `<p>고양이가 눈을 자꾸 비비거나 눈을 잘 뜨지 못한다면 각막 문제일 수 있다. 각막 궤양은 시간이 지날수록 깊어지고 심각해진다.</p>

<h2>각막 궤양이란</h2>
<p>각막(눈 앞쪽의 투명한 막)에 상처가 생겨 표면 또는 더 깊은 층까지 손상이 진행되는 상태다. 통증이 심하며, 방치하면 각막 천공(구멍)까지 진행할 수 있다.</p>

<h2>흔한 원인</h2>
<ul>
<li>고양이 헤르페스바이러스(FHV-1): 가장 흔한 원인, 재발 가능</li>
<li>외상: 다른 고양이 발톱, 이물질</li>
<li>눈물 분비 부족(건성각결막염)</li>
<li>안검 이상 (속눈썹이 각막을 자극)</li>
</ul>

<h2>즉시 동물병원에 가야 하는 신호</h2>
<div class="callout-cat">
<strong>지체 없이 내원해야 하는 눈 증상</strong><br>
• 눈을 완전히 감고 뜨지 못함<br>
• 각막이 흰색·파란색으로 흐려짐<br>
• 눈에서 노랗거나 초록색 분비물<br>
• 눈이 부어오르거나 충혈이 심함<br>
• 눈을 발로 긁어서 추가 손상 위험<br>
▶ 각막 궤양은 24~48시간 내 급속히 악화될 수 있습니다
</div>

<h2>심각도 단계</h2>
<ul>
<li>표재성 궤양: 각막 상피층만 손상, 치료 시 빠른 회복</li>
<li>심층 기질 궤양: 각막 기질까지 진행, 수주 치료 필요</li>
<li>데스메막 돌출(Descemetocele): 응급 수술 필요</li>
<li>각막 천공: 즉각적 외과 처치 필요, 실명 위험</li>
</ul>

<h2>치료</h2>
<ul>
<li>항생제 안약: 이차 세균 감염 예방</li>
<li>FHV-1 관련: 항바이러스 안약 또는 경구제</li>
<li>엘리자베스 칼라: 자가 손상 방지 (절대 제거하지 말 것)</li>
<li>심층 궤양·천공: 각막 봉합술 또는 결막 피판술</li>
</ul>

<h2>마지막으로</h2>
<p>눈 질환은 "조금 있다가 보러 가야겠다"고 미루는 것이 가장 위험하다. 고양이 눈에 이상이 보이면 같은 날 수의사 진료를 받는 것이 원칙이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Stiles, J. — Feline herpesvirus. Clin Tech Small Anim Pract 2003",
      "한국수의안과학회 고양이 각막 질환 진단 및 치료 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 눈 이상 증상이 있으면 즉시 수의사 진료를 받으세요.",
    status: "published",
    publishedAt: "2026-12-12T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-663",
    slug: "pet-death-registration-cancel",
    type: "blog",
    category: 4,
    title: "반려동물 사망 후 동물등록 말소 절차 완전 정리",
    subtitle: "사망 신고 기한, 말소 방법 3가지, 필요 서류, 미말소 시 불이익",
    metaTitle: "반려동물 사망 후 동물등록 말소 — 기한·방법·서류 완전 가이드 | 펫지기",
    metaDescription: "반려동물 사망 후 동물등록 말소 방법. 신고 기한, 온라인·오프라인·대행 말소 방법, 필요 서류, 말소하지 않으면 생기는 불이익을 정리했습니다.",
    body: `<p>반려동물이 사망했을 때 슬픔 속에서도 챙겨야 할 행정 절차가 있다. 동물등록 말소 신고가 그것이다.</p>

<h2>말소 신고 의무</h2>
<p>동물보호법 제12조에 따라 등록 동물이 사망한 경우 보호자는 30일 이내에 말소 신고를 해야 한다. 신고하지 않으면 과태료가 부과될 수 있다.</p>

<h2>말소 방법 3가지</h2>
<div class="callout-dog">
<strong>동물등록 말소 신고 방법</strong><br>
• <strong>온라인</strong>: 동물보호관리시스템(APMS, www.animal.go.kr) 접속 → 로그인 → 동물등록 → 말소 신청<br>
• <strong>오프라인</strong>: 주소지 관할 시·군·구청 방문 신청<br>
• <strong>동물병원 대행</strong>: 등록 대행업체(동물병원)에서 말소 신고 대행 가능
</div>

<h2>필요 서류</h2>
<ul>
<li>온라인: 보호자 공동인증서 + 사망 사실 확인 정보 입력</li>
<li>오프라인: 신분증, 동물등록증 (있는 경우)</li>
<li>동물병원 사망 확인서 있으면 처리가 빠를 수 있음 (일부 지자체)</li>
</ul>

<h2>미말소 시 불이익</h2>
<ul>
<li>과태료: 최대 50만 원 (미신고 시)</li>
<li>행정 통보 대상에 계속 포함될 수 있음</li>
<li>동물등록 데이터베이스 오류 지속</li>
</ul>

<h2>화장·장례 후 말소 시점</h2>
<p>사망 즉시 말소할 수 있다. 화장·매장을 먼저 진행한 뒤에 말소해도 되며, 순서 제약은 없다. 단 30일 기한만 지키면 된다.</p>

<h2>마지막으로</h2>
<p>반려동물의 죽음은 깊은 슬픔이다. 그러나 30일 기한 내 말소 신고는 짧은 시간이 필요한 절차다. 미리 알아두면 슬픈 시간에 불필요한 불이익을 막을 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "동물보호법 제12조 — 등록 동물의 변경신고",
      "농림축산식품부 동물보호관리시스템(APMS) 이용 안내",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-12T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-664",
    slug: "puppy-socialization-critical-period",
    type: "blog",
    category: 5,
    title: "퍼피 사회화 골든타임 — 8~16주에 반드시 할 것들",
    subtitle: "사회화 민감기의 의미, 사람·소리·환경 노출 목록, 부정적 경험 예방, 백신 전 사회화",
    metaTitle: "강아지 사회화 기간 — 8~16주 골든타임에 해야 할 것들 | 펫지기",
    metaDescription: "강아지 사회화 골든타임 8~16주에 해야 할 것들. 사회화 민감기 의미, 사람·소리·환경 노출 목록, 백신 완료 전 사회화 방법, 부정적 경험 예방법을 정리했습니다.",
    body: `<p>강아지의 성격과 행동 기반은 생후 8~16주에 결정된다. 이 기간에 충분히 사회화되지 않으면 이후 훈련으로도 회복하기 어려운 공포·공격성이 형성될 수 있다.</p>

<h2>사회화 민감기란</h2>
<p>강아지는 생후 3주~16주 사이에 새로운 자극을 두려움 없이 받아들이는 신경학적 창이 열린다. 이 시기를 지나면 동일한 자극도 공포 반응을 일으킬 수 있다. 한 번 형성된 공포는 수개월의 체계적 둔감화가 필요하다.</p>

<h2>노출해야 할 자극 목록</h2>
<div class="callout-dog">
<strong>사회화 체크리스트 핵심 항목</strong><br>
• <strong>사람</strong>: 남성·여성·어린이·노인·모자 쓴 사람·안경 쓴 사람<br>
• <strong>소리</strong>: 천둥 소리(녹음), 청소기, 오토바이, 불꽃놀이 소리<br>
• <strong>환경</strong>: 엘리베이터, 미끄러운 바닥, 계단, 자동차 창문<br>
• <strong>접촉</strong>: 발·귀·입 만지기, 목욕, 드라이어<br>
• <strong>다른 동물</strong>: 사회화된 성견, 고양이
</div>

<h2>백신 완료 전 사회화</h2>
<ul>
<li>백신 완료(12~16주)를 기다리면 골든타임을 놓친다</li>
<li>백신 1차 이후 위험을 최소화하는 방법으로 사회화 가능</li>
<li>백신 접종된 개들만 있는 환경, 실내 강아지 유치원 활용</li>
<li>땅에 내려놓지 않아도 되는 자극(소리, 사람, 차량)부터 시작</li>
</ul>

<h2>부정적 경험 예방</h2>
<ul>
<li>자극은 항상 긍정적인 연관(간식·칭찬)과 함께</li>
<li>강아지가 겁먹으면 즉시 거리를 늘리고 강도 낮추기</li>
<li>억지로 자극에 노출시키면 역효과</li>
<li>하루 최대 2~3가지 새로운 자극으로 제한</li>
</ul>

<h2>마지막으로</h2>
<p>사회화는 한 번의 이벤트가 아니라 매일의 조금씩이 쌓이는 과정이다. 16주 이후에도 사회화를 계속하되, 8~16주의 집중 노출이 가장 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동·케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Morrow, M. et al. — Puppy socialization practices of a sample of dog owners. JAVMA 2015",
      "한국동물행동의학회 강아지 사회화 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-13T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-665",
    slug: "grain-free-dog-food-heart-risk",
    type: "blog",
    category: 2,
    title: "그레인프리 사료와 심장병(DCM) — 논란의 현재 상태",
    subtitle: "FDA 조사 배경, 그레인프리-DCM 연관 가설, 현재 결론과 한계, 사료 선택 기준",
    metaTitle: "그레인프리 사료와 DCM(확장성 심근병증) 논란 — 현재 상태 정리 | 펫지기",
    metaDescription: "그레인프리 사료와 강아지 심장병(DCM) 논란의 현재 상태. FDA 조사 배경, 연관 가설의 한계, 현재 과학적 결론, 사료 선택 시 고려사항을 정리했습니다.",
    body: `<p>2018년 FDA가 그레인프리(곡물 무첨가) 사료와 강아지 확장성 심근병증(DCM) 사이의 연관 가능성을 조사한다고 발표했다. 이 뉴스는 반려인들 사이에서 큰 파장을 일으켰다.</p>

<h2>FDA 조사 배경</h2>
<p>DCM(확장성 심근병증)은 심장 근육이 늘어나 수축력이 약해지는 질환으로, 주로 대형견에서 발생한다. 그런데 2014년 이후 DCM 비발생 견종에서의 사례가 증가하고, 이들 상당수가 그레인프리·콩류 다량 함유 사료를 먹고 있었다.</p>

<h2>연관 가설</h2>
<div class="callout-dog">
<strong>그레인프리-DCM 연관 주요 가설</strong><br>
• 타우린 결핍: 특정 콩류(완두콩·렌즈콩) 다량 함유 사료가 타우린 합성·흡수를 방해할 가능성<br>
• 영양 불균형: 곡물 대체 성분 비율 증가로 전체 영양 균형 변화<br>
• 특정 성분의 직접 독성: 현재 미확인<br>
▶ 이 가설들은 아직 인과관계가 입증되지 않았습니다
</div>

<h2>현재 결론의 한계</h2>
<ul>
<li>2023년 이후 FDA 조사는 명확한 인과관계 결론 없이 진행 중</li>
<li>DCM 발생 사례의 상당수가 그레인프리가 아닌 특정 브랜드 집중</li>
<li>그레인프리를 먹어도 DCM이 발생하지 않는 개 다수</li>
<li>유전적 소인(대형견)이 독립적 위험 인자</li>
</ul>

<h2>사료 선택 기준</h2>
<ul>
<li>WSAVA 가이드라인: 주요 대학 수의영양학과 연구 투자하는 브랜드 우선</li>
<li>완두콩·렌즈콩이 성분표 상위 3개 내에 포함된 사료는 보수적 접근</li>
<li>DCM 고위험 대형견 (도베르만·복서·아이리시 울프하운드 등): 수의사 상담 권장</li>
</ul>

<h2>마지막으로</h2>
<p>그레인프리 사료가 무조건 위험하다거나, 반드시 먹여야 한다는 것 모두 현재 근거가 없다. 개별 사료의 성분 구성과 브랜드의 영양 연구 기반을 확인하는 것이 더 실질적인 기준이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "FDA — Investigation into Potential Link Between Certain Diets and Canine Dilated Cardiomyopathy (2019)",
      "한국수의심장학회 강아지 DCM 위험 인자 및 사료 관련 최신 동향",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-13T11:00:00.000Z",
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
  console.log("블로그 포스트 108차 시딩 완료! (blog-661 ~ blog-665)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
