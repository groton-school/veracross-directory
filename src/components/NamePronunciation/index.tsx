'use client';

import icon from '#assets/noun-ear-1616239.svg';
import type { Recording } from '#lib/NameDrop';
import Image from 'next/image';
import './styles.scss';

export type Properties = { recording?: Recording };

export function Node({ recording }: Properties) {
  if (recording) {
    const play = () => {
      const audio = new Audio(recording.recording);
      audio.play();
    };
    return (
      <span onClick={play} className="name-pronunciation">
        <Image
          src={icon}
          alt={`Click to hear ${recording.firstname} ${recording.lastname} pronounced`}
        />
      </span>
    );
  } else {
    return null;
  }
}

export default Node;
