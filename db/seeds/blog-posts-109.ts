import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 109 — cat3×2 + cat1×1 + cat5×1 + cat6×1 = 5편 (IDs 666-670)
// Macros: D, A, B, F, E
// Angles: RA3, RA1, RA8, RA5, RA2

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-666",
    slug: "dog-thrombocytopenia-guide",
    type: "blog",
    category: 3,
    title: "강아지 혈소판감소증 — 피부 점출혈이 보일 때",
    subtitle: "혈소판감소증 원인, 점출혈·반상출혈 확인 방법, ITP 진단, 치료와 응급 기준",
    metaTitle: "강아지 혈소판감소증(ITP) — 피부 출혈 증상·진단·치료 가이드 | 펫지기",
    metaDescription: "강아지 혈소판감소증 원인과 치료. 피부 점출혈·반상출혈 확인 방법, 면역매개 혈소판감소증(ITP) 진단, 스테로이드 치료, 즉시 내원해야 하는 증상을 정리했습니다.",
    body: `<p>강아지 잇몸·피부에 붉은 점들이 생기거나, 코피가 자주 나거나, 멍이 이유 없이 생긴다면 혈소판 문제를 의심해야 한다.</p>

<h2>혈소판의 역할</h2>
<p>혈소판은 출혈이 생겼을 때 혈전을 형성해 지혈하는 세포다. 혈소판이 급격히 감소하면 사소한 자극에도 출혈이 멈추지 않는다.</p>

<h2>주요 원인</h2>
<ul>
<li><strong>면역매개 혈소판감소증(ITP)</strong>: 면역계가 자신의 혈소판을 파괴, 가장 흔한 원인</li>
<li><strong>진드기 매개 감염</strong>: 에를리키아·아나플라스마</li>
<li><strong>약물 반응</strong>: 특정 항생제·항염증제</li>
<li><strong>혈관육종·림프종</strong>: 종양에 의한 혈소판 소모</li>
<li><strong>DIC(파종성 혈관 내 응고)</strong>: 전신 응고 이상으로 혈소판 소진</li>
</ul>

<h2>출혈 증상 확인</h2>
<div class="callout-dog">
<strong>즉시 동물병원으로 가야 하는 출혈 신호</strong><br>
• 잇몸·혀의 붉은 점들 (점출혈, Petechiae)<br>
• 피부 넓은 멍 (반상출혈, Ecchymosis)<br>
• 코피가 멈추지 않음<br>
• 소변·대변에 혈액 혼합<br>
• 눈 흰자의 붉은 반점<br>
▶ 혈소판 수치가 매우 낮으면 뇌 출혈 위험도 있습니다
</div>

<h2>진단</h2>
<ul>
<li>CBC: 혈소판 수치 확인 (정상 200,000~500,000/μL, 위험 &lt;20,000/μL)</li>
<li>혈액 도말: 혈소판 형태·응집 확인</li>
<li>진드기 매개 감염 PCR/항체 검사</li>
<li>골수 검사: 혈소판 생산 이상 여부 확인 (필요 시)</li>
</ul>

<h2>치료</h2>
<ul>
<li>ITP: 고용량 스테로이드(프레드니솔론) ± 아자티오프린</li>
<li>진드기 매개: 독시사이클린 항생제 치료</li>
<li>심한 출혈: 수혈(혈소판 풍부 혈장 또는 전혈)</li>
<li>활동 제한: 출혈 위험 최소화</li>
</ul>

<h2>마지막으로</h2>
<p>출혈 증상은 혈소판감소증의 가시적 신호다. 잇몸이나 피부에서 점출혈이 보이면 당일 수의사 진료가 원칙이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Grindem, C.B. et al. — Immune-mediated thrombocytopenia in dogs. Compend Contin Educ Vet 2002",
      "한국수의내과학회 혈액 질환 진단 및 치료 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 출혈 증상 발생 시 즉시 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-12-14T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-667",
    slug: "cat-lymphoma-most-common-cancer",
    type: "blog",
    category: 3,
    title: "고양이 림프종 — 고양이 암 1위의 특징과 치료",
    subtitle: "림프종 유형(소화기·종격·결절), 증상, 진단 방법, 화학요법 반응률, 예후",
    metaTitle: "고양이 림프종 — 유형·증상·화학요법·예후 완전 가이드 | 펫지기",
    metaDescription: "고양이 림프종 원인과 치료. 고양이 암 중 가장 흔한 림프종의 소화기·종격·결절 유형, 증상, 진단 방법, 화학요법 반응률과 예후를 설명합니다.",
    body: `<p>림프종은 고양이에서 가장 흔한 악성 종양이다. 림프절과 림프 조직이 전신에 있기 때문에 어디서나 발생할 수 있으며, 유형에 따라 예후가 크게 다르다.</p>

