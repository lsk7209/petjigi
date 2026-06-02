import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 86 — cat3×1 + cat4×2 + cat1×1 + cat5×1 = 5편 (IDs 551-555)
// Macros: D, F, A, B, G
// Angles: RA2, RA3, RA1, RA4, RA2

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-551",
    slug: "dog-eye-cataract-guide",
    type: "blog",
    category: 3,
    title: "강아지 백내장 — 눈이 뿌옇게 변하는 이유와 수술 기준",
    subtitle: "핵경화증 vs 백내장 차이, 백내장 단계, 수술 적응증, 수술 없이 관리하는 법",
    metaTitle: "강아지 백내장 — 핵경화증과 차이·수술 기준·관리 가이드 | 펫지기",
    metaDescription: "강아지 눈이 뿌옇게 변할 때 백내장인지 핵경화증인지 구분하는 방법. 백내장 단계, 수술 적응증, 수술 없이 관리하는 법을 정리했습니다.",
    body: `<p>강아지 눈이 뿌옇게 변하면 모두 백내장이라고 생각하기 쉽다. 그러나 노령견에서 흔한 "핵경화증"은 백내장과 다르며, 시력에 큰 영향이 없다.</p>

<h2>핵경화증 vs 백내장 구분</h2>
<table>
<thead><tr><th>구분</th><th>핵경화증</th><th>백내장</th></tr></thead>
<tbody>
<tr><td>원인</td><td>정상적인 노화</td><td>유전·당뇨·외상·UV 노출</td></tr>
<tr><td>외관</td><td>회청색 탁함, 중심부</td><td>흰색 불투명, 광범위</td></tr>
<tr><td>시력</td><td>대부분 유지</td><td>심한 경우 실명</td></tr>
<tr><td>치료</td><td>불필요</td><td>수술 고려 가능</td></tr>
</tbody>
</table>

<h2>백내장 단계</h2>
<ul>
<li>초기: 렌즈 일부만 탁함, 시력 유지</li>
<li>미성숙: 절반 이상 탁해짐, 시력 감소</li>
<li>성숙: 완전 불투명, 심한 시력 저하</li>
<li>과성숙: 렌즈 단백질 분해 시작 → 포도막염 위험</li>
</ul>

<h2>수술 적응증</h2>
<div class="callout-dog">
<strong>백내장 수술 고려 기준</strong><br>
• 양안 백내장으로 일상생활 장애<br>
• 성숙~과성숙 단계<br>
• 당뇨로 인한 급속 진행<br>
• 포도막염 동반 (수술 전 안정화 필요)<br>
• 전신 마취 위험 없는 상태
</div>

<h2>수술 없이 관리하는 법</h2>
<ul>
<li>초기~미성숙 단계: 주기적 안과 검진</li>
<li>가정 환경 변화 최소화 (시각 장애 적응)</li>
<li>당뇨 동반 시 혈당 관리 (진행 속도 늦추기)</li>
<li>항산화 안약: 일부 제품 사용, 효과는 제한적</li>
</ul>

<h2>마지막으로</h2>
<p>눈이 뿌옇게 된다고 바로 포기할 필요 없다. 핵경화증이라면 치료가 필요 없고, 백내장도 단계와 전신 상태에 따라 수술로 시력을 회복할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Davidson, M.G. & Nelms, S.R. — Diseases of the Canine Lens and Cataract Formation. Veterinary Ophthalmology 2013",
      "한국수의안과학회 백내장 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-17T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-552",
    slug: "pet-insurance-claim-rejected",
    type: "blog",
    category: 4,
    title: "펫보험 청구 거절됐을 때 — 이의 제기 방법과 성공 전략",
    subtitle: "청구 거절 주요 이유, 이의 제기 절차, 필요 서류, 분쟁 조정 신청",
    metaTitle: "펫보험 청구 거절 이의 제기 — 절차·서류·분쟁 조정 가이드 | 펫지기",
    metaDescription: "펫보험 청구가 거절됐을 때 이의 제기 방법을 정리했습니다. 거절 주요 이유별 대응 방법, 필요 서류, 금융감독원 분쟁 조정 신청 방법을 알아보세요.",
    body: `<p>펫보험 청구를 했다가 거절당했다. 그냥 포기하는 보호자가 많지만, 이의 제기를 통해 결과가 뒤집히는 경우도 있다.</p>

