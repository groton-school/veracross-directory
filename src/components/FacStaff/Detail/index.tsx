import * as IfDefined from '@/src/components/IfDefined';
import type { Data } from '@/src/lib/Veracross';
import { Audience } from '@/src/model/Audience';
import Link from 'next/link';
import { ModalBody, ModalHeader, Row, Table } from 'react-bootstrap';
import * as NamePronunciation from '../../NamePronunciation';
import Photo from '../../Photo';
import Department from '../Department';
import './styles.scss';

export type Properties = {
  audience: Audience;
  person: Data.Directory.StaffFaculty.Person;
  contact_info: Data.ContactInfo.ContactInfo;
  household: Data.Households.Household;
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
      <ModalHeader>
        <h1>
          {person.full_name} <NamePronunciation.Node {...props} />
        </h1>
        <Link
          type="button"
          href={`/audience/${audience}/directory/facstaff`}
          className="btn-close"
        />
      </ModalHeader>
      <ModalBody>
        <Row>
          <div className="w-33">
            <Photo {...person} />
          </div>
          <div className="w-67">
            <IfDefined.Node content={person.job_title} />
            <IfDefined.Node content={person.biography} />
            <Department {...person} />
            <Table borderless>
              <tbody>
                <IfDefined.Node
                  tableRow
                  label="School"
                  content={contact_info.email_1}
                  href={contact_info.email_1}
                />
                <IfDefined.Node
                  tableRow
                  label="School"
                  content={contact_info.business_phone}
                  href={`tel:${contact_info.business_phone}`}
                />
                {audience === 'facstaff' ? (
                  <>
                    <IfDefined.Node
                      tableRow
                      label="Home"
                      content={contact_info.home_phone}
                      href={`tel:${contact_info.home_phone}`}
                    />
                    <IfDefined.Node
                      tableRow
                      label="Mobile"
                      content={contact_info.mobile_phone}
                      href={`tel:${contact_info.mobile_phone}`}
                    />
                    <IfDefined.Address.Node
                      tableRow
                      label="Home"
                      {...household}
                    />
                  </>
                ) : null}
              </tbody>
            </Table>
          </div>
        </Row>
      </ModalBody>
    </>
  );
}
