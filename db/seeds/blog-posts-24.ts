import { db } from "../client";
import { contents } from "../schema";
import type { NewContent } from "../schema";

const NOW = new Date().toISOString();

const POSTS: NewContent[] = [
  {
    id: "blog-231",
    slug: "dog-dental-scaling-guide",
    type: "blog",
    category: 3,
    title: "강아지 치과 스케일링 — 검사와 마취 상담 포인트",
    metaTitle: "강아지 치과 스케일링 | 검사와 마취 상담 | 펫지기",
    metaDescription: "강아지 치과 스케일링이 필요한 이유와 마취 전 평가, 구강 방사선 검사, 시술 후 확인할 내용을 정리합니다.",
    body: `<h2>강아지에게 스케일링이 필요한 이유</h2>
<p>치태와 치석이 쌓이고 잇몸 아래까지 질환이 진행되면 통증과 치아 지지 조직 손상이 생길 수 있습니다. 이미 굳은 치석과 잇몸 아래 병변은 가정 양치만으로 평가하거나 제거할 수 없습니다.</p>
<p>AAHA 치과 진료 지침은 눈으로 보이는 치석만 긁는 처치가 아니라, 마취 상태의 구강 검사·치주 탐침·치과 방사선 촬영과 필요한 치료를 하나의 과정으로 설명합니다. 시술 필요성과 범위는 진찰 결과에 따라 달라집니다.</p>

<h2>스케일링 주기 — 언제 해야 할까?</h2>
<p>모든 개에게 적용되는 고정 스케일링 주기는 없습니다. 견종과 나이만으로 정하지 말고, 구취·잇몸 출혈·통증·치아 흔들림 같은 증상, 구강 검사 결과, 가정 관리 상태와 기존 질환을 함께 평가합니다. 정기 검진에서 구강 상태를 확인하고 다음 재검 시점을 수의사와 정하세요.</p>

<h2>전신 마취 — 안전한가?</h2>
<p>완전한 치과 평가와 잇몸 아래 처치에는 기도 보호와 움직임 통제가 가능한 전신 마취가 사용됩니다. AAHA는 무마취 스케일링이 잇몸 아래 질환을 제대로 평가·치료하지 못하는 미용적 처치에 그칠 수 있다고 설명합니다. 마취 위험은 나이 하나가 아니라 현재 건강 상태와 검사 결과를 바탕으로 개별 평가합니다.</p>
<h3>마취 전 필수 검사</h3>
<ul>
  <li>기존 질환, 복용 약과 과거 마취 경험 전달</li>
  <li>수의사가 정한 신체검사·혈액검사와 추가 검사 범위 확인</li>
  <li>마취 중 기도 확보, 활력징후 감시와 통증 관리 계획 확인</li>
  <li>금식·급수 제한은 병원이 안내한 시간 준수</li>
</ul>

<h2>비용을 확인할 때</h2>
<p>비용은 마취 전 검사, 치과 방사선 촬영, 치주 치료와 발치 여부에 따라 달라지므로 고정 범위로 안내하기 어렵습니다. 예상 항목과 추가 처치가 발견됐을 때의 연락 절차를 병원에 확인하세요. 보험 보장 여부는 가입한 상품의 현재 약관과 면책 조건을 직접 확인해야 합니다.</p>

<h2>시술 후 관리</h2>
<ul>
  <li>급수·급여 재개 시점과 처방약은 퇴원 지시를 따름</li>
  <li>발치 등 처치가 있었다면 식이와 양치 재개 시점을 별도로 확인</li>
  <li>출혈, 심한 통증, 반복 구토, 호흡 이상이나 회복 지연은 즉시 병원에 알림</li>
  <li>장기 가정 관리는 수의사가 허용한 시점부터 양치와 검증된 구강 관리 제품을 사용</li>
</ul>

<div style="background:#f8f9fa;border-left:4px solid #6c757d;padding:14px;margin:16px 0;font-size:0.95em;">
  <strong>참고 자료</strong><br>
  · AAHA — 2019 Dental Care Guidelines for Dogs and Cats<br>
  · AAHA — Dental procedures: Considerations<br>
  · AAHA — Unconscious oral evaluation
</div>

<h3>스케일링 없이 치석을 줄일 수 있나요?</h3>
<p>완전히 없앨 수는 없지만 속도를 늦출 수 있습니다. 매일 양치, 덴탈껌·치아 장난감 활용, 치아 건강 사료 급여가 도움됩니다. 그러나 이미 굳은 치석은 반드시 스케일링으로 제거해야 합니다.</p>

<h3>스케일링 후 얼마나 자주 양치해야 하나요?</h3>
<p>AAHA는 규칙적인 가정 구강 관리를 권장하지만, 통증이나 시술 부위가 있을 때는 시작 시점과 방법이 달라질 수 있습니다. 담당 수의사의 퇴원 지시를 우선하고 <a href="/guide/dog-dental-care-guide">강아지 양치 방법 가이드</a>를 참고하세요.</p>`,
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: true,
    sources: JSON.stringify([
      "https://www.aaha.org/resources/2019-aaha-dental-care-guidelines-for-dogs-and-cats/ — AAHA, 2019 Dental Care Guidelines for Dogs and Cats",
      "https://www.aaha.org/resources/2019-aaha-dental-care-guidelines-for-dogs-and-cats/considerations/ — AAHA, Dental procedures: Considerations",
      "https://www.aaha.org/resources/2019-aaha-dental-care-guidelines-for-dogs-and-cats/unconscious/ — AAHA, Unconscious oral evaluation",
    ]),
    disclaimer: "이 글은 일반적인 치과 진료 정보를 제공하며 진단·마취 평가·치료 계획을 대신하지 않습니다. 검사와 처치 범위는 담당 수의사와 결정하세요.",
    publishedAt: "2026-07-02T17:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "blog-232",
    slug: "cat-anal-gland-guide",
    type: "blog",
    category: 3,
    title: "고양이 항문낭 완전 가이드 — 강아지와 다른 케어 포인트",
    metaTitle: "고양이 항문낭 가이드 | 증상·관리·병원 방문 기준 | 펫지기",
    metaDescription: "고양이 항문낭 문제는 강아지보다 드물지만 발생 시 심각해질 수 있습니다. 증상, 관리법, 병원 방문 기준을 알아보세요.",
    body: `<h2>고양이 항문낭이란</h2>
<p>항문낭(항문샘)은 항문 양쪽에 있는 작은 주머니입니다. Merck Veterinary Manual은 항문낭 질환에 막힘, 염증, 농양과 종양이 포함되며 고양이에서는 개보다 드물다고 설명합니다. 증상만으로 원인을 구분하기 어려우므로 반복되는 불편감이나 부종은 진찰이 필요합니다.</p>

<h2>증상 — 이런 경우 의심하세요</h2>
<ul>
  <li>항문을 바닥에 끌거나 핥는 행동 (스쿠팅)</li>
  <li>항문 주변 부어오름 또는 발적</li>
  <li>앉을 때 불편해하거나 꼬리를 내림</li>
  <li>항문 주변의 물고기 비린내와 다른 강한 냄새</li>
  <li>식욕 감소, 무기력 (감염·농양 시)</li>
</ul>
<p>증상이 없을 때 보호자가 정기적으로 짤 필요는 없습니다. 통증, 부종, 피나 고름, 배변 곤란 또는 상처가 보이면 기다리지 말고 병원에 연락하세요.</p>

<h2>고양이 항문낭 문제의 원인</h2>
<ul>
  <li>분비물이 배출되지 않아 생기는 막힘</li>
  <li>세균 증식에 따른 감염과 염증</li>
  <li>막힌 관 안에서 진행되는 농양과 피부 파열</li>
  <li>종괴 등 다른 질환 — 진찰과 추가 검사가 필요할 수 있음</li>
</ul>

<h2>치료 — 수의사가 해결합니다</h2>
<p>고양이의 항문낭 표현(짜기)은 강아지보다 민감한 절차입니다. 집에서 시도하면 고양이가 심하게 저항하고 부상 위험이 있으므로 반드시 수의사에게 맡기세요.</p>
<ul>
  <li><strong>단순 막힘</strong>: 외부 압박으로 배출, 항문낭 세척</li>
  <li><strong>감염</strong>: 검사 결과에 따른 세척과 약물 치료</li>
  <li><strong>농양(파열)</strong>: 배농·세척·항생제·경우에 따라 수술</li>
  <li><strong>재발 반복</strong>: 항문낭 제거술 고려 (근처 신경 손상 주의)</li>
</ul>

<h2>예방 — 평소 관리</h2>
<ul>
  <li>항문 주변을 반복해서 핥거나 바닥에 끄는 행동 관찰</li>
  <li>체중과 변 상태를 기록하고 변화가 지속되면 수의사에게 전달</li>
  <li>섬유 보충이나 식이 변경은 다른 질환을 고려해 수의사와 상의</li>
  <li>정기 건강 검진 시 항문 주변 확인 요청</li>
</ul>

<div style="background:#f8f9fa;border-left:4px solid #6c757d;padding:14px;margin:16px 0;font-size:0.95em;">
  <strong>참고 자료</strong><br>
  · Merck Veterinary Manual — Anal Sac Disease in Dogs and Cats
</div>

<h3>고양이 항문낭을 집에서 짜도 되나요?</h3>
<p>권장하지 않습니다. 고양이는 강아지에 비해 저항이 심하고 항문낭 위치가 더 깊어 집에서 잘못 시도하면 손상을 일으킬 수 있습니다. 수의사 진료를 통해 안전하게 처리하세요.</p>

<h3>고양이가 항문을 자꾸 핥으면 무조건 항문낭 문제인가요?</h3>
<p>항문낭 외에도 피부 알레르기, 기생충(촌충), 변비가 원인일 수 있습니다. 다른 증상을 함께 살펴보고 지속되면 수의사 진단을 받으세요.</p>

<p>고양이 전반적인 건강 관리는 <a href="/guide/cat-health-guide">고양이 건강 관리 가이드</a>를 참고하세요. 강아지 항문낭 관리와 비교하고 싶다면 <a href="/blog/dog-anal-gland-express-guide">강아지 항문낭 짜기 완전 가이드</a>도 함께 확인하세요.</p>`,
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: true,
    sources: JSON.stringify([
      "https://www.merckvetmanual.com/digestive-system/diseases-of-the-rectum-and-anus/anal-sac-disease-in-dogs-and-cats — Merck Veterinary Manual, Anal Sac Disease in Dogs and Cats (reviewed 2025)",
    ]),
    disclaimer: "이 글은 일반적인 질환 정보를 제공하며 진단이나 항문낭 처치를 대신하지 않습니다. 통증·부종·출혈·고름·상처가 있으면 수의사에게 진료받으세요.",
    publishedAt: "2026-07-02T22:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "blog-233",
    slug: "dog-anal-gland-express-guide",
    type: "blog",
    category: 3,
    title: "강아지 항문낭 문제 — 증상과 진료가 필요한 경우",
    metaTitle: "강아지 항문낭 문제 | 증상과 병원 방문 기준 | 펫지기",
    metaDescription: "강아지 항문낭 막힘·감염·농양에서 보일 수 있는 증상과 집에서 무리하게 짜지 말아야 할 상황을 안내합니다.",
    body: `<h2>항문낭 표현이 필요한 이유</h2>
<p>항문낭 질환에는 막힘, 염증, 농양과 종양 등이 포함됩니다. 바닥에 항문을 끄는 행동이나 핥기는 단서가 될 수 있지만 기생충·피부 질환 등 다른 원인도 있어 행동만으로 항문낭을 짜서는 안 됩니다. Merck Veterinary Manual은 진찰을 통해 상태를 구분한 뒤 수동 배출, 세척, 약물 또는 수술을 선택한다고 설명합니다.</p>

<h2>집에서 무리하게 짜지 마세요</h2>
<p>증상이 없는 개에게 고정 주기로 항문낭을 표현해야 한다는 보편 기준은 확인되지 않습니다. 특히 통증, 단단한 부종, 피·고름, 피부 구멍이 있거나 분비물이 나오지 않는 상태에서 압박하면 손상과 통증을 키울 수 있습니다. 첫 증상, 재발 또는 이상 분비물이 있으면 수의사나 숙련된 동물병원 인력에게 평가받으세요.</p>

<h2>병원에 가야 할 경우</h2>
<ul>
  <li>항문 주변이 붓거나 빨갛게 변한 경우</li>
  <li>항문 옆에 구멍(파열)이 생긴 경우</li>
  <li>피 섞인 분비물 또는 고름</li>
  <li>강아지가 극심하게 통증을 호소하는 경우</li>
  <li>배변을 힘들어하거나 분비물이 나오지 않는 경우</li>
</ul>

<h3>항문낭을 자주 짜야 하면 문제가 있는 건가요?</h3>
<p>반복적으로 필요하다면 막힘이 되풀이되는 원인과 다른 항문 주변 질환을 확인해야 합니다. 개별 관리 주기는 진찰 결과를 바탕으로 정하고 임의로 간격을 줄이지 마세요.</p>

<h3>항문낭 제거 수술은 어떤 경우에 하나요?</h3>
<p>반복 감염, 농양 재발, 항문낭 종양이 있을 때 수술을 고려합니다. 수술 후 변실금 위험이 있으므로 전문 수의사와 충분히 상담하세요. <a href="/guide/dog-health-checkup">강아지 정기 건강검진 가이드</a>에서 항문낭 검진을 포함하는 방법을 확인하세요.</p>

<div style="background:#f8f9fa;border-left:4px solid #6c757d;padding:14px;margin:16px 0;font-size:0.95em;">
  <strong>참고 자료</strong><br>
  · Merck Veterinary Manual — Anal Sac Disease in Dogs and Cats
</div>`,
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: true,
    sources: JSON.stringify([
      "https://www.merckvetmanual.com/digestive-system/diseases-of-the-rectum-and-anus/anal-sac-disease-in-dogs-and-cats — Merck Veterinary Manual, Anal Sac Disease in Dogs and Cats (reviewed 2025)",
    ]),
    disclaimer: "이 글은 일반적인 질환 정보를 제공하며 자가 처치 지시가 아닙니다. 항문 주변 통증·부종·출혈·고름·상처가 있으면 직접 짜지 말고 진료받으세요.",
    publishedAt: "2026-07-03T03:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "blog-234",
    slug: "pet-human-allergy-guide",
    type: "blog",
    category: 3,
    title: "사람 반려동물 알레르기 — 증상·진단·함께 사는 완전 가이드",
    metaTitle: "반려동물 알레르기 있어도 함께 사는 법 | 증상·관리 | 펫지기",
    metaDescription: "반려동물 알레르기 원인, 증상, 진단 방법과 함께 살면서 증상을 줄이는 실용적인 관리법을 정리했습니다.",
    body: `<h2>반려동물 알레르기의 진짜 원인</h2>
<p>반려동물 알레르기는 털 길이 자체보다 비듬·침·소변 등에 포함된 단백질과 관련됩니다. 털은 꽃가루나 곰팡이 같은 다른 알레르겐을 옮길 수도 있습니다.</p>
<ul>
  <li><strong>고양이</strong>: Fel d 1 (피지샘·침·피부에서 분비), 고양이 그루밍 시 털에 묻어 실내 전파</li>
  <li><strong>강아지</strong>: Can f 1 (피부 각질·침·소변에 포함), 견종마다 분비량 차이 있음</li>
</ul>
<p>털이 짧거나 덜 빠지는 품종도 알레르겐을 만들 수 있으며, 과학적으로 완전히 저알레르기라고 보장되는 개·고양이 품종은 없습니다.</p>

<h2>주요 증상</h2>
<ul>
  <li>눈 가려움·충혈·눈물</li>
  <li>재채기·콧물·코막힘</li>
  <li>피부 두드러기·발적 (반려동물이 핥거나 닿은 부위)</li>
  <li>심한 경우: 천식 발작, 호흡 곤란</li>
</ul>
<p>노출과 증상 변화는 진단에 중요한 병력이지만 그것만으로 원인을 확정할 수 없습니다. 쌕쌕거림, 호흡 곤란이나 흉부 압박감이 있으면 신속한 의료 평가를 받습니다.</p>

<h2>진단 방법</h2>
<ul>
  <li><strong>병력과 진찰</strong>: 노출 장소, 증상 시점과 천식 여부를 함께 평가</li>
  <li><strong>피부 또는 혈액 검사</strong>: 알레르기 전문의가 병력에 맞춰 필요한 검사를 선택</li>
</ul>
<p>자가 진단보다 정확한 검사 후 알레르겐을 특정해야 관리가 가능합니다.</p>

<h2>함께 살면서 증상 줄이는 법</h2>
<h3>환경 관리</h3>
<ul>
  <li>침실에 HEPA 공기청정기를 사용하고 필터 교체 지침 준수</li>
  <li>반려동물 침실 출입 금지 — 수면 중 노출 최소화가 핵심</li>
  <li>카펫·패브릭 소파 최소화 → 알레르겐 축적 표면 제거</li>
  <li>알레르기가 없는 사람이 HEPA 또는 이중 필터 진공청소기를 사용하고 젖은 천으로 먼지 제거</li>
</ul>
<h3>반려동물 관리</h3>
<ul>
  <li>목욕 빈도는 사람의 노출 관리와 반려동물 피부 건강을 함께 고려해 수의사와 상의</li>
  <li>빗질은 야외 또는 환기 중에, 알레르기 없는 가족이 담당</li>
  <li>알레르겐 저감 제품은 보조 수단으로만 보고 사람의 증상 개선을 보장한다고 여기지 않기</li>
</ul>
<h3>약물 치료</h3>
<ul>
  <li>일반의약품도 연령, 임신, 기저질환과 다른 약에 따라 주의점이 있으므로 의료진·약사와 확인</li>
  <li>알레르겐 면역요법은 알레르기 전문의가 검사와 증상에 따라 적합성을 판단</li>
</ul>

<h3>알레르기가 있으면 반려동물을 키울 수 없나요?</h3>
<p>증상과 천식 위험, 생활 환경에 따라 선택이 달라집니다. 침실 출입 제한, 카펫 감소, HEPA 필터와 청소는 노출 저감에 도움이 될 수 있지만 특정 조합이 모든 사람의 증상을 일정 비율만큼 줄인다고 보장할 수는 없습니다. 알레르기 전문의와 개인화된 계획을 세웁니다.</p>

<h3>시간이 지나면 알레르기가 없어지나요?</h3>
<p>계속 노출하면 자연히 해결된다고 기대해서는 안 됩니다. 증상이 만성적으로 보이지 않을 수도 있으므로 검사와 의료진의 평가를 통해 노출 관리와 치료 계획을 정합니다.</p>

<div style="background:#f8f9fa;border-left:4px solid #6c757d;padding:14px;margin:16px 0;font-size:0.95em;">
  <strong>참고 자료</strong><br>
  · NIEHS — 반려동물 알레르겐의 특성과 노출 저감 방법<br>
  · AAAAI — 반려동물 알레르기 증상·진단·관리와 저알레르기 품종 근거
</div>

<p>반려동물 알레르기 증상을 줄이는 환경 관리법에 대해 더 알고 싶다면 <a href="/guide/pet-allergy-management-guide">반려동물 알레르기 실내 환경 관리 가이드</a>를 참고하세요. 신생아와 반려동물 알레르기의 관계는 <a href="/blog/newborn-and-pet-guide">신생아와 반려동물 공존 가이드</a>에서 확인하실 수 있습니다.</p>`,
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: true,
    sources: JSON.stringify([
      "https://www.niehs.nih.gov/health/topics/agents/allergens/pets — National Institute of Environmental Health Sciences, Pet Allergens",
      "https://www.aaaai.org/conditions-treatments/allergies/pet-allergy — American Academy of Allergy, Asthma & Immunology, Pet Allergy",
    ]),
    disclaimer: "이 글은 일반적인 건강 정보이며 진단이나 치료를 대신하지 않습니다. 호흡 곤란·쌕쌕거림·흉부 압박감이 있거나 천식이 악화되면 즉시 의료진의 평가를 받으세요.",
    publishedAt: "2026-07-03T08:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "blog-235",
    slug: "cat-outdoor-safety-guide",
    type: "blog",
    category: 5,
    title: "고양이 외출·산책 안전 가이드 — 하네스 적응부터 위험 요소까지",
    metaTitle: "고양이 외출·산책 안전 가이드 | 하네스·위험·적응법 | 펫지기",
    metaDescription: "고양이 외출 산책을 위한 하네스 선택, 적응 훈련, 외출 중 위험 요소와 안전한 야외 경험 제공 방법을 안내합니다.",
    body: `<h2>고양이도 산책이 필요할까?</h2>
<p>고양이는 본래 영역 동물로 실내 생활에 적응하지만, 자극이 부족하면 무료함과 스트레스를 느낍니다. ASPCA 행동 연구에 따르면 충분한 환경 자극을 받지 못하는 실내 고양이는 과잉 그루밍, 과식, 공격성 등 스트레스 관련 행동을 보일 가능성이 높습니다. AVMA(미국수의사협회)는 고양이에게 통제된 야외 경험을 제공하는 것이 정신 건강과 근육 유지에 긍정적 효과가 있다고 인정하되, 하네스 미착용 자유 외출은 교통사고·감염병·기생충 위험이 있어 권장하지 않습니다. 단, 모든 고양이가 외출을 좋아하지는 않으며 억지로 강요해선 안 됩니다.</p>

<h2>외출 전 필수 준비사항</h2>
<ul>
  <li><strong>동물등록</strong>: 마이크로칩 또는 외장 인식표 — 미아 방지의 기본</li>
  <li><strong>중성화·예방접종</strong>: 외출 전 완료 필수</li>
  <li><strong>내부·외부 기생충 예방</strong>: 벼룩·진드기 예방약 적용</li>
  <li><strong>하네스(H형 또는 조끼형)</strong>: 목줄은 고양이에게 위험 — 반드시 하네스 사용</li>
</ul>

<h2>하네스 적응 훈련 — 단계별 방법</h2>
<ol>
  <li><strong>1단계 (1~3일)</strong>: 하네스를 고양이 옆에 두고 냄새 맡게 함. 간식으로 긍정적 연결</li>
  <li><strong>2단계 (4~7일)</strong>: 하네스를 몸에 댔다가 바로 제거. 착용 = 간식 패턴 강화</li>
  <li><strong>3단계 (1~2주)</strong>: 실내에서 하네스 착용 5~10분. 움직임 관찰</li>
  <li><strong>4단계 (2~3주)</strong>: 줄 연결 후 실내 산책. 고양이가 주도하게</li>
  <li><strong>5단계</strong>: 현관 앞 또는 베란다에서 짧은 외부 경험 시작</li>
</ol>
<p>적응 속도는 개체마다 다릅니다. 서두르지 마세요.</p>

<h2>외출 중 위험 요소</h2>
<ul>
  <li><strong>탈출·도주</strong>: 갑작스러운 소리에 놀라 줄 빠짐 — 하네스 조임 확인 필수</li>
  <li><strong>독성 식물·물질</strong>: 풀 뜯어먹기, 농약 처리된 잔디 접촉</li>
  <li><strong>다른 동물</strong>: 개, 길고양이와의 충돌</li>
  <li><strong>교통사고</strong>: 도로 근처는 절대 금지</li>
  <li><strong>기생충</strong>: 진드기가 풀밭에서 붙을 수 있음 — 귀가 후 확인</li>
</ul>

<h2>야외 케이지(캣테리어) 대안</h2>
<p>직접 산책이 어렵다면 베란다나 마당에 야외 케이지를 설치하는 것이 안전한 대안입니다. 그물망·패널 형태의 캣테리어는 고양이가 바깥 공기와 소리를 즐기면서 안전하게 지낼 수 있습니다.</p>

<h3>고양이가 하네스를 거부하면 어떻게 해야 하나요?</h3>
<p>억지로 입히지 마세요. 적응 훈련을 2~4주 더 천천히 진행하거나, 야외 경험 자체를 창문·베란다 망 설치로 대체하세요. 모든 고양이가 산책에 적합한 것은 아닙니다.</p>

<h3>외출을 시작하기 좋은 나이는?</h3>
<p>어릴수록 적응이 쉽습니다. 예방접종이 완료된 4~6개월령부터 시작하면 성묘보다 빠르게 익숙해집니다. 성묘도 충분히 가능하지만 더 긴 적응 기간이 필요합니다. <a href="/guide/cat-indoor-vs-outdoor">실내묘 vs 실외묘 가이드</a>도 참고하세요.</p>

<div style="background:#f8f9fa;border-left:4px solid #6c757d;padding:14px;margin:16px 0;font-size:0.95em;">
  <strong>참고 자료</strong><br>
  · ASPCA(미국동물학대방지협회) — 실내 고양이 환경 자극 부족과 스트레스 행동 연구<br>
  · AVMA(미국수의사협회) — 고양이 야외 활동 위험성 및 하네스 산책 권고 사항<br>
  · WSAVA(세계소동물수의사협회) — 고양이 환경 풍부화 및 실외 접근 관련 가이드라인<br>
  · AKC(미국켄넬클럽) — 하네스 적응 훈련 단계별 방법 참고 자료
</div>`,
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-07-03T13:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "blog-236",
    slug: "dog-agility-beginner-guide",
    type: "blog",
    category: 5,
    title: "강아지 어질리티 입문 — 시작 방법·준비물·기초 장애물 훈련",
    metaTitle: "강아지 어질리티 입문 가이드 | 준비물·훈련법 | 펫지기",
    metaDescription: "강아지 어질리티의 기본 개념, 시작 나이, 가정에서 할 수 있는 기초 장애물 훈련법과 준비물을 안내합니다.",
    body: `<h2>어질리티란 무엇인가</h2>
<p>어질리티(Agility)는 강아지가 핸들러의 신호에 따라 허들·터널·시소·위빙폴·A-프레임 등 다양한 장애물을 통과하는 스포츠입니다. AKC(미국켄넬클럽)는 어질리티를 신체 운동과 두뇌 자극을 동시에 제공하는 대표적인 반려견 스포츠로 공식 인정하며, AKC 통계에 따르면 어질리티 참가 견종 중 보더 콜리·오스트레일리안 셰퍼드 등 목양견 그룹이 가장 높은 성적을 기록합니다. AVMA(미국수의사협회) 역시 어질리티가 반려견의 신체 건강과 보호자-반려견 유대감 강화에 효과적이라는 연구 결과를 지지합니다.</p>

<h2>어떤 강아지에게 적합할까?</h2>
<ul>
  <li><strong>적합한 나이</strong>: 성장판이 닫히는 생후 12~18개월 이후 권장. 퍼피는 낮은 강도의 기초 훈련만</li>
  <li><strong>적합한 견종</strong>: 보더 콜리, 셔틀랜드 쉽독, 오스트레일리안 셰퍼드, 래브라도 리트리버 등 활동적인 견종에 특히 효과적. 단두종(불독·퍼그)은 호흡 문제로 주의</li>
  <li><strong>건강 조건</strong>: 관절·심폐 이상이 없어야 함. 시작 전 수의사 확인 권장</li>
</ul>

<h2>집에서 시작하는 기초 훈련</h2>
<h3>1. 허들 (낮은 막대 뛰어넘기)</h3>
<p>초기에는 막대를 바닥에 평평히 놓고 밟지 않고 지나가게 합니다. 성공하면 조금씩 높이를 올립니다. 소형견은 30cm, 중형견은 40cm가 안전한 시작 높이입니다.</p>
<h3>2. 터널 통과</h3>
<p>처음에는 짧고 직선인 터널로 시작합니다. 한쪽에서 간식을 보이며 유도하고, 성공 후 점점 터널을 구부립니다. 강아지용 천 터널이 좋습니다.</p>
<h3>3. 원 통과 (후프)</h3>
<p>큰 훌라후프를 바닥에 세우고 통과를 유도합니다. 처음에는 후프를 바닥에 눕혀 밟고 지나가게 한 후 점차 세웁니다.</p>

<h2>준비물 리스트</h2>
<ul>
  <li>조정 가능한 허들 (1~3개)</li>
  <li>강아지용 터널 (1~2m)</li>
  <li>고가치 간식 (훈련용 소시지, 치즈 등)</li>
  <li>타깃 스틱 또는 클리커</li>
  <li>미끄럼 방지 매트 (실내 훈련 시)</li>
</ul>

<h2>훈련 시 주의사항</h2>
<ul>
  <li>하루 10~15분, 짧고 즐거운 세션 유지</li>
  <li>강아지가 지치거나 집중력을 잃으면 즉시 종료</li>
  <li>실패해도 절대 혼내지 않기 — 긍정 강화만 사용</li>
  <li>더운 날 야외 훈련 자제 — 열사병 주의</li>
</ul>

<h3>어질리티 클래스는 어디서 찾을 수 있나요?</h3>
<p>한국견협회(KKF), 반려견 훈련소, 도그스포츠 클럽 등에서 어질리티 클래스를 운영합니다. 입문반은 기초 복종 훈련 완료 후 참여하는 것이 좋습니다. <a href="/guide/dog-basic-training-guide">강아지 기초 훈련 가이드</a>를 먼저 확인하세요.</p>

<h3>어질리티를 하면 강아지 체형에 문제가 생기지 않나요?</h3>
<p>안전한 높이와 속도로 진행하면 오히려 근육 발달과 유연성에 좋습니다. 무리한 높이의 허들과 과도한 반복은 관절에 무리를 줄 수 있으므로 점진적으로 강도를 높이세요.</p>

<div style="background:#f8f9fa;border-left:4px solid #6c757d;padding:14px;margin:16px 0;font-size:0.95em;">
  <strong>참고 자료</strong><br>
  · AKC(미국켄넬클럽) — 어질리티 공식 규정 및 견종별 참가 통계<br>
  · AVMA(미국수의사협회) — 반려견 스포츠 활동과 건강 효과 연구<br>
  · AAHA(미국동물병원협회) — 반려견 스포츠 참가 전 수의사 확인 권고 사항<br>
  · Journal of Veterinary Behavior — 어질리티 훈련이 보호자-반려견 유대에 미치는 영향 연구
</div>`,
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-07-03T18:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "blog-237",
    slug: "cat-outdoor-enclosure-guide",
    type: "blog",
    category: 5,
    title: "고양이 야외 케이지·캣테리어 완전 가이드 — 설치부터 활용까지",
    metaTitle: "고양이 캣테리어 설치 가이드 | 야외 케이지 선택법 | 펫지기",
    metaDescription: "실내 고양이를 위한 야외 케이지(캣테리어) 종류, 설치 방법, 안전 기준과 활용법을 안내합니다.",
    body: `<h2>캣테리어란 무엇인가</h2>
<p>캣테리어(Catio, Cat + Patio)는 고양이가 안전하게 야외 공기를 즐길 수 있는 울타리 구조물입니다. 베란다, 마당, 창문 옆에 설치해 탈출 위험 없이 자연 환경을 경험할 수 있게 합니다. ASPCA(미국동물학대방지협회)는 실외 자유 접근보다 캣테리어(통제된 야외 공간)가 교통사고·감염병·포식자로 인한 사망 위험을 크게 낮춘다고 권장합니다. AVMA(미국수의사협회) 역시 실내 고양이의 평균 수명(10~15년)이 실외 자유 접근 고양이(2~5년)보다 유의미하게 길다는 데이터를 바탕으로 안전한 야외 접근 수단으로 캣테리어를 지지합니다.</p>

<h2>캣테리어의 종류</h2>
<ul>
  <li><strong>창문 부착형</strong>: 창문 바깥으로 박스형 그물 구조물 설치. 소형·저비용. 환기 가능</li>
  <li><strong>베란다 변환형</strong>: 베란다 전체를 그물망으로 막아 고양이 전용 공간으로. 중간 규모</li>
  <li><strong>마당 독립형</strong>: 금속 패널·그물망으로 구성된 대형 울타리. 최대 활동 공간</li>
  <li><strong>이동형 텐트</strong>: 접이식 구조물. 캠핑·야외에서 임시 사용</li>
</ul>

<h2>설치 시 핵심 안전 기준</h2>
<ul>
  <li>그물/패널 간격: <strong>5cm 이하</strong> — 머리가 끼지 않아야 함</li>
  <li>지붕 필수 — 고양이는 수직 점프로 탈출 가능</li>
  <li>날카로운 금속 모서리 없도록 마감</li>
  <li>조인트·볼트 정기 점검 (느슨해지면 탈출 위험)</li>
  <li>여름: 그늘막·물그릇 필수 / 겨울: 방풍 처리</li>
</ul>

<h2>설치 방법 (베란다형 예시)</h2>
<ol>
  <li>베란다 창틀·난간 측정 및 그물망 규격 산출</li>
  <li>천장·벽면·난간에 앵커 볼트 설치</li>
  <li>스테인리스 와이어 또는 폴리에틸렌 그물망 팽팽하게 고정</li>
  <li>출입문(지퍼형 그물 도어) 추가 — 사람 출입과 탈출 방지 동시에</li>
  <li>내부에 캣타워·해먹·화분(독성 없는 식물) 배치</li>
</ol>

<h2>캣테리어 내 환경 조성</h2>
<ul>
  <li>긁개·시스터브 배치 — 스크래칭 본능 충족</li>
  <li>고양이 허브(캣닢·캣그라스) 화분 — 냄새 자극</li>
  <li>새 모이대 설치 (외부) — 새 구경으로 시각 자극</li>
  <li>물그릇·간식 숨기기로 환경 풍부화</li>
</ul>

<h3>캣테리어 DIY와 구매 중 어느 것이 나을까요?</h3>
<p>DIY는 비용을 줄일 수 있지만 구조 안전성 확보가 핵심입니다. 시판 제품은 안전 기준이 검증되어 있고 설치가 간편합니다. 예산이 허락된다면 전문 시공 업체를 이용하는 것이 가장 안전합니다.</p>

<h3>고양이가 캣테리어를 무서워하면 어떻게 해야 하나요?</h3>
<p>처음에는 문을 열어두고 실내에서 자유롭게 들어가도록 합니다. 간식이나 장난감으로 유도하고, 강제로 집어넣지 마세요. 적응에 며칠~수 주가 걸릴 수 있습니다. <a href="/guide/indoor-cat-enrichment-guide">실내 고양이 환경 풍부화 가이드</a>도 함께 참고하세요.</p>

<div style="background:#f8f9fa;border-left:4px solid #6c757d;padding:14px;margin:16px 0;font-size:0.95em;">
  <strong>참고 자료</strong><br>
  · ASPCA(미국동물학대방지협회) — 실외 고양이 위험 요인 및 캣테리어 권장 자료<br>
  · AVMA(미국수의사협회) — 실내·실외 고양이 평균 수명 비교 데이터<br>
  · WSAVA(세계소동물수의사협회) — 고양이 환경 풍부화 가이드라인 (야외 접근 포함)<br>
  · VCA Animal Hospitals — 캣테리어 설치 안전 기준 및 활용 효과
</div>`,
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-07-03T23:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "blog-238",
    slug: "dog-senior-enrichment-guide",
    type: "blog",
    category: 5,
    title: "노령견 환경 풍부화 — 느린 속도에 맞는 두뇌·신체 활동 가이드",
    metaTitle: "노령견 환경 풍부화 완전 가이드 | 두뇌·신체 활동 | 펫지기",
    metaDescription: "7세 이상 노령견을 위한 환경 풍부화 활동, 두뇌 자극, 관절 부담 없는 운동, 감각 자극 방법을 안내합니다.",
    body: `<h2>노령견에게 환경 풍부화가 더욱 중요한 이유</h2>
<p>강아지는 나이가 들면서 활동량이 줄고 인지 기능이 서서히 감소합니다. AVMA(미국수의사협회) 자료에 따르면 10세 이상 반려견의 약 28%에서 개 인지 기능 장애(CCD) 증상이 확인되며, 이 비율은 15세 이상에서 70%로 급증합니다. AAHA(미국동물병원협회) 시니어 케어 가이드라인(2023)은 노령견에 대한 정기적인 인지 자극(노즈워크·트릭 훈련·퍼즐 피더)이 CCD 진행을 유의미하게 지연시킬 수 있다고 권장합니다. Journal of Veterinary Behavior 연구에서도 환경 풍부화를 지속한 노령견 그룹이 그렇지 않은 그룹보다 인지 기능 점수가 1년 후 높게 유지됐습니다.</p>

<h2>노령견에 맞는 두뇌 자극 활동</h2>
<ul>
  <li><strong>후각 탐색 (노즈워크)</strong>: 천에 간식 싸기, 낮은 레벨의 노즈워크 박스. 관절 부담 없이 집중력·후각 자극. <a href="/guide/dog-nosework-guide">강아지 노즈워크 가이드</a> 참고</li>
  <li><strong>느린 트릭 연습</strong>: 이미 아는 '앉아·엎드려' 복습. 새로운 트릭은 쉬운 것으로. 짧게(5분) 자주(하루 2회)</li>
  <li><strong>퍼즐 피더</strong>: 레벨 1의 쉬운 퍼즐로 식사 시간 활용. 관절에 부담되지 않는 바닥형 선택</li>
  <li><strong>냄새 탐색 산책</strong>: 거리보다 시간. 같은 장소를 천천히 냄새 맡으며 걷기</li>
</ul>

<h2>관절 부담 없는 신체 활동</h2>
<ul>
  <li><strong>수중 트레드밀·수영</strong>: 부력이 관절 하중 70~80% 감소. 근육 유지에 탁월</li>
  <li><strong>짧은 평지 산책</strong>: 하루 10~20분 × 2회. 경사 없는 코스</li>
  <li><strong>스트레칭</strong>: 수동적 사지 굴신 — 수의 물리치료사 지도 아래</li>
  <li><strong>실내 걷기</strong>: 비 오는 날 실내 복도 느린 걷기</li>
</ul>

<h2>감각 자극</h2>
<ul>
  <li><strong>청각</strong>: 클래식 음악, 자연 소리(새·빗소리) — 개에게 진정 효과</li>
  <li><strong>시각</strong>: 새 모이대 창문 설치, 느린 속도의 반려동물 전용 영상</li>
  <li><strong>촉각</strong>: 마사지 — 혈액 순환과 유대 강화. 귀 뒤, 등, 허리 근육 중심</li>
</ul>

<h2>피해야 할 활동</h2>
<ul>
  <li>높은 점프 (소파, 계단): 계단 경사로 설치로 대체</li>
  <li>격렬한 공 던지기: 관절 충격 과도</li>
  <li>긴 거리 조깅: 심폐·관절에 무리</li>
  <li>무리한 새 트릭 학습: 인지적 좌절감 야기</li>
</ul>

<h3>노령견이 갑자기 활동을 거부하면 어떻게 해야 하나요?</h3>
<p>통증이나 인지 기능 저하 신호일 수 있습니다. 관절염, 시력·청력 저하, 갑상선 이상 등을 감별하기 위해 수의사 진찰을 받으세요. <a href="/guide/senior-dog-care-guide">노령견 케어 가이드</a>도 참고하세요.</p>

<h3>노령견 환경 풍부화는 매일 해야 하나요?</h3>
<p>매일 짧게 하는 것이 가장 효과적입니다. 한 번에 긴 시간보다 5~10분씩 하루 2~3번이 인지 자극과 피로 방지 모두에 적합합니다.</p>

<div style="background:#f8f9fa;border-left:4px solid #6c757d;padding:14px;margin:16px 0;font-size:0.95em;">
  <strong>참고 자료</strong><br>
  · AVMA(미국수의사협회) — 노령견 개 인지 기능 장애(CCD) 유병률 통계<br>
  · AAHA(미국동물병원협회) 시니어 케어 가이드라인 (2023) — 노령견 환경 풍부화 권장 사항<br>
  · Journal of Veterinary Behavior — 환경 풍부화와 노령견 인지 기능 유지 연구<br>
  · VCA Animal Hospitals — 노령견 수중 재활 및 관절 부담 없는 운동 자료
</div>`,
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-07-04T04:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "blog-239",
    slug: "dog-clicker-training-guide",
    type: "blog",
    category: 5,
    title: "강아지 클리커 훈련 완전 가이드 — 원리·도구·단계별 실전 방법",
    metaTitle: "강아지 클리커 훈련 완전 가이드 | 원리·방법·실전 | 펫지기",
    metaDescription: "강아지 클리커 훈련의 원리, 클리커 선택법, 단계별 실전 훈련 방법과 자주 하는 실수를 정리했습니다.",
    body: `<h2>클리커 훈련이란</h2>
<p>클리커 훈련은 '클릭 → 간식' 패턴을 이용한 조건 형성 훈련입니다. 강아지가 원하는 행동을 하는 정확한 순간에 클릭음을 내고 즉시 간식을 줍니다. 클릭이 '지금 한 행동이 정확하다'는 명확한 신호가 되어 학습 속도를 크게 높입니다.</p>
<p>고전적 조건 형성(파블로프)과 조작적 조건 형성(스키너)을 결합한 과학적 훈련법으로, 처벌 없이 자발적 참여를 이끌어 냅니다. ASPCA(미국동물학대방지협회)는 클리커 훈련을 포함한 긍정 강화 훈련이 체벌 기반 훈련보다 반려동물의 스트레스가 낮고 학습 지속성이 높다는 연구 결과를 지지합니다. AAHA(미국동물병원협회) 행동 가이드라인(2021)도 클리커 훈련을 포함한 보상 기반 훈련 방식을 임상 표준으로 권장합니다.</p>

<h2>클리커 선택과 준비</h2>
<ul>
  <li><strong>박스형 클리커</strong>: 가장 일반적. 누르는 힘에 따라 소리 크기가 약간 다름</li>
  <li><strong>버튼형(i-click)</strong>: 소리가 더 부드럽고 소형견·예민한 개에게 적합</li>
  <li><strong>대안</strong>: 볼펜 클릭 소리, 입으로 내는 혀 소리(click tongue)도 사용 가능</li>
</ul>
<p>시작 전 준비: 고가치 간식(소시지·치즈) 소분, 5~10분 훈련 시간 확보</p>

<h2>단계 1 — 클리커 충전 (Charge the Clicker)</h2>
<p>클릭 소리와 간식의 연결을 만드는 과정입니다. 강아지가 아무것도 하지 않아도 됩니다.</p>
<ol>
  <li>클릭 → 즉시 간식. 5~10회 반복</li>
  <li>강아지가 클릭 소리에 귀를 쫑긋 세우거나 눈을 돌리면 성공</li>
  <li>하루 2~3세션, 1~2일이면 충전 완료</li>
</ol>

<h2>단계 2 — 기본 행동 클리커 훈련</h2>
<h3>앉아 (Sit)</h3>
<ol>
  <li>간식을 코 위에서 뒤쪽으로 천천히 올리면 강아지가 자연히 앉음</li>
  <li>엉덩이가 바닥에 닿는 순간 클릭 → 간식</li>
  <li>10회 연습 후 "앉아" 신호 추가</li>
</ol>
<h3>엎드려 (Down)</h3>
<ol>
  <li>앉은 상태에서 간식을 두 앞발 사이 아래로 유도</li>
  <li>팔꿈치가 바닥에 닿는 순간 클릭 → 간식</li>
</ol>

<h2>훈련 시 자주 하는 실수</h2>
<ul>
  <li><strong>클릭 타이밍 늦음</strong>: 행동 이후 1초가 지나면 다른 행동에 보상이 됨. 정확한 순간에 클릭</li>
  <li><strong>클릭 없이 간식만 줌</strong>: 클리커 훈련의 핵심이 사라짐</li>
  <li><strong>너무 긴 세션</strong>: 5~10분을 넘으면 집중력 저하. 짧게 자주</li>
  <li><strong>높은 난이도 바로 시도</strong>: 충분한 성공 경험을 쌓은 후 단계를 높임</li>
</ul>

<h3>클리커를 항상 갖고 다녀야 하나요?</h3>
<p>행동이 완성되면 클리커는 필요 없습니다. 클리커는 새로운 행동을 가르칠 때만 사용하며, 이미 학습된 행동은 언어 신호나 손동작만으로 유지합니다.</p>

<h3>클리커가 없으면 훈련이 안 되나요?</h3>
<p>아닙니다. 클리커는 타이밍을 정확히 하는 도구입니다. 볼펜 클릭 소리, 손가락 스냅, "예스!" 같은 단어도 동일하게 사용할 수 있습니다. 중요한 것은 일관성입니다. <a href="/guide/dog-basic-training-guide">강아지 기초 훈련 가이드</a>와 함께 활용하세요.</p>

<div style="background:#f8f9fa;border-left:4px solid #6c757d;padding:14px;margin:16px 0;font-size:0.95em;">
  <strong>참고 자료</strong><br>
  · ASPCA(미국동물학대방지협회) — 긍정 강화 vs 체벌 기반 훈련 효과 비교 연구<br>
  · AAHA(미국동물병원협회) 반려동물 행동 가이드라인 (2021) — 클리커 훈련 포함 보상 기반 훈련 권장<br>
  · Journal of Veterinary Behavior — 클리커 훈련의 학습 속도 및 지속성 연구<br>
  · AKC(미국켄넬클럽) — 클리커 훈련 입문 및 실전 활용 가이드
</div>`,
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-07-04T09:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },
  {
    id: "blog-240",
    slug: "cat-window-bird-watching",
    type: "blog",
    category: 5,
    title: "고양이 창문 새 구경 — 실내 고양이 시각·청각 자극 완전 가이드",
    metaTitle: "고양이 창문 새 구경 가이드 | 실내 자극 환경 만들기 | 펫지기",
    metaDescription: "실내 고양이를 위한 새 구경 환경 조성법, 새 모이대 설치, TV 자극 콘텐츠 활용법과 창문 안전 설치 방법을 안내합니다.",
    body: `<h2>왜 새 구경이 고양이에게 중요한가</h2>
<p>고양이는 본능적으로 사냥꾼입니다. 실내에 갇혀 사냥 본능을 발휘할 기회가 없으면 무료함, 스트레스, 과잉 그루밍으로 이어질 수 있습니다. 창문을 통한 새 구경은 시각·청각·후각을 동시에 자극하는 고효율 환경 풍부화입니다.</p>
<p>ASPCA(미국동물학대방지협회) 연구에 따르면 창문 접근이 보장된 실내 고양이는 그렇지 않은 경우보다 스트레스 관련 행동(과잉 그루밍·공격성·은둔)이 유의미하게 줄어들었습니다. WSAVA(세계소동물수의사협회) 고양이 환경 풍부화 가이드라인도 창문 접근 및 시각 자극을 고양이 5대 복지 욕구(Five Domains) 중 환경적 복지의 핵심 요소로 분류합니다.</p>

<h2>창문 시청 환경 조성</h2>
<h3>창문 퍼치(Window Perch) 설치</h3>
<ul>
  <li>창문 선반형 퍼치: 유리창에 흡착판으로 고정. 고양이가 앉아서 바깥을 내다볼 수 있음</li>
  <li>창문 앞 캣타워 배치: 높은 위치에서 관찰 — 고양이의 본능적 선호 (높은 곳 = 안전)</li>
  <li>창문 전망대 선택 기준: 하중 지지력 5kg 이상, 흡착판 4개 이상, 세탁 가능 쿠션</li>
</ul>

<h2>새 모이대 설치 — 최고의 고양이 TV</h2>
<p>창문 밖에 새 모이대를 설치하면 살아있는 '고양이 TV'가 됩니다.</p>
<ul>
  <li><strong>설치 위치</strong>: 창문에서 50~100cm 바깥. 너무 가까우면 새가 접근 꺼림</li>
  <li><strong>먹이 종류</strong>: 해바라기씨, 수수, 땅콩(비가공) — 참새·박새 유인</li>
  <li><strong>위생 관리</strong>: 2주에 1회 모이대 세척. 배설물 제거</li>
  <li><strong>아파트</strong>: 베란다 난간형 모이대 사용 가능</li>
</ul>

<h2>동영상·TV 자극 콘텐츠 활용</h2>
<p>밖이 잘 안 보이는 환경이라면 유튜브의 '고양이 TV' 채널이 좋은 대안입니다.</p>
<ul>
  <li>'Birds for Cats' 시리즈: 새소리·움직임 고화질 영상</li>
  <li>다람쥐, 생선, 물고기 수족관 영상도 효과적</li>
  <li>큰 화면(TV)에 틀면 몰입도 상승</li>
  <li>하루 1~2시간, 고양이가 원할 때 보게</li>
</ul>

<h2>창문 안전 관리</h2>
<ul>
  <li><strong>방충망 이중 고정</strong>: 고양이가 기대도 빠지지 않는 잠금형 방충망</li>
  <li><strong>그물망 추가</strong>: 방충망 안쪽에 반려동물용 안전망 설치</li>
  <li><strong>창문 개방 폭 제한기</strong>: 최대 10cm만 열리도록 스토퍼 설치</li>
  <li>고층일수록 추락 방지 설비가 필수</li>
</ul>

<h3>고양이가 창문 밖 새를 보고 이빨을 부딪히는 것은 무엇인가요?</h3>
<p>'채터링(Chattering)'이라고 부르는 정상 행동입니다. 사냥 본능이 활성화될 때 나오는 소리로, 목을 잡는 본능적인 입 움직임이 발현된 것입니다. 스트레스가 아닌 흥분·집중의 신호입니다.</p>

<h3>새 구경 시간이 너무 길면 오히려 해롭지 않나요?</h3>
<p>잡을 수 없는 대상을 오래 보면 좌절감이 쌓일 수 있습니다. 하루 1~3시간이 적당하며, 이후에는 낚시봉 장난감으로 실제 사냥 욕구를 해소해주는 것이 좋습니다. <a href="/guide/indoor-cat-enrichment-guide">실내 고양이 환경 풍부화 가이드</a>와 함께 활용하세요.</p>

<div style="background:#f8f9fa;border-left:4px solid #6c757d;padding:14px;margin:16px 0;font-size:0.95em;">
  <strong>참고 자료</strong><br>
  · ASPCA(미국동물학대방지협회) — 실내 고양이 창문 접근과 스트레스 행동 감소 연구<br>
  · WSAVA(세계소동물수의사협회) — 고양이 Five Domains 복지 모델 및 환경 풍부화 가이드라인<br>
  · VCA Animal Hospitals — 고양이 채터링(Chattering) 행동 및 사냥 본능 자극 자료<br>
  · AVMA(미국수의사협회) — 실내 고양이 환경 풍부화 권장 요소
</div>`,
    authorName: "펫지기 에디터팀",
    status: "published",
    ymyl: false,
    publishedAt: "2026-07-04T14:00:00.000Z",
    createdAt: NOW,
    updatedAt: NOW,
  },
];

async function seed() {
  console.log(`[seed] blog-posts-24: ${POSTS.length}개 삽입 시작`);
  for (const post of POSTS) {
    await db.insert(contents).values(post).onConflictDoUpdate({
      target: contents.id,
      set: { title: post.title, body: post.body, updatedAt: NOW },
    });
    console.log(`  ✓ ${post.slug}`);
  }
  console.log("[seed] 완료");
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});
