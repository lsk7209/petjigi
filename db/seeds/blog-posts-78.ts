import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 78 — cat3×2 + cat1×1 + cat4×1 + cat5×1 = 5편 (IDs 511-515)
// Macros: D, A, B, F, G
// Angles: RA2, RA4, RA7, RA1, RA2

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-511",
    slug: "dog-chronic-kidney-disease-guide",
    type: "blog",
    category: 3,
    title: "강아지 만성 신장병(CKD) — 단계별 관리와 수명 연장 전략",
    subtitle: "IRIS 단계 분류, 저인·저단백 식이, 수액 관리, 삶의 질 유지 방법",
    metaTitle: "강아지 만성 신장병(CKD) — IRIS 단계·식이·관리 완전 가이드 | 펫지기",
    metaDescription: "강아지 만성 신장병(CKD) IRIS 단계별 관리 전략. 저인·저단백 식이 기준, 수액 치료, 약물 관리, 집에서 할 수 있는 삶의 질 유지 방법을 정리했습니다.",
    body: `<p>만성 신장병은 한번 손상된 신장 기능이 회복되지 않는다. 그러나 관리에 따라 진행 속도를 크게 늦추고 수명을 연장할 수 있다.</p>

<h2>CKD IRIS 단계 분류</h2>
<table>
<thead><tr><th>단계</th><th>크레아티닌(mg/dL)</th><th>특징</th></tr></thead>
<tbody>
<tr><td>1단계</td><td>&lt;1.4</td><td>증상 없음, 초기 징후</td></tr>
<tr><td>2단계</td><td>1.4~2.0</td><td>경미한 증상, 다음·다뇨 시작</td></tr>
<tr><td>3단계</td><td>2.1~5.0</td><td>명확한 증상, 체중 감소</td></tr>
<tr><td>4단계</td><td>&gt;5.0</td><td>요독증, 생존 위협</td></tr>
</tbody>
</table>

<h2>식이 관리</h2>
<div class="callout-dog">
<strong>CKD 식이 핵심 원칙</strong><br>
• 인(Phosphorus) 제한: 가장 중요 — 신장 보호 효과 확인<br>
• 단백질: 적당히 제한 (완전 제거는 근육 손실 유발)<br>
• 수분: 충분히 — 습식 사료 중심<br>
• 처방식 신장 사료 (힐스 k/d, 로얄캐닌 Renal 등)<br>
• 오메가-3 보충: 신장 염증 감소 효과
</div>

<h2>집에서 할 수 있는 관리</h2>
<ul>
<li>음수량 늘리기: 흐르는 물, 치킨 브로스 소량 첨가</li>
<li>피하 수액: 일부 보호자가 수의사 교육 후 집에서 시행 가능</li>
<li>정기 혈액·소변 검사: 2~3개월마다 (단계에 따라)</li>
<li>혈압 모니터링: CKD + 고혈압 동반 흔함</li>
</ul>

<h2>마지막으로</h2>
<p>CKD 진단이 선고가 아니다. 1~2단계에서 발견하고 식이와 수액 관리를 시작하면 몇 년을 더 건강하게 함께할 수 있다. 정기 검진이 조기 발견의 유일한 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "IRIS — International Renal Interest Society CKD Staging Guidelines 2023",
      "한국수의내과학회 신장 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-27T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-512",
    slug: "cat-indoor-outdoor-transition",
    type: "blog",
    category: 1,
    title: "외출 고양이를 실내묘로 전환 — 단계별 성공 가이드",
    subtitle: "외출 제한 필요성, 전환 시 스트레스 최소화 방법, 환경 풍부화 대체 전략",
    metaTitle: "고양이 외출→실내 전환 — 스트레스 없이 바꾸는 방법 | 펫지기",
    metaDescription: "외출하던 고양이를 실내묘로 전환하는 단계별 방법. 전환이 필요한 이유, 스트레스 최소화, 실외 자극을 대체하는 환경 풍부화 전략을 정리했습니다.",
    body: `<p>외출하던 고양이에게 갑자기 "이제부터 실내에서만 살아"라고 하면 심한 스트레스가 올 수 있다. 전환에는 시간과 환경 준비가 필요하다.</p>

<h2>왜 실내 전환이 필요한가</h2>
<ul>
<li>교통사고 위험 (실외 고양이 평균 수명 5~7년, 실내묘 12~18년)</li>
<li>이사·임신·새 반려동물 도입</li>
<li>질병 관리 (FIV·FeLV 양성, 면역 억제)</li>
<li>지역 규제 (층간소음·이웃 민원)</li>
</ul>

<h2>단계별 전환 방법</h2>
<div class="callout-cat">
<strong>외출 제한 단계 (2~4주)</strong><br>
1주차: 외출 시간을 점진적으로 줄이기 (하루 2시간 → 1시간 → 30분)<br>
2주차: 외출은 보호자 동반 산책으로만 제한<br>
3주차: 발코니 또는 창문 접근으로 대체<br>
4주차: 완전 실내 전환 + 환경 풍부화 극대화
</div>

