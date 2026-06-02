import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 88 — cat3×2 + cat2×1 + cat1×1 + cat5×1 = 5편 (IDs 561-565)
// Macros: D, A, B, F, G
// Angles: RA2, RA4, RA7, RA8, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-561",
    slug: "dog-pyoderma-skin-infection",
    type: "blog",
    category: 3,
    title: "강아지 농피증 — 피부 감염의 가장 흔한 이유",
    subtitle: "표재성·심재성 농피증 구분, 주요 원인, 항생제 치료 기간, 재발 예방",
    metaTitle: "강아지 농피증 — 원인·항생제 치료·재발 예방 완전 가이드 | 펫지기",
    metaDescription: "강아지 농피증(세균성 피부 감염) 원인과 치료 방법. 표재성·심재성 구분, 항생제 치료 기간, 재발을 막는 방법을 정리했습니다.",
    body: `<p>강아지 피부에 붉은 반점·고름 반점이 생기고, 털이 부분적으로 빠지며, 비린내가 난다면 농피증일 가능성이 높다. 국내 반려견 피부 질환 중 가장 흔한 종류다.</p>

<h2>농피증이란</h2>
<p>포도상구균(Staphylococcus pseudintermedius)이 주원인인 세균성 피부 감염이다. 표재성(피부 표면)과 심재성(피부 깊은 층)으로 나뉜다. 표재성은 항생제로 비교적 쉽게 치료되지만, 심재성은 치료 기간이 길고 재발이 잦다.</p>

<h2>주요 원인</h2>
<ul>
<li>아토피 피부염 (피부 장벽 손상)</li>
<li>알레르기 (식이·환경)</li>
<li>내분비 질환 (갑상선 저하증·쿠싱)</li>
<li>면역 억제제 장기 복용</li>
<li>피부 주름 부위 습기 (불독·샤페이 등)</li>
</ul>

<h2>치료</h2>
<div class="callout-dog">
<strong>농피증 치료 원칙</strong><br>
• 표재성: 항생제 3~4주<br>
• 심재성: 항생제 6~8주 또는 더 길게<br>
• 임의 조기 중단 금지 — 내성균 발생 위험<br>
• 약용 샴푸(클로르헥시딘) 주 2~3회 병행<br>
• 원인 질환 동시 치료 필수
</div>

<h2>재발 예방</h2>
<ul>
<li>기저 질환(아토피·알레르기) 치료가 핵심</li>
<li>피부 주름 부위 매일 건조하게 유지</li>
<li>항생제 내성 예방: 수의사 처방 없이 임의 항생제 사용 금지</li>
<li>정기 피부과 검진 (재발성인 경우)</li>
</ul>

<h2>마지막으로</h2>
<p>농피증이 반복된다면 원인 질환을 치료하지 않은 것이 원인이다. 아토피·알레르기 진단을 받고 관리하는 것이 재발 농피증의 근본 해결책이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Hillier, A. et al. — Guidelines for the diagnosis and antimicrobial therapy of canine superficial bacterial folliculitis. Vet Dermatol 2014",
      "한국수의피부학회 농피증 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-22T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-562",
    slug: "cat-water-intake-increase-tips",
    type: "blog",
    category: 2,
    title: "고양이 음수량 늘리기 — 안 마시는 고양이를 위한 7가지 방법",
    subtitle: "고양이가 물을 적게 마시는 이유, 흐르는 물 급수기, 음식으로 수분 보충",
    metaTitle: "고양이 음수량 늘리기 — 물 안 마시는 고양이를 위한 7가지 방법 | 펫지기",
    metaDescription: "고양이가 물을 적게 마시는 이유와 음수량을 늘리는 방법 7가지. 흐르는 물 급수기 효과, 음식으로 수분 보충하는 방법, 요로 건강과의 관계를 정리했습니다.",
    body: `<p>고양이는 사막 기원 동물로, 본능적으로 물 섭취가 적다. 그러나 실내에서 건식 사료만 먹는 고양이에게 만성 탈수는 요로 질환의 주요 원인이 된다.</p>

