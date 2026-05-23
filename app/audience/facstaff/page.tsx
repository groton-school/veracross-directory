import { Item } from '@/src/components/FacStaff/Item';
import * as NameDrop from '@/src/lib/NameDrop';
import * as Veracross from '@/src/lib/Veracross';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

export default async function Page() {
  return (
    <>
      <h1>Faculty & Staff</h1>
      <InputGroup>
        <FormControl type="text" />
        <Button>Search</Button>
      </InputGroup>
      {(await Veracross.Directory.listFacStaff())?.map(async (person, i) => (
        <Item
          key={i}
          person={person}
          recording={await NameDrop.recording(person.email)}
        />
      ))}
    </>
  );
}
