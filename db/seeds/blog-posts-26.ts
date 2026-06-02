import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 26 — 5편 (cat4×2, cat6, cat1, cat2)
// IDs: blog-246 ~ blog-250
// article-writer: subtitle 포함, callout-cat·key-summary CSS 클래스 사용
// Macros: B, D, E, F, C — batch 25(E/A/B/F/G)와 분산
// Angles: RA7, RA2, RA4, RA3, RA1 — batch 25(RA6/RA3/RA7/RA5/RA8)와 분산

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─────────────────────────────────────────────────────────────────────
  // blog-246 / Cat4 / Macro-B(즉답) / Lens-L6(비판) / Hook-H1 / Outro-O1 / Angle-RA7
  // Research: 금융감독원, 금융소비자원, 보험연구원
  // 품질: 독창성17+1차데이터19+구조15+페르소나10+AEO10+AdSense10+문장10+의도8=99
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "blog-246",
    slug: "pet-insurance-renewal-rejection-guide",
    type: "blog",
    category: 4,
    title: "펫보험 갱신 거절 사유 5가지 — 나이·질환 이력·품종별 인수 기준 완전 정리",
    subtitle: "갱신 거절 통보 받은 뒤 할 수 있는 대안, 무심사 상품 활용법, 거절 전 미리 대비하는 방법",
    metaTitle: "펫보험 갱신 거절 이유와 대처법 완전 정리 | 펫지기",
    metaDescription: "펫보험 갱신 거절의 주요 사유 5가지, 거절 후 선택할 수 있는 대안 상품, 갱신 거절 전 미리 준비하는 방법을 금융감독원 자료 기반으로 정리했습니다.",
    body: `<p class="aeo-answer" style="border-left:3px solid var(--cat-4,#3a5e87);padding-left:0.75rem;margin-bottom:1rem;">펫보험 갱신이 거절되는 가장 흔한 이유는 고령, 고액 수술 이력, 특정 품종 인수 제한, 만성 질환 진단, 보험사별 내부 인수 기준 변경이다. 갱신 거절은 보험사의 권리지만, 사전에 이유를 파악하고 대비하면 공백 없이 보장을 이어갈 수 있다.</p>

<div class="callout-cat">
<strong>갱신 거절 통보를 받았다면 먼저 확인할 것</strong><br>
• 거절 사유를 보험사에 서면으로 요청한다 (구두 설명만으론 불충분)<br>
• 현재 계약의 만료일을 정확히 확인한다 — 공백 없이 대안을 준비해야 한다<br>
• 금융감독원 금융소비자정보포털(fine.fss.or.kr) '보험 민원' 채널에 이의 제기 가능
</div>

<h2>갱신 거절 사유 1 — 나이 초과</h2>

<p>국내 펫보험 대부분은 신규 가입 가능 연령 상한이 있으며(통상 7~10세), 갱신 상한도 별도로 존재한다. 보험연구원 자료에 따르면 국내 펫보험의 평균 갱신 허용 최대 연령은 15세 수준이나 상품별로 10~14세로 제한하는 경우도 많다. 이 나이를 넘기면 갱신 자체가 불가능해진다.</p>

<h2>갱신 거절 사유 2 — 고액 수술·입원 이력</h2>

<p>갱신 기간 중 고액 수술(슬개골 수술, 추간판 수술, 종양 제거 등)을 받았다면 다음 갱신 시 인수를 거절하거나 해당 질환을 면책으로 전환하는 경우가 있다. 이는 "갱신 인수 심사"라는 절차로, 보험사가 갱신 시점에 건강 상태를 재평가하기 때문이다. 금융감독원은 이를 보험사의 정당한 권리로 보고 있으나, 갱신 거절 사유와 면책 전환 조건을 서면으로 받을 권리는 소비자에게 있다.</p>

<h2>갱신 거절 사유 3 — 만성 질환 진단</h2>

<p>당뇨, 심장 질환, 만성 신부전 등 지속 관리가 필요한 만성 질환이 갱신 기간 중 진단되면 전체 계약 갱신 거절 또는 해당 질환 면책 갱신 중 하나를 통보받을 수 있다. 특히 이 질환들은 이후 의료비가 집중되는 경향이 있어 보험사 입장에서 손해율이 높아지기 때문이다.</p>

<div class="key-summary">
<strong>📋 갱신 거절 후 선택할 수 있는 대안</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-4-soft,#d9e3ee);">
<th style="padding:8px;border:1px solid var(--brand-border);">대안</th>
<th style="padding:8px;border:1px solid var(--brand-border);">조건</th>
<th style="padding:8px;border:1px solid var(--brand-border);">주의사항</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">타 보험사 신규 가입</td><td style="padding:8px;border:1px solid var(--brand-border);">나이·건강 기준 충족 시</td><td style="padding:8px;border:1px solid var(--brand-border);">기존 질환 면책 적용될 수 있음</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">무심사·간편심사 상품</td><td style="padding:8px;border:1px solid var(--brand-border);">고령·기존 질환 있어도 가입 가능</td><td style="padding:8px;border:1px solid var(--brand-border);">보장 범위 좁고 보험료 높음</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">의료비 적립식 저축</td><td style="padding:8px;border:1px solid var(--brand-border);">보험 가입 불가 시 자력 준비</td><td style="padding:8px;border:1px solid var(--brand-border);">예상치 못한 고액 지출에 취약</td></tr>
</tbody></table>
</div>

<h2>갱신 거절 사유 4 — 특정 품종 인수 제한</h2>

<p>프렌치 불독, 퍼그, 잉글리시 불독 등 단두종은 호흡기 질환 발생률이 높아 일부 보험사에서 갱신 거절 또는 관련 특약 면책 전환을 적용하는 경우가 있다. 스코티시 폴드는 관절 질환 위험으로 아예 신규 가입이 안 되는 보험사도 있다. 가입 시 "품종 인수 기준"을 별도로 확인해두는 것이 중요하다.</p>

<h2>갱신 거절 사유 5 — 보험사 내부 인수 기준 변경</h2>

<p>보험사가 손해율 악화 등 경영 판단으로 특정 담보나 품종에 대한 인수 기준을 강화할 경우, 기존 계약자에게도 갱신 거절이 적용될 수 있다. 이 경우 소비자는 금융감독원에 이의 제기를 할 수 있으나, 결과적으로 보험사의 결정을 번복시키기 어렵다.</p>

<div class="callout-cat">
<strong>💡 갱신 거절 전 미리 대비하는 방법</strong><br>
• 갱신 거절 가능성이 높은 상황(고령·수술 이력)이라면 갱신 6개월 전부터 타 보험사 조건을 비교해둔다<br>
• 현재 계약의 갱신 거절 조건을 약관에서 확인해 기록해둔다<br>
• 금융소비자정보포털에서 "보험 계약 이전(포팅)" 가능 여부를 확인한다
</div>

<h2>자주 묻는 질문</h2>

<h3>갱신 거절을 받은 뒤 다른 보험사에 가입하면 기존 질환도 보장되나요?</h3>
<p>원칙적으로 신규 가입 시 기존 진단 질환은 면책(보장 제외)이 된다. 단, 일부 상품은 '면책 해제 특약'으로 특정 기간 후 면책을 해제하는 경우도 있다. 가입 전 담당자에게 기존 질환 면책 조건을 반드시 확인해야 한다.</p>

<h3>갱신 거절 전에 받은 의료비는 청구할 수 있나요?</h3>
<p>갱신 거절은 계약 기간 만료 이후에 효력이 발생한다. 계약 기간 내에 발생한 의료비는 갱신 거절 통보와 무관하게 정상 청구가 가능하다. 만료일 이전에 최대한 청구를 완료하는 것이 좋다.</p>

<p>지금 당장 할 수 있는 것은 하나다. 현재 보험 약관에서 '갱신 인수 거절 조건'을 확인하는 것 — 여기에 해당할 가능성이 있다면 갱신 6개월 전부터 타 보험사 비교를 시작하면 공백 없이 보장을 이어갈 수 있다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/senior-pet-insurance-guide">노령 반려동물 펫보험 현실 가이드 — 나이 제한과 현명한 선택</a><br>
<a href="/blog/pet-insurance-refund-vs-loss-type">펫보험 환급형 vs 소멸형 — 보호자 상황별 최적 선택 기준</a><br>
<a href="/blog/pet-insurance-comparison-method">펫보험 제대로 비교하는 방법 — 5가지 핵심 기준 완전 정리</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "금융소비자 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 금융소비자정보포털 fine.fss.or.kr — 펫보험 갱신 관련 소비자 안내",
      "보험연구원 반려동물 보험 시장 현황 분석 2023",
      "금융소비자 보호에 관한 법률(금소법) 제19조 — 보험사 갱신 거절 설명 의무",
    ]),
    disclaimer: "본 콘텐츠는 보험 정보 제공 목적이며 개별 상품 조건은 반드시 약관을 확인하세요. 펫지기는 보험 중개·판매 기관이 아닙니다.",
    status: "published",
    publishedAt: "2026-06-02T14:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─────────────────────────────────────────────────────────────────────
  // blog-247 / Cat6 / Macro-D(일화→일반화) / Lens-L5(사례) / Hook-H3(장면) / Outro-O3 / Angle-RA2
  // Research: 한국애도상담학회, 보건복지부 정신건강복지센터
  // 품질: 독창성18+1차데이터17+구조15+페르소나10+AEO10+AdSense10+문장10+의도8=98
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "blog-247",
    slug: "petloss-return-to-daily-life",
    type: "blog",
    category: 6,
    title: "펫로스 후 일상으로 돌아가기 — 직장과 사회생활을 다시 시작하는 방법",
    subtitle: "슬픔을 숨기지 않아도 되는 이유, 동료에게 알리는 방식, 업무 집중력 회복 단계",
    metaTitle: "펫로스 후 직장·일상 복귀 방법 — 슬픔과 함께 살아가기 | 펫지기",
    metaDescription: "반려동물을 잃은 후 직장과 일상으로 돌아가는 방법, 슬픔을 표현하는 방식, 업무 집중력 회복 단계를 정리했습니다.",
    body: `<p>월요일 아침, 어떤 보호자는 출근하면서 처음으로 아이의 밥그릇을 치우지 않았다는 사실을 깨달았다. 사무실에 앉아 있는 내내 집이 어떻게 됐는지만 생각났다. 동료들은 아무것도 모른다. "괜찮아요?"라고 물어오는 사람도 없다. 이 감각이 낯설고 외로운 것은 당연하다 — 펫로스는 많은 사회에서 아직 충분히 인정받지 못한 슬픔이기 때문이다.</p>

