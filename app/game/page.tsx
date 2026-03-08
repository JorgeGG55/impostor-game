'use client'

import { useGameSession } from '@/hooks/useGameSession'
import PassPhoneScreen from '@/components/game/PassPhoneScreen'
import RevealScreen from '@/components/game/RevealScreen'
import FinishedScreen from '@/components/game/FinishedScreen'

export default function GamePage() {
  const {
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
  } = useGameSession()

  if (!session || !currentPlayer || !randomFirst) return null

  if (phase === 'passing') {
    return (
      <PassPhoneScreen
        player={currentPlayer}
        onReveal={() => setPhase('revealing')}
      />
    )
  }

  if (phase === 'revealing') {
    return (
      <RevealScreen
        player={currentPlayer}
        session={session}
        wordImage={wordImage}
        imageLoading={imageLoading}
        onHideAndPass={() => handleHideAndPass(isLastPlayer)}
      />
    )
  }

  return (
    <FinishedScreen
      randomFirst={randomFirst}
      onNewGame={handleNewGame}
    />
  )
}