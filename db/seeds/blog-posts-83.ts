import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 83 — cat2×2 + cat3×1 + cat6×1 + cat5×1 = 5편 (IDs 536-540)
// Macros: B, A, D, E, F
// Angles: RA5, RA3, RA2, RA8, RA4

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-536",
    slug: "dog-low-sodium-diet-guide",
    type: "blog",
    category: 2,
    title: "강아지 저나트륨 식이 — 심장·신장 질환 강아지 보호자 필독",
    subtitle: "나트륨이 심장·신장에 미치는 영향, 저나트륨 사료 선택법, 피해야 할 식품",
    metaTitle: "강아지 저나트륨 식이 — 심장·신장 질환 식이 관리 가이드 | 펫지기",
    metaDescription: "강아지 심장·신장 질환 시 저나트륨 식이가 필요한 이유. 나트륨이 미치는 영향, 저나트륨 사료 선택 기준, 절대 주면 안 되는 고나트륨 식품을 정리했습니다.",
    body: `<p>심장 질환(MVD)이나 신장 질환(CKD) 강아지에게 "염분 조심하세요"라는 말을 듣지만, 실제로 어떻게 해야 하는지 막막하다. 저나트륨 식이의 원칙을 알아보자.</p>

<h2>나트륨이 심장·신장에 미치는 영향</h2>
<p>나트륨은 혈압을 높이고 체액 저류를 유발한다. 심장 부전 강아지에서 나트륨 과다는 폐수종(폐에 물 고임) 위험을 높인다. 신장 질환에서는 고혈압이 신장 손상을 가속화한다.</p>

<h2>일반 사료의 나트륨 함량</h2>
<p>많은 일반 사료의 나트륨 함량은 건물 기준 0.5~1.5% 수준이다. 심장·신장 처방식은 0.1~0.3%로 낮춰져 있다. 단순히 처방식으로 전환하는 것이 가장 효과적인 방법이다.</p>

<h2>절대 피해야 할 식품</h2>
<div class="callout-dog">
<strong>고나트륨 식품 주의 목록</strong><br>
• 소시지·핫도그·베이컨 (나트륨 매우 높음)<br>
• 짠맛 인간 음식 찌꺼기 전반<br>
• 시판 닭고기 육수 (소금 첨가)<br>
• 치즈 (고나트륨 + 고지방)<br>
• 짠 간식·과자류
</div>

<h2>저나트륨 사료 선택 기준</h2>
<ul>
<li>건물 기준 나트륨 0.3% 이하 확인</li>
<li>심장 또는 신장 처방식 우선 고려</li>
<li>사료 라벨에서 "sodium" 또는 "Na" 함량 확인</li>
<li>집밥 시 무염 닭고기 육수·재료만 사용</li>
</ul>

<h2>마지막으로</h2>
<p>저나트륨 식이는 약물만큼 중요한 치료의 일부다. "가끔 한 번쯤"이 심장 질환 강아지에게는 응급으로 이어질 수 있다. 보호자뿐 아니라 가족 전원이 알아야 하는 규칙이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Freeman, L.M. et al. — Nutritional alterations and the effect of fish oil supplementation in dogs with heart failure. JAVMA 1998",
      "한국수의심장학회 심장 질환 영양 관리 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-10T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-537",
    slug: "senior-dog-supplement-guide",
    type: "blog",
    category: 2,
    title: "노령견 보충제 — 무엇이 효과 있고 무엇이 마케팅인가",
    subtitle: "글루코사민·오메가3·항산화제·프로바이오틱스 효과 근거, 불필요한 보충제",
    metaTitle: "노령견 보충제 효과 — 근거 있는 것과 마케팅 구분 가이드 | 펫지기",
    metaDescription: "노령견에게 효과가 확인된 보충제와 마케팅에 불과한 것을 구분합니다. 글루코사민·오메가3·항산화제·프로바이오틱스 효과 근거를 정리했습니다.",
    body: `<p>노령견 보충제 시장은 매우 크다. 그러나 모든 보충제가 과학적 근거를 갖고 있는 것은 아니다. 근거가 있는 것과 없는 것을 구분하는 것이 중요하다.</p>

