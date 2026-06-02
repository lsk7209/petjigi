import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 92 — cat3×1 + cat5×2 + cat2×1 + cat4×1 = 5편 (IDs 581-585)
// Macros: A, D, F, B, G
// Angles: RA1, RA4, RA3, RA6, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-581",
    slug: "cat-toxoplasmosis-guide",
    type: "blog",
    category: 3,
    title: "고양이 톡소플라즈마 — 임신부 위험, 실제 감염 확률, 올바른 예방",
    subtitle: "톡소플라즈마 전파 경로, 임신부 실제 위험도, 고양이를 포기할 필요 없는 이유",
    metaTitle: "고양이 톡소플라즈마 — 임신부 위험도·전파 경로·예방 완전 가이드 | 펫지기",
    metaDescription: "고양이 톡소플라즈마와 임신부 위험에 대한 사실. 실제 전파 경로, 임신부의 실제 위험도, 고양이를 포기하지 않고 예방하는 방법을 정리했습니다.",
    body: `<p>"임신했으니 고양이를 버려야 한다"는 말을 들은 임신부 보호자가 많다. 그러나 이것은 과도한 공포에서 나온 말이다. 실제 위험과 예방법을 알면 함께 살 수 있다.</p>

<h2>톡소플라즈마란</h2>
<p>원충 기생충(Toxoplasma gondii)으로, 고양이가 최종 숙주다. 감염된 고양이의 분변에서 난포낭(oocyst)이 배출된다. 태아에게 위험할 수 있어 임신부에서 주의가 필요하다.</p>

<h2>실제 감염 경로와 확률</h2>
<div class="callout-cat">
<strong>주요 감염 경로 (순위)</strong><br>
1위: 덜 익힌 육류 섭취 — 압도적으로 가장 흔한 경로<br>
2위: 정원 흙·오염된 토양 접촉<br>
3위: 고양이 변 청소 — 오염된 분변 48시간 이내 처리 시 난포낭 미성숙으로 위험 낮음<br>
▶ 실내 생활 고양이 + 사료만 먹이는 경우 오염 가능성 매우 낮음
</div>

<h2>임신부를 위한 현실적 예방</h2>
<ul>
<li>화장실 청소는 다른 가족이 담당</li>
<li>불가피하면 고무장갑 + 즉시 손 씻기</li>
<li>분변 24~48시간 내 제거 (난포낭 성숙 전)</li>
<li>완전 익힌 육류만 섭취</li>
<li>임신 전 혈청 검사로 기존 면역 여부 확인</li>
</ul>

<h2>고양이를 포기할 필요 없는 이유</h2>
<p>실내에서 사료만 먹는 고양이가 톡소플라즈마를 보유할 가능성은 매우 낮다. 예방 수칙만 지키면 임신부도 고양이와 함께 살 수 있다. 산부인과 의사와 상담해 혈청 검사 결과를 확인하는 것이 가장 정확한 판단 기준이다.</p>

<h2>마지막으로</h2>
<p>톡소플라즈마 위험은 실재하지만 과장되어 있다. 덜 익힌 고기를 먹지 않는 것이 고양이 포기보다 훨씬 효과적인 예방이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Jones, J.L. & Dubey, J.P. — Toxoplasmosis in pregnant women: epidemiology and public health implications. Parasitol Res 2012",
      "질병관리청 톡소플라즈마 감염 안내",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 임신부는 산부인과 의사와 상담하세요.",
    status: "published",
    publishedAt: "2026-11-01T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-582",
    slug: "dog-loose-leash-walking",
    type: "blog",
    category: 5,
    title: "강아지 느슨한 리드줄 산책 훈련 — 끌고 다니지 않고 함께 걷기",
    subtitle: "끌기 왜 생기는가, 멈추기·방향 전환·보상 기반 훈련, 단계별 프로세스",
    metaTitle: "강아지 느슨한 리드줄 훈련 — 함께 걷는 산책 만들기 | 펫지기",
    metaDescription: "강아지가 산책 중 끄는 문제를 해결하는 방법. 끌기 원인, 멈추기·방향 전환·보상 기반 훈련 방법, 일관성 있는 단계별 프로세스를 정리했습니다.",
    body: `<p>산책이 강아지에게 끌려다니는 시간이 됐다면, 훈련이 필요하다. 끌기는 강아지가 '나쁜 것'이 아니라 보상받은 행동이다.</p>

