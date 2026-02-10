let canvas, ctx, animationId;
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

const JOGO_CDD = {
    eraAtual: 'PRESENTE',
    sincronia: 65,
    inventario: [],
    missoes: { ativa: 'CURAR_O_TEMPO', fragmentos: 0, concluida: false },
    player: { x: 140, y: 70, color: "#00ff41", jumping: false, yTarget: 70 },
    configEras: {
        'PRESENTE': { fundo: "#050505", borda: "#00ff41", corPlayer: "#00ff41" },
        'FAZENDA': { fundo: "#1a0a00", borda: "#ffae00", corPlayer: "#ffae00" },
        'ALDEIA': { fundo: "#000f0a", borda: "#00ccff", corPlayer: "#00ccff" }
    }
};

const ENTIDADES = {
    inimigo: { x: 350, y: 70, ativo: false },
    jurema: { x: 50, y: 70, ativa: false }
};

// --- MOTOR DE ÁUDIO (SINTETIZADOR) ---
function tocarSom(freq, tipo, dur) {
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = tipo;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + dur);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + dur);
}

// --- ENGINE GRÁFICA ---
window.iniciarTerminalCDD = function() {
    canvas = document.getElementById('game-canvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        if (animationId) cancelAnimationFrame(animationId);
        render();
        logar(">> SISTEMA: Pressione ENTER para iniciar conexão neural.", "#00ff41");
    }
};

function render() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Player
    if (JOGO_CDD.player.jumping) {
        JOGO_CDD.player.y -= 4;
        if (JOGO_CDD.player.y <= 30) JOGO_CDD.player.jumping = false;
    } else if (JOGO_CDD.player.y < JOGO_CDD.player.yTarget) {
        JOGO_CDD.player.y += 4;
    }

    ctx.shadowBlur = 15;
    ctx.shadowColor = JOGO_CDD.player.color;
    ctx.fillStyle = JOGO_CDD.player.color;
    ctx.fillRect(JOGO_CDD.player.x, JOGO_CDD.player.y, 15, 30);
    
    // Inimigo (Vulto)
    if (JOGO_CDD.eraAtual === 'FAZENDA') {
        ENTIDADES.inimigo.ativo = true;
        ctx.fillStyle = "red";
        ENTIDADES.inimigo.x -= 1.2;
        if(ENTIDADES.inimigo.x < -20) ENTIDADES.inimigo.x = 350;
        ctx.fillRect(ENTIDADES.inimigo.x, ENTIDADES.inimigo.y, 20, 35);
        
        // Colisão
        if (Math.abs(JOGO_CDD.player.x - ENTIDADES.inimigo.x) < 15 && JOGO_CDD.player.y > 50) {
            JOGO_CDD.sincronia -= 0.2;
            tocarSom(100, 'sawtooth', 0.1);
            document.body.style.filter = "invert(1)";
            setTimeout(() => document.body.style.filter = "none", 50);
        }
    }

    // Mãe Jurema
    if (JOGO_CDD.eraAtual === 'ALDEIA') {
        ctx.fillStyle = "#00ccff";
        ctx.beginPath();
        ctx.arc(ENTIDADES.jurema.x, ENTIDADES.jurema.y, 10, 0, Math.PI*2);
        ctx.fill();
        if (Math.abs(JOGO_CDD.player.x - ENTIDADES.jurema.x) < 20) {
            if(JOGO_CDD.sincronia < 100) JOGO_CDD.sincronia += 0.2;
        }
    }

    ctx.shadowBlur = 0;
    ctx.fillStyle = JOGO_CDD.configEras[JOGO_CDD.eraAtual].borda;
    ctx.fillRect(20, 102, 260, 1);
    
    const sincEl = document.getElementById('sincronia-val');
    if(sincEl) sincEl.innerText = Math.floor(JOGO_CDD.sincronia) + "%";
    
    animationId = requestAnimationFrame(render);
}

// --- LÓGICA DE COMANDOS ---
function logar(txt, cor) {
    const out = document.getElementById('log-output');
    if(!out) return;
    const p = document.createElement('p');
    p.style.cssText = `margin:4px 0; border-left:3px solid ${cor}; padding-left:8px; color:#fff; font-size:12px;`;
    p.innerHTML = txt;
    out.appendChild(p);
    document.getElementById('sin-terminal').scrollTop = document.getElementById('sin-terminal').scrollHeight;
}

window.processarJogo = function(cmd) {
    const input = cmd.toUpperCase().trim();
    tocarSom(440, 'sine', 0.05);

    if (input === 'SANKOFA') {
        JOGO_CDD.eraAtual = 'ALDEIA';
        tocarSom(880, 'square', 0.2);
        logar(">> ALDEIA: O tempo flui como rio. Recupere-se na luz.", "#00ccff");
    }
    if (input === 'FAZENDA') {
        JOGO_CDD.eraAtual = 'FAZENDA';
        tocarSom(150, 'sawtooth', 0.3);
        logar(">> AVISO: Perigo detectado. O Capitão está à espreita.", "#ffae00");
    }
    if (input === 'VOLTAR') {
        JOGO_CDD.eraAtual = 'PRESENTE';
        logar(">> CDD: De volta ao asfalto.", "#00ff41");
    }

    if (input === 'INVESTIGAR') {
        if(JOGO_CDD.eraAtual === 'FAZENDA') logar(">> ITEM DETECTADO: [GRILHAO]", "#ffae00");
        if(JOGO_CDD.eraAtual === 'ALDEIA') logar(">> ITEM DETECTADO: [AMULETO]", "#00ccff");
    }

    if (input.startsWith('PEGAR ')) {
        const item = input.split(' ')[1];
        if(!JOGO_CDD.inventario.includes(item)) {
            JOGO_CDD.inventario.push(item);
            logar(`>> COLETADO: ${item}. Sincronia Ancestral aumentada.`, "#fff");
            if(JOGO_CDD.inventario.length >= 2) {
                logar("✨ SINCRONIA TOTAL ATINGIDA! Você curou o tempo.", "#00ff41");
                tocarSom(1200, 'sine', 1);
            }
        }
    }

    if (input === 'HELP') logar("FAZENDA, SANKOFA, VOLTAR, INVESTIGAR, PEGAR [ITEM], HELP", "#fff");
    
    // Movimento via comando
    if (input === 'A') JOGO_CDD.player.x -= 20;
    if (input === 'D') JOGO_CDD.player.x += 20;
    if (input === 'W') JOGO_CDD.player.jumping = true;
};
