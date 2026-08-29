/**
 * Single source of truth for identity, links and metadata.
 * Nothing else in the app should hardcode a link or an email address.
 */

export const SITE = {
  name: 'Zephryx Academy',
  short: 'Academy',
  parentName: 'Zephryx',
  parentUrl: 'https://zephryx.in',
  domain: 'academy.zephryx.in',
  url: 'https://academy.zephryx.in',
  tagline: 'Free, hands-on offensive security education, from the person who breaks in for a living.',
  description:
    'Zephryx Academy is free offensive security and pentesting education — Active Directory attack paths, adversary emulation and detection engineering, taught by a working penetration tester. Cheatsheets, guides and labs, no paywall.',
  locale: 'en_IN',
} as const;

export const MAILBOX = {
  address: 'academy@zephryx.in',
} as const;

/**
 * The rest of the network.
 *
 * Hostnames belong here rather than inline in a page, same rule as everything
 * else in this file. The research corpus moved to its own domain, which is the
 * sort of change that quietly falsifies any hostname written out by hand
 * somewhere else in the tree.
 */
export const NETWORK = [
  {
    href: 'https://zephryx.in/',
    host: 'zephryx.in',
    blurb: 'portfolio & tooling',
  },
  {
    href: 'https://writeups.zephryx.in/',
    host: 'writeups.zephryx.in',
    blurb: 'research & writeups',
  },
  {
    href: 'https://security.zephryx.in/',
    host: 'security.zephryx.in',
    blurb: 'pentest services',
  },
] as const;

export const NAV = [
  { href: '/', label: 'Home', cmd: '~' },
  { href: '/roadmap/', label: 'Roadmap', cmd: 'map' },
  { href: '/tracks/', label: 'Tracks', cmd: 'ls' },
  { href: '/cheatsheets/', label: 'Cheatsheets', cmd: 'find' },
  { href: '/glossary/', label: 'Glossary', cmd: 'grep' },
  { href: '/about/', label: 'About', cmd: 'whoami' },
] as const;

export type Track = {
  id: string;
  title: string;
  summary: string;
  topics: string[];
  status: 'Writing now' | 'Planned';
};

/**
 * Free learning paths — not courses for sale. Paid material may exist
 * someday, but that is a separate, later decision; nothing here should read
 * as a preview of it or a reason to hand over an email address first.
 */
export const TRACKS: Track[] = [
  {
    id: 'ad-attack-paths',
    title: 'Active Directory Attack Paths',
    summary:
      "Kerberoasting to Golden Tickets — building and chaining the AD attack paths that show up in almost every internal engagement.",
    topics: ['Kerberoasting', 'ACL abuse', 'Delegation attacks', 'Lateral movement'],
    status: 'Writing now',
  },
  {
    id: 'offensive-fundamentals',
    title: 'Offensive Security Fundamentals',
    summary:
      'Recon, enumeration and exploitation methodology for people who want the "why", not just a checklist of tools.',
    topics: ['Recon & enumeration', 'Web app exploitation', 'Privilege escalation', 'Reporting'],
    status: 'Writing now',
  },
  {
    id: 'detection-engineering',
    title: 'Detection Engineering',
    summary:
      'The purple-team half: turning the attacks from the other tracks into Sigma rules that actually catch them.',
    topics: ['Sigma rule writing', 'Log source coverage', 'ATT&CK mapping', 'Validation'],
    status: 'Planned',
  },
  {
    id: 'ctf-labs',
    title: 'CTF & Practical Labs',
    summary: 'Guided, scenario-based boxes for practicing everything above end-to-end, with writeups afterward.',
    topics: ['Guided boxes', 'Scenario labs', 'Post-lab writeups'],
    status: 'Planned',
  },
];
