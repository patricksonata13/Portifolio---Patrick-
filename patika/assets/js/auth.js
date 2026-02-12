// PATIKA - Sistema de Autenticação
const PatikaAuth = {
    // Modos de acesso
    modes: {
        guest: { name: 'Convidado', save: false, maxProjects: 1 },
        local: { name: 'Local', save: true, maxProjects: 5 },
        pro: { name: 'Profissional', save: true, maxProjects: Infinity }
    },

    // Estado atual
    currentUser: null,
    currentMode: 'guest',

    // Entrar
    login: function(mode, credentials = null) {
        this.currentMode = mode;
        
        if (mode === 'guest') {
            this.currentUser = {
                id: 'guest-' + Date.now(),
                name: 'Convidado',
                mode: 'guest'
            };
        }
        
        if (mode === 'local') {
            this.currentUser = {
                id: 'local-' + Date.now(),
                name: localStorage.getItem('patika.username') || 'Usuário Local',
                mode: 'local'
            };
        }
        
        if (mode === 'pro') {
            // Integrar com backend
            this.currentUser = credentials;
        }
        
        this.showNotification(`✅ Entrou como ${this.modes[mode].name}`);
        return this.currentUser;
    },

    // Sair
    logout: function() {
        if (this.currentMode === 'local' && this.currentUser) {
            this.autoSave();
        }
        
        const userName = this.currentUser?.name;
        this.currentUser = null;
        this.currentMode = 'guest';
        
        this.showNotification(`👋 Até logo, ${userName || 'visitante'}!`);
        
        // Redirecionar após 1.5s
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1500);
    },

    // Auto-save
    autoSave: function() {
        if (this.modes[this.currentMode]?.save) {
            console.log('💾 Auto-save em', new Date().toLocaleTimeString());
            // Implementar save
        }
    },

    // Notificações estilo terminal
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 20px;
            background: var(--patika-panel);
            border: 2px solid var(--patika-${type === 'success' ? 'primary' : type});
            color: var(--text-primary);
            padding: 12px 24px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            z-index: 9999;
            animation: slideIn 0.3s;
        `;
        notification.textContent = `[${type.toUpperCase()}] ${message}`;
        document.body.appendChild(notification);
        
        setTimeout(() => notification.remove(), 3000);
    }
};

// Inicializar auto-save
setInterval(() => PatikaAuth.autoSave(), 30000);

// Salvar antes de fechar
window.addEventListener('beforeunload', () => PatikaAuth.autoSave());
