import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 109 — cat3×2 + cat1×1 + cat5×1 + cat6×1 = 5편 (IDs 666-670)
// Macros: D, A, B, F, E
// Angles: RA3, RA1, RA8, RA5, RA2

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-666",
    slug: "dog-thrombocytopenia-guide",
    type: "blog",
    category: 3,
    title: "강아지 혈소판감소증 — 피부 점출혈이 보일 때",
    subtitle: "혈소판감소증 원인, 점출혈·반상출혈 확인 방법, ITP 진단, 치료와 응급 기준",
    metaTitle: "강아지 혈소판감소증(ITP) — 피부 출혈 증상·진단·치료 가이드 | 펫지기",
    metaDescription: "강아지 혈소판감소증 원인과 치료. 피부 점출혈·반상출혈 확인 방법, 면역매개 혈소판감소증(ITP) 진단, 스테로이드 치료, 즉시 내원해야 하는 증상을 정리했습니다.",
    body: `<p>강아지 잇몸·피부에 붉은 점들이 생기거나, 코피가 자주 나거나, 멍이 이유 없이 생긴다면 혈소판 문제를 의심해야 한다.</p>

<h2>혈소판의 역할</h2>
<p>혈소판은 출혈이 생겼을 때 혈전을 형성해 지혈하는 세포다. 혈소판이 급격히 감소하면 사소한 자극에도 출혈이 멈추지 않는다.</p>

<h2>주요 원인</h2>
<ul>
<li><strong>면역매개 혈소판감소증(ITP)</strong>: 면역계가 자신의 혈소판을 파괴, 가장 흔한 원인</li>
<li><strong>진드기 매개 감염</strong>: 에를리키아·아나플라스마</li>
<li><strong>약물 반응</strong>: 특정 항생제·항염증제</li>
<li><strong>혈관육종·림프종</strong>: 종양에 의한 혈소판 소모</li>
<li><strong>DIC(파종성 혈관 내 응고)</strong>: 전신 응고 이상으로 혈소판 소진</li>
</ul>

<h2>출혈 증상 확인</h2>
<div class="callout-dog">
<strong>즉시 동물병원으로 가야 하는 출혈 신호</strong><br>
• 잇몸·혀의 붉은 점들 (점출혈, Petechiae)<br>
• 피부 넓은 멍 (반상출혈, Ecchymosis)<br>
• 코피가 멈추지 않음<br>
• 소변·대변에 혈액 혼합<br>
• 눈 흰자의 붉은 반점<br>
▶ 혈소판 수치가 매우 낮으면 뇌 출혈 위험도 있습니다
</div>

<h2>진단</h2>
<ul>
<li>CBC: 혈소판 수치 확인 (정상 200,000~500,000/μL, 위험 &lt;20,000/μL)</li>
<li>혈액 도말: 혈소판 형태·응집 확인</li>
<li>진드기 매개 감염 PCR/항체 검사</li>
<li>골수 검사: 혈소판 생산 이상 여부 확인 (필요 시)</li>
</ul>

<h2>치료</h2>
<ul>
<li>ITP: 고용량 스테로이드(프레드니솔론) ± 아자티오프린</li>
<li>진드기 매개: 독시사이클린 항생제 치료</li>
<li>심한 출혈: 수혈(혈소판 풍부 혈장 또는 전혈)</li>
<li>활동 제한: 출혈 위험 최소화</li>
</ul>

<h2>마지막으로</h2>
<p>출혈 증상은 혈소판감소증의 가시적 신호다. 잇몸이나 피부에서 점출혈이 보이면 당일 수의사 진료가 원칙이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Grindem, C.B. et al. — Immune-mediated thrombocytopenia in dogs. Compend Contin Educ Vet 2002",
      "한국수의내과학회 혈액 질환 진단 및 치료 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 출혈 증상 발생 시 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-12-14T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-667",
    slug: "cat-lymphoma-most-common-cancer",
    type: "blog",
    category: 3,
    title: "고양이 림프종 — 고양이 암 1위의 특징과 치료",
    subtitle: "림프종 유형(소화기·종격·결절), 증상, 진단 방법, 화학요법 반응률, 예후",
    metaTitle: "고양이 림프종 — 유형·증상·화학요법·예후 완전 가이드 | 펫지기",
    metaDescription: "고양이 림프종 원인과 치료. 고양이 암 중 가장 흔한 림프종의 소화기·종격·결절 유형, 증상, 진단 방법, 화학요법 반응률과 예후를 설명합니다.",
    body: `<p>림프종은 고양이에서 가장 흔하게 진단되는 암이다. 요즘은 장에서 생기는 위장관 림프종이 가장 많다. 증상이 만성 장 질환과 비슷해서 진단이 늦어지기 쉽지만, 유형에 따라 치료 반응이 크게 다르다.</p>

