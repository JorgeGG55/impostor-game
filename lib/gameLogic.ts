import { Player, PlayerRole } from '@/types'

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

export function pickRandomWord(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)]
}

interface AssignRolesParams {
  playerCount: number
  impostorCount: number
  secretWord: string
  categoryName: string
  wordCategory: string
}

export function assignRoles({
  playerCount,
  impostorCount,
  secretWord,
  categoryName,
  wordCategory,
}: AssignRolesParams): Player[] {
  const roles: PlayerRole[] = shuffleArray([
    ...Array(impostorCount).fill('impostor'),
    ...Array(playerCount - impostorCount).fill('player'),
  ])

  return roles.map((role, index) => ({
    id: index + 1,
    name: `Jugador ${index + 1}`,
    role,
    word: role === 'player' ? secretWord : 'IMPOSTOR',
    hint: role === 'impostor' ? categoryName : '',
    category: role === 'impostor' ? wordCategory : '',
    hasRevealed: false,
  }))
}