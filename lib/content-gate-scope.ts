import { execFileSync } from "node:child_process";
import {
  includeEntireFiles,
  parseAddedLineRanges,
  type ChangedLineRange,
} from "./content-risk-gate";

/**
 * 콘텐츠 게이트가 "무엇을 검사할지"를 정하는 모듈.
 *  - local : 기준(--base) 없음, CI 아님 → 작업 트리 vs HEAD + 추적되지 않는 신규 seed (미커밋 변경)
 *  - base  : --base=<ref> 또는 CI의 PR/push 기준 → merge-base(ref, HEAD)..HEAD 의 커밋된 변경
 * CI에서 기준을 알 수 없거나 ref/이력이 없으면 "변경 없음"으로 통과시키지 않고 오류로 중단한다.
 */

export class GateScopeError extends Error {}

export interface GateScope {
  mode: "local" | "base";
  base: string | null;
  mergeBase: string | null;
  rangesByFile: Map<string, ChangedLineRange[]>;
}

export interface GateScopeOptions {
  cwd: string;
  baseArg?: string;
  env?: Record<string, string | undefined>;
}

const SAFE_REF = /^[A-Za-z0-9._/~^@{}-]+$/;
const SEEDS_DIR = "db/seeds";
const ZERO_SHA = /^0+$/;

function git(cwd: string, args: string[]): string {
  return execFileSync("git", args, { cwd, encoding: "utf8", maxBuffer: 16 * 1024 * 1024, stdio: ["ignore", "pipe", "pipe"] });
}

function tryGit(cwd: string, args: string[]): string | null {
  try {
    return git(cwd, args).trim();
  } catch {
    return null;
  }
}

/** CI에서 --base가 없을 때 이벤트 정보로 기준 ref를 추론한다. 추론 불가면 null. */
export function inferCiBase(env: Record<string, string | undefined>): string | null {
  if (env.GITHUB_BASE_REF) return `origin/${env.GITHUB_BASE_REF}`;
  const before = env.GITHUB_EVENT_BEFORE;
  if (before && !ZERO_SHA.test(before)) return before;
  return null;
}

export function resolveGateScope({ cwd, baseArg, env = process.env }: GateScopeOptions): GateScope {
  const isCi = env.CI === "true" || env.GITHUB_ACTIONS === "true";
  const base = baseArg || (isCi ? inferCiBase(env) : null);

  if (!base) {
    if (isCi) {
      throw new GateScopeError("CI에서는 --base=<ref>가 필요합니다(기준 없이 HEAD와 비교하면 커밋된 변경을 검사하지 못합니다).");
    }
    return {
      mode: "local",
      base: null,
      mergeBase: null,
      rangesByFile: includeEntireFiles(
        parseAddedLineRanges(git(cwd, ["diff", "--unified=0", "--no-ext-diff", "HEAD", "--", SEEDS_DIR])),
        git(cwd, ["ls-files", "--others", "--exclude-standard", "--", SEEDS_DIR]).split(/\r?\n/).filter(Boolean),
      ),
    };
  }

  if (!SAFE_REF.test(base)) throw new GateScopeError(`유효하지 않은 --base 값: ${base}`);
  if (tryGit(cwd, ["rev-parse", "--verify", "--quiet", `${base}^{commit}`]) === null) {
    throw new GateScopeError(`기준 ref를 찾을 수 없습니다: ${base} (CI라면 actions/checkout fetch-depth: 0 필요)`);
  }
  const mergeBase = tryGit(cwd, ["merge-base", base, "HEAD"]);
  if (!mergeBase) {
    throw new GateScopeError(`${base}와 HEAD의 공통 조상을 찾을 수 없습니다(얕은 clone이면 fetch-depth: 0 필요).`);
  }
  const diff = git(cwd, ["diff", "--unified=0", "--no-ext-diff", `${mergeBase}..HEAD`, "--", SEEDS_DIR]);
  return { mode: "base", base, mergeBase, rangesByFile: parseAddedLineRanges(diff) };
}

export type GateVerdict = "NO_RECORDS_TO_CHECK" | "CHECKED_NO_BLOCKERS" | "BLOCKED";

/** '검사 대상 0건'과 '검사 후 차단 0건'을 구분해 보고한다. */
export function gateVerdict(checkedRecords: number, blockers: number): GateVerdict {
  if (blockers > 0) return "BLOCKED";
  return checkedRecords === 0 ? "NO_RECORDS_TO_CHECK" : "CHECKED_NO_BLOCKERS";
}

export interface ManifestEntry {
  slug: string;
  file?: string;
}

/** 반영 대상 manifest(slug 배열)를 실제 레코드에 대응시킨다. 대응하지 못한 항목이 있으면 오류. */
export function selectManifestRecords<T extends { slug: string }>(records: T[], slugs: string[]): T[] {
  const bySlug = new Map<string, T[]>();
  for (const record of records) bySlug.set(record.slug, [...(bySlug.get(record.slug) ?? []), record]);
  const missing = slugs.filter((slug) => !bySlug.has(slug));
  if (missing.length > 0) throw new GateScopeError(`manifest slug를 seed에서 찾을 수 없습니다: ${missing.join(", ")}`);
  return slugs.flatMap((slug) => bySlug.get(slug) ?? []);
}
