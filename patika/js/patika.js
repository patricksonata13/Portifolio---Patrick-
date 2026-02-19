// ============================================
// PATIKA - Plataforma de Desenvolvimento de Roteiro
// FUNCIONALIDADES COMPLETAS - ISOLADA DO RESTO DO SITE
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
        'Leia seus diálogos em voz alta para testar o ritmo.'
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
    
    // Event listeners
    document.getElementById('conteudoTexto').addEventListener('input', function() {
        atualizarContadorPalavras();
        atualizarStatusSalvo('não salvo');
    });
    
    // Ctrl+S para salvar
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            salvarConteudo();
        }
    });
});

// ============================================
// GERENCIAMENTO DE PROJETOS
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
// AUTO-SAVE
// ============================================

function configurarAutoSave() {
    if (estado.autosaveTimer) {
        clearInterval(estado.autosaveTimer);
    }
    
    estado.autosaveTimer = setInterval(() => {
        salvarConteudo();
    }, 30000); // Auto-save a cada 30 segundos
}

function atualizarStatusSalvo(status) {
    const statusEl = document.getElementById('salvoStatus');
    if (statusEl) statusEl.textContent = status;
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

// ============================================
// FERRAMENTAS ADICIONAIS
// ============================================

function carregarFerramentas() {
    const container = document.getElementById('ferramentasContainer');
    if (!container) return;
    
    container.innerHTML = `
        <div class="ferramenta-item">
            <span>📄 Exportar PDF</span>
            <button class="ferramenta-btn" onclick="exportarPDF()">Gerar</button>
        </div>
        <div class="ferramenta-item">
            <span>📋 Modelo de Roteiro</span>
            <button class="ferramenta-btn" onclick="carregarModelo()">Carregar</button>
        </div>
        <div class="ferramenta-item">
            <span>🔍 Contar Palavras</span>
            <button class="ferramenta-btn" onclick="mostrarDetalhesPalavras()">Detalhes</button>
        </div>
        <div class="ferramenta-item">
            <span>💾 Backup</span>
            <button class="ferramenta-btn" onclick="fazerBackup()">Salvar</button>
        </div>
    `;
}

function exportarPDF() {
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
            conteudo += `${secao.toUpperCase()}\n`;
            conteudo += `${'-'.repeat(secao.length)}\n`;
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
    
    mostrarNotificacao('📄 PDF (TXT) exportado!');
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
// EXPORTAÇÃO DE FUNÇÕES PARA O ESCOPO GLOBAL
// ============================================
window.mudarSecao = mudarSecao;
window.novoProjeto = novoProjeto;
window.mudarProjeto = mudarProjeto;
window.salvarConteudo = salvarConteudo;
window.exportarPDF = exportarPDF;
window.configurarProjeto = configurarProjeto;
window.carregarModelo = carregarModelo;
window.mostrarDetalhesPalavras = mostrarDetalhesPalavras;
window.fazerBackup = fazerBackup;
window.restaurarBackup = restaurarBackup;

// ============================================
// FUNCIONALIDADES INSPIRADAS NO CELTX E FINAL DRAFT
// ============================================

// ============================================
// FORMATAÇÃO AUTOMÁTICA DE ROTEIRO
// ============================================

function aplicarFormatacaoCena() {
    const textarea = document.getElementById('conteudoTexto');
    if (!textarea) return;
    
    const texto = textarea.value;
    const cursorPos = textarea.selectionStart;
    
    // Inserir cabeçalho de cena
    const cenaNum = contarCenas(texto) + 1;
    const cenaTemplate = `\n\nINT. LOCAL - DIA\n\n`;
    
    textarea.value = texto.slice(0, cursorPos) + cenaTemplate + texto.slice(cursorPos);
    textarea.selectionStart = textarea.selectionEnd = cursorPos + cenaTemplate.length;
    
    salvarConteudo();
}

function aplicarFormatacaoPersonagem() {
    const textarea = document.getElementById('conteudoTexto');
    if (!textarea) return;
    
    const texto = textarea.value;
    const cursorPos = textarea.selectionStart;
    
    // Inserir nome do personagem
    const personagemTemplate = `\nPERSONAGEM\n`;
    
    textarea.value = texto.slice(0, cursorPos) + personagemTemplate + texto.slice(cursorPos);
    textarea.selectionStart = textarea.selectionEnd = cursorPos + personagemTemplate.length;
    
    salvarConteudo();
}

function aplicarFormatacaoDialogo() {
    const textarea = document.getElementById('conteudoTexto');
    if (!textarea) return;
    
    const texto = textarea.value;
    const cursorPos = textarea.selectionStart;
    
    // Inserir diálogo
    const dialogoTemplate = `\n\tFala do personagem.\n`;
    
    textarea.value = texto.slice(0, cursorPos) + dialogoTemplate + texto.slice(cursorPos);
    textarea.selectionStart = textarea.selectionEnd = cursorPos + dialogoTemplate.length;
    
    salvarConteudo();
}

function aplicarFormatacaoParentese() {
    const textarea = document.getElementById('conteudoTexto');
    if (!textarea) return;
    
    const texto = textarea.value;
    const cursorPos = textarea.selectionStart;
    
    // Inserir parentese
    const parenteseTemplate = `\n\t(com raiva)\n`;
    
    textarea.value = texto.slice(0, cursorPos) + parenteseTemplate + texto.slice(cursorPos);
    textarea.selectionStart = textarea.selectionEnd = cursorPos + parenteseTemplate.length;
    
    salvarConteudo();
}

function aplicarFormatacaoTransicao() {
    const textarea = document.getElementById('conteudoTexto');
    if (!textarea) return;
    
    const texto = textarea.value;
    const cursorPos = textarea.selectionStart;
    
    // Inserir transição
    const transicaoTemplate = `\nCORTE PARA:\n`;
    
    textarea.value = texto.slice(0, cursorPos) + transicaoTemplate + texto.slice(cursorPos);
    textarea.selectionStart = textarea.selectionEnd = cursorPos + transicaoTemplate.length;
    
    salvarConteudo();
}

// ============================================
// CONTAGEM DE CENAS E ESTATÍSTICAS
// ============================================

function contarCenas(texto = null) {
    if (texto === null) {
        const projeto = getProjetoAtual();
        if (!projeto) return 0;
        texto = projeto.conteudos.roteiro || '';
    }
    
    // Padrões de cabeçalho de cena
    const padroes = [
        /INT\.\s+[A-Z\s]+\s+-\s+[A-Z\s]+/gi,
        /EXT\.\s+[A-Z\s]+\s+-\s+[A-Z\s]+/gi,
        /INT\.\/EXT\.\s+[A-Z\s]+\s+-\s+[A-Z\s]+/gi
    ];
    
    let total = 0;
    padroes.forEach(padrao => {
        const matches = texto.match(padrao);
        if (matches) total += matches.length;
    });
    
    return total;
}

function contarFalas(texto = null) {
    if (texto === null) {
        const projeto = getProjetoAtual();
        if (!projeto) return 0;
        texto = projeto.conteudos.roteiro || '';
    }
    
    // Padrão para falas (nomes em maiúsculo seguidos de quebra de linha)
    const padrao = /^[A-ZÀ-Ú\s]{2,}$/gm;
    const matches = texto.match(padrao);
    return matches ? matches.length : 0;
}

function contarPersonagens() {
    const projeto = getProjetoAtual();
    if (!projeto) return [];
    
    const texto = projeto.conteudos.roteiro || '';
    const personagens = new Map();
    
    // Extrair nomes de personagens (linhas em maiúsculo)
    const linhas = texto.split('\n');
    linhas.forEach(linha => {
        const nome = linha.trim();
        if (nome.length > 0 && nome === nome.toUpperCase() && nome.length < 30) {
            // Ignorar cabeçalhos de cena
            if (!nome.includes('INT.') && !nome.includes('EXT.')) {
                const count = personagens.get(nome) || 0;
                personagens.set(nome, count + 1);
            }
        }
    });
    
    return Array.from(personagens.entries()).map(([nome, falas]) => ({
        nome,
        falas,
        primeiroAto: 'Ato 1' // Simplificado
    }));
}

function gerarRelatorioCenas() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    const texto = projeto.conteudos.roteiro || '';
    const linhas = texto.split('\n');
    const cenas = [];
    let cenaAtual = null;
    
    linhas.forEach(linha => {
        if (linha.includes('INT.') || linha.includes('EXT.')) {
            if (cenaAtual) cenas.push(cenaAtual);
            cenaAtual = {
                cabecalho: linha.trim(),
                personagens: [],
                conteudo: []
            };
        } else if (cenaAtual) {
            cenaAtual.conteudo.push(linha);
            // Detectar personagens (linhas em maiúsculo)
            const linhaTrim = linha.trim();
            if (linhaTrim.length > 0 && linhaTrim === linhaTrim.toUpperCase() && linhaTrim.length < 30) {
                if (!linhaTrim.includes('INT.') && !linhaTrim.includes('EXT.')) {
                    cenaAtual.personagens.push(linhaTrim);
                }
            }
        }
    });
    
    if (cenaAtual) cenas.push(cenaAtual);
    
    // Criar modal de relatório
    const modal = document.createElement('div');
    modal.className = 'export-modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="export-modal-content">
            <h3>📊 RELATÓRIO DE CENAS</h3>
            <p>Total de cenas: ${cenas.length}</p>
            <div style="max-height: 400px; overflow-y: auto;">
                ${cenas.map((cena, i) => `
                    <div style="margin: 10px 0; padding: 10px; background: #f5f0e8; border-radius: 5px;">
                        <strong>Cena ${i+1}</strong><br>
                        ${cena.cabecalho}<br>
                        <small>Personagens: ${[...new Set(cena.personagens)].join(', ') || 'Nenhum'}</small>
                    </div>
                `).join('')}
            </div>
            <button class="patika-btn" onclick="this.closest('.export-modal').remove()" style="margin-top: 20px;">
                Fechar
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

// ============================================
// EXPORTAÇÃO AVANÇADA
// ============================================

function mostrarOpcoesExportacao() {
    const modal = document.createElement('div');
    modal.className = 'export-modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="export-modal-content">
            <h3>📤 EXPORTAR ROTEIRO</h3>
            
            <div class="export-opcao" onclick="exportarFormatoFinalDraft()">
                <h4>📄 Final Draft (.fdx)</h4>
                <p>Formato profissional compatível com Final Draft</p>
            </div>
            
            <div class="export-opcao" onclick="exportarPDF()">
                <h4>📑 PDF</h4>
                <p>Documento pronto para impressão</p>
            </div>
            
            <div class="export-opcao" onclick="exportarTXT()">
                <h4>📝 Texto (.txt)</h4>
                <p>Formato simples para edição</p>
            </div>
            
            <div class="export-opcao" onclick="exportarHTML()">
                <h4>🌐 HTML</h4>
                <p>Página web com formatação de roteiro</p>
            </div>
            
            <button class="patika-btn secundario" onclick="this.closest('.export-modal').remove()" style="margin-top: 20px;">
                Cancelar
            </button>
        </div>
    `;
    document.body.appendChild(modal);
}

function exportarFormatoFinalDraft() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    // Simular formato FDX (XML)
    let fdx = '<?xml version="1.0" encoding="UTF-8"?>\n';
    fdx += '<FinalDraft>\n';
    fdx += '  <Title>' + projeto.nome + '</Title>\n';
    fdx += '  <Content>\n';
    
    const secoes = ['sinopse', 'argumento', 'escaleta', 'roteiro', 'personagens'];
    secoes.forEach(secao => {
        const texto = projeto.conteudos[secao] || '';
        if (texto) {
            fdx += `    <Section name="${secao.toUpperCase()}">\n`;
            fdx += `      <Text>${texto.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</Text>\n`;
            fdx += `    </Section>\n`;
        }
    });
    
    fdx += '  </Content>\n';
    fdx += '</FinalDraft>';
    
    // Download
    const blob = new Blob([fdx], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projeto.nome.replace(/\s+/g, '_')}.fdx`;
    a.click();
    URL.revokeObjectURL(url);
    
    document.querySelector('.export-modal')?.remove();
    mostrarNotificacao('✅ Exportado no formato Final Draft!');
}

function exportarHTML() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    let html = '<!DOCTYPE html>\n<html>\n<head>\n';
    html += '<meta charset="UTF-8">\n';
    html += '<title>' + projeto.nome + ' - Roteiro</title>\n';
    html += '<style>\n';
    html += 'body { font-family: "Courier New", monospace; max-width: 800px; margin: 0 auto; padding: 40px; }\n';
    html += '.scene-header { font-weight: bold; text-transform: uppercase; margin: 20px 0 10px; }\n';
    html += '.character-name { text-align: center; font-weight: bold; margin: 15px 0 5px; }\n';
    html += '.dialog { margin-left: 100px; }\n';
    html += '.page-number { text-align: right; color: #999; }\n';
    html += '</style>\n';
    html += '</head>\n<body>\n';
    html += '<h1>' + projeto.nome + '</h1>\n';
    
    const secoes = ['roteiro', 'sinopse', 'argumento', 'escaleta', 'personagens'];
    secoes.forEach(secao => {
        const texto = projeto.conteudos[secao] || '';
        if (texto) {
            html += '<h2>' + secao.toUpperCase() + '</h2>\n';
            html += '<div class="' + secao + '">' + texto.replace(/\n/g, '<br>') + '</div>\n';
        }
    });
    
    html += '</body>\n</html>';
    
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projeto.nome.replace(/\s+/g, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
    
    document.querySelector('.export-modal')?.remove();
    mostrarNotificacao('🌐 Página HTML gerada!');
}

function exportarTXT() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    let txt = `${projeto.nome.toUpperCase()}\n`;
    txt += `${'='.repeat(projeto.nome.length)}\n\n`;
    
    const secoes = ['roteiro', 'sinopse', 'argumento', 'escaleta', 'personagens'];
    secoes.forEach(secao => {
        const texto = projeto.conteudos[secao] || '';
        if (texto) {
            txt += `[${secao.toUpperCase()}]\n`;
            txt += `${'-'.repeat(secao.length + 2)}\n`;
            txt += texto + '\n\n';
        }
    });
    
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projeto.nome.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    document.querySelector('.export-modal')?.remove();
    mostrarNotificacao('📝 Arquivo TXT gerado!');
}

// ============================================
// ESTATÍSTICAS AVANÇADAS
// ============================================

function mostrarEstatisticasAvancadas() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    const totalPalavras = calcularTotalPalavras();
    const cenas = contarCenas();
    const falas = contarFalas();
    const personagens = contarPersonagens();
    
    const modal = document.createElement('div');
    modal.className = 'export-modal';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="export-modal-content">
            <h3>📊 ESTATÍSTICAS AVANÇADAS</h3>
            
            <div style="margin: 20px 0;">
                <h4>📈 Visão Geral</h4>
                <div class="estatistica-item"><span>Total de palavras:</span> <strong>${totalPalavras}</strong></div>
                <div class="estatistica-item"><span>Total de cenas:</span> <strong>${cenas}</strong></div>
                <div class="estatistica-item"><span>Total de falas:</span> <strong>${falas}</strong></div>
                <div class="estatistica-item"><span>Média palavras/fala:</span> <strong>${falas ? Math.round(totalPalavras / falas) : 0}</strong></div>
            </div>
            
            <div style="margin: 20px 0;">
                <h4>🎭 Personagens</h4>
                <div class="personagem-stats">
                    ${personagens.map(p => `
                        <div class="personagem-card">
                            <div class="personagem-nome">${p.nome}</div>
                            <div class="personagem-falas">${p.falas} falas</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <button class="patika-btn" onclick="this.closest('.export-modal').remove()">Fechar</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// ============================================
// BARRA DE FERRAMENTAS CELTX
// ============================================

function adicionarBarraFerramentas() {
    const editorHeader = document.querySelector('.editor-header');
    if (!editorHeader) return;
    
    const toolbar = document.createElement('div');
    toolbar.className = 'celtx-toolbar';
    toolbar.innerHTML = `
        <button onclick="aplicarFormatacaoCena()" title="Inserir cabeçalho de cena (INT./EXT.)">🎬 Cena</button>
        <button onclick="aplicarFormatacaoPersonagem()" title="Inserir nome do personagem">👤 Personagem</button>
        <button onclick="aplicarFormatacaoDialogo()" title="Inserir diálogo">💬 Diálogo</button>
        <button onclick="aplicarFormatacaoParentese()" title="Inserir direção/parentese">( ) Direção</button>
        <button onclick="aplicarFormatacaoTransicao()" title="Inserir transição">⏩ Transição</button>
        <button onclick="gerarRelatorioCenas()" title="Relatório de cenas">📊 Relatório</button>
        <button onclick="mostrarEstatisticasAvancadas()" title="Estatísticas avançadas">📈 Stats</button>
        <button onclick="mostrarOpcoesExportacao()" title="Exportar roteiro">📤 Exportar</button>
    `;
    
    editorHeader.parentNode.insertBefore(toolbar, editorHeader.nextSibling);
}

// ============================================
// ATALHOS DE TECLADO ESTILO FINAL DRAFT
// ============================================

function configurarAtalhosProfissionais() {
    document.addEventListener('keydown', function(e) {
        const textarea = document.getElementById('conteudoTexto');
        if (!textarea || document.activeElement !== textarea) return;
        
        // Tab para avançar (Final Draft)
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            textarea.value = textarea.value.substring(0, start) + '\t' + textarea.value.substring(end);
            textarea.selectionStart = textarea.selectionEnd = start + 1;
            return;
        }
        
        // Enter com regras especiais (Final Draft)
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
// INICIALIZAR NOVAS FUNCIONALIDADES
// ============================================

// Sobrescrever a função de inicialização original para adicionar as novas features
const originalInit = window.onload || function(){};
window.onload = function() {
    if (typeof originalInit === 'function') originalInit();
    
    // Inicializar novas funcionalidades
    setTimeout(() => {
        adicionarBarraFerramentas();
        configurarAtalhosProfissionais();
    }, 100);
};

// Exportar novas funções
window.aplicarFormatacaoCena = aplicarFormatacaoCena;
window.aplicarFormatacaoPersonagem = aplicarFormatacaoPersonagem;
window.aplicarFormatacaoDialogo = aplicarFormatacaoDialogo;
window.aplicarFormatacaoParentese = aplicarFormatacaoParentese;
window.aplicarFormatacaoTransicao = aplicarFormatacaoTransicao;
window.gerarRelatorioCenas = gerarRelatorioCenas;
window.mostrarEstatisticasAvancadas = mostrarEstatisticasAvancadas;
window.mostrarOpcoesExportacao = mostrarOpcoesExportacao;
window.exportarFormatoFinalDraft = exportarFormatoFinalDraft;
window.exportarHTML = exportarHTML;
window.exportarTXT = exportarTXT;
