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
    body: `<p>강아지 눈 안쪽 모서리에 분홍·빨간 덩어리가 나타났다면 체리 아이(제3안검 탈출)다. 귀엽게 생겼지만 치료가 필요하다.</p>

<h2>체리 아이란</h2>
<p>제3안검(瞬膜) 내부에 있는 눈물샘 腺)이 제자리에서 탈출한 상태다. 제3안검 눈물샘은 전체 눈물 생산의 30~50%를 담당한다. 방치하면 눈물 생산 감소 → 건성안(KCS)으로 이어질 수 있다.</p>

<h2>고위험 품종</h2>
<p>불독, 코커스패니얼, 비글, 바셋하운드, 차우차우, 샤페이 등에서 흔하다. 유전적으로 제3안검 인대가 약한 품종들이다.</p>

<h2>치료 선택</h2>
<div class="callout-dog">
<strong>체리 아이 치료 옵션</strong><br>
• <strong>덮어 봉합술(Tucker technique)</strong>: 눈물샘을 제자리에 고정. 눈물 생산 보존. 권장 방법.<br>
• <strong>절제</strong>: 탈출한 샘 제거 — 간단하지만 건성안 위험. 권장하지 않음.<br>
• <strong>손으로 밀어 넣기</strong>: 초기 일시적 시도 가능, 대부분 재발<br>
• <strong>점안 스테로이드</strong>: 경미한 초기 염증에 보조 활용
</div>

<h2>수술 후 관리</h2>
<ul>
<li>엘리자베스 칼라 착용 (1~2주)</li>
<li>점안제 정기 투여</li>
<li>재발 확인: 5~20%에서 재발 가능 → 재수술</li>
<li>건성안 진행 여부 장기 모니터링</li>
</ul>

<h2>마지막으로</h2>
<p>체리 아이는 발견하면 빨리 치료할수록 눈물샘 손상이 적다. 눈물샘 보존이 핵심이므로 절제가 아닌 덮어 봉합술을 선택하는 수의안과의를 선택하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Grahn, B.H. & Storey, E.S. — Lacrimonasal Duct Anomalies in the Dog. Vet Ophthalmol 2004",
      "한국수의안과학회 체리 아이 임상 가이드라인",
    ]),
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
    body: `<p>햄스터는 작고 귀엽지만 "쉬운 반려동물"이 아니다. 올바른 환경을 만들어주지 않으면 스트레스로 수명이 단축될 수 있다.</p>

<h2>주요 품종과 특성</h2>
<ul>
<li><strong>골든(시리안) 햄스터</strong>: 가장 크고 독립적. 반드시 혼자 키워야 함. 핸들링 쉬움.</li>
<li><strong>드워프 로보로프스키</strong>: 가장 작고 빠름. 핸들링 어려움.</li>
<li><strong>드워프 캠벨·윈터화이트</strong>: 쌍으로 키울 수 있음 (같은 성별).</li>
</ul>

<h2>케이지 설치</h2>
<div class="callout-dog">
<strong>햄스터 케이지 최소 기준</strong><br>
• 바닥 면적: 최소 4,000cm² 이상 (80×50cm)<br>
• 시중 소형 케이지 대부분 부적합<br>
• 통 케이지보다 넓은 탱크형 또는 빈 수납박스 개조<br>
• 바닥재: 10~20cm 이상 두껍게 (굴 파는 본능)<br>
• 쳇바퀴: 지름 최소 25cm (골든) / 20cm (드워프)
</div>

<h2>먹이</h2>
<ul>
<li>전용 씨앗 믹스 또는 햄스터 전용 펠렛</li>
<li>안전한 채소: 브로콜리·당근·오이 소량</li>
<li>단백질: 삶은 달걀·밀웜 소량</li>
<li>금지: 양파·마늘·감귤·포도·초콜릿·설탕</li>
</ul>

<h2>수명과 현실</h2>
<ul>
<li>평균 수명: 2~3년 (짧다)</li>
<li>야행성: 낮에는 자고 밤에 활동 → 낮 시간 방해 금지</li>
<li>핸들링: 충분한 훈련 시간 필요 (무는 경우 있음)</li>
</ul>

<h2>마지막으로</h2>
<p>햄스터는 "싸고 쉬운 반려동물"이 아니다. 수명이 짧지만 그 안에서 충분한 삶을 살 수 있도록 공간·먹이·환경에 투자하는 것이 책임 있는 보호자의 역할이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Robinson, I. — The Guide to Owning a Hamster. TFH Publications 2002",
      "한국소동물수의학회 햄스터 케어 가이드라인",
    ]),
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
    body: `<p>미용실 비용을 아끼려는 보호자도 있고, 강아지가 미용실을 싫어해서 집에서 하는 경우도 있다. 기본 미용은 충분히 집에서 할 수 있다.</p>

<h2>목욕 주기</h2>
<ul>
<li>단모종: 4~6주에 1회</li>
<li>장모종: 2~4주에 1회</li>
<li>피부 질환 있는 경우: 수의사 처방 샴푸 주 1~2회</li>
<li>너무 자주 목욕 → 피부 지질막 손상</li>
</ul>

<h2>목욕 방법</h2>
<div class="callout-dog">
<strong>올바른 목욕 순서</strong><br>
1. 목욕 전 빗질 (엉킨 털 → 물 닿으면 더 엉킴)<br>
2. 미지근한 물 (체온 37~38도)<br>
3. 강아지 전용 샴푸 — 사람용 사용 금지<br>
4. 귀 안에 물 들어가지 않게 주의<br>
5. 완전 헹구기 (샴푸 잔류 → 피부 자극)<br>
6. 수건 드라이 → 드라이어 (저온 이상 설정 금지)
</div>

<h2>털 종류별 빗질</h2>
<ul>
<li>단모: 고무 빗 또는 슬리커 브러시 주 1회</li>
<li>장모: 핀 브러시 + 금속 빗 주 3~4회</li>
<li>이중모(허스키·코리안숏헤어): 탈모 브러시 + 슬리커 주 2~3회</li>
</ul>

<h2>귀 청소</h2>
<ul>
<li>주 1~2회 이어클리너로 가볍게 닦기</li>
<li>수직 이도가 있어 면봉 깊이 넣기 금지</li>
<li>냄새·분비물 증가 시 수의사 방문</li>
</ul>

<h2>마지막으로</h2>
<p>집 미용의 핵심은 일관성과 긍정적 경험이다. 강아지가 싫어한다면 단계적으로 적응시키는 것이 매번 힘겹게 하는 것보다 장기적으로 낫다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물미용협회 가정 미용 가이드라인",
      "ASPCA — Dog Grooming Tips",
    ]),
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
