import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 121 — cat3×2 + cat4×1 + cat5×1 + cat6×1 = 5편 (IDs 726-730)
// Macros: D, C, A, F, E
// Angles: RA3, RA7, RA1, RA5, RA6

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-726",
    slug: "dog-prostate-disease-intact-male",
    type: "blog",
    category: 3,
    title: "강아지 전립선 질환 — 중성화하지 않은 수컷의 위험",
    subtitle: "전립선 비대·낭종·농양·종양 유형 차이, 증상, 중성화 수술 역할, 치료 방법",
    metaTitle: "강아지 전립선 질환 — 미중성화 수컷 위험·증상·치료 가이드 | 펫지기",
    metaDescription: "강아지 전립선 질환 원인과 치료. 미중성화 수컷 전립선 비대·낭종·농양·종양 유형별 증상, 배변·배뇨 문제, 중성화 수술 예방 효과, 치료 원칙을 정리했습니다.",
    body: `<p>중성화하지 않은 중년 이상의 수컷 강아지에서는 전립선 질환이 흔하다. 가장 흔한 것은 양성 전립선 비대(BPH)이며, 세균 감염, 낭종, 드물게 종양도 있다. 증상만으로는 구분이 어려우므로 진료가 필요하다.</p>

<h2>전립선 질환의 종류</h2>
<table>
<thead><tr><th>질환</th><th>특징</th></tr></thead>
<tbody>
<tr><td>양성 전립선 비대(BPH)</td><td>고령의 미중성화 수컷에서 흔하며 호르몬에 의해 전립선이 커진다. 증상이 없을 수도 있다</td></tr>
<tr><td>전립선염·농양</td><td>세균 감염. 열, 통증, 처짐이 나타날 수 있어 응급일 수 있다</td></tr>
<tr><td>전립선 낭종</td><td>액체가 찬 주머니가 생기며, BPH와 함께 나타나기도 한다</td></tr>
<tr><td>전립선 종양</td><td>드물지만 악성 경향이 있다. 중성화한 개에서도 생길 수 있다</td></tr>
</tbody>
</table>

<h2>증상</h2>
<ul>
<li>소변에 피가 섞이거나 포피에서 피 섞인 분비물이 나온다 (BPH에서 가장 흔한 보고)</li>
<li>배변 곤란, 변이 납작하거나 가늘다</li>
<li>배뇨 곤란, 소변 줄기가 가늘다</li>
<li>걸음이 뻣뻣하고 뒷다리를 불편해함 (통증)</li>
<li>열, 구토, 식욕 부진 (감염을 의심)</li>
</ul>

<div class="callout-dog">
<strong>바로 병원에 가야 하는 경우</strong><br>
• 소변을 전혀 못 본다<br>
• 열이 나고 처지며 구토한다<br>
• 심한 복통으로 자세를 잡지 못한다
</div>

<h2>진단</h2>
<p>수의사가 직장 촉진으로 전립선 크기와 통증 여부를 확인한다. BPH에서는 대개 통증 없이 좌우 대칭으로 커져 있다. 이후 복부 초음파와 방사선, 소변 검사, 필요 시 세포·배양 검사로 감별한다.</p>

<h2>치료</h2>
<ul>
<li><strong>중성화 수술</strong>: 번식 계획이 없다면 BPH의 가장 확실한 치료이며, 수술 후 전립선이 줄어드는 것이 일반적이다. 머크 수의학 매뉴얼도 번식·전시용이 아닌 개에서는 거세를 선택 치료로 소개한다.</li>
<li><strong>약물 치료</strong>: 번식견은 호르몬 조절 약물로 관리할 수 있으나 약을 지속해야 효과가 유지되고 약물 선택은 수의사가 한다.</li>
<li><strong>감염 치료</strong>: 전립선염이면 전립선에 침투 가능한 항생제를 충분한 기간 사용한다. 농양은 수술이나 배농이 필요할 수 있다.</li>
</ul>

<h2>예방과 관리</h2>
<ul>
<li>번식 계획이 없다면 중성화 시기를 수의사와 상의한다 (<a href="/blog/dog-neutering-timing-complete">중성화 시기 가이드</a>).</li>
<li>중년 이후 정기 검진에서 전립선 상태를 확인한다.</li>
<li>소변·대변 모양과 배변 자세 변화를 관찰한다.</li>
</ul>

<h2>마지막으로</h2>
<p>혈뇨, 변 가늘어짐, 배변·배뇨 곤란은 방치하지 말고 진료를 받자. 대부분의 양성 전립선 질환은 중성화로 잘 조절된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.merckvetmanual.com/reproductive-system/prostatic-diseases-in-small-animals/benign-prostatic-hyperplasia-in-dogs — Merck Veterinary Manual, Benign Prostatic Hyperplasia in Dogs",
      "https://www.merckvetmanual.com/reproductive-system/prostatic-diseases/benign-prostatic-hyperplasia-in-dogs-and-cats — Merck Veterinary Manual, Benign Prostatic Hyperplasia in Dogs and Cats",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-13T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-727",
    slug: "cat-dental-extraction-recovery",
    type: "blog",
    category: 3,
    title: "고양이 발치 후 회복 — 수술 후 식이와 통증 관리",
    subtitle: "발치 회복 기간, 수술 후 식이 단계, 통증 신호 관찰, 봉합사 처리",
    metaTitle: "고양이 발치 후 회복 — 식이·통증 관리·주의사항 완전 가이드 | 펫지기",
    metaDescription: "고양이 발치 후 회복 관리. 수술 당일~2주 식이 변화, 통증 신호 관찰법, 봉합사 처리, 재발 방지를 위한 장기 구강 관리 방법을 정리했습니다.",
    body: `<p>고양이 발치는 치주 질환·파절·흡수성 병변 등 다양한 이유로 시행된다. 수술 후 회복을 잘 돌봐야 통증 없이 빠르게 일상으로 돌아올 수 있다.</p>

