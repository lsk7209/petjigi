import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 110 — cat3×2 + cat4×1 + cat2×1 + cat5×1 = 5편 (IDs 671-675)
// Macros: D, A, C, G, F
// Angles: RA4, RA2, RA7, RA5, RA3

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-671",
    slug: "dog-diabetes-insipidus-guide",
    type: "blog",
    category: 3,
    title: "강아지 요붕증 — 물을 너무 많이 마시는 원인",
    subtitle: "중추성 vs 신성 요붕증 구분, 다음다뇨 감별 진단, 물 박탈 검사, 치료 방법",
    metaTitle: "강아지 요붕증 — 중추성·신성 구분·진단·치료 가이드 | 펫지기",
    metaDescription: "강아지 요붕증 원인과 치료. 물을 과도하게 마시는 다음다뇨 증상, 중추성·신성 요붕증 차이, 물 박탈 검사, DDAVP 치료 방법을 설명합니다.",
    body: `<p>강아지가 물을 지나치게 많이 마시고(다음, polydipsia), 소변을 지나치게 많이 본다면(다뇨, polyuria), 요붕증을 포함한 여러 원인을 감별해야 한다.</p>

<h2>요붕증이란</h2>
<p>요붕증(Diabetes Insipidus)은 ADH(항이뇨호르몬, 바소프레신)의 분비 부족 또는 신장에서의 반응 부족으로 소변이 과도하게 희석된 채 대량 배출되는 질환이다. 혈당 이상인 당뇨병(Diabetes Mellitus)과는 다른 질환이다.</p>

<h2>요붕증 유형</h2>
<ul>
<li><strong>중추성 요붕증</strong>: 뇌(시상하부·뇌하수체)에서 ADH 분비 부족 — 두개 내 종양, 외상, 선천성</li>
<li><strong>신성 요붕증</strong>: ADH는 정상이지만 신장이 반응하지 못함 — 신장 질환, 저칼륨혈증, 쿠싱증후군 연관</li>
</ul>

<h2>감별이 필요한 다음다뇨 원인</h2>
<div class="callout-dog">
<strong>물 많이 마시는 강아지 — 감별 진단</strong><br>
• 당뇨병 (Diabetes Mellitus)<br>
• 쿠싱증후군 (부신피질기능항진증)<br>
• 신장 질환 (CKD)<br>
• 간 질환<br>
• 자궁축농증 (중성화 안 된 암컷)<br>
• 고칼슘혈증<br>
▶ 혈액·소변 검사 없이 요붕증 자가 판단은 불가능합니다
</div>

<h2>진단 검사</h2>
<ul>
<li>기본 혈액·소변 검사: 다른 원인 배제</li>
<li>소변 비중 확인: 요붕증 시 매우 낮음 (1.001~1.005)</li>
<li>물 박탈 검사: 수의사 감독 아래 시행, 소변 농축 능력 평가</li>
<li>DDAVP(데스모프레신) 반응 검사: 중추성·신성 감별</li>
</ul>

<h2>치료</h2>
<ul>
<li>중추성: DDAVP 비강 분무 또는 안약 형태 투여</li>
<li>신성: 근본 원인 치료, 저나트륨 식이, 이뇨제(역설적 효과)</li>
<li>물은 자유로이 제공해야 함 — 제한하면 탈수 위험</li>
</ul>

<h2>마지막으로</h2>
<p>물을 많이 마신다고 방치하면 탈수·전해질 불균형이 생긴다. 다음다뇨 증상이 1~2주 이상 지속되면 반드시 수의사 검진을 받자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Feldman, E.C. & Nelson, R.W. — Canine and Feline Endocrinology. Elsevier 2004",
      "한국수의내과학회 다음다뇨 감별 진단 및 요붕증 치료 지침",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-12-16T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-672",
    slug: "cat-pancreatitis-guide",
    type: "blog",
    category: 3,
    title: "고양이 췌장염 — 증상 불명확한 이유와 진단",
    subtitle: "고양이 췌장염의 비전형 증상, fPLI 검사, 삼중염 연관, 지지 치료 원칙",
    metaTitle: "고양이 췌장염 — 비전형 증상·fPLI 진단·치료 가이드 | 펫지기",
    metaDescription: "고양이 췌장염 원인과 치료. 개와 다른 비전형 증상, fPLI 혈액 검사, 삼중염(췌장염+IBD+담관염) 연관성, 지지 치료 방법을 설명합니다.",
    body: `<p>강아지의 췌장염은 구토·복통이 뚜렷하다. 그러나 고양이의 췌장염은 다르다. 증상이 불명확하고 비특이적이어서 진단이 어렵다.</p>

