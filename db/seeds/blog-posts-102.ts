import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 102 — cat3×1 + cat5×2 + cat2×1 + cat4×1 = 5편 (IDs 631-635)
// Macros: D, A, F, B, G
// Angles: RA7, RA2, RA1, RA5, RA3

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-631",
    slug: "dog-parvo-distemper-prevention",
    type: "blog",
    category: 3,
    title: "파보바이러스와 홍역 — 강아지를 죽일 수 있는 두 질환의 예방",
    subtitle: "파보·홍역 전파·증상·치사율, 예방접종 스케줄, 야외 활동 시작 시기",
    metaTitle: "강아지 파보바이러스·홍역 예방 — 전파·증상·백신 스케줄 | 펫지기",
    metaDescription: "강아지 파보바이러스와 홍역의 위험성과 예방 방법. 전파 경로, 증상과 치사율, 예방접종 스케줄, 백신 전 야외 활동을 안전하게 하는 방법을 정리했습니다.",
    body: `<p>파보바이러스 장염과 홍역(디스템퍼)은 어린 강아지에게 특히 위험한 전염병이다. 둘 다 예방접종으로 막을 수 있으므로 접종 일정을 정확히 지키는 것이 가장 중요하다. 질병의 특징과 예방 방법을 정리했다.</p>

<h2>파보바이러스 장염</h2>
<p>AVMA 자료는 파보바이러스를 환경에서 오래 살아남는 전염성 높은 바이러스로 설명한다. 감염되면 심한 구토, 혈변성 설사, 처짐, 식욕 부진이 나타나며, 어린 강아지는 탈수가 빨라 응급이다. 특별한 치료제가 없고 수액·구토 조절 등 입원 지지 치료가 중심이라 예방이 최선이다.</p>

<h2>홍역(디스템퍼)</h2>
<p>호흡기, 소화기, 신경계를 침범하는 바이러스성 질환이다. 눈곱·콧물, 기침, 열, 구토·설사로 시작하고 진행하면 경련, 근육 떨림 같은 신경 증상이 생길 수 있다. 일부는 회복 후에도 후유증이 남는다. 모든 개가 감염 위험이 있다.</p>

<table>
<thead><tr><th>구분</th><th>파보</th><th>홍역</th></tr></thead>
<tbody>
<tr><td>주요 증상</td><td>구토, 혈변성 설사, 탈수</td><td>눈곱·콧물, 기침, 열, 신경 증상</td></tr>
<tr><td>취약한 개체</td><td>어린 강아지, 미접종견</td><td>어린 강아지, 미접종견</td></tr>
<tr><td>예방</td><td>백신 + 환경 위생</td><td>백신</td></tr>
</tbody>
</table>

<h2>백신 접종 일정</h2>
<p>강아지는 어미젖으로 받은 면역(모체 이행 항체)이 백신 효과를 방해할 수 있다. 그래서 여러 번에 걸쳐 접종한다. AVMA 자료는 파보 백신 시리즈의 마지막 접종을 14~16주령 이후에 하라고 안내한다. 학술 자료에서는 첫 접종을 6~8주 무렵 시작해 약 4주 간격으로 16주령까지 추가 접종하는 일정이 소개된다. 다만 백신 종류와 개체에 따라 일정이 달라지므로 수의사와 계획을 세운다. 자세한 일정은 <a href="/blog/dog-vaccination-schedule">강아지 예방접종 스케줄</a>을 참고한다.</p>

<div class="callout-dog">
<strong>접종이 끝나기 전에는</strong><br>
• 강아지가 많이 모이는 곳(공원, 펫숍, 놀이터, 애견 카페, 미용실, 호텔)은 접종이 끝날 때까지 조심한다<br>
• 다른 개의 배설물이 있는 땅에 닿지 않게 한다<br>
• 접종 상태를 모르는 개와의 접촉을 피한다<br>
• 사회화는 안전한 환경(접종 완료견 소수, 소독된 장소)에서 진행하고 수의사와 상의한다
</div>

<h2>환경 관리</h2>
<ul>
<li>파보 바이러스는 일반 소독제로 잘 죽지 않는다. 의심되는 경우 환경 소독은 희석한 락스 등 효과가 알려진 방법을 쓰되 안전 수칙을 지킨다.</li>
<li>감염견은 격리하고, 접촉한 물건·옷·신발을 세척한다.</li>
<li>새 강아지를 입양하기 전에 이전에 파보 감염견이 있었던 장소인지 확인한다.</li>
</ul>

<h2>의심될 때</h2>
<p>구토와 설사가 반복되고 처지는 어린 강아지는 즉시 병원으로 간다. 방문 전에 전화로 증상을 알려 병원이 격리 준비를 하게 한다.</p>

<h2>마지막으로</h2>
<p>접종은 2회로 끝나는 것이 아니라 시리즈를 완료해야 효과가 확실해진다. 성견도 수의사가 권하는 간격으로 추가 접종을 받자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://ebusiness.avma.org/files/productdownloads/CanineParvo_2016.pdf — AVMA, Canine Parvovirus 보호자 안내",
      "https://ebusiness.avma.org/Files/ProductDownloads/mcm-client-brochures-canine-distemper-2022.pdf — AVMA, Canine Distemper 보호자 안내(2022)",
      "https://vmc.usask.ca/care/pet-health/pet-health-stories/companion-distemper.php — University of Saskatchewan 수의대, Preventing distemper",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-26T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-632",
    slug: "dog-aging-signs-recognition",
    type: "blog",
    category: 5,
    title: "강아지 노화 신호 인식 — '나이 들어서'로 넘기면 안 되는 것들",
    subtitle: "정상 노화 vs 질환 신호 구분, 노령견 행동 변화 의미, 정기 검진 항목",
    metaTitle: "강아지 노화 신호 — 정상 노화와 질환 구분·정기 검진 가이드 | 펫지기",
    metaDescription: "강아지 노화 신호를 올바르게 인식하는 방법. 정상 노화와 질환 신호를 구분하는 기준, 노령견 행동 변화 의미, 7세 이상 강아지 정기 검진 항목을 정리했습니다.",
    body: `<p>강아지의 노화는 서서히 오기 때문에 보호자가 변화를 '나이 탓'으로 넘기기 쉽다. 하지만 정상적인 노화와 치료가 필요한 질환의 신호는 구분해야 한다. 일반적으로 7세가 넘으면 신체 변화를 주의 깊게 보기 시작하고, 대형견은 더 일찍 노령기에 접어든다.</p>

