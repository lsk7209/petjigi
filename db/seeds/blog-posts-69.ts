import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 69 — cat4×2 + cat1×1 + cat3×1 + cat6×1 = 5편 (IDs 466-470)
// Macros: F, A, B, E, D
// Angles: RA5, RA4, RA2, RA8, RA3

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-466",
    slug: "pet-insurance-waiting-period",
    type: "blog",
    category: 4,
    title: "펫보험 대기기간 — 모르면 보험료만 내고 보상 못 받는다",
    subtitle: "질병·사고·특약별 대기기간 차이, 대기기간 중 발생한 질병 처리, 보험사 비교",
    metaTitle: "펫보험 대기기간 완전 해설 — 질병·사고·특약별 비교 | 펫지기",
    metaDescription: "펫보험 대기기간을 제대로 이해하지 못하면 보험료만 내고 보상을 받지 못할 수 있습니다. 질병·사고·특약별 대기기간, 가입 전 확인사항을 정리했습니다.",
    body: `<p>펫보험에 가입했는데 바로 청구하려다 "대기기간 중"이라는 통보를 받는 경우가 있다. 대기기간(Waiting Period)을 미리 이해하고 가입하면 이런 상황을 피할 수 있다.</p>

<h2>대기기간이란</h2>
<p>보험 계약 효력이 시작된 후, 일정 기간 동안은 보험금 청구가 제한되는 기간이다. 이 기간 중 발생한 사고나 질병은 보상받지 못한다. 보험사가 가입 직전 이미 존재하는 질환을 보장하지 않기 위한 제도다.</p>

<h2>항목별 대기기간 (국내 주요 보험사 기준)</h2>
<table>
<thead><tr><th>항목</th><th>일반적 대기기간</th></tr></thead>
<tbody>
<tr><td>사고(골절, 교통사고 등)</td><td>없음 또는 1~3일</td></tr>
<tr><td>일반 질병</td><td>15~30일</td></tr>
<tr><td>슬개골 탈구</td><td>90~180일</td></tr>
<tr><td>치과(치석·발치)</td><td>180일~1년</td></tr>
<tr><td>피부 질환</td><td>30~90일</td></tr>
<tr><td>선천성·유전성 질환</td><td>보상 제외(특약) 또는 180일+</td></tr>
</tbody>
</table>

<h2>대기기간의 함정</h2>
<div class="callout-dog">
<strong>대기기간 중 자주 발생하는 오해</strong><br>
• 대기기간 중 발생한 질환 → 보험 해지 후 재가입해도 면책 사유로 남을 수 있음<br>
• 대기기간 이후 처음 발견된 질환이라도 수의사 소견상 "이전부터 존재했을 가능성" → 거절될 수 있음<br>
• 특약은 기본 대기기간과 다른 별도 대기기간 적용
</div>

<h2>가입 전 확인사항</h2>
<ul>
<li>보험 약관에서 "대기기간"과 "면책 기간" 구분 확인</li>
<li>슬개골 탈구 대기기간 차이 보험사별 비교 (차이가 크다)</li>
<li>기존 질환이 있다면 고지 의무 — 누락 시 전체 보험 무효 가능</li>
<li>가입 시점보다 3~6개월 여유를 두고 가입하면 주요 질환 대기기간 커버 가능</li>
</ul>

<h2>마지막으로</h2>
<p>펫보험은 가입 타이밍이 중요하다. 병이 생기기 전, 젊을 때, 그리고 대기기간을 충분히 넘길 수 있도록 여유를 두고 가입하는 것이 현명하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 펫보험 약관 비교 가이드라인 2023",
      "한국소비자원 반려동물 보험 분쟁 사례 분석 2022",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 보험 내용은 해당 보험사 약관을 확인하세요.",
    status: "published",
    publishedAt: "2026-09-05T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-467",
    slug: "dog-shelter-adoption-process",
    type: "blog",
    category: 1,
    title: "유기견 보호소 입양 절차 — 처음 입양하는 사람이 알아야 할 모든 것",
    subtitle: "입양 신청부터 인수까지 단계, 입양비용, 필요 서류, 첫 날 준비사항",
    metaTitle: "유기견 보호소 입양 절차 완전 가이드 — 신청부터 인수까지 | 펫지기",
    metaDescription: "유기견 보호소 입양 절차를 처음부터 끝까지 정리했습니다. 입양 신청, 필요 서류, 입양 비용, 인수 후 첫날 준비사항까지 알아보세요.",
    body: `<p>유기견 입양을 결심했다면 보호소 방문 전에 절차를 미리 파악하는 것이 좋다. 보호소마다 조금씩 다르지만 전반적인 흐름은 비슷하다.</p>

