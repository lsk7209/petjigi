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
    body: `<p>아토피·관절염·면역 질환으로 스테로이드를 오래 복용하는 강아지가 있다. 스테로이드는 강력한 약이지만 장기 부작용을 반드시 알고 관리해야 한다.</p>

<h2>스테로이드가 필요한 상황</h2>
<ul>
<li>아토피·알레르기 가려움 조절</li>
<li>면역 매개 질환(IMHA, IMTP 등)</li>
<li>IBD·관절염 염증 조절</li>
<li>종양 완화 치료</li>
</ul>

<h2>장기 복용 부작용</h2>
<div class="callout-dog">
<strong>스테로이드 장기 부작용</strong><br>
• 의인성 쿠싱 증후군 (다음·다뇨·복부 팽만·탈모)<br>
• 감염 취약성 증가 (면역 억제)<br>
• 간 효소 상승<br>
• 당뇨 유발 가능<br>
• 근육 위축<br>
• 위장 궤양 (NSAIDs 병용 시 특히 위험)
</div>

<h2>최소 용량 원칙</h2>
<ul>
<li>증상 조절에 필요한 최소 용량 사용</li>
<li>격일 투여로 부작용 최소화 (증상 허용 시)</li>
<li>점진적 감량 — 갑작스러운 중단 금지 (부신 위기)</li>
<li>정기 혈액 검사로 간·혈당 모니터링</li>
</ul>

<h2>대안 치료</h2>
<ul>
<li>아토피: 사이토포인트·아포퀠 (스테로이드 없이 가려움 조절)</li>
<li>관절염: 오메가-3·글루코사민·수중 재활 + 진통제</li>
<li>알레르기 면역요법(ASIT): 장기적으로 스테로이드 필요성 감소</li>
</ul>

<h2>마지막으로</h2>
<p>스테로이드를 두려워하는 것이 아니라 올바르게 사용하는 것이 중요하다. 필요할 때 충분히 쓰되, 최소 기간·최소 용량 원칙으로 부작용을 줄이는 것이 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Scott, D.W. et al. — Muller & Kirk's Small Animal Dermatology. Saunders 2001",
      "한국수의피부학회 스테로이드 사용 가이드라인",
    ]),
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
    body: `<p>고양이가 평소보다 물을 훨씬 많이 마시고 소변량이 늘었다. 단순한 더위 때문일 수도 있지만, 심각한 질환의 신호일 수 있다.</p>

<h2>주요 원인 4가지</h2>
<ul>
<li><strong>만성 신장병(CKD)</strong>: 가장 흔한 원인. 신장 농축 능력 저하.</li>
<li><strong>당뇨병</strong>: 혈당이 높아 소변으로 포도당 배출 → 삼투성 이뇨.</li>
<li><strong>갑상선 기능항진증</strong>: 대사 증가 → 음수·배뇨 증가.</li>
<li><strong>쿠싱 증후군</strong>: 고양이에서 드물지만 발생.</li>
</ul>

<h2>집에서 먼저 확인할 것</h2>
<div class="callout-cat">
<strong>집에서 확인 가능한 변화</strong><br>
• 물그릇 비는 속도가 갑자기 빨라졌는가<br>
• 화장실 사용 빈도 증가<br>
• 체중 감소 여부<br>
• 식욕 변화 (당뇨는 식욕 증가, CKD는 감소)<br>
• 구토·활기 변화
</div>

<h2>진단 검사 순서</h2>
<ol>
<li>소변 비중 검사 (희석된 소변 확인)</li>
<li>혈액 검사: BUN·크레아티닌·혈당·T4</li>
<li>필요 시 초음파·ACTH 자극 시험</li>
</ol>

<h2>치료는 원인에 따라</h2>
<ul>
<li>CKD: 저인 식이·수분 보충</li>
<li>당뇨: 저탄수화물 식이·인슐린</li>
<li>갑상선항진증: 항갑상선제·방사성 요오드</li>
</ul>

<h2>마지막으로</h2>
<p>갑자기 물 섭취가 늘었다면 "더워서"가 아닌 "검사받아야 할 이유"로 보는 것이 좋다. 조기 발견이 치료 결과를 크게 바꾼다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Dibartola, S.P. — Fluid, Electrolyte, and Acid-Base Disorders in Small Animal Practice. Elsevier 2006",
      "한국수의내과학회 다뇨·다음 임상 가이드라인",
    ]),
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
    body: `<p>노령견도 운동이 필요하다. 그러나 젊은 강아지와 같은 방식으로는 오히려 해가 된다. 노령견에게 맞는 운동이 따로 있다.</p>

<h2>노령견 운동의 원칙</h2>
<ul>
<li>강도보다 일관성 — 매일 짧게가 가끔 길게보다 낫다</li>
<li>단단한 지면보다 잔디·흙길 우선</li>
<li>날씨 고려 — 너무 춥거나 더운 날 강도 낮추기</li>
<li>시작 전 5분 워밍업 (천천히 걷기)</li>
</ul>

<h2>관절 질환 보유 강아지 운동 조절</h2>
<div class="callout-dog">
<strong>관절 문제 노령견 운동 가이드</strong><br>
• 점프·갑작스러운 방향 전환 금지<br>
• 하루 10~20분 × 2회가 30분 × 1회보다 관절 부담 적음<br>
• 평지 중심 (언덕·계단 최소화)<br>
• 운동 후 통증 증가 시 다음 날 강도 낮추기
</div>

<h2>수중 재활 운동</h2>
<ul>
<li>관절 부담 없이 근육 사용</li>
<li>수중 트레드밀: 관절 연구에서 가장 효과 좋은 재활 방법</li>
<li>수영: 심폐 기능 + 근력 동시 강화</li>
<li>재활 전문 수의사·물리치료사와 상담</li>
</ul>

<h2>운동 중단 신호</h2>
<ul>
<li>과도한 헐떡임·혀가 파래짐 → 즉시 중단·그늘 이동</li>
<li>절뚝거림 → 당일 운동 중단·수의사 상담</li>
<li>운동 후 하루 종일 무기력 → 강도 낮추기</li>
<li>일어나기 어려워함 → 진통제 처방 상담</li>
</ul>

<h2>마지막으로</h2>
<p>움직임이 감소하면 근육·관절이 더 빠르게 약해진다. 적절한 운동으로 노령견의 신체 기능을 유지하는 것이 삶의 질 향상의 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국수의재활학회 노령견 운동 프로그램 가이드라인",
      "Davidson, J.R. — Canine geriatric rehabilitation. Vet Clin North Am 2014",
    ]),
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
    body: `<p>펫숍에서 구입한 강아지가 일주일 만에 아프기 시작했다. 반품을 요구할 수 있을까? 치료비를 돌려받을 수 있을까?</p>

