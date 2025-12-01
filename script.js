// Digital Rain Effect
class DigitalRain {
    constructor() {
        this.container = document.getElementById('digital-rain');
        this.glyphs = '01ᛖᚠᚾᚦᚨᚱᚲᚷᚺᛁᛃᛇᛈᛉᛋᛏᛒᛖᛗᛚᛝᛟᛞᛜᛟᛞ';
        this.rainElements = [];
        this.init();
    }

    init() {
        this.createRain();
        this.startAnimation();
        window.addEventListener('resize', () => this.handleResize());
    }

    createRain() {
        const isMobile = window.innerWidth <= 768;
        const glyphCount = isMobile ? 50 : 120;
        
        for (let i = 0; i < glyphCount; i++) {
            this.createGlyph();
        }
    }

    createGlyph() {
        const glyph = document.createElement('div');
        glyph.className = 'rain-glyph';
        glyph.textContent = this.glyphs[Math.floor(Math.random() * this.glyphs.length)];
        
        // Random position across the width
        const startPosition = Math.random() * 100;
        glyph.style.left = `${startPosition}vw`;
        
        // Random animation duration (2-6 seconds)
        const duration = 2 + Math.random() * 4;
        glyph.style.animationDuration = `${duration}s`;
        
        // Random delay
        glyph.style.animationDelay = `${Math.random() * 2}s`;
        
        // Random color from palette
        const colors = [
            'linear-gradient(135deg, #22D3EE, #06B6D4)',
            'linear-gradient(135deg, #6D28D9, #8B5CF6)',
            'linear-gradient(135deg, #F472B6, #EC4899)',
            'linear-gradient(135deg, #22D3EE, #6D28D9)',
            'linear-gradient(135deg, #6D28D9, #F472B6)'
        ];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        glyph.style.background = randomColor;
        glyph.style.webkitBackgroundClip = 'text';
        glyph.style.webkitTextFillColor = 'transparent';
        glyph.style.backgroundClip = 'text';
        
        // Random opacity
        glyph.style.opacity = `${0.2 + Math.random() * 0.3}`;
        
        this.container.appendChild(glyph);
        this.rainElements.push(glyph);
        
        // Remove and recreate glyph after animation completes
        setTimeout(() => {
            if (glyph.parentNode) {
                glyph.parentNode.removeChild(glyph);
                const index = this.rainElements.indexOf(glyph);
                if (index > -1) this.rainElements.splice(index, 1);
            }
            this.createGlyph();
        }, (duration * 1000) + 2000);
    }

    startAnimation() {
        // Add subtle parallax effect on mouse move
        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            
            this.rainElements.forEach((glyph, index) => {
                const speed = (index % 5 + 1) * 0.01;
                glyph.style.transform = `translateX(${(x - 50) * speed}px) translateY(${(y - 50) * speed}px)`;
            });
        });
    }

    handleResize() {
        // Recreate rain with appropriate density for new screen size
        this.rainElements.forEach(glyph => {
            if (glyph.parentNode) {
                glyph.parentNode.removeChild(glyph);
            }
        });
        this.rainElements = [];
        this.createRain();
    }
}

// Interactive Elements Handler
class InteractiveElements {
    constructor() {
        this.init();
    }

    init() {
        this.setupInputEffects();
        this.setupButtonEffects();
        this.setupCardAnimations();
    }

