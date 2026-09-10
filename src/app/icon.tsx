import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 8, background: '#172D32', fontSize: 25, fontWeight: 800, letterSpacing: -2 }}><span style={{ color: '#F5F3EE' }}>R</span><span style={{ color: '#A06443' }}>M</span></div>,
    size,
  );
}
