import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 104 — cat3×2 + cat5×1 + cat4×1 + cat1×1 = 5편 (IDs 641-645)
// Macros: D, A, F, B, G
// Angles: RA2, RA1, RA7, RA3, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-641",
    slug: "dog-steroid-long-term-risks",
    type: "blog",
    category: 3,
    title: "강아지 스테로이드 장기 복용 — 효과만큼 큰 부작용 관리",
    subtitle: "스테로이드 필요 상황, 부작용 종류, 최소 용량 원칙, 대안 치료",
    metaTitle: "강아지 스테로이드 장기 복용 부작용 — 관리와 대안 가이드 | 펫지기",
    metaDescription: "강아지 스테로이드 장기 복용 부작용과 관리 방법. 스테로이드가 필요한 상황, 쿠싱 유발·감염 취약·간 손상 부작용, 최소 용량 원칙, 대안 치료를 정리했습니다.",
    body: `<p>아토피, 관절염, 면역 질환 때문에 스테로이드를 오랫동안 먹는 강아지가 있다. 스테로이드는 강력하고 필요한 약이지만, 장기 복용 시 부작용이 생길 수 있어 정기적인 점검과 용량 조절이 필수다. 약을 임의로 줄이거나 끊지 말고 반드시 수의사와 상의해야 한다.</p>

<h2>스테로이드가 쓰이는 경우</h2>
<ul>
<li>알레르기·아토피 피부염의 가려움 조절</li>
<li>면역 매개 질환(면역매개용혈성빈혈, 면역매개혈소판감소증 등)</li>
<li>염증성 장질환, 일부 관절·척추 질환의 염증 조절</li>
<li>일부 종양의 완화 치료</li>
</ul>

<h2>장기 복용 시 부작용</h2>
<table>
<thead><tr><th>부작용</th><th>설명</th></tr></thead>
<tbody>
<tr><td>물 많이 마시고 소변 많이 봄, 식욕 증가</td><td>흔한 초기 반응. 배변 실수가 늘 수 있다</td></tr>
<tr><td>체중 증가, 배가 나옴, 근육 위축</td><td>장기 복용 시 근력이 약해질 수 있다</td></tr>
<tr><td>피부·털 변화</td><td>피부가 얇아지고 상처가 잘 낫지 않는다. 탈모가 생기기도 한다</td></tr>
<tr><td>감염 위험</td><td>방광염 등 요로 감염, 피부 감염, 모낭충 증가가 생길 수 있다</td></tr>
<tr><td>위장 문제</td><td>구토, 위궤양 위험. 비스테로이드성 소염제와 함께 쓰면 특히 위험하다</td></tr>
<tr><td>대사 문제</td><td>간 수치 상승, 인슐린 저항성과 당뇨 가능성, 의인성 쿠싱 증후군</td></tr>
</tbody>
</table>

<h2>복용 중 점검</h2>
<ul>
<li>정기적으로 혈액 검사와 소변 검사로 간·혈당·요로 감염 여부를 확인한다.</li>
<li>체중, 음수량, 식욕, 활동량을 기록해 병원에 알린다.</li>
<li>필요한 최소 용량과 최소 기간으로 조절할 수 있는지 수의사와 계속 논의한다.</li>
<li>다른 약(특히 소염진통제)을 함께 쓰기 전에는 반드시 수의사에게 확인한다.</li>
</ul>

<div class="callout-dog">
<strong>절대 하지 말아야 할 것</strong><br>
• 증상이 좋아졌다고 임의로 중단하기 — 부신 기능 때문에 장기 복용 후에는 서서히 줄여야 한다<br>
• 사람 약이나 남은 약을 임의로 먹이기<br>
• 다른 소염진통제를 함께 주기
</div>

<h2>부작용을 줄이는 방법</h2>
<p>알레르기 질환이라면 스테로이드 용량을 줄일 수 있는 다른 치료(면역 조절 약물, 알레르기 주사, 식이 관리, 샴푸 요법, 벼룩 예방)가 있는지 수의사와 상의한다. 질환별로 대안이 달라서 담당 수의사에게 선택지를 확인하는 것이 좋다.</p>

<h2>이런 증상이면 병원</h2>
<ul>
<li>검은색 변이나 구토, 식욕 부진</li>
<li>갑자기 심해진 갈증과 배뇨, 처짐</li>
<li>상처가 낫지 않거나 피부 감염이 반복됨</li>
</ul>

<h2>마지막으로</h2>
<p>스테로이드는 잘 쓰면 삶의 질을 크게 높이는 약이다. 정기 검진과 투약 기록으로 이익과 부작용 사이의 균형을 맞추자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.akc.org/expert-advice/health/prednisone-for-dogs/ — AKC, Prednisone for Dogs",
      "https://www.thrivepetcare.com/thrive-guide/prednisone-side-effects-in-dogs — Thrive Pet Healthcare, Prednisone side effects in dogs",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-12-01T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-642",
    slug: "cat-polyuria-polydipsia-workup",
    type: "blog",
    category: 3,
    title: "고양이 물 많이 마시고 소변 많이 볼 때 — 원인 파악 방법",
    subtitle: "다뇨·다음의 주요 원인 4가지, 진단 검사 순서, 집에서 먼저 확인할 것",
    metaTitle: "고양이 다뇨·다음 원인 파악 — CKD·당뇨·갑상선항진증·쿠싱 가이드 | 펫지기",
    metaDescription: "고양이가 물을 많이 마시고 소변을 많이 볼 때 원인 파악 방법. 주요 원인 4가지(CKD·당뇨·갑상선항진증·쿠싱), 진단 검사 순서를 정리했습니다.",
    body: `<p>고양이가 평소보다 물을 훨씬 많이 마시고 소변량이 늘었다면 더위 탓으로 넘기지 말고 원인을 확인해야 한다. 이런 변화를 다음·다뇨라고 부르며, 만성 신장병이나 당뇨병 같은 질환의 초기 신호일 수 있다. 집에서 확인할 것과 병원에서 진행하는 검사 순서를 정리했다.</p>

