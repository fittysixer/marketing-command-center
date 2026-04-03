import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ScatterChart, Scatter, ZAxis } from 'recharts'
import { TrendingUp, TrendingDown, AlertTriangle, Brain, Target, ArrowRight } from 'lucide-react'
import { marketForceCasualDining2025, aiInsightsMissingFromMF } from '../data/mockData'

function Card({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`rounded-lg ${className}`} style={{ background: '#222230', border: '1px solid #333346', ...style }}>{children}</div>
}

function SeverityBadge({ severity }: { severity: string }) {
  const colors: Record<string, string> = {
    critical: 'text-[#ef4444]',
    warning: 'text-[#f59e0b]',
    info: 'text-[#3b82f6]',
  }
  const bgColors: Record<string, string> = {
    critical: 'rgba(239, 68, 68, 0.15)',
    warning: 'rgba(245, 158, 11, 0.15)',
    info: 'rgba(59, 130, 246, 0.15)',
  }
  return (
    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colors[severity] || colors.info}`} style={{ background: bgColors[severity] || bgColors.info, borderColor: 'rgba(255,255,255,0.1)' }}>
      {severity.toUpperCase()}
    </span>
  )
}

export function MarketForceAnalysis() {
  const data = marketForceCasualDining2025
  const rankChangeData = data.rankings.map((r) => ({
    brand: r.brand.length > 12 ? r.brand.slice(0, 12) + '...' : r.brand,
    fullName: r.brand,
    cxScore: r.cxScore,
    change: r.priorRank - r.rank,
    shareChange: r.shareOfNext10 - r.priorShareOfNext10,
  }))

  const scatterData = data.rankings.map((r) => ({
    x: r.cxScore,
    y: r.shareOfNext10,
    z: Math.abs(r.priorRank - r.rank) + 1,
    brand: r.brand,
  }))

  return (
    <div className="space-y-6">
      {/* Header callout */}
      <Card className="p-5" style={{ background: '#2a2a3c', border: '1px solid rgba(200,16,46,0.3)', borderLeftColor: '#c8102e', borderLeftWidth: '4px' }}>
        <div className="flex items-start gap-3">
          <Brain className="shrink-0 mt-0.5" size={20} style={{ color: '#c8102e' }} />
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>AI Re-Analysis of Market Force's Own 2025 Data</h3>
            <p className="text-xs mt-1 leading-relaxed max-w-2xl" style={{ color: '#a0a0b8' }}>
              Market Force surveyed {data.studySize.toLocaleString()} consumers and produced a ranking table. Our AI found 5 critical insights they missed entirely — including methodology flaws, hidden correlations, and predictive signals they didn't look for.
            </p>
          </div>
        </div>
      </Card>

      {/* Rankings + CX Score Chart */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Rankings table */}
        <Card className="overflow-hidden">
          <div className="px-4 py-3" style={{ borderBottom: '1px solid #333346' }}>
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>2025 Casual Dining Rankings</h3>
            <p className="text-[11px] mt-0.5" style={{ color: '#6b6b82' }}>Source: Market Force 2025 Panel Study (N={data.studySize.toLocaleString()})</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr style={{ background: '#2a2a3a', color: '#6b6b82' }}>
                  <th className="px-4 py-2 font-medium">#</th>
                  <th className="px-4 py-2 font-medium">Brand</th>
                  <th className="px-4 py-2 font-medium text-right">CX Score</th>
                  <th className="px-4 py-2 font-medium text-right">Rank Change</th>
                  <th className="px-4 py-2 font-medium text-right">Share of Next 10</th>
                </tr>
              </thead>
              <tbody>
                {data.rankings.map((r) => {
                  const rankChange = r.priorRank - r.rank
                  return (
                    <tr key={r.rank} className="transition-colors" style={{ borderTop: '1px solid #2a2a3a' }} onMouseEnter={(e) => e.currentTarget.style.background = '#2a2a3a'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                      <td className="px-4 py-2.5 font-semibold" style={{ color: '#f0f0f5' }}>{r.rank}</td>
                      <td className="px-4 py-2.5 font-medium" style={{ color: '#a0a0b8' }}>{r.brand}</td>
                      <td className="px-4 py-2.5 text-right font-mono font-semibold" style={{ color: '#f0f0f5' }}>{r.cxScore}%</td>
                      <td className="px-4 py-2.5 text-right">
                        <span className={`inline-flex items-center gap-0.5 font-semibold ${rankChange > 0 ? 'text-emerald-600' : rankChange < 0 ? 'text-red-500' : 'text-slate-400'}`}>
                          {rankChange > 0 ? <TrendingUp size={12} /> : rankChange < 0 ? <TrendingDown size={12} /> : null}
                          {rankChange > 0 ? `+${rankChange}` : rankChange === 0 ? '—' : rankChange}
                        </span>
                      </td>
                      <td className="px-4 py-2.5 text-right font-mono" style={{ color: '#f0f0f5' }}>
                        {r.shareOfNext10}%
                        <span className={`ml-1.5 text-[10px] ${r.shareOfNext10 > r.priorShareOfNext10 ? 'text-emerald-500' : 'text-red-400'}`}>
                          ({r.shareOfNext10 > r.priorShareOfNext10 ? '+' : ''}{(r.shareOfNext10 - r.priorShareOfNext10).toFixed(1)})
                        </span>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* CX Score bar chart */}
        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-1" style={{ color: '#f0f0f5' }}>CX Score Distribution</h3>
          <p className="text-[11px] mb-4" style={{ color: '#6b6b82' }}>Customer Experience Index — higher is better</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={rankChangeData} layout="vertical" margin={{ left: 10, right: 20, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3c" horizontal={false} />
              <XAxis type="number" domain={[0, 60]} tick={{ fontSize: 11, fill: '#6b6b82' }} />
              <YAxis type="category" dataKey="brand" tick={{ fontSize: 11, fill: '#a0a0b8' }} width={100} />
              <Tooltip
                formatter={(v: any) => [`${v}%`, 'CX Score']}
                contentStyle={{ fontSize: 12, borderRadius: 6, background: '#2d2d3f', borderColor: '#333346', color: '#f0f0f5' }}
              />
              <Bar dataKey="cxScore" radius={[0, 4, 4, 0]} barSize={20}>
                {rankChangeData.map((entry, i) => (
                  <Cell key={i} fill={entry.change > 0 ? '#10b981' : entry.change < 0 ? '#f59e0b' : '#64748b'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex gap-4 mt-2 text-[10px]" style={{ color: '#6b6b82' }}>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-emerald-500 inline-block" /> Rank improved</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-amber-500 inline-block" /> Rank dropped</span>
            <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-sm bg-slate-500 inline-block" /> Unchanged</span>
          </div>
        </Card>
      </div>

      {/* Scatter: CX Score vs Share of Next 10 */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>AI Discovery: CX Score vs. Loyalty Intent</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(200,16,46,0.2)', color: '#c8102e' }}>Insight Market Force Missed</span>
        </div>
        <p className="text-[11px] mb-4" style={{ color: '#6b6b82' }}>High CX doesn't guarantee loyalty — Texas Roadhouse leads intent despite dropping to #4 in CX</p>
        <ResponsiveContainer width="100%" height={280}>
          <ScatterChart margin={{ left: 10, right: 20, top: 10, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3c" />
            <XAxis type="number" dataKey="x" name="CX Score" domain={[34, 56]} tick={{ fontSize: 11, fill: '#6b6b82' }} label={{ value: 'CX Score %', position: 'bottom', fontSize: 11, fill: '#6b6b82' }} />
            <YAxis type="number" dataKey="y" name="Share of Next 10" domain={[25, 42]} tick={{ fontSize: 11, fill: '#6b6b82' }} label={{ value: 'Share of Next 10 %', angle: -90, position: 'insideLeft', fontSize: 11, fill: '#6b6b82' }} />
            <ZAxis type="number" dataKey="z" range={[60, 200]} />
            <Tooltip
              formatter={(v: any, name: any) => [`${v}%`, name]}
              labelFormatter={() => ''}
              contentStyle={{ fontSize: 12, borderRadius: 6, background: '#2d2d3f', borderColor: '#333346', color: '#f0f0f5' }}
            />
            <Scatter data={scatterData} fill="#f59e0b">
              {scatterData.map((entry, i) => (
                <Cell key={i} fill={entry.brand === 'Texas Roadhouse' ? '#ef4444' : entry.brand === "Logan's Roadhouse" ? '#10b981' : '#3b82f6'} />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </Card>

      {/* AI Insights Market Force Missed */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Brain size={16} style={{ color: '#c8102e' }} />
          <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>AI Insights Market Force Didn't Report</h3>
        </div>
        <div className="space-y-3">
          {aiInsightsMissingFromMF.map((insight) => (
            <Card key={insight.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <SeverityBadge severity={insight.severity} />
                    <span className="text-[10px] font-medium uppercase tracking-wider" style={{ color: '#6b6b82' }}>{insight.category}</span>
                  </div>
                  <h4 className="text-sm font-semibold leading-snug" style={{ color: '#f0f0f5' }}>{insight.title}</h4>
                  <p className="text-xs mt-1.5 leading-relaxed" style={{ color: '#a0a0b8' }}>{insight.detail}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {insight.dataPoints.map((dp, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded-full" style={{ background: '#2a2a3a', color: '#a0a0b8' }}>
                        {dp}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <div className="text-[10px] mb-0.5" style={{ color: '#6b6b82' }}>Confidence</div>
                  <div className="text-sm font-bold" style={{ color: '#f0f0f5' }}>{(insight.confidenceScore * 100).toFixed(0)}%</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
