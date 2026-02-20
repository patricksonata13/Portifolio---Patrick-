// CDD 3001 - SISTEMA RPG COMPLETO
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
                console.log('✅ Save carregado!');
            } catch (e) {
                console.log('❌ Erro ao carregar save');
            }
        }
    }
    
    salvar() {
        this.jogador.ultimoSave = new Date().toISOString();
        localStorage.setItem('cdd3001_rpg', JSON.stringify(this.jogador));
        console.log('💾 Progresso salvo!');
    }
    
    ganharXP(quantidade, origem) {
        this.jogador.xp += quantidade;
        console.log(`✨ +${quantidade} XP • ${origem}`);
        
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
        console.log(`⭐ LEVEL UP! Agora você é nível ${this.jogador.nivel}!`);
    }
    
    visitarModulo(modulo) {
        if (!this.jogador.visitas.includes(modulo)) {
            this.jogador.visitas.push(modulo);
            this.ganharXP(10, `primeira visita: ${modulo}`);
        }
        this.salvar();
    }
    
    coletarMemoria() {
        this.jogador.memorias++;
        this.ganharXP(5, 'memória coletada');
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
        const xpEl = document.querySelector('.xp-total');
        if (xpEl) xpEl.textContent = `${this.jogador.xp}/${this.jogador.xpProximoNivel}`;
        
        const nivelEl = document.querySelector('.nivel-atual');
        if (nivelEl) nivelEl.textContent = this.jogador.nivel;
    }
    
    abrirModulo(modulo) {
        console.log(`📂 Acessando: ${modulo}...`);
        this.visitarModulo(modulo);
        setTimeout(() => {
            window.location.href = `/cdd/${modulo}/`;
        }, 500);
    }
}

// Inicializar
const rpg = new CDDRPG();
window.rpg = rpg;

// SISTEMA DE CONQUISTAS
class Conquistas {
    constructor(rpg) {
        this.rpg = rpg;
        this.lista = [
            { id: 'iniciante', nome: 'Iniciante', icon: '👣', xp: 50, check: () => true },
            { id: 'explorador', nome: 'Explorador', icon: '🗺️', xp: 100, check: () => this.rpg.jogador.visitas.length >= 4 },
            { id: 'mestre', nome: 'Mestre', icon: '🌍', xp: 300, check: () => this.rpg.jogador.visitas.length >= 8 },
            { id: 'colecionador', nome: 'Colecionador', icon: '🧠', xp: 200, check: () => this.rpg.jogador.memorias >= 25 },
            { id: 'arquivista', nome: 'Arquivista', icon: '👑', xp: 500, check: () => this.rpg.jogador.nivel >= 5 }
        ];
    }
    
    verificar() {
        this.lista.forEach(c => {
            if (c.check() && !this.rpg.jogador.conquistas.includes(c.id)) {
                this.rpg.jogador.conquistas.push(c.id);
                this.rpg.ganharXP(c.xp, `conquista: ${c.nome}`);
                alert(`🏆 CONQUISTA: ${c.icon} ${c.nome}`);
            }
        });
    }
}

const conquistas = new Conquistas(rpg);
setInterval(() => conquistas.verificar(), 10000);
window.conquistas = conquistas;