<h2>흔한 원인</h2>
<table>
<thead><tr><th>원인</th><th>특징</th></tr></thead>
<tbody>
<tr><td>만성 신장병</td><td>고양이에서 가장 흔한 원인으로 꼽힌다. 신장이 소변을 농축하는 능력이 떨어져 소변량이 늘고 물을 더 마신다</td></tr>
<tr><td>당뇨병</td><td>혈당이 높아 포도당이 소변으로 빠져나가며 소변량이 늘어난다. 식욕은 오히려 늘면서 체중이 빠질 수 있다</td></tr>
<tr><td>갑상선기능항진증</td><td>노령묘에서 흔하다. 대사가 올라가 음수·배뇨가 늘고 체중 감소, 구토, 활동 증가가 함께 나타난다</td></tr>
<tr><td>그 외</td><td>간 질환, 고칼슘혈증, 자궁축농증(중성화 안 한 암컷), 부신 질환, 일부 약물, 습식 대신 건사료만 먹이는 경우 등</td></tr>
</tbody>
</table>
<p>수의학 자료는 만성 신부전과 당뇨병이 고양이 다음·다뇨의 가장 흔한 원인이라고 설명한다. 다만 원인이 한 가지가 아닐 수도 있어서 검사로 확인해야 한다.</p>

<h2>집에서 먼저 확인할 것</h2>
<ul>
<li>물그릇이 비는 속도가 눈에 띄게 빨라졌는지</li>
<li>화장실 모래 덩어리가 평소보다 크거나 많아졌는지, 사용 빈도가 늘었는지</li>
<li>체중 변화 (줄었는지, 늘었는지)</li>
<li>식욕 변화, 구토, 활동량 변화, 털 상태</li>
<li>최근 새 사료·약·영양제를 시작했는지</li>
</ul>
<p>가능하면 24시간 동안 마신 물의 양과 소변 덩어리 개수를 기록해 병원에 가져간다. 여러 마리를 키운다면 누가 많이 마시는지 구분이 어렵다는 점도 알려야 한다.</p>

