import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../shared/Card'
import { ArrowUpRight, ArrowDownRight, Minus } from '@tabler/icons-react'
import { formatCurrency } from '../../lib/utils'

interface KPI {
  label: string
  value: string
  change: number
  period: string
}

export const KPISummary: React.FC = () => {
  const kpis: KPI[] = [
    {
      label: 'Total Revenue',
      value: formatCurrency(1250000),
      change: 12.5,
      period: 'vs last month',
    },
    {
      label: 'Total Expenses',
      value: formatCurrency(890000),
      change: -5.2,
      period: 'vs last month',
    },
    {
      label: 'Net Profit',
      value: formatCurrency(360000),
      change: 28.4,
      period: 'vs last month',
    },
    {
      label: 'Transaction Count',
      value: '1,234',
      change: 8.1,
      period: 'vs last month',
    },
  ]

  const getChangeIcon = (change: number) => {
    if (change > 0) return <ArrowUpRight size={16} className="text-success-600" />
    if (change < 0) return <ArrowDownRight size={16} className="text-danger-600" />
    return <Minus size={16} className="text-gray-600" />
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return 'text-success-600'
    if (change < 0) return 'text-danger-600'
    return 'text-gray-600'
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Key Performance Indicators</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{kpi.label}</p>
              <div className="flex items-center justify-between">
                <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                <div className="flex items-center space-x-1">
                  {getChangeIcon(kpi.change)}
                  <span className={`text-sm font-medium ${getChangeColor(kpi.change)}`}>
                    {Math.abs(kpi.change)}%
                  </span>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{kpi.period}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
