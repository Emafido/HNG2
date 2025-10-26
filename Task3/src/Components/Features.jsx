const Features = () => {
  return (
    <section className="features-section">
      <div className="container">
        <h2 className="section-title">Why Choose Our Platform?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Lightning Fast</h3>
            <p>Create and manage tickets in seconds with our intuitive interface.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Team Collaboration</h3>
            <p>Perfect for team collaboration with real-time updates and communication.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Smart Analytics</h3>
            <p>Track progress with beautiful dashboards and detailed reporting.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Features;