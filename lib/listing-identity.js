// 업체 목록의 '같은 업체' 판정과 대표 행 선택 — 목록·건수·통계·사이트맵·상세가 공유하는 단일 기준.
// next-sitemap.config.js(CommonJS)도 require하므로 CommonJS로 둔다. 원본 행은 삭제·병합하지 않는다.
//
// 같은 업체: 종류·이름·주소가 같고, 주소가 식별 가능할 때만(빈 값·NULL·'*' 마스킹 주소는 확정하지 않는다).
// 대표 행: 가장 최근에 동기화된 행(last_synced_at 큼), 같으면 id가 작은 행.
//   last_synced_at은 원본 기준일이 아니라 우리가 마지막으로 읽은 시각이다 — 원본 기준일 컬럼이 생기면 그 값으로 바꾼다.

const MASK_CHAR = "*";

/** 주소만으로 업체를 식별할 수 있는가 (빈 값·마스킹 주소는 같은 업체로 합치지 않는다) */
function isIdentifiableAddress(address) {
  return typeof address === "string" && address.trim() !== "" && !address.includes(MASK_CHAR);
}

/** a가 b보다 대표 행으로 우선하는가: 최신 동기화 → 작은 id */
function isPreferredListing(a, b) {
  if (a.lastSyncedAt !== b.lastSyncedAt) return a.lastSyncedAt > b.lastSyncedAt;
  return a.id < b.id;
}

/**
 * 후보 행 중 같은 업체(종류·이름·주소)의 중복을 대표 1건으로 줄인다. 입력 순서를 유지한다.
 * active가 아닌 행과 식별 불가 주소 행은 그대로 둔다.
 * @template {{id: string, type: string, name: string, address: string | null, status: string, lastSyncedAt: string}} T
 * @param {T[]} rows
 * @returns {T[]}
 */
function collapseListingDuplicates(rows) {
  const best = new Map();
  for (const row of rows) {
    if (row.status !== "active" || !isIdentifiableAddress(row.address)) continue;
    const key = `${row.type}\u0000${row.name}\u0000${row.address}`;
    const cur = best.get(key);
    if (!cur || isPreferredListing(row, cur)) best.set(key, row);
  }
  return rows.filter((row) => {
    if (row.status !== "active" || !isIdentifiableAddress(row.address)) return true;
    return best.get(`${row.type}\u0000${row.name}\u0000${row.address}`) === row;
  });
}

/**
 * 대표 행만 남기는 SQL 조건. 바깥 쿼리의 businesses 테이블을 `alias`로 참조한다.
 * @param {string} alias
 */
function notDuplicateListingSql(alias = "businesses") {
  const a = alias;
  return `(${a}.address IS NULL OR trim(${a}.address) = '' OR instr(${a}.address, '${MASK_CHAR}') > 0 OR NOT EXISTS (` +
    `SELECT 1 FROM businesses d WHERE d.type = ${a}.type AND d.name = ${a}.name AND d.address = ${a}.address AND d.status = 'active' ` +
    `AND (d.last_synced_at > ${a}.last_synced_at OR (d.last_synced_at = ${a}.last_synced_at AND d.id < ${a}.id))))`;
}

/**
 * 사이트맵에 넣을 지역×업종(slug, type)과 고유 업체 수를 구하는 SQL. 목록 페이지와 같은 중복 제거를 쓴다.
 * 인자 1개: 최소 업체 수.
 */
function listingSitemapSql() {
  return "SELECT r.sigungu_slug AS slug, b.type AS type FROM businesses b JOIN regions r ON b.address_sigungu = r.sigungu " +
    `WHERE b.status = 'active' AND ${notDuplicateListingSql("b")} GROUP BY r.sigungu_slug, b.type HAVING COUNT(DISTINCT b.id) >= ?`;
}

module.exports = { isIdentifiableAddress, isPreferredListing, collapseListingDuplicates, notDuplicateListingSql, listingSitemapSql };
