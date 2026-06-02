import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 96 — cat3×2 + cat5×1 + cat4×1 + cat2×1 = 5편 (IDs 601-605)
// Macros: D, A, F, B, G
// Angles: RA2, RA1, RA4, RA3, RA5

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-601",
    slug: "cat-stomatitis-long-term-management",
    type: "blog",
    category: 3,
    title: "고양이 구내염 장기 관리 — 발치 후에도 재발하는 이유",
    subtitle: "고양이 구내염 원인, 전발치 효과와 한계, 면역 억제 치료, 일상 통증 관리",
    metaTitle: "고양이 구내염 장기 관리 — 전발치·면역 치료·통증 관리 가이드 | 펫지기",
    metaDescription: "고양이 구내염 장기 관리 방법. 전발치 효과와 한계, 재발하는 이유, 면역 억제 치료, 일상적인 통증 관리, 식이 조정을 정리했습니다.",
    body: `<p>고양이 구내염은 치료해도 재발이 잦은 매우 어려운 질환이다. 완치보다 관리를 목표로 하는 장기적 접근이 필요하다.</p>

<h2>고양이 구내염이란</h2>
<p>입 안 전체(구강·인두)에 심한 염증이 생기는 질환이다. 원인은 면역 매개성으로, 자신의 치아에 대한 비정상적인 면역 반응으로 추정된다. FCV·FHV 감염과 연관이 있는 경우도 있다.</p>

<h2>전발치(모든 치아 제거)의 효과와 한계</h2>
<div class="callout-cat">
<strong>전발치 결과 통계</strong><br>
• 완전 회복: 약 60% (치아 제거 후 면역 과잉 반응 사라짐)<br>
• 부분 개선: 약 20%<br>
• 효과 없음: 약 20%<br>
▶ 40%에서 전발치 후에도 증상 지속 — 추가 치료 필요
</div>

<h2>재발하는 이유</h2>
<ul>
<li>치아 잔존 파편 (불완전 발치)</li>
<li>FCV 만성 감염 지속</li>
<li>자가면역 기전 자체가 지속</li>
</ul>

<h2>추가 치료 옵션</h2>
<ul>
<li>사이클로스포린(면역 억제제): 자가면역 반응 억제</li>
<li>스테로이드: 단기 염증 조절</li>
<li>인터페론: 면역 조절 효과 일부</li>
<li>레이저 치료: 통증 완화 보조</li>
</ul>

<h2>일상 통증 관리</h2>
<ul>
<li>습식 사료 또는 퓌레 형태 (씹기 최소화)</li>
<li>따뜻한 음식 (향 강화, 식욕 유지)</li>
<li>구강 세척제 일부 보조 활용</li>
<li>통증 신호 모니터링 (침 흘림·얼굴 비비기·식욕 감소)</li>
</ul>

<h2>마지막으로</h2>
<p>구내염은 완치가 어렵지만 포기해서는 안 된다. 수의사와 지속적인 소통으로 관리 방법을 찾아가는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Lommer, M.J. — Efficacy of cyclosporine for chronic, refractory stomatitis in cats. J Vet Dent 2013",
      "한국수의치과학회 고양이 구내염 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-11T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-602",
    slug: "dog-vomiting-cause-guide",
    type: "blog",
    category: 3,
    title: "강아지 구토 — 언제 걱정해야 하고 언제 지켜봐도 되는가",
    subtitle: "단순 구토 vs 위험 구토 구분 기준, 황색 담즙 구토, 즉시 병원 신호",
    metaTitle: "강아지 구토 원인 — 위험 신호 vs 지켜봐도 되는 경우 가이드 | 펫지기",
    metaDescription: "강아지 구토 원인과 대처 방법. 단순 소화 불량과 위험한 구토를 구분하는 기준, 황색 담즙 구토 이유, 즉시 동물병원에 가야 하는 신호를 정리했습니다.",
    body: `<p>강아지 구토는 매우 흔하다. 그러나 "지켜봐도 되는 구토"와 "즉시 병원에 가야 하는 구토"를 구분하는 것이 중요하다.</p>

<h2>지켜봐도 되는 구토</h2>
<ul>
<li>1회 구토 후 활기 있고 식욕이 있음</li>
<li>구토 내용물이 미소화 음식 또는 풀</li>
<li>식이 변화 직후 (새 사료 전환)</li>
<li>너무 빠르게 먹은 후</li>
</ul>

<h2>황색 담즙 구토</h2>
<p>공복 시간이 길 때 담즙이 역류해 황색 또는 녹색 거품을 토하는 것이다. 밥을 더 자주 주거나, 자기 전 소량 간식을 주면 개선된다. 단, 반복적이면 소화기 검진 필요.</p>

<h2>즉시 병원이 필요한 구토</h2>
<div class="callout-dog">
<strong>즉시 병원 신호</strong><br>
• 구토에 혈액 포함<br>
• 24시간 내 3회 이상 반복<br>
• 구토 후에도 계속 헛구역질<br>
• 무기력·복부 팽만 동반 (위염전 가능성)<br>
• 이물질 삼킨 것이 의심됨<br>
• 어린 강아지·노령견에서 반복
</div>

