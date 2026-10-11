import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 111 — cat3×2 + cat5×1 + cat1×1 + cat2×1 = 5편 (IDs 676-680)
// Macros: A, D, F, B, G
// Angles: RA5, RA2, RA8, RA4, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-676",
    slug: "cat-systemic-hypertension-guide",
    type: "blog",
    category: 3,
    title: "고양이 전신 고혈압 — 증상 없이 진행되는 침묵의 병",
    subtitle: "고혈압 원인 질환, 고혈압이 유발하는 장기 손상, 측정 방법, 약물 치료",
    metaTitle: "고양이 전신 고혈압 — 원인·장기 손상·치료 완전 가이드 | 펫지기",
    metaDescription: "고양이 전신 고혈압 원인과 치료. 증상 없이 진행하다 실명·심장·신장 손상을 일으키는 고혈압, 혈압 측정 방법, 암로디핀 치료 방법을 설명합니다.",
    body: `<p>고혈압은 노령 고양이에서 흔하지만 눈에 띄는 증상이 없어서 눈이나 신장, 뇌에 손상이 생긴 뒤에야 발견되는 경우가 많다. 만성 신장병이나 갑상선기능항진증이 있는 노령묘라면 정기적인 혈압 측정이 중요하다.</p>

<h2>원인</h2>
<p>고양이 고혈압은 다른 질환과 함께 진단되는 경우가 흔하다. ISFM 합의 가이드라인은 만성 신장병과 갑상선기능항진증을 대표적 동반 질환으로 든다. 원인 질환이 없는 경우도 있다. 신장 질환이 고혈압을 일으키는지, 고혈압이 신장을 손상시키는지는 확실하지 않은 부분이 있다.</p>

<h2>표적 장기 손상</h2>
<table>
<thead><tr><th>장기</th><th>나타날 수 있는 문제</th></tr></thead>
<tbody>
<tr><td>눈</td><td>망막 출혈, 망막 부종, 망막 박리, 갑작스러운 시력 저하·실명, 동공이 커짐 — 일부는 되돌릴 수 없다</td></tr>
<tr><td>신장</td><td>신장 손상 가속화, 단백뇨</td></tr>
<tr><td>심장</td><td>심장 잡음, 좌심실 비대</td></tr>
<tr><td>뇌</td><td>발작, 방향 감각 상실, 행동 변화</td></tr>
</tbody>
</table>

<div class="callout-cat">
<strong>이런 증상은 빠른 진료</strong><br>
• 갑자기 눈이 안 보이는 듯 부딪히거나 동공이 크게 열려 있다<br>
• 눈 안에 출혈이 보인다<br>
• 발작이나 심한 비틀거림이 나타난다<br>
→ 시력은 빠르게 치료하면 일부 회복될 수 있다
</div>

<h2>혈압 측정</h2>
<ul>
<li>조용한 환경에서 고양이가 적응할 시간을 준 뒤 측정한다.</li>
<li>도플러나 고해상도 오실로메트릭 장비로 여러 번 측정해 평균을 낸다 (첫 측정은 제외하는 방식이 권장된다).</li>
<li>병원에서 긴장하면 일시적으로 높게 나올 수 있어서 침착한 환경이 중요하다.</li>
<li>노령묘, 신장병·갑상선 질환이 있는 고양이는 정기적으로 측정한다.</li>
</ul>

<h2>치료</h2>
<ul>
<li><strong>원인 질환 치료</strong>: 신장병, 갑상선기능항진증을 함께 관리한다.</li>
<li><strong>혈압약</strong>: 암로디핀이 대표적인 치료제로 많은 고양이에서 효과적이다. 용량은 개체별로 다르고 재검진으로 조절한다. 약은 수의사 처방대로 먹인다.</li>
<li><strong>모니터링</strong>: 투약 후 1~2주 간격으로 혈압을 다시 재고 이후 정기적으로 확인한다.</li>
</ul>

<h2>집에서</h2>
<ul>
<li>약을 일정한 시간에 먹이고 빠뜨리지 않는다.</li>
<li>눈 모양, 시력, 행동 변화를 관찰한다.</li>
<li>스트레스를 줄이는 환경을 유지한다.</li>
</ul>

<h2>마지막으로</h2>
<p>고양이 고혈압은 조용히 진행되는 병이다. 7~8세가 넘었거나 신장·갑상선 질환이 있다면 정기 혈압 검사를 꼭 받자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.rcvsknowledge.org/resource/isfm-consensus-guidelines-on-the-diagnosis-and-management-of-hypertension-in-cats/ — RCVS Knowledge, ISFM consensus guidelines on hypertension in cats",
      "https://journals.sagepub.com/doi/10.1177/1098612X17693500 — Journal of Feline Medicine and Surgery 2017, ISFM Consensus Guidelines: Hypertension in Cats",
      "https://www.vettimes.com/news/vets/small-animal-vets/an-update-on-feline-hypertension — Vet Times, An update on feline hypertension",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-12-19T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-677",
    slug: "dog-vestibular-disease-sudden-tilt",
    type: "blog",
    category: 3,
    title: "강아지 전정기관 이상 — 갑자기 비틀거리고 눈이 돌아갈 때",
    subtitle: "노령성 전정증후군 vs 다른 원인 구분, 안구 진탕, 회복 예후, 집에서 돌보는 방법",
    metaTitle: "강아지 전정기관 이상 — 갑자기 비틀거릴 때 원인·치료·예후 | 펫지기",
    metaDescription: "강아지가 갑자기 비틀거리고 눈이 돌아갈 때 전정기관 이상 원인을 정리했습니다. 노령성 전정증후군 vs 뇌 문제 구분, 안구 진탕, 예후와 가정 돌봄 방법을 설명합니다.",
    body: `<p>갑자기 강아지가 비틀거리고, 눈이 한쪽 방향으로 계속 떨린다. 쓰러지거나 구토를 한다. 보호자는 뇌졸중을 의심하지만, 대부분은 "노령성 전정증후군"이다.</p>

