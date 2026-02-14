const textDisplay = document.getElementById('text-display');
const choicesContainer = document.getElementById('choices-container');
const visualDisplay = document.getElementById('visual-display');

let player = {
    hp: 100,
    creditos: 150,
    inventario: [],
    integridadeMoto: 100,
    missõesConcluidas: parseInt(localStorage.getItem('cdd3001_score')) || 0,
    corAtual: localStorage.getItem('cdd3001_color') || '#00ff41'
};

document.documentElement.style.setProperty('--moto-color', player.corAtual);

function salvarProgresso() {
    localStorage.setItem('cdd3001_score', player.missõesConcluidas);
    localStorage.setItem('cdd3001_color', player.corAtual);
}

function updateHUD(npcKey = null) {
    let visualHTML = `
        <div class="stat-bar">HP: ${player.hp}% | MOTO: ${player.integridadeMoto}% | $: ${player.creditos}</div>
        <div id="high-score">🏆 MISSÕES: ${player.missõesConcluidas}</div>
        <div id="inventory-display"><b>DECK:</b> ${player.inventario.join(', ') || 'Vazio'}</div>
        <div class="moto-container"><div class="moto-sprite"></div></div>
    `;
    if (npcKey && NPC_DB[npcKey]) {
        const npc = NPC_DB[npcKey];
        visualHTML += `<div style="position:absolute; bottom:10px; right:10px; background:rgba(0,0,0,0.8); border:1px solid ${npc.cor}; padding:10px; width:150px; font-size:11px; border-radius:5px;">
            <b style="color:${npc.cor}">${npc.avatar} ${npc.nome}</b><br><small>${npc.classe}</small>
        </div>`;
    }
    visualDisplay.innerHTML = visualHTML;
}

const story = {
    start: {
        text: "Bem-vindo à Garagem de Personalização. O que pretendes fazer com a tua máquina?",
        choices: [
            { text: "Pintar de Azul Cyan (50$)", action: () => mudarCor('#00ffff') },
            { text: "Pintar de Rosa Neon (50$)", action: () => mudarCor('#ff00ff') },
            { text: "Aceitar Missão de Entrega", next: "missao" },
            { text: "Sair", next: "start" }
        ]
    },
    missao: {
        text: "Entrega os dados no Setor Sul. Cuidado com os radares!",
        choices: [{ text: "Completar Missão", next: "sucesso" }]
    },
    sucesso: {
        text: "Missão cumprida! Mais um contrato para o portfólio.",
        action: () => { 
            player.missõesConcluidas++; 
            player.creditos += 60;
            salvarProgresso();
        },
        choices: [{ text: "Voltar", next: "start" }]
    }
};

function mudarCor(cor) {
    if (player.creditos >= 50) {
        player.creditos -= 50;
        player.corAtual = cor;
        document.documentElement.style.setProperty('--moto-color', cor);
        salvarProgresso();
        alert("Pintura aplicada!");
    } else {
        alert("Créditos insuficientes!");
    }
}

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
