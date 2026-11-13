import type { ReactNode } from 'react';
import NavLinks, { type NavLink } from '@/components/NavLinks';

const links: NavLink[] = [
  { href: '/meetings', label: 'All meetings' },
  { href: '/meetings/current', label: 'This Sunday' },
];

export default function MeetingsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="print:hidden">
        <NavLinks links={links} label="Meetings" />
      </div>
      {children}
    </div>
  );
}
