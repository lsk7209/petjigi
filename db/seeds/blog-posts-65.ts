import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 65 — cat1×2 + cat5×2 + cat3×1 = 5편 (IDs 446-450)
// Macros: F, B, A, E, F
// Angles: RA3, RA6, RA1, RA4, RA7

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-446",
    slug: "positive-reinforcement-training-guide",
    type: "blog",
    category: 1,
    title: "강아지 양성 강화 훈련 완전 가이드 — 처벌 없이 더 빠르게 배우는 이유",
    subtitle: "양성 강화의 과학적 원리, 타이밍·간식 선택, 기초 5가지 훈련, 실패 없는 훈련 설계",
    metaTitle: "강아지 양성 강화 훈련 — 원리·간식·기초 훈련 완전 가이드 | 펫지기",
    metaDescription: "강아지 양성 강화 훈련의 원리와 방법. 처벌보다 빠른 이유, 타이밍·간식 선택, 앉아·엎드려·기다려 기초 훈련을 정리했습니다.",
    body: `<p>강아지 훈련법은 "혼내서 가르친다"와 "잘한 행동에 보상한다"로 크게 나뉜다. 수의 행동 전문가 단체인 AVSAB(미국수의행동학회)는 현재의 과학적 근거를 바탕으로 모든 개 훈련, 문제 행동 치료를 포함해 보상 기반 훈련만 쓰라고 권고한다. 이 글은 보상 기반 훈련이 무엇이고 어떻게 시작하는지 정리한다.</p>

<h2>용어부터 정리</h2>
<table>
<thead><tr><th>구분</th><th>의미</th><th>예시</th></tr></thead>
<tbody>
<tr><td>정적 강화 (보상 기반)</td><td>원하는 행동 뒤에 좋은 것을 주어 그 행동을 늘린다</td><td>앉았을 때 간식을 준다</td></tr>
<tr><td>부적 처벌 (보상 기반에 포함)</td><td>원치 않는 행동 뒤에 좋은 것을 거둔다</td><td>점프하면 관심을 멈추고 앉으면 다시 준다</td></tr>
<tr><td>혐오 기반 방법</td><td>불쾌한 자극으로 행동을 막는다</td><td>목줄 당기기, 전기·초크 도구, 큰 소리, 알파롤 등</td></tr>
</tbody>
</table>
<p>AVSAB는 혐오 기반 방법이 단기적으로는 행동을 멈추게 할 수 있지만 공포와 공격성을 키울 위험이 있고, 훈련이 끝난 뒤에도 영향이 남을 수 있다고 설명한다.</p>

<h2>시작하는 방법</h2>
<ol>
<li><strong>보상 정하기</strong>: 작은 간식, 장난감, 칭찬 등 그 개가 가장 좋아하는 것을 쓴다. 간식은 하루 식사량에서 일부를 빼서 비만을 막는다.</li>
<li><strong>타이밍</strong>: 행동 직후 1~2초 안에 보상한다. 클리커나 "좋아" 같은 마커 신호를 일정하게 쓰면 도움이 된다.</li>
<li><strong>쉬운 것부터</strong>: 앉아, 기다려, 이리 와처럼 한 번에 하나씩 짧은 세션(몇 분)으로 한다.</li>
<li><strong>일관성</strong>: 가족이 같은 신호와 규칙을 쓴다.</li>
<li><strong>점진적 난이도</strong>: 성공률이 높아지면 시간, 거리, 방해 요소를 조금씩 늘린다.</li>
<li><strong>보상 줄이기</strong>: 익숙해지면 보상 빈도를 점차 줄이되 칭찬은 유지한다.</li>
</ol>

<div class="callout-dog">
<strong>자주 하는 실수</strong><br>
• 잘못한 뒤 한참 지나서 혼내기 — 개는 무엇 때문에 혼나는지 연결하지 못한다<br>
• 불렀는데 오자마자 혼내기 — "오라"는 말이 나쁜 신호가 된다<br>
• 훈련 시간을 길게 잡기 — 집중력이 떨어지면 짧게 끝낸다<br>
• 문제 행동을 무시만 하고 대신할 행동을 가르치지 않기
</div>

<h2>문제 행동이 있을 때</h2>
<ul>
<li>짖음, 공격성, 분리불안처럼 심한 행동은 통증이나 질환이 원인일 수 있어 먼저 진료를 받는다.</li>
<li>공포가 기반인 행동은 처벌하면 악화되므로 둔감화·역조건화를 전문가와 진행한다.</li>
</ul>

<h2>훈련사를 고를 때</h2>
<ul>
<li>보상 기반 방법을 쓰는지, 전기·초크·큰 소리 도구를 쓰지 않는지 확인한다.</li>
<li>수업을 참관하거나 방법을 미리 설명해 달라고 요청한다.</li>
<li>심한 행동 문제는 수의 행동학 전문가와 상담한다.</li>
</ul>

<h2>마지막으로</h2>
<p>보상 기반 훈련은 단순히 "봐준다"는 뜻이 아니라, 개가 이해할 수 있는 방식으로 정확히 가르치는 방법이다. 짧고 즐겁게, 성공 경험을 쌓는 것이 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://avsab.org/resources/position-statements/ — AVSAB, Position Statements (Humane Dog Training)",
      "https://avsab.org/what-are-reward-based-training-methods-for-dogs-and-cats/ — AVSAB, What are Reward-Based Training Methods for Dogs (and Cats)?",
      "https://avsab.org/talking-terms-positive-reinforcement/ — AVSAB, Talking Terms - Positive Reinforcement",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-26T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-447",
    slug: "pregnant-pet-care-guide",
    type: "blog",
    category: 1,
    title: "임신한 반려동물 케어 — 개·고양이 임신 기간 관리 완전 가이드",
    subtitle: "임신 확인 방법, 식이·운동 조정, 출산 준비, 산후 관리",
    metaTitle: "임신한 반려동물 케어 — 개·고양이 임신 관리 가이드 | 펫지기",
    metaDescription: "임신한 강아지·고양이 케어 방법. 임신 확인, 영양·운동 조정, 출산 준비, 산후 관리를 정리했습니다.",
    body: `<p>임신한 강아지·고양이는 평소와 먹는 양, 활동량, 필요한 진료가 달라진다. 계획된 번식이든 예상 못 한 임신이든, 임신 사실을 확인하면 수의사와 상담해 관리 계획을 세우는 것이 가장 안전하다. 이 글은 보호자가 알아두면 좋은 일반 원칙을 정리한 것이다.</p>

