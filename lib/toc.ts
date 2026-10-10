export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

const HEADING_RE = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;
const EXISTING_ID_RE = /\sid\s*=\s*(["'])(.*?)\1/i;
const ID_TEXT_MAX = 30;

const stripTags = (html: string): string => html.replace(/<[^>]+>/g, "").trim();

function slugifyHeading(text: string): string {
  return text
    .slice(0, ID_TEXT_MAX)
    .replace(/[^\w가-힣]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * 본문 h2/h3에 id를 부여하고 목차를 만든다. 목차 id와 본문 DOM id가 항상 같은 값이 되도록
 * 한 번의 순회로 처리한다.
 *  - 기존 id가 있고 유일하면 그대로 사용(속성 보존)
 *  - 기존 id가 이미 쓰였으면(중복) 새 id로 교체
 *  - 텍스트가 빈 제목은 목차에서 제외하고 본문은 건드리지 않는다
 */
export function buildToc(html: string): {
  headings: TocHeading[];
  html: string;
} {
  const headings: TocHeading[] = [];
  const used = new Set<string>();

  const out = html.replace(
    HEADING_RE,
    (whole, level: string, attrs: string, inner: string) => {
      const text = stripTags(inner);
      if (!text) return whole;

      const existing = EXISTING_ID_RE.exec(attrs)?.[2];
      if (existing && !used.has(existing)) {
        used.add(existing);
        headings.push({ id: existing, text, level: Number(level) as 2 | 3 });
        return whole;
      }

      let id = `h-${headings.length}-${slugifyHeading(text)}`;
      while (used.has(id)) id += "-x";
      used.add(id);
      headings.push({ id, text, level: Number(level) as 2 | 3 });
      const cleanedAttrs = existing ? attrs.replace(EXISTING_ID_RE, "") : attrs;
      return `<h${level}${cleanedAttrs} id="${id}">${inner}</h${level}>`;
    },
  );

  return { headings, html: out };
}
