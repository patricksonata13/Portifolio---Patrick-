// Sistema de Aliados CDD 3001
class SistemaAliados {
    constructor(rpg) {
        this.rpg = rpg;
        this.aliados = {
            marcos: {
                nome: 'Marcos',
                icon: '👤',
                nivel: 2,
                hp: 80,
                dano: 12,
                habilidade: 'Detectar Brancos',
                fidelidade: 50,
                dialogo: 'E aí, parceiro? Vamo junto?'
            },
            djurema: {
                nome: 'D. Jurema',
                icon: '👵',
                nivel: 5,
                hp: 60,
                dano: 8,
                habilidade: 'Curar',
                fidelidade: 80,
                dialogo: 'Deus te abençoe, fi.'
            },
            luan: {
                nome: 'Luan',
                icon: '🧒',
                nivel: 1,
                hp: 50,
                dano: 6,
                habilidade: 'Correr rápido',
                fidelidade: 40,
                dialogo: 'Vambora, tio!'
            },
            jorge: {
                nome: 'Seu Jorge',
                icon: '👴',
                nivel: 4,
                hp: 100,
                dano: 15,
                habilidade: 'Lutar com faca',
                fidelidade: 70,
                dialogo: 'Exército me ensinou.'
            },
            cachorro: {
                nome: 'Caramelo',
                icon: '🐕',
                nivel: 2,
                hp: 40,
                dano: 5,
                habilidade: 'Farejar',
                fidelidade: 100,
                dialogo: 'Au au!'
            }
        };

        this.aliadosAtivos = [];
        this.missoesAliados = {};
    }

    recrutar(aliadoId) {
        if (!this.aliados[aliadoId]) return false;

        // Verificar se já tem
        if (this.aliadosAtivos.includes(aliadoId)) {
            this.rpg.log('❌ Já está no grupo!', 'erro');
            return false;
        }

        // Limite de aliados (nível do jogador / 2)
        const limite = Math.floor(this.rpg.jogador.nivel / 2) + 1;
        if (this.aliadosAtivos.length >= limite) {
            this.rpg.log('❌ Limite de aliados atingido!', 'erro');
            return false;
        }

        // Chance de recrutar baseado na fidelidade
        const chance = this.aliados[aliadoId].fidelidade / 100;
        if (Math.random() > chance) {
            this.rpg.log(`❌ ${this.aliados[aliadoId].nome} não quis se juntar`, 'erro');
            return false;
        }

        this.aliadosAtivos.push(aliadoId);
        this.rpg.log(`✅ ${this.aliados[aliadoId].nome} se juntou ao grupo!`, 'sucesso');

        // Notificação
        this.rpg.notificar(
            '🤝 NOVO ALIADO!',
            `${this.aliados[aliadoId].icon} ${this.aliados[aliadoId].nome}\n${this.aliados[aliadoId].dialogo}`,
            '#4ade80'
        );

        // Missão especial se tiver
        if (this.missoesAliados[aliadoId]) {
            this.rpg.iniciarMissao(this.missoesAliados[aliadoId]);
        }

        return true;
    }

    removerAliado(aliadoId) {
        const index = this.aliadosAtivos.indexOf(aliadoId);
        if (index > -1) {
            this.aliadosAtivos.splice(index, 1);
            this.rpg.log(`👋 ${this.aliados[aliadoId].nome} saiu do grupo`, 'info');
            return true;
        }
        return false;
    }

    calcularBonusCombate() {
        let bonusDano = 0;
        let bonusDefesa = 0;

        this.aliadosAtivos.forEach(aliadoId => {
            const aliado = this.aliados[aliadoId];
            bonusDano += Math.floor(aliado.dano / 2);
            bonusDefesa += Math.floor(aliado.hp / 20);
        });

        return { bonusDano, bonusDefesa };
    }

    ataqueAliados() {
        let danoTotal = 0;
        this.aliadosAtivos.forEach(aliadoId => {
            const aliado = this.aliados[aliadoId];
            const dano = Math.floor(Math.random() * aliado.dano) + 1;
            danoTotal += dano;
            this.rpg.log(`${aliado.icon} ${aliado.nome}: ${dano} de dano`, 'info');
        });
        return danoTotal;
    }

    eventoEspecial(aliadoId) {
        const aliado = this.aliados[aliadoId];
        
        switch(aliadoId) {
            case 'marcos':
                if (Math.random() < 0.1) {
                    this.rpg.coletarItem('fragmento_osso', 2);
                    this.rpg.log('🔍 Marcos achou ossos!', 'sucesso');
                }
                break;
            case 'djurema':
                if (Math.random() < 0.2) {
                    this.rpg.jogador.atributos.hp += 10;
                    this.rpg.log('🙏 D. Jurema abençoou o grupo! +10 HP', 'sucesso');
                }
                break;
            case 'luan':
                if (Math.random() < 0.15) {
                    this.rpg.log('🏃 Luan achou um atalho!', 'info');
                    // Pular encontro aleatório
                }
                break;
            case 'jorge':
                if (Math.random() < 0.05) {
                    this.rpg.log('🔪 Seu Jorge ensinou uma técnica nova!', 'sucesso');
                    this.rpg.ganharXP(25, 'treinamento');
                }
                break;
            case 'cachorro':
                if (Math.random() < 0.3) {
                    this.rpg.log('🐕 Caramelo farejou algo!', 'info');
                    this.rpg.coletarItem('osso', 1);
                }
                break;
        }
    }

    listarAliados() {
        return Object.entries(this.aliados).map(([id, aliado]) => ({
            id,
            ...aliado,
            ativo: this.aliadosAtivos.includes(id)
        }));
    }

    melhorarFidelidade(aliadoId, pontos) {
        if (this.aliados[aliadoId]) {
            this.aliados[aliadoId].fidelidade = Math.min(
                100, 
                (this.aliados[aliadoId].fidelidade || 50) + pontos
            );
        }
    }
}

// Inicializar
window.sistemaAliados = new SistemaAliados(window.rpg);
