import { verify } from '#lib/AccessVerifier/actions/verify';
import { Audience } from '#lib/Definitions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  context: RouteContext<'/verify/[audience]/[access]'>
) {
  const { audience, access } = await context.params;

  /*
   * FIXME: verify embed needs to redirect to a timed refresh page
   *   Right now the verification expires after an hour and a full refresh of
   *   the embedding page is required to reconnect.
   */
  return new NextResponse(null, {
    status: (await verify(audience as Audience, access)) ? 200 : 401
  });
}
