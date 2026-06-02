import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 77 — cat1×2 + cat5×1 + cat3×1 + cat4×1 = 5편 (IDs 506-510)
// Macros: B, F, A, D, G
// Angles: RA5, RA7, RA1, RA2, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-506",
    slug: "puppy-mill-red-flags-guide",
    type: "blog",
    category: 1,
    title: "강아지 공장 식별 체크리스트 — 강아지 사기 예방의 첫걸음",
    subtitle: "강아지 공장(펫숍·브리더 가장)의 신호 7가지, 온라인 사기 유형, 안전한 입양처",
    metaTitle: "강아지 공장 식별 방법 — 펫숍·브리더 사기 예방 체크리스트 | 펫지기",
    metaDescription: "강아지 공장을 식별하는 체크리스트를 정리했습니다. 펫숍·브리더를 가장한 강아지 공장의 신호 7가지, 온라인 사기 유형, 안전한 입양처를 알아보세요.",
    body: `<p>매년 많은 사람이 "작고 귀여운 강아지"에 마음을 빼앗겨 강아지 공장 출신 강아지를 입양하게 된다. 강아지 공장 문제는 입양하는 사람이 식별법을 모르는 한 계속된다.</p>

<h2>강아지 공장이란</h2>
<p>공장식으로 대량 번식시키는 불법·불량 번식 시설이다. 어미견은 평생 작은 케이지에 갇혀 번식에만 이용된다. 강아지 공장 출신 개들은 유전 질환, 행동 문제, 면역력 저하가 흔하다.</p>

<h2>강아지 공장 식별 신호 7가지</h2>
<div class="callout-dog">
<strong>이런 경우 주의</strong><br>
1. 어미견·아비견을 볼 수 없음<br>
2. 여러 품종을 동시에 판매<br>
3. 항상 강아지가 있음 (연중무휴 공급)<br>
4. 서류 없이 판매 가능<br>
5. 가격이 지나치게 저렴하거나 지나치게 비쌈<br>
6. 직접 방문 불가, 배송 또는 픽업 장소 지정<br>
7. 건강 보증 없음, 후기 제공 거부
</div>

<h2>온라인 사기 유형</h2>
<ul>
<li>"선금 보내면 배송"이라며 잠적</li>
<li>실제 강아지와 다른 사진 사용</li>
<li>지나치게 좋은 조건 (건강 보증 1년 + 초저가)</li>
<li>브랜드 번식장인 척 하는 가짜 사이트</li>
</ul>

<h2>안전한 입양처</h2>
<ul>
<li>동물보호관리시스템(APMS) 등록 보호소</li>
<li>직접 방문해 어미견을 볼 수 있는 브리더</li>
<li>한국애견연맹·한국켄넬클럽 등록 공식 브리더</li>
<li>입양 동기 확인 + 입양자 가정 확인하는 브리더 (까다로운 것이 오히려 좋은 신호)</li>
</ul>

<h2>마지막으로</h2>
<p>강아지 공장을 근절하는 방법은 소비자 선택에 있다. "어디서 왔는지"를 묻는 것이 강아지 복지 향상의 시작이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국동물복지협회 강아지 공장 실태 조사 보고서 2023",
      "동물보호법 제34조 (동물 판매업 신고 기준)",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-25T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-507",
    slug: "ethical-breeder-how-to-find",
    type: "blog",
    category: 1,
    title: "윤리적 브리더 찾는 방법 — 믿을 수 있는 브리더의 8가지 특징",
    subtitle: "윤리적 브리더의 기준, 어떤 질문을 해야 하는지, 계약서 확인사항",
    metaTitle: "윤리적 브리더 찾는 방법 — 믿을 수 있는 브리더 8가지 특징 | 펫지기",
    metaDescription: "믿을 수 있는 윤리적 브리더를 찾는 방법을 정리했습니다. 윤리적 브리더의 8가지 특징, 방문 시 확인사항, 반드시 해야 할 질문, 계약서 확인사항을 알아보세요.",
    body: `<p>특정 품종의 강아지를 건강하게 입양하고 싶다면 윤리적 브리더를 찾는 것이 최선이다. 그러나 모든 브리더가 같지 않다. 윤리적 브리더는 어떻게 알아볼 수 있을까?</p>