<h2>수술 당일</h2>
<ul>
<li>마취 회복 후 귀가, 조용하고 따뜻한 공간 제공</li>
<li>마취 후 2~4시간은 비틀거림·혼동 가능 — 안전한 공간 필요</li>
<li>당일은 물 소량 제공, 음식은 저녁 이후 소량 시작 (수의사 지침 우선)</li>
</ul>

<h2>수술 후 식이 단계</h2>
<div class="callout-cat">
<strong>발치 후 식이 전환 기준</strong><br>
• 1~3일: 습식 사료 또는 건식 사료에 물 불려서 부드럽게<br>
• 3~7일: 부드러운 음식 유지, 씹기 최소화<br>
• 7~14일: 수의사 확인 후 일반 식이로 복귀 가능<br>
▶ 발치 개수·위치에 따라 복귀 기간 다를 수 있음
</div>

<h2>통증 신호 관찰</h2>
<ul>
<li>식욕 저하 지속 (2일 이상)</li>
<li>앞발로 얼굴 계속 긁기</li>
<li>침 흘림 과다</li>
<li>입 주변 붓기·분비물</li>
<li>무기력, 숨기, 만지면 피하기</li>
</ul>
<p>통증 신호가 있으면 수의사에게 연락해 진통제 처방을 요청한다.</p>

<h2>봉합사 처리</h2>
<ul>
<li>흡수성 봉합사: 자연 용해, 제거 불필요</li>
<li>비흡수성 봉합사: 수술 후 7~14일 내 병원 방문 제거</li>
<li>봉합 부위 핥지 않도록 관리 (필요시 엘리자베스 칼라)</li>
</ul>

<h2>장기 구강 관리</h2>
<ul>
<li>발치 후 남은 치아 관리가 중요 (이미 치주 질환 위험 있는 경우)</li>
<li>칫솔질 또는 VOHC 인증 구강 관리 제품 재시작</li>
<li>연 1회 수의사 구강 검진 유지</li>
</ul>

