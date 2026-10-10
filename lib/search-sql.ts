import { sql, type SQL } from "drizzle-orm";
import type { SQLiteColumn } from "drizzle-orm/sqlite-core";

const LIKE_ESCAPE_CHAR = "\\";

/** likeLiteralPattern이 만든 `\` 이스케이프를 SQLite가 해석하도록 ESCAPE 절을 명시한다. 값은 모두 바인딩. */
export function likeEscaped(column: SQLiteColumn, pattern: string): SQL {
  return sql`${column} LIKE ${pattern} ESCAPE ${LIKE_ESCAPE_CHAR}`;
}
