"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/events";

interface Props {
  slug: string;
  title: string;
}

export function ConditionViewTracker({ slug, title }: Props) {
  useEffect(() => {
    track.conditionView({ slug, title });
  }, [slug, title]);

  return null;
}
