export interface GameConfig {
  categoryId: string
  categoryName: string
  playerCount: number
  impostorCount: number
  impostorHint: boolean
}

export type PlayerRole = 'player' | 'impostor'

export interface Player {
  id: number
  name: string
  role: PlayerRole
  word: string
  hint: string
  hasRevealed: boolean
}

export type GamePhase = 'passing' | 'revealing' | 'finished'

export interface GameSession {
  config: GameConfig
  players: Player[]
  currentPlayerIndex: number
  phase: GamePhase
  secretWord: string
}

export interface CategoryResponse {
  _id: string
  name: string
  emoji: string
  wordCount: number
}

export interface CreateGameResponse {
  players: Player[]
  secretWord: string
  categoryName: string
}