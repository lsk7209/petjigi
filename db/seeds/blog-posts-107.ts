import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 107 — cat3×2 + cat5×1 + cat2×1 + cat1×1 = 5편 (IDs 656-660)
// Macros: D, A, F, G, B
// Angles: RA2, RA5, RA7, RA3, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-656",
    slug: "dog-addison-disease-guide",
    type: "blog",
    category: 3,
    title: "강아지 애디슨병 — 부신피질기능저하증의 위험 신호",
    subtitle: "애디슨병 원인, 전형·비전형 증상, 애디소니안 위기, 진단 검사, 장기 관리",
    metaTitle: "강아지 애디슨병(부신피질기능저하증) — 증상·진단·장기 관리 가이드 | 펫지기",
    metaDescription: "강아지 애디슨병 원인과 증상 정리. 부신피질기능저하증 전형·비전형 증상, 위험한 애디소니안 위기, 진단 방법, 평생 관리 방법을 알기 쉽게 설명합니다.",
    body: `<p>애디슨병(부신피질기능저하증)은 부신이 충분한 코티솔과 알도스테론을 생산하지 못하는 질환이다. 증상이 다양하고 비특이적이어서 "위대한 흉내쟁이"라고도 불린다.</p>

<h2>부신이 하는 일</h2>
<p>부신은 신장 위에 위치하는 작은 내분비 기관이다. 코티솔(스트레스 반응·혈당 조절)과 알도스테론(나트륨·칼륨·수분 균형)을 분비한다. 이 두 호르몬이 부족하면 전신에 영향이 나타난다.</p>

<h2>주요 증상</h2>
<ul>
<li>무기력, 기운 없음, 운동 불내성</li>
<li>식욕 부진 또는 완전 거부</li>
<li>구토, 설사 (간헐적 또는 만성)</li>
<li>체중 감소</li>
<li>음수량·배뇨량 증가</li>
<li>근육 약화, 떨림</li>
</ul>

<h2>애디소니안 위기 — 생명을 위협하는 응급 상황</h2>
<div class="callout-dog">
<strong>즉시 동물병원으로 가야 하는 신호</strong><br>
• 갑작스러운 극도의 허약, 쓰러짐<br>
• 심한 구토·설사와 함께 저혈압<br>
• 의식 저하 또는 혼수<br>
• 심한 탈수, 차가운 사지<br>
▶ 애디소니안 위기는 수액과 응급 코티솔 처치가 없으면 수 시간 내 사망할 수 있습니다
</div>

<h2>진단</h2>
<ul>
<li>기본 혈액검사: 저나트륨·고칼륨 비율 이상 (Na:K &lt; 27) 의심</li>
<li>ACTH 자극 검사: 확진의 표준 검사, 부신 반응 확인</li>
<li>복부 초음파: 부신 크기 확인</li>
</ul>

<h2>장기 관리</h2>
<p>애디슨병은 완치가 아닌 평생 관리 질환이다. 알도스테론 대체는 데스모프레신 또는 플루드로코티손으로, 코티솔 대체는 프레드니솔론으로 보충한다. 스트레스 상황(수술·여행·질병)에는 용량 조정이 필요할 수 있으므로 반드시 담당 수의사와 사전 상담한다.</p>

<h2>예후</h2>
<p>적절히 관리되는 애디슨병 강아지는 정상에 가까운 삶의 질과 수명을 기대할 수 있다. 규칙적인 혈액 모니터링과 정기 검진이 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Scott-Moncrieff, J.C. — Hypoadrenocorticism. Textbook of Veterinary Internal Medicine 2010",
      "한국수의내과학회 부신 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-12-09T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-657",
    slug: "cat-renal-vs-urinary-diet-guide",
    type: "blog",
    category: 3,
    title: "고양이 신장식 vs 비뇨기식 — 어떤 차이인가",
    subtitle: "신장 질환 처방식과 비뇨기 처방식의 성분 차이, 혼용 금지 이유, 처방 조건",
    metaTitle: "고양이 신장식 vs 비뇨기식 차이 — 성분·처방 조건 완전 정리 | 펫지기",
    metaDescription: "고양이 신장식과 비뇨기식의 차이를 정리했습니다. 단백질·인·마그네슘 함량 차이, 혼용하면 안 되는 이유, 각각 처방 조건과 수의사 지시 없이 급여 시 위험성을 설명합니다.",
    body: `<p>반려인들이 가장 혼동하는 처방식이 신장식과 비뇨기식이다. 이름은 비슷해도 목표와 성분이 다르며, 잘못 급여하면 오히려 상태를 악화시킬 수 있다.</p>

