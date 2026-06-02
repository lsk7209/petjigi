import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 61 — cat3×2 + cat2×1 + cat5×1 + cat1×1 = 5편 (IDs 426-430)
// Macros: A, F, E, F, B
// Angles: RA3, RA1, RA6, RA4, RA7

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-426",
    slug: "dog-ear-hematoma-guide",
    type: "blog",
    category: 3,
    title: "강아지 귀혈종 — 귀가 빵빵하게 부풀었을 때",
    subtitle: "귀혈종 원인(자가 외상·외이염 연관), 자연 치유 vs 수술 기준, 재발 예방",
    metaTitle: "강아지 귀혈종 원인·치료·재발 예방 가이드 | 펫지기",
    metaDescription: "강아지 귀가 빵빵하게 부풀면 귀혈종입니다. 원인인 자가 외상과 외이염 연관성, 자연 치유·배액·수술 기준, 재발 예방법을 정리했습니다.",
    body: `<p>강아지 귓바퀴(이개)가 갑자기 빵빵하게 부풀어 오르면 귀혈종(Aural Hematoma)이다. 귓바퀴 안에 혈액이 고인 상태로, 통증을 유발한다.</p>

<h2>원인</h2>
<p>강아지가 귀를 심하게 긁거나 머리를 세차게 흔들 때 귓바퀴 내부 혈관이 터져 혈액이 모인다. 근본 원인은 대부분 외이염·귀진드기·알레르기로 인한 가려움이다.</p>

<h2>치료 방법</h2>
<table>
<thead><tr><th>방법</th><th>장점</th><th>단점</th></tr></thead>
<tbody>
<tr><td>자연 흡수 대기</td><td>침습 없음</td><td>수주 걸림, 귀 기형 가능성</td></tr>
<tr><td>배액(주사기 흡인)</td><td>빠른 부기 감소</td><td>재발률 높음</td></tr>
<tr><td>수술(봉합+배액)</td><td>재발률 낮음</td><td>마취 필요</td></tr>
</tbody>
</table>

<div class="callout-dog">
<strong>수술이 필요한 경우</strong><br>
• 크기가 크고 통증이 심한 경우<br>
• 배액 후 빠르게 재충전되는 경우<br>
• 미용적으로 귀 형태 유지가 중요한 경우
</div>

<h2>근본 원인 치료가 핵심</h2>
<p>귀혈종을 치료해도 외이염·알레르기를 해결하지 않으면 재발한다. 귀 검사와 외이염 치료를 함께 진행해야 한다.</p>

<h2>마지막으로</h2>
<p>귀혈종은 방치하면 귓바퀴가 쪼그라들거나 변형된다(콜리플라워 귀). 발견하면 빠른 수의사 상담이 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Swaim, S.F. — Aural Hematomas in Dogs. Compend Contin Educ Pract Vet 2003",
      "대한수의사회 이과 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-16T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-427",
    slug: "dog-mast-cell-tumor-guide",
    type: "blog",
    category: 3,
    title: "강아지 비만세포종 — 피부 혹이 전부 지방종은 아니다",
    subtitle: "비만세포종 외관 특징, 등급 분류, 수술 기준, 조기 발견이 중요한 이유",
    metaTitle: "강아지 비만세포종(MCT) — 증상·등급·치료 가이드 | 펫지기",
    metaDescription: "강아지 피부 혹이 비만세포종일 수 있습니다. 외관 특징, 1~3등급 구분, 수술 기준, 항히스타민 전처치 필요성을 정리했습니다.",
    body: `<p>강아지의 피부 혹을 발견했을 때 "지방종이겠지"라고 넘기기 쉽다. 그러나 강아지 피부 종양 중 가장 흔한 것 중 하나가 비만세포종(Mast Cell Tumor, MCT)이다. 외관만으로 구분이 어렵기 때문에 반드시 세포 검사가 필요하다.</p>

<h2>비만세포종이란</h2>
<p>비만세포(mast cell)에서 유래한 악성 종양이다. 피부·피하에 가장 흔하게 발생하지만, 내장에도 생긴다. 히스타민을 포함한 활성 물질을 방출해 전신 반응을 일으킬 수 있다.</p>

<h2>외관 특징</h2>
<ul>
<li>경계가 불분명하고 모양이 불규칙한 경우 많음</li>
<li>긁거나 만지면 갑자기 커지거나 빨개지는 경우 (다리우스 현상)</li>
<li>같은 혹이 컸다 작아졌다를 반복하기도 함</li>
<li>단단하거나 말랑한 경우 모두 가능</li>
</ul>

<h2>진단 방법</h2>
<p>세침흡인검사(FNA)로 세포를 채취해 현미경으로 확인한다. 외래에서 비교적 간단히 할 수 있다. 확진 및 등급 판정은 수술 후 조직병리 검사(생검)로 한다.</p>

