/**
 * 펫지기 이메일 템플릿
 *
 * @react-email/render 사용 (서버 전용)
 * 모든 이메일 푸터에는 수신 거부(unsubscribe) 링크가 포함됩니다. (표시광고법 준수)
 */

import { render } from "@react-email/render";
import { Html } from "@react-email/html";
import { Heading } from "@react-email/heading";
import { Text } from "@react-email/text";
import { Button } from "@react-email/button";
import { Hr } from "@react-email/hr";
import { Img } from "@react-email/img";
import React from "react";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://petjigi.kr";
const SITE_NAME = "펫지기";

// ─── 공통 스타일 토큰 ───────────────────────────────────────────────────────
const styles = {
  body: {
    fontFamily:
      "'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', sans-serif",
    backgroundColor: "#faf5ee",
    margin: "0",
    padding: "0",
  } as React.CSSProperties,
  container: {
    maxWidth: "560px",
    margin: "0 auto",
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden" as const,
    border: "1px solid #e8dfd0",
  } as React.CSSProperties,
  header: {
    backgroundColor: "#9caf88",
    padding: "24px 32px",
    textAlign: "center" as const,
  } as React.CSSProperties,
  headerLogo: {
    color: "#ffffff",
    fontSize: "20px",
    fontWeight: "700",
    letterSpacing: "-0.3px",
    margin: "0",
  } as React.CSSProperties,
  content: {
    padding: "32px",
  } as React.CSSProperties,
  h1: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#2a2520",
    margin: "0 0 12px 0",
    lineHeight: "1.4",
  } as React.CSSProperties,
  paragraph: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#2a2520",
    margin: "0 0 16px 0",
  } as React.CSSProperties,
  secondaryParagraph: {
    fontSize: "14px",
    lineHeight: "1.7",
    color: "#8c6a4f",
    margin: "0 0 12px 0",
  } as React.CSSProperties,
  ctaButton: {
    backgroundColor: "#9caf88",
    borderRadius: "12px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "15px",
    fontWeight: "600",
    padding: "12px 28px",
    textDecoration: "none",
    textAlign: "center" as const,
  } as React.CSSProperties,
  ctaWrapper: {
    textAlign: "center" as const,
    margin: "24px 0",
  } as React.CSSProperties,
  hr: {
    borderColor: "#e8dfd0",
    margin: "24px 0",
  } as React.CSSProperties,
  footer: {
    padding: "16px 32px 24px",
    backgroundColor: "#faf5ee",
    textAlign: "center" as const,
  } as React.CSSProperties,
  footerText: {
    fontSize: "12px",
    color: "#8c6a4f",
    margin: "0 0 6px 0",
    lineHeight: "1.6",
  } as React.CSSProperties,
  footerLink: {
    color: "#8c6a4f",
    textDecoration: "underline",
  } as React.CSSProperties,
  advertisingBadge: {
    display: "inline-block",
    fontSize: "11px",
    fontWeight: "600",
    color: "#8c6a4f",
    border: "1px solid #e8dfd0",
    borderRadius: "4px",
    padding: "2px 6px",
    marginBottom: "8px",
  } as React.CSSProperties,
  pdfBox: {
    backgroundColor: "#f5f1ea",
    border: "1px solid #e8dfd0",
    borderRadius: "12px",
    padding: "20px 24px",
    margin: "20px 0",
  } as React.CSSProperties,
  pdfTitle: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#2a2520",
    margin: "0 0 6px 0",
  } as React.CSSProperties,
  pdfDesc: {
    fontSize: "13px",
    color: "#8c6a4f",
    margin: "0 0 12px 0",
  } as React.CSSProperties,
};

// ─── 공통 이메일 푸터 ────────────────────────────────────────────────────────
interface FooterProps {
  /** true이면 "(광고)" 머리말 표시 (표시광고법 제7조) */
  isAdvertising?: boolean;
  unsubscribeUrl: string;
}

function EmailFooter({ isAdvertising = false, unsubscribeUrl }: FooterProps) {
  return (
    <div style={styles.footer}>
      {isAdvertising && (
        <div>
          <span style={styles.advertisingBadge}>(광고)</span>
        </div>
      )}
      <Text style={styles.footerText}>
        이 이메일은 {SITE_NAME}({SITE_URL})에서 발송되었습니다.
      </Text>
      <Text style={styles.footerText}>
        <a href={unsubscribeUrl} style={styles.footerLink}>
          수신 거부 (Unsubscribe)
        </a>
        {" · "}
        <a href={`${SITE_URL}/privacy`} style={styles.footerLink}>
          개인정보처리방침
        </a>
      </Text>
      <Text style={{ ...styles.footerText, color: "#b8b3aa" }}>
        © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
      </Text>
    </div>
  );
}

