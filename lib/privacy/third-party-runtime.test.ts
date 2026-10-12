import assert from "node:assert/strict";
import test from "node:test";
import {
  canLoadThirdParty,
  isCanonicalHost,
  resolveThirdPartyRuntime,
} from "./third-party-runtime";

test("Vercel production만 production 런타임, 나머지는 off", () => {
  assert.equal(resolveThirdPartyRuntime({ vercelEnv: "production" }), "production");
  assert.equal(resolveThirdPartyRuntime({ vercelEnv: "preview" }), "off");
  assert.equal(resolveThirdPartyRuntime({ vercelEnv: "development" }), "off");
  assert.equal(resolveThirdPartyRuntime({}), "off");
});

test("명시 지정은 유효한 값만 허용", () => {
  assert.equal(resolveThirdPartyRuntime({ explicit: "mock", vercelEnv: "production" }), "mock");
  assert.equal(resolveThirdPartyRuntime({ explicit: "bogus", vercelEnv: "preview" }), "off");
});

test("production + canonical 호스트에서만 로드", () => {
  assert.equal(canLoadThirdParty("production", "petjigi.kr"), true);
  assert.equal(canLoadThirdParty("production", "PetJigi.kr"), true);
  assert.equal(canLoadThirdParty("production", "petjigi-abc.vercel.app"), false);
  assert.equal(canLoadThirdParty("production", "www.petjigi.kr"), false);
  assert.equal(canLoadThirdParty("production", "localhost"), false);
  assert.equal(canLoadThirdParty("mock", "petjigi.kr"), false);
  assert.equal(canLoadThirdParty("off", "petjigi.kr"), false);
  assert.equal(isCanonicalHost("localhost", ["localhost"]), true);
});