<h2>근거가 있는 보충제</h2>
<table>
<thead><tr><th>보충제</th><th>근거 수준</th><th>적응증</th></tr></thead>
<tbody>
<tr><td>오메가-3(EPA·DHA)</td><td>높음</td><td>염증 감소, 심장·신장, 피부</td></tr>
<tr><td>글루코사민+콘드로이틴</td><td>중간</td><td>관절염, 연골 보호</td></tr>
<tr><td>항산화제(비타민E+C)</td><td>중간</td><td>인지 기능, 면역</td></tr>
<tr><td>프로바이오틱스</td><td>중간</td><td>소화기 건강, 장내 균형</td></tr>
</tbody>
</table>

<h2>근거가 약한 보충제</h2>
<div class="callout-dog">
<strong>마케팅 주의 보충제</strong><br>
• "관절 강화" 단독 콜라겐 — 경구 흡수 형태가 실제 관절에 도달하는지 불명확<br>
• "두뇌 건강" 표방 허브 혼합 — 임상 근거 매우 부족<br>
• "면역 강화" 복합 제품 — 대부분 마케팅 언어<br>
• 아무 증거 없이 "천연" 강조 제품
</div>

<h2>보충제 선택 기준</h2>
<ul>
<li>수의사 추천 또는 NASC 인증 제품 우선</li>
<li>성분 함량이 명확히 표시된 것</li>
<li>"임상 연구 확인" 제품 vs "자연 유래" 마케팅 구분</li>
<li>현재 복용 중인 약물과 상호작용 수의사 확인</li>
</ul>

