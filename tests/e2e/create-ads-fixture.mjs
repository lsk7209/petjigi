// 광고 판정 브라우저 검증용 합성 fixture DB. 운영 접속·시크릿 없음.
import { createClient } from '@libsql/client';
import { mkdirSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { seedBody } from './seed-body.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
export const FIXTURE_FILE = resolve(root, '.seo-cache/fixtures/ads-decision.sqlite');
mkdirSync(dirname(FIXTURE_FILE), { recursive: true });
rmSync(FIXTURE_FILE, { force: true });
const client = createClient({ url: `file:${FIXTURE_FILE.replaceAll(String.fromCharCode(92), '/')}` });
const seedSlugs = new Set([
  'dog-adoption-checklist', 'dog-food-label-guide', 'animal-hospital-guide',
  'pet-insurance-before-joining', 'indoor-cat-enrichment-guide', 'memorial-ceremony',
  'pet-insurance-comparison-method',
  'microchip-registration-complete-guide', 'shelter-animal-adoption-guide', 'carrier-training-guide',
  'pet-treats-guide', 'dog-nutrition-basics', 'cat-food-guide', 'pet-health-checkup-guide',
  'pet-first-aid-guide', 'cat-litter-guide', 'cat-indoor-safety-guide', 'multi-pet-household-guide',
  'petloss-care-guide', 'memorial-cost', 'pet-insurance-claim-guide',
  'pet-insurance-deductible-guide', 'pet-insurance-exclusions-guide',
  'animal-registration-change-cancel-guide', 'dog-adoption-complete-guide', 'cat-indoor-enrichment-guide',
  'dog-liver-disease-early-signs', 'dog-skin-lump-guide', 'cat-food-allergy-elimination-diet',
]);
const literal = (node, source, constants) => {
  if (!node || node.kind === ts.SyntaxKind.NullKeyword) return null;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isNumericLiteral(node)) return Number(node.text);
  if (node.kind === ts.SyntaxKind.TrueKeyword) return true;
  if (node.kind === ts.SyntaxKind.FalseKeyword) return false;
  if (ts.isArrayLiteralExpression(node)) return node.elements.map((element) => literal(element, source, constants));
  if (ts.isCallExpression(node) && node.expression.getText(source) === 'JSON.stringify' && node.arguments.length === 1)
    return JSON.stringify(literal(node.arguments[0], source, constants));
  if (ts.isCallExpression(node) && node.expression.getText(source) === 'scheduleDate' && node.arguments.length === 1) {
    const helper = source.statements.find((statement) => ts.isFunctionDeclaration(statement) && statement.name?.text === 'scheduleDate')?.getText(source);
    const start = helper?.match(/const start = new Date\("([^"]+)"\)/)?.[1];
    const hours = helper?.match(/index \* (\d+) \* 60 \* 60 \* 1000/)?.[1];
    if (!start || !hours) throw new Error(`Unsupported scheduleDate helper in ${source.fileName}`);
    return new Date(new Date(start).getTime() + literal(node.arguments[0], source, constants) * Number(hours) * 60 * 60 * 1000).toISOString();
  }
  if (ts.isIdentifier(node) && node.text === 'NOW') return '2026-10-11T12:00:00.000Z';
  if (ts.isIdentifier(node) && constants.has(node.text)) return literal(constants.get(node.text), source, constants);
  throw new Error(`Unsupported seed expression: ${node.getText(source).slice(0, 80)}`);
};
const coreSeeds = new Map();
const visit = (node, source, constants) => {
  if (ts.isObjectLiteralExpression(node)) {
    const fields = new Map(node.properties.filter(ts.isPropertyAssignment).map((p) => [p.name.getText(source), p.initializer]));
    const slugNode = fields.get('slug');
    if (slugNode && seedSlugs.has(literal(slugNode, source, constants))) {
      const slug = literal(slugNode, source, constants);
      const seed = Object.fromEntries([...fields].map(([name, value]) => [name, literal(value, source, constants)]));
      const previous = coreSeeds.get(slug);
      if (previous && previous.type === seed.type) throw new Error(`Duplicate content seed: ${slug}`);
      const publicType = slug === 'pet-insurance-claim-guide' ? 'blog' : 'guide';
      if (!previous || seed.type === publicType) coreSeeds.set(slug, seed); // observed public claim route is blog; fixture must not mask route mismatch
    }
  }
  ts.forEachChild(node, (child) => visit(child, source, constants));
};
for (const file of readdirSync(resolve(root, 'db/seeds')).filter((name) => name.endsWith('.ts'))) {
  const seedFile = resolve(root, 'db/seeds', file);
  const source = ts.createSourceFile(seedFile, readFileSync(seedFile, 'utf8'), ts.ScriptTarget.Latest, true);
  const constants = new Map();
  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (ts.isIdentifier(declaration.name) && declaration.initializer) constants.set(declaration.name.text, declaration.initializer);
    }
  }
  visit(source, source, constants);
}
for (const slug of seedSlugs) if (![...coreSeeds.values()].some((seed) => seed.slug === slug)) throw new Error(`Missing content seed: ${slug}`);
try {
  const migrations = resolve(root, 'db/migrations');
  for (const name of readdirSync(migrations).filter(n => /^\d+.*\.sql$/.test(n)).sort()) {
    for (const sql of readFileSync(resolve(migrations, name), 'utf8').split('--> statement-breakpoint')) {
      if (sql.trim()) await client.execute(sql);
    }
  }
  const d = '2026-08-01T00:00:00.000Z';
  await client.execute({
    sql: 'INSERT INTO regions (code, sido, sido_slug, sigungu, sigungu_slug, full_name) VALUES (?,?,?,?,?,?)',
    args: ['41590', '경기도', 'gyeonggi', '화성시', 'hwaseong', '경기도 화성시'],
  });
  for (const [id, type, category, name] of [['b-funeral', 'funeral', 6, '합성추모'], ['b-vet', 'vet', 3, '합성병원']]) {
    await client.execute({
      sql: 'INSERT INTO businesses (id,type,category,name,address,address_sido,address_sigungu,status,source,last_synced_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
      args: [id, type, category, name, '경기도 화성시 합성로 1', '경기도', '화성시', 'active', 'fixture', d, d, d],
    });
  }
  await client.execute({
    sql: 'INSERT INTO businesses (id,type,category,name,address,address_sido,address_sigungu,status,source,last_synced_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
    args: ['b-sale-mismatch', 'sale', 1, '합성주소확인', '경기도 수원시 확인로 1', '경기도', '화성시', 'active', 'fixture', '', d, d],
  });
  await client.execute({
    sql: 'INSERT INTO contents (id,slug,type,category,title,body,author_name,status,ymyl,published_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
    args: ['c-guide', 'fixture-guide', 'guide', 5, 'QA 합성 가이드', '<h2>합성</h2><p>합성 본문입니다.</p>', 'QA', 'published', 0, d, d, d],
  });
  for (const [slug, type, category] of [['pet-insurance-guide', 'blog', 4]]) {
    await client.execute({
      sql: 'INSERT INTO contents (id,slug,type,category,title,body,author_name,status,ymyl,published_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
      args: [`c-${slug}`, slug, type, category, `QA 합성 ${slug}`, slug === 'microchip-registration-complete-guide' ? seedBody(slug) : '<h2>합성</h2><p>합성 본문입니다.</p>', 'QA', 'published', 0, d, d, d],
    });
  }
  for (const seed of coreSeeds.values()) {
    const columns = ['id', 'slug', 'type', 'category', 'title', 'subtitle', 'metaTitle', 'metaDescription', 'body', 'authorName', 'authorCredential', 'reviewedAt', 'reviewerName', 'status', 'ymyl', 'sources', 'disclaimer', 'publishedAt', 'createdAt', 'updatedAt'];
    const dbColumns = ['id', 'slug', 'type', 'category', 'title', 'subtitle', 'meta_title', 'meta_description', 'body', 'author_name', 'author_credential', 'reviewed_at', 'reviewer_name', 'status', 'ymyl', 'sources', 'disclaimer', 'published_at', 'created_at', 'updated_at'];
    const values = columns.map((name) => {
      const value = seed[name] ?? null;
      if (name === 'sources') return value === null ? null : (typeof value === 'string' ? value : JSON.stringify(value));
      if (name === 'ymyl') return Number(value);
      return value;
    });
    await client.execute({
      sql: `INSERT INTO contents (${dbColumns.join(',')}) VALUES (${dbColumns.map(() => '?').join(',')})`,
      args: values,
    });
  }
  // 비공개 보호 검증용: 검토 대기·미래 발행 콘텐츠는 어떤 경로로도 공개되면 안 된다.
  for (const [slug, status, publishedAt] of [['fixture-draft', 'draft', d], ['fixture-future', 'published', '2099-01-01T00:00:00.000Z']]) {
    await client.execute({
      sql: 'INSERT INTO contents (id,slug,type,category,title,body,author_name,status,ymyl,published_at,created_at,updated_at) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
      args: [`c-${slug}`, slug, 'guide', 5, `QA 비공개 ${slug}`, '<h2>비공개</h2><p>공개되면 안 됩니다.</p>', 'QA', status, 0, publishedAt, d, d],
    });
  }
  console.log(JSON.stringify({ FIXTURE_FILE, productionAccess: false }));
} finally {
  client.close();
}
