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
    category: 3,
    title: "응급 동물병원 준비 — 위기 순간에 당황하지 않는 방법",
    subtitle: "24시간 응급 동물병원 미리 파악, 응급 정보 카드 만들기, 이동 중 응급처치",
    metaTitle: "응급 동물병원 사전 준비 — 위기 대응 완전 가이드 | 펫지기",
    metaDescription: "응급 상황을 대비한 동물병원 준비 방법. 24시간 응급 병원 사전 파악, 응급 정보 카드 작성, 이동 중 할 수 있는 응급처치를 정리했습니다.",
    body: `<p>응급은 예고 없이 온다. 밤 11시에 강아지가 갑자기 경련을 일으키거나, 고양이가 소변을 못 보는 상황이 생겼을 때 — 미리 준비된 사람은 다르게 행동한다.</p>

<h2>지금 당장 해야 할 준비</h2>
<h3>24시간 응급 동물병원 파악</h3>
<ul>
<li>가까운 야간·응급 진료 가능 동물병원과 대체 병원을 미리 파악</li>
<li>전화번호를 스마트폰 즐겨찾기에 저장</li>
<li>운전 경로 미리 확인 (밤에도 찾을 수 있게)</li>
<li>주치 동물병원의 야간 응급 연계 병원 확인</li>
</ul>
<p>병원 명칭만 보고 24시간 진료를 단정하지 말고, 진료 시간·대상 동물·야간 접수 방법을 공식 채널이나 전화로 확인한다.</p>

<h3>응급 정보 카드 만들기</h3>
<div class="callout-dog">
<strong>응급 정보 카드 내용</strong><br>
• 반려동물 이름·종·나이·체중<br>
• 현재 복용 중인 약 (이름·용량)<br>
• 기저 질환·알레르기<br>
• 혈액형 (확인된 경우)<br>
• 주치 수의사 연락처<br>
• 응급 진료 가능 병원과 대체 병원 연락처<br>
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
<li>짧은 시간에 구토·설사가 반복되거나 피가 보임 → 신속히 동물병원에 연락</li>
<li>소변을 보려고 반복해서 시도하지만 나오지 않음 → 응급 진료 문의</li>
<li>발작이 시작됨 → 주변을 안전하게 치우고 시간을 잰 뒤, 안전해지는 즉시 수의사에게 연락</li>
<li>의식 저하·쓰러짐·호흡 곤란 → 가까운 응급 동물병원으로 이동</li>
<li>독성 물질 섭취 의심 → 제품 용기와 섭취 정보를 확보하고 즉시 수의사에게 연락. 지시 없이 구토를 유도하거나 약을 주지 않음</li>
</ul>

<h2>마지막으로</h2>
<p>응급 준비는 평소에 해둘 수 있다. 야간 접수 방법과 이동 경로는 바뀔 수 있으므로 정기적으로 다시 확인한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 정보 편집팀",
    ymyl: true,
    sources: JSON.stringify([
      "American Animal Hospital Association — Help! Is This a Pet Emergency? (2024-09-05) https://www.aaha.org/resources/help-is-this-a-pet-emergency/",
      "American Veterinary Medical Association — Pet First Aid (2025) https://ebusiness.avma.org/files/ProductDownloads/mcm-client-brochures-pet-first-aid-2025.pdf",
    ]),
    disclaimer: "이 글은 일반적인 준비 정보이며 수의학적 진단·처치를 대체하지 않습니다. 응급 징후가 있거나 판단이 어렵다면 즉시 가까운 동물병원에 연락하고 수의사의 지시를 따르세요.",
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
    body: `<p>노령견의 뒷다리가 서서히 약해지고 발을 끌며 걷고, 시간이 지날수록 심해진다면 퇴행성 척수병증(Degenerative Myelopathy, DM)을 포함해 여러 신경 질환을 생각해 볼 수 있다. DM은 척수가 서서히 퇴화하는 진행성 질환으로, 완치법은 없다.</p>

