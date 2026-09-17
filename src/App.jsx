import { useState, useRef } from 'react'
import './App.css'

function App() {
  const [activeRole, setActiveRole] = useState('Home')

  // Shopkeeper Portal States
  const [location, setLocation] = useState('')
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [queryText, setQueryText] = useState('')
  const [products, setProducts] = useState([
    { id: 1, name: 'Product Item #1', status: 'Auto-extracted' },
    { id: 2, name: 'Product Item #2', status: 'Auto-extracted' }
  ])

  // Customer Portal Purchase States (Separate states for tracking items)
  const [isPurchased1, setIsPurchased1] = useState(false)
  const [isPurchased2, setIsPurchased2] = useState(false)

  // Refs for triggering native file/camera pickers
  const cameraInputRef = useRef(null)
  const fileInputRef = useRef(null)

  // Geolocation Handler
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      setLocation('Fetching current location...')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation(`Lat: ${position.coords.latitude.toFixed(4)}, Long: ${position.coords.longitude.toFixed(4)}`)
        },
        () => {
          setLocation('')
          alert('Could not fetch location automatically. Please type it manually.')
        }
      )
    } else {
      alert('Geolocation is not supported by your browser.')
    }
  }

  // File Upload Handler
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    if (files.length > 0) {
      setUploadedFiles(prev => [...prev, ...files.map(f => f.name)])
    }
  }

  // Create Database Action
  const handleCreateDatabase = () => {
    if (!location) {
      alert('Please enter or fetch your shop location first!')
      return
    }
    if (uploadedFiles.length === 0) {
      alert('Please record or upload at least one video or photo.')
      return
    }

    // Simulate AI extraction and database creation
    alert(`Initializing AI Database for location: ${location}`)
    setProducts(prev => [
      { id: Date.now(), name: `Extracted Item (${uploadedFiles[0]})`, status: 'Processing AI...' },
      ...prev
    ])
  }

  return (
    <div className="app-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="logo-container" onClick={() => setActiveRole('Home')}>
          <div className="logo-icon">✨</div>
          <span className="logo-text">ShopVision <span className="highlight">AI</span></span>
        </div>

        {/* Clean Segmented Switcher */}
        <div className="role-switch-container">
          <button
            className={`switch-tab ${activeRole === 'Customer' ? 'active' : ''}`}
            onClick={() => setActiveRole('Customer')}
          >
            Customer
          </button>
          <button
            className={`switch-tab ${activeRole === 'Shopkeeper' ? 'active' : ''}`}
            onClick={() => setActiveRole('Shopkeeper')}
          >
            Shopkeeper
          </button>
          <button
            className={`switch-tab ${activeRole === 'Admin' ? 'active' : ''}`}
            onClick={() => setActiveRole('Admin')}
          >
            Admin
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {activeRole === 'Home' && (
          <div className="landing-view">
            <div className="badge">AI-Powered Retail Ecosystem</div>
            <h1 className="hero-title">Welcome to ShopVision AI</h1>
            <p className="hero-subtitle">
              Select your portal to explore intelligent shopping, inventory management, and platform analytics.
            </p>

            <div className="portal-grid">
              <div className="portal-card" onClick={() => setActiveRole('Customer')}>
                <div className="portal-icon">🛍️</div>
                <h3>Customer Portal</h3>
                <p>Visual product search, AI recommendations, and smart shopping assistants.</p>
              </div>

              <div className="portal-card" onClick={() => setActiveRole('Shopkeeper')}>
                <div className="portal-icon">🏪</div>
                <h3>Shopkeeper Portal</h3>
                <p>Manage inventory, track sales, and auto-generate AI product descriptions.</p>
              </div>

              <div className="portal-card" onClick={() => setActiveRole('Admin')}>
                <div className="portal-icon">⚙️</div>
                <h3>Admin Portal</h3>
                <p>Monitor platform analytics, verify shopkeepers, and manage system operations.</p>
              </div>
            </div>
          </div>
        )}

        {/* Customized Customer Dashboard - Clean Gemini Style */}
        {activeRole === 'Customer' && (
          <div className="customer-wrapper">
            <h1 className="customer-title">Customer Portal</h1>

            <div className="customer-grid">
              {/* LEFT COLUMN: AI Shopping Assistant */}
              <div className="card left-card chat-card-container">
                <div className="chat-top-section">
                  <h3>AI Shopping Assistant</h3>
                  <p className="assistant-desc">Ask anything or speak your shopping list</p>

                  {/* Chat Conversation Window */}
                  <div className="chat-response-box">
                    <div className="ai-message">
                      <strong>ShopVision AI:</strong> Hello! What are you looking for today? You can type, use the mic, or attach a photo.
                    </div>
                    {queryText && (
                      <div className="user-message-preview">
                        <strong>You:</strong> {queryText}
                      </div>
                    )}
                  </div>
                </div>

                {/* Modern Gemini-Style Bottom Input Bar (Inside Card) */}
                <div className="gemini-input-wrapper">
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />

                  <div className="gemini-input-bar">
                    {/* Attachment Button (+) */}
                    <button
                      type="button"
                      className="input-icon-btn"
                      onClick={() => fileInputRef.current.click()}
                      title="Upload image"
                    >
                      +
                    </button>

                    {/* Text Input */}
                    <input
                      type="text"
                      className="gemini-text-input"
                      placeholder="Ask ShopVision AI..."
                      value={queryText}
                      onChange={(e) => setQueryText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && queryText.trim()) {
                          alert('Searching nearby stores for: ' + queryText);
                          setQueryText('');
                        }
                      }}
                    />

                    {/* Mic Button */}
                    <button
                      type="button"
                      className="input-icon-btn mic-icon-btn"
                      title="Voice Search"
                      onClick={() => {
                        alert("Mic button is working!");
                        setQueryText('Listening...');
                        setTimeout(() => {
                          setQueryText('suggest me nearby stores for my protein supplements');
                        }, 800);
                      }}
                    >
                      🎤
                    </button>

                    {/* Compact Send Button */}
                    <button
                      type="button"
                      className="gemini-send-btn"
                      onClick={() => {
                        if (!queryText.trim() && uploadedFiles.length === 0) return;
                        alert('Searching nearby inventory...');
                        setQueryText('');
                        setUploadedFiles([]);
                      }}
                    >
                      ↑
                    </button>
                  </div>

                  {uploadedFiles.length > 0 && (
                    <div className="uploaded-list" style={{ fontSize: '0.75rem', marginTop: '0.4rem' }}>
                      📎 Attached: {uploadedFiles.join(', ')}
                    </div>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN: Nearby Product Availability & Tracker */}
              <div className="card right-card">
                <div>
                  <h3>Nearby Store Availability</h3>
                  <p className="assistant-desc">Yellow: Available | Red: Out of Stock | Green: Purchased</p>

                  <div className="product-tracker-list">
                    {/* Item 1 */}
                    <div className={`tracker-item ${isPurchased1 ? 'green-status' : 'yellow-status'}`}>
                      <div className="item-info">
                        <strong>Pumpkin Seeds</strong>
                        <small>Gupta General Store (0.4 km away)</small>
                      </div>
                      <button 
                        type="button"
                        className={`status-toggle-btn ${isPurchased1 ? 'purchased-circle-btn' : ''}`}
                        onClick={() => setIsPurchased1(!isPurchased1)}
                      >
                        {isPurchased1 ? '✓' : 'Mark Purchased'}
                      </button>
                    </div>

                    {/* Item 2 */}
                    <div className={`tracker-item ${isPurchased2 ? 'green-status' : 'red-status'}`}>
                      <div className="item-info">
                        <strong>Whole Wheat Bread</strong>
                        <small>Not available in nearby stores</small>
                      </div>
                      <button 
                        type="button"
                        className={`status-toggle-btn ${isPurchased2 ? 'purchased-circle-btn' : ''}`}
                        onClick={() => setIsPurchased2(!isPurchased2)}
                      >
                        {isPurchased2 ? '✓' : 'Mark Purchased'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )} 

        {/* Customized Shopkeeper Dashboard */}
        {activeRole === 'Shopkeeper' && (
          <div className="shopkeeper-wrapper">
            <h1 className="shopkeeper-title">Shopkeeper</h1>

            <div className="shopkeeper-grid">
              {/* LEFT COLUMN */}
              <div className="card left-card">
                <h3>Upload Inventory Video or Photos</h3>

                {/* Drag and Drop Box */}
                <div className="dropzone" onClick={() => fileInputRef.current.click()}>
                  <p>📁 Drag and drop media here, or use options below</p>
                  <small>Supports MP4, MOV, JPEG, PNG</small>
                </div>

                {/* Google Forms Style File Actions */}
                <div className="file-actions">
                  <button type="button" className="action-btn" onClick={() => cameraInputRef.current.click()}>
                    📷 Record / Capture
                  </button>
                  <button type="button" className="action-btn" onClick={() => fileInputRef.current.click()}>
                    📁 Browse Files
                  </button>
                </div>

                {/* Hidden Native File Pickers */}
                <input
                  type="file"
                  ref={cameraInputRef}
                  accept="image/*,video/*"
                  capture="environment"
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*,video/*"
                  multiple
                  style={{ display: 'none' }}
                  onChange={handleFileChange}
                />

                {/* File Attachment Status */}
                {uploadedFiles.length > 0 && (
                  <div className="uploaded-list">
                    <strong>Attached Files:</strong>
                    {uploadedFiles.map((file, idx) => (
                      <div key={idx}>✓ {file}</div>
                    ))}
                  </div>
                )}

                {/* Location Section */}
                <div className="location-group">
                  <h3>Shop Location</h3>
                  <button type="button" className="btn-secondary" onClick={handleGetLocation}>
                    📍 Use Current Location
                  </button>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Or manually type shop address..."
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {/* Create Database Action */}
                <button type="button" className="btn-primary" onClick={handleCreateDatabase}>
                  ⚡ Create Database
                </button>
              </div>

              {/* RIGHT COLUMN */}
              <div className="card right-card">
                <div>
                  <h3>Captured Products</h3>
                  <div className="product-list">
                    {products.map((item) => (
                      <div key={item.id} className="product-item">
                        <span>{item.name}</span>
                        <small className="status-badge">{item.status}</small>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Question / Query Box */}
                <div className="query-box">
                  <h3>Have a Question?</h3>
                  <textarea
                    className="input-field textarea"
                    placeholder="Type your query here..."
                    value={queryText}
                    onChange={(e) => setQueryText(e.target.value)}
                  ></textarea>
                  <button
                    type="button"
                    className="btn-secondary"
                    style={{ marginTop: '0.5rem' }}
                    onClick={() => {
                      if (!queryText.trim()) return
                      alert('Query submitted successfully!')
                      setQueryText('')
                    }}
                  >
                    Send Query
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Admin Control Center Placeholder */}
        {activeRole === 'Admin' && (
          <div className="page-view">
            <h2>⚙️ Admin Control Center</h2>
            <p className="placeholder-text">Ready for your custom Admin layout...</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App