<h2>고양이 췌장염이 진단되기 어려운 이유</h2>
<ul>
<li>구토가 없거나 경미한 경우 많음</li>
<li>주요 증상이 무기력·식욕 부진 뿐인 경우 흔함</li>
<li>복통 표현을 잘 하지 않음 (웅크리기·자세 변화로만 나타남)</li>
<li>혈액 lipase 검사가 고양이에서는 신뢰도 낮음</li>
</ul>

<h2>주요 증상</h2>
<div class="callout-cat">
<strong>고양이 췌장염 의심 증상</strong><br>
• 수일 이상 지속되는 식욕 저하<br>
• 무기력, 기운 없음<br>
• 구토 (없을 수도 있음)<br>
• 체중 감소<br>
• 황달 (심한 경우)<br>
▶ 이 증상들은 다른 질환에서도 나타나므로 검사 없이는 감별 불가
</div>

<h2>삼중염(Triaditis) 연관</h2>
<p>고양이는 췌장염이 동시에 IBD(염증성 장 질환)와 담관간염을 동반하는 "삼중염"이 흔하다. 이 세 질환은 공통 해부학적 구조로 연결되어 있다. 하나만 치료하면 나머지가 조절되지 않을 수 있다.</p>

<h2>진단</h2>
<ul>
<li><strong>fPLI (고양이 췌장 특이 리파제)</strong>: 고양이 췌장염에 가장 민감한 혈액 검사</li>
<li>복부 초음파: 췌장 부종·주변 지방 변화 확인</li>
<li>CBC·생화학: 전반적 상태 평가, 동반 질환 확인</li>
</ul>

<h2>치료</h2>
<ul>
<li>수액 치료: 탈수 교정, 순환 개선</li>
<li>식이 지원: 식욕 회복이 핵심, 필요 시 비위관 수유</li>
<li>오심·구토 조절: 마로피탄트(서레니아)</li>
<li>통증 관리: 수의사 처방 진통제</li>
<li>동반 질환 치료: IBD·담관간염 함께 관리</li>
</ul>

