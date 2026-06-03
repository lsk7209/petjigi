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
    body: `<p>한 번 고양이 헤르페스 바이러스에 감염되면 평생 잠복 상태로 남는다. 면역이 떨어지거나 스트레스를 받으면 다시 깨어난다.</p>

<h2>FHV-1이란</h2>
<p>고양이 헤르페스 바이러스 1형(FHV-1)은 고양이 상부 호흡기 감염의 주요 원인 중 하나다. 다묘 가정, 보호소 출신 고양이에서 감염률이 높다. 초기 감염 후 삼차신경절에 잠복하며 평생 재활성화 가능성이 있다.</p>

<h2>재발을 유발하는 요인</h2>
<ul>
<li>스트레스(이사, 새 반려동물 도입, 병원 방문)</li>
<li>면역 억제(코르티코스테로이드 투여, 질병)</li>
<li>출산·수유</li>
<li>계절 변화</li>
</ul>

<h2>증상</h2>
<div class="callout-cat">
<strong>FHV-1 재발 시 주요 증상</strong><br>
• 결막염: 눈 충혈, 눈꼽, 눈물 과다<br>
• 각막 궤양: 통증, 눈 감음, 심하면 시력 손상<br>
• 코 분비물, 재채기<br>
• 코막힘으로 인한 식욕 저하<br>
• 발열, 무기력 동반 가능
</div>

<h2>치료</h2>
<ul>
<li>경증: 눈 세정, 보조 치료</li>
<li>각막 궤양: 항바이러스 안약(이독수리딘, 시도포비어)</li>
<li>항바이러스제(팜시클로비르): 심한 재발 시 수의사 처방</li>
<li>세균 이차감염: 항생제 병행</li>
</ul>

<h2>L-라이신 논쟁</h2>
<p>L-라이신 보충제가 FHV-1 재발 억제에 효과적이라는 주장이 오랫동안 유지되었으나, 2015년 체계적 문헌 고찰에서 효과 근거가 부족하다고 결론지었다. 현재는 루틴 사용이 권장되지 않는 추세다.</p>

<h2>마지막으로</h2>
<p>FHV-1 보균 고양이는 스트레스 최소화가 재발 예방의 핵심이다. 재발 시 눈 증상이 악화되면 빠르게 수의사 상담을 받는 것이 시력 보호에 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Thiry, E. et al. — Feline herpesvirus infection. ABCD guidelines on prevention and management. J Feline Med Surg 2009",
      "Bol, S. & Bunnik, E.M. — Lysine supplementation is not effective for the prevention or treatment of feline herpesvirus 1 infection in cats. BMC Vet Res 2015",
    ]),
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
    body: `<p>오프리쉬 놀이터는 강아지에게 최고의 사회화·운동 환경이 될 수 있다. 그러나 준비 없이 가면 싸움과 트라우마의 장소가 될 수도 있다.</p>

<h2>이용 전 준비 사항</h2>
<ul>
<li>최소 기본 명령어(와, 앉아, 기다려) 훈련 완성</li>
<li>예방접종 완료 및 최신 유지</li>
<li>중성화 여부: 수컷 미중성화견은 갈등 유발 위험 높음</li>
<li>발정 중인 암컷: 공원 이용 금지</li>
<li>건강 상태 확인: 기침·설사 등 증상 있으면 방문 자제</li>
</ul>

<h2>강아지의 긴장 신호 읽기</h2>
<div class="callout-dog">
<strong>놀이터에서 위험 신호</strong><br>
• 꼬리를 몸 아래로 말기, 몸을 낮추기<br>
• 귀를 뒤로 납작하게 붙이기<br>
• 입술을 핥거나 하품 반복(칼밍 시그널)<br>
• 몸이 경직되고 응시(스톡킹)<br>
• 울타리 구석으로 피하기<br>
▶ 이 신호가 보이면 자리를 옮기거나 퇴장
</div>

<h2>싸움 예방 방법</h2>
<ul>
<li>처음 만남: 평행 산책으로 인사 → 바로 밀착 인사 금지</li>
<li>무리에게 둘러싸이는 상황: 빠르게 분리</li>
<li>자원(간식·장난감) 공유 주의: 자원 지킴 행동 유발 가능</li>
<li>보호자 군집: 강아지들 집중 관찰 유지</li>
</ul>

<h2>싸움 발생 시 대처</h2>
<ul>
<li>목줄로 잡으려 하지 말 것 (손 부상 위험)</li>
<li>큰 소리, 물 뿌리기로 주의 분산</li>
<li>엉덩이 뒤에서 분리 (목 잡는 것은 교상 위험)</li>
</ul>

<h2>놀이터 에티켓</h2>
<ul>
<li>배설물 즉시 처리</li>
<li>보호자는 스마트폰 내려놓고 개 집중 관찰</li>
<li>처음 온 개에게 다른 개들이 몰리면 보호자가 개입</li>
<li>싸움 이력 있는 개는 별도 공간 이용 고려</li>
</ul>

<h2>마지막으로</h2>
<p>놀이터에서의 좋은 경험이 사회화의 기초를 만든다. 보호자가 개를 잘 관찰하고 개입 타이밍을 놓치지 않는 것이 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 훈련·행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물행동교정사협회 사회화·놀이 가이드라인",
      "American Veterinary Society of Animal Behavior — Position Statement on Puppy Socialization",
    ]),
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
