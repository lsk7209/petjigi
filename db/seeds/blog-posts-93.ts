import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 93 — cat3×2 + cat1×1 + cat5×1 + cat2×1 = 5편 (IDs 586-590)
// Macros: D, A, B, F, G
// Angles: RA2, RA7, RA5, RA4, RA5

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-586",
    slug: "dog-bee-sting-allergic-reaction",
    type: "blog",
    category: 3,
    title: "강아지 벌 쏘임과 알레르기 반응 — 응급 대처 가이드",
    subtitle: "경증 반응 vs 아나필락시스 구분, 집에서 할 수 있는 처치, 즉시 병원 기준",
    metaTitle: "강아지 벌 쏘임 응급 대처 — 경증·아나필락시스 구분 가이드 | 펫지기",
    metaDescription: "강아지가 벌에 쏘였을 때 응급 대처 방법. 경증 반응과 아나필락시스 구분, 집에서 할 수 있는 처치, 즉시 동물병원에 가야 하는 기준을 정리했습니다.",
    body: `<p>산책 중 강아지가 벌에 쏘이는 사고가 생각보다 자주 일어난다. 대부분 경미하게 끝나지만, 일부 강아지에서 생명을 위협하는 아나필락시스가 발생할 수 있다.</p>

<h2>쏘인 직후 확인할 것</h2>
<ul>
<li>벌침이 남아있다면 신용카드 등으로 긁어서 제거 (집지 않기 — 독 쥐어짜짐)</li>
<li>쏘인 부위 냉찜질로 부종·통증 완화</li>
<li>반응 수준 관찰 시작</li>
</ul>

<h2>경증 반응 vs 아나필락시스 구분</h2>
<table>
<thead><tr><th>구분</th><th>증상</th><th>대처</th></tr></thead>
<tbody>
<tr><td>경증</td><td>쏘인 부위 부종·통증·가려움</td><td>냉찜질·경과 관찰</td></tr>
<tr><td>중증(아나필락시스)</td><td>전신 두드러기·구토·호흡 곤란·쇼크</td><td>즉시 응급 병원</td></tr>
</tbody>
</table>

<h2>아나필락시스 신호 (즉시 병원)</h2>
<div class="callout-dog">
<strong>즉시 응급 병원 신호</strong><br>
• 안면 부위가 심하게 부어오름<br>
• 숨소리 이상·호흡 곤란<br>
• 구토·설사 동반<br>
• 잇몸이 창백하거나 파랗게 변함<br>
• 쇼크(비틀거림·의식 저하)<br>
▶ 발생 후 15~30분 내 급격히 악화 가능
</div>

<h2>다음 벌 쏘임 대비</h2>
<ul>
<li>과거 심한 반응이 있었다면 수의사 처방 에피네프린 준비 상담</li>
<li>산책 시 꽃이 많은 곳·벌집 근처 주의</li>
<li>강아지 입 주변 쏘임 특히 주의 (기도 부종 위험)</li>
</ul>

<h2>마지막으로</h2>
<p>벌 쏘임 직후 10~20분이 가장 중요하다. 경증이면 냉찜질로 충분하지만, 전신 반응이 나타나면 그 즉시 이동하는 것이 생명을 구한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국수의응급의학회 아나필락시스 임상 가이드라인",
      "Fitzgerald, K.T. & Flood, A.A. — Hymenoptera stings. Clin Tech Small Anim Pract 2006",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 상황에서는 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-11-04T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-587",
    slug: "cat-panleukopenia-prevention",
    type: "blog",
    category: 3,
    title: "고양이 범백혈구 감소증(범백) — 치명률 높은 바이러스, 예방이 전부",
    subtitle: "범백 원인 바이러스, 감염 경로, 증상, 치사율, 예방 접종의 중요성",
    metaTitle: "고양이 범백혈구 감소증 — 감염 경로·증상·치사율·예방 접종 | 펫지기",
    metaDescription: "고양이 범백혈구 감소증(범백)의 위험성과 예방 방법. 파보바이러스 감염 경로, 빠른 증상 진행, 치사율, 예방 접종이 가장 중요한 이유를 정리했습니다.",
    body: `<p>범백혈구 감소증(범백)은 치료를 해도 어린 고양이에서 50~90%의 치사율을 보이는 치명적인 질환이다. 그러나 백신 하나로 완전히 예방할 수 있다.</p>

<h2>원인과 감염 경로</h2>
<p>고양이 파보바이러스(FPV)가 원인이다. 감염된 고양이의 분변·소변·분비물을 통해 전파된다. 이 바이러스는 환경에서 수개월~1년 이상 생존 가능하다. 실내 고양이도 보호자의 신발·옷에 묻어 들어올 수 있다.</p>

<h2>증상</h2>
<ul>
<li>고열, 식욕 완전 소실</li>
<li>심한 구토·혈변</li>
<li>극도의 무기력 (머리를 들지 못하는 수준)</li>
<li>탈수 급격히 진행</li>
<li>빠른 악화 — 증상 발현 후 48~72시간 내 사망 가능</li>
</ul>

