import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 102 — cat3×1 + cat5×2 + cat2×1 + cat4×1 = 5편 (IDs 631-635)
// Macros: D, A, F, B, G
// Angles: RA7, RA2, RA1, RA5, RA3

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-631",
    slug: "dog-parvo-distemper-prevention",
    type: "blog",
    category: 3,
    title: "파보바이러스와 홍역 — 강아지를 죽일 수 있는 두 질환의 예방",
    subtitle: "파보·홍역 전파·증상·치사율, 예방접종 스케줄, 야외 활동 시작 시기",
    metaTitle: "강아지 파보바이러스·홍역 예방 — 전파·증상·백신 스케줄 | 펫지기",
    metaDescription: "강아지 파보바이러스와 홍역의 위험성과 예방 방법. 전파 경로, 증상과 치사율, 예방접종 스케줄, 백신 전 야외 활동을 안전하게 하는 방법을 정리했습니다.",
    body: `<p>파보바이러스와 홍역은 예방접종으로 막을 수 있는 질환이다. 그러나 접종을 놓치거나 지연하면 치명적인 결과가 올 수 있다.</p>

<h2>파보바이러스</h2>
<p>혈변·구토·탈수를 유발하는 심각한 바이러스다. 환경에서 수개월~1년 생존한다. 어린 강아지(키튼) 치사율 50~90% (미치료 시). 감염된 강아지 배변 접촉 또는 오염된 토양으로 전파된다.</p>

<h2>개 홍역(Distemper)</h2>
<p>호흡기·소화기·신경계를 침범하는 바이러스다. 발열·코·눈 분비물 → 구토·설사 → 신경 증상(경련·틱)으로 진행. 신경 증상이 발생하면 치료 후에도 후유증이 남는다.</p>

<h2>예방접종 스케줄 (DHPPL)</h2>
<div class="callout-dog">
<strong>강아지 기본 예방접종</strong><br>
• 6~8주: 1차<br>
• 9~12주: 2차<br>
• 12~16주: 3차<br>
• 1년 후: 부스터<br>
• 이후 3년마다 또는 매년 (수의사 상담)<br>
▶ 어미 항체 소실 후 공백기에 접종 완료가 핵심
</div>

<h2>백신 전 야외 활동</h2>
<ul>
<li>3차 접종 완료 전 발바닥이 땅에 닿는 야외 활동 금지</li>
<li>안전한 방법: 안기거나 유모차·카트로 이동</li>
<li>강아지를 이미 키운 지인 집 방문 금지 (환경 오염)</li>
<li>예방접종 완료 강아지와의 만남은 상대적으로 안전</li>
</ul>

<h2>마지막으로</h2>
<p>파보·홍역 예방접종은 강아지의 생명을 지키는 가장 기본적인 투자다. 접종 스케줄을 지키고, 접종 전 야외 노출을 최소화하는 것이 보호자의 가장 중요한 역할이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Day, M.J. et al. — WSAVA Vaccination Guidelines. J Small Anim Pract 2016",
      "한국수의감염병학회 강아지 필수 예방접종 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-26T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-632",
    slug: "dog-aging-signs-recognition",
    type: "blog",
    category: 5,
    title: "강아지 노화 신호 인식 — '나이 들어서'로 넘기면 안 되는 것들",
    subtitle: "정상 노화 vs 질환 신호 구분, 노령견 행동 변화 의미, 정기 검진 항목",
    metaTitle: "강아지 노화 신호 — 정상 노화와 질환 구분·정기 검진 가이드 | 펫지기",
    metaDescription: "강아지 노화 신호를 올바르게 인식하는 방법. 정상 노화와 질환 신호를 구분하는 기준, 노령견 행동 변화 의미, 7세 이상 강아지 정기 검진 항목을 정리했습니다.",
    body: `<p>"나이 들어서 그런가 봐요"라는 말이 진단을 놓치게 한다. 노화와 질환을 구분하는 것이 노령견 케어의 핵심이다.</p>

<h2>정상 노화 vs 질환 신호</h2>
<table>
<thead><tr><th>증상</th><th>정상 노화</th><th>질환 가능성</th></tr></thead>
<tbody>
<tr><td>흰 털</td><td>정상</td><td>—</td></tr>
<tr><td>활동 감소</td><td>약간 감소 — 정상</td><td>갑작스러운 감소 — 통증</td></tr>
<tr><td>체중 변화</td><td>약간 증가</td><td>급격한 감소 → 종양·당뇨</td></tr>
<tr><td>물 많이 마심</td><td>정상 아님</td><td>당뇨·쿠싱·신부전 가능성</td></tr>
<tr><td>잠을 많이 잠</td><td>약간 더 자는 것 정상</td><td>극도의 무기력 → 검진</td></tr>
</tbody>
</table>

