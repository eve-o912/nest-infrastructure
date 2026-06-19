import React, { useEffect } from 'react'
import { useCashStore } from '../../stores/cashStore'
import { Card, CardHeader, CardTitle, CardContent } from '../shared/Card'
import { LoadingSpinner } from '../shared/LoadingSpinner'
import { TrendingUp, TrendingDown, Wallet, BuildingBank, Phone } from '@tabler/icons-react'
import { formatCurrency } from '../../lib/utils'

export const CashPositionCard: React.FC = () => {
  const { cashPosition, fetchCashPosition, isLoading } = useCashStore()

  useEffect(() => {
    fetchCashPosition()
  }, [fetchCashPosition])

  if (isLoading || !cashPosition) {
    return (
      <Card>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <LoadingSpinner />
          </div>
        </CardContent>
      </Card>
    )
  }

  const metrics = [
    {
      label: 'Total Cash',
      value: cashPosition.totalCash,
      icon: Wallet,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      label: 'M-Pesa Balance',
      value: cashPosition.mpesaBalance,
      icon: Phone,
      color: 'text-success-600',
      bgColor: 'bg-success-50',
    },
    {
      label: 'Bank Balance',
      value: cashPosition.bankBalance,
      icon: BuildingBank,
      color: 'text-primary-600',
      bgColor: 'bg-primary-50',
    },
    {
      label: 'Cash on Hand',
      value: cashPosition.cashOnHand,
      icon: Wallet,
      color: 'text-warning-600',
      bgColor: 'bg-warning-50',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cash Position</CardTitle>
        <p className="text-sm text-gray-500">Last updated: {new Date(cashPosition.lastUpdated).toLocaleString()}</p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          {metrics.map((metric) => {
            const Icon = metric.icon
            return (
              <div key={metric.label} className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                  <Icon size={20} className={metric.color} />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(metric.value)}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="border-t border-gray-200 pt-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pending Inflows</span>
            <span className="text-sm font-medium text-success-600">
              +{formatCurrency(cashPosition.pendingInflows)}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">Pending Outflows</span>
            <span className="text-sm font-medium text-danger-600">
              -{formatCurrency(cashPosition.pendingOutflows)}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-sm font-medium text-gray-900">Available Cash</span>
            <span className="text-lg font-bold text-primary-600">
              {formatCurrency(cashPosition.availableCash)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
