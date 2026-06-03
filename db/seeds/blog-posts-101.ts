import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 101 — cat3×2 + cat4×1 + cat2×1 + cat1×1 = 5편 (IDs 626-630)
// Macros: A, D, F, B, G
// Angles: RA1, RA2, RA1, RA3, RA5

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-626",
    slug: "dog-grass-seed-foxtail-danger",
    type: "blog",
    category: 3,
    title: "산책 중 풀 씨앗 위험 — 강아지 귀·발에 박히는 여우꼬리풀",
    subtitle: "풀 씨앗(foxtail) 종류, 침투 경로, 증상, 산책 후 확인 방법",
    metaTitle: "강아지 풀 씨앗(여우꼬리) 위험 — 침투·증상·예방 가이드 | 펫지기",
    metaDescription: "강아지 산책 중 풀 씨앗이 귀·발에 박히는 위험. 여우꼬리풀 씨앗의 특성, 침투 경로, 내부 이동 증상, 산책 후 확인 방법을 정리했습니다.",
    body: `<p>봄~여름 산책 후 강아지가 갑자기 귀를 긁거나, 발을 핥거나, 재채기를 반복한다면 풀 씨앗이 박혔을 가능성이 있다.</p>

<h2>왜 위험한가</h2>
<p>여우꼬리풀(foxtail) 등 특정 풀의 씨앗은 역방향으로만 움직이는 구조를 가진다. 한번 들어가면 스스로 빠져나오지 않고 오히려 조직 안으로 더 깊이 파고든다. 귀에서 내이·뇌 방향으로, 발에서 다리 안으로 이동할 수 있다.</p>

<h2>주요 침투 경로와 증상</h2>
<table>
<thead><tr><th>침투 부위</th><th>증상</th></tr></thead>
<tbody>
<tr><td>귀</td><td>갑작스러운 머리 흔들기·귀 긁기·머리 기울임</td></tr>
<tr><td>발</td><td>한쪽 발 반복 핥기·붓기·누름 고통</td></tr>
<tr><td>코</td><td>갑작스러운 격렬한 재채기</td></tr>
<tr><td>눈</td><td>눈 비비기·눈물·분비물</td></tr>
<tr><td>피부(어디든)</td><td>작은 구멍·농양 형성</td></tr>
</tbody>
</table>

<h2>산책 후 확인 루틴</h2>
<div class="callout-dog">
<strong>풀밭 산책 후 체크리스트</strong><br>
• 귀: 귀 내부 육안 확인<br>
• 발가락 사이: 각 발가락 사이 섬세하게 확인<br>
• 코 주변·눈 주변<br>
• 겨드랑이·서혜부 (긴 털 가진 강아지)<br>
• 털이 긴 강아지는 귀가 후 전신 빗질 필수
</div>

<h2>발견 시 처치</h2>
<ul>
<li>피부 밖으로 보이는 씨앗: 핀셋으로 즉시 제거</li>
<li>귀·코·눈에 들어간 경우: 집에서 꺼내려 하지 말 것 → 즉시 수의사</li>
<li>농양 형성 시: 항생제 + 수술적 제거</li>
</ul>

<h2>마지막으로</h2>
<p>여름 풀밭 산책 후 10분의 확인 루틴이 수술을 막을 수 있다. 특히 귀에 들어간 경우 빨리 처치할수록 간단하게 해결된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국수의응급의학회 이물질 침투 임상 가이드라인",
      "Calia, C. et al. — Grass awns as a cause of lung abscess in a dog. J Small Anim Pract 2004",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-24T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-627",
    slug: "cat-vaccine-sarcoma-guide",
    type: "blog",
    category: 3,
    title: "고양이 주사 유발 육종 — 예방접종 맞은 자리에 혹이 생겼다면",
    subtitle: "주사 유발 육종 특성, 발생 빈도, 예방 접종 vs 위험 균형, 발견 시 대처",
    metaTitle: "고양이 주사 유발 육종 — 예방접종 부위 혹 발견 시 가이드 | 펫지기",
    metaDescription: "고양이 예방접종 맞은 자리에 혹이 생겼을 때 알아야 할 것. 주사 유발 육종 특성, 발생 빈도, 예방 접종 계속해야 하는 이유, 발견 시 즉각 조치를 정리했습니다.",
    body: `<p>고양이 예방접종 부위에 혹이 생겼다. 모든 혹이 주사 유발 육종은 아니지만, 반드시 확인이 필요하다.</p>

<h2>주사 유발 육종이란</h2>
<p>주사 부위에 발생하는 악성 종양(주로 섬유육종)이다. 과거 어깨 접종 부위에서 주로 발생했으나 현재는 접종 부위 분산(등 하부·다리)으로 변경됐다.</p>

<h2>발생 빈도</h2>
<p>약 1만~10만 접종 당 1건으로 매우 드물다. 그러나 발생 시 예후가 매우 나쁜 악성 종양이다. "드물지만 심각하다"는 특성으로 지속적인 모니터링이 필요하다.</p>

