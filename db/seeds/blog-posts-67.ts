import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../Content } from "../schema";

// Blog batch 67 — cat1×2 + cat3×1 + cat5×1 + cat4×1 = 5편 (IDs 456-460)
// Macros: F, B, E, A, F
// Angles: RA4, RA1, RA6, RA3, RA5

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-456",
    slug: "multi-dog-household-management",
    type: "blog",
    category: 1,
    title: "다견 가정 관리 — 두 마리 이상의 개가 평화롭게 사는 비결",
    subtitle: "개간 자원 경쟁 줄이기, 개별 식사·수면 공간, 무리 내 긴장 읽기, 싸움 예방",
    metaTitle: "다견 가정 갈등 예방 관리 — 두 마리 이상 강아지 가이드 | 펫지기",
    metaDescription: "두 마리 이상 강아지가 함께 사는 다견 가정 관리법. 자원 경쟁 줄이기, 개별 공간 확보, 무리 내 긴장 신호 읽기, 싸움 예방법을 정리했습니다.",
    body: `<p>두 마리 이상의 개가 함께 사는 다견 가정은 각 개의 필요를 개별적으로 충족시켜야 한다. 자원 공유가 문제의 핵심이다.</p>

<h2>자원 경쟁이 갈등의 주원인</h2>
<p>다견 가정에서 싸움의 가장 흔한 원인은 자원 경쟁이다. 음식·장난감·보호자의 관심·잠자는 공간을 두고 경쟁이 생긴다.</p>

<h2>자원 관리 원칙</h2>
<div class="callout-dog">
<strong>다견 가정 자원 공식</strong><br>
• 밥그릇: 개 수만큼 별도, 다른 방향 배치<br>
• 물그릇: 개 수 + 1개<br>
• 잠자는 공간: 각자의 침대<br>
• 고가치 간식: 각자 별도 공간에서<br>
• 보호자 관심: 1:1 시간 정기 할당
</div>

<h2>무리 내 긴장 신호</h2>
<ul>
<li>한 개가 지속적으로 다른 개를 따라다니며 주시</li>
<li>먹는 것·놀이를 한 개가 독점</li>
<li>한 개가 특정 공간에서 다른 개를 밀어냄</li>
<li>조용한 으르렁거림 (보호자가 없을 때)</li>
</ul>

<h2>싸움 예방</h2>
<ul>
<li>고가치 자원(뼈·동결건조 간식) 제공 시 분리</li>
<li>보호자 귀가 흥분 시 개들 사이에 주목이 쏠리지 않게</li>
<li>발정기 암컷이 있으면 수컷 분리 또는 중성화</li>
<li>수의사·행동 전문가의 개입이 필요한 심각한 공격성은 스스로 해결하려 하지 않기</li>
</ul>

<h2>마지막으로</h2>
<p>다견 가정의 평화는 자연적으로 생기지 않는다. 자원을 충분히 제공하고, 각 개에게 개별 시간을 주고, 긴장 신호를 일찍 읽는 것이 갈등 예방의 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Horwitz, D.F. — Multi-Dog Households. Veterinary Focus 2020",
      "한국반려동물행동상담협회 다견 가정 관리 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-31T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-457",
    slug: "exotic-pet-legal-ownership-guide",
    type: "blog",
    category: 1,
    title: "특수 동물(파충류·조류·포유류) 소유 — 법적으로 허용되는 것과 금지된 것",
    subtitle: "야생동물보호법 소유 가능 목록, 허가 필요 동물, 불법 소유 시 처벌",
    metaTitle: "특수 동물 소유 법적 기준 — 허용·금지·허가 필요 목록 | 펫지기",
    metaDescription: "파충류·조류·소형 포유류 등 특수 동물 소유의 법적 기준. 허용 가능 목록, 허가 필요 동물, 불법 소유 시 처벌을 정리했습니다.",
    body: `<p>도마뱀·앵무새·미어캣·설탕날다람쥐 — 특수 동물 수요가 늘고 있다. 그러나 모든 동물을 합법적으로 소유할 수 있는 것은 아니다.</p>

<h2>법적 근거</h2>
<p>야생생물 보호 및 관리에 관한 법률(야생생물법)이 기준이다. 멸종 위기종, 국제적으로 거래가 제한된 CITES 부속서 I~II 종은 소유·거래에 허가가 필요하다.</p>

<h2>일반적으로 소유 가능한 특수 동물</h2>
<ul>
<li>비단뱀·볼파이톤 (단, CITES 확인)</li>
<li>레오파드 게코·크레스티드 게코</li>
<li>블루텅 스킹크</li>
<li>버드젯·코카티엘 (가장 일반적)</li>
<li>기니피그·토끼·친칠라</li>
<li>설탕날다람쥐 (합법, 단 수입 경로 확인)</li>
</ul>

<h2>허가 또는 금지 동물</h2>
<div class="callout-cat">
<strong>소유 전 반드시 법적 확인 필요</strong><br>
• 이구아나·왕도마뱀 (일부 CITES 규제)<br>
• 구렁이·살모사 등 독사<br>
• 앵무새 대형 품종 (CITES I급 포함)<br>
• 미어캣·프레리독 (수입 규제 있음)<br>
• 원숭이·침팬지 (소유 불법)
</div>

