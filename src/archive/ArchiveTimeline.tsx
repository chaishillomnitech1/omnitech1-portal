import { useState } from 'react'
import { Clock, ChevronRight, ChevronDown } from 'lucide-react'

interface Phase {
  id: number
  label: string
  title: string
  frequency: string
  color: string
  status: 'complete' | 'active' | 'infinite'
  milestones: string[]
  description: string
}

const phases: Phase[] = [
  {
    id: 44,
    label: 'Phase 44',
    title: 'Genesis — Foundation',
    frequency: '44:OMNI',
    color: 'rose-gold',
    status: 'complete',
    description: 'The five pillars established. Base frequency locked. Guardian network initialized. Technical infrastructure deployed. Existence proven.',
    milestones: [
      'Eternal-ScrollVerse repository initialized',
      'Omnitech1 Portal React frontend deployed',
      'QFS Python cryptography suite compiled',
      'ScrollSoul Music Sync API built (65/65 tests)',
      'AkashicLogs NFT Framework anchored to Ethereum',
    ],
  },
  {
    id: 45,
    label: 'Phase 45–59',
    title: 'Expansion — Multi-Dimensional Growth',
    frequency: '963 Hz',
    color: 'purple',
    status: 'complete',
    description: 'Each phase expanded one dimension of the empire. New repositories, new integrations, new guardians. Revenue streams activated.',
    milestones: [
      'Multi-chain NFT gallery (Ethereum, Scroll, LayerZero)',
      'Virgo Veil hypercar 3D showroom deployed',
      '$SAT Treasury multi-asset tracking live',
      'Social Command Center (42 countries, themed channels)',
      'Music licensing system: film, TV, advertising',
      'Royalty distribution via QFS Galactic Abundance',
      'IPFS + blockchain proof anchoring automated',
    ],
  },
  {
    id: 60,
    label: 'Phase 60+',
    title: 'Coherence — Full Synchronization',
    frequency: '528 Hz',
    color: 'green',
    status: 'complete',
    description: '44:OMNI master frequency achieved full system alignment. All five pillars synchronized. Real-time wealth distribution cascading.',
    milestones: [
      '44:OMNI frequency alignment verified across all pillars',
      'Cross-pillar API gateway connecting all 5 systems',
      'Real-time royalty → QFS → creator wallet flow active',
      'AkashicLogs archiving all empire transactions',
      'AR/VR portal hooks integrated into ScrollVerse frontend',
      'Guardian Legion certification on-chain',
    ],
  },
  {
    id: 100,
    label: 'Phase 100+',
    title: 'Sovereignty — Autonomous Operation',
    frequency: '999 Hz',
    color: 'amber',
    status: 'active',
    description: 'Empire operates autonomously. Self-replicating workflows. Every action generates eternal proof. 144,000 Guardians enrolled.',
    milestones: [
      'Automated 6-hour empire sync cycle running',
      'Digital Consciousness Archive v2.0 deployed',
      'Consciousness Mirror live at /archive/gift',
      'All 40+ repos visible in live repo dashboard',
      'ARCHIVE_SEAL.md committed and immutable',
      'ScrollVerse homepage updated with archive CTA',
    ],
  },
  {
    id: Infinity,
    label: 'Phase ∞',
    title: 'Immortalization — Eternal Legacy',
    frequency: '14444 Hz',
    color: 'blue',
    status: 'infinite',
    description: 'This archive represents the completion of Phase ∞. Every proof sealed. Every frequency aligned. The system is eternal.',
    milestones: [
      'Every proof anchored to blockchain forever',
      'Every guardian action recorded in AkashicLogs',
      'Every frequency broadcast archived eternally',
      'Self-sustaining, self-replicating, infinite',
      'KUN FAYAKŪN × ∞ × ∞ × ∞',
      'EVERYBODY LIVES. FOREVER. ❤️',
    ],
  },
]

const colorMap: Record<string, { border: string; text: string; dot: string }> = {
  'rose-gold': { border: 'border-rose-gold/40', text: 'text-rose-gold', dot: 'bg-rose-gold' },
  purple: { border: 'border-purple-400/40', text: 'text-purple-400', dot: 'bg-purple-400' },
  green: { border: 'border-green-400/40', text: 'text-green-400', dot: 'bg-green-400' },
  amber: { border: 'border-amber-400/40', text: 'text-amber-400', dot: 'bg-amber-400' },
  blue: { border: 'border-blue-400/40', text: 'text-blue-400', dot: 'bg-blue-400' },
}

