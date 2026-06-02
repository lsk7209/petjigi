import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 76 — cat3×2 + cat4×1 + cat6×1 + cat2×1 = 5편 (IDs 501-505)
// Macros: A, D, F, B, E
// Angles: RA1, RA2, RA3, RA6, RA5

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-501",
    slug: "cat-fip-gs441524-treatment",
    type: "blog",
    category: 3,
    title: "고양이 FIP 신약 GS-441524 — 불치에서 치료 가능으로 바뀐 질환",
    subtitle: "FIP란, GS-441524 치료 효과와 부작용, 국내 접근 현황, 치료 비용",
    metaTitle: "고양이 FIP GS-441524 신약 치료 — 효과·비용·국내 현황 | 펫지기",
    metaDescription: "고양이 FIP(전염성 복막염) 신약 GS-441524 치료 효과와 국내 접근 현황을 정리했습니다. 치료 성공률, 부작용, 치료 비용, 84일 투약 프로토콜을 알아보세요.",
    body: `<p>불과 몇 년 전까지 FIP는 치명률 거의 100%의 불치 질환이었다. 그러나 GS-441524(항바이러스제)의 등장으로 상황이 완전히 바뀌었다.</p>

<h2>FIP란</h2>
<p>고양이 코로나바이러스(FCoV)가 변이하여 발생하는 전신 염증 질환이다. 복수형(삼출형)과 건성형으로 나뉜다. 과거에는 진단 즉시 안락사를 고려해야 할 만큼 예후가 극히 나빴다.</p>

<h2>GS-441524 치료 프로토콜</h2>
<div class="callout-cat">
<strong>GS-441524 기본 정보</strong><br>
• 뉴클레오사이드 유사체 항바이러스제 (코로나바이러스 복제 억제)<br>
• 84일(12주) 투약이 기본 프로토콜<br>
• 치료 성공률: 복수형 80~90%, 건성형·신경형 60~80%<br>
• 투약 형태: 피하주사 또는 경구 (주사가 효과 우수)
</div>

<h2>치료 비용 현실</h2>
<ul>
<li>국내 정식 승인 없음 (2024년 기준) — 공식 처방이 제한적</li>
<li>일부 동물병원에서 처방 가능 또는 해외 직구 루트 활용</li>
<li>84일 치료 비용: 국내 병원 경로 200~400만 원, 직구 루트 100~200만 원</li>
<li>치료 완료 후 재발 모니터링 필요 (혈액 검사 12개월)</li>
</ul>

<h2>부작용</h2>
<ul>
<li>주사 부위 통증·피부 반응</li>
<li>황달·간 수치 상승 (드물지만 모니터링 필요)</li>
<li>대부분 84일 완료 후 후유증 없음</li>
</ul>

<h2>마지막으로</h2>
<p>FIP 진단을 받았다면 포기하지 마라. 수의사와 GS-441524 치료 가능성을 반드시 상담해야 한다. 과거의 FIP와 지금의 FIP는 다르다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Pedersen, N.C. et al. — Efficacy of a 3C-like protease inhibitor in treating various forms of acquired feline infectious peritonitis. J Feline Med Surg 2018",
      "한국고양이수의사회 FIP 치료 가이드라인 2023",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-22T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-502",
    slug: "dog-ivdd-disc-surgery-guide",
    type: "blog",
    category: 3,
    title: "강아지 추간판 탈출증(디스크) 수술 — 판단 기준과 회복 가이드",
    subtitle: "디스크 등급별 수술 적응증, 보존 치료 한계, 수술 성공률, 수술 후 재활",
    metaTitle: "강아지 디스크(추간판 탈출증) 수술 — 판단 기준·성공률·재활 | 펫지기",
    metaDescription: "강아지 추간판 탈출증 수술 판단 기준과 회복 방법. 등급별 수술 적응증, 보존 치료 한계, 수술 성공률, 수술 후 재활 프로토콜을 정리했습니다.",
    body: `<p>닥스훈트·비글·코커스패니얼·시추 등 연골 이영양증 품종에서 디스크 질환은 흔하다. "조금 있으면 낫겠지"가 영구 마비로 이어지는 경우가 있다.</p>

