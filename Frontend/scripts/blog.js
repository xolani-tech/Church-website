document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initializeHeader();
    initializeMobileMenu();
    initializeAnimations();
    initializeHeroSlider();
    
    // Fetch data with error handling
    fetchEvents().catch(console.error);
    fetchSermons().catch(console.error);
});

// ===== IMPROVED HEADER & NAVIGATION =====
function initializeHeader() {
    const header = document.getElementById('header');
    if (!header) return;
    
    // Improved scroll effect with throttling
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }, 10);
        }
    });
}

function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navbar = document.getElementById('navbar');
    const body = document.body;
    
    if (!mobileMenuToggle || !navbar) return;
    
    // Improved mobile menu toggle with better event handling
    mobileMenuToggle.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        body.classList.toggle('mobile-nav-open');
        
        // Update ARIA attributes for accessibility
        const isExpanded = body.classList.contains('mobile-nav-open');
        mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
    });
    
    // Enhanced mobile menu functionality
    const navLinks = document.querySelectorAll('#navbar .nav-links a');
    const megaMenuItems = document.querySelectorAll('.mega-menu-item > a');
    
    // Close mobile menu when clicking on regular links
    navLinks.forEach(link => {
        if (!link.parentElement.classList.contains('mega-menu-item')) {
            link.addEventListener('click', () => {
                body.classList.remove('mobile-nav-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            });
        }
    });
    
    // Enhanced mega menu functionality for mobile
    megaMenuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation();
                
                const parentLi = this.parentElement;
                const isOpening = !parentLi.classList.contains('active');
                
                // Close all other mega menus
                megaMenuItems.forEach(otherItem => {
                    otherItem.parentElement.classList.remove('active');
                });
                
                // Toggle current mega menu
                if (isOpening) {
                    parentLi.classList.add('active');
                }
            }
        });
    });
    
    // Improved click outside handler
    document.addEventListener('click', function(e) {
        const isMobile = window.innerWidth <= 768;
        
        if (isMobile && body.classList.contains('mobile-nav-open')) {
            const isMenuClick = navbar.contains(e.target) || mobileMenuToggle.contains(e.target);
            if (!isMenuClick) {
                body.classList.remove('mobile-nav-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        }
        
        // Close mega menus when clicking elsewhere on mobile
        if (isMobile) {
            const isMegaMenuClick = e.target.closest('.mega-menu-item');
            if (!isMegaMenuClick) {
                document.querySelectorAll('.mega-menu-item').forEach(item => {
                    item.classList.remove('active');
                });
            }
        }
    });
    
    // Enhanced resize handler
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (window.innerWidth > 768) {
                body.classList.remove('mobile-nav-open');
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
                document.querySelectorAll('.mega-menu-item').forEach(item => {
                    item.classList.remove('active');
                });
            }
        }, 250);
    });
    
    // Enhanced scroll prevention
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                const isMenuOpen = body.classList.contains('mobile-nav-open');
                document.body.style.overflow = isMenuOpen ? 'hidden' : '';
                document.documentElement.style.overflow = isMenuOpen ? 'hidden' : '';
            }
        });
    });
    observer.observe(body, { attributes: true });
}

// ===== IMPROVED ANIMATIONS =====
function initializeAnimations() {
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    if (!fadeInSections.length) return;
    
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // Keep observing for re-animation if needed
                // observer.unobserve(entry.target);
            } else {
                // Optional: remove class when out of view
                // entry.target.classList.remove('is-visible');
            }
        });
    }, {
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });
    
    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });
}



// ===== IMPROVED DATA FETCHING =====
async function fetchEvents() {
    const container = document.getElementById('events-container');
    if (!container) return;
    
    try {
        // Show loading state
        container.innerHTML = `
            <div class="loading-events">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading upcoming events...</p>
            </div>
        `;
        
        const response = await fetch('http://localhost:5000/api/events');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const events = await response.json();
        displayEvents(events);
        
    } catch (error) {
        console.error('Error fetching events:', error);
        showEventsError('Unable to load events at this time. Please check your connection and try again.');
    }
}

async function fetchSermons() {
    const container = document.getElementById('sermons-container');
    if (!container) return;
    
    try {
        // Show loading state
        container.innerHTML = `
            <div class="loading-sermons">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading latest sermons...</p>
            </div>
        `;
        
        const response = await fetch('http://localhost:5000/api/sermons?limit=3');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const sermons = await response.json();
        displaySermons(sermons);
        
    } catch (error) {
        console.error('Error fetching sermons:', error);
        showSermonsError('Unable to load sermons at this time. Please check your connection and try again.');
    }
}

