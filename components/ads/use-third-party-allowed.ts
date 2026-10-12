"use client";

import { useSyncExternalStore } from "react";
import {
  canLoadThirdParty,
  currentCanonicalHosts,
  currentThirdPartyRuntime,
} from "@/lib/privacy/third-party-runtime";

const subscribeNever = () => () => {};

/** 운영 canonical 호스트의 production 런타임에서만 true. 서버·첫 하이드레이션은 false. */
export function useThirdPartyAllowed(): boolean {
  return useSyncExternalStore(
    subscribeNever,
    () => canLoadThirdParty(currentThirdPartyRuntime(), window.location.hostname, currentCanonicalHosts()),
    () => false,
  );
}
