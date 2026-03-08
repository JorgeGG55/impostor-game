import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CategoryResponse, Player } from '@/types'

export function useGameSetup() {
  const router = useRouter()
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<CategoryResponse[]>([])
  const [playerCount, setPlayerCount] = useState<number | ''>('')
  const [impostorCount, setImpostorCount] = useState<number | ''>('')
  const [playerNames, setPlayerNames] = useState<string[]>([])
  const [starting, setStarting] = useState(false)
  const [impostorHint, setImpostorHint] = useState(false)

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((data: CategoryResponse[]) => {
        setCategories(data)
        setLoading(false)

        const raw = sessionStorage.getItem('lastConfig')
        if (!raw) return
        const prev = JSON.parse(raw)

        setPlayerCount(prev.config.playerCount)
        setImpostorCount(prev.config.impostorCount)
        setPlayerNames(prev.names ?? [])
        setSelectedCategories(prev.selectedCategories ?? [])
        setImpostorHint(prev.config.impostorHint ?? false)
      })
  }, [])

  useEffect(() => {
    if (typeof playerCount === 'number') {
      setPlayerNames((prev) =>
        Array.from({ length: playerCount }, (_, i) => prev[i] ?? '')
      )
    }
  }, [playerCount])

  const maxImpostors = typeof playerCount === 'number'
    ? Math.min(3, Math.max(1, playerCount - 2))
    : 1

  const toggleCategory = (cat: CategoryResponse) => {
    setSelectedCategories((prev) =>
      prev.some((c) => c._id === cat._id)
        ? prev.filter((c) => c._id !== cat._id)
        : [...prev, cat]
    )
  }

  const handleStart = async () => {
    if (selectedCategories.length === 0 || playerCount === '' || impostorCount === '') return
    setStarting(true)

    try {
      const res = await fetch('/api/game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryIds: selectedCategories.map((c) => c._id),
          playerCount,
          impostorCount,
        }),
      })

      const data = await res.json()

      const names = Array.from({ length: playerCount as number }, (_, i) =>
        playerNames[i]?.trim() || `Jugador ${i + 1}`
      )

      const categoryName = selectedCategories.map((c) => c.name).join(' & ')

      sessionStorage.setItem('lastConfig', JSON.stringify({
        config: {
          categoryIds: selectedCategories.map((c) => c._id),
          categoryName,
          playerCount,
          impostorCount,
          impostorHint,
        },
        names,
        selectedCategories,
      }))

      sessionStorage.setItem('gameSession', JSON.stringify({
        config: {
          categoryIds: selectedCategories.map((c) => c._id),
          categoryName,
          playerCount,
          impostorCount,
          impostorHint,
        },
        players: data.players.map((p: Player, i: number) => ({ ...p, name: names[i] })),
        secretWord: data.secretWord,
        currentPlayerIndex: 0,
        phase: 'passing',
      }))

      router.push('/game')
    } catch (err) {
      console.error(err)
      setStarting(false)
    }
  }

  return {
    categories,
    loading,
    selectedCategories,
    playerCount,
    setPlayerCount,
    impostorCount,
    setImpostorCount,
    playerNames,
    setPlayerNames,
    starting,
    impostorHint,
    setImpostorHint,
    maxImpostors,
    toggleCategory,
    handleStart,
  }
}