<h2>정상적인 노화 변화</h2>
<ul>
<li>활동량이 조금 줄고 움직임이 느려진다</li>
<li>털에 흰 털이 늘어난다 (유전·스트레스·질환으로도 생기므로 노화의 확실한 신호는 아니다)</li>
<li>양쪽 눈의 수정체가 약간 뿌예진다 (핵경화)</li>
<li>청력이 조금 떨어진다</li>
<li>잠이 늘어난다</li>
</ul>

<h2>나이 탓으로 넘기면 안 되는 신호</h2>
<table>
<thead><tr><th>신호</th><th>의심되는 문제</th></tr></thead>
<tbody>
<tr><td>계단·점프 기피, 절뚝임, 일어나기 힘들어함</td><td>관절염·통증</td></tr>
<tr><td>물을 많이 마시고 소변이 늘어남</td><td>신장 질환, 당뇨, 쿠싱 등</td></tr>
<tr><td>이유 없는 체중 감소</td><td>종양, 내분비 질환, 소화기 질환, 치과 질환</td></tr>
<tr><td>입 냄새, 씹기 힘들어함</td><td>치주 질환</td></tr>
<tr><td>기침, 호흡이 가쁨, 쉽게 지침</td><td>심장·호흡기 질환</td></tr>
<tr><td>방향 감각 상실, 밤에 서성임, 배변 실수, 잠 패턴 변화</td><td>인지 기능 장애(치매)</td></tr>
<tr><td>혹이 만져짐</td><td>종양 — 검사 필요</td></tr>
</tbody>
</table>

<div class="callout-dog">
<strong>이런 경우는 바로 병원</strong><br>
• 쓰러짐, 일어서지 못할 정도의 허약, 갑작스러운 시력 상실, 발작<br>
• 하루 이상 식욕이 없다<br>
• 몇 달 사이 체중이 눈에 띄게 줄었다
</div>