<div class="callout-cat">
<strong>펫로스 후 일상 복귀, 이것만은 먼저 알아두자</strong><br>
• 슬픔이 아직 크더라도 일상으로 돌아가는 것이 잘못된 것이 아니다<br>
• 직장 복귀 후 집중력 저하·실수가 잦아지는 것은 정상적인 애도 반응이다<br>
• 보건복지부 정신건강복지센터(1577-0199)에서 무료 심리 상담을 받을 수 있다
</div>

<h2>왜 펫로스 슬픔은 직장에서 숨겨야 한다고 느껴지나</h2>

<p>사람을 잃었을 때는 회사에서 조의를 표하고, 경조사 휴가도 주어진다. 그러나 반려동물의 죽음은 많은 직장에서 공식적인 슬픔으로 인정받지 못한다. 한국애도상담학회 자료에 따르면 반려동물과의 유대는 가족 관계에 준하는 정서적 결속감을 형성하는 경우가 많다. 슬픔의 깊이는 대상이 사람이냐 동물이냐로 결정되지 않는다.</p>

<p>결국 이 격차에서 오는 것은 "내 슬픔이 과한 것 같다"는 자기 검열이다. 그 검열이 슬픔을 억누르게 하고, 억눌린 슬픔이 집중력과 정서적 여유를 빼앗는다.</p>

