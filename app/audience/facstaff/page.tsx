import FacStaff from '@components/FacStaff';
import { recordings } from '@lib/NameDrop';
import * as Veracross from '@lib/Veracross';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

export default async function Page() {
  const [
    { data: { data: directory } = {} },
    { directory: pronunciations } = {}
  ] = await Promise.all([
    Veracross.Data.GET('/directory/staff_faculty'),
    recordings()
  ]);

  return (
    <>
      <h1>Faculty & Staff</h1>
      <InputGroup>
        <FormControl type="text" />
        <Button>Search</Button>
      </InputGroup>
      {directory?.map((person, i) => (
        <FacStaff
          person={person}
          recording={pronunciations?.find((rec) => rec.email === person.email)}
          key={i}
        />
      ))}
    </>
  );
}
