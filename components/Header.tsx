import { Suspense } from 'react';
import { connection } from 'next/server';
import Link from 'next/link';
import NavLinks, { type NavLink } from '@/components/NavLinks';
import { formatLongDate, getTodayIso } from '@/lib/dates';
import { WARD_NAME } from '@/lib/meeting-display';

const links: NavLink[] = [
  { href: '/', label: 'Home' },
  { href: '/meetings', label: 'Meetings', matchNested: true },
];

async function CurrentDate() {
  // The date is calculated per request, so it cannot be part of the static shell.
  await connection();
  const today = getTodayIso();

  return <time dateTime={today}>{formatLongDate(today)}</time>;
}

export default function Header() {
  return (
    <header className="border-b border-border bg-surface print:hidden">
      <div className="mx-auto flex w-full max-w-4xl flex-wrap items-center justify-between gap-4 px-4 py-4">
        <div>
          <Link href="/" className="text-2xl font-bold text-primary">
            {WARD_NAME}
          </Link>
          <p className="min-h-6 text-muted">
            <Suspense fallback={null}>
              <CurrentDate />
            </Suspense>
          </p>
        </div>
        <NavLinks links={links} label="Main" />
      </div>
    </header>
  );
}
