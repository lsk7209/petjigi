import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 58 — cat5×2 + cat3×1 + cat6×1 + cat2×1 = 5편 (IDs 411-415)
// Macros: F, A, E, B, F
// Angles: RA6, RA2, RA4, RA8, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-411",
    slug: "dog-beach-water-safety-guide",
    type: "blog",
    category: 5,
    title: "강아지와 바다·계곡 물놀이 — 안전하게 즐기기 위한 준비",
    subtitle: "물에 안전한 견종 vs 주의 견종, 익사 위험 신호, 해수 마심·이물 흡입, 귀 물 관리",
    metaTitle: "강아지 바다·계곡 물놀이 안전 가이드 | 펫지기",
    metaDescription: "강아지와 바다·계곡 물놀이 시 안전 주의사항. 익사 위험, 해수 마심, 귀 물 들어감, 구명조끼 필요성, 물 이후 케어를 정리했습니다.",
    body: `<p>바다와 계곡은 강아지에게 즐거운 곳이지만 평소 집에서는 없는 위험이 있다. 바닷물, 모래, 햇볕, 유해 조류 같은 요소를 미리 알면 사고를 대부분 막을 수 있다.</p>

<h2>장소별 위험과 대처</h2>
<table>
<thead><tr><th>위험</th><th>설명</th><th>대처</th></tr></thead>
<tbody>
<tr><td>바닷물 마시기</td><td>소량도 설사를 일으킬 수 있고, 많이 마시면 위험해질 수 있다(염분 중독)</td><td>깨끗한 물과 그릇을 챙겨 자주 마시게 한다</td></tr>
<tr><td>모래</td><td>삼키면 장에 쌓여 막힐 수 있다</td><td>모래가 묻은 공을 물고 놀지 않게 하고, 먹는 모습을 관찰</td></tr>
<tr><td>햇볕·열</td><td>털이 적은 코와 귀는 화상을 입을 수 있고, 한낮의 모래는 발바닥에 해롭다</td><td>그늘을 만들고 개용 자외선 차단제를 쓰며, 뜨거운 시간대는 피한다</td></tr>
<tr><td>유해 남조류(녹조)</td><td>고인 담수에서 번식하는 일부는 독성이 있고 치명적일 수 있다. 페인트나 완두콩 수프처럼 보이기도 한다</td><td>녹색 막이 보이는 물에 들어가거나 마시지 못하게 하고, 접촉했다면 깨끗한 물로 씻고 병원에 연락</td></tr>
<tr><td>물살·파도</td><td>당황하거나 지쳐도 알아채기 어렵다</td><td>구명조끼와 긴 줄을 쓰고, 보호자가 항상 지켜본다</td></tr>
</tbody>
</table>

<div class="callout-dog">
<strong>이런 증상이면 즉시 병원</strong><br>
• 물놀이 후 반복 구토, 심한 설사, 처짐, 비틀거림<br>
• 침을 과도하게 흘리거나 발작을 일으킴 (유해 조류 의심)<br>
• 숨이 가쁘거나 기침을 함
</div>

<h2>준비물</h2>
<ul>
<li>마실 물과 접이식 그릇</li>
<li>구명조끼, 긴 줄(안전 줄)</li>
<li>그늘막, 수건, 헹굴 물</li>
<li>발바닥 보호용 신발(뜨거운 모래·날카로운 조개껍데기 대비)</li>
<li>지역의 동반 가능 여부와 규정 확인</li>
</ul>

<h2>물놀이 후 관리</h2>
<ul>
<li>민물이나 바닷물에서 놀았다면 깨끗한 물로 털과 피부를 헹군다. 핥아서 독성 물질을 삼키는 것을 줄일 수 있다.</li>
<li>귀를 말려 외이염을 예방한다.</li>
<li>발바닥 상처, 조개에 베인 곳이 없는지 확인한다.</li>
</ul>

<h2>마지막으로</h2>
<p>물가에서는 개가 즐거워 보이는 것만 믿지 말고 마신 물의 양, 노출 시간, 컨디션을 계속 살피자. 물이 이상해 보이면 들어가지 않는 선택이 가장 안전하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.aspca.org/news/beach-day-safe-way-pet-safety-tips — ASPCA, Beach Day the Safe Way: Pet Safety Tips",
      "https://www.aspca.org/news/pet-safety-alert-rising-dangers-blue-green-algae — ASPCA, Pet Safety Alert: The Rising Dangers of Blue-Green Algae",
      "https://www.akc.org/expert-advice/travel/tips-for-taking-dog-to-beach/ — AKC, Taking Your Dog to the Beach: Tips & Safety",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-08T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-412",
    slug: "catio-outdoor-cat-enclosure-guide",
    type: "blog",
    category: 5,
    title: "캐티오(Catio) 만들기 — 실내 고양이에게 안전한 실외 경험 주기",
    subtitle: "캐티오 종류와 비용, 베란다 그물망 설치 방법, DIY vs 전문 설치 비교",
    metaTitle: "캐티오 만들기 가이드 — 베란다 그물망·DIY·설치 방법 | 펫지기",
    metaDescription: "고양이를 위한 캐티오(실외 인클로저) 만드는 방법. 종류와 비용, 베란다 그물망 설치, DIY 방법과 전문 설치 비교를 정리했습니다.",
    body: `<p>캐티오(Catio)는 고양이가 안전하게 실외 환경을 경험할 수 있는 그물망 인클로저다. 실내 전용 고양이에게 바깥 공기와 햇볕, 자연의 소리를 즐길 수 있는 공간을 만들어준다.</p>

