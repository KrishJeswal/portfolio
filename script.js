document.addEventListener('DOMContentLoaded', () => {

    const nav = document.querySelector('.header__nav');

    const homeSection = document.getElementById('home');

    const homeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            nav.classList.toggle('scrolled-past-home', !entry.isIntersecting);
        });
    }, {
        threshold: 0
    });

    homeObserver.observe(homeSection);

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.header__menu a');

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle(
                        'active',
                        link.getAttribute('href') === `#${entry.target.id}`
                    );
                });
            }
        });
    }, {
        rootMargin: '-59px 0px -50% 0px'
    });

    sections.forEach(s => sectionObserver.observe(s));

    const hamburger = document.getElementById('hamburger');
    const drawer = document.getElementById('mobile-drawer');

    hamburger.addEventListener('click', () => {
        const isOpen = drawer.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen);
    });

    drawer.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            drawer.classList.remove('open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    const revealEls = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    revealEls.forEach(el => revealObserver.observe(el));

});
