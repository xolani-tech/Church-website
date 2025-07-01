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
            image: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/487048289_1089767566502918_7316173163832005464_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeEWofudGZyiAQULs9QrFIpoLEciTwpNJ1gsRyJPCk0nWCHwihAonotJjj7ITFgfEUaEcjPSv5fKjAtCfHoAIyRk&_nc_ohc=yjyWevcs-GwQ7kNvwH0KEo0&_nc_oc=AdkWWu9eD2EV75DVvWrJCL4ro_o8JCwWhs8lQqqb8B9yU88G6Ph8qRZqBS9ACdq-DlI&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=703-U_fE5kezTmbPJFqU1A&oh=00_AfMhDGSqPqpKKMg00kvmcjQEm5rSe634v_pdcVrVZYe7RQ&oe=68685C55',
            scripture: 'Welcome to',
            title: 'New Jerusalem Church Of All Nations',
            subtitle: 'The spirit of GOD lives'

        },
        {
            image: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/489025202_1094585086021166_2597828619559256447_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=127cfc&_nc_eui2=AeGhv3v5S1Dryrwp380FzCBFHShGbVnqLIQdKEZtWeoshPcBpfNrSoNIaLvjlmv2XN5m3UIpSwu8p0FAEIVKprkV&_nc_ohc=IWA4hp7MPasQ7kNvwHhwIto&_nc_oc=Admz7o2nQlieM2NKIOQBzOR8rZX3-EiWaW0gqx9-BFzxG1V8eMYGMC3P5jcidiFcbfE&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=vyesgSQw4_QHMiD781Fmrw&oh=00_AfMxWXXFz_HH_JKLlWa5qux8Y4RnWTerzIK-Ww7e_JMQ_w&oe=686855FA',
            scripture: 'Hebrews 4:12',
            title: 'For The Word Of God Is Living And Active,',
            subtitle: 'sharper than any two-edged sword, piercing to the division of soul and of spirit...'
        },
        {
            image: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/489231075_1095625295917145_681549800403990065_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFQgOk2dc37mHjWHa57f4CQemH68aAxdet6YfrxoDF16_C0J9vTuHintaWm8qBOPdumLiR7Q-n6n4XpYcANTE4F&_nc_ohc=SineQAdM0ckQ7kNvwFPdzkO&_nc_oc=Adl5Ptxwy3pkiFZ5u2s_aEaB5D4hUsvJPFmeVlq248btUMlRnZxv6OKwtePIrI1V30g&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=DMFIH2ebSsB88Nt_phJHLg&oh=00_AfNZL3JlXzMLBh0eFPHAquQ14FnPhUjziVJtBKPxaMIrIQ&oe=6868779A',
            scripture: 'John 3:16',
            title: 'For God So Loved The World,',
            subtitle: 'that he gave his only Son, that whoever believes in him should not perish but have eternal life.'
        },
        {
            image: 'https://scontent-cpt1-1.xx.fbcdn.net/v/t39.30808-6/487407473_1092503219562686_8647403533553577986_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHqg6L6mgVncp2yWEAfJ_gIBu9MWN-xrkoG70xY37GuStMSuW_1TQaVPmf-EIa4cUboL2Z8fGUN9x3JmhLnfmwh&_nc_ohc=YWLoQcApV-QQ7kNvwGf3NX_&_nc_oc=AdmVce624D6m5EpZsxuzRu0zZLTvaJe1axTLU_9sxTkno1ke2KgBzxQ24m3EW6QQFF4&_nc_zt=23&_nc_ht=scontent-cpt1-1.xx&_nc_gid=ms5mNBXmAVabJhXHmjuF2g&oh=00_AfOCTLZQrYAQpFw48Hku-tJ-mNhzM4FRdGbNDvyYc3VAgQ&oe=68685659',
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

