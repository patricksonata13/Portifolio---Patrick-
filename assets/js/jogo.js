/** * CDD - 3001: MOTOR SANKOFA 
 * Integrando Estado, Inventário e Viagem Temporal
 */
const CDD_3001 = {
    eraAtual: 'PRESENTE',
    sincronia: 100,
    inventario: [],
    player: { x: 50, y: 70, vida: 100, cor: "#00ff41", nome: "ISRAEL" }
    // ... (restante do objeto que você enviou)
};

// --- SISTEMA DE EVENTOS DRAMÁTICOS ---
const eventosDramaticos = {
    DESCOBERTA_FAZENDA: function() {
        logar(">> O ar fica denso. O sensor bio-ancestral detecta resíduos de ferro e medo.", "#ff4444");
        
        // Efeito Sonoro: Som de correntes (frequência baixa e metálica)
        tocarSom(100, 'square', 0.5); 
        setTimeout(() => tocarSom(150, 'square', 0.5), 200);

        setTimeout(() => {
            logar(">> ISRAEL: 'Essas correntes... elas não estão no chão. Elas estão no código do tempo.'", "#fff");
            logar(">> MISSÃO ATUALIZADA: Localize o Amuleto de Jurema para romper o ciclo.", "#00ff41");
            
            // Recompensa de Sincronia por enfrentar o passado
            JOGO_CDD.sincronia += 10;
            if(JOGO_CDD.sincronia > 100) JOGO_CDD.sincronia = 100;
            
            // Salva o progresso automaticamente
            if(window.saveGame) window.saveGame();
        }, 1500);
    }
};

// Hook para o comando INVESTIGAR
const motorOriginal = window.processarJogo;
window.processarJogo = function(cmd) {
    const input = cmd.toUpperCase().trim();
    
    // Se o motor original existir, executa (movimento, etc)
    if(motorOriginal) motorOriginal(cmd);

    // Lógica específica de Investigação
    if (input === 'INVESTIGAR') {
        if (JOGO_CDD.eraAtual === 'FAZENDA') {
            eventosDramaticos.DESCOBERTA_FAZENDA();
        } else {
            logar(">> Nada de relevante encontrado nesta linha temporal.", "#666");
        }
    }
};

// --- MOTOR DE SALTO TEMPORAL SANKOFA ---
function saltarNoTempo(destino) {
    const erasValidas = ['PRESENTE', 'FAZENDA', 'ALDEIA'];
    const eraDestino = destino.toUpperCase();

    if (!erasValidas.includes(eraDestino)) {
        logar(`>> ERRO: Coordenadas temporais para '${destino}' não localizadas.`, "#ff4444");
        return;
    }

    if (eraDestino === JOGO_CDD.eraAtual) {
        logar(`>> Você já está no fluxo de ${eraDestino}.`, "#666");
        return;
    }

    // Efeito Sonoro de Teletransporte (Frequência ascendente)
    tocarSom(200, 'sawtooth', 0.1);
    setTimeout(() => tocarSom(400, 'sawtooth', 0.1), 100);
    setTimeout(() => tocarSom(800, 'sawtooth', 0.3), 200);

    logar(`>> INICIANDO PROTOCOLO SANKOFA...`, "#00ff41");
    logar(`>> VIAJANDO PARA: ${eraDestino}`, "#fff");

    // Efeito de Glitch no Canvas
    const originalCor = JOGO_CDD.player.cor;
    JOGO_CDD.player.cor = "#fff"; // Brilho de salto
    
    setTimeout(() => {
        JOGO_CDD.eraAtual = eraDestino;
        JOGO_CDD.player.cor = originalCor;
        
        // Mudança de Ambiente
        if (eraDestino === 'FAZENDA') {
            document.getElementById('game-canvas').style.backgroundColor = "#1a0a00"; // Tons de terra/sangue
            logar(">> LOCALIZAÇÃO: FAZENDA RECANTO (SEC. XIX)", "#ffae00");
        } else if (eraDestino === 'ALDEIA') {
            document.getElementById('game-canvas').style.backgroundColor = "#001a0a"; // Tons de mata
            logar(">> LOCALIZAÇÃO: QUILOMBO DAS PALMEIRAS (PÉ-COLONIAL)", "#00ccff");
        } else {
            document.getElementById('game-canvas').style.backgroundColor = "#000"; // Futuro/Vazio
            logar(">> LOCALIZAÇÃO: CDD - SETOR 3001", "#00ff41");
        }
        
        renderizarCenario(); // Função que desenha o fundo novo
    }, 800);
}

// Atualizando o processador de comandos para aceitar SANKOFA [ERA]
const processadorComSalto = window.processarJogo;
window.processarJogo = function(cmd) {
    const partes = cmd.toUpperCase().trim().split(" ");
    const acao = partes[0];
    const alvo = partes[1];

    if (acao === 'SANKOFA') {
        if (!alvo) {
            logar(">> Use: SANKOFA [FAZENDA | ALDEIA | PRESENTE]", "#ffae00");
        } else {
            saltarNoTempo(alvo);
        }
    } else {
        if (processadorComSalto) processadorComSalto(cmd);
    }
};

function renderizarCenario() {
    // Aqui no futuro adicionaremos árvores ou grades dependendo da era
    console.log("Cenário atualizado para: " + JOGO_CDD.eraAtual);
}
