import { NextRequest, NextResponse } from 'next/server';

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    {
      source: '/((?!api|_next\\/static|_next\\/image|favicon\\.ico).*)',
      missing: [
        { type: 'header', key: 'next-router-prefetch' },
        { type: 'header', key: 'purpose', value: 'prefetch' }
      ]
    }
  ]
};

/**
 * Default content security policy
 *
 * @see https://nextjs.org/docs/app/guides/content-security-policy
 */
export function proxy(request: NextRequest) {
  /**
   * Must be inside an <iframe>
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Sec-Fetch-Dest
   */
  if (request.headers.get('sec-fetch-dest') !== 'iframe') {
    return new NextResponse(undefined, { status: 400 });
  }

  return NextResponse.next({ request });
}
