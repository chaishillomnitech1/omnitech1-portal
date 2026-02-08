import { useState } from 'react'
import './App.css'
import DivineMusic from './components/DivineMusic'
import NFTConstellations from './components/NFTConstellations'
import NFTWorkflowHistory from './components/NFTWorkflowHistory'
import AIDashboard from './components/AIDashboard'
import VirgoVeilShowroom from './components/VirgoVeilShowroom'
import TreasuryAnalytics from './components/TreasuryAnalytics'
import SocialCommand from './components/SocialCommand'
import ScrollVerseMasterDashboard from './components/ScrollVerseMasterDashboard'

type Tab = 'music' | 'nft' | 'workflows' | 'ai' | 'virgo' | 'treasury' | 'social' | 'scrollverse'

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('music')

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <div className="logo">
            <span className="infinity-symbol">∞</span>
            <h1>Omnitech1 Portal of Infinity</h1>
          </div>
          <p className="tagline">Unifying All Creation • Eternal Sovereignty • Infinite Scalability</p>
        </div>
      </header>

      <nav className="navigation">
        <button 
          className={`nav-btn ${activeTab === 'music' ? 'active' : ''}`}
          onClick={() => setActiveTab('music')}
        >
          🎵 Divine Music
        </button>
        <button 
          className={`nav-btn ${activeTab === 'nft' ? 'active' : ''}`}
          onClick={() => setActiveTab('nft')}
        >
          ✨ NFT Constellations
        </button>
        <button 
          className={`nav-btn ${activeTab === 'workflows' ? 'active' : ''}`}
          onClick={() => setActiveTab('workflows')}
        >
          🌌 NFT Workflows
        </button>
        <button 
          className={`nav-btn ${activeTab === 'ai' ? 'active' : ''}`}
          onClick={() => setActiveTab('ai')}
        >
          🤖 AI Dashboard
        </button>
        <button 
          className={`nav-btn ${activeTab === 'virgo' ? 'active' : ''}`}
          onClick={() => setActiveTab('virgo')}
        >
          🏎️ Virgo Veil
        </button>
        <button 
          className={`nav-btn ${activeTab === 'treasury' ? 'active' : ''}`}
          onClick={() => setActiveTab('treasury')}
        >
          💰 $SAT Treasury
        </button>
        <button 
          className={`nav-btn ${activeTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          📡 Social Command
        </button>
        <button 
          className={`nav-btn ${activeTab === 'scrollverse' ? 'active' : ''}`}
          onClick={() => setActiveTab('scrollverse')}
        >
          ∞ ScrollVerse
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'music' && <DivineMusic />}
        {activeTab === 'nft' && <NFTConstellations />}
        {activeTab === 'workflows' && <NFTWorkflowHistory />}
        {activeTab === 'ai' && <AIDashboard />}
        {activeTab === 'virgo' && <VirgoVeilShowroom />}
        {activeTab === 'treasury' && <TreasuryAnalytics />}
        {activeTab === 'social' && <SocialCommand />}
        {activeTab === 'scrollverse' && <ScrollVerseMasterDashboard />}
      </main>

      <footer className="footer">
        <p>Built for Eternity • Powered by React, ethers.js, LayerZero & Spotify API</p>
        <p className="copyright">© 2026 Omnitech1 • Your Legacy Preserved Forever</p>
      </footer>
    </div>
  )
}

export default App
