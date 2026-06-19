import React, { useEffect } from 'react'
import { useCashStore } from '../../stores/cashStore'
import { Card, CardHeader, CardTitle, CardContent } from '../shared/Card'
import { LoadingSpinner } from '../shared/LoadingSpinner'
import { EmptyState } from '../shared/EmptyState'
import { Badge } from '../shared/Badge'
import { ArrowUpRight, ArrowDownRight, FolderOpen } from '@tabler/icons-react'
import { formatCurrency, formatRelativeTime } from '../../lib/utils'
import { Transaction } from '../../types/cash'

export const RecentTransactions: React.FC = () => {
  const { transactions, fetchTransactions, isLoading } = useCashStore()

  useEffect(() => {
    fetchTransactions({ limit: 5 })
  }, [fetchTransactions])

  const getTransactionIcon = (type: string) => {
    return type === 'inflow' ? ArrowUpRight : ArrowDownRight
  }

  const getTransactionColor = (type: string) => {
    return type === 'inflow' ? 'text-success-600 bg-success-50' : 'text-danger-600 bg-danger-50'
  }

  if (isLoading) {
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

  if (transactions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <EmptyState
            title="No transactions yet"
            description="Your transactions will appear here once you start recording them."
            action={{
              label: 'Add Transaction',
              onClick: () => {},
            }}
          />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.slice(0, 5).map((transaction: Transaction) => {
            const Icon = getTransactionIcon(transaction.type)
            const colorClass = getTransactionColor(transaction.type)
            
            return (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${colorClass.split(' ')[1]}`}>
                    <Icon size={20} className={colorClass.split(' ')[0]} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-sm text-gray-500">
                      {transaction.accountName} • {formatRelativeTime(transaction.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${transaction.type === 'inflow' ? 'text-success-600' : 'text-danger-600'}`}>
                    {transaction.type === 'inflow' ? '+' : '-'}
                    {formatCurrency(transaction.amount)}
                  </p>
                  <Badge variant={transaction.status === 'reconciled' ? 'success' : 'warning'} size="sm">
                    {transaction.status}
                  </Badge>
                </div>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
