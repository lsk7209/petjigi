import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

const NOW = new Date().toISOString();

const POSTS: NewContent[] = [
  /* ═══════════════════════════════════════════════════════
   * 181. 말티즈 완전 케어 가이드
   * f1 [stat]  평균 수명 12-15년, 성견 체중 2-4kg
   * f2 [def]   단모·장모 없이 단일 코트(실크 텍스처), 털 빠짐 극소
   * f3 [health] 슬개골 탈구(소형견 1위 질환), 눈물 착색, 기관 허탈
   * f4 [care]  매일 빗질 필수, 목욕 2주 1회 권장, 눈 주변 매일 닦기
   * ═══════════════════════════════════════════════════════ */
  {
    id: "blog-181",
    slug: "maltese-care-guide",
    type: "blog",
    category: 5,
    title: "말티즈 완전 케어 가이드 — 특성·건강·미용·훈련",
    metaTitle: "말티즈 케어 완전 가이드 | 특성·건강·미용·훈련 | 펫지기",
    metaDescription:
      "말티즈의 성격·건강 취약점·털 관리·훈련 팁까지 한 곳에 정리했습니다. 슬개골 탈구·눈물 착색 예방법과 아파트 생활 적합성까지 확인하세요.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-06-22T07:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>말티즈는 한국에서 가장 오래 사랑받은 소형견 중 하나다. 눈처럼 하얀 긴 털과 애교 넘치는 성격 덕분에 1인 가구부터 노인 가정까지 폭넓게 선택받는다. AKC(아메리칸 케넬 클럽) 브리드 스탠다드에 따르면 성견 체중은 2–4kg, 평균 수명은 12–15년으로 소형견 중에서도 비교적 장수하는 편이다. 그 하얀 털과 작은 체구 뒤에는 몇 가지 반드시 알아야 할 건강·관리 포인트가 있다.</p>

<h2>품종 기본 특성</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <tbody>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">크기</td>
      <td style="padding:10px;border:1px solid #dee2e6;">소형견 / 성견 체중 2–4kg, 체고 20–25cm</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">평균 수명</td>
      <td style="padding:10px;border:1px solid #dee2e6;">12–15년</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">털 타입</td>
      <td style="padding:10px;border:1px solid #dee2e6;">단일 코트(언더코트 없음), 실크 텍스처 — 털 빠짐 극소</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">성격</td>
      <td style="padding:10px;border:1px solid #dee2e6;">애교·사교적·의존도 높음, 분리불안 주의</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">활동량</td>
      <td style="padding:10px;border:1px solid #dee2e6;">낮음–보통 / 하루 20–30분 산책으로 충분</td>
    </tr>
  </tbody>
</table>

<p>언더코트가 없어 털 빠짐이 적다는 점은 알레르기가 있는 보호자에게 유리하다. 다만 털이 자라는 속도가 빠르므로 4–6주마다 미용이 필요하다. ASPCA는 말티즈를 사람과의 교감이 강하고 가족 중심적인 견종으로 분류하며, 이러한 특성 때문에 장시간 혼자 두면 분리불안이 심화될 수 있다고 안내하고 있다.</p>

<h2>건강 취약점과 정기 검진 포인트</h2>
<p>말티즈에게 가장 흔한 질환은 <strong>슬개골 탈구(슬개골 이탈)</strong>다. OFA(정형외과 재단) 통계에 따르면 말티즈를 포함한 소형견에서 슬개골 탈구는 정형외과 질환 1위를 차지하며, 뒷다리를 가끔 들고 걷거나 "깡충" 뛰듯 이동한다면 동물병원 검진이 필요하다. 소형견 전반에 걸쳐 나타나는 질환으로 조기 발견이 중요하다.</p>
<ul>
  <li><strong>슬개골 탈구</strong>: 계단 오르내리기·높은 곳 점프 최소화, 미끄러운 바닥에 매트 깔기</li>
  <li><strong>눈물 착색(적눈물)</strong>: 포르피린 색소가 눈물에 포함돼 털이 붉게 변색. 매일 닦아줘야 한다</li>
  <li><strong>기관 허탈</strong>: 목줄 대신 하네스 사용 권장. 흥분 시 거위 울음 같은 기침이 반복되면 검진 필요</li>
  <li><strong>치주질환</strong>: 소형견은 치아가 조밀해 치석이 빨리 쌓인다. 주 2–3회 양치 권장</li>
</ul>

<div style="background:#e8f4fd;border-left:4px solid #2196f3;padding:16px;margin:16px 0;">
  <strong>정기 검진 권장 주기</strong><br>
  1세 이전: 백신·중성화 일정 확인 / 1–7세: 연 1회 기본 검진 / 7세 이상: 연 2회 + 치석 스케일링
</div>

<h2>케어 가이드 — 털·목욕·눈 관리</h2>
<p>말티즈 케어의 핵심은 <strong>매일 빗질</strong>이다. 언더코트가 없어도 실크 털은 엉킴이 잘 생긴다. 엉킨 채 방치하면 피부 짓무름과 피부염으로 이어진다. VCA Animal Hospitals에 따르면 말티즈의 피부와 털 건강은 정기 빗질 외에도 저알레르기 샴푸와 영양 균형 잡힌 식이에서 큰 영향을 받는다.</p>
<ol>
  <li><strong>매일 빗질</strong>: 슬리커 브러시로 결 방향 → 핀 브러시로 마무리</li>
  <li><strong>목욕 주기</strong>: 2주에 1회 권장. 잦은 목욕은 피지막을 손상시킨다</li>
  <li><strong>눈 주변</strong>: 습식 면봉 또는 전용 와이프로 매일 닦기. 방치 시 눈물 착색이 심해진다</li>
  <li><strong>귀 청소</strong>: 2–3주 1회, 귀 안쪽 털 제거(미용사에게 의뢰)로 외이염 예방</li>
  <li><strong>발톱</strong>: 3–4주 1회, 발바닥 털도 함께 정리해 미끄럼 방지</li>
</ol>

<h2>훈련 특성</h2>
<p>말티즈는 총명하고 보호자의 반응을 잘 읽는다. ASPCA 행동 가이드라인에서는 말티즈의 분리불안 경향을 강조하며, 처벌형 훈련보다 <strong>긍정 강화(간식+칭찬)</strong>가 효과적이라고 권고한다. 칭찬에 매우 민감하게 반응하므로 보상 기반 방식이 가장 빠른 결과를 낳는다.</p>
<ul>
  <li>배변 훈련은 생후 8주부터 일관된 장소·타이밍으로 시작</li>
  <li>분리불안 예방: 어릴 때부터 단독 시간을 점진적으로 늘리는 연습 필요</li>
  <li>짖음 제어: "조용" 명령어를 일관되게 사용하고 짖을 때 무시하는 방식 효과적</li>
</ul>

<h2>생활 환경 — 아파트 적합성</h2>
<p>말티즈는 <strong>아파트·소형 주거공간에 매우 적합</strong>한 견종이다. 활동량이 적고 실내 놀이로 에너지를 충분히 해소할 수 있다. WSAVA 브리더 가이드라인은 소형 반려견 구입 전 유전자 검사(슬개골·눈 관련)를 통해 건강한 개체를 선별하도록 권장하고 있다. 혼자 있는 시간이 길면 분리불안이 심해지므로 하루 4–5시간 이상 단독 시간이 매일 반복된다면 보조 장치(장난감·라디오)나 펫시터를 고려한다.</p>

<h2>자주 묻는 질문</h2>
<h3>말티즈는 털이 안 빠지나요?</h3>
<p>언더코트가 없어 털 빠짐이 매우 적지만 완전히 없지는 않습니다. 빗질을 규칙적으로 하면 집 안의 털 오염을 최소화할 수 있습니다.</p>

<h3>말티즈 눈물 착색은 어떻게 없애나요?</h3>
<p>착색된 털은 되돌리기 어렵습니다. 미용 시 해당 부위를 정리하고, 이후에는 매일 닦아 재착색을 방지하는 것이 현실적입니다. 착색이 갑자기 심해지면 눈물량 증가 원인(알레르기·눈 질환)을 동물병원에서 확인하세요.</p>

<h3>말티즈와 고양이를 함께 키워도 되나요?</h3>
<p>사회화 시기(생후 3–14주)에 함께 노출되면 대체로 잘 지냅니다. 성견이 된 후 합사 시에는 독립 공간을 보장하고 점진적으로 접촉을 늘리는 것이 좋습니다.</p>

<p>견종 선택 전 전반적인 비교가 필요하다면 <a href="/blog/dog-breed-selection-guide">강아지 품종 선택 가이드</a>를, 의료비 대비를 위한 보험 정보는 <a href="/blog/pet-insurance-guide">펫보험 완전 가이드</a>를 참고하세요.</p>`,
  },

  /* ═══════════════════════════════════════════════════════
   * 182. 프렌치 불독 완전 케어 가이드
   * f1 [stat]  단두종 — 비공 협착·연구개 과장 발생률 높음
   * f2 [def]   BOAS(단두종 기도폐쇄 증후군): 호흡 노력 증가, 더위에 취약
   * f3 [health] 피부 주름 습진, 척추 기형(헤미버텍스), 알레르기
   * f4 [care]  주름 사이 매일 청소, 과도한 운동 금지, 냉방 필수
   * ═══════════════════════════════════════════════════════ */
  {
    id: "blog-182",
    slug: "french-bulldog-care-guide",
    type: "blog",
    category: 5,
    title: "프렌치 불독 완전 케어 가이드 — 단두종 특수 관리법",
    metaTitle: "프렌치 불독 케어 가이드 | 단두종 관리·건강·훈련 | 펫지기",
    metaDescription:
      "프렌치 불독의 단두종 특성, BOAS 호흡 문제, 피부 주름 관리, 척추 건강, 더위 대처법까지 정리했습니다. 입양 전 꼭 확인하세요.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-06-22T12:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>프렌치 불독은 납작한 얼굴, 박쥐 귀, 근육질 몸통으로 전 세계적으로 인기 급상승 중인 견종이다. AKC(아메리칸 케넬 클럽) 통계에 따르면 프렌치 불독은 미국에서 수년간 등록 순위 1–2위를 유지할 만큼 높은 인기를 끌고 있다. 그러나 그 외모적 특징은 동시에 여러 건강 취약점을 내포한다. "단두종 특수 관리"를 모르고 입양했다가 예상치 못한 의료비와 마주하는 경우가 많다.</p>

<h2>품종 기본 특성</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <tbody>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">크기</td>
      <td style="padding:10px;border:1px solid #dee2e6;">소형–중형 / 성견 체중 8–14kg, 체고 27–35cm</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">평균 수명</td>
      <td style="padding:10px;border:1px solid #dee2e6;">10–12년</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">털 타입</td>
      <td style="padding:10px;border:1px solid #dee2e6;">단모, 밀도 높음 — 환절기 털 빠짐 있음</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">성격</td>
      <td style="padding:10px;border:1px solid #dee2e6;">애교·사교적·고집 있음, 짖음 적음</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">활동량</td>
      <td style="padding:10px;border:1px solid #dee2e6;">낮음 / 과도한 운동 금지, 짧은 산책 2회</td>
    </tr>
  </tbody>
</table>

<h2>단두종의 건강 취약점</h2>
<p>프렌치 불독의 가장 핵심적인 건강 이슈는 <strong>BOAS(단두종 기도폐쇄 증후군, Brachycephalic Obstructive Airway Syndrome)</strong>다. 짧은 두개골 구조로 인해 비공 협착, 연구개 과장, 기관 협착이 동반되어 호흡 효율이 낮다. VCA Animal Hospitals는 BOAS 증상을 가진 프렌치 불독에서 운동 불내성, 수면 중 무호흡, 청색증이 나타날 수 있으며 중증 사례는 외과적 교정이 필요하다고 설명한다.</p>

<ul>
  <li><strong>BOAS</strong>: 코를 드르렁거리는 소리, 운동 후 숨가쁨, 더위에 빠른 체온 상승. 심한 경우 수술로 비공·연구개를 교정한다</li>
  <li><strong>피부 주름 습진</strong>: 코 위·눈 아래·꼬리 주변 주름 사이에 습기가 차 세균·효모균 증식</li>
  <li><strong>척추 기형(헤미버텍스)</strong>: 나사 모양 꼬리와 연결된 척추 기형으로 신경 증상이 나타날 수 있음</li>
  <li><strong>알레르기</strong>: 식이 알레르기·환경 알레르기 발생률이 높아 피부 소양증으로 이어지기 쉬움. ASPCA는 피부 소양증이 반복되면 식이 단백질 성분부터 교체 시도를 권장한다</li>
  <li><strong>눈 질환</strong>: 눈이 돌출되어 각막 손상·안구 건조증 위험</li>
</ul>

<div style="background:#fff3cd;border-left:4px solid #ffc107;padding:16px;margin:16px 0;">
  <strong>여름철 필수 주의</strong><br>
  프렌치 불독은 방열 능력이 약해 기온 27°C 이상이면 열사병 위험이 급상승한다. 한낮 산책 금지, 실내 냉방 유지, 차 안 단독 대기 절대 금지.
</div>

<h2>케어 가이드 — 주름·털·목욕</h2>
<ol>
  <li><strong>주름 청소</strong>: 매일 마른 면봉 또는 전용 와이프로 주름 사이 수분·이물질 제거. 습식 청소 후 반드시 건조</li>
  <li><strong>목욕</strong>: 3–4주 1회. 주름 사이까지 충분히 건조하지 않으면 피부염이 심해진다</li>
  <li><strong>털 관리</strong>: 단모지만 환절기 털 빠짐이 상당하다. 주 2–3회 러버 브러시로 제거</li>
  <li><strong>귀 청소</strong>: 박쥐 귀 구조상 통기가 잘 돼 외이염은 상대적으로 적지만 2–3주 1회 점검 권장</li>
  <li><strong>눈 관리</strong>: 안구 돌출로 이물질이 잘 달라붙는다. 매일 젖은 거즈로 부드럽게 닦기</li>
</ol>

<h2>훈련 특성</h2>
<p>프렌치 불독은 영리하지만 <strong>독립적이고 고집이 있다</strong>. 지루함을 금방 느끼므로 훈련 세션은 5–10분으로 짧게, 하루 2–3회 반복이 효과적이다. 먹을 것에 대한 욕구가 강해 간식을 활용한 긍정 강화 훈련이 잘 먹힌다. WSAVA 가이드라인은 단두종 견종의 경우 과도한 운동이나 흥분 상태의 훈련 세션을 피하고 서늘한 시간대에 짧게 진행할 것을 권고한다.</p>
<ul>
  <li>배변 훈련: 생후 8–10주, 식사 직후와 기상 직후 일관된 장소로 유도</li>
  <li>사회화: 다른 개·사람·소리에 조기(생후 3–14주) 노출이 중요</li>
  <li>리드 줄 훈련: 목줄은 호흡 압박 위험 → 반드시 하네스 사용</li>
</ul>

<h2>생활 환경 — 아파트 적합성</h2>
<p>짖음이 적고 활동량이 낮아 <strong>아파트에 잘 맞는 편</strong>이다. 단, 냉·난방이 제대로 되는 환경이 필수다. 혼자 있는 시간도 비교적 잘 버티지만, 하루 대부분을 혼자 보내면 분리불안이 생길 수 있다.</p>

<h2>자주 묻는 질문</h2>
<h3>프렌치 불독은 수영을 못하나요?</h3>
<p>맞습니다. 두꺼운 앞몸통과 짧은 다리 비율로 인해 자연스럽게 뜨지 못합니다. 물 근처에서는 반드시 구명조끼를 착용시키고 감독해야 합니다.</p>

<h3>프렌치 불독 입양 비용이 왜 높나요?</h3>
<p>두개골 구조 때문에 자연분만이 어려워 제왕절개로 출산하는 경우가 많습니다. 이 과정에서 발생하는 비용이 분양가에 반영됩니다.</p>

<h3>BOAS 수술을 꼭 해야 하나요?</h3>
<p>모든 프렌치 불독이 수술이 필요한 것은 아닙니다. 호흡 소리가 심하거나 운동 불내성·수면 무호흡 증상이 있다면 수의사 평가를 받아 필요 여부를 결정합니다.</p>

<p>단두종 이외의 다른 견종과 비교하고 싶다면 <a href="/blog/dog-breed-selection-guide">강아지 품종 선택 가이드</a>를, 단두종의 높은 의료비를 대비한 보험 정보는 <a href="/blog/pet-insurance-guide">펫보험 완전 가이드</a>를 참고하세요.</p>`,
  },

  /* ═══════════════════════════════════════════════════════
   * 183. 골든 리트리버 완전 케어 가이드
   * f1 [stat]  평균 수명 10–12년, 성견 체중 25–34kg
   * f2 [health] 고관절 이형성증·대형견 1위 질환, 암 발병률 60% 이상
   * f3 [care]  하루 60–90분 운동, 주 2회 브러싱
   * f4 [train] 복종 훈련 적성 우수, AKC 지능 순위 4위
   * ═══════════════════════════════════════════════════════ */
  {
    id: "blog-183",
    slug: "golden-retriever-care-guide",
    type: "blog",
    category: 5,
    title: "골든 리트리버 완전 케어 가이드 — 운동·건강·훈련",
    metaTitle: "골든 리트리버 케어 가이드 | 운동·건강·훈련·관리 | 펫지기",
    metaDescription:
      "골든 리트리버의 운동 요구량, 고관절 이형성증·암 취약성, 더블 코트 관리, 훈련 특성을 정리했습니다. 대형견 입양 전 필수 체크리스트.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-06-22T17:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>골든 리트리버는 친화력, 훈련 적성, 온화한 성격으로 가족견의 대명사로 불린다. AKC(아메리칸 케넬 클럽) 브리드 스탠다드에 따르면 성견 체중은 수컷 29–34kg, 암컷 25–29kg이며 평균 수명은 10–12년이다. 복종 훈련 적성 평가에서 지능 순위 4위를 기록할 만큼 영리하고, 안내견·구조견·치료견으로도 널리 활동한다. 다만 대형견인 만큼 운동량·의료비·생활 공간 요건이 높다.</p>

<h2>품종 기본 특성</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <tbody>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">크기</td>
      <td style="padding:10px;border:1px solid #dee2e6;">대형견 / 성견 체중 25–34kg, 체고 51–61cm</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">평균 수명</td>
      <td style="padding:10px;border:1px solid #dee2e6;">10–12년</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">털 타입</td>
      <td style="padding:10px;border:1px solid #dee2e6;">더블 코트(웨이브·직모 혼합) — 털 빠짐 많음, 환절기 폭발적</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">성격</td>
      <td style="padding:10px;border:1px solid #dee2e6;">온화·친화적·에너지 넘침, 공격성 극히 낮음</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">활동량</td>
      <td style="padding:10px;border:1px solid #dee2e6;">높음 / 하루 60–90분 이상 운동 필요</td>
    </tr>
  </tbody>
</table>

<h2>건강 취약점과 정기 검진 포인트</h2>
<p>골든 리트리버는 대형견 중에서도 특히 <strong>암 발병률이 높은 견종</strong>으로 알려져 있다. 미국 골든 리트리버 클럽 연구에 따르면 이 견종의 약 60%가 암으로 사망한다는 보고가 있다. OFA(정형외과 재단) 조사에서 골든 리트리버의 고관절 이형성증 발생률은 전체 평가 개체의 20% 내외로 보고되며, 이는 대형견 중에서도 높은 수준이다.</p>
<ul>
  <li><strong>고관절 이형성증(HD)</strong>: 대형견 1위 질환. 뒷다리 절뚝임·계단 기피 증상. 7세 이전 엑스레이 정기 확인 권장</li>
  <li><strong>암(림프종·골육종·혈관육종)</strong>: 8세 이후 반기별 전신 검진, 복강 초음파 포함 권장</li>
  <li><strong>비만</strong>: 먹을 것에 대한 욕구가 매우 강해 과체중이 쉽게 온다. 매월 체중 측정 습관화</li>
  <li><strong>귀 감염(외이염)</strong>: 귀가 덮여 통기가 안 돼 습기 축적. 목욕·수영 후 귀 건조 필수</li>
  <li><strong>피부 알레르기</strong>: 환경·식이 알레르기 발생률 높음. 반복적 귀·발 핥음은 알레르기 신호</li>
</ul>

<h2>케어 가이드 — 털 관리와 운동</h2>
<p>더블 코트는 <strong>주 2–3회 브러싱</strong>이 기본이다. 환절기(봄·가을)에는 일 1회로 늘려야 실내 털 오염을 어느 정도 제어할 수 있다. 목욕은 4–6주 1회, 목욕 전 브러싱으로 죽은 털을 먼저 제거한다. VCA Animal Hospitals는 골든 리트리버의 귀 구조상 수영이나 목욕 후 외이염 발생 위험이 높으므로 귀 건조를 반드시 실시할 것을 권고한다.</p>
<ol>
  <li><strong>브러싱</strong>: 언더코트 전용 언더코트 레이크 → 슬리커 브러시 순으로</li>
  <li><strong>운동</strong>: 하루 60–90분 — 산책 + 공 던지기(리트리브 본능 충족)를 조합</li>
  <li><strong>수영</strong>: 골든 리트리버는 물을 좋아하며 수영이 관절에 부담이 적다. 수영 후 귀 건조 철저히</li>
  <li><strong>귀 청소</strong>: 목욕·수영 후 마른 거즈로 귀 입구 건조, 2주 1회 귀 세정제로 청소</li>
</ol>

<h2>훈련 특성</h2>
<p>골든 리트리버는 <strong>훈련 적성이 최상위</strong>인 견종이다. 보호자를 기쁘게 하려는 욕구(people-pleasing)가 강해 기본 복종 훈련은 빠르면 2–3주 안에 정착된다. ASPCA는 골든 리트리버를 어린이와의 친화성이 뛰어나고 가정 내 여러 구성원과 고르게 유대를 맺는 견종으로 평가한다. 강압적 방식보다 <strong>칭찬·간식 기반 훈련</strong>이 효과적이다.</p>
<ul>
  <li>앉아·기다려·이리와 기본 3대 명령어는 생후 8–12주부터 시작</li>
  <li>입질 억제 훈련: 강아지 때 물면 즉시 놀이를 멈추는 방식으로 교정</li>
  <li>점프 억제: 성견이 되면 체중으로 사람을 다치게 할 수 있어 조기 훈련 중요</li>
</ul>

<h2>생활 환경 — 아파트 적합성</h2>
<p>골든 리트리버는 <strong>넓은 공간과 충분한 운동이 확보된다면 아파트도 가능</strong>하다. 하지만 운동 부족 시 파괴적 행동(가구 씹기·짖음)이 나타난다. 마당이 있는 단독주택 환경이 가장 이상적이다. WSAVA 가이드라인은 대형견 입양 전 OFA 인증 부모견의 고관절 검사 이력을 브리더로부터 확인하도록 권고하고 있다. 더위에 비교적 약하므로 여름철 냉방 관리도 중요하다.</p>

<h2>자주 묻는 질문</h2>
<h3>골든 리트리버를 아파트에서 키워도 되나요?</h3>
<p>하루 60–90분 이상의 운동을 보장할 수 있고, 대형견 사료·의료비를 감당할 수 있다면 가능합니다. 다만 강아지 시기부터 충분한 훈련이 선행되어야 합니다.</p>

<h3>털 빠짐이 정말 심한가요?</h3>
<p>환절기에는 집 안 전체가 털로 덮일 수 있습니다. 로봇청소기·에어 퍼리파이어·주기적 브러싱의 조합이 필수입니다.</p>

<h3>골든 리트리버는 몇 살부터 노령견인가요?</h3>
<p>대형견 기준 7–8세부터 노령기에 접어듭니다. 이 시기부터 반기별 종합 검진을 권장합니다.</p>

<p>다른 대형견과 비교가 필요하다면 <a href="/blog/dog-breed-selection-guide">강아지 품종 선택 가이드</a>를, 대형견 의료비 대비를 위한 정보는 <a href="/blog/pet-insurance-guide">펫보험 완전 가이드</a>를 참고하세요.</p>`,
  },

  /* ═══════════════════════════════════════════════════════
   * 184. 포메라니안 완전 케어 가이드
   * ═══════════════════════════════════════════════════════ */
  {
    id: "blog-184",
    slug: "pomeranian-care-guide",
    type: "blog",
    category: 5,
    title: "포메라니안 완전 케어 가이드 — 털 관리·건강·특성",
    metaTitle: "포메라니안 케어 가이드 | 털 관리·건강·훈련·특성 | 펫지기",
    metaDescription:
      "포메라니안의 더블 코트 관리, 기관 허탈·슬개골 탈구 예방, BSD 탈모증, 짖음 훈련 팁까지 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-06-22T22:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>포메라니안은 솜사탕 같은 풍성한 털과 당당한 표정으로 전 세계 소형견 랭킹 상위에 꾸준히 이름을 올리는 견종이다. AKC(아메리칸 케넬 클럽) 브리드 스탠다드에 따르면 성견 체중은 1.8–3.5kg, 평균 수명은 12–16년으로 소형견 중 최장수 그룹에 속한다. 체구는 작지만 성격은 대형견 못지않게 씩씩하고 호기심이 넘친다.</p>

<h2>품종 기본 특성</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <tbody>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">크기</td>
      <td style="padding:10px;border:1px solid #dee2e6;">초소형 / 성견 체중 1.8–3.5kg, 체고 18–24cm</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">평균 수명</td>
      <td style="padding:10px;border:1px solid #dee2e6;">12–16년</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">털 타입</td>
      <td style="padding:10px;border:1px solid #dee2e6;">더블 코트(아우터 코트 직립) — 환절기 털 빠짐 많음</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">성격</td>
      <td style="padding:10px;border:1px solid #dee2e6;">씩씩하고 활발, 경계심 강함, 고집 있음</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">활동량</td>
      <td style="padding:10px;border:1px solid #dee2e6;">보통 / 하루 20–40분 산책 + 실내 놀이</td>
    </tr>
  </tbody>
</table>

<h2>건강 취약점과 정기 검진 포인트</h2>
<p>OFA(정형외과 재단) 통계에 따르면 포메라니안을 포함한 초소형견에서 슬개골 탈구 발생률이 높게 나타나며, 이는 유전적 소인과 생활환경 요인이 복합적으로 작용한다. 또한 VCA Animal Hospitals는 BSD(블랙 스킨 디지즈, 탈모증)를 포메라니안의 대표 피부 질환으로 분류하고, 호르몬 수치 검사가 진단에 필수적이라고 안내한다.</p>
<ul>
  <li><strong>BSD(탈모증)</strong>: 몸통 털이 대칭적으로 빠지고 피부가 검게 변하는 호르몬성 질환. 수컷에 더 흔하며 중성화 후 호전 사례 있음</li>
  <li><strong>기관 허탈</strong>: 목줄 압박이 원인. 반드시 하네스 사용, 기침 반복 시 검진</li>
  <li><strong>슬개골 탈구</strong>: 미끄러운 바닥 매트 필수, 높은 곳 점프 제한</li>
  <li><strong>치주질환</strong>: 이빨이 조밀해 치석 과다. 주 3회 양치 권장</li>
  <li><strong>저혈당</strong>: 초소형은 강아지 시기 식사를 거르면 위험. 하루 3–4회 소량 급여</li>
</ul>

<h2>케어 가이드 — 더블 코트 관리</h2>
<p>포메라니안 더블 코트는 <strong>절대 면도하면 안 된다</strong>. 아우터 코트와 언더코트의 성장 사이클이 달라 면도 후 포스트-클리핑 탈모증이 생길 수 있다. ASPCA는 포메라니안 털을 짧게 밀었을 때 정상 코트로 회복이 안 되는 사례가 흔하므로 전문 미용사와 먼저 상담하도록 권고한다.</p>
<ol>
  <li><strong>빗질</strong>: 주 3회, 핀 브러시 → 슬리커 브러시 순. 환절기에는 매일</li>
  <li><strong>미용</strong>: 4–6주마다 라운드·곰돌이 컷 정돈. 면도는 금지</li>
  <li><strong>목욕</strong>: 3–4주 1회. 드라이어 저온으로 완전 건조</li>
  <li><strong>귀 청소</strong>: 2–3주 1회. 귀 안쪽 털 제거로 외이염 예방</li>
</ol>

<h2>훈련 특성</h2>
<p>지능이 높지만 독립적이고 고집이 강하다. 경계 짖음 훈련은 입양 초기부터 "조용" 명령어로 일관되게 시작해야 한다. 배변 훈련 시 패드 위치는 일관되게 유지한다. WSAVA 가이드라인은 소형견 입양 전 슬개골 탈구 발생 위험을 최소화하기 위해 부모견의 관절 건강 이력을 확인하도록 권고하고 있다.</p>

<h2>생활 환경 — 아파트 적합성</h2>
<p>작은 체구와 실내 놀이로 에너지 해소가 가능해 <strong>아파트에 적합</strong>하다. 단 경계 짖음이 많으면 층간소음 문제가 생길 수 있으므로 짖음 훈련이 선행되어야 한다.</p>

<h2>자주 묻는 질문</h2>
<h3>포메라니안 털이 빠져 솜털 상태가 됐어요. 미용 탓인가요?</h3>
<p>면도 후 포스트-클리핑 탈모증일 가능성이 있습니다. BSD와의 구분을 위해 호르몬 검사를 받아보는 것이 좋습니다.</p>

<h3>포메라니안은 오래 혼자 있어도 되나요?</h3>
<p>4시간 이내라면 대체로 괜찮지만, 경계 짖음이 있는 개체는 소음 문제로 이어질 수 있습니다.</p>

<p>다른 소형견과 비교하려면 <a href="/blog/dog-breed-selection-guide">강아지 품종 선택 가이드</a>를, 소형견 의료비 대비 보험 정보는 <a href="/blog/pet-insurance-guide">펫보험 완전 가이드</a>를 확인하세요.</p>`,
  },

  /* ═══════════════════════════════════════════════════════
   * 185. 시추 완전 케어 가이드
   * ═══════════════════════════════════════════════════════ */
  {
    id: "blog-185",
    slug: "shih-tzu-care-guide",
    type: "blog",
    category: 5,
    title: "시추 완전 케어 가이드 — 털·눈·건강 특성 관리",
    metaTitle: "시추 케어 가이드 | 털·눈 관리·건강·훈련 특성 | 펫지기",
    metaDescription:
      "시추의 더블 코트 관리, 돌출 눈 보호, 단두종 특성, 슬개골 탈구 예방, 훈련 팁까지 한 곳에 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-06-23T03:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>시추는 '사자개'라는 이름처럼 풍성한 얼굴 털과 당당한 걸음걸이가 특징인 소형견이다. AKC(아메리칸 케넬 클럽) 브리드 스탠다드에 따르면 시추의 성견 체중은 4–7.5kg, 평균 수명은 10–16년이다. 황실 개로 오랜 역사를 가진 만큼 독립적이고 자존심이 강하다. 귀여운 외모 이면에 단두종 특성과 눈 관리라는 필수 과제가 있다.</p>

<h2>품종 기본 특성</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <tbody>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">크기</td>
      <td style="padding:10px;border:1px solid #dee2e6;">소형견 / 성견 체중 4–7.5kg, 체고 20–28cm</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">평균 수명</td>
      <td style="padding:10px;border:1px solid #dee2e6;">10–16년</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">털 타입</td>
      <td style="padding:10px;border:1px solid #dee2e6;">더블 코트(긴 비단결 아우터 코트) — 엉킴 잘 생김</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">성격</td>
      <td style="padding:10px;border:1px solid #dee2e6;">온순·애교·독립적, 아이와 잘 지냄</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">활동량</td>
      <td style="padding:10px;border:1px solid #dee2e6;">낮음 / 하루 20–30분 산책으로 충분</td>
    </tr>
  </tbody>
</table>

<h2>건강 취약점과 정기 검진 포인트</h2>
<p>시추는 단두종 특성으로 인해 호흡기와 눈 관련 건강 문제가 잦다. VCA Animal Hospitals에 따르면 시추의 돌출된 눈 구조는 각막 궤양과 안구 건조증 위험을 높이며, 가벼운 충격에도 안구 이탈이 발생할 수 있어 격한 놀이를 제한해야 한다. OFA 기록에서도 시추는 슬개골 탈구 발생률이 소형견 평균보다 높게 집계된다.</p>
<ul>
  <li><strong>눈 돌출</strong>: 각막 궤양·안구 건조증 위험. 충격 시 안구 이탈 가능 — 격한 놀이 주의</li>
  <li><strong>단두종 기도</strong>: 여름·흥분 시 호흡 곤란 가능. 냉방 관리 중요</li>
  <li><strong>슬개골 탈구</strong>: 소형견 공통. 미끄럼 방지 매트 필수</li>
  <li><strong>귀 감염</strong>: 귀 안쪽 털이 외이염 유발. 4–6주마다 털 제거 의뢰</li>
  <li><strong>추간판 질환</strong>: 긴 몸통 구조로 척추 부담. 소파·침대 점프 자제</li>
</ul>

<h2>케어 가이드 — 털과 눈 관리</h2>
<p>WSAVA 가이드라인은 단두종 소형견 구입 시 부모견의 호흡기 및 안구 검사 이력을 요청하도록 권장한다. 시추는 특히 눈 주변 털이 빠르게 자라 각막을 자극하므로, 정기 미용이 건강 관리의 일부라고 볼 수 있다.</p>
<ol>
  <li><strong>빗질</strong>: 매일 핀 브러시 전신. 귀 뒤·겨드랑이·사타구니 집중 관리</li>
  <li><strong>눈 닦기</strong>: 매일 습식 거즈로 눈 주변 분비물 제거. 이마 털은 묶거나 짧게 유지</li>
  <li><strong>목욕</strong>: 2–3주 1회. 컨디셔너 사용 후 빗질로 엉킴 방지</li>
  <li><strong>미용</strong>: 4–6주마다. 눈 주변·발바닥·귀 안쪽 털 정리 필수</li>
</ol>

<div style="background:#e8f4fd;border-left:4px solid #2196f3;padding:16px;margin:16px 0;">
  <strong>눈 응급 상황</strong><br>
  안구가 눈꺼풀 밖으로 나오는 "안구 탈출"은 즉시 동물병원 응급 처치가 필요합니다.
</div>

<h2>훈련 특성</h2>
<p>온순하지만 자존심이 강하고 고집이 있다. ASPCA는 시추를 아이들과 잘 어울리고 가족 친화적인 견종으로 분류하며, 칭찬·간식 기반 긍정 강화 방식이 가장 효과적이라고 설명한다. 배변 훈련은 일관된 장소·타이밍 유지가 핵심이다.</p>

<h2>생활 환경 — 아파트 적합성</h2>
<p>활동량이 적고 짖음이 많지 않아 <strong>아파트 생활에 잘 맞는다</strong>. 아이 있는 가정에도 잘 적응한다. 여름철 냉방은 필수다.</p>

<h2>자주 묻는 질문</h2>
<h3>시추 털을 짧게 밀어도 되나요?</h3>
<p>가능합니다. 포스트-클리핑 탈모증 위험이 낮아 여름철 짧은 컷이 관리에 훨씬 편리합니다.</p>

<h3>눈물 착색이 심한 편인가요?</h3>
<p>눈 구조상 눈물 분비가 많아 착색이 생기기 쉽습니다. 매일 닦는 습관이 가장 효과적인 예방법입니다.</p>

<p>다른 소형견과 비교하고 싶다면 <a href="/blog/dog-breed-selection-guide">강아지 품종 선택 가이드</a>를, 보험 정보는 <a href="/blog/pet-insurance-guide">펫보험 완전 가이드</a>에서 확인하세요.</p>`,
  },

  /* ═══════════════════════════════════════════════════════
   * 186. 진돗개 완전 케어 가이드
   * ═══════════════════════════════════════════════════════ */
  {
    id: "blog-186",
    slug: "jindo-dog-care-guide",
    type: "blog",
    category: 5,
    title: "진돗개 완전 케어 가이드 — 한국 토종견 특성과 관리",
    metaTitle: "진돗개 케어 가이드 | 특성·훈련·건강·관리 완전 정리 | 펫지기",
    metaDescription:
      "천연기념물 53호 진돗개의 독립적 성격, 훈련 난이도, 더블 코트 관리, 건강 취약점, 도심 생활 적합성까지 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-06-23T08:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>진돗개는 대한민국 천연기념물 제53호로 지정된 한국 고유의 토종 견종이다. 강한 귀소 본능, 날카로운 경계심, 한 사람에 대한 깊은 충성심이 특징이다. 한국애견협회(KKF)에 등록된 진돗개 데이터에 따르면 성견 체중 15–23kg, 체고 45–55cm의 중형견으로, 평균 수명은 12–15년이다. 독립적인 성격 덕분에 훈련이 쉽지 않고, 도심 아파트 환경에서는 특별한 관리가 필요하다.</p>

<h2>품종 기본 특성</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <tbody>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">크기</td>
      <td style="padding:10px;border:1px solid #dee2e6;">중형견 / 성견 체중 15–23kg, 체고 45–55cm</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">평균 수명</td>
      <td style="padding:10px;border:1px solid #dee2e6;">12–15년</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">털 타입</td>
      <td style="padding:10px;border:1px solid #dee2e6;">더블 코트(직모) — 환절기 대량 털 빠짐</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">성격</td>
      <td style="padding:10px;border:1px solid #dee2e6;">독립적·충성심 강함·경계심 높음</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">활동량</td>
      <td style="padding:10px;border:1px solid #dee2e6;">높음 / 하루 60–90분 이상 운동 필요</td>
    </tr>
  </tbody>
</table>

<h2>건강 취약점</h2>
<p>진돗개는 다른 품종견 대비 유전 질환 발병률이 낮은 편이다. 자연 선택을 통해 강인한 체질이 형성됐다. 다만 OFA(정형외과 재단) 자료에 따르면 중형견 이상에서는 고관절 이형성증에 대한 정기 모니터링이 권장되며, 도심 환경에서의 알레르기 노출도 고려해야 한다.</p>
<ul>
  <li><strong>고관절 이형성증</strong>: 중형견 이상에서 주의. 과도한 점프·계단 반복은 관절 부담</li>
  <li><strong>피부염·아토피</strong>: 도심 환경 알레르기 유발 물질 노출 시 주의. ASPCA는 반복적인 피부 소양증과 귀 감염이 환경 알레르기의 신호일 수 있다고 안내한다</li>
  <li><strong>치주질환</strong>: 주 2–3회 양치 권장</li>
</ul>

<div style="background:#e8f4fd;border-left:4px solid #2196f3;padding:16px;margin:16px 0;">
  <strong>진돗개 동물등록 의무</strong><br>
  생후 3개월 이상이면 마이크로칩 동물등록이 의무입니다. 미등록 시 과태료 부과 대상입니다.
</div>

<h2>케어 가이드</h2>
<p>VCA Animal Hospitals는 진돗개와 같은 더블 코트 중형견에서 환절기 언더코트 제거를 위한 정기적 브러싱이 피부 통기성과 피부염 예방에 중요하다고 설명한다.</p>
<ol>
  <li><strong>브러싱</strong>: 평소 주 2회, 환절기 매일. 언더코트 레이크로 죽은 털 제거</li>
  <li><strong>목욕</strong>: 4–6주 1회. 자가 청결 능력이 있어 잦은 목욕은 불필요</li>
  <li><strong>운동</strong>: 하루 최소 60분. 긴 산책 + 자유 달리기 조합이 효과적</li>
  <li><strong>발톱</strong>: 3–4주 1회. 도심 산책만으로는 자연 마모가 안 됨</li>
</ol>

<h2>훈련 특성</h2>
<p>독립심과 자존심이 강해 훈련 난이도가 높다. 한국애견협회(KKF)는 진돗개의 훈련을 위해 경험 있는 핸들러와의 초기 교육을 강하게 권고한다. 경험 없는 보호자라면 전문 트레이너와 함께 시작하는 것을 권장한다.</p>
<ul>
  <li><strong>조기 사회화</strong>: 생후 3–14주 내 다양한 사람·개·환경 노출 필수</li>
  <li><strong>일관된 규칙</strong>: 규칙이 흔들리면 보호자를 리더로 인정하지 않는다</li>
  <li><strong>리콜 훈련</strong>: 충분한 훈련 전 리드 없이 풀어주는 것은 위험</li>
</ul>

<h2>생활 환경 — 아파트 적합성</h2>
<p>넓은 공간과 충분한 운동이 필요해 <strong>아파트 생활은 권장하지 않는다</strong>. 마당 있는 단독주택이 이상적이다. WSAVA 가이드라인은 진돗개 같은 원생 품종의 경우 도심 환경 스트레스가 행동 문제로 이어질 수 있으므로 충분한 정신적 자극과 규칙적인 운동이 필수라고 강조한다. 아파트에서 키우려면 하루 1–2시간 이상 야외 운동, 충분한 정신적 자극, 일관된 훈련이 모두 갖춰져야 한다.</p>

<h2>자주 묻는 질문</h2>
<h3>진돗개는 왜 한 사람만 따르나요?</h3>
<p>오랜 수렵·경비견 역사에서 형성된 특성입니다. 가족 전체가 일관되게 훈련에 참여하면 여러 사람과의 유대도 가능합니다.</p>

<h3>진돗개와 고양이를 함께 키울 수 있나요?</h3>
<p>조기 사회화가 잘 되어 있다면 가능합니다. 성견 상태에서의 합사는 사냥 본능이 발동할 수 있어 주의가 필요합니다.</p>

<p>토종견 외 다른 중형견을 비교하려면 <a href="/blog/dog-breed-selection-guide">강아지 품종 선택 가이드</a>를, 의료비 대비 보험 정보는 <a href="/blog/pet-insurance-guide">펫보험 완전 가이드</a>를 참고하세요.</p>`,
  },

  /* ═══════════════════════════════════════════════════════
   * 187. 샴 고양이 완전 케어 가이드
   * ═══════════════════════════════════════════════════════ */
  {
    id: "blog-187",
    slug: "siamese-cat-care-guide",
    type: "blog",
    category: 5,
    title: "샴 고양이 완전 케어 가이드 — 특성·건강·행동 이해",
    metaTitle: "샴 고양이 케어 가이드 | 특성·건강·행동·관리 | 펫지기",
    metaDescription:
      "샴 고양이의 수다스러운 성격, 단모 관리, 치아흡수성병변·호흡기 취약성, 사회적 욕구 충족 방법까지 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-06-23T13:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>샴 고양이는 고양이 세계에서 가장 '수다스러운' 품종으로 통한다. 파란 눈, 포인트 컬러, 슬림한 몸통이 특징인 이 품종은 단순한 반려동물을 넘어 집 안의 대화 상대처럼 느껴질 만큼 사람과의 교감을 즐긴다. ASPCA는 샴을 사람 의존도가 매우 높은 품종으로 분류하며, 사회적 욕구가 충족되지 않으면 심한 스트레스 행동이 나타날 수 있다고 경고한다. 평균 수명은 12–20년으로 장수 품종에 속한다.</p>

<h2>품종 기본 특성</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <tbody>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">크기</td>
      <td style="padding:10px;border:1px solid #dee2e6;">중형 / 성묘 체중 3.5–5kg, 날씬하고 근육질</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">평균 수명</td>
      <td style="padding:10px;border:1px solid #dee2e6;">12–20년 (장수 품종)</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">털 타입</td>
      <td style="padding:10px;border:1px solid #dee2e6;">단모, 짧고 촘촘 — 털 관리 부담 적음</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">성격</td>
      <td style="padding:10px;border:1px solid #dee2e6;">사교적·수다스러움·애정 욕구 강함, 혼자 두면 스트레스</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">활동량</td>
      <td style="padding:10px;border:1px solid #dee2e6;">높음 / 장난감·상호작용 놀이 필수</td>
    </tr>
  </tbody>
</table>

<h2>건강 취약점과 정기 검진 포인트</h2>
<p>샴 고양이는 특정 유전 질환과 호흡기 취약성이 알려져 있다. VCA Animal Hospitals에 따르면 샴 고양이에서 치아흡수성병변(FORLs) 발생률이 다른 품종에 비해 높으며, 이 질환은 초기 증상이 없어 정기적인 구강 검진이 특히 중요하다.</p>
<ul>
  <li><strong>치아흡수성병변(FORLs)</strong>: 치아 구조가 녹는 고양이 특유의 치과 질환. 샴에서 발생률이 높음. 연 1회 치과 검진 권장</li>
  <li><strong>호흡기 질환</strong>: 고양이 천식·만성 기관지염에 취약. 흡연·방향제 등 공기 오염 물질 노출 최소화. WSAVA 반려동물 환경 가이드라인은 샴처럼 호흡기 민감한 품종의 실내 공기질 관리를 우선순위로 다룬다</li>
  <li><strong>심장 질환(HCM)</strong>: 비대성 심근병증 위험. 5세 이후 심장 초음파 정기 점검 권장</li>
  <li><strong>사시·안진</strong>: 신경 연결 방식의 유전적 특성. 시각에 영향은 거의 없지만 선천적 형질</li>
  <li><strong>분리불안</strong>: 사람과의 유대가 강해 장시간 혼자 두면 과도한 울음·파괴 행동 발생</li>
</ul>

<h2>케어 가이드 — 털·치아·환경</h2>
<ol>
  <li><strong>브러싱</strong>: 단모라 주 1–2회면 충분. 고무 브러시로 죽은 털 제거</li>
  <li><strong>치아 관리</strong>: 주 3회 이상 양치. FORLs 예방에 가장 효과적인 방법</li>
  <li><strong>목욕</strong>: 단모라 자기 그루밍으로 대부분 해결. 한 달에 1회 또는 필요 시</li>
  <li><strong>공기질</strong>: 호흡기 취약성을 고려해 담배 연기, 강한 방향제, 향초는 피한다</li>
  <li><strong>환경 자극</strong>: 캣타워·창문 해먹·터널·스마트 장난감으로 활동 욕구 충족</li>
</ol>

<h2>행동 이해 — 울음과 사회적 욕구</h2>
<p>샴 고양이의 울음소리는 고양이 중에서 가장 크고 낮으며, 사람의 아기 울음소리와 닮았다. 이 울음은 욕구 표현의 주요 수단이다.</p>
<ul>
  <li>배고픔·관심 요구·불안 모두 울음으로 표현. 각 상황을 구분해 적절히 반응하는 것이 중요</li>
  <li>반려묘를 2마리 이상 키우거나 충분한 상호작용 시간을 확보하면 분리불안이 줄어든다</li>
  <li>훈련 적성이 높아 클리커 훈련, 하네스 산책 등도 시도해볼 수 있다</li>
</ul>

<h2>생활 환경 — 아파트 적합성</h2>
<p>샴 고양이는 <strong>아파트 생활 가능</strong>하지만, 보호자와 많은 시간을 함께 보낼 수 있는 환경이 전제되어야 한다. 하루 종일 혼자 있는 직장인 가정에서는 두 마리 이상을 함께 키우거나 펫시터를 활용하는 것이 권장된다.</p>

<h2>자주 묻는 질문</h2>
<h3>샴 고양이는 왜 이렇게 많이 우나요?</h3>
<p>원하는 것이 있거나 외로울 때 적극적으로 표현하는 것이 이 품종의 특성입니다. 배고픔·화장실 청결·놀이 욕구가 충족되어 있는지 먼저 확인하세요.</p>

<h3>샴 고양이를 혼자 오래 두어도 되나요?</h3>
<p>하루 8시간 이상 혼자 두는 것은 이 품종에게 스트레스가 큽니다. 두 마리 이상 동반 입양을 고려하거나, 풍부한 환경(캣타워·장난감·창문 시트)을 갖춰주세요.</p>

<p>다른 고양이 품종과 비교하고 싶다면 <a href="/blog/cat-breed-selection-guide">고양이 품종 선택 가이드</a>를, 의료비 대비 보험 정보는 <a href="/blog/pet-insurance-guide">펫보험 완전 가이드</a>를 참고하세요.</p>`,
  },

  /* ═══════════════════════════════════════════════════════
   * 188. 브리티시 숏헤어 완전 케어 가이드
   * ═══════════════════════════════════════════════════════ */
  {
    id: "blog-188",
    slug: "british-shorthair-care-guide",
    type: "blog",
    category: 5,
    title: "브리티시 숏헤어 완전 케어 가이드 — 특성·건강·생활",
    metaTitle: "브리티시 숏헤어 케어 가이드 | 특성·건강·관리·생활 | 펫지기",
    metaDescription:
      "브리티시 숏헤어의 독립적 성격, 비대성 심근병증 취약성, 플러시 털 관리, 비만 예방, 아파트 생활 적합성까지 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-06-23T18:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>브리티시 숏헤어는 '쿠션 같은 털'과 '동그란 얼굴'로 표현되는 묵직한 외모와 침착한 성격을 가진 품종이다. 과도한 관심을 요구하지 않고 독립적이어서 바쁜 현대인과 잘 맞는다는 평이 많다. AKC(아메리칸 케넬 클럽) 고양이 품종 데이터에 따르면 성묘 체중은 4–8kg, 평균 수명은 12–17년으로 대형 품종치고 장수하는 편이다. 그 조용함 뒤에 주의해야 할 건강 포인트가 있다.</p>

<h2>품종 기본 특성</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <tbody>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">크기</td>
      <td style="padding:10px;border:1px solid #dee2e6;">중대형 / 성묘 체중 4–8kg, 근육질·묵직한 체형</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">평균 수명</td>
      <td style="padding:10px;border:1px solid #dee2e6;">12–17년</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">털 타입</td>
      <td style="padding:10px;border:1px solid #dee2e6;">단모지만 밀도 높은 플러시 코트 — 환절기 털 빠짐 있음</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">성격</td>
      <td style="padding:10px;border:1px solid #dee2e6;">독립적·침착·온화, 안기는 것보다 곁에 있기 선호</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">활동량</td>
      <td style="padding:10px;border:1px solid #dee2e6;">낮음–보통 / 놀이 시간 확보 안 하면 비만 위험</td>
    </tr>
  </tbody>
</table>

<h2>건강 취약점과 정기 검진 포인트</h2>
<p>브리티시 숏헤어에서 가장 주의할 질환은 <strong>비대성 심근병증(HCM)</strong>이다. VCA Animal Hospitals는 브리티시 숏헤어를 HCM 발생 위험이 높은 품종으로 분류하며, 정기적인 심장 청진과 초음파 검사가 조기 발견에 중요하다고 설명한다. 고양이 심장 질환 중 가장 흔한 형태로, 유전적 소인이 있는 품종에서 발생률이 높다. WSAVA 가이드라인은 HCM 위험 품종의 브리더 선택 시 부모묘의 심장 검사 이력 확인을 필수로 권고한다.</p>
<ul>
  <li><strong>HCM(비대성 심근병증)</strong>: 심장 근육이 두꺼워지는 질환. 증상이 없다가 갑자기 발현되는 경우가 있어 5세 이후 연 1회 심장 초음파 권장</li>
  <li><strong>비만</strong>: 활동량이 적고 먹는 것을 좋아해 과체중이 오기 쉽다. 퍼즐 피더·놀이로 활동 유도 필요</li>
  <li><strong>관절염</strong>: 체중이 무거워 노령기 관절 부담. 캣타워 단수 낮추기, 낮은 화장실 사용 권장</li>
  <li><strong>치주질환</strong>: 규칙적인 치아 관리 필요. 주 2–3회 양치 권장</li>
</ul>

<h2>케어 가이드 — 플러시 코트 관리</h2>
<p>브리티시 숏헤어의 짧지만 밀도 높은 털은 생각보다 털 빠짐이 많다. 특히 환절기에는 관리가 필요하다. ASPCA는 브리티시 숏헤어의 플러시 코트 특성상 환절기 브러싱 빈도를 늘리면 헤어볼 형성도 함께 줄일 수 있다고 안내한다.</p>
<ol>
  <li><strong>브러싱</strong>: 주 2회, 고무 브러시 또는 슬리커 브러시. 환절기에는 주 3–4회</li>
  <li><strong>목욕</strong>: 단모라 한 달 1회 또는 필요 시. 자기 그루밍 능력이 뛰어남</li>
  <li><strong>체중 관리</strong>: 월 1회 체중 측정 습관화. 이상 체중 기준(품종별)을 수의사와 확인</li>
  <li><strong>치아</strong>: 주 2–3회 양치 또는 치과용 간식·젤 활용</li>
</ol>

<h2>성격과 생활 적응</h2>
<p>브리티시 숏헤어는 '고양이답게 독립적'이라는 말이 가장 잘 어울리는 품종이다. 무릎에 올라오기보다 옆에 앉아 있기를 선호하고, 혼자만의 시간도 충분히 즐긴다. 그렇다고 완전한 독립형은 아니다 — 하루 1–2회 상호작용 놀이 시간은 정신 건강에 중요하다.</p>

<h2>생활 환경 — 아파트 적합성</h2>
<p>조용하고 활동량이 낮아 <strong>아파트 생활에 매우 적합</strong>하다. 다른 고양이나 개와도 잘 지내는 편이어서 다묘 가정에도 어울린다. 단, 비만 관리를 위한 놀이 환경(캣타워·장난감)은 반드시 갖춰야 한다.</p>

<h2>자주 묻는 질문</h2>
<h3>브리티시 숏헤어는 안기기를 싫어하나요?</h3>
<p>개체마다 다르지만, 일반적으로 억지로 안기는 것보다 보호자 옆에 스스로 자리 잡는 것을 선호합니다. 강제로 안으면 오히려 거리를 두는 경향이 있습니다.</p>

<h3>브리티시 숏헤어는 다른 고양이와 잘 지내나요?</h3>
<p>침착한 성격 덕분에 다른 고양이와 갈등이 적은 편입니다. 다만 새로운 고양이를 들일 때는 격리 후 냄새 교환 방식의 단계적 합사를 권장합니다.</p>

<p>다른 고양이 품종과 비교하고 싶다면 <a href="/blog/cat-breed-selection-guide">고양이 품종 선택 가이드</a>를, 심장 질환 대비 보험 정보는 <a href="/blog/pet-insurance-guide">펫보험 완전 가이드</a>를 참고하세요.</p>`,
  },

  /* ═══════════════════════════════════════════════════════
   * 189. 메인쿤 완전 케어 가이드
   * ═══════════════════════════════════════════════════════ */
  {
    id: "blog-189",
    slug: "maine-coon-care-guide",
    type: "blog",
    category: 5,
    title: "메인쿤 완전 케어 가이드 — 대형묘 특성·건강·관리",
    metaTitle: "메인쿤 케어 가이드 | 대형묘 특성·건강·털 관리·훈련 | 펫지기",
    metaDescription:
      "메인쿤의 대형묘 특성, HCM·SMA 유전 질환, 세미롱 털 관리, 개 같은 성격과 훈련 방법까지 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-06-23T23:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>메인쿤은 고양이 품종 중 가장 큰 종 가운데 하나로, 다 자라면 성인 남성 팔뚝 길이에 달하는 개체도 있다. AKC(아메리칸 케넬 클럽) 브리드 데이터에 따르면 수컷 성묘 체중은 최대 10kg 이상, 체장은 100cm에 달하기도 한다. '개 같은 고양이'라는 별명처럼 사람을 따르고, 물을 좋아하고, 훈련이 가능하다. 큰 몸집만큼 관리도, 의료비도 상대적으로 크다는 것을 입양 전에 알아야 한다.</p>

<h2>품종 기본 특성</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <tbody>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">크기</td>
      <td style="padding:10px;border:1px solid #dee2e6;">대형묘 / 성묘 체중 4–10kg (수컷 최대 10kg 이상 가능), 체장 최대 100cm</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">평균 수명</td>
      <td style="padding:10px;border:1px solid #dee2e6;">12–15년</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">털 타입</td>
      <td style="padding:10px;border:1px solid #dee2e6;">세미롱(반장모), 언더코트 있음 — 주 2–3회 브러싱 필요</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">성격</td>
      <td style="padding:10px;border:1px solid #dee2e6;">친화적·호기심 강함·개 같은 충성심, 물놀이 즐김</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">활동량</td>
      <td style="padding:10px;border:1px solid #dee2e6;">보통–높음 / 충분한 수직 공간과 놀이 시간 필요</td>
    </tr>
  </tbody>
</table>

<h2>건강 취약점과 정기 검진 포인트</h2>
<p>메인쿤은 몇 가지 유전 질환 위험이 알려져 있으며, 대형묘이기 때문에 발병 시 치료 비용도 상대적으로 크다. VCA Animal Hospitals에 따르면 메인쿤의 HCM(비대성 심근병증)은 품종 특이적인 유전자 변이(MyBPC3)와 관련이 있으며, DNA 검사로 위험 개체를 사전에 확인할 수 있다. WSAVA 브리더 가이드라인은 메인쿤 입양 시 부모묘의 HCM 음성 검사 결과 확인을 강력히 권장한다.</p>
<ul>
  <li><strong>HCM(비대성 심근병증)</strong>: 메인쿤에서 특히 흔한 유전 질환. 4세 이후 연 1회 심장 초음파 권장. 믿을 수 있는 브리더에서 HCM 음성 검증 개체를 입양하는 것이 중요</li>
  <li><strong>SMA(척수성 근위축증)</strong>: 하반신 근육 약화를 초래하는 유전 질환. DNA 검사로 보인자 여부 확인 가능</li>
  <li><strong>고관절 이형성증</strong>: 대형묘 특성상 관절에 부담이 크다. OFA 조사에 따르면 대형 고양이 품종에서 고관절 이상 발생률이 소형 품종보다 높게 나타나므로 체중 관리와 적정 활동이 핵심 예방법이다</li>
  <li><strong>치주질환</strong>: 체구에 비해 이빨 관리가 소홀해지기 쉽다. 주 2–3회 양치 권장</li>
</ul>

<h2>케어 가이드 — 세미롱 털 관리</h2>
<p>메인쿤의 세미롱 코트는 장모 품종만큼 관리 부담이 크지 않지만, 환절기 털 빠짐은 상당하다. ASPCA는 메인쿤의 세미롱 코트 관리를 위해 스테인리스 핀 브러시와 언더코트 레이크 사용을 권고하며, 특히 꼬리와 배 아래 장식 털은 엉킴이 잘 생기므로 우선 확인 구역이라고 안내한다.</p>
<ol>
  <li><strong>브러싱</strong>: 주 2–3회, 핀 브러시 또는 언더코트 레이크. 환절기에는 매일</li>
  <li><strong>목욕</strong>: 한 달 1회 또는 필요 시. 물을 좋아하는 개체가 많아 목욕 저항이 낮은 편</li>
  <li><strong>꼬리·배 털</strong>: 장식 털이 뭉치기 쉬우므로 빗질 후 엉킴 확인</li>
  <li><strong>발바닥 털</strong>: 발 사이에 긴 털이 자라 미끄러움 원인. 주기적 정리 필요</li>
  <li><strong>캣타워</strong>: 대형묘를 지탱할 수 있는 튼튼한 제품 필요 (최소 하중 10kg 이상)</li>
</ol>

<h2>개 같은 성격과 훈련</h2>
<p>메인쿤은 고양이 중에서 훈련 적성이 가장 높은 편에 속한다. 이름 부르면 달려오고, 하네스 착용 후 산책도 가능하다.</p>
<ul>
  <li>클리커 훈련: 앉아·악수 등 기본 명령어 훈련이 가능</li>
  <li>하네스 산책: 서서히 익숙해지도록 실내에서 먼저 착용 연습</li>
  <li>물 관련: 수도꼭지 흐르는 물, 얕은 물그릇을 즐기는 경우 많음 — 분수형 급수기 추천</li>
</ul>

<h2>생활 환경 — 아파트 적합성</h2>
<p>체구가 크지만 성격이 온화해 <strong>아파트도 가능</strong>하다. 단 수직 공간(캣타워·선반)이 충분해야 하고, 대형묘를 지탱할 수 있는 튼튼한 가구가 필요하다. 화장실은 대형 사이즈를 사용해야 한다.</p>

<h2>자주 묻는 질문</h2>
<h3>메인쿤은 완성되는 데 얼마나 걸리나요?</h3>
<p>메인쿤은 성장이 느린 품종으로 완전한 성묘 체형이 되기까지 3–5년이 걸립니다. 강아지처럼 오래 '아이' 티를 냅니다.</p>

<h3>메인쿤은 물에 들어가나요?</h3>
<p>물을 좋아하는 개체가 많습니다. 수도꼭지 물이나 얕은 물그릇에 발을 담그는 행동을 자주 보입니다. 욕실에 함께 들어오려는 경우도 흔합니다.</p>

<p>다른 대형묘와 비교하고 싶다면 <a href="/blog/cat-breed-selection-guide">고양이 품종 선택 가이드</a>를, 유전 질환 대비 보험 정보는 <a href="/blog/pet-insurance-guide">펫보험 완전 가이드</a>를 참고하세요.</p>`,
  },

  /* ═══════════════════════════════════════════════════════
   * 190. 페르시안 고양이 완전 케어 가이드
   * ═══════════════════════════════════════════════════════ */
  {
    id: "blog-190",
    slug: "persian-cat-care-guide",
    type: "blog",
    category: 5,
    title: "페르시안 고양이 완전 케어 가이드 — 장모·눈물·건강 관리",
    metaTitle: "페르시안 고양이 케어 가이드 | 장모·눈물·건강·관리 | 펫지기",
    metaDescription:
      "페르시안 고양이의 장모 매일 빗질, 눈물 착색 관리, 다낭성 신장병(PKD) 유전 질환, 단두종 특성까지 한 곳에 정리했습니다.",
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-06-24T04:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
    body: `<p>페르시안 고양이는 고양이 품종 중에서 가장 화려한 장모를 가진 것으로 손꼽힌다. 조용하고 우아하며 인형 같은 외모로 오랜 시간 최인기 품종 자리를 지키고 있다. AKC(아메리칸 케넬 클럽) 고양이 브리드 스탠다드에 따르면 성묘 체중은 3–6kg이며, ASPCA는 페르시안을 차분하고 조용한 실내 생활에 최적화된 품종으로 분류한다. 그 풍성한 털은 매일의 빗질 없이는 유지할 수 없고, 납작한 얼굴 구조로 인한 건강 취약점도 반드시 알아야 한다.</p>

<h2>품종 기본 특성</h2>
<table style="width:100%;border-collapse:collapse;margin:16px 0;">
  <tbody>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">크기</td>
      <td style="padding:10px;border:1px solid #dee2e6;">중형 / 성묘 체중 3–6kg, 통통하고 낮은 체형</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">평균 수명</td>
      <td style="padding:10px;border:1px solid #dee2e6;">10–17년</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">털 타입</td>
      <td style="padding:10px;border:1px solid #dee2e6;">장모, 이중 코트(아우터 + 언더) — 매일 빗질 필수</td>
    </tr>
    <tr>
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">성격</td>
      <td style="padding:10px;border:1px solid #dee2e6;">조용·온순·애교, 과도한 자극 싫어함</td>
    </tr>
    <tr style="background:#f8f9fa;">
      <td style="padding:10px;border:1px solid #dee2e6;font-weight:600;">활동량</td>
      <td style="padding:10px;border:1px solid #dee2e6;">낮음 / 조용한 실내 생활 선호</td>
    </tr>
  </tbody>
</table>

<h2>건강 취약점과 정기 검진 포인트</h2>
<p>페르시안은 외모와 직결된 건강 문제가 많다. 납작한 얼굴(단두종)과 눈물 과다, 유전성 신장 질환이 이 품종의 3대 건강 주의 포인트다. VCA Animal Hospitals에 따르면 페르시안의 다낭성 신장병(PKD)은 PKD1 유전자 돌연변이로 발생하며, 일부 연구에서 페르시안의 30–40%에서 이 유전자 변이가 확인된다고 보고한다. WSAVA 가이드라인은 PKD 검사를 거친 음성 개체의 번식만이 품종 내 유전 질환 감소에 기여한다고 강조한다.</p>
<ul>
  <li><strong>다낭성 신장병(PKD)</strong>: 신장에 낭종이 생기는 유전 질환. DNA 검사(PKD1 유전자)로 보인자 여부 확인 가능 — 입양 시 브리더에게 검사 결과 요청</li>
  <li><strong>눈물 과다·착색</strong>: 납작한 얼굴 구조로 눈물관이 좁아 눈물이 흘러내림. 매일 닦지 않으면 피부 짓무름과 착색 심화</li>
  <li><strong>단두종 기도</strong>: 호흡 효율이 낮아 더위·흥분 시 호흡 곤란. 냉방 관리 중요</li>
  <li><strong>치주질환</strong>: 치아가 조밀하게 배열되어 치석 축적. 주 2–3회 양치 권장</li>
  <li><strong>피부 감염</strong>: 얼굴 주름 사이 습기 차면 세균 번식. 매일 청소 필요</li>
</ul>

<h2>케어 가이드 — 장모 관리와 눈 닦기</h2>
<p>페르시안 케어의 핵심은 <strong>매일 빗질</strong>과 <strong>매일 눈 닦기</strong>다. 이 두 가지를 빠뜨리면 건강과 외모 모두 빠르게 나빠진다. ASPCA는 페르시안 장모 관리에서 엉킴이 심해진 경우 억지로 당기지 말고 전문 미용사에게 의뢰하도록 권고하며, 피부 자극과 통증을 예방할 수 있다고 안내한다.</p>
<ol>
  <li><strong>빗질</strong>: 매일, 스테인리스 핀 브러시 → 와이드 투스 빗 순. 엉킴은 억지로 당기지 말고 디탱글러 스프레이를 사용</li>
  <li><strong>눈 닦기</strong>: 매일 아침, 생리식염수에 적신 화장솜으로 눈 가장자리부터 안쪽으로 부드럽게 닦기</li>
  <li><strong>얼굴 주름</strong>: 눈물이 고이는 코 옆 주름은 매일 건식 면봉으로 청소 후 건조</li>
  <li><strong>목욕</strong>: 한 달 1회. 장모는 드라이어로 완전 건조가 필수 (습기 남으면 피부 짓무름)</li>
  <li><strong>미용</strong>: 4–6주마다 전문 미용사에게 의뢰. 위생컷(항문 주변·발바닥 털 정리) 포함</li>
</ol>

<div style="background:#fff3cd;border-left:4px solid #ffc107;padding:16px;margin:16px 0;">
  <strong>PKD 입양 전 체크</strong><br>
  브리더에서 입양할 경우 부모묘의 PKD 음성 검사 결과서를 반드시 확인하세요. 믿을 수 있는 브리더는 이 서류 제공을 거부하지 않습니다.
</div>

<h2>성격과 생활 적응</h2>
<p>페르시안은 고양이 중에서 가장 조용하고 온화한 편이다. 갑작스러운 소음이나 환경 변화에 스트레스를 받는다. 어린 아이나 활발한 개가 있는 가정보다 조용한 환경이 더 잘 맞는다. VCA Animal Hospitals는 페르시안의 스트레스 반응이 면역 억제로 이어질 수 있으므로 환경 안정성 유지가 건강에도 직결된다고 설명한다.</p>

<h2>생활 환경 — 아파트 적합성</h2>
<p>활동량이 낮고 조용해 <strong>아파트 생활에 최적</strong>이다. 단, 매일의 그루밍 시간이 상당하므로 바쁜 보호자에게는 관리 부담이 크다. 장모 관리 시간을 매일 확보할 수 있는 보호자에게 적합한 품종이다.</p>

<h2>자주 묻는 질문</h2>
<h3>페르시안 고양이 눈물 착색은 완전히 없앨 수 있나요?</h3>
<p>착색된 털 자체를 원래대로 되돌리기는 어렵습니다. 미용 시 착색 부위를 정리하고, 이후 매일 닦아 재착색을 방지하는 것이 현실적인 접근법입니다. 착색이 갑자기 심해지면 눈물관 막힘이나 눈 질환을 동물병원에서 확인하세요.</p>

<h3>페르시안은 털 때문에 더위를 많이 타나요?</h3>
<p>장모와 단두종 특성이 겹쳐 더위에 매우 취약합니다. 여름철 실내 온도 26°C 이하 유지, 한낮 야외 노출 최소화가 필수입니다.</p>

<h3>페르시안 고양이는 털이 많이 빠지나요?</h3>
<p>장모 이중 코트라 털 빠짐이 많습니다. 매일 빗질로 죽은 털을 제거하면 실내 오염을 어느 정도 줄일 수 있지만, 공기청정기와 잦은 청소는 필수입니다.</p>

<p>다른 고양이 품종과 비교하고 싶다면 <a href="/blog/cat-breed-selection-guide">고양이 품종 선택 가이드</a>를, PKD 등 유전 질환 대비 보험 정보는 <a href="/blog/pet-insurance-guide">펫보험 완전 가이드</a>를 참고하세요.</p>`,
  },
];

async function seed() {
  console.log(`[seed] blog-posts-19: ${POSTS.length}개 삽입 시작`);
  for (const post of POSTS) {
    await db.insert(contents).values(post).onConflictDoUpdate({
      target: contents.id,
      set: { title: post.title, body: post.body, updatedAt: NOW },
    });
    console.log(`  ✓ ${post.slug}`);
  }
  console.log("[seed] 완료");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
