// JavaScript para site Patrick Sonata
console.log('🚀 Site Patrick Sonata inicializado');

document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM carregado');
    
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
    
    // Formulário
    const form = document.querySelector('.form-contato');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Obrigado pela mensagem! Entrarei em contato em breve.');
            this.reset();
        });
    }
    
    // Log de imagens
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            console.log('✅ Imagem carregada:', this.alt || this.src);
        });
        img.addEventListener('error', function() {
            console.warn('❌ Erro ao carregar imagem:', this.src);
        });
    });
});

// Adicionar ano atual no footer
window.addEventListener('load', function() {
    const year = new Date().getFullYear();
    const yearElement = document.querySelector('footer p');
    if (yearElement && yearElement.textContent.includes('2024')) {
        yearElement.textContent = yearElement.textContent.replace('2024', year);
    }
});
