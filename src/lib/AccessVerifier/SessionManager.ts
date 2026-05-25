import 'server-only';

import { Audience, SessionPayload } from '#lib/Definitions';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

type EncodedKey = Uint8Array<ArrayBuffer>;

export const COOKIE_NAME = '__Host-Http-session';
const ALGORITHM = 'HS256';

const encoder = new TextEncoder();
const verifiers: Partial<
  Record<Audience, { access: string | undefined; verifier: EncodedKey }>
> = {
  facstaff: {
    access: process.env.FACSTAFF_ACCESS,
    verifier: encoder.encode(process.env.FACSTAFF_VERIFIER)
  },
  student: {
    access: process.env.STUDENT_ACCESS,
    verifier: encoder.encode(process.env.STUDENT_VERIFIER)
  },
  parent: {
    access: process.env.PARENT_ACCESS,
    verifier: encoder.encode(process.env.PARENT_VERIFIER)
  }
};

export async function encrypt(payload: SessionPayload, key: EncodedKey) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: ALGORITHM })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(key);
}

export async function decrypt(token: string | undefined = '', key: EncodedKey) {
  try {
    const { payload } = await jwtVerify<SessionPayload>(token, key, {
      algorithms: [ALGORITHM]
    });
    return payload;
  } catch (_) {
    return undefined;
  }
}

export async function verifyAccess(audience: Audience, access: string) {
  const expires = new Date(Date.now() + 60 * 60 * 1000);
  if (
    verifiers[audience] &&
    verifiers[audience].access &&
    verifiers[audience].access === access &&
    verifiers[audience].verifier
  ) {
    const token = await encrypt({ audience }, verifiers[audience].verifier);
    return { token, expires };
  } else {
    return {};
  }
}

export async function verifySession(audience: Audience, token?: string) {
  if (token && audience in verifiers && verifiers[audience]?.verifier) {
    const payload = await decrypt(token, verifiers[audience].verifier);
    return (
      payload?.audience &&
      payload.exp &&
      payload?.audience === audience &&
      Date.now() < payload.exp * 1000
    );
  }
  return false;
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}
