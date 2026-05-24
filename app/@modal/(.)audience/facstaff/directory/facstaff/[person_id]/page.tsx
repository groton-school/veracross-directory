import { Modal } from 'react-bootstrap';
import * as Page from '../../../../../../audience/facstaff/directory/facstaff/[person_id]/page';

export default function ModalPage({ params }: Page.Properties) {
  return <Modal>{Page.default({ params })}</Modal>;
}
