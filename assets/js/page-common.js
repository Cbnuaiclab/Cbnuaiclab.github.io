// Common JavaScript for Team, Projects, and Publications pages

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('nav') && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Smooth scroll for back link
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.addEventListener('click', function(e) {
            // Allow default behavior for navigation
        });
    }

    // Generic fade-in animation function
    function addFadeInAnimation(selector, delay = 100, direction = 'Y') {
        const elements = document.querySelectorAll(selector);
        elements.forEach((element, index) => {
            setTimeout(() => {
                element.style.opacity = '0';
                element.style.transform = direction === 'X' ? 'translateX(-20px)' : 'translateY(20px)';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

                setTimeout(() => {
                    element.style.opacity = '1';
                    element.style.transform = direction === 'X' ? 'translateX(0)' : 'translateY(0)';
                }, 50);
            }, index * delay);
        });
    }

    // Apply animations to common elements
    addFadeInAnimation('.team-member', 150);
    addFadeInAnimation('.publication-item', 100);
    addFadeInAnimation('.research-card', 100);
    addFadeInAnimation('.section-title', 200, 'X');
    addFadeInAnimation('.category-title', 200, 'X');
    addFadeInAnimation('.year-title', 200, 'X');

    // Section nav: smooth-scroll pills + scroll-spy active state
    const sectionNav = document.querySelector('.section-nav');
    if (sectionNav) {
        const pills = sectionNav.querySelectorAll('.section-nav-pill');
        const targets = [];

        const siteHeader = document.querySelector('header');
        const syncHeaderHeight = () => {
            if (!siteHeader) return;
            const h = Math.round(siteHeader.getBoundingClientRect().height);
            document.documentElement.style.setProperty('--site-header-h', h + 'px');
        };
        syncHeaderHeight();
        window.addEventListener('resize', syncHeaderHeight);
        if (window.ResizeObserver && siteHeader) {
            new ResizeObserver(syncHeaderHeight).observe(siteHeader);
        }

        const stickyOffset = () => {
            const headerH = siteHeader ? siteHeader.getBoundingClientRect().height : 0;
            const navH = sectionNav.getBoundingClientRect().height;
            return headerH + navH + 16;
        };

        const scrollToTarget = (target) => {
            const top = target.getBoundingClientRect().top + window.pageYOffset - stickyOffset();
            window.scrollTo({ top: top, behavior: 'smooth' });
        };

        pills.forEach(pill => {
            const href = pill.getAttribute('href');
            if (!href || !href.startsWith('#')) return;
            const target = document.getElementById(href.slice(1));
            if (target) targets.push({ pill, target });

            pill.addEventListener('click', function(e) {
                e.preventDefault();
                if (!target) return;
                pills.forEach(p => p.classList.remove('active'));
                pill.classList.add('active');
                scrollToTarget(target);
                history.replaceState(null, '', href);
            });
        });

        // Handle direct navigation via URL hash (e.g. /publications.html#year-2023)
        if (window.location.hash) {
            const target = document.getElementById(window.location.hash.slice(1));
            if (target) {
                setTimeout(() => scrollToTarget(target), 50);
            }
        }

        if ('IntersectionObserver' in window && targets.length) {
            const setActive = (id) => {
                pills.forEach(p => p.classList.toggle('active', p.getAttribute('href') === '#' + id));
            };
            const observer = new IntersectionObserver((entries) => {
                const visible = entries
                    .filter(e => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length) setActive(visible[0].target.id);
            }, { rootMargin: '-180px 0px -60% 0px', threshold: 0 });
            targets.forEach(({ target }) => observer.observe(target));
        }
    }
});
