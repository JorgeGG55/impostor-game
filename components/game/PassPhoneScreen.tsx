import { Player } from '@/types'

interface PassPhoneScreenProps {
  player: Player
  onReveal: () => void
}

export default function PassPhoneScreen({ player, onReveal }: PassPhoneScreenProps) {
  return (
    <main className="min-h-dvh flex flex-col items-center justify-center gap-5 px-6 py-16"
      style={{ background: 'var(--bg)' }}>

      <div className="flex flex-col items-center gap-8 text-center">
        <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
          style={{ background: 'var(--surface-2)', border: '2px solid var(--border)' }}>
          👤
        </div>
        <div>
          <h2 className="text-3xl font-black mb-2">
            Pásale el móvil a
            <p className="mt-3">{player.name}</p>
          </h2>
        </div>
        <div className="text-4xl animate-bounce">📱</div>
      </div>

      <div className="w-full flex flex-col items-center gap-3">
        <button
          onClick={onReveal}
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