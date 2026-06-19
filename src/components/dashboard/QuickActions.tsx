import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '../shared/Card'
import { Button } from '../shared/Button'
import { Plus, Upload, Download, RefreshCw } from '@tabler/icons-react'

interface QuickAction {
  label: string
  icon: React.ElementType
  onClick: () => void
}

export const QuickActions: React.FC = () => {
  const actions: QuickAction[] = [
    {
      label: 'Add Transaction',
      icon: Plus,
      onClick: () => {},
    },
    {
      label: 'Import Transactions',
      icon: Upload,
      onClick: () => {},
    },
    {
      label: 'Export Report',
      icon: Download,
      onClick: () => {},
    },
    {
      label: 'Refresh Data',
      icon: RefreshCw,
      onClick: () => {},
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {actions.map((action) => {
            const Icon = action.icon
            return (
              <Button
                key={action.label}
                variant="secondary"
                onClick={action.onClick}
                className="flex flex-col items-center justify-center py-6 space-y-2"
              >
                <Icon size={24} />
                <span className="text-sm">{action.label}</span>
              </Button>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
