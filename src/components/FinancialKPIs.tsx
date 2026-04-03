import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, BarChart, Bar, AreaChart, Area } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, Users, ShoppingBag, AlertCircle, ChevronDown, ChevronRight } from 'lucide-react'
import { financialKPIs, daypartAnalysis } from '../data/mockData'

// ─── SHARED STYLES ──────────────────────────────────────────
const RED = '#C8102E'
const GREEN = '#10b981'
const AMBER = '#f59e0b'
const GRAY = '#8a8580'
const WHITE = '#f0f0f5'

function Card({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`rounded-2xl ${className}`} style={{ background: 'rgba(32,28,26,0.88)', border: '1px solid rgba(200,16,46,0.18)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 20px rgba(0,0,0,0.35), 0 0 30px rgba(200,16,46,0.04), inset 0 1px 0 rgba(255,255,255,0.04)', ...style }}>{children}</div>
}

function KPICard({ label, value, change, prefix = '', suffix = '', icon, note }: {
  label: string; value: string; change: number; prefix?: string; suffix?: string; icon: React.ReactNode; note?: string
}) {
  const positive = change >= 0
  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-2">
        <span style={{ fontSize: 11, fontWeight: 600, color: GRAY, letterSpacing: 1, textTransform: 'uppercase' as const }}>{label}</span>
        <span style={{ color: GRAY }}>{icon}</span>
      </div>
      <div style={{ fontSize: 24, fontWeight: 900, color: WHITE }}>{prefix}{value}{suffix}</div>
      <div className="flex items-center gap-1 mt-1.5">
        {positive ? <TrendingUp size={12} style={{ color: GREEN }} /> : <TrendingDown size={12} style={{ color: '#ef4444' }} />}
        <span style={{ fontSize: 11, fontWeight: 700, color: positive ? GREEN : '#ef4444' }}>{positive ? '+' : ''}{change.toFixed(1)}%</span>
        <span style={{ fontSize: 10, color: GRAY, marginLeft: 4 }}>vs prior year</span>
      </div>
      {note && <p style={{ fontSize: 10, color: GRAY, marginTop: 4 }}>{note}</p>}
    </Card>
  )
}

// ─── P&L LINE ITEM ──────────────────────────────────────────
function PLRow({ label, actual, budget, priorYear, pctSales, indent = 0, bold = false, borderTop = false, highlight = false, expandable = false, expanded = false, onToggle }: {
  label: string; actual: number; budget: number; priorYear: number; pctSales?: number; indent?: number; bold?: boolean; borderTop?: boolean; highlight?: boolean; expandable?: boolean; expanded?: boolean; onToggle?: () => void
}) {
  const variance = actual - budget
  const variancePct = budget !== 0 ? ((actual - budget) / Math.abs(budget)) * 100 : 0
  const pyChange = priorYear !== 0 ? ((actual - priorYear) / Math.abs(priorYear)) * 100 : 0
  const fmt = (n: number) => {
    const abs = Math.abs(n)
    if (abs >= 1_000_000) return (n < 0 ? '-' : '') + '$' + (abs / 1_000_000).toFixed(abs >= 10_000_000 ? 1 : 2) + 'M'
    if (abs >= 1_000) return (n < 0 ? '-' : '') + '$' + (abs / 1_000).toFixed(abs >= 100_000 ? 0 : 1) + 'K'
    return '$' + n.toLocaleString()
  }

  // For cost lines, negative variance (spending less) is good. For revenue, positive is good.
  const isRevenueLine = actual > 0
  const varianceGood = isRevenueLine ? variance >= 0 : variance <= 0

  return (
    <tr style={{
      borderTop: borderTop ? '2px solid rgba(200,16,46,0.2)' : '1px solid rgba(255,255,255,0.03)',
      background: highlight ? 'rgba(200,16,46,0.04)' : 'transparent',
    }}>
      <td style={{ padding: '8px 12px', paddingLeft: 12 + indent * 20, fontSize: bold ? 13 : 12, fontWeight: bold ? 800 : 500, color: bold ? WHITE : 'rgba(255,255,255,0.8)', whiteSpace: 'nowrap' as const }}>
        <div className="flex items-center gap-1" style={{ cursor: expandable ? 'pointer' : 'default' }} onClick={onToggle}>
          {expandable && (expanded ? <ChevronDown size={12} style={{ color: GRAY }} /> : <ChevronRight size={12} style={{ color: GRAY }} />)}
          {label}
        </div>
      </td>
      <td style={{ padding: '8px 12px', fontSize: 12, fontWeight: bold ? 800 : 600, color: WHITE, textAlign: 'right' as const, fontFamily: 'monospace' }}>{fmt(actual)}</td>
      <td style={{ padding: '8px 12px', fontSize: 12, color: GRAY, textAlign: 'right' as const, fontFamily: 'monospace' }}>{fmt(budget)}</td>
      <td style={{ padding: '8px 12px', fontSize: 11, fontWeight: 700, color: varianceGood ? GREEN : '#ef4444', textAlign: 'right' as const, fontFamily: 'monospace' }}>
        {variance >= 0 ? '+' : ''}{fmt(variance)} <span style={{ fontSize: 9 }}>({variancePct >= 0 ? '+' : ''}{variancePct.toFixed(1)}%)</span>
      </td>
      <td style={{ padding: '8px 12px', fontSize: 12, color: GRAY, textAlign: 'right' as const, fontFamily: 'monospace' }}>{fmt(priorYear)}</td>
      <td style={{ padding: '8px 12px', fontSize: 11, fontWeight: 700, color: (isRevenueLine ? pyChange >= 0 : pyChange <= 0) ? GREEN : '#ef4444', textAlign: 'right' as const, fontFamily: 'monospace' }}>
        {pyChange >= 0 ? '+' : ''}{pyChange.toFixed(1)}%
      </td>
      <td style={{ padding: '8px 12px', fontSize: 12, color: GRAY, textAlign: 'right' as const, fontFamily: 'monospace' }}>{pctSales !== undefined ? pctSales.toFixed(1) + '%' : ''}</td>
    </tr>
  )
}

