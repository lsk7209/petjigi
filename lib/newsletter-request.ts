export const NEWSLETTER_MAX_BODY_BYTES = 8 * 1024;

export class NewsletterRequestError extends Error {
  constructor(
    message: string,
    readonly status: 400 | 413 | 415,
  ) {
    super(message);
    this.name = "NewsletterRequestError";
  }
}

export async function readNewsletterJson(
  request: Pick<Request, "body" | "headers">,
): Promise<unknown> {
  const contentType = request.headers.get("content-type")
    ?.split(";", 1)[0]
    .trim()
    .toLowerCase() ?? "";
  if (contentType !== "application/json") {
    throw new NewsletterRequestError("JSON 요청만 처리할 수 있습니다.", 415);
  }

  const declaredLength = request.headers.get("content-length");
  if (declaredLength && /^\d+$/.test(declaredLength)
    && Number(declaredLength) > NEWSLETTER_MAX_BODY_BYTES) {
    throw new NewsletterRequestError("요청 본문이 너무 큽니다.", 413);
  }

  if (!request.body) {
    throw new NewsletterRequestError("요청 본문을 파싱할 수 없습니다.", 400);
  }

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > NEWSLETTER_MAX_BODY_BYTES) {
        await reader.cancel();
        throw new NewsletterRequestError("요청 본문이 너무 큽니다.", 413);
      }
      chunks.push(value);
    }
  } finally {
    reader.releaseLock();
  }

  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }

  try {
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
  } catch {
    throw new NewsletterRequestError("요청 본문을 파싱할 수 없습니다.", 400);
  }
}
