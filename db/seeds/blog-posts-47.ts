import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 47 — cat1×2 + cat3×1 + cat4×1 + cat5×1 = 5편 (IDs 356-360)
// Macros: F, B, E, A, F
// Angles: RA3, RA6, RA1, RA5, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 356 / Cat1 / Macro-F(절차) / Lens-L3 / Hook-H1 / Outro-O2 / Angle-RA3
  {
    id: "blog-356",
    slug: "guinea-pig-adoption-guide",
    type: "blog",
    category: 1,
    title: "기니피그 입양 가이드 — 소형 포유류 중 가장 사회적인 반려동물",
    subtitle: "기대 수명 5~7년, 무리 동물로 2마리 이상 권장, 케이지 크기·먹이·의료비 현실",
    metaTitle: "기니피그 입양 완전 가이드 — 수명·먹이·케이지·의료비 | 펫지기",
    metaDescription: "기니피그 입양 전 알아야 할 것. 기대 수명 5~7년, 무리 동물 특성, 비타민C 필수 보충, 케이지 최소 크기, 전문 수의사 필요성을 정리했습니다.",
    body: `<p>기니피그는 조용하고 순해서 아이가 있는 집에서도 인기가 많지만, 작고 조용하다고 해서 키우기 쉬운 동물은 아니다. 식이(비타민 C), 케이지 공간, 동반 사육, 엑조틱 진료의 네 가지를 먼저 확인하자.</p>

<h2>비타민 C는 매일 공급해야 한다</h2>
<p>기니피그는 체내에서 비타민 C를 합성하지 못해 반드시 먹이로 섭취해야 한다. 부족하면 괴혈병(관절 통증, 잇몸 문제, 무기력)이 생길 수 있다. 시판 펠릿에 비타민 C가 첨가되어 있어도 시간이 지나면 분해되므로 신선한 채소를 함께 주는 것이 좋다. 물에 비타민 C를 타는 방법은 쉽게 분해되어 효과가 불확실하다.</p>

<div class="callout-cat">
<strong>하루 식단 구성</strong><br>
• <strong>건초 무제한</strong>: 티모시 같은 풀 건초가 식단의 기본이다. 알팔파 건초는 칼슘이 높아 성체에는 권장되지 않는다<br>
• <strong>신선한 채소</strong>: 파프리카·케일·파슬리 등 비타민 C가 풍부한 채소를 매일 소량씩<br>
• <strong>펠릿</strong>: 기니피그 전용 제품, 정해진 양만<br>
• <strong>과일</strong>: 당분이 높아 간식으로 소량
</div>

<h2>케이지와 사회성</h2>
<ul>
<li><strong>공간</strong>: 가능한 한 넓은 것이 좋다. 바닥이 철망이면 발바닥 염증(족저 피부염)이 생길 수 있어 평평한 바닥에 부드러운 깔개를 쓴다.</li>
<li><strong>은신처</strong>: 몸을 숨길 수 있는 집이나 터널을 반드시 둔다. 숨을 곳이 없으면 스트레스를 받는다.</li>
<li><strong>동반 사육</strong>: 무리 동물이라 혼자 두면 외로워한다. 같은 성별 2마리를 권장하는 경우가 많다. 수컷과 암컷을 섞으면 번식하므로 주의한다.</li>
<li><strong>온도</strong>: 더위에 약하다. 직사광선과 고온다습한 곳을 피한다.</li>
</ul>

<h2>건강 점검 포인트</h2>
<table>
<thead><tr><th>신호</th><th>의심되는 문제</th></tr></thead>
<tbody>
<tr><td>식욕 저하, 침 흘림, 체중 감소</td><td>치아 부정교합·과성장 (앞니·어금니는 평생 자란다)</td></tr>
<tr><td>잔기침, 콧물, 호흡이 거침</td><td>호흡기 감염</td></tr>
<tr><td>변이 안 나옴, 배가 팽창함</td><td>소화관 정체 — 응급일 수 있음</td></tr>
<tr><td>털 빠짐, 가려움, 비듬</td><td>진드기·곰팡이 등 피부 질환</td></tr>
<tr><td>절뚝임, 움직임 저하</td><td>비타민 C 부족, 관절 문제</td></tr>
</tbody>
</table>

<p>토끼·기니피그 같은 초식 소동물은 며칠 먹지 못하면 급격히 나빠질 수 있다. 하루 이상 식욕이 없으면 진료를 받자.</p>

<h2>의료비와 진료 가능 병원</h2>
<p>기니피그는 엑조틱 동물이라 진료하는 병원이 제한적이다. 입양 전에 가까운 곳에 진료 가능한 병원이 있는지, 비용은 어느 정도인지 확인한다. 치과 질환은 반복 치료가 필요할 수 있다.</p>

<h2>마지막으로</h2>
<p>기니피그를 건강하게 키우려면 비타민 C와 건초, 넓은 케이지, 동반 사육, 진료 병원 확인 이 네 가지가 필요하다. 이 준비가 되었다면 오래 함께할 좋은 반려동물이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://healthtopics.vetmed.ucdavis.edu/node/1126 — UC Davis 수의과대학, Guinea Pig Care",
      "https://petfinder.com/other-pets/guinea-pigs/guinea-pig-care-basics — Petfinder, Guinea Pig Care Basics",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-12T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 357 / Cat1 / Macro-B(비교) / Lens-L6 / Hook-H2 / Outro-O3 / Angle-RA6
  {
    id: "blog-357",
    slug: "dog-adoption-vs-purchase-guide",
    type: "blog",
    category: 1,
    title: "강아지 입양 vs 구매 — 보호소·브리더·펫숍의 차이와 책임 있는 선택",
    subtitle: "보호소 입양의 현실, 공장식 번식장 문제, 책임 브리더 구분 방법, 비용과 건강 비교",
    metaTitle: "강아지 입양 vs 구매 비교 — 보호소·브리더·펫숍 가이드 | 펫지기",
    metaDescription: "강아지 보호소 입양, 브리더 구매, 펫숍 구매의 차이와 장단점. 공장식 번식장 문제, 책임 브리더 구분 방법, 비용·건강 비교를 정리했습니다.",
    body: `<p>강아지를 어디서 데려올지는 취향 문제가 아니라 동물 복지, 건강, 비용에 모두 영향을 주는 결정이다. 보호소 입양, 책임 브리더, 펫숍 세 가지 경로의 장단점을 비교했다. 어느 쪽이든 충동적으로 결정하지 않는 것이 가장 중요하다.</p>

<h2>경로별 비교</h2>
<table>
<thead><tr><th>경로</th><th>장점</th><th>단점·주의</th></tr></thead>
<tbody>
<tr><td>보호소·구조단체 입양</td><td>유기동물에게 새 가정 제공, 비용이 낮거나 기본 접종·중성화가 포함되는 경우가 많음, 성견은 성격 확인 가능</td><td>원하는 품종·나이를 바로 구하기 어려움, 과거 이력이 불명확할 수 있음, 적응 기간 필요</td></tr>
<tr><td>책임 브리더</td><td>부모견·환경 확인, 건강검진 이력, 품종 특성 예측</td><td>비용이 높고 대기가 필요, 브리더 검증 필요</td></tr>
<tr><td>펫숍</td><td>접근성이 좋고 바로 데려올 수 있음</td><td>출처(번식장) 확인이 어렵고, 이른 분리·과밀·검사 미비 우려가 있어 신중해야 함</td></tr>
</tbody>
</table>

<h2>보호소 입양 시 점검</h2>
<ul>
<li>입양 상담 시 건강 상태, 접종·중성화 여부, 성격과 다른 동물·아이와의 관계를 질문한다.</li>
<li>입양 후에는 새 환경에 적응하는 시간이 필요하다. 처음 며칠은 조용히 지내게 하고 규칙적인 생활을 만든다.</li>
<li>입양 후 동물등록 절차를 확인한다. 동물등록은 법적 의무다.</li>
</ul>

<h2>책임 브리더를 구분하는 법</h2>
<p>AKC는 책임 있는 브리더의 기준으로 건강검진, 부모견과 새끼의 환경 공개, 입양 후 지원을 꼽는다.</p>

<div class="callout-dog">
<strong>책임 브리더 체크리스트</strong><br>
□ 어미와 새끼가 지내는 환경을 직접 볼 수 있다<br>
□ 품종별 유전 질환 검사 결과를 제시한다<br>
□ 한 마리 어미를 무리하게 반복 번식시키지 않는다<br>
□ 어미와 충분히 함께 지낸 뒤 분양한다 (너무 이른 분리는 문제)<br>
□ 계약서와 건강 기록을 제공한다<br>
□ 입양 후에도 상담을 해 주고, 키울 수 없게 되면 돌려받는 조건이 있다<br>
□ 방문을 거부하거나 선입금부터 요구하지 않는다
</div>

<h2>경계해야 할 신호</h2>
<ul>
<li>인기 품종인데 가격이 지나치게 낮다</li>
<li>직접 방문을 거부하고 사진·영상만 보낸다</li>
<li>어미나 환경을 보여주지 않는다</li>
<li>여러 품종을 한꺼번에 항상 판매한다</li>
<li>선입금을 재촉한다</li>
</ul>

<h2>비용은 초기 비용만 보지 않는다</h2>
<p>보호소 입양은 초기 비용이 낮을 수 있고 브리더나 펫숍은 높을 수 있지만, 키우는 동안의 사료·병원비·보험·미용 등 지속 비용이 훨씬 크다. 입양 경로와 상관없이 전 생애 비용을 계산해 두자.</p>

<h2>마지막으로</h2>
<p>보호소 입양은 훌륭한 선택이고, 특정 품종이 꼭 필요하다면 검증된 브리더를 찾는 것도 방법이다. 어디서 데려오든 평생 책임질 준비가 되었는지가 가장 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.akc.org/expert-advice/dog-breeding/what-is-a-responsible-dog-breeder/ — AKC, What is a responsible dog breeder",
      "https://www.akc.org/expert-advice/dog-breeding/questions-to-ask-your-potential-breeder/ — AKC, Questions to ask your potential breeder",
      "https://www.qld.gov.au/family/family-and-parents/government/pets/dogs-and-cats/responsible-breeder — Queensland Government, Choosing a responsible dog breeder",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-12T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 358 / Cat3 / Macro-E(비교) / Lens-L1 / Hook-H3 / Outro-O2 / Angle-RA1
  {
    id: "blog-358",
    slug: "dog-heartworm-prevention-guide",
    type: "blog",
    category: 3,
    title: "강아지 심장사상충 — 예방이 전부인 이유와 예방약 종류 비교",
    subtitle: "심장사상충 생활사, 감염 경로, 치료의 어려움, 매월 예방약 종류·투여 방법",
    metaTitle: "강아지 심장사상충 예방 완전 가이드 — 예방약 비교 | 펫지기",
    metaDescription: "강아지 심장사상충은 예방이 전부입니다. 모기 통해 감염되는 경로, 치료 어려움, 매월 투여하는 예방약 종류와 투여 방법을 비교했습니다.",
    body: `<p>심장사상충은 이름처럼 심장에 사는 기생충이다. 치료가 어렵고 비용이 크며 위험하다. 매달 예방약을 투여하는 것만으로 거의 완벽히 예방 가능하다.</p>

<h2>감염 경로</h2>
<p>모기가 심장사상충 유충(마이크로필라리아)을 갖고 있는 동물을 물고, 다시 건강한 강아지를 물 때 유충이 전파된다. 이후 유충이 체내에서 이동해 심장·폐동맥에 정착하고 성충으로 자란다. 성충의 길이는 20~30cm에 달하며 5~7년을 산다.</p>

<h2>왜 치료가 어려운가</h2>
<p>성충 구제 약물(멜라소민)은 강아지에게도 상당한 스트레스다. 치료 중 사충(죽은 기생충)이 폐동맥에 색전을 일으킬 수 있어, 치료 기간 동안 극도로 운동을 제한해야 한다. 감염 수가 많을수록 위험이 높다. 비용도 수십만 원에서 수백만 원까지 든다.</p>

<h2>예방약 종류 비교</h2>
<table>
<thead><tr><th>투여 방법</th><th>제품 예시</th><th>특징</th></tr></thead>
<tbody>
<tr><td>경구 (매월)</td><td>밀베마이신·이버멕틴 계열</td><td>복용 편리, 내외부 기생충 동시 예방 제품 있음</td></tr>
<tr><td>피부 점적 (매월)</td><td>레볼루션·스트롱홀드</td><td>피부에 바름, 벼룩·진드기 동시 예방</td></tr>
<tr><td>주사 (6개월 또는 12개월)</td><td>프로하트6·프로하트12</td><td>6~12개월에 1번, 잊어버릴 위험 없음</td></tr>
</tbody>
</table>

<h2>투여 시 주의사항</h2>
<div class="callout-dog">
<strong>콜리 계열 품종 주의</strong><br>
이버멕틴 계열 약물에 민감한 MDR1 유전자 변이가 있을 수 있음<br>
콜리·셰틀랜드 쉽독·보더콜리·오스트레일리안 셰퍼드 등<br>
→ 투여 전 MDR1 유전자 검사 또는 수의사 확인
</div>

<h2>예방 투여 일정</h2>
<p>한국은 모기 활동기가 4~11월이지만, 온난화로 겨울에도 모기가 나타나는 경우가 있다. 연중 매달 투여하는 것이 가장 안전하다. 이미 1개월 이상 투여를 빠뜨렸다면 심장사상충 검사(혈액 항원 검사) 후 예방약을 재개하는 것이 권장된다.</p>

<h2>마지막으로</h2>
<p>심장사상충 예방은 비용 대비 효과가 가장 높은 반려동물 의료 행위 중 하나다. 매달 한 번, 잊지 않는 것이 전부다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "American Heartworm Society — Current Canine Guidelines 2023",
      "Nelson, C.T. et al. — Dirofilaria immitis: heartworm biology and prevalence",
      "대한수의사회 심장사상충 예방 권고 지침",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-13T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 359 / Cat4 / Macro-A(원인분석) / Lens-L5 / Hook-H5 / Outro-O1 / Angle-RA5
  {
    id: "blog-359",
    slug: "vet-medical-dispute-guide",
    type: "blog",
    category: 4,
    title: "동물병원 의료 분쟁 — 불만이 생겼을 때 권리 찾는 방법",
    subtitle: "진료기록 열람·사본 발급 권리, 의료사고 vs 의료 과실 구분, 분쟁 해결 단계별 절차",
    metaTitle: "동물병원 의료 분쟁 대처법 — 진료기록·권리·신고 절차 | 펫지기",
    metaDescription: "동물병원에서 불만이 생겼을 때 권리를 찾는 방법. 진료기록 열람권, 의료사고와 과실 구분, 분쟁 신고 절차를 정리했습니다.",
    body: `<p>동물병원 진료 후 결과에 의문이 생기거나, 설명이 충분하지 않았거나, 비용에 문제가 있다면 어떻게 해야 할까. 보호자에게는 권리가 있다.</p>

<h2>보호자의 기본 권리</h2>
<ul>
<li><strong>진료기록 열람·사본 발급 권리</strong>: 수의사법에 따라 진료기록부 사본을 요청할 수 있다.</li>
<li><strong>설명 들을 권리</strong>: 진단·치료 방법·예상 결과·비용에 대한 충분한 설명을 요청할 수 있다.</li>
<li><strong>동의 철회 권리</strong>: 치료 진행 중 보호자가 동의를 철회하면 중단해야 한다.</li>
<li><strong>영수증·명세서 발급 요청 권리</strong>: 진료비 내역 상세 내역서를 요청할 수 있다.</li>
</ul>

<h2>의료사고 vs 의료 과실</h2>
<p>의료사고: 의료 행위 중 예상치 못한 부정적 결과. 의사가 잘못하지 않아도 발생할 수 있음.</p>
<p>의료 과실: 의료 기준을 지키지 않은 행위로 인한 손해. 법적으로 책임을 물을 수 있는 경우.</p>
<p>이 두 가지를 구분하는 것이 분쟁 해결의 첫 단계다. 모든 나쁜 결과가 과실은 아니다.</p>

<h2>분쟁 해결 단계</h2>
<ol>
<li><strong>병원과 직접 대화</strong>: 구체적인 불만을 서면으로 정리해 원장에게 전달. 대부분 이 단계에서 해결.</li>
<li><strong>진료기록 확보</strong>: 분쟁 전에 진료기록·X-ray·검사 결과 사본을 모두 확보한다.</li>
<li><strong>한국소비자원(1372) 신고</strong>: 소비자 피해 구제 신청. 중립적 조정.</li>
<li><strong>수의사협회 민원</strong>: 윤리 위반·무면허 의료 등 직능 관련 신고.</li>
<li><strong>법원 민사 조정·소송</strong>: 손해배상 청구. 과실 입증 책임은 보호자 측.</li>
</ol>

<div class="callout-cat">
<strong>제2의 의견 (Second Opinion) 활용</strong><br>
진단·치료 방법에 의문이 있을 때 다른 병원에 진료기록을 가져가 의견을 구한다. 이것은 병원에 대한 불신이 아니라 정보를 얻는 정당한 방법이다. 좋은 수의사는 보호자의 second opinion을 지지한다.
</div>

<h2>마지막으로</h2>
<p>분쟁보다 좋은 것은 좋은 의사소통이다. 진료 전 비용 예상액을 물어보고, 치료 방향을 충분히 이해하고, 의문 사항은 즉시 질문하는 습관이 분쟁을 예방한다. 그래도 문제가 생겼다면 권리를 당당하게 요청할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "수의사법 제13조 (진료기록부 등의 보존)",
      "한국소비자원 동물병원 피해 구제 사례집 2024",
      "한국수의사회 수의사 윤리강령",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 법적 분쟁은 전문가에게 문의하세요.",
    status: "published",
    publishedAt: "2026-07-13T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 360 / Cat5 / Macro-F(절차) / Lens-L4 / Hook-H4 / Outro-O3 / Angle-RA4
  {
    id: "blog-360",
    slug: "cat-moving-new-home-guide",
    type: "blog",
    category: 5,
    title: "고양이와 이사하기 — 루틴 변화에 가장 민감한 동물의 이사 관리법",
    subtitle: "이사 전·당일·후 단계별 고양이 스트레스 최소화, 새 집 탐색 방법, 적응 신호",
    metaTitle: "고양이 이사 스트레스 최소화 — 단계별 관리 가이드 | 펫지기",
    metaDescription: "고양이와 이사할 때 스트레스를 최소화하는 방법. 이사 전 준비, 당일 격리 관리, 새 집 탐색 단계, 적응 완료 신호를 정리했습니다.",
    body: `<p>고양이는 영역 동물이라 익숙한 냄새와 공간이 안정감의 원천이다. 이사는 이를 한꺼번에 바꾸는 큰 스트레스 사건이다. 이사 전 준비부터 새 집 적응, 문제 행동 대처까지 단계별로 정리했다.</p>

<h2>이사 전 준비 (1~2주 전)</h2>
<ul>
<li><strong>이동장 적응</strong>: 이동장을 생활 공간에 꺼내 두고 담요와 간식을 넣어 안전한 장소로 인식하게 한다.</li>
<li><strong>짧은 이동 연습</strong>: 이동장에 넣고 짧게 차를 타 보아 이동에 익숙해지게 한다.</li>
<li><strong>냄새 보존</strong>: 담요·침대를 이사 직전에 세탁하지 않고 익숙한 냄새를 가져간다.</li>
<li><strong>페로몬 제품</strong>: 고양이용 페로몬 디퓨저를 이사 전부터 사용해 볼 수 있다. 효과는 개체마다 다르다.</li>
<li><strong>새 동네 정보</strong>: 가까운 동물병원과 야간 응급 병원을 미리 확인한다.</li>
<li><strong>등록 정보 변경</strong>: 주소가 바뀌면 동물등록 정보를 변경한다. <a href="/blog/animal-registration-change-cancel-guide">동물등록 변경·말소 가이드</a>를 참고한다.</li>
</ul>

<h2>이사 당일</h2>
<p>짐을 나르느라 문이 자주 열리면 고양이가 놀라 도망치기 쉽다. 이사 당일에는 한 방을 정해 고양이를 미리 넣어 두고, 문에 '열지 마세요' 표시를 붙인다.</p>
<ol>
<li>안전한 방에 화장실, 물, 밥, 담요, 숨을 곳을 둔다.</li>
<li>짐을 다 옮긴 뒤 마지막에 고양이를 이동장에 넣어 이동한다.</li>
<li>차 안에서는 이동장을 고정하고, 풀어 놓은 채로 태우지 않는다.</li>
<li>더운 날씨에 차 안에 두지 않는다.</li>
</ol>

<h2>새 집 적응 단계</h2>
<table>
<thead><tr><th>단계</th><th>내용</th></tr></thead>
<tbody>
<tr><td>도착 직후</td><td>미리 정한 한 방에 먼저 풀어 놓는다. 밥·물·화장실을 가까이 두되 서로 떨어뜨려 놓는다</td></tr>
<tr><td>며칠간</td><td>숨는 것은 정상이다. 억지로 꺼내지 않고 조용히 지켜본다. 몇 시간 만에 적응하는 고양이도, 며칠 숨는 고양이도 있다</td></tr>
<tr><td>이후</td><td>한 공간씩 열어 주며 탐색하게 한다. 한꺼번에 넓은 공간을 주면 압도될 수 있다</td></tr>
<tr><td>정착</td><td>식욕, 배변, 그루밍, 보호자에게 다가오는 행동이 정상으로 돌아오면 적응한 것이다</td></tr>
</tbody>
</table>

<div class="callout-cat">
<strong>이럴 때는 병원에 연락</strong><br>
• 하루 이상 거의 먹지 않는다 (고양이는 며칠 굶으면 간에 문제가 생길 수 있다)<br>
• 화장실을 사용하지 못하거나 소변을 못 본다<br>
• 구토·설사가 반복된다<br>
• 며칠이 지나도 계속 숨어 지내며 극도로 불안해한다
</div>

<h2>이사 후 흔한 문제</h2>
<ul>
<li><strong>화장실 밖 배변</strong>: 화장실 위치와 모래를 이전과 같게 하고, 개수를 충분히 둔다. 반복되면 방광염 같은 질환도 확인한다.</li>
<li><strong>과도한 그루밍 또는 그루밍 중단</strong>: 스트레스 신호일 수 있다. 숨을 곳과 높은 곳을 제공하고 놀이 시간을 늘린다.</li>
<li><strong>밤 울음</strong>: 새로운 소리와 냄새 때문일 수 있다. 일정한 일과를 유지한다.</li>
</ul>

<h2>탈출 방지</h2>
<p>새 집의 창문, 방충망, 베란다를 먼저 점검한다. 낯선 환경에서 고양이는 평소와 다르게 도망칠 수 있다. 이동장과 마이크로칩, 이름표를 확인하자.</p>

<h2>마지막으로</h2>
<p>고양이의 적응 속도는 개체마다 다르다. 조용한 안전지대를 만들어 주고, 서두르지 않고 새 영역을 스스로 넓혀 가도록 기다리는 것이 가장 좋은 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://woodgreen.org.uk/pet-advice/cat/moving-house-with-a-cat/ — Wood Green, Moving house with a cat",
      "https://www.rover.com/blog/moving-with-cats/ — Rover, Moving with cats",
      "https://www.agriapet.co.uk/guides-and-advice/moving-house-with-a-cat/ — Agria Pet Insurance, Moving house with a cat",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-14T09:00:00.000Z",
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
  console.log("블로그 포스트 47차 시딩 완료! (blog-356 ~ blog-360)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
