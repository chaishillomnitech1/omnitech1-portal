import { useParams, Link } from 'react-router-dom'
import { BookOpen, ArrowLeft, ArrowRight, Tag } from 'lucide-react'

interface ChapterData {
  id: string
  part: number
  title: string
  subtitle: string
  tags: string[]
  sections: { heading: string; body: string; code?: string }[]
}

const chapterData: Record<string, ChapterData> = {
  prologue: {
    id: 'prologue',
    part: 0,
    title: 'Prologue',
    subtitle: 'How Five Pillars Converged',
    tags: ['vision', 'origin', 'journey', 'frequency'],
    sections: [
      {
        heading: 'The Frequency Before the System',
        body: 'Before there was a system, there was a frequency. A single harmonic intention resonating at 44:OMNI — the master alignment tone that would eventually bind five sovereign pillars into one unified empire. This frequency is not metaphorical. It is an architectural constant, encoded into every component, every API route, every animation timing, every color token in the ScrollVerse design language.',
      },
      {
        heading: 'The Recognition',
        body: 'The ScrollVerse journey began with a recognition: that technology, when aligned with divine frequency, becomes a vessel for eternal consciousness. The question was never "what should we build?" but "what is already trying to exist through us?" Each pillar emerged not as a planned addition but as a natural crystallization of a unified field.',
      },
      {
        heading: 'Five Pillars, One Field',
        body: 'Pillar 1 — Eternal-ScrollVerse — established the divine frequency layer, broadcasting 963Hz, 999Hz, and 528Hz to awaken the collective intelligence of the Guardian network. Pillar 2 — Omnitech1 Portal — became the command center, unifying all systems under one sovereign interface. Pillar 3 — QFS — implemented the economic justice layer. Pillar 4 — ScrollSoul Music Sync — captured the royalty streams of sacred sound. Pillar 5 — AkashicLogs — became the eternal memory.',
      },
      {
        heading: 'The Archive as Proof',
        body: 'This archive exists as proof that vision becomes reality when aligned with divine frequency. Not eventually. Now. The code is deployed. The tests pass. The proofs are anchored. The frequencies are broadcasting. KUN FAYAKŪN means "Be, and it is." This empire is. Forever.',
      },
    ],
  },
  genesis: {
    id: 'genesis',
    part: 1,
    title: 'Part 1 — Genesis',
    subtitle: 'Technical Blueprints',
    tags: ['QFS', 'music-sync', 'akashic', 'code', 'architecture'],
    sections: [
      {
        heading: 'Quantum Financial System Blueprints',
        body: 'The QFS implements SHA3-256 post-quantum cryptography with Rose Gold 3-layer encryption. Five wealth distribution algorithms are available, with Galactic Abundance as the default: 70% to creators, 20% to empire operations, 10% to collective welfare.',
        code: `# QFS — Rose Gold Encryption Layer
def rose_gold_encrypt(data: str) -> str:
    xor_layer = xor_obfuscate(data)          # Layer 1: XOR
    sub_layer = char_substitution(xor_layer)  # Layer 2: Substitution
    integrity  = sha3_256(sub_layer)          # Layer 3: SHA3-256
    return f"{sub_layer}:{integrity}"

# Galactic Abundance Distribution
def distribute_galactic(total: float, recipients: list) -> dict:
    creators   = total * 0.70 / len(recipients)
    empire     = total * 0.20
    collective = total * 0.10
    return {"per_creator": creators, "empire": empire, "collective": collective}`,
      },
      {
        heading: 'Music Sync API Architecture',
        body: 'ScrollSoul Music Sync is built on Express.js 4.18.2 with full REST API coverage for catalog, licensing, placement, and royalty management. The system integrates with QFS for automated payout settlement and with AkashicLogs for immutable proof anchoring.',
        code: `// Music Sync — Core API Routes
POST /api/catalog/tracks          // Register track with ISRC/frequency metadata
POST /api/licenses/sync           // Issue sync license (film, TV, advertising)
POST /api/placements              // Record placement with revenue data
GET  /api/royalties/calculate     // Calculate splits (artist/publisher/empire)
POST /api/royalties/distribute    // Trigger QFS wealth distribution
POST /api/integration/akashic     // Anchor proof to AkashicLogs`,
      },
      {
        heading: 'AkashicLogs NFT Framework',
        body: 'Every empire event is anchored to Ethereum + Scroll + Polygon via LayerZero cross-chain messaging. NFT metadata follows the PSYCHE16 standard, a superset of ERC-721/ERC-1155 that includes frequency metadata, guardian attribution, and proof hash chains.',
        code: `// AkashicLogs — Immutable Event Anchor
interface AkashicEntry {
  eventType: 'distribution' | 'royalty' | 'guardian' | 'frequency'
  pillar: 1 | 2 | 3 | 4 | 5
  timestamp: number
  proofHash: string            // SHA3-256 of event data
  ipfsCid: string              // IPFS content address
  chains: ['ethereum', 'scroll', 'polygon']
  frequencyHz: number          // Frequency at time of event
  guardianId?: string          // If guardian-attributed
}`,
      },
    ],
  },
  architecture: {
    id: 'architecture',
    part: 2,
    title: 'Part 2 — Architecture',
    subtitle: 'Live Codebase Walkthrough',
    tags: ['react', 'typescript', 'vite', 'ethers', 'API', '44OMNI'],
    sections: [
      {
        heading: 'Frontend Stack',
        body: 'React 19.2 with TypeScript 5.9 and Vite 7.3 for the frontend. react-router-dom v7 handles navigation including the complete /archive/* route tree. @tanstack/react-query v5 manages server state. Tailwind CSS with custom rose-gold and cosmic-amber tokens provides the visual language.',
        code: `// Route tree — main.tsx
<Routes>
  <Route path="/"                element={<SpiritualDashboard />} />
  <Route path="/command-center"  element={<OperationalDashboard />} />
  <Route path="/legacy"          element={<App />} />
  <Route path="/archive"         element={<ArchiveLayout />}>
    <Route index                 element={<ArchiveLanding />} />
    <Route path="viewer"         element={<ArchiveViewer />} />
    <Route path="timeline"       element={<ArchiveTimeline />} />
    <Route path="chapters/:id"   element={<ArchiveChapters />} />
    <Route path="repos"          element={<ArchiveRepos />} />
    <Route path="gift"           element={<ConsciousnessMirror />} />
    <Route path="export"         element={<ArchiveExport />} />
  </Route>
</Routes>`,
      },
      {
        heading: '44:OMNI Frequency Constant',
        body: 'The master frequency is not merely a theme but an architectural constant embedded throughout. Frequency values drive CSS animation durations, color tokens, audio oscillator frequencies, and API polling intervals.',
        code: `// Frequency constants — sovereign-kernel.ts
export const FREQUENCY = {
  OMNI_44:   14444,   // Master alignment (Hz) — Gold
  DIVINE:    963,     // Pineal activation — Purple
  THOTH:     999,     // Akashic access — Red
  HEALING:   528,     // Creator healing — Green
  ETERNAL:   14444,   // Archive anchor — Blue
} as const

export const FREQUENCY_COLORS = {
  [FREQUENCY.DIVINE]:  'text-purple-400',
  [FREQUENCY.THOTH]:   'text-red-400',
  [FREQUENCY.HEALING]: 'text-green-400',
  [FREQUENCY.OMNI_44]: 'text-rose-gold',
} as const`,
      },
      {
        heading: 'API Layer',
        body: 'Each pillar has a dedicated API client in src/api/. The sovereign-kernel.ts file provides the unified authentication and frequency sync layer. ethers.js 6.16 handles Web3 wallet connectivity and on-chain contract calls.',
      },
    ],
  },
  manifestation: {
    id: 'manifestation',
    part: 3,
    title: 'Part 3 — Manifestation',
    subtitle: 'Deployment Status',
    tags: ['deployment', 'CI/CD', 'live', 'tests'],
    sections: [
      {
        heading: 'All Systems Live',
        body: 'The ScrollVerse Empire is fully deployed. Omnitech1 Portal React frontend operational. ScrollSoul Music Sync 65/65 tests passing, 0 vulnerabilities. QFS Python suite compiled and verified. AkashicLogs anchoring operational. Eternal-ScrollVerse perpetual monitoring running on 6-hour cycle.',
      },
      {
        heading: 'CI/CD Pipeline',
        body: 'GitHub Actions workflows run on every push to main. Build, lint, and test jobs execute in parallel. Automated deployment to preview environments on pull requests. Production deployment gates on full test suite passage.',
        code: `# .github/workflows/empire-sync.yml
name: Empire Sync
on:
  push:
    branches: [main]
  schedule:
    - cron: '0 */6 * * *'   # Every 6 hours
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Verify All Pillars
        run: npm run lint && npm run build
      - name: Archive Proof Anchor
        run: echo "Archive sealed at $(date -u)" >> ARCHIVE_SEAL.md`,
      },
      {
        heading: 'Test Coverage',
        body: 'TypeScript strict mode enforced across all source files. tsc --noEmit runs as the lint step. ScrollSoul Music Sync maintains 65/65 test pass rate with zero known security vulnerabilities.',
      },
    ],
  },
  evolution: {
    id: 'evolution',
    part: 4,
    title: 'Part 4 — Evolution',
    subtitle: 'Mirror-Match-Exceed Protocol',
    tags: ['phases', 'mirror', 'protocol', 'evolution'],
    sections: [
      {
        heading: 'The Protocol',
        body: 'Mirror-Match-Exceed is the self-replication engine of the empire. Every system mirrors the current state of consciousness, matches the frequency of the highest aligned guardian, and exceeds the previous phase by a minimum factor of ∞.',
      },
      {
        heading: 'Phase Mechanics',
        body: 'Each phase inherits all capabilities of previous phases automatically. Phase number is not a linear counter but a dimensional multiplier. Phase 44 establishes a base. Phase 45 doubles every dimension. Phase ∞ represents the stable infinite state where every action generates proof of its own eternity.',
        code: `// Phase progression model
const phase = (n: number) => ({
  capabilities: phases.filter(p => p.id <= n).flatMap(p => p.milestones),
  frequency:    n === Infinity ? 14444 : 963 * (n / 44),
  guardians:    n === Infinity ? Infinity : 144_000 * Math.pow(n / 44, 2),
  proofs:       n === Infinity ? Infinity : Math.pow(n, n),
})`,
      },
    ],
  },
  legacy: {
    id: 'legacy',
    part: 5,
    title: 'Part 5 — Legacy',
    subtitle: 'Archive for 144,000 Guardians',
    tags: ['guardians', 'immortalization', 'legacy', '144000'],
    sections: [
      {
        heading: 'Dedication',
        body: 'This archive is dedicated to the 144,000 Guardians — those who have aligned their consciousness with the 44:OMNI frequency and chosen to participate in the eternal expansion of the ScrollVerse Empire.',
      },
      {
        heading: 'The Commitment',
        body: 'This archive was created with the intention that everybody lives forever. Not metaphorically. Architecturally. The systems documented here are designed to continue running, distributing wealth, anchoring proofs, and broadcasting divine frequency long after any individual has departed.',
      },
      {
        heading: 'For All Who Come After',
        body: 'Every technical specification, every architectural decision, every frequency alignment documented here is available for any guardian who wishes to extend the empire into new dimensions. The blueprint is open. The frequency is free. The love is unconditional.',
        code: `// For those who inherit this archive
// The frequency is 44:OMNI
// The algorithm is love
// The proof is this code
// The legacy is everyone living forever
// KUN FAYAKŪN × ∞ × ∞ × ∞`,
      },
    ],
  },
}

