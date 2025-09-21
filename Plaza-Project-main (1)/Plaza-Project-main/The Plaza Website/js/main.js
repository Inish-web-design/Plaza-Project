// The Plaza Website - Clean Modern JavaScript

class PlazaWebsite {
    constructor() {
        this.init();
        this.scrollPosition = 0;
        this.isHomepage = this.checkIfHomepage();
    }

    init() {
        this.setupPageLoadAnimations();
        this.setupIntersectionObserver();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupImageInteractions();
        this.setupSmoothScrolling();
        this.setupImageLightbox();
        this.setupGlassmorphismHeader();

        if (this.isHomepage) {
            this.setupHomepageFeatures();
        }
    }

    checkIfHomepage() {
        return window.location.pathname === '/' ||
               window.location.pathname === '/index.html' ||
               window.location.pathname.endsWith('/index.html') ||
               document.body.querySelector('.homepage-hero') !== null;
    }

    // Page load animations
    setupPageLoadAnimations() {
        // Add page load class to body
        document.body.classList.add('page-load');

        // Animate hero on page load
        setTimeout(() => {
            const heroImage = document.querySelector('.hero-image');
            const heroContent = document.querySelector('.hero-content');

            if (heroImage) heroImage.classList.add('animate');
            if (heroContent) heroContent.classList.add('animate');
        }, 300);
    }

    // Enhanced Intersection Observer for scroll animations
    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');

                    // Stagger animations for child elements
                    const imageCards = entry.target.querySelectorAll('.image-card');
                    const hallItems = entry.target.querySelectorAll('.hall-details li');
                    const events = entry.target.querySelectorAll('.event');

