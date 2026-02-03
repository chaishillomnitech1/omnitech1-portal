import { useState } from 'react'
import './NFTConstellations.css'

interface NFT {
  id: number
  name: string
  constellation: string
  chain: string
  rarity: string
}

const nftCollection: NFT[] = [
  { id: 1, name: 'Cosmic Dragon', constellation: 'Draco', chain: 'Ethereum', rarity: 'Legendary' },
  { id: 2, name: 'Stellar Phoenix', constellation: 'Phoenix', chain: 'Scroll', rarity: 'Epic' },
  { id: 3, name: 'Nebula Serpent', constellation: 'Serpens', chain: 'LayerZero', rarity: 'Rare' },
  { id: 4, name: 'Galactic Lion', constellation: 'Leo', chain: 'Ethereum', rarity: 'Epic' },
  { id: 5, name: 'Andromeda Spirit', constellation: 'Andromeda', chain: 'Scroll', rarity: 'Legendary' },
  { id: 6, name: 'Orion Guardian', constellation: 'Orion', chain: 'LayerZero', rarity: 'Mythic' }
]

function NFTConstellations() {
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null)
  const [walletConnected, setWalletConnected] = useState(false)

  const connectWallet = () => {
    setWalletConnected(true)
  }

  return (
    <div className="nft-constellations">
      <div className="section-header">
        <h2>✨ NFT Constellations</h2>
        <p>Explore divine NFTs across celestial constellations and multi-chain networks</p>
      </div>

      <div className="wallet-section">
        {walletConnected ? (
          <div className="wallet-connected">
            <span className="status-indicator">🟢</span>
            <span>Wallet Connected: 0x742d...35Bc</span>
            <button className="wallet-btn secondary">Disconnect</button>
          </div>
        ) : (
          <button className="wallet-btn" onClick={connectWallet}>
            🔗 Connect Wallet (MetaMask)
          </button>
        )}
      </div>

      <div className="constellation-view">
        <div className="stars-background">
          {[...Array(50)].map((_, i) => (
            <div 
              key={i} 
              className="star" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        <div className="constellation-grid">
          {nftCollection.map(nft => (
            <div 
              key={nft.id} 
              className={`nft-card ${selectedNFT?.id === nft.id ? 'selected' : ''}`}
              onClick={() => setSelectedNFT(nft)}
            >
              <div className="nft-image">
                <div className="nft-placeholder">
                  <span className="nft-icon">🌌</span>
                </div>
              </div>
              <div className="nft-info">
                <h3>{nft.name}</h3>
                <div className="nft-meta">
                  <span className="constellation-tag">⭐ {nft.constellation}</span>
                  <span className={`rarity-badge ${nft.rarity.toLowerCase()}`}>
                    {nft.rarity}
                  </span>
                </div>
                <div className="chain-badge">{nft.chain}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedNFT && (
        <div className="nft-details">
          <h3>Selected NFT Details</h3>
          <div className="details-content">
            <p><strong>Name:</strong> {selectedNFT.name}</p>
            <p><strong>Constellation:</strong> {selectedNFT.constellation}</p>
            <p><strong>Blockchain:</strong> {selectedNFT.chain}</p>
            <p><strong>Rarity:</strong> {selectedNFT.rarity}</p>
            <div className="action-buttons">
              <button className="action-btn">View on Explorer</button>
              <button className="action-btn secondary">Bridge via LayerZero</button>
            </div>
          </div>
        </div>
      )}

      <div className="layerzero-info">
        <h3>🌉 Cross-Chain Bridge</h3>
        <p>Transfer your NFTs seamlessly across chains using LayerZero protocol</p>
        <div className="supported-chains">
          <span className="chain-tag">Ethereum</span>
          <span className="chain-tag">Scroll</span>
          <span className="chain-tag">Polygon</span>
          <span className="chain-tag">Arbitrum</span>
        </div>
      </div>
    </div>
  )
}

export default NFTConstellations
