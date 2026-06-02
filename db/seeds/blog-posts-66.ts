import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 66 — cat2×2 + cat4×1 + cat3×1 + cat6×1 = 5편 (IDs 451-455)
// Macros: A, F, B, E, F
// Angles: RA2, RA5, RA7, RA3, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-451",
    slug: "dog-safe-fruit-guide",
    type: "blog",
    category: 2,
    title: "강아지에게 줄 수 있는 과일 완전 가이드 — 안전과 독성 기준",
    subtitle: "사과·블루베리·수박 vs 포도·아보카도·체리 비교, 급여량 기준, 씨 위험성",
    metaTitle: "강아지 과일 급여 가이드 — 안전한 과일 vs 독성 과일 | 펫지기",
    metaDescription: "강아지에게 줄 수 있는 과일과 피해야 할 과일. 사과·블루베리·수박 급여 방법, 포도·아보카도·체리 독성 이유, 씨 위험성을 정리했습니다.",
    body: `<p>과일은 달콤하고 영양도 있지만, 강아지에게 독성이 있는 종류도 많다. 어떤 것을 줄 수 있고, 어떻게 줘야 하는지 정확히 알아야 한다.</p>

<h2>안전한 과일</h2>
<ul>
<li><strong>사과</strong>: 씨(청산가리 성분)와 심(코어) 제거 필수. 껍질째 줘도 됨.</li>
<li><strong>블루베리</strong>: 항산화 좋은 간식. 소량 급여.</li>
<li><strong>수박</strong>: 씨와 껍질 제거. 수분 보충 좋음.</li>
<li><strong>딸기</strong>: 비타민C 풍부. 꼭지 제거.</li>
<li><strong>바나나</strong>: 칼로리 높으므로 소량만.</li>
<li><strong>복숭아(씨 제거)</strong>: 씨에 청산가리 성분. 반드시 제거.</li>
</ul>

<h2>독성·위험 과일</h2>
<div class="callout-dog">
<strong>절대 금지 과일</strong><br>
• <strong>포도·건포도</strong>: 소량도 신장 부전 유발 가능<br>
• <strong>아보카도</strong>: 퍼신 성분 독성<br>
• <strong>체리</strong>: 씨·잎·줄기에 청산가리 성분<br>
• <strong>무화과</strong>: 피부·소화기 자극<br>
• <strong>레몬·라임·자몽</strong>: 시트릭산·에센셜 오일 독성
</div>

<h2>씨 위험성</h2>
<p>사과·복숭아·체리 씨에는 아미그달린(amygdalin)이 있어 소화 시 청산가리로 분해된다. 과일은 항상 씨를 제거하고 급여한다.</p>

<h2>급여량 기준</h2>
<ul>
<li>과일은 하루 총 칼로리의 10% 이내</li>
<li>처음 주는 과일은 소량씩 시작 (알레르기 반응 확인)</li>
<li>당분이 높은 과일(바나나·포도 대체 안전 과일)은 특히 소량으로</li>
<li>당뇨견은 당분 높은 과일 제한</li>
</ul>

<h2>마지막으로</h2>
<p>과일은 영양 보충보다 기호성 간식으로 활용하는 것이 적절하다. 안전한 것만, 씨 제거 후, 소량으로 — 이 세 가지를 지키면 즐거운 간식 시간이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA Animal Poison Control — Fruits Safe and Toxic for Dogs",
      "한국수의영양학회 자연 식품 급여 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-28T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-452",
    slug: "cat-tuna-addiction-risks",
    type: "blog",
    category: 2,
    title: "고양이 참치 중독 — 매일 참치를 먹이면 안 되는 이유",
    subtitle: "참치 중독 증상(황색 지방증), 비타민E 결핍, 수은 축적 위험, 안전한 급여 기준",
    metaTitle: "고양이 참치 중독·황색 지방증 — 위험과 안전 급여 가이드 | 펫지기",
    metaDescription: "고양이 참치를 매일 먹이면 황색 지방증이 생길 수 있습니다. 참치 중독 증상, 비타민E 결핍, 수은 축적 위험, 안전한 급여 기준을 정리했습니다.",
    body: `<p>고양이가 참치를 좋아하는 것은 잘 알려진 사실이다. 그러나 참치를 주식으로 매일 먹이면 심각한 건강 문제가 생길 수 있다.</p>

