// Configuración del juego que el usuario elige en setup
export interface GameConfig {
  categoryId: string
  categoryName: string
  playerCount: number
  impostorCount: number
}

// El rol de cada jugador
export type PlayerRole = 'player' | 'impostor'

// Datos de cada jugador durante la partida
export interface Player {
  id: number        // 1, 2, 3...
  name: string
  role: PlayerRole
  word: string      // La palabra si es jugador, "IMPOSTOR" si es impostor
  hasRevealed: boolean
}

// Estado completo de la sesión de juego
export interface GameSession {
  config: GameConfig
  players: Player[]
  currentPlayerIndex: number  // índice del jugador que tiene el móvil ahora
  phase: 'passing' | 'revealing' | 'finished'
  secretWord: string
}

// Respuesta de la API de categorías
export interface CategoryResponse {
  _id: string
  name: string
  emoji: string
  wordCount: number  // Solo mandamos el count, no las palabras (seguridad)
}

// Respuesta de la API al crear una sesión
export interface CreateGameResponse {
  players: Player[]
  secretWord: string
  categoryName: string
}