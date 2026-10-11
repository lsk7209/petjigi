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
    body: `<p>닭발과 오리발은 강아지 간식으로 인기가 있다. 그러나 날것인지, 익힌 것인지, 건조한 것인지에 따라 안전성이 다르다. 급여 전에 위험 요인과 주의점을 알아 두자.</p>

<h2>어떤 위험이 있나</h2>
<table>
<thead><tr><th>위험</th><th>설명</th></tr></thead>
<tbody>
<tr><td>세균 오염</td><td>날 닭발·오리발에는 살모넬라, 캄필로박터 같은 세균이 있을 수 있다. 건강한 개는 증상이 없을 수 있지만 면역이 약한 개와 사람(특히 어린이·노인)이 위험할 수 있다</td></tr>
<tr><td>뼈 파편·질식</td><td>익힌 닭뼈는 부서지기 쉬워 위험하다. 작은 개와 강아지는 통째로 삼켜 질식하거나 장이 막힐 수 있다</td></tr>
<tr><td>지방</td><td>피부와 지방이 많아 췌장염 이력이 있거나 비만, 고지혈증이 있는 개에게는 맞지 않는다</td></tr>
<tr><td>염분·첨가물</td><td>훈제·양념된 제품은 나트륨과 첨가물이 많을 수 있다</td></tr>
<tr><td>이빨 파절</td><td>딱딱하게 건조된 제품은 이빨이 부러질 수 있다</td></tr>
</tbody>
</table>

<div class="callout-dog">
<strong>급여하지 않는 편이 좋은 경우</strong><br>
• 췌장염, 위장 질환, 비만, 고지혈증이 있다<br>
• 소형견·강아지·씹지 않고 삼키는 개<br>
• 면역이 약한 개, 임신·질환 중인 개<br>
• 어린이나 면역 저하 가족이 함께 사는 집에서 날것을 다룰 때 (손·도마 위생 필요)
</div>

<h2>급여한다면</h2>
<ul>
<li><strong>크기</strong>: 개의 체구에 맞는 크기를 고르고, 삼킬 수 있는 조각은 치운다.</li>
<li><strong>감독</strong>: 먹는 동안 반드시 지켜보고, 삼키려 하면 빼앗는다.</li>
<li><strong>횟수와 열량</strong>: 간식으로 소량만 주고 하루 열량의 10%를 넘기지 않는다.</li>
<li><strong>가공 제품</strong>: 무염, 무첨가 제품을 고른다. 건조한다고 세균이 모두 사라지는 것은 아니므로 취급 후 손을 씻는다.</li>
<li><strong>익히지 않은 뼈를 다룰 때 위생</strong>: 생식 취급 시 도마·손을 깨끗이 씻고 개가 먹은 자리를 소독한다.</li>
</ul>

<h2>먹은 뒤 이런 증상이면 병원</h2>
<ul>
<li>구토, 설사, 혈변</li>
<li>침 흘림, 입을 문지름, 기침, 켁켁거림 (질식·걸림)</li>
<li>복통, 식욕 부진, 변을 보지 못함</li>
</ul>

<h2>대안</h2>
<p>치아 관리가 목적이라면 칫솔질이 가장 효과적이다. 씹는 간식이 필요하면 크기에 맞는 수의사 추천 제품을 고르고, 안전한 급여 방법을 상담하자. 간식 열량은 <a href="/blog/dog-food-topper-guide">토퍼·간식 열량 가이드</a>를 참고한다.</p>

<h2>마지막으로</h2>
<p>닭발·오리발은 모든 개에게 안전한 간식이 아니다. 개의 크기와 건강, 가정 구성원을 고려해 신중히 결정하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.kinship.com/dog-nutrition/are-chicken-feet-good-for-dogs — Kinship, Are Chicken Feet Good for Dogs?",
      "https://a-z-animals.com/pets/dogs/dog-facts/can-dogs-eat-chicken-feet-2/ — A-Z Animals, Can Dogs Eat Chicken Feet?",
    ],
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
    body: `<p>우리나라는 특정 품종을 '맹견'으로 지정해 별도의 안전 관리 의무를 부과한다. 2024년 4월 27일부터는 맹견사육허가제가 시행되어 요건이 강화되었다. 이 글은 맹견 규제의 주요 내용을 정리한다. 세부 기준과 과태료는 개정될 수 있으므로 국가법령정보센터의 현행 조문을 확인한다.</p>