<h2>치사율이 높은 이유</h2>
<div class="callout-cat">
<strong>범백 치사율</strong><br>
• 키튼(6개월 미만): 미치료 시 90% 이상<br>
• 성묘: 25~60%<br>
• 집중 치료(입원 수액 등): 치사율 낮추나 완치 보장 없음<br>
• 특이적 항바이러스제 없음 — 증상 치료만 가능
</div>

<h2>예방 접종이 가장 중요한 이유</h2>
<p>FVRCP 복합백신에 범백 예방이 포함된다. 기초 접종 3회 + 1년 부스터 후 3년마다 추가 접종으로 거의 완전한 예방이 가능하다. 치료보다 접종이 압도적으로 효과적이고 저렴하다.</p>

<h2>마지막으로</h2>
<p>범백은 예방할 수 있는 질환이다. 입양 즉시 예방접종 스케줄을 확인하고, 미접종이라면 즉시 접종하는 것이 가장 중요한 보호자의 의무다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Truyen, U. — Feline panleukopenia virus: its unusual properties and their impact on its evolution and epidemiology. Vet Microbiol 2006",
      "한국고양이수의사회 감염병 예방 접종 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-04T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-588",
    slug: "spay-neuter-timing-guide",
    type: "blog",
    category: 1,
    title: "중성화 수술 최적 시기 — 언제 해야 가장 좋은가",
    subtitle: "품종별 최적 시기, 너무 이른 중성화의 위험, 발정 후 수술 문제, 수컷 vs 암컷",
    metaTitle: "중성화 수술 최적 시기 — 품종·성별별 권장 시기 가이드 | 펫지기",
    metaDescription: "강아지·고양이 중성화 수술 최적 시기를 정리했습니다. 품종별 권장 시기, 너무 이른 중성화의 위험성, 발정 중 수술 문제, 수컷·암컷 차이를 알아보세요.",
    body: `<p>"6개월에 중성화 하라"는 말이 모든 강아지에게 맞는 것은 아니다. 품종과 성별에 따라 최적 시기가 다를 수 있다.</p>

<h2>일반 권장 기준</h2>
<ul>
<li>소형견·고양이: 5~6개월 (첫 발정 전)</li>
<li>중형견: 6~9개월</li>
<li>대형견: 12~18개월 (성장 완료 후 권장)</li>
<li>대형견 암컷: 첫 발정 후 1~2회 후 권장하는 수의사도 있음</li>
</ul>

<h2>너무 이른 중성화의 위험 (대형견)</h2>
<div class="callout-dog">
<strong>조기 중성화 대형견 위험</strong><br>
• 골격 성장 지연 — 성호르몬이 골격판 닫힘에 관여<br>
• 관절 질환 위험 약간 증가 (래브라도·골든 연구)<br>
• 일부 암 발생률 변화 연구 있음<br>
▶ 소형견·고양이: 조기 중성화 위험 상대적으로 낮음
</div>

<h2>발정 중 수술의 문제</h2>
<ul>
<li>자궁·난소 혈액 공급 증가 → 출혈 위험 높음</li>
<li>발정 끝난 후 최소 1개월 이후 권장</li>
<li>자궁축농증 발생 후 수술은 응급으로 위험도 높음</li>
</ul>

<h2>수컷 특이사항</h2>
<ul>
<li>수컷은 암컷보다 시기 유연성 높음</li>
<li>마킹·탈출 행동이 시작되기 전이 좋음 (보통 8~12개월 전)</li>
<li>잠복 고환이 있다면 조기 수술 권장</li>
</ul>

<h2>마지막으로</h2>
<p>중성화 시기는 개별 강아지의 품종·체중·건강 상태에 따라 수의사와 상담해 결정하는 것이 가장 좋다. 일률적인 "6개월 규칙"보다 맞춤 판단이 필요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Hart, B.L. et al. — Long-term health effects of neutering dogs. PLOS ONE 2014",
      "한국수의학회 중성화 수술 시기 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-05T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-589",
    slug: "dog-crate-training-guide",
    type: "blog",
    category: 5,
    title: "강아지 크레이트 훈련 — 감옥이 아닌 안식처로 만드는 방법",
    subtitle: "크레이트 훈련의 목적, 단계별 방법, 크기 선택, 금지 행동",
    metaTitle: "강아지 크레이트 훈련 — 안식처 만들기 단계별 가이드 | 펫지기",
    metaDescription: "강아지 크레이트 훈련을 올바르게 하는 방법. 크레이트가 안식처가 되는 이유, 단계별 훈련 방법, 크기 선택 기준, 절대 하지 말아야 할 행동을 정리했습니다.",
    body: `<p>크레이트 훈련은 감옥이 아니다. 잘 훈련된 강아지에게 크레이트는 자신만의 안전한 공간이다. 수술 회복·이동·응급 시 크레이트에 익숙한 강아지는 훨씬 스트레스를 덜 받는다.</p>

