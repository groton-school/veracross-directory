import { ArrayElement } from '@battis/typescript-tricks';
import { operations } from '@lib/Veracross/Data';
import { Card, Row } from 'react-bootstrap';
import Photo from './Photo';

type DirectoryEntry = ArrayElement<
  operations['list_directory_staff_faculty']['responses']['200']['content']['application/json']['data']
>;

export default function FacStaff({ person }: { person: DirectoryEntry }) {
  return (
    <Card className="m-3 p-3">
      <Row>
        <div className="w-25">
          <Photo {...person} />
        </div>
        <div className="w-75">
          <h5>{person.full_name}</h5>
          <p>{person.job_title}</p>
          <p>{person.biography}</p>
          <p>{person.department}</p>
          <p>
            <a href={`mailto:${person.email}`}>
              <code>{person.email}</code>
            </a>
          </p>
          <p>{person.phone_business}</p>
        </div>
      </Row>
    </Card>
  );
}
