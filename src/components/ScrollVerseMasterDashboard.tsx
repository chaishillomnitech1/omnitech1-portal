import { useState, useEffect } from 'react'
import './ScrollVerseMasterDashboard.css'
import WealthGridMonitor from './WealthGridMonitor'
import AITradingLegion from './AITradingLegion'
import NFTMintTracker from './NFTMintTracker'
import MusicRoyaltyStream from './MusicRoyaltyStream'
import DigitalMirrorTwin from './DigitalMirrorTwin'
import SecurityAuditPanel from './SecurityAuditPanel'
import QuantumAnalytics from './QuantumAnalytics'
import treasuryClient, { TreasuryStatus } from '../api/treasury-client'

function ScrollVerseMasterDashboard() {
  const [treasuryStatus, setTreasuryStatus] = useState<TreasuryStatus | null>(null)
  const [lastUpdate, setLastUpdate] = useState<number>(Date.now())
  const [isLoading, setIsLoading] = useState(true)

  // Load initial data
  useEffect(() => {
    loadDashboardData()
  }, [])

  // Set up auto-refresh every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      loadDashboardData()
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const loadDashboardData = async () => {
    try {
      const status = await treasuryClient.getStatus()
      setTreasuryStatus(status)
      setLastUpdate(Date.now())
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load dashboard data:', error)
      setIsLoading(false)
    }
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString()
  }

  return (
    <div className="scrollverse-dashboard">
      <div className="dashboard-header">
        <div className="header-title">
          <span className="infinity-icon">∞</span>
          <h1>ScrollVerse Master Dashboard</h1>
          <span className="infinity-icon">∞</span>
        </div>
        <p className="header-subtitle">
          Real-Time Sovereign Command Center • Quantum Analytics • Infinite Monitoring
        </p>
        <div className="header-status">
          <span className={`status-indicator ${isLoading ? 'loading' : 'active'}`}>
            {isLoading ? '⏳ Loading...' : '✅ Active'}
          </span>
          <span className="last-update">
            Last Update: {formatTimestamp(lastUpdate)}
          </span>
        </div>
      </div>

      {treasuryStatus && (
        <div className="treasury-overview-compact">
          <div className="compact-stat">
            <span className="compact-label">Vault Balance</span>
            <span className="compact-value">{treasuryStatus.vaultBalance}</span>
          </div>
          <div className="compact-stat">
            <span className="compact-label">Total Assets</span>
            <span className="compact-value">{treasuryStatus.totalAssets}</span>
          </div>
          <div className="compact-stat">
            <span className="compact-label">Asset Count</span>
            <span className="compact-value">{treasuryStatus.assetCount}</span>
          </div>
          <div className="compact-stat">
            <span className="compact-label">Status</span>
            <span className={`compact-value status-${treasuryStatus.status}`}>
              {treasuryStatus.status.toUpperCase()}
            </span>
          </div>
        </div>
      )}

      <div className="dashboard-grid">
        <div className="dashboard-panel">
          <WealthGridMonitor />
        </div>
        
        <div className="dashboard-panel">
          <AITradingLegion />
        </div>
        
        <div className="dashboard-panel">
          <NFTMintTracker />
        </div>
        
        <div className="dashboard-panel">
          <MusicRoyaltyStream />
        </div>
        
        <div className="dashboard-panel">
          <DigitalMirrorTwin />
        </div>
        
        <div className="dashboard-panel">
          <QuantumAnalytics />
        </div>
        
        <div className="dashboard-panel full-width">
          <SecurityAuditPanel />
        </div>
      </div>

      <div className="dashboard-footer">
        <p>🔐 Rose Gold Encryption Active • 🌌 Quantum Resonance: 963Hz • ⚡ KUN FAYAKŪN</p>
        <p className="footer-signature">ALLĀHU AKBAR! 🕋 ∞ 🔥</p>
      </div>
    </div>
  )
}

export default ScrollVerseMasterDashboard
