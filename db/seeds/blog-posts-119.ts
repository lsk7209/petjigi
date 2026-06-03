import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 119 — cat3×2 + cat2×1 + cat4×1 + cat5×1 = 5편 (IDs 716-720)
// Macros: D, C, G, A, F
// Angles: RA5, RA2, RA7, RA4, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-716",
    slug: "dog-osteosarcoma-bone-cancer",
    type: "blog",
    category: 3,
    title: "강아지 골육종 — 다리 절뚝임이 뼈암일 때",
    subtitle: "골육종 발생 부위·고위험 품종, 조기 증상, 절단·방사선 치료 선택, 예후",
    metaTitle: "강아지 골육종(뼈암) — 증상·치료 선택·예후 완전 가이드 | 펫지기",
    metaDescription: "강아지 골육종(뼈암) 원인과 치료. 대형견 고위험 부위, 파행·부종 초기 증상, 절단술·항암화학요법 병행, 팔리아티브 케어 옵션과 예후를 정리했습니다.",
    body: `<p>갑자기 한쪽 다리를 절뚝이기 시작한 대형 노령견. X선 검사에서 뼈의 이상이 발견된다면 골육종을 먼저 의심해야 한다.</p>

<h2>골육종이란</h2>
<p>뼈에서 발생하는 악성 종양이다. 강아지에서 가장 흔한 원발성 골종양이며, 그레이트데인·세인트버나드·로트와일러·저먼셰퍼드 등 대형·초대형견에서 빈발한다. 주로 앞다리 원위 요골, 뒷다리 근위 경골 등 성장판 인근에 발생한다.</p>

<h2>증상</h2>
<ul>
<li>진행성 파행: 서서히 또는 갑자기 한쪽 다리 절뚝임</li>
<li>국소 부종·열감</li>
<li>통증(만지거나 다리 사용 시 반응)</li>
<li>병적 골절: 경미한 자극에도 뼈가 부러짐</li>
</ul>
<p>골육종은 진단 시 이미 폐 전이가 있는 경우가 90%에 달한다는 연구가 있다.</p>

<h2>진단</h2>
<div class="callout-dog">
<strong>골육종 진단 방법</strong><br>
• 방사선(X선): 특징적인 골 파괴 + "선버스트 패턴" 확인<br>
• 흉부 방사선/CT: 폐 전이 평가<br>
• 조직 생검: 확진 (세침흡인 또는 절개 생검)<br>
• 알칼리 포스파타아제(ALP) 상승: 예후 불량 지표
</div>

<h2>치료 선택</h2>
<ul>
<li><strong>절단 + 항암화학요법</strong>: 표준 치료. 중앙 생존 기간 약 10~12개월, 2년 생존율 약 20~30%</li>
<li><strong>사지 보존 수술 + 항암</strong>: 일부 적합한 경우 선택 가능</li>
<li><strong>방사선 치료 단독</strong>: 통증 완화 목적(팔리아티브)</li>
<li><strong>팔리아티브 케어</strong>: 수술 거부 시 통증 관리 중심 (NSAID·비스포스포네이트)</li>
</ul>

<h2>절단 후 생활</h2>
<p>세 다리로도 대부분의 개는 잘 적응한다. 절단 후 수주 내 활발히 움직이는 경우가 많다. 잔여 관절·척추 보호를 위한 체중 관리가 중요하다.</p>

<h2>마지막으로</h2>
<p>골육종은 예후가 좋지 않지만 치료 선택에 따라 통증 없이 보낼 수 있는 시간이 달라진다. 빠른 진단과 보호자와 수의사의 충분한 상담이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Withrow, S.J. & MacEwen, E.G. — Withrow & MacEwen's Small Animal Clinical Oncology 5th Ed. Elsevier 2013",
      "한국수의종양학회 골육종 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-08T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-717",
    slug: "cat-polycystic-kidney-disease-pkd",
    type: "blog",
    category: 3,
    title: "고양이 다낭성 신장 질환(PKD) — 유전 검사와 관리",
    subtitle: "PKD1 유전자 돌연변이, 페르시안·엑조틱 고위험, 유전 검사 시기, 신부전 진행 관리",
    metaTitle: "고양이 다낭성 신장 질환(PKD) — 유전 검사·관리 완전 가이드 | 펫지기",
    metaDescription: "고양이 다낭성 신장 질환(PKD) 원인과 관리. PKD1 유전자 돌연변이, 페르시안·엑조틱 고위험, 유전자 검사 방법, 신부전 진행 시 관리 원칙을 정리했습니다.",
    body: `<p>페르시안, 엑조틱 쇼트헤어 보호자라면 PKD(다낭성 신장 질환)를 알아야 한다. 유전 질환이지만 조기 발견과 관리로 삶의 질을 오래 유지할 수 있다.</p>

