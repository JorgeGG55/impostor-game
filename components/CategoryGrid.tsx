import { CategoryResponse } from '@/types'

interface CategoryGridProps {
  categories: CategoryResponse[]
  selectedCategories: CategoryResponse[]
  loading: boolean
  onToggle: (cat: CategoryResponse) => void
}

export default function CategoryGrid({
  categories,
  selectedCategories,
  loading,
  onToggle,
}: CategoryGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-16 rounded-xl animate-pulse"
            style={{ background: 'var(--surface-2)' }} />
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {categories.map((cat) => {
        const isSelected = selectedCategories.some((c) => c._id === cat._id)
        return (
          <button
            key={cat._id}
            onClick={() => onToggle(cat)}
            className="flex items-center gap-2 p-3 rounded-xl border text-left transition-all active:scale-95"
            style={{
              background: isSelected ? '#ffffff' : 'transparent',
              color: isSelected ? '#000000' : '#ffffff',
              border: '1px solid #ffffff',
            }}
          >
            <span className="text-xl">{cat.emoji}</span>
            <span className="text-sm font-semibold leading-tight flex-1">{cat.name}</span>
          </button>
        )
      })}
    </div>
  )
}