<h2>소비자 기본 권리</h2>
<p>반려동물은 현행 민법상 물건이므로 소비자보호법·민법의 하자 담보 책임이 적용된다. 판매자는 인수 후 일정 기간 내 발생한 질병·하자에 대해 책임을 질 수 있다.</p>

<h2>업계 표준 및 법적 기준</h2>
<div class="callout-dog">
<strong>반려동물 질병 환불 기준 (소비자원 기준)</strong><br>
• 인수 후 15일 이내 폐사·질병 → 동종 교환 또는 구입가 환급<br>
• 인수 후 1개월 이내 선천성 질환 진단 → 계약 해제 또는 교환<br>
• 판매자가 미리 알고 있었던 질환 → 사기로 형사 고발 가능<br>
▶ 계약서에 별도 조항 있으면 해당 조항 우선
</div>

<h2>소비자가 해야 할 것</h2>
<ol>
<li>구입 직후 동물병원 건강 검진 (하자 증거 확보)</li>
<li>수의사 진단서·진료 기록 보관</li>
<li>판매자 계약서·영수증 보관</li>
<li>판매자와 서면 협의 요청</li>
</ol>

<h2>분쟁 해결 경로</h2>
<ul>
<li>한국소비자원 소비자 상담 센터(1372)</li>
<li>공정거래위원회 신고</li>
<li>소액심판·민사 조정</li>
</ul>

<h2>마지막으로</h2>
<p>펫숍 구입 시 계약서에 보증 기간·환불 조건을 명시하도록 요청하는 것이 사전 예방이다. 구입 즉시 건강 검진을 받아 기록을 남기는 것이 분쟁 시 가장 강력한 증거가 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국소비자원 반려동물 구매 피해 처리 기준 2023",
      "동물보호법 제34조 (동물 판매업 사후 관리 기준)",
    ]),
    disclaimer: null,
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
    body: `<p>눈이 보이지 않는 강아지, 귀가 들리지 않는 고양이, 다리가 세 개인 강아지 — 이들은 "버려야 할 동물"이 아니라 특별한 방식으로 사랑을 주는 존재들이다.</p>

<h2>시각 장애 반려동물</h2>
<ul>
<li>대부분 가구 배치에 빠르게 적응</li>
<li>핵심: 가구 배치 변경 최소화 → 인지 지도 기억</li>
<li>계단·날카로운 모서리 보호</li>
<li>말과 냄새로 의사소통 강화</li>
<li>발 소리가 나는 바닥재 → 방향 파악 도움</li>
</ul>

<h2>청각 장애 반려동물</h2>
<div class="callout-dog">
<strong>청각 장애 강아지·고양이 케어</strong><br>
• 신호 훈련: 손짓·시각 신호 기반 훈련 완전히 가능<br>
• 갑자기 뒤에서 다가가면 놀람·공격 반응 → 미리 알리기<br>
• 진동이나 불빛으로 부르기<br>
• 외출 시 목줄 필수 (이름 불러도 모름)
</div>

<h2>삼지 동물(Three-legged)</h2>
<ul>
<li>대부분 3개월 내 완전한 기동성 회복</li>
<li>나머지 세 다리 근력 유지가 핵심</li>
<li>미끄럼 방지 환경 (관절 보호)</li>
<li>체중 관리 (남은 다리 부담 줄이기)</li>
</ul>

<h2>만성 질환 동물 의료비 준비</h2>
<ul>
<li>월 의료비 예산 설정 (약물·정기 검진)</li>
<li>펫보험 가입 가능 여부 확인 (기존 질환 제한)</li>
<li>전문 수의사 연계 확인</li>
</ul>

<h2>마지막으로</h2>
<p>장애 반려동물은 불행하지 않다. 적절한 환경에서 완전한 삶을 산다. 다른 것을 케어하는 경험은 보호자에게도 특별한 것을 준다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국장애동물보호연합 장애 동물 케어 가이드라인",
      "ASPCA — Caring for Pets with Disabilities",
    ]),
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
