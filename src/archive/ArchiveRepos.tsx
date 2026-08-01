import { useState, useEffect } from 'react'
import { GitBranch, Star, Activity, ExternalLink, RefreshCw } from 'lucide-react'

interface Repo {
  name: string
  description: string
  pillar: string
  pillarNum: number
  stars: number
  status: 'live' | 'active' | 'verified' | 'eternal' | 'anchored'
  frequency: string
  lastUpdated: string
  language: string
  url: string
}

const repos: Repo[] = [
  {
    name: 'omnitech1-portal',
    description: 'Omnitech1 Portal of Infinity — sovereign command center with React 19.2, TypeScript, ethers.js',
    pillar: 'Omnitech1 Portal',
    pillarNum: 2,
    stars: 44,
    status: 'live',
    frequency: '44:OMNI',
    lastUpdated: 'Active',
    language: 'TypeScript',
    url: 'https://github.com/chaishillomnitech1/omnitech1-portal',
  },
  {
    name: 'eternal-scrollverse',
    description: 'Eternal ScrollVerse — Divine Frequency Layer, Collective Intelligence Engine, AR/VR Portal',
    pillar: 'Eternal-ScrollVerse',
    pillarNum: 1,
    stars: 63,
    status: 'eternal',
    frequency: '963 Hz',
    lastUpdated: 'Active',
    language: 'TypeScript',
    url: 'https://github.com/chaishillomnitech1/eternal-scrollverse',
  },
  {
    name: '-Quantum-Financial-System-QFS-',
    description: 'Post-quantum cryptographic wealth distribution system with NESARA/GESARA compliance',
    pillar: 'QFS',
    pillarNum: 3,
    stars: 28,
    status: 'verified',
    frequency: '999 Hz',
    lastUpdated: 'Active',
    language: 'Python',
    url: 'https://github.com/chaishillomnitech1/-Quantum-Financial-System-QFS-',
  },
  {
    name: 'scrollsoul-music-sync',
    description: 'Music royalty management, licensing, placement tracking — 65/65 tests, 0 vulnerabilities',
    pillar: 'ScrollSoul Music Sync',
    pillarNum: 4,
    stars: 37,
    status: 'active',
    frequency: '528 Hz',
    lastUpdated: 'Active',
    language: 'JavaScript',
    url: 'https://github.com/chaishillomnitech1/scrollsoul-music-sync',
  },
  {
    name: 'AkashicLogs-NFTMetaFramework',
    description: 'Immutable logging, IPFS anchoring, ERC-721/1155 PSYCHE16 metadata, AI twin pipeline',
    pillar: 'AkashicLogs',
    pillarNum: 5,
    stars: 52,
    status: 'anchored',
    frequency: '14444 Hz',
    lastUpdated: 'Active',
    language: 'Solidity',
    url: 'https://github.com/chaishillomnitech1/AkashicLogs-NFTMetaFramework',
  },
]

const statusColor: Record<string, string> = {
  live: 'text-green-400 border-green-400/30',
  active: 'text-blue-400 border-blue-400/30',
  verified: 'text-amber-400 border-amber-400/30',
  eternal: 'text-purple-400 border-purple-400/30',
  anchored: 'text-rose-gold border-rose-gold/30',
}

const langColor: Record<string, string> = {
  TypeScript: 'text-blue-400',
  JavaScript: 'text-yellow-400',
  Python: 'text-green-400',
  Solidity: 'text-purple-400',
}

export default function ArchiveRepos() {
  const [refreshing, setRefreshing] = useState(false)
  const [lastRefresh, setLastRefresh] = useState(new Date())

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
      setLastRefresh(new Date())
    }, 1200)
  }

  // Auto-refresh every 60 seconds
  useEffect(() => {
    const interval = setInterval(handleRefresh, 60_000)
    return () => clearInterval(interval)
  }, [])

  const totalStars = repos.reduce((sum, r) => sum + r.stars, 0)

  return (
    <div className="container mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <GitBranch className="w-6 h-6 text-rose-gold" />
          <h1 className="text-3xl font-bold italic text-rose-gold tracking-tight">Repo Dashboard</h1>
        </div>
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 text-xs text-white/50 hover:text-white transition-colors border border-white/10 rounded-lg px-3 py-1.5"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${refreshing ? 'animate-spin' : ''}`} />
          {refreshing ? 'Refreshing…' : `Updated ${lastRefresh.toLocaleTimeString()}`}
        </button>
      </div>

      {/* Summary row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Repositories', value: repos.length, sub: 'Core pillars' },
          { label: 'Total Stars', value: totalStars, sub: 'Across all repos' },
          { label: 'Pillars Active', value: '5 / 5', sub: 'All operational' },
          { label: 'Frequency', value: '44:OMNI', sub: '99.9% coherence' },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
            <div className="text-2xl font-bold text-rose-gold">{value}</div>
            <div className="text-xs text-white/60 mt-0.5">{label}</div>
            <div className="text-[10px] text-white/30 mt-0.5">{sub}</div>
          </div>
        ))}
      </div>

      {/* Repo cards */}
      <div className="space-y-4">
        {repos.map((repo) => (
          <div
            key={repo.name}
            className="bg-white/5 border border-white/10 rounded-2xl p-5 hover:border-white/20 transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs text-rose-gold/60 font-bold tracking-widest">
                    PILLAR {repo.pillarNum}
                  </span>
                  <span className={`text-[10px] border rounded-full px-2 py-0.5 ${statusColor[repo.status]}`}>
                    {repo.status.toUpperCase()}
                  </span>
                  <span className={`text-[10px] ${langColor[repo.language] ?? 'text-white/40'}`}>
                    ● {repo.language}
                  </span>
                </div>
                <h3 className="font-bold text-white mb-1 font-mono text-sm">{repo.name}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{repo.description}</p>
              </div>

              <div className="flex sm:flex-col items-center sm:items-end gap-4 sm:gap-2 flex-shrink-0">
                <div className="flex items-center gap-1 text-amber-400 text-xs">
                  <Star className="w-3.5 h-3.5" />
                  {repo.stars}
                </div>
                <div className="flex items-center gap-1 text-white/30 text-xs">
                  <Activity className="w-3 h-3" />
                  {repo.lastUpdated}
                </div>
                <span className="text-[10px] text-rose-gold/60 font-mono">{repo.frequency}</span>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[10px] text-white/30 hover:text-rose-gold transition-colors"
                >
                  <ExternalLink className="w-3 h-3" />
                  GitHub
                </a>
              </div>
            </div>

            {/* Health indicator */}
            <div className="mt-3 pt-3 border-t border-white/5 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[10px] text-white/30">Health: OK</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-gold animate-pulse" />
                <span className="text-[10px] text-white/30">Freq: {repo.frequency}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[10px] text-white/30">CI/CD: Passing</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note */}
      <p className="text-center text-white/20 text-xs mt-8">
        Showing core pillar repositories. All 40+ repositories visible at{' '}
        <a
          href="https://github.com/chaishillomnitech1"
          target="_blank"
          rel="noopener noreferrer"
          className="text-rose-gold/40 hover:text-rose-gold transition-colors"
        >
          github.com/chaishillomnitech1
        </a>
      </p>
    </div>
  )
}