// ─── Welcome Email ───────────────────────────────────────────────────────────

export interface WelcomeEmailProps {
  /** 수신자 이메일 (수신 거부 링크 생성용) */
  email: string;
  /** 구독 unsubscribe 토큰 (서버에서 생성) */
  unsubscribeToken: string;
  /** 무료 PDF 다운로드 URL (플레이스홀더: 실제 파일 업로드 후 교체) */
  pdfUrl?: string;
  /** 광고성 정보 수신 동의 여부 */
  hasMarketingConsent?: boolean;
  /** 구독 출처 */
  source?: string;
}

export function WelcomeEmail({
  email,
  unsubscribeToken,
  pdfUrl = `${SITE_URL}/downloads/pet-loss-care-guide.pdf`,
  hasMarketingConsent = false,
  source,
}: WelcomeEmailProps) {
  const unsubscribeUrl = `${SITE_URL}/api/unsubscribe?token=${unsubscribeToken}&email=${encodeURIComponent(email)}`;
  const isPetLossGuide = source === "pet_loss_care";

  const subject = isPetLossGuide
    ? "[펫지기] 펫로스 케어 가이드 PDF가 도착했습니다"
    : "[펫지기] 구독을 환영합니다";

  return (
    <Html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{subject}</title>
      </head>
      <body style={styles.body}>
        <div style={{ padding: "24px 16px" }}>
          <div style={styles.container}>
            {/* 헤더 */}
            <div style={styles.header}>
              <p style={styles.headerLogo}>🐾 {SITE_NAME}</p>
            </div>

            {/* 본문 */}
            <div style={styles.content}>
              <Heading as="h1" style={styles.h1}>
                {isPetLossGuide
                  ? "펫로스 케어 가이드를 보내드립니다"
                  : "펫지기 구독을 환영합니다!"}
              </Heading>

              <Text style={styles.paragraph}>
                안녕하세요. 반려동물 보호자를 위한 정보 서비스 <strong>펫지기</strong>입니다.
                {isPetLossGuide
                  ? " 힘든 시간을 보내고 계신 분께 도움이 되길 바라는 마음으로 가이드를 준비했습니다."
                  : " 구독해 주셔서 감사합니다."}
              </Text>

              {/* PDF 다운로드 박스 */}
              {isPetLossGuide && (
                <div style={styles.pdfBox}>
                  <p style={styles.pdfTitle}>
                    📄 펫로스 케어 가이드 (무료 PDF)
                  </p>
                  <p style={styles.pdfDesc}>
                    펫로스 증후군의 이해부터 슬픔 극복 방법, 전문 기관 연락처까지 담았습니다.
                  </p>
                  <div style={styles.ctaWrapper}>
                    <Button href={pdfUrl} style={styles.ctaButton}>
                      PDF 다운로드
                    </Button>
                  </div>
                  <p style={{ ...styles.pdfDesc, fontSize: "11px", marginBottom: "0" }}>
                    링크는 30일간 유효합니다.
                  </p>
                </div>
              )}

              {!isPetLossGuide && (
                <div style={styles.ctaWrapper}>
                  <Button href={SITE_URL} style={styles.ctaButton}>
                    펫지기 둘러보기
                  </Button>
                </div>
              )}

              <Hr style={styles.hr} />

              <Text style={styles.secondaryParagraph}>
                펫지기는 반려동물과 함께하는 모든 결정 — 입양부터 장례까지 — 공공데이터 기반의 신뢰할 수 있는 정보를 제공합니다.
              </Text>

              {!hasMarketingConsent && (
                <Text style={{ ...styles.secondaryParagraph, fontSize: "12px" }}>
                  현재 광고성 정보 수신에는 동의하지 않으셨습니다. 뉴스레터 및 서비스 안내 이메일만 발송됩니다.
                </Text>
              )}
            </div>

            {/* 푸터 (수신 거부 링크 필수 — 표시광고법 준수) */}
            <EmailFooter
              isAdvertising={hasMarketingConsent}
              unsubscribeUrl={unsubscribeUrl}
            />
          </div>
        </div>
      </body>
    </Html>
  );
}

// ─── 렌더링 헬퍼 ─────────────────────────────────────────────────────────────

/**
 * WelcomeEmail을 HTML 문자열로 렌더링합니다.
 * 서버 환경(API Route, Server Action)에서만 호출하세요.
 */
export async function renderWelcomeEmail(props: WelcomeEmailProps): Promise<string> {
  return render(<WelcomeEmail {...props} />);
}