<h2>고양이가 적게 마시는 이유</h2>
<p>야생 고양이의 먹이(쥐·새)는 수분 함량이 70%에 달한다. 이 수분으로 하루 필요량 대부분을 충족했기 때문에 물을 따로 마시는 행동이 발달하지 않았다. 건식 사료(수분 10%)만 먹는 실내묘는 구조적으로 만성 탈수 상태에 가깝다.</p>

<h2>음수량 늘리는 7가지 방법</h2>
<div class="callout-cat">
<strong>효과적인 음수량 증가 방법</strong><br>
1. 흐르는 물 급수기 — 흐르는 물에 반응하는 본능 활용<br>
2. 습식 사료 비율 높이기 — 가장 확실한 수분 공급<br>
3. 물그릇 여러 곳에 배치 — 동선마다 물 접근<br>
4. 밥그릇과 물그릇 분리 — 동일 공간 기피 본능<br>
5. 치킨·참치 육수 소량 첨가 — 향으로 유인 (무염 필수)<br>
6. 물그릇 크기·재질 다양화 (스테인리스·유리·세라믹)<br>
7. 아이스큐브 첨가 — 움직임+냉기로 흥미 유발
</div>

<h2>급수기 선택 기준</html2>
<ul>
<li>스테인리스 또는 세라믹 재질 (플라스틱은 세균막 형성)</li>
<li>필터 교환 주기 확인 (오염된 필터 오히려 역효과)</li>
<li>물 흐름 속도 조절 가능한 것</li>
</ul>

<h2>하루 적정 음수량 기준</h2>
<p>체중(kg) × 50~60ml = 하루 필요 수분량. 습식 사료 100g에 약 80ml 수분이 포함되어 있다. 섭취 경로를 합산해 목표량을 채울 수 있다.</p>

