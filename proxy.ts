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
      source: '/((?!api|_next/static|_next/image|favicon.ico).*)',
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
    return new NextResponse(null, { status: 401 });
  }

  /**
   * Must be framed by approved host
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors
   *
   * @see https://csplite.com/csp/test355/?rld=1779667554555#bug_Chrome_path_frame-ancestors
   *   ### Known bug in Chrome
   *   Oddly, it allows the page to load on the host, but then following any
   *   link in the iframe (even one started by the path) leads to an error
   */
  const isDev = process.env.NODE_ENV === 'development';
  /*const [_, audience] =
    new URL(request.url).pathname.match(/^\/audience\/([^/]+)/) || [];*/
  const cspHeader =
    `
    default-src 'self';
    script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''};
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://*.veracross.com https://res.cloudinary.com/veracross/image/upload/v1590100679/default.png;
    media-src 'self' blob: data: https://*.amazonaws.com/data.namedrop.io/otu/audio/;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors https://portals.veracross.com` +
    /* `/${audience}/` */ ` https://composer.veracross.com;
    upgrade-insecure-requests;
`;
  // Replace newline characters and spaces
  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, ' ')
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  );

  const response = NextResponse.next({
    request: {
      headers: requestHeaders
    }
  });
  response.headers.set(
    'Content-Security-Policy',
    contentSecurityPolicyHeaderValue
  );

  return response;
}