<h2>시니어 케어의 기본</h2>
<ul>
<li><strong>정기 검진</strong>: 건강해 보여도 노령견은 6개월 간격 검진이 권장되는 경우가 많다. 혈액·소변 검사로 초기 질환을 찾는다.</li>
<li><strong>체중 관리</strong>: 마른 체형을 유지하면 관절 부담이 줄어든다.</li>
<li><strong>운동</strong>: 짧고 부드러운 산책을 꾸준히 한다 (<a href="/blog/senior-dog-gentle-exercise-guide">노령견 가벼운 운동 가이드</a>).</li>
<li><strong>환경</strong>: 미끄럼 방지 매트, 낮은 침대와 경사로를 설치한다.</li>
<li><strong>구강 관리</strong>: 치석과 치주 질환이 쌓이지 않게 한다.</li>
<li><strong>식이</strong>: 노령견용 사료가 모두에게 필요하지는 않다. 질환과 체중에 맞게 수의사와 정한다.</li>
</ul>

<h2>마지막으로</h2>
<p>노화는 막을 수 없지만 질환은 관리할 수 있다. 달라진 점을 기록하고 정기 검진을 받으며, 이상이 느껴지면 나이 탓으로 단정하지 말고 진료를 받자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://animal-medical-clinic.com/services/vet-education/blog/signs-your-senior-pet-needs-be-seen — Animal Medical Clinic, Signs your senior pet needs to be seen",
      "https://purina.co.nz/articles/dogs/senior/care/6-physical-changes — Purina, 6 physical changes in senior dogs",
      "https://www.revivalanimal.com/learning-center/vet-minute-signs-of-aging-in-dogs — Revival Animal Health, Vet minute: signs of aging in dogs",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-27T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-633",
    slug: "cat-window-fall-prevention",
    type: "blog",
    category: 5,
    title: "고양이 고층 추락 예방 — '고양이는 높은 곳에서 떨어져도 안전하다'는 오해",
    subtitle: "고양이 추락 사고 통계, 고층 추락 위험, 방충망 취약성, 안전 장치 설치",
    metaTitle: "고양이 추락 예방 — 고층 낙하 위험과 방충망 안전 장치 가이드 | 펫지기",
    metaDescription: "고양이 고층 추락 예방 방법. '고양이는 높은 곳에서 안전하다'는 오해, 실제 추락 사고 위험, 방충망 취약성, 안전한 창문 장치 설치법을 정리했습니다.",
    body: `<p>고양이는 균형 감각이 좋아 높은 곳에서 떨어져도 괜찮을 것 같지만, 창문이나 베란다에서 떨어지는 사고는 흔하고 심각하다. 이를 '하이라이즈 증후군'이라고 부르며 고층에서 떨어진 고양이에게 생기는 부상을 말한다. 사고는 대부분 예방할 수 있다.</p>

<h2>왜 떨어지는가</h2>
<ul>
<li>창밖의 새, 벌레, 나뭇잎을 쫓다가 몸이 나간다.</li>
<li>큰 소리에 놀라 뛰어오르거나 도망친다.</li>
<li>방충망을 발톱으로 긁거나 몸으로 밀어 방충망째 떨어진다.</li>
<li>햇볕을 쬐려고 난간이나 창턱에 오르다 미끄러진다.</li>
</ul>
<p>미국 뉴욕 동물의료센터(AMC)는 1980년대에 건물에서 떨어진 고양이를 5개월간 132마리 진료해 이 현상을 보고했다. 90%가 생존했지만 흉부 외상, 안면·머리 손상, 골절 등 심각한 부상이 많았다. 따뜻한 계절에 사고가 늘지만 창이나 베란다 문이 열려 있으면 언제든 일어난다.</p>

<h2>예방 방법</h2>
<table>
<thead><tr><th>장소</th><th>대책</th></tr></thead>
<tbody>
<tr><td>창문</td><td>튼튼한 방충망을 틈 없이 설치한다. 고양이용 방묘창(고정형 철망·강화 망)을 쓰고, 방충망은 발톱에 쉽게 찢어지므로 정기적으로 점검한다. 창을 열어야 한다면 고양이가 지나갈 수 없는 폭으로 고정한다</td></tr>
<tr><td>베란다·발코니</td><td>난간 사이와 위로 고양이가 지나가거나 뛰어넘을 수 없게 차단망을 설치한다. 완전히 안전한 구조가 아니라면 혼자 나가지 못하게 한다. 고양이를 위한 안전한 "캐티오"(밀폐 망 공간)도 방법이다</td></tr>
<tr><td>유아용 창문 안전 장치</td><td>고양이는 좁은 틈도 지나갈 수 있어 유아용 장치만으로 안전하지 않다</td></tr>
<tr><td>문 앞</td><td>현관, 베란다 문을 열고 닫을 때 고양이가 빠져나가지 않게 한다</td></tr>
</tbody>
</table>

<div class="callout-cat">
<strong>추락 사고가 났다면</strong><br>
• 겉으로 괜찮아 보여도 내부 장기 손상, 폐 손상, 골절, 턱·입천장 골절이 있을 수 있어 즉시 동물병원에 간다<br>
• 안아 올릴 때는 몸을 평평하게 받치고 최대한 움직임을 줄인다 (담요나 판에 올려 옮긴다)<br>
• 호흡이 거칠거나 출혈, 의식 저하가 있으면 응급 병원으로 직행한다
</div>

<h2>실내를 더 흥미롭게</h2>
<p>창밖만 보고 싶어 하는 고양이에게 안전한 대안을 준다. 방충망이 있는 창가에 캣타워나 선반을 두어 바깥 구경을 하게 하고, 새 영상이나 버드 피더(창문 밖 안전한 위치)를 활용해도 좋다. 놀이와 사냥 놀이로 에너지를 소모시키면 창밖에 대한 집착이 줄어든다.</p>

<h2>마지막으로</h2>
<p>고양이는 방심한 순간 떨어진다. 창문과 베란다는 집에서 가장 위험한 장소이므로 입양 전부터 안전망을 설치하자. 이사 직후나 새 집에서는 특히 한 번 더 점검한다 (<a href="/blog/cat-moving-new-home-guide">고양이 이사 가이드</a>).</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.amcny.org/pet_health_library/high-rise-syndrome-in-cats — Animal Medical Center, High Rise Syndrome in Cats",
      "https://www.webmd.com/pets/cats/cat-high-rise-syndrome — WebMD, Cat high rise syndrome",
      "https://sbxsf.trupanion.com/pet-blog/article/prevent-cat-falls — Trupanion, Open-window season: preventing cat falls",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-27T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-634",
    slug: "dog-food-controversial-ingredients",
    type: "blog",
    category: 2,
    title: "강아지 사료 논란 성분 — BHA·에톡시퀴닌·카라기난, 실제 위험한가",
    subtitle: "사료 보존제·착색제·증점제 논란 정리, 규제 기준, 과학적 근거 vs 공포 마케팅",
    metaTitle: "강아지 사료 논란 성분 — BHA·에톡시퀴닌·카라기난 실제 위험도 | 펫지기",
    metaDescription: "강아지 사료 논란 성분의 실제 위험도를 분석했습니다. BHA·에톡시퀴닌·카라기난·인공 착색제의 과학적 근거, 규제 기준, 과도한 공포와 실제 위험을 구분합니다.",
    body: `<p>사료 라벨에서 낯선 화학 성분 이름을 보면 불안해진다. 실제로 위험한 것과 과장된 공포를 구분하는 것이 중요하다.</p>