<h2>마지막으로</h2>
<p>고양이가 2일 이상 잘 먹지 않고 무기력하다면, 판단을 미루지 말자. 고양이는 아픔을 숨기는 데 능하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Steiner, J.M. — Feline exocrine pancreatic disease. Vet Clin North Am Small Anim Pract 2012",
      "한국수의내과학회 고양이 췌장 질환 진단 및 치료 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-12-17T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-673",
    slug: "pet-insurance-renewal-rejection",
    type: "blog",
    category: 4,
    title: "펫보험 갱신 거절 — 사유와 대처법",
    subtitle: "갱신 거절 주요 사유, 질병 이력과 갱신 관계, 대안 상품 탐색, 무갱신 보험 비교",
    metaTitle: "펫보험 갱신 거절 — 이유와 대처 방법 완전 정리 | 펫지기",
    metaDescription: "펫보험 갱신이 거절되는 이유와 대처 방법. 기존 질병 이력, 보험사 정책 변경, 갱신 거절 후 대안 상품 탐색, 무갱신 보험과 일반 갱신 보험 비교를 정리했습니다.",
    body: `<p>펫보험을 여러 해 납입했는데 갱신 거절 통보를 받는 경우가 있다. 이것은 왜 일어나며, 어떻게 대처해야 할까.</p>

<h2>갱신 거절이 발생하는 주요 사유</h2>
<ul>
<li><strong>고위험 질병 이력</strong>: 암·심장 질환·만성 신장 질환 등 고비용 질환 발생 후</li>
<li><strong>고령</strong>: 일부 상품은 특정 나이(7~10세) 이후 갱신 제한</li>
<li><strong>보험사 상품 단종</strong>: 해당 상품 자체 판매 중단으로 갱신 불가</li>
<li><strong>보험사 손해율 상승</strong>: 전체 상품군 갱신 조건 강화</li>
</ul>

<h2>갱신형 보험의 구조</h2>
<div class="callout-dog">
<strong>갱신형 vs 비갱신형 비교</strong><br>
• <strong>갱신형</strong>: 1~3년 단위 갱신, 갱신 시 보험료 인상 가능, 갱신 거절 가능<br>
• <strong>비갱신형(만기형)</strong>: 가입 시 보험료 고정, 만기까지 보장 보장, 보험료 높음<br>
• <strong>무갱신 장기보험</strong>: 갱신 없이 10~15년 유지, 최근 상품 증가<br>
▶ 건강할 때 비갱신 또는 무갱신 상품 가입이 장기적으로 유리
</div>

<h2>갱신 거절 후 대처 방법</h2>
<ul>
<li>다른 보험사 신규 가입 시도 (단, 기존 질병은 면책 또는 거절 가능)</li>
<li>비갱신·장기 상품 전환 검토</li>
<li>금융감독원 소비자 포털에서 분쟁 조정 가능 여부 확인</li>
<li>동물병원 할인 프로그램 또는 반려동물 의료비 대출 상품 탐색</li>
</ul>

<h2>처음 가입 시 주의사항</h2>
<ul>
<li>면책 기간 확인: 가입 후 30~90일 간 일부 질환 비보장</li>
<li>갱신 조건 명확히 확인: 몇 세까지 갱신 보장하는지</li>
<li>선천성 질환 제외 조항 확인</li>
</ul>

<h2>마지막으로</h2>
<p>반려동물이 건강할 때 가입하고, 가능하면 갱신 보장이 명확한 상품을 선택하는 것이 최선이다. 이미 질병이 생긴 후에는 선택지가 줄어든다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 보험·법률 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 반려동물보험 소비자 가이드 (2024)",
      "한국손해보험협회 펫보험 상품 현황 보고서",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며, 개별 보험 계약 조건은 해당 보험사에 직접 확인하세요.",
    status: "published",
    publishedAt: "2026-12-17T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-674",
    slug: "raw-dog-food-safety-reality",
    type: "blog",
    category: 2,
    title: "강아지 생식(Raw Food) 급여 — 위험성과 현실",
    subtitle: "생식 지지 근거와 한계, 세균 오염 위험, 영양 불균형 위험, 안전하게 하려면",
    metaTitle: "강아지 생식 급여 — 위험성·영양 불균형·안전 지침 | 펫지기",
    metaDescription: "강아지 생식(Raw Food) 급여의 위험성과 현실. 살모넬라·리스테리아 감염 위험, 영양 불균형 위험, 생식을 안전하게 급여하기 위한 조건을 설명합니다.",
    body: `<p>생식(Raw Food Diet)은 가열하지 않은 고기·뼈·내장을 급여하는 방식이다. 지지자들은 자연식이라고 주장하지만, 수의 영양 전문가들은 여러 위험을 경고한다.</p>

<h2>생식 지지 근거와 한계</h2>
<ul>
<li>지지 주장: 모질 개선, 소화 향상, 에너지 증가</li>
<li>한계: 이를 뒷받침하는 대규모 임상 연구가 부족</li>
<li>관찰 보고 대부분이 주관적 평가이며 대조군 없음</li>
</ul>

<h2>세균 오염 위험</h2>
<div class="callout-dog">
<strong>생식의 세균 위험</strong><br>
• FDA·CDC 연구: 생식 샘플의 21~48%에서 살모넬라 검출<br>
• 리스테리아, 캄필로박터, 대장균(E. coli O157:H7) 오염 사례<br>
• 강아지가 감염돼도 증상 없이 보호자에게 전파 가능<br>
• 면역 저하자·임산부·어린이가 있는 가정에서 특히 주의<br>
▶ 강아지 배변·타액 접촉 후 세균이 사람에게 전파됩니다
</div>

<h2>영양 불균형 위험</h2>
<ul>
<li>집에서 만드는 생식: 칼슘·인 비율 불균형이 흔함</li>
<li>뼈 없는 근육육만 급여 시 칼슘 심각 부족 → 뼈 약화</li>
<li>내장 과다 급여 시 비타민 A 중독 위험</li>
<li>시판 생식 제품도 영양 완전성 검증 부족한 경우 있음</li>
</ul>

