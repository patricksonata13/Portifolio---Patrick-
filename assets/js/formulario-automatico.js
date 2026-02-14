// SISTEMA DE FORMULÁRIO AUTOMÁTICO - PATRICK SONATA
<<<<<<< HEAD
// Integração com Airtable + E-mails automáticos
// CONFIGURAÇÕES - PREENCHIDAS!
// Base ID: app1lUWbmq98n18cA
this.token = '';  // Token será carregado do arquivo local
class FormularioAutomatico {
constructor() {
    // Valores serão carregados do ambiente
    this.baseId = window.AIRTABLE_BASE_ID || 'app1lUWbmq98n18cA';  // 
fallback local
    this.tableName = window.AIRTABLE_TABLE_NAME || 'Contatos';
    this.token = window.AIRTABLE_TOKEN || '';
    this.init();
}    
=======
// Integração com Airtable (seguro - token fica local)

class FormularioAutomatico {
    constructor() {
        // Tenta carregar configuração local (se existir)
        this.baseId = 'app1lUWbmq98n18cA';  // ID público - pode ficar
        this.tableName = 'Contatos';         // Nome público - pode ficar
        this.token = '';                      // Token vazio no GitHub!
        
        // Se existir config local, usa ela
        if (typeof window.AIRTABLE_CONFIG !== 'undefined') {
            this.baseId = window.AIRTABLE_CONFIG.baseId || this.baseId;
            this.tableName = window.AIRTABLE_CONFIG.tableName || this.tableName;
            this.token = window.AIRTABLE_CONFIG.token || '';
        }
        
        this.init();
    }
    
>>>>>>> 7af88eb1b3e7043611666f7dac977e11de7c6e90
    init() {
        this.criarFormulario();
    }
    
    criarFormulario() {
        // Verificar se já existe formulário na página
        if (document.getElementById('formulario-contato-automatico')) return;
        
<<<<<<< HEAD
=======
        // Só criar se estiver na página de contato
        if (!window.location.pathname.includes('contato')) return;
        
>>>>>>> 7af88eb1b3e7043611666f7dac977e11de7c6e90
        // Criar container do formulário
        const container = document.createElement('div');
        container.id = 'formulario-contato-automatico';
        container.style.cssText = `
            background: #111;
            padding: 30px;
            border: 2px solid #6c9a8f;
            border-radius: 10px;
            max-width: 500px;
            margin: 40px auto;
            font-family: 'Courier New', monospace;
        `;
        
        container.innerHTML = `
            <h3 style="color: #6c9a8f; text-align: center; margin-bottom: 20px; font-size: 1.5rem;">
                📬 FALE COMIGO
            </h3>
            
            <form id="form-airtable">
                <div style="margin-bottom: 15px;">
                    <label style="color: #aaa; display: block; margin-bottom: 5px;">Seu nome</label>
                    <input type="text" id="form-nome" required
                           style="width: 100%; padding: 12px; background: #222; border: 1px solid #333; color: white; border-radius: 5px;">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="color: #aaa; display: block; margin-bottom: 5px;">Seu e-mail</label>
                    <input type="email" id="form-email" required
                           style="width: 100%; padding: 12px; background: #222; border: 1px solid #333; color: white; border-radius: 5px;">
                </div>
                
                <div style="margin-bottom: 15px;">
                    <label style="color: #aaa; display: block; margin-bottom: 5px;">Sua mensagem</label>
                    <textarea id="form-mensagem" rows="5" required
                              style="width: 100%; padding: 12px; background: #222; border: 1px solid #333; color: white; border-radius: 5px;"></textarea>
                </div>
                
                <button type="submit" id="btn-submit-form"
                        style="width: 100%; padding: 15px; background: #6c9a8f; color: #000; border: none; border-radius: 5px; font-weight: bold; cursor: pointer; transition: all 0.3s; font-size: 1rem;">
                    📨 ENVIAR MENSAGEM
                </button>
            </form>
            
            <div id="form-status" style="margin-top: 15px; text-align: center; color: #6c9a8f;"></div>
        `;
        
<<<<<<< HEAD
        // Adicionar apenas se estiver na página de contato
        if (window.location.pathname.includes('contato')) {
            // Tentar encontrar o container principal
            const mainContainer = document.querySelector('.main-container') || document.body;
            mainContainer.appendChild(container);
        }
=======
        // Adicionar ao final da página de contato
        const contatoPage = document.querySelector('.main-container') || document.body;
        contatoPage.appendChild(container);
>>>>>>> 7af88eb1b3e7043611666f7dac977e11de7c6e90
        
        // Adicionar evento de submit
        document.getElementById('form-airtable')?.addEventListener('submit', (e) => this.enviarFormulario(e));
    }
    
