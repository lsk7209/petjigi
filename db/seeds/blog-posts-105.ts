import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 105 — cat2×2 + cat3×1 + cat5×1 + cat6×1 = 5편 (IDs 646-650)
// Macros: D, A, B, F, E
// Angles: RA4, RA1, RA2, RA4, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-646",
    slug: "dog-dehydration-check-guide",
    type: "blog",
    category: 2,
    title: "강아지 탈수 확인법 — 집에서 30초로 체크하는 방법",
    subtitle: "피부 탄성 검사, 잇몸 수분 확인, 탈수 증상 단계, 즉시 병원 기준",
    metaTitle: "강아지 탈수 확인법 — 피부 탄성·잇몸 체크 30초 가이드 | 펫지기",
    metaDescription: "강아지 탈수 여부를 집에서 30초에 확인하는 방법. 피부 탄성 검사, 잇몸 수분 확인법, 탈수 정도별 증상, 즉시 동물병원에 가야 하는 기준을 정리했습니다.",
    body: `<p>강아지는 구토, 설사, 더위, 질병으로 쉽게 탈수될 수 있다. 심해지면 장기가 손상되므로 초기 신호를 알아채는 것이 중요하다. 집에서 확인하는 방법과 병원에 가야 하는 기준을 정리했다. 집 검사는 참고용이며 정확한 진단은 수의사가 한다.</p>

<h2>탈수의 신호</h2>
<ul>
<li>잇몸이 끈적하거나 마르다</li>
<li>기운이 없고 축 처진다</li>
<li>눈이 움푹 들어간다</li>
<li>코가 마르고 소변이 진하거나 적다</li>
<li>헐떡임, 식욕 감소, 구토·설사 동반</li>
</ul>

<h2>집에서 해 보는 두 가지 확인</h2>
<table>
<thead><tr><th>방법</th><th>하는 법</th><th>해석</th></tr></thead>
<tbody>
<tr><td>피부 탄력(스킨 텐트)</td><td>어깨 뒤나 목덜미 피부를 가볍게 집어 올렸다 놓는다</td><td>바로 제자리로 돌아오면 정상. 천천히 돌아오거나 텐트처럼 서 있으면 탈수를 의심한다</td></tr>
<tr><td>모세혈관 재충혈 시간</td><td>잇몸을 손가락으로 눌러 하얗게 만든 뒤 놓고, 분홍색이 돌아오는 시간을 잰다</td><td>대개 1~2초 안에 돌아오면 정상. 2초 이상 걸리면 탈수가 진행된 것일 수 있다</td></tr>
</tbody>
</table>
<p>건강할 때 미리 연습해 두면 평소 상태와 비교하기 쉽다. 피부 탄력은 주름이 많은 견종(샤페이, 불독), 노령견, 털이 긴 개에서는 판단이 어렵다. 피부가 텐트처럼 서 있을 정도면 이미 상당히 탈수된 것일 수 있다.</p>

<div class="callout-dog">
<strong>바로 병원에 가야 하는 경우</strong><br>
• 눈이 움푹 들어가거나 매우 처져서 반응이 둔하다<br>
• 물을 마셔도 토한다<br>
• 잇몸이 창백·붉다, 재충혈 시간이 길다<br>
• 구토·설사가 반복된다, 특히 어린 강아지·노령견<br>
• 열사병이 의심된다 (헐떡임, 침 흘림)
</div>

<h2>가벼운 경우의 대처</h2>
<ul>
<li>신선한 물을 소량씩 자주 마시게 한다. 한꺼번에 많이 마시면 토할 수 있다.</li>
<li>가능하면 시원하고 그늘진 곳에서 쉬게 한다.</li>
<li>구토나 설사가 있다면 원인을 확인해야 하므로 반나절~하루 안에 호전되지 않으면 진료를 받는다.</li>
<li>전해질 음료나 사람 약을 임의로 먹이지 않는다.</li>
</ul>

<h2>탈수를 막는 습관</h2>
<ul>
<li>물그릇을 항상 신선하게 유지하고 여러 곳에 둔다.</li>
<li>더운 날 산책 중에도 물을 챙긴다.</li>
<li>습식 사료를 섞으면 수분 섭취가 늘어난다.</li>
<li>물 마시는 양이 갑자기 늘거나 줄면 질환의 신호일 수 있어 기록한다.</li>
</ul>

<h2>마지막으로</h2>
<p>의심되면 집에서 오래 지켜보지 말고 병원에 연락하자. 소형견과 어린 강아지는 탈수 진행이 빠르다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.webvet.com/dehydration-in-dogs/ — WebVet, Dehydration in dogs",
      "https://www.zoetispetcare.com/blog/article/signs-dehydration-dogs — Zoetis Petcare, Signs of dehydration in dogs",
      "https://www.hepper.com/dehydration-in-dogs/ — Hepper, Dehydration in dogs",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-04T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-647",
    slug: "cat-iodine-restricted-hyperthyroid-diet",
    type: "blog",
    category: 2,
    title: "고양이 갑상선항진증 요오드 제한 식이 — 힐스 y/d 완전 해설",
    subtitle: "요오드 제한 식이 원리, 효과와 한계, 완전 제한의 어려움, 사용 조건",
    metaTitle: "고양이 갑상선항진증 요오드 제한 식이 — y/d 효과와 한계 | 펫지기",
    metaDescription: "고양이 갑상선항진증 치료에 사용되는 요오드 제한 식이(힐스 y/d) 완전 해설. 원리, 효과와 한계, 완전 제한이 어려운 이유, 올바른 사용 조건을 정리했습니다.",
    body: `<p>갑상선기능항진증은 노령 고양이에서 흔한 호르몬 질환이다. 치료는 약물, 방사성 요오드, 수술이 기본이고, 식이 요법으로 요오드를 제한한 처방식(예: 힐스 y/d)도 하나의 선택지로 쓰인다. 식이 요법의 장점과 한계를 정리했다.</p>