<h2>황색 지방증(Steatitis)</h2>
<p>참치를 과다 급여 시 발생하는 대표적인 질환이다. 참치에는 불포화지방산(DHA)이 많은데, 이것이 산화되면서 체지방이 노란색으로 변하고 염증이 생긴다. 증상: 지방 부위(특히 배)를 만지면 통증, 무기력, 발열, 식욕 감소.</p>

<h2>비타민E 결핍</h2>
<p>황색 지방증의 기전은 비타민E 결핍이다. 불포화지방산 산화를 막으려면 비타민E가 필요한데, 참치 위주 식이에서는 비타민E가 부족해진다. AAFCO 완전영양식 사료가 아닌 참치 캔만 먹이면 이 문제가 생긴다.</p>

<h2>수은 축적</h2>
<p>큰 생선(참다랑어·황다랑어)은 먹이사슬 상위에서 수은이 축적된다. 장기 섭취 시 신경계 독성 가능성이 있다. 고양이에서 수은 중독 증상: 신경 이상·떨림·조정 장애.</p>

<div class="callout-cat">
<strong>참치 안전 급여 기준</strong><br>
• 주 1~2회, 소량 간식으로만<br>
• AAFCO 완전영양식 사료가 주식<br>
• 무염·조미 없는 참치 캔 (단, 비타민E 무첨가라면 소량)<br>
• 키튼이나 임신묘에게는 피하기 권장
</div>

