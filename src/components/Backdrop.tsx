/**
 * Fixed, non-interactive atmosphere layer: grid, radial bloom, vignette.
 * Pure CSS — no JS, no canvas, no paint cost per frame beyond compositor
 * transforms.
 */
export default function Backdrop() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-void" />

      <div className="grid-bg absolute inset-0 opacity-60" />

      <div
        className="animate-drift absolute -top-1/4 left-1/2 h-[70vh] w-[70vw] -translate-x-1/2 rounded-full blur-[110px]"
        style={{
          opacity: 'var(--backdrop-bloom-opacity)',
          background:
            'radial-gradient(circle, rgba(255,45,75,0.30) 0%, rgba(143,13,36,0.12) 45%, transparent 70%)',
        }}
      />

      <div className="absolute inset-x-0 top-[62vh] h-px bg-gradient-to-r from-transparent via-red-deep/45 to-transparent" />

      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 85% at 50% 45%, transparent 30%, var(--backdrop-vignette-mid) 72%, var(--backdrop-vignette-edge) 100%)',
        }}
      />
    </div>
  );
}
