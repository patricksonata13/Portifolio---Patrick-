// ===================================
// PATRICK SONATA - PORTFOLIO JS
// ===================================

// === MENU MOBILE ===
const menuBtn = document.querySelector(".mobile-menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
        navLinks.classList.toggle("show");
    });
}

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
            // Fecha menu mobile se estiver aberto
            if (navLinks) {
                navLinks.classList.remove('show');
            }
        }
    });
});

// === HEADER SCROLL EFFECT ===
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (header) {
        header.classList.toggle('scrolled', window.scrollY > 50);
    }
});

// === ACTIVE NAV LINK ===
const sections = document.querySelectorAll('section[id]');
const navLinksElements = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinksElements.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// === FADE-IN ON SCROLL ===
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => {
    fader.style.opacity = '0';
    fader.style.transform = 'translateY(20px)';
    fader.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    appearOnScroll.observe(fader);
});

// === CONTACT FORM ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Mensagem enviada! (simulação)\n\nEm produção, este formulário enviaria um email real.');
        contactForm.reset();
    });
}

// === PREVENT DEFAULT ANIMATIONS ON PAGE LOAD ===
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// === PORTFOLIO CAROUSEL ===
const initCarousels = () => {
    const carouselItems = document.querySelectorAll('[data-carousel]');
    
    carouselItems.forEach(item => {
        const images = item.querySelectorAll('.portfolio-img');
        const dots = item.querySelectorAll('.dot');
        const prevBtn = item.querySelector('.carousel-prev');
        const nextBtn = item.querySelector('.carousel-next');
        let currentIndex = 0;

        const showImage = (index) => {
            images.forEach((img, i) => {
                img.classList.toggle('active', i === index);
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        };

        const nextImage = () => {
            currentIndex = (currentIndex + 1) % images.length;
            showImage(currentIndex);
        };

        const prevImage = () => {
            currentIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(currentIndex);
        };

        // Botões de navegação
        if (nextBtn) nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            nextImage();
        });

        if (prevBtn) prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            prevImage();
        });

        // Dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', (e) => {
                e.stopPropagation();
                currentIndex = index;
                showImage(currentIndex);
            });
        });

        // Clique na imagem também avança
        images.forEach(img => {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                nextImage();
            });
        });
    });
};

// Inicializa carrosséis depois do DOM carregar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousels);
} else {
    initCarousels();
}

// === LOG CONSOLE ===
console.log('%c Patrick Sonata - Portfolio ', 'background: #007aff; color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold;');
console.log('Site desenvolvido com ❤️ e roteiro');