<h2>마지막으로</h2>
<p>참치는 간식으로는 괜찮다. 그러나 주식이 되어서는 안 된다. 고양이가 참치만 먹으려 하는 상황은 이미 중독 상태일 수 있다 — 점진적으로 완전영양식으로 전환하는 것이 필요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Norsworthy, G.D. — Steatitis (Yellow Fat Disease) in Cats. The Feline Patient 2011",
      "한국고양이수의사회 영양 관련 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-29T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-453",
    slug: "pet-emergency-vet-preparation",
    type: "blog",
    category: 4,
    title: "응급 동물병원 준비 — 위기 순간에 당황하지 않는 방법",
    subtitle: "24시간 응급 동물병원 미리 파악, 응급 정보 카드 만들기, 이동 중 응급처치",
    metaTitle: "응급 동물병원 사전 준비 — 위기 대응 완전 가이드 | 펫지기",
    metaDescription: "응급 상황을 대비한 동물병원 준비 방법. 24시간 응급 병원 사전 파악, 응급 정보 카드 작성, 이동 중 할 수 있는 응급처치를 정리했습니다.",
    body: `<p>응급은 예고 없이 온다. 밤 11시에 강아지가 갑자기 경련을 일으키거나, 고양이가 소변을 못 보는 상황이 생겼을 때 — 미리 준비된 사람은 다르게 행동한다.</p>

<h2>지금 당장 해야 할 준비</h2>
<h3>24시간 응급 동물병원 파악</h3>
<ul>
<li>집에서 30분 이내 24시간 응급 동물병원 최소 2곳 파악</li>
<li>전화번호를 스마트폰 즐겨찾기에 저장</li>
<li>운전 경로 미리 확인 (밤에도 찾을 수 있게)</li>
<li>주치 동물병원의 야간 응급 연계 병원 확인</li>
</ul>

<h3>응급 정보 카드 만들기</h3>
<div class="callout-dog">
<strong>응급 정보 카드 내용</strong><br>
• 반려동물 이름·종·나이·체중<br>
• 현재 복용 중인 약 (이름·용량)<br>
• 기저 질환·알레르기<br>
• 혈액형 (확인된 경우)<br>
• 주치 수의사 연락처<br>
• 24시간 응급 병원 2곳 연락처<br>
• 보호자 긴급 연락처
</div>

<h2>응급 이동 중 할 것</h2>
<ul>
<li>안전하게 이동장·담요에 감싸 움직임 최소화</li>
<li>이동 중 동물병원에 전화 → 상황 설명 → 도착 전 준비 요청</li>
<li>운전 중 강아지를 혼자 조수석에 두지 않기 (사고 위험)</li>
<li>호흡·의식 상태 2인 이동 시 동승자가 모니터링</li>
</ul>

<h2>응급 상황별 즉시 연락 기준</h2>
<ul>
<li>구토·설사에 피 → 즉시 병원</li>
<li>소변·배변을 전혀 못 함 → 즉시 병원</li>
<li>발작이 5분 이상 지속 → 즉시 병원</li>
<li>의식 저하·쓰러짐 → 즉시 병원</li>
<li>독성 물질 섭취 → 동물 중독 상담 후 즉시 병원</li>
</ul>

<h2>마지막으로</h2>
<p>응급 준비는 지금 당장 할 수 있다. 오늘 밤 24시간 응급 동물병원 번호를 저장해두는 것 하나가 훗날 큰 차이를 만든다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "American Animal Hospital Association — Pet Emergency Preparedness",
      "한국수의사회 응급 동물의료 안내",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 상황에서는 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-08-29T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-454",
    slug: "dog-degenerative-myelopathy-guide",
    type: "blog",
    category: 3,
    title: "강아지 척수 변성증(DM) — 뒷다리 약해지는 노령견의 신경 질환",
    subtitle: "DM과 디스크 차이, 단계별 진행, 재활 치료로 삶의 질 유지, 반려차 활용",
    metaTitle: "강아지 척수 변성증(DM) — 증상·진행·재활 관리 가이드 | 펫지기",
    metaDescription: "강아지 척수 변성증(DM) 뒷다리 약해지는 진행성 신경 질환. DM과 디스크 차이, 단계별 진행, 재활 치료, 반려차(카트) 활용을 정리했습니다.",
    body: `<p>노령견의 뒷다리가 점점 약해지고, 발을 끌며 걷고, 시간이 지나면서 더 심해진다면 척수 변성증(Degenerative Myelopathy, DM)일 수 있다.</p>

<h2>DM이란</h2>
<p>척수의 신경 섬유(백질)가 점진적으로 퇴화하는 진행성 신경 질환이다. 완치가 없으며 시간이 지나면서 악화된다. 독일 셰퍼드에서 가장 흔하지만 다른 품종에서도 발생한다.</p>

<h2>DM vs 디스크(추간판탈출증) 구분</h2>
<table>
<thead><tr><th>항목</th><th>DM</th><th>디스크</th></tr></thead>
<tbody>
<tr><td>발생</td><td>서서히 (수개월)</td><td>갑자기 (수 시간~일)</td></tr>
<tr><td>통증</td><td>없음 (자각 없음)</td><td>극심한 통증</td></tr>
<tr><td>수술 효과</td><td>없음</td><td>조기 수술 효과 있음</td></tr>
<tr><td>진단</td><td>유전자 검사+MRI로 배제 진단</td><td>MRI로 확진</td></tr>
</tbody>
</table>

<h2>단계별 진행</h2>
<ul>
<li><strong>초기</strong>: 발을 끌며 걷기, 계단 어려움</li>
<li><strong>중기</strong>: 뒷다리 마비, 배변·배뇨 조절 어려움</li>
<li><strong>말기</strong>: 완전 하반신 마비, 앞다리로 진행</li>
</ul>

<h2>재활 치료로 진행 늦추기</h2>
<p>완치는 없지만 재활로 진행 속도를 늦출 수 있다는 연구가 있다. 수중 트레드밀·물리치료·근육 유지 운동이 효과적이다.</p>

