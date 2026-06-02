import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 79 — cat2×2 + cat3×1 + cat5×1 + cat6×1 = 5편 (IDs 516-520)
// Macros: A, F, D, B, E
// Angles: RA3, RA5, RA2, RA4, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-516",
    slug: "dog-treats-ingredient-guide",
    type: "blog",
    category: 2,
    title: "강아지 트릿 성분 선택 가이드 — 라벨 읽는 법",
    subtitle: "피해야 할 첨가물, 단일 성분 vs 복합 성분, 칼로리 관리, 건강 간식 기준",
    metaTitle: "강아지 트릿 성분 선택 가이드 — 라벨 읽는 법 | 펫지기",
    metaDescription: "강아지 트릿 선택 시 라벨에서 무엇을 봐야 할까요? 피해야 할 첨가물, 단일 성분 vs 복합 성분 비교, 칼로리 관리, 좋은 간식 기준을 정리했습니다.",
    body: `<p>마트에 진열된 강아지 트릿의 종류는 수십 가지다. 어떤 것이 좋고 어떤 것을 피해야 할까? 라벨 읽는 법만 알면 선택이 쉬워진다.</p>

<h2>피해야 할 성분</h2>
<ul>
<li><strong>BHA·BHT·에톡시퀴닌</strong>: 인공 보존제, 발암 가능성 논란</li>
<li><strong>소금·설탕·인공 향미료</strong>: 과도한 나트륨, 비만·신장 부담</li>
<li><strong>자일리톨</strong>: 강아지에게 치명적 독성 (무설탕 인간 식품에 주의)</li>
<li><strong>양파·마늘 분말</strong>: 소량도 적혈구 파괴</li>
<li><strong>불명확한 "육류 부산물"</strong>: 원료 불투명</li>
</ul>

<h2>라벨 읽는 순서</h2>
<div class="callout-dog">
<strong>트릿 라벨 확인 포인트</strong><br>
① 첫 번째 성분: 실제 고기 명시 (닭고기, 소고기, 연어 등)<br>
② 성분 수: 적을수록 좋음 (단일 성분이 이상적)<br>
③ 원산지: 한국·미국·뉴질랜드 등 확인<br>
④ 첨가제 항목: 보존제·색소·향미료 유무<br>
⑤ 칼로리: 포장당 또는 개당 kcal 확인
</div>

<h2>칼로리 관리</h2>
<p>트릿은 하루 총 칼로리의 10% 이내로 제한하는 것이 권장된다. 훈련용 소형 트릿을 자주 준다면 식사 칼로리를 그만큼 줄여야 한다.</p>

<h2>추천 트릿 유형</h2>
<ul>
<li>동결건조 단일 성분 (닭고기·소고기·연어 단일)</li>
<li>저칼로리 훈련용 소프트 트릿</li>
<li>채소 간식 (당근·오이 — 저칼로리 천연)</li>
<li>VOHC 인증 치과 간식 (치석 제거 효과 확인)</li>
</ul>

<h2>마지막으로</h2>
<p>트릿은 보상이지 식사가 아니다. 좋은 트릿 하나가 훈련 효율을 높이고, 나쁜 트릿 하나가 장기적 건강을 해친다. 성분 라벨에 3초만 투자하는 습관이 강아지 건강을 지킨다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AAFCO — Pet Food Labeling Requirements 2023",
      "한국수의영양학회 간식 급여 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-30T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-517",
    slug: "cat-prescription-diet-guide",
    type: "blog",
    category: 2,
    title: "고양이 처방식 사료 완전 해설 — 왜 수의사 처방 없이는 안 되는가",
    subtitle: "처방식 종류별 적응증, 일반 사료와의 성분 차이, 처방식 거부 시 대안",
    metaTitle: "고양이 처방식 사료 — 종류·적응증·일반 사료 차이 완전 가이드 | 펫지기",
    metaDescription: "고양이 처방식 사료 종류와 적응증을 정리했습니다. 신장·비뇨기·소화·알레르기 처방식 성분 차이, 일반 사료와의 비교, 거부 시 대안을 알아보세요.",
    body: `<p>처방식 사료는 의약품이 아니지만, 수의사 진단 없이 마음대로 사용하면 오히려 해가 될 수 있다. 각 처방식이 어떤 질환에 쓰이고 무엇이 다른지 알아보자.</p>

