import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingBag, AlertCircle } from 'lucide-react'
import { financialKPIs, profitAndLoss, daypartAnalysis } from '../data/mockData'

function Card({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`rounded-lg ${className}`} style={{ background: '#222230', border: '1px solid #333346', ...style }}>{children}</div>
}

function KPICard({ label, value, change, prefix = '', suffix = '', icon, note }: {
  label: string; value: string; change: number; prefix?: string; suffix?: string; icon: React.ReactNode; note?: string
}) {
  const positive = change >= 0
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#6b6b82' }}>{label}</span>
        <span style={{ color: '#6b6b82' }}>{icon}</span>
      </div>
      <div className="text-2xl font-bold tracking-tight" style={{ color: '#f0f0f5' }}>{prefix}{value}{suffix}</div>
      <div className="flex items-center gap-1 mt-1.5">
        {positive ? <TrendingUp size={12} className="text-emerald-500" /> : <TrendingDown size={12} className="text-red-500" />}
        <span className={`text-xs font-semibold ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
          {positive ? '+' : ''}{change.toFixed(1)}%
        </span>
        <span className="text-[10px] ml-1" style={{ color: '#6b6b82' }}>vs prior year</span>
      </div>
      {note && <p className="text-[10px] mt-1" style={{ color: '#6b6b82' }}>{note}</p>}
    </Card>
  )
}

function CostGauge({ label, current, target, industry, color }: {
  label: string; current: number; target: number; industry: number; color: string
}) {
  const pct = (current / 45) * 100 // normalize to 45% max
  const targetPct = (target / 45) * 100
  const industryPct = (industry / 45) * 100
  const onTarget = current <= target

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-xs font-medium" style={{ color: '#a0a0b8' }}>{label}</span>
        <span className="text-sm font-bold" style={{ color: '#f0f0f5' }}>{current}%</span>
      </div>
      <div className="relative h-3 rounded-full overflow-hidden" style={{ background: '#2a2a3c' }}>
        <div className="absolute h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
        <div className="absolute h-full w-0.5" style={{ left: `${targetPct}%`, background: '#f0f0f5' }} title={`Target: ${target}%`} />
        <div className="absolute h-full w-0.5 opacity-60" style={{ left: `${industryPct}%`, background: '#ef4444' }} title={`Industry: ${industry}%`} />
      </div>
      <div className="flex justify-between text-[10px]">
        <span className={onTarget ? 'text-emerald-500 font-semibold' : 'text-amber-500 font-semibold'}>
          {onTarget ? 'On target' : `${(current - target).toFixed(1)}pts over target`}
        </span>
        <span style={{ color: '#6b6b82' }}>Industry avg: {industry}%</span>
      </div>
    </div>
  )
}

export function FinancialKPIs({ compact = false }: { compact?: boolean }) {
  const d = financialKPIs
  const revenueData = d.revenue.months.map((m, i) => ({
    month: m,
    revenue: d.revenue.trend[i],
    budget: d.revenue.budget,
  }))

  const revChange = ((d.revenue.current - d.revenue.prior) / d.revenue.prior) * 100

  if (compact) {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign size={15} style={{ color: '#c8102e' }} />
          <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Financial Snapshot</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold ml-auto" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>KnowledgeForce Can't Do This</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#6b6b82' }}>Revenue</div>
            <div className="text-lg font-bold" style={{ color: '#f0f0f5' }}>${(d.revenue.current / 1_000_000).toFixed(2)}M</div>
            <div className="flex items-center gap-0.5 text-emerald-600 text-[11px] font-semibold"><TrendingUp size={10} /> +{revChange.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#6b6b82' }}>Prime Cost</div>
            <div className="text-lg font-bold" style={{ color: '#f0f0f5' }}>{d.primeCoost.current}%</div>
            <div className="text-[11px]" style={{ color: '#6b6b82' }}>Target: {d.primeCoost.target}% | Industry: {d.primeCoost.industry}%</div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Alert banner */}
      <Card className="p-4" style={{ background: '#2a2a3c', border: '1px solid rgba(239, 68, 68, 0.3)', borderLeftColor: '#ef4444', borderLeftWidth: '4px' }}>
        <div className="flex items-start gap-2">
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>KnowledgeForce Has Zero Financial Intelligence</h3>
            <p className="text-xs mt-0.5" style={{ color: '#a0a0b8' }}>Everything on this page is capability they don't offer. Store-level P&L, food cost control, labor optimization, revenue analytics — all invisible to KnowledgeForce.</p>
          </div>
        </div>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          label="Total Revenue"
          value={(d.revenue.current / 1_000_000).toFixed(2) + 'M'}
          change={revChange}
          prefix="$"
          icon={<DollarSign size={16} />}
        />
        <KPICard
          label="Avg Check"
          value={d.avgCheck.current.toFixed(2)}
          change={d.avgCheck.change}
          prefix="$"
          icon={<ShoppingBag size={16} />}
        />
        <KPICard
          label="Guest Count"
          value={(d.guestCount.current / 1000).toFixed(1) + 'K'}
          change={d.guestCount.change}
          icon={<Users size={16} />}
          note="Slight decline offset by higher avg check"
        />
        <KPICard
          label="Comp Sales"
          value={d.comps.current.toString()}
          change={d.comps.current}
          suffix="%"
          icon={<TrendingUp size={16} />}
        />
      </div>

      {/* Revenue trend */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-1" style={{ color: '#f0f0f5' }}>Revenue Trend vs. Budget</h3>
        <p className="text-[11px] mb-4" style={{ color: '#6b6b82' }}>AI forecast accuracy: 96.2% | Next month prediction: $4.31M</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={revenueData} margin={{ left: 10, right: 10, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3c" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#6b6b82' }} />
            <YAxis tick={{ fontSize: 11, fill: '#6b6b82' }} tickFormatter={(v: number) => `$${(v / 1_000_000).toFixed(1)}M`} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, background: '#2d2d3f', borderColor: '#333346', color: '#f0f0f5' }} formatter={(v: any) => [`$${(v / 1_000_000).toFixed(2)}M`, '']} />
            <ReferenceLine y={d.revenue.budget} stroke="#6b6b82" strokeDasharray="3 3" label={{ value: 'Budget', fill: '#6b6b82', fontSize: 10 }} />
            <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: '#f59e0b' }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Cost gauges */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-4" style={{ color: '#f0f0f5' }}>Cost Control — AI Anomaly Detection Active</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <CostGauge label="Food Cost" current={d.foodCost.current} target={d.foodCost.target} industry={d.foodCost.industry} color="#f59e0b" />
          <CostGauge label="Labor Cost" current={d.laborCost.current} target={d.laborCost.target} industry={d.laborCost.industry} color="#3b82f6" />
          <CostGauge label="Prime Cost" current={d.primeCoost.current} target={d.primeCoost.target} industry={d.primeCoost.industry} color="#8b5cf6" />
        </div>
        <div className="mt-4 p-3 rounded-md border" style={{ background: 'rgba(245, 158, 11, 0.08)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
          <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#f59e0b' }}>
            <AlertCircle size={13} /> AI Alert: Labor cost trending 1.2pts above target
          </div>
          <p className="text-[11px] mt-0.5" style={{ color: '#f59e0b' }}>Store #106 (Interstate) is driving 40% of the overage. Recommend schedule optimization review.</p>
        </div>
      </Card>

      {/* P&L Statement */}
      <Card className="overflow-hidden">
        <div className="px-4 py-3" style={{ borderBottom: '1px solid #333346' }}>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Profit & Loss Statement</h3>
              <p className="text-[11px] mt-0.5" style={{ color: '#6b6b82' }}>{profitAndLoss.period} — AI-generated variance analysis</p>
            </div>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>KnowledgeForce Can't Do This</span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: '#2a2a3a', color: '#6b6b82' }}>
                <th className="px-4 py-2 text-left font-medium">Category</th>
                <th className="px-4 py-2 text-right font-medium">Actual</th>
                <th className="px-4 py-2 text-right font-medium">Budget</th>
                <th className="px-4 py-2 text-right font-medium">Variance</th>
                <th className="px-4 py-2 text-right font-medium">Prior Year</th>
                <th className="px-4 py-2 text-right font-medium">% of Sales</th>
              </tr>
            </thead>
            <tbody>
              {profitAndLoss.lines.map((line) => {
                const variance = line.amount - line.budget;
                const isRevenue = line.category === 'Net Sales';
                const isSummary = line.category === 'EBITDA' || line.category === 'Net Operating Income';
                const positiveVariance = isRevenue || isSummary ? variance > 0 : variance < 0;
                return (
                  <tr key={line.category} style={{ borderTop: '1px solid #2a2a3a', background: isSummary ? '#2a2a3a' : 'transparent' }}>
                    <td className="px-4 py-2.5" style={{ color: isRevenue || isSummary ? '#f0f0f5' : '#a0a0b8', fontWeight: isRevenue || isSummary ? 600 : 400 }}>{line.category}</td>
                    <td className="px-4 py-2.5 text-right font-mono" style={{ color: '#f0f0f5', fontWeight: isSummary ? 600 : 400 }}>
                      {line.amount < 0 ? '-' : ''}${Math.abs(line.amount).toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono" style={{ color: '#6b6b82' }}>
                      {line.budget < 0 ? '-' : ''}${Math.abs(line.budget).toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono" style={{ color: positiveVariance ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                      {variance > 0 ? '+' : ''}{variance < 0 ? '-' : ''}${Math.abs(variance).toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono" style={{ color: '#6b6b82' }}>
                      {line.priorYear < 0 ? '-' : ''}${Math.abs(line.priorYear).toLocaleString()}
                    </td>
                    <td className="px-4 py-2.5 text-right" style={{ color: '#a0a0b8' }}>
                      {line.pctSales ? `${line.pctSales}%` : '100%'}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Daypart Revenue Analysis */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Revenue by Daypart</h3>
            <p className="text-[11px]" style={{ color: '#6b6b82' }}>AI identifies dinner as highest check but lunch drives volume</p>
          </div>
        </div>
        <div className="space-y-3">
          {daypartAnalysis.dayparts.map((dp) => {
            const colors: Record<string, string> = { 'up': '#10b981', 'down': '#ef4444', 'stable': '#6b6b82' };
            const barColors: Record<string, string> = { 'Lunch (11am-2pm)': '#f59e0b', 'Afternoon (2pm-5pm)': '#6b6b82', 'Dinner (5pm-9pm)': '#10b981', 'Late Night (9pm-close)': '#3b82f6' };
            return (
              <div key={dp.name}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs font-medium" style={{ color: '#a0a0b8' }}>{dp.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: '#f0f0f5' }}>{dp.revenuePct}% rev</span>
                    <span className="text-xs font-mono" style={{ color: '#6b6b82' }}>${dp.avgCheck} avg</span>
                    <span className="text-[10px] font-semibold" style={{ color: colors[dp.trend] }}>
                      {dp.trend === 'up' ? '↑' : dp.trend === 'down' ? '↓' : '→'} {dp.trend}
                    </span>
                  </div>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#2a2a3c' }}>
                  <div className="h-full rounded-full" style={{ width: `${dp.revenuePct}%`, background: barColors[dp.name] || '#6b6b82' }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-5 pt-4" style={{ borderTop: '1px solid #333346' }}>
          <div className="text-center p-3 rounded-lg" style={{ background: '#2a2a3c' }}>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#6b6b82' }}>Weekday Avg</div>
            <div className="text-lg font-bold" style={{ color: '#f0f0f5' }}>${(daypartAnalysis.weekdayVsWeekend.weekday.avgRevenue / 1000).toFixed(0)}K</div>
            <div className="text-[11px]" style={{ color: '#6b6b82' }}>{daypartAnalysis.weekdayVsWeekend.weekday.avgGuests.toLocaleString()} guests</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ background: '#2a2a3c' }}>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#6b6b82' }}>Weekend Avg</div>
            <div className="text-lg font-bold" style={{ color: '#f0f0f5' }}>${(daypartAnalysis.weekdayVsWeekend.weekend.avgRevenue / 1000).toFixed(0)}K</div>
            <div className="text-[11px]" style={{ color: '#6b6b82' }}>{daypartAnalysis.weekdayVsWeekend.weekend.avgGuests.toLocaleString()} guests</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
