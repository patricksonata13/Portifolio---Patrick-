// CDD 3001 - SISTEMA RPG COMPLETO v2.0
class CDDRPG {
    constructor() {
        this.jogador = {
            nivel: 1,
            xp: 0,
            xpProximoNivel: 1000,
            memorias: 0,
            memoriasMax: 50,
            modulosCompletos: [],
            conquistas: [],
            tempoJogado: 0,
            ultimoSave: null,
            classe: "Arquivista",
            moedas: 0,
            segredos: [],
            visitas: []
        };
        
        this.modulos = {
            historia: { nome: '📜 HISTÓRIA', xp: 150, progresso: 0, max: 10, icon: '📜' },
            videos: { nome: '🎬 VÍDEOS', xp: 100, progresso: 0, max: 8, icon: '🎬' },
            game: { nome: '🎮 GAME', xp: 500, progresso: 0, max: 20, icon: '🎮' },
            roteiro: { nome: '📝 ROTEIRO', xp: 75, progresso: 0, max: 15, icon: '📝' },
            arte: { nome: '🎨 ARTE', xp: 50, progresso: 0, max: 12, icon: '🎨' },
            curiosidades: { nome: '🔍 CURIOSIDADES', xp: 200, progresso: 0, max: 25, icon: '🔍' },
            musica: { nome: '🎵 MÚSICA', xp: 25, progresso: 0, max: 10, icon: '🎵' },
            inventario: { nome: '🎒 INVENTÁRIO', xp: 0, progresso: 0, max: 30, icon: '🎒' }
        };
        
        this.carregar();
        this.iniciarTemporizador();
    }
    
    carregar() {
        const save = localStorage.getItem('cdd3001_rpg');
        if (save) {
            try {
                const dados = JSON.parse(save);
                this.jogador = {...this.jogador, ...dados};
                this.atualizarInterface();
                this.log('✅ Save carregado!');
            } catch (e) {
                this.log('❌ Erro ao carregar save');
            }
        }
    }
    
    salvar() {
        this.jogador.ultimoSave = new Date().toISOString();
        localStorage.setItem('cdd3001_rpg', JSON.stringify(this.jogador));
        this.log('💾 Progresso salvo!');
    }
    
    log(mensagem) {
        const consoleEl = document.getElementById('consoleLog');
        if (consoleEl) {
            const hora = new Date().toLocaleTimeString();
            consoleEl.innerHTML = `[${hora}] > ${mensagem}<br>` + consoleEl.innerHTML;
            if (consoleEl.children.length > 5) {
                consoleEl.removeChild(consoleEl.lastChild);
            }
        }
    }
    
    ganharXP(quantidade, origem) {
        this.jogador.xp += quantidade;
        this.log(`✨ +${quantidade} XP • ${origem}`);
        
        while (this.jogador.xp >= this.jogador.xpProximoNivel) {
            this.levelUp();
        }
        
        this.atualizarInterface();
        this.salvar();
    }
    
    levelUp() {
        this.jogador.nivel++;
        this.jogador.xp -= this.jogador.xpProximoNivel;
        this.jogador.xpProximoNivel = Math.floor(this.jogador.xpProximoNivel * 1.5);
        this.jogador.moedas += 100;
        
        this.log(`⭐ LEVEL UP! Agora você é nível ${this.jogador.nivel}!`);
        this.notificar('LEVEL UP!', `⭐ Nível ${this.jogador.nivel}`, 'var(--accent-primary)');
    }
    