<h2>주요 유형</h2>
<ul>
<li><strong>소화기 림프종</strong>: 가장 흔한 유형, 소장·대장 발생, 만성 구토·설사·체중 감소</li>
<li><strong>종격 림프종</strong>: 흉강 내 흉선 발생, 호흡 곤란, 젊은 고양이에서 발생 많음 (FeLV 연관)</li>
<li><strong>결절 림프종</strong>: 림프절 전신 확대</li>
<li><strong>신장·척수 등 다른 부위</strong>: 드물게 발생</li>
</ul>

<h2>증상</h2>
<div class="callout-cat">
<strong>림프종 의심 증상</strong><br>
• 지속적인 체중 감소 (수주~수개월)<br>
• 만성 구토 또는 설사 (소화기형)<br>
• 호흡 곤란, 운동 불내성 (종격형)<br>
• 목·겨드랑이·서혜부 림프절 촉지<br>
• 식욕 저하, 무기력<br>
▶ 증상이 비특이적이어서 다른 질환과 감별이 필요합니다
</div>

<h2>진단</h2>
<ul>
<li>신체검사 + CBC·생화학·소변검사</li>
<li>복부·흉부 초음파: 장벽 두께, 림프절 크기 확인</li>
<li>세침흡인(FNA) 또는 조직 생검: 확진</li>
<li>등급 분류(저등급·고등급): 예후 결정에 중요</li>
</ul>

<h2>치료와 반응률</h2>
<ul>
<li><strong>저등급 소화기 림프종</strong>: 경구 클로람부실 + 프레드니솔론, 관해율 높음, 중간 생존 2년 이상 가능</li>
<li><strong>고등급 림프종</strong>: CHOP 기반 다제 화학요법, 반응률 약 70%, 중간 생존 6~9개월</li>
<li><strong>종격 림프종</strong>: 화학요법 반응 빠르나 재발 흔함</li>
</ul>

