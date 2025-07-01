document.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    mobileMenuToggle.addEventListener('click', () => {
        document.body.classList.toggle('mobile-nav-open');
    });

    const navLinks = navbar.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (document.body.classList.contains('mobile-nav-open')) {
                document.body.classList.remove('mobile-nav-open');
            }
        });
    });

    // Optional: If using hero section slider, keep this block
    // Otherwise, comment or remove it
});
