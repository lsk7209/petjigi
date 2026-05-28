"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/events";

interface Props {
  sigungu: string;
  count: number;
}

export function ShelterViewTracker({ sigungu, count }: Props) {
  useEffect(() => {
    track.shelterView({ sigungu, count });
  }, [sigungu, count]);

  return null;
}
