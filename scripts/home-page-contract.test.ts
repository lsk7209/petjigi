import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const home = fs.readFileSync("app/page.tsx", "utf8");
const HOME_COMPONENT_DIR = "components/home";
const homeComponents = fs
  .readdirSync(HOME_COMPONENT_DIR)
  .filter((name) => name.endsWith(".tsx"))
  .map((name) => fs.readFileSync(`${HOME_COMPONENT_DIR}/${name}`, "utf8"));
// 홈을 구성하는 페이지 + 홈 전용 컴포넌트 전체 소스
const homeSource = [home, ...homeComponents].join("\n");
const footer = fs.readFileSync("components/layout/footer.tsx", "utf8");

test("home page has no newsletter or signup form", () => {
  assert.doesNotMatch(homeSource, /SubscribeForm|home_newsletter|뉴스레터/);
  assert.doesNotMatch(home, /<form|type="email"/);
  assert.doesNotMatch(homeSource, /type="email"|name="email"/);
});

test("home page and footer carry no unverified counts", () => {
  assert.doesNotMatch(homeSource, /\d[\d,]*\+/);
  assert.doesNotMatch(footer, /\d[\d,]*\+\s*(동물병원|업장|업체)/);
});

test("home page keeps canonical and links only existing top-level routes", () => {
  assert.match(home, /canonical: "\/"/);
  for (const href of homeSource.match(/href: "\/[a-z/]+"/g) ?? []) {
    const route = href.slice(7, -1).split("/")[1];
    assert.ok(fs.existsSync(`app/${route}`), `missing route app/${route}`);
  }
});

test("home css does not override utility text colors on links", () => {
  const css = fs.readFileSync("app/home.css", "utf8");
  assert.doesNotMatch(css, /^\.hm a \{[^}]*color:\s*inherit/m);
  assert.match(
    css,
    /:where\(\.hm\) a:not\(\[class\*="text-"\]\)\s*\{\s*color:\s*inherit/,
  );
});

test("홈 지역 CTA는 서울 고정 링크가 아니라 지역 선택 영역으로 이동하고 제작 메모가 없다", async () => {
  assert.match(homeSource, /id="hm-local"/);
  assert.equal((homeSource.match(/href[:=]\s*"#hm-local"/g) ?? []).length, 2);
  assert.doesNotMatch(homeSource, /임시 일러스트|교체할 수/);
});
