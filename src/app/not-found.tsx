import type { Metadata } from 'next';
import Link from 'next/link';

// A 404 shouldn't claim a canonical URL — it isn't the canonical location of
// anything — and it shouldn't inherit the homepage's title either.
export const metadata: Metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-5 pt-32 pb-16 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.3em] text-red-blood/70">HTTP 404</p>
      <h1 className="mt-3 font-mono text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        That page doesn&apos;t exist yet
      </h1>
      <p className="mt-4 max-w-md text-[15px] leading-relaxed text-ink-dim">
        The path you followed doesn&apos;t resolve to anything — it may not have been written yet,
        most of this site hasn&apos;t been.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/"
          className="clip-tab inline-flex items-center gap-2 border border-red-deep bg-red-core px-6 py-3 font-mono text-sm font-medium text-void transition-all duration-300 hover:shadow-[0_0_30px_-4px_rgba(255,45,75,0.8)]"
        >
          Home
        </Link>
        <Link
          href="/tracks/"
          className="inline-flex items-center gap-2 border border-line px-6 py-3 font-mono text-sm text-ink-dim transition-all hover:border-red-deep/70 hover:text-red-blood"
        >
          Tracks
        </Link>
      </div>
    </div>
  );
}
