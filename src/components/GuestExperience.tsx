import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell } from 'recharts'
import { Heart, Star, MessageCircle, Users, TrendingUp, TrendingDown, Minus, Shield } from 'lucide-react'
import { guestExperience, customerSegments } from '../data/mockData'

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg ${className}`} style={{ background: '#1e1e22', border: '1px solid #2a2a2e' }}>{children}</div>
}

function StatCard({ label, value, subtext, color }: { label: string; value: string; subtext: string; color: string }) {
  return (
    <div className="text-center">
      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#7a7a80' }}>{label}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-[10px] mt-0.5" style={{ color: '#7a7a80' }}>{subtext}</div>
    </div>
  )
}

export function GuestExperience({ compact = false }: { compact?: boolean }) {
  const d = guestExperience
  const [sentimentView, setSentimentView] = useState<'themes' | 'loyalty'>('themes')

  const npsData = d.nps.trend.map((v, i) => ({
    month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
    nps: v,
    industry: d.nps.industry,
  }))

  const sentimentPie = [
    { name: 'Positive', value: d.sentimentBreakdown.positive, color: '#10b981' },
    { name: 'Neutral', value: d.sentimentBreakdown.neutral, color: '#94a3b8' },
    { name: 'Negative', value: d.sentimentBreakdown.negative, color: '#ef4444' },
  ]

  const mysteryShopData = Object.entries(d.mysteryShopScores)
    .filter(([k]) => k !== 'overall')
    .map(([k, v]) => ({
      subject: k.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
      score: v,
      fullMark: 100,
    }))

  if (compact) {
    return (
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Heart size={15} className="text-rose-500" />
          <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Guest Experience</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold ml-auto" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>AI-Enhanced CX</span>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <StatCard label="NPS" value={d.nps.current.toString()} subtext={`Industry: ${d.nps.industry}`} color="text-emerald-600" />
          <StatCard label="CSAT" value={`${d.csat.current}/${d.csat.scale}`} subtext={`Industry: ${d.csat.industry}`} color="text-blue-600" />
          <StatCard label="Sentiment" value={`${d.sentimentBreakdown.positive}%`} subtext="Positive mentions" color="text-amber-600" />
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>NPS Score</div>
          <div className="text-3xl font-bold text-emerald-600 mt-1">{d.nps.current}</div>
          <div className="flex items-center gap-1 mt-1 text-emerald-500 text-xs font-semibold">
            <TrendingUp size={12} /> +{d.nps.current - d.nps.prior} vs prior
          </div>
          <div className="text-[10px] mt-0.5" style={{ color: '#7a7a80' }}>Industry: {d.nps.industry}</div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>CSAT</div>
          <div className="text-3xl font-bold text-blue-600 mt-1">{d.csat.current}<span className="text-lg" style={{ color: '#7a7a80' }}>/{d.csat.scale}</span></div>
          <div className="flex items-center gap-1 mt-1 text-emerald-500 text-xs font-semibold">
            <TrendingUp size={12} /> +{(d.csat.current - d.csat.prior).toFixed(1)} vs prior
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>Online Ratings</div>
          <div className="flex items-center gap-1 mt-2">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-xl font-bold" style={{ color: '#f0f0f5' }}>{d.onlineRating.google}</span>
            <span className="text-[10px] ml-1" style={{ color: '#7a7a80' }}>Google</span>
          </div>
          <div className="text-[10px] mt-1" style={{ color: '#7a7a80' }}>Yelp: {d.onlineRating.yelp} | TA: {d.onlineRating.tripadvisor}</div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>Loyalty Members</div>
          <div className="text-2xl font-bold mt-1" style={{ color: '#f0f0f5' }}>{(d.loyaltyMetrics.activeMembers / 1000).toFixed(1)}K</div>
          <div className="text-[10px] mt-1" style={{ color: '#7a7a80' }}>Enrollment: {d.loyaltyMetrics.enrollmentRate}% | Spend lift: +{d.loyaltyMetrics.memberSpendLift}%</div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>Mystery Shop</div>
          <div className="text-3xl font-bold mt-1" style={{ color: '#f0f0f5' }}>{d.mysteryShopScores.overall}<span className="text-lg" style={{ color: '#7a7a80' }}>/100</span></div>
          <div className="text-[10px] mt-1" style={{ color: '#7a7a80' }}>Upselling lowest at {d.mysteryShopScores.upselling}%</div>
        </Card>
      </div>

      {/* NPS Trend + Sentiment */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-1" style={{ color: '#f0f0f5' }}>NPS Trend (12-Month)</h3>
          <p className="text-[11px] mb-4" style={{ color: '#7a7a80' }}>AI predicts NPS 45 by Q2 if current trajectory holds</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={npsData} margin={{ left: 0, right: 10, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#232326" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#7a7a80' }} />
              <YAxis domain={[25, 50]} tick={{ fontSize: 10, fill: '#7a7a80' }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, background: '#2a2a2e', borderColor: '#2a2a2e', color: '#f0f0f5' }} />
              <Line type="monotone" dataKey="nps" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="NPS" />
              <Line type="monotone" dataKey="industry" stroke="#7a7a80" strokeDasharray="4 4" strokeWidth={1.5} dot={false} name="Industry Avg" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#f0f0f5' }}>AI Sentiment Analysis</h3>
          <div className="flex justify-center gap-6 mb-4">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={sentimentPie} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" strokeWidth={2} stroke="#1e1e22">
                  {sentimentPie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center gap-2">
              {sentimentPie.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs" style={{ color: '#a0a0a4' }}>{s.name}: <strong>{s.value}%</strong></span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-center" style={{ color: '#7a7a80' }}>Analyzed 3,270 reviews + 8,420 social mentions via NLP</p>
        </Card>
      </div>

      {/* Theme Analysis + Mystery Shop */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Themes */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Top Themes from AI Text Analysis</h3>
            <MessageCircle size={14} style={{ color: '#7a7a80' }} />
          </div>
          <div className="space-y-2.5">
            {d.topThemes.map((theme) => (
              <div key={theme.theme}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium" style={{ color: '#a0a0a4' }}>{theme.theme}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px]" style={{ color: '#7a7a80' }}>{theme.mentions} mentions</span>
                    {theme.trend === 'up' ? <TrendingUp size={11} className="text-emerald-500" /> :
                     theme.trend === 'down' ? <TrendingDown size={11} className="text-red-500" /> :
                     <Minus size={11} style={{ color: '#7a7a80' }} />}
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: '#232326' }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${theme.sentiment}%`,
                      background: theme.sentiment >= 70 ? '#10b981' : theme.sentiment >= 50 ? '#f59e0b' : '#ef4444',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 p-2.5 rounded-md border" style={{ background: 'rgba(245, 158, 11, 0.08)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
            <p className="text-[11px] font-medium" style={{ color: '#f59e0b' }}>AI Alert: "Wait Times" sentiment dropped 12pts — correlates with Store #106 staffing gap</p>
          </div>
        </Card>

        {/* Mystery Shop Radar */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Mystery Shop Scorecard</h3>
            <Shield size={14} style={{ color: '#7a7a80' }} />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={mysteryShopData}>
              <PolarGrid stroke="#232326" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#a0a0a4' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#7a7a80' }} />
              <Radar dataKey="score" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="text-center text-[10px] mt-1" style={{ color: '#7a7a80' }}>
            Biggest opportunity: <strong className="text-amber-600">Upselling (62%)</strong> — AI recommends suggestive selling training focus
          </div>
        </Card>
      </div>

      {/* ═══ AI INSIGHTS: CSAT Scores & Secret Shopper Deep-Dive ═══ */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-base">🔍</span>
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>AI Insights — CSAT Scores & Secret Shopper Intelligence</h3>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(200,16,46,0.15)', color: '#C8102E' }}>KnowledgeForce Can't Do This</span>
        </div>

        {/* CSAT Score Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          <div className="p-3 rounded-lg" style={{ background: '#232326' }}>
            <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: '#7a7a80' }}>CSAT Score Decomposition — AI Pattern Analysis</div>
            <div className="space-y-2">
              {[
                { category: 'Food Quality & Freshness', score: 4.6, trend: '+0.3', color: '#10b981', pct: 92 },
                { category: 'Order Accuracy', score: 4.4, trend: '+0.1', color: '#10b981', pct: 88 },
                { category: 'Speed of Service', score: 3.8, trend: '-0.2', color: '#ef4444', pct: 76 },
                { category: 'Cleanliness', score: 4.2, trend: '+0.2', color: '#10b981', pct: 84 },
                { category: 'Staff Friendliness', score: 4.5, trend: '+0.4', color: '#10b981', pct: 90 },
                { category: 'Value for Money', score: 3.6, trend: '-0.1', color: '#f59e0b', pct: 72 },
              ].map((c) => (
                <div key={c.category}>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[11px]" style={{ color: '#a0a0a4' }}>{c.category}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold" style={{ color: '#f0f0f5' }}>{c.score}/5</span>
                      <span className="text-[10px] font-semibold" style={{ color: c.color }}>{c.trend}</span>
                    </div>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: '#1e1e22' }}>
                    <div className="h-full rounded-full" style={{ width: `${c.pct}%`, background: c.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 rounded-lg" style={{ background: '#232326' }}>
            <div className="text-[10px] uppercase tracking-wider mb-2" style={{ color: '#7a7a80' }}>Secret Shopper Report Highlights — Last 90 Days</div>
            <div className="space-y-2">
              {[
                { finding: 'Greeting within 10 seconds', score: '94%', status: 'pass', detail: '↑ 8pts after Q1 training push' },
                { finding: 'Fry cook called order back', score: '88%', status: 'pass', detail: 'Consistent across all shifts' },
                { finding: 'Suggestive upsell attempted', score: '42%', status: 'fail', detail: '↓ 15pts — dinner shift weakest' },
                { finding: 'Condiment bar fully stocked', score: '71%', status: 'warn', detail: 'Fails correlate with rush hours' },
                { finding: 'Cashier eye contact & smile', score: '82%', status: 'pass', detail: 'Morning crew scores 96%' },
                { finding: 'Order delivered under 8 min', score: '61%', status: 'fail', detail: '↓ during 11:30–1pm window' },
              ].map((f) => (
                <div key={f.finding} className="flex items-center gap-2 p-1.5 rounded" style={{ background: f.status === 'fail' ? 'rgba(239,68,68,0.06)' : f.status === 'warn' ? 'rgba(245,158,11,0.06)' : 'transparent' }}>
                  <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: f.status === 'pass' ? '#10b981' : f.status === 'warn' ? '#f59e0b' : '#ef4444' }} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-medium truncate" style={{ color: '#f0f0f5' }}>{f.finding}</span>
                      <span className="text-[11px] font-bold ml-2 flex-shrink-0" style={{ color: f.status === 'pass' ? '#10b981' : f.status === 'warn' ? '#f59e0b' : '#ef4444' }}>{f.score}</span>
                    </div>
                    <div className="text-[9px]" style={{ color: '#7a7a80' }}>{f.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Cross-Analysis Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="p-3 rounded-md border" style={{ background: 'rgba(239,68,68,0.06)', borderColor: 'rgba(239,68,68,0.2)' }}>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(239,68,68,0.2)', color: '#ef4444' }}>P0</span>
              <span className="text-[10px] font-semibold" style={{ color: '#ef4444' }}>Speed × CSAT Correlation</span>
            </div>
            <p className="text-[11px]" style={{ color: '#a0a0a4' }}>Secret shoppers report 61% order-under-8min compliance during lunch. CSAT "Speed of Service" dropped to 3.8/5. AI projects fixing lunch staffing adds +0.4 to overall CSAT within 6 weeks.</p>
            <p className="text-[10px] font-semibold mt-1" style={{ color: '#10b981' }}>+$12,400/mo revenue impact</p>
          </div>
          <div className="p-3 rounded-md border" style={{ background: 'rgba(245,158,11,0.06)', borderColor: 'rgba(245,158,11,0.2)' }}>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(245,158,11,0.2)', color: '#f59e0b' }}>P1</span>
              <span className="text-[10px] font-semibold" style={{ color: '#f59e0b' }}>Upsell Gap = Revenue Loss</span>
            </div>
            <p className="text-[11px]" style={{ color: '#a0a0a4' }}>Only 42% of secret shoppers received an upsell attempt. CSAT "Value" is lowest at 3.6/5 — but stores with high upsell scores see +18% higher value perception. Training upsell to 80% = $290K annually.</p>
            <p className="text-[10px] font-semibold mt-1" style={{ color: '#10b981' }}>+$290K/yr opportunity</p>
          </div>
          <div className="p-3 rounded-md border" style={{ background: 'rgba(59,130,246,0.06)', borderColor: 'rgba(59,130,246,0.2)' }}>
            <div className="flex items-center gap-1 mb-1">
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'rgba(59,130,246,0.2)', color: '#3b82f6' }}>AI</span>
              <span className="text-[10px] font-semibold" style={{ color: '#3b82f6' }}>Leading Indicator Discovery</span>
            </div>
            <p className="text-[11px]" style={{ color: '#a0a0a4' }}>Secret shopper "greeting" scores predict CSAT movement 3–4 weeks ahead. Stores where greeting dropped below 80% saw CSAT fall an average of 0.5 pts within one month. Currently at 94% — holding strong.</p>
            <p className="text-[10px] font-semibold mt-1" style={{ color: '#10b981' }}>Early warning system active</p>
          </div>
        </div>
      </Card>

      {/* Loyalty deep-dive */}
      <Card className="p-4">
        <h3 className="text-sm font-semibold mb-3" style={{ color: '#f0f0f5' }}>Loyalty Program Intelligence</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Active Members', value: `${(d.loyaltyMetrics.activeMembers / 1000).toFixed(1)}K`, color: 'text-blue-600' },
            { label: 'Enrollment Rate', value: `${d.loyaltyMetrics.enrollmentRate}%`, color: 'text-emerald-600' },
            { label: 'Redemption Rate', value: `${d.loyaltyMetrics.redemptionRate}%`, color: 'text-amber-600' },
            { label: 'Avg Visits/Member', value: `${d.loyaltyMetrics.avgVisitsPerMember}`, color: 'text-purple-600' },
            { label: 'Member Spend Lift', value: `+${d.loyaltyMetrics.memberSpendLift}%`, color: 'text-emerald-600' },
            { label: 'Churn Risk', value: `${d.loyaltyMetrics.churnRisk}%`, color: 'text-red-500' },
          ].map((m) => (
            <div key={m.label} className="text-center">
              <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>{m.label}</div>
              <div className={`text-xl font-bold mt-1 ${m.color}`}>{m.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-md border" style={{ background: 'rgba(59, 130, 246, 0.08)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
          <p className="text-[11px] font-medium" style={{ color: '#3b82f6' }}>AI Recommendation: {d.loyaltyMetrics.churnRisk}% of members are at churn risk. Deploying personalized win-back offers to top 500 at-risk members could retain $340K in annual revenue.</p>
        </div>
      </Card>

      {/* Customer Segmentation */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Customer Segmentation — AI Cohort Analysis</h3>
            <p className="text-[11px]" style={{ color: '#7a7a80' }}>Lifetime value and retention by customer tier</p>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>AI-Enhanced CX</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr style={{ background: '#262628', color: '#7a7a80' }}>
                <th className="px-4 py-2 text-left font-medium">Segment</th>
                <th className="px-4 py-2 text-right font-medium">% of Base</th>
                <th className="px-4 py-2 text-right font-medium">Visits/Yr</th>
                <th className="px-4 py-2 text-right font-medium">Avg Check</th>
                <th className="px-4 py-2 text-right font-medium">LTV</th>
                <th className="px-4 py-2 text-right font-medium">Retention</th>
                <th className="px-4 py-2 text-right font-medium">Growth</th>
              </tr>
            </thead>
            <tbody>
              {customerSegments.segments.map((seg) => (
                <tr key={seg.name} style={{ borderTop: '1px solid #262628' }}>
                  <td className="px-4 py-2.5 font-medium" style={{ color: '#f0f0f5' }}>{seg.name}</td>
                  <td className="px-4 py-2.5 text-right" style={{ color: '#a0a0a4' }}>{seg.pct}%</td>
                  <td className="px-4 py-2.5 text-right font-mono" style={{ color: '#f0f0f5' }}>{seg.visits}</td>
                  <td className="px-4 py-2.5 text-right font-mono" style={{ color: '#f0f0f5' }}>${seg.avgCheck.toFixed(2)}</td>
                  <td className="px-4 py-2.5 text-right font-mono font-semibold" style={{ color: seg.ltv > 1000 ? '#10b981' : '#a0a0a4' }}>${seg.ltv.toLocaleString()}</td>
                  <td className="px-4 py-2.5 text-right">
                    <span style={{ color: seg.retention >= 80 ? '#10b981' : seg.retention < 40 ? '#ef4444' : '#f59e0b' }}>{seg.retention}%</span>
                  </td>
                  <td className="px-4 py-2.5 text-right">
                    <span style={{ color: seg.growth >= 0 ? '#10b981' : '#ef4444', fontWeight: 600 }}>
                      {seg.growth > 0 ? '+' : ''}{seg.growth}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Conversion Funnel & Reactivation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#f0f0f5' }}>Loyalty Conversion Funnel</h3>
          <div className="space-y-3">
            {customerSegments.conversionFunnel.map((step, i) => (
              <div key={step.stage}>
                <div className="flex justify-between items-baseline mb-1">
                  <span className="text-xs font-medium" style={{ color: '#a0a0a4' }}>{step.stage}</span>
                  <span className="text-sm font-bold" style={{ color: '#f0f0f5' }}>{step.rate}%</span>
                </div>
                <div className="h-3 rounded-full overflow-hidden" style={{ background: '#232326' }}>
                  <div className="h-full rounded-full" style={{ width: `${step.rate}%`, background: i === 0 ? '#3b82f6' : i === 1 ? '#8b5cf6' : '#f59e0b' }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 rounded-md border" style={{ background: 'rgba(139, 92, 246, 0.08)', borderColor: 'rgba(139, 92, 246, 0.2)' }}>
            <p className="text-[11px]" style={{ color: '#8b5cf6' }}>AI: Improving Repeat→Loyal rate by 5pts would add ~$420K annual revenue from increased visit frequency.</p>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-4" style={{ color: '#f0f0f5' }}>Lapsed Guest Reactivation</h3>
          <div className="space-y-4">
            <div className="text-center p-4 rounded-lg" style={{ background: '#232326' }}>
              <div className="text-3xl font-bold" style={{ color: '#f59e0b' }}>{customerSegments.reactivationOpportunity.lapsedCount.toLocaleString()}</div>
              <div className="text-[11px] mt-1" style={{ color: '#7a7a80' }}>Lapsed guests identified by AI</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-lg" style={{ background: '#232326' }}>
                <div className="text-lg font-bold" style={{ color: '#10b981' }}>${(customerSegments.reactivationOpportunity.estimatedRevenue / 1000).toFixed(0)}K</div>
                <div className="text-[10px]" style={{ color: '#7a7a80' }}>Revenue opportunity</div>
              </div>
              <div className="text-center p-3 rounded-lg" style={{ background: '#232326' }}>
                <div className="text-lg font-bold" style={{ color: '#3b82f6' }}>{customerSegments.reactivationOpportunity.winBackRate}%</div>
                <div className="text-[10px]" style={{ color: '#7a7a80' }}>Predicted win-back rate</div>
              </div>
            </div>
            <div className="p-3 rounded-md border" style={{ background: 'rgba(245, 158, 11, 0.08)', borderColor: 'rgba(245, 158, 11, 0.2)' }}>
              <p className="text-[11px]" style={{ color: '#f59e0b' }}>AI: Personalized "We miss you" campaign to top 5,000 lapsed guests predicted to generate $156K in 90 days at $2.40 cost-per-reactivation.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
