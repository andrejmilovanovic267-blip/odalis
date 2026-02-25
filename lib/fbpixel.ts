/**
 * Meta Pixel (Facebook Pixel) tracking helper
 * Safely tracks conversion events without breaking SSR/hydration
 */

declare global {
  interface Window {
    fbq?: (
      action: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
  }
}

/**
 * Track a Meta Pixel event
 * @param eventName - Event name (e.g., 'Lead', 'Schedule', 'ViewContent')
 * @param params - Optional event parameters
 */
export function track(eventName: string, params?: Record<string, unknown>): void {
  // Guard: Only run in browser environment
  if (typeof window === "undefined") {
    return;
  }

  // Guard: Only track if fbq is available
  if (!window.fbq) {
    return;
  }

  // Track the event
  if (params) {
    window.fbq("track", eventName, params);
  } else {
    window.fbq("track", eventName);
  }
}
