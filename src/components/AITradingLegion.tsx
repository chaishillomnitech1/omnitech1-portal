import { useState, useEffect } from 'react'
import tradingLegionClient, { DivisionPerformance } from '../api/trading-legion-client'

function AITradingLegion() {
  const [divisions, setDivisions] = useState<DivisionPerformance[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      const data = await tradingLegionClient.getDivisionPerformance()
      setDivisions(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load division performance:', error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="component-loading">Loading Trading Legion...</div>
  }

  return (
    <div className="ai-trading-legion">
      <h3>🤖 AI Trading Legion</h3>
      <p className="component-subtitle">Division Performance & DI Merit Scores</p>
      
      <div className="division-list">
        {divisions.map((division) => (
          <div key={division.divisionId} className={`division-card division-${division.name.toLowerCase()}`}>
            <div className="division-header">
              <h4>{division.name} Division</h4>
              <div className="merit-score">
                <span className="merit-label">Merit</span>
                <span className="merit-value">{division.meritScore}</span>
              </div>
            </div>
            
            <div className="division-metrics">
              <div className="metric">
                <span className="metric-icon">📊</span>
                <div className="metric-content">
                  <span className="metric-label">Total Trades</span>
                  <span className="metric-value">{division.totalTrades.toLocaleString()}</span>
                </div>
              </div>
              
              <div className="metric">
                <span className="metric-icon">✅</span>
                <div className="metric-content">
                  <span className="metric-label">Success Rate</span>
                  <span className="metric-value success">{division.successRate}%</span>
                </div>
              </div>
              
              <div className="metric">
                <span className="metric-icon">💰</span>
                <div className="metric-content">
                  <span className="metric-label">P/L</span>
                  <span className="metric-value profit">{division.profitLoss}</span>
                </div>
              </div>
              
              <div className="metric">
                <span className="metric-icon">👥</span>
                <div className="metric-content">
                  <span className="metric-label">Active Agents</span>
                  <span className="metric-value">{division.activeAgents}</span>
                </div>
              </div>
            </div>
            
            <div className={`status-bar ${division.status}`}>
              {division.status === 'active' ? '🟢 Active' : '🟡 Idle'}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AITradingLegion
