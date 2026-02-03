import { useState } from 'react'
import './TreasuryAnalytics.css'

interface Asset {
  symbol: string
  name: string
  amount: string
  value: string
  allocation: number
}

function TreasuryAnalytics() {
  const [totalValue] = useState('$1,234,567')
  const [satPrice] = useState('$0.0042')
  const [satSupply] = useState('100,000,000')

  const assets: Asset[] = [
    { symbol: 'ETH', name: 'Ethereum', amount: '250', value: '$425,000', allocation: 35 },
    { symbol: 'BTC', name: 'Bitcoin', amount: '5', value: '$215,000', allocation: 18 },
    { symbol: 'USDC', name: 'USD Coin', amount: '300,000', value: '$300,000', allocation: 24 },
    { symbol: 'SAT', name: 'Sovereign Token', amount: '50M', value: '$210,000', allocation: 17 },
    { symbol: 'NFTs', name: 'NFT Assets', amount: '15', value: '$84,567', allocation: 6 }
  ]

  return (
    <div className="treasury-analytics">
      <div className="section-header">
        <h2>💰 $SAT Treasury Analytics</h2>
        <p>Real-time sovereign treasury management and blockchain analytics</p>
      </div>

      <div className="treasury-overview">
        <div className="stat-card primary">
          <div className="stat-icon">💎</div>
          <div className="stat-content">
            <div className="stat-label">Total Treasury Value</div>
            <div className="stat-value">{totalValue}</div>
            <div className="stat-change positive">+12.5% (24h)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🪙</div>
          <div className="stat-content">
            <div className="stat-label">$SAT Price</div>
            <div className="stat-value">{satPrice}</div>
            <div className="stat-change positive">+8.3% (24h)</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-label">Total Supply</div>
            <div className="stat-value">{satSupply}</div>
            <div className="stat-change neutral">Fixed</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-label">Market Cap</div>
            <div className="stat-value">$420,000</div>
            <div className="stat-change positive">+15.7% (24h)</div>
          </div>
        </div>
      </div>

      <div className="analytics-grid">
        <div className="panel allocation-panel">
          <h3>📈 Asset Allocation</h3>
          <div className="allocation-chart">
            {assets.map((asset, index) => (
              <div key={index} className="allocation-bar-container">
                <div className="allocation-info">
                  <span className="asset-name">{asset.symbol}</span>
                  <span className="asset-percent">{asset.allocation}%</span>
                </div>
                <div className="allocation-bar">
                  <div 
                    className="allocation-fill"
                    style={{ 
                      width: `${asset.allocation}%`,
                      background: `hsl(${index * 60}, 70%, 50%)`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pie-chart">
            <svg viewBox="0 0 200 200" className="pie-svg">
              {assets.reduce((acc, asset, index) => {
                const startAngle = acc.endAngle
                const endAngle = startAngle + (asset.allocation / 100) * 360
                const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180)
                const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180)
                const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180)
                const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180)
                const largeArc = asset.allocation > 50 ? 1 : 0
                
                return {
                  endAngle,
                  paths: [
                    ...acc.paths,
                    <path
                      key={index}
                      d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArc} 1 ${x2} ${y2} Z`}
                      fill={`hsl(${index * 60}, 70%, 50%)`}
                      opacity="0.8"
                      className="pie-slice"
                    />
                  ]
                }
              }, { endAngle: 0, paths: [] as React.ReactNode[] }).paths}
            </svg>
          </div>
        </div>

        <div className="panel assets-panel">
          <h3>💼 Asset Holdings</h3>
          <div className="assets-list">
            {assets.map((asset, index) => (
              <div key={index} className="asset-row">
                <div className="asset-icon" style={{ background: `hsl(${index * 60}, 70%, 50%)` }}>
                  {asset.symbol}
                </div>
                <div className="asset-details">
                  <div className="asset-name-full">{asset.name}</div>
                  <div className="asset-amount">{asset.amount}</div>
                </div>
                <div className="asset-value">{asset.value}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="blockchain-stats">
        <h3>⛓️ Blockchain Analytics</h3>
        <div className="blockchain-grid">
          <div className="blockchain-card">
            <h4>Ethereum Network</h4>
            <div className="blockchain-stat">
              <span>Transactions:</span>
              <span className="value">1,247</span>
            </div>
            <div className="blockchain-stat">
              <span>Gas Used:</span>
              <span className="value">2.4 ETH</span>
            </div>
            <div className="blockchain-stat">
              <span>Avg. Gas Price:</span>
              <span className="value">25 Gwei</span>
            </div>
          </div>

          <div className="blockchain-card">
            <h4>Scroll Network</h4>
            <div className="blockchain-stat">
              <span>L2 Transactions:</span>
              <span className="value">3,891</span>
            </div>
            <div className="blockchain-stat">
              <span>Bridge Volume:</span>
              <span className="value">125 ETH</span>
            </div>
            <div className="blockchain-stat">
              <span>Fee Savings:</span>
              <span className="value success">-95%</span>
            </div>
          </div>

          <div className="blockchain-card">
            <h4>LayerZero Bridge</h4>
            <div className="blockchain-stat">
              <span>Cross-chain Txs:</span>
              <span className="value">567</span>
            </div>
            <div className="blockchain-stat">
              <span>Total Bridged:</span>
              <span className="value">890 ETH</span>
            </div>
            <div className="blockchain-stat">
              <span>Chains Connected:</span>
              <span className="value">8</span>
            </div>
          </div>
        </div>
      </div>

      <div className="treasury-actions">
        <h3>⚡ Quick Actions</h3>
        <div className="actions-grid">
          <button className="action-btn">📥 Deposit Funds</button>
          <button className="action-btn">📤 Withdraw</button>
          <button className="action-btn">🔄 Rebalance</button>
          <button className="action-btn">📊 Generate Report</button>
        </div>
      </div>
    </div>
  )
}

export default TreasuryAnalytics