<h2>마지막으로</h2>
<p>발치 후 회복을 잘 지원하면 대부분의 고양이가 빠르게 정상 식이로 돌아온다. 발치 이후 오히려 통증이 없어져 더 잘 먹는 경우도 많다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Niemiec, B.A. — Feline dental disease. Top Companion Anim Med 2008",
      "한국수의치과학회 고양이 발치 후 관리 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2027-01-14T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-728",
    slug: "stray-animal-rescue-legal-status",
    type: "blog",
    category: 4,
    title: "유기동물 임시 보호 법적 지위 — 구조자가 알아야 할 것",
    subtitle: "유기동물 발견·신고 의무, 임시 보호 법적 지위, 소유권 취득 요건, 파양 절차",
    metaTitle: "유기동물 임시 보호 법적 지위 — 구조자 권리·의무 완전 가이드 | 펫지기",
    metaDescription: "유기동물 임시 보호 법적 지위와 구조자 권리·의무. 발견·신고 의무, 임시 보호 기간, 소유권 취득 요건, 임시 보호 중 의료비·입양 전환 절차를 정리했습니다.",
    body: `<p>길에서 유기동물을 발견하고 데려왔는데 내 소유가 되는 걸까? 임시 보호 중 병원비는 누가 내야 할까? 법적 지위를 알아야 불필요한 분쟁을 피할 수 있다.</p>

<h2>유기동물 발견 시 신고 의무</h2>
<p>동물보호법상 유기동물을 발견하면 지자체(시군구) 또는 동물보호센터에 신고하거나 인계해야 한다. 신고 없이 개인이 임의로 데려가 기르면 법적 보호자 지위가 불명확해질 수 있다.</p>

<h2>임시 보호 절차</h2>
<div class="callout-dog">
<strong>임시 보호 공식 절차</strong><br>
1. 동물보호관리시스템(APMS) 또는 지자체 신고<br>
2. 임시 보호 신청 및 서류 작성<br>
3. 공식 임시 보호자 등록 → 법적 보호자 지위 확보<br>
4. 공고 기간(10일) 동안 원래 소유자 연락 대기<br>
5. 공고 기간 후 소유자 미나타나면 지자체 소유 이전
</div>

<h2>소유권 취득 요건</h2>
<ul>
<li>공고 기간(10일) 이후 원래 소유자가 나타나지 않은 경우</li>
<li>지자체 담당 공무원 또는 보호소 통해 입양 신청</li>
<li>입양 완료 시 등록·이름 변경 가능</li>
<li>마이크로칩 확인: 원래 소유자가 있을 경우 반환 의무</li>
</ul>

<h2>임시 보호 중 의료비</h2>
<ul>
<li>원칙: 임시 보호자가 선지급 후 지자체 정산 요청 가능 (지자체별 상이)</li>
<li>일부 지자체: 임시 보호 중 의료비 지원 프로그램 운영</li>
<li>사전에 지자체 동물보호 담당자와 의료비 처리 확인 권장</li>
</ul>

<h2>임시 보호 중 파양(반납) 시</h2>
<ul>
<li>공식 임시 보호자는 지자체에 반납 신청 가능</li>
<li>비공식 보호 중 파양은 동물 유기로 처리될 수 있어 주의 필요</li>
</ul>

<h2>마지막으로</h2>
<p>유기동물을 구조했다면 반드시 공식 신고·임시 보호 절차를 밟는 것이 본인과 동물 모두를 보호한다. 선의의 구조가 법적 문제로 이어지지 않도록 절차를 지키자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "농림축산식품부 동물보호법 해설집 2023",
      "동물자유연대 유기동물 임시 보호 가이드",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 실제 법적 사항은 해당 지자체 담당 부서에 확인하시기 바랍니다.",
    status: "published",
    publishedAt: "2027-01-14T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-729",
    slug: "dog-summer-water-activity-safety",
    type: "blog",
    category: 5,
    title: "강아지 여름 물놀이 안전 — 수영장·계곡 위험 관리",
    subtitle: "물놀이 가능 품종 특성, 수영 전 준비, 익수·저체온·수인성 감염 예방",
    metaTitle: "강아지 여름 물놀이 안전 — 수영장·계곡 위험 관리 완전 가이드 | 펫지기",
    metaDescription: "강아지 여름 물놀이 안전 가이드. 모든 개가 수영을 잘하는 게 아닌 이유, 익수 예방, 수영 후 귀 관리, 수인성 감염(렙토스피라) 예방법을 정리했습니다.",
    body: `<p>강아지와 계곡·수영장에 가는 여름. 물놀이는 즐겁지만 위험도 크다. 미리 알고 준비하면 안전하게 즐길 수 있다.</p>

<h2>모든 개가 수영을 잘하는 건 아니다</h2>
<p>불독·퍼그·프렌치불독·바셋하운드 등 단두종·짧은 다리 품종은 수영 능력이 취약하다. 물에 들어가면 금방 지치거나 구명조끼 없이는 위험할 수 있다.</p>

<h2>물놀이 전 준비</h2>
<ul>
<li>구명조끼: 수영 미숙견, 단두종, 노령견에게는 필수</li>
<li>처음 물과 만나는 강아지: 얕은 물에서 천천히 적응</li>
<li>억지로 물에 던지거나 넣지 않기 (수공포증 유발)</li>
<li>물놀이 전 2시간 전후 금식 (과식 후 격렬한 활동 위 비틀림 위험)</li>
</ul>

<h2>물속 위험 요소</h2>
<div class="callout-dog">
<strong>여름 물놀이 주요 위험</strong><br>
• 익수: 피로·수류에 의한 사고 — 보호자 시야 이탈 금지<br>
• 저체온증: 차가운 계곡물, 장시간 수영 후 떨기<br>
• 수영 후 귀 감염: 귀에 물 들어가면 외이도염 유발 가능 → 즉시 건조<br>
• 청록색 조류(남조류): 독소 함유, 개가 마시거나 접촉 시 위험
</div>

<h2>수인성 감염 — 렙토스피라</h2>
<ul>
<li>렙토스피라: 오염된 수계에서 전파되는 세균 감염</li>
<li>증상: 발열, 구토, 황달, 신부전, 간부전</li>
<li>예방: 렙토스피라 예방접종 (연 1회 이상, 고위험 지역)</li>
<li>강아지가 물을 마셨을 때 증상 주의 깊게 관찰</li>
</ul>

