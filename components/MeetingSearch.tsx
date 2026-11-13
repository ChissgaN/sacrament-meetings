'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function MeetingSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const urlQuery = searchParams.get('query') ?? '';

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    // A new search always starts on the first page.
    params.delete('page');

    const trimmed = term.trim();
    if (trimmed) {
      params.set('query', trimmed);
    } else {
      params.delete('query');
    }

    const queryString = params.toString();
    // push (not replace) so the back button returns to the previous search.
    router.push(queryString ? `${pathname}?${queryString}` : pathname, { scroll: false });
  }, 300);

  // The input is uncontrolled (defaultValue), so it keeps its text when the URL
  // changes from outside, e.g. the back button. Sync it in that case only.
  useEffect(() => {
    const input = inputRef.current;
    if (input && input.value.trim() !== urlQuery) {
      input.value = urlQuery;
    }
  }, [urlQuery]);

  return (
    <div>
      <label htmlFor="meeting-search" className="mb-1 block font-semibold">
        Search meetings
      </label>
      <input
        ref={inputRef}
        id="meeting-search"
        type="search"
        aria-label="Search meetings by speaker, presiding, conducting, or meeting type"
        placeholder="Speaker, presiding, conducting, or meeting type"
        defaultValue={urlQuery}
        onChange={(event) => handleSearch(event.target.value)}
        className="w-full rounded-md border border-muted bg-surface px-3 py-2"
      />
    </div>
  );
}