<h2>PKD란</h2>
<p>신장에 낭종(물주머니)이 점차 증가해 신장 기능을 손상시키는 유전 질환이다. 상염색체 우성 유전(PKD1 유전자 돌연변이)으로, 부모 중 하나가 PKD를 가지면 새끼의 약 50%가 유전된다. 페르시안·엑조틱 쇼트헤어·히말라얀에서 발생률이 높다.</p>

<h2>증상과 진행</h2>
<ul>
<li>어린 나이(3~10세)에 신부전 증상 나타날 수 있음</li>
<li>초기: 무증상 (낭종만 존재)</li>
<li>중기: 다음다갈증, 식욕 저하, 체중 감소</li>
<li>말기: 만성 신부전과 동일한 경과</li>
</ul>

<h2>유전 검사</h2>
<div class="callout-cat">
<strong>PKD 검사 방법</strong><br>
• DNA 검사(구강 도말 또는 혈액): PKD1 돌연변이 확인<br>
• 초음파: 6~8개월령 이후 낭종 확인 가능<br>
• 고위험 품종(페르시안·엑조틱)은 번식 전 검사 권장<br>
• 검사 음성이라도 성장 과정 정기 모니터링 권장
</div>

<h2>신부전 진행 시 관리</h2>
<ul>
<li>정기 혈액검사: BUN·크레아티닌·SDMA 모니터링</li>
<li>신장식(단백질 제한) 처방식: 신부전 진행 시 수의사 처방</li>
<li>수분 섭취 증가: 습식 사료 전환, 음수량 유지</li>
<li>혈압 관리: 고혈압 동반 시 약물 치료</li>
<li>구토·빈혈 등 증상 별도 관리</li>
</ul>

<h2>번식에서의 의미</h2>
<p>PKD 양성 개체는 번식에서 제외하는 것이 원칙이다. 검사를 통해 양성 개체를 번식에서 제외하면 이 질환의 유병률을 줄일 수 있다.</p>

