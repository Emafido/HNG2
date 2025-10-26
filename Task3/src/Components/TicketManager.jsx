import { useState, useEffect } from 'react';
import '../Styles/ticketManager.css'
const TicketManager = ({ onBackToDashboard, onLogout }) => {
  const [tickets, setTickets] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [editingTicket, setEditingTicket] = useState(null);
  const [newTicket, setNewTicket] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const mockTickets = [
      { 
        id: 1, 
        title: 'Fix login authentication', 
        description: 'Users are unable to login with correct credentials. Investigate and resolve the authentication issue.',
        status: 'open', 
        priority: 'high',
        createdAt: '2024-01-15',
        updatedAt: '2024-01-15'
      },
      { 
        id: 2, 
        title: 'Update documentation', 
        description: 'Add new API endpoints to documentation and update existing examples.',
        status: 'in_progress', 
        priority: 'medium',
        createdAt: '2024-01-14',
        updatedAt: '2024-01-15'
      },
      { 
        id: 3, 
        title: 'Design new dashboard', 
        description: 'Create wireframes for the new dashboard layout with improved analytics.',
        status: 'closed', 
        priority: 'low',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-12'
      },
      { 
        id: 4, 
        title: 'Mobile responsiveness', 
        description: 'Improve mobile responsiveness for ticket management interface.',
        status: 'open', 
        priority: 'high',
        createdAt: '2024-01-16',
        updatedAt: '2024-01-16'
      }
    ];
    setTickets(mockTickets);
  }, []);

  const filteredTickets = filterStatus === 'all' 
    ? tickets 
    : tickets.filter(ticket => ticket.status === filterStatus);

  const validateTicket = (ticket) => {
    const newErrors = {};
    if (!ticket.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!ticket.status) {
      newErrors.status = 'Status is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateTicket = () => {
    if (validateTicket(newTicket)) {
      const ticket = {
        ...newTicket,
        id: Date.now(),
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      };
      setTickets([...tickets, ticket]);
      setNewTicket({ title: '', description: '', status: 'open', priority: 'medium' });
      setIsCreating(false);
      setErrors({});
    }
  };

  const handleUpdateTicket = () => {
    if (validateTicket(editingTicket)) {
      setTickets(tickets.map(ticket => 
        ticket.id === editingTicket.id 
          ? { ...editingTicket, updatedAt: new Date().toISOString().split('T')[0] }
          : ticket
      ));
      setEditingTicket(null);
      setErrors({});
    }
  };

  const handleDeleteTicket = (id) => {
    if (window.confirm('Are you sure you want to delete this ticket?')) {
      setTickets(tickets.filter(ticket => ticket.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setTickets(tickets.map(ticket => 
      ticket.id === id 
        ? { ...ticket, status: newStatus, updatedAt: new Date().toISOString().split('T')[0] }
        : ticket
    ));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'status-open';
      case 'in_progress': return 'status-in-progress';
      case 'closed': return 'status-closed';
      default: return 'status-open';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return 'priority-medium';
    }
  };

  const getStatusCount = (status) => {
    return tickets.filter(ticket => ticket.status === status).length;
  };

  return (
    <div className="ticket-manager">
      <header className="ticket-header">
        <div className="container">
          <nav className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button className="btn btn-outline" onClick={onBackToDashboard}>
                ← Dashboard
              </button>
              <h1>🎫 Ticket Management</h1>
            </div>
            <button className="btn btn-outline" onClick={onLogout}>
              Logout
            </button>
          </nav>
        </div>
      </header>

      <main className="ticket-main">
        <div className="container">
          <div className="ticket-stats">
            <div className="stat-item">
              <span className="stat-number">{tickets.length}</span>
              <span className="stat-label">Total</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{getStatusCount('open')}</span>
              <span className="stat-label">Open</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{getStatusCount('in_progress')}</span>
              <span className="stat-label">In Progress</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{getStatusCount('closed')}</span>
              <span className="stat-label">Closed</span>
            </div>
          </div>

          <div className="ticket-actions-bar">
            <button 
              className="btn btn-primary"
              onClick={() => setIsCreating(true)}
            >
              + Create New Ticket
            </button>
            
            <div className="filter-group">
              <label>Filter by Status:</label>
              <select 
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Tickets</option>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {isCreating && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-header">
                  <h3>Create New Ticket</h3>
                  <button 
                    className="close-btn"
                    onClick={() => setIsCreating(false)}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      className={`form-input ${errors.title ? 'error' : ''}`}
                      value={newTicket.title}
                      onChange={(e) => setNewTicket({...newTicket, title: e.target.value})}
                      placeholder="Enter ticket title"
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-input"
                      rows="3"
                      value={newTicket.description}
                      onChange={(e) => setNewTicket({...newTicket, description: e.target.value})}
                      placeholder="Enter ticket description"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Status *</label>
                      <select
                        className={`form-input ${errors.status ? 'error' : ''}`}
                        value={newTicket.status}
                        onChange={(e) => setNewTicket({...newTicket, status: e.target.value})}
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                      </select>
                      {errors.status && <span className="error-message">{errors.status}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Priority</label>
                      <select
                        className="form-input"
                        value={newTicket.priority}
                        onChange={(e) => setNewTicket({...newTicket, priority: e.target.value})}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn btn-outline" onClick={() => setIsCreating(false)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleCreateTicket}>
                    Create Ticket
                  </button>
                </div>
              </div>
            </div>
          )}

          {editingTicket && (
            <div className="modal-overlay">
              <div className="modal">
                <div className="modal-header">
                  <h3>Edit Ticket</h3>
                  <button 
                    className="close-btn"
                    onClick={() => setEditingTicket(null)}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="modal-body">
                  <div className="form-group">
                    <label className="form-label">Title *</label>
                    <input
                      type="text"
                      className={`form-input ${errors.title ? 'error' : ''}`}
                      value={editingTicket.title}
                      onChange={(e) => setEditingTicket({...editingTicket, title: e.target.value})}
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Description</label>
                    <textarea
                      className="form-input"
                      rows="3"
                      value={editingTicket.description}
                      onChange={(e) => setEditingTicket({...editingTicket, description: e.target.value})}
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Status *</label>
                      <select
                        className={`form-input ${errors.status ? 'error' : ''}`}
                        value={editingTicket.status}
                        onChange={(e) => setEditingTicket({...editingTicket, status: e.target.value})}
                      >
                        <option value="open">Open</option>
                        <option value="in_progress">In Progress</option>
                        <option value="closed">Closed</option>
                      </select>
                      {errors.status && <span className="error-message">{errors.status}</span>}
                    </div>

                    <div className="form-group">
                      <label className="form-label">Priority</label>
                      <select
                        className="form-input"
                        value={editingTicket.priority}
                        onChange={(e) => setEditingTicket({...editingTicket, priority: e.target.value})}
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button className="btn btn-outline" onClick={() => setEditingTicket(null)}>
                    Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleUpdateTicket}>
                    Update Ticket
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="tickets-list">
            <h3>
              {filterStatus === 'all' ? 'All Tickets' : `${filterStatus.replace('_', ' ')} Tickets`} 
              ({filteredTickets.length})
            </h3>
            
            {filteredTickets.length === 0 ? (
              <div className="empty-state">
                <p>No tickets found. {filterStatus !== 'all' ? 'Try changing the filter.' : 'Create your first ticket!'}</p>
              </div>
            ) : (
              <div className="tickets-grid">
                {filteredTickets.map(ticket => (
                  <div key={ticket.id} className="ticket-card">
                    <div className="ticket-header">
                      <h4>{ticket.title}</h4>
                      <div className="ticket-badges">
                        <span className={`status-badge ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('_', ' ')}
                        </span>
                        <span className={`priority-badge ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority}
                        </span>
                      </div>
                    </div>
                    
                    <p className="ticket-description">
                      {ticket.description || 'No description provided.'}
                    </p>
                    
                    <div className="ticket-meta">
                      <div className="ticket-dates">
                        <span>Created: {ticket.createdAt}</span>
                        {ticket.updatedAt !== ticket.createdAt && (
                          <span>Updated: {ticket.updatedAt}</span>
                        )}
                      </div>
                    </div>

                    <div className="ticket-footer">
                      <div className="status-actions">
                        <label>Update Status:</label>
                        <select 
                          value={ticket.status}
                          onChange={(e) => handleStatusChange(ticket.id, e.target.value)}
                          className="status-select"
                        >
                          <option value="open">Open</option>
                          <option value="in_progress">In Progress</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                      
                      <div className="ticket-actions">
                        <button 
                          className="btn btn-sm btn-outline"
                          onClick={() => setEditingTicket(ticket)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-error"
                          onClick={() => handleDeleteTicket(ticket.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TicketManager;