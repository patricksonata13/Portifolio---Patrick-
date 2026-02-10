function processarJogo(cmd) {
    const out = document.getElementById('log-output');
    if(!out) return;
    
    let p = document.createElement('p');
    p.style.margin = "5px 0";
    
    switch(cmd) {
        case '1':
            p.innerHTML = `<span style="color:#00ffff">> [FORTIFICAR]</span> Rafa posicionou as barricadas. A CDD está pronta para o impacto.`;
            break;
        case '2':
            p.innerHTML = `<span style="color:#ff00ff">> [RITUAL]</span> Mãe Jurema sussurra: "Israel está na rede". Uma frequência de 2024 ecoa nos seus ouvidos.`;
            break;
        case '3':
            p.innerHTML = `<span style="color:#ffff00">> [SABER]</span> Os jovens da CDD agora sabem operar os filtros. A resistência se tornou autossuficiente.`;
            break;
        default:
            p.innerHTML = `<span style="color:#ff4444">> Comando inválido.</span> Tente 1, 2 ou 3.`;
    }
    
    out.appendChild(p);
    const term = document.getElementById('sin-terminal');
    term.scrollTop = term.scrollHeight;
}

// Escutador de teclado
document.addEventListener('keydown', function(e) {
    if (e.target.id === 'game-input' && e.key === 'Enter') {
        const val = e.target.value;
        processarJogo(val);
        e.target.value = '';
    }
});