<h2>BHA·BHT — 논란의 보존제</h2>
<p>산화 방지 목적의 인공 보존제다. 고농도에서 발암 가능성 동물 연구가 있지만, 사료에 허용된 수준에서 실제 위험성은 아직 명확하지 않다. GRAS(일반적으로 안전한 것으로 인정) 지위를 유지하고 있다. 가능하면 토코페롤(비타민 E) 보존 사료를 선택하는 것이 현명하다.</p>

<h2>에톡시퀴닌 — 가장 논란 많은 성분</h2>
<p>지방 산화 방지 보존제다. 과거 농약으로 사용됐다는 이유로 공포가 크지만, FDA가 사료 내 허용 수준을 설정해 규제하고 있다. 국내 일부 사료에서 사용 중. 첨가 여부 확인 후 기피할 수 있다.</p>

<h2>카라기난 — 논란 있는 증점제</h2>
<div class="callout-dog">
<strong>카라기난 논란 요약</strong><br>
• 해조류에서 추출한 자연 증점제<br>
• 동물 연구에서 소화기 염증 가능성 제기<br>
• 그러나 사용 수준과 연구 수준 간 차이 존재<br>
• IBD 고양이·강아지 보호자는 기피 합리적<br>
• 건강한 동물에서 일상 사료 수준의 위험 근거 약함
</div>

