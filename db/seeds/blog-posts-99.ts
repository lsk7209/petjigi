import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 99 — cat2×2 + cat3×1 + cat5×1 + cat4×1 = 5편 (IDs 616-620)
// Macros: A, B, D, F, G
// Angles: RA7, RA5, RA2, RA1, RA3

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-616",
    slug: "cat-urinary-prescription-diet-guide",
    type: "blog",
    category: 2,
    title: "고양이 요로 처방식 — 결석 종류에 따라 다른 사료가 필요하다",
    subtitle: "스트루바이트 vs 옥살산칼슘 결석 차이, 식이 pH 조절, 처방식 선택법",
    metaTitle: "고양이 요로 처방식 — 결석 종류별 식이 선택 완전 가이드 | 펫지기",
    metaDescription: "고양이 요로 처방식을 결석 종류에 맞게 선택하는 방법. 스트루바이트와 옥살산칼슘 결석 차이, pH 조절 식이 원리, 처방식 브랜드 비교를 정리했습니다.",
    body: `<p>모든 요로 처방식이 같은 것이 아니다. 결석 종류에 따라 처방식이 달라져야 한다. 잘못된 처방식은 오히려 다른 종류의 결석을 유발할 수 있다.</p>

<h2>고양이 요로 결석 두 가지</h2>
<table>
<thead><tr><th>구분</th><th>스트루바이트</th><th>옥살산칼슘</th></tr></thead>
<tbody>
<tr><td>원인</td><td>알칼리 소변, 세균 감염</td><td>산성 소변, 고칼슘</td></tr>
<tr><td>해소 가능?</td><td>식이로 용해 가능</td><td>수술 또는 레이저 필요</td></tr>
<tr><td>식이 목표</td><td>소변 산성화</td><td>소변 중성화, 칼슘 제한</td></tr>
<tr><td>흔한 고양이</td><td>수컷, 비만 실내묘</td><td>고령·수컷</td></tr>
</tbody>
</table>

<h2>처방식 선택의 중요성</h2>
<div class="callout-cat">
<strong>처방식 선택 실수 예시</strong><br>
• 스트루바이트 처방식(산성화) → 옥살산칼슘 발생 위험<br>
• 옥살산칼슘 처방식(중성화) → 스트루바이트 재발 위험<br>
▶ 초음파·X-ray + 소변 검사로 결석 종류 확인 먼저
</div>

<h2>주요 처방식 브랜드 비교</h2>
<ul>
<li><strong>힐스 c/d</strong>: 스트루바이트·FLUTD 예방 (가장 널리 사용)</li>
<li><strong>로얄캐닌 Urinary S/O</strong>: 스트루바이트 + 일부 옥살산칼슘</li>
<li><strong>힐스 u/d</strong>: 옥살산칼슘 및 신장 겸용</li>
<li><strong>로얄캐닌 Oxalate</strong>: 옥살산칼슘 전용</li>
</ul>

<h2>수분 섭취가 핵심</h2>
<p>어떤 결석이든 충분한 수분 섭취가 예방의 기본이다. 처방식 습식을 병행하거나 급수기를 사용해 소변을 묽게 유지하는 것이 가장 중요한 예방이다.</p>

<h2>마지막으로</h2>
<p>요로 처방식은 수의사 처방 없이 임의로 선택하면 오히려 해가 될 수 있다. 결석 종류 확인 후 처방식을 선택하는 것이 필수다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bartges, J.W. & Callens, A.J. — Urolithiasis. Vet Clin North Am 2015",
      "한국수의영양학회 고양이 요로 질환 처방식 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-19T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-617",
    slug: "dog-food-allergy-blood-test-myths",
    type: "blog",
    category: 2,
    title: "강아지 알레르기 혈액 검사 — 믿을 수 있는가",
    subtitle: "알레르기 혈청 검사의 한계, 제거 식이가 유일한 진단, 검사 남용 문제",
    metaTitle: "강아지 알레르기 혈액 검사 신뢰성 — 진단의 한계와 올바른 방법 | 펫지기",
    metaDescription: "강아지 식이 알레르기 혈액 검사의 한계를 정리했습니다. 혈청 검사 신뢰성 문제, 제거 식이가 유일한 확진 방법인 이유, 올바른 알레르기 진단 방법을 알아보세요.",
    body: `<p>강아지 알레르기 검사를 받고 "닭고기·쌀·고구마에 알레르기" 결과를 받았다. 이것을 믿고 사료를 바꿔야 할까? 답은 '반드시 그렇지 않다'이다.</p>

