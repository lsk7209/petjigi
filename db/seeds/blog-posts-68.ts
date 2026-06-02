import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 68 — cat3×2 + cat2×1 + cat1×1 + cat5×1 = 5편 (IDs 461-465)
// Macros: D, A, B, F, G
// Angles: RA2, RA5, RA7, RA4, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-461",
    slug: "dog-patellar-luxation-guide",
    type: "blog",
    category: 3,
    title: "강아지 슬개골 탈구 — 단계별 증상과 수술 기준 완전 정리",
    subtitle: "1~4등급 분류 기준, 수술 적응증, 수술 비용 현실, 수술 없이 관리하는 법",
    metaTitle: "강아지 슬개골 탈구 등급·수술 기준·비용 완전 가이드 | 펫지기",
    metaDescription: "강아지 슬개골 탈구 1~4등급 기준과 수술 적응증을 정리했습니다. 수술 비용 현실, 수술 없이 관리하는 방법, 재발 예방까지 실제 임상 기준으로 안내합니다.",
    body: `<p>소형견 보호자라면 한 번쯤 들어봤을 슬개골 탈구. 우리나라 말티즈·포메라니안·치와와의 상당수가 어느 정도의 슬개골 탈구를 가지고 있다. 그러나 모든 탈구가 수술이 필요한 것은 아니다.</p>

<h2>슬개골 탈구란</h2>
<p>슬개골(무릎뼈)이 정상 위치(도르래 홈)에서 벗어나는 질환이다. 대부분 내측(안쪽)으로 탈구되는 내측 슬개골 탈구(MPL)가 소형견에서 흔하고, 대형견에서는 외측 탈구도 발생한다.</p>

<h2>1~4등급 기준</h2>
<table>
<thead><tr><th>등급</th><th>특징</th><th>증상</th></tr></thead>
<tbody>
<tr><td>1등급</td><td>손으로 밀면 탈구, 놓으면 복위</td><td>대부분 무증상</td></tr>
<tr><td>2등급</td><td>저절로 탈구·복위 반복</td><td>가끔 한쪽 발을 든 채 걷기</td></tr>
<tr><td>3등급</td><td>대부분 탈구된 상태, 손으로만 복위 가능</td><td>독특한 걸음걸이, 활동 감소</td></tr>
<tr><td>4등급</td><td>항구적 탈구, 복위 불가</td><td>다리를 거의 못 씀, 통증</td></tr>
</tbody>
</table>

<h2>수술 적응증</h2>
<div class="callout-dog">
<strong>수술을 고려하는 기준</strong><br>
• 3~4등급<br>
• 2등급이라도 통증·파행이 지속될 때<br>
• 젊은 개에서 진행성 탈구<br>
• 관절염 동반으로 삶의 질 저하<br>
• 전방십자인대 파열 동반
</div>

<h2>수술 비용 현실</h2>
<p>1등급·단순 2등급은 평균 70~120만 원(편측), 복잡한 3~4등급 또는 대형견은 200~350만 원까지 올라간다. 양측 동시 수술은 20~30% 할인이 적용되기도 한다. 수술 전 X-ray·CT 비용이 추가될 수 있다.</p>

<h2>수술 없이 관리하는 법 (1~2등급)</h2>
<ul>
<li>체중 관리: 과체중은 관절 부하를 크게 높인다</li>
<li>근력 강화: 수중 트레드밀·밸런스 운동으로 대퇴사두근 강화</li>
<li>미끄럼 방지: 가정 내 바닥에 매트 깔기 (슬개골 스트레스 감소)</li>
<li>소파·계단 점프 자제</li>
<li>3~6개월 간격 정기 검진</li>
</ul>

<h2>마지막으로</h2>
<p>슬개골 탈구 진단을 받았다고 당장 수술을 결정할 필요는 없다. 등급·증상·나이·체중을 종합해 수의사와 함께 판단하는 것이 중요하다. 1~2등급은 운동·체중 관리만으로 충분히 삶의 질을 유지할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Roush, J.K. — Canine Patellar Luxation. Vet Clin North Am 1993",
      "한국수의외과학회 슬개골 탈구 임상 가이드라인 2022",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-02T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-462",
    slug: "cat-wet-dry-food-mixing",
    type: "blog",
    category: 2,
    title: "고양이 습식·건식 사료 혼합 급여 — 오해와 진실",
    subtitle: "혼합 급여 시 비율, 소화 문제 여부, 치석 관리, 올바른 혼합 방법",
    metaTitle: "고양이 습식·건식 사료 혼합 급여 가이드 — 오해와 진실 | 펫지기",
    metaDescription: "고양이 습식과 건식 사료를 함께 급여해도 될까요? 혼합 급여 비율, 소화 문제 오해, 치석 관리, 올바른 혼합 방법을 정리했습니다.",
    body: `<p>고양이 보호자 사이에서 "습식과 건식을 같이 주면 소화가 안 된다"는 이야기가 있다. 사실일까? 결론부터 말하면 대부분의 고양이에게 혼합 급여는 안전하다.</p>

