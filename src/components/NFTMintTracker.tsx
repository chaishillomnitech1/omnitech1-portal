import { useState, useEffect } from 'react'
import nftClient, { NFTMintEvent, QRSignatureStatus } from '../api/nft-client'

function NFTMintTracker() {
  const [recentMints, setRecentMints] = useState<NFTMintEvent[]>([])
  const [qrStatus, setQrStatus] = useState<QRSignatureStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      const [mints, status] = await Promise.all([
        nftClient.getMintTracking(),
        nftClient.getQRStatus()
      ])
      setRecentMints(mints)
      setQrStatus(status)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load NFT data:', error)
      setIsLoading(false)
    }
  }

  const getTimeAgo = (timestamp: number) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    if (hours > 0) return `${hours}h ago`
    return `${minutes}m ago`
  }

  if (isLoading) {
    return <div className="component-loading">Loading NFT Tracker...</div>
  }

  return (
    <div className="nft-mint-tracker">
      <h3>✨ NFT Mint Tracker</h3>
      <p className="component-subtitle">144K Pioneer Legion • QR Signature Verification</p>
      
      {qrStatus && (
        <div className="qr-status-summary">
          <div className="qr-stat">
            <span className="qr-value">{qrStatus.totalSignatures.toLocaleString()}</span>
            <span className="qr-label">Total Signatures</span>
          </div>
          <div className="qr-stat success">
            <span className="qr-value">{qrStatus.verifiedSignatures.toLocaleString()}</span>
            <span className="qr-label">Verified</span>
          </div>
          <div className="qr-stat pending">
            <span className="qr-value">{qrStatus.pendingVerification.toLocaleString()}</span>
            <span className="qr-label">Pending</span>
          </div>
          <div className="qr-stat rate">
            <span className="qr-value">{qrStatus.verificationRate}%</span>
            <span className="qr-label">Verification Rate</span>
          </div>
        </div>
      )}
      
      <div className="recent-mints">
        <h4>Recent Mints</h4>
        <div className="mint-list">
          {recentMints.map((mint) => (
            <div key={mint.tokenId} className={`mint-card ${mint.verified ? 'verified' : 'unverified'}`}>
              <div className="mint-header">
                <span className="token-id">{mint.tokenId}</span>
                <span className={`verify-badge ${mint.verified ? 'verified' : 'pending'}`}>
                  {mint.verified ? '✓ Verified' : '⏳ Pending'}
                </span>
              </div>
              <div className="mint-details">
                <div className="mint-detail">
                  <span className="detail-label">Collection</span>
                  <span className="detail-value">{mint.collectionName}</span>
                </div>
                <div className="mint-detail">
                  <span className="detail-label">Owner</span>
                  <span className="detail-value address">{mint.owner}</span>
                </div>
                <div className="mint-detail">
                  <span className="detail-label">QR Signature</span>
                  <span className="detail-value signature">{mint.qrSignature}</span>
                </div>
                <div className="mint-detail">
                  <span className="detail-label">Minted</span>
                  <span className="detail-value time">{getTimeAgo(mint.mintTimestamp)}</span>
                </div>
              </div>
              {mint.pioneerLegion && (
                <div className="pioneer-badge">🏆 Pioneer Legion</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NFTMintTracker
