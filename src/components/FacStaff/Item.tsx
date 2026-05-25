import IfDefined from '@/src/components/IfDefined/IfDefined';
import * as NamePronunciation from '@/src/components/NamePronunciation';
import * as Photo from '@/src/components/Photo';
import { Audience } from '@/src/lib/Definitions';
import type { Data } from '@/src/lib/Veracross';
import Link from 'next/link';
import { Card, CardBody, CardFooter, Row, Table } from 'react-bootstrap';
import Department from './Department';

export type Properties = {
  audience: Audience;
  person: Data.Directory.StaffFaculty.Person;
} & NamePronunciation.Properties;

export function Item({ person, ...props }: Properties) {
  return (
    <Card className="m-3">
      <CardBody className="p-3">
        <Row>
          <div className="w-25">
            <Photo.Node {...person} />
          </div>
          <div className="w-75">
            <h5>
              {person.full_name} <NamePronunciation.Node {...props} />
            </h5>
            <IfDefined content={person.job_title} />
            <IfDefined content={person.biography} />
            <Department {...person} />
            <Table borderless>
              <tbody>
                <IfDefined
                  tableRow
                  content={person.email}
                  href={person.email}
                />
                <IfDefined
                  tableRow
                  content={person.phone_business}
                  href={`tel:${person.phone_business}`}
                />
              </tbody>
            </Table>
          </div>
        </Row>
      </CardBody>
      <CardFooter
        className="bg-light text-center"
        style={{ transform: 'scale(1)' }} // contain the stretched link
      >
        <Link
          className="stretched-link text-body-secondary text-decoration-none"
          href={`/audience/${props.audience}/directory/facstaff/${person.person_id}`}
          scroll={false}
        >
          More
        </Link>
      </CardFooter>
    </Card>
  );
}