<h2>반려차(카트) 활용</h2>
<p>뒷다리를 사용하지 못하게 되면 반려 휠체어(카트)로 이동성을 유지할 수 있다. 이동성이 유지되면 삶의 질과 수명에 긍정적인 영향을 준다.</p>

<h2>마지막으로</h2>
<p>DM은 보호자에게 긴 여정이다. 통증이 없다는 점이 위안이 된다. 이동성과 삶의 질을 최대한 유지하는 것이 목표다. 재활 전문 수의사와 상담하면 훨씬 나은 관리 방법을 찾을 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Coates, J.R. & Wininger, F.A. — Canine Degenerative Myelopathy. Vet Clin North Am 2010",
      "한국수의신경학회 척수 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-30T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-455",
    slug: "remaining-pet-grief-behavior",
    type: "blog",
    category: 6,
    title: "남겨진 반려동물도 슬퍼한다 — 동반 동물의 애도 행동 이해하기",
    subtitle: "함께 살던 동물이 죽었을 때 남겨진 개·고양이 행동 변화, 도와주는 방법",
    metaTitle: "남겨진 반려동물의 슬픔 — 동반 동물 애도 행동 가이드 | 펫지기",
    metaDescription: "함께 살던 반려동물이 죽었을 때 남겨진 개·고양이의 행동 변화. 식욕 감소·수색 행동·무기력 의미와 도와주는 방법을 정리했습니다.",
    body: `<p>함께 살던 개가 떠났다. 남겨진 고양이가 이틀째 밥을 안 먹고, 평소 함께 자던 자리를 맴돈다. 이것이 슬픔일까?</p>

<h2>동물도 동반자 상실을 느끼는가</h2>
<p>과학적으로 동물이 '슬픔'을 인간과 같은 방식으로 경험하는지는 확인하기 어렵다. 그러나 동반 동물이 죽은 후 남겨진 동물에서 행동 변화가 관찰되는 것은 많은 연구와 보호자 보고에서 공통적이다.</p>

<h2>남겨진 동물에서 관찰되는 행동</h2>
<ul>
<li>식욕 감소·음수량 감소</li>
<li>무기력, 평소보다 많이 자기</li>
<li>함께 자던 장소·물건을 계속 확인하는 수색 행동</li>
<li>보호자에게 더 달라붙거나 반대로 더 회피</li>
<li>평소와 다른 발성 (울음·신음)</li>
</ul>

<h2>얼마나 지속되나</h2>
<p>대부분 2~8주 내에 서서히 회복된다. 동물의 종·개체별 유대 강도·함께한 시간에 따라 다르다. 일부 개체는 더 오래 영향을 받기도 한다.</p>

<h2>도와주는 방법</h2>
<div class="callout-cat">
<strong>남겨진 동물 지원 방법</strong><br>
• 루틴 유지 (식사·산책·놀이 시간 동일하게)<br>
• 1:1 놀이 시간 늘리기<br>
• 강압 없이 자연스럽게 위로<br>
• 2주 이상 식욕이 없으면 수의사 확인<br>
• 새 동반 동물 도입은 충분한 시간 후에 신중히
</div>

<h2>마지막으로</h2>
<p>남겨진 동물도 변화를 경험하고 있다. 보호자 자신도 슬픔에 빠져있는 힘든 시간에 남겨진 동물을 돌봐야 하는 것은 쉽지 않다. 그러나 그 동물의 달라진 행동을 이해하고, 루틴을 유지해주는 것만으로도 큰 도움이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA — Helping Your Pet Grieve",
      "Regent, C. et al. — Cat Grief after Loss of Animal Companion. Journal of Feline Medicine 2022",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-30T11:00:00.000Z",
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
  console.log("블로그 포스트 66차 시딩 완료! (blog-451 ~ blog-455)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