<h2>혈청 알레르기 검사의 문제</h2>
<p>식이 알레르기를 진단하는 혈청 IgE 검사는 피부과 전문의들 사이에서도 신뢰성 논란이 있다. 연구에 따르면 혈청 검사 양성 반응이 실제 임상 알레르기와 일치하는 비율이 50% 이하인 경우도 있다.</p>

<h2>왜 신뢰하기 어려운가</h2>
<div class="callout-dog">
<strong>혈청 알레르기 검사 한계</strong><br>
• 식이 알레르기는 IgE보다 T세포 매개가 주요 기전 — IgE 검사와 불일치<br>
• 위양성 높음 — 실제로 먹어도 반응 없는 식품이 양성 나옴<br>
• 결과 해석 기준 표준화 부족<br>
• 비용 대비 임상적 유용성 불명확
</div>

<h2>유일하게 신뢰되는 진단: 제거 식이</h2>
<p>식이 알레르기의 진단 표준(Gold Standard)은 제거 식이 + 유발 검사다. 8~12주 동안 가수분해 또는 신단백질 식이 → 증상 개선 확인 → 기존 식이로 재유발 시 증상 재현.</p>

<h2>혈청 검사가 유용한 경우</h2>
<ul>
<li>환경 알레르겐 특이 면역요법(ASIT) 대상 선정 시</li>
<li>피부과 전문 수의사가 환경 알레르기 평가 목적으로 사용</li>
</ul>

