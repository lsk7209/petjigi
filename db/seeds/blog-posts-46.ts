import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 46 — cat3×2 + cat6×1 + cat2×1 + cat5×1 = 5편 (IDs 351-355)
// Macros: F, E, B, A, F
// Angles: RA1, RA4, RA8, RA2, RA6

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  // ─── 351 / Cat3 / Macro-F(절차) / Lens-L1 / Hook-H1 / Outro-O2 / Angle-RA1
  {
    id: "blog-351",
    slug: "cat-dental-care-complete",
    type: "blog",
    category: 3,
    title: "고양이 치아 관리 완전 가이드 — 칫솔질부터 치과 처치까지",
    subtitle: "고양이 치주질환 통계, 칫솔질 단계별 훈련, 덴탈 간식 효과, 스케일링 마취 위험",
    metaTitle: "고양이 치아 관리 — 칫솔질·덴탈간식·스케일링 가이드 | 펫지기",
    metaDescription: "고양이 치주질환은 3살 이후 70%에서 발생합니다. 칫솔질 단계별 훈련, 덴탈 간식 효과, 스케일링 주기와 마취 주의사항을 정리했습니다.",
    body: `<p>고양이도 치주질환이 생긴다. 3살 이상 고양이의 약 70%에서 치주 문제가 관찰된다. 강아지와 달리 고양이는 구강 통증을 숨기는 경향이 강해, 발견이 더 늦어지는 경우가 많다.</p>

<h2>고양이 치주질환의 특수성</h2>
<p>고양이에서 특히 문제가 되는 것은 <strong>파상성 흡수 병소(FORL, Feline Odontoclastic Resorptive Lesion)</strong>다. 치아가 내부에서 흡수되어 통증이 심하지만 겉으로 잘 보이지 않는다. 30~50%의 성묘에서 발생하며, 발치가 유일한 치료법이다.</p>

<h2>칫솔질 단계별 훈련</h2>
<p>고양이에게 칫솔질은 강아지보다 더 천천히 접근해야 한다.</p>
<ol>
<li>치약(닭·참치 맛 반려동물용)을 손가락에 묻혀 핥게 한다</li>
<li>손가락으로 잇몸 바깥쪽을 부드럽게 마사지</li>
<li>핑거브러시로 전환 — 같은 동작 반복</li>
<li>칫솔로 전환 — 위아래가 아닌 작은 원을 그리며</li>
</ol>
<p>고양이는 강압보다 간식 보상이 효과적이다. 하루 30초만 해도 충분하다.</p>

<h2>덴탈 간식·장난감 효과</h2>
<ul>
<li>VOHC 인증 덴탈 트릿: 플라그 감소 효과 입증</li>
<li>건식 사료: 씹는 과정에서 약간의 기계적 제거 효과</li>
<li>구강청결제 (물에 첨가): 보조적 효과, 주재료 대체 불가</li>
</ul>

<h2>스케일링 주기와 마취</h2>
<p>이미 생긴 치석은 칫솔질로 제거되지 않는다. 마취 하에 진행하는 스케일링이 유일하다. 고양이는 마취 위험에 대한 걱정이 크지만, 사전 혈액검사와 모니터링이 갖춰진 병원에서는 건강한 성묘 기준 위험이 높지 않다.</p>

<div class="callout-cat">
<strong>스케일링 전 확인 사항</strong><br>
• 혈액검사·흉부 X-ray 실시<br>
• 마취 전 최소 8~12시간 금식<br>
• 마취 회복 공간 준비<br>
• 7세 이상: 심장 초음파 권장
</div>

<h2>마지막으로</h2>
<p>고양이 구강 건강 관리는 예방이 최선이다. 칫솔질이 어렵다면 VOHC 인증 덴탈 제품을 병행하고, 연 1회 구강 검진을 통해 FORL 등 숨겨진 문제를 조기에 발견하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Veterinary Oral Health Council (VOHC) — Cat Dental Products",
      "Tooth Resorption in Cats — Journal of Feline Medicine and Surgery 2022",
      "한국고양이수의사회 구강 건강 관리 임상 가이드",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-09T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 352 / Cat3 / Macro-E(비교) / Lens-L4 / Hook-H2 / Outro-O1 / Angle-RA4
  {
    id: "blog-352",
    slug: "dog-soft-tissue-injury-guide",
    type: "blog",
    category: 3,
    title: "강아지 발목 삐거나 절뚝거릴 때 — 단순 접질림부터 인대 파열까지",
    subtitle: "경증·중증 연조직 손상 구분, 집에서 할 수 있는 응급 처치, 전방십자인대(CCL) 손상 신호",
    metaTitle: "강아지 절뚝거림·발목 삠 — 경중 구분과 처치 가이드 | 펫지기",
    metaDescription: "강아지가 갑자기 절뚝거릴 때 단순 접질림인지 인대 파열인지 구분하는 방법. 집에서 할 수 있는 응급 처치와 병원 가야 할 시점을 정리했습니다.",
    body: `<p>산책 중 강아지가 갑자기 한쪽 다리를 들고 걷기 시작했다. 넘어진 것도 아닌 것 같은데 — 이런 상황에서 어떻게 해야 할지 판단하는 기준이 필요하다.</p>

<h2>원인에 따른 분류</h2>
<ul>
<li><strong>단순 접질림·타박상</strong>: 가장 흔함. 짧은 휴식으로 호전.</li>
<li><strong>인대·힘줄 손상</strong>: 중간 정도의 절름거림, 48시간 이상 지속.</li>
<li><strong>전방십자인대(CCL) 파열</strong>: 갑작스러운 체중 부하 불가능, 수술 필요한 경우 많음.</li>
<li><strong>골절</strong>: 극심한 통증, 변형.</li>
<li><strong>슬개골 탈구</strong>: 갑자기 다리를 들다가 다시 내려놓는 반복 패턴.</li>
</ul>

<h2>집에서 할 수 있는 응급 처치</h2>
<div class="callout-dog">
<strong>절뚝거림 첫날 대처</strong><br>
• 활동 제한 — 계단·달리기 금지<br>
• 아이스팩 (수건에 싸서) 10~15분 냉찜질 — 급성기 붓기 감소<br>
• 체중이 실리지 않으면 즉시 병원<br>
• 진통제를 임의로 주지 않기 — 이부프로펜·타이레놀 독성
</div>

<h2>즉시 병원이 필요한 신호</h2>
<ul>
<li>해당 다리에 체중을 전혀 싣지 못함</li>
<li>다리가 변형되거나 부어있음</li>
<li>극심한 통증 (만지면 소리 지름)</li>
<li>48시간 이상 절름거림이 지속됨</li>
<li>뼈가 피부 밖으로 보임</li>
</ul>

<h2>전방십자인대(CCL) 손상 — 주의 신호</h2>
<p>강아지에서 CCL(Cranial Cruciate Ligament) 파열은 매우 흔한 정형외과 질환이다. 특히 대형견·과체중견에서 발생률이 높다. 주요 신호:</p>
<ul>
<li>갑자기 후지 절름거림 시작</li>
<li>앉을 때 뒷다리를 옆으로 빼는 자세</li>
<li>무릎 관절 주변 부종</li>
<li>근육 위축 (시간이 지나면서)</li>
</ul>
<p>CCL 파열 확진은 X-ray 검사와 쏠림 검사(drawer sign)로 가능하다. 대형견에서는 수술(TPLO·TTA)이 권장되며, 수술 없이는 만성 관절염으로 진행된다.</p>

<h2>마지막으로</h2>
<p>경미한 절름거림도 48시간 이상 지속되면 동물병원 방문이 필요하다. 초기 처치가 빠를수록 회복이 빠르고 만성화를 예방할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Veterinary Surgery — Cranial Cruciate Ligament Rupture in Dogs",
      "WSAVA Orthopedic Guidelines",
      "대한수의외과학회 정형외과 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-10T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 353 / Cat6 / Macro-B(비교) / Lens-L6 / Hook-H8 / Outro-O4 / Angle-RA8
  {
    id: "blog-353",
    slug: "pet-funeral-options-guide",
    type: "blog",
    category: 6,
    title: "반려동물 장례 방법 — 화장·수목장·자연장 선택 기준과 비용",
    subtitle: "동물 장례업 법적 기준, 화장·자연장·수목장 차이, 비용 비교, 유골 보관 방법",
    metaTitle: "반려동물 장례 방법 비교 — 화장·자연장·수목장·비용 | 펫지기",
    metaDescription: "반려동물 장례 방법 비교. 화장, 자연장, 수목장의 차이와 비용, 동물 장례업 법적 기준, 유골 보관 방법을 정리했습니다.",
    body: `<p>반려동물을 보내고 나면 어떻게 해야 할지 모르는 경우가 많다. 사전에 알아두면 힘든 순간에 결정을 조금 더 수월하게 할 수 있다.</p>

<h2>법적 기준 — 동물 장례업</h2>
<p>동물보호법 및 관련 규정에 따라 반려동물의 사체는 생활폐기물로 처리하거나 동물 장묘업체를 이용해야 한다. 일반 쓰레기봉투에 버리는 것은 합법이지만, 대부분의 보호자는 장례 서비스를 이용한다. 등록된 동물 장묘업체는 농림축산식품부 동물보호관리시스템(APMS)에서 확인 가능하다.</p>

<h2>장례 방법 비교</h2>
<table>
<thead><tr><th>방법</th><th>특징</th><th>비용 (소형 기준)</th></tr></thead>
<tbody>
<tr><td>개별 화장</td><td>유골이 온전히 보호자에게 돌아옴</td><td>20~50만 원</td></tr>
<tr><td>합동 화장</td><td>다른 동물과 함께, 유골 미반환</td><td>5~15만 원</td></tr>
<tr><td>수목장</td><td>지정 나무 뿌리 근처 매장, 나무로 기억</td><td>20~80만 원</td></tr>
<tr><td>자연장</td><td>지정 구역 토지에 유골 매장</td><td>15~40만 원</td></tr>
<tr><td>방문 화장</td><td>차량이 방문해 현장 화장, 집에서 진행</td><td>30~70만 원</td></tr>
</tbody>
</table>
<p>※ 크기(소·중·대)에 따라 비용 차이 큼. 업체마다 다름.</p>

<h2>유골 보관 방법</h2>
<ul>
<li><strong>납골당 봉안</strong>: 장례업체 또는 전용 봉안당에 보관</li>
<li><strong>집 보관</strong>: 항아리·유골함에 담아 보관. 법적 제한 없음.</li>
<li><strong>유골 보석·유리 제작</strong>: 유골 일부로 기념품 제작. 전문 업체 서비스.</li>
<li><strong>자택 매장</strong>: 개인 주택 정원에 매장 가능. 공동주택은 불가.</li>
</ul>

<h2>장례업체 선택 시 확인할 것</h2>
<div class="callout-cat">
<strong>등록 업체 확인 포인트</strong><br>
• 농림축산식품부 등록 동물 장묘업체인지 APMS 확인<br>
• 개별 화장 시 자기 반려동물의 유골만 돌아오는지<br>
• 화장 과정 참관 가능 여부<br>
• 추가 비용(유골함·영정사진·봉안) 사전 안내 여부
</div>

<h2>마지막으로</h2>
<p>어떤 방법을 선택하든 틀리지 않았다. 보호자가 가장 의미 있다고 느끼는 방식이 가장 좋은 방식이다. 경제적 상황, 함께 기억하고 싶은 방식, 유골을 곁에 두고 싶은지 여부를 기준으로 선택하면 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "동물보호법 시행규칙 동물 장묘업 등록 기준",
      "농림축산식품부 동물보호관리시스템 장묘업 현황 2024",
      "한국반려동물장례협회 서비스 기준 안내",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-07-10T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 354 / Cat2 / Macro-A(원인분석) / Lens-L2 / Hook-H4 / Outro-O2 / Angle-RA2
  {
    id: "blog-354",
    slug: "cat-obesity-diet-management",
    type: "blog",
    category: 2,
    title: "고양이 비만 — 통통한 것이 귀엽지만 심각한 건강 문제가 된다",
    subtitle: "BCS로 비만 판단, 고양이 다이어트 특유의 위험(간지방증), 안전한 감량 방법",
    metaTitle: "고양이 비만 다이어트 — BCS 판단·간지방증 위험·안전 감량 | 펫지기",
    metaDescription: "고양이 비만은 당뇨·관절·간지방증을 유발합니다. BCS로 비만 판단, 고양이만의 다이어트 위험인 간지방증, 안전한 감량 방법을 정리했습니다.",
    body: `<p>고양이의 통통한 배는 귀엽게 느껴지지만, 과체중은 당뇨·관절 문제·간지방증 위험을 높이는 실질적인 건강 위협이다. 강아지와 달리 고양이의 다이어트는 더 신중하게 접근해야 한다.</p>

<h2>고양이 BCS(체형 점수)로 비만 판단</h2>
<div class="callout-cat">
<strong>BCS 5점 기준 (간이 체크)</strong><br>
• <strong>2~3점 (저체중)</strong>: 갈비뼈 선명히 보임, 허리 심하게 들어감<br>
• <strong>3점 (이상적)</strong>: 갈비뼈 쉽게 만져짐, 허리 들어감, 복부 약간 당겨짐<br>
• <strong>4점 (과체중)</strong>: 갈비뼈 찾기 어려움, 복부 처짐<br>
• <strong>5점 (비만)</strong>: 갈비뼈 거의 안 만져짐, 배가 바닥에 닿을 듯
</div>

<h2>고양이 다이어트의 특수 위험 — 간지방증</h2>
<p>고양이에서 가장 중요한 다이어트 주의사항이다. 급격히 칼로리를 줄이거나 밥을 굶기면, 고양이는 에너지원으로 지방을 간으로 이동시킨다. 이 과정에서 <strong>지방간(간지방증)</strong>이 발생한다. 며칠만 굶어도 생명을 위협하는 수준이 될 수 있다.</p>

<p>강아지처럼 하루 이틀 금식을 시켜서는 안 되는 이유가 이것이다.</p>

<h2>안전한 감량 방법</h2>
<ul>
<li><strong>월 1~2% 감량 목표</strong>: 4kg 고양이라면 월 40~80g. 더 빠르면 위험.</li>
<li><strong>현재 급여량 10~20% 감량</strong>: 급격하게 줄이지 않음</li>
<li><strong>고단백·저탄수화물 처방 다이어트 사료</strong>: 수의사 권장</li>
<li><strong>습식 비중 높이기</strong>: 포만감 증가, 수분 보충</li>
<li><strong>여러 번 소량 급여</strong>: 자동 급식기로 하루 4~6회</li>
</ul>

<h2>중성화와 비만의 관계</h2>
<p>중성화 수술 후 기초대사량이 낮아지고 식욕은 늘어나는 경향이 있다. 중성화 후 같은 양을 먹여도 살이 찌기 쉽다. 중성화 후 즉시 급여량을 10~20% 줄이는 것이 권장된다.</p>

<h2>마지막으로</h2>
<p>고양이 다이어트는 서두르면 위험하다. 수의사와 목표 체중과 감량 계획을 세우고, 월 단위로 체중을 측정하며 진행하는 것이 가장 안전하다. 식욕이 갑자기 줄거나 구토가 생기면 즉시 병원을 찾아야 한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Zoran, D.L. — Obesity in Cats. Vet Clin North Am Small Anim Pract 2009",
      "WSAVA Nutritional Assessment Guidelines",
      "한국고양이수의사회 비만 관리 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-07-11T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ─── 355 / Cat5 / Macro-F(절차) / Lens-L6 / Hook-H3 / Outro-O3 / Angle-RA6
  {
    id: "blog-355",
    slug: "dog-summer-heat-care-guide",
    type: "blog",
    category: 5,
    title: "여름 강아지 더위 관리 — 열사병 예방부터 산책 시간 조정까지",
    subtitle: "열사병 단계별 증상, 안전한 산책 시간대, 냉각 방법 5가지, 단두종 특별 주의사항",
    metaTitle: "강아지 여름 더위 관리 — 열사병 예방·산책 시간 가이드 | 펫지기",
    metaDescription: "여름 강아지 더위 관리 방법. 열사병 단계별 증상, 안전한 산책 시간대, 냉각 방법 5가지, 단두종(불독·퍼그) 특별 주의사항을 정리했습니다.",
    body: `<p>개는 사람처럼 전신으로 땀을 흘리지 못한다. 주로 발바닥과 헐떡임으로 체온을 조절하며, 이것이 한계에 달하면 열사병으로 이어진다. 여름 관리는 선택이 아니라 생명과 직결된다.</p>

<h2>열사병 단계별 증상</h2>
<table>
<thead><tr><th>단계</th><th>증상</th><th>대처</th></tr></thead>
<tbody>
<tr><td>경증 (체온 39.5~41°C)</td><td>과도한 헐떡임, 침 흘림, 불안</td><td>시원한 곳 이동, 수분 공급</td></tr>
<tr><td>중등도 (41~42°C)</td><td>구토, 무기력, 잇몸 빨개짐</td><td>즉시 냉각 + 병원</td></tr>
<tr><td>중증 (42°C 이상)</td><td>의식 저하, 경련, 적자색 잇몸</td><td>즉시 병원 (생명 위협)</td></tr>
</tbody>
</table>

<h2>안전한 산책 시간대</h2>
<p>기온이 25°C 이상이 되면 주의가 필요하다. 아스팔트 표면 온도를 고려하면 더 일찍부터 위험하다.</p>
<ul>
<li><strong>권장 시간</strong>: 오전 7시 이전, 오후 7시 이후 (그림자가 충분히 생긴 후)</li>
<li><strong>단두종·노령견·비만견</strong>: 오전 6시 이전, 오후 8시 이후로 더 엄격하게</li>
<li><strong>아스팔트 체크</strong>: 손등을 7초 — 뜨거우면 발바닥도 뜨겁다</li>
</ul>

<h2>냉각 방법 5가지</h2>
<ol>
<li><strong>신선한 물 상시 제공</strong>: 외출 시 항상 물통 지참</li>
<li><strong>냉각 매트</strong>: 젤 타입 또는 물 순환 타입</li>
<li><strong>발바닥 적시기</strong>: 발바닥을 시원한 물에 담그거나 적심 — 체온 하강 효과</li>
<li><strong>실내 에어컨 유지</strong>: 25°C 이하 권장. 장시간 외출 시 켜두기</li>
<li><strong>냉동 트릿</strong>: 얼린 닭육수·과일 — 내부 체온 낮추고 수분 보충</li>
</ol>

<h2>단두종 특별 주의</h2>
<div class="callout-dog">
<strong>단두종 (불독·퍼그·페키니즈·시츄)</strong><br>
• 기도가 좁아 헐떡임 효율이 낮음 — 체온 조절 능력 부족<br>
• 기온 22°C에서도 과열 가능<br>
• 여름 낮 시간대 야외 활동 금지<br>
• 실내에서도 에어컨 필수<br>
• 수술로 기도를 넓히는 것이 근본 해결 — 수의사 상담
</div>

<h2>마지막으로</h2>
<p>여름은 강아지 열사병 발생이 가장 많은 계절이다. 잠깐 차에 두는 것, 낮 시간대 장시간 산책 — 이 두 가지만 피해도 대부분의 위험을 예방할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Bruchim, Y. et al. — Heat stroke in dogs. Journal of Veterinary Internal Medicine 2006",
      "BSAVA — Brachycephalic Obstructive Airway Syndrome",
      "대한수의사회 반려동물 여름철 열사병 예방 가이드",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 열사병 의심 시 즉시 동물병원에 연락하세요.",
    status: "published",
    publishedAt: "2026-07-11T11:00:00.000Z",
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
  console.log("블로그 포스트 46차 시딩 완료! (blog-351 ~ blog-355)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