    async enviarFormulario(event) {
        event.preventDefault();
        
<<<<<<< HEAD
=======
        // Se não tiver token, mostra mensagem amigável
        if (!this.token) {
            document.getElementById('form-status').innerHTML = '⚠️ Formulário disponível apenas em ambiente local.';
            return;
        }
        
>>>>>>> 7af88eb1b3e7043611666f7dac977e11de7c6e90
        const btn = document.getElementById('btn-submit-form');
        const status = document.getElementById('form-status');
        const form = document.getElementById('form-airtable');
        
<<<<<<< HEAD
        // Desabilitar botão durante envio
        btn.disabled = true;
        btn.textContent = '⏳ Enviando...';
        
        // Coletar dados
=======
        btn.disabled = true;
        btn.textContent = '⏳ Enviando...';
        
>>>>>>> 7af88eb1b3e7043611666f7dac977e11de7c6e90
        const dados = {
            nome: document.getElementById('form-nome').value,
            email: document.getElementById('form-email').value,
            mensagem: document.getElementById('form-mensagem').value,
            data: new Date().toLocaleString('pt-BR'),
<<<<<<< HEAD
            pagina: window.location.pathname,
            origem: window.location.hostname
        };
        
        try {
            // Enviar para Airtable
=======
            pagina: window.location.pathname
        };
        
        try {
>>>>>>> 7af88eb1b3e7043611666f7dac977e11de7c6e90
            const response = await fetch(`https://api.airtable.com/v0/${this.baseId}/${this.tableName}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    records: [{
                        fields: {
                            'Nome': dados.nome,
                            'Email': dados.email,
                            'Mensagem': dados.mensagem,
                            'Data': dados.data,
<<<<<<< HEAD
                            'Página': dados.pagina,
                            'Origem': dados.origem,
                            'Status': 'Novo'
=======
                            'Página': dados.pagina
>>>>>>> 7af88eb1b3e7043611666f7dac977e11de7c6e90
                        }
                    }]
                })
            });
            
            if (response.ok) {
<<<<<<< HEAD
                status.innerHTML = '✅ Mensagem enviada com sucesso! Em breve responderei.';
                form.reset();
                this.mostrarNotificacao('📬 Mensagem recebida!');
            } else {
                const erro = await response.text();
                console.error('Erro Airtable:', erro);
=======
                status.innerHTML = '✅ Mensagem enviada com sucesso!';
                form.reset();
                this.mostrarNotificacao('📬 Mensagem recebida!');
            } else {
>>>>>>> 7af88eb1b3e7043611666f7dac977e11de7c6e90
                throw new Error('Erro no envio');
            }
            
        } catch (error) {
<<<<<<< HEAD
            console.error('Erro:', error);
=======
>>>>>>> 7af88eb1b3e7043611666f7dac977e11de7c6e90
            status.innerHTML = '❌ Erro ao enviar. Tente novamente.';
            this.mostrarNotificacao('❌ Falha no envio');
        }
        
<<<<<<< HEAD
        // Reativar botão
        btn.disabled = false;
        btn.textContent = '📨 ENVIAR MENSAGEM';
        
        // Limpar status após 5 segundos
=======
        btn.disabled = false;
        btn.textContent = '📨 ENVIAR MENSAGEM';
>>>>>>> 7af88eb1b3e7043611666f7dac977e11de7c6e90
        setTimeout(() => status.innerHTML = '', 5000);
    }
    
    mostrarNotificacao(mensagem) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            bottom: 120px;
            right: 30px;
            background: #6c9a8f;
            color: #000;
            padding: 15px 25px;
            border-radius: 10px;
            font-family: 'Courier New', monospace;
            font-weight: bold;
            box-shadow: 0 4px 20px rgba(108, 154, 143, 0.5);
            z-index: 1000000;
            opacity: 1;
            transition: opacity 0.3s;
        `;
        notif.textContent = mensagem;
        document.body.appendChild(notif);
        
        setTimeout(() => {
            notif.style.opacity = '0';
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }
}

// Inicializar quando página carregar
let formularioAuto;
document.addEventListener('DOMContentLoaded', () => {
    formularioAuto = new FormularioAutomatico();
});