<h2>생식을 선택한다면 최소 조건</h2>
<ul>
<li>AAFCO "성장기" 또는 "전 생애" 영양 완전성 인증 제품 선택</li>
<li>수의 영양 전문가 처방에 따른 레시피 사용 (직접 만들 경우)</li>
<li>위생 관리: 조리 도구 별도, 급여 후 즉시 세정</li>
<li>면역 저하 동물, 강아지, 노령견에게는 권장하지 않음</li>
</ul>

<h2>마지막으로</h2>
<p>생식이 맞는 강아지와 가정이 있을 수 있다. 그러나 "자연스럽다"는 이유만으로 결정하기에는 위험이 있다. 결정 전 수의 영양 전문가와 충분히 상의하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Freeman, L.M. et al. — Current knowledge about risks and benefits of raw meat-based diets. JAVMA 2013",
      "한국반려동물영양학회 생식 급여 안전 지침",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-18T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-675",
    slug: "dog-cafe-pet-friendly-etiquette",
    type: "blog",
    category: 5,
    title: "반려견 동반 카페·식당 에티켓 — 갈등 없이 즐기기",
    subtitle: "입장 전 준비, 실내 기본 에티켓, 짖음·배변 대처, 다른 고객 배려 방법",
    metaTitle: "반려견 동반 카페·식당 에티켓 — 갈등 없이 즐기는 방법 | 펫지기",
    metaDescription: "반려견 동반 카페·식당 에티켓 완전 정리. 입장 전 준비, 실내 기본 에티켓, 짖음·배변 사고 대처, 다른 고객을 배려하는 구체적인 방법을 알아봅니다.",
    body: `<p>반려견 동반 허용 공간이 늘었다. 그러나 이 공간을 지속 가능하게 유지하는 것은 함께 사용하는 보호자들의 에티켓에 달려 있다.</p>

<h2>입장 전 준비</h2>
<ul>
<li>산책과 배변 완료 후 입장 — 실내 배변 사고 예방</li>
<li>충분한 운동으로 흥분 에너지 소진</li>
<li>목줄·하네스 착용 확인 (외부 이탈 방지)</li>
<li>배변봉투·물티슈·반려견 물 지참</li>
<li>방문 전 해당 업소 반려견 입장 규칙 확인</li>
</ul>

<h2>실내 기본 에티켓</h2>
<div class="callout-dog">
<strong>반려견 동반 실내 기본 규칙</strong><br>
• 리드줄은 항상 짧게 잡기 (다른 테이블 침범 방지)<br>
• 테이블 음식에 강아지 올리거나 사람 음식 주지 않기<br>
• 다른 강아지·손님과 허락 없이 접근하지 않기<br>
• 의자나 소파에 올리지 않기 (허용하는 곳은 예외)<br>
• 보호자가 자리를 비울 때 혼자 두지 않기
</div>

<h2>짖음 대처</h2>
<ul>
<li>짖기 시작하면 즉시 업소 밖으로 이동</li>
<li>"괜찮아, 얌전해"라며 방치하는 것은 다른 고객에게 실례</li>
<li>반복적인 짖음이 있다면 아직 공공장소 훈련이 더 필요한 단계</li>
</ul>

<h2>배변 사고 대처</h2>
<ul>
<li>즉각 치우고 업소 직원에게 알리기</li>
<li>소독 티슈로 바닥 닦기</li>
<li>사과 후 정상적으로 이용 계속 (당황하지 말 것)</li>
</ul>

<h2>다른 고객 배려</h2>
<ul>
<li>강아지를 무서워하는 사람이 있을 수 있음 — 강요하지 않기</li>
<li>"우리 개는 물지 않아요"는 허가가 아님 — 상대방이 원할 때만 접촉 허용</li>
<li>알레르기·공포증이 있는 고객과 충분한 거리 유지</li>
</ul>

<h2>마지막으로</h2>
<p>반려견 동반 문화를 넓히는 것은 에티켓에서 시작한다. 좋은 경험을 쌓은 업소는 계속 반려견을 환영하고, 그렇지 않은 경험이 반복되면 정책이 바뀐다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동·케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물문화협회 반려동물 동반 시설 이용 에티켓 가이드",
      "서울시 반려동물 동반 카페·식당 운영 현황 조사 (2024)",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-18T11:00:00.000Z",
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
  console.log("블로그 포스트 110차 시딩 완료! (blog-671 ~ blog-675)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
