// 1. Banco de Dados Isolado
const db_afro = {
    'MÃE JUREMA': "MÃE JUREMA: 'O mundo morreu lá fora, mas aqui a gente reinventou a vida.'",
    'CAPITÃO RAFA': "CAPITÃO RAFA: 'Se a Neocorp vier, vai sangrar no asfalto.'",
    'DRA LÍVIA': "DRA LÍVIA: 'Na CDD, a cura é um ato político.'",
    'ORIXÁ-TEC': "KAYODÊ: 'As máquinas lembram de quem as construiu.'",
    'HELP': "SISTEMA: Digite o nome de um personagem para interceptar mensagens."
};

// 2. Função de Processamento (Só roda dentro do terminal)
function processarJogo(cmd) {
    const out = document.getElementById('log-output');
    if(!out) return;
    
    let inputUpper = cmd.toUpperCase().trim();
    let p = document.createElement('p');
    p.style.cssText = "margin:8px 0; border-left:2px solid #ffae00; padding-left:8px; color:#fff;";

    if (db_afro[inputUpper]) {
        p.innerHTML = `<span style="color:#ffae00">> TRANSMISSÃO:</span> ${db_afro[inputUpper]}`;
    } else {
        p.innerHTML = `<span style="color:#ff4444">> ERRO:</span> Identidade não encontrada.`;
    }
    
    out.appendChild(p);
    const term = document.getElementById('sin-terminal');
    if(term) term.scrollTop = term.scrollHeight;
}

// 3. Função Global de Inicialização (Chamada pelo clique no HTML)
window.iniciarTerminalCDD = function() {
    console.log("Terminal CDD Ativado"); // Para debug no F12
    setTimeout(() => {
        const out = document.getElementById('log-output');
        if (out && !document.getElementById('missao-ativa')) {
            const m = document.createElement('p');
            m.id = 'missao-ativa';
            m.style.cssText = "color:#ff4444; font-weight:bold; animation:blink 1s infinite;";
            m.innerHTML = `⚠️ [ALERTA]: Mãe Jurema solicita sua presença.`;
            out.appendChild(m);
        }
    }, 400);
};

// 4. Único Event Listener (Restrito ao Input do Jogo)
document.addEventListener('keydown', function(e) {
    if (e.target && e.target.id === 'game-input' && e.key === 'Enter') {
        processarJogo(e.target.value);
        e.target.value = '';
    }
});

// 5. Estilo de Animação Único
if (!document.getElementById('cdd-style')) {
    const s = document.createElement('style');
    s.id = 'cdd-style';
    s.innerHTML = `@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }`;
    document.head.appendChild(s);
}
