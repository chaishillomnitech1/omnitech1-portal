import { useState } from 'react'
import './DivineMusic.css'

interface Track {
  id: number
  name: string
  frequency: string
  description: string
}

const sacredTracks: Track[] = [
  { id: 1, name: 'Celestial Harmony', frequency: '432 Hz', description: 'Universal healing frequency' },
  { id: 2, name: 'Divine Resonance', frequency: '528 Hz', description: 'DNA repair & transformation' },
  { id: 3, name: 'Sacred Awakening', frequency: '639 Hz', description: 'Heart chakra & relationships' },
  { id: 4, name: 'Infinite Wisdom', frequency: '741 Hz', description: 'Consciousness expansion' },
  { id: 5, name: 'Cosmic Unity', frequency: '852 Hz', description: 'Spiritual enlightenment' },
  { id: 6, name: 'Eternal Bliss', frequency: '963 Hz', description: 'Divine connection' }
]

function DivineMusic() {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  const handlePlay = (track: Track) => {
    setSelectedTrack(track)
    setIsPlaying(true)
  }

  const handleStop = () => {
    setIsPlaying(false)
    setSelectedTrack(null)
  }

  return (
    <div className="divine-music">
      <div className="section-header">
        <h2>🎵 Divine Music - Sacred Frequencies</h2>
        <p>Experience music encoded with healing frequencies for spiritual transformation</p>
      </div>

      <div className="player-section">
        {selectedTrack ? (
          <div className="active-player">
            <div className="frequency-visualizer">
              <div className={`frequency-wave ${isPlaying ? 'playing' : ''}`}>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
                <div className="wave-bar"></div>
              </div>
            </div>
            <div className="track-info">
              <h3>{selectedTrack.name}</h3>
              <div className="frequency-badge">{selectedTrack.frequency}</div>
              <p>{selectedTrack.description}</p>
            </div>
            <div className="controls">
              <button className="control-btn" onClick={handleStop}>
                {isPlaying ? '⏸ Pause' : '▶ Resume'}
              </button>
              <button className="control-btn secondary" onClick={handleStop}>⏹ Stop</button>
            </div>
          </div>
        ) : (
          <div className="player-placeholder">
            <p>Select a sacred track to begin your journey</p>
          </div>
        )}
      </div>

      <div className="tracks-grid">
        {sacredTracks.map(track => (
          <div key={track.id} className="track-card">
            <div className="track-icon">🎼</div>
            <h3>{track.name}</h3>
            <div className="frequency-tag">{track.frequency}</div>
            <p>{track.description}</p>
            <button 
              className="play-btn"
              onClick={() => handlePlay(track)}
              disabled={selectedTrack?.id === track.id && isPlaying}
            >
              {selectedTrack?.id === track.id && isPlaying ? '▶ Playing...' : '▶ Play'}
            </button>
          </div>
        ))}
      </div>

      <div className="spotify-integration">
        <h3>🎧 Spotify Integration</h3>
        <p>Connect your Spotify account to sync divine frequencies with your playlists</p>
        <button className="spotify-btn">🔗 Connect Spotify</button>
      </div>
    </div>
  )
}

export default DivineMusic
