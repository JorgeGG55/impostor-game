import { Player, PlayerRole } from '@/types'

/**
 * Genera el array de jugadores con roles asignados aleatoriamente.
 * 
 * Ejemplo: 4 jugadores, 1 impostor
 * → [player, player, impostor, player] (mezclados aleatoriamente)
 */
export function assignRoles(
  playerCount: number,
  impostorCount: number,
  secretWord: string
): Player[] {
  // Crear array de roles
  const roles: PlayerRole[] = [
    ...Array(impostorCount).fill('impostor'),
    ...Array(playerCount - impostorCount).fill('player'),
  ]

  // Mezclar roles aleatoriamente (Fisher-Yates shuffle)
  for (let i = roles.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[roles[i], roles[j]] = [roles[j], roles[i]]
  }

  // Crear objetos Player
  return roles.map((role, index) => ({
    id: index + 1,
    role,
    word: role === 'player' ? secretWord : 'IMPOSTOR',
    hasRevealed: false,
  }))
}

/**
 * Selecciona una palabra aleatoria de un array
 */
export function pickRandomWord(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)]
}