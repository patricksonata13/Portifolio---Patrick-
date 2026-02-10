const SISTEMA_3001 = {
    sincronia: 65,
    db: {
        'FERRO': { nome: "SENTINELA", msg: "O metal que te fere hoje é o mesmo que te acorrentou ontem.", cor: "#ffae00" },
        'AGUA': { nome: "A VELHA", msg: "Onde você vê esgoto, eu vejo o rio sagrado.", cor: "#00ccff" },
        'PEDRA': { nome: "O JUIZ", msg: "A justiça dos homens é de papel, a minha é de granito.", cor: "#999999" },
        'VENTO': { nome: "A MENINA", msg: "Não corra como quem foge, corra como quem flutua.", cor: "#00ff41" },
        'JUREMA': { nome: "MÃE JUREMA", msg: "O solo está sangrando, meu filho. Cure o passado.", cor: "#ff4444" },
        'SONATA': { nome: "O AUTOR", msg: "Sincronia Total detectada. O futuro está escrito.", cor: "#fff" },
        'HELP': { nome: "SANKOFA", msg: "COMANDOS: FERRO, AGUA, PEDRA, VENTO, JUREMA, SONATA.", cor: "#ffffff" }
    }
};

function processarJogo(cmd) {
    const out = document.getElementById('log-output');
    const term = document.getElementById('sin-terminal');
    if(!out) return;
    let inputUpper = cmd.toUpperCase().trim();
    if (SISTEMA_3001.db[inputUpper]) {
        const data = SISTEMA_3001.db[inputUpper];
        let p = document.createElement('p');
        p.style.cssText = "margin:8px 0; border-left:3px solid " + data.cor + "; padding-left:10px; color:#fff;";
        p.innerHTML = `<span style="color:${data.cor}">>> ${data.nome}:</span> ${data.msg}`;
        out.appendChild(p);
        SISTEMA_3001.sincronia = Math.min(100, SISTEMA_3001.sincronia + 5);
    }
    if(term) term.scrollTop = term.scrollHeight;
    const hud = document.getElementById('sincronia-val');
    if(hud) hud.innerText = SISTEMA_3001.sincronia + "%";
}

window.iniciarTerminalCDD = function() {
    const out = document.getElementById('log-output');
    if (out) out.innerHTML += '<p style="color:#ffae00">⚠️ [SANKOFA OS]: Sistema Online. Digite HELP.</p>';
};

document.addEventListener('keydown', function(e) {
    const input = document.getElementById('game-input');
    if (e.target === input && e.key === 'Enter') {
        processarJogo(input.value);
        input.value = '';
    }
});
