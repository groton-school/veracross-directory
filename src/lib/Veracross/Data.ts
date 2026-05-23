import createClient from 'openapi-fetch';
import { getTokens } from './Auth';
import { credentials } from './Credentials';
import { paths } from './DataAPI';

const data = createClient<paths>({
  baseUrl: `https://api.veracross.com/${(await credentials()).school_route}/v3`
});
data.use({
  onRequest: async ({ request }) => {
    request.headers.set(
      'Authorization',
      `Bearer ${(await getTokens()).access_token}`
    );
    return request;
  }
});

export { data as Data };
