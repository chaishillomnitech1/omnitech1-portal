import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'https://infinitevault-api.scrollsoul.empire/api';

const client = axios.create({
  baseURL: API_BASE,
  headers: {
    'X-Rose-Gold-Signature': 'sovereign-auth-token',
  },
});

// Treasury Controls
export const toggleCompounding = (active: boolean) => 
  client.post('/treasury/compounding/toggle', { active });

export const triggerSnapshot = () => 
  client.post('/treasury/snapshot');

// Trading Controls
export const setTradingMode = (mode: 'live' | 'sim') => 
  client.post('/trading/mode', { mode });

export const rotateStrategies = () => 
  client.post('/trading/rotate');

// NFT Controls
export const toggleMintWindow = (open: boolean) => 
  client.post('/nft/mint-window', { open });

export const regenerateQrSet = (collection: string) => 
  client.post('/nft/qr-regenerate', { collection });

// Music Controls
export const syncRoyalties = () => 
  client.post('/music/sync');

export const toggleOaas = (enabled: boolean) => 
  client.post('/music/oaas', { enabled });

// Security Controls
export const toggleHighSecurity = (locked: boolean) => 
  client.post('/security/lock', { locked });

export const runSecurityScan = () => 
  client.post('/security/scan');

// Status Fetching
export const getDashboardStatus = () => 
  client.get('/status').then(res => res.data);
