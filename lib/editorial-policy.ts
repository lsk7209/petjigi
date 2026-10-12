/**
 * 편집 책임·AI 사용·광고 독립성 문구의 단일 출처.
 * about / advertising / privacy / 작성자 표시가 같은 사실을 말하도록 이 파일만 수정한다.
 * 실제 개인 저자·전문가 정보가 제공되지 않은 상태에서 이름·경력·자격을 만들지 않는다.
 */
import { SITE_URL_FALLBACK } from "./site-constants";

export const EDITORIAL_TEAM_NAME = "펫지기 에디터팀";
export const EDITORIAL_TEAM_PATH = "/about#editorial-team";
export const EDITORIAL_TEAM_URL = `${SITE_URL_FALLBACK}${EDITORIAL_TEAM_PATH}`;

export const AD_INDEPENDENCE_TEXT =
  "광고와 편집 콘텐츠를 명확히 분리하고, 광고 여부와 관계없이 정보의 독립성과 검증 기준을 유지합니다.";

export const AD_PERSONALIZATION_TEXT =
  "맞춤 광고 여부는 Google 정책과 이용자의 동의 설정에 따릅니다. 펫지기는 광고·분석 저장소 사용 동의를 기본적으로 거부(denied) 상태로 시작하며, 동의 관리 도구가 연결되기 전에는 맞춤 광고 동의를 허용 상태로 설정하지 않습니다.";

export const AI_USAGE_TEXT =
  "콘텐츠 초안 작성과 점검에 AI 도구와 자동화 스크립트를 사용합니다. AI가 만든 초안은 사람이 출처와 표현을 확인한 뒤 공개하며, 검토자 표시가 없는 글에는 외부 전문가가 확인한 기록이 없습니다. 사이트에 쓰인 일러스트·이미지 중 AI로 만든 것은 실제 업체·반려동물·현장 사진이 아닙니다.";

export const EDITORIAL_TEAM_PRINCIPLES: readonly { title: string; body: string }[] = [
  {
    title: "역할",
    body: "펫지기 에디터팀은 공공데이터와 공식 자료를 정리해 반려동물 보호자가 확인할 항목을 안내하는 편집 주체입니다. 개인 수의사·법률가·보험전문가의 이름으로 글을 쓰지 않습니다.",
  },
  {
    title: "자료 선정 기준",
    body: "정부·공공기관, 학회·전문 단체의 공개 자료와 1차 연구를 우선합니다. 원문에서 확인하지 못한 수치와 기관 권고는 싣지 않거나 표현 범위를 줄입니다.",
  },
  {
    title: "사람이 확인하는 항목",
    body: "출처 링크와 수치·기간의 일치, 응급·보험·법적 의무 관련 문장, 금지 표현 여부, 내부 링크의 실제 연결 대상을 공개 전에 확인합니다.",
  },
  {
    title: "전문가 검토 표시 원칙",
    body: "수의사·법률가·보험전문가가 실제로 검토한 기록이 있는 글에만 검토자와 검토일을 표시합니다. 기록이 없는 글을 검토된 글처럼 표시하지 않으며, 자격이나 현장 경험을 지어내지 않습니다.",
  },
  {
    title: "수정 기록",
    body: "글의 '수정' 날짜는 본문이 실제로 바뀐 날짜입니다. 전문가 검토일과는 다른 정보이며, 검토 사실을 뜻하지 않습니다.",
  },
  {
    title: "오류 신고",
    body: "오류나 오래된 정보를 발견하면 문의 페이지의 이메일로 알려 주세요. 확인된 오류는 수치를 빼거나 정정하는 방식으로 고칩니다.",
  },
];
