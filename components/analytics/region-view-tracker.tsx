"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/events";

interface Props {
  sido?: string;
  sigungu?: string;
  type?: string;
}

export function RegionViewTracker({ sido, sigungu, type }: Props) {
  useEffect(() => {
    if (sido) track.regionView({ sido, sigungu, type });
  }, [sido, sigungu, type]);

  return null;
}