<h2>요오드 제한 처방식이란</h2>
<p>갑상선 호르몬은 요오드를 원료로 만든다. 먹이의 요오드를 엄격히 제한해 호르몬 생성을 줄이는 방식이다. 이 식단이 효과를 내려면 다른 음식을 일절 먹이지 않고 처방식만 먹여야 한다.</p>

<h2>효과에 대한 연구</h2>
<ul>
<li>코넬대 연구진이 8마리의 갑상선기능항진증 고양이를 1년간 요오드 제한 식이로 관찰한 연구에서 6마리가 4주째 총 T4가 정상화되었다. 초기 수치가 가장 높았던 2마리는 정상화되지 않았다. 표본이 매우 작다.</li>
<li>y/d만 먹인 49마리를 후향적으로 본 연구에서는 83%에서 총 T4가 정상화되었으나, 요약 평가는 유망하지만 아직 1차 치료로 권하기는 이르다는 것이다.</li>
<li>제조사가 후원한 12주 무작위 시험에서는 처방식군 12마리 중 6마리가 정상 갑상선 상태가 되었다.</li>
</ul>

<h2>치료법 비교</h2>
<table>
<thead><tr><th>방법</th><th>장점</th><th>단점·주의</th></tr></thead>
<tbody>
<tr><td>항갑상선 약물(메티마졸 등)</td><td>비교적 접근이 쉽다</td><td>평생 매일 복용, 부작용 모니터링과 정기 혈액 검사 필요</td></tr>
<tr><td>방사성 요오드</td><td>완치 가능성이 높다</td><td>전문 시설과 입원 필요</td></tr>
<tr><td>수술(갑상선 절제)</td><td>완치 가능</td><td>마취 위험, 부갑상선 합병증</td></tr>
<tr><td>요오드 제한 처방식</td><td>약이나 수술 없이 관리할 수 있다</td><td>다른 음식·간식·사냥 금지가 필수. 일부 고양이는 정상화되지 않을 수 있고 신장병이 동반된 고양이는 신중하게 모니터링해야 한다</td></tr>
</tbody>
</table>

<div class="callout-cat">
<strong>식이 요법을 쓰려면 지켜야 할 것</strong><br>
• 처방식 외 간식·사람 음식·다른 고양이 사료를 일절 주지 않는다 (다묘 가정은 특히 어렵다)<br>
• 실외 출입으로 다른 먹이를 먹는 고양이에게는 맞지 않는다<br>
• 4주 후 T4, 이후 정기적으로 혈액 검사(신장 수치 포함)를 받는다<br>
• 식이 요법만으로 조절이 안 되면 다른 치료로 바꾼다
</div>

<h2>신장 상태 확인이 중요</h2>
<p>갑상선기능항진증은 신장 혈류를 늘려 신장병을 가릴 수 있다. 치료로 갑상선 수치가 내려가면 숨어 있던 신장 문제가 드러나기도 한다. 어떤 치료든 신장 수치를 함께 추적한다.</p>

