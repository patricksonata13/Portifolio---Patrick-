
// SISTEMA DE CONQUISTAS
class Conquistas {
    constructor(rpg) {
        this.rpg = rpg;
        this.lista = [
            { id: 'primeiro_acesso', nome: 'Primeiro Acesso', icone: '🎮', condicao: () => true },
            { id: 'historiador', nome: 'Historiador', icone: '📜', condicao: () => this.rpg.jogador.modulosCompletos.includes('historia') },
            { id: 'colecionador_arte', nome: 'Colecionador de Arte', icone: '🎨', condicao: () => this.rpg.jogador.memorias >= 10 },
            { id: 'caçador_eggs', nome: 'Caçador de Easter Eggs', icone: '🔍', condicao: () => this.rpg.jogador.memorias >= 25 },
            { id: 'arquivista_mestre', nome: 'Arquivista Mestre', icone: '👑', condicao: () => this.rpg.jogador.nivel >= 5 },
            { id: 'explorador', nome: 'Explorador', icone: '🗺️', condicao: () => Object.keys(this.rpg.modulos).length >= 5 },
            { id: 'veterano', nome: 'Veterano', icone: '⚔️', condicao: () => this.rpg.jogador.tempoJogado >= 60 } // 1 hora
        ];
    }
    
    verificar() {
        this.lista.forEach(conquista => {
            if (conquista.condicao() && !this.rpg.jogador.conquistas.includes(conquista.id)) {
                this.rpg.jogador.conquistas.push(conquista.id);
                this.rpg.log(`🏆 CONQUISTA: ${conquista.nome} ${conquista.icone}`);
            }
        });
    }
}

// Inicializar conquistas
const conquistas = new Conquistas(rpg);

// Verificar a cada minuto
setInterval(() => {
    conquistas.verificar();
}, 60000);

// SISTEMA DE CONQUISTAS AVANÇADO
class ConquistasManager {
    constructor(rpg) {
        this.rpg = rpg;
        this.conquistas = [
            {
                id: 'primeiro_acesso',
                nome: 'Primeiro Passo',
                descricao: 'Acesse o CDD 3001 pela primeira vez',
                icone: '👣',
                xp: 50,
                condicao: () => true
            },
            {
                id: 'explorador_iniciante',
                nome: 'Explorador Iniciante',
                descricao: 'Visite 3 módulos diferentes',
                icone: '🗺️',
                xp: 100,
                condicao: () => {
                    const visitados = new Set();
                    this.rpg.historicoVisitas?.forEach(v => visitados.add(v));
                    return visitados.size >= 3;
                }
            },
            {
                id: 'explorador_avancado',
                nome: 'Explorador Avançado',
                descricao: 'Visite todos os 8 módulos',
                icone: '🌍',
                xp: 300,
                condicao: () => {
                    const visitados = new Set();
                    this.rpg.historicoVisitas?.forEach(v => visitados.add(v));
                    return visitados.size >= 8;
                }
            },
            {
                id: 'colecionador_memorias',
                nome: 'Colecionador de Memórias',
                descricao: 'Colete 25 memórias',
                icone: '🧠',
                xp: 200,
                condicao: () => this.rpg.jogador.memorias >= 25
            },
            {
                id: 'arquivista_mestre',
                nome: 'Arquivista Mestre',
                descricao: 'Atinga o nível 5',
                icone: '👑',
                xp: 500,
                condicao: () => this.rpg.jogador.nivel >= 5
            },
            {
                id: 'cacador_eggs',
                nome: 'Caçador de Easter Eggs',
                descricao: 'Encontre 10 segredos',
                icone: '🥚',
                xp: 250,
                condicao: () => {
                    // Verificar localStorage por segredos encontrados
                    const segredos = localStorage.getItem('cdd3001_segredos');
                    return segredos ? JSON.parse(segredos).length >= 10 : false;
                }
            },
            {
                id: 'missões_completas',
                nome: 'Herói do CDD',
                descricao: 'Complete 5 missões',
                icone: '⚔️',
                xp: 400,
                condicao: () => {
                    const missoes = localStorage.getItem('cdd3001_missoes');
                    if (missoes) {
                        return Object.values(JSON.parse(missoes)).filter(m => m.concluida).length >= 5;
                    }
                    return false;
                }
            },
            {
                id: 'veterano',
                nome: 'Veterano',
                descricao: 'Jogue por mais de 2 horas',
                icone: '⏰',
                xp: 150,
                condicao: () => this.rpg.jogador.tempoJogado >= 120
            },
            {
                id: 'inventario_cheio',
                nome: 'Colecionador',
                descricao: 'Tenha 20 itens no inventário',
                icone: '🎒',
                xp: 180,
                condicao: () => {
                    const itens = localStorage.getItem('cdd3001_inventario');
                    return itens ? JSON.parse(itens).length >= 20 : false;
                }
            },
            {
                id: 'completista',
                nome: 'Completista',
                descricao: 'Complete todas as conquistas',
                icone: '🏆',
                xp: 1000,
                condicao: () => {
                    return this.rpg.jogador.conquistas?.length >= 9;
                }
            }
        ];
    }
    
