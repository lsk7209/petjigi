import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 43 — cat3×2 + cat5×1 + cat2×1 + cat6×1 = 5편 (IDs 336-340)
// Macros: A, F, E, F, B
// Angles: RA3, RA1, RA6, RA4, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 336 / Cat3 / Macro-A(원인분석) / Lens-L3 / Hook-H2 / Outro-O1 / Angle-RA3
  {
    id: "blog-336",
    slug: "dog-diarrhea-home-care",
    type: "blog",
    category: 3,
    title: "강아지 설사 — 집에서 관리할 수 있는 경우와 즉시 병원 가야 할 경우",
    subtitle: "설사 원인 8가지, 색깔로 원인 추정하기, 금식·죽 급여법, 병원이 필요한 신호",
    metaTitle: "강아지 설사 원인·집에서 관리·병원 가야 할 시점 | 펫지기",
    metaDescription: "강아지 설사의 8가지 원인과 색깔별 의미, 집에서 할 수 있는 금식·죽 급여법, 즉시 병원이 필요한 신호를 정리했습니다.",
    body: `<p>강아지 설사는 매우 흔하다. 대부분은 1~2일 내에 저절로 나아지지만, 일부는 즉각적인 치료가 필요하다. 구분하는 방법을 알면 불필요한 걱정과 위험한 방치 모두를 피할 수 있다.</p>

<h2>설사 원인 8가지</h2>
<ol>
<li>식이 변화 또는 과식</li>
<li>이물질 섭취 (쓰레기·풀·뼈 등)</li>
<li>음식 불내증·알레르기</li>
<li>세균성 감염 (살모넬라·캠필로박터)</li>
<li>바이러스성 감염 (파보·코로나 등)</li>
<li>기생충 (지아르디아·회충·구충)</li>
<li>스트레스 (이사·새 가족·여행)</li>
<li>췌장·간·신장 질환 (만성 설사)</li>
</ol>

<h2>설사 색깔로 원인 추정</h2>
<table>
<thead><tr><th>색깔</th><th>가능한 의미</th></tr></thead>
<tbody>
<tr><td>갈색 (정상색, 묽음)</td><td>식이·스트레스 원인 가능성</td></tr>
<tr><td>노란색/주황색</td><td>담즙 과다, 소장 문제</td></tr>
<tr><td>녹색</td><td>담즙·급식 변화·기생충</td></tr>
<tr><td>검은색 (타르 같음)</td><td>상부 소화관 출혈 — 즉시 병원</td></tr>
<tr><td>선홍색 줄 (혈액)</td><td>대장 출혈·항문 자극 — 병원 필요</td></tr>
<tr><td>흰색/회색</td><td>담즙 부족·췌장 문제</td></tr>
</tbody>
</table>

<h2>집에서 할 수 있는 관리</h2>
<h3>금식 (12~24시간)</h3>
<p>위장에 휴식을 준다. 물은 계속 제공한다. 강아지가 허기진 것은 불안해 보이지만 일시적 금식은 위장 회복에 도움이 된다. 단, 새끼 강아지·소형견·노령견에서 장기 금식은 저혈당 위험이 있어 주의.</p>

<h3>회복식 급여</h3>
<p>금식 후 죽(흰 쌀밥 + 닭가슴살 삶은 것, 간 없이 부드럽게)으로 소량부터 시작한다. 3:1(밥:고기) 비율. 1~2일 후 일반 사료로 점진적 전환.</p>

<h3>프로바이오틱스</h3>
<p>반려동물용 유산균을 사료에 섞어주면 장내 균형 회복을 도울 수 있다. 사람용 요거트는 유당 과다로 오히려 설사를 악화할 수 있다.</p>

<h2>즉시 병원이 필요한 신호</h2>
<div class="callout-dog">
<strong>이런 경우 즉시 병원으로</strong><br>
• 설사에 피가 섞여 있다 (특히 검은색)<br>
• 48시간 이상 설사가 지속된다<br>
• 구토가 동시에 있다<br>
• 무기력하고 음식을 거부한다<br>
• 복부가 팽창하거나 딱딱하다<br>
• 새끼 강아지 (12주 미만) — 파보 의심<br>
• 접종이 안 된 개
</div>

<h2>마지막으로</h2>
<p>설사 한 번으로 무조건 병원을 달려갈 필요는 없다. 그러나 혈변·지속적 구토·무기력이 동반된다면 시간이 중요하다. 설사 첫날: 금식+물 공급. 이틀째: 회복식. 사흘째에도 낫지 않으면 병원이 원칙이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Merck Veterinary Manual — Diarrhea in Dogs",
      "WSAVA Nutritional Support Guidelines",
      "대한수의사회 소화기 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-02T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 337 / Cat3 / Macro-F(절차) / Lens-L1 / Hook-H1 / Outro-O3 / Angle-RA1
  {
    id: "blog-337",
    slug: "cat-hyperthyroidism-guide",
    type: "blog",
    category: 3,
    title: "고양이 갑상선 기능항진증 — 잘 먹는데 살이 빠진다면",
    subtitle: "10세 이상 노령묘 발병률 높음, 식욕증가·체중감소·과활동·구토 증상, 약물·수술·방사성요오드 치료 비교",
    metaTitle: "고양이 갑상선 기능항진증 증상·치료 완전 가이드 | 펫지기",
    metaDescription: "고양이 갑상선 기능항진증은 10세 이상 노령묘에서 흔합니다. 잘 먹는데 살이 빠지는 증상, 약물·수술·방사성요오드 치료 비교를 정리했습니다.",
    body: `<p>고양이가 사료를 늘 게 먹는데 점점 살이 빠지고, 활동이 갑자기 많아졌다면 갑상선 기능항진증(Hyperthyroidism)을 의심해야 한다. 10세 이상 고양이에서 가장 흔한 내분비 질환으로, 적절히 치료하면 삶의 질을 크게 높일 수 있다.</p>

<h2>갑상선 기능항진증이란</h2>
<p>갑상선이 과도하게 갑상선호르몬(T3·T4)을 분비하는 상태다. 갑상선 종양(대부분 양성)이 원인이다. 신진대사가 과활성화되어 에너지를 지나치게 소모한다.</p>

<h2>주요 증상</h2>
<div class="callout-cat">
<strong>갑상선 기능항진증 주요 신호</strong><br>
• 식욕 증가 — 잘 먹는데 체중 감소<br>
• 체중 감소 (근육 소실)<br>
• 활동성 증가, 밤에 울부짖음<br>
• 구토·설사<br>
• 털 상태 불량 (거칠어짐)<br>
• 음수량 증가, 소변량 증가<br>
• 심박수 증가 (빠른 맥박)
</div>

<h2>진단</h2>
<p>혈액검사에서 T4(갑상선호르몬) 수치를 측정한다. 보통 10세 이상 정기 혈액검사에 T4가 포함된다. T4 수치가 높으면 갑상선 기능항진증 진단이 가능하다.</p>

<h2>치료 방법 비교</h2>
<table>
<thead><tr><th>방법</th><th>장점</th><th>단점</th></tr></thead>
<tbody>
<tr><td>약물 (메티마졸)</td><td>비침습적, 조절 용이</td><td>평생 매일 투여, 일부 부작용</td></tr>
<tr><td>갑상선 절제 수술</td><td>완치 가능성</td><td>마취 위험(노령), 부갑상선 손상 위험</td></tr>
<tr><td>방사성 요오드(I-131)</td><td>완치율 높음, 한 번 시술</td><td>시설 제한적, 격리 필요, 비용 높음</td></tr>
<tr><td>저요오드 처방식</td><td>약물 없이 호르몬 조절</td><td>엄격한 식이 관리 필요, 완전 통제 어려움</td></tr>
</tbody>
</table>

<p>가장 많이 사용하는 방법은 메티마졸(약물)이다. 매일 먹이기 어렵다면 귀 안쪽에 바르는 젤 타입도 있다.</p>

<h2>갑상선 기능항진증과 신장 질환의 연관성</h2>
<p>갑상선 기능항진증이 있으면 혈류가 증가해 신장 기능이 높게 보일 수 있다. 치료 후 갑상선호르몬이 낮아지면 숨어있던 만성 신장 질환(CKD)이 드러나는 경우가 있다. 이 때문에 치료 시작 후 신장 수치를 함께 모니터링해야 한다.</p>

<h2>마지막으로</h2>
<p>갑상선 기능항진증은 무서운 병이 아니다. 조기 진단·치료를 시작하면 노령묘도 2~5년 이상 좋은 삶의 질을 유지할 수 있다. 10세 이상 고양이라면 연 2회 혈액검사에 T4 수치 확인을 포함하도록 수의사에게 요청하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Mooney, C.T. — Hyperthyroidism in Cats. BSAVA Manual of Feline Practice 2024",
      "Cornell Feline Health Center — Hyperthyroidism in Cats",
      "한국고양이수의사회 내분비 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-02T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 338 / Cat5 / Macro-E(비교) / Lens-L6 / Hook-H3 / Outro-O2 / Angle-RA6
  {
    id: "blog-338",
    slug: "dog-thunderstorm-anxiety-guide",
    type: "blog",
    category: 5,
    title: "강아지 천둥·폭죽 공포증 — 왜 그렇게 무서워하고, 무엇이 도움이 되나",
    subtitle: "소음 공포 vs 분리불안 구분, 안전 공간 만들기, 탈감작 훈련, 수의사 처방 옵션",
    metaTitle: "강아지 천둥·폭죽 공포증 대처 완전 가이드 | 펫지기",
    metaDescription: "강아지가 천둥이나 폭죽 소리에 심하게 불안해하는 이유와 대처법. 안전 공간 만들기, 탈감작 훈련, 천둥 셔츠, 수의사 처방 옵션을 정리했습니다.",
    body: `<p>7월 4일(미국 독립기념일)은 반려동물 보호소가 가장 바쁜 날 중 하나다. 폭죽 소리에 놀라 도망간 개들이 대거 보호소로 들어오기 때문이다. 한국에서도 명절 폭죽·천둥 시즌마다 같은 일이 벌어진다.</p>

<h2>왜 이렇게 무서워하는가</h2>
<p>강아지의 청각은 사람보다 4배 이상 예민하다. 천둥소리는 단순한 '큰 소리'가 아니라 저주파 진동·정전기·기압 변화를 동반한다. 강아지는 천둥이 오기 전부터 이것을 감지한다. 한 번 공포가 학습되면 다음번에는 더 낮은 강도에서도 반응한다.</p>

<h2>공포 반응의 스펙트럼</h2>
<ul>
<li><strong>경증</strong>: 떨림, 숨기, 보호자 근처 오기, 헐떡임</li>
<li><strong>중등도</strong>: 침 흘림, 집 안 달리기, 가구 아래 숨기</li>
<li><strong>중증</strong>: 파괴 행동, 탈출 시도, 자해, 대소변 실수</li>
</ul>

<h2>즉각적 대처 — 사건 중에 할 것</h2>
<div class="callout-dog">
<strong>천둥·폭죽 중 도움이 되는 것</strong><br>
• 미리 준비된 안전 공간 제공 (닫힌 케이지, 침대 아래)<br>
• 흰 소음(팬·에어컨·TV)으로 외부 소리 차단<br>
• 과도하게 달래지 않기 — 불안을 강화할 수 있음<br>
• 보호자가 평온하게 행동하기<br>
• 천둥 셔츠(압박 조끼) — 일부 개체에 효과
</div>

<p>'달래지 말라'는 것은 무시하라는 것이 아니다. 차분하게 곁에 있어주는 것은 도움이 된다. 과도한 안아주기·"괜찮아, 괜찮아" 반복이 오히려 불안을 강화할 수 있다는 의미다.</p>

<h2>장기 해결 — 탈감작 훈련</h2>
<p>천둥 소리 녹음을 아주 낮은 볼륨부터 틀어주며 간식으로 보상한다. 수주에 걸쳐 볼륨을 점진적으로 높인다. '소리 = 좋은 일'이라는 새로운 연상을 만드는 과정이다. 폭죽 시즌 전에 미리 시작해야 한다.</p>

<h2>수의사 처방 옵션</h2>
<ul>
<li><strong>시추린(Sileo, 덱스메데토미딘)</strong>: 구강 점막 흡수 진정제, 한국에서 처방 가능</li>
<li><strong>트라조돈·알프라졸람</strong>: 단기 항불안제, 사건 1~2시간 전 투여</li>
<li><strong>SSRI(장기 불안 치료)</strong>: 반복적 공포증이 심각한 경우</li>
</ul>

<h2>마지막으로</h2>
<p>공포증은 시간이 지나도 저절로 나아지지 않는 경우가 많다. 오히려 해가 갈수록 심해진다. 중등도 이상이라면 수의 행동 전문가 또는 행동 수의사와의 상담이 훨씬 효과적이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Overall, K.L. — Manual of Clinical Behavioral Medicine for Dogs and Cats",
      "ASPCA — Fireworks and Thunderstorm Anxiety in Dogs",
      "한국반려동물행동상담협회 공포증 행동 개선 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-03T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 339 / Cat2 / Macro-F(절차) / Lens-L4 / Hook-H1 / Outro-O2 / Angle-RA4
  {
    id: "blog-339",
    slug: "puppy-feeding-schedule-guide",
    type: "blog",
    category: 2,
    title: "강아지 나이별 급식 횟수와 양 — 생후 8주부터 성견까지 완전 가이드",
    subtitle: "월령별 권장 급식 횟수, 퍼피·성견·시니어 사료 전환 시기, 적정 체중 모니터링 방법",
    metaTitle: "강아지 나이별 급식 횟수·양 가이드 — 퍼피부터 성견까지 | 펫지기",
    metaDescription: "강아지 생후 8주부터 성견까지 월령별 급식 횟수와 양을 정리했습니다. 퍼피·성견·시니어 사료 전환 시기와 적정 체중 확인법 포함.",
    body: `<p>강아지를 처음 집에 데려오면 "하루에 몇 번, 얼마나 줘야 하나?"가 가장 먼저 떠오르는 질문이다. 나이에 따라 필요한 칼로리와 급식 횟수가 다르다.</p>

<h2>나이별 급식 횟수 기준</h2>
<table>
<thead><tr><th>월령</th><th>급식 횟수</th><th>이유</th></tr></thead>
<tbody>
<tr><td>8~12주</td><td>4회/일</td><td>위장이 작아 소량씩 자주 필요. 저혈당 예방.</td></tr>
<tr><td>3~6개월</td><td>3회/일</td><td>성장 속도 빠름. 칼로리 수요 높음.</td></tr>
<tr><td>6~12개월</td><td>2~3회/일</td><td>소형견은 2회, 대형견은 성장 위해 3회 유지 가능.</td></tr>
<tr><td>1세 이상 성견</td><td>2회/일</td><td>대부분의 성견에 적합한 표준.</td></tr>
<tr><td>7세 이상 시니어</td><td>2~3회/일</td><td>소화 기능 저하, 소량씩 자주.</td></tr>
</tbody>
</table>

<h2>급식량 결정 방법</h2>
<p>사료 포장에 있는 체중별 급여 기준표를 참고한다. 단, 이것은 하루 총량이며 급식 횟수로 나누어야 한다. 사료 브랜드마다 칼로리 밀도가 다르므로 포장의 기준표가 가장 정확하다.</p>

<div class="callout-dog">
<strong>급여량 조절 원칙</strong><br>
• BCS 4~5점 (정상 체형)이 목표<br>
• 매주 체중 측정 — 성장 중인 퍼피는 주 1~2회<br>
• 갈비뼈가 쉽게 만져지되 보이지 않는 상태가 이상적<br>
• 다 먹고 그릇을 핥는다면 충분한 것<br>
• 남긴다면 줄이기, 빠르게 비우고 더 달라면 늘리기
</div>

<h2>사료 전환 시기</h2>
<ul>
<li><strong>퍼피 → 성견 사료</strong>: 소형견(10kg 이하) 12개월, 중형견(10~25kg) 12~15개월, 대형견(25kg 이상) 18~24개월</li>
<li><strong>성견 → 시니어 사료</strong>: 7세 이후 (대형견은 6세). 단, 건강 상태에 따라 수의사와 협의.</li>
</ul>

<h3>전환 방법</h3>
<p>갑자기 바꾸면 소화 불량이 생긴다. 7~10일에 걸쳐 점진적으로 비율을 조정한다.</p>
<ul>
<li>1~3일: 기존 75% + 신규 25%</li>
<li>4~6일: 기존 50% + 신규 50%</li>
<li>7~9일: 기존 25% + 신규 75%</li>
<li>10일부터: 신규 100%</li>
</ul>

<h2>자유 급식 vs 정해진 시간 급식</h2>
<p>자유 급식(밥그릇을 항상 채워두는 방식)은 과식·비만을 유발하기 쉽다. 특히 식탐이 강한 품종(래브라도·비글)에게는 적합하지 않다. 정해진 시간에 정해진 양을 주고, 20분 내에 먹지 않으면 치우는 것이 표준 방법이다.</p>

<h2>마지막으로</h2>
<p>급식량은 고정값이 아니다. 계절·활동량·중성화 여부·건강 상태에 따라 조정이 필요하다. 중성화 후에는 기초대사량이 낮아져 동일 급여량에서 체중이 늘 수 있다. 정기 체중 체크가 가장 중요한 관리 도구다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AAFCO — Nutritional Guidelines for Dogs by Life Stage",
      "Waltham Centre for Pet Nutrition — Feeding Puppies and Adult Dogs",
      "대한수의사회 반려동물 영양 관리 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-03T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 340 / Cat6 / Macro-B(비교) / Lens-L6 / Hook-H8 / Outro-O4 / Angle-RA8
  {
    id: "blog-340",
    slug: "pet-home-memorial-ceremony",
    type: "blog",
    category: 6,
    title: "집에서 하는 작은 작별 — 반려동물을 위한 홈 추모 방법들",
    subtitle: "거창하지 않아도 되는 작별의 방식, 발도장·털·사진을 활용한 추모 아이디어, 기억을 유지하는 루틴",
    metaTitle: "반려동물 홈 추모 방법 — 집에서 하는 작별 아이디어 | 펫지기",
    metaDescription: "반려동물을 위한 집에서 하는 소박하고 의미 있는 추모 방법들. 발도장, 털 보관, 사진 앨범, 기억을 유지하는 루틴을 정리했습니다.",
    body: `<p>반려동물을 보내고 나서 "더 해줄 수 있는 것이 있었을 텐데"라는 생각이 든다면, 아직 할 수 있는 것들이 있다. 거창한 의식이 필요한 것이 아니다. 작고 조용하게 기억하는 방법들이 있다.</p>

<h2>마지막 순간을 위한 준비</h2>
<p>가능하다면 마지막 시간 동안 좋아했던 것들로 채워주는 것이 좋다. 좋아하던 간식, 좋아하던 담요, 가장 좋아했던 장소. 이것이 이미 하나의 의식이다.</p>

<h2>기억을 남기는 방법들</h2>
<h3>발도장·코도장</h3>
<p>잉크 또는 무독성 점토로 발바닥·코의 도장을 찍어 보관할 수 있다. 아직 살아있는 동안 미리 해두는 것도 좋다. 반려동물 기념품 제작 업체에서 전문적으로 만들어주는 서비스도 있다.</p>

<h3>털 보관</h3>
<p>빗질 후 모은 털이나 마지막 미용 시 잘라낸 털을 작은 케이스나 봉투에 보관한다. 털로 만든 실이나 펠트 공예품으로 제작하는 서비스도 있다.</p>

<h3>사진과 영상 정리</h3>
<p>스마트폰에 흩어진 사진을 골라 앨범을 만드는 것은 좋은 애도 방법이다. 슬라이드쇼로 만들거나 사진집으로 인쇄해두는 것도 오랫동안 소중한 위로가 된다.</p>

<h3>추모 공간 만들기</h3>
<p>집 한켠에 좋아했던 장난감·사진·촛불을 둔 작은 공간을 만들 수 있다. 특정 날짜(기일·생일)에 꽃을 바꾸는 루틴이 기억을 유지하게 해준다.</p>

<h2>기억을 나누는 방법</h2>
<ul>
<li>SNS에 추모 포스트를 올리는 것은 슬픔을 사회화하는 방법이다. 비공개로 써도 된다.</li>
<li>동물 보호 단체에 기부하는 것은 그 이름으로 다른 동물을 돕는 방식이다.</li>
<li>생전에 다니던 동물병원에 감사 인사를 전하는 것도 의미 있는 마무리다.</li>
</ul>

<h2>언제까지 슬퍼해도 되는가</h2>
<p>기간을 정할 수 없다. 2주 만에 괜찮아지는 사람도, 1년이 지나도 눈물이 나는 사람도 있다. 둘 다 정상이다. "고양이 한 마리인데"라는 말로 자신의 슬픔을 작게 만들지 않아도 된다. 그 슬픔은 사랑의 크기다.</p>

<h2>마지막으로</h2>
<p>작별은 한 번만 하지 않아도 된다. 때마다, 기억이 날 때마다, 기일이 돌아올 때마다 다시 인사해도 된다. 기억하는 것이 보내는 방법이고, 보내는 것이 기억하는 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Association for Pet Loss and Bereavement — Memorializing Your Pet",
      "Wallace Sife, Ph.D. — The Loss of a Pet",
      "한국펫로스증후군연구회 추모 활동 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-04T09:00:00.000Z",
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
  console.log("블로그 포스트 43차 시딩 완료! (blog-336 ~ blog-340)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