    setupInputEffects() {
        const input = document.querySelector('.matrix-input');
        const sendButton = document.querySelector('.send-button');
        
        if (input && sendButton) {
            input.addEventListener('focus', () => {
                input.style.transform = 'scale(1.02)';
                this.createRippleEffect(input, 'focus');
            });
            
            input.addEventListener('blur', () => {
                input.style.transform = 'scale(1)';
            });
            
            input.addEventListener('input', () => {
                const value = input.value;
                // Add subtle typing animation effect
                if (value.length > 0) {
                    this.typewriterEffect(value);
                }
            });
            
            sendButton.addEventListener('click', (e) => {
                this.handleMessageSend(e, input);
            });
            
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleMessageSend(e, input);
                }
            });
        }
    }

    setupButtonEffects() {
        const buttons = document.querySelectorAll('.cta-button, .send-button');
        
        buttons.forEach(button => {
            button.addEventListener('mouseenter', () => {
                this.createRippleEffect(button, 'hover');
            });
            
            button.addEventListener('click', (e) => {
                this.createClickRipple(button, e);
            });
        });
    }

    setupCardAnimations() {
        const cards = document.querySelectorAll('.feature-card, .input-card, .stats-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });
        
        cards.forEach((card, index) => {
            // Initial state for animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = `opacity 600ms ease ${index * 100}ms, transform 600ms ease ${index * 100}ms`;
            
            observer.observe(card);
        });
    }

    createRippleEffect(element, type) {
        const ripple = document.createElement('div');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(109, 40, 217, 0.3)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 600ms linear';
        ripple.style.pointerEvents = 'none';
        
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    createClickRipple(button, event) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 600ms linear';
        ripple.style.pointerEvents = 'none';
        
        const rect = button.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (event.clientX - rect.left - size / 2) + 'px';
        ripple.style.top = (event.clientY - rect.top - size / 2) + 'px';
        
        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);
        
        setTimeout(() => {
            if (ripple.parentNode) {
                ripple.parentNode.removeChild(ripple);
            }
        }, 600);
    }

    typewriterEffect(text) {
        // Add subtle visual feedback for typing
        const cards = document.querySelectorAll('.feature-card');
        cards.forEach(card => {
            const icon = card.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1) rotate(0deg)';
                }, 200);
            }
        });
    }

    handleMessageSend(event, input) {
        event.preventDefault();
        const message = input.value.trim();
        
        if (message) {
            // Add sending animation
            const button = event.target.closest('button');
            if (button) {
                button.textContent = 'Sending...';
                button.disabled = true;
                
                setTimeout(() => {
                    button.textContent = 'Sent ✓';
                    setTimeout(() => {
                        button.textContent = 'Send';
                        button.disabled = false;
                    }, 2000);
                }, 1000);
            }
            
            // Clear input
            input.value = '';
            
            // Add success effect
            this.showMessageSentEffect();
        }
    }

    showMessageSentEffect() {
        // Create floating particles effect
        const colors = ['#22D3EE', '#6D28D9', '#F472B6'];
        
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '1000';
            
            const startX = window.innerWidth / 2;
            const startY = window.innerHeight / 2;
            particle.style.left = startX + 'px';
            particle.style.top = startY + 'px';
            
            document.body.appendChild(particle);
            
            const angle = (Math.PI * 2 * i) / 15;
            const velocity = 2 + Math.random() * 3;
            const lifetime = 2000;
            
            let posX = startX;
            let posY = startY;
            let opacity = 1;
            
            const animate = () => {
                posX += Math.cos(angle) * velocity;
                posY += Math.sin(angle) * velocity;
                opacity -= 0.02;
                
                particle.style.left = posX + 'px';
                particle.style.top = posY + 'px';
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    if (particle.parentNode) {
                        particle.parentNode.removeChild(particle);
                    }
                }
            };
            
            requestAnimationFrame(animate);
        }
    }
}

// Smooth Scrolling and Performance Optimizations
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupSmoothScrolling();
        this.setupLazyLoading();
        this.optimizeAnimations();
    }

    setupSmoothScrolling() {
        // Add smooth scrolling for any anchor links
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
    }

    setupLazyLoading() {
        // Optimize performance by pausing animations when not visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const element = entry.target;
                if (entry.isIntersecting) {
                    element.style.animationPlayState = 'running';
                } else {
                    element.style.animationPlayState = 'paused';
                }
            });
        });

        document.querySelectorAll('.feature-card, .input-card, .stats-card').forEach(card => {
            observer.observe(card);
        });
    }

    optimizeAnimations() {
        // Use requestAnimationFrame for better performance
        let ticking = false;

        const updateAnimations = () => {
            // Update any ongoing animations
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateAnimations);
                ticking = true;
            }
        };

        document.addEventListener('scroll', requestTick);
    }
}

