'use client';

import { URLString } from '@battis/descriptive-types';
import { Image } from 'react-bootstrap';

export type Properties = {
  photo_url: URLString;
  full_name: string;
};

export function Node({ photo_url, full_name }: Properties) {
  return (
    <div className="ratio ratio-1x1">
      <Image
        src={photo_url}
        alt={`Photograph of ${full_name}`}
        className="object-fit-cover rounded border"
      />
    </div>
  );
}

export default Node;
