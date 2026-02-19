// ============================================
// PATIKA - Editor Profissional de Roteiro
// Funcionalidades completas com novo design
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
                sinopse: 'Escreva aqui a sinopse...',
                argumento: '',
                escaleta: '',
                roteiro: '',
                personagens: ''
            }
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

function novoProjeto() {
    const nome = prompt('Nome do novo projeto:') || 'projeto_novo';
    const projeto = {
        id: 'projeto_' + Date.now(),
        nome: nome,
        data: new Date().toISOString(),
        conteudos: { sinopse: '', argumento: '', escaleta: '', roteiro: '', personagens: '' }
    };
    
    estado.projetos.unshift(projeto);
    estado.projetoAtual = projeto.id;
    salvarProjetos();
    carregarConteudoSecao();
    atualizarNomesProjeto();
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

// ============================================
// NAVEGAÇÃO ENTRE SEÇÕES
// ============================================
function mudarSecao(secao) {
    salvarConteudo();
    estado.secaoAtual = secao;
    carregarConteudoSecao();
    
    document.querySelectorAll('.tab-item').forEach(el => el.classList.remove('ativa'));
    event.target.classList.add('ativa');
    document.getElementById('secaoTitulo').textContent = secao.toUpperCase();
}

function carregarConteudoSecao() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    document.getElementById('conteudoTexto').value = projeto.conteudos[estado.secaoAtual] || '';
    atualizarContadorPalavras();
}

function salvarConteudo() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    projeto.conteudos[estado.secaoAtual] = document.getElementById('conteudoTexto').value;
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

function atualizarStatusSalvo(status) {
    document.getElementById('salvoStatus').textContent = status;
}

// ============================================
// ATALHOS
// ============================================
function configurarAtalhos() {
    document.addEventListener('keydown', function(e) {
        const textarea = document.getElementById('conteudoTexto');
        if (!textarea || document.activeElement !== textarea) return;
        
        if (e.ctrlKey && e.key === 's') {
            e.preventDefault();
            salvarConteudo();
        }
        
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = textarea.selectionStart;
            textarea.value = textarea.value.substring(0, start) + '\t' + 
                              textarea.value.substring(textarea.selectionEnd);
            textarea.selectionStart = textarea.selectionEnd = start + 1;
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
}

function calcularTotalPalavras() {
    const projeto = getProjetoAtual();
    if (!projeto) return 0;
    return Object.values(projeto.conteudos).reduce((acc, texto) => 
        acc + (texto ? texto.trim().split(/\s+/).length : 0), 0);
}

function mostrarDetalhesPalavras() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    const detalhes = Object.entries(projeto.conteudos).map(([secao, texto]) => {
        const palavras = texto ? texto.trim().split(/\s+/).length : 0;
        return `${secao}: ${palavras} palavras`;
    }).join('\n');
    
    alert(`📊 DETALHES\n\n${detalhes}\n\nTOTAL: ${calcularTotalPalavras()} palavras`);
}

// ============================================
// EXPORTAÇÃO E BACKUP
// ============================================
function exportarRoteiro() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    let conteudo = `${projeto.nome.toUpperCase()}\n\n`;
    Object.entries(projeto.conteudos).forEach(([secao, texto]) => {
        if (texto) conteudo += `[${secao.toUpperCase()}]\n${texto}\n\n`;
    });
    
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projeto.nome}_roteiro.txt`;
    a.click();
}

function carregarModelo() {
    const projeto = getProjetoAtual();
    if (!projeto) return;
    
    if (!confirm('Carregar modelo substituirá seu conteúdo. Continuar?')) return;
    
    projeto.conteudos = {
        sinopse: 'Sinopse: [história resumida]',
        argumento: 'Argumento: [desenvolvimento dos atos]',
        escaleta: 'CENA 1 - Local - Dia\n- Ação\n\nCENA 2 - Local - Noite',
        roteiro: 'INT. LOCAL - DIA\n\nPERSONAGEM\nFala.',
        personagens: 'Nome:\nIdade:\nPersonalidade:'
    };
    salvarProjetos();
    carregarConteudoSecao();
}

function fazerBackup() {
    const blob = new Blob([JSON.stringify(estado.projetos, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `patika_backup_${new Date().toISOString().slice(0,10)}.json`;
    a.click();
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
                estado.projetos = JSON.parse(e.target.result);
                estado.projetoAtual = estado.projetos[0].id;
                salvarProjetos();
                carregarConteudoSecao();
                atualizarNomesProjeto();
                alert('✅ Backup restaurado!');
            } catch (error) {
                alert('❌ Arquivo inválido');
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
    }
}

// ============================================
// EXPOSIÇÃO DAS FUNÇÕES
// ============================================
window.mudarSecao = mudarSecao;
window.novoProjeto = novoProjeto;
window.salvarConteudo = salvarConteudo;
window.configurarProjeto = configurarProjeto;
window.exportarRoteiro = exportarRoteiro;
window.carregarModelo = carregarModelo;
window.mostrarDetalhesPalavras = mostrarDetalhesPalavras;
window.fazerBackup = fazerBackup;
window.restaurarBackup = restaurarBackup;
