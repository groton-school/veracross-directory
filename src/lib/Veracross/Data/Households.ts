import { cacheLife } from 'next/cache';
import { APIResponse, client } from './Client';
import * as ContactInfo from './ContactInfo';

export type Household = APIResponse<'read_households'>;

export async function readFor(person_id: number) {
  const contact_info = await ContactInfo.read(person_id);
  return await read(contact_info.household_id);
}

export async function read(id: number) {
  'use cache';
  cacheLife('hours');
  const { data, error } = await client.GET('/households/{id}', {
    params: { path: { id } }
  });
  if (error) {
    console.error(error);
    return {} as Household;
  }
  return data.data;
}
