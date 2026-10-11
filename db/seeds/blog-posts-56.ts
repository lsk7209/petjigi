import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 56 — cat1×2 + cat3×1 + cat5×2 = 5편 (IDs 401-405)
// Macros: F, B, E, A, F
// Angles: RA3, RA6, RA2, RA5, RA1

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-401",
    slug: "ferret-adoption-care-guide",
    type: "blog",
    category: 1,
    title: "페럿 입양 가이드 — 개와 고양이 사이 어딘가의 매력적인 동물",
    subtitle: "수명 6~8년, 사회적 동물로 2마리 권장, 냄새 관리, 특유 건강 문제, 전문 수의사 필요성",
    metaTitle: "페럿 입양 완전 가이드 — 수명·먹이·건강·냄새 | 펫지기",
    metaDescription: "페럿 입양 전 알아야 할 것. 수명 6~8년, 사회적 동물 특성, 냄새 관리, 페럿 특유 건강 문제(인슐린종·부신질환), 전문 수의사 필요성을 정리했습니다.",
    body: `<p>페럿은 고양이처럼 독립적이고 강아지처럼 사람을 따른다. 개나 고양이와 다른 독특한 매력이 있지만, 관리 방법은 전혀 다르다.</p>

<h2>페럿 기본 특성</h2>
<ul>
<li><strong>기대 수명</strong>: 6~8년</li>
<li><strong>사회성</strong>: 무리 동물 — 2마리 이상 권장. 혼자는 외로움·우울 위험.</li>
<li><strong>활동 패턴</strong>: 하루 18~20시간 수면, 활동 시 매우 호기심 강하고 장난기 많음</li>
<li><strong>탈출 본능</strong>: 틈새를 찾아 빠져나가는 능력 탁월 — 케이지와 활동 공간 완전 밀폐 필요</li>
</ul>

<h2>냄새 관리</h2>
<p>페럿은 체취가 있다. 취선(musk gland)에서 특유의 냄새가 나며, 흥분하면 강해진다. 한국에서는 취선 제거 수술이 돼 있는 개체를 분양하는 경우가 많다. 정기 목욕(월 1~2회 이하 — 너무 자주 하면 피지 분비 증가)과 케이지 청결이 냄새 관리의 핵심이다.</p>

<h2>먹이</h2>
<p>페럿은 의무 육식동물이다. 고단백·고지방·저탄수화물 식이가 필요하다. 닭·칠면조 기반 전용 사료 또는 날고기 식이. 과일·채소·곡물은 소화관에 해롭다.</p>

<h2>페럿 특유 건강 문제</h2>
<div class="callout-cat">
<strong>4~5세 이후 주의할 질환</strong><br>
• <strong>인슐린종</strong>: 췌장 종양으로 저혈당 발작. 증상: 침 흘림·멍함·허약<br>
• <strong>부신피질 질환</strong>: 탈모·외음부 비대(암컷). 매우 흔함.<br>
• <strong>림프종</strong>: 고령 페럿에서 흔한 암<br>
• <strong>확장성 심근병증</strong>: 심장 문제
</div>

<h2>전문 수의사 필요</h2>
<p>페럿은 엑조틱 동물이다. 일반 개·고양이 수의사가 페럿을 진료하지 않는 경우가 많다. 입양 전 반드시 페럿 진료 가능한 병원을 파악해야 한다.</p>

<h2>마지막으로</h2>
<p>페럿은 독특하고 매력적인 반려동물이다. 그러나 수명이 8년에 달하며, 특유 건강 문제로 의료비가 높을 수 있다. 충분한 준비와 정보를 가지고 결정하는 것이 중요하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Quesenberry, K.E. & Carpenter, J.W. — Ferrets, Rabbits, and Rodents: Clinical Medicine and Surgery",
      "American Ferret Association — Ferret Care Guide",
      "한국페럿협회 책임 입양 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-03T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-402",
    slug: "stray-cat-tnr-participation-guide",
    type: "blog",
    category: 1,
    title: "길고양이 TNR 직접 참여하기 — 지역 고양이 개체수 관리에 기여하는 방법",
    subtitle: "지자체 TNR 신청 방법, 포획틀 대여, 비용 지원 제도, 방사 후 관리 방법",
    metaTitle: "길고양이 TNR 참여 방법 — 지자체 신청·포획틀·비용 지원 | 펫지기",
    metaDescription: "길고양이 TNR에 직접 참여하는 방법. 지자체 TNR 신청 절차, 포획틀 대여, 비용 지원 제도, 중성화 후 방사 관리를 정리했습니다.",
    body: `<p>길고양이 개체수를 인도적으로 줄이는 가장 효과적인 방법은 TNR(Trap-Neuter-Return)이다. 개인 보호자도 지자체 지원을 통해 참여할 수 있다.</p>

