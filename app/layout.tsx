import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'El Impostor — Juega a El Impostor Gratis con Amigos',
  description: 'Juega al Impostor gratis con tus amigos. Elige categorías, asigna roles y descubre quién es el impostor. El mejor juego de deducción para fiestas y reuniones.',
  keywords: ['impostor', 'juego impostor', 'juego deduccion', 'party game', 'juego reuniones', 'find the impostor'],
  authors: [{ name: 'Jorge' }],
  metadataBase: new URL('https://jugar-impostor.vercel.app'),
  openGraph: {
    title: 'Impostor — El juego de deducción para reuniones',
    description: 'Juega al Impostor gratis con tus amigos. Elige categorías, asigna roles y descubre quién es el impostor.',
    type: 'website',
    url: 'https://jugar-impostor.vercel.app',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Impostor — El juego de deducción para reuniones',
    description: 'Juega al Impostor gratis con tus amigos.',
  },
  alternates: {
    canonical: 'https://jugar-impostor.vercel.app',
  },
  verification: {
    google: 'nrghvnIZt8EHUiyq1WNE4YcBn6xnLlHOvUxkJH0rMF0',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

const containerStyles: React.CSSProperties = {
  maxWidth: '430px',
  minHeight: '100dvh',
  margin: '0 auto',
  position: 'relative',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <div style={containerStyles}>
          {children}
        </div>
      </body>
    </html>
  )
}