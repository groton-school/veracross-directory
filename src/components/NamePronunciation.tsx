'use client';

import { Recording } from '@/src/lib/NameDrop';
import { Button } from 'react-bootstrap';

export function NamePronunciation({ recording }: { recording?: Recording }) {
  if (recording) {
    const handleClick = () => {
      const audio = new Audio(recording.recording);
      audio.play();
    };
    return <Button onClick={handleClick}>Pronunciation</Button>;
  } else {
    return <></>;
  }
}
