import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 98 — cat3×2 + cat2×1 + cat1×1 + cat5×1 = 5편 (IDs 611-615)
// Macros: D, A, B, F, G
// Angles: RA2, RA1, RA2, RA4, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-611",
    slug: "cat-fiv-management-guide",
    type: "blog",
    category: 3,
    title: "고양이 FIV(면역결핍 바이러스) — 양성 고양이도 오래 산다",
    subtitle: "FIV 전파 경로, FIV 양성 고양이 수명, 관리 방법, 다묘 가정 위험",
    metaTitle: "고양이 FIV 양성 관리 — 전파 경로·수명·다묘 가정 가이드 | 펫지기",
    metaDescription: "고양이 FIV(면역결핍 바이러스) 양성 진단 후 관리 방법. FIV 전파 경로, 양성 고양이 수명과 삶의 질, 다묘 가정 위험도, 예방 접종 여부를 정리했습니다.",
    body: `<p>FIV 양성 진단을 받으면 많은 보호자가 포기를 생각한다. 그러나 FIV 양성 고양이는 잘 관리하면 정상 수명에 가깝게 살 수 있다.</p>

<h2>FIV란</h2>
<p>고양이 면역결핍 바이러스(Feline Immunodeficiency Virus)다. 사람의 HIV와 같은 렌티바이러스 계열이지만, 사람에게 전파되지 않는다. 면역 기능을 서서히 저하시켜 이차 감염에 취약하게 만든다.</p>

<h2>전파 경로</h2>
<ul>
<li>주로 깊은 교상(물림)을 통한 혈액 전파</li>
<li>실내 고양이끼리 그루밍·공유 밥그릇: 위험 낮음</li>
<li>어미→새끼: 가능하지만 흔하지 않음</li>
<li>성적 접촉: 가능하지만 주요 경로 아님</li>
</ul>

<h2>FIV 양성 고양이의 현실</h2>
<div class="callout-cat">
<strong>FIV 양성 고양이 예후</strong><br>
• 많은 경우 수년간 증상 없는 잠복기<br>
• 실내 생활 + 스트레스 최소화 + 정기 검진 = 정상 수명 가능<br>
• 이차 감염 조기 치료가 핵심<br>
• 백신: 국내 미승인, 해외 일부 가용하나 효과 논란
</div>

<h2>다묘 가정 위험</h2>
<p>싸움이 없고 중성화된 실내 고양이끼리는 일상 접촉으로 FIV 전파 위험이 매우 낮다. 그러나 싸움이 잦은 수컷 미중성화 고양이는 격리가 필요할 수 있다.</p>

<h2>관리 방법</h2>
<ul>
<li>완전 실내 생활 (이차 감염·사고 예방)</li>
<li>3~6개월마다 건강 검진</li>
<li>예방접종 정기 유지 (면역 보완)</li>
<li>고단백 고품질 사료 (면역 지원)</li>
<li>스트레스 최소화 (스트레스 = 면역 저하)</li>
</ul>

<h2>마지막으로</h2>
<p>FIV 양성 고양이는 특별 케어가 필요하지만, 포기할 이유가 없다. 잘 관리된 FIV 양성 고양이가 건강한 음성 고양이보다 오래 사는 경우도 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Hartmann, K. — Clinical aspects of feline immunodeficiency and feline leukemia virus infection. Vet Immunol Immunopathol 2011",
      "한국고양이수의사회 FIV 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-16T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-612",
    slug: "dog-probiotic-prebiotic-guide",
    type: "blog",
    category: 2,
    title: "강아지 프로바이오틱스 — 언제 필요하고 어떤 제품을 골라야 하나",
    subtitle: "프로바이오틱스 효과 근거, 항생제 치료 중 활용, 사람용 vs 강아지 전용",
    metaTitle: "강아지 프로바이오틱스 가이드 — 효과·시기·제품 선택 | 펫지기",
    metaDescription: "강아지 프로바이오틱스가 효과 있는 경우와 선택 방법. 항생제 치료 중 활용, 설사·소화 장애 보조, 사람용 프로바이오틱스 사용 가능 여부를 정리했습니다.",
    body: `<p>강아지에게도 프로바이오틱스가 유행이다. 그러나 아무 때나 아무 제품을 주는 것이 아니라 필요한 상황과 올바른 선택이 중요하다.</p>