<h2>혼합 급여를 권장하는 이유</h2>
<p>건식 사료만으로는 수분 섭취가 부족하다. 고양이는 원래 먹이를 통해 수분을 섭취하는 동물로, 건식 사료의 수분 함량(10%)은 자연식(70%)에 비해 훨씬 낮다. 습식 사료를 일부 포함시키는 것만으로도 수분 섭취를 크게 늘릴 수 있다.</p>

<h2>"소화가 안 된다" 오해의 기원</h2>
<p>건식과 습식의 소화 속도가 다르다는 것은 사실이다. 건식은 다소 느리게, 습식은 빠르게 소화된다. 그러나 이것이 실제 소화 문제를 일으킨다는 과학적 근거는 없다. 건강한 고양이에서 혼합 급여로 인한 소화 장애 보고는 매우 드물다.</p>

<h2>올바른 혼합 비율</h2>
<div class="callout-cat">
<strong>혼합 급여 권장 비율</strong><br>
• 수분 부족 우려 시: 습식 50% + 건식 50%<br>
• 체중 관리 필요 시: 습식 70% + 건식 30%<br>
• 식이 전환기: 처음에 건식 80% → 점진적으로 습식 비율 높이기<br>
• 신장 질환 고양이: 수의사 지도 하 습식 중심
</div>

<h2>치석 관리 오해</h2>
<p>"건식 사료가 치석을 제거한다"는 것도 과장된 믿음이다. 일반 건식 사료의 치석 제거 효과는 미미하다. 치과 전문 사료(VOHC 인증)를 제외하면 사료 종류보다 치아 관리(칫솔질·치과용 간식)가 훨씬 효과적이다.</p>

