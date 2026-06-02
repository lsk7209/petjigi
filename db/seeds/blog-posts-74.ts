import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 74 — cat3×2 + cat5×1 + cat2×1 + cat4×1 = 5편 (IDs 491-495)
// Macros: D, A, B, F, G
// Angles: RA3, RA2, RA7, RA5, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-491",
    slug: "dog-patella-surgery-recovery",
    type: "blog",
    category: 3,
    title: "강아지 슬개골 수술 후 회복 — 보호자가 해야 할 것, 피해야 할 것",
    subtitle: "수술 후 2~8주 회복 단계, 활동 제한, 재활 운동, 재발 예방 체중 관리",
    metaTitle: "강아지 슬개골 수술 후 회복 — 단계별 관리 완전 가이드 | 펫지기",
    metaDescription: "강아지 슬개골 수술 후 보호자가 해야 할 것과 피해야 할 것. 2~8주 회복 단계, 활동 제한 기준, 재활 운동, 재발 예방 방법을 정리했습니다.",
    body: `<p>슬개골 수술이 끝났다고 끝이 아니다. 수술 후 회복 관리가 수술만큼 중요하다. 회복 기간 중 잘못된 활동이 재수술로 이어지는 경우가 있다.</p>

<h2>수술 후 회복 단계</h2>
<table>
<thead><tr><th>기간</th><th>상태</th><th>허용 활동</th></tr></thead>
<tbody>
<tr><td>1~2주</td><td>급성 통증·부종</td><td>리드줄 보행 5분 이내, 주로 휴식</td></tr>
<tr><td>2~4주</td><td>점진적 회복</td><td>리드줄 보행 10~15분, 계단 금지</td></tr>
<tr><td>4~8주</td><td>뼈 유합 중</td><td>서서히 운동량 증가, 점프 금지</td></tr>
<tr><td>8주 이후</td><td>경과 X-ray 확인 후</td><td>수의사 지시에 따라 정상 활동</td></tr>
</tbody>
</table>

<h2>절대 피해야 할 것</h2>
<div class="callout-dog">
<strong>회복 중 금지 행동</strong><br>
• 소파·침대 점프 (올라가기/내려오기 모두)<br>
• 계단 오르내리기<br>
• 미끄러운 바닥에서 달리기<br>
• 다른 개와 격렬한 놀이<br>
• 수술 부위 핥기 (엘리자베스 칼라 착용 유지)
</div>

<h2>집 환경 개선</h2>
<ul>
<li>온 집안 미끄럼 방지 매트 설치</li>
<li>소파·침대는 접근 차단 또는 경사로 설치</li>
<li>강아지 전용 낮은 침대로 교체</li>
</ul>

<h2>재활 운동</h2>
<p>수의사 허가 후 수중 트레드밀, 밸런스 디스크 운동이 근력 회복에 효과적이다. 무작정 운동보다 재활 전문 수의사의 프로그램을 따르는 것이 안전하다.</p>

<h2>재발 예방</h2>
<ul>
<li>이상 체중 유지 (과체중이면 재발 위험 높음)</li>
<li>수술 후 3·6개월 정기 X-ray 추적</li>
<li>반대쪽 다리 상태도 정기 확인 (양측 발생 가능성)</li>
</ul>

<h2>마지막으로</h2>
<p>슬개골 수술 회복은 보호자의 인내가 핵심이다. "이 정도는 괜찮겠지"의 한 번이 8주 회복을 처음으로 되돌린다. 수의사 지시를 철저히 따르는 것이 가장 빠른 회복 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국수의외과학회 슬개골 탈구 수술 후 재활 가이드라인",
      "Towle Millard, H.A. & Breur, G.J. — Surgical Treatment of Patellar Luxation. Vet Surg 2018",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-17T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-492",
    slug: "cat-hyperthyroidism-symptoms",
    type: "blog",
    category: 3,
    title: "고양이 갑상선 기능항진증 — 먹어도 살이 빠지는 노령묘의 신호",
    subtitle: "갑상선 기능항진증 증상, 진단 검사, 치료 4가지 옵션 비교, 장기 관리",
    metaTitle: "고양이 갑상선 기능항진증 — 증상·진단·치료 옵션 비교 | 펫지기",
    metaDescription: "고양이 갑상선 기능항진증 증상과 치료 옵션을 정리했습니다. 먹어도 살이 빠지는 이유, 혈액 검사 기준, 항갑상선 약물·방사성 요오드·수술·식이 치료 비교.",
    body: `<p>10세 이상 고양이에서 가장 흔한 내분비 질환이 갑상선 기능항진증이다. 잘 먹는데도 체중이 줄고 과활동성을 보인다면 이 질환을 의심해볼 수 있다.</p>

