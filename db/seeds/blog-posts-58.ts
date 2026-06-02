import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 58 — cat5×2 + cat3×1 + cat6×1 + cat2×1 = 5편 (IDs 411-415)
// Macros: F, A, E, B, F
// Angles: RA6, RA2, RA4, RA8, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-411",
    slug: "dog-beach-water-safety-guide",
    type: "blog",
    category: 5,
    title: "강아지와 바다·계곡 물놀이 — 안전하게 즐기기 위한 준비",
    subtitle: "물에 안전한 견종 vs 주의 견종, 익사 위험 신호, 해수 마심·이물 흡입, 귀 물 관리",
    metaTitle: "강아지 바다·계곡 물놀이 안전 가이드 | 펫지기",
    metaDescription: "강아지와 바다·계곡 물놀이 시 안전 주의사항. 익사 위험, 해수 마심, 귀 물 들어감, 구명조끼 필요성, 물 이후 케어를 정리했습니다.",
    body: `<p>강아지와 여름 물놀이는 즐거운 추억이 된다. 그러나 안전 주의사항을 모르면 위험한 상황으로 이어질 수 있다.</p>

<h2>모든 개가 수영을 잘하지는 않는다</h2>
<ul>
<li><strong>수영 잘하는 경향</strong>: 래브라도·골든 리트리버·포르투갈 워터 독·아이리시 세터 — 물과 친한 품종</li>
<li><strong>주의가 필요한 견종</strong>: 단두종(불독·퍼그), 다리가 짧은 견종(닥스훈트·바셋), 소형견 — 체형상 수영이 어렵거나 금방 지침</li>
</ul>

<h2>구명조끼 — 선택이 아닌 필수</h2>
<p>수영을 잘하는 개에게도 구명조끼는 권장된다. 조류가 있는 바다, 깊은 계곡에서 갑작스러운 사고가 생길 수 있다. 밝은 색상의 반려동물 전용 구명조끼를 사용한다.</p>

<h2>익사 위험 신호</h2>
<div class="callout-dog">
<strong>즉시 끌어내야 할 신호</strong><br>
• 패닉 상태로 물을 격렬히 치며 앞으로 나아가지 못함<br>
• 뒷다리가 물속으로 가라앉음<br>
• 코와 입이 수면 아래로<br>
• 물에서 나온 후 기침·헐떡임이 10분 이상 지속
</div>

<h2>해수 마심 주의</h2>
<p>강아지가 바닷물을 마시면 과도한 나트륨 섭취로 소화불량·구토·드물게 전해질 이상이 생긴다. 물에서 나올 때마다 신선한 물을 제공해 해수를 마시지 않도록 한다.</p>

<h2>물놀이 후 케어</h2>
<ul>
<li>귀 세척: 물이 들어가면 중이염 위험. 흡수 솜으로 귀 입구 닦기 + 이어 드라이어 사용 가능.</li>
<li>완전 건조: 털 사이까지 완전 건조. 젖은 상태로 자면 피부 문제 생길 수 있음.</li>
<li>발바닥 확인: 자갈·산호 조각으로 상처 가능.</li>
<li>기생충 확인: 자연 수계 후 기생충 노출 가능성.</li>
</ul>

<h2>마지막으로</h2>
<p>물놀이는 강아지에게 최고의 여름 경험이 될 수 있다. 구명조끼 착용, 눈을 떼지 않는 감시, 물놀이 후 완전 건조 — 이 세 가지로 대부분의 위험을 예방할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Kennel Club — Water Safety for Dogs",
      "Veterinary Partner — Water Intoxication and Salt Toxicity in Dogs",
      "한국반려동물협회 물놀이 안전 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-08T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-412",
    slug: "catio-outdoor-cat-enclosure-guide",
    type: "blog",
    category: 5,
    title: "캐티오(Catio) 만들기 — 실내 고양이에게 안전한 실외 경험 주기",
    subtitle: "캐티오 종류와 비용, 베란다 그물망 설치 방법, DIY vs 전문 설치 비교",
    metaTitle: "캐티오 만들기 가이드 — 베란다 그물망·DIY·설치 방법 | 펫지기",
    metaDescription: "고양이를 위한 캐티오(실외 인클로저) 만드는 방법. 종류와 비용, 베란다 그물망 설치, DIY 방법과 전문 설치 비교를 정리했습니다.",
    body: `<p>캐티오(Catio)는 고양이가 안전하게 실외 환경을 경험할 수 있는 그물망 인클로저다. 실내 전용 고양이에게 바깥 공기와 햇볕, 자연의 소리를 즐길 수 있는 공간을 만들어준다.</p>

