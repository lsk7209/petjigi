import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 70 — cat2×2 + cat3×1 + cat5×1 + cat1×1 = 5편 (IDs 471-475)
// Macros: B, A, D, F, G
// Angles: RA5, RA1, RA2, RA4, RA6

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-471",
    slug: "dog-grain-free-dcm-risk",
    type: "blog",
    category: 2,
    title: "강아지 그레인프리 사료와 DCM — FDA 경고의 실제 의미",
    subtitle: "그레인프리와 확장성 심근병증(DCM) 연관성, FDA 보고 내용, 실제 위험 정도",
    metaTitle: "강아지 그레인프리 사료 DCM 위험 — FDA 경고 해설 | 펫지기",
    metaDescription: "강아지 그레인프리 사료가 심장병(DCM)을 유발한다는 FDA 경고의 실제 의미를 분석했습니다. 연관성 vs 인과성 차이, 실제 위험 정도, 사료 선택 기준을 정리했습니다.",
    body: `<p>2018년 미국 FDA가 그레인프리 사료와 확장성 심근병증(DCM) 간 가능한 연관성을 경고하면서 국내 반려동물 보호자들도 큰 혼란을 겪었다. 이 경고를 어떻게 해석해야 할까?</p>

<h2>FDA 경고의 핵심</h2>
<p>FDA는 그레인프리 사료를 먹은 개에서 DCM 발생 사례가 보고되었다고 발표했다. 특히 콩류(legumes — 렌틸콩·완두콩 등)가 주재료로 쓰인 사료에서 사례가 집중됐다. 그러나 중요한 것은 <strong>연관성(association)은 보고됐지만 인과관계(causation)는 아직 확립되지 않았다</strong>는 점이다.</p>

<h2>연관성 vs 인과성</h2>
<p>그레인프리 사료를 먹은 개 중 일부에서 DCM이 발생했다고 해서 그레인프리가 DCM을 유발했다는 뜻은 아니다. 그 개들이 원래 DCM 유전 소인을 가지고 있었을 수 있고, 식이 외 다른 요인도 작용했을 수 있다. 2023년 현재까지 인과관계는 명확히 증명되지 않았다.</p>

<h2>실제로 어떤 사료가 문제였나</h2>
<div class="callout-dog">
<strong>DCM 보고 사례에서 공통된 특징</strong><br>
• 곡물 대신 렌틸콩·완두콩·감자가 주재료<br>
• 이국적 단백질(버팔로·캥거루 등) 위주<br>
• 소수 영양학 전문가가 설계한 부티크 브랜드<br>
▶ 모든 그레인프리가 아닌 특정 유형에 집중
</div>

<h2>실제 위험 정도</h2>
<p>DCM은 도베르만·복서·그레이트데인 같은 대형견에서 유전적으로 많이 발생한다. FDA에 보고된 사례 중 그레인프리 관련 DCM이 전체 DCM에서 차지하는 비율은 낮다. 패닉보다는 균형 잡힌 시각이 필요하다.</p>

<h2>사료 선택 가이드</h2>
<ul>
<li>AAFCO 완전영양식 인증 확인</li>
<li>주요 성분에서 콩류가 1~3위 재료이면 주의</li>
<li>대형 제조사 또는 수의 영양학자가 참여한 브랜드 선택</li>
<li>심장 이상 증상이 있으면 즉시 수의사 상담</li>
</ul>

<h2>마지막으로</h2>
<p>그레인프리 사료 전체를 공포의 대상으로 볼 필요는 없다. 그러나 완두콩·렌틸콩이 주재료인 소규모 부티크 브랜드는 좀 더 신중하게 선택하는 것이 현명하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "FDA — Investigation into Potential Link between Certain Diets and Canine DCM 2019",
      "Adin, D. et al. — Echocardiographic phenotype of canine DCM differs based on diet type. J Vet Intern Med 2019",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-07T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-472",
    slug: "cat-hairball-prevention-diet",
    type: "blog",
    category: 2,
    title: "고양이 헤어볼 완전 정복 — 식이로 예방하는 방법",
    subtitle: "헤어볼 형성 원리, 위험한 헤어볼 vs 정상 헤어볼, 헤어볼 전용 사료, 펫로지아 활용",
    metaTitle: "고양이 헤어볼 예방 — 식이·사료·헤어볼 제거제 완전 가이드 | 펫지기",
    metaDescription: "고양이 헤어볼 형성 원리부터 예방까지 정리했습니다. 헤어볼 전용 사료 선택법, 몰트·제거제 효과, 위험한 헤어볼 신호를 알아보세요.",
    body: `<p>고양이가 털을 토하는 것은 어느 정도 정상이다. 그러나 헤어볼이 장에 걸리거나, 토하지도 못하고 쌓이면 위험해질 수 있다.</p>

