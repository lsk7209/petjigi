import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 84 — cat3×2 + cat1×1 + cat4×1 + cat2×1 = 5편 (IDs 541-545)
// Macros: D, A, F, B, G
// Angles: RA2, RA2, RA4, RA3, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-541",
    slug: "dog-hypoglycemia-small-breeds",
    type: "blog",
    category: 3,
    title: "소형견 저혈당증 — 갑자기 쓰러지는 강아지의 응급 대처법",
    subtitle: "소형견 저혈당 원인, 응급 처치 방법, 당뇨견 저혈당 vs 단순 저혈당 차이",
    metaTitle: "소형견 저혈당증 응급 대처 — 원인·증상·즉시 조치법 | 펫지기",
    metaDescription: "소형견 저혈당증 원인과 응급 대처법을 정리했습니다. 갑자기 쓰러지는 소형견 저혈당 증상, 꿀·포도당 응급 처치법, 당뇨견 저혈당 차이를 알아보세요.",
    body: `<p>소형견이 갑자기 비틀거리거나 의식을 잃는다면 저혈당일 수 있다. 즉각적인 대처가 생사를 가른다.</p>

<h2>소형견 저혈당이 흔한 이유</h2>
<p>소형견은 체중 대비 뇌의 포도당 소비 비율이 높고, 혈당을 유지하는 글리코겐 저장량이 상대적으로 적다. 특히 어린 소형견(키튼기)은 식사 간격이 길거나 스트레스 상황에서 저혈당이 생기기 쉽다.</p>

<h2>저혈당 증상</h2>
<ul>
<li>흔들림·비틀거림</li>
<li>눈 촛점 잃음·무반응</li>
<li>발작·경련</li>
<li>의식 저하 또는 소실</li>
</ul>

<h2>응급 처치 (즉시)</h2>
<div class="callout-dog">
<strong>저혈당 응급 순서</strong><br>
1. 꿀·포도당 시럽·설탕물을 잇몸에 소량 바르기 (삼키는 것 말고 흡수)<br>
2. 의식 회복 여부 확인<br>
3. 회복되더라도 즉시 동물병원<br>
4. 의식 없으면 수건에 감싸 체온 유지 + 즉시 응급병원<br>
⚠️ 강제로 물 먹이지 않기 — 흡인 위험
</div>

<h2>예방</h2>
<ul>
<li>소형견 어린 강아지: 하루 4~5회 소량 급식 (3개월 미만)</li>
<li>여행·스트레스 상황 전 간식 제공</li>
<li>수술 전 금식은 수의사 지시 준수 (소형견은 더 짧게)</li>
</ul>

<h2>당뇨견 저혈당과의 차이</h2>
<p>당뇨 치료 중 인슐린 과다 투여로 발생하는 저혈당은 더 심각하다. 당뇨견에게 식사 전 인슐린 투여, 식사 거부 시 반드시 수의사 상담이 원칙이다.</p>

<h2>마지막으로</h2>
<p>소형견 보호자라면 꿀 한 병을 응급 키트에 항상 보관해두는 것이 좋다. 저혈당 응급 처치의 골든 타임은 몇 분 이내다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국수의응급의학회 소형견 저혈당 응급 처치 가이드라인",
      "Dunayer, E.K. — Hypoglycemia following canine ingestion of xylitol-containing gum. Vet Hum Toxicol 2004",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 상황에서는 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-10-12T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-542",
    slug: "cat-hypertension-management",
    type: "blog",
    category: 3,
    title: "고양이 고혈압 — 눈이 빨개지거나 갑자기 보이지 않는다면",
    subtitle: "고양이 고혈압 원인, 실명 위험, 혈압 측정 방법, 약물 치료",
    metaTitle: "고양이 고혈압 — 실명 위험·원인·혈압 측정·약물 치료 가이드 | 펫지기",
    metaDescription: "고양이 고혈압은 갑작스러운 실명을 유발할 수 있습니다. 원인(CKD·갑상선항진증), 실명 위험 신호, 혈압 측정 방법, 약물 치료를 정리했습니다.",
    body: `<p>고양이가 갑자기 눈이 빨개지거나, 동공이 극도로 확장되거나, 벽에 부딪히기 시작한다면 고혈압으로 인한 망막 박리일 수 있다. 즉각적인 치료가 시력을 살릴 수 있다.</p>

