import IfDefined from '#components/IfDefined';
import { Badge } from 'react-bootstrap';

export type Properties = { department: string };

export function Node({ department }: Properties) {
  return (
    <IfDefined
      content={(department || '').split(',').map((name, i) => (
        <Badge bg="light" text="dark" className="me-1" key={i}>
          {name}
        </Badge>
      ))}
    />
  );
}

export default Node;
