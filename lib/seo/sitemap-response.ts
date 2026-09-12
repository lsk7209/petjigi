export function sitemapUnavailableResponse(): Response {
  return new Response("Service temporarily unavailable", {
    status: 503,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
      "Retry-After": "300",
    },
  });
}
