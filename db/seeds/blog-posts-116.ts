import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 116 — cat3×2 + cat4×1 + cat5×1 + cat2×1 = 5편 (IDs 701-705)
// Macros: D, C, F, G, A
// Angles: RA2, RA5, RA8, RA4, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-701",
    slug: "dog-lyme-disease-tick-prevention",
    type: "blog",
    category: 3,
    title: "강아지 라임병 — 진드기 매개 감염과 예방",
    subtitle: "라임병 전파 경로, 임상 증상, 진단, 항생제 치료, 진드기 예방 방법",
    metaTitle: "강아지 라임병 — 진드기 감염·증상·치료·예방 완전 가이드 | 펫지기",
    metaDescription: "강아지 라임병 원인과 예방법. 진드기 매개 보렐리아 감염, 파행·발열 증상, 항생제 치료 기간, 진드기 기피제·예방약 선택 기준을 정리했습니다.",
    body: `<p>라임병은 진드기가 옮기는 세균성 감염 질환이다. 국내에서도 야외 활동 강아지를 중심으로 사례가 보고되고 있으며, 진드기 예방이 가장 확실한 방어책이다.</p>

<h2>라임병이란 — 원인과 전파</h2>
<p>라임병은 보렐리아(Borrelia burgdorferi) 세균이 원인이며, 참진드기(Ixodes 속)에 물릴 때 전파된다. 진드기가 피부에 붙어 있는 시간이 길수록(24~48시간 이상) 감염 위험이 높아진다. 국내에서는 봄·가을 산책 이후 진드기 부착 사례가 많다.</p>

<h2>강아지 라임병 증상</h2>
<ul>
<li>다리를 번갈아 절뚝임(이행성 파행): 가장 흔한 증상</li>
<li>발열, 식욕 저하, 무기력</li>
<li>관절 부종·통증</li>
<li>심한 경우: 신장 손상(라임 신염), 심장 전도 장애</li>
</ul>
<p>증상은 감염 후 2~5개월 뒤 나타날 수 있어 진드기에 물린 기억과 연결하기 어려운 경우가 많다.</p>

<h2>진단과 치료</h2>
<div class="callout-dog">
<strong>라임병 진단·치료 요점</strong><br>
• 항체 검사(C6 SNAP 검사 등)로 선별, PCR로 확진<br>
• 항생제(독시사이클린) 4주 이상 투여가 표준 치료<br>
• 신장 손상 동반 시 예후 불량, 조기 치료가 중요<br>
• 증상 호전 후에도 처방 기간 완료 필수
</div>

<h2>진드기 예방 방법</h2>
<ul>
<li>월 1회 외부기생충 예방약(스팟온·경구) 정기 사용</li>
<li>야외 활동 후 귀·발가락 사이·겨드랑이·서혜부 꼼꼼히 확인</li>
<li>진드기 발견 시 핀셋으로 수직 방향 제거, 손으로 잡거나 비틀지 않기</li>
<li>라임병 백신: 일부 수의사 권장(고위험 지역 거주 또는 야외 활동 빈번한 개)</li>
</ul>

<h2>국내 현황</h2>
<p>국내 라임병 발생률은 북미보다 낮지만, 등산·캠핑을 즐기는 반려견 보호자라면 진드기 예방을 소홀히 해서는 안 된다. 봄(4~6월)과 가을(9~11월)이 진드기 활동 최성기다.</p>

<h2>마지막으로</h2>
<p>라임병 예방의 핵심은 진드기가 피부에 오래 붙어 있지 않도록 하는 것이다. 외출 후 전신 검사와 정기 예방약 사용이 가장 효과적인 방어선이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Littman, M.P. et al. — ACVIM consensus update on Lyme borreliosis in dogs and cats. J Vet Intern Med 2018",
      "농림축산검역본부 반려동물 외부기생충 감염병 예방 가이드",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-01T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-702",
    slug: "cat-fip-new-treatment-guide",
    type: "blog",
    category: 3,
    title: "고양이 FIP(전염성 복막염) — 새로운 치료제 현황",
    subtitle: "FIP 습성·건성 유형 차이, GS-441524 등 항바이러스제 치료 성과, 치료 기간과 한계",
    metaTitle: "고양이 FIP 치료제 현황 — 항바이러스제 GS-441524 가이드 | 펫지기",
    metaDescription: "고양이 FIP 새로운 치료제 현황. 습성·건성 FIP 차이, GS-441524 항바이러스제 치료 성과, 치료 기간·비용·재발 위험, 국내 처방 현황을 정리했습니다.",
    body: `<p>한때 불치병으로 여겨졌던 고양이 FIP에 항바이러스제 치료 옵션이 생겼다. 그러나 치료가 모든 상황에서 동일하게 적용되지는 않으며, 빠른 진단이 핵심이다.</p>

