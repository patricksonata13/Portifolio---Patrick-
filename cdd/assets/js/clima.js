// Sistema de Clima CDD 3001
const SistemaClima = {
    climas: [
        { nome: '☀️ SOL FORTE', cor: '#ffd966', efeito: 'Visibilidade +50%', raridade: 0.4 },
        { nome: '🌧️ CHUVA', cor: '#4a90e2', efeito: 'Brancos mais barulhentos', raridade: 0.3 },
        { nome: '🌫️ NEBLINA', cor: '#94a3b8', efeito: 'Furtividade +30%', raridade: 0.2 },
        { nome: '⛈️ TEMPESTADE', cor: '#4a5568', efeito: 'Eventos especiais', raridade: 0.1 }
    ],
    
    climaAtual: null,
    
    iniciar: function() {
        this.sortearClima();
        this.atualizarInterface();
        
        // Mudar clima a cada 5 minutos
        setInterval(() => {
            this.sortearClima();
            this.atualizarInterface();
        }, 300000);
    },
    
    sortearClima: function() {
        const rand = Math.random();
        let acumulado = 0;
        
        for (let clima of this.climas) {
            acumulado += clima.raridade;
            if (rand < acumulado) {
                this.climaAtual = clima;
                break;
            }
        }
    },
    
    atualizarInterface: function() {
        // Remover indicador antigo
        const antigo = document.getElementById('clima-indicador');
        if (antigo) antigo.remove();
        
        // Criar novo indicador
        const indicador = document.createElement('div');
        indicador.id = 'clima-indicador';
        indicador.innerHTML = `${this.climaAtual.nome} • ${this.climaAtual.efeito}`;
        indicador.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--bg-tertiary);
            border: 1px solid ${this.climaAtual.cor};
            color: ${this.climaAtual.cor};
            padding: 10px 15px;
            font-size: 12px;
            z-index: 1000;
            border-radius: 4px;
            box-shadow: 0 0 20px ${this.climaAtual.cor}40;
            animation: slideDown 0.5s;
        `;
        
        document.body.appendChild(indicador);
        
        // Log no console
        console.log(`🌍 Clima mudou: ${this.climaAtual.nome} - ${this.climaAtual.efeito}`);
    }
};

// Iniciar sistema
SistemaClima.iniciar();
