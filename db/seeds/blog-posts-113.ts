import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 113 — cat3×2 + cat1×1 + cat5×1 + cat4×1 = 5편 (IDs 686-690)
// Macros: A, D, B, F, E
// Angles: RA6, RA1, RA8, RA3, RA5

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-686",
    slug: "cat-pleural-effusion-breathing",
    type: "blog",
    category: 3,
    title: "고양이 흉막 삼출 — 갑작스러운 호흡 곤란의 응급 원인",
    subtitle: "흉막 삼출 원인 질환, 응급 증상, 흉강 천자, 삼출액 분석, 근본 원인 치료",
    metaTitle: "고양이 흉막 삼출 — 호흡 곤란 응급 원인·치료·예후 가이드 | 펫지기",
    metaDescription: "고양이 흉막 삼출 원인과 치료. 갑작스러운 호흡 곤란의 응급 원인, 흉강 내 액체 제거(흉강 천자) 방법, 삼출액 종류로 근본 원인 감별, 예후를 설명합니다.",
    body: `<p>고양이가 입을 열고 숨 쉬거나, 배를 크게 움직이며 힘들게 호흡한다면 응급 상황이다. 흉강에 액체가 찬 흉막 삼출이 원인 중 하나다.</p>

<h2>흉막 삼출이란</h2>
<p>흉강(폐와 흉벽 사이)에 비정상적으로 액체가 축적되는 상태다. 액체가 폐를 압박해 정상 팽창을 방해하므로 호흡 곤란이 나타난다.</p>

<h2>원인 질환</h2>
<ul>
<li><strong>심부전</strong>: 심장 압력 상승으로 흉수 형성 (가장 흔한 원인 중 하나)</li>
<li><strong>흉강 내 림프종</strong>: 종격 림프종이 흉수 동반</li>
<li><strong>고양이 전염성 복막염(FIP)</strong>: 삲출성(습식) FIP에서 흉수 발생</li>
<li><strong>유미흉(Chylothorax)</strong>: 림프관 파열로 지방이 풍부한 유미액 축적</li>
<li><strong>농흉(Pyothorax)</strong>: 세균 감염으로 고름 축적</li>
</ul>

<h2>응급 증상 — 즉시 병원으로</h2>
<div class="callout-cat">
<strong>고양이 호흡 응급 신호</strong><br>
• 입을 벌리고 호흡 (고양이는 거의 입으로 숨 쉬지 않음)<br>
• 앞발을 벌리고 목을 뻗은 자세<br>
• 잇몸·혀가 창백하거나 파란색<br>
• 배와 가슴을 크게 움직이며 힘겹게 호흡<br>
▶ 이동 중 스트레스 최소화, 케이지에 안정적으로 이동
</div>

<h2>진단과 치료</h2>
<ul>
<li>흉부 X-ray·초음파: 흉수 확인 및 양 평가</li>
<li>흉강 천자(Thoracocentesis): 즉각적인 액체 제거 → 호흡 개선, 진단 겸용</li>
<li>삼출액 분석: 외관·세포·단백질·세균 검사로 원인 감별</li>
<li>근본 원인 치료: 심부전 약물, 항생제(농흉), 화학요법(림프종), FIP 치료제</li>
</ul>

<h2>예후</h2>
<p>예후는 근본 원인에 따라 크게 다르다. 심부전이나 림프종의 경우 치료로 삶의 질을 유지할 수 있으며, 농흉은 적절한 치료 시 완치 가능하다.</p>

<h2>마지막으로</h2>
<p>고양이 호흡 곤란은 응급이다. "내일 보러 가자"가 목숨을 위협할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Fossum, T.W. — Pleural effusion in the cat. Vet Clin North Am Small Anim Pract 1993",
      "한국수의내과학회 고양이 흉막 삼출 진단 및 치료 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 호흡 곤란 증상 시 즉시 응급 수의사에게 연락하세요.",
    status: "published",
    publishedAt: "2026-12-24T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-687",
    slug: "dog-spleen-mass-benign-vs-malignant",
    type: "blog",
    category: 3,
    title: "강아지 비장 종괴 — 양성과 악성을 구분하는 방법",
    subtitle: "비장 혈관육종 vs 혈종 구분, 비장 종괴 발견 경로, 수술 적응증, 예후 차이",
    metaTitle: "강아지 비장 종괴 — 양성·악성 감별·수술·예후 가이드 | 펫지기",
    metaDescription: "강아지 비장 종괴 양성·악성 감별 방법. 비장 혈관육종 vs 양성 혈종 구분, 급성 내부 출혈 응급 신호, 비장 절제 수술 적응증과 예후를 정리했습니다.",
    body: `<p>강아지 비장에서 종괴가 발견되면 보호자는 극도로 불안해진다. 비장 종괴의 절반은 양성이지만, 나머지 절반은 악성 혈관육종이다. 구분이 중요하다.</p>

