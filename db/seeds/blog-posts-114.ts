import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 114 — cat3×2 + cat2×1 + cat4×1 + cat5×1 = 5편 (IDs 691-695)
// Macros: D, A, G, C, F
// Angles: RA2, RA5, RA3, RA7, RA8

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-691",
    slug: "dog-chronic-liver-disease-diet",
    type: "blog",
    category: 3,
    title: "강아지 만성 간질환 — 진행 단계와 식이 관리",
    subtitle: "간 기능 저하 단계, 간성뇌증 위험, 식이 단백질 조절, 수용성 비타민 보충",
    metaTitle: "강아지 만성 간질환 — 진행 단계·식이 관리·간성뇌증 가이드 | 펫지기",
    metaDescription: "강아지 만성 간질환 진행 단계와 식이 관리. 간 기능 저하 징후, 간성뇌증 위험과 단백질 조절, 수용성 비타민·항산화 보충, 처방 사료 선택 방법을 설명합니다.",
    body: `<p>강아지 만성 간질환은 천천히 진행하다 상당한 손상이 생긴 후에야 증상이 나타나는 경우가 많다. 조기 발견과 식이 관리가 진행을 늦추는 핵심이다.</p>

<h2>간 기능 저하 주요 증상</h2>
<ul>
<li>식욕 부진, 체중 감소</li>
<li>구토, 설사</li>
<li>황달 (눈 흰자·잇몸·피부 노랗게)</li>
<li>복수 (배가 부어오름)</li>
<li>과도한 음수·배뇨</li>
<li>신경 증상 (간성뇌증): 방향 감각 상실, 선회 행동</li>
</ul>

<h2>간성뇌증 — 식이 관리가 중요한 이유</h2>
<div class="callout-dog">
<strong>간성뇌증과 단백질 관리</strong><br>
• 손상된 간이 단백질 대사 산물(암모니아)을 처리하지 못함<br>
• 암모니아 축적 → 뇌 기능 이상<br>
• 단백질을 완전히 제거하면 오히려 근육 소실<br>
• 식물성 단백질(콩·두부) + 유제품 단백질: 암모니아 생성 적음<br>
▶ 단백질 종류·양 조절은 반드시 수의사 지침에 따라
</div>

<h2>간 질환 식이 원칙</h2>
<ul>
<li>소화 잘 되는 적정 단백질: 완전 제한이 아닌 종류 조절</li>
<li>지방: 담즙 기능 저하 시 제한, 간성뇌증 없으면 일반 수준 유지</li>
<li>수용성 비타민(B군, C): 간 손상 시 소실 증가, 보충 필요</li>
<li>아연: 간 기능 보호, 결핍 시 보충</li>
<li>SAMe·실리마린(밀크씨슬): 간 보호 보충제, 수의사 상담 후</li>
</ul>

<h2>처방 간 사료</h2>
<ul>
<li>수의사 처방 간 질환 전용 사료 사용 권장</li>
<li>일반 저단백 사료와 처방 간 사료는 성분 구성이 다름</li>
<li>처방 사료로의 전환은 천천히 진행 (소화기 적응)</li>
</ul>

<h2>마지막으로</h2>
<p>간 질환 강아지의 식이 관리는 단순히 "특정 성분 줄이기"가 아니라 전체 영양 균형을 재조정하는 과정이다. 수의 영양 전문가의 도움을 받자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Center, S.A. — Nutritional support for dogs and cats with hepatobiliary disease. J Nutr 1998",
      "한국수의내과학회 강아지 만성 간질환 진단 및 관리 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-12-26T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-692",
    slug: "cat-conjunctivitis-home-vs-vet",
    type: "blog",
    category: 3,
    title: "고양이 결막염 — 집에서 할 수 있는 것과 없는 것",
    subtitle: "결막염 원인, 경증 증상 집에서 할 수 있는 것, 즉시 내원 기준, 처방 안약 사용",
    metaTitle: "고양이 결막염 — 집에서 할 수 있는 것·없는 것·내원 기준 | 펫지기",
    metaDescription: "고양이 결막염 집에서 할 수 있는 관리법과 즉시 내원해야 하는 기준. 결막염 원인, 경증 증상 가정 관리, 처방 안약 없이 사람 안약을 쓰면 안 되는 이유를 설명합니다.",
    body: `<p>고양이 눈에 분비물이 생기거나 충혈이 있으면 결막염을 의심한다. 어느 정도는 집에서 관리할 수 있지만, 경계를 정확히 알아야 한다.</p>

