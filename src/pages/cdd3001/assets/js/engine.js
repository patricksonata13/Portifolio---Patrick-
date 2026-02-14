const textDisplay = document.getElementById('text-display');
const choicesContainer = document.getElementById('choices-container');
const visualDisplay = document.getElementById('visual-display');

let player = {
    hp: 100,
    creditos: 50,
    inventario: []
};

// Configurações do efeito de digitação
let isTyping = false;
const typingSpeed = 30; // milissegundos por letra

function typeWriter(text, i = 0) {
    if (i === 0) {
        isTyping = true;
        textDisplay.innerHTML = "";
        choicesContainer.style.display = "none"; // Esconde opções enquanto digita
    }

    if (i < text.length) {
        textDisplay.innerHTML += text.charAt(i);
        setTimeout(() => typeWriter(text, i + 1), typingSpeed);
    } else {
        isTyping = false;
        choicesContainer.style.display = "flex"; // Mostra opções ao terminar
    }
}

function updateHUD(npcKey = null) {
    let visualHTML = `
        <div class="stat-bar">HP: ${player.hp}% | CRED: ${player.creditos}</div>
        <div class="moto-container">
            <div class="moto-sprite"></div>
        </div>
    `;

    if (npcKey && NPC_DB[npcKey]) {
        const npc = NPC_DB[npcKey];
        visualHTML += `
            <div style="position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,0.8); border:1px solid ${npc.cor}; padding:10px; width:150px; font-size:12px; border-radius:5px;">
                <b style="color:${npc.cor}">${npc.avatar} ${npc.nome}</b><br>
                <small>${npc.classe}</small>
            </div>
        `;
    }
    visualDisplay.innerHTML = visualHTML;
}

const story = {
    start: {
        text: "ANO 3001. A fumaça neon sobe dos bueiros. Você sente a vibração do motor entre suas pernas. M-THUZA está esperando no beco.",
        npc: "m-thuza",
        choices: [
            { text: "Aproximar-se da sombra", next: "conversa_m" },
            { text: "Seguir direto para as torres", next: "bloqueio" }
        ]
    },
    conversa_m: {
        text: "'Você demorou, Patrick. O arquivo que você gerou no Patika é pesado demais para um deck comum. Precisamos de mais RAM.'",
        npc: "m-thuza",
        choices: [
            { text: "Entregar unidade de dados", next: "setor7" },
            { text: "Sair sem dizer nada", next: "start" }
        ]
    },
    bloqueio: {
        text: "Uma sirene ecoa. A milícia cibernética detectou sua assinatura de calor. 'Pare o veículo agora!'",
        npc: "guarda-milicia",
        action: () => { player.hp -= 10; },
        choices: [
            { text: "Tentar fuga em alta velocidade", next: "start" }
        ]
    }
};

function loadStory(node) {
    if (isTyping) return; // Impede pular a animação clicando rápido
    
    const scene = story[node];
    if (scene.action) scene.action();
    
    updateHUD(scene.npc);
    typeWriter(scene.text);
    
    choicesContainer.innerHTML = '';
    scene.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerText = `> ${choice.text}`;
        btn.className = 'choice-btn';
        btn.onclick = () => loadStory(choice.next);
        choicesContainer.appendChild(btn);
    });
}

// Inicializa o jogo
loadStory('start');
