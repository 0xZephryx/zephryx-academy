/**
 * Pure formatting helpers — no Node built-ins, safe to import from client
 * components. Keeping these out of writeups.ts is what prevents node:fs / node:path
 * from being pulled into a client bundle.
 */

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? iso
    : d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB'];
  const exp = Math.min(units.length - 1, Math.floor(Math.log(bytes) / Math.log(1024)));
  const value = bytes / 1024 ** exp;
  return `${exp === 0 ? value : value.toFixed(1)} ${units[exp]}`;
}

/**
 * Trims to the last full word within `max` characters and appends an
 * ellipsis — unlike CSS `line-clamp`, which cuts mid-word wherever the Nth
 * line happens to end, regardless of the character it lands on.
 */
export function truncateWords(text: string, max: number): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}
