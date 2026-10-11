import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 60 — cat3×1 + cat5×2 + cat2×1 + cat6×1 = 5편 (IDs 421-425)
// Macros: E, F, A, F, B
// Angles: RA1, RA4, RA6, RA3, RA7

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-421",
    slug: "cat-inflammatory-bowel-disease",
    type: "blog",
    category: 3,
    title: "고양이 염증성 장질환(IBD) — 구토·설사·체중 감소가 반복될 때",
    subtitle: "IBD와 림프종의 차이, 식이 관리, 스테로이드 치료, 조직 검사 필요성",
    metaTitle: "고양이 IBD 염증성 장질환 — 증상·진단·치료 완전 가이드 | 펫지기",
    metaDescription: "고양이 IBD(염증성 장질환)의 증상과 치료. 반복되는 구토·설사·체중 감소, IBD와 림프종 차이, 스테로이드 치료, 식이 관리를 정리했습니다.",
    body: `<p>고양이가 구토나 설사를 몇 주 이상 반복하고 체중이 줄어든다면 염증성 장질환(IBD)을 포함해 여러 소화기 질환을 의심할 수 있다. IBD는 위나 장의 점막에 만성 염증이 생기는 질환으로, 증상만으로는 다른 병과 구분하기 어렵다. 그래서 검사로 다른 원인을 하나씩 배제하는 과정이 필요하다.</p>

<h2>어떤 증상이 나타나나</h2>
<ul>
<li>만성 구토, 설사(혈변이 섞이기도 함)</li>
<li>체중 감소, 식욕 저하, 무기력</li>
<li>염증이 위나 소장 위쪽에 있으면 구토가 두드러지고, 대장에 있으면 설사가 두드러지는 경향이 있다.</li>
<li>일부 고양이는 영양 흡수가 안 되어 오히려 식욕이 늘기도 하며, 이는 갑상선 기능항진증과 구분해야 한다.</li>
</ul>

<div class="callout-cat">
<strong>빨리 진료받아야 하는 경우</strong><br>
• 하루 이상 먹지 못하거나 물도 마시지 않음<br>
• 반복 구토와 함께 처지고 탈수가 의심됨<br>
• 혈변이나 검은 변, 혈토<br>
• 체중이 눈에 띄게 줄고 있음
</div>

<h2>병원에서 하는 검사</h2>
<table>
<thead><tr><th>단계</th><th>목적</th></tr></thead>
<tbody>
<tr><td>혈액·분변 검사</td><td>대사 질환, 감염, 기생충, 갑상선 질환 등 다른 원인을 확인</td></tr>
<tr><td>방사선·복부 초음파</td><td>장 두께, 종괴, 림프절 이상 확인</td></tr>
<tr><td>식이 시험</td><td>음식 알레르기를 구분하기 위해 가수분해 단백질 식이나 새로운 단백질 식이를 일정 기간 급여</td></tr>
<tr><td>조직검사</td><td>확진에 필요. 내시경이나 수술로 위·장 조직을 채취하며 전신마취가 필요하다</td></tr>
</tbody>
</table>
<p>코넬 고양이건강센터는 장 림프종이 IBD와 감별하기 어려울 수 있다고 설명한다. 이 때문에 조직검사가 중요한 경우가 많다.</p>

<h2>치료와 관리</h2>
<ul>
<li><strong>식이 관리</strong>: 식이 변경에 반응하는 고양이는 적합한 식이를 계속 유지할 수 있다.</li>
<li><strong>약물</strong>: 필요하면 수의사가 항염증제나 항생제를 추가한다. 종류와 용량은 개체 상태에 따라 수의사가 정한다.</li>
<li><strong>장기 관리</strong>: 메르크 수의학 매뉴얼은 IBD 고양이 대부분이 어떤 형태로든 장기 치료가 필요하다고 설명한다.</li>
</ul>

<h2>집에서 도움이 되는 기록</h2>
<ul>
<li>구토·설사 횟수와 사료 급여 내용을 날짜별로 기록한다.</li>
<li>체중을 정기적으로 재서 변화를 본다.</li>
<li>처방식 외에 간식, 사람 음식을 임의로 더하지 않는다.</li>
</ul>

<h2>마지막으로</h2>
<p>만성 구토와 설사는 "예민한 장"으로 넘기기 쉽다. 증상이 몇 주 이어지면 원인 검사를 받고, 진단이 되면 식이와 약물을 꾸준히 조절하며 장기 관리하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/inflammatory-bowel-disease — Cornell Feline Health Center, Inflammatory Bowel Disease",
      "https://vcahospitals.com/know-your-pet/inflammatory-bowel-disease-in-cats — VCA, Inflammatory Bowel Disease in Cats",
      "https://www.merckvetmanual.com/cat-owners/digestive-disorders-of-cats/disorders-of-the-stomach-and-intestines-in-cats — Merck Veterinary Manual, Disorders of the Stomach and Intestines in Cats",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-13T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-422",
    slug: "dog-park-etiquette-complete-guide",
    type: "blog",
    category: 5,
    title: "강아지 공원 에티켓 — 모두가 즐거운 공간을 위한 기준",
    subtitle: "목줄 착용 규정, 개 싸움 중재, 다른 개 동의 없이 접근 금지, 배변 처리",
    metaTitle: "강아지 공원 에티켓 완전 가이드 — 목줄·싸움·배변 | 펫지기",
    metaDescription: "강아지와 공원을 이용할 때 에티켓. 목줄 착용 규정, 개 싸움 대처, 다른 개에게 동의 없이 접근하면 안 되는 이유, 배변 처리를 정리했습니다.",
    body: `<p>강아지 공원은 모든 사람과 동물이 공유하는 공간이다. 에티켓은 지켜야 할 의무가 아니라, 모두가 즐거운 공간을 만드는 방법이다.</p>

