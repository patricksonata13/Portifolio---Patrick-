const textDisplay = document.getElementById('text-display');
const choicesContainer = document.getElementById('choices-container');
const visualDisplay = document.getElementById('visual-display');

let player = {
    hp: 100,
    creditos: 50,
    inventario: [],
    integridadeMoto: 100,
    xp: 0,
    level: 1
};

let isTyping = false;

function ganharXP(qtd) {
    player.xp += qtd;
    if (player.xp >= 100) {
        player.level++;
        player.xp = 0;
        alert(`LEVEL UP! Patrick agora é Nível ${player.level}`);
    }
}

function updateHUD(npcKey = null) {
    let visualHTML = `
        <div class="stat-bar">
            LVL: ${player.level} | XP: ${player.xp}/100 | HP: ${player.hp}% | MOTO: ${player.integridadeMoto}%
        </div>
        <div id="inventory-display">
            <b>INVENTÁRIO:</b><br>
            ${player.inventario.length > 0 ? player.inventario.join('<br>') : '[ VAZIO ]'}
        </div>
        <div class="moto-container">
            <div class="moto-sprite" id="player-moto"></div>
        </div>
    `;

    if (npcKey && NPC_DB[npcKey]) {
        const npc = NPC_DB[npcKey];
        visualHTML += `
            <div style="position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,0.8); border:1px solid ${npc.cor}; padding:10px; width:150px; font-size:12px; border-radius:5px; z-index:3;">
                <b style="color:${npc.cor}">${npc.avatar} ${npc.nome}</b><br>
                <small>${npc.classe}</small>
            </div>
        `;
    }
    visualDisplay.innerHTML = visualHTML;
}

const story = {
    start: {
        text: "O som do Synthwave vindo das colunas neurais da cidade mistura-se com o ronco da tua moto. M-THUZA envia coordenadas de um armazém.",
        npc: "m-thuza",
        choices: [
            { text: "Explorar armazém (+20 XP)", next: "armazem" },
            { text: "Patrulhar as ruas", next: "start" }
        ]
    },
    armazem: {
        text: "Dentro do armazém, encontras peças de reposição e dados antigos. Estás a tornar-te um mestre da zona norte.",
        action: () => { 
            ganharXP(20);
            player.integridadeMoto = Math.min(100, player.integridadeMoto + 10);
        },
        choices: [{ text: "Voltar à estrada", next: "start" }]
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
    }, 30);

    choicesContainer.innerHTML = '';
    scene.choices.forEach(choice => {
        const btn = document.createElement('button');
        btn.innerText = `> ${choice.text}`;
        btn.className = 'choice-btn';
        btn.onclick = () => {
            if (typeof playEngineSound === "function") playEngineSound();
            loadStory(choice.next);
        };
        choicesContainer.appendChild(btn);
    });
}

loadStory('start');
