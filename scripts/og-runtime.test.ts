import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const DB_BACKED_OG_ROUTES = [
  "app/blog/[slug]/opengraph-image.tsx",
  "app/guide/[slug]/opengraph-image.tsx",
  "app/sido/[sido]/opengraph-image.tsx",
  "app/[sigungu]/[type]/[slug]/opengraph-image.tsx",
  "app/[sigungu]/[type]/opengraph-image.tsx",
  "app/shelter/[sigungu]/opengraph-image.tsx",
  "app/breed/[species]/[slug]/opengraph-image.tsx",
  "app/condition/[slug]/opengraph-image.tsx",
] as const;

test("DB 기반 OpenGraph 이미지는 요청 시점에 생성한다", () => {
  for (const relativePath of DB_BACKED_OG_ROUTES) {
    const source = fs.readFileSync(path.join(process.cwd(), relativePath), "utf8");
    assert.match(source, /export const dynamic = "force-dynamic";/, relativePath);
    assert.doesNotMatch(source, /import \{ db \} from "@\/db\/client";/, relativePath);
    assert.match(source, /await import\("@\/db\/client"\)/, relativePath);
  }
});

test("image metadata routes use the supported default Node.js runtime", () => {
  const appRoot = path.join(process.cwd(), "app");
  const visit = (directory: string): string[] => fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? visit(target) : [target];
  });

  for (const file of visit(appRoot).filter((candidate) =>
    /(?:opengraph-image|icon|apple-icon)\.tsx$/.test(candidate))) {
    assert.doesNotMatch(fs.readFileSync(file, "utf8"), /runtime\s*=\s*["']edge["']/, file);
  }
});

test("목록과 상세 라우트는 하나의 동적 세그먼트 트리를 공유한다", () => {
  const listingSource = fs.readFileSync(
    path.join(process.cwd(), "app/[sigungu]/[type]/page.tsx"),
    "utf8"
  );
  const detailSource = fs.readFileSync(
    path.join(process.cwd(), "app/[sigungu]/[type]/[slug]/page.tsx"),
    "utf8"
  );

  assert.equal(fs.existsSync(path.join(process.cwd(), "app/[type]")), false);
  assert.match(listingSource, /export const dynamic = "force-dynamic";/);
  assert.match(detailSource, /sigungu: type, type: sigungu, slug/);
});