<h2>처방식이 일반 사료와 다른 이유</h2>
<p>특정 영양소를 의도적으로 조정한 사료다. 예를 들어 신장 처방식은 인·단백질 함량을 낮추고, 요로 처방식은 pH를 조절한다. 이 조정이 질환 없는 고양이에게는 오히려 영양 불균형을 만들 수 있다.</p>

<h2>주요 처방식 종류별 적응증</h2>
<table>
<thead><tr><th>처방식</th><th>주요 적응증</th><th>핵심 조정</th></tr></thead>
<tbody>
<tr><td>신장(Renal)</td><td>CKD</td><td>저인·저단백</td></tr>
<tr><td>비뇨기(Urinary)</td><td>FLUTD·결석</td><td>마그네슘·pH 조절</td></tr>
<tr><td>소화기(GI)</td><td>IBD·소화 장애</td><td>고소화율·저섬유</td></tr>
<tr><td>알레르기(Hypo/Novel)</td><td>식이 알레르기</td><td>가수분해·신단백</td></tr>
<tr><td>체중관리(Obesity)</td><td>비만</td><td>저칼로리·고섬유</td></tr>
<tr><td>관절(Mobility)</td><td>관절염</td><td>오메가-3·글루코사민</td></tr>
</tbody>
</table>

<h2>처방식 거부 시</h2>
<div class="callout-cat">
<strong>처방식 전환 팁</strong><br>
• 급격한 교체 금지 — 7~10일 점진적 혼합<br>
• 처방 습식 사료 시도 (향 강해 선호도 높음)<br>
• 다른 브랜드 동일 처방식 시도<br>
• 인 결합제 + 일반 사료 조합 (수의사 상담 후)
</div>

