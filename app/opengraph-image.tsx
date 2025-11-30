import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Muaaz Lattif Portfolio'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0b0f13',
          color: 'white',
        }}
      >
        {/* Background Accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'radial-gradient(circle at center, rgba(58, 160, 255, 0.2), transparent 80%)',
          }}
        />
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10 }}>
          <div style={{ fontSize: 70, fontWeight: 'bold', letterSpacing: '-0.05em', color: 'white' }}>
            MUAAZ LATTIFF
          </div>
          <div style={{ fontSize: 30, color: '#3aa0ff', marginTop: 20, letterSpacing: '0.1em' }}>
            CREATIVE DEVELOPER
          </div>
          <div style={{ 
            marginTop: 40, 
            padding: '10px 30px', 
            border: '2px solid #3aa0ff', 
            borderRadius: '50px',
            fontSize: 24,
            color: '#3aa0ff'
          }}>
            muaaz.dev
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}