// Worker para eventos em tempo real
const EventSystem = {
    eventos: [],
    
    async checkEvents() {
        // Verificar hora
        const now = new Date();
        const hour = now.getHours();
        
        // Eventos baseados em hora
        if (hour >= 0 && hour < 6) {
            this.triggerEvent('MADRUGADA', 'Brancos mais agressivos', 'danger');
        } else if (hour >= 6 && hour < 12) {
            this.triggerEvent('MANHÃ', 'Visibilidade aumentada', 'success');
        } else if (hour >= 12 && hour < 18) {
            this.triggerEvent('TARDE', 'Calor extremo', 'warning');
        } else {
            this.triggerEvent('NOITE', 'Perigo máximo', 'danger');
        }
        
        // Eventos aleatórios (5% chance)
        if (Math.random() < 0.05) {
            const eventos = [
                { nome: 'INVASÃO', desc: 'Brancos atacando o perímetro', xp: 100 },
                { nome: 'SUPRIMENTOS', desc: 'Caixa de suprimentos encontrada', item: 'municao' },
                { nome: 'ALIADO', desc: 'Sobrevivente quer se juntar', aliado: 'novato' }
            ];
            const evento = eventos[Math.floor(Math.random() * eventos.length)];
            this.triggerEvent(evento.nome, evento.desc, 'event');
        }
    },
    
    triggerEvent(nome, desc, tipo) {
        // Mostrar notificação
        const notification = new CustomEvent('rpg-event', {
            detail: { nome, desc, tipo }
        });
        window.dispatchEvent(notification);
        
        // Salvar no histórico
        this.eventos.push({
            nome,
            desc,
            tipo,
            timestamp: new Date()
        });
    },
    
    start() {
        // Verificar eventos a cada minuto
        setInterval(() => this.checkEvents(), 60000);
    }
};

EventSystem.start();
