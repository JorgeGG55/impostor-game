import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Impostor',
  description: 'El juego de deducción para tus reuniones',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <div
          style={{
            maxWidth: '430px',
            minHeight: '100dvh',
            margin: '0 auto',
            position: 'relative',
          }}
        >
          {children}
        </div>
      </body>
    </html>
  )
}