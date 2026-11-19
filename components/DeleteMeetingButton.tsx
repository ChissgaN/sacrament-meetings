'use client';

import { useFormStatus } from 'react-dom';
import { deleteMeeting } from '@/lib/actions';

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      aria-label={label}
      className="cursor-pointer rounded-md border border-red-700 px-3 py-1 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50 disabled:cursor-wait disabled:opacity-70"
    >
      {pending ? 'Deleting…' : 'Delete'}
    </button>
  );
}

interface DeleteMeetingButtonProps {
  id: number;
  /** Human-readable date, used in the confirmation and the accessible name. */
  dateLabel: string;
}

export default function DeleteMeetingButton({ id, dateLabel }: DeleteMeetingButtonProps) {
  return (
    <form
      action={deleteMeeting.bind(null, id)}
      onSubmit={(event) => {
        if (!window.confirm(`Delete the meeting on ${dateLabel}? This cannot be undone.`)) {
          event.preventDefault();
        }
      }}
    >
      <SubmitButton label={`Delete meeting on ${dateLabel}`} />
    </form>
  );
}