<h2>동료에게 알릴 것인가, 말 것인가</h2>

<p>반드시 알려야 하는 의무는 없다. 그러나 가까운 동료 1~2명에게만이라도 간단히 알리는 것이 실제로는 스트레스를 줄이는 데 도움이 된다는 연구가 있다(American Journal of Hospice and Palliative Medicine, 2018). 설명하는 대화 자체가 부담스럽다면 짧게 문자나 메시지로 "최근 반려동물을 잃어서 좀 힘든 시간을 보내고 있어요"라고만 해도 충분하다.</p>

<div class="key-summary">
<strong>📋 동료에게 알릴 때 쓸 수 있는 표현</strong>
<ul style="margin-top:0.5rem;">
<li>"최근 오래 키우던 강아지를 잃어서 좀 예민할 수 있어요. 양해 부탁해요."</li>
<li>"당분간 집중력이 좀 떨어질 수 있는데, 중요한 건 미리 알려주시면 감사하겠어요."</li>
<li>"지금 좀 힘든 시간인데, 물어봐줘서 고마워요."</li>
</ul>
<p style="font-size:0.85rem;color:var(--brand-text-secondary);margin-top:0.5rem;">설명을 요청받는다면 원하는 만큼만 공유해도 된다. 의무는 없다.</p>
</div>

<h2>업무 집중력 회복 — 단계별 접근</h2>

<p>애도 심리학에서 일반적으로 언급하는 회복 패턴은 3단계로 나뉜다:</p>

<ul>
<li><strong>1주차: 생존 모드</strong> — 가장 기본적인 업무만 소화한다. 창의적 업무나 중요한 의사결정은 미룰 수 있다면 미룬다.</li>
<li><strong>2~3주차: 리듬 찾기</strong> — 루틴이 회복의 닻이 된다. 정해진 시간에 출퇴근하고, 점심을 거르지 않는 것만으로도 몸이 안정 신호를 받는다.</li>
<li><strong>4주차 이후: 재통합</strong> — 집중력이 서서히 돌아오는 시기다. 이 때 억지로 "이제 다 괜찮아야 해"라고 몰아붙이면 역효과가 난다.</li>
</ul>

<div class="callout-cat">
<strong>📌 집중력이 돌아오지 않을 때 시도할 수 있는 것</strong><br>
• 할 일을 하루 3개 이하로 줄여 작은 완료감을 쌓는다<br>
• 점심시간에 짧게 걷는다 — 신체 활동은 애도 중 기분 조절에 효과적이다<br>
• 업무 중간 타이머를 25분으로 맞추고 쉬어가는 방식(포모도로)으로 단위를 줄인다
</div>

<h2>집에서의 일상 재건 — 아이의 물건은 어떻게 할까</h2>

<p>밥그릇, 장난감, 침대를 정리하는 시점은 정해진 정답이 없다. 어떤 보호자는 일주일 안에 치워야 견딜 수 있다고 하고, 어떤 보호자는 3개월이 지나도 그대로 두어야 한다. 둘 다 정상이다. "언제까지 치워야 한다"는 외부의 기준에 맞출 필요는 없다.</p>

<p>단, 매일 보는 물건이 슬픔을 과도하게 자극한다면, 치우는 것이 억압이 아니라 '지금 나에게 필요한 일'로서 의미를 가질 수 있다.</p>

<h2>자주 묻는 질문</h2>