<h2>마지막으로</h2>
<p>처방식은 치료의 일부다. "비싸니까" 또는 "안 먹으니까"라고 임의로 중단하기 전 수의사와 상담하는 것이 우선이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "WSAVA — Nutritional Assessment Guidelines 2023",
      "한국수의영양학회 처방식 적응증 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-30T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-518",
    slug: "dog-mast-cell-tumor-guide",
    type: "blog",
    category: 3,
    title: "강아지 비만세포종(MCT) — 피부 혹을 발견했을 때 알아야 할 것",
    subtitle: "비만세포종 특징, 등급 분류, 수술 vs 약물 치료, 예후 인자",
    metaTitle: "강아지 비만세포종(MCT) — 등급·수술·치료·예후 가이드 | 펫지기",
    metaDescription: "강아지 피부에 혹이 발견됐을 때 비만세포종(MCT) 가능성을 알아보세요. 등급 분류, 수술 기준, 약물 치료, 예후 인자를 정리했습니다.",
    body: `<p>강아지 피부 종양의 가장 흔한 유형 중 하나가 비만세포종이다. 겉보기에 작고 무해해 보여도 방치하면 전신으로 퍼질 수 있는 악성 종양이다.</p>

<h2>비만세포종이란</h2>
<p>비만세포(mast cell)가 비정상적으로 증식하는 종양이다. 피부에 단단하거나 물렁한 혹으로 나타나며, 세게 만지면 히스타민 방출로 국소 팽창·가려움·소화 증상이 나타날 수 있다.</p>

<h2>고위험 품종</h2>
<p>복서, 골든 리트리버, 래브라도, 시추, 비글, 보스턴 테리어에서 발생률이 높다.</p>

<h2>등급 분류</h2>
<div class="callout-dog">
<strong>비만세포종 등급 (Patnaik 또는 Kiupel 분류)</strong><br>
• <strong>저등급(Grade I/Low)</strong>: 국소적, 수술로 완치 가능<br>
• <strong>중등급(Grade II/High)</strong>: 전이 위험 있음, 수술 + 추가 치료<br>
• <strong>고등급(Grade III)</strong>: 높은 전이율, 공격적 치료 필요<br>
▶ 등급 판정은 조직 생검 후 병리 검사로만 가능
</div>

<h2>치료 옵션</h2>
<ul>
<li><strong>수술</strong>: 저~중등급, 완전 절제 가능한 경우 선호</li>
<li><strong>방사선</strong>: 수술로 완전 제거 불가 시 보조</li>
<li><strong>표적 치료제</strong>: 토세라닙(팔라디아) — KIT 돌연변이 양성 종양에 효과적</li>
<li><strong>화학 요법</strong>: 전이형에 활용</li>
</ul>

<h2>마지막으로</h2>
<p>피부 혹을 발견하면 "지켜보자"보다 세침흡인(FNA) 검사를 받는 것이 먼저다. 5분의 검사가 조기 발견과 완치 가능성을 크게 높인다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Kiupel, M. et al. — Proposal of a 2-tier histologic grading system for canine cutaneous mast cell tumors. Vet Pathol 2011",
      "한국수의종양학회 비만세포종 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-01T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-519",
    slug: "cat-nighttime-activity-management",
    type: "blog",
    category: 5,
    title: "고양이 새벽 소란 — 야행성 습관을 보호자 수면과 맞추는 방법",
    subtitle: "고양이 야행성 원인, 밤 활동 줄이는 방법, 낮 자극 늘리기, 수면 방해 대처",
    metaTitle: "고양이 새벽 소란 해결 — 야행성 습관 조절 완전 가이드 | 펫지기",
    metaDescription: "고양이 새벽 울음·뛰어다니기 때문에 잠 못 자는 보호자를 위한 가이드. 야행성 원인, 낮 자극 늘리기, 저녁 루틴 설계, 밤 활동 줄이는 방법을 정리했습니다.",
    body: `<p>새벽 3시에 고양이가 얼굴 위를 뛰어다닌다. 문을 긁는다. 큰 소리로 운다. 많은 고양이 보호자들이 수면 부족을 호소하는 원인이다.</p>

<h2>고양이가 새벽에 활동하는 이유</h2>
<p>고양이는 박명박모성(crepuscular) — 새벽과 황혼에 가장 활동적인 동물이다. 야행성으로 알려져 있지만 정확히는 해뜨기 전·해질 무렵이 피크다. 실내에서는 낮에 자고 밤에 에너지가 남아 활동한다.</p>

<h2>낮 자극 늘리기 (근본 해결)</h2>
<div class="callout-cat">
<strong>낮 에너지 소진 전략</strong><br>
• 오후 5~7시: 20~30분 집중 놀이 (낚싯대·레이저)<br>
• 저녁 식사: 자동 급식기로 밤 늦게 공급 → 밥 후 잠드는 패턴 유도<br>
• 퍼즐 피더 활용: 저녁 간식을 퍼즐로 제공<br>
• 두 번째 고양이: 함께 놀면 야간 에너지가 서로 소진됨
</div>

<h2>취침 전 루틴 설계</h2>
<ul>
<li>취침 30분 전 격렬한 놀이 → 식사 → 그루밍 → 수면 (자연 사냥 주기 모방)</li>
<li>야간 자동 급식기 설정 (새벽 배고픔으로 깨우는 패턴 차단)</li>
</ul>

<h2>단기 대처법</h2>
<ul>
<li>침실 문 닫기 (일관성 유지 필요 — 처음엔 더 울 수 있음)</li>
<li>관심 주지 않기 (울 때 반응하면 학습됨)</li>
<li>안전한 밤 공간 확보 (침대·고양이 전용 방)</li>
</ul>

