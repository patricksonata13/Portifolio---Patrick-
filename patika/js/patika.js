// ============================================
// PATIKA - Editor Profissional de Roteiro
// Banco de dados local - Funcionalidades completas
// Isolado do resto do site
// ============================================

// Estado da aplicação
let estado = {
    projetoAtual: null,
    secaoAtual: 'sinopse',
    projetos: [],
    autosaveTimer: null,
    dicas: [
        'Comece com uma sinopse de 1 parágrafo resumindo toda a história.',
        'No argumento, desenvolva cada ato em 2-3 parágrafos.',
        'Use a escaleta para listar todas as cenas em ordem.',
        'Personagens fortes têm desejos, medos e contradições.',
        'Todo bom roteiro tem começo, meio e fim bem definidos.',
        'Mostre, não conte. Use ações e diálogos para revelar emoções.',
        'Revise sempre. A primeira versão é só o começo.',
        'Leia seus diálogos em voz alta para testar o ritmo.',
        'Use INT. para cenas internas e EXT. para externas.',
        'Nomes de personagens em maiúsculo ajudam na leitura.'
    ]
};

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    carregarProjetos();
    configurarAutoSave();
    carregarDicaDoDia();
    atualizarContadorPalavras();
    carregarFerramentas();
    configurarAtalhosProfissionais();
    
    // Event listeners
    document.getElementById('conteudoTexto').addEventListener('input', function() {
        atualizarContadorPalavras();
        atualizarStatusSalvo('não salvo');
    });
});

// ============================================
// GERENCIAMENTO DE PROJETOS (Banco de dados local)
// ============================================

function carregarProjetos() {
    const projetosSalvos = localStorage.getItem('patika_projetos');
    if (projetosSalvos) {
        estado.projetos = JSON.parse(projetosSalvos);
    } else {
        // Projeto padrão
        estado.projetos = [{
            id: 'projeto_' + Date.now(),
            nome: 'projeto_sem_título',
            data: new Date().toISOString(),
            conteudos: {
                sinopse: 'Escreva aqui a sinopse da sua história...',
                argumento: '',
                escaleta: '',
                roteiro: '',
                personagens: ''
            }
        }];
        salvarProjetos();
    }
    
    estado.projetoAtual = estado.projetos[0].id;
    atualizarListaProjetos();
    carregarConteudoSecao();
    document.getElementById('projetoNome').textContent = '📁 ' + estado.projetos[0].nome;
}

function salvarProjetos() {
    localStorage.setItem('patika_projetos', JSON.stringify(estado.projetos));
}

function novoProjeto() {
    const nome = prompt('Nome do novo projeto:');
    if (!nome) return;
    
    const projeto = {
        id: 'projeto_' + Date.now(),
        nome: nome,
        data: new Date().toISOString(),
        conteudos: {
            sinopse: '',
            argumento: '',
            escaleta: '',
            roteiro: '',
            personagens: ''
        }
    };
    
    estado.projetos.unshift(projeto);
    estado.projetoAtual = projeto.id;
    salvarProjetos();
    atualizarListaProjetos();
    carregarConteudoSecao();
    document.getElementById('projetoNome').textContent = '📁 ' + projeto.nome;
}

function mudarProjeto(id) {
    estado.projetoAtual = id;
    const projeto = getProjetoAtual();
    document.getElementById('projetoNome').textContent = '📁 ' + projeto.nome;
    carregarConteudoSecao();
    atualizarListaProjetos();
}

function getProjetoAtual() {
    return estado.projetos.find(p => p.id === estado.projetoAtual);
}

function atualizarListaProjetos() {
    const lista = document.getElementById('listaProjetos');
    if (!lista) return;
    
    lista.innerHTML = estado.projetos.map(p => `
        <div class="projeto-item ${p.id === estado.projetoAtual ? 'ativo' : ''}" 
             onclick="mudarProjeto('${p.id}')">
            📁 ${p.nome}
        </div>
    `).join('');
}

// ============================================
// NAVEGAÇÃO ENTRE SEÇÕES
// ============================================

function mudarSecao(secao) {
    // Salvar conteúdo atual antes de mudar
    salvarConteudo();
    
    estado.secaoAtual = secao;
    carregarConteudoSecao();
    
    // Atualizar UI
    document.querySelectorAll('.etapa-item').forEach(el => {
        el.classList.remove('ativa');
    });
    
    // Encontrar e ativar a etapa correta
    const etapas = document.querySelectorAll('.etapa-item');
    const indices = { 'sinopse': 0, 'argumento': 1, 'escaleta': 2, 'roteiro': 3, 'personagens': 4 };
    if (etapas[indices[secao]]) {
        etapas[indices[secao]].classList.add('ativa');
    }
    
    const titulo = document.getElementById('secaoTitulo');
    if (titulo) titulo.textContent = secao.toUpperCase();
}