<h2>전정기관이란</h2>
<p>전정기관은 내이(속귀)에 위치하며 균형 감각을 담당한다. 이 기관에 이상이 생기면 평형을 잃고 비틀거리며, 특징적인 안구 진탕(눈이 빠르게 흔들리는 것)이 나타난다.</p>

<h2>주요 원인</h2>
<ul>
<li><strong>노령성(특발성) 전정증후군</strong>: 가장 흔한 원인, 중·노령견에서 갑작스럽게 발생, 원인 불명</li>
<li>중이염·내이염: 귀 감염이 내이로 전파</li>
<li>뇌 병변: 뇌종양·뇌염·뇌졸중 — 덜 흔하지만 배제 필요</li>
<li>갑상선기능저하증: 드물게 전정 이상 연관</li>
</ul>

<h2>노령성 전정증후군 vs 뇌 문제 구분</h2>
<div class="callout-dog">
<strong>노령성 전정증후군의 특징</strong><br>
• 갑작스러운 발병, 이후 서서히 호전<br>
• 안구 진탕 방향: 수평 또는 수직 (뇌 병변 시 수직 진탕 더 많음)<br>
• 의식은 정상 (뇌 문제와 차이)<br>
• 발작 없음<br>
• 72시간 후 뚜렷한 호전 시작<br>
▶ 확인이 필요하면 반드시 수의사 진찰 — 자가 판단 위험
</div>

<h2>진단</h2>
<ul>
<li>신체검사 + 신경학적 검사</li>
<li>귀 검사: 중이염·내이염 확인</li>
<li>MRI: 뇌 병변 배제 (뇌 문제 의심 시)</li>
<li>갑상선 수치 확인 (필요 시)</li>
</ul>

<h2>가정 돌봄</h2>
<ul>
<li>안전한 공간 확보: 계단·높은 곳 접근 차단</li>
<li>미끄럼 방지 매트 깔기</li>
<li>음수·식사 보조 (구토가 심하면 잠시 보류, 수의사 상담)</li>
<li>항구토제: 수의사 처방으로 가능</li>
</ul>