<h2>마지막으로</h2>
<p>요오드 제한 식이는 조건이 맞는 고양이에게 좋은 선택지가 될 수 있지만 모든 고양이에게 맞지는 않는다. 수의사와 상담해 고양이의 생활 환경에 맞는 치료를 고르자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.dovepress.com/one-year-study-evaluating-efficacy-of-an-iodinerestricted-diet-for-the-peer-reviewed-fulltext-article-VMRR — Veterinary Medicine: Research and Reports, 요오드 제한 식이 1년 연구(Cornell)",
      "https://dvm360.com/view/journal-scan-hyperthyroid-cats-iodine-restriction-enough — dvm360, Journal scan: Hyperthyroid cats: Is iodine restriction enough?",
      "https://www.petfoodindustry.com/nutrition/article/15460626/effects-of-a-restricted-iodine-food-on-cats-with-hyperthyroidism — Petfood Industry, Effects of a restricted iodine food on cats with hyperthyroidism",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-04T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-648",
    slug: "dog-hip-dysplasia-management",
    type: "blog",
    category: 3,
    title: "강아지 고관절 이형성증 — 대형견 통증의 주요 원인",
    subtitle: "고관절 이형성증 진단 기준, 품종별 위험, 체중 관리의 중요성, 수술 vs 관리",
    metaTitle: "강아지 고관절 이형성증 — 진단·체중 관리·수술 기준 가이드 | 펫지기",
    metaDescription: "강아지 고관절 이형성증 원인과 관리 방법. 고위험 품종, 진단 기준(OFA·PennHIP), 체중 관리 중요성, 수술과 보존 치료 비교를 정리했습니다.",
    body: `<p>고관절 이형성증은 엉덩이 관절의 구조가 비정상적으로 발달해 관절이 느슨해지고 시간이 지나면서 관절염으로 이어지는 질환이다. 대형견에서 흔하지만 소형견에서도 생길 수 있다. 완치보다는 평생 관리가 핵심이며, 체중과 운동 관리가 가장 기본이다.</p>

<h2>어떤 병인가</h2>
<p>유전적 요인이 크고, 급격한 성장, 체중 과다, 영양 불균형 같은 환경 요인이 증상에 영향을 준다. 어릴 때 이미 관절이 느슨해져 있어도 증상은 나이가 들면서 나타나는 경우가 많다.</p>

<h2>증상</h2>
<ul>
<li>일어나기 힘들어함, 계단·점프 기피, 달리기 싫어함</li>
<li>토끼뜀처럼 두 뒷다리를 모아 뛰는 걸음, 엉덩이를 흔드는 걸음</li>
<li>뒷다리 근육이 줄어듦, 허리가 굽음</li>
<li>운동 후 절뚝임이 심해지고 아침에 뻣뻣함</li>
</ul>

<h2>진단</h2>
<p>신체검사(관절 느슨함 확인)와 방사선 검사로 진단한다. 정확한 평가를 위해 진정 하에 특수 자세로 촬영하는 경우가 많다. 번식 계획이 있는 견종은 공인된 기관의 고관절 평가를 받는 것이 권장된다.</p>

<h2>비수술적 관리</h2>
<table>
<thead><tr><th>관리</th><th>방법</th></tr></thead>
<tbody>
<tr><td>체중 조절</td><td>가장 중요하다. 마른 체형을 유지하면 관절 부담이 줄고 증상 진행이 늦어질 수 있다</td></tr>
<tr><td>운동</td><td>짧고 꾸준한 산책, 수영·수중 러닝머신 같은 저충격 운동. 급격한 점프·계단·원반 던지기는 줄인다</td></tr>
<tr><td>약물</td><td>소염진통제 등 통증 조절 약물은 수의사 처방으로 사용한다. 사람 약을 임의로 먹이지 않는다</td></tr>
<tr><td>보조제·재활</td><td>관절 영양제, 물리치료, 마사지, 침 등을 보조적으로 쓸 수 있다. 효과는 개체마다 다르다</td></tr>
<tr><td>환경</td><td>미끄럼 방지 매트, 낮은 침대, 계단 경사로를 설치한다</td></tr>
</tbody>
</table>

<h2>수술을 고려하는 경우</h2>
<p>보존적 관리로 통증이 조절되지 않거나 증상이 심한 경우 수술을 상의한다. 연령과 관절 상태에 따라 선택지가 다르다.</p>
<ul>
<li><strong>골반골 절골술</strong>: 어린 강아지에서 관절염이 진행되기 전에 고려</li>
<li><strong>대퇴골두 절제술</strong>: 통증을 줄이는 구제적 수술</li>
<li><strong>인공 고관절 치환술</strong>: 기능 회복에 도움이 되는 방법으로 소개되지만 전문 병원 의뢰가 필요하고 비용이 크다</li>
</ul>

<div class="callout-dog">
<strong>성장기 강아지 예방 관리</strong><br>
• 대형견은 성장기 과영양과 과체중을 피한다<br>
• 대형견용 퍼피 사료를 선택하고 급여량을 지킨다<br>
• 미끄러운 바닥, 과도한 점프를 줄인다<br>
• 호발 견종은 부모견의 관절 검사 결과를 확인하고 입양한다
</div>

<h2>마지막으로</h2>
<p>고관절 이형성증은 체중과 운동 관리를 평생 이어가야 하는 질환이다. 통증 조절과 활동 유지를 목표로 수의사와 개체별 계획을 세우자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://amcny.org/?p=62684 — Animal Medical Center, Hip Dysplasia in Dogs",
      "https://www.pdsa.org.uk/media/7120/phh_dog_c_hip-dysplasia-in-dogs.pdf — PDSA, Hip dysplasia in dogs",
      "https://vetsrev.nottingham.ac.uk/bibliography/kirkby_canine_2012.html — University of Nottingham VetSRev, canine hip dysplasia 관리 체계적 문헌 고찰",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-12-05T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-649",
    slug: "dog-nail-grinding-dremel-guide",
    type: "blog",
    category: 5,
    title: "강아지 발톱 그라인더(드레멜) 사용법 — 클리퍼가 무서운 강아지에게",
    subtitle: "그라인더 vs 클리퍼 차이, 훈련 방법, 안전 주의사항, 과열 방지",
    metaTitle: "강아지 발톱 그라인더 사용법 — 클리퍼 대안 완전 가이드 | 펫지기",
    metaDescription: "강아지 발톱 그라인더(드레멜) 올바른 사용 방법. 클리퍼와 비교, 소리 적응 훈련, 털 말림 방지, 과열 방지, 단계별 사용법을 정리했습니다.",
    body: `<p>발톱 연마기(그라인더, 드레멜)는 니퍼형 발톱깎이보다 발톱을 천천히 다듬을 수 있고 각이 둥글게 남아 쓰기 편하다. 하지만 소리와 진동에 겁을 먹는 강아지가 많고 잘못 쓰면 열과 출혈로 아플 수 있다. 처음 쓰는 방법과 안전 수칙을 정리했다.</p>

