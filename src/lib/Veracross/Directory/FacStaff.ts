import { ArrayElement } from '@battis/typescript-tricks';
import { Data } from '../Data';
import { operations } from '../DataAPI';

export type FacStaff = ArrayElement<
  operations['list_directory_staff_faculty']['responses']['200']['content']['application/json']['data']
>;

export async function listFacStaff() {
  const { data, error } = await Data.GET('/directory/staff_faculty');
  if (error) {
    throw new Error('Could not retrieve faculty/staff directory listing', {
      cause: error
    });
  }
  return data.data;
}
