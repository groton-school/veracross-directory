import { cacheLife } from 'next/cache';
import { client } from './Client';
import { operations } from './spec';

export type ContactInfo =
  operations['read_contact_info']['responses']['200']['content']['application/json']['data'];

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