<h2>등급(Grade)에 따른 예후</h2>
<ul>
<li><strong>Grade 1 (저등급)</strong>: 국소적, 수술 후 예후 좋음</li>
<li><strong>Grade 2 (중등급)</strong>: 약 50% 재발·전이 가능성, 추가 치료 고려</li>
<li><strong>Grade 3 (고등급)</strong>: 전이율 높음, 적극적 치료 필요</li>
</ul>

<div class="callout-dog">
<strong>수술 전 항히스타민 전처치</strong><br>
비만세포 조작 시 히스타민 방출로 혈압 저하 가능<br>
→ 수술 전 디펜히드라민 + H2 차단제 전처치가 표준
</div>

<h2>마지막으로</h2>
<p>피부 혹을 발견하면 크기와 상관없이 세포 검사를 받는 것이 권장된다. 비만세포종은 조기 발견·완전 절제 시 좋은 예후를 보인다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Kiupel, M. et al. — Proposal of a 2-Tier Histologic Grading System for Canine MCT. Vet Pathol 2011",
      "대한수의종양학회 비만세포종 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-16T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-428",
    slug: "dog-food-topper-guide",
    type: "blog",
    category: 2,
    title: "강아지 사료 토퍼 활용 가이드 — 건식 사료를 더 맛있게 만드는 방법",
    subtitle: "토퍼 종류, 칼로리 계산 원칙, 건강에 도움이 되는 토퍼 vs 단순 기호성 토퍼",
    metaTitle: "강아지 사료 토퍼 완전 가이드 — 종류·칼로리·활용법 | 펫지기",
    metaDescription: "강아지 사료 토퍼 종류와 활용 방법. 칼로리 계산 원칙, 건강에 도움이 되는 토퍼, 편식·노령견에게 활용하는 방법을 정리했습니다.",
    body: `<p>편식이 심한 강아지, 식욕이 줄어든 노령견, 사료를 질려하는 개에게 '토퍼(topper)'는 효과적인 해결책이다. 사료 위에 올려주는 소량의 첨가물로 식사를 더 매력적으로 만든다.</p>

<h2>토퍼 종류</h2>
<h3>동물성 단백질 토퍼</h3>
<ul>
<li>삶은 닭가슴살 (간 없이 잘게 찢기)</li>
<li>삶은 달걀 (흰자 위주)</li>
<li>참치·연어 캔 (무염·무조미료)</li>
<li>동결건조 고기</li>
</ul>

<h3>채소·과일 토퍼</h3>
<ul>
<li>찐 단호박·당근 (소화 잘 됨)</li>
<li>블루베리 (항산화)</li>
<li>수박 (수분 보충, 씨 제거)</li>
</ul>

<h3>상업용 토퍼 제품</h3>
<ul>
<li>동결건조 육류 토퍼 (전용 제품)</li>
<li>고기 브로스(육수) 큐브</li>
<li>프로바이오틱스 파우더 토퍼</li>
</ul>

<h2>칼로리 계산 원칙</h2>
<div class="callout-dog">
<strong>10% 규칙 적용</strong><br>
토퍼는 하루 총 칼로리의 10% 이내<br>
토퍼를 추가한 만큼 기존 사료량 감량<br>
예: 일일 400kcal 강아지 → 토퍼 40kcal 이내<br>
삶은 닭가슴살 30g ≈ 33kcal
</div>

<h2>편식 강아지에게 활용하기</h2>
<p>사료를 안 먹는 강아지에게 토퍼를 올려주면 식욕을 자극할 수 있다. 단, 토퍼만 골라 먹고 사료를 거부하게 되는 경우도 있다. 토퍼를 사료와 잘 섞어주는 것이 효과적이다.</p>

<h2>마지막으로</h2>
<p>토퍼는 식사를 풍요롭게 만드는 도구다. 칼로리 계산만 지키면 건강에 도움이 되는 좋은 습관이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Tufts University — Dog Food Toppers Guide",
      "한국수의영양학회 보조 식품 급여 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-17T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-429",
    slug: "dog-home-grooming-basics",
    type: "blog",
    category: 5,
    title: "강아지 집에서 미용하기 — 전문 미용 사이 관리하는 방법",
    subtitle: "브러싱·귀 청소·발톱·항문낭 관리 주기, 미용 도구 선택, 강아지가 싫어할 때 대처",
    metaTitle: "강아지 집 미용 관리 가이드 — 브러싱·귀·발톱·항문낭 | 펫지기",
    metaDescription: "강아지를 집에서 미용하는 방법. 브러싱·귀 청소·발톱·항문낭 관리 주기와 방법, 필요한 도구, 싫어하는 강아지 훈련을 정리했습니다.",
    body: `<p>전문 미용실을 4~8주마다 방문해도 그 사이의 관리는 보호자 몫이다. 집에서 할 수 있는 기본 미용 관리를 알아두면 강아지의 건강과 위생을 유지하는 데 크게 도움이 된다.</p>

