"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/events";

export function InsuranceCompareTracker() {
  useEffect(() => {
    track.insuranceCompareView();
  }, []);

  return null;
}
