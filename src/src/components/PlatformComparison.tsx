import { Check, X, Minus, Brain, ArrowRight, Zap } from 'lucide-react'
import { platformComparison } from '../data/mockData'

function Card({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`rounded-lg ${className}`} style={{ background: '#222230', border: '1px solid #333346', ...style }}>{children}</div>
}

function FeatureIcon({ has }: { has: boolean | string }) {
  if (has === true) return <Check size={14} className="text-emerald-500" />
  if (has === false) return <X size={14} className="text-red-400" />
  return <Minus size={14} className="text-amber-400" />
}

export function PlatformComparison() {
  const kfFeatures = platformComparison.filter(f => f.knowledgeForce === true).length
  const ourFeatures = platformComparison.filter(f => f.ourPlatform).length
  const aiFeatures = platformComparison.filter(f => f.aiPowered).length
  const kfMissing = platformComparison.filter(f => f.knowledgeForce === false).length

  return (
    <div className="space-y-6">
      {/* Score header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 text-center" style={{ borderTop: '4px solid #ef4444' }}>
          <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#6b6b82' }}>KnowledgeForce</div>
          <div className="text-4xl font-bold text-red-500">{kfFeatures}<span className="text-lg" style={{ color: '#6b6b82' }}>/{platformComparison.length}</span></div>
          <div className="text-xs mt-1" style={{ color: '#6b6b82' }}>features covered</div>
          <div className="text-[10px] font-semibold mt-2" style={{ color: '#ef4444' }}>{kfMissing} capabilities completely missing</div>
        </Card>
        <Card className="p-5 text-center" style={{ borderTop: '4px solid #c8102e' }}>
          <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#6b6b82' }}>Marketing Command Center</div>
          <div className="text-4xl font-bold" style={{ color: '#c8102e' }}>{ourFeatures}<span className="text-lg" style={{ color: '#6b6b82' }}>/{platformComparison.length}</span></div>
          <div className="text-xs mt-1" style={{ color: '#6b6b82' }}>features covered</div>
          <div className="text-[10px] font-semibold mt-2 text-emerald-500">100% coverage across all departments</div>
        </Card>
        <Card className="p-5 text-center" style={{ borderTop: '4px solid #3b82f6' }}>
          <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#6b6b82' }}>AI-Powered Features</div>
          <div className="text-4xl font-bold text-blue-500">{aiFeatures}<span className="text-lg" style={{ color: '#6b6b82' }}>/{platformComparison.length}</span></div>
          <div className="text-xs mt-1" style={{ color: '#6b6b82' }}>with AI intelligence layer</div>
          <div className="text-[10px] font-semibold mt-2 text-blue-500">KnowledgeForce: 0 real AI features</div>
        </Card>
      </div>

      {/* Comparison table */}
      <Card className="overflow-hidden">
        <div className="px-4 py-3" style={{ borderBottom: '1px solid #333346', background: '#2a2a3a' }}>
          <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Feature-by-Feature Comparison</h3>
          <p className="text-[11px] mt-0.5" style={{ color: '#6b6b82' }}>Every row where KnowledgeForce shows an X is money you're paying for a platform that can't deliver</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: '#2a2a3a', color: '#6b6b82' }}>
                <th className="px-4 py-2.5 text-left font-medium">Capability</th>
                <th className="px-4 py-2.5 text-center font-medium w-32">
                  <span className="text-red-500">KnowledgeForce</span>
                </th>
                <th className="px-4 py-2.5 text-center font-medium w-32">
                  <span style={{ color: '#c8102e' }}>Our Platform</span>
                </th>
                <th className="px-4 py-2.5 text-center font-medium w-20">
                  <span className="text-blue-500">AI</span>
                </th>
                <th className="px-4 py-2.5 text-left font-medium">Our Advantage</th>
              </tr>
            </thead>
            <tbody>
              {platformComparison.map((row, i) => (
                <tr key={i} className="transition-colors" style={{ borderTop: '1px solid #2a2a3a', background: row.knowledgeForce === false ? 'rgba(239, 68, 68, 0.05)' : 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.background = row.knowledgeForce === false ? 'rgba(239, 68, 68, 0.1)' : '#2a2a3a'} onMouseLeave={(e) => e.currentTarget.style.background = row.knowledgeForce === false ? 'rgba(239, 68, 68, 0.05)' : 'transparent'}>
                  <td className="px-4 py-3 font-medium" style={{ color: '#a0a0b8' }}>{row.feature}</td>
                  <td className="px-4 py-3 text-center"><FeatureIcon has={row.knowledgeForce} /></td>
                  <td className="px-4 py-3 text-center"><FeatureIcon has={row.ourPlatform} /></td>
                  <td className="px-4 py-3 text-center">
                    {row.aiPowered ? <Brain size={14} className="text-blue-500 mx-auto" /> : <Minus size={14} style={{ color: '#404052' }} className="mx-auto" />}
                  </td>
                  <td className="px-4 py-3 text-[11px] max-w-xs" style={{ color: '#a0a0b8' }}>{row.advantage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Cost analysis */}
      <Card className="p-5" style={{ background: '#2a2a3c', border: '1px solid rgba(16,185,129,0.3)', borderLeftColor: '#10b981', borderLeftWidth: '4px' }}>
        <div className="flex items-start gap-3">
          <Zap className="text-emerald-500 shrink-0 mt-0.5" size={20} />
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Bottom Line for Your Presentation</h3>
            <div className="mt-2 space-y-2 text-xs leading-relaxed" style={{ color: '#a0a0b8' }}>
              <p>KnowledgeForce covers <strong>4 out of 14</strong> critical restaurant analytics capabilities. You're paying for a CX measurement tool while missing financial intelligence, operations, supply chain, predictive AI, and real-time monitoring.</p>
              <p>The Marketing Command Center covers <strong>all 14 capabilities</strong> with <strong>13 AI-powered features</strong> that don't just show you what happened — they tell you what to do next.</p>
              <p>We proved we can re-analyze Market Force's own 2025 Casual Dining Study and find <strong>5 critical insights they missed</strong> — including methodology flaws, hidden correlations, and predictive signals their platform doesn't look for.</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Expert panels deployed */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3" style={{ color: '#f0f0f5' }}>Expert Panels Powering This Dashboard</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          {[
            { div: 'Technology & Digital', experts: 42, depts: 7, color: '#3b82f6' },
            { div: 'Data Science & AI', experts: 34, depts: 6, color: '#8b5cf6' },
            { div: 'Executive Strategy', experts: 32, depts: 6, color: '#f59e0b' },
            { div: 'Marketing & Guest CX', experts: 44, depts: 7, color: '#ec4899' },
            { div: 'Financial Intelligence', experts: 40, depts: 6, color: '#10b981' },
          ].map((d) => (
            <div key={d.div} className="p-3 border rounded-md" style={{ borderColor: '#333346', borderLeftColor: d.color, borderLeftWidth: '4px', background: '#2a2a3a' }}>
              <div className="text-xs font-semibold" style={{ color: '#f0f0f5' }}>{d.div}</div>
              <div className="text-[10px] mt-1" style={{ color: '#6b6b82' }}>{d.experts} experts &middot; {d.depts} departments</div>
            </div>
          ))}
        </div>
        <div className="text-center mt-3">
          <span className="text-[10px]" style={{ color: '#6b6b82' }}>Total: 192 experts across 32 departments delivering best-in-class restaurant intelligence</span>
        </div>
      </Card>
    </div>
  )
}
