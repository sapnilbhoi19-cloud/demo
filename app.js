// Application Data
const appData = {
  "users": [
    {"id": 1, "name": "Nirav Mistry", "role": "Admin", "email": "nirav@orbisphere.com", "status": "online", "avatar": "ðŸ‘¨â€ðŸ’¼"},
    {"id": 2, "name": "John Smith", "role": "Team Lead", "email": "john@orbisphere.com", "status": "online", "avatar": "ðŸ‘¨â€ðŸ’»"},
    {"id": 3, "name": "Sarah Johnson", "role": "Member", "email": "sarah@orbisphere.com", "status": "away", "avatar": "ðŸ‘©â€ðŸ’¼"},
    {"id": 4, "name": "Mike Chen", "role": "Member", "email": "mike@orbisphere.com", "status": "offline", "avatar": "ðŸ‘¨â€ðŸ”¬"}
  ],
  "teams": [
    {"id": 1, "name": "Development Team", "members": 12, "description": "Core development and engineering team"},
    {"id": 2, "name": "Marketing Team", "members": 8, "description": "Marketing and communications team"},
    {"id": 3, "name": "HR Department", "members": 5, "description": "Human resources and admin team"}
  ],
  "announcements": [
    {"id": 1, "title": "Welcome to OrbiSphere!", "content": "Our new internal platform is now live. Explore features and stay connected!", "author": "Admin", "date": "2025-09-29", "priority": "high"},
    {"id": 2, "title": "Team Meeting Tomorrow", "content": "All-hands meeting scheduled for 10 AM in Conference Room A", "author": "John Smith", "date": "2025-09-28", "priority": "medium"},
    {"id": 3, "title": "New Project Guidelines", "content": "Updated project management guidelines are now available in the documents section", "author": "Sarah Johnson", "date": "2025-09-27", "priority": "normal"}
  ],
  "events": [
    {"id": 1, "title": "Sprint Planning Meeting", "date": "2025-10-01", "time": "10:00 AM", "location": "Conference Room B", "attendees": 8, "status": "upcoming"},
    {"id": 2, "title": "Team Building Workshop", "date": "2025-10-03", "time": "2:00 PM", "location": "Main Hall", "attendees": 25, "status": "upcoming"},
    {"id": 3, "title": "Product Demo", "date": "2025-10-05", "time": "3:00 PM", "location": "Auditorium", "attendees": 50, "status": "upcoming"}
  ],
  "messages": [
    {"id": 1, "sender": "John Smith", "content": "Great work on the latest release everyone!", "timestamp": "10:30 AM", "team": "Development Team"},
    {"id": 2, "sender": "Sarah Johnson", "content": "The marketing materials are ready for review", "timestamp": "11:15 AM", "team": "Marketing Team"},
    {"id": 3, "sender": "Mike Chen", "content": "Can we schedule a code review session?", "timestamp": "2:45 PM", "team": "Development Team"}
  ],
  "documents": [
    {"id": 1, "name": "Project Guidelines 2025.pdf", "size": "2.3 MB", "uploadedBy": "Admin", "date": "2025-09-25", "type": "pdf"},
    {"id": 2, "name": "Team Roster.xlsx", "size": "1.1 MB", "uploadedBy": "HR Team", "date": "2025-09-24", "type": "excel"},
    {"id": 3, "name": "Brand Assets.zip", "size": "15.7 MB", "uploadedBy": "Marketing Team", "date": "2025-09-23", "type": "archive"}
  ],
  "notifications": [
    {"id": 1, "type": "event", "message": "Reminder: Sprint Planning Meeting in 1 hour", "timestamp": "9:00 AM", "read": false},
    {"id": 2, "type": "message", "message": "New message from John Smith in Development Team", "timestamp": "10:30 AM", "read": false},
    {"id": 3, "type": "document", "message": "New document shared: Project Guidelines 2025.pdf", "timestamp": "Yesterday", "read": true}
  ],
  "polls": [
    {"id": 1, "question": "What time works best for weekly team meetings?", "options": ["9:00 AM", "10:00 AM", "2:00 PM", "3:00 PM"], "votes": [5, 12, 8, 3], "status": "active"},
    {"id": 2, "question": "Which office improvement should we prioritize?", "options": ["Better WiFi", "More Meeting Rooms", "Coffee Machine", "Parking Space"], "votes": [15, 8, 22, 12], "status": "closed"}
  ],
  "analytics": {
    "totalUsers": 45,
    "activeUsers": 38,
    "messagesThisWeek": 247,
    "eventsThisMonth": 12,
    "documentsShared": 89,
    "teamEngagement": 87
  }
};

