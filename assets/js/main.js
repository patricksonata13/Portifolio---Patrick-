document.addEventListener('DOMContentLoaded', () => {
    if (window.db) {
        if (document.getElementById('content-sobre')) {
            document.getElementById('content-sobre').innerHTML = window.db.sobre.text;
        }
        if (document.getElementById('content-perfil')) {
            document.getElementById('content-perfil').innerHTML = window.db.perfil.text;
        }
    }
});

let currentSlide = 0;

function openTab(id) {
    const data = window.db[id];
    if (!data) return;

    const title = document.getElementById('tab-title');
    const text = document.getElementById('tab-text');
    const panel = document.getElementById('side-panel');
    const track = document.getElementById('carousel-track');
    const carouselContainer = document.getElementById('carousel-container');

    title.innerText = data.title;

    // LÓGICA PARA A ABA TRABALHO (CARROSSEL)
    if (id === 'trabalho' && data.projects) {
        carouselContainer.style.display = 'block';
        text.innerHTML = ""; // Limpa o texto padrão para dar foco às imagens
        
        // Monta os slides com as capas dos projetos
        track.innerHTML = data.projects.map(proj => `
            <div class="carousel-item">
                <img src="${proj.cover}" alt="${proj.title}">
                <div class="project-overlay">
                    <div style="font-size: 18px; font-weight: bold;">${proj.title}</div>
                    <div style="font-size: 12px; color: #ccc;">${proj.role}</div>
                    <div style="font-size: 10px; color: #888; margin-top: 5px;">${proj.info}</div>
                </div>
            </div>
        `).join('');
        
        currentSlide = 0;
        track.style.transform = `translateX(0)`;
    } else {
        // Para as outras abas, esconde o carrossel e mostra o texto
        if(carouselContainer) carouselContainer.style.display = 'none';
        text.innerHTML = data.text || "";
    }

    panel.classList.add('active');
}

function moveCarousel(direction) {
    const track = document.getElementById('carousel-track');
    const slides = document.querySelectorAll('.carousel-item');
    if (slides.length === 0) return;

    currentSlide = (currentSlide + direction + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function closeTab() {
    document.getElementById('side-panel').classList.remove('active');
}