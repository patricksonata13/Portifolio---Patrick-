/**
 * CDD - 3001: MOTOR DE SINCRONIA ANCESTRAL
 * Desenvolvido para o Portfólio Patrick Sonata
 * Sistema: SANKOFA OS
 */

const SISTEMA_3001 = {
    sincronia: 65,
    status: "ESTÁVEL",
    db: {
        'FERRO': {
            nome: "SENTINELA",
            msg: "O SENTINELA: 'O metal que te fere hoje é o mesmo que te acorrentou ontem. O asfalto é novo, mas a guerra é antiga.'",
            cor: "#ffae00"
        },
        'AGUA': {
            nome: "A VELHA",
            msg: "A VELHA: 'Onde você vê esgoto, eu vejo o rio sagrado que foi coberto. O lodo guarda a memória de Jacarepaguá.'",
            cor: "#00ccff"
        },
        'PEDRA': {
            nome: "O JUIZ",
            msg: "O JUIZ: 'A justiça dos homens é de papel, a minha é de granito. Se o Estado corrompe, a rocha esmaga.'",
            cor: "#999999"
        },
        'VENTO': {
            nome: "A MENINA",
            msg: "A MENINA: 'Não corra como quem foge, corra como quem flutua. A Neocorp não pode prender o que ela não vê.'",
            cor: "#00ff41"
        },
        'JUREMA': {
            nome: "MÃE JUREMA",
            msg: "MÃE JUREMA: 'O solo está sangrando, meu filho. Cure o passado para salvar o agora. O tempo é um círculo.'",
            cor: "#ff4444"
        },
        'HELP': {
            nome: "SANKOFA",
            msg: "COMANDOS DISPONÍVEIS: FERRO, AGUA, PEDRA, VENTO, JUREMA. Tente sincronizar um elemento.",
            cor: "#ffffff"
        }
    }
};

/**
 * Processa a lógica de entrada do terminal
 */
function processarJogo(cmd) {
    const out = document.getElementById('log-output');
    const term = document.getElementById('sin-terminal');
    if(!out) return;
    
    let inputUpper = cmd.toUpperCase().trim();
    let p = document.createElement('p');
    
    // Estilização base da linha de resposta
    p.style.cssText = "margin:10px 0; border-left:3px solid #333; padding-left:12px; color:#fff; font-size:13px; font-family:monospace; animation: scanline 0.2s ease-out;";

    if (SISTEMA_3001.db[inputUpper]) {
        const data = SISTEMA_3001.db[inputUpper];
        p.style.borderColor = data.cor;
        p.innerHTML = `<span style="color:${data.cor}; font-weight:bold;">>> ${data.nome}:</span> ${data.msg}`;
        
        // Mecânica de Ganho
        SISTEMA_3001.sincronia = Math.min(100, SISTEMA_3001.sincronia + 7);
    } else {
        // Mecânica de Erro
        p.style.borderColor = "#ff4444";
        p.innerHTML = `<span style="color:#ff4444">> ERRO:</span> Frequência não identificada. Ruído na rede SANKOFA.`;
        SISTEMA_3001.sincronia = Math.max(0, SISTEMA_3001.sincronia - 5);
        
        // Efeito visual de glitch no terminal ao errar
        term.style.animation = "glitch 0.2s infinite";
        setTimeout(() => term.style.animation = "none", 300);
    }
    
    out.appendChild(p);
    atualizarHUD();
    
    // Auto-scroll para o final
    if(term) term.scrollTop = term.scrollHeight;
}

/**
 * Atualiza os indicadores visuais de Sincronia
 */
function atualizarHUD() {
    const hud = document.getElementById('sincronia-val');
    if(!hud) return;

    hud.innerText = SISTEMA_3001.sincronia + "%";
    
    // Muda a cor do HUD dependendo do nível
    if (SISTEMA_3001.sincronia > 80) hud.style.color = "#00ff41";
    else if (SISTEMA_3001.sincronia > 40) hud.style.color = "#ffae00";
    else hud.style.color = "#ff4444";
}

/**
 * Inicializa o terminal com a mensagem da Mãe Jurema
 */
window.iniciarTerminalCDD = function() {
    console.log("Sankofa OS: Booting...");
    setTimeout(() => {
        const out = document.getElementById('log-output');
        if (out && !document.getElementById('alerta-inicial')) {
            const m = document.createElement('div');
            m.id = 'alerta-inicial';
            m.innerHTML = `
                <p style="color:#00ff41; font-size:11px; margin-bottom:5px;">[SISTEMA OPERACIONAL SANKOFA V.3001]</p>
                <p style="color:#ffae00; font-weight:bold; animation:blink 1.2s infinite;">⚠️ ALERTA: Fenda temporal detectada no Setor Jacarepaguá.</p>
                <p style="font-size:11px; color:#888;">Aguardando comando de sincronia (Digite HELP)...</p>
            `;
            out.appendChild(m);
        }
    }, 500);
};

/**
 * Listener Global para o Input
 */
document.addEventListener('keydown', function(e) {
    const input = document.getElementById('game-input');
    if (e.target === input && e.key === 'Enter') {
        const val = input.value;
        if(val.length > 0) {
            processarJogo(val);
            input.value = '';
        }
    }
});

// Estilos dinâmicos para animações de terminal
const styleSheet = document.createElement("style");
styleSheet.innerHTML = `
    @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
    @keyframes glitch { 0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } }
    @keyframes scanline { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
`;
document.head.appendChild(styleSheet);