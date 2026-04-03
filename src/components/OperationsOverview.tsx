import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Clock, AlertTriangle, CheckCircle2, XCircle, ArrowUpRight, Users, TrendingUp } from 'lucide-react'
import { operationsData, storeRankings } from '../data/mockData'

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg ${className}`} style={{ background: '#1e1e22', border: '1px solid #2a2a2e' }}>{children}</div>
}

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    top: 'bg-emerald-500',
    good: 'bg-blue-500',
    watch: 'bg-amber-500',
    critical: 'bg-red-500',
  }
  return <span className={`w-2 h-2 rounded-full inline-block ${colors[status] || 'bg-slate-400'}`} />
}

export function OperationsOverview({ compact = false, activeSubNav = 0 }: { compact?: boolean; activeSubNav?: number }) {
  const d = operationsData
  const sosData = d.speedOfService.trend.map((v, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    ticketTime: v,
    target: d.speedOfService.target,
  }))

  if (compact) {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={15} className="text-blue-500" />
          <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Operations Snapshot</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold ml-auto" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>KnowledgeForce Can't Do This</span>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="text-center">
            <div className="text-[10px] uppercase" style={{ color: '#7a7a80' }}>Avg Ticket</div>
            <div className="text-xl font-bold" style={{ color: '#f0f0f5' }}>{d.speedOfService.avgTicketTime}<span className="text-xs" style={{ color: '#7a7a80' }}>min</span></div>
          </div>
          <div className="text-center">
            <div className="text-[10px] uppercase" style={{ color: '#7a7a80' }}>Drive-Thru</div>
            <div className="text-xl font-bold" style={{ color: '#f0f0f5' }}>{d.speedOfService.driveThru}<span className="text-xs" style={{ color: '#7a7a80' }}>min</span></div>
          </div>
          <div className="text-center">
            <div className="text-[10px] uppercase" style={{ color: '#7a7a80' }}>Top Stores</div>
            <div className="text-xl font-bold text-emerald-600">{d.storeScorecard.filter(s => s.status === 'top').length}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] uppercase" style={{ color: '#7a7a80' }}>Critical</div>
            <div className="text-xl font-bold text-red-500">{d.storeScorecard.filter(s => s.status === 'critical').length}</div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Speed of Service */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>Avg Ticket Time</div>
          <div className="text-4xl font-bold mt-2" style={{ color: '#f0f0f5' }}>{d.speedOfService.avgTicketTime}<span className="text-lg ml-1" style={{ color: '#7a7a80' }}>min</span></div>
          <div className="text-xs font-semibold mt-1" style={{ color: '#f59e0b' }}>Target: {d.speedOfService.target} min ({((d.speedOfService.avgTicketTime - d.speedOfService.target) / d.speedOfService.target * 100).toFixed(0)}% over)</div>
          <div className="mt-3 p-2.5 rounded-md border" style={{ background: 'rgba(245, 158, 11, 0.08)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
            <p className="text-[10px]" style={{ color: '#f59e0b' }}>AI: Ticket times spike 18% during 12-1pm. Recommend staggering prep schedules.</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>Drive-Thru Time</div>
          <div className="text-4xl font-bold mt-2" style={{ color: '#f0f0f5' }}>{d.speedOfService.driveThru}<span className="text-lg ml-1" style={{ color: '#7a7a80' }}>min</span></div>
          <div className="text-xs font-semibold mt-1" style={{ color: '#f59e0b' }}>Target: {d.speedOfService.driveThruTarget} min</div>
          <div className="mt-3 p-2.5 rounded-md border" style={{ background: 'rgba(59, 130, 246, 0.08)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
            <p className="text-[10px]" style={{ color: '#3b82f6' }}>AI: Order accuracy at drive-thru is 94% — each 1% improvement = $12K annual savings.</p>
          </div>
        </Card>
        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#f0f0f5' }}>Ticket Time Trend</h3>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={sosData} margin={{ left: 0, right: 5, top: 5, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#232326" />
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#7a7a80' }} />
              <YAxis domain={[10, 15]} tick={{ fontSize: 9, fill: '#7a7a80' }} />
              <Tooltip contentStyle={{ fontSize: 11, borderRadius: 6, background: '#2a2a2e', borderColor: '#2a2a2e', color: '#f0f0f5' }} />
              <Line type="monotone" dataKey="ticketTime" stroke="#3b82f6" strokeWidth={2} dot={{ r: 2 }} name="Actual" />
              <Line type="monotone" dataKey="target" stroke="#7a7a80" strokeDasharray="4 4" strokeWidth={1.5} dot={false} name="Target" />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Store Scorecard */}
      <Card className="overflow-hidden">
        <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid #2a2a2e' }}>
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Multi-Unit Store Scorecard</h3>
            <p className="text-[11px] mt-0.5" style={{ color: '#7a7a80' }}>AI-ranked by composite performance score</p>
          </div>
          <div className="flex gap-3 text-[10px]" style={{ color: '#7a7a80' }}>
            <span className="flex items-center gap-1"><StatusDot status="top" /> Top Performer</span>
            <span className="flex items-center gap-1"><StatusDot status="good" /> Good</span>
            <span className="flex items-center gap-1"><StatusDot status="watch" /> Watch</span>
            <span className="flex items-center gap-1"><StatusDot status="critical" /> Critical</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: '#262628', color: '#7a7a80' }}>
                <th className="px-4 py-2 font-medium">Status</th>
                <th className="px-4 py-2 font-medium">Store</th>
                <th className="px-4 py-2 font-medium text-right">Revenue</th>
                <th className="px-4 py-2 font-medium text-right">CSAT</th>
                <th className="px-4 py-2 font-medium text-right">Google Rating</th>
                <th className="px-4 py-2 font-medium text-right">NPS</th>
                <th className="px-4 py-2 font-medium text-right">Loyalty Enrollment</th>
                <th className="px-4 py-2 font-medium text-right">Comp Sales</th>
                <th className="px-4 py-2 font-medium text-right">Ticket Time</th>
                <th className="px-4 py-2 font-medium">AI Action</th>
              </tr>
            </thead>
            <tbody>
              {storeRankings.map((store) => (
                <tr key={store.id} className="transition-colors" style={{ borderTop: '1px solid #262628', background: store.status === 'critical' ? 'rgba(239, 68, 68, 0.05)' : 'transparent' }} onMouseEnter={(e) => e.currentTarget.style.background = store.status === 'critical' ? 'rgba(239, 68, 68, 0.1)' : '#262628'} onMouseLeave={(e) => e.currentTarget.style.background = store.status === 'critical' ? 'rgba(239, 68, 68, 0.05)' : 'transparent'}>
                  <td className="px-4 py-2.5"><StatusDot status={store.status} /></td>
                  <td className="px-4 py-2.5 font-medium" style={{ color: '#a0a0a4' }}>Store #{store.id} — {store.name}</td>
                  <td className="px-4 py-2.5 text-right font-mono" style={{ color: '#f0f0f5' }}>${(store.revenue / 1000).toFixed(0)}K</td>
                  <td className="px-4 py-2.5 text-right">
                    <span style={{ color: store.csat >= 80 ? '#10b981' : store.csat < 70 ? '#ef4444' : '#a0a0a4', fontWeight: store.csat >= 80 || store.csat < 70 ? '600' : 'normal' }}>{store.csat}%</span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <span style={{ color: store.googleRating >= 4.6 ? '#10b981' : store.googleRating < 4.3 ? '#ef4444' : '#a0a0a4', fontWeight: store.googleRating >= 4.6 || store.googleRating < 4.3 ? '600' : 'normal' }}>{store.googleRating}</span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <span style={{ color: store.nps >= 45 ? '#10b981' : store.nps < 30 ? '#ef4444' : '#a0a0a4', fontWeight: store.nps >= 45 || store.nps < 30 ? '600' : 'normal' }}>{store.nps}</span>
                  </td>
                  <td className="px-4 py-2.5 text-right" style={{ color: '#a0a0a4' }}>{store.loyaltyEnrollment}%</td>
                  <td className="px-4 py-2.5 text-right font-mono" style={{ color: '#f0f0f5' }}>{store.compSales}%</td>
                  <td className="px-4 py-2.5 text-right font-mono" style={{ color: '#f0f0f5' }}>{store.ticketTime}m</td>
                  <td className="px-4 py-2.5">
                    {store.status === 'critical' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444' }}>Schedule audit</span>
                    )}
                    {store.status === 'watch' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(245, 158, 11, 0.2)', color: '#f59e0b' }}>Training focus</span>
                    )}
                    {store.status === 'top' && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(16, 185, 129, 0.2)', color: '#10b981' }}>Best practice model</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Speed of Service → CSAT Impact */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold mb-1" style={{ color: '#f0f0f5' }}>Speed of Service → CSAT Impact</h3>
            <p className="text-[11px]" style={{ color: '#7a7a80' }}>Faster ticket times drive higher customer satisfaction and repeat visits</p>
          </div>
          <TrendingUp size={16} className="text-emerald-500" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg" style={{ background: '#232326' }}>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>Under 4.5m</div>
            <div className="text-2xl font-bold mt-2" style={{ color: '#10b981' }}>84%</div>
            <div className="text-[11px] mt-1" style={{ color: '#a0a0a4' }}>Avg CSAT Score</div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: '#232326' }}>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>4.5–5.5m</div>
            <div className="text-2xl font-bold mt-2" style={{ color: '#f59e0b' }}>72%</div>
            <div className="text-[11px] mt-1" style={{ color: '#a0a0a4' }}>Avg CSAT Score</div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: '#232326' }}>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>Over 5.5m</div>
            <div className="text-2xl font-bold mt-2" style={{ color: '#ef4444' }}>58%</div>
            <div className="text-[11px] mt-1" style={{ color: '#a0a0a4' }}>Avg CSAT Score</div>
          </div>
        </div>
        <div className="mt-3 p-3 rounded-md border" style={{ background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
          <p className="text-[11px] leading-relaxed" style={{ color: '#10b981' }}>Every 1-minute improvement in ticket time correlates to 5–7 point CSAT lift, driving estimated 3% repeat visit increase and $280K annual revenue per location.</p>
        </div>
      </Card>

      {/* AI Operational Alerts — Marketing Impact */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3" style={{ color: '#f0f0f5' }}>AI Brand & NPS Alerts</h3>
        <div className="space-y-2">
          {[
            { level: 'critical', icon: <XCircle size={14} className="text-red-500" />, msg: 'Store #103 Mall Location: Google rating dropped to 4.2 — NPS below 35. Mystery shop reveals 42% of guests note slow service. 3.2-min average ticket time vs. 4.1m network average. Retraining & staffing spike could recover 0.4 star rating.', bgColor: 'rgba(239, 68, 68, 0.08)', borderColor: 'rgba(239, 68, 68, 0.2)', textColor: '#ef4444' },
            { level: 'warning', icon: <AlertTriangle size={14} className="text-amber-500" />, msg: 'Store #106 Interstate: NPS trending down (44→39 past 90 days) despite stable CSAT (76%). Mystery shop upselling score 48% (lowest in system). Recommendation: Loyalty program training to improve repeat visit conversion.', bgColor: 'rgba(245, 158, 11, 0.08)', borderColor: 'rgba(245, 158, 11, 0.2)', textColor: '#f59e0b' },
            { level: 'info', icon: <CheckCircle2 size={14} className="text-blue-500" />, msg: 'Store #104 University: Highest NPS (51) with 4.7 Google rating. 4.3m avg ticket time + 87% CSAT = strong loyalty enrollment (68%). Model for brand ambassador training program.', bgColor: 'rgba(59, 130, 246, 0.08)', borderColor: 'rgba(59, 130, 246, 0.2)', textColor: '#3b82f6' },
          ].map((alert, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-md border" style={{ background: alert.bgColor, borderColor: alert.borderColor }}>
              {alert.icon}
              <p className="text-[11px] leading-relaxed" style={{ color: alert.textColor }}>{alert.msg}</p>
            </div>
          ))}
        </div>
      </Card>

    </div>
  )
}