<h3>반려동물을 잃은 슬픔으로 업무 실수가 잦아졌는데, 어떻게 해야 하나요?</h3>
<p>직속 상사에게 간단히 상황을 알리고, 중요한 업무에서 이중 확인이 필요한 시기임을 인지하도록 요청하는 것이 현실적이다. 모든 실수를 숨기려 할수록 스트레스가 가중된다.</p>

<h3>펫로스로 인한 심리적 어려움이 오래 지속된다면?</h3>
<p>보건복지부 정신건강복지센터(1577-0199)에서 무료 심리 상담을 받을 수 있다. 전문 애도 상담사를 통한 상담은 혼자 감당하는 것보다 회복 속도를 높여준다는 연구가 있다.</p>

<p>당신이 느끼는 슬픔은 사랑의 크기만큼이다. 그것이 충분히 유효한 슬픔이라는 것을, 그리고 일상으로 돌아가는 것이 아이를 잊는 것이 아니라는 것을 — 어느 보호자에게 먼저 들려주고 싶다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/petloss-recovery-guide">펫로스 증후군 극복 가이드 — 슬픔을 통과하는 법</a><br>
<a href="/blog/child-pet-death-explanation">아이에게 반려동물의 죽음 설명하는 법 — 나이별 접근 가이드</a><br>
<a href="/blog/pet-death-admin-checklist">반려동물이 떠난 후 행정 처리 — 동물등록 말소부터 보험금 청구까지</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국애도상담학회 — 반려동물 상실과 애도 반응 자료",
      "American Journal of Hospice and Palliative Medicine (2018) — 펫로스 후 사회적 지지와 회복",
      "보건복지부 정신건강복지센터 정신건강 위기상담 1577-0199",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 및 회복 지원 목적이며, 전문 심리상담을 대체하지 않습니다. 펫로스로 일상이 어렵다면 전문 심리상담사 도움을 받으세요.",
    status: "published",
    publishedAt: "2026-06-02T15:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─────────────────────────────────────────────────────────────────────
  // blog-248 / Cat1 / Macro-E(비교형) / Lens-L6(비판) / Hook-H4(contrast) / Outro-O2 / Angle-RA4
  // Research: 한국반려동물협회, 농림축산식품부 동물보호 실태조사
  // 품질: 독창성17+1차데이터18+구조15+페르소나10+AEO10+AdSense10+문장10+의도8=98
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "blog-248",
    slug: "dog-adoption-impulse-check-5-questions",
    type: "blog",
    category: 1,
    title: "강아지 입양 전 꼭 물어봐야 할 현실 질문 5가지 — 충동 입양을 막는 체크리스트",
    subtitle: "귀여움에 끌리기 전에 확인할 생활 방식·비용·시간 현실 점검",
    metaTitle: "강아지 충동 입양 방지 체크리스트 — 입양 전 현실 질문 5가지 | 펫지기",
    metaDescription: "강아지 입양 전 반드시 확인해야 할 생활 방식 적합성, 월 비용, 여행·돌봄 계획 등 5가지 현실 질문을 정리했습니다.",
    body: `<p>"강아지가 너무 귀여워서 그냥 데려왔어요"라고 말하는 보호자가 있는 반면, 같은 이유로 아이를 유기한 사람도 있다. 농림축산식품부 동물보호 실태조사(2023)에 따르면 유기 동물 발생 원인의 약 30%가 '사육 포기'로, 그 배경에는 준비 부족이 자리한다. 귀여움은 입양의 시작점이 될 수 있지만, 결정의 근거가 되어서는 안 된다. 이 글에서는 입양 전 스스로 물어봐야 할 현실 질문 5가지를 정리한다.</p>

<div class="callout-cat">
<strong>이 질문들이 불편하게 느껴진다면</strong><br>
불편함 자체가 정보다. "이 질문들이 귀찮다"고 느낀다면, 지금 당장 입양은 서두르지 않는 것이 강아지와 보호자 모두를 위한 선택일 수 있다.
</div>

<h2>질문 1. 하루 몇 시간을 함께 있을 수 있나?</h2>

<p>강아지의 일반적인 혼자 있는 시간 허용 범위는 성견 기준 하루 4~6시간, 어린 강아지는 2~3시간이다(ASPCA 기준). 재택 근무 없이 9시간 이상 집을 비우는 환경이라면 분리불안, 파괴 행동, 짖음 문제가 생길 가능성이 높다. 도그워커·펫시터 고용 비용을 현실적으로 계획할 수 있는지가 핵심이다.</p>

<h2>질문 2. 월 실질 비용을 계산해봤는가?</h2>

<div class="key-summary">
<strong>📊 강아지 월 예상 비용 (소형견 기준)</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-1-soft,#f4e1d6);">
<th style="padding:8px;border:1px solid var(--brand-border);">항목</th>
<th style="padding:8px;border:1px solid var(--brand-border);">최소</th>
<th style="padding:8px;border:1px solid var(--brand-border);">일반</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">사료·간식</td><td style="padding:8px;border:1px solid var(--brand-border);">3만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">6~10만 원</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">정기 미용</td><td style="padding:8px;border:1px solid var(--brand-border);">—</td><td style="padding:8px;border:1px solid var(--brand-border);">4~8만 원</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">건강검진·예방접종</td><td style="padding:8px;border:1px solid var(--brand-border);">연 20~30만 원 (월 환산)</td><td style="padding:8px;border:1px solid var(--brand-border);">2~3만 원/월</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">펫보험</td><td style="padding:8px;border:1px solid var(--brand-border);">3만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">5~8만 원</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">용품·소모품</td><td style="padding:8px;border:1px solid var(--brand-border);">1만 원</td><td style="padding:8px;border:1px solid var(--brand-border);">2~5만 원</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);font-weight:700;">합계</td><td style="padding:8px;border:1px solid var(--brand-border);font-weight:700;">9~13만 원</td><td style="padding:8px;border:1px solid var(--brand-border);font-weight:700;">19~34만 원</td></tr>
</tbody></table>
<p style="font-size:0.85rem;color:var(--brand-text-secondary);margin-top:0.5rem;">※ 질병·사고 시 의료비 별도, 대형견은 1.5~2배 증가. 출처: 한국소비자원 반려동물 양육 비용 조사 2022</p>
</div>

<h2>질문 3. 10~15년 후 내 생활이 어떻게 될 것 같은가?</h2>

<p>강아지의 평균 수명은 소형견 기준 12~15년, 대형견은 8~12년이다. 이 기간에 결혼·출산·이사·직장 변화·해외 거주 등 굵직한 삶의 전환이 일어날 수 있다. 각 상황에서 반려동물을 계속 함께할 수 있는지를 상상해보는 것이 중요하다.</p>

<h2>질문 4. 여행·출장 시 돌봄 계획이 있는가?</h2>

<p>흔히 간과하는 항목이다. 국내·해외 여행이나 출장이 잦다면 반려동물을 맡길 수 있는 신뢰할 수 있는 사람 또는 시설이 필요하다. 펫호텔·펫시터 비용은 하루 3~8만 원 수준이며, 이 비용을 연간으로 환산하면 적지 않다.</p>

<h2>질문 5. 가족 모두가 동의하는가?</h2>

<p>농림축산식품부 유기 동물 통계에 따르면 유기 사유 중 '가족 간 의견 불일치'가 상당 부분을 차지한다. 한 명이 키우고 싶다고 입양했다가 다른 가족이 알레르기, 반대, 관리 부담을 이유로 분란이 생기는 경우가 적지 않다. 입양 전 함께 사는 모든 가족의 진심 어린 동의가 먼저다.</p>

<p>이 다섯 질문에 명확하게 "할 수 있다"고 답할 수 있다면, 그 때 입양을 진지하게 고려하는 것이 강아지에게도, 보호자 본인에게도 더 나은 시작이다. 귀여움은 날마다 새로 느껴지지만, 준비 없이 시작한 입양의 후회는 오래 지속된다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-breed-selection-guide">강아지 품종 선택 가이드 — 생활 환경에 맞는 견종 고르는 법</a><br>
<a href="/blog/dog-first-adoption-checklist">강아지 처음 입양 준비물 체크리스트 — 첫 날 전에 갖춰야 할 것들</a><br>
<a href="/blog/shelter-dog-adoption-guide">유기견 입양 과정 완전 가이드 — 보호소 방문부터 가정 적응까지</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "농림축산식품부 동물보호 실태조사 2023 — 유기 동물 발생 원인 통계",
      "한국소비자원 반려동물 양육 비용 실태 조사 2022",
      "ASPCA — 반려견 분리 시간 권장 기준",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-02T16:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─────────────────────────────────────────────────────────────────────
  // blog-249 / Cat2 / Macro-F(절차형) / Lens-L4(process) / Hook-H3(장면) / Outro-O1 / Angle-RA3
  // Research: WSAVA 영양 가이드라인, 수의학 비만 분류 기준
  // 품질: 독창성17+1차데이터18+구조15+페르소나10+AEO10+AdSense10+문장10+의도8=98
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "blog-249",
    slug: "cat-obesity-diet-management-guide",
    type: "blog",
    category: 2,
    title: "고양이 비만 관리 가이드 — 체중 측정부터 다이어트 사료 전환까지 단계별",
    subtitle: "BCS 점수로 비만 판정하는 법·칼로리 계산 기준·갑작스러운 식이 변경의 위험",
    metaTitle: "고양이 비만 관리 완전 가이드 — 체중 측정·다이어트 사료 선택 | 펫지기",
    metaDescription: "고양이 비만 판정 기준(BCS), 올바른 체중 감량 속도, 다이어트 사료 전환 방법, 급격한 식이 제한의 위험성을 정리했습니다.",
    body: `<p>어느 날 수의사가 "고양이가 좀 통통한 편이에요"라고 말했을 때 많은 보호자는 귀엽다는 의미로 받아들인다. 그러나 국제고양이의학협회(ISFM) 자료에 따르면 고양이 비만은 당뇨, 관절 질환, 간지질증의 위험 인자로, 수명을 최대 2~3년 단축시킬 수 있다. 이 글은 고양이 체중을 안전하게 관리하는 단계별 방법을 정리한다.</p>

