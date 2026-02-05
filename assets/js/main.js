// ======================
// SITE PATRICK SONATA
// JavaScript Principal
// ======================

console.log('🚀 Site Patrick Sonata - JavaScript inicializado');

// Configurar quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM carregado');
    
    // Configurar funcionalidades
    setupMenu();
    setupForms();
    setupAnimations();
    setupImageLoading();
});

// ======================
// FUNÇÕES PRINCIPAIS
// ======================

/**
 * Configura menu de navegação
 */
function setupMenu() {
    console.log('🔗 Configurando menu...');
    
    // Navegação suave
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Menu responsivo (se houver)
    const menuToggle = document.querySelector('.menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            document.querySelector('.nav-menu').classList.toggle('active');
        });
    }
}

/**
 * Configura formulários
 */
function setupForms() {
    console.log('📝 Configurando formulários...');
    
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Coletar dados
            const formData = {};
            const inputs = this.querySelectorAll('input, textarea');
            
            inputs.forEach(input => {
                if (input.name) {
                    formData[input.name] = input.value;
                }
            });
            
            console.log('Formulário enviado:', formData);
            
            // Feedback
            alert('Obrigado pela mensagem! Em breve entrarei em contato.');
            
            // Limpar
            this.reset();
        });
    });
}

/**
 * Configura animações
 */
function setupAnimations() {
    console.log('🎨 Configurando animações...');
    
    // Adicionar classe quando carregado
    document.body.classList.add('loaded');
    
    // Animar elementos ao aparecer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, { threshold: 0.1 });
    
    // Elementos para animar
    const elementsToAnimate = document.querySelectorAll(
        '.work-card, .skill-item, .stat, section'
    );
    
    elementsToAnimate.forEach(el => observer.observe(el));
}

/**
 * Configura carregamento de imagens
 */
function setupImageLoading() {
    console.log('🖼️ Configurando imagens...');
    
    document.querySelectorAll('img').forEach(img => {
        // Log quando carregar
        img.addEventListener('load', function() {
            console.log(`✅ Imagem carregada: ${this.alt || this.src}`);
        });
        
        // Fallback para erro
        img.addEventListener('error', function() {
            console.warn(`❌ Erro ao carregar: ${this.src}`);
            this.style.opacity = '0.5';
        });
    });
}

/**
 * Atualiza footer com ano atual
 */
function updateFooterYear() {
    const footer = document.querySelector('footer');
    if (footer) {
        const year = new Date().getFullYear();
        const yearSpan = footer.querySelector('.current-year');
        if (yearSpan) {
            yearSpan.textContent = year;
        }
    }
}

// ======================
// FUNÇÕES UTILITÁRIAS
// ======================

/**
 * Verifica se é mobile
 */
function isMobile() {
    return window.innerWidth <= 768;
}

/**
 * Formata data
 */
function formatDate(date = new Date()) {
    return date.toLocaleDateString('pt-BR');
}

// ======================
// INICIALIZAÇÃO FINAL
// ======================

// Atualizar footer quando tudo carregar
window.addEventListener('load', function() {
    updateFooterYear();
    console.log('🏁 Site completamente carregado');
    console.log(`📱 Dispositivo: ${isMobile() ? 'Mobile' : 'Desktop'}`);
});

// ======================
// EXPORT PARA TESTES
// ======================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setupMenu,
        setupForms,
        setupAnimations,
        setupImageLoading,
        isMobile,
        formatDate
    };
}
