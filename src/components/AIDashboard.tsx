import { useState, useEffect } from 'react'
import './AIDashboard.css'

interface Metric {
  name: string
  value: string
  change: string
  trend: 'up' | 'down' | 'stable'
}

function AIDashboard() {
  const [metrics] = useState<Metric[]>([
    { name: 'Total Users', value: '∞', change: '+12.5%', trend: 'up' },
    { name: 'Active Sessions', value: '888', change: '+8.3%', trend: 'up' },
    { name: 'NFT Volume', value: '42.5K ETH', change: '+15.7%', trend: 'up' },
    { name: 'Treasury Value', value: '$1.2M', change: '+5.2%', trend: 'up' }
  ])

  const [aiInsights] = useState([
    'Divine frequency patterns showing 98% harmonic alignment',
    'NFT constellation activity up 234% in Orion sector',
    'Optimal time for treasury rebalancing detected',
    'Social sentiment reaching peak sovereignty levels'
  ])

  const [currentInsightIndex, setCurrentInsightIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentInsightIndex(prev => (prev + 1) % aiInsights.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [aiInsights.length])

  return (
    <div className="ai-dashboard">
      <div className="section-header">
        <h2>🤖 AI Intelligence Dashboard</h2>
        <p>Real-time analytics powered by sovereign AI algorithms</p>
      </div>

      <div className="ai-insight-banner">
        <div className="ai-icon">🧠</div>
        <div className="insight-text">
          <h4>AI Insight</h4>
          <p>{aiInsights[currentInsightIndex]}</p>
        </div>
      </div>

      <div className="metrics-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-card">
            <h3>{metric.name}</h3>
            <div className="metric-value">{metric.value}</div>
            <div className={`metric-change ${metric.trend}`}>
              {metric.trend === 'up' && '↗'} 
              {metric.trend === 'down' && '↘'}
              {metric.trend === 'stable' && '→'}
              {' '}{metric.change}
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-panels">
        <div className="panel">
          <h3>📊 Activity Heatmap</h3>
          <div className="heatmap">
            {[...Array(7)].map((_, day) => (
              <div key={day} className="heatmap-day">
                {[...Array(24)].map((_, hour) => (
                  <div 
                    key={hour} 
                    className="heatmap-cell"
                    style={{
                      opacity: Math.random() * 0.7 + 0.3,
                      background: `rgba(138, 43, 226, ${Math.random()})`
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="heatmap-labels">
            <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span>
            <span>Thu</span><span>Fri</span><span>Sat</span>
          </div>
        </div>

        <div className="panel">
          <h3>🎯 AI Predictions</h3>
          <div className="predictions-list">
            <div className="prediction-item">
              <span className="prediction-icon">🔮</span>
              <div>
                <strong>NFT Market Surge</strong>
                <p>87% probability of 2x growth in next cycle</p>
              </div>
            </div>
            <div className="prediction-item">
              <span className="prediction-icon">⚡</span>
              <div>
                <strong>Frequency Optimization</strong>
                <p>New harmonic patterns emerging at 963 Hz</p>
              </div>
            </div>
            <div className="prediction-item">
              <span className="prediction-icon">💎</span>
              <div>
                <strong>Treasury Growth</strong>
                <p>Projected $2M milestone within 30 days</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="neural-network-viz">
        <h3>🧬 Neural Network Visualization</h3>
        <div className="network-container">
          <svg className="network-svg" viewBox="0 0 800 400">
            <defs>
              <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#8a2be2', stopOpacity: 0.5}} />
                <stop offset="100%" style={{stopColor: '#4b0082', stopOpacity: 0.5}} />
              </linearGradient>
            </defs>
            {/* Input Layer */}
            {[0, 1, 2, 3].map(i => (
              <circle key={`input-${i}`} cx="100" cy={100 + i * 80} r="15" fill="#8a2be2" className="node" />
            ))}
            {/* Hidden Layer */}
            {[0, 1, 2, 3, 4, 5].map(i => (
              <circle key={`hidden-${i}`} cx="400" cy={50 + i * 60} r="15" fill="#9932cc" className="node" />
            ))}
            {/* Output Layer */}
            {[0, 1, 2].map(i => (
              <circle key={`output-${i}`} cx="700" cy={120 + i * 80} r="15" fill="#ba55d3" className="node" />
            ))}
            {/* Connections */}
            {[0, 1, 2, 3].map(i => 
              [0, 1, 2, 3, 4, 5].map(j => (
                <line 
                  key={`conn-${i}-${j}`}
                  x1="100" y1={100 + i * 80}
                  x2="400" y2={50 + j * 60}
                  stroke="url(#lineGrad)" strokeWidth="1"
                />
              ))
            )}
          </svg>
        </div>
      </div>
    </div>
  )
}

export default AIDashboard