<h2>흔한 거절 이유와 대응</h2>
<ul>
<li><strong>"대기기간 중 발생"</strong> → 진료 기록에서 최초 증상 발생 시점 확인. 대기기간 이후 처음 발현됐다면 이의 제기 가능.</li>
<li><strong>"기존 질환"</strong> → 고지 의무 이행 여부 확인. 고지하지 않은 질환은 어렵지만, 고지했다면 이의 제기 가능.</li>
<li><strong>"예방적 처치"</strong> → 수의사 소견서에 "치료 목적"임을 명확히 기재 요청.</li>
<li><strong>"면책 사항"</strong> → 약관 해당 조항 원문 확인 후 적용 여부 이의.</li>
</ul>

<h2>이의 제기 절차</h2>
<div class="callout-dog">
<strong>이의 제기 단계</strong><br>
1. 보험사 고객센터 이의 신청 (서면 또는 온라인)<br>
2. 거절 사유 상세 설명 요청<br>
3. 추가 서류 제출 (수의사 소견서, 진료 기록 전체)<br>
4. 보험사 내부 재심사 (통상 2~4주)<br>
5. 불수용 시: 금융감독원 분쟁조정위원회 신청
</div>

<h2>수의사 소견서 활용</h2>
<ul>
<li>질환 최초 발생 시점 명시</li>
<li>치료 목적임을 명확히 기재</li>
<li>기존 질환과의 연관성 없음을 소견에 포함</li>
</ul>

<h2>금융감독원 분쟁 조정</h2>
<ul>
<li>금감원 온라인 민원 시스템(www.fss.or.kr) 신청</li>
<li>처리 기간: 보통 30~90일</li>
<li>비용 없음, 양측 합의 거부 시 민사 소송 가능</li>
</ul>