// Application State
let currentModule = 'dashboard';
let currentUser = null;
let currentTeam = 'Development Team';

// Initialize App
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM loaded, initializing app...');
  initializeApp();
});

function initializeApp() {
  console.log('Initializing app...');
  
  // Setup login form handler first
  setupLoginForm();
  
  // Other initialization will happen after login
  setupAppHandlers();
}

function setupLoginForm() {
  const loginForm = document.getElementById('login-form');
  console.log('Login form found:', !!loginForm);
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      console.log('Login form submitted');
      handleLogin(e);
    });
  }
  
  // Also handle enter key in password field
  const passwordField = document.getElementById('password');
  if (passwordField) {
    passwordField.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        console.log('Enter pressed in password field');
        handleLogin(e);
      }
    });
  }
  
  // Handle forgot password link
  const forgotPasswordLink = document.querySelector('.forgot-password');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      alert('Password reset functionality would be implemented here. For demo purposes, use: nirav@orbisphere.com / password123');
    });
  }
}

function setupAppHandlers() {
  // Navigation handlers
  setupNavigation();
  
  // Modal handlers
  setupModals();
  
  // Responsive handlers
  setupResponsive();
}

function handleLogin(e) {
  e.preventDefault();
  console.log('Handling login...');
  
  const emailField = document.getElementById('email');
  const passwordField = document.getElementById('password');
  
  if (!emailField || !passwordField) {
    console.error('Email or password fields not found');
    return;
  }
  
  const email = emailField.value.trim();
  const password = passwordField.value.trim();
  
  console.log('Login attempt with email:', email);
  
  // Validate inputs
  if (!email || !password) {
    alert('Please enter both email and password');
    return;
  }
  
  // Simple authentication check
  const user = appData.users.find(u => u.email === email);
  
  if (user && password === 'password123') {
    console.log('Login successful for user:', user.name);
    currentUser = user;
    
    // Hide login screen and show app
    const loginScreen = document.getElementById('login-screen');
    const appContainer = document.getElementById('app-container');
    
    if (loginScreen && appContainer) {
      loginScreen.classList.add('hidden');
      appContainer.classList.remove('hidden');
      
      // Update user info in header
      const userNameEl = document.querySelector('.user-name');
      const userAvatarEl = document.querySelector('.user-avatar');
      
      if (userNameEl) userNameEl.textContent = user.name;
      if (userAvatarEl) userAvatarEl.textContent = user.avatar;
      
      // Initialize modules after successful login
      initializeModules();
      
      // Load dashboard
      loadModule('dashboard');
    }
  } else {
    console.log('Login failed');
    alert('Invalid credentials. Please use:\nEmail: nirav@orbisphere.com\nPassword: password123');
  }
}

function setupNavigation() {
  const navLinks = document.querySelectorAll('.nav-link');
  console.log('Setting up navigation for', navLinks.length, 'links');
  
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const module = link.getAttribute('data-module');
      console.log('Navigation clicked:', module);
      loadModule(module);
      
      // Update active state
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      
      // Close sidebar on mobile
      const sidebar = document.getElementById('sidebar');
      if (sidebar) {
        sidebar.classList.remove('open');
      }
    });
  });
}

function loadModule(moduleName) {
  console.log('Loading module:', moduleName);
  
  // Hide all modules
  document.querySelectorAll('.module').forEach(module => {
    module.classList.remove('active');
  });
  
  // Show selected module
  const targetModule = document.getElementById(moduleName);
  if (targetModule) {
    targetModule.classList.add('active');
    currentModule = moduleName;
    
    // Load module-specific content
    switch (moduleName) {
      case 'dashboard':
        loadDashboard();
        break;
      case 'communication':
        loadCommunication();
        break;
      case 'events':
        loadEvents();
        break;
      case 'documents':
        loadDocuments();
        break;
      case 'feedback':
        loadFeedback();
        break;
      case 'admin':
        loadAdmin();
        break;
      case 'profile':
        loadProfile();
        break;
    }
  }
}

