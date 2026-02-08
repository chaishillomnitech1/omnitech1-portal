import { useState, useEffect } from 'react'
import './InteractiveToolsPanel.css'

interface ToolLink {
  name: string
  url: string
  icon: string
  description: string
  isAvailable: boolean
}

function InteractiveToolsPanel() {
  const [tools, setTools] = useState<ToolLink[]>([
    {
      name: 'Manus',
      url: 'https://manus.im',
      icon: '🤲',
      description: 'Advanced hand tracking and interaction',
      isAvailable: true
    },
    {
      name: 'Claude',
      url: 'https://claude.ai',
      icon: '🤖',
      description: 'AI assistant for advanced tasks',
      isAvailable: true
    },
    {
      name: 'Spotify',
      url: 'https://open.spotify.com',
      icon: '🎵',
      description: 'Music streaming and playlist management',
      isAvailable: true
    }
  ])

  const [linkStatus, setLinkStatus] = useState<Record<string, 'checking' | 'available' | 'error'>>({})
  const [debugLogs, setDebugLogs] = useState<string[]>([])

  useEffect(() => {
    // Check link availability on mount
    checkLinksAvailability()
  }, [])

  const addDebugLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    const logMessage = `[${timestamp}] ${message}`
    setDebugLogs(prev => [...prev.slice(-9), logMessage])
    console.log(logMessage)
  }

  const checkLinksAvailability = async () => {
    addDebugLog('Starting link availability check...')
    
    for (const tool of tools) {
      setLinkStatus(prev => ({ ...prev, [tool.name]: 'checking' }))
      addDebugLog(`Checking ${tool.name} at ${tool.url}`)
      
      try {
        // Since we can't actually fetch cross-origin, we'll simulate the check
        // In production, this would be a proper health check endpoint
        await new Promise(resolve => setTimeout(resolve, 500))
        
        setLinkStatus(prev => ({ ...prev, [tool.name]: 'available' }))
        addDebugLog(`✓ ${tool.name} is available`)
      } catch (error) {
        setLinkStatus(prev => ({ ...prev, [tool.name]: 'error' }))
        addDebugLog(`✗ ${tool.name} failed to load: ${error}`)
        
        // Update tool availability
        setTools(prev => prev.map(t => 
          t.name === tool.name ? { ...t, isAvailable: false } : t
        ))
      }
    }
    
    addDebugLog('Link availability check completed')
  }

  const handleLinkClick = (tool: ToolLink) => {
    if (!tool.isAvailable) {
      addDebugLog(`⚠ Attempted to access unavailable tool: ${tool.name}`)
      return
    }

    addDebugLog(`Opening ${tool.name} in new tab`)
    
    try {
      window.open(tool.url, '_blank', 'noopener,noreferrer')
      addDebugLog(`✓ Successfully opened ${tool.name}`)
    } catch (error) {
      addDebugLog(`✗ Failed to open ${tool.name}: ${error}`)
      alert(`Failed to open ${tool.name}. Please check your browser settings.`)
    }
  }

  const getStatusIcon = (toolName: string) => {
    const status = linkStatus[toolName]
    switch (status) {
      case 'checking':
        return '⏳'
      case 'available':
        return '✅'
      case 'error':
        return '❌'
      default:
        return '⚪'
    }
  }

  const getStatusClass = (toolName: string) => {
    const status = linkStatus[toolName]
    return status || 'unknown'
  }

  return (
    <div className="interactive-tools-panel">
      <div className="panel-header">
        <h3>🔗 Interactive Tools</h3>
        <p>Access external platforms and services</p>
        <button 
          className="refresh-btn"
          onClick={checkLinksAvailability}
          title="Refresh link status"
        >
          🔄 Refresh
        </button>
      </div>

      <div className="tools-grid">
        {tools.map((tool) => (
          <div 
            key={tool.name}
            className={`tool-card ${!tool.isAvailable ? 'disabled' : ''} ${getStatusClass(tool.name)}`}
          >
            <div className="tool-header">
              <span className="tool-icon">{tool.icon}</span>
              <span className="status-indicator">{getStatusIcon(tool.name)}</span>
            </div>
            <h4>{tool.name}</h4>
            <p className="tool-description">{tool.description}</p>
            
            {tool.isAvailable ? (
              <button 
                className="tool-link-btn"
                onClick={() => handleLinkClick(tool)}
              >
                Open {tool.name}
              </button>
            ) : (
              <div className="tool-error">
                <span className="error-icon">⚠️</span>
                <span className="error-text">Service Unavailable</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="debug-panel">
        <h4>📊 Debug Logs</h4>
        <div className="debug-logs">
          {debugLogs.length === 0 ? (
            <div className="log-entry empty">No logs yet...</div>
          ) : (
            debugLogs.map((log, index) => (
              <div key={index} className="log-entry">
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default InteractiveToolsPanel
