import { Bell, Search, RefreshCw } from 'lucide-react'
import type { Section } from '../App'

const sectionMeta: Record<Section, { title: string; subtitle: string }> = {
  overview: { title: 'COMMAND CENTER', subtitle: 'AI-powered overview across all departments' },
  'market-force': { title: 'MARKET FORCE INTELLIGENCE', subtitle: 'Re-analyzing their 2025 Casual Dining Study with AI' },
  financials: { title: 'FINANCIAL INTELLIGENCE', subtitle: 'Store-level P&L, food cost, labor — what KnowledgeForce can\'t do' },
  'guest-experience': { title: 'GUEST EXPERIENCE & LOYALTY', subtitle: 'Replacing KnowledgeForce with AI-powered CX analytics' },
  operations: { title: 'OPERATIONS HUB', subtitle: 'Speed of service, store scorecards, real-time monitoring' },
  comparison: { title: 'PLATFORM COMPARISON', subtitle: 'KnowledgeForce vs. Marketing Command Center' },
}

export function DashboardHeader({ activeSection }: { activeSection: Section }) {
  const meta = sectionMeta[activeSection]
  return (
    <header className="px-6 py-4 flex items-center justify-between sticky top-0 z-10" style={{ background: '#1c1c24', borderBottom: '1px solid #222230' }}>
      <div>
        <h2 className="text-sm font-semibold tracking-[0.15em]" style={{ color: '#f0f0f5' }}>{meta.title}</h2>
        <p className="text-[11px] mt-0.5" style={{ color: '#6b6b82' }}>{meta.subtitle}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2" style={{ color: '#6b6b82' }} />
          <input
            type="text"
            placeholder="Search metrics..."
            className="pl-8 pr-3 py-1.5 text-xs rounded-md focus:outline-none w-48"
            style={{ background: '#222230', border: '1px solid #333346', color: '#a0a0b8' }}
          />
        </div>
        <button className="p-1.5 rounded-md transition-colors" style={{ color: '#6b6b82' }}>
          <RefreshCw size={16} />
        </button>
        <button className="relative p-1.5 rounded-md transition-colors" style={{ color: '#6b6b82' }}>
          <Bell size={16} />
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full" style={{ background: '#c8102e', border: '2px solid #1c1c24' }} />
        </button>
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#c8102e', color: '#fff' }}>JK</div>
      </div>
    </header>
  )
}