<h2>마지막으로</h2>
<p>림프종이라는 진단은 무섭지만 저등급 소화기 림프종은 적절한 치료로 수년 이상 좋은 삶의 질을 유지할 수 있다. 조기 진단과 수의종양학 전문가 상담이 예후를 결정한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Vail, D.M. & Young, K.M. — Hematopoietic tumors. Withrow & MacEwen's Small Animal Clinical Oncology 2007",
      "한국수의종양학회 고양이 림프종 진단 및 치료 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-12-14T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-668",
    slug: "mixed-breed-dog-adoption-pros",
    type: "blog",
    category: 1,
    title: "믹스견 입양의 장점과 현실 — 순종견과 무엇이 다른가",
    subtitle: "믹스견의 잡종강세, 성격 예측 가능성, 보호소 입양 연결, 의료비 차이 현실",
    metaTitle: "믹스견 입양 — 순종견과의 차이, 잡종강세, 현실 가이드 | 펫지기",
    metaDescription: "믹스견 입양의 장점과 현실을 정리했습니다. 잡종강세 효과, 성격 예측 가능성, 보호소 믹스견 입양 방법, 순종견과의 의료비·건강 차이를 알아봅니다.",
    body: `<p>믹스견은 국내 보호소 동물의 대다수를 차지한다. 그럼에도 많은 사람들이 순종견을 선택한다. 믹스견 입양의 실제 모습을 살펴보자.</p>

<h2>잡종강세란</h2>
<p>유전학적으로 다양한 유전자 조합은 특정 유전질환 발현 확률을 낮추는 경향이 있다. 이를 잡종강세(Hybrid Vigor)라고 한다. 순종견은 오랜 근친 교배로 특정 유전 질환 발생률이 높아지는 경우가 있다.</p>

<h2>믹스견의 현실적 장점</h2>
<ul>
<li>특정 순종 질환(심장·관절·눈)의 유전적 위험 분산</li>
<li>입양비가 낮거나 없음 (보호소 입양)</li>
<li>보호소 입양으로 생명 구조에 기여</li>
<li>성인견 입양 시 최종 크기·성격 확인 가능</li>
</ul>

<h2>성격·외모 예측의 한계</h2>
<div class="callout-dog">
<strong>믹스견 입양 전 알아야 할 것</strong><br>
• 어린 믹스견의 최종 크기는 예측하기 어려움<br>
• 성격은 부모 견종 특성이 다양하게 혼합됨<br>
• 보호소 입양 시 성인견은 성격 어느 정도 파악 가능<br>
• 퍼피 밀(공장형 번식) 출신 믹스견은 보호소와 다름
</div>

<h2>의료비와 건강</h2>
<ul>
<li>건강 면에서 유전 질환 위험이 낮은 경우 의료비 줄어들 수 있음</li>
<li>예방접종·중성화·기생충 관리는 동일하게 필요</li>
<li>보호소 입양 동물: 입양 전 건강검진 여부 확인 필요</li>
</ul>

<h2>보호소 믹스견 입양 방법</h2>
<ul>
<li>농림축산식품부 동물보호관리시스템(APMS)에서 지역 보호소 확인</li>
<li>지역 유기동물 임시보호 단체 SNS 모니터링</li>
<li>입양 전 1주 이상 임시보호 경험 권장</li>
</ul>

<h2>마지막으로</h2>
<p>순종견과 믹스견 사이에서 옳고 그름은 없다. 중요한 것은 15년을 함께할 준비가 되어 있는가, 그리고 충동적 결정이 아닌가다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국동물복지협회 보호소 동물 입양 현황 보고서",
      "Bellumori, T.P. et al. — Prevalence of inherited disorders in mixed and purebred dogs. JAVMA 2013",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-15T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-669",
    slug: "dog-winter-paw-frostbite-care",
    type: "blog",
    category: 5,
    title: "강아지 겨울 발바닥 동상·저체온증 예방 완전 가이드",
    subtitle: "발바닥 동상 증상, 저체온증 위험 온도·견종, 산책 전 후 케어, 부티·워머 활용",
    metaTitle: "강아지 겨울 발바닥 동상·저체온증 예방 — 산책 케어 가이드 | 펫지기",
    metaDescription: "강아지 겨울 발바닥 동상과 저체온증 예방 방법. 동상 증상 확인법, 고위험 견종, 산책 전후 발바닥 케어, 강아지 부티 착용법과 주의사항을 정리했습니다.",
    body: `<p>겨울 산책은 강아지에게도 즐거운 시간이지만, 발바닥과 체온 관리에 주의하지 않으면 동상이나 저체온증 위험이 생긴다.</p>

<h2>발바닥 동상 — 어떻게 생기나</h2>
<p>발바닥 패드는 피부가 두꺼워 보여도 장시간 영하의 바닥과 접촉하거나 빙판·염화칼슘에 노출되면 동상이 생길 수 있다. 눈 사이 발가락 피부는 특히 취약하다.</p>

<h2>동상 증상 확인</h2>
<div class="callout-dog">
<strong>발바닥 동상 의심 징호</strong><br>
• 귀가 후 발을 핥거나 물어뜯음<br>
• 발바닥 패드 색이 창백하거나 붉게 변함<br>
• 부어오름, 물집<br>
• 걷기를 거부하거나 절뚝거림<br>
▶ 동상 의심 시 따뜻한 물(38~40°C)에 발을 담그고 수의사 연락
</div>

<h2>저체온증 고위험 견종</h2>
<ul>
<li>소형견·단모종: 치와와, 닥스훈트, 프렌치불독</li>
<li>노령견·어린 강아지: 체온 조절 능력 미숙</li>
<li>지방이 적은 마른 체형</li>
<li>심장·갑상선 질환이 있는 경우</li>
</ul>

<h2>산책 전 케어</h2>
<ul>
<li>발바닥 보호크림(포 왁스) 발라주기 — 염화칼슘·빙판 보호</li>
<li>강아지 부티: 착용 거부 시 집에서 충분히 적응 훈련</li>
<li>단모종 소형견: 겨울 의류 착용</li>
</ul>