<h2>캐티오 종류</h2>
<ul>
<li><strong>창문형</strong>: 창문에 부착하는 박스형 캐티오. 소형·저비용. 창문을 열면 고양이가 드나들 수 있음.</li>
<li><strong>베란다형</strong>: 베란다 전체를 그물망으로 둘러싸는 방식. 가장 많은 공간.</li>
<li><strong>독립형 (정원)</strong>: 마당이나 옥상에 독립 구조물. 가장 이상적이지만 공간 필요.</li>
<li><strong>터널형</strong>: 집 내부와 연결된 터널이 외부 인클로저로 이어지는 형태.</li>
</ul>

<h2>베란다 그물망 — 가장 현실적인 선택</h2>
<p>한국 아파트 거주자에게 가장 실용적이다. 베란다 전체를 반려동물용 안전 그물로 씌우는 방식이다.</p>

<div class="callout-cat">
<strong>베란다 그물망 설치 체크리스트</strong><br>
• 그물 메쉬 크기: 고양이 발이 통과하지 못하는 크기 (4cm 이하 권장)<br>
• 소재: UV 차단·방수 처리된 PE 소재<br>
• 고정: 앙카볼트·결속줄로 확실히 고정<br>
• 문 설치: 화분·청소 등 접근용 작은 문 포함<br>
• 전문 업체 시공: 20~50만 원 / DIY: 재료비 10~20만 원
</div>

<h2>안전 주의사항</h2>
<ul>
<li>그물 고정 상태 월 1회 점검 (끊어짐·풀림 확인)</li>
<li>그물과 벽 사이 틈새 없는지 확인</li>
<li>그늘 공간 제공 (직사광선 폭염 주의)</li>
<li>물그릇 설치 (실외에서 더 많이 마심)</li>
</ul>