<h2>FIP란 — 원인과 유형</h2>
<p>FIP(고양이 전염성 복막염)는 고양이 코로나바이러스(FCoV)가 돌연변이를 일으켜 전신 감염을 유발하는 치명적 질환이다. 고양이 간에 전염되는 질환이 아니라, 개체 내에서 바이러스가 변이하는 방식으로 발생한다.</p>
<ul>
<li><strong>습성(삼출형)</strong>: 복강·흉강에 액체 축적, 진단 상대적으로 쉬움</li>
<li><strong>건성(비삼출형)</strong>: 눈·신경·내부 장기 육아종, 진단 어려움</li>
</ul>

<h2>새로운 치료 옵션</h2>
<div class="callout-cat">
<strong>항바이러스제 치료 현황</strong><br>
• GS-441524(뉴클레오사이드 유사체): 다수 연구에서 높은 관해율 보고<br>
• 몰누피라비르 계열: 일부 프로토콜에서 병행 사용<br>
• 치료 기간: 최소 84일(12주), 신경형·눈 침범 시 더 길어질 수 있음<br>
• 치료 비용: 체중·기간에 따라 수십만 ~ 수백만 원 이상<br>
• 국내 현황: 허가외(off-label) 처방, 수의사 상담 필수
</div>

<h2>치료 성과와 한계</h2>
<ul>
<li>습성 FIP: 치료 반응 좋음, 관해율 80% 이상 보고 사례 있음</li>
<li>신경형 FIP: 치료 기간 길고 예후 다양</li>
<li>재발 위험: 치료 완료 후에도 모니터링 필요</li>
<li>치료 중단 후 재발 시 추가 치료 필요할 수 있음</li>
</ul>

<h2>진단의 중요성</h2>
<p>FIP 확진은 쉽지 않다. 복수·흉수의 분석, 알파-1-산성 당단백(AGP) 수치, PCR 검사, 조직 생검 등을 종합해 판단한다. 증상 초기에 FIP를 의심하고 전문 수의사와 빠르게 상담하는 것이 치료 결과를 결정짓는다.</p>