function displayEvents(events) {
    const container = document.getElementById('events-container');
    const noEvents = document.getElementById('no-events');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!events || events.length === 0) {
        if (noEvents) {
            noEvents.style.display = 'block';
        } else {
            container.innerHTML = '<p class="no-events">No upcoming events scheduled.</p>';
        }
        return;
    }
    
    // Sort events by date
    const sortedEvents = events
        .filter(event => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .slice(0, 5); // Limit to 5 events
    
    if (sortedEvents.length === 0) {
        container.innerHTML = '<p class="no-events">No upcoming events scheduled.</p>';
        return;
    }
    
    sortedEvents.forEach(event => {
        const eventDate = new Date(event.date);
        const eventItem = createEventItem(event, eventDate);
        container.appendChild(eventItem);
    });
}

function displaySermons(sermons) {
    const container = document.getElementById('sermons-container');
    const noSermons = document.getElementById('no-sermons');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (!sermons || sermons.length === 0) {
        if (noSermons) {
            noSermons.style.display = 'block';
        } else {
            container.innerHTML = '<p class="no-sermons">No sermons available at the moment.</p>';
        }
        return;
    }
    
    sermons.slice(0, 3).forEach(sermon => { // Limit to 3 sermons
        const sermonCard = createSermonCard(sermon);
        container.appendChild(sermonCard);
    });
}

function createEventItem(event, eventDate) {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event-item';
    
    const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = eventDate.getDate();
    const time = eventDate.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
    });
    
    eventDiv.innerHTML = `
        <div class="event-date">
            <span>${month}</span>
            <strong>${day}</strong>
        </div>
        <div class="event-details">
            <h4>${event.title || 'Church Event'}</h4>
            <p class="event-time">
                <i class="far fa-clock"></i> ${time}
                ${event.location ? `<span class="event-location"><i class="fas fa-map-marker-alt"></i> ${event.location}</span>` : ''}
            </p>
            ${event.description ? `<p class="event-description">${event.description}</p>` : ''}
        </div>
    `;
    
    return eventDiv;
}

function createSermonCard(sermon) {
    const sermonDiv = document.createElement('div');
    sermonDiv.className = 'sermon-card';
    
    const sermonDate = new Date(sermon.date);
    const formattedDate = sermonDate.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
    
    sermonDiv.innerHTML = `
        <div class="sermon-thumbnail">
            <img src="${sermon.thumbnail || '/Images/sermon-placeholder.jpg'}" 
                 alt="${sermon.title}" 
                 loading="lazy"
                 onerror="this.src='https://images.unsplash.com/photo-1555696958-c5664b8d15e4?q=80&w=800&auto=format&fit=crop'">
            <div class="play-icon">
                <i class="fas fa-play"></i>
            </div>
        </div>
        <div class="sermon-info">
            <h4>${sermon.title || 'Weekly Sermon'}</h4>
            <p class="sermon-speaker">${sermon.speaker ? `Speaker: ${sermon.speaker}` : 'Church Service'}</p>
            ${sermon.scripture ? `<p class="scripture">${sermon.scripture}</p>` : ''}
            <p class="sermon-date">${formattedDate}</p>
            <a href="${sermon.videoUrl || '#'}" ${sermon.videoUrl ? 'target="_blank"' : ''} class="btn-watch">
                ${sermon.videoUrl ? 'Watch Now' : 'Coming Soon'}
            </a>
        </div>
    `;
    
    return sermonDiv;
}

function showEventsError(message) {
    const container = document.getElementById('events-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
            <button onclick="fetchEvents()" class="btn-retry">Try Again</button>
        </div>
    `;
}

function showSermonsError(message) {
    const container = document.getElementById('sermons-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
            <button onclick="fetchSermons()" class="btn-retry">Try Again</button>
        </div>
    `;
}

// ===== ENHANCED UTILITY FUNCTIONS =====
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Add retry button styles dynamically
const retryStyles = `
    .btn-retry {
        background: var(--brand-gold);
        color: var(--brand-dark);
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
        margin-top: 10px;
    }
    
    .btn-retry:hover {
        opacity: 0.9;
    }
    
    .event-time, .event-location {
        display: inline-block;
        margin-right: 15px;
    }
    
    @media (max-width: 768px) {
        .event-time, .event-location {
            display: block;
            margin-right: 0;
            margin-bottom: 5px;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = retryStyles;
document.head.appendChild(styleSheet);