// ─────────────────────────────────────────────────────────────
// SUB-TAB 0: P&L STATEMENT (comptroller-grade)
// ─────────────────────────────────────────────────────────────
function PLStatement() {
  const [expandFood, setExpandFood] = useState(false)
  const [expandLabor, setExpandLabor] = useState(false)
  const [expandOccupancy, setExpandOccupancy] = useState(false)
  const [expandOpex, setExpandOpex] = useState(false)

  return (
    <div className="space-y-5">
      {/* Period & Store Header */}
      <div className="flex items-center justify-between">
        <div>
          <div style={{ fontSize: 15, fontWeight: 900, color: WHITE }}>Profit & Loss Statement</div>
          <div style={{ fontSize: 11, color: GRAY }}>Store #1289 — Alexandria, VA · Period 3 2025 (March)</div>
        </div>
        <div className="flex items-center gap-3">
          <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 6, background: 'rgba(200,16,46,0.12)', color: RED, fontWeight: 700 }}>PERIOD 3</span>
          <span style={{ fontSize: 10, padding: '4px 10px', borderRadius: 6, background: 'rgba(16,185,129,0.08)', color: GREEN, fontWeight: 700 }}>4-WALL EBITDA: 23.4%</span>
        </div>
      </div>

      {/* AI Controller Insight */}
      <Card className="p-4" style={{ borderTop: '2px solid rgba(200,16,46,0.5)' }}>
        <div className="flex items-start gap-3">
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, rgba(200,16,46,0.15), rgba(200,16,46,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertCircle size={16} style={{ color: RED }} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: RED, letterSpacing: 1, marginBottom: 2 }}>AI CONTROLLER ALERT</div>
            <div style={{ fontSize: 12, color: WHITE, lineHeight: 1.5 }}>
              Labor is running <span style={{ color: '#ef4444', fontWeight: 700 }}>1.2 pts above budget</span> at 31.2% of sales.
              Overtime hours (1,240) represent 6.7% of total hours — well above the 4% target.
              Thursday/Friday dinner shifts show 22% more overtime than other shifts.
              Recommend crew scheduling adjustment: add one crew member to Thu/Fri 5-9pm to reduce OT by ~$12K/period.
            </div>
            <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', marginTop: 4 }}>KnowledgeForce cannot generate this insight.</div>
          </div>
        </div>
      </Card>

      {/* Main P&L Table */}
      <Card className="p-0" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: 'rgba(200,16,46,0.06)' }}>
                {['Line Item', 'Actual', 'Budget', 'Variance', 'Prior Year', 'PY Δ', '% Sales'].map(h => (
                  <th key={h} style={{ fontSize: 10, fontWeight: 700, color: GRAY, textAlign: h === 'Line Item' ? 'left' as const : 'right' as const, padding: '10px 12px', letterSpacing: 1, borderBottom: '1px solid rgba(200,16,46,0.15)' }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* ═══ REVENUE ═══ */}
              <PLRow label="NET SALES" actual={4_280_000} budget={4_100_000} priorYear={3_950_000} pctSales={100.0} bold highlight />
              <PLRow label="Dine-In Revenue" actual={2_782_000} budget={2_665_000} priorYear={2_607_000} pctSales={65.0} indent={1} />
              <PLRow label="Online & Delivery" actual={1_070_000} budget={1_025_000} priorYear={869_000} pctSales={25.0} indent={1} />
              <PLRow label="Catering" actual={342_400} budget={328_000} priorYear={316_000} pctSales={8.0} indent={1} />
              <PLRow label="Gift Card Redemptions" actual={85_600} budget={82_000} priorYear={158_000} pctSales={2.0} indent={1} />

              {/* ═══ COST OF GOODS SOLD ═══ */}
              <PLRow label="COST OF GOODS SOLD" actual={-1_215_520} budget={-1_148_000} priorYear={-1_150_450} pctSales={28.4} bold borderTop expandable expanded={expandFood} onToggle={() => setExpandFood(!expandFood)} />
              {expandFood && <>
                <PLRow label="Beef (ground chuck)" actual={-534_820} budget={-512_500} priorYear={-498_700} pctSales={12.5} indent={1} />
                <PLRow label="Hot Dogs & Sandwiches" actual={-102_720} budget={-98_400} priorYear={-94_800} pctSales={2.4} indent={1} />
                <PLRow label="Potatoes (fresh cut fries)" actual={-192_600} budget={-180_400} priorYear={-174_200} pctSales={4.5} indent={1} />
                <PLRow label="Peanut Oil" actual={-85_600} budget={-78_720} priorYear={-71_100} pctSales={2.0} indent={1} />
                <PLRow label="Produce & Toppings" actual={-119_840} budget={-114_800} priorYear={-110_600} pctSales={2.8} indent={1} />
                <PLRow label="Cheese & Dairy" actual={-51_360} budget={-49_200} priorYear={-47_400} pctSales={1.2} indent={1} />
                <PLRow label="Buns & Bread" actual={-42_800} budget={-41_000} priorYear={-39_500} pctSales={1.0} indent={1} />
                <PLRow label="Beverages (fountain/bottled)" actual={-47_080} budget={-45_100} priorYear={-43_450} pctSales={1.1} indent={1} />
                <PLRow label="Paper Goods & Packaging" actual={-38_700} budget={-27_880} priorYear={-70_700} pctSales={0.9} indent={1} />
              </>}

              {/* ═══ GROSS PROFIT ═══ */}
              <PLRow label="GROSS PROFIT" actual={3_064_480} budget={2_952_000} priorYear={2_799_550} pctSales={71.6} bold borderTop highlight />

              {/* ═══ LABOR ═══ */}
              <PLRow label="TOTAL LABOR" actual={-1_335_360} budget={-1_230_000} priorYear={-1_216_600} pctSales={31.2} bold borderTop expandable expanded={expandLabor} onToggle={() => setExpandLabor(!expandLabor)} />
              {expandLabor && <>
                <PLRow label="Crew Wages" actual={-694_380} budget={-639_600} priorYear={-632_630} pctSales={16.2} indent={1} />
                <PLRow label="Manager Salaries" actual={-256_800} budget={-246_000} priorYear={-237_000} pctSales={6.0} indent={1} />
                <PLRow label="Overtime Premium" actual={-48_360} budget={-32_800} priorYear={-31_600} pctSales={1.1} indent={1} />
                <PLRow label="Payroll Taxes (FICA/FUTA)" actual={-162_720} budget={-155_760} priorYear={-150_050} pctSales={3.8} indent={1} />
                <PLRow label="Workers Comp Insurance" actual={-34_240} budget={-32_800} priorYear={-31_600} pctSales={0.8} indent={1} />
                <PLRow label="Employee Benefits" actual={-64_200} budget={-61_500} priorYear={-59_250} pctSales={1.5} indent={1} />
                <PLRow label="Training & Onboarding" actual={-17_120} budget={-16_400} priorYear={-15_800} pctSales={0.4} indent={1} />
                <PLRow label="Bonuses & Incentives" actual={-57_540} budget={-45_140} priorYear={-58_670} pctSales={1.3} indent={1} />
              </>}

              {/* ═══ OCCUPANCY ═══ */}
              <PLRow label="OCCUPANCY" actual={-342_400} budget={-328_000} priorYear={-316_000} pctSales={8.0} bold borderTop expandable expanded={expandOccupancy} onToggle={() => setExpandOccupancy(!expandOccupancy)} />
              {expandOccupancy && <>
                <PLRow label="Base Rent" actual={-214_000} budget={-214_000} priorYear={-207_350} pctSales={5.0} indent={1} />
                <PLRow label="CAM / Common Area" actual={-42_800} budget={-41_000} priorYear={-39_500} pctSales={1.0} indent={1} />
                <PLRow label="Property Tax" actual={-34_240} budget={-32_800} priorYear={-31_600} pctSales={0.8} indent={1} />
                <PLRow label="Property Insurance" actual={-25_680} budget={-24_600} priorYear={-23_700} pctSales={0.6} indent={1} />
                <PLRow label="Utilities (electric/gas/water)" actual={-25_680} budget={-15_600} priorYear={-13_850} pctSales={0.6} indent={1} />
              </>}

              {/* ═══ OPERATING EXPENSES ═══ */}
              <PLRow label="OPERATING EXPENSES" actual={-256_800} budget={-246_000} priorYear={-237_000} pctSales={6.0} bold borderTop expandable expanded={expandOpex} onToggle={() => setExpandOpex(!expandOpex)} />
              {expandOpex && <>
                <PLRow label="Repairs & Maintenance" actual={-64_200} budget={-57_400} priorYear={-55_300} pctSales={1.5} indent={1} />
                <PLRow label="Smallwares & Supplies" actual={-42_800} budget={-41_000} priorYear={-39_500} pctSales={1.0} indent={1} />
                <PLRow label="Cleaning & Sanitation" actual={-25_680} budget={-24_600} priorYear={-23_700} pctSales={0.6} indent={1} />
                <PLRow label="Uniforms" actual={-12_840} budget={-12_300} priorYear={-11_850} pctSales={0.3} indent={1} />
                <PLRow label="Technology / POS" actual={-21_400} budget={-20_500} priorYear={-19_750} pctSales={0.5} indent={1} />
                <PLRow label="Security" actual={-17_120} budget={-16_400} priorYear={-15_800} pctSales={0.4} indent={1} />
                <PLRow label="Cash Over/Short" actual={-2_140} budget={-2_050} priorYear={-1_975} pctSales={0.1} indent={1} />
                <PLRow label="Miscellaneous" actual={-70_620} budget={-71_750} priorYear={-69_125} pctSales={1.7} indent={1} />
              </>}

              {/* ═══ MARKETING ═══ */}
              <PLRow label="MARKETING & ADVERTISING" actual={-128_400} budget={-123_000} priorYear={-118_500} pctSales={3.0} bold borderTop />

              {/* ═══ CONTROLLABLE PROFIT ═══ */}
              <PLRow label="CONTROLLABLE PROFIT" actual={1_001_520} budget={1_025_000} priorYear={911_450} pctSales={23.4} bold borderTop highlight />

              {/* ═══ NON-CONTROLLABLE ═══ */}
              <PLRow label="Depreciation & Amortization" actual={-171_200} budget={-164_000} priorYear={-158_000} pctSales={4.0} borderTop />

              {/* ═══ NET OPERATING INCOME ═══ */}
              <PLRow label="NET OPERATING INCOME" actual={830_320} budget={861_000} priorYear={753_450} pctSales={19.4} bold borderTop highlight />
            </tbody>
          </table>
        </div>
      </Card>

      {/* Cost Structure Gauges */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {[
          { label: 'Food & Paper Cost', current: 28.4, target: 28.0, industry: 30.2, color: AMBER },
          { label: 'Total Labor Cost', current: 31.2, target: 30.0, industry: 32.5, color: '#ef4444' },
          { label: 'Controllable Profit', current: 23.4, target: 24.5, industry: 20.1, color: GREEN },
        ].map(g => (
          <Card key={g.label} className="p-4">
            <div className="flex justify-between items-baseline mb-2">
              <span style={{ fontSize: 11, fontWeight: 700, color: GRAY }}>{g.label}</span>
              <span style={{ fontSize: 18, fontWeight: 900, color: WHITE }}>{g.current}%</span>
            </div>
            <div style={{ position: 'relative', height: 10, borderRadius: 5, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', height: '100%', width: `${(g.current / 40) * 100}%`, borderRadius: 5, background: g.color }} />
              <div style={{ position: 'absolute', height: '100%', width: 2, left: `${(g.target / 40) * 100}%`, background: WHITE }} title={`Target: ${g.target}%`} />
            </div>
            <div className="flex justify-between mt-2">
              <span style={{ fontSize: 10, fontWeight: 700, color: g.label === 'Controllable Profit' ? (g.current >= g.target ? GREEN : '#ef4444') : (g.current <= g.target ? GREEN : '#ef4444') }}>
                {g.label === 'Controllable Profit'
                  ? (g.current >= g.target ? 'On target' : `${(g.target - g.current).toFixed(1)}pts below target`)
                  : (g.current <= g.target ? 'On target' : `${(g.current - g.target).toFixed(1)}pts over target`)
                }
              </span>
              <span style={{ fontSize: 10, color: GRAY }}>Industry: {g.industry}%</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SUB-TAB 1: REVENUE TRENDS
// ─────────────────────────────────────────────────────────────
function RevenueTrends() {
  const d = financialKPIs
  const revenueData = d.revenue.months.map((m: string, i: number) => ({
    month: m, revenue: d.revenue.trend[i], budget: d.revenue.budget,
  }))
  const revChange = ((d.revenue.current - d.revenue.prior) / d.revenue.prior) * 100

  const channelTrend = [
    { month: 'Jan', dineIn: 268, online: 92, catering: 26 },
    { month: 'Feb', dineIn: 252, online: 96, catering: 24 },
    { month: 'Mar', dineIn: 275, online: 103, catering: 28 },
    { month: 'Apr', dineIn: 280, online: 108, catering: 30 },
    { month: 'May', dineIn: 295, online: 112, catering: 32 },
    { month: 'Jun', dineIn: 310, online: 118, catering: 35 },
    { month: 'Jul', dineIn: 305, online: 122, catering: 33 },
    { month: 'Aug', dineIn: 298, online: 126, catering: 31 },
    { month: 'Sep', dineIn: 285, online: 130, catering: 29 },
    { month: 'Oct', dineIn: 270, online: 115, catering: 27 },
    { month: 'Nov', dineIn: 265, online: 105, catering: 25 },
    { month: 'Dec', dineIn: 278, online: 107, catering: 34 },
  ]

  return (
    <div className="space-y-5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Revenue" value={(d.revenue.current / 1_000_000).toFixed(2) + 'M'} change={revChange} prefix="$" icon={<DollarSign size={16} />} />
        <KPICard label="Avg Check" value={d.avgCheck.current.toFixed(2)} change={d.avgCheck.change} prefix="$" icon={<ShoppingBag size={16} />} />
        <KPICard label="Guest Count" value={(d.guestCount.current / 1000).toFixed(1) + 'K'} change={d.guestCount.change} icon={<Users size={16} />} note="Slight decline offset by higher avg check" />
        <KPICard label="Comp Sales" value={d.comps.current.toString()} change={d.comps.current} suffix="%" icon={<TrendingUp size={16} />} />
      </div>

      <Card className="p-5">
        <div style={{ fontSize: 14, fontWeight: 800, color: WHITE, marginBottom: 4 }}>Revenue Trend vs. Budget</div>
        <div style={{ fontSize: 11, color: GRAY, marginBottom: 16 }}>AI forecast accuracy: 96.2% · Next month prediction: $4.31M</div>
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={revenueData} margin={{ left: 10, right: 10, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: GRAY }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: GRAY }} tickFormatter={(v: number) => `$${(v / 1_000_000).toFixed(1)}M`} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, background: 'rgba(10,10,10,0.95)', border: '1px solid rgba(200,16,46,0.25)', color: WHITE }} formatter={(v: any) => [`$${(v / 1_000_000).toFixed(2)}M`, '']} />
            <ReferenceLine y={d.revenue.budget} stroke={GRAY} strokeDasharray="3 3" label={{ value: 'Budget', fill: GRAY, fontSize: 10 }} />
            <Line type="monotone" dataKey="revenue" stroke={AMBER} strokeWidth={2.5} dot={{ r: 3, fill: AMBER }} />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      <Card className="p-5">
        <div style={{ fontSize: 14, fontWeight: 800, color: WHITE, marginBottom: 4 }}>Revenue by Channel — 12 Month Trend</div>
        <div style={{ fontSize: 11, color: GRAY, marginBottom: 16 }}>Dine-In · Online & Delivery · Catering (in $K)</div>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={channelTrend} margin={{ left: 10, right: 10, top: 5, bottom: 5 }}>
            <defs>
              <linearGradient id="dineInFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={AMBER} stopOpacity={0.15}/><stop offset="100%" stopColor={AMBER} stopOpacity={0}/></linearGradient>
              <linearGradient id="onlineFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#3b82f6" stopOpacity={0.15}/><stop offset="100%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient>
              <linearGradient id="cateringFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.15}/><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0}/></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: GRAY }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: GRAY }} tickFormatter={(v: number) => `$${v}K`} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, background: 'rgba(10,10,10,0.95)', border: '1px solid rgba(200,16,46,0.25)', color: WHITE }} />
            <Area type="monotone" dataKey="dineIn" stroke={AMBER} strokeWidth={2} fill="url(#dineInFill)" name="Dine-In ($K)" />
            <Area type="monotone" dataKey="online" stroke="#3b82f6" strokeWidth={2} fill="url(#onlineFill)" name="Online ($K)" />
            <Area type="monotone" dataKey="catering" stroke="#8b5cf6" strokeWidth={2} fill="url(#cateringFill)" name="Catering ($K)" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          {[{ label: 'Dine-In', c: AMBER }, { label: 'Online & Delivery', c: '#3b82f6' }, { label: 'Catering', c: '#8b5cf6' }].map(l => (
            <div key={l.label} className="flex items-center gap-1.5"><span style={{ width: 10, height: 3, borderRadius: 2, background: l.c }} /><span style={{ fontSize: 10, color: GRAY }}>{l.label}</span></div>
          ))}
        </div>
      </Card>

      {/* Channel Attribution */}
      <Card className="p-5">
        <div style={{ fontSize: 14, fontWeight: 800, color: WHITE, marginBottom: 4 }}>Revenue Attribution by Channel</div>
        <div style={{ fontSize: 11, color: GRAY, marginBottom: 16 }}>Which channels drive the most revenue?</div>
        {[
          { name: 'Dine-In (Foot Traffic)', pct: 65, amt: '$2.78M', color: AMBER },
          { name: 'Online & Delivery', pct: 25, amt: '$1.07M', color: '#3b82f6' },
          { name: 'Catering & B2B', pct: 8, amt: '$342K', color: '#8b5cf6' },
          { name: 'Gift Card Redemptions', pct: 2, amt: '$86K', color: GREEN },
        ].map(ch => (
          <div key={ch.name} className="mb-3">
            <div className="flex justify-between mb-1">
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{ch.name}</span>
              <div className="flex gap-3"><span style={{ fontSize: 12, fontWeight: 700, color: WHITE, fontFamily: 'monospace' }}>{ch.pct}%</span><span style={{ fontSize: 12, color: GRAY, fontFamily: 'monospace' }}>{ch.amt}</span></div>
            </div>
            <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}><div style={{ height: '100%', width: `${ch.pct}%`, borderRadius: 4, background: ch.color }} /></div>
          </div>
        ))}
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SUB-TAB 2: COST CONTROL
// ─────────────────────────────────────────────────────────────
function CostControl() {
  const costTrend = [
    { month: 'Jan', food: 28.1, labor: 30.5, occupancy: 8.1, opex: 5.8 },
    { month: 'Feb', food: 28.3, labor: 30.8, occupancy: 8.0, opex: 5.9 },
    { month: 'Mar', food: 28.4, labor: 31.2, occupancy: 8.0, opex: 6.0 },
    { month: 'Apr', food: 27.9, labor: 30.6, occupancy: 8.0, opex: 5.7 },
    { month: 'May', food: 27.8, labor: 30.2, occupancy: 7.9, opex: 5.8 },
    { month: 'Jun', food: 28.0, labor: 30.4, occupancy: 7.9, opex: 5.9 },
    { month: 'Jul', food: 28.6, labor: 31.0, occupancy: 8.0, opex: 6.1 },
    { month: 'Aug', food: 28.8, labor: 31.4, occupancy: 8.0, opex: 6.2 },
    { month: 'Sep', food: 28.2, labor: 30.8, occupancy: 8.0, opex: 5.9 },
    { month: 'Oct', food: 27.6, labor: 30.0, occupancy: 8.0, opex: 5.7 },
    { month: 'Nov', food: 27.4, labor: 29.8, occupancy: 8.0, opex: 5.6 },
    { month: 'Dec', food: 28.4, labor: 31.2, occupancy: 8.0, opex: 6.0 },
  ]

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div style={{ fontSize: 14, fontWeight: 800, color: WHITE, marginBottom: 4 }}>Cost as % of Sales — 12 Month Trend</div>
        <div style={{ fontSize: 11, color: GRAY, marginBottom: 16 }}>Food & Paper · Labor · Occupancy · Operating Expenses</div>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={costTrend} margin={{ left: 10, right: 10, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: GRAY }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: GRAY }} tickFormatter={(v: number) => `${v}%`} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, background: 'rgba(10,10,10,0.95)', border: '1px solid rgba(200,16,46,0.25)', color: WHITE }} formatter={(v: any) => [`${v}%`, '']} />
            <ReferenceLine y={28.0} stroke="rgba(245,158,11,0.2)" strokeDasharray="4 3" />
            <ReferenceLine y={30.0} stroke="rgba(239,68,68,0.2)" strokeDasharray="4 3" />
            <Line type="monotone" dataKey="food" stroke={AMBER} strokeWidth={2} name="Food & Paper" dot={{ r: 3, fill: AMBER }} />
            <Line type="monotone" dataKey="labor" stroke="#ef4444" strokeWidth={2} name="Labor" dot={{ r: 3, fill: '#ef4444' }} />
            <Line type="monotone" dataKey="occupancy" stroke="#6366f1" strokeWidth={1.5} name="Occupancy" dot={false} strokeDasharray="4 3" />
            <Line type="monotone" dataKey="opex" stroke={GREEN} strokeWidth={1.5} name="OpEx" dot={false} strokeDasharray="4 3" />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Food Cost Variance */}
      <Card className="p-5">
        <div style={{ fontSize: 14, fontWeight: 800, color: WHITE, marginBottom: 12 }}>Food Cost Variance Analysis</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr>{['Category', 'Theoretical', 'Actual', 'Variance', 'Impact'].map(h => (
              <th key={h} style={{ fontSize: 10, fontWeight: 700, color: GRAY, padding: '8px 12px', textAlign: h === 'Category' ? 'left' as const : 'right' as const, borderBottom: '1px solid rgba(255,255,255,0.06)', letterSpacing: 1 }}>{h}</th>
            ))}</tr></thead>
            <tbody>
              {[
                { cat: 'Ground Beef', theo: '12.1%', actual: '12.5%', var: '+0.4%', impact: '-$17.1K', bad: true },
                { cat: 'Fry Potatoes', theo: '4.2%', actual: '4.5%', var: '+0.3%', impact: '-$12.8K', bad: true },
                { cat: 'Peanut Oil', theo: '1.8%', actual: '2.0%', var: '+0.2%', impact: '-$8.6K', bad: true },
                { cat: 'Produce & Toppings', theo: '2.6%', actual: '2.8%', var: '+0.2%', impact: '-$8.6K', bad: true },
                { cat: 'Buns', theo: '1.0%', actual: '1.0%', var: '0.0%', impact: '$0', bad: false },
                { cat: 'Beverages', theo: '1.0%', actual: '1.1%', var: '+0.1%', impact: '-$4.3K', bad: true },
                { cat: 'Paper & Packaging', theo: '0.8%', actual: '0.9%', var: '+0.1%', impact: '-$4.3K', bad: true },
              ].map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                  <td style={{ fontSize: 12, color: WHITE, padding: '8px 12px' }}>{r.cat}</td>
                  <td style={{ fontSize: 12, color: GRAY, padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace' }}>{r.theo}</td>
                  <td style={{ fontSize: 12, color: WHITE, padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace' }}>{r.actual}</td>
                  <td style={{ fontSize: 12, fontWeight: 700, color: r.bad ? '#ef4444' : GREEN, padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace' }}>{r.var}</td>
                  <td style={{ fontSize: 12, fontWeight: 700, color: r.bad ? '#ef4444' : GREEN, padding: '8px 12px', textAlign: 'right', fontFamily: 'monospace' }}>{r.impact}</td>
                </tr>
              ))}
              <tr style={{ borderTop: '2px solid rgba(200,16,46,0.2)', background: 'rgba(200,16,46,0.04)' }}>
                <td style={{ fontSize: 13, fontWeight: 800, color: WHITE, padding: '10px 12px' }}>TOTAL VARIANCE</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'monospace', fontSize: 12, color: GRAY }}>23.5%</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'monospace', fontSize: 12, color: WHITE }}>24.8%</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'monospace', fontSize: 13, fontWeight: 800, color: '#ef4444' }}>+1.3%</td>
                <td style={{ padding: '10px 12px', textAlign: 'right', fontFamily: 'monospace', fontSize: 13, fontWeight: 800, color: '#ef4444' }}>-$55.7K</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>

      {/* AI Insight */}
      <Card className="p-4" style={{ borderTop: '2px solid rgba(200,16,46,0.5)' }}>
        <div className="flex items-start gap-3">
          <AlertCircle size={16} style={{ color: RED, flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: RED, letterSpacing: 1 }}>AI COST CONTROL INSIGHT</div>
            <div style={{ fontSize: 12, color: WHITE, lineHeight: 1.5, marginTop: 2 }}>
              Ground beef variance of +0.4% above theoretical represents <span style={{ color: '#ef4444', fontWeight: 700 }}>$17.1K in waste/overportioning per period</span>.
              Tuesday and Saturday evening shifts show the highest beef variance — correlating with newer crew members on those shifts.
              Recommend targeted portioning refresher training and scale calibration checks on those days.
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// SUB-TAB 3: DAYPART ANALYSIS
// ─────────────────────────────────────────────────────────────
function DaypartAnalysisView() {
  const daypartRevenue = [
    { period: 'Lunch (11a-2p)', weekday: 8200, weekend: 12400, pct: 38 },
    { period: 'Afternoon (2p-5p)', weekday: 2600, weekend: 4100, pct: 12 },
    { period: 'Dinner (5p-9p)', weekday: 9400, weekend: 13800, pct: 44 },
    { period: 'Late Night (9p-close)', weekday: 1300, weekend: 2100, pct: 6 },
  ]

  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div style={{ fontSize: 14, fontWeight: 800, color: WHITE, marginBottom: 4 }}>Revenue by Daypart</div>
        <div style={{ fontSize: 11, color: GRAY, marginBottom: 16 }}>AI identifies dinner as highest check but lunch drives volume</div>
        {daypartAnalysis.dayparts.map((dp: any) => {
          const colors: Record<string, string> = { up: GREEN, down: '#ef4444', stable: GRAY }
          const barColors: Record<string, string> = { 'Lunch (11am-2pm)': AMBER, 'Afternoon (2pm-5pm)': GRAY, 'Dinner (5pm-9pm)': GREEN, 'Late Night (9pm-close)': '#3b82f6' }
          return (
            <div key={dp.name} className="mb-3">
              <div className="flex justify-between mb-1">
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.8)' }}>{dp.name}</span>
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: 12, fontWeight: 700, color: WHITE, fontFamily: 'monospace' }}>{dp.revenuePct}% rev</span>
                  <span style={{ fontSize: 12, color: GRAY, fontFamily: 'monospace' }}>${dp.avgCheck} avg</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: colors[dp.trend] }}>{dp.trend === 'up' ? '↑' : dp.trend === 'down' ? '↓' : '→'}</span>
                </div>
              </div>
              <div style={{ height: 8, borderRadius: 4, background: 'rgba(255,255,255,0.04)', overflow: 'hidden' }}><div style={{ height: '100%', width: `${dp.revenuePct}%`, borderRadius: 4, background: barColors[dp.name] || GRAY }} /></div>
            </div>
          )
        })}
      </Card>

      <Card className="p-5">
        <div style={{ fontSize: 14, fontWeight: 800, color: WHITE, marginBottom: 12 }}>Weekday vs. Weekend by Daypart</div>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={daypartRevenue} margin={{ left: 10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
            <XAxis dataKey="period" tick={{ fontSize: 10, fill: GRAY }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: GRAY }} tickFormatter={(v: number) => `$${(v/1000).toFixed(0)}K`} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ fontSize: 12, borderRadius: 10, background: 'rgba(10,10,10,0.95)', border: '1px solid rgba(200,16,46,0.25)', color: WHITE }} formatter={(v: any) => [`$${v.toLocaleString()}`, '']} />
            <Bar dataKey="weekday" fill="rgba(255,255,255,0.12)" radius={[4, 4, 0, 0]} barSize={20} name="Weekday Avg" />
            <Bar dataKey="weekend" fill={RED} radius={[4, 4, 0, 0]} barSize={20} name="Weekend Avg" />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center gap-4 mt-3 pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          <div className="flex items-center gap-1.5"><span style={{ width: 10, height: 10, borderRadius: 3, background: 'rgba(255,255,255,0.12)' }} /><span style={{ fontSize: 10, color: GRAY }}>Weekday</span></div>
          <div className="flex items-center gap-1.5"><span style={{ width: 10, height: 10, borderRadius: 3, background: RED }} /><span style={{ fontSize: 10, color: GRAY }}>Weekend</span></div>
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-4">
        <Card className="p-5 text-center">
          <div style={{ fontSize: 10, color: GRAY, letterSpacing: 1, marginBottom: 4 }}>WEEKDAY AVG REVENUE</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: WHITE }}>${(daypartAnalysis.weekdayVsWeekend.weekday.avgRevenue / 1000).toFixed(0)}K</div>
          <div style={{ fontSize: 11, color: GRAY }}>{daypartAnalysis.weekdayVsWeekend.weekday.avgGuests.toLocaleString()} guests</div>
        </Card>
        <Card className="p-5 text-center">
          <div style={{ fontSize: 10, color: GRAY, letterSpacing: 1, marginBottom: 4 }}>WEEKEND AVG REVENUE</div>
          <div style={{ fontSize: 28, fontWeight: 900, color: WHITE }}>${(daypartAnalysis.weekdayVsWeekend.weekend.avgRevenue / 1000).toFixed(0)}K</div>
          <div style={{ fontSize: 11, color: GRAY }}>{daypartAnalysis.weekdayVsWeekend.weekend.avgGuests.toLocaleString()} guests</div>
        </Card>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// MAIN EXPORT — routes between sub-tabs