<h2>추간판 탈출증 등급</h2>
<table>
<thead><tr><th>등급</th><th>증상</th><th>권장</th></tr></thead>
<tbody>
<tr><td>1</td><td>통증만, 신경학적 이상 없음</td><td>보존 치료</td></tr>
<tr><td>2</td><td>경미한 보행 장애, 통증</td><td>보존 또는 수술 (빠른 회복 원하면)</td></tr>
<tr><td>3</td><td>명확한 보행 장애, 서 있을 수 없음</td><td>수술 권장</td></tr>
<tr><td>4</td><td>마비, 통증 감각 있음</td><td>즉시 수술</td></tr>
<tr><td>5</td><td>완전 마비, 통증 감각 없음</td><td>긴급 수술 (48시간 내)</td></tr>
</tbody>
</table>

<h2>보존 치료의 한계</h2>
<div class="callout-dog">
<strong>보존 치료가 실패하는 경우</strong><br>
• 보존 치료 4~6주 후 개선 없음<br>
• 재발이 반복됨<br>
• 증상이 빠르게 악화됨<br>
• 등급 3 이상 → 보존 치료로 회복 어려움
</div>

<h2>수술 성공률</h2>
<ul>
<li>등급 1~3: 85~95% 정상 회복</li>
<li>등급 4: 80~90%</li>
<li>등급 5 (통증 감각 있음): 50~80%</li>
<li>등급 5 (통증 감각 없음, 48시간 이후): 20~50%</li>
</ul>

<h2>수술 후 재활</h2>
<ul>
<li>수중 트레드밀: 근육 재건 + 신경 자극 가장 효과적</li>
<li>레이저 치료: 신경 회복 보조</li>
<li>3~6개월 집중 재활로 최대 회복 가능</li>
</ul>