<h2>원인별 분류</h2>
<ul>
<li>식이 관련: 과식·빠른 식사·사료 전환·이물질</li>
<li>감염: 파보바이러스·세균성 장염</li>
<li>전신 질환: 신장·간·췌장·부신 질환</li>
<li>중독: 독성 식물·약물·음식</li>
</ul>

<h2>마지막으로</h2>
<p>구토 후 강아지가 활기 있고 음수·배변이 정상이면 보통 24시간 경과를 봐도 된다. 그러나 혈액·무기력·반복·팽만이 동반되면 망설이지 말고 병원으로 가야 한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Tams, T.R. — Handbook of Small Animal Gastroenterology. Saunders 2003",
      "한국수의내과학회 구토 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 상황에서는 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-11-12T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-603",
    slug: "dog-recall-training-guide",
    type: "blog",
    category: 5,
    title: "강아지 '이리와' 훈련 — 생명을 구하는 가장 중요한 명령어",
    subtitle: "리콜 훈련 중요성, 단계별 훈련 방법, 실패 원인, 신뢰도 높이는 법",
    metaTitle: "강아지 이리와(리콜) 훈련 — 생명 구하는 명령어 단계별 가이드 | 펫지기",
    metaDescription: "강아지 '이리와' 리콜 훈련 방법. 리콜이 중요한 이유, 단계별 훈련 방법, 실패 원인과 해결, 신뢰도 높이는 방법을 정리했습니다.",
    body: `<p>"이리와"는 강아지 훈련 중 가장 중요한 명령어다. 갑자기 차도로 뛰어나가거나, 위험한 물건을 입에 물었을 때 이 명령이 생사를 가를 수 있다.</p>

<h2>왜 "이리와"가 어려운가</h2>
<p>강아지 입장에서 불렀을 때 오면 재미있는 놀이가 끝나거나, 산책이 끝나거나, 불쾌한 일(목욕·주사)이 기다리는 경험이 쌓인다. "이리와 = 나쁜 일"이 학습되면 안 온다.</p>

<h2>리콜 훈련의 핵심 원칙</h2>
<div class="callout-dog">
<strong>리콜이 작동하는 조건</strong><br>
• 불렀을 때 오면 항상 최고의 보상 (칭찬+고가치 간식)<br>
• 절대 불러서 불쾌한 일 하지 않기 (목욕 전에 부르지 말 것)<br>
• 안 왔을 때 절대 혼내지 않기 (와서 혼나는 경험 = 안 옴)<br>
• 리콜 단어는 하나로 고정 (이리와 / 히어 / 컴 중 하나)
</div>

<h2>단계별 훈련</h2>
<ul>
<li>1단계: 실내에서 1m → 간식 보상</li>
<li>2단계: 실내에서 거리 늘리기</li>
<li>3단계: 조용한 야외 롱리드(5~10m 리드줄)</li>
<li>4단계: 자극 있는 야외 → 자극이 강할수록 더 강한 보상</li>
<li>5단계: 오프리드 연습 (안전한 펜스 내부)</li>
</ul>

<h2>신뢰도 유지</h2>
<ul>
<li>훈련 기간 중 "이리와"가 통하지 않을 때는 리드줄로 유도 (신호 약화 방지)</li>
<li>하루 3~5번 연습 (산책 중 호출 → 간식 → 다시 풀어주기)</li>
<li>실패 경험은 훈련 환경 난이도를 낮추는 신호</li>
</ul>

<h2>마지막으로</h2>
<p>리콜은 한 번 가르치면 끝이 아니다. 정기적으로 연습하고 보상을 유지해야 비상 상황에서 작동한다. 1주 3회 연습이 한 번의 집중 훈련보다 훨씬 효과적이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Reid, P.J. — Excel-Erated Learning. James & Kenneth Publishers 1996",
      "한국반려동물행동상담협회 리콜 훈련 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-12T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-604",
    slug: "pet-insurance-premium-comparison",
    type: "blog",
    category: 4,
    title: "펫보험 보험료 비교 — 같아 보이는 보험이 왜 가격이 다른가",
    subtitle: "보험료 결정 요인, 보장 범위 vs 가격 트레이드오프, 선택 기준",
    metaTitle: "펫보험 보험료 비교 — 결정 요인·보장 범위·선택 기준 가이드 | 펫지기",
    metaDescription: "펫보험 보험료가 왜 다른지 이해하는 방법. 보험료를 결정하는 요인, 보장 범위와 가격의 트레이드오프, 합리적인 보험 선택 기준을 정리했습니다.",
    body: `<p>같은 품종인데 보험료가 2배 차이가 난다. 이유를 알면 자신에게 맞는 보험을 고를 수 있다.</p>

<h2>보험료를 결정하는 요인</h2>
<ul>
<li><strong>나이</strong>: 어릴수록 저렴 (노령견은 가입 제한도 있음)</li>
<li><strong>품종</strong>: 유전 질환 위험이 높은 품종은 높은 보험료</li>
<li><strong>성별</strong>: 일부 보험사에서 암컷이 높음 (자궁 질환)</li>
<li><strong>중성화 여부</strong>: 중성화 완료 시 할인 적용 보험사도 있음</li>
<li><strong>보장 한도</strong>: 연간 보장 한도가 클수록 보험료 높음</li>
</ul>

