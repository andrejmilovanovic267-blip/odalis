"use client";

import { useEffect } from "react";
import { track } from "@/lib/fbpixel";

/**
 * Client component to track ViewContent event on treatment pages
 * Must be used inside a server component page
 */
export function TreatmentPageTracker() {
  useEffect(() => {
    track("ViewContent", { content_category: "treatment" });
  }, []);

  return null;
}
