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

        // Form submission with Jotform embed method
        const contactForm = document.querySelector('#contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Get form data
                const formData = new FormData(this);
                const data = Object.fromEntries(formData);
                
                // Simple validation
                if (!data.firstName || !data.lastName || !data.email || !data.phone || !data.streetAddress || !data.city || !data.state || !data.zipCode) {
                    alert('Please fill in all required fields.');
                    return;
                }
                
                // Update submit button
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Use Jotform with correct API format
                const jotformData = {
                    "submission": {
                        "firstName": data.firstName,
                        "lastName": data.lastName,
                        "email": data.email,
                        "phone": data.phone,
                        "streetAddress": data.streetAddress,
                        "streetAddress2": data.streetAddress2 || '',
                        "city": data.city,
                        "state": data.state,
                        "zipCode": data.zipCode,
                        "message": data.message || ''
                    }
                };
                
                // Submit to Jotform API with correct format
                fetch('https://api.jotform.com/form/252888397012062/submissions', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'APIKEY': '9c0eb786b2d1e940ba54f78764bbca2c'
                    },
                    body: JSON.stringify(jotformData)
                })
            .then(response => {
                console.log('Response status:', response.status);
                return response.json();
            })
            .then(result => {
                console.log('Jotform response:', result);
                if (result.responseCode === 200) {
                    alert('Thank you for your message! We will contact you within 24 hours.');
                    this.reset();
                } else {
                    console.error('Submission failed:', result);
                    throw new Error(`Submission failed: ${result.message || 'Unknown error'}`);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('There was an error submitting your form. Please try again or call us directly at (706) 296-0609.');
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
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