<h2>병원에서의 검사 순서</h2>
<ol>
<li><strong>문진과 신체검사</strong>: 체중, 탈수, 갑상선 촉진, 심박 등을 확인한다.</li>
<li><strong>소변 검사</strong>: 소변 비중(농축 정도), 포도당, 단백질, 염증 소견을 본다. 비중이 낮으면 다뇨를 의심한다.</li>
<li><strong>혈액 검사</strong>: 신장 수치, 혈당, 간 수치, 칼슘과 갑상선 호르몬(T4) 등을 확인한다.</li>
<li><strong>추가 검사</strong>: 혈압 측정, 영상 검사(초음파, 방사선), 요배양 검사 등.</li>
</ol>

<div class="callout-cat">
<strong>바로 병원에 가야 하는 경우</strong><br>
• 물을 많이 마시면서 구토, 처짐, 식욕 부진이 함께 나타난다<br>
• 소변을 보려 하지만 나오지 않거나 통증을 보인다<br>
• 호흡이 거칠거나 갑자기 쓰러진다<br>
• 체중이 짧은 기간에 눈에 띄게 줄었다
</div>

<h2>집에서 물 섭취를 제한하지 말 것</h2>
<p>다음·다뇨가 있는 고양이는 물을 많이 마시는 것이 신체의 보상 작용일 수 있다. 원인을 모른 채 물을 줄이면 탈수가 올 수 있으므로 신선한 물을 충분히 주고 진료를 받는다.</p>

