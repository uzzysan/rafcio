import { ImageResponse } from 'next/og';
import { BrandMark } from '@/components/BrandMark';

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
    <div style={{ width: '100%', height: '100%', display: 'flex', position: 'relative', overflow: 'hidden', background: '#F5F0E8', color: '#241628', fontFamily: 'Arial, sans-serif', padding: '72px 78px' }}>
      <div style={{ position: 'absolute', top: 0, right: 0, width: 28, height: '100%', background: '#241628' }} />
      <div style={{ position: 'absolute', right: 110, bottom: -170, width: 430, height: 430, border: '2px solid rgba(109, 76, 104, 0.32)', borderRadius: '50%' }} />
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 22, letterSpacing: 4, color: '#6D4C68', fontWeight: 700 }}>{text.eyebrow}</div>
          <BrandMark size={100} labelled />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 900 }}>
          <div style={{ fontSize: 74, lineHeight: 1.03, fontWeight: 800, letterSpacing: -3 }}>Rafał Maculewicz</div>
          <div style={{ width: 96, height: 6, background: '#B18A57', margin: '28px 0' }} />
          <div style={{ fontSize: 38, lineHeight: 1.18, fontWeight: 500 }}>{text.statement}</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 21, color: '#6D4C68' }}>
          <div>{text.detail}</div>
          <div style={{ color: '#241628', fontWeight: 700 }}>maculewicz.pro</div>
        </div>
      </div>
    </div>,
    size,
  );
}
