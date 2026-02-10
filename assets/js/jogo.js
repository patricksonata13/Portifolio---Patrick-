const db_afro = {
    'MÃE JUREMA': "MÃE JUREMA: 'O mundo morreu lá fora, mas aqui a gente reinventou a vida.'",
    'CAPITÃO RAFA': "CAPITÃO RAFA: 'Se a Neocorp vier, vai sangrar no asfalto.'",
    'DRA LÍVIA': "DRA LÍVIA: 'Na CDD, a cura é um ato político.'",
    'ORIXÁ-TEC': "KAYODÊ: 'Não é chip, é axé. As máquinas lembram de quem as construiu.'",
    'BARÕES': "INFO: Barões da Chuva. Controlam a água. Gananciosos, mas necessários.",
    'HELP': "SISTEMA: Digite o nome de um personagem para interceptar mensagens."
};

function processarJogo(cmd) {
    const out = document.getElementById('log-output');
    const term = document.getElementById('sin-terminal');
    if(!out || !term) return;
    
    let inputUpper = cmd.toUpperCase().trim();
    let p = document.createElement('p');
    p.style.cssText = "margin:8px 0; border-left:2px solid #ffae00; padding-left:8px; color:#fff;";

    if (db_afro[inputUpper]) {
        p.innerHTML = `<span style="color:#ffae00">> TRANSMISSÃO:</span> ${db_afro[inputUpper]}`;
    } else {
        p.innerHTML = `<span style="color:#ff4444">> ERRO:</span> Identidade não encontrada.`;
    }
    
    out.appendChild(p);
    term.scrollTop = term.scrollHeight;
}

// Disparador de Missão (Sem loop infinito)
const observer = new MutationObserver(() => {
    const out = document.getElementById('log-output');
    if (out && !document.getElementById('missao-ativa')) {
        setTimeout(() => {
            const m = document.createElement('p');
            m.id = 'missao-ativa';
            m.className = 'blink-text';
            m.style.cssText = "color:#ff4444; font-weight:bold;";
            m.innerHTML = `⚠️ [ALERTA]: Mãe Jurema solicita sua presença.`;
            out.appendChild(m);
        }, 800);
    }
});

observer.observe(document.body, { childList: true, subtree: true });

// Evento de Teclado Global (Só age no ID certo)
document.addEventListener('keydown', function(e) {
    if (e.target && e.target.id === 'game-input' && e.key === 'Enter') {
        processarJogo(e.target.value);
        e.target.value = '';
    }
});

// Estilo de animação (Injetado uma única vez)
if (!document.getElementById('cdd-style')) {
    const s = document.createElement('style');
    s.id = 'cdd-style';
    s.innerHTML = `@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } } .blink-text { animation: blink 1s infinite; }`;
    document.head.appendChild(s);
}
