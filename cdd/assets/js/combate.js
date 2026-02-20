// Sistema de Combate CDD 3001
class SistemaCombate {
    constructor(rpg) {
        this.rpg = rpg;
        this.inimigos = {
            branquelo: { nome: 'Branquelo', nivel: 1, hp: 30, xp: 15, dano: 4, defesa: 2, icon: '👻' },
            sentinela: { nome: 'Sentinela', nivel: 3, hp: 60, xp: 50, dano: 8, defesa: 5, icon: '👤' },
            eco: { nome: 'Eco', nivel: 5, hp: 100, xp: 100, dano: 12, defesa: 8, icon: '👥' },
            alfa: { nome: 'Alfa', nivel: 8, hp: 200, xp: 300, dano: 20, defesa: 15, icon: '💀' }
        };
        this.emCombate = false;
        this.inimigoAtual = null;
    }

    iniciarCombate(tipoInimigo) {
        if (!this.inimigos[tipoInimigo]) {
            console.error('Inimigo não encontrado');
            return false;
        }

        this.inimigoAtual = { 
            ...this.inimigos[tipoInimigo],
            hpAtual: this.inimigos[tipoInimigo].hp
        };
        this.emCombate = true;
        
        this.rpg.notificar(
            '⚔️ COMBATE INICIADO!', 
            `${this.inimigoAtual.icon} ${this.inimigoAtual.nome} - Nível ${this.inimigoAtual.nivel}`,
            '#ff4444'
        );
        
        return true;
    }

    atacar() {
        if (!this.emCombate) return false;

        // Rolar dado (1-20)
        const dado = Math.floor(Math.random() * 20) + 1;
        const acerto = dado + this.rpg.jogador.atributos.forca;
        
        // Calcular dano
        let dano = Math.floor(Math.random() * 8) + 1 + this.rpg.jogador.atributos.forca;
        
        // Verificar acerto crítico (dado 20)
        if (dado === 20) {
            dano *= 2;
            this.rpg.log('🎯 ATAQUE CRÍTICO!', 'sucesso');
        }
        
        // Aplicar dano
        const danoFinal = Math.max(1, dano - this.inimigoAtual.defesa);
        this.inimigoAtual.hpAtual -= danoFinal;
        
        this.rpg.log(`⚔️ Atacou: ${danoFinal} de dano!`, 'info');
        
        // Verificar se inimigo morreu
        if (this.inimigoAtual.hpAtual <= 0) {
            this.derrotarInimigo();
            return true;
        }
        
        // Contra-ataque do inimigo
        this.contraAtacar();
        return true;
    }

    contraAtacar() {
        const dado = Math.floor(Math.random() * 20) + 1;
        if (dado > 10) { // Inimigo acerta em 50% das vezes
            const dano = Math.floor(Math.random() * this.inimigoAtual.dano) + 1;
            this.rpg.jogador.atributos.hp -= dano;
            this.rpg.log(`😵 Inimigo causou ${dano} de dano!`, 'erro');
            
            if (this.rpg.jogador.atributos.hp <= 0) {
                this.derrotaJogador();
            }
        }
    }

    usarHabilidade(habilidade) {
        const habilidades = {
            cura: { nome: 'Cura', custo: 10, efeito: () => {
                this.rpg.jogador.atributos.hp += 20;
                this.rpg.log('💚 Cura: +20 HP', 'sucesso');
            }},
            furia: { nome: 'Fúria', custo: 15, efeito: () => {
                const dano = 30 + this.rpg.jogador.atributos.forca;
                this.inimigoAtual.hpAtual -= dano;
                this.rpg.log(`💢 Fúria: ${dano} de dano!`, 'sucesso');
            }},
            defesa: { nome: 'Defesa Total', custo: 5, efeito: () => {
                this.rpg.jogador.atributos.defesa += 10;
                this.rpg.log('🛡️ Defesa aumentada!', 'info');
            }}
        };

        if (habilidades[habilidade]) {
            if (this.rpg.jogador.recursos.mana >= habilidades[habilidade].custo) {
                this.rpg.jogador.recursos.mana -= habilidades[habilidade].custo;
                habilidades[habilidade].efeito();
                return true;
            } else {
                this.rpg.log('❌ Mana insuficiente!', 'erro');
                return false;
            }
        }
    }

    derrotarInimigo() {
        const xpGanho = this.inimigoAtual.xp;
        this.rpg.ganharXP(xpGanho, `derrotou ${this.inimigoAtual.nome}`);
        this.rpg.notificar(
            '🎉 VITÓRIA!', 
            `${this.inimigoAtual.icon} ${this.inimigoAtual.nome} derrotado! +${xpGanho} XP`,
            '#4ade80'
        );
        
        // Chance de drop
        if (Math.random() < 0.3) {
            this.rpg.coletarItem('fragmento_osso', 1);
        }
        
        this.emCombate = false;
        this.inimigoAtual = null;
        
        // Conquista de combate
        this.rpg.jogador.estatisticas.inimigosDerrotados++;
    }

    derrotaJogador() {
        this.rpg.notificar('💀 DERROTA!', 'Você foi derrotado...', '#ff4444');
        this.rpg.jogador.atributos.hp = 50; // Reviver com 50% da vida
        this.emCombate = false;
        this.inimigoAtual = null;
    }

    fugir() {
        const chance = Math.random();
        if (chance < 0.4) { // 40% de chance de fugir
            this.rpg.log('🏃 Fugiu do combate!', 'info');
            this.emCombate = false;
            this.inimigoAtual = null;
            return true;
        } else {
            this.rpg.log('❌ Não conseguiu fugir!', 'erro');
            this.contraAtacar();
            return false;
        }
    }
}

// Inicializar
window.sistemaCombate = new SistemaCombate(window.rpg);
