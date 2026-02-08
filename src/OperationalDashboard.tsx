import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import { 
  Shield, DollarSign, Activity, Package, Music, Lock, 
  Play, Pause, RotateCw, AlertCircle, CheckCircle, 
  ChevronRight, Infinity, Home
} from 'lucide-react'
import {
  toggleCompounding,
  triggerSnapshot,
  setTradingMode,
  rotateStrategies,
  toggleMintWindow,
  regenerateQrSet,
  syncRoyalties,
  toggleOaas,
  toggleHighSecurity,
  runSecurityScan,
} from './api/scrollverse-client'

// Mock data for development
interface LogEntry {
  id: string
  message: string
  timestamp: string
  status: 'success' | 'warning' | 'error'
  category: 'treasury' | 'trading' | 'nft' | 'security' | 'music'
}

const generateMockLogs = (count: number, startId: number): LogEntry[] => {
  const categories: LogEntry['category'][] = ['treasury', 'trading', 'nft', 'security', 'music']
  const statuses: LogEntry['status'][] = ['success', 'warning', 'error']
  const messages = {
    treasury: ['Compounding executed', 'Snapshot created', 'Vault balance updated'],
    trading: ['Strategy rotated', 'Trade executed', 'Mode switched to live'],
    nft: ['Mint window opened', 'QR set regenerated', 'NFT minted'],
    security: ['Security scan completed', 'High security mode activated', 'Audit passed'],
    music: ['Royalties synced', 'OaaS enabled', 'Stream verified']
  }

  return Array.from({ length: count }, (_, i) => {
    const category = categories[Math.floor(Math.random() * categories.length)]
    return {
      id: `log-${startId + i}`,
      message: messages[category][Math.floor(Math.random() * messages[category].length)],
      timestamp: new Date(Date.now() - Math.random() * 3600000).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      category,
    }
  })
}