<h2>신장 처방식 (Renal Diet)의 목적</h2>
<p>만성 신장 질환(CKD)이 있는 고양이에게 쓴다. 핵심은 단백질과 인 제한이다. 신장이 약해진 상태에서 단백질 대사 산물과 인이 혈액에 쌓이면 신장에 추가 부담을 준다. 신장식은 고단백 요구를 가진 고양이의 특성을 고려하면서도 인을 최소화하도록 설계되었다.</p>

<h2>비뇨기 처방식 (Urinary Diet)의 목적</h2>
<p>방광 결석(스트루바이트·옥살산칼슘)과 하부 요로 질환(FLUTD) 관리에 쓴다. 소변 pH 조절과 마그네슘·칼슘·옥살산 함량 조정이 핵심이다. 소변을 묽게 만들어 결정 형성을 억제한다.</p>

<h2>성분 비교</h2>
<div class="callout-cat">
<strong>신장식 vs 비뇨기식 주요 차이</strong><br>
• <strong>단백질</strong>: 신장식(낮음) vs 비뇨기식(일반~높음)<br>
• <strong>인(P)</strong>: 신장식(매우 낮음) vs 비뇨기식(조절)<br>
• <strong>마그네슘</strong>: 신장식(일반) vs 비뇨기식(제한)<br>
• <strong>소변 pH 목표</strong>: 신장식(해당 없음) vs 비뇨기식(6.0~6.5 산성화)<br>
▶ CKD 고양이에게 비뇨기식을 쓰면 고단백으로 신장 손상 가속 위험
</div>

<h2>혼용이 위험한 이유</h2>
<ul>
<li>CKD + 결석이 함께 있는 경우: 어느 한 식이가 다른 쪽 악화 가능</li>
<li>반드시 수의사가 우선순위를 결정해야 함</li>
<li>일부 브랜드는 CKD+비뇨기 복합 처방식 출시 (수의사 처방 필요)</li>
</ul>

<h2>처방식은 처방이 필요하다</h2>
<p>두 처방식 모두 수의사 진단 없이 임의로 급여해선 안 된다. 특히 신장식의 단백질 제한은 건강한 고양이에게 불필요하고 근육 손실을 일으킬 수 있다.</p>

