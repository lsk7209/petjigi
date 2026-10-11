import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 51 — cat1×2 + cat4×1 + cat5×1 + cat2×1 = 5편 (IDs 376-380)
// Macros: B, F, A, E, F
// Angles: RA3, RA6, RA2, RA5, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 376 / Cat1 / Macro-B(비교) / Lens-L3 / Hook-H2 / Outro-O1 / Angle-RA3
  {
    id: "blog-376",
    slug: "small-breed-dog-ownership-guide",
    type: "blog",
    category: 1,
    title: "소형견 키울 때 알아야 할 것 — 작다고 쉽지 않다",
    subtitle: "소형견 특유 건강 문제, 행동 문제 발생 원인, '작은 개 증후군' 예방, 훈련 필수성",
    metaTitle: "소형견 키우는 법 — 건강 문제·행동 문제·훈련 가이드 | 펫지기",
    metaDescription: "소형견은 작다고 쉽지 않습니다. 소형견 특유 건강 문제(슬개골·치아), 작은 개 증후군 원인과 예방, 훈련이 필요한 이유를 정리했습니다.",
    body: `<p>소형견은 아파트에서도 키울 수 있고, 안고 다닐 수 있고, 사료비가 적게 든다. 그러나 "작으니까 쉽겠지"라는 생각은 많은 문제를 낳는다.</p>

<h2>소형견 특유 건강 문제</h2>
<h3>슬개골 탈구</h3>
<p>소형견에서 가장 흔한 정형외과 질환이다. 무릎 슬개골이 제자리를 이탈한다. 특히 말티즈·포메라니안·치와와·토이푸들·시추에서 발생률이 높다. 체중 관리와 높은 곳에서 점프 제한이 예방에 도움이 된다.</p>

<h3>치주 질환</h3>
<p>소형견은 치아가 밀집되어 있어 치주 질환 발생률이 매우 높다. 이른 시기부터 칫솔질 훈련이 필수다.</p>

<h3>기관 허탈 (Tracheal Collapse)</h3>
<p>기관(气管) 연골이 약해져 호흡 시 기침·기절·호흡 곤란이 생기는 질환. 특히 포메라니안·요크셔테리어·치와와에서 흔하다. 목줄보다 가슴줄(하네스)을 사용하는 것이 기관 압박을 줄인다.</p>

<h3>저혈당</h3>
<p>초소형견(3kg 미만)은 혈당 조절 능력이 낮아 공복 또는 스트레스 상황에서 저혈당이 올 수 있다. 규칙적인 급식·간식이 중요하다.</p>

<h2>'작은 개 증후군(Small Dog Syndrome)'이란</h2>
<p>소형견이 짖음·공격성·분리불안 등의 행동 문제를 더 많이 보이는 경향이 있다. 이것은 소형견의 본능이 아니라 보호자의 훈련 방식 차이에서 비롯된다.</p>

<ul>
<li>작아서 위험하지 않다는 이유로 규칙을 느슨하게 적용</li>
<li>모든 것을 안아 올려 스스로 탐색·학습할 기회 박탈</li>
<li>짖어도 귀여워서 넘어가는 일관성 없는 반응</li>
</ul>

<h2>소형견도 훈련이 필요하다</h2>
<div class="callout-dog">
<strong>소형견에게 특히 중요한 훈련</strong><br>
• 혼자 있기 (분리불안 예방)<br>
• 낯선 사람·개 만나기 (과도한 짖음 예방)<br>
• 과도한 짖음 교정<br>
• 발·귀·입 만지기 허용 (의료 처치 대비)
</div>

<h2>마지막으로</h2>
<p>소형견은 큰 사랑을 주지만, 작다는 이유로 규칙을 달리 적용하면 안 된다. 크기와 상관없이 일관된 훈련과 사회화가 행복한 동거의 기반이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Gough, A. et al. — Breed Predispositions to Disease in Dogs and Cats",
      "Horwitz, D. & Mills, D. — BSAVA Manual of Canine and Feline Behavioural Medicine",
      "한국수의사회 소형견 특이 질환 임상 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-22T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 377 / Cat1 / Macro-F(절차) / Lens-L6 / Hook-H1 / Outro-O3 / Angle-RA6
  {
    id: "blog-377",
    slug: "indoor-vs-outdoor-cat-debate",
    type: "blog",
    category: 1,
    title: "실내 고양이 vs 실외 고양이 — 어떤 선택이 고양이에게 더 좋은가",
    subtitle: "수명·질병·사고 통계 비교, 실내 고양이 삶의 질 높이는 방법, 국내 법적 상황",
    metaTitle: "실내 고양이 vs 실외 고양이 — 어떤 선택이 더 좋은가? | 펫지기",
    metaDescription: "실내 고양이와 실외 고양이의 수명·질병·사고 통계 비교. 실내 고양이 삶의 질 높이는 방법과 국내 법적 상황을 정리했습니다.",
    body: `<p>고양이가 밖에 나가고 싶어 하는 것 같아 보이는데 가두는 것이 잔인한 건 아닐까 — 많은 보호자가 가지는 고민이다.</p>

<h2>데이터로 보는 수명 차이</h2>
<p>일반적으로 알려진 경향은 다음과 같다:</p>
<ul>
<li><strong>실외·자유방목 고양이</strong>: 사고·감염·싸움 등 위험이 커 수명이 짧아지는 경향</li>
<li><strong>실내 전용 고양이</strong>: 상대적으로 더 오래 사는 경향</li>
</ul>
<p>이 차이는 교통사고·포식자·전염병·독성물질·싸움 부상 등 실외 위험 요인 때문이다.</p>

<h2>실외 고양이의 위험 요인</h2>
<ul>
<li>교통사고 (차량)</li>
<li>다른 고양이와 싸움 → FIV(고양이 면역결핍 바이러스) 감염</li>
<li>독성 식물·제초제·쥐약 섭취</li>
<li>포식자(떠돌이 개, 맹금류)</li>
<li>악의적인 사람에 의한 위해</li>
</ul>

<h2>실내 고양이의 삶의 질 높이기</h2>
<p>"밖에 못 나가면 불행하다"는 것은 오해다. 충분한 환경 풍요화가 있다면 실내 고양이는 행복할 수 있다.</p>

<div class="callout-cat">
<strong>실내 고양이 삶의 질 체크리스트</strong><br>
□ 캣타워·수직 공간<br>
□ 창문 뷰 (새·나무 관찰)<br>
□ 하루 2회 사냥 놀이<br>
□ 스크래처 (여러 종류)<br>
□ 숨는 공간<br>
□ 2마리 이상 동거 (가능하면)
</div>

<h2>절충안 — 통제된 실외 경험</h2>
<ul>
<li><strong>하네스 산책</strong>: 목줄 아닌 가슴줄로 천천히 익숙해지면 가능</li>
<li><strong>캐티오(Catio)</strong>: 베란다·정원에 그물망으로 안전한 실외 공간 조성</li>
<li><strong>차 없는 마당</strong>: 펜스가 완전한 주택이라면 제한적 실외 허용 가능</li>
</ul>

<h2>국내 법적 상황</h2>
<p>한국에서 반려고양이를 야외에 방목하는 것을 금지하는 법령은 없다. 다만 동물보호법상 적절한 보호 의무가 있으므로 교통사고·사고로 이어진다면 관리 책임이 논의될 수 있다. 아파트 거주 시 자유 방목은 사실상 불가능하다.</p>

<h2>마지막으로</h2>
<p>실내에서 키우는 것이 잔인한 것이 아니다. 고양이의 안전과 수명을 위한 책임 있는 선택이다. 환경을 충분히 풍요롭게 만들어주면 고양이는 실내에서도 충분히 행복한 삶을 산다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Veterinary Medical Association — Outdoor Cat Policy Statement",
      "International Cat Care — Keeping Cats Safe: Indoor vs Outdoor",
      "한국고양이보호협회 실내 사육 권장 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-22T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 378 / Cat4 / Macro-A(원인분석) / Lens-L2 / Hook-H4 / Outro-O2 / Angle-RA2
  {
    id: "blog-378",
    slug: "pet-will-care-plan-guide",
    type: "blog",
    category: 4,
    title: "내가 먼저 세상을 떠난다면 — 반려동물 위탁 계획 세우기",
    subtitle: "반려동물 위탁 계획의 필요성, 유언장에 포함하는 방법, 신탁·후견인 지정, 대안 단체",
    metaTitle: "반려동물 위탁 계획 가이드 — 유언장·신탁·후견인 지정 | 펫지기",
    metaDescription: "반려동물 보호자가 먼저 세상을 떠났을 때를 대비한 위탁 계획. 유언장에 반려동물 포함하는 방법, 신탁 활용, 후견인 지정 방법을 정리했습니다.",
    body: `<p>나보다 먼저 반려동물이 떠날 것이라고 생각하기 쉽다. 그러나 사고·갑작스러운 질병으로 보호자가 먼저 떠나는 경우도 있다. 이 상황에서 반려동물은 어떻게 되는가 — 미리 준비하는 것이 사랑의 책임이다.</p>

<h2>준비하지 않으면 어떻게 되나</h2>
<p>보호자 사망 후 반려동물을 맡을 사람이 없으면 유기되거나 보호소로 가는 경우가 많다. 가족이 있어도 반려동물을 싫어하거나 알레르기가 있는 경우 방치될 수 있다.</p>

<h2>반려동물 위탁 계획의 3가지 방법</h2>
<h3>1. 신뢰할 수 있는 후견인 지정</h3>
<p>반려동물을 맡아줄 사람을 사전에 지정하고, 그 사람과 명시적으로 합의한다. 구두 약속보다 문서화가 안전하다. 후보 1인 + 대안 1인을 지정해둔다.</p>

<h3>2. 유언장에 반려동물 조항 포함</h3>
<p>한국 법률에서는 반려동물은 재산(동산)으로 분류된다. 유언장에 특정 반려동물을 특정인에게 '유증(유언으로 증여)'하고, 돌봄 비용을 위한 재정 지원을 포함할 수 있다.</p>

<h3>3. 반려동물 신탁</h3>
<p>일부 국가에서 활성화되어 있으며, 한국에서도 신탁법을 활용한 반려동물 신탁이 가능하다. 반려동물 돌봄 비용을 신탁에 맡기고, 지정 수탁자가 후견인에게 지급하는 방식이다.</p>

<h2>위탁 정보 카드 작성</h2>
<div class="callout-cat">
<strong>반려동물 위탁 정보 카드 내용</strong><br>
• 동물 이름·종·나이·성별·중성화 여부<br>
• 동물등록번호·마이크로칩 번호<br>
• 현재 먹이는 사료·급식량<br>
• 복용 중인 약·의료 기록<br>
• 주치 수의사 연락처<br>
• 특이사항 (두려운 것·좋아하는 것)<br>
• 후견인 이름·연락처
</div>
<p>이 카드를 지갑이나 신분증 뒤에 보관하고, 가족에게 위치를 알려두는 것이 좋다.</p>

<h2>장기 입원·병원 시</h2>
<p>갑작스러운 입원 시에도 반려동물 돌봄이 필요하다. 임시 돌봄을 부탁할 사람을 미리 확인해두고, 돌봄 정보를 공유해두는 것이 중요하다.</p>

<h2>마지막으로</h2>
<p>반려동물 위탁 계획은 죽음을 생각하는 암울한 일이 아니다. 사랑하는 존재를 끝까지 책임지는 방법이다. 오늘 당장 후견인 한 명과 대화를 시작하는 것부터가 충분하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "신탁법 제2조 (신탁의 정의)",
      "동물보호법 제2조 (동물의 법적 지위)",
      "한국반려동물법학회 반려동물 위탁 법적 가이드 2024",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 법적 준비는 변호사 또는 신탁 전문가와 상담하세요.",
    status: "published",
    publishedAt: "2026-07-23T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 379 / Cat5 / Macro-E(비교) / Lens-L5 / Hook-H3 / Outro-O3 / Angle-RA5
  {
    id: "blog-379",
    slug: "dog-sleeping-with-owner-guide",
    type: "blog",
    category: 5,
    title: "강아지와 같이 자도 되나 — 찬반 논쟁을 데이터로 정리",
    subtitle: "수면 방해·위생·행동 문제 우려 vs 유대감·안정감 연구, 같이 자는 사람들의 실제 경험",
    metaTitle: "강아지와 같이 자기 — 찬반 데이터와 실제 가이드 | 펫지기",
    metaDescription: "강아지와 같은 침대에서 자도 되는지 찬반 데이터로 정리했습니다. 수면 방해, 위생 우려, 유대감 연구, 행동 문제 연관성을 정리했습니다.",
    body: `<p>강아지와 함께 침대에서 자는 보호자가 많다. 수의사·트레이너마다 의견이 다르다. 데이터와 맥락을 함께 보자.</p>

<h2>함께 자는 것에 대한 우려</h2>
<h3>수면 방해</h3>
<p>강아지와 함께 자면 강아지의 움직임이나 소리 때문에 수면이 방해받는 사람도 있다. 반면 41%는 수면에 도움이 된다고 했다. 수면 방해 여부는 개체 크기·성격·수면 습관에 따라 크게 다르다.</p>

<h3>위생</h3>
<p>실외를 다니는 강아지는 기생충·세균을 침대로 가져올 수 있다. 규칙적인 기생충 예방·정기 목욕·발 닦기로 위험을 크게 줄일 수 있다. 면역이 약한 사람(영유아·암 환자·면역억제제 복용자)이 있는 경우는 주의가 필요하다.</p>

<h3>행동 문제</h3>
<p>'보호자와 함께 자면 서열 문제가 생긴다'는 이론은 현대 행동 과학에서 지지받지 못한다. 강아지는 서열 개념보다 루틴·규칙·일관성에 반응한다. 함께 자는 것 자체가 행동 문제를 만들지는 않는다.</p>

<h2>함께 자는 것의 긍정적 연구</h2>
<ul>
<li>옥시토신 분비 증가 — 스트레스 감소</li>
<li>외로움 완화 효과 (1인 가구·노인에서 특히)</li>
<li>밤 불안증이 있는 사람에서 안정 효과</li>
<li>반려동물 자체도 보호자와 함께 있을 때 더 안정적인 수면</li>
</ul>

<h2>함께 자면 안 되는 경우</h2>
<div class="callout-dog">
<strong>이런 경우는 별도 수면이 권장됨</strong><br>
• 보호자에게 심각한 수면 장애가 있는 경우<br>
• 면역이 심하게 저하된 가족이 있는 경우<br>
• 강아지가 공격성이 있어 자다가 위협하는 경우<br>
• 강아지 자체의 수면 문제(코골이·잦은 움직임)가 있는 경우
</div>

<h2>규칙을 만드는 것이 핵심</h2>
<p>함께 자기로 했다면 일관된 규칙이 필요하다. '가끔은 올라오고 가끔은 안 된다'가 가장 혼란스럽다. 허용 또는 불허를 일관되게 유지하면 행동 문제가 생기지 않는다.</p>

<h2>마지막으로</h2>
<p>강아지와 함께 자는 것은 개인의 선택이다. 명확한 위해가 없다면 수면 질과 유대감을 기준으로 결정하면 된다. 좋아서 한다면, 충분히 좋은 이유가 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Patel, S.I. et al. — The Effect of Dogs on Human Sleep in the Home Sleep Environment. Mayo Clinic Proceedings 2017",
      "American Kennel Club — Should You Let Your Dog Sleep in Bed With You?",
      "한국반려동물행동상담협회 수면 환경 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-23T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 380 / Cat2 / Macro-F(절차) / Lens-L1 / Hook-H1 / Outro-O2 / Angle-RA1
  {
    id: "blog-380",
    slug: "raw-cooked-kibble-comparison",
    type: "blog",
    category: 2,
    title: "생식·자연식·건식 3가지 완전 비교 — 강아지·고양이에게 어떤 선택이 맞는가",
    subtitle: "각 식이의 영양·위생·비용·편의성 비교, 혼합 급여 전략, 라이프스타일별 추천",
    metaTitle: "강아지·고양이 생식·자연식·건식 비교 — 어떤 선택이 맞는가 | 펫지기",
    metaDescription: "반려동물 생식, 자연식(홈쿡), 건식 사료의 영양, 위생, 비용, 편의성을 비교했습니다. 혼합 급여 전략과 라이프스타일별 추천을 정리했습니다.",
    body: `<p>반려동물 먹거리를 고를 때 생식, 자연식(조리), 건식 사료 중 무엇이 좋은지 고민하는 보호자가 많다. 정답은 하나가 아니다. 각 방식의 장단점을 알고, 안전과 영양 균형을 기준으로 선택하는 것이 중요하다.</p>

<h2>한눈에 비교</h2>
<table>
<thead><tr><th>구분</th><th>생식</th><th>조리 자연식(집밥)</th><th>건식·시판 완전식</th></tr></thead>
<tbody>
<tr><td>위생 위험</td><td>세균 오염 위험이 가장 크다</td><td>충분히 익히면 낮다</td><td>상대적으로 낮다</td></tr>
<tr><td>영양 균형</td><td>직접 맞추기 어렵다</td><td>레시피를 전문가가 설계해야 한다</td><td>완전·균형 표시 제품이면 설계되어 있다</td></tr>
<tr><td>편의성</td><td>낮음</td><td>낮음</td><td>높음</td></tr>
<tr><td>비용·시간</td><td>재료비와 손질 시간이 든다</td><td>재료비와 조리 시간이 든다</td><td>비교적 예측 가능</td></tr>
</tbody>
</table>

<h2>생식에 대한 기관들의 입장</h2>
<ul>
<li>미국수의사회(AVMA)는 날것이나 덜 익힌 동물성 단백질을 개와 고양이에게 주지 말라는 입장이다. 겉보기에 건강한 동물도 병원균을 지니고 사람에게 옮길 수 있기 때문이다.</li>
<li>미국 CDC도 반려동물에게 생식 사료나 간식을 먹이는 것을 권하지 않는다.</li>
<li>FDA는 생식 사료가 다른 유형의 사료보다 병원성 세균에 오염될 가능성이 높다는 조사 결과를 발표했다.</li>
<li>생식 사료는 시판 완제품 중에서도 회수 사례가 상대적으로 많다는 설명이 있다(메르크 수의학 매뉴얼).</li>
<li>뼈를 주는 경우 치아 손상, 위장관 폐색·천공 위험이 있다.</li>
</ul>
<p>소화율이나 건강상 이점을 주장하는 연구도 있지만, 장기적인 위험과 이점을 평가한 연구는 부족하고 품질이 낮은 연구가 많다는 평가가 있다.</p>

<div class="callout-dog">
<strong>생식을 하지 말아야 할 가정</strong><br>
• 영유아, 임산부, 노약자, 면역이 약한 사람이 함께 사는 집<br>
• 면역이 약하거나 장 질환이 있는 반려동물<br>
• 어린 강아지·고양이, 노령 동물
</div>

<h2>선택 기준</h2>
<ol>
<li>안전: 병원균 위험을 줄일 수 있는 방식인가.</li>
<li>영양: 라벨에 "완전 및 균형 영양" 표기가 있거나, 수의 영양 전문가의 레시피인가.</li>
<li>건강 상태: 질환(신장, 췌장염, 알레르기)이 있으면 수의사와 식이를 정한다.</li>
<li>생활 여건: 지속 가능한 방식인가. 중간에 자주 바꾸면 소화에 부담이 된다.</li>
</ol>

<h2>식이를 바꿀 때</h2>
<ul>
<li>7~14일에 걸쳐 새 음식 비율을 서서히 늘린다.</li>
<li>구토·설사, 가려움, 식욕 변화가 있으면 이전 단계로 돌아가고 상담한다.</li>
<li>체중과 배변 상태를 기록한다.</li>
</ul>

<h2>마지막으로</h2>
<p>어느 방식이든 "안전하고 영양이 맞는가"가 기준이다. 생식은 위생 위험이 크므로 권하지 않는 기관이 많고, 집밥은 전문가 레시피가 필요하다. 가장 부담이 적은 선택은 완전·균형 영양을 갖춘 시판 사료를 기본으로 하는 것이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.avma.org/resources-tools/avma-policies/raw-or-undercooked-animal-source-protein-cat-and-dog-diets — AVMA, Raw or undercooked animal-source protein in cat and dog diets",
      "https://www.fda.gov/animal-veterinary/animal-health-literacy/get-facts-raw-pet-food-diets-can-be-dangerous-you-and-your-pet — FDA, Get the Facts! Raw Pet Food Diets can be Dangerous to You and Your Pet",
      "https://www.cdc.gov/healthy-pets/about/pet-food-safety.html — CDC, About Pet Food Safety",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-24T09:00:00.000Z",
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
  console.log("블로그 포스트 51차 시딩 완료! (blog-376 ~ blog-380)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
