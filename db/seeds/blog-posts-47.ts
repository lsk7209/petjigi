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
    body: `<p>기니피그는 조용하고 귀엽고 아이들과도 잘 어울린다. 그러나 '쉬운 반려동물'이라는 인식과 달리, 제대로 키우려면 상당한 준비가 필요하다.</p>

<h2>기니피그 기본 특성</h2>
<ul>
<li><strong>기대 수명</strong>: 5~7년 (잘 관리하면 8년 이상)</li>
<li><strong>사회성</strong>: 무리 동물 — 혼자 두면 우울·스트레스. 최소 2마리 권장.</li>
<li><strong>의사소통</strong>: 다양한 소리(휘파람·찍찍·투덜거림)로 감정 표현</li>
<li><strong>활동 패턴</strong>: 낮에도 활동하는 주행성·야행성 혼합</li>
</ul>

<h2>가장 중요한 영양 — 비타민C</h2>
<p>기니피그는 체내에서 비타민C를 합성하지 못한다. 부족하면 괴혈병(잇몸 출혈·관절 통증·무기력)이 발생한다. 매일 신선한 채소(파프리카·케일·파슬리)로 비타민C를 공급해야 한다.</p>

<div class="callout-cat">
<strong>하루 먹이 구성</strong><br>
• <strong>건초 (무제한)</strong>: 전체 식이 70% — 티모시 건초 기본<br>
• <strong>신선한 채소</strong>: 체중 1kg당 1컵 분량<br>
• <strong>펠릿 (비타민C 강화)</strong>: 체중 kg당 1~2 큰술<br>
• <strong>과일</strong>: 간식으로 소량 (당도 높음)
</div>

<h2>케이지 크기</h2>
<p>최소 권장 크기: 2마리 기준 가로 120cm × 세로 60cm. 작은 케이지에 가두어 키우면 스트레스·근육 약화가 생긴다. C&C 케이지(철망 격자판)를 직접 제작하면 저렴하게 큰 공간을 만들 수 있다.</p>

<h2>의료비와 전문 수의사</h2>
<p>기니피그는 엑조틱 동물이다. 일반 개·고양이 병원에서 진료하지 않는 곳이 많다. 입양 전 인근의 기니피그 진료 가능 병원을 파악해야 한다. 치과 질환(말부정교합·치아 과성장)이 흔하며 치료비가 높을 수 있다.</p>

<h2>마지막으로</h2>
<p>기니피그는 5~7년을 함께할 반려동물이다. 작다고 쉽지 않다. 비타민C 매일 보충, 넓은 케이지, 2마리 이상 동반 사육 — 이 세 가지를 지킬 수 있다면 매우 보람있는 반려동물이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Quesenberry, K.E. & Carpenter, J.W. — Ferrets, Rabbits, and Rodents: Clinical Medicine and Surgery",
      "Exotic Animal Care and Management — Guinea Pig Chapter",
      "한국기니피그보호협회 책임 입양 가이드",
    ]),
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
    body: `<p>강아지를 어디서 데려오느냐는 단순한 취향의 문제가 아니다. 동물 복지·건강·비용 모두에 영향을 미친다.</p>

<h2>보호소·구조단체 입양</h2>
<h3>장점</h3>
<ul>
<li>생명을 구하는 직접적인 행위</li>
<li>비용이 낮거나 기본 의료(접종·중성화)가 포함됨</li>
<li>성견의 경우 성격 파악 가능</li>
</ul>
<h3>단점</h3>
<ul>
<li>원하는 품종·나이를 바로 구하기 어려울 수 있음</li>
<li>보호소에서의 행동이 가정에서와 다를 수 있음 (적응 기간 필요)</li>
<li>건강·행동 이력이 불명확한 경우</li>
</ul>

<h2>펫숍 (Pet Shop)</h2>
<p>한국 대부분의 펫숍은 번식장에서 대량 생산된 강아지를 유통한다. 어미와 너무 일찍 분리(6~8주 이전), 과밀 환경, 유전 질환 검사 미실시가 문제다. 펫숍 강아지는 행동 문제·유전 질환 발생률이 높다는 연구가 있다.</p>

<h2>책임 브리더</h2>
<p>책임 있는 브리더는 양적 생산보다 품질을 추구한다.</p>
<div class="callout-dog">
<strong>책임 브리더 구분 체크리스트</strong><br>
□ 어미·아비 직접 볼 수 있음<br>
□ 어미 한 마리가 연 2회 이하 출산<br>
□ 유전 질환 검사 실시 (품종별 OFA·DNA 검사)<br>
□ 8주 이상 어미와 함께 양육<br>
□ 계약서 + 건강 보증서 제공<br>
□ 마음에 안 들면 반환 받는 조건 포함<br>
□ 방문 허용 (숨기지 않음)
</div>

