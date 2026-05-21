"use client"

import { Wallet, Apple, Dumbbell, User } from 'lucide-react'

type TabType = 'keuangan' | 'nutrisi' | 'olahraga' | 'profil'

interface BottomNavProps {
  activeTab: TabType
  onTabChange: (tab: TabType) => void
}

export function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  const tabs = [
    { id: 'keuangan' as TabType, label: 'Dompetku', icon: Wallet },
    { id: 'nutrisi' as TabType, label: 'Nutrisi', icon: Apple },
    { id: 'olahraga' as TabType, label: 'Olahraga', icon: Dumbbell },
    { id: 'profil' as TabType, label: 'Profil', icon: User },
  ]

  return (
    <nav className="fixed bottom-4 left-4 right-4 z-50">
      <div className="bg-card/95 backdrop-blur-sm border border-border rounded-2xl shadow-lg p-1.5 flex justify-around items-center safe-bottom">
        {tabs.map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center py-2.5 px-4 rounded-xl transition-colors min-w-[70px] ${
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
              aria-label={tab.label}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon className="w-5 h-5 mb-0.5" strokeWidth={2} />
              <span className="text-[10px] font-medium">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
