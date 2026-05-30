import { ArrayElement } from '@battis/typescript-tricks';
import { cacheLife } from 'next/cache';
import { APIResponse, client } from '../Client';

export type Household = ArrayElement<APIResponse<'list_directory_household'>>;

export async function list() {
  'use cache';
  cacheLife('hours');

  const directory: Household[] = [];
  const page_size = 200;
  let page = 0;
  let done = false;
  do {
    page++;
    const { data, error } = await client.GET('/directory/household', {
      params: { header: { 'X-Page-Number': page, 'X-Page-Size': page_size } }
    });
    if (error) {
      throw new Error('Could not retrieve household directory listing', {
        cause: error
      });
    }
    directory.push(...data.data);
    done = data.data.length < page_size;
  } while (!done);
  return directory;
}

export async function read(household_id: number) {
  return (await list())
    .filter((household) => household.household_id === household_id)
    .shift();
}
