import { Data } from './Data';

/** @param id Person ID */
export async function getContactInfo(id: number) {
  const { data, error } = await Data.GET('/contact_info/{id}', {
    params: { path: { id } }
  });
  if (error) {
    throw new Error('Could retrieve contact info', { cause: error });
  }
  return data.data;
}
