// Events Page JavaScript
class PlazaEvents {
    constructor() {
        this.events = [];
        this.init();
    }

    init() {
        this.loadEvents();
        this.renderEvents();
    }

    loadEvents() {
        // Load events from localStorage (set by the CMS)
        const savedEvents = localStorage.getItem('plazaEvents');
        console.log('Loading events from localStorage:', savedEvents);

        if (savedEvents) {
            try {
                this.events = JSON.parse(savedEvents);
                console.log('Parsed events:', this.events);
            } catch (error) {
                console.error('Error parsing events from localStorage:', error);
                this.events = this.getDefaultEvents();
            }
        } else {
            console.log('No saved events found, using defaults');
            this.events = this.getDefaultEvents();
        }

        console.log('Final events array:', this.events.length, 'events loaded');
    }

    getDefaultEvents() {
        // Fallback events if none are stored
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
                status: 'upcoming'
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
                status: 'upcoming'
            }
        ];
    }

    renderEvents() {
        console.log('Rendering events...');

        const upcomingEvents = this.events
            .filter(event => event.status === 'upcoming')
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        const pastEvents = this.events
            .filter(event => event.status === 'completed')
            .sort((a, b) => new Date(b.date) - new Date(a.date));

        console.log('Upcoming events:', upcomingEvents.length);
        console.log('Past events:', pastEvents.length);
        console.log('Upcoming events details:', upcomingEvents);

        // Create events section if it doesn't exist
        this.createEventsSection(upcomingEvents, pastEvents);
    }

    createEventsSection(upcomingEvents, pastEvents) {
        const main = document.querySelector('main');

        // Create events content section
        const eventsSection = document.createElement('section');
        eventsSection.className = 'fade-in';
        eventsSection.id = 'featured-events';
        eventsSection.innerHTML = `
            <h2>Upcoming Events</h2>
            <div id="upcomingEventsList" class="events-list">
                ${upcomingEvents.length > 0 ? this.renderEventsList(upcomingEvents) : this.renderEmptyState('No upcoming events at the moment.')}
            </div>

            ${pastEvents.length > 0 ? `
                <h2 style="margin-top: 4rem;">Past Events</h2>
                <div id="pastEventsList" class="events-list">
                    ${this.renderEventsList(pastEvents)}
                </div>
            ` : ''}
        `;

        main.appendChild(eventsSection);
    }

    renderEventsList(events) {
        return events.map((event, index) => this.renderEventCard(event, index)).join('');
    }

    renderEventCard(event, index = 0) {
        const venueNames = {
            'small-hall': 'Small Hall',
            'large-hall': 'Large Hall',
            'youth-club': 'Youth Club',
            'both-halls': 'Both Halls'
        };

        const formatDate = (dateStr) => {
            const date = new Date(dateStr);

            // Check if date is valid
            if (isNaN(date.getTime())) {
                console.warn('Invalid date:', dateStr);
                return 'Invalid Date';
            }

            return date.toLocaleDateString('en-IE', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        };

        const getStatusBadge = (status) => {
            const badges = {
                'upcoming': '<span class="event-badge upcoming">Upcoming</span>',
                'ongoing': '<span class="event-badge ongoing">Happening Now</span>',
                'completed': '<span class="event-badge completed">Completed</span>',
                'cancelled': '<span class="event-badge cancelled">Cancelled</span>'
            };
            return badges[status] || '';
        };

        return `
            <div class="event fade-in stagger-${Math.min(index + 1, 3)}">
                <div class="event-content">
                    <div class="event-header">
                        <h3>${event.title}</h3>
                        ${getStatusBadge(event.status)}
                    </div>
                    <div class="event-meta">
                        <p class="event-date">
                            <strong>📅 ${formatDate(event.date)}</strong>
                            ${event.time ? ` at ${event.time}` : ''}
                        </p>
                        <p class="event-venue">
                            <strong>📍 ${venueNames[event.venue] || event.venue}</strong>
                        </p>
                        ${event.price ? `<p class="event-price"><strong>💰 €${event.price}</strong></p>` : ''}
                        ${event.capacity ? `<p class="event-capacity"><strong>👥 Up to ${event.capacity} people</strong></p>` : ''}
                    </div>
                    ${event.description ? `<p class="event-description">${event.description}</p>` : ''}

                    ${event.status === 'upcoming' ? `
                        <div class="event-actions">
                            <a href="tel:0877538317" class="button button-outline">Book Now</a>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    renderEmptyState(message) {
        return `
            <div class="empty-events-state">
                <h3>🎭 ${message}</h3>
                <p>Check back soon for exciting events and celebrations!</p>
                <a href="tel:0877538317" class="button">Contact Us About Events</a>
            </div>
        `;
    }

    // Method to refresh events (can be called after CMS updates)
    refresh() {
        this.loadEvents();

        // Remove existing events section and recreate
        const existingSection = document.getElementById('featured-events');
        if (existingSection) {
            existingSection.remove();
        }

        this.renderEvents();
    }
}

// Initialize events when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Check if we're on the events page by multiple methods
    const isEventsPage = window.location.pathname.includes('events.html') ||
                        window.location.pathname.endsWith('/events') ||
                        window.location.pathname.endsWith('/events.html') ||
                        document.title.includes('Events') ||
                        document.querySelector('#featured-events') !== null;

    console.log('Page check:', {
        pathname: window.location.pathname,
        title: document.title,
        isEventsPage: isEventsPage
    });

    if (isEventsPage) {
        console.log('Initializing PlazaEvents...');
        window.plazaEvents = new PlazaEvents();
    } else {
        console.log('Not events page, skipping initialization');
    }
});

// Listen for storage changes (when CMS updates events)
window.addEventListener('storage', (e) => {
    if (e.key === 'plazaEvents' && window.plazaEvents) {
        console.log('Storage change detected, refreshing events');
        window.plazaEvents.refresh();
    }
});

// Listen for custom events from CMS
window.addEventListener('plazaEventsUpdated', (e) => {
    if (window.plazaEvents) {
        console.log('Events updated via custom event, refreshing');
        window.plazaEvents.refresh();
    }
});

// Debugging helper for Netlify
window.addEventListener('load', () => {
    console.log('Events page loaded');
    const savedEvents = localStorage.getItem('plazaEvents');
    console.log('Stored events:', savedEvents ? JSON.parse(savedEvents).length : 0, 'events found');
});