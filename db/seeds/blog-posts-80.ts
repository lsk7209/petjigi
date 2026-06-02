import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 80 — cat3×2 + cat2×1 + cat1×1 + cat4×1 = 5편 (IDs 521-525)
// Macros: D, B, A, F, G
// Angles: RA2, RA5, RA1, RA4, RA3

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-521",
    slug: "dog-mvd-mitral-valve-disease",
    type: "blog",
    category: 3,
    title: "강아지 승모판 질환(MVD) — 심잡음 진단 후 보호자가 알아야 할 것",
    subtitle: "MVD 단계(ACVIM A~D), 심잡음 발견 후 대처, 약물 시작 시점, 식이 관리",
    metaTitle: "강아지 승모판 질환(MVD) — 심잡음 단계·약물 시작·관리 가이드 | 펫지기",
    metaDescription: "강아지 승모판 질환(MVD) 심잡음 발견 후 관리 방법. ACVIM 단계별 치료 기준, 약물 시작 시점, 식이 관리, 일상에서 주의할 점을 정리했습니다.",
    body: `<p>"심잡음이 들려요"라는 수의사 말에 놀라는 보호자가 많다. 그러나 모든 심잡음이 즉각적인 치료를 요하는 것은 아니다. 단계를 이해하면 불필요한 공포를 피할 수 있다.</p>

<h2>승모판 질환이란</h2>
<p>심장 좌심방과 좌심실 사이의 승모판이 두꺼워지고 기능을 잃어 혈액이 역류하는 질환이다. 소형견에서 매우 흔하며, 카발리에 킹 찰스 스패니얼·닥스훈트·말티즈에서 특히 많이 발생한다.</p>

<h2>ACVIM 단계별 분류</h2>
<table>
<thead><tr><th>단계</th><th>특징</th><th>치료</th></tr></thead>
<tbody>
<tr><td>A</td><td>위험 품종, 이상 없음</td><td>모니터링만</td></tr>
<tr><td>B1</td><td>심잡음 있음, 심장 비대 없음</td><td>모니터링</td></tr>
<tr><td>B2</td><td>심잡음 + 심장 비대</td><td>피모벤단 시작</td></tr>
<tr><td>C</td><td>심부전 증상 발현</td><td>적극 약물 치료</td></tr>
<tr><td>D</td><td>약물 저항성 심부전</td><td>고용량·복합 치료</td></tr>
</tbody>
</table>

<h2>심잡음 발견 후 체크리스트</h2>
<div class="callout-dog">
<strong>심잡음 발견 시 권장 검사</strong><br>
• 흉부 X-ray: 심장 비대 여부 확인 (VHS 측정)<br>
• 심장 초음파(Echo): 판막 상태, 심장 기능 정확 평가<br>
• 혈압 측정: 동반 고혈압 확인<br>
• 주기: B1 단계 6~12개월, B2 이상 더 자주
</div>

<h2>식이 관리</h2>
<ul>
<li>저염식: 심부전 단계(C~D)에서 중요 — 일반 사료는 나트륨 과다</li>
<li>심장 전용 처방식 활용</li>
<li>적정 체중 유지 (비만 시 심장 부하 증가)</li>
</ul>

<h2>마지막으로</h2>
<p>B1 단계 심잡음은 치료 없이도 몇 년을 안정적으로 지낼 수 있다. 중요한 것은 정기 검진으로 단계 변화를 조기에 파악하는 것이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Keene, B.W. et al. — ACVIM consensus guidelines for the diagnosis and treatment of myxomatous mitral valve disease in dogs. J Vet Intern Med 2019",
      "한국수의심장학회 승모판 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-02T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-522",
    slug: "dog-vegetable-safe-guide",
    type: "blog",
    category: 2,
    title: "강아지에게 줄 수 있는 채소 — 안전한 것과 위험한 것",
    subtitle: "안전한 채소 10가지, 절대 금지 채소, 급여량 기준, 조리 vs 생채소",
    metaTitle: "강아지에게 안전한 채소 가이드 — 허용·금지 목록 완전 정리 | 펫지기",
    metaDescription: "강아지에게 줄 수 있는 채소와 피해야 할 채소를 정리했습니다. 당근·브로콜리 등 안전한 채소, 양파·마늘 등 절대 금지 채소, 급여량 기준을 알아보세요.",
    body: `<p>채소를 간식으로 주는 보호자가 늘고 있다. 저칼로리에 식이섬유가 풍부해 체중 관리에도 도움이 된다. 그러나 강아지에게 독성인 채소도 있으므로 주의가 필요하다.</p>

