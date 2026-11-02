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
    title: "반려동물 삶의 질 평가 — HHHHHMM 척도와 일상 모니터링 가이드",
    subtitle: "앨리스 빌라로보스 7대 지표·좋은 날 나쁜 날 캘린더·수의사 완화치료 상담 기준",
    metaTitle: "반려동물 삶의 질 평가 | HHHHHMM 척도·모니터링 기준 | 펫지기",
    metaDescription: "노령 및 말기 반려동물의 삶의 질을 객관적으로 점검하는 HHHHHMM 척도 7대 영역, 좋은 날과 나쁜 날 캘린더 기록법 및 수의사 상담 기준을 안내합니다.",
    body: `<p>만성 질환을 앓고 있거나 노령기에 접어든 반려동물을 돌보는 보호자에게 가장 힘들고 두려운 순간은 '아이의 고통이 어느 정도인지, 지금의 치료가 아이에게 의미가 있는지'를 판단해야 할 때입니다. 보호자의 주관적인 슬픔이나 두려움만으로는 객관적인 상태를 가늠하기 어렵기 때문에, 수의학계에서는 삶의 질(QoL, Quality of Life)을 다각도로 평가하는 표준 도구를 활용합니다. 수의 종양학자 앨리스 빌라로보스 박사가 고안하고 미국동물병원협회(AAHA) 생애말기 케어 가이드라인에서 인용하는 'HHHHHMM 척도'의 실무 평가법과 좋은 날·나쁜 날 기록법을 정리했습니다.</p>
<h2>1. HHHHHMM 7대 영역별 평가표 (0~10점 척도).</h2>
<p>HHHHHMM은 동물의 기본 생명 유지 및 정서적 안녕을 평가하는 7개 핵심 항목의 앞 글자를 딴 도구입니다. 각 항목을 0점(최악)부터 10점(이상적 정상)까지 평가합니다.</p>
<table>
<thead>
<tr><th>평가 영역.</th><th>점검 지표 및 관찰 기준.</th><th>채점 가이드 (0~10점).</th></tr>
</thead>
<tbody>
<tr><td><strong>1. Hurt (통증 조절)</strong></td><td>통증이 충분히 제어되는가? 호흡이 편안한가?</td><td>10점: 통증 징후 없음 / 0점: 호흡 곤란이나 극심한 통증 지속.</td></tr>
<tr><td><strong>2. Hunger (식욕·섭식)</strong></td><td>스스로 밥을 먹는가? 영양 공급이 유지되는가?</td><td>10점: 자발적 정상 식사 / 0점: 튜브 급여도 거부하거나 구토 지속.</td></tr>
<tr><td><strong>3. Hydration (수분 섭취)</strong></td><td>탈수 증상이 없는가? 수분을 충분히 섭취하는가?</td><td>10점: 촉촉한 잇몸 점막 / 0점: 피부 탄력 상실 및 심각한 탈수.</td></tr>
<tr><td><strong>4. Hygiene (위생 상태)</strong></td><td>대소변 오염 없이 청결을 유지할 수 있는가?</td><td>10점: 스스로 배변 뒤 청결 유지 / 0점: 욕창 발생 및 배변 오염 방치.</td></tr>
<tr><td><strong>5. Happiness (행복감)</strong></td><td>가족을 향해 반응하며 주변에 호기심을 보이는가?</td><td>10점: 꼬리 치며 교감 / 0점: 무반응, 완전한 고립 및 극심한 불안.</td></tr>
<tr><td><strong>6. Mobility (이동성)</strong></td><td>스스로 일어나 원하는 곳으로 걸을 수 있는가?</td><td>10점: 자발적 기립 및 보행 / 0점: 보조 없이 전혀 일어나지 못함.</td></tr>
<tr><td><strong>7. More Good Days (좋은 날의 비율)</strong></td><td>나쁜 날보다 편안하고 즐거운 날이 더 많은가?</td><td>10점: 편안한 날 연속 / 0점: 고통스럽고 힘든 날이 대부분.</td></tr>
</tbody>
</table>
<h2>2. 종합 점수 해석 및 수의사 상담 기준.</h2>
<p>7개 항목의 총점은 70점 만점입니다. 점수는 절대적인 단절 기준이 아니며 상태의 변화 추이를 관찰하는 지표입니다.</p>
<ul>
<li><strong>총점 35점 초과</strong>: 현재의 완화 치료와 지지 요법으로 기본적인 삶의 질이 유지되고 있는 상태입니다. 정기적으로 점수를 기록하며 통증 관리 약물을 점검합니다.</li>
<li><strong>총점 35점 이하</strong>: 반려동물이 일상에서 느끼는 고통과 불편감이 편안함을 넘어섰음을 시사합니다. 통증 약물의 증량이나 추가적인 완화 처치를 수의사와 긴급히 상의해야 합니다.</li>
<li><strong>특정 단일 항목의 0점</strong>: 총점이 35점 이상이라 하더라도 통증(Hurt) 조절이 전혀 되지 않아 호흡 곤란을 겪거나, 수일간 극심한 고통이 지속된다면 즉각적인 의료적 개입이 필요합니다.</li>
</ul>
<h2>3. 좋은 날 vs 나쁜 날 캘린더 기록법.</h2>
<p>노령이나 말기 환자는 하루 안에서도 컨디션 기복이 심하기 때문에, 매일 저녁 달력에 하루의 전반적인 상태를 표시하는 방법이 매우 효과적입니다.</p>
<table>
<thead>
<tr><th>일일 평가 구분.</th><th>보호자 관찰 판단 기준.</th><th>캘린더 표시 및 대응.</th></tr>
</thead>
<tbody>
<tr><td><strong>좋은 날 (Good Day)</strong></td><td>스스로 밥을 먹고, 가족의 목소리에 반응하며 편안히 쉬는 날.</td><td>초록색 스티커 또는 동그라미(O) 표시.</td></tr>
<tr><td><strong>보통 날 (Neutral Day)</strong></td><td>움직임은 줄었으나 뚜렷한 통증 징후 없이 잔잔히 머무는 날.</td><td>세모(△) 표시 및 컨디션 메모.</td></tr>
<tr><td><strong>나쁜 날 (Bad Day)</strong></td><td>종일 신음하거나 끙끙 앓고, 식사를 거부하며 숨이 가쁜 날.</td><td>빨간색 스티커 또는 엑스(X) 표시.</td></tr>
</tbody>
</table>
<p>한 주 동안 나쁜 날(X)이 좋은 날(O)보다 많아지거나, 나쁜 날이 연속 3일 이상 이어질 때는 아이의 삶의 질이 한계에 도달했다는 신호일 수 있으므로 수의사와 상담 일정을 잡아야 합니다.</p>
<h2>4. 보호자의 돌봄 소진과 의사 결정의 무게.</h2>
<p>생애 말기 돌봄은 신체적으로나 감정적으로 보호자를 깊이 소진시킵니다. "내가 너무 일찍 포기하는 것은 아닐까", "반대로 내 욕심으로 아이의 고통을 연장하고 있는 것은 아닐까"라는 죄책감은 모든 보호자가 겪는 자연스러운 감정입니다. 혼자서 모든 짐을 짊어지려 하지 마시고, 가족 구성원과 역할을 나누며 신뢰할 수 있는 주치의 수의사와 객관적인 지표를 바탕으로 대화를 나누세요.</p>
<h2>함께 확인할 준비.</h2>
<ul>
<li><a href="/guide/memorial-ceremony">허가 업체·인계·총견적 확인</a>.</li>
<li><a href="/guide/petloss-care-guide">펫로스 증후군과 사별 애도 — 일상 회복과 전문 지원 안내</a>.</li>
<li><a href="/guide/petloss-faq">반려동물 장례 자주 묻는 질문 — 법적 절차·유해 처리·실무 Q&A</a>.</li>
<li><a href="/blog/pet-death-admin-checklist">반려동물 사후 행정 처리 — 등록 말소부터 보험금 청구까지</a>.</li>
</ul>
<h2>이 글의 근거와 범위</h2>
<p>자료 확인일: 2026-10-11. 앨리스 빌라로보스 박사의 HHHHHMM 삶의 질 평가 척도 및 AAHA/IAAHPC 동물 생애말기 케어 가이드라인, 세계소동물수의사회(WSAVA) 동물복지 지침을 바탕으로 작성되었습니다. 본 글은 객관적인 상태 모니터링을 돕기 위한 참고 자료이며, 개별적인 의학적 진단이나 안락사 처방을 대신하지 않습니다. 이 글에는 외부 전문 검토 기록이 없습니다.</p>
<ul>
<li><a href="https://www.aaha.org/aaha-guidelines/end-of-life-care/" target="_blank" rel="noopener noreferrer">AAHA/IAAHPC: End-of-Life Care Guidelines</a></li>
<li><a href="https://www.avma.org/resources-tools/pet-owners/pet-loss-support" target="_blank" rel="noopener noreferrer">AVMA: Euthanasia and Pet Loss Support Guidelines</a></li>
<li><a href="https://wsava.org/guidelines/animal-welfare-guidelines/" target="_blank" rel="noopener noreferrer">WSAVA: Animal Welfare Guidelines</a></li>
</ul>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.aaha.org/aaha-guidelines/end-of-life-care/",
      "https://www.avma.org/resources-tools/pet-owners/pet-loss-support",
      "https://wsava.org/guidelines/animal-welfare-guidelines/",
    ],
    disclaimer:
      "본 가이드는 노령 및 말기 환자의 삶의 질을 객관적으로 관찰하기 위한 평가 도구(HHHHHMM) 안내이며, 의학적 진단이나 안락사 결정을 대신하지 않습니다. 평가 결과에 따른 통증 조절 및 완화 치료 계획은 반드시 담당 수의사와 상의하세요.",
    status: "published",
    publishedAt: "2026-11-08T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: "2026-10-11T12:00:00.000Z",
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
