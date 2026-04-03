import { useState } from 'react'
import { TopNav } from './components/DashboardHeader'
import { MarketForceAnalysis } from './components/MarketForceAnalysis'
import { FinancialKPIs } from './components/FinancialKPIs'
import { GuestExperience } from './components/GuestExperience'
import { OperationsOverview } from './components/OperationsOverview'
import { PlatformComparison } from './components/PlatformComparison'
import { AIInsights } from './components/AIInsights'

export type Section =
  | 'overview'
  | 'market-force'
  | 'financials'
  | 'guest-experience'
  | 'operations'
  | 'comparison'

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('overview')

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
            <OperationsOverview compact />
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
      case 'comparison':
        return <PlatformComparison />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#141418', fontFamily: '"DM Sans", Inter, system-ui, sans-serif' }}>
      <TopNav activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="max-w-[1400px] mx-auto px-6 py-6">
        {renderSection()}
      </main>

      {/* AI Engine footer */}
      <div className="fixed bottom-0 left-0 right-0 h-7 flex items-center px-4 z-20" style={{ background: '#1a1a2e', borderTop: '1px solid #222230' }}>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: '#10b981' }} />
          <span className="text-[10px] font-medium" style={{ color: '#6b6b82' }}>AI Engine Active</span>
          <span className="text-[10px]" style={{ color: '#4a4a5e' }}>·</span>
          <span className="text-[10px]" style={{ color: '#4a4a5e' }}>192 experts · 5 divisions</span>
        </div>
      </div>
    </div>
  )
}
