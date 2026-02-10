let canvas, ctx, animationId;
const SISTEMA_3001 = {
    sincronia: 65,
    player: { x: 140, y: 70, color: "#00ff41", jumping: false, yTarget: 70 },
    db: {
        'FERRO': { n: "SENTINELA", m: "O metal protege a favela!", c: "#ffae00", cmd: () => mover(20) },
        'AGUA': { n: "A VELHA", m: "A maré está subindo.", c: "#00ccff", cmd: () => mudarCor("#00ccff") },
        'JUREMA': { n: "MÃE JUREMA", m: "O tempo é um círculo.", c: "#ff4444", cmd: () => pular() },
        'SONATA': { n: "O AUTOR", m: "Sincronia Total.", c: "#fff", cmd: () => turbo() },
        'HELP': { n: "SANKOFA", m: "Tente: FERRO, AGUA, JUREMA, SONATA.", c: "#fff", cmd: () => {} }
    }
};

window.iniciarTerminalCDD = function() {
    canvas = document.getElementById('game-canvas');
    if (canvas) {
        ctx = canvas.getContext('2d');
        if (animationId) cancelAnimationFrame(animationId);
        render();
    }
};

function render() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Suavização do pulo
    if (SISTEMA_3001.player.jumping) {
        SISTEMA_3001.player.y -= 4;
        if (SISTEMA_3001.player.y <= 30) SISTEMA_3001.player.jumping = false;
    } else if (SISTEMA_3001.player.y < SISTEMA_3001.player.yTarget) {
        SISTEMA_3001.player.y += 4;
    }

    // Desenha o Boneco
    ctx.shadowBlur = 15;
    ctx.shadowColor = SISTEMA_3001.player.color;
    ctx.fillStyle = SISTEMA_3001.player.color;
    ctx.fillRect(SISTEMA_3001.player.x, SISTEMA_3001.player.y, 15, 30);
    
    // Chão
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#332200";
    ctx.fillRect(20, 100, 260, 2);
    
    animationId = requestAnimationFrame(render);
}

function mover(v) { SISTEMA_3001.player.x = (SISTEMA_3001.player.x + v) % 260; }
function mudarCor(c) { SISTEMA_3001.player.color = c; }
function pular() { if (SISTEMA_3001.player.y >= 70) SISTEMA_3001.player.jumping = true; }
function turbo() { SISTEMA_3001.player.color = "#fff"; pular(); mover(40); }

window.processarJogo = function(cmd) {
    const out = document.getElementById('log-output');
    const inputUpper = cmd.toUpperCase().trim();
    if (SISTEMA_3001.db[inputUpper]) {
        const d = SISTEMA_3001.db[inputUpper];
        const p = document.createElement('p');
        p.style.cssText = "margin:5px 0; border-left:2px solid "+d.c+"; padding-left:8px;";
        p.innerHTML = `<span style="color:${d.c}">>> ${d.n}:</span> ${d.m}`;
        out.appendChild(p);
        d.cmd();
        const term = document.getElementById('sin-terminal');
        term.scrollTop = term.scrollHeight;
    }
};