<h2>캐티오 종류</h2>
<ul>
<li><strong>창문형</strong>: 창문에 부착하는 박스형 캐티오. 소형·저비용. 창문을 열면 고양이가 드나들 수 있음.</li>
<li><strong>베란다형</strong>: 베란다 전체를 그물망으로 둘러싸는 방식. 가장 많은 공간.</li>
<li><strong>독립형 (정원)</strong>: 마당이나 옥상에 독립 구조물. 가장 이상적이지만 공간 필요.</li>
<li><strong>터널형</strong>: 집 내부와 연결된 터널이 외부 인클로저로 이어지는 형태.</li>
</ul>

<h2>베란다 그물망 — 가장 현실적인 선택</h2>
<p>한국 아파트 거주자에게 가장 실용적이다. 베란다 전체를 반려동물용 안전 그물로 씌우는 방식이다.</p>

<div class="callout-cat">
<strong>베란다 그물망 설치 체크리스트</strong><br>
• 그물 메쉬 크기: 고양이 발이 통과하지 못하는 크기 (4cm 이하 권장)<br>
• 소재: UV 차단·방수 처리된 PE 소재<br>
• 고정: 앙카볼트·결속줄로 확실히 고정<br>
• 문 설치: 화분·청소 등 접근용 작은 문 포함<br>
• 전문 업체 시공: 20~50만 원 / DIY: 재료비 10~20만 원
</div>

<h2>안전 주의사항</h2>
<ul>
<li>그물 고정 상태 월 1회 점검 (끊어짐·풀림 확인)</li>
<li>그물과 벽 사이 틈새 없는지 확인</li>
<li>그늘 공간 제공 (직사광선 폭염 주의)</li>
<li>물그릇 설치 (실외에서 더 많이 마심)</li>
</ul>

<h2>마지막으로</h2>
<p>캐티오는 실내 고양이의 삶의 질을 크게 높이는 투자다. 바람·소리·냄새를 느끼고 새를 관찰하는 경험은 어떤 장난감도 대체할 수 없다. 베란다가 있다면 그물망 하나로 고양이에게 작은 세상을 만들어줄 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "International Cat Care — Providing Outdoor Access Safely",
      "Catio Spaces — Design and Installation Guide",
      "한국고양이보호협회 실외 경험 안전 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-09T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-413",
    slug: "cat-diabetes-management-guide",
    type: "blog",
    category: 3,
    title: "고양이 당뇨 — 진단 후 집에서 관리하는 방법",
    subtitle: "인슐린 투여 방법, 저혈당 응급 대처, 혈당 모니터링, 식이 관리",
    metaTitle: "고양이 당뇨 관리 — 인슐린 투여·혈당 모니터링·식이 | 펫지기",
    metaDescription: "고양이 당뇨 진단 후 집에서 관리하는 방법. 인슐린 투여, 저혈당 응급 대처, 혈당 모니터링, 저탄수화물 식이를 정리했습니다.",
    body: `<p>고양이 당뇨 진단은 처음엔 막막하다. 매일 인슐린 주사, 식이 관리, 혈당 모니터링 — 그러나 많은 보호자가 익숙해지고, 일부 고양이는 관리로 당뇨가 완화되기도 한다.</p>

<h2>고양이 당뇨의 특성</h2>
<p>고양이 당뇨는 대부분 제2형(인슐린 저항성)이다. 비만·저활동성·고탄수화물 식이가 주요 위험 인자다. 중성화 수컷에서 발생률이 높다.</p>

<h2>인슐린 투여 방법</h2>
<ol>
<li>인슐린 바이알을 손바닥 사이에서 부드럽게 굴리기 (흔들지 않음)</li>
<li>주사기에 처방된 용량 정확히 채우기</li>
<li>목덜미 또는 어깨 옆 피하 조직을 집어 올리기</li>
<li>45도 각도로 빠르게 삽입 → 서서히 주입</li>
<li>밥을 먹은 직후 투여 (공복 시 저혈당 위험)</li>
</ol>

<h2>저혈당 응급 대처</h2>
<div class="callout-cat">
<strong>저혈당 증상 및 대처</strong><br>
• 증상: 무기력·떨림·비틀거림·발작<br>
• 즉시: 잇몸에 꿀·시럽을 소량 바름 (삼키지 않아도 됨)<br>
• 2~5분 내 개선되면 소량 음식 제공<br>
• 개선 없으면 즉시 응급 병원
</div>

<h2>가정 혈당 모니터링</h2>
<p>당뇨 고양이 관리에서 가장 큰 변화 — 집에서 혈당을 측정하는 보호자가 늘고 있다. 귀 안쪽 또는 발바닥에서 채혈하는 방법을 수의사에게 배울 수 있다. 측정 데이터는 인슐린 용량 조정에 매우 유용하다.</p>

<h2>식이 관리</h2>
<ul>
<li><strong>저탄수화물·고단백 식이</strong>: 상업용 건식 사료의 탄수화물을 줄이기 위해 습식 비중을 높임</li>
<li><strong>당뇨 처방식</strong>: 수의사 처방 저탄수화물 처방 사료</li>
<li>간식 제한: 당분 많은 간식 금지</li>
<li>식사 시간 규칙화: 인슐린 투여와 식사 타이밍 일치</li>
</ul>

<h2>당뇨 완화(Diabetic Remission)</h2>
<p>일부 고양이에서 철저한 식이·인슐린 관리로 수개월 내 당뇨가 완화되어 인슐린이 필요 없게 되는 경우가 있다. 특히 초기 진단에서 저탄수화물 식이를 시작한 경우 완화율이 높다.</p>

<h2>마지막으로</h2>
<p>당뇨 진단은 보호자에게도 고양이에게도 도전이다. 그러나 적절히 관리된 당뇨 고양이는 좋은 삶의 질을 오래 유지할 수 있다. 첫 2~4주가 가장 어렵고, 이후엔 루틴이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Rand, J.S. — Feline Diabetes Mellitus. Kirk's Current Veterinary Therapy 2014",
      "한국고양이수의사회 당뇨 임상 관리 가이드라인",
      "International Society of Feline Medicine — Feline Diabetes Guidelines",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-09T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-414",
    slug: "pet-ashes-memorial-keepsake-ideas",
    type: "blog",
    category: 6,
    title: "반려동물 유골 보관 아이디어 — 유골함부터 기념 주얼리까지",
    subtitle: "유골함 종류·소재, 유골 보석·유리 제작 서비스, 집 보관 방법, 심리적 의미",
    metaTitle: "반려동물 유골 보관 방법 — 유골함·보석·아이디어 가이드 | 펫지기",
    metaDescription: "반려동물 유골 보관 방법. 유골함 종류와 소재, 유골 보석·유리 기념품 제작 서비스, 집에서 보관하는 방법과 심리적 의미를 정리했습니다.",
    body: `<p>반려동물 화장 후 유골을 어떻게 보관하고 기억할지는 매우 개인적인 선택이다. 어떤 방식이든 그 존재와의 연결을 이어가는 의미가 있다.</p>

