import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 106 — cat3×2 + cat4×1 + cat1×1 + cat2×1 = 5편 (IDs 651-655)
// Macros: D, A, F, B, G
// Angles: RA7, RA1, RA3, RA8, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-651",
    slug: "cat-chronic-gingivitis-prevention",
    type: "blog",
    category: 3,
    title: "고양이 만성 치은염 예방 — 매일 구강 관리의 실제 효과",
    subtitle: "치은염 진행 단계, 칫솔질 외 대안, VOHC 인증 제품, 스케일링 주기",
    metaTitle: "고양이 만성 치은염 예방 — 칫솔질·대안·스케일링 주기 가이드 | 펫지기",
    metaDescription: "고양이 만성 치은염 예방 방법. 치은염 진행 단계, 칫솔질 대안 제품(VOHC 인증), 적절한 스케일링 주기, 집에서 할 수 있는 구강 관리법을 정리했습니다.",
    body: `<p>고양이 치주 질환은 3살 이상에서 매우 흔하다. 그러나 많은 보호자가 고양이가 칫솔질을 싫어한다는 이유로 구강 관리를 포기한다. 대안이 있다.</p>

<h2>치은염 진행 단계</h2>
<ul>
<li>1단계: 잇몸 경미한 발적, 가역적</li>
<li>2단계: 치주 조직 시작 손상, 입 냄새</li>
<li>3단계: 심한 치주 질환, 치아 동요, 통증</li>
<li>4단계: 치아 소실, 전신 감염 위험</li>
</ul>

<h2>칫솔질이 가장 효과적</h2>
<p>하루 1회 칫솔질이 치주 질환 예방에 가장 효과적이다. 그러나 현실적으로 어려운 경우 대안을 사용하는 것이 안 하는 것보다 낫다.</p>

<h2>칫솔질 대안 (VOHC 인증)</h2>
<div class="callout-cat">
<strong>효과 확인된 구강 관리 제품</strong><br>
• VOHC(수의구강보건위원회) 인증 간식: 효과 입증<br>
• 구강 위생 물 첨가제 (VOHC 인증)<br>
• 치과용 젤·스프레이<br>
• 치과 전용 건식 사료<br>
▶ VOHC 인증 없는 "치아 케어" 제품은 효과 불명확
</div>

<h2>스케일링 주기</h2>
<ul>
<li>건강한 고양이: 연 1~2회 수의사 구강 검진</li>
<li>스케일링 필요 시점: 수의사 판단 (치석 정도·치은염 단계)</li>
<li>마취 스케일링: 완전한 세척 가능, 고양이에게 더 안전</li>
<li>마취 없는 스케일링(안수): 치료 효과 없음, 권장하지 않음</li>
</ul>

<h2>마지막으로</h2>
<p>구강 관리는 할 수 있는 것부터 시작하는 것이 중요하다. 칫솔질이 어렵다면 VOHC 인증 간식 하나부터 시작하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Lund, E.M. et al. — Health status and population characteristics of cats. JAVMA 1999",
      "한국수의치과학회 고양이 구강 건강 관리 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-12-06T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-652",
    slug: "dog-meningoencephalitis-guide",
    type: "blog",
    category: 3,
    title: "강아지 수막염·뇌염 — 갑작스러운 신경 증상의 원인",
    subtitle: "MUO(원인불명 수막뇌염) 특징, 증상, 치료, 예후, 고위험 소형견",
    metaTitle: "강아지 수막염·뇌염(MUO) — 원인·증상·치료·예후 가이드 | 펫지기",
    metaDescription: "강아지 수막염·뇌염(MUO) 원인과 치료. 원인불명 수막뇌염 특징, 소형견 고위험, 갑작스러운 신경 증상, 스테로이드 치료와 예후를 정리했습니다.",
    body: `<p>강아지가 갑자기 경련을 하거나, 걷지 못하거나, 고개를 한쪽으로 기울이고 눈이 흔들린다면 신경계 이상을 의심해야 한다. 뇌염이 원인일 수 있다.</p>

<h2>수막뇌염이란</h2>
<p>뇌·척수 및 이를 감싸는 수막에 염증이 생기는 질환이다. 원인은 감염성(바이러스·세균·원충)과 비감염성(면역 매개)으로 나뉜다.</p>

<h2>MUO(원인불명 수막뇌염)</h2>
<p>국내 소형견에서 가장 흔한 뇌염 유형이다. 퍼그·몰티즈·치와와·요크셔테리어 등 소형견에서 높은 빈도로 발생한다. 원인은 면역 매개로 추정되며, 확진은 MRI+CSF(뇌척수액) 검사다.</p>

<h2>증상</h2>
<div class="callout-dog">
<strong>뇌염 주요 증상</strong><br>
• 갑작스러운 발작<br>
• 머리 기울임(Head tilt)<br>
• 안구 진탕(눈이 떨리거나 한쪽 방향으로 계속 돌아감)<br>
• 걷지 못하거나 원을 그리며 돌기<br>
• 실명·의식 저하
</div>

