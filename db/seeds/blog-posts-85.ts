import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 85 — cat3×2 + cat5×1 + cat2×1 + cat1×1 = 5편 (IDs 546-550)
// Macros: A, D, F, B, E
// Angles: RA1, RA2, RA1, RA5, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-546",
    slug: "dog-gastric-dilatation-volvulus",
    type: "blog",
    category: 3,
    title: "강아지 위염전(GDV) — 대형견 보호자가 반드시 알아야 할 응급",
    subtitle: "위염전 발생 원인, 위험 품종, 경고 신호, 예방 방법, 예방적 위고정술",
    metaTitle: "강아지 위염전(GDV) — 대형견 응급·예방·위고정술 완전 가이드 | 펫지기",
    metaDescription: "강아지 위염전(GDV)은 수 시간 내 사망에 이를 수 있는 응급입니다. 발생 원인, 위험 품종, 경고 신호, 예방 방법, 예방적 위고정술을 정리했습니다.",
    body: `<p>위염전은 위가 가스로 팽창하면서 비틀리는 응급으로, 치료하지 않으면 수 시간 내에 사망한다. 대형·심흉 품종 보호자라면 이 신호를 반드시 알고 있어야 한다.</p>

<h2>위험 품종</h2>
<p>그레이트데인, 저먼셰퍼드, 도베르만, 아이리시 세터, 와이마라너, 래브라도, 골든이 고위험군이다. 가슴이 깊고 좁은 체형(Deep-chested)일수록 위험하다.</p>

<h2>위염전 발생 원인</h2>
<ul>
<li>식후 격렬한 운동</li>
<li>한 번에 많은 양의 식사</li>
<li>물을 과도하게 빠르게 마심</li>
<li>고령, 단일견 가정, 기질이 겁 많은 개</li>
</ul>

<h2>경고 신호 (즉시 응급병원)</h2>
<div class="callout-dog">
<strong>위염전 긴급 신호</strong><br>
• 배가 갑자기 빵빵하게 부풀어오름<br>
• 구역질하는데 아무것도 안 나옴 (건구역)<br>
• 극도의 불안·안절부절<br>
• 침 과도 분비<br>
• 무기력·쇼크 증상<br>
▶ 골든 타임: 증상 발생 후 1~2시간 이내 수술
</div>

<h2>예방 방법</h2>
<ul>
<li>하루 2~3회 소분 급식 (한 번에 많이 주지 않기)</li>
<li>식후 2시간 격렬한 운동 금지</li>
<li>물 급여 조절 (빠르게 과도하게 마시지 않게)</li>
<li>슬로우 피더 활용 (빠른 식사 방지)</li>
</ul>

<h2>예방적 위고정술(Prophylactic Gastropexy)</h2>
<p>위를 복벽에 봉합해 뒤틀리지 않게 하는 수술이다. 고위험 품종에서 중성화와 동시에 시행하면 평생 위염전 위험을 크게 낮출 수 있다. 수의사와 상담을 권장한다.</p>

<h2>마지막으로</h2>
<p>위염전은 증상을 알고 즉시 병원에 가는 것이 전부다. 망설임이 생사를 가른다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Glickman, L.T. et al. — Non-dietary risk factors for gastric dilatation-volvulus in large and giant breed dogs. JAVMA 2000",
      "한국수의외과학회 위염전 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 상황에서는 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-10-15T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-547",
    slug: "dog-hypothyroidism-guide",
    type: "blog",
    category: 3,
    title: "강아지 갑상선 기능저하증 — 살찌고 무기력한 중년 강아지",
    subtitle: "갑상선 기능저하증 증상, 진단 검사, 레보티록신 치료, 장기 관리",
    metaTitle: "강아지 갑상선 기능저하증 — 증상·진단·치료 완전 가이드 | 펫지기",
    metaDescription: "강아지 갑상선 기능저하증 증상과 치료를 정리했습니다. 체중 증가·무기력·피부 이상 원인, 혈액 검사 기준, 레보티록신 치료와 장기 모니터링을 알아보세요.",
    body: `<p>중년 강아지가 특별히 더 먹지 않는데 살이 찌고, 운동을 싫어하며, 털이 빠지고 피부가 두꺼워진다면 갑상선 기능저하증을 의심해볼 수 있다.</p>

<h2>갑상선 기능저하증이란</h2>
<p>갑상선이 티록신(T4)을 충분히 생산하지 못해 대사가 느려지는 질환이다. 강아지에서 가장 흔한 내분비 질환 중 하나로, 대부분 면역 매개성 갑상선 파괴(림프구성 갑상선염)가 원인이다.</p>

<h2>주요 증상</h2>
<ul>
<li>체중 증가 (과식 없이)</li>
<li>무기력·운동 내성 저하</li>
<li>양측 대칭 탈모 (특히 몸통·꼬리)</li>
<li>피부 두꺼워짐·색소 침착</li>
<li>추위 불내성 (더위에 약함 아닌 추위 취약)</li>
<li>서맥 (느린 심박)</li>
</ul>