<h2>헤어볼 형성 원리</h2>
<p>고양이의 혀에는 미세한 갈고리 모양 돌기(papillae)가 있어 그루밍 시 털이 입으로 들어온다. 대부분은 소화관을 통해 배출되지만, 일부는 위에 뭉쳐 헤어볼이 된다. 장모종, 과도한 그루밍을 하는 고양이에서 더 자주 발생한다.</p>

<h2>정상 vs 위험 헤어볼</h2>
<table>
<thead><tr><th>구분</th><th>내용</th></tr></thead>
<tbody>
<tr><td>정상</td><td>월 1~2회 이하 구토, 원통형 털 덩어리, 구토 후 활기</td></tr>
<tr><td>주의</td><td>주 1회 이상 반복, 구토 후에도 불편해 보임</td></tr>
<tr><td>위험</td><td>토하려 하지만 아무것도 안 나옴, 식욕 감소, 변비 동반</td></tr>
</tbody>
</table>

<h2>헤어볼 예방 식이</h2>
<div class="callout-cat">
<strong>헤어볼 예방을 위한 식이 전략</strong><br>
• 헤어볼 전용 사료: 고섬유질 → 털을 장을 통해 배출 돕기<br>
• 충분한 수분 섭취: 습식 사료 병행 → 장 운동 촉진<br>
• 몰트·헤어볼 제거제: 윤활 성분으로 털 배출 보조 (주 1~2회)<br>
• 오메가-3 보충: 털 건강 유지 → 과도한 탈모·그루밍 감소
</div>

<h2>관리 방법</h2>
<ul>
<li>정기 브러싱: 주 2~3회 → 삼키는 털 양 자체를 줄이기</li>
<li>스트레스성 과잉 그루밍 여부 확인</li>
<li>고양이풀(캣그라스) 제공: 천연 구토 보조제로 활용</li>
</ul>