<h2>안전한 채소 10가지</h2>
<ul>
<li><strong>당근</strong>: 비타민A, 저칼로리. 생으로 씹기 놀이로도 활용 가능.</li>
<li><strong>오이</strong>: 95% 수분, 여름 간식으로 이상적.</li>
<li><strong>녹두·완두콩</strong>: 단백질·섬유소 풍부. 소금 없이 제공.</li>
<li><strong>고구마</strong>: 삶은 것. 비타민A·섬유소. 단, 당분 높아 소량.</li>
<li><strong>브로콜리</strong>: 비타민C. 소량만 (과다 시 소화 장애).</li>
<li><strong>시금치</strong>: 소량은 괜찮음. 과다 시 옥살산 문제.</li>
<li><strong>셀러리</strong>: 저칼로리, 수분 충분. 잘게 잘라 제공.</li>
<li><strong>호박</strong>: 퓌레 형태. 소화 보조. 파이 속 아닌 순수 호박.</li>
<li><strong>케일</strong>: 소량만. 갑상선 문제 있는 강아지는 주의.</li>
<li><strong>무(껍질 제거)</strong>: 소화 효소 풍부. 소량 제공.</li>
</ul>

<h2>절대 금지 채소</h2>
<div class="callout-dog">
<strong>강아지에게 독성인 채소</strong><br>
• <strong>양파·파·마늘·부추</strong>: 적혈구 파괴 (가열해도 독성 유지)<br>
• <strong>아보카도</strong>: 퍼신 성분 독성<br>
• <strong>생감자·감자 싹</strong>: 솔라닌 독성<br>
• <strong>토마토 잎·줄기</strong>: 알칼로이드 독성 (익은 열매는 소량 괜찮음)
</div>

<h2>급여량 기준</h2>
<ul>
<li>채소는 하루 칼로리의 10% 이내</li>
<li>처음 급여 시 소량 시작 (알레르기·소화 반응 확인)</li>
<li>날것은 잘게 잘라 질식 방지</li>
</ul>