<h2>유골함 선택</h2>
<h3>소재별 특징</h3>
<ul>
<li><strong>세라믹·도자기</strong>: 아름다운 외관, 내구성 좋음, 가장 일반적</li>
<li><strong>나무</strong>: 자연스러운 감촉, 맞춤 조각 가능</li>
<li><strong>금속(황동·알루미늄)</strong>: 내구성 최고, 간결한 디자인</li>
<li><strong>생분해 유골함</strong>: 수목장·자연장 목적, 땅에 묻으면 자연 분해</li>
</ul>

<h2>유골을 이용한 기념품 서비스</h2>
<div class="callout-cat">
<strong>국내 가능한 서비스</strong><br>
• <strong>유리 기념품</strong>: 유골 일부를 유리 안에 넣어 구형·하트형 등 제작<br>
• <strong>유골 보석</strong>: 화학 처리로 다이아몬드·루비 등 보석화. 반지·목걸이 제작 가능.<br>
• <strong>유골 메모리얼 아트</strong>: 유골과 물감을 혼합해 초상화·추상화 제작<br>
• <strong>유골 문신</strong>: 일부 타투이스트가 유골 잉크를 사용 (해외 주로, 국내 일부)
</div>

<h2>집에서 보관할 때</h2>
<ul>
<li>직사광선·습기가 없는 서늘한 곳 보관</li>
<li>유골함에 이름·생몰 날짜 라벨링</li>
<li>작은 추모 공간(사진·꽃·촛불)과 함께 배치</li>
<li>법적 제약 없음 — 자택 보관은 개인 자유</li>
</ul>

<h2>유골 일부를 여러 방식으로 나누는 것</h2>
<p>대부분의 유골은 화장 후 150~200g 정도다. 일부를 유골함에 보관하고, 나머지를 기념품 제작에 사용하거나 산·바다에 뿌리는 방식으로 나눌 수 있다. 가족과 함께 결정하면 공유된 추모가 된다.</p>

