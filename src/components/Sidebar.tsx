import { useState } from 'react'

// SVG icon helper matching Brand Hub's menuIcon function exactly
function MenuIcon({ name, color }: { name: string; color: string }) {
  const props = { width: '16', height: '16', viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: '2', strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  switch (name) {
    case 'shield':
      return <svg {...props}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
    case 'gradcap':
      return <svg {...props}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c0 0 3 3 6 3s6-3 6-3v-5"/></svg>
    case 'dollar':
      return <svg {...props}><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
    case 'users':
      return <svg {...props}><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
    case 'megaphone':
      return <svg {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
    case 'star':
      return <svg {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    case 'factory':
      return <svg {...props}><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 2l-4 5-4-5"/></svg>
    case 'chart':
      return <svg {...props}><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>
    case 'target':
      return <svg {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
    case 'truck':
      return <svg {...props}><rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
    case 'wrench':
      return <svg {...props}><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
    case 'building':
      return <svg {...props}><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01"/></svg>
    case 'map':
      return <svg {...props}><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3z"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
    case 'scale':
      return <svg {...props}><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="M12 22V8"/><path d="M20 7l-8 5-8-5"/></svg>
    case 'handshake':
      return <svg {...props}><path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"/></svg>
    case 'speaker':
      return <svg {...props}><path d="M12 6V2H8"/><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2"/></svg>
    case 'globe':
      return <svg {...props}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
    case 'leaf':
      return <svg {...props}><path d="M11 20A7 7 0 0 1 9.8 6.9C15.5 4.9 17 3.5 19 2c1 2 2 4.5 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>
    case 'cpu':
      return <svg {...props}><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>
    case 'home':
      return <svg {...props}><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    case 'gear':
      return <svg {...props}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
    default:
      return <svg {...props}><circle cx="12" cy="12" r="10"/></svg>
  }
}

// Store Dashboards — matches Brand Hub food-safety.html sidebar exactly (same order, same items)
const storeDashboards = [
  { id: 'foodsafety', label: 'Food Safety', icon: 'shield', active: false, href: 'https://fsagent-modular.vercel.app/food-safety.html' },
  { id: 'sales', label: 'Sales & Revenue', icon: 'dollar', coming: true },
  { id: 'labor', label: 'Labor & Scheduling', icon: 'users', coming: true },
  { id: 'marketing', label: 'Marketing & Shopper', icon: 'megaphone', active: true },
  { id: 'settings', label: 'Store Profile', icon: 'gear', coming: true },
  { id: 'lms', label: 'LMS', icon: 'gradcap', href: 'https://five-guys-university.vercel.app' },
]

// Department Command Centers — matches Brand Hub exactly
const departments = [
  { id: 'operations', label: 'Operations', icon: 'factory' },
  { id: 'financial', label: 'Finance & Accounting', icon: 'chart' },
  { id: 'peoplehr', label: 'People & HR', icon: 'users' },
  { id: 'marketingguest', label: 'Marketing & Guest', icon: 'target' },
  { id: 'supplychain', label: 'Supply Chain', icon: 'truck' },
  { id: 'techfacilities', label: 'Tech & Facilities', icon: 'wrench' },
  { id: 'trainingdev', label: 'Training & Development', icon: 'gradcap' },
  { id: 'executive', label: 'Executive Strategy', icon: 'building' },
  { id: 'realestate', label: 'Real Estate', icon: 'map' },
  { id: 'legalrisk', label: 'Legal & Risk', icon: 'scale' },
  { id: 'franchisemode', label: 'Franchise Development', icon: 'handshake' },
  { id: 'communications', label: 'Communications & PR', icon: 'speaker' },
  { id: 'international', label: 'International', icon: 'globe' },
  { id: 'sustainability', label: 'Sustainability & ESG', icon: 'leaf' },
  { id: 'datascience', label: 'Data Science & AI', icon: 'cpu' },
]

export function HamburgerMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  return (
    <>
      {/* Menu starts below Row 1 (44px) — matches Brand Hub: position fixed, top 44px */}
      <div style={{ position: 'fixed', top: '44px', left: 0, zIndex: 999, display: 'flex', width: '100vw', height: 'calc(100vh - 44px)' }}>
        {/* Menu panel — Brand Hub exact: 260px, #141414, border #333 */}
        <div style={{
          width: '260px',
          background: '#141414',
          borderRight: '1px solid #333',
          display: 'flex',
          flexDirection: 'column',
          padding: '0',
          boxShadow: '4px 0 20px rgba(0,0,0,0.5)',
          overflowY: 'auto',
          fontFamily: "'DM Sans', sans-serif",
        }}>

          {/* ─── TOP SECTION: Store Dashboards ─── */}
          <div style={{ padding: '14px 16px 6px' }}>
            <div style={{ fontSize: '8px', fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
              STORE DASHBOARDS
            </div>
          </div>

          {storeDashboards.map((section) => {
            const iconColor = section.coming ? 'rgba(255,255,255,0.2)' : (section.active ? '#C8102E' : 'rgba(255,255,255,0.5)')
            return (
              <button
                key={'menu-' + section.id}
                onClick={() => {
                  if (section.coming) return
                  onClose()
                  if (section.href) {
                    window.location.href = section.href
                    return
                  }
                }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '10px',
                  padding: '9px 16px', border: 'none', cursor: section.coming ? 'default' : 'pointer',
                  background: section.active ? 'rgba(200,16,46,0.15)' : 'transparent',
                  borderLeft: section.active ? '3px solid #C8102E' : '3px solid transparent',
                  color: section.coming ? 'rgba(255,255,255,0.25)' : (section.active ? '#fff' : 'rgba(255,255,255,0.7)'),
                  fontSize: '12px', fontWeight: section.active ? 700 : 500,
                  fontFamily: "'DM Sans', sans-serif", textAlign: 'left', width: '100%',
                  transition: 'all 150ms',
                }}
                onMouseEnter={(e) => { if (!section.active && !section.coming) { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.color = '#fff'; } }}
                onMouseLeave={(e) => { if (!section.active && !section.coming) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; } }}
              >
                <span style={{ width: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <MenuIcon name={section.icon} color={iconColor} />
                </span>
                <span>{section.label}</span>
                {section.coming && (
                  <span style={{ fontSize: '6px', fontWeight: 800, color: 'rgba(255,255,255,0.2)', marginLeft: 'auto', letterSpacing: '1px', padding: '2px 6px', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '3px' }}>
                    SOON
                  </span>
                )}
              </button>
            )
          })}

          {/* ─── DIVIDER ─── */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '10px 16px' }} />

          {/* ─── BOTTOM SECTION: Department Command Centers ─── */}
          <div style={{ padding: '6px 16px 6px' }}>
            <div style={{ fontSize: '8px', fontWeight: 800, color: 'rgba(255,255,255,0.3)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>
              DEPARTMENT COMMAND CENTERS
            </div>
          </div>

          {departments.map((dept) => (
            <button
              key={'dept-' + dept.id}
              onClick={() => {
                onClose()
                window.location.href = 'https://fsagent-modular.vercel.app/index.html#' + dept.id
              }}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '8px 16px', border: 'none', cursor: 'pointer',
                background: 'transparent', borderLeft: '3px solid transparent',
                color: 'rgba(255,255,255,0.6)', fontSize: '11px', fontWeight: 500,
                fontFamily: "'DM Sans', sans-serif", textAlign: 'left', width: '100%',
                transition: 'all 150ms',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = 'rgba(255,255,255,0.85)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.6)'; }}
            >
              <span style={{ width: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MenuIcon name={dept.icon} color="rgba(255,255,255,0.4)" />
              </span>
              <span style={{ flex: 1 }}>{dept.label}</span>
              {/* Chevron arrow — matches Brand Hub */}
              <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="2" style={{ marginLeft: 'auto', flexShrink: 0 }}>
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          ))}

          {/* ─── BOTTOM: Home link ─── */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '10px 16px' }} />
          <button
            onClick={() => { onClose(); window.location.href = 'https://fsagent-modular.vercel.app/'; }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 16px', border: 'none', cursor: 'pointer',
              background: 'transparent', borderLeft: '3px solid transparent',
              color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif", textAlign: 'left', width: '100%',
              transition: 'all 150ms',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
          >
            <span style={{ width: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MenuIcon name="home" color="rgba(255,255,255,0.4)" />
            </span>
            <span>Brand Hub Home</span>
          </button>
          <button
            onClick={() => { onClose(); window.location.href = 'https://fsagent-modular.vercel.app/index.html#admincc'; }}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '10px 16px', border: 'none', cursor: 'pointer',
              background: 'transparent', borderLeft: '3px solid transparent',
              color: 'rgba(255,255,255,0.5)', fontSize: '11px', fontWeight: 600,
              fontFamily: "'DM Sans', sans-serif", textAlign: 'left', width: '100%',
              transition: 'all 150ms', marginBottom: '12px',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.04)'; e.currentTarget.style.color = '#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
          >
            <span style={{ width: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <MenuIcon name="gear" color="rgba(255,255,255,0.4)" />
            </span>
            <span>Admin</span>
          </button>
        </div>

        {/* Backdrop (click to close) — matches Brand Hub */}
        <div
          style={{ flex: 1, background: 'rgba(0,0,0,0.5)', cursor: 'pointer' }}
          onClick={onClose}
        />
      </div>
    </>
  )
}
