'use server';

import { Audience } from '#lib/Definitions';
import { cookies } from 'next/headers';
import { COOKIE_NAME, verifySession } from '../SessionManager';

export async function isVerified(audience: Audience) {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifySession(audience, token);
}
