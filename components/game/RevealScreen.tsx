import { Player, GameSession } from '@/types'
import WordCard from './WordCard'

interface RevealScreenProps {
  player: Player
  session: GameSession
  wordImage: string | null
  imageLoading: boolean
  onHideAndPass: () => void
}

export default function RevealScreen({
  player,
  session,
  wordImage,
  imageLoading,
  onHideAndPass,
}: RevealScreenProps) {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center gap-5 px-6 py-16"
      style={{ background: 'var(--bg)' }}>

      <div className="flex flex-col items-center gap-6 text-center w-full">
        <p className="text-1xl font-semibold tracking-widest uppercase px-4 py-2 rounded-full"
          style={{ background: 'var(--surface-2)', color: 'var(--text-muted)' }}>
          PALABRA SECRETA
        </p>

        <WordCard
          player={player}
          impostorHint={session.config.impostorHint}
          wordImage={wordImage}
          imageLoading={imageLoading}
        />

        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
          ¡Memoriza y no dejes que nadie vea!
        </p>
      </div>

      <button
        onClick={onHideAndPass}
        className="w-full py-4 rounded-2xl font-bold text-sm transition-all active:scale-95"
        style={{ background: 'white', color: '#080b14' }}
      >
        Ocultar y pasar →
      </button>
    </main>
  )
}