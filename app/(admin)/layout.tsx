import type { ReactNode } from 'react';
import Link from 'next/link';

// Leader-facing routes. Authentication is added in Week 05.
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-md bg-accent-soft px-4 py-3 print:hidden">
        <p className="font-semibold text-accent">Leader tools</p>
        <Link href="/meetings" className="font-semibold text-primary underline underline-offset-2">
          Back to all meetings
        </Link>
      </div>
      {children}
    </div>
  );
}
