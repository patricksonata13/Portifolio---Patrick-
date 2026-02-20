
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