<h2>마지막으로</h2>
<p>헤어볼은 식이·브러싱으로 대부분 관리할 수 있다. 그러나 구토 시도에도 아무것도 나오지 않거나 식욕이 감소하면 장 폐색 가능성을 배제하기 위해 수의사 확인이 필요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Washabau, R.J. — Hairballs in Cats. Feline Internal Medicine 2012",
      "한국고양이수의사회 소화기 질환 임상 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-08T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-473",
    slug: "dog-epilepsy-seizure-guide",
    type: "blog",
    category: 3,
    title: "강아지 간질·발작 — 목격했을 때 보호자가 해야 할 것과 하지 말아야 할 것",
    subtitle: "발작 종류, 발작 중 대처법, 발작 후 회복기 관리, 간질 진단과 약물 치료",
    metaTitle: "강아지 발작·간질 대처법 — 목격 시 행동 가이드 | 펫지기",
    metaDescription: "강아지 발작을 목격했을 때 어떻게 해야 할까요? 발작 중 절대 하지 말아야 할 것, 발작 후 회복기 관리, 간질 진단과 약물 치료를 정리했습니다.",
    body: `<p>강아지가 갑자기 발작을 일으키면 보호자는 공황 상태에 빠지기 쉽다. 그러나 발작 중에 잘못된 행동을 하면 오히려 강아지를 다치게 할 수 있다.</p>

<h2>발작의 종류</h2>
<ul>
<li><strong>대발작(Grand Mal)</strong>: 의식 소실, 사지 경련, 침·거품 흘림 — 가장 흔하고 눈에 띄는 형태</li>
<li><strong>국소 발작(Focal)</strong>: 얼굴 씰룩임, 한쪽 다리만 경련</li>
<li><strong>부재 발작</strong>: 멍한 상태, 반응 없음 — 보호자가 놓치기 쉬움</li>
</ul>

<h2>발작 중 해야 할 것</h2>
<div class="callout-dog">
<strong>발작 중 행동 수칙</strong><br>
✅ 주변 위험물 치우기 (가구 모서리, 계단 근처)<br>
✅ 시간 측정 시작<br>
✅ 조용하게 말 걸기 (목소리가 안정에 도움)<br>
✅ 영상 촬영 (수의사에게 중요한 정보)<br>
✅ 5분 이상 지속되면 즉시 응급 병원
</div>

<h2>발작 중 절대 하지 말 것</h2>
<ul>
<li>입에 손 넣기 — 강아지는 발작 중 혀를 삼키지 않는다. 손을 다친다.</li>
<li>몸을 강하게 누르거나 잡기 — 근육 경련에 저항하면 골절 위험</li>
<li>물 먹이기 — 흡인 위험</li>
<li>밝은 조명·큰 소리 — 자극이 발작을 연장할 수 있다</li>
</ul>

<h2>발작 후 회복기(Post-ictal period)</h2>
<p>발작이 끝나도 5~30분 또는 그 이상 멍하거나 비틀거릴 수 있다. 이것은 정상이다. 이 시기에 강아지는 방향 감각을 잃고 공격적으로 변할 수 있으니 접근 시 주의한다.</p>

<h2>마지막으로</h2>
<p>발작 빈도·시간·영상을 기록해두면 수의사가 약물 조절에 크게 도움받는다. 월 2회 이상 발작, 5분 이상 발작, 발작 후 24시간 내 회복 실패 시 즉시 수의사 상담이 필요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Bhatti, S.F. et al. — International Veterinary Epilepsy Task Force consensus proposals. BMC Vet Res 2015",
      "한국수의신경학회 간질 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-08T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-474",
    slug: "cat-indoor-window-enrichment",
    type: "blog",
    category: 5,
    title: "실내 고양이를 위한 창문 버드워칭 환경 만들기",
    subtitle: "창문 패드 설치, 새 피더 배치, 햇빛 접근 확보, 안전한 발코니 캣워크",
    metaTitle: "실내 고양이 창문 버드워칭 환경 — 설치법과 안전 수칙 | 펫지기",
    metaDescription: "실내 고양이의 정신 건강을 위한 창문 버드워칭 환경 만들기. 창문 패드 설치, 새 피더 배치, 캣워크 안전 설치법을 정리했습니다.",
    body: `<p>실내 고양이에게 창문은 세상과 연결되는 통로다. 창밖을 바라보는 것은 단순한 취미가 아니라 정신적 자극이자 본능 충족이다. 올바른 창문 환경을 만들면 고양이의 삶의 질이 눈에 띄게 달라진다.</p>

<h2>버드워칭이 고양이에게 주는 것</h2>
<p>새·다람쥐·바람에 흔들리는 나뭇잎을 바라보는 것만으로 고양이는 사냥 본능의 시뮬레이션을 경험한다. 연구에 따르면 창문 접근이 보장된 실내 고양이는 스트레스 행동(과도한 그루밍, 우울 등)이 유의미하게 낮다.</p>

<h2>창문 환경 만들기</h2>
<div class="callout-cat">
<strong>버드워칭 환경 설치 체크리스트</strong><br>
• 창문 패드/해먹: 흡착식 → 설치 쉽고 고양이가 편히 앉을 수 있음<br>
• 창턱 확장대: 폭이 좁은 창턱에 판재 추가<br>
• 야외 새 피더: 1~2미터 거리에 설치 → 정기적으로 새가 오도록<br>
• 햇빛: 하루 최소 2시간 이상 직사광선 접근 권장
</div>

