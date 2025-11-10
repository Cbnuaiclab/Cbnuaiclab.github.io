/**
 * AICLab Profile Pages - Mobile Navigation Script
 * Handles responsive mobile menu with smooth animations
 */

(function() {
    'use strict';

    // Wait for DOM to be fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-menu a');
        const body = document.body;

        // Return if elements don't exist
        if (!mobileMenuToggle || !navMenu) return;

        /**
         * Toggle mobile menu open/close
         */
        function toggleMenu() {
            const isActive = navMenu.classList.contains('active');

            mobileMenuToggle.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Prevent body scroll when menu is open
            if (!isActive) {
                body.style.overflow = 'hidden';
                mobileMenuToggle.setAttribute('aria-expanded', 'true');
            } else {
                body.style.overflow = '';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        }

        /**
         * Close mobile menu
         */
        function closeMenu() {
            if (navMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                navMenu.classList.remove('active');
                body.style.overflow = '';
                mobileMenuToggle.setAttribute('aria-expanded', 'false');
            }
        }

        // Toggle menu on button click
        mobileMenuToggle.addEventListener('click', toggleMenu);

        // Close menu when clicking on navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Close menu on window resize if screen becomes large
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                closeMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    });
})();
