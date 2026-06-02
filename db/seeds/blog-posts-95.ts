import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 95 — cat2×2 + cat3×1 + cat5×1 + cat1×1 = 5편 (IDs 596-600)
// Macros: A, D, B, F, G
// Angles: RA3, RA1, RA7, RA4, RA6

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-596",
    slug: "cat-food-label-reading-guide",
    type: "blog",
    category: 2,
    title: "고양이 사료 라벨 완전 해독 — 브랜드 마케팅에 속지 않는 법",
    subtitle: "원재료 목록 읽기, 수분 기준 표기 차이, AAFCO 인증 의미, 흔한 라벨 속임수",
    metaTitle: "고양이 사료 라벨 읽는 법 — 마케팅 속임수 완전 가이드 | 펫지기",
    metaDescription: "고양이 사료 라벨을 올바르게 읽는 방법. 원재료 목록 순서, 건물/습량 기준 차이, AAFCO 완전영양식 인증 의미, 흔한 라벨 속임수를 정리했습니다.",
    body: `<p>사료를 고를 때 라벨을 읽는 사람이 늘고 있다. 그러나 라벨에는 소비자를 혼란스럽게 하는 마케팅 기법도 숨어있다.</p>

<h2>원재료 목록 읽기</h2>
<p>성분은 함량 내림차순이다. 첫 번째 성분이 가장 많이 들어있다. 그러나 "닭고기"와 "닭고기 분말"은 수분 포함 여부가 달라 함량이 다르게 보일 수 있다.</p>

<h2>라벨 속임수 1 — 성분 쪼개기</h2>
<p>"닭고기(14%), 쌀(10%), 닭고기 부산물(8%), 쌀가루(8%)"처럼 유사 성분을 나눠 표기하면 개별 순위가 낮아 보인다. 합산하면 쌀 계열이 가장 많을 수 있다.</p>

<h2>건물 기준 vs 습량 기준</h2>
<div class="callout-cat">
<strong>건물(DM) 기준 환산이 중요한 이유</strong><br>
• 습식 사료 라벨: 수분 포함 표기 → 단백질 10% 표기<br>
• 건물 기준 환산: 수분 80% 제거 후 → 실제 단백질 50%<br>
• 건식 vs 습식 직접 비교 시 반드시 DM 기준으로 환산<br>
• 공식: (성분% ÷ (100 - 수분%)) × 100
</div>

<h2>AAFCO 완전영양식 표기</h2>
<ul>
<li>"AAFCO 기준 충족" → 필수 영양소 최소 기준 충족</li>
<li>"성장기" vs "유지" vs "전 연령": 목적에 맞는 것 선택</li>
<li>"보완식" 표기 사료: 완전영양식이 아님 → 주식 불가</li>
</ul>

<h2>흔한 마케팅 표기</h2>
<ul>
<li>"자연(Natural)" — 법적으로 거의 아무 의미 없음</li>
<li>"그레인프리" — 곡물 없다는 것이 더 좋다는 근거 없음</li>
<li>"홀리스틱(Holistic)" — 규제된 용어 아님</li>
<li>"사람이 먹을 수 있는 재료" — 최종 제품은 다를 수 있음</li>
</ul>

<h2>마지막으로</h2>
<p>좋은 사료는 화려한 라벨이 아닌, 첫 번째 성분이 실제 고기이고 AAFCO 완전영양식 인증이 있으며 DM 기준 단백질 함량이 고양이 요구량을 충족하는 것이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AAFCO — Model Pet Food Regulations 2023",
      "한국수의영양학회 사료 표기 기준 해설",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-09T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-597",
    slug: "dog-joint-supplement-evidence",
    type: "blog",
    category: 2,
    title: "강아지 관절 보충제 — 글루코사민이 실제로 효과 있는가",
    subtitle: "글루코사민·콘드로이틴·MSM 연구 근거, 오메가-3 비교, 올바른 복용 방법",
    metaTitle: "강아지 관절 보충제 효과 — 글루코사민·오메가3·MSM 근거 분석 | 펫지기",
    metaDescription: "강아지 글루코사민 보충제가 실제로 효과 있는지 과학적 근거를 분석했습니다. 글루코사민·콘드로이틴·MSM·오메가3 연구 결과, 올바른 복용 방법을 정리했습니다.",
    body: `<p>반려견 관절 보충제 시장이 매우 크다. 그러나 과학적 근거는 마케팅만큼 강하지 않다. 실제 연구 데이터를 살펴보자.</p>

