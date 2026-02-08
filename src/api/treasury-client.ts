import scrollVerseAPI from './scrollverse-api'

/**
 * Treasury Status Response
 */
export interface TreasuryStatus {
  vaultBalance: string
  totalAssets: string
  assetCount: number
  lastUpdate: number
  status: 'active' | 'locked' | 'maintenance'
}

/**
 * Wealth Grid Data
 */
export interface WealthGrid {
  id: string
  name: string
  balance: string
  compoundingRate: number
  cycleStatus: 'active' | 'pending' | 'completed'
  lastCycle: number
  nextCycle: number
  participants: number
}

/**
 * Flash Economy Cycle
 */
export interface FlashCycle {
  cycleId: string
  startTime: number
  endTime: number
  totalCompounded: string
  participantCount: number
  apr: number
  status: 'running' | 'completed' | 'pending'
}

/**
 * Celestial Stability Metrics
 */
export interface CelestialMetrics {
  stabilityScore: number
  marketVolatility: number
  paretoEfficiency: number
  resonanceLevel: number
  lastUpdate: number
}

/**
 * Gemini Flash Node
 */
export interface GeminiNode {
  nodeId: string
  name: string
  status: 'online' | 'offline' | 'syncing'
  performance: number
  uptime: number
  lastPing: number
}

/**
 * Treasury & Wealth Systems Client
 */
class TreasuryClient {
  /**
   * Get real-time treasury vault balance
   */
  async getStatus(): Promise<TreasuryStatus> {
    try {
      return await scrollVerseAPI.get<TreasuryStatus>('/api/treasury/status')
    } catch (error) {
      console.error('Failed to fetch treasury status:', error)
      // Return mock data for development
      return {
        vaultBalance: '1,234,567.89 USDC',
        totalAssets: '2,500,000.00 USD',
        assetCount: 7,
        lastUpdate: Date.now(),
        status: 'active'
      }
    }
  }

  /**
   * Get all wealth grid statuses
   */
  async getWealthGrids(): Promise<WealthGrid[]> {
    try {
      return await scrollVerseAPI.get<WealthGrid[]>('/api/wealth-grids/all')
    } catch (error) {
      console.error('Failed to fetch wealth grids:', error)
      // Return mock data for development
      return [
        {
          id: 'grid-1',
          name: 'Alpha Grid',
          balance: '500,000 USDC',
          compoundingRate: 12.5,
          cycleStatus: 'active',
          lastCycle: Date.now() - 3600000,
          nextCycle: Date.now() + 3600000,
          participants: 144
        },
        {
          id: 'grid-2',
          name: 'Omega Grid',
          balance: '750,000 USDC',
          compoundingRate: 15.3,
          cycleStatus: 'active',
          lastCycle: Date.now() - 1800000,
          nextCycle: Date.now() + 5400000,
          participants: 216
        },
        {
          id: 'grid-3',
          name: 'Sigma Grid',
          balance: '320,000 USDC',
          compoundingRate: 10.8,
          cycleStatus: 'pending',
          lastCycle: Date.now() - 7200000,
          nextCycle: Date.now() + 600000,
          participants: 89
        }
      ]
    }
  }

  /**
   * Get flash economy compounding cycles
   */
  async getFlashCycles(): Promise<FlashCycle[]> {
    try {
      return await scrollVerseAPI.get<FlashCycle[]>('/api/flash-economy/cycles')
    } catch (error) {
      console.error('Failed to fetch flash cycles:', error)
      // Return mock data for development
      return [
        {
          cycleId: 'cycle-144',
          startTime: Date.now() - 86400000,
          endTime: Date.now() + 3600000,
          totalCompounded: '125,000 USDC',
          participantCount: 449,
          apr: 18.5,
          status: 'running'
        },
        {
          cycleId: 'cycle-143',
          startTime: Date.now() - 172800000,
          endTime: Date.now() - 86400000,
          totalCompounded: '118,500 USDC',
          participantCount: 432,
          apr: 17.8,
          status: 'completed'
        }
      ]
    }
  }

  /**
   * Get celestial stability metrics
   */
  async getCelestialMetrics(): Promise<CelestialMetrics> {
    try {
      return await scrollVerseAPI.get<CelestialMetrics>('/api/celestial-stability/metrics')
    } catch (error) {
      console.error('Failed to fetch celestial metrics:', error)
      // Return mock data for development
      return {
        stabilityScore: 94.7,
        marketVolatility: 12.3,
        paretoEfficiency: 88.9,
        resonanceLevel: 963,
        lastUpdate: Date.now()
      }
    }
  }

  /**
   * Get Gemini Flash planetary node statuses
   */
  async getGeminiNodes(): Promise<GeminiNode[]> {
    try {
      return await scrollVerseAPI.get<GeminiNode[]>('/api/gemini-flash/nodes')
    } catch (error) {
      console.error('Failed to fetch Gemini nodes:', error)
      // Return mock data for development
      return [
        {
          nodeId: 'node-mercury',
          name: 'Mercury Node',
          status: 'online',
          performance: 98.5,
          uptime: 99.9,
          lastPing: Date.now()
        },
        {
          nodeId: 'node-venus',
          name: 'Venus Node',
          status: 'online',
          performance: 97.2,
          uptime: 99.7,
          lastPing: Date.now() - 1000
        },
        {
          nodeId: 'node-mars',
          name: 'Mars Node',
          status: 'syncing',
          performance: 85.3,
          uptime: 98.5,
          lastPing: Date.now() - 5000
        }
      ]
    }
  }
}

// Export singleton instance
export const treasuryClient = new TreasuryClient()
export default treasuryClient