<h2>보장 범위와 가격 트레이드오프</h2>
<div class="callout-dog">
<strong>보험 유형별 비교</strong><br>
• <strong>사고전용</strong>: 가장 저렴, 질병 미보장<br>
• <strong>질병+사고 기본</strong>: 일반적 선택, 대부분의 질환 보장<br>
• <strong>포괄적 특약</strong>: 가장 비쌈, 치과·피부·행동 등 추가<br>
▶ 보험료가 연간 예상 의료비보다 높다면 재고려
</div>

<h2>자기부담금의 역할</h2>
<ul>
<li>자기부담금 높을수록 보험료 낮음</li>
<li>주 1~2회 소액 진료가 잦다면 낮은 자기부담금이 유리</li>
<li>응급·수술 위주라면 높은 자기부담금도 무방</li>
</ul>

<h2>합리적 선택 기준</h2>
<ul>
<li>현재 강아지 품종의 흔한 질환 파악 → 해당 질환 보장 여부 우선 확인</li>
<li>연간 예상 의료비 × 3~5년 vs 총 보험료 비교</li>
<li>갱신 조건 확인: 갱신 거절 없는 보험이 장기적으로 유리</li>
</ul>

<h2>마지막으로</h2>
<p>펫보험은 예측 불가능한 의료비 리스크 관리다. 저렴한 보험료보다 필요한 순간 실제로 보장받을 수 있는 보험이 좋은 보험이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "금융감독원 펫보험 비교공시 2024",
      "한국소비자원 펫보험 선택 가이드 2023",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-13T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-605",
    slug: "cat-protein-quality-guide",
    type: "blog",
    category: 2,
    title: "고양이 사료 단백질 품질 — 함량만 보면 안 되는 이유",
    subtitle: "단백질 소화율, 아미노산 구성, 고기 vs 식물성 단백질, BV·PDCAAS 개념",
    metaTitle: "고양이 사료 단백질 품질 — 함량·소화율·아미노산 완전 가이드 | 펫지기",
    metaDescription: "고양이 사료에서 단백질 함량만 보면 안 되는 이유. 단백질 소화율, 아미노산 구성, 고기 vs 식물성 단백질 차이, 생물가(BV) 개념을 정리했습니다.",
    body: `<p>"단백질 40%!" 라고 적혀있어도 그것이 고양이에게 얼마나 유용한지는 별개 문제다. 단백질 품질을 이해해야 좋은 사료를 고를 수 있다.</p>

<h2>왜 함량만으로 부족한가</h2>
<p>단백질 함량이 높아도 소화되지 않거나, 필수 아미노산이 빠져있으면 고양이에게 쓸모가 없다. 깃털이나 발톱도 단백질이지만 고양이가 이용할 수 없다.</p>

<h2>단백질 소화율</h2>
<ul>
<li>고품질 육류 단백질: 소화율 85~95%</li>
<li>식물성 단백질(콩·완두): 소화율 60~80%</li>
<li>닭 부산물 분말: 70~85% (원료에 따라 차이)</li>
<li>소화율은 라벨에 명시되지 않음 — 원료로 추정</li>
</ul>

<h2>고양이에게 필수 아미노산</h2>
<div class="callout-cat">
<strong>고양이 필수 아미노산 (체내 합성 불가)</strong><br>
• <strong>타우린</strong>: 심장·망막 — 동물성 단백질에만 충분히 있음<br>
• <strong>아라키돈산</strong>: 염증 조절 — 고기에서 직접 섭취 필요<br>
• <strong>나이아신(비타민B3)</strong>: 전구체 합성 효율 낮음<br>
▶ 고양이는 엄격한 육식동물 — 식물성 단백질만으로는 불충분
</div>

<h2>고기 vs 식물성 단백질</h2>
<table>
<thead><tr><th>구분</th><th>소화율</th><th>아미노산 완결성</th></tr></thead>
<tbody>
<tr><td>닭고기·쇠고기·생선</td><td>높음</td><td>좋음</td></tr>
<tr><td>달걀</td><td>매우 높음</td><td>최상</td></tr>
<tr><td>완두콩·렌틸콩</td><td>낮음</td><td>타우린 없음</td></tr>
</tbody>
</table>

<h2>마지막으로</h2>
<p>좋은 고양이 사료는 첫 번째 성분이 실제 육류이고, 완두콩·렌틸콩이 주재료가 아니며, AAFCO 완전영양식 인증이 있는 것이다. 단백질 함량 숫자보다 원료 품질이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "National Research Council — Protein and Amino Acid Requirements of Cats. Nutrient Requirements 2006",
      "한국수의영양학회 고양이 단백질 영양 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-13T11:00:00.000Z",
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
  console.log("블로그 포스트 96차 시딩 완료! (blog-601 ~ blog-605)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
