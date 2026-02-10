const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
window.audioCtx = audioCtx;

window.iniciarTerminalCDD = function() {
    const out = document.getElementById('log-output');
    out.innerHTML = "<p>> SANKOFA OS inicializado...</p><p>> Digite HELP para comandos.</p>";
};

window.processarJogo = function(cmd) {
    const out = document.getElementById('log-output');
    const input = cmd.toUpperCase().trim();
    let msg = "";
    
    if(input === 'HELP') msg = "Comandos: INVESTIGAR, SALTAR, STATUS";
    else msg = `Comando '${input}' não reconhecido.`;
    
    out.innerHTML += `<p style="color:#00ff41">> ${msg}</p>`;
    out.scrollTop = out.scrollHeight;
};