<h2>마지막으로</h2>
<p>보충제는 약이 아니다. 균형 잡힌 사료와 수의사 처방 약물을 대체할 수 없다. 그러나 잘 선택된 1~2가지 보충제는 노령견의 삶의 질 향상에 실제로 기여할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Innes, J.F. et al. — Randomised double-blind clinical trial of two nutraceuticals for the treatment of degenerative joint disease in dogs. Vet Rec 2003",
      "한국수의영양학회 노령견 보충제 사용 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-10T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-538",
    slug: "cat-lymphoma-guide",
    type: "blog",
    category: 3,
    title: "고양이 림프종 — 가장 흔한 암, 그러나 치료 가능성이 있다",
    subtitle: "고양이 림프종 종류, 소화기 vs 종격 vs 다발성 차이, 치료 옵션, 예후",
    metaTitle: "고양이 림프종 — 종류·치료·예후 완전 가이드 | 펫지기",
    metaDescription: "고양이에서 가장 흔한 암인 림프종의 종류와 치료 방법을 정리했습니다. 소화기형·종격형·다발성 림프종 차이, 화학 요법 옵션, 생존 기간 예후를 알아보세요.",
    body: `<p>고양이에서 가장 흔히 발생하는 암이 림프종이다. "암"이라는 단어에 포기하는 보호자가 있지만, 일부 유형은 치료 반응이 좋고 수 년의 생존을 기대할 수 있다.</p>

<h2>고양이 림프종의 주요 유형</h2>
<ul>
<li><strong>소화기형(위장관형)</strong>: 가장 흔함, 소장·대장 침범. 저등급은 치료 반응 좋음.</li>
<li><strong>종격형(흉부)</strong>: 젊은 고양이, 호흡 곤란. FeLV 연관.</li>
<li><strong>다발성 림프절형</strong>: 전신 림프절 비대. 공격적 치료 필요.</li>
<li><strong>비인두형</strong>: 코·목 부위. 방사선 치료 반응 좋음.</li>
</ul>

<h2>등급에 따른 예후 차이</h2>
<div class="callout-cat">
<strong>소화기형 림프종 예후 (가장 흔한 유형)</strong><br>
• <strong>저등급(소세포형)</strong>: 경구 클로람부실+스테로이드로 중앙 생존기간 2~3년<br>
• <strong>고등급(대세포형)</strong>: 화학 요법 필요, 중앙 생존기간 수개월<br>
▶ 조직 생검으로 등급 확인 필수 — 치료 계획이 완전히 다름
</div>

<h2>치료 옵션</h2>
<ul>
<li>저등급 소화기형: 경구 약물(클로람부실+프레드니솔론) — 집에서 복용 가능</li>
<li>고등급: 주사 화학 요법(COP 또는 CHOP 프로토콜)</li>
<li>비인두형: 방사선 단독 또는 병행</li>
</ul>

<h2>진단 중요성</h2>
<p>IBD와 저등급 소화기형 림프종은 증상이 유사하다. 차이를 확인하려면 내시경 또는 개복을 통한 생검이 필요하다. 정확한 진단이 치료 결과를 결정한다.</p>

<h2>마지막으로</h2>
<p>림프종 진단이 끝이 아니다. 유형과 등급에 따라 수년의 좋은 시간이 가능하다. 포기하지 말고 수의 종양 전문의와 치료 계획을 상담해보는 것을 권장한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Vail, D.M. — Lymphoma. Withrow and MacEwen's Small Animal Clinical Oncology 2013",
      "한국수의종양학회 고양이 림프종 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-10-11T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-539",
    slug: "petloss-memorial-keepsake",
    type: "blog",
    category: 6,
    title: "반려동물 기억 간직하기 — 애도를 도와주는 방법들",
    subtitle: "유골 활용 기념물, 사진 추모 방법, 기억 의식, 준비된 보호자를 위한 미리 하기",
    metaTitle: "반려동물 추모 기념품·의식 — 기억을 간직하는 방법 | 펫지기",
    metaDescription: "반려동물과의 기억을 간직하는 다양한 방법을 소개합니다. 유골 활용 기념물, 사진 추모, 기억 의식, 미리 준비하는 방법을 조심스럽게 정리했습니다.",
    body: `<p>반려동물이 세상을 떠난 후, 기억을 어떻게 간직할지 막막한 경우가 많다. 애도를 돕는 다양한 방법들을 알아두면, 그 순간에 스스로에게 맞는 것을 선택할 수 있다.</p>

<h2>기억하는 행위가 왜 중요한가</h2>
<p>추모 행위는 슬픔을 부정하는 것이 아니라, 그 존재가 실재했다는 것을 인정하는 과정이다. 심리학에서 추모 의식은 애도 과정을 건강하게 진행시키는 데 도움이 된다고 알려져 있다.</p>

<h2>유골 활용 기념물</h2>
<ul>
<li>유골 보석: 유골 일부를 압축해 보석으로 제작</li>
<li>기념패·유리 구슬: 유골 함유 공예품</li>
<li>수목장: 좋아하던 나무 아래 유골 묻기</li>
<li>납골당 위탁: 기일에 방문하는 공간 마련</li>
</ul>

<h2>사진·물건으로 기억하기</h2>
<div class="callout-cat">
<strong>기억 방법</strong><br>
• 좋아하던 사진으로 포토북 제작<br>
• 발도장·코도장 도장찍기 (생전에 미리 만들어두면 좋음)<br>
• 털 한 타래 보관 (소형 봉투에 이름·날짜 기재)<br>
• 함께 다녔던 장소 방문기 일지
</div>

<h2>기억 의식 만들기</h2>
<ul>
<li>기일 추모: 좋아하던 음식 차려두거나 좋아하던 공원 방문</li>
<li>기부: 반려동물 이름으로 보호소 후원</li>
<li>편지 쓰기: 하고 싶었던 말 남기기</li>
<li>새 식물 심기: 생명의 연속성으로서</li>
</ul>