<h2>마지막으로</h2>
<p>캐티오는 실내 고양이의 삶의 질을 크게 높이는 투자다. 바람·소리·냄새를 느끼고 새를 관찰하는 경험은 어떤 장난감도 대체할 수 없다. 베란다가 있다면 그물망 하나로 고양이에게 작은 세상을 만들어줄 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "International Cat Care — Providing Outdoor Access Safely",
      "Catio Spaces — Design and Installation Guide",
      "한국고양이보호협회 실외 경험 안전 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-09T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-413",
    slug: "cat-diabetes-management-guide",
    type: "blog",
    category: 3,
    title: "고양이 당뇨 — 진단 후 집에서 관리하는 방법",
    subtitle: "인슐린 투여 방법, 저혈당 응급 대처, 혈당 모니터링, 식이 관리",
    metaTitle: "고양이 당뇨 관리 — 인슐린 투여·혈당 모니터링·식이 | 펫지기",
    metaDescription: "고양이 당뇨 진단 후 집에서 관리하는 방법. 인슐린 투여, 저혈당 응급 대처, 혈당 모니터링, 저탄수화물 식이를 정리했습니다.",
    body: `<p>고양이 당뇨 진단은 처음엔 막막하다. 매일 인슐린 주사, 식이 관리, 혈당 모니터링 — 그러나 많은 보호자가 익숙해지고, 일부 고양이는 관리로 당뇨가 완화되기도 한다.</p>

<h2>고양이 당뇨의 특성</h2>
<p>고양이 당뇨는 대부분 제2형(인슐린 저항성)이다. 비만·저활동성·고탄수화물 식이가 주요 위험 인자다. 중성화 수컷에서 발생률이 높다.</p>

<h2>인슐린 투여 방법</h2>
<ol>
<li>인슐린 바이알을 손바닥 사이에서 부드럽게 굴리기 (흔들지 않음)</li>
<li>주사기에 처방된 용량 정확히 채우기</li>
<li>목덜미 또는 어깨 옆 피하 조직을 집어 올리기</li>
<li>45도 각도로 빠르게 삽입 → 서서히 주입</li>
<li>밥을 먹은 직후 투여 (공복 시 저혈당 위험)</li>
</ol>

<h2>저혈당 응급 대처</h2>
<div class="callout-cat">
<strong>저혈당 증상 및 대처</strong><br>
• 증상: 무기력·떨림·비틀거림·발작<br>
• 즉시: 잇몸에 꿀·시럽을 소량 바름 (삼키지 않아도 됨)<br>
• 2~5분 내 개선되면 소량 음식 제공<br>
• 개선 없으면 즉시 응급 병원
</div>

<h2>가정 혈당 모니터링</h2>
<p>당뇨 고양이 관리에서 가장 큰 변화 — 집에서 혈당을 측정하는 보호자가 늘고 있다. 귀 안쪽 또는 발바닥에서 채혈하는 방법을 수의사에게 배울 수 있다. 측정 데이터는 인슐린 용량 조정에 매우 유용하다.</p>

<h2>식이 관리</h2>
<ul>
<li><strong>저탄수화물·고단백 식이</strong>: 상업용 건식 사료의 탄수화물을 줄이기 위해 습식 비중을 높임</li>
<li><strong>당뇨 처방식</strong>: 수의사 처방 저탄수화물 처방 사료</li>
<li>간식 제한: 당분 많은 간식 금지</li>
<li>식사 시간 규칙화: 인슐린 투여와 식사 타이밍 일치</li>
</ul>

<h2>당뇨 완화(Diabetic Remission)</h2>
<p>일부 고양이에서 철저한 식이·인슐린 관리로 수개월 내 당뇨가 완화되어 인슐린이 필요 없게 되는 경우가 있다. 특히 초기 진단에서 저탄수화물 식이를 시작한 경우 완화율이 높다.</p>

<h2>마지막으로</h2>
<p>당뇨 진단은 보호자에게도 고양이에게도 도전이다. 그러나 적절히 관리된 당뇨 고양이는 좋은 삶의 질을 오래 유지할 수 있다. 첫 2~4주가 가장 어렵고, 이후엔 루틴이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Rand, J.S. — Feline Diabetes Mellitus. Kirk's Current Veterinary Therapy 2014",
      "한국고양이수의사회 당뇨 임상 관리 가이드라인",
      "International Society of Feline Medicine — Feline Diabetes Guidelines",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-09T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-414",
    slug: "pet-ashes-memorial-keepsake-ideas",
    type: "blog",
    category: 6,
    title: "반려동물 유골 보관 아이디어 — 유골함부터 기념 주얼리까지",
    subtitle: "유골함 종류·소재, 유골 보석·유리 제작 서비스, 집 보관 방법, 심리적 의미",
    metaTitle: "반려동물 유골 보관 방법 — 유골함·보석·아이디어 가이드 | 펫지기",
    metaDescription: "반려동물 유골 보관 방법. 유골함 종류와 소재, 유골 보석·유리 기념품 제작 서비스, 집에서 보관하는 방법과 심리적 의미를 정리했습니다.",
    body: `<p>화장 후 유골을 어떻게 보관하고 기억할지는 매우 개인적인 선택이다. 유골함 소재, 유골 일부로 만드는 기념물, 집에서의 보관 방법을 정리한다. 서두르지 말고 시간이 지나 마음이 바뀌어도 괜찮다.</p>