<h2>입양 가능한 보호소 찾기</h2>
<ul>
<li><strong>동물보호관리시스템(APMS)</strong>: www.animal.go.kr — 전국 유기동물 통합 검색</li>
<li><strong>지자체 동물보호센터</strong>: 각 시군구 보호센터 직접 방문·전화 가능</li>
<li><strong>민간 동물 구조 단체</strong>: 개별 단체별 입양 절차 확인 필요</li>
</ul>

<h2>입양 절차 (공공 보호소 기준)</h2>
<ol>
<li><strong>대상 동물 검색</strong>: APMS 또는 보호소 방문 → 마음에 드는 동물 선택</li>
<li><strong>입양 신청서 작성</strong>: 이름·주소·가족 구성·주거 형태·입양 경험 기재</li>
<li><strong>인터뷰 또는 방문 확인</strong>: 일부 보호소는 가정 방문 실시</li>
<li><strong>입양비 납부</strong>: 지자체별 상이 (보통 5~10만 원 또는 무료)</li>
<li><strong>동물등록</strong>: 마이크로칩 확인 및 보호자 명의로 등록</li>
<li><strong>인수</strong>: 이동장 지참, 기존 사료·장난감 정보 인수인계 받기</li>
</ol>

<h2>필요 서류</h2>
<div class="callout-dog">
<strong>일반적으로 필요한 서류</strong><br>
• 신분증 (본인 확인)<br>
• 주민등록등본 (일부 보호소 요구)<br>
• 임대차계약서 (반려동물 허용 여부 확인용 — 일부 요구)
</div>

<h2>첫날 준비사항</h2>
<ul>
<li>이동장, 목줄·리드줄 (차 이동 시 필수)</li>
<li>기존 먹던 사료 정보 파악 (급격한 사료 전환은 소화 장애 유발)</li>
<li>조용한 공간 확보 (새 환경 적응 위해 자극 최소화)</li>
<li>가까운 동물병원 예약 (입양 후 1주 내 건강 검진 권장)</li>
</ul>

