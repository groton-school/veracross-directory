'use client';

import { useEffect } from 'react';

export default function Bootstrap() {
  useEffect(() => {
    import('bootstrap');
  }, []);
  return null;
}
