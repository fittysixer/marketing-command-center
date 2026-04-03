export function Card({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-lg ${className}`}
      style={{ background: '#222230', border: '1px solid #333346', ...style }}
    >
      {children}
    </div>
  )
}