<h2>물놀이 후 관리</h2>
<ul>
<li>귀 안쪽 물기 제거: 부드러운 면봉·귀 건조제</li>
<li>발바닥·발가락 사이 건조</li>
<li>수영 후 깨끗한 물로 헹구기 (염소·강물 잔류 제거)</li>
<li>과도한 음수·피로 증상 관찰</li>
</ul>

<h2>마지막으로</h2>
<p>여름 물놀이는 강아지에게 최고의 추억이 될 수 있다. 구명조끼·보호자 시야 유지·귀 관리 세 가지만 지켜도 대부분의 사고를 예방할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어·라이프 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국수의공중보건학회 렙토스피라증 반려동물 예방 가이드",
      "환경부 남조류 독소 모니터링 및 반려동물 피해 주의보",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2027-01-15T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-730",
    slug: "memorial-items-for-pet-loss",
    type: "blog",
    category: 6,
    title: "반려동물 추모 기념품 — 잃은 아이를 기억하는 방법들",
    subtitle: "유골함·메모리얼 보석·발 도장·그림 등 추모 방식, 선택 기준, 슬픔을 담는 공간",
    metaTitle: "반려동물 추모 기념품 — 떠난 아이를 기억하는 방법들 | 펫지기",
    metaDescription: "반려동물 추모 기념품 종류와 선택 기준. 유골함·메모리얼 보석·발 도장·그림·디지털 추모 등 방식별 특징, 슬픔을 담는 개인적 공간 만들기.",
    body: `<p>아이가 떠난 뒤 그 기억을 어떻게 간직할지 고민하는 보호자가 많다. 다양한 방법이 있지만, 중요한 것은 자신에게 맞는 방식으로 기억하는 것이다.</p>

<h2>유골 보관 방법</h2>
<ul>
<li><strong>유골함</strong>: 가장 일반적. 원목·도자기·금속 재질 다양, 이름 각인 가능</li>
<li><strong>유골 캡슐 목걸이·반지</strong>: 소량의 유골을 담아 항상 가까이</li>
<li><strong>메모리얼 보석(다이아몬드)</strong>: 유골의 탄소를 이용해 보석 제작. 비용 높지만 영구 보존</li>
<li><strong>수목장·산골</strong>: 특정 장소에 유골 뿌리기 (법적 허용 장소 확인 필요)</li>
</ul>

<h2>물리적 흔적 남기기</h2>
<div class="callout-dog">
<strong>따뜻한 기억을 남기는 방법</strong><br>
• 발 도장·코 도장: 석고·도자기·캔버스에 찍기. 살아있을 때 미리 만들어 두면 더 좋음<br>
• 털 보관: 작은 봉투 또는 수제 액자에 넣어 보관<br>
• 반려동물 초상화: 사진 기반 일러스트 또는 유화 의뢰<br>
• 사진 포토북: 함께한 시간의 기록
</div>

<h2>디지털·현대적 추모</h2>
<ul>
<li>3D 조각상: 사진으로 만드는 디지털 3D 프린팅 피규어</li>
<li>소셜 메모리얼 페이지: 함께한 사진·이야기 기록</li>
<li>반려동물 메모리얼 앱: 기념일 알림, 사진 아카이브</li>
</ul>

<h2>추모 공간 만들기</h2>
<p>집 안 한 곳에 작은 추모 공간을 만드는 것이 슬픔을 처리하는 데 도움이 된다는 연구들이 있다. 유골함, 사진, 좋아하던 장난감 하나를 놓는 것만으로도 충분하다.</p>

<h2>선택할 때 기억할 것</h2>
<ul>
<li>가격보다 본인에게 의미 있는 방식 선택</li>
<li>서두르지 않아도 됨 — 충분히 생각한 뒤 결정</li>
<li>가족 구성원과 함께 결정하는 것이 치유에 도움</li>
</ul>

<h2>마지막으로</h2>
<p>어떤 방식으로 기억하든, 그 마음이 진심이라면 그것이 올바른 추모다. 아이가 남긴 사랑은 어떤 형태로든 계속 곁에 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 장례·추모 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "한국반려동물장례협회 추모 서비스 현황 가이드 2023",
      "Packman, W. et al. — Pet loss and human bereavement: A review of psychological research. Death Stud 2011",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 추모 서비스 이용 시 해당 업체와 직접 상담하시기 바랍니다.",
    status: "published",
    publishedAt: "2027-01-15T11:00:00.000Z",
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
  console.log("블로그 포스트 121차 시딩 완료! (blog-726 ~ blog-730)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