<h2>임신 기간과 확인</h2>
<ul>
<li>개와 고양이 모두 임신 기간은 대략 두 달(약 9주) 정도이며 개체에 따라 며칠 차이가 난다.</li>
<li>개는 호르몬(릴랙신) 혈액검사로 교배 후 대략 22~27일부터 임신을 확인할 수 있고, 음성이면 1주 뒤 반복하라고 VCA는 안내한다.</li>
<li>새끼 수는 임신 후기에 엑스레이로 파악하는 것이 가장 정확하다. 분만 약 3주 전이 적당한 시기다.</li>
</ul>

<h2>임신 중 식이</h2>
<table>
<thead><tr><th>시기</th><th>개</th><th>고양이</th></tr></thead>
<tbody>
<tr><td>임신 초중기</td><td>평소 양을 유지하고 체중이 과하게 늘거나 줄지 않게 한다</td><td>임신 중 새끼 고양이용 사료를 권하는 자료가 많다</td></tr>
<tr><td>임신 후기</td><td>마지막 3주쯤에는 필요량이 평소의 약 1.5배까지 늘 수 있어 소량씩 자주 급여한다</td><td>마지막 3주에 평소보다 25~50% 정도 늘린다는 자료가 있다. 과체중이 되면 난산 위험이 커진다</td></tr>
</tbody>
</table>
<ul>
<li>개는 포장지에 임신·수유기(또는 모든 성장 단계)에 적합하다고 표시된 사료를 고른다. 대형견 자견용 사료는 칼슘·인 균형이 맞지 않아 피한다.</li>
<li>칼슘 보충제나 유제품은 임의로 먹이지 않는다. 과잉 칼슘은 출산 후 저칼슘혈증(자간증) 위험을 높일 수 있다고 알려져 있다.</li>
<li>구충·백신·영양제는 임신 중 안전성이 약마다 다르므로 반드시 수의사와 상의한다.</li>
</ul>

