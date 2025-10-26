import React, { useState, useEffect } from 'react'
import './styles/design-system.css';
import './styles/reset.css'; 
import './styles/utilities.css';
import LandingPage from './Components/LandingPage'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Dashboard from './Components/Dashboard'
import TicketManager from './Components/TicketManager' // ADD THIS
import './styles/Auth.css'

const App = () => {
  const [currentView, setCurrentView] = useState('landing')
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem('ticketapp_session')
    if (token) {
      setIsLoggedIn(true)
      setCurrentView('dashboard')
    }
  }, [])

  const handleLogin = () => {
    localStorage.setItem('ticketapp_session', 'mock-token')
    setIsLoggedIn(true)
    setCurrentView('dashboard')
  }

  const handleSignup = () => {
    localStorage.setItem('ticketapp_session', 'mock-token')
    setIsLoggedIn(true)
    setCurrentView('dashboard')
  }

  const handleLogout = () => {
    localStorage.removeItem('ticketapp_session')
    setIsLoggedIn(false)
    setCurrentView('landing')
  }

  // Render the current view
  if (currentView === 'landing') {
    return (
      <LandingPage 
        onNavigateToLogin={() => setCurrentView('login')}
        onNavigateToSignup={() => setCurrentView('signup')}
      />
    )
  }

  if (currentView === 'login') {
    return (
      <Login 
        onLogin={handleLogin}
        onSwitchToSignup={() => setCurrentView('signup')}
        onBack={() => setCurrentView('landing')}
      />
    )
  }

  if (currentView === 'signup') {
    return (
      <Signup 
        onSignup={handleSignup}
        onSwitchToLogin={() => setCurrentView('login')}
        onBack={() => setCurrentView('landing')}
      />
    )
  }

  if (currentView === 'dashboard') {
    return (
      <Dashboard 
        onLogout={handleLogout} 
        onNavigateToTickets={() => setCurrentView('tickets')} // ADD THIS
      />
    )
  }

  // ADD THIS NEW ROUTE
  if (currentView === 'tickets') {
    return (
      <TicketManager 
        onBackToDashboard={() => setCurrentView('dashboard')} 
        onLogout={handleLogout} 
      />
    )
  }

  return <div>Page not found</div>
}

export default App