// ============================================
// PATIKA - Editor Profissional de Roteiro
// Funcionalidades completas estilo Final Draft
// ============================================

// Estado da aplicação
let estado = {
    projetoAtual: null,
    secaoAtual: 'sinopse',
    subabaAtual: 'editor',
    projetos: [],
    autosaveTimer: null,
    historico: [],
    futuro: []
};

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    carregarProjetos();
    configurarAutoSave();
    atualizarContadorPalavras();
    configurarAtalhos();
    
    document.getElementById('conteudoTexto').addEventListener('input', function() {
        atualizarContadorPalavras();
        atualizarStatusSalvo('não salvo');
        adicionarAoHistorico();
    });
});

// ============================================
// PROJETOS (localStorage)
// ============================================
function carregarProjetos() {
    const projetosSalvos = localStorage.getItem('patika_projetos');
    if (projetosSalvos) {
        estado.projetos = JSON.parse(projetosSalvos);
    } else {
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
            },
            cenas: [],
            personagens: []
        }];
        salvarProjetos();
    }
    
    estado.projetoAtual = estado.projetos[0].id;
    carregarConteudoSecao();
    atualizarNomesProjeto();
}

function salvarProjetos() {
    localStorage.setItem('patika_projetos', JSON.stringify(estado.projetos));
}

function getProjetoAtual() {
    return estado.projetos.find(p => p.id === estado.projetoAtual);
}

function atualizarNomesProjeto() {
    const projeto = getProjetoAtual();
    if (projeto) {
        document.getElementById('projetoNome').textContent = '📁 ' + projeto.nome;
        document.getElementById('projetoNomeFooter').textContent = projeto.nome;
    }
}

function novoProjeto() {
    const nome = prompt('Nome do novo projeto:') || 'projeto_novo';
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
        },
        cenas: [],
        personagens: []
    };
    
    estado.projetos.unshift(projeto);
    estado.projetoAtual = projeto.id;
    salvarProjetos();
    carregarConteudoSecao();
    atualizarNomesProjeto();
}

// ============================================
// NAVEGAÇÃO ENTRE SEÇÕES
// ============================================
function mudarSecao(secao) {
    salvarConteudo();
    estado.secaoAtual = secao;
    carregarConteudoSecao();
    
    document.querySelectorAll('.tab-item').forEach(el => {
        el.classList.remove('ativa');
    });
    event.target.classList.add('ativa');
    document.getElementById('secaoTitulo').textContent = secao.toUpperCase();
}

function mudarSubaba(subaba) {
    estado.subabaAtual = subaba;
    
    document.querySelectorAll('.subtab-item').forEach(el => {
        el.classList.remove('ativa');
    });
    event.target.classList.add('ativa');
    
    // Aqui você pode adicionar lógica para cada subaba
    console.log('Subaba ativada:', subaba);
}

function carregarConteudoSecao() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    const textarea = document.getElementById('conteudoTexto');
    textarea.value = projeto.conteudos[estado.secaoAtual] || '';
    
    // Detectar elementos do roteiro automaticamente
    if (estado.secaoAtual === 'roteiro') {
        processarLinhasRoteiro();
    }
    
    atualizarContadorPalavras();
}

function salvarConteudo() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    const textarea = document.getElementById('conteudoTexto');
    projeto.conteudos[estado.secaoAtual] = textarea.value;
    salvarProjetos();
    atualizarStatusSalvo('salvo');
    document.getElementById('ultimoSalvo').textContent = 'agora';
}

// ============================================
// PROCESSAMENTO DE ROTEIRO (estilo Final Draft)
// ============================================
function processarLinhasRoteiro() {
    const projeto = getProjetoAtual();
    const texto = projeto.conteudos.roteiro || '';
    const linhas = texto.split('\n');
    
    let cenas = [];
    let cenaAtual = null;
    
    linhas.forEach((linha, index) => {
        const linhaTrim = linha.trim();
        
        // Detectar cabeçalho de cena
        if (linhaTrim.startsWith('INT.') || linhaTrim.startsWith('EXT.')) {
            if (cenaAtual) cenas.push(cenaAtual);
            cenaAtual = {
                id: 'cena_' + index,
                titulo: linhaTrim,
                linhas: [],
                numero: cenas.length + 1
            };
        }
        
        // Detectar personagem (linha em maiúsculo)
        if (linhaTrim === linhaTrim.toUpperCase() && linhaTrim.length > 0) {
            const nomePersonagem = linhaTrim;
            if (!projeto.personagens.some(p => p.nome === nomePersonagem)) {
                projeto.personagens.push({
                    nome: nomePersonagem,
                    falas: 0
                });
            }
        }
        
        if (cenaAtual) {
            cenaAtual.linhas.push(linhaTrim);
        }
    });
    
    if (cenaAtual) cenas.push(cenaAtual);
    projeto.cenas = cenas;
}