<h2>크레이트 훈련의 목적</h2>
<ul>
<li>배변 훈련 보조 (강아지는 잠자는 곳을 오염시키지 않으려 함)</li>
<li>수술·입원 시 적응</li>
<li>차량 이동 안전</li>
<li>분리불안 관리</li>
<li>강아지만의 안전한 공간 확보</li>
</ul>

<h2>크기 선택</h2>
<p>서고, 돌고, 누울 수 있는 크기. 너무 크면 한쪽에서 배변하고 다른 쪽에서 자는 행동이 생긴다. 성견 크기의 크레이트를 미리 구입했다면 파티션으로 공간을 줄이는 방법이 있다.</p>

<h2>단계별 훈련</h2>
<div class="callout-dog">
<strong>크레이트 훈련 단계 (1~2주)</strong><br>
1단계: 문 열어둔 채 간식 넣어두기 → 자유롭게 탐색<br>
2단계: 크레이트 안에서 밥 주기<br>
3단계: 들어가 있는 동안 문 잠시 닫기 → 간식<br>
4단계: 5분 → 15분 → 1시간 점진적 시간 연장<br>
5단계: 자연스럽게 들어가 자는 단계
</div>

<h2>절대 하지 말아야 할 것</h2>
<ul>
<li>처음부터 오래 가두기 — 공포 형성</li>
<li>혼낼 때 크레이트 넣기 — 부정적 연결</li>
<li>울 때 바로 꺼내주기 — 울면 나온다는 학습</li>
<li>하루 8시간 이상 장시간 가두기</li>
</ul>

<h2>마지막으로</h2>
<p>크레이트 훈련은 며칠이 아닌 1~2주가 필요하다. 서두르지 않고, 긍정적인 연결을 만들어가면 강아지 스스로 크레이트를 선택하는 날이 온다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Yin, S. — Perfect Puppy in 7 Days. CattleDog Publishing 2011",
      "한국반려동물행동상담협회 크레이트 훈련 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-05T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-590",
    slug: "dog-raw-bones-safety",
    type: "blog",
    category: 2,
    title: "강아지 뼈다귀 급여 — 안전한 것과 생명을 위협하는 것",
    subtitle: "날뼈 vs 익힌 뼈 차이, 안전한 뼈 종류, 질식·장폐색 위험, 급여 감독의 중요성",
    metaTitle: "강아지 뼈다귀 급여 안전 가이드 — 안전한 뼈·위험한 뼈 구분 | 펫지기",
    metaDescription: "강아지 뼈다귀 급여의 안전한 방법과 위험. 날뼈와 익힌 뼈의 차이, 안전한 종류, 질식·장폐색 위험 신호, 급여 감독 방법을 정리했습니다.",
    body: `<p>강아지에게 뼈를 줘도 될까? 답은 "종류와 방법에 따라"다. 잘못된 뼈는 생명을 위협하는 응급을 만든다.</p>

<h2>가장 중요한 원칙: 익힌 뼈는 절대 금지</h2>
<p>익힌 뼈는 종방향으로 갈라지면서 날카로운 파편이 된다. 구강·식도·위장 천공의 원인이 된다. 삼겹살 갈비뼈, 치킨 뼈, 돼지 족발 뼈 — 모두 위험하다.</p>

<h2>날뼈의 상대적 안전성</h2>
<div class="callout-dog">
<strong>날뼈 안전 종류</strong><br>
• 닭목뼈 (소형견·중형견 적합)<br>
• 닭등뼈<br>
• 소 연골뼈 (크기 적합 시)<br>
• 소 너클본 (단단해 치아 강화용, 대형견)<br><br>
<strong>날뼈 위험 상황</strong><br>
• 너무 작은 뼈 — 통째로 삼킬 수 있음<br>
• 오래된 뼈 — 건조되어 부서짐<br>
• 강아지 몸 크기에 비해 작은 뼈
</div>

<h2>급여 시 위험 신호</h2>
<ul>
<li>질식: 발로 목 긁기·입 벌리기·숨소리 이상 → 즉시 응급</li>
<li>장폐색: 수일 후 구토·식욕 감소·배변 없음 → 즉시 병원</li>
<li>치아 파절: 단단한 뼈 씹다 치아 부러짐 → 치아 확인</li>
</ul>

<h2>안전 급여 수칙</h2>
<ul>
<li>항상 보호자 감독 하에 급여</li>
<li>혼자 두지 않기</li>
<li>30분 이상 된 뼈는 회수 (세균 증식)</li>
<li>다른 강아지 있으면 분리 급여 (자원 경쟁)</li>
</ul>

<h2>마지막으로</h2>
<p>뼈다귀는 치아 건강·정신 자극에 도움이 될 수 있지만, 항상 감독이 전제다. "잠깐 나갔다 올게"가 응급이 되는 경우가 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "FDA — Raw Bones and Food Safety for Pets 2020",
      "한국수의응급의학회 소화기 이물 임상 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-06T09:00:00.000Z",
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
  console.log("블로그 포스트 93차 시딩 완료! (blog-586 ~ blog-590)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
