import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 46 — cat3×2 + cat6×1 + cat2×1 + cat5×1 = 5편 (IDs 351-355)
// Macros: F, E, B, A, F
// Angles: RA1, RA4, RA8, RA2, RA6

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 351 / Cat3 / Macro-F(절차) / Lens-L1 / Hook-H1 / Outro-O2 / Angle-RA1
  {
    id: "blog-351",
    slug: "cat-dental-care-complete",
    type: "blog",
    category: 3,
    title: "고양이 치아 관리 완전 가이드 — 칫솔질부터 치과 처치까지",
    subtitle: "고양이 치주질환 통계, 칫솔질 단계별 훈련, 덴탈 간식 효과, 스케일링 마취 위험",
    metaTitle: "고양이 치아 관리 — 칫솔질·덴탈간식·스케일링 가이드 | 펫지기",
    metaDescription: "고양이 치주질환은 3살 이후 70%에서 발생합니다. 칫솔질 단계별 훈련, 덴탈 간식 효과, 스케일링 주기와 마취 주의사항을 정리했습니다.",
    body: `<p>고양이도 치주질환이 생긴다. 3살 이상 고양이의 약 70%에서 치주 문제가 관찰된다. 강아지와 달리 고양이는 구강 통증을 숨기는 경향이 강해, 발견이 더 늦어지는 경우가 많다.</p>

<h2>고양이 치주질환의 특수성</h2>
<p>고양이에서 특히 문제가 되는 것은 <strong>파상성 흡수 병소(FORL, Feline Odontoclastic Resorptive Lesion)</strong>다. 치아가 내부에서 흡수되어 통증이 심하지만 겉으로 잘 보이지 않는다. 30~50%의 성묘에서 발생하며, 발치가 유일한 치료법이다.</p>

<h2>칫솔질 단계별 훈련</h2>
<p>고양이에게 칫솔질은 강아지보다 더 천천히 접근해야 한다.</p>
<ol>
<li>치약(닭·참치 맛 반려동물용)을 손가락에 묻혀 핥게 한다</li>
<li>손가락으로 잇몸 바깥쪽을 부드럽게 마사지</li>
<li>핑거브러시로 전환 — 같은 동작 반복</li>
<li>칫솔로 전환 — 위아래가 아닌 작은 원을 그리며</li>
</ol>
<p>고양이는 강압보다 간식 보상이 효과적이다. 하루 30초만 해도 충분하다.</p>

<h2>덴탈 간식·장난감 효과</h2>
<ul>
<li>VOHC 인증 덴탈 트릿: 플라그 감소 효과 입증</li>
<li>건식 사료: 씹는 과정에서 약간의 기계적 제거 효과</li>
<li>구강청결제 (물에 첨가): 보조적 효과, 주재료 대체 불가</li>
</ul>

<h2>스케일링 주기와 마취</h2>
<p>이미 생긴 치석은 칫솔질로 제거되지 않는다. 마취 하에 진행하는 스케일링이 유일하다. 고양이는 마취 위험에 대한 걱정이 크지만, 사전 혈액검사와 모니터링이 갖춰진 병원에서는 건강한 성묘 기준 위험이 높지 않다.</p>

<div class="callout-cat">
<strong>스케일링 전 확인 사항</strong><br>
• 혈액검사·흉부 X-ray 실시<br>
• 마취 전 최소 8~12시간 금식<br>
• 마취 회복 공간 준비<br>
• 7세 이상: 심장 초음파 권장
</div>

<h2>마지막으로</h2>
<p>고양이 구강 건강 관리는 예방이 최선이다. 칫솔질이 어렵다면 VOHC 인증 덴탈 제품을 병행하고, 연 1회 구강 검진을 통해 FORL 등 숨겨진 문제를 조기에 발견하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Veterinary Oral Health Council (VOHC) — Cat Dental Products",
      "Tooth Resorption in Cats — Journal of Feline Medicine and Surgery 2022",
      "한국고양이수의사회 구강 건강 관리 임상 가이드",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-09T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 352 / Cat3 / Macro-E(비교) / Lens-L4 / Hook-H2 / Outro-O1 / Angle-RA4
  {
    id: "blog-352",
    slug: "dog-soft-tissue-injury-guide",
    type: "blog",
    category: 3,
    title: "강아지 발목 삐거나 절뚝거릴 때 — 단순 접질림부터 인대 파열까지",
    subtitle: "경증·중증 연조직 손상 구분, 집에서 할 수 있는 응급 처치, 전방십자인대(CCL) 손상 신호",
    metaTitle: "강아지 절뚝거림·발목 삠 — 경중 구분과 처치 가이드 | 펫지기",
    metaDescription: "강아지가 갑자기 절뚝거릴 때 단순 접질림인지 인대 파열인지 구분하는 방법. 집에서 할 수 있는 응급 처치와 병원 가야 할 시점을 정리했습니다.",
    body: `<p>산책 후 갑자기 다리를 절거나 한쪽 발을 들고 있으면 "삐었나 보다" 하고 쉬게 두는 경우가 많다. 하지만 절뚝거림의 원인은 단순한 근육 긴장부터 인대 파열, 탈구, 골절까지 다양하다. 겉모습만으로 구분하기 어려워서 판단 기준이 필요하다.</p>

<h2>절뚝거림의 흔한 원인</h2>
<table>
<thead><tr><th>원인</th><th>특징</th></tr></thead>
<tbody>
<tr><td>발톱·발바닥 상처</td><td>발을 핥고 피가 보이는 경우가 많다. 가장 먼저 발을 살핀다</td></tr>
<tr><td>근육·건 긴장</td><td>만지면 아파하고 부기나 멍이 있을 수 있다</td></tr>
<tr><td>십자인대 손상</td><td>뒷다리를 한쪽으로 빼고 앉는 자세, 계단 꺼림, 일어나기 힘들어함, 간헐적 절뚝거림. 완전 파열이면 발을 거의 딛지 못하기도 한다</td></tr>
<tr><td>슬개골 탈구, 관절염 등</td><td>간헐적으로 다리를 들거나 점프를 꺼린다</td></tr>
<tr><td>골절·탈구</td><td>대부분 다리를 딛지 못한다. 응급이다</td></tr>
</tbody>
</table>

<div class="callout-dog">
<strong>바로 진료가 필요한 경우</strong><br>
• 다리를 전혀 딛지 않거나 다리가 기형처럼 보임<br>
• 심하게 붓거나 열감이 있음<br>
• 비명을 지르거나 만지면 공격적으로 반응함<br>
• 며칠 쉬게 해도 호전되지 않거나 반복됨<br>
• 사고(교통사고, 추락) 이후의 절뚝거림
</div>

<h2>집에서 먼저 할 수 있는 확인</h2>
<ol>
<li>발바닥, 발가락 사이, 발톱에 이물이나 상처가 없는지 본다.</li>
<li>다리를 따라 부기, 열감, 통증 부위를 부드럽게 확인한다. 통증이 심한 개는 보호자도 물릴 수 있으므로 두 사람이 하고 억지로 하지 않는다.</li>
<li>산책과 점프, 계단을 줄이고 조용히 쉬게 한다.</li>
<li>사람용 진통제를 임의로 먹이지 않는다. 개에게 위험한 성분이 있다.</li>
</ol>

<h2>병원에서 하는 검사</h2>
<ul>
<li>보행과 관절 촉진, 십자인대는 서랍 검사나 경골 압박 검사 등으로 불안정성을 확인한다.</li>
<li>통증이 심하면 진정시킨 뒤 정확히 검사하기도 한다.</li>
<li>방사선으로 골절과 관절 변화를 보고, 연부 조직은 초음파가 도움이 된다.</li>
</ul>
<p>치료는 안정, 활동 제한, 통증 관리, 재활 또는 수술까지 진단에 따라 달라진다. 소염진통제 사용과 휴식 기간은 수의사가 정한다.</p>

<h2>회복기 관리</h2>
<ul>
<li>처방받은 기간만큼 줄을 짧게 잡고 짧게 산책한다.</li>
<li>미끄러운 바닥에는 매트를 깐다.</li>
<li>체중이 늘면 관절 부담이 커지므로 관리한다.</li>
<li>다시 절뚝거리면 재진을 받는다. 작은 변화가 진단에 도움이 된다.</li>
</ul>

<h2>마지막으로</h2>
<p>며칠 쉬어도 낫지 않는 절뚝거림은 단순 긴장이 아닐 수 있다. 십자인대처럼 방치하면 관절이 계속 나빠지는 문제도 있으니 일찍 확인하는 것이 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vcahospitals.com/know-your-pet/first-aid-for-limping-dogs — VCA, First Aid for Limping Dogs",
      "https://vcahospitals.com/know-your-pet/cruciate-ligament-rupture-in-dogs — VCA, Cruciate Ligament Rupture in Dogs",
      "https://www.merckvetmanual.com/dog-owners/bone-joint-and-muscle-disorders-of-dogs/lameness-in-dogs — Merck Veterinary Manual, Lameness in Dogs",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-10T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 353 / Cat6 / Macro-B(비교) / Lens-L6 / Hook-H8 / Outro-O4 / Angle-RA8
  {
    id: "blog-353",
    slug: "pet-funeral-options-guide",
    type: "blog",
    category: 6,
    title: "반려동물 장례 방법 — 화장·수목장·자연장 선택 기준과 비용",
    subtitle: "동물 장례업 법적 기준, 화장·자연장·수목장 차이, 비용 비교, 유골 보관 방법",
    metaTitle: "반려동물 장례 방법 비교 — 화장·자연장·수목장·비용 | 펫지기",
    metaDescription: "반려동물 장례 방법 비교. 화장, 자연장, 수목장의 차이와 비용, 동물 장례업 법적 기준, 유골 보관 방법을 정리했습니다.",
    body: `<p>반려동물을 보내고 나면 무엇부터 해야 할지 막막하다. 그 순간에 서둘러 결정하지 않도록, 합법적인 처리 경로와 장례 방식, 업체를 고르는 기준을 미리 정리해 둔다.</p>

<h2>합법적인 사체 처리 경로</h2>
<p>국내에서 반려동물 사체를 처리하는 합법적인 방법은 크게 세 가지로 소개된다.</p>
<table>
<thead><tr><th>방법</th><th>설명</th><th>유의점</th></tr></thead>
<tbody>
<tr><td>동물병원에 위탁</td><td>병원에서 사망했거나 병원에 맡기는 경우 의료폐기물로 처리</td><td>유골을 돌려받을 수 없다</td></tr>
<tr><td>종량제 봉투 배출</td><td>생활폐기물로 배출</td><td>지자체 배출 기준을 확인한다. 마음의 부담이 큰 방법이라 많이 선택하지는 않는다</td></tr>
<tr><td>동물장묘업체 이용</td><td>등록된 동물장묘업 시설에서 화장·봉안 등을 진행</td><td>업체의 등록 여부를 확인한다</td></tr>
</tbody>
</table>

<div class="callout-cat">
<strong>땅에 묻는 것은 안 됩니다</strong><br>
• 산이나 공원은 물론 자기 소유의 땅(정원·밭)에 묻는 것도 폐기물관리법상 문제가 된다고 안내됩니다<br>
• 개인이 직접 화장·소각하는 것도 마찬가지입니다<br>
• 정확한 기준과 처리 방법은 관할 지자체 또는 동물보호관리시스템에서 확인하세요
</div>

<h2>장례 방식 비교</h2>
<table>
<thead><tr><th>방식</th><th>특징</th></tr></thead>
<tbody>
<tr><td>개별 화장</td><td>한 마리만 화장해 유골을 돌려받는다. 개별 화장이 맞는지 확인이 중요하다</td></tr>
<tr><td>합동 화장</td><td>여러 마리를 함께 화장하며 유골을 돌려받지 않는 경우가 많다. 비용 부담이 작다</td></tr>
<tr><td>방문 화장</td><td>차량이 방문해 화장을 진행한다. 이동이 어려운 경우 고려하되, 등록된 시설·차량인지 확인한다</td></tr>
<tr><td>수목장·자연장 등</td><td>제공 업체와 가능 여부가 지역별로 다르므로 합법 여부를 먼저 확인한다</td></tr>
</tbody>
</table>
<p>비용은 크기, 지역, 옵션(염습·유골함·봉안)에 따라 크게 달라지므로 여러 업체의 견적을 서면으로 받아 비교한다.</p>

<h2>유골 보관</h2>
<ul>
<li><strong>봉안</strong>: 장묘업체의 봉안시설에 안치한다. 계약 기간·갱신 조건·관리비를 확인한다.</li>
<li><strong>집 보관</strong>: 유골함에 담아 집에 두는 보호자가 많다. 자세한 사항은 지자체나 업체에 확인한다.</li>
<li><strong>기념물 제작</strong>: 유골 일부로 유리·보석 등을 만드는 서비스가 있다. 업체의 신뢰도와 후기를 확인한다.</li>
</ul>

<h2>업체 선택 체크리스트</h2>
<ul>
<li>동물장묘업 <strong>등록</strong> 여부 (등록증, 지자체 확인)</li>
<li>개별 화장 시 내 반려동물의 유골만 돌아오는지, 입회·참관이 가능한지</li>
<li>유골함·염습·영정사진 등 <strong>추가 비용</strong>을 사전에 서면으로 안내하는지</li>
<li>폐업·이전 시 유골 처리와 환불 규정</li>
<li>상담이 재촉하지 않고 충분한 시간을 주는지</li>
</ul>

<h2>등록된 반려견이라면</h2>
<p>동물등록이 된 반려견이 죽으면 일정 기간 안에 말소 신고를 해야 한다. 기한과 방법은 <a href="/blog/animal-registration-change-cancel-guide">동물등록 변경·말소 가이드</a>에서 확인한다.</p>

<h2>마지막으로</h2>
<p>어떤 방식도 틀린 선택은 아니다. 다만 합법적인 경로를 따르는 것이 반려동물에게도, 보호자에게도 안전하다. 급하게 결정하지 말고 한 숨 돌린 뒤 정하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.dailyvet.co.kr/?p=276994 — 데일리벳, 동물장례식장 이용 비율 늘었지만 여전히 반려동물 사체를 땅에 묻는 경우 가장 많아",
      "https://www.dailyvet.co.kr/print?id=36364 — 데일리벳, 반려동물 사체 동물장묘업소서 처리 가능토록 법적 기반 마련",
      "https://magazine.hankyung.com/business/article/202109013621b — 한경 매거진, 동물장묘업 등록 없이 고양이 장례 치러…벌금 확정",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-10T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 354 / Cat2 / Macro-A(원인분석) / Lens-L2 / Hook-H4 / Outro-O2 / Angle-RA2
  {
    id: "blog-354",
    slug: "cat-obesity-diet-management",
    type: "blog",
    category: 2,
    title: "고양이 비만 — 통통한 것이 귀엽지만 심각한 건강 문제가 된다",
    subtitle: "BCS로 비만 판단, 고양이 다이어트 특유의 위험(간지방증), 안전한 감량 방법",
    metaTitle: "고양이 비만 다이어트 — BCS 판단·간지방증 위험·안전 감량 | 펫지기",
    metaDescription: "고양이 비만은 당뇨·관절·간지방증을 유발합니다. BCS로 비만 판단, 고양이만의 다이어트 위험인 간지방증, 안전한 감량 방법을 정리했습니다.",
    body: `<p>통통한 고양이는 귀여워 보이지만 비만은 당뇨, 관절 질환, 요로 질환 등과 연관되는 건강 문제다. 다만 고양이는 급하게 살을 빼면 오히려 위험해질 수 있어서, 속도와 방법이 중요하다.</p>

<h2>비만인지 어떻게 아나</h2>
<ul>
<li>체중만으로는 부족하다. 품종과 체격에 따라 적정 체중이 다르므로 체형 점수(BCS)로 판단한다.</li>
<li>위에서 봤을 때 허리 잘록함이 거의 없고, 옆에서 봤을 때 배가 처져 있으며, 갈비뼈가 잘 만져지지 않으면 과체중을 의심한다.</li>
<li>정확한 목표 체중은 동물병원에서 정한다.</li>
</ul>

<h2>왜 천천히 빼야 하나</h2>
<div class="callout-cat">
<strong>굶겨서 빼면 안 된다</strong><br>
• 고양이가 오래 먹지 않으면 지방이 간에 쌓이는 지방간(간지질증)이 생길 수 있다<br>
• 메르크 수의학 매뉴얼은 굶기는 것은 체중 감량의 안전하거나 인도적인 방법이 아니라고 설명한다<br>
• 다이어트 중 하루 이상 거의 먹지 않으면 바로 병원에 알린다
</div>
<p>자료에서는 체중의 1~2% 정도를 매주 줄이는 것을 일반적인 목표로 소개하고, 매우 비만한 고양이는 더 느리게 잡기도 한다. 시작 열량은 현재 체중이 아니라 목표 체중을 기준으로 수의사가 계산해 주는 경우가 많다.</p>

<h2>감량 계획의 구성</h2>
<table>
<thead><tr><th>요소</th><th>내용</th></tr></thead>
<tbody>
<tr><td>정량 급여</td><td>눈대중이 아니라 저울이나 계량컵으로 하루 급여량을 정한다. 자율 급식(밥을 항상 채워 두기)은 중단한다</td></tr>
<tr><td>체중 감량 사료</td><td>필요한 단백질과 영양소를 채우면서 열량이 낮은 처방식을 수의사가 고른다. 습식 비율을 늘리는 방법도 쓴다</td></tr>
<tr><td>간식 제한</td><td>간식은 하루 열량의 일부로 계산하고, 사람 음식을 주지 않는다</td></tr>
<tr><td>활동량 늘리기</td><td>사냥 놀이, 퍼즐 급식기, 캣타워로 하루 몇 번 짧게 놀아 준다</td></tr>
<tr><td>정기 체중 측정</td><td>2~4주마다 같은 저울로 재서 기록하고 계획을 조정한다. 아기 저울이 유용하다</td></tr>
</tbody>
</table>

<h2>다묘 가정이라면</h2>
<ul>
<li>다른 고양이 사료를 훔쳐 먹지 못하게 급식 장소와 시간을 분리한다.</li>
<li>마이크로칩 인식 급식기를 쓰는 방법도 있다.</li>
</ul>

<h2>이런 경우는 진료가 먼저</h2>
<ul>
<li>갑자기 체중이 늘거나 배가 부풀었다 (복수, 종양 가능성).</li>
<li>물을 많이 마시고 소변이 많다 (당뇨 의심).</li>
<li>식욕이 크게 늘었는데 살이 빠진다 (갑상선 기능항진증 등).</li>
</ul>

<h2>마지막으로</h2>
<p>고양이 다이어트는 수의사와 함께 목표 체중과 속도를 정하고, 정량 급여와 놀이를 꾸준히 하는 것이 기본이다. 급하게 줄이려는 마음이 가장 위험하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vcahospitals.com/know-your-pet/obesity-in-cats — VCA, Obesity in Cats",
      "https://vcahospitals.com/know-your-pet/creating-a-weight-reduction-plan-for-cats — VCA, Creating a Weight Reduction Plan for Cats",
      "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/obesity — Cornell Feline Health Center, Obesity",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-11T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 355 / Cat5 / Macro-F(절차) / Lens-L6 / Hook-H3 / Outro-O3 / Angle-RA6
  {
    id: "blog-355",
    slug: "dog-summer-heat-care-guide",
    type: "blog",
    category: 5,
    title: "여름 강아지 더위 관리 — 열사병 예방부터 산책 시간 조정까지",
    subtitle: "열사병 단계별 증상, 안전한 산책 시간대, 냉각 방법 5가지, 단두종 특별 주의사항",
    metaTitle: "강아지 여름 더위 관리 — 열사병 예방·산책 시간 가이드 | 펫지기",
    metaDescription: "여름 강아지 더위 관리 방법. 열사병 단계별 증상, 안전한 산책 시간대, 냉각 방법 5가지, 단두종(불독·퍼그) 특별 주의사항을 정리했습니다.",
    body: `<p>개는 사람처럼 전신으로 땀을 흘리지 못한다. 주로 발바닥과 헐떡임으로 체온을 조절하며, 이것이 한계에 달하면 열사병으로 이어진다. 여름 관리는 선택이 아니라 생명과 직결된다.</p>

<h2>열사병 단계별 증상</h2>
<table>
<thead><tr><th>단계</th><th>증상</th><th>대처</th></tr></thead>
<tbody>
<tr><td>경증 (체온 39.5~41°C)</td><td>과도한 헐떡임, 침 흘림, 불안</td><td>시원한 곳 이동, 수분 공급</td></tr>
<tr><td>중등도 (41~42°C)</td><td>구토, 무기력, 잇몸 빨개짐</td><td>즉시 냉각 + 병원</td></tr>
<tr><td>중증 (42°C 이상)</td><td>의식 저하, 경련, 적자색 잇몸</td><td>즉시 병원 (생명 위협)</td></tr>
</tbody>
</table>

<h2>안전한 산책 시간대</h2>
<p>기온이 25°C 이상이 되면 주의가 필요하다. 아스팔트 표면 온도를 고려하면 더 일찍부터 위험하다.</p>
<ul>
<li><strong>권장 시간</strong>: 오전 7시 이전, 오후 7시 이후 (그림자가 충분히 생긴 후)</li>
<li><strong>단두종·노령견·비만견</strong>: 오전 6시 이전, 오후 8시 이후로 더 엄격하게</li>
<li><strong>아스팔트 체크</strong>: 손등을 7초 — 뜨거우면 발바닥도 뜨겁다</li>
</ul>

<h2>냉각 방법 5가지</h2>
<ol>
<li><strong>신선한 물 상시 제공</strong>: 외출 시 항상 물통 지참</li>
<li><strong>냉각 매트</strong>: 젤 타입 또는 물 순환 타입</li>
<li><strong>발바닥 적시기</strong>: 발바닥을 시원한 물에 담그거나 적심 — 체온 하강 효과</li>
<li><strong>실내 에어컨 유지</strong>: 25°C 이하 권장. 장시간 외출 시 켜두기</li>
<li><strong>냉동 트릿</strong>: 얼린 닭육수·과일 — 내부 체온 낮추고 수분 보충</li>
</ol>

<h2>단두종 특별 주의</h2>
<div class="callout-dog">
<strong>단두종 (불독·퍼그·페키니즈·시츄)</strong><br>
• 기도가 좁아 헐떡임 효율이 낮음 — 체온 조절 능력 부족<br>
• 기온 22°C에서도 과열 가능<br>
• 여름 낮 시간대 야외 활동 금지<br>
• 실내에서도 에어컨 필수<br>
• 수술로 기도를 넓히는 것이 근본 해결 — 수의사 상담
</div>

<h2>마지막으로</h2>
<p>여름은 강아지 열사병 발생이 가장 많은 계절이다. 잠깐 차에 두는 것, 낮 시간대 장시간 산책 — 이 두 가지만 피해도 대부분의 위험을 예방할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Bruchim, Y. et al. — Heat stroke in dogs. Journal of Veterinary Internal Medicine 2006",
      "BSAVA — Brachycephalic Obstructive Airway Syndrome",
      "대한수의사회 반려동물 여름철 열사병 예방 가이드",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 열사병 의심 시 즉시 동물병원에 연락하세요.",
    status: "published",
    publishedAt: "2026-07-11T11:00:00.000Z",
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
  console.log("블로그 포스트 46차 시딩 완료! (blog-351 ~ blog-355)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