<h2>비용 비교</h2>
<table>
<thead><tr><th>출처</th><th>초기 비용</th><th>건강 위험</th></tr></thead>
<tbody>
<tr><td>보호소 입양</td><td>0~30만 원</td><td>보통 (알려지지 않은 이력)</td></tr>
<tr><td>책임 브리더</td><td>50~300만 원+</td><td>낮음 (유전검사 실시)</td></tr>
<tr><td>펫숍</td><td>50~500만 원</td><td>높음 (번식장 출신)</td></tr>
</tbody>
</table>

<h2>마지막으로</h2>
<p>보호소 입양을 선택하는 것은 훌륭한 결정이다. 특정 품종이 필요하다면 책임 브리더를 통하는 것이 장기적으로 더 건강한 개를 데려올 가능성이 높다. 충동구매·번식장 출신 펫숍은 개인과 동물 모두에게 좋은 선택이 아니다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "McMillan, F.D. — Mental Health and Well-Being in Animals — Puppy Mill Research",
      "동물권행동 카라 번식장 실태 조사 보고서 2024",
      "ASPCA — Finding a Responsible Dog Breeder",
    ]),
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
    body: `<p>고양이는 영역 동물이다. 익숙한 냄새와 공간이 안전감의 원천이다. 이사는 그것을 한꺼번에 빼앗는 사건이다. 이사 후 고양이가 숨어서 안 나오거나, 밥을 안 먹거나, 화장실을 엉뚱한 곳에 사용한다면 스트레스 반응이다.</p>

<h2>이사 전 준비 (1~2주 전)</h2>
<ul>
<li>이동장을 미리 꺼내 생활 공간에 놓아두기 — 익숙한 공간으로 만들기</li>
<li>이동장 안에 평소 쓰던 담요·장난감 넣어두기</li>
<li>페로몬 디퓨저(펠리웨이) 설치 — 이사 전부터 사용</li>
<li>새 집 정보(근처 동물병원·24시 응급)를 미리 파악</li>
</ul>

<h2>이사 당일</h2>
<p>포장·이사짐 이동 중 고양이가 극도로 불안해진다. 문이 열리고 낯선 사람들이 드나드는 상황에서 탈출 위험도 있다.</p>
<ul>
<li>이동 중: 화장실이 있는 조용한 방에 격리 + 이동장 열어둠</li>
<li>새 집에 도착: 격리 방에 먼저 입장 (고양이 것을 먼저 풀어둠)</li>
<li>음식·물·화장실은 그대로 같은 위치로</li>
</ul>

<h2>새 집 탐색 단계</h2>
<ol>
<li><strong>1~3일: 격리 방 안에서 익숙해지기</strong> — 이 방만 먼저 고양이 냄새로 채움</li>
<li><strong>3~7일: 한 공간씩 열어주기</strong> — 강요하지 않고 스스로 탐색하게</li>
<li><strong>1~2주: 집 전체 개방</strong> — 고양이가 모든 곳에 자신의 냄새를 남기게</li>
</ol>

<div class="callout-cat">
<strong>적응 완료 신호</strong><br>
• 밥을 정상적으로 먹는다<br>
• 화장실을 제대로 사용한다<br>
• 보호자에게 다가온다<br>
• 새 공간에서 그루밍을 한다 (편안할 때 하는 행동)<br>
• 창문 앞에서 밖을 내다본다
</div>

<h2>이사 후 흔한 문제들</h2>
<ul>
<li><strong>식욕 감소</strong>: 1~3일은 정상. 5일 이상이면 병원 방문.</li>
<li><strong>화장실 외 배변</strong>: 화장실 위치를 바꾸지 않고, 충분한 수를 제공.</li>
<li><strong>과도한 그루밍 또는 그루밍 중단</strong>: 스트레스 신호. 환경 풍요화 강화.</li>
</ul>

<h2>마지막으로</h2>
<p>고양이의 이사 적응은 빠르면 1~2주, 느리면 3~6개월이 걸린다. 서두르지 않고 고양이가 스스로 새 영역을 탐색할 시간을 주는 것이 가장 빠른 적응법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "International Cat Care — Moving House with Cats",
      "Jackson Galaxy — Total Cat Mojo: Moving with Cats",
      "한국고양이보호협회 이사·환경 변화 적응 가이드",
    ]),
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
