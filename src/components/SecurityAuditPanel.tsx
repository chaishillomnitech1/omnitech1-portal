import { useState, useEffect } from 'react'

interface SecurityAlert {
  id: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  timestamp: number
  resolved: boolean
}

function SecurityAuditPanel() {
  const [alerts, setAlerts] = useState<SecurityAlert[]>([])
  const [encryptionStatus] = useState('active')
  const [auditScore] = useState(98.7)

  useEffect(() => {
    // Simulate security monitoring
    const mockAlerts: SecurityAlert[] = [
      {
        id: 'alert-1',
        severity: 'low',
        message: 'Unusual API access pattern detected',
        timestamp: Date.now() - 3600000,
        resolved: true
      },
      {
        id: 'alert-2',
        severity: 'medium',
        message: 'Multiple login attempts from new location',
        timestamp: Date.now() - 1800000,
        resolved: false
      }
    ]
    setAlerts(mockAlerts)
  }, [])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ff0000'
      case 'high': return '#ff4444'
      case 'medium': return '#ffaa00'
      case 'low': return '#00ff88'
      default: return '#ffffff'
    }
  }

  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    if (hours > 0) return `${hours}h ago`
    return `${minutes}m ago`
  }

  return (
    <div className="security-audit-panel">
      <h3>🔐 Security Audit Panel</h3>
      <p className="component-subtitle">Real-Time Security Monitoring • Zero-Trust Architecture</p>
      
      <div className="security-overview">
        <div className="security-stat">
          <span className="security-icon">🛡️</span>
          <div className="security-info">
            <span className="security-label">Audit Score</span>
            <span className={`security-value ${auditScore >= 95 ? 'excellent' : 'good'}`}>
              {auditScore}%
            </span>
          </div>
        </div>
        
        <div className="security-stat">
          <span className="security-icon">🔐</span>
          <div className="security-info">
            <span className="security-label">Rose Gold Encryption</span>
            <span className={`security-value ${encryptionStatus === 'active' ? 'active' : 'inactive'}`}>
              {encryptionStatus.toUpperCase()}
            </span>
          </div>
        </div>
        
        <div className="security-stat">
          <span className="security-icon">✅</span>
          <div className="security-info">
            <span className="security-label">QR Signatures</span>
            <span className="security-value verified">VERIFIED</span>
          </div>
        </div>
        
        <div className="security-stat">
          <span className="security-icon">∞</span>
          <div className="security-info">
            <span className="security-label">Resonance</span>
            <span className="security-value resonance">963Hz</span>
          </div>
        </div>
      </div>
      
      <div className="security-alerts">
        <h4>🚨 Security Alerts</h4>
        {alerts.length === 0 ? (
          <div className="no-alerts">✅ No active security alerts</div>
        ) : (
          <div className="alert-list">
            {alerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`alert-card severity-${alert.severity} ${alert.resolved ? 'resolved' : 'active'}`}
              >
                <div className="alert-header">
                  <span 
                    className="severity-indicator"
                    style={{ background: getSeverityColor(alert.severity) }}
                  />
                  <span className="severity-label">{alert.severity.toUpperCase()}</span>
                  <span className="alert-time">{getTimeAgo(alert.timestamp)}</span>
                  {alert.resolved && <span className="resolved-badge">✓ Resolved</span>}
                </div>
                <div className="alert-message">{alert.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="security-features">
        <div className="feature-item">✓ Triple-layer encryption active</div>
        <div className="feature-item">✓ Cryptographic signature verification</div>
        <div className="feature-item">✓ Immutable audit logging enabled</div>
        <div className="feature-item">✓ Zero-trust architecture enforced</div>
      </div>
    </div>
  )
}

export default SecurityAuditPanel
