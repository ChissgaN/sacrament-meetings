'use client';

import { useEffect } from 'react';
import Link from 'next/link';

interface MeetingsErrorProps {
  error: unknown;
  retry: () => void;
}

// Shared by the error.tsx boundaries of the public and admin meetings routes.
export default function MeetingsError({ error, retry }: MeetingsErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  // In production, server errors only carry a generic message and a digest.
  const digest =
    error instanceof Error && 'digest' in error && typeof error.digest === 'string'
      ? error.digest
      : null;

  return (
    <div role="alert" className="flex flex-col items-start gap-3">
      <h1 className="text-3xl font-bold text-primary">Something went wrong</h1>
      <p>
        We couldn&apos;t complete that request. This is usually temporary, so please try again.
      </p>
      {digest && <p className="text-sm text-muted">Reference: {digest}</p>}
      <div className="flex flex-wrap items-center gap-3">
        {/* retry() re-fetches the route; reset() alone would re-render the same error. */}
        <button
          type="button"
          onClick={() => retry()}
          className="cursor-pointer rounded-md bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90"
        >
          Try Again
        </button>
        <Link href="/meetings" className="font-semibold text-primary underline underline-offset-2">
          Back to all meetings
        </Link>
      </div>
    </div>
  );
}