<h2>출산 준비</h2>
<ul>
<li>조용하고 따뜻하며 사람 왕래가 적은 분만 공간(박스+깨끗한 담요)을 미리 마련하고 익숙해지게 한다.</li>
<li>담당 병원과 야간 응급 병원의 연락처와 이동 방법을 확인해 둔다.</li>
<li>분만이 가까워지면 직장 체온을 잰다. VCA는 개의 체온이 약 37.2℃(99℉) 아래로 내려가면 24시간 안에 분만이 시작되는 경우가 많다고 설명한다. 고양이는 약 37.5℃(100℉) 아래 기준이 제시된다.</li>
<li>둥지를 만들려는 행동, 안절부절못함, 식욕 저하, 헐떡임은 분만이 가깝다는 신호다.</li>
</ul>

<div class="callout-dog">
<strong>즉시 병원에 연락해야 하는 경우</strong><br>
• 새끼 없이 녹색 분비물이 나옴<br>
• 강한 진통이 1~2시간(고양이는 45~60분) 이어지는데 새끼가 나오지 않음<br>
• 한 마리를 낳은 뒤 2시간 이상 힘을 주지 않거나, 남은 새끼가 있는 것 같은데 오래 진행이 없음<br>
• 체온이 떨어진 뒤 하루가 지나도 진통이 없음<br>
• 출혈이 계속되거나 어미가 갑자기 처지고 무기력함
</div>

<h2>산후 관리</h2>
<p>수유 중에는 어미가 더 많이 먹어야 하며, 새끼가 1~4주 정도일 때 헐떡임, 안절부절못함, 떨림이 나타나면 자간증(저칼슘혈증) 응급일 수 있다. 이때는 새끼의 수유를 중단시키고 바로 병원에 연락한다. 출산 후 분비물이 1주 이상 계속되면 태반 잔류 여부를 확인받아야 한다.</p>

