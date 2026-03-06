'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GameSession, Player } from '@/types'

type Phase = 'passing' | 'revealing' | 'finished'

export default function GamePage() {
  const router = useRouter()
  const [session, setSession] = useState<GameSession | null>(null)
  const [phase, setPhase] = useState<Phase>('passing')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [firstPlayer] = useState(() => Math.floor(Math.random() * 100))
  const [wordImage, setWordImage] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('gameSession')
    if (!raw) {
      router.replace('/setup')
      return
    }
    setSession(JSON.parse(raw))
  }, [router])

  useEffect(() => {
  if (phase !== 'revealing') return
  const player = session?.players[currentIndex]
  if (!player || player.role === 'impostor') return

  setWordImage(null)
  setImageLoading(true)

  fetch(`/api/image?q=${encodeURIComponent(player.word)}`)
    .then((r) => r.json())
    .then((data) => {
      setWordImage(data.image)
      setImageLoading(false)
    })
    .catch(() => setImageLoading(false))
}, [phase, currentIndex, session])

  if (!session) return null

  const currentPlayer: Player = session.players[currentIndex]
  const isLastPlayer = currentIndex === session.players.length - 1
  const randomFirst = session.players[firstPlayer % session.players.length]

  const handleHideAndPass = () => {
    if (isLastPlayer) {
      setPhase('finished')
    } else {
      setCurrentIndex((i) => i + 1)
      setPhase('passing')
    }
  }

  // Pantalla: pasar el móvil
  if (phase === 'passing') {
    return (
      <main className="min-h-dvh flex flex-col items-center justify-center gap-5 px-6 py-16"
        style={{ background: 'var(--bg)' }}>

        <div />

        <div className="flex flex-col items-center gap-8 text-center">
          <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
            style={{ background: 'var(--surface-2)', border: '2px solid var(--border)' }}>
            👤
          </div>
          <div>
            <h2 className="text-3xl font-black mb-2">Pasale el móvil a 
              <p className='mt-3'>{currentPlayer.name}</p>
            </h2>
          </div>
          <div className="text-4xl animate-bounce">📱</div>
        </div>

        <div className="w-full flex flex-col items-center gap-3">
          <button
            onClick={() => setPhase('revealing')}
            className="w-full py-8 rounded-3xl font-bold text-xl transition-all active:scale-95 flex flex-col items-center gap-2"
            style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}
          >
            <span className="text-3xl">👁</span>
            <span>Tap para ver tu palabra</span>
          </button>
        </div>
      </main>
    )
  }

  // Pantalla: revelar rol
  if (phase === 'revealing') {
    const isImpostor = currentPlayer.role === 'impostor'

    return (
      <main className="min-h-dvh flex flex-col items-center justify-center gap-5 px-6 py-16"
        style={{ background: 'var(--bg)' }}>

        <div />

        <div className="flex flex-col items-center gap-6 text-center w-full">
          <p className="text-xs font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
            style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
            PALABRA SECRETA
          </p>

          <div className="w-full rounded-3xl p-8 flex flex-col items-center gap-4"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>

            {isImpostor ? (
              <>
                <div className="text-5xl mb-2">🕵️</div>
                <h2 className="text-4xl font-black" style={{ color: 'var(--danger)' }}>
                  ¡Eres el Impostor!
                </h2>
                {session.config.impostorHint && (
                  <div className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl"
                    style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
                    <p className="text-xl mb-1 font-bold" style={{ color: 'var(--text-muted)' }}>Pista:</p>
                    <p className="font-semibold">{session.config.categoryName}</p>
                  </div>
                )}
              </>
            ) : (
              <>
                {imageLoading && (
                  <div className="w-40 h-40 rounded-2xl animate-pulse"
                    style={{ background: 'var(--surface-2)' }} />
                )}
                {!imageLoading && wordImage && (
                  <img
                    src={wordImage}
                    alt={currentPlayer.word}
                    className="w-60 h-60 rounded-2xl object-contain"
                  />
                )}
                <h2 className="text-4xl font-black" style={{ color: 'var(--accent-2)' }}>
                  {currentPlayer.word}
                </h2>
              </>
            )}
          </div>

          <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
            ¡Memoriza y no dejes que nadie vea!
          </p>
        </div>

        <button
          onClick={handleHideAndPass}
          className="w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95"
          style={{ background: 'white', color: '#080b14' }}
        >
          Ocultar y pasar →
        </button>
      </main>
    )
  }

  // Pantalla: todos listos
  return (
    <main className="min-h-dvh flex flex-col items-center gap-10 justify-center px-6 py-16"
      style={{ background: 'var(--bg)' }}>

      <div />

      <div className="flex flex-col items-center gap-8 text-center">
        <div className="w-20 h-20 rounded-full flex items-center justify-center text-4xl"
          style={{ background: '#22c55e22', border: '2px solid #22c55e' }}>
          ✓
        </div>
        <div>
          <h2 className="text-4xl font-black mb-3">¡Todo listo!</h2>
          <p style={{ color: 'var(--text-muted)' }} className="leading-relaxed">
            Todos tienen su rol asignado.
            <br />
            <span style={{ color: 'white' }}>El impostor está entre vosotros.</span>
          </p>
        </div>
      </div>

      <div className="w-full flex flex-col gap-3 items-center">
        <div className="w-full py-4 rounded-2xl text-center"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <p className="text-2xl mb-1" style={{ color: 'var(--text-muted)' }}>Empieza</p>
          <p className="text-2xl font-medium">
            {randomFirst.name}
          </p>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem('gameSession')
            router.push('/setup')
          }}
          className="w-3/6 py-3 mt-5 rounded-2xl text-black border border-white bg-white font-semibold text-base transition-all active:scale-95"
        >
          Nueva partida
        </button>
      </div>
    </main>
  )
}