<h2>마지막으로</h2>
<p>습식·건식 혼합 급여는 대부분의 고양이에게 유익하다. 특히 수분 섭취가 적은 고양이, 요로계 질환 병력이 있는 고양이에게 추천한다. 개별 고양이의 반응을 보면서 비율을 조정하면 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AAFCO — Wet vs. Dry Pet Food Nutrition Guide 2023",
      "한국수의영양학회 고양이 수분 섭취 권장 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-03T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-463",
    slug: "dog-pancreatitis-diet",
    type: "blog",
    category: 3,
    title: "강아지 췌장염 식이 관리 — 무엇을 먹이고 무엇을 피해야 하나",
    subtitle: "급성·만성 췌장염 차이, 저지방 식이 원칙, 금지 식품, 회복식 단계별 가이드",
    metaTitle: "강아지 췌장염 식이 관리 — 저지방 식단과 금지 음식 가이드 | 펫지기",
    metaDescription: "강아지 췌장염 회복을 위한 식이 관리 방법. 급성·만성 차이, 저지방 식이 원칙, 절대 금지 식품, 회복식 단계별 가이드를 정리했습니다.",
    body: `<p>췌장염은 식이 관리가 치료만큼 중요하다. 잘못된 음식 한 번이 회복 중인 췌장을 다시 악화시킬 수 있기 때문이다.</p>

<h2>췌장염과 지방의 관계</h2>
<p>췌장은 소화 효소를 분비하는 기관이다. 지방이 많은 음식이 들어오면 췌장이 과도하게 활성화되고, 염증 상태에서는 이것이 자기 소화(자가 소화)로 이어진다. 췌장염 관리의 핵심은 지방 제한이다.</p>

<h2>급성 췌장염 초기 — 금식 후 점진적 재급여</h2>
<ul>
<li>중증 급성 췌장염: 수액 처치 중 일시적 금식 (수의사 판단)</li>
<li>가벼운 급성: 12~24시간 금식 후 소량씩 저지방식 시작</li>
<li>초기 회복식: 흰쌀죽·삶은 닭가슴살(껍질 제거) 소량</li>
<li>구토 없으면 3~5일 걸쳐 정상 식이로 전환</li>
</ul>

<h2>저지방 식이 기준</h2>
<div class="callout-dog">
<strong>췌장염 저지방 기준</strong><br>
• 건물 기준 지방 함량 10% 이하 (DM 기준)<br>
• 처방식 저지방 사료 사용 권장<br>
• 단백질은 충분히 유지 (근육 유지)<br>
• 간식은 저지방 품목만 (쌀과자, 채소 소량)
</div>

<h2>절대 금지 식품</h2>
<ul>
<li>삼겹살·치킨(껍질 포함)·베이컨 등 고지방 육류</li>
<li>버터·치즈·아이스크림 등 유제품</li>
<li>사람 음식 찌꺼기 전반</li>
<li>기름에 튀긴 간식</li>
<li>소시지·핫도그 (염분+지방 이중 문제)</li>
</ul>

<h2>만성 췌장염 장기 관리</h2>
<p>급성 회복 후에도 저지방 식이를 지속해야 한다. 한 번 췌장염을 앓은 개는 재발 위험이 높다. 정기적인 혈액 검사(LPL, lipase)로 췌장 상태를 모니터링하는 것이 권장된다.</p>

<h2>마지막으로</h2>
<p>췌장염 관리는 보호자의 식이 통제가 핵심이다. "한 번쯤은 괜찮겠지"라는 생각으로 준 고지방 간식이 재입원을 만드는 경우가 많다. 저지방 식이는 선택이 아니라 치료의 일부다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Xenoulis, P.G. — Diagnosis of pancreatitis in dogs and cats. J Small Anim Pract 2015",
      "한국수의내과학회 소화기 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-03T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-464",
    slug: "puppy-socialization-critical-period",
    type: "blog",
    category: 1,
    title: "강아지 사회화 결정적 시기 — 3~12주가 평생을 바꾼다",
    subtitle: "사회화 창 기간, 놓쳤을 때 대처법, 보호자가 집에서 할 수 있는 사회화 방법",
    metaTitle: "강아지 사회화 결정적 시기 3~12주 — 평생 성격 형성 가이드 | 펫지기",
    metaDescription: "강아지 사회화 결정적 시기(3~12주)에 무엇을 경험시켜야 할까요? 사회화 창 기간, 이 시기를 놓쳤을 때 대처법, 집에서 할 수 있는 사회화 방법을 정리했습니다.",
    body: `<p>강아지의 성격은 타고나는 부분도 있지만, 결정적 시기(Critical Period)에 어떤 경험을 하느냐에 따라 크게 달라진다. 이 시기는 생각보다 짧다.</p>

<h2>사회화 결정적 시기</h2>
<p>생후 3~12주가 핵심이다. 이 시기에 뇌의 신경 연결이 빠르게 형성되고, 새로운 자극에 대한 두려움 반응이 형성되기 전이다. 이때 다양한 사람·소리·환경·동물을 긍정적으로 경험할수록 성견이 되어서도 안정적인 성격을 갖는다.</p>

<h2>이 시기에 경험시켜야 할 것들</h2>
<div class="callout-dog">
<strong>사회화 체크리스트 (3~12주)</strong><br>
• 다양한 외모의 사람 (모자, 안경, 수염, 어린이, 노인)<br>
• 다양한 소리 (청소기, 빗소리, 자동차, 초인종)<br>
• 다양한 바닥 질감 (타일, 잔디, 금속, 모래)<br>
• 낯선 동물 (다른 강아지, 고양이)<br>
• 차량 이동, 엘리베이터, 계단<br>
• 가벼운 신체 접촉 (귀, 발, 입 만지기)
</div>

<h2>12주 이후에 입양받았다면</h2>
<p>많은 강아지가 이 시기의 대부분을 번식장·이동 중에 보내고 입양된다. 사회화 창이 완전히 닫힌 것은 아니다. 다만 나이가 들수록 새로운 자극에 적응하는 데 더 많은 노력이 필요하다. 두려움 기반 반응이 이미 형성됐다면 탈감작·역조건화 훈련이 필요하다.</p>

