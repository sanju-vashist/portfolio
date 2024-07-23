// Wait for the DOM to be fully loaded before executing scripts
document.addEventListener('DOMContentLoaded', function() {
    
    // Toggle navigation menu for mobile devices
    function toggleNav() {
        var nav = document.getElementById("nav");
        nav.classList.toggle("active");
    }

    // Make toggleNav function globally accessible
    window.toggleNav = toggleNav;

    // Feature item click handler
    const featureItems = document.querySelectorAll('.feature-item');
    const featureImage = document.getElementById('featureImage');
    const featureImage2 = document.getElementById('featureImage2');

    featureItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all items
            featureItems.forEach(i => {
                i.classList.remove('active');
                i.querySelector('.project-btn').style.display = 'none';
            });

            // Add active class to clicked item
            this.classList.add('active');
            this.querySelector('.project-btn').style.display = 'inline-block';

            // Change the images
            const newImageSrc = this.getAttribute('data-image');
            if (featureImage) featureImage.src = newImageSrc;
            if (featureImage2) featureImage2.src = newImageSrc;
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Add animation to skills section
    const skillsSection = document.querySelector('.skills');
    const skillItems = document.querySelectorAll('.skill');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, index * 100);
                });
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            if (validateForm()) {
                // If form is valid, you can submit it here
                console.log('Form submitted successfully');
                // You may want to add AJAX submission here
            }
        });
    }

    function validateForm() {
        let isValid = true;
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');

        if (name.value.trim() === '') {
            isValid = false;
            showError(name, 'Name is required');
        }

        if (email.value.trim() === '') {
            isValid = false;
            showError(email, 'Email is required');
        } else if (!isValidEmail(email.value)) {
            isValid = false;
            showError(email, 'Please enter a valid email');
        }

        if (phone.value.trim() === '') {
            isValid = false;
            showError(phone, 'Phone number is required');
        }

        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.parentElement;
        const error = formGroup.querySelector('.error-message') || document.createElement('div');
        error.className = 'error-message';
        error.textContent = message;
        if (!formGroup.querySelector('.error-message')) {
            formGroup.appendChild(error);
        }
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
});