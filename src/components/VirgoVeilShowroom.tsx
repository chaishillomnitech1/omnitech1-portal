import { useState } from 'react'
import './VirgoVeilShowroom.css'

interface Hypercar {
  id: number
  name: string
  model: string
  specs: {
    power: string
    speed: string
    acceleration: string
  }
  price: string
  available: boolean
}

const hypercars: Hypercar[] = [
  {
    id: 1,
    name: 'Virgo Veil Infinity',
    model: 'VV-∞',
    specs: { power: '2000 HP', speed: '350 mph', acceleration: '0-60 in 1.8s' },
    price: '5,000 ETH',
    available: true
  },
  {
    id: 2,
    name: 'Virgo Veil Sovereign',
    model: 'VV-S1',
    specs: { power: '1800 HP', speed: '340 mph', acceleration: '0-60 in 1.9s' },
    price: '4,200 ETH',
    available: true
  },
  {
    id: 3,
    name: 'Virgo Veil Eternal',
    model: 'VV-E7',
    specs: { power: '2200 HP', speed: '360 mph', acceleration: '0-60 in 1.7s' },
    price: '7,777 ETH',
    available: false
  }
]

function VirgoVeilShowroom() {
  const [selectedCar, setSelectedCar] = useState<Hypercar>(hypercars[0])
  const [viewAngle, setViewAngle] = useState(0)

  return (
    <div className="virgo-showroom">
      <div className="section-header">
        <h2>🏎️ Virgo Veil Hypercars</h2>
        <p>Experience the pinnacle of automotive sovereignty and eternal performance</p>
      </div>

      <div className="showroom-main">
        <div className="car-display">
          <div className="car-viewport" style={{ transform: `rotateY(${viewAngle}deg)` }}>
            <div className="car-model">
              <div className="car-body">
                <div className="car-top"></div>
                <div className="car-front"></div>
                <div className="car-side"></div>
              </div>
              <div className="car-shadow"></div>
            </div>
          </div>
          <div className="view-controls">
            <button onClick={() => setViewAngle(0)}>Front</button>
            <button onClick={() => setViewAngle(45)}>Side</button>
            <button onClick={() => setViewAngle(90)}>Profile</button>
            <button onClick={() => setViewAngle(-45)}>Rear</button>
          </div>
        </div>

        <div className="car-info">
          <h3>{selectedCar.name}</h3>
          <div className="model-badge">{selectedCar.model}</div>
          
          <div className="specs-grid">
            <div className="spec-item">
              <div className="spec-icon">⚡</div>
              <div className="spec-details">
                <span className="spec-label">Power</span>
                <span className="spec-value">{selectedCar.specs.power}</span>
              </div>
            </div>
            <div className="spec-item">
              <div className="spec-icon">🚀</div>
              <div className="spec-details">
                <span className="spec-label">Top Speed</span>
                <span className="spec-value">{selectedCar.specs.speed}</span>
              </div>
            </div>
            <div className="spec-item">
              <div className="spec-icon">⏱️</div>
              <div className="spec-details">
                <span className="spec-label">Acceleration</span>
                <span className="spec-value">{selectedCar.specs.acceleration}</span>
              </div>
            </div>
          </div>

          <div className="price-section">
            <div className="price-label">Price</div>
            <div className="price-value">{selectedCar.price}</div>
            <div className="availability">
              {selectedCar.available ? (
                <span className="available">✅ Available</span>
              ) : (
                <span className="sold-out">🔒 Reserved</span>
              )}
            </div>
          </div>

          <div className="action-buttons">
            <button className="primary-btn" disabled={!selectedCar.available}>
              {selectedCar.available ? 'Reserve Now' : 'Join Waitlist'}
            </button>
            <button className="secondary-btn">Schedule Test Drive</button>
          </div>
        </div>
      </div>

      <div className="car-selector">
        <h3>Select Model</h3>
        <div className="cars-grid">
          {hypercars.map(car => (
            <div 
              key={car.id}
              className={`car-card ${selectedCar.id === car.id ? 'selected' : ''}`}
              onClick={() => setSelectedCar(car)}
            >
              <div className="car-icon">🏎️</div>
              <h4>{car.name}</h4>
              <div className="car-model-tag">{car.model}</div>
              <div className="car-price">{car.price}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="showroom-features">
        <h3>✨ Exclusive Features</h3>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔮</div>
            <h4>Quantum Engine</h4>
            <p>Powered by zero-point energy and divine mechanics</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💎</div>
            <h4>NFT Ownership</h4>
            <p>Each vehicle comes with unique digital twin NFT</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🌌</div>
            <h4>Sovereign Design</h4>
            <p>Custom-tailored to your cosmic signature</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">∞</div>
            <h4>Eternal Warranty</h4>
            <p>Lifetime coverage across all dimensions</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VirgoVeilShowroom