<h2>예후</h2>
<p>노령성 전정증후군은 대부분 2~4주 안에 상당히 회복된다. 일부는 경미한 고개 기울임(Head tilt)이 남을 수 있지만 생활에 지장이 없는 경우가 많다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Schunk, K.L. — Disorders of the vestibular system. Vet Clin North Am 1988",
      "한국수의신경학회 전정기관 질환 진단 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 갑작스러운 신경 증상 시 즉시 수의사 진료를 받으세요.",
    status: "published",
    publishedAt: "2026-12-19T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-678",
    slug: "dog-thunder-noise-phobia-training",
    type: "blog",
    category: 5,
    title: "강아지 천둥·소음 공포증 — 둔감화 훈련과 응급 대처",
    subtitle: "소음 공포 행동 패턴, 압박 조끼·앤티 칼름 활용, 둔감화 훈련 단계, 응급 처치",
    metaTitle: "강아지 천둥·소음 공포증 훈련 — 둔감화·압박 조끼·응급 대처 | 펫지기",
    metaDescription: "강아지 천둥·소음 공포증 해결 방법. 소음 공포 행동 패턴, 압박 조끼 효과, 단계별 둔감화 훈련, 폭죽·소방차 소리 응급 대처법을 정리했습니다.",
    body: `<p>천둥, 폭죽, 공사 소음을 심하게 무서워하는 강아지는 떨고, 숨고, 헐떡이고, 집 안을 파괴하기도 한다. 소음 공포증은 방치하면 점점 심해지는 경향이 있어 일찍 대응하는 것이 좋다. 훈련과 환경 조정, 필요하면 수의사의 약물 치료를 병행한다.</p>

<h2>공포 신호</h2>
<ul>
<li>떨림, 헐떡임, 침 흘림, 서성임</li>
<li>숨기, 보호자에게 매달리기, 탈출 시도</li>
<li>짖음, 낑낑거림, 배변 실수</li>
<li>물건을 파괴하거나 문을 긁음</li>
</ul>

<h2>먼저 수의사 진료</h2>
<p>갑자기 소음에 예민해졌다면 통증, 청각 변화, 신경 질환, 인지 기능 저하 같은 의학적 원인이 숨어 있을 수 있다. 수의사 검진으로 원인을 먼저 확인하고, 심한 경우 수의 행동 전문가에게 의뢰한다.</p>

<h2>훈련: 둔감화와 역조건화</h2>
<p>수의 행동 자료는 소음을 아주 작은 볼륨에서부터 시작해 서서히 키우는 둔감화 훈련과, 소리가 날 때 간식·놀이를 짝지어 소리를 좋은 일로 연결하는 역조건화를 함께 쓰라고 권한다.</p>
<ol>
<li>무서워하는 소리를 정확히 파악한다 (천둥, 폭죽 등). 녹음 파일을 준비한다.</li>
<li>개가 반응하지 않을 만큼 아주 작은 볼륨으로 재생하며 간식을 준다.</li>
<li>하루 짧게(약 10~20분) 반복하고, 개가 편안하면 볼륨을 조금씩 올린다.</li>
<li>불안 신호(귀가 뒤로, 입술 핥기, 몸이 굳음)가 보이면 단계를 되돌린다.</li>
<li>몇 주~몇 달에 걸쳐 진행한다. 실제 폭풍과 겹치면 훈련 진도가 깨질 수 있다.</li>
</ol>

<div class="callout-dog">
<strong>하지 말아야 할 것</strong><br>
• 벌을 주거나 소리를 지르기 — 공포가 더 커진다<br>
• 억지로 소리에 노출시키기(홍수법)<br>
• 공포 반응이 올 때 과도하게 안타까워하며 불안을 전달하기 (차분한 태도를 유지하되 위로를 거부하지는 않는다)
</div>

<h2>폭풍·폭죽이 올 때</h2>
<ul>
<li><strong>안전한 공간</strong>: 개가 평소 좋아하는 크레이트나 창이 없는 방을 마련한다.</li>
<li><strong>소음 차단</strong>: 커튼을 치고 TV·음악·백색소음으로 소리를 덮는다.</li>
<li><strong>보조 용품</strong>: 압박 조끼, 페로몬 제품 등이 일부 개에게 도움이 되기도 하지만 모든 개에게 효과가 있지는 않다.</li>
<li><strong>산책 시간 조정</strong>: 폭죽 시즌에는 소리가 나기 전에 산책을 마친다. 줄과 하네스를 확실히 하고 이름표·마이크로칩을 확인한다. 놀라 도망치는 사고가 흔하다.</li>
<li><strong>예측 가능한 일상</strong>: 평소 식사·놀이 일정을 유지한다.</li>
</ul>

<h2>약물 치료</h2>
<p>공포가 심하면 수의사가 훈련을 보조하는 약물을 처방할 수 있다. 약은 반드시 수의사의 처방과 용량을 따르고, 사람 약을 임의로 먹이지 않는다.</p>

<h2>마지막으로</h2>
<p>소음 공포증은 훈련과 환경, 필요하면 약물의 조합으로 호전될 수 있다. 심한 경우는 수의 행동 전문가와 상담하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동·케어 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.vetstreet.com/our-pet-experts/noise-phobia-tips-to-comfort-a-dog-who-fears-thunder-fireworks-and-other-sounds — Vetstreet, Noise phobia: tips to comfort a dog who fears thunder, fireworks, and other sounds",
      "https://albertaanimalhealthsource.ca/node/211 — Alberta Animal Health Source, Noise phobia in dogs",
      "https://askavet.dogster.com/vet-answers/how-can-i-help-my-dog-after-being-exposed-to-loud-noises — Dogster Ask a Vet, How can I help my dog after being exposed to loud noises?",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-20T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-679",
    slug: "family-pet-adoption-agreement-checklist",
    type: "blog",
    category: 1,
    title: "반려동물 입양 전 가족 합의 체크리스트",
    subtitle: "가족 구성원 역할 분담, 비용 현실 확인, 여행·긴급 상황 계획, 아이와 함께 결정하기",
    metaTitle: "반려동물 입양 전 가족 합의 체크리스트 — 역할·비용·계획 | 펫지기",
    metaDescription: "반려동물 입양 전 가족이 합의해야 할 체크리스트. 구성원 역할 분담, 월 비용 현실 파악, 여행·긴급 상황 계획, 아이와 함께 입양 결정하는 방법을 정리했습니다.",
    body: `<p>반려동물 파양의 가장 흔한 원인 중 하나는 가족 간의 합의 없이 충동적으로 입양한 것이다. 체크리스트 하나로 후회를 줄일 수 있다.</p>

