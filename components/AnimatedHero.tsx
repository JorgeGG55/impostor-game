export default function AnimatedHero() {
  return (
    <div className="relative w-52 h-52 flex items-center justify-center">
      <div
        className="absolute inset-0 rounded-full opacity-20 animate-pulse"
        style={{ background: 'radial-gradient(circle, var(--accent) 0%, transparent 70%)' }}
      />
      <div className="text-9xl select-none">🕵️</div>
    </div>
  )
}