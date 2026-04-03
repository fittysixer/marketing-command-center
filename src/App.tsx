import { useState } from 'react'
import { Sidebar } from './components/Sidebar'
import { DashboardHeader } from './components/DashboardHeader'
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
    <div className="flex h-screen" style={{ background: '#141418' }}>
      <Sidebar activeSection={activeSection} onNavigate={setActiveSection} />
      <main className="flex-1 overflow-auto">
        <DashboardHeader activeSection={activeSection} />
        <div className="p-6">
          {renderSection()}
        </div>
      </main>
    </div>
  )
}