function carregarConteudoSecao() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    const conteudo = projeto.conteudos[estado.secaoAtual] || '';
    const textarea = document.getElementById('conteudoTexto');
    if (textarea) textarea.value = conteudo;
    atualizarContadorPalavras();
}

function salvarConteudo() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    const textarea = document.getElementById('conteudoTexto');
    if (textarea) {
        projeto.conteudos[estado.secaoAtual] = textarea.value;
        salvarProjetos();
        atualizarStatusSalvo('✓ salvo');
        
        const ultimoSalvo = document.getElementById('ultimoSalvo');
        if (ultimoSalvo) ultimoSalvo.textContent = 'último salvamento: agora';
    }
}

// ============================================
// AUTO-SAVE (a cada 30 segundos)
// ============================================

function configurarAutoSave() {
    if (estado.autosaveTimer) {
        clearInterval(estado.autosaveTimer);
    }
    
    estado.autosaveTimer = setInterval(() => {
        salvarConteudo();
    }, 30000); // 30 segundos
}

function atualizarStatusSalvo(status) {
    const statusEl = document.getElementById('salvoStatus');
    if (statusEl) statusEl.textContent = status;
}

// ============================================
// ATALHOS PROFISSIONAIS
// ============================================

function configurarAtalhosProfissionais() {
    document.addEventListener('keydown', function(e) {
        const textarea = document.getElementById('conteudoTexto');
        if (!textarea || document.activeElement !== textarea) return;
        
        // Ctrl+S para salvar
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            salvarConteudo();
            mostrarNotificacao('💾 Projeto salvo!');
            return;
        }
        
        // Tab para avançar (formatação profissional)
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 1;
            return;
        }
        
        // Enter inteligente (mantém formatação)
        if (e.key === 'Enter') {
            const linha = textarea.value.substring(0, textarea.selectionStart).split('\n').pop();
            const linhaAnterior = textarea.value.split('\n').slice(-2)[0] || '';
            
            // Se linha anterior estava em maiúsculo, manter formatação
            if (linhaAnterior.trim() === linhaAnterior.toUpperCase() && linhaAnterior.length > 0) {
                e.preventDefault();
                textarea.value = textarea.value.substring(0, textarea.selectionStart) + '\n' + textarea.value.substring(textarea.selectionEnd);
                textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart + 1;
            }
        }
    });
}

// ============================================
// FERRAMENTAS DE FORMATAÇÃO
// ============================================

function inserirCena() {
    const textarea = document.getElementById('conteudoTexto');
    if (!textarea) return;
    
    const cursorPos = textarea.selectionStart;
    const cenaTemplate = `\n\nINT. LOCAL - DIA\n\n`;
    
    textarea.value = textarea.value.slice(0, cursorPos) + cenaTemplate + textarea.value.slice(cursorPos);
    textarea.selectionStart = textarea.selectionEnd = cursorPos + cenaTemplate.length;
    salvarConteudo();
    textarea.focus();
}

function inserirPersonagem() {
    const textarea = document.getElementById('conteudoTexto');
    if (!textarea) return;
    
    const cursorPos = textarea.selectionStart;
    const personagemTemplate = `\nPERSONAGEM\n`;
    
    textarea.value = textarea.value.slice(0, cursorPos) + personagemTemplate + textarea.value.slice(cursorPos);
    textarea.selectionStart = textarea.selectionEnd = cursorPos + personagemTemplate.length;
    salvarConteudo();
    textarea.focus();
}

function inserirDialogo() {
    const textarea = document.getElementById('conteudoTexto');
    if (!textarea) return;
    
    const cursorPos = textarea.selectionStart;
    const dialogoTemplate = `\n\tFala do personagem.\n`;
    
    textarea.value = textarea.value.slice(0, cursorPos) + dialogoTemplate + textarea.value.slice(cursorPos);
    textarea.selectionStart = textarea.selectionEnd = cursorPos + dialogoTemplate.length;
    salvarConteudo();
    textarea.focus();
}

