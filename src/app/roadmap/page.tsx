import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllCheatsheets } from '@/lib/cheatsheets';
import { SITE, COURSES, type Course } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Roadmap',
  description:
    'The order to actually learn offensive security in — foundations, recon, web, Active Directory, detection, then proving it. Free, self-paced, no login.',
  alternates: { canonical: `${SITE.url}/roadmap/` },
};

const courseById = (id: string): Course => {
  const c = COURSES.find((x) => x.id === id);
  if (!c) throw new Error(`Roadmap references unknown course id "${id}"`);
  return c;
};

type Stage = {
  n: string;
  title: string;
  summary: string;
  learn: string[];
  cheatsheetSlugs?: string[];
  courseId?: string;
  practice?: string;
};

const STAGES: Stage[] = [
  {
    n: '00',
    title: 'Foundations',
    summary:
      "Before any of this is interesting, it has to stop being frustrating. Get comfortable enough in a Linux terminal that you're not fighting the shell while trying to think about the target.",
    learn: ['Filesystem navigation & permissions', 'Package management', 'Basic networking (IP, DNS, ports)', 'A text editor you don\'t hate'],
    cheatsheetSlugs: ['linux-100-beginners-cheatsheet'],
  },
  {
    n: '01',
    title: 'Recon & Enumeration',
    summary:
      'Every engagement starts here. What is actually running, on what port, with what version — and what that tells you about where to look next.',
    learn: ['Host discovery', 'Port & service scanning', 'Service/version fingerprinting', 'Reading scan output, not just running the scan'],
    cheatsheetSlugs: ['nmap-network-recon-quick-reference'],
    courseId: 'offensive-fundamentals',
  },
  {
    n: '02',
    title: 'Web Application Testing',
    summary:
      'The most common thing exposed to the internet, and the most common way in. Learn the methodology, then the tool, in that order — Burp finds what you already know to look for.',
    learn: ['Auth & session handling', 'Access control / IDOR', 'Injection classes', 'Intercepting & replaying requests'],
    cheatsheetSlugs: ['web-app-pentest-checklist', 'burp-suite-field-guide-quick-reference'],
    courseId: 'offensive-fundamentals',
  },
  {
    n: '03',
    title: 'Active Directory Attack Paths',
    summary:
      'Where most internal engagements are actually won. This is the deepest stage on purpose — Kerberos, ACLs and delegation reward the time you put in more than anything else here.',
    learn: ['Unauthenticated & authenticated AD enumeration', 'Kerberoasting & AS-REP Roasting', 'ACL & delegation abuse', 'Credential dumping & lateral movement'],
    cheatsheetSlugs: ['windows-active-directory-enumeration'],
    courseId: 'ad-attack-paths',
  },
  {
    n: '04',
    title: 'Detection Engineering',
    summary:
      "The half almost nobody teaches. For everything above, ask what it would have left behind — then write the rule that catches it. An operator who can answer that is worth more than one who can't.",
    learn: ['Log sources per technique', 'Writing a Sigma rule', 'Mapping to MITRE ATT&CK', 'Tuning against false positives'],
    courseId: 'detection-engineering',
  },
  {
    n: '05',
    title: 'Prove It',
    summary:
      "Knowledge that hasn't been tested against something that fights back isn't worth much yet. Run the full loop end to end, then write it up like it's for someone else to read.",
    learn: ['Guided, objective-based boxes', 'Chaining techniques instead of running them in isolation', 'Writing a report someone would act on'],
    courseId: 'ctf-labs',
    practice:
      "For what a finished writeup looks like, read the real ones on writeups.zephryx.in. Hosted, guided labs are planned for labs.zephryx.in — not live yet, so for now this stage means building the lab yourself and running the loop end to end.",
  },
];

export default function RoadmapPage() {
  const cheatsheets = getAllCheatsheets();
  const cheatsheetBySlug = new Map(cheatsheets.map((c) => [c.slug, c]));

  return (
    <div className="mx-auto max-w-4xl px-5 pt-32 pb-16 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.3em] text-red-blood/70">GUIDE</p>
      <h1 className="mt-3 font-mono text-4xl font-bold tracking-tight text-ink sm:text-5xl">Roadmap</h1>
      <p className="mt-6 max-w-2xl text-[15px] leading-relaxed text-ink-dim">
        The order I&apos;d actually learn this in, not a syllabus. Each stage names what to learn,
        the free resources here that cover it today, and the learning path that goes deeper as
        it&apos;s written. Skip ahead if you already have a stage; come back to it if a later one
        stops making sense.
      </p>

      <ol className="mt-12 space-y-px border border-line bg-line">
        {STAGES.map((s) => {
          const course = s.courseId ? courseById(s.courseId) : undefined;
          const sheets = (s.cheatsheetSlugs ?? []).map((slug) => {
            const c = cheatsheetBySlug.get(slug);
            if (!c) throw new Error(`Roadmap references unknown cheatsheet slug "${slug}"`);
            return c;
          });

          return (
            <li key={s.n} className="bg-surface p-7">
              <div className="flex items-baseline gap-3">
                <span className="font-mono text-[11px] tracking-[0.3em] text-red-blood/70">{s.n}</span>
                <h2 className="font-mono text-xl font-semibold text-ink">{s.title}</h2>
              </div>

              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-dim">{s.summary}</p>

              <h3 className="mt-6 font-mono text-[11px] tracking-[0.3em] text-ink-faint">WHAT YOU&apos;LL LEARN</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.learn.map((topic) => (
                  <li key={topic} className="border border-line bg-void/60 px-2.5 py-1 font-mono text-[11px] text-ink-faint">
                    {topic}
                  </li>
                ))}
              </ul>

              {sheets.length > 0 ? (
                <div className="mt-6">
                  <h3 className="font-mono text-[11px] tracking-[0.3em] text-ink-faint">FREE RIGHT NOW</h3>
                  <ul className="mt-3 space-y-2">
                    {sheets.map((c) => (
                      <li key={c.slug}>
                        <a
                          href={`/cheatsheets/${c.file}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-mono text-sm text-red-blood hover:underline"
                        >
                          {c.title} ↗
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {course ? (
                <p className="mt-6 text-sm leading-relaxed text-ink-dim">
                  Goes deeper in{' '}
                  <Link href="/tracks/" className="text-red-blood hover:underline">
                    {course.title}
                  </Link>{' '}
                  <span className="font-mono text-[11px] text-ink-faint">({course.status.toLowerCase()})</span>.
                </p>
              ) : null}

              {s.practice ? <p className="mt-4 text-sm leading-relaxed text-ink-dim">{s.practice}</p> : null}
            </li>
          );
        })}
      </ol>

      <section className="panel clip-corner mt-14 p-7">
        <h2 className="font-mono text-lg font-semibold text-ink">Not sure what a term means?</h2>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-dim">
          The glossary has plain-language definitions for anything above that reads as jargon —
          Kerberoasting, ACLs, Sigma, all of it.
        </p>
        <Link
          href="/glossary/"
          className="clip-tab mt-6 inline-flex items-center gap-2 border border-red-deep bg-red-core px-6 py-3 font-mono text-sm font-medium text-void transition-all duration-300 hover:shadow-[0_0_30px_-4px_rgba(255,45,75,0.8)]"
        >
          Open the glossary
        </Link>
      </section>
    </div>
  );
}
