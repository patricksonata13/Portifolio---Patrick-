// ========================================
// GESTOS E NAVEGAÇÃO TIPO APPLE
// ========================================

let touchStartX = 0;
let touchEndX = 0;

// Detectar gesto de voltar (puxar da esquerda)
document.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    // Se puxou da esquerda para direita (gesto de voltar)
    if (touchEndX - touchStartX > 80) {
        // Se um painel estiver aberto, fecha ele
        if (document.getElementById('painel-trabalho').classList.contains('active')) {
            fecharTrabalho();
        } 
        // Senão, volta para home
        else if (window.location.pathname !== '/') {
            window.history.back();
        }
    }
    
    // Se puxou da direita para esquerda (gesto de avançar)
    if (touchStartX - touchEndX > 80) {
        // Se estiver na home, não faz nada
        if (window.location.pathname !== '/') {
            window.history.forward();
        }
    }
}

// Botão de voltar do navegador - fechar painel se aberto
window.addEventListener('popstate', () => {
    const painel = document.getElementById('painel-trabalho');
    if (painel.classList.contains('active')) {
        fecharTrabalho();
        // Impede que a página volte
        window.history.pushState(null, null, window.location.pathname);
    }
});

// Prevenir que o scroll do navegador atrapalhe os gestos
document.body.addEventListener('touchmove', e => {
    if (document.getElementById('painel-trabalho').classList.contains('active')) {
        e.preventDefault();
    }
}, { passive: false });

// Suavizar scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});