<h2>DM의 특징</h2>
<ul>
<li>뒷다리에서 시작해 균형 잡기와 협응이 점점 어려워진다.</li>
<li>초기에는 뒷발등을 끌거나 누웠다 일어나기 힘들어하는 모습이 관절염과 비슷해 놓치기 쉽다.</li>
<li>진행하면 뒷다리로 서지 못하고, 이후 앞다리에도 영향을 줄 수 있다.</li>
<li>SOD1 유전자 변이가 가장 잘 알려진 위험 요인이다. 이 변이는 열성으로 유전되며, 변이가 있다고 모두 발병하는 것은 아니다.</li>
</ul>

<h2>비슷한 병과 구분하기</h2>
<table>
<thead><tr><th>구분</th><th>DM</th><th>디스크 등 척수 압박 질환</th></tr></thead>
<tbody>
<tr><td>시작</td><td>대체로 서서히 진행</td><td>갑자기 악화되기도 한다</td></tr>
<tr><td>통증</td><td>뚜렷하지 않은 경우가 많다</td><td>통증을 보이는 경우가 많다</td></tr>
<tr><td>치료</td><td>원인 치료법 없음. 재활·보조 중심</td><td>진단에 따라 약물이나 수술이 도움이 될 수 있다</td></tr>
</tbody>
</table>
<p>DM에는 단일 확정 검사가 없다. 임상 증상과 신경학적 검사, MRI 등으로 척수 압박 병변이나 염증성 질환 같은 다른 원인을 배제하고 진단하며, 유전자 검사는 보조 자료로 쓰인다. 그래서 수의사가 감별 진단을 거치는 과정이 꼭 필요하다.</p>

<div class="callout-dog">
<strong>이런 변화는 빨리 진료</strong><br>
• 갑자기 뒷다리를 못 쓰거나 심하게 아파함<br>
• 소변·대변을 가리지 못하게 됨<br>
• 호흡이 가빠지거나 삼키기 어려워 보임<br>
→ DM 외의 원인일 수 있고, 일부는 빠른 치료가 중요하다.
</div>

<h2>진행을 늦추기 위한 관리</h2>
<ul>
<li><strong>재활</strong>: 물리치료와 규칙적인 운동이 진행을 늦추는 데 도움이 될 수 있다고 보고된 연구가 있다. 소규모 연구가 많아 개체별 효과는 다를 수 있다.</li>
<li><strong>생활 환경</strong>: 미끄럼 방지 매트, 계단 대신 경사로, 체중 관리로 부담을 줄인다.</li>
<li><strong>보조기구</strong>: 뒷다리 지지대나 휠체어(카트)는 이동성을 유지하는 데 도움이 될 수 있어 재활 담당 수의사와 상담해 선택한다.</li>
<li><strong>2차 문제 관리</strong>: 욕창, 요로 감염, 근육 소실은 진행 단계에서 생길 수 있어 정기 점검이 필요하다.</li>
</ul>

<h2>마지막으로</h2>
<p>DM은 보호자에게 긴 돌봄을 요구하는 병이다. 정확한 진단을 먼저 받고, 재활과 환경 정비로 편안한 시간을 늘리는 데 초점을 맞추자. 삶의 질에 관한 결정은 수의사와 충분히 상의하는 것이 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://vcahospitals.com/know-your-pet/degenerative-myelopathy-in-dogs — VCA, Degenerative Myelopathy in Dogs",
      "https://www.merckvetmanual.com/nervous-system/congenital-and-inherited-anomalies-of-the-nervous-system-in-small-animals/congenital-and-inherited-spinal-cord-disorders-in-dogs-and-cats — Merck Veterinary Manual, Congenital and Inherited Spinal Cord Disorders in Dogs and Cats",
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10374290/ — Intensive neurorehabilitation and allogeneic stem cells transplantation in canine degenerative myelopathy",
    ],
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
