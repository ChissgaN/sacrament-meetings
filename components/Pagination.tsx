'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { parsePage } from '@/lib/pagination';

interface PaginationProps {
  totalPages: number;
}

const linkClasses =
  'rounded-md border border-primary px-4 py-2 font-semibold text-primary transition-colors hover:bg-primary-soft';
const disabledClasses = 'rounded-md border border-border px-4 py-2 font-semibold text-muted';

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  // Same clamping as the server, so ?page=99 shows the last page here too.
  const currentPage = Math.min(parsePage(searchParams.get('page')), totalPages);

  // Keeps the active search query in every page link.
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', String(page));
    return `${pathname}?${params.toString()}`;
  };

  return (
    <nav aria-label="Meetings pagination" className="flex items-center justify-between gap-3">
      {currentPage > 1 ? (
        <Link href={createPageUrl(currentPage - 1)} className={linkClasses}>
          Previous
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClasses}>
          Previous
        </span>
      )}
      <p className="font-semibold">
        Page {currentPage} of {totalPages}
      </p>
      {currentPage < totalPages ? (
        <Link href={createPageUrl(currentPage + 1)} className={linkClasses}>
          Next
        </Link>
      ) : (
        <span aria-disabled="true" className={disabledClasses}>
          Next
        </span>
      )}
    </nav>
  );
}