<h2>왜 가족 합의가 필요한가</h2>
<p>반려동물은 한 사람이 돌보는 것처럼 보여도 실제로는 집 안의 모든 구성원에게 영향을 미친다. 알레르기, 소음, 냄새, 비용, 시간 — 어느 하나라도 합의되지 않으면 갈등이 된다.</p>

<h2>역할 분담 결정</h2>
<div class="callout-dog">
<strong>가족 합의 역할 분담 체크리스트</strong><br>
• 매일 아침 식사 담당: 누구?<br>
• 저녁 산책 주 담당: 누구?<br>
• 동물병원 데려가기: 누구?<br>
• 여행 시 돌봄(펫호텔·지인): 계획 있는가?<br>
• 보호자가 아플 때 대체 돌봄: 계획 있는가?
</div>

<h2>월 비용 현실 확인</h2>
<ul>
<li>사료·간식: 월 3~15만 원 (견종·크기·품질에 따라 다름)</li>
<li>기본 의료(예방접종·구충제): 연 10~20만 원</li>
<li>미용 (소형견 기준): 월 4~8만 원</li>
<li>펫보험: 월 2~8만 원</li>
<li>긴급 의료비 예비금: 최소 50~100만 원 준비 권장</li>
</ul>

<h2>여행·긴급 상황 계획</h2>
<ul>
<li>연간 여행 계획과 반려동물 동반 가능 여부</li>
<li>동반 불가 시 펫호텔·지인 위탁 비용과 스트레스</li>
<li>갑작스러운 이사·해외 발령 시 데려갈 수 있는가</li>
</ul>

<h2>아이와 함께 결정하기</h2>
<ul>
<li>아이가 원해서 입양하더라도 주 돌봄은 어른이 책임져야 함</li>
<li>아이에게 현실적인 돌봄 책임(먹이기, 함께 놀기)을 사전에 설명</li>
<li>아이 알레르기 검사를 입양 전에 먼저 확인</li>
</ul>

