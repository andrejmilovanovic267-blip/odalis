"use client";

import { useEffect, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";

declare global {
  interface Window {
    fbq?: (
      action: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

export function MetaPixelPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastUrlRef = useRef<string>("");

  useEffect(() => {
    // Build current URL from pathname and searchParams
    const currentUrl = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");

    // Prevent duplicate PageView events for the same URL
    if (currentUrl === lastUrlRef.current) {
      return;
    }

    // Update last URL reference
    lastUrlRef.current = currentUrl;

    // Send PageView only if fbq is available
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq("track", "PageView");
    }
  }, [pathname, searchParams]);

  return null;
}