<h2>글루코사민·콘드로이틴</h2>
<p>연골 구성 성분을 보충한다는 이론이다. 인간 골관절염 연구에서는 결과가 엇갈린다. 강아지 연구는 인간보다 적지만, 일부 연구에서 통증 감소·보행 개선 효과가 관찰됐다.</p>

<h2>MSM(메틸설포닐메탄)</h2>
<p>항산화·항염 효과가 연구되고 있다. 단독 연구보다는 글루코사민+콘드로이틴과 복합으로 사용한 연구가 많다. 직접 강아지 연구는 제한적이다.</p>

<h2>오메가-3(EPA·DHA)가 가장 근거 강함</h2>
<div class="callout-dog">
<strong>관절에 가장 근거 있는 보충제</strong><br>
• 오메가-3(EPA·DHA): 관절 염증 감소 효과 확인 — 가장 강한 근거<br>
• 글루코사민+콘드로이틴: 중간 근거 — 일부에서 효과<br>
• 유청 단백질: 근육 유지 보조<br>
• 보충제는 약이 아님 — 심한 관절염에는 수의사 처방 진통제 필요
</div>

<h2>올바른 복용 방법</h2>
<ul>
<li>장기 복용(1~3개월)이 필요 — 즉각적 효과 없음</li>
<li>예방 vs 치료: 초기·예방 목적으로 효과 기대 더 높음</li>
<li>이미 심한 관절염이면 수의사 약물이 먼저</li>
<li>사료에 이미 포함된 경우 중복 고려</li>
</ul>

