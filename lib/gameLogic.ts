import { Player, PlayerRole } from '@/types'

export function assignRoles(
  playerCount: number,
  impostorCount: number,
  secretWord: string
): Player[] {
  const roles: PlayerRole[] = [
    ...Array(impostorCount).fill('impostor'),
    ...Array(playerCount - impostorCount).fill('player'),
  ]

  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[roles[i], roles[j]] = [roles[j], roles[i]]
  }

  return roles.map((role, index) => ({
    id: index + 1,
    name: `Jugador ${index + 1}`, // nombre temporal, se sobreescribe en el frontend
    role,
    word: role === 'player' ? secretWord : 'IMPOSTOR',
    hasRevealed: false,
  }))
}

export function pickRandomWord(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)]
}