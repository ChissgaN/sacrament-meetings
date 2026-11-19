export default function AdminMeetingsLoading() {
  return (
    <div role="status" className="flex flex-col gap-4">
      <span className="sr-only">Loading meeting form…</span>
      <div className="h-9 w-64 animate-pulse rounded bg-border motion-reduce:animate-none" aria-hidden="true" />
      <div className="h-96 animate-pulse rounded-lg bg-border motion-reduce:animate-none" aria-hidden="true" />
    </div>
  );
}
