const textDisplay = document.getElementById('text-display');
const choicesContainer = document.getElementById('choices-container');
const visualDisplay = document.getElementById('visual-display');

let player = {
    hp: 100, creditos: 150, inventario: [], 
    missõesConcluidas: parseInt(localStorage.getItem('cdd3001_score')) || 0,
    corAtual: localStorage.getItem('cdd3001_color') || '#00ff41',
    isGhost: false
};

// --- SISTEMA DE PASSWORDS ---
window.addEventListener('keydown', (e) => {
    if (e.key === 'p') {
        let code = prompt("INTRODUZ CÓDIGO DE ACESSO NEURAL:");
        if (code === 'SONATA3001') {
            alert("MOTO FANTASMA DESBLOQUEADA! [VELOCIDADE CRÍTICA]");
            player.isGhost = true;
            document.querySelector('.moto-sprite').style.opacity = "0.4";
            setInterval(createSpeedLines, 100);
        }
    }
});

function createSpeedLines() {
    const container = document.querySelector('.moto-container');
    if (!container) return;
    let line = document.createElement('div');
    line.className = 'speed-line';
    line.style.top = Math.random() * 100 + '%';
    line.style.animationDuration = '0.2s';
    container.appendChild(line);
    setTimeout(() => line.remove(), 200);
}

function showCredits() {
    visualDisplay.innerHTML = `<div id="credits-roll">
        <h2 style="color:var(--moto-color)">CDD 3001: RISING</h2>
        <p>Escrito por: Patrick Sonata</p>
        <p>Direção de Arte: Motor CSS Neon</p>
        <p>Banda Sonora: Phonk & Synthwave</p>
        <p>--- OBRIGADO POR JOGAR ---</p>
    </div>`;
    document.getElementById('credits-roll').style.animation = "roll 10s linear forwards";
}

const story = {
    start: {
        text: "A missão final foi concluída. O horizonte da Cidade de Deus 3001 brilha sob a chuva ácida. O que queres fazer agora, Lenda?",
        choices: [
            { text: "Ver Créditos Finais", action: () => showCredits() },
            { text: "Continuar a Patrulhar", next: "patrulha" }
        ]
    },
    patrulha: {
        text: "A estrada é infinita. Prime 'P' para inserir códigos se os tiveres.",
        choices: [{ text: "Voltar", next: "start" }]
    }
};

function loadStory(node) {
    const scene = story[node] || story['start'];
    if (scene.action) scene.action();
    textDisplay.innerText = scene.text;
    choicesContainer.innerHTML = '';
    scene.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerText = `> ${choice.text}`;
        btn.className = 'choice-btn';
        btn.onclick = () => loadStory(choice.next);
        choicesContainer.appendChild(btn);
    });
}

loadStory('start');