                    // Animate image cards with stagger
                    imageCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('animate');
                        }, index * 100);
                    });

                    // Animate hall details items
                    hallItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateX(0)';
                        }, index * 80);
                    });

                    // Animate events
                    events.forEach((event, index) => {
                        setTimeout(() => {
                            event.classList.add('animate');
                        }, index * 120);
                    });
                }
            });
        }, observerOptions);

        // Observe all elements that should animate on scroll
        document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in, .content-card, section').forEach(element => {
            observer.observe(element);
        });
    }

    // Enhanced navigation with red accent
    setupNavigation() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('nav a, .mobile-nav-menu a');

        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            }
        });
    }

    // Simple Mobile menu functionality
    setupMobileMenu() {
        console.log('🔧 Setting up mobile menu...');
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileOverlay = document.querySelector('.mobile-overlay');
        const mobileCloseBtn = document.querySelector('.mobile-close-btn');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');

        console.log('📱 Mobile elements found:', {
            mobileMenuBtn: !!mobileMenuBtn,
            mobileNav: !!mobileNav,
            mobileOverlay: !!mobileOverlay,
            mobileCloseBtn: !!mobileCloseBtn,
            navLinksCount: mobileNavLinks.length
        });

        if (!mobileMenuBtn || !mobileNav || !mobileOverlay) {
            console.error('❌ Missing mobile menu elements!');
            return;
        }

        let isMenuOpen = false;

        const openMobileMenu = () => {
            console.log('📱 Opening mobile menu...');
            isMenuOpen = true;
            mobileNav.classList.add('open');
            mobileOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
            console.log('📱 Menu classes added:', {
                navHasOpen: mobileNav.classList.contains('open'),
                overlayHasOpen: mobileOverlay.classList.contains('open')
            });
        };

        const closeMobileMenu = () => {
            console.log('📱 Closing mobile menu...');
            isMenuOpen = false;
            mobileNav.classList.remove('open');
            mobileOverlay.classList.remove('open');
            document.body.style.overflow = '';
        };

        console.log('🎯 Adding event listeners...');
        mobileMenuBtn.addEventListener('click', () => {
            console.log('🔥 Mobile menu button CLICKED!');
            openMobileMenu();
        });
        mobileMenuBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            openMobileMenu();
        });

        if (mobileCloseBtn) {
            mobileCloseBtn.addEventListener('click', closeMobileMenu);
        }

        mobileOverlay.addEventListener('click', closeMobileMenu);

        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMobileMenu();
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth > 1024 && isMenuOpen) {
                closeMobileMenu();
            }
        });
    }


    // Glassmorphism header effect with scroll
    setupGlassmorphismHeader() {
        const header = document.querySelector('header');
        let lastScrollY = window.scrollY;
        let ticking = false;

        const updateHeader = () => {
            const scrollY = window.scrollY;

            // Add scrolled class for glassmorphism effect
            if (scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            // Hide header when scrolling down far enough
            if (scrollY > lastScrollY && scrollY > 400) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }

            lastScrollY = scrollY;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateHeader);
                ticking = true;
            }
        });
    }

    // Enhanced Interactive image effects with mobile touch support
    setupImageInteractions() {
        const imageCards = document.querySelectorAll('.image-card');
        const isMobile = window.innerWidth <= 768;

        imageCards.forEach(card => {
            // Desktop hover effects
            if (!isMobile) {
                card.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                    this.style.boxShadow = '0 25px 50px rgba(0,0,0,0.2)';

                    const img = this.querySelector('img');
                    if (img) {
                        img.style.transform = 'scale(1.1)';
                    }
                });

                card.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';

                    const img = this.querySelector('img');
                    if (img) {
                        img.style.transform = 'scale(1)';
                    }
                });
            }

            // Mobile touch effects
            card.addEventListener('touchstart', function(e) {
                this.style.transform = 'translateY(-5px) scale(1.01)';
                this.style.transition = 'all 0.2s ease';

                const img = this.querySelector('img');
                if (img) {
                    img.style.transform = 'scale(1.05)';
                    img.style.transition = 'transform 0.2s ease';
                }
            }, { passive: true });

            card.addEventListener('touchend', function(e) {
                setTimeout(() => {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.transition = 'all 0.3s ease';

                    const img = this.querySelector('img');
                    if (img) {
                        img.style.transform = 'scale(1)';
                        img.style.transition = 'transform 0.3s ease';
                    }
                }, 100);
            }, { passive: true });

            // Add ripple effect for mobile
            card.addEventListener('touchstart', function(e) {
                const ripple = document.createElement('div');
                ripple.className = 'touch-ripple';

                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.touches[0].clientX - rect.left - size / 2;
                const y = e.touches[0].clientY - rect.top - size / 2;

                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(0,0,0,0.1);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    pointer-events: none;
                    z-index: 1;
                `;

                this.style.position = 'relative';
                this.appendChild(ripple);

                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.remove();
                    }
                }, 600);
            }, { passive: true });
        });

        // Enhanced hover effects for hero image
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            const heroContainer = document.querySelector('.hero-image');

            if (!isMobile) {
                heroContainer.addEventListener('mouseenter', function() {
                    heroImage.style.transform = 'scale(1.05)';
                });

                heroContainer.addEventListener('mouseleave', function() {
                    heroImage.style.transform = 'scale(1)';
                });
            }

            // Mobile touch for hero image
            heroContainer.addEventListener('touchstart', function() {
                heroImage.style.transform = 'scale(1.03)';
                heroImage.style.transition = 'transform 0.2s ease';
            }, { passive: true });

            heroContainer.addEventListener('touchend', function() {
                setTimeout(() => {
                    heroImage.style.transform = 'scale(1)';
                    heroImage.style.transition = 'transform 0.3s ease';
                }, 100);
            }, { passive: true });
        }
    }

    // Enhanced smooth scrolling
    setupSmoothScrolling() {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const headerHeight = document.querySelector('header').offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Image lightbox functionality
    setupImageLightbox() {
        // Select ALL images on the site (excluding logo and admin images)
        const images = document.querySelectorAll('img:not(.logo):not(.admin-logo):not(.cms-logo)');

        images.forEach(img => {
            // Add cursor pointer to indicate clickability
            img.style.cursor = 'pointer';

            // Add click event for lightbox
            img.addEventListener('click', (e) => {
                this.createLightbox(e.target.src, e.target.alt);
            });
        });

        console.log(`Made ${images.length} images clickable for lightbox`);
    }

    createLightbox(src, alt) {
        // Remove any existing lightbox
        const existingLightbox = document.querySelector('.plaza-lightbox');
        if (existingLightbox) {
            existingLightbox.remove();
        }

        const lightbox = document.createElement('div');
        lightbox.className = 'plaza-lightbox';
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: rgba(0,0,0,0.95);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.4s ease;
            padding: 20px;
            box-sizing: border-box;
        `;

        const imageContainer = document.createElement('div');
        imageContainer.style.cssText = `
            position: relative;
            width: 90vw;
            height: 90vh;
            display: flex;
            justify-content: center;
            align-items: center;
        `;

        const img = document.createElement('img');
        img.src = src;
        img.alt = alt;
        img.style.cssText = `
            max-width: 100%;
            max-height: 100%;
            width: auto;
            height: auto;
            border-radius: 24px;
            box-shadow: 0 25px 80px rgba(0,0,0,0.6);
            object-fit: contain;
            transform: scale(0.9);
            transition: transform 0.4s ease;
        `;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: -10px;
            right: -10px;
            background: rgba(255,255,255,0.9);
            border: none;
            color: #333;
            font-size: 2.5rem;
            cursor: pointer;
            z-index: 10001;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
            font-weight: 300;
            line-height: 1;
        `;

        closeBtn.addEventListener('mouseenter', () => {
            closeBtn.style.background = 'rgba(255,255,255,1)';
            closeBtn.style.transform = 'scale(1.1)';
        });

        closeBtn.addEventListener('mouseleave', () => {
            closeBtn.style.background = 'rgba(255,255,255,0.9)';
            closeBtn.style.transform = 'scale(1)';
        });

        imageContainer.appendChild(img);
        imageContainer.appendChild(closeBtn);
        lightbox.appendChild(imageContainer);
        document.body.appendChild(lightbox);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';

        // Animate in
        setTimeout(() => {
            lightbox.style.opacity = '1';
            img.style.transform = 'scale(1)';
        }, 50);

        // Close function
        const closeLightbox = () => {
            lightbox.style.opacity = '0';
            img.style.transform = 'scale(0.9)';
            document.body.style.overflow = '';
            setTimeout(() => {
                if (lightbox.parentNode) {
                    lightbox.remove();
                }
            }, 400);
        };

        // Event listeners
        closeBtn.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });

        // Keyboard support
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
    }

    // Homepage specific features
    setupHomepageFeatures() {
        this.setupCountUpAnimations();
        this.setupTimelineAnimations();
        this.setupFacilityCardAnimations();
        this.setupHomepageEvents();
        this.setupScrollIndicator();
        this.setupParallaxEffect();
        console.log('🏠 Homepage features initialized!');
    }

    // Animated counter for hero stats
    setupCountUpAnimations() {
        const countElements = document.querySelectorAll('.stat-number[data-target]');

        const animateCount = (element) => {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000; // 2 seconds
            const start = performance.now();
            const startValue = 0;

            const updateCount = (currentTime) => {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);

                // Easing function for smooth animation
                const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
                const currentValue = Math.floor(startValue + (target - startValue) * easeOutCubic(progress));

                element.textContent = currentValue;

                if (progress < 1) {
                    requestAnimationFrame(updateCount);
                } else {
                    element.textContent = target;
                }
            };

            requestAnimationFrame(updateCount);
        };

        // Intersection observer to trigger animations when visible
        const countObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.hasAttribute('data-animated')) {
                    entry.target.setAttribute('data-animated', 'true');
                    setTimeout(() => animateCount(entry.target), 500);
                }
            });
        }, { threshold: 0.5 });

        countElements.forEach(element => countObserver.observe(element));
    }

    // Timeline animations
    setupTimelineAnimations() {
        const timelineItems = document.querySelectorAll('.timeline-item');

        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');
                    }, index * 200); // Stagger the animations
                }
            });
        }, { threshold: 0.3 });

        timelineItems.forEach(item => timelineObserver.observe(item));
    }

    // Enhanced facility card animations
    setupFacilityCardAnimations() {
        const facilityCards = document.querySelectorAll('.facility-card');

        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('animate');

                        // Add hover enhancement
                        this.enhanceFacilityCard(entry.target);
                    }, index * 150);
                }
            });
        }, { threshold: 0.2 });

        facilityCards.forEach(card => cardObserver.observe(card));
    }

    enhanceFacilityCard(card) {
        const image = card.querySelector('.facility-image img');
        const overlay = card.querySelector('.facility-overlay');

        if (image && overlay) {
            card.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.1)';
                overlay.style.background = 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.9))';
            });

            card.addEventListener('mouseleave', () => {
                image.style.transform = 'scale(1)';
                overlay.style.background = 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.8))';
            });
        }
    }

    // Load and display homepage events
    setupHomepageEvents() {
        const eventsContainer = document.getElementById('homepage-events');
        if (!eventsContainer) return;

        // Load events from localStorage (same as events page)
        try {
            const savedEvents = localStorage.getItem('plazaEvents');
            let events = [];

            if (savedEvents && savedEvents !== 'null') {
                events = JSON.parse(savedEvents);
            } else {
                // Default events if none stored
                events = [
                    {
                        id: 1,
                        title: 'Christmas Carol Concert',
                        date: '2024-12-15',
                        time: '19:00',
                        venue: 'small-hall',
                        description: 'Join us for a festive evening of traditional Christmas carols.',
                        status: 'upcoming'
                    },
                    {
                        id: 2,
                        title: 'New Year Celebration',
                        date: '2024-12-31',
                        time: '21:00',
                        venue: 'both-halls',
                        description: 'Ring in the New Year with music and dancing.',
                        status: 'upcoming'
                    }
                ];
            }

            const upcomingEvents = events
                .filter(event => event.status === 'upcoming')
                .slice(0, 3); // Show only first 3 events

            this.renderHomepageEvents(upcomingEvents, eventsContainer);
        } catch (error) {
            console.error('Error loading homepage events:', error);
            eventsContainer.innerHTML = '<p>Unable to load events at this time.</p>';
        }
    }

    renderHomepageEvents(events, container) {
        if (events.length === 0) {
            container.innerHTML = `
                <div class="no-events-message">
                    <h3>🎭 No upcoming events at the moment</h3>
                    <p>Check back soon for exciting events and celebrations!</p>
                    <a href="events.html" class="cta-button">View All Events</a>
                </div>
            `;
            return;
        }

        const eventsHTML = events.map((event, index) => {
            const venueNames = {
                'small-hall': 'Small Hall',
                'large-hall': 'Large Hall',
                'youth-club': 'Youth Club',
                'both-halls': 'Both Halls'
            };

            const formatDate = (dateStr) => {
                const date = new Date(dateStr);
                return date.toLocaleDateString('en-IE', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric'
                });
            };

            return `
                <div class="homepage-event fade-in stagger-${index + 1}">
                    <div class="event-date-badge">
                        <span class="event-date">${formatDate(event.date)}</span>
                        ${event.time ? `<span class="event-time">${event.time}</span>` : ''}
                    </div>
                    <div class="event-details">
                        <h3>${event.title}</h3>
                        <p class="event-venue">📍 ${venueNames[event.venue] || event.venue}</p>
                        <p class="event-description">${event.description}</p>
                        <a href="events.html" class="event-link">View Details</a>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="homepage-events-grid">
                ${eventsHTML}
            </div>
        `;

        // Add CSS for homepage events if not already added
        this.addHomepageEventStyles();
    }

    addHomepageEventStyles() {
        if (document.querySelector('#homepage-event-styles')) return;

        const styles = `
            <style id="homepage-event-styles">
                .homepage-events-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                    gap: 2rem;
                }

                .homepage-event {
                    background: var(--primary-white);
                    border-radius: var(--border-radius-lg);
                    padding: 2rem;
                    box-shadow: var(--shadow-md);
                    transition: var(--transition-smooth);
                    border-left: 4px solid var(--accent-red);
                    opacity: 0;
                    transform: translateY(30px);
                }

                .homepage-event.animate {
                    opacity: 1;
                    transform: translateY(0);
                }

                .homepage-event:hover {
                    transform: translateY(-5px);
                    box-shadow: var(--shadow-lg);
                }

                .event-date-badge {
                    background: var(--accent-red);
                    color: var(--primary-white);
                    padding: 0.5rem 1rem;
                    border-radius: var(--border-radius-sm);
                    display: inline-block;
                    margin-bottom: 1rem;
                    font-weight: 600;
                    font-size: 0.9rem;
                }

                .event-time {
                    margin-left: 0.5rem;
                    opacity: 0.9;
                }

                .homepage-event h3 {
                    font-size: 1.3rem;
                    margin-bottom: 0.5rem;
                    color: var(--text-dark);
                }

                .event-venue {
                    color: var(--text-medium);
                    font-size: 0.9rem;
                    margin-bottom: 1rem;
                    font-weight: 500;
                }

                .event-description {
                    color: var(--text-medium);
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }

                .event-link {
                    color: var(--accent-red);
                    text-decoration: none;
                    font-weight: 600;
                    transition: var(--transition-smooth);
                }

                .event-link:hover {
                    color: var(--accent-red-dark);
                }

                .no-events-message {
                    text-align: center;
                    padding: 3rem;
                    color: var(--text-medium);
                }

                .no-events-message h3 {
                    font-size: 1.5rem;
                    margin-bottom: 1rem;
                    color: var(--text-dark);
                }

                @media (max-width: 768px) {
                    .homepage-events-grid {
                        grid-template-columns: 1fr;
                    }
                }
            </style>
        `;

        document.head.insertAdjacentHTML('beforeend', styles);
    }

    // Scroll indicator functionality
    setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;

        scrollIndicator.addEventListener('click', () => {
            const introSection = document.querySelector('.intro-section');
            if (introSection) {
                introSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });

        // Hide scroll indicator after scrolling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            clearTimeout(scrollTimeout);

            if (window.scrollY > 100) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.7';
            }
        });
    }

    // Subtle parallax effect for hero background
    setupParallaxEffect() {
        const heroBackground = document.querySelector('.hero-background');
        if (!heroBackground) return;

        let ticking = false;

        const updateParallax = () => {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.5;

            heroBackground.style.transform = `translateY(${parallax}px)`;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParallax);
                ticking = true;
            }
        });
    }


}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PlazaWebsite();
});

// Add CSS for animations that need to be defined in JS
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    .animate-in {
        transform: translateY(0) !important;
        opacity: 1 !important;
    }

    /* Mobile Touch Ripple Animation */
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }

    /* Mobile Touch Improvements */
    @media (max-width: 768px) {
        /* Improve touch targets */
        button, .button, a, .facility-cta-button, .cta-button {
            min-height: 44px;
            min-width: 44px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            -webkit-tap-highlight-color: rgba(0,0,0,0.1);
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            user-select: none;
        }

        /* Smooth scroll for mobile */
        html {
            scroll-behavior: smooth;
            -webkit-overflow-scrolling: touch;
        }

        /* Prevent zoom on input focus */
        input, select, textarea {
            font-size: 16px !important;
            transform: translateZ(0);
            -webkit-appearance: none;
            border-radius: 0;
        }

        /* Better mobile tap states */
        .image-card, .event, .content-card, .facility-card-wide {
            -webkit-tap-highlight-color: rgba(0,0,0,0.1);
            touch-action: manipulation;
        }

        /* Mobile menu optimizations */
        .mobile-nav {
            -webkit-overflow-scrolling: touch;
            transform: translateZ(0);
        }

        /* Prevent horizontal scroll on mobile */
        body {
            overflow-x: hidden;
            position: relative;
        }

        /* Improve form usability on mobile */
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            transform: translateZ(0);
            zoom: 1;
        }

        /* Mobile-specific animations */
        .fade-in, .slide-in-left, .slide-in-right, .scale-in {
            transition-duration: 0.6s;
        }

        /* Reduce motion for mobile performance */
        @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        }
    }

    /* Tablet Touch Improvements */
    @media (min-width: 481px) and (max-width: 1024px) {
        /* Touch targets for tablets */
        button, .button, a, .facility-cta-button, .cta-button {
            min-height: 40px;
            -webkit-tap-highlight-color: rgba(0,0,0,0.1);
        }

        /* Smooth scrolling for tablets */
        html {
            -webkit-overflow-scrolling: touch;
        }
    }

    /* Loading state for better mobile performance */
    .loading {
        pointer-events: none;
        opacity: 0.6;
        position: relative;
    }

    .loading::after {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        width: 20px;
        height: 20px;
        margin: -10px 0 0 -10px;
        border: 2px solid #000;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }

    /* FINAL ABSOLUTE OVERRIDE - MOBILE MENU MUST WORK */
    @media screen and (max-width: 1200px) {
        .mobile-menu-btn {
            display: block !important;
            visibility: visible !important;
            opacity: 1 !important;
            z-index: 9999 !important;
            position: relative !important;
            background: none !important;
            border: none !important;
            cursor: pointer !important;
            color: #333 !important;
            font-size: 1.6rem !important;
            padding: 0.75rem !important;
        }

        nav ul {
            display: none !important;
        }

        .mobile-nav {
            display: block !important;
        }

        .mobile-overlay {
            display: block !important;
        }
    }

    /* EMERGENCY CSS CLASS */
    .js-mobile-required .mobile-menu-btn {
        display: block !important;
        visibility: visible !important;
        opacity: 1 !important;
        z-index: 9999 !important;
    }

    .js-mobile-required nav ul {
        display: none !important;
    }
`;
document.head.appendChild(styleSheet);