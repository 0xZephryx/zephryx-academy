import type { Metadata } from 'next';
import Link from 'next/link';
import { MAILBOX, SITE } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    "Who teaches at Zephryx Academy, what the courses cover, and the rules the training is built on — hands-on offensive security from a working penetration tester.",
  alternates: { canonical: `${SITE.url}/about/` },
};

const FAQ = [
  {
    q: 'When does the first course open?',
    a: "No date I'd stand behind yet. The first track is being built now, and the waitlist gets told before anything is announced publicly.",
  },
  {
    q: 'What will it cost?',
    a: "Not decided. What I can say is there will be free material — the writeups and detection rules on writeups.zephryx.in already are, and that doesn't change. The cheatsheets here are free too.",
  },
  {
    q: 'Who is this for?',
    a: "People who already have the fundamentals and want to get properly good at internal network and Active Directory work. Not a first-ever-intro-to-Linux course — that ground is well covered elsewhere.",
  },
  {
    q: 'Do I need my own lab?',
    a: "The tracks are written so you can follow along in a lab you build yourself, and the build is part of the material. Hosted labs are being considered, not promised.",
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-3xl px-5 pt-32 pb-16 sm:px-8">
      <p className="font-mono text-[11px] tracking-[0.3em] text-red-blood/70">ABOUT</p>
      <h1 className="mt-3 font-mono text-4xl font-bold tracking-tight text-ink sm:text-5xl">
        Who is teaching this
      </h1>

      <div className="mt-10 space-y-6 text-[15px] leading-relaxed text-ink-dim">
        <p>
          {SITE.name} is run by the same person behind{' '}
          <a href={SITE.parentUrl} className="text-red-blood hover:underline">
            zephryx.in
          </a>{' '}
          — a penetration tester and security researcher who spends the week breaking into
          networks and the rest of it writing up exactly how, dead ends included.
        </p>
        <p>
          The reason this exists is simple: most security training teaches tools. You finish
          knowing which flag to pass, and then the target does not look like the lab and you are
          stuck. The material here is built the other way round — from the reasoning that lets you
          work out the next step on a network nobody wrote a walkthrough for.
        </p>
        <p>
          The other half is detection. Every attack track has a counterpart that turns the same
          technique into a Sigma rule and asks what would have caught you. An operator who can
          answer that is worth considerably more than one who cannot, and it is the part almost
          nobody teaches.
        </p>
      </div>

      <section className="mt-16">
        <h2 className="font-mono text-2xl font-bold tracking-tight text-ink">Common questions</h2>
        <dl className="mt-8 space-y-px border border-line bg-line">
          {FAQ.map((item) => (
            <div key={item.q} className="bg-surface p-6">
              <dt className="font-mono text-[15px] font-semibold text-ink">{item.q}</dt>
              <dd className="mt-2.5 text-sm leading-relaxed text-ink-dim">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 panel clip-corner p-7">
        <h2 className="font-mono text-lg font-semibold text-ink">Reach me</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-dim">
          Questions about the curriculum, corporate or group training, or anything you think the
          tracks are missing —{' '}
          <a href={`mailto:${MAILBOX.address}`} className="font-mono text-red-blood hover:underline">
            {MAILBOX.address}
          </a>
          .
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
