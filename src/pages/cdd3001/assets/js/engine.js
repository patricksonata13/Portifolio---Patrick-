const textDisplay = document.getElementById('text-display');
const choicesContainer = document.getElementById('choices-container');
const visualDisplay = document.getElementById('visual-display');

// Carrega dados ou inicia novo
let player = JSON.parse(localStorage.getItem('cdd3001_player_state')) || {
    hp: 100,
    creditos: 100,
    inventario: [],
    integridadeMoto: 100,
    xp: 0,
    level: 1,
    missaoAtiva: false,
    currentNode: 'start',
    corAtual: '#00ff41'
};

let isTyping = false;

function saveGame(node) {
    player.currentNode = node;
    localStorage.setItem('cdd3001_player_state', JSON.stringify(player));
}

function toggleAlert(status) {
    if (status) document.body.classList.add('alert-mode');
    else document.body.classList.remove('alert-mode');
}

function updateHUD(npcKey = null) {
    document.documentElement.style.setProperty('--moto-color', player.corAtual);
    
    let visualHTML = `
        <div class="stat-bar">
            LVL: ${player.level} | HP: ${player.hp}% | $: ${player.creditos}
        </div>
        <div id="inventory-display">
            <b>STATUS:</b> ${player.missaoAtiva ? '⚠️ ALERTA' : 'OFFLINE'}<br>
            ${player.inventario.join(', ') || 'Sem itens'}
        </div>
        <div class="moto-container">
            <div class="moto-sprite" style="opacity: ${player.isGhost ? '0.4' : '1'}"></div>
        </div>
    `;

    if (npcKey && NPC_DB[npcKey]) {
        const npc = NPC_DB[npcKey];
        visualHTML += `
            <div style="position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,0.8); border:1px solid ${npc.cor}; padding:10px; width:150px; font-size:11px; border-radius:5px; z-index:3;">
                <b style="color:${npc.cor}">${npc.avatar} ${npc.nome}</b><br>
                <small>${npc.classe}</small>
            </div>
        `;
    }
    visualDisplay.innerHTML = visualHTML;
}

// ... (O objeto 'story' permanece o mesmo que definimos anteriormente) ...
const story = {
    start: {
        text: "Bem-vindo de volta à Cidade de Deus 3001, Patrick. Os sistemas estão online.",
        npc: "m-thuza",
        choices: [
            { text: "Iniciar Patrulha", next: "patrulha" },
            { text: "Ir ao Café", next: "cafe" }
        ]
    },
    patrulha: {
        text: "As luzes neon refletem no asfalto molhado. O radar indica movimento no Setor Norte.",
        choices: [{ text: "Investigar", next: "missao_iniciada" }]
    },
    // Adicione aqui as outras cenas que criamos (missao_iniciada, cafe, etc)
};

function loadStory(node) {
    if (isTyping) return;
    const scene = story[node] || story['start'];
    
    if (scene.action) scene.action();
    
    saveGame(node); // Salva o progresso no localStorage
    updateHUD(scene.npc);
    
    isTyping = true;
    textDisplay.innerHTML = "";
    let i = 0;
    const interval = setInterval(() => {
        textDisplay.innerHTML += scene.text.charAt(i);
        i++;
        if (i >= scene.text.length) {
            clearInterval(interval);
            isTyping = false;
        }
    }, 25);

    choicesContainer.innerHTML = '';
    scene.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerText = `> ${choice.text}`;
        btn.className = 'choice-btn';
        btn.onclick = () => loadStory(choice.next);
        choicesContainer.appendChild(btn);
    });
}

// Inicia de onde parou
loadStory(player.currentNode);
