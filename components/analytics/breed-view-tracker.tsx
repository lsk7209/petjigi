"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/events";

interface Props {
  slug: string;
  nameKo: string;
  species: string;
}

export function BreedViewTracker({ slug, nameKo, species }: Props) {
  useEffect(() => {
    track.breedView({ slug, nameKo, species });
  }, [slug, nameKo, species]);

  return null;
}