<h2>마지막으로</h2>
<p>혈청 검사 결과를 받았다면 수의 피부과 전문의와 상담해 의미를 해석하는 것이 좋다. 검사 결과만으로 식이를 완전히 바꾸는 것은 근거가 부족하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bethlehem, S. et al. — Evaluation of a commercial lymphocyte transformation test for the diagnosis of adverse food reactions in dogs. J Small Anim Pract 2012",
      "한국수의피부학회 식이 알레르기 진단 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-19T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-618",
    slug: "cat-felv-management-guide",
    type: "blog",
    category: 3,
    title: "고양이 FeLV(백혈병 바이러스) — 진단 후 알아야 할 것",
    subtitle: "FeLV 전파 경로, 예후, FIV와의 차이, 관리 방법, 다묘 가정 위험",
    metaTitle: "고양이 FeLV(백혈병 바이러스) — 전파·예후·관리·다묘 가정 가이드 | 펫지기",
    metaDescription: "고양이 FeLV(고양이 백혈병 바이러스) 진단 후 알아야 할 것들. FIV와의 차이, 전파 경로, 예후와 수명, 다묘 가정 위험도, 관리 방법을 정리했습니다.",
    body: `<p>FeLV(고양이 백혈병 바이러스)는 FIV보다 예후가 나쁜 경우가 많지만, 진단이 선고는 아니다.</p>

<h2>FeLV란</h2>
<p>레트로바이러스로, 주로 고양이 간 친밀한 접촉(그루밍·물기·공유 밥그릇·배설물)으로 전파된다. FIV보다 전파 가능성이 높다. 면역 억제 외에 림프종·빈혈 등 직접적인 질환을 유발한다.</p>

<h2>FIV와의 차이</h2>
<table>
<thead><tr><th>구분</th><th>FeLV</th><th>FIV</th></tr></thead>
<tbody>
<tr><td>전파</td><td>일상 접촉 가능</td><td>주로 깊은 물림</td></tr>
<tr><td>예후</td><td>상대적으로 나쁨</td><td>관리하면 정상에 가까움</td></tr>
<tr><td>백신</td><td>있음 (효과 있음)</td><td>국내 미승인</td></tr>
<tr><td>주요 합병증</td><td>림프종·빈혈</td><td>이차 감염</td></tr>
</tbody>
</table>

<h2>예후 현실</h2>
<div class="callout-cat">
<strong>FeLV 감염 결과</strong><br>
• 일시 감염 후 자연 제거: 일부 고양이에서 가능<br>
• 지속 감염: 대부분 진행, 평균 2~3년 생존<br>
• 잠복 감염: 수년간 증상 없이 지낼 수 있음<br>
▶ 개별 고양이마다 차이 큼 — 포기하지 말고 수의사와 상담
</div>

<h2>관리 방법</h2>
<ul>
<li>완전 실내 생활 (이차 감염·다른 고양이 전파 방지)</li>
<li>3개월마다 혈액 검사·건강 검진</li>
<li>예방 가능한 감염 차단 (정기 예방접종 유지)</li>
<li>고영양 식이 (면역 지원)</li>
</ul>

<h2>다묘 가정</h2>
<p>FeLV 양성 고양이는 음성 고양이와 격리하거나, 다른 고양이에게 FeLV 백신 접종이 필요하다.</p>

<h2>마지막으로</h2>
<p>FeLV 진단이 어렵다는 것은 안다. 그러나 많은 FeLV 양성 고양이가 진단 후에도 수년을 잘 산다. 충분한 지원과 관리가 삶의 질을 결정한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Hartmann, K. — Feline leukemia virus disease. Vet Clin North Am 2012",
      "한국고양이수의사회 FeLV 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-20T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-619",
    slug: "cat-toxic-indoor-plants-list",
    type: "blog",
    category: 5,
    title: "고양이에게 독성인 실내 식물 — 인테리어 전에 확인해야 할 목록",
    subtitle: "고독성·중독성·저독성 식물 분류, 중독 증상, 안전한 대체 식물",
    metaTitle: "고양이 독성 실내 식물 — 고독성·중독성·안전 식물 완전 목록 | 펫지기",
    metaDescription: "고양이에게 독성인 실내 식물을 정리했습니다. 백합·몬스테라·포인세티아 등 고독성 식물, 중독 증상, 고양이와 함께해도 안전한 대체 식물을 알아보세요.",
    body: `<p>예쁜 실내 식물이 고양이에게 치명적일 수 있다. 고양이가 어떤 식물이든 입에 넣는 경우가 있으므로, 미리 확인하는 것이 중요하다.</p>

<h2>고독성 식물 (즉시 응급)</h2>
<div class="callout-cat">
<strong>고양이 치명적 독성 식물</strong><br>
• <strong>백합(Lily) 전체 종류</strong>: 극소량으로도 신부전 유발 — 즉시 응급<br>
• <strong>협죽도(Oleander)</strong>: 심장 독성<br>
• <strong>대황(Rhubarb)</strong>: 신장 독성<br>
• <strong>아이비(포도 Hedera)</strong>: 구토·설사·피부 자극<br>
• <strong>딥라도레나·절란(Dieffenbachia)</strong>: 구강·소화기 자극
</div>

<h2>중독성 식물 (소량 섭취 시 불쾌감)</h2>
<ul>
<li>몬스테라·필로덴드론: 구강 자극·구토</li>
<li>포인세티아: 경미한 소화기 자극</li>
<li>알로에 베라: 구토·설사</li>
<li>스파티필름(Peace Lily): 구강 자극</li>
<li>선인장: 가시 상처 위험</li>
</ul>

<h2>안전한 대체 식물</h2>
<ul>
<li>스파이더 플랜트 (Spider Plant): 가장 안전한 실내 식물 중 하나</li>
<li>마란타 (Prayer Plant): 안전</li>
<li>에어플랜트 (Tillandsia): 안전</li>
<li>캣그라스 (고양이 풀): 고양이 전용 — 무해하고 즐겨 먹음</li>
</ul>