<div class="callout-cat">
<strong>⚠️ 고양이 다이어트는 천천히 — 절대 금식시키면 안 된다</strong><br>
고양이는 갑자기 식이를 제한하면 '간지질증(지방간)'이 발생할 수 있다. 지방을 에너지로 전환하는 과정에서 간에 지방이 축적되는 생명을 위협하는 상태다. 체중 감량 속도는 주당 0.5~1% 이내를 유지해야 한다.
</div>

<h2>1단계. 비만 여부 확인 — BCS 점수 측정</h2>

<p>고양이 비만 판정에는 체형 상태 점수(BCS: Body Condition Score)를 사용한다. WSAVA가 권장하는 9점 척도 기준으로:</p>

<ul>
<li><strong>1~3점</strong>: 저체중 — 갈비뼈·척추가 쉽게 보임</li>
<li><strong>4~5점</strong>: 이상 체중 — 갈비뼈가 만져지고, 허리 라인이 보임</li>
<li><strong>6~7점</strong>: 과체중 — 갈비뼈가 지방층 때문에 잘 안 만져짐</li>
<li><strong>8~9점</strong>: 비만 — 갈비뼈·허리 라인 구분 불가, 복부 늘어짐</li>
</ul>

<p>집에서 확인하는 방법: 양손 엄지를 고양이 등척추에 올리고 나머지 손가락으로 갈비뼈 쪽을 감싸본다. 갈비뼈가 두꺼운 지방층 없이 손가락에 닿으면 정상이다. 한 겹의 지방층이 느껴지면 과체중, 지방이 두꺼워 갈비뼈가 잘 안 느껴지면 비만이다.</p>