<h2>목줄 규정</h2>
<p>대부분의 공공 공원에서 반려동물은 목줄 착용이 의무다. 도심 공원·인도에서 목줄을 하지 않은 개는 동물보호법상 과태료 대상이 될 수 있다. '우리 개는 순해요'는 목줄을 풀어도 된다는 이유가 아니다.</p>

<h2>다른 개에게 허락 없이 다가가지 않기</h2>
<p>가장 흔한 에티켓 실수다. 아무리 사회적인 개라도, 모든 개가 낯선 개를 환영하지는 않는다. 다가가기 전 상대 보호자에게 "인사해도 될까요?"를 먼저 물어야 한다. 상대 개가 긴장해 있거나 보호자가 거절하면 즉시 물러난다.</p>

<h2>개 싸움 발생 시 대처</h2>
<div class="callout-dog">
<strong>개 싸움 중재 시 절대 하면 안 되는 것</strong><br>
• 손으로 입 사이에 끼어들기 — 물릴 위험<br>
• 소리 지르기 — 흥분 강화<br>
<br>
<strong>올바른 대처</strong><br>
• 물통으로 물 뿌리기 (집중력 끊기)<br>
• 뒷다리를 들어 올려 이동시키기 (휠배로 방법)<br>
• 큰 물건(판지·자전거)으로 사이 차단
</div>

<h2>배변 처리</h2>
<ul>
<li>배변 봉투는 항상 여분으로 준비 (1개만 가져오면 부족)</li>
<li>수거 후 지정 쓰레기통에 버리기</li>
<li>잔디 위의 소변도 물로 희석해주면 이웃 배려가 됨</li>
</ul>

<h2>사람을 무서워하는 사람 배려</h2>
<p>어린아이·개를 무서워하는 사람이 지나갈 때는 개를 옆으로 붙여 공간을 확보해준다. '착한 개'라도 상대방의 공포는 실제다.</p>