// Navigation Active State Handler
class NavigationHandler {
    constructor() {
        this.init();
    }

    init() {
        // Remove any existing active classes first
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Get current page filename
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Find matching nav link
        const navLinks = document.querySelectorAll('.nav-link');
        let activeLink = null;

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPage || 
                (currentPage === 'index.html' && href === 'index.html') ||
                (currentPage === '' && href === 'index.html')) {
                activeLink = link;
            }
        });

        // Set active state if found
        if (activeLink) {
            activeLink.classList.add('active');
        } else {
            // Default to Home if no match found
            const homeLink = document.querySelector('a[href="index.html"]');
            if (homeLink) homeLink.classList.add('active');
        }

        // Add smooth transition on page load
        setTimeout(() => {
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.classList.contains('active')) {
                    link.style.transform = 'translateY(-1px) scale(1.02)';
                }
            });
        }, 100);
    }

    // Method to update active state programmatically
    updateActiveState(pageName) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        const targetLink = document.querySelector(`a[href="${pageName}"]`);
        if (targetLink) {
            targetLink.classList.add('active');
        }
    }

    // Method to handle smooth page transitions
    addPageTransitions() {
        const navLinks = document.querySelectorAll('.nav-link');
        const container = document.querySelector('.container');

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const transitionDuration = prefersReducedMotion ? 100 : 600;

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                // Only intercept internal navigation
                const href = link.getAttribute('href');
                if (href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:')) {
                    e.preventDefault();
                    
                    // Determine direction based on current and target pages
                    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                    const targetPage = href;
                    
                    // Simple direction logic: if target comes after current alphabetically, slide right
                    const pages = ['index.html', 'schedule.html', 'about.html', 'contact.html'];
                    const currentIndex = pages.indexOf(currentPage);
                    const targetIndex = pages.indexOf(targetPage);
                    
                    const slideRight = targetIndex > currentIndex;
                    
                    // Add transition classes
                    container.classList.add(slideRight ? 'page-exit' : 'page-exit-left');
                    
                    // Navigate after animation starts (shorter for reduced motion)
                    const navigationDelay = prefersReducedMotion ? 50 : transitionDuration / 2.4;
                    setTimeout(() => {
                        window.location.href = href;
                    }, navigationDelay);
                }
            });
        });

        // Add entrance animation on page load
        window.addEventListener('load', () => {
            setTimeout(() => {
                container.classList.add('page-enter');
                setTimeout(() => {
                    container.classList.remove('page-enter', 'page-exit', 'page-exit-left');
                }, transitionDuration);
            }, 50);
        });

        // Listen for changes in motion preference
        window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', (e) => {
            // Update transition duration if preference changes
            const newDuration = e.matches ? 100 : 600;
            // The duration will be picked up on next navigation
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize all systems
    const digitalRain = new DigitalRain();
    const interactiveElements = new InteractiveElements();
    const performanceOptimizer = new PerformanceOptimizer();
    const navigationHandler = new NavigationHandler();
    
    // Add page transition functionality
    navigationHandler.addPageTransitions();
    
    // Add some initial loading effects
    setTimeout(() => {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    }, 100);
    
    // Add keyboard shortcuts for enhanced UX
    document.addEventListener('keydown', (e) => {
        // Press 'M' to toggle Matrix effect intensity
        if (e.key.toLowerCase() === 'm' && e.ctrlKey) {
            e.preventDefault();
            const rain = document.getElementById('digital-rain');
            const currentOpacity = parseFloat(rain.style.opacity || '0.7');
            const newOpacity = currentOpacity > 0.3 ? '0.3' : '0.7';
            rain.style.opacity = newOpacity;
        }
    });
    
    console.log('🟣 Matrix Aesthetic initialized successfully');
    console.log('💡 Press Ctrl+M to toggle matrix intensity');
});

// Add CSS for ripple animation
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);