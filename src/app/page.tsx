import Link from 'next/link';
import { SITE, TRACKS } from '@/lib/site';
import { getCheatsheetCount } from '@/lib/cheatsheets';
import WaitlistForm from '@/components/WaitlistForm';

const PRINCIPLES = [
  {
    cmd: '01',
    title: 'Attacks you will actually see',
    body: "Everything taught here comes out of real engagements — the AD path that keeps working, the misconfiguration that keeps showing up. Not a tour of tools you'll never run again.",
  },
  {
    cmd: '02',
    title: 'The reasoning, not the checklist',
    body: "A command you can't explain is a command you can't adapt. Every technique is taught from why it works, so it survives a target that doesn't match the lab.",
  },
  {
    cmd: '03',
    title: 'Both sides of the loop',
    body: 'Every attack track has a detection counterpart. You learn what you would leave behind and what would have caught you — which is what makes the offense worth paying for.',
  },
  {
    cmd: '04',
    title: 'Dead ends included',
    body: "Polished walkthroughs hide the part where it doesn't work. The labs keep the failed attempts in, because recognising a dead end early is most of the skill.",
  },
];

export default function Home() {
  const cheatsheetCount = getCheatsheetCount();

  return (
    <>
      {/* ---------------------------------------------------------------- hero */}
      <section className="relative mx-auto flex min-h-[92vh] max-w-6xl flex-col justify-center px-5 pt-24 pb-16 sm:px-8">
        <div className="reveal">
          <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] text-ink-faint">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-warn" />
            PRE-LAUNCH · COURSES IN DEVELOPMENT
          </p>

          <h1 className="mt-7 max-w-4xl font-mono text-4xl font-bold leading-[1.1] tracking-tight text-ink sm:text-6xl">
            Learn to break in
            <span className="text-red-blood">.</span>
            <br />
            Then learn what catches you
            <span className="text-red-blood">.</span>
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-relaxed text-ink-dim">
            {SITE.name} is a hands-on offensive security training ground built by a working
            penetration tester. Active Directory attack paths, adversary emulation, and the
            detection engineering that closes the loop — taught the way the work actually happens.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href="#waitlist"
              className="clip-tab inline-flex items-center gap-2 border border-red-deep bg-red-core px-7 py-3.5 font-mono text-sm font-medium text-void transition-all duration-300 hover:shadow-[0_0_30px_-4px_rgba(255,45,75,0.8)]"
            >
              ./join-waitlist
            </a>
            <Link
              href="/tracks/"
              className="inline-flex items-center gap-2 border border-line px-7 py-3.5 font-mono text-sm text-ink-dim transition-colors duration-300 hover:border-red-deep/60 hover:text-red-blood"
            >
              see the tracks
              <span aria-hidden>→</span>
            </Link>
          </div>

          <p className="mt-8 font-mono text-[12px] text-ink-faint">
            <span className="text-red-blood/70">$</span> nothing is for sale yet — the waitlist is
            how you hear first, and how I decide what to build first.
          </p>
        </div>
      </section>

      {/* -------------------------------------------------------- cheatsheets */}
      <section className="mx-auto max-w-6xl px-5 pb-4 sm:px-8">
        <div className="panel clip-corner flex flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center">
          <div>
            <p className="flex items-center gap-2.5 font-mono text-[11px] tracking-[0.3em] text-signal">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-signal" />
              AVAILABLE NOW — FREE
            </p>
            <h2 className="mt-3 font-mono text-xl font-semibold text-ink sm:text-2xl">
              {cheatsheetCount} quick-reference cheatsheets, no waitlist required
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim">
              The tracks below are still being built, but the reference PDFs already are —
              Active Directory enumeration, web app testing, network recon and more. No login, no
              paywall, and that doesn&apos;t change when the paid courses launch.
            </p>
          </div>
          <Link
            href="/cheatsheets/"
            className="clip-tab inline-flex shrink-0 items-center gap-2 border border-red-deep bg-red-core px-6 py-3 font-mono text-sm font-medium text-void transition-all duration-300 hover:shadow-[0_0_30px_-4px_rgba(255,45,75,0.8)]"
          >
            browse cheatsheets
            <span aria-hidden>→</span>
          </Link>
        </div>
      </section>

      {/* ---------------------------------------------------------- principles */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHeading kicker="APPROACH" title="How this is taught" />

        <div className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2">
          {PRINCIPLES.map((p) => (
            <div key={p.cmd} className="bg-surface p-7 transition-colors duration-300 hover:bg-elevated">
              <span className="font-mono text-[11px] tracking-[0.3em] text-red-blood/70">{p.cmd}</span>
              <h3 className="mt-3 font-mono text-lg font-semibold text-ink">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-dim">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* -------------------------------------------------------------- tracks */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <SectionHeading kicker="CURRICULUM" title="Planned tracks" />

        <div className="mt-12 space-y-px border border-line bg-line">
          {TRACKS.map((t) => (
            <article key={t.id} className="bg-surface p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-3">
                <h3 className="font-mono text-lg font-semibold text-ink">{t.title}</h3>
                <StatusBadge status={t.status} />
              </div>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-dim">{t.summary}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
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

        <p className="mt-6 font-mono text-[12px] text-ink-faint">
          <span className="text-red-blood/70"># </span>
          scope and order are still moving — the waitlist form is where you push back on it.
        </p>
      </section>

      {/* ------------------------------------------------------------ waitlist */}
      <section id="waitlist" className="mx-auto max-w-3xl scroll-mt-24 px-5 py-20 sm:px-8">
        <SectionHeading kicker="ENROLMENT" title="Join the waitlist" />
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-ink-dim">
          One email when the first track opens. That is the whole commitment — no sequence, no
          upsells, and your address goes nowhere else.
        </p>
        <div className="mt-10">
          <WaitlistForm />
        </div>
      </section>
    </>
  );
}

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.3em] text-red-blood/70">{kicker}</p>
      <h2 className="mt-3 font-mono text-3xl font-bold tracking-tight text-ink sm:text-4xl">{title}</h2>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const dev = status === 'In development';
  return (
    <span
      className={`border px-2.5 py-1 font-mono text-[10px] tracking-wider ${
        dev ? 'border-warn/40 text-warn' : 'border-line text-ink-faint'
      }`}
    >
      {status.toUpperCase()}
    </span>
  );
}
