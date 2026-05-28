"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/events";

interface Props {
  slug: string;
  title: string;
  category: number;
}

export function GuideViewTracker({ slug, title, category }: Props) {
  useEffect(() => {
    track.guideView({ slug, title, category });
  }, [slug, title, category]);

  return null;
}
