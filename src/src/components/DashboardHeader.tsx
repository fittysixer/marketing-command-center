import { useState } from 'react'
import { Menu, Home, Search, RefreshCw, Bell, ChevronRight } from 'lucide-react'
import { HamburgerMenu } from './Sidebar'

const mainTabs = [
  { id: 'overview', label: 'COMMAND CENTER' },
  { id: 'market-force', label: 'MARKET FORCE' },
  { id: 'financials', label: 'FINANCIAL' },
  { id: 'guest-experience', label: 'GUEST CX' },
  { id: 'operations', label: 'OPERATIONS' },
  { id: 'comparison', label: 'KF vs. US' },
]

const subNavItems: Record<string, string[]> = {
  'overview': ['AI Command Brief', 'KPI Snapshot', 'Alerts'],
  'market-force': ['2025 Rankings', 'CX Analysis', 'AI Insights', 'Methodology Gaps'],
  'financials': ['P&L Statement', 'Revenue Trends', 'Cost Control', 'Daypart Analysis'],
  'guest-experience': ['NPS & CSAT', 'Sentiment', 'Loyalty', 'Mystery Shop', 'Segmentation'],
  'operations': ['Speed of Service', 'Store Scorecard', 'Labor Analytics', 'Peak Hours'],
  'comparison': ['Feature Matrix', 'Expert Panels', 'ROI Analysis'],
}

export function TopNav({ activeSection, onSectionChange }: { activeSection: string; onSectionChange: (s: any) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main header bar */}
      <div className="sticky top-0 z-30" style={{ background: '#c8102e' }}>
        <div className="flex items-center h-11 px-3 gap-1">
          {/* Hamburger */}
          <button onClick={() => setMenuOpen(true)} className="p-2 rounded hover:bg-white/10 transition-colors">
            <Menu size={18} color="white" />
          </button>

          {/* Logo */}
          <span className="text-base font-black tracking-wide text-white ml-1 mr-3" style={{ fontFamily: '"DM Sans", Inter, system-ui, sans-serif' }}>
            FIVE GUYS
          </span>

          {/* Divider */}
          <div className="w-px h-6 mx-1" style={{ background: 'rgba(255,255,255,0.25)' }} />

          {/* Home button */}
          <a href="https://fsagent-modular.vercel.app/" className="p-2 rounded hover:bg-white/10 transition-colors">
            <Home size={16} color="white" />
          </a>

          {/* Main tabs */}
          <div className="flex items-center ml-2 h-full">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onSectionChange(tab.id)}
                className="h-full px-4 text-[11px] font-semibold tracking-wider transition-colors relative"
                style={{
                  color: activeSection === tab.id ? '#fff' : 'rgba(255,255,255,0.7)',
                  background: activeSection === tab.id ? 'rgba(0,0,0,0.15)' : 'transparent',
                  fontFamily: '"DM Sans", Inter, system-ui, sans-serif',
                }}
              >
                {tab.label}
                {activeSection === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-[2px]" style={{ background: 'white' }} />
                )}
              </button>
            ))}
          </div>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-1">
            <div className="relative">
              <Search size={14} color="rgba(255,255,255,0.7)" className="absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-3 py-1 rounded text-[11px] w-36"
                style={{ background: 'rgba(255,255,255,0.15)', color: 'white', border: 'none', outline: 'none', fontFamily: '"DM Sans", Inter, system-ui, sans-serif' }}
              />
            </div>
            <button className="p-2 rounded hover:bg-white/10"><RefreshCw size={14} color="rgba(255,255,255,0.7)" /></button>
            <button className="p-2 rounded hover:bg-white/10 relative">
              <Bell size={14} color="rgba(255,255,255,0.7)" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full" style={{ background: '#fbbf24' }} />
            </button>
            <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold ml-1" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>JK</div>
          </div>
        </div>
      </div>

      {/* Sub-navigation row */}
      <div className="flex items-center h-9 px-4 gap-4" style={{ background: '#1a1a2e', borderBottom: '1px solid #333346' }}>
        {(subNavItems[activeSection] || []).map((item, i) => (
          <button key={item} className="text-[11px] transition-colors hover:text-white" style={{ color: i === 0 ? '#f0f0f5' : '#6b6b82', fontFamily: '"DM Sans", Inter, system-ui, sans-serif' }}>
            {item}
          </button>
        ))}
      </div>

      {/* Breadcrumb + status row */}
      <div className="flex items-center justify-between h-8 px-4" style={{ background: '#141418', borderBottom: '1px solid #222230' }}>
        <div className="flex items-center gap-1.5 text-[11px]" style={{ fontFamily: '"DM Sans", Inter, system-ui, sans-serif' }}>
          <span style={{ color: '#6b6b82' }}>Marketing & Guest</span>
          <ChevronRight size={12} style={{ color: '#6b6b82' }} />
          <span style={{ color: '#c8102e', fontWeight: 600 }}>Command Center</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#10b981' }} />
            <span className="text-[10px]" style={{ color: '#6b6b82' }}>Live · Updated 2m ago</span>
          </div>
          <span className="text-[10px]" style={{ color: '#6b6b82' }}>Apr 2, 2026</span>
          <button className="text-[10px] px-2 py-0.5 rounded" style={{ background: '#222230', color: '#a0a0b8', border: '1px solid #333346' }}>CSV</button>
        </div>
      </div>
    </>
  )
}
