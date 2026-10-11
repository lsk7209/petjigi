import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 101 — cat3×2 + cat4×1 + cat2×1 + cat1×1 = 5편 (IDs 626-630)
// Macros: A, D, F, B, G
// Angles: RA1, RA2, RA1, RA3, RA5

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-626",
    slug: "dog-grass-seed-foxtail-danger",
    type: "blog",
    category: 3,
    title: "산책 중 풀 씨앗 위험 — 강아지 귀·발에 박히는 여우꼬리풀",
    subtitle: "풀 씨앗(foxtail) 종류, 침투 경로, 증상, 산책 후 확인 방법",
    metaTitle: "강아지 풀 씨앗(여우꼬리) 위험 — 침투·증상·예방 가이드 | 펫지기",
    metaDescription: "강아지 산책 중 풀 씨앗이 귀·발에 박히는 위험. 여우꼬리풀 씨앗의 특성, 침투 경로, 내부 이동 증상, 산책 후 확인 방법을 정리했습니다.",
    body: `<p>봄부터 가을까지 풀밭 산책을 다녀온 뒤 강아지가 갑자기 귀를 긁고 머리를 흔들거나, 한쪽 발을 계속 핥거나, 재채기를 반복한다면 풀 씨앗(까락)이 박혔을 수 있다. 몸속으로 파고드는 구조여서 스스로 빠지지 않고 감염을 일으킬 수 있다.</p>

<h2>왜 위험한가</h2>
<p>강아지풀·야생 보리 같은 일부 풀의 씨앗에는 한쪽 방향으로만 가시가 나 있어서, 털과 피부 사이로 들어가면 뒤로 빠지지 않고 점점 깊이 파고드는 경향이 있다. 몸 안으로 들어가면 염증과 농양을 만들 수 있고, 드물게 폐까지 이동하는 경우도 보고된다.</p>

<h2>침투 부위와 증상</h2>
<table>
<thead><tr><th>부위</th><th>증상</th></tr></thead>
<tbody>
<tr><td>귀</td><td>갑자기 머리를 흔들고 귀를 긁음, 머리 기울임, 통증</td></tr>
<tr><td>발 (발가락 사이)</td><td>한쪽 발을 계속 핥음, 절뚝임, 부어오름, 농양 형성</td></tr>
<tr><td>코</td><td>갑작스러운 격렬한 재채기, 코를 문지름, 코피</td></tr>
<tr><td>눈</td><td>눈을 뜨지 못함, 눈물, 눈곱, 충혈</td></tr>
<tr><td>피부 (어디든)</td><td>작은 구멍에서 진물이 나오는 농양</td></tr>
</tbody>
</table>

<div class="callout-dog">
<strong>집에서 하면 안 되는 것</strong><br>
• 귀에 액체(세정제, 소독약)를 넣기 — 까락이 더 깊이 들어갈 수 있다<br>
• 코나 눈에 박힌 것을 억지로 빼기<br>
• 깊이 박힌 것을 핀셋으로 무리하게 빼려다 부러뜨리기<br>
→ 귀·코·눈은 동물병원에서 제거한다. 눈에 박혔다면 응급이다
</div>

<h2>산책 후 확인 루틴</h2>
<ul>
<li>귀 안쪽과 귀 주변 털을 확인한다.</li>
<li>발가락 사이와 발바닥, 털이 긴 부위를 손으로 훑어 확인한다.</li>
<li>코, 눈 주변, 겨드랑이, 사타구니도 살핀다.</li>
<li>털이 긴 개는 발가락 사이와 귀 안쪽 털을 짧게 정리해 두면 예방에 도움이 된다.</li>
<li>빗질로 털에 붙은 씨앗을 제거한다.</li>
</ul>

<h2>예방</h2>
<ul>
<li>씨앗이 맺히는 시기에는 키 큰 마른 풀밭 산책을 피한다.</li>
<li>풀밭 산책용 신발이나 귀를 덮는 보호 용품을 쓰는 방법도 있다.</li>
<li>집 마당에서 이런 풀을 제거한다.</li>
</ul>

<h2>병원에서는</h2>
<p>수의사가 까락의 위치를 확인하고 제거한다. 귀나 코에 깊이 있으면 진정 또는 마취가 필요할 수 있고, 염증이 이미 생겼다면 항생제나 배농 처치를 할 수 있다. 의심되면 시간을 끌수록 깊이 들어가므로 빨리 방문한다.</p>

<h2>마지막으로</h2>
<p>반복적인 귀 긁기, 한쪽 발 핥기, 갑작스러운 재채기는 작은 씨앗 하나가 원인일 수 있다. 증상을 보이면 집에서 해결하려 하지 말고 병원에서 확인하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.petmd.com/dog/general-health/foxtails — PetMD, Foxtails: What They Are and Why They're Harmful to Dogs",
      "https://ipet.ch/en/cats-and-dogs-advice/beware-of-foxtails — iPet, Beware of foxtails",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-24T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-627",
    slug: "cat-vaccine-sarcoma-guide",
    type: "blog",
    category: 3,
    title: "고양이 주사 유발 육종 — 예방접종 맞은 자리에 혹이 생겼다면",
    subtitle: "주사 유발 육종 특성, 발생 빈도, 예방 접종 vs 위험 균형, 발견 시 대처",
    metaTitle: "고양이 주사 유발 육종 — 예방접종 부위 혹 발견 시 가이드 | 펫지기",
    metaDescription: "고양이 예방접종 맞은 자리에 혹이 생겼을 때 알아야 할 것. 주사 유발 육종 특성, 발생 빈도, 예방 접종 계속해야 하는 이유, 발견 시 즉각 조치를 정리했습니다.",
    body: `<p>고양이 예방접종 부위에 혹이 만져지면 걱정이 앞선다. 접종 후 일시적인 염증 반응일 수도 있지만, 드물게는 주사 부위 육종이라는 악성 종양일 수도 있다. 위험은 낮지만 알아 두면 좋은 내용을 정리했다.</p>