<h2>마지막으로</h2>
<p>입양은 끝이 아니라 시작이다. 보호소 출신 강아지는 새 환경 적응에 시간이 필요하다. 3-3-3 규칙(3일·3주·3개월)을 기억하고 충분한 시간을 주면 훌륭한 가족이 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "농림축산식품부 동물보호관리시스템 이용 안내",
      "한국동물복지협회 입양 가이드라인 2023",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-05T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-468",
    slug: "cat-megacolon-constipation",
    type: "blog",
    category: 3,
    title: "고양이 거대결장과 만성 변비 — 방치하면 수술까지 가는 이유",
    subtitle: "거대결장 원인·증상, 식이 섬유 역할, 관장 vs 수술 판단 기준, 장기 관리",
    metaTitle: "고양이 거대결장·만성 변비 — 원인·치료·장기 관리 가이드 | 펫지기",
    metaDescription: "고양이 만성 변비가 방치되면 거대결장으로 진행될 수 있습니다. 거대결장 원인과 증상, 식이 섬유 역할, 관장과 수술 기준, 장기 관리법을 정리했습니다.",
    body: `<p>고양이가 화장실에서 오래 앉아있거나, 딱딱하고 작은 변을 며칠 간격으로만 본다면 만성 변비를 의심해야 한다. 방치하면 거대결장으로 진행될 수 있다.</p>

<h2>거대결장이란</h2>
<p>만성 변비로 인해 대장이 과도하게 늘어나고, 연동 운동 기능이 손상되는 상태다. 한번 거대결장이 되면 대장 기능이 회복되지 않는 경우가 많아 평생 관리 또는 수술이 필요하다.</p>

<h2>원인</h2>
<ul>
<li>만성 탈수 (건식 사료 위주, 음수량 부족)</li>
<li>비만 (운동 부족, 대장 기능 저하)</li>
<li>척수·신경 손상</li>
<li>골반 협착 (골절 후 변형)</li>
<li>메가콜론 특발성 (원인 불명)</li>
</ul>

<h2>증상</h2>
<div class="callout-cat">
<strong>만성 변비·거대결장 주요 증상</strong><br>
• 3~4일 이상 배변 없음<br>
• 화장실에서 힘을 주지만 변이 나오지 않음<br>
• 딱딱하고 건조한 소량 변<br>
• 식욕 감소·구토 동반<br>
• 복부 만졌을 때 딱딱한 변 덩어리 촉진
</div>

<h2>식이 관리</h2>
<ul>
<li><strong>수분 증가</strong>: 습식 사료 전환 또는 혼합 급여가 핵심</li>
<li><strong>섬유소</strong>: 호박 퓌레 소량 추가, 처방 섬유식 사료 활용</li>
<li><strong>수분 섭취 유도</strong>: 순환 급수기(흐르는 물) 설치</li>
</ul>

<h2>수의사 치료 옵션</h2>
<ul>
<li>경미한 변비: 완하제(락툴로스), 장운동 촉진제</li>
<li>중증 변비: 마취 후 관장 (manual evacuation)</li>
<li>거대결장 확정: 아결장술(subtotal colectomy) — 대장 일부 제거</li>
</ul>

<h2>마지막으로</h2>
<p>고양이 변비는 "며칠 못 싸면 괜찮다"는 생각이 위험하다. 3일 이상 배변이 없으면 수의사 확인이 필요하다. 수분 충분한 식이, 운동, 체중 관리가 예방의 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Washabau, R.J. — Feline Constipation and Idiopathic Megacolon. Consultations in Feline Internal Medicine 2010",
      "한국고양이수의사회 소화기 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-06T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-469",
    slug: "pet-insurance-dental-coverage",
    type: "blog",
    category: 4,
    title: "펫보험 치과 보장 — 치석 제거와 발치는 보상받을 수 있을까",
    subtitle: "치과 보장 범위, 예방적 처치 vs 치료 차이, 치과 보장 특약 포함 보험 비교",
    metaTitle: "펫보험 치과 보장 — 치석 제거·발치 보상 여부와 보험 비교 | 펫지기",
    metaDescription: "펫보험에서 치석 제거, 발치, 치주 질환이 보상되는지 알아보세요. 예방적 처치와 치료의 차이, 치과 보장 특약 포함 보험 비교를 정리했습니다.",
    body: `<p>동물병원에서 치석 제거 비용이 20~60만 원에 이른다는 것을 알고 펫보험 치과 보장을 찾아보는 분들이 많다. 그런데 현실은 생각보다 복잡하다.</p>

<h2>일반 펫보험의 치과 처리</h2>
<p>대부분의 기본형 펫보험은 치과 처치를 보장하지 않는다. "예방적 처치"로 분류되기 때문이다. 치석 제거(스케일링)는 질병 치료가 아닌 위생 관리로 보는 시각이 지배적이다.</p>

<h2>치과 보장 범위가 있는 경우</h2>
<div class="callout-dog">
<strong>치과 보장 특약 포함 시 주요 보상 항목</strong><br>
• 치주 질환으로 인한 발치 (단, 단순 치석 제거 제외)<br>
• 외상성 파절 (사고로 이가 부러진 경우)<br>
• 치수 감염·농양 치료<br>
• 구강 종양 수술<br>
▶ "예방적 스케일링"은 대부분 제외
</div>

<h2>보험사별 치과 보장 차이</h2>
<p>2023년 기준, 국내 주요 펫보험사 중 치과 특약을 제공하는 곳은 일부에 불과하다. 특약 포함 시 대기기간은 보통 180일~1년으로 길다. 이미 치과 질환이 있는 경우 가입 자체가 거절되거나 해당 항목이 면책될 수 있다.</p>

<h2>비용 현실</h2>
<ul>
<li>스케일링(치석 제거): 20~60만 원 (마취 필요)</li>
<li>단순 발치: 5~20만 원 (치아당)</li>
<li>치주 수술: 50~150만 원</li>
<li>구강 종양 제거: 100만 원 이상</li>
</ul>