<h2>마지막으로</h2>
<p>음수량 증가는 보호자가 가장 먼저 알아챌 수 있는 질환의 신호다. 변화를 기록하고, 3~4일 이상 이어지면 병원에서 검사를 받자. 조기 발견이 치료 선택지를 넓힌다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.dvm360.com/view/clinical-approach-polyuria-proceedings — dvm360, Clinical approach to polyuria",
      "https://vetsandclinics.com/en/library/polydipsia-leading-causes-in-cats-and-dogs — Vets & Clinics, Polydipsia: leading causes in cats and dogs",
      "https://www.petplace.com/article/cats/diseases-conditions-of-cats/symptoms/polydipsia-and-polyuria-excessive-drinking-and-urinating-in-cats — PetPlace, Excessive drinking and urinating in cats",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-12-02T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-643",
    slug: "senior-dog-gentle-exercise-guide",
    type: "blog",
    category: 5,
    title: "노령견에게 맞는 운동 — 무리 없이 움직임을 유지하는 방법",
    subtitle: "노령견 운동 원칙, 관절 질환 보유 강아지 운동, 수중 재활, 운동 중단 신호",
    metaTitle: "노령견 운동 가이드 — 관절 보호·수중 재활·운동 강도 조절 | 펫지기",
    metaDescription: "노령견에게 맞는 운동 방법. 관절 질환 보유 강아지 운동 조절, 수중 재활 효과, 운동 강도 조절 기준, 운동 중단해야 하는 신호를 정리했습니다.",
    body: `<p>노령견도 운동이 필요하다. 활동을 줄이면 근육이 빠지고 체중이 늘어 관절염이 악화되기 쉽다. 다만 젊은 시절과 같은 강도는 무리이므로, 관절에 부담이 적은 운동을 꾸준히 하는 것이 목표다.</p>

<h2>시작 전에</h2>
<ul>
<li>운동을 늘리거나 바꾸기 전에 수의사에게 관절, 심장, 호흡기 상태를 확인받는다.</li>
<li>새 운동은 한 번에 한 가지씩, 천천히 시작한다.</li>
<li>운동 후 절뚝임, 뻣뻣함, 헐떡임이 오래가면 강도를 낮춘다.</li>
</ul>

<h2>권장하는 저충격 운동</h2>
<table>
<thead><tr><th>운동</th><th>방법과 주의</th></tr></thead>
<tbody>
<tr><td>평지 산책</td><td>짧게 자주 걷는다. 풀밭이나 흙길처럼 푹신한 바닥이 좋다. 시작 전 가볍게 걷기로 준비 운동을 한다</td></tr>
<tr><td>수영·수중 운동</td><td>관절 부담이 적어 노령견에 적합한 운동으로 소개된다. 수술 후라면 봉합이 아물고 실밥을 제거한 뒤에 시작한다. 진입·탈출 계단이 있는 안전한 장소에서 구명조끼를 입힌다</td></tr>
<tr><td>노즈워크</td><td>간식을 숨겨 찾게 하는 후각 놀이. 몸 부담 없이 정신 자극</td></tr>
<tr><td>가벼운 스트레칭·마사지</td><td>수의사나 재활 전문가에게 방법을 배워서 한다</td></tr>
<tr><td>재활 운동</td><td>수중 러닝머신 등 전문 재활 시설의 프로그램</td></tr>
</tbody>
</table>

<h2>피해야 할 것</h2>
<ul>
<li>점프, 급정지·급회전이 많은 원반·공 던지기</li>
<li>미끄러운 바닥에서의 달리기</li>
<li>더운 낮 시간 장시간 운동 (노령견은 열에 약하다)</li>
<li>통증을 참고 따라오는데도 계속 끌고 가기</li>
</ul>

<div class="callout-dog">
<strong>무리했다는 신호</strong><br>
• 운동 후 절뚝임이 다음 날까지 이어진다<br>
• 일어서기 어려워하고 심하게 헐떡인다<br>
• 평소보다 식욕이나 기운이 떨어진다<br>
→ 강도를 줄이고 수의사와 통증 관리를 상의한다
</div>

<h2>환경 조정</h2>
<ul>
<li>미끄럼 방지 매트로 집 안 바닥을 정리한다.</li>
<li>침대·소파에 경사로를 놓아 점프를 줄인다.</li>
<li>추운 날은 산책 전 몸을 따뜻하게 하고 짧게 한다.</li>
<li>체중이 늘지 않게 식사량을 점검한다. 비만은 관절 통증을 악화시킨다.</li>
</ul>

<h2>마지막으로</h2>
<p>노령견의 운동은 '적게, 자주, 부드럽게'가 원칙이다. 개의 반응을 보며 강도를 조절하고, 통증이 의심되면 약물·재활 치료를 수의사와 상의하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.akc.org/expert-advice/health/swimming-senior-dogs/ — AKC, Swimming for senior dogs",
      "https://www.petmd.com/dog/general-health/how-to-exercise-your-senior-dog — PetMD, How to exercise your senior dog",
      "https://www.akc.org/expert-advice/health/hydrotherapy-for-dogs-growing-trend-in-canine-physical-therapy — AKC, Hydrotherapy for dogs",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-02T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-644",
    slug: "petshop-purchased-dog-consumer-rights",
    type: "blog",
    category: 4,
    title: "펫숍 강아지 구입 후 질병 — 소비자 권리와 반품·환불 가능 여부",
    subtitle: "펫숍 구입 강아지 질병 발생 시 법적 권리, 계약 해제 기준, 손해배상 청구",
    metaTitle: "펫숍 강아지 질병 소비자 권리 — 반품·환불·손해배상 가이드 | 펫지기",
    metaDescription: "펫숍에서 구입한 강아지가 아프면 소비자 권리. 계약 해제 기준, 반품·환불 가능 여부, 손해배상 청구 방법, 한국소비자원 신고 절차를 정리했습니다.",
    body: `<p>펫숍이나 분양 업체에서 데려온 강아지가 며칠 만에 아프거나 죽는 피해가 반복된다. 이럴 때 소비자가 알아 둘 권리와 대응 순서를 정리했다. 구체적인 기준과 기간은 개정될 수 있으므로 한국소비자원(1372)이나 공정거래위원회 고시의 현행 내용을 확인해야 한다.</p>

<h2>소비자분쟁해결기준의 기본 틀</h2>
<p>공정거래위원회가 고시한 소비자분쟁해결기준에는 반려동물 판매 관련 분쟁의 처리 기준이 있다. 보도된 내용 기준으로는 구입 후 15일 이내 폐사하면 같은 종류의 동물로 교환하거나 구입금액을 환불하고, 15일 이내 질병이 발생하면 업체가 치료해서 인도하는 것이 기본 틀이다. 이 기준은 분쟁 해결의 참고 기준이며, 실제 적용은 계약 내용과 사실관계에 따라 달라질 수 있다. 한국소비자원 분석에서는 폐사·질병 피해의 대부분이 구입 후 짧은 기간 안에 발생했다고 보도되었다.</p>

