document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Navbar Sticky Effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    // Burger Menu
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('active');

        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
                link.style.opacity = '0';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });

        // Burger Animation
        burger.classList.toggle('toggle');
        
        // Prevent scrolling when menu is open
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : 'auto';
    });

    // Scroll Progress Indicator
    const scrollProgress = document.getElementById('scroll-progress');
    window.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        scrollProgress.style.width = `${scrolled}%`;
    });

    // Smooth Scrolling for Nav Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            // Close mobile menu if open
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                burger.classList.remove('toggle');
                document.body.style.overflow = 'auto';
                navLinks.forEach(link => {
                    link.style.animation = '';
                    link.style.opacity = '0';
                });
            }

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('pari-contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            
            if (name && email && phone) {
                // Show success animation/message
                const submitBtn = contactForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerText;
                
                submitBtn.innerText = 'Sending...';
                submitBtn.disabled = true;

                // Simulate API call
                setTimeout(() => {
                    alert(`Thank you, ${name}! Your message has been sent successfully. We will contact you soon.`);
                    contactForm.reset();
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }, 1500);
            }
        });
    }

    // Portfolio Lightbox (Simplified)
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.querySelector('img').src;
            // In a real project, you'd use a library like GLightbox or a custom modal
            // For now, let's just log or show a simple alert
            console.log('Opening image:', imgSrc);
        });
    });
});

// Add Keyframes for Nav Link Animation
const style = document.createElement('style');
style.innerHTML = `
    @keyframes navLinkFade {
        from {
            opacity: 0;
            transform: translateX(50px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    .toggle .line1 {
        transform: rotate(-45deg) translate(-5px, 6px);
    }
    .toggle .line2 {
        opacity: 0;
    }
    .toggle .line3 {
        transform: rotate(45deg) translate(-5px, -6px);
    }
`;
document.head.appendChild(style);
