import Link from 'next/link';
import { MAILBOX, NAV, NETWORK, SITE } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative z-10 mt-32 border-t border-line/70 bg-abyss/60 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center border border-red-deep/60 bg-red-ash/20 font-mono text-[13px] font-bold text-red-blood">
                Z
              </span>
              <span className="font-mono text-[15px] font-semibold text-ink">
                zephryx<span className="text-red-blood">/academy</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-dim">{SITE.tagline}</p>
            <p className="mt-4 font-mono text-[11px] leading-relaxed text-ink-faint">
              A training ground from{' '}
              <a href={SITE.parentUrl} className="text-red-blood/80 hover:text-red-blood">
                {SITE.parentName}
              </a>
              .
            </p>
          </div>

          <nav aria-label="Footer">
            <h3 className="mb-4 font-mono text-[11px] tracking-[0.3em] text-ink-faint">ROUTES</h3>
            <ul className="space-y-2.5">
              {NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="group flex items-baseline gap-1.5 font-mono text-sm text-ink-dim transition-colors hover:text-red-blood"
                  >
                    {item.label}
                    <span className="text-[10px] text-ink-faint transition-colors group-hover:text-red-blood/60" aria-hidden>
                      {item.cmd}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h3 className="mb-4 font-mono text-[11px] tracking-[0.3em] text-ink-faint">CONTACT</h3>
            <ul className="space-y-2.5">
              <li>
                <a
                  href={`mailto:${MAILBOX.address}`}
                  className="font-mono text-sm text-ink-dim transition-colors hover:text-red-blood"
                >
                  {MAILBOX.address}
                </a>
              </li>
              {/* Sibling sites, rendered from NETWORK in site.ts. This list
                  previously carried only the parent, which left the research
                  site and the services site reachable from nowhere here. */}
              {NETWORK.map((site) => (
                <li key={site.href}>
                  <a
                    href={site.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 font-mono text-sm text-ink-dim transition-colors hover:text-red-blood"
                  >
                    {site.host} — {site.blurb}
                    <span className="text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5 group-hover:text-red-blood">
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-line/60 pt-6 font-mono text-[11px] text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {SITE.parentName}. All rights reserved.</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-warn" />
            status: pre-launch — courses in development
          </p>
        </div>
      </div>
    </footer>
  );
}
