import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 118 — cat3×2 + cat5×1 + cat6×1 + cat1×1 = 5편 (IDs 711-715)
// Macros: D, C, F, E, B
// Angles: RA4, RA7, RA2, RA6, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-711",
    slug: "dog-degenerative-myelopathy-dm",
    type: "blog",
    category: 3,
    title: "강아지 퇴행성 척수병증(DM) — 뒷다리 마비 진행과 재활",
    subtitle: "DM 원인·SOD1 유전자 변이, 진행 단계, 확진 방법, 재활·물리치료 역할",
    metaTitle: "강아지 퇴행성 척수병증(DM) — 뒷다리 마비·재활 완전 가이드 | 펫지기",
    metaDescription: "강아지 퇴행성 척수병증(DM) 원인과 재활. SOD1 유전자 변이, 진행 단계별 증상, MRI 확진, 물리치료·수중치료 효과, 휠체어 보조기구 사용 시점을 정리했습니다.",
    body: `<p>뒷다리가 점점 무너지는 강아지를 보는 것은 보호자에게 매우 힘든 일이다. 퇴행성 척수병증은 느리지만 꾸준히 진행된다. 재활이 삶의 질을 오래 유지하는 열쇠다.</p>

<h2>퇴행성 척수병증이란</h2>
<p>척수의 신경 섬유가 서서히 파괴되는 진행성 신경 질환이다. SOD1 유전자 변이와 연관성이 높으며, 코르기·저먼셰퍼드·복서·로디지안 리지백 등에서 빈발한다. 통증이 없는 것이 특징이며, 8살 이상 중노령견에서 주로 발생한다.</p>

<h2>진행 단계</h2>
<ul>
<li>1단계: 뒷다리 위약, 발을 끌거나 비틀거림</li>
<li>2단계: 뒷다리 서기·걷기 어려움, 균형 소실</li>
<li>3단계: 뒷다리 완전 마비, 앞다리 이상 시작 가능</li>
<li>4단계: 대소변 실금, 앞다리 약화</li>
</ul>

<h2>진단</h2>
<div class="callout-dog">
<strong>DM 진단 방법</strong><br>
• DNA 검사: SOD1 유전자 변이 확인 (확정 진단은 아님, 소인 확인)<br>
• MRI: 다른 척수 질환(추간판 탈출 등) 배제 목적<br>
• 확진: 사후 신경 조직 병리 검사<br>
• 임상에서는 SOD1 양성 + MRI 이상 없음으로 추정 진단
</div>

<h2>재활의 역할</h2>
<ul>
<li>수중 트레드밀: 부력을 이용해 약한 뒷다리 운동 유지</li>
<li>물리치료: 근육 위축 지연, 관절 가동성 유지</li>
<li>보조 하네스·슬링: 걷기 보조</li>
<li>휠체어(카트): 뒷다리 마비 진행 후 이동성 확보</li>
</ul>
<p>재활은 질병을 멈추지는 못하지만 진행을 늦추고 기능을 오래 유지시킨다는 연구들이 있다.</p>

<h2>일상 관리</h2>
<ul>
<li>미끄럼 방지 양말·매트 전 가정 설치</li>
<li>배변 패드 넓게 배치, 실금 관리</li>
<li>욕창 예방: 자주 자세 바꿔주기, 쿠션 침대</li>
</ul>

<h2>마지막으로</h2>
<p>DM은 현재 완치 방법이 없다. 그러나 재활을 일찍 시작할수록 강아지가 이동성을 유지하는 기간이 길어진다. 포기하지 않는 보호자의 노력이 개의 삶의 질을 결정한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Coates, J.R. & Wininger, F.A. — Canine degenerative myelopathy. Vet Clin North Am Small Anim Pract 2010",
      "한국수의재활학회 퇴행성 척수병증 재활 프로토콜",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-06T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-712",
    slug: "cat-megacolon-chronic-constipation",
    type: "blog",
    category: 3,
    title: "고양이 거대결장 — 만성 변비의 끝, 수술까지 가는 이유",
    subtitle: "거대결장 원인·메가콜론 형성 기전, 내과 치료 한계, 아전결장절제술 적응증",
    metaTitle: "고양이 거대결장(메가콜론) — 만성 변비 원인·수술 기준 가이드 | 펫지기",
    metaDescription: "고양이 거대결장(메가콜론) 원인과 치료. 만성 변비로 인한 결장 확장, 락툴로즈·관장 내과 치료, 아전결장절제술 수술 적응증과 회복을 정리했습니다.",
    body: `<p>고양이 변비가 반복되면 결장이 점점 늘어나 결국 기능을 잃게 된다. 이 상태가 거대결장(메가콜론)이다. 일찍 관리하면 수술을 피할 수 있다.</p>