<h2>TNR이 효과적인 이유</h2>
<p>단순 포획·이동은 새로운 개체가 빈 영역을 채워 효과가 없다(진공 효과). TNR로 중성화된 개체는 영역을 유지하면서 새 개체의 유입을 막는다. 장기적으로 개체수를 줄이고 질병 전파를 낮춘다.</p>

<h2>지자체 TNR 신청 방법</h2>
<ol>
<li>거주지 관할 시·군·구청 동물보호 담당 부서에 신청</li>
<li>포획 대상 고양이 위치·수 정보 제공</li>
<li>포획틀 대여 (무료 또는 유료)</li>
<li>포획 후 지자체 협력 동물병원 방문 (지정 병원 목록 제공)</li>
<li>중성화 수술 후 회복 → 원 위치 방사</li>
</ol>

<h2>비용 지원</h2>
<p>서울시·경기도 등 다수 지자체에서 TNR 수술비를 전액 또는 일부 지원한다. 지자체마다 다르므로 거주지 담당 부서에 확인 필요. 민간 구조단체를 통한 지원도 가능한 경우 있음.</p>

<div class="callout-cat">
<strong>중성화 표시 확인</strong><br>
TNR된 고양이는 왼쪽 귀 끝을 직선으로 자른 'Ear Tip' 표시가 있다. 이 표시를 보면 이미 중성화된 개체임을 알 수 있다.
</div>

<h2>방사 후 관리</h2>
<ul>
<li>회복 후 원 포획 장소에 방사 (영역 유지를 위해 다른 장소 방사 금지)</li>
<li>수술 후 24~48시간 내 먹이·물 제공 확인</li>
<li>상처 감염 여부 모니터링</li>
</ul>

