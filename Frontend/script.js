// ===== GLOBAL GUARD =====
if (!window.hasInitialized) {
    window.hasInitialized = true;

    document.addEventListener('DOMContentLoaded', function() {
        // Initialize all functionality
        initializeHeader();
        initializeMobileMenu();
        initializeAnimations();
        initializeHeroSlider();
        initializeNewsletter();

        // Fetch data with error handling
        fetchEvents().catch(console.error);
        fetchSermons().catch(console.error);
    });

    // ===== HEADER =====
    function initializeHeader() {
        const header = document.getElementById('header');
        if (!header) return;

        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    scrollTimeout = null;
                    header.classList.toggle('scrolled', window.scrollY > 50);
                }, 10);
            }
        });
    }

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

    // ===== HERO SLIDER =====
    function initializeHeroSlider() {
        const hero = document.getElementById('hero');
        const content = document.querySelector('.hero-content');
        if (!hero || !content) return;

        const scriptureEl = document.querySelector('.hero-scripture');
        const titleEl = document.querySelector('.hero-title');
        const subtitleEl = document.querySelector('.hero-subtitle');

        const slides = [
            { image: '../Images/congragation2.jpg', scripture: 'Welcome to', title: 'New Jerusalem Church Of All Nations', subtitle: 'The spirit of GOD lives' },
            { image: '../Images/teacing.jpg', scripture: 'Hebrews 4:12', title: 'For The Word Of God Is Living And Active,', subtitle: '"sharper than any two-edged sword, piercing to the division of soul and of spirit..."' },
            { image: '../Images/R.jpeg', scripture: 'John 3:16', title: 'For God So Loved The World,', subtitle: '"that he gave his only Son, that whoever believes in him should not perish but have eternal life."' },
            { image: '../Images/man4.jpg', scripture: 'Romans 8:28', title: 'And We Know That For Those Who Love God', subtitle: '"all things work together for good, for those who are called according to his purpose."' }
        ];

        let currentIndex = 0, interval, paused = false;

        slides.forEach(slide => new Image().src = slide.image);

        function changeSlide() {
            if (paused) return;
            currentIndex = (currentIndex + 1) % slides.length;
            const s = slides[currentIndex];
            content.style.opacity = '0';
            setTimeout(() => {
                hero.style.backgroundImage = `url('${s.image}')`;
                if (scriptureEl) scriptureEl.textContent = s.scripture;
                if (titleEl) titleEl.textContent = s.title;
                if (subtitleEl) subtitleEl.textContent = s.subtitle;
                content.style.opacity = '1';
            }, 500);
        }

        function start() { if (slides.length > 1) interval = setInterval(changeSlide, 5000); }
        function pause() { paused = true; clearInterval(interval); }
        function resume() { paused = false; start(); }

        hero.style.backgroundImage = `url('${slides[0].image}')`;
        start();

        ['mouseenter', 'touchstart'].forEach(e => hero.addEventListener(e, pause));
        ['mouseleave', 'touchend'].forEach(e => hero.addEventListener(e, resume));
        document.addEventListener('visibilitychange', () => document.hidden ? pause() : resume());
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

    async function fetchSermons() {
        const container = document.getElementById('sermons-container');
        if (!container) return;

        container.innerHTML = `<div class="loading-sermons"><i class="fas fa-spinner fa-spin"></i><p>Loading latest sermons...</p></div>`;

        try {
            const res = await fetch('http://localhost:5000/api/sermons?limit=3');
            if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
            const sermons = await res.json();
            displaySermons(sermons);
        } catch (err) {
            console.error('Error fetching sermons:', err);
            showSermonsError('Unable to load sermons at this time. Please try again.');
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

    function displaySermons(sermons) {
        const container = document.getElementById('sermons-container');
        container.innerHTML = '';

        if (!sermons || sermons.length === 0) {
            container.innerHTML = '<p class="no-sermons">No sermons available at the moment.</p>';
            return;
        }

        sermons.slice(0,3).forEach(s => container.appendChild(createSermonCard(s)));
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

    function createSermonCard(s) {
        const div = document.createElement('div');
        div.className = 'sermon-card';
        const date = new Date(s.date).toLocaleDateString('en-US',{year:'numeric',month:'long',day:'numeric'});
        div.innerHTML = `
            <div class="sermon-thumbnail">
                <img src="${s.thumbnail || '/Images/sermon-placeholder.jpg'}" alt="${s.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1555696958-c5664b8d15e4?q=80&w=800&auto=format&fit=crop'">
                <div class="play-icon"><i class="fas fa-play"></i></div>
            </div>
            <div class="sermon-info">
                <h4>${s.title || 'Weekly Sermon'}</h4>
                <p class="sermon-speaker">${s.speaker? `Speaker: ${s.speaker}`:'Church Service'}</p>
                ${s.scripture? `<p class="scripture">${s.scripture}</p>`:''}
                <p class="sermon-date">${date}</p>
                <a href="${s.videoUrl || '#'}" ${s.videoUrl? 'target="_blank"':''} class="btn-watch">${s.videoUrl?'Watch Now':'Coming Soon'}</a>
            </div>
        `;
        return div;
    }

    function showEventsError(msg) {
        const c = document.getElementById('events-container');
        if (!c) return;
        c.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-triangle"></i><p>${msg}</p><button onclick="fetchEvents()" class="btn-retry">Try Again</button></div>`;
    }

    function showSermonsError(msg) {
        const c = document.getElementById('sermons-container');
        if (!c) return;
        c.innerHTML = `<div class="error-message"><i class="fas fa-exclamation-triangle"></i><p>${msg}</p><button onclick="fetchSermons()" class="btn-retry">Try Again</button></div>`;
    }

    // ===== NEWSLETTER =====
    function initializeNewsletter() {
        const form = document.getElementById('newsletter-form');
        const msg = document.getElementById('newsletter-message');
        if (!form) return;

        form.addEventListener('submit', async e => {
            e.preventDefault();
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const data = new FormData(form);

            btnText.style.display='none';
            btnLoading.style.display='inline-block';
            submitBtn.disabled=true;
            msg.style.display='none'; msg.className='newsletter-message';

            try {
                await submitNewsletter(data);
                msg.textContent='Thank you for subscribing! You will receive a confirmation email shortly.';
                msg.className='newsletter-message success'; msg.style.display='block';
                form.reset(); msg.scrollIntoView({behavior:'smooth',block:'nearest'});
            } catch(err) {
                msg.textContent='Sorry, there was an error. Please try again later.';
                msg.className='newsletter-message error'; msg.style.display='block';
                console.error('Newsletter error:', err);
            } finally {
                btnText.style.display='inline-block';
                btnLoading.style.display='none';
                submitBtn.disabled=false;
            }
        });
    }

    async function submitNewsletter(formData) {
        return new Promise((resolve,reject)=>{
            setTimeout(()=>Math.random()>0.2?resolve({success:true}):reject(new Error('Network error')),1500);
        });
    }

    // ===== UTILITY STYLES =====
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        .btn-retry { background: var(--brand-gold); color: var(--brand-dark); border:none; padding:8px 16px; border-radius:4px; cursor:pointer; font-weight:600; margin-top:10px; }
        .btn-retry:hover { opacity:0.9; }
        .event-time, .event-location { display:inline-block; margin-right:15px; }
        @media (max-width:768px) { .event-time, .event-location { display:block; margin-right:0; margin-bottom:5px; } }
    `;
    document.head.appendChild(styleSheet);
}
