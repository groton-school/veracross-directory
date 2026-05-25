import { verify } from '#lib/AccessVerifier/actions/verify';
import { Audience } from '#lib/Definitions';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  _: NextRequest,
  context: RouteContext<'/verify/[audience]/[access]'>
) {
  const { audience, access } = await context.params;
  return new NextResponse(null, {
    status: (await verify(audience as Audience, access)) ? 200 : 401
  });
}