<h2>마지막으로</h2>
<p>등급 4~5 디스크에서 수술 시간이 생명줄이다. 증상이 빠르게 악화된다면 "내일 병원 가자"는 선택지가 없다. 즉각적인 신경과 전문 병원 방문이 정상 보행 회복의 결정적 요소다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Olby, N.J. et al. — Functional Outcome after Treatment for Thoracolumbar Disc Herniation in Dogs. JAVMA 2003",
      "한국수의신경학회 추간판 탈출증 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-23T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-503",
    slug: "pet-damage-compensation-guide",
    type: "blog",
    category: 4,
    title: "반려동물이 재산 피해를 입혔을 때 — 배상 책임과 처리 방법",
    subtitle: "물적 피해 민사 책임, 이웃 물건 파손·화분 망가뜨림, 보험으로 해결하는 법",
    metaTitle: "반려동물 재산 피해 배상 책임 — 법적 기준과 해결 방법 | 펫지기",
    metaDescription: "반려동물이 이웃 물건을 파손하거나 재산 피해를 줬을 때 법적 배상 책임을 정리했습니다. 민사 책임 기준, 보험 활용법, 분쟁 해결 방법을 알아보세요.",
    body: `<p>강아지가 이웃의 화분을 물어뜯거나, 탈출해 이웃 차를 긁었다면 보호자에게 배상 책임이 있을 수 있다. 어떤 기준으로, 어떻게 처리해야 할까?</p>

<h2>법적 근거</h2>
<p>민법 제759조(동물 점유자의 책임): "동물 점유자는 그 동물이 타인에게 가한 손해를 배상할 책임이 있다." 단, 점유자가 동물 관리에 상당한 주의를 기울였음을 증명하면 면책될 수 있다.</p>

<h2>배상 책임이 발생하는 상황</h2>
<ul>
<li>개가 이웃 물건을 파손 (화분·가구·차량 등)</li>
<li>고양이가 이웃 집 내부 물건을 훼손</li>
<li>강아지가 이웃 정원·화단을 망가뜨림</li>
<li>탈출 반려동물이 도로 교통사고를 유발</li>
</ul>

<h2>분쟁 해결 단계</h2>
<div class="callout-dog">
<strong>피해 발생 시 처리 순서</strong><br>
1. 즉시 사과 및 책임 인정<br>
2. 피해 금액 확인 (견적서·영수증 요청)<br>
3. 합의서 작성 (서명·날인으로 분쟁 종결)<br>
4. 보험 청구 가능 여부 확인 (배상책임보험)<br>
5. 합의 불성립 시 소액심판·민사 조정
</div>

<h2>펫 배상책임보험 활용</h2>
<p>일부 펫보험 상품은 반려동물이 타인에게 끼친 재산 피해를 보장하는 배상책임 특약을 포함한다. 이 특약은 물적 피해 외에 신체 상해도 커버하는 경우가 있다. 가입 시 특약 내용을 반드시 확인할 것.</p>

<h2>마지막으로</h2>
<p>반려동물로 인한 재산 피해는 솔직하고 빠른 해결이 최선이다. 방어적 태도는 상황을 악화시킨다. 배상책임보험이 있다면 즉시 보험사에 연락해 처리하는 것이 가장 효율적이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "민법 제759조 (동물 점유자의 책임)",
      "한국소비자원 반려동물 피해 분쟁 처리 사례집 2023",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 법적 분쟁은 전문가에게 문의하세요.",
    status: "published",
    publishedAt: "2026-09-23T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-504",
    slug: "pet-funeral-options-korea",
    type: "blog",
    category: 6,
    title: "국내 반려동물 장례 형태 — 화장·수목장·해양 산골 비교",
    subtitle: "공영 장례vs 사설 장례 비용, 유골 보관 방법, 수목장·해양 산골 절차",
    metaTitle: "반려동물 장례 형태 비교 — 화장·수목장·해양 산골 안내 | 펫지기",
    metaDescription: "국내 반려동물 장례 형태를 비교했습니다. 공영 vs 사설 화장 비용, 유골 보관 방법, 수목장·해양 산골 절차와 비용을 정리했습니다.",
    body: `<p>반려동물을 보내고 나면 많은 보호자가 장례를 어떻게 해야 할지 몰라 혼란스러워한다. 미리 알아두면 그 순간에 조금 더 침착하게 결정할 수 있다.</p>

<h2>장례 형태 선택지</h2>
<ul>
<li>공영 동물 화장 (지자체 운영)</li>
<li>사설 반려동물 장례식장</li>
<li>수목장</li>
<li>해양 산골</li>
<li>가정 매장 (허용 지역 제한)</li>
</ul>

<h2>화장 비용 비교</h2>
<table>
<thead><tr><th>구분</th><th>비용</th><th>특징</th></tr></thead>
<tbody>
<tr><td>공영 화장</td><td>1~10만 원</td><td>기다림 필요, 유골 반환 불가 또는 공동 매장</td></tr>
<tr><td>사설 단독 화장</td><td>20~80만 원</td><td>보호자 참여 가능, 유골 반환</td></tr>
<tr><td>사설 프리미엄</td><td>80~200만 원+</td><td>빈소, 추모 공간, 기념품 제작</td></tr>
</tbody>
</table>

<h2>유골 보관 방법</h2>
<div class="callout-cat">
<strong>유골 활용 옵션</strong><br>
• 유골함 보관 (집 또는 납골당)<br>
• 분골 후 납골당 위탁<br>
• 수목장: 지정 나무 아래 유골 묻기<br>
• 해양 산골: 바다에 유골 뿌리기 (허가된 구역)<br>
• 유골 보석·기념패 제작
</div>

<h2>수목장·해양 산골 절차</h2>
<p>수목장은 지자체 허가를 받은 자연장지에서만 가능하다. 해양 산골은 「장사 등에 관한 법률」에 따라 지정된 구역에서 가능하며, 일부 업체가 선박 이용 서비스를 제공한다.</p>

