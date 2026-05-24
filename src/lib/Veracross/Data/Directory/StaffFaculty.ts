import { ArrayElement } from '@battis/typescript-tricks';
import { cacheLife } from 'next/cache';
import { client } from '../Client';
import { operations } from '../spec';

export type Person = ArrayElement<
  operations['list_directory_staff_faculty']['responses']['200']['content']['application/json']['data']
>;

export async function list() {
  'use cache';
  cacheLife('hours');

  const directory: Person[] = [];
  const page_size = 200;
  let page = 0;
  let done = false;
  do {
    page++;
    const { data, error } = await client.GET('/directory/staff_faculty', {
      params: { header: { 'X-Page-Number': page, 'X-Page-Size': page_size } }
    });
    if (error) {
      throw new Error('Could not retrieve faculty/staff directory listing', {
        cause: error
      });
    }
    directory.push(...data.data);
    done = data.data.length < page_size;
  } while (!done);
  return directory;
}

export async function read(person_id: number) {
  return (await list())
    .filter((person) => person.person_id === person_id)
    .shift();
}