function loadDashboard() {
  console.log('Loading dashboard...');
  
  // Load announcements
  const announcementsList = document.getElementById('announcements-list');
  if (announcementsList) {
    announcementsList.innerHTML = appData.announcements.map(announcement => `
      <div class="announcement-item">
        <div class="announcement-header">
          <h4 class="announcement-title">${announcement.title}</h4>
          <span class="announcement-priority priority-${announcement.priority}">${announcement.priority}</span>
        </div>
        <p class="announcement-content">${announcement.content}</p>
        <div class="announcement-meta">By ${announcement.author} â€¢ ${announcement.date}</div>
      </div>
    `).join('');
  }
  
  // Load events preview
  const eventsPreviewList = document.getElementById('events-preview-list');
  if (eventsPreviewList) {
    eventsPreviewList.innerHTML = appData.events.slice(0, 3).map(event => `
      <div class="event-preview" style="padding: 12px; border-bottom: 1px solid var(--color-border); margin-bottom: 8px;">
        <div class="event-preview-header" style="display: flex; justify-content: space-between; margin-bottom: 4px;">
          <strong>${event.title}</strong>
          <span class="event-date" style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">${event.date}</span>
        </div>
        <div class="event-preview-details" style="color: var(--color-text-secondary); font-size: var(--font-size-sm);">
          ðŸ“ ${event.location} â€¢ â° ${event.time} â€¢ ðŸ‘¥ ${event.attendees} attendees
        </div>
      </div>
    `).join('');
  }
}

function loadCommunication() {
  console.log('Loading communication...');
  
  // Load teams list
  const teamsList = document.getElementById('teams-list');
  if (teamsList) {
    teamsList.innerHTML = appData.teams.map(team => `
      <div class="team-item ${team.name === currentTeam ? 'active' : ''}" data-team="${team.name}">
        <div class="team-name">${team.name}</div>
        <div class="team-members">${team.members} members</div>
      </div>
    `).join('');
    
    // Add team click handlers
    teamsList.addEventListener('click', (e) => {
      const teamItem = e.target.closest('.team-item');
      if (teamItem) {
        currentTeam = teamItem.getAttribute('data-team');
        loadMessages();
        
        // Update active state
        document.querySelectorAll('.team-item').forEach(item => item.classList.remove('active'));
        teamItem.classList.add('active');
        
        // Update chat header
        const activeTeamName = document.getElementById('active-team-name');
        if (activeTeamName) {
          activeTeamName.textContent = currentTeam;
        }
      }
    });
  }
  
  loadMessages();
  
  // Message sending
  const sendButton = document.getElementById('send-message');
  const messageInput = document.getElementById('message-input');
  
  if (sendButton && messageInput) {
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        sendMessage();
      }
    });
  }
}

function loadMessages() {
  const messagesContainer = document.getElementById('messages-container');
  if (messagesContainer) {
    const teamMessages = appData.messages.filter(msg => msg.team === currentTeam);
    
    messagesContainer.innerHTML = teamMessages.map(message => `
      <div class="message-item">
        <div class="message-header">
          <span class="message-sender">${message.sender}</span>
          <span class="message-time">${message.timestamp}</span>
        </div>
        <div class="message-content">${message.content}</div>
      </div>
    `).join('');
  }
}

function sendMessage() {
  const messageInput = document.getElementById('message-input');
  const messagesContainer = document.getElementById('messages-container');
  
  if (messageInput && messagesContainer && messageInput.value.trim()) {
    const newMessage = {
      id: Date.now(),
      sender: currentUser.name,
      content: messageInput.value.trim(),
      timestamp: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
      team: currentTeam
    };
    
    // Add to data
    appData.messages.push(newMessage);
    
    // Add to UI
    const messageElement = document.createElement('div');
    messageElement.className = 'message-item';
    messageElement.innerHTML = `
      <div class="message-header">
        <span class="message-sender">${newMessage.sender}</span>
        <span class="message-time">${newMessage.timestamp}</span>
      </div>
      <div class="message-content">${newMessage.content}</div>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Clear input
    messageInput.value = '';
  }
}

function loadEvents() {
  console.log('Loading events...');
  
  const eventsGrid = document.getElementById('events-grid');
  if (eventsGrid) {
    eventsGrid.innerHTML = appData.events.map(event => `
      <div class="event-card card">
        <div class="event-header">
          <h3 class="event-title">${event.title}</h3>
          <span class="event-status status status--info">${event.status}</span>
        </div>
        <div class="event-details">
          <div class="event-detail">
            ðŸ“… ${event.date}
          </div>
          <div class="event-detail">
            â° ${event.time}
          </div>
          <div class="event-detail">
            ðŸ“ ${event.location}
          </div>
          <div class="event-detail">
            ðŸ‘¥ ${event.attendees} attendees
          </div>
        </div>
        <div class="event-actions">
          <button class="btn btn--primary btn--sm" onclick="handleRSVP(${event.id})">RSVP</button>
          <button class="btn btn--secondary btn--sm">Details</button>
        </div>
      </div>
    `).join('');
  }
}

function handleRSVP(eventId) {
  alert('RSVP functionality - You have been registered for this event!');
}

function loadDocuments() {
  console.log('Loading documents...');
  
  const documentsList = document.getElementById('documents-list');
  if (documentsList) {
    documentsList.innerHTML = appData.documents.map(doc => {
      const icon = getFileIcon(doc.type);
      return `
        <div class="document-item">
          <div class="document-info">
            <div class="document-icon">${icon}</div>
            <div class="document-details">
              <h4>${doc.name}</h4>
              <div class="document-meta">${doc.size} â€¢ Uploaded by ${doc.uploadedBy} â€¢ ${doc.date}</div>
            </div>
          </div>
          <div class="document-actions">
            <button class="btn btn--secondary btn--sm" onclick="handleDownload('${doc.name}')">Download</button>
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Setup file upload simulation
  const uploadArea = document.getElementById('upload-area');
  const fileInput = document.getElementById('file-input');
  const uploadBtn = document.getElementById('upload-document-btn');
  
  if (uploadArea && fileInput) {
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
      e.preventDefault();
      uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
      uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
      e.preventDefault();
      uploadArea.classList.remove('dragover');
      alert('File upload simulation - files would be uploaded here');
    });
    
    fileInput.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        alert(`Selected ${e.target.files.length} file(s) for upload simulation`);
      }
    });
  }
  
  if (uploadBtn) {
    uploadBtn.addEventListener('click', () => {
      if (fileInput) fileInput.click();
    });
  }
}