<h2>마지막으로</h2>
<p>TNR 참여는 길고양이 복지와 지역 사회 공존 모두에 기여하는 가장 실질적인 방법이다. 혼자 하기 어렵다면 지역 길고양이 돌봄이 모임이나 동물보호단체와 협력하는 것을 권장한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "농림축산식품부 길고양이 TNR 사업 안내",
      "Levy, J.K. et al. — Evaluation of the effects of a long-term trap-neuter-return program. JAVMA 2003",
      "동물권행동 카라 TNR 가이드북",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-04T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-403",
    slug: "dog-addisons-disease-guide",
    type: "blog",
    category: 3,
    title: "강아지 부신피질기능저하증(에디슨병) — 쿠싱과 반대지만 더 위험한 이유",
    subtitle: "부신 위기(Addisonian Crisis) 증상, 구토·무기력·쇠약 징후, 치료와 평생 관리",
    metaTitle: "강아지 에디슨병(부신피질기능저하증) 증상·응급·관리 | 펫지기",
    metaDescription: "강아지 에디슨병(부신피질기능저하증)은 부신 위기 시 응급 상황입니다. 증상, 쿠싱과 차이, 응급 처치, 평생 관리 방법을 정리했습니다.",
    body: `<p>에디슨병(부신피질기능저하증)은 부신이 코르티솔 등 호르몬을 충분히 만들지 못하는 질환이다. 증상이 구토, 무기력처럼 흔한 것이라 다른 병으로 오해받기 쉽다. 진단되면 평생 관리가 필요하지만, 치료 반응이 좋은 편이라고 알려져 있다.</p>

<h2>어떤 증상이 나타나나</h2>
<ul>
<li>식욕 저하, 구토, 설사, 체중 감소</li>
<li>무기력, 떨림, 약해 보이는 모습</li>
<li>증상이 좋아졌다 나빠지기를 반복하고, 스트레스 상황에서 심해지기도 한다</li>
</ul>
<p>수 일에서 수개월 동안 이런 증상이 오락가락하다가 진단되는 경우가 많다. 중년까지의 비교적 젊은 성견에서 많이 발견되고 암컷에서 더 흔하다고 알려져 있다.</p>

<div class="callout-dog">
<strong>부신 위기 — 응급</strong><br>
• 갑작스러운 쓰러짐, 심한 무기력<br>
• 구토·설사와 함께 탈수, 맥박이 매우 약하거나 느림<br>
• 체온 저하<br>
→ 지체 없이 응급 진료를 받아야 한다. 일부 개체는 처음부터 이런 쇼크 상태로 내원한다.
</div>

<h2>어떻게 진단하나</h2>
<table>
<thead><tr><th>단계</th><th>내용</th></tr></thead>
<tbody>
<tr><td>일반 혈액·전해질 검사</td><td>혈중 칼륨 상승, 나트륨 저하가 흔한 단서다. 다만 전해질이 정상인 경우도 있다</td></tr>
<tr><td>기저 코르티솔 측정</td><td>아주 낮으면 가능성이 높아져 추가 검사를 한다</td></tr>
<tr><td>ACTH 자극 검사</td><td>확진에 쓰는 검사. 자극 후에도 코르티솔이 거의 오르지 않으면 에디슨병을 시사한다</td></tr>
</tbody>
</table>
<p>검사 전에 스테로이드(글루코코르티코이드)를 투여하면 결과가 왜곡될 수 있으므로, 진료 시 먹이고 있는 약을 모두 알려야 한다.</p>

<h2>치료와 장기 관리</h2>
<ul>
<li><strong>위기 시</strong>: 입원해서 수액과 전해질 교정, 호르몬 보충을 한다.</li>
<li><strong>평소</strong>: 부족한 호르몬을 보충한다. VCA에 따르면 DOCP 주사(미국에서 개 에디슨병 치료용으로 승인)를 3~4주 간격으로 맞고 필요하면 경구 스테로이드를 병행한다. 약 종류와 양은 정기 검사 결과에 따라 수의사가 조절한다.</li>
<li>여행, 입원, 큰 스트레스 때는 약 조정이 필요할 수 있으니 미리 상담한다.</li>
</ul>

<h2>보호자 체크리스트</h2>
<ul>
<li>약을 임의로 중단하거나 용량을 바꾸지 않기</li>
<li>구토·설사로 약을 못 먹으면 바로 병원에 연락하기</li>
<li>정기 혈액검사 일정 지키기</li>
</ul>

<h2>마지막으로</h2>
<p>원인 모를 구토와 무기력이 반복되는 중년 이하 성견이라면 에디슨병도 가능성 목록에 올려 두자. 진단이 늦어질수록 위기 위험이 커지고, 진단되면 꾸준한 투약과 검진으로 안정적인 생활이 가능하다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: [
      "https://www.merckvetmanual.com/endocrine-system/the-adrenal-glands/addison-disease-hypoadrenocorticism-in-animals — Merck Veterinary Manual, Addison Disease (Hypoadrenocorticism) in Animals",
      "https://vcahospitals.com/know-your-pet/addisons-disease-in-dogs-overview — VCA, Addison's Disease in Dogs",
    ],
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-04T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-404",
    slug: "dog-indoor-play-summer-guide",
    type: "blog",
    category: 5,
    title: "여름 실내 강아지 놀이 — 산책 못 나가는 날 에너지 소모하는 방법",
    subtitle: "장마·폭염 때 집에서 할 수 있는 놀이 10가지, 노즈워크 응용, 숨바꼭질 훈련",
    metaTitle: "여름 강아지 실내 놀이 10가지 — 폭염·장마 에너지 소모법 | 펫지기",
    metaDescription: "폭염이나 장마로 산책 못 나가는 날 강아지 에너지를 소모하는 실내 놀이 10가지. 노즈워크, 숨바꼭질 훈련, 퍼즐피더 활용법을 정리했습니다.",
    body: `<p>폭염이나 장마로 산책이 어려운 날에도 강아지의 에너지는 사라지지 않는다. 실내에서 몸과 머리를 함께 쓰게 하면 지루함으로 인한 문제 행동을 줄일 수 있다. 특히 후각을 쓰는 놀이는 비교적 조용하고 안전하게 에너지를 소모시킨다.</p>

