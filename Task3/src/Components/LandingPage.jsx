import React from 'react'
import Header from './Header'
import Hero from './Hero'
import Features from './Features'
import Footer from './Footer'

const LandingPage = ({ onNavigateToLogin, onNavigateToSignup }) => {
  return (
    <div>
      <Header 
        onLogin={onNavigateToLogin}
        onGetStarted={onNavigateToSignup}
      />
      <Hero 
        onLogin={onNavigateToLogin}
        onGetStarted={onNavigateToSignup}
      />
      <Features />
      <Footer />
    </div>
  )
}

export default LandingPage