<h2>마지막으로</h2>
<p>공원 에티켓은 결국 공감이다. 내 강아지가 다른 강아지에게 갑자기 달려들면 어떨지, 내 강아지가 내 옆을 지나가면 어떨지 한 번 더 생각해보는 것이 시작이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Kennel Club — Dog Park Etiquette",
      "동물보호법 제13조 (반려동물 안전 관리 의무)",
      "한국반려동물협회 공공장소 에티켓 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-14T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-423",
    slug: "pet-friendly-cafe-restaurant-guide",
    type: "blog",
    category: 5,
    title: "반려동물 동반 카페·식당 이용 가이드 — 함께 나가는 기쁨",
    subtitle: "반려동물 동반 가능 여부 사전 확인, 현장 에티켓, 음식·음료 주의사항",
    metaTitle: "반려동물 동반 카페·식당 에티켓 완전 가이드 | 펫지기",
    metaDescription: "반려동물 동반 카페·식당 이용 방법. 사전 확인 방법, 현장 에티켓, 강아지·고양이에게 위험한 음식·음료 주의사항을 정리했습니다.",
    body: `<p>반려동물 동반 카페와 식당이 늘고 있다. 함께 나가는 경험은 반려동물과의 유대를 높이는 좋은 방법이다. 에티켓을 알고 가면 모두가 즐거운 시간이 된다.</p>

<h2>방문 전 확인사항</h2>
<ul>
<li>반려동물 허용 여부 전화·SNS로 사전 확인 (표시되어 있어도 시즌·좌석별로 다를 수 있음)</li>
<li>크기·종 제한 여부 (소형견만 가능한 곳 많음)</li>
<li>케이지 필요 여부</li>
<li>예방접종 증명서 요구 여부 (일부 펫카페)</li>
</ul>

<h2>방문 전 준비</h2>
<ul>
<li>충분한 산책으로 에너지 소진 → 실내에서 차분하게</li>
<li>휴대용 물그릇·간식·배변 봉투</li>
<li>목줄·하네스 착용</li>
<li>짧은 리드줄로 보호자 가까이 유지</li>
</ul>

<h2>현장 에티켓</h2>
<div class="callout-dog">
<strong>반려동물 동반 외출 에티켓</strong><br>
• 테이블 위에 올려두지 않기<br>
• 다른 테이블 방문·손님 식사에 방해되지 않게<br>
• 배변 시 즉시 처리 및 직원에게 알림<br>
• 과도한 짖음 시 잠시 밖으로<br>
• 다른 반려동물과의 접촉은 상대 동의 후
</div>

<h2>반려동물에게 위험한 카페 음식</h2>
<ul>
<li><strong>카페 음료</strong>: 커피·녹차·에너지 음료 — 카페인 독성</li>
<li><strong>초콜릿 케이크·코코아</strong>: 테오브로민 독성</li>
<li><strong>자일리톨 함유 식품</strong> (무설탕 껌·젤리): 극히 위험</li>
<li><strong>포도·건포도</strong>: 신장 독성</li>
<li><strong>양파·마늘</strong>: 적혈구 파괴</li>
</ul>

<h2>마지막으로</h2>
<p>반려동물 동반 외출은 준비가 전부다. 충분한 운동으로 에너지를 소진하고, 안전한 리드줄로 통제하며, 주변에 대한 배려를 갖추면 어디서든 환영받는 보호자와 반려동물이 될 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA Animal Poison Control — Toxic Foods for Pets",
      "한국반려동물협회 반려동물 동반 외출 에티켓 가이드",
      "농림축산식품부 반려동물 동반 가능 시설 정책",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-14T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-424",
    slug: "homemade-cat-food-guide",
    type: "blog",
    category: 2,
    title: "고양이 집밥(홈쿡) — 강아지와 다른 고양이 식이의 까다로운 기준",
    subtitle: "고양이 필수 영양소(타우린·아라키돈산·비타민A), 절대 금지 재료, 검증 레시피 활용",
    metaTitle: "고양이 집밥(홈쿡) 가이드 — 타우린·필수 영양소·금지 재료 | 펫지기",
    metaDescription: "고양이 집밥은 강아지보다 더 까다롭습니다. 타우린, 아라키돈산, 비타민A 등 고양이 필수 영양소, 절대 금지 재료, 안전한 레시피 활용법을 정리했습니다.",
    body: `<p>직접 만든 밥을 먹이고 싶은 마음은 이해하지만, 고양이는 개보다 영양 요구가 까다로워서 집밥의 위험이 크다. 메르크 수의학 매뉴얼은 일반적으로 시판되는 완전·균형 영양식을 권하고, 집밥은 수의 영양 전문가가 설계했을 때 안전할 수 있다고 안내한다.</p>

