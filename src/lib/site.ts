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
  tagline: 'Hands-on offensive security training, from the person who breaks in for a living.',
  description:
    "Zephryx Academy is a hands-on offensive security training ground — Active Directory attack paths, adversary emulation and detection engineering, taught by a working penetration tester. Courses are in development; join the waitlist to hear first.",
  locale: 'en_IN',
} as const;

export const MAILBOX = {
  address: 'academy@zephryx.in',
} as const;

export const NAV = [
  { href: '/', label: 'Home', cmd: '~' },
  { href: '/about/', label: 'About', cmd: 'whoami' },
  { href: '/tracks/', label: 'Tracks', cmd: 'ls' },
  { href: '/cheatsheets/', label: 'Cheatsheets', cmd: 'find' },
] as const;

export type Track = {
  id: string;
  title: string;
  summary: string;
  topics: string[];
  status: 'In development' | 'Planned';
};

export const TRACKS: Track[] = [
  {
    id: 'ad-attack-paths',
    title: 'Active Directory Attack Paths',
    summary:
      "Kerberoasting to Golden Tickets — building and chaining the AD attack paths that show up in almost every internal engagement.",
    topics: ['Kerberoasting', 'ACL abuse', 'Delegation attacks', 'Lateral movement'],
    status: 'In development',
  },
  {
    id: 'offensive-fundamentals',
    title: 'Offensive Security Fundamentals',
    summary:
      'Recon, enumeration and exploitation methodology for people who want the "why", not just a checklist of tools.',
    topics: ['Recon & enumeration', 'Web app exploitation', 'Privilege escalation', 'Reporting'],
    status: 'In development',
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