    verificar() {
        let novasConquistas = [];
        
        this.conquistas.forEach(conquista => {
            if (conquista.condicao() && !this.rpg.jogador.conquistas?.includes(conquista.id)) {
                if (!this.rpg.jogador.conquistas) this.rpg.jogador.conquistas = [];
                this.rpg.jogador.conquistas.push(conquista.id);
                novasConquistas.push(conquista);
                
                // Ganhar XP
                this.rpg.ganharXP(conquista.xp, 'conquista');
                
                // Mostrar notificação
                this.notificar(conquista);
            }
        });
        
        return novasConquistas;
    }
    
    notificar(conquista) {
        // Criar elemento de notificação
        const notificacao = document.createElement('div');
        notificacao.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
            color: var(--bg-primary);
            padding: 15px 25px;
            border: 2px solid var(--border-color);
            z-index: 1000;
            animation: slideIn 0.5s ease-out;
            font-family: 'Courier New', monospace;
        `;
        
        notificacao.innerHTML = `
            <div style="font-size: 12px; opacity: 0.8;">🏆 CONQUISTA DESBLOQUEADA</div>
            <div style="font-size: 20px; margin: 5px 0;">${conquista.icone} ${conquista.nome}</div>
            <div style="font-size: 12px;">${conquista.descricao}</div>
            <div style="font-size: 14px; margin-top: 10px;">+${conquista.xp} XP</div>
        `;
        
        document.body.appendChild(notificacao);
        
        // Remover após 5 segundos
        setTimeout(() => {
            notificacao.style.animation = 'slideOut 0.5s ease-out';
            setTimeout(() => notificacao.remove(), 500);
        }, 5000);
        
        // Adicionar ao log
        this.rpg.log(`🏆 CONQUISTA: ${conquista.nome} ${conquista.icone} +${conquista.xp}XP`);
    }
}

// Adicionar estilo de animação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Inicializar
const conquistasManager = new ConquistasManager(rpg);

// Verificar conquistas a cada 30 segundos
setInterval(() => {
    conquistasManager.verificar();
}, 30000);

// Histórico de visitas
rpg.historicoVisitas = JSON.parse(localStorage.getItem('cdd3001_visitas') || '[]');

// Sobrescrever abrirModulo para registrar visitas
const abrirModuloOriginal = rpg.abrirModulo;
rpg.abrirModulo = function(modulo) {
    if (!rpg.historicoVisitas.includes(modulo)) {
        rpg.historicoVisitas.push(modulo);
        localStorage.setItem('cdd3001_visitas', JSON.stringify(rpg.historicoVisitas));
    }
    abrirModuloOriginal.call(this, modulo);
};
