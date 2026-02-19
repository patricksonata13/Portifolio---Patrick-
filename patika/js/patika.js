/* ============================================ */
/* PATIKA - FUNÇÕES DO EDITOR DE ROTEIRO       */
/* ============================================ */

// ========== VARIÁVEIS GLOBAIS ==========
let versoes = JSON.parse(localStorage.getItem('patika_versoes') || '[]');
let numeroCena = 1;

// ========== DETECTAR TIPO DE LINHA ==========
function detectarTipoLinha(texto) {
    texto = texto.trim();
    if (/^(INT\.|EXT\.|INT\/EXT\.)/i.test(texto)) return "cena";
    if (texto.length > 0 && texto === texto.toUpperCase() && texto.length < 30 && !texto.includes('.')) return "personagem";
    if (/^(FADE IN|FADE OUT|CORTE PARA|DISSOLVE)/i.test(texto)) return "transicao";
    return "acao";
}

// ========== APLICAR FORMATAÇÃO ==========
function aplicarFormatacao(linha) {
    const texto = linha.innerText;
    linha.classList.remove('patika-cena', 'patika-personagem', 'patika-dialogo', 'patika-acao', 'patika-transicao');
    
    if (linha.classList.contains('patika-cena') || /^(INT\.|EXT\.)/i.test(texto)) {
        linha.classList.add('patika-cena');
    } else if (linha.classList.contains('patika-personagem') || (texto === texto.toUpperCase() && texto.length > 0 && texto.length < 30)) {
        linha.classList.add('patika-personagem');
    } else if (linha.classList.contains('patika-dialogo')) {
        linha.classList.add('patika-dialogo');
    } else {
        linha.classList.add('patika-acao');
    }
}

// ========== COLOCAR CURSOR ==========
function colocarCursor(elemento) {
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(elemento);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
}

// ========== ATUALIZAR LISTA DE CENAS ==========
function atualizarListaCenas() {
    const editor = document.getElementById('roteiro-editor');
    const listaCenas = document.getElementById('lista-cenas');
    if (!editor || !listaCenas) return;
    
    listaCenas.innerHTML = '';
    const linhas = editor.children;
    let numCena = 1;
    
    for (let i = 0; i < linhas.length; i++) {
        if (linhas[i].classList.contains('patika-cena')) {
            // Numerar cena
            const textoOriginal = linhas[i].innerText.replace(/^\d+\.\s*/, '');
            linhas[i].innerHTML = `${numCena}. ${textoOriginal}`;
            
            // Criar item na lista
            const item = document.createElement('div');
            item.className = 'cena-item';
            item.innerText = `${numCena}. ${textoOriginal.substring(0, 30)}${textoOriginal.length > 30 ? '...' : ''}`;
            item.onclick = () => {
                linhas[i].scrollIntoView({ behavior: 'smooth' });
                linhas[i].style.backgroundColor = '#e8f5e9';
                setTimeout(() => linhas[i].style.backgroundColor = '', 1000);
            };
            listaCenas.appendChild(item);
            numCena++;
        }
    }
}

// ========== ATUALIZAR ESTATÍSTICAS ==========
function atualizarEstatisticas() {
    const editor = document.getElementById('roteiro-editor');
    if (!editor) return;
    
    const texto = editor.innerText;
    const linhas = editor.children;
    
    // Contagem
    const palavras = texto.trim().split(/\s+/).filter(Boolean).length;
    const totalLinhas = linhas.length;
    const paginas = Math.ceil(palavras / 250);
    
    // Contar elementos
    let cenas = 0, personagens = 0, dialogos = 0;
    for (let linha of linhas) {
        if (linha.classList.contains('patika-cena')) cenas++;
        if (linha.classList.contains('patika-personagem')) personagens++;
        if (linha.classList.contains('patika-dialogo')) dialogos++;
    }
    
    // Atualizar UI
    document.getElementById('total-linhas').innerText = totalLinhas;
    document.getElementById('total-palavras').innerText = palavras;
    document.getElementById('total-paginas').innerText = paginas;
    document.getElementById('tempo-estimado').innerText = Math.ceil(palavras / 150);
    document.getElementById('stat-cenas').innerText = cenas;
    document.getElementById('stat-personagens').innerText = personagens;
    document.getElementById('stat-dialogos').innerText = dialogos;
    document.getElementById('stat-falas').innerText = dialogos;
}

// ========== SALVAR VERSÃO ==========
function salvarVersao() {
    const editor = document.getElementById('roteiro-editor');
    if (!editor) return;
    
    const versao = {
        data: new Date().toLocaleString(),
        conteudo: editor.innerHTML,
        palavras: editor.innerText.trim().split(/\s+/).filter(Boolean).length
    };
    
    versoes.unshift(versao);
    if (versoes.length > 10) versoes.pop();
    
    localStorage.setItem('patika_versoes', JSON.stringify(versoes));
    atualizarListaVersoes();
    alert('✅ Versão salva!');
}

