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
});