<h2>마지막으로</h2>
<p>장례 형태는 옳고 그름이 없다. 보호자와 반려동물에게 맞는 방식을 선택하면 된다. 다만 미리 찾아두지 않으면 그 순간에 서둘러야 하는 부담이 생긴다. 지금 가까운 반려동물 장례식장 한 곳을 알아두는 것만으로 준비가 된 것이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "장사 등에 관한 법률 (자연장 관련 조항)",
      "농림축산식품부 반려동물 장례업 현황 조사 2023",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-24T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-505",
    slug: "cat-raw-diet-pros-cons",
    type: "blog",
    category: 2,
    title: "고양이 생육(Raw Meat) 급여 — 지지론과 반대론의 실제 근거",
    subtitle: "생육 지지 주장과 과학적 근거 검토, 세균 위험, 영양 균형 문제, 절충안",
    metaTitle: "고양이 생육 급여 찬반 — 지지론과 반대론 근거 분석 | 펫지기",
    metaDescription: "고양이 생육 급여 찬반 논쟁의 실제 근거를 분석했습니다. 생육 지지 주장의 과학적 검증, 세균 오염 위험, 영양 균형 문제, 현실적 절충안을 정리했습니다.",
    body: `<p>고양이 생육 급여를 둘러싼 논쟁은 반려동물 커뮤니티에서 가장 뜨거운 주제 중 하나다. 양측의 주장을 실제 근거로 검토해본다.</p>

<h2>생육 지지 주장과 검토</h2>
<ul>
<li><strong>"자연식에 가깝다"</strong> → 고양이의 자연 먹이가 생육인 것은 맞다. 그러나 야생 먹이와 마트 생육은 다르다. 냉동 과정, 유통, 위생 기준이 다르다.</li>
<li><strong>"소화 효소가 살아있다"</strong> → 위산이 대부분의 효소를 분해한다. 섭취한 효소가 소화에 직접 기여한다는 근거는 약하다.</li>
<li><strong>"털이 좋아지고 에너지가 넘친다"</strong> → 일부 보호자 보고 있음. 그러나 대조 연구가 부족하다.</li>
</ul>

<h2>생육 반대 근거</h2>
<div class="callout-cat">
<strong>과학적으로 확인된 위험</strong><br>
• 살모넬라·리스테리아 오염: FDA·EFSA 연구에서 시판 생육의 유의미한 오염률<br>
• 영양 불균형: 칼슘·인 비율, 타우린·아라키돈산 등 필수 영양소 부족 가능<br>
• 사람에게 전파: 면역저하자·어린이 등 고위험 가족<br>
• 기생충: 톡소플라즈마·살코시스티스 감염 위험
</div>

<h2>영양 균형 문제</h2>
<p>닭가슴살이나 쇠고기 살코기만 급여하면 타우린 결핍, 칼슘 부족, 비타민 결핍이 생길 수 있다. BARF(뼈 포함 생식) 방식으로 균형을 맞추려 해도 개인이 정확히 하기는 매우 어렵다.</p>

<h2>현실적 절충안</h2>
<ul>
<li>주식은 AAFCO 완전영양식 사료 유지</li>
<li>생육은 소량 간식으로 주 1~2회</li>
<li>급여 후 위생 관리 철저</li>
<li>고위험 가족이 있으면 생육 중단 고려</li>
</ul>

<h2>마지막으로</h2>
<p>생육 급여의 장점은 아직 과학적으로 강하게 지지되지 않고, 위험은 확인되어 있다. 생육을 선택한다면 그 위험을 알고, 안전 기준을 지키며 하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AVMA — Raw or Undercooked Animal-Source Protein Policy",
      "Kerr, K.R. et al. — Apparent Total Tract Energy and Macronutrient Digestibility and Fecal Characteristics of Healthy Adult Cats Fed Extruded, Wet, or Raw Meat-Based Diets. J Anim Sci 2012",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-24T11:00:00.000Z",
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
  console.log("블로그 포스트 76차 시딩 완료! (blog-501 ~ blog-505)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
