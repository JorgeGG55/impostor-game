import SectionLabel from './SectionLabel'

interface SelectFieldProps {
  label: string
  labelColor?: string
  value: number | ''
  onChange: (val: number | '') => void
  placeholder: string
  options: number[]
  disabled?: boolean
}

export default function SelectField({
  label,
  labelColor,
  value,
  onChange,
  placeholder,
  options,
  disabled = false,
}: SelectFieldProps) {
  return (
    <div className="flex-1">
      <SectionLabel color={labelColor}>{label}</SectionLabel>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value === '' ? '' : Number(e.target.value))}
          disabled={disabled}
          className="w-full p-2 lg:p-3 border border-white rounded-xl font-bold text-sm lg:text-lg appearance-none text-center cursor-pointer disabled:opacity-40"
          style={{ background: 'var(--bg)', color: value === '' ? 'var(--text-muted)' : 'white' }}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map((n) => (
            <option key={n} value={n}>{n}</option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-xs"
          style={{ color: 'var(--text-muted)' }}>▼</span>
      </div>
    </div>
  )
}