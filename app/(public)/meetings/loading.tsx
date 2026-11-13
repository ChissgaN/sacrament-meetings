const PLACEHOLDER_CARDS = [1, 2, 3, 4];

export default function MeetingsLoading() {
  return (
    <div role="status" className="flex flex-col gap-4">
      <span className="sr-only">Loading meetings…</span>
      <div className="grid gap-4 sm:grid-cols-2" aria-hidden="true">
        {PLACEHOLDER_CARDS.map((card) => (
          <div
            key={card}
            className="h-32 animate-pulse rounded-lg bg-border motion-reduce:animate-none"
          />
        ))}
      </div>
    </div>
  );
}
