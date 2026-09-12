import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { SITE_IDENTITY } from "../lib/site-identity";

const publicIdentityFiles = [
  "components/layout/footer.tsx",
  "app/about/page.tsx",
  "app/contact/page.tsx",
  "app/privacy/page.tsx",
  "app/disclosure/page.tsx",
  "app/advertising/page.tsx",
  "app/terms/page.tsx",
];

test("public legal and contact identity uses the shared evidence boundary", () => {
  for (const file of publicIdentityFiles) {
    const source = fs.readFileSync(file, "utf8");
    assert.match(source, /SITE_IDENTITY|SITE_CONTACT_MAILTO/, file);
    assert.doesNotMatch(source, /contact@petjigi\.kr|\(주\)펫지기/, file);
  }
});

test("unverified identity claims remain operator decisions, not fabricated facts", () => {
  assert.equal(SITE_IDENTITY.evidence.legalEntity.status, "UNKNOWN");
  assert.equal(SITE_IDENTITY.evidence.contactMailbox.status, "UNKNOWN");
  assert.match(SITE_IDENTITY.evidence.legalEntity.operatorAction, /Confirm/);
  assert.match(SITE_IDENTITY.evidence.contactMailbox.operatorAction, /Confirm/);
});