<h2>실내 놀이 아이디어</h2>
<table>
<thead><tr><th>놀이</th><th>방법</th><th>주의</th></tr></thead>
<tbody>
<tr><td>간식 찾기 (노즈워크)</td><td>방 안 여러 곳에 간식을 숨기고 찾게 한다. 쉬운 곳부터 시작</td><td>하루 식사량에서 일부를 쓴다</td></tr>
<tr><td>머핀 틀 퍼즐</td><td>머핀 틀 칸에 간식을 넣고 공으로 덮어 찾게 한다</td><td>공이 삼킬 크기가 아닌지 확인</td></tr>
<tr><td>컵·상자 찾기</td><td>빈 컵이나 상자 몇 개 중 하나에 간식을 숨겨 고르게 한다</td><td>종이 상자를 씹어 삼키지 않게 감독</td></tr>
<tr><td>스너플 매트</td><td>천 주름 사이에 사료를 숨겨 찾게 한다. 날씨가 나빠 활동이 제한될 때 도움이 된다</td><td>직물을 뜯어 먹지 않게 지켜보기</td></tr>
<tr><td>퍼즐 급식기, 속을 채우는 장난감</td><td>식사를 퍼즐 장난감으로 제공해 시간을 늘린다</td><td>크기에 맞는 제품 선택</td></tr>
<tr><td>간단한 장애물 놀이</td><td>의자 사이를 지그재그로 걷게 하고 박스를 넘게 한다</td><td>미끄럽지 않은 바닥, 관절이 약한 개는 낮은 높이</td></tr>
<tr><td>훈련 놀이</td><td>앉아·엎드려·돌아·손 같은 신호를 짧게 연습</td><td>짧고 즐겁게 끝내기</td></tr>
</tbody>
</table>

<div class="callout-dog">
<strong>안전 수칙</strong><br>
• 천, 종이, 공, 상자를 삼킬 수 있으니 반드시 지켜본다<br>
• 간식 놀이는 칼로리가 더해지므로 식사량에서 조절한다<br>
• 더운 실내에서 과격하게 뛰게 하지 않는다 — 헐떡임이 심하면 쉬게 하고 시원한 물을 준다<br>
• 미끄러운 바닥에서는 관절 부상 위험이 있어 매트를 깐다
</div>

<h2>머리를 쓰는 운동의 효과</h2>
<p>VCA는 머리를 쓰는 활동도 운동이라고 설명한다. 후각 놀이와 퍼즐은 짧은 시간에도 개를 충분히 피곤하게 만들 수 있다. 체력 소모가 어려운 소형견, 노령견, 단두종에게 특히 유용하다.</p>

<h2>산책을 줄여야 할 때의 팁</h2>
<ul>
<li>산책은 해가 뜨기 전이나 해진 뒤의 시원한 시간으로 옮기고, 바닥이 뜨겁지 않은지 손등으로 확인한다.</li>
<li>그늘진 짧은 산책 + 실내 놀이를 함께 구성한다.</li>
<li>에너지가 계속 남아 파괴 행동, 과한 짖음이 늘면 놀이 시간을 하루 여러 번 나눈다.</li>
</ul>