<h2>프로바이오틱스가 도움이 되는 상황</h2>
<ul>
<li>항생제 치료 중 및 치료 후 (장내 균총 복구)</li>
<li>급성 소화 불량·설사 (스트레스성)</li>
<li>사료 전환 기간</li>
<li>여행·새 환경 스트레스 전후</li>
<li>만성 소화기 질환 보조 (IBD 등 수의사 권고 하)</li>
</ul>

<h2>효과가 제한적인 상황</h2>
<div class="callout-dog">
<strong>프로바이오틱스 한계</strong><br>
• 건강한 강아지 일상 보충 — 효과 근거 약함<br>
• 심각한 감염·구조적 소화기 질환 — 주 치료 대체 불가<br>
• 한 번 투여로 장내 균총 '리셋' 기대 — 비현실적
</div>

<h2>강아지 전용 vs 사람용</h2>
<ul>
<li>강아지 장내 균총은 사람과 다름 (락토바실루스 종류 차이)</li>
<li>강아지 전용 제품이 이상적 (특이적 균주 포함)</li>
<li>사람용 프로바이오틱스: 무해하지만 효과 근거 약함</li>
<li>CFU(세균 수): 최소 10억 CFU 이상 제품 권장</li>
</ul>

<h2>제품 선택 기준</h2>
<ul>
<li>특정 균주 명시 (Lactobacillus acidophilus, Bifidobacterium 등)</li>
<li>CFU 수와 유효 기간 표기</li>
<li>냉장 보관 여부 (일부 균주 냉장 필수)</li>
<li>개 전용 또는 수의사 추천 제품</li>
</ul>

