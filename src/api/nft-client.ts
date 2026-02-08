import scrollVerseAPI from './scrollverse-api'

/**
 * NFT Mint Event
 */
export interface NFTMintEvent {
  tokenId: string
  collectionName: string
  mintTimestamp: number
  owner: string
  qrSignature: string
  verified: boolean
  pioneerLegion: boolean
}

/**
 * QR Signature Status
 */
export interface QRSignatureStatus {
  totalSignatures: number
  verifiedSignatures: number
  pendingVerification: number
  failedVerification: number
  verificationRate: number
}

/**
 * Digital Mirror Twin
 */
export interface DigitalMirrorTwin {
  twinId: string
  owner: string
  syncStatus: 'synced' | 'syncing' | 'error'
  lastSync: number
  encryptionLevel: 'rose-gold' | 'standard'
  dataIntegrity: number
}

/**
 * Ownership Revenue Distribution
 */
export interface RevenueDistribution {
  totalRevenue: string
  distributedAmount: string
  pendingDistribution: string
  recipientCount: number
  lastDistribution: number
}

/**
 * NFT Workflow Event - tracks the full lifecycle history
 */
export interface NFTWorkflowEvent {
  id: string
  nftId: string
  eventType: 'mint' | 'transfer' | 'burn' | 'metadata_update' | 'revenue_distribution' | 'bridge' | 'generation'
  timestamp: number
  actor: string
  status: 'pending' | 'confirmed' | 'failed'
  transactionHash: string
  chain: 'ethereum' | 'tron' | 'scroll' | 'layerzero' | 'polygon' | 'arbitrum'
  metadata?: {
    from?: string
    to?: string
    amount?: string
    mediaUrl?: string
    generation?: number
  }
}

/**
 * Generational NFT Tracking - parent-child relationships
 */
export interface NFTGeneration {
  nftId: string
  generation: number
  parentNftId?: string
  childNftIds: string[]
  mutationHistory: string[]
  createdAt: number
  metadata: {
    traits: string[]
    evolutionPath: string
    multimedia: {
      images: string[]
      videos: string[]
      audio: string[]
    }
  }
}

/**
 * TRON Bridge Integration
 */
export interface TRONBridge {
  tronAddress: string
  ethereumAddress: string
  bridgedNFTs: Array<{
    nftId: string
    direction: 'eth-to-tron' | 'tron-to-eth'
    status: 'bridging' | 'completed' | 'failed'
    timestamp: number
  }>
  lastSyncTimestamp: number
  totalBridged: number
}

/**
 * Multimedia Asset Version
 */
export interface MultimediaVersion {
  versionId: string
  nftId: string
  assetType: 'image' | 'video' | 'audio' | '3d-model'
  url: string
  hash: string
  createdAt: number
  creator: string
  generation: number
}

/**
 * NFT & QR Systems Client
 */
class NFTClient {
  /**
   * Get NFT mint tracking data (144K Pioneer Legion)
   */
  async getMintTracking(): Promise<NFTMintEvent[]> {
    try {
      return await scrollVerseAPI.get<NFTMintEvent[]>('/api/nft/mint-tracking')
    } catch (error) {
      console.error('Failed to fetch NFT mint tracking:', error)
      // Return mock data for development
      return [
        {
          tokenId: 'PLN-0001',
          collectionName: 'Pioneer Legion',
          mintTimestamp: Date.now() - 3600000,
          owner: '0x1234...5678',
          qrSignature: 'QRS-144-001',
          verified: true,
          pioneerLegion: true
        },
        {
          tokenId: 'PLN-0002',
          collectionName: 'Pioneer Legion',
          mintTimestamp: Date.now() - 1800000,
          owner: '0xabcd...efgh',
          qrSignature: 'QRS-144-002',
          verified: true,
          pioneerLegion: true
        },
        {
          tokenId: 'PLN-0003',
          collectionName: 'Pioneer Legion',
          mintTimestamp: Date.now() - 900000,
          owner: '0x9876...4321',
          qrSignature: 'QRS-144-003',
          verified: false,
          pioneerLegion: true
        }
      ]
    }
  }

