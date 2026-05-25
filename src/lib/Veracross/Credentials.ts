import 'server-only';

import { LazySecrets } from '@battis/lazy-secrets';

const CREDENTIALS = 'VERACROSS_CREDENTIALS';
const SCOPES = [
  'contact_info:list',
  'contact_info:read',
  'directory.configurations:list',
  'directory.household:list',
  'directory.preferences.household:list',
  'directory.preferences.household:read',
  'directory.preferences.people:list',
  'directory.preferences.people:read',
  'directory.staff_faculty:list',
  'directory.student:list',
  'emergency_contacts:list',
  'emergency_contacts:read',
  'households:list',
  'households:read'
];

type Credentials = {
  client_id: string;
  client_secret: string;
  school_route: string;
  redirect_uri: string;
  scope: string;
};

let _credentials: Credentials | undefined = undefined;

export async function credentials() {
  if (!_credentials) {
    // Skip Google Cloud Secret Manager initialization during build
    if (process.env.NEXT_PHASE === 'phase-production-build') {
      return {} as Credentials;
    }
    LazySecrets.init({ fallback: true });
    const secret = await LazySecrets.get<Credentials>(CREDENTIALS);
    if (secret !== undefined && typeof secret !== 'string') {
      secret.scope = SCOPES.join(' ');
      _credentials = secret;
    } else {
      throw new Error('Credentials not found');
    }
  }
  return _credentials;
}
