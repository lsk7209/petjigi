import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 94 — cat3×2 + cat4×1 + cat6×1 + cat1×1 = 5편 (IDs 591-595)
// Macros: D, A, F, E, B
// Angles: RA2, RA7, RA3, RA8, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-591",
    slug: "dog-addison-disease-guide",
    type: "blog",
    category: 3,
    title: "강아지 에디슨 병(부신피질기능저하증) — 쿠싱의 반대, 더 위험할 수 있다",
    subtitle: "에디슨 vs 쿠싱 차이, 에디슨 위기(응급), 진단 검사, 평생 호르몬 보충",
    metaTitle: "강아지 에디슨 병 — 증상·에디슨 위기·진단·호르몬 치료 가이드 | 펫지기",
    metaDescription: "강아지 에디슨 병(부신피질기능저하증) 원인, 증상, 위험한 에디슨 위기, 진단 검사, 평생 호르몬 보충 치료를 정리했습니다.",
    body: `<p>쿠싱 증후군은 부신 호르몬 과다, 에디슨 병은 부신 호르몬 부족이다. 에디슨 병은 덜 알려져 있지만, 위기 상황에서는 수 시간 내 사망에 이를 수 있다.</p>

<h2>에디슨 병이란</h2>
<p>부신에서 코르티솔과 알도스테론(전해질 조절 호르몬)이 충분히 생산되지 않는 질환이다. 대부분 면역 매개성 파괴가 원인이다. 표준 슈나우저·비슷한 품종에서 상대적으로 흔하다.</p>

<h2>증상 — 애매하고 간헐적</h2>
<ul>
<li>무기력·쇠약 (좋아졌다 나빠지는 패턴)</li>
<li>구토·식욕 감소</li>
<li>체중 감소</li>
<li>복통·설사</li>
<li>"The Great Pretender"로 불림 — 증상이 다른 질환과 유사</li>
</ul>

<h2>에디슨 위기(응급)</h2>
<div class="callout-dog">
<strong>에디슨 위기 — 즉시 응급 병원</strong><br>
• 갑작스러운 쇼크·허탈<br>
• 심각한 탈수·전해질 불균형<br>
• 심부정맥 (느리거나 불규칙한 심박)<br>
• 스트레스(수술·여행·질병)가 위기의 방아쇠<br>
▶ 치료 없으면 수 시간 내 사망
</div>

<h2>진단</h2>
<p>ACTH 자극 시험: 코르티솔 반응을 확인하는 가장 정확한 진단법. 전해질(Na:K 비율): 낮은 비율이 에디슨을 지지한다.</p>

<h2>치료</h2>
<ul>
<li>코르티솔 보충: 프레드니솔론 소량 매일 경구</li>
<li>알도스테론 보충: DOCP 주사 1개월마다 또는 플루드로코르티존 경구</li>
<li>스트레스 용량: 수술·질병·여행 시 코르티솔 용량 증가 (반드시 사전 수의사 지시)</li>
</ul>

<h2>마지막으로</h2>
<p>에디슨 병은 진단만 받으면 호르몬 보충으로 완전히 정상 생활이 가능하다. 그러나 진단이 늦어지는 경우가 많다. 증상이 간헐적으로 반복된다면 에디슨 가능성을 염두에 두고 검사를 요청해볼 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Lifton, S.J. et al. — Hypoadrenocorticism causing weakness and collapse in 4 dogs. JAVMA 1996",
      "한국수의내과학회 부신 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-06T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-592",
    slug: "cat-upper-respiratory-infection",
    type: "blog",
    category: 3,
    title: "고양이 상부 호흡기 감염 — 재채기·콧물·눈곱의 원인과 관리",
    subtitle: "허피스바이러스·칼리시바이러스 차이, 만성 재발 관리, 면역 지원",
    metaTitle: "고양이 상부 호흡기 감염 — 허피스·칼리시·증상·관리 가이드 | 펫지기",
    metaDescription: "고양이 상부 호흡기 감염 원인과 관리 방법. 허피스바이러스와 칼리시바이러스 차이, 만성 재발 고양이 관리, 면역 지원, 전파 예방을 정리했습니다.",
    body: `<p>고양이가 재채기를 하고, 투명하거나 노란 콧물이 나오며, 눈이 충혈된다. 고양이 상부 호흡기 감염(URI)은 매우 흔하다.</p>