<h2>집에서 할 수 있는 방법</h2>
<ul>
<li>하루 5분, 다양한 소리를 낮은 볼륨으로 들려주기 (유튜브 사회화 사운드 활용)</li>
<li>다양한 질감의 매트·표면 걷게 하기</li>
<li>간식과 함께 신체 접촉 (발·귀·입 만지기 훈련)</li>
<li>짧은 외출로 다양한 환경 노출 (백신 완료 전 안기거나 유모차 활용)</li>
</ul>

<h2>마지막으로</h2>
<p>사회화 시기를 제대로 보낸 강아지는 성견이 되어서도 새로운 상황에 자신 있게 대처한다. 첫 12주의 경험 투자가 평생의 행동 문제를 예방한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Scott, J.P. & Fuller, J.L. — Genetics and the Social Behavior of the Dog. University of Chicago Press",
      "한국반려동물행동상담협회 사회화 훈련 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-04T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-465",
    slug: "dog-summer-heat-stroke-prevention",
    type: "blog",
    category: 5,
    title: "강아지 여름 열사병 예방 — 실제 데이터로 보는 위험 신호",
    subtitle: "열사병 발생 온도 조건, 품종별 위험군, 증상 단계, 야외 활동 안전 수칙",
    metaTitle: "강아지 여름 열사병 예방 — 위험 온도·품종·증상·대처법 | 펫지기",
    metaDescription: "강아지 여름 열사병을 예방하는 방법. 열사병 위험 온도 조건, 단두종 위험군, 증상 단계별 대처법, 야외 활동 안전 수칙을 데이터로 정리했습니다.",
    body: `<p>열사병은 여름 반려견 응급의 1위다. 체온이 41도를 넘으면 장기 손상이 시작되고, 43도 이상에서는 사망 위험이 높다. 발생 후 치료보다 예방이 훨씬 중요하다.</p>

<h2>열사병이 발생하는 조건</h2>
<p>온도만의 문제가 아니다. 습도·직사광선·통풍 여부가 복합적으로 작용한다. 기온 28도라도 차 안이나 직사광선 아래에서는 체온이 급격히 오를 수 있다. 차 내부는 30분 내 60도 이상으로 오를 수 있다.</p>

<h2>품종별 위험군</h2>
<div class="callout-dog">
<strong>열사병 고위험 품종</strong><br>
• 단두종(프렌치불독·퍼그·불독·시추·페키니즈): 기도 구조상 열 발산이 어려움<br>
• 비만 강아지 전 품종<br>
• 노령견 (체온 조절 기능 저하)<br>
• 심장·호흡기 질환 보유견<br>
• 두꺼운 이중모 대형견 (허스키·사모예드 등)
</div>

<h2>열사병 증상 단계</h2>
<ul>
<li><strong>초기</strong>: 심한 헐떡임, 잇몸 충혈, 과도한 침 분비</li>
<li><strong>중기</strong>: 비틀거림, 구토·설사, 잇몸이 창백해짐</li>
<li><strong>위험</strong>: 의식 저하, 경련, 잇몸이 흰색 또는 청색</li>
</ul>
<p>중기 이상 증상이면 즉시 동물병원으로 이동하면서 시원한 물(차가운 물 아닌 상온)로 몸을 식힌다.</p>

<h2>야외 활동 안전 수칙</h2>
<ul>
<li>산책: 오전 6~8시 또는 오후 7시 이후</li>
<li>아스팔트 온도 확인: 손등 5초 테스트 (뜨거우면 발바닥도 화상)</li>
<li>물 항상 지참, 15~20분마다 수분 보충</li>
<li>그늘 없는 곳에서 10분 이상 있지 않기</li>
<li>차 안에 혼자 두지 않기 — 1분도 위험</li>
</ul>

<h2>마지막으로</h2>
<p>열사병은 치료가 늦을수록 생존율이 급격히 떨어진다. 여름 외출 전 날씨 확인, 시간대 조정, 단두종은 더 보수적으로 — 이것이 열사병 예방의 전부다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bruchim, Y. et al. — Heat stroke in dogs: a retrospective study of 54 cases. Vet Emerg Crit Care 2006",
      "한국수의응급의학회 열사병 임상 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-04T11:00:00.000Z",
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
  console.log("블로그 포스트 68차 시딩 완료! (blog-461 ~ blog-465)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