<h2>주사 부위 육종이란</h2>
<p>주사나 접종 부위에 생기는 악성 종양으로, 대표적으로 섬유육종이 있다. 접종뿐 아니라 일부 주사 약물에서도 보고된다. 발생은 드물지만, 생기면 주변 조직으로 침습적으로 자라고 수술이 어려울 수 있다. 연구마다 차이가 있으나 접종받은 고양이 1만 마리당 1~10마리 정도로 추정하는 보고가 있다.</p>

<h2>접종 후 혹을 확인하는 3-2-1 규칙</h2>
<div class="callout-cat">
<strong>3-2-1 규칙</strong><br>
• 접종 후 <strong>3개월</strong>이 지나도 혹이 남아 있다<br>
• 혹의 크기가 <strong>2cm</strong>보다 크다<br>
• 접종 후 <strong>1개월</strong>이 지났는데도 혹이 계속 커진다<br>
→ 이 중 하나라도 해당하면 수의사에게 진료받고 세침흡인검사나 조직검사를 상의한다
</div>
<p>접종 직후 작은 혹이 만져지는 것은 흔한 반응이지만, 시간이 지나도 줄지 않으면 검사가 필요하다. 미국동물병원협회(AAHA)의 고양이 가이드라인도 의심되는 혹을 조사할 때 3-2-1 규칙을 따르라고 안내한다.</p>

<h2>접종 부위 선택</h2>
<p>AAHA는 종양이 생겼을 때 절제나 절단이 가능한 위치에 접종하도록 권고한다. 다리 아래쪽이나 꼬리 같은 부위가 거론되고, 완전 절제가 어려운 어깨뼈 사이(견갑 사이) 접종은 권장하지 않는다. 접종 부위는 기록해 두면 이후 혹을 평가할 때 도움이 된다.</p>

<h2>치료</h2>
<p>이 종양은 수술이 중심이며, 넓은 범위로 절제해야 재발을 줄일 수 있다. 연구에 따르면 전문 외과의가 넓은 안전 범위(충분한 측면 마진과 깊은 조직 절제)로 절제한 경우 상당수가 장기 생존했다. 초기에 발견할수록 수술 선택지가 넓다. 방사선 치료·항암 치료를 병행하기도 한다.</p>

<h2>그래도 예방접종은 필요하다</h2>
<p>주사 부위 육종은 드물지만, 예방접종을 받지 않으면 범백혈구감소증이나 상부 호흡기 감염 같은 치명적인 질환에 걸릴 위험이 훨씬 크다. 접종 여부는 생활 환경(실내/실외), 나이, 건강 상태에 따라 수의사와 상의해 개체에 맞는 계획을 세운다. 접종 방법과 일정은 <a href="/blog/cat-vaccination-schedule">고양이 예방접종 스케줄</a>을 참고한다.</p>

