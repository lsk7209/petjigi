import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 117 — cat3×2 + cat1×1 + cat5×1 + cat2×1 = 5편 (IDs 706-710)
// Macros: D, C, B, F, G
// Angles: RA3, RA6, RA8, RA1, RA5

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-706",
    slug: "dog-cushings-syndrome-guide",
    type: "blog",
    category: 3,
    title: "강아지 쿠싱증후군 — 배가 불룩하고 물을 많이 마실 때",
    subtitle: "쿠싱증후군 원인, 복부 팽만·다음다갈증 증상, 진단 검사, 트릴로스탄 치료",
    metaTitle: "강아지 쿠싱증후군 — 복부 팽만·다음다갈증 원인·치료 가이드 | 펫지기",
    metaDescription: "강아지 쿠싱증후군 원인과 치료. 배가 불룩해지고 물을 많이 마시는 증상, PDH·ADH 유형 차이, ACTH 자극 검사, 트릴로스탄 치료 원칙을 정리했습니다.",
    body: `<p>배가 북처럼 불룩해지고, 물을 계속 마시고, 털이 빠지기 시작한다. 이 증상들이 동시에 나타난다면 쿠싱증후군을 의심해야 한다.</p>

<h2>쿠싱증후군이란</h2>
<p>부신피질에서 코르티솔이 과도하게 분비되는 내분비 질환이다. 뇌하수체 종양(PDH, 85%)이 가장 흔하고, 부신 종양(ADH, 15%)도 원인이 된다. 중·노령견(6살 이상)에서 주로 발생한다.</p>

<h2>주요 증상</h2>
<ul>
<li>복부 팽만("단지 배"): 복근 약화 + 지방 재분포</li>
<li>다음다갈증(물 많이 마시고 소변 많이 봄)</li>
<li>대칭성 탈모(옆구리 중심)</li>
<li>근육 약화, 운동 기피</li>
<li>피부 얇아짐, 멍 잘 듦</li>
<li>식욕 증가, 헐떡거림</li>
</ul>

<h2>진단</h2>
<div class="callout-dog">
<strong>쿠싱증후군 진단 검사</strong><br>
• 소변 코르티솔/크레아티닌 비율(선별 검사)<br>
• ACTH 자극 검사: 과도한 코르티솔 반응 확인<br>
• 저용량 덱사메타손 억제 검사(LDDST)<br>
• 복부 초음파: 부신 크기 평가 (PDH vs ADH 감별)
</div>

<h2>치료 — 트릴로스탄</h2>
<ul>
<li>트릴로스탄(베토릴): 국내 가장 많이 사용되는 표준 치료제</li>
<li>부신 코르티솔 합성 억제</li>
<li>초기 용량 설정 후 4~6주마다 ACTH 자극 검사로 모니터링</li>
<li>과도한 억제 시 부신 위기(애디슨 위기) 위험 — 처방 용량 준수 필수</li>
<li>부신 종양(ADH): 수술 고려</li>
</ul>

<h2>관리 포인트</h2>
<ul>
<li>치료 중 정기 혈액검사·ACTH 검사 절대 빠지지 말 것</li>
<li>스트레스 상황(다른 질환·수술)에서 코르티솔 요구량 증가 가능</li>
<li>치료로 대부분 삶의 질 개선 가능</li>
</ul>

<h2>마지막으로</h2>
<p>쿠싱증후군은 완치보다 관리가 목표다. 정기 모니터링을 유지하면 증상을 조절하며 일상적인 생활이 가능하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Behrend, E.N. et al. — Diagnosis of spontaneous canine hyperadrenocorticism: 2012 ACVIM consensus statement. J Vet Intern Med 2013",
      "한국수의내과학회 쿠싱증후군 진단·치료 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-03T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-707",
    slug: "cat-herpesvirus-upper-respiratory",
    type: "blog",
    category: 3,
    title: "고양이 헤르페스 바이러스 — 평생 보균과 재발 관리",
    subtitle: "FHV-1 잠복 감염 기전, 재발 유발 요인, 눈 증상·코 증상 관리, L-라이신 논쟁",
    metaTitle: "고양이 헤르페스 바이러스(FHV-1) — 평생 보균·재발 관리 가이드 | 펫지기",
    metaDescription: "고양이 헤르페스 바이러스(FHV-1) 잠복 감염과 재발 관리. 스트레스로 인한 재발 기전, 눈·코 증상 대처, L-라이신 효과 논란, 항바이러스제 사용 기준을 정리했습니다.",
    body: `<p>고양이 허피스바이러스(FHV-1)는 고양이 상부 호흡기 감염(고양이 감기)의 가장 흔한 원인 중 하나다. 재채기, 콧물, 눈곱이 반복되는 고양이는 이 바이러스에 감염되어 있을 수 있다. 한 번 감염되면 평생 몸 안에 남아 스트레스 때 재발하는 특징이 있다.</p>