<h2>마지막으로</h2>
<p>채소 간식은 주식이 아닌 보완으로 활용하는 것이 적절하다. 당근 한 조각, 오이 슬라이스가 훌륭한 저칼로리 간식이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA Animal Poison Control — Vegetables Safe and Toxic for Dogs",
      "한국수의영양학회 채소 급여 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-03T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-523",
    slug: "kitten-first-year-checklist",
    type: "blog",
    category: 1,
    title: "키튼 첫 해 체크리스트 — 예방접종부터 중성화까지",
    subtitle: "월별 예방접종 일정, 기생충 예방, 중성화 시기, 사회화·환경 체크리스트",
    metaTitle: "키튼 첫 해 체크리스트 — 예방접종·중성화·사회화 월별 가이드 | 펫지기",
    metaDescription: "새끼 고양이(키튼) 첫 해에 해야 할 모든 것. 예방접종 일정, 기생충 예방, 중성화 시기, 사회화 체크리스트를 월별로 정리했습니다.",
    body: `<p>새끼 고양이를 처음 키우면 무엇을 언제 해야 할지 막막하다. 첫 해 체크리스트를 알아두면 중요한 것을 빠뜨리지 않는다.</p>

<h2>월별 예방접종 일정 (일반적 기준)</h2>
<table>
<thead><tr><th>시기</th><th>접종·처치</th></tr></thead>
<tbody>
<tr><td>6~8주</td><td>첫 복합백신 (FVRCP: 허피스·칼리시·범백)</td></tr>
<tr><td>9~12주</td><td>복합백신 2차</td></tr>
<tr><td>12~16주</td><td>복합백신 3차 + 광견병 접종</td></tr>
<tr><td>6개월</td><td>중성화 수술 고려</td></tr>
<tr><td>1년</td><td>복합백신 부스터 + 광견병 1년 부스터</td></tr>
</tbody>
</table>

<h2>기생충 예방 일정</h2>
<div class="callout-cat">
<strong>키튼 기생충 예방</strong><br>
• 내부 기생충(구충): 2·4·6·8주령, 이후 3개월마다<br>
• 외부 기생충(벼룩·진드기): 2개월령부터 월 1회<br>
• 심장사상충: 완전 실내묘도 예방 권장
</div>

<h2>중성화 시기</h2>
<ul>
<li>일반적 권장: 5~6개월령 (첫 발정 전)</li>
<li>이전 중성화(2~3개월): 일부 국가 가능, 안전성 연구 있음</li>
<li>발정 중 수술은 출혈 위험 높아 권장하지 않음</li>
</ul>

<h2>사회화 체크리스트</h2>
<ul>
<li>다양한 사람(어린이·노인·모자 쓴 사람) 접촉</li>
<li>다양한 소리 노출 (청소기·헤어드라이어 낮은 볼륨)</li>
<li>이동장 편안함 훈련</li>
<li>신체 검진 모의 훈련 (귀·발·입 만지기)</li>
</ul>

<h2>마지막으로</h2>
<p>첫 해 건강 관리가 고양이의 평생 건강 기반을 만든다. 예방접종·구충·중성화라는 세 가지 기본 투자로 많은 질환을 예방할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AAFP — Feline Vaccination Advisory Panel Report 2020",
      "한국고양이수의사회 키튼 케어 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-03T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-524",
    slug: "pet-owner-estate-planning",
    type: "blog",
    category: 4,
    title: "반려동물 보호자 사망 또는 입원 후 — 반려동물은 어떻게 되나",
    subtitle: "반려동물 유언장 포함 방법, 임시 보호 지정, 신탁 활용, 미리 준비하는 방법",
    metaTitle: "보호자 사망 후 반려동물 — 유언장·임시 보호·신탁 준비법 | 펫지기",
    metaDescription: "반려동물 보호자가 갑자기 사망하거나 입원하면 반려동물은 어떻게 될까요? 유언장에 반려동물 포함하는 방법, 임시 보호자 지정, 반려동물 신탁을 정리했습니다.",
    body: `<p>보호자가 갑자기 사고나 질병으로 돌볼 수 없게 되면 반려동물은 보호소에 맡겨지거나 버려질 위험이 있다. 미리 준비해두면 이를 막을 수 있다.</p>

<h2>준비가 필요한 상황</h2>
<ul>
<li>보호자 사망</li>
<li>장기 입원·의식불명</li>
<li>1인 가구 보호자 사고</li>
<li>해외 장기 출장</li>
</ul>

<h2>유언장에 반려동물 포함하기</h2>
<p>한국 민법에서 동물은 재산(물건)이므로 유언장으로 처분 방법을 지정할 수 있다. 유언장에 "○○(개·고양이)를 △△에게 양도하고, 관리 비용으로 □□원을 지급한다"고 명시할 수 있다. 단, 수증자(받는 사람)의 동의가 미리 있어야 한다.</p>

<h2>임시 보호자 지정</h2>
<div class="callout-dog">
<strong>임시 보호 네트워크 구성</strong><br>
• 1순위: 가족 또는 가까운 친구 — 사전 동의 받기<br>
• 2순위: 동물 보호 단체 또는 지인<br>
• 지갑·가방에 "응급 반려동물 연락 카드" 보관<br>
  (반려동물 이름, 종류, 임시 보호자 연락처 포함)
</div>

<h2>반려동물 신탁</h2>
<p>재산을 신탁에 맡기고 반려동물 관리를 조건으로 수익자에게 지급하는 방식이다. 국내에서는 아직 반려동물 전용 신탁이 활성화되지 않았지만, 일반 신탁을 활용해 비슷한 효과를 낼 수 있다. 법무사·변호사 상담 권장.</p>

