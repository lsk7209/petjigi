import assert from "node:assert/strict";
import test from "node:test";
import { runPagedImport } from "./paged-import";

test("mid-run fetch failure rejects before the caller can record success", async () => {
  let successRecorded = false;
  const written: number[] = [];

  await assert.rejects(async () => {
    await runPagedImport({
      totalPages: 3,
      fetchPage: async (page) => {
        if (page === 2) throw new Error("injected page failure");
        return [page];
      },
      writeItem: async (item) => {
        written.push(item);
      },
    });
    successRecorded = true;
  }, /injected page failure/);

  assert.deepEqual(written, [1]);
  assert.equal(successRecorded, false);
});

test("complete import returns the written count so the caller can record success", async () => {
  const written = await runPagedImport({
    totalPages: 2,
    fetchPage: async (page) => [page * 10, page * 10 + 1],
    writeItem: async () => {},
  });

  assert.equal(written, 4);
});