<div class="callout-dog">
<strong>계약서의 불리한 조항에 주의</strong><br>
• '생명체이므로 환불 불가', '3일 이내 폐사만 교환' 같은 조항은 기준보다 소비자에게 불리할 수 있다<br>
• 서명했다는 이유로 권리를 포기한 것은 아닐 수 있으므로 소비자원에 상담한다<br>
• 계약서에 업체 정보, 동물의 출생일, 접종 기록, 건강 상태가 적혀 있는지 확인한다
</div>

<h2>구입할 때 확인할 것</h2>
<ul>
<li><strong>등록 업체인지</strong>: 동물판매업은 지자체에 등록해야 하는 업종이다. 등록증과 사업장 정보를 확인한다.</li>
<li><strong>계약서·영수증</strong>: 품종, 성별, 출생일, 접종·구충 기록, 부모견 정보, 가격, 환불·교환 조건을 서면으로 받는다.</li>
<li><strong>건강 상태</strong>: 구입 직후 가능한 한 빨리 수의사에게 건강 검진을 받는다. 진료 기록과 진단서는 증거가 된다.</li>
<li><strong>동물등록</strong>: 소유권 이전과 등록 정보를 확인한다.</li>
</ul>

<h2>문제가 생겼을 때 순서</h2>
<ol>
<li><strong>즉시 병원 진료</strong>: 진단서, 진료비 영수증을 받는다. 어디서 감염되었는지 확인하는 검사 결과가 있으면 보관한다.</li>
<li><strong>업체에 서면 통보</strong>: 문자·이메일·내용증명 등 기록이 남는 방식으로 상황과 요구 사항(치료, 교환, 환불)을 알린다.</li>
<li><strong>증거 보관</strong>: 계약서, 광고 캡처, 대화 기록, 사진·영상, 결제 내역.</li>
<li><strong>상담·피해 구제</strong>: 한국소비자원 1372 소비자상담센터에 상담·피해구제를 신청한다.</li>
<li><strong>신고·조정</strong>: 무등록 영업이나 허위 광고가 의심되면 관할 지자체에 신고한다.</li>
</ol>

<h2>예방</h2>
<p>충동 구매를 피하고 보호소 입양도 고려한다 (<a href="/blog/dog-adoption-vs-purchase-guide">입양 vs 구매 가이드</a>). 분양 사기 예방은 <a href="/blog/pet-adoption-scam-prevention">분양 사기 예방</a>을 참고한다.</p>

