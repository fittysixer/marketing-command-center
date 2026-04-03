import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { MapPin, TrendingUp, Award, Users, Globe, Heart, AlertCircle, Radio, Target, Building2, DollarSign, Zap, ChevronRight } from 'lucide-react'
import { localMarketingStores, storeLocalDashboard } from '../data/mockData'

function Card({ children, className = '', style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return <div className={`rounded-lg transition-colors hover:brightness-110 ${className}`} style={{ background: '#1e1e22', border: '1px solid #2a2a2e', ...style }}>{children}</div>
}

function StatBadge({ label, value, suffix = '', icon }: { label: string; value: string | number; suffix?: string; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      {icon && <span style={{ color: '#a0a0a4' }}>{icon}</span>}
      <div>
        <div className="text-[10px] uppercase tracking-wider" style={{ color: '#7a7a80' }}>{label}</div>
        <div className="text-sm font-bold" style={{ color: '#f0f0f5' }}>{value}{suffix}</div>
      </div>
    </div>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const colors: Record<string, { bg: string; text: string; border: string }> = {
    'P0': { bg: '#232326', text: '#ef4444', border: '#ef4444' },
    'P1': { bg: '#232326', text: '#f59e0b', border: '#f59e0b' },
    'P2': { bg: '#232326', text: '#3b82f6', border: '#3b82f6' },
  }
  const c = colors[priority] || colors['P2']
  return (
    <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
      {priority}
    </span>
  )
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    'Active': '#10b981',
    'Scheduled': '#f59e0b',
    'Paused': '#6b7280',
    'Completed': '#3b82f6',
  }
  const color = colors[status] || '#a0a0a4'
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${color}20`, color }}>
      {status}
    </span>
  )
}

function ThreatBadge({ threat }: { threat: string }) {
  const colors: Record<string, string> = {
    'High': '#ef4444',
    'Medium': '#f59e0b',
    'Low': '#10b981',
  }
  const color = colors[threat] || '#a0a0a4'
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full" style={{ background: `${color}20`, color }}>
      {threat}
    </span>
  )
}

function MerchandisingGauge({ score }: { score: number }) {
  const getColor = (s: number) => {
    if (s >= 85) return '#10b981'
    if (s >= 70) return '#f59e0b'
    return '#ef4444'
  }
  const color = getColor(score)
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-baseline">
        <span className="text-xs font-medium" style={{ color: '#a0a0a4' }}>Overall Score</span>
        <span className="text-2xl font-bold" style={{ color }}>{score}</span>
      </div>
      <div className="relative h-2 rounded-full overflow-hidden" style={{ background: '#232326' }}>
        <div className="h-full rounded-full transition-all" style={{ width: `${score}%`, background: color }} />
      </div>
      <div className="text-[10px]" style={{ color: '#7a7a80' }}>Last audit: {storeLocalDashboard.merchandising.lastAudit}</div>
    </div>
  )
}

export function LocalMarketing({ compact = false }: { compact?: boolean }) {
  const [selectedStoreId, setSelectedStoreId] = useState(localMarketingStores[0].id)
  const selectedStore = localMarketingStores.find(s => s.id === selectedStoreId) || localMarketingStores[0]
  const d = storeLocalDashboard

  // Calculate metrics
  const totalBudget = d.activeCampaigns.reduce((sum, c) => sum + c.budget, 0)
  const totalSpent = d.activeCampaigns.reduce((sum, c) => sum + c.spent, 0)
  const avgRoi = (d.activeCampaigns.reduce((sum, c) => sum + c.roi, 0) / d.activeCampaigns.length).toFixed(1)
  const activeCampaignsCount = d.activeCampaigns.filter(c => c.status === 'Active').length

  const roiChartData = d.monthlyTrends.map(m => ({
    month: m.month,
    spend: m.localSpend,
    revenue: m.attributedRevenue,
  }))

  if (compact) {
    return (
      <div className="space-y-4">
        {/* Store Selector */}
        <Card className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <MapPin size={14} style={{ color: '#c8102e' }} />
            <span className="text-xs font-semibold uppercase" style={{ color: '#7a7a80' }}>Store</span>
          </div>
          <select
            value={selectedStoreId}
            onChange={(e) => setSelectedStoreId(Number(e.target.value))}
            className="w-full px-2 py-1.5 text-sm rounded"
            style={{ background: '#232326', color: '#f0f0f5', border: '1px solid #2a2a2e' }}
          >
            {localMarketingStores.map(s => (
              <option key={s.id} value={s.id}>{s.name} — {s.city}</option>
            ))}
          </select>
          <div className="mt-2 text-xs" style={{ color: '#a0a0a4' }}>
            <div>GM: {d.gm}</div>
            <div>DM: {selectedStore.dm}</div>
          </div>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-2">
          <Card className="p-3">
            <div className="text-xs uppercase font-semibold tracking-wider" style={{ color: '#7a7a80' }}>Google Rating</div>
            <div className="text-lg font-bold mt-1" style={{ color: '#f0f0f5' }}>{d.localSEO.googleRating}</div>
            <div className="text-[10px] mt-0.5" style={{ color: '#a0a0a4' }}>{d.localSEO.googleReviews.toLocaleString()} reviews</div>
          </Card>
          <Card className="p-3">
            <div className="text-xs uppercase font-semibold tracking-wider" style={{ color: '#7a7a80' }}>Geo-Fences</div>
            <div className="text-lg font-bold mt-1" style={{ color: '#f0f0f5' }}>{d.geoTargeting.activeFences}</div>
            <div className="text-[10px] mt-0.5" style={{ color: '#a0a0a4' }}>Active targets</div>
          </Card>
        </div>

        {/* Campaign Summary */}
        <Card className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Radio size={14} style={{ color: '#f59e0b' }} />
            <span className="text-xs font-semibold uppercase" style={{ color: '#7a7a80' }}>Campaigns</span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div>
              <div style={{ color: '#7a7a80' }}>Budget</div>
              <div className="font-bold" style={{ color: '#f0f0f5' }}>${(totalBudget / 1000).toFixed(1)}k</div>
            </div>
            <div>
              <div style={{ color: '#7a7a80' }}>Active</div>
              <div className="font-bold" style={{ color: '#f0f0f5' }}>{activeCampaignsCount}</div>
            </div>
            <div>
              <div style={{ color: '#7a7a80' }}>Avg ROI</div>
              <div className="font-bold text-emerald-500">{avgRoi}x</div>
            </div>
          </div>
        </Card>

        {/* Top Recommendations */}
        <div className="space-y-2">
          {d.aiRecommendations.slice(0, 2).map((rec, i) => (
            <Card key={i} className="p-3" style={{ borderLeft: '3px solid', borderLeftColor: rec.priority === 'P0' ? '#ef4444' : rec.priority === 'P1' ? '#f59e0b' : '#3b82f6' }}>
              <div className="flex items-start gap-2">
                <PriorityBadge priority={rec.priority} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold" style={{ color: '#f0f0f5' }}>{rec.insight}</p>
                  <p className="text-[10px] mt-1 line-clamp-1" style={{ color: '#7a7a80' }}>{rec.estImpact}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Partnerships */}
        <Card className="p-3">
          <div className="flex items-center gap-2 mb-2">
            <Heart size={14} style={{ color: '#10b981' }} />
            <span className="text-xs font-semibold uppercase" style={{ color: '#7a7a80' }}>Partnerships</span>
          </div>
          <div className="text-sm font-bold" style={{ color: '#f0f0f5' }}>{d.partnerships.length} Active</div>
          <div className="text-[10px] mt-1" style={{ color: '#a0a0a4' }}>{d.partnerships.reduce((sum, p) => sum + p.investment, 0).toLocaleString()} invested</div>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Top Bar: Store Selector */}
      <Card className="p-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-1">
            <MapPin size={16} style={{ color: '#c8102e' }} />
            <select
              value={selectedStoreId}
              onChange={(e) => setSelectedStoreId(Number(e.target.value))}
              className="px-2 py-1.5 text-sm rounded font-semibold"
              style={{ background: '#232326', color: '#f0f0f5', border: '1px solid #2a2a2e' }}
            >
              {localMarketingStores.map(s => (
                <option key={s.id} value={s.id}>{s.name} — {s.city}</option>
              ))}
            </select>
            <div className="flex items-center gap-2 text-xs" style={{ color: '#a0a0a4' }}>
              <span>{d.city}</span>
              <span>•</span>
              <span>GM: {d.gm}</span>
              <span>•</span>
              <span>DM: {selectedStore.dm}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatBadge label="Google Rating" value={d.localSEO.googleRating} icon={<Award size={14} />} />
            <span style={{ color: '#2a2a2e' }}>|</span>
            <StatBadge label="Active Campaigns" value={activeCampaignsCount} icon={<Radio size={14} />} />
          </div>
        </div>
      </Card>

      {/* Section 1: AI Recommendations */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Zap size={16} style={{ color: '#f59e0b' }} />
          <h2 className="text-sm font-bold" style={{ color: '#f0f0f5' }}>AI Recommendations</h2>
          <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold ml-auto" style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>KnowledgeForce Can't Do This</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {d.aiRecommendations.filter(r => r.priority !== 'P2').map((rec, i) => (
            <Card key={i} className="p-4" style={{ borderLeft: '4px solid', borderLeftColor: rec.priority === 'P0' ? '#ef4444' : '#f59e0b' }}>
              <div className="flex items-start justify-between gap-3 mb-2">
                <PriorityBadge priority={rec.priority} />
                <ChevronRight size={14} style={{ color: '#a0a0a4' }} />
              </div>
              <p className="text-sm font-semibold mb-2" style={{ color: '#f0f0f5' }}>{rec.insight}</p>
              <p className="text-xs mb-2" style={{ color: '#a0a0a4' }}><strong>Action:</strong> {rec.action}</p>
              <p className="text-xs font-semibold" style={{ color: '#10b981' }}>{rec.estImpact}</p>
            </Card>
          ))}
        </div>
      </div>

      {/* Section 2: Campaign Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Campaigns Table */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Radio size={16} style={{ color: '#f59e0b' }} />
            <h3 className="text-sm font-bold" style={{ color: '#f0f0f5' }}>Active Campaigns</h3>
          </div>
          <div className="space-y-3">
            {d.activeCampaigns.slice(0, 4).map((camp, i) => {
              const utilization = (camp.spent / camp.budget) * 100
              return (
                <div key={i} className="p-3 rounded-lg" style={{ background: '#232326', border: '1px solid #2a2a2e' }}>
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="text-xs font-semibold" style={{ color: '#f0f0f5' }}>{camp.name}</div>
                      <div className="text-[10px]" style={{ color: '#7a7a80' }}>{camp.type}</div>
                    </div>
                    <StatusBadge status={camp.status} />
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[10px] mb-2">
                    <div>
                      <span style={{ color: '#7a7a80' }}>Budget:</span>
                      <span className="font-semibold ml-1" style={{ color: '#f0f0f5' }}>${camp.budget}</span>
                    </div>
                    <div>
                      <span style={{ color: '#7a7a80' }}>ROI:</span>
                      <span className="font-semibold ml-1" style={{ color: '#10b981' }}>{camp.roi}x</span>
                    </div>
                  </div>
                  <div className="relative h-2 rounded-full overflow-hidden" style={{ background: '#1a1a1d' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${Math.min(utilization, 100)}%`, background: camp.spent / camp.budget > 1 ? '#ef4444' : '#3b82f6' }} />
                  </div>
                  <div className="text-[9px] mt-1" style={{ color: '#7a7a80' }}>{utilization.toFixed(0)}% spent</div>
                </div>
              )
            })}
          </div>
        </Card>

        {/* ROI Trend Chart */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={16} style={{ color: '#10b981' }} />
            <h3 className="text-sm font-bold" style={{ color: '#f0f0f5' }}>Monthly Marketing ROI</h3>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={roiChartData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7a7a80' }} axisLine={{ stroke: '#2a2a2e' }} />
              <YAxis tick={{ fontSize: 11, fill: '#7a7a80' }} axisLine={{ stroke: '#2a2a2e' }} />
              <Tooltip
                contentStyle={{ background: '#1a1a1d', border: '1px solid #2a2a2e', borderRadius: '6px' }}
                labelStyle={{ color: '#f0f0f5' }}
              />
              <Bar dataKey="spend" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-3 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ background: '#f59e0b' }} />
              <span style={{ color: '#a0a0a4' }}>Marketing Spend</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded" style={{ background: '#10b981' }} />
              <span style={{ color: '#a0a0a4' }}>Attributed Revenue</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Section 3: Trade Area & Competition */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Demographics */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Users size={16} style={{ color: '#3b82f6' }} />
            <h3 className="text-sm font-bold" style={{ color: '#f0f0f5' }}>Trade Area Intelligence</h3>
          </div>
          <div className="space-y-3">
            <div>
              <div className="text-xs font-semibold mb-2" style={{ color: '#a0a0a4' }}>POPULATION RINGS</div>
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 rounded" style={{ background: '#232326' }}>
                  <div className="text-[10px]" style={{ color: '#7a7a80' }}>1 Mile</div>
                  <div className="font-bold" style={{ color: '#f0f0f5' }}>{d.tradeArea.population1mi.toLocaleString()}</div>
                </div>
                <div className="p-2 rounded" style={{ background: '#232326' }}>
                  <div className="text-[10px]" style={{ color: '#7a7a80' }}>3 Miles</div>
                  <div className="font-bold" style={{ color: '#f0f0f5' }}>{d.tradeArea.population3mi.toLocaleString()}</div>
                </div>
                <div className="p-2 rounded" style={{ background: '#232326' }}>
                  <div className="text-[10px]" style={{ color: '#7a7a80' }}>5 Miles</div>
                  <div className="font-bold" style={{ color: '#f0f0f5' }}>{d.tradeArea.population5mi.toLocaleString()}</div>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold mb-2" style={{ color: '#a0a0a4' }}>KEY DEMOGRAPHICS</div>
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span style={{ color: '#7a7a80' }}>Median Income:</span>
                  <span className="font-semibold" style={{ color: '#f0f0f5' }}>${d.tradeArea.medianIncome.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#7a7a80' }}>Median Age:</span>
                  <span className="font-semibold" style={{ color: '#f0f0f5' }}>{d.tradeArea.medianAge}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#7a7a80' }}>College Educated:</span>
                  <span className="font-semibold" style={{ color: '#f0f0f5' }}>{d.tradeArea.collegeEducated}%</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#7a7a80' }}>Daytime Population:</span>
                  <span className="font-semibold" style={{ color: '#f0f0f5' }}>{d.tradeArea.daytimePopulation.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold mb-2" style={{ color: '#a0a0a4' }}>TOP EMPLOYERS</div>
              <div className="text-xs space-y-1">
                {d.tradeArea.topEmployers.map((emp, i) => (
                  <div key={i} className="flex items-center gap-2" style={{ color: '#a0a0a4' }}>
                    <span className="w-1 h-1 rounded-full" style={{ background: '#f59e0b' }} />
                    {emp}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Competitors */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Target size={16} style={{ color: '#c8102e' }} />
            <h3 className="text-sm font-bold" style={{ color: '#f0f0f5' }}>Competitive Landscape</h3>
          </div>
          <div className="space-y-2">
            {d.competitors.map((comp, i) => (
              <div key={i} className="p-2.5 rounded" style={{ background: '#232326' }}>
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <div className="text-xs font-semibold" style={{ color: '#f0f0f5' }}>{comp.name}</div>
                    <div className="text-[10px]" style={{ color: '#7a7a80' }}>{comp.distance} away</div>
                  </div>
                  <ThreatBadge threat={comp.threat} />
                </div>
                <div className="flex items-center gap-3 text-[10px]">
                  <span style={{ color: '#a0a0a4' }}>⭐ {comp.rating}</span>
                  <span style={{ color: '#a0a0a4' }}>{comp.reviews} reviews</span>
                  <span style={{ color: '#a0a0a4' }}>{comp.priceRange}</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Section 4: Digital Presence */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Google Business Profile */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Globe size={16} style={{ color: '#3b82f6' }} />
            <h3 className="text-sm font-bold" style={{ color: '#f0f0f5' }}>Google Business Profile</h3>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-lg" style={{ background: '#232326' }}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs" style={{ color: '#7a7a80' }}>Google Rating</span>
                <span className="text-sm font-bold" style={{ color: '#f0f0f5' }}>⭐ {d.localSEO.googleRating}</span>
              </div>
              <div className="text-[10px]" style={{ color: '#a0a0a4' }}>{d.localSEO.googleReviews.toLocaleString()} reviews</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-2.5 rounded" style={{ background: '#232326' }}>
                <div className="text-[10px]" style={{ color: '#7a7a80' }}>Yelp Rating</div>
                <div className="font-bold" style={{ color: '#f0f0f5' }}>{d.localSEO.yelpRating}</div>
              </div>
              <div className="p-2.5 rounded" style={{ background: '#232326' }}>
                <div className="text-[10px]" style={{ color: '#7a7a80' }}>Yelp Reviews</div>
                <div className="font-bold" style={{ color: '#f0f0f5' }}>{d.localSEO.yelpReviews}</div>
              </div>
            </div>
            <div className="border-t" style={{ borderColor: '#2a2a2e', paddingTop: '12px' }}>
              <div className="text-xs font-semibold mb-2" style={{ color: '#a0a0a4' }}>RESPONSE METRICS</div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div>
                  <span style={{ color: '#7a7a80' }}>Avg Response:</span>
                  <span className="font-semibold ml-1" style={{ color: '#f0f0f5' }}>{d.localSEO.avgResponseTime}</span>
                </div>
                <div>
                  <span style={{ color: '#7a7a80' }}>Response Rate:</span>
                  <span className="font-semibold ml-1" style={{ color: '#f0f0f5' }}>{d.localSEO.responseRate}%</span>
                </div>
              </div>
            </div>
            <div className="border-t" style={{ borderColor: '#2a2a2e', paddingTop: '12px' }}>
              <div className="text-xs font-semibold mb-2" style={{ color: '#a0a0a4' }}>30-DAY ACTIVITY</div>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between">
                  <span style={{ color: '#7a7a80' }}>Search Impressions:</span>
                  <span className="font-semibold" style={{ color: '#f0f0f5' }}>{d.localSEO.searchImpressions30d.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#7a7a80' }}>Directions Requests:</span>
                  <span className="font-semibold" style={{ color: '#f0f0f5' }}>{d.localSEO.directionsRequests30d.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#7a7a80' }}>Phone Calls:</span>
                  <span className="font-semibold" style={{ color: '#f0f0f5' }}>{d.localSEO.phoneCalls30d.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: '#7a7a80' }}>Photo Views:</span>
                  <span className="font-semibold" style={{ color: '#f0f0f5' }}>{d.localSEO.photoViews30d.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="border-t" style={{ borderColor: '#2a2a2e', paddingTop: '12px' }}>
              <div className="text-xs font-semibold mb-2" style={{ color: '#a0a0a4' }}>TOP SEARCH TERMS</div>
              <div className="space-y-1 text-[10px]">
                {d.localSEO.topSearchTerms.map((term, i) => (
                  <div key={i} className="flex items-center gap-1.5" style={{ color: '#a0a0a4' }}>
                    <span className="w-1 h-1 rounded-full" style={{ background: '#3b82f6' }} />
                    {term}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Geo-Targeting */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Radio size={16} style={{ color: '#f59e0b' }} />
            <h3 className="text-sm font-bold" style={{ color: '#f0f0f5' }}>Geo-Targeting Performance</h3>
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <div className="p-2.5 rounded" style={{ background: '#232326' }}>
                <div className="text-[10px]" style={{ color: '#7a7a80' }}>Active Fences</div>
                <div className="text-lg font-bold" style={{ color: '#f0f0f5' }}>{d.geoTargeting.activeFences}</div>
              </div>
              <div className="p-2.5 rounded" style={{ background: '#232326' }}>
                <div className="text-[10px]" style={{ color: '#7a7a80' }}>Avg CTR</div>
                <div className="text-lg font-bold" style={{ color: '#f0f0f5' }}>{d.geoTargeting.avgCTR}%</div>
              </div>
              <div className="p-2.5 rounded" style={{ background: '#232326' }}>
                <div className="text-[10px]" style={{ color: '#7a7a80' }}>Conv. Rate</div>
                <div className="text-lg font-bold" style={{ color: '#f0f0f5' }}>{d.geoTargeting.conversionRate}%</div>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold mb-2" style={{ color: '#a0a0a4' }}>GEO-FENCES</div>
              <div className="space-y-2">
                {d.geoTargeting.fences.map((fence, i) => (
                  <div key={i} className="p-2.5 rounded" style={{ background: '#232326' }}>
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <div className="text-xs font-semibold" style={{ color: '#f0f0f5' }}>{fence.name}</div>
                        <div className="text-[10px]" style={{ color: '#7a7a80' }}>{fence.radius} • {fence.population.toLocaleString()} pop</div>
                      </div>
                    </div>
                    <div className="flex gap-3 text-[10px]">
                      <span style={{ color: '#a0a0a4' }}>Impressions: <strong style={{ color: '#f0f0f5' }}>{fence.impressions.toLocaleString()}</strong></span>
                      <span style={{ color: '#a0a0a4' }}>Conversions: <strong style={{ color: '#10b981' }}>{fence.conversions}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-t" style={{ borderColor: '#2a2a2e', paddingTop: '12px' }}>
              <div className="text-xs font-semibold mb-2" style={{ color: '#a0a0a4' }}>CONQUEST CAMPAIGNS</div>
              <div className="space-y-2">
                {d.geoTargeting.conquestCampaigns.map((camp, i) => (
                  <div key={i} className="flex items-center justify-between text-[10px] p-2 rounded" style={{ background: '#232326' }}>
                    <div>
                      <div className="font-semibold" style={{ color: '#f0f0f5' }}>{camp.targetBrand}</div>
                      <div style={{ color: '#7a7a80' }}>{camp.redirections} redirections</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold" style={{ color: '#10b981' }}>{camp.conversionRate}%</div>
                      <div style={{ color: '#7a7a80' }}>conversion</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Section 5: Partnerships & Merchandising */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Partnerships */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Heart size={16} style={{ color: '#10b981' }} />
            <h3 className="text-sm font-bold" style={{ color: '#f0f0f5' }}>Community Partnerships</h3>
          </div>
          <div className="space-y-2">
            {d.partnerships.map((part, i) => (
              <div key={i} className="p-3 rounded-lg" style={{ background: '#232326', border: '1px solid #2a2a2e' }}>
                <div className="flex items-start justify-between mb-1">
                  <div className="flex-1">
                    <div className="text-xs font-semibold" style={{ color: '#f0f0f5' }}>{part.name}</div>
                    <div className="text-[10px]" style={{ color: '#7a7a80' }}>{part.type}</div>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: '#10b98120', color: '#10b981' }}>
                    {part.status}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-2 text-[10px]">
                  <div>
                    <span style={{ color: '#7a7a80' }}>Investment:</span>
                    <span className="font-semibold ml-1" style={{ color: '#f0f0f5' }}>${part.investment.toLocaleString()}</span>
                  </div>
                  <div>
                    <span style={{ color: '#7a7a80' }}>Impressions:</span>
                    <span className="font-semibold ml-1" style={{ color: '#f0f0f5' }}>{part.impressions.toLocaleString()}</span>
                  </div>
                  <div>
                    <span style={{ color: '#7a7a80' }}>Redemptions:</span>
                    <span className="font-semibold ml-1" style={{ color: '#10b981' }}>{part.redemptions}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Merchandising */}
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Building2 size={16} style={{ color: '#a0a0a4' }} />
            <h3 className="text-sm font-bold" style={{ color: '#f0f0f5' }}>In-Store Merchandising</h3>
          </div>
          <div className="space-y-4">
            <MerchandisingGauge score={d.merchandising.overallScore} />
            <div className="border-t" style={{ borderColor: '#2a2a2e', paddingTop: '12px' }}>
              <div className="text-xs font-semibold mb-2" style={{ color: '#a0a0a4' }}>CATEGORY SCORES</div>
              <div className="space-y-2">
                {d.merchandising.categories.map((cat, i) => (
                  <div key={i}>
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-xs" style={{ color: '#a0a0a4' }}>{cat.name}</span>
                      <span className="text-xs font-bold" style={{ color: '#f0f0f5' }}>{cat.score}</span>
                    </div>
                    <div className="relative h-1.5 rounded-full overflow-hidden" style={{ background: '#232326' }}>
                      <div className="h-full rounded-full transition-all" style={{ width: `${cat.score}%`, background: cat.score >= 85 ? '#10b981' : cat.score >= 70 ? '#f59e0b' : '#ef4444' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
