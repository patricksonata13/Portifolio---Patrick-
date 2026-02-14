const textDisplay = document.getElementById('text-display');
const choicesContainer = document.getElementById('choices-container');
const visualDisplay = document.getElementById('visual-display');

let player = {
    hp: 100,
    creditos: 50,
    inventario: []
};

function updateHUD(npcKey = null) {
    let visualHTML = `
        <div class="stat-bar">HP: ${player.hp}% | CRED: ${player.creditos}</div>
        <div class="moto-container">
            <div class="moto-sprite"></div>
        </div>
    `;

    // Se houver um NPC na cena, exibe o card dele
    if (npcKey && NPC_DB[npcKey]) {
        const npc = NPC_DB[npcKey];
        visualHTML += `
            <div style="position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,0.8); border:1px solid ${npc.cor}; padding:10px; width:150px; font-size:12px;">
                <b style="color:${npc.cor}">${npc.avatar} ${npc.nome}</b><br>
                <small>${npc.classe}</small>
            </div>
        `;
    }
    visualDisplay.innerHTML = visualHTML;
}

const story = {
    start: {
        text: "O asfalto brilha com o reflexo dos neons. Você vê uma figura encapuzada na esquina.",
        npc: "m-thuza",
        choices: [
            { text: "Falar com M-THUZA", next: "conversa_m" },
            { text: "Ignorar e seguir", next: "bloqueio" }
        ]
    },
    conversa_m: {
        text: "'Patrick, os dados que você pegou no Patika... eles são a chave para derrubar o firewall da cidade.'",
        npc: "m-thuza",
        choices: [
            { text: "Entregar os dados", next: "start" },
            { text: "Pedir créditos em troca", next: "suborno" }
        ]
    },
    bloqueio: {
        text: "Um guarda bloqueia seu caminho. 'Documentos ou créditos, lixo eletrônico.'",
        npc: "guarda-milicia",
        action: () => { player.hp -= 5; },
        choices: [
            { text: "Pagar", next: "start" }
        ]
    }
};

function loadStory(node) {
    const scene = story[node];
    if (scene.action) scene.action();
    
    updateHUD(scene.npc);
    
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