<h2>노령견 행동 변화 의미</h2>
<div class="callout-dog">
<strong>행동 변화 해석</strong><br>
• 산책 거부·뒤처짐 → 관절통 가능성<br>
• 밤에 헤매거나 울기 → 인지기능장애 또는 통증<br>
• 갑자기 더 달라붙음 → 통증·불안·인지 저하<br>
• 음식에 갑자기 무관심 → 치아·소화기·전신 문제
</div>

<h2>7세 이상 권장 정기 검진 항목</h2>
<ul>
<li>혈액 검사 (CBC·혈청화학)</li>
<li>소변 검사</li>
<li>혈압 측정</li>
<li>흉부·복부 X-ray</li>
<li>복부 초음파 (내장 종양 조기 발견)</li>
<li>심장 청진·심전도</li>
</ul>

<h2>마지막으로</h2>
<p>노령견의 작은 변화를 놓치지 않는 것이 보호자의 가장 중요한 역할이다. 연 2회 검진 + 매달 체중 측정 + 집에서 매일 관찰 — 이것이 노령견 케어의 기본이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Epstein, M. et al. — AAHA Senior Care Guidelines for Dogs and Cats. JAAHA 2005",
      "한국수의내과학회 노령견 검진 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-27T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-633",
    slug: "cat-window-fall-prevention",
    type: "blog",
    category: 5,
    title: "고양이 고층 추락 예방 — '고양이는 높은 곳에서 떨어져도 안전하다'는 오해",
    subtitle: "고양이 추락 사고 통계, 고층 추락 위험, 방충망 취약성, 안전 장치 설치",
    metaTitle: "고양이 추락 예방 — 고층 낙하 위험과 방충망 안전 장치 가이드 | 펫지기",
    metaDescription: "고양이 고층 추락 예방 방법. '고양이는 높은 곳에서 안전하다'는 오해, 실제 추락 사고 위험, 방충망 취약성, 안전한 창문 장치 설치법을 정리했습니다.",
    body: `<p>"고양이는 본능적으로 착지를 잘 한다"는 말이 있다. 부분적으로 맞지만, 고층 추락은 여전히 심각한 부상과 사망을 유발한다.</p>

<h2>고양이 추락 본능의 실체</h2>
<p>고양이는 추락 시 몸을 회전해 발이 먼저 닿는 반사(righting reflex)가 있다. 그러나 이 반사도 한계가 있다. 특히 7층 이상에서는 오히려 낙하 속도가 일정해져(terminal velocity) 더 이완된 자세로 떨어지지만, 착지 충격은 여전히 크다.</p>

<h2>추락 사고 통계</h2>
<ul>
<li>도시 고양이 응급 입원의 주요 원인 중 하나</li>
<li>5층 이하: 골절·내부 출혈 위험 크음</li>
<li>7층 이상: 사망률 높음 (복합 골절·장기 손상)</li>
<li>여름 창문 개방 시즌에 사고 집중</li>
</ul>

<h2>방충망이 안전하지 않은 이유</h2>
<div class="callout-cat">
<strong>방충망 추락 위험</strong><br>
• 일반 방충망은 고양이 체중(3~7kg) 지탱 불가<br>
• 고양이가 기대거나 발로 밀면 탈락·파열<br>
• 해결: 금속 방충망 또는 캣프루프 망으로 교체<br>
• 창문 개방 시 항상 고양이 감독 또는 잠금장치 설치
</div>

<h2>안전 장치</h2>
<ul>
<li>창문 개방 제한 잠금장치 (5cm 이상 열리지 않게)</li>
<li>캣프루프 금속 방충망 설치</li>
<li>발코니 캣워크: 탈출 차단망 전체 시공</li>
<li>베란다 상단까지 막기 (고양이는 위로도 탈출)</li>
</ul>

<h2>마지막으로</h2>
<p>고양이 추락 예방은 투자다. 금속 방충망 하나가 생명을 지킬 수 있다. 여름 창문 개방 시즌 전에 점검하는 것이 가장 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Whitney, W.O. & Mehlhaff, C.J. — High-rise syndrome in cats. JAVMA 1987",
      "한국고양이보호자연합 창문 추락 예방 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-27T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-634",
    slug: "dog-food-controversial-ingredients",
    type: "blog",
    category: 2,
    title: "강아지 사료 논란 성분 — BHA·에톡시퀴닌·카라기난, 실제 위험한가",
    subtitle: "사료 보존제·착색제·증점제 논란 정리, 규제 기준, 과학적 근거 vs 공포 마케팅",
    metaTitle: "강아지 사료 논란 성분 — BHA·에톡시퀴닌·카라기난 실제 위험도 | 펫지기",
    metaDescription: "강아지 사료 논란 성분의 실제 위험도를 분석했습니다. BHA·에톡시퀴닌·카라기난·인공 착색제의 과학적 근거, 규제 기준, 과도한 공포와 실제 위험을 구분합니다.",
    body: `<p>사료 라벨에서 낯선 화학 성분 이름을 보면 불안해진다. 실제로 위험한 것과 과장된 공포를 구분하는 것이 중요하다.</p>