<h2>마지막으로</h2>
<p>프로바이오틱스는 특정 상황에서 유용한 보조 도구다. 항생제 후 장 회복, 스트레스성 설사 — 이런 경우에 활용하는 것이 가장 근거 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bybee, S.N. et al. — Effect of the probiotic Enterococcus faecium SF68 on presence of diarrhea in cats and dogs housed in an animal shelter. J Vet Intern Med 2011",
      "한국수의영양학회 프로바이오틱스 사용 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-17T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-613",
    slug: "dog-cherry-eye-guide",
    type: "blog",
    category: 3,
    title: "강아지 체리 아이 — 눈에 빨간 덩어리가 튀어나왔을 때",
    subtitle: "체리 아이 원인, 수술 vs 비수술 선택 기준, 수술 후 관리, 고위험 품종",
    metaTitle: "강아지 체리 아이 — 원인·수술 기준·수술 후 관리 가이드 | 펫지기",
    metaDescription: "강아지 눈 안쪽에 빨간 덩어리가 생기는 체리 아이 원인과 치료. 제3안검 탈출 증상, 수술 기준, 집어넣기 vs 절제 비교, 수술 후 관리를 정리했습니다.",
    body: `<p>체리아이(cherry eye)는 눈 안쪽 구석에서 붉은 덩어리가 튀어나오는 질환이다. 제3안검(순막)에 있는 눈물샘이 제자리를 벗어나 밖으로 빠져나온 상태다. 보기에는 단순한 혹 같지만, 방치하거나 잘못 처치하면 안구건조증으로 이어질 수 있어 치료 방향을 알아 두는 것이 좋다.</p>

<h2>원인과 호발 견종</h2>
<p>제3안검 눈물샘을 고정하는 결합 조직이 약해서 생기는 것으로 알려져 있다. 어린 강아지에서 흔하고, 코커 스패니얼, 불독, 비글, 시츄, 라사압소 등의 견종에서 많이 보고된다. 한쪽 눈에서 먼저 생기고 나중에 반대쪽에도 생길 수 있다.</p>

<h2>증상</h2>
<ul>
<li>눈 안쪽 구석에서 분홍색~붉은색 덩어리가 보인다 (간헐적으로 들어갔다 나오기도 한다)</li>
<li>눈곱, 눈물, 결막 충혈</li>
<li>눈을 비비거나 앞발로 긁음</li>
<li>덩어리가 오래 노출되면 건조, 염증, 궤양이 생길 수 있다</li>
</ul>

<h2>치료: 제거하지 말고 제자리로</h2>
<div class="callout-dog">
<strong>왜 눈물샘을 제거하면 안 될까</strong><br>
• 제3안검 눈물샘은 눈물 생산에 기여한다<br>
• VCA 자료에 따르면 이 눈물샘을 제거한 개는 나중에 안구건조증(건성 각결막염)에 걸리기 쉽다<br>
• 그래서 현재는 눈물샘을 제자리에 복원하는 수술이 기본이다
</div>

<table>
<thead><tr><th>수술 방법</th><th>설명</th></tr></thead>
<tbody>
<tr><td>포켓(주머니) 법</td><td>제3안검 안쪽에 새 주머니를 만들어 눈물샘을 넣고 봉합한다. 안과 수의사가 선호하는 방법 중 하나로 소개된다</td></tr>
<tr><td>고정(택킹) 법</td><td>눈물샘을 주변 조직에 봉합해 고정한다. 방법과 위치에 따라 눈 움직임에 영향을 줄 수 있어 술자 판단이 중요하다</td></tr>
</tbody>
</table>
<p>재발하는 경우가 있어 다른 방법으로 다시 수술하기도 한다. 어느 방법이 맞는지는 개체의 상태와 수술 경험에 따라 달라지므로 안과 진료가 가능한 병원에서 상담한다.</p>

<h2>수술 전 관리</h2>
<ul>
<li>덩어리를 손으로 밀어 넣거나 마사지하는 방법이 일시적으로 효과가 있다는 의견도 있지만, 수의사 지도 없이 하지 않는다.</li>
<li>눈을 비비지 못하게 넥칼라를 씌우고, 건조·염증이 심하면 점안제를 처방받는다.</li>
<li>덩어리가 커지고 붉게 부어 있다면 빠르게 진료를 받는 것이 좋다.</li>
</ul>

<h2>수술 후 관리</h2>
<ul>
<li>처방받은 점안제와 항생제를 정해진 일정대로 사용한다.</li>
<li>눈을 비비지 않도록 넥칼라를 유지한다.</li>
<li>다시 튀어나오거나 부기, 분비물이 늘면 재진 받는다.</li>
</ul>

<h2>마지막으로</h2>
<p>체리아이는 방치한다고 저절로 낫는 경우가 드물다. 눈물샘을 보존하는 방향으로 치료해야 나중에 안구건조증을 피할 수 있다. 증상이 보이면 안과 진료가 가능한 병원을 찾자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vcahospitals.com/-/media/2/vca/documents/hospitals/virginia/southpaws/prolapsed_gland_third_eyelid_cherryeye_southpaws.ashx — VCA SouthPaws, Prolapsed gland of the third eyelid (Cherry eye)",
      "https://www.acvo.org/tips-treatments-tricks/zwylgfp4x7lp4gp8f87p934lewy2tg — ACVO, Cherry eye: should it stay or should it go?",
      "https://vetmedbiosci.colostate.edu/vth/services/ophthalmology/cherry-eye/ — Colorado State University 수의대, Cherry Eye",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-17T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-614",
    slug: "hamster-adoption-beginner-guide",
    type: "blog",
    category: 1,
    title: "햄스터 입양 초보 가이드 — 야행성 작은 생명과 함께하기",
    subtitle: "햄스터 종류별 특성, 케이지 설치, 먹이, 수명, 혼자 vs 함께 키우기",
    metaTitle: "햄스터 입양 가이드 — 종류·케이지·먹이·수명 완전 정리 | 펫지기",
    metaDescription: "햄스터 입양을 위한 초보자 가이드. 골든·드워프 종류별 특성, 케이지 최소 크기, 먹이와 금지 식품, 수명, 혼자 키우기 vs 함께 키우기를 정리했습니다.",
    body: `<p>햄스터는 작아서 키우기 쉬워 보이지만 야행성이고 수명이 짧으며 사육 환경이 중요하다. 입양하기 전에 종류별 특성과 필수 준비물을 확인해 보자.</p>