<h2>왜 끄는가</h2>
<p>강아지는 앞으로 나갔을 때 원하는 곳에 도달했다는 경험을 학습한다. 보호자가 이끌리면서 따라갔다면 끌기가 보상받은 것이다. 끌기는 습관이 아닌 학습된 행동이다.</p>

<h2>느슨한 리드줄 훈련 원칙</h2>
<div class="callout-dog">
<strong>핵심 원칙</strong><br>
• 리드줄이 팽팽해지는 순간 멈추기 (전진 보상 차단)<br>
• 느슨해지면 즉시 전진 + 간식 보상<br>
• 방향 전환: 강아지가 앞서면 반대 방향으로 돌아서기<br>
• 보호자 옆에 있을 때를 '좋은 것'으로 연결
</div>

<h2>단계별 훈련</h2>
<ul>
<li><strong>실내 시작</strong>: 자극 없는 환경에서 기초 훈련 (걷다 멈추기·보상)</li>
<li><strong>조용한 야외</strong>: 자극이 적은 곳에서 확장</li>
<li><strong>일반 야외</strong>: 자극이 있는 환경으로 점진적 전환</li>
<li>각 단계에서 성공률 80% 이상이면 다음 단계로</li>
</ul>

<h2>일관성의 중요성</h2>
<p>산책 중 가끔 끌어도 허용하면 훈련이 무너진다. 모든 가족이 동일한 기준으로 일관하게 적용해야 효과가 나타난다. 시간은 걸리지만 반드시 된다.</p>

