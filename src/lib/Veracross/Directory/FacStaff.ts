import { ArrayElement } from '@battis/typescript-tricks';
import { cacheLife } from 'next/cache';
import { Data } from '../Data';
import { operations } from '../DataAPI';

export type FacStaff = ArrayElement<
  operations['list_directory_staff_faculty']['responses']['200']['content']['application/json']['data']
>;

export async function listFacStaff() {
  'use cache';
  cacheLife('hours');

  const directory: FacStaff[] = [];
  const page_size = 200;
  let page = 0;
  let done = false;
  do {
    page++;
    const { data, error } = await Data.GET('/directory/staff_faculty', {
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

export async function getFacStaff(person_id: number) {
  return (await listFacStaff())
    .filter((person) => person.person_id === person_id)
    .shift();
}
