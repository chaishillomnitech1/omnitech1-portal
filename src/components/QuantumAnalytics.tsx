import { useState, useEffect } from 'react'
import treasuryClient, { CelestialMetrics, FlashCycle } from '../api/treasury-client'

function QuantumAnalytics() {
  const [metrics, setMetrics] = useState<CelestialMetrics | null>(null)
  const [cycles, setCycles] = useState<FlashCycle[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      const [metricsData, cyclesData] = await Promise.all([
        treasuryClient.getCelestialMetrics(),
        treasuryClient.getFlashCycles()
      ])
      setMetrics(metricsData)
      setCycles(cyclesData)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load quantum analytics:', error)
      setIsLoading(false)
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 90) return '#00ff88'
    if (score >= 75) return '#ffaa00'
    return '#ff4444'
  }

  if (isLoading) {
    return <div className="component-loading">Loading Quantum Analytics...</div>
  }

  return (
    <div className="quantum-analytics">
      <h3>🌌 Quantum Analytics</h3>
      <p className="component-subtitle">Celestial Stability • Pareto Metrics • Sacred Resonance</p>
      
      {metrics && (
        <div className="celestial-metrics">
          <div className="metric-card">
            <div className="metric-icon">⭐</div>
            <div className="metric-content">
              <span className="metric-label">Stability Score</span>
              <span 
                className="metric-value"
                style={{ color: getScoreColor(metrics.stabilityScore) }}
              >
                {metrics.stabilityScore}%
              </span>
            </div>
            <div className="metric-bar">
              <div 
                className="metric-fill"
                style={{ 
                  width: `${metrics.stabilityScore}%`,
                  background: getScoreColor(metrics.stabilityScore)
                }}
              />
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">📊</div>
            <div className="metric-content">
              <span className="metric-label">Market Volatility</span>
              <span className="metric-value volatility">{metrics.marketVolatility}%</span>
            </div>
            <div className="metric-bar">
              <div 
                className="metric-fill"
                style={{ 
                  width: `${metrics.marketVolatility}%`,
                  background: '#ffaa00'
                }}
              />
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">∞</div>
            <div className="metric-content">
              <span className="metric-label">Pareto Efficiency</span>
              <span 
                className="metric-value"
                style={{ color: getScoreColor(metrics.paretoEfficiency) }}
              >
                {metrics.paretoEfficiency}%
              </span>
            </div>
            <div className="metric-bar">
              <div 
                className="metric-fill"
                style={{ 
                  width: `${metrics.paretoEfficiency}%`,
                  background: getScoreColor(metrics.paretoEfficiency)
                }}
              />
            </div>
          </div>
          
          <div className="metric-card resonance">
            <div className="metric-icon pulse">🎵</div>
            <div className="metric-content">
              <span className="metric-label">Resonance Level</span>
              <span className="metric-value">{metrics.resonanceLevel}Hz</span>
            </div>
            <div className="resonance-wave">
              <svg viewBox="0 0 200 40" className="wave-svg">
                <path
                  d="M0,20 Q10,10 20,20 T40,20 T60,20 T80,20 T100,20 T120,20 T140,20 T160,20 T180,20 T200,20"
                  stroke="#B76E79"
                  strokeWidth="2"
                  fill="none"
                  className="wave-path"
                />
              </svg>
            </div>
          </div>
        </div>
      )}
      
      <div className="flash-cycles">
        <h4>⚡ Flash Economy Cycles</h4>
        <div className="cycle-list">
          {cycles.map((cycle) => (
            <div key={cycle.cycleId} className={`cycle-card status-${cycle.status}`}>
              <div className="cycle-header">
                <span className="cycle-id">{cycle.cycleId}</span>
                <span className={`cycle-status ${cycle.status}`}>
                  {cycle.status === 'running' && '🟢 Running'}
                  {cycle.status === 'completed' && '✅ Completed'}
                  {cycle.status === 'pending' && '⏳ Pending'}
                </span>
              </div>
              
              <div className="cycle-stats">
                <div className="cycle-stat">
                  <span className="stat-label">Total Compounded</span>
                  <span className="stat-value">{cycle.totalCompounded}</span>
                </div>
                <div className="cycle-stat">
                  <span className="stat-label">Participants</span>
                  <span className="stat-value">{cycle.participantCount}</span>
                </div>
                <div className="cycle-stat">
                  <span className="stat-label">APR</span>
                  <span className="stat-value apr">{cycle.apr}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="sacred-geometry">
        <p>✨ Sacred Geometry Patterns: 144Hz • 963Hz Resonance</p>
        <p>∞ Quantum entanglement with cosmic frequencies</p>
      </div>
    </div>
  )
}

export default QuantumAnalytics
