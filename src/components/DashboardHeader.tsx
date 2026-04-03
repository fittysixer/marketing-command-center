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
      <div className="sticky top-0 z-30" style={{ width: '100%', boxSizing: 'border-box' }}>
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

          {/* Logo — exact same base64 SVG image as Brand Hub */}
          <img
            src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjE0IDMzIDIxMCAzOCIgZmlsbD0ibm9uZSI+CiAgPCEtLSBGIC0tPgogIDxwYXRoIGQ9Ik0yNy4xODM2IDYyLjYzNjZWNDAuNDgxOUg0NC41MzVWNDUuNjUxMUgzNC40OTU5VjQ5LjY4MjJINDIuNDkwMVY1NC44NTEzSDM0LjQ5NTlWNjIuNjM2NkgyNy4xODM2WiIgZmlsbD0id2hpdGUiLz4KICA8IS0tIEkgLS0+CiAgPHBhdGggZD0iTTU1LjIyNjQgNDAuNDgxOUg0Ny45MTQxVjYyLjYzNjZINTUuMjI2NFY0MC40ODE5WiIgZmlsbD0id2hpdGUiLz4KICA8IS0tIFYgLS0+CiAgPHBhdGggZD0iTTU4LjI5MyA0MC40ODE0SDY1LjY2NzFMNjkuNTcxNSA1NS4yMjA3TDczLjYzMDcgNDAuNDgxNEg4MS4wMDQ4TDczLjI1ODMgNjIuNjM2Mkg2NS45MTQ3TDU4LjI5MyA0MC40ODE0WiIgZmlsbD0id2hpdGUiLz4KICA8IS0tIEUgLS0+CiAgPHBhdGggZD0iTTgzLjMzOTggNjIuNjM2MVY0MC40ODE0SDEwMS41MjhWNDUuNjUwNkg5MC42NTI4VjQ4LjgySDk5Ljg1NDdWNTMuOTg5N0g5MC42NTI4VjU3LjQ2N0gxMDEuOTYyVjYyLjYzNjFIODMuMzM5OFoiIGZpbGw9IndoaXRlIi8+CiAgPCEtLSBHICh0cmFuc2xhdGVkKSAtLT4KICA8ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg5NSwgLTI2LjcpIj4KICAgIDxwYXRoIGQ9Ik0zOS43MjcxIDg5Ljk5NThIMzUuMDE3M0wzNC43Mzg1IDg3LjgxMDhDMzQuNDI4NCA4OC4xNTk4IDM0LjA3MjYgODguNDk4NyAzMy42Njk2IDg4LjgyNjJDMzMuMjY2NiA4OS4xNTQ5IDMyLjc5MTYgODkuNDQyIDMyLjI0NDIgODkuNjg3OUMzMS42OTY2IDg5LjkzNDUgMzEuMDcxNSA5MC4xMzQzIDMwLjM2OTkgOTAuMjg3OUMyOS42NjcxIDkwLjQ0MjIgMjguODgyMSA5MC41MTg3IDI4LjAxNSA5MC41MTg3QzI2LjU4OTYgOTAuNTE4NyAyNS4yMjU5IDkwLjI4NzkgMjMuOTI1MyA4OS44MjY0QzIyLjYyMzQgODkuMzY0OCAyMS40NzE3IDg4LjY2MjQgMjAuNDcwMyA4Ny43MTg1QzE5LjQ2NzYgODYuNzc1MiAxOC42NzMxIDg1LjU5MSAxOC4wODQyIDg0LjE2NDdDMTcuNDk1MyA4Mi43MzkgMTcuMjAxMiA4MS4wNjIzIDE3LjIwMTIgNzkuMTMzNEMxNy4yMDEyIDc3LjM2OTUgMTcuNDY5MiA3NS43NTQxIDE4LjAwNzIgNzQuMjg3M0MxOC41NDM4IDcyLjgyMTIgMTkuMzE4NiA3MS41NjQzIDIwLjMzMDIgNzAuNTE4QzIxLjM0MjUgNjkuNDcxNiAyMi41NzE4IDY4LjY1NjcgMjQuMDE3NiA2OC4wNzEyQzI1LjQ2MzQgNjcuNDg3IDI3LjA4NTUgNjcuMTk0MyAyOC44ODIxIDY3LjE5NDNDMzAuMjI0NyA2Ny4xOTQzIDMxLjQ4NDcgNjcuMzY5NCAzMi42NjI0IDY3LjcxNzhDMzMuODQwMiA2OC4wNjY4IDM0Ljg5MzIgNjguNTg0NiAzNS44MjI3IDY5LjI3MThDMzYuNzUyOCA2OS45NTkxIDM3LjUzMiA3MC44MTU4IDM4LjE2MjMgNzEuODQxMkMzOC43OTE5IDcyLjg2NjcgMzkuMjIwNCA3NC4wNTY2IDM5LjQ0ODMgNzUuNDEwMkgzMi41MDc3QzMyLjIzOTEgNzQuNDg3MSAzMS43ODQ1IDczLjc5MDQgMzEuMTQ0MSA3My4zMTgxQzMwLjUwMzYgNzIuODQ2NSAyOS43MDg1IDcyLjYxMDcgMjguNzU4NiA3Mi42MTA3QzI4LjAzNDggNzIuNjEwNyAyNy40MTA5IDcyLjc2NDMgMjYuODg0NCA3My4wNzE2QzI2LjM1NzIgNzMuMzc5NSAyNS45MTggNzMuODIwNyAyNS41NjcyIDc0LjM5NDhDMjUuMjE1NyA3NC45Njk1IDI0Ljk1MjIgNzUuNjUxNyAyNC43NzcxIDc2LjQ0MTRDMjQuNjAxNCA3Ny4yMzEgMjQuNTEzNSA3OC4xMTggMjQuNTEzNSA3OS4xMDMxQzI0LjUxMzUgNzkuODgyNiAyNC41ODU1IDgwLjYzNjkgMjQuNzMwNiA4MS4zNjQ2QzI0Ljg3NDUgODIuMDkyOSAyNS4xMjI4IDgyLjczNCAyNS40NzQyIDgzLjI4NzhDMjUuODI1IDgzLjg0MTYgMjYuMjk5OSA4NC4yODI5IDI2Ljg5OTcgODQuNjExMUMyNy40OTgxIDg0LjkzOTIgMjguMjYyNyA4NS4xMDM2IDI5LjE5MjIgODUuMTAzNkMyOS41NjQgODUuMTAzNiAyOS45NTE3IDg1LjA0MTYgMzAuMzU0IDg0LjkxODRDMzAuNzU3IDg0Ljc5NTEgMzEuMTMzMiA4NC42MjEyIDMxLjQ4NDcgODQuMzk1NUMzMS44MzYxIDg0LjE2OTggMzIuMTQwNCA4My45MDMgMzIuMzk4OSA4My41OTU3QzMyLjY1NjcgODMuMjg3OCAzMi44MzgxIDgyLjkzOTUgMzIuOTQxMyA4Mi41NDk0SDI5LjcxOTNWNzcuNzQ4OUgzOS43MjcxVjg5Ljk5NThaIiBmaWxsPSJ3aGl0ZSIvPgogICAgPHBhdGggZD0iTTQzLjU5NzcgNjcuNzc5M0g1MC45MVY4MS4wNDE3QzUwLjkxIDgxLjU5NTUgNTAuOTQ1NyA4Mi4xMTkgNTEuMDE4MyA4Mi42MTA5QzUxLjA5MDggODMuMTAzNCA1MS4yNTA2IDgzLjUzMzkgNTEuNDk4OSA4My45MDMyQzUxLjc0NjYgODQuMjcyNCA1Mi4wOTggODQuNTY0NSA1Mi41NTE5IDg0Ljc4MDFDNTMuMDA2NSA4NC45OTU3IDUzLjYwNjIgODUuMTAzOCA1NC4zNDkxIDg1LjEwMzhDNTUuMDEwNiA4NS4xMDM4IDU1LjU1ODEgODUuMDA1OCA1NS45OTE2IDg0LjgxMUM1Ni40MjUyIDg0LjYxNTcgNTYuNzc2NiA4NC4zMzk0IDU3LjA0NTIgODMuOTc5N0M1Ny4zMTMzIDgzLjYyMTIgNTcuNDk5MiA4My4xOTA2IDU3LjYwMjkgODIuNjg3NEM1Ny43MDYxIDgyLjE4NTQgNTcuNzU3NiA4MS42MzY2IDU3Ljc1NzYgODEuMDQxN1Y2Ny43NzkzSDY1LjA3VjgwLjMwMzJDNjUuMDcgODMuODUxOSA2NC4yMDc0IDg2LjQ0MTYgNjIuNDgzNCA4OC4wNzI3QzYwLjc1ODEgODkuNzAzOSA1OC4wNDY3IDkwLjUxODggNTQuMzQ5MSA5MC41MTg4QzUyLjYxNDMgOTAuNTE4OCA1MS4wODA2IDkwLjM0NDMgNDkuNzQ4MiA4OS45OTZDNDguNDE1NyA4OS42NDcgNDcuMjk0NiA4OS4wNjc5IDQ2LjM4NjEgODguMjU3M0M0NS40NzcgODcuNDQ3NCA0NC43ODU2IDg2LjM5MSA0NC4zMSA4NS4wODhDNDMuODM1MSA4My43ODQ5IDQzLjU5NzcgODIuMTgwMyA0My41OTc3IDgwLjI3MjJMNDMuNTk3NyA2Ny43NzkzWiIgZmlsbD0id2hpdGUiLz4KICAgIDxwYXRoIGQ9Ik04Mi41NzMgODkuOTM0SDc1LjI2MTNWODEuODcxOEw2Ni45NTcgNjcuNzc5M0g3NS4xMzcxTDc4Ljk3OTIgNzUuMjg3MUw4Mi44MjA2IDY3Ljc3OTNIOTAuODc3Mkw4Mi41NzMgODEuNzQ5MVY4OS45MzRaIiBmaWxsPSJ3aGl0ZSIvPgogICAgPHBhdGggZD0iTTEwNC4zODUgNzQuMjEwMkMxMDQuMzIzIDczLjgyMDggMTA0LjE5OSA3My41MDc4IDEwNC4wMTMgNzMuMjcyQzEwMy44MjcgNzMuMDM2MiAxMDMuNiA3Mi44NDY1IDEwMy4zMzEgNzIuNzAyM0MxMDIuODE1IDcyLjQzNjIgMTAyLjE4NSA3Mi4zMDI4IDEwMS40NDEgNzIuMzAyOEMxMDAuNjM1IDcyLjMwMjggMTAwLjA0NyA3Mi40MTAyIDk5LjY3NTEgNzIuNjI1OEM5OS4zMDI2IDcyLjg0MDggOTkuMTE3NCA3My4xNTM4IDk5LjExNzQgNzMuNTY0MUM5OS4xMTc0IDczLjk3NSA5OS4zMDI3IDc0LjMxMzMgOTkuNjc1MSA3NC41Nzk1QzEwMC4wNDcgNzQuODQ2MyAxMDAuNTMyIDc1LjA4MjcgMTAxLjEzMSA3NS4yODc2QzEwMS43MzEgNzUuNDkyNCAxMDIuNDExIDc1LjY4MjcgMTAzLjE3NyA3NS44NTY2QzEwMy45NDEgNzYuMDMxMSAxMDQuNzI1IDc2LjIzMDkgMTA1LjUzMSA3Ni40NTY2QzEwNi4zMzcgNzYuNjgyMyAxMDcuMTIyIDc2Ljk1NDIgMTA3Ljg4NiA3Ny4yNzIyQzEwOC42NSA3Ny41OTAyIDEwOS4zMzIgNzcuOTk5OSAxMDkuOTMxIDc4LjUwMjVDMTEwLjUzIDc5LjAwNTggMTExLjAxNSA3OS42MTAyIDExMS4zODggODAuMzE4MkMxMTEuNzYgODEuMDI2MyAxMTEuOTQ1IDgxLjg4MyAxMTEuOTQ1IDgyLjg4NzZDMTExLjk0NSA4NC4xNzk5IDExMS42ODYgODUuMzAzNCAxMTEuMTcxIDg2LjI1NzRDMTEwLjY1NCA4Ny4yMTA4IDEwOS45MzYgODguMDAwNSAxMDkuMDE3IDg4LjYyNjRDMTA4LjA5OCA4OS4yNTIzIDEwNi45OTggODkuNzI0IDEwNS43MTcgOTAuMDQyQzEwNC40MzYgOTAuMzU5NCAxMDMuMDMxIDkwLjUxODcgMTAxLjUwMyA5MC41MTg3QzEwMC4wMzYgOTAuNTE4NyA5OC43MDQyIDkwLjMxODkgOTcuNTA2NyA4OS45MTg3Qzk2LjMwNzkgODkuNTE5MSA5NS4yODA0IDg4Ljk3OTggOTQuNDIzNSA4OC4zMDMzQzkzLjU2NiA4Ny42MjYyIDkyLjg5NDMgODYuODQxNiA5Mi40MDkyIDg1Ljk0OTVDOTEuOTIzNSA4NS4wNTY4IDkxLjY1OTkgODQuMTA4NSA5MS42MTkxIDgzLjEwMzJIOTguNjIyMUM5OC43NjYgODMuODgyOCA5OS4xNjkgODQuNDY3NiA5OS44Mjk4IDg0Ljg1N0MxMDAuMTE5IDg1LjA0MTYgMTAwLjQ1IDg1LjE4MDEgMTAwLjgyMiA4NS4yNzI0QzEwMS4xOTMgODUuMzY0NyAxMDEuNTU1IDg1LjQxMDkgMTAxLjkwNiA4NS40MTA5QzEwMi44MzUgODUuNDEwOSAxMDMuNTc0IDg1LjI3MjQgMTA0LjEyMSA4NC45OTU1QzEwNC42NjkgODQuNzE4NiAxMDQuOTQzIDg0LjMxNCAxMDQuOTQzIDgzLjc3OTdDMTA0Ljk0MyA4My4yMjU5IDEwNC42MjcgODIuODAwNCAxMDMuOTk4IDgyLjUwMzJDMTAzLjM2NyA4Mi4yMDYxIDEwMi41NzcgODEuOTM4NyAxMDEuNjI3IDgxLjcwMjhDMTAwLjY3NyA4MS40NjcgOTkuNjQzOSA4MS4yMTAzIDk4LjUyODUgODAuOTM0Qzk3LjQxMzEgODAuNjU2NSA5Ni4zNzk5IDgwLjI2MiA5NS40MyA3OS43NDkyQzk0LjQ3OTUgNzkuMjM2NSA5My42ODk1IDc4LjU0OTIgOTMuMDU5OCA3Ny42ODY5QzkyLjQyOTYgNzYuODI1OCA5Mi4xMTUxIDc1LjY4NzEgOTIuMTE1MSA3NC4yNzE1QzkyLjExNTEgNzMuMTAyNSA5Mi4zNTcgNzIuMDcyIDkyLjg0MjcgNzEuMTc5M0M5My4zMjc4IDcwLjI4NzIgOTMuOTk5NSA2OS41NDg4IDk0Ljg1NzEgNjguOTY0Qzk1LjcxNCA2OC4zNzkxIDk2LjczMTMgNjcuOTM4NSA5Ny45MDkxIDY3LjY0MDdDOTkuMDQ2MiA2Ny4zNDM1IDEwMC4zNzcgNjcuMTk0MyAxMDEuNzgyIDY3LjE5NDNDMTAzLjMzMSA2Ny4xOTQzIDEwNC42NzQgNjcuMzc4OSAxMDUuODEgNjcuNzQ4OEMxMDYuOTQ2IDY4LjExNzQgMTA3LjkwMSA2OC42MjA3IDEwOC42NzYgNjkuMjU2QzEwOS40NTEgNjkuODkyMSAxMTAuMDU1IDcwLjYzNjIgMTEwLjQ4OCA3MS40ODcyQzExMC45MjIgNzIuMzM4MiAxMTEuMjAxIDczLjI0NiAxMTEuMzI1IDc0LjIxMDJIMTA0LjM4NVoiIGZpbGw9IndoaXRlIi8+CiAgICA8cGF0aCBkPSJNMTEyLjU4NCA2OS41OTJDMTEyLjQxNSA2OS41OTIgMTEyLjI1NyA2OS41NTk4IDExMi4xMDkgNjkuNDk2QzExMS45NjEgNjkuNDMyMSAxMTEuODMyIDY5LjM0NTYgMTExLjcyMiA2OS4yMzY0QzExMS42MTEgNjkuMTI2NyAxMTEuNTI1IDY4Ljk5ODUgMTExLjQ2MiA2OC44NTJDMTExLjM5OSA2OC43MDQ5IDExMS4zNjcgNjguNTQ4OSAxMTEuMzY3IDY4LjM4MjlDMTExLjM2NyA2OC4yMTY5IDExMS4zOTkgNjguMDYwOSAxMTEuNDYyIDY3LjkxMzhDMTExLjUyNSA2Ny43NjcyIDExMS42MTEgNjcuNjM5MSAxMTEuNzIyIDY3LjUyOTRDMTExLjgzMiA2Ny40MjAyIDExMS45NjEgNjcuMzMzNiAxMTIuMTA5IDY3LjI2OThDMTEyLjI1NyA2Ny4yMDU1IDExMi40MTUgNjcuMTczOCAxMTIuNTg0IDY3LjE3MzhDMTEyLjc1MSA2Ny4xNzM4IDExMi45MDggNjcuMjA1NSAxMTMuMDU3IDY3LjI2OThDMTEzLjIwNCA2Ny4zMzM2IDExMy4zMzMgNjcuNDIwMiAxMTMuNDQ0IDY3LjUyOTRDMTEzLjU1NCA2Ny42MzkxIDExMy42NDEgNjcuNzY3MiAxMTMuNzA1IDY3LjkxMzhDMTEzLjc3IDY4LjA2MDkgMTEzLjgwMiA2OC4yMTY5IDExMy44MDIgNjguMzgyOUMxMTMuODAyIDY4LjU0ODkgMTEzLjc3IDY4LjcwNDkgMTEzLjcwNSA2OC44NTJDMTEzLjY0MSA2OC45OTg2IDExMy41NTQgNjkuMTI2NyAxMTMuNDQ0IDY5LjIzNjRDMTEzLjMzMyA2OS4zNDU2IDExMy4yMDQgNjkuNDMyMSAxMTMuMDU3IDY5LjQ5NkMxMTIuOTA4IDY5LjU1OTggMTEyLjc1MSA2OS41OTIgMTEyLjU4NCA2OS41OTJaTTExMi41ODQgNjkuMzA0OUMxMTIuNzE1IDY5LjMwNDkgMTEyLjgzNSA2OS4yODE4IDExMi45NDQgNjkuMjM2NEMxMTMuMDUzIDY5LjE5MDUgMTEzLjE0NyA2OS4xMjcyIDExMy4yMjcgNjkuMDQ2M0MxMTMuMzA2IDY4Ljk2NTQgMTEzLjM2OCA2OC44Njg1IDExMy40MTMgNjguNzU0NUMxMTMuNDU4IDY4LjY0MDYgMTEzLjQ4IDY4LjUxNjcgMTEzLjQ4IDY4LjM4MjlDMTEzLjQ4IDY4LjI0OTEgMTEzLjQ1OCA2OC4xMjUyIDExMy40MTMgNjguMDExMkMxMTMuMzY4IDY3Ljg5NzMgMTEzLjMwNiA2Ny44MDAzIDExMy4yMjcgNjcuNzE5NUMxMTMuMTQ3IDY3LjYzODYgMTEzLjA1MyA2Ny41NzUzIDExMi45NDQgNjcuNTI5NEMxMTIuODM1IDY3LjQ4NCAxMTIuNzE1IDY3LjQ2MDkgMTEyLjU4NCA2Ny40NjA5QzExMi40NTIgNjcuNDYwOSAxMTIuMzMgNjcuNDg0IDExMi4yMiA2Ny41Mjk0QzExMi4xMDkgNjcuNTc1MyAxMTIuMDE1IDY3LjYzODYgMTExLjkzNyA2Ny43MTk1QzExMS44NTkgNjcuODAwMyAxMTEuNzk4IDY3Ljg5NzMgMTExLjc1NCA2OC4wMTEyQzExMS43MSA2OC4xMjUyIDExMS42ODggNjguMjQ5MSAxMTEuNjg4IDY4LjM4MjlDMTExLjY4OCA2OC41MTY3IDExMS43MSA2OC42NDA2IDExMS43NTQgNjguNzU0NUMxMTEuNzk4IDY4Ljg2ODUgMTExLjg1OSA2OC45NjU0IDExMS45MzcgNjkuMDQ2M0MxMTIuMDE1IDY5LjEyNzIgMTEyLjEwOSA2OS4xOTA1IDExMi4yMiA2OS4yMzY0QzExMi4zMyA2OS4yODE4IDExMi40NTIgNjkuMzA0OSAxMTIuNTg0IDY5LjMwNDlaTTExMy4xODggNjkuMDQwMUgxMTIuODdMMTEyLjU3OCA2OC40ODc5SDExMi4zNTlWNjkuMDQwMUgxMTIuMDgzVjY3LjczNTFIMTEyLjcxOUMxMTIuODkzIDY3LjczNTEgMTEzLjAyMSA2Ny43NjM1IDExMy4xMDUgNjcuODE5OEMxMTMuMTg4IDY3Ljg3NiAxMTMuMjMgNjcuOTgxIDExMy4yMyA2OC4xMzQyQzExMy4yMyA2OC4yNTUyIDExMy4xOTkgNjguMzQyMyAxMTMuMTM3IDY4LjM5NTdDMTEzLjA3NSA2OC40NDkxIDExMi45ODYgNjguNDc5OCAxMTIuODcgNjguNDg3OUwxMTMuMTg4IDY5LjA0MDFaTTExMi43MjIgNjguMjkzNUMxMTIuNzk3IDY4LjI5NTkgMTEyLjg1OCA2OC4yODQxIDExMi45MDQgNjguMjU4NUMxMTIuOTUgNjguMjMzIDExMi45NzMgNjguMTggMTEyLjk3MyA2OC4wOTkyQzExMi45NzMgNjguMDU0MyAxMTIuOTYyIDY4LjAyMDcgMTEyLjk0MSA2Ny45OTg1QzExMi45MTkgNjcuOTc2MiAxMTIuODkzIDY3Ljk2MDEgMTEyLjg2MiA2Ny45NTA3QzExMi44MzEgNjcuOTQxMiAxMTIuNzk3IDY3LjkzNiAxMTIuNzYxIDY3LjkzNkgxMTIuMzU5VjY4LjI5MzVMMTEyLjcyMiA2OC4yOTM1WiIgZmlsbD0id2hpdGUiLz4KICA8L2c+Cjwvc3ZnPg=="
            alt="Five Guys"
            style={{
              height: '28px', marginRight: '20px', cursor: 'pointer', flexShrink: 0
            }}
            onClick={() => { window.location.href = 'https://fsagent-modular.vercel.app/'; }}
          />

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
