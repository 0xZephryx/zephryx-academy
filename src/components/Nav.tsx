'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { NAV, SITE } from '@/lib/site';

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href.replace(/\/$/, ''));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'border-b border-line/80 bg-void/80 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="group flex items-center gap-2.5" aria-label={`${SITE.name} — home`}>
          <span className="relative flex h-7 w-7 items-center justify-center border border-red-deep/60 bg-red-ash/20">
            <span className="animate-pulse-ring absolute inset-0" />
            <span className="font-mono text-[13px] font-bold text-red-blood">Z</span>
          </span>
          <span className="font-mono text-[15px] font-semibold tracking-tight text-ink">
            zephryx<span className="text-red-blood">/academy</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={`group relative flex items-baseline gap-1.5 px-3 py-2 font-mono text-[13px] transition-colors duration-300 ${
                  active ? 'text-ink' : 'text-ink-faint hover:text-ink-dim'
                }`}
              >
                {item.label}
                <span
                  className={`text-[10px] transition-colors duration-300 ${
                    active ? 'text-red-blood/70' : 'text-ink-faint/60 group-hover:text-red-blood/60'
                  }`}
                  aria-hidden
                >
                  {item.cmd}
                </span>
                <span
                  className={`absolute inset-x-2.5 bottom-1 h-px origin-left bg-red-blood transition-transform duration-300 ${
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </Link>
            );
          })}
          <a
            href="#waitlist"
            className="clip-tab ml-2.5 flex items-baseline gap-1.5 border border-red-deep/70 bg-red-ash/25 px-3.5 py-2 font-mono text-[13px] text-red-blood transition-all duration-300 hover:bg-red-blood hover:text-void hover:shadow-[0_0_24px_-4px_rgba(255,45,75,0.7)]"
          >
            Join waitlist
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-line lg:hidden"
        >
          <span className={`h-px w-4 bg-ink transition-all duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
          <span className={`h-px w-4 bg-ink transition-all duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
        </button>
      </div>

      <div
        id="mobile-nav"
        className={`overflow-hidden border-t border-line/60 bg-void/95 backdrop-blur-xl transition-[max-height,opacity] duration-400 lg:hidden ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col px-5 py-3" aria-label="Mobile">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between border-b border-line/50 py-3.5 font-mono text-sm last:border-0 ${
                isActive(item.href) ? 'text-red-blood' : 'text-ink-dim'
              }`}
            >
              <span>{item.label}</span>
              <span className="text-[11px] text-ink-faint" aria-hidden>
                {item.cmd}
              </span>
            </Link>
          ))}
          <a href="#waitlist" className="py-3.5 font-mono text-sm text-red-blood">
            Join waitlist →
          </a>
        </nav>
      </div>
    </header>
  );
}