<h2>중독 증상 발생 시</h2>
<ul>
<li>식물 이름 확인 즉시</li>
<li>ASPCA 동물 독성 데이터베이스(aspca.org) 확인</li>
<li>즉시 동물병원 또는 동물 중독 상담 전화</li>
</ul>

<h2>마지막으로</h2>
<p>특히 백합은 화분뿐 아니라 꽃다발로 집에 들어오는 경우가 있다. 고양이가 있는 가정에 백합 반입은 생명을 위협할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ASPCA Animal Poison Control — Toxic and Non-Toxic Plants for Cats",
      "한국수의응급의학회 식물 중독 임상 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-20T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-620",
    slug: "pet-food-recall-response-guide",
    type: "blog",
    category: 4,
    title: "사료 리콜 시 대처 방법 — 먹이던 사료가 리콜됐을 때",
    subtitle: "국내 리콜 정보 확인 경로, 즉각 조치, 수의사 방문 기준, 환불 청구",
    metaTitle: "사료 리콜 대처 — 국내 확인 경로·즉각 조치·환불 청구 가이드 | 펫지기",
    metaDescription: "반려동물 사료 리콜 정보를 확인하고 대처하는 방법. 국내 리콜 정보 확인 경로, 리콜 사료 먹였을 때 즉각 조치, 수의사 방문 기준, 환불 청구를 정리했습니다.",
    body: `<p>인터넷에서 "내가 먹이는 사료가 리콜됐다"는 소식을 접했다. 어떻게 해야 할까?</p>

<h2>리콜 정보 확인 경로</h2>
<ul>
<li>농림축산검역본부(www.qia.go.kr) — 국내 공식 리콜 정보</li>
<li>FDA(미국): 해외 수입 제품 리콜 정보 (www.fda.gov/animal-veterinary)</li>
<li>제조사 공식 홈페이지·SNS</li>
<li>반려동물 커뮤니티는 확인되지 않은 정보 포함될 수 있음 — 공식 채널로 확인</li>
</ul>

<h2>리콜 사료를 확인하는 방법</h2>
<div class="callout-dog">
<strong>내 제품 리콜 여부 확인</strong><br>
• 제품명 + 생산 일자 + 로트 번호 확인<br>
• 리콜은 특정 로트(batch)만인 경우가 많음<br>
• 포장 사진과 리콜 대상 조건 대조<br>
• 불확실하면 제조사 고객센터 문의
</div>

<h2>이미 먹였을 때 즉각 조치</h2>
<ul>
<li>즉시 해당 사료 급여 중단</li>
<li>남은 사료 밀봉 보관 (증거 보존)</li>
<li>리콜 원인 확인 (세균·독소·이물질 등)</li>
<li>강아지·고양이 이상 증상 모니터링 24~72시간</li>
</ul>

<h2>수의사 방문 기준</h2>
<ul>
<li>구토·설사·혈변·무기력 발생 시 즉시 방문</li>
<li>살모넬라·아플라톡신 등 심각한 오염이면 증상 없어도 방문 권장</li>
<li>방문 시 리콜 정보와 섭취 기간 알리기</li>
</ul>

<h2>환불·손해배상</h2>
<ul>
<li>구매처 또는 제조사에 환불 요청 (영수증·포장 보존)</li>
<li>치료비 발생 시 진단서와 함께 손해배상 청구 가능</li>
<li>한국소비자원 피해구제 접수 가능</li>
</ul>

<h2>마지막으로</h2>
<p>리콜은 안전을 위한 조치다. 공식 확인 없이 커뮤니티 소식만으로 패닉하지 말고, 공식 경로에서 확인하는 것이 먼저다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "농림축산검역본부 반려동물 사료 안전관리 안내",
      "한국소비자원 반려동물 용품 피해구제 절차 안내",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-21T09:00:00.000Z",
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
  console.log("블로그 포스트 99차 시딩 완료! (blog-616 ~ blog-620)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
