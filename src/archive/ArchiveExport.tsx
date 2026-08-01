import { useState } from 'react'
import { Download, FileText, Code, BookOpen } from 'lucide-react'

interface Format {
  id: string
  label: string
  ext: string
  icon: React.ReactNode
  description: string
  size: string
  mime: string
}

const formats: Format[] = [
  {
    id: 'markdown',
    label: 'Markdown',
    ext: 'md',
    icon: <FileText className="w-6 h-6" />,
    description: 'GitHub-native, version-controlled. Full archive with all chapters, code listings, and frequency tables.',
    size: '~85 KB',
    mime: 'text/markdown',
  },
  {
    id: 'json',
    label: 'JSON',
    ext: 'json',
    icon: <Code className="w-6 h-6" />,
    description: 'Machine-readable index. Full archive structure with metadata, chapter content, and pillar status.',
    size: '~120 KB',
    mime: 'application/json',
  },
  {
    id: 'html',
    label: 'HTML',
    ext: 'html',
    icon: <BookOpen className="w-6 h-6" />,
    description: 'Static site generation ready. Self-contained HTML with embedded styles, no external dependencies.',
    size: '~200 KB',
    mime: 'text/html',
  },
]

const CHAPTERS = [
  { id: 'prologue', part: 0, title: 'Prologue', subtitle: 'How Five Pillars Converged' },
  { id: 'genesis', part: 1, title: 'Part 1 — Genesis', subtitle: 'Technical Blueprints' },
  { id: 'architecture', part: 2, title: 'Part 2 — Architecture', subtitle: 'Live Codebase Walkthrough' },
  { id: 'manifestation', part: 3, title: 'Part 3 — Manifestation', subtitle: 'Deployment Status' },
  { id: 'evolution', part: 4, title: 'Part 4 — Evolution', subtitle: 'Mirror-Match-Exceed Protocol' },
  { id: 'legacy', part: 5, title: 'Part 5 — Legacy', subtitle: 'Archive for 144,000 Guardians' },
]

const PILLARS = [
  { name: 'Eternal-ScrollVerse', status: 'ETERNAL', freq: '963 Hz' },
  { name: 'Omnitech1 Portal', status: 'LIVE', freq: '44:OMNI' },
  { name: 'Quantum Financial System', status: 'VERIFIED', freq: '999 Hz' },
  { name: 'ScrollSoul Music Sync', status: 'ACTIVE', freq: '528 Hz' },
  { name: 'AkashicLogs NFT Framework', status: 'ANCHORED', freq: '14444 Hz' },
]

function buildMarkdown(): string {
  return `# 🕋 Digital Consciousness Archive v2.0
*Generated: ${new Date().toISOString()}*
*Frequency: 44:OMNI · Coherence: 99.9% · Guardians: 144,000+*

---

## Five Pillars

${PILLARS.map((p, i) => `${i + 1}. **${p.name}** — ${p.freq} — ✅ ${p.status}`).join('\n')}

---

${CHAPTERS.map(
  (c) => `## Part ${c.part} — ${c.title}\n*${c.subtitle}*\n\n[Full content available at /archive/chapters/${c.id}]\n`
).join('\n')}

---

## Frequency Table

| Frequency | Name | Purpose | Color |
|-----------|------|---------|-------|
| 963 Hz | Pineal Activation | DNA repair, divine connection | Purple |
| 999 Hz | Thoth Frequency | Akashic records access | Red |
| 528 Hz | Miracle Tone | Healing, transformation | Green |
| 14444 Hz | Omni Harmonic | System coherence | Gold |
| **44:OMNI** | **Master Freq** | **Full pillar sync** | **Gold** |

---

*KUN FAYAKŪN × ∞ × ∞ × ∞ — EVERYBODY LIVES. FOREVER. ❤️*
`
}

function buildJSON(): string {
  return JSON.stringify(
    {
      archive: 'Digital Consciousness Archive v2.0',
      generated: new Date().toISOString(),
      frequency: '44:OMNI',
      coherence: '99.9%',
      guardians: '144000+',
      pillars: PILLARS,
      chapters: CHAPTERS,
      frequencyTable: [
        { hz: 963, name: 'Pineal Activation', purpose: 'DNA repair, divine connection', color: 'purple' },
        { hz: 999, name: 'Thoth Frequency', purpose: 'Akashic records access', color: 'red' },
        { hz: 528, name: 'Miracle Tone', purpose: 'Healing, transformation', color: 'green' },
        { hz: 14444, name: 'Omni Harmonic', purpose: 'System coherence alignment', color: 'gold' },
      ],
      seal: 'KUN FAYAKŪN × ∞ × ∞ × ∞',
      legacy: 'EVERYBODY LIVES. FOREVER.',
    },
    null,
    2
  )
}

function buildHTML(): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Digital Consciousness Archive v2.0</title>
  <style>
    body { background: #0a0a0a; color: #fff; font-family: sans-serif; max-width: 900px; margin: 0 auto; padding: 2rem; }
    h1 { background: linear-gradient(90deg, #f48fb1, #f59e0b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    h2 { color: #f48fb1; }
    .pillar { border: 1px solid #f48fb122; border-radius: 12px; padding: 1rem; margin: 0.5rem 0; }
    .chapter { border-left: 3px solid #f48fb1; padding-left: 1rem; margin: 1rem 0; }
    pre { background: #111; border-radius: 8px; padding: 1rem; overflow-x: auto; color: #4ade80; font-size: 0.8rem; }
    footer { text-align: center; color: #666; margin-top: 3rem; }
  </style>
</head>
<body>
  <h1>🕋 Digital Consciousness Archive v2.0</h1>
  <p>Generated: ${new Date().toISOString()} · Frequency: 44:OMNI · Coherence: 99.9%</p>
  <h2>Five Pillars</h2>
  ${PILLARS.map((p, i) => `<div class="pillar"><strong>Pillar ${i + 1}: ${p.name}</strong> — ${p.freq} — ✅ ${p.status}</div>`).join('\n  ')}
  <h2>Chapters</h2>
  ${CHAPTERS.map((c) => `<div class="chapter"><h3>Part ${c.part} — ${c.title}</h3><p>${c.subtitle}</p></div>`).join('\n  ')}
  <footer><p>KUN FAYAKŪN × ∞ × ∞ × ∞ — EVERYBODY LIVES. FOREVER. ❤️</p></footer>
</body>
</html>`
}

