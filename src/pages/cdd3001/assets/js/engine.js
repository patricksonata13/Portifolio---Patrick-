const textDisplay = document.getElementById('text-display');
const choicesContainer = document.getElementById('choices-container');
const visualDisplay = document.getElementById('visual-display');

let player = {
    hp: 100,
    creditos: 100,
    inventario: [],
    integridadeMoto: 100,
    xp: 0,
    missaoAtiva: false
};

let isTyping = false;

function toggleAlert(status) {
    if (status) document.body.classList.add('alert-mode');
    else document.body.classList.remove('alert-mode');
}

function updateHUD(npcKey = null) {
    let visualHTML = `
        <div class="stat-bar">
            XP: ${player.xp} | HP: ${player.hp}% | MOTO: ${player.integridadeMoto}% | $: ${player.creditos}
        </div>
        <div id="inventory-display">
            <b>${player.missaoAtiva ? '⚠️ EM MISSÃO' : 'DISPONÍVEL'}</b><br>
            ${player.inventario.join('<br>')}
        </div>
        <div class="moto-container">
            <div class="moto-sprite"></div>
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

const story = {
    start: {
        text: "M-THUZA conecta-se ao teu rádio: 'Patrick, tenho um pacote de dados que precisa chegar ao Setor Norte. A milícia está à caça. Aceitas?'",
        npc: "m-thuza",
        choices: [
            { text: "Aceitar Contrato (50$)", next: "missao_iniciada", condition: () => !player.missaoAtiva },
            { text: "Recusar e ir ao Café", next: "cafe" }
        ]
    },
    missao_iniciada: {
        text: "PACOTE RECEBIDO. As sirenes começam a tocar ao longe. A cidade ficou vermelha. ACELERA!",
        action: () => {
            player.missaoAtiva = true;
            player.inventario.push("Dados Criptografados");
            toggleAlert(true);
        },
        choices: [{ text: "Cortar caminho pelos becos", next: "perigo" }]
    },
    perigo: {
        text: "Um drone de patrulha aparece! Ele tenta bloquear a passagem.",
        choices: [
            { text: "Dar um drift arriscado", next: "entrega_final" },
            { text: "Atravessar o drone (Dano)", next: "dano_missao" }
        ]
    },
    dano_missao: {
        text: "Bates no drone, mas continuas em frente. A moto está a fumegar!",
        action: () => { player.integridadeMoto -= 40; },
        choices: [{ text: "Seguir para o ponto de entrega", next: "entrega_final" }]
    },
    entrega_final: {
        text: "Consegues entregar os dados no ponto cego do radar. O alerta termina. Recebeste a recompensa!",
        action: () => {
            player.missaoAtiva = false;
            player.inventario = player.inventario.filter(i => i !== "Dados Criptografados");
            player.creditos += 50;
            player.xp += 30;
            toggleAlert(false);
        },
        choices: [{ text: "Voltar para a base", next: "start" }]
    },
    cafe: {
        text: "Decides que hoje não é dia de correr riscos.",
        choices: [{ text: "Voltar", next: "start" }]
    }
};

function loadStory(node) {
    if (isTyping) return;
    const scene = story[node];
    if (scene.action) scene.action();
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
        if (!choice.condition || choice.condition()) {
            const btn = document.createElement('button');
            btn.innerText = `> ${choice.text}`;
            btn.className = 'choice-btn';
            btn.onclick = () => loadStory(choice.next);
            choicesContainer.appendChild(btn);
        }
    });
}

loadStory('start');
