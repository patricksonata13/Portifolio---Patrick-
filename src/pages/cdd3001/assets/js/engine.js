const textDisplay = document.getElementById('text-display');
const choicesContainer = document.getElementById('choices-container');
const visualDisplay = document.getElementById('visual-display');

let player = {
    hp: 100, creditos: 150, inventario: [], level: 1,
    missõesConcluidas: parseInt(localStorage.getItem('cdd3001_score')) || 0,
    corAtual: localStorage.getItem('cdd3001_color') || '#00ff41'
};

document.documentElement.style.setProperty('--moto-color', player.corAtual);

function createSpeedLines() {
    const container = document.querySelector('.moto-container');
    if (!container) return;
    for (let i = 0; i < 5; i++) {
        let line = document.createElement('div');
        line.className = 'speed-line';
        line.style.width = Math.random() * 100 + 50 + 'px';
        line.style.top = Math.random() * 100 + '%';
        line.style.animationDuration = Math.random() * 0.5 + 0.2 + 's';
        container.appendChild(line);
        setTimeout(() => line.remove(), 700);
    }
}

function updateHUD(npcKey = null) {
    let visualHTML = `
        <div class="stat-bar">HP: ${player.hp}% | $: ${player.creditos} | LVL: ${player.level}</div>
        <div id="high-score">🏆 MISSÕES: ${player.missõesConcluidas}</div>
        <div class="moto-container"><div class="moto-sprite"></div></div>
    `;
    visualDisplay.innerHTML = visualHTML;
    if (npcKey) {
        const npc = NPC_DB[npcKey];
        const npcDiv = document.createElement('div');
        npcDiv.style = `position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,0.8); border:1px solid ${npc.cor}; padding:10px; width:150px; font-size:11px; z-index:5;`;
        npcDiv.innerHTML = `<b style="color:${npc.cor}">${npc.avatar} ${npc.nome}</b><br><small>${npc.classe}</small>`;
        visualDisplay.appendChild(npcDiv);
    }
}

const story = {
    start: {
        text: "M-THUZA intercepta o teu sinal. 'Patrick, os Federais estão a fechar o cerco. Precisamos de uma decisão agora. Vais entregar os códigos ou lutar?'",
        npc: "m-thuza",
        choices: [
            { text: "Entregar (Caminho Diplomático)", next: "final_diplomacia" },
            { text: "Lutar (Caminho Rebelde)", next: "final_rebelde" },
            { text: "Acelerar e fugir de ambos", next: "final_velocidade" }
        ]
    },
    final_diplomacia: {
        text: "Entregas os códigos. A milícia recua, mas M-THUZA corta comunicações contigo. Estás seguro, mas sozinho.",
        choices: [{ text: "Recomeçar jornada", next: "start" }]
    },
    final_rebelde: {
        text: "Tu disparas os propulsores e enfrentas o bloqueio! É um massacre de faíscas. Sobreviveste como uma lenda.",
        action: () => { player.hp -= 40; player.missõesConcluidas += 5; },
        choices: [{ text: "Recomeçar jornada", next: "start" }]
    },
    final_velocidade: {
        text: "Tu não deves nada a ninguém. O asfalto é o teu único mestre. As luzes da cidade tornam-se apenas um borrão neon.",
        action: () => { setInterval(createSpeedLines, 200); },
        choices: [{ text: "Voar baixo", next: "start" }]
    }
};

function loadStory(node) {
    const scene = story[node] || story['start'];
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
