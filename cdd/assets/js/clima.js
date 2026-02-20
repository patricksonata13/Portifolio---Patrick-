// Sistema de Clima CDD 3001
class SistemaClima {
    constructor(rpg) {
        this.rpg = rpg;
        this.climas = {
            sol: {
                nome: 'Sol Forte',
                icon: '☀️',
                cor: '#ffd966',
                efeito: {
                    visibilidade: 1.5,
                    stamina: 0.8 // Gasta menos stamina
                }
            },
            chuva: {
                nome: 'Chuva',
                icon: '🌧️',
                cor: '#4a90e2',
                efeito: {
                    visibilidade: 0.7,
                    som: 2.0 // Barulho atrai mais inimigos
                }
            },
            neblina: {
                nome: 'Neblina',
                icon: '🌫️',
                cor: '#94a3b8',
                efeito: {
                    visibilidade: 0.3,
                    furtividade: 1.5 // Mais fácil se esconder
                }
            },
            noite: {
                nome: 'Noite',
                icon: '🌙',
                cor: '#2d3748',
                efeito: {
                    visibilidade: 0.2,
                    ataque: 1.3 // Brancos mais fortes à noite
                }
            },
            tempestade: {
                nome: 'Tempestade',
                icon: '⛈️',
                cor: '#4a5568',
                efeito: {
                    visibilidade: 0.1,
                    perigo: 2.0 // Eventos especiais
                }
            }
        };

        this.climaAtual = 'sol';
        this.ciclo = 0; // 0-24 horas
        this.intervalo = null;
    }

    iniciar() {
        // Atualizar clima a cada 30 segundos
        this.intervalo = setInterval(() => {
            this.avancarTempo();
        }, 30000); // 30 segundos = 1 hora no jogo

        // Clima inicial aleatório
        this.sortearClima();
    }

    avancarTempo() {
        this.ciclo = (this.ciclo + 1) % 24;

        // Chance de mudar clima (30%)
        if (Math.random() < 0.3) {
            this.sortearClima();
        }

        // Verificar se é noite (18h - 6h)
        if (this.ciclo >= 18 || this.ciclo < 6) {
            if (this.climaAtual !== 'noite') {
                this.climaAnterior = this.climaAtual;
                this.mudarClima('noite');
            }
        } else {
            // Se era noite e agora é dia, volta ao clima anterior
            if (this.climaAtual === 'noite' && this.climaAnterior) {
                this.mudarClima(this.climaAnterior);
            }
        }

        this.atualizarInterface();
    }

    sortearClima() {
        if (this.ciclo >= 18 || this.ciclo < 6) {
            this.mudarClima('noite');
            return;
        }

        const climasDia = ['sol', 'chuva', 'neblina', 'tempestade'];
        const pesos = [0.4, 0.3, 0.2, 0.1]; // 40% sol, 30% chuva, etc
        
        const sorteio = Math.random();
        let acumulado = 0;
        
        for (let i = 0; i < climasDia.length; i++) {
            acumulado += pesos[i];
            if (sorteio < acumulado) {
                this.mudarClima(climasDia[i]);
                break;
            }
        }
    }

    mudarClima(tipo) {
        const climaAnterior = this.climaAtual;
        this.climaAtual = tipo;

        // Aplicar efeitos
        this.aplicarEfeitosClima();

        // Notificar se mudança significativa
        if (climaAnterior !== tipo) {
            this.rpg.notificar(
                '🌍 CLIMA MUDOU',
                `${this.climas[tipo].icon} ${this.climas[tipo].nome}`,
                this.climas[tipo].cor
            );
        }
    }

    aplicarEfeitosClima() {
        const clima = this.climas[this.climaAtual];
        
        // Modificar atributos baseado no clima
        if (this.climaAtual === 'noite') {
            // Noite: Brancos mais fortes
            this.rpg.jogador.atributos.percepcao *= 0.7;
            this.rpg.modificadorDanoInimigo = 1.3;
        } else {
            this.rpg.modificadorDanoInimigo = 1.0;
        }

        if (this.climaAtual === 'neblina') {
            // Neblina: mais furtividade
            this.rpg.jogador.atributos.furtividade = 
                (this.rpg.jogador.atributos.furtividade || 5) * 1.5;
        }
    }

    getHoraString() {
        const hora = this.ciclo.toString().padStart(2, '0');
        return `${hora}:00`;
    }

    atualizarInterface() {
        const clima = this.climas[this.climaAtual];
        
        // Atualizar elemento na interface se existir
        const climaEl = document.getElementById('clima-atual');
        if (climaEl) {
            climaEl.innerHTML = `${clima.icon} ${clima.nome} | ${this.getHoraString()}`;
            climaEl.style.color = clima.cor;
        }

        // Mudar cor de fundo baseado no clima (suave)
        const intensidade = this.climaAtual === 'noite' ? 0.1 : 0.05;
        document.body.style.backgroundColor = `rgba(0,0,0,${intensidade})`;
    }

    parar() {
        if (this.intervalo) {
            clearInterval(this.intervalo);
        }
    }
}

// Inicializar
window.sistemaClima = new SistemaClima(window.rpg);
window.sistemaClima.iniciar();
