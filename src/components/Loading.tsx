import { Spinner } from 'react-bootstrap';

export function Loading() {
  return (
    <div className="position-absolute top-50 start-50 translate-middle">
      <Spinner>Loading…</Spinner>
    </div>
  );
}