<h2>마지막으로</h2>
<p>관절 보충제는 해가 되지는 않지만, 기적의 효과도 아니다. 오메가-3가 가장 근거가 강하고 안전한 선택이다. 이것 하나로 시작하는 것이 현실적이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Innes, J.F. et al. — Randomised double-blind clinical trial of two nutraceuticals for degenerative joint disease. Vet Rec 2003",
      "한국수의영양학회 관절 보충제 사용 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-09T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-598",
    slug: "dog-ear-infection-prevention",
    type: "blog",
    category: 3,
    title: "강아지 외이도염 예방 — 귀를 자주 긁는다면 체크해야 할 것",
    subtitle: "외이도염 원인·증상, 귀 세척법, 재발 예방, 귀 모양·수영 관련 위험",
    metaTitle: "강아지 외이도염 예방 — 원인·귀 세척법·재발 예방 가이드 | 펫지기",
    metaDescription: "강아지 외이도염 예방과 관리 방법. 외이도염 원인과 증상, 올바른 귀 세척법, 귀 모양별 위험 요인, 재발 예방 방법을 정리했습니다.",
    body: `<p>강아지 외이도염은 반복적으로 재발하는 경향이 있다. 원인을 이해하고 예방하는 것이 매번 치료하는 것보다 효과적이다.</p>

<h2>왜 자꾸 재발하는가</h2>
<p>외이도염의 근본 원인을 치료하지 않으면 반드시 재발한다. 항생제·항진균제로 감염을 잡아도 원인(알레르기·해부학적 구조)이 남아있으면 조건이 다시 만들어진다.</p>

<h2>주요 원인</h2>
<ul>
<li>알레르기 (식이 또는 환경): 가장 흔한 원인</li>
<li>귀 모양: 처진 귀(코커스패니얼·래브라도) — 환기 불량</li>
<li>과도한 귀털</li>
<li>잦은 수영·목욕 후 습기</li>
<li>귀지 과다 생성 (갑상선 저하증 등)</li>
</ul>

<h2>증상</h2>
<div class="callout-dog">
<strong>외이도염 신호</strong><br>
• 귀 긁기·머리 흔들기<br>
• 귀에서 냄새<br>
• 귀 내부 발적·부종<br>
• 짙은 갈색·검은색 귀지<br>
• 귀 만지면 통증
</div>

<h2>올바른 귀 세척법</h2>
<ul>
<li>수의사 처방 이어클리너 사용 (시중 물티슈 금지)</li>
<li>클리너를 귀에 넣고 마사지 → 면봉 없이 면구로 닦기</li>
<li>면봉으로 깊이 찌르기 금지 (고막 손상)</li>
<li>주 1~2회 예방 세척 (감염 없을 때)</li>
</ul>

<h2>재발 예방</h2>
<ul>
<li>알레르기가 원인이면 알레르기 치료가 핵심</li>
<li>수영 후 즉시 귀 건조</li>
<li>귀털이 많으면 정기 미용으로 제거</li>
<li>처진 귀 강아지: 더 자주 확인</li>
</ul>

<h2>마지막으로</h2>
<p>외이도염이 반복된다면 알레르기 검사를 받는 것이 장기적으로 가장 효과적인 해결책이다. 감염만 반복적으로 치료하는 것은 밑 빠진 독에 물 붓기다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Gotthelf, L.N. — Small Animal Ear Diseases: An Illustrated Guide. Saunders 2005",
      "한국수의피부학회 외이도염 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-10T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-599",
    slug: "cat-enrichment-toys-guide",
    type: "blog",
    category: 5,
    title: "고양이 장난감 선택 완전 가이드 — 어떤 장난감이 왜 좋은가",
    subtitle: "고양이 사냥 본능과 장난감 종류, 낚싯대 올바른 사용법, 안전 주의사항",
    metaTitle: "고양이 장난감 선택 가이드 — 사냥 본능·종류별 효과·안전 주의 | 펫지기",
    metaDescription: "고양이 장난감을 올바르게 선택하는 방법. 사냥 본능과 장난감 종류별 효과, 낚싯대 올바른 사용법, 혼자 놀기 vs 함께 놀기, 안전 주의사항을 정리했습니다.",
    body: `<p>고양이 장난감을 많이 사놓는데 관심이 없다. 이유가 있다 — 고양이 사냥 본능에 맞는 장난감 선택과 놀이 방법이 있다.</p>

<h2>고양이 사냥 주기</h2>
<p>고양이의 자연 사냥은 5단계로 이루어진다: 집중 → 추적 → 달리기 → 잡기 → 씹기. 좋은 놀이는 이 5단계를 모두 자극한다. 순서를 따르지 않으면 불만족으로 끝난다.</p>

<h2>장난감 종류별 효과</h2>
<table>
<thead><tr><th>종류</th><th>자극 단계</th><th>특징</th></tr></thead>
<tbody>
<tr><td>낚싯대</td><td>집중~잡기</td><td>함께 놀이 최고, 가장 효과적</td></tr>
<tr><td>레이저 포인터</td><td>집중~추적</td><td>잡는 단계 없어 불만족 — 반드시 실물로 마무리</td></tr>
<tr><td>쥐 모양 장난감</td><td>잡기~씹기</td><td>단독 놀이용</td></tr>
<tr><td>전동 장난감</td><td>집중~추적</td><td>혼자 있을 때 자극</td></tr>
</tbody>
</table>

<h2>낚싯대 올바른 사용법</h2>
<div class="callout-cat">
<strong>낚싯대 놀이 원칙</strong><br>
• 먹이처럼 움직이기 — 랜덤한 움직임, 돌발 정지<br>
• 고양이가 집중할 때 느리게, 속도 변화<br>
• 놀이 마무리: 잡아서 씹게 해주기 (사냥 완결 경험)<br>
• 마지막에 간식 제공 — 먹이 섭취로 놀이 주기 완결<br>
• 보관 시 시야에서 치우기 (특별함 유지)
</div>