<h2>인공 착색제</h2>
<ul>
<li>Red 40·Yellow 5·Blue 2 등: 사람 음식 안전성 논란</li>
<li>강아지는 인간만큼 색으로 먹이를 선택하지 않음 — 착색 자체가 불필요</li>
<li>불필요한 성분이므로 무착색 사료 선택이 현명</li>
</ul>

<h2>마지막으로</h2>
<p>논란 성분에 대한 공포 마케팅과 실제 과학적 위험을 구분하는 시각이 중요하다. 불필요한 성분은 피하되, 과학적 근거 없는 공포에 휘둘리지 않는 것이 균형 잡힌 접근이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "FDA — Pet Food Additives and Preservatives Safety Review 2022",
      "한국수의영양학회 사료 첨가물 안전성 평가 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-28T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-635",
    slug: "pet-breed-housing-discrimination",
    type: "blog",
    category: 4,
    title: "특정 품종 입주 거부 — 아파트·오피스텔에서 품종으로 차별받을 때",
    subtitle: "관리 규약 품종 제한 효력, 법적 대응 방법, 이웃과의 합의 전략",
    metaTitle: "반려동물 품종 입주 차별 — 법적 효력과 대응 방법 가이드 | 펫지기",
    metaDescription: "아파트에서 특정 품종 반려동물 입주를 거부당했을 때 대처 방법. 관리 규약 품종 제한 효력, 맹견 기준, 법적 대응 방법, 이웃과의 합의 전략을 정리했습니다.",
    body: `<p>"대형견은 안 돼요", "핏불은 안 됩니다"라는 입주 거부를 받은 보호자가 있다. 이런 거부가 법적으로 모두 유효한 것은 아니다.</p>

<h2>법정 맹견 규제 vs 임의 품종 제한</h2>
<p>동물보호법상 맹견(5종)에 대한 규정은 법적 근거가 있다. 그러나 공동주택 관리 규약에서 특정 품종을 임의로 금지하는 것은 법적 근거가 없는 경우가 많다.</p>

<h2>품종 제한 규약의 효력</h2>
<div class="callout-dog">
<strong>품종 제한 관련 법적 입장</strong><br>
• 맹견 5종: 법에 의한 규제 → 유효한 제한<br>
• 대형견·특정 견종 임의 금지: 법적 근거 불명확<br>
• 실제 분쟁 시 법원은 개별 사안·실제 피해 여부 종합 판단<br>
• 절대적 금지보다 관리 조건 부과가 더 합리적이라는 판례 경향
</div>

<h2>법적 대응 방법</h2>
<ul>
<li>관리 규약 원문 요청 → 근거 조항 확인</li>
<li>관리 규약이 상위 법령에 위반되는지 확인</li>
<li>입주자대표회의에 규약 개정 요청</li>
<li>국토교통부 공동주택관리 분쟁조정위원회 신청</li>
</ul>

<h2>현실적 전략</h2>
<ul>
<li>이웃 우려(소음·공격성)를 해소하는 방향으로 협상</li>
<li>책임보험 가입 증명 제시</li>
<li>기질 평가 결과 제시 (일부 전문 기관에서 실시)</li>
<li>공격 이력 없음을 수의사 소견서로 증명</li>
</ul>

<h2>마지막으로</h2>
<p>품종으로 반려동물을 판단하는 것은 개별 동물의 기질을 무시하는 것이다. 법적 대응과 동시에 이웃의 실질적 우려를 해소하는 것이 장기적으로 가장 효과적이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "공동주택관리법 제19조 관련 대법원 판례",
      "국토교통부 공동주택 관리 분쟁 사례집 2023",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-28T11:00:00.000Z",
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
  console.log("블로그 포스트 102차 시딩 완료! (blog-631 ~ blog-635)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