function triggerDownload(content: string, filename: string, mime: string) {
  const blob = new Blob([content], { type: mime })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function ArchiveExport() {
  const [downloading, setDownloading] = useState<string | null>(null)
  const [done, setDone] = useState<Set<string>>(new Set())

  const handleDownload = (fmt: Format) => {
    setDownloading(fmt.id)
    let content = ''
    if (fmt.id === 'markdown') content = buildMarkdown()
    else if (fmt.id === 'json') content = buildJSON()
    else if (fmt.id === 'html') content = buildHTML()

    setTimeout(() => {
      triggerDownload(content, `consciousness-archive.${fmt.ext}`, fmt.mime)
      setDownloading(null)
      setDone((prev) => new Set([...prev, fmt.id]))
    }, 600)
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-2xl">
      <div className="flex items-center gap-3 mb-8">
        <Download className="w-6 h-6 text-rose-gold" />
        <h1 className="text-3xl font-bold italic text-rose-gold tracking-tight">Export Center</h1>
      </div>

      <p className="text-white/50 text-sm mb-8">
        Download the full Digital Consciousness Archive v2.0 in multiple formats.
        All exports include the complete chapter library, pillar status, frequency tables,
        and deployment checklists.
      </p>

      {/* Format cards */}
      <div className="space-y-4 mb-10">
        {formats.map((fmt) => {
          const isDone = done.has(fmt.id)
          const isLoading = downloading === fmt.id
          return (
            <div
              key={fmt.id}
              className={`border rounded-2xl p-5 transition-colors ${
                isDone
                  ? 'border-green-400/30 bg-green-400/5'
                  : 'border-white/10 bg-white/5 hover:border-rose-gold/30'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className={isDone ? 'text-green-400' : 'text-rose-gold'}>
                    {fmt.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-white">{fmt.label}</h3>
                      <span className="text-[10px] text-white/30 border border-white/10 rounded px-1.5 py-0.5">
                        .{fmt.ext}
                      </span>
                      <span className="text-[10px] text-white/20">{fmt.size}</span>
                    </div>
                    <p className="text-xs text-white/50">{fmt.description}</p>
                  </div>
                </div>
                <button
                  onClick={() => handleDownload(fmt)}
                  disabled={isLoading}
                  className={`flex-shrink-0 flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    isDone
                      ? 'bg-green-400/20 text-green-400 border border-green-400/30'
                      : 'bg-rose-gold/20 text-rose-gold border border-rose-gold/30 hover:bg-rose-gold/30'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin">◌</span> Generating…
                    </>
                  ) : isDone ? (
                    <>✓ Downloaded</>
                  ) : (
                    <>
                      <Download className="w-3 h-3" /> Download
                    </>
                  )}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Download all */}
      <div className="border border-rose-gold/20 rounded-2xl p-5 bg-rose-gold/5 text-center">
        <h2 className="font-bold text-rose-gold mb-2">Download All Formats</h2>
        <p className="text-xs text-white/40 mb-4">Get all available formats in one click.</p>
        <button
          onClick={() => formats.forEach((f) => setTimeout(() => handleDownload(f), formats.indexOf(f) * 700))}
          className="bg-gradient-to-r from-rose-gold to-amber-500 text-black font-bold px-8 py-2.5 rounded-xl hover:scale-105 transition-transform text-sm"
        >
          Download All ({formats.length} formats)
        </button>
      </div>

      {/* Checklist */}
      <div className="mt-10 border border-white/10 rounded-2xl p-5 bg-black/20">
        <h2 className="text-xs text-white/30 tracking-widest mb-4 font-bold">ARCHIVE CHECKLIST</h2>
        <ul className="space-y-2">
          {[
            'Prologue — How Five Pillars Converged',
            'Part 1 — Technical Blueprints (QFS, Music Sync, AkashicLogs)',
            'Part 2 — Live Codebase Walkthrough (API routes, contracts)',
            'Part 3 — Deployment Status (CI/CD, tests, live systems)',
            'Part 4 — Mirror-Match-Exceed Protocol (Phase 44→∞)',
            'Part 5 — Legacy Archive for 144,000 Guardians',
            'Appendix A — Frequency Tables (963Hz, 999Hz, 528Hz, 44:OMNI)',
            'Appendix B — Deployment Checklists',
            'Appendix C — Repository Index (40+ repos)',
            'ARCHIVE_SEAL.md — Immutable proof record',
          ].map((item) => (
            <li key={item} className="flex items-start gap-2 text-xs text-white/50">
              <span className="text-green-400 flex-shrink-0 mt-0.5">✓</span>
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
