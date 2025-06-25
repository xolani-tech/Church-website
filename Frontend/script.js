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
            image: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/489379034_1096403432505998_1006130090780695940_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeFiIyj_UsaB5Uc7VOW9lSNYFtCIj6fdAjkW0IiPp90COeBM7ScV0l2fmRXr2L8RjQW8DEAzfCcshrj9kHFhmcVL&_nc_ohc=csvoCfghmSUQ7kNvwFvSGTz&_nc_oc=AdnRJmmw8hpPzLFt9FHRB9fi5rJSsqLTAUIbfT4RJNn0zvoPutLLUeOFaOy1zdqQqJY&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=bDjxGWrbg1_FAseQzWkr1A&oh=00_AfN9kmkXkAbHDDqGHuevWIIBvgqbwOmJhQzkn6WyaZ08kA&oe=68617878',
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
            image: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/489231075_1095625295917145_681549800403990065_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFQgOk2dc37mHjWHa57f4CQemH68aAxdet6YfrxoDF16_C0J9vTuHintaWm8qBOPdumLiR7Q-n6n4XpYcANTE4F&_nc_ohc=MYb8raHjMmsQ7kNvwElze9d&_nc_oc=Adl20f4833stuAbpXfLVJmOFaXcq--VHvWbic3pbHYIPLY__WTQNkol8Cfdl1IsWCgo&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=BNGQ4NjbwEZAHbGjByAfyg&oh=00_AfNBFlMyr7CHhpcz_NMesV-xasKP2NwTAYABHQ81cdMjBA&oe=68616F9A',
            scripture: 'John 3:16',
            title: 'For God So Loved The World,',
            subtitle: 'that he gave his only Son, that whoever believes in him should not perish but have eternal life.'
        },
        {
            image: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/488608909_1096100572536284_4788623712891631385_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHjAf1xb8i-As9N2KrugM4TCRWb6ryvDywJFZvqvK8PLNR1kHjMkORqoLgpQ6wTvT8JClJxPmv9d1D9g71-iC8r&_nc_ohc=SS38VpOjhg4Q7kNvwGkHGxI&_nc_oc=Adm6nyha6e_oFU9VIpGa-b03hbkLTvt-UnURFmxfhYa_91GyCbKa5-XTbisqiHDXd2Q&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=_M5wToT5D4OZlaXUWgMG7g&oh=00_AfM_uywKmsFml-_qBtPRw3kIfxH5TSJ8jzA3Drw8p1Xb0w&oe=68616611',
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