<h2>고양이 결막염 원인</h2>
<ul>
<li><strong>고양이 헤르페스바이러스(FHV-1)</strong>: 가장 흔한 원인, 스트레스·면역 저하 시 재발</li>
<li><strong>클라미디아 felis</strong>: 세균성, 주로 편측 또는 양측 결막염</li>
<li><strong>마이코플라스마</strong>: 세균성 결막염</li>
<li><strong>알레르기·자극</strong>: 먼지, 담배 연기, 방향제</li>
</ul>

<h2>집에서 할 수 있는 것</h2>
<div class="callout-cat">
<strong>경증 결막염 가정 관리</strong><br>
• 깨끗한 생리식염수·면봉으로 분비물 닦아주기<br>
• 자극 원인(연기·먼지) 제거<br>
• 스트레스 요인 최소화 (FHV-1 재발 예방)<br>
• 충분한 수분과 영양 공급<br>
▶ 이것은 경증·초기 관리이며 개선이 없으면 반드시 수의사 방문
</div>

<h2>즉시 내원해야 하는 기준</h2>
<ul>
<li>24~48시간 내 개선 없거나 악화</li>
<li>눈을 완전히 감고 뜨지 못함</li>
<li>각막 혼탁(흐려짐), 각막 손상 의심</li>
<li>노란색·초록색 진한 분비물 (세균 감염 가능성)</li>
<li>다른 증상 동반 (재채기, 콧물, 무기력)</li>
</ul>

<h2>사람 안약을 쓰면 안 되는 이유</h2>
<ul>
<li>사람용 항생제 안약: 고양이에게 적합하지 않은 성분 가능</li>
<li>스테로이드 안약: FHV-1 활성화 위험 (증상 악화)</li>
<li>방부제 성분: 고양이 각막에 독성 가능</li>
</ul>

<h2>처방 안약의 종류</h2>
<ul>
<li>FHV-1: 항바이러스 안약(아이독수리딘·트리플루리딘) 또는 경구 리신</li>
<li>세균성: 처방 항생제 안약</li>
<li>반드시 수의사 진단 후 적절한 약 선택</li>
</ul>

