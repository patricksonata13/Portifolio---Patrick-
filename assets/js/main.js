// ============================================
// JAVASCRIPT COMPLETO - SITE PATRICK SONATA
// Todas as funcionalidades otimizadas
// Versão: 2.0 - Performance e SEO
// ============================================

console.log('🎭 Site Patrick Sonata - Inicializando...');

// Configurações
const CONFIG = {
    notificationDuration: 5000,
    scrollThreshold: 300,
    animationDelay: 100
};

// Cache de elementos DOM
let cachedElements = {};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM completamente carregado');
    
    // Cache de elementos
    cacheElements();
    
    // Configurar funcionalidades
    setupMobileMenu();
    setupSmoothScroll();
    setupWorksFilter();
    setupBackToTop();
    updateCurrentYear();
    setupScrollAnimations();
    setupLazyLoading();
    setupPrintStyles();
    
    console.log('🚀 Todas funcionalidades configuradas!');
});

// ============================================
// CACHE DE ELEMENTOS
// ============================================
function cacheElements() {
    cachedElements = {
        hamburger: document.querySelector('.hamburger'),
        navMenu: document.querySelector('.nav-menu'),
        navLinks: document.querySelectorAll('.nav-link'),
        filterButtons: document.querySelectorAll('.filter-btn'),
        workCards: document.querySelectorAll('.work-card'),
        backToTopButton: document.getElementById('backToTop'),
        yearElement: document.getElementById('currentYear'),
        lazyImages: document.querySelectorAll('img.lazy')
    };
    
    console.log('📦 Elementos cacheados:', Object.keys(cachedElements).length);
}

// ============================================
// 1. MENU MOBILE
// ============================================
function setupMobileMenu() {
    const { hamburger, navMenu, navLinks } = cachedElements;
    
    if (!hamburger || !navMenu) {
        console.warn('⚠️  Elementos do menu não encontrados');
        return;
    }
    
    // Toggle menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
        
        // Acessibilidade
        const isExpanded = this.classList.contains('active');
        this.setAttribute('aria-expanded', isExpanded);
    });
    
    // Fechar menu ao clicar em links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
            hamburger.setAttribute('aria-expanded', 'false');
        }
    });
    
    console.log('📱 Menu mobile configurado');
}

// ============================================
// 2. NAVEGAÇÃO SUAVE
// ============================================
function setupSmoothScroll() {
    // Links do menu
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') {
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                // Atualizar link ativo no menu
                updateActiveNavLink(this);
                
                // Scroll suave
                smoothScrollTo(targetElement);
                
                console.log(`📍 Navegando para: ${targetId}`);
            }
        });
    });
    
    console.log('🔗 Navegação suave configurada');
}

function updateActiveNavLink(clickedLink) {
    const { navLinks } = cachedElements;
    
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    clickedLink.classList.add('active');
}

function smoothScrollTo(element) {
    const headerHeight = document.querySelector('.header').offsetHeight;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
    
    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

// ============================================
// 3. FILTRO DE TRABALHOS
// ============================================
function setupWorksFilter() {
    const { filterButtons, workCards } = cachedElements;
    
    if (filterButtons.length === 0 || workCards.length === 0) {
        console.warn('⚠️  Elementos do filtro não encontrados');
        return;
    }
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Adicionar active no botão clicado
            this.classList.add('active');
            this.blur(); // Remover foco para acessibilidade
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar cards com animação
            filterWorkCards(filterValue);
            
            console.log(`🎯 Filtro aplicado: ${filterValue}`);
        });
    });
    
    console.log('🎨 Filtro de trabalhos configurado');
}

