import { useState, useEffect, useCallback } from 'react'
import { TopNav } from './components/DashboardHeader'
import { MarketForceAnalysis } from './components/MarketForceAnalysis'
import { FinancialKPIs } from './components/FinancialKPIs'
import { GuestExperience } from './components/GuestExperience'
import { OperationsOverview } from './components/OperationsOverview'
import { PlatformComparison } from './components/PlatformComparison'
import { AIInsights } from './components/AIInsights'
import { LocalMarketing } from './components/LocalMarketing'

export type Section =
  | 'overview'
  | 'market-force'
  | 'financials'
  | 'guest-experience'
  | 'operations'
  | 'local-marketing'
  | 'comparison'

const validSections: Section[] = ['overview', 'market-force', 'financials', 'guest-experience', 'operations', 'local-marketing', 'comparison']

function getSectionFromHash(): Section {
  const hash = window.location.hash.replace('#', '')
  if (validSections.includes(hash as Section)) return hash as Section
  return 'overview'
}

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>(getSectionFromHash)

  // Update hash when section changes
  const handleSectionChange = useCallback((section: Section) => {
    setActiveSection(section)
    window.location.hash = section
  }, [])

  // Listen for browser back/forward buttons
  useEffect(() => {
    const onHashChange = () => {
      setActiveSection(getSectionFromHash())
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return (
          <div className="space-y-6">
            <AIInsights />
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <FinancialKPIs compact />
              <GuestExperience compact />
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <OperationsOverview compact />
              <LocalMarketing compact />
            </div>
          </div>
        )
      case 'market-force':
        return <MarketForceAnalysis />
      case 'financials':
        return <FinancialKPIs />
      case 'guest-experience':
        return <GuestExperience />
      case 'operations':
        return <OperationsOverview />
      case 'local-marketing':
        return <LocalMarketing />
      case 'comparison':
        return <PlatformComparison />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#0a0a0a', fontFamily: '"DM Sans", Inter, system-ui, sans-serif' }}>
      <TopNav activeSection={activeSection} onSectionChange={handleSectionChange} />
      <main className="max-w-[1400px] mx-auto px-6 py-6">
        {renderSection()}
      </main>

      {/* AI Engine footer */}
      <div className="fixed bottom-0 left-0 right-0 h-7 flex items-center px-4 z-20" style={{ background: '#1a1a1e', borderTop: '1px solid #2a2a2e' }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#10b981' }} />
          <span className="text-[10px] font-medium" style={{ color: '#7a7a80' }}>AI Engine Active</span>
          <span className="text-[10px]" style={{ color: '#4a4a4e' }}>·</span>
          <span className="text-[10px]" style={{ color: '#4a4a4e' }}>192 experts · 5 divisions</span>
        </div>
      </div>
    </div>
  )
}