<h2>구입 전 확인사항</h2>
<ul>
<li>CITES 수출입 허가증 확인 (수입 동물)</li>
<li>국내 합법 브리더 또는 수입업체 여부</li>
<li>해당 지자체 야생동물 관리 부서 문의</li>
</ul>

<h2>마지막으로</h2>
<p>특수 동물 소유 전 법적 지위 확인은 필수다. 불법 소유는 500만 원 이하 벌금 또는 2년 이하 징역이 될 수 있다. 합법적인 경로로 입수하고, 전문 수의사(엑조틱)를 사전에 파악해두는 것이 책임 있는 소유의 시작이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "야생생물 보호 및 관리에 관한 법률 (야생생물법)",
      "환경부 CITES 국내 이행기관 안내",
    ]),
    disclaimer: "이 글은 참고용이며 구체적인 법적 확인은 관련 기관에 직접 문의하세요.",
    status: "published",
    publishedAt: "2026-08-31T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-458",
    slug: "cat-chronic-pain-recognition",
    type: "blog",
    category: 3,
    title: "고양이 만성 통증 인지하기 — 아픔을 숨기는 동물의 신호",
    subtitle: "고양이 통증 행동 지표(FGS), 관절염·치통·내장 통증 신호, 통증 관리 방법",
    metaTitle: "고양이 만성 통증 신호 — 숨기는 아픔을 읽는 방법 | 펫지기",
    metaDescription: "고양이는 통증을 숨깁니다. 고양이 통증 행동 지표(FGS), 관절염·치통 신호, 집에서 할 수 있는 모니터링과 통증 관리 방법을 정리했습니다.",
    body: `<p>고양이는 포식자이면서 동시에 피식자다. 야생에서 아픔을 드러내면 위험에 노출된다. 이 본능이 가정 고양이에게도 남아있어, 통증을 숨긴다.</p>

<h2>고양이가 통증을 드러내는 방식</h2>
<p>울거나 소리를 내는 경우는 오히려 드물다. 대신 행동 변화로 나타난다:</p>
<ul>
<li>활동 감소 (평소보다 덜 움직임, 점프 안 함)</li>
<li>높은 곳을 피하거나 계단 기피</li>
<li>그루밍 변화 (특정 부위 과도 그루밍 or 전혀 안 함)</li>
<li>식욕 감소</li>
<li>숨거나 혼자 있으려 함</li>
<li>만지면 반응 (피하기, 하악질)</li>
<li>얼굴 표정 변화 (눈 가늘게, 귀 뒤로)</li>
</ul>

<h2>고양이 통증 얼굴 지표 (FGS)</h2>
<p>Feline Grimace Scale(FGS)은 수의사들이 사용하는 고양이 통증 평가 도구다. 귀 위치·눈 모양·뺨 긴장도·코 주름·수염 위치를 평가한다.</p>

<h2>흔한 만성 통증 원인</h2>
<ul>
<li><strong>관절염</strong>: 7세 이상 고양이에서 90% 이상에서 X-ray 소견. 점프 감소·그루밍 감소가 주요 신호.</li>
<li><strong>치통·구강 통증</strong>: 밥을 먹는 방식 변화, 한쪽으로만 씹기, 침 흘림.</li>
<li><strong>만성 신장·소화기 통증</strong>: 구토 빈도 증가, 웅크리는 자세 변화.</li>
</ul>

<h2>마지막으로</h2>
<p>고양이의 행동 변화는 아픔의 신호일 가능성이 높다. '나이 들어서 그런가 보다'가 통증을 수년간 방치하게 만든다. 행동이 달라진 노령묘라면 통증 평가를 요청하는 것이 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Evangelista, M.C. et al. — Facial expression of pain in cats: the development and validation of a Feline Grimace Scale. Scientific Reports 2019",
      "한국고양이수의사회 통증 평가 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-09-01T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-459",
    slug: "dog-daily-mental-stimulation-routine",
    type: "blog",
    category: 5,
    title: "강아지 하루 정신 자극 루틴 — 15분으로 행동 문제 예방하기",
    subtitle: "아침·점심·저녁 루틴 설계, 훈련·노즈워크·놀이의 조합, 독립적 자극 도구",
    metaTitle: "강아지 하루 정신 자극 루틴 — 15분 행동 예방 가이드 | 펫지기",
    metaDescription: "강아지 행동 문제를 예방하는 하루 15분 정신 자극 루틴. 아침·점심·저녁 루틴 설계, 훈련·노즈워크·놀이 조합, 독립 자극 도구를 정리했습니다.",
    body: `<p>많은 강아지 행동 문제는 정신적 자극 부족에서 시작된다. 하루 15분의 체계적인 정신 자극 루틴만으로 파괴 행동·과도한 짖음·무기력을 크게 줄일 수 있다.</p>

<h2>왜 신체 운동만으로 부족한가</h2>
<p>연구에 따르면 30분의 노즈워크는 2시간의 달리기에 맞먹는 정신적 피로를 준다. 강아지의 뇌를 사용하게 하는 것이 몸만 지치게 하는 것보다 훨씬 효과적이다.</p>

