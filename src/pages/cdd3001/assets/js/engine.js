const textDisplay = document.getElementById('text-display');
const choicesContainer = document.getElementById('choices-container');
const visualDisplay = document.getElementById('visual-display');

let player = {
    hp: 100,
    creditos: 50,
    inventario: []
};

let isTyping = false;

function updateHUD(npcKey = null) {
    let visualHTML = `
        <div class="stat-bar">HP: ${player.hp}% | CRED: ${player.creditos}</div>
        <div id="inventory-display">
            <b>INVENTÁRIO:</b><br>
            ${player.inventario.length > 0 ? player.inventario.join('<br>') : '[ VAZIO ]'}
        </div>
        <div class="moto-container">
            <div class="moto-sprite"></div>
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
        text: "As luzes de mercúrio da CDD 3001 piscam. M-THUZA te entrega um chip estranho. 'Isso é um Cyber-Deck pirata, Patrick. Use com cuidado.'",
        npc: "m-thuza",
        action: () => { 
            if(!player.inventario.includes("Cyber-Deck")) player.inventario.push("Cyber-Deck");
        },
        choices: [
            { text: "Seguir para o Posto Policial", next: "bloqueio" }
        ]
    },
    bloqueio: {
        text: "A milícia te para. O guarda checa sua placa. Se você tivesse uma ferramenta, poderia invadir o sistema dele...",
        npc: "guarda-milicia",
        choices: [
            { text: "Tentar Hackear (Requer Deck)", next: "hack_sucesso", condition: () => player.inventario.includes("Cyber-Deck") },
            { text: "Pagar propina (30 cred)", next: "start", condition: () => player.creditos >= 30 }
        ]
    },
    hack_sucesso: {
        text: "SISTEMA INVASO. O guarda fica confuso enquanto as luzes da armadura dele piscam em rosa. Você passa rindo.",
        choices: [
            { text: "Acelerar para a Vitória", next: "start" }
        ]
    }
};

function loadStory(node) {
    if (isTyping) return;
    const scene = story[node];
    if (scene.action) scene.action();
    updateHUD(scene.npc);
    
    // Typewriter
    isTyping = true;
    textDisplay.innerHTML = "";
    choicesContainer.style.display = "none";
    let i = 0;
    const interval = setInterval(() => {
        textDisplay.innerHTML += scene.text.charAt(i);
        i++;
        if (i >= scene.text.length) {
            clearInterval(interval);
            isTyping = false;
            choicesContainer.style.display = "flex";
        }
    }, 30);

    choicesContainer.innerHTML = '';
    scene.choices.forEach(choice => {
        // Só mostra a opção se a condição for verdadeira ou se não houver condição
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