// ========== ATUALIZAR LISTA DE VERSÕES ==========
function atualizarListaVersoes() {
    const lista = document.getElementById('lista-versoes');
    if (!lista) return;
    
    lista.innerHTML = '';
    versoes.forEach((ver, index) => {
        const item = document.createElement('div');
        item.style.padding = '8px';
        item.style.margin = '5px 0';
        item.style.background = 'white';
        item.style.borderRadius = '4px';
        item.style.cursor = 'pointer';
        item.style.fontSize = '12px';
        item.style.border = '1px solid #eee';
        item.innerHTML = `<strong>${ver.data}</strong><br>${ver.palavras} palavras`;
        item.onclick = () => {
            if (confirm('Restaurar esta versão?')) {
                document.getElementById('roteiro-editor').innerHTML = ver.conteudo;
                atualizarListaCenas();
                atualizarEstatisticas();
            }
        };
        lista.appendChild(item);
    });
}

// ========== INSERIR ELEMENTO ==========
function inserirElemento(tipo) {
    const editor = document.getElementById('roteiro-editor');
    const novaLinha = document.createElement('div');
    
    switch(tipo) {
        case 'cena':
            novaLinha.className = 'patika-cena';
            novaLinha.innerText = 'INT. LOCAL - DIA';
            break;
        case 'personagem':
            novaLinha.className = 'patika-personagem';
            novaLinha.innerText = 'PERSONAGEM';
            break;
        case 'acao':
            novaLinha.className = 'patika-acao';
            novaLinha.innerText = 'Ação...';
            break;
        case 'dialogo':
            novaLinha.className = 'patika-dialogo';
            novaLinha.innerText = 'Diálogo...';
            break;
        case 'transicao':
            novaLinha.className = 'patika-transicao';
            novaLinha.innerText = 'CORTE PARA:';
            break;
    }
    
    editor.appendChild(novaLinha);
    colocarCursor(novaLinha);
    atualizarListaCenas();
    atualizarEstatisticas();
}

// ========== INSERIR CENA ==========
function inserirCena() {
    inserirElemento('cena');
}

// ========== EXPORTAR ROTEIRO ==========
function exportarRoteiro() {
    const editor = document.getElementById('roteiro-editor');
    if (!editor) return;
    
    const conteudo = editor.innerText;
    const blob = new Blob([conteudo], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'roteiro_' + new Date().toISOString().slice(0,10) + '.txt';
    a.click();
}

// ========== MODOS ==========
function toggleModoFoco() {
    const editor = document.getElementById('roteiro-editor');
    if (!editor) return;
    editor.style.background = editor.style.background === 'rgb(248, 249, 250)' ? 'white' : '#f8f9fa';
    editor.style.transition = 'all 0.3s';
}

function toggleModoEscuro() {
    const editor = document.getElementById('roteiro-editor');
    if (!editor) return;
    if (editor.style.background === 'rgb(26, 26, 26)') {
        editor.style.background = 'white';
        editor.style.color = '#2f2f2f';
    } else {
        editor.style.background = '#1a1a1a';
        editor.style.color = '#e0e0e0';
    }
}

// ========== INICIALIZAÇÃO ==========
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 PATIKA iniciado');
    
    const editor = document.getElementById('roteiro-editor');
    if (!editor) {
        console.error('❌ Editor não encontrado!');
        return;
    }
    
    // Formatar linhas iniciais
    for (let linha of editor.children) {
        aplicarFormatacao(linha);
    }
    
    // Evento de teclado
    editor.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            setTimeout(() => {
                const sel = window.getSelection();
                const linha = sel.anchorNode?.parentElement;
                if (!linha) return;
                
                aplicarFormatacao(linha);
                
                if (linha.classList.contains('patika-personagem')) {
                    setTimeout(() => {
                        const novaLinha = document.createElement('div');
                        novaLinha.className = 'patika-dialogo';
                        novaLinha.innerHTML = '<br>';
                        linha.parentNode.insertBefore(novaLinha, linha.nextSibling);
                        colocarCursor(novaLinha);
                    }, 10);
                }
                
                atualizarListaCenas();
                atualizarEstatisticas();
            }, 10);
        }
        
        // Ctrl+S para salvar
        if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            salvarVersao();
        }
    });
    
    // Evento de input
    editor.addEventListener('input', function() {
        atualizarListaCenas();
        atualizarEstatisticas();
    });
    
    // Inicializar
    atualizarListaCenas();
    atualizarEstatisticas();
    atualizarListaVersoes();
});

// ========== FUNÇÕES DE BACKUP ==========
function fazerBackup() {
    const backup = {
        versoes: versoes,
        roteiro: document.getElementById('roteiro-editor')?.innerHTML || '',
        data: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(backup, null, 2)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'patika-backup.json';
    a.click();
}

// Expor funções globalmente
window.inserirElemento = inserirElemento;
window.inserirCena = inserirCena;
window.salvarVersao = salvarVersao;
window.exportarRoteiro = exportarRoteiro;
window.toggleModoFoco = toggleModoFoco;
window.toggleModoEscuro = toggleModoEscuro;
window.fazerBackup = fazerBackup;
