import { Item } from '#components/FacStaff/Item';
import { Loading } from '#components/Loading';
import Search from '#components/Search';
import { isVerified } from '#lib/AccessVerifier/actions/isVerified';
import { Audience } from '#lib/Definitions';
import { recording } from '#lib/NameDrop';
import { Data } from '#lib/Veracross';
import { connection } from 'next/server';
import { Suspense } from 'react';

type PathParameters = { audience: Audience };
type SearchParameters = { query?: string };
type Properties = {
  params: Promise<PathParameters>;
  searchParams: Promise<SearchParameters>;
};

export default function Page(props: Properties) {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <h1>Faculty & Staff</h1>
        <Search />
        <DynamicContent {...props} />
      </Suspense>
    </>
  );
}

async function DynamicContent({ params, searchParams }: Properties) {
  await connection();
  const audience = (await params).audience;
  if (await isVerified(audience)) {
    const params = await searchParams;
    const query = (params.query || '').toLowerCase();
    return (
      <>
        {(await Data.Directory.StaffFaculty.list())
          .filter(
            (person) =>
              (person.full_name &&
                person.full_name.toLowerCase().includes(query)) ||
              (person.job_title &&
                person.job_title.toLowerCase().includes(query)) ||
              (person.department &&
                person.department.toLowerCase().includes(query))
          )
          .map(async (person, i) => (
            <Item
              key={i}
              audience={audience as Audience}
              person={person}
              recording={await recording(person.email)}
            />
          ))}
      </>
    );
  } else {
    return 'Unauthorized';
  }
}
