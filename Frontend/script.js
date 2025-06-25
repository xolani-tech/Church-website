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
            image: 'New Jesalem Internatinal Ministires\Images\NJ picture man of god.jpg',
            scripture: 'Welcome to',
            title: 'New Jerusalem Church Of All Nations',
            subtitle: 'The spirit of GOD lives'

        },
        {
            image: 'https://th.bing.com/th/id/R.64cbcd1d020a0d53fcf7e57e844c45ee?rik=GF64nbnGn%2baU6g&riu=http%3a%2f%2fi.huffpost.com%2fgen%2f772790%2fimages%2fo-BIBLE-facebook.jpg&ehk=6%2bljvZHQ%2fFMrOuITZGA%2f0aihHT3oeFA4MERw2rwdp4s%3d&risl=&pid=ImgRaw&r=0',
            scripture: 'Hebrews 4:12',
            title: 'For The Word Of God Is Living And Active,',
            subtitle: 'sharper than any two-edged sword, piercing to the division of soul and of spirit...'
        },
        {
            image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2070&auto=format&fit=crop',
            scripture: 'John 3:16',
            title: 'For God So Loved The World,',
            subtitle: 'that he gave his only Son, that whoever believes in him should not perish but have eternal life.'
        },
        {
            image: 'https://images.unsplash.com/photo-1516846391414-274287398c99?q=80&w=2070&auto=format&fit=crop',
            scripture: 'Romans 8:28',
            title: 'And We Know That For Those Who Love God',
            subtitle: 'all things work together for good, for those who are called according to his purpose.'
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
    setInterval(changeSlide, 7000); // Change slide every 7 seconds
});

