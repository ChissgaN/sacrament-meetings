'use client';

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="cursor-pointer rounded-md bg-primary px-4 py-2 font-semibold text-white transition-opacity hover:opacity-90 print:hidden"
    >
      Print program
    </button>
  );
}