<h2>주요 원인 바이러스</h2>
<table>
<thead><tr><th>원인</th><th>특징</th><th>재발</th></tr></thead>
<tbody>
<tr><td>허피스바이러스(FHV-1)</td><td>각막 병변 동반, 스트레스 시 재발</td><td>잠복·재발</td></tr>
<tr><td>칼리시바이러스(FCV)</td><td>구강 궤양, 절뚝거림 동반 가능</td><td>만성 보균</td></tr>
<tr><td>보데텔라</td><td>세균성, 특히 어린 고양이</td><td>없음</td></tr>
</tbody>
</table>

<h2>증상</h2>
<ul>
<li>재채기·콧물·코막힘</li>
<li>눈곱·결막 충혈</li>
<li>발열·식욕 감소</li>
<li>허피스: 각막 궤양·눈 분비물 심함</li>
<li>칼리시: 구강 궤양·혀 궤양</li>
</ul>

<h2>만성 재발 관리</h2>
<div class="callout-cat">
<strong>재발성 URI 고양이 관리</strong><br>
• 스트레스 최소화 (URI 재발의 주요 방아쇠)<br>
• 리신(L-Lysine) 보충: 허피스 억제 효과 — 일부 연구 지지, 효과는 제한적<br>
• 눈·코 분비물 따뜻한 물로 닦아주기<br>
• 식욕 감소 시 습식 데워 향 높여서 급여<br>
• 필요 시 항바이러스제(팜시클로버) 수의사 처방
</div>

<h2>전파 예방</h2>
<ul>
<li>다묘 가정에서 감염 고양이 격리</li>
<li>공유 밥그릇·화장실 소독</li>
<li>FVRCP 백신이 예방(허피스·칼리시 포함)</li>
</ul>