<h2>윤리적 브리더의 8가지 특징</h2>
<ul>
<li>어미견·아비견을 직접 볼 수 있게 해준다</li>
<li>유전 질환 검사 결과를 공개한다</li>
<li>강아지를 8주 이전에 분리하지 않는다</li>
<li>입양자를 선별한다 (가정 방문, 인터뷰)</li>
<li>입양 후에도 연락하고 지원한다</li>
<li>반환 정책이 있다 ("못 키우게 되면 데려온다")</li>
<li>한 번에 여러 품종을 번식하지 않는다</li>
<li>번식 횟수를 제한한다 (어미견 보호)</li>
</ul>

<h2>방문 시 확인사항</h2>
<div class="callout-dog">
<strong>브리더 방문 체크리스트</strong><br>
• 시설 청결·냄새 (대소변 냄새가 강하면 관리 소홀)<br>
• 어미견 상태 (마르지 않고, 털 상태 양호, 호기심 있는지)<br>
• 강아지들의 상태 (활발한지, 눈·코 분비물 없는지)<br>
• 사회화 환경 (다양한 소리, 사람 접촉 여부)
</div>

<h2>반드시 해야 할 질문</h2>
<ul>
<li>"이 품종의 유전 질환 검사를 받았나요?" (결과 서류 요청)</li>
<li>"어미견은 얼마나 자주 번식했나요?"</li>
<li>"못 키우게 되면 어떻게 하나요?"</li>
<li>"부모의 건강 이력이 있나요?"</li>
</ul>

<h2>계약서 확인</h2>
<ul>
<li>건강 보증 범위와 기간</li>
<li>유전 질환 발생 시 환불·교환 조건</li>
<li>중성화 조항 (번식 제한 목적)</li>
</ul>

