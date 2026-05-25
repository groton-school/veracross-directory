import { NextRequest } from 'next/server';

export async function GET(
  _: NextRequest,
  context: RouteContext<'/audience/[audience]'>
) {
  const audience = (await context.params).audience;
  return await new Promise<Response>((resolve) =>
    setTimeout(
      () =>
        resolve(
          Response.redirect(
            new URL(
              `/audience/${audience}/directory/${audience}`,
              process.env.PUBLIC_URL
            )
          )
        ),
      50
    )
  );
}