<h2>마지막으로</h2>
<p>PKD는 현재 완치 방법이 없지만, 조기 발견 후 신부전 관리를 시작하면 정상에 가까운 삶의 질을 오래 유지할 수 있다. 고위험 품종 보호자라면 정기 검사를 습관화하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Lyons, L.A. et al. — Feline polycystic kidney disease mutation identified in PKD1. J Am Soc Nephrol 2004",
      "한국고양이수의사회 PKD 진단 및 관리 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-09T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-718",
    slug: "dog-glucosamine-chondroitin-evidence",
    type: "blog",
    category: 2,
    title: "강아지 글루코사민·콘드로이틴 효과 근거",
    subtitle: "관절 보충제 작용 기전, 임상 연구 현황, NSAID와 비교, 급여 기준",
    metaTitle: "강아지 글루코사민·콘드로이틴 효과 — 과학적 근거와 선택 기준 | 펫지기",
    metaDescription: "강아지 글루코사민·콘드로이틴 관절 보충제 효과 근거. 작용 기전, 동물 임상 연구 현황, NSAID 대비 한계, 적합한 급여 대상과 용량 기준을 정리했습니다.",
    body: `<p>강아지 관절 보충제의 대명사인 글루코사민·콘드로이틴. 효과가 있긴 한 걸까? 과학적 근거를 냉정하게 살펴봤다.</p>

<h2>글루코사민·콘드로이틴 작용 기전</h2>
<p>글루코사민은 연골 기질(프로테오글리칸) 합성 재료로, 콘드로이틴은 연골 내 수분 유지와 연골 분해 효소 억제에 관여한다고 알려져 있다. 이론적으로는 연골 보호 효과를 기대할 수 있다.</p>

<h2>임상 연구 현황</h2>
<div class="callout-dog">
<strong>강아지 관절 보충제 연구 요약</strong><br>
• 사람(OA 환자)을 대상으로 한 대규모 연구(GAIT): 전체 효과 없음, 일부 심한 OA 군에서 개선<br>
• 강아지를 대상으로 한 고품질 이중맹검 연구: 소수, 결과 혼재<br>
• 일부 수의 연구: 이동성 개선·통증 완화 보고 있음<br>
• 결론: "효과가 없다"고 단언할 수 없으나 "확실히 효과 있다"는 근거도 부족
</div>

<h2>NSAID(소염진통제)와 비교</h2>
<ul>
<li>NSAID: 관절염 통증 조절에 효과 명확, 강아지 처방 약물로 사용</li>
<li>글루코사민: NSAID 대체제가 아님, 보완적 사용으로 접근 권장</li>
<li>수의사 처방 없이 보호자가 NSAID를 인간용으로 급여하는 것은 위험</li>
</ul>

<h2>현명한 선택 기준</h2>
<ul>
<li>대형견·노령견 예방적 사용: 부작용이 거의 없어 시도 가능</li>
<li>관절 통증이 명확하다면 수의사 처방 NSAID가 우선</li>
<li>제품 선택: NASC(미국 동물보충제위원회) 인증 또는 제3자 검증 제품 권장</li>
<li>실제 함량 확인: 글루코사민 500~1000mg/10kg/일 기준 참고</li>
</ul>

<h2>급여 시 주의사항</h2>
<ul>
<li>당뇨 강아지: 글루코사민이 혈당에 영향 가능성 — 수의사 상담 후 급여</li>
<li>과다 급여 주의: "더 먹이면 더 좋다"는 근거 없음</li>
<li>지속적 급여 중에도 관절 증상 모니터링 필수</li>
</ul>

<h2>마지막으로</h2>
<p>글루코사민·콘드로이틴은 만병통치약이 아니지만, 적절히 사용하면 관절 건강 보조에 도움이 될 수 있다. 과학적 한계를 알고 기대 수준을 조정하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "McCarthy, G. et al. — Randomised double-blind, positive-controlled trial to assess the efficacy of glucosamine/chondroitin sulfate for the treatment of dogs with osteoarthritis. Vet J 2007",
      "한국수의영양학회 반려동물 관절 보충제 사용 현황 리뷰",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-09T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-719",
    slug: "pet-insurance-waiting-period-guide",
    type: "blog",
    category: 4,
    title: "펫보험 대기 기간 — 가입 직후 보장 안 되는 항목들",
    subtitle: "대기 기간 정의, 질병·사고·특약별 차이, 대기 기간 중 발병 시 처리, 가입 전 확인 방법",
    metaTitle: "펫보험 대기 기간 — 가입 직후 보장 안 되는 항목 완전 정리 | 펫지기",
    metaDescription: "펫보험 대기 기간 완전 정리. 질병·슬개골·피부 등 항목별 대기 기간 차이, 대기 기간 중 발병 처리, 가입 전 약관에서 확인해야 할 핵심 포인트.",
    body: `<p>펫보험에 가입하고 며칠 만에 반려동물이 아팠는데 보험금이 나오지 않았다는 사례가 많다. 대기 기간을 몰랐던 것이다.</p>

<h2>대기 기간이란</h2>
<p>보험 가입 후 보장이 시작되기 전까지 기다려야 하는 기간이다. 이 기간 동안 발생한 질병·사고는 보험금 지급 대상이 아니다. 가입 전 이미 진행 중인 질환을 숨기고 가입한 뒤 즉시 청구하는 것을 방지하기 위한 장치다.</p>

<h2>항목별 대기 기간</h2>
<div class="callout-dog">
<strong>일반적인 대기 기간 구조 (상품별 다름)</strong><br>
• 사고·외상: 1~3일 (가장 짧음)<br>
• 일반 질병: 30일<br>
• 슬개골 탈구·십자인대: 90일~180일 (품종 위험 질환)<br>
• 피부 질환: 30~90일<br>
• 치과·구강: 90일 (치과 특약 포함 상품)<br>
• 암(종양): 90일~180일<br>
▶ 실제 수치는 상품마다 크게 다르므로 약관 직접 확인 필수
</div>

<h2>대기 기간 중 발병 시</h2>
<ul>
<li>대기 기간 내 진단·치료 시작된 질환은 보장 제외</li>
<li>대기 기간 후 동일 질환 재발해도 면책 처리되는 경우 있음</li>
<li>계약 전 알릴 의무(고지 의무): 가입 당시 알고 있던 병력 고지 필수</li>
</ul>

<h2>상품 비교 시 확인 포인트</h2>
<ul>
<li>슬개골 탈구 대기 기간: 소형견 보호자에게 중요</li>
<li>암 대기 기간: 고령 반려동물 가입 시 확인</li>
<li>재가입 시 대기 기간: 타사에서 이전 가입 시 대기 기간 재시작 여부</li>
<li>갱신 형 vs 비갱신 형: 갱신 시 대기 기간 재적용 여부</li>
</ul>

