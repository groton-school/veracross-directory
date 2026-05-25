import { Detail } from '#components/FacStaff/Detail';
import { Loading } from '#components/Loading';
import { isVerified } from '#lib/AccessVerifier/actions';
import { Audience } from '#lib/Definitions';
import { recording } from '#lib/NameDrop';
import { Data } from '#lib/Veracross';
import { connection } from 'next/server';
import { Suspense } from 'react';

type PathParameters = { audience: Audience; person_id: string };
export type Properties = { params: Promise<PathParameters> };

export default function Page(props: Properties) {
  return (
    <Suspense fallback={<Loading />}>
      <DynamicContent {...props} />
    </Suspense>
  );
}

async function DynamicContent({ params }: Properties) {
  await connection();

  const { audience, person_id } = await params;
  if (await isVerified(audience)) {
    if (person_id) {
      const id = parseInt(person_id);
      const [person, contact_info] = await Promise.all([
        Data.Directory.StaffFaculty.read(id),
        Data.ContactInfo.read(id)
      ]);
      if (person) {
        const [household, rec] = await Promise.all([
          Data.Households.readFor(id),
          recording(person.email)
        ]);
        return (
          <Detail
            audience={audience}
            person={person}
            contact_info={contact_info}
            household={household}
            recording={rec}
          />
        );
      }
    }
  } else {
    return 'Unauthorized';
  }
}
