/**
 * Single source of truth for identity, links and metadata.
 * Nothing else in the app should hardcode a link or an email address.
 */

export const SITE = {
  name: 'Zephryx Academy',
  short: 'Academy',
  // Same person as zephryx.in's `legalName` — stated here too so the Person
  // entity resolves to one identity across every domain in the network.
  legalName: 'Mihir Sarwan',
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
 * Secondary destinations: reachable from the footer, deliberately kept out
 * of the primary nav so it stays legible. The disclosure policy is centralized
 * at zephryx.in/security/ (same as every sibling's security.txt Policy field
 * points there) rather than duplicated on each domain.
 */
export const FOOTER_LINKS: { href: string; label: string; asset: boolean; external: boolean }[] = [
  { href: 'https://zephryx.in/security/', label: 'disclosure policy', asset: false, external: true },
  { href: '/.well-known/security.txt', label: 'security.txt', asset: true, external: false },
];

export type SocialLink = {
  id: string;
  label: string;
  handle: string;
  href: string;
  blurb: string;
  /** Simple-icons style path, drawn at 24x24. */
  icon: string;
  accent: string;
};

/**
 * Same channels as zephryx.in — one person, one set of accounts, shared
 * verbatim across every domain rather than re-curated per site.
 */
export const SOCIALS: SocialLink[] = [
  {
    id: 'youtube',
    label: 'YouTube',
    handle: '@0xZephryx',
    href: 'https://www.youtube.com/@0xZephryx',
    blurb: 'Long-form videos when I actually finish editing them — box walkthroughs, mostly.',
    accent: '#ff0033',
    icon: 'M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2C0 8.1 0 12 0 12s0 3.9.5 5.8a3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1c.5-1.9.5-5.8.5-5.8s0-3.9-.5-5.8ZM9.6 15.6V8.4l6.3 3.6-6.3 3.6Z',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@0xzephryx',
    href: 'https://www.instagram.com/0xzephryx',
    blurb: 'The non-work stuff. Desk setup, conference trips, occasionally my face.',
    accent: '#e1306c',
    icon: 'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.8.2 2.2.4.6.2 1 .5 1.4.9.4.4.7.8.9 1.4.2.4.4 1 .4 2.2.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 1.8-.4 2.2-.2.6-.5 1-.9 1.4-.4.4-.8.7-1.4.9-.4.2-1 .4-2.2.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.8-.2-2.2-.4-.6-.2-1-.5-1.4-.9-.4-.4-.7-.8-.9-1.4-.2-.4-.4-1-.4-2.2C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.2-1.8.4-2.2.2-.6.5-1 .9-1.4.4-.4.8-.7 1.4-.9.4-.2 1-.4 2.2-.4C8.4 2.2 8.8 2.2 12 2.2ZM12 0C8.7 0 8.3 0 7 .1 5.7.1 4.8.3 4.1.6c-.8.3-1.4.7-2.1 1.4C1.3 2.7.9 3.3.6 4.1.3 4.8.1 5.7.1 7 0 8.3 0 8.7 0 12s0 3.7.1 5c0 1.3.2 2.2.5 2.9.3.8.7 1.4 1.4 2.1.7.7 1.3 1.1 2.1 1.4.7.3 1.6.5 2.9.5 1.3.1 1.7.1 5 .1s3.7 0 5-.1c1.3 0 2.2-.2 2.9-.5.8-.3 1.4-.7 2.1-1.4.7-.7 1.1-1.3 1.4-2.1.3-.7.5-1.6.5-2.9.1-1.3.1-1.7.1-5s0-3.7-.1-5c0-1.3-.2-2.2-.5-2.9-.3-.8-.7-1.4-1.4-2.1C21.3 1.3 20.7.9 19.9.6 19.2.3 18.3.1 17 .1 15.7 0 15.3 0 12 0Zm0 5.8a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4Zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm7.8-10.4a1.4 1.4 0 1 1-2.9 0 1.4 1.4 0 0 1 2.9 0Z',
  },
  {
    id: 'x',
    label: 'X / Twitter',
    handle: '@0xZephryx',
    href: 'https://x.com/0xZephryx',
    blurb: 'I end up posting most of my in-progress notes here before they turn into a full writeup.',
    accent: '#e7e9ea',
    icon: 'M18.9 1.2h3.7l-8.1 9.2 9.5 12.4h-7.4l-5.8-7.6-6.7 7.6H.4l8.6-9.9L0 1.2h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.4h2L6.5 3.3H4.4l13.2 17.3Z',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: '@0xZephryx',
    href: 'https://github.com/0xZephryx',
    blurb: "Where the actual code lives — tools I've built, PoCs, and the Sigma rules from this site.",
    accent: '#f0f6fc',
    icon: 'M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.2 1.9 1.2 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3Z',
  },
  {
    id: 'medium',
    label: 'Medium',
    handle: '@0xZephryx',
    href: 'https://medium.com/@0xZephryx',
    blurb: 'Longer-form writing that outgrew a site post — same research, more room to explain the reasoning.',
    accent: '#f0f6fc',
    icon: 'M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12ZM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12Z',
  },
  {
    id: 'tryhackme',
    label: 'TryHackMe',
    handle: 'zephryx',
    href: 'https://tryhackme.com/p/zephryx',
    blurb: 'Rooms, rank, and badges — receipts if you want proof I actually do this and not just write about it.',
    accent: '#c6002b',
    icon: 'M10.705 0C7.54 0 4.902 2.285 4.349 5.291a4.525 4.525 0 0 0-4.107 4.5 4.525 4.525 0 0 0 4.52 4.52h6.761a.625.625 0 1 0 0-1.25H4.761a3.273 3.273 0 0 1-3.27-3.27A3.273 3.273 0 0 1 6.59 7.08a.625.625 0 0 0 .7-1.035 4.488 4.488 0 0 0-1.68-.69 5.223 5.223 0 0 1 5.096-4.104 5.221 5.221 0 0 1 5.174 4.57 4.489 4.489 0 0 0-.488.305.625.625 0 1 0 .731 1.013 3.245 3.245 0 0 1 1.912-.616 3.278 3.278 0 0 1 3.203 2.61.625.625 0 0 0 1.225-.251 4.533 4.533 0 0 0-4.428-3.61 4.54 4.54 0 0 0-.958.105C16.556 2.328 13.9 0 10.705 0z',
  },
  {
    id: 'hackthebox',
    label: 'HackTheBox',
    handle: 'zephryx',
    href: 'https://profile.hackthebox.com/profile/01a01c0d-96cc-7136-8160-fe54d9ff1c52',
    blurb: 'Boxes, ranks, and challenges — the other half of the CTF receipts.',
    accent: '#9fef00',
    icon: 'm22.5106 6.4566.0008-.0123a.888.888 0 0 0-.2717-.6384c-.0084-.0084-.018-.0155-.0267-.0235-.0186-.0166-.0371-.0333-.0572-.0484-.0193-.0147-.04-.0276-.0607-.0406-.0096-.006-.0182-.0131-.0281-.0188L12.4576.1266a.891.891 0 0 0-.9223.0043L1.933 5.6744c-.0107.0062-.0203.014-.0307.0205-.0073.0047-.015.008-.0223.0128-.007.0047-.013.0106-.02.0155a.8769.8769 0 0 0-.147.1333l-.0026.003a.8872.8872 0 0 0-.2218.5847l.0009.014c-.0002.0088-.0015.0176-.0015.0264v11.0708c0 .3277.1802.6288.469.7836l9.5986 5.5417c.0076.0044.0158.0075.0236.0117a.8754.8754 0 0 0 .166.0687c.0134.004.0266.0083.0401.0117a.8793.8793 0 0 0 .072.0142c.0117.0019.0232.0045.0349.006a.835.835 0 0 0 .2157 0c.0117-.0015.0232-.0041.0348-.006a.9.9 0 0 0 .072-.0142c.0135-.0034.0267-.0077.04-.0117a.895.895 0 0 0 .0646-.0217.9134.9134 0 0 0 .1015-.047c.0078-.0042.016-.0072.0236-.0117l9.5986-5.5417a.8888.8888 0 0 0 .469-.7836V6.4779c0-.0071-.0012-.0142-.0014-.0213zM5.2543 6.0822l6.5367-3.774a.4182.4182 0 0 1 .4182 0l6.5366 3.774a.4182.4182 0 0 1 0 .7243l-6.5367 3.774a.4182.4182 0 0 1-.4182 0l-6.5366-3.774a.4182.4182 0 0 1 0-.7243zm5.6134 14.3449a.4172.4172 0 0 1-.626.3613L3.718 17.0218a.4173.4173 0 0 1-.2086-.3613V9.1279a.4172.4172 0 0 1 .6258-.3613l6.524 3.7666a.4172.4172 0 0 1 .2086.3614v7.5325zm9.623-3.7666a.4173.4173 0 0 1-.2086.3613l-6.5239 3.7666a.4172.4172 0 0 1-.6259-.3613v-7.5325c0-.149.0796-.2868.2087-.3614l6.5239-3.7666a.4172.4172 0 0 1 .6258.3613v7.5326z',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: '/in/zephryx',
    href: 'https://www.linkedin.com/in/zephryx/',
    blurb: "The boring-but-necessary one — work history, and how to reach me if it's actually business.",
    accent: '#0a66c2',
    icon: 'M20.4 20.4h-3.6v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.3V9h3.4v1.6h.1a3.8 3.8 0 0 1 3.4-1.9c3.6 0 4.3 2.4 4.3 5.5v6.2ZM5.3 7.4a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Zm1.8 13H3.5V9h3.6v11.4ZM22.2 0H1.8A1.8 1.8 0 0 0 0 1.8v20.4C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.8V1.8c0-1-.8-1.8-1.8-1.8Z',
  },
  {
    id: 'mastodon',
    label: 'Mastodon',
    handle: '@zephryx',
    href: 'https://mastodon.social/@zephryx',
    blurb: 'Where the actual infosec community hangs out — most of my raw thoughts land here first.',
    accent: '#6364ff',
    icon: 'M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.837 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.523.363 3.084.546 4.65.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.34V9.396c0-1.133-.477-1.708-1.431-1.708-1.053 0-1.582.68-1.582 2.022v2.929h-2.327v-2.93c0-1.34-.529-2.021-1.582-2.021-.954 0-1.43.575-1.43 1.708v5.112H6.487V9.211c0-1.133.288-2.033.867-2.699.596-.666 1.377-1.008 2.345-1.008 1.12 0 1.967.43 2.529 1.29l.545.915.546-.915c.562-.86 1.41-1.29 2.529-1.29.968 0 1.749.342 2.345 1.008.579.666.867 1.566.867 2.699z',
  },
] as const;

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
    label: 'Portfolio',
    blurb: 'Portfolio, tooling and CVEs, contact.',
  },
  {
    href: 'https://writeups.zephryx.in/',
    host: 'writeups.zephryx.in',
    label: 'Research',
    blurb: 'Writeups, detection rules, and the ATT&CK coverage board.',
  },
  {
    href: 'https://security.zephryx.in/',
    host: 'security.zephryx.in',
    label: 'Services',
    blurb: 'Penetration testing for startups and growing businesses.',
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
