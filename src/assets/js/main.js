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
// ========================================
// FUNÇÃO VOLTAR HOME - LOGO P
// ========================================
function voltarHome() {
    // Fecha painel se estiver aberto
    const panel = document.getElementById('side-panel');
    if (panel) panel.classList.remove('active');
    
    // Esconde seções Sobre e Perfil
    const sobre = document.getElementById('secao-sobre');
    const perfil = document.getElementById('secao-perfil');
    if (sobre) sobre.style.display = 'none';
    if (perfil) perfil.style.display = 'none';
    
    // Volta para o início (recarrega a página)
    window.location.href = '/';
}
// ========================================
// NAVEGAÇÃO PROFISSIONAL - VOLTAR AO PERFIL
// ========================================
function voltarParaPerfil() {
    
    // 1. FECHA O PAINEL DO TRABALHO SE ESTIVER ABERTO
    const painelTrabalho = document.getElementById('side-panel');
    if (painelTrabalho) {
        painelTrabalho.classList.remove('active');
    }
    
    // 2. ESCONDE AS SEÇÕES SOBRE E PERFIL
    const secaoSobre = document.getElementById('secao-sobre');
    const secaoPerfil = document.getElementById('secao-perfil');
    
    if (secaoSobre) {
        secaoSobre.style.display = 'none';
    }
    
    if (secaoPerfil) {
        secaoPerfil.style.display = 'none';
    }
    
    // 3. ROLA SUAVEMENTE PARA O TOPO (PERFIL)
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // 4. ATUALIZA A URL SEM RECARREGAR A PÁGINA
    if (window.history) {
        window.history.pushState({}, 'Perfil', '/');
    }
    
    console.log('🏠 Voltou ao perfil');
}

// ========================================
// TAMBÉM FUNCIONA COM O BOTÃO VOLTAR DO NAVEGADOR
// ========================================
window.addEventListener('popstate', function() {
    voltarParaPerfil();
});