function detectarTipoLinha(texto) {
    if (texto === texto.toUpperCase()) return 'character';
    if (texto.startsWith('INT.') || texto.startsWith('EXT.')) return 'scene-heading';
    if (texto.startsWith('(') && texto.endsWith(')')) return 'parenthetical';
    if (texto.startsWith('CORTE PARA') || texto.startsWith('FADE')) return 'transition';
    return 'action';
}

// ============================================
// AUTO-SAVE
// ============================================
function configurarAutoSave() {
    if (estado.autosaveTimer) clearInterval(estado.autosaveTimer);
    estado.autosaveTimer = setInterval(salvarConteudo, 30000);
}

function atualizarStatusSalvo(status) {
    document.getElementById('salvoStatus').textContent = status;
}

// ============================================
// ATALHOS DE TECLADO (estilo Final Draft)
// ============================================
function configurarAtalhos() {
    document.addEventListener('keydown', function(e) {
        const textarea = document.getElementById('conteudoTexto');
        if (!textarea || document.activeElement !== textarea) return;
        
        // Ctrl+S - Salvar
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            salvarConteudo();
            mostrarNotificacao('💾 Projeto salvo!');
            return;
        }
        
        // Tab - Avançar para próximo tipo
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            textarea.value = textarea.value.substring(0, start) + '\t' + 
                              textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 1;
        }
        
        // Ctrl+Z - Undo
        if (e.ctrlKey && e.key === 'z') {
            e.preventDefault();
            desfazer();
        }
        
        // Ctrl+Shift+Z - Redo
        if (e.ctrlKey && e.shiftKey && e.key === 'Z') {
            e.preventDefault();
            refazer();
        }
        
        // Enter inteligente (detecta formatação)
        if (e.key === 'Enter') {
            const linha = textarea.value.substring(0, textarea.selectionStart).split('\n').pop();
            const linhaAnterior = textarea.value.split('\n').slice(-2)[0] || '';
            
            // Se linha anterior era personagem, manter formatação
            if (linhaAnterior === linhaAnterior.toUpperCase() && linhaAnterior.length > 0) {
                e.preventDefault();
                textarea.value = textarea.value.substring(0, textarea.selectionStart) + '\n' + 
                                 textarea.value.substring(textarea.selectionEnd);
                textarea.selectionStart = textarea.selectionEnd = textarea.selectionStart + 1;
            }
        }
    });
}

// ============================================
// HISTÓRICO (UNDO/REDO)
// ============================================
function adicionarAoHistorico() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    estado.historico.push({
        ...projeto.conteudos
    });
    
    if (estado.historico.length > 50) {
        estado.historico.shift();
    }
    estado.futuro = [];
}

function desfazer() {
    if (estado.historico.length === 0) return;
    
    const atual = getProjetoAtual();
    estado.futuro.push({...atual.conteudos});
    
    const anterior = estado.historico.pop();
    atual.conteudos = {...anterior};
    
    carregarConteudoSecao();
}

function refazer() {
    if (estado.futuro.length === 0) return;
    
    const atual = getProjetoAtual();
    estado.historico.push({...atual.conteudos});
    
    const proximo = estado.futuro.pop();
    atual.conteudos = {...proximo};
    
    carregarConteudoSecao();
}

// ============================================
// CONTADOR DE PALAVRAS
// ============================================
function atualizarContadorPalavras() {
    const texto = document.getElementById('conteudoTexto').value;
    const palavras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
    document.getElementById('statusPalavras').textContent = palavras + ' palavras';
}

