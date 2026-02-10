// Patika Editor - Sistema Principal

class PatikaEditor {
    constructor() {
        this.editor = document.getElementById('editor');
        this.titleInput = document.getElementById('titleInput');
        this.saveBtn = document.getElementById('saveBtn');
        this.wordCount = document.getElementById('wordCount');
        this.saveStatus = document.getElementById('saveStatus');
        this.timeIndicator = document.getElementById('timeIndicator');
        
        this.startTime = new Date();
        this.isSaving = false;
        this.autoSaveInterval = null;
        
        this.init();
    }
    
    init() {
        console.log('🖊️ Patika Editor inicializado');
        
        // Carregar projeto salvo
        this.loadProject();
        
        // Configurar eventos
        this.setupEvents();
        
        // Configurar auto-save
        this.setupAutoSave();
        
        // Configurar contador de tempo
        this.setupTimeCounter();
        
        // Focar no editor
        this.editor.focus();
        
        // Atualizar contador inicial
        this.updateWordCount();
    }
    
    setupEvents() {
        // Salvar ao digitar no título
        this.titleInput.addEventListener('input', () => this.saveProject());
        
        // Salvar ao clicar no botão
        this.saveBtn.addEventListener('click', () => this.saveProject());
        
        // Atalhos de teclado
        document.addEventListener('keydown', (e) => {
            // Ctrl+S para salvar
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                this.saveProject();
            }
            
            // Ctrl+E para exportar
            if ((e.ctrlKey || e.metaKey) && e.key === 'e') {
                e.preventDefault();
                this.exportProject();
            }
            
            // F11 para tela cheia
            if (e.key === 'F11') {
                e.preventDefault();
                this.toggleFullscreen();
            }
            
            // Esc para sair do fullscreen
            if (e.key === 'Escape' && document.fullscreenElement) {
                document.exitFullscreen();
            }
        });
        
        // Atualizar contador de palavras ao digitar
        this.editor.addEventListener('input', () => {
            this.updateWordCount();
            // Marcar como não salvo
            this.saveStatus.textContent = '● Não salvo';
            this.saveStatus.style.color = '#f39c12';
        });
    }
    
    setupAutoSave() {
        // Salvar automaticamente a cada 5 segundos se houver alterações
        this.autoSaveInterval = setInterval(() => {
            if (this.editor.value.length > 0 && this.saveStatus.textContent.includes('Não salvo')) {
                this.saveProject();
            }
        }, 5000);
    }
    
    setupTimeCounter() {
        // Atualizar contador de tempo a cada minuto
        setInterval(() => {
            this.updateTimeCounter();
        }, 60000);
        
        this.updateTimeCounter();
    }
    
    updateTimeCounter() {
        const now = new Date();
        const diff = now - this.startTime;
        const hours = Math.floor(diff / 3600000);
        const minutes = Math.floor((diff % 3600000) / 60000);
        
        if (hours > 0) {
            this.timeIndicator.textContent = `🕐 ${hours}h ${minutes}m`;
        } else {
            this.timeIndicator.textContent = `🕐 ${minutes}m`;
        }
    }
    
    updateWordCount() {
        const text = this.editor.value;
        const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
        const characters = text.length;
        
        this.wordCount.textContent = `${words} palavras | ${characters} caracteres`;
    }
    
    loadProject() {
        try {
            const saved = localStorage.getItem('patika_current_project');
            if (saved) {
                const project = JSON.parse(saved);
                this.editor.value = project.content || '';
                this.titleInput.value = project.title || 'Novo projeto';
                
                console.log('📂 Projeto carregado:', project.title);
                this.saveStatus.textContent = '✓ Carregado';
                this.saveStatus.style.color = '#2ecc71';
            }
        } catch (error) {
            console.error('❌ Erro ao carregar projeto:', error);
            this.saveStatus.textContent = '✗ Erro ao carregar';
            this.saveStatus.style.color = '#e74c3c';
        }
    }
    
    saveProject() {
        if (this.isSaving) return;
        
        this.isSaving = true;
        this.saveStatus.textContent = '⏳ Salvando...';
        this.saveStatus.style.color = '#f39c12';
        this.saveBtn.disabled = true;
        
        // Simular delay de rede
        setTimeout(() => {
            try {
                const project = {
                    title: this.titleInput.value,
                    content: this.editor.value,
                    lastSaved: new Date().toISOString(),
                    wordCount: this.editor.value.trim().split(/\s+/).length
                };
                
                localStorage.setItem('patika_current_project', JSON.stringify(project));
                localStorage.setItem('patika_last_saved', new Date().toISOString());
                
                // Salvar no histórico também
                this.saveToHistory(project);
                
                console.log('💾 Projeto salvo:', project.title);
                
                this.saveStatus.textContent = `✓ Salvo ${new Date().getHours()}:${new Date().getMinutes().toString().padStart(2, '0')}`;
                this.saveStatus.style.color = '#2ecc71';
                
                // Feedback tátil (se disponível)
                if (navigator.vibrate) {
                    navigator.vibrate(50);
                }
                
            } catch (error) {
                console.error('❌ Erro ao salvar:', error);
                this.saveStatus.textContent = '✗ Erro ao salvar';
                this.saveStatus.style.color = '#e74c3c';
            } finally {
                this.isSaving = false;
                this.saveBtn.disabled = false;
            }
        }, 300);
    }
    
    saveToHistory(project) {
        try {
            const history = JSON.parse(localStorage.getItem('patika_history') || '[]');
            
            // Adicionar ao início do histórico
            history.unshift({
                ...project,
                savedAt: new Date().toISOString(),
                id: Date.now()
            });
            
            // Manter apenas os últimos 50 projetos
            if (history.length > 50) {
                history.pop();
            }
            
            localStorage.setItem('patika_history', JSON.stringify(history));
        } catch (error) {
            console.error('❌ Erro ao salvar no histórico:', error);
        }
    }
    
    exportProject() {
        const text = `Título: ${this.titleInput.value}\n\n${this.editor.value}`;
        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `${this.titleInput.value.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.txt`;
        a.click();
        
        URL.revokeObjectURL(url);
        
        // Feedback
        this.saveStatus.textContent = '📥 Exportado!';
        this.saveStatus.style.color = '#3498db';
        setTimeout(() => {
            this.saveStatus.textContent = '✓ Salvo';
            this.saveStatus.style.color = '#2ecc71';
        }, 2000);
    }
    
    toggleFullscreen() {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(err => {
                console.error(`❌ Erro ao entrar em tela cheia: ${err.message}`);
            });
        } else {
            document.exitFullscreen();
        }
    }
}

// Inicializar editor quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.patikaEditor = new PatikaEditor();
    
    // Adicionar dicas de atalhos
    console.log(`
    🎯 Atalhos do Patika Editor:
    • Ctrl+S = Salvar
    • Ctrl+E = Exportar
    • F11 = Tela cheia
    • Esc = Sair da tela cheia
    `);
});

// Gerenciar fullscreen changes
document.addEventListener('fullscreenchange', () => {
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    if (fullscreenBtn) {
        fullscreenBtn.textContent = document.fullscreenElement ? '⤓ Sair' : '⤢ Tela Cheia';
    }
});