<h2>마지막으로</h2>
<p>좋은 브리더는 "까다롭다". 당신에 대해 많이 물어보고, 쉽게 팔지 않는 브리더가 오히려 믿을 수 있다. 빠르고 저렴하게 팔려는 곳일수록 뒤에서 무언가가 숨겨져 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국켄넬클럽 우수 브리더 인증 기준",
      "ASPCA — What Is a Responsible Breeder?",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-25T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-508",
    slug: "dog-winter-cold-care",
    type: "blog",
    category: 5,
    title: "강아지 겨울 추위 보호 — 품종별 위험 온도와 실내 관리",
    subtitle: "저체온증 위험 온도, 소형견·노령견·단모종 특별 관리, 겨울 산책 준비",
    metaTitle: "강아지 겨울 추위 보호 — 저체온증 예방·산책 준비 가이드 | 펫지기",
    metaDescription: "강아지 겨울철 추위 보호 방법을 정리했습니다. 저체온증 위험 온도, 소형견·노령견·단모종 특별 관리, 겨울 산책 준비사항을 알아보세요.",
    body: `<p>겨울에도 강아지는 밖에 나가고 싶어한다. 그러나 모든 강아지가 추위에 똑같이 강한 것은 아니다. 품종과 상황에 따라 적절한 보호가 필요하다.</p>

<h2>저체온증 위험 온도</h2>
<p>기온 0도 이하에서는 모든 강아지에서 저체온증 위험이 있다. 바람·습도가 더해지면 체감 온도는 훨씬 낮아진다:</p>
<ul>
<li>5도 이하: 소형견·단모종·노령견 주의</li>
<li>0도 이하: 모든 품종에서 노출 시간 제한</li>
<li>영하 10도 이하: 이중모 대형견도 장시간 노출 금지</li>
</ul>

<h2>품종별 위험 기준</h2>
<div class="callout-dog">
<strong>추위에 취약한 강아지</strong><br>
• 소형견 (체중 대비 체표면적 커 → 열 손실 빠름)<br>
• 단모종 (치와와·닥스훈트·이탈리안 그레이하운드)<br>
• 노령견·신생견 (체온 조절 기능 저하)<br>
• 저체중·만성 질환 보유견<br><br>
<strong>추위에 강한 품종</strong><br>
허스키·말라무트·사모예드·뉴펀들랜드
</div>

<h2>겨울 실내 관리</h2>
<ul>
<li>침대는 바닥보다 높은 곳 (냉기는 아래에 모임)</li>
<li>외풍 있는 곳 피하기</li>
<li>목욕 후 완전 건조 필수 (습기 남으면 체온 하강)</li>
<li>히터 주변 화상·탈수 주의 (물 접근 항상 확보)</li>
</ul>

<h2>겨울 산책 준비</h2>
<ul>
<li>옷: 소형·단모종은 방한복 착용 권장</li>
<li>발바닥 보호: 제빙염(염화칼슘)은 발바닥 자극. 산책 후 발 닦기 또는 발바닥 왁스 도포</li>
<li>시간: 낮 가장 따뜻한 시간대 선택</li>
<li>떨림 관찰: 떨기 시작하면 즉시 귀가</li>
</ul>

<h2>마지막으로</h2>
<p>강아지도 겨울 추위를 느낀다. "털이 있으니 괜찮다"는 모든 강아지에게 해당되지 않는다. 내 강아지의 품종·나이·체형에 맞게 겨울 관리를 조정하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국수의응급의학회 저체온증 임상 가이드라인",
      "American Kennel Club — How Cold Is Too Cold for Dogs?",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-26T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-509",
    slug: "cat-pkd-polycystic-kidney",
    type: "blog",
    category: 3,
    title: "고양이 다낭성 신장병(PKD) — 페르시안·엑조틱 보호자 필독",
    subtitle: "PKD 유전 방식, 증상 발현 시점, 유전자 검사, 관리 방법",
    metaTitle: "고양이 PKD(다낭성 신장병) — 유전자 검사와 관리 완전 가이드 | 펫지기",
    metaDescription: "페르시안·엑조틱 쇼트헤어에서 흔한 고양이 PKD(다낭성 신장병). 유전 방식, 증상 발현 시점, 유전자 검사 방법, 신기능 유지 관리를 정리했습니다.",
    body: `<p>페르시안·엑조틱 쇼트헤어·히말라얀 등 특정 품종 고양이를 키운다면 PKD를 미리 알아두어야 한다. 품종 고양이의 38~50%에서 나타나는 유전 질환이다.</p>

<h2>PKD란</h2>
<p>신장에 낭종(물주머니)이 형성되고 시간이 지남에 따라 커지면서 정상 신장 조직을 대체하는 유전 질환이다. 상염색체 우성 유전(PKD1 유전자)으로, 한쪽 부모만 보유해도 자손의 50%에서 발현된다.</p>

<h2>증상 발현 시점</h2>
<ul>
<li>낭종 형성: 태어날 때부터 시작, 초음파로 확인 가능 (6개월 이후)</li>
<li>임상 증상 발현: 보통 7~10세 (신기능이 75% 이상 손상될 때)</li>
<li>조기 발현형: 일부는 3~4세에 신부전 진행</li>
</ul>

<h2>유전자 검사</h2>
<div class="callout-cat">
<strong>PKD 검사 방법</strong><br>
• <strong>초음파 검사</strong>: 6개월 이후 가능, 낭종 크기·개수 확인<br>
• <strong>유전자 검사</strong>: 혈액·면봉 샘플, PKD1 돌연변이 유무 확인<br>
• 검사 시기: 브리더 단계 (번식 전 필수)가 이상적<br>
• 입양 전 유전자 검사 결과 요청 권장
</div>

<h2>관리 방법</h2>
<p>PKD는 완치가 없다. 신기능 저하 속도를 늦추는 관리가 목표다:</p>
<ul>
<li>정기적 신기능 검사 (연 1~2회 혈청 크레아티닌·BUN)</li>
<li>충분한 수분 섭취 (습식 사료 중심)</li>
<li>인 제한 식이 (신장 손상 진행 시)</li>
<li>고혈압 모니터링 및 관리</li>
</ul>

