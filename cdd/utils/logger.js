const Logger = {
    levels: {
        INFO: '📘',
        WARN: '⚠️',
        ERROR: '❌',
        DEBUG: '🔍',
        COMBAT: '⚔️',
        XP: '✨'
    },
    
    log(level, message, data = null) {
        const timestamp = new Date().toISOString();
        const logEntry = {
            timestamp,
            level: this.levels[level],
            message,
            data,
            user: localStorage.getItem('cdd_user') || 'anonymous',
            page: window.location.pathname
        };
        
        // Salvar localmente
        const logs = JSON.parse(localStorage.getItem('cdd_logs') || '[]');
        logs.push(logEntry);
        localStorage.setItem('cdd_logs', JSON.stringify(logs.slice(-100)));
        
        // Mostrar no console
        console.log(`${logEntry.level} [${timestamp}] ${message}`, data || '');
        
        // Enviar para servidor (se configurado)
        if (navigator.onLine) {
            fetch('/api/logs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(logEntry)
            }).catch(() => {});
        }
    },
    
    info(message, data) { this.log('INFO', message, data); },
    warn(message, data) { this.log('WARN', message, data); },
    error(message, data) { this.log('ERROR', message, data); },
    debug(message, data) { this.log('DEBUG', message, data); },
    combat(message, data) { this.log('COMBAT', message, data); },
    xp(message, data) { this.log('XP', message, data); }
};

window.Logger = Logger;