<h2>어떤 병인가</h2>
<p>코넬대 고양이건강센터는 림프종이 고양이에서 가장 흔한 암이며 최근에는 장 림프종이 많다고 설명한다. 과거에는 고양이 백혈병 바이러스(FeLV)와 관련이 컸으나, 백신과 검사로 FeLV 감염이 줄면서 지금은 흉선·림프절 등의 유형보다 위장관 림프종이 더 흔해졌다.</p>

<h2>유형</h2>
<table>
<thead><tr><th>유형</th><th>특징</th></tr></thead>
<tbody>
<tr><td>위장관 (소세포)</td><td>진행이 느린 편. 구토, 설사, 체중 감소가 오래 이어진다. 약물로 증상이 조절되는 경우가 많다</td></tr>
<tr><td>위장관 (대세포)</td><td>공격적이고 예후가 나쁜 편. 장에 덩어리가 생길 수 있다</td></tr>
<tr><td>다발성(림프절)</td><td>림프절이 커지며 전신으로 퍼질 수 있다</td></tr>
<tr><td>종격동·비강·신장 등</td><td>위치에 따라 호흡 곤란, 콧물, 신장 이상 등으로 나타난다</td></tr>
</tbody>
</table>

<h2>증상</h2>
<ul>
<li>체중 감소, 식욕 변화 (줄거나 늘기도 함)</li>
<li>만성 구토와 설사</li>
<li>무기력, 털이 거칠어짐</li>
<li>배에서 덩어리가 만져짐, 호흡이 힘듦 (위치에 따라)</li>
</ul>
<p>이 증상은 염증성 장질환(IBD)과 매우 비슷해서 영상 검사와 조직 검사로 구분해야 한다.</p>

<h2>진단</h2>
<ol>
<li>혈액·소변 검사, FeLV/FIV 검사</li>
<li>복부 초음파와 흉부 방사선</li>
<li>세포 검사(FNA) 또는 조직 검사 (내시경 또는 수술)</li>
<li>면역조직화학·클론성 검사로 세부 유형 확인</li>
</ol>

<h2>치료와 예후</h2>
<p>치료는 유형에 따라 다르다. 코넬대 자료는 소세포 위장관 림프종이 비교적 진행이 느려 프레드니솔론과 클로람부실 같은 약으로 집에서 관리할 수 있으며 대부분의 고양이에서 임상 증상이 완화된다고 설명한다. 대세포형은 공격적이어서 다발성 림프종처럼 항암 화학요법을 고려하고, 장 덩어리가 있으면 수술을 병행하기도 한다. 예후는 유형, 병기, 치료 반응에 따라 크게 달라서 종양 전문의와 상의하는 것이 좋다.</p>

<div class="callout-cat">
<strong>이런 변화는 검사 필요</strong><br>
• 몇 주 이상 이어지는 구토·설사<br>
• 식욕이 있는데도 체중이 줄어든다<br>
• 림프절이 만져지거나 호흡이 힘들다
</div>

<h2>예방</h2>
<ul>
<li>FeLV 예방접종과 실내 생활 관리</li>
<li>정기 검진과 체중 기록</li>

</ul>

