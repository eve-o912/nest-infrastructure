import React from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { 
  LayoutDashboard, 
  ArrowsLeftRight, 
  Building2, 
  Passport, 
  BrainCircuit, 
  Settings
} from '@tabler/icons-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: ArrowsLeftRight },
  { name: 'Branches', href: '/branches', icon: Building2 },
  { name: 'Passport', href: '/passport', icon: Passport },
  { name: 'Manikka', href: '/manikka', icon: BrainCircuit },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export const MobileNav: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const handleNavigation = (href: string) => {
    navigate({ to: href })
  }

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden">
      <div className="flex justify-around py-2">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href
          const Icon = item.icon
          return (
            <button
              key={item.name}
              onClick={() => handleNavigation(item.href)}
              className={`
                flex flex-col items-center px-3 py-2 rounded-lg text-xs font-medium transition-colors
                ${isActive ? 'text-primary-600' : 'text-gray-600'}
              `}
            >
              <Icon size={20} className={isActive ? 'text-primary-600' : 'text-gray-400'} />
              <span className="mt-1">{item.name}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