function inserirParentese() {
    const textarea = document.getElementById('conteudoTexto');
    if (!textarea) return;
    
    const cursorPos = textarea.selectionStart;
    const parenteseTemplate = `\n\t(com raiva)\n`;
    
    textarea.value = textarea.value.slice(0, cursorPos) + parenteseTemplate + textarea.value.slice(cursorPos);
    textarea.selectionStart = textarea.selectionEnd = cursorPos + parenteseTemplate.length;
    salvarConteudo();
    textarea.focus();
}

function inserirTransicao() {
    const textarea = document.getElementById('conteudoTexto');
    if (!textarea) return;
    
    const cursorPos = textarea.selectionStart;
    const transicaoTemplate = `\nCORTE PARA:\n`;
    
    textarea.value = textarea.value.slice(0, cursorPos) + transicaoTemplate + textarea.value.slice(cursorPos);
    textarea.selectionStart = textarea.selectionEnd = cursorPos + transicaoTemplate.length;
    salvarConteudo();
    textarea.focus();
}

// ============================================
// CONTADOR DE PALAVRAS
// ============================================

function atualizarContadorPalavras() {
    const textarea = document.getElementById('conteudoTexto');
    if (!textarea) return;
    
    const texto = textarea.value;
    const palavras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
    const caracteres = texto.length;
    
    const statusPalavras = document.getElementById('statusPalavras');
    if (statusPalavras) {
        statusPalavras.textContent = `${palavras} palavras · ${caracteres} caracteres`;
    }
    
    // Atualizar total de palavras do projeto
    const totalPalavras = calcularTotalPalavras();
    const totalEl = document.getElementById('totalPalavras');
    if (totalEl) totalEl.textContent = totalPalavras;
    
    // Calcular progresso (estimativa de 500 palavras por seção = 2500 total)
    const progresso = Math.min(100, Math.round((totalPalavras / 2500) * 100));
    const progressoEl = document.getElementById('progresso');
    if (progressoEl) progressoEl.textContent = progresso + '%';
}

function calcularTotalPalavras() {
    const projeto = getProjetoAtual();
    if (!projeto) return 0;
    
    let total = 0;
    Object.values(projeto.conteudos).forEach(texto => {
        if (texto) {
            total += texto.trim().split(/\s+/).length;
        }
    });
    return total;
}

function mostrarDetalhesPalavras() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    const detalhes = [];
    let total = 0;
    
    Object.entries(projeto.conteudos).forEach(([secao, texto]) => {
        const palavras = texto ? texto.trim().split(/\s+/).length : 0;
        total += palavras;
        detalhes.push(`${secao}: ${palavras} palavras`);
    });
    
    alert(`📊 DETALHES DE PALAVRAS\n\n${detalhes.join('\n')}\n\nTOTAL: ${total} palavras`);
}

// ============================================
// EXPORTAÇÃO E BACKUP
// ============================================

function exportarRoteiro() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    let conteudo = `${projeto.nome.toUpperCase()}\n`;
    conteudo += `Data: ${new Date().toLocaleDateString()}\n`;
    conteudo += `Total de palavras: ${calcularTotalPalavras()}\n`;
    conteudo += `\n${'='.repeat(50)}\n\n`;
    
    const secoes = ['sinopse', 'argumento', 'escaleta', 'roteiro', 'personagens'];
    secoes.forEach(secao => {
        const texto = projeto.conteudos[secao] || '';
        if (texto) {
            conteudo += `[${secao.toUpperCase()}]\n`;
            conteudo += `${'-'.repeat(secao.length + 2)}\n`;
            conteudo += texto + '\n\n';
        }
    });
    
    // Criar arquivo para download
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projeto.nome.replace(/\s+/g, '_')}_roteiro.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    mostrarNotificacao('📄 Roteiro exportado!');
}

function carregarModelo() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    if (!confirm('Carregar modelo substituirá seu conteúdo atual. Continuar?')) return;
    
    projeto.conteudos = {
        sinopse: 'Uma história sobre [personagem principal] que [conflito principal] em [cenário].',
        argumento: 'ATO 1: Apresentação do personagem e seu mundo.\nATO 2: Conflito se desenvolve.\nATO 3: Resolução.',
        escaleta: 'CENA 1 - Local - Dia\n- Ação inicial\n- Apresentação do personagem\n\nCENA 2 - Local - Noite\n- Conflito começa',
        roteiro: 'INT. LOCAL - DIA\n\nPERSONAGEM\nFala importante.\n\nOUTRO PERSONAGEM\nResposta.',
        personagens: 'Nome:\nIdade:\nProfissão:\nPersonalidade:\nObjetivo:'
    };
    
    salvarProjetos();
    carregarConteudoSecao();
    mostrarNotificacao('📋 Modelo carregado!');
}