<h2>마지막으로</h2>
<p>물을 안 마신다고 강요하면 역효과다. 환경을 바꾸는 것이 핵심이다. 급수기 하나, 습식 사료 추가 하나가 요로 질환 예방에 가장 효과적인 투자다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Buckley, C.M.F. et al. — Effect of dietary water intake on urinary output, specific gravity and relative supersaturation for calcium oxalate and struvite in healthy domestic cats. Br J Nutr 2011",
      "한국수의영양학회 고양이 수분 섭취 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-23T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-563",
    slug: "dog-kennel-cough-guide",
    type: "blog",
    category: 3,
    title: "강아지 켄넬코프 — 기침하는 강아지, 얼마나 심각한가",
    subtitle: "켄넬코프 원인, 전염성, 자연 치유 vs 항생제, 예방 접종, 격리 기준",
    metaTitle: "강아지 켄넬코프 — 원인·전염성·치료·예방 접종 가이드 | 펫지기",
    metaDescription: "강아지 켄넬코프(전염성 기관기관지염) 원인과 치료. 자연 치유 가능한 경우와 항생제가 필요한 경우, 예방 접종, 격리 기준을 정리했습니다.",
    body: `<p>다른 강아지와 놀고 온 후 기침을 시작했다. 구역질하듯 거위 울음 같은 기침이 반복된다면 켄넬코프(전염성 기관기관지염)일 가능성이 높다.</p>

<h2>켄넬코프란</h2>
<p>여러 병원체(보데텔라 브론키셉티카, 파라인플루엔자, 아데노바이러스 등)의 복합 감염으로 발생하는 전염성 호흡기 질환이다. 이름처럼 보호소·애견 카페·미용실 등 강아지가 모이는 곳에서 쉽게 퍼진다.</p>

<h2>특징적 증상</h2>
<ul>
<li>거위가 우는 듯한 건조한 기침</li>
<li>기침 후 구역질 (목에 뭔가 걸린 것처럼)</li>
<li>대부분 활기·식욕 유지</li>
<li>발열·무기력 동반 시 더 심각한 감염 의심</li>
</ul>

<h2>자연 치유 vs 항생제</h2>
<div class="callout-dog">
<strong>치료 기준</strong><br>
• 가벼운 켄넬코프 (기침만, 활기 있음): 1~2주 자연 치유 가능<br>
• 항생제 필요 경우: 기침 2주 이상, 발열 동반, 전신 증상, 어린 강아지·노령견·면역 저하견<br>
• 기침 억제제: 일부에서 처방 — 심한 기침 완화
</div>

<h2>전염성과 격리</h2>
<ul>
<li>공기·접촉으로 매우 쉽게 전파</li>
<li>증상 기간 + 완치 후 10~14일 격리 권장</li>
<li>다른 강아지와의 접촉 금지</li>
</ul>

<h2>예방 접종</h2>
<ul>
<li>보데텔라 백신: 경구·비강·주사 형태. 100% 예방은 아니지만 증상 완화.</li>
<li>기본 예방접종(DA2PP): 바이러스 유발 원인 일부 포함</li>
<li>보호소·미용실 방문 전 접종 확인 권장</li>
</ul>

<h2>마지막으로</h2>
<p>건강한 성견의 켄넬코프는 대부분 2주 내 자연 회복된다. 그러나 어린 강아지·노령견에서는 폐렴으로 진행될 수 있으므로 발열·무기력이 동반되면 즉시 수의사 방문이 필요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Ford, R.B. — Canine Infectious Tracheobronchitis. Infectious Diseases of the Dog and Cat 2012",
      "한국수의감염병학회 호흡기 감염 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-23T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-564",
    slug: "senior-cat-adoption-guide",
    type: "blog",
    category: 1,
    title: "노령묘 입양 — 10살 이상 고양이를 입양한다는 것",
    subtitle: "노령묘 입양의 현실적 장점, 의료비 계획, 환경 준비, 짧은 시간의 의미",
    metaTitle: "노령묘 입양 — 10살 이상 고양이 입양 가이드와 현실 | 펫지기",
    metaDescription: "노령묘 입양을 고려하는 분들을 위한 가이드. 노령묘 입양의 장점, 의료비 현실, 관절염·CKD 대비 환경 준비, 남은 시간을 함께하는 의미를 정리했습니다.",
    body: `<p>보호소에서 10살 이상 노령묘는 입양 대기 기간이 가장 길다. 그러나 노령묘와의 삶은 예상과 다른 깊이를 가져다준다.</p>

<h2>노령묘 입양의 현실적 장점</h2>
<ul>
<li>성격이 완전히 형성 — 만날 그 고양이가 입양 후 그 고양이다</li>
<li>에너지 레벨 예측 가능, 조용한 공존</li>
<li>키튼의 밤샘 소란·파괴 행동 없음</li>
<li>독립적이면서도 감사할 줄 아는 유대</li>
</ul>

<h2>의료비 현실적 계획</h2>
<div class="callout-cat">
<strong>노령묘 입양 후 의료비 준비</strong><br>
• 입양 즉시: 종합 건강 검진 (혈액·소변·초음파) 10~15만 원<br>
• 흔한 질환: CKD·갑상선항진증·고혈압 — 진단 시 월 5~10만 원 약물비<br>
• 비상금: 최소 50~100만 원 별도 확보<br>
• 펫보험: 노령묘는 가입 제한 있음 — 미리 확인
</div>

<h2>환경 준비</h2>
<ul>
<li>낮은 출입구 화장실 (관절염 고양이 쉽게 들어갈 수 있게)</li>
<li>따뜻한 침대 (노령묘는 추위에 취약)</li>
<li>미끄럼 방지 매트</li>
<li>낮은 높이 밥그릇대 (경추 관절염 고려)</li>
</ul>