function calcularTotalPalavras() {
    const projeto = getProjetoAtual();
    if (!projeto) return 0;
    
    let total = 0;
    Object.values(projeto.conteudos).forEach(texto => {
        if (texto) total += texto.trim().split(/\s+/).length;
    });
    return total;
}

function mostrarDetalhesPalavras() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    let detalhes = '';
    let total = 0;
    
    Object.entries(projeto.conteudos).forEach(([secao, texto]) => {
        const palavras = texto ? texto.trim().split(/\s+/).length : 0;
        total += palavras;
        detalhes += `${secao.toUpperCase()}: ${palavras} palavras\n`;
    });
    
    detalhes += `\nTOTAL: ${total} palavras`;
    
    if (projeto.cenas) {
        detalhes += `\nCENAS: ${projeto.cenas.length}`;
    }
    
    if (projeto.personagens) {
        detalhes += `\nPERSONAGENS: ${projeto.personagens.length}`;
    }
    
    alert(`📊 ESTATÍSTICAS DO PROJETO\n\n${detalhes}`);
}

// ============================================
// EXPORTAÇÃO E BACKUP
// ============================================
function exportarRoteiro() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    let conteudo = `${projeto.nome.toUpperCase()}\n`;
    conteudo += `${'='.repeat(projeto.nome.length)}\n\n`;
    
    Object.entries(projeto.conteudos).forEach(([secao, texto]) => {
        if (texto) {
            conteudo += `[${secao.toUpperCase()}]\n`;
            conteudo += `${'-'.repeat(secao.length + 2)}\n`;
            conteudo += texto + '\n\n';
        }
    });
    
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projeto.nome}_roteiro.txt`;
    a.click();
    URL.revokeObjectURL(url);
}

function carregarModelo() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    if (!confirm('Carregar modelo substituirá seu conteúdo atual. Continuar?')) return;
    
    projeto.conteudos = {
        sinopse: 'Sinopse: [história resumida]',
        argumento: 'ATO 1: Apresentação\nATO 2: Conflito\nATO 3: Resolução',
        escaleta: 'CENA 1 - INT. CASA - DIA\n- João chega\n\nCENA 2 - EXT. RUA - NOITE\n- Encontro',
        roteiro: 'INT. CASA - DIA\n\nJOÃO\nFala importante.\n\nMARIA\nResposta.',
        personagens: 'JOÃO\nIdade:\nPersonalidade:\n\nMARIA\nIdade:\nPersonalidade:'
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
                    carregarConteudoSecao();
                    atualizarNomesProjeto();
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
// CONFIGURAÇÕES DO PROJETO
// ============================================
function configurarProjeto() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    const novoNome = prompt('Novo nome do projeto:', projeto.nome);
    if (novoNome) {
        projeto.nome = novoNome;
        salvarProjetos();
        atualizarNomesProjeto();
        mostrarNotificacao('📁 Nome atualizado!');
    }
}

// ============================================
// NOTIFICAÇÕES
// ============================================
function mostrarNotificacao(mensagem) {
    const notificacao = document.createElement('div');
    notificacao.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 32px;
        background: var(--color-primary);
        color: white;
        padding: 12px 24px;
        border-radius: 4px;
        font-family: 'Inter', sans-serif;
        font-size: 0.9rem;
        z-index: 10000;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        animation: slideIn 0.3s;
    `;
    notificacao.textContent = mensagem;
    document.body.appendChild(notificacao);
    
    setTimeout(() => {
        notificacao.style.opacity = '0';
        setTimeout(() => notificacao.remove(), 300);
    }, 3000);
}

// ============================================
// EXPOSIÇÃO DAS FUNÇÕES
// ============================================
window.mudarSecao = mudarSecao;
window.mudarSubaba = mudarSubaba;
window.novoProjeto = novoProjeto;
window.salvarConteudo = salvarConteudo;
window.configurarProjeto = configurarProjeto;
window.exportarRoteiro = exportarRoteiro;
window.carregarModelo = carregarModelo;
window.mostrarDetalhesPalavras = mostrarDetalhesPalavras;
window.fazerBackup = fazerBackup;
window.restaurarBackup = restaurarBackup;