<h2>기본 특성</h2>
<ul>
<li><strong>수명</strong>: 대체로 2~3년 안팎으로 안내되며 종과 개체, 관리에 따라 다르다.</li>
<li><strong>야행성</strong>: 낮에 잠을 자고 저녁~밤에 활동한다. 낮에 억지로 깨우면 스트레스를 받고 물 수 있다.</li>
<li><strong>단독 생활</strong>: 시리안 햄스터는 단독 생활이 원칙이다. 함께 두면 심하게 싸울 수 있다. 드워프 종은 어릴 때 합사하면 가능하다는 자료도 있지만 위험하다는 의견도 있어 한 마리씩 키우는 것이 안전하다.</li>
</ul>

<h2>케이지와 환경</h2>
<table>
<thead><tr><th>항목</th><th>권장</th></tr></thead>
<tbody>
<tr><td>케이지 크기</td><td>가능한 한 넓게. 일부 자료는 시리안은 최소 약 80×50cm 이상을 권한다. 층이 많은 케이지보다 바닥 면적이 넓고 깊은 것이 낫다</td></tr>
<tr><td>쳇바퀴</td><td>바닥이 막힌 닫힌 형태. 달릴 때 등이 휘지 않는 크기여야 한다 (시리안은 지름이 큰 것)</td></tr>
<tr><td>바닥재</td><td>종이 계열이나 아스펜 우드칩. 삼나무·소나무 바닥재는 호흡기에 해로울 수 있어 피한다</td></tr>
<tr><td>은신처·굴</td><td>숨을 수 있는 집과 땅 파기 공간</td></tr>
<tr><td>갉을 거리</td><td>이빨이 계속 자라므로 갉는 나무토막 필요</td></tr>
<tr><td>온도</td><td>직사광선과 에어컨 바람 직접 노출을 피하고 너무 덥지 않게 한다</td></tr>
</tbody>
</table>

<h2>먹이</h2>
<ul>
<li>햄스터 전용 사료를 기본으로 하고 신선한 채소를 소량 준다.</li>
<li>과일·간식은 소량만. 당분이 많은 먹이는 비만과 당뇨 위험이 있다.</li>
<li>시리안 햄스터는 볼주머니에 음식을 저장하니 끈적한 먹이는 피한다.</li>
<li>깨끗한 물은 급수병으로 매일 교체한다.</li>
</ul>

<h2>핸들링과 적응</h2>
<ol>
<li>입양 후 며칠은 손대지 않고 환경에 적응하게 한다.</li>
<li>저녁에 손을 케이지 안에 두고 냄새에 익숙해지게 한다.</li>
<li>간식을 손에서 주며 신뢰를 쌓은 뒤 손바닥에 올린다.</li>
<li>높은 곳에서 떨어지지 않게 낮은 자세로 잡는다.</li>
</ol>

<div class="callout-cat">
<strong>건강 이상 신호</strong><br>
• 식욕 부진, 처짐, 털이 뭉치거나 엉덩이가 젖음 (설사)<br>
• 호흡이 거칠거나 콧물, 눈곱<br>
• 이빨이 길게 자라거나 입에서 침이 흐름<br>
• 혹이 만져짐
</div>
<p>햄스터는 엑조틱 동물이라 진료 가능한 동물병원이 제한적이다. 입양 전에 가까운 병원을 확인한다.</p>

