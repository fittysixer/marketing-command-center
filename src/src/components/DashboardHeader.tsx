import { useState } from 'react'
import { Menu, Home, Search, RefreshCw, Bell } from 'lucide-react'
import { HamburgerMenu } from './Sidebar'

const mainTabs = [
  { id: 'overview', label: 'COMMAND CENTER' },
  { id: 'market-force', label: 'MARKET FORCE' },
  { id: 'financials', label: 'FINANCIAL' },
  { id: 'guest-experience', label: 'GUEST CX' },
  { id: 'operations', label: 'OPERATIONS' },
  { id: 'local-marketing', label: 'LOCAL MARKETING' },
  { id: 'comparison', label: 'KF vs. US' },
]

const subNavItems: Record<string, string[]> = {
  'overview': ['AI Command Brief', 'KPI Snapshot', 'Alerts'],
  'market-force': ['2025 Rankings', 'CX Analysis', 'AI Insights', 'Methodology Gaps'],
  'financials': ['P&L Statement', 'Revenue Trends', 'Cost Control', 'Daypart Analysis'],
  'guest-experience': ['NPS & CSAT', 'Sentiment', 'Loyalty', 'Mystery Shop', 'Segmentation'],
  'operations': ['Speed of Service', 'Store Scorecard', 'Labor Analytics', 'Peak Hours'],
  'local-marketing': ['Store Dashboard', 'Campaigns', 'Trade Area', 'Geo-Targeting', 'Partnerships'],
  'comparison': ['Feature Matrix', 'Expert Panels', 'ROI Analysis'],
}

const sectionBreadcrumb: Record<string, string> = {
  'overview': 'Command Center',
  'market-force': 'Market Force',
  'financials': 'Financial',
  'guest-experience': 'Guest CX',
  'operations': 'Operations',
  'local-marketing': 'Local Marketing',
  'comparison': 'KF vs. Us',
}

export function TopNav({ activeSection, onSectionChange }: { activeSection: string; onSectionChange: (s: any) => void }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <>
      <HamburgerMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Main header bar — matches Brand Hub: 44px, #c8102e, px-3 */}
      <div className="sticky top-0 z-30" style={{ background: '#c8102e' }}>
        <div className="flex items-center px-3" style={{ height: '44px' }}>
          {/* Hamburger */}
          <button onClick={() => setMenuOpen(true)} className="p-2 rounded hover:bg-white/10 transition-colors">
            <Menu size={18} color="white" />
          </button>

          {/* Logo — italic bold like Brand Hub */}
          <span className="text-[15px] text-white ml-2 mr-3" style={{ fontFamily: '"DM Sans", Inter, system-ui, sans-serif', fontWeight: 900, fontStyle: 'italic', letterSpacing: '0.5px' }}>
            FIVE GUYS
          </span>

          {/* Home button — matches Brand Hub exactly: 32x32, no border, rgba(0,0,0,0.25) bg, 6px radius */}
          <a
            href="https://fsagent-modular.vercel.app/"
            className="flex items-center justify-center hover:bg-black/30 transition-colors"
            style={{ background: 'rgba(0,0,0,0.25)', borderRadius: '6px', width: '32px', height: '32px', border: 'none' }}
          >
            <Home size={16} color="white" />
          </a>

          {/* Main tabs */}
          <div className="flex items-center ml-3 h-full">
            {mainTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onSectionChange(tab.id)}
                className="h-full px-3 text-[11px] font-semibold tracking-wider transition-colors relative"
                style={{
                  color: activeSection === tab.id ? '#fff' : 'rgba(255,255,255,0.65)',
                  background: activeSection === tab.id ? 'rgba(0,0,0,0.18)' : 'transparent',
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
              <Search size={13} color="rgba(255,255,255,0.6)" className="absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 pr-3 py-1 rounded text-[11px] w-32"
                style={{ background: 'rgba(255,255,255,0.12)', color: 'white', border: 'none', outline: 'none' }}
              />
            </div>
            <button className="p-1.5 rounded hover:bg-white/10"><RefreshCw size={13} color="rgba(255,255,255,0.6)" /></button>
            <button className="p-1.5 rounded hover:bg-white/10 relative">
              <Bell size={13} color="rgba(255,255,255,0.6)" />
              <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full" style={{ background: '#fbbf24' }} />
            </button>
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-bold ml-1" style={{ background: 'rgba(255,255,255,0.2)', color: 'white' }}>JK</div>
          </div>
        </div>
      </div>

      {/* Sub-navigation row — Brand Hub exact: 36px, gap 4px, borderTop + borderBottom, muted text colors */}
      <div className="flex items-center px-3" style={{ height: '36px', gap: '4px', borderTop: '0.9px solid rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(200, 16, 46, 0.25)' }}>
        {(subNavItems[activeSection] || []).map((item, i) => (
          <button key={item} className="text-xs transition-colors hover:text-white" style={{ color: i === 0 ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.55)', fontWeight: 500, letterSpacing: '0.3px' }}>
            {item}
          </button>
        ))}
      </div>

      {/* Breadcrumb + status row — Brand Hub: 36px, very slight red tint bg, subtle border */}
      <div className="flex items-center justify-between px-3" style={{ height: '36px', background: 'rgba(200, 16, 46, 0.03)', borderBottom: '1px solid rgba(255, 255, 255, 0.04)' }}>
        <div className="flex items-center gap-1.5 text-[13px] font-medium">
          <span style={{ color: '#888' }}>Marketing & Guest</span>
          <span style={{ color: '#555' }}>/</span>
          <span style={{ color: '#c8102e', fontWeight: 600 }}>{sectionBreadcrumb[activeSection] || 'Command Center'}</span>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#10b981' }} />
            <span className="text-[11px]" style={{ color: '#888' }}>Live · Updated 2m ago</span>
          </div>
          <span className="text-[11px]" style={{ color: '#888' }}>Apr 2, 2026</span>
          <button className="flex items-center gap-1 text-[11px] px-2 py-0.5 rounded" style={{ background: 'rgba(0,0,0,0.3)', color: '#999', border: '1px solid rgba(255,255,255,0.08)' }}>
            <span style={{ fontSize: '10px' }}>📋</span> CSV
          </button>
        </div>
      </div>
    </>
  )
}
