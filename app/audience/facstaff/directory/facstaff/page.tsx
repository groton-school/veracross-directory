import { Item } from '@/src/components/FacStaff/Item';
import { Loading } from '@/src/components/Loading';
import Search from '@/src/components/Search';
import { recording } from '@/src/lib/NameDrop';
import { Data } from '@/src/lib/Veracross';
import { connection } from 'next/server';
import { Suspense } from 'react';

type SearchParameters = { query?: string };
type Properties = { searchParams: Promise<SearchParameters> };

export default function Page({ searchParams }: Properties) {
  return (
    <>
      <h1>Faculty & Staff</h1>
      <Suspense fallback={<Loading />}>
        <Search />
        <DynamicContent searchParams={searchParams} />
      </Suspense>
    </>
  );
}

async function DynamicContent({ searchParams }: Properties) {
  await connection();
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
            audience="facstaff"
            person={person}
            recording={await recording(person.email)}
          />
        ))}
    </>
  );
}
