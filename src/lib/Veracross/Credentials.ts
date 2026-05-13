import { LazySecrets } from '@battis/lazy-secrets';

const CREDENTIALS = 'VERACROSS_CREDENTIALS';
const SCOPES = ['directory.staff_faculty:list', 'contact_info:list'];

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
