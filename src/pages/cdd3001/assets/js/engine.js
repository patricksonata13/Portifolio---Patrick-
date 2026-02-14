const textDisplay = document.getElementById('text-display');
const choicesContainer = document.getElementById('choices-container');
const visualDisplay = document.getElementById('visual-display');

let player = {
    hp: 100,
    creditos: 50,
    inventario: [],
    integridadeMoto: 100
};

let isTyping = false;

function updateHUD(npcKey = null) {
    let visualHTML = `
        <div class="stat-bar">
            HP: ${player.hp}% | MOTO: ${player.integridadeMoto}% | CRED: ${player.creditos}
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
        text: "O ronco da sua moto ecoa pelo viaduto. O sistema detecta um drone de combate da milícia aproximando-se por trás!",
        choices: [
            { text: "Tentar Esquiva Brusca", next: "esquiva" },
            { text: "Acelerar Tudo", next: "dano" }
        ]
    },
    esquiva: {
        text: "Você inclina a moto quase tocando o asfalto. O tiro de plasma passa por cima! Sucesso.",
        action: () => { player.creditos += 5; },
        choices: [{ text: "Continuar", next: "start" }]
    },
    dano: {
        text: "O drone atinge a traseira da moto! A fuselagem solta faíscas.",
        action: () => { player.integridadeMoto -= 25; },
        choices: [{ text: "Reparar no próximo Deck", next: "start" }]
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
