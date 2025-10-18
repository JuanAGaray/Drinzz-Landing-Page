// Drinzz Website JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling for any anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Add loading animation
    const body = document.body;
    body.style.opacity = '0';
    body.style.transition = 'opacity 0.5s ease-in-out';
    
    setTimeout(() => {
        body.style.opacity = '1';
    }, 100);

    // Add interactive effects to floating bubbles
    const bubbles = document.querySelectorAll('.bubble');
    bubbles.forEach((bubble, index) => {
        bubble.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.2)';
            this.style.background = 'rgba(255, 255, 255, 0.2)';
        });
        
        bubble.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.background = 'rgba(255, 255, 255, 0.1)';
        });
    });

    // Add click effect to menu items
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.background = 'rgba(255, 107, 157, 0.1)';
            this.style.transform = 'scale(1.02)';
            
            setTimeout(() => {
                this.style.background = '';
                this.style.transform = '';
            }, 200);
        });
    });

    // Add parallax effect to floating elements
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const bubbles = document.querySelectorAll('.bubble');
        
        bubbles.forEach((bubble, index) => {
            const speed = 0.5 + (index * 0.1);
            bubble.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add typing effect to logo (if on construction page)
    const logo = document.querySelector('.logo');
    if (logo && window.location.pathname === '/' || window.location.pathname === '/index.html') {
        const text = logo.textContent;
        logo.textContent = '';
        logo.style.borderRight = '3px solid white';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                logo.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 150);
            } else {
                setTimeout(() => {
                    logo.style.borderRight = 'none';
                }, 1000);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    // Add hover effects to social links
    const socialLinks = document.querySelectorAll('.social-link');
    socialLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.1)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click animation to features
    const features = document.querySelectorAll('.feature');
    features.forEach(feature => {
        feature.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-5px)';
            }, 150);
        });
    });

    // Add loading state to menu link
    const menuLink = document.querySelector('.menu-link');
    if (menuLink) {
        menuLink.addEventListener('click', function(e) {
            const originalText = this.innerHTML;
            this.innerHTML = '<span>Cargando...</span><span class="arrow">⏳</span>';
            this.style.pointerEvents = 'none';
            
            setTimeout(() => {
                this.innerHTML = originalText;
                this.style.pointerEvents = 'auto';
            }, 1000);
        });
    }

    // Add random floating animation to bubbles
    bubbles.forEach((bubble, index) => {
        const randomDelay = Math.random() * 2;
        const randomDuration = 4 + Math.random() * 4;
        
        bubble.style.animationDelay = `${randomDelay}s`;
        bubble.style.animationDuration = `${randomDuration}s`;
    });

    // Add intersection observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe menu sections for animation
    const menuSections = document.querySelectorAll('.menu-section');
    menuSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals or return to home
            if (window.location.pathname.includes('carta')) {
                window.location.href = '../index.html';
            }
        }
    });

    // Add touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', function(e) {
        touchStartX = e.changedTouches[0].screenX;
    });

    document.addEventListener('touchend', function(e) {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // Swipe left - could navigate to next menu
                console.log('Swipe left detected');
            } else {
                // Swipe right - could navigate to previous menu
                console.log('Swipe right detected');
            }
        }
    }

    // Add performance optimization
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });

    // Add error handling for external resources
    window.addEventListener('error', function(e) {
        console.log('Resource loading error:', e.target.src || e.target.href);
    });

    // Menu toggle functionality
    const toggleButtons = document.querySelectorAll('.toggle-btn');
    const menuSinAlcohol = document.getElementById('menu-sin-alcohol');
    const menuConAlcohol = document.getElementById('menu-con-alcohol');
    const alcoholBadge = document.getElementById('alcohol-badge');

    if (toggleButtons.length > 0) {
        toggleButtons.forEach(button => {
            button.addEventListener('click', function() {
                const type = this.getAttribute('data-type');
                
                // Remove active class from all buttons
                toggleButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                // Show/hide appropriate menu
                if (type === 'sin-alcohol') {
                    menuSinAlcohol.style.display = 'grid';
                    menuConAlcohol.style.display = 'none';
                    alcoholBadge.textContent = 'sin alcohol';
                    alcoholBadge.classList.remove('alcohol');
                } else if (type === 'con-alcohol') {
                    menuSinAlcohol.style.display = 'none';
                    menuConAlcohol.style.display = 'grid';
                    alcoholBadge.textContent = 'con alcohol';
                    alcoholBadge.classList.add('alcohol');
                }
                
                // Add smooth transition effect
                const activeMenu = type === 'sin-alcohol' ? menuSinAlcohol : menuConAlcohol;
                activeMenu.style.opacity = '0';
                activeMenu.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    activeMenu.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                    activeMenu.style.opacity = '1';
                    activeMenu.style.transform = 'translateY(0)';
                }, 50);
            });
        });
    }

    console.log('Drinzz website loaded successfully! 🥤');
});
