export default function SkeletonLoader({
  lines = 3,
  className = '',
}: {
  lines?: number
  className?: string
}) {
  return (
    <div className={`space-y-3 ${className}`} aria-hidden="true" role="presentation">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-4"
          style={{ width: `${85 - i * 15}%` }}
        />
      ))}
    </div>
  )
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div
      className={`glass-card-subtle p-6 ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="skeleton h-5 w-2/5 mb-4" />
      <div className="space-y-3">
        <div className="skeleton h-4 w-full" />
        <div className="skeleton h-4 w-4/5" />
        <div className="skeleton h-4 w-3/5" />
      </div>
    </div>
  )
}

export function SkeletonChart({ className = '' }: { className?: string }) {
  return (
    <div
      className={`glass-card-subtle p-6 ${className}`}
      aria-hidden="true"
      role="presentation"
    >
      <div className="skeleton h-5 w-1/3 mb-6" />
      <div className="skeleton h-48 w-full rounded-luxury" />
      <div className="grid grid-cols-3 gap-4 mt-4">
        <div className="skeleton h-16 rounded-luxury" />
        <div className="skeleton h-16 rounded-luxury" />
        <div className="skeleton h-16 rounded-luxury" />
      </div>
    </div>
  )
}
