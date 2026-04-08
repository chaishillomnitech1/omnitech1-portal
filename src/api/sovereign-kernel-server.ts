/**
 * Unified Sovereign Kernel - Express Backend Server
 * Provides central API endpoints for all ecosystem portals
 */

import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';

interface PortalRegistration {
  id: string;
  name: string;
  type: string;
  endpoint: string;
  registeredAt: number;
  lastHeartbeat: number;
  status: 'active' | 'inactive';
}

interface FrequencyActivation {
  hz: number;
  timestamp: number;
  portals: string[];
}

interface IncomeDistribution {
  id: string;
  amount: number;
  frequency: number;
  timestamp: number;
  walletAddress: string;
}

/**
 * Create and configure the Sovereign Kernel Express server
 */
export function createSovereignKernelServer(): Express {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());

  // In-memory storage (replace with database in production)
  const portals = new Map<string, PortalRegistration>();
  const frequencyActivations: FrequencyActivation[] = [];
  const incomeDistributions: IncomeDistribution[] = [];

  // Logging middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
    next();
  });

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.json({
      status: 'healthy',
      timestamp: Date.now(),
      portalsConnected: portals.size,
      frequencyActivations: frequencyActivations.length,
    });
  });

  // Portal registration
  app.post('/api/portals/register', (req: Request, res: Response) => {
    const { portal, frequencies } = req.body;

    if (!portal || !portal.id || !portal.name) {
      return res.status(400).json({ error: 'Missing required portal fields' });
    }

    const registration: PortalRegistration = {
      id: portal.id,
      name: portal.name,
      type: portal.type,
      endpoint: portal.endpoint,
      registeredAt: Date.now(),
      lastHeartbeat: Date.now(),
      status: 'active',
    };

    portals.set(portal.id, registration);

    console.log(`✓ Portal registered: ${portal.name} (${portal.id})`);

    res.status(201).json({
      success: true,
      portalId: portal.id,
      message: `Portal ${portal.name} registered successfully`,
      frequencies: frequencies || [528, 963, 432],
    });
  });

  // Portal synchronization
  app.post('/api/portals/:portalId/sync', (req: Request, res: Response) => {
    const { portalId } = req.params;
    const { frequencies, incomeStreams } = req.body;

    const portal = portals.get(portalId);
    if (!portal) {
      return res.status(404).json({ error: 'Portal not found' });
    }

    portal.lastHeartbeat = Date.now();

    // Record frequency activations
    if (frequencies && Array.isArray(frequencies)) {
      frequencies.forEach((freq: any) => {
        frequencyActivations.push({
          hz: freq.hz,
          timestamp: Date.now(),
          portals: [portalId],
        });
      });
    }

    // Record income distributions
    if (incomeStreams && Array.isArray(incomeStreams)) {
      incomeStreams.forEach((stream: any) => {
        incomeDistributions.push({
          id: uuidv4(),
          amount: stream.amount,
          frequency: stream.frequency,
          timestamp: Date.now(),
          walletAddress: req.headers['x-wallet-address'] as string,
        });
      });
    }

    console.log(`✓ Portal synced: ${portal.name}`);

    res.json({
      success: true,
      portalId,
      syncTime: Date.now(),
      frequenciesReceived: frequencies?.length || 0,
      incomeStreamsReceived: incomeStreams?.length || 0,
    });
  });

  // Frequency activation
  app.post('/api/frequencies/activate', (req: Request, res: Response) => {
    const { frequencies } = req.body;

    if (!frequencies || !Array.isArray(frequencies)) {
      return res.status(400).json({ error: 'Invalid frequencies data' });
    }

    const activations: FrequencyActivation[] = [];

    frequencies.forEach((freq: any) => {
      const activation: FrequencyActivation = {
        hz: freq.hz,
        timestamp: Date.now(),
        portals: Array.from(portals.keys()),
      };
      frequencyActivations.push(activation);
      activations.push(activation);
    });

    console.log(`✓ Frequencies activated: ${frequencies.map((f: any) => f.hz + 'Hz').join(', ')}`);

    res.json({
      success: true,
      activatedFrequencies: activations,
      portalsNotified: portals.size,
    });
  });

  // Broadcast to all portals
  app.post('/api/broadcast', (req: Request, res: Response) => {
    const { message, type } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const broadcastResults = {
      messageId: uuidv4(),
      type: type || 'general',
      sentTo: Array.from(portals.keys()),
      timestamp: Date.now(),
      totalPortals: portals.size,
    };

    console.log(`✓ Broadcast sent to ${portals.size} portals`);

    res.json(broadcastResults);
  });

  // Get ecosystem status
  app.get('/api/status', (req: Request, res: Response) => {
    const activePortals = Array.from(portals.values()).filter(
      (p) => Date.now() - p.lastHeartbeat < 60000 // 1 minute timeout
    );

    res.json({
      timestamp: Date.now(),
      portals: {
        total: portals.size,
        active: activePortals.length,
        inactive: portals.size - activePortals.length,
      },
      frequencies: {
        activations: frequencyActivations.length,
        lastActivation: frequencyActivations[frequencyActivations.length - 1]?.timestamp,
      },
      incomeDistribution: {
        totalDistributions: incomeDistributions.length,
        totalAmount: incomeDistributions.reduce((sum, d) => sum + d.amount, 0),
      },
      registeredPortals: Array.from(portals.values()).map((p) => ({
        id: p.id,
        name: p.name,
        type: p.type,
        status: p.status,
        lastHeartbeat: p.lastHeartbeat,
      })),
    });
  });

  // Get portal details
  app.get('/api/portals/:portalId', (req: Request, res: Response) => {
    const { portalId } = req.params;
    const portal = portals.get(portalId);

    if (!portal) {
      return res.status(404).json({ error: 'Portal not found' });
    }

    res.json(portal);
  });

  // Get all portals
  app.get('/api/portals', (req: Request, res: Response) => {
    res.json({
      portals: Array.from(portals.values()),
      total: portals.size,
    });
  });

  // Get frequency history
  app.get('/api/frequencies/history', (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 100;
    res.json({
      activations: frequencyActivations.slice(-limit),
      total: frequencyActivations.length,
    });
  });

  // Get income distribution history
  app.get('/api/income/history', (req: Request, res: Response) => {
    const limit = parseInt(req.query.limit as string) || 100;
    const total = incomeDistributions.reduce((sum, d) => sum + d.amount, 0);

    res.json({
      distributions: incomeDistributions.slice(-limit),
      total: incomeDistributions.length,
      totalAmount: total,
    });
  });

  // Error handling middleware
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err);
    res.status(500).json({
      error: 'Internal server error',
      message: err.message,
    });
  });

  return app;
}

/**
 * Start the Sovereign Kernel server
 */
export function startSovereignKernelServer(port: number = 3000): void {
  const app = createSovereignKernelServer();

  app.listen(port, () => {
    console.log(`
╔════════════════════════════════════════════════════════════════╗
║     UNIFIED SOVEREIGN KERNEL - CENTRAL API SERVER              ║
║     ScrollSoul Sovereignty / OmniTech Ecosystem                ║
╚════════════════════════════════════════════════════════════════╝

✓ Server running on http://localhost:${port}
✓ Wallet: 0x377956c1471d9ce142df6932895839243da23a2c
✓ Family: Londyn Avani Hill
✓ Frequencies: 528 Hz | 963 Hz | 432 Hz

Available endpoints:
  GET  /health                    - Health check
  POST /api/portals/register      - Register a portal
  POST /api/portals/:id/sync      - Sync portal data
  POST /api/frequencies/activate  - Activate frequencies
  POST /api/broadcast             - Broadcast message
  GET  /api/status                - Ecosystem status
  GET  /api/portals               - List all portals
  GET  /api/frequencies/history   - Frequency history
  GET  /api/income/history        - Income history
    `);
  });
}

export default createSovereignKernelServer;