<h2>당장 할 수 있는 준비</h2>
<ul>
<li>임시 보호자 최소 2명 지정 및 동의 받기</li>
<li>반려동물 정보 문서 작성 (의료 기록·약·사료 정보·수의사 연락처)</li>
<li>보호자 지갑에 응급 카드 보관</li>
</ul>

<h2>마지막으로</h2>
<p>"내가 없어지면"은 생각하기 싫은 주제지만, 반려동물을 진정으로 사랑한다면 그 이후를 준비하는 것도 사랑의 일부다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "민법 제1073조 (유언의 방식) 및 신탁법",
      "한국동물복지협회 보호자 부재 대비 가이드",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 법적 준비는 전문가에게 문의하세요.",
    status: "published",
    publishedAt: "2026-10-04T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-525",
    slug: "dog-atopic-dermatitis-management",
    type: "blog",
    category: 3,
    title: "강아지 아토피 피부염 — 평생 가는 가려움의 원인과 관리",
    subtitle: "아토피 vs 알레르기 차이, 촉발 요인, 약물·면역요법·식이 관리, 재발 예방",
    metaTitle: "강아지 아토피 피부염 — 원인·촉발 요인·치료·관리 완전 가이드 | 펫지기",
    metaDescription: "강아지 아토피 피부염 원인, 촉발 요인, 치료 옵션을 정리했습니다. 아토피와 알레르기 차이, 사이토포인트·아포퀠 비교, 식이 관리, 재발 예방법을 알아보세요.",
    body: `<p>강아지가 계속 긁고, 발을 핥고, 귀를 자주 흔든다. 이것이 계절을 타거나 특정 환경에서 심해진다면 아토피 피부염일 가능성이 있다.</p>

<h2>아토피란</h2>
<p>환경 알레르겐(먼지 진드기·꽃가루·곰팡이)에 대한 유전적 과민 반응이다. 피부 장벽 기능이 약해 알레르겐이 피부를 통해 체내로 들어가 면역 반응을 일으킨다. 식이 알레르기와 공존하기도 한다.</p>

<h2>고위험 품종</h2>
<p>불독, 웨스트 하일랜드 화이트 테리어, 래브라도, 골든, 코커스패니얼, 시추, 비즈라.</p>

<h2>촉발 요인 관리</h2>
<div class="callout-dog">
<strong>흔한 촉발 요인과 관리</strong><br>
• 집 먼지 진드기: 침구 주 2회 세탁, 강아지 침대 자주 청소<br>
• 꽃가루: 산책 후 발·얼굴 닦기<br>
• 곰팡이: 습도 50% 이하 유지<br>
• 이차 세균·효모 감염: 증상 악화 시 즉시 수의사 치료
</div>

<h2>치료 옵션 비교</h2>
<ul>
<li><strong>사이토포인트(Cytopoint)</strong>: 생물학적 제제, 월 1회 주사, 빠른 효과, 부작용 적음</li>
<li><strong>아포퀠(Apoquel)</strong>: 경구, JAK 억제제, 24시간 내 효과, 장기 사용 모니터링 필요</li>
<li><strong>알레르기 면역요법(ASIT)</strong>: 알레르겐 소량 반복 노출로 내성 형성 — 유일한 원인 치료</li>
<li><strong>스테로이드</strong>: 단기 급성기 사용, 장기 부작용 주의</li>
</ul>

<h2>마지막으로</h2>
<p>아토피는 완치가 어렵고 평생 관리가 필요하다. 그러나 적절한 치료로 가려움을 조절하고 삶의 질을 유지하는 것은 충분히 가능하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Hensel, P. et al. — Canine atopic dermatitis: detailed guidelines for diagnosis and allergen identification. BMC Vet Res 2015",
      "한국수의피부학회 아토피 피부염 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-04T11:00:00.000Z",
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
  console.log("블로그 포스트 80차 시딩 완료! (blog-521 ~ blog-525)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
