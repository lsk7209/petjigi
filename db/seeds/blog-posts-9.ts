import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

const NOW = new Date().toISOString();

const YMYL_DISCLAIMER =
  "이 글은 일반적인 정보 제공 목적으로 작성되었으며, 수의학적 진단·처방·치료를 대체하지 않습니다. 반려동물의 건강 이상이 의심될 경우 반드시 동물병원에서 수의사의 진료를 받으세요.";

const LEGAL_DISCLAIMER =
  "이 글은 일반적인 정보 제공 목적으로 작성되었으며, 법률·금융·보험 자문을 대체하지 않습니다. 구체적인 법률 해석이나 보험 선택은 전문가와 상담하시기 바랍니다.";

function scheduleDate(index: number): string {
  const start = new Date("2026-05-22T10:00:00");
  const d = new Date(start.getTime() + index * 5 * 60 * 60 * 1000);
  return d.toISOString();
}

const BLOG_POSTS_9: NewContent[] = [
  // ── 81. 고양이 백혈병 바이러스(FeLV) (cat3, YMYL) ──
  {
    id: "blog-cat-felv-guide",
    slug: "cat-felv-guide",
    type: "blog",
    category: 3,
    title: "고양이 백혈병 바이러스(FeLV) — 감염 경로·검사·관리 완전 정리",
    metaTitle: "고양이 FeLV 백혈병 바이러스 | 감염 경로·증상·예방접종·관리 | 펫지기",
    metaDescription: "고양이 백혈병 바이러스(FeLV) 감염 경로, 증상, 검사 방법, 예방접종 중요성. FeLV 양성 고양이의 생활 관리와 공존 가능성.",
    body: `<p>고양이 백혈병 바이러스(FeLV, Feline Leukemia Virus)는 고양이 사망 원인 중 감염병으로는 가장 높은 비중을 차지하는 레트로바이러스다. Cornell Feline Health Center에 따르면 전 세계 고양이의 약 2~3%가 FeLV에 지속 감염된 상태다.</p>

<h2>감염 경로</h2>
<p>FeLV는 감염된 고양이의 타액, 코 분비물, 소변, 대변, 모유를 통해 전파된다. 고양이끼리 그루밍하거나, 밥그릇·물그릇을 공유하거나, 물림 상처를 통해 전파될 수 있다. 실내 단독 사육이라면 위험이 매우 낮다. 야외 접촉이 있는 고양이, 보호소나 다묘 환경이 고위험군이다.</p>

<h2>FeLV 감염의 세 가지 결과</h2>
<ul>
  <li><strong>제거(Regressive)</strong>: 건강한 면역계가 바이러스를 억제해 잠복 상태로 전환. 혈액에서는 검출되지 않지만 DNA에 잔류</li>
  <li><strong>지속 감염(Progressive)</strong>: 바이러스가 지속적으로 복제되며 면역 억제, 빈혈, 림프종 유발</li>
  <li><strong>일시 감염</strong>: 노출 후 수주 이내 바이러스 제거 (주로 어른 고양이에서)</li>
</ul>

<h2>증상</h2>
<p>초기에는 증상이 없다. 지속 감염 시 서서히 나타나는 증상: 무기력·식욕 감소, 체중 감소, 창백한 잇몸(빈혈), 반복적인 감염(면역 저하), 구강 염증, 설사, 호흡 곤란. 림프종 발생 시 림프절 종창이 나타난다.</p>

<h2>검사와 예방접종</h2>
<p>ELISA 항원 검사로 진단할 수 있으며, 새로운 고양이를 입양할 때, 다묘 환경에 새 고양이를 들이기 전, 야외 활동이 있는 고양이에게 정기적으로 검사를 권고한다. WSAVA는 실외 활동을 하는 모든 고양이에게 FeLV 예방접종을 핵심 백신으로 권고한다.</p>

<h2>FeLV 양성 고양이의 생활 관리</h2>
<p>FeLV 양성 진단을 받아도 적절한 관리로 건강하게 생활할 수 있다. 완전 실내 사육, 격리(다른 고양이와 분리), 연 2회 이상 건강 모니터링, 스트레스 최소화가 핵심이다. 면역이 저하된 상태이므로 생식은 피하고 균형 잡힌 영양 관리가 중요하다. FeLV는 사람에게 전염되지 않는다. <a href="/insurance/compare">펫보험</a>을 통해 장기 의료비를 대비해 두자.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(50),
    authorName: "펫지기 에디터",
    sources: [
      "Cornell Feline Health Center — Feline Leukemia Virus",
      "WSAVA — Vaccination Guidelines (FeLV)",
      "Journal of Feline Medicine and Surgery — FeLV Management",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 82. 강아지 골절 가이드 (cat3, YMYL) ──
  {
    id: "blog-dog-fracture-guide",
    slug: "dog-fracture-guide",
    type: "blog",
    category: 3,
    title: "강아지 골절 — 응급 처치와 동물병원 가기 전 해야 할 것",
    metaTitle: "강아지 골절 응급 처치 | 부목·이동·병원 전 대처 | 펫지기",
    metaDescription: "강아지 골절 의심 시 집에서 할 수 있는 응급 처치. 강아지를 안전하게 고정·이동하는 방법, 골절 증상 확인, 동물병원 가기 전 주의사항.",
    body: `<p>강아지가 사고를 당하거나 높은 곳에서 떨어진 후 다리를 들고 걷지 못한다면 골절을 의심해야 한다. 보호자가 패닉 상태가 되기 쉬운 상황이지만, 몇 가지 원칙을 알고 있으면 강아지를 더 안전하게 도울 수 있다.</p>

<h2>골절 의심 신호</h2>
<ul>
  <li>사고 직후 특정 다리에 체중을 전혀 싣지 못하거나 극심하게 절뚝임</li>
  <li>다리 모양이 비정상적으로 구부러지거나 튀어나온 형태</li>
  <li>극심한 통증 반응 (건드리면 울거나 으르렁)</li>
  <li>피부가 찢어지고 뼈가 노출된 경우 (개방 골절 — 즉각 응급)</li>
  <li>부기와 타박상</li>
</ul>

<h2>즉시 해야 할 것</h2>

<h3>1. 강아지 안정시키기</h3>
<p>통증으로 인한 공격 위험이 있다. 입마개가 있으면 적용하거나 부드러운 천으로 주둥이를 감싼다. 강아지를 최대한 움직이지 않게 한다.</p>

<h3>2. 부상 부위를 고정하려 하지 않는다</h3>
<p>뼈를 맞추거나 부목을 집에서 직접 대려 하면 추가 손상이 생길 수 있다. 이동 전 고정은 수의사가 한다.</p>

<h3>3. 안전하게 이동하기</h3>
<p>단단한 보드 위에 강아지를 눕히거나, 담요를 들것처럼 활용해 이동한다. 다친 다리가 흔들리지 않도록 부드럽게 지지한다. 강아지 스스로 걷게 하지 않는다.</p>

<h3>4. 개방 골절이면 상처 덮기</h3>
<p>뼈가 노출된 경우 깨끗하고 축축한 거즈로 덮어 오염을 최소화하고 즉시 이동한다.</p>

<h2>절대 하지 말아야 할 것</h2>
<ul>
  <li>강아지가 다친 다리로 걷게 두기</li>
  <li>사람용 진통제 투여 (강아지에게 독성이 있는 경우가 많다)</li>
  <li>뼈를 제자리에 맞추려는 시도</li>
  <li>냉찜질 직접 접촉 (수건으로 감싼 아이스팩을 간접적으로)</li>
</ul>

<h2>치료와 회복</h2>
<p>골절 치료 방법은 부위, 골절 유형, 강아지 나이와 크기에 따라 수의사가 결정한다. 외고정, 내고정 수술, 깁스 등 다양한 방법이 있으며 회복 기간은 수주~수개월까지 걸릴 수 있다. 골절 치료는 고비용이 드는 경우가 많다. <a href="/insurance/compare">펫보험</antml>으로 미리 대비해 두면 경제적 부담을 줄일 수 있다.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(51),
    authorName: "펫지기 에디터",
    sources: [
      "American Veterinary Medical Association (AVMA) — Pet First Aid",
      "Merck Veterinary Manual — Fractures in Dogs",
      "WSAVA — Emergency and Critical Care Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 83. 고양이 FIV 가이드 (cat3, YMYL) ──
  {
    id: "blog-cat-fiv-guide",
    slug: "cat-fiv-guide",
    type: "blog",
    category: 3,
    title: "고양이 면역결핍 바이러스(FIV) — 양성이어도 함께 살 수 있다",
    metaTitle: "고양이 FIV 면역결핍 바이러스 | 감염·증상·관리·공존 | 펫지기",
    metaDescription: "고양이 FIV(면역결핍 바이러스) 감염 경로, 진단, FIV 양성 고양이와의 생활. 사람에게 전염되지 않으며, 관리로 정상에 가까운 생활 가능.",
    body: `<p>고양이 FIV(Feline Immunodeficiency Virus)는 고양이 에이즈라고도 불리지만, 사람의 HIV와는 다르며 사람에게 전염되지 않는다. FIV 양성 진단을 받으면 많은 보호자가 안락사를 고려하지만, 적절한 관리로 수년 이상 건강하게 지낼 수 있다.</p>

<h2>감염 경로</h2>
<p>FIV는 주로 깊은 물림 상처를 통해 전파된다. 침 자체의 낮은 농도로는 일반적인 접촉(그루밍, 밥그릇 공유)으로 전파되는 경우는 드물다. 따라서 고양이끼리 서로 공격하지 않는 안정된 다묘 환경에서는 FIV 양성 고양이와 음성 고양이가 함께 살 수 있다. 어미에서 새끼로 수직 전파도 가능하다.</p>

<h2>FIV 감염의 단계</h2>
<ul>
  <li><strong>급성기</strong>: 감염 후 수주. 일시적인 무기력·발열·림프절 종창. 대부분 회복됨.</li>
  <li><strong>무증상 잠복기</strong>: 수년간 임상 증상 없이 지속. 이 기간이 대부분의 시간이다.</li>
  <li><strong>진행기</strong>: 면역 저하로 인한 반복 감염, 구강 질환, 체중 감소</li>
</ul>

<h2>진단과 관리</h2>
<p>혈액 내 FIV 항체 검사로 진단한다. 생후 6개월 미만 고양이는 어미의 항체가 남아 있어 위양성이 가능하므로 6개월 후 재검사가 필요하다. FIV 양성 고양이 관리 원칙:</p>
<ul>
  <li>완전 실내 사육 — 면역 저하 상태에서 외부 병원체 노출 최소화</li>
  <li>연 1~2회 이상 건강검진 — 반복 감염 조기 발견</li>
  <li>완전 영양 사료 급여, 생식 금지 (면역 저하로 식중독 위험)</li>
  <li>스트레스 최소화</li>
  <li>예방접종 유지 — 단, 생백신은 수의사 지도 하에 신중히 결정</li>
</ul>

<h2>FIV와 FeLV의 차이</h2>
<p>FIV 양성 고양이의 평균 생존 기간은 진단 후 약 5년 이상으로 FeLV보다 예후가 좋다. Cornell Feline Health Center에 따르면 FIV 양성 고양이가 반드시 일찍 사망하는 것은 아니며, 많은 고양이가 정상 수명에 가깝게 살 수 있다. <a href="/blog/cat-felv-guide">FeLV 가이드</a>도 함께 참고하자.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(52),
    authorName: "펫지기 에디터",
    sources: [
      "Cornell Feline Health Center — Feline Immunodeficiency Virus",
      "WSAVA — Vaccination Guidelines (FIV)",
      "Journal of Feline Medicine and Surgery — FIV Long-term Management",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 84. 강아지 중독 응급 처치 (cat3, YMYL) ──
  {
    id: "blog-dog-poisoning-first-aid",
    slug: "dog-poisoning-first-aid",
    type: "blog",
    category: 3,
    title: "강아지 독성 물질 섭취 — 응급 처치와 해서는 안 되는 것",
    metaTitle: "강아지 중독 응급 처치 | 독성 물질 섭취 시 대처법 | 펫지기",
    metaDescription: "강아지가 독성 물질을 먹었을 때 즉시 해야 할 것과 절대 하지 말아야 할 것. 자일리톨·초콜릿·쥐약·살충제 대처법, 동물 중독 상담 연락처.",
    body: `<p>강아지가 위험한 것을 먹었다는 것을 알아챘을 때 머릿속이 하얘지는 경험을 한 보호자가 있을 것이다. 독성 물질 섭취 상황에서 가장 중요한 것은 올바른 정보로 빠르게 행동하는 것이다. 잘못된 처치가 오히려 강아지를 위험에 빠뜨릴 수 있다.</p>

<h2>발견 즉시 해야 할 것</h2>
<ol>
  <li><strong>무엇을 얼마나 먹었는지 파악한다</strong>: 섭취 물질, 예상 양, 섭취 시각을 기록한다.</li>
  <li><strong>동물병원 또는 동물 중독 상담센터에 즉시 연락한다</strong>: 전화로 상황을 설명하고 지시를 따른다.</li>
  <li><strong>증상을 관찰한다</strong>: 구토, 경련, 침 흘림, 비틀거림, 무기력, 의식 소실 등</li>
</ol>

<h2>절대 하지 말아야 할 것</h2>
<ul>
  <li><strong>임의로 구토 유발</strong>: 어떤 독성 물질을 먹었느냐에 따라 구토가 오히려 식도·기도 손상을 유발하거나 독성을 빠르게 흡수시킬 수 있다. 반드시 수의사 지시 후에만 시행한다.</li>
  <li><strong>우유나 오일 급여</strong>: 독성 흡수를 촉진할 수 있다는 잘못된 속설이 있는데 근거 없는 처치다.</li>
  <li><strong>인터넷 민간요법 임의 시도</strong>: 상황을 악화시킬 수 있다.</li>
</ul>

<h2>주요 독성 물질별 특징</h2>

<h3>자일리톨 (무설탕 껌·일부 땅콩버터)</h3>
<p>섭취 후 30분~1시간 이내에 저혈당을 유발한다. 증상: 구토, 비틀거림, 경련, 의식 소실. 즉시 응급 병원.</p>

<h3>포도·건포도</h3>
<p>섭취 후 수시간~24시간 내 급성 신부전 가능. 초기 증상이 없어도 즉시 동물병원 방문.</p>

<h3>쥐약 (항응고제)</h3>
<p>증상이 2~7일 후 나타나는 경우가 있다. 출혈(잇몸, 혈변, 혈뇨, 코피)이 특징. 섭취 사실을 알았다면 증상 전에 즉시 동물병원.</p>

<h3>살충제·제초제</h3>
<p>증상: 과다 침 흘림, 동공 수축, 근육 경련. 즉각 응급 처치 필요.</p>

<h2>응급 상황 시 참고 기관</h2>
<p>국내에는 동물 전용 중독 상담 전화가 아직 제한적이다. 동물병원 응급 진료를 즉시 받는 것이 가장 안전하다. 야간·주말에는 24시간 응급 동물병원을 미리 파악해 두는 것이 중요하다. 평소 가까운 24시간 응급 동물병원 번호를 저장해 두자. 독성 음식 전체 목록은 <a href="/blog/dog-toxic-foods">강아지 먹으면 안 되는 음식</a>에서 확인할 수 있다.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(53),
    authorName: "펫지기 에디터",
    sources: [
      "ASPCA Animal Poison Control Center — Pet Poison Prevention",
      "American Veterinary Medical Association (AVMA) — Pet First Aid",
      "Merck Veterinary Manual — Toxicology in Dogs",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 85. 고양이 FIP 가이드 (cat3, YMYL) ──
  {
    id: "blog-cat-fip-guide",
    slug: "cat-fip-guide",
    type: "blog",
    category: 3,
    title: "고양이 전염성 복막염(FIP) — 최신 치료까지 알아야 할 것",
    metaTitle: "고양이 FIP 전염성 복막염 | 증상·진단·GS-441524 치료 | 펫지기",
    metaDescription: "고양이 FIP(전염성 복막염) 습식·건식 증상, 진단 방법, 항바이러스제(GS-441524) 치료 최신 동향. 어린 고양이 FIP 조기 발견과 대처법.",
    body: `<p>한때 FIP(Feline Infectious Peritonitis, 고양이 전염성 복막염)는 진단 후 거의 예외 없이 치명적인 결과로 이어지던 질환이었다. 그러나 최근 항바이러스제의 등장으로 치료 가능성이 크게 달라졌다. 최신 정보를 알고 있으면 포기하지 않아도 되는 상황이 생긴다.</p>

<h2>FIP란</h2>
<p>FIP는 고양이 코로나바이러스(FCoV)의 변이 형태가 원인이다. 대부분의 고양이는 FCoV에 감염돼도 가벼운 장염 증상만 보이지만, 일부에서 바이러스가 돌연변이를 일으켜 면역계를 공격하는 FIP로 발전한다. 5세 미만 고양이, 특히 보호소 환경이나 다묘 환경의 2세 미만 어린 고양이에서 발생률이 높다.</p>

<h2>두 가지 형태</h2>
<ul>
  <li><strong>습식(Wet) FIP</strong>: 복강이나 흉강에 삼출액(복수·흉수)이 차는 형태. 배가 빠르게 불러오는 것이 특징. 진행이 빠르다.</li>
  <li><strong>건식(Dry) FIP</strong>: 삼출액 없이 눈·신경계·복강 장기에 육아종이 형성. 눈의 포도막염, 신경 증상(비틀거림, 경련), 황달 등이 나타난다. 진행이 상대적으로 느리다.</li>
</ul>

<h2>증상</h2>
<ul>
  <li>지속적인 발열 (항생제에 반응하지 않는)</li>
  <li>식욕 감소, 체중 감소, 무기력</li>
  <li>배가 부풀어오름 (습식)</li>
  <li>황달 (공막·잇몸이 노래짐)</li>
  <li>눈 이상 (포도막염 — 눈 색이 변하거나 뿌옇게 됨)</li>
  <li>신경 증상 (비틀거림, 경련, 행동 변화)</li>
</ul>

<h2>최신 치료 — GS-441524</h2>
<p>항바이러스제 GS-441524(렘데시비르 유사 화합물)와 GC376은 FIP에 대한 치료 효과가 임상 연구에서 확인됐다. Journal of Feline Medicine and Surgery에 게재된 연구(2019)에서 GS-441524 투여 그룹의 FIP 고양이 80% 이상에서 임상적 관해가 나타났다. 현재 한국에서는 정식 허가 여부와 처방 가능 여부가 변화하고 있으므로, 반드시 수의사와 최신 현황을 상의해야 한다.</p>

<h2>진단의 어려움</h2>
<p>FIP는 확진이 어렵다. 혈액 AGP(혈청 단백질), A:G 비율, 삼출액 분석, PCR 검사, 조직검사를 종합해 진단한다. 의심이 되면 FIP 경험이 풍부한 동물병원이나 대학병원을 찾는 것이 도움이 된다. 치료비와 관련 정보는 <a href="/insurance/compare">펫보험</a>을 통해 대비할 수 있는지 미리 확인해 두자.</p>`,
    ymyl: true,
    disclaimer: YMYL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(54),
    authorName: "펫지기 에디터",
    sources: [
      "Cornell Feline Health Center — Feline Infectious Peritonitis",
      "Journal of Feline Medicine and Surgery — GS-441524 for FIP Treatment (2019)",
      "WSAVA — Feline Infectious Disease Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 86. 동물보호법 가이드 (cat4, YMYL) ──
  {
    id: "blog-animal-protection-law-guide",
    slug: "animal-protection-law-guide",
    type: "blog",
    category: 4,
    title: "2024년 동물보호법 핵심 정리 — 보호자가 알아야 할 의무와 권리",
    metaTitle: "2024 동물보호법 핵심 정리 | 등록·학대 처벌·외출 규정 | 펫지기",
    metaDescription: "2024년 동물보호법 주요 의무와 금지 행위. 동물등록 의무화, 학대 처벌 기준, 외출 시 목줄 규정, 맹견 관리 의무, 위반 시 과태료·형사처벌.",
    body: `<p>동물보호법은 반려동물 보호자가 반드시 알아야 할 법이다. 2023~2024년 개정을 거쳐 처벌 기준이 강화됐고, 의무 사항이 세분화됐다. 모르면 과태료나 형사처벌을 받을 수 있는 내용을 정리한다.</p>

<h2>동물등록 의무</h2>
<p>생후 3개월 이상 반려견(개)은 동물등록이 법적 의무다. 등록 방법은 내장형 칩, 외장형 칩, 인식표 중 선택할 수 있다(지자체별 상이). 미등록 시 최대 100만 원의 과태료가 부과된다. 동물등록 절차는 <a href="/blog/pet-registration-guide">동물등록 방법 완전 가이드</a>에서 확인하자.</p>

<h2>외출 시 의무 — 목줄·인식표</h2>
<ul>
  <li>반려견 외출 시 목줄 또는 가슴줄 착용 의무 — 미착용 시 과태료</li>
  <li>인식표(동물등록번호·보호자 연락처) 부착 의무</li>
  <li>맹견(도사견, 아메리칸 핏불 테리어, 로트와일러 등 5종 + 지정 품종): 입마개 + 2m 이내 목줄 의무 — 위반 시 형사처벌</li>
  <li>반려견이 타인에게 상해를 입히면 소유자 민사·형사 책임 발생</li>
</ul>

<h2>학대 및 유기 금지</h2>
<p>동물보호법 제8조에 따르면 동물을 목적 없이 죽이거나, 고통을 주거나, 유기하는 행위는 형사처벌 대상이다. 2023년 개정으로 처벌이 강화됐다:</p>
<ul>
  <li>동물 죽임·심각한 학대: 최대 3년 이하 징역 또는 3,000만 원 이하 벌금</li>
  <li>유기: 최대 300만 원 이하 과태료</li>
</ul>

<h2>반려동물 관련 기타 의무</h2>
<ul>
  <li>사망한 반려동물 신고: 동물등록 정보 변경 신고 의무 (시군구청 또는 동물보호관리시스템)</li>
  <li>동물 판매업체의 의무: 등록·월령 표시·계약서 제공 등</li>
  <li>아파트 단지 내 반려동물 규정: 공동주택 관리규약에 따라 다를 수 있음 — 입주 전 확인 필수</li>
</ul>

<h2>알아두면 유용한 조문</h2>
<p>동물보호법 전문은 법제처 국가법령정보센터(www.law.go.kr)에서 확인할 수 있다. 지역마다 조례로 세부 규정이 다를 수 있으므로 지자체 동물보호 담당 부서에 확인하는 것이 정확하다. <a href="/blog/pet-insurance-comparison-guide">펫보험 비교 가이드</a>에서 배상책임 보장을 확인해 법적 분쟁에 대비하자.</p>`,
    ymyl: true,
    disclaimer: LEGAL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(55),
    authorName: "펫지기 에디터",
    sources: [
      "농림축산식품부 — 동물보호법 (2023년 개정)",
      "법제처 국가법령정보센터 — 동물보호법",
      "농림축산식품부 — 반려동물 동물등록제 안내",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 87. 펫보험 비교 가이드 (cat4, YMYL) ──
  {
    id: "blog-pet-insurance-comparison-guide",
    slug: "pet-insurance-comparison-guide",
    type: "blog",
    category: 4,
    title: "펫보험 비교 가이드 — 제대로 고르는 5가지 기준",
    metaTitle: "펫보험 비교 방법 | 면책사항·보장범위·갱신형·실손 선택 기준 | 펫지기",
    metaDescription: "펫보험을 제대로 비교하는 5가지 기준. 보장 범위·면책 사항·갱신 방식·자기부담금·가입 나이 제한 핵심 체크포인트와 비교 방법.",
    body: `<p>펫보험 상품이 늘어나면서 선택지가 많아졌다. 하지만 보험료만 보고 골랐다가 정작 치료비를 청구할 때 "이건 면책"이라는 답을 받는 경우가 생긴다. 제대로 비교하려면 보험료 이외의 것들을 먼저 확인해야 한다.</p>

<h2>1. 보장 범위 — 무엇을 커버하는가</h2>
<p>상품마다 보장하는 항목이 크게 다르다. 확인해야 할 항목:</p>
<ul>
  <li>입원비, 통원비, 수술비 각각 보장 여부와 한도</li>
  <li>예방 목적 항목(예방접종, 건강검진) 보장 여부 — 대부분 미보장</li>
  <li>치과 치료 보장 여부 — 치주 질환은 가장 흔하지만 보장 제외가 많음</li>
  <li>피부 질환 보장 여부 — 알러지 관련 질환 포함 여부</li>
</ul>

<h2>2. 면책 사항 — 무엇을 안 커버하는가</h2>
<p>보장이 되지 않는 항목이 더 중요할 수 있다. 주요 면책 항목:</p>
<ul>
  <li>가입 전 기존 질환 (선천성 질환, 가입 전 진단 이력)</li>
  <li>심장사상충·벼룩진드기 예방 미실시 상태에서 발생한 질환</li>
  <li>미용 목적 처치</li>
  <li>특정 품종 선천 질환 (예: 닥스훈트 IVDD, 불도그 호흡기 문제)</li>
</ul>

<h2>3. 갱신 방식 — 나이 들면 어떻게 되는가</h2>
<p>갱신형 상품은 나이가 들수록 보험료가 오르거나 가입 자체가 어려워질 수 있다. 갱신 시 보험료 인상 폭과 최대 갱신 연령 제한을 반드시 확인한다. 비갱신형 상품은 보험료가 고정되지만 초기 보험료가 높다.</p>

<h2>4. 자기부담금과 청구 절차</h2>
<p>자기부담금이 낮을수록 실질 보장이 크다. 청구 절차가 복잡하거나 서류가 많으면 실제 사용이 어렵다. 앱 또는 온라인 청구가 가능한지도 확인한다.</p>

<h2>5. 가입 나이 제한</h2>
<p>대부분의 펫보험은 생후 2~3개월부터 가입 가능하지만, 상한 나이가 상품마다 다르다. 노령동물은 가입 자체가 불가하거나 보험료가 매우 높아지므로, 가능하다면 어릴 때 가입하는 것이 유리하다.</p>

<h2>지금 바로 비교해 보기</h2>
<p>주요 항목을 정리했으면 <a href="/insurance/compare">펫보험 비교 페이지</a>에서 주요 보험사 상품을 나란히 비교해 볼 수 있다. 가입 전 약관 전문에서 면책 조항을 반드시 확인하자. <a href="/blog/pet-insurance-guide">펫보험 가입 완전 가이드</a>도 함께 읽어보자.</p>`,
    ymyl: true,
    disclaimer: LEGAL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(56),
    authorName: "펫지기 에디터",
    sources: [
      "금융감독원 — 반려동물보험 가이드",
      "보험개발원 — 펫보험 상품 현황",
      "농림축산식품부 — 반려동물 보험 활성화 방안",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 88. 동물병원 비용 절약 가이드 (cat4, YMYL) ──
  {
    id: "blog-vet-cost-saving-guide",
    slug: "vet-cost-saving-guide",
    type: "blog",
    category: 4,
    title: "동물병원 비용 절약 — 진료비 줄이는 현실적인 방법",
    metaTitle: "동물병원 비용 절약법 | 진료비 낮추기·펫보험·예방접종 시기 | 펫지기",
    metaDescription: "동물병원 진료비를 현실적으로 줄이는 방법. 예방으로 치료비 아끼는 법, 펫보험 활용, 처방전 분리, 진료 항목 확인, 2차 소견 받는 시점.",
    body: `<p>동물병원 진료비에 기준이 없어서 당황한 경험이 있는 보호자가 많다. 수의사 진료비는 국가가 정하지 않아 병원마다 다르다. 그렇다고 비용 때문에 필요한 진료를 미루거나 포기해서는 안 된다. 현실적으로 비용 부담을 줄이는 방법을 알아두자.</p>

<h2>예방이 가장 확실한 절약이다</h2>
<p>동물병원 진료비 중 가장 큰 비중은 응급·중증 치료다. 정기 건강검진으로 질병을 조기 발견하는 것이 장기적으로 의료비를 가장 많이 줄이는 방법이다. 심장사상충 예방약, 벼룩진드기 예방, 기본 예방접종으로 예방 가능한 질병의 치료비는 예방비의 수십 배에 달하는 경우가 많다.</p>

<h2>진료 전 준비로 시간·비용 절약</h2>
<ul>
  <li>증상을 미리 메모한다 (언제부터, 빈도, 관련 사항)</li>
  <li>기존 병원 진료 기록이 있으면 가져간다 — 중복 검사를 줄일 수 있다</li>
  <li>진료 목적을 명확히 하고 우선순위를 정한다 — "오늘은 귀 문제만 먼저" 식으로</li>
</ul>

<h2>진료비 항목 확인 요청하기</h2>
<p>진료 전 예상 비용을 물어보는 것은 당연한 권리다. 처치 후 청구서를 받으면 항목별로 확인한다. 이해가 안 되는 항목은 질문한다. 일부 병원은 패키지 검진을 권하는데, 모든 항목이 현재 강아지에게 필요한지 확인하는 것이 좋다.</p>

<h2>처방전 분리 활용</h2>
<p>만성 질환으로 정기적인 약이 필요한 경우, 처방전을 받아 온라인 동물 전문 약국에서 약을 구매하면 비용을 절감할 수 있다. 단, 처방전을 발급해주는 병원이 제한적이고 약의 진위 여부 확인이 중요하다.</p>

<h2>2차 소견(second opinion)이 필요할 때</h2>
<p>수술이나 고비용 치료가 필요하다는 진단을 받으면, 동일한 검사 결과를 가지고 다른 동물병원 또는 대학 동물병원에서 2차 소견을 받는 것이 좋다. 이는 의료비 절약뿐 아니라 치료 결정의 정확성을 높이는 방법이다.</p>

<h2>펫보험으로 대비하기</h2>
<p>만성 질환, 수술, 응급 처치에는 수백~수천만 원이 드는 경우가 있다. <a href="/insurance/compare">펫보험</a>은 이런 큰 지출을 분산시키는 가장 현실적인 방법이다. 어릴 때 가입할수록 보험료가 낮고 보장 범위가 넓다. <a href="/blog/pet-insurance-comparison-guide">펫보험 비교 가이드</a>도 함께 읽어보자.</p>`,
    ymyl: true,
    disclaimer: LEGAL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(57),
    authorName: "펫지기 에디터",
    sources: [
      "농림축산식품부 — 동물의료비 현황",
      "한국소비자원 — 동물병원 서비스 실태 조사",
      "American Veterinary Medical Association (AVMA) — Preventive Pet Care",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 89. 반려동물 유기 처벌 (cat4, YMYL) ──
  {
    id: "blog-pet-abandonment-law",
    slug: "pet-abandonment-law",
    type: "blog",
    category: 4,
    title: "반려동물 유기하면 어떻게 되나 — 법적 처벌과 신고 방법",
    metaTitle: "반려동물 유기 처벌 | 과태료·형사처벌·신고 방법 | 펫지기",
    metaDescription: "반려동물 유기 시 법적 처벌 기준(과태료 최대 300만 원). 유기 목격 시 신고 방법, 반려동물을 더 이상 키울 수 없을 때 합법적인 대안.",
    body: `<p>매년 수만 마리의 반려동물이 유기된다. 농림축산식품부 통계에 따르면 2023년 국내 동물 유기·유실 신고 건수는 약 10만 건에 달한다. 유기는 범죄다. 그리고 유기하지 않고도 상황을 해결할 수 있는 방법이 있다.</p>

<h2>반려동물 유기의 법적 정의와 처벌</h2>
<p>동물보호법 제10조에 따르면 소유자 또는 관리자가 반려동물을 버리는 행위는 유기에 해당한다. 처벌:</p>
<ul>
  <li>300만 원 이하 과태료</li>
  <li>상습 유기나 동물 학대를 동반한 경우 형사처벌 가능</li>
  <li>차량으로 동물을 유기한 경우 도로교통법 위반도 적용 가능</li>
</ul>

<h2>유기 목격 시 신고 방법</h2>
<ul>
  <li>동물보호 신고 전화: 농림축산식품부 콜센터 1577-0954</li>
  <li>국가동물보호정보시스템(APMS): 온라인 신고 가능</li>
  <li>가까운 시군구청 동물보호 담당 부서</li>
  <li>유기동물 발견 시 즉시 연락해 보호 조치를 취해야 동물이 더 큰 위험에 처하지 않는다</li>
</ul>

<h2>더 이상 키울 수 없을 때 — 합법적인 대안</h2>
<ul>
  <li><strong>입양 보내기</strong>: 주변 지인, SNS 분양 게시판, 입양 카페를 통해 직접 새 보호자를 찾는다. 책임 있는 분양을 위해 입양자 면접과 계약서 작성을 권장한다.</li>
  <li><strong>동물보호단체 연락</strong>: 인도적 안락사를 하지 않는 단체(노킬 쉘터)에 문의하면 임시 보호 또는 입양 연결을 도와주는 경우가 있다.</li>
  <li><strong>지자체 동물보호소 자진 신고</strong>: 불가피한 경우 지자체 동물보호소에 자진 인도할 수 있다. 다만 보호소 내 안락사 가능성이 있으므로 입양 보내는 것이 우선이다.</li>
  <li><strong>임시 위탁(펫 호텔·지인 부탁)</strong>: 일시적인 어려움이라면 임시 보호 방법을 먼저 찾는다.</li>
</ul>

<h2>유기를 예방하기 위해</h2>
<p>입양 전 충분한 정보와 준비가 유기 예방의 핵심이다. <a href="/blog/dog-adoption-checklist">강아지 처음 입양 준비물 체크리스트</a>와 <a href="/blog/pet-adoption-vs-purchase">입양 vs 분양 비교</a>를 통해 신중한 선택을 돕는다. 이미 함께하고 있다면 유기보다 해결책을 먼저 찾자 — 도움을 구할 곳이 있다.</p>`,
    ymyl: true,
    disclaimer: LEGAL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(58),
    authorName: "펫지기 에디터",
    sources: [
      "농림축산식품부 — 동물보호법 제10조 (유기 처벌)",
      "농림축산식품부 — 2023년 반려동물 보고서 (유기·유실 통계)",
      "국가동물보호정보시스템(APMS) — 동물보호 신고 안내",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 90. 펫보험 면책사항 가이드 (cat4, YMYL) ──
  {
    id: "blog-pet-insurance-exclusions-guide",
    slug: "pet-insurance-exclusions-guide",
    type: "blog",
    category: 4,
    title: "펫보험 면책사항 완전 정리 — 이것은 안 된다고요?",
    metaTitle: "펫보험 면책사항 총정리 | 기존 질환·치과·예방·피부 제외 | 펫지기",
    metaDescription: "펫보험 가입 전 반드시 확인해야 할 면책사항. 기존 질환 면책, 치과 치료 제외, 예방 목적 불보장, 품종별 선천 질환 면책, 청구 거절 많은 항목.",
    body: `<p>펫보험을 가입했다가 "이건 면책사항"이라는 답을 받는 경험은 매우 실망스럽다. 면책사항은 보험이 보장하지 않는 항목이다. 보험료보다 면책사항을 먼저 확인하는 것이 현명한 선택이다.</p>

<h2>거의 모든 펫보험의 공통 면책사항</h2>

<h3>가입 전 기존 질환</h3>
<p>가입 전부터 진단받았거나, 가입 전 증상이 있었던 질환은 대부분 보장되지 않는다. 가입 후 발생한 질환만 보장하는 것이 원칙이다. 이 때문에 건강할 때, 가능하면 어릴 때 가입하는 것이 중요하다.</p>

<h3>선천성·유전성 질환 (품종별)</h3>
<p>특정 품종에서 유전적으로 빈번한 질환을 면책으로 두는 상품이 있다. 예: 닥스훈트의 IVDD, 단두종의 호흡기 문제, 래브라도의 고관절 이형성증. 반드시 약관에서 해당 품종의 면책 조항을 확인한다.</p>

<h3>예방 목적 처치</h3>
<p>예방접종, 건강검진, 심장사상충 예방약, 중성화 수술(일부 상품 제외) 등 예방 목적의 처치는 대부분 보장되지 않는다.</p>

<h3>치과 치료</h3>
<p>치주 질환, 스케일링, 발치 비용은 많은 상품에서 면책이다. 고양이 구내염 치료나 치과 수술이 필요한 경우를 대비하려면 치과 보장 여부를 반드시 확인한다.</p>

<h3>미용·성형 목적</h3>
<p>단이, 단미, 항문낭 관련 미용 목적 처치는 보장하지 않는다.</p>

<h2>상품마다 다른 면책사항</h2>

<h3>피부 질환</h3>
<p>알러지성 피부염은 만성 질환 중 청구 빈도가 높지만, 일부 상품은 피부 질환을 전체 또는 일부 면책으로 둔다. 알러지 강아지를 키우고 있다면 피부 질환 보장 여부 확인이 특히 중요하다.</p>

<h3>면책 기간</h3>
<p>대부분의 상품은 가입 후 30일(또는 일부 질환은 최대 180일)의 면책 기간이 있다. 이 기간 중 발생한 질환은 보장하지 않는다.</p>

<h2>면책사항 확인 방법</h2>
<p>상품 광고가 아닌 약관 전문을 직접 읽어야 한다. 금융감독원 보험상품 통합 비교 공시 시스템(보험다모아)에서 주요 면책 내용을 비교할 수 있다. <a href="/insurance/compare">펫보험 비교 페이지</a>에서 상품별 주요 면책사항을 정리해 두었으니 함께 확인하자. <a href="/blog/pet-insurance-comparison-guide">펫보험 비교 가이드</a>도 함께 읽어보자.</p>`,
    ymyl: true,
    disclaimer: LEGAL_DISCLAIMER,
    status: "published",
    publishedAt: scheduleDate(59),
    authorName: "펫지기 에디터",
    sources: [
      "금융감독원 — 보험상품 통합 비교 공시(보험다모아)",
      "보험개발원 — 펫보험 약관 비교",
      "금융감독원 — 반려동물보험 소비자 안내문",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },
];

async function seed() {
  console.log("블로그 포스트 9차 시딩 시작...");
  for (const post of BLOG_POSTS_9) {
    await db.insert(contents).values(post).onConflictDoNothing();
    console.log(`✅ ${post.slug}`);
  }
  console.log("블로그 포스트 9차 시딩 완료!");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
