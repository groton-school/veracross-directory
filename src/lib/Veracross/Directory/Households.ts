import { getContactInfo } from '../ContactInfo';
import { Data } from '../Data';

export async function getHouseholdFor(person_id: number) {
  const contact_info = await getContactInfo(person_id);
  return await getHousehold(contact_info.household_id);
}

export async function getHousehold(id: number) {
  const { data, error } = await Data.GET('/households/{id}', {
    params: { path: { id } }
  });
  if (error) {
    throw new Error('Could not retrieve household information', {
      cause: error
    });
  }
  return data.data;
}
