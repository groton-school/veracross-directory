import IfDefined from '@/src/components/IfDefined';
import * as NamePronunciation from '@/src/components/NamePronunciation';
import * as Photo from '@/src/components/Photo';
import type * as Veracross from '@/src/lib/Veracross';
import { Audience } from '@/src/model/Audience';
import Link from 'next/link';
import { Card, Row } from 'react-bootstrap';
import Department from './Department';

export type Properties = {
  audience: Audience;
  person: Veracross.Directory.FacStaff;
} & NamePronunciation.Properties;

export function Item({ person, ...props }: Properties) {
  return (
    <Card className="m-3 p-3">
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
          <IfDefined href={person.email} />
          <IfDefined content={person.phone_business} />
        </div>
      </Row>
      <Link
        href={`/audience/${props.audience}/directory/facstaff/${person.person_id}`}
        scroll={false}
      >
        Detail
      </Link>
    </Card>
  );
}