<h2>마지막으로</h2>
<p>고양이의 만성 소화기 증상은 나이 탓으로 넘기지 말고 원인을 찾아야 한다. 조기에 진단하고 유형에 맞게 치료하면 좋은 삶의 질을 유지하는 경우가 많다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.vet.cornell.edu/departments-centers-and-institutes/cornell-feline-health-center/health-information/feline-health-topics/lymphoma — Cornell Feline Health Center, Lymphoma",
      "https://www.dvm360.com/view/feline-gastrointestinal-lymphoma-signs — dvm360, Feline gastrointestinal lymphoma signs",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-12-14T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-668",
    slug: "mixed-breed-dog-adoption-pros",
    type: "blog",
    category: 1,
    title: "믹스견 입양의 장점과 현실 — 순종견과 무엇이 다른가",
    subtitle: "믹스견의 잡종강세, 성격 예측 가능성, 보호소 입양 연결, 의료비 차이 현실",
    metaTitle: "믹스견 입양 — 순종견과의 차이, 잡종강세, 현실 가이드 | 펫지기",
    metaDescription: "믹스견 입양의 장점과 현실을 정리했습니다. 잡종강세 효과, 성격 예측 가능성, 보호소 믹스견 입양 방법, 순종견과의 의료비·건강 차이를 알아봅니다.",
    body: `<p>믹스견은 국내 보호소 동물의 대다수를 차지한다. 그럼에도 많은 사람들이 순종견을 선택한다. 믹스견 입양의 실제 모습을 살펴보자.</p>

<h2>잡종강세란</h2>
<p>유전학적으로 다양한 유전자 조합은 특정 유전질환 발현 확률을 낮추는 경향이 있다. 이를 잡종강세(Hybrid Vigor)라고 한다. 순종견은 오랜 근친 교배로 특정 유전 질환 발생률이 높아지는 경우가 있다.</p>

<h2>믹스견의 현실적 장점</h2>
<ul>
<li>특정 순종 질환(심장·관절·눈)의 유전적 위험 분산</li>
<li>입양비가 낮거나 없음 (보호소 입양)</li>
<li>보호소 입양으로 생명 구조에 기여</li>
<li>성인견 입양 시 최종 크기·성격 확인 가능</li>
</ul>

<h2>성격·외모 예측의 한계</h2>
<div class="callout-dog">
<strong>믹스견 입양 전 알아야 할 것</strong><br>
• 어린 믹스견의 최종 크기는 예측하기 어려움<br>
• 성격은 부모 견종 특성이 다양하게 혼합됨<br>
• 보호소 입양 시 성인견은 성격 어느 정도 파악 가능<br>
• 퍼피 밀(공장형 번식) 출신 믹스견은 보호소와 다름
</div>

<h2>의료비와 건강</h2>
<ul>
<li>건강 면에서 유전 질환 위험이 낮은 경우 의료비 줄어들 수 있음</li>
<li>예방접종·중성화·기생충 관리는 동일하게 필요</li>
<li>보호소 입양 동물: 입양 전 건강검진 여부 확인 필요</li>
</ul>

<h2>보호소 믹스견 입양 방법</h2>
<ul>
<li>농림축산식품부 동물보호관리시스템(APMS)에서 지역 보호소 확인</li>
<li>지역 유기동물 임시보호 단체 SNS 모니터링</li>
<li>입양 전 1주 이상 임시보호 경험 권장</li>
</ul>

<h2>마지막으로</h2>
<p>순종견과 믹스견 사이에서 옳고 그름은 없다. 중요한 것은 15년을 함께할 준비가 되어 있는가, 그리고 충동적 결정이 아닌가다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국동물복지협회 보호소 동물 입양 현황 보고서",
      "Bellumori, T.P. et al. — Prevalence of inherited disorders in mixed and purebred dogs. JAVMA 2013",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-15T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-669",
    slug: "dog-winter-paw-frostbite-care",
    type: "blog",
    category: 5,
    title: "강아지 겨울 발바닥 동상·저체온증 예방 완전 가이드",
    subtitle: "발바닥 동상 증상, 저체온증 위험 온도·견종, 산책 전 후 케어, 부티·워머 활용",
    metaTitle: "강아지 겨울 발바닥 동상·저체온증 예방 — 산책 케어 가이드 | 펫지기",
    metaDescription: "강아지 겨울 발바닥 동상과 저체온증 예방 방법. 동상 증상 확인법, 고위험 견종, 산책 전후 발바닥 케어, 강아지 부티 착용법과 주의사항을 정리했습니다.",
    body: `<p>겨울에는 발바닥이 눈, 얼음, 제설제에 직접 닿아 갈라지거나 동상, 화학 화상이 생기기 쉽다. 산책 전후 몇 가지만 챙겨도 대부분 예방할 수 있다. 겨울철 전체 관리는 <a href="/blog/dog-winter-cold-care-guide">겨울철 강아지 관리 가이드</a>도 참고한다.</p>

