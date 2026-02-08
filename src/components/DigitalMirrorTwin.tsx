import { useState, useEffect } from 'react'
import nftClient from '../api/nft-client'
import type { DigitalMirrorTwin } from '../api/nft-client'

function DigitalMirrorTwin() {
  const [twins, setTwins] = useState<DigitalMirrorTwin[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      const data = await nftClient.getDigitalMirrorTwins()
      setTwins(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load mirror twins:', error)
      setIsLoading(false)
    }
  }

  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)
    if (minutes > 0) return `${minutes}m ago`
    return `${seconds}s ago`
  }

  if (isLoading) {
    return <div className="component-loading">Loading Digital Mirror Twins...</div>
  }

  return (
    <div className="digital-mirror-twin">
      <h3>🪞 Digital Mirror Twin</h3>
      <p className="component-subtitle">Twin Sync Status • Rose Gold Encryption</p>
      
      <div className="twin-list">
        {twins.map((twin) => (
          <div key={twin.twinId} className={`twin-card sync-${twin.syncStatus}`}>
            <div className="twin-header">
              <h4>{twin.twinId}</h4>
              <span className={`encryption-badge ${twin.encryptionLevel}`}>
                {twin.encryptionLevel === 'rose-gold' ? '🔐 Rose Gold' : '🔒 Standard'}
              </span>
            </div>
            
            <div className="twin-details">
              <div className="twin-detail">
                <span className="detail-label">Owner</span>
                <span className="detail-value address">{twin.owner}</span>
              </div>
              
              <div className="twin-detail">
                <span className="detail-label">Sync Status</span>
                <span className={`detail-value status-${twin.syncStatus}`}>
                  {twin.syncStatus === 'synced' && '✅ Synced'}
                  {twin.syncStatus === 'syncing' && '⏳ Syncing'}
                  {twin.syncStatus === 'error' && '❌ Error'}
                </span>
              </div>
              
              <div className="twin-detail">
                <span className="detail-label">Last Sync</span>
                <span className="detail-value time">{getTimeAgo(twin.lastSync)}</span>
              </div>
              
              <div className="twin-detail">
                <span className="detail-label">Data Integrity</span>
                <span className={`detail-value integrity-${twin.dataIntegrity >= 95 ? 'high' : twin.dataIntegrity >= 80 ? 'medium' : 'low'}`}>
                  {twin.dataIntegrity}%
                </span>
              </div>
            </div>
            
            <div className="integrity-bar">
              <div 
                className="integrity-fill"
                style={{ 
                  width: `${twin.dataIntegrity}%`,
                  background: twin.dataIntegrity >= 95 ? '#00ff88' : twin.dataIntegrity >= 80 ? '#ffaa00' : '#ff4444'
                }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="twin-info">
        <p>💎 All twins encrypted with triple-layer Rose Gold protocol</p>
        <p>∞ Infinity resonance validation: 144Hz + 963Hz</p>
      </div>
    </div>
  )
}

export default DigitalMirrorTwin