<h2>마지막으로</h2>
<p>눈 문제는 빠르게 악화될 수 있다. 집에서 해볼 수 있는 것은 아주 경미하고 초기 단계에 한하며, 조금이라도 걱정된다면 수의사에게 보이는 것이 낫다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Stiles, J. — Feline herpesvirus. Clin Tech Small Anim Pract 2003",
      "한국수의안과학회 고양이 결막염 진단 및 치료 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 처방 없이 안약을 사용하지 마세요.",
    status: "published",
    publishedAt: "2026-12-27T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-693",
    slug: "dog-chicken-feet-duck-feet-safety",
    type: "blog",
    category: 2,
    title: "강아지 닭발·오리발 간식 안전성 — 뼈 위험과 섭취 방법",
    subtitle: "닭발·오리발 영양 성분, 뼈 안전성(날것 vs 가열), 크기별 급여 주의사항",
    metaTitle: "강아지 닭발·오리발 간식 안전성 — 뼈 위험·급여 방법 완전 정리 | 펫지기",
    metaDescription: "강아지 닭발·오리발 간식 안전성을 정리했습니다. 연골 영양 성분, 날것 vs 건조 vs 삶은 뼈의 안전성 차이, 크기별 급여 주의사항, 급여 금지 상황을 설명합니다.",
    body: `<p>닭발과 오리발은 강아지에게 인기 있는 간식이다. 연골이 풍부해 관절 건강에 도움된다고 알려졌지만, 안전하게 주는 방법을 알아야 한다.</p>

<h2>닭발·오리발의 영양</h2>
<ul>
<li>콜라겐: 관절 연골의 주요 성분</li>
<li>글루코사민·콘드로이친: 연골 보호 성분</li>
<li>단백질: 발 특유의 낮은 지방, 상대적으로 가벼운 간식</li>
</ul>

<h2>뼈 안전성 — 가장 중요한 부분</h2>
<div class="callout-dog">
<strong>닭발·오리발 형태별 안전성</strong><br>
• <strong>날것(Raw) 닭발·오리발</strong>: 뼈가 부드러워 상대적으로 안전, 단 살모넬라 오염 주의<br>
• <strong>건조 닭발·오리발</strong>: 뼈가 단단해지지 않아 씹기 안전한 경우 많음<br>
• <strong>삶은·가열 닭발·오리발</strong>: 뼈가 딱딱하게 변해 찰과상·천공 위험 증가<br>
▶ 가열(삶기·굽기)한 뼈는 강아지에게 위험합니다
</div>

<h2>크기별 주의사항</h2>
<ul>
<li>소형견: 한 번에 통째로 삼키려는 경향 — 질식 위험, 보호자 감독 필수</li>
<li>대형견: 잘게 씹지 않고 삼키는 경우 — 마찬가지로 감독 필요</li>
<li>강아지(퍼피): 뼈 간식 시작은 치아 발달 완료 후 권장 (6개월 이상)</li>
</ul>

<h2>급여 금지 상황</h2>
<ul>
<li>췌장 질환·고지방 민감 강아지: 지방 함량 확인 필요</li>
<li>소화기 질환 중인 경우: 회복 후 급여</li>
<li>이전에 뼈 간식에서 구토·배변 이상 있었던 경우: 중단</li>
</ul>

<h2>마지막으로</h2>
<p>닭발·오리발은 적절히 주면 좋은 간식이지만, 가열된 것과 감독 없는 급여는 피해야 한다. 처음 줄 때는 소량으로 시작해 반응을 확인하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국반려동물영양학회 강아지 뼈 간식 안전 급여 지침",
      "Gfeller, R.W. & Messonnier, S.P. — Handbook of Small Animal Toxicology and Poisonings. Mosby 2004",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-27T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-694",
    slug: "breed-specific-legislation-korea",
    type: "blog",
    category: 4,
    title: "한국 견종 규제법 — 맹견 지정 기준과 보호자 의무",
    subtitle: "맹견 지정 견종 목록, 보호자 의무(목줄·입마개·보험), 위반 시 처벌, 관련 법 현황",
    metaTitle: "한국 맹견 규제법 — 지정 견종·보호자 의무·처벌 규정 정리 | 펫지기",
    metaDescription: "한국 맹견 지정 기준과 보호자 의무를 정리했습니다. 동물보호법상 맹견 목록, 외출 시 목줄·입마개·보험 의무, 위반 시 과태료, 맹견 관련 법 현황을 알아봅니다.",
    body: `<p>한국에서 특정 견종은 법으로 맹견으로 지정되어 보호자에게 추가 의무가 부과된다. 정확히 알아야 불이익을 피할 수 있다.</p>

<h2>맹견 지정 견종 (2024년 기준)</h2>
<p>동물보호법 시행규칙에 따른 맹견 지정 견종이다.</p>
<ul>
<li>도사견과 그 잡종</li>
<li>아메리칸 핏불 테리어와 그 잡종</li>
<li>아메리칸 스태퍼드셔 테리어와 그 잡종</li>
<li>스태퍼드셔 불 테리어와 그 잡종</li>
<li>로트와일러와 그 잡종</li>
</ul>

<h2>맹견 보호자의 법적 의무</h2>
<div class="callout-dog">
<strong>맹견 외출 시 필수 사항</strong><br>
• <strong>목줄</strong>: 외출 시 2m 이내 목줄 착용 의무<br>
• <strong>입마개</strong>: 외출 시 입마개 착용 의무<br>
• <strong>책임보험</strong>: 맹견 보호자는 배상책임보험 가입 의무 (법정 의무)<br>
• <strong>안전관리 교육</strong>: 보호자 안전 교육 이수 의무<br>
▶ 위반 시 과태료: 최대 300만 원
</div>

<h2>사고 발생 시 보호자 책임</h2>
<ul>
<li>맹견이 사람을 물어 상해를 입힌 경우: 보호자에게 민형사 책임</li>
<li>입마개 착용 의무 위반 중 사고: 가중 처벌 가능</li>
<li>맹견 관련 배상책임보험: 피해자 보상에 필수</li>
</ul>

<h2>아파트·공동주택 입주 제한</h2>
<ul>
<li>공동주택 관리규약으로 맹견 입주 제한 가능</li>
<li>사전에 관리사무소 확인 필요</li>
</ul>

<h2>법 개정 동향</h2>
<p>2023~2024년 동물보호법 개정으로 맹견 관련 규제가 강화되었다. 대형 반려견 관련 추가 규제 논의가 지속 중이다. 법무부·농림축산식품부 공고를 주기적으로 확인하는 것이 좋다.</p>