<h2>비장 종괴의 두 가지 주요 유형</h2>
<ul>
<li><strong>비장 혈관육종(HSA)</strong>: 가장 흔한 악성 비장 종양, 혈관에서 기원, 내부 출혈 위험 높음, 전이 빠름</li>
<li><strong>양성 결절성 증식 / 혈종</strong>: 악성 없는 혈액이 찬 낭성 구조, 더 좋은 예후</li>
</ul>

<h2>비장 종괴 발견 경로</h2>
<div class="callout-dog">
<strong>비장 종괴 발견 3가지 상황</strong><br>
• <strong>우연 발견</strong>: 건강검진 초음파에서 증상 없이 발견 (예후 상대적으로 좋음)<br>
• <strong>급성 허탈</strong>: 비장 출혈로 갑작스러운 쇼크·복수·창백 — 응급 수술<br>
• <strong>만성 증상</strong>: 무기력·식욕 부진·복부 팽만이 서서히 진행
</div>

<h2>양성 vs 악성 수술 전 감별의 한계</h2>
<ul>
<li>초음파만으로 양성·악성 확진 불가 (형태가 비슷한 경우 많음)</li>
<li>세침흡인(FNA): 출혈 위험과 위음성률로 진단 가치 제한적</li>
<li>확진: 비장 절제 후 조직 검사</li>
</ul>

<h2>수술 결정</h2>
<ul>
<li>종괴가 있고 수술 가능한 상태라면 대부분 비장 절제 권장</li>
<li>수술 전 흉부 X-ray: 폐 전이 여부 확인</li>
<li>수술 전 심장 초음파: 비장 혈관육종은 심장 종양 동반 가능</li>
</ul>

<h2>예후 차이</h2>
<ul>
<li>양성 혈종: 비장 절제 후 완치 가능</li>
<li>비장 혈관육종: 수술만으로 중간 생존 1~2개월, 화학요법 병행 시 4~6개월</li>
</ul>

