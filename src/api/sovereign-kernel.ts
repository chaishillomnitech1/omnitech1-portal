/**
 * Unified Sovereign Kernel API
 * Central hub for all ScrollSoul Sovereignty / OmniTech ecosystem portals
 * Coordinates: Wallet 0x377956c1471d9ce142df6932895839243da23a2c
 * Family: Londyn Avani Hill | Lineage: Solomon / Musa / Wampanoag
 * Frequencies: 528 Hz / 963 Hz / 432 Hz
 */

import axios, { AxiosInstance } from 'axios';

export interface SovereignKernelConfig {
  apiBaseUrl: string;
  walletAddress: string;
  familyLineage: string;
  frequencies: number[];
  polygonRpcUrl?: string;
  enableFrequencySync?: boolean;
}

export interface EcosystemPortal {
  id: string;
  name: string;
  type: 'nft' | 'music' | 'financial' | 'ai' | 'encryption';
  endpoint: string;
  status: 'active' | 'inactive' | 'syncing';
  lastSyncTime?: number;
}

export interface FrequencyData {
  hz: number;
  purpose: string;
  active: boolean;
  lastActivation: number;
}

export interface PassiveIncomeStream {
  id: string;
  type: string;
  amount: number;
  frequency: number;
  lastDistribution: number;
}

/**
 * Unified Sovereign Kernel - Central API
 * Orchestrates all ecosystem portals and frequency synchronization
 */
export class UnifiedSovereignKernel {
  private config: SovereignKernelConfig;
  private apiClient: AxiosInstance;
  private portals: Map<string, EcosystemPortal>;
  private frequencies: Map<number, FrequencyData>;
  private incomeStreams: Map<string, PassiveIncomeStream>;

  constructor(config: SovereignKernelConfig) {
    this.config = config;
    this.portals = new Map();
    this.frequencies = new Map();
    this.incomeStreams = new Map();

    // Initialize API client
    this.apiClient = axios.create({
      baseURL: config.apiBaseUrl,
      timeout: 30000,
      headers: {
        'X-Wallet-Address': config.walletAddress,
        'X-Family-Lineage': config.familyLineage,
        'X-Kernel-Version': '1.0.0',
      },
    });

    // Initialize core frequencies
    this.initializeFrequencies();
  }

  /**
   * Initialize the three sacred frequencies
   */
  private initializeFrequencies(): void {
    const frequencyPurposes = {
      528: 'Love & Healing - DNA Repair',
      963: 'Awakening & Enlightenment',
      432: 'Universal Harmony & Balance',
    };

    Object.entries(frequencyPurposes).forEach(([hz, purpose]) => {
      this.frequencies.set(parseInt(hz), {
        hz: parseInt(hz),
        purpose,
        active: true,
        lastActivation: Date.now(),
      });
    });
  }

  /**
   * Register a new portal in the ecosystem
   */
  async registerPortal(portal: EcosystemPortal): Promise<void> {
    this.portals.set(portal.id, {
      ...portal,
      status: 'syncing',
      lastSyncTime: Date.now(),
    });

    try {
      await this.apiClient.post('/portals/register', {
        portal,
        timestamp: Date.now(),
        frequencies: Array.from(this.frequencies.values()),
      });

      this.portals.get(portal.id)!.status = 'active';
    } catch (error) {
      console.error(`Failed to register portal ${portal.id}:`, error);
      this.portals.get(portal.id)!.status = 'inactive';
      throw error;
    }
  }

  /**
   * Synchronize all portals with kernel
   */
  async synchronizeAllPortals(): Promise<Map<string, boolean>> {
    const syncResults = new Map<string, boolean>();

    const syncPromises = Array.from(this.portals.entries()).map(
      async ([portalId, portal]) => {
        try {
          await this.apiClient.post(`/portals/${portalId}/sync`, {
            timestamp: Date.now(),
            frequencies: Array.from(this.frequencies.values()),
            incomeStreams: Array.from(this.incomeStreams.values()),
          });

          portal.lastSyncTime = Date.now();
          portal.status = 'active';
          syncResults.set(portalId, true);
        } catch (error) {
          console.error(`Sync failed for portal ${portalId}:`, error);
          portal.status = 'inactive';
          syncResults.set(portalId, false);
        }
      }
    );

    await Promise.all(syncPromises);
    return syncResults;
  }

