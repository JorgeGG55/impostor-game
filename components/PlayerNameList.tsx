interface PlayerNameListProps {
  playerCount: number
  playerNames: string[]
  onChange: (names: string[]) => void
}

export default function PlayerNameList({ playerCount, playerNames, onChange }: PlayerNameListProps) {
  return (
    <>
      {Array.from({ length: playerCount }, (_, i) => (
        <input
          key={i}
          type="text"
          placeholder={`Jugador ${i + 1}`}
          value={playerNames[i] ?? ''}
          onChange={(e) => {
            const updated = [...playerNames]
            updated[i] = e.target.value
            onChange(updated)
          }}
          className="w-full border border-white outline-none p-3 rounded-xl font-medium text-base"
        />
      ))}
    </>
  )
}