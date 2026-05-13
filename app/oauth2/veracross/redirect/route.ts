import { handleOAuth2Redirect } from '@lib/Veracross/Tokens';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  await handleOAuth2Redirect(new URL(request.url));
  return Response.redirect('/audience/facstaff');
}
