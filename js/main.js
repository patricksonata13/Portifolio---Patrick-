// Patrick Sonata - Main JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Menu mobile toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Lazy loading de imagens
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    console.log('🎭 Patrick Sonata Portfolio loaded');
});
// Função para abrir o painel com o efeito de desfoque (Blur)
function openTab(abaId) {
    const panel = document.getElementById('side-panel');
    const mainWrapper = document.getElementById('main-wrapper'); // O container principal do seu site
    const content = window.db[abaId];

    if (content) {
        // Insere o conteúdo no painel
        const panelBody = document.getElementById('panel-content');
        
        // Se for SOBRE ou PERFIL, aplica a classe de roteiro
        if (abaId === 'sobre' || abaId === 'perfil') {
            panelBody.innerHTML = `<div class="script-content">${content.text}</div>`;
        } else {
            panelBody.innerHTML = `<h2>${content.title}</h2><p>${content.text}</p>`;
        }

        // Ativa o painel e o desfoque do fundo
        panel.classList.add('active');
        if (mainWrapper) mainWrapper.classList.add('blur');
    }
}

// Função para fechar o painel
function closeTab() {
    const panel = document.getElementById('side-panel');
    const mainWrapper = document.getElementById('main-wrapper');
    
    panel.classList.remove('active');
    if (mainWrapper) mainWrapper.classList.remove('blur');
}