<h2>유골함 고르기</h2>
<table>
<thead><tr><th>소재</th><th>특징</th></tr></thead>
<tbody>
<tr><td>도자기·세라믹</td><td>외관이 아름답고 가장 흔하다. 떨어뜨리면 깨질 수 있다</td></tr>
<tr><td>나무</td><td>감촉이 따뜻하고 이름 각인이 가능하다. 습기에 약하다</td></tr>
<tr><td>금속</td><td>튼튼하고 모양이 단정하다</td></tr>
<tr><td>생분해 소재</td><td>자연으로 돌려보내는 방식에 쓰이며, 사용 가능 여부는 지역·시설 규정을 확인한다</td></tr>
</tbody>
</table>

<h2>유골로 만드는 기념물</h2>
<ul>
<li><strong>유리 기념물</strong>: 유골 일부를 넣어 구슬이나 하트 모양으로 만든다.</li>
<li><strong>유골 보석</strong>: 유골에서 탄소 등을 추출해 보석으로 만드는 서비스가 있다.</li>
<li><strong>유골을 섞은 작품</strong>: 물감에 소량을 섞어 초상화를 그린다.</li>
</ul>
<p>서비스마다 품질과 가격이 다르고, 유골의 일부를 업체에 보내는 방식이므로 신뢰할 수 있는 업체인지, 유골이 어떻게 취급되는지, 환불·분실 규정이 있는지 미리 확인한다. 모든 과정이 끝나기 전에는 유골 전체를 업체에 맡기지 않는 것이 안전하다.</p>

<h2>집에서 보관할 때</h2>
<ul>
<li>직사광선과 습기를 피해 서늘하고 건조한 곳에 둔다.</li>
<li>유골함에 이름과 생몰 연월일을 적어 둔다.</li>
<li>사진, 장난감, 작은 꽃으로 추모 공간을 꾸미면 마음을 가다듬는 데 도움이 된다.</li>
<li>가족 모두가 동의하는 보관 방식을 정한다.</li>
</ul>

<div class="callout-cat">
<strong>유골을 뿌리거나 묻으려면</strong><br>
• 산·바다·공원·자택 땅에 임의로 뿌리거나 묻는 것은 관련 법령상 문제가 될 수 있다<br>
• 자연장 등 합법적인 방식은 등록된 시설과 지자체에 먼저 확인한다
</div>

<h2>유골을 나누기 전에</h2>
<p>일부는 집에 모시고 일부로 기념물을 만드는 보호자도 있다. 가족과 충분히 의논한 뒤 결정하고, 한 번 나눈 유골은 되돌릴 수 없다는 점을 기억한다.</p>

<h2>마음의 문제로서의 기념물</h2>
<p>추모 물건을 곁에 두는 것을 두고 '집착'이라고 말하는 사람이 있지만, 애도는 사람마다 방식과 기간이 다르다. 미국수의사회(AVMA)도 반려동물을 잃은 슬픔을 가족을 잃은 슬픔과 유사한 것으로 인정한다. 다만 몇 달이 지나도 일상생활이 어려울 만큼 힘들다면 전문 상담을 받아 보자.</p>