<h2>시작 전 준비</h2>
<ul>
<li>강아지 전용으로 소음이 적은 그라인더(저속 조절 가능)</li>
<li>간식과 칭찬</li>
<li>밝은 조명, 미끄러지지 않는 자리</li>
<li>출혈 대비 지혈제(지혈 가루)</li>
<li>보호자 눈 보호 안경과 환기가 되는 공간 (가루가 날린다)</li>
</ul>

<h2>적응 훈련 (며칠~몇 주)</h2>
<ol>
<li>그라인더를 꺼 둔 채로 냄새 맡게 하고 간식을 준다.</li>
<li>저속으로 켠 상태에서 소리만 들려준다 (몸에서 떨어진 곳).</li>
<li>켠 상태에서 발 근처에 가져가 간식을 주고 치운다.</li>
<li>발톱 하나에 1~2초만 갖다 대고 바로 보상한다.</li>
<li>시간을 조금씩 늘려 하루 한두 개씩 진행한다.</li>
</ol>
<p>짧은 세션으로 시작해 서서히 늘리는 것이 핵심이다. 무서워하면 단계를 되돌린다.</p>

<h2>연마 방법</h2>
<ul>
<li>발톱 끝에서부터 갈아 나가며 한 번에 한 곳을 오래 대지 않는다. 열이 발생할 수 있으니 자주 떼어 발톱 온도를 확인한다.</li>
<li>그라인더를 약 45도 각도로 대고 가볍게 움직인다. 세게 누르지 않는다.</li>
<li>발톱을 2~3초씩 끊어 갈고 멈춰서 단면을 본다.</li>
<li>털이 긴 개는 털이 말려들지 않게 정리하거나 다른 손으로 잡는다.</li>
</ul>

