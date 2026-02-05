// ============================================
// JAVASCRIPT COMPLETO - SITE PATRICK SONATA
// Todas as funcionalidades
// ============================================

console.log('🎨 Site Patrick Sonata - Inicializando...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM completamente carregado');
    
    // 1. Menu Mobile
    setupMobileMenu();
    
    // 2. Navegação Suave
    setupSmoothScroll();
    
    // 3. Filtro de Trabalhos
    setupWorksFilter();
    
    // 4. Formulário de Contato
    setupContactForm();
    
    // 5. Botão Voltar ao Topo
    setupBackToTop();
    
    // 6. Atualizar Ano no Footer
    updateCurrentYear();
    
    // 7. Animações ao Scroll
    setupScrollAnimations();
    
    console.log('🚀 Todas funcionalidades configuradas!');
});

// ============================================
// 1. MENU MOBILE
// ============================================
function setupMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
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
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Ativar link no menu
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
                
                // Scroll suave
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                console.log(`📍 Navegando para: ${targetId}`);
            }
        });
    });
    
    console.log('🔗 Navegação suave configurada');
}

// ============================================
// 3. FILTRO DE TRABALHOS
// ============================================
function setupWorksFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const workCards = document.querySelectorAll('.work-card');
    
    if (filterButtons.length === 0 || workCards.length === 0) return;
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover active de todos os botões
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Adicionar active no botão clicado
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filtrar cards
            workCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 100);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
            
            console.log(`🎯 Filtro aplicado: ${filterValue}`);
        });
    });
    
    console.log('🎨 Filtro de trabalhos configurado');
}

// ============================================
// 4. FORMULÁRIO DE CONTATO
// ============================================
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados
            const formData = {
                nome: this.querySelector('input[type="text"]').value,
                email: this.querySelector('input[type="email"]').value,
                assunto: this.querySelectorAll('input[type="text"]')[1].value,
                mensagem: this.querySelector('textarea').value
            };
            
            // Validação
            if (!formData.nome || !formData.email || !formData.mensagem) {
                showNotification('Por favor, preencha todos os campos obrigatórios.', 'error');
                return;
            }
            
            // Simular envio
            console.log('📤 Formulário de contato enviado:', formData);
            showNotification('Mensagem enviada com sucesso! Entrarei em contato em breve.', 'success');
            
            // Limpar formulário
            this.reset();
        });
    }
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            
            if (email) {
                console.log('📰 Newsletter inscrição:', email);
                showNotification('Inscrição realizada com sucesso!', 'success');
                this.reset();
            }
        });
    }
    
    console.log('📝 Formulários configurados');
}

// ============================================
// 5. BOTÃO VOLTAR AO TOPO
// ============================================
function setupBackToTop() {
    const backToTopButton = document.getElementById('backToTop');
    
    if (!backToTopButton) return;
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    console.log('⬆️  Botão voltar ao topo configurado');
}

// ============================================
// 6. ATUALIZAR ANO NO FOOTER
// ============================================
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// ============================================
// 7. ANIMAÇÕES AO SCROLL
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
            }
        });
    }, observerOptions);
    
    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll(
        '.profile-card, .about-content, .work-card, .info-card'
    );
    
    elementsToAnimate.forEach(el => observer.observe(el));
    
    console.log('🎬 Animações ao scroll configuradas');
}

// ============================================
// FUNÇÕES AUXILIARES
// ============================================
function showNotification(message, type = 'info') {
    // Criar elemento de notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Estilos da notificação
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'success' ? '#d4edda' : '#f8d7da'};
        color: ${type === 'success' ? '#155724' : '#721c24'};
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    // Adicionar ao body
    document.body.appendChild(notification);
    
    // Botão de fechar
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Adicionar keyframes CSS para animação
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
    console.log('🌐 Site completamente carregado');
    console.log('🎉 Patrick Sonata - Site pronto!');
    console.log('👉 Acesse: https://patricksonata.com.br');
});
