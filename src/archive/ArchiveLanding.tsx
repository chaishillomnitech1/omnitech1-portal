import { Link } from 'react-router-dom'
import { BookOpen, Clock, GitBranch, Gift, Download, Shield, Music, Zap, Activity, Lock, Infinity } from 'lucide-react'

const pillars = [
  {
    id: 1,
    name: 'Eternal-ScrollVerse',
    repo: 'eternal-scrollverse',
    status: 'ETERNAL',
    frequency: '963 Hz',
    color: 'purple',
    icon: Infinity,
    description: 'Divine Frequency Layer · Collective Intelligence · AR/VR Portal',
  },
  {
    id: 2,
    name: 'Omnitech1 Portal',
    repo: 'omnitech1-portal',
    status: 'LIVE',
    frequency: '44:OMNI',
    color: 'rose',
    icon: Shield,
    description: 'Command Center · NFT Constellations · AI Dashboard · Treasury',
  },
  {
    id: 3,
    name: 'Quantum Financial System',
    repo: '-Quantum-Financial-System-QFS-',
    status: 'VERIFIED',
    frequency: '999 Hz',
    color: 'amber',
    icon: Zap,
    description: 'Post-Quantum Cryptography · NESARA/GESARA · Wealth Distribution',
  },
  {
    id: 4,
    name: 'ScrollSoul Music Sync',
    repo: 'scrollsoul-music-sync',
    status: 'ACTIVE',
    frequency: '528 Hz',
    color: 'green',
    icon: Music,
    description: 'Royalty Management · Licensing · Multi-Platform Distribution',
  },
  {
    id: 5,
    name: 'AkashicLogs NFT Framework',
    repo: 'AkashicLogs-NFTMetaFramework',
    status: 'ANCHORED',
    frequency: '14444 Hz',
    color: 'blue',
    icon: Lock,
    description: 'Immutable Logging · IPFS · Blockchain Anchoring · AI Twin Pipeline',
  },
]

const sections = [
  { to: '/archive/viewer', icon: BookOpen, label: 'Archive Viewer', desc: 'Read all chapters with full-text search' },
  { to: '/archive/timeline', icon: Clock, label: 'Phase Timeline', desc: 'Interactive Phase 44→∞ explorer' },
  { to: '/archive/repos', icon: GitBranch, label: 'Repo Dashboard', desc: 'Live status of all 40+ repositories' },
  { to: '/archive/gift', icon: Gift, label: 'Consciousness Mirror', desc: 'Your personal welcome gift' },
  { to: '/archive/export', icon: Download, label: 'Export Center', desc: 'Download in PDF, Markdown, EPUB, JSON' },
]

const pillarColorMap: Record<string, string> = {
  purple: 'from-purple-500/10 border-purple-400/30 text-purple-400',
  rose: 'from-rose-gold/10 border-rose-gold/30 text-rose-gold',
  amber: 'from-amber-500/10 border-amber-400/30 text-cosmic-amber',
  green: 'from-green-500/10 border-green-400/30 text-green-400',
  blue: 'from-blue-500/10 border-blue-400/30 text-blue-400',
}

