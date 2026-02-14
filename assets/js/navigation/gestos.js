// ========================================
// SISTEMA DE NAVEGAÇÃO INTELIGENTE
// Botão voltar + gestos mobile
// Aplicado em todo o site
// ========================================

class NavegacaoGlobal {
    constructor() {
        this.historico = [];
        this.painelAberto = null;
        this.iniciar();
    }
    
    iniciar() {
        // Criar botão voltar flutuante
        this.criarBotaoVoltar();
        
        // Detectar gestos em mobile
        this.detectarGestos();
        
        // Gerenciar histórico de navegação
        this.gerenciarHistorico();
        
        console.log('✅ Sistema de navegação global ativo');
    }
    
    criarBotaoVoltar() {
        // Verificar se já existe
        if (document.getElementById('btn-voltar-global')) return;
        
        const btn = document.createElement('button');
        btn.id = 'btn-voltar-global';
        btn.innerHTML = '←';
        btn.setAttribute('aria-label', 'Voltar');
        btn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: #6c9a8f;
            color: #000;
            border: 2px solid #fff;
            font-size: 24px;
            font-weight: bold;
            cursor: pointer;
            z-index: 10000;
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0,0,0,0.3);
            transition: all 0.3s ease;
        `;
        
        btn.addEventListener('click', () => this.voltar());
        btn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.voltar();
        });
        
        document.body.appendChild(btn);
        this.botaoVoltar = btn;
    }
    
    mostrarBotaoVoltar(mostrar = true) {
        if (this.botaoVoltar) {
            this.botaoVoltar.style.display = mostrar ? 'flex' : 'none';
        }
    }
    
    detectarGestos() {
        let touchStartX = 0;
        let touchStartY = 0;
        let touchEndX = 0;
        let touchEndY = 0;
        
        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            touchEndY = e.changedTouches[0].screenY;
            
            const diffX = touchEndX - touchStartX;
            const diffY = touchEndY - touchStartY;
            
            // Swipe da esquerda para direita (voltar)
            if (diffX > 50 && Math.abs(diffY) < 50) {
                this.voltar();
            }
            
            // Swipe de cima para baixo (fechar painel)
            if (diffY > 50 && Math.abs(diffX) < 50) {
                this.fecharPainelAtual();
            }
        }, { passive: true });
    }
    
    gerenciarHistorico() {
        // Capturar todas as navegações por botões
        document.addEventListener('click', (e) => {
            if (e.target.matches('[onclick*="mostrarSobre"], [onclick*="mostrarPerfil"], [onclick*="mostrarTrabalho"], [onclick*="window.location.href"]')) {
                this.registrarNavegacao(e.target.innerText || 'navegação');
            }
        });
        
        // Botão voltar do navegador
        window.addEventListener('popstate', () => {
            this.voltar(true);
        });
        
        // Estado inicial
        history.replaceState({ page: 'home' }, '');
    }
    
    registrarNavegacao(destino) {
        this.historico.push({
            destino: destino,
            url: window.location.href,
            timestamp: Date.now()
        });
        
        this.mostrarBotaoVoltar(this.historico.length > 0);
        
        // Adicionar ao histórico do navegador
        history.pushState({ page: destino }, '', `#${destino.toLowerCase()}`);
    }
    
    voltar(doNavegador = false) {
        if (this.historico.length > 0) {
            if (!doNavegador) {
                this.historico.pop();
                history.back();
            }
            
            // Fechar painéis abertos
            this.fecharPainelAtual();
            
            // Esconder seções sobre/perfil
            const sobre = document.getElementById('secao-sobre');
            const perfil = document.getElementById('secao-perfil');
            if (sobre) sobre.style.display = 'none';
            if (perfil) perfil.style.display = 'none';
            
            // Rolar para o topo
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Feedback visual
            this.mostrarFeedback('← Voltando');
        }
        
        this.mostrarBotaoVoltar(this.historico.length > 0);
    }
    
    fecharPainelAtual() {
        const painel = document.getElementById('painel-trabalho');
        if (painel && painel.style.display === 'block') {
            painel.style.display = 'none';
            this.mostrarFeedback('⬇️ Painel fechado');
        }
    }
    
    mostrarFeedback(mensagem) {
        const feedback = document.createElement('div');
        feedback.textContent = mensagem;
        feedback.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #6c9a8f;
            color: #000;
            padding: 15px 30px;
            border-radius: 30px;
            font-family: 'Courier New', monospace;
            font-size: 16px;
            z-index: 10001;
            animation: fadeOut 1.5s forwards;
        `;
        
        document.body.appendChild(feedback);
        
        setTimeout(() => feedback.remove(), 1500);
    }
}

// Adicionar animação
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        0% { opacity: 1; transform: translate(-50%, -50%); }
        70% { opacity: 1; transform: translate(-50%, -50%); }
        100% { opacity: 0; transform: translate(-50%, -60%); }
    }
    
    @media (max-width: 768px) {
        #btn-voltar-global {
            bottom: 20px;
            right: 20px;
            width: 50px;
            height: 50px;
            font-size: 20px;
        }
    }
`;
document.head.appendChild(style);

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    window.navegacao = new NavegacaoGlobal();
});
