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
    body: `<p>양성 강화(Positive Reinforcement)는 원하는 행동을 할 때 보상을 주는 훈련 방식이다. 처벌 기반 훈련보다 빠르고, 부작용이 없으며, 보호자-강아지 신뢰를 강화한다.</p>

<h2>왜 양성 강화가 효과적인가</h2>
<ul>
<li>행동과 결과가 명확히 연결됨 → 빠른 학습</li>
<li>스트레스 없는 학습 → 기억 고착이 좋음</li>
<li>강아지가 훈련을 즐기게 됨 → 자발적 참여</li>
<li>처벌 기반 방식의 부작용(공격성·공포)이 없음</li>
</ul>

<h2>핵심 원칙 — 타이밍</h2>
<p>원하는 행동이 발생한 직후 0.5~1초 이내에 보상해야 한다. 늦으면 다른 행동과 연결된다. 클리커를 사용하면 정확한 타이밍 마킹에 도움이 된다.</p>

<h2>보상 선택</h2>
<ul>
<li><strong>식품 보상</strong>: 가장 효과적. 작은 크기(콩알 1/3), 빨리 먹을 수 있는 것.</li>
<li><strong>놀이 보상</strong>: 공·터그 장난감. 일부 강아지에서 음식보다 동기 부여 높음.</li>
<li><strong>칭찬</strong>: 단독으로는 효과 약함. 음식과 함께 사용.</li>
</ul>

<h2>기초 훈련 5가지</h2>
<div class="callout-dog">
<strong>기초 5가지 훈련 순서</strong><br>
1. <strong>앉아(Sit)</strong>: 가장 먼저. 간식을 코 위로 올리면 자연스럽게 앉음.<br>
2. <strong>엎드려(Down)</strong>: 앉은 상태에서 간식을 앞발 사이로 유도.<br>
3. <strong>이리와(Come)</strong>: 안전을 위한 필수 훈련.<br>
4. <strong>기다려(Stay)</strong>: 거리·시간 점진적 증가.<br>
5. <strong>눈 마주침(Watch me)</strong>: 집중력 훈련의 기초.
</div>

<h2>마지막으로</h2>
<p>훈련 세션은 짧게(5~10분), 긍정적으로 끝낸다. 어떤 훈련도 강아지가 지치거나 실패 경험이 많은 날에는 중단하는 것이 좋다. '오늘도 잘 했어'라는 기억으로 마무리하는 것이 다음 세션의 성공을 결정한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Karen Pryor — Don't Shoot the Dog",
      "American Veterinary Society of Animal Behavior — Position Statement on Training",
    ]),
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
    body: `<p>천둥·폭죽·이사·병원 방문 등 불안 상황에서 강아지에게 불안 조끼(썬더셔츠)를 입히는 보호자가 많다. 효과가 있는 것인지, 어떻게 사용해야 하는지 알아보자.</p>

<h2>압박 효과의 원리</h2>
<p>불안 조끼는 가슴·몸통에 지속적인 압박을 가해 신경계를 진정시키는 것을 목표로 한다. 사람의 심부 압박 요법(Deep Touch Pressure Therapy)에서 영감을 받은 제품이다.</p>

<h2>연구에서의 효과</h2>
<p>일부 연구에서 천둥·불꽃놀이 공포에 대한 불안 행동을 유의미하게 줄였다는 결과가 있다. 그러나 모든 강아지에게 효과적이지는 않으며, 약물 없이는 심한 불안에 충분하지 않다는 결론도 있다.</p>

<div class="callout-dog">
<strong>불안 조끼가 도움이 되는 경우</strong><br>
• 경~중등도 불안<br>
• 천둥·폭죽 등 특정 자극에 대한 반응<br>
• 이동장·차 이동 중 스트레스<br>
• 분리 불안 초기<br><br>
<strong>단독으로는 부족한 경우</strong><br>
• 심한 패닉 반응<br>
• 자해·파괴 수준의 분리불안<br>
→ 행동 수의사 상담 + 약물 병행 필요
</div>

<h2>올바른 착용법</h2>
<ul>
<li>불안 자극 발생 전 미리 착용 (자극과 함께 입히면 불안과 연결될 수 있음)</li>
<li>몸통을 가볍게 감싸는 압박 (숨 막히지 않을 정도)</li>
<li>최대 연속 2시간 착용 후 휴식</li>
<li>처음엔 짧게 입혀 익숙하게 한 후 실제 사용</li>
</ul>