<h2>심리적 의미</h2>
<p>유골을 곁에 두는 것에 대해 '집착'이라는 시선이 있다. 그러나 심리학적으로 추모 물건을 갖는 것은 슬픔 처리에 도움이 되는 정상적인 행동이다. 언제까지 보관할지, 어떻게 처리할지는 오직 보호자가 결정한다.</p>

<h2>마지막으로</h2>
<p>유골 보관 방식에는 정해진 것이 없다. 가장 의미 있는 방식이 가장 좋은 방식이다. 시간이 지나면서 생각이 바뀔 수도 있다 — 그것도 괜찮다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Worden, J.W. — Grief Counseling and Grief Therapy (4th ed.)",
      "한국반려동물기념품협회 유골 기념 서비스 현황",
      "American Kennel Club — Pet Cremation and Urn Choices",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-10T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-415",
    slug: "senior-dog-supplement-guide",
    type: "blog",
    category: 2,
    title: "노령견 보충제 — 무엇이 효과 있고 무엇이 마케팅인가",
    subtitle: "관절·인지·심장·면역 보충제 근거 수준 비교, 복용량·부작용·상호작용 주의사항",
    metaTitle: "노령견 보충제 효과 비교 — 근거 있는 것과 마케팅인 것 | 펫지기",
    metaDescription: "노령견 보충제의 효과와 근거 수준 비교. 글루코사민, 오메가3, SAMe, 코엔자임Q10 등 근거 수준과 복용량, 부작용, 구입 시 주의사항을 정리했습니다.",
    body: `<p>노령견을 위한 보충제 시장은 매우 크다. 모든 제품이 효과가 있지는 않으며, 일부는 과학적 근거가 충분하고 일부는 마케팅이 앞선다.</p>

<h2>근거 수준별 분류</h2>

<h3>근거 수준 높음</h3>
<ul>
<li><strong>오메가3 (EPA+DHA)</strong>: 관절·피부·심장·인지 전반에 항염 효과. 용량: 체중 1kg당 EPA+DHA 50~100mg/일.</li>
<li><strong>SAMe (S-아데노실메티오닌)</strong>: 간 기능 보호·인지 기능 지원. 간 질환 환자에서 수의사가 자주 권장.</li>
</ul>

<h3>근거 수준 중간</h3>
<ul>
<li><strong>글루코사민 + 콘드로이틴</strong>: 관절 연골 보호. 효과 연구 결과가 엇갈리지만 부작용이 적어 널리 사용됨. 용량이 중요 — 작은 간식 형태의 함량으로는 치료 용량에 미달하는 경우 많음.</li>
<li><strong>코엔자임Q10 (CoQ10)</strong>: 심장 에너지 대사 지원. 심장 질환이 있는 노령견에서 보조로 사용.</li>
<li><strong>밀크시슬 (Silymarin)</strong>: 간 세포 보호. 간 수치 상승 시 보조제로 활용.</li>
</ul>

<h3>근거 수준 낮음 또는 마케팅 위주</h3>
<ul>
<li>일부 '젊음 유지' 항산화 복합제 — 성분이 명확하지 않고 임상 연구 부족</li>
<li>과도하게 높은 용량의 비타민A·D — 축적 독성 위험</li>
</ul>

<h2>보충제 구입 주의사항</h2>
<div class="callout-dog">
<strong>신뢰할 수 있는 보충제 기준</strong><br>
• 활성 성분명과 함량이 명확히 표시됨<br>
• 반려동물 전용 또는 수의사 권장 제품<br>
• 제조사 GMP(우수제조기준) 인증<br>
• NASC(National Animal Supplement Council) 품질 인증 (수입 제품)
</div>

<h2>복용 시 주의사항</h2>
<ul>
<li>오메가3: 과다 복용 시 혈액 응고 저하, 항응고제 병용 시 수의사 상담</li>
<li>글루코사민: 혈당에 영향 가능 — 당뇨견은 주의</li>
<li>여러 보충제 동시 복용 시 상호작용 수의사 확인</li>
</ul>

<h2>마지막으로</h2>
<p>보충제는 약물이 아니다. 균형 잡힌 식이와 정기 검진이 더 중요하며, 보충제는 그 위에 추가하는 것이다. 특정 증상 개선을 위해 보충제를 사용할 때는 수의사와 상담해 개체에 맞는 것을 선택하는 것이 안전하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Gruet, P. et al. — Omega-3 fatty acids in dogs: review. BMC Vet Res 2020",
      "한국수의영양학회 노령 동물 보충제 가이드라인",
      "WSAVA Nutritional Assessment for Senior Pets",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-10T11:00:00.000Z",
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
  console.log("블로그 포스트 58차 시딩 완료! (blog-411 ~ blog-415)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
