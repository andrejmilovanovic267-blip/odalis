import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware: Hard override for /robots.txt
 * 
 * This middleware intercepts ALL requests to /robots.txt and returns a clean,
 * valid robots.txt response that cannot be modified by CDN/proxy layers.
 * 
 * CONFLICT RESOLUTION:
 * - Problem: CDN/proxy layer (Cloudflare/Workers/hosting) was injecting
 *   non-standard directive "Content-Signal: search=yes,ai-train=no" into
 *   robots.txt response, causing Lighthouse "Unknown directive" errors.
 * - Solution: Middleware runs BEFORE any route handlers or CDN transforms,
 *   returning a hardcoded valid robots.txt that cannot be modified downstream.
 * - This ensures /robots.txt always returns clean, standard-compliant content.
 * 
 * Purpose: Prevent CDN/Cloudflare/Workers from injecting non-standard directives
 * like "Content-Signal: search=yes,ai-train=no" which cause Lighthouse errors.
 * 
 * Verification:
 *   curl -i https://odalis.rs/robots.txt
 *   Expected: Plain text with only standard directives, no Content-Signal
 * 
 * If Content-Signal still appears after this middleware:
 *   1. Check Cloudflare: Rules > Transform Rules, Workers & Pages, Apps
 *   2. Remove any custom logic that adds Content-Signal to robots.txt body
 *   3. If Worker exists, add exception: if (url.pathname === '/robots.txt') return fetch(origin)
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only intercept /robots.txt requests
  if (pathname === '/robots.txt') {
    const robotsContent = 'User-agent: *\nAllow: /\nSitemap: https://odalis.rs/sitemap.xml\n'

    return new NextResponse(robotsContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=0, must-revalidate',
      },
    })
  }

  // For all other requests, continue normally
  return NextResponse.next()
}

// Only run middleware for /robots.txt path
export const config = {
  matcher: '/robots.txt',
}