<h2>마지막으로</h2>
<p>맹견을 키우는 것은 법적 의무를 이행할 준비가 되어 있을 때 시작해야 한다. 모르고 위반하면 보호자도, 동물도 피해를 입는다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 보험·법률 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "동물보호법 시행규칙 제1조의2 — 맹견의 범위",
      "농림축산식품부 맹견 안전관리 강화 지침 (2024)",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 최신 법령은 국가법령정보센터에서 확인하세요.",
    status: "published",
    publishedAt: "2026-12-28T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-695",
    slug: "positive-reinforcement-vs-dominance-training",
    type: "blog",
    category: 5,
    title: "긍정강화 vs 지배 기반 훈련 — 어떤 방법이 실제 효과적인가",
    subtitle: "두 훈련 방법 비교, 지배이론의 과학적 근거 문제, 긍정강화의 연구 결과, 선택 기준",
    metaTitle: "긍정강화 vs 지배 기반 강아지 훈련 — 효과와 위험 비교 | 펫지기",
    metaDescription: "강아지 훈련 방법 긍정강화 vs 지배 기반 방식을 비교했습니다. 알파독 이론의 과학적 문제점, 긍정강화 효과에 대한 연구, 처벌 기반 훈련의 부작용을 정리했습니다.",
    body: `<p>"알파가 되어야 한다", "지배해야 한다" vs "간식으로 칭찬해야 한다". 강아지 훈련 방법을 둘러싼 논쟁은 오래됐다. 과학은 무엇을 말하는가.</p>

<h2>지배이론(알파독 이론)의 근거 문제</h2>
<p>지배이론은 1940~1960년대 포획 상태 늑대 연구에서 파생된 개념이다. 이후 연구에서 야생 늑대 무리는 가족 단위로 생활하며 "지배 서열"이 없다는 것이 밝혀졌다. 원래 연구자 데이비드 메크(David Mech)는 "알파" 개념을 스스로 철회했다.</p>

<h2>처벌 기반 훈련의 부작용</h2>
<div class="callout-dog">
<strong>처벌·지배 기반 훈련의 연구 결과</strong><br>
• 공격성 증가 위험: 처벌에 반응해 방어적 공격 발생 가능<br>
• 두려움 기반 복종: 진짜 학습 없이 회피만 학습<br>
• 보호자-동물 신뢰 손상<br>
• 전기충격·핀치 칼라: AVSAB·APDT 등 수의행동학회 사용 반대<br>
▶ 강제·처벌 방법은 단기 효과가 있어 보여도 장기적으로 역효과 발생 위험
</div>

<h2>긍정강화 훈련의 연구 결과</h2>
<ul>
<li>원하는 행동의 발생 빈도를 효과적으로 증가</li>
<li>강아지의 자발적 학습 의욕 향상</li>
<li>보호자-동물 유대감 강화</li>
<li>공격성·불안 행동 감소에 더 효과적</li>
</ul>

<h2>긍정강화의 현실적 한계</h2>
<ul>
<li>일관성이 필요: 보호자의 꾸준한 훈련이 전제</li>
<li>타이밍이 중요: 올바른 행동 직후 보상이 핵심</li>
<li>간식 의존에서 점차 행동 자체의 즐거움으로 전환 필요</li>
</ul>

<h2>어떤 방법을 선택해야 할까</h2>
<p>AVSAB(미국수의행동학회)·APDT(전문 강아지 훈련사 협회) 등 주요 기관은 강압·처벌 기반 훈련보다 긍정강화 기반 훈련을 권장한다. 복잡한 문제 행동이 있다면 수의행동의학 전문가와 상담하자.</p>

<h2>마지막으로</h2>
<p>강아지는 지배해야 할 존재가 아니라 함께 언어를 배워가는 파트너다. 두려움이 아닌 신뢰 위에 훈련이 쌓일 때 오래 유지된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동·케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Herron, M.E. et al. — Survey of the use and outcome of confrontational and non-confrontational training methods in client-owned dogs. Appl Anim Behav Sci 2009",
      "한국동물행동의학회 반려견 훈련 방법 권고 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-12-28T11:00:00.000Z",
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
  console.log("블로그 포스트 114차 시딩 완료! (blog-691 ~ blog-695)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
