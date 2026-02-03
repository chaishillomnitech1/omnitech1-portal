import { useState } from 'react'
import './SocialCommand.css'

interface Post {
  id: number
  author: string
  content: string
  timestamp: string
  likes: number
  comments: number
}

function SocialCommand() {
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: 'Sovereign_1',
      content: 'Just experienced the 963 Hz frequency! Absolute transcendence! 🎵✨',
      timestamp: '2 hours ago',
      likes: 42,
      comments: 7
    },
    {
      id: 2,
      author: 'Eternal_Voyager',
      content: 'Minted my first constellation NFT from the Orion sector. The energy is infinite! 🌌',
      timestamp: '5 hours ago',
      likes: 88,
      comments: 12
    },
    {
      id: 3,
      author: 'Quantum_Driver',
      content: 'Test drove the Virgo Veil Infinity today... No words. Pure sovereignty on wheels! 🏎️💨',
      timestamp: '1 day ago',
      likes: 156,
      comments: 23
    }
  ])

  const [newPost, setNewPost] = useState('')

  const handlePost = () => {
    if (newPost.trim()) {
      const post: Post = {
        id: posts.length + 1,
        author: 'You',
        content: newPost,
        timestamp: 'Just now',
        likes: 0,
        comments: 0
      }
      setPosts([post, ...posts])
      setNewPost('')
    }
  }

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  return (
    <div className="social-command">
      <div className="section-header">
        <h2>📡 Social Command Center</h2>
        <p>Connect with the sovereign community across the infinite portal</p>
      </div>

      <div className="social-stats">
        <div className="social-stat">
          <div className="stat-icon">👥</div>
          <div>
            <div className="stat-number">8,888</div>
            <div className="stat-label">Community Members</div>
          </div>
        </div>
        <div className="social-stat">
          <div className="stat-icon">💬</div>
          <div>
            <div className="stat-number">12.4K</div>
            <div className="stat-label">Messages Today</div>
          </div>
        </div>
        <div className="social-stat">
          <div className="stat-icon">🌐</div>
          <div>
            <div className="stat-number">42</div>
            <div className="stat-label">Countries</div>
          </div>
        </div>
        <div className="social-stat">
          <div className="stat-icon">⚡</div>
          <div>
            <div className="stat-number">99.9%</div>
            <div className="stat-label">Online Uptime</div>
          </div>
        </div>
      </div>

      <div className="post-creator">
        <h3>✍️ Share Your Journey</h3>
        <textarea 
          className="post-input"
          placeholder="What's on your sovereign mind? Share your experiences with divine frequencies, NFTs, AI insights, or Virgo Veil..."
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          rows={4}
        />
        <div className="post-actions">
          <div className="post-tools">
            <button className="tool-btn" title="Add Image">🖼️</button>
            <button className="tool-btn" title="Add NFT">🎨</button>
            <button className="tool-btn" title="Add Poll">📊</button>
            <button className="tool-btn" title="Add Music">🎵</button>
          </div>
          <button className="post-btn" onClick={handlePost}>
            Post to Community
          </button>
        </div>
      </div>

      <div className="feed-section">
        <h3>🌊 Community Feed</h3>
        <div className="posts-feed">
          {posts.map(post => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <div className="post-author">
                  <div className="author-avatar">
                    {post.author.charAt(0)}
                  </div>
                  <div>
                    <div className="author-name">{post.author}</div>
                    <div className="post-timestamp">{post.timestamp}</div>
                  </div>
                </div>
              </div>
              <div className="post-content">
                {post.content}
              </div>
              <div className="post-footer">
                <button 
                  className="post-action-btn"
                  onClick={() => handleLike(post.id)}
                >
                  ❤️ {post.likes}
                </button>
                <button className="post-action-btn">
                  💬 {post.comments}
                </button>
                <button className="post-action-btn">
                  🔄 Share
                </button>
                <button className="post-action-btn">
                  ⭐ Save
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="community-channels">
        <h3>🎯 Active Channels</h3>
        <div className="channels-grid">
          <div className="channel-card">
            <div className="channel-icon">🎵</div>
            <h4>Divine Frequencies</h4>
            <p>Discuss sacred music and healing frequencies</p>
            <div className="channel-members">2,341 members</div>
          </div>
          <div className="channel-card">
            <div className="channel-icon">✨</div>
            <h4>NFT Collectors</h4>
            <p>Trade, showcase and explore NFT constellations</p>
            <div className="channel-members">1,876 members</div>
          </div>
          <div className="channel-card">
            <div className="channel-icon">🏎️</div>
            <h4>Virgo Veil Owners</h4>
            <p>Exclusive club for hypercar enthusiasts</p>
            <div className="channel-members">427 members</div>
          </div>
          <div className="channel-card">
            <div className="channel-icon">💰</div>
            <h4>Treasury Talk</h4>
            <p>Discuss $SAT economics and DeFi strategies</p>
            <div className="channel-members">3,142 members</div>
          </div>
        </div>
      </div>

      <div className="live-chat">
        <h3>💬 Live Chat</h3>
        <div className="chat-window">
          <div className="chat-message">
            <span className="chat-user">CosmicTrader:</span>
            <span className="chat-text">Just bridged 100 ETH via LayerZero! So smooth! 🌉</span>
          </div>
          <div className="chat-message">
            <span className="chat-user">FrequencyMaster:</span>
            <span className="chat-text">Anyone else feeling the 852 Hz vibes today? 🎶</span>
          </div>
          <div className="chat-message">
            <span className="chat-user">NFTCollector99:</span>
            <span className="chat-text">New Andromeda drop coming soon! Get ready! ✨</span>
          </div>
        </div>
        <div className="chat-input-container">
          <input 
            type="text" 
            className="chat-input" 
            placeholder="Type your message..."
          />
          <button className="chat-send-btn">Send</button>
        </div>
      </div>
    </div>
  )
}

export default SocialCommand
