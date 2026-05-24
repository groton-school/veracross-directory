import { Detail } from '@/src/components/FacStaff/Detail';
import { Loading } from '@/src/components/Loading';
import { recording } from '@/src/lib/NameDrop';
import { Data } from '@/src/lib/Veracross';
import { connection } from 'next/server';
import { Suspense } from 'react';

type PathParameters = { person_id: string };

export default function Page({ params }: { params: Promise<PathParameters> }) {
  return (
    <Suspense fallback={<Loading />}>
      <DynamicContent params={params} />
    </Suspense>
  );
}

async function DynamicContent({ params }: { params: Promise<PathParameters> }) {
  await connection();
  const person_id = parseInt((await params).person_id);
  if (person_id) {
    const [person, contact_info] = await Promise.all([
      Data.Directory.StaffFaculty.read(person_id),
      Data.ContactInfo.read(person_id)
    ]);
    if (person) {
      const [household, _recording] = await Promise.all([
        Data.Households.readFor(person_id),
        recording(person.email)
      ]);
      return (
        <Detail
          audience="facstaff"
          person={person}
          contact_info={contact_info}
          household={household}
          recording={_recording}
        />
      );
    }
  }
}