<h2>마지막으로</h2>
<p>거절이 최종 결론이 아닐 수 있다. 이의 제기는 보호자의 권리다. 소견서 하나가 결과를 바꾸는 경우가 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 보험 분쟁 조정 안내",
      "한국소비자원 펫보험 분쟁 조정 사례 분석 2023",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 보험 분쟁은 해당 기관에 문의하세요.",
    status: "published",
    publishedAt: "2026-10-18T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-553",
    slug: "dog-bite-liability-compensation",
    type: "blog",
    category: 4,
    title: "개물림 사고 — 가해견 보호자의 법적 책임과 피해자 보상",
    subtitle: "개물림 민형사 책임, 피해자 보상 청구 방법, 펫보험 배상 활용, 예방 의무",
    metaTitle: "개물림 사고 법적 책임 — 민형사 책임·보상·예방 의무 가이드 | 펫지기",
    metaDescription: "개물림 사고 시 가해견 보호자의 법적 책임을 정리했습니다. 민형사 책임 범위, 피해자 보상 청구 방법, 펫보험 배상책임 활용, 목줄 의무를 알아보세요.",
    body: `<p>반려견이 타인을 물었다. 어떤 책임을 지게 되는가? 피해를 입었다면 어떤 권리가 있는가? 두 가지 상황 모두에서 알아야 할 것을 정리했다.</p>

<h2>가해 보호자의 법적 책임</h2>
<p>민법 제759조: 동물 점유자는 동물이 타인에게 가한 손해를 배상할 책임이 있다. 형사상으로는 과실치상(형법 제266조) 적용 가능하다. 단, 목줄 착용 등 "상당한 주의"를 다했음을 입증하면 민사 면책 가능.</p>

<h2>배상 범위</h2>
<ul>
<li>치료비 전액</li>
<li>향후 치료비(흉터 제거 등)</li>
<li>휴업 손해 (치료로 인한 수입 상실)</li>
<li>위자료 (정신적 피해)</li>
</ul>

<h2>목줄 착용 의무</h2>
<div class="callout-dog">
<strong>동물보호법 목줄 의무 (위반 시 과태료)</strong><br>
• 공공장소: 2m 이내 목줄 또는 이동장 필수<br>
• 맹견(도사견·핏불 등): 입마개 추가 의무<br>
• 목줄 미착용 상태 물림 → 보호자 과실 크게 인정
</div>

<h2>피해자 입장에서 할 것</h2>
<ul>
<li>즉시 사진 촬영 (상처, 현장)</li>
<li>가해 보호자 신원 확인 및 연락처 수집</li>
<li>병원 진료 기록 보관</li>
<li>경찰 신고 (가해 보호자가 협조하지 않을 경우)</li>
</ul>

<h2>펫보험 배상책임 활용</h2>
<p>배상책임 특약이 있는 펫보험 가입자라면 즉시 보험사에 연락해 처리를 요청하는 것이 가장 효율적이다.</p>

<h2>마지막으로</h2>
<p>개물림 사고는 예방이 최선이다. 산책 중 목줄 착용, 공격성이 있는 개 입마개, 다른 사람·개와의 접촉 시 주의가 보호자의 기본 의무다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "민법 제759조 (동물 점유자 책임) 및 동물보호법 제16조 (목줄 의무)",
      "한국소비자원 개물림 피해 보상 처리 사례 2023",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 법적 분쟁은 전문가에게 문의하세요.",
    status: "published",
    publishedAt: "2026-10-18T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-554",
    slug: "dog-puppy-first-week-guide",
    type: "blog",
    category: 1,
    title: "강아지 입양 첫 주 — 하루하루 무엇을 해야 하는가",
    subtitle: "첫날 환경 적응, 1~3일 차 루틴 확립, 첫 주 수의사 방문, 첫 주 흔한 실수",
    metaTitle: "강아지 입양 첫 주 가이드 — 하루별 행동 지침 완전 정리 | 펫지기",
    metaDescription: "강아지 입양 첫 주에 하루하루 해야 할 것을 정리했습니다. 첫날 환경 적응, 1~7일 루틴 확립, 첫 주 수의사 방문, 흔한 실수를 알아보세요.",
    body: `<p>입양 첫 주는 강아지와 보호자 모두에게 가장 중요한 시간이다. 이 시기에 만들어진 패턴이 평생의 관계 기반이 된다.</p>

<h2>첫날 — 적응 우선, 과도한 자극 금지</h2>
<ul>
<li>조용한 방에서 이동장 문 열어두기</li>
<li>음식·물 위치 보여주기</li>
<li>억지로 꺼내지 않기 — 스스로 탐색하게</li>
<li>가족 전원 과도한 흥분 자제</li>
<li>첫날은 사진 촬영보다 적응이 우선</li>
</ul>

<h2>2~3일 차 — 루틴 시작</h2>
<div class="callout-dog">
<strong>첫 주 기본 루틴</strong><br>
• 식사: 하루 3~4회 정해진 시간, 정해진 장소<br>
• 배변: 식후 10~15분, 기상 직후 배변 유도<br>
• 수면: 크레이트에서 자는 습관 시작<br>
• 놀이: 짧게 (어린 강아지 집중력 5~10분)
</div>

<h2>첫 주 수의사 방문</h2>
<ul>
<li>입양 후 3~7일 내 기본 건강 검진</li>
<li>기생충 검사·구충</li>
<li>예방접종 기록 확인 및 일정 계획</li>
<li>사료·사육 환경 상담</li>
</ul>

<h2>흔한 실수</h2>
<ul>
<li>첫날부터 모든 가족에게 돌아가며 안기 → 극도의 스트레스</li>
<li>배변 실수 시 큰 소리로 혼내기 → 공포 형성</li>
<li>바로 다른 강아지와 놀게 하기 → 백신 전 감염 위험</li>
<li>자유 배변 방치 → 습관 형성</li>
</ul>