<h2>증상</h2>
<ul>
<li>재채기, 콧물, 코막힘</li>
<li>눈 충혈, 눈곱, 결막염 (눈물, 눈을 가늘게 뜸)</li>
<li>식욕 감소, 열, 기운 없음</li>
<li>심하면 각막 궤양과 입안 궤양</li>
</ul>
<p>코가 막히면 냄새를 못 맡아 식욕이 떨어지는 것이 흔하다. 하루 이상 먹지 않으면 고양이는 간에 문제가 생길 수 있어 병원 진료가 필요하다.</p>

<h2>어떻게 전파되고 재발하나</h2>
<ul>
<li>코·눈 분비물, 침, 공동 그릇·화장실을 통한 접촉으로 전파된다.</li>
<li>회복 후에도 신경 조직에 잠복하다가 스트레스, 환경 변화, 다른 질환, 면역 저하 때 재활성화된다.</li>
<li>새끼 고양이와 보호소, 다묘 환경에서 흔하다.</li>
</ul>

<h2>치료와 관리</h2>
<table>
<thead><tr><th>항목</th><th>내용</th></tr></thead>
<tbody>
<tr><td>지지 요법</td><td>수분 공급, 영양 지원, 코 막힘 완화(따뜻한 증기, 눈코 분비물 닦아 주기)</td></tr>
<tr><td>항바이러스·안약</td><td>눈 증상이 있으면 수의사가 안약을 처방한다. 약은 개체에 맞게 선택한다</td></tr>
<tr><td>2차 세균 감염</td><td>세균 감염이 의심되면 항생제를 사용한다 (바이러스 자체에는 효과 없음)</td></tr>
<tr><td>스트레스 관리</td><td>일과, 숨을 곳, 다묘 가정에서 충분한 자원 제공</td></tr>
<tr><td>예방접종</td><td>허피스바이러스를 포함한 복합 백신은 증상을 줄여 준다. 완전한 감염 예방은 아니다</td></tr>
</tbody>
</table>

<div class="callout-cat">
<strong>라이신 보충제는 근거가 부족하다</strong><br>
• 라이신이 허피스바이러스 감염에 효과가 있다는 믿음이 널리 퍼져 있지만, 2015년 체계적 문헌 고찰은 효과를 뒷받침하는 근거가 없다고 결론지었다<br>
• 보호소 고양이를 대상으로 한 시험에서도 상부 호흡기 감염 예방 효과가 확인되지 않았다<br>
• 제품을 쓰기 전에 수의사와 상의한다
</div>

<h2>이런 경우는 병원</h2>
<ul>
<li>눈을 뜨지 못하거나 각막이 흐려짐 (궤양 의심)</li>
<li>누런 콧물, 열, 호흡이 힘듦</li>
<li>24시간 이상 먹지 않음</li>
<li>새끼 고양이나 노령묘의 증상이 심함</li>
</ul>

<h2>다묘 가정</h2>
<p>증상이 있는 고양이를 분리하고 그릇, 화장실, 침구를 따로 쓴다. 손 씻기와 환경 청소를 철저히 한다. 새로 들이는 고양이는 일정 기간 격리한 뒤 합사한다.</p>