<h2>마지막으로</h2>
<p>야간 소란의 대부분은 낮 자극 부족에서 온다. 저녁 집중 놀이 하나만 추가해도 대부분의 고양이 보호자 수면 문제가 해결된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Beaver, B.V. — Feline Behavior: A Guide for Veterinarians. Saunders 2003",
      "한국고양이보호자연합 야간 행동 관리 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-01T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-520",
    slug: "petloss-recovery-timeline",
    type: "blog",
    category: 6,
    title: "펫로스 회복 — '언제쯤 괜찮아지나요'에 대한 솔직한 답",
    subtitle: "펫로스 슬픔 단계, 개인차 이해, 회복을 가로막는 것들, 도움받는 방법",
    metaTitle: "펫로스 회복 타임라인 — 슬픔 단계·개인차·도움받는 방법 | 펫지기",
    metaDescription: "반려동물을 떠나보낸 후 언제쯤 괜찮아질까요? 펫로스 슬픔 단계, 개인차가 생기는 이유, 회복을 가로막는 것들, 도움받는 방법을 솔직하게 정리했습니다.",
    body: `<p>"많이 힘드시겠지만 곧 괜찮아질 거예요"라는 말이 오히려 상처가 되는 경우가 있다. 펫로스의 슬픔에는 정해진 기한이 없다.</p>

<h2>펫로스 슬픔이 깊은 이유</h2>
<p>반려동물과의 관계는 조건 없는 사랑, 일상의 루틴, 신체 접촉의 복합체다. 인간 관계에서 경험하기 어려운 완전한 수용을 주는 존재를 잃는 것이다. 슬픔의 깊이가 관계의 깊이에 비례한다.</p>

<h2>일반적인 회복 타임라인</h2>
<ul>
<li><strong>초기 (1~4주)</strong>: 충격·부정·극심한 그리움. 일상 기능 저하가 정상.</li>
<li><strong>중기 (1~3개월)</strong>: 특정 자극(소리·냄새·장소)에 반응. 좋은 날·나쁜 날 반복.</li>
<li><strong>장기 (3~12개월)</strong>: 점진적 안정. 그러나 완전히 "잊는" 것은 아니다.</li>
</ul>
<p>이것은 평균적 경향이지, 기준이 아니다. 개인차가 매우 크다.</p>

<h2>회복을 가로막는 것들</h2>
<div class="callout-cat">
<strong>슬픔을 악화시키는 패턴</strong><br>
• "강아지인데 왜 그렇게까지 슬퍼해"라는 주변 반응<br>
• 스스로에게도 "빨리 극복해야 해"라는 압박<br>
• 사진·물건을 강제로 치우는 것 (준비가 됐을 때 하면 됨)<br>
• 슬픔을 혼자만 견디는 것
</div>

<h2>도움받는 방법</h2>
<ul>
<li>펫로스 온라인 커뮤니티 (이해하는 사람들과 나누기)</li>
<li>반려동물 전문 상담사 또는 심리 상담</li>
<li>추모 의식 만들기 (기일 추모, 좋아했던 장소 방문)</li>
<li>충분히 시간이 지난 후 새 반려동물 입양 (의무는 아님)</li>
</ul>

<h2>마지막으로</h2>
<p>펫로스는 실제 슬픔이다. 그 슬픔은 사랑의 증거다. 얼마나 오래 슬퍼해도 괜찮다. 당신의 속도로, 당신의 방식으로 애도하면 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Kübler-Ross, E. — On Grief and Grieving. Simon & Schuster 2005",
      "한국펫로스증후군연구회 애도 지원 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-02T09:00:00.000Z",
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
  console.log("블로그 포스트 79차 시딩 완료! (blog-516 ~ blog-520)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
