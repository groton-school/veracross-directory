'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import { useDebouncedCallback } from 'use-debounce';

export function Node() {
  const searchParams = useSearchParams();
  const pathName = usePathname();
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
        defaultValue={searchParams.get('query')?.toString()}
        onChange={(event) => {
          search(event.target.value);
        }}
      />
      <Button>Search</Button>
    </InputGroup>
  );
}

export default Node;
