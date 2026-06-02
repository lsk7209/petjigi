import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 31 — cat3×3 + cat1×2 = 5편 (IDs 276-280)
// Macros: A, B, F, G, E — batch 30(A/F/G/E/B)와 순환
// Angles: RA6, RA7, RA3, RA8, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 276 / Cat3 / Macro-A / Lens-L3 / Hook-H4(contrast) / Outro-O2 / Angle-RA6
  {
    id: "blog-276",
    slug: "dog-atopy-skin-allergy-guide",
    type: "blog",
    category: 3,
    title: "강아지 아토피·피부 알레르기 완전 가이드 — 원인·진단·관리까지",
    subtitle: "환경·식품·접촉 알레르기 구별법, 가려움 완화 방법, 수의사 진단 전 보호자가 기록해야 할 것",
    metaTitle: "강아지 아토피 피부 알레르기 원인·진단·관리 가이드 | 펫지기",
    metaDescription: "강아지 아토피·피부 알레르기의 원인 종류, 환경·식품·접촉 알레르기 구별법, 가려움 완화 방법, 수의사 방문 전 준비 사항을 정리했습니다.",
    body: `<p>흔히 피부 알레르기와 아토피를 같은 것으로 혼동하지만, 수의학적으로는 다른 개념이다. 아토피(아토픽 피부염)는 환경 알레르기원에 대한 유전적 과민 반응이고, 식품 알레르기·접촉 알레르기는 별개의 진단이다. 대한수의피부과학회에 따르면 강아지 피부 질환의 약 40%가 알레르기성 원인으로 추정된다.</p>

<div class="callout-cat">
<strong>피부 알레르기 vs 아토피 — 핵심 차이</strong><br>
• <strong>아토피</strong>: 환경 알레르기원(집먼지진드기, 꽃가루, 곰팡이) → 유전적 소인, 계절성 또는 연중 지속<br>
• <strong>식품 알레르기</strong>: 특정 식재료(닭, 소, 밀) → 계절 무관, 연중 동일<br>
• <strong>접촉 알레르기</strong>: 특정 물질 접촉 부위만 발생 → 발바닥·배 등 국소 반응
</div>

<h2>알레르기 유형별 증상과 발생 패턴</h2>

<div class="key-summary">
<strong>📋 유형별 비교</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-3-soft,#dfe9f3);">
<th style="padding:8px;border:1px solid var(--brand-border);">항목</th>
<th style="padding:8px;border:1px solid var(--brand-border);">아토피</th>
<th style="padding:8px;border:1px solid var(--brand-border);">식품 알레르기</th>
<th style="padding:8px;border:1px solid var(--brand-border);">접촉 알레르기</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">계절성</td><td style="padding:8px;border:1px solid var(--brand-border);">있음 (봄·가을 악화)</td><td style="padding:8px;border:1px solid var(--brand-border);">없음</td><td style="padding:8px;border:1px solid var(--brand-border);">없음</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">발생 부위</td><td style="padding:8px;border:1px solid var(--brand-border);">얼굴·발·겨드랑이·사타구니</td><td style="padding:8px;border:1px solid var(--brand-border);">전신 또는 귀·발</td><td style="padding:8px;border:1px solid var(--brand-border);">접촉 부위만</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">발병 나이</td><td style="padding:8px;border:1px solid var(--brand-border);">1~3세</td><td style="padding:8px;border:1px solid var(--brand-border);">모든 나이</td><td style="padding:8px;border:1px solid var(--brand-border);">모든 나이</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">진단</td><td style="padding:8px;border:1px solid var(--brand-border);">피부 알레르기 검사</td><td style="padding:8px;border:1px solid var(--brand-border);">식이 제거 테스트 8주</td><td style="padding:8px;border:1px solid var(--brand-border);">접촉 제거 후 관찰</td></tr>
</tbody></table>
</div>

<h2>가려움 완화 — 수의사 방문 전 할 수 있는 것</h2>
<ul>
<li><strong>집먼지진드기 관리</strong>: 주 2회 이상 침구 세탁 (60℃ 이상), 공기청정기 사용, 카펫 제거</li>
<li><strong>발 닦기</strong>: 산책 후 발바닥을 물로 씻어 꽃가루·외부 알레르기원 제거</li>
<li><strong>오메가-3 지방산</strong>: 항염증 효과. 생선 오일 보충제로 피부 장벽 강화 (수의사 용량 확인)</li>
<li><strong>알레르기 트리거 일지 작성</strong>: 증상이 심한 날의 날씨·음식·외출 여부 기록 → 수의사 진료에 결정적 도움</li>
</ul>

<div class="callout-cat">
<strong>수의사 방문 전 기록해야 할 것</strong><br>
• 증상 시작 시기와 계절 패턴<br>
• 가장 많이 긁는 부위 사진<br>
• 최근 1개월 사료·간식 성분<br>
• 집안 환경 변화 (새 카펫, 세제 변경 등)<br>
이 정보가 있으면 첫 진료에서 불필요한 검사를 줄일 수 있다.
</div>

<h2>아토피 치료 — 수의사가 선택할 수 있는 옵션</h2>
<p>수의사가 진단 후 상황에 따라 선택하는 치료 옵션들이다 (보호자가 임의로 사용하면 안 됨):</p>
<ul>
<li><strong>항히스타민제</strong>: 경미한 증상에 단기 사용</li>
<li><strong>스테로이드</strong>: 급성기 가려움 억제, 장기 사용 주의</li>
<li><strong>사이토포인트/오클라시티닙</strong>: 최신 아토피 치료제, 부작용 적음</li>
<li><strong>알레르기 면역요법(AIT)</strong>: 알레르기 원인 파악 후 장기 감작 치료</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>아토피는 완치가 가능한가요?</h3>
<p>완치보다는 '관리'라는 표현이 정확하다. 아토피는 유전적 소인이 있는 만성 질환으로, 트리거 관리·약물·환경 개선으로 증상을 최소화하는 것이 목표다. 완치 주장 제품이나 치료법에는 주의가 필요하다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-food-allergy-elimination-diet-test">강아지 알레르기 사료 찾는 법 — 식이 제거 테스트 8주 완전 가이드</a><br>
<a href="/blog/dog-skin-health-guide">강아지 피부 건강 관리 — 빗질·목욕·환경 관리 완전 가이드</a><br>
<a href="/blog/dog-health-checkup">강아지 건강검진 — 나이별 주기와 꼭 챙겨야 할 검사 항목</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    reviewerName: "검수 대기",
    ymyl: true,
    sources: JSON.stringify([
      "대한수의피부과학회 — 반려동물 알레르기성 피부 질환 자료",
      "WSAVA(세계소동물수의사협회) 피부과 가이드라인",
      "농림축산검역본부 반려동물 건강관리 정보 qia.go.kr",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 수의학적 진단·처방을 대체하지 않습니다. 증상이 있으면 반드시 수의사와 상담하세요.",
    status: "published",
    publishedAt: "2026-06-06T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 277 / Cat3 / Macro-B(즉답) / Lens-L7→L3 / Hook-H1 / Outro-O1 / Angle-RA7
  {
    id: "blog-277",
    slug: "cat-heart-disease-early-signs",
    type: "blog",
    category: 3,
    title: "고양이 심장 질환 초기 신호 — 보호자가 먼저 알아채는 방법",
    subtitle: "비대성 심근증 증상, 숨가쁨·기침·실신 구별법, 정기 검진 주기와 수의사 방문 기준",
    metaTitle: "고양이 심장 질환 초기 신호와 검진 가이드 | 펫지기",
    metaDescription: "고양이 심장 질환의 초기 신호, 비대성 심근증 증상, 일반 호흡 vs 응급 상황 구별법, 정기 검진 권장 주기를 정리했습니다.",
    body: `<p class="aeo-answer" style="border-left:3px solid var(--cat-3,#4f7ba8);padding-left:0.75rem;margin-bottom:1rem;">고양이 심장 질환의 가장 흔한 유형인 비대성 심근증(HCM)은 초기에 증상이 거의 없어 "침묵의 병"으로 불린다. 많은 고양이가 심각한 상태가 될 때까지 증상을 숨긴다. 보호자가 알아채야 할 초기 신호는 호흡수 변화, 활동량 감소, 식욕 저하다.</p>

<div class="callout-cat">
<strong>즉시 응급실로 가야 하는 신호</strong><br>
• 입을 벌리고 호흡 (개구호흡 — 고양이에게는 정상이 아님)<br>
• 혀나 잇몸이 청색·회색으로 변함<br>
• 갑자기 뒷다리가 마비되거나 통증으로 울부짖음 (동맥혈전증)<br>
• 의식을 잃거나 쓰러짐
</div>

<h2>고양이 심장 질환, 얼마나 흔한가</h2>
<p>고양이 전체의 약 15%에서 심장 구조 이상이 발견된다는 연구가 있다(Journal of Veterinary Internal Medicine, 2018). 특히 메인쿤, 랙돌, 브리티시숏헤어는 유전적으로 HCM 발생률이 높다. 그러나 혼혈묘(코리안숏헤어)도 발생할 수 있으며, 6세 이상 모든 고양이에서 스크리닝 권장이다.</p>

<h2>보호자가 집에서 관찰할 수 있는 초기 신호</h2>
<ul>
<li><strong>안정 시 호흡수 증가</strong>: 수면 중 정상 고양이 호흡수는 분당 16~30회. 30회를 초과하면 수의사 상담 필요. 스마트폰 초시계로 30초 동안 흉부 움직임을 세고 2를 곱한다.</li>
<li><strong>활동량 감소</strong>: 점프를 피하거나 놀이를 거부하는 경우</li>
<li><strong>숨는 시간 증가</strong>: 불편감으로 숨어 있는 경우 많음</li>
<li><strong>식욕 감소</strong>: 심부전으로 대사 변화가 생길 때 발생</li>
<li><strong>복부 팽창</strong>: 흉수나 복수가 찼을 때 (후기)</li>
</ul>

<div class="key-summary">
<strong>📋 고양이 호흡수 체크 방법</strong>
<ol style="padding-left:1.2rem;margin-top:0.5rem;">
<li>고양이가 완전히 편안하게 잠든 상태에서 측정</li>
<li>가슴이 올라갔다 내려오는 것을 1회로 카운트</li>
<li>30초 동안 세고 × 2 = 분당 호흡수</li>
<li>정상: 16~30회 / 주의: 31~40회 / 응급: 40회 이상</li>
</ol>
</div>

<h2>정기 검진 — 언제부터, 얼마나 자주</h2>
<ul>
<li><strong>6세 미만</strong>: 연 1회 청진 (심잡음 확인)</li>
<li><strong>6세 이상</strong>: 연 1~2회 청진 + 혈압 측정</li>
<li><strong>HCM 고위험 품종</strong>: 연 1회 심장 초음파 (브리더 유전자 검사 권장)</li>
<li><strong>이미 진단받은 경우</strong>: 수의사 지시에 따라 3~6개월마다 추적</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>심잡음이 발견됐는데 바로 치료가 필요한가요?</h3>
<p>심잡음이 있다고 모두 치료가 필요하지는 않다. 수의사가 심잡음의 강도(grade 1~6)를 평가하고 심장 초음파로 구조를 확인한 뒤 결정한다. Grade 1~2는 주의 깊은 관찰만 하는 경우도 있다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/cat-hyperthyroidism-weight-loss">고양이 갑상선 기능항진증 — 잘 먹어도 살이 빠진다면</a><br>
<a href="/blog/cat-chronic-kidney-disease-early">고양이 만성 신부전 초기 신호 — 조기 발견이 중요한 이유</a><br>
<a href="/blog/senior-dog-health-management">노령견 건강 관리 — 7세부터 달라지는 돌봄의 기준</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    reviewerName: "검수 대기",
    ymyl: true,
    sources: JSON.stringify([
      "Journal of Veterinary Internal Medicine (2018) — 고양이 심근증 유병률 연구",
      "ACVIM(미국수의내과학회) 고양이 심장 질환 컨센서스 가이드라인",
      "대한수의사회 반려동물 심장 질환 자료",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 수의학적 진단·처방을 대체하지 않습니다. 증상이 있으면 반드시 수의사와 상담하세요.",
    status: "published",
    publishedAt: "2026-06-06T10:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 278 / Cat3 / Macro-F(절차) / Lens-L4 / Hook-H3(scene) / Outro-O1 / Angle-RA3
  {
    id: "blog-278",
    slug: "dog-ear-infection-prevention-guide",
    type: "blog",
    category: 3,
    title: "강아지 귀 청소 방법과 귀 질환 예방 — 품종별 주기와 이상 신호",
    subtitle: "귀 청소 단계별 방법, 세정제 선택법, 냄새·분비물·가려움 이상 신호, 방치하면 생기는 것",
    metaTitle: "강아지 귀 청소 방법과 귀 질환 예방 완전 가이드 | 펫지기",
    metaDescription: "강아지 귀 청소 단계별 방법, 세정제 선택, 품종별 청소 주기, 귀에서 이상 신호 발견 시 대처법을 정리했습니다.",
    body: `<p>샤워 후 강아지 귀를 말리지 않고 내버려뒀다가 열흘 뒤 외이염으로 병원을 찾는 경우가 많다. 습기는 귀 안의 세균·효모균 번식을 촉진한다. 외이도가 L자형인 강아지는 구조적으로 귀 문제에 취약하며, 이는 예방이 치료보다 훨씬 저렴하고 쉬운 영역이다.</p>

<div class="callout-cat">
<strong>즉시 병원이 필요한 귀 신호</strong><br>
• 귀를 긁거나 머리를 심하게 흔들 때<br>
• 귀에서 심한 냄새 또는 노란·갈색·검은 분비물<br>
• 귀 주변 피부가 붉어지거나 부음<br>
• 고개가 한쪽으로 기울어진 상태 지속 (내이 문제 신호)
</div>

<h2>1단계. 귀 청소가 필요한지 확인</h2>
<p>건강한 귀는 연한 분홍색이고 냄새가 없으며 소량의 밝은 갈색 귀지만 있다. 강아지마다 귀지 생성량이 다르므로 주 1회 육안으로 확인하는 것만으로도 충분하다. 문제가 없으면 굳이 청소하지 않아도 된다 — 과도한 청소가 오히려 자극이 될 수 있다.</p>

<h2>2단계. 품종별 청소 주기 기준</h2>
<div class="key-summary">
<strong>📋 품종별 귀 청소 권장 주기</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-3-soft,#dfe9f3);">
<th style="padding:8px;border:1px solid var(--brand-border);">귀 유형</th>
<th style="padding:8px;border:1px solid var(--brand-border);">품종 예</th>
<th style="padding:8px;border:1px solid var(--brand-border);">주기</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">쫑긋 귀 (직립)</td><td style="padding:8px;border:1px solid var(--brand-border);">스피츠, 허스키, 진도</td><td style="padding:8px;border:1px solid var(--brand-border);">월 1~2회</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">늘어진 귀 (플롭)</td><td style="padding:8px;border:1px solid var(--brand-border);">비글, 코커스파니엘, 바셋하운드</td><td style="padding:8px;border:1px solid var(--brand-border);">주 1회</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">귀 내 털 많음</td><td style="padding:8px;border:1px solid var(--brand-border);">말티즈, 푸들, 시츄</td><td style="padding:8px;border:1px solid var(--brand-border);">주 1~2회</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">수영 자주 하는 개</td><td style="padding:8px;border:1px solid var(--brand-border);">래브라도, 골든리트리버</td><td style="padding:8px;border:1px solid var(--brand-border);">수영 후마다</td></tr>
</tbody></table>
</div>

<h2>3단계. 귀 청소 방법</h2>
<ol style="padding-left:1.2rem;">
<li><strong>세정제 준비</strong>: 반려동물 전용 이어 클리너 사용. 면봉 금지 — 오히려 이물질을 깊이 밀어넣을 수 있다.</li>
<li><strong>세정제 주입</strong>: 외이도에 세정제를 충분히 넣는다 (귀가 가득 찰 정도)</li>
<li><strong>귀 마사지</strong>: 귀 아래를 20~30초 부드럽게 주무른다 (귀지가 떠오름)</li>
<li><strong>강아지가 털도록</strong>: 머리를 흔들어 이물질이 나오게 둔다</li>
<li><strong>거즈로 닦기</strong>: 보이는 부분만 부드럽게 닦는다</li>
</ol>

<h2>자주 묻는 질문</h2>
<h3>외이염인데 집에서 치료해도 되나요?</h3>
<p>안 된다. 외이염은 원인균(세균, 효모, 진드기)에 따라 치료제가 다르다. 잘못된 연고를 사용하면 내성이 생기거나 증상이 악화될 수 있다. 분비물이 있으면 동물병원에서 도말 검사로 원인균을 확인하고 처방받는 것이 원칙이다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-otitis-externa-guide">강아지 외이염 — 원인·증상·치료·재발 예방까지</a><br>
<a href="/blog/dog-cat-dental-oral-health-guide">강아지·고양이 구강 건강 완전 가이드</a><br>
<a href="/blog/dog-health-checkup">강아지 건강검진 — 나이별 주기와 꼭 챙겨야 할 검사 항목</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "대한수의사회 반려동물 귀 건강 관리 자료",
      "AVMA(미국수의사협회) — 귀 청소 가이드라인",
      "농림축산검역본부 반려동물 건강관리 정보 qia.go.kr",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 수의학적 진단·처방을 대체하지 않습니다. 증상이 있으면 반드시 수의사와 상담하세요.",
    status: "published",
    publishedAt: "2026-06-06T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 279 / Cat1 / Macro-G(큐레이션) / Lens-L6(비판) / Hook-H4 / Outro-O4 / Angle-RA8
  {
    id: "blog-279",
    slug: "multi-dog-household-introduction-guide",
    type: "blog",
    category: 1,
    title: "다견 가정 강아지 합사 방법 — 첫 만남부터 공존까지 단계별 가이드",
    subtitle: "중성화 여부·성별·나이 조합별 주의사항, 첫 만남 장소 선택, 실패하는 이유와 예방",
    metaTitle: "다견 가정 강아지 합사 방법 단계별 가이드 | 펫지기",
    metaDescription: "강아지 두 마리 합사 시 첫 만남 장소, 중성화·성별·나이 조합별 주의사항, 단계별 적응 방법, 합사 실패 원인과 예방법을 정리했습니다.",
    body: `<p>흔히 "강아지는 강아지끼리 금방 친해진다"고 생각하지만, 잘못된 합사는 한 마리에게 심각한 트라우마를 남길 수 있다. ASPCA에 따르면 다견 가정에서 강아지 간 공격성 문제가 발생하는 비율은 약 35%에 달한다. 첫 만남 방법과 초기 며칠간의 관리가 장기 공존의 핵심이다.</p>

<div class="callout-cat">
<strong>합사 전 반드시 결정해야 할 것들</strong><br>
• 기존 개와 신규 개 모두 건강 검진 완료 여부<br>
• 각자의 공간(침대, 밥그릇, 장난감)이 분리 가능한지<br>
• 중성화 상태 — 미중성화 수컷끼리는 가장 어려운 조합<br>
• 가족 모두가 합사를 원하는지 (한 명이라도 반대면 위험 신호)
</div>

<h2>조합별 합사 난이도</h2>
<div class="key-summary">
<strong>📋 성별·중성화 조합별 합사 난이도</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-1-soft,#f4e1d6);">
<th style="padding:8px;border:1px solid var(--brand-border);">조합</th>
<th style="padding:8px;border:1px solid var(--brand-border);">난이도</th>
<th style="padding:8px;border:1px solid var(--brand-border);">주요 주의사항</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">암·수(중성화)</td><td style="padding:8px;border:1px solid var(--brand-border);">🟢 쉬움</td><td style="padding:8px;border:1px solid var(--brand-border);">성별 차이로 서열 갈등 적음</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">암·암(중성화)</td><td style="padding:8px;border:1px solid var(--brand-border);">🟡 보통</td><td style="padding:8px;border:1px solid var(--brand-border);">자원 경쟁 관리 필요</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">수·수(중성화)</td><td style="padding:8px;border:1px solid var(--brand-border);">🟡 보통</td><td style="padding:8px;border:1px solid var(--brand-border);">나이 차 3세 이상이면 수월</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">수·수(미중성화)</td><td style="padding:8px;border:1px solid var(--brand-border);">🔴 어려움</td><td style="padding:8px;border:1px solid var(--brand-border);">호르몬 경쟁, 전문가 도움 권장</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">성견 + 강아지</td><td style="padding:8px;border:1px solid var(--brand-border);">🟡 보통</td><td style="padding:8px;border:1px solid var(--brand-border);">강아지 에너지가 성견에 부담</td></tr>
</tbody></table>
</div>

<h2>첫 만남 — 중립 영역에서 시작한다</h2>
<p>첫 만남은 반드시 두 개 모두 처음 가는 중립 장소(공원, 강가)에서 해야 한다. 기존 개의 집이나 차 안은 이미 영역이 형성된 공간이라 공격성이 올라갈 수 있다. 리드줄을 착용한 상태로 나란히 산책하면서 자연스럽게 냄새를 맡도록 한다 — 억지로 대면시키지 않는다.</p>

<h2>합사 첫 1주 — 공간 분리 원칙</h2>
<ul>
<li><strong>식사 분리</strong>: 밥그릇을 시야 밖(다른 방)에서 따로 준다 — 가장 흔한 갈등 원인</li>
<li><strong>잠자리 분리</strong>: 초기 1~2주는 자는 공간도 분리</li>
<li><strong>혼자 있는 시간 관리</strong>: 외출 시 절대 함께 두지 않음 (갈등 위험)</li>
<li><strong>개별 관심 주기</strong>: 각자를 따로 불러서 간식·놀이 — 합사로 기존 개가 소외감 느끼지 않도록</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>으르렁거리면 혼내야 하나요?</h3>
<p>혼내면 안 된다. 으르렁거림은 "불편하다"는 경고 신호다. 이 신호를 억압하면 경고 없이 물게 된다. 으르렁거림이 보이면 두 개를 조용히 분리하고 에너지가 낮아질 때를 기다렸다가 다시 시도한다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/cat-dog-cohabitation-guide">강아지와 고양이 합사 — 첫 만남부터 공존까지 단계별 가이드</a><br>
<a href="/blog/dog-separation-anxiety-prevention-guide">강아지 분리불안 예방 가이드</a><br>
<a href="/blog/multi-pet-insurance-strategy">다묘·다견 가정 펫보험 전략</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA — 다견 가정 공격성 및 합사 행동 가이드",
      "대한수의사회 반려동물 행동 상담 자료",
      "American Veterinary Society of Animal Behavior (AVSAB) 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-06T12:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 280 / Cat1 / Macro-E(비교) / Lens-L2(비교) / Hook-H2(stat) / Outro-O2 / Angle-RA4
  {
    id: "blog-280",
    slug: "small-pet-rabbit-hamster-first-guide",
    type: "blog",
    category: 1,
    title: "토끼·햄스터·기니피그 처음 키우기 — 소동물 입양 전 비교 가이드",
    subtitle: "수명·비용·돌봄 시간·냄새·소음 5가지 기준으로 보호자 상황에 맞는 소동물 선택",
    metaTitle: "토끼 햄스터 기니피그 첫 입양 비교 가이드 | 펫지기",
    metaDescription: "토끼, 햄스터, 기니피그의 수명, 월 비용, 돌봄 시간, 냄새·소음 수준을 비교해 처음 소동물을 키우는 보호자를 위한 선택 가이드.",
    body: `<p>2023년 농림축산식품부 동물보호 실태조사에 따르면 국내 소동물(개·고양이 외) 양육 가구가 전체 반려동물 가구의 약 12%를 차지한다. 그러나 소동물 입양 전 준비 정보는 개·고양이에 비해 크게 부족하다. 이 글에서는 소동물 입문자에게 가장 많이 선택되는 세 동물을 실질적인 기준으로 비교한다.</p>

<div class="callout-cat">
<strong>"작으니까 쉽겠지"는 오해</strong><br>
소동물은 몸집이 작지만 돌봄의 복잡성이 낮지 않다. 특히 토끼와 기니피그는 수의사를 찾기 어렵고, 응급 상황 시 24시간 전문 병원이 제한적이다.
</div>

<div class="key-summary">
<strong>📊 소동물 3종 비교표</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-1-soft,#f4e1d6);">
<th style="padding:8px;border:1px solid var(--brand-border);">항목</th>
<th style="padding:8px;border:1px solid var(--brand-border);">토끼</th>
<th style="padding:8px;border:1px solid var(--brand-border);">햄스터</th>
<th style="padding:8px;border:1px solid var(--brand-border);">기니피그</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">평균 수명</td><td style="padding:8px;border:1px solid var(--brand-border);">8~12년</td><td style="padding:8px;border:1px solid var(--brand-border);">2~3년</td><td style="padding:8px;border:1px solid var(--brand-border);">4~7년</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">월 비용 (사료·용품)</td><td style="padding:8px;border:1px solid var(--brand-border);">5~10만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">2~4만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">5~8만 원</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">활동 시간대</td><td style="padding:8px;border:1px solid var(--brand-border);">새벽·저녁</td><td style="padding:8px;border:1px solid var(--brand-border);">야행성 (밤)</td><td style="padding:8px;border:1px solid var(--brand-border);">주행성 (낮)</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">냄새</td><td style="padding:8px;border:1px solid var(--brand-border);">약 (청결 관리 시)</td><td style="padding:8px;border:1px solid var(--brand-border);">강 (빈번한 청소 필요)</td><td style="padding:8px;border:1px solid var(--brand-border);">중간</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">사회성</td><td style="padding:8px;border:1px solid var(--brand-border);">높음 (혼자 가능)</td><td style="padding:8px;border:1px solid var(--brand-border);">낮음 (독거)</td><td style="padding:8px;border:1px solid var(--brand-border);">높음 (2마리 이상 권장)</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">전용 수의사</td><td style="padding:8px;border:1px solid var(--brand-border);">일부 병원</td><td style="padding:8px;border:1px solid var(--brand-border);">일부 병원</td><td style="padding:8px;border:1px solid var(--brand-border);">일부 병원</td></tr>
</tbody></table>
</div>

<h2>상황별 추천</h2>
<ul>
<li><strong>아이가 있는 가정</strong>: 기니피그 — 낮에 활동하고 사회적이며 물 확률 낮음. 단, 기니피그는 최소 2마리 이상 권장(사회성 동물)</li>
<li><strong>직장인·1인 가구</strong>: 햄스터 — 작은 공간에서 독립적으로 살고, 밤에 활동해 저녁 시간에 관찰 가능. 수명이 짧아 장기 헌신 부담 낮음</li>
<li><strong>장기적 유대를 원하는 경우</strong>: 토끼 — 수명이 길고 개성이 뚜렷, 이름을 인식하고 훈련도 가능. 그러나 돌봄 수준이 가장 높음</li>
</ul>

<h2>소동물 입양 전 필수 확인</h2>
<ul>
<li>근처에 소동물 진료 가능한 수의사가 있는지 미리 확인</li>
<li>알레르기 가족이 있는지 (토끼·햄스터 털 알레르기 흔함)</li>
<li>여행·출장 시 돌봐줄 사람이 있는지</li>
<li>아이가 있다면 과격하게 다룰 위험 있는지 평가</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>햄스터는 혼자 키워도 외롭지 않나요?</h3>
<p>황금 햄스터(시리안)는 자연에서도 독거 동물이다. 두 마리를 같이 두면 오히려 싸워서 다치는 경우가 많다. 로보로프스키 햄스터는 쌍으로 키울 수 있지만 성격에 따라 다르다. 황금 햄스터는 혼자 키우는 것이 원칙이다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-adoption-impulse-check-5-questions">강아지 입양 전 꼭 물어봐야 할 현실 질문 5가지</a><br>
<a href="/blog/pet-contract-adoption-guide">반려동물 분양·입양 계약서 작성법</a><br>
<a href="/blog/animal-registration-change-cancel-guide">동물등록 변경·말소 신청 방법</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "농림축산식품부 동물보호 실태조사 2023 — 소동물 양육 현황",
      "AVMA(미국수의사협회) 소동물 돌봄 가이드",
      "대한수의사회 특수동물 진료 안내",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-06T13:00:00.000Z",
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
  console.log("블로그 포스트 31차 시딩 완료! (blog-276 ~ blog-280)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