<h2>치료</h2>
<ul>
<li>MUO: 스테로이드(면역 억제) ± 사이클로스포린</li>
<li>감염성 뇌염: 원인에 따른 항생제·항바이러스제</li>
<li>발작 조절: 항경련제 병행</li>
</ul>

<h2>예후</h2>
<ul>
<li>MUO: 치료로 조절 가능하지만 완치 어려움, 재발 관리 필요</li>
<li>조기 치료 시작할수록 예후 좋음</li>
<li>일부는 평생 약물로 정상 생활 가능</li>
</ul>

<h2>마지막으로</h2>
<p>신경 증상은 즉각적인 수의사 방문이 필요하다. "지켜보자"가 골든 타임을 놓치게 한다. 발작 또는 급격한 신경 증상은 응급 처치에 해당한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Granger, N. & Smith, P.M. — Canine and feline meningoencephalitis. Vet Clin North Am 2010",
      "한국수의신경학회 수막뇌염 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 응급 상황에서는 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-12-07T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-653",
    slug: "pet-international-travel-microchip",
    type: "blog",
    category: 4,
    title: "반려동물 해외 출국·입국 — 마이크로칩·검역·서류 완전 가이드",
    subtitle: "국가별 검역 기준, 마이크로칩 국제 표준, 광견병 항체 검사, 허용 기간",
    metaTitle: "반려동물 해외 여행 — 마이크로칩·검역 서류·국가별 규정 | 펫지기",
    metaDescription: "반려동물과 해외 여행 시 필요한 서류와 절차. 마이크로칩 국제 표준, 광견병 항체 검사, 국가별 검역 기준, 한국 귀국 시 절차를 정리했습니다.",
    body: `<p>반려동물과 해외로 이동하는 것은 복잡한 서류와 절차가 필요하다. 나라마다 다른 기준 때문에 준비를 6개월 이상 전에 시작해야 하는 경우도 있다.</p>

<h2>마이크로칩 국제 표준</h2>
<p>국제 표준 마이크로칩은 ISO 11784/11785 규격(15자리 숫자)이다. 국내 마이크로칩 대부분이 이 규격을 따른다. 오래된 비표준 칩이 있다면 출국 전 확인 필요.</p>

<h2>한국 출국 기본 서류</h2>
<ul>
<li>수의사 발급 건강증명서(영문)</li>
<li>예방접종 증명서(광견병 포함)</li>
<li>마이크로칩 확인서</li>
<li>농림축산검역본부 수출검역증명서</li>
</ul>

<h2>국가별 주요 차이</h2>
<div class="callout-dog">
<strong>대표 국가 검역 기준</strong><br>
• <strong>미국</strong>: 광견병 백신 증명 필수. 하와이·괌은 별도 엄격 기준.<br>
• <strong>유럽 EU</strong>: EU 동물여권 또는 ISO 마이크로칩 + 광견병 항체 검사<br>
• <strong>일본</strong>: 광견병 항체 검사 + 6개월 이상 준비 기간 (가장 엄격)<br>
• <strong>호주·뉴질랜드</strong>: 최소 3~6개월 격리 검역 가능성
</div>

<h2>광견병 항체 검사</h2>
<ul>
<li>일부 국가 입국 시 필수: 0.5 IU/mL 이상이 기준</li>
<li>광견병 예방접종 후 30일 이상 경과 후 채혈</li>
<li>FAVN 검사: 특정 인증 기관에서만 가능</li>
<li>결과까지 2~4주 소요</li>
</ul>

<h2>한국 귀국 시</h2>
<p>한국 입국도 검역이 필요하다. 수출국 발행 건강증명서 + 예방접종 증명서. 일부 국가 출발 시 추가 검역 격리 가능성 있음(고위험 국가).</p>

<h2>마지막으로</h2>
<p>반려동물 해외 여행은 최소 6개월 전 해당 국가 대사관·농림축산검역본부에 최신 기준을 확인하는 것이 필수다. 규정이 자주 바뀐다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "농림축산검역본부 반려동물 수출입 검역 안내",
      "USDA APHIS — Traveling Internationally with Pets",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-07T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-654",
    slug: "large-breed-senior-dog-adoption",
    type: "blog",
    category: 1,
    title: "대형 노령견 입양 — 7살 이상 래브라도·골든의 실제 케어",
    subtitle: "대형 노령견 특유의 건강 과제, 공간·운동 관리, 의료비 현실, 짧지 않은 남은 시간",
    metaTitle: "대형 노령견 입양 — 7살 이상 래브라도·골든 케어 현실 가이드 | 펫지기",
    metaDescription: "대형 노령견 입양을 고려하는 분들을 위한 현실 가이드. 대형견 특유의 건강 과제, 관절·심장 관리, 의료비 준비, 남은 시간을 함께하는 의미를 정리했습니다.",
    body: `<p>대형 노령견은 소형 노령견과 다른 도전이 있다. 그러나 그만큼 보호자에게 돌아오는 것도 크다.</p>

