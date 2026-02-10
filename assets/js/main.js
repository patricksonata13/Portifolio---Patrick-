document.addEventListener('DOMContentLoaded', () => {
    if (window.db) {
        if (document.getElementById('content-sobre')) {
            document.getElementById('content-sobre').innerHTML = window.db.sobre.text || "";
        }
        if (document.getElementById('content-perfil')) {
            document.getElementById('content-perfil').innerHTML = window.db.perfil.text || "";
        }
    }
});

let currentSlide = 0;

function openTab(id) {
    const data = window.db ? window.db[id] : null;
    if (!data) return;

    const title = document.getElementById('tab-title');
    const text = document.getElementById('tab-text');
    const panel = document.getElementById('side-panel');
    const track = document.getElementById('carousel-track');
    const carouselContainer = document.getElementById('carousel-container');

    if (title) title.innerText = data.title;
    if (panel) panel.classList.add('active');

    // Se for Trabalho e tiver projetos, monta o carrossel
    if (id === 'trabalho' && data.projects && track && carouselContainer) {
        carouselContainer.style.display = 'block';
        if (text) text.innerHTML = ""; 
        
        track.innerHTML = data.projects.map(proj => `
            <div class="carousel-item">
                <img src="${proj.cover}" alt="${proj.title}" onerror="this.src='https://via.placeholder.com/400x600?text=Imagem+Nao+Encontrada'">
                <div class="project-overlay">
                    <div style="font-size: 16px; font-weight: bold; color: #fff;">${proj.title}</div>
                    <div style="font-size: 11px; color: #aaa; text-transform: uppercase;">${proj.role}</div>
                </div>
            </div>
        `).join('');
        
        currentSlide = 0;
        track.style.transform = `translateX(0)`;
    } else {
        // Para outras abas ou se falhar, esconde carrossel e mostra texto
        if (carouselContainer) carouselContainer.style.display = 'none';
        if (text) text.innerHTML = data.text || "";
    }
}

function moveCarousel(direction) {
    const track = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.carousel-item');
    if (!track || slides.length === 0) return;

    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function closeTab() {
    const panel = document.getElementById('side-panel');
    if (panel) panel.classList.remove('active');
}