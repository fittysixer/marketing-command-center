import React, { useState, useMemo } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, ReferenceLine, Area, AreaChart,
  RadialBarChart, RadialBar
} from 'recharts'
import { Shield, TrendingUp, TrendingDown, Eye, MessageCircle, AlertTriangle, Star, ChevronRight, Info } from 'lucide-react'

// ─── CARD ────────────────────────────────────────────────────────
function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-2xl ${className}`} style={{ background: 'rgba(30,30,34,0.85)', border: '1px solid rgba(200,16,46,0.08)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)' }}>{children}</div>
}

// ─── COLORS ──────────────────────────────────────────────────────
const RED = '#C8102E'
const GREEN = '#10b981'
const AMBER = '#f59e0b'
const GRAY = '#7a7a80'
const WHITE = '#f0f0f5'
const DIM = 'rgba(255,255,255,0.25)'
function scoreColor(s: number) { return s >= 90 ? GREEN : s >= 80 ? AMBER : '#ef4444' }

// ─── SECRET SHOPPER RAW DATA (from Brand Hub — Store 1289 Alexandria VA) ──
const SS_RAW = [
  {d:"12/31/2025",m:"Dinner",s:100},{d:"12/19/2025",m:"Dinner",s:92},{d:"12/12/2025",m:"Dinner",s:80},{d:"12/11/2025",m:"Dinner",s:92},
  {d:"12/09/2025",m:"Lunch",s:100},{d:"12/06/2025",m:"Lunch",s:84},{d:"12/04/2025",m:"Dinner",s:92},{d:"11/23/2025",m:"Lunch",s:100},
  {d:"11/18/2025",m:"Late Dinner",s:100},{d:"11/14/2025",m:"Dinner",s:76},{d:"11/12/2025",m:"Late Dinner",s:100},{d:"11/08/2025",m:"Dinner",s:72},
  {d:"11/04/2025",m:"Dinner",s:92},{d:"10/30/2025",m:"Dinner",s:88},{d:"10/28/2025",m:"Dinner",s:100},{d:"10/24/2025",m:"Dinner",s:92},
  {d:"10/21/2025",m:"Dinner",s:80},{d:"10/18/2025",m:"Lunch",s:68},{d:"10/14/2025",m:"Dinner",s:92},{d:"10/10/2025",m:"Dinner",s:100},
  {d:"10/07/2025",m:"Dinner",s:84},{d:"10/04/2025",m:"Dinner",s:76},{d:"10/03/2025",m:"Lunch",s:92},{d:"09/24/2025",m:"Lunch",s:100},
  {d:"09/16/2025",m:"Dinner",s:92},{d:"09/15/2025",m:"Lunch",s:84},{d:"09/14/2025",m:"Dinner",s:100},{d:"09/11/2025",m:"Lunch",s:80},
  {d:"08/31/2025",m:"Dinner",s:92},{d:"08/26/2025",m:"Dinner",s:88},{d:"08/23/2025",m:"Lunch",s:92},{d:"08/13/2025",m:"Lunch",s:84},
  {d:"08/12/2025",m:"Late Dinner",s:76},{d:"08/07/2025",m:"Dinner",s:100},{d:"08/05/2025",m:"Lunch",s:92},{d:"08/02/2025",m:"Dinner",s:72},
  {d:"07/30/2025",m:"Late Dinner",s:100},{d:"07/22/2025",m:"Lunch",s:92},{d:"07/18/2025",m:"Late Dinner",s:100},{d:"07/15/2025",m:"Lunch",s:92},
  {d:"07/12/2025",m:"Dinner",s:80},{d:"07/08/2025",m:"Dinner",s:92},{d:"07/02/2025",m:"Lunch",s:92},{d:"06/27/2025",m:"Dinner",s:68},
  {d:"06/24/2025",m:"Late Dinner",s:100},{d:"06/20/2025",m:"Late Dinner",s:92},{d:"06/17/2025",m:"Dinner",s:80},{d:"06/13/2025",m:"Lunch",s:92},
  {d:"06/10/2025",m:"Dinner",s:100},{d:"06/06/2025",m:"Dinner",s:76},{d:"06/03/2025",m:"Dinner",s:84},{d:"05/30/2025",m:"Late Dinner",s:100},
  {d:"05/27/2025",m:"Dinner",s:88},{d:"05/20/2025",m:"Dinner",s:92},{d:"05/16/2025",m:"Dinner",s:80},{d:"05/13/2025",m:"Dinner",s:92},
  {d:"05/09/2025",m:"Dinner",s:100},{d:"05/06/2025",m:"Dinner",s:72},{d:"05/02/2025",m:"Late Dinner",s:100},{d:"04/29/2025",m:"Late Dinner",s:84},
  {d:"04/25/2025",m:"Late Dinner",s:100},{d:"04/22/2025",m:"Late Dinner",s:100},{d:"04/18/2025",m:"Dinner",s:76},{d:"04/15/2025",m:"Late Dinner",s:92},
  {d:"04/11/2025",m:"Late Dinner",s:100},{d:"04/08/2025",m:"Late Dinner",s:80},{d:"04/04/2025",m:"Dinner",s:84},{d:"04/01/2025",m:"Dinner",s:100},
  {d:"03/28/2025",m:"Late Dinner",s:92},{d:"03/25/2025",m:"Dinner",s:80},{d:"03/21/2025",m:"Dinner",s:100},{d:"03/18/2025",m:"Lunch",s:100},
  {d:"03/14/2025",m:"Dinner",s:84},{d:"03/11/2025",m:"Late Dinner",s:92},{d:"03/07/2025",m:"Dinner",s:100},{d:"03/04/2025",m:"Late Dinner",s:88},
  {d:"02/28/2025",m:"Dinner",s:100},{d:"02/25/2025",m:"Dinner",s:100},{d:"02/21/2025",m:"Late Dinner",s:92},{d:"02/18/2025",m:"Late Dinner",s:100},
  {d:"02/14/2025",m:"Dinner",s:92},{d:"02/11/2025",m:"Dinner",s:80},{d:"02/07/2025",m:"Dinner",s:100},{d:"02/04/2025",m:"Lunch",s:100},
  {d:"01/31/2025",m:"Dinner",s:100},{d:"01/28/2025",m:"Dinner",s:84},{d:"01/24/2025",m:"Late Dinner",s:100},{d:"01/21/2025",m:"Dinner",s:92},
  {d:"01/17/2025",m:"Late Dinner",s:92}
]
const CO_AVG = 84.2

// ─── MONTHLY TREND DATA (store vs company over 12 months) ──────
const monthlyTrend = [
  { month: 'Jan', store: 94.0, company: 83.8 },
  { month: 'Feb', store: 95.4, company: 84.1 },
  { month: 'Mar', store: 92.0, company: 84.5 },
  { month: 'Apr', store: 90.3, company: 83.9 },
  { month: 'May', store: 89.3, company: 84.0 },
  { month: 'Jun', store: 88.0, company: 84.4 },
  { month: 'Jul', store: 92.6, company: 84.2 },
  { month: 'Aug', store: 87.7, company: 83.6 },
  { month: 'Sep', store: 91.0, company: 84.8 },
  { month: 'Oct', store: 87.2, company: 84.0 },
  { month: 'Nov', store: 90.0, company: 84.5 },
  { month: 'Dec', store: 91.4, company: 84.2 },
]

// ─── CSAT monthly data (store vs company) ──────────────────────
const csatMonthly = [
  { month: 'Jan', store: 76.2, company: 73.8 },
  { month: 'Feb', store: 77.1, company: 74.0 },
  { month: 'Mar', store: 78.5, company: 73.5 },
  { month: 'Apr', store: 75.8, company: 74.1 },
  { month: 'May', store: 79.2, company: 73.9 },
  { month: 'Jun', store: 77.0, company: 74.3 },
  { month: 'Jul', store: 80.1, company: 74.0 },
  { month: 'Aug', store: 76.5, company: 73.7 },
  { month: 'Sep', store: 78.8, company: 74.5 },
  { month: 'Oct', store: 77.3, company: 74.2 },
  { month: 'Nov', store: 79.5, company: 74.0 },
  { month: 'Dec', store: 78.4, company: 74.0 },
]

// ─── CASES DATA ────────────────────────────────────────────────
const casesData = [
  { name: 'Praise', value: 42, color: GREEN },
  { name: 'Suggestions', value: 28, color: '#6366f1' },
  { name: 'Problem', value: 15, color: AMBER },
  { name: 'Escalation', value: 10, color: '#f97316' },
  { name: 'Urgent', value: 5, color: '#ef4444' },
]

// ─── CATEGORY SCORES ───────────────────────────────────────────
const categoryScores = [
  { category: 'Greeting & Hospitality', store: 94, company: 86 },
  { category: 'Order Accuracy', store: 91, company: 88 },
  { category: 'Fry Quality', store: 96, company: 85 },
  { category: 'Burger Quality', store: 93, company: 87 },
  { category: 'Cleanliness', store: 88, company: 84 },
  { category: 'Speed of Service', store: 82, company: 81 },
  { category: 'Overall Experience', store: 90, company: 84 },
]


// ─────────────────────────────────────────────────────────────────
// RADIAL GAUGE — premium replacement for MarketForce's donut
// ─────────────────────────────────────────────────────────────────
function RadialGauge({ value, target, label, sublabel, color }: { value: number; target: number; label: string; sublabel: string; color: string }) {
  const data = [{ value, fill: color }]
  const isAboveTarget = value >= target
  return (
    <div className="flex flex-col items-center">
      <div style={{ width: 160, height: 130, position: 'relative' }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%" cy="100%"
            innerRadius="75%"
            outerRadius="100%"
            barSize={14}
            data={data}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar background={{ fill: 'rgba(255,255,255,0.05)' }} dataKey="value" cornerRadius={10} />
          </RadialBarChart>
        </ResponsiveContainer>
        <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
          <div style={{ fontSize: 32, fontWeight: 900, color: WHITE, lineHeight: 1 }}>{label}</div>
          <div style={{ fontSize: 10, color: GRAY, marginTop: 2 }}>{sublabel}</div>
        </div>
      </div>
      <div className="flex items-center gap-2 mt-1">
        <span style={{ fontSize: 10, color: GRAY }}>Target: {target}</span>
        <span style={{ fontSize: 10, color: isAboveTarget ? GREEN : '#ef4444', fontWeight: 700 }}>
          {isAboveTarget ? '+ Above' : '- Below'}
        </span>
      </div>
    </div>
  )
}


// ─────────────────────────────────────────────────────────────────
// INTERACTIVE SECRET SHOPPER TIMELINE (adapted from Brand Hub SVG)
// ─────────────────────────────────────────────────────────────────
function ShopperTimeline({ filter }: { filter: string }) {
  const [hovIdx, setHovIdx] = useState(-1)

  const data = useMemo(() => {
    const sorted = SS_RAW.map(r => ({ ...r, dateObj: new Date(r.d) })).sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    const filtered = filter === 'All' ? sorted : sorted.filter(x => x.m === filter)
    // Compute rolling average (window 5)
    return filtered.map((x, i) => {
      const start = Math.max(0, i - 4)
      const window = filtered.slice(start, i + 1)
      const avg = window.reduce((s, w) => s + w.s, 0) / window.length
      return { date: x.d.substring(0, 5), fullDate: x.d, score: x.s, meal: x.m, ra: Math.round(avg * 10) / 10 }
    })
  }, [filter])

  const W = 800, H = 220, padL = 40, padR = 16, padT = 16, padB = 30
  const cW = W - padL - padR, cH = H - padT - padB
  const len = data.length
  const xStep = cW / (len - 1 || 1)

  function getIdx(e: React.MouseEvent<SVGSVGElement> | React.TouchEvent<SVGSVGElement>) {
    const svg = e.currentTarget
    const rect = svg.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const pxX = clientX - rect.left
    const svgX = pxX * (W / rect.width)
    const idx = Math.round((svgX - padL) / xStep)
    setHovIdx(Math.max(0, Math.min(len - 1, idx)))
  }

  const stems: React.ReactElement[] = []
  const dots: React.ReactElement[] = []
  const raPoints: string[] = []

  for (let i = 0; i < len; i++) {
    const x = padL + i * xStep
    const y = padT + cH - (data[i].score / 100) * cH
    const yRa = padT + cH - (data[i].ra / 100) * cH
    const isHov = hovIdx === i
    const c = scoreColor(data[i].score)

    stems.push(<line key={`s${i}`} x1={x} y1={padT + cH} x2={x} y2={y} stroke={c} strokeWidth={isHov ? 2.5 : 1.5} strokeOpacity={isHov ? 0.9 : 0.3} />)
    dots.push(<circle key={`d${i}`} cx={x} cy={y} r={isHov ? 5 : 2.5} fill={c} fillOpacity={isHov ? 1 : 0.5} stroke={isHov ? '#fff' : 'none'} strokeWidth={isHov ? 1.5 : 0} />)
    raPoints.push(`${x},${yRa}`)
  }

  // Reference lines
  const refs = [
    { v: 90, c: 'rgba(16,185,129,0.12)' },
    { v: 80, c: 'rgba(245,158,11,0.12)' },
    { v: CO_AVG, c: 'rgba(255,255,255,0.1)' },
  ]

  // Y axis labels
  const yLabels = [0, 50, 80, 90, 100].map(v => (
    <text key={`y${v}`} x={padL - 6} y={padT + cH - (v / 100) * cH + 3} fill={DIM} fontSize={9} textAnchor="end">{v}</text>
  ))

  // X axis labels (every 8th)
  const xLabels: React.ReactElement[] = []
  const step = Math.max(1, Math.floor(len / 10))
  for (let i = 0; i < len; i += step) {
    xLabels.push(<text key={`x${i}`} x={padL + i * xStep} y={H - 4} fill={DIM} fontSize={8} textAnchor="middle">{data[i].date}</text>)
  }

  // Hover tooltip
  let tooltip: React.ReactElement | null = null
  if (hovIdx >= 0 && hovIdx < len) {
    const hx = padL + hovIdx * xStep
    const hy = padT + cH - (data[hovIdx].score / 100) * cH
    const tipX = hx < W / 2 ? hx + 10 : hx - 110
    tooltip = (
      <g>
        <line x1={hx} y1={padT} x2={hx} y2={padT + cH} stroke="rgba(255,255,255,0.1)" strokeWidth={1} strokeDasharray="3 2" />
        <rect x={tipX} y={Math.max(padT, hy - 38)} width={100} height={34} rx={8} fill="rgba(10,10,10,0.95)" stroke="rgba(200,16,46,0.2)" strokeWidth={1} />
        <text x={tipX + 8} y={Math.max(padT, hy - 38) + 15} fill={scoreColor(data[hovIdx].score)} fontSize={16} fontWeight={900}>{data[hovIdx].score}</text>
        <text x={tipX + 38} y={Math.max(padT, hy - 38) + 15} fill={GRAY} fontSize={9}>{data[hovIdx].meal}</text>
        <text x={tipX + 8} y={Math.max(padT, hy - 38) + 27} fill={DIM} fontSize={8}>{data[hovIdx].fullDate}</text>
      </g>
    )
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', touchAction: 'none', cursor: 'crosshair' }}
      onMouseMove={getIdx} onMouseLeave={() => setHovIdx(-1)} onTouchStart={getIdx} onTouchMove={getIdx} onTouchEnd={() => setHovIdx(-1)}>
      {refs.map((r, i) => {
        const ry = padT + cH - (r.v / 100) * cH
        return <line key={`ref${i}`} x1={padL} y1={ry} x2={W - padR} y2={ry} stroke={r.c} strokeDasharray="4 3" />
      })}
      {yLabels}
      {xLabels}
      {/* Company avg label */}
      <text x={W - padR} y={padT + cH - (CO_AVG / 100) * cH - 4} fill="rgba(255,255,255,0.12)" fontSize={8} textAnchor="end">Co {CO_AVG}</text>
      {stems}
      {dots}
      {/* Rolling average line */}
      <polyline points={raPoints.join(' ')} fill="none" stroke={RED} strokeWidth={2} strokeLinejoin="round" style={{ pointerEvents: 'none' }} />
      {tooltip}
    </svg>
  )
}


// ─────────────────────────────────────────────────────────────────
// CUSTOM TOOLTIP for Recharts
// ─────────────────────────────────────────────────────────────────
function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: 'rgba(10,10,10,0.95)', border: '1px solid rgba(200,16,46,0.15)', borderRadius: 10, padding: '8px 12px', backdropFilter: 'blur(8px)' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: WHITE, marginBottom: 4 }}>{label}</div>
      {payload.map((p: any, i: number) => (
        <div key={i} className="flex items-center gap-2" style={{ fontSize: 11 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: p.color, display: 'inline-block' }} />
          <span style={{ color: GRAY }}>{p.name}:</span>
          <span style={{ color: WHITE, fontWeight: 700 }}>{typeof p.value === 'number' ? p.value.toFixed(1) : p.value}</span>
        </div>
      ))}
    </div>
  )
}


// ─────────────────────────────────────────────────────────────────
// MAIN HOMEPAGE COMPONENT
// ─────────────────────────────────────────────────────────────────
export function ShopperHomepage() {
  const [mealFilter, setMealFilter] = useState('All')
  const [activeTab, setActiveTab] = useState<'performance' | 'trending'>('performance')

  // Compute store stats from raw data
  const stats = useMemo(() => {
    const sorted = SS_RAW.map(r => ({ ...r, dateObj: new Date(r.d) })).sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())
    const total = sorted.length
    const sum = sorted.reduce((s, r) => s + r.s, 0)
    const avg = Math.round(sum / total * 10) / 10

    // Last 30 days
    const now = new Date('2026-01-15')
    const d30 = new Date(now.getTime() - 30 * 864e5)
    const last30 = sorted.filter(r => r.dateObj >= d30)
    const avg30 = last30.length ? Math.round(last30.reduce((s, r) => s + r.s, 0) / last30.length * 10) / 10 : 0

    // Previous 30 days
    const p30start = new Date(d30.getTime() - 30 * 864e5)
    const prev30 = sorted.filter(r => r.dateObj >= p30start && r.dateObj < d30)
    const avgP30 = prev30.length ? Math.round(prev30.reduce((s, r) => s + r.s, 0) / prev30.length * 10) / 10 : avg30
    const trend30 = Math.round((avg30 - avgP30) * 10) / 10

    const count100 = sorted.filter(r => r.s === 100).length
    const pct100 = Math.round(count100 / total * 100)

    // Meal breakdown
    const meals: Record<string, number[]> = {}
    sorted.forEach(r => { if (!meals[r.m]) meals[r.m] = []; meals[r.m].push(r.s) })
    const mealStats = Object.entries(meals).map(([meal, scores]) => ({
      meal,
      avg: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length * 10) / 10,
      count: scores.length,
      pct100: Math.round(scores.filter(s => s === 100).length / scores.length * 100),
    }))

    return { avg, avg30, trend30, total, count100, pct100, mealStats }
  }, [])

  const totalCases = casesData.reduce((s, d) => s + d.value, 0)

  // ─── PERFORMANCE TAB ────────────────────────────────────────
  if (activeTab === 'performance') return (
    <div className="space-y-5">
      {/* Tab Toggle (matches MarketForce) */}
      <div className="flex justify-center gap-4 mb-2">
        <button onClick={() => setActiveTab('performance')} style={{ fontSize: 13, fontWeight: 800, color: RED, borderBottom: `2px solid ${RED}`, paddingBottom: 4, background: 'none', border: 'none', cursor: 'pointer' }}>
          Performance Dashboard
        </button>
        <span style={{ color: DIM }}>|</span>
        <button onClick={() => setActiveTab('trending')} style={{ fontSize: 13, fontWeight: 600, color: GRAY, paddingBottom: 4, background: 'none', border: 'none', cursor: 'pointer' }}>
          Trending Dashboard
        </button>
      </div>

      {/* Store Label */}
      <div className="flex items-center gap-3">
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: WHITE, letterSpacing: 1 }}>STORE #1289 — ALEXANDRIA, VA</span>
        <span style={{ fontSize: 10, color: GRAY, marginLeft: 'auto' }}>Current Month to Date</span>
      </div>

      {/* ──── ROW 1: Three Hero KPI Cards (matches MarketForce layout) ──── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Secret Shops Card */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Shield size={15} style={{ color: RED }} />
            <span style={{ fontSize: 13, fontWeight: 800, color: WHITE }}>Secret Shops</span>
            <span style={{ fontSize: 10, color: GRAY, marginLeft: 'auto' }}>Current Month to Date</span>
          </div>
          <RadialGauge value={stats.avg30} target={87.5} label={stats.avg30.toFixed(0)} sublabel={`${stats.total} assignments`} color={RED} />
          <div className="flex items-center justify-between mt-3 px-2">
            <div className="flex items-center gap-1">
              {stats.trend30 >= 0 ? <TrendingUp size={12} style={{ color: GREEN }} /> : <TrendingDown size={12} style={{ color: '#ef4444' }} />}
              <span style={{ fontSize: 11, fontWeight: 700, color: stats.trend30 >= 0 ? GREEN : '#ef4444' }}>{stats.trend30 >= 0 ? '+' : ''}{stats.trend30}</span>
              <span style={{ fontSize: 10, color: GRAY }}> vs prev</span>
            </div>
            <div className="flex items-center gap-1">
              <span style={{ fontSize: 10, color: GRAY }}>Co Avg:</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: WHITE }}>{CO_AVG}</span>
            </div>
          </div>
          {/* Mini trend line */}
          <div style={{ height: 50, marginTop: 8 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyTrend}>
                <defs>
                  <linearGradient id="storeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={RED} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={RED} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="store" stroke={RED} strokeWidth={2} fill="url(#storeFill)" dot={false} />
                <Area type="monotone" dataKey="company" stroke="rgba(255,255,255,0.15)" strokeWidth={1} strokeDasharray="4 3" fill="none" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* CSAT Survey Card */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Star size={15} style={{ color: AMBER }} />
            <span style={{ fontSize: 13, fontWeight: 800, color: WHITE }}>CSAT Survey (Top Box)</span>
            <span style={{ fontSize: 10, color: GRAY, marginLeft: 'auto' }}>Current Month to Date</span>
          </div>
          <RadialGauge value={78.4} target={70} label="78.4%" sublabel="+2.1% to previous" color={AMBER} />
          <div className="flex items-center justify-between mt-3 px-2">
            <div className="flex items-center gap-1">
              <TrendingUp size={12} style={{ color: GREEN }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: GREEN }}>+2.1%</span>
              <span style={{ fontSize: 10, color: GRAY }}> vs prev</span>
            </div>
            <div className="flex items-center gap-1">
              <span style={{ fontSize: 10, color: GRAY }}>Co Avg:</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: WHITE }}>74.0%</span>
            </div>
          </div>
          {/* Mini trend line */}
          <div style={{ height: 50, marginTop: 8 }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={csatMonthly}>
                <defs>
                  <linearGradient id="csatFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={AMBER} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={AMBER} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="store" stroke={AMBER} strokeWidth={2} fill="url(#csatFill)" dot={false} />
                <Area type="monotone" dataKey="company" stroke="rgba(255,255,255,0.15)" strokeWidth={1} strokeDasharray="4 3" fill="none" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Total Cases by Level Card */}
        <Card className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <MessageCircle size={15} style={{ color: '#6366f1' }} />
            <span style={{ fontSize: 13, fontWeight: 800, color: WHITE }}>Total Cases by Level</span>
            <span style={{ fontSize: 10, color: GRAY, marginLeft: 'auto' }}>Rolling 30 Days</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 140, height: 140 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={casesData} cx="50%" cy="50%" innerRadius={40} outerRadius={60} paddingAngle={3} dataKey="value" stroke="none">
                    {casesData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col gap-1.5">
              {casesData.map((d, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 10, color: GRAY, minWidth: 70 }}>{d.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: WHITE }}>{d.value}</span>
                  <span style={{ fontSize: 9, color: DIM }}>{Math.round(d.value / totalCases * 100)}%</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2 mt-3 px-1">
            <span style={{ fontSize: 10, color: GRAY }}>Total:</span>
            <span style={{ fontSize: 12, fontWeight: 800, color: WHITE }}>{totalCases} cases</span>
            <span style={{ fontSize: 10, color: GREEN, marginLeft: 'auto' }}>42% praise rate</span>
          </div>
        </Card>
      </div>

      {/* ──── AI INSIGHT (what MarketForce can't do) ──── */}
      <Card className="p-4">
        <div className="flex items-start gap-3">
          <div style={{ width: 32, height: 32, borderRadius: 10, background: 'linear-gradient(135deg, rgba(200,16,46,0.15), rgba(200,16,46,0.05))', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <AlertTriangle size={16} style={{ color: RED }} />
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: RED, letterSpacing: 1, marginBottom: 2 }}>AI INSIGHT</div>
            <div style={{ fontSize: 12, color: WHITE, lineHeight: 1.5 }}>
              Store #1289 scores 6.8 points above company average on Secret Shops, but <span style={{ color: AMBER, fontWeight: 700 }}>Dinner shift scores 5.2 points below Lunch</span>.
              The 3 shops below 80 in the last 90 days all occurred during Dinner between 6-8pm. Recommend targeted coaching for the Thursday/Friday dinner crew on greeting protocols and fry timing.
            </div>
            <div style={{ fontSize: 10, color: DIM, marginTop: 4 }}>KnowledgeForce cannot generate this insight.</div>
          </div>
        </div>
      </Card>

      {/* ──── ROW 2: Score Trend — Your Store vs Company (12 months) ──── */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: WHITE }}>Secret Shop Score Trend</div>
            <div style={{ fontSize: 10, color: GRAY }}>Your Store vs Company Average — 12 Month View</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span style={{ width: 12, height: 3, borderRadius: 2, background: RED, display: 'inline-block' }} />
              <span style={{ fontSize: 10, color: GRAY }}>Your Store</span>
            </div>
            <div className="flex items-center gap-1">
              <span style={{ width: 12, height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />
              <span style={{ fontSize: 10, color: GRAY }}>Company Avg</span>
            </div>
          </div>
        </div>
        <div style={{ height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyTrend}>
              <defs>
                <linearGradient id="storeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={RED} stopOpacity={0.15} />
                  <stop offset="100%" stopColor={RED} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: GRAY, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[75, 100]} tick={{ fill: GRAY, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={87.5} stroke="rgba(16,185,129,0.2)" strokeDasharray="6 3" label={{ value: 'Target 87.5', fill: 'rgba(16,185,129,0.3)', fontSize: 9, position: 'right' }} />
              <Area type="monotone" dataKey="company" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} strokeDasharray="6 3" fill="none" name="Company Avg" dot={false} />
              <Area type="monotone" dataKey="store" stroke={RED} strokeWidth={2.5} fill="url(#storeGrad)" name="Your Store" dot={{ r: 3, fill: RED, stroke: '#1e1e22', strokeWidth: 2 }} activeDot={{ r: 5, fill: RED, stroke: '#fff', strokeWidth: 2 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* ──── ROW 3: Interactive Secret Shopper Timeline ──── */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-3">
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: WHITE }}>Secret Shopper Timeline</div>
            <div style={{ fontSize: 10, color: GRAY }}>{stats.total} shops over 12 months — hover to explore</div>
          </div>
          <div className="flex items-center gap-2">
            {['All', 'Lunch', 'Dinner', 'Late Dinner'].map(f => (
              <button key={f} onClick={() => setMealFilter(f)}
                style={{
                  fontSize: 10, fontWeight: mealFilter === f ? 800 : 500, padding: '4px 10px', borderRadius: 8,
                  background: mealFilter === f ? 'rgba(200,16,46,0.15)' : 'rgba(255,255,255,0.03)',
                  color: mealFilter === f ? RED : GRAY, border: `1px solid ${mealFilter === f ? 'rgba(200,16,46,0.3)' : 'rgba(255,255,255,0.06)'}`,
                  cursor: 'pointer'
                }}>
                {f}
              </button>
            ))}
          </div>
        </div>
        <ShopperTimeline filter={mealFilter} />
        {/* Meal Period Breakdown */}
        <div className="grid grid-cols-3 gap-4 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
          {stats.mealStats.map(m => (
            <div key={m.meal} className="text-center">
              <div style={{ fontSize: 10, color: GRAY, letterSpacing: 1, marginBottom: 4 }}>{m.meal.toUpperCase()}</div>
              <div style={{ fontSize: 22, fontWeight: 900, color: WHITE }}>{m.avg}</div>
              <div style={{ fontSize: 10, color: scoreColor(m.avg) }}>{m.pct100}% perfect</div>
              <div style={{ fontSize: 9, color: DIM }}>{m.count} shops</div>
            </div>
          ))}
        </div>
      </Card>

      {/* ──── ROW 4: Category Breakdown (Store vs Company) ──── */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: WHITE }}>Category Scores</div>
            <div style={{ fontSize: 10, color: GRAY }}>Your Store vs Company Average by Evaluation Category</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <span style={{ width: 10, height: 10, borderRadius: 3, background: RED, display: 'inline-block' }} />
              <span style={{ fontSize: 10, color: GRAY }}>Your Store</span>
            </div>
            <div className="flex items-center gap-1">
              <span style={{ width: 10, height: 10, borderRadius: 3, background: 'rgba(255,255,255,0.12)', display: 'inline-block' }} />
              <span style={{ fontSize: 10, color: GRAY }}>Company</span>
            </div>
          </div>
        </div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryScores} layout="vertical" barCategoryGap={8}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" horizontal={false} />
              <XAxis type="number" domain={[60, 100]} tick={{ fill: GRAY, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="category" tick={{ fill: GRAY, fontSize: 11 }} axisLine={false} tickLine={false} width={140} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="company" fill="rgba(255,255,255,0.08)" radius={[0, 4, 4, 0]} barSize={12} name="Company" />
              <Bar dataKey="store" fill={RED} radius={[0, 4, 4, 0]} barSize={12} name="Your Store" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* ──── ROW 5: Recent Shops Table ──── */}
      <Card className="p-5">
        <div style={{ fontSize: 14, fontWeight: 800, color: WHITE, marginBottom: 12 }}>Recent Shop Results</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {['Date', 'Meal Period', 'Score', 'vs Company', 'Status'].map(h => (
                  <th key={h} style={{ fontSize: 10, fontWeight: 700, color: GRAY, textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)', letterSpacing: 1 }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SS_RAW.slice(0, 10).map((r, i) => {
                const diff = r.s - CO_AVG
                return (
                  <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                    <td style={{ fontSize: 12, color: WHITE, padding: '10px 12px' }}>{r.d}</td>
                    <td style={{ fontSize: 12, color: GRAY, padding: '10px 12px' }}>{r.m}</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ fontSize: 14, fontWeight: 900, color: scoreColor(r.s) }}>{r.s}</span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: diff >= 0 ? GREEN : '#ef4444' }}>{diff >= 0 ? '+' : ''}{diff.toFixed(1)}</span>
                    </td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{
                        fontSize: 9, fontWeight: 700, padding: '3px 8px', borderRadius: 6,
                        background: r.s === 100 ? 'rgba(16,185,129,0.12)' : r.s >= 90 ? 'rgba(16,185,129,0.08)' : r.s >= 80 ? 'rgba(245,158,11,0.10)' : 'rgba(239,68,68,0.10)',
                        color: r.s >= 90 ? GREEN : r.s >= 80 ? AMBER : '#ef4444',
                      }}>
                        {r.s === 100 ? 'PERFECT' : r.s >= 90 ? 'STRONG' : r.s >= 80 ? 'FAIR' : 'NEEDS WORK'}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )

  // ─── TRENDING TAB ───────────────────────────────────────────
  return (
    <div className="space-y-5">
      {/* Tab Toggle */}
      <div className="flex justify-center gap-4 mb-2">
        <button onClick={() => setActiveTab('performance')} style={{ fontSize: 13, fontWeight: 600, color: GRAY, paddingBottom: 4, background: 'none', border: 'none', cursor: 'pointer' }}>
          Performance Dashboard
        </button>
        <span style={{ color: DIM }}>|</span>
        <button onClick={() => setActiveTab('trending')} style={{ fontSize: 13, fontWeight: 800, color: RED, borderBottom: `2px solid ${RED}`, paddingBottom: 4, background: 'none', border: 'none', cursor: 'pointer' }}>
          Trending Dashboard
        </button>
      </div>

      {/* Store Label */}
      <div className="flex items-center gap-3">
        <div style={{ width: 8, height: 8, borderRadius: '50%', background: GREEN, boxShadow: `0 0 8px ${GREEN}` }} />
        <span style={{ fontSize: 12, fontWeight: 700, color: WHITE, letterSpacing: 1 }}>STORE #1289 — ALEXANDRIA, VA</span>
        <span style={{ fontSize: 10, color: GRAY, marginLeft: 'auto' }}>12 Month Trend</span>
      </div>

      {/* Secret Shop Trending */}
      <Card className="p-5">
        <div style={{ fontSize: 14, fontWeight: 800, color: WHITE, marginBottom: 4 }}>Secret Shop Score — 12 Month Trend</div>
        <div style={{ fontSize: 10, color: GRAY, marginBottom: 16 }}>Your Store (red) vs Company Average (gray dashed)</div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: GRAY, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[75, 100]} tick={{ fill: GRAY, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={87.5} stroke="rgba(16,185,129,0.2)" strokeDasharray="6 3" />
              <Line type="monotone" dataKey="company" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} strokeDasharray="6 3" dot={false} name="Company Avg" />
              <Line type="monotone" dataKey="store" stroke={RED} strokeWidth={2.5} dot={{ r: 4, fill: RED, stroke: '#1e1e22', strokeWidth: 2 }} activeDot={{ r: 6, fill: RED, stroke: '#fff', strokeWidth: 2 }} name="Your Store" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* CSAT Trending */}
      <Card className="p-5">
        <div style={{ fontSize: 14, fontWeight: 800, color: WHITE, marginBottom: 4 }}>CSAT Survey — 12 Month Trend</div>
        <div style={{ fontSize: 10, color: GRAY, marginBottom: 16 }}>Top Box Score: Your Store vs Company Average</div>
        <div style={{ height: 280 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={csatMonthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="month" tick={{ fill: GRAY, fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis domain={[65, 85]} tick={{ fill: GRAY, fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <ReferenceLine y={70} stroke="rgba(16,185,129,0.2)" strokeDasharray="6 3" label={{ value: 'Target 70%', fill: 'rgba(16,185,129,0.3)', fontSize: 9, position: 'right' }} />
              <Line type="monotone" dataKey="company" stroke="rgba(255,255,255,0.2)" strokeWidth={1.5} strokeDasharray="6 3" dot={false} name="Company Avg" />
              <Line type="monotone" dataKey="store" stroke={AMBER} strokeWidth={2.5} dot={{ r: 4, fill: AMBER, stroke: '#1e1e22', strokeWidth: 2 }} activeDot={{ r: 6, fill: AMBER, stroke: '#fff', strokeWidth: 2 }} name="Your Store" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Category Trend Comparison */}
      <Card className="p-5">
        <div style={{ fontSize: 14, fontWeight: 800, color: WHITE, marginBottom: 16 }}>Category Performance — Store vs Company</div>
        <div className="space-y-3">
          {categoryScores.map((cat, i) => {
            const diff = cat.store - cat.company
            return (
              <div key={i}>
                <div className="flex items-center justify-between mb-1">
                  <span style={{ fontSize: 11, color: WHITE, fontWeight: 600 }}>{cat.category}</span>
                  <div className="flex items-center gap-3">
                    <span style={{ fontSize: 11, fontWeight: 800, color: scoreColor(cat.store) }}>{cat.store}</span>
                    <span style={{ fontSize: 10, color: diff >= 0 ? GREEN : '#ef4444', fontWeight: 700 }}>{diff >= 0 ? '+' : ''}{diff}</span>
                  </div>
                </div>
                <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.04)', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${cat.company}%`, background: 'rgba(255,255,255,0.06)', borderRadius: 3 }} />
                  <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${cat.store}%`, background: `linear-gradient(90deg, ${RED}, rgba(200,16,46,0.5))`, borderRadius: 3 }} />
                </div>
              </div>
            )
          })}
        </div>
      </Card>
    </div>
  )
}
