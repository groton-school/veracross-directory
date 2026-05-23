import { NamePronunciation } from '@/src/components/NamePronunciation';
import { Photo } from '@/src/components/Photo';
import * as Veracross from '@/src/lib/Veracross';
import { Row } from 'react-bootstrap';

export function Preview({
  person,
  ...params
}: { person: Veracross.Directory.FacStaff } & Parameters<
  typeof NamePronunciation
>[0]) {
  return (
    <Row>
      <div className="w-25">
        <Photo {...person} />
      </div>
      <div className="w-75">
        <h5>{person.full_name}</h5>
        <NamePronunciation {...params} />
        {person.job_title ? <p>{person.job_title}</p> : ''}
        {person.biography ? <p>{person.biography}</p> : ''}
        {person.department ? <p>{person.department}</p> : ''}
        {person.email ? (
          <p>
            <a href={`mailto:${person.email}`}>
              <code>{person.email}</code>
            </a>
          </p>
        ) : (
          ''
        )}
        {person.phone_business ? <p>{person.phone_business}</p> : ''}
      </div>
    </Row>
  );
}