    notificar(titulo, mensagem, cor) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${cor};
            color: var(--bg-primary);
            padding: 15px 25px;
            border: 2px solid var(--border-color);
            z-index: 1000;
            animation: slideIn 0.5s;
            font-family: 'Courier New', monospace;
            max-width: 300px;
        `;
        notif.innerHTML = `<strong>${titulo}</strong><br>${mensagem}`;
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 5000);
    }
    
    visitarModulo(modulo) {
        if (!this.jogador.visitas.includes(modulo)) {
            this.jogador.visitas.push(modulo);
            this.ganharXP(10, `primeira visita: ${modulo}`);
        }
        this.modulos[modulo].progresso = Math.min(this.modulos[modulo].progresso + 1, this.modulos[modulo].max);
        this.salvar();
    }
    
    coletarMemoria(modulo) {
        this.jogador.memorias++;
        this.ganharXP(5, 'memória coletada');
        this.log(`🧠 Memória coletada! Total: ${this.jogador.memorias}/${this.jogador.memoriasMax}`);
    }
    
    encontrarSegredo(id) {
        if (!this.jogador.segredos.includes(id)) {
            this.jogador.segredos.push(id);
            this.ganharXP(50, 'segredo encontrado!');
            this.notificar('🔍 SEGREDO!', 'Você encontrou um easter egg!', 'var(--accent-secondary)');
        }
    }
    
    iniciarTemporizador() {
        setInterval(() => {
            this.jogador.tempoJogado++;
            this.salvar();
        }, 60000);
        
        setInterval(() => {
            this.salvar();
        }, 30000);
    }
    
    atualizarInterface() {
        // Atualizar elementos na página se existirem
        const xpEl = document.querySelector('.xp-total');
        if (xpEl) xpEl.textContent = `${this.jogador.xp}/${this.jogador.xpProximoNivel}`;
        
        const nivelEl = document.querySelector('.nivel-atual');
        if (nivelEl) nivelEl.textContent = this.jogador.nivel;
        
        const memoriasEl = document.querySelector('.memorias-total');
        if (memoriasEl) memoriasEl.textContent = `${this.jogador.memorias}/${this.jogador.memoriasMax}`;
        
        const barraXP = document.querySelector('.exp-preenchida');
        if (barraXP) {
            const percent = (this.jogador.xp / this.jogador.xpProximoNivel) * 100;
            barraXP.style.width = `${percent}%`;
        }
    }
    
    abrirModulo(modulo) {
        this.log(`📂 Acessando: ${this.modulos[modulo].nome}...`);
        this.visitarModulo(modulo);
        setTimeout(() => {
            window.location.href = `/cdd/${modulo}/`;
        }, 500);
    }
}

// Inicializar
const rpg = new CDDRPG();
window.rpg = rpg;

// Estilos globais
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// SISTEMA DE CONQUISTAS
class Conquistas {
    constructor(rpg) {
        this.rpg = rpg;
        this.lista = [
            { id: 'iniciante', nome: 'Iniciante', desc: 'Primeiro acesso', icon: '👣', xp: 50, check: () => true },
            { id: 'explorador', nome: 'Explorador', desc: 'Visite 4 módulos', icon: '🗺️', xp: 100, check: () => this.rpg.jogador.visitas.length >= 4 },
            { id: 'mestre', nome: 'Mestre', desc: 'Visite todos os 8 módulos', icon: '🌍', xp: 300, check: () => this.rpg.jogador.visitas.length >= 8 },
            { id: 'colecionador', nome: 'Colecionador', desc: '25 memórias', icon: '🧠', xp: 200, check: () => this.rpg.jogador.memorias >= 25 },
            { id: 'arquivista', nome: 'Arquivista', desc: 'Nível 5', icon: '👑', xp: 500, check: () => this.rpg.jogador.nivel >= 5 },
            { id: 'cacador', nome: 'Caçador', desc: '5 segredos', icon: '🥚', xp: 250, check: () => this.rpg.jogador.segredos.length >= 5 },
            { id: 'rico', nome: 'Rico', desc: '1000 moedas', icon: '💰', xp: 150, check: () => this.rpg.jogador.moedas >= 1000 },
            { id: 'veterano', nome: 'Veterano', desc: '2 horas jogadas', icon: '⏰', xp: 150, check: () => this.rpg.jogador.tempoJogado >= 120 },
            { id: 'completista', nome: 'Completista', desc: 'Todas conquistas', icon: '🏆', xp: 1000, check: () => this.rpg.jogador.conquistas.length >= 8 }
        ];
    }
    
    verificar() {
        this.lista.forEach(c => {
            if (c.check() && !this.rpg.jogador.conquistas.includes(c.id)) {
                this.rpg.jogador.conquistas.push(c.id);
                this.rpg.ganharXP(c.xp, `conquista: ${c.nome}`);
                this.rpg.notificar('🏆 CONQUISTA!', `${c.icon} ${c.nome}\n${c.desc}`, 'var(--accent-secondary)');
            }
        });
    }
}

const conquistas = new Conquistas(rpg);
setInterval(() => conquistas.verificar(), 10000);
window.conquistas = conquistas;