<h2>브러싱</h2>
<ul>
<li><strong>단모종</strong>: 주 1~2회 고무 브러시 또는 핀 브러시</li>
<li><strong>장모종</strong>: 매일~격일 슬리커 브러시 + 콤</li>
<li><strong>환절기</strong>: 주기 2배로 늘리기</li>
</ul>
<p>브러싱은 피부 혈액순환을 돕고 피부 상태를 확인하는 기회가 된다.</p>

<h2>귀 청소</h2>
<p>건강한 귀는 주 1회, 귀 문제가 있는 품종은 목욕 후마다 청소한다. 반려동물용 귀 세정제를 사용하며, 면봉은 귀 입구만.</p>

<h2>발톱 관리</h2>
<p>바닥에 발톱 소리가 나면 너무 긴 것이다. 2~4주 간격으로 확인·관리한다. 혈관(퀵)을 조금씩 자르며 신중하게.</p>

<h2>항문낭 관리</h2>
<p>강아지가 바닥에 엉덩이를 끌거나 항문 주변을 핥는다면 항문낭이 찼을 수 있다. 소형견·비만견은 특히 막히기 쉽다. 외부 짜기는 집에서 할 수 있지만, 처음이라면 수의사에게 방법을 배운 후 시도한다.</p>

<div class="callout-dog">
<strong>집 미용 도구 기본 세트</strong><br>
□ 품종에 맞는 브러시<br>
□ 발톱깎이<br>
□ 귀 세정제 + 솜볼<br>
□ 동결건조 간식 (긍정 강화용)
</div>

<h2>마지막으로</h2>
<p>집 미용 관리는 강아지와의 신뢰를 쌓는 시간이기도 하다. 짧게, 자주, 긍정적으로 진행하는 것이 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Kennel Club — Home Grooming Guide",
      "한국반려동물미용협회 가정 미용 관리 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-17T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-430",
    slug: "cat-coat-color-personality-myth",
    type: "blog",
    category: 1,
    title: "삼색 고양이·고등어 고양이 — 색깔로 성격을 판단해도 될까",
    subtitle: "털 색깔과 성격의 과학적 연관성, 삼색 암컷 유전학, 고양이 성격에 진짜 영향 미치는 요인",
    metaTitle: "고양이 털 색깔과 성격 — 삼색·고등어 오해와 진실 | 펫지기",
    metaDescription: "고양이 털 색깔과 성격의 관계를 과학적으로 살펴봤습니다. 삼색 고양이가 예민하다는 통념, 털 색깔 유전학, 성격에 진짜 영향을 미치는 요인을 정리했습니다.",
    body: `<p>'삼색 고양이는 성격이 까다롭다', '오렌지 고양이는 순하다' — 이런 말을 들어본 적 있을 것이다. 이것이 얼마나 사실인지 살펴보자.</p>

<h2>털 색깔과 성격의 연구</h2>
<p>UC Davis 연구에서 삼색(Calico)·별갑(Tortoiseshell) 고양이 보호자들이 다른 색상 고양이 보호자보다 공격성·비타협성을 더 많이 보고했다는 결과가 있다. 그러나 이것은 보호자의 주관적 보고이며, 통제된 행동 실험이 아니다.</p>

<h2>삼색·별갑의 유전학</h2>
<p>삼색·별갑 고양이가 거의 전부 암컷인 이유는 X염색체에 오렌지/검정 색상 유전자가 있기 때문이다. 두 가지 색상을 표현하려면 두 개의 X염색체(암컷)가 필요하다. 수컷 삼색은 XXY 염색체 이상(클라인펠터)인 경우다.</p>

<h2>성격에 실제로 영향을 미치는 요인</h2>
<ul>
<li><strong>사회화 경험 (생후 2~7주)</strong>: 가장 결정적</li>
<li><strong>어미 고양이의 성격</strong>: 유전적 기질 전달</li>
<li><strong>입양 후 환경</strong>: 루틴·스트레스·사람과의 상호작용</li>
<li><strong>중성화 여부</strong>: 수컷에서 공격성 영향</li>
</ul>

<h2>결론</h2>
<p>털 색깔은 성격의 간접 지표가 될 수 있지만 결정적이지 않다. 같은 삼색 고양이도 사회화와 환경에 따라 완전히 다른 성격을 보인다. 고양이 개체를 직접 만나보는 것이 색깔 통계보다 훨씬 정확하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Stelow, E.A. et al. — The Relationship Between Coat Color and Aggressive Behaviors in the Domestic Cat. JAAWS 2015",
      "International Cat Care — Cat Coat Color Genetics",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-18T09:00:00.000Z",
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
  console.log("블로그 포스트 61차 시딩 완료! (blog-426 ~ blog-430)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
