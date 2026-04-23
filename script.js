// Mouse cursor glow effect (desktop only)
const cursorGlow = document.querySelector('.cursor-glow');
const isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
};

if (!isTouchDevice() && cursorGlow) {
    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (cursorGlow) {
            cursorGlow.style.left = mouseX + 'px';
            cursorGlow.style.top = mouseY + 'px';
        }
    });

    document.addEventListener('mouseenter', () => {
        if (cursorGlow) {
            cursorGlow.classList.add('active');
        }
    });

    document.addEventListener('mouseleave', () => {
        if (cursorGlow) {
            cursorGlow.classList.remove('active');
        }
    });
}

// Optimized content loading using batch operations
const loadContent = () => {
    const tasks = [
        { skeleton: 'about-skeleton', content: 'about-text', delay: 0.6 },
        { skeleton: 'skill-skeleton-1', content: 'skill-1', delay: 1.0 },
        { skeleton: 'skill-skeleton-2', content: 'skill-2', delay: 1.2 },
        { skeleton: 'skill-skeleton-3', content: 'skill-3', delay: 1.4 },
        { skeleton: 'skill-skeleton-4', content: 'skill-4', delay: 1.6 },
        { skeleton: 'contact-skeleton', content: 'contact-content', delay: 1.8 }
    ];

    tasks.forEach(({ skeleton, content, delay }) => {
        setTimeout(() => {
            document.getElementById(skeleton)?.classList.add('hidden');
            document.getElementById(content)?.classList.remove('hidden');
        }, delay * 1000);
    });
};

// Start loading when page is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadContent);
} else {
    loadContent();
}

// Smooth scroll with delegated event listener for better performance
document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a[href^="#"]');
    if (anchor) {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});

// Optimized scroll animation - use CSS instead of inline styles
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards with single batch operation
document.querySelectorAll('.skill-card, .about-card, .contact-card').forEach(el => {
    observer.observe(el);
});
