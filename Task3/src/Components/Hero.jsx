const Hero = ({ onGetStarted, onLogin }) => {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <h1 className="hero-title">Streamline Your Team's Workflow</h1>
          <p className="hero-description">
            Powerful ticket management system that helps teams track, prioritize, 
            and resolve issues efficiently. Get started in minutes.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary btn-large" onClick={onGetStarted}>
              Get Started Free
            </button>
            <button className="btn btn-primary btn-large" onClick={onLogin}>
              Login 
            </button>
          </div>
        </div>
      </div>
      
      <div className="wave-background"></div>
      
      <div className="circle circle-1"></div>
      <div className="circle circle-2"></div>
    </section>
  )
}

export default Hero;