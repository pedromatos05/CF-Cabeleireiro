import { ImageResponse } from 'next/og'

// Imagem mostrada quando o site é partilhado (Google, WhatsApp, redes sociais).
export const alt = 'CF Cabeleireiro — Cabeleireiro e Estética em Braga'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
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
          backgroundColor: '#FDFAF4',
          backgroundImage:
            'radial-gradient(circle at 50% 0%, #F0E0C8 0%, #FDFAF4 60%)',
          fontFamily: 'serif',
          color: '#261508',
        }}
      >
        <div
          style={{
            fontSize: 40,
            letterSpacing: 8,
            textTransform: 'uppercase',
            color: '#A87347',
          }}
        >
          Cabeleireiro &amp; Estética
        </div>
        <div style={{ fontSize: 110, fontWeight: 700, marginTop: 12 }}>
          CF Cabeleireiro
        </div>
        <div
          style={{
            width: 120,
            height: 4,
            backgroundColor: '#C4996C',
            margin: '28px 0',
          }}
        />
        <div style={{ fontSize: 44, color: '#5E3A22' }}>em Braga</div>
      </div>
    ),
    { ...size },
  )
}