<h2>마지막으로</h2>
<p>느슨한 리드줄 훈련은 강아지 훈련 중 가장 시간이 걸리는 것 중 하나다. 그러나 매일 조금씩 꾸준히 하면 몇 주 내에 눈에 띄게 달라진다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Pryor, K. — Don't Shoot the Dog. Bantam Books 2002",
      "한국반려동물행동상담협회 리드줄 훈련 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-02T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-583",
    slug: "dog-nosework-puzzle-enrichment",
    type: "blog",
    category: 5,
    title: "강아지 노즈워크 & 퍼즐 게임 — 15분이 2시간 운동에 맞먹는 이유",
    subtitle: "노즈워크의 효과, 집에서 시작하는 방법, 난이도별 퍼즐 게임, 문제 행동 예방",
    metaTitle: "강아지 노즈워크·퍼즐 게임 — 집에서 15분 정신 자극 완전 가이드 | 펫지기",
    metaDescription: "강아지 노즈워크와 퍼즐 게임이 신체 운동보다 효과적인 이유. 집에서 시작하는 방법, 난이도별 퍼즐 게임, 파괴 행동·짖음 예방 효과를 정리했습니다.",
    body: `<p>노즈워크 30분은 달리기 2시간에 맞먹는 정신적 피로를 준다는 연구 결과가 있다. 몸만 지치게 하는 운동보다 뇌를 사용하게 하는 것이 더 효과적이다.</p>

<h2>노즈워크란</h2>
<p>강아지의 후각을 사용해 숨겨진 먹이나 물건을 찾는 활동이다. 강아지 코에는 3억 개 이상의 후각 수용체가 있어, 냄새 맡는 것 자체가 극도의 집중과 피로를 만든다.</p>

<h2>집에서 시작하는 방법</h2>
<div class="callout-dog">
<strong>노즈워크 입문 3단계</strong><br>
1단계: 손에 간식 숨기고 두 손 내밀기 → 어느 쪽인지 찾게<br>
2단계: 종이컵 3개에 하나씩 간식 숨기기 → 찾아라<br>
3단계: 방 안 여러 곳에 간식 숨기기 → 탐색 놀이<br>
▶ "찾아" 신호어 가르치기 → 나중에 명령 가능
</div>

<h2>난이도별 퍼즐 게임</h2>
<ul>
<li><strong>입문</strong>: 리키맷·콩(간식 채우기), 스너플 매트</li>
<li><strong>중급</strong>: 슬라이드·레버 퍼즐 장난감</li>
<li><strong>고급</strong>: 다단계 퍼즐, 특정 박스 열기</li>
<li><strong>고급+</strong>: 물건 이름 학습 (취미 수준의 훈련)</li>
</ul>

<h2>행동 문제 예방 효과</h2>
<ul>
<li>파괴 행동: 지루함 해소로 감소</li>
<li>과도한 짖음: 에너지 소진으로 감소</li>
<li>분리불안 보조: 혼자 있을 때 노즈워크 도구 제공</li>
</ul>

<h2>마지막으로</h2>
<p>노즈워크는 장비가 필요 없다. 간식과 손바닥만 있으면 지금 당장 시작할 수 있다. 강아지가 오늘 집중해서 무언가를 찾아냈다면, 그게 최고의 정신 자극이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Duranton, C. & Horowitz, A. — Let me sniff! Nosework induces positive judgment bias in pet dogs. Applied Animal Behaviour Science 2019",
      "한국반려동물행동상담협회 노즈워크 교육 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-02T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-584",
    slug: "cat-wet-food-selection-guide",
    type: "blog",
    category: 2,
    title: "고양이 습식 사료 선택 기준 — 라벨을 읽지 않으면 모르는 것들",
    subtitle: "습식 사료 등급, 성분 순위 읽기, 그레이비 vs 파테 vs 청크 차이, 칼로리 비교",
    metaTitle: "고양이 습식 사료 선택 — 라벨 읽기·등급·질감 비교 가이드 | 펫지기",
    metaDescription: "고양이 습식 사료를 올바르게 선택하는 방법. 성분 라벨 읽는 법, 그레이비·파테·청크·무스 차이, 칼로리 밀도 비교, 좋은 사료 기준을 정리했습니다.",
    body: `<p>습식 사료를 주기로 했는데 종류가 너무 많다. 라벨을 읽을 수 있으면 선택이 쉬워진다.</p>

<h2>성분 순위 읽기</h2>
<p>성분은 함량 기준 내림차순으로 표기된다. 첫 번째 성분이 가장 많이 들어있다. 이상적인 습식 사료는 첫 번째 성분이 실제 육류(닭고기, 연어 등)여야 한다.</p>

<h2>피해야 할 성분 표기</h2>
<div class="callout-cat">
<strong>습식 사료 라벨 주의 표기</strong><br>
• "육류 부산물" 단독 기재 — 원료 불투명<br>
• 물·전분·밀가루가 1~2위 — 단백질보다 수분 충전 성분<br>
• 소금·설탕·MSG 첨가<br>
• "자연" 표기만 있고 AAFCO 인증 없음
</div>

<h2>질감별 차이</h2>
<table>
<thead><tr><th>종류</th><th>특징</th><th>적합 고양이</th></tr></thead>
<tbody>
<tr><td>파테(Pâté)</td><td>부드러운 덩어리, 수분 적음</td><td>키튼·노령묘·이빨 약한 묘</td></tr>
<tr><td>그레이비</td><td>소스 있음, 기호성 높음</td><td>식욕 감소 고양이</td></tr>
<tr><td>청크(Chunk)</td><td>작은 조각, 씹는 질감</td><td>씹기를 선호하는 고양이</td></tr>
<tr><td>무스(Mousse)</td><td>에어 텍스처, 매우 부드러움</td><td>어린 키튼</td></tr>
</tbody>
</table>