function handleDownload(fileName) {
  alert(`Downloading ${fileName} - Download simulation`);
}

function getFileIcon(type) {
  switch (type) {
    case 'pdf': return 'ðŸ“„';
    case 'excel': return 'ðŸ“Š';
    case 'archive': return 'ðŸ—œï¸';
    default: return 'ðŸ“';
  }
}

function loadFeedback() {
  console.log('Loading feedback...');
  
  // Load active polls
  const activePollsList = document.getElementById('active-polls-list');
  if (activePollsList) {
    const activePolls = appData.polls.filter(poll => poll.status === 'active');
    activePollsList.innerHTML = activePolls.map(poll => `
      <div class="poll-item">
        <div class="poll-question">${poll.question}</div>
        <div class="poll-options">
          ${poll.options.map((option, index) => `
            <div class="poll-option" data-poll-id="${poll.id}" data-option-index="${index}">
              <span>${option}</span>
              <span class="poll-vote-count">${poll.votes[index]} votes</span>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }
  
  // Load poll results with visual progress bars
  const pollResultsList = document.getElementById('poll-results-list');
  if (pollResultsList) {
    const closedPolls = appData.polls.filter(poll => poll.status === 'closed');
    pollResultsList.innerHTML = closedPolls.map(poll => {
      const total = poll.votes.reduce((a, b) => a + b, 0);
      return `
        <div class="poll-item">
          <div class="poll-question">${poll.question}</div>
          <div class="poll-results">
            ${poll.options.map((option, index) => {
              const percentage = Math.round((poll.votes[index] / total) * 100);
              return `
                <div class="poll-result-item" style="margin-bottom: 8px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                    <span>${option}</span>
                    <span style="font-weight: bold;">${percentage}%</span>
                  </div>
                  <div style="background-color: var(--color-secondary); height: 8px; border-radius: 4px; overflow: hidden;">
                    <div style="width: ${percentage}%; height: 100%; background-color: var(--color-primary); transition: width 0.3s ease;"></div>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }).join('');
  }
  
  // Add voting functionality
  document.addEventListener('click', (e) => {
    if (e.target.closest('.poll-option')) {
      const pollOption = e.target.closest('.poll-option');
      const pollId = parseInt(pollOption.getAttribute('data-poll-id'));
      const optionIndex = parseInt(pollOption.getAttribute('data-option-index'));
      
      // Update vote count
      const poll = appData.polls.find(p => p.id === pollId);
      if (poll) {
        poll.votes[optionIndex]++;
        loadFeedback(); // Reload to show updated counts
        alert('Thank you for your vote!');
      }
    }
  });
}

function loadAdmin() {
  console.log('Loading admin...');
  
  // Setup tab switching
  const tabButtons = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');
  
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');
      
      // Update button states
      tabButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Update panel states
      tabPanels.forEach(panel => panel.classList.remove('active'));
      const targetPanel = document.getElementById(`admin-${targetTab}`);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
      
      // Load tab-specific content
      if (targetTab === 'analytics') {
        setTimeout(loadAnalyticsChart, 100); // Small delay to ensure DOM is ready
      }
    });
  });
  
  // Load users list
  loadAdminUsers();
  
  // Load teams list
  loadAdminTeams();
}

