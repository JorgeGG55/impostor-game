import Link from 'next/link'
import AnimatedHero from '@/components/AnimatedHero'

export default function Home() {
  return (
    <main
      className="min-h-dvh flex flex-col items-center justify-between px-6 py-12"
      style={{ background: 'var(--bg)' }}
    >
      {/* Hero */}
      <div className="flex flex-col items-center text-center gap-6">
        <AnimatedHero />

        <div>
          <h1 className="text-5xl font-black leading-none mb-2">
            Encuentra al
          </h1>
          <h1 className="text-5xl font-black leading-none" style={{ color: 'var(--accent-2)' }}>
            Impostor
          </h1>
        </div>

        <p className="text-base max-w-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          El juego definitivo de engaño, deducción y diversión para ti y tus amigos.
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/setup"
        className="w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-transform active:scale-95"
        style={{ background: 'white', color: '#080b14' }}
      >
        Empezar juego →
      </Link>
    </main>
  )
}