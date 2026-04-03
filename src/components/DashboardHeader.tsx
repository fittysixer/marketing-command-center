import { useState } from 'react'
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

      {/* Main header bar — matches Brand Hub: 44px, #C8102E, borderBottom #A00D24, px-3 */}
      <div className="sticky top-0 z-30" style={{ background: '#C8102E', width: '100%', boxSizing: 'border-box' }}>
        {/* ROW 1: Logo + Category tabs — Athletic-style red bar */}
        <div style={{
          background: '#C8102E',
          borderBottom: '1px solid #A00D24',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: '0px',
          paddingLeft: '12px', paddingRight: '12px', height: '44px',
        }}>
          {/* Hamburger menu — Brand Hub exact: 3 bars, 16px wide, 2px thick, 3px gap */}
          <div
            style={{ display: 'flex', flexDirection: 'column', gap: '3px', cursor: 'pointer', padding: '8px', marginRight: '8px', borderRadius: '4px', background: 'transparent' }}
            onClick={() => setMenuOpen(!menuOpen)}
            title="Switch Dashboard"
          >
            <div style={{ width: '16px', height: '2px', background: '#fff', borderRadius: '1px' }} />
            <div style={{ width: '16px', height: '2px', background: '#fff', borderRadius: '1px' }} />
            <div style={{ width: '16px', height: '2px', background: '#fff', borderRadius: '1px' }} />
          </div>

          {/* Logo — italic bold like Brand Hub */}
          <span style={{
            fontSize: '15px', color: 'white', marginRight: '20px', cursor: 'pointer', flexShrink: 0,
            fontFamily: '"DM Sans", Inter, system-ui, sans-serif', fontWeight: 900, fontStyle: 'italic', letterSpacing: '0.5px',
          }}>
            FIVE GUYS
          </span>

          {/* Divider line between logo and home button — matches Brand Hub */}
          <div style={{ width: '1px', height: '24px', background: 'rgba(255,255,255,0.2)', marginRight: '0px', flexShrink: 0 }} />

          {/* Spacer */}
          <div style={{ width: '0px', marginRight: '4px' }} />

          {/* Home icon button — Brand Hub exact: 32x32, 6px radius, rgba(0,0,0,0.25) bg */}
          <button
            onClick={() => { window.location.href = 'https://fsagent-modular.vercel.app/'; }}
            title="Dashboard Home"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              width: '32px', height: '32px', borderRadius: '6px', border: 'none',
              background: 'rgba(0,0,0,0.25)',
              cursor: 'pointer', marginRight: '6px', flexShrink: 0, transition: 'all 150ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(0,0,0,0.25)'; }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
          </button>

          {/* Category tabs — Brand Hub exact: padding 9px 18px, fontSize 12px, uppercase, letterSpacing 1px */}
          {mainTabs.map((tab) => {
            const isActive = activeSection === tab.id
            return (
              <button
                key={tab.id}
                onClick={() => onSectionChange(tab.id)}
                style={{
                  padding: '9px 18px', fontSize: '12px',
                  fontWeight: isActive ? 800 : 600,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.75)',
                  background: isActive ? 'rgba(0,0,0,0.2)' : 'transparent',
                  border: 'none',
                  borderBottom: isActive ? '3px solid #fff' : '3px solid transparent',
                  cursor: 'pointer', letterSpacing: '1px', whiteSpace: 'nowrap',
                  transition: 'all 150ms', fontFamily: "'DM Sans', sans-serif",
                  textTransform: 'uppercase', height: '44px',
                }}
                onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.75)'; }}
              >
                {tab.label}
              </button>
            )
          })}

          {/* Spacer to push Exit to right */}
          <div style={{ flex: 1 }} />

          {/* Exit button — Brand Hub exact */}
          <button
            onClick={() => { window.location.href = 'https://fsagent-modular.vercel.app/'; }}
            style={{
              padding: '5px 12px', fontSize: '11px', background: 'rgba(0,0,0,0.15)',
              color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '5px',
              cursor: 'pointer', fontWeight: 600, letterSpacing: '0.5px', whiteSpace: 'nowrap', flexShrink: 0,
            }}
          >
            Exit
          </button>
        </div>

        {/* ROW 2: Sub-page buttons — Brand Hub exact: gradient bg, gap 4px, height 36px */}
        <div style={{
          background: 'linear-gradient(180deg, rgba(200,16,46,0.25) 0%, rgba(140,10,30,0.18) 100%)',
          backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(200,16,46,0.25)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.3), inset 0 1px 0 rgba(200,16,46,0.12)',
          display: 'flex', alignItems: 'center', height: '36px',
          paddingLeft: '12px', paddingRight: '12px',
          overflowX: 'auto', gap: '4px',
        }}>
          {(subNavItems[activeSection] || []).map((item, i) => {
            const isActive = i === 0
            return (
              <button
                key={item}
                style={{
                  padding: '6px 16px', fontSize: '12px',
                  fontWeight: isActive ? 700 : 500,
                  color: isActive ? '#fff' : 'rgba(255,255,255,0.55)',
                  background: isActive ? 'rgba(200,16,46,0.3)' : 'transparent',
                  border: 'none',
                  borderRadius: '5px',
                  borderBottom: isActive ? '2px solid #C8102E' : '2px solid transparent',
                  cursor: 'pointer', whiteSpace: 'nowrap', letterSpacing: '0.3px',
                  transition: 'all 120ms', fontFamily: "'DM Sans', sans-serif",
                }}
                onMouseEnter={(e) => { if (!isActive) { e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; } }}
                onMouseLeave={(e) => { if (!isActive) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.55)'; } }}
              >
                {item}
              </button>
            )
          })}
        </div>
      </div>

      {/* Breadcrumb + status row — Brand Hub exact: 28px minHeight, rgba(200,16,46,0.03) bg */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '6px 12px', background: 'rgba(200,16,46,0.03)',
        borderBottom: '1px solid rgba(255,255,255,0.04)', flexShrink: 0,
        minHeight: '28px', width: '100%', boxSizing: 'border-box',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10px', letterSpacing: '0.5px' }}>
          <span style={{ color: '#888', fontWeight: 500 }}>Marketing & Guest</span>
          <span style={{ color: '#555' }}>/</span>
          <span style={{ color: '#C8102E', fontWeight: 600 }}>{sectionBreadcrumb[activeSection] || 'Command Center'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '9px', color: '#666' }}>
          <span style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981', display: 'inline-block' }} />
          Live · Updated 2m ago
          <span style={{ color: '#555' }}>{new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          {/* Export buttons — Brand Hub exact */}
          <div style={{ width: '1px', height: '14px', background: 'rgba(255,255,255,0.08)', margin: '0 2px' }} />
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '4px', color: '#888', fontSize: '9px', fontWeight: 600,
              cursor: 'pointer', letterSpacing: '0.3px', transition: 'all 150ms', fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200,16,46,0.15)'; e.currentTarget.style.color = '#C8102E'; e.currentTarget.style.borderColor = 'rgba(200,16,46,0.3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
            CSV
          </button>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '4px', color: '#888', fontSize: '9px', fontWeight: 600,
              cursor: 'pointer', letterSpacing: '0.3px', transition: 'all 150ms', fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200,16,46,0.15)'; e.currentTarget.style.color = '#C8102E'; e.currentTarget.style.borderColor = 'rgba(200,16,46,0.3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><polyline points="9 15 12 12 15 15"/>
            </svg>
            PDF
          </button>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: '4px', padding: '3px 8px',
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '4px', color: '#888', fontSize: '9px', fontWeight: 600,
              cursor: 'pointer', letterSpacing: '0.3px', transition: 'all 150ms', fontFamily: "'DM Sans', sans-serif",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(200,16,46,0.15)'; e.currentTarget.style.color = '#C8102E'; e.currentTarget.style.borderColor = 'rgba(200,16,46,0.3)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#888'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print
          </button>
        </div>
      </div>
    </>
  )
}
