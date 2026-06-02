import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 49 — cat1×2 + cat3×1 + cat4×1 + cat5×1 = 5편 (IDs 366-370)
// Macros: F, B, E, A, F
// Angles: RA4, RA1, RA6, RA3, RA5

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 366 / Cat1 / Macro-F(절차) / Lens-L4 / Hook-H1 / Outro-O2 / Angle-RA4
  {
    id: "blog-366",
    slug: "adult-cat-adoption-guide",
    type: "blog",
    category: 1,
    title: "성묘 입양의 모든 것 — 새끼 고양이보다 쉬운 이유",
    subtitle: "성격을 알고 입양하는 장점, 보호소 성묘의 현실, 처음 2주 적응 관리",
    metaTitle: "성묘 입양 가이드 — 장점·적응 관리 완전 정리 | 펫지기",
    metaDescription: "성묘 입양은 새끼 고양이보다 많은 장점이 있습니다. 성격을 알고 입양하는 이점, 보호소 성묘의 현실, 처음 2주 적응 방법을 정리했습니다.",
    body: `<p>고양이를 처음 키우려는 사람이 새끼 고양이(키튼)에 먼저 눈이 가는 것은 자연스럽다. 그러나 성묘 입양이 많은 경우에 더 나은 선택일 수 있다.</p>

<h2>성묘 입양의 실질적 장점</h2>
<ul>
<li><strong>성격 확인 가능</strong>: 1~7세 성묘는 기질이 이미 확립됐다. 활발한지, 조용한지, 사람을 잘 따르는지 입양 전에 파악 가능.</li>
<li><strong>배변 훈련 완성</strong>: 새끼 때부터 화장실 교육이 된 경우가 많다.</li>
<li><strong>집 파괴 시기 지남</strong>: 키튼은 물어뜯고 할퀴는 탐색기를 거친다. 성묘는 그 시기를 지났다.</li>
<li><strong>수면 시간이 길다</strong>: 키튼보다 에너지가 안정적이어서 바쁜 보호자에게 맞다.</li>
</ul>

<h2>보호소 성묘의 현실</h2>
<p>보호소의 성묘는 대부분 두 가지 사연 중 하나다. 보호자의 이사·알레르기·출산·사망으로 버려졌거나, 길에서 구조됐거나. 성묘가 보호소에 있는 이유는 문제가 있어서가 아니다.</p>

<p>보호소에서의 모습은 집에서의 모습과 다를 수 있다. 불안해서 숨어있거나, 과도하게 경계하는 것이 실제 성격이 아닌 경우가 많다.</p>

<h2>처음 2주 — 조용히 기다리기</h2>
<ol>
<li>격리 방 제공 — 작은 공간에서 먼저 익숙해지게</li>
<li>먹이와 물, 화장실을 같은 위치에 유지</li>
<li>강아지·다른 고양이와의 접촉은 2주 후부터</li>
<li>강제로 안거나 만지지 않음 — 스스로 나올 때까지 기다림</li>
<li>매일 같은 시간에 밥을 주어 루틴 형성</li>
</ol>

<div class="callout-cat">
<strong>이런 성묘에게 특히 좋은 환경</strong><br>
• 조용한 1~2인 가구<br>
• 아이나 다른 반려동물이 없는 집<br>
• 규칙적인 루틴을 유지할 수 있는 보호자<br>
• 기다려줄 인내심이 있는 사람
</div>

<h2>마지막으로</h2>
<p>성묘는 새끼 고양이처럼 금세 달려오지 않을 수 있다. 그러나 한 번 신뢰가 쌓이면 그 유대감은 더 깊다. 기다려줄 준비가 됐다면 성묘 입양은 훌륭한 선택이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Humane Society — Adult Cat Adoption",
      "International Cat Care — Adopting an Adult Cat",
      "한국고양이보호협회 성묘 책임 입양 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-17T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 367 / Cat1 / Macro-B(비교) / Lens-L1 / Hook-H2 / Outro-O1 / Angle-RA1
  {
    id: "blog-367",
    slug: "rescue-animal-first-week",
    type: "blog",
    category: 1,
    title: "구조 동물 첫 주 — 학대·방치 이력이 있는 동물의 적응 특수성",
    subtitle: "트라우마 반응 이해, 두려움과 공격성의 원인, 절대 하면 안 되는 것, 신뢰 쌓는 접근법",
    metaTitle: "구조 동물 적응 — 트라우마 있는 동물 첫 주 관리 가이드 | 펫지기",
    metaDescription: "학대·방치 이력이 있는 구조 동물은 일반 입양과 다른 접근이 필요합니다. 트라우마 반응 이해, 두려움과 공격성 원인, 신뢰 쌓는 방법을 정리했습니다.",
    body: `<p>구조 동물은 일반 보호소 개·고양이와도 다르다. 학대·방치·극심한 공포를 경험한 동물의 뇌는 그 기억을 갖고 새 집에 온다. 일반적인 '처음 만나는 반려동물' 지침보다 더 세심한 접근이 필요하다.</p>

<h2>트라우마 동물의 반응 이해</h2>
<p>트라우마 동물은 아무 이유 없이 겁먹거나 공격하는 것처럼 보인다. 그러나 그 반응에는 이유가 있다. 사람의 특정 동작(손을 들거나 다가오는 것), 냄새, 소리가 과거의 위협 경험을 촉발한다.</p>

<ul>
<li><strong>얼어붙는 반응(Freeze)</strong>: 움직이지 않고 굳어있음 — 극심한 공포 상태</li>
<li><strong>도망치는 반응(Flight)</strong>: 숨기, 도주</li>
<li><strong>싸우는 반응(Fight)</strong>: 으르렁거림, 물기 시도</li>
</ul>

<h2>절대 하면 안 되는 것</h2>
<div class="callout-dog">
<strong>트라우마 동물에게 금지</strong><br>
• 강제로 다가가기<br>
• 눈을 직접 오래 바라보기 (위협 신호로 받아들임)<br>
• 위에서 내려다보며 손 내밀기<br>
• 크고 갑작스러운 동작·소리<br>
• 처음 몇 주에 낯선 사람 방문시키기<br>
• 훈련 도구로 처벌적 방법 사용
</div>

<h2>신뢰를 쌓는 접근법</h2>
<ol>
<li><strong>공간 주기</strong>: 동물이 먼저 다가올 때까지 기다린다. 절대 먼저 쫓아가지 않는다.</li>
<li><strong>낮은 자세</strong>: 앉거나 옆으로 누워 작게 보이게 한다. 시선을 피하고 옆을 바라본다.</li>
<li><strong>음식으로 연결</strong>: 같은 공간에서 밥을 주며 존재를 익숙하게 한다.</li>
<li><strong>목소리</strong>: 차분하고 부드러운 목소리로 일상적인 이야기를 한다 — 내용보다 톤이 중요.</li>
<li><strong>자발적 접촉 기다리기</strong>: 처음 코를 건드리거나 다가올 때 보상.</li>
</ol>

<h2>현실적인 기대치</h2>
<p>구조 동물의 신뢰 회복에는 수개월에서 수년이 걸릴 수 있다. 어떤 동물은 평생 안고 자는 것을 허락하지 않을 수 있다. 이것은 실패가 아니라 그 동물이 제공할 수 있는 것의 한계다. 그 안에서 찾을 수 있는 유대감이 있다.</p>

<h2>마지막으로</h2>
<p>구조 동물은 기다려줄 사람이 있을 때 피어난다. 당신이 그 사람이 될 수 있다면, 세상에서 가장 보람있는 관계 중 하나가 될 것이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "McMillan, F.D. — Psychological Trauma in Animals: Its Nature, Consequences, and Treatment",
      "ASPCA — Helping Traumatized Animals Adjust",
      "한국동물보호연합 구조 동물 입양 후 관리 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-17T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 368 / Cat3 / Macro-E(비교) / Lens-L6 / Hook-H3 / Outro-O3 / Angle-RA6
  {
    id: "blog-368",
    slug: "dog-seizure-emergency-guide",
    type: "blog",
    category: 3,
    title: "강아지 발작 — 처음 목격했을 때 보호자가 해야 할 것",
    subtitle: "발작 유형 구분, 발작 중 절대 하면 안 되는 것, 클러스터 발작 응급 상황, 동물병원 이후 관리",
    metaTitle: "강아지 발작 응급처치 — 발작 중 해야 할 것·하면 안 될 것 | 펫지기",
    metaDescription: "강아지 발작을 처음 목격했을 때 어떻게 해야 하는지 정리했습니다. 발작 유형 구분, 발작 중 금지 행동, 클러스터 발작 응급 상황, 동물병원 방문 후 관리.",
    body: `<p>강아지가 갑자기 쓰러져 경련을 일으킨다면 보호자는 패닉 상태가 된다. 침착하게 몇 가지를 기억하고 있으면 이 상황에서 강아지를 도울 수 있다.</p>

<h2>발작의 종류</h2>
<ul>
<li><strong>대발작(Tonic-Clonic)</strong>: 가장 흔한 형태. 쓰러짐, 전신 근육 강직·경련, 의식 소실.</li>
<li><strong>부분 발작</strong>: 몸의 일부만 경련. 얼굴 씰룩거림, 반복적 깨무는 동작.</li>
<li><strong>클러스터 발작</strong>: 24시간 내 2회 이상 발작. 응급 상황.</li>
<li><strong>발작 지속증(Status Epilepticus)</strong>: 5분 이상 지속. 즉시 응급실.</li>
</ul>

<h2>발작 중 보호자가 할 것</h2>
<ol>
<li><strong>시간을 잰다</strong>: 발작 시작 시간을 기록한다. 5분이 넘으면 응급 상황.</li>
<li><strong>주변 위험 제거</strong>: 가구 모서리·계단에서 멀리. 쿠션으로 머리를 보호.</li>
<li><strong>조용하게 있는다</strong>: 큰 소리나 밝은 빛이 발작을 악화시킬 수 있다.</li>
<li><strong>영상 촬영</strong>: 가능하면 촬영해 수의사에게 보여준다. 발작 형태 진단에 매우 유용.</li>
</ol>

<h2>절대 하면 안 되는 것</h2>
<div class="callout-dog">
<strong>발작 중 금지 행동</strong><br>
• 입에 손·물건 넣기 — 강아지는 발작 중 혀를 삼키지 않는다. 물릴 위험.<br>
• 몸을 꽉 붙잡거나 누르기 — 근육 손상 위험<br>
• 물 먹이려 하기 — 기도 흡인 위험<br>
• 혼자 두고 자리 비우기
</div>

<h2>발작 후 관리</h2>
<p>발작 직후 강아지는 방향 감각이 없고 일시적으로 시력이 저하된다(발작 후 기간). 안전한 공간에서 안정을 취하게 한다. 이 시기에 심하게 흥분하거나 물기도 한다 — 자신을 지키기 위한 방어 반응이다.</p>

<h2>병원 방문 후 진단</h2>
<p>처음 발작이면 즉시 병원 방문이 필요하다. 원인 파악을 위해 혈액검사·혈당·전해질 검사를 진행한다. 뇌종양·뇌염이 의심되면 MRI가 필요할 수 있다.</p>

<p>특발성 간질(원인 불명)이 가장 흔하며, 항경련제(페노바르비탈 등)로 장기 관리한다.</p>

<h2>마지막으로</h2>
<p>발작은 보는 것만으로도 충격적이다. 그러나 대부분의 발작은 1~2분 내에 저절로 멈춘다. 5분이 넘으면 응급, 그 이하는 발작이 끝난 뒤 수의사에게 연락해 지시를 받는 것이 원칙이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "IVETF (International Veterinary Epilepsy Task Force) — Canine Epilepsy Guidelines 2015",
      "Bhatti, S.F.M. et al. — International veterinary epilepsy task force consensus proposals. BMC Vet Res 2015",
      "대한수의신경학회 간질·발작 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 발작 발생 시 즉시 동물병원에 연락하세요.",
    status: "published",
    publishedAt: "2026-07-18T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 369 / Cat4 / Macro-A(원인분석) / Lens-L3 / Hook-H5 / Outro-O2 / Angle-RA3
  {
    id: "blog-369",
    slug: "pet-damage-neighbor-dispute",
    type: "blog",
    category: 4,
    title: "반려동물이 이웃에게 피해를 줬을 때 — 물림 사고·재산 피해 법적 처리",
    subtitle: "개 물림 사고 민형사 책임, 피해 보상 범위, 동물 점유자 배상 책임법, 피해자 대응 절차",
    metaTitle: "반려동물 이웃 피해 분쟁 — 물림 사고·재산 피해 법적 처리 | 펫지기",
    metaDescription: "반려동물이 이웃에게 피해를 줬을 때 법적 처리 방법. 개 물림 사고 민형사 책임, 배상 범위, 동물 점유자 책임, 피해자 대응 절차를 정리했습니다.",
    body: `<p>반려동물이 이웃이나 제3자에게 피해를 주는 상황이 발생했을 때, 보호자로서의 법적 책임과 절차를 알아야 한다.</p>

<h2>동물 점유자의 민사 책임</h2>
<p>민법 제759조에 따르면 동물 점유자는 동물이 타인에게 가한 손해를 배상할 책임이 있다. 단, 점유자가 동물의 종류·성질에 따라 통상의 주의를 기울였다면 책임을 면할 수 있다. 그러나 이 면책 입증은 점유자가 해야 하므로 실질적으로 쉽지 않다.</p>

<h2>개 물림 사고 — 형사 책임</h2>
<p>개 물림으로 상해가 발생하면:</p>
<ul>
<li><strong>형법 제266조 (과실치상)</strong>: 2년 이하 금고 또는 500만 원 이하 벌금</li>
<li><strong>목줄 미착용 등 동물보호법 위반</strong>: 별도 과태료</li>
<li><strong>맹견 미신고·안전관리 위반</strong>: 500만 원 이하 과태료</li>
</ul>

<div class="callout-cat">
<strong>맹견 특별 관리 의무 (동물보호법)</strong><br>
• 도사견·아메리카핏불테리어·아메리카스태퍼드셔테리어·스태퍼드셔불테리어·로트와일러 및 그 혼합종<br>
• 외출 시 입마개 착용 의무<br>
• 맹견 보험 가입 의무<br>
• 위반 시 형사처벌 가능
</div>

<h2>피해 배상 범위</h2>
<ul>
<li>치료비·후유증 관련 의료비</li>
<li>입원·통원 교통비</li>
<li>치료 기간 중 일실 수입 (일 못 한 손해)</li>
<li>정신적 피해에 대한 위자료</li>
<li>재산 피해(옷·가방 등)는 수리·교체 비용</li>
</ul>

<h2>보호자 측이 취할 조치</h2>
<ol>
<li>즉시 피해자에게 사과하고 응급 처치 지원</li>
<li>동물병원·병원 영수증 보존</li>
<li>사고 상황·증거 사진 확보</li>
<li>펫보험의 배상책임 특약 확인</li>
<li>합의 시 합의서 작성 (재발 청구 차단)</li>
</ol>

<h2>펫보험 배상책임 특약</h2>
<p>일부 펫보험 상품에는 반려동물로 인한 타인 피해에 대한 배상책임 특약이 포함된다. 가입 시 이 특약이 있는지 확인하고, 사고 발생 시 즉시 보험사에 신고해야 한다.</p>

<h2>마지막으로</h2>
<p>가장 좋은 대처는 사고 예방이다. 외출 시 목줄 착용, 사람·동물 많은 곳에서 통제 능력 유지, 맹견은 입마개 착용이 기본이다. 사고가 났다면 즉각적이고 성실한 대응이 이후 분쟁을 최소화한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "민법 제759조 (동물 점유자의 책임)",
      "동물보호법 제21조 (맹견의 관리)",
      "한국소비자원 반려동물 물림 사고 피해 구제 사례 2024",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 법적 분쟁은 전문가에게 문의하세요.",
    status: "published",
    publishedAt: "2026-07-18T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 370 / Cat5 / Macro-F(절차) / Lens-L5 / Hook-H4 / Outro-O3 / Angle-RA5
  {
    id: "blog-370",
    slug: "cat-biting-scratching-correction",
    type: "blog",
    category: 5,
    title: "고양이가 물고 할퀴는 행동 교정 — 공격이 아닌 의사소통임을 이해하기",
    subtitle: "물기·할퀴기의 원인 유형, 놀이 공격성 vs 진짜 공격성 구분, 단계별 교정 방법",
    metaTitle: "고양이 물기·할퀴기 교정 — 원인 이해와 단계별 방법 | 펫지기",
    metaDescription: "고양이 물기와 할퀴기의 원인 유형. 놀이 공격성과 진짜 공격성 구분, 통증 반응, 과자극, 단계별 교정 방법을 정리했습니다.",
    body: `<p>고양이가 쓰다듬는 손을 갑자기 물거나, 놀다가 할퀸다. 나쁜 고양이여서가 아니다. 고양이는 다양한 이유로 물거나 할퀸다 — 그것이 의사소통의 방식이다.</p>

<h2>원인 유형 구분</h2>
<h3>놀이 공격성 (가장 흔함)</h3>
<p>특히 어린 고양이에게 흔하다. 보호자의 손·발을 사냥감으로 인식한다. 예방이 치료다 — 처음부터 손을 사냥 대상으로 만들지 않는 것이 핵심이다.</p>

<h3>과자극(Overstimulation)</h3>
<p>쓰다듬는 것을 즐기다가 어느 순간 갑자기 무는 행동이다. '쓰담 쓰담 공격'이라고도 한다. 고양이가 느끼는 자극이 쾌락에서 불쾌로 바뀌는 임계점이 있다. 신호를 읽고 먼저 멈추는 것이 예방이다.</p>

<div class="callout-cat">
<strong>과자극 전조 신호</strong><br>
• 꼬리가 빠르게 좌우로 움직임<br>
• 귀가 납작해짐<br>
• 피부가 물결치듯 씰룩거림<br>
• 시선이 손을 응시함<br>
→ 이 신호가 보이면 즉시 쓰다듬기를 멈춘다
</div>

<h3>통증·불쾌 반응</h3>
<p>특정 부위를 만질 때만 무는 경우 통증이 있을 수 있다. 수의사 검진이 필요하다.</p>

<h3>두려움 공격성</html:p>
<p>낯선 사람이나 상황에서 도망치지 못해 공격하는 경우. 억압보다 회피 공간 제공이 먼저다.</p>

<h2>교정 방법</h2>
<h3>놀이 공격성</h3>
<ol>
<li>손·발을 절대 사냥 대상으로 사용하지 않는다</li>
<li>낚싯대·마우스 장난감으로 사냥 충동을 충족시킨다</li>
<li>물거나 할퀴면 즉시 놀이를 중단하고 자리를 뜬다 (놀이 = 끝이라는 학습)</li>
<li>소리를 지르거나 밀치지 않는다 — 흥분을 강화할 수 있다</li>
</ol>

<h3>과자극</h3>
<p>고양이의 전조 신호를 파악하고 먼저 멈추는 것이 교정이다. 신호가 오면 박수 한 번 치고 손을 빼는 방식으로 고양이가 '과자극 전조 = 쓰다듬기 끝'을 학습하게 한다.</p>

<h2>절대 하면 안 되는 것</h2>
<ul>
<li>물거나 할퀸 것에 대한 신체 처벌 — 더 심한 공격성으로 이어질 수 있음</li>
<li>계속 쓰다듬으며 "그러면 안 돼"라고 말하기 — 학습이 되지 않음</li>
<li>물음 직후 간식으로 달래기 — 물기가 강화됨</li>
</ul>

<h2>마지막으로</h2>
<p>고양이의 물기·할퀴기는 대부분 보호자와의 상호작용 방식에서 출발한다. 고양이의 신호를 읽고, 충분한 사냥 놀이를 제공하고, 과자극 전에 멈추는 것만으로도 대부분의 문제는 해결된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bradshaw, J.W.S. — Cat Sense: How the New Feline Science Can Make You a Better Friend to Your Pet",
      "Seksel, K. — Training Your Cat. CSIRO Publishing 2001",
      "한국반려동물행동상담협회 고양이 공격성 행동 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-19T09:00:00.000Z",
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
  console.log("블로그 포스트 49차 시딩 완료! (blog-366 ~ blog-370)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