<h2>마지막으로</h2>
<p>FIP는 더 이상 "선고"가 아닐 수 있다. 그러나 치료가 모든 개체에게 동일하게 효과적이지 않으며, 빠른 진단과 전문 수의사와의 상담이 필수다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Pedersen, N.C. et al. — Efficacy of a 3C-like protease inhibitor in treating various forms of acquired feline infectious peritonitis. J Feline Med Surg 2018",
      "한국고양이수의사회 FIP 치료 현황 안내문",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-01T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-703",
    slug: "dog-leash-reactivity-training",
    type: "blog",
    category: 5,
    title: "강아지 리쉬 반응성 — 산책 중 짖고 달려드는 행동 교정",
    subtitle: "리쉬 반응성 원인, 역치 이해, 단계별 탈감작·역조건화 훈련 방법",
    metaTitle: "강아지 리쉬 반응성 교정 — 산책 중 짖음·돌진 행동 훈련법 | 펫지기",
    metaDescription: "강아지가 산책 중 다른 개나 사람에게 짖고 달려드는 리쉬 반응성 원인과 교정 방법. 역치 거리 확보, 탈감작·역조건화 훈련 단계별 방법을 정리했습니다.",
    body: `<p>산책 중 다른 개를 보면 미친 듯이 짖고 달려드는 강아지. 보호자는 당황하고 산책이 스트레스가 된다. 이 행동은 훈련으로 개선할 수 있다.</p>

<h2>리쉬 반응성이란</h2>
<p>리쉬(목줄)에 연결된 상태에서 자극(다른 개, 사람, 자전거, 소리 등)에 과도하게 반응하는 행동이다. 짖기, 돌진, 으르렁거림, 점프로 나타난다. 줄이 당겨지는 좌절감, 사회화 부족, 과거 부정적 경험이 주요 원인이다.</p>

<h2>역치(Threshold) 이해가 핵심</h2>
<p>강아지마다 자극에 반응하기 시작하는 거리(역치)가 다르다. 역치 밖에서 훈련해야 개가 침착한 상태에서 학습할 수 있다. 역치 안으로 들어가면 이미 반응이 시작되어 훈련 효과가 없다.</p>

<div class="callout-dog">
<strong>탈감작·역조건화(DS/CC) 기본 원칙</strong><br>
1. 자극을 역치 밖 거리에서 보여준다<br>
2. 개가 자극을 인식하는 순간 고가 보상(고기·치즈 등) 제공<br>
3. 자극이 사라지면 보상 중단<br>
4. "자극이 나타나면 좋은 것이 생긴다"는 연결 형성<br>
5. 반응 없이 성공하면 거리를 조금씩 줄임
</div>

<h2>실전 단계별 방법</h2>
<ul>
<li><strong>1단계</strong>: 자극 없는 환경에서 "나 봐" 눈맞춤 훈련 완성</li>
<li><strong>2단계</strong>: 자극이 보이지만 반응 없는 거리에서 자극 출현 → 보상 연습</li>
<li><strong>3단계</strong>: 거리를 점진적으로 좁히며 반복</li>
<li><strong>4단계</strong>: 자극 옆을 지나갈 때 보호자에게 시선 유지 훈련</li>
</ul>

<h2>피해야 할 것들</h2>
<ul>
<li>목줄 홱 당기기: 좌절감·공격성 악화</li>
<li>억지로 자극 앞에 세우기: 홍수법은 반응성 강화 위험</li>
<li>보상을 너무 낮게 쓰기: 고가 보상이 필수</li>
<li>훈련을 너무 빨리 진행하기: 조급증이 후퇴 유발</li>
</ul>

<h2>마지막으로</h2>
<p>리쉬 반응성은 하루아침에 고쳐지지 않는다. 꾸준한 훈련과 인내가 필요하며, 개선이 더딜 경우 공인 행동 전문가와 상담하는 것을 권장한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 훈련·행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Overall, K.L. — Manual of Clinical Behavioral Medicine for Dogs and Cats. Elsevier 2013",
      "한국반려동물행동교정사협회 리쉬 반응성 교육 자료",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-02T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-704",
    slug: "dog-food-storage-oxidation-risk",
    type: "blog",
    category: 2,
    title: "강아지 사료 보관법 — 산화와 곰팡이 독소 위험",
    subtitle: "사료 산화 원인, 곰팡이 독소(아플라톡신) 위험, 올바른 보관 용기·환경",
    metaTitle: "강아지 사료 보관법 — 산화·아플라톡신 독소 예방 완전 가이드 | 펫지기",
    metaDescription: "강아지 사료 올바른 보관법. 산화로 인한 영양 손실, 아플라톡신 곰팡이 독소 위험, 보관 용기 선택, 대용량 사료 구매 주의사항을 정리했습니다.",
    body: `<p>사료를 좋은 것으로 골라도 보관이 잘못되면 영양이 떨어지거나 독소가 생길 수 있다. 사료 보관은 생각보다 중요한 문제다.</p>

<h2>사료 산화 — 영양을 갉아먹는 과정</h2>
<p>건식 사료의 지방은 공기에 노출되면 산화(과산화지질 생성)된다. 산화된 지방은 영양 가치가 떨어지고 강아지에게 소화 장애, 염증 반응을 일으킬 수 있다. 오메가3 지방산은 특히 산화에 약하다.</p>

<h2>곰팡이 독소(아플라톡신) 위험</h2>
<div class="callout-dog">
<strong>아플라톡신 위험 상황</strong><br>
• 고온·고습 환경에서 아스페르길루스 곰팡이 증식<br>
• 아플라톡신은 강아지 간 손상, 심한 경우 치명적<br>
• 외관상 문제없어 보여도 독소가 있을 수 있음<br>
• 곰팡이 냄새·변색 사료는 즉시 폐기<br>
• 국내 여름철(고온다습) 특히 주의 필요
</div>

<h2>올바른 보관 방법</h2>
<ul>
<li><strong>원래 봉투</strong>: 개봉 후 지퍼백·클립으로 밀봉. 봉투 자체에 항산화제 코팅 있는 경우 많음</li>
<li><strong>보관 용기</strong>: 밀폐 용기 사용 권장. 단, 원봉투째 넣는 것이 가장 좋음(직접 부어 담으면 용기 잔여 기름이 새 사료 오염)</li>
<li><strong>온도</strong>: 25°C 이하 서늘한 곳. 냉동 가능하나 개봉 후 결로 주의</li>
<li><strong>습도</strong>: 60% 이하 건조한 환경</li>
<li><strong>직사광선</strong>: 차단 필수</li>
</ul>

