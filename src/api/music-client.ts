import scrollVerseAPI from './scrollverse-api'

/**
 * Spotify Royalty Metrics
 */
export interface SpotifyRoyaltyMetrics {
  totalStreams: number
  totalRoyalties: string
  averagePerStream: string
  topTrack: string
  topTrackStreams: number
  lastHarvest: number
}

/**
 * NFT Token Behavior
 */
export interface NFTTokenBehavior {
  tokenId: string
  holdTime: number
  transferCount: number
  royaltiesEarned: string
  engagementScore: number
  status: 'active' | 'dormant' | 'trading'
}

/**
 * OaaS Status (Ownership-as-a-Service)
 */
export interface OaaSStatus {
  activeSubscriptions: number
  totalRevenue: string
  monthlyRecurring: string
  churnRate: number
  avgSubscriptionValue: string
  status: 'operational' | 'maintenance'
}

/**
 * Unified Revenue Stream
 */
export interface UnifiedRevenueStream {
  musicRevenue: string
  filmRevenue: string
  nftRevenue: string
  totalRevenue: string
  growthRate: number
  lastUpdate: number
}

/**
 * Music & Royalty Platform Client
 */
class MusicClient {
  /**
   * Get Spotify royalty harvesting metrics
   */
  async getSpotifyMetrics(): Promise<SpotifyRoyaltyMetrics> {
    try {
      return await scrollVerseAPI.get<SpotifyRoyaltyMetrics>('/api/music/spotify-royalties')
    } catch (error) {
      console.error('Failed to fetch Spotify metrics:', error)
      // Return mock data for development
      return {
        totalStreams: 1247893,
        totalRoyalties: '$24,957.86',
        averagePerStream: '$0.02',
        topTrack: 'Celestial Harmony (432 Hz)',
        topTrackStreams: 234567,
        lastHarvest: Date.now() - 3600000
      }
    }
  }

  /**
   * Get NFT token behavior tracking
   */
  async getTokenBehavior(): Promise<NFTTokenBehavior[]> {
    try {
      return await scrollVerseAPI.get<NFTTokenBehavior[]>('/api/music/token-behavior')
    } catch (error) {
      console.error('Failed to fetch token behavior:', error)
      // Return mock data for development
      return [
        {
          tokenId: 'MUSIC-001',
          holdTime: 7776000000, // 90 days in ms
          transferCount: 2,
          royaltiesEarned: '$234.56',
          engagementScore: 87,
          status: 'active'
        },
        {
          tokenId: 'MUSIC-002',
          holdTime: 15552000000, // 180 days in ms
          transferCount: 0,
          royaltiesEarned: '$567.89',
          engagementScore: 94,
          status: 'active'
        },
        {
          tokenId: 'MUSIC-003',
          holdTime: 2592000000, // 30 days in ms
          transferCount: 5,
          royaltiesEarned: '$123.45',
          engagementScore: 56,
          status: 'trading'
        }
      ]
    }
  }

  /**
   * Get OaaS (Ownership-as-a-Service) status
   */
  async getOaaSStatus(): Promise<OaaSStatus> {
    try {
      return await scrollVerseAPI.get<OaaSStatus>('/api/music/oaas-status')
    } catch (error) {
      console.error('Failed to fetch OaaS status:', error)
      // Return mock data for development
      return {
        activeSubscriptions: 1247,
        totalRevenue: '$487,234.00',
        monthlyRecurring: '$37,485.00',
        churnRate: 2.3,
        avgSubscriptionValue: '$30.05',
        status: 'operational'
      }
    }
  }

  /**
   * Get unified Music + Film + NFT revenue streams
   */
  async getUnifiedRevenue(): Promise<UnifiedRevenueStream> {
    try {
      return await scrollVerseAPI.get<UnifiedRevenueStream>('/api/music/unified-revenue')
    } catch (error) {
      console.error('Failed to fetch unified revenue:', error)
      // Return mock data for development
      return {
        musicRevenue: '$124,567.89',
        filmRevenue: '$87,234.56',
        nftRevenue: '$234,891.23',
        totalRevenue: '$446,693.68',
        growthRate: 23.7,
        lastUpdate: Date.now()
      }
    }
  }
}

// Export singleton instance
export const musicClient = new MusicClient()
export default musicClient
