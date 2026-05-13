import FacStaff from '@components/FacStaff';
import * as Veracross from '@lib/Veracross';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

export default async function Page() {
  const { data: { data: directory } = {} } = await Veracross.Data.GET(
    '/directory/staff_faculty'
  );
  return (
    <>
      <h1>Faculty & Staff</h1>
      <InputGroup>
        <FormControl type="text" />
        <Button>Search</Button>
      </InputGroup>
      {directory?.map((person, i) => (
        <FacStaff person={person} key={i} />
      ))}
    </>
  );
}