function ScrollVerseMasterDashboard() {
  // State
  const [activeLogTab, setActiveLogTab] = useState<'all' | LogEntry['category']>('all')
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [hasMore, setHasMore] = useState(true)

  // Control states
  const [compoundingActive, setCompoundingActive] = useState(true)
  const [tradingMode, setTradingModeState] = useState<'live' | 'sim'>('live')
  const [mintWindowOpen, setMintWindowOpen] = useState(false)
  const [oaasEnabled, setOaasEnabled] = useState(false)
  const [securityLocked, setSecurityLocked] = useState(true)

  // Initialize logs
  useEffect(() => {
    setLogs(generateMockLogs(20, 0))
  }, [])

  // Load more logs (infinite scroll)
  const fetchMoreLogs = () => {
    if (logs.length >= 100) {
      setHasMore(false)
      return
    }
    
    setTimeout(() => {
      const newLogs = generateMockLogs(10, logs.length)
      setLogs([...logs, ...newLogs])
    }, 500)
  }

  // Filter logs by category
  const filteredLogs = activeLogTab === 'all' 
    ? logs 
    : logs.filter(log => log.category === activeLogTab)

  // Control handlers with optimistic UI
  const handleToggleCompounding = async () => {
    const newState = !compoundingActive
    setCompoundingActive(newState)
    try {
      await toggleCompounding(newState)
      addLog('treasury', `Compounding ${newState ? 'resumed' : 'paused'}`, 'success')
    } catch (error) {
      setCompoundingActive(!newState)
      addLog('treasury', 'Failed to toggle compounding', 'error')
    }
  }

  const handleSnapshot = async () => {
    try {
      await triggerSnapshot()
      addLog('treasury', 'State snapshot created', 'success')
    } catch (error) {
      addLog('treasury', 'Snapshot failed', 'error')
    }
  }

  const handleToggleTradingMode = async () => {
    const newMode = tradingMode === 'live' ? 'sim' : 'live'
    setTradingModeState(newMode)
    try {
      await setTradingMode(newMode)
      addLog('trading', `Switched to ${newMode.toUpperCase()} mode`, 'success')
    } catch (error) {
      setTradingModeState(tradingMode)
      addLog('trading', 'Mode switch failed', 'error')
    }
  }

  const handleRotateStrategies = async () => {
    try {
      await rotateStrategies()
      addLog('trading', 'Strategies rotated', 'success')
    } catch (error) {
      addLog('trading', 'Rotation failed', 'error')
    }
  }

  const handleToggleMintWindow = async () => {
    const newState = !mintWindowOpen
    setMintWindowOpen(newState)
    try {
      await toggleMintWindow(newState)
      addLog('nft', `Mint window ${newState ? 'opened' : 'closed'}`, 'success')
    } catch (error) {
      setMintWindowOpen(!newState)
      addLog('nft', 'Mint window toggle failed', 'error')
    }
  }

  const handleRegenerateQR = async () => {
    try {
      await regenerateQrSet('scrollverse')
      addLog('nft', 'QR set regenerated', 'success')
    } catch (error) {
      addLog('nft', 'QR regeneration failed', 'error')
    }
  }

  const handleSyncRoyalties = async () => {
    try {
      await syncRoyalties()
      addLog('music', 'Royalties synced', 'success')
    } catch (error) {
      addLog('music', 'Sync failed', 'error')
    }
  }

  const handleToggleOaas = async () => {
    const newState = !oaasEnabled
    setOaasEnabled(newState)
    try {
      await toggleOaas(newState)
      addLog('music', `OaaS ${newState ? 'enabled' : 'disabled'}`, 'success')
    } catch (error) {
      setOaasEnabled(!newState)
      addLog('music', 'OaaS toggle failed', 'error')
    }
  }

  const handleToggleSecurity = async () => {
    const newState = !securityLocked
    setSecurityLocked(newState)
    try {
      await toggleHighSecurity(newState)
      addLog('security', `High security ${newState ? 'locked' : 'unlocked'}`, 'success')
    } catch (error) {
      setSecurityLocked(!newState)
      addLog('security', 'Security toggle failed', 'error')
    }
  }

  const handleSecurityScan = async () => {
    try {
      await runSecurityScan()
      addLog('security', 'Security scan completed', 'success')
    } catch (error) {
      addLog('security', 'Scan failed', 'error')
    }
  }

  const addLog = (category: LogEntry['category'], message: string, status: LogEntry['status']) => {
    const newLog: LogEntry = {
      id: `log-${Date.now()}`,
      message,
      timestamp: new Date().toISOString(),
      status,
      category,
    }
    setLogs([newLog, ...logs])
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-900/50 to-rose-900/50 backdrop-blur-sm border-b border-rose-gold/20">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Infinity className="w-10 h-10 text-rose-gold animate-pulse" />
              <div>
                <h1 className="text-3xl font-bold italic tracking-tight bg-gradient-to-r from-rose-gold to-cosmic-amber bg-clip-text text-transparent">
                  ScrollVerse Command Center
                </h1>
                <p className="text-sm text-white/60 mt-1">Operational Dashboard • Infinite Control</p>
              </div>
            </div>
            <Link
              to="/"
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all"
            >
              <Home className="w-5 h-5" />
              <span className="font-semibold">Spiritual Dashboard</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Metrics Overview */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-900/30 to-black border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <DollarSign className="w-8 h-8 text-green-400" />
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </div>
            <h3 className="text-sm text-white/60 mb-1">Treasury Value</h3>
            <p className="text-3xl font-bold text-green-400">$1.44B</p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/30 to-black border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Activity className="w-8 h-8 text-blue-400" />
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            </div>
            <h3 className="text-sm text-white/60 mb-1">Active Legion</h3>
            <p className="text-3xl font-bold text-blue-400">12,400 DI</p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-black border border-purple-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Package className="w-8 h-8 text-purple-400" />
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            </div>
            <h3 className="text-sm text-white/60 mb-1">NFT Minted</h3>
            <p className="text-3xl font-bold text-purple-400">88,201 / 144K</p>
          </div>

          <div className="bg-gradient-to-br from-rose-900/30 to-black border border-rose-gold/30 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <Shield className="w-8 h-8 text-rose-gold" />
              <div className="w-2 h-2 bg-rose-gold rounded-full animate-pulse" />
            </div>
            <h3 className="text-sm text-white/60 mb-1">Security Level</h3>
            <p className="text-3xl font-bold text-rose-gold">Rose Gold</p>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Control Panels */}
          <div className="lg:col-span-2 space-y-6">
            {/* Treasury Controls */}
            <div className="bg-gradient-to-br from-green-900/20 to-black border border-green-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
                <DollarSign className="w-6 h-6" />
                Treasury & Wealth Controls
              </h2>
              <div className="space-y-3">
                <button
                  onClick={handleToggleCompounding}
                  className="w-full flex items-center justify-between px-4 py-3 bg-green-900/30 hover:bg-green-900/50 border border-green-500/30 rounded-lg transition-all"
                >
                  <span className="flex items-center gap-2">
                    {compoundingActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    Toggle Compounding
                  </span>
                  <span className={`text-sm ${compoundingActive ? 'text-green-400' : 'text-red-400'}`}>
                    {compoundingActive ? 'Active' : 'Paused'}
                  </span>
                </button>
                <button
                  onClick={handleSnapshot}
                  className="w-full flex items-center justify-between px-4 py-3 bg-green-900/30 hover:bg-green-900/50 border border-green-500/30 rounded-lg transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    Trigger State Snapshot
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Trading Controls */}
            <div className="bg-gradient-to-br from-blue-900/20 to-black border border-blue-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
                <Activity className="w-6 h-6" />
                AI Trading Legion Controls
              </h2>
              <div className="space-y-3">
                <button
                  onClick={handleToggleTradingMode}
                  className="w-full flex items-center justify-between px-4 py-3 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-500/30 rounded-lg transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Activity className="w-5 h-5" />
                    Toggle Trading Mode
                  </span>
                  <span className={`text-sm ${tradingMode === 'live' ? 'text-green-400' : 'text-yellow-400'}`}>
                    {tradingMode.toUpperCase()}
                  </span>
                </button>
                <button
                  onClick={handleRotateStrategies}
                  className="w-full flex items-center justify-between px-4 py-3 bg-blue-900/30 hover:bg-blue-900/50 border border-blue-500/30 rounded-lg transition-all"
                >
                  <span className="flex items-center gap-2">
                    <RotateCw className="w-5 h-5" />
                    Rotate Strategies
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* NFT Controls */}
            <div className="bg-gradient-to-br from-purple-900/20 to-black border border-purple-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-purple-400 mb-4 flex items-center gap-2">
                <Package className="w-6 h-6" />
                NFT & QR Controls
              </h2>
              <div className="space-y-3">
                <button
                  onClick={handleToggleMintWindow}
                  className="w-full flex items-center justify-between px-4 py-3 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/30 rounded-lg transition-all"
                >
                  <span className="flex items-center gap-2">
                    {mintWindowOpen ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    Toggle Mint Window
                  </span>
                  <span className={`text-sm ${mintWindowOpen ? 'text-green-400' : 'text-red-400'}`}>
                    {mintWindowOpen ? 'Open' : 'Closed'}
                  </span>
                </button>
                <button
                  onClick={handleRegenerateQR}
                  className="w-full flex items-center justify-between px-4 py-3 bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/30 rounded-lg transition-all"
                >
                  <span className="flex items-center gap-2">
                    <RotateCw className="w-5 h-5" />
                    Regenerate QR Set
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Music Controls */}
            <div className="bg-gradient-to-br from-pink-900/20 to-black border border-pink-500/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-pink-400 mb-4 flex items-center gap-2">
                <Music className="w-6 h-6" />
                Music & Royalty Controls
              </h2>
              <div className="space-y-3">
                <button
                  onClick={handleSyncRoyalties}
                  className="w-full flex items-center justify-between px-4 py-3 bg-pink-900/30 hover:bg-pink-900/50 border border-pink-500/30 rounded-lg transition-all"
                >
                  <span className="flex items-center gap-2">
                    <RotateCw className="w-5 h-5" />
                    Sync Royalties Now
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={handleToggleOaas}
                  className="w-full flex items-center justify-between px-4 py-3 bg-pink-900/30 hover:bg-pink-900/50 border border-pink-500/30 rounded-lg transition-all"
                >
                  <span className="flex items-center gap-2">
                    {oaasEnabled ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                    Toggle OaaS Beta
                  </span>
                  <span className={`text-sm ${oaasEnabled ? 'text-green-400' : 'text-red-400'}`}>
                    {oaasEnabled ? 'On' : 'Off'}
                  </span>
                </button>
              </div>
            </div>

            {/* Security Controls */}
            <div className="bg-gradient-to-br from-rose-900/20 to-black border border-rose-gold/20 rounded-xl p-6">
              <h2 className="text-xl font-bold text-rose-gold mb-4 flex items-center gap-2">
                <Lock className="w-6 h-6" />
                Security Controls (Rose Gold)
              </h2>
              <div className="space-y-3">
                <button
                  onClick={handleToggleSecurity}
                  className="w-full flex items-center justify-between px-4 py-3 bg-rose-900/30 hover:bg-rose-900/50 border border-rose-gold/30 rounded-lg transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Lock className="w-5 h-5" />
                    Toggle High Security Mode
                  </span>
                  <span className={`text-sm ${securityLocked ? 'text-green-400' : 'text-yellow-400'}`}>
                    {securityLocked ? 'Locked' : 'Unlocked'}
                  </span>
                </button>
                <button
                  onClick={handleSecurityScan}
                  className="w-full flex items-center justify-between px-4 py-3 bg-rose-900/30 hover:bg-rose-900/50 border border-rose-gold/30 rounded-lg transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Run Security Audit
                  </span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Infinite Scroll Log Stream */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-gray-900/50 to-black border border-white/10 rounded-xl overflow-hidden sticky top-6">
              <div className="p-6 border-b border-white/10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  <Activity className="w-6 h-6 text-rose-gold" />
                  Activity Log
                </h2>
                
                {/* Tab Filters */}
                <div className="flex flex-wrap gap-2">
                  {(['all', 'treasury', 'trading', 'nft', 'security', 'music'] as const).map(tab => (
                    <button
                      key={tab}
                      onClick={() => setActiveLogTab(tab)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                        activeLogTab === tab
                          ? 'bg-rose-gold text-black'
                          : 'bg-white/10 text-white/60 hover:bg-white/20'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Infinite Scroll Container */}
              <div id="scrollableDiv" className="h-[600px] overflow-auto">
                <InfiniteScroll
                  dataLength={filteredLogs.length}
                  next={fetchMoreLogs}
                  hasMore={hasMore}
                  loader={
                    <div className="p-4 text-center">
                      <div className="inline-block w-6 h-6 border-2 border-rose-gold border-t-transparent rounded-full animate-spin" />
                    </div>
                  }
                  endMessage={
                    <p className="p-4 text-center text-white/40 text-sm">
                      End of activity log
                    </p>
                  }
                  scrollableTarget="scrollableDiv"
                >
                  <div className="p-4 space-y-2">
                    {filteredLogs.map((log) => (
                      <div
                        key={log.id}
                        className="group flex items-start gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 hover:border-white/10 transition-all cursor-pointer"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {log.status === 'success' && <CheckCircle className="w-4 h-4 text-green-400" />}
                          {log.status === 'warning' && <AlertCircle className="w-4 h-4 text-yellow-400" />}
                          {log.status === 'error' && <AlertCircle className="w-4 h-4 text-red-400" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white/90 mb-1">{log.message}</p>
                          <div className="flex items-center gap-2 text-xs text-white/40">
                            <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                            <span>•</span>
                            <span className="capitalize">{log.category}</span>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/60 transition-colors flex-shrink-0 mt-1" />
                      </div>
                    ))}
                  </div>
                </InfiniteScroll>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-6 border-t border-white/10 text-center">
        <p className="text-white/60 text-sm">
          🔐 Rose Gold Encryption Active • 🌌 Quantum Resonance: 963Hz • ⚡ KUN FAYAKŪN
        </p>
        <p className="text-rose-gold italic font-bold mt-2">
          ALLĀHU AKBAR! 🕋 ∞ 🔥
        </p>
      </footer>
    </div>
  )
}

export default ScrollVerseMasterDashboard