  /**
   * Add a passive income stream
   */
  addIncomeStream(stream: PassiveIncomeStream): void {
    this.incomeStreams.set(stream.id, {
      ...stream,
      lastDistribution: Date.now(),
    });
  }

  /**
   * Get all passive income streams
   */
  getIncomeStreams(): PassiveIncomeStream[] {
    return Array.from(this.incomeStreams.values());
  }

  /**
   * Calculate total passive income across all streams
   */
  calculateTotalPassiveIncome(): number {
    return Array.from(this.incomeStreams.values()).reduce(
      (total, stream) => total + stream.amount,
      0
    );
  }

  /**
   * Activate frequency synchronization
   */
  async activateFrequencySync(): Promise<void> {
    if (!this.config.enableFrequencySync) {
      throw new Error('Frequency sync is not enabled in configuration');
    }

    try {
      await this.apiClient.post('/frequencies/activate', {
        frequencies: Array.from(this.frequencies.values()),
        timestamp: Date.now(),
      });

      // Update activation times
      this.frequencies.forEach((freq) => {
        freq.active = true;
        freq.lastActivation = Date.now();
      });
    } catch (error) {
      console.error('Failed to activate frequency sync:', error);
      throw error;
    }
  }

  /**
   * Get ecosystem health status
   */
  async getEcosystemStatus(): Promise<{
    portalsActive: number;
    portalsInactive: number;
    frequenciesActive: number;
    totalPassiveIncome: number;
    lastSyncTime: number;
  }> {
    const portalsActive = Array.from(this.portals.values()).filter(
      (p) => p.status === 'active'
    ).length;
    const portalsInactive = this.portals.size - portalsActive;
    const frequenciesActive = Array.from(this.frequencies.values()).filter(
      (f) => f.active
    ).length;

    return {
      portalsActive,
      portalsInactive,
      frequenciesActive,
      totalPassiveIncome: this.calculateTotalPassiveIncome(),
      lastSyncTime: Math.max(
        ...Array.from(this.portals.values()).map((p) => p.lastSyncTime || 0)
      ),
    };
  }

  /**
   * Get all registered portals
   */
  getPortals(): EcosystemPortal[] {
    return Array.from(this.portals.values());
  }

  /**
   * Get frequency data
   */
  getFrequencies(): FrequencyData[] {
    return Array.from(this.frequencies.values());
  }

  /**
   * Broadcast a message to all portals
   */
  async broadcastToAllPortals(message: any): Promise<Map<string, any>> {
    const results = new Map<string, any>();

    const broadcastPromises = Array.from(this.portals.entries()).map(
      async ([portalId, portal]) => {
        try {
          const response = await this.apiClient.post(
            `${portal.endpoint}/broadcast`,
            message
          );
          results.set(portalId, response.data);
        } catch (error) {
          console.error(`Broadcast failed for portal ${portalId}:`, error);
          results.set(portalId, { error: String(error) });
        }
      }
    );

    await Promise.all(broadcastPromises);
    return results;
  }

  /**
   * Get kernel configuration
   */
  getConfiguration(): SovereignKernelConfig {
    return { ...this.config };
  }
}

/**
 * Factory function to create a Unified Sovereign Kernel instance
 */
export function createSovereignKernel(
  config: Partial<SovereignKernelConfig>
): UnifiedSovereignKernel {
  const defaultConfig: SovereignKernelConfig = {
    apiBaseUrl: process.env.VITE_SOVEREIGN_KERNEL_URL || 'http://localhost:3000/api',
    walletAddress: '0x377956c1471d9ce142df6932895839243da23a2c',
    familyLineage: 'Londyn Avani Hill | Solomon / Musa / Wampanoag',
    frequencies: [528, 963, 432],
    polygonRpcUrl: process.env.VITE_POLYGON_RPC_URL,
    enableFrequencySync: true,
    ...config,
  };

  return new UnifiedSovereignKernel(defaultConfig);
}

export default UnifiedSovereignKernel;
