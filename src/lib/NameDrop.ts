import 'server-only';

import {
  DateTimeString,
  EmailString,
  URLString,
  UUIDString
} from '@battis/descriptive-types';
import { LazySecrets } from '@battis/lazy-secrets';
import { cacheLife } from 'next/cache';

export type Recording = {
  firstname: string;
  lastname: string;
  uniqueid: UUIDString;
  email: EmailString;
  recording: URLString;
  datecreated: DateTimeString<'YYYY-MM-DD HH:MM:SS'>;
};

type Recordings = {
  picLogo: URLString;
  picLogoShadow: boolean;
  directory: Recording[];
  subOrgs: [];
  exporting: boolean;
};

let _recordings: Recordings | undefined = undefined;

export async function recordings() {
  'use cache';
  cacheLife('hours');
  _recordings = await (
    await fetch('https://api.namedrop.io/otu/org/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(await LazySecrets.get('NAMEDROP_CREDENTIALS'))
    })
  ).json();

  return _recordings?.directory;
}

export async function recording(email: EmailString) {
  return (await recordings())?.find((recording) => recording.email === email);
}
