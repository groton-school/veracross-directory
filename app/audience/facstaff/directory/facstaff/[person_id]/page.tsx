import { Detail } from '@/src/components/FacStaff/Detail';
import * as NameDrop from '@/src/lib/NameDrop';
import * as Veracross from '@/src/lib/Veracross';

type PathParameters = { params: Promise<{ person_id: string }> };

export default async function Page({ params }: PathParameters) {
  const person_id = parseInt((await params).person_id);
  const person = (await Veracross.Directory.listFacStaff()).filter(
    (p) => p.person_id === person_id
  )[0];

  console.log({ params, person });
  return (
    <Detail
      person={person}
      recording={await NameDrop.recording(person.email)}
    />
  );
}