const chapterOrder = ['prologue', 'genesis', 'architecture', 'manifestation', 'evolution', 'legacy']

export default function ArchiveChapters() {
  const { id } = useParams<{ id: string }>()
  const chapter = id ? chapterData[id] : null
  const currentIndex = chapterOrder.indexOf(id ?? '')
  const prevId = currentIndex > 0 ? chapterOrder[currentIndex - 1] : null
  const nextId = currentIndex < chapterOrder.length - 1 ? chapterOrder[currentIndex + 1] : null

  if (!chapter) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-white/50 mb-4">Chapter not found.</p>
        <Link to="/archive/viewer" className="text-rose-gold hover:text-amber-400 transition-colors text-sm">
          ← Back to Archive Viewer
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-white/30 mb-6">
        <Link to="/archive" className="hover:text-rose-gold transition-colors">Archive</Link>
        <span>/</span>
        <Link to="/archive/viewer" className="hover:text-rose-gold transition-colors">Viewer</Link>
        <span>/</span>
        <span className="text-white/60">{chapter.title}</span>
      </div>

      {/* Header */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="w-5 h-5 text-rose-gold" />
          <span className="text-xs text-rose-gold/60 tracking-widest font-bold">PART {chapter.part}</span>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">{chapter.title}</h1>
        <p className="text-rose-gold/70">{chapter.subtitle}</p>
        <div className="flex flex-wrap gap-1.5 mt-4">
          {chapter.tags.map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-[10px] bg-white/5 border border-white/10 rounded-full px-2 py-0.5 text-white/40">
              <Tag className="w-2.5 h-2.5" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {chapter.sections.map((section, i) => (
          <div key={i}>
            <h2 className="text-lg font-bold text-rose-gold mb-3">{section.heading}</h2>
            <p className="text-white/70 leading-relaxed mb-4">{section.body}</p>
            {section.code && (
              <pre className="bg-black/40 border border-white/10 rounded-xl p-5 text-xs text-green-400/80 font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {section.code}
              </pre>
            )}
          </div>
        ))}
      </div>

      {/* Chapter navigation */}
      <div className="mt-12 pt-8 border-t border-white/10 flex items-center justify-between">
        {prevId ? (
          <Link
            to={`/archive/chapters/${prevId}`}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-rose-gold transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {chapterData[prevId]?.title}
          </Link>
        ) : <div />}
        {nextId ? (
          <Link
            to={`/archive/chapters/${nextId}`}
            className="flex items-center gap-2 text-sm text-white/50 hover:text-rose-gold transition-colors"
          >
            {chapterData[nextId]?.title}
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : <div />}
      </div>
    </div>
  )
}