<h2>고양이 고혈압이 위험한 이유</h2>
<p>혈압이 높으면 망막 혈관이 파열되거나 망막이 박리된다. 수 시간~수 일 이내 실명에 이를 수 있다. 즉각적인 혈압 강하 치료가 망막 회복 가능성을 높인다.</p>

<h2>주요 원인</h2>
<ul>
<li>만성 신장병(CKD): 가장 흔한 원인</li>
<li>갑상선 기능항진증: 심박수 증가 → 혈압 상승</li>
<li>당뇨: 혈관 손상</li>
<li>특발성 고혈압 (원인 불명)</li>
</ul>

<h2>즉시 병원이 필요한 신호</h2>
<div class="callout-cat">
<strong>고혈압 긴급 신호</strong><br>
• 눈이 빨개짐 (결막·홍채 충혈)<br>
• 동공이 극도로 확장, 반응 없음<br>
• 갑자기 잘 보이지 않는 것 같음 (벽 충돌, 점프 실패)<br>
• 갑자기 한쪽 눈이 탁해짐<br>
▶ 이 경우 6시간 이내 치료가 망막 회복을 결정
</div>

<h2>혈압 측정</h2>
<p>수의사가 도플러 또는 진동법 혈압계로 측정한다. 정상 혈압: 수축기 140mmHg 이하. 160 이상은 경계, 180 이상은 고위험이다. CKD·갑상선항진증 진단된 고양이는 정기 혈압 모니터링이 권장된다.</p>

<h2>약물 치료</h2>
<ul>
<li><strong>암로디핀(Amlodipine)</strong>: 1차 선택 약물, 효과적, 고양이에서 안전성 확인</li>
<li><strong>텔미사르탄(Telmisartan)</strong>: 신장 보호 효과 추가, 2차 또는 병행</li>
</ul>