<h2>대용량 구매 주의사항</h2>
<ul>
<li>개봉 후 1개월 내 소비 권장 (소형견은 6주 초과 시 개봉분 상태 확인)</li>
<li>한 번에 너무 많은 양 구매보다 적정 크기 구매 반복이 신선도 유지에 유리</li>
<li>유통기한보다 개봉 후 경과 시간이 더 중요</li>
</ul>

<h2>마지막으로</h2>
<p>좋은 사료를 제대로 먹이려면 보관도 사료 선택만큼 중요하다. 개봉 후 1개월, 서늘하고 건조한 밀폐 보관이 기본이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Dzanis, D.A. — Pet food storage and safety. FDA CVM 2012",
      "한국소비자원 반려동물 사료 안전성 모니터링 보고서",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-02T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-705",
    slug: "pet-insurance-claim-rejection-reasons",
    type: "blog",
    category: 4,
    title: "펫보험 보험금 청구 거절 사유 TOP 5",
    subtitle: "선천성 질환, 대기 기간, 고지 의무 위반, 면책 사항, 서류 미비 — 청구 거절 패턴 분석",
    metaTitle: "펫보험 보험금 청구 거절 사유 5가지 — 대처법과 예방법 | 펫지기",
    metaDescription: "펫보험 보험금 청구가 거절되는 주요 이유 5가지. 대기 기간 내 치료, 선천성 질환, 고지 의무 위반, 면책 항목, 서류 미비 유형별 대처법을 정리했습니다.",
    body: `<p>펫보험에 가입했지만 막상 청구하면 거절당하는 경우가 있다. 어떤 이유로 거절되는지 알면 가입 전후 대비가 가능하다.</p>

<h2>1위 — 대기 기간 내 치료</h2>
<p>대부분의 펫보험은 가입 후 30일(일부 질환은 90~180일)의 대기 기간이 있다. 이 기간 내 발생한 질병은 보장하지 않는다. 가입 직후 아파도 보험금이 나오지 않는다.</p>

<h2>2위 — 선천성·유전성 질환 제외</h2>
<p>선천성 질환이나 특정 품종에 빈발하는 유전 질환을 면책으로 두는 보험상품이 많다. 가입 전 특약 구성과 면책 조항을 꼼꼼히 확인해야 한다.</p>

<h2>3위 — 고지 의무 위반</h2>
<div class="callout-dog">
<strong>고지 의무 위반 유형</strong><br>
• 가입 당시 이미 진단·치료 중인 질환 미고지<br>
• 기존 병력(이전 진료 기록) 숨김<br>
• 나이·품종 오기재<br>
▶ 고의 또는 중대한 과실로 판단 시 계약 해지 및 보험금 전액 거절 가능
</div>

<h2>4위 — 면책 항목 해당</h2>
<ul>
<li>예방접종, 건강검진, 중성화 수술 등 예방 목적 의료비</li>
<li>치과(스케일링 포함) — 일부 상품은 치과 특약 있음</li>
<li>피부 질환 — 일부 상품에서 면책</li>
<li>임신·출산 관련 비용</li>
</ul>

<h2>5위 — 서류 미비·기간 초과</h2>
<ul>
<li>청구 서류 불완전(진료 확인서 누락, 영수증 불명확)</li>
<li>청구 기간 초과(보험사별 청구 가능 기간 상이, 일반적으로 치료일로부터 3년)</li>
<li>수의사 진단서 내 병명 불명확</li>
</ul>

<h2>거절 대처 방법</h2>
<ul>
<li>거절 사유를 서면으로 요청</li>
<li>이의 신청 가능(보험사 이의 제기 절차 활용)</li>
<li>금융감독원 금융소비자보호처 분쟁 조정 신청 가능</li>
</ul>

<h2>마지막으로</h2>
<p>가입 전 약관의 면책 조항과 대기 기간을 반드시 확인하고, 청구 시 서류는 진료 당일 챙기는 습관을 들이는 것이 최선이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 보험·법률 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 펫보험 분쟁 조정 사례집 2023",
      "한국소비자원 반려동물 보험 피해 구제 현황 분석",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 실제 보험 계약 내용은 해당 보험사 약관을 직접 확인하시기 바랍니다.",
    status: "published",
    publishedAt: "2027-01-03T09:00:00.000Z",
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
  console.log("블로그 포스트 116차 시딩 완료! (blog-701 ~ blog-705)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
