import { ArrayElement } from '@battis/typescript-tricks';
import { cacheLife } from 'next/cache';
import { APIResponse, client } from '../Client';

export type Person = ArrayElement<APIResponse<'list_directory_student'>>;

export async function list() {
  'use cache';
  cacheLife('hours');

  const directory: Person[] = [];
  const page_size = 200;
  let page = 0;
  let done = false;
  do {
    page++;
    const { data, error } = await client.GET('/directory/student', {
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
  return (
    (await list())
      // @ts-expect-error 2367 student_id _is_ a number
      .filter((person) => person.student_id === person_id)
      .shift()
  );
}