<h2>2-2-2 규칙</h2>
<div class="callout-cat">
<strong>접종 후 혹 모니터링 2-2-2 규칙</strong><br>
• 접종 후 2개월 이상 지속되는 혹<br>
• 2cm 이상 크기<br>
• 점점 커지는 혹<br>
▶ 위 3가지 중 하나라도 해당하면 즉시 수의사 방문 + FNA 검사
</div>

<h2>예방 접종 계속해야 하는 이유</h2>
<p>주사 유발 육종의 위험보다 예방접종을 맞지 않았을 때 범백혈구 감소증·상부 호흡기 감염으로 사망할 위험이 훨씬 크다. 위험보다 이점이 크다는 것이 현재 수의학 컨센서스다.</p>

<h2>예방 접종 후 확인 습관</h2>
<ul>
<li>접종 후 1개월, 3개월 접종 부위 만져보기</li>
<li>정상: 2~3주 내 사라지는 작은 결절</li>
<li>이상: 1개월 이상 지속·성장 → 즉시 방문</li>
</ul>

<h2>마지막으로</h2>
<p>주사 유발 육종은 예방접종을 두려워할 이유가 아니다. 모니터링하는 습관을 만드는 이유다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Hartmann, K. & Day, M.J. — Vaccination guidelines for cats: WSAVA guidelines. J Feline Med Surg 2015",
      "한국수의종양학회 주사 유발 육종 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-24T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-628",
    slug: "domestic-pet-travel-regulations",
    type: "blog",
    category: 4,
    title: "국내 반려동물 여행 법규 — 기차·버스·택시 반려동물 동반 규정",
    subtitle: "대중교통 반려동물 규정, 숙박 반려동물 동반 법규, 카페·식당 입장 규정",
    metaTitle: "국내 반려동물 여행 법규 — 대중교통·숙박·카페 규정 완전 가이드 | 펫지기",
    metaDescription: "국내 반려동물 여행 시 알아야 할 법규. 기차·버스·택시 반려동물 동반 규정, 숙박 법규, 카페·음식점 입장 관련 규정을 정리했습니다.",
    body: `<p>반려동물과 국내 여행을 계획할 때 대중교통·숙박·식당 규정을 미리 파악하면 불필요한 분쟁을 피할 수 있다.</p>

<h2>대중교통 규정</h2>
<ul>
<li><strong>기차(KTX·일반)</strong>: 케이지에 넣어 좌석 발치 또는 짐칸. 반려동물 전용칸 일부 운행. 코레일 사전 예약.</li>
<li><strong>고속버스·시외버스</strong>: 대부분 반려동물 탑승 불허. 소형 이동장 업체에 따라 허용.</li>
<li><strong>택시</strong>: 법적으로 거부 불가하나 기사 동의 권장. 분쟁 시 국토교통부 신고.</li>
<li><strong>지하철</strong>: 이동장 내 소형 반려동물 탑승 허용 (혼잡 시간 제한).</li>
</ul>

<h2>숙박 규정</h2>
<div class="callout-dog">
<strong>반려동물 동반 숙박</strong><br>
• 숙박업 법령상 반려동물 동반 허용을 강제하는 규정 없음<br>
• 업주 재량으로 허용·불허 결정<br>
• 펫프렌들리 숙소 사전 확인 필수<br>
• 반려동물 객실 내 파손 시 업주 손해배상 청구 가능
</div>

<h2>카페·음식점</h2>
<ul>
<li>식품위생법: 동물은 식품 제조·조리·판매 장소 입장 금지가 원칙</li>
<li>야외 테라스: 식품 제조 구역 아니면 업주 재량 허용 가능</li>
<li>반려동물 동반 카페: 별도 허가 또는 식품 제조 구역 분리된 경우</li>
<li>입장 전 확인 필수</li>
</ul>

<h2>마지막으로</h2>
<p>반려동물 동반 여행은 점점 편해지고 있지만, 모든 곳에서 환영받지는 않는다. 사전 확인과 다른 사람을 배려하는 태도가 반려동물 동반 문화를 더 넓히는 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "국토교통부 여객자동차 운수사업법 반려동물 관련 지침",
      "농림축산식품부 반려동물 동반 여행 인프라 조성 계획",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-25T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-629",
    slug: "senior-dog-kidney-preventive-diet",
    type: "blog",
    category: 2,
    title: "노령견 신장 예방 식이 — 신부전 전에 미리 할 수 있는 것",
    subtitle: "노령견 신장 기능 저하 기전, 예방적 식이 조정, 수분 섭취 극대화",
    metaTitle: "노령견 신장 예방 식이 — 신부전 전 미리 하는 식이 관리 | 펫지기",
    metaDescription: "노령견 신장 기능을 보호하는 예방 식이 방법. 신장 기능 저하 기전, 인 제한 시작 시점, 수분 섭취 극대화, 정기 검진의 중요성을 정리했습니다.",
    body: `<p>많은 보호자가 신부전 진단을 받고 나서야 식이 관리를 시작한다. 그러나 신장은 한번 손상되면 회복이 어렵다 — 예방이 훨씬 중요하다.</p>