<h2>마지막으로</h2>
<p>허피스바이러스는 완전히 없애기는 어렵지만 스트레스 관리와 조기 치료로 재발 빈도와 증상을 줄일 수 있다. 눈 증상이 있으면 서둘러 진료를 받자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4647294/ — PMC, Lysine supplementation is not effective for the prevention or treatment of FHV-1 infection in cats: a systematic review",
      "https://pubmed.ncbi.nlm.nih.gov/18547855/ — PubMed, Oral supplementation with L-lysine did not prevent upper respiratory infection in a shelter population of cats",
      "https://www.aaha.org/publications/newstat/articles/2015-11/lysine-ineffective-in-treating-cats-with-herpesvirus-1-infection/ — AAHA NEWStat, Lysine ineffective in treating cats with herpesvirus 1 infection",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-04T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-708",
    slug: "senior-pet-first-adoption-guide",
    type: "blog",
    category: 1,
    title: "노령 반려동물 입양 — 처음 만나는 시니어와 함께 시작하기",
    subtitle: "노령 입양의 현실, 준비 사항, 첫 적응 기간, 의료비 대비, 함께하는 시간의 가치",
    metaTitle: "노령 반려동물 입양 — 시니어 입양 준비와 첫 적응 완전 가이드 | 펫지기",
    metaDescription: "노령 반려동물 입양을 처음 고려하는 분들을 위한 가이드. 시니어 입양의 현실, 준비 사항, 첫 적응 기간, 의료비 대비, 짧지 않은 함께하는 시간의 의미.",
    body: `<p>노령 반려동물 입양을 망설이는 가장 큰 이유는 "짧은 시간"과 "의료비"다. 두 걱정 모두 현실이지만, 준비된 보호자에게는 충분히 감당할 수 있다.</p>

<h2>노령 입양의 현실</h2>
<p>국내 유기 동물 보호소에서 노령 동물의 입양률은 낮다. 7살 이상 개·고양이는 보호소에서 오래 머무는 경향이 있다. 그러나 노령 동물은 어린 동물에 비해 기질이 안정적이고, 이미 기본 훈련이 된 경우도 많다.</p>

<h2>입양 전 준비 사항</h2>
<div class="callout-dog">
<strong>노령 반려동물 입양 전 체크리스트</strong><br>
• 전 병력 확인: 보호소 진료 기록 열람 요청<br>
• 초기 건강검진: 입양 후 2주 내 전신 건강검진<br>
• 공간 정비: 미끄럼 방지 매트, 계단·소파 경사로<br>
• 의료비 예산: 월 3~10만 원 기본 대비<br>
• 펫보험: 노령 가입 가능 여부 사전 확인
</div>

<h2>첫 적응 기간</h2>
<ul>
<li>3일: 기본 안전감 형성, 조용히 지내기</li>
<li>3주: 루틴 적응, 경계심 낮아짐</li>
<li>3개월: 신뢰 형성, 성격 진면목 나타남</li>
<li>노령 동물은 어린 동물보다 적응이 느릴 수 있음 — 조급해하지 않기</li>
</ul>

<h2>의료비 현실적 대비</h2>
<ul>
<li>연 2회 건강검진: 혈액검사·흉복부 방사선 포함</li>
<li>관절 보충제: 월 1~5만 원</li>
<li>치과 관리: 스케일링 연 1회 또는 수의사 판단</li>
<li>응급 상황 대비 적립금: 100~200만 원 권장</li>
</ul>

<h2>함께하는 시간의 가치</h2>
<p>7살 개의 기대 여명은 품종·크기에 따라 3~8년이다. 고양이는 7살에도 10년을 더 살 수 있다. "짧다"고 느끼는 시간도 충분히 깊은 관계가 될 수 있다. 노령 동물은 안정된 집을 가장 필요로 한다.</p>

<h2>마지막으로</h2>
<p>노령 입양은 특별한 용기가 필요하지 않다. 현실을 알고 준비한 보호자라면 충분히 의미 있는 선택이 될 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "동물자유연대 국내 유기 동물 입양 현황 보고서 2023",
      "한국동물복지협회 시니어 반려동물 입양 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-04T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-709",
    slug: "dog-off-leash-park-safety-guide",
    type: "blog",
    category: 5,
    title: "반려견 놀이터(오프리쉬) 안전 이용 완전 가이드",
    subtitle: "오프리쉬 공원 이용 전 준비, 싸움 예방, 위험 신호 읽기, 놀이터 에티켓",
    metaTitle: "반려견 놀이터 안전 이용 — 오프리쉬 공원 에티켓·싸움 예방 가이드 | 펫지기",
    metaDescription: "반려견 오프리쉬 놀이터 안전 이용법. 이용 전 준비 사항, 싸움 예방 방법, 강아지 긴장 신호 읽기, 놀이터 에티켓, 응급 상황 대처를 정리했습니다.",
    body: `<p>목줄 없이 뛰어놀 수 있는 개 운동장(도그파크)은 개에게 좋은 운동과 사회화 기회지만, 싸움, 질병 전파, 사고 위험도 있다. 모든 개에게 맞는 장소는 아니다. 입장 전 점검과 현장 매너를 정리했다.</p>