<h2>마지막으로</h2>
<p>처방식은 약과 같다. "좋다고 들었다"는 이유로 시작하지 말고, 반드시 혈액 검사와 소변 검사 결과를 바탕으로 수의사와 상의한 뒤 결정하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Ross, S.J. et al. — Evaluation of renal function in cats with chronic kidney disease. J Vet Intern Med 2006",
      "한국수의내과학회 고양이 하부 요로 질환 및 신장 질환 식이 관리 지침",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 처방 없이 처방식을 변경하지 마세요.",
    status: "published",
    publishedAt: "2026-12-09T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-658",
    slug: "dog-separation-anxiety-step-by-step",
    type: "blog",
    category: 5,
    title: "강아지 분리불안 단계별 둔감화 훈련",
    subtitle: "분리불안 신호 구분, 1단계 출발 신호 둔감화, 2단계 짧은 이별 연습, 3단계 연장",
    metaTitle: "강아지 분리불안 훈련 — 단계별 둔감화 방법과 실패 원인 | 펫지기",
    metaDescription: "강아지 분리불안 단계별 둔감화 훈련 방법. 출발 신호 둔감화, 짧은 이별 연습, 점진적 연장 방법과 훈련이 실패하는 흔한 원인을 정리했습니다.",
    body: `<p>분리불안은 단순한 장난이나 지루함이 아니다. 보호자가 없을 때 극도의 공포와 불안이 행동으로 나타나는 것이다. 올바른 접근 없이는 벌을 줄수록 악화된다.</p>

<h2>분리불안 vs 지루함 구분</h2>
<ul>
<li>분리불안: 보호자 떠난 직후 즉시 시작, 귀가 후 수 분 내 진정</li>
<li>지루함: 한참 후 시작, 귀가와 무관하게 지속 가능</li>
<li>분리불안 징표: 과도한 발성, 파괴, 부적절한 배변, 문·창 긁기</li>
</ul>

<h2>1단계: 출발 신호 둔감화</h2>
<p>강아지는 열쇠·가방·신발 착용 등 보호자의 출발 패턴을 학습한다. 이 신호만으로도 불안이 촉발된다.</p>
<ul>
<li>출발 신호를 실제 외출 없이 반복 (열쇠 들었다가 내려놓기)</li>
<li>신호에 불안 반응이 사라질 때까지 매일 10~15분씩 반복</li>
<li>무관심하게 진행하는 것이 핵심 (과도한 인사·작별 금지)</li>
</ul>

<h2>2단계: 짧은 이별 연습</h2>
<div class="callout-dog">
<strong>짧은 이별 연습 원칙</strong><br>
• 불안 반응이 나타나기 직전에 돌아오는 것이 목표<br>
• 처음에는 5초, 10초, 30초부터 시작<br>
• 돌아왔을 때 과도한 반응은 금지 (평온하게 귀가)<br>
• 실패(불안 반응 발생)하면 시간을 더 줄여서 재시도<br>
▶ 서두르면 처음부터 다시 해야 한다
</div>

<h2>3단계: 시간 점진적 연장</h2>
<ul>
<li>불규칙한 간격으로 시간을 늘리는 것이 효과적 (예측 불가능성 훈련)</li>
<li>일주일에 이별 시간을 2~3분씩만 늘리기</li>
<li>퇴행(악화)이 있으면 이전 단계로 돌아가기</li>
</ul>

<h2>보조 수단</h2>
<ul>
<li>Kong 장난감·노즈워크: 출발 직전에만 제공 (특별함 유지)</li>
<li>운동 증가: 훈련 전 충분한 산책으로 에너지 소진</li>
<li>중증 분리불안: 행동 치료와 함께 약물 처방 가능 (수의사 상담)</li>
</ul>

<h2>마지막으로</h2>
<p>분리불안 훈련은 2~6개월이 걸리는 장기 과정이다. 성급하게 진행하거나 벌을 주는 방식은 불안을 악화시킨다. 진전이 없거나 심각한 경우 수의행동의학 전문가 상담을 고려하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동·케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Overall, K.L. — Manual of Clinical Behavioral Medicine for Dogs and Cats. Elsevier 2013",
      "한국동물행동의학회 분리불안 행동 교정 지침",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-10T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-659",
    slug: "dog-cat-omega3-fish-oil-guide",
    type: "blog",
    category: 2,
    title: "강아지·고양이 오메가3 선택 가이드 — 어유 품질과 복용량",
    subtitle: "EPA·DHA 역할, 어유 품질 기준(IFOS·산화도), 적정 복용량, 과다 복용 위험",
    metaTitle: "강아지·고양이 오메가3(어유) 선택 가이드 — EPA·DHA·복용량 | 펫지기",
    metaDescription: "강아지와 고양이 오메가3 어유 선택 방법. EPA·DHA 역할, 어유 품질 IFOS 인증, 산화도 확인, 적정 복용량과 과다 복용 시 주의사항을 정리했습니다.",
    body: `<p>오메가3 지방산은 반려동물의 피부·모질·관절·심혈관·인지 기능에 도움이 된다고 알려져 있다. 그러나 모든 어유가 같은 품질은 아니다.</p>

<h2>EPA와 DHA — 무엇이 다른가</h2>
<ul>
<li><strong>EPA (에이코사펜타엔산)</strong>: 항염 작용, 관절·피부 건강</li>
<li><strong>DHA (도코사헥사엔산)</strong>: 뇌·신경·망막 발달 및 기능 유지</li>
<li>고양이는 알파리놀렌산(ALA, 식물성 오메가3)을 EPA·DHA로 전환하는 능력이 거의 없음 → 반드시 어유(동물성) 형태로 공급 필요</li>
</ul>

<h2>어유 품질 기준</h2>
<div class="callout-dog">
<strong>좋은 어유 선택 기준</strong><br>
• IFOS(국제 어유 표준 프로그램) 인증 여부<br>
• 산화(산패) 지표: TOTOX 값 낮을수록 좋음<br>
• 중금속 검사 결과 공개 여부<br>
• 형태: 에스테르형(EE)보다 트리글리세리드(TG) 형태가 흡수율 높음<br>
▶ 산화된 어유는 이득은커녕 산화 스트레스를 유발할 수 있음
</div>

<h2>복용량 기준</h2>
<ul>
<li>일반 건강 보조: 체중 1kg당 EPA+DHA 합계 약 20~55mg</li>
<li>항염 목적(피부·관절): 체중 1kg당 최대 100~150mg (수의사 상담 후)</li>
<li>고양이는 강아지보다 낮은 용량부터 시작</li>
</ul>