<h2>마지막으로</h2>
<p>임신과 출산은 자연스러운 과정이지만 난산과 산후 응급이 생길 수 있다. 특히 첫 출산, 소형견, 고령 동물은 위험이 높으므로 정기 진료와 응급 연락처를 미리 준비하자. 임신을 원하지 않는다면 중성화는 수의사와 시기를 상담해 결정한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vcahospitals.com/know-your-pet/feeding-the-pregnant-dog — VCA, Feeding the Pregnant Dog",
      "https://vcahospitals.com/know-your-pet/breeding-for-dog-owners---problems-at-birth — VCA, Breeding for Dog Owners - Problems at Birth",
      "https://vcahospitals.com/know-your-pet/pregnancy-and-parturition-in-cats — VCA, Pregnancy and Parturition in Cats",
      "https://www.merckvetmanual.com/management-and-nutrition/management-of-reproduction-dogs-and-cats/whelping-and-queening-in-dogs-and-cats — Merck Veterinary Manual, Whelping and Queening in Dogs and Cats",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-26T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-448",
    slug: "anxiety-vest-thunder-shirt-guide",
    type: "blog",
    category: 5,
    title: "강아지 불안 조끼(썬더셔츠) — 효과가 있는지, 언제 사용하는지",
    subtitle: "압박 효과의 원리, 효과 있는 개체 vs 없는 개체, 올바른 착용법, 보완 방법",
    metaTitle: "강아지 썬더셔츠·불안 조끼 효과 — 언제 사용하는가 가이드 | 펫지기",
    metaDescription: "강아지 불안 조끼(썬더셔츠) 효과와 사용법. 압박 효과 원리, 효과 있는 개체, 올바른 착용법, 불안 대처 보완 방법을 정리했습니다.",
    body: `<p>천둥이나 폭죽에 겁먹는 강아지를 위해 불안 조끼(압박 조끼, 썬더셔츠 형태)를 고민하는 보호자가 많다. 이런 조끼는 몸통을 부드럽게 눌러 안정감을 주려는 제품이지만, 효과에 대한 근거는 아직 충분하지 않다.</p>

<h2>효과는 얼마나 확인되었나</h2>
<ul>
<li>압박 조끼의 효과를 정리한 체계적 문헌 고찰은 개의 불안을 줄인다는 근거가 제한적이라고 결론 내렸고, 보고된 부작용은 없었다.</li>
<li>일부 연구는 보호자가 평가한 결과에서 천둥 공포 행동이 줄었다고 보고했지만, 대조군이 없거나 보호자의 주관 평가라는 한계가 있다.</li>
<li>VCA는 조끼를 입히면 움직임이 제한되어 차분해 보일 수 있다는 점을 지적하며, 실제로 불안이 줄었는지는 별개라고 설명한다.</li>
</ul>
<p>정리하면 조끼는 위험이 낮아 시도해 볼 수는 있지만, 중증 공포를 해결하는 단독 방법으로 기대하기는 어렵다.</p>

<h2>더 근거가 있는 방법</h2>
<table>
<thead><tr><th>방법</th><th>내용</th></tr></thead>
<tbody>
<tr><td>둔감화·역조건화</td><td>작은 소리부터 좋은 보상(간식·놀이)과 함께 들려주며 점차 소리에 익숙해지게 한다. 소음 공포 치료 연구에서 효과적인 방법으로 꼽힌다</td></tr>
<tr><td>안전한 공간 만들기</td><td>소리가 덜 들리는 방, 크레이트, 담요가 있는 조용한 공간을 마련한다</td></tr>
<tr><td>수의사 상담</td><td>공포가 심하면 약물 치료가 필요할 수 있다. 약 종류와 용량은 수의사가 결정한다</td></tr>
</tbody>
</table>

<h2>사용할 때의 요령</h2>
<ul>
<li>천둥이나 불꽃놀이 같은 자극이 시작되기 전에 미리 입혀서 조끼와 불안이 연결되지 않게 한다.</li>
<li>몸에 맞는 크기를 고르고 숨쉬기와 움직임을 방해하지 않는지 확인한다.</li>
<li>처음에는 짧게, 집에서 편안한 상태일 때 입혀 익숙하게 한다.</li>
<li>오래 입히지 않고 정기적으로 벗겨서 피부와 열 상태를 살핀다.</li>
<li>떨림이 심하거나 숨어서 나오지 않거나 호흡이 가쁘면 조끼에 의존하지 말고 진료를 받는다.</li>
</ul>

<h2>마지막으로</h2>
<p>조끼는 보조 수단이다. 소리 공포가 계속된다면 훈련과 수의사 상담을 함께 진행하는 것이 가장 현실적인 접근이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC11639916/ — A Systematic Review of the Efficacy of Compression Wraps as an Anxiolytic in Domesticated Dogs",
      "https://vcahospitals.com/know-your-pet/anxiety-vests-for-dogs — VCA, Anxiety Vests for Dogs",
      "https://vcahospitals.com/know-your-pet/treating-fear-of-storms-and-fireworks-in-dogs — VCA, Treating Fear of Storms and Fireworks in Dogs",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-27T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-449",
    slug: "cat-cardboard-box-psychology",
    type: "blog",
    category: 5,
    title: "고양이가 박스를 좋아하는 이유 — 과학으로 읽는 고양이 심리",
    subtitle: "은신처 본능, 체온 유지, 스트레스 완충 효과, 사각형 착시 실험",
    metaTitle: "고양이 박스 좋아하는 이유 — 과학적 심리 설명 | 펫지기",
    metaDescription: "고양이가 박스를 그토록 좋아하는 이유를 과학으로 설명했습니다. 은신처 본능, 체온 유지, 스트레스 완충 효과, 사각형 착시 실험 결과를 정리했습니다.",
    body: `<p>고양이가 새 택배 상자만 보면 바로 들어가 앉는 모습은 흔하다. 왜 그런지는 아직 완전히 밝혀지지 않았지만, 연구들은 숨을 곳이 고양이의 스트레스를 줄여 줄 수 있다는 방향을 가리킨다.</p>