<h2>실외 자극 대체 방법</h2>
<ul>
<li>창문 버드워칭 환경 (새 피더, 창문 패드)</li>
<li>캣워크·캣타워 높이 확보</li>
<li>캣닙·캣그라스 제공</li>
<li>하루 2회 이상 적극적 놀이 시간 (낚싯대·레이저)</li>
<li>하네스 착용 베란다 또는 마당 접근 허용</li>
</ul>

<h2>마지막으로</h2>
<p>전환 중 과도한 울음·파괴 행동이 지속된다면 불안 완화제(수의사 처방 또는 DAP 페로몬)를 보조적으로 활용할 수 있다. 충분한 환경 풍부화가 실내 전환의 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Liberg, O. et al. — Density, spatial organization and reproductive tactics in the domestic cat. The Domestic Cat 2000",
      "한국고양이보호자연합 실내 전환 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-28T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-513",
    slug: "cat-ckd-diet-management",
    type: "blog",
    category: 3,
    title: "고양이 CKD 식이 관리 — 신장 처방식 거부할 때 어떻게 하나",
    subtitle: "신장 처방식 필요성, 거부 시 대안, 수제식 주의사항, 단계별 전환 전략",
    metaTitle: "고양이 CKD 식이 관리 — 처방식 거부·대안·수제식 가이드 | 펫지기",
    metaDescription: "고양이 CKD 신장 처방식 관리 방법. 처방식이 필요한 이유, 고양이가 거부할 때 대안, 수제식 주의사항, 단계별 전환 전략을 정리했습니다.",
    body: `<p>수의사에게 "신장 처방식으로 바꾸세요"라는 말을 들었는데, 고양이가 먹지 않는다. 이 상황은 많은 CKD 보호자들이 겪는 공통된 어려움이다.</p>

<h2>신장 처방식이 필요한 이유</h2>
<p>일반 사료에 비해 인과 단백질 함량이 낮고, 오메가-3·비타민 B군이 강화되어 있다. 인 제한은 CKD 진행을 늦추는 데 가장 확인된 식이 개입이다. 임상 연구에서 신장 처방식은 CKD 고양이의 생존 기간을 유의미하게 늘렸다.</p>

<h2>처방식 전환 전략 (거부하는 고양이)</h2>
<div class="callout-cat">
<strong>거부 시 단계적 전환</strong><br>
1. 기존 사료 95% + 처방식 5%로 시작 (냄새 익숙해지기)<br>
2. 매주 처방식 비율 10%씩 증가<br>
3. 처방식을 살짝 데워서 제공 (향 강화)<br>
4. 여러 브랜드 시도 (건식·습식 모두)<br>
5. 최소 2~3주 시도 후 판단
</div>

<h2>처방식을 완전히 거부할 경우</h2>
<ul>
<li>저인 일반 사료로 대체 (습식 중에서 인 함량 낮은 것)</li>
<li>인 결합제(포스포루스 바인더) 처방 요청 — 일반 사료에 섞어 인 흡수 억제</li>
<li>수의 영양사 처방 수제식 (완전 균형 제조 필요)</li>
</ul>

<h2>절대 하지 말아야 할 것</h2>
<p>고양이는 며칠만 굶어도 지방간(간 지방증)이 생길 수 있다. "처방식 안 먹으면 굶겨서라도 먹게 하자"는 시도는 생명을 위협한다. 안 먹으면 방법을 바꿔야 한다.</p>

<h2>마지막으로</h2>
<p>식이 관리는 CKD 고양이 케어의 가장 큰 도전 중 하나다. 수의사와 긴밀히 소통하며 고양이가 먹을 수 있는 최선의 대안을 찾는 것이 목표다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Ross, S.J. et al. — Clinical evaluation of dietary modification for treatment of spontaneous CKD in cats. JAVMA 2006",
      "한국수의내과학회 고양이 신장 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-28T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-514",
    slug: "pet-rental-no-pets-dispute",
    type: "blog",
    category: 4,
    title: "반려동물 금지 건물에서 키우다 걸렸을 때 — 법적 권리와 대처법",
    subtitle: "임대차 계약 반려동물 금지 조항 효력, 퇴거 요구 가능 여부, 중재 방법",
    metaTitle: "반려동물 금지 아파트·임대 분쟁 — 법적 권리와 대처법 | 펫지기",
    metaDescription: "반려동물 금지 건물에서 키우다 문제가 생겼을 때 법적 권리를 정리했습니다. 임대차 계약 반려동물 금지 조항 효력, 퇴거 요구 가능 여부, 중재 방법을 알아보세요.",
    body: `<p>"반려동물 금지"가 계약서에 있는데 키우다 임대인에게 발각됐다. 즉시 퇴거해야 할까? 법적으로 어떤 권리가 있는지 알아보자.</p>

<h2>임대차 계약 반려동물 금지 조항의 효력</h2>
<p>계약서에 "반려동물 금지" 조항이 있고 임차인이 서명했다면 원칙적으로 유효하다. 그러나 이를 근거로 즉시 계약 해지·퇴거를 강요할 수 있는지는 별개 문제다.</p>

