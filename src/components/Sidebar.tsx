import { LayoutDashboard, BarChart3, DollarSign, Heart, Settings2, GitCompare, Zap } from 'lucide-react'
import type { Section } from '../App'

const navItems: { id: Section; label: string; icon: React.ReactNode }[] = [
  { id: 'overview', label: 'Command Center', icon: <LayoutDashboard size={18} /> },
  { id: 'market-force', label: 'Market Force Analysis', icon: <Zap size={18} /> },
  { id: 'financials', label: 'Financial Intelligence', icon: <DollarSign size={18} /> },
  { id: 'guest-experience', label: 'Guest Experience', icon: <Heart size={18} /> },
  { id: 'operations', label: 'Operations', icon: <Settings2 size={18} /> },
  { id: 'comparison', label: 'KF vs. Us', icon: <GitCompare size={18} /> },
]

interface SidebarProps {
  activeSection: Section
  onNavigate: (s: Section) => void
}

export function Sidebar({ activeSection, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 flex flex-col shrink-0" style={{ background: '#111116', borderRight: '1px solid #222230' }}>
      {/* Brand */}
      <div className="px-5 py-5" style={{ borderBottom: '1px solid #222230' }}>
        <h1 className="text-lg font-black tracking-wider" style={{ color: '#f0f0f5' }}>FIVE GUYS</h1>
        <div className="w-8 h-0.5 mt-1.5 mb-1.5" style={{ background: '#c8102e' }} />
        <p className="text-[10px] tracking-[0.25em] uppercase" style={{ color: '#6b6b82' }}>Marketing Command Center</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-3 px-3 space-y-0.5">
        <div className="px-3 py-2 text-[9px] tracking-[0.2em] uppercase font-semibold" style={{ color: '#c8102e' }}>
          Analytics & Intelligence
        </div>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-md text-[13px] font-medium transition-all cursor-pointer"
            style={{
              background: activeSection === item.id ? 'rgba(200, 16, 46, 0.12)' : 'transparent',
              color: activeSection === item.id ? '#f0f0f5' : '#6b6b82',
              borderLeft: activeSection === item.id ? '2px solid #c8102e' : '2px solid transparent',
            }}
          >
            <span style={{ color: activeSection === item.id ? '#c8102e' : '#6b6b82' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-5 py-4" style={{ borderTop: '1px solid #222230' }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#10b981' }} />
          <span className="text-[11px]" style={{ color: '#6b6b82' }}>AI Engine Active</span>
        </div>
        <p className="text-[10px] mt-1" style={{ color: '#444460' }}>192 experts &middot; 5 divisions</p>
      </div>
    </aside>
  )
}
