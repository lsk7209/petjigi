import { db } from "../client";
import { breeds } from "../schema";
import type { NewBreed } from "../schema";

const NOW = new Date().toISOString();

const SEED_BREEDS: NewBreed[] = [
  // ════════════════════════════════
  //  강아지 (dog) × 5
  // ════════════════════════════════

  {
    id: "seed-breed-maltese",
    species: "dog",
    slug: "maltese",
    nameKo: "말티즈",
    nameEn: "Maltese",
    origin: "몰타 / 지중해",
    sizeCategory: "tiny",
    lifespanMin: 12,
    lifespanMax: 15,
    commonConditions: ["슬개골 탈구", "눈물 착색", "치주 질환", "기관 허탈"],
    body: `<h2>말티즈 기본 정보</h2>
<p>말티즈는 흰색의 긴 실크 같은 털로 유명한 소형 견종입니다. 지중해 섬 몰타에서 기원하며, 귀족의 반려견으로 수천 년의 역사를 가집니다. 애교가 많고 사람을 좋아하며, 아파트 생활에 잘 적응합니다.</p>

<h2>성격·특성</h2>
<ul>
  <li>활발하고 사교적이며 분리불안이 생기기 쉬움</li>
  <li>지능이 높아 훈련에 잘 반응</li>
  <li>낯선 사람에게도 친화적인 편</li>
</ul>

<h2>케어 포인트</h2>
<ul>
  <li>매일 빗질 필요 (털 엉킴 방지)</li>
  <li>눈 주변 눈물 착색 닦아주기</li>
  <li>치석 관리를 위한 정기 스케일링 권장</li>
  <li>슬개골 탈구 예방을 위해 높은 곳 점프 자제</li>
</ul>`,
    status: "published",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "seed-breed-pomeranian",
    species: "dog",
    slug: "pomeranian",
    nameKo: "포메라니안",
    nameEn: "Pomeranian",
    origin: "독일·폴란드 포메라니아 지방",
    sizeCategory: "tiny",
    lifespanMin: 12,
    lifespanMax: 16,
    commonConditions: ["슬개골 탈구", "기관 허탈", "탈모 증후군(BSD)", "치주 질환"],
    body: `<h2>포메라니안 기본 정보</h2>
<p>포메라니안은 독일·폴란드 접경지인 포메라니아 지방에서 유래한 스피츠 계열 소형견입니다. 풍성한 더블 코트와 호기심 많은 성격이 특징이며, 빅토리아 여왕의 사랑을 받으며 소형화가 진행됐습니다.</p>

<h2>성격·특성</h2>
<ul>
  <li>자신감이 넘치고 활발한 성격 ("큰 개 영혼")</li>
  <li>짖음이 잦아 훈련 필요</li>
  <li>주인에게 매우 충성스러움</li>
</ul>

<h2>케어 포인트</h2>
<ul>
  <li>주 2~3회 빗질로 털 엉킴과 빠짐 관리</li>
  <li>더위에 약해 여름 산책 시 아침·저녁 시간대 권장</li>
  <li>탈모 증후군(BSD) 조기 발견 위한 정기 검진</li>
</ul>`,
    status: "published",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "seed-breed-golden-retriever",
    species: "dog",
    slug: "golden-retriever",
    nameKo: "골든리트리버",
    nameEn: "Golden Retriever",
    origin: "영국 스코틀랜드",
    sizeCategory: "large",
    lifespanMin: 10,
    lifespanMax: 12,
    commonConditions: ["고관절 이형성증", "암(림프종·혈관육종)", "피부 알레르기", "백내장"],
    body: `<h2>골든리트리버 기본 정보</h2>
<p>골든리트리버는 19세기 스코틀랜드에서 사냥·수색·구조 목적으로 개량된 대형 견종입니다. 온화하고 친화적인 성격 덕분에 안내견·치료견으로도 널리 활용됩니다.</p>

<h2>성격·특성</h2>
<ul>
  <li>가족 지향적이며 어린이와 잘 어울림</li>
  <li>학습 능력이 뛰어나 훈련 용이</li>
  <li>에너지가 높아 충분한 운동 필수</li>
</ul>

<h2>케어 포인트</h2>
<ul>
  <li>하루 최소 1~2시간 운동 필요</li>
  <li>주 2~3회 빗질 (털 빠짐 심함)</li>
  <li>고관절 건강을 위해 과도한 계단 오르내림 주의</li>
  <li>정기 암 검진 권장 (통계적으로 발생률 높은 편)</li>
</ul>`,
    status: "published",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "seed-breed-jindo",
    species: "dog",
    slug: "jindo",
    nameKo: "진도개",
    nameEn: "Korean Jindo Dog",
    origin: "대한민국 전남 진도",
    sizeCategory: "medium",
    lifespanMin: 12,
    lifespanMax: 15,
    commonConditions: ["진드기 매개 질환", "피부 알레르기", "고관절 이형성증"],
    body: `<h2>진도개 기본 정보</h2>
<p>진도개는 전라남도 진도에서 수천 년간 자연 선택으로 발달한 한국 고유 천연기념물 견종(천연기념물 제53호)입니다. 충성심과 청결함, 뛰어난 귀소 본능으로 유명합니다.</p>

<h2>성격·특성</h2>
<ul>
  <li>주인에 대한 강한 충성심, 낯선 사람에게는 경계</li>
  <li>독립적이고 자존감이 높아 훈련 시 인내 필요</li>
  <li>청결을 좋아해 목욕을 스스로 즐기기도 함</li>
</ul>

<h2>케어 포인트</h2>
<ul>
  <li>충분한 운동과 넓은 공간 필요</li>
  <li>초기 사회화 훈련 매우 중요</li>
  <li>이중 모 구조라 환절기 털 빠짐 심함 — 정기 빗질</li>
  <li>진도 외 지역 반출 시 관련 규정 확인</li>
</ul>`,
    status: "published",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "seed-breed-shiba-inu",
    species: "dog",
    slug: "shiba-inu",
    nameKo: "시바이누",
    nameEn: "Shiba Inu",
    origin: "일본",
    sizeCategory: "small",
    lifespanMin: 12,
    lifespanMax: 15,
    commonConditions: ["슬개골 탈구", "알레르기성 피부염", "녹내장", "고관절 이형성증"],
    body: `<h2>시바이누 기본 정보</h2>
<p>시바이누는 일본에서 가장 오래된 원시 견종 중 하나로, 작고 민첩하며 강한 독립심을 가지고 있습니다. 일본 천연기념물로 지정되어 있으며, 특유의 '시바 스크림' 울음소리로도 유명합니다.</p>

<h2>성격·특성</h2>
<ul>
  <li>독립적이고 고집이 강해 훈련 난이도 높음</li>
  <li>영리하지만 협력보다 자신의 판단을 우선시</li>
  <li>청결을 좋아하며 고양이 같은 성격</li>
</ul>

<h2>케어 포인트</h2>
<ul>
  <li>도주 본능 강해 리드줄 착용과 안전 펜스 필수</li>
  <li>주 2~3회 빗질 (환절기 털 빠짐 심함)</li>
  <li>초기 사회화로 낯선 사람·동물에 대한 경계심 완화</li>
  <li>알레르기성 피부 발생 시 저알레르기 사료 전환 검토</li>
</ul>`,
    status: "published",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ════════════════════════════════
  //  고양이 (cat) × 5
  // ════════════════════════════════

  {
    id: "seed-breed-korean-shorthair",
    species: "cat",
    slug: "korean-shorthair",
    nameKo: "코리안숏헤어",
    nameEn: "Korean Shorthair",
    origin: "대한민국",
    sizeCategory: "medium",
    lifespanMin: 13,
    lifespanMax: 17,
    commonConditions: ["비만", "치주 질환", "하부 요로 질환(FLUTD)", "비대심근병증(HCM)"],
    body: `<h2>코리안숏헤어 기본 정보</h2>
<p>코리안숏헤어(일명 '코숏')는 한국에서 자연 발생한 토착 혼혈 단모종 고양이를 통칭합니다. 특정 혈통 기준이 없어 외형이 다양하지만, 전반적으로 건강하고 적응력이 뛰어납니다.</p>

<h2>성격·특성</h2>
<ul>
  <li>다양한 성격 스펙트럼 (개체 차이 큼)</li>
  <li>혼혈 강점으로 전반적으로 건강한 편</li>
  <li>독립적이면서도 사람과의 교류를 즐김</li>
</ul>

<h2>케어 포인트</h2>
<ul>
  <li>적정 체중 유지 — 실내 고양이는 비만 경향</li>
  <li>하부 요로 질환 예방: 충분한 물 섭취 유도</li>
  <li>주 1~2회 빗질로 털 관리</li>
  <li>연 1~2회 정기 혈액 검사 권장 (특히 5세 이후)</li>
</ul>`,
    status: "published",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "seed-breed-persian",
    species: "cat",
    slug: "persian",
    nameKo: "페르시안",
    nameEn: "Persian",
    origin: "이란(페르시아)",
    sizeCategory: "medium",
    lifespanMin: 12,
    lifespanMax: 17,
    commonConditions: ["다낭성신장병(PKD)", "호흡기 문제(단두)", "눈물 과다·착색", "치주 질환"],
    body: `<h2>페르시안 기본 정보</h2>
<p>페르시안은 풍성하고 긴 털과 납작한 얼굴(단두형)로 유명한 장모 고양이입니다. 조용하고 온화한 성격으로 실내 생활에 최적화되어 있으며, 세계에서 가장 오래되고 인기 있는 품종 중 하나입니다.</p>

<h2>성격·특성</h2>
<ul>
  <li>조용하고 차분하며 존재감이 느린 편</li>
  <li>루틴을 좋아하며 환경 변화에 예민</li>
  <li>어린이보다 조용한 환경에서 더 잘 적응</li>
</ul>

<h2>케어 포인트</h2>
<ul>
  <li>매일 빗질 필수 (털 엉킴·헤어볼 방지)</li>
  <li>눈 주변 눈물 매일 닦기</li>
  <li>PKD 유전자 검사로 조기 발견 권장</li>
  <li>단두 구조로 인한 호흡음·수면 무호흡 모니터링</li>
</ul>`,
    status: "published",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "seed-breed-russian-blue",
    species: "cat",
    slug: "russian-blue",
    nameKo: "러시안블루",
    nameEn: "Russian Blue",
    origin: "러시아 아르한겔스크",
    sizeCategory: "medium",
    lifespanMin: 15,
    lifespanMax: 20,
    commonConditions: ["비만", "방광염", "치주 질환"],
    body: `<h2>러시안블루 기본 정보</h2>
<p>러시안블루는 짧고 촘촘한 더블 코트와 은회색 털, 에메랄드 초록 눈이 특징인 우아한 고양이입니다. 러시아 북부 아르한겔스크에서 기원했으며, 알레르기 유발이 적은 품종으로 알려져 있습니다.</p>

<h2>성격·특성</h2>
<ul>
  <li>조용하고 섬세하며 주인에게 충성스러움</li>
  <li>낯선 사람에게는 수줍어하지만 익숙해지면 다정함</li>
  <li>지능이 높고 놀이를 즐김</li>
</ul>

<h2>케어 포인트</h2>
<ul>
  <li>과식 경향이 있어 정량 급식 중요</li>
  <li>주 1~2회 빗질 (더블 코트 관리)</li>
  <li>조용한 환경 선호 — 소음 스트레스 최소화</li>
  <li>일정한 루틴 유지가 정신 건강에 중요</li>
</ul>`,
    status: "published",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "seed-breed-siamese",
    species: "cat",
    slug: "siamese",
    nameKo: "샴",
    nameEn: "Siamese",
    origin: "태국(시암)",
    sizeCategory: "medium",
    lifespanMin: 12,
    lifespanMax: 15,
    commonConditions: ["호흡기 감염", "치주 질환", "심장 질환(HCM)", "사시(유전적)"],
    body: `<h2>샴 기본 정보</h2>
<p>샴은 태국(구 시암)에서 기원한 세계에서 가장 오래된 품종 중 하나입니다. 포인트 컬러(귀·얼굴·발·꼬리가 짙은 색)와 파란 눈이 특징이며, 매우 수다스럽고 사교적인 고양이입니다.</p>

<h2>성격·특성</h2>
<ul>
  <li>매우 활발하고 수다스러움 (큰 목소리로 요구 표현)</li>
  <li>사람과의 교류를 강하게 원함 — 혼자 있는 시간을 싫어함</li>
  <li>장난기가 많고 호기심이 강함</li>
</ul>

<h2>케어 포인트</h2>
<ul>
  <li>혼자 두는 시간 최소화 또는 다묘 환경 고려</li>
  <li>충분한 놀이와 정신적 자극 제공</li>
  <li>단모종이라 빗질은 주 1회면 충분</li>
  <li>호흡기·눈 이상 증상 조기 확인</li>
</ul>`,
    status: "published",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "seed-breed-abyssinian",
    species: "cat",
    slug: "abyssinian",
    nameKo: "아비시니안",
    nameEn: "Abyssinian",
    origin: "에티오피아(아비시니아)",
    sizeCategory: "small",
    lifespanMin: 12,
    lifespanMax: 15,
    commonConditions: ["신장 아밀로이드증", "치주 질환", "망막 위축(PRA)", "고양이범백혈구감소증"],
    body: `<h2>아비시니안 기본 정보</h2>
<p>아비시니안은 에티오피아(구 아비시니아)에서 유래한 것으로 알려진 고대 품종입니다. 틱킹(ticking) 패턴의 짧은 털과 슬림한 몸, 큰 귀가 특징이며 고양이계의 '원숭이'라 불릴 만큼 활동적입니다.</p>

<h2>성격·특성</h2>
<ul>
  <li>극도로 활발하고 호기심이 강함</li>
  <li>높은 곳을 좋아하고 탐색 욕구 강함</li>
  <li>사람과의 유대감이 강하지만 안기는 것은 선호하지 않음</li>
</ul>

<h2>케어 포인트</h2>
<ul>
  <li>캣타워·해먹 등 높은 구조물 필수 제공</li>
  <li>지루함 방지 위한 인터랙티브 장난감 활용</li>
  <li>신장 아밀로이드증 조기 발견 위한 정기 혈액·소변 검사</li>
  <li>PRA(망막 위축) 유전자 검사 가능한 브리더 선택 권장</li>
</ul>`,
    status: "published",
    createdAt: NOW,
    updatedAt: NOW,
  },

  // ════════════════════════════════
  //  소동물 (small) × 4
  // ════════════════════════════════

  {
    id: "seed-breed-dutch-rabbit",
    species: "small",
    slug: "dutch-rabbit",
    nameKo: "더치 토끼",
    nameEn: "Dutch Rabbit",
    origin: "네덜란드",
    sizeCategory: "small",
    lifespanMin: 8,
    lifespanMax: 12,
    commonConditions: ["치아 과성장(말로클루전)", "GI 정체", "호흡기 감염", "비만"],
    body: `<h2>더치 토끼 기본 정보</h2>
<p>더치 토끼는 흑백 또는 다양한 색상의 뚜렷한 이색 패턴이 특징입니다. 사교적이고 조용하며 훈련이 가능해 초보 토끼 보호자에게 인기가 높습니다.</p>

<h2>성격·특성</h2>
<ul>
  <li>사람을 좋아하고 안기는 것을 거부하지 않는 편</li>
  <li>영리해 이름 인식 및 간단한 명령 훈련 가능</li>
  <li>다른 토끼와 함께 생활 가능 (단, 중성화 필수)</li>
</ul>

<h2>케어 포인트</h2>
<ul>
  <li><strong>건초 중심 식단</strong>: 식이섬유 풍부한 건초(티모시 등)가 80% 이상이어야 치아·소화 건강 유지</li>
  <li><strong>운동 공간</strong>: 하루 3~4시간 자유 활동 공간 필요</li>
  <li><strong>치아 검진</strong>: 과성장 위험이 높아 정기 구강 검진 권장</li>
  <li><strong>소동물 전문 병원</strong>: 일반 동물병원과 달리 소동물 진료 가능 병원 사전 확인 필수</li>
</ul>`,
    status: "published",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "seed-breed-guinea-pig",
    species: "small",
    slug: "guinea-pig",
    nameKo: "기니피그",
    nameEn: "Guinea Pig",
    origin: "남미 안데스 지역",
    sizeCategory: "small",
    lifespanMin: 4,
    lifespanMax: 8,
    commonConditions: ["비타민 C 결핍(괴혈병)", "이(Lice)·진드기", "호흡기 감염", "난소 낭종(암컷)"],
    body: `<h2>기니피그 기본 정보</h2>
<p>기니피그는 사회적 동물로 2마리 이상 함께 키우는 것이 권장됩니다. 울음소리(wheeking)로 배고픔이나 기쁨을 표현하며, 주인을 인식하고 반응합니다.</p>

<h2>성격·특성</h2>
<ul>
  <li>사회적 동물 — 단독 사육은 스트레스 원인</li>
  <li>낮 시간대에 활동적, 야행성이 아님</li>
  <li>온순해 어린이와 함께하기 적합한 반려동물</li>
</ul>

<h2>케어 포인트</h2>
<ul>
  <li><strong>비타민 C 필수 공급</strong>: 기니피그는 체내에서 비타민 C를 합성하지 못합니다. 피망, 파슬리, 전용 보충제로 매일 공급 필요</li>
  <li><strong>넓은 사육장</strong>: 최소 0.6㎡ 이상의 바닥 면적 권장</li>
  <li><strong>건초 중심</strong>: 티모시 건초가 치아·소화 건강의 핵심</li>
  <li><strong>암컷 합사 주의</strong>: 수컷과 함께 키울 경우 번식 조절 위한 중성화 상담</li>
</ul>`,
    status: "published",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "seed-breed-hamster-syrian",
    species: "small",
    slug: "syrian-hamster",
    nameKo: "시리아 햄스터 (골든 햄스터)",
    nameEn: "Syrian Hamster",
    origin: "시리아 사막",
    sizeCategory: "small",
    lifespanMin: 2,
    lifespanMax: 3,
    commonConditions: ["볼 낭종(Cheek Pouch Impaction)", "Wet Tail(설사)", "종양(지방종)", "당뇨"],
    body: `<h2>시리아 햄스터 기본 정보</h2>
<p>가장 대표적인 반려 햄스터 품종입니다. 야생에서 단독 생활을 하기 때문에 반드시 단독 사육해야 합니다. 밤에 가장 활발하게 활동합니다.</p>

<h2>성격·특성</h2>
<ul>
  <li>단독 생활 필수 — 합사 시 심각한 싸움·사망 위험</li>
  <li>야행성, 저녁~새벽에 활발</li>
  <li>처음에는 낯을 가리지만 꾸준한 접촉으로 길들이기 가능</li>
</ul>

<h2>케어 포인트</h2>
<ul>
  <li><strong>쳇바퀴 필수</strong>: 하루 수 킬로미터를 달리는 본능. 직경 20~25cm 이상 솔리드형 쳇바퀴 필요</li>
  <li><strong>깊은 바닥재</strong>: 굴 파기 본능 충족을 위해 15~20cm 이상 깊이 배치</li>
  <li><strong>온도 관리</strong>: 적정 온도 18~24°C. 10°C 이하면 가사 상태(Torpor) 위험</li>
  <li><strong>볼 사용 제한</strong>: 햄스터 볼은 방향 감각 혼란 및 과열 위험. 30분 이내 사용 권장</li>
</ul>`,
    status: "published",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "seed-breed-chinchilla",
    species: "small",
    slug: "chinchilla",
    nameKo: "친칠라",
    nameEn: "Chinchilla",
    origin: "남미 안데스 산맥",
    sizeCategory: "small",
    lifespanMin: 10,
    lifespanMax: 15,
    commonConditions: ["치아 과성장(말로클루전)", "열사병", "GI 정체", "털 씹기(Fur Chewing)"],
    body: `<h2>친칠라 기본 정보</h2>
<p>세계에서 가장 부드러운 털을 가진 동물로 알려진 친칠라는 수명이 10~15년으로 소동물 중 가장 깁니다. 조용하고 민감한 동물로 스트레스 관리가 매우 중요합니다.</p>

<h2>성격·특성</h2>
<ul>
  <li>조용하고 민감해 갑작스러운 소음·자극에 취약</li>
  <li>야행성 ~ 여명성 (새벽·저녁에 활발)</li>
  <li>오래 살기 때문에 15년 이상의 장기 책임 의지 필요</li>
</ul>

<h2>케어 포인트</h2>
<ul>
  <li><strong>온도 엄격 관리</strong>: 25°C 이상에서 열사병 위험. 에어컨 필수 환경에서만 사육 권장</li>
  <li><strong>먼지 목욕</strong>: 물 목욕 절대 금지. 친칠라 전용 화산재(Dust Bath)로 주 2~3회 관리</li>
  <li><strong>건초 중심</strong>: 티모시 건초가 식이의 80% 이상 (치아·소화 건강)</li>
  <li><strong>사회화</strong>: 2마리 이상 동성 합사 가능 (이성 합사 시 번식 조절 필수)</li>
</ul>`,
    status: "published",
    createdAt: NOW,
    updatedAt: NOW,
  },
];

async function seedBreeds() {
  console.log(`Seeding ${SEED_BREEDS.length} breeds...`);

  for (const breed of SEED_BREEDS) {
    await db
      .insert(breeds)
      .values(breed)
      .onConflictDoUpdate({
        target: breeds.id,
        set: {
          nameKo: breed.nameKo,
          nameEn: breed.nameEn,
          origin: breed.origin,
          sizeCategory: breed.sizeCategory,
          lifespanMin: breed.lifespanMin,
          lifespanMax: breed.lifespanMax,
          commonConditions: breed.commonConditions,
          body: breed.body,
          status: breed.status,
          updatedAt: NOW,
        },
      });
    console.log(`  ✓ ${breed.slug} (${breed.species})`);
  }

  console.log("Breeds seeded.");
}

seedBreeds().catch(console.error);
