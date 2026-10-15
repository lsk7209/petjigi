import type { ApmsParseResult } from './apms-response';

/** 모든 원본 페이지를 검증한 후 반환한다. 호출자는 반환 전 DB를 갱신하지 않는다. */
export async function collectApmsPages<T>(
  fetchPage: (page: number, size: number) => Promise<ApmsParseResult<T>>,
  identity: (row: T) => string,
  pageSize = 1000,
): Promise<T[]> {
  const rows: T[] = [];
  const seen = new Set<string>();
  let total: number | undefined;
  for (let page = 1; ; page++) {
    const result = await fetchPage(page, pageSize);
    if (result.kind === 'failed') throw new Error(`APMS page ${page}: ${result.reason}`);
    if (!Number.isSafeInteger(result.totalCount) || result.totalCount < 0) throw new Error('APMS invalid totalCount');
    total ??= result.totalCount;
    if (total !== result.totalCount) throw new Error('APMS totalCount changed during collection');
    const expected = Math.min(pageSize, Math.max(0, total - rows.length));
    if (result.items.length !== expected) throw new Error(`APMS page ${page}: incomplete item count`);
    for (const row of result.items) {
      const key = identity(row);
      if (!key || seen.has(key)) throw new Error('APMS missing or repeated source identifier');
      seen.add(key);
      rows.push(row);
    }
    if (rows.length === total) return rows;
  }
}