<h2>입장 전 확인</h2>
<table>
<thead><tr><th>항목</th><th>기준</th></tr></thead>
<tbody>
<tr><td>예방접종</td><td>기본 접종과 광견병 접종이 최신이어야 한다. 지역 위험에 따라 수의사가 추가 접종을 권할 수 있다</td></tr>
<tr><td>어린 강아지</td><td>접종 시리즈를 마치기 전에는 입장하지 않는다</td></tr>
<tr><td>건강 상태</td><td>기침, 구토, 설사 등 아픈 개는 가지 않는다</td></tr>
<tr><td>발정 중인 암컷</td><td>데려가지 않는다. 중성화하지 않은 수컷은 특히 주의한다</td></tr>
<tr><td>성향</td><td>겁이 많거나 반응성이 큰 개, 공격 이력이 있는 개는 맞지 않는다</td></tr>
<tr><td>기본 훈련</td><td>'이리 와', '놔'가 어느 정도 되는지 확인한다</td></tr>
</tbody>
</table>

<h2>현장 안전 수칙</h2>
<ul>
<li>입구에서는 목줄을 맨 채 들어가고, 울타리 안쪽에서 풀어 준다.</li>
<li>개를 항상 시야에서 놓치지 않는다. 스마트폰을 보느라 개를 놓치지 않는다.</li>
<li>소형견과 대형견 구역이 나뉘어 있으면 구분해서 이용한다.</li>
<li>놀이가 거칠어지면 개입해 쉬게 한다. 한 마리가 도망치거나 구석에 몰리면 즉시 데리고 나온다.</li>
<li>개인용 물그릇을 쓰고 공용 그릇은 피한다. 질병 전파를 줄일 수 있다.</li>
<li>간식·장난감은 싸움을 부를 수 있어 꺼내기 전에 상황을 본다.</li>
<li>배설물은 즉시 치운다.</li>
</ul>

<div class="callout-dog">
<strong>싸움 조짐 신호</strong><br>
• 몸이 굳고 응시한다, 이빨을 드러낸다, 낮게 으르렁거린다<br>
• 한 마리를 여러 마리가 쫓는다<br>
• 마운팅이 심해지고 다른 개가 싫어한다<br>
→ 개를 부르고 안전하게 데리고 나온다. 싸움이 났다면 몸으로 사이를 막지 말고 큰 소리나 물, 담요 등으로 주의를 분산시킨다
</div>

<h2>다녀온 뒤</h2>
<ul>
<li>몸을 훑어 상처, 진드기를 확인한다.</li>
<li>며칠 동안 기침, 콧물, 구토·설사가 생기는지 관찰한다.</li>
<li>발바닥과 귀를 확인한다.</li>
</ul>

<h2>맞지 않는 개는</h2>
<p>다른 개와 놀기를 좋아하지 않는 개도 많다. 억지로 데려가기보다 일대일 산책, 노즈워크, 소수 친구와의 약속 놀이가 더 적합할 수 있다. 에티켓은 <a href="/blog/dog-walk-guide">강아지 산책 가이드</a>도 참고한다.</p>

