// --- SANKOFA OS ENGINE ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
window.audioCtx = audioCtx;

// Inicializa o Terminal do Jogo
window.iniciarTerminalCDD = function() {
    const out = document.getElementById('log-output');
    if(out) {
        out.innerHTML = "<p class='system-msg'>> SANKOFA OS v.3001 inicializado...</p><p>> Digite HELP para comandos.</p>";
    }
};

// Processa os comandos do jogo
window.processarJogo = function(cmd) {
    const out = document.getElementById('log-output');
    if(!out) return;

    const input = cmd.toUpperCase().trim();
    let response = "";

    switch(input) {
        case 'HELP':
            response = "COMANDOS DISPONÍVEIS: INVESTIGAR, SALTAR, STATUS, LIMPAR";
            break;
        case 'STATUS':
            response = "SINCRONIA: 100% | LOCAL: HUB CENTRAL";
            break;
        case 'LIMPAR':
            out.innerHTML = "";
            return;
        default:
            response = `ERRO: Comando '${input}' não reconhecido pelo sistema.`;
    }

    out.innerHTML += `<p style="color:#00ff41; margin: 5px 0;">> ${input}</p>`;
    out.innerHTML += `<p style="color:#aaa; margin-bottom: 10px;">${response}</p>`;
    out.scrollTop = out.scrollHeight;
};

console.log('🕹️ Sankofa Engine Loaded');
