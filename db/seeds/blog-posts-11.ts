import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

const NOW = new Date().toISOString();

function scheduleDate(index: number): string {
  const start = new Date("2026-05-22T10:00:00");
  const d = new Date(start.getTime() + index * 5 * 60 * 60 * 1000);
  return d.toISOString();
}

const BLOG_POSTS_11: NewContent[] = [
  // ── 101. 고양이 환경 풍요화 (cat5) ──
  {
    id: "blog-cat-environmental-enrichment",
    slug: "cat-environmental-enrichment",
    type: "blog",
    category: 5,
    title: "고양이 환경 풍요화 — 실내 고양이의 삶을 풍요롭게 만드는 방법",
    metaTitle: "고양이 환경 풍요화 | 캣타워·창문·사냥 놀이·후각 자극 | 펫지기",
    metaDescription: "실내 고양이의 스트레스를 줄이고 자연 본능을 채우는 환경 풍요화 방법. 수직 공간·창문 관찰·사냥 놀이·후각 자극·인지 놀이 실전 팁.",
    body: `<p>실내 고양이는 야생 고양이에 비해 활동 반경이 극도로 제한된다. 국제고양이의학회(ISFM)에 따르면 자극이 부족한 실내 환경은 스트레스, 과식, 과그루밍, 공격성, FLUTD(하부요로계 질환) 등 다양한 문제의 원인이 된다. 환경 풍요화(environmental enrichment)는 고양이의 자연 본능을 실내에서 충족시켜 주는 것이다.</p>

<h2>수직 공간 — 고양이의 첫 번째 욕구</h2>
<p>고양이는 높은 곳에서 주변을 관찰하고 자신을 안전하게 느끼는 본능이 있다. 캣타워, 벽면 선반, 냉장고 위 공간 등 다양한 높이의 수직 공간을 제공한다. 다묘 가정에서는 수직 공간이 더 중요하다 — 각 고양이가 서로를 피해 올라갈 수 있어야 한다.</p>

<h2>창문 관찰 — 고양이 TV</h2>
<p>바깥 풍경을 볼 수 있는 창가 자리는 고양이에게 최고의 자극 환경이다. 창가에 발판이나 해먹을 설치해 편하게 앉아 볼 수 있게 한다. 새집이나 새 피더를 창가 바깥에 달면 더 풍부한 시각 자극이 된다. 창문 필름으로 자외선을 차단하면서도 시야는 확보할 수 있다.</p>

<h2>사냥 놀이 — 하루 2번, 각 15분</h2>
<p>고양이의 가장 강력한 본능은 사냥이다. ISFM은 사냥 시뮬레이션 놀이를 하루 2회, 각 15분씩 권장한다. 낚싯대 장난감을 이용해 파리처럼, 새처럼, 쥐처럼 다양하게 움직이면 고양이가 온 신경을 집중한다. 놀이 마지막에는 반드시 먹을 수 있는 것(간식)으로 사냥 성공감을 준다 — 잡지 못하는 놀이만 반복하면 좌절감이 쌓인다.</p>

<h2>후각 자극</h2>
<ul>
  <li>캣닙(catnip): 약 60~70%의 고양이에서 흥분 반응을 유발한다. 안전하며 중독성이 없다.</li>
  <li>실버바인(마타타비): 캣닙에 반응하지 않는 고양이도 반응하는 경우가 많다.</li>
  <li>골판지 상자: 새 박스의 냄새를 탐색하는 것 자체가 자극이다.</li>
  <li>허브 화분(바질, 개박하, 레몬그라스): 고양이가 냄새 맡고 건드리는 것을 즐긴다.</li>
</ul>

<h2>인지 자극 — 퍼즐 피더</h2>
<p>밥을 그냥 그릇에 주는 대신 퍼즐 피더나 흩뿌려주기(scatter feeding)로 사냥 탐색 본능을 자극한다. 처음엔 쉬운 것부터 시작해 고양이가 성공 경험을 쌓게 한다. 너무 어려우면 포기하고 음식 섭취가 줄어들므로 난이도 조절이 중요하다.</p>

<p>다묘 가정에서 고양이들 사이의 갈등을 줄이는 방법은 <a href="/blog/multi-cat-introduction-guide">다묘 소개 가이드</a>를 참고하자. 고양이 스트레스 신호 파악은 <a href="/blog/cat-stress-signals-guide">고양이 스트레스 신호 가이드</a>에서 확인할 수 있다.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(70),
    authorName: "펫지기 에디터",
    sources: [
      "International Society of Feline Medicine (ISFM) — Environmental Needs Guidelines",
      "American Association of Feline Practitioners (AAFP) — Feline Environmental Enrichment",
      "Cornell Feline Health Center — Environmental Enrichment for Indoor Cats",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 102. 강아지 미용 종류 가이드 (cat5) ──
  {
    id: "blog-dog-grooming-types-guide",
    slug: "dog-grooming-types-guide",
    type: "blog",
    category: 5,
    title: "강아지 미용 종류 완전 가이드 — 견종별 적합한 커트와 주기",
    metaTitle: "강아지 미용 종류 | 위생컷·스포팅컷·견종별 미용 주기 | 펫지기",
    metaDescription: "강아지 미용 종류(위생컷·스포팅컷·테디베어컷)와 견종별 적합한 스타일. 미용 주기 기준, 미용실 선택 팁, 집에서 할 수 있는 기본 그루밍.",
    body: `<p>강아지 미용은 단순히 예쁘게 보이기 위한 것이 아니다. 털이 너무 길면 피부 통풍이 안 돼 피부 트러블이 생기고, 눈앞을 가리는 털은 눈 건강에 영향을 준다. 각 견종에 맞는 미용 스타일과 주기를 알아두면 강아지 건강에도 도움이 된다.</p>

<h2>미용이 필요한 견종 vs 그렇지 않은 견종</h2>
<ul>
  <li><strong>정기 미용 필요</strong>: 말티즈, 시추, 비숑, 푸들, 요크셔테리어, 코커 스패니얼 — 털이 계속 자라는 품종이라 방치하면 엉킴·피부 문제 발생</li>
  <li><strong>기본 관리만 필요</strong>: 비글, 래브라도, 골든 리트리버 — 털갈이 시기에 목욕·빗질이 중심이며 대규모 커트는 불필요</li>
  <li><strong>이중모 스트리핑 필요</strong>: 테리어 계열 — 일반 커트보다 스트리핑으로 관리하는 것이 코트 품질 유지에 좋다</li>
</ul>

<h2>주요 미용 스타일</h2>

<h3>위생컷</h3>
<p>전신을 짧게 자르는 것이 아니라 생식기·항문 주변, 발바닥 패드 사이, 귀 안쪽 털만 정리하는 기본 위생 목적의 미용이다. 4~6주에 한 번이 적절하며, 집에서도 가능한 부분이다.</p>

<h3>스포팅컷 (풀 커트)</h3>
<p>전신을 동일한 길이로 짧게 자른다. 더운 계절에 인기 있지만, 이중모 견종은 오히려 체온 조절 기능이 저하될 수 있어 전문가 의견이 갈린다.</p>

<h3>테디베어컷</h3>
<p>얼굴을 둥글게 자르는 스타일로 소형견에서 가장 인기 있다. 전신의 털 길이는 보호자 취향에 따라 조절한다.</p>

<h3>퍼피컷</h3>
<p>전체적으로 균일하게 짧게 자르는 스타일. 관리가 편하고 여름에 적합하다.</p>

<h2>미용 주기 기준</h2>
<ul>
  <li>소형 미용견(말티즈, 시추 등): 4~8주</li>
  <li>푸들: 6~8주</li>
  <li>대형 미용견(스탠다드 푸들, 코커 스패니얼): 6~10주</li>
  <li>단모종(비글, 레트리버): 필요 시 (주로 목욕 + 빗질)</li>
</ul>

<h2>미용실 선택 팁</h2>
<ul>
  <li>시설을 볼 수 있는 곳 (유리 통창이 있는 등)</li>
  <li>강아지를 안정시키는 방식을 설명해 주는 곳</li>
  <li>예방접종 여부를 확인하는 곳</li>
  <li>처음엔 짧은 시간(목욕만) 방문 후 반응을 보고 결정</li>
</ul>

<p>집에서 목욕을 직접 하고 싶다면 <a href="/blog/dog-bath-guide">강아지 목욕 주기와 방법</a>을 참고하자. 발톱 손질은 <a href="/blog/dog-nail-trimming-guide">강아지 발톱 손질 가이드</a>에서 확인할 수 있다.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(71),
    authorName: "펫지기 에디터",
    sources: [
      "American Kennel Club (AKC) — Dog Grooming Guide",
      "WSAVA — Preventive Healthcare Guidelines",
      "Professional Pet Groomers Association (PPGA) — Breed-Specific Grooming",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 103. 고양이 발톱 손질 (cat5) ──
  {
    id: "blog-cat-nail-trimming-guide",
    slug: "cat-nail-trimming-guide",
    type: "blog",
    category: 5,
    title: "고양이 발톱 자르기 — 거부하는 고양이도 할 수 있는 방법",
    metaTitle: "고양이 발톱 자르기 방법 | 발톱 길이·퀵·거부 적응 훈련 | 펫지기",
    metaDescription: "고양이 발톱 손질 단계별 방법과 발톱 자르기를 거부하는 고양이 적응 훈련. 적절한 주기, 퀵 자르지 않는 팁, 스크래처로 자연 마모 돕는 법.",
    body: `<p>고양이 발톱 손질은 보호자와 고양이 모두에게 스트레스일 수 있다. 많은 집사가 "도저히 못하겠다"며 포기하지만, 올바른 방법과 적응 훈련으로 대부분의 고양이에게 가능하다. 발톱 관리를 안 하면 발톱이 발바닥 패드 안으로 파고들거나, 가구·사람 피부에 상처를 낼 수 있다.</p>

<h2>발톱 손질 주기</h2>
<p>실내 고양이는 스크래처와 자연 마모로 어느 정도 관리되지만, 보통 2~4주에 한 번 확인하고 필요하면 자른다. 발톱이 카펫이나 천에 자꾸 걸리거나 소파에 올라탈 때 발톱 소리가 난다면 자를 때가 됐다. 노령묘는 발톱이 더 빨리 두꺼워지므로 자주 확인이 필요하다.</p>

<h2>도구</h2>
<ul>
  <li><strong>고양이 전용 클리퍼</strong>: 작고 정밀한 날이 있어 고양이 발톱에 적합하다. 사람용 손톱가위는 피한다.</li>
  <li><strong>지혈 파우더</strong>: 퀵을 자르는 사고에 대비해 준비한다.</li>
</ul>

<h2>자르는 방법</h2>
<p>고양이를 조용한 시간에 무릎 위에 편안하게 앉힌다. 발을 부드럽게 잡고 엄지와 검지로 발바닥 패드를 살짝 눌러 발톱을 내민다. 흰 발톱은 투명해 퀵(핑크색 혈관)이 보이므로 2~3mm 앞을 자른다. 검은 발톱은 조금씩 잘라 단면을 확인한다 — 흰 원이 나타나면 퀵이 가까운 것이다.</p>
<p>한 번에 모든 발톱을 자르려 하지 않아도 된다. 하루 한 발씩 나눠서 해도 무방하다.</p>

<h2>거부하는 고양이 — 단계적 적응 훈련</h2>
<ol>
  <li>클리퍼를 평소 고양이가 지내는 공간에 두어 냄새를 익히게 한다</li>
  <li>발을 잡는 것만 연습하면서 간식을 준다 (며칠 반복)</li>
  <li>클리퍼를 발톱에 대기만 하고 간식 — 자르지 않는다</li>
  <li>발톱 하나씩 실제로 자르면서 즉시 간식</li>
  <li>모든 발톱을 완료 후 놀이 시간으로 보상</li>
</ol>

<h2>스크래처로 자연 마모 돕기</h2>
<p>좋은 스크래처를 제공하면 발톱 자르는 빈도를 줄일 수 있다. 세로형 사이잘삼 스크래처는 발톱 바깥 껍질(각질)을 자연스럽게 벗기는 역할을 한다. 스크래처 선택법은 <a href="/blog/cat-scratcher-guide">고양이 스크래처 완벽 가이드</a>를 참고하자. 강아지 발톱 손질은 <a href="/blog/dog-nail-trimming-guide">강아지 발톱 손질 가이드</a>에서 확인할 수 있다.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(72),
    authorName: "펫지기 에디터",
    sources: [
      "American Association of Feline Practitioners (AAFP) — Feline Nail Care",
      "Cornell Feline Health Center — Scratching and Claw Care",
      "WSAVA — Preventive Healthcare Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 104. 강아지 냄새 관리 (cat5) ──
  {
    id: "blog-dog-odor-management",
    slug: "dog-odor-management",
    type: "blog",
    category: 5,
    title: "강아지 냄새 관리 — 원인별로 다른 해결법",
    metaTitle: "강아지 냄새 원인과 해결법 | 체취·귀·입냄새·항문낭 | 펫지기",
    metaDescription: "강아지 냄새 종류별 원인과 해결법. 체취·귀 냄새·구취·항문낭 냄새·발바닥 냄새 구별법과 집에서 할 수 있는 관리, 병원 가야 하는 기준.",
    body: `<p>강아지를 키우면 냄새가 난다고 하지만, 그 냄새의 종류에 따라 단순 관리로 해결되는 것과 동물병원이 필요한 것이 다르다. 냄새의 위치와 특성을 파악하면 올바른 대처가 가능하다.</p>

<h2>강아지 냄새의 주요 원인</h2>

<h3>체취 — 피지선과 아포크린샘</h3>
<p>강아지는 전신에 피지선과 아포크린샘이 있어 특유의 체취가 있다. "개 냄새"로 불리는 이 체취는 정상이다. 목욕을 너무 자주 하면 피부 보호 지방 성분이 씻겨 오히려 과잉 분비가 생긴다. 품종별 적정 목욕 주기는 <a href="/blog/dog-bath-guide">강아지 목욕 가이드</a>에서 확인한다.</p>

<h3>귀 냄새 — 외이염 신호</h3>
<p>귀에서 심한 냄새, 특히 발효된 냄새나 매우 불쾌한 냄새가 난다면 외이염이나 효모 감염을 의심해야 한다. 분비물(색·점도 확인)이 동반되는지 살피고, 이상하면 동물병원을 방문한다. 귀 청소 방법은 <a href="/blog/dog-ear-cleaning">강아지 귀 청소 가이드</a>를 참고하자.</p>

<h3>입냄새 — 구강 건강 문제</h3>
<p>가벼운 입냄새는 자연스럽지만, 생선 썩은 냄새나 암모니아 냄새처럼 심한 구취는 치주 질환, 신장 문제, 당뇨의 신호일 수 있다. 정기적인 칫솔질과 덴탈 간식이 예방의 기본이다. <a href="/blog/dog-dental-care">강아지 치아 관리 가이드</a>를 참고하자.</p>

<h3>항문낭 냄새 — 분비물 막힘</h3>
<p>강아지가 엉덩이를 바닥에 질질 끌거나, 항문 주변을 자꾸 핥거나, 특유의 비린내가 강해졌다면 항문낭이 막혔을 가능성이 있다. 항문낭 분비물은 매우 강한 냄새가 특징이다. 수의사나 그루머에게 짜달라고 요청할 수 있다. 스스로 짜는 것은 잘못 하면 손상이 생길 수 있으므로 처음에는 전문가에게 배우는 것이 좋다.</p>

<h3>발바닥 냄새 — 흔히 "팝콘 냄새"</h3>
<p>강아지 발바닥에서 나는 팝콘·옥수수 냄새는 정상적인 피부 박테리아와 효모균이 만드는 것이다. 심한 냄새나 발 핥기가 과도하다면 발바닥 염증이나 알러지를 의심한다.</p>

<h2>집 안 냄새 줄이기</h2>
<ul>
  <li>침구류와 강아지 용품 정기 세탁</li>
  <li>공기청정기 (HEPA + 활성탄 필터 조합이 효과적)</li>
  <li>강아지가 주로 있는 공간 환기</li>
  <li>베이킹소다를 카펫에 뿌렸다가 진공청소기로 흡입 (자연 탈취)</li>
  <li>강아지용 탈취 스프레이 (성분이 안전한 것인지 확인)</li>
</ul>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(73),
    authorName: "펫지기 에디터",
    sources: [
      "American Kennel Club (AKC) — Why Does My Dog Smell?",
      "Merck Veterinary Manual — Anal Sac Disease in Dogs",
      "AVMA — Pet Dental Health",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 105. 고양이 수면 패턴 (cat5) ──
  {
    id: "blog-cat-sleep-patterns",
    slug: "cat-sleep-patterns",
    type: "blog",
    category: 5,
    title: "고양이 수면 패턴 — 하루 16시간 자는 이유와 정상 범위",
    metaTitle: "고양이 수면 시간·패턴 | 하루 얼마나 자야 정상인가 | 펫지기",
    metaDescription: "고양이가 하루 14~16시간 자는 이유와 나이별 정상 수면 시간. 새벽 활동 줄이는 방법, 갑자기 너무 많이 자거나 못 잘 때 확인해야 할 것.",
    body: `<p>새로 고양이를 입양한 보호자가 가장 많이 놀라는 것 중 하나가 수면 시간이다. 고양이가 아픈 게 아닌가 걱정할 정도로 많이 자는데, 사실 이것이 정상이다.</p>

<h2>고양이는 왜 이렇게 많이 자는가</h2>
<p>고양이는 진화적으로 단독 사냥꾼이다. 사냥은 짧지만 폭발적인 에너지를 요구하고, 사냥 사이에 에너지를 보존하는 것이 생존 전략이다. 성묘는 하루 평균 12~16시간을 수면이나 휴식으로 보낸다. 코넬 펠라인 헬스 센터에 따르면 이는 생리적으로 완전히 정상이다.</p>

<h2>나이별 수면 시간</h2>
<ul>
  <li>새끼 고양이(0~6개월): 하루 최대 20시간 — 성장 호르몬이 수면 중 분비</li>
  <li>성묘(1~7세): 12~16시간</li>
  <li>노령묘(7세 이상): 16~20시간 — 더 많이 자는 것이 정상</li>
</ul>

<h2>고양이의 수면 사이클</h2>
<p>고양이는 사람처럼 긴 수면 주기가 아니라 여러 번의 짧은 잠(폴리파식 수면)을 반복한다. 가볍게 조는 상태(light sleep)와 깊은 REM 수면을 번갈아 가며 한 번에 15~30분씩 잔다. 자는 척하면서 귀를 세우고 주변 소리에 반응하는 것이 가벼운 조는 상태다.</p>

<h2>새벽 활동 줄이는 법 — "새벽의 암살자"</h2>
<p>고양이가 새벽 4~5시에 밥을 달라거나 뛰어다니는 것은 황혼·새벽 활동성이 높은 본능 때문이다. 이를 줄이는 방법:</p>
<ul>
  <li>자기 전에 활발한 사냥 놀이로 에너지를 충분히 소모시킨다</li>
  <li>마지막 식사를 취침 직전에 주는 "놀이→ 사냥→ 식사→ 수면" 루틴을 만든다</li>
  <li>자동 급식기를 새벽 식사 시간에 맞춰 설정한다</li>
  <li>새벽 활동에 반응해 밥을 주면 습관이 강화되므로, 일어나지 않는 것이 중요하다</li>
</ul>

<h2>언제 걱정해야 하나</h2>
<p>갑자기 수면 패턴이 크게 바뀌었다면 주목한다:</p>
<ul>
  <li>평소보다 훨씬 많이 자고 밥도 안 먹는다면 — 통증, 질환 신호</li>
  <li>평소보다 훨씬 적게 자고 불안해 보인다면 — 통증, 갑상선 문제, 인지 기능 장애</li>
</ul>
<p>고양이 환경 풍요화로 낮 활동량을 늘리면 밤 수면의 질이 높아진다. <a href="/blog/cat-environmental-enrichment">고양이 환경 풍요화 가이드</a>를 참고하자.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(74),
    authorName: "펫지기 에디터",
    sources: [
      "Cornell Feline Health Center — Cat Sleep Patterns",
      "American Association of Feline Practitioners (AAFP) — Feline Behavior Guidelines",
      "Journal of Veterinary Behavior — Polyphasic Sleep in Cats",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 106. 강아지 산책 장비 가이드 (cat5) ──
  {
    id: "blog-dog-walk-equipment-guide",
    slug: "dog-walk-equipment-guide",
    type: "blog",
    category: 5,
    title: "강아지 산책 장비 완전 가이드 — 하네스·리드줄·파우치 선택법",
    metaTitle: "강아지 산책 장비 선택 | 하네스·목줄·자동줄·파우치 비교 | 펫지기",
    metaDescription: "강아지 산책 필수 장비 선택 기준. 하네스 vs 목줄 차이, 자동줄의 단점, 배변봉투 파우치, 야간 산책 LED 용품, 견종·크기별 장비 추천.",
    body: `<p>강아지와 산책을 나갈 때 챙겨야 할 것들이 꽤 된다. 처음 준비한다면 어디서부터 시작해야 할지 막막하다. 기본 장비를 잘 골라두면 매일 산책이 훨씬 편안해진다.</p>

<h2>하네스 vs 목줄 — 무엇이 더 좋은가</h2>

<h3>목줄</h3>
<p>착용이 간편하고 부피가 적다. 단, 강아지가 당기는 경향이 있을 때 목에 압력이 가해져 기관·경추에 부담을 줄 수 있다. 소형견에서 특히 기관허탈 위험이 있다. 훈련이 잘 된 강아지나 단두종이 아닌 성견에게 적합하다.</p>

<h3>하네스</h3>
<p>체중을 가슴과 어깨에 분산시켜 목에 부담이 없다. 강아지가 당기는 경우, 소형견, 노령견, 기관 문제가 있는 강아지에게 더 안전하다. 앞 클립 하네스는 당기는 행동을 억제하는 훈련 효과도 있다.</p>

<h2>리드줄 종류</h2>

<h3>고정 길이 리드줄</h3>
<p>가장 기본적인 형태. 1.2~1.8m 길이가 일상 산책에 적합하다. 통제가 쉽고 강아지와의 거리가 일정하게 유지된다. 반사 소재나 야광 처리된 제품이 야간 안전에 유리하다.</p>

<h3>자동줄 (신축 줄)</h3>
<p>편해 보이지만 단점이 많다. 강아지가 갑자기 달려 나갈 때 통제가 어렵고, 다른 강아지·사람과의 갈등 발생 시 빠른 대응이 어렵다. 줄이 다리에 감기는 사고도 있다. 훈련 기회를 줄이는 도구로도 평가된다. 일반 산책보다 자유 공간에서의 운동 목적에 한정 사용을 권장한다.</p>

<h2>배변봉투 파우치</h2>
<p>배변봉투 홀더는 리드줄에 부착하는 형태가 가장 편하다. 분해성 봉투를 선택하면 환경 부담을 줄일 수 있다. 외출용 간이 배변봉투 홀더 1개와 여유분 봉투는 항상 챙기는 것이 예의 바른 보호자의 기본이다.</p>

<h2>날씨·계절별 추가 장비</h2>
<ul>
  <li><strong>여름</strong>: 냉각 조끼, 발바닥 보호 왁스 (뜨거운 아스팔트), 접이식 물그릇</li>
  <li><strong>겨울</strong>: 방한 외투 (소형견·단모종), 발바닥 보호 부츠 또는 왁스 (제설염)</li>
  <li><strong>야간</strong>: LED 목줄·하네스, 야광 리드줄, 반사 조끼</li>
</ul>

<h2>처음 산책 장비 세트</h2>
<p>처음 강아지를 키운다면: 하네스 1개 + 고정 리드줄 1.5m + 배변봉투 홀더 + 접이식 물그릇으로 시작하는 것이 실용적이다. 이후 강아지 성격과 산책 스타일에 맞게 추가한다. 산책 방법은 <a href="/blog/dog-walk-guide">강아지 산책 완전 가이드</a>를 참고하자.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(75),
    authorName: "펫지기 에디터",
    sources: [
      "American Kennel Club (AKC) — Dog Harness vs Collar Guide",
      "WSAVA — Preventive Healthcare Guidelines",
      "American Veterinary Medical Association (AVMA) — Pet Walking Safety",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 107. 고양이 헤어볼 예방 (cat5) ──
  {
    id: "blog-cat-grooming-hairball-prevention",
    slug: "cat-grooming-hairball-prevention",
    type: "blog",
    category: 5,
    title: "고양이 헤어볼 예방 — 털 뭉침 줄이는 일상 관리법",
    metaTitle: "고양이 헤어볼 예방법 | 빗질·헤어볼 사료·몰트 페이스트 | 펫지기",
    metaDescription: "고양이 헤어볼(털 뭉침) 원인과 예방 방법. 빗질 주기, 헤어볼 전용 사료, 몰트 페이스트 사용법, 헤어볼과 위험한 구토를 구별하는 기준.",
    body: `<p>고양이 보호자라면 한 번쯤 새벽에 "우웩" 소리를 듣고 다음날 아침 카펫에서 원통형 털 뭉치를 발견한 경험이 있을 것이다. 이것이 헤어볼이다. 어느 정도는 정상이지만, 빈도가 잦거나 토하지도 못하고 힘들어 한다면 관리가 필요하다.</p>

<h2>헤어볼이 생기는 이유</h2>
<p>고양이는 그루밍 중 혀의 가시 돌기(papillae)로 털을 삼킨다. 대부분의 털은 장을 통과해 배변으로 나오지만 일부는 위장에 쌓여 헤어볼이 된다. 장모종, 그루밍을 많이 하는 고양이에서 더 흔하다. 봄·가을 환모기에 더 자주 생긴다.</p>

<h2>빗질이 가장 효과적인 예방법</h2>
<p>고양이가 삼킬 수 있는 털을 줄이는 가장 효과적인 방법은 보호자가 빗질로 미리 제거하는 것이다. 단모종은 주 2~3회, 장모종은 매일 빗질을 권장한다. 환모기에는 빈도를 높인다. 빗질을 즐기지 않는 고양이는 짧고 긍정적인 경험을 반복하며 점차 적응시킨다.</p>

<h2>헤어볼 전용 사료</h2>
<p>헤어볼 관리 사료는 식이섬유를 높여 삼킨 털이 장을 통해 배출되도록 돕는다. 헤어볼이 잦은 고양이에게 수의사와 상의 후 고려할 수 있다. 단, 처방식이 아니라면 장기 단독 급여가 필수 영양소 불균형을 초래할 수 있으므로 주의한다.</p>

<h2>몰트 페이스트 (헤어볼 보조제)</h2>
<p>석유 기반 윤활 성분(파라핀 등)이 포함된 페이스트로, 삼킨 털이 위장에서 미끄러져 빠져나오도록 돕는다. 주 2~3회 소량을 앞발에 발라주거나 직접 핥게 한다. 과다 사용은 지용성 비타민 흡수를 방해할 수 있으므로 제품의 권장 용량을 지킨다.</p>

<h2>헤어볼 vs 위험한 구토 구별</h2>
<p>헤어볼 구토는 다음을 모두 만족하면 대체로 정상이다: 구토물에 털 뭉치 포함, 구토 후 바로 회복돼 식욕·활동성 정상, 월 1~2회 이하 빈도. 다음은 주의 신호다:</p>
<ul>
  <li>계속 구역질만 하고 아무것도 나오지 않는 경우 (장폐색 가능성)</li>
  <li>피가 섞인 구토물</li>
  <li>구토 후 무기력·식욕 소실이 지속</li>
  <li>복부 팽만</li>
</ul>
<p>고양이 구토 구별법은 <a href="/blog/cat-vomiting-when-to-vet">고양이 구토 가이드</a>를 참고하고, 털 빠짐 관리는 <a href="/blog/cat-shedding-management">고양이 털 빠짐 관리</a>에서 확인하자.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(76),
    authorName: "펫지기 에디터",
    sources: [
      "Cornell Feline Health Center — Hairballs in Cats",
      "American Association of Feline Practitioners (AAFP) — Grooming and Hairball Management",
      "WSAVA — Nutritional Assessment Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 108. 강아지 씹기 행동 가이드 (cat5) ──
  {
    id: "blog-dog-chewing-behavior-guide",
    slug: "dog-chewing-behavior-guide",
    type: "blog",
    category: 5,
    title: "강아지 씹기 행동 — 파괴적 씹기 줄이는 현실적인 방법",
    metaTitle: "강아지 씹기 행동 원인과 해결법 | 가구·신발 파괴 막기 | 펫지기",
    metaDescription: "강아지가 가구·신발·물건을 씹는 원인과 현실적인 해결법. 시기별(강아지·성견·노령견) 씹기 욕구 차이, 올바른 씹기 장난감, 파괴적 씹기 줄이는 환경 관리.",
    body: `<p>강아지의 씹기 행동은 본능이다. 문제는 무엇을 씹느냐다. 소파 다리, 신발, 리모컨이 타깃이 되면 보호자는 좌절하지만, 씹는 욕구 자체를 없애는 것은 불가능하고 바람직하지도 않다. 올바른 방향으로 유도하는 것이 해결책이다.</p>

<h2>씹기 행동의 이유</h2>
<ul>
  <li><strong>유치 교환기(3~7개월)</strong>: 잇몸 통증과 영구치 출현으로 씹는 욕구가 극도로 높아진다</li>
  <li><strong>탐색(모든 연령)</strong>: 강아지는 입으로 세상을 탐색한다</li>
  <li><strong>지루함·무기력</strong>: 충분한 운동과 정신적 자극이 없으면 씹기로 에너지를 소모한다</li>
  <li><strong>분리불안</strong>: 혼자 있을 때 파괴적 씹기가 심해진다면 분리불안이 원인일 수 있다</li>
  <li><strong>관심 끌기</strong>: 보호자 반응을 학습한 경우 — 씹으면 관심이 온다는 것을 안다</li>
</ul>

<h2>올바른 씹기 장난감 제공</h2>
<ul>
  <li><strong>고무 씹기 장난감</strong>: Kong처럼 내부에 간식을 넣을 수 있는 타입이 가장 효과적이다 — 정신적 자극도 동시에 제공</li>
  <li><strong>냉동 당근·사과</strong>: 유치 교환기 강아지에게 잇몸 통증을 줄여주는 천연 방법</li>
  <li><strong>씹기용 뼈·간식</strong>: 재질과 크기가 강아지 체중에 맞아야 한다. 지나치게 단단한 것(사슴뿔, 나일론 뼈)은 치아 손상 위험이 있다</li>
</ul>

<h2>파괴적 씹기 줄이는 환경 관리</h2>
<ul>
  <li>유혹이 되는 물건은 손이 닿지 않는 곳에 치운다 (예방이 교정보다 쉽다)</li>
  <li>케넬(이동장)에서 잘 때는 씹을 만한 것을 제거한다</li>
  <li>보호자 외출 전 충분한 운동과 놀이로 에너지를 소모시킨다</li>
  <li>씹으면 안 되는 물체에 거부반응 스프레이(쓴 맛 스프레이)를 뿌리는 것이 도움이 되는 경우가 있다</li>
</ul>

<h2>씹기를 잡힐 때 대처법</h2>
<p>강아지가 안 되는 것을 씹다가 잡혔을 때: 큰 소리나 벌을 주는 것은 효과가 없고 신뢰 관계를 손상시킨다. 대신 조용히 물건을 빼고 올바른 장난감으로 교체해 준다. 올바른 장난감을 씹으면 즉시 칭찬한다. <a href="/blog/dog-basic-training">강아지 기본 훈련 가이드</a>에서 긍정 강화 훈련법을 함께 확인하자.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(77),
    authorName: "펫지기 에디터",
    sources: [
      "American Kennel Club (AKC) — Why Does My Dog Chew Everything?",
      "American Veterinary Society of Animal Behavior (AVSAB) — Behavior Management",
      "WSAVA — Behavior and Mental Health Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 109. 고양이 영역 표시 가이드 (cat5) ──
  {
    id: "blog-cat-territory-marking-guide",
    slug: "cat-territory-marking-guide",
    type: "blog",
    category: 5,
    title: "고양이 영역 표시 — 스프레이·긁기·비비기 이해하기",
    metaTitle: "고양이 영역 표시 행동 | 스프레이·스크래칭·비비기 원인과 관리 | 펫지기",
    metaDescription: "고양이 영역 표시 행동(소변 스프레이·스크래칭·얼굴 비비기) 원인과 의미. 스프레이를 줄이는 방법, 다묘 가정 영역 갈등 관리, 중성화의 효과.",
    body: `<p>고양이는 영역 동물이다. 자신의 공간을 표시하고 유지하는 것이 생존 본능과 연결돼 있다. 고양이의 영역 표시 행동을 이해하면 스프레이나 파괴적 스크래칭으로 골치를 앓는 상황을 훨씬 효과적으로 다룰 수 있다.</p>

<h2>영역 표시의 세 가지 방법</h2>

<h3>소변 스프레이 (Urine Spraying)</h3>
<p>서서 꼬리를 세운 채로 소량의 소변을 벽이나 수직면에 분사하는 행동이다. 화장실 밖에서 평소처럼 웅크려 하는 배뇨와 다르다. 중성화하지 않은 수컷에서 가장 흔하지만 암컷, 중성화 고양이에서도 발생한다. 스트레스(새 동물, 이사, 낯선 사람), 다묘 갈등이 주요 유발 원인이다.</p>

<h3>스크래칭 (긁기)</h3>
<p>스크래처나 가구를 긁는 행동은 발톱 관리와 더불어 페로몬을 발바닥 분비샘에서 남기는 영역 표시다. 시각적 마크도 남긴다. 눈에 잘 보이는 곳, 자주 다니는 통로에 긁는 것이 특징이다 — 이곳이 영역 표시에 효과적이기 때문이다.</p>

<h3>얼굴 비비기 (Bunting)</h3>
<p>사람이나 가구에 얼굴을 비비는 것은 페로몬을 남기는 것으로 긍정적인 영역 표시다. "이것은 내 것, 안전하다"는 의미다. 보호자에게 얼굴을 비비는 것은 신뢰와 애정의 표현이기도 하다.</p>

<h2>소변 스프레이 줄이기</h2>
<ul>
  <li><strong>중성화</strong>: 중성화는 수컷의 스프레이를 약 90%, 암컷을 약 95% 감소시킨다 (Cornell Feline Health Center). 가장 효과적인 방법이다.</li>
  <li><strong>페로몬 디퓨저</strong>: 펠리웨이(Feliway) 등 합성 고양이 페로몬 제품이 스프레이를 줄이는 데 도움이 된다는 연구가 있다.</li>
  <li><strong>스트레스 원인 제거</strong>: 다묘 갈등이라면 충분한 자원(화장실·밥그릇·은신처)을 확보한다.</li>
  <li><strong>스프레이 흔적 제거</strong>: 효소 기반 탈취제로 완전히 제거해야 재발을 막는다. 일반 세제는 냄새 흔적이 남아 재스프레이를 유발한다.</li>
</ul>

<h2>긁기를 올바른 방향으로 유도하기</h2>
<p>스크래처를 없애는 것이 아니라 올바른 스크래처를 제공한다. 고양이가 주로 긁는 가구 옆에 스크래처를 두고, 선호 소재(사이잘삼, 카펫, 골판지)를 파악한다. 긁지 말아야 할 가구에는 양면테이프나 거품 보호대를 일시적으로 붙이면 효과적이다. <a href="/blog/cat-scratcher-guide">고양이 스크래처 완벽 가이드</a>에서 더 자세한 방법을 확인하자.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(78),
    authorName: "펫지기 에디터",
    sources: [
      "Cornell Feline Health Center — Urine Spraying in Cats",
      "American Association of Feline Practitioners (AAFP) — Feline Behavior Guidelines",
      "ISFM — Cat Friendly Home Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },

  // ── 110. 강아지 사회성 훈련 (cat5) ──
  {
    id: "blog-dog-social-skills-training",
    slug: "dog-social-skills-training",
    type: "blog",
    category: 5,
    title: "강아지 사회성 훈련 — 다른 개·사람·소리에 올바르게 반응하게 하는 법",
    metaTitle: "강아지 사회성 훈련 방법 | 다른 개·소리·낯선 사람 적응 | 펫지기",
    metaDescription: "강아지 사회성 훈련 핵심 원칙과 실전 방법. 생후 3~14주 결정적 시기 활용법, 다른 개와의 만남 관리, 소리·환경 둔감화, 성견 사회성 개선 팁.",
    body: `<p>사회성이 좋은 강아지는 산책도 즐겁고, 다른 사람이나 동물을 만나도 차분하다. 사회성이 부족한 강아지는 보호자도, 강아지 자신도 일상이 스트레스로 가득하다. 사회성은 만들어지는 것이며, 적절한 시기와 방법이 있다.</p>

<h2>결정적 시기 — 생후 3~14주</h2>
<p>미국수의동물행동학회(AVSAB)는 생후 3~14주를 강아지 사회화의 결정적 시기로 규정한다. 이 시기에 긍정적으로 노출된 자극(사람, 동물, 소리, 환경)은 평생의 행동 기준선이 된다. 이 시기를 놓치면 나중에 사회성을 개선하는 데 훨씬 많은 노력이 필요하다.</p>

<h2>사회성 훈련의 핵심 원칙</h2>
<ul>
  <li><strong>긍정적 연상</strong>: 새로운 것을 만날 때마다 간식·칭찬을 동반한다 — 낯선 것 = 좋은 것이라는 학습</li>
  <li><strong>강아지 페이스</strong>: 강아지가 불안해 보이면 물러나고 천천히 다시 시도한다. 억지로 밀어붙이면 역효과</li>
  <li><strong>다양하게, 일찍</strong>: 다양한 종류의 사람(어린이, 노인, 모자 쓴 사람, 제복 입은 사람), 환경(도시 소음, 아스팔트, 잔디, 계단), 동물에 노출한다</li>
</ul>

<h2>다른 개와의 만남 관리</h2>
<p>완전 접종 전 직접 접촉은 감염 위험이 있으므로, 이 시기에는 알려진 건강한 성견(이미 접종 완료)과의 만남부터 시작한다. 강아지 모임(퍼피 클래스)은 접종 일정을 확인하는 전문 프로그램을 선택한다. 처음 만남은 중립 공간에서 리드줄을 여유 있게 잡고 시작한다 — 팽팽한 리드줄은 긴장 신호를 전달한다.</p>

<h2>소리·환경 둔감화</h2>
<p>청소기, 천둥소리, 자동차 경적, 아이 소리 등에 미리 노출해 둔다. 처음에는 낮은 볼륨으로 시작해 강아지가 무시하면 볼륨을 조금씩 높인다. 소리가 날 때마다 간식이나 놀이를 연결하면 효과적이다.</p>

<h2>성견의 사회성 개선</h2>
<p>결정적 시기를 놓쳤어도 성견의 사회성 개선이 불가능한 것은 아니다. 전문 훈련사와 함께 체계적인 탈감작(desensitization)·반응 치환(counter-conditioning) 프로그램을 진행하는 것이 가장 효과적이다. 공격성이 동반된 경우 수의사에게 먼저 건강 이상(통증 등)을 배제하는 검사를 받는 것이 우선이다. <a href="/blog/dog-separation-anxiety">강아지 분리불안 가이드</a>도 함께 참고하자.</p>`,
    ymyl: false,
    status: "published",
    publishedAt: scheduleDate(79),
    authorName: "펫지기 에디터",
    sources: [
      "American Veterinary Society of Animal Behavior (AVSAB) — Puppy Socialization Position Statement",
      "American Kennel Club (AKC) — Socializing Your Puppy",
      "WSAVA — Behavior and Mental Health Guidelines",
    ],
    updatedAt: NOW,
    createdAt: NOW,
  },
];

async function seed() {
  console.log("블로그 포스트 11차 시딩 시작...");
  for (const post of BLOG_POSTS_11) {
    await db.insert(contents).values(post).onConflictDoNothing();
    console.log(`✅ ${post.slug}`);
  }
  console.log("블로그 포스트 11차 시딩 완료!");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
