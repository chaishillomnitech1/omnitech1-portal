import { useState, useEffect } from 'react'
import { nftClient, NFTWorkflowEvent, NFTGeneration, TRONBridge, MultimediaVersion } from '../api/nft-client'
import './NFTWorkflowHistory.css'

function NFTWorkflowHistory() {
  const [workflowEvents, setWorkflowEvents] = useState<NFTWorkflowEvent[]>([])
  const [generations, setGenerations] = useState<NFTGeneration[]>([])
  const [tronBridge, setTronBridge] = useState<TRONBridge | null>(null)
  const [selectedNftId, setSelectedNftId] = useState<string>('')
  const [multimediaVersions, setMultimediaVersions] = useState<MultimediaVersion[]>([])
  const [activeView, setActiveView] = useState<'timeline' | 'generations' | 'tron' | 'multimedia'>('timeline')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadAllData()
  }, [])

  const loadAllData = async () => {
    setLoading(true)
    try {
      const [events, gens, bridge] = await Promise.all([
        nftClient.getWorkflowHistory(),
        nftClient.getGenerationalData(),
        nftClient.getTRONBridge()
      ])
      setWorkflowEvents(events)
      setGenerations(gens)
      setTronBridge(bridge)
    } catch (error) {
      console.error('Failed to load NFT workflow data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadNFTDetails = async (nftId: string) => {
    setSelectedNftId(nftId)
    try {
      const [events, gens, media] = await Promise.all([
        nftClient.getWorkflowHistory(nftId),
        nftClient.getGenerationalData(nftId),
        nftClient.getMultimediaVersions(nftId)
      ])
      setWorkflowEvents(events)
      setGenerations(gens)
      setMultimediaVersions(media)
    } catch (error) {
      console.error('Failed to load NFT details:', error)
    }
  }

  const getEventIcon = (eventType: string) => {
    const icons: Record<string, string> = {
      mint: '🎨',
      transfer: '🔄',
      burn: '🔥',
      metadata_update: '📝',
      revenue_distribution: '💰',
      bridge: '🌉',
      generation: '🧬'
    }
    return icons[eventType] || '📋'
  }

  const getChainBadgeColor = (chain: string) => {
    const colors: Record<string, string> = {
      ethereum: '#627eea',
      tron: '#eb0029',
      scroll: '#ffeeda',
      layerzero: '#8a2be2',
      polygon: '#8247e5',
      arbitrum: '#28a0f0'
    }
    return colors[chain] || '#666'
  }

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="nft-workflow-loading">
        <div className="loading-spinner">∞</div>
        <p>Loading NFT Workflow Systems...</p>
      </div>
    )
  }

  return (
    <div className="nft-workflow-history">
      <div className="section-header">
        <h2>🌌 NFT Multimedia Digital Workflows</h2>
        <p>Complete history tracking, generational TRON systems, and multimedia versioning</p>
      </div>

      <div className="workflow-controls">
        <div className="view-selector">
          <button
            className={`view-btn ${activeView === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveView('timeline')}
          >
            📅 Workflow Timeline
          </button>
          <button
            className={`view-btn ${activeView === 'generations' ? 'active' : ''}`}
            onClick={() => setActiveView('generations')}
          >
            🧬 Generational Tree
          </button>
          <button
            className={`view-btn ${activeView === 'tron' ? 'active' : ''}`}
            onClick={() => setActiveView('tron')}
          >
            🌉 TRON Bridge
          </button>
          <button
            className={`view-btn ${activeView === 'multimedia' ? 'active' : ''}`}
            onClick={() => setActiveView('multimedia')}
          >
            🎬 Multimedia Versions
          </button>
        </div>

        <div className="nft-search">
          <input
            type="text"
            placeholder="Search NFT ID (e.g., PLN-0001)"
            value={selectedNftId}
            onChange={(e) => setSelectedNftId(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && selectedNftId && loadNFTDetails(selectedNftId)}
          />
          <button onClick={() => selectedNftId && loadNFTDetails(selectedNftId)}>
            🔍 Search
          </button>
        </div>
      </div>

      {activeView === 'timeline' && (
        <div className="workflow-timeline">
          <h3>Event Timeline</h3>
          <div className="timeline-container">
            {workflowEvents.map((event) => (
              <div key={event.id} className={`timeline-event ${event.status}`}>
                <div className="event-marker">
                  <span className="event-icon">{getEventIcon(event.eventType)}</span>
                </div>
                <div className="event-content">
                  <div className="event-header">
                    <h4>{event.eventType.replace(/_/g, ' ').toUpperCase()}</h4>
                    <span className={`status-badge ${event.status}`}>{event.status}</span>
                  </div>
                  <div className="event-details">
                    <p><strong>NFT:</strong> {event.nftId}</p>
                    <p><strong>Actor:</strong> {event.actor}</p>
                    <p><strong>Time:</strong> {formatTimestamp(event.timestamp)}</p>
                    <p><strong>TX:</strong> <code>{event.transactionHash}</code></p>
                    <span 
                      className="chain-badge"
                      style={{ backgroundColor: getChainBadgeColor(event.chain) }}
                    >
                      {event.chain}
                    </span>
                  </div>
                  {event.metadata && (
                    <div className="event-metadata">
                      {event.metadata.from && <p>From: {event.metadata.from}</p>}
                      {event.metadata.to && <p>To: {event.metadata.to}</p>}
                      {event.metadata.amount && <p>Amount: {event.metadata.amount}</p>}
                      {event.metadata.mediaUrl && <p>Media: {event.metadata.mediaUrl}</p>}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'generations' && (
        <div className="generational-tree">
          <h3>Generational Lineage</h3>
          <div className="generations-container">
            {generations.map((gen) => (
              <div key={gen.nftId} className={`generation-node gen-${gen.generation}`}>
                <div className="gen-header">
                  <h4>🧬 {gen.nftId}</h4>
                  <span className="gen-badge">Gen {gen.generation}</span>
                </div>
                <div className="gen-details">
                  {gen.parentNftId && (
                    <p><strong>Parent:</strong> {gen.parentNftId}</p>
                  )}
                  {gen.childNftIds.length > 0 && (
                    <p><strong>Children:</strong> {gen.childNftIds.join(', ')}</p>
                  )}
                  <p><strong>Evolution:</strong> {gen.metadata.evolutionPath}</p>
                  <div className="traits">
                    {gen.metadata.traits.map((trait, idx) => (
                      <span key={idx} className="trait-badge">{trait}</span>
                    ))}
                  </div>
                  <div className="mutation-history">
                    <strong>Mutations:</strong>
                    {gen.mutationHistory.map((mutation, idx) => (
                      <span key={idx} className="mutation">{mutation}</span>
                    ))}
                  </div>
                  <div className="multimedia-count">
                    <span>🖼️ {gen.metadata.multimedia.images.length}</span>
                    <span>🎥 {gen.metadata.multimedia.videos.length}</span>
                    <span>🎵 {gen.metadata.multimedia.audio.length}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'tron' && tronBridge && (
        <div className="tron-bridge-view">
          <h3>TRON Cross-Chain Bridge</h3>
          <div className="bridge-stats">
            <div className="stat-card">
              <div className="stat-icon">🌉</div>
              <div className="stat-content">
                <h4>Total Bridged</h4>
                <p className="stat-value">{tronBridge.totalBridged}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-content">
                <h4>Last Sync</h4>
                <p className="stat-value">{formatTimestamp(tronBridge.lastSyncTimestamp)}</p>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">🔗</div>
              <div className="stat-content">
                <h4>Active Bridges</h4>
                <p className="stat-value">{tronBridge.bridgedNFTs.length}</p>
              </div>
            </div>
          </div>
          
          <div className="bridge-addresses">
            <div className="address-pair">
              <div className="address-box ethereum">
                <span className="address-label">Ethereum</span>
                <code>{tronBridge.ethereumAddress}</code>
              </div>
              <div className="bridge-arrow">⟷</div>
              <div className="address-box tron">
                <span className="address-label">TRON</span>
                <code>{tronBridge.tronAddress}</code>
              </div>
            </div>
          </div>

          <div className="bridge-transactions">
            <h4>Bridge Transactions</h4>
            {tronBridge.bridgedNFTs.map((bridge, idx) => (
              <div key={idx} className={`bridge-tx ${bridge.status}`}>
                <div className="bridge-info">
                  <span className="nft-id">{bridge.nftId}</span>
                  <span className="direction">
                    {bridge.direction === 'eth-to-tron' ? '→ TRON' : '← Ethereum'}
                  </span>
                  <span className={`bridge-status ${bridge.status}`}>
                    {bridge.status}
                  </span>
                </div>
                <div className="bridge-time">
                  {formatTimestamp(bridge.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeView === 'multimedia' && (
        <div className="multimedia-versions">
          <h3>Multimedia Asset Versions</h3>
          {selectedNftId ? (
            <div className="versions-container">
              {multimediaVersions.map((version) => (
                <div key={version.versionId} className="version-card">
                  <div className="version-header">
                    <span className="asset-type">{version.assetType}</span>
                    <span className="gen-badge">Gen {version.generation}</span>
                  </div>
                  <div className="version-content">
                    <div className="asset-preview">
                      {version.assetType === 'image' && <div className="preview-icon">🖼️</div>}
                      {version.assetType === 'video' && <div className="preview-icon">🎥</div>}
                      {version.assetType === 'audio' && <div className="preview-icon">🎵</div>}
                      {version.assetType === '3d-model' && <div className="preview-icon">🎮</div>}
                    </div>
                    <div className="version-details">
                      <p><strong>Version ID:</strong> {version.versionId}</p>
                      <p><strong>Creator:</strong> {version.creator}</p>
                      <p><strong>Created:</strong> {formatTimestamp(version.createdAt)}</p>
                      <p><strong>URL:</strong> <code>{version.url}</code></p>
                      <p><strong>Hash:</strong> <code>{version.hash.slice(0, 20)}...</code></p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-selection">
              <p>🔍 Search for an NFT ID to view multimedia versions</p>
            </div>
          )}
        </div>
      )}

      <div className="workflow-footer">
        <div className="stats-summary">
          <div className="summary-item">
            <span className="label">Total Events:</span>
            <span className="value">{workflowEvents.length}</span>
          </div>
          <div className="summary-item">
            <span className="label">Generations:</span>
            <span className="value">{generations.length}</span>
          </div>
          <div className="summary-item">
            <span className="label">TRON Bridged:</span>
            <span className="value">{tronBridge?.totalBridged || 0}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NFTWorkflowHistory
