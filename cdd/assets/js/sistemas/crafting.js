// Sistema de Crafting CDD 3001
class SistemaCrafting {
    constructor(rpg) {
        this.rpg = rpg;
        this.receitas = {
            faca_simples: {
                nome: 'Faca Simples',
                icon: '🔪',
                nivel: 1,
                xp: 20,
                materiais: {
                    fragmento_osso: 2,
                    pano: 1
                },
                resultado: {
                    tipo: 'arma',
                    dano: 5,
                    durabilidade: 10
                }
            },
            coquetel_molotov: {
                nome: 'Coquetel Molotov',
                icon: '🔥',
                nivel: 2,
                xp: 50,
                materiais: {
                    vidro: 1,
                    alcool: 2,
                    pano: 1
                },
                resultado: {
                    tipo: 'explosivo',
                    dano: 20,
                    area: true
                }
            },
            armadura_couro: {
                nome: 'Armadura de Couro',
                icon: '🛡️',
                nivel: 3,
                xp: 80,
                materiais: {
                    couro: 3,
                    linha: 2
                },
                resultado: {
                    tipo: 'armadura',
                    defesa: 8,
                    durabilidade: 20
                }
            },
            estaca_madeira: {
                nome: 'Estaca de Madeira',
                icon: '⚡',
                nivel: 1,
                xp: 15,
                materiais: {
                    madeira: 2
                },
                resultado: {
                    tipo: 'arma',
                    dano: 8,
                    contra: 'brancos' // Dano extra contra Brancos
                }
            },
            radio_caseiro: {
                nome: 'Rádio Caseiro',
                icon: '📻',
                nivel: 4,
                xp: 150,
                materiais: {
                    metal: 3,
                    fio: 2,
                    componente: 1
                },
                resultado: {
                    tipo: 'utilidade',
                    efeito: 'Comunicação com outros sobreviventes'
                }
            },
            barricada: {
                nome: 'Barricada Reforçada',
                icon: '🚧',
                nivel: 2,
                xp: 40,
                materiais: {
                    madeira: 5,
                    pregos: 3
                },
                resultado: {
                    tipo: 'construcao',
                    defesa: 15,
                    instalavel: true
                }
            }
        };
    }

    verificarReceita(receitaId) {
        const receita = this.receitas[receitaId];
        if (!receita) return false;

        // Verificar nível
        if (this.rpg.jogador.nivel < receita.nivel) {
            this.rpg.log(`❌ Nível necessário: ${receita.nivel}`, 'erro');
            return false;
        }

        // Verificar materiais
        for (let [material, quantidade] of Object.entries(receita.materiais)) {
            if (!this.rpg.jogador.inventario[material] || 
                this.rpg.jogador.inventario[material] < quantidade) {
                this.rpg.log(`❌ Faltando: ${material} (${quantidade})`, 'erro');
                return false;
            }
        }

        return true;
    }

    craftar(receitaId) {
        if (!this.verificarReceita(receitaId)) return false;

        const receita = this.receitas[receitaId];

        // Remover materiais
        for (let [material, quantidade] of Object.entries(receita.materiais)) {
            this.rpg.jogador.inventario[material] -= quantidade;
        }

        // Adicionar item craftado
        const itemId = `item_craft_${Date.now()}`;
        this.rpg.jogador.itens.push({
            id: itemId,
            nome: receita.nome,
            icon: receita.icon,
            tipo: receita.resultado.tipo,
            stats: receita.resultado
        });

        // Ganhar XP
        this.rpg.ganharXP(receita.xp, `craft: ${receita.nome}`);

        // Notificação
        this.rpg.notificar(
            '🔨 CRAFTADO!',
            `${receita.icon} ${receita.nome}\n+${receita.xp} XP`,
            '#ffd966'
        );

        // Conquista de crafting
        if (!this.rpg.jogador.conquistas.includes('craftsman')) {
            const totalCrafts = this.rpg.jogador.estatisticas.crafts || 0;
            if (totalCrafts + 1 >= 5) {
                this.rpg.jogador.conquistas.push('craftsman');
                this.rpg.notificar('🏆 CONQUISTA!', 'Artesão - Craftou 5 itens', '#b3a0ff');
            }
        }

        this.rpg.jogador.estatisticas.crafts = (this.rpg.jogador.estatisticas.crafts || 0) + 1;
        this.rpg.salvarJogo();

        return true;
    }

    listarReceitasDisponiveis() {
        return Object.entries(this.receitas)
            .filter(([id, rec]) => rec.nivel <= this.rpg.jogador.nivel)
            .map(([id, rec]) => ({
                id,
                ...rec,
                disponivel: this.verificarReceita(id)
            }));
    }
}

// Inicializar
window.sistemaCrafting = new SistemaCrafting(window.rpg);