<h2>마지막으로</h2>
<p>이 체크리스트를 모두 통과한 가족이라면, 반려동물과 함께하는 15년은 모두에게 기억에 남는 시간이 될 것이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국동물복지협회 반려동물 입양 전 가이드라인",
      "농림축산식품부 반려동물 입양 활성화 정책 보고서 (2023)",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-20T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-680",
    slug: "dog-chicken-allergy-alternatives",
    type: "blog",
    category: 2,
    title: "강아지 닭고기 알레르기 — 실제 빈도와 대안 단백질",
    subtitle: "닭고기 알레르기 실제 발생 빈도, 식이 알레르기 확인 방법, 대안 단백질 선택",
    metaTitle: "강아지 닭고기 알레르기 — 빈도·확인 방법·대안 단백질 가이드 | 펫지기",
    metaDescription: "강아지 닭고기 알레르기 실제 빈도와 대안 단백질 선택 방법. 식이 알레르기와 식이 불내성 차이, 가수분해 사료 vs 신규 단백질 사료, 배제식이 시험 방법을 정리했습니다.",
    body: `<p>강아지가 피부를 긁거나 귀 염증이 반복되면 "닭고기 알레르기"를 의심하는 보호자가 많다. 그러나 닭고기 알레르기의 실제 빈도는 얼마나 될까.</p>

<h2>식이 알레르기의 실제 빈도</h2>
<p>강아지 피부 질환의 원인 중 식이 알레르기가 차지하는 비중은 크지 않아, 진단은 수의사와 함께 단계적으로 하는 것이 좋다. 환경 알레르기(꽃가루·집먼지진드기)가 훨씬 더 흔하다. 닭고기는 비프·유제품·밀과 함께 흔한 식이 알레르겐이지만 모든 강아지에게 해당되지는 않는다.</p>

<h2>식이 알레르기 vs 식이 불내성</h2>
<ul>
<li><strong>식이 알레르기</strong>: 면역 매개, 피부 가려움·귀 염증·소화 문제</li>
<li><strong>식이 불내성</strong>: 면역 비관여, 주로 소화 증상(구토·설사)</li>
<li>두 경우 모두 배제식이 시험으로 확인 가능</li>
</ul>

<h2>배제식이(Elimination Diet) 시험</h2>
<div class="callout-dog">
<strong>배제식이 시험 방법</strong><br>
• 기간: 최소 8~12주 (짧으면 결과 신뢰 불가)<br>
• 이전에 먹어본 적 없는 단백질 1종 + 탄수화물 1종만 급여<br>
• 간식·가금류 덴탈껌 등 모든 추가 급여 중단<br>
• 시험 중 증상 개선 시 → 이전 식이 다시 급여해 재발 확인 (확진)<br>
▶ 시중 "알레르기용 사료" 다수는 배제식이에 적합하지 않을 수 있음
</div>

<h2>대안 단백질 선택</html></h2>
<ul>
<li><strong>신규 단백질 (Novel Protein)</strong>: 이전에 먹어본 적 없는 단백질 — 오리·연어·캥거루·사슴·말 등</li>
<li><strong>가수분해 단백질 사료</strong>: 단백질을 작게 분해해 면역 인식 차단 — 처방 사료</li>
<li>가수분해 사료 선택 시 수의사 처방 제품이 품질 신뢰도 높음</li>
</ul>

<h2>마지막으로</h2>
<p>피부 가려움이 음식 때문인지 환경 때문인지는 배제식이 시험 없이는 알 수 없다. "닭고기 안 들어간 사료"로 바꿨다고 해결되지 않는 경우가 더 많다. 수의사와 함께 체계적으로 접근하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Verlinden, A. et al. — Food hypersensitivity reactions in dogs and cats. Crit Rev Food Sci Nutr 2006",
      "한국반려동물영양학회 강아지 식이 알레르기 진단 및 관리 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-21T09:00:00.000Z",
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
  console.log("블로그 포스트 111차 시딩 완료! (blog-676 ~ blog-680)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
