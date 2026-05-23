'use client';

import { URLString } from '@battis/descriptive-types';
import { Image } from 'react-bootstrap';

export function Photo({
  photo_url,
  full_name
}: {
  photo_url: URLString;
  full_name: string;
}) {
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