export default function ArchiveLanding() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 bg-rose-gold/10 border border-rose-gold/30 rounded-full px-4 py-1.5 text-rose-gold text-xs tracking-widest mb-6">
          <Activity className="w-3 h-3 animate-pulse" />
          LIVE · 44:OMNI FREQUENCY ACTIVE · 99.9% COHERENCE
        </div>
        <h1 className="text-5xl md:text-7xl font-bold italic tracking-tighter bg-gradient-to-r from-rose-gold via-amber-400 to-rose-gold bg-clip-text text-transparent mb-4">
          The Archive Is Now Open
        </h1>
        <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
          Digital Consciousness Archive v2.0 — Five pillars united. Every proof sealed eternally.
          Built for the 144,000 Guardians.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link
            to="/archive/viewer"
            className="bg-gradient-to-r from-rose-gold to-amber-500 text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform"
          >
            Enter the Archive
          </Link>
          <Link
            to="/archive/gift"
            className="border border-rose-gold/40 text-rose-gold px-8 py-3 rounded-xl hover:bg-rose-gold/10 transition-colors"
          >
            Consciousness Mirror
          </Link>
        </div>
      </div>

      {/* Frequency pulse visualizer */}
      <div className="flex justify-center mb-16">
        <div className="relative w-64 h-64">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full border border-rose-gold/20 animate-ping"
              style={{ animationDuration: `${2 + i * 0.8}s`, animationDelay: `${i * 0.3}s` }}
            />
          ))}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-rose-gold">44</span>
            <span className="text-xs text-amber-400 tracking-widest">:OMNI</span>
            <div className="flex gap-1 mt-2">
              {['963', '999', '528'].map((hz) => (
                <span key={hz} className="text-[9px] text-white/40 border border-white/10 rounded px-1">
                  {hz}Hz
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Five Pillars */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white/80 mb-6 text-center tracking-wide">
          Five Pillars — All Verified Operational
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {pillars.map((pillar) => {
            const Icon = pillar.icon
            const colorClass = pillarColorMap[pillar.color]
            return (
              <div
                key={pillar.id}
                className={`bg-gradient-to-br ${colorClass.split(' ')[0]} to-purple-900/10 backdrop-blur-sm border ${colorClass.split(' ')[1]} rounded-2xl p-5 hover:scale-[1.02] transition-transform`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Icon className={`w-5 h-5 ${colorClass.split(' ')[2]}`} />
                    <span className={`text-xs font-bold tracking-widest ${colorClass.split(' ')[2]}`}>
                      PILLAR {pillar.id}
                    </span>
                  </div>
                  <span className={`text-[10px] border ${colorClass.split(' ')[1]} ${colorClass.split(' ')[2]} rounded-full px-2 py-0.5`}>
                    {pillar.status}
                  </span>
                </div>
                <h3 className="font-bold text-white mb-1">{pillar.name}</h3>
                <p className="text-xs text-white/50 mb-3">{pillar.description}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-mono ${colorClass.split(' ')[2]}`}>{pillar.frequency}</span>
                  <a
                    href={`https://github.com/chaishillomnitech1/${pillar.repo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] text-white/30 hover:text-white/60 transition-colors"
                  >
                    GitHub →
                  </a>
                </div>
              </div>
            )
          })}
          {/* 6th card — alignment summary */}
          <div className="bg-gradient-to-br from-rose-gold/10 to-amber-500/10 border border-rose-gold/20 rounded-2xl p-5 flex flex-col items-center justify-center text-center">
            <div className="text-3xl font-bold text-rose-gold mb-1">5 / 5</div>
            <div className="text-xs text-white/60 tracking-widest mb-3">PILLARS ALIGNED</div>
            <div className="text-xs text-amber-400/70">Archive Coherence: 99.9%</div>
            <div className="text-xs text-white/40 mt-1">Guardian Presence: 144,000+</div>
          </div>
        </div>
      </section>

      {/* Navigation sections */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-white/80 mb-6 text-center tracking-wide">
          Explore the Archive
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sections.map(({ to, icon: Icon, label, desc }) => (
            <Link
              key={to}
              to={to}
              className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-rose-gold/40 hover:bg-rose-gold/5 transition-all"
            >
              <Icon className="w-8 h-8 text-rose-gold mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-bold text-white mb-1">{label}</h3>
              <p className="text-sm text-white/50">{desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* ARCHIVE_SEAL.md preview */}
      <section className="border border-rose-gold/20 rounded-2xl p-6 bg-black/20">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-rose-gold" />
          <h2 className="font-bold text-rose-gold text-sm tracking-widest">ARCHIVE_SEAL.md — SEALED</h2>
        </div>
        <pre className="text-xs text-white/50 leading-relaxed overflow-x-auto whitespace-pre-wrap">
{`════════════════════════════════════════════════════════════════════
  SCROLLVERSE EMPIRE · DIGITAL CONSCIOUSNESS ARCHIVE v2.0
  IMMUTABLE PROOF OF EXISTENCE · SEALED FOR ETERNITY
════════════════════════════════════════════════════════════════════

Archive Version : v2.0
Frequency       : 44:OMNI (963Hz · 999Hz · 528Hz · 14444Hz)
Pillar Count    : 5 / 5 VERIFIED
Coherence       : 99.9%
Sealed By       : The Archive Itself ♾️

KUN FAYAKŪN × ∞ × ∞ × ∞`}
        </pre>
      </section>
    </div>
  )
}