<h2>안전 주의사항</h2>
<ul>
<li>방충망은 고양이 체중을 버티지 못한다 — 방충망만 믿지 말 것</li>
<li>추락 방지 창문 잠금장치 또는 캣프루프 방충망으로 교체</li>
<li>발코니 캣워크 설치 시 탈출 차단망 필수</li>
<li>야생 새·쥐가 오는 공간 — 전염병(조류 분변) 접촉 주의</li>
</ul>

<h2>마지막으로</h2>
<p>창문 환경 개선은 비용이 거의 들지 않으면서 고양이 삶의 질을 크게 높이는 방법이다. 해먹 하나, 새 피더 하나가 고양이의 하루를 완전히 바꿀 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Ellis, S.L.H. et al. — Environmental enrichment for indoor cats. Appl Anim Behav Sci 2013",
      "한국고양이보호자연합 실내 환경 풍부화 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-09T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-475",
    slug: "stray-cat-tnr-guide",
    type: "blog",
    category: 1,
    title: "길고양이 TNR — 신청부터 완료까지 실제 절차 안내",
    subtitle: "TNR이란, 지자체 신청 방법, 트랩 설치 요령, 수술 후 방사 기준",
    metaTitle: "길고양이 TNR 신청 방법 — 지자체 접수부터 방사까지 | 펫지기",
    metaDescription: "길고양이 TNR을 직접 신청하는 방법을 정리했습니다. TNR 제도 개요, 지자체 접수 방법, 트랩 대여·설치 요령, 수술 후 방사 기준까지 알아보세요.",
    body: `<p>내 주변 길고양이 개체 수가 너무 많거나, 매년 새끼 고양이들이 반복적으로 태어나고 있다면 TNR이 가장 인도적이고 효과적인 해결책이다.</p>

<h2>TNR이란</h2>
<p>Trap(포획) - Neuter(중성화) - Return(방사)의 약자다. 길고양이를 포획해 중성화 수술 후 원래 자리로 돌려보내는 방식이다. 단순 포획·안락사보다 중·장기적으로 길고양이 개체 수를 더 효과적으로 줄이는 것이 연구로 확인됐다.</p>

<h2>지자체 TNR 신청 방법</h2>
<ol>
<li>해당 시군구 동물보호 담당 부서에 전화 또는 방문 신청</li>
<li>TNR 신청서 작성 (위치, 개체 수 추정, 발정·번식 여부)</li>
<li>트랩 대여 (지자체 제공) 또는 개인 트랩 사용</li>
<li>포획 후 지정 동물병원 이송 → 수술 (지자체 비용 부담)</li>
<li>회복 후 원래 장소 방사</li>
</ol>

<h2>트랩 설치 요령</h2>
<div class="callout-cat">
<strong>포획 트랩 설치 팁</strong><br>
• 고양이가 자주 다니는 경로·먹이 지점 파악<br>
• 이른 새벽 또는 저녁 설치 (야행성 활동 시간)<br>
• 트랩 내부에 강한 향의 먹이 (참치 캔 등)<br>
• 트랩을 담요로 덮어 어둡게 → 경계심 낮추기<br>
• 포획 후 1시간 이내 병원 이송 권장
</div>

<h2>수술 후 방사 기준</h2>
<ul>
<li>마취 완전 회복 (최소 24시간 경과)</li>
<li>귀 끝 절개(Ear-tip) 확인 — TNR 완료 표시</li>
<li>원래 서식지로 방사 (낯선 곳 방사 금지)</li>
</ul>

<h2>마지막으로</h2>
<p>TNR은 지역 주민 갈등 해소와 길고양이 복지를 동시에 달성하는 방법이다. 지자체 예산이 부족한 경우 캣맘 네트워크·동물보호 단체와 협력하면 더 빠르게 진행할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "농림축산식품부 길고양이 중성화 사업 안내",
      "한국동물복지협회 TNR 운영 가이드라인 2023",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-09T11:00:00.000Z",
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
  console.log("블로그 포스트 70차 시딩 완료! (blog-471 ~ blog-475)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