<h2>마지막으로</h2>
<p>불안 조끼는 만능 해결책이 아니다. 그러나 훈련과 함께 사용하면 불안 관리에 도움이 될 수 있는 도구다. 비용 대비 시도해볼 만한 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "King, C. et al. — The Effect of a Pressure Wrap on the Behaviour of Dogs Experiencing Fear. JAVMA 2014",
      "한국반려동물행동상담협회 불안 관리 가이드",
    ]),
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
    body: `<p>택배가 오면 고양이는 박스에 먼저 들어간다. 비어있는 박스가 작을수록 더 좋아한다. 왜 그럴까.</p>

<h2>이유 1 — 은신처 본능</h2>
<p>고양이는 야생에서 포식자이면서 동시에 더 큰 포식자의 먹이이기도 했다. 사방이 막힌 공간은 배후에서 공격받지 않는 안전한 위치다. 박스 안에서 나가는 것은 보이지만, 들어오는 것은 막히는 구조가 '안전'을 의미한다.</p>

<h2>이유 2 — 체온 유지</h2>
<p>골판지는 훌륭한 단열재다. 고양이의 이상 체온은 38.5~39.2°C로 사람보다 높다. 차가운 방바닥보다 골판지 안이 따뜻하고 편안하다.</p>

<h2>이유 3 — 스트레스 완충 효과</h2>
<p>네덜란드 연구에서 보호소 고양이에게 박스를 제공했을 때 스트레스 행동이 크게 줄었다는 결과가 있다. 박스는 단순한 장난감이 아니라 심리적 안전 공간이다.</p>

<h2>이유 4 — 사각형 착시 실험</h2>
<p>2021년 연구에서 고양이가 바닥에 테이프로 그린 사각형 안에도 앉으려 한다는 것이 밝혀졌다. 심지어 착시로 만든 사각형(카니자 사각형)에도 앉으려 했다. 사각형 자체가 고양이에게 '들어가야 할 것'처럼 보인다는 이론이다.</p>

<h2>박스를 더 좋게 만들어주기</h2>
<ul>
<li>위에 구멍을 내 고양이가 들여다볼 수 있게</li>
<li>안에 평소 쓰던 담요 깔기</li>
<li>여러 박스를 연결해 미로 만들기</li>
<li>캣닙 소량 뿌리기</li>
</ul>

<h2>마지막으로</h2>
<p>택배 박스를 바로 버리지 말고 하루이틀 고양이에게 줘보자. 비용 0원의 최고 장난감이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Vinke, C.M. et al. — Will a hiding box provide stress reduction for shelter cats? Applied Animal Behaviour Science 2014",
      "Smith, G.E. et al. — If I fits I sits: A citizen science investigation into illusory contour susceptibility in domestic cats. Applied Animal Behaviour Science 2021",
    ]),
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
    title: "강아지 피부 혹 발견했을 때 — 어떤 것이 위험하고 어떤 것이 괜찮은가",
    subtitle: "지방종·낭종·비만세포종·유선종양 비교, 세침흡인검사 설명, 자가 체크 방법",
    metaTitle: "강아지 피부 혹 종류 구분 — 지방종·낭종·종양 비교 가이드 | 펫지기",
    metaDescription: "강아지 피부 혹 종류와 구분법. 지방종·낭종·비만세포종·유선종양 차이, 세침흡인검사(FNA) 설명, 집에서 할 수 있는 자가 체크 방법을 정리했습니다.",
    body: `<p>강아지를 쓰다듬다가 혹이 만져지면 걱정부터 앞선다. 대부분은 양성이지만 크기나 촉감만으로 종류를 구분하기는 어렵다. 그래서 수의사는 혹의 세포를 채취해 보는 세침흡인검사(FNA)부터 권하는 경우가 많다.</p>

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
<p>가는 바늘로 혹의 세포를 뽑아 현미경으로 확인하는 검사다. 지방종은 이 검사로 진단되는 경우가 많고, 비만세포종처럼 지방종과 비슷해 보이는 다른 종양을 가려내는 데 필요하다. 메르크 수의학 매뉴얼은 피부 종양을 절제하기 전에 세침흡인으로 비만세포종을 배제하라고 안내한다. 다만 세포검사로 알 수 있는 것에는 한계가 있어, 결과가 애매하거나 악성이 의심되면 조직검사가 이어진다.</p>

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
<li>한 달에 한 번 전신을 손으로 훑으며 새로 생긴 혹을 찾는다.</li>
<li>혹의 위치를 몸 그림에 표시하고, 날짜와 크기(자를 대고 사진)를 남긴다.</li>
<li>크기가 변하거나 모양·색이 달라지면 진료를 예약한다.</li>
<li>혹을 직접 짜거나 바늘로 찌르지 않는다.</li>
</ul>

<h2>마지막으로</h2>
<p>혹이 있다고 모두 위험한 것은 아니지만, 겉모습만으로 안전하다고 판단할 수도 없다. 새로 생긴 혹은 한 번은 검사로 확인해 두고, 이후에는 크기 변화를 기록하며 지켜보는 것이 합리적인 접근이다.</p>`,
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
  console.log("블로그 포스트 65차 시딩 완료! (blog-446 ~ blog-450)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
