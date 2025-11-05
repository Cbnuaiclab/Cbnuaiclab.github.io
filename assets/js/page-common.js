// Common JavaScript for Team, Projects, and Publications pages

document.addEventListener('DOMContentLoaded', function() {
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
