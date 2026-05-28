"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/events";

interface Props {
  type: string;
  name: string;
  sigungu: string;
}

export function BusinessViewTracker({ type, name, sigungu }: Props) {
  useEffect(() => {
    track.businessView({ type, name, sigungu });
  }, [type, name, sigungu]);

  return null;
}