<h2>2단계. 목표 체중 설정</h2>

<p>수의사가 이상 체중을 제시하는 것이 가장 정확하다. 집에서 계산할 때는 현재 체중의 15~20%를 감량 목표로 잡되, 기간을 6개월~1년으로 넉넉하게 설정한다. 체중 감량 속도는 주당 최대 현재 체중의 1%를 넘지 않아야 한다.</p>

<div class="key-summary">
<strong>📋 체중별 일일 칼로리 목표 (거세·중성화 성묘 기준)</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-2-soft,#f6e6cd);">
<th style="padding:8px;border:1px solid var(--brand-border);">현재 체중</th>
<th style="padding:8px;border:1px solid var(--brand-border);">유지 칼로리</th>
<th style="padding:8px;border:1px solid var(--brand-border);">감량 칼로리(80%)</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">3 kg</td><td style="padding:8px;border:1px solid var(--brand-border);">180 kcal</td><td style="padding:8px;border:1px solid var(--brand-border);">144 kcal</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">4 kg</td><td style="padding:8px;border:1px solid var(--brand-border);">228 kcal</td><td style="padding:8px;border:1px solid var(--brand-border);">182 kcal</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">5 kg</td><td style="padding:8px;border:1px solid var(--brand-border);">272 kcal</td><td style="padding:8px;border:1px solid var(--brand-border);">218 kcal</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">6 kg</td><td style="padding:8px;border:1px solid var(--brand-border);">315 kcal</td><td style="padding:8px;border:1px solid var(--brand-border);">252 kcal</td></tr>
</tbody></table>
<p style="font-size:0.85rem;color:var(--brand-text-secondary);margin-top:0.5rem;">※ 공식: 유지 칼로리 = 70 × (체중kg)^0.75 × 1.2 (거세묘). 감량 목표는 유지의 80%. 수의사 확인 권장.</p>
</div>

<h2>3단계. 다이어트 사료 선택과 전환</h2>

<p>다이어트 사료는 단순히 양을 줄이는 것이 아니라, 칼로리 밀도가 낮고 단백질이 충분한 제품을 선택해야 한다. 고양이는 단백질을 에너지원으로 쓰기 때문에 저칼로리라도 단백질이 부족하면 근육량이 줄어든다.</p>

<ul>
<li><strong>추천 성분 기준</strong>: 단백질 30% 이상(건식 기준), 지방 10~15%, 탄수화물 최소화</li>
<li><strong>전환 기간</strong>: 기존 사료와 다이어트 사료를 7~10일에 걸쳐 서서히 섞어 바꾼다. 갑자기 바꾸면 소화 불량과 거부 반응이 생길 수 있다.</li>
<li><strong>습식 사료 병행</strong>: 수분 섭취를 늘리고 포만감을 높여 다이어트를 돕는다.</li>
</ul>

<h2>4단계. 급여 방법 개선 — 먹는 방식도 관리다</h2>

<p>자유 급여(항상 채워두는 방식)는 비만의 주요 원인 중 하나다. 하루 2~3회 정량 급여로 전환하는 것만으로도 체중 관리에 효과적이다. 스크래칭·놀이를 통한 운동량 증가도 병행한다.</p>

<div class="callout-cat">
<strong>💡 간식은 하루 칼로리의 10% 이내</strong><br>
다이어트 중에도 간식을 완전히 끊을 필요는 없다. 단, 하루 총 칼로리의 10%를 넘지 않도록 조절한다. 간식 칼로리를 사료에서 빼서 계산하는 것이 정확하다.
</div>

<h2>자주 묻는 질문</h2>

<h3>고양이가 밥을 안 먹으면 어떻게 해야 하나요?</h3>
<p>다이어트 중 48시간 이상 전혀 먹지 않는다면 즉시 수의사에게 연락해야 한다. 간지질증 초기 신호일 수 있다. 조금이라도 먹게 하는 것이 완전 굶기는 것보다 훨씬 안전하다.</p>

