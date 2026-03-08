'use client'

import { useRouter } from 'next/navigation'
import { useGameSetup } from '@/hooks/useGameSetup'
import SectionCard from '@/components/SectionCard'
import SectionLabel from '@/components/SectionLabel'
import SelectField from '@/components/SelectField'
import CategoryGrid from '@/components/CategoryGrid'
import PlayerNameList from '@/components/PlayerNameList'
import ToggleSwitch from '@/components/ToggleSwitch'

export default function SetupPage() {
  const router = useRouter()
  const {
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
  } = useGameSetup()

  return (
    <main className="min-h-dvh flex flex-col px-5 py-8" style={{ background: 'var(--bg)' }}>

      {/* Header */}
      <div className="p-4 pt-0 lg:mb-8">
        <button onClick={() => router.push('/')} className="text-sm mb-4 opacity-50">← Volver</button>
        <h1 className="text-3xl font-black">Configura tu sesión</h1>
      </div>

      {/* Categorías */}
      <SectionCard>
        <SectionLabel>
          Categorías {selectedCategories.length > 0 && `· ${selectedCategories.length} seleccionadas`}
        </SectionLabel>
        <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>
          Selecciona 1 o más categorías.
        </p>
        <CategoryGrid
          categories={categories}
          selectedCategories={selectedCategories}
          loading={loading}
          onToggle={toggleCategory}
        />
      </SectionCard>

      {/* Jugadores e Impostores */}
      <SectionCard className="flex flex-col gap-3">
        <SelectField
          label="Jugadores"
          labelColor="var(--accent)"
          value={playerCount}
          onChange={(val) => { setPlayerCount(val); setImpostorCount('') }}
          placeholder="Nº jugadores"
          options={Array.from({ length: 10 }, (_, i) => i + 3)}
        />
        <SelectField
          label="Impostores"
          labelColor="var(--danger)"
          value={impostorCount}
          onChange={setImpostorCount}
          placeholder="Nº impostores"
          options={Array.from({ length: maxImpostors }, (_, i) => i + 1)}
          disabled={playerCount === ''}
        />
      </SectionCard>

      {/* Nombres */}
      {typeof playerCount === 'number' && playerCount > 0 && (
        <SectionCard className="flex flex-col gap-3">
          <SectionLabel className='mb-0!'>Nombres</SectionLabel>
          <PlayerNameList
            playerCount={playerCount}
            playerNames={playerNames}
            onChange={setPlayerNames}
          />
        </SectionCard>
      )}

      {/* Pista para el impostor */}
      <SectionCard className="flex items-center justify-between">
        <SectionLabel className='mb-0!'>Pista para el impostor</SectionLabel>
        <ToggleSwitch value={impostorHint} onChange={setImpostorHint} />
      </SectionCard>

      {/* Botón */}
      <button
        onClick={handleStart}
        disabled={selectedCategories.length === 0 || playerCount === '' || impostorCount === '' || starting}
        className="w-full py-4 rounded-2xl font-bold text-lg transition-all active:scale-95 disabled:opacity-50 mt-5"
        style={{ background: 'var(--accent)', color: 'white' }}
      >
        {starting ? 'Preparando...' : 'Empezar a jugar ▶'}
      </button>
    </main>
  )
}