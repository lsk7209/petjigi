import assert from "node:assert/strict";
import test from "node:test";
import OgImage from "../app/insurance/[insurer]/opengraph-image";

const insurers = ["hyundai", "db", "kb", "samsung", "hanwha", "meritz"];
const pngSignature = [137, 80, 78, 71, 13, 10, 26, 10];

test("insurer OG renders a PNG for every known insurer", { timeout: 30_000 }, async () => {
  for (const insurer of insurers) {
    const response = await OgImage({ params: Promise.resolve({ insurer }) });
    const bytes = new Uint8Array(await response.arrayBuffer());

    assert.equal(response.headers.get("content-type"), "image/png");
    assert.ok(bytes.byteLength >= 24, insurer);
    assert.deepEqual([...bytes.slice(0, pngSignature.length)], pngSignature, insurer);
    const header = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
    assert.equal(header.getUint32(16), 1200, insurer);
    assert.equal(header.getUint32(20), 630, insurer);
  }
});

test("insurer OG preserves notFound for an unknown insurer", async () => {
  await assert.rejects(
    () => OgImage({ params: Promise.resolve({ insurer: "unknown-fixture" }) }),
    (error: { digest?: string }) => error.digest === "NEXT_HTTP_ERROR_FALLBACK;404",
  );
});
