import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE, TRACKS } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Tracks',
  description:
    'The planned Zephryx Academy curriculum — Active Directory attack paths, offensive security fundamentals, detection engineering and practical labs.',
  alternates: { canonical: `${SITE.url}/tracks/` },
};

export default function Tracks() {
  return (
    <div className="mx-auto max-w-4xl px-5 pt-32 pb-16 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.3em] text-red-blood/70">CURRICULUM</p>
      <h1 className="mt-3 font-mono text-4xl font-bold tracking-tight text-ink sm:text-5xl">Tracks</h1>
      <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-dim">
        Four tracks, built in this order. Nothing here is open yet — this page is the plan, kept
        public so you can tell me where it is wrong before I spend a month building the wrong thing.
      </p>

      <div className="mt-12 space-y-px border border-line bg-line">
        {TRACKS.map((t, i) => (
          <article key={t.id} className="bg-surface p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] tracking-[0.3em] text-red-blood/70">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h2 className="font-mono text-xl font-semibold text-ink">{t.title}</h2>
              </div>
              <span
                className={`border px-2.5 py-1 font-mono text-[10px] tracking-wider ${
                  t.status === 'In development' ? 'border-warn/40 text-warn' : 'border-line text-ink-faint'
                }`}
              >
                {t.status.toUpperCase()}
              </span>
            </div>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-dim">{t.summary}</p>

            <h3 className="mt-6 font-mono text-[11px] tracking-[0.3em] text-ink-faint">COVERS</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {t.topics.map((topic) => (
                <li
                  key={topic}
                  className="border border-line bg-void/60 px-2.5 py-1 font-mono text-[11px] text-ink-faint"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="panel clip-corner mt-14 p-7">
        <h2 className="font-mono text-lg font-semibold text-ink">Want one of these sooner?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim">
          The waitlist form has a free-text field, and I read it. If enough people ask for the same
          track, it moves up.
        </p>
        <Link
          href="/#waitlist"
          className="clip-tab mt-6 inline-flex items-center gap-2 border border-red-deep bg-red-core px-6 py-3 font-mono text-sm font-medium text-void transition-all duration-300 hover:shadow-[0_0_30px_-4px_rgba(255,45,75,0.8)]"
        >
          ./join-waitlist
        </Link>
      </section>
    </div>
  );
}