<h2>연구로 알려진 것</h2>
<table>
<thead><tr><th>연구</th><th>내용</th></tr></thead>
<tbody>
<tr><td>네덜란드 보호소 연구(Vinke 등, Applied Animal Behaviour Science)</td><td>새로 보호소에 온 고양이에게 숨을 상자를 주었더니 도착 직후 며칠 동안 스트레스 점수가 더 빨리 내려갔다</td></tr>
<tr><td>이후 무작위 대조 시험</td><td>상자가 있는 고양이는 적응 속도가 더 빨랐지만 입양률이나 보호소 체류 기간의 차이는 없었다</td></tr>
<tr><td>다른 연구</td><td>일부 연구에서는 상자 유무에 따른 스트레스 점수 차이가 뚜렷하지 않았다. 근거가 일관되지 않아 "효과가 확정"이라고 말하기는 어렵다</td></tr>
</tbody>
</table>
<p>소심한 고양이가 숨는 상자를 더 많이 쓴다는 연구도 있다. 숨을 곳이 없으면 고양이가 가구 밑이나 다른 물건 뒤에 스스로 은신처를 만든다는 보고도 있어, 몸을 가릴 수 있는 공간에 대한 욕구가 강하다고 해석된다.</p>

<h2>보호자가 알아두면 좋은 점</h2>
<ul>
<li><strong>은신처</strong>: 낯선 환경, 병원, 새 가족이 오는 시기에는 상자나 은신처가 안정에 도움이 될 수 있다.</li>
<li><strong>따뜻함</strong>: 좁고 둘러싸인 공간은 체온을 유지하기에 좋다는 설명이 흔하지만, 이를 직접 검증한 근거는 이번에 확인하지 못했다.</li>
<li><strong>사각형 환상</strong>: 바닥에 테이프로 그린 사각형 안에 앉는 행동에 대한 시민 과학 연구도 있지만, 이유는 아직 알려지지 않았다고 연구자들은 말한다.</li>
</ul>

<div class="callout-cat">
<strong>이럴 때는 상자 때문이 아닐 수 있다</strong><br>
• 평소와 달리 계속 숨고 나오지 않는다<br>
• 식욕이 떨어지고 화장실 사용이 바뀐다<br>
• 만지면 아파하거나 공격적으로 변했다<br>
→ 스트레스 외에 통증이나 질병이 원인일 수 있으니 진료를 받는다.
</div>

<h2>안전한 상자 활용</h2>
<ul>
<li>테이프, 스테이플러 핀, 비닐 끈 같은 이물질이 붙은 상자는 정리해서 준다.</li>
<li>가족이 많은 집이나 다묘 가정이라면 상자를 여러 개 두어 각자 숨을 곳을 마련한다.</li>
<li>낡은 상자는 교체하고, 아프거나 노령인 고양이는 낮은 입구로 만들어 준다.</li>
</ul>

