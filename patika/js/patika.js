// ============================================
// PATIKA - Editor de Roteiro
// ============================================

let estado = {
    projetoAtual: null,
    secaoAtual: 'sinopse',
    projetos: [],
    autosaveTimer: null
};

// ============================================
// INICIALIZAÇÃO
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    carregarProjetos();
    configurarAutoSave();
    atualizarContadorPalavras();
    
    document.getElementById('conteudoTexto').addEventListener('input', function() {
        atualizarContadorPalavras();
        atualizarStatusSalvo('não salvo');
    });
    
    configurarAtalhos();
});

// ============================================
// PROJETOS
// ============================================
function carregarProjetos() {
    const salvos = localStorage.getItem('patika_projetos');
    if (salvos) {
        estado.projetos = JSON.parse(salvos);
    } else {
        estado.projetos = [{
            id: 'projeto_' + Date.now(),
            nome: 'projeto_sem_título',
            conteudos: {
                sinopse: '',
                argumento: '',
                escaleta: '',
                roteiro: '',
                personagens: ''
            }
        }];
        salvarProjetos();
    }
    
    estado.projetoAtual = estado.projetos[0].id;
    carregarConteudo();
    atualizarNomes();
}

function salvarProjetos() {
    localStorage.setItem('patika_projetos', JSON.stringify(estado.projetos));
}

function getProjetoAtual() {
    return estado.projetos.find(p => p.id === estado.projetoAtual);
}

function atualizarNomes() {
    const p = getProjetoAtual();
    if (p) {
        document.getElementById('projetoNome').textContent = '📁 ' + p.nome;
        document.getElementById('projetoNomeFooter').textContent = p.nome;
    }
}

function novoProjeto() {
    const nome = prompt('Nome do projeto:') || 'projeto_novo';
    estado.projetos.unshift({
        id: 'projeto_' + Date.now(),
        nome: nome,
        conteudos: { sinopse: '', argumento: '', escaleta: '', roteiro: '', personagens: '' }
    });
    estado.projetoAtual = estado.projetos[0].id;
    salvarProjetos();
    carregarConteudo();
    atualizarNomes();
    atualizarListaProjetos();
}

function atualizarListaProjetos() {
    const lista = document.getElementById('listaProjetos');
    if (!lista) return;
    
    lista.innerHTML = estado.projetos.map(p => `
        <div onclick="mudarProjeto('${p.id}')" style="padding: 8px; cursor: pointer; border-bottom: 1px solid var(--border-light); ${p.id === estado.projetoAtual ? 'background: var(--selection-bg); color: var(--accent-green);' : ''}">
            📁 ${p.nome}
        </div>
    `).join('');
}

window.mudarProjeto = function(id) {
    estado.projetoAtual = id;
    carregarConteudo();
    atualizarNomes();
    atualizarListaProjetos();
};

// ============================================
// SEÇÕES
// ============================================
function mudarSecao(secao) {
    salvarConteudo();
    estado.secaoAtual = secao;
    carregarConteudo();
    
    document.querySelectorAll('.etapa-item').forEach(el => el.classList.remove('ativa'));
    event.target.classList.add('ativa');
    document.getElementById('secaoTitulo').textContent = secao.toUpperCase();
}

function carregarConteudo() {
    const p = getProjetoAtual();
    if (!p) return;
    document.getElementById('conteudoTexto').value = p.conteudos[estado.secaoAtual] || '';
    atualizarContadorPalavras();
}

function salvarConteudo() {
    const p = getProjetoAtual();
    if (!p) return;
    p.conteudos[estado.secaoAtual] = document.getElementById('conteudoTexto').value;
    salvarProjetos();
    atualizarStatusSalvo('salvo');
    document.getElementById('ultimoSalvo').textContent = 'agora';
}

// ============================================
// AUTO-SAVE
// ============================================
function configurarAutoSave() {
    if (estado.autosaveTimer) clearInterval(estado.autosaveTimer);
    estado.autosaveTimer = setInterval(salvarConteudo, 30000);
}

function atualizarStatusSalvo(s) {
    document.getElementById('salvoStatus').textContent = s;
    document.getElementById('salvoStatusFooter').textContent = s;
}

// ============================================
// ATALHOS
// ============================================
function configurarAtalhos() {
    document.addEventListener('keydown', function(e) {
        if (!document.getElementById('conteudoTexto').matches(':focus')) return;
        
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            salvarConteudo();
        }
        
        if (e.key === 'Tab') {
            e.preventDefault();
            const t = document.getElementById('conteudoTexto');
            const start = t.selectionStart;
            t.value = t.value.substring(0, start) + '\t' + t.value.substring(t.selectionEnd);
            t.selectionStart = t.selectionEnd = start + 1;
        }
    });
}

// ============================================
// CONTADOR DE PALAVRAS
// ============================================
function atualizarContadorPalavras() {
    const texto = document.getElementById('conteudoTexto').value;
    const palavras = texto.trim() ? texto.trim().split(/\s+/).length : 0;
    document.getElementById('statusPalavras').textContent = palavras + ' palavras';
    
    const total = calcularTotalPalavras();
    document.getElementById('totalPalavras').textContent = total;
    document.getElementById('progresso').textContent = Math.min(100, Math.round(total / 25)) + '%';
}

function calcularTotalPalavras() {
    const p = getProjetoAtual();
    if (!p) return 0;
    return Object.values(p.conteudos).reduce((acc, t) => 
        acc + (t ? t.trim().split(/\s+/).length : 0), 0);
}

// ============================================
// FERRAMENTAS
// ============================================
window.carregarModelo = function() {
    const p = getProjetoAtual();
    if (!p || !confirm('Substituir conteúdo atual?')) return;
    p.conteudos = {
        sinopse: 'Sinopse: [história resumida]',
        argumento: 'ATO 1: Apresentação\nATO 2: Conflito\nATO 3: Resolução',
        escaleta: 'CENA 1 - INT. CASA - DIA\n\nCENA 2 - EXT. RUA - NOITE',
        roteiro: 'INT. CASA - DIA\n\nPERSONAGEM\nFala.',
        personagens: 'JOÃO\nMARIA'
    };
    carregarConteudo();
    salvarProjetos();
};

window.fazerBackup = function() {
    const blob = new Blob([JSON.stringify(estado.projetos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patika_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
};

window.restaurarBackup = function() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                estado.projetos = JSON.parse(e.target.result);
                estado.projetoAtual = estado.projetos[0].id;
                salvarProjetos();
                carregarConteudo();
                atualizarNomes();
                atualizarListaProjetos();
            } catch (error) {
                alert('Arquivo inválido');
            }
        };
        reader.readAsText(file);
    };
    input.click();
};

// Expor funções
window.mudarSecao = mudarSecao;
window.novoProjeto = novoProjeto;
window.salvarConteudo = salvarConteudo;
