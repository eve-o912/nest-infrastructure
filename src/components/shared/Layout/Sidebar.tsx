import React from 'react'
import { useNavigate, useLocation } from '@tanstack/react-router'
import { 
  LayoutDashboard, 
  ArrowsLeftRight, 
  Building2, 
  Passport, 
  BrainCircuit, 
  Settings,
  Menu,
  X,
  LogOut
} from '@tabler/icons-react'
import { useAuthStore } from '../../stores/authStore'
import { useUIStore } from '../../stores/uiStore'
import { Avatar } from '../Avatar'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Transactions', href: '/transactions', icon: ArrowsLeftRight },
  { name: 'Branches', href: '/branches', icon: Building2 },
  { name: 'Passport', href: '/passport', icon: Passport },
  { name: 'Manikka', href: '/manikka', icon: BrainCircuit },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export const Sidebar: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuthStore()
  const { sidebarOpen, toggleSidebar, activeTab, setActiveTab } = useUIStore()

  const handleNavigation = (href: string, name: string) => {
    navigate({ to: href })
    setActiveTab(name.toLowerCase())
  }

  const handleLogout = () => {
    logout()
    navigate({ to: '/login' })
  }

  return (
    <>
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:inset-0
        `}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-primary-600">Nest</h1>
            <button
              onClick={toggleSidebar}
              className="lg:hidden text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href
              const Icon = item.icon
              return (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href, item.name)}
                  className={`
                    w-full flex items-center px-4 py-3 rounded-lg text-sm font-medium transition-colors
                    ${isActive 
                      ? 'bg-primary-50 text-primary-700' 
                      : 'text-gray-700 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon size={20} className="mr-3" />
                  {item.name}
                </button>
              )
            })}
          </nav>

          {/* User section */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center mb-4">
              <Avatar name={user ? `${user.firstName} ${user.lastName}` : 'User'} size="md" />
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">
                  {user ? `${user.firstName} ${user.lastName}` : 'User'}
                </p>
                <p className="text-xs text-gray-500">
                  {user?.email}
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <LogOut size={18} className="mr-2" />
              Sign out
            </button>
          </div>
        </div>
      </aside>
    </>
  )
}
