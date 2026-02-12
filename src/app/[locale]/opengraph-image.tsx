import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';

export const runtime = 'edge';

export const alt = 'Rafał Maculewicz | Data Analyst & Power BI Expert';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage' });

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #030712 0%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
          padding: '40px',
        }}
      >
        {/* Background Decorations */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '400px',
            height: '400px',
            background: 'rgba(34, 211, 238, 0.1)',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '-100px',
            width: '400px',
            height: '400px',
            background: 'rgba(129, 140, 248, 0.1)',
            borderRadius: '50%',
            filter: 'blur(100px)',
          }}
        />

        {/* Content Container */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            padding: '60px',
            borderRadius: '40px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <div
            style={{
              fontSize: '80px',
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #22d3ee 0%, #818cf8 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '20px',
            }}
          >
            Rafał Maculewicz
          </div>
          
          <div
            style={{
              fontSize: '32px',
              color: '#94a3b8',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '40px',
            }}
          >
            {t('role')}
          </div>

          <div
            style={{
              display: 'flex',
              gap: '20px',
            }}
          >
            {['Power BI', 'Data Analytics', 'Azure', 'Dev'].map((tag) => (
              <div
                key={tag}
                style={{
                  padding: '8px 20px',
                  borderRadius: '20px',
                  background: 'rgba(34, 211, 238, 0.1)',
                  color: '#22d3ee',
                  fontSize: '18px',
                  border: '1px solid rgba(34, 211, 238, 0.2)',
                }}
              >
                {tag}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '40px',
            color: '#64748b',
            fontSize: '20px',
          }}
        >
          maculewicz.pro
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