<h2>대형 노령견 특유의 건강 과제</h2>
<ul>
<li>관절 질환: 고관절·슬개골 이형성증 고위험</li>
<li>심장 질환: 확장성 심근병증(DCM) 대형견 발생률 높음</li>
<li>종양: 비장 혈관육종·골육종 대형견 호발</li>
<li>척추 질환: 체중 부하로 인한 디스크 질환</li>
</ul>

<h2>입양 전 준비</h2>
<div class="callout-dog">
<strong>대형 노령견 입양 전 체크</strong><br>
• 충분한 공간: 넓고 장애물 없는 이동 경로<br>
• 미끄럼 방지: 전 가정 매트 필수<br>
• 높이 조절: 낮은 밥그릇 받침대, 낮은 침대<br>
• 계단: 가능하면 경사로로 대체<br>
• 차량: 대형견 보조 계단 또는 리프트
</div>

<h2>의료비 현실</h2>
<ul>
<li>월 기본 관절 보충제·진통제: 3~8만 원</li>
<li>심장 초음파 연 1회: 10~15만 원</li>
<li>응급 수술 가능성: 100~300만 원 대비 필요</li>
<li>대형견 펫보험 가입 가능 여부 미리 확인</li>
</ul>

<h2>짧지 않은 남은 시간</h2>
<p>7살 대형견의 평균 남은 수명은 3~5년이다. 소형견보다 짧지만, 3~5년은 결코 짧지 않다. 그 시간 동안 대형견만이 줄 수 있는 따뜻함과 안정감이 있다.</p>

<h2>마지막으로</h2>
<p>대형 노령견 입양은 더 많은 준비가 필요하지만, 충분한 준비 위에서 시작하면 그 시간은 기억에 남을 것이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국동물복지협회 대형 노령견 입양 현황 보고서",
      "Bonnett, B.N. et al. — Mortality in over 350,000 insured Swedish dogs from 1995–2000. Acta Vet Scand 2005",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-08T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-655",
    slug: "kitten-weaning-solid-food-transition",
    type: "blog",
    category: 2,
    title: "키튼 이유식에서 고형식으로 — 4~8주 전환 단계별 방법",
    subtitle: "이유 시작 시기, 단계별 식이 전환, 고형식 거부 시 대처, 영양 기준",
    metaTitle: "키튼 이유 단계 — 4~8주 이유식·고형식 전환 완전 가이드 | 펫지기",
    metaDescription: "새끼 고양이 이유 과정과 고형식 전환 방법. 이유 시작 적정 시기, 4~8주 단계별 식이 전환, 고형식 거부 시 대처, 키튼 영양 요구량을 정리했습니다.",
    body: `<p>새끼 고양이의 이유 과정은 자연스럽게 진행되지만, 인위적으로 도와야 하는 경우(구조 키튼 등)에는 올바른 방법이 중요하다.</p>

<h2>이유 시작 시기</h2>
<ul>
<li>자연 이유: 어미가 새끼에게 고형식 먹는 것을 보여주기 시작 (3~4주)</li>
<li>인공 이유: 3~4주령부터 시작 가능</li>
<li>너무 이른 이유 (2주 미만): 소화기 미성숙 → 설사·영양 불량</li>
</ul>

<h2>단계별 전환</h2>
<table>
<thead><tr><th>주령</th><th>식이</th></tr></thead>
<tbody>
<tr><td>3~4주</td><td>KMR(고양이 대용 모유) 위주, 고형 시도 시작</td></tr>
<tr><td>4~5주</td><td>KMR + 고형 습식 사료 1:1 퓌레 형태</td></tr>
<tr><td>5~6주</td><td>점차 고형식 비율 높이기</td></tr>
<tr><td>7~8주</td><td>고형 습식 사료 주식, KMR 보완</td></tr>
<tr><td>8주 이상</td><td>고형 사료 주식, KMR 중단</td></tr>
</tbody>
</table>

<h2>고형식 거부 시 대처</h2>
<div class="callout-cat">
<strong>이유 거부 대처 방법</strong><br>
• 고형식을 따뜻하게 데우기<br>
• 손가락에 묻혀서 핥게 하기<br>
• 접시 여러 종류 시도<br>
• 억지로 먹이지 않기 (거부감 형성)<br>
• 48시간 이상 먹지 않으면 수의사 확인
</div>

<h2>키튼 영양 기준</h2>
<ul>
<li>키튼 전용 사료: 성묘보다 단백질·지방·칼슘 높음</li>
<li>AAFCO "성장기" 인증 필수</li>
<li>일반 성묘 사료로 키튼 먹이지 말 것 (영양 부족)</li>
</ul>

<h2>마지막으로</h2>
<p>이유 과정은 천천히 진행하는 것이 원칙이다. 서두르면 소화 장애가 오고, 너무 늦으면 모유에만 의존하게 된다. 8주 이전 입양은 이 과정이 완성되지 않았을 가능성이 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국고양이수의사회 키튼 영양 가이드라인",
      "Buffington, C.A.T. et al. — Nutrition assessment guidelines. J Vet Intern Med 2004",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-08T11:00:00.000Z",
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
  console.log("블로그 포스트 106차 시딩 완료! (blog-651 ~ blog-655)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