<h2>안전 주의사항</h2>
<ul>
<li>깃털 장난감: 삼키지 않게 감독 필수</li>
<li>실·끈 형태: 보관 시 치우기 (장 꼬임 위험)</li>
<li>작은 부품: 삼킴 위험</li>
<li>레이저: 눈에 직접 비추지 않기</li>
</ul>

<h2>마지막으로</h2>
<p>가장 비싼 장난감이 최고가 아니다. 낚싯대 하나로 하루 10~15분 집중적으로 노는 것이 전자 장난감 24시간 방치보다 훨씬 효과적이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bernstein, P.L. & Strack, M. — A game of cat and house. Anthrozoos 1996",
      "한국고양이보호자연합 장난감 안전 및 놀이 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-10T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-600",
    slug: "puppy-vs-adult-dog-adoption",
    type: "blog",
    category: 1,
    title: "강아지 입양 — 어린 강아지 vs 성견, 무엇이 나에게 맞는가",
    subtitle: "어린 강아지의 실제 요구사항, 성견 입양의 장점, 생활 방식별 선택 기준",
    metaTitle: "어린 강아지 vs 성견 입양 — 나에게 맞는 선택 기준 | 펫지기",
    metaDescription: "어린 강아지와 성견 입양 중 어떤 것이 나에게 맞을까요? 어린 강아지의 실제 요구사항, 성견 입양의 장점, 생활 방식별 선택 기준을 정리했습니다.",
    body: `<p>"어린 강아지가 좋다"는 말을 듣지만, 어린 강아지는 생각보다 훨씬 많은 시간과 에너지를 요구한다. 성견 입양도 훌륭한 선택이다.</p>

<h2>어린 강아지의 실제 요구사항</h2>
<ul>
<li>낮 시간 최소 4~6회 배변 유도 (3개월 미만)</li>
<li>밤중에도 배변 가능 → 수면 방해</li>
<li>파괴 행동·씹기 (1년간 지속)</li>
<li>예방접종 완료 전 외출 제한</li>
<li>사회화 집중 투자 시기 (3~12주)</li>
<li>훈련에 많은 시간 필요</li>
</ul>

<h2>성견 입양의 장점</h2>
<div class="callout-dog">
<strong>성견 입양이 유리한 경우</strong><br>
• 이미 배변 훈련된 경우 많음<br>
• 성격·에너지 레벨 예측 가능<br>
• 어린 강아지의 파괴기 없음<br>
• 1인 가구·바쁜 직장인에게 현실적<br>
• 노령견: 조용하고 안정적인 생활
</div>

<h2>생활 방식별 선택 기준</h2>
<table>
<thead><tr><th>상황</th><th>권장</th></tr></thead>
<tbody>
<tr><td>재택근무·충분한 시간</td><td>어린 강아지 가능</td></tr>
<tr><td>하루 8시간 이상 외출</td><td>성견 또는 2마리</td></tr>
<tr><td>어린 자녀 있는 가정</td><td>어린이와 성장 경험 원하면 강아지, 조용한 성견도 좋음</td></tr>
<tr><td>노령자 가정</td><td>에너지 낮은 성견·노령견</td></tr>
</tbody>
</table>

<h2>마지막으로</h2>
<p>"귀여우니까"로 어린 강아지를 선택하는 것은 위험할 수 있다. 나의 생활 방식을 솔직하게 평가하고, 그에 맞는 선택을 하는 것이 모두에게 더 행복한 결과를 만든다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA — Adopting a Dog: Puppy or Adult?",
      "한국동물복지협회 입양 적합성 가이드 2023",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-11T09:00:00.000Z",
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
  console.log("블로그 포스트 95차 시딩 완료! (blog-596 ~ blog-600)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