<h2>짧은 시간의 의미</h2>
<p>노령묘와 함께하는 시간은 짧을 수 있다. 그러나 많은 보호자가 "그 짧은 시간이 내 삶에서 가장 고요하고 깊은 관계였다"고 말한다. 남은 시간을 함께 편안하게 보내게 해주는 것 자체가 하나의 완전한 사랑이다.</p>

<h2>마지막으로</h2>
<p>노령묘 입양은 자선이 아니다. 당신도 무언가를 받는다 — 완성된 존재와의 조용한 동반자 관계. 그것은 충분히 아름다운 선택이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA — Adopting a Senior Cat",
      "한국동물복지협회 노령 동물 입양 현황 보고서 2023",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-24T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-565",
    slug: "dog-body-language-guide",
    type: "blog",
    category: 5,
    title: "강아지 바디랭귀지 — 말 못하는 강아지가 전달하는 신호들",
    subtitle: "꼬리·귀·눈·자세·하품·으르렁 신호 해석, 스트레스 신호, 놀이 초대 신호",
    metaTitle: "강아지 바디랭귀지 완전 가이드 — 꼬리·귀·자세 신호 해석 | 펫지기",
    metaDescription: "강아지 바디랭귀지를 이해하는 방법. 꼬리·귀·눈·자세가 전달하는 신호, 스트레스 칼밍 신호, 놀이 초대 신호, 공격 전 경고를 정리했습니다.",
    body: `<p>강아지는 항상 무언가를 말하고 있다. 바디랭귀지를 읽을 수 있으면 물리기 전에 신호를 읽고, 행복한 강아지를 만들 수 있다.</p>

<h2>꼬리 신호</h2>
<ul>
<li><strong>높이 세우고 빠르게 흔들기</strong>: 자신감·흥분 (반드시 좋은 신호가 아님)</li>
<li><strong>중간 높이 넓게 흔들기</strong>: 친근하고 이완된 상태 (긍정적)</li>
<li><strong>낮게 또는 다리 사이</strong>: 두려움·복종·불안</li>
<li><strong>뻣뻣하게 세운 채 작게 흔들기</strong>: 경고·긴장</li>
</ul>

<h2>귀·눈 신호</h2>
<table>
<thead><tr><th>신호</th><th>의미</th></tr></thead>
<tbody>
<tr><td>귀 앞으로 기울임</td><td>집중·관심</td></tr>
<tr><td>귀 뒤로 납작</td><td>두려움·복종</td></tr>
<tr><td>눈 크게 뜨고 직접 응시</td><td>경고·도전</td></tr>
<tr><td>눈 가늘게·고개 돌림</td><td>긴장 완화 신호</td></tr>
<tr><td>반달 눈(고래 눈)</td><td>극도의 불안</td></tr>
</tbody>
</table>

<h2>스트레스 칼밍 신호</h2>
<div class="callout-dog">
<strong>강아지가 "나 불편해요"라고 말할 때</strong><br>
• 하품 (피곤하지 않은데)<br>
• 몸 털기 (물기가 없는데)<br>
• 발 핥기·코 핥기<br>
• 돌아서기·눈 피하기<br>
• 느린 움직임으로 다가오기<br>
▶ 이 신호를 무시하면 다음은 으르렁·물기
</div>

<h2>놀이 초대 신호</h2>
<ul>
<li>플레이 바우(앞발 낮추고 엉덩이 올리기)</li>
<li>달려갔다 돌아오기 반복</li>
<li>짧은 짖음 + 튀어오르기</li>
</ul>

<h2>마지막으로</h2>
<p>으르렁거리는 강아지를 혼내지 마라. 으르렁은 경고다 — "나 불편해요"라는 마지막 언어적 경고다. 이것을 없애면 다음에는 아무 경고 없이 문다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Rugaas, T. — On Talking Terms with Dogs: Calming Signals. Dogwise Publishing 2006",
      "한국반려동물행동상담협회 바디랭귀지 교육 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-24T11:00:00.000Z",
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
  console.log("블로그 포스트 88차 시딩 완료! (blog-561 ~ blog-565)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
