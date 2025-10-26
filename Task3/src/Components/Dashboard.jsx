import { useState, useEffect } from 'react';
import '../Styles/dashboard.css'
import Footer from './Footer';

const Dashboard = ({ onLogout, onNavigateToTickets }) => { // ADD onNavigateToTickets prop
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0
  });

  useEffect(() => {
    const mockTickets = [
      { id: 1, title: 'Fix login issue', status: 'open' },
      { id: 2, title: 'Update documentation', status: 'in_progress' },
      { id: 3, title: 'Design new feature', status: 'open' },
      { id: 4, title: 'Resolve bug #123', status: 'closed' },
      { id: 5, title: 'Performance optimization', status: 'open' }
    ];

    const total = mockTickets.length;
    const open = mockTickets.filter(ticket => ticket.status === 'open').length;
    const inProgress = mockTickets.filter(ticket => ticket.status === 'in_progress').length;
    const closed = mockTickets.filter(ticket => ticket.status === 'closed').length;

    setStats({ total, open, inProgress, closed });
  }, []);

  const userName = localStorage.getItem('user_name') || 'User';

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="container">
          <nav className="flex justify-between items-center">
            <h1 style={{color: 'var(--primary-500)', fontSize: '1.5rem'}}>🎫 Horbit Dashboard</h1>
            <button className="btn btn-outline" onClick={onLogout}>
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="dashboard-main">
        <div className="container">
          <section className="welcome-section">
            <h2>Welcome back, {userName}! 👋</h2>
            <p>Here's your team's ticket overview</p>
          </section>

          <section className="stats-grid-section">
            <h3>Ticket Overview</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon" style={{background: 'var(--primary-500)'}}>📊</div>
                <div className="stat-content">
                  <h4>Total Tickets</h4>
                  <p className="stat-number">{stats.total}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{background: 'var(--status-open)'}}>🟢</div>
                <div className="stat-content">
                  <h4>Open Tickets</h4>
                  <p className="stat-number">{stats.open}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{background: 'var(--status-in-progress)'}}>🟡</div>
                <div className="stat-content">
                  <h4>In Progress</h4>
                  <p className="stat-number">{stats.inProgress}</p>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon" style={{background: 'var(--status-closed)'}}>⚫</div>
                <div className="stat-content">
                  <h4>Resolved</h4>
                  <p className="stat-number">{stats.closed}</p>
                </div>
              </div>
            </div>
          </section>

          <section className="actions-section">
            <h3>Quick Actions</h3>
            <div className="actions-grid">
              <button className="action-card" onClick={onNavigateToTickets}>
                <div className="action-icon">➕</div>
                <h4>Create New Ticket</h4>
                <p>Add a new ticket to the system</p>
              </button>

              <button className="action-card" onClick={onNavigateToTickets}>
                <div className="action-icon">📋</div>
                <h4>View All Tickets</h4>
                <p>Manage and update existing tickets</p>
              </button>

              <button className="action-card">
                <div className="action-icon">👥</div>
                <h4>Team Management</h4>
                <p>Invite and manage team members</p>
              </button>

              <button className="action-card">
                <div className="action-icon">⚙️</div>
                <h4>Settings</h4>
                <p>Configure your workspace</p>
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;