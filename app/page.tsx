'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <main className="min-h-dvh flex flex-col items-center justify-between px-6 py-12"
      style={{ background: 'var(--bg)' }}>

      {/* Hero */}
      <div className="flex flex-col items-center text-center gap-6">
        {/* Máscara animada */}
        <div className="relative w-52 h-52 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full opacity-20 animate-pulse"
            style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }} />
          <div className="text-9xl select-none">🕵️</div>
        </div>

        <div>
          <h1 className="text-5xl font-black leading-none mb-2">
            Encuentra al
          </h1>
          <h1 className="text-5xl font-black leading-none"
            style={{ color: 'var(--accent-2)' }}>
            Impostor
          </h1>
        </div>

        <p className="text-base max-w-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          El juego definitivo de engaño, deducción y diversión para ti y tus amigos.
        </p>
      </div>

      {/* CTA */}
      <button
        onClick={() => router.push('/setup')}
        className="w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-transform active:scale-95"
        style={{ background: 'white', color: '#080b14' }}
      >
        Empezar juego <span>→</span>
      </button>
    </main>
  )
}