<h2>마지막으로</h2>
<p>경미한 URI는 1~2주 내 자연 회복이 가능하다. 그러나 식욕 완전 소실·심한 눈 병변·호흡 곤란이 동반되면 즉시 수의사 방문이 필요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Thiry, E. et al. — Feline herpesvirus infection: ABCD guidelines on prevention and management. J Feline Med Surg 2009",
      "한국고양이수의사회 호흡기 감염 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-07T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-593",
    slug: "pet-boarding-facility-checklist",
    type: "blog",
    category: 4,
    title: "반려동물 위탁 시설 선택 — 여행 전 반드시 확인할 것들",
    subtitle: "위탁 시설 종류, 방문 확인 체크리스트, 법적 신고 여부, 계약서 주의사항",
    metaTitle: "반려동물 위탁 시설 선택 — 방문 확인 체크리스트 완전 가이드 | 펫지기",
    metaDescription: "반려동물 위탁 시설을 올바르게 선택하는 방법. 위탁 시설 종류, 방문 시 확인사항, 신고 여부 확인, 계약서 주의사항을 정리했습니다.",
    body: `<p>여행 중 반려동물을 맡길 때 어떤 기준으로 시설을 선택해야 할까? 잘못 선택하면 여행 내내 마음이 불안하다.</p>

<h2>위탁 시설 종류</h2>
<ul>
<li><strong>전문 위탁 시설(펫호텔)</strong>: 가장 일반적, 집단 또는 개별 공간</li>
<li><strong>도그워커·펫시터</strong>: 집 방문 또는 시터 가정 위탁</li>
<li><strong>지인·가족 위탁</strong>: 가장 스트레스 낮음 (익숙한 사람)</li>
<li><strong>동물병원 위탁</strong>: 의료 필요 동물에게 적합</li>
</ul>

<h2>방문 확인 체크리스트</h2>
<div class="callout-dog">
<strong>위탁 시설 방문 확인 항목</strong><br>
□ 시설 청결도·냄새<br>
□ 직원 반려동물 취급 방식 관찰<br>
□ 개별 공간 vs 합사 공간 여부<br>
□ 실내 환기·온도 관리<br>
□ CCTV 설치·보호자 모니터링 서비스<br>
□ 응급 시 근처 동물병원 연계 여부<br>
□ 예방접종 확인 의무 여부
</div>

<h2>법적 신고 여부 확인</h2>
<p>동물보호법상 반려동물 위탁 서비스를 제공하려면 신고 또는 등록이 필요하다. 농림축산식품부 또는 지자체에 신고된 업체인지 확인하는 것이 안전하다.</p>

<h2>계약서 주의사항</h2>
<ul>
<li>사고·사망 시 배상 조항 확인</li>
<li>질병 발생 시 통보·처리 방법</li>
<li>조기 귀환 시 환불 정책</li>
<li>특별한 먹이·약물 지시사항 전달 방법</li>
</ul>

<h2>마지막으로</h2>
<p>여행 전 최소 한 번 방문과 단기 시범 위탁을 통해 강아지·고양이의 반응을 먼저 확인하는 것이 가장 좋은 선택 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "동물보호법 제34조 (동물 위탁업 신고 기준)",
      "한국소비자원 반려동물 위탁 서비스 소비자 피해 분석 2023",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-07T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-594",
    slug: "pet-quality-of-life-assessment",
    type: "blog",
    category: 6,
    title: "반려동물 삶의 질 평가 — '아직 괜찮은가'를 객관적으로 보는 방법",
    subtitle: "HHHHHMM 스케일 사용법, 좋은 날·나쁜 날 비율, 안락사 결정 참고 도구",
    metaTitle: "반려동물 삶의 질 평가 — HHHHHMM 스케일 사용법 가이드 | 펫지기",
    metaDescription: "반려동물의 삶의 질을 객관적으로 평가하는 방법. HHHHHMM 스케일 사용법, 좋은 날과 나쁜 날 비율 분석, 안락사 결정에 참고하는 방법을 정리했습니다.",
    body: `<p>"아직 괜찮은가, 아니면 이제 놓아줘야 하는가." 이 질문에 객관적인 기준이 있다면 보호자에게 큰 도움이 된다.</p>

<h2>왜 객관적 평가가 필요한가</h2>
<p>사랑하는 존재를 잃고 싶지 않은 마음이 판단을 흐릴 수 있다. 반대로 고통을 더 이상 보고 싶지 않은 마음이 성급한 결정을 만들기도 한다. 객관적 평가 도구가 감정과 판단 사이에서 기준점이 된다.</p>

<h2>HHHHHMM 스케일</h2>
<p>수의 종양학자 앨리스 빌라로보스가 개발한 7가지 항목 평가 도구다. 각 항목을 0~10점으로 평가한다.</p>
<ul>
<li><strong>H</strong>urt(통증): 통증이 조절되고 있는가</li>
<li><strong>H</strong>unger(식욕): 먹고 있는가</li>
<li><strong>H</strong>ydration(수분): 수분 섭취가 충분한가</li>
<li><strong>H</strong>ygiene(위생): 청결을 유지할 수 있는가</li>
<li><strong>H</strong>appiness(행복): 기쁨·관심을 보이는가</li>
<li><strong>M</strong>obility(이동성): 원하는 만큼 움직일 수 있는가</li>
<li><strong>M</strong>ore good days(좋은 날): 나쁜 날보다 좋은 날이 많은가</li>
</ul>

<h2>점수 해석</h2>
<div class="callout-cat">
<strong>HHHHHMM 점수 해석</strong><br>
• 총점 70점 이상: 삶의 질 유지 가능<br>
• 35~70점: 경계 구간 — 주 단위 평가 반복<br>
• 35점 미만: 안락사를 진지하게 고려할 시점<br>
▶ 단, 점수는 참고 도구이지 절대 기준이 아님
</div>

