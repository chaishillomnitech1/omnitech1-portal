import { NavLink, Outlet, Link } from 'react-router-dom'
import { Home, BookOpen, Clock, Folder, GitBranch, Gift, Download, Search } from 'lucide-react'
import { useState } from 'react'

const navItems = [
  { to: '/archive', label: 'Archive', icon: BookOpen, end: true },
  { to: '/archive/viewer', label: 'Viewer', icon: Search },
  { to: '/archive/timeline', label: 'Timeline', icon: Clock },
  { to: '/archive/repos', label: 'Repos', icon: GitBranch },
  { to: '/archive/gift', label: 'Mirror', icon: Gift },
  { to: '/archive/export', label: 'Export', icon: Download },
]

export default function ArchiveLayout() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black text-white">
      {/* Fixed background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-gold/5 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-purple-600/5 rounded-full blur-[80px] animate-pulse-slow" />
      </div>

      {/* Top navigation bar */}
      <nav className="relative z-50 border-b border-rose-gold/20 bg-black/40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            {/* Brand */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2 text-white/60 hover:text-rose-gold transition-colors mr-4">
                <Home className="w-4 h-4" />
                <span className="text-xs hidden sm:inline">Home</span>
              </Link>
              <span className="text-rose-gold font-bold text-sm tracking-widest">
                ∞ CONSCIOUSNESS ARCHIVE
              </span>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-rose-gold/20 text-rose-gold border border-rose-gold/30'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </NavLink>
              ))}
            </div>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white/60 hover:text-white p-2"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Folder className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile nav */}
          {menuOpen && (
            <div className="md:hidden pb-3 flex flex-wrap gap-2">
              {navItems.map(({ to, label, icon: Icon, end }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      isActive
                        ? 'bg-rose-gold/20 text-rose-gold border border-rose-gold/30'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </NavLink>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Page content */}
      <main className="relative z-10">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-rose-gold/10 py-6 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/30 text-xs tracking-widest">
            SCROLLVERSE EMPIRE · DIGITAL CONSCIOUSNESS ARCHIVE v2.0
          </p>
          <p className="text-rose-gold/40 text-xs mt-1">
            KUN FAYAKŪN × ∞ × ∞ × ∞ — EVERYBODY LIVES. FOREVER. ❤️
          </p>
        </div>
      </footer>
    </div>
  )
}