<h2>하루 루틴 설계</h2>
<div class="callout-dog">
<strong>15분 기본 루틴</strong><br>
<strong>아침 (출근 전 5분)</strong><br>
퍼즐피더 밥 먹기 → 사료를 그냥 주지 않고 퍼즐로<br><br>
<strong>점심 (가능하면 5분)</strong><br>
간단한 훈련 세션 (앉아·눈 마주침 반복)<br><br>
<strong>저녁 (5분 이상)</strong><br>
노즈워크 + 짧은 낚싯대 놀이
</div>

<h2>독립 자극 도구</h2>
<p>보호자가 집에 없을 때도 자극이 필요하다:</p>
<ul>
<li>Kong 또는 리키맷 (냉동 간식 채워서)</li>
<li>스너플 매트 (사료 숨기기)</li>
<li>창문 뷰 확보 (밖을 볼 수 있는 위치)</li>
<li>씹는 장난감 (안전한 소재)</li>
</ul>

<h2>루틴 일관성의 중요성</h2>
<p>강아지는 예측 가능한 루틴에서 안정감을 얻는다. 매일 같은 시간에 같은 방식으로 진행하면 기대감 자체가 긍정적 자극이 된다. 일관성 없이 가끔 하는 자극보다 매일 짧게 하는 것이 훨씬 효과적이다.</p>

<h2>마지막으로</h2>
<p>행동 문제가 이미 생겼다면 루틴 추가로 완전히 해결되지 않을 수 있다. 그러나 예방 측면에서 하루 15분의 투자는 가장 가성비 좋은 반려동물 관리다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Alexandra Horowitz — Inside of a Dog",
      "한국반려동물행동상담협회 일일 자극 루틴 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-09-01T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-460",
    slug: "pet-noise-rental-dispute-guide",
    type: "blog",
    category: 4,
    title: "반려동물 소음 분쟁 — 법적 대처와 예방 방법",
    subtitle: "반려동물 짖음·소음으로 인한 이웃 분쟁 처리, 층간소음 법적 기준, 행정·민사 대응",
    metaTitle: "반려동물 소음 이웃 분쟁 법적 대처 가이드 | 펫지기",
    metaDescription: "반려동물 짖음으로 인한 이웃 분쟁 처리 방법. 층간소음 법적 기준, 행정·민사 대응, 소음 줄이는 훈련 방법을 정리했습니다.",
    body: `<p>반려동물 소음, 특히 강아지 짖음으로 인한 이웃 분쟁은 점점 늘고 있다. 보호자로서 알아야 할 법적 권리와 책임을 정리했다.</p>

<h2>법적 기준</h2>
<p>반려동물 소음은 층간소음과 다른 카테고리다. 명확한 소음 기준치가 반려동물 특화로 규정되어 있지는 않다. 그러나 반복적·지속적인 소음이 이웃에게 생활 방해를 준다면 민법상 생활방해(민법 제214조)로 손해배상 청구 가능성이 있다.</p>

<h2>이웃 분쟁 단계별 대처</h2>
<ol>
<li><strong>직접 대화</strong>: 가장 효과적. 문제 인식을 보여주고 개선 계획 제시.</li>
<li><strong>관리사무소 중재</strong>: 공동주택의 경우 중재 요청.</li>
<li><strong>환경부 층간소음이웃사이센터(1661-2642)</strong>: 중립적 조정.</li>
<li><strong>지자체 민원</strong>: 반복적 신고 시 동물보호 담당 부서 연계.</li>
<li><strong>민사 조정·소송</strong>: 극단적 갈등 시.</li>
</ol>

<h2>짖음 예방이 최선</h2>
<div class="callout-dog">
<strong>짖음 줄이는 방법</strong><br>
• 분리불안 훈련 (원인 해결)<br>
• 충분한 운동으로 에너지 소진<br>
• 소리 자극에 탈감작 훈련<br>
• 짖지 않을 때 보상<br>
• 심한 경우 행동 수의사 상담 + 약물 고려
</div>

<h2>항의를 받았을 때</h2>
<ul>
<li>방어적 반응 대신 문제를 인정하고 개선 의지 표현</li>
<li>훈련·개선 과정을 이웃에게 공유 (신뢰 형성)</li>
<li>임시 해결책 제안 (외출 시 이동 위탁)</li>
</ul>

<h2>마지막으로</h2>
<p>반려동물 소음 분쟁은 강아지의 문제가 아니라 관리의 문제다. 짖음의 원인을 해결하는 것이 이웃과의 갈등을 예방하는 가장 근본적인 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "민법 제214조 (소유권의 방해 제거 및 예방 청구권)",
      "환경부 층간소음이웃사이센터 분쟁 처리 안내",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 구체적인 법적 분쟁은 전문가에게 문의하세요.",
    status: "published",
    publishedAt: "2026-09-02T09:00:00.000Z",
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
  console.log("블로그 포스트 67차 시딩 완료! (blog-456 ~ blog-460)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
