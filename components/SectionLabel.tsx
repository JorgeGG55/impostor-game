interface SectionLabelProps {
  children: React.ReactNode
  color?: string
  className?: string
}

export default function SectionLabel({ children, color = 'var(--accent)', className = '' }: SectionLabelProps) {
  return (
    <p
      className={`text-xs font-semibold tracking-widest uppercase mb-3 ${className}`}
      style={{ color }}
    >
      {children}
    </p>
  )
}