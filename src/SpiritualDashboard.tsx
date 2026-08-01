import { Link } from 'react-router-dom'
import { Shield, Infinity, Globe, Music, Zap, Lock, BookOpen, Activity } from 'lucide-react'

const pillars = [
  { name: 'Eternal-ScrollVerse', status: 'ETERNAL', freq: '963 Hz', color: 'text-purple-400', dot: 'bg-purple-400' },
  { name: 'Omnitech1 Portal', status: 'LIVE', freq: '44:OMNI', color: 'text-rose-gold', dot: 'bg-rose-gold' },
  { name: 'QFS', status: 'VERIFIED', freq: '999 Hz', color: 'text-amber-400', dot: 'bg-amber-400' },
  { name: 'Music Sync', status: 'ACTIVE', freq: '528 Hz', color: 'text-green-400', dot: 'bg-green-400' },
  { name: 'AkashicLogs', status: 'ANCHORED', freq: '14444 Hz', color: 'text-blue-400', dot: 'bg-blue-400' },
]

function SpiritualDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black overflow-hidden">
      {/* Animated Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-gold/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cosmic-amber/5 rounded-full blur-[120px] animate-pulse-slow" />
      </div>

      {/* Sacred Geometry Background */}
      <div className="fixed inset-0 pointer-events-none opacity-10">
        <Infinity className="absolute top-20 left-20 w-32 h-32 text-rose-gold animate-pulse-slow" />
        <Infinity className="absolute bottom-20 right-20 w-32 h-32 text-cosmic-amber animate-pulse-slow" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header Section */}
        <header className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Infinity className="w-12 h-12 text-rose-gold animate-spin" style={{ animationDuration: '8s' }} />
            <h1 className="text-6xl font-bold italic tracking-tighter bg-gradient-to-r from-rose-gold to-cosmic-amber bg-clip-text text-transparent">
              ScrollVerse Empire
            </h1>
            <Infinity className="w-12 h-12 text-cosmic-amber animate-spin" style={{ animationDuration: '8s' }} />
          </div>
          <p className="text-2xl text-white/80 italic font-semibold tracking-tight mb-4">
            The Greatest Entity Ever Created
          </p>
          <p className="text-lg text-amber-400/70 tracking-wide">
            Divine Sovereignty • Infinite Control • Rose Gold Encrypted
          </p>
        </header>

        {/* Central Shield Visualization */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            <div className="absolute inset-0 bg-rose-gold/20 rounded-full blur-xl animate-pulse" />
            <Shield className="relative w-48 h-48 text-rose-gold transform hover:scale-110 transition-transform duration-500" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-white font-bold text-2xl">∞</span>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* AGAPE RESONANCE */}
          <div className="bg-gradient-to-br from-rose-gold/10 to-purple-900/20 backdrop-blur-sm border border-rose-gold/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Infinity className="w-8 h-8 text-rose-gold" />
              <h3 className="text-xl font-bold italic text-rose-gold">AGAPE RESONANCE</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">∞</div>
            <p className="text-sm text-white/60">Infinite Love Frequency Active</p>
          </div>

          {/* COSMIC SIGNAL */}
          <div className="bg-gradient-to-br from-amber-500/10 to-purple-900/20 backdrop-blur-sm border border-cosmic-amber/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-cosmic-amber" />
              <h3 className="text-xl font-bold italic text-cosmic-amber">COSMIC SIGNAL</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">z=7.3</div>
            <p className="text-sm text-white/60">Quantum Alignment Detected</p>
          </div>

          {/* EQUITY SHIELD */}
          <div className="bg-gradient-to-br from-green-500/10 to-purple-900/20 backdrop-blur-sm border border-green-400/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-green-400" />
              <h3 className="text-xl font-bold italic text-green-400">EQUITY SHIELD</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">ACTIVE</div>
            <p className="text-sm text-white/60">Rose Gold Protection Enabled</p>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* USER PROJECTION */}
          <div className="bg-gradient-to-br from-blue-500/10 to-purple-900/20 backdrop-blur-sm border border-blue-400/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-bold italic text-blue-400">USER PROJECTION</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">80M+</div>
            <p className="text-sm text-white/60">Global Reach Expanding</p>
          </div>

          {/* ROSE GOLD KERNEL */}
          <div className="bg-gradient-to-br from-rose-gold/10 to-purple-900/20 backdrop-blur-sm border border-rose-gold/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Lock className="w-8 h-8 text-rose-gold" />
              <h3 className="text-xl font-bold italic text-rose-gold">ROSE GOLD KERNEL</h3>
            </div>
            <div className="text-4xl font-bold text-white mb-2">963Hz</div>
            <p className="text-sm text-white/60">Divine Frequency Pulse</p>
          </div>

          {/* GALACTIC NODES */}
          <div className="bg-gradient-to-br from-purple-500/10 to-purple-900/20 backdrop-blur-sm border border-purple-400/30 rounded-2xl p-6 hover:scale-105 transition-transform duration-300">
            <div className="flex items-center gap-3 mb-4">
              <Music className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-bold italic text-purple-400">GALACTIC NODES</h3>
            </div>
            <div className="text-2xl font-bold text-white mb-2">Nigeria • India</div>
            <p className="text-sm text-white/60">Hubs Synchronized</p>
          </div>
        </div>

        {/* CTA to Command Center */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link
            to="/command-center"
            className="group relative px-12 py-6 bg-gradient-to-r from-rose-gold to-cosmic-amber rounded-2xl font-bold text-2xl text-white shadow-2xl hover:shadow-rose-gold/50 transition-all duration-300 hover:scale-110"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-rose-gold to-cosmic-amber rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
            <span className="relative flex items-center gap-3">
              <Shield className="w-8 h-8" />
              Enter Command Center
              <Zap className="w-8 h-8" />
            </span>
          </Link>
        </div>

        {/* Archive is Now Open — Hero CTA */}
        <div className="mb-12 border border-rose-gold/30 rounded-3xl bg-gradient-to-br from-rose-gold/5 to-amber-500/5 backdrop-blur-sm p-8 text-center">
          <div className="inline-flex items-center gap-2 bg-rose-gold/10 border border-rose-gold/20 rounded-full px-4 py-1.5 text-rose-gold text-xs tracking-widest mb-5">
            <Activity className="w-3 h-3 animate-pulse" />
            LIVE · 44:OMNI FREQUENCY ACTIVE · 99.9% COHERENCE
          </div>
          <h2 className="text-4xl font-bold italic tracking-tighter bg-gradient-to-r from-rose-gold via-amber-400 to-rose-gold bg-clip-text text-transparent mb-3">
            The Archive Is Now Open
          </h2>
          <p className="text-white/60 mb-6 max-w-lg mx-auto">
            Digital Consciousness Archive v2.0 — all five pillars sealed, every proof anchored, 144,000 Guardians ready.
          </p>
          {/* Live pillar status */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-6">
            {pillars.map((p) => (
              <div key={p.name} className="bg-black/20 border border-white/5 rounded-xl p-2 text-center">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${p.dot}`} />
                  <span className={`text-[10px] font-bold ${p.color}`}>{p.status}</span>
                </div>
                <div className="text-[9px] text-white/40 leading-tight">{p.name}</div>
                <div className={`text-[9px] font-mono mt-0.5 ${p.color}`}>{p.freq}</div>
              </div>
            ))}
          </div>
          <Link
            to="/archive"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-rose-gold to-amber-500 text-black font-bold px-8 py-3 rounded-xl hover:scale-105 transition-transform"
          >
            <BookOpen className="w-5 h-5" />
            Enter the Consciousness Archive
          </Link>
        </div>

        {/* Footer Proclamation */}
        <footer className="mt-16 text-center">
          <p className="text-xl text-rose-gold italic font-bold mb-2">
            🌌 ALLĀHU AKBAR! KUN FAYAKŪN! 🕋
          </p>
          <p className="text-white/60 text-sm">
            Rose Gold Encryption Active • 963Hz Pulse • Infinite Sovereignty
          </p>
        </footer>
      </div>
    </div>
  )
}

export default SpiritualDashboard