<div class="callout-dog">
<strong>혈관(퀵)을 조심</strong><br>
• 흰 발톱은 분홍색 혈관이 비쳐 보여 안전선을 찾기 쉽다<br>
• 검은 발톱은 단면의 중심이 어두운 원이나 젖은 듯한 점으로 보이면 혈관에 가까운 것이다<br>
• 피가 나면 지혈 가루를 눌러 주고 지혈될 때까지 압박한다. 지속적으로 나거나 개가 매우 아파하면 병원에 간다
</div>

<h2>얼마나 자주</h2>
<p>발톱이 바닥에 닿아 소리가 나거나 걸음걸이가 바뀌면 길다는 신호다. 보통 2~4주 간격으로 정리하면 짧게 유지하기 좋다. 너무 자주 하거나 한 번에 많이 갈지 않는다.</p>

<h2>피해야 할 때</h2>
<ul>
<li>발톱이 갈라지거나 감염, 부기, 분비물이 있다 → 병원에서 먼저 치료한다.</li>
<li>강아지가 공포를 심하게 보이면 억지로 하지 말고 훈련을 다시 시작하거나 미용사·병원에 맡긴다.</li>
</ul>

<h2>마지막으로</h2>
<p>그라인더는 훈련이 절반이다. 보상과 짧은 세션으로 천천히 적응시키면 발톱 관리가 부담스러운 일이 아니게 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://community.dremel.com/t5/the-news-from-dremel/grooming-your-pup-with-precision-a-guide-to-nail-care-using-a/ba-p/401 — Dremel, Grooming your pup with precision: nail care guide",
      "https://www.akc.org/expert-advice/grooming/how-to-groom-a-dog/ — AKC, How to groom a dog",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-05T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-650",
    slug: "petloss-returning-to-daily-life",
    type: "blog",
    category: 6,
    title: "펫로스 후 일상 복귀 — '이제 괜찮아도 되는가'라는 죄책감",
    subtitle: "회복이 배신이 아닌 이유, 웃을 수 있는 날이 오는 것의 의미, 새로운 관계",
    metaTitle: "펫로스 후 일상 복귀 — 회복의 죄책감과 다시 웃는 날의 의미 | 펫지기",
    metaDescription: "반려동물을 떠나보낸 후 일상으로 돌아오는 과정. 회복이 잊어버리는 것이 아닌 이유, 죄책감 없이 웃을 수 있는 날, 새로운 반려동물 관계에 대해 정리했습니다.",
    body: `<p>어느 날 문득 웃고 있다는 것을 발견한다. 그리고 곧바로 죄책감이 든다. "벌써 잊어버리는 건가?" — 그것은 잊어버리는 것이 아니다.</p>

<h2>회복이 배신이 아닌 이유</h2>
<p>슬픔은 파도와 같다. 처음에는 파도가 끊임없이 밀려와 숨을 쉴 수 없다. 시간이 지나면서 파도 사이의 간격이 생긴다. 그 간격이 잊어버리는 것이 아니라 숨 쉬는 것이다. 반려동물은 당신이 웃기를 원했을 것이다.</p>

<h2>죄책감을 다루는 방법</h2>
<ul>
<li>"괜찮아도 된다"는 허락을 스스로에게 주기</li>
<li>기억하는 방식이 달라지는 것 — 아픔에서 따뜻함으로</li>
<li>좋은 기억을 떠올릴 때 슬픔보다 미소가 먼저 오는 날이 온다 — 그것이 치유</li>
</ul>

<h2>일상이 회복되는 신호</h2>
<div class="callout-cat">
<strong>회복의 자연스러운 신호</strong><br>
• 평소처럼 밥을 먹을 수 있음<br>
• 반려동물 이야기를 다른 사람에게 할 수 있음<br>
• 길에서 강아지·고양이를 보고 미소가 생김<br>
• 하루 중 울지 않는 시간이 생김
</div>

<h2>새로운 반려동물과의 관계</h2>
<p>새 반려동물을 입양하는 것이 이전 반려동물을 대체하는 것이 아니다. 각각의 관계는 독립적이다. 준비가 됐을 때 — 그것이 한 달 후든 3년 후든 — 새로운 관계를 시작하는 것은 괜찮다.</p>

<h2>마지막으로</h2>
<p>당신이 회복한다는 것은 당신이 충분히 사랑했다는 증거다. 그리고 사랑할 수 있는 사람이 아직 있다는 뜻이기도 하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Worden, J.W. — Grief Counseling and Grief Therapy. Springer Publishing 2008",
      "한국펫로스증후군연구회 애도 회복 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-06T09:00:00.000Z",
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
  console.log("블로그 포스트 105차 시딩 완료! (blog-646 ~ blog-650)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
