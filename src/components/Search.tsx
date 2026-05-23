'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useDebouncedCallback } from 'use-debounce';

export function Node() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const query = searchParams.get('query') || undefined;
  const { replace } = useRouter();

  const search = useDebouncedCallback((query?: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  }, 300);

  return (
    <InputGroup>
      <FormControl
        type="text"
        placeholder="Search for faculty & staff…"
        value={query}
        onChange={(event) => {
          search(event.target.value);
        }}
      />
      <Button>Search</Button>
    </InputGroup>
  );
}

export default Node;
