'use server';

import { Audience } from '#lib/Definitions';
import { cookies } from 'next/headers';
import { COOKIE_NAME, verifyAccess } from '../SessionManager';

export async function verify(audience: Audience, access: string) {
  const { token, expires } = await verifyAccess(audience, access);
  if (token) {
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires,
      path: '/',
      partitioned: true
    });
    return true;
  }
  return false;
}