<h2>미리 준비하는 방법</h2>
<p>마지막이 다가오고 있다는 것을 느끼는 보호자라면, 지금 발도장을 찍어두거나 함께 좋은 시간을 보내는 것이 나중에 후회를 줄이는 데 도움이 된다.</p>

<h2>마지막으로</h2>
<p>어떤 방식으로 기억하든, 그것이 당신에게 맞는 방법이라면 옳다. 기억은 슬픔을 영구화하는 것이 아니라, 사랑이 있었다는 것을 확인하는 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "한국펫로스증후군연구회 추모 의식 심리적 효과 연구",
      "Packman, W. & Butler, L.D. — Posttraumatic growth and meaning making in pet loss. OMEGA 2011",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-11T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-540",
    slug: "dog-nail-trimming-guide",
    type: "blog",
    category: 5,
    title: "강아지 발톱 관리 완전 가이드 — 얼마나 자주, 어떻게",
    subtitle: "발톱 적정 길이 기준, 혈관(퀵) 위치, 자르는 방법, 혈이 나왔을 때 대처",
    metaTitle: "강아지 발톱 관리 가이드 — 주기·혈관 위치·자르는 방법 | 펫지기",
    metaDescription: "강아지 발톱 관리 방법을 정리했습니다. 적정 발톱 길이, 혈관(퀵) 위치 확인법, 올바른 자르는 방법, 피가 났을 때 응급 처치를 알아보세요.",
    body: `<p>발톱이 너무 길면 걸음걸이가 이상해지고, 발 구조가 틀어지며, 골절 위험도 높아진다. 발톱 관리는 미용이 아닌 건강 관리다.</p>

<h2>적정 발톱 길이 기준</h2>
<p>강아지가 평지에 서 있을 때 발톱이 바닥에 닿지 않는 것이 이상적이다. 걸을 때 "딸깍딸깍" 소리가 난다면 이미 너무 긴 것이다.</p>

<h2>혈관(퀵, Quick) 위치 확인</h2>
<div class="callout-dog">
<strong>퀵 확인 방법</strong><br>
• 흰 발톱: 분홍색 혈관이 보임 — 분홍 부분을 3~4mm 앞에서 자르기<br>
• 검은 발톱: 혈관이 안 보임 → 단면을 확인하면서 조금씩 자르기<br>
  (단면에 하얀/회색 부분이 나오면 퀵 가까이 온 것)<br>
• 퀵에서 최소 2mm 여유 두기
</div>

<h2>자르는 방법</h2>
<ul>
<li>클리퍼를 발톱과 수직이 아닌 45도로 기울여 자르기</li>
<li>한 번에 많이 자르지 않고 조금씩 여러 번</li>
<li>한 발에 1~2개씩 나눠 자르기 (거부반응 줄이기)</li>
<li>간식과 함께 긍정 강화 병행</li>
</ul>

<h2>피가 났을 때 응급 처치</h2>
<ul>
<li>지혈제(스티프틱 파우더) 또는 밀가루·옥수수 전분 사용</li>
<li>거즈로 1~2분 압박</li>
<li>강아지가 핥지 않게 주의</li>
<li>출혈이 10분 이상 지속되면 병원</li>
</ul>

<h2>관리 주기</h2>
<p>주 1~2회 관리가 이상적이다. 오래 방치할수록 퀵이 길어져 짧게 자르기 어려워진다. 정기 관리를 통해 퀵을 점진적으로 짧게 만드는 것이 목표다.</p>

<h2>마지막으로</h2>
<p>강아지가 발톱 관리를 싫어한다면 훈련이 필요하다. 미용실에서 한 번에 해결하는 것보다 집에서 매주 짧게 관리하는 습관이 강아지와 보호자 모두에게 편하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 케어 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Animal Hospital Association — Nail Trimming Guidelines",
      "한국반려동물행동상담협회 그루밍 훈련 가이드라인",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-10-12T09:00:00.000Z",
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
  console.log("블로그 포스트 83차 시딩 완료! (blog-536 ~ blog-540)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