<h2>노령견 신장 기능 저하 기전</h2>
<p>나이가 들수록 신장 세포는 자연적으로 감소한다. 인 과다·탈수·만성 염증이 이 과정을 가속화한다. 신장 기능의 75%가 손상될 때까지 혈액 검사가 정상으로 나오는 경우가 있다.</p>

<h2>예방 식이의 핵심 — 인 제한</h2>
<div class="callout-dog">
<strong>신장 보호 식이 핵심</strong><br>
• 인(Phosphorus): 신장 손상 가속화의 주요 요인<br>
• CKD 진단 전 예방적 저인 식이 권장 (건물 기준 0.6% 이하)<br>
• 고단백 사료의 인 함량 확인 필요<br>
• 인 결합제: 수의사 처방 후 사료에 혼합 가능
</div>

<h2>수분 섭취 극대화</h2>
<ul>
<li>습식 사료 비율 높이기 (신장 부담 감소)</li>
<li>흐르는 물 급수기 설치</li>
<li>닭고기 무염 육수 소량 첨가</li>
<li>여름철 수분 섭취 특히 강조</li>
</ul>

<h2>정기 검진의 중요성</h2>
<ul>
<li>7세 이상 강아지: 연 2회 혈액·소변 검사 권장</li>
<li>SDMA(대칭 디메틸아르기닌): 크레아티닌보다 조기에 신장 손상 감지 가능</li>
<li>초기 발견 → 더 많은 개입 가능</li>
</ul>

<h2>마지막으로</h2>
<p>신부전 예방의 가장 좋은 방법은 정기 검진으로 조기에 발견하고, 충분한 수분과 적절한 인 제한으로 진행을 늦추는 것이다. 지금 7세가 넘은 강아지를 키운다면 시작할 때다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "IRIS — Chronic Kidney Disease in Dogs: Staging and Treatment 2023",
      "한국수의내과학회 신장 예방 식이 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-25T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-630",
    slug: "pet-adoption-scam-prevention",
    type: "blog",
    category: 1,
    title: "반려동물 입양 사기 예방 — '선금 보내면 강아지 배송' 사기 유형",
    subtitle: "온라인 입양 사기 5가지 유형, 사기 신호 체크리스트, 피해 시 신고 방법",
    metaTitle: "반려동물 입양 사기 예방 — 온라인 사기 유형과 신호 체크리스트 | 펫지기",
    metaDescription: "반려동물 온라인 입양 사기 유형과 예방 방법. 선금 요구·배송 사기·가짜 브리더 5가지 유형, 사기 신호 체크리스트, 피해 시 신고 방법을 정리했습니다.",
    body: `<p>반려동물 사기가 증가하고 있다. 귀여운 강아지 사진에 마음이 동하기 전에 사기 신호를 먼저 확인하는 것이 필요하다.</p>

<h2>주요 사기 유형 5가지</h2>
<ul>
<li><strong>선금 배송 사기</strong>: "강아지 배송비 선납해야 함" → 입금 후 잠적</li>
<li><strong>가짜 브리더</strong>: 유명 브리더 사진·이름 도용, 직접 방문 거부</li>
<li><strong>무료 입양 후 추가 비용</strong>: "무료 입양"이라더니 배송·수의비·관세 명목 반복 요구</li>
<li><strong>과금 사기</strong>: 허가 없는 업체가 전문 업체인 척</li>
<li><strong>SNS 허위 판매</strong>: 실제 없는 강아지 사진으로 계약금 수령</li>
</ul>

<h2>사기 신호 체크리스트</h2>
<div class="callout-dog">
<strong>이런 경우 의심하라</strong><br>
□ 가격이 지나치게 저렴<br>
□ 직접 방문 불가, 배송만 가능<br>
□ 부모견 사진 제공 거부<br>
□ 현금·계좌이체만 가능 (카드 거부)<br>
□ 급하게 결정 압박 ("오늘 안에 입금 안 하면 다른 분에게")<br>
□ 수의 기록·혈통서 제공 거부
</div>

<h2>안전한 입양 방법</h2>
<ul>
<li>반드시 직접 방문 (강아지 실물 확인)</li>
<li>동물등록 번호로 APMS에서 확인</li>
<li>계약서 서면 작성</li>
<li>이상한 느낌이 든다면 거래 중단</li>
</ul>

<h2>피해 신고</h2>
<ul>
<li>경찰 사이버수사대 (cyberbureau.police.go.kr)</li>
<li>한국소비자원 소비자 신고센터</li>
<li>관련 플랫폼 신고 (판매자 신고)</li>
</ul>

<h2>마지막으로</h2>
<p>합리적 의심이 사기를 막는다. "설마 사기일까"가 아니라 "확인하고 나서 입양하자"가 올바른 태도다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국소비자원 반려동물 거래 피해 분석 2023",
      "경찰청 사이버범죄 신고 안내",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-26T09:00:00.000Z",
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
  console.log("블로그 포스트 101차 시딩 완료! (blog-626 ~ blog-630)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
