import Link from 'next/link';
import { Card } from 'react-bootstrap';
import { Preview } from './Preview';

export function Item(params: Parameters<typeof Preview>[0]) {
  return (
    <Card className="m-3 p-3">
      <Preview {...params} />
      <Link
        href={`/audience/facstaff/directory/facstaff/${params.person.person_id}`}
        scroll={false}
      >
        Detail
      </Link>
    </Card>
  );
}
