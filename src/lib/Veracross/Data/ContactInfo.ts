import { cacheLife } from 'next/cache';
import { APIResponse, client } from './Client';

export type ContactInfo = APIResponse<'read_contact_info'>;

/** @param id Person ID */
export async function read(id: number) {
  'use cache';
  cacheLife('hours');
  const { data, error } = await client.GET('/contact_info/{id}', {
    params: { path: { id } }
  });
  if (error) {
    console.error(error);
    return {} as ContactInfo;
  }
  return data.data;
}
