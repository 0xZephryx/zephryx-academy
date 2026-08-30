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
  { href: '/tracks/', label: 'Courses', cmd: 'ls' },
  { href: '/cheatsheets/', label: 'Cheatsheets', cmd: 'find' },
  { href: '/glossary/', label: 'Glossary', cmd: 'grep' },
  { href: '/about/', label: 'About', cmd: 'whoami' },
] as const;

export type Course = {
  id: string;
  title: string;
  summary: string;
  topics: string[];
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'Writing now' | 'Planned';
};

/**
 * Free courses, ordered the way they're meant to be taken — and written —
 * beginner first. Paid material may exist someday, but that is a separate,
 * later decision; nothing here should read as a preview of it or a reason to
 * hand over an email address first.
 */
export const COURSES: Course[] = [
  {
    id: 'linux-networking-foundations',
    title: 'Linux & Networking Foundations',
    summary:
      "Before any of this is interesting, it has to stop being frustrating. Get comfortable enough in a Linux terminal, and with core networking, that you're not fighting the basics while trying to think about the target.",
    topics: ['Filesystem & permissions', 'Package management', 'Core networking (IP, DNS, ports)', 'Shell scripting basics'],
    level: 'Beginner',
    status: 'Writing now',
  },
  {
    id: 'security-operations-foundations',
    title: 'Security Operations Foundations',
    summary:
      'The other side of the fence, for people who want in through defense first. Alert triage, log sources and the incident-handling workflow a SOC analyst actually runs.',
    topics: ['Alert triage', 'Log sources & SIEM basics', 'Incident handling workflow', 'Escalation & reporting'],
    level: 'Beginner',
    status: 'Planned',
  },
  {
    id: 'python-for-offensive-tooling',
    title: 'Python for Offensive Tooling',
    summary:
      "Enough Python to stop only running other people's tools and start writing your own — parsing scan output, automating recon, and standing up simple proof-of-concept exploits.",
    topics: ['Sockets & requests', 'Parsing scan output', 'Automating recon', 'Simple exploit PoCs'],
    level: 'Beginner',
    status: 'Planned',
  },
  {
    id: 'offensive-fundamentals',
    title: 'Offensive Security Fundamentals',
    summary:
      'Recon, enumeration and exploitation methodology for people who want the "why", not just a checklist of tools.',
    topics: ['Recon & enumeration', 'Web app exploitation', 'Privilege escalation', 'Reporting'],
    level: 'Intermediate',
    status: 'Writing now',
  },
  {
    id: 'web-app-testing-fundamentals',
    title: 'Web Application Testing Fundamentals',
    summary:
      'The most common thing exposed to the internet, and the most common way in. Methodology first, then the tooling — Burp finds what you already know to look for.',
    topics: ['Auth & session handling', 'Access control / IDOR', 'Injection classes', 'Intercepting & replaying requests'],
    level: 'Intermediate',
    status: 'Planned',
  },
  {
    id: 'ad-attack-paths',
    title: 'Active Directory Attack Paths',
    summary:
      "Kerberoasting to Golden Tickets — building and chaining the AD attack paths that show up in almost every internal engagement.",
    topics: ['Kerberoasting', 'ACL abuse', 'Delegation attacks', 'Lateral movement'],
    level: 'Advanced',
    status: 'Writing now',
  },
  {
    id: 'detection-engineering',
    title: 'Detection Engineering',
    summary:
      'The purple-team half: turning the attacks from the other courses into Sigma rules that actually catch them.',
    topics: ['Sigma rule writing', 'Log source coverage', 'ATT&CK mapping', 'Validation'],
    level: 'Advanced',
    status: 'Planned',
  },
  {
    id: 'ctf-labs',
    title: 'CTF & Practical Labs',
    summary: 'Guided, scenario-based boxes for practicing everything above end-to-end, with writeups afterward.',
    topics: ['Guided boxes', 'Scenario labs', 'Post-lab writeups'],
    level: 'Advanced',
    status: 'Planned',
  },
];
