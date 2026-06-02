import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 40 — cat2×2 + cat3×1 + cat5×1 + cat4×1 = 5편 (IDs 321-325)
// Macros: A, F, E, F, B
// Angles: RA2, RA5, RA3, RA6, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 321 / Cat2 / Macro-A(원인분석) / Lens-L2 / Hook-H3 / Outro-O1 / Angle-RA2
  {
    id: "blog-321",
    slug: "dog-raw-food-diet-guide",
    type: "blog",
    category: 2,
    title: "강아지 생식(로푸드) — 장점과 위험을 모두 알고 선택해야 하는 이유",
    subtitle: "생식의 종류와 구성, 세균 오염·영양 불균형 위험, 상업용 vs 자가 조리 비교, 시작 전 체크리스트",
    metaTitle: "강아지 생식(로푸드) 가이드 — 장점·위험·시작 방법 | 펫지기",
    metaDescription: "강아지 생식(로푸드)의 장점과 살모넬라·영양 불균형 위험을 모두 정리했습니다. 상업용 생식과 자가 조리 비교, 수의사가 권하는 시작 전 체크리스트.",
    body: `<p>생식(Raw Food Diet, 로푸드)은 열처리하지 않은 육류·뼈·장기·채소로 구성된 식이다. 온라인에서는 "가장 자연스러운 식이"라는 주장과 "세균 오염 위험"이라는 경고가 공존한다. 어느 쪽 주장도 완전히 틀리지 않았다.</p>

<h2>생식의 종류</h2>
<ul>
<li><strong>BARF (Biologically Appropriate Raw Food)</strong>: 근육육·뼈·장기·채소·과일 조합. 가장 널리 알려진 모델.</li>
<li><strong>PMR (Prey Model Raw)</strong>: 실제 먹이 동물의 비율을 모방. 채소 없이 근육육 80% + 뼈 10% + 장기 10%.</li>
<li><strong>상업용 냉동 생식</strong>: 영양 균형이 맞춰진 완제품 냉동 생식. 자가 조리보다 안전하고 편리.</li>
</ul>

<h2>생식 지지자들이 말하는 장점</h2>
<ul>
<li>털 윤기 및 피부 상태 개선 (보호자 체감 보고 많음)</li>
<li>변 양 감소 및 냄새 약화</li>
<li>치석 감소 (뼈를 씹는 과정에서 기계적 제거)</li>
<li>알레르기 증상 완화 (특정 가공 성분 제거 효과)</li>
</ul>

<p>단, 이 장점 대부분은 통제된 임상 연구보다 보호자 보고(anecdotal evidence)에 기반한다. 과학적으로 생식이 건식보다 우월하다는 대규모 임상 데이터는 아직 부족하다.</p>

<h2>수의학계가 우려하는 위험</h2>
<h3>세균 오염</h3>
<p>생육에는 살모넬라·캠필로박터·리스테리아가 포함될 수 있다. 강아지가 감염되면 설사·구토·패혈증이 생길 수 있다. 더 큰 문제는 무증상 보균 상태에서 사람에게 전파 가능하다는 점이다. 특히 면역이 약한 노인·임산부·어린이가 있는 가정에서 위험이 높다.</p>

<h3>영양 불균형</h3>
<p>자가 조리 생식의 가장 큰 위험이다. 칼슘·인 비율 불균형은 뼈 발달 장애로 이어진다. 특히 성장기 대형견에서 치명적일 수 있다. 영양학적으로 균형 잡힌 레시피를 짜는 것은 전문 지식이 필요하다.</p>

<h3>뼈 섭취 위험</h3>
<p>익힌 뼈(금지)와 달리 날 뼈는 상대적으로 안전하지만, 큰 관절뼈·무게를 지탱하는 뼈(대퇴골 등)는 치아 골절 위험이 있다. 뼈 조각이 소화관에 걸릴 위험도 있다.</p>

<div class="callout-dog">
<strong>생식이 상대적으로 적합하지 않은 경우</strong><br>
• 면역억제제 복용 중인 개<br>
• 암 치료 중인 개<br>
• 면역이 약한 노인·임산부·어린이와 함께 사는 가정<br>
• 건강 상태 모니터링이 어려운 보호자
</div>

<h2>상업용 생식 vs 자가 조리</h2>
<table>
<thead><tr><th>구분</th><th>상업용 냉동 생식</th><th>자가 조리 생식</th></tr></thead>
<tbody>
<tr><td>영양 균형</td><td>AAFCO 기준 맞춰진 제품 가능</td><td>전문 지식 없으면 불균형 위험</td></tr>
<tr><td>세균 위험</td><td>HPP(고압살균) 처리 제품은 낮음</td><td>상대적으로 높음</td></tr>
<tr><td>비용</td><td>건식보다 2~5배</td><td>재료비 + 시간 비용</td></tr>
<tr><td>편의성</td><td>높음</td><td>낮음</td></tr>
</tbody>
</table>

<h2>시작 전 체크리스트</h2>
<ul>
<li>수의사와 사전 상담 — 현재 건강 상태 적합성 확인</li>
<li>AAFCO 영양 기준 충족하는 상업용 완제품으로 시작</li>
<li>전환은 7~14일에 걸쳐 점진적으로</li>
<li>영양 모니터링을 위한 정기 혈액 검사 계획</li>
<li>취급 위생 철저 (손씻기·전용 도마·냉동 보관)</li>
</ul>

<h2>마지막으로</h2>
<p>생식이 모든 개에게 맞는 것은 아니다. 잘 맞는 개도 있고, 건강 문제로 이어지는 경우도 있다. 결정 전에 수의사와 상의하고, 한다면 영양 균형이 검증된 상업용 완제품으로 시작하는 것이 현명하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Freeman, L.M. et al. — Current knowledge about the risks and benefits of raw meat–based diets for dogs. JAVMA 2013",
      "AVMA (American Veterinary Medical Association) — Raw Protein Diet Policy",
      "European College of Veterinary Internal Medicine — Raw Food Feeding Statement 2018",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-24T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 322 / Cat2 / Macro-F(절차) / Lens-L5 / Hook-H1 / Outro-O3 / Angle-RA5
  {
    id: "blog-322",
    slug: "pet-food-ingredient-label-guide",
    type: "blog",
    category: 2,
    title: "반려동물 사료 성분표 읽는 법 — 좋은 사료와 나쁜 사료를 구분하는 5가지 기준",
    subtitle: "원료 표기 순서의 의미, 부산물·향미제·방부제 이해, 조단백·조지방 수치 해석, AAFCO 완전영양식 표시",
    metaTitle: "반려동물 사료 성분표 읽는 법 — 좋은 사료 고르는 기준 5가지 | 펫지기",
    metaDescription: "사료 성분표에서 원료 순서의 의미, 부산물과 향미제의 진실, 조단백 수치 해석, AAFCO 완전영양식 표시를 확인하는 방법을 정리했습니다.",
    body: `<p>마트에 가면 비슷해 보이는 사료가 수십 가지다. 가격은 다 다르고, 패키지에는 '천연', '그레인프리', '슈퍼푸드'가 쓰여 있다. 진짜 차이를 알고 싶다면 뒤에 있는 성분표를 읽어야 한다.</p>

<h2>원료 표기 순서</h2>
<p>사료 성분표는 함량이 많은 순서로 원료를 나열한다. 첫 번째 원료가 가장 많이 들어간 것이다.</p>

<div class="callout-dog">
<strong>원료 표기 해석 예시</strong><br>
좋은 신호: "닭고기, 닭간, 브라운라이스…"<br>
→ 동물성 단백질이 상위에 위치<br><br>
주의 신호: "옥수수, 옥수수글루텐밀, 가금류 부산물…"<br>
→ 곡물이 주원료, 동물성은 부산물
</div>

<h3>원료 분할(Ingredient Splitting) 주의</h3>
<p>"옥수수가루, 옥수수전분, 옥수수글루텐밀"처럼 같은 원료를 여러 형태로 나눠 표기하면 각각이 적어 보이지만 합산하면 주원료가 된다. 같은 계열 원료가 3개 이상 보이면 의심해야 한다.</p>

<h2>부산물(By-product)이란</h2>
<p>'가금류 부산물'은 근육육이 아닌 폐·간·신장·창자 등의 내장류를 의미한다. 무조건 나쁜 것은 아니다. 간·심장 등은 영양이 풍부하다. 문제는 출처가 불명확하거나 품질이 낮은 부산물이다. '닭간', '닭심장'처럼 구체적으로 명시된 것이 더 신뢰할 수 있다.</p>

<h2>조단백·조지방·조섬유 수치 해석</h2>
<ul>
<li><strong>조단백(Crude Protein)</strong>: 원료에서 질소 함량으로 계산. 단백질의 질(아미노산 구성)은 포함되지 않음. 개 성견 기준 최소 18%, 고양이 최소 26% 권장.</li>
<li><strong>조지방(Crude Fat)</strong>: 개 최소 5.5%, 고양이 최소 9% 권장. 너무 낮으면 피부·피모 문제 가능.</li>
<li><strong>수분(Moisture)</strong>: 건식 사료 최대 12%. 습식 사료는 보통 75~82%.</li>
</ul>

<p>같은 조단백 30%라도 식물성 단백질로만 채워진 것과 동물성 고기로 채워진 것은 다르다. 아미노산 프로파일이 달라지기 때문이다.</p>

<h2>AAFCO 완전영양식 표시 확인</h2>
<p>미국사료관리협회(AAFCO)의 영양 기준을 충족하면 포장에 "Complete and Balanced" 표기가 가능하다. 국내 사료는 농림축산식품부 기준을 따르지만, 수입 사료는 AAFCO 기준을 확인하면 신뢰도가 높다.</p>

<p>'보조식', '간식', '토퍼'로 표기된 제품은 단독으로 급여하면 영양 불균형이 된다. 주식용인지 반드시 확인해야 한다.</p>

<h2>방부제·향미제 체크</h2>
<ul>
<li><strong>천연 방부제</strong>: 혼합토코페롤(비타민E)·로즈마리추출물 — 비교적 안전</li>
<li><strong>합성 방부제</strong>: BHA·BHT·에톡시퀸 — 대량 섭취 시 위험 가능성, 가능하면 피하는 것 권장</li>
<li><strong>향미제(Flavoring)</strong>: 기호성 향상 목적. 구체적 성분 미표기 제품은 주의.</li>
</ul>

<h2>마지막으로</h2>
<p>완벽한 사료는 없다. 그러나 AAFCO(또는 FEDIAF) 완전영양식 기준 충족 여부, 동물성 단백질 상위 배치, 구체적인 원료명 표기를 기본으로 확인하면 선택의 기준이 생긴다. 비싼 사료가 무조건 좋은 것도, 그레인프리가 무조건 나은 것도 아니다. 성분표를 읽는 능력이 가장 유용한 도구다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AAFCO — Pet Food Labeling Requirements",
      "Tufts University Cummings School of Veterinary Medicine — Petfoodology",
      "농림축산식품부 반려동물 사료 기준 및 규격",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-25T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 323 / Cat3 / Macro-E(비교분석) / Lens-L3 / Hook-H2 / Outro-O4 / Angle-RA3
  {
    id: "blog-323",
    slug: "cat-vomiting-causes-guide",
    type: "blog",
    category: 3,
    title: "고양이 구토 — 언제 괜찮고 언제 병원을 가야 하나",
    subtitle: "헤어볼·급식 속도·이물질·신장·갑상선 등 원인별 구분, 구토물 색깔·모양으로 읽는 신호",
    metaTitle: "고양이 구토 원인별 구분 — 병원 가야 할 시점 가이드 | 펫지기",
    metaDescription: "고양이 구토는 헤어볼부터 신장 질환까지 원인이 다양합니다. 구토물 색깔·모양·빈도로 원인을 구분하고 병원에 가야 할 시점을 정리했습니다.",
    body: `<p>고양이가 구토를 하면 보호자는 불안해진다. 그러나 고양이의 모든 구토가 위험한 것은 아니다. 헤어볼을 토하는 것은 정상적인 생리 현상이다. 문제는 이것이 '괜찮은 구토'인지 '즉시 병원에 가야 하는 구토'인지를 구분하는 것이다.</p>

<h2>구토물로 원인 추정하기</h2>

<table>
<thead><tr><th>구토물 모양·색</th><th>가능한 원인</th></tr></thead>
<tbody>
<tr><td>털이 섞인 덩어리</td><td>헤어볼 — 대부분 정상</td></tr>
<tr><td>소화된 음식물 (갈색)</td><td>과식·급식 속도·위장 자극</td></tr>
<tr><td>소화 안 된 음식 (원형 그대로)</td><td>너무 빨리 먹음, 식도 문제</td></tr>
<tr><td>노란/녹색 액체 (담즙)</td><td>공복 시간 길어짐, 담낭 문제</td></tr>
<tr><td>투명한 거품</td><td>공복, 위산 과다, 헤어볼 전조</td></tr>
<tr><td>붉은색 (혈액)</td><td>위궤양·이물질·출혈 — 즉시 병원</td></tr>
<tr><td>커피찌꺼기 같은 색</td><td>소화된 혈액 — 즉시 병원</td></tr>
</tbody>
</table>

<h2>헤어볼 — 언제 정상인가</h2>
<p>장모종은 주 1~2회, 단모종은 월 1~2회까지 헤어볼 구토는 정상 범위다. 그러나 헤어볼이 너무 자주 나온다면 과도한 그루밍(스트레스 신호)이거나 소화관 운동이 느린 것일 수 있다. 헤어볼 구토 빈도를 줄이려면 정기적인 브러싱과 헤어볼 전용 사료나 보조제가 도움이 된다.</p>

<h2>급식 속도 문제</h2>
<p>너무 빨리 먹어 토하는 경우는 매우 흔하다. 특히 건식 사료를 한 번에 흡입하듯 먹는 고양이에게 나타난다. 해결법: 퍼즐 피더, 슬로우 피더 그릇, 소량씩 여러 번 나누어 급여.</p>

<h2>즉시 병원에 가야 하는 신호</h2>
<div class="callout-cat">
<strong>이런 경우 즉시 병원으로</strong><br>
• 구토가 24시간 내 3회 이상 반복<br>
• 구토물에 피(선홍색 또는 커피색)가 보임<br>
• 구토와 함께 무기력·식욕 저하·발열<br>
• 음식·물을 전혀 먹지 않으면서 구토<br>
• 배가 딱딱하게 팽창한 느낌<br>
• 구토하려는 자세는 취하지만 아무것도 나오지 않음 (장폐색 의심)
</div>

<h2>만성 구토의 원인 — 숨겨진 질환</h2>
<ul>
<li><strong>갑상선 기능항진증 (노령묘)</strong>: 체중 감소·식욕 증가·구토 삼박자.</li>
<li><strong>만성 신장 질환 (CKD)</strong>: 요독증으로 인한 구역질·구토.</li>
<li><strong>염증성 장질환 (IBD)</strong>: 체중 감소를 동반한 만성 구토·설사.</li>
<li><strong>식이 알레르기/불내증</strong>: 특정 성분에 반응하는 만성 구토.</li>
<li><strong>림프종</strong>: 노령묘에서 IBD와 증상 유사.</li>
</ul>

<p>월 2회 이상 구토가 반복된다면 단순 헤어볼·과식으로 보기 어렵다. 혈액검사·초음파 검사가 필요하다.</p>

<h2>마지막으로</h2>
<p>고양이 구토는 무시하기도, 매번 공황 상태가 되기도 어렵다. 구토 빈도·구토물 모양·동반 증상을 메모해 두는 습관이 수의사에게 가장 유용한 정보가 된다. 스마트폰으로 촬영해두면 더 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Cornell Feline Health Center — Vomiting in Cats",
      "ISFM (International Society of Feline Medicine) — Chronic Vomiting Guidelines",
      "한국고양이수의사회 소화기 질환 임상 가이드",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-06-25T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 324 / Cat5 / Macro-F(절차) / Lens-L6 / Hook-H4 / Outro-O2 / Angle-RA6
  {
    id: "blog-324",
    slug: "dog-paw-care-guide",
    type: "blog",
    category: 5,
    title: "강아지 발바닥 관리 — 계절별 주의사항과 발톱·패드 케어 완전 가이드",
    subtitle: "여름 아스팔트 화상·겨울 제설제 독성·발톱 길이 기준, 발바닥 갈라짐 예방·치료, 발 핥기 원인",
    metaTitle: "강아지 발바닥 관리 완전 가이드 — 계절별·발톱·패드 | 펫지기",
    metaDescription: "강아지 발바닥 여름 화상, 겨울 제설제 독성, 발톱 길이 기준, 패드 갈라짐 예방법을 정리했습니다. 발을 핥는 이유도 함께.",
    body: `<p>강아지의 발바닥은 생각보다 많은 정보를 담고 있다. 그리고 생각보다 훨씬 세심한 관리가 필요하다. 땅과 직접 닿는 패드, 계속 자라는 발톱, 그 사이의 털과 피부 — 각각 다른 방식으로 관리해야 한다.</p>

<h2>발패드 (풋패드) 관리</h2>
<h3>여름 — 아스팔트 화상 주의</h3>
<p>기온 32°C일 때 아스팔트 표면은 60°C를 넘는다. 맨발의 사람도 걸을 수 없는 온도다. 오전 10시~오후 4시 사이 아스팔트 산책은 피하거나 시간을 최소화한다. 체크 방법: 손등을 7초간 아스팔트에 대보고 뜨거우면 너무 뜨거운 것이다.</p>

<h3>겨울 — 제설제(염화칼슘) 독성</h3>
<p>염화칼슘은 패드를 건조·갈라지게 하고, 핥으면 위장 자극·구토를 유발할 수 있다. 산책 후 따뜻한 물로 발을 씻어주는 것이 필수다. 반려동물용 방수 부츠나 발바닥 왁스(무스)를 사용하면 예방 효과가 있다.</p>

<h3>패드 갈라짐</h3>
<p>건조한 환경에서 흔하게 발생한다. 심하면 출혈·통증이 생긴다. 반려동물용 발바닥 크림(시어버터·코코넛오일 성분)을 1~2일에 한 번 발라주면 예방 가능하다. 사람용 핸드크림은 성분 문제가 있으므로 반려동물 전용을 사용한다.</p>

<h2>발톱 관리</h2>
<h3>길이 기준</h3>
<p>강아지가 서 있을 때 발톱이 땅에 닿지 않는 것이 이상적이다. 발톱 소리가 바닥에서 계속 날 정도면 이미 너무 긴 상태다. 방치하면 보행 자세가 틀어지고 관절에 부담을 준다.</p>

<h3>깎는 방법</h3>
<p>분홍색 혈관(퀵)이 보이는 경우 혈관에서 2~3mm 앞까지만 자른다. 검은 발톱은 퀵이 보이지 않으므로 조금씩 자르며 안쪽 단면이 회색·흰색에서 분홍빛으로 바뀌는 시점에 멈춘다. 실수로 퀵을 자르면 지혈분말(퀵스탑)로 지혈한다.</p>

<div class="callout-dog">
<strong>발톱 관리 권장 주기</strong><br>
• 실내 위주 소형견: 2~3주<br>
• 야외 활동 많은 대형견: 4~6주 (아스팔트 마찰로 자연 마모)<br>
• 노령견: 자주 확인 필요 (마모 감소로 빠르게 자람)
</div>

<h2>발 사이 털 관리</h2>
<p>발가락 사이 털이 길면 이물질이 끼거나, 미끄러운 바닥에서 미끄러짐이 심해진다. 4~6주마다 발 사이 털을 발패드와 수평이 되도록 트리밍한다.</p>

<h2>발 핥기 — 언제 문제인가</h2>
<p>가끔 발을 핥는 것은 정상적인 그루밍이다. 그러나 특정 발만 집중적으로 오래 핥는다면 원인이 있다.</p>
<ul>
<li>이물질(가시·유리조각) 박힘</li>
<li>발 사이 피부염(효모·세균)</li>
<li>음식·환경 알레르기 (발 전체를 핥음)</li>
<li>스트레스·불안 행동</li>
</ul>
<p>발이 빨갛게 변색되거나 냄새가 나면 피부염이 의심된다. 동물병원 검진이 필요하다.</p>

<h2>마지막으로</h2>
<p>발바닥 관리는 목욕·빗질만큼 중요한 정기 케어다. 특히 발톱과 패드는 주기적으로 확인하는 습관이 필요하다. 강아지가 싫어한다면 어릴 때부터 천천히 익숙하게 만드는 것이 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Kennel Club — Dog Paw Care Guide",
      "Veterinary Partner — Nail Trimming in Dogs",
      "한국수의피부과학회 반려동물 발 피부염 관리 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-26T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 325 / Cat4 / Macro-B(비교) / Lens-L1 / Hook-H5 / Outro-O1 / Angle-RA1
  {
    id: "blog-325",
    slug: "animal-cruelty-reporting-guide",
    type: "blog",
    category: 4,
    title: "동물 학대를 목격했을 때 — 신고 절차와 보호자가 알아야 할 법적 권리",
    subtitle: "동물보호법 학대 정의, 신고 방법·기관, 이웃·유기동물 학대 대처, 신고 후 진행 과정",
    metaTitle: "동물 학대 신고 방법 — 절차·기관·법적 권리 가이드 | 펫지기",
    metaDescription: "동물 학대를 목격했을 때 신고하는 방법을 정리했습니다. 동물보호법 학대 정의, 신고 기관, 절차, 신고 후 진행 과정을 안내합니다.",
    body: `<p>동물이 학대받는 장면을 목격했을 때 많은 사람이 "신고하면 어떻게 되지?", "증거가 없으면 소용없나?"라며 망설인다. 절차를 알면 행동하기가 훨씬 쉬워진다.</p>

<h2>동물보호법이 정의하는 학대</h2>
<p>동물보호법 제10조(동물 학대 등의 금지)에 따라 다음 행위가 금지된다:</p>
<ul>
<li>목을 매달거나 전기충격 등 잔인한 방법으로 죽이거나 고통을 주는 행위</li>
<li>동물의 습성에 반해 지속적으로 고통을 주는 행위</li>
<li>적절한 먹이·물·거처를 제공하지 않는 방치</li>
<li>반려동물을 유기하는 행위</li>
<li>동물을 이용한 도박 또는 불법 경기 참여</li>
</ul>

<p>처벌: 학대는 3년 이하 징역 또는 3천만 원 이하 벌금. 유기는 300만 원 이하 과태료.</p>

<h2>신고 기관</h2>
<div class="callout-cat">
<strong>신고 가능 기관</strong><br>
• <strong>경찰 (112)</strong>: 즉각적 위험 상황, 현행범<br>
• <strong>동물보호센터 (지자체)</strong>: 만성적 방치·학대 의심<br>
• <strong>농림축산검역본부 동물보호과</strong>: 054-912-0660<br>
• <strong>동물보호관리시스템 (animal.go.kr)</strong>: 온라인 신고<br>
• <strong>동물보호단체</strong>: 카라·동물자유연대 등 — 접수 후 대리 신고 가능
</div>

<h2>신고 시 필요한 정보</h2>
<ul>
<li>목격 장소와 시간</li>
<li>학대 행위의 구체적 내용 (언제, 어떻게, 얼마나 자주)</li>
<li>학대자 정보 (알 수 있다면 — 필수 아님)</li>
<li>사진·동영상 증거 (있으면 유리하지만 없어도 신고 가능)</li>
</ul>

<p>증거 없이도 신고할 수 있다. 익명 신고도 가능하다.</p>

<h2>이웃의 반려동물 방치가 의심될 때</h2>
<p>며칠째 짖음이 들리고 밥이 없어 보인다면 방치 학대에 해당할 수 있다. 아파트라면 관리사무소에 먼저 확인 요청 후, 지속된다면 지자체 동물보호 담당 부서에 신고한다. 지자체 담당자가 현장 점검을 나갈 수 있다.</p>

<h2>길에서 학대당한 동물을 발견했을 때</h2>
<p>길에서 학대당한 동물을 발견하면 즉시 사진·영상을 촬영하고 112에 신고한다. 상황이 위험하다면 직접 개입보다 신고가 우선이다. 부상동물이라면 인근 동물병원이나 동물보호센터에 연락한다.</p>

<h2>신고 후 진행 과정</h2>
<ol>
<li>신고 접수 → 담당 기관 확인</li>
<li>현장 조사 (경찰 또는 지자체 동물보호 담당)</li>
<li>동물 긴급 구조 여부 판단 (위험 상황 시)</li>
<li>동물 주인 조사 및 입건 여부 결정</li>
<li>기소·행정처분 진행</li>
</ol>

<p>신고 후 진행이 느릴 수 있다. 동물보호단체에 함께 접수하면 압력과 모니터링이 병행된다.</p>

<h2>마지막으로</h2>
<p>동물 학대 신고는 불필요한 참견이 아니다. 동물보호법이 보장하는 권리이자 의무다. 목격하고 지나친 침묵보다 한 번의 신고가 생명을 구할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "동물보호법 제10조, 제46조 (2024년 개정)",
      "농림축산식품부 동물보호 신고 안내",
      "동물권행동 카라 학대 신고 가이드",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 법적 조언은 변호사 또는 관련 기관에 문의하세요.",
    status: "published",
    publishedAt: "2026-06-26T11:00:00.000Z",
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
  console.log("블로그 포스트 40차 시딩 완료! (blog-321 ~ blog-325)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
