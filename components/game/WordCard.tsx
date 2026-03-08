import { Player } from '@/types'

interface WordCardProps {
  player: Player
  impostorHint: boolean
  wordImage: string | null
  imageLoading: boolean
}

export default function WordCard({ player, impostorHint, wordImage, imageLoading }: WordCardProps) {
  const isImpostor = player.role === 'impostor'

  return (
    <div className="w-full rounded-3xl p-8 flex flex-col items-center gap-4"
      style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>

      {isImpostor ? (
        <>
          <div className="text-5xl mb-2">🕵️</div>
          <h2 className="text-4xl font-black" style={{ color: 'var(--danger)' }}>
            ¡Eres el Impostor!
          </h2>
          {impostorHint && (
            <div className="mt-2 flex items-center gap-2 px-4 py-2 rounded-xl"
              style={{ background: 'var(--surface-2)', border: '1px solid var(--border)' }}>
              <p className="text-xl mb-1 font-bold" style={{ color: 'var(--text-muted)' }}>Pista:</p>
              <p className="font-semibold">{player.hint}</p>
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
              alt={player.word}
              className="w-60 h-60 rounded-2xl object-contain"
            />
          )}
          <h2 className="text-4xl font-black" style={{ color: 'var(--accent-2)' }}>
            {player.word}
          </h2>
        </>
      )}
    </div>
  )
}