<h2>갑상선 기능항진증이란</h2>
<p>갑상선에서 티록신(T4) 호르몬이 과다 분비되는 질환이다. 대사가 과도하게 빨라져 체중이 빠지고, 심박수가 증가하며, 전신에 영향을 미친다. 원인의 대부분은 양성 갑상선 종양(선종)이다.</p>

<h2>주요 증상</h2>
<ul>
<li>먹어도 체중 감소 (다식·다음)</li>
<li>과활동성·안절부절</li>
<li>구토·설사</li>
<li>심박수 증가 (심잡음 동반)</li>
<li>털 상태 악화</li>
<li>과도한 발성 (특히 밤)</li>
</ul>

<h2>진단</h2>
<div class="callout-cat">
<strong>진단 검사</strong><br>
• 혈청 T4(총 티록신) 측정 — 가장 기본 검사<br>
• T4 정상 범위: 0.8~4.0 μg/dL<br>
• 초음파: 갑상선 크기·구조 확인<br>
• 심전도: 심장 영향 평가<br>
• 신장 기능 검사: 치료 전 신기능 파악 중요
</div>

<h2>치료 옵션 비교</h2>
<ul>
<li><strong>항갑상선 약물(메티마졸)</strong>: 가장 일반적, 평생 투약 필요, 부작용 모니터링 필요</li>
<li><strong>방사성 요오드(I-131)</strong>: 1회 치료로 완치율 높음, 국내 제한적 시행</li>
<li><strong>수술(갑상선 절제)</strong>: 완치 가능, 마취 위험 고려</li>
<li><strong>요오드 제한 식이(Hill's y/d)</strong>: 약물 대안, 다른 음식 완전 차단 필요</li>
</ul>

<h2>마지막으로</h2>
<p>치료 전 신장 기능 평가가 중요하다. 갑상선 기능항진증이 신장 기능 저하를 마스킹하는 경우가 있어, 치료 시작 후 신부전이 드러날 수 있기 때문이다. 수의사와 치료 옵션을 충분히 상담하는 것이 필요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Scott-Moncrieff, J.C. — Feline Hyperthyroidism. Consultations in Feline Internal Medicine 2010",
      "한국수의내과학회 내분비 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-18T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-493",
    slug: "dog-apartment-enrichment-ideas",
    type: "blog",
    category: 5,
    title: "아파트에서 키우는 강아지 — 하루 30분으로 행동 문제 예방하는 법",
    subtitle: "아파트 환경의 한계, 집 안 정신 자극 5가지, 소음·이웃 갈등 예방, 운동 대체 방법",
    metaTitle: "아파트 반려견 하루 루틴 — 행동 문제 예방 가이드 | 펫지기",
    metaDescription: "아파트에서 강아지를 키울 때 행동 문제를 예방하는 방법. 집 안 정신 자극 5가지, 소음·이웃 갈등 예방, 산책 대체 실내 운동을 정리했습니다.",
    body: `<p>아파트에서 강아지를 키우는 것은 가능하다. 그러나 아파트 환경이 강아지에게 줄 수 있는 자극은 단독주택보다 훨씬 적다. 이 부족함을 보호자가 의식적으로 채워줘야 한다.</p>

<h2>아파트 환경의 제약</h2>
<ul>
<li>마당 없음 → 자유로운 탐색 불가</li>
<li>운동 공간 제한</li>
<li>소음 규제 → 짖음 불가</li>
<li>층간소음 민감 → 점프·달리기 제한</li>
</ul>

<h2>집 안 정신 자극 5가지</h2>
<div class="callout-dog">
<strong>하루 30분 아파트 루틴</strong><br>
1. <strong>퍼즐 피더</strong>: 밥을 그냥 주지 않고 퍼즐로 (5~10분)<br>
2. <strong>훈련 세션</strong>: 새 기술 1개 가르치기 (5분)<br>
3. <strong>노즈워크</strong>: 집 안 간식 숨기기 (5~10분)<br>
4. <strong>터그 놀이</strong>: 리드줄로 끌기·잡기 (5분, 층간소음 주의)<br>
5. <strong>씹는 장난감</strong>: 에너지 방출용 + 치아 관리
</div>

<h2>소음·이웃 갈등 예방</h2>
<ul>
<li>짖음의 원인 파악 (분리불안·외부 자극·지루함)</li>
<li>방음 패드 설치 (크레이트·침대 주변)</li>
<li>외부 소리 자극 줄이기 (창문 블라인드)</li>
<li>이웃에게 먼저 양해 구하기 → 불필요한 분쟁 예방</li>
</ul>

<h2>산책 대체 실내 운동</h2>
<ul>
<li>계단 훈련 (개 허용 계단에서 오르내리기)</li>
<li>지하 주차장 보행 (소리 자극 다양)</li>
<li>인근 공원 낮 시간대 이용</li>
<li>도그 카페·견사 정기 이용</li>
</ul>

<h2>마지막으로</h2>
<p>아파트 강아지의 행동 문제 대부분은 지루함에서 온다. 하루 30분의 의식적인 자극이 문제 행동을 예방하는 가장 효과적인 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물행동상담협회 도시형 반려동물 관리 가이드라인",
      "Bray, E.E. et al. — Effects of Kennel Environment on Dogs. Front Vet Sci 2021",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-18T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-494",
    slug: "raw-feeding-bacteria-safety",
    type: "blog",
    category: 2,
    title: "생식(Raw Feeding) 세균 오염 위험 — 알아야 할 불편한 사실",
    subtitle: "살모넬라·리스테리아·캄필로박터 오염 현황, 사람 전파 위험, 안전 기준",
    metaTitle: "반려동물 생식 세균 오염 위험 — 안전 기준과 주의사항 | 펫지기",
    metaDescription: "반려동물 생식(Raw Feeding)의 세균 오염 위험을 정리했습니다. 살모넬라·리스테리아 오염 현황, 사람에게 전파될 위험, 생식을 선택한다면 지켜야 할 안전 기준.",
    body: `<p>생식 지지자들은 "자연에 가까운 식이"를 장점으로 내세운다. 그러나 과학적으로 확인된 생식의 세균 오염 위험은 무시하기 어렵다.</p>

<h2>연구로 확인된 오염 현황</h2>
<p>미국 FDA와 유럽 식품안전청(EFSA) 연구에서 시판 생식 제품의 상당 비율에서 살모넬라, 리스테리아, 캄필로박터가 검출됐다. 건강한 성인에게는 큰 문제가 아닐 수 있지만, 면역력이 낮은 가족 구성원에게는 심각한 위험이 된다.</p>

<h2>가정 내 전파 경로</h2>
<div class="callout-dog">
<strong>생식 급여 시 세균 전파 경로</strong><br>
• 강아지 급여 후 입을 핥을 때 (가족 특히 어린이)<br>
• 생식 보관 냉장고 → 다른 식품 교차 오염<br>
• 급여 용기·칼·도마 → 사람 식기와 혼용<br>
• 강아지 변에서 세균 지속 배출 (수주)
</div>

<h2>고위험 가정</h2>
<ul>
<li>5세 미만 영유아 있는 가정</li>
<li>임산부</li>
<li>항암치료·면역억제제 복용 중인 가족</li>
<li>고령 가족원</li>
</ul>

<h2>생식을 선택한다면 최소 안전 기준</h2>
<ul>
<li>급여 후 손을 반드시 씻기</li>
<li>생식 전용 용기·도마·칼 구분 사용</li>
<li>강아지가 얼굴을 핥지 않게 주의</li>
<li>고위험 가족이 있다면 생식보다 고열처리 사료 고려</li>
</ul>

<h2>마지막으로</h2>
<p>생식의 장점에 대한 주장은 아직 과학적으로 강하게 지지되지 않지만, 세균 오염 위험은 반복적으로 확인됐다. 선택은 보호자의 몫이지만 그 위험을 알고 선택하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "FDA — Get the Facts! Raw Pet Food Diets can be Dangerous to You and Your Pet 2021",
      "AVMA — Raw or Undercooked Animal-Source Protein in Cat and Dog Diets Policy",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-19T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-495",
    slug: "animal-registration-chip-guide",
    type: "blog",
    category: 4,
    title: "동물등록·마이크로칩 완전 가이드 — 신청부터 조회까지",
    subtitle: "등록 의무 대상, 마이크로칩 vs 외장형 비교, 신청 방법, 잃어버렸을 때 활용법",
    metaTitle: "동물등록·마이크로칩 신청 방법 — 의무 대상·절차·활용 | 펫지기",
    metaDescription: "동물등록 의무 대상과 마이크로칩 신청 방법을 정리했습니다. 마이크로칩과 외장형 비교, 신청 비용, 잃어버렸을 때 활용하는 방법을 알아보세요.",
    body: `<p>동물등록은 선택이 아닌 법적 의무다. 등록되지 않은 반려견을 키우면 과태료 대상이 된다. 그러나 마이크로칩은 반려견을 잃어버렸을 때도 결정적인 역할을 한다.</p>

<h2>등록 의무 대상</h2>
<p>동물보호법 기준: 2개월 이상 반려 목적으로 기르는 개. 고양이는 권장사항이지만 법적 의무는 아니다(2024년 기준). 미등록 시 과태료 최대 100만 원.</p>

<h2>마이크로칩 vs 외장형</h2>
<table>
<thead><tr><th>구분</th><th>마이크로칩</th><th>외장형(인식표/QR)</th></tr></thead>
<tbody>
<tr><td>영구성</td><td>영구 (탈락 없음)</td><td>분실·훼손 가능</td></tr>
<tr><td>비용</td><td>3~5만 원 (동물병원)</td><td>1~3만 원</td></tr>
<tr><td>시술</td><td>주사 삽입 필요</td><td>목에 거는 방식</td></tr>
<tr><td>신뢰도</td><td>높음 (위·변조 불가)</td><td>낮음</td></tr>
</tbody>
</table>

<h2>신청 방법</h2>
<div class="callout-dog">
<strong>마이크로칩 동물등록 절차</strong><br>
1. 동물병원 또는 동물보호센터 방문<br>
2. 마이크로칩 삽입 (어깨 뒤 피하, 주사 1~2초)<br>
3. 동물보호관리시스템(APMS) 등록<br>
4. 보호자 정보 변경 시 30일 이내 수정 의무
</div>

<h2>잃어버렸을 때 활용</h2>
<ul>
<li>보호소 입소 시 스캐너로 즉시 보호자 확인 가능</li>
<li>동물보호관리시스템(www.animal.go.kr)에서 실종 신고</li>
<li>인근 동물병원·보호소에 마이크로칩 번호 공유</li>
</ul>

<h2>마지막으로</h2>
<p>마이크로칩 삽입은 5초짜리 시술이지만, 잃어버린 반려견을 찾게 해주는 평생의 보험이다. 등록 후 주소·연락처가 바뀌면 반드시 정보를 업데이트해야 제 역할을 한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "동물보호법 제15조 (동물등록) 및 제100조 (과태료)",
      "농림축산식품부 동물보호관리시스템 이용 안내",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-19T11:00:00.000Z",
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
  console.log("블로그 포스트 74차 시딩 완료! (blog-491 ~ blog-495)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