<h2>맹견이란</h2>
<p>농림축산식품부 안내 기준으로, 맹견은 도사견, 아메리칸 핏불테리어, 아메리칸 스태퍼드셔 테리어, 스태퍼드셔 불 테리어, 로트와일러와 그 잡종의 5종, 그리고 기질평가 결과 공격성이 높다고 판단되어 시·도지사가 지정한 개를 말한다.</p>

<h2>맹견사육허가제 (2024년 4월 27일 시행)</h2>
<table>
<thead><tr><th>항목</th><th>내용</th></tr></thead>
<tbody>
<tr><td>허가 요건</td><td>동물등록, 책임보험 가입, 중성화 수술을 갖춰 시·도지사에게 사육허가를 신청한다</td></tr>
<tr><td>신청 시기</td><td>신규 사육자는 소유권 취득 또는 월령 2개월이 된 날부터 30일 이내. 기존 사육자는 시행 후 6개월 이내(2024년 10월 26일까지)였다</td></tr>
<tr><td>심사</td><td>전문가 위원회가 사전 설문과 기질평가를 거쳐 공공 안전 위험 여부를 판단한다. 기질평가 비용은 소유자 부담이다</td></tr>
<tr><td>중성화 예외</td><td>8개월 미만의 어린 개는 수술이 어렵다는 수의사 진단서가 있으면 연기할 수 있다</td></tr>
<tr><td>처벌</td><td>무허가 사육은 형사처벌 대상으로 안내된다 (구체적 형량은 현행 법령 확인)</td></tr>
</tbody>
</table>

<h2>외출 시 의무</h2>
<ul>
<li>맹견과 외출할 때는 목줄 및 입마개 등 안전장치를 하거나 탈출을 방지할 이동 장치를 사용해야 한다.</li>
<li>일반 반려견도 목줄 또는 가슴줄(길이 2미터 이내)을 착용하거나 잠금장치가 있는 이동 장치를 사용해야 한다.</li>
<li>어린이집, 유치원, 초등학교 등에는 맹견의 출입이 금지된다.</li>
<li>허가를 받아도 승강기 등 공용공간에서 목줄 목덜미 부분을 잡는 등 안전관리 준수사항이 강화되었다.</li>
<li>소유자는 정기 교육을 이수해야 한다.</li>
</ul>

<div class="callout-dog">
<strong>사고가 났을 때</strong><br>
• 피해자 응급 처치와 연락처 교환, 보험사 신고<br>
• 형사·민사 책임은 <a href="/blog/pet-bite-liability-guide">반려동물 물림 사고 책임 가이드</a> 참고
</div>

<h2>품종 규제 논란</h2>
<p>품종만으로 위험성을 판단하는 것이 타당한지 논란이 있다. 개체 기질과 사회화, 보호자의 관리가 더 중요하다는 의견이 있고, 2024년 개정으로 기질평가가 도입된 것도 이런 문제의식을 반영한다. 맹견 5종이 아니어도 공격성이 높은 개는 관리 의무가 필요할 수 있다.</p>

<h2>마지막으로</h2>
<p>맹견을 키우고 있거나 입양을 고려한다면 허가 요건과 비용(보험, 중성화, 기질평가)을 먼저 확인하자. 일반 견종 보호자도 목줄·가슴줄 의무를 지켜야 한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 보험·법률 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.mafra.go.kr/bbs/home/792/570162/artclView.do — 농림축산식품부, 2024년 달라지는 반려동물 관련 제도(맹견사육허가제)",
      "https://news.seoul.go.kr/env/archives/552695 — 서울특별시, 맹견 사육허가 안내",
      "https://www.geumcheon.go.kr/portal/contents.do?key=4054 — 금천구청, 반려동물 소유자의 법적 의무사항",
    ],
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
