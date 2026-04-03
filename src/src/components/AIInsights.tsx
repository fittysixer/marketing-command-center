import { Brain, Zap, TrendingUp, AlertTriangle, Target, Lightbulb } from 'lucide-react'

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg ${className}`} style={{ background: '#222230', border: '1px solid #333346' }}>{children}</div>
}

const insights = [
  {
    icon: <AlertTriangle size={14} className="text-red-500" />,
    priority: 'P0',
    prColor: { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' },
    title: 'Store #106 requires immediate intervention',
    detail: 'Prime cost 65.7%, NPS 28, mystery shop 71. All metrics trending wrong. Estimated monthly profit loss: $18K vs. system average.',
    action: 'Schedule GM performance review + deploy operations training team',
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
          <p className="text-[10px]" style={{ color: '#6b6b82' }}>Top-priority insights generated from cross-department analysis</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <Zap size={12} className="text-amber-500" />
          <span className="text-[10px] font-medium" style={{ color: '#6b6b82' }}>Updated 2 min ago</span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {insights.map((insight, i) => (
          <div key={i} className="p-3 rounded-lg border transition-colors" style={{ borderColor: '#333346' }} onMouseEnter={(e) => e.currentTarget.style.borderColor = '#404052'} onMouseLeave={(e) => e.currentTarget.style.borderColor = '#333346'}>
            <div className="flex items-center gap-2 mb-1.5">
              {insight.icon}
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded" style={{ background: insight.prColor.bg, color: insight.prColor.color }}>{insight.priority}</span>
            </div>
            <h4 className="text-xs font-semibold leading-snug" style={{ color: '#f0f0f5' }}>{insight.title}</h4>
            <p className="text-[11px] mt-1 leading-relaxed" style={{ color: '#a0a0b8' }}>{insight.detail}</p>
            <div className="mt-2 pt-2" style={{ borderTop: '1px solid #333346' }}>
              <p className="text-[10px] font-medium" style={{ color: '#c8102e' }}>Action: {insight.action}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
