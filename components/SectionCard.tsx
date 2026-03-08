interface SectionCardProps {
  children: React.ReactNode
  className?: string
}

export default function SectionCard({ children, className = '' }: SectionCardProps) {
  return (
    <section
      className={`lg:mb-4 p-4 rounded-2xl ${className}`}
      style={{ border: '1px solid var(--border)', background: 'var(--surface)' }}
    >
      {children}
    </section>
  )
}