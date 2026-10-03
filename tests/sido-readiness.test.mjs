import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { runInNewContext } from "node:vm";
import test from "node:test";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import ts from "typescript";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
const cache = new Map();
const emptyComponent = () => null;

const stubs = {
  "next/link": ({ children, ...props }) => React.createElement("a", props, children),
  "next/navigation": {
    notFound: () => {
      const err = new Error("NEXT_NOT_FOUND");
      err.digest = "NEXT_NOT_FOUND";
      throw err;
    },
  },
  "@/lib/db-queries": {
    getCachedRegionsBySido: async (sido) => {
      // Simulate seoul having data, gangwon and jeju having 0 records
      if (sido === "seoul") {
        return [
          { code: "11110", sido: "서울", sigungu: "종로구", sigunguSlug: "jongno" },
          { code: "11140", sido: "서울", sigungu: "중구", sigunguSlug: "jung" },
        ];
      }
      return [];
    },
  },
  "@/components/ads/ad-slot": { AdSlot: emptyComponent },
  "@/components/providers/ad-policy-provider": { AdPolicyProvider: ({ children }) => children },
  "@/components/analytics/region-view-tracker": { RegionViewTracker: emptyComponent },
};

function load(relative) {
  const filename = resolve(root, relative);
  if (cache.has(filename)) return cache.get(filename);
  const source = readFileSync(filename, "utf8");
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      jsx: ts.JsxEmit.ReactJSX,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });
  const fixtureModule = { exports: {} };
  runInNewContext(
    outputText,
    {
      module: fixtureModule,
      exports: fixtureModule.exports,
      process: { env: { NEXT_PUBLIC_SITE_URL: "https://petjigi.kr" } },
      require: (name) => {
        if (Object.hasOwn(stubs, name)) return stubs[name];
        if (name.startsWith("@/lib/")) return load(`${name.slice(2)}.ts`);
        if (name.startsWith(".")) return load(`${resolve(dirname(filename), name)}.ts`);
        if (name === "react/jsx-runtime" || name === "react") return require(name);
        throw new Error(`Unexpected fixture dependency: ${name}`);
      },
    },
    { filename }
  );
  cache.set(filename, fixtureModule.exports);
  return fixtureModule.exports;
}

const sidoModule = load("app/sido/[sido]/page.tsx");

test("unregistered sido pages render 200 OK preparation screen instead of throwing notFound", async () => {
  for (const sido of ["gangwon", "jeju", "chungbuk", "chungnam", "jeonbuk", "jeonnam", "gyeongbuk", "gyeongnam"]) {
    const pageElement = await sidoModule.default({ params: Promise.resolve({ sido }) });
    const html = renderToStaticMarkup(pageElement);

    assert.ok(html.includes("공공데이터 수집·등록 준비 중입니다"), `${sido} must show preparation message`);
    assert.ok(html.includes("현재 이용 가능한 지역 바로가기"), `${sido} must show active sido links`);
    assert.ok(html.includes('href="/sido/seoul"'), `${sido} must link to active sido`);
  }
});

test("registered sido page renders sigungu list normally", async () => {
  const pageElement = await sidoModule.default({ params: Promise.resolve({ sido: "seoul" }) });
  const html = renderToStaticMarkup(pageElement);

  assert.ok(html.includes("시군구 (2개)"));
  assert.ok(html.includes("종로구"));
  assert.ok(html.includes("중구"));
  assert.doesNotMatch(html, /공공데이터 수집·등록 준비 중입니다/);
});

test("invalid sido slug still throws notFound", async () => {
  await assert.rejects(
    async () => {
      await sidoModule.default({ params: Promise.resolve({ sido: "nonexistent-sido-123" }) });
    },
    { message: "NEXT_NOT_FOUND" }
  );
});

test("unregistered sido metadata generates valid title and description without throwing", async () => {
  const meta = await sidoModule.generateMetadata({ params: Promise.resolve({ sido: "gangwon" }) });
  assert.ok(meta.title?.absolute?.includes("강원"));
  assert.ok(meta.description?.includes("강원"));
});
