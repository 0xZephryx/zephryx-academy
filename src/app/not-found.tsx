import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-2xl flex-col justify-center px-5 pt-32 pb-16 sm:px-8">
      <div className="panel clip-corner overflow-hidden">
        <div className="flex items-center gap-2 border-b border-line bg-elevated/70 px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-blood/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-signal/70" />
          <span className="ml-3 font-mono text-[11px] tracking-wide text-ink-faint">
            zephryx@academy — 404
          </span>
        </div>
        <div className="p-7 sm:p-9">
          <p className="font-mono text-[11px] tracking-[0.3em] text-red-blood/70">HTTP 404</p>
          <h1 className="mt-3 font-mono text-3xl font-bold tracking-tight text-ink">
            No route to that page
          </h1>
          <p className="mt-4 font-mono text-sm leading-relaxed text-ink-dim">
            <span className="text-red-blood/70">$</span> the path resolved to nothing. It may not
            exist yet — most of this site does not.
          </p>
          <Link
            href="/"
            className="clip-tab mt-8 inline-flex items-center gap-2 border border-red-deep bg-red-core px-6 py-3 font-mono text-sm font-medium text-void transition-all duration-300 hover:shadow-[0_0_30px_-4px_rgba(255,45,75,0.8)]"
          >
            cd /
          </Link>
        </div>
      </div>
    </div>
  );
}
