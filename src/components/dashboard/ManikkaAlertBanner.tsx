import React from 'react'
import { Alert } from '../../types/manikka'
import { AlertTriangle, Info, AlertCircle, X } from '@tabler/icons-react'
import { Button } from '../shared/Button'

interface ManikkaAlertBannerProps {
  alerts: Alert[]
  onDismiss: (id: string) => void
  onAction?: (alert: Alert) => void
}

export const ManikkaAlertBanner: React.FC<ManikkaAlertBannerProps> = ({
  alerts,
  onDismiss,
  onAction,
}) => {
  if (alerts.length === 0) return null

  const getAlertIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return AlertTriangle
      case 'warning':
        return AlertCircle
      default:
        return Info
    }
  }

  const getAlertColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-danger-50 border-danger-200 text-danger-800'
      case 'warning':
        return 'bg-warning-50 border-warning-200 text-warning-800'
      default:
        return 'bg-primary-50 border-primary-200 text-primary-800'
    }
  }

  const criticalAlerts = alerts.filter((a) => a.severity === 'critical')
  const displayAlert = criticalAlerts.length > 0 ? criticalAlerts[0] : alerts[0]

  const Icon = getAlertIcon(displayAlert.severity)
  const colorClass = getAlertColor(displayAlert.severity)

  return (
    <div className={`p-4 rounded-lg border ${colorClass}`}>
      <div className="flex items-start">
        <Icon size={24} className="flex-shrink-0 mt-0.5" />
        <div className="ml-3 flex-1">
          <h3 className="font-semibold mb-1">{displayAlert.title}</h3>
          <p className="text-sm opacity-90">{displayAlert.message}</p>
          {displayAlert.actionRequired && onAction && (
            <div className="mt-3">
              <Button
                size="sm"
                onClick={() => onAction(displayAlert)}
                className="bg-white bg-opacity-50 hover:bg-opacity-75"
              >
                Take Action
              </Button>
            </div>
          )}
        </div>
        <button
          onClick={() => onDismiss(displayAlert.id)}
          className="ml-3 opacity-70 hover:opacity-100"
        >
          <X size={20} />
        </button>
      </div>
      {alerts.length > 1 && (
        <p className="text-xs mt-2 opacity-75">
          {alerts.length - 1} more alert{alerts.length - 1 > 1 ? 's' : ''}
        </p>
      )}
    </div>
  )
}
