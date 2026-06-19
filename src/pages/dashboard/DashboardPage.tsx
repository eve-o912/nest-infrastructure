import React, { useEffect } from 'react'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from '@tanstack/react-router'
import { Sidebar } from '../../components/shared/Layout/Sidebar'
import { TopNav } from '../../components/shared/Layout/TopNav'
import { MobileNav } from '../../components/shared/Layout/MobileNav'
import { CashPositionCard } from '../../components/dashboard/CashPositionCard'
import { KPISummary } from '../../components/dashboard/KPISummary'
import { RecentTransactions } from '../../components/dashboard/RecentTransactions'
import { QuickActions } from '../../components/dashboard/QuickActions'
import { ManikkaAlertBanner } from '../../components/dashboard/ManikkaAlertBanner'
import { Alert } from '../../types/manikka'

export const DashboardPage: React.FC = () => {
  const { isAuthenticated, refreshUser } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate({ to: '/login' })
    } else {
      refreshUser()
    }
  }, [isAuthenticated, navigate, refreshUser])

  const mockAlerts: Alert[] = [
    {
      id: '1',
      type: 'low_cash',
      severity: 'warning',
      title: 'Low Cash Warning',
      message: 'Your cash position is projected to fall below KES 100,000 in 7 days.',
      actionRequired: true,
      dismissed: false,
      createdAt: new Date().toISOString(),
    },
  ]

  const handleDismissAlert = (id: string) => {
    console.log('Dismiss alert:', id)
  }

  const handleAlertAction = (alert: Alert) => {
    console.log('Take action on alert:', alert)
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1 flex flex-col lg:ml-64">
          <TopNav />
          <main className="flex-1 p-6 pb-24 lg:pb-6">
            <div className="max-w-7xl mx-auto">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here's your financial overview.</p>
              </div>

              <ManikkaAlertBanner
                alerts={mockAlerts}
                onDismiss={handleDismissAlert}
                onAction={handleAlertAction}
              />

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                <div className="lg:col-span-2 space-y-6">
                  <CashPositionCard />
                  <RecentTransactions />
                </div>
                <div className="space-y-6">
                  <KPISummary />
                  <QuickActions />
                </div>
              </div>
            </div>
          </main>
          <MobileNav />
        </div>
      </div>
    </div>
  )
}