<h2>가입 최적 시기</h2>
<ul>
<li>건강할 때, 최대한 어릴 때 가입이 유리</li>
<li>가입 연령 상한(보통 6~10살) 초과 전 가입 필수 확인</li>
<li>대기 기간을 감안해 예정된 수술·치료 전 최소 90일 전 가입</li>
</ul>

<h2>마지막으로</h2>
<p>대기 기간은 펫보험의 핵심 조건 중 하나다. 가입 전 약관에서 항목별 대기 기간을 반드시 확인하고, 반려동물의 건강 상태와 연령에 맞는 상품을 선택하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 보험·법률 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 펫보험 비교 공시 가이드 2023",
      "한국손해보험협회 반려동물 보험 상품 표준 약관 해설",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 실제 보험 계약 내용은 해당 보험사 약관을 직접 확인하시기 바랍니다.",
    status: "published",
    publishedAt: "2027-01-10T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-720",
    slug: "dog-recall-training-come-command",
    type: "blog",
    category: 5,
    title: "강아지 호출 훈련(와!) — 생명을 지키는 명령어 완전 가이드",
    subtitle: "호출 훈련이 중요한 이유, 기초부터 오프리쉬까지 단계별 방법, 실패 원인",
    metaTitle: "강아지 호출 훈련(와!) — 완벽한 리콜 만드는 단계별 방법 | 펫지기",
    metaDescription: "강아지 호출 훈련(와!) 단계별 가이드. 리콜이 생명을 구하는 이유, 기초·야외·오프리쉬 환경 단계별 방법, 호출 실패 원인과 회복 방법을 정리했습니다.",
    body: `<p>강아지가 도로로 달려가는 순간, 다른 개에게 공격적으로 달려드는 순간 — "와!"가 들릴 때 돌아오는 개는 목숨을 구한다. 호출 훈련은 선택이 아닌 필수다.</p>

<h2>왜 호출 훈련이 중요한가</h2>
<p>완벽한 리콜(호출 명령에 즉시 돌아오는 행동)은 응급 상황에서 강아지의 생명을 지킨다. 리쉬를 놓쳤을 때, 오프리쉬 놀이터에서 싸움이 날 것 같을 때, 도로로 뛰어가려 할 때 즉각 작동해야 한다.</p>

<h2>기초 단계 — 집 안에서</h2>
<div class="callout-dog">
<strong>리콜 기초 훈련 방법</strong><br>
1. 개가 가까이 있을 때 "와!" + 고가 보상(고기·치즈)<br>
2. 개가 돌아오면 파티처럼 칭찬<br>
3. 호출해서 불쾌한 일(목욕, 주사)을 하면 리콜 붕괴<br>
4. 호출 = 항상 좋은 일이 생긴다는 연결 만들기<br>
▶ 절대 호출 후 야단치지 않기
</div>

<h2>중급 단계 — 거리·방해 요소 추가</h2>
<ul>
<li>집 안 → 마당 → 조용한 야외 → 사람 많은 야외 순서</li>
<li>긴 훈련용 줄(5~10m) 연결 상태에서 야외 호출 연습</li>
<li>성공률 80% 이상일 때 다음 환경으로 이동</li>
<li>방해 요소(다른 개, 냄새)가 있을 때도 보상 높이기</li>
</ul>

<h2>고급 단계 — 오프리쉬 호출</h2>
<ul>
<li>긴 줄 없는 환경은 기초·중급이 완성된 후에만 시도</li>
<li>호출 성공 후 다시 놀러 보내주기: 호출 = 놀이 끝 연상 방지</li>
<li>불확실한 환경에서는 줄 유지 (안전이 우선)</li>
</ul>

<h2>리콜이 실패하는 이유</h2>
<ul>
<li>호출 후 야단침: "와!" = 혼난다는 연상 형성</li>
<li>반복 호출: 여러 번 부르면 무시 학습 발생</li>
<li>보상이 낮음: 방해 요소보다 보상이 매력적이지 않으면 돌아오지 않음</li>
<li>너무 빠른 진행: 기초 없이 야외 훈련 시도</li>
</ul>

<h2>마지막으로</h2>
<p>리콜 훈련은 투자 대비 효과가 가장 큰 훈련이다. 지금 당장 집 안에서 고가 보상과 함께 "와!"를 가르치기 시작하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 훈련·행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Reid, P. — Excel-Erated Learning. James & Kenneth Publishers 1996",
      "한국반려동물행동교정사협회 리콜 훈련 표준 프로토콜",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-10T11:00:00.000Z",
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
  console.log("블로그 포스트 119차 시딩 완료! (blog-716 ~ blog-720)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
