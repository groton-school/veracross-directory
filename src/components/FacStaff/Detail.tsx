import IfDefined from '@/src/components/IfDefined';
import type { ContactInfo, HouseHold } from '@/src/lib/Veracross';
import { FacStaff } from '@/src/lib/Veracross/Directory';
import { Audience } from '@/src/model/Audience';
import Link from 'next/link';
import { Row } from 'react-bootstrap';
import Address from '../Address';
import * as NamePronunciation from '../NamePronunciation';
import Photo from '../Photo';
import Department from './Department';

export type Properties = {
  audience: Audience;
  person: FacStaff;
  contact_info: ContactInfo;
  household: HouseHold;
} & NamePronunciation.Properties;

export async function Detail({
  audience,
  person,
  contact_info,
  household,
  ...props
}: Properties) {
  return (
    <>
      <Link href={`/audience/${audience}/directory/facstaff`}>Close</Link>
      <Row>
        <div className="w-50">
          <Photo {...person} />
        </div>
        <div className="w-50">
          <h1>
            {person.full_name} <NamePronunciation.Node {...props} />
          </h1>
          <IfDefined content={person.job_title} />
          <IfDefined content={person.biography} />
          <Department {...person} />
        </div>
      </Row>
      <div>
        <IfDefined label="School" content={contact_info.email_1} />
        <IfDefined label="School" content={contact_info.business_phone} />
        {audience === 'facstaff' ? (
          <>
            <IfDefined label="Home" content={contact_info.home_phone} />
            <IfDefined label="Mobile" content={contact_info.mobile_phone} />
            <Address label="Home" {...household} />
          </>
        ) : null}
      </div>
    </>
  );
}
