import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GameSession, GamePhase, Player } from '@/types'

export function useGameSession() {
  const router = useRouter()
  const [session, setSession] = useState<GameSession | null>(null)
  const [phase, setPhase] = useState<GamePhase>('passing')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [firstPlayer] = useState(() => Math.floor(Math.random() * 100))
  const [wordImage, setWordImage] = useState<string | null>(null)
  const [imageLoading, setImageLoading] = useState(false)

  useEffect(() => {
    const raw = sessionStorage.getItem('gameSession')
    if (!raw) {
      router.replace('/setup')
      return
    }
    setSession(JSON.parse(raw))
  }, [router])

  useEffect(() => {
    if (phase !== 'revealing') return
    const player = session?.players[currentIndex]
    if (!player || player.role === 'impostor') return

    setWordImage(null)
    setImageLoading(true)

    fetch(`/api/image?q=${encodeURIComponent(player.word)}`)
      .then((r) => r.json())
      .then((data) => {
        setWordImage(data.image)
        setImageLoading(false)
      })
      .catch(() => setImageLoading(false))
  }, [phase, currentIndex, session])

  const handleHideAndPass = (isLastPlayer: boolean) => {
    if (isLastPlayer) {
      setPhase('finished')
    } else {
      setCurrentIndex((i) => i + 1)
      setPhase('passing')
    }
  }

  const handleNewGame = () => {
    sessionStorage.removeItem('gameSession')
    router.push('/setup')
  }

  const currentPlayer: Player | null = session?.players[currentIndex] ?? null
  const isLastPlayer = session ? currentIndex === session.players.length - 1 : false
  const randomFirst = session?.players[firstPlayer % session?.players.length] ?? null

  return {
    session,
    phase,
    setPhase,
    currentPlayer,
    isLastPlayer,
    randomFirst,
    wordImage,
    imageLoading,
    handleHideAndPass,
    handleNewGame,
  }
}