'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CategoryResponse, Player } from '@/types'

export default function SetupPage() {
  const router = useRouter()
  const [categories, setCategories] = useState<CategoryResponse[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedCategories, setSelectedCategories] = useState<CategoryResponse[]>([])
  const [playerCount, setPlayerCount] = useState<number | ''>('')
  const [impostorCount, setImpostorCount] = useState<number | ''>('')
  const [playerNames, setPlayerNames] = useState<string[]>([])
  const [starting, setStarting] = useState(false)

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
      })
  }, [])

  useEffect(() => {
    if (typeof playerCount === 'number') {
      setPlayerNames((prev) => Array.from({ length: playerCount }, (_, i) => prev[i] ?? ''))
    }
  }, [playerCount])

  const maxImpostors = typeof playerCount === 'number'
    ? Math.min(3, Math.max(1, playerCount - 2))
    : 1

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

  const toggleCategory = (cat: CategoryResponse) => {
    setSelectedCategories((prev) =>
      prev.some((c) => c._id === cat._id)
        ? prev.filter((c) => c._id !== cat._id)
        : [...prev, cat]
    )
  }

  return (
    <main className="min-h-dvh flex flex-col px-5 py-8" style={{ background: 'var(--bg)' }}>

      {/* Header */}
      <div className="mb-8">
        <button onClick={() => router.push('/')} className="text-sm mb-4 opacity-50">← Volver</button>
        <h1 className="text-3xl font-black">Configura tu sesión</h1>
      </div>

      {/* Selector de categorías */}
      <section
        className="mb-4 p-4 rounded-2xl"
        style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
      >
        <p className="text-xs font-semibold tracking-widest uppercase mb-3"
          style={{ color: 'var(--accent)' }}>
          Categorías {selectedCategories.length > 0 && `· ${selectedCategories.length} seleccionadas`}
        </p>
        <div className="grid grid-cols-2 gap-2">
          {loading ? (
            [1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 rounded-xl animate-pulse"
                style={{ background: 'var(--surface-2)' }} />
            ))
          ) : (
            categories.map((cat) => {
              const isSelected = selectedCategories.some((c) => c._id === cat._id)

              return (
                <button
                  key={cat._id}
                  onClick={() => toggleCategory(cat)}
                  className="flex items-center gap-2 p-3 rounded-xl border text-left transition-all active:scale-95"
                  style={{
                    background: isSelected ? '#ffffff' : 'transparent',
                    color: isSelected ? '#000000' : '#ffffff',
                    border: '1px solid #ffffff',
                  }}
                >
                  <span className="text-xl">{cat.emoji}</span>
                  <span className="text-sm font-semibold leading-tight flex-1">
                    {cat.name}
                  </span>
                </button>
              )
            })
          )}
        </div>
      </section>

      {/* Jugadores e Impostores */}
      <section
        className="mb-4 p-4 rounded-2xl flex flex-col gap-3"
        style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
      >
        {/* Jugadores */}
        <div className="flex-1">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--accent)' }}>
            Jugadores
          </p>
          <div className="relative">
            <select
              value={playerCount}
              onChange={(e) => {
                const val = Number(e.target.value)
                setPlayerCount(val)
                setImpostorCount('')
              }}
              className="w-full p-3 border border-white rounded-xl font-bold text-lg appearance-none text-center cursor-pointer"
              style={{ background: 'var(--bg)', color: playerCount === '' ? 'var(--text-muted)' : 'white' }}
            >
              <option value="" disabled>Nº jugadores</option>
              {Array.from({ length: 10 }, (_, i) => i + 3).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs"
              style={{ color: 'var(--text-muted)' }}>▼</span>
          </div>
        </div>

        {/* Impostores */}
        <div className="flex-1">
          <p className="text-xs font-semibold tracking-widest uppercase mb-3"
            style={{ color: 'var(--danger)' }}>
            Impostores
          </p>
          <div className="relative">
            <select
              value={impostorCount}
              onChange={(e) => setImpostorCount(Number(e.target.value))}
              disabled={playerCount === ''}
              className="w-full p-3 rounded-xl border border-white font-bold text-lg appearance-none text-center cursor-pointer disabled:opacity-40"
              style={{ background: 'var(--bg)', color: impostorCount === '' ? 'var(--text-muted)' : 'white' }}
            >
              <option value="" disabled>Nº impostores</option>
              {Array.from({ length: maxImpostors }, (_, i) => i + 1).map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs"
              style={{ color: 'var(--text-muted)' }}>▼</span>
          </div>
        </div>
      </section>

      {/* Nombres de jugadores */}
      {typeof playerCount === 'number' && playerCount > 0 && (
        <section
          className="mb-4 p-4 rounded-2xl flex flex-col gap-3"
          style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: 'var(--accent)' }}>
            Nombres
          </p>
          {Array.from({ length: playerCount }, (_, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Jugador ${i + 1}`}
              value={playerNames[i] ?? ''}
              onChange={(e) => {
                const updated = [...playerNames]
                updated[i] = e.target.value
                setPlayerNames(updated)
              }}
              className="w-full border border-white outline-none p-3 rounded-xl font-medium text-base"
            />
          ))}
        </section>
      )}

      {/* Botón */}
      <button
        onClick={handleStart}
        disabled={selectedCategories.length === 0 || playerCount === '' || impostorCount === '' || starting}
        className="w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 disabled:opacity-50 mt-auto"
        style={{ background: 'var(--accent)', color: 'white' }}
      >
        {starting ? 'Preparando...' : "Empezar a jugar ▶"}
      </button>
    </main>
  )
}