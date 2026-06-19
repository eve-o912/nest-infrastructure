import React from 'react'
import { Menu, Bell, Search } from '@tabler/icons-react'
import { useUIStore } from '../../stores/uiStore'
import { Avatar } from '../Avatar'
import { useAuthStore } from '../../stores/authStore'

export const TopNav: React.FC = () => {
  const { toggleSidebar } = useUIStore()
  const { user } = useAuthStore()

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 h-16 flex items-center justify-between">
      {/* Mobile menu button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
      >
        <Menu size={24} className="text-gray-600" />
      </button>

      {/* Search */}
      <div className="hidden md:flex flex-1 max-w-lg mx-4">
        <div className="relative w-full">
          <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions, branches..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none"
          />
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="relative p-2 rounded-lg hover:bg-gray-100">
          <Bell size={20} className="text-gray-600" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-danger-500 rounded-full"></span>
        </button>

        {/* User avatar */}
        <Avatar 
          name={user ? `${user.firstName} ${user.lastName}` : 'User'} 
          size="md"
          className="cursor-pointer"
        />
      </div>
    </header>
  )
}