<h2>거대결장이란</h2>
<p>결장이 비정상적으로 확장되어 대변 이동 능력을 잃는 상태다. 만성 변비가 반복될수록 결장 근육이 과도하게 늘어나 수축력을 잃어간다. 특발성(원인 불명, 가장 흔함), 골반 협착, 신경 손상 등이 원인이 된다. 수컷·비만 고양이에서 빈발한다.</p>

<h2>증상</h2>
<ul>
<li>변을 보려 힘주지만 나오지 않음</li>
<li>변 보는 시간 길어짐, 통증</li>
<li>식욕 저하, 구토, 무기력</li>
<li>딱딱하고 건조한 소량 변 또는 전혀 배변 못함</li>
</ul>

<h2>내과 치료</h2>
<div class="callout-cat">
<strong>내과 치료 옵션</strong><br>
• 락툴로즈(삼투성 완하제): 대변 수분 증가, 가장 많이 사용<br>
• 시사프리드(장운동 촉진제): 일부 병원 처방 가능<br>
• 관장: 입원 후 수의사 시행 (고양이에게 직접 관장 금지)<br>
• 고섬유·수분 풍부 식이, 습식 사료 전환<br>
• 체중 관리, 수분 섭취 증가
</div>

<h2>수술 적응증 — 아전결장절제술</h2>
<ul>
<li>내과 치료에 반응하지 않는 반복 변비</li>
<li>결장 기능 완전 소실</li>
<li>아전결장절제술: 기능을 잃은 결장 대부분을 제거</li>
<li>수술 성공률은 높지만 초기 설사·체중 감소 관리 필요</li>
<li>수술 후 대부분 삶의 질 크게 개선</li>
</ul>

<h2>예방과 조기 관리</h2>
<ul>
<li>변비 신호(3일 이상 배변 없음)에 빠른 수의사 방문</li>
<li>습식 사료·음수량 충분히 유지</li>
<li>비만 예방, 규칙적인 운동</li>
<li>화장실 개수: 고양이 수 + 1개 이상 유지</li>
</ul>

