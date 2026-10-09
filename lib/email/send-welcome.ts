export type WelcomeEmailStatus = "sent" | "skipped" | "failed";

export interface WelcomeEmailDeps {
  apiKey: string | undefined;
  /** 인증된 발신 주소. 미설정이면 도메인을 추측하지 않고 발송을 건너뛴다. */
  from: string | undefined;
  render: () => Promise<string>;
  send: (message: { from: string; to: string; subject: string; html: string }) => Promise<void>;
}

const WELCOME_SUBJECT = "[펫지기] 구독을 환영합니다";

/** 구독 저장 성공과 메일 발송 성공을 분리하기 위해 결과 상태를 반환한다. 예외는 던지지 않는다. */
export async function sendWelcomeEmail(email: string, deps: WelcomeEmailDeps): Promise<WelcomeEmailStatus> {
  if (!deps.apiKey || !deps.from) return "skipped";
  try {
    const html = await deps.render();
    await deps.send({ from: deps.from, to: email, subject: WELCOME_SUBJECT, html });
    return "sent";
  } catch {
    return "failed";
  }
}

/** 응답 문구는 저장 결과를 기준으로 하고, 메일은 실제로 보낸 경우에만 언급한다. */
export function subscribeMessage(base: string, status: WelcomeEmailStatus): string {
  return status === "sent" ? `${base} 환영 메일을 보냈습니다.` : base;
}