<h2>진단</h2>
<div class="callout-dog">
<strong>갑상선 기능저하증 진단 검사</strong><br>
• 총 T4(tT4): 기본 스크리닝<br>
• 유리 T4(fT4): 더 정확, TSH와 함께<br>
• 내인성 TSH: 높으면 갑상선 기능저하 지지<br>
• 갑상선 항체: 면역 매개 원인 확인<br>
▶ 다른 질환(부신·신장)이 T4를 낮출 수 있어 종합 판단 필요
</div>

<h2>치료</h2>
<p>레보티록신(합성 T4) 경구 투여. 평생 투약이 원칙이다. 4~8주 후 혈액 검사로 용량 조절. 치료 시작 후 2~4주 내 활기 회복, 수개월 내 털 재생.</p>

<h2>마지막으로</h2>
<p>갑상선 기능저하증은 투약으로 완전히 정상 생활이 가능한 질환이다. 진단이 늦어지면 심장 문제·신경 증상이 동반될 수 있으므로, 증상이 의심되면 일찍 검사받는 것이 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Scott-Moncrieff, J.C. — Canine Hypothyroidism. ACVIM Small Animal Internal Medicine 2010",
      "한국수의내과학회 갑상선 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-15T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-548",
    slug: "cat-litter-box-placement-science",
    type: "blog",
    category: 5,
    title: "고양이 화장실 배치의 과학 — 왜 화장실 밖에 볼일을 보는가",
    subtitle: "화장실 위치·수·청결 기준, 부적절 배변 원인 파악, 다묘 가정 배치 원칙",
    metaTitle: "고양이 화장실 배치 — 위치·수·청결 기준과 부적절 배변 해결 | 펫지기",
    metaDescription: "고양이가 화장실 밖에 볼일을 보는 이유와 해결책. 올바른 화장실 위치·수·크기·청결 기준, 다묘 가정 배치 원칙, 부적절 배변 원인 파악법을 정리했습니다.",
    body: `<p>고양이가 화장실이 아닌 곳에서 볼일을 본다면 — 이것은 복수가 아니다. 화장실에 문제가 있다는 신호다.</p>

<h2>고양이 화장실의 기본 원칙</h2>
<ul>
<li><strong>수</strong>: 고양이 수 + 1개 (2마리면 최소 3개)</li>
<li><strong>크기</strong>: 고양이 몸 길이의 1.5배 이상</li>
<li><strong>위치</strong>: 조용하고 프라이버시 있는 곳, 식기와 떨어진 곳</li>
<li><strong>청결</strong>: 하루 최소 1회 스쿠핑, 주 1회 세척</li>
</ul>

<h2>부적절 배변 원인 파악</h2>
<div class="callout-cat">
<strong>화장실 회피 원인 체크리스트</strong><br>
□ 화장실이 너무 더럽지 않은가?<br>
□ 화장실이 너무 작지 않은가?<br>
□ 모래 종류가 바뀌었는가?<br>
□ 화장실이 너무 시끄러운 곳에 있는가?<br>
□ 다른 고양이·개가 화장실 접근을 막는가?<br>
□ 배변·배뇨 시 통증이 있는가 (의학적 원인)?
</div>

<h2>의학적 원인 확인</h2>
<p>화장실 환경이 문제없어 보이는데도 계속 부적절 배변을 한다면 요로 감염, 결석, 관절염(화장실 오르내리기 통증) 등 의학적 원인을 배제해야 한다.</p>

<h2>다묘 가정 배치</h2>
<ul>
<li>같은 공간에 화장실 밀집 배치 금지 — 분리된 위치에 배치</li>
<li>두 마리가 동시에 사용 가능하도록 여유 확보</li>
<li>서열 높은 고양이가 화장실을 독점하지 않도록</li>
</ul>

<h2>마지막으로</h2>
<p>고양이 화장실 문제는 대부분 화장실의 위치·청결·수의 문제다. 먼저 환경을 점검하고, 개선 후에도 지속된다면 수의사 상담이 필요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Neilson, J.C. — Feline house soiling: elimination and marking behaviors. Vet Clin North Am 2003",
      "한국고양이보호자연합 화장실 관리 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-16T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-549",
    slug: "freeze-dried-raw-safety-guide",
    type: "blog",
    category: 2,
    title: "동결건조 생식 사료 — 일반 생식보다 안전할까",
    subtitle: "동결건조 공정의 세균 제거 효과, 영양 보존 여부, 안전한 사용법",
    metaTitle: "동결건조 생식 사료 안전성 — 세균 제거·영양 보존·사용법 | 펫지기",
    metaDescription: "동결건조 생식 사료가 일반 생식보다 안전한지 분석했습니다. 동결건조 공정의 세균 제거 한계, 영양 보존 여부, 안전하게 사용하는 방법을 정리했습니다.",
    body: `<p>"동결건조 처리를 했으니 세균이 없겠지"라고 생각하는 보호자가 많다. 그러나 실제로는 동결건조가 완전한 살균이 아니다.</p>

