import * as NamePronunciation from '#components/NamePronunciation';
import Photo from '#components/Photo';
import { Directory } from '#lib/Veracross/Data';
import { Card, Row } from 'react-bootstrap';

export type Properties = {
  person: Directory.Student.Person;
} & NamePronunciation.Properties;

export function Node({ person, ...props }: Properties) {
  return (
    <Card>
      <Row>
        <div className="w-25">
          <Photo {...person} photo_url="tbd" />
        </div>
        <div className="w-75">
          <h5>
            {person.full_name} <NamePronunciation.Node {...props} />
          </h5>
        </div>
      </Row>
    </Card>
  );
}

export default Node;