<h2>좋은 날·나쁜 날 달력</h2>
<p>매일 "오늘은 좋은 날인가, 나쁜 날인가"를 달력에 표시한다. 나쁜 날이 좋은 날보다 많아지는 시점이 결정을 고려할 기준점이 된다.</p>

<h2>마지막으로</h2>
<p>이 도구는 결정을 대신해주지 않는다. 그러나 감정이 아닌 상태에 근거한 판단을 도와준다. 수의사와 함께 정기적으로 평가하는 것이 가장 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Villalobos, A.E. — Quality of Life Scale Helps Make Final Call. Veterinary Practice News 2004",
      "한국수의완화의학연구회 삶의 질 평가 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-08T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-595",
    slug: "dog-positive-reinforcement-basics",
    type: "blog",
    category: 1,
    title: "강아지 긍정 강화 훈련 기초 — 왜 칭찬이 체벌보다 효과적인가",
    subtitle: "긍정 강화 원리, 타이밍·일관성·보상 선택, 흔한 훈련 실수",
    metaTitle: "강아지 긍정 강화 훈련 기초 — 원리·타이밍·보상 선택 가이드 | 펫지기",
    metaDescription: "강아지 긍정 강화 훈련의 원리와 실천 방법. 강화 vs 체벌의 과학적 근거, 올바른 타이밍과 보상 선택, 초보 보호자가 자주 하는 실수를 정리했습니다.",
    body: `<p>강아지 훈련에서 체벌이 효과적이라는 인식이 있다. 그러나 과학은 다르게 말한다. 긍정 강화가 더 빠르고, 더 오래 지속되며, 강아지-보호자 관계에 좋다.</p>

<h2>왜 체벌이 역효과인가</h2>
<ul>
<li>체벌은 "무엇을 하면 안 되는지"를 가르치지 않는다 — 공포만 학습</li>
<li>강아지가 보호자를 위협으로 인식 → 두려움 기반 행동 악화</li>
<li>2009년 이후 수십 개 연구: 체벌 훈련은 공격성·스트레스 증가와 연관</li>
</ul>

<h2>긍정 강화의 원리</h2>
<p>원하는 행동 → 즉시 좋은 것(보상) → 행동 반복 가능성 증가. 간단하지만 타이밍이 핵심이다.</p>

<h2>타이밍이 전부다</h2>
<div class="callout-dog">
<strong>올바른 타이밍</strong><br>
• 원하는 행동 후 0.5초 이내 보상<br>
• 너무 늦으면 다른 행동을 보상하게 됨<br>
• 클리커: 타이밍 정확화 도구 (소리 = 보상 예고)<br>
• "착해"라는 칭찬도 훈련된 단어라면 효과적
</div>

<h2>보상 선택</h2>
<ul>
<li>강아지마다 선호 보상이 다름 (음식·칭찬·놀이)</li>
<li>고가치 보상(작은 고기 조각): 어려운 과제에</li>
<li>저가치 보상(건식 사료): 쉬운 과제에</li>
<li>보상의 가치를 다양하게 유지 → 예측 불가능 = 더 강한 동기</li>
</ul>

<h2>흔한 실수</h2>
<ul>
<li>보상이 너무 늦음 (행동 후 5초→다른 행동 보상)</li>
<li>일관성 없는 보상 (가끔만 줌)</li>
<li>"안 돼!" 를 너무 자주 사용 — 원하는 행동 가르치는 것이 더 효과적</li>
<li>훈련 세션이 너무 길어 강아지 집중력 소진</li>
</ul>

<h2>마지막으로</h2>
<p>긍정 강화는 단순히 친절한 것이 아니라 과학적으로 더 효과적인 방법이다. 5분짜리 훈련 세션을 매일 하는 것이 한 번의 긴 훈련보다 훨씬 빠른 결과를 만든다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Hiby, E.F. et al. — Dog training methods: their use, effectiveness and interaction with behaviour and welfare. Animal Welfare 2004",
      "한국반려동물행동상담협회 양성 강화 훈련 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-08T11:00:00.000Z",
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
  console.log("블로그 포스트 94차 시딩 완료! (blog-591 ~ blog-595)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