function filterWorkCards(filterValue) {
    const { workCards } = cachedElements;
    
    workCards.forEach((card, index) => {
        const category = card.getAttribute('data-category');
        const shouldShow = filterValue === 'all' || filterValue === category;
        
        if (shouldShow) {
            // Animação de entrada
            setTimeout(() => {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * CONFIG.animationDelay);
        } else {
            // Animação de saída
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// ============================================
// 4. BOTÃO VOLTAR AO TOPO
// ============================================
function setupBackToTop() {
    const { backToTopButton } = cachedElements;
    
    if (!backToTopButton) return;
    
    // Verificar scroll
    window.addEventListener('scroll', throttle(() => {
        if (window.scrollY > CONFIG.scrollThreshold) {
            backToTopButton.classList.add('visible');
            backToTopButton.setAttribute('aria-hidden', 'false');
        } else {
            backToTopButton.classList.remove('visible');
            backToTopButton.setAttribute('aria-hidden', 'true');
        }
    }, 100));
    
    // Clique no botão
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Focar no header para acessibilidade
        document.querySelector('.header').focus();
    });
    
    console.log('⬆️  Botão voltar ao topo configurado');
}

// ============================================
// 5. ATUALIZAR ANO NO FOOTER
// ============================================
function updateCurrentYear() {
    const { yearElement } = cachedElements;
    
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
        console.log('📅 Ano atualizado:', yearElement.textContent);
    }
}

// ============================================
// 6. ANIMAÇÕES AO SCROLL
// ============================================
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll(
        '.profile-card, .about-content, .work-card, .contact-item, .section-title'
    );
    
    elementsToAnimate.forEach(el => observer.observe(el));
    
    console.log('🎬 Animações ao scroll configuradas:', elementsToAnimate.length);
}

// ============================================
// 7. LAZY LOADING DE IMAGENS
// ============================================
function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('data-src');
                    
                    if (src) {
                        img.src = src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const { lazyImages } = cachedElements;
        lazyImages.forEach(img => imageObserver.observe(img));
        
        console.log('🖼️  Lazy loading configurado:', lazyImages.length, 'imagens');
    }
}

// ============================================
// 8. STYLES PARA PRINT
// ============================================
function setupPrintStyles() {
    window.addEventListener('beforeprint', () => {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', () => {
        document.body.classList.remove('printing');
    });
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================

// Throttle para performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Debounce para performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Notificação
function showNotification(message, type = 'info') {
    // Verificar se já existe notificação
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'polite');
    
    const icon = type === 'success' ? 'check-circle' : 'exclamation-circle';
    
    notification.innerHTML = `
        <i class="fas fa-${icon}" aria-hidden="true"></i>
        <span>${message}</span>
        <button class="notification-close" aria-label="Fechar notificação">
            <i class="fas fa-times" aria-hidden="true"></i>
        </button>
    `;
    
    // Adicionar estilos
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#f5c6cb'};
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    // Adicionar ao body
    document.body.appendChild(notification);
    
    // Botão de fechar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Remover automaticamente
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, CONFIG.notificationDuration);
    
    // Adicionar keyframes CSS
    addNotificationStyles();
}

function addNotificationStyles() {
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOut {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

// ============================================
// INICIALIZAÇÃO COMPLETA
// ============================================
window.addEventListener('load', function() {
    // Remover classe de loading se existir
    document.body.classList.remove('loading');
    
    // Configurar timeout para garantir carregamento
    setTimeout(() => {
        console.log('🌐 Site completamente carregado');
        console.log('🎉 Patrick Sonata - Site pronto!');
        console.log('👉 Acesse: https://patricksonata.com.br');
        
        // Mostrar notificação de boas-vindas (opcional)
        // showNotification('Bem-vindo ao site de Patrick Sonata!', 'success');
    }, 500);
});

// ============================================
// ERROR HANDLING
// ============================================
window.addEventListener('error', function(e) {
    console.error('❌ Erro no site:', e.error);
    
    // Notificar erro de forma amigável
    if (e.error && e.error.message && e.error.message.includes('failed')) {
        showNotification('Ocorreu um erro ao carregar alguns recursos. Recarregue a página.', 'error');
    }
});

// ============================================
// SERVICE WORKER (opcional futuro)
// ============================================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js').then(function(registration) {
            console.log('⚡ ServiceWorker registrado com sucesso:', registration.scope);
        }, function(err) {
            console.log('❌ Falha no registro do ServiceWorker:', err);
        });
    });
}