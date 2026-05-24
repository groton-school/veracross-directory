import IfDefined from '@/src/components/IfDefined/Base';
import { Badge } from 'react-bootstrap';

export type Properties = { department: string };

export function Node({ department }: Properties) {
  return (
    <IfDefined
      content={(department || '').split(',').map((name, i) => (
        <Badge className="text-bg-light me-1" key={i}>
          {name}
        </Badge>
      ))}
    />
  );
}

export default Node;