<h2>동결건조(Freeze-drying)란</h2>
<p>재료를 냉동 후 진공 상태에서 수분을 제거하는 공정이다. 열을 사용하지 않아 영양소 보존에 유리하다. 그러나 세균·바이러스를 완전히 사멸시키지 않는다는 것이 핵심이다.</p>

<h2>세균 제거에 대한 오해</h2>
<p>FDA 연구에서 동결건조 반려동물 사료에서도 살모넬라가 검출됐다. 동결건조는 수분을 제거해 세균 증식을 억제하지만, 이미 존재하는 세균이 완전히 사멸하지는 않는다. 재수화(물 첨가) 후에는 다시 증식 가능하다.</p>

<h2>동결건조 사료의 실제 장점</h2>
<div class="callout-dog">
<strong>동결건조의 실질적 이점</strong><br>
• 영양소(효소·비타민) 보존율 높음<br>
• 보관이 편리 (상온 장기 보관)<br>
• 기호성 우수<br>
• 일반 생식보다 세균 증식 억제 효과 있음 (완전 살균은 아님)
</div>

<h2>안전하게 사용하는 방법</h2>
<ul>
<li>급여 후 남은 음식 30분 내 제거</li>
<li>급여 전후 손 씻기 철저</li>
<li>면역저하 가족 있으면 주의 (사람 전파 위험)</li>
<li>재수화 후 즉시 급여 (장시간 방치 금지)</li>
<li>NASC·AAFCO 인증 제품 선택</li>
</ul>

<h2>마지막으로</h2>
<p>동결건조 사료는 일반 생식보다 세균 위험이 낮지만 완전히 안전하지 않다. "동결건조 = 안전"이라는 인식을 갖고 위생을 소홀히 하는 것이 더 위험하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "FDA — Get the Facts! Raw Pet Food Diets Including Freeze-Dried 2021",
      "한국수의영양학회 동결건조 사료 안전성 평가 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-16T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-550",
    slug: "shy-cat-bonding-guide",
    type: "blog",
    category: 1,
    title: "소심한 고양이와 유대 형성 — 강요 없이 천천히",
    subtitle: "소심한 고양이 특성 이해, 단계별 접근법, 보호자가 저지르는 흔한 실수",
    metaTitle: "소심한 고양이와 유대 형성 — 강요 없는 접근 단계별 가이드 | 펫지기",
    metaDescription: "소심하고 사람을 피하는 고양이와 유대 관계를 형성하는 방법. 소심한 고양이 특성 이해, 단계별 접근법, 보호자가 저지르는 흔한 실수를 정리했습니다.",
    body: `<p>어떤 고양이는 입양 후 몇 달이 지나도 보호자를 피하고 숨는다. 억지로 꺼내려 할수록 더 멀어진다. 소심한 고양이에게는 다른 접근이 필요하다.</p>

<h2>소심한 고양이가 보내는 신호</h2>
<ul>
<li>사람이 움직이면 숨기</li>
<li>눈 마주치면 피하기</li>
<li>만지려 하면 몸을 낮추고 회피</li>
<li>꼬리를 몸에 바짝 붙임</li>
</ul>

<h2>보호자가 흔히 저지르는 실수</h2>
<div class="callout-cat">
<strong>소심한 고양이 접근 실수</strong><br>
• 직접적인 눈 마주침 (포식자 위협 신호)<br>
• 빠른 움직임으로 다가가기<br>
• 억지로 안기<br>
• "왜 안 와?"라며 반복적 시도 (압박감 형성)<br>
• 너무 큰 목소리
</div>

<h2>단계별 접근법</h2>
<ul>
<li><strong>1단계</strong>: 같은 공간에 있기만 — 고양이를 쳐다보지 않고 독서·TV 시청</li>
<li><strong>2단계</strong>: 바닥에 앉아 눈 감거나 천천히 깜빡이기 (고양이 친화 신호)</li>
<li><strong>3단계</strong>: 간식을 옆에 놓아두고 기다리기</li>
<li><strong>4단계</strong>: 간식을 손에 들고 스스로 먹으러 오게 하기</li>
<li><strong>5단계</strong>: 고양이가 먼저 접촉을 시도할 때 짧고 부드럽게 반응</li>
</ul>

<h2>인내의 보상</h2>
<p>소심한 고양이와 유대가 형성되는 순간은 특별하다. 그 고양이가 처음으로 스스로 무릎에 올라왔을 때 — 그것은 오래 기다린 보호자에게 주어지는 선물이다.</p>

<h2>마지막으로</h2>
<p>소심한 고양이는 보호자를 싫어하는 것이 아니다. 아직 안전하다는 것을 확인하고 있는 것이다. 강요 없는 기다림이 가장 빠른 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Overall, K.L. — Feline Fear and Anxiety Disorders. Manual of Clinical Behavioral Medicine 2013",
      "한국고양이보호자연합 내성적 고양이 적응 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-17T09:00:00.000Z",
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
  console.log("블로그 포스트 85차 시딩 완료! (blog-546 ~ blog-550)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
