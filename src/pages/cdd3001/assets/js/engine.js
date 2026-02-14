const textDisplay = document.getElementById('text-display');
const choicesContainer = document.getElementById('choices-container');
const visualDisplay = document.getElementById('visual-display');

// Status Inicial do Patrick
let player = {
    hp: 100,
    creditos: 50,
    implante: "Neural Link v1"
};

function updateHUD() {
    visualDisplay.innerHTML = `
        <div class="stat-bar">HP: ${player.hp}% | CRED: ${player.creditos} | ${player.implante}</div>
        <div class="moto-container">
            <div class="moto-sprite"></div>
        </div>
    `;
}

const story = {
    start: {
        text: "ANO 3001. A chuva ácida queima o metal da sua moto. O radar indica uma patrulha à frente. Seus créditos estão baixos.",
        choices: [
            { text: "Acelerar e furar o bloqueio", next: "bloqueio" },
            { text: "Tentar subornar o guarda (20 cred)", next: "suborno" }
        ]
    },
    bloqueio: {
        text: "Você acelera! Balas de plasma passam raspando. Você escapou, mas a moto sofreu danos.",
        action: () => { player.hp -= 20; },
        choices: [
            { text: "Continuar fugindo", next: "start" }
        ]
    },
    suborno: {
        text: "O guarda aceita os créditos. 'Passe logo, Sonata. Antes que eu mude de ideia.'",
        action: () => { player.creditos -= 20; },
        choices: [
            { text: "Seguir para o centro", next: "start" }
        ]
    }
};

function loadStory(node) {
    const scene = story[node];
    
    // Executa ação da cena se existir
    if (scene.action) scene.action();
    
    updateHUD();
    
    // Efeito de digitação simples
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