<h2>마지막으로</h2>
<p>햄스터는 수명이 짧아도 매일 돌봄이 필요한 생명이다. 넓은 환경과 조용한 낮 시간을 지켜 주자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.thatpetplace.com/articles/hamster-article — That Pet Place, Hamster care",
      "https://spca.org.sg/?p=18544 — SPCA Singapore, Hamster care",
      "https://www.littledayout.com/beginners-guide-caring-for-hamsters-7-essential-things-to-know/ — A Beginner's Guide To Caring For Hamsters",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-18T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-615",
    slug: "dog-home-grooming-basics",
    type: "blog",
    category: 5,
    title: "집에서 하는 강아지 기본 미용 — 목욕·빗질·귀 청소 올바른 방법",
    subtitle: "목욕 주기, 수건 드라이 vs 드라이어, 빗질 종류, 귀 청소 빈도",
    metaTitle: "강아지 집에서 미용 — 목욕·빗질·귀 청소 완전 가이드 | 펫지기",
    metaDescription: "집에서 하는 강아지 기본 미용 방법. 목욕 적정 주기, 올바른 드라이 방법, 털 종류별 빗질, 귀 청소 빈도와 방법을 정리했습니다.",
    body: `<p>집에서 하는 기본 미용은 강아지의 피부와 털, 귀, 발톱을 정기적으로 확인할 수 있는 좋은 습관이다. 빗질, 목욕, 귀 관리, 발톱 정리의 기본 요령을 정리했다. 털 종류와 견종에 따라 필요한 횟수가 다르다.</p>

<h2>빗질</h2>
<p>털 빠짐과 엉킴을 줄이고 피부 상태를 확인할 수 있다. 견종과 털 종류에 맞는 빗을 선택하고, 털이 자라는 방향으로 부드럽게 빗는다.</p>
<table>
<thead><tr><th>털 종류</th><th>빈도 (대략)</th></tr></thead>
<tbody>
<tr><td>단모</td><td>주 1회 안팎</td></tr>
<tr><td>이중모</td><td>주 여러 번, 털갈이철에는 매일</td></tr>
<tr><td>장모</td><td>거의 매일 (엉킴 방지)</td></tr>
<tr><td>곱슬 털</td><td>주 여러 번, 피부 가까이까지 빗질</td></tr>
</tbody>
</table>

<h2>목욕</h2>
<p>AKC는 목욕을 규칙적으로 하되 너무 자주 하지 말라고 안내한다. 지나치게 자주 씻으면 피부의 자연 유분이 제거되어 털이 푸석해지고 피부가 건조해질 수 있다.</p>
<ul>
<li>사람용 샴푸가 아닌 강아지용 순한 샴푸를 쓴다.</li>
<li>미지근한 물을 쓰고 눈·귀에 물이 들어가지 않게 한다.</li>
<li>샴푸를 충분히 헹군다. 잔여물은 가려움의 원인이 된다.</li>
<li>완전히 말린다 (특히 귀 주변과 접힌 부위). 눅눅하면 피부염이 생기기 쉽다.</li>
<li>피부 질환이 있으면 수의사가 권하는 샴푸와 주기를 따른다.</li>
</ul>

<h2>귀 관리</h2>
<ul>
<li>귀는 한 달에 한 번 정도, 귀 질환이 생기기 쉬운 견종은 더 자주 확인한다.</li>
<li>바깥 귀의 눈에 보이는 부분만 젖은 거즈나 귀 세정제를 묻힌 솜으로 닦는다.</li>
<li>면봉이나 도구를 귀 안쪽 깊이 넣지 않는다.</li>
<li>빨갛게 붓거나, 분비물이 많거나, 냄새가 심하면 염증일 수 있어 진료를 받는다.</li>
</ul>

<h2>발톱과 발</h2>
<ul>
<li>바닥에서 발톱 소리가 나거나 걸음이 달라지면 길다는 신호다.</li>
<li>발바닥 털이 길어 미끄러우면 정리한다. 발가락 사이를 확인한다.</li>
<li>발톱 정리는 <a href="/blog/dog-nail-grinding-dremel-guide">발톱 연마 가이드</a>를 참고한다.</li>
</ul>

<h2>양치와 눈 주변</h2>
<ul>
<li>가능하면 강아지용 칫솔·치약으로 규칙적으로 양치한다.</li>
<li>눈곱은 따뜻한 젖은 거즈로 부드럽게 닦는다. 눈 분비물이 늘면 진료를 받는다.</li>
</ul>

<div class="callout-dog">
<strong>집 미용 중 발견하면 진료</strong><br>
• 새로 생긴 혹, 피부 발진, 탈모<br>
• 귀 냄새·분비물, 눈 충혈<br>
• 벼룩·진드기, 상처, 절뚝임
</div>

<h2>마지막으로</h2>
<p>집 미용은 모양을 내는 것보다 몸 상태를 확인하는 시간이다. 칭찬과 보상으로 즐거운 경험으로 만들면 평생 도움이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.akc.org/expert-advice/vets-corner/dog-grooming-at-home/ — AKC, Dog grooming at home",
      "https://www.akc.org/expert-advice/grooming/how-to-groom-a-dog/ — AKC, How to groom a dog",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-18T11:00:00.000Z",
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
  console.log("블로그 포스트 98차 시딩 완료! (blog-611 ~ blog-615)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
