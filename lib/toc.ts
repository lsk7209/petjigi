export interface TocHeading {
  id: string;
  text: string;
  level: 2 | 3;
}

const HEADING_RE = /<h([23])([^>]*)>([\s\S]*?)<\/h\1>/gi;
/** 따옴표 단위 속성 토큰: 다른 속성 값 안의 `id=` 문자열을 id 속성으로 오인하지 않는다 */
const ATTRIBUTE_RE = /([^\s"'<>/=]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;
const ID_TEXT_MAX = 30;

const NAMED_ENTITIES: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const ENTITY_RE = /&(?:#(\d+)|#x([0-9a-f]+)|([a-z][a-z0-9]*));/gi;

/** 알려진 엔티티만 풀고, 모르는 엔티티는 그대로 둔다(unknown=true로 표시) */
function decodeEntities(value: string): { text: string; unknown: boolean } {
  let unknown = false;
  const text = value.replace(ENTITY_RE, (whole, dec?: string, hex?: string, name?: string) => {
    const code = dec ? Number(dec) : hex ? parseInt(hex, 16) : undefined;
    if (code !== undefined) return Number.isInteger(code) && code > 0 && code <= 0x10ffff ? String.fromCodePoint(code) : whole;
    const named = NAMED_ENTITIES[(name ?? "").toLowerCase()];
    if (named === undefined) unknown = true;
    return named ?? whole;
  });
  return { text, unknown };
}

const stripTags = (html: string): string => html.replace(/<[^>]+>/g, "").trim();

function slugifyHeading(text: string): string {
  return text
    .slice(0, ID_TEXT_MAX)
    .replace(/[^\w가-힣]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

interface IdAttribute {
  start: number;
  end: number;
  /** 브라우저가 해석하는 값(엔티티 해석 후). 신뢰할 수 없으면 null */
  value: string | null;
}

/** 첫 id 속성(브라우저가 사용하는 것)을 찾는다. 빈 값이어도 속성이 있으면 반환한다. */
function findIdAttribute(attrs: string): IdAttribute | null {
  for (const m of attrs.matchAll(ATTRIBUTE_RE)) {
    if (m[1].toLowerCase() !== "id") continue;
    const decoded = decodeEntities(m[2] ?? m[3] ?? m[4] ?? "");
    const usable = decoded.text !== "" && !/\s/.test(decoded.text) && !decoded.unknown;
    return { start: m.index, end: m.index + m[0].length, value: usable ? decoded.text : null };
  }
  return null;
}

/**
 * 본문 h2/h3에 id를 부여하고 목차를 만든다. 목차 id와 본문 DOM id가 항상 같은 값이 되도록
 * 한 번의 순회로 처리한다.
 *  - 사용 가능한 기존 id(엔티티를 해석한 값)가 유일하면 속성 원문을 그대로 두고 그 값을 목차에 쓴다
 *  - 기존 id가 비었거나 공백·미확인 엔티티를 포함하거나 이미 쓰였으면 해당 속성을 새 id로 교체한다
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
      const text = decodeEntities(stripTags(inner)).text;
      if (!text) return whole;

      const existing = findIdAttribute(attrs);
      if (existing?.value && !used.has(existing.value)) {
        used.add(existing.value);
        headings.push({ id: existing.value, text, level: Number(level) as 2 | 3 });
        return whole;
      }

      let id = `h-${headings.length}-${slugifyHeading(text)}`;
      while (used.has(id)) id += "-x";
      used.add(id);
      headings.push({ id, text, level: Number(level) as 2 | 3 });
      const cleanedAttrs = existing ? attrs.slice(0, existing.start) + attrs.slice(existing.end) : attrs;
      return `<h${level}${cleanedAttrs} id="${id}">${inner}</h${level}>`;
    },
  );

  return { headings, html: out };
}