<h2>즉시 퇴거 요구 가능한가</h2>
<div class="callout-dog">
<strong>법적 판단 기준</strong><br>
• 단순 금지 조항 위반 → 즉시 계약 해지는 어려울 수 있음<br>
• 반려동물로 인한 실제 피해(냄새·소음·손상) 발생 → 계약 해지 사유 가능성 높음<br>
• 법원은 위반의 경중과 실제 손해를 종합 판단<br>
• 1회 경고 후 시정 요구 없이 즉시 해지는 과도하다고 볼 여지 있음
</div>

<h2>현실적 대처 방법</h2>
<ul>
<li>임대인과 협상: 별도 합의서 작성 (책임 범위, 퇴거 시 원상복구 약정)</li>
<li>반려동물 피해보험 제시 (임대인 안심)</li>
<li>중재: 주택관리공단, 한국토지주택공사 임대차 분쟁 조정 신청</li>
<li>서면 요구 받으면 응답 기한 협의 — 즉각 퇴거 요구는 거부할 수 있음</li>
</ul>

<h2>합법적 환경 만들기</h2>
<ul>
<li>이사 전 계약서에 반려동물 조항 협의 후 특약 추가</li>
<li>반려동물 허용 임대 시장 검색 (도봄·직방 필터 활용)</li>
</ul>

<h2>마지막으로</h2>
<p>반려동물 금지 건물에서의 분쟁은 협상이 최선이다. 즉각 법적 대응보다 임대인의 우려(피해·악취)를 해소하는 방향으로 접근하는 것이 현실적으로 효과적이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "주택임대차보호법 및 민법 제623조 (임대인의 수선의무 등)",
      "대법원 판례 — 임대차 계약 위반 해지 요건",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 법적 분쟁은 전문가에게 문의하세요.",
    status: "published",
    publishedAt: "2026-09-29T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-515",
    slug: "dog-cognitive-dysfunction-syndrome",
    type: "blog",
    category: 5,
    title: "노령견 인지기능장애(강아지 치매) — 증상 인지와 삶의 질 관리",
    subtitle: "CDS 증상(DISHA), 진단 방법, 약물·보충제 옵션, 가정 환경 개선",
    metaTitle: "강아지 인지기능장애(치매) — DISHA 증상·진단·관리 가이드 | 펫지기",
    metaDescription: "노령견 인지기능장애(CDS) 증상과 관리 방법. DISHA 증상 체크, 진단 방법, 약물·보충제 옵션, 집 환경 개선으로 삶의 질 유지하는 법을 정리했습니다.",
    body: `<p>11살이 넘은 강아지 중 30% 이상에서 인지기능장애(CDS)가 발생한다는 연구가 있다. 그러나 "나이 들어서 그런가 보다"고 넘기는 경우가 많아 늦게 발견된다.</p>

<h2>DISHA 증상 체크리스트</h2>
<ul>
<li><strong>D</strong>isorientation: 방향 감각 상실, 집 안에서 길을 잃음, 가구에 부딪힘</li>
<li><strong>I</strong>nteractions: 보호자·가족과의 상호작용 변화 (더 달라붙거나 무관심)</li>
<li><strong>S</strong>leep-wake: 수면 패턴 역전 (낮에 자고 밤에 울음)</li>
<li><strong>H</strong>ousesoiling: 오래 된 배변 훈련을 잊어버림</li>
<li><strong>A</strong>ctivity: 활동 변화 (무기력 또는 목적 없는 배회)</li>
</ul>

<h2>진단</h2>
<p>인지기능장애는 다른 질환(통증·감각 저하·갑상선·신장)을 먼저 배제한 후 진단한다. 혈액 검사, 신경학적 검진, 영상 검사로 다른 원인을 확인한다.</p>

<h2>치료·관리 옵션</h2>
<div class="callout-dog">
<strong>CDS 관리 선택지</strong><br>
• <strong>세레길린(Anipryl)</strong>: 국내 승인 약물, MAO-B 억제제<br>
• <strong>오메가-3 (DHA)</strong>: 뇌 기능 보조 효과 일부 연구 확인<br>
• <strong>항산화 보충제</strong>: 비타민 E·C, 알파리포산<br>
• <strong>환경 자극</strong>: 매일 짧은 훈련·놀이 (신경 가소성 유지)
</div>

<h2>가정 환경 개선</h2>
<ul>
<li>가구 배치 변경 금지 (익숙한 환경 유지)</li>
<li>밤 안전등 설치 (방향 감각 보조)</li>
<li>규칙적인 루틴 유지 (불안 감소)</li>
<li>야간 울음: 수의사와 진정제 처방 상담 가능</li>
</ul>

<h2>마지막으로</h2>
<p>강아지 치매는 완치가 없지만 관리로 진행을 늦추고 삶의 질을 유지할 수 있다. 변화를 일찍 발견할수록 개입 효과가 크다. 노령견에게 연 2회 건강 검진을 권장하는 이유다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Salvin, H.E. et al. — Under diagnosis of canine cognitive dysfunction. Vet J 2010",
      "한국수의신경학회 노령견 인지 기능 임상 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-29T11:00:00.000Z",
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
  console.log("블로그 포스트 78차 시딩 완료! (blog-511 ~ blog-515)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