<h2>BHA·BHT — 논란의 보존제</h2>
<p>산화 방지 목적의 인공 보존제다. 고농도에서 발암 가능성 동물 연구가 있지만, 사료에 허용된 수준에서 실제 위험성은 아직 명확하지 않다. GRAS(일반적으로 안전한 것으로 인정) 지위를 유지하고 있다. 가능하면 토코페롤(비타민 E) 보존 사료를 선택하는 것이 현명하다.</p>

<h2>에톡시퀴닌 — 가장 논란 많은 성분</h2>
<p>지방 산화 방지 보존제다. 과거 농약으로 사용됐다는 이유로 공포가 크지만, FDA가 사료 내 허용 수준을 설정해 규제하고 있다. 국내 일부 사료에서 사용 중. 첨가 여부 확인 후 기피할 수 있다.</p>

<h2>카라기난 — 논란 있는 증점제</h2>
<div class="callout-dog">
<strong>카라기난 논란 요약</strong><br>
• 해조류에서 추출한 자연 증점제<br>
• 동물 연구에서 소화기 염증 가능성 제기<br>
• 그러나 사용 수준과 연구 수준 간 차이 존재<br>
• IBD 고양이·강아지 보호자는 기피 합리적<br>
• 건강한 동물에서 일상 사료 수준의 위험 근거 약함
</div>

<h2>인공 착색제</h2>
<ul>
<li>Red 40·Yellow 5·Blue 2 등: 사람 음식 안전성 논란</li>
<li>강아지는 인간만큼 색으로 먹이를 선택하지 않음 — 착색 자체가 불필요</li>
<li>불필요한 성분이므로 무착색 사료 선택이 현명</li>
</ul>

<h2>마지막으로</h2>
<p>논란 성분에 대한 공포 마케팅과 실제 과학적 위험을 구분하는 시각이 중요하다. 불필요한 성분은 피하되, 과학적 근거 없는 공포에 휘둘리지 않는 것이 균형 잡힌 접근이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "FDA — Pet Food Additives and Preservatives Safety Review 2022",
      "한국수의영양학회 사료 첨가물 안전성 평가 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-28T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-635",
    slug: "pet-breed-housing-discrimination",
    type: "blog",
    category: 4,
    title: "특정 품종 입주 거부 — 아파트·오피스텔에서 품종으로 차별받을 때",
    subtitle: "관리 규약 품종 제한 효력, 법적 대응 방법, 이웃과의 합의 전략",
    metaTitle: "반려동물 품종 입주 차별 — 법적 효력과 대응 방법 가이드 | 펫지기",
    metaDescription: "아파트에서 특정 품종 반려동물 입주를 거부당했을 때 대처 방법. 관리 규약 품종 제한 효력, 맹견 기준, 법적 대응 방법, 이웃과의 합의 전략을 정리했습니다.",
    body: `<p>"대형견은 안 돼요", "핏불은 안 됩니다"라는 입주 거부를 받은 보호자가 있다. 이런 거부가 법적으로 모두 유효한 것은 아니다.</p>

<h2>법정 맹견 규제 vs 임의 품종 제한</h2>
<p>동물보호법상 맹견(5종)에 대한 규정은 법적 근거가 있다. 그러나 공동주택 관리 규약에서 특정 품종을 임의로 금지하는 것은 법적 근거가 없는 경우가 많다.</p>

<h2>품종 제한 규약의 효력</h2>
<div class="callout-dog">
<strong>품종 제한 관련 법적 입장</strong><br>
• 맹견 5종: 법에 의한 규제 → 유효한 제한<br>
• 대형견·특정 견종 임의 금지: 법적 근거 불명확<br>
• 실제 분쟁 시 법원은 개별 사안·실제 피해 여부 종합 판단<br>
• 절대적 금지보다 관리 조건 부과가 더 합리적이라는 판례 경향
</div>

<h2>법적 대응 방법</h2>
<ul>
<li>관리 규약 원문 요청 → 근거 조항 확인</li>
<li>관리 규약이 상위 법령에 위반되는지 확인</li>
<li>입주자대표회의에 규약 개정 요청</li>
<li>국토교통부 공동주택관리 분쟁조정위원회 신청</li>
</ul>

<h2>현실적 전략</h2>
<ul>
<li>이웃 우려(소음·공격성)를 해소하는 방향으로 협상</li>
<li>책임보험 가입 증명 제시</li>
<li>기질 평가 결과 제시 (일부 전문 기관에서 실시)</li>
<li>공격 이력 없음을 수의사 소견서로 증명</li>
</ul>

<h2>마지막으로</h2>
<p>품종으로 반려동물을 판단하는 것은 개별 동물의 기질을 무시하는 것이다. 법적 대응과 동시에 이웃의 실질적 우려를 해소하는 것이 장기적으로 가장 효과적이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "공동주택관리법 제19조 관련 대법원 판례",
      "국토교통부 공동주택 관리 분쟁 사례집 2023",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-28T11:00:00.000Z",
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
  console.log("블로그 포스트 102차 시딩 완료! (blog-631 ~ blog-635)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