<h2>과다 복용 시 주의사항</h2>
<ul>
<li>소화 장애 (지방성 설사, 구토)</li>
<li>혈소판 기능 저하 → 출혈 시간 연장</li>
<li>비만 위험 (고칼로리 지방 보충)</li>
<li>수술 전 2주는 중단 권장</li>
</ul>

<h2>마지막으로</h2>
<p>오메가3는 보충제 중 비교적 안전하지만 "많을수록 좋다"는 생각은 위험하다. 적정량을 품질 좋은 제품으로 공급하는 것이 최선이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물영양학회 오메가3 보충제 가이드라인",
      "Bauer, J.E. — Therapeutic use of fish oils in companion animals. JAVMA 2011",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-10T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-660",
    slug: "shelter-cat-adjustment-guide",
    type: "blog",
    category: 1,
    title: "보호소 출신 고양이 입양 후 적응 — 숨는 고양이 대처법",
    subtitle: "숨기 행동의 의미, 적응 기간 현실, 강제 접촉 금지 이유, 단계별 신뢰 쌓기",
    metaTitle: "보호소 출신 고양이 입양 후 적응 — 숨는 고양이 대처 가이드 | 펫지기",
    metaDescription: "보호소 출신 고양이 입양 후 적응 방법. 숨기 행동의 정상 범위, 강제 접촉이 역효과인 이유, 3-3-3 규칙, 단계별 신뢰 쌓는 방법을 정리했습니다.",
    body: `<p>보호소에서 입양한 고양이가 집에 와서 일주일 동안 침대 밑에서 나오지 않는다. 보호자는 걱정하지만, 이것은 완전히 정상이다.</p>

<h2>숨기 행동 — 정상 범위</h2>
<p>고양이는 새로운 환경을 위협으로 인식한다. 숨는 것은 포식자를 피하는 본능적 반응이다. 보호소 생활 기간이 길수록, 이전 경험이 나쁠수록 적응 기간은 길어진다.</p>

<h2>3-3-3 규칙</h2>
<ul>
<li>처음 <strong>3일</strong>: 완전히 숨어서 이동하지 않음, 먹지 않을 수 있음</li>
<li>처음 <strong>3주</strong>: 환경 탐색 시작, 야간에 나올 수 있음</li>
<li>처음 <strong>3개월</strong>: 진짜 성격이 드러나기 시작</li>
</ul>

<h2>강제 접촉을 피해야 하는 이유</h2>
<div class="callout-cat">
<strong>절대 하지 말아야 할 행동</strong><br>
• 숨은 곳에서 강제로 꺼내기<br>
• 따라다니며 쓰다듬으려 하기<br>
• 빠른 동작과 큰 소리<br>
• 다른 동물 즉시 대면<br>
▶ 강제 접촉은 신뢰 형성에 수개월을 더 추가할 수 있다
</div>

<h2>단계별 신뢰 쌓기</h2>
<ul>
<li><strong>1단계 (1~7일)</strong>: 조용하고 작은 공간 하나에서 시작, 먹이·물·화장실 접근 가능하게</li>
<li><strong>2단계 (1~3주)</strong>: 같은 공간에 조용히 있기, 시선 맞추지 않기, 낮은 자세 유지</li>
<li><strong>3단계</strong>: 고양이가 먼저 다가올 때 반응, 간식으로 거리 좁히기</li>
<li><strong>4단계</strong>: 손 냄새 맡기 허용 → 가볍게 턱 아래 쓰다듬기</li>
</ul>

<h2>병원 방문은 언제?</h2>
<p>숨기만 하더라도 72시간 이상 완전히 아무것도 먹지 않거나, 눈·코 분비물, 기침, 재채기, 무기력이 동반되면 수의사 방문이 필요하다.</p>

<h2>마지막으로</h2>
<p>보호소 출신 고양이는 시간이 필요할 뿐, 문제가 있는 것이 아니다. 기다림이 신뢰가 되고, 신뢰가 유대가 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국고양이보호협회 보호소 출신 고양이 입양 안내 자료",
      "Ellis, S.L.H. — The influence of the environment on mental wellbeing of cats. J Feline Med Surg 2009",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-11T09:00:00.000Z",
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
  console.log("블로그 포스트 107차 시딩 완료! (blog-656 ~ blog-660)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
