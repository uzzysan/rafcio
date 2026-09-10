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
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden', background: '#F4EFE5', color: '#281C2D', fontFamily: 'Arial, sans-serif', padding: '72px 78px' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 28, height: '100%', background: '#281C2D' }} />
      <div style={{ position: 'absolute', right: 110, bottom: -170, width: 430, height: 430, border: '2px solid rgba(109, 76, 104, 0.32)', borderRadius: '50%' }} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: '#6D4C68', fontWeight: 700 }}>{text.eyebrow}</div>
          <svg width="100" height="100" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><rect width="120" height="120" rx="18" fill="#281C2D"/><path d="M11 34V18a7 7 0 0 1 7-7h16M86 11h16a7 7 0 0 1 7 7v16M109 86v16a7 7 0 0 1-7 7H86M34 109H18a7 7 0 0 1-7-7V86" fill="none" stroke="#B18A57" strokeWidth="2" strokeLinecap="round"/><path d="M57 96V52h8l16 25 16-25h8v44h-9V69L84 88h-6L66 69v27Z" fill="#B18A57"/><path d="M20 98h34v-5H31V65h16l23 33h13L58 63c11-4 17-12 17-23 0-16-12-24-31-24H20v5h3v72h-3Zm11-42V25h13c14 0 22 5 22 15s-8 16-22 16Z" fill="#F4EFE5" fillRule="evenodd"/><path d="M54 65 65 82" fill="none" stroke="#281C2D" strokeWidth="3" strokeLinecap="round"/><circle cx="59.5" cy="73.5" r="2.3" fill="#B18A57"/></svg>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 900 }}>
          <div style={{ fontSize: 74, lineHeight: 1.03, fontWeight: 800, letterSpacing: -3 }}>Rafał Maculewicz</div>
          <div style={{ width: 96, height: 6, background: '#B18A57', margin: '28px 0' }} />
          <div style={{ fontSize: 38, lineHeight: 1.18, fontWeight: 500 }}>{text.statement}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 21, color: '#6D4C68' }}>
          <div>{text.detail}</div>
          <div style={{ color: '#281C2D', fontWeight: 700 }}>maculewicz.pro</div>
        </div>
      </div>
    </div>,
    size,
  );
}