<h2>왜 고양이 집밥이 어려운가</h2>
<table>
<thead><tr><th>영양소</th><th>이유</th></tr></thead>
<tbody>
<tr><td>타우린</td><td>고양이는 몸에서 충분히 만들 수 없어 음식으로 공급해야 한다. 부족하면 심장 근육이 약해지는 확장성 심근병증 등이 생길 수 있다</td></tr>
<tr><td>비타민 A, 아라키돈산 등</td><td>고양이는 식물성 전구체를 충분히 전환하지 못해 동물성 급원이 필요하다</td></tr>
<tr><td>칼슘·인 균형</td><td>고기 위주(예: 고기와 밥만)로 먹이면 칼슘이 부족해질 수 있다</td></tr>
<tr><td>과다 위험</td><td>간만 지속적으로 주면 비타민 A 독성이 생길 수 있다</td></tr>
</tbody>
</table>
<p>온라인에서 흔히 보이는 레시피는 필수 영양소가 하나 이상 부족한 경우가 많다는 분석이 있다. 영양 부족은 서서히 진행되어 한참 뒤에야 증상이 나타날 수 있어 더 위험하다.</p>

<h2>집밥을 꼭 하고 싶다면</h2>
<ol>
<li>수의 영양 전문가에게 고양이의 연령, 체중, 질환에 맞는 레시피를 설계받는다.</li>
<li>레시피를 임의로 바꾸지 않는다. 재료를 바꾸면 영양 균형이 깨진다.</li>
<li>레시피에 포함된 비타민·미네랄 보충제를 반드시 쓴다.</li>
<li>6개월마다 체중, 혈액검사, 영양 평가를 받는다.</li>
<li>질병이 생기면 레시피를 다시 평가받는다.</li>
</ol>

<div class="callout-cat">
<strong>이런 변화가 보이면 진료</strong><br>
• 털이 푸석해지고 체중이 줄거나 늘어남<br>
• 활동이 줄고 숨이 가빠짐<br>
• 뼈가 약해 보이거나 걷는 모습이 이상함<br>
• 식욕이 급격히 변함
</div>

<h2>간단한 토핑은 괜찮을까</h2>
<p>주식은 완전 균형 사료로 하고, 익힌 닭고기나 흰살 생선 같은 단순한 재료를 간식 수준으로 가끔 추가하는 정도는 위험이 상대적으로 낮다. 양파, 마늘, 포도, 초콜릿은 고양이에게 독성이 있으니 절대 주지 않는다. 양념이나 소금도 넣지 않는다.</p>

