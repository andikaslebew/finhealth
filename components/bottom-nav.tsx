"use client"

import { Wallet, Apple, Dumbbell } from 'lucide-react'

type TabType = 'keuangan' | 'nutrisi' | 'olahraga'

interface BottomNavProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'keuangan' as TabType, label: 'Keuangan', icon: Wallet },
    { id: 'nutrisi' as TabType, label: 'Nutrisi', icon: Apple },
    { id: 'olahraga' as TabType, label: 'Olahraga', icon: Dumbbell },
  ]

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-lg p-2 flex justify-around items-center safe-bottom">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-3 px-6 rounded-xl transition-colors min-w-[80px] ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-6 h-6 mb-1" strokeWidth={2} />
              <span className="text-xs font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