<h2>마지막으로</h2>
<p>첫 주의 혼란은 정상이다. 강아지가 새 집에 적응하는 시간을 주면서, 보호자도 함께 적응하는 시간이다. 서두르지 말고, 루틴을 일관되게 유지하면 2~3주 내 훨씬 안정된 모습을 볼 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물행동상담협회 신규 입양 강아지 관리 가이드라인",
      "ASPCA — Welcoming Your New Dog",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-19T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-555",
    slug: "dog-thunderstorm-noise-anxiety",
    type: "blog",
    category: 5,
    title: "강아지 천둥·폭죽 공포 — 왜 일부 강아지는 공황 상태가 되는가",
    subtitle: "소음 공포 원인, 즉각 대처법, 탈감작 훈련, 약물 보조 활용",
    metaTitle: "강아지 천둥·소음 공포 — 공황 대처·탈감작 훈련·약물 가이드 | 펫지기",
    metaDescription: "강아지 천둥·폭죽 소음 공포 원인과 대처법을 정리했습니다. 공황 상태 즉각 대처, 소리 탈감작 훈련 방법, 약물 보조 활용 시점을 알아보세요.",
    body: `<p>천둥소리에 강아지가 떨고, 숨고, 오줌을 지리거나 가구를 파괴한다. 단순한 겁쟁이가 아니라 실제 공황 반응이다.</p>

<h2>왜 이렇게까지 무서워하는가</h2>
<p>천둥은 단순히 소리만의 문제가 아니다. 기압 변화, 정전기, 낙뢰의 전자기 변화까지 강아지가 감지한다. 인간이 인지하지 못하는 자극이 종합적으로 작용해 패닉이 유발된다.</p>

<h2>즉각 대처법 (폭풍 중)</h2>
<div class="callout-dog">
<strong>천둥 공황 시 행동 지침</strong><br>
• 안전한 은신처 제공 (이동장, 침대 밑 접근 허용)<br>
• 강요로 꺼내지 않기<br>
• 큰 소리·TV·음악으로 천둥 소리 마스킹<br>
• 보호자가 침착하게 있기 (공포에 동조하지 않기)<br>
• 지속적인 칭찬·간식으로 긍정 연결
</div>

<h2>탈감작 훈련 (비폭풍 기간)</h2>
<ul>
<li>천둥 소리 녹음 재생 → 가장 낮은 볼륨에서 시작</li>
<li>소리 재생 중 좋아하는 놀이·간식 제공</li>
<li>2~4주에 걸쳐 점진적 볼륨 증가</li>
<li>공포 반응이 나타나면 볼륨 낮추기 (서두르면 역효과)</li>
</ul>

<h2>약물 보조 활용</h2>
<ul>
<li><strong>시투케라(시투르스)</strong>: 수의사 처방 항불안제, 예보 시 사전 투여</li>
<li><strong>DAP 페로몬 디퓨저</strong>: 전반적 불안 감소 보조</li>
<li><strong>불릿 조끼(Thundershirt)</strong>: 압박감으로 불안 감소 효과 일부</li>
<li>심한 공황은 행동 수의사 처방 약물 고려</li>
</ul>

<h2>마지막으로</h2>
<p>소음 공포는 "익숙해지게 두면 낫겠지"로 해결되지 않는다. 방치할수록 악화된다. 탈감작 훈련과 필요 시 약물을 병행하는 체계적 접근이 필요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Dreschel, N.A. & Granger, D.A. — Physiological and behavioral reactivity to stress in thunderstorm-phobic dogs. Applied Animal Behaviour Science 2005",
      "한국반려동물행동상담협회 소음 공포 치료 프로토콜",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-19T11:00:00.000Z",
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
  console.log("블로그 포스트 86차 시딩 완료! (blog-551 ~ blog-555)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