<h2>산책 후 케어</h2>
<ul>
<li>발바닥과 발가락 사이 눈·얼음 제거</li>
<li>따뜻한 물로 발 씻어 염화칼슘 제거</li>
<li>완전히 건조 후 보호크림 재도포</li>
<li>이상 걸음·발 핥기 확인</li>
</ul>

<h2>마지막으로</h2>
<p>영하 5도 이하의 장시간 산책은 고위험 견종에게는 피하거나 최소화하는 것이 좋다. 산책 시간보다 안전이 우선이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동·케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물수의사회 계절별 반려동물 건강 관리 지침",
      "Mullineaux, E. — Veterinary wildlife casualties. BSAVA Manual 2003",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-15T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-670",
    slug: "pet-belongings-after-loss",
    type: "blog",
    category: 6,
    title: "반려동물 떠난 후 남은 용품 처리 — 버리는 것과 간직하는 것",
    subtitle: "용품 처리 시점 결정, 기증·후원 방법, 간직하는 것의 의미, 정리가 슬픔을 더하지 않으려면",
    metaTitle: "반려동물 사망 후 남은 용품 처리 — 기증·간직·정리 가이드 | 펫지기",
    metaDescription: "반려동물이 떠난 후 남은 용품 처리 방법. 언제 정리할지, 무엇을 기증하고 무엇을 간직할지, 용품이 슬픔을 더하지 않도록 하는 방법을 정리했습니다.",
    body: `<p>반려동물이 떠난 집에는 아직 체온이 남은 것 같은 물건들이 있다. 밥그릇, 장난감, 리드줄, 침대. 이것들을 어떻게 해야 할지 막막한 것은 당연하다.</p>

<h2>"언제" 정리해야 할까</h2>
<p>정답은 없다. 어떤 사람은 며칠 후 정리하는 것이 도움이 되고, 어떤 사람은 수개월이 지나도 그대로 두는 것이 위안이 된다. 슬픔에는 정해진 속도가 없다. 외부 압력이나 "언제까지는 정리해야 한다"는 기준에 따를 필요가 없다.</p>

<h2>버리지 않고 줄 수 있는 곳</h2>
<div class="callout-dog">
<strong>용품 기증·나눔 방법</strong><br>
• 지역 동물 보호소: 미사용 사료·간식·침구류 등 받는 경우 많음<br>
• 지역 유기동물 임시보호 단체: SNS 통해 필요 물품 문의 가능<br>
• 동물 커뮤니티 나눔 게시판: 중고 용품 필요한 보호자에게 직접 전달<br>
▶ 연락 전 해당 단체가 현재 물품을 필요로 하는지 먼저 확인
</div>

<h2>간직하는 것의 의미</h2>
<p>모든 물건을 처분해야 한다는 생각은 잘못이다. 작은 장난감, 목줄, 마지막으로 찍은 사진을 간직하는 것은 슬픔을 부정하는 것이 아니라 기억을 유지하는 건강한 방식이다. 많은 사람들이 추모 공간을 만들어 작은 물건을 놓아두는 것에서 위안을 찾는다.</p>

<h2>정리가 힘들 때</h2>
<ul>
<li>한꺼번에 하지 않아도 된다 — 하나씩 결정하기</li>
<li>믿을 수 있는 사람에게 도움을 청해도 된다</li>
<li>정리 중 울어도 된다 — 그것은 사랑의 증거다</li>
</ul>

<h2>새 동물을 들이기 전</h2>
<p>새 반려동물을 맞이하기 전에 용품을 완전히 정리해야 한다는 규칙은 없다. 다만 새 동물이 이전 동물의 물건에서 익숙하지 않은 냄새를 맡으면 불안해할 수 있어 새로운 용품을 준비하는 것이 현실적이다.</p>

<h2>마지막으로</h2>
<p>남은 물건들은 함께한 시간의 흔적이다. 그것을 어떻게 하든, 그것은 당신의 선택이고 당신의 슬픔이다. 서두르지 않아도 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 상실과 추모 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국펫로스상담협회 반려동물 사별 후 일상 회복 자료",
      "Lagoni, L. et al. — The Human-Animal Bond and Grief. WB Saunders 1994",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며, 상실의 슬픔이 지속된다면 전문 상담가의 도움을 받으시기 바랍니다.",
    status: "published",
    publishedAt: "2026-12-16T09:00:00.000Z",
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
  console.log("블로그 포스트 109차 시딩 완료! (blog-666 ~ blog-670)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