<h2>마지막으로</h2>
<p>변비는 "그냥 두면 낫겠지"가 아니다. 반복되는 변비는 거대결장으로 이어질 수 있으며, 조기 관리가 수술을 예방하는 가장 확실한 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Bertoy, R.W. — Megacolon in the cat. Vet Clin North Am Small Anim Pract 2002",
      "한국수의내과학회 고양이 변비·거대결장 관리 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-06T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-713",
    slug: "dog-car-motion-sickness-anxiety",
    type: "blog",
    category: 5,
    title: "강아지 차 멀미·차량 공포증 대처법",
    subtitle: "멀미와 공포증 구분, 탈감작 훈련 방법, 멀미 완화 보조제·약물, 장거리 이동 준비",
    metaTitle: "강아지 차 멀미·차량 공포증 — 원인·훈련·대처 완전 가이드 | 펫지기",
    metaDescription: "강아지 차 멀미와 차량 공포증 원인과 대처법. 멀미 증상과 불안 증상 구분법, 단계별 차량 탈감작 훈련, 멀미약·보조제 옵션, 장거리 이동 준비를 정리했습니다.",
    body: `<p>강아지가 차를 타기만 하면 구역질을 하거나 떨고 짖는다. 멀미인지 공포증인지에 따라 접근법이 달라진다.</p>

<h2>멀미 vs 공포증 구분</h2>
<table>
<thead><tr><th>구분</th><th>주요 증상</th></tr></thead>
<tbody>
<tr><td>차량 멀미</td><td>구역질, 구토, 침 흘림, 무기력, 하품</td></tr>
<tr><td>차량 공포증</td><td>떨기, 짖기, 헐떡거림, 탈출 시도, 배변·배뇨 실수</td></tr>
</tbody>
</table>
<p>둘이 동시에 있는 경우도 많다. 강아지의 반응을 관찰해 어느 쪽이 더 강한지 파악하는 것이 첫 단계다.</p>

<h2>차량 탈감작 훈련</h2>
<div class="callout-dog">
<strong>단계별 차량 적응 훈련</strong><br>
1. 차 옆에 서 있기 → 보상<br>
2. 차 안에 들어가 앉아 있기 (시동 끄고)<br>
3. 시동만 켜기 (움직이지 않음)<br>
4. 짧게 1~2분 이동 → 좋은 장소(공원 등) 도착<br>
5. 점진적으로 이동 시간 늘리기<br>
▶ 각 단계는 성공이 확인되면 다음 단계로
</div>

<h2>멀미 완화 방법</h2>
<ul>
<li>이동 2~3시간 전 금식 (구토 예방)</li>
<li>앞 방향 시트 배치 (창문 밖 시야 확보)</li>
<li>환기: 창문 살짝 열기</li>
<li>생강 간식: 일부 멀미 완화 효과 연구 있음</li>
<li>수의사 처방 항구토제·진정제: 심한 경우 단기 사용 가능</li>
</ul>

<h2>공포증 완화 보조제</h2>
<ul>
<li>어답틸(DAP) 스프레이: 차량 내 안정 호르몬 향</li>
<li>썬더셔츠(압박 조끼): 일부 개에서 불안 감소 효과</li>
<li>수의사 처방 약물(트라조돈 등): 심한 공포증 시 단기 처방 가능</li>
</ul>

<h2>장거리 이동 준비</h2>
<ul>
<li>2시간마다 휴게소 정차, 배변·물 제공</li>
<li>크레이트 이동: 훈련된 크레이트 사용 시 안정감 높음</li>
<li>안전 하네스·카 시트: 사고 시 부상 예방</li>
</ul>

<h2>마지막으로</h2>
<p>차량 적응은 훈련으로 개선되는 경우가 많다. 서두르지 않고 작은 성공을 반복하는 것이 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 훈련·행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Landsberg, G.M. et al. — Effects of dog-appeasing pheromone on anxiety. Can Vet J 2005",
      "한국반려동물행동교정사협회 차량 적응 훈련 매뉴얼",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-07T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-714",
    slug: "pet-cremation-types-comparison",
    type: "blog",
    category: 6,
    title: "반려동물 화장 방법 비교 — 개별·합동·수분해장",
    subtitle: "개별 화장·합동 화장·수분해장(알칼리 가수분해) 방식 차이, 국내 현황, 선택 기준",
    metaTitle: "반려동물 화장 방법 비교 — 개별·합동·수분해장 차이와 선택법 | 펫지기",
    metaDescription: "반려동물 화장 방법 비교. 개별 화장과 합동 화장의 차이, 수분해장(알칼리 가수분해) 국내 현황, 각 방식의 비용·절차·유골 처리 방법을 정리했습니다.",
    body: `<p>반려동물을 보내는 마지막 과정에서 화장 방법을 선택해야 한다. 어떤 방법이 있고 무엇이 다른지 미리 알아두면, 막상 그 순간이 왔을 때 조금 더 차분하게 결정할 수 있다.</p>

<h2>개별 화장</h2>
<p>한 마리만 단독으로 화장하는 방식이다. 화장 후 유골을 보호자에게 단독으로 돌려준다. 유골함에 담아 보관하거나 수목장·산골 등으로 처리할 수 있다. 비용은 합동 화장보다 높지만 유골을 확실히 받을 수 있다.</p>

<h2>합동 화장</h2>
<p>여러 반려동물이 함께 화장되는 방식이다. 개별 유골 수령이 불가능하고, 통합 유골은 공동 납골당 또는 처리된다. 비용이 낮고 접근이 쉽지만, 유골을 직접 간직하고 싶은 보호자에게는 맞지 않는다.</p>

<h2>수분해장(알칼리 가수분해)</h2>
<div class="callout-dog">
<strong>수분해장이란</strong><br>
• 알칼리 용액과 고온·고압으로 유해를 분해하는 방식<br>
• 불을 사용하지 않아 탄소 발자국이 적음<br>
• 유골(미네랄 잔류물)을 보호자에게 돌려줄 수 있음<br>
• 국내: 아직 법적 근거 미비로 일반 서비스화 제한적<br>
• 해외(미국·영국 등): 일부 주·지역에서 합법적 서비스 운영
</div>

<h2>국내 화장 절차</h2>
<ul>
<li>동물 장묘업 등록 업체 이용 — 미등록 업체는 동물보호법 위반</li>
<li>화장 전 사망 확인서(수의사 발행) 불필요하나 업체에 따라 요청 가능</li>
<li>동물 장묘업 등록 업체 조회: 농림축산식품부 동물보호관리시스템</li>
</ul>

