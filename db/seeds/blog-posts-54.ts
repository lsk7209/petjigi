import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 54 — cat1×2 + cat2×1 + cat3×1 + cat5×1 = 5편 (IDs 391-395)
// Macros: F, B, A, E, F
// Angles: RA4, RA1, RA5, RA3, RA7

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 391 / Cat1 / Macro-F / Lens-L4 / Hook-H1 / Outro-O2 / Angle-RA4
  {
    id: "blog-391",
    slug: "pedigree-vs-mixed-breed-cat-guide",
    type: "blog",
    category: 1,
    title: "품종묘 vs 혼합묘 — 어떤 선택이 나에게 맞는가",
    subtitle: "품종별 예측 가능한 성격·건강 문제, 혼합묘의 잡종강세, 비용 차이, 입양 경로",
    metaTitle: "품종묘 vs 혼합묘 선택 — 성격·건강·비용 완전 비교 | 펫지기",
    metaDescription: "품종묘와 혼합묘(코리안숏헤어)의 성격 예측 가능성, 건강 문제, 비용 차이를 비교했습니다. 어떤 선택이 나에게 맞는지 기준을 정리했습니다.",
    body: `<p>고양이를 처음 입양할 때 품종묘를 선택할지 혼합묘를 선택할지 고민이 된다. 둘 다 좋은 선택이 될 수 있지만, 각각의 특성을 알고 결정하는 것이 중요하다.</p>

<h2>품종묘 — 예측 가능성의 장점</h2>
<h3>대표 품종별 특성</h3>
<ul>
<li><strong>래그돌</strong>: 온순, 안겨있기 좋아함, 대형 장모종</li>
<li><strong>메인쿤</strong>: 사교적·활발, 강아지 같은 성격, 대형종</li>
<li><strong>브리티시숏헤어</strong>: 독립적·차분, 혼자 잘 견딤</li>
<li><strong>아비시니안</strong>: 매우 활발·호기심 강함, 작은 공간에 맞지 않음</li>
<li><strong>페르시안</strong>: 조용·순함, 매일 그루밍 필요</li>
</ul>

<h3>유전적 건강 문제</h3>
<p>품종묘는 품종별 특유 유전 질환이 있다:</p>
<ul>
<li>메인쿤·래그돌: 비대성 심근병증(HCM)</li>
<li>페르시안·히말라얀: 다낭성 신장 질환(PKD)</li>
<li>스코티시폴드: 뼈·관절 기형 (접힌 귀 유전자 문제)</li>
</ul>

<h2>혼합묘 (코리안숏헤어) — 잡종강세</h2>
<p>다양한 유전자 풀에서 태어난 혼합묘는 특정 품종 유전 질환에 걸릴 확률이 낮다. '잡종강세(Hybrid Vigor)'라 불리는 현상이다. 성격 예측은 어렵지만, 개체별로 다양하고 매력적인 성격을 가진다.</p>

<h2>비용 비교</h2>
<table>
<thead><tr><th>항목</th><th>품종묘</th><th>혼합묘</th></tr></thead>
<tbody>
<tr><td>초기 비용</td><td>50~300만 원+</td><td>0~30만 원 (보호소)</td></tr>
<tr><td>유전 질환 위험</td><td>품종별 높음</td><td>상대적 낮음</td></tr>
<tr><td>그루밍</td><td>장모 품종은 매일 필요</td><td>단모 위주, 관리 적음</td></tr>
</tbody>
</table>

<h2>나에게 맞는 선택 기준</h2>
<div class="callout-cat">
<strong>이런 경우 품종묘</strong><br>
• 특정 성격(온순·활발 등)을 예측하고 싶을 때<br>
• 특정 외모(색상·체형)가 중요할 때<br><br>
<strong>이런 경우 혼합묘</strong><br>
• 유기 동물에게 집 주고 싶을 때<br>
• 비용 부담을 줄이고 싶을 때<br>
• 예상 외의 개성을 즐길 수 있을 때
</div>

<h2>마지막으로</h2>
<p>어느 쪽이든 개체의 성격을 직접 보고 결정하는 것이 가장 중요하다. 품종이 성격을 결정하지만, 사회화와 개체 편차가 더 큰 영향을 미치기도 한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Gough, A. et al. — Breed Predispositions to Disease in Dogs and Cats",
      "International Cat Care — Pedigree vs Mixed Breed Cats",
      "한국고양이보호협회 책임 입양 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-29T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 392 / Cat1 / Macro-B / Lens-L1 / Hook-H2 / Outro-O1 / Angle-RA1
  {
    id: "blog-392",
    slug: "senior-dog-new-puppy-introduction",
    type: "blog",
    category: 1,
    title: "노령견과 새 강아지 합사 — 나이 차이가 큰 두 개의 공존",
    subtitle: "노령견 스트레스 최소화, 에너지 차이 관리, 각자의 공간 확보, 성공적 합사 기간",
    metaTitle: "노령견과 새 강아지 합사 — 단계별 성공 가이드 | 펫지기",
    metaDescription: "나이 든 개와 새 강아지를 합사할 때 주의사항. 노령견 스트레스 최소화, 에너지 차이 관리, 각자 공간 확보, 성공적 합사 단계를 정리했습니다.",
    body: `<p>노령견과 새 강아지를 함께 키우려는 보호자가 많다. 그러나 나이 차이가 큰 두 개의 합사는 젊은 개끼리보다 더 세심한 관리가 필요하다.</p>

<h2>노령견 입장 이해하기</h2>
<p>평화롭게 지내던 노령견에게 활발한 새 강아지는 스트레스 요인이 될 수 있다. 노령견은 관절통·감각 둔화·면역 저하 상태일 수 있어 에너지 넘치는 퍼피와의 상호작용이 부담이다.</p>

<h2>합사 전 고려사항</h2>
<ul>
<li>기존 노령견의 건강 상태 확인 — 통증·만성 질환이 있다면 더욱 조심</li>
<li>노령견이 다른 개와의 상호작용을 즐기는 편인지 파악</li>
<li>독립적인 공간(각자의 침대·식사 공간) 사전 확보</li>
</ul>

<h2>단계별 합사 접근</h2>
<ol>
<li><strong>냄새 먼저</strong>: 새 강아지 담요를 노령견에게 먼저 익숙하게</li>
<li><strong>중립 공간에서 첫 만남</strong>: 어느 쪽도 영역의식이 없는 곳 (공원 등)</li>
<li><strong>짧은 만남부터</strong>: 5~10분씩 시작, 노령견이 불편해하면 즉시 분리</li>
<li><strong>노령견의 신호 존중</strong>: 으르렁거림은 '그만'이라는 신호 — 퍼피를 제지</li>
</ol>

<h2>에너지 차이 관리</h2>
<div class="callout-dog">
<strong>노령견 보호 원칙</strong><br>
• 노령견의 쉬는 공간은 새 강아지가 침입 못 하게<br>
• 식사 시간 분리 (새 강아지가 노령견 밥을 빼앗지 않게)<br>
• 퍼피의 넘치는 에너지는 별도 놀이로 소진시킨 후 접촉<br>
• 노령견과의 1:1 시간 유지 — 관심 줄었다는 느낌 금지
</div>

<h2>예상 적응 기간</h2>
<p>노령견이 새 강아지를 완전히 받아들이는 데 3~6개월이 걸릴 수 있다. 일부 노령견은 결코 친하게 지내지 않더라도 서로를 견디는 수준까지는 도달한다. 이것도 성공이다.</p>

<h2>마지막으로</h2>
<p>새 강아지는 노령견에게 활력을 줄 수 있다는 연구도 있다. 그러나 강요보다 기다림이 먼저다. 노령견의 여생이 편안하도록 그 필요를 최우선으로 하는 합사 방식을 선택해야 한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Horwitz, D.F. — Multi-Dog Households. Veterinary Focus 2020",
      "ASPCA — Introducing a New Dog to Resident Dogs",
      "한국반려동물행동상담협회 다견 가정 관리 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-30T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 393 / Cat2 / Macro-A / Lens-L5 / Hook-H4 / Outro-O3 / Angle-RA5
  {
    id: "blog-393",
    slug: "dog-probiotic-supplement-guide",
    type: "blog",
    category: 2,
    title: "강아지 유산균 보충제 — 언제 필요하고 어떤 것을 골라야 하나",
    subtitle: "장내 미생물 균형의 역할, 항생제 후 유산균 복구, 균주 종류·CFU 수 해석, 인증 제품 고르기",
    metaTitle: "강아지 유산균 보충제 — 언제·어떻게 선택하는가 가이드 | 펫지기",
    metaDescription: "강아지 유산균 보충제가 필요한 상황과 선택 방법. 항생제 후 복구, 균주 종류, CFU 수 해석, 반려동물용 검증 제품 고르는 기준을 정리했습니다.",
    body: `<p>강아지 유산균(프로바이오틱스)은 장 건강 제품으로 널리 팔린다. 하지만 모든 제품이 모든 개에게 효과가 있는 것은 아니며, 연구 결과도 제품과 균주에 따라 다르다. 필요할 때 근거를 보고 고르는 것이 좋다.</p>

<h2>효과는 얼마나 확인되었나</h2>
<ul>
<li>급성 위장관 질환에서 프로바이오틱스의 효과를 평가한 체계적 문헌 고찰은 증상을 줄인다는 근거가 충분히 견고하지 않다고 결론 내렸다.</li>
<li>개별 임상시험에서는 특정 제품이 설사 회복을 앞당겼다는 결과도 있고, 통계적으로 유의하지 않은 결과도 있다.</li>
<li>효과는 균주, 혼합 구성, 농도에 따라 달라질 수 있다.</li>
<li>스트레스나 환경 변화로 생긴 설사에서 상대적으로 도움이 될 가능성이 언급되지만 근거는 제한적이다.</li>
</ul>

<h2>언제 도움이 될 수 있나</h2>
<table>
<thead><tr><th>상황</th><th>고려</th></tr></thead>
<tbody>
<tr><td>스트레스성 설사 (입소, 이동, 환경 변화)</td><td>수의사와 상의해 단기 사용을 고려할 수 있다</td></tr>
<tr><td>항생제 치료 중 또는 직후</td><td>수의사가 필요하다고 판단하면 병행</td></tr>
<tr><td>만성 장질환</td><td>진단과 치료가 우선. 프로바이오틱스는 보조 수단</td></tr>
<tr><td>건강한데 예방 목적</td><td>필수는 아니다. 균형 잡힌 사료와 규칙적인 식사가 우선</td></tr>
</tbody>
</table>

<div class="callout-dog">
<strong>유산균보다 진료가 먼저인 경우</strong><br>
• 설사가 이틀 이상 계속되거나 혈변이 섞임<br>
• 구토, 열, 무기력, 식욕 저하가 함께 있음<br>
• 어린 강아지, 노령견, 지병이 있는 개의 설사<br>
• 이물이나 독성 물질을 먹었을 가능성
</div>

<h2>제품을 고를 때</h2>
<ul>
<li>균주 이름과 보증 균수(CFU)가 라벨에 명시되어 있는지 확인한다.</li>
<li>개용으로 연구된 제품인지 확인한다. 사람용을 임의로 쓰면 첨가물(자일리톨 등)이 문제가 될 수 있다.</li>
<li>유통기한 안에서 보관 조건(냉장 등)을 지킨다.</li>
<li>코넬 자료는 개에게 하루 10억~100억 CFU 정도가 현재 권고 범위로 소개한다. 실제 양은 제품과 개체에 따라 수의사와 정한다.</li>
<li>효과를 판단할 기간을 정해 두고, 개선이 없으면 중단하고 진료를 받는다.</li>
</ul>

<h2>마지막으로</h2>
<p>유산균은 만능이 아니다. 설사나 소화 문제가 반복되면 원인 검사를 먼저 하고, 보조적으로 쓸 때는 개에게 연구된 제품과 합리적인 기간을 정해 시도하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC6766488/ — Clinical effect of probiotics in prevention or treatment of gastrointestinal disease in dogs: A systematic review",
      "https://www.vet.cornell.edu/departments-centers-and-institutes/riney-canine-health-center/canine-health-topics/power-probiotics — Cornell Riney Canine Health Center, The power of probiotics",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC6524086/ — Efficacy of an orally administered anti-diarrheal probiotic paste in dogs with acute diarrhea: a randomized, placebo-controlled study",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-30T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 394 / Cat3 / Macro-E / Lens-L3 / Hook-H2 / Outro-O2 / Angle-RA3
  {
    id: "blog-394",
    slug: "dog-cushings-syndrome-guide",
    type: "blog",
    category: 3,
    title: "강아지 쿠싱증후군 — 살쪄 보이는데 사실 부신 문제일 수 있다",
    subtitle: "물 많이 마심·배 불룩·탈모·피부 얇아짐 증상, 뇌하수체 vs 부신 원인 구분, 치료 방법",
    metaTitle: "강아지 쿠싱증후군 증상·진단·치료 완전 가이드 | 펫지기",
    metaDescription: "강아지 쿠싱증후군(부신피질기능항진증) 증상. 물 많이 마심·배 불룩·탈모 원인과 뇌하수체 vs 부신 종류 구분, 트릴로스테인 치료를 정리했습니다.",
    body: `<p>중년령 이상 강아지가 물을 엄청나게 마시고, 배가 불룩하게 나오고, 털이 빠지기 시작한다면 쿠싱증후군(Hyperadrenocorticism)을 의심할 수 있다.</p>

<h2>쿠싱증후군이란</h2>
<p>부신에서 코르티솔이 과도하게 분비되는 내분비 질환이다. 코르티솔은 스트레스 호르몬으로, 적당하면 필요하지만 과다하면 전신에 악영향을 준다.</p>

<h2>주요 증상</h2>
<div class="callout-dog">
<strong>쿠싱증후군 의심 신호</strong><br>
• 음수량·소변량 급증<br>
• 복부 팽만 ('나비 모양' 또는 솥뚜껑 배)<br>
• 좌우 대칭형 탈모 (몸통 위주)<br>
• 피부가 얇아지고 멍이 잘 듦<br>
• 근육 위축 (다리가 가늘어짐)<br>
• 식욕 증가<br>
• 무기력, 헐떡임 증가
</div>

<h2>원인 두 가지</h2>
<ul>
<li><strong>뇌하수체 의존성 (PDH, 85%)</strong>: 뇌하수체 종양이 ACTH를 과분비해 부신을 자극. 치료 가능하지만 완치 어려움.</li>
<li><strong>부신 종양 (ADH, 15%)</strong>: 부신 종양이 코르티솔 직접 분비. 수술로 완치 가능한 경우도.</li>
</ul>

<h2>진단 방법</h2>
<ul>
<li>혈액검사 (ALK-P 상승이 특징적)</li>
<li>LDDS(저용량 덱사메타손 억압 검사) — 스크리닝</li>
<li>HDDS·ACTH 자극 검사 — 원인 구분</li>
<li>복부 초음파 — 부신 크기·형태 확인</li>
</ul>

<h2>치료 방법</h2>
<ul>
<li><strong>트릴로스테인 (Vetoryl)</strong>: PDH·ADH 모두 사용 가능한 경구 약물. 코르티솔 합성 억제. 평생 투여 + 정기 혈액 모니터링 필요.</li>
<li><strong>미토테인 (Lysodren)</strong>: 부신 세포 파괴. 효과적이지만 부작용 관리 어려움.</li>
<li><strong>수술</strong>: 부신 종양의 경우 적출이 완치 가능.</li>
</ul>

<h2>마지막으로</h2>
<p>쿠싱증후군은 진단이 어렵고 완치보다 조절이 목표인 질환이다. 그러나 적절한 치료를 받으면 삶의 질을 크게 높일 수 있다. 다음·다뇨·탈모가 동시에 나타난다면 혈액검사부터 시작하는 것이 권장된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Behrend, E.N. et al. — Diagnosis of spontaneous canine hyperadrenocorticism. JVIM 2013",
      "한국수의내분비학회 쿠싱증후군 임상 가이드라인",
      "WSAVA — Adrenal Gland Disease Management Guidelines",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-31T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 395 / Cat5 / Macro-F / Lens-L7 / Hook-H3 / Outro-O3 / Angle-RA7
  {
    id: "blog-395",
    slug: "dog-winter-cold-care-guide",
    type: "blog",
    category: 5,
    title: "겨울철 강아지 케어 — 추위·건조·제설제로부터 반려견 지키기",
    subtitle: "체온 유지 방법, 소형견·노령견·단모종 특별 관리, 실내 건조함, 제설제 노출 후 처치",
    metaTitle: "겨울철 강아지 케어 — 추위·제설제·건조함 관리 완전 가이드 | 펫지기",
    metaDescription: "겨울철 강아지 케어 방법. 체온 유지, 소형견·노령견 특별 관리, 제설제 노출 후 처치, 실내 건조함과 피부 관리를 정리했습니다.",
    body: `<p>강아지는 털이 있으니 추위에 강할 것이라는 생각이 있다. 그러나 품종에 따라 추위에 극도로 취약한 개도 있으며, 겨울의 여러 위험 요소에 대비가 필요하다.</p>

<h2>추위에 취약한 개</h2>
<ul>
<li>소형견 (체중 대비 체표면적이 크다 = 열 손실 빠름)</li>
<li>단모종 (치와와·닥스훈트·이탈리안 그레이하운드 등)</li>
<li>노령견 (체온 조절 능력 저하)</li>
<li>몸이 마른 개 (지방 단열재 부족)</li>
<li>최근 수술·질병 중인 개</li>
</ul>

<h2>저체온 신호</h2>
<div class="callout-dog">
<strong>저체온증 의심 신호</strong><br>
• 심한 떨림<br>
• 움직임이 느려짐·비틀거림<br>
• 잇몸이 창백하거나 푸른빛<br>
• 무기력·의식 저하<br>
→ 따뜻한 담요로 감싸고 즉시 병원
</div>

<h2>체온 유지 방법</h2>
<ul>
<li>반려견 옷/방한복 — 소형견·단모종은 필수</li>
<li>방수 부츠 — 발바닥 동상·제설제 차단</li>
<li>산책 시간 단축 — 영하 5°C 이하에서 소형견은 10분 이내</li>
<li>실내 온도 최소 20°C 이상 유지</li>
<li>차가운 바닥에 직접 눕지 않게 침대·방석 제공</li>
</ul>

<h2>제설제(염화칼슘) 대처</h2>
<p>제설제는 발바닥을 건조·자극하고, 핥으면 위장 자극을 줄 수 있다.</p>
<ul>
<li>산책 전: 발바닥 왁스(반려동물용) 또는 부츠 착용</li>
<li>산책 후: 따뜻한 물로 발 세척, 발 사이까지 닦기</li>
<li>핥지 않도록 즉시 닦아주기</li>
</ul>

<h2>실내 건조함 관리</h2>
<p>겨울 난방으로 실내 습도가 낮아지면 피부·코가 건조해지고 정전기가 심해진다.</p>
<ul>
<li>가습기 사용 (습도 40~60%)</li>
<li>오메가3 보충으로 피부 장벽 강화</li>
<li>물 그릇 여러 곳에 배치 (음수량 늘리기)</li>
</ul>

<h2>마지막으로</h2>
<p>겨울 산책이 불편하다고 줄이면 에너지 과잉·비만·우울로 이어진다. 날씨에 맞는 방한 용품을 갖추고 짧게 자주 산책하는 것이 최선이다. 실내에서 노즈워크·퍼즐피더로 정신적 자극을 보완하면 더 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Kennel Club — Winter Dog Safety Tips",
      "Veterinary Partner — Hypothermia in Dogs",
      "한국반려동물협회 겨울철 반려동물 케어 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-31T11:00:00.000Z",
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
  console.log("블로그 포스트 54차 시딩 완료! (blog-391 ~ blog-395)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
