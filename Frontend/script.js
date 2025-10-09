document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navbar = document.getElementById('navbar');

    // 1. Header scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile menu toggle
    mobileMenuToggle.addEventListener('click', () => {
        document.body.classList.toggle('mobile-nav-open');
    });

    // 3. Close mobile menu when a link is clicked
    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (document.body.classList.contains('mobile-nav-open')) {
                document.body.classList.remove('mobile-nav-open');
            }
        });
    });

    // 4. Fade-in animation for sections on scroll
    const fadeInSections = document.querySelectorAll('.fade-in-section');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px'
    });
    fadeInSections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 5. Dynamic Hero Slider
    const heroSection = document.getElementById('hero');
    const heroContent = document.querySelector('.hero-content');
    const heroScripture = document.querySelector('.hero-scripture');
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');

    const slides = [
        {
            image: '../Images/congragation2.jpg',
            scripture: 'Welcome to',
            title: 'New Jerusalem Church Of All Nations',
            subtitle: 'The spirit of GOD lives'

        },
        {
            image: '../Images/teacing.jpg',
            scripture: 'Hebrews 4:12',
            title: 'For The Word Of God Is Living And Active,',
            subtitle: '"sharper than any two-edged sword, piercing to the division of soul and of spirit..."'
        },
        {
            image: '../Images/R.jpeg',
            scripture: 'John 3:16',
            title: 'For God So Loved The World,',
            subtitle: '"that he gave his only Son, that whoever believes in him should not perish but have eternal life."'
        },
        {
            image: '../Images/man4.jpg',
            scripture: 'Romans 8:28',
            title: 'And We Know That For Those Who Love God',
            subtitle: '"all things work together for good, for those who are called according to his purpose."'
        }
    ];

    let currentSlideIndex = 0;

    function changeSlide() {
        currentSlideIndex = (currentSlideIndex + 1) % slides.length;
        const nextSlide = slides[currentSlideIndex];

        // Fade out text
        heroContent.classList.add('fade-out');

        setTimeout(() => {
            // Change background image
            heroSection.style.backgroundImage = `url('${nextSlide.image}')`;
            
            // Change text content
            heroScripture.textContent = nextSlide.scripture;
            heroTitle.textContent = nextSlide.title;
            heroSubtitle.textContent = nextSlide.subtitle;

            // Fade in text
            heroContent.classList.remove('fade-out');
        }, 500); // This timeout should match the CSS transition duration
    }

    // Set initial slide
    heroSection.style.backgroundImage = `url('${slides[0].image}')`;

    // Start the slider
    setInterval(changeSlide, 5000); // Change slide every 7 seconds
});


// Fetch events from your backend API
async function fetchEvents() {
    try {
        const response = await fetch('http://localhost:5000/api/events');
        
        if (!response.ok) {
            throw new Error('Failed to fetch events');
        }
        
        const events = await response.json();
        displayEvents(events);
        
    } catch (error) {
        console.error('Error fetching events:', error);
        showError('Unable to load events. Please try again later.');
    }
}

// Display events in the DOM
function displayEvents(events) {
    const container = document.getElementById('events-container');
    const noEvents = document.getElementById('no-events');
    
    // Clear loading state
    container.innerHTML = '';
    
    if (!events || events.length === 0) {
        noEvents.style.display = 'block';
        return;
    }
    
    // Sort events by date (soonest first)
    events.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Create event items
    events.forEach(event => {
        const eventDate = new Date(event.date);
        const eventItem = createEventItem(event, eventDate);
        container.appendChild(eventItem);
    });
}

// Create individual event item HTML
function createEventItem(event, eventDate) {
    const eventDiv = document.createElement('div');
    eventDiv.className = 'event-item';
    
    const month = eventDate.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    const day = eventDate.getDate();
    
    eventDiv.innerHTML = `
        <div class="event-date">
            <span>${month}</span>
            <strong>${day}</strong>
        </div>
        <div class="event-details">
            <h4>${event.title || 'Untitled Event'}</h4>
            <p>
                <i class="far fa-clock"></i> ${eventDate.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                })} 
                ${event.location ? `| <i class="fas fa-map-marker-alt"></i> ${event.location}` : ''}
            </p>
            ${event.description ? `<p>${event.description}</p>` : ''}
        </div>
    `;
    
    return eventDiv;
}

// Show error message
function showError(message) {
    const container = document.getElementById('events-container');
    container.innerHTML = `
        <div class="error-message">
            <i class="fas fa-exclamation-triangle"></i>
            <p>${message}</p>
        </div>
    `;
}

// Load events when page is ready
document.addEventListener('DOMContentLoaded', function() {
    fetchEvents();
});