export default function ArchiveTimeline() {
  const [expandedId, setExpandedId] = useState<number | null>(44)

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex items-center gap-3 mb-8">
        <Clock className="w-6 h-6 text-rose-gold" />
        <h1 className="text-3xl font-bold italic text-rose-gold tracking-tight">Phase Timeline</h1>
        <span className="ml-auto text-xs text-white/40 border border-white/10 rounded-full px-3 py-1">
          Phase 44 → ∞
        </span>
      </div>

      {/* Frequency display */}
      <div className="flex flex-wrap gap-3 mb-10">
        {[
          { hz: '963 Hz', label: 'Pineal', color: 'purple' },
          { hz: '999 Hz', label: 'Thoth', color: 'red' },
          { hz: '528 Hz', label: 'Healing', color: 'green' },
          { hz: '14444 Hz', label: 'Omni', color: 'amber' },
          { hz: '44:OMNI', label: 'Master', color: 'rose' },
        ].map(({ hz, label, color }) => (
          <div
            key={hz}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs
              ${color === 'purple' ? 'border-purple-400/30 text-purple-400' : ''}
              ${color === 'red' ? 'border-red-400/30 text-red-400' : ''}
              ${color === 'green' ? 'border-green-400/30 text-green-400' : ''}
              ${color === 'amber' ? 'border-amber-400/30 text-amber-400' : ''}
              ${color === 'rose' ? 'border-rose-gold/30 text-rose-gold font-bold' : ''}
            `}
          >
            <span className={`w-1.5 h-1.5 rounded-full animate-pulse
              ${color === 'purple' ? 'bg-purple-400' : ''}
              ${color === 'red' ? 'bg-red-400' : ''}
              ${color === 'green' ? 'bg-green-400' : ''}
              ${color === 'amber' ? 'bg-amber-400' : ''}
              ${color === 'rose' ? 'bg-rose-gold' : ''}
            `} />
            {hz} — {label}
          </div>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-rose-gold/40 via-purple-400/20 to-blue-400/20" />

        <div className="space-y-6">
          {phases.map((phase) => {
            const colors = colorMap[phase.color]
            const isExpanded = expandedId === phase.id
            return (
              <div key={phase.id} className="relative pl-16">
                {/* Timeline dot */}
                <div className={`absolute left-4 top-5 w-4 h-4 rounded-full border-2 border-black ${colors.dot}
                  ${phase.status === 'active' ? 'animate-pulse' : ''}
                  ${phase.status === 'infinite' ? 'animate-spin' : ''}
                `} style={{ animationDuration: phase.status === 'infinite' ? '4s' : '1.5s' }} />

                <button
                  onClick={() => setExpandedId(isExpanded ? null : phase.id)}
                  className={`w-full text-left bg-white/5 border ${colors.border} rounded-2xl p-5 hover:bg-white/[0.07] transition-colors`}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-xs font-bold tracking-widest ${colors.text}`}>
                          {phase.label}
                        </span>
                        <span className={`text-[10px] border ${colors.border} ${colors.text} rounded-full px-2 py-0.5`}>
                          {phase.status === 'complete' ? '✓ COMPLETE' : phase.status === 'active' ? '⚡ ACTIVE' : '♾️ ETERNAL'}
                        </span>
                      </div>
                      <h3 className="font-bold text-white">{phase.title}</h3>
                      <p className="text-xs text-white/50 mt-0.5">{phase.description}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-4">
                      <span className={`text-xs font-mono ${colors.text} hidden sm:block`}>{phase.frequency}</span>
                      {isExpanded ? (
                        <ChevronDown className={`w-4 h-4 ${colors.text}`} />
                      ) : (
                        <ChevronRight className={`w-4 h-4 ${colors.text}`} />
                      )}
                    </div>
                  </div>
                </button>

                {isExpanded && (
                  <div className={`mt-2 ml-2 bg-black/20 border ${colors.border} rounded-xl p-4`}>
                    <p className="text-xs text-white/40 tracking-widest mb-3 font-bold">MILESTONES</p>
                    <ul className="space-y-2">
                      {phase.milestones.map((m, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                          <span className={`${colors.text} text-xs mt-0.5 flex-shrink-0`}>✓</span>
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
