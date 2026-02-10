// Gestos de Toque para Patika (Mobile)

class TouchGestures {
    constructor(editor) {
        this.editor = editor;
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchStartTime = 0;
        this.minSwipeDistance = 50;
        
        this.init();
    }
    
    init() {
        // Eventos de toque
        this.editor.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
        this.editor.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        this.editor.addEventListener('touchend', this.handleTouchEnd.bind(this));
        
        // Eventos de clique longo
        this.editor.addEventListener('contextmenu', this.handleContextMenu.bind(this));
        
        console.log('👆 Gestos de toque habilitados');
    }
    
    handleTouchStart(event) {
        const touch = event.touches[0];
        this.touchStartX = touch.clientX;
        this.touchStartY = touch.clientY;
        this.touchStartTime = Date.now();
        
        // Prevenir zoom com dois dedos
        if (event.touches.length > 1) {
            event.preventDefault();
        }
    }
    
    handleTouchMove(event) {
        // Prevenir scroll padrão durante gestos
        if (Math.abs(event.touches[0].clientX - this.touchStartX) > 10) {
            event.preventDefault();
        }
    }
    
    handleTouchEnd(event) {
        if (!event.changedTouches[0]) return;
        
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - this.touchStartX;
        const deltaY = touch.clientY - this.touchStartY;
        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
        const duration = Date.now() - this.touchStartTime;
        
        // Determinar tipo de gesto
        if (distance < 10 && duration < 300) {
            this.handleTap(event);
        } else if (distance > this.minSwipeDistance && duration < 500) {
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                // Swipe horizontal
                this.handleSwipeHorizontal(deltaX > 0 ? 'right' : 'left', event);
            } else {
                // Swipe vertical
                this.handleSwipeVertical(deltaY > 0 ? 'down' : 'up', event);
            }
        } else if (duration > 1000) {
            this.handleLongPress(event);
        }
    }
    
    handleTap(event) {
        // Foco no editor se não estiver focado
        if (document.activeElement !== this.editor) {
            this.editor.focus();
            
            // Posicionar cursor no local do toque
            const range = document.caretRangeFromPoint(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
            if (range) {
                const selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
            }
        }
    }
    
    handleSwipeHorizontal(direction, event) {
        console.log(`Swipe ${direction} detectado`);
        
        if (direction === 'left') {
            // Swipe esquerda: próximo projeto
            this.showToast('Próximo projeto →');
        } else {
            // Swipe direita: projeto anterior
            this.showToast('← Projeto anterior');
        }
        
        // Feedback tátil
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    }
    
    handleSwipeVertical(direction, event) {
        console.log(`Swipe ${direction} vertical detectado`);
        
        if (direction === 'up') {
            // Swipe para cima: salvar
            if (window.patikaEditor) {
                window.patikaEditor.saveProject();
                this.showToast('💾 Projeto salvo');
            }
        } else {
            // Swipe para baixo: mostrar teclado
            this.editor.focus();
            this.showToast('⌨️ Teclado ativo');
        }
        
        // Feedback tátil
        if (navigator.vibrate) {
            navigator.vibrate(30);
        }
    }
    
    handleLongPress(event) {
        console.log('Pressionamento longo detectado');
        
        // Mostrar menu de contexto
        this.showContextMenu(event.changedTouches[0].clientX, event.changedTouches[0].clientY);
        
        // Feedback tátil
        if (navigator.vibrate) {
            navigator.vibrate(100);
        }
        
        event.preventDefault();
    }
    
    handleContextMenu(event) {
        // Prevenir menu de contexto padrão no mobile
        event.preventDefault();
        this.showContextMenu(event.clientX, event.clientY);
        return false;
    }
    
    showContextMenu(x, y) {
        // Criar menu de contexto
        const menu = document.createElement('div');
        menu.style.position = 'fixed';
        menu.style.left = `${x}px`;
        menu.style.top = `${y}px`;
        menu.style.background = '#2c3e50';
        menu.style.color = 'white';
        menu.style.padding = '10px';
        menu.style.borderRadius = '5px';
        menu.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        menu.style.zIndex = '10000';
        menu.style.minWidth = '150px';
        
        menu.innerHTML = `
            <div style="padding: 5px; border-bottom: 1px solid #34495e;">Ações</div>
            <button style="display: block; width: 100%; text-align: left; padding: 8px; background: none; border: none; color: white; cursor: pointer;" onclick="window.patikaEditor.saveProject()">
                💾 Salvar
            </button>
            <button style="display: block; width: 100%; text-align: left; padding: 8px; background: none; border: none; color: white; cursor: pointer;" onclick="window.patikaEditor.exportProject()">
                📥 Exportar
            </button>
            <button style="display: block; width: 100%; text-align: left; padding: 8px; background: none; border: none; color: white; cursor: pointer;" onclick="this.parentElement.remove()">
                ✕ Fechar
            </button>
        `;
        
        // Adicionar ao documento
        document.body.appendChild(menu);
        
        // Fechar ao clicar fora
        const closeMenu = (e) => {
            if (!menu.contains(e.target)) {
                menu.remove();
                document.removeEventListener('click', closeMenu);
                document.removeEventListener('touchstart', closeMenu);
            }
        };
        
        setTimeout(() => {
            document.addEventListener('click', closeMenu);
            document.addEventListener('touchstart', closeMenu);
        }, 100);
    }
    
    showToast(message) {
        // Remover toast anterior se existir
        const existingToast = document.querySelector('.patika-toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // Criar novo toast
        const toast = document.createElement('div');
        toast.className = 'patika-toast';
        toast.textContent = message;
        toast.style.cssText = `
            position: fixed;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            z-index: 10000;
            font-size: 14px;
            animation: fadeInOut 2s ease;
        `;
        
        // Adicionar animação
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
                10% { opacity: 1; transform: translateX(-50%) translateY(0); }
                90% { opacity: 1; transform: translateX(-50%) translateY(0); }
                100% { opacity: 0; transform: translateX(-50%) translateY(-20px); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(toast);
        
        // Remover após animação
        setTimeout(() => {
            toast.remove();
            style.remove();
        }, 2000);
    }
}

// Inicializar gestos de toque quando disponível
document.addEventListener('DOMContentLoaded', () => {
    const editor = document.getElementById('editor');
    if (editor && 'ontouchstart' in window) {
        window.touchGestures = new TouchGestures(editor);
    }
});

// Suporte para teclado virtual no iOS
document.addEventListener('focusin', (event) => {
    if (event.target.id === 'editor' && /iPhone|iPad|iPod/.test(navigator.userAgent)) {
        // Ajustar viewport para teclado virtual
        setTimeout(() => {
            event.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }, 300);
    }
});

// Prevenir bounce no iOS
document.addEventListener('touchmove', (event) => {
    if (event.target.id === 'editor') {
        event.preventDefault();
    }
}, { passive: false });
