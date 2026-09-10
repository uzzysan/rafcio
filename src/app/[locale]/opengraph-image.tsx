import { ImageResponse } from 'next/og';

export const alt = 'Rafał Maculewicz — team and project leadership';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const copy = {
  en: {
    eyebrow: 'TEAM & PROJECT LEADERSHIP',
    statement: 'Connecting people, business and technology.',
    detail: 'Project delivery · Team coordination · Business Intelligence',
  },
  pl: {
    eyebrow: 'ZARZĄDZANIE ZESPOŁAMI I PROJEKTAMI',
    statement: 'Łączę ludzi, biznes i technologię.',
    detail: 'Prowadzenie projektów · Koordynacja zespołów · Business Intelligence',
  },
} as const;

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const text = locale === 'en' ? copy.en : copy.pl;

  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden', background: '#F5F3EE', color: '#172D32', fontFamily: 'Arial, sans-serif', padding: '72px 78px' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 28, height: '100%', background: '#23666B' }} />
      <div style={{ position: 'absolute', right: 110, bottom: -170, width: 430, height: 430, border: '2px solid rgba(160, 100, 67, 0.42)', borderRadius: '50%' }} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: '#23666B', fontWeight: 700 }}>{text.eyebrow}</div>
          <div style={{ width: 90, height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #23666B', borderRadius: 18, fontSize: 34, fontWeight: 800, letterSpacing: -2 }}>RM</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 900 }}>
          <div style={{ fontSize: 74, lineHeight: 1.03, fontWeight: 800, letterSpacing: -3 }}>Rafał Maculewicz</div>
          <div style={{ width: 96, height: 6, background: '#A06443', margin: '28px 0' }} />
          <div style={{ fontSize: 38, lineHeight: 1.18, fontWeight: 500 }}>{text.statement}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 21, color: '#456065' }}>
          <div>{text.detail}</div>
          <div style={{ color: '#172D32', fontWeight: 700 }}>maculewicz.pro</div>
        </div>
      </div>
    </div>,
    size,
  );
}
