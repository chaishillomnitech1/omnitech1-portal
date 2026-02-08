import { useState, useEffect } from 'react'
import treasuryClient, { WealthGrid } from '../api/treasury-client'

function WealthGridMonitor() {
  const [grids, setGrids] = useState<WealthGrid[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      const data = await treasuryClient.getWealthGrids()
      setGrids(data)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load wealth grids:', error)
      setIsLoading(false)
    }
  }

  const getTimeUntilNextCycle = (nextCycle: number) => {
    const diff = nextCycle - Date.now()
    const hours = Math.floor(diff / 3600000)
    const minutes = Math.floor((diff % 3600000) / 60000)
    return `${hours}h ${minutes}m`
  }

  if (isLoading) {
    return <div className="component-loading">Loading Wealth Grids...</div>
  }

  return (
    <div className="wealth-grid-monitor">
      <h3>💎 Wealth Grid Monitor</h3>
      <p className="component-subtitle">Real-Time Compounding Cycles</p>
      
      <div className="grid-list">
        {grids.map((grid) => (
          <div key={grid.id} className={`grid-card status-${grid.cycleStatus}`}>
            <div className="grid-header">
              <h4>{grid.name}</h4>
              <span className={`cycle-badge ${grid.cycleStatus}`}>
                {grid.cycleStatus.toUpperCase()}
              </span>
            </div>
            
            <div className="grid-stats">
              <div className="grid-stat">
                <span className="stat-label">Balance</span>
                <span className="stat-value">{grid.balance}</span>
              </div>
              <div className="grid-stat">
                <span className="stat-label">APR</span>
                <span className="stat-value rate">{grid.compoundingRate}%</span>
              </div>
              <div className="grid-stat">
                <span className="stat-label">Participants</span>
                <span className="stat-value">{grid.participants}</span>
              </div>
              <div className="grid-stat">
                <span className="stat-label">Next Cycle</span>
                <span className="stat-value time">{getTimeUntilNextCycle(grid.nextCycle)}</span>
              </div>
            </div>
            
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${((Date.now() - grid.lastCycle) / (grid.nextCycle - grid.lastCycle)) * 100}%` 
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WealthGridMonitor
