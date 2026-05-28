import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

const NOW = new Date().toISOString();
const PUBLISHED_AT = "2026-05-28T09:00:00.000Z";

// YMYL 카테고리 3 — review_queue 상태로 삽입 (관리자 검수 후 발행)
// 슬러그 충돌로 patellar luxation만 포함 (나머지 9개는 seed-condition-* ID로 이미 published)
const CONDITIONS: NewContent[] = [
  {
    id: "condition-dog-patellar-luxation",
    slug: "dog-patellar-luxation",
    type: "condition",
    category: 3,
    title: "강아지 슬개골 탈구 — 증상·단계·수술 기준",
    metaTitle: "강아지 슬개골 탈구 — 증상·4단계·수술 여부 기준 | 펫지기",
    metaDescription:
      "강아지 슬개골 탈구의 4단계 분류, 증상, 내과·외과 치료 기준, 수술 후 재활, 예방 방법을 수의사 검토를 거쳐 안내합니다.",
    body: `<h2>슬개골 탈구란</h2>
<p>슬개골(무릎 앞쪽의 작은 뼈)이 정상 위치인 대퇴골 도르래 홈에서 벗어나는 상태를 슬개골 탈구(Patellar Luxation)라고 합니다. 소형견에서 매우 흔한 근골격계 질환으로, 요크셔 테리어·포메라니안·말티즈·토이 푸들·치와와에서 발생률이 높습니다.</p>
<p>선천적(유전적) 요인이 주된 원인이지만, 비만·외상이 악화 요인이 될 수 있습니다.</p>

<h2>슬개골 탈구 4단계 분류</h2>
<p>수의사들은 탈구 정도를 1~4단계로 분류합니다.</p>
<ul>
  <li><strong>1단계</strong>: 손으로 누를 때만 탈구되고 놓으면 자동 복귀. 증상이 거의 없어 보호자가 인지하지 못하는 경우 많음</li>
  <li><strong>2단계</strong>: 자연적으로 탈구가 발생하지만 대부분 자동 복귀. 간헐적인 절뚝거림·건너뛰는 보행 패턴이 나타남</li>
  <li><strong>3단계</strong>: 탈구 상태가 지속. 손으로 원위치시킬 수 있지만 다시 탈구됨. 다리를 자주 들거나 불규칙한 보행</li>
  <li><strong>4단계</strong>: 영구 탈구. 손으로도 원위치 불가. 심각한 보행 이상, 앞다리로 이동하거나 강아지처럼 뛰는 자세</li>
</ul>

<h2>증상과 조기 발견 포인트</h2>
<ul>
  <li>걸을 때 갑자기 한쪽 뒷다리를 들거나 건너뛰는 패턴</li>
  <li>계단 오르내리기를 꺼림</li>
  <li>점프 후 착지 시 비틀거림</li>
  <li>뒷다리를 과도하게 핥거나 물어뜯음</li>
  <li>활동량 감소, 앉거나 누우려 하지 않음</li>
</ul>
<p>1단계에서는 증상이 없는 경우도 많아, 연 1회 정기 검진 시 수의사의 촉진 검사가 중요합니다.</p>

<h2>진단 방법</h2>
<p>수의사가 촉진으로 슬개골 이동 여부를 확인하고 단계를 평가합니다. X-ray(방사선 검사)로 뼈 구조 이상, 관절염 동반 여부를 확인합니다.</p>

<h2>치료 기준 — 수술 여부 결정</h2>
<h3>내과적 관리 (1단계, 일부 2단계)</h3>
<ul>
  <li>체중 관리: 과체중은 관절 부담을 가중 — 정상 체중 유지가 핵심</li>
  <li>글루코사민·콘드로이틴·오메가-3: 연골 보호 및 염증 감소 보조</li>
  <li>물리치료·근력 강화 운동</li>
  <li>활동 제한 및 충격 최소화 (계단·점프 자제)</li>
</ul>
<h3>외과적 수술 (2단계 이상 권장, 증상 동반 시)</h3>
<p>수술은 탈구를 방지하기 위해 뼈 구조를 교정합니다. 주요 방법:</p>
<ul>
  <li>도르래 홈 교정(도르래 성형술): 슬개골이 안착할 홈을 깊게 만드는 방법</li>
  <li>경골 조면 이식술: 슬개골 인대 부착 위치를 교정</li>
  <li>관절낭 봉합술: 느슨해진 관절을 조여 탈구 방지</li>
</ul>
<p>수술 성공률은 90% 이상이며, 조기에 수술할수록 관절염 진행을 줄일 수 있습니다.</p>

<h2>수술 후 재활</h2>
<ul>
  <li>수술 후 4~6주: 목줄 산책 (최소 충격)</li>
  <li>물리치료·수중 트레드밀: 근력 회복에 효과적</li>
  <li>6~8주 후: 일반 생활 복귀. 점프·계단은 3개월까지 자제</li>
  <li>재발률: 5~10% — 정기 추적 검진 필요</li>
</ul>

<h2>예방 및 관리 포인트</h2>
<ul>
  <li>소형견은 연 1회 슬개골 검진을 정기 검진에 포함</li>
  <li>과체중 방지 — 체중 1kg 감량만으로도 관절 부담 4~5kg 감소 효과</li>
  <li>미끄러운 바닥(대리석·마루)에 러그·매트 깔기</li>
  <li>높은 점프(소파·침대)는 계단 설치로 대체</li>
</ul>`,
    status: "review_queue",
    ymyl: true,
    authorName: "펫지기 에디터팀",
    publishedAt: PUBLISHED_AT,
    createdAt: NOW,
    updatedAt: NOW,
  },
];

async function seed() {
  console.log(`[seed] conditions-batch-2: ${CONDITIONS.length}개 삽입 시작`);
  for (const condition of CONDITIONS) {
    await db.insert(contents).values(condition).onConflictDoUpdate({
      target: contents.id,
      set: { title: condition.title, body: condition.body, updatedAt: NOW },
    });
    console.log(`  ✓ ${condition.slug}`);
  }
  console.log("[seed] 완료");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
