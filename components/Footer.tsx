import { WARD_NAME } from '@/lib/meeting-display';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-surface print:hidden">
      <p className="mx-auto w-full max-w-4xl px-4 py-4 text-muted">
        {WARD_NAME} Sacrament Meeting Planner
      </p>
    </footer>
  );
}
