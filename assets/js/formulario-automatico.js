// SISTEMA DE FORMULÁRIO AUTOMÁTICO - PATRICK SONATA
class FormularioAutomatico {
    constructor() {
        this.baseId = 'app1lUWbmq98n18cA';
        this.tableName = 'Contatos';
        this.token = '';  // Token será carregado localmente
        this.init();
    }
    
    init() {
        this.carregarConfigLocal();
        this.criarFormulario();
    }
    
    carregarConfigLocal() {
        if (typeof window.AIRTABLE_CONFIG !== 'undefined') {
            this.token = window.AIRTABLE_CONFIG.token || '';
        }
    }
    
    criarFormulario() {
        if (document.getElementById('formulario-contato-automatico')) return;
        if (!window.location.pathname.includes('contato')) return;
        
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
        
        const mainContainer = document.querySelector('.main-container') || document.body;
        mainContainer.appendChild(container);
        
        document.getElementById('form-airtable').addEventListener('submit', (e) => this.enviarFormulario(e));
    }
    
    async enviarFormulario(event) {
        event.preventDefault();
        
        const status = document.getElementById('form-status');
        
        if (!this.token) {
            status.innerHTML = '⚠️ Formulário disponível apenas em ambiente local.';
            return;
        }
        
        const btn = document.getElementById('btn-submit-form');
        const form = document.getElementById('form-airtable');
        
        btn.disabled = true;
        btn.textContent = '⏳ Enviando...';
        
        const dados = {
            nome: document.getElementById('form-nome').value,
            email: document.getElementById('form-email').value,
            mensagem: document.getElementById('form-mensagem').value,
            data: new Date().toLocaleString('pt-BR')
        };
        
        try {
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
                            'Data': dados.data
                        }
                    }]
                })
            });
            
            if (response.ok) {
                status.innerHTML = '✅ Mensagem enviada com sucesso!';
                form.reset();
            } else {
                throw new Error('Erro no envio');
            }
            
        } catch (error) {
            status.innerHTML = '❌ Erro ao enviar. Tente novamente.';
        }
        
        btn.disabled = false;
        btn.textContent = '📨 ENVIAR MENSAGEM';
        setTimeout(() => status.innerHTML = '', 5000);
    }
}

let formularioAuto;
document.addEventListener('DOMContentLoaded', () => {
    formularioAuto = new FormularioAutomatico();
});
