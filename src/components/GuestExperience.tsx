import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, PieChart, Pie, Cell } from 'recharts'
import { Heart, Star, MessageCircle, Users, TrendingUp, TrendingDown, Minus, Shield } from 'lucide-react'
import { guestExperience } from '../data/mockData'

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg ${className}`} style={{ background: '#222230', border: '1px solid #333346' }}>{children}</div>
}

function StatCard({ label, value, subtext, color }: { label: string; value: string; subtext: string; color: string }) {
  return (
    <div className="text-center">
      <div className="text-[10px] uppercase tracking-wider mb-1" style={{ color: '#6b6b82' }}>{label}</div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="text-[10px] mt-0.5" style={{ color: '#6b6b82' }}>{subtext}</div>
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
          <div className="text-[10px] uppercase tracking-wider" style={{ color: '#6b6b82' }}>NPS Score</div>
          <div className="text-3xl font-bold text-emerald-600 mt-1">{d.nps.current}</div>
          <div className="flex items-center gap-1 mt-1 text-emerald-500 text-xs font-semibold">
            <TrendingUp size={12} /> +{d.nps.current - d.nps.prior} vs prior
          </div>
          <div className="text-[10px] mt-0.5" style={{ color: '#6b6b82' }}>Industry: {d.nps.industry}</div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: '#6b6b82' }}>CSAT</div>
          <div className="text-3xl font-bold text-blue-600 mt-1">{d.csat.current}<span className="text-lg" style={{ color: '#6b6b82' }}>/{d.csat.scale}</span></div>
          <div className="flex items-center gap-1 mt-1 text-emerald-500 text-xs font-semibold">
            <TrendingUp size={12} /> +{(d.csat.current - d.csat.prior).toFixed(1)} vs prior
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: '#6b6b82' }}>Online Ratings</div>
          <div className="flex items-center gap-1 mt-2">
            <Star size={14} className="text-amber-400 fill-amber-400" />
            <span className="text-xl font-bold" style={{ color: '#f0f0f5' }}>{d.onlineRating.google}</span>
            <span className="text-[10px] ml-1" style={{ color: '#6b6b82' }}>Google</span>
          </div>
          <div className="text-[10px] mt-1" style={{ color: '#6b6b82' }}>Yelp: {d.onlineRating.yelp} | TA: {d.onlineRating.tripadvisor}</div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: '#6b6b82' }}>Loyalty Members</div>
          <div className="text-2xl font-bold mt-1" style={{ color: '#f0f0f5' }}>{(d.loyaltyMetrics.activeMembers / 1000).toFixed(1)}K</div>
          <div className="text-[10px] mt-1" style={{ color: '#6b6b82' }}>Enrollment: {d.loyaltyMetrics.enrollmentRate}% | Spend lift: +{d.loyaltyMetrics.memberSpendLift}%</div>
        </Card>
        <Card className="p-4">
          <div className="text-[10px] uppercase tracking-wider" style={{ color: '#6b6b82' }}>Mystery Shop</div>
          <div className="text-3xl font-bold mt-1" style={{ color: '#f0f0f5' }}>{d.mysteryShopScores.overall}<span className="text-lg" style={{ color: '#6b6b82' }}>/100</span></div>
          <div className="text-[10px] mt-1" style={{ color: '#6b6b82' }}>Upselling lowest at {d.mysteryShopScores.upselling}%</div>
        </Card>
      </div>

      {/* NPS Trend + Sentiment */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-1" style={{ color: '#f0f0f5' }}>NPS Trend (12-Month)</h3>
          <p className="text-[11px] mb-4" style={{ color: '#6b6b82' }}>AI predicts NPS 45 by Q2 if current trajectory holds</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={npsData} margin={{ left: 0, right: 10, top: 5, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3c" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#6b6b82' }} />
              <YAxis domain={[25, 50]} tick={{ fontSize: 10, fill: '#6b6b82' }} />
              <Tooltip contentStyle={{ fontSize: 12, borderRadius: 6, background: '#2d2d3f', borderColor: '#333346', color: '#f0f0f5' }} />
              <Line type="monotone" dataKey="nps" stroke="#10b981" strokeWidth={2} dot={{ r: 3 }} name="NPS" />
              <Line type="monotone" dataKey="industry" stroke="#6b6b82" strokeDasharray="4 4" strokeWidth={1.5} dot={false} name="Industry Avg" />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-semibold mb-3" style={{ color: '#f0f0f5' }}>AI Sentiment Analysis</h3>
          <div className="flex justify-center gap-6 mb-4">
            <ResponsiveContainer width={160} height={160}>
              <PieChart>
                <Pie data={sentimentPie} cx="50%" cy="50%" innerRadius={45} outerRadius={65} dataKey="value" strokeWidth={2} stroke="#222230">
                  {sentimentPie.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-col justify-center gap-2">
              {sentimentPie.map((s) => (
                <div key={s.name} className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ background: s.color }} />
                  <span className="text-xs" style={{ color: '#a0a0b8' }}>{s.name}: <strong>{s.value}%</strong></span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-[11px] text-center" style={{ color: '#6b6b82' }}>Analyzed 3,270 reviews + 8,420 social mentions via NLP</p>
        </Card>
      </div>

      {/* Theme Analysis + Mystery Shop */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Themes */}
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>Top Themes from AI Text Analysis</h3>
            <MessageCircle size={14} style={{ color: '#6b6b82' }} />
          </div>
          <div className="space-y-2.5">
            {d.topThemes.map((theme) => (
              <div key={theme.theme}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium" style={{ color: '#a0a0b8' }}>{theme.theme}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px]" style={{ color: '#6b6b82' }}>{theme.mentions} mentions</span>
                    {theme.trend === 'up' ? <TrendingUp size={11} className="text-emerald-500" /> :
                     theme.trend === 'down' ? <TrendingDown size={11} className="text-red-500" /> :
                     <Minus size={11} style={{ color: '#6b6b82' }} />}
                  </div>
                </div>
                <div className="h-2 rounded-full overflow-hidden" style={{ background: '#2a2a3c' }}>
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
            <Shield size={14} style={{ color: '#6b6b82' }} />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={mysteryShopData}>
              <PolarGrid stroke="#2a2a3c" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#a0a0b8' }} />
              <PolarRadiusAxis domain={[0, 100]} tick={{ fontSize: 9, fill: '#6b6b82' }} />
              <Radar dataKey="score" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
          <div className="text-center text-[10px] mt-1" style={{ color: '#6b6b82' }}>
            Biggest opportunity: <strong className="text-amber-600">Upselling (62%)</strong> — AI recommends suggestive selling training focus
          </div>
        </Card>
      </div>

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
              <div className="text-[10px] uppercase tracking-wider" style={{ color: '#6b6b82' }}>{m.label}</div>
              <div className={`text-xl font-bold mt-1 ${m.color}`}>{m.value}</div>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 rounded-md border" style={{ background: 'rgba(59, 130, 246, 0.08)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
          <p className="text-[11px] font-medium" style={{ color: '#3b82f6' }}>AI Recommendation: {d.loyaltyMetrics.churnRisk}% of members are at churn risk. Deploying personalized win-back offers to top 500 at-risk members could retain $340K in annual revenue.</p>
        </div>
      </Card>
    </div>
  )
}
