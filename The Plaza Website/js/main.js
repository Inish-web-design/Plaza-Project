// The Plaza Website - Clean Modern JavaScript

class PlazaWebsite {
    constructor() {
        this.init();
        this.scrollPosition = 0;
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
        console.log('✨ The Plaza website loaded successfully!');
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

    // Mobile menu functionality
    setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const mobileNav = document.querySelector('.mobile-nav');
        const mobileOverlay = document.querySelector('.mobile-overlay');
        const mobileCloseBtn = document.querySelector('.mobile-close-btn');
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-menu a');

        if (!mobileMenuBtn || !mobileNav || !mobileOverlay) return;

        // Open mobile menu
        const openMobileMenu = () => {
            mobileNav.classList.add('open');
            mobileOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        };

        // Close mobile menu
        const closeMobileMenu = () => {
            mobileNav.classList.remove('open');
            mobileOverlay.classList.remove('open');
            document.body.style.overflow = '';
        };

        // Event listeners
        mobileMenuBtn.addEventListener('click', openMobileMenu);
        mobileCloseBtn?.addEventListener('click', closeMobileMenu);
        mobileOverlay.addEventListener('click', closeMobileMenu);

        // Close menu when clicking on a link
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });

        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileNav.classList.contains('open')) {
                closeMobileMenu();
            }
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && mobileNav.classList.contains('open')) {
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

    // Interactive image hover effects
    setupImageInteractions() {
        const imageCards = document.querySelectorAll('.image-card');

        imageCards.forEach(card => {
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
        });

        // Enhanced hover effects for hero image
        const heroImage = document.querySelector('.hero-image img');
        if (heroImage) {
            const heroContainer = document.querySelector('.hero-image');

            heroContainer.addEventListener('mouseenter', function() {
                heroImage.style.transform = 'scale(1.05)';
            });

            heroContainer.addEventListener('mouseleave', function() {
                heroImage.style.transform = 'scale(1)';
            });
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
`;
document.head.appendChild(styleSheet);