<h2>마지막으로</h2>
<p>고혈압은 증상 없이 진행하다가 갑자기 실명으로 드러나는 경우가 많다. 10살 이상 노령묘, CKD·갑상선항진증이 있는 고양이는 정기 혈압 측정이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Acierno, M.J. et al. — ACVIM consensus statement: Guidelines for identification, evaluation and management of systemic hypertension in cats. J Vet Intern Med 2018",
      "한국수의내과학회 고혈압 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-13T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-543",
    slug: "feral-cat-socialization-guide",
    type: "blog",
    category: 1,
    title: "길고양이(야생 고양이) 사회화 — 가능한가, 어디까지인가",
    subtitle: "야생 고양이 vs 길고양이 차이, 사회화 가능 나이, 단계별 접근법",
    metaTitle: "길고양이 사회화 — 가능 여부·나이 기준·단계별 방법 | 펫지기",
    metaDescription: "길고양이와 야생 고양이를 사회화시킬 수 있을까요? 사회화 가능 나이 기준, 야생 고양이와 사회화 부족 고양이 차이, 단계별 접근법을 정리했습니다.",
    body: `<p>TNR 과정에서 포획된 야성이 강한 고양이, 또는 어릴 때부터 사람을 피해온 길고양이를 집에서 키우고 싶다면 사회화 가능 여부를 먼저 알아야 한다.</p>

<h2>야생 고양이 vs 사회화 부족 고양이</h2>
<ul>
<li><strong>야생 고양이(Feral)</strong>: 태어나서 한 번도 사람 접촉 없음. 성묘는 사회화가 매우 어렵거나 불가능. TNR 후 방사가 적합.</li>
<li><strong>사회화 부족(Unsocialized)</strong>: 사람 접촉이 있었지만 부정적 경험. 시간이 걸리지만 사회화 가능.</li>
</ul>

<h2>사회화 가능 나이 기준</h2>
<p>생후 7주 이전: 사회화 창이 열려있어 비교적 쉽다.<br>
7~14주: 가능하지만 시간이 더 걸린다.<br>
14주 이후: 점점 어려워지며, 성묘는 제한적이다.</p>

<h2>단계별 접근법</h2>
<div class="callout-cat">
<strong>야성 고양이 사회화 단계</strong><br>
1단계: 같은 공간에 있기 — 접촉 없이 존재에 익숙해지기 (수일~수주)<br>
2단계: 간식으로 거리 줄이기 — 보호자 쪽으로 다가오도록 유인<br>
3단계: 손 냄새 맡게 하기<br>
4단계: 먹는 동안 가볍게 터치 → 점진적 접촉 확대<br>
▶ 절대 서두르지 않기 — 후퇴는 처음부터 다시
</div>

<h2>사회화가 어려운 신호</h2>
<ul>
<li>6개월 이상 시도해도 접근 불허</li>
<li>스트레스 신호 지속 (숨기, 구토, 먹지 않음)</li>
<li>방생이 고양이와 보호자 모두에게 최선일 수 있다</li>
</ul>

<h2>마지막으로</h2>
<p>모든 길고양이가 집고양이가 될 수 있는 것은 아니다. 무리한 사회화 시도는 고양이에게 극도의 만성 스트레스를 준다. 고양이의 신호를 존중하는 것이 진정한 배려다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Slater, M.R. — Community approaches to feral cats. Humane Society Press 2002",
      "한국동물복지협회 길고양이 관리 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-13T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-544",
    slug: "pet-insurance-exclusion-clauses",
    type: "blog",
    category: 4,
    title: "펫보험 면책 조항 완전 해설 — 이것을 몰랐다가 청구 거절된다",
    subtitle: "선천성·유전성 질환 면책, 예방접종·정기검진 면책, 임신 면책, 면책 분쟁 대처",
    metaTitle: "펫보험 면책 조항 — 청구 거절 이유와 사전 확인 방법 | 펫지기",
    metaDescription: "펫보험 면책 조항을 제대로 알지 못하면 청구가 거절될 수 있습니다. 선천성·유전성 질환, 예방 처치, 임신 면책 조항과 분쟁 대처 방법을 정리했습니다.",
    body: `<p>펫보험 청구를 했다가 "면책 사항입니다"라는 통보를 받는 경우가 있다. 가입 전에 면책 조항을 꼼꼼히 확인해야 하는 이유다.</p>

<h2>흔한 면책 조항 유형</h2>
<ul>
<li><strong>선천성·유전성 질환</strong>: 슬개골 탈구(일부), PKD, 심장 선천성 기형 — 기존 정밀 검사 여부에 따라</li>
<li><strong>예방적 처치</strong>: 예방접종, 예방 구충, 정기 스케일링, 중성화 수술</li>
<li><strong>임신·분만</strong>: 대부분 보장 제외</li>
<li><strong>대기기간 중 발생</strong>: 가입 후 15~180일 내 질환</li>
<li><strong>기존 질환</strong>: 고지 의무 누락 시 보험 전체 무효 가능</li>
</ul>

<h2>면책이 모호한 영역</h2>
<div class="callout-dog">
<strong>보험사와 분쟁이 잦은 면책 유형</strong><br>
• "이전부터 존재했을 가능성" — 수의사 소견 vs 보험사 판단<br>
• 슬개골 탈구 등급 변화 — 대기기간 이후 발견이라도 기존 존재 주장<br>
• 피부 질환 — 아토피 vs 단순 알레르기 분류 분쟁<br>
• 치과 — 치료 vs 예방 분류 기준
</div>

<h2>가입 전 확인해야 할 것</h2>
<ul>
<li>약관 전문 읽기 (귀찮아도 필수)</li>
<li>기존 질환 목록 확인 후 고지 (고지 의무 이행)</li>
<li>특정 질환(슬개골·치과) 대기기간 비교</li>
<li>청구 시 수의사 소견서·진단서 발급 절차 확인</li>
</ul>

