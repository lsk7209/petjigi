/**
 * 실제 Google 광고·GA4 요청 허용 여부 판정.
 * 빌드 환경(runtime)과 접속 호스트(hostname)를 모두 만족해야 외부 태그를 로드한다.
 */

export type ThirdPartyRuntime = "production" | "mock" | "off";

/** 운영 canonical 호스트 (www는 308 리디렉션 대상이라 제외) */
export const DEFAULT_CANONICAL_HOSTS: readonly string[] = ["petjigi.kr"];

const RUNTIME_VALUES: readonly string[] = ["production", "mock", "off"];

/**
 * explicit: NEXT_PUBLIC_THIRD_PARTY_RUNTIME (격리 e2e·mock 전용 명시 지정)
 * vercelEnv: Vercel 배포 환경(production | preview | development)
 * 그 외(로컬, 임의 배포, 미설정)는 모두 off.
 */
export function resolveThirdPartyRuntime(input: {
  explicit?: string | null;
  vercelEnv?: string | null;
}): ThirdPartyRuntime {
  if (input.explicit && RUNTIME_VALUES.includes(input.explicit)) {
    return input.explicit as ThirdPartyRuntime;
  }
  return input.vercelEnv === "production" ? "production" : "off";
}

export function isCanonicalHost(
  hostname: string,
  hosts: readonly string[] = DEFAULT_CANONICAL_HOSTS,
): boolean {
  return hosts.includes(hostname.toLowerCase());
}

export function canLoadThirdParty(
  runtime: ThirdPartyRuntime,
  hostname: string,
  hosts: readonly string[] = DEFAULT_CANONICAL_HOSTS,
): boolean {
  return runtime === "production" && isCanonicalHost(hostname, hosts);
}

/** 빌드 시 인라인되는 NEXT_PUBLIC_* 값으로 현재 런타임을 결정 (리터럴 접근 필수) */
export function currentThirdPartyRuntime(): ThirdPartyRuntime {
  return resolveThirdPartyRuntime({
    explicit: process.env.NEXT_PUBLIC_THIRD_PARTY_RUNTIME,
    vercelEnv: process.env.NEXT_PUBLIC_VERCEL_ENV,
  });
}

export function currentCanonicalHosts(): readonly string[] {
  const raw = process.env.NEXT_PUBLIC_CANONICAL_HOSTS;
  const hosts = raw?.split(",").map((h) => h.trim().toLowerCase()).filter(Boolean);
  return hosts?.length ? hosts : DEFAULT_CANONICAL_HOSTS;
}