<h2>마지막으로</h2>
<p>이유가 완전히 밝혀지지는 않았지만, 상자는 고양이에게 안심할 수 있는 작은 은신처다. 잘 쓰고 있다면 두고, 숨는 행동이 갑자기 늘면 건강과 환경을 함께 점검하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.sciencedirect.com/science/article/abs/pii/S0168159114002366 — Will a hiding box provide stress reduction for shelter cats? (Applied Animal Behaviour Science)",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6791553/ — The effect of a hiding box on stress levels and body weight in Dutch shelter cats; a randomized controlled trial",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4494404/ — The Use of Refuges by Communally Housed Cats",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-27T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-450",
    slug: "dog-skin-lump-guide",
    type: "blog",
    category: 3,
    title: "강아지 피부 혹 발견했을 때 — 변화 기록과 검사 상담",
    subtitle: "혹의 모양만으로 단정하지 않기, 변화 기록과 세침흡인검사 상담",
    metaTitle: "강아지 피부 혹 발견 — 기록표와 검사 상담 가이드 | 펫지기",
    metaDescription: "강아지 피부 혹의 위치와 변화를 기록하고 세침흡인검사(FNA) 등 필요한 평가를 수의사에게 물어보는 방법을 정리했습니다. 겉모습만으로 진단하지 않습니다.",
    body: `<p>강아지를 쓰다듬다가 혹이 만져지면 걱정부터 앞선다. 혹은 겉모습과 촉감만으로 양성·악성을 구분할 수 없다. 수의사는 진찰 뒤 세침흡인검사(FNA)나 조직검사가 필요한지 판단한다. <a href="https://www.merckvetmanual.com/dog-owners/skin-disorders-of-dogs/tumors-of-the-skin-in-dogs">Merck의 개 피부 종양 안내</a>도 종양의 형태가 다양해 검사로 확인해야 한다고 설명한다.</p>

<h2>흔한 혹의 종류</h2>
<table>
<thead><tr><th>종류</th><th>특징</th><th>알아둘 점</th></tr></thead>
<tbody>
<tr><td>지방종</td><td>부드럽고 움직이는 경우가 많다. 중년 이후 흔하다</td><td>대부분 양성이고 오랫동안 크기가 유지되기도 한다. 위치 때문에 불편하거나 걷기에 지장이 있으면 제거를 고려한다</td></tr>
<tr><td>침윤성 지방종</td><td>근육 사이로 파고드는 형태</td><td>겉보기 지방종과 달리 수술 범위가 커질 수 있다</td></tr>
<tr><td>지방육종</td><td>지방종의 악성 형태</td><td>전이는 드물지만 더 넓은 절제가 필요하다</td></tr>
<tr><td>비만세포종</td><td>모양이 다양하고 지방종처럼 보일 수 있다</td><td>악성 가능성이 있어 반드시 세포검사로 확인한다</td></tr>
</tbody>
</table>

<h2>세침흡인검사(FNA)란</h2>
<p>가는 바늘로 혹의 세포를 채취해 현미경으로 살피는 검사다. 지방종처럼 보이는 혹과 비만세포종 등 다른 종양을 구분하는 단서가 될 수 있다. 결과가 불명확하면 조직검사나 추가 평가가 필요할 수 있다. <a href="https://vcahospitals.com/know-your-pet/adipose-lipoma-tumors">VCA의 지방종 검사 안내</a>에서도 세침흡인 결과가 불명확한 경우 조직검사를 설명한다.</p>

<div class="callout-dog">
<strong>빨리 검사를 받아야 하는 혹</strong><br>
• 새로 생겼거나 눈에 띄게 커지는 혹<br>
• 단단하고 주변 조직에 붙어 움직이지 않는 혹<br>
• 표면이 헐거나 피·진물이 나는 혹<br>
• 만지면 붉어지거나 부기가 오르내리는 혹<br>
• 혹이 있는 강아지가 구토·식욕 저하·무기력을 보임
</div>

<h2>집에서 하는 기록 습관</h2>
<ul>
<li>평소 몸을 살펴 새로 만져지는 혹이 있으면 발견 날짜를 기록한다.</li>
<li>혹의 위치를 몸 그림에 표시하고, 날짜와 크기(자를 대고 사진)를 남긴다.</li>
<li>크기가 변하거나 모양·색이 달라지면 진료를 예약한다.</li>
<li>혹을 직접 짜거나 바늘로 찌르지 않는다.</li>
</ul>

<h2>진료에 가져갈 변화 기록</h2>
<p>사진과 날짜는 변화 설명에 도움이 되지만 혹의 종류를 판정하지 않는다. 걷기 불편함이나 출혈이 있다면 기록을 더 채우기 위해 진료를 미루지 않는다.</p>
<table>
<thead><tr><th>기록 항목</th><th>적어 둘 내용</th><th>진료에서 확인할 점</th></tr></thead>
<tbody>
<tr><td>위치·발견 시점</td><td>몸의 어느 쪽인지, 처음 본 날짜, 같은 부위의 이전 사진</td><td>다른 혹도 함께 확인해야 하는지</td></tr>
<tr><td>겉모양 변화</td><td>크기 비교 사진, 피부색 변화, 진물·출혈 여부</td><td>세침흡인 또는 조직검사가 필요한지</td></tr>
<tr><td>생활 변화</td><td>핥거나 만질 때 반응, 걷기·식욕·활동의 변화</td><td>검사와 진료의 우선순위를 어떻게 정할지</td></tr>
</tbody>
</table>
<p>혹과 함께 나타난 생활 변화는 <a href="/guide/pet-health-checkup-guide">건강검진 상담 가이드</a>의 관찰 항목과 함께 적어 두자. 출혈이나 보행 불편 등 급한 상황에는 <a href="/guide/pet-first-aid-guide">응급 대응 가이드</a>의 병원 연락 준비를 참고하고, 진료 전에는 <a href="/guide/animal-hospital-guide">동물병원 질문표</a>를 활용한다.</p>

<h2>수의사에게 물어볼 질문</h2>
<ul>
<li>이 혹에서 세침흡인검사와 조직검사는 각각 무엇을 확인할 수 있는가?</li>
<li>검사 결과가 불명확하면 다음 단계는 무엇이며 언제 다시 평가해야 하는가?</li>
<li>사진으로 기록할 변화와 더 빨리 연락해야 할 변화는 무엇인가?</li>
<li>여러 혹이 있다면 각각 검사가 필요한지 어떻게 판단하는가?</li>
</ul>
<p><a href="https://www.merckvetmanual.com/integumentary-system/tumors-of-the-skin-and-soft-tissues/connective-tissue-tumors-in-animals">Merck의 결합조직 종양 설명</a>처럼 같은 부위의 덩어리도 종류와 평가 방법이 달라질 수 있다.</p>

<h2>마지막으로</h2>
<p>혹의 종류는 만져 본 느낌이나 사진만으로 정하지 않는다. 발견 시점과 변화를 기록해 진료에서 필요한 검사와 이후 확인 계획을 상의하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.merckvetmanual.com/dog-owners/skin-disorders-of-dogs/tumors-of-the-skin-in-dogs — Merck Veterinary Manual, Tumors of the Skin in Dogs",
      "https://vcahospitals.com/know-your-pet/adipose-lipoma-tumors — VCA, Adipose (Lipoma) Tumors",
      "https://www.merckvetmanual.com/integumentary-system/tumors-of-the-skin-and-soft-tissues/connective-tissue-tumors-in-animals — Merck Veterinary Manual, Connective Tissue Tumors in Animals",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-28T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: "2026-10-12T00:00:00.000Z",
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
  console.log("블로그 포스트 65차 시딩 완료! (blog-446 ~ blog-450)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