<h2>마지막으로</h2>
<p>PKD 양성 고양이라도 관리에 따라 10년 이상 건강하게 살 수 있다. 정기 검진과 신기능 모니터링이 가장 중요하다. 브리더에서 입양 시 PKD 유전자 검사 결과를 반드시 확인할 것.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Lyons, L.A. et al. — Feline polycystic kidney disease mutation identified in PKD1. J Am Soc Nephrol 2004",
      "한국고양이수의사회 유전 질환 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-26T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-510",
    slug: "pet-legal-status-korea-2024",
    type: "blog",
    category: 4,
    title: "한국 반려동물의 법적 지위 — 물건인가, 존재인가",
    subtitle: "현행법상 반려동물 지위, 민법 개정 논의, 동물보호법 강화 흐름, 해외 비교",
    metaTitle: "한국 반려동물 법적 지위 — 민법·동물보호법 현황과 개정 논의 | 펫지기",
    metaDescription: "한국 반려동물의 법적 지위 현황을 정리했습니다. 현행 민법상 '물건' 지위, 민법 개정 논의, 동물보호법 강화 흐름, 독일·스위스 해외 사례를 비교했습니다.",
    body: `<p>가족처럼 키우는 반려동물이지만, 한국 법에서 동물은 여전히 '물건'으로 분류된다. 이것이 실제로 어떤 의미를 갖는지, 그리고 무엇이 바뀌고 있는지 정리했다.</p>

<h2>현행 법적 지위</h2>
<p>민법은 동물을 물건으로 취급한다(민법 제98조). 동물을 잃거나 다친 경우 손해배상은 재산적 가치(시장가치)를 기준으로 산정된다. 정신적 고통, 치료비 전액, 반려 관계의 상실은 법적 인정이 제한적이다.</p>

<h2>현실에서 발생하는 문제</h2>
<ul>
<li>동물병원 과실로 반려동물이 사망해도 보상은 "시장가치" 기준</li>
<li>학대로 강아지가 죽어도 재물 손괴죄 적용 가능</li>
<li>이혼 시 반려동물 양육권 분쟁에서 법적 근거 부족</li>
</ul>

<h2>민법 개정 논의</h2>
<div class="callout-dog">
<strong>반려동물 법적 지위 개정 논의 현황</strong><br>
• 국회: "동물은 물건이 아니다" 민법 개정안 발의 (수차례)<br>
• 법무부 민법 개정위원회 논의 중<br>
• 핵심 쟁점: 물건 → 생명 존재로 지위 격상, 정서적 손해 배상 인정
</div>

<h2>동물보호법 강화 흐름</h2>
<p>2023년 개정 동물보호법으로 학대 처벌이 강화됐다. 동물 유기·학대 최대 3년 이하 징역, 반려동물 판매업 기준 강화. 그러나 법 집행·현장 적용은 여전히 과제다.</p>

<h2>해외 비교</h2>
<ul>
<li><strong>독일·스위스</strong>: 민법에 "동물은 물건이 아니다" 명시, 별도 동물법 적용</li>
<li><strong>프랑스</strong>: 2015년 민법 개정으로 동물 = 감각 있는 존재 명시</li>
<li><strong>한국</strong>: 아직 민법 개정 미완료</li>
</ul>

<h2>마지막으로</h2>
<p>반려동물 법적 지위 강화는 단순한 법률 문제가 아니다. 사회가 반려동물을 어떻게 바라보는가의 반영이다. 보호자로서 법 개정 논의를 관심 있게 지켜보고, 동물보호 관련 정책에 목소리를 내는 것도 반려동물 복지에 기여하는 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "민법 제98조 (물건의 정의) 및 동물보호법 개정안",
      "법무부 동물의 법적 지위 개선 연구 보고서 2022",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 법적 문제는 전문가에게 문의하세요.",
    status: "published",
    publishedAt: "2026-09-27T09:00:00.000Z",
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
  console.log("블로그 포스트 77차 시딩 완료! (blog-506 ~ blog-510)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