<h2>마지막으로</h2>
<p>치과 보장을 원한다면 반드시 특약 내용과 대기기간을 확인해야 한다. 예방적 스케일링은 보험보다 적립식 치과 관리비 계획으로 접근하는 것이 현실적이다. 치아 건강 유지를 위한 정기 칫솔질이 비용 절감의 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "금융감독원 펫보험 비교공시 2023",
      "한국소비자원 펫보험 치과 분쟁 사례 2022",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 보장 내용은 해당 보험사 약관을 확인하세요.",
    status: "published",
    publishedAt: "2026-09-06T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-470",
    slug: "cat-euthanasia-preparation",
    type: "blog",
    category: 6,
    title: "고양이 안락사 — 결정 전에 알아야 할 것들",
    subtitle: "안락사 적절한 시점 판단, 절차와 현장 분위기, 보호자의 마음 준비",
    metaTitle: "고양이 안락사 결정 전 알아야 할 것 — 시점·절차·마음 준비 | 펫지기",
    metaDescription: "고양이 안락사 결정은 가장 어려운 선택입니다. 적절한 시점 판단 기준, 절차와 현장 분위기, 보호자의 마음 준비 방법을 조심스럽게 정리했습니다.",
    body: `<p>고양이 안락사 결정은 보호자로서 해야 하는 가장 무거운 선택이다. 이 글은 그 결정을 재촉하려는 것이 아니라, 이미 그 선택을 고민 중인 분들이 조금 더 준비될 수 있도록 쓰였다.</p>

<h2>안락사를 고려하는 시점</h2>
<p>통증 조절이 어렵고, 먹지 않으며, 스스로 움직이거나 배변·배뇨를 하지 못할 때 — 고양이의 삶의 질이 유지되지 않는다는 신호다. 수의사와 함께 삶의 질 평가표(Quality of Life Scale)를 사용하면 보다 객관적으로 판단할 수 있다.</p>

<h2>결정이 어려운 이유</h2>
<p>"아직 눈을 뜨고 있어서", "조금은 먹어서" — 마지막 희망을 붙잡고 싶은 마음은 당연하다. 그러나 많은 수의사들은 "너무 일찍 보내는 것보다 너무 늦게 보내는 것이 더 많다"고 말한다. 결정을 늦추는 것이 사랑이 아닐 수 있다.</p>

<h2>절차와 현장 분위기</h2>
<div class="callout-cat">
<strong>안락사 절차 (일반적 흐름)</strong><br>
1. 진정제 투여 — 고양이가 평온하게 잠드는 상태<br>
2. 안락사 약물 정맥 투여 — 수초 내 심장 정지<br>
3. 수의사가 심박 정지 확인<br><br>
보호자는 함께 있을 수 있으며, 고통 없이 진행된다.
</div>

<h2>사후 처리</h2>
<ul>
<li>동물병원 위탁 화장 (공영 또는 사설 동물 장례식장)</li>
<li>가정 매장 (허용 지역 확인 필요)</li>
<li>유골 분골·수목장·해양 산골 등</li>
</ul>

<h2>보호자의 마음</h2>
<p>안락사 후 죄책감을 느끼는 것은 매우 정상적인 반응이다. "내가 너무 일찍 보낸 건 아닐까" — 하지만 그 결정은 고통을 연장하지 않겠다는 사랑의 표현이었다. 충분히 슬퍼해도 된다. 펫로스 증후군은 실제 슬픔이고, 충분한 애도 기간이 필요하다.</p>

<h2>마지막으로</h2>
<p>이 글을 읽고 있다면, 이미 당신의 고양이를 깊이 사랑하고 있다는 뜻이다. 어떤 결정을 내리든, 그것이 사랑에서 나온 것이라면 옳은 결정이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Villalobos, A.E. — Quality of Life Scale for Pets (HHHHHMM). Oncology Outlook 2004",
      "한국수의사회 동물 안락사 지침",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-07T09:00:00.000Z",
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
  console.log("블로그 포스트 69차 시딩 완료! (blog-466 ~ blog-470)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
