import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="grid items-center gap-8 md:grid-cols-2">
      <div className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold text-primary">
          Sacrament Meeting Planner
        </h1>
        <p className="text-lg">
          Plan and review each Sunday&apos;s agenda, including announcements,
          prayers, ward business, hymns, musical numbers, and speakers. View
          and print the program for this week or any past week.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/meetings/current"
            className="rounded-md bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90"
          >
            This Sunday&apos;s program
          </Link>
          <Link
            href="/meetings"
            className="rounded-md border border-primary px-4 py-2 font-semibold text-primary transition-colors hover:bg-primary-soft"
          >
            All meetings
          </Link>
        </div>
      </div>
      <Image
        src="/chapel.svg"
        alt="Illustration of a white chapel with a steeple on a green hill at sunrise"
        width={640}
        height={420}
        loading="eager"
        fetchPriority="high"
        className="h-auto w-full rounded-lg"
      />
    </div>
  );
}
