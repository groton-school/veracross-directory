import { Recording } from '@lib/NameDrop';
import { Button } from 'react-bootstrap';

export function NamePronunciation({ recording }: { recording: Recording }) {
  function handleClick() {
    const audio = new Audio(recording.recording);
    audio.play();
  }
  return <Button onClick={handleClick}>Pronunciation</Button>;
}
