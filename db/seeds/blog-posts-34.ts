import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 34 — cat1×2 + cat3×3 = 5편 (IDs 291-295)
// Macros: B, F, A, A, F
// Angles: RA5, RA2, RA1, RA6, RA3

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 291 / Cat1 / Macro-B(비교) / Lens-L2 / Hook-H1 / Outro-O3 / Angle-RA5
  {
    id: "blog-291",
    slug: "puppy-vs-adult-dog-adoption-comparison",
    type: "blog",
    category: 1,
    title: "강아지 입양 — 퍼피 vs 성견, 어떤 선택이 나에게 맞을까?",
    subtitle: "훈련 부담·건강 리스크·적응 기간·비용까지 상황별 비교표로 정리",
    metaTitle: "퍼피 vs 성견 입양 비교 — 어떤 강아지가 맞을까 | 펫지기",
    metaDescription: "퍼피와 성견 입양의 장단점을 훈련 난이도, 건강 리스크, 비용, 적응 기간 기준으로 비교합니다. 상황별 추천 가이드.",
    body: `<p>입양을 결심했을 때 가장 먼저 받는 질문이 "퍼피로 할래요, 성견으로 할래요?"이다. 어느 쪽이 더 낫다는 정답은 없다. 각 선택지에는 뚜렷한 장단점이 있고, 보호자의 라이프스타일과 맞아야 행복한 동거가 시작된다.</p>

<h2>퍼피 입양의 현실</h2>
<p>강아지 냄새, 작은 발바닥, 뒤뚱거리는 걸음걸이 — 퍼피는 분명 매력적이다. 하지만 그 시기가 얼마나 고강도인지 미리 알아야 한다.</p>

<h3>퍼피 첫 6개월 현실 체크리스트</h3>
<ul>
<li><strong>배변 훈련 평균 3~6개월</strong> — 매일 밤낮 없이 신호를 읽어야 한다</li>
<li><strong>물어뜯기</strong> — 가구, 신발, 전선 피해는 거의 불가피</li>
<li><strong>2~3시간 간격 화장실</strong> — 재택근무 혹은 보조 인력 필요</li>
<li><strong>초기 의료비</strong> — 기초 접종 3차(5~7만 원×3) + 중성화 수술(25~50만 원) + 구충 처리</li>
<li><strong>사회화 골든타임(생후 3~12주)</strong> — 이 시기를 놓치면 불안이 고착화될 수 있음</li>
</ul>

<div class="callout-cat">
<strong>퍼피가 맞는 유형</strong><br>
• 재택근무 또는 집에 있는 시간이 긴 사람<br>
• 훈련·교육에 관심과 시간이 있는 사람<br>
• 성격·외모를 처음부터 함께 만들어가고 싶은 사람<br>
• 다른 반려동물이 없어 도입이 비교적 유연한 가정
</div>

<h2>성견 입양의 숨겨진 장점</h2>
<p>보호소·구조단체의 성견은 대부분 "이미 완성된" 개다. 기질을 확인할 수 있고, 배변 훈련이 어느 정도 되어 있는 경우도 많다.</p>

<h3>성견 입양이 유리한 이유</h3>
<ul>
<li><strong>성격 예측 가능</strong> — 활동적인지, 조용한지, 낯선 사람에 어떻게 반응하는지 직접 확인 가능</li>
<li><strong>첫 의료비 절감</strong> — 보호소 성견은 대부분 접종·중성화 완료 상태</li>
<li><strong>수면 패턴 안정</strong> — 퍼피처럼 새벽에 울지 않음</li>
<li><strong>입양 초기 훈련 부담 ↓</strong> — 기본 생활 패턴이 이미 형성됨</li>
</ul>

<div class="callout-dog">
<strong>성견이 맞는 유형</strong><br>
• 직장인 또는 집 비우는 시간이 긴 사람<br>
• 훈련보다 함께하는 시간을 원하는 사람<br>
• 노령자 혹은 어린 자녀가 있는 가정<br>
• 이미 반려동물이 있어 빠른 적응이 필요한 경우
</div>

<h2>비교표 — 퍼피 vs 성견</h2>
<table>
<thead><tr><th>항목</th><th>퍼피(~6개월)</th><th>성견(1세↑)</th></tr></thead>
<tbody>
<tr><td>훈련 부담</td><td>매우 높음</td><td>낮음~보통</td></tr>
<tr><td>초기 의료비</td><td>접종+중성화 추가</td><td>대부분 완료</td></tr>
<tr><td>수면 방해</td><td>자주 (3~4주)</td><td>드묾</td></tr>
<tr><td>성격 파악</td><td>어려움</td><td>직접 확인 가능</td></tr>
<tr><td>기대 여명</td><td>길다</td><td>품종·나이 따라 상이</td></tr>
<tr><td>사회화</td><td>내가 주도</td><td>이미 형성됨</td></tr>
</tbody>
</table>

<h2>결정 전 꼭 해볼 것</h2>
<ol>
<li><strong>위탁 봉사 참여</strong> — 입양 전 임시보호 경험으로 실제 생활 체감</li>
<li><strong>보호소 방문 전 상담</strong> — 담당자에게 생활 패턴 솔직하게 말하기</li>
<li><strong>가족 구성원 전원 동의 확인</strong> — 뒤늦은 반대가 파양으로 이어지는 경우가 많음</li>
<li><strong>1년 이상 장기 책임 계획 수립</strong> — 이사, 취업, 결혼 등 라이프 이벤트 고려</li>
</ol>

<p>퍼피든 성견이든, 선택보다 중요한 건 준비 상태다. 아직 망설여진다면 임시보호부터 시작해보는 것도 좋은 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "동물보호관리시스템(APMS) 유기동물 통계 2025",
      "American Veterinary Medical Association — Puppy Socialization Guide",
      "한국동물병원협회 반려동물 입양 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-08T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 292 / Cat1 / Macro-F(절차) / Lens-L5 / Hook-H4 / Outro-O2 / Angle-RA2
  {
    id: "blog-292",
    slug: "kitten-first-week-home-checklist",
    type: "blog",
    category: 1,
    title: "아기 고양이 입양 첫 주 — 집 도착부터 첫 병원 방문까지 체크리스트",
    subtitle: "격리 공간 세팅, 첫날 먹이 주기, 화장실 위치, 바이러스 검사 시기 총정리",
    metaTitle: "아기 고양이 입양 첫 주 체크리스트 완전 가이드 | 펫지기",
    metaDescription: "아기 고양이(키튼) 집 데려온 첫 주 해야 할 일을 날짜별로 정리했습니다. 격리 공간, 첫 밥, 화장실, 수의사 방문 시기까지.",
    body: `<p>아기 고양이가 집에 오는 날, 설레는 마음만큼 해야 할 일도 많다. 첫 주를 잘 보내면 이후 생활이 훨씬 순조롭다. 반대로 이 시기를 무심코 넘기면 불안·배변 문제·건강 이슈로 이어질 수 있다.</p>

<h2>집 도착 전 준비 — 격리 공간 세팅</h2>
<p>아기 고양이는 처음 오는 공간이 낯설어 숨으려 한다. 처음부터 집 전체를 개방하면 스트레스가 극대화된다.</p>

<div class="callout-cat">
<strong>격리 공간 체크리스트</strong><br>
□ 조용한 방 하나 지정 (화장실·침실 제외)<br>
□ 숨을 수 있는 박스나 터널<br>
□ 모래 화장실 (모래 1/3 정도 채우기)<br>
□ 물그릇 + 사료그릇 분리 배치 (화장실과 반대 방향)<br>
□ 창문 방충망 체크 (추락 위험)<br>
□ 전선·고무줄·끈 등 삼킬 수 있는 물건 제거
</div>

<h2>첫날 — 스트레스 최소화</h2>
<p>첫날은 최대한 건드리지 않는다. 안고 싶은 충동을 참는 것이 고양이를 위한 첫 번째 배려다.</p>

<h3>첫날 할 일</h3>
<ul>
<li>이동장 문을 열어두고 스스로 나오길 기다림</li>
<li>사료와 물을 놔두고 자리를 피해줌</li>
<li>큰 소리, 손님 방문 자제</li>
<li>이름을 부드럽게 불러주며 목소리에 익숙해지게 함</li>
</ul>

<h2>2~3일차 — 관찰 기간</h2>
<h3>체크해야 할 건강 신호</h3>
<ul>
<li><strong>배변·배뇨</strong> — 24시간 내 확인 안 되면 수의사 연락</li>
<li><strong>사료 섭취</strong> — 완전 거부 24시간 이상 → 주의</li>
<li><strong>재채기·눈곱·콧물</strong> — 허피스·칼리시 가능성, 구조 고양이라면 더 주의</li>
<li><strong>설사</strong> — 환경 변화 스트레스성이 많으나 2일 이상 지속 시 검사 필요</li>
</ul>

<h2>첫 1주일 내 — 동물병원 방문</h2>
<p>입양 후 가능한 한 빨리(3~7일 내) 초진을 받는 것이 원칙이다.</p>

<h3>첫 방문 시 받을 검사</h3>
<ul>
<li><strong>기본 신체 검사</strong> (체중·체온·심잡음)</li>
<li><strong>바이러스 검사</strong> — FIV(고양이 에이즈)/FeLV(백혈병) — 구조묘라면 필수</li>
<li><strong>구충 처리</strong> — 회충·조충 등 내부 기생충</li>
<li><strong>외부 기생충 확인</strong> — 귀진드기·벼룩</li>
<li><strong>첫 백신 일정 상담</strong> — 보통 8~9주령부터 시작</li>
</ul>

<div class="callout-dog">
<strong>백신 기본 일정 (키튼 기준)</strong><br>
• 1차: 8~9주령 — 종합백신(FVRCP)<br>
• 2차: 12주령 — 종합백신 + 구내염 예방<br>
• 3차: 16주령 — 종합백신 + 광견병<br>
• 이후: 1년 1회 추가 접종
</div>

<h2>1주일 후 — 집 영역 조금씩 확장</h2>
<p>격리 공간에서 안정을 찾았다면 문을 조금씩 열어 스스로 탐색하게 둔다. 강제로 데려나오면 안 된다.</p>

<p>첫 주는 사람이 더 자제해야 하는 시간이다. 충분히 기다려준 고양이는 반드시 먼저 다가온다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "대한수의사회 반려묘 입양 가이드라인",
      "Cornell Feline Health Center — Bringing a New Cat Home",
      "ISFM(국제고양이의학회) 고양이 복지 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-08T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 293 / Cat3 / Macro-A(원인분석) / Lens-L1 / Hook-H2 / Outro-O1 / Angle-RA1
  {
    id: "blog-293",
    slug: "cat-feline-hypertension-symptoms-management",
    type: "blog",
    category: 3,
    title: "고양이 고혈압 — 증상이 거의 없는 침묵의 질환, 어떻게 발견하나",
    subtitle: "실명·신부전 유발 전 조기 발견이 핵심 — 노령묘 정기 혈압 측정 필요한 이유",
    metaTitle: "고양이 고혈압 증상 원인 치료 관리 가이드 | 펫지기",
    metaDescription: "고양이 고혈압은 증상이 없다가 실명·신부전으로 악화됩니다. 원인, 측정 방법, 치료 약물, 관리법을 수의사 검토 정보로 안내합니다.",
    body: `<p>고양이 고혈압은 '침묵의 살인자'라 불린다. 사람처럼 두통을 호소하거나 얼굴이 빨개지지 않는다. 대부분 실명이나 갑작스러운 발작으로 처음 발견된다. 7세 이상 고양이를 키운다면 반드시 알아야 할 질환이다.</p>

<h2>고양이 고혈압이란</h2>
<p>수축기 혈압이 160mmHg 이상이면 고혈압, 180mmHg 이상이면 중증 고혈압으로 분류한다. 참고로 정상 수축기 혈압은 120~140mmHg이다.</p>

<h3>발생 빈도</h3>
<ul>
<li>전체 고양이의 약 1~2%가 고혈압</li>
<li>만성신장질환(CKD) 고양이의 60~65%에서 동반</li>
<li>갑상샘기능항진증 고양이의 약 25%에서 동반</li>
<li>10세 이상 고령 고양이에서 발생률 급증</li>
</ul>

<h2>주요 원인</h2>
<h3>속발성(2차성) 고혈압 — 가장 흔함</h3>
<ul>
<li><strong>만성신장질환(CKD)</strong> — 가장 흔한 원인. 신장이 레닌-안지오텐신 시스템을 과활성화</li>
<li><strong>갑상샘기능항진증</strong> — 甲狀腺 호르몬이 심박수·심박출량을 높임</li>
<li><strong>당뇨병</strong> — 혈관 손상으로 혈압 상승</li>
</ul>

<h3>특발성(원발성) 고혈압</h3>
<p>원인 질환 없이 발생. 사람의 본태성 고혈압과 유사. 고양이에서는 약 20% 정도.</p>

<h2>증상 — 대부분 무증상, 합병증부터 나타난다</h2>
<div class="callout-cat">
<strong>고혈압 합병증 긴급 신호 (즉시 병원)</strong><br>
• 갑작스러운 실명 또는 동공 확장 고정<br>
• 갑작스러운 쓰러짐·경련<br>
• 후지 마비 (대동맥 혈전색전증 동반 시)<br>
• 급격한 방향 감각 상실·비틀거림
</div>

<h3>서서히 나타날 수 있는 신호</h3>
<ul>
<li>눈의 충혈 또는 안저 출혈(망막박리 전조)</li>
<li>이유 없는 발성 증가 (특히 밤)</li>
<li>음수량·배뇨량 급증</li>
<li>체중 감소와 식욕 변화</li>
</ul>

<h2>진단 — 혈압 측정</h2>
<p>수의사가 도플러법 또는 오실로메트리법으로 측정한다. 고양이는 낯선 환경에서 혈압이 오르는 '화이트코트 효과'가 크므로 여러 번 측정 후 판단한다.</p>

<h3>혈압 단계 분류 (IRIS 가이드라인)</h3>
<table>
<thead><tr><th>단계</th><th>수축기(mmHg)</th><th>위험도</th></tr></thead>
<tbody>
<tr><td>정상</td><td>&lt;140</td><td>낮음</td></tr>
<tr><td>전고혈압</td><td>140~159</td><td>미미</td></tr>
<tr><td>고혈압</td><td>160~179</td><td>중등도</td></tr>
<tr><td>중증</td><td>≥180</td><td>높음</td></tr>
</tbody>
</table>

<h2>치료</h2>
<h3>약물 치료</h3>
<ul>
<li><strong>아믈로디핀(암로디핀)</strong> — 칼슘채널 차단제, 고양이 1차 선택약</li>
<li><strong>텔미사르탄</strong> — 안지오텐신 수용체 차단제, 신부전 동반 시 병용 가능</li>
<li>약물 시작 후 5~7일 내 재측정 필수</li>
</ul>

<h3>근본 원인 치료</h3>
<p>갑상샘기능항진증이나 신장질환 등 원인 질환을 함께 치료해야 혈압 조절이 안정된다.</p>

<h2>예방 — 정기 모니터링이 핵심</h2>
<ul>
<li>7세 이상 — 연 1회 혈압 측정 포함 건강검진</li>
<li>CKD·갑상샘항진증 진단 후 — 3~6개월 간격 측정</li>
<li>신장 보호 처방식 급여 (수의사 처방 시)</li>
</ul>

<p>합병증이 생기기 전에 발견하면 약물로 충분히 관리 가능한 질환이다. 정기 검진이 유일한 조기 발견 수단이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "IRIS(국제신장학회) 고양이 고혈압 가이드라인 2023",
      "ISFM — Feline Hypertension Consensus Guidelines",
      "대한수의사회 고양이 내과질환 자료집",
    ]),
    disclaimer: "이 글은 일반 정보 제공 목적이며 수의사 진료를 대체하지 않습니다. 고양이 건강 이상이 의심되면 반드시 동물병원에서 검진받으세요.",
    status: "published",
    publishedAt: "2026-06-09T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 294 / Cat3 / Macro-F(절차) / Lens-L3 / Hook-H5 / Outro-O4 / Angle-RA6
  {
    id: "blog-294",
    slug: "dog-dental-disease-prevention-guide",
    type: "blog",
    category: 3,
    title: "강아지 치과 질환 예방 — 이를 닦지 않으면 3세부터 치주염이 시작된다",
    subtitle: "치태·치석·치주염·발치까지 단계별 예방법과 집에서 할 수 있는 스케일링 대안",
    metaTitle: "강아지 치과 질환 예방 이닦기 스케일링 완전 가이드 | 펫지기",
    metaDescription: "강아지 80%가 3세에 치주염. 집에서 하는 이닦기 방법, 치석 예방 간식, 스케일링 주기, 치과 질환 증상을 수의사 검토 정보로 안내합니다.",
    body: `<p>강아지의 80%가 3세가 되면 어느 정도 치주 질환을 앓는다는 연구 결과가 있다. 치통을 말로 표현 못하는 개는 입을 만지기 싫어하거나 밥을 한쪽으로만 씹는 식으로 신호를 보낸다. 그 신호를 놓치면 치아 하나씩 잃게 된다.</p>

<h2>왜 강아지 치주 질환이 흔한가</h2>
<p>사람과 달리 강아지 구강은 pH가 높고(알칼리성) 세균 번식에 유리하다. 타액에 아밀라아제가 적어 음식 찌꺼기가 더 잘 달라붙는다. 게다가 대부분 보호자가 이를 닦아주지 않는다.</p>

<h3>치주 질환 진행 4단계</h3>
<ol>
<li><strong>치태 형성</strong> — 식후 24시간 내에 세균 막 형성 (이 단계에서 칫솔질로 제거 가능)</li>
<li><strong>치석 형성</strong> — 치태가 석회화, 칫솔질로 제거 불가 → 스케일링 필요</li>
<li><strong>치은염</strong> — 잇몸 붓기·빨개짐·출혈, 초기 치료 가능</li>
<li><strong>치주염(중증)</strong> — 치조골 손상, 치아 흔들림·발치, 심하면 심장·신장에 영향</li>
</ol>

<h2>집에서 이닦기 — 단계별 훈련</h2>
<p>갑자기 칫솔을 넣으면 대부분 저항한다. 2~4주에 걸쳐 단계를 밟아야 한다.</p>

<div class="callout-dog">
<strong>이닦기 훈련 단계</strong><br>
1단계(3~5일): 손가락에 강아지 치약 묻혀 핥게 하기<br>
2단계(3~5일): 손가락으로 잇몸·치아를 가볍게 문지르기<br>
3단계(3~5일): 실리콘 핑거브러시로 앞니부터<br>
4단계: 부드러운 칫솔로 바깥쪽 치아부터 원을 그리며 닦기
</div>

<h3>주의사항</h3>
<ul>
<li>사람 치약 사용 금지 — 자일리톨, 불소가 개에게 독성</li>
<li>강아지 전용 치약만 사용 (닭고기·소고기 맛 등 다양)</li>
<li>매일 1회가 이상적, 최소 주 3회 이상 권장</li>
</ul>

<h2>이닦기 대안 보조 도구</h2>
<h3>치석 예방 효과가 있는 것</h3>
<ul>
<li><strong>VOHC 인증 덴탈 껌</strong> — 미국수의구강보건위원회 인증 제품은 실제 치석 감소 효과 입증</li>
<li><strong>덴탈 물 첨가제</strong> — 물에 희석해 세균 막 형성 억제</li>
<li><strong>생우유(무락토오스) 뼈·트리트</strong> — 씹기 효과로 기계적 제거</li>
</ul>

<h3>효과가 과장된 것</h3>
<ul>
<li>대부분의 덴탈 간식 — 씹는 시간이 너무 짧아 효과 제한적</li>
<li>물에 희석하는 일반 구강청결제 — 성분 미검증 제품 많음</li>
</ul>

<h2>동물병원 스케일링 주기</h2>
<p>전신마취가 필요하므로 보호자들이 꺼리는 경향이 있다. 그러나 치주염보다 마취 위험이 낮은 경우가 대부분이다.</p>

<table>
<thead><tr><th>상황</th><th>권장 주기</th></tr></thead>
<tbody>
<tr><td>이닦기를 잘 받는 소형견</td><td>1~2년에 1회</td></tr>
<tr><td>이닦기를 안 받는 소형견</td><td>6~12개월마다</td></tr>
<tr><td>대형견 (치석 덜 쌓임)</td><td>1~3년에 1회</td></tr>
<tr><td>단두종(퍼그·불독 등)</td><td>치아 겹침으로 6~12개월마다</td></tr>
</tbody>
</table>

<h2>치과 질환 이미 있다면</h2>
<p>밥 먹을 때 고개를 기울이거나, 딱딱한 간식을 거부하거나, 입에서 심한 냄새가 난다면 치주염이 진행 중일 수 있다. 이때는 X-ray 포함 치과 검진이 필요하다.</p>

<p>치주 질환은 진행을 막을 수 있다. 오늘부터 이닦기를 시작하는 것이 가장 좋은 예방이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "VOHC(수의구강보건위원회) 제품 인증 기준 2024",
      "대한수의사회 반려동물 구강 건강 자료",
      "AVDC(미국수의치과대학위원회) 치주 질환 가이드라인",
    ]),
    disclaimer: "이 글은 일반 정보 제공 목적이며 수의사 진료를 대체하지 않습니다. 치과 질환이 의심되면 동물병원에서 검진받으세요.",
    status: "published",
    publishedAt: "2026-06-09T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 295 / Cat3 / Macro-A(원인분석) / Lens-L4 / Hook-H3 / Outro-O3 / Angle-RA3
  {
    id: "blog-295",
    slug: "senior-dog-arthritis-management-guide",
    type: "blog",
    category: 3,
    title: "노령견 관절염 완전 가이드 — 계단을 안 오르려 한다면 통증 신호일 수 있다",
    subtitle: "증상 체크리스트·체중·영양 보충·운동 조절·진통 치료 단계별 관리법",
    metaTitle: "노령견 관절염 증상 원인 치료 관리 완전 가이드 | 펫지기",
    metaDescription: "강아지 관절염 증상, 원인, 체중 관리, 영양 보충, 수의사 치료 옵션을 수의사 검토 정보로 안내합니다. 노령견 삶의 질 개선에 집중합니다.",
    body: `<p>관절염은 노령견의 가장 흔한 만성 통증 원인 중 하나다. 미국 연구에 따르면 8세 이상 개의 약 80%가 골관절염을 가지고 있다. 문제는 개들이 통증을 숨기는 경향이 있어 보호자가 뒤늦게 알아채는 경우가 많다는 것이다.</p>

<h2>관절염 조기 신호 — 이런 행동이 보이면 의심</h2>
<div class="callout-dog">
<strong>관절염 행동 체크리스트</strong><br>
□ 계단을 올라가기 싫어하거나 올라가는 시간이 늘었다<br>
□ 차에 타고 내리기 힘들어한다<br>
□ 눕거나 일어날 때 힘겨워 보인다<br>
□ 아침 기상 후 뻣뻣하게 움직인다 (5~10분 후 완화)<br>
□ 특정 다리를 자주 든다<br>
□ 뒷다리에 힘이 빠지거나 미끄러진다<br>
□ 만질 때 움츠리거나 으르렁댄다<br>
□ 산책 거리가 줄었다
</div>

<h2>관절염 발생 원인</h2>
<h3>위험 요소</h3>
<ul>
<li><strong>품종</strong> — 래브라도·골든리트리버·저먼셰퍼드·로트와일러 등 대형견에서 흔함. 닥스훈트·코기 등 연골이형성증 품종도 취약</li>
<li><strong>체중</strong> — 비만이 관절에 가장 큰 스트레스. 이상 체중 10% 초과 시 발병률 2배</li>
<li><strong>과거 부상</strong> — 십자인대 파열, 탈구 이력이 있는 관절에서 조기 진행</li>
<li><strong>나이</strong> — 연골 재생 능력 감소로 노화 자체가 위험인자</li>
</ul>

<h2>가정에서 할 수 있는 관리</h2>
<h3>1. 체중 조절 — 가장 효과적인 단일 관리</h3>
<p>체중의 6~8%만 줄여도 보행 능력이 유의미하게 개선된다는 연구가 있다. 처방 체중감량식 또는 수의사 지도하 칼로리 제한이 효과적이다.</p>

<h3>2. 환경 개선</h3>
<ul>
<li>미끄럼 방지 매트 설치 (특히 마루·타일)</li>
<li>계단에 경사로(램프) 설치</li>
<li>잠자리를 낮은 침대나 메모리폼 매트로 교체</li>
<li>밥그릇 높이 조절 (경추 관절염이 있다면)</li>
</ul>

<h3>3. 저충격 운동</h3>
<ul>
<li>짧고 자주 — 30분 한 번보다 10분씩 3번</li>
<li>수중 재활(수영·수중 트레드밀) — 관절 부담 없이 근육 유지</li>
<li>포장도로보다 잔디·흙길 산책</li>
<li>날씨 추운 날은 실내 운동으로 대체 (추위에 통증 악화)</li>
</ul>

<h3>4. 영양 보충제</h3>
<ul>
<li><strong>오메가-3(EPA/DHA)</strong> — 항염증 효과 증거 수준 양호. 어유 형태 권장</li>
<li><strong>글루코사민·콘드로이틴</strong> — 연구 결과 혼재하나 부작용 낮아 시도 가능</li>
<li><strong>UC-II(비변성 2형 콜라겐)</strong> — 일부 임상에서 유의미한 통증 감소</li>
</ul>

<h2>동물병원 치료 옵션</h2>
<h3>약물 치료</h3>
<ul>
<li><strong>NSAIDs(비스테로이드 소염제)</strong> — 멜록시캄·카프로펜 등. 통증·염증 동시 조절. 장기 사용 시 혈액 검사 모니터링 필요</li>
<li><strong>갈라파고스펩타이드(Librela/모노클로날 항체)</strong> — 2024년 국내 도입. 월 1회 주사, 소화기 부작용 없음</li>
<li><strong>관절 내 주사(히알루론산·PRP)</strong> — 심한 단관절 관절염에 선택적 사용</li>
</ul>

<h3>물리치료·재활</h3>
<ul>
<li>레이저 치료 (LLLT) — 염증 감소·혈류 개선</li>
<li>수중 재활 전문센터 — 전국 주요 도시에 반려동물 재활센터 증가 중</li>
<li>마사지·도수치료 — 전문 재활사 지도하</li>
</ul>

<p>관절염은 완치보다 통증 조절과 삶의 질 유지가 목표다. 조기에 시작할수록 개가 편안하게 지낼 수 있는 시간이 길어진다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Veterinary Evidence Journal — Canine Osteoarthritis 2024",
      "WSAVA 반려동물 통증 관리 가이드라인",
      "대한수의사회 반려동물 정형외과·재활 자료집",
    ]),
    disclaimer: "이 글은 일반 정보 제공 목적이며 수의사 진료를 대체하지 않습니다. 관절 이상이 의심되면 동물병원에서 검진받으세요.",
    status: "published",
    publishedAt: "2026-06-10T09:00:00.000Z",
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
  console.log("블로그 포스트 34차 시딩 완료! (blog-291 ~ blog-295)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
