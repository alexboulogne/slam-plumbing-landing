// SLAM Plumbing Landing Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Sticky Header functionality
    const stickyHeader = document.querySelector('.sticky-header');
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            stickyHeader.style.display = 'block';
        } else {
            stickyHeader.style.display = 'none';
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

        // Form is now handled by direct submission to Jotform - no custom JavaScript needed
    }

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Phone number click tracking
    document.querySelectorAll('a[href^="tel:"]').forEach(phoneLink => {
        phoneLink.addEventListener('click', function() {
            // Track phone clicks for analytics
            console.log('Phone number clicked:', this.href);
        });
    });

    // CTA button click tracking
    document.querySelectorAll('.btn-primary, .btn-outline-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            // Track CTA clicks for analytics
            console.log('CTA clicked:', this.textContent);
        });
    });

    // Initialize tooltips if Bootstrap is loaded
    if (typeof bootstrap !== 'undefined') {
        var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
});