<h2>마지막으로</h2>
<p>산책을 못 나가는 날은 후각과 두뇌를 쓰는 놀이로 에너지를 풀어 주자. 안전하게, 짧고 즐겁게 하는 것이 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: [
      "https://www.akc.org/expert-advice/training/indoor-games-with-dog/ — AKC, Fun Indoor Games to Play With Your Dog",
      "https://www.akc.org/expert-advice/training/indoor-scent-games-for-dogs/ — AKC, Indoor Scent Games For Dogs",
      "https://vcahospitals.com/resources/preventive-dog/weight-exercise/exercising-the-mind-is-exercise — VCA, Exercising the mind is exercise!",
    ],
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-05T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-405",
    slug: "cat-window-bird-watching-setup",
    type: "blog",
    category: 5,
    title: "고양이를 위한 창문 뷰 만들기 — 새 모이통부터 캣TV까지",
    subtitle: "창문 뷰의 정신 자극 효과, 안전한 새 모이통 배치, 고양이 유튜브 활용법",
    metaTitle: "고양이 창문 뷰 환경 만들기 — 새 모이통·캣TV 가이드 | 펫지기",
    metaDescription: "고양이를 위한 창문 뷰 환경 구성. 새 모이통 안전 배치, 캣타워 위치, 고양이 유튜브 활용법 등 실내 고양이 정신 자극 방법을 정리했습니다.",
    body: `<p>실내 고양이에게 창문은 바깥 세상과의 유일한 연결이다. 제대로 된 창문 뷰는 고양이에게 수시간의 자극과 즐거움을 준다.</p>

<h2>창문 뷰가 고양이에게 중요한 이유</h2>
<ul>
<li>사냥 본능의 시각적 충족 (새·곤충·움직이는 것)</li>
<li>환경 모니터링 욕구 (높은 곳에서 주변 파악)</li>
<li>일조량 확보 (계절성 기분에 영향)</li>
<li>지루함 감소 → 과다 그루밍·파괴 행동 예방</li>
</ul>

<h2>최적 창문 뷰 환경 만들기</h2>
<h3>관찰 공간 확보</h3>
<ul>
<li>창문 바로 옆에 캣타워·선반 배치</li>
<li>고양이가 앉았을 때 창밖이 보이는 높이 확인</li>
<li>햇볕이 드는 시간에 앉을 수 있는 공간 → 낮잠 + 일광욕</li>
</ul>

<h3>새 모이통 설치</h3>
<p>창문 밖이나 베란다에 새 모이통을 설치하면 자연의 채널이 열린다. 참새·박새·직박구리 등이 날아오면 고양이의 집중력이 폭발한다.</p>

<div class="callout-cat">
<strong>새 모이통 설치 시 주의</strong><br>
• 고양이가 창문을 열거나 방충망을 뚫을 수 없는지 확인<br>
• 모이통 위치: 고양이가 직접 닿을 수 없는 거리<br>
• 모이통 청소 주기적으로 (새 질병 예방)<br>
• 고층 아파트: 낙하 위험이 없는 안전한 방충망 확인
</div>

<h3>캣TV — 고양이 유튜브</h3>
<p>새·다람쥐·물고기가 등장하는 '고양이용 영상'은 효과적인 시각 자극이다. 유튜브에서 'cat TV', '고양이 영상'으로 검색하면 수시간짜리 영상들이 있다. 모든 고양이가 반응하진 않지만, 반응하는 개체라면 몇 시간의 자극이 된다.</p>

<h2>창문 안전 확인</h2>
<ul>
<li>방충망이 고양이 체중을 지탱할 수 있는지 확인 (사고 방지)</li>
<li>화분·물건이 고양이가 밀어서 떨어질 위치에 없는지</li>
<li>고층이라면 고양이 전용 방충망 보강 검토</li>
</ul>

<h2>마지막으로</h2>
<p>창문 뷰 하나가 실내 고양이의 삶의 질을 크게 바꾼다. 캣타워 하나와 새 모이통 하나의 투자로 매일 몇 시간의 자연 콘텐츠를 무료로 제공할 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생활 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "International Cat Care — Environmental Enrichment for Indoor Cats",
      "Ellis, S.L.H. — The influence of visual access to the outdoor environment. Animal Behaviour 2007",
      "한국고양이보호협회 실내 환경 풍요화 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-05T11:00:00.000Z",
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
  console.log("블로그 포스트 56차 시딩 완료! (blog-401 ~ blog-405)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
