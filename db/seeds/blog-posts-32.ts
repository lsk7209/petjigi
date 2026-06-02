import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 32 — cat2×3 + cat6×2 = 5편 (IDs 281-285)
// Macros: C, A, D, G, B
// Angles: RA1, RA5, RA2, RA8, RA6

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 281 / Cat2 / Macro-C(통계) / Lens-L1(역사) / Hook-H2(stat) / Outro-O4 / Angle-RA1
  {
    id: "blog-281",
    slug: "dog-senior-food-transition-guide",
    type: "blog",
    category: 2,
    title: "노령견 사료 전환 시기와 방법 — 7세부터 달라지는 영양 요구",
    subtitle: "시니어 사료 전환 기준, 단백질·칼로리·관절 영양소 변화, 노견 거식증 대처법",
    metaTitle: "노령견 시니어 사료 전환 시기와 방법 완전 가이드 | 펫지기",
    metaDescription: "강아지 7세부터 필요한 시니어 사료 전환 시기, 단백질과 칼로리 기준 변화, 관절 건강을 위한 영양소, 식욕 저하 대처법을 정리했습니다.",
    body: `<p>2023년 농림축산식품부 실태조사에 따르면 국내 반려견의 평균 연령이 지속적으로 높아지고 있으며, 7세 이상 노령견 비율이 약 30%에 달한다. 노령견은 대사율이 낮아지고 근육량이 감소하며 관절 부담이 커진다. 이 시기에 맞는 영양 전환은 건강 수명 연장에 직접적인 영향을 준다.</p>

<div class="callout-cat">
<strong>시니어 사료 전환의 기준</strong><br>
나이보다 체중과 건강 상태가 중요하다. 소형견은 8~10세, 대형견은 5~7세를 기준으로 하되, 정기 혈액 검사에서 신장·간 수치 이상이 나오면 즉시 전환을 검토한다.
</div>

<h2>노령기에 달라지는 영양 요구</h2>
<ul>
<li><strong>칼로리</strong>: 활동량 감소로 20~30% 줄어야 한다. 기존 사료를 그대로 주면 비만 위험</li>
<li><strong>단백질</strong>: 줄이면 안 된다 — 오히려 근육 유지를 위해 고품질 단백질이 필요. WSAVA는 근감소증 예방을 위해 단백질 감소를 반대</li>
<li><strong>인(Phosphorus)</strong>: 신장 기능이 떨어지면 제한 필요. 신장 검사가 정상이면 일반 사료 가능</li>
<li><strong>오메가-3</strong>: 관절 염증 완화. EPA·DHA 함량이 높은 사료 선택</li>
<li><strong>항산화 성분</strong>: 비타민 E·C, 셀레늄 — 세포 노화 지연</li>
</ul>

<div class="key-summary">
<strong>📊 성견 vs 노령견 영양 기준 비교</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-2-soft,#f6e6cd);">
<th style="padding:8px;border:1px solid var(--brand-border);">항목</th>
<th style="padding:8px;border:1px solid var(--brand-border);">성견 기준</th>
<th style="padding:8px;border:1px solid var(--brand-border);">노령견 권장</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">칼로리</td><td style="padding:8px;border:1px solid var(--brand-border);">기준</td><td style="padding:8px;border:1px solid var(--brand-border);">20~30% 감소</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">단백질 (DM)</td><td style="padding:8px;border:1px solid var(--brand-border);">18~25%</td><td style="padding:8px;border:1px solid var(--brand-border);">25~28% (신장 이상 없을 때)</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">지방</td><td style="padding:8px;border:1px solid var(--brand-border);">10~15%</td><td style="padding:8px;border:1px solid var(--brand-border);">8~12% (체중 관리)</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">오메가-3 (EPA+DHA)</td><td style="padding:8px;border:1px solid var(--brand-border);">낮음</td><td style="padding:8px;border:1px solid var(--brand-border);">높음 (관절·인지 기능)</td></tr>
</tbody></table>
<p style="font-size:0.85rem;color:var(--brand-text-secondary);margin-top:0.5rem;">출처: WSAVA 영양 가이드라인</p>
</div>

<h2>시니어 사료 선택 체크리스트</h2>
<ul>
<li>첫 번째 성분이 동물성 단백질원인가?</li>
<li>"시니어" 라벨이 있어도 AAFCO 영양 기준을 충족하는가? (라벨 확인)</li>
<li>글루코사민·콘드로이틴 포함 여부 (관절 지원)</li>
<li>칼로리 밀도 확인 (고칼로리면 급여량 줄여야)</li>
</ul>

<h2>노령견 거식증 대처</h2>
<p>노령견은 후각이 약해져 사료를 거부하는 경우가 많다. 치킨 육수를 소량 가열해 향을 높이거나, 습식 사료를 소량 토핑하면 식욕이 돌아오는 경우가 많다. 3일 이상 거의 먹지 않으면 수의사 상담이 필요하다.</p>

<h2>자주 묻는 질문</h2>
<h3>관절 영양제를 따로 줘야 하나요?</h3>
<p>시니어 사료에 글루코사민·콘드로이틴이 포함됐다면 추가 영양제는 불필요할 수 있다. 단, 이미 관절 질환이 있다면 수의사 처방 하에 별도 보충이 효과적이다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-joint-health-diet">강아지 관절 건강 식이 가이드 — 음식·영양제 선택법</a><br>
<a href="/blog/senior-dog-health-management">노령견 건강 관리 — 7세부터 달라지는 돌봄의 기준</a><br>
<a href="/blog/dog-food-transition-method">강아지 사료 교체 방법 — 소화 문제 없이 새 사료로 바꾸는 7~10일 가이드</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "WSAVA(세계소동물수의사협회) 노령 반려동물 영양 가이드라인",
      "농림축산식품부 동물보호 실태조사 2023 — 노령견 비율",
      "대한수의사회 시니어 반려동물 영양 자료",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-06T14:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 282 / Cat2 / Macro-A / Lens-L4 / Hook-H1 / Outro-O2 / Angle-RA5
  {
    id: "blog-282",
    slug: "cat-water-intake-tips-dehydration",
    type: "blog",
    category: 2,
    title: "고양이 음수량 늘리는 법과 탈수 예방 — 하루 필요량 계산부터 실전 팁까지",
    subtitle: "고양이 일일 권장 음수량 계산식, 물 마시게 하는 10가지 방법, 탈수 신호 체크",
    metaTitle: "고양이 음수량 늘리는 방법과 탈수 예방 완전 가이드 | 펫지기",
    metaDescription: "고양이 하루 권장 음수량 계산법, 물을 안 마시는 고양이를 위한 실전 방법 10가지, 탈수 신호 확인법을 정리했습니다.",
    body: `<p>고양이가 물을 잘 마시지 않는 것은 정상 범위일 수 있지만, 신장·방광 질환의 위험을 높인다. 고양이는 사막 기원 동물이라 음수 욕구가 낮고, 건식 사료만 먹는 경우 수분 섭취가 부족하기 쉽다. ISFM(국제고양이의학협회)에 따르면 신장 질환은 고양이 사망 원인 1~2위를 차지한다.</p>

<div class="callout-cat">
<strong>탈수 신호 — 집에서 확인하는 방법</strong><br>
<strong>피부 탄성 검사</strong>: 목 뒤 피부를 살짝 집었다 놓는다. 1~2초 내에 돌아오면 정상. 3초 이상이면 탈수 가능성.<br>
<strong>잇몸 촉촉함</strong>: 잇몸이 건조하거나 끈적이면 탈수 신호.
</div>

<h2>하루 권장 음수량 계산</h2>
<p>고양이 하루 권장 음수량: <strong>체중(kg) × 50~60ml</strong></p>
<ul>
<li>4kg 고양이 → 200~240ml</li>
<li>5kg 고양이 → 250~300ml</li>
</ul>
<p>단, 이 수치는 건식 사료 기준이다. 습식 사료는 수분 함량이 70~80%이므로 섭취 사료에서 상당량을 보충할 수 있다. 습식 100g = 물 70~80ml와 같다.</p>

<h2>물을 잘 마시게 하는 10가지 방법</h2>
<ol style="padding-left:1.2rem;">
<li><strong>급수기 위치 분산</strong>: 집 여러 곳에 물그릇 놓기 — 화장실과 밥그릇에서 멀리</li>
<li><strong>유수형 급수기</strong>: 흐르는 물을 선호하는 고양이가 많음. 자동 급수기 사용 효과적</li>
<li><strong>그릇 재질 바꾸기</strong>: 플라스틱은 냄새가 밸 수 있음. 스테인리스·세라믹 권장</li>
<li><strong>물그릇 크기</strong>: 수염이 닿지 않는 넓은 그릇 — 수염 감각 자극 스트레스 줄임</li>
<li><strong>신선한 물 교체</strong>: 하루 1~2회 새 물로 교체</li>
<li><strong>습식 사료 병행</strong>: 건식 50% + 습식 50% 혼합 급여</li>
<li><strong>치킨 육수 소량 추가</strong>: 무염·무파·무양파 육수를 물에 소량</li>
<li><strong>음수량 추적</strong>: 매일 같은 시간 물그릇 양을 측정해 기록</li>
<li><strong>얼음 조각</strong>: 여름철 얼음을 물에 띄워주면 관심 유도</li>
<li><strong>물그릇 청결</strong>: 매일 세척 — 점액질·세균 제거</li>
</ol>

<h2>자주 묻는 질문</h2>
<h3>정수기 물이 수돗물보다 고양이에게 좋은가요?</h3>
<p>일반적으로 큰 차이는 없다. 고양이가 수돗물의 염소 냄새를 거부한다면 정수기 물이나 하루 정도 실온에 둔 수돗물을 사용해볼 수 있다. 미네랄 워터는 일부 성분이 비뇨기에 부담을 줄 수 있으므로 권장하지 않는다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/cat-hydration-tips">고양이 수분 섭취 늘리는 법 — 물 안 마시는 고양이 완전 해결책</a><br>
<a href="/blog/cat-flutd-guide">고양이 하부요로계 질환(FLUTD) — 원인·증상·예방 완전 정리</a><br>
<a href="/blog/cat-obesity-diet-management-guide">고양이 비만 관리 가이드 — 체중 측정부터 다이어트 사료 전환까지</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "ISFM(국제고양이의학협회) 고양이 신장 질환 및 수분 섭취 가이드",
      "WSAVA 영양 가이드라인 — 고양이 수분 요구량",
      "대한수의사회 반려동물 비뇨기 건강 자료",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-06T15:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 283 / Cat2 / Macro-D(일화→일반화) / Lens-L5 / Hook-H3 / Outro-O3 / Angle-RA2
  {
    id: "blog-283",
    slug: "dog-summer-cooling-diet-tips",
    type: "blog",
    category: 2,
    title: "여름 강아지 식욕 저하 — 원인과 더위 속 영양 관리 방법",
    subtitle: "여름철 식욕 감소 원인, 시원한 급여 방법, 탈수 예방 음식, 먹이면 안 되는 여름 식품",
    metaTitle: "여름 강아지 식욕 저하 원인과 영양 관리 방법 | 펫지기",
    metaDescription: "여름철 강아지 식욕이 떨어지는 원인, 더위 속 영양 공급 방법, 수분 보충 음식, 여름에 주면 안 되는 식품을 정리했습니다.",
    body: `<p>7월 중순, 밥그릇 앞에 앉았다가 한두 입만 먹고 자리를 뜨는 강아지를 보는 보호자가 많다. 여름철 식욕 감소는 체온 조절 메커니즘의 일부다. 음식 소화 과정에서 체열이 발생하기 때문에 더운 날엔 의도적으로 식욕이 줄어드는 것이다. 그러나 탈수와 영양 부족은 방치할 수 없다.</p>

<div class="callout-cat">
<strong>식욕 저하와 질병 구별 포인트</strong><br>
<strong>여름 더위 탓</strong>: 더위가 꺾인 저녁·새벽에는 먹음, 기력은 있음<br>
<strong>병원 가야 하는 경우</strong>: 온도와 무관하게 3일 이상 거의 안 먹음, 구토·설사·무기력 동반
</div>

<h2>여름철 강아지 식사 관리 5가지</h2>
<ol style="padding-left:1.2rem;">
<li><strong>식사 시간 조정</strong>: 한낮을 피해 이른 아침·저녁에 급여. 온도가 낮을 때 식욕이 돌아옴</li>
<li><strong>사료 소분 급여</strong>: 하루 2회를 3~4회로 나눠 소량씩. 소화 부담 줄이기</li>
<li><strong>차갑게 제공</strong>: 냉장 보관 습식 사료, 냉동 간식(닭가슴살 큐브 등) — 시원한 온도가 식욕 자극</li>
<li><strong>물 첨가</strong>: 건식 사료에 상온~시원한 물을 소량 섞으면 수분 보충 + 식욕 유도</li>
<li><strong>그늘에서 급여</strong>: 직사광선·뜨거운 공기 피해 시원한 장소에서</li>
</ol>

<h2>여름에 주면 좋은 수분 보충 식품</h2>
<ul>
<li><strong>오이</strong>: 96% 수분, 저칼로리. 씨 제거 후 소량</li>
<li><strong>수박(씨·껍질 제거)</strong>: 수분 92%, 여름 간식으로 적합</li>
<li><strong>무염 치킨 육수</strong>: 얼음으로 얼려 핥게 하거나 물에 소량 첨가</li>
</ul>

<div class="callout-cat">
<strong>⚠️ 여름에 주면 안 되는 것</strong><br>
• 아이스크림·팥빙수: 설탕·자일리톨 함유<br>
• 탄산음료: 이산화탄소+설탕 위험<br>
• 냉동 포도·건포도: 신부전 유발<br>
• 인스턴트 육수: 나트륨 과다
</div>

<h2>자주 묻는 질문</h2>
<h3>여름에 사료를 더 줘야 하나요, 덜 줘야 하나요?</h3>
<p>식욕이 줄었다고 억지로 더 주지 않는다. 더위로 활동량이 줄었다면 칼로리 필요량도 줄어든다. 단, 급격한 체중 감소(2주에 10% 이상)는 병원 방문이 필요하다. 수분 공급은 오히려 늘려야 한다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/dog-toxic-foods">강아지에게 줘도 되는 채소·과일 vs 위험한 것</a><br>
<a href="/blog/dog-water-intake-guide">강아지 물 얼마나 마셔야 할까 — 탈수 신호와 수분 관리</a><br>
<a href="/blog/dog-daily-calorie-guide">강아지 하루 칼로리 계산법 — 비만 예방의 첫걸음</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "AVMA 반려동물 여름 건강 관리 가이드",
      "대한수의사회 반려동물 하절기 케어 자료",
      "농림축산검역본부 반려동물 건강관리 정보 qia.go.kr",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-06-06T16:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 284 / Cat6 / Macro-G(큐레이션) / Lens-L5 / Hook-H3 / Outro-O2 / Angle-RA8
  {
    id: "blog-284",
    slug: "pet-funeral-self-preparation-guide",
    type: "blog",
    category: 6,
    title: "반려동물 장례식 직접 준비하기 — 가정 장례의 의미와 절차",
    subtitle: "화장 전·후 가정에서 할 수 있는 것, 추모 의례 만드는 방법, 법적 주의사항",
    metaTitle: "반려동물 가정 장례 직접 준비하는 방법 | 펫지기",
    metaDescription: "반려동물 화장 전·후 가정에서 직접 할 수 있는 장례 의례 방법, 추모 순서, 법적 주의사항을 정리했습니다.",
    body: `<p>많은 보호자가 아이가 떠난 뒤 "더 의미 있게 보내드리고 싶었는데"라는 마음을 가진다. 전문 장례 업체를 이용하더라도, 그 전후로 가정에서 직접 추모 의례를 만드는 것이 가능하다. 이 글은 법적 기준 안에서 보호자가 직접 할 수 있는 것들을 정리한다.</p>

<div class="callout-cat">
<strong>법적 기준 먼저 확인 (동물보호법)</strong><br>
반려동물 사체는 <strong>생활폐기물</strong>로 처리하거나 <strong>허가된 동물 장묘 업체</strong>를 이용해야 한다. 집 마당·공원·산·하천에 매장하면 폐기물관리법 위반이 될 수 있다. 가정 내 화분 매장은 법적 회색지대이나 권장하지 않는다.
</div>

<h2>화장 전 — 가정에서 하는 것</h2>
<ul>
<li><strong>임시 안치</strong>: 화장 예약까지 최대 24~48시간. 아이를 좋아하던 담요에 눕히고 시원하고 그늘진 곳(냉장고 하단 또는 서늘한 방)에 안치</li>
<li><strong>함께 있는 시간</strong>: 마지막을 함께한 가족들이 모여 이야기하거나 편지를 쓰는 시간</li>
<li><strong>좋아하던 것 함께 두기</strong>: 좋아하던 장난감, 간식, 꽃 — 화장 업체에 따라 함께 화장 가능 여부 확인 필요</li>
<li><strong>사진 촬영</strong>: 마지막 사진. 나중에 감사하게 되는 경우가 많다</li>
</ul>

<h2>화장 후 — 유골과 함께하는 방법들</h2>
<ul>
<li><strong>유골함 안치</strong>: 집 안 조용한 공간에 두기. 일부 보호자는 침실에, 일부는 거실 한켠에</li>
<li><strong>메모리얼 주얼리</strong>: 유골 일부를 담은 펜던트나 유리 오브젝트 제작 (국내 공방 여럿)</li>
<li><strong>추모 나무</strong>: 유골 일부를 화분에 넣고 식물을 심는 방식. 나무가 자라는 것이 아이의 기억과 연결됨</li>
<li><strong>바다·강 산골(散骨)</strong>: 일부 지역에서는 허용되나 지자체별 규정 확인 필요</li>
</ul>

<h2>가정 추모 의례 만드는 방법</h2>
<ol style="padding-left:1.2rem;">
<li>아이가 좋아하던 음악을 틀거나 평소 즐겨 앉던 장소에 꽃을 놓는다</li>
<li>각 가족이 아이에 대한 기억 하나씩을 이야기한다</li>
<li>짧은 편지나 카드를 쓴다 — 읽어도 좋고 소중히 보관해도 좋다</li>
<li>아이가 좋아하던 간식을 함께 먹는 시간을 갖는다</li>
<li>사진 앨범 또는 디지털 추모 공간 만들기</li>
</ol>

<h2>자주 묻는 질문</h2>
<h3>집 앞 마당에 매장할 수 없나요?</h3>
<p>현행 폐기물관리법상 동물 사체는 생활폐기물 또는 허가된 장묘 업체를 통해 처리해야 한다. 자가 소유 마당이라도 매장은 법적으로 권고되지 않는다. 화분에 소량 유골과 함께 식물을 심는 방식은 법적 회색지대이며 지자체 정책에 따라 다를 수 있다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-cremation-burial-compare">반려동물 화장 vs 장묘 — 비용·절차·선택 기준 완전 비교</a><br>
<a href="/blog/pet-memorial-park-guide">반려동물 추모공원 이용 가이드</a><br>
<a href="/blog/pet-anniversary-memorial-ideas">반려동물 기일 추모 방법 — 1주기를 의미 있게 보내는 방식들</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "폐기물관리법 — 동물 사체 처리 기준",
      "농림축산식품부 동물보호관리시스템 — 동물 장묘 업체 등록 기준",
      "한국애도상담학회 반려동물 장례 관련 자료",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 법적 절차는 지자체 규정을 반드시 확인하세요.",
    status: "published",
    publishedAt: "2026-06-06T17:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 285 / Cat6 / Macro-B(즉답) / Lens-L3 / Hook-H1 / Outro-O3 / Angle-RA6
  {
    id: "blog-285",
    slug: "pet-memorial-garden-making-guide",
    type: "blog",
    category: 6,
    title: "반려동물 추모 정원 만들기 — 식물로 기억을 남기는 방법",
    subtitle: "화분·야외 정원 추모 아이디어, 유골 활용 방법, 추모 표지석과 식물 선택",
    metaTitle: "반려동물 추모 정원 만들기 — 식물로 기억하는 방법 | 펫지기",
    metaDescription: "반려동물을 식물로 기억하는 추모 정원 아이디어 — 화분·야외 정원, 유골 활용 방법, 추모 표지석, 적합한 식물 종류를 정리했습니다.",
    body: `<p class="aeo-answer" style="border-left:3px solid var(--cat-6,#b89968);padding-left:0.75rem;margin-bottom:1rem;">반려동물을 식물로 기억하는 추모 정원은 '살아있는 추모'의 방식이다. 아이가 좋아하던 공간에 작은 화분을 두거나, 마당에 나무 한 그루를 심는 것으로 시작할 수 있다. 식물이 자라는 것이 기억을 이어가는 방식이 된다.</p>

<div class="callout-cat">
<strong>유골 사용 시 법적 주의사항</strong><br>
화장 유골을 화분이나 야외 정원에 소량 섞는 것은 법적 회색지대다. 퇴비화·자연장(自然葬) 방식은 지자체 허가가 필요할 수 있다. 허가된 동물 자연장지를 이용하는 것이 가장 안전하다.
</div>

<h2>화분 추모 정원 — 실내에서 시작하기</h2>
<ul>
<li><strong>의미 있는 화분 고르기</strong>: 아이 이름을 새긴 화분이나, 아이가 좋아하던 색상의 화분</li>
<li><strong>추모 표지석</strong>: 작은 돌에 이름·날짜를 새긴 표지석을 화분 옆에 둔다. 국내 온라인에서 커스텀 제작 가능</li>
<li><strong>식물 선택</strong>: 아이의 성격이나 좋아하던 색에서 영감을 얻어 선택. 초보자는 유지가 쉬운 다육식물, 로즈마리, 라벤더 추천</li>
</ul>

<div class="key-summary">
<strong>📋 추모 정원 식물 추천</strong>
<table style="width:100%;border-collapse:collapse;margin-top:0.75rem;font-size:0.9rem;">
<thead><tr style="background:var(--cat-6-soft,#ece1cc);">
<th style="padding:8px;border:1px solid var(--brand-border);">식물</th>
<th style="padding:8px;border:1px solid var(--brand-border);">의미·특징</th>
<th style="padding:8px;border:1px solid var(--brand-border);">관리 난이도</th>
</tr></thead>
<tbody>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">라벤더</td><td style="padding:8px;border:1px solid var(--brand-border);">평화, 안식 — 향기가 남음</td><td style="padding:8px;border:1px solid var(--brand-border);">쉬움</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">로즈마리</td><td style="padding:8px;border:1px solid var(--brand-border);">기억 — 고대부터 추모에 사용</td><td style="padding:8px;border:1px solid var(--brand-border);">쉬움</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">벚나무 (미니)</td><td style="padding:8px;border:1px solid var(--brand-border);">봄마다 꽃 피움, 생명의 순환</td><td style="padding:8px;border:1px solid var(--brand-border);">중간</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">다육식물</td><td style="padding:8px;border:1px solid var(--brand-border);">강인함, 물 없이도 오래 삶</td><td style="padding:8px;border:1px solid var(--brand-border);">매우 쉬움</td></tr>
<tr><td style="padding:8px;border:1px solid var(--brand-border);">해바라기</td><td style="padding:8px;border:1px solid var(--brand-border);">밝음과 충성, 여름에 피어남</td><td style="padding:8px;border:1px solid var(--brand-border);">쉬움</td></tr>
</tbody></table>
</div>

<h2>야외 추모 정원 아이디어</h2>
<ul>
<li><strong>마당 한 켠에 돌 표지석</strong>: 이름·생년월일·사망일을 새긴 작은 표지석 설치</li>
<li><strong>아이가 좋아하던 장소에 나무 심기</strong>: 자주 산책하던 공원은 허가가 필요하지만, 사유지 마당에 나무를 심는 것은 자유</li>
<li><strong>사진 야외 액자</strong>: 방수 코팅 사진을 야외용 액자에 넣어 정원에 설치</li>
</ul>

<h2>자주 묻는 질문</h2>
<h3>아파트 베란다에 추모 정원을 만들 수 있나요?</h3>
<p>충분히 가능하다. 소형 화분 몇 개와 표지석, 아이 사진 액자로 의미 있는 공간을 만들 수 있다. 키우기 쉬운 라벤더나 다육식물이 베란다 추모 정원의 시작으로 적합하다.</p>

<div style="margin:2rem 0;padding:1rem 1.25rem;background:var(--brand-accent-soft,#e6ecd9);border-radius:12px;">
<strong>📚 관련 글</strong><br>
<a href="/blog/pet-memorial-photo-video-album">반려동물 추모 사진·영상 앨범 만들기</a><br>
<a href="/blog/pet-anniversary-memorial-ideas">반려동물 기일 추모 방법 — 1주기를 의미 있게 보내는 방식들</a><br>
<a href="/blog/pet-funeral-self-preparation-guide">반려동물 장례식 직접 준비하기</a>
</div>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "폐기물관리법 — 동물 사체 처리 관련 조항",
      "한국애도상담학회 추모 의례 자료",
    ]),
    disclaimer: "본 콘텐츠는 정보 제공 목적이며 법적 절차는 지자체 규정을 반드시 확인하세요.",
    status: "published",
    publishedAt: "2026-06-06T18:00:00.000Z",
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
  console.log("블로그 포스트 32차 시딩 완료! (blog-281 ~ blog-285)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