function loadAdminUsers() {
  const adminUsersList = document.getElementById('admin-users-list');
  if (adminUsersList) {
    adminUsersList.innerHTML = appData.users.map(user => `
      <div class="user-row">
        <div class="user-info">
          <div class="user-avatar-small">${user.avatar}</div>
          <div class="user-details">
            <h4>${user.name}</h4>
            <p class="user-email">${user.email}</p>
          </div>
        </div>
        <div class="user-role">
          <span class="status status--info">${user.role}</span>
        </div>
        <div class="user-status">
          <span class="status ${user.status === 'online' ? 'status--success' : user.status === 'away' ? 'status--warning' : 'status--error'}">${user.status}</span>
        </div>
        <div class="user-actions">
          <button class="btn btn--secondary btn--sm" onclick="editUser(${user.id})">Edit</button>
        </div>
      </div>
    `).join('');
  }
}

function editUser(userId) {
  alert(`Edit user functionality for user ID: ${userId}`);
}

function loadAdminTeams() {
  const adminTeamsList = document.getElementById('admin-teams-list');
  if (adminTeamsList) {
    adminTeamsList.innerHTML = appData.teams.map(team => `
      <div class="team-row" style="display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 16px; align-items: center; padding: 12px; border-bottom: 1px solid var(--color-border);">
        <div class="team-info">
          <h4 style="margin: 0; margin-bottom: 4px;">${team.name}</h4>
          <p style="margin: 0; font-size: var(--font-size-sm); color: var(--color-text-secondary);">${team.description}</p>
        </div>
        <div class="team-members">${team.members} members</div>
        <div class="team-actions">
          <button class="btn btn--secondary btn--sm" onclick="manageTeam(${team.id})">Manage</button>
        </div>
      </div>
    `).join('');
  }
}

function manageTeam(teamId) {
  alert(`Team management functionality for team ID: ${teamId}`);
}

function loadAnalyticsChart() {
  const ctx = document.getElementById('activity-chart');
  if (ctx && window.Chart) {
    // Clear any existing chart
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }
    
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Total Users', 'Active Users', 'Messages', 'Events', 'Documents'],
        datasets: [{
          label: 'Activity Metrics',
          data: [
            appData.analytics.totalUsers,
            appData.analytics.activeUsers,
            appData.analytics.messagesThisWeek,
            appData.analytics.eventsThisMonth,
            appData.analytics.documentsShared
          ],
          backgroundColor: ['#1FB8CD', '#FFC185', '#B4413C', '#ECEBD5', '#5D878F']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
}

function loadProfile() {
  console.log('Loading profile...');
  // Profile is mostly static, additional functionality can be added here
}

function setupModals() {
  // Create Event Modal
  const createEventBtn = document.getElementById('create-event-btn');
  const createEventModal = document.getElementById('create-event-modal');
  const modalClose = document.querySelector('.modal-close');
  const modalCancel = document.querySelector('.modal-cancel');
  
  if (createEventBtn && createEventModal) {
    createEventBtn.addEventListener('click', () => {
      console.log('Opening create event modal');
      createEventModal.classList.remove('hidden');
    });
    
    const closeModal = () => {
      console.log('Closing create event modal');
      createEventModal.classList.add('hidden');
    };
    
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalCancel) modalCancel.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    createEventModal.addEventListener('click', (e) => {
      if (e.target === createEventModal) {
        closeModal();
      }
    });
    
    // Handle form submission
    const eventForm = document.getElementById('event-form');
    if (eventForm) {
      eventForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Event created successfully!');
        closeModal();
      });
    }
  }
}

function setupResponsive() {
  const sidebarToggle = document.getElementById('sidebar-toggle');
  const sidebar = document.getElementById('sidebar');
  
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      sidebar.classList.toggle('open');
    });
    
    // Close sidebar when clicking outside
    document.addEventListener('click', (e) => {
      if (!sidebar.contains(e.target) && !sidebarToggle.contains(e.target)) {
        sidebar.classList.remove('open');
      }
    });
  }
}

function initializeModules() {
  console.log('Initializing modules...');
  // Initialize navigation
  setupNavigation();
  
  // Initialize modal functionality
  setupModals();
  
  // Initialize dashboard as default
  loadModule('dashboard');
}