// ===== GLOBAL GUARD =====
if (!window.hasInitialized) {
    window.hasInitialized = true;

    document.addEventListener('DOMContentLoaded', function() {
        // Initialize all functionality
        initializeMobileMenu();
        initializeAnimations();

        // Fetch data with error handling
        fetchEvents().catch(console.error);
    });


    // ===== MOBILE MENU =====
    function initializeMobileMenu() {
        const toggle = document.getElementById('mobile-menu-toggle');
        const navbar = document.getElementById('navbar');
        const body = document.body;
        if (!toggle || !navbar) return;

        toggle.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            body.classList.toggle('mobile-nav-open');
            toggle.setAttribute('aria-expanded', body.classList.contains('mobile-nav-open'));
        });

        // Close on link click
        document.querySelectorAll('#navbar .nav-links a').forEach(link => {
            if (!link.parentElement.classList.contains('mega-menu-item')) {
                link.addEventListener('click', () => {
                    body.classList.remove('mobile-nav-open');
                    toggle.setAttribute('aria-expanded', 'false');
                });
            }
        });

        // Mega menu toggle
        document.querySelectorAll('.mega-menu-item > a').forEach(item => {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    const parent = this.parentElement;
                    const isOpening = !parent.classList.contains('active');

                    // Close all other
                    document.querySelectorAll('.mega-menu-item').forEach(m => m.classList.remove('active'));

                    if (isOpening) parent.classList.add('active');
                }
            });
        });

        // Click outside handler
        document.addEventListener('click', e => {
            const isMobile = window.innerWidth <= 768;
            if (isMobile && body.classList.contains('mobile-nav-open')) {
                const insideMenu = navbar.contains(e.target) || toggle.contains(e.target);
                if (!insideMenu) {
                    body.classList.remove('mobile-nav-open');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            }
            if (isMobile) {
                if (!e.target.closest('.mega-menu-item')) {
                    document.querySelectorAll('.mega-menu-item').forEach(item => item.classList.remove('active'));
                }
            }
        });

        // Handle window resize
        let resizeTimeout;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (window.innerWidth > 768) {
                    body.classList.remove('mobile-nav-open');
                    toggle.setAttribute('aria-expanded', 'false');
                    document.querySelectorAll('.mega-menu-item').forEach(item => item.classList.remove('active'));
                }
            }, 250);
        });

        // Prevent scroll when mobile menu open
        new MutationObserver(mutations => {
            mutations.forEach(m => {
                if (m.attributeName === 'class') {
                    const isOpen = body.classList.contains('mobile-nav-open');
                    document.body.style.overflow = isOpen ? 'hidden' : '';
                    document.documentElement.style.overflow = isOpen ? 'hidden' : '';
                }
            });
        }).observe(body, { attributes: true });
    }

    // ===== ANIMATIONS =====
    function initializeAnimations() {
        const fadeSections = document.querySelectorAll('.fade-in-section');
        if (!fadeSections.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('is-visible');
            });
        }, { rootMargin: '0px 0px -50px 0px', threshold: 0.1 });

        fadeSections.forEach(section => observer.observe(section));
    }
   
    // ===== FETCH EVENTS & SERMONS =====
    async function fetchEvents() {
        const container = document.getElementById('events-container');
        if (!container) return;

        container.innerHTML = `<div class="loading-events"><i class="fas fa-spinner fa-spin"></i><p>Loading upcoming events...</p></div>`;

        try {
            const res = await fetch('http://localhost:5000/api/events');
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const events = await res.json();
            displayEvents(events);
        } catch (err) {
            console.error('Error fetching events:', err);
            showEventsError('Unable to load events at this time. Please try again.');
        }
    }

    function displayEvents(events) {
        const container = document.getElementById('events-container');
        container.innerHTML = '';

        if (!events || events.length === 0) {
            container.innerHTML = '<p class="no-events">No upcoming events scheduled.</p>';
            return;
        }

        events.filter(e => new Date(e.date) >= new Date())
            .sort((a,b)=> new Date(a.date) - new Date(b.date))
            .slice(0,5)
            .forEach(e => container.appendChild(createEventItem(e, new Date(e.date))));
    }

    function createEventItem(e, date) {
        const div = document.createElement('div');
        div.className = 'event-item';
        div.innerHTML = `
            <div class="event-date"><span>${date.toLocaleDateString('en-US',{month:'short'}).toUpperCase()}</span><strong>${date.getDate()}</strong></div>
            <div class="event-details">
                <h4>${e.title || 'Church Event'}</h4>
                <p class="event-time"><i class="far fa-clock"></i> ${date.toLocaleTimeString('en-US',{hour:'numeric',minute:'2-digit',hour12:true})}
                ${e.location? `<span class="event-location"><i class="fas fa-map-marker-alt"></i> ${e.location}</span>` : ''}</p>
                ${e.description? `<p class="event-description">${e.description}</p>` : ''}
            </div>
        `;
        return div;
    }

    function showEventsError(msg) {
        const c = document.getElementById('events-container');
        if (!c) return;
        c.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-triangle"></i><p>${msg}</p><button onclick="fetchEvents()" class="btn-retry">Try Again</button></div>`;
    }
}