<h2>겨울 발바닥의 위험</h2>
<table>
<thead><tr><th>위험</th><th>설명</th></tr></thead>
<tbody>
<tr><td>건조·갈라짐</td><td>찬 공기와 난방으로 패드가 건조해져 갈라진다</td></tr>
<tr><td>동상</td><td>장시간 추위 노출로 발가락·패드 조직이 손상된다</td></tr>
<tr><td>제설제(염화칼슘 등)</td><td>피부 자극이나 화학 화상을 일으킬 수 있고, 핥아 삼키면 위험하다. AKC는 도로 제설염이 자극 물질이며 삼키면 독성이 있을 수 있다고 안내한다</td></tr>
<tr><td>얼음 덩어리</td><td>발가락 사이 털에 눈이 뭉치면 걸음이 불편하고 아프다</td></tr>
<tr><td>날카로운 얼음</td><td>패드 베임</td></tr>
</tbody>
</table>

<h2>산책 전</h2>
<ul>
<li>발가락 사이 털을 짧게 정리해 눈 뭉침을 줄인다.</li>
<li>발 보호 왁스·밤(balm)을 바른다. 핥아도 안전한 제품을 고른다.</li>
<li>가능하면 강아지용 신발을 신긴다. AKC는 신발이 눈, 얼음, 제설제로부터 발을 보호하는 데 효과적이라고 설명한다. 미리 집 안에서 적응 훈련을 한다.</li>
<li>극한 추위에는 산책을 짧게 한다. 장시간은 동상 위험이 있다.</li>
</ul>

<h2>산책 후</h2>
<ol>
<li>미지근한 물에 발을 담그거나 젖은 수건으로 닦아 제설제와 얼음을 제거한다.</li>
<li>수건으로 물기를 완전히 닦고 발가락 사이도 말린다.</li>
<li>갈라진 곳이 없는지 확인하고 보습제를 바른다.</li>
<li>발을 심하게 핥으면 제설제를 삼키지 않도록 막는다.</li>
</ol>

<div class="callout-dog">
<strong>동상·화상 의심 신호</strong><br>
• 발이 창백하거나 푸르고 차갑다, 나중에 붉어지고 붓는다<br>
• 심하게 절뚝이거나 발을 만지지 못하게 한다<br>
• 물집, 심한 갈라짐, 출혈<br>
→ 따뜻한 곳으로 옮기고 문지르지 않는다. 미지근한 물로 천천히 녹이고 병원에 간다
</div>

<h2>집 주변 제설제 선택</h2>
<p>반려동물이 드나드는 곳에는 동물에게 덜 해로운 제품을 고르는 것이 좋다. 반려동물용 제설제도 삼키면 안 되므로 핥지 않게 지켜본다.</p>

