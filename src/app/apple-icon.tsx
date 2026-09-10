import { ImageResponse } from 'next/og';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 23, background: '#172D32', fontSize: 68, fontWeight: 800, letterSpacing: -5 }}><span style={{ color: '#F5F3EE' }}>R</span><span style={{ color: '#A06443' }}>M</span></div>,
    size,
  );
}
