import createClient from 'openapi-fetch';
import { getTokens } from '../Auth';
import { credentials } from '../Credentials';
import { paths } from './spec';

export const client = createClient<paths>({
  baseUrl: `https://api.veracross.com/${(await credentials()).school_route}/v3`
});
client.use({
  onRequest: async ({ request }) => {
    request.headers.set(
      'Authorization',
      `Bearer ${(await getTokens()).access_token}`
    );
    return request;
  }
});