<h2>접종 후 확인 습관</h2>
<ul>
<li>접종 부위와 날짜를 기록한다.</li>
<li>접종 후 몇 주 동안 해당 부위를 만져 보고 변화를 기록한다.</li>
<li>혹이 만져지면 크기를 재거나 사진으로 남긴다.</li>
<li>정기 검진 때마다 전신을 만져 혹을 확인하도록 요청한다.</li>
</ul>

<h2>마지막으로</h2>
<p>3-2-1 규칙에 해당하는 혹은 빨리 검사를 받아야 한다. 겁먹고 접종을 피하기보다 접종 부위를 기록하고 관찰하는 것이 현명한 대응이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.aaha.org/aaha-guidelines/life-stage-feline-2021/vaccinations/ — AAHA, Feline Life Stage Guidelines: Vaccinations",
      "https://journals.sagepub.com/doi/reader/10.1177/1098612X13505579 — Journal of Feline Medicine and Surgery 2014, 주사 부위 육종 관련 논문",
      "https://marvistavet.com/vaccine-associated-fibrosarcoma-cancer.pml — Mar Vista Animal Medical Center, Vaccine-associated fibrosarcoma",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-11-24T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-628",
    slug: "domestic-pet-travel-regulations",
    type: "blog",
    category: 4,
    title: "국내 반려동물 여행 법규 — 기차·버스·택시 반려동물 동반 규정",
    subtitle: "대중교통 반려동물 규정, 숙박 반려동물 동반 법규, 카페·식당 입장 규정",
    metaTitle: "국내 반려동물 여행 법규 — 대중교통·숙박·카페 규정 완전 가이드 | 펫지기",
    metaDescription: "국내 반려동물 여행 시 알아야 할 법규. 기차·버스·택시 반려동물 동반 규정, 숙박 법규, 카페·음식점 입장 관련 규정을 정리했습니다.",
    body: `<p>반려동물과 국내 여행을 계획할 때 대중교통·숙박·식당 규정을 미리 파악하면 불필요한 분쟁을 피할 수 있다.</p>

<h2>대중교통 규정</h2>
<ul>
<li><strong>기차(KTX·일반)</strong>: 케이지에 넣어 좌석 발치 또는 짐칸. 반려동물 전용칸 일부 운행. 코레일 사전 예약.</li>
<li><strong>고속버스·시외버스</strong>: 대부분 반려동물 탑승 불허. 소형 이동장 업체에 따라 허용.</li>
<li><strong>택시</strong>: 법적으로 거부 불가하나 기사 동의 권장. 분쟁 시 국토교통부 신고.</li>
<li><strong>지하철</strong>: 이동장 내 소형 반려동물 탑승 허용 (혼잡 시간 제한).</li>
</ul>

<h2>숙박 규정</h2>
<div class="callout-dog">
<strong>반려동물 동반 숙박</strong><br>
• 숙박업 법령상 반려동물 동반 허용을 강제하는 규정 없음<br>
• 업주 재량으로 허용·불허 결정<br>
• 펫프렌들리 숙소 사전 확인 필수<br>
• 반려동물 객실 내 파손 시 업주 손해배상 청구 가능
</div>

<h2>카페·음식점</h2>
<ul>
<li>식품위생법: 동물은 식품 제조·조리·판매 장소 입장 금지가 원칙</li>
<li>야외 테라스: 식품 제조 구역 아니면 업주 재량 허용 가능</li>
<li>반려동물 동반 카페: 별도 허가 또는 식품 제조 구역 분리된 경우</li>
<li>입장 전 확인 필수</li>
</ul>

<h2>마지막으로</h2>
<p>반려동물 동반 여행은 점점 편해지고 있지만, 모든 곳에서 환영받지는 않는다. 사전 확인과 다른 사람을 배려하는 태도가 반려동물 동반 문화를 더 넓히는 방법이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "국토교통부 여객자동차 운수사업법 반려동물 관련 지침",
      "농림축산식품부 반려동물 동반 여행 인프라 조성 계획",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-25T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-629",
    slug: "senior-dog-kidney-preventive-diet",
    type: "blog",
    category: 2,
    title: "노령견 신장 예방 식이 — 신부전 전에 미리 할 수 있는 것",
    subtitle: "노령견 신장 기능 저하 기전, 예방적 식이 조정, 수분 섭취 극대화",
    metaTitle: "노령견 신장 예방 식이 — 신부전 전 미리 하는 식이 관리 | 펫지기",
    metaDescription: "노령견 신장 기능을 보호하는 예방 식이 방법. 신장 기능 저하 기전, 인 제한 시작 시점, 수분 섭취 극대화, 정기 검진의 중요성을 정리했습니다.",
    body: `<p>노령견의 신장은 서서히 기능이 떨어진다. 신장 건강을 위해 식단을 바꾸려는 보호자가 많지만, 무조건 단백질을 줄이는 것이 답은 아니다. 신장병 단계에 따라 식이 관리가 달라지므로 먼저 검사로 상태를 확인해야 한다.</p>

