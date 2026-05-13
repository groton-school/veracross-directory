import { Auth } from '@/src/lib/Veracross';
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.redirect(await Auth.authorizationURL());
}