// ─────────────────────────────────────────────────────────────
// Sub-tabs: 0=P&L Statement, 1=Revenue Trends, 2=Cost Control, 3=Daypart Analysis
export function FinancialKPIs({ compact = false, activeSubNav = 0 }: { compact?: boolean; activeSubNav?: number }) {
  const d = financialKPIs
  const revChange = ((d.revenue.current - d.revenue.prior) / d.revenue.prior) * 100

  if (compact) {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign size={15} style={{ color: RED }} />
          <h3 style={{ fontSize: 14, fontWeight: 700, color: WHITE }}>Marketing Financial Snapshot</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <div style={{ fontSize: 10, color: GRAY, letterSpacing: 1 }}>REVENUE</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: WHITE }}>${(d.revenue.current / 1_000_000).toFixed(2)}M</div>
            <div className="flex items-center gap-0.5" style={{ color: GREEN, fontSize: 11, fontWeight: 700 }}><TrendingUp size={10} /> +{revChange.toFixed(1)}%</div>
          </div>
          <div>
            <div style={{ fontSize: 10, color: GRAY, letterSpacing: 1 }}>ROI (30d avg)</div>
            <div style={{ fontSize: 18, fontWeight: 900, color: WHITE }}>5.83x</div>
            <div style={{ fontSize: 11, color: GRAY }}>vs. $487K spend</div>
          </div>
        </div>
      </Card>
    )
  }

  switch (activeSubNav) {
    case 0: return <PLStatement />
    case 1: return <RevenueTrends />
    case 2: return <CostControl />
    case 3: return <DaypartAnalysisView />
    default: return <PLStatement />
  }
}
