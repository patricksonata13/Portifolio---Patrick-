const textDisplay = document.getElementById('text-display');
const choicesContainer = document.getElementById('choices-container');
const visualDisplay = document.getElementById('visual-display');

let player = {
    hp: 80, // Começa um pouco ferido para testar o café
    creditos: 100,
    inventario: [],
    integridadeMoto: 70,
    xp: 0,
    level: 1
};

let isTyping = false;

function updateHUD(npcKey = null) {
    let visualHTML = `
        <div class="stat-bar">
            LVL: ${player.level} | XP: ${player.xp}/100 | HP: ${player.hp}% | MOTO: ${player.integridadeMoto}% | $: ${player.creditos}
        </div>
        <div id="inventory-display">
            <b>MOCHILA:</b><br>
            ${player.inventario.length > 0 ? player.inventario.join('<br>') : '[ VAZIA ]'}
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
        text: "Estás diante do 'Neon-Brew', um café iluminado por luzes violetas. O cheiro de café sintético mistura-se com o ozono da rua.",
        npc: "vendedor-cafe",
        choices: [
            { text: "Comprar Café (10$)", next: "comprar_cafe", condition: () => player.creditos >= 10 },
            { text: "Comprar Kit Reparo (25$)", next: "comprar_kit", condition: () => player.creditos >= 25 },
            { text: "Sair para o Setor 7", next: "setor7" }
        ]
    },
    comprar_cafe: {
        text: "Kaito-San serve o café fumegante. Sentas-te por um momento. HP recuperado!",
        action: () => { 
            player.creditos -= 10;
            player.hp = Math.min(100, player.hp + 20);
        },
        choices: [{ text: "Voltar ao balcão", next: "start" }]
    },
    comprar_kit: {
        text: "Usas os nano-bots para selar as rachaduras na fuselagem da moto. O ronco parece mais limpo.",
        action: () => {
            player.creditos -= 25;
            player.integridadeMoto = Math.min(100, player.integridadeMoto + 30);
        },
        choices: [{ text: "Voltar ao balcão", next: "start" }]
    },
    setor7: {
        text: "A estrada aberta chama. A música Phonk aumenta no teu sistema neural.",
        choices: [{ text: "Acelerar", next: "start" }]
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