<h2>마지막으로</h2>
<p>겨울 산책은 짧게, 돌아오면 발부터 닦는 습관을 들이자. 갈라짐이나 동상이 의심되면 집에서 해결하려 하지 말고 진료를 받는다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동·케어 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.akc.org/expert-advice/vets-corner/protect-dogs-paws-snow-ice-salt — AKC, Protect your dog's paws from snow, ice, and salt",
      "https://www.akc.org/expert-advice/lifestyle/winter-dog-gear/ — AKC, Winter dog gear",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-15T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-670",
    slug: "pet-belongings-after-loss",
    type: "blog",
    category: 6,
    title: "반려동물 떠난 후 남은 용품 처리 — 버리는 것과 간직하는 것",
    subtitle: "용품 처리 시점 결정, 기증·후원 방법, 간직하는 것의 의미, 정리가 슬픔을 더하지 않으려면",
    metaTitle: "반려동물 사망 후 남은 용품 처리 — 기증·간직·정리 가이드 | 펫지기",
    metaDescription: "반려동물이 떠난 후 남은 용품 처리 방법. 언제 정리할지, 무엇을 기증하고 무엇을 간직할지, 용품이 슬픔을 더하지 않도록 하는 방법을 정리했습니다.",
    body: `<p>반려동물이 떠난 집에는 아직 체온이 남은 것 같은 물건들이 있다. 밥그릇, 장난감, 리드줄, 침대. 이것들을 어떻게 해야 할지 막막한 것은 당연하다.</p>

<h2>"언제" 정리해야 할까</h2>
<p>정답은 없다. 어떤 사람은 며칠 후 정리하는 것이 도움이 되고, 어떤 사람은 수개월이 지나도 그대로 두는 것이 위안이 된다. 슬픔에는 정해진 속도가 없다. 외부 압력이나 "언제까지는 정리해야 한다"는 기준에 따를 필요가 없다.</p>

<h2>버리지 않고 줄 수 있는 곳</h2>
<div class="callout-dog">
<strong>용품 기증·나눔 방법</strong><br>
• 지역 동물 보호소: 미사용 사료·간식·침구류 등 받는 경우 많음<br>
• 지역 유기동물 임시보호 단체: SNS 통해 필요 물품 문의 가능<br>
• 동물 커뮤니티 나눔 게시판: 중고 용품 필요한 보호자에게 직접 전달<br>
▶ 연락 전 해당 단체가 현재 물품을 필요로 하는지 먼저 확인
</div>

<h2>간직하는 것의 의미</h2>
<p>모든 물건을 처분해야 한다는 생각은 잘못이다. 작은 장난감, 목줄, 마지막으로 찍은 사진을 간직하는 것은 슬픔을 부정하는 것이 아니라 기억을 유지하는 건강한 방식이다. 많은 사람들이 추모 공간을 만들어 작은 물건을 놓아두는 것에서 위안을 찾는다.</p>

<h2>정리가 힘들 때</h2>
<ul>
<li>한꺼번에 하지 않아도 된다 — 하나씩 결정하기</li>
<li>믿을 수 있는 사람에게 도움을 청해도 된다</li>
<li>정리 중 울어도 된다 — 그것은 사랑의 증거다</li>
</ul>

<h2>새 동물을 들이기 전</h2>
<p>새 반려동물을 맞이하기 전에 용품을 완전히 정리해야 한다는 규칙은 없다. 다만 새 동물이 이전 동물의 물건에서 익숙하지 않은 냄새를 맡으면 불안해할 수 있어 새로운 용품을 준비하는 것이 현실적이다.</p>

<h2>마지막으로</h2>
<p>남은 물건들은 함께한 시간의 흔적이다. 그것을 어떻게 하든, 그것은 당신의 선택이고 당신의 슬픔이다. 서두르지 않아도 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 상실과 추모 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국펫로스상담협회 반려동물 사별 후 일상 회복 자료",
      "Lagoni, L. et al. — The Human-Animal Bond and Grief. WB Saunders 1994",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며, 상실의 슬픔이 지속된다면 전문 상담가의 도움을 받으시기 바랍니다.",
    status: "published",
    publishedAt: "2026-12-16T09:00:00.000Z",
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
  console.log("블로그 포스트 109차 시딩 완료! (blog-666 ~ blog-670)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
