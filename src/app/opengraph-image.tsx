import { ImageResponse } from 'next/og';
import { SITE } from '@/lib/site';

/**
 * Static social-preview card. No dynamic params, so `output: 'export'` bakes
 * this into a plain PNG at build time — Next wires the og:image / twitter:image
 * tags into every page automatically, no manual metadata.images needed.
 */
export const alt = `${SITE.name} — hands-on offensive security training`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const dynamic = 'force-static';

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#06070a',
          backgroundImage:
            'linear-gradient(rgba(255,45,75,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,45,75,0.09) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            background:
              'radial-gradient(ellipse 90% 80% at 50% 45%, transparent 25%, rgba(6,7,10,0.75) 100%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            border: '1px solid #1c2230',
            background: 'rgba(10,12,17,0.7)',
            padding: '8px 18px',
            color: '#98a1af',
            fontSize: 22,
            marginBottom: 30,
          }}
        >
          <div style={{ width: 9, height: 9, borderRadius: 999, background: '#29d391', display: 'flex' }} />
          FREE OFFENSIVE SECURITY EDUCATION
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 120,
            fontWeight: 700,
            color: '#e8ebef',
            letterSpacing: -4,
            lineHeight: 1,
          }}
        >
          <span style={{ display: 'flex', color: '#e8ebef' }}>ZEPHRYX</span>
          <span style={{ display: 'flex', color: '#ff2d4b' }}>/ACADEMY</span>
        </div>

        <div style={{ display: 'flex', marginTop: 30, fontSize: 30, color: '#98a1af' }}>
          Learn to break in. Then learn what catches you.
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 44,
            left: 64,
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            fontSize: 24,
            color: '#5c6675',
          }}
        >
          <div
            style={{
              display: 'flex',
              width: 34,
              height: 34,
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(143,13,36,0.6)',
              background: 'rgba(74,10,23,0.2)',
              color: '#ff2d4b',
              fontWeight: 700,
              fontSize: 18,
            }}
          >
            Z
          </div>
          <span>{SITE.domain}</span>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 44,
            right: 64,
            display: 'flex',
            fontSize: 22,
            color: '#5c6675',
          }}
        >
          attack · detect · repeat
        </div>
      </div>
    ),
    { ...size },
  );
}
