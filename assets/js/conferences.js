// Conferences Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to conference cards
    const conferenceCards = document.querySelectorAll('.conference-card');
    conferenceCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, 50);
        }, index * 100);
    });

    // Add animation to section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach((title, index) => {
        setTimeout(() => {
            title.style.opacity = '0';
            title.style.transform = 'translateX(-20px)';
            title.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

            setTimeout(() => {
                title.style.opacity = '1';
                title.style.transform = 'translateX(0)';
            }, 50);
        }, index * 200);
    });

    // Smooth scroll for back link
    const backLink = document.querySelector('.back-link');
    if (backLink) {
        backLink.addEventListener('click', function(e) {
            // Allow default behavior for navigation
        });
    }

    // Add click event handlers for link buttons
    const linkBtns = document.querySelectorAll('.link-btn');
    linkBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Check if href is just "#" (placeholder)
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                // You can add logic here to handle missing links
                console.log('Link not yet available');
            }
        });
    });
});