  /**
   * Get QR signature verification status
   */
  async getQRStatus(): Promise<QRSignatureStatus> {
    try {
      return await scrollVerseAPI.get<QRSignatureStatus>('/api/nft/qr-status')
    } catch (error) {
      console.error('Failed to fetch QR status:', error)
      // Return mock data for development
      return {
        totalSignatures: 144000,
        verifiedSignatures: 142847,
        pendingVerification: 987,
        failedVerification: 166,
        verificationRate: 99.2
      }
    }
  }

  /**
   * Get Digital Mirror Twin synchronization status
   */
  async getDigitalMirrorTwins(): Promise<DigitalMirrorTwin[]> {
    try {
      return await scrollVerseAPI.get<DigitalMirrorTwin[]>('/api/nft/mirror-twins')
    } catch (error) {
      console.error('Failed to fetch mirror twins:', error)
      // Return mock data for development
      return [
        {
          twinId: 'TWIN-001',
          owner: '0x1234...5678',
          syncStatus: 'synced',
          lastSync: Date.now() - 60000,
          encryptionLevel: 'rose-gold',
          dataIntegrity: 100
        },
        {
          twinId: 'TWIN-002',
          owner: '0xabcd...efgh',
          syncStatus: 'syncing',
          lastSync: Date.now() - 120000,
          encryptionLevel: 'rose-gold',
          dataIntegrity: 87
        }
      ]
    }
  }

  /**
   * Get ownership revenue distribution data
   */
  async getRevenueDistribution(): Promise<RevenueDistribution> {
    try {
      return await scrollVerseAPI.get<RevenueDistribution>('/api/nft/revenue-distribution')
    } catch (error) {
      console.error('Failed to fetch revenue distribution:', error)
      // Return mock data for development
      return {
        totalRevenue: '$487,234.56',
        distributedAmount: '$423,891.23',
        pendingDistribution: '$63,343.33',
        recipientCount: 8888,
        lastDistribution: Date.now() - 86400000
      }
    }
  }

  /**
   * Get NFT workflow history
   */
  async getWorkflowHistory(nftId?: string): Promise<NFTWorkflowEvent[]> {
    try {
      const endpoint = nftId ? `/api/nft/workflow/${nftId}` : '/api/nft/workflow'
      return await scrollVerseAPI.get<NFTWorkflowEvent[]>(endpoint)
    } catch (error) {
      console.error('Failed to fetch workflow history:', error)
      // Return mock data for development
      return [
        {
          id: 'WF-001',
          nftId: 'PLN-0001',
          eventType: 'mint',
          timestamp: Date.now() - 7200000,
          actor: '0x1234...5678',
          status: 'confirmed',
          transactionHash: '0xabc123...',
          chain: 'ethereum',
          metadata: {
            mediaUrl: 'ipfs://QmExample1'
          }
        },
        {
          id: 'WF-002',
          nftId: 'PLN-0001',
          eventType: 'transfer',
          timestamp: Date.now() - 3600000,
          actor: '0x1234...5678',
          status: 'confirmed',
          transactionHash: '0xdef456...',
          chain: 'ethereum',
          metadata: {
            from: '0x1234...5678',
            to: '0xabcd...efgh'
          }
        },
        {
          id: 'WF-003',
          nftId: 'PLN-0001',
          eventType: 'bridge',
          timestamp: Date.now() - 1800000,
          actor: '0xabcd...efgh',
          status: 'confirmed',
          transactionHash: '0xghi789...',
          chain: 'tron',
          metadata: {
            from: 'ethereum',
            to: 'tron'
          }
        }
      ]
    }
  }

