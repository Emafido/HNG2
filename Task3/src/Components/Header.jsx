import { useState, useEffect } from 'react';

const Header = ({ onLogin, onGetStarted }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
  }, [isMenuOpen]);

  return (
    <div>
      <header className='container'>
        <nav className='flex justify-between items-center' style={{padding: '1rem 0'}}>
          <h1 style={{color: 'var(--primary-500)', fontSize: '1.5rem'}}>Horbit</h1>
          
          <div className='flex gap-4 desktop-only'>
            <button className="btn btn-outline" onClick={onLogin}>Login</button>
            <button className="btn btn-primary" onClick={onGetStarted}>Get Started</button>
          </div>

         { <button 
            className="hamburger mobile-only "
            
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>}
        </nav>
      </header>

      {isMenuOpen && (
        <div className="mobile-overlay">
          <button 
            className="close-btn"
            onClick={() => setIsMenuOpen(false)}
            style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}
          >
            ✕
          </button>
          
          <div className="mobile-menu">
            <button 
              className="btn btn-outline" 
              onClick={() => {
                onLogin();
                setIsMenuOpen(false);
              }}
              style={{borderColor: 'white', color: 'white'}}
            >
              Login
            </button>
            <button 
              className="btn btn-primary" 
              onClick={() => {
                onGetStarted();
                setIsMenuOpen(false);
              }}
            >
              Get Started
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Header;