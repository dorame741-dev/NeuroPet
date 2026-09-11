const CORES = ['#10B981', '#F59E0B', '#059669', '#34D399']

export function Confetti() {
  const pieces = Array.from({ length: 24 })
  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100
        const delay = Math.random() * 0.4
        const cor = CORES[i % CORES.length]
        return (
          <span
            key={i}
            className="absolute top-0 w-2 h-2 rounded-sm animate-confetti"
            style={{
              left: `${left}%`,
              background: cor,
              animationDelay: `${delay}s`,
            }}
          />
        )
      })}
    </div>
  )
}
