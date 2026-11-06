'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export interface NavLink {
  href: string;
  label: string;
  /** Also marks the link active on routes nested under href. */
  matchNested?: boolean;
}

interface NavLinksProps {
  links: NavLink[];
  label: string;
}

function NavLinksList({ links, label, pathname }: NavLinksProps & { pathname?: string }) {
  return (
    <nav aria-label={label}>
      <ul className="flex flex-wrap gap-2">
        {links.map((link) => {
          const isActive =
            pathname === link.href ||
            (link.matchNested === true && pathname?.startsWith(`${link.href}/`));

          return (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-block rounded-md px-3 py-2 font-semibold transition-colors ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-primary hover:bg-primary-soft'
                }`}
              >
                {link.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function ActiveNavLinksList(props: NavLinksProps) {
  return <NavLinksList {...props} pathname={usePathname()} />;
}

export default function NavLinks(props: NavLinksProps) {
  // usePathname() is request data, so with Cache Components it must sit inside
  // Suspense. The fallback shows the same links with no active style yet.
  return (
    <Suspense fallback={<NavLinksList {...props} />}>
      <ActiveNavLinksList {...props} />
    </Suspense>
  );
}
