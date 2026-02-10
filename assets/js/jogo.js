const SISTEMA_3001 = {
    sincronia: 65,
    db: {
        'FERRO': { nome: "SENTINELA", msg: "O SENTINELA: 'O metal que te fere hoje é o mesmo que te acorrentou ontem.'", cor: "#ffae00" },
        'AGUA': { nome: "A VELHA", msg: "A VELHA: 'Onde você vê esgoto, eu vejo o rio sagrado.'", cor: "#00ccff" },
        'PEDRA': { nome: "O JUIZ", msg: "O JUIZ: 'A justiça dos homens é de papel, a minha é de granito.'", cor: "#999999" },
        'VENTO': { nome: "A MENINA", msg: "A MENINA: 'Não corra como quem foge, corra como quem flutua.'", cor: "#00ff41" },
        'JUREMA': { nome: "MÃE JUREMA", msg: "MÃE JUREMA: 'O solo está sangrando, meu filho. Cure o passado.'", cor: "#ff4444" },
        'SONATA': { nome: "O AUTOR", msg: "SISTEMA: 'Sincronia Total detectada. O futuro está sendo escrito agora.'", cor: "#fff" },
        'HELP': { nome: "SANKOFA", msg: "COMANDOS DISPONÍVEIS: FERRO, AGUA, PEDRA, VENTO, JUREMA, SONATA.", cor: "#ffffff" }
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
        p.style.cssText = "margin:10px 0; border-left:3px solid " + data.cor + "; padding-left:12px; color:#fff; font-family:monospace;";
        p.innerHTML = `<span style="color:${data.cor}; font-weight:bold;">>> ${data.nome}:</span> ${data.msg}`;
        out.appendChild(p);
        SISTEMA_3001.sincronia = Math.min(100, SISTEMA_3001.sincronia + 7);
    } else {
        let p = document.createElement('p');
        p.style.cssText = "margin:10px 0; border-left:3px solid #ff4444; padding-left:12px; color:#fff;";
        p.innerHTML = `<span style="color:#ff4444">> ERRO:</span> Frequência não identificada na rede SANKOFA.`;
        out.appendChild(p);
        SISTEMA_3001.sincronia = Math.max(0, SISTEMA_3001.sincronia - 5);
    }
    if(term) term.scrollTop = term.scrollHeight;
    const hud = document.getElementById('sincronia-val');
    if(hud) hud.innerText = SISTEMA_3001.sincronia + "%";
}

window.iniciarTerminalCDD = function() {
    const out = document.getElementById('log-output');
    if (out && !document.getElementById('alerta-inicial')) {
        const m = document.createElement('div');
        m.id = 'alerta-inicial';
        m.innerHTML = '<p style="color:#00ff41; font-size:11px;">[SANKOFA OS V.3001]</p><p style="color:#ffae00; font-weight:bold;">⚠️ ALERTA: Fenda temporal detectada. Digite HELP.</p>';
        out.appendChild(m);
    }
};

document.addEventListener('keydown', function(e) {
    const input = document.getElementById('game-input');
    if (e.target === input && e.key === 'Enter') {
        processarJogo(input.value);
        input.value = '';
    }
});
