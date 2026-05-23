import { cacheLife } from 'next/cache';
import { Data } from './Data';
import { operations } from './DataAPI';

export type ContactInfo =
  operations['read_contact_info']['responses']['200']['content']['application/json']['data'];

/** @param id Person ID */
export async function getContactInfo(id: number) {
  'use cache';
  cacheLife('hours');
  const { data, error } = await Data.GET('/contact_info/{id}', {
    params: { path: { id } }
  });
  if (error) {
    throw new Error('Could retrieve contact info', { cause: error });
  }
  return data.data;
}
