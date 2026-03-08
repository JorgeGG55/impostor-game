import { Player } from '@/types'

interface FinishedScreenProps {
  randomFirst: Player
  onNewGame: () => void
}

export default function FinishedScreen({ randomFirst, onNewGame }: FinishedScreenProps) {
  return (
    <main className="min-h-dvh flex flex-col items-center gap-10 justify-center px-6 py-16"
      style={{ background: 'var(--bg)' }}>

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
          <p className="text-2xl font-medium">{randomFirst.name}</p>
        </div>
        <button
          onClick={onNewGame}
          className="w-3/6 py-3 mt-5 rounded-2xl text-black border border-white bg-white font-semibold text-base transition-all active:scale-95"
        >
          Nueva partida
        </button>
      </div>
    </main>
  )
}