function fazerBackup() {
    const backup = {
        data: new Date().toISOString(),
        projetos: estado.projetos
    };
    
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patika_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    mostrarNotificacao('💾 Backup salvo!');
}

function restaurarBackup() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const backup = JSON.parse(e.target.result);
                if (backup.projetos) {
                    estado.projetos = backup.projetos;
                    estado.projetoAtual = estado.projetos[0].id;
                    salvarProjetos();
                    atualizarListaProjetos();
                    carregarConteudoSecao();
                    mostrarNotificacao('✅ Backup restaurado!');
                }
            } catch (error) {
                alert('❌ Arquivo de backup inválido');
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

// ============================================
// FERRAMENTAS ADICIONAIS
// ============================================

function carregarFerramentas() {
    const container = document.getElementById('ferramentasContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="ferramenta-item">
            <span>🎬 Inserir Cena</span>
            <button class="ferramenta-btn" onclick="inserirCena()">INT/EXT</button>
        </div>
        <div class="ferramenta-item">
            <span>👤 Inserir Personagem</span>
            <button class="ferramenta-btn" onclick="inserirPersonagem()">Inserir</button>
        </div>
        <div class="ferramenta-item">
            <span>💬 Inserir Diálogo</span>
            <button class="ferramenta-btn" onclick="inserirDialogo()">Inserir</button>
        </div>
        <div class="ferramenta-item">
            <span>( ) Direção</span>
            <button class="ferramenta-btn" onclick="inserirParentese()">Inserir</button>
        </div>
        <div class="ferramenta-item">
            <span>⏩ Transição</span>
            <button class="ferramenta-btn" onclick="inserirTransicao()">Inserir</button>
        </div>
        <div class="ferramenta-item">
            <span>📄 Exportar</span>
            <button class="ferramenta-btn" onclick="exportarRoteiro()">TXT</button>
        </div>
        <div class="ferramenta-item">
            <span>📋 Modelo</span>
            <button class="ferramenta-btn" onclick="carregarModelo()">Carregar</button>
        </div>
        <div class="ferramenta-item">
            <span>📊 Detalhes</span>
            <button class="ferramenta-btn" onclick="mostrarDetalhesPalavras()">Palavras</button>
        </div>
        <div class="ferramenta-item">
            <span>💾 Backup</span>
            <button class="ferramenta-btn" onclick="fazerBackup()">Salvar</button>
        </div>
    `;
}

function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--verde-principal);
        color: white;
        padding: 15px 25px;
        border-radius: 8px;
        font-family: 'Courier New', monospace;
        z-index: 10000;
        animation: slideIn 0.3s;
    `;
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// ============================================
// DICAS DO DIA
// ============================================

function carregarDicaDoDia() {
    const dicaHoje = estado.dicas[new Date().getDay() % estado.dicas.length];
    const dicaEl = document.getElementById('dicaDoDia');
    if (dicaEl) dicaEl.textContent = dicaHoje;
}

// ============================================
// CONFIGURAÇÕES DO PROJETO
// ============================================

function configurarProjeto() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    const novoNome = prompt('Novo nome do projeto:', projeto.nome);
    if (novoNome) {
        projeto.nome = novoNome;
        salvarProjetos();
        document.getElementById('projetoNome').textContent = '📁 ' + novoNome;
        atualizarListaProjetos();
    }
}

// ============================================
// EXPOSIÇÃO DAS FUNÇÕES PARA O ESCOPO GLOBAL
// ============================================
window.mudarSecao = mudarSecao;
window.novoProjeto = novoProjeto;
window.mudarProjeto = mudarProjeto;
window.salvarConteudo = salvarConteudo;
window.configurarProjeto = configurarProjeto;
window.inserirCena = inserirCena;
window.inserirPersonagem = inserirPersonagem;
window.inserirDialogo = inserirDialogo;
window.inserirParentese = inserirParentese;
window.inserirTransicao = inserirTransicao;
window.exportarRoteiro = exportarRoteiro;
window.carregarModelo = carregarModelo;
window.mostrarDetalhesPalavras = mostrarDetalhesPalavras;
window.fazerBackup = fazerBackup;
window.restaurarBackup = restaurarBackup;
