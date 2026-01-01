/**
 * Unified scroll utility for in-page navigation
 * Ensures consistent, reliable scrolling behavior across the application
 */

/**
 * Scrolls to a target element with proper offset for fixed header
 * Uses scrollIntoView which respects CSS scroll-margin-top automatically
 * 
 * @param selector - CSS selector (e.g., '#hero', '#kontakt')
 * @param options - Optional scroll behavior options
 */
export function scrollToSection(
  selector: string,
  options: {
    behavior?: ScrollBehavior;
    block?: ScrollLogicalPosition;
    inline?: ScrollLogicalPosition;
  } = {}
): void {
  // Find the target element - try immediately first
  let target = document.querySelector(selector);
  
  // If not found, retry after a short delay (handles dynamic rendering)
  if (!target) {
    setTimeout(() => {
      const retryTarget = document.querySelector(selector);
      if (retryTarget) {
        retryTarget.scrollIntoView({
          behavior: options.behavior || 'smooth',
          block: options.block || 'start',
          inline: options.inline || 'nearest',
        });
      }
    }, 100);
    return;
  }

  // Use scrollIntoView with proper options
  // scroll-margin-top on sections handles the header offset automatically
  // This works from ANY scroll position and respects CSS scroll-margin
  // The CSS scroll-margin-top ensures proper spacing below fixed header
  target.scrollIntoView({
    behavior: options.behavior || 'smooth',
    block: options.block || 'start',
    inline: options.inline || 'nearest',
  });
}

/**
 * Get header height for manual offset calculations (fallback)
 */
export function getHeaderHeight(): number {
  return window.innerWidth >= 768 ? 96 : 80;
}
