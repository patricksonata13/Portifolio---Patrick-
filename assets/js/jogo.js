const db_afro = {
    'MÃE JUREMA': "MEMÓRIA VIVA: 85 anos. 'Reinventar a vida dói, mas é nossa única tecnologia'.",
    'CAPITÃO RAFA': "ESTRATEGISTA: Ex-fuzileiro. Usa 'Táticas de Favela'. 'A CDD não cai'.",
    'DRA LÍVIA': "MÉDICA DO LIXO: Cura com mofo e oração quântica. 'O Axé fecha a ferida'.",
    'ORIXÁ-TEC': "KAYODÊ: Circuitos de ouro na pele. Fala com máquinas via cânticos Yorubá.",
    'IBEJIS': "AS GÊMEAS: Yemi (Corpo) e Toke (Espírito). Vêem o rastro dos ancestrais.",
    'BARÕES': "FACÇÃO: Controlam a água no Nova América. Relação: Tensa.",
    'QUEIMADOS': "MUTANTES: Vivem no Gramacho. Mestres da reciclagem.",
    'AXÉ': "SISTEMA: Sua força vital. 88% e estável."
};

function processarJogo(cmd) {
    const out = document.getElementById('log-output');
    if(!out) return;
    
    let inputUpper = cmd.toUpperCase().trim();
    let p = document.createElement('p');
    p.style.margin = "8px 0";
    p.style.borderLeft = "2px solid #ffae00";
    p.style.paddingLeft = "8px";

    if (db_afro[inputUpper]) {
        p.innerHTML = `<span style="color:#ffae00">> REGISTRO:</span> ${db_afro[inputUpper]}`;
    } else if (inputUpper === 'HELP' || inputUpper === 'AJUDA') {
        p.innerHTML = `<span style="color:#00ffff">> BIO-SCANNER:</span> Tente 'Mãe Jurema', 'Orixá-Tec' ou 'Barões'.`;
    } else {
        p.innerHTML = `<span style="color:#ff4444">> SIN-417:</span> DNA não identificado. Digite 'HELP'.`;
    }
    
    out.appendChild(p);
    const term = document.getElementById('sin-terminal');
    term.scrollTop = term.scrollHeight;
}

// ALERTA DE MISSÃO AUTOMÁTICO
function dispararMissao() {
    const out = document.getElementById('log-output');
    if (out && !document.getElementById('missao-ativa')) {
        setTimeout(() => {
            let m = document.createElement('p');
            m.id = 'missao-ativa';
            m.style.color = "#ff4444";
            m.style.fontWeight = "bold";
            m.style.animation = "blink 1s infinite";
            m.innerHTML = `⚠️ [ALERTA]: Mãe Jurema solicita sua presença no Muro da Vista. Tropas da Neocorp avançam pelo Canal.`;
            out.appendChild(m);
            document.getElementById('sin-terminal').scrollTop = out.scrollHeight;
        }, 1500);
    }
}

// Escutador para cliques nas subabas ou aba principal
document.addEventListener('click', function(e) {
    // Se clicar em qualquer elemento que abra o conteúdo da CDD
    if (e.target.innerText.includes('CDD') || e.target.id.includes('cdd')) {
        dispararMissao();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.target.id === 'game-input' && e.key === 'Enter') {
        processarJogo(e.target.value);
        e.target.value = '';
    }
});

// Injeção automática de CSS para o alerta piscante
const styleMissao = document.createElement('style');
styleMissao.innerHTML = `
    @keyframes blink {
        0% { opacity: 1; }
        50% { opacity: 0.3; }
        100% { opacity: 1; }
    }
`;
document.head.appendChild(styleMissao);