<h2>칼로리 밀도</h2>
<ul>
<li>습식 사료: 100g당 70~100kcal (수분이 많아 낮음)</li>
<li>그레이비 타입: 파테보다 낮은 칼로리 (소스에 수분 많음)</li>
<li>과체중 고양이: 그레이비 타입이 포만감 유지에 유리</li>
</ul>

<h2>마지막으로</h2>
<p>습식 사료는 건식보다 단가가 높지만, 수분 공급·기호성·단백질 함량에서 많은 고양이에게 유리하다. 라벨 보는 법 하나를 익히면 수십 가지 제품 중 좋은 것을 고를 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AAFCO — Pet Food Labeling Requirements 2023",
      "한국수의영양학회 고양이 습식 사료 영양 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-03T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-585",
    slug: "lost-pet-recovery-guide",
    type: "blog",
    category: 4,
    title: "반려동물 분실·도난 시 법적 대처와 실전 찾기 방법",
    subtitle: "분실 직후 행동 순서, 도난 시 법적 고발, APMS 신고, SNS 활용 전략",
    metaTitle: "반려동물 분실·도난 대처 — 법적 고발·신고·찾기 실전 가이드 | 펫지기",
    metaDescription: "반려동물을 잃어버리거나 도난당했을 때 대처 방법. 분실 직후 행동 순서, 도난 시 형사 고발, APMS 신고, SNS 활용 실전 전략을 정리했습니다.",
    body: `<p>반려동물이 사라졌다. 패닉 상태에서 무엇부터 해야 할지 모르는 경우가 많다. 미리 알아두면 골든 타임을 놓치지 않는다.</p>

<h2>분실 직후 행동 순서</h2>
<ol>
<li>사라진 장소 반경 500m 즉시 탐색</li>
<li>동물보호관리시스템(APMS) 실종 신고 등록 (www.animal.go.kr)</li>
<li>인근 동물병원·보호소 연락 (마이크로칩 번호 공유)</li>
<li>SNS 게시 + 지역 커뮤니티 (당근마켓·네이버 카페)</li>
<li>전단지 주변 30~50장 배포</li>
</ol>

<h2>도난 시 법적 대처</h2>
<div class="callout-dog">
<strong>반려동물 도난 법적 접근</strong><br>
• 형법상 재물 절도죄 (민법상 동물 = 물건) 적용<br>
• 경찰에 절도 신고: CCTV·목격자 확보 후 고발장 제출<br>
• 마이크로칩 등록 여부: 소유권 증명에 결정적 역할<br>
• 거래 플랫폼에서 발견 시 게시물 캡처 + 신고
</div>

<h2>SNS 활용 전략</h2>
<ul>
<li>사진: 최소 3장(정면·측면·특징 부위)</li>
<li>정보: 사라진 날짜·장소·마이크로칩 번호·연락처</li>
<li>공유 요청: 인근 지역 커뮤니티·지역 동물보호 단체</li>
<li>당근마켓 동네 게시물: 반경 3km 설정</li>
</ul>

<h2>마이크로칩의 결정적 역할</h2>
<p>보호소에 입소한 동물은 마이크로칩 스캔으로 바로 보호자 확인이 가능하다. 마이크로칩 미등록이거나 정보가 구식이면 연락이 안 된다. 이 사례가 마이크로칩 정보 갱신의 이유다.</p>

<h2>마지막으로</h2>
<p>반려동물 분실의 골든 타임은 24~48시간이다. 빠를수록 발견 가능성이 높다. 지금 APMS에 마이크로칩 정보가 최신인지 확인해두는 것만으로 준비가 된 것이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "농림축산식품부 동물보호관리시스템 분실 신고 안내",
      "한국동물복지협회 반려동물 찾기 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-03T11:00:00.000Z",
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
  console.log("블로그 포스트 92차 시딩 완료! (blog-581 ~ blog-585)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
