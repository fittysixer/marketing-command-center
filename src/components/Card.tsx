export function Card({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={`rounded-lg ${className}`}
      style={{ background: '#1e1e22', border: '1px solid #2a2a2e', ...style }}
    >
      {children}
    </div>
  )
}