<h2>선택 기준</h2>
<ul>
<li>유골을 직접 간직하고 싶다 → 개별 화장</li>
<li>비용 부담이 크다 → 합동 화장</li>
<li>환경적 가치를 중시한다 → 수분해장(국내 서비스 가능 여부 별도 확인)</li>
</ul>

<h2>마지막으로</h2>
<p>어떤 방법을 선택하든, 그것이 그 아이와의 마지막을 진심으로 대하는 선택이라면 옳다. 미리 알아두는 것만으로도 준비가 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 장례·추모 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "농림축산식품부 동물 장묘업 등록 및 관리 현황 2023",
      "한국반려동물장례협회 화장 서비스 표준 가이드",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 실제 장례 서비스 선택은 등록 업체와 직접 상담하시기 바랍니다.",
    status: "published",
    publishedAt: "2027-01-07T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-715",
    slug: "second-dog-adoption-timing",
    type: "blog",
    category: 1,
    title: "두 번째 강아지 입양 시기 — 먼저 온 아이가 받아들이는 조건",
    subtitle: "성격 궁합, 적정 나이 차이, 소개 절차, 자원 경쟁 관리, 첫 만남 실수",
    metaTitle: "두 번째 강아지 입양 시기 — 첫 번째 강아지가 받아들이는 조건 | 펫지기",
    metaDescription: "두 번째 강아지 입양 적절한 시기와 준비법. 먼저 온 강아지 성격·나이 고려 기준, 첫 만남 소개 절차, 자원 경쟁 예방, 입양 후 적응 기간을 정리했습니다.",
    body: `<p>두 마리 함께 살면 좋을 것 같아서 두 번째 강아지를 데려왔다가 먼저 온 강아지가 스트레스로 무너지는 경우가 있다. 준비와 타이밍이 중요하다.</p>

<h2>먼저 온 강아지의 준비 상태 확인</h2>
<ul>
<li>기본 훈련(앉아, 기다려, 와)이 안정적으로 되어 있는가</li>
<li>다른 개와의 상호작용 경험이 있는가</li>
<li>분리불안이 심하거나 자원 지킴 행동이 강하지 않은가</li>
<li>건강 상태가 안정적인가 (아프거나 노령인 경우 스트레스 가중)</li>
</ul>

<h2>적정 나이 차이</h2>
<div class="callout-dog">
<strong>나이 차이와 궁합</strong><br>
• 3살 미만 + 강아지: 에너지 수준 비슷, 적응 비교적 쉬움<br>
• 5~7살 성견 + 강아지: 에너지 차이 조율 필요, 성견 쉬는 시간 보장<br>
• 8살 이상 노령견 + 강아지: 체력·스트레스 부담 크게 고려<br>
▶ 노령견은 강아지의 에너지를 감당하기 어려울 수 있음
</div>

<h2>첫 만남 소개 절차</h2>
<ul>
<li>집 밖 중립 장소에서 첫 만남 (집은 선행 개의 영역)</li>
<li>각자 줄 달고 평행 산책으로 시작</li>
<li>코 인사 허용, 경직·으르렁 시 거리 벌리기</li>
<li>집 귀가 시 새 강아지 먼저 집에 들이지 말 것</li>
<li>첫 1~2주: 서로 분리 공간 확보, 보호자 동석 시에만 교류</li>
</ul>

<h2>자원 경쟁 예방</h2>
<ul>
<li>밥그릇: 분리 공간에서 따로 급여</li>
<li>장난감: 초기에는 자원 지킴 자극 줄이기</li>
<li>보호자 관심: 선행 개를 먼저 챙기는 것이 안정감 유지에 도움</li>
<li>침대·쉬는 공간: 각자 별도 제공</li>
</ul>

<h2>적응 기간</h2>
<ul>
<li>3일: 기본 공존 확인</li>
<li>3주: 경계 완화, 함께 놀기 시작</li>
<li>3개월: 진짜 관계 형성 — 이전에 포기하지 않기</li>
</ul>

<h2>마지막으로</h2>
<p>두 번째 강아지는 먼저 온 강아지를 위해서가 아니라 보호자의 결정이다. 두 아이 모두 안정되려면 충분한 준비와 단계적 소개가 필수다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Herron, M.E. & Shreyer, T. — The pet-friendly veterinary practice. Vet Clin North Am 2014",
      "한국반려동물행동교정사협회 다견 가정 입양 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-08T09:00:00.000Z",
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
  console.log("블로그 포스트 118차 시딩 완료! (blog-711 ~ blog-715)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
