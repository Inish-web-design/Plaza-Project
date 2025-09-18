// Plaza CMS Admin Script
class PlazaCMS {
    constructor() {
        this.events = [];
        this.currentEditingEvent = null;
        this.isLoggedIn = false;

        // Admin credentials
        this.credentials = {
            username: 'admin',
            password: 'plaza2025'
        };

        this.init();
    }

    init() {
        this.checkAuthStatus();
        this.bindEvents();
        this.loadEvents();
    }

    // Authentication
    checkAuthStatus() {
        const authStatus = sessionStorage.getItem('plazaAdminAuth');
        this.isLoggedIn = authStatus === 'true';

        if (this.isLoggedIn) {
            this.showDashboard();
        } else {
            this.showLogin();
        }
    }

    showLogin() {
        document.getElementById('loginForm').style.display = 'flex';
        document.getElementById('cmsDashboard').style.display = 'none';
    }

    showDashboard() {
        document.getElementById('loginForm').style.display = 'none';
        document.getElementById('cmsDashboard').style.display = 'block';
        this.loadEvents();
    }

    // Event Binding
    bindEvents() {
        // Login form
        const loginForm = document.getElementById('adminLogin');
        if (loginForm) {
            loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // Logout button
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', () => this.logout());
        }

        // Menu navigation
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', (e) => this.switchSection(e));
        });

        // Add event button
        const addEventBtn = document.getElementById('addEventBtn');
        if (addEventBtn) {
            addEventBtn.addEventListener('click', () => this.showEventModal());
        }

        // Modal controls
        const closeModal = document.getElementById('closeModal');
        if (closeModal) {
            closeModal.addEventListener('click', () => this.closeModal());
        }

        const cancelBtn = document.getElementById('cancelBtn');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.closeModal());
        }

        // Event form
        const eventForm = document.getElementById('eventForm');
        if (eventForm) {
            eventForm.addEventListener('submit', (e) => this.saveEvent(e));
        }

        // Settings buttons
        const exportBtn = document.getElementById('exportBtn');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => this.exportEvents());
        }

        const clearCacheBtn = document.getElementById('clearCacheBtn');
        if (clearCacheBtn) {
            clearCacheBtn.addEventListener('click', () => this.clearCache());
        }

        // Close modal on overlay click
        const modalOverlay = document.getElementById('eventModal');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    this.closeModal();
                }
            });
        }
    }

    // Login Handler
    async handleLogin(e) {
        e.preventDefault();

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        // Show loading state
        btnText.style.display = 'none';
        btnLoader.style.display = 'block';
        submitBtn.disabled = true;

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === this.credentials.username && password === this.credentials.password) {
            sessionStorage.setItem('plazaAdminAuth', 'true');
            this.isLoggedIn = true;
            this.showDashboard();
            this.clearLoginForm();
        } else {
            this.showError('Invalid username or password');
        }

        // Reset button state
        btnText.style.display = 'inline';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }

    showError(message) {
        const errorDiv = document.getElementById('errorMessage');
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';

        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    }

    clearLoginForm() {
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
        document.getElementById('errorMessage').style.display = 'none';
    }

    logout() {
        sessionStorage.removeItem('plazaAdminAuth');
        this.isLoggedIn = false;
        this.showLogin();
        this.clearLoginForm();
    }

    // Section Navigation
    switchSection(e) {
        const targetSection = e.currentTarget.dataset.section;

        // Update menu items
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });
        e.currentTarget.classList.add('active');

        // Update content sections
        document.querySelectorAll('.content-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${targetSection}Section`).classList.add('active');
    }

    // Event Management
    loadEvents() {
        // Load events from localStorage
        const savedEvents = localStorage.getItem('plazaEvents');
        this.events = savedEvents ? JSON.parse(savedEvents) : this.getDefaultEvents();
        this.renderEvents();
    }

    getDefaultEvents() {
        return [
            {
                id: 1,
                title: 'Christmas Carol Concert',
                date: '2024-12-15',
                time: '19:00',
                venue: 'small-hall',
                description: 'Join us for a festive evening of traditional Christmas carols and seasonal music.',
                price: 10,
                capacity: 75,
                status: 'upcoming',
                showBooking: true
            },
            {
                id: 2,
                title: 'New Year Celebration',
                date: '2024-12-31',
                time: '21:00',
                venue: 'both-halls',
                description: 'Ring in the New Year with music, dancing, and celebration.',
                price: 25,
                capacity: 200,
                status: 'upcoming',
                showBooking: true
            }
        ];
    }

    renderEvents() {
        const container = document.getElementById('eventsList');

        if (this.events.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <h3>No Events Yet</h3>
                    <p>Click "Add Event" to create your first event.</p>
                </div>
            `;
            return;
        }

        container.innerHTML = this.events.map(event => this.renderEventCard(event)).join('');

        // Bind event actions
        this.bindEventActions();
    }

    renderEventCard(event) {
        const venueNames = {
            'small-hall': 'Small Hall',
            'large-hall': 'Large Hall',
            'youth-club': 'Youth Club',
            'both-halls': 'Both Halls'
        };

        const formatDate = (dateStr) => {
            const date = new Date(dateStr);
            return date.toLocaleDateString('en-IE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        return `
            <div class="event-item" data-event-id="${event.id}">
                <div class="event-header">
                    <div>
                        <h3 class="event-title">${event.title}</h3>
                        <div class="event-date">${formatDate(event.date)} ${event.time ? `at ${event.time}` : ''}</div>
                    </div>
                    <div class="event-actions">
                        <button class="edit-btn" data-action="edit" data-event-id="${event.id}">Edit</button>
                        <button class="delete-btn" data-action="delete" data-event-id="${event.id}">Delete</button>
                    </div>
                </div>
                <div class="event-details">
                    <p><strong>Venue:</strong> ${venueNames[event.venue] || event.venue}</p>
                    ${event.description ? `<p><strong>Description:</strong> ${event.description}</p>` : ''}
                    ${event.price ? `<p><strong>Price:</strong> €${event.price}</p>` : ''}
                    ${event.capacity ? `<p><strong>Capacity:</strong> ${event.capacity} people</p>` : ''}
                    <span class="event-status status-${event.status}">${event.status.charAt(0).toUpperCase() + event.status.slice(1)}</span>
                </div>
            </div>
        `;
    }

    bindEventActions() {
        // Use event delegation for dynamic event buttons
        const container = document.getElementById('eventsList');
        if (container) {
            // Remove existing listener to prevent duplicates
            container.removeEventListener('click', this.handleEventAction);
            // Add new listener
            container.addEventListener('click', this.handleEventAction.bind(this));
        }
    }

    handleEventAction(e) {
        const target = e.target;

        if (target.dataset.action === 'edit') {
            const eventId = parseInt(target.dataset.eventId);
            this.editEvent(eventId);
        } else if (target.dataset.action === 'delete') {
            const eventId = parseInt(target.dataset.eventId);
            this.deleteEvent(eventId);
        }
    }

    // Modal Management
    showEventModal(eventId = null) {
        this.currentEditingEvent = eventId;
        const modal = document.getElementById('eventModal');
        const title = document.getElementById('modalTitle');

        if (eventId) {
            const event = this.events.find(e => e.id === eventId);
            title.textContent = 'Edit Event';
            this.populateEventForm(event);
        } else {
            title.textContent = 'Add New Event';
            this.clearEventForm();
        }

        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        document.getElementById('eventModal').style.display = 'none';
        document.body.style.overflow = 'auto';
        this.currentEditingEvent = null;
        this.clearEventForm();
    }

    populateEventForm(event) {
        document.getElementById('eventTitle').value = event.title || '';
        document.getElementById('eventDate').value = event.date || '';
        document.getElementById('eventTime').value = event.time || '';
        document.getElementById('eventVenue').value = event.venue || 'small-hall';
        document.getElementById('eventDescription').value = event.description || '';
        document.getElementById('eventPrice').value = event.price || '';
        document.getElementById('eventCapacity').value = event.capacity || '';
        document.getElementById('eventStatus').value = event.status || 'upcoming';
        document.getElementById('showBooking').checked = event.showBooking !== false; // Default to true
    }

    clearEventForm() {
        document.getElementById('eventForm').reset();
    }

    // Event CRUD Operations
    async saveEvent(e) {
        e.preventDefault();

        const submitBtn = e.target.querySelector('button[type="submit"]');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoader = submitBtn.querySelector('.btn-loader');

        // Show loading state
        btnText.classList.add('loading');
        btnLoader.style.display = 'block';
        submitBtn.disabled = true;

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        const formData = new FormData(e.target);
        const eventData = {
            title: formData.get('title'),
            date: formData.get('date'),
            time: formData.get('time'),
            venue: formData.get('venue'),
            description: formData.get('description'),
            price: parseFloat(formData.get('price')) || null,
            capacity: parseInt(formData.get('capacity')) || null,
            status: formData.get('status'),
            showBooking: formData.get('showBooking') === 'on'
        };

        // Validate and fix date format
        if (eventData.date) {
            const dateCheck = new Date(eventData.date);
            const currentYear = new Date().getFullYear();

            if (isNaN(dateCheck.getTime())) {
                alert('Invalid date format. Please use a valid date.');
                btnText.classList.remove('loading');
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
                return;
            }

            // Check for reasonable date range (not in distant past or future)
            if (dateCheck.getFullYear() < 1900 || dateCheck.getFullYear() > currentYear + 10) {
                alert(`Invalid year: ${dateCheck.getFullYear()}. Please use a date between 1900 and ${currentYear + 10}.`);
                btnText.classList.remove('loading');
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
                return;
            }

            console.log('Event date:', eventData.date, 'Parsed as:', dateCheck, 'Year:', dateCheck.getFullYear());
        }

        if (this.currentEditingEvent) {
            // Update existing event
            const index = this.events.findIndex(e => e.id === this.currentEditingEvent);
            this.events[index] = { ...this.events[index], ...eventData };
        } else {
            // Add new event
            eventData.id = Date.now(); // Simple ID generation
            this.events.push(eventData);
        }

        // Only proceed if save was successful
        if (this.saveToStorage()) {
            this.renderEvents();
            this.closeModal();
            // Show success message
            this.showSuccessMessage(this.currentEditingEvent ? 'Event updated successfully!' : 'Event created successfully!');
        } else {
            // Reset button state on error
            btnText.classList.remove('loading');
            btnLoader.style.display = 'none';
            submitBtn.disabled = false;
            return;
        }

        // Reset button state
        btnText.classList.remove('loading');
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
    }

    editEvent(eventId) {
        this.showEventModal(eventId);
    }

    deleteEvent(eventId) {
        if (confirm('Are you sure you want to delete this event?')) {
            this.events = this.events.filter(e => e.id !== eventId);
            this.saveToStorage();
            this.renderEvents();
            this.showSuccessMessage('Event deleted successfully!');
        }
    }

    saveToStorage() {
        try {
            const eventsData = JSON.stringify(this.events);
            localStorage.setItem('plazaEvents', eventsData);

            // Also trigger custom event for real-time updates
            window.dispatchEvent(new CustomEvent('plazaEventsUpdated', {
                detail: { events: this.events }
            }));

            // For debugging on Netlify
            console.log('Events saved to localStorage:', this.events.length, 'events');
            return true;
        } catch (error) {
            console.error('Failed to save events to localStorage:', error);

            if (error.name === 'QuotaExceededError') {
                alert('Storage quota exceeded. Please delete some old events.');
            } else {
                alert('Failed to save events. Please try again.');
            }
            return false;
        }
    }

    showSuccessMessage(message) {
        // Create and show success toast
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 2rem;
            right: 2rem;
            background: #48bb78;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            z-index: 10000;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);

        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }, 3000);
    }

    // Settings Functions
    exportEvents() {
        const dataStr = JSON.stringify(this.events, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `plaza-events-${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);

        this.showSuccessMessage('Events exported successfully!');
    }

    clearCache() {
        if (confirm('Are you sure you want to clear all cached data? This will remove all events.')) {
            localStorage.removeItem('plazaEvents');
            this.events = [];
            this.renderEvents();
            this.showSuccessMessage('Cache cleared successfully!');
        }
    }

    // Public API for events page integration
    getUpcomingEvents() {
        return this.events
            .filter(event => event.status === 'upcoming')
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    getAllEvents() {
        return this.events;
    }
}

// Initialize CMS
let cms;
document.addEventListener('DOMContentLoaded', function() {
    cms = new PlazaCMS();
    // Make CMS available globally for easy debugging and integration
    window.PlazaCMS = PlazaCMS;
    window.cms = cms;
    console.log('CMS initialized and made available globally');
});