<h2>검사가 먼저</h2>
<ul>
<li>혈액 검사(크레아티닌, BUN, SDMA 등)와 소변 검사(비중, 단백뇨)로 신장 기능을 평가한다.</li>
<li>혈압을 측정한다. 신장병과 고혈압은 서로 영향을 준다.</li>
<li>국제 신장병 단계 분류(IRIS)에 따라 단계(1~4)를 정하고 그에 맞게 관리한다.</li>
</ul>

<h2>단계별 식이의 큰 방향</h2>
<table>
<thead><tr><th>상태</th><th>식이 방향</th></tr></thead>
<tbody>
<tr><td>건강한 노령견·초기(IRIS 1)</td><td>AAHA 노령 관리 지침은 건강한 동물이나 초기 신장병에서는 단백질 제한이 필수적이지 않다고 설명한다. 양질의 균형 잡힌 식사와 적정 체중 유지가 우선이다</td></tr>
<tr><td>IRIS 2</td><td>신장 처방식을 고려하기 시작한다. 인 섭취 조절이 핵심이고 오메가-3 지방산 추가를 논의한다</td></tr>
<tr><td>IRIS 3~4</td><td>단백질과 인을 제한한 신장 처방식이 권장되며, 필요하면 인 결합제, 구토 억제제 등을 병행한다</td></tr>
</tbody>
</table>

<h2>핵심은 인(phosphorus) 관리</h2>
<p>IRIS는 신장병에서 인 섭취를 줄이고 필요하면 인 결합제를 쓰라고 권한다. 인 제한은 신장 손상의 진행과 이차 부갑상선 기능항진증을 늦추는 데 도움이 된다고 알려져 있다. 일반 사료에서 인 함량이 높은 간식(뼈, 치즈, 육포 등)은 주의한다.</p>

<h2>집에서 할 수 있는 예방 관리</h2>
<ul>
<li><strong>수분</strong>: 신선한 물을 항상 준비하고 습식 사료를 섞어 수분 섭취를 늘린다.</li>
<li><strong>체중과 근육</strong>: 마르거나 근육이 줄지 않게 한다. 노령견은 근육 유지를 위해 양질의 단백질이 필요하다.</li>
<li><strong>간식</strong>: 염분과 인이 높은 간식을 줄인다.</li>
<li><strong>독성 물질 주의</strong>: 포도·건포도, 비스테로이드 소염제 임의 투여는 신장에 해롭다.</li>
<li><strong>치과 관리</strong>: 구강 감염이 신장에 부담이 될 수 있다.</li>
</ul>

<div class="callout-dog">
<strong>이런 변화는 검사를 받으세요</strong><br>
• 물을 많이 마시고 소변이 늘었다<br>
• 식욕이 떨어지거나 구토가 반복된다<br>
• 체중이 빠지고 입 냄새(암모니아 냄새)가 난다
</div>

<h2>처방식 전환 팁</h2>
<p>신장 처방식은 맛이 달라 거부하는 개가 많다. 기존 사료에 조금씩 섞어 2주 정도에 걸쳐 바꾸고, 먹지 않는 것이 길어지면 수의사와 대안을 상의한다. 식욕이 가장 중요하다.</p>

<h2>마지막으로</h2>
<p>신장 건강을 위한 식단은 검사 결과에 따라 달라진다. 임의로 단백질을 줄이지 말고 정기 검진과 수의사의 안내에 따라 관리하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 영양 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.aaha.org/resources/2023-aaha-senior-care-guidelines-for-dogs-and-cats/disease-management-nutritional/ — AAHA, 2023 AAHA Senior Care Guidelines: Nutritional disease management",
      "https://www.vin.com/doc/?id=3854219 — VIN, Nutritional management of chronic renal failure in dogs",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-25T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-630",
    slug: "pet-adoption-scam-prevention",
    type: "blog",
    category: 1,
    title: "반려동물 입양 사기 예방 — '선금 보내면 강아지 배송' 사기 유형",
    subtitle: "온라인 입양 사기 5가지 유형, 사기 신호 체크리스트, 피해 시 신고 방법",
    metaTitle: "반려동물 입양 사기 예방 — 온라인 사기 유형과 신호 체크리스트 | 펫지기",
    metaDescription: "반려동물 온라인 입양 사기 유형과 예방 방법. 선금 요구·배송 사기·가짜 브리더 5가지 유형, 사기 신호 체크리스트, 피해 시 신고 방법을 정리했습니다.",
    body: `<p>인기 품종 강아지·고양이를 싸게 분양한다며 선입금을 받고 사라지는 반려동물 분양 사기가 반복된다. 사진만 보고 계약금을 보내기 전에 몇 가지 확인만 해도 대부분 피할 수 있다. 위험 신호와 피해 시 대처법을 정리했다.</p>

<h2>사기 위험 신호</h2>
<table>
<thead><tr><th>신호</th><th>설명</th></tr></thead>
<tbody>
<tr><td>직접 만남·영상 통화 거부</td><td>실물을 보여 주지 않고 사진만 보낸다</td></tr>
<tr><td>선입금 요구</td><td>만나기 전 계약금·배송비·보험료를 먼저 보내라고 한다. 추가 비용을 계속 요구하기도 한다</td></tr>
<tr><td>시세보다 매우 낮은 가격</td><td>인기 품종인데 지나치게 저렴하다</td></tr>
<tr><td>즉시 분양 가능</td><td>검증된 브리더는 대기자가 있거나 번식 시기가 제한적인 경우가 많다</td></tr>
<tr><td>택배·항공 배송만 가능</td><td>직접 인수 없이 배송만 제안한다</td></tr>
<tr><td>추적하기 어려운 결제</td><td>상품권, 해외송금, 가상화폐, 타인 명의 계좌만 받는다</td></tr>
<tr><td>재촉·감정 호소</td><td>다른 구매자가 있다, 사정이 급해서 재분양한다 등으로 서두르게 한다</td></tr>
<tr><td>도용한 사진</td><td>다른 사이트의 사진을 그대로 쓴다. 이미지 역검색으로 확인할 수 있다</td></tr>
</tbody>
</table>

<h2>안전하게 분양받는 방법</h2>
<ol>
<li><strong>직접 방문</strong>: 어미견·새끼의 환경을 보고 업체의 등록 여부를 확인한다. 반려동물 판매업·생산업은 지자체 허가·등록 업종이다.</li>
<li><strong>서류 확인</strong>: 건강 기록, 접종 기록, 계약서(환불·반환 규정 포함)를 받는다.</li>
<li><strong>결제 안전</strong>: 가능하면 카드 등 분쟁 시 구제가 가능한 방법을 쓰고, 개인 계좌 선입금은 피한다.</li>
<li><strong>보호소·구조단체</strong>: 입양 절차와 서류가 갖춰진 곳을 먼저 알아본다 (<a href="/blog/dog-adoption-vs-purchase-guide">입양 vs 구매 가이드</a>).</li>
<li><strong>동물등록</strong>: 인수 후 동물등록 정보를 정확히 변경한다.</li>
</ol>

<div class="callout-dog">
<strong>피해를 봤다면</strong><br>
• 대화 내용, 입금 내역, 광고 화면을 보관한다<br>
• 경찰(사이버범죄 신고)에 신고하고 거래 은행에 지급정지를 요청한다<br>
• 한국소비자원(1372) 등 소비자 상담 기관에도 상담한다<br>
• 피해 사례를 공유해 다른 사람의 피해를 막는다
</div>

<h2>마지막으로</h2>
<p>싸고 빠르게 데려올 수 있다는 말은 의심의 신호다. 반드시 직접 보고, 서류를 받고, 안전한 방법으로 결제하자.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 입양·관계 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.consumerprotectionbc.ca/2014/06/puppy-scam/ — Consumer Protection BC, Puppy scam",
      "https://dogster.com/lifestyle/how-to-spot-a-puppy-scam-online — Dogster, How to spot a puppy scam online",
      "https://stg1.experian.com/blogs/ask-experian/how-to-avoid-puppy-scams-when-adopting-pet/ — Experian, How to avoid puppy scams when adopting a pet",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-11-26T09:00:00.000Z",
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
  console.log("블로그 포스트 101차 시딩 완료! (blog-626 ~ blog-630)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