  /**
   * Get NFT generational data
   */
  async getGenerationalData(nftId?: string): Promise<NFTGeneration[]> {
    try {
      const endpoint = nftId ? `/api/nft/generation/${nftId}` : '/api/nft/generation'
      return await scrollVerseAPI.get<NFTGeneration[]>(endpoint)
    } catch (error) {
      console.error('Failed to fetch generational data:', error)
      // Return mock data for development
      return [
        {
          nftId: 'PLN-0001',
          generation: 1,
          childNftIds: ['PLN-0002', 'PLN-0003'],
          mutationHistory: ['Gen1-Original'],
          createdAt: Date.now() - 86400000,
          metadata: {
            traits: ['Legendary', 'Cosmic', 'TRON-Enhanced'],
            evolutionPath: 'Genesis -> Enhanced -> Transcendent',
            multimedia: {
              images: ['ipfs://QmGen1Image1', 'ipfs://QmGen1Image2'],
              videos: ['ipfs://QmGen1Video'],
              audio: ['ipfs://QmGen1Audio']
            }
          }
        },
        {
          nftId: 'PLN-0002',
          generation: 2,
          parentNftId: 'PLN-0001',
          childNftIds: ['PLN-0004'],
          mutationHistory: ['Gen1-Original', 'Gen2-Enhanced'],
          createdAt: Date.now() - 43200000,
          metadata: {
            traits: ['Epic', 'Evolved', 'Multi-Chain'],
            evolutionPath: 'Genesis -> Enhanced',
            multimedia: {
              images: ['ipfs://QmGen2Image'],
              videos: ['ipfs://QmGen2Video'],
              audio: []
            }
          }
        }
      ]
    }
  }

  /**
   * Get TRON bridge status
   */
  async getTRONBridge(address?: string): Promise<TRONBridge> {
    try {
      const endpoint = address ? `/api/nft/tron-bridge/${address}` : '/api/nft/tron-bridge'
      return await scrollVerseAPI.get<TRONBridge>(endpoint)
    } catch (error) {
      console.error('Failed to fetch TRON bridge data:', error)
      // Return mock data for development
      return {
        tronAddress: 'TMQqJ8zZDJWV8dJVL3kLBxJGwWAZBmZ8J2',
        ethereumAddress: '0x1234...5678',
        bridgedNFTs: [
          {
            nftId: 'PLN-0001',
            direction: 'eth-to-tron',
            status: 'completed',
            timestamp: Date.now() - 1800000
          },
          {
            nftId: 'PLN-0005',
            direction: 'tron-to-eth',
            status: 'bridging',
            timestamp: Date.now() - 300000
          }
        ],
        lastSyncTimestamp: Date.now() - 60000,
        totalBridged: 42
      }
    }
  }

  /**
   * Get multimedia asset versions
   */
  async getMultimediaVersions(nftId: string): Promise<MultimediaVersion[]> {
    try {
      return await scrollVerseAPI.get<MultimediaVersion[]>(`/api/nft/multimedia/${nftId}`)
    } catch (error) {
      console.error('Failed to fetch multimedia versions:', error)
      // Return mock data for development
      return [
        {
          versionId: 'MV-001',
          nftId: 'PLN-0001',
          assetType: 'image',
          url: 'ipfs://QmImageV1',
          hash: '0xhash1...',
          createdAt: Date.now() - 7200000,
          creator: '0x1234...5678',
          generation: 1
        },
        {
          versionId: 'MV-002',
          nftId: 'PLN-0001',
          assetType: 'video',
          url: 'ipfs://QmVideoV1',
          hash: '0xhash2...',
          createdAt: Date.now() - 3600000,
          creator: '0x1234...5678',
          generation: 1
        },
        {
          versionId: 'MV-003',
          nftId: 'PLN-0001',
          assetType: 'image',
          url: 'ipfs://QmImageV2',
          hash: '0xhash3...',
          createdAt: Date.now() - 1800000,
          creator: '0xabcd...efgh',
          generation: 2
        }
      ]
    }
  }
}

// Export singleton instance
export const nftClient = new NFTClient()
export default nftClient
