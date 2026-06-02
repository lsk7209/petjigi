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
    body: `<p>에디슨병은 부신이 코르티솔·알도스테론을 충분히 생산하지 못하는 질환이다. 쿠싱증후군의 반대다. 증상이 비특이적이어서 '위대한 모방자(Great Pretender)'라 불린다.</p>

<h2>주요 증상 — 비특이적이라 진단이 늦어짐</h2>
<ul>
<li>간헐적 구토·설사 (스트레스 상황에서 심해짐)</li>
<li>무기력·식욕 감소</li>
<li>체중 감소</li>
<li>떨림</li>
<li>다음·다뇨 (알도스테론 부족)</li>
</ul>

<h2>부신 위기(Addisonian Crisis) — 응급 상황</h2>
<div class="callout-dog">
<strong>부신 위기 신호 — 즉시 응급실</strong><br>
• 심한 무기력·의식 저하<br>
• 구토·설사로 인한 극심한 탈수<br>
• 심한 저혈당<br>
• 심부정맥 (서맥)<br>
→ 전해질 불균형(고칼륨혈증)으로 치명적
</div>

<h2>진단</h2>
<ul>
<li>혈액전해질 검사: 나트륨 낮음(저나트륨혈증) + 칼륨 높음(고칼륨혈증) → 에디슨 의심</li>
<li>Na:K 비율 &lt; 27 이면 에디슨 강력 의심</li>
<li>ACTH 자극 검사: 확진 방법</li>
</ul>

<h2>치료</h2>
<ul>
<li><strong>응급</strong>: 정맥 수액·전해질 보충·하이드로코르티손 투여</li>
<li><strong>장기 관리</strong>: 광질코르티코이드(플루드로코르티손 경구 또는 DOCP 주사) + 글루코코르티코이드(프레드니솔론) 평생 투여</li>
<li>스트레스 상황(여행·수술·질병)에서 용량 일시 증량 필요 (보호자 교육 필수)</li>
</ul>

<h2>마지막으로</h2>
<p>에디슨병은 진단이 어렵지만 일단 진단되면 관리가 가능하다. 약물을 성실히 투여하면 정상적인 삶의 질을 유지할 수 있다. 간헐적 구토·무기력이 반복된다면 ACTH 검사를 요청하는 것이 좋다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Klein, S.C. & Peterson, M.E. — Canine Hypoadrenocorticism. CAVC 2010",
      "한국수의내분비학회 에디슨병 임상 가이드라인",
      "WSAVA — Adrenal Gland Disease Guidelines",
    ]),
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
    body: `<p>여름 폭염이나 장마 기간에는 산책이 불가능한 날이 많다. 운동 부족 상태의 강아지는 집 안에서 에너지를 발산하고 — 종종 보호자가 원하지 않는 방식으로.</p>

<h2>실내 놀이 10가지</h2>

<h3>정신적 자극</h3>
<ul>
<li><strong>1. 숨긴 간식 찾기</strong>: 방 여러 곳에 간식을 숨기고 찾게 한다. 30분 산책과 맞먹는 정신 피로를 준다.</li>
<li><strong>2. 퍼즐피더</strong>: 밥그릇 대신 레벨별 퍼즐 피더로 식사. 식사 시간이 자연스러운 두뇌 훈련으로.</li>
<li><strong>3. 컵 게임</strong>: 컵 3개 중 하나 아래에 간식 숨기고 맞추기. 주의력·집중력 훈련.</li>
<li><strong>4. 이름 학습</strong>: 장난감에 이름을 붙이고 가져오게 훈련. 어휘를 배우는 강아지는 지능적 자극 효과 큼.</li>
</ul>

<h3>신체 활동</h3>
<ul>
<li><strong>5. 계단 왕복</strong>: 계단이 있는 집이라면 계단 오르내리기 반복 — 짧은 시간에 심폐 운동.</li>
<li><strong>6. 실내 공 굴리기</strong>: 복도나 거실에서 공을 굴려 페치 게임. 털 발자국 패드나 슬라이딩 주의.</li>
<li><strong>7. 줄다리기</strong>: 로프 장난감으로 보호자와 줄다리기. 근력 운동 + 상호작용.</li>
</ul>

<h3>훈련 세션</h3>
<ul>
<li><strong>8. 기초 훈련 복습</strong>: 앉아·엎드려·기다려를 15분 집중 연습. 정신 피로 효과.</li>
<li><strong>9. 새 트릭 배우기</strong>: '돌아', '악수', '손' 등 새로운 동작 훈련.</li>
<li><strong>10. 숨바꼭질</strong>: 강아지가 '기다려'하는 동안 보호자가 숨고, '찾아'로 신호. 후각+탐색 훈련.</li>
</ul>

<div class="callout-dog">
<strong>비 오는 날 특별 노즈워크</strong><br>
수건을 돌돌 말아 간식을 숨기는 '스너플 매트' 응용:<br>
1. 수건 2~3개를 바닥에 펼침<br>
2. 간식을 수건 사이사이에 숨김<br>
3. 수건을 접어 간식이 안 보이게<br>
→ 10~15분 집중 코 훈련 완성
</div>

<h2>마지막으로</h2>
<p>실내 놀이는 산책의 완전한 대체가 아니다. 그러나 정신적 자극은 신체 운동 못지않게 강아지를 지치게 한다. 폭염·장마 기간엔 30분의 실내 두뇌 운동이 2시간의 산책과 맞먹는 효과를 낼 수 있다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "American Kennel Club — Indoor Activities for Dogs",
      "Alexandra Horowitz — Inside of a Dog",
      "한국반려동물행동상담협회 실내 자극 가이드",
    ]),
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
