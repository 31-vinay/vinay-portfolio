const cursorGlow = document.querySelector('.cursor-glow');
const particlesContainer = document.getElementById('particles');
const backgroundVideo = document.querySelector('.video-background video');

const isTouchDevice = () => (
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
);

if (cursorGlow && !isTouchDevice()) {
    document.addEventListener('mousemove', (event) => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
    });

    document.addEventListener('mouseenter', () => cursorGlow.classList.add('active'));
    document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));
}

if (particlesContainer) {
    const particleCount = 24;
    for (let i = 0; i < particleCount; i += 1) {
        const particle = document.createElement('span');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 10}s`;
        particle.style.animationDuration = `${14 + Math.random() * 8}s`;
        particlesContainer.appendChild(particle);
    }

    if (backgroundVideo) {
        backgroundVideo.play().catch(() => {
            // Autoplay can be blocked on some mobile browsers until user interaction.
        });

        document.addEventListener('click', () => {
            if (backgroundVideo.paused) {
                backgroundVideo.play().catch(() => {});
            }
        });
    }
}

document.addEventListener('click', (event) => {
    const anchor = event.target.closest('a[href^="#"]');
    if (!anchor) {
        return;
    }

    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) {
        return;
    }

    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const revealItems = document.querySelectorAll('.reveal');
if (revealItems.length > 0) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) {
                    return;
                }

                const delay = Number(entry.target.dataset.delay || 0);
                window.setTimeout(() => {
                    entry.target.classList.add('show');
                }, delay);

                observer.unobserve(entry.target);
            });
        },
        {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        }
    );

    revealItems.forEach((item) => observer.observe(item));
}