<h2>마지막으로</h2>
<p>"신선한 재료"가 곧 "균형 잡힌 식사"는 아니다. 집밥을 고민한다면 먼저 수의사와 상담해 영양 전문가의 레시피를 받고, 아니라면 시판 완전식을 기본으로 하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.merckvetmanual.com/cat-owners/selecting-and-providing-a-home-for-a-cat/proper-nutrition-for-cats — Merck Veterinary Manual, Proper Nutrition for Cats",
      "https://vcahospitals.com/know-your-pet/nutrition---home-made-diets — VCA, Nutrition - Home Made Diets",
      "https://vcahospitals.com/resources/preventive-cat/nutrition/what-is-taurine-and-why-is-it-so-important — VCA, What is taurine and why is it so important?",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 집밥 전환 시 수의사 또는 수의영양사와 상담하세요.",
    status: "published",
    publishedAt: "2026-08-15T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-425",
    slug: "petloss-legacy-donation-memorial",
    type: "blog",
    category: 6,
    title: "반려동물을 기억하는 기부 — 그 사랑을 다른 생명으로 이어가기",
    subtitle: "반려동물 이름으로 하는 기부, 추모 펀드, 보호소에 물품 기증하는 방법",
    metaTitle: "반려동물 추모 기부 — 기증·기부로 사랑 이어가기 가이드 | 펫지기",
    metaDescription: "반려동물을 잃은 후 그 이름으로 할 수 있는 기부와 기증. 동물 보호 단체 기부, 물품 기증, 추모 펀드 방법을 정리했습니다.",
    body: `<p>반려동물을 보낸 뒤, 그 사랑이 다른 형태로 이어지기를 바라는 보호자가 있다. 기부나 물품 기증은 슬픔을 의미 있는 행동으로 바꾸는 방법이 될 수 있다. 다만 기부처를 고를 때는 투명성과 책임성을 확인해야 한다.</p>

<h2>이름으로 기부하기</h2>
<p>동물보호단체와 보호소 중에는 추모 기부를 받는 곳이 있다. 방식은 단체마다 다르며, 감사 메시지나 기부 증빙을 제공하는 곳도 있다. 기부 전에 단체에 직접 문의해 가능 여부를 확인한다.</p>

<h3>기부처를 고를 때 확인할 것</h3>
<ul>
<li>법인 등록 여부와 고유번호, 사업 내용</li>
<li>기부금 사용 내역과 결산 공시 공개 여부</li>
<li>기부금 영수증(세액공제) 발급 가능 여부</li>
<li>입양·보호 활동을 직접 하는 곳인지, 모금 중심인지</li>
<li>SNS 모금 글은 공식 계좌인지 확인하고 개인 계좌는 신중히</li>
</ul>
<p>동물단체 목록은 변동이 있으므로 이 글에서 특정 단체를 추천하지 않는다. 지역 보호센터나 입양했던 구조단체에 문의해 보는 것도 방법이다.</p>

<h2>물품 기증</h2>
<p>반려동물이 떠나면 쓰지 못하는 용품이 남는다. 보호소나 구조단체에서 필요한 물품이 다르므로 <strong>기증 전에 반드시 필요 물품을 확인</strong>한다.</p>
<div class="callout-cat">
<strong>기증하기 좋은 물품 예시</strong><br>
• 유통기한이 충분한 미개봉 사료·간식<br>
• 세탁한 담요·수건·방석<br>
• 이동장, 케이지 (깨끗한 것)<br>
• 위생 상태가 좋은 장난감·용품<br>
<br>
<strong>주의</strong>: 의약품은 보호소가 받지 않는 경우가 많고 보관 규정이 있으므로 기증 전에 반드시 문의한다. 질병으로 떠난 경우 감염 가능성이 있는 물품은 기증하지 않는다.
</div>

<h2>시간·재능 기부</h2>
<ul>
<li>보호소 봉사(산책, 청소, 사진 촬영)</li>
<li>임시보호 — 새로운 가족을 기다리는 동물에게 집을 제공</li>
<li>입양 홍보 글 공유</li>
</ul>
<p>임시보호나 새 입양은 슬픔이 가라앉기 전에 서두르면 떠난 아이와 비교하게 될 수 있으니, 마음의 준비가 되었는지 먼저 살핀다.</p>

<h2>이 행동이 주는 의미</h2>
<p>슬픔을 행동으로 옮기는 것이 위안이 될 수 있다고 많은 보호자가 이야기한다. 다만 효과는 사람마다 다르며, 하지 않아도 잘못된 것은 아니다. 몇 달이 지나도 일상이 힘들다면 전문 상담도 고려한다.</p>

<h2>마지막으로</h2>
<p>그 사랑은 다른 방식으로도 이어질 수 있다. 부담 없이 할 수 있는 만큼, 마음이 움직일 때 해 보자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://avma.org/resources-tools/avma-policies/avma-animal-loss-support-services — AVMA, Animal loss support services",
      "https://www.samhsa.gov/resource/dbhis/pet-loss-grief — SAMHSA, Pet Loss and Grief",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-15T11:00:00.000Z",
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
  console.log("블로그 포스트 60차 시딩 완료! (blog-421 ~ blog-425)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
