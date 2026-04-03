import { Brain, Zap, TrendingUp, AlertTriangle, Target, Lightbulb, Shield, Star } from 'lucide-react'

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg ${className}`} style={{ background: '#1e1e22', border: '1px solid #2a2a2e' }}>{children}</div>
}

const insights = [
  {
    icon: <AlertTriangle size={14} className="text-red-500" />,
    priority: 'P0',
    prColor: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
    title: 'Brand reputation at risk: Store #106 NPS dropped to 28',
    detail: 'Google rating fell to 3.6 stars — negative review velocity up 340% in 30 days. AI detects correlation with mystery shop decline. Without intervention, projected to lose 2,400 annual guests worth $45K revenue.',
    action: 'Launch reputation recovery campaign + deploy reputation management task force',
  },
  {
    icon: <TrendingUp size={14} className="text-emerald-500" />,
    priority: 'OPP',
    prColor: { bg: 'rgba(16, 185, 129, 0.15)', color: '#10b981' },
    title: 'Upselling training could add $290K annually',
    detail: 'System-wide upselling score is 62%. Bringing to 80% (top-performer level) increases avg check by ~$1.40 across 228K monthly guests.',
    action: 'Roll out Store #101 upselling playbook system-wide',
  },
  {
    icon: <Target size={14} className="text-blue-500" />,
    priority: 'P1',
    prColor: { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' },
    title: 'Loyalty churn risk = $340K revenue at stake',
    detail: '18.5% of loyalty members flagged as at-risk. AI identified top predictors: visit frequency drop >40%, no redemption in 60 days, low app engagement.',
    action: 'Deploy personalized win-back campaign to top 500 at-risk members',
  },
  {
    icon: <Lightbulb size={14} className="text-amber-500" />,
    priority: 'AI',
    prColor: { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' },
    title: 'Wait time sentiment is a leading indicator for NPS drops',
    detail: 'AI discovered that "Wait Times" sentiment drops precede NPS declines by 3-4 weeks. Current wait time sentiment at 34% — lowest category.',
    action: 'Proactive staffing adjustment before NPS impact materializes',
  },
  {
    icon: <Star size={14} className="text-amber-400" />,
    priority: 'CSAT',
    prColor: { bg: 'rgba(200, 16, 46, 0.15)', color: '#C8102E' },
    title: 'CSAT "Value for Money" at 3.6/5 — lowest category, but fixable',
    detail: 'Cross-referencing CSAT with secret shopper data: stores with upsell compliance >70% score 4.1/5 on value. Upselling creates perception of personal service, not just higher checks.',
    action: 'Deploy suggestive selling training + measure CSAT value lift in 30 days',
  },
  {
    icon: <Shield size={14} className="text-purple-500" />,
    priority: 'SHOP',
    prColor: { bg: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' },
    title: 'Secret shopper: lunch speed failing at 61% — CSAT confirms the pain',
    detail: 'Orders delivered under 8 min hit just 61% during 11:30–1pm. CSAT speed score dropped to 3.8/5. AI estimates each 10% improvement in lunch speed adds +0.2 to overall CSAT and $12.4K/mo revenue.',
    action: 'Add 1 crew member to lunch peak (11am–1:30pm) at underperforming stores',
  },
]

export function AIInsights() {
  return (
    <Card className="p-4">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c8102e, #a00520)' }}>
          <Brain size={15} className="text-white" />
        </div>
        <div>
          <h3 className="text-sm font-semibold" style={{ color: '#f0f0f5' }}>AI Command Brief</h3>
          <p className="text-[10px]" style={{ color: '#7a7a80' }}>Top-priority insights generated from cross-department analysis</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Zap size={12} className="text-amber-500" />
          <span className="text-[10px] font-medium" style={{ color: '#7a7a80' }}>Updated 2 min ago</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {insights.map((insight, i) => (
          <div key={i} className="p-3 rounded-lg border transition-colors" style={{ borderColor: '#2a2a2e' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#3a3a3e'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#2a2a2e'}>
            <div className="flex items-center gap-2 mb-1.5">
              {insight.icon}
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: insight.prColor.bg, color: insight.prColor.color }}>{insight.priority}</span>
            </div>
            <h4 className="text-xs font-semibold leading-snug" style={{ color: '#f0f0f5' }}>{insight.title}</h4>
            <p className="text-[11px] mt-1 leading-relaxed" style={{ color: '#a0a0a4' }}>{insight.detail}</p>
            <div className="mt-2 pt-2" style={{ borderTop: '1px solid #2a2a2e' }}>
              <p className="text-[10px] font-medium" style={{ color: '#c8102e' }}>Action: {insight.action}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
