import { useState, useEffect } from 'react'
import musicClient, { UnifiedRevenueStream, SpotifyRoyaltyMetrics } from '../api/music-client'

function MusicRoyaltyStream() {
  const [revenue, setRevenue] = useState<UnifiedRevenueStream | null>(null)
  const [spotify, setSpotify] = useState<SpotifyRoyaltyMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadData()
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  const loadData = async () => {
    try {
      const [revenueData, spotifyData] = await Promise.all([
        musicClient.getUnifiedRevenue(),
        musicClient.getSpotifyMetrics()
      ])
      setRevenue(revenueData)
      setSpotify(spotifyData)
      setIsLoading(false)
    } catch (error) {
      console.error('Failed to load music data:', error)
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="component-loading">Loading Music Royalty Stream...</div>
  }

  return (
    <div className="music-royalty-stream">
      <h3>🎵 Music Royalty Stream</h3>
      <p className="component-subtitle">Music • Film • NFT Unified Revenue</p>
      
      {revenue && (
        <div className="revenue-overview">
          <div className="total-revenue">
            <span className="revenue-label">Total Revenue</span>
            <span className="revenue-value">{revenue.totalRevenue}</span>
            <span className={`revenue-growth ${revenue.growthRate > 0 ? 'positive' : 'negative'}`}>
              {revenue.growthRate > 0 ? '↑' : '↓'} {Math.abs(revenue.growthRate)}%
            </span>
          </div>
          
          <div className="revenue-breakdown">
            <div className="revenue-source music">
              <span className="source-icon">🎵</span>
              <div className="source-info">
                <span className="source-label">Music</span>
                <span className="source-value">{revenue.musicRevenue}</span>
              </div>
            </div>
            
            <div className="revenue-source film">
              <span className="source-icon">🎬</span>
              <div className="source-info">
                <span className="source-label">Film</span>
                <span className="source-value">{revenue.filmRevenue}</span>
              </div>
            </div>
            
            <div className="revenue-source nft">
              <span className="source-icon">✨</span>
              <div className="source-info">
                <span className="source-label">NFT</span>
                <span className="source-value">{revenue.nftRevenue}</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {spotify && (
        <div className="spotify-metrics">
          <h4>📊 Spotify Analytics</h4>
          <div className="spotify-stats">
            <div className="spotify-stat">
              <span className="stat-icon">▶️</span>
              <div className="stat-info">
                <span className="stat-label">Total Streams</span>
                <span className="stat-value">{spotify.totalStreams.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="spotify-stat">
              <span className="stat-icon">💰</span>
              <div className="stat-info">
                <span className="stat-label">Total Royalties</span>
                <span className="stat-value">{spotify.totalRoyalties}</span>
              </div>
            </div>
            
            <div className="spotify-stat">
              <span className="stat-icon">🎵</span>
              <div className="stat-info">
                <span className="stat-label">Top Track</span>
                <span className="stat-value track">{spotify.topTrack}</span>
              </div>
            </div>
            
            <div className="spotify-stat">
              <span className="stat-icon">📈</span>
              <div className="stat-info">
                <span className="stat-label">Avg per Stream</span>
                <span className="stat-value">{spotify.averagePerStream}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MusicRoyaltyStream
