import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingBag, AlertCircle } from 'lucide-react'
import { financialKPIs, profitAndLoss, daypartAnalysis } from '../data/mockData'

function Card({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`rounded-lg ${className}`} style={{ background: '#1e1e22', border: '1px solid #2a2a2e', ...style }}>{children}</div>
}

function KPICard({ label, value, change, prefix = '', suffix = '', icon, note }: {
  label: string; value: string; change: number; prefix?: string; suffix?: string; icon: React.ReactNode; note?: string
}) {
  const positive = change >= 0
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-medium uppercase tracking-wider" style={{ color: '#7a7a80' }}>{label}</span>
        <span style={{ color: '#7a7a80' }}>{icon}</span>
      </div>
      <div className="text-2xl font-bold tracking-tight" style={{ color: '#f0f0f5' }}>{prefix}{value}{suffix}</div>
      <div className="flex items-center gap-1 mt-1.5">
        {positive ? <TrendingUp size={12} className="text-emerald-500" /> : <TrendingDown size={12} className="text-red-500" />}
        <span className={`text-xs font-semibold ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
          {positive ? '+' : ''}{change.toFixed(1)}%
        </span>
        <span className="text-[10px] ml-1" style={{ color: '#7a7a80' }}>vs prior year</span>
      </div>
      {note && <p className="text-[10px] mt-1" style={{ color: '#7a7a80' }}>{note}</p>}
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
        <span className="text-xs font-medium" style={{ color: '#a0a0a4' }}>{label}</span>
        <span className="text-sm font-bold" style={{ color: '#f0f0f5' }}>{current}%</span>
      </div>
      <div className="relative h-3 rounded-full overflow-hidden" style={{ background: '#232326' }}>
        <div className="absolute h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
        <div className="absolute h-full w-0.5" style={{ left: `${targetPct}%`, background: '#f0f0f5' }} title={`Target: ${target}%`} />
        <div className="absolute h-full w-0.5 opacity-60" style={{ left: `${industryPct}%`, background: '#ef4444' }} title={`Industry: ${industry}%`} />
      </div>
      <div className="flex justify-between text-[10px]">
        <span className={onTarget ? 'text-emerald-500 font-semibold' : 'text-amber-500 font-semibold'}>
          {onTarget ? 'On target' : `${(current - target).toFixed(1)}pts over target`}
        </span>
        <span style={{ color: '#7a7a80' }}>Industry avg: {industry}%</span>
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
          <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Marketing Financial Snapshot</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold ml-auto" style={{ background: 'rgba(200, 16, 46, 0.15)', color: '#c8102e' }}>Marketing ROI</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>Revenue</div>
            <div className="text-lg font-bold" style={{ color: '#f0f0f5' }}>${(d.revenue.current / 1_000_000).toFixed(2)}M</div>
            <div className="flex items-center gap-0.5 text-emerald-600 text-[11px] font-semibold"><TrendingUp size={10} /> +{revChange.toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>ROI (30d avg)</div>
            <div className="text-lg font-bold" style={{ color: '#f0f0f5' }}>5.83x</div>
            <div className="text-[11px]" style={{ color: '#7a7a80' }}>vs. $487K spend</div>
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Alert banner */}
      <Card className="p-4" style={{ background: '#232326', border: '1px solid rgba(239, 68, 68, 0.3)', borderLeftColor: '#ef4444', borderLeftWidth: '4px' }}>
        <div className="flex items-start gap-2">
          <AlertCircle size={16} className="text-red-500 shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>KnowledgeForce Has Zero Financial Intelligence</h3>
            <p className="text-xs mt-0.5" style={{ color: '#a0a0a4' }}>Everything on this page is capability they don't offer. Store-level P&L, food cost control, labor optimization, revenue analytics — all invisible to KnowledgeForce.</p>
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
        <p className="text-[11px] mb-4" style={{ color: '#7a7a80' }}>AI forecast accuracy: 96.2% | Next month prediction: $4.31M</p>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={revenueData} margin={{ left: 10, right: 10, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#232326" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7a7a80' }} />
            <YAxis tick={{ fontSize: 11, fill: '#7a7a80' }} tickFormatter={(v: number) => `$${(v / 1_000_000).toFixed(1)}M`} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, background: '#2a2a2e', borderColor: '#2a2a2e', color: '#f0f0f5' }} formatter={(v: any) => [`$${(v / 1_000_000).toFixed(2)}M`, '']} />
            <ReferenceLine y={d.revenue.budget} stroke="#7a7a80" strokeDasharray="3 3" label={{ value: 'Budget', fill: '#7a7a80', fontSize: 10 }} />
            <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3, fill: '#f59e0b' }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Marketing ROI Metrics */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Marketing ROI Metrics</h3>
            <p className="text-[11px]" style={{ color: '#7a7a80' }}>Campaign spend vs. attributed revenue — connected end-to-end</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(200, 16, 46, 0.15)', color: '#c8102e' }}>Marketing Intelligence</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3 rounded-lg" style={{ background: '#232326' }}>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>Campaign Spend (30d)</div>
            <div className="text-xl font-bold mt-2" style={{ color: '#f0f0f5' }}>$487K</div>
            <div className="text-[11px] mt-1" style={{ color: '#10b981' }}>↑ 12% vs. prior period</div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: '#232326' }}>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>Attributed Revenue</div>
            <div className="text-xl font-bold mt-2" style={{ color: '#f0f0f5' }}>$2.84M</div>
            <div className="text-[11px] mt-1" style={{ color: '#10b981' }}>5.83x return on spend</div>
          </div>
          <div className="p-3 rounded-lg" style={{ background: '#232326' }}>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>Cost Per Acquisition</div>
            <div className="text-xl font-bold mt-2" style={{ color: '#f0f0f5' }}>$18.50</div>
            <div className="text-[11px] mt-1" style={{ color: '#10b981' }}>↓ 8% from target</div>
          </div>
        </div>
        <div className="mt-4 p-3 rounded-md border" style={{ background: 'rgba(16, 185, 129, 0.08)', borderColor: 'rgba(16, 185, 129, 0.2)' }}>
          <div className="flex items-center gap-1.5 text-xs font-semibold" style={{ color: '#10b981' }}>
            <AlertCircle size={13} /> Loyalty Program ROI: 7.2x (highest performer)
          </div>
          <p className="text-[11px] mt-0.5" style={{ color: '#10b981' }}>Digital channel showing 23% lift in repeat purchase rate from targeted campaigns</p>
        </div>
      </Card>

      {/* Revenue Attribution by Channel */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Revenue Attribution by Channel</h3>
            <p className="text-[11px]" style={{ color: '#7a7a80' }}>Which marketing channels drive the most revenue?</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(200, 16, 46, 0.15)', color: '#c8102e' }}>KnowledgeForce Can't Do This</span>
        </div>
        <div className="space-y-3">
          {[
            { name: 'In-Store (Foot Traffic)', revenue: 38, color: '#f59e0b', attributed: '$1.08M' },
            { name: 'Delivery & Online Orders', revenue: 28, color: '#3b82f6', attributed: '$794K' },
            { name: 'Digital & Social Campaigns', revenue: 20, color: '#c8102e', attributed: '$568K' },
            { name: 'Catering & B2B', revenue: 14, color: '#8b5cf6', attributed: '$397K' }
          ].map((channel) => (
            <div key={channel.name}>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs font-medium" style={{ color: '#a0a0a4' }}>{channel.name}</span>
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono" style={{ color: '#f0f0f5' }}>{channel.revenue}%</span>
                  <span className="text-xs font-mono" style={{ color: '#7a7a80' }}>{channel.attributed}</span>
                </div>
              </div>
              <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#232326' }}>
                <div className="h-full rounded-full" style={{ width: `${channel.revenue}%`, background: channel.color }} />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-4" style={{ borderTop: '1px solid #2a2a2e' }}>
          <div className="text-[11px]" style={{ color: '#7a7a80' }}>
            <strong style={{ color: '#f0f0f5' }}>Strategic Insight:</strong> Digital campaigns are 34% more efficient per dollar than foot traffic. Recommend 15% budget shift to social and influencer partnerships.
          </div>
        </div>
      </Card>

      {/* AI Insight: KnowledgeForce Gap */}
      <Card className="p-4" style={{ background: 'linear-gradient(135deg, #232326 0%, #1e1e22 100%)', border: '1px solid #c8102e' }}>
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 mt-0.5">
            <span className="text-2xl" style={{ color: '#c8102e' }}>⚡</span>
          </div>
          <div className="flex-grow">
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Why KnowledgeForce Has Zero Financial Intelligence</h3>
            <p className="text-xs mt-1" style={{ color: '#a0a0a4' }}>
              Every metric on this page — ROI tracking, channel attribution, cost per acquisition, loyalty program performance — are IMPOSSIBLE in KnowledgeForce. They can't connect your marketing spend to actual revenue outcomes. They show you cost controls. We show you impact. We prove marketing ROI.
            </p>
          </div>
        </div>
      </Card>

      {/* Daypart Revenue Analysis */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Revenue by Daypart</h3>
            <p className="text-[11px]" style={{ color: '#7a7a80' }}>AI identifies dinner as highest check but lunch drives volume</p>
          </div>
        </div>
        <div className="space-y-3">
          {daypartAnalysis.dayparts.map((dp) => {
            const colors: Record<string, string> = { 'up': '#10b981', 'down': '#ef4444', 'stable': '#7a7a80' };
            const barColors: Record<string, string> = { 'Lunch (11am-2pm)': '#f59e0b', 'Afternoon (2pm-5pm)': '#7a7a80', 'Dinner (5pm-9pm)': '#10b981', 'Late Night (9pm-close)': '#3b82f6' };
            return (
              <div key={dp.name}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs font-medium" style={{ color: '#a0a0a4' }}>{dp.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono" style={{ color: '#f0f0f5' }}>{dp.revenuePct}% rev</span>
                    <span className="text-xs font-mono" style={{ color: '#7a7a80' }}>${dp.avgCheck} avg</span>
                    <span className="text-[10px] font-semibold" style={{ color: colors[dp.trend] }}>
                      {dp.trend === 'up' ? '↑' : dp.trend === 'down' ? '↓' : '→'} {dp.trend}
                    </span>
                  </div>
                </div>
                <div className="h-2.5 rounded-full overflow-hidden" style={{ background: '#232326' }}>
                  <div className="h-full rounded-full" style={{ width: `${dp.revenuePct}%`, background: barColors[dp.name] || '#7a7a80' }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-5 pt-4" style={{ borderTop: '1px solid #2a2a2e' }}>
          <div className="text-center p-3 rounded-lg" style={{ background: '#232326' }}>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>Weekday Avg</div>
            <div className="text-lg font-bold" style={{ color: '#f0f0f5' }}>${(daypartAnalysis.weekdayVsWeekend.weekday.avgRevenue / 1000).toFixed(0)}K</div>
            <div className="text-[11px]" style={{ color: '#7a7a80' }}>{daypartAnalysis.weekdayVsWeekend.weekday.avgGuests.toLocaleString()} guests</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ background: '#232326' }}>
            <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>Weekend Avg</div>
            <div className="text-lg font-bold" style={{ color: '#f0f0f5' }}>${(daypartAnalysis.weekdayVsWeekend.weekend.avgRevenue / 1000).toFixed(0)}K</div>
            <div className="text-[11px]" style={{ color: '#7a7a80' }}>{daypartAnalysis.weekdayVsWeekend.weekend.avgGuests.toLocaleString()} guests</div>
          </div>
        </div>
      </Card>
    </div>
  )
}