<h2>마지막으로</h2>
<p>피해가 생기면 증거를 모으고 빠르게 기록으로 남기는 것이 가장 중요하다. 기준과 절차는 바뀔 수 있으니 한국소비자원에서 최신 내용을 확인하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.dailyvet.co.kr/?p=26851 — 데일리벳, 반려동물 소비자피해 85%가 폐사·질병",
      "https://www.dailyvet.co.kr/print?id=157717 — 데일리벳, 반려동물 소비자 피해상담, 분양 관련 피해가 동물병원의 5배",
      "https://www.etoday.co.kr/news/view/197847 — 이투데이, 늘어나는 '애완견' 피해 어찌하오리까",
    ],
    disclaimer: "이 글은 일반적인 정보 제공 목적으로 작성되었으며, 법률·세무·소비자 분쟁에 대한 전문가 자문을 대체하지 않습니다. 법령과 제도는 자주 바뀌므로 실제 적용 전 관할 기관(지자체, 한국소비자원, 농림축산검역본부 등)이나 전문가에게 최신 내용을 확인하세요.",
    status: "published",
    publishedAt: "2026-12-03T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-645",
    slug: "special-needs-pet-adoption",
    type: "blog",
    category: 1,
    title: "장애·특수 반려동물 입양 — 다름이 덜 사랑스러운 것이 아니다",
    subtitle: "시각·청각 장애 반려동물, 삼지 동물, 만성 질환 동물 입양 현실과 준비",
    metaTitle: "장애 반려동물 입양 — 시각·청각 장애·삼지 동물 케어 가이드 | 펫지기",
    metaDescription: "장애·특수 반려동물 입양을 고려하는 분들을 위한 가이드. 시각·청각 장애 동물 케어, 삼지 동물 관리, 만성 질환 동물 의료비 준비, 입양의 의미를 정리했습니다.",
    body: `<p>시각·청각 장애가 있거나 다리 하나가 없거나 만성 질환이 있는 동물은 보호소에서 입양되기 가장 어려운 편이다. 하지만 이런 동물도 적절한 돌봄이 있으면 행복하게 살 수 있다. 입양 전 확인할 점과 장애별 준비를 정리했다.</p>

<h2>입양 전 점검</h2>
<ul>
<li><strong>비용</strong>: 장기 약물, 물리치료, 정기 검진 비용이 들 수 있다. 수의사와 예상 비용과 치료 선택지를 먼저 상담한다.</li>
<li><strong>시간과 체력</strong>: 약 투여, 이동 보조, 청소 등 돌봄 시간이 필요하다.</li>
<li><strong>가족 합의</strong>: 모든 가족이 장기 돌봄에 동의했는지 확인한다.</li>
<li><strong>개체의 성격</strong>: 장애보다 그 동물의 성격과 생활 방식이 우선이다.</li>
<li><strong>의료 기록</strong>: 진단명, 앞으로 예상되는 경과, 현재 치료를 보호소에 질문한다.</li>
</ul>

<h2>장애별 환경 준비</h2>
<table>
<thead><tr><th>유형</th><th>준비</th></tr></thead>
<tbody>
<tr><td>시각 장애</td><td>가구 배치를 바꾸지 않고, 계단에는 안전문을 설치한다. 소리·냄새 단서(방향 표시)를 활용한다</td></tr>
<tr><td>청각 장애</td><td>손 신호와 시각적 신호를 훈련한다. 뒤에서 놀라지 않게 접근하고, 외출 시 안전을 철저히 한다</td></tr>
<tr><td>다리 결손·마비</td><td>미끄럼 방지 바닥, 경사로, 필요하면 보조 기구(휠체어, 하네스). 체중 관리가 중요하다</td></tr>
<tr><td>만성 질환 (심장, 신장, 당뇨 등)</td><td>투약 일정, 식이 관리, 정기 검사. 응급 상황 대처법을 수의사에게 미리 배운다</td></tr>
<tr><td>행동적 어려움 (심한 불안, 공포)</td><td>행동 전문가 상담, 안전한 공간 마련</td></tr>
</tbody>
</table>

<div class="callout-cat">
<strong>마음가짐</strong><br>
• 많은 동물이 장애에 잘 적응하며, 보호자가 걱정하는 것보다 잘 지내기도 한다<br>
• 다만 모든 동물이 같지 않다 — 통증과 스트레스를 세심히 관찰해야 한다<br>
• 삶의 질을 기준으로 수의사와 치료 방향을 계속 점검한다
</div>

<h2>입양 후 지원</h2>
<ul>
<li>보호소·구조단체에서 의료비 지원이나 후속 상담을 제공하는지 확인한다.</li>
<li>같은 상황의 보호자 모임에서 정보를 얻는다.</li>
<li>펫보험은 기존 질환(가입 전 진단된 질환)이 보장에서 제외되는 경우가 많아 약관을 확인한다.</li>
</ul>

<h2>마지막으로</h2>
<p>특별한 돌봄이 필요한 동물의 입양은 큰 책임이지만 큰 보람도 있다. 충분히 알아보고 가족이 함께 결정하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.wisdompanel.com/en-us/blog/adopting-a-dog-with-special-needs — Wisdom Panel, Adopting a Dog With Special Needs",
      "https://www.24petwatch.com/blog/what-you-need-to-know-before-you-adopt-a-specially-abled-pet — 24Petwatch, What you need to know before you adopt a specially-abled pet",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-03T11:00:00.000Z",
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
  console.log("블로그 포스트 104차 시딩 완료! (blog-641 ~ blog-645)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