<h2>면책 분쟁 시 대처</h2>
<ul>
<li>수의사 상세 소견서 요청 (질환 발생 시점 명시)</li>
<li>금융감독원 분쟁조정위원회 신청</li>
<li>한국소비자원 피해구제 신청</li>
</ul>

<h2>마지막으로</h2>
<p>좋은 펫보험은 면책 조항이 적고, 분쟁 처리가 투명한 것이다. 저렴한 보험료보다 보장 내용이 더 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 펫보험 분쟁 조정 사례 2023",
      "한국소비자원 반려동물 보험 소비자 피해 분석 2022",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 보험 분쟁은 해당 기관에 문의하세요.",
    status: "published",
    publishedAt: "2026-10-14T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-545",
    slug: "senior-cat-food-guide",
    type: "blog",
    category: 2,
    title: "노령묘 사료 선택 — 7살부터 달라지는 영양 요구량",
    subtitle: "노령묘 단백질 필요량, 인 제한 시점, 처방식 vs 일반 노령 사료, 식욕 감소 대처",
    metaTitle: "노령묘 사료 선택 — 7살 이후 영양 요구량과 사료 기준 | 펫지기",
    metaDescription: "노령묘 7살 이후 달라지는 영양 요구량과 사료 선택 방법. 단백질 필요량 오해, 인 제한 시점, 처방식 vs 일반 노령 사료 비교, 식욕 감소 대처를 정리했습니다.",
    body: `<p>"노령 사료는 단백질이 낮아야 한다"는 생각이 아직도 남아있다. 그러나 최신 영양학은 다르게 말한다.</p>

<h2>노령묘 단백질 요구량의 진실</h2>
<p>고양이는 나이가 들수록 단백질 소화·흡수율이 떨어진다. 즉, 노령묘에게는 오히려 단백질 함량이 높거나 같은 수준이 필요할 수 있다. 단, 신장 질환이 있는 경우에는 별도 조정이 필요하다.</p>

<h2>노령묘 사료 선택 기준</h2>
<table>
<thead><tr><th>항목</th><th>성묘 사료</th><th>노령 사료</th></tr></thead>
<tbody>
<tr><td>칼로리</td><td>보통</td><td>낮음 또는 비슷 (개체에 따라)</td></tr>
<tr><td>단백질</td><td>보통</td><td>높거나 동등 (소화율 고려)</td></tr>
<tr><td>인</td><td>보통</td><td>낮음 권장 (신장 보호)</td></tr>
<tr><td>오메가-3</td><td>기본</td><td>강화 (관절·인지 기능)</td></tr>
</tbody>
</table>

<h2>인 제한 시작 시점</h2>
<div class="callout-cat">
<strong>신장 보호를 위한 인 관리</strong><br>
• 건강한 노령묘: 인 제한 사료 또는 낮은 인 함량 일반 사료<br>
• CKD 진단 시: 처방식(신장 처방식) 전환<br>
• 인 0.5% 이하(DM 기준)를 선호<br>
• 고단백 처방식이라도 인 함량이 낮은 것 선택
</div>

<h2>식욕 감소 대처</h2>
<ul>
<li>사료를 살짝 데우기 (향 강화)</li>
<li>습식 사료 비율 높이기</li>
<li>새 브랜드·새 질감 시도</li>
<li>식욕 감소가 2~3일 지속되면 수의사 확인 (다른 질환 신호일 수 있음)</li>
</ul>

<h2>마지막으로</h2>
<p>노령묘 사료 선택은 나이 숫자보다 개별 건강 상태가 우선이다. 정기 검진으로 신장·간 기능을 확인하고, 그에 맞는 사료를 수의사와 함께 선택하는 것이 가장 정확하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "WSAVA — Nutritional Assessment Guidelines for Senior Cats 2023",
      "한국수의영양학회 노령묘 영양 관리 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-14T11:00:00.000Z",
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
  console.log("블로그 포스트 84차 시딩 완료! (blog-541 ~ blog-545)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
