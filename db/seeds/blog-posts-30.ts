import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 30 — 5편 (IDs 271-275)
// cat3×1(목표60편달성) + cat1×1 + cat2×1 + cat4×1 + cat6×1
// Macros: A, F, G, E, B — batch 29(A/C/G/B/F/E) 기준 분산
// Angles: RA5, RA3, RA8, RA4, RA7

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 271 / Cat3 / Macro-A(포괄) / Lens-L1(역사) / Hook-H2(stat) / Outro-O2 / Angle-RA5
  // cat3 60번째 글 — 목표 달성
  {
    id: "blog-271",
    slug: "dog-cat-dental-oral-health-guide",
    type: "blog",
    category: 3,
    title: "강아지·고양이 구강 건강 완전 가이드 — 칫솔질·스케일링·구취 원인까지",
    subtitle: "반려동물 치과 질환 발생률, 칫솔질 시작하는 방법, 스케일링 주기, 집에서 할 수 있는 관리",
    metaTitle: "강아지 고양이 구강 건강 관리 완전 가이드 | 펫지기",
    metaDescription: "반려동물 치과 질환 예방을 위한 칫솔질 방법, 스케일링 적정 주기, 치석 예방 간식, 구취 원인별 대처법을 정리했습니다.",
    body: `<p>국내 3세 이상 반려견의 약 80%, 고양이의 약 70%가 어느 정도의 치주 질환을 가지고 있다는 연구가 있다(대한수의치과학회). 그러나 매일 칫솔질을 하는 보호자는 전체의 10% 미만이다. 구강 건강이 나빠지면 치통·치은염뿐 아니라 세균이 혈류를 타고 심장·신장·간에 영향을 줄 수 있다. 이 글은 반려동물 구강 관리의 전체 흐름을 정리한다.</p>

<div class="callout-cat">
<strong>구강 관리의 가장 효과적인 방법은 순서대로</strong><br>
1위: 매일 칫솔질 / 2위: 덴탈 간식·장난감 / 3위: 정기 스케일링<br>
칫솔질이 전혀 없다면 스케일링만으로는 한계가 있다.
</div>

<h2>치주 질환이 진행되는 과정</h2>
<p>음식물 → 플라크(세균막) 형성 → 24~48시간 내 치석으로 굳음 → 치은염(잇몸 염증) → 치주염(뼈 손상) → 발치. 이 사이클이 빠르면 수개월 만에 발치가 필요한 상태가 될 수 있다. 플라크 단계에서 칫솔질로 제거하는 것이 가장 효과적이다.</p>

<h2>칫솔질 — 언제, 어떻게 시작할까</h2>
<p>어린 나이일수록 거부감이 적다. 성견·성묘도 단계적으로 익숙해지게 할 수 있다.</p>

<div class="key-summary">
<strong>📋 단계별 칫솔질 적응 방법 (2~4주 소요)</strong>
<ol style="padding-left:1.2rem;margin-top:0.5rem;">
<li><strong>1주차</strong>: 손가락으로 잇몸을 부드럽게 마사지 (치약 없이)</li>
<li><strong>2주차</strong>: 손가락에 반려동물 전용 치약 묻혀 잇몸 마사지</li>
<li><strong>3주차</strong>: 손가락칫솔로 바깥 앞니부터 닦기 시작</li>
<li><strong>4주차 이후</strong>: 일반 반려동물 칫솔로 전체 닦기</li>
</ol>
</div>

<p><strong>주의</strong>: 사람용 치약에는 자일리톨이 포함된 경우가 많아 반려동물에게 치명적이다. 반드시 반려동물 전용 치약을 사용한다.</p>

<h2>스케일링 — 언제, 얼마나 자주</h2>
<p>마취 스케일링은 치석이 쌓인 정도와 치주 상태에 따라 주기가 달라진다. 일반적인 권장 기준은 다음과 같다:</p>
<ul>
<li>매일 칫솔질 + 치석 경미: 1~2년에 1회</li>
<li>가끔 칫솔질 + 치석 중간: 6개월~1년에 1회</li>
<li>칫솔질 없음 + 치석 심함: 연 2회 이상 또는 수시</li>
</ul>

<div class="callout-cat">
<strong>마취 스케일링의 안전성</strong><br>
일부 보호자가 마취를 걱정하지만, 마취 없이 하는 스케일링(어웨이크 스케일링)은 잇몸 아래 치석 제거가 불가능해 효과가 제한적이다. 사전 혈액검사·마취 모니터링 체계를 갖춘 병원에서는 마취 위험이 매우 낮다.
</div>

<h2>구취 원인과 대처</h2>
<ul>
<li><strong>치석·치주 질환</strong>: 가장 흔한 원인. 칫솔질·스케일링으로 해결</li>
<li><strong>신장 질환</strong>: 암모니아 냄새. 혈액 검사로 확인 필요</li>
<li><strong>당뇨</strong>: 단 냄새 또는 아세톤 냄새. 혈당 검사 필요</li>
<li><strong>소화기 문제</strong>: 역류나 식도 문제. 구토 여부와 함께 확인</li>
</ul>

<h2>집에서 할 수 있는 추가 관리</h2>
<ul>
<li><strong>덴탈 껌·장난감</strong>: VOHC(수의구강건강위원회) 인증 제품 선택 권장</li>
<li><strong>물 첨가 구강 세정제</strong>: 음용수에 소량 첨가하는 방식. 칫솔질 보조 역할</li>
<li><strong>치아 와이프</strong>: 칫솔질 거부하는 경우 대안. 효과는 칫솔질보다 낮음</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>치석이 이미 많이 쌓였는데 칫솔질해도 의미가 있나요?</h3>
<p>치석(굳은 상태)은 칫솔질로 제거되지 않는다. 먼저 스케일링으로 치석을 제거한 뒤, 그 이후부터 칫솔질로 재축적을 막는 것이 올바른 순서다.</p>

<h3>고양이는 칫솔질을 거부하는 경우가 많은데 어떻게 하나요?</h3>
<p>고양이는 특히 칫솔질 적응이 어렵다. 손가락으로 마사지하는 1단계부터 매우 천천히 진행하고, 칫솔을 거부하면 덴탈 간식이나 물 세정제로 보완한다. 강제하면 오히려 공격성이 생겨 장기적으로 더 어려워진다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-dental-scaling-guide">강아지 치석 스케일링 완전 가이드 — 주기·마취·비용·주의사항</a><br>
<a href="/blog/dog-toxic-foods">강아지에게 줘도 되는 채소·과일 vs 위험한 것</a><br>
<a href="/blog/dog-health-checkup">강아지 건강검진 — 나이별 주기와 꼭 챙겨야 할 검사 항목</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "대한수의치과학회 반려동물 치주 질환 유병률 자료",
      "VOHC(수의구강건강위원회) 인증 제품 기준",
      "대한수의사회 반려동물 구강 관리 가이드",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 수의학적 진단·처방을 대체하지 않습니다. 증상이 있으면 반드시 수의사와 상담하세요.",
    status: "published",
    publishedAt: "2026-06-05T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 272 / Cat1 / Macro-F(절차) / Lens-L4(process) / Hook-H3(scene) / Outro-O1 / Angle-RA3
  {
    id: "blog-272",
    slug: "pet-moving-new-home-adaptation",
    type: "blog",
    category: 1,
    title: "반려동물과 이사하기 — 새 집 적응을 돕는 단계별 가이드",
    subtitle: "이사 전 준비, 이동 중 스트레스 최소화, 새 집 탐색 순서, 적응 실패 신호",
    metaTitle: "반려동물 이사 적응 방법 완전 가이드 | 펫지기",
    metaDescription: "반려동물과 이사할 때 이사 전 준비, 이동 중 스트레스 관리, 새 집 적응 단계별 방법, 적응 실패 신호를 정리했습니다.",
    body: `<p>이삿날 아침, 짐을 빼는 내내 강아지가 구석에서 떨고 있었다. 낯선 사람들과 소음, 사라지는 짐들 — 강아지 입장에서는 재난과 다르지 않다. 반려동물은 공간과의 연결이 강해서 이사가 큰 스트레스로 작용한다. 이 글은 이사 전부터 새 집 적응까지 단계별 방법을 정리한다.</p>

<div class="callout-cat">
<strong>이사 스트레스 신호 — 이것이 보이면 특별 케어가 필요하다</strong><br>
• 밥을 3일 이상 거의 먹지 않는 경우<br>
• 숨기만 하고 놀이·산책에 반응하지 않는 경우<br>
• 집 안에서 마킹·배변 실수가 갑자기 늘어나는 경우<br>
• 과도한 그루밍 또는 자해 행동
</div>

<h2>1단계. 이사 2주 전 — 냄새 준비</h2>
<p>새 집의 냄새가 익숙한 '자기 영역'처럼 느껴지도록 준비한다. 기존 집에서 쓰던 담요, 쿠션, 장난감을 새 집에 먼저 가져다 두면 이미 자기 냄새가 배어 있어 적응이 빨라진다. 이삿날 최소 1~2일 전에 반려동물의 침구·밥그릇을 새 집에 옮겨두는 것도 좋다.</p>

<h2>2단계. 이삿날 — 스트레스 최소화</h2>
<ul>
<li><strong>분리 공간 확보</strong>: 이사 작업이 진행되는 동안 반려동물을 조용한 방에 격리한다. 문에 "반려동물 있음" 표시를 붙여 작업자가 실수로 문을 열지 않도록</li>
<li><strong>익숙한 사람이 함께</strong>: 가능하면 신뢰하는 가족이 반려동물 곁에 있어주는 것이 좋다</li>
<li><strong>이동 시 켄넬 사용</strong>: 차량 이동 시 켄넬에 넣어 안정감을 주고, 장거리라면 중간에 휴식·수분 보충</li>
</ul>

<h2>3단계. 새 집 첫날 — 탐색 순서 조절</h2>
<p>새 집 전체를 한꺼번에 풀어주지 않는다. 처음에는 한두 개 방만 열어두고, 반려동물이 그 공간에 편안해지면 점차 공간을 넓혀간다. 강아지는 보호자를 따라다니며 탐색하는 것을 좋아하므로 함께 천천히 돌아다녀 준다. 고양이는 자발적으로 탐색하도록 두고, 숨을 수 있는 공간(켄넬, 침대 아래)을 확보해주는 것이 중요하다.</p>

<div class="key-summary">
<strong>📋 새 집 적응 체크리스트 (1~2주)</strong>
<ul style="margin-top:0.5rem;">
<li>☐ 밥그릇·물그릇·화장실은 기존과 같은 위치 규칙으로 배치</li>
<li>☐ 기존 담요·쿠션을 새 집에서도 사용</li>
<li>☐ 산책 루틴 유지 (강아지의 경우 새 동네 탐색 천천히)</li>
<li>☐ 방문객 초대는 적응 1~2주 후로 연기</li>
<li>☐ 페로몬 디퓨저(Adaptil·Feliway) 활용 검토</li>
</ul>
</div>

<h2>4단계. 1~2주 후 — 루틴 복구</h2>
<p>가장 빠른 적응 방법은 기존 루틴을 새 집에서 그대로 재현하는 것이다. 밥 주는 시간, 산책 시간, 놀이 시간이 일정하면 새 공간에서도 빠르게 안정감을 찾는다.</p>

<h2>자주 묻는 질문</h2>
<h3>고양이가 며칠째 숨어서 나오지 않아요</h3>
<p>고양이는 이사 후 1~2주 동안 숨는 것이 정상이다. 강제로 꺼내지 않고, 밥·물·화장실을 숨는 곳 근처에 두고 기다린다. 5일 이상 전혀 먹지 않는다면 수의사에게 상담한다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-separation-anxiety-prevention-guide">강아지 분리불안 예방 가이드</a><br>
<a href="/blog/animal-registration-change-cancel-guide">동물등록 변경·말소 신청 방법 — 이사 시 주소 변경</a><br>
<a href="/blog/apartment-pet-dispute-guide">아파트에서 반려동물로 인한 분쟁 — 법적 기준과 해결 방법</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA — 반려동물 이사 스트레스 관리 가이드",
      "대한수의사회 반려동물 행동 문제 자료",
      "Feliway 고양이 페로몬 제품 임상 연구 (CEVA)",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-05T10:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 273 / Cat2 / Macro-G(큐레이션) / Lens-L6(비판) / Hook-H4(contrast) / Outro-O4 / Angle-RA8
  {
    id: "blog-273",
    slug: "dog-forbidden-fruits-nuts-complete-list",
    type: "blog",
    category: 2,
    title: "강아지 먹으면 안 되는 과일·견과류 완전 목록 — 독성 원인과 증상까지",
    subtitle: "포도·자두·마카다미아 등 위험 식품, 소량도 위험한 것 vs 소량은 괜찮은 것 구별",
    metaTitle: "강아지 먹으면 안 되는 과일 견과류 독성 목록 | 펫지기",
    metaDescription: "강아지에게 위험한 과일과 견과류 종류, 독성 원인, 섭취 시 증상, 소량도 위험한 것과 소량은 괜찮은 것의 구별법을 정리했습니다.",
    body: `<p>흔히 "포도는 안 된다"는 건 알면서도, 자두나 살구는 괜찮다고 생각하는 보호자가 많다. 실제로 자두·살구의 씨앗에는 청산배당체가 포함되어 강아지에게 치명적일 수 있다. 과일과 견과류는 사람에게 건강한 음식이어도 강아지에게는 다른 기준이 적용된다. 이 글은 강아지에게 위험한 과일·견과류를 독성 원인까지 포함해 정리한다.</p>

<div class="callout-cat">
<strong>의심스러우면 주지 않는 것이 원칙</strong><br>
"조금은 괜찮겠지"는 가장 위험한 생각이다. 아래 목록에 없는 과일·견과류도 처음 줄 때는 소량부터 시작하고 반응을 확인한다.
</div>

<h2>절대 주면 안 되는 과일 — 소량도 위험</h2>

<ul>
<li><strong>포도·건포도·건크랜베리(포도 계열)</strong>: 신부전 유발. 독성 성분이 아직 완전히 규명되지 않아 '안전한 양'이 없다. 소량이라도 즉시 동물병원.</li>
<li><strong>자두·살구·복숭아·체리 (씨앗 포함 시)</strong>: 씨앗·줄기·잎에 청산배당체(시아노겐) 포함. 과육만은 소량 가능하나 씨앗·핵 절대 금지.</li>
<li><strong>무화과</strong>: 피신(ficin) 성분이 소화기·피부 자극. 구토·설사·피부 발진 유발 가능.</li>
</ul>

<div class="key-summary">
<strong>📋 과일·견과류 위험도 분류</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-2-soft,#f6e6cd);">
<th style="padding:8px;border:1px solid var(--brand-border);">식품</th>
<th style="padding:8px;border:1px solid var(--brand-border);">위험도</th>
<th style="padding:8px;border:1px solid var(--brand-border);">주요 독성/이유</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">포도·건포도</td><td style="padding:8px;border:1px solid var(--brand-border);">🔴 매우 위험</td><td style="padding:8px;border:1px solid var(--brand-border);">신부전 (성분 미규명)</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">마카다미아</td><td style="padding:8px;border:1px solid var(--brand-border);">🔴 매우 위험</td><td style="padding:8px;border:1px solid var(--brand-border);">신경 독소, 근육 마비</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">자두·살구 씨앗</td><td style="padding:8px;border:1px solid var(--brand-border);">🔴 매우 위험</td><td style="padding:8px;border:1px solid var(--brand-border);">청산배당체</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">호두(특히 검은 호두)</td><td style="padding:8px;border:1px solid var(--brand-border);">🟠 위험</td><td style="padding:8px;border:1px solid var(--brand-border);">신경 독소, 곰팡이 독소</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">아보카도</td><td style="padding:8px;border:1px solid var(--brand-border);">🟠 위험</td><td style="padding:8px;border:1px solid var(--brand-border);">퍼신(persin) — 구토·설사</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">레몬·라임·자몽</td><td style="padding:8px;border:1px solid var(--brand-border);">🟡 주의</td><td style="padding:8px;border:1px solid var(--brand-border);">시트르산·리모넨 — 소화 자극</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">사과(씨앗 제거)</td><td style="padding:8px;border:1px solid var(--brand-border);">🟢 소량 가능</td><td style="padding:8px;border:1px solid var(--brand-border);">씨앗에만 청산배당체</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">수박(씨앗·껍질 제거)</td><td style="padding:8px;border:1px solid var(--brand-border);">🟢 소량 가능</td><td style="padding:8px;border:1px solid var(--brand-border);">과육만 안전</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">땅콩(무염·무설탕)</td><td style="padding:8px;border:1px solid var(--brand-border);">🟢 소량 가능</td><td style="padding:8px;border:1px solid var(--brand-border);">고지방이라 소량만</td></tr>
</tbody></table>
</div>

<h2>마카다미아 — 견과류 중 가장 위험</h2>
<p>마카다미아는 강아지에게 특히 독성이 강하다. 소량(체중 1kg당 1g)만으로도 근육 마비, 고열, 떨림, 구토 증상이 나타날 수 있다. 음식 선물·쿠키·아이스크림에 마카다미아가 포함된 경우가 많으므로 주의한다.</p>

<h2>섭취 후 이런 증상이 나타나면 즉시 동물병원으로</h2>
<ul>
<li>구토·설사가 반복되는 경우</li>
<li>무기력·떨림·경련이 있는 경우</li>
<li>소변량이 갑자기 줄거나 소변 색이 짙어진 경우 (신부전 신호)</li>
<li>복부 팽창·통증이 있는 경우</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>아이가 포도 한 알을 먹었어요. 어떻게 해야 하나요?</h3>
<p>즉시 동물병원에 연락한다. 포도는 소량도 신부전을 유발할 수 있으며, 개체에 따라 민감도 차이가 크다. "한 알이니까 괜찮겠지"는 위험한 판단이다. 섭취 후 2시간 이내라면 구토 유도 치료가 가능하므로 빠를수록 좋다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-toxic-foods">강아지에게 줘도 되는 채소·과일 vs 위험한 것</a><br>
<a href="/blog/dog-toxic-substance-emergency">강아지 독성 물질 섭취 — 응급 처치와 해서는 안 되는 것</a><br>
<a href="/blog/dog-pancreatitis-symptoms-diet">강아지 췌장염 — 기름진 음식 먹은 뒤 구토·복통이 계속된다면</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA Animal Poison Control Center — 반려동물 독성 식품 목록",
      "대한수의사회 반려동물 중독 사례 자료",
      "농림축산검역본부 반려동물 안전 먹이 정보 qia.go.kr",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-05T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 274 / Cat4 / Macro-E(비교) / Lens-L3(인과) / Hook-H1(question) / Outro-O2 / Angle-RA4
  {
    id: "blog-274",
    slug: "pet-online-purchase-consumer-rights",
    type: "blog",
    category: 4,
    title: "반려동물 용품·사료 온라인 구매 피해 예방 — 소비자 권리와 환불 기준",
    subtitle: "유통기한 오류·불량 상품·허위광고 피해 시 환불 청구 방법·신고 기관·주의 체크리스트",
    metaTitle: "반려동물 용품 사료 온라인 구매 소비자 권리 환불 가이드 | 펫지기",
    metaDescription: "반려동물 사료·용품 온라인 구매 시 유통기한 오류, 불량 상품, 허위광고 피해 발생 시 환불 기준, 신고 방법, 예방 체크리스트를 정리했습니다.",
    body: `<p>반려동물 용품 온라인 거래가 늘어나면서 피해도 증가하고 있다. 한국소비자원에 따르면 반려동물 용품 관련 소비자 상담 건수는 연 3만 건을 상회한다. 유통기한이 임박한 사료, 허위 인증 표시 간식, 결제 후 배송 지연 등이 주요 피해 유형이다. 이 글에서는 사전 예방법과 피해 발생 시 대처법을 정리한다.</p>

<div class="callout-cat">
<strong>전자상거래법상 7일 청약 철회 권리</strong><br>
온라인 구매한 반려동물 용품은 수령 후 7일 이내에 이유 없이 반품·환불이 가능하다(전자상거래법 제17조). 단, 식품·사료는 개봉 시 반품 거절 가능 — 개봉 전 이물질·유통기한 확인이 중요하다.
</div>

<h2>자주 발생하는 피해 유형</h2>

<h3>유형 1 — 유통기한 임박·초과 사료</h3>
<p>온라인 대형 마켓에서 저렴하게 구매한 사료가 유통기한이 한 달도 남지 않은 경우가 있다. 이는 소비자기본법상 사업자의 고지 의무 위반에 해당한다. 수령 즉시 유통기한을 확인하고, 임박 또는 초과 시 구매 사이트 고객센터에 신고하면 전액 환불이 가능하다.</p>

<h3>유형 2 — 허위·과장 광고</h3>
<p>"수의사 추천", "AAFCO 인증"이라는 표현이 있어도 실제 인증 여부를 제품 자체에서 확인해야 한다. 식품표시법상 인증 없이 인증 표현을 사용하면 공정거래위원회 신고 대상이다.</p>

<div class="key-summary">
<strong>📋 온라인 구매 전 체크리스트</strong>
<ul style="margin-top:0.5rem;">
<li>☐ 판매자 사업자 정보 확인 (통신판매업 신고 여부)</li>
<li>☐ 최근 1~3개월 구매 후기의 유통기한 관련 불만 확인</li>
<li>☐ 반품·환불 정책 사전 확인 (식품류 개봉 후 환불 여부)</li>
<li>☐ 수령 직후 박스 개봉 전 상태 사진 촬영 (피해 증거)</li>
<li>☐ 유통기한 위치 확인 후 개봉</li>
</ul>
</div>

<h2>피해 발생 시 단계별 대처</h2>
<ol style="padding-left:1.2rem;">
<li><strong>증거 확보</strong>: 수령 박스·제품 상태·유통기한을 사진으로 촬영</li>
<li><strong>판매자에게 연락</strong>: 구매 플랫폼 내 1:1 문의 또는 전화로 환불 요청 (7일 이내)</li>
<li><strong>거절 시 분쟁 조정 신청</strong>: 한국소비자원 전자상거래 분쟁 조정(1372.go.kr)</li>
<li><strong>허위광고는 별도 신고</strong>: 공정거래위원회(ftc.go.kr) 또는 식품의약품안전처(mfds.go.kr)</li>
</ol>

<h2>수입 사료 구매 시 추가 주의사항</html2>
<p>해외 직구 사료는 국내 식품 안전 검사를 통과하지 않았을 수 있다. 국내 통관된 정식 수입 사료인지 확인하려면 식품의약품안전처 수입식품 정보마루(impfood.mfds.go.kr)에서 수입 내역을 조회할 수 있다.</p>

<h2>자주 묻는 질문</h2>
<h3>이미 일부 먹인 사료에서 이물질이 발견됐어요. 환불이 가능한가요?</h3>
<p>가능하다. 이물질 발견 즉시 사진을 촬영하고, 남은 사료를 밀봉해 보관한다. 판매자에게 환불 요청 후 거절 시 한국소비자원을 통해 조정 신청한다. 반려동물이 이물질을 섭취했다면 즉시 동물병원에서 확인받고 진단서를 받아두는 것이 중요하다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-consumer-rights-guide">반려동물 소비자 권리 — 분쟁·환불·민원 처리 완전 가이드</a><br>
<a href="/blog/dog-food-storage-guide">강아지 사료 올바른 보관법 — 산화·곰팡이 막는 실전 방법</a><br>
<a href="/blog/dog-toxic-foods">강아지에게 줘도 되는 채소·과일 vs 위험한 것</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "전자상거래 등에서의 소비자보호에 관한 법률 제17조 — 청약 철회",
      "한국소비자원 반려동물 용품 피해 상담 현황 2023",
      "공정거래위원회 온라인 허위광고 신고 안내",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-05T12:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 275 / Cat6 / Macro-B(즉답) / Lens-L5(사례) / Hook-H1 / Outro-O3 / Angle-RA7
  {
    id: "blog-275",
    slug: "petloss-telling-others-how-to",
    type: "blog",
    category: 6,
    title: "반려동물을 잃은 후 주변에 알리는 방법 — 말하기 어려울 때 도움 받는 법",
    subtitle: "직장·지인·SNS에 알리는 방식, 공감받지 못했을 때 대처, 혼자 감당하지 않아도 되는 이유",
    metaTitle: "반려동물 사망 주변에 알리는 방법 — 공감받기 어려울 때 | 펫지기",
    metaDescription: "반려동물을 잃었을 때 주변에 알리는 방법, 공감받지 못했을 때 대처법, 도움받을 수 있는 커뮤니티와 상담 채널을 정리했습니다.",
    body: `<p class="aeo-answer" style="border-left:3px solid var(--cat-6,#b89968);padding-left:0.75rem;margin-bottom:1rem;">반려동물을 잃었을 때 주변에 알리는 것이 도움이 된다. 그러나 많은 보호자가 "고작 동물인데 슬퍼한다고 이상하게 보지 않을까" 하는 걱정에 혼자 감당한다. 이 글에서는 알리는 방법, 공감받지 못했을 때의 대처, 도움받을 수 있는 채널을 정리한다.</p>

<div class="callout-cat">
<strong>혼자 감당할 필요가 없다</strong><br>
펫로스는 가족을 잃는 것과 같은 깊이의 슬픔이다. 그 슬픔을 공유하는 것은 약한 것이 아니라, 회복에 도움이 된다는 연구가 있다(Grief &amp; Bereavement Research, 2020).
</div>

<h2>직장 동료에게 알릴 때</h2>
<p>굳이 상세하게 설명할 필요는 없다. 짧게 "최근에 오래 키우던 반려동물을 잃어서 좀 힘든 시간을 보내고 있어요"라고만 해도 충분하다. 설명을 원하는 사람에게는 더 이야기할 수 있고, 그냥 넘어가고 싶으면 그것도 괜찮다. 공감받지 못하더라도, 말로 꺼내는 것 자체가 슬픔을 조금 밖으로 내보내는 역할을 한다.</p>

<h2>공감받지 못했을 때</h2>
<p>"그냥 동물인데", "새로 사면 되잖아"라는 반응이 돌아올 때 더 상처받는 보호자가 있다. 이런 말은 상대의 무지에서 나오는 경우가 대부분이다. 그 반응에 대해 설명하거나 설득할 의무는 없다. 공감해줄 수 없는 사람에게 더 이야기하지 않아도 된다 — 공감을 줄 수 있는 다른 채널을 찾는 것이 더 도움이 된다.</p>

<h2>SNS에 올리는 것의 장단점</h2>
<p>SNS에 반려동물 부고를 올리면 예상보다 많은 위로가 돌아오는 경우가 있다. 같은 경험을 가진 사람들이 연결되기도 한다. 반면, 가볍게 지나치는 반응이나 무관심이 오히려 더 외롭게 느껴질 수 있다. SNS 공유는 본인이 원하는 경우에만, 원하는 방식으로 한다.</p>

<h2>공감받을 수 있는 채널 찾기</h2>
<ul>
<li><strong>온라인 펫로스 커뮤니티</strong>: 같은 경험을 한 보호자들이 모여 있는 카페나 오픈 카톡방. "펫로스"로 검색하면 찾을 수 있다</li>
<li><strong>보건복지부 정신건강복지센터</strong>: 1577-0199. 슬픔 관련 무료 전화 상담 가능</li>
<li><strong>지자체 반려동물 문화센터</strong>: 일부 지자체에서 펫로스 상담 프로그램 운영</li>
<li><strong>SNS 펫로스 해시태그</strong>: #펫로스 #무지개다리 — 같은 슬픔을 공유하는 사람들과 연결</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>주변에서 "새 강아지 입양하면 낫지 않겠어?" 라고 합니다</h3>
<p>이 말은 위로의 의도로 하는 경우가 많지만, 받아들이기 힘들 수 있다. 이런 말을 들었을 때 "지금은 아직 그 준비가 안 됐어요"라고 짧게 답하고 대화를 마무리해도 된다. 새 입양 시기는 오롯이 본인이 결정할 수 있다.</p>

<p>슬픔을 공유하는 것이 그 슬픔을 작게 만들지는 않는다. 하지만 혼자 짊어지는 것보다는 나눌 때, 조금 더 버틸 수 있는 경우가 많다. 지금 슬픔을 표현하고 싶다면, 그 방법은 어떤 것이라도 괜찮다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/petloss-return-to-daily-life">펫로스 후 일상으로 돌아가기 — 직장과 사회생활을 다시 시작하는 방법</a><br>
<a href="/blog/petloss-recovery-guide">펫로스 증후군 극복 가이드 — 슬픔을 통과하는 법</a><br>
<a href="/blog/child-pet-death-explanation">아이에게 반려동물의 죽음 설명하는 법</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Grief & Bereavement Research (2020) — 사회적 지지와 슬픔 회복",
      "한국애도상담학회 — 펫로스 공유와 회복 관련 자료",
      "보건복지부 정신건강복지센터 1577-0199",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 및 회복 지원 목적이며, 전문 심리상담을 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-06-05T13:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

];

async function seed() {
  for (const post of BLOG_POSTS) {
    await db
      .insert(contents)
      .values(post)
      .onConflictDoUpdate({
        target: contents.slug,
        set: { ...post, updatedAt: NOW },
      });
    console.log(`✅ ${post.slug}`);
  }
  console.log("블로그 포스트 30차 시딩 완료! (blog-271 ~ blog-275)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