<h2>마지막으로</h2>
<p>비장 종괴가 발견되면 수술 결정을 미루지 않는 것이 중요하다. 수술 가능한 상태에서 절제하는 것이 출혈 응급보다 훨씬 안전하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Wendelburg, K.M. et al. — Survival time of dogs with splenic masses. J Am Anim Hosp Assoc 2014",
      "한국수의종양학회 강아지 비장 종양 진단 및 치료 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-12-24T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-688",
    slug: "male-vs-female-cat-personality",
    type: "blog",
    category: 1,
    title: "수컷 vs 암컷 고양이 성격 — 중성화 후 실제 차이",
    subtitle: "성별에 따른 행동 경향, 중성화 전·후 변화, 입양 선택 기준, 다묘 가정에서의 궁합",
    metaTitle: "수컷 vs 암컷 고양이 성격 차이 — 중성화 후 현실 가이드 | 펫지기",
    metaDescription: "수컷과 암컷 고양이의 성격 차이를 중성화 전후로 정리했습니다. 스프레이·발정 행동, 중성화 후 성격 변화 현실, 다묘 가정에서의 성별 궁합을 설명합니다.",
    body: `<p>수컷 고양이를 입양할지, 암컷을 입양할지 고민하는 사람이 많다. 성별이 정말 성격을 결정할까? 중성화 후에는 어떻게 달라질까.</p>

<h2>중성화 전 성별 차이 — 중요한 이유</h2>
<ul>
<li><strong>중성화 전 수컷</strong>: 스프레이(마킹) 행동, 방랑 욕구, 다른 수컷과 싸움, 강한 소변 냄새</li>
<li><strong>중성화 전 암컷</strong>: 발정 행동(울음, 뒹굴기), 6~12개월부터 주기적 발정 반복</li>
<li>두 가지 모두 중성화로 크게 감소하거나 사라짐</li>
</ul>

<h2>중성화 후 성격 차이 — 현실</h2>
<div class="callout-cat">
<strong>중성화 후 수컷 vs 암컷 실제 경향</strong><br>
• 수컷: 일반적으로 더 애교스럽고 사교적인 경향<br>
• 암컷: 독립적이고 자기 영역 의식 강한 경향<br>
• 단, 이것은 경향일 뿐 — 개체 차이가 성별 차이보다 훨씬 큼<br>
▶ 중성화 후 성격은 품종, 어린 시절 사회화, 개체 성격이 성별보다 더 큰 영향
</div>

<h2>다묘 가정에서 성별 궁합</h2>
<ul>
<li>같은 성별 여러 마리: 수컷끼리도, 암컷끼리도 다 가능 (중성화 상태에서)</li>
<li>수컷 + 암컷: 가장 갈등이 적다는 일반적인 인식, 그러나 개체 성격이 더 중요</li>
<li>새 고양이 도입: 성별보다 천천히 소개하는 과정이 더 중요</li>
</ul>

<h2>어떤 성별을 선택해야 할까</h2>
<ul>
<li>성별보다 개체의 성격, 보호자와의 궁합 확인이 더 실질적</li>
<li>성묘 입양 시 실제 성격 파악 가능 — 더 예측 가능한 선택</li>
<li>어떤 성별이든 중성화는 건강과 행동 양면에서 권장</li>
</ul>

<h2>마지막으로</h2>
<p>"수컷은 이렇다, 암컷은 저렇다"는 일반화보다 입양하려는 개체를 직접 만나보는 것이 최선이다. 고양이는 각자가 다른 개성을 가진 존재다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국고양이보호협회 고양이 성별 및 중성화 관련 행동 자료",
      "Levine, E. et al. — Source of acquired behavioral problems in domestic cats. J Vet Behav 2005",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-25T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-689",
    slug: "dog-seawater-swimming-dangers",
    type: "blog",
    category: 5,
    title: "강아지 바다 수영 — 해수 음용과 피부 위험",
    subtitle: "해수 음용 위험(나트륨 중독), 피부·귀 관리, 안전한 바다 놀이 준비",
    metaTitle: "강아지 바다 수영 — 해수 음용 나트륨 중독과 피부 케어 | 펫지기",
    metaDescription: "강아지 바다 수영의 위험과 주의사항. 해수 음용으로 인한 나트륨 중독 증상, 피부·귀 관리 방법, 안전하게 바다에서 놀기 위한 준비사항을 정리했습니다.",
    body: `<p>강아지와 바다는 즐거운 조합처럼 보이지만, 준비 없이 가면 위험할 수 있다. 해수 음용과 피부 관리를 알아두자.</p>

<h2>해수 음용 — 나트륨 중독</h2>
<p>바닷물의 염도는 약 3.5%다. 강아지가 수영하면서 무심코 삼키는 해수가 쌓이면 혈중 나트륨 농도가 올라간다.</p>

<ul>
<li><strong>경미한 증상</strong>: 구토, 설사, 무기력</li>
<li><strong>심한 증상</strong>: 신경 증상(비틀거림, 발작), 의식 저하</li>
<li>소형견·소화기 민감한 개: 더 적은 양으로도 증상 발생 가능</li>
</ul>

<h2>해수 음용 예방</h2>
<div class="callout-dog">
<strong>바다 놀이 중 음용 예방</strong><br>
• 신선한 음수 충분히 준비 (바다 가기 전 충분히 마시게 하기)<br>
• 30분마다 쉬게 하고 물 제공<br>
• 흥분해서 파도를 쫓거나 입을 벌리고 달리는 행동 주시<br>
• 해수 음용이 의심되면 즉시 육상으로 올라와 신선한 물 제공<br>
▶ 귀가 후 구토·설사·무기력이 지속되면 수의사 연락
</div>

<h2>피부·귀 관리</h2>
<ul>
<li>소금기: 털에 남으면 건조·자극 → 수영 후 반드시 담수 샤워</li>
<li>귀: 수영 후 귀 안에 물이 남으면 외이염 위험 — 귀 건조 필수</li>
<li>눈: 모래·소금물 자극 → 귀가 후 인공눈물 또는 식염수로 세척</li>
<li>발바닥: 모래·조개 껍데기 상처 확인</li>
</ul>

