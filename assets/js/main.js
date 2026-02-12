// ============================================
// PATRICK SONATA - APENAS PORTFÓLIO
// CDD/PATIKA/AULAS abrem como páginas separadas
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Carrega Sobre e Perfil (rolagem na página)
    if (window.db) {
        if (document.getElementById('content-sobre')) {
            document.getElementById('content-sobre').innerHTML = window.db.sobre?.text || "";
        }
        if (document.getElementById('content-perfil')) {
            document.getElementById('content-perfil').innerHTML = window.db.perfil?.text || "";
        }
    }
});

// Função única: ABRE O PAINEL DO PORTFÓLIO
function openTab(id) {
    // Só funciona para TRABALHO e PORTFÓLIO
    if (id !== 'trabalho' && id !== 'portfolio') return;
    
    const data = window.db ? window.db[id] : null;
    if (!data) return;

    const title = document.getElementById('tab-title');
    const text = document.getElementById('tab-text');
    const panel = document.getElementById('side-panel');
    const carouselContainer = document.getElementById('carousel-container');

    if (title) title.innerText = data.title || "TRABALHO";
    if (panel) panel.classList.add('active');
    
    // Esconde carrossel
    if (carouselContainer) carouselContainer.style.display = 'none';

    // CASO 1: TRABALHO - Mostra botão PORTFÓLIO
    if (id === 'trabalho' && data.hasSubmenu) {
        if (text) {
            text.innerHTML = `
                <div class="submenu-buttons">
                    <button onclick="openTab('portfolio')" class="submenu-btn">PORTFÓLIO</button>
                </div>
                <p style="margin-top: 30px; text-align: center; color: #aaa;">${data.text || 'Selecione PORTFÓLIO para ver os projetos.'}</p>
            `;
        }
    }
    
    // CASO 2: PORTFÓLIO - Grade 3x3
    else if (id === 'portfolio' && data.isPortfolio && data.projects) {
        if (text) {
            text.innerHTML = `
                <div class="portfolio-grid">
                    ${data.projects.map(proj => `
                        <div class="portfolio-card">
                            <img src="${proj.cover}" alt="${proj.title}" 
                                onerror="this.src='https://via.placeholder.com/400x400?text=Imagem'">
                            <div class="portfolio-info">
                                <h3>${proj.title}</h3>
                                <div class="portfolio-role">${proj.role}</div>
                                <p>${proj.info}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }
}

// Fecha o painel
function closeTab() {
    const panel = document.getElementById('side-panel');
    if (panel) panel.classList.remove('active');
}

// Função carrossel (mantida para não quebrar)
function moveCarousel(direction) {
    const track = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.carousel-item');
    if (!track || slides.length === 0) return;
    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}
