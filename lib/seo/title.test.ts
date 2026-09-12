import assert from "node:assert/strict";
import test from "node:test";
import { documentTitle, socialTitle } from "./title";

test("document title removes repeated site-name suffixes", () => {
  assert.equal(documentTitle("화성시 펫호텔 | 펫지기"), "화성시 펫호텔");
  assert.equal(documentTitle("화성시 펫호텔 | 펫지기 | 펫지기"), "화성시 펫호텔");
});
test("social title contains the site name once", () => {
  assert.equal(socialTitle("반려동물 가이드 | 펫지기"), "반려동물 가이드 | 펫지기");
  assert.equal(socialTitle("펫지기"), "펫지기");
});