<h2>마지막으로</h2>
<p>도그파크는 보호자의 관찰과 개입이 안전을 좌우한다. 개의 성향을 먼저 확인하고, 이상 신호가 보이면 미련 없이 나오자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 훈련·행동 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.akc.org/expert-advice/lifestyle/dog-park-safety-tips/ — AKC, Dog park safety tips",
      "https://www.akc.org/expert-advice/lifestyle/dog-park-etiquette-tips/ — AKC, Dog park etiquette tips",
      "https://www.vetstreet.com/our-pet-experts/play-it-safe-and-be-polite-dog-park-rules-you-should-never-break — Vetstreet, Dog park rules you should never break",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-05T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-710",
    slug: "dog-cat-probiotic-strain-guide",
    type: "blog",
    category: 2,
    title: "반려동물 유산균 균주별 효능 — 어떤 균주가 필요한가",
    subtitle: "락토바실러스·엔테로코커스·비피도박테리움 균주 비교, 반려동물 유산균 선택 기준",
    metaTitle: "반려동물 유산균 균주 종류 — 개·고양이 장 건강에 맞는 선택법 | 펫지기",
    metaDescription: "반려동물 유산균 균주별 효능 비교. 락토바실러스·비피도박테리움·엔테로코커스 차이, 강아지·고양이 장 건강 연구 근거, 제품 선택 기준을 정리했습니다.",
    body: `<p>반려동물 유산균 제품은 수없이 많다. 그러나 모든 균주가 동일한 효능을 가지는 건 아니다. 어떤 균주가 왜 중요한지 알면 현명한 선택이 가능하다.</p>

<h2>왜 균주가 중요한가</h2>
<p>유산균의 효능은 균종(종류)이 아니라 균주(strain) 수준에서 다르다. 같은 락토바실러스라도 균주에 따라 효능, 장 생착률, 적용 대상이 달라진다. 반려동물에서 효능이 확인된 균주와 사람용 균주도 구분된다.</p>

<h2>주요 균주별 특징</h2>
<div class="callout-dog">
<strong>반려동물 유산균 주요 균주</strong><br>
• <strong>Enterococcus faecium SF68</strong>: 강아지 설사 예방·치료 근거 다수, 동물 임상 연구 풍부<br>
• <strong>Lactobacillus rhamnosus GG</strong>: 항생제 관련 설사 예방에 근거, 사람·동물 연구 있음<br>
• <strong>Bifidobacterium animalis AHC7</strong>: 강아지 급성 설사 기간 단축 연구 있음<br>
• <strong>Lactobacillus acidophilus</strong>: 광범위 사용, 고양이·강아지 장 건강 보조
</div>

<h2>반려동물 전용 vs 사람용 유산균</h2>
<ul>
<li>사람용 유산균도 독성 없이 급여 가능하나 생착률·효능 불확실</li>
<li>반려동물 전용 제품은 해당 종의 장 환경에 맞게 설계</li>
<li>반려동물 임상 연구가 있는 균주 선택이 바람직</li>
</ul>

<h2>선택 기준</h2>
<ul>
<li>CFU(집락 형성 단위): 제품당 10억~100억 CFU 이상</li>
<li>생균 보장: 유통기한 내 생균 수 보장 표기 확인</li>
<li>보관 조건: 냉장 필요 제품은 냉장 유통 확인</li>
<li>적용 목적: 만성 설사·항생제 치료 중·면역 보조 등 목적에 맞는 균주 선택</li>
</ul>

<h2>마지막으로</h2>
<p>유산균은 꾸준히 먹여야 장 내 환경 유지에 도움이 된다. 급성 소화 장애가 잦다면 수의사와 상의해 적합한 균주를 선택하는 것이 더 효과적이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Bybee, S.N. et al. — Effect of the probiotic Enterococcus faecium SF68 on presence of diarrhea in cats. J Vet Intern Med 2011",
      "한국수의영양학회 반려동물 프로바이오틱스 사용 현황 리뷰",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-05T11:00:00.000Z",
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
  console.log("블로그 포스트 117차 시딩 완료! (blog-706 ~ blog-710)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
