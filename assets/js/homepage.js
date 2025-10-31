/**
 * AICLab Portfolio - Mobile Navigation Script
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

        // Toggle menu on hamburger click
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            toggleMenu();
        });

        // Close menu when clicking on a navigation link
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                closeMenu();
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileMenuToggle.contains(event.target);

            if (!isClickInsideNav && !isClickOnToggle) {
                closeMenu();
            }
        });

        // Close menu when pressing Escape key
        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        });

        // Handle window resize with debounce
        let resizeTimer;
        window.addEventListener('resize', function() {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                // Close menu on desktop view
                if (window.innerWidth > 768) {
                    closeMenu();
                }
            }, 250);
        });

        // Prevent menu link clicks from bubbling
        navMenu.addEventListener('click', function(e) {
            if (e.target.tagName === 'A') {
                e.stopPropagation();
            }
        });
    });
})();
