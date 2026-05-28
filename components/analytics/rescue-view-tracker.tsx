"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics/events";

interface Props {
  animalId: string;
}

export function RescueViewTracker({ animalId }: Props) {
  useEffect(() => {
    track.rescueView({ animalId });
  }, [animalId]);

  return null;
}