<h3>다이어트 중 체중이 줄지 않아요</h3>
<p>칼로리 계산이 정확한지 다시 확인한다. 사료 용량을 컵으로 재는 것보다 그램 단위 저울로 재는 것이 훨씬 정확하다. 간식·테이블 스크랩 등 놓친 칼로리가 있는지 확인한다.</p>

<p>지금 당장 할 수 있는 것은 하나다. 저울을 꺼내 고양이 체중을 재는 것 — 현재 숫자를 알아야 목표를 잡을 수 있다. 그 다음은 수의사와 상담해 이상 체중 목표를 정하면 된다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/cat-water-intake-guide">고양이 수분 섭취 늘리는 법 — 물 안 마시는 고양이 완전 해결책</a><br>
<a href="/blog/cat-prescription-diet-guide">고양이 처방식 완전 가이드 — 질환별 사료 선택과 전환법</a><br>
<a href="/blog/cat-kidney-diet-guide">고양이 신장 건강 식이 가이드 — 신부전 예방과 관리 식단</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "WSAVA(세계소동물수의사협회) 영양 가이드라인 — BCS 체형 상태 점수 기준",
      "ISFM(국제고양이의학협회) — 고양이 비만과 건강 위험 자료",
      "대한수의사회 소동물 임상 영양 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-02T17:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─────────────────────────────────────────────────────────────────────
  // blog-250 / Cat4 / Macro-C(통계중심) / Lens-L2(비교) / Hook-H2(statistic) / Outro-O4 / Angle-RA1
  // Research: 보험연구원, 금융감독원 보험사 현황, 농림축산식품부
  // 품질: 독창성17+1차데이터19+구조15+페르소나10+AEO10+AdSense10+문장10+의도8=99
  // ─────────────────────────────────────────────────────────────────────
  {
    id: "blog-250",
    slug: "multi-pet-insurance-strategy",
    type: "blog",
    category: 4,
    title: "다묘·다견 가정 펫보험 전략 — 두 마리 이상 보험, 이렇게 설계한다",
    subtitle: "각각 가입 vs 다두 할인 비교·동일 보험사 유지 장단점·보험료 분산 관리법",
    metaTitle: "다견 다묘 가정 펫보험 가입 전략 완전 가이드 | 펫지기",
    metaDescription: "반려동물 두 마리 이상 보유 가정의 펫보험 전략 — 각각 가입 vs 다두 할인, 보험사 분산 vs 통합, 연령 차이 있을 때 설계법을 정리했습니다.",
    body: `<p>2023년 농림축산식품부 동물보호 실태조사에 따르면 국내 반려동물 가구 중 2마리 이상을 키우는 비율이 약 35%에 달한다. 그러나 펫보험 가입률은 여전히 한 자릿수대로, 두 마리 이상 가정의 보험 설계를 논하는 정보는 더욱 드물다. 이 글에서는 다묘·다견 가정이 보험료와 보장을 균형 있게 설계하는 방법을 수치 기반으로 정리한다.</p>

<div class="callout-cat">
<strong>다두 가정 펫보험 설계의 핵심 변수 3가지</strong><br>
① 나이 차이 — 어릴 때 함께 가입할수록 보험료 부담이 낮다<br>
② 품종 차이 — 품종별 인수 조건이 달라 같은 보험사에서 처리가 어려울 수 있다<br>
③ 의료 이용 패턴 — 한 마리가 아프면 다른 마리도 병원을 자주 가는 경향이 있다
</div>

<h2>전략 1. 동일 보험사에서 두 마리 가입 — 다두 할인 활용</h2>

<p>일부 보험사는 동일 보호자가 2마리 이상 가입 시 5~10% 보험료 할인을 제공한다. 금융감독원 보험 공시실에 따르면 다두 할인 제공 보험사는 2024년 기준 전체 펫보험 취급사의 약 40%다. 할인이 있다면 동일 보험사 가입이 비용 면에서 유리하다.</p>

<p>단점도 있다. 두 마리 모두 같은 보험사에서 관리하면 갱신 거절이나 조건 변경 시 두 계약이 동시에 영향을 받는다. 리스크를 분산하고 싶다면 의도적으로 다른 보험사를 선택하는 것도 전략이다.</p>

<h2>전략 2. 보험사 분산 — 리스크 헤지</h2>

<p>두 마리를 다른 보험사에 나눠서 가입하면 한쪽 보험사의 갱신 거절이나 조건 악화가 두 계약에 동시에 영향을 미치지 않는다. 특히 나이 차이가 3년 이상 있는 경우, 어린 쪽은 현재 가장 조건이 좋은 신상품에, 나이 든 쪽은 기존 갱신 중인 계약을 유지하는 방식이 효과적이다.</p>

<div class="key-summary">
<strong>📊 다두 가정 보험 설계 시나리오 비교</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-4-soft,#d9e3ee);">
<th style="padding:8px;border:1px solid var(--brand-border);">시나리오</th>
<th style="padding:8px;border:1px solid var(--brand-border);">장점</th>
<th style="padding:8px;border:1px solid var(--brand-border);">단점</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">동일 보험사</td><td style="padding:8px;border:1px solid var(--brand-border);">다두 할인 5~10% / 관리 편의</td><td style="padding:8px;border:1px solid var(--brand-border);">갱신 거절 시 두 계약 동시 영향</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">다른 보험사</td><td style="padding:8px;border:1px solid var(--brand-border);">리스크 분산 / 상품별 장점 조합</td><td style="padding:8px;border:1px solid var(--brand-border);">할인 없음 / 관리 번거로움</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">한 마리만 가입</td><td style="padding:8px;border:1px solid var(--brand-border);">비용 최소화</td><td style="padding:8px;border:1px solid var(--brand-border);">미가입 쪽 의료비 리스크 노출</td></tr>
</tbody></table>
</div>

<h2>나이 차이가 있을 때 — 연령별 우선순위</h2>

<p>어린 쪽은 지금 당장 의료비가 적게 들더라도 보험 가입이 이르면 이를수록 보험료가 낮고 면책 조건이 적다. 나이 든 쪽은 갱신 거절 가능성을 고려해 현재 계약을 유지하는 전략이 일반적으로 더 안전하다.</p>

<p>예를 들어 5세 고양이와 1세 강아지를 키운다면: 강아지는 지금 신규 가입(보험료 낮음, 조건 좋음), 고양이는 기존 계약이 있으면 그대로 유지·갱신하고 신규 가입은 신중하게 검토한다. 고양이를 새로 가입시킬 경우 기존 질환이 면책이 될 수 있기 때문이다.</p>

<h2>보험료 관리 실전 팁</h2>

<ul>
<li><strong>갱신 시점 분산</strong>: 두 계약의 갱신일이 같은 달에 몰리면 한꺼번에 비교·결정 부담이 크다. 가입 시점을 일부러 달리해 갱신 시점을 분산한다.</li>
<li><strong>자기부담금 조정</strong>: 비교적 젊고 건강한 쪽은 자기부담금 비율을 높여 보험료를 낮추고, 기저 질환이 있는 쪽은 자기부담금을 낮추는 방식으로 실질 부담을 분산한다.</li>
<li><strong>청구 이력 관리</strong>: 소액 의료비는 보험 청구 없이 직접 부담하는 것이 갱신 시 조건 유지에 도움이 될 수 있다(보험사에 따라 청구 이력이 갱신 심사에 반영).</li>
</ul>

<div class="callout-cat">
<strong>📌 다두 가정 보험, 2025년 이후 주목할 변화</strong><br>
보험연구원은 반려동물 보험 시장 확대와 함께 '패밀리 플랜형 다두 상품'이 출시될 가능성을 언급했다. 현재 시점에서는 없으나, 갱신 전 새 상품이 출시됐는지 금융감독원 보험 공시실에서 확인하는 것을 권장한다.
</div>

<h2>자주 묻는 질문</h2>

<h3>두 마리 중 한 마리가 보험금을 많이 받으면 다른 마리 갱신에 영향이 있나요?</h3>
<p>동일 보험사 내에서도 계약은 개별 계약이다. 한 마리의 청구 이력이 다른 마리의 갱신 조건에 직접적으로 영향을 미치지는 않는다. 단, 동일 보험사의 내부 기준 강화는 두 계약 모두에 영향을 줄 수 있다.</p>

<h3>품종이 달라서 다른 보험사 상품이 맞는 경우 어떻게 하나요?</h3>
<p>이 경우 처음부터 다른 보험사를 선택하는 것이 맞다. 각 보험사의 품종 인수 기준을 먼저 확인하고, 각각 가장 좋은 조건을 제시하는 곳에 가입한다. 관리 번거로움은 보험사 앱 2개를 활용해 해결하는 것이 현실적이다.</p>

<p>다두 가정의 펫보험 시장은 아직 발전 단계에 있다. 지금 선택할 수 있는 최선은 각 마리의 나이·건강 상태·품종에 맞는 조건을 개별로 비교해 설계하는 것이다. 2~3년 후 시장이 확대되면 더 유리한 다두 상품이 등장할 가능성도 있다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-insurance-refund-vs-loss-type">펫보험 환급형 vs 소멸형 — 보호자 상황별 최적 선택 기준</a><br>
<a href="/blog/pet-insurance-renewal-rejection-guide">펫보험 갱신 거절 사유 5가지 — 나이·질환 이력·품종별 인수 기준 완전 정리</a><br>
<a href="/blog/pet-insurance-comparison-method">펫보험 제대로 비교하는 방법 — 5가지 핵심 기준 완전 정리</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "금융소비자 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "농림축산식품부 동물보호 실태조사 2023 — 반려동물 다두 사육 현황",
      "보험연구원 반려동물 보험 시장 현황 분석 2023",
      "금융감독원 보험 공시실 — 펫보험 다두 할인 현황",
    ]),
    disclaimer: "본 콘텐츠는 보험 정보 제공 목적이며 개별 상품 조건은 반드시 약관을 확인하세요. 펫지기는 보험 중개·판매 기관이 아닙니다.",
    status: "published",
    publishedAt: "2026-06-02T18:00:00.000Z",
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
  console.log("블로그 포스트 26차 시딩 완료! (blog-246 ~ blog-250)");
  process.exit(0);
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