<h2>마지막으로</h2>
<p>정해진 정답은 없다. 지금 마음에 와닿는 방식을 고르되, 서두르지 말고 시간이 지나 마음이 바뀌어도 괜찮다고 생각하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://avma.org/resources-tools/avma-policies/avma-animal-loss-support-services — AVMA, Animal loss support services",
      "https://www.samhsa.gov/resource/dbhis/pet-loss-grief — SAMHSA, Pet Loss and Grief",
      "https://www.dailyvet.co.kr/?p=276994 — 데일리벳, 동물장례식장 이용 비율 늘었지만 여전히 반려동물 사체를 땅에 묻는 경우 가장 많아",
    ],
    disclaimer: "이 글은 일반적인 정보 제공 목적으로 작성되었으며, 수의학적 진단·상담이나 법률 자문을 대체하지 않습니다. 장묘·사체 처리 기준은 법령과 지자체에 따라 달라질 수 있으니 진행 전 관할 지자체 등 공식 기관에서 확인하시고, 슬픔이 일상생활을 어렵게 하면 전문 상담을 받으세요.",
    status: "published",
    publishedAt: "2026-08-10T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-415",
    slug: "senior-dog-supplement-guide",
    type: "blog",
    category: 2,
    title: "노령견 보충제 — 무엇이 효과 있고 무엇이 마케팅인가",
    subtitle: "관절·인지·심장·면역 보충제 근거 수준 비교, 복용량·부작용·상호작용 주의사항",
    metaTitle: "노령견 보충제 효과 비교 — 근거 있는 것과 마케팅인 것 | 펫지기",
    metaDescription: "노령견 보충제의 효과와 근거 수준 비교. 글루코사민, 오메가3, SAMe, 코엔자임Q10 등 근거 수준과 복용량, 부작용, 구입 시 주의사항을 정리했습니다.",
    body: `<p>노령견이 되면 관절 영양제, 오메가3, 항산화제 등 보충제를 권하는 광고를 자주 보게 된다. 하지만 보충제마다 근거의 수준이 다르고, 마케팅과 실제 효과 사이에 차이가 있다. 무엇을 선택하기 전에 근거와 안전성을 먼저 살피는 것이 좋다.</p>

<h2>보충제별 근거 수준</h2>
<table>
<thead><tr><th>성분</th><th>근거 요약</th></tr></thead>
<tbody>
<tr><td>오메가3 (EPA·DHA)</td><td>골관절염 개에서 통증 완화 효과가 가장 일관되게 보고된 보충제로 소개된다. 최근 메타분석에서도 오메가3 기반 제품이 임상적 진통 효과를 보였다는 해석이 있다</td></tr>
<tr><td>글루코사민·콘드로이틴</td><td>연구 결과가 엇갈린다. 단독 제품의 효과가 입증되지 않았다는 분석이 있고, 장기 사용 안전성은 대체로 괜찮다고 설명한다</td></tr>
<tr><td>복합 제품 (난각막, 크릴 등 혼합)</td><td>일부 무작위 대조 시험이 있으나 제조사가 후원한 연구가 많아 해석에 주의가 필요하다</td></tr>
<tr><td>항산화제·치매 관련 제품</td><td>제품별로 근거가 다르며 수의사와 상의가 필요하다</td></tr>
</tbody>
</table>

<div class="callout-dog">
<strong>보충제 시작 전에 확인할 것</strong><br>
• 아프거나 절뚝이는 원인 자체가 진단되었는지 — 보충제가 약을 대신하지 않는다<br>
• 먹고 있는 약과의 상호작용 (특히 신장·간 질환, 항응고제)<br>
• 제품에 자일리톨 등 개에게 위험한 성분이 없는지<br>
• 제조사의 품질 관리와 성분표시가 명확한지
</div>

<h2>제품을 평가하는 법</h2>
<ul>
<li>"관절에 좋다" 같은 막연한 문구보다 성분과 함량이 구체적인지 본다.</li>
<li>개를 대상으로 한 연구가 있는지, 독립적으로 수행되었는지 확인한다.</li>
<li>여러 성분을 한꺼번에 시작하지 않고 하나씩 도입해 반응을 본다.</li>
<li>2~3개월 정도 사용 후 통증 반응, 활동량, 걸음걸이를 기록으로 비교한다.</li>
</ul>

<h2>보충제보다 먼저 할 것</h2>
<ul>
<li>체중 관리: 과체중을 줄이는 것이 관절 통증 완화에 가장 효과적인 방법 중 하나로 알려져 있다.</li>
<li>적절한 운동: 짧고 규칙적인 산책이 근육 유지에 도움이 된다.</li>
<li>환경 정비: 미끄럼 방지 매트, 경사로, 푹신한 잠자리.</li>
<li>정기 검진: 관절염 외에 신장·간·심장 문제도 확인한다.</li>
</ul>

<h2>마지막으로</h2>
<p>노령견 보충제는 "먹이면 좋겠지" 정도의 막연한 기대보다 필요한 이유와 근거를 확인하고 시작하는 편이 안전하다. 사람용 제품을 임의로 쓰지 말고, 수의사와 상의해 선택하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.akc.org/expert-advice/health/joint-supplements-help-dogs-arthritis/ — AKC, How Can Joint Supplements Help Dogs With Arthritis?",
      "https://www.akc.org/expert-advice/nutrition/nutrition-and-supplements-for-senior-dogs/ — AKC, Senior Dog Nutrition and Supplement Tips",
      "https://pmc.ncbi.nlm.nih.gov/articles/PMC13355649/ — Supplement use is common in Dog Aging Project participants, especially among dogs with orthopedic conditions",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-10T11:00:00.000Z",
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
  console.log("블로그 포스트 58차 시딩 완료! (blog-411 ~ blog-415)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