<h2>수영 전 준비</h2>
<ul>
<li>구명조끼: 수영을 못하는 강아지, 급류가 있는 바다에서 필수</li>
<li>리드줄: 바다에서도 원칙적으로 착용 (안전 구역 확인)</li>
<li>체력 관리: 강아지는 과호흡으로 지침을 표현하지 못할 수 있음</li>
</ul>

<h2>마지막으로</h2>
<p>바다는 강아지에게 큰 즐거움이 될 수 있다. 음수와 피부 관리만 챙기면 훨씬 안전하고 즐거운 하루가 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동·케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물수의사회 여름철 반려동물 안전 관리 지침",
      "Farrow, C.S. — Salt water aspiration in the dog. Vet Radiol Ultrasound 1993",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-25T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-690",
    slug: "getting-new-pet-after-loss",
    type: "blog",
    category: 6,
    title: "펫로스 후 새 반려동물을 들여도 될까",
    subtitle: "적절한 시기 기준, 새 동물이 슬픔을 대체하지 않는 이유, 준비 여부 확인 방법",
    metaTitle: "펫로스 후 새 반려동물 입양 — 적절한 시기와 준비 여부 가이드 | 펫지기",
    metaDescription: "펫로스 후 새 반려동물 입양 시기와 준비 여부를 정리했습니다. '너무 빨리' 입양하면 생기는 문제, 준비됐는지 확인하는 방법, 새 동물과의 관계 시작법을 설명합니다.",
    body: `<p>반려동물을 잃은 후 "언제 새 동물을 들여야 할까?"라는 질문을 스스로에게 던지는 사람이 많다. 이것은 매우 개인적인 질문이다.</p>

<h2>너무 빨리 입양하면 생기는 어려움</h2>
<p>슬픔이 충분히 처리되기 전에 새 동물을 맞이하면 두 가지 위험이 있다. 하나는 새 동물에게 전 동물의 기대를 투영하는 것이고, 다른 하나는 새 동물을 충분히 그 자체로 사랑하지 못하는 것이다. 이것은 새 동물에게도 공평하지 않다.</p>

<h2>준비 여부를 알 수 있는 신호</h2>
<div class="callout-dog">
<strong>새 반려동물을 맞이할 준비가 된 신호</strong><br>
• 전 동물 생각이 슬픔보다 따뜻한 기억으로 다가올 때<br>
• 새 동물이 전 동물을 대체하는 것이 아님을 이해할 때<br>
• 새 동물을 새로운 존재로 받아들일 감정적 여유가 생겼을 때<br>
• 돌봄에 필요한 시간과 에너지가 있을 때<br>
▶ 이 신호들이 모두 갖춰지는 데는 수주~수개월이 걸릴 수 있습니다
</div>

<h2>새 동물은 대체가 아니다</h2>
<p>새 반려동물은 떠난 동물을 대체하는 존재가 아니다. 새로운 관계, 새로운 이름, 새로운 개성을 가진 존재다. 이 사실을 마음으로 받아들였을 때 새로운 반려 관계가 제대로 시작될 수 있다.</p>

<h2>새 동물과의 관계 시작</h2>
<ul>
<li>전 동물과 비교하지 않기 (털 색, 성격, 습관 등)</li>
<li>전 동물의 이름을 새 동물에게 쓰지 않기</li>
<li>새 동물에게 시간과 주의를 충분히 주기</li>
<li>슬픔이 다시 올라오는 것은 정상 — 죄책감 갖지 않기</li>
</ul>

<h2>주변의 압박에 관해</h2>
<p>"빨리 새 동물 들여"라는 주변 이야기가 도움이 되지 않는 경우가 있다. 슬픔의 속도는 각자 다르다. 준비되지 않은 채로 입양하는 것은 동물에게도 보호자에게도 이롭지 않다.</p>

<h2>마지막으로</h2>
<p>언제 새 반려동물을 맞이할지는 오직 당신만이 알 수 있다. 서두르지 않아도 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 상실과 추모 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국펫로스상담협회 펫로스 후 새 반려동물 입양 상담 자료",
      "Lagoni, L. et al. — The Human-Animal Bond and Grief. WB Saunders 1994",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며, 상실의 슬픔이 지속된다면 전문 상담가의 도움을 받으시기 바랍니다.",
    status: "published",
    publishedAt: "2026-12-26T09:00:00.000Z",
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
  console.log("블로그 포스트 113차 시딩 완료! (blog-686 ~ blog-690)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
