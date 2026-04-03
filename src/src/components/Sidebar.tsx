import { useState } from 'react'
import { X, Home, BarChart3, DollarSign, Users, Settings, Shield, Truck, Wrench, GraduationCap, Globe, Leaf, Brain, Building2, Scale, MessageSquare, Heart, ChefHat } from 'lucide-react'

const departments = [
  { name: 'Operations', icon: Settings },
  { name: 'Finance & Accounting', icon: DollarSign },
  { name: 'People & HR', icon: Users },
  { name: 'Marketing & Guest', icon: Heart, active: true },
  { name: 'Supply Chain', icon: Truck },
  { name: 'Tech & Facilities', icon: Wrench },
  { name: 'Training & Development', icon: GraduationCap },
  { name: 'Executive Strategy', icon: Building2 },
  { name: 'Real Estate', icon: Home },
  { name: 'Legal & Risk', icon: Scale },
  { name: 'Franchise Development', icon: Heart },
  { name: 'Communications & PR', icon: MessageSquare },
  { name: 'International', icon: Globe },
  { name: 'Sustainability & ESG', icon: Leaf },
  { name: 'Data Science & AI', icon: Brain },
]

const storeDashboards = [
  { name: 'Food Safety', active: false },
  { name: 'LMS', active: false },
  { name: 'Sales & Revenue', soon: true },
  { name: 'Labor & Scheduling', soon: true },
  { name: 'Marketing & Shopper', soon: true },
  { name: 'Guest Experience', soon: true },
]

export function HamburgerMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        style={{ background: 'rgba(0,0,0,0.5)' }}
        onClick={onClose}
      />
      {/* Panel */}
      <div
        className="fixed left-0 top-0 bottom-0 z-50 w-72 overflow-y-auto"
        style={{ background: '#1a1a1e', borderRight: '1px solid #2a2a2e' }}
      >
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: '1px solid #2a2a2e' }}>
          <span className="text-sm font-bold uppercase tracking-wider" style={{ color: '#f0f0f5' }}>Navigation</span>
          <button onClick={onClose} className="p-1 rounded hover:bg-white/10">
            <X size={18} style={{ color: '#a0a0a4' }} />
          </button>
        </div>

        {/* Store Dashboards */}
        <div className="px-4 pt-4 pb-2">
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#7a7a80' }}>Store Dashboards</h3>
          <div className="space-y-0.5">
            {storeDashboards.map((d) => (
              <a key={d.name} href={d.name === 'Food Safety' ? 'https://fsagent-modular.vercel.app/' : '#'} className="flex items-center justify-between px-3 py-2 rounded-md text-xs transition-colors hover:bg-white/5" style={{ color: d.active ? '#c8102e' : '#a0a0a4' }}>
                <span>{d.name}</span>
                {d.soon && <span className="text-[9px] px-1.5 py-0.5 rounded font-semibold" style={{ background: '#232326', color: '#7a7a80' }}>SOON</span>}
              </a>
            ))}
          </div>
        </div>

        {/* Department Command Centers */}
        <div className="px-4 pt-4 pb-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: '#7a7a80' }}>Department Command Centers</h3>
          <div className="space-y-0.5">
            {departments.map((d) => {
              const Icon = d.icon
              return (
                <a key={d.name} href={d.name === 'Marketing & Guest' ? '#' : '#'} className="flex items-center gap-2.5 px-3 py-2 rounded-md text-xs transition-colors hover:bg-white/5" style={{ color: d.active ? '#f0f0f5' : '#a0a0a4', background: d.active ? 'rgba(200, 16, 46, 0.15)' : 'transparent' }}>
                  <Icon size={14} style={{ color: d.active ? '#c8102e' : '#7a7a80' }} />
                  <span>{d.name}</span>
                  {d.active && <span className="ml-auto w-1.5 h-1.5 rounded-full" style={{ background: '#c8102e' }} />}
                </a>
              )
            })}
          </div>
        </div>

        {/* Brand Hub Home */}
        <div className="px-4 pb-4" style={{ borderTop: '1px solid #2a2a2e' }}>
          <a href="https://fsagent-modular.vercel.app/" className="flex items-center gap-2.5 px-3 py-3 mt-3 rounded-md text-xs transition-colors hover:bg-white/5" style={{ color: '#a0a0a4' }}>
            <Home size={14} style={{ color: '#7a7a80' }} />
            <span>Brand Hub Home</span>
          </a>
        </div>
      </div>
    </>
  )
}
