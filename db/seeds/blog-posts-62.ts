import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

// Blog batch 62 — cat4×2 + cat3×1 + cat6×1 + cat5×1 = 5편 (IDs 431-435)
// Macros: F, A, E, B, F
// Angles: RA2, RA5, RA3, RA8, RA6

const NOW = new Date().toISOString();

const BLOG_POSTS: NewContent[] = [

  {
    id: "blog-431",
    slug: "lost-cat-search-guide",
    type: "blog",
    category: 4,
    title: "고양이를 잃어버렸을 때 — 강아지와 다른 수색 방법",
    subtitle: "고양이 도주 행동 특성, 집 근처 숨기 본능, 야간 수색·포획틀 활용, 분실 신고 절차",
    metaTitle: "길 잃은 고양이 찾는 방법 — 강아지와 다른 고양이 수색 가이드 | 펫지기",
    metaDescription: "고양이를 잃어버렸을 때 강아지와 다른 수색 방법. 고양이 도주 행동 특성, 집 근처 숨기, 야간 수색·포획틀 활용, 분실 신고 절차를 정리했습니다.",
    body: `<p>고양이를 잃어버렸을 때 강아지처럼 멀리 달아난다고 생각하면 틀릴 수 있다. 고양이의 도주 행동은 강아지와 매우 다르다.</p>

<h2>고양이 도주 행동의 특성</h2>
<ul>
<li><strong>가까이 숨는다</strong>: 처음 2~3일은 출발지 50~300m 이내에 숨어있는 경우가 매우 많다</li>
<li><strong>소리에 반응하지 않는다</strong>: 무서운 상태에서는 이름을 불러도 나오지 않는다</li>
<li><strong>야행성 활동</strong>: 사람이 없는 밤에 움직이는 경우가 많다</li>
<li><strong>영역으로 돌아오는 본능</strong>: 며칠 후 스스로 돌아오는 경우도 있다</li>
</ul>

<h2>효과적인 수색 방법</h2>
<h3>즉각 주변 수색</h3>
<p>집 주변 반경 300m 이내 모든 숨을 수 있는 곳을 꼼꼼히 확인한다. 덤불 아래·차 밑·좁은 틈새·창고 안을 손전등으로 비춰본다. 크게 부르기보다 조용히 이름을 부르며 간식 소리를 내는 것이 효과적이다.</p>

<h3>야간 수색</h3>
<p>고양이는 밤에 더 많이 움직인다. 해가 진 후 1~2시간 뒤 조용히 나가 손전등으로 눈 반사를 찾는다.</p>

<h3>포획틀 설치</h3>
<p>평소 먹던 사료·좋아하는 간식을 포획틀 안에 넣어 집 근처에 설치한다. 매일 저녁 설치하고 아침에 확인한다.</p>

<div class="callout-cat">
<strong>분실 신고 체크리스트</strong><br>
□ 동물보호관리시스템(APMS) 실종 등록<br>
□ 동네 SNS·당근마켓 공지<br>
□ 주변 동물병원·편의점 포스터<br>
□ 관리사무소 안내문 부착 (아파트)<br>
□ 인근 길고양이 TNR 단체에 알림
</div>

<h2>마지막으로</h2>
<p>고양이는 대부분 집 근처에 있다. 포기하지 않고 며칠을 수색하는 것이 중요하다. 포획틀은 가장 효과적인 도구 중 하나다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Kat Albrecht — Lost Cat: A True Story of Love, Desperation, and GPS Technology",
      "한국고양이보호협회 실종 고양이 수색 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-18T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-432",
    slug: "microchip-info-update-guide",
    type: "blog",
    category: 4,
    title: "마이크로칩 정보 변경하는 방법 — 이사·전화번호 바뀌면 꼭 해야 하는 것",
    subtitle: "동물보호관리시스템 정보 변경 절차, 소유자 이전 방법, 변경 안 했을 때 문제",
    metaTitle: "마이크로칩 정보 변경 방법 — APMS 업데이트 절차 | 펫지기",
    metaDescription: "이사나 전화번호 변경 시 마이크로칩 정보를 업데이트해야 합니다. 동물보호관리시스템(APMS) 정보 변경 절차, 소유자 이전 방법을 정리했습니다.",
    body: `<p>마이크로칩을 등록했어도 연락처 정보가 업데이트되어 있지 않으면 실종 시 연락이 닿지 않는다. 이사·전화번호 변경·소유자 이전 시 반드시 업데이트가 필요하다.</p>

<h2>변경 절차</h2>
<ol>
<li>동물보호관리시스템(www.animal.go.kr) 접속</li>
<li>로그인 후 '내 동물 관리' 메뉴</li>
<li>해당 반려동물 선택 → '정보 수정'</li>
<li>변경된 주소·전화번호 업데이트</li>
<li>저장</li>
</ol>

<div class="callout-dog">
<strong>변경이 필요한 상황</strong><br>
• 이사 (주소 변경)<br>
• 전화번호 변경<br>
• 반려동물 사망 (사망 신고)<br>
• 소유자 변경 (입양·분양)
</div>

<h2>소유자 이전 방법</h2>
<p>입양 또는 분양으로 소유자가 바뀌면 APMS에서 소유자 이전 신청이 필요하다. 이전 소유자의 동의 또는 공공 보호소 입양 증명이 필요하다.</p>

<h2>변경하지 않았을 때 문제</h2>
<ul>
<li>실종 시 구 연락처로 연락이 가서 돌아오지 못함</li>
<li>사망한 동물 정보가 살아있는 것으로 기록</li>
<li>법적으로 정보 변경 기한(30일 이내) 위반 시 과태료 가능성</li>
</ul>

<h2>마지막으로</h2>
<p>마이크로칩 등록은 한 번이지만 관리는 평생이다. 연락처가 바뀔 때마다 10분만 투자하면 된다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 법률·제도 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "동물보호법 제13조 (동물등록 정보 변경 의무)",
      "농림축산식품부 동물등록 변경 안내",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-19T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-433",
    slug: "dog-nasal-discharge-guide",
    type: "blog",
    category: 3,
    title: "강아지 코 분비물 — 맑은 콧물부터 피까지 원인 구분법",
    subtitle: "정상 vs 이상 콧물, 한쪽·양쪽 분비물의 차이, 즉시 병원이 필요한 신호",
    metaTitle: "강아지 코 분비물 원인 구분 — 정상 vs 이상 신호 가이드 | 펫지기",
    metaDescription: "강아지 코 분비물 원인 구분. 맑은 콧물의 정상 범위, 노란·녹색·피가 섞인 분비물의 의미, 한쪽만 나올 때 주의사항을 정리했습니다.",
    body: `<p>강아지의 코는 항상 촉촉하고 시원해야 한다. 분비물이 생겼을 때 그 색깔과 양, 방향(양쪽/한쪽)이 원인을 가늠하는 중요한 단서다.</p>

<h2>코 분비물 색깔별 원인</h2>
<table>
<thead><tr><th>색깔</th><th>원인</th></tr></thead>
<tbody>
<tr><td>맑은 물 같은 콧물</td><td>알레르기, 흥분, 더위 (정상 범위 가능)</td></tr>
<tr><td>노란색</td><td>세균 감염 신호</td></tr>
<tr><td>황녹색 (짙은)</td><td>심한 세균 감염, 부비동염</td></tr>
<tr><td>피 섞임</td><td>외상, 이물질, 종양, 응혈 이상 — 즉시 검사 필요</td></tr>
<tr><td>한쪽만 분비물</td><td>이물질, 치과 문제, 국소 종양 의심</td></tr>
</tbody>
</table>

<h2>한쪽 분비물이 더 위험하다</h2>
<p>양쪽 모두 콧물이 나오면 전신 감염·알레르기 가능성이 높다. 한쪽에서만 분비물이 나온다면 국소 원인(이물질·치근 농양·비강 종양)을 의심해야 한다. 특히 노령견에서 한쪽 코 분비물이 지속되면 종양 감별 검사가 권장된다.</p>

<h2>즉시 병원이 필요한 신호</h2>
<div class="callout-dog">
<strong>즉시 병원으로</strong><br>
• 분비물에 피가 섞임<br>
• 한쪽만 지속적으로 나옴 (특히 1주 이상)<br>
• 코가 붓거나 변형됨<br>
• 재채기·역재채기가 반복됨<br>
• 호흡이 힘들어 보임
</div>

<h2>마지막으로</h2>
<p>단순 알레르기성 맑은 콧물은 흔하지만, 색깔이 변하거나 한쪽에서만 나온다면 가볍게 보지 않는 것이 좋다. 특히 노령견의 한쪽 코 분비물은 조기 검사를 권장한다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 건강 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Merck Veterinary Manual — Nasal Discharge in Dogs",
      "대한수의사회 내과 임상 가이드라인",
    ]),
    disclaimer: "이 글은 정보 제공을 목적으로 하며 수의사 진료를 대체하지 않습니다.",
    status: "published",
    publishedAt: "2026-08-19T11:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-434",
    slug: "petloss-guilt-coping-guide",
    type: "blog",
    category: 6,
    title: "펫로스 죄책감 — '내 잘못이 아니다'라고 스스로에게 말해줘야 하는 이유",
    subtitle: "죄책감의 종류, 의료 결정에 대한 후회, 자기 용서의 과정",
    metaTitle: "펫로스 죄책감 다루기 — 자기 용서와 애도 가이드 | 펫지기",
    metaDescription: "반려동물 잃은 후 찾아오는 죄책감을 다루는 방법. 결정에 대한 후회, '충분히 못 해줬다'는 생각, 자기 용서의 과정을 정리했습니다.",
    body: `<p>"더 일찍 병원에 갔어야 했는데." "안락사 결정이 너무 빨랐던 건 아닐까." "내가 너무 오래 고통받게 한 건 아닐까." 이 생각들은 펫로스 이후 거의 모든 보호자에게 찾아온다.</p>

<h2>죄책감의 종류</h2>
<ul>
<li><strong>의료 결정 후회</strong>: 더 빨리 갔어야 했는데, 더 많은 치료를 했어야 했는데</li>
<li><strong>안락사 결정</strong>: 너무 이른 건지, 너무 늦은 건지</li>
<li><strong>일상적 방치 후회</strong>: 바빠서 못 놀아줬는데, 마지막 날 더 있어줄 걸</li>
<li><strong>분노 죄책감</strong>: 가끔 힘들었던 순간을 떠올리며 자책</li>
</ul>

<h2>당신이 알아야 할 것</h2>
<p>그 결정들은 당신이 가진 정보와 자원으로 할 수 있는 최선이었다. 나중에 더 많은 것을 알게 된 후의 눈으로 과거를 보면 항상 아쉬운 점이 보인다. 그러나 그 순간의 당신은 최선을 다했다.</p>

<h2>자기 용서의 과정</h2>
<ol>
<li>죄책감을 느끼는 것 자체를 인정하기 (무시하지 않기)</li>
<li>그 감정 뒤에 있는 사랑을 보기</li>
<li>자신에게 친구에게 하듯 말하기 ("그때 넌 최선을 다했어")</li>
<li>전문가 상담 — 죄책감이 오래 지속되거나 일상을 방해한다면</li>
</ol>

<h2>마지막으로</h2>
<p>당신이 그 동물을 사랑했기 때문에 이렇게 아프다. 그 사랑이 완벽하지 않았더라도 — 어떤 사랑도 완벽하지 않다 — 그것은 진짜 사랑이었다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 생애말 돌봄 정보 큐레이터",
    ymyl: true,
    sources: JSON.stringify([
      "Worden, J.W. — Grief Counseling and Grief Therapy",
      "Wallace Sife, Ph.D. — The Loss of a Pet",
    ]),
    disclaimer: "심리적 어려움이 지속된다면 전문 심리 상담사에게 도움을 요청하세요.",
    status: "published",
    publishedAt: "2026-08-20T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },

  {
    id: "blog-435",
    slug: "cat-toy-selection-guide",
    type: "blog",
    category: 5,
    title: "고양이 장난감 선택 가이드 — 개체별 사냥 본능에 맞는 장난감 찾기",
    subtitle: "사냥 유형별 장난감 매칭, 로테이션 원칙, 흥미를 잃은 장난감 다시 활성화하기",
    metaTitle: "고양이 장난감 선택 — 사냥 유형별 매칭 가이드 | 펫지기",
    metaDescription: "고양이 장난감을 개체 성향에 맞게 선택하는 방법. 사냥 유형별 장난감 매칭, 로테이션 원칙, 흥미를 잃은 장난감을 다시 활성화하는 방법을 정리했습니다.",
    body: `<p>고양이마다 좋아하는 사냥 대상이 다르다. 새를 쫓는 것을 좋아하는지, 땅 위의 작은 생물을 쫓는지, 달리는 것을 좋아하는지에 따라 맞는 장난감이 다르다.</p>

<h2>사냥 유형별 장난감 매칭</h2>
<ul>
<li><strong>공중 새 사냥 유형</strong>: 낚싯대 장난감 (허공에서 불규칙하게 움직이는 것)</li>
<li><strong>땅 위 설치류 사냥 유형</strong>: 전동 마우스·작은 공·페더 와이어</li>
<li><strong>달리기·추격 유형</strong>: 전동 레이스 트랙·레이저 포인터</li>
<li><strong>탐색·후각 유형</strong>: 캣닙 쥐·퍼즐 장난감</li>
</ul>

<h2>좋은 놀이의 조건</h2>
<p>장난감이 살아있는 것처럼 움직여야 한다. 쥐처럼 — 멈추고, 느리게 움직이다가, 갑자기 튀어오르는 불규칙한 움직임이 본능을 자극한다. 일직선으로 계속 달리는 것보다 불규칙하게 멈추는 것이 더 효과적이다.</p>

<h2>장난감 로테이션</h2>
<p>같은 장난감을 매일 주면 신선함이 떨어진다. 5~6가지를 2~3일마다 교체한다. 한동안 치워뒀다가 다시 꺼내주면 새로운 것처럼 반응하는 경우가 많다.</p>

<div class="callout-cat">
<strong>놀이 완결의 중요성</strong><br>
마지막에 항상 장난감을 천천히 멈춰 '잡은 것처럼' 느끼게 한다.<br>
완결 없는 놀이는 좌절감을 남긴다.<br>
놀이 후 간식을 주면 완결감 강화.
</div>

<h2>마지막으로</h2>
<p>고양이가 장난감에 반응하지 않는다면 장난감이 나쁜 것이 아니라 움직임이 맞지 않는 것일 수 있다. 여러 방식으로 움직여보고, 개체의 반응을 관찰하며 맞는 스타일을 찾아가는 것이 핵심이다.</p>`,
    authorName: "펫지기 에디터",
    authorCredential: "반려동물 행동 정보 큐레이터",
    ymyl: false,
    sources: JSON.stringify([
      "Ellis, S.L.H. — Play and Predatory Behaviour in Cats",
      "한국고양이보호협회 장난감 선택 가이드",
    ]),
    disclaimer: null,
    status: "published",
    publishedAt: "2026-08-20T11:00:00.000Z",
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
  console.log("블로그 포스트 62차 시딩 완료! (blog-431 ~ blog-435)");
  process.exit(0);
}

seed().catch((e) => { console.error(e); process.exit(1); });
