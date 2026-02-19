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

function inicializarPatikaPro() {

    configurarAutoBackup();

    const fab = document.querySelector('.fab-container');

    if (fab) {

        const darkBtn = document.createElement('button');

        darkBtn.className = 'fab-btn';
        darkBtn.innerHTML = '🌙';
        darkBtn.onclick = toggleModoEscuro;

        fab.appendChild(darkBtn);

    }

}

document.addEventListener("DOMContentLoaded", inicializarPatikaPro);


/* ============================================ */
/* INICIALIZAÇÃO SEGURA PATIKA PRO             */
/* ============================================ */

if (typeof inicializarPatikaPro !== "function") {

    function inicializarPatikaPro() {

        console.log("PATIKA PRO inicializado com sucesso");

        if (typeof configurarAutoBackup === "function") {
            configurarAutoBackup();
        }

    }

}

document.addEventListener("DOMContentLoaded", function() {

    try {

        inicializarPatikaPro();

    } catch (e) {

        console.warn("Inicialização protegida:", e);

    }

});


/* ============================================ */
/* MODO ESCURO SEGURO                          */
/* ============================================ */

if (typeof toggleModoEscuro !== "function") {

    function toggleModoEscuro() {

        document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            "patika_dark_mode",
            document.body.classList.contains("dark-mode")
        );

    }

}

(function carregarModoSalvo(){

    const ativo = localStorage.getItem("patika_dark_mode");

    if (ativo === "true") {

        document.body.classList.add("dark-mode");

    }

})();


/* ============================================ */
/* BOTÃO DARK MODE AUTOMÁTICO                  */
/* ============================================ */

document.addEventListener("DOMContentLoaded", function(){

    const fab = document.querySelector(".fab-container");

    if (fab && !document.querySelector(".dark-mode-toggle")) {

        const btn = document.createElement("button");

        btn.className = "fab-btn dark-mode-toggle";

        btn.innerHTML = "🌙";

        btn.onclick = toggleModoEscuro;

        fab.appendChild(btn);

    }

});


/* ============================================ */
/* AUTOSAVE INTELIGENTE                        */
/* ============================================ */

let patikaAutosaveTimer = null;

function configurarAutosaveEditor() {

    const editor = document.querySelector("textarea");

    if (!editor) return;

    editor.addEventListener("input", function() {

        clearTimeout(patikaAutosaveTimer);

        patikaAutosaveTimer = setTimeout(function(){

            if (typeof salvarConteudo === "function") {

                salvarConteudo();

                console.log("Autosave executado");

            }

        }, 1500);

    });

}

document.addEventListener("DOMContentLoaded", configurarAutosaveEditor);


/* ============================================ */
/* HISTÓRICO DE VERSÕES                        */
/* ============================================ */

function salvarVersaoManual() {

    const editor = document.querySelector("textarea");

    if (!editor) return;

    let versoes = JSON.parse(
        localStorage.getItem("patika_versoes") || "[]"
    );

    versoes.push({

        data: new Date().toISOString(),

        conteudo: editor.value

    });

    localStorage.setItem(
        "patika_versoes",
        JSON.stringify(versoes)
    );

    console.log("Versão salva");

}

window.salvarVersaoManual = salvarVersaoManual;


function restaurarUltimaVersao() {

    const versoes = JSON.parse(
        localStorage.getItem("patika_versoes") || "[]"
    );

    if (versoes.length === 0) {

        alert("Nenhuma versão encontrada");

        return;

    }

    const ultima = versoes[versoes.length - 1];

    const editor = document.querySelector("textarea");

    if (editor) {

        editor.value = ultima.conteudo;

    }

}

window.restaurarUltimaVersao = restaurarUltimaVersao;


/* ============================================ */
/* CONTADOR PROFISSIONAL                       */
/* ============================================ */

function atualizarContadorPatika() {

    const editor = document.querySelector("textarea");

    if (!editor) return;

    const texto = editor.value;

    const palavras = texto.trim().split(/\s+/).filter(Boolean).length;

    const caracteres = texto.length;

    const paginas = Math.ceil(palavras / 250);

    console.log(
        "Palavras:", palavras,
        "Caracteres:", caracteres,
        "Páginas:", paginas
    );

}

document.addEventListener("input", atualizarContadorPatika);


/* ============================================ */
/* EXPORTAR TXT                                */
/* ============================================ */

function exportarTXT() {

    const editor = document.querySelector("textarea");

    if (!editor) return;

    const blob = new Blob(
        [editor.value],
        { type: "text/plain" }
    );

    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);

    a.download = "roteiro.txt";

    a.click();

}

window.exportarTXT = exportarTXT;


/* ============================================ */
/* RESTAURAR SESSÃO                            */
/* ============================================ */

function restaurarSessaoPatika() {

    const editor = document.querySelector("textarea");

    if (!editor) return;

    const salvo = localStorage.getItem("patika_autosave");

    if (salvo) {

        editor.value = salvo;

    }

}

document.addEventListener("DOMContentLoaded", restaurarSessaoPatika);


document.addEventListener("input", function(){

    const editor = document.querySelector("textarea");

    if (!editor) return;

    localStorage.setItem(
        "patika_autosave",
        editor.value
    );

});


/* ============================================ */
/* DETECÇÃO DE ELEMENTOS DE ROTEIRO            */
/* ============================================ */

function detectarElementoLinha(linha) {

    const texto = linha.trim();

    if (/^(INT\.|EXT\.)/.test(texto)) {
        return "scene";
    }

    if (/^[A-ZÁÉÍÓÚÇ\s]{3,}$/.test(texto) && texto === texto.toUpperCase()) {
        return "character";
    }

    if (/^(FADE IN|FADE OUT|CORTE PARA)/.test(texto)) {
        return "transition";
    }

    return "action";

}

window.detectarElementoLinha = detectarElementoLinha;


/* ============================================ */
/* AUTO FORMATAÇÃO ENTER                       */
/* ============================================ */

function configurarAutoFormatacao() {

    const editor = document.querySelector("textarea");

    if (!editor) return;

    editor.addEventListener("keydown", function(e){

        if (e.key === "Enter") {

            const linhas = editor.value.split("\n");

            const ultima = linhas[linhas.length - 1];

            const tipo = detectarElementoLinha(ultima);

            console.log("Elemento:", tipo);

        }

    });

}

document.addEventListener("DOMContentLoaded", configurarAutoFormatacao);


/* ============================================ */
/* ATALHOS PROFISSIONAIS                       */
/* ============================================ */

function configurarAtalhosProfissionais() {

    document.addEventListener("keydown", function(e){

        if (e.metaKey || e.ctrlKey) {

            switch(e.key.toLowerCase()) {

                case "s":

                    e.preventDefault();

                    if (typeof salvarConteudo === "function") {
                        salvarConteudo();
                    }

                    break;

                case "e":

                    e.preventDefault();

                    exportarTXT();

                    break;

                case "b":

                    e.preventDefault();

                    salvarVersaoManual();

                    break;

            }

        }

    });

}

document.addEventListener("DOMContentLoaded", configurarAtalhosProfissionais);


/* ============================================ */
/* SISTEMA DE PROJETOS                         */
/* ============================================ */

function criarProjetoPatika(nome) {

    const projetos = JSON.parse(
        localStorage.getItem("patika_projetos") || "[]"
    );

    const novo = {

        id: Date.now(),

        nome: nome,

        criado: new Date().toISOString(),

        conteudo: ""

    };

    projetos.push(novo);

    localStorage.setItem(
        "patika_projetos",
        JSON.stringify(projetos)
    );

}

window.criarProjetoPatika = criarProjetoPatika;


/* ============================================ */
/* AUTOCOMPLETE CENA                           */
/* ============================================ */

function autoCompletarCena(editor) {

    const valor = editor.value;

    if (valor.endsWith("\nint")) {

        editor.value += ". LOCAL - DIA";

    }

    if (valor.endsWith("\next")) {

        editor.value += ". LOCAL - NOITE";

    }

}

document.addEventListener("input", function(){

    const editor = document.querySelector("textarea");

    if (!editor) return;

    autoCompletarCena(editor);

});


/* ============================================ */
/* MODO FOCO                                   */
/* ============================================ */

function ativarModoFoco() {

    document.body.classList.toggle("modo-foco");

}

window.ativarModoFoco = ativarModoFoco;


/* ============================================ */
/* SISTEMA DE PERSONAGENS                      */
/* ============================================ */

function extrairPersonagens(texto) {

    const linhas = texto.split("\n");

    const personagens = new Set();

    linhas.forEach(linha => {

        const limpa = linha.trim();

        if (
            limpa === limpa.toUpperCase() &&
            limpa.length > 2 &&
            limpa.length < 30 &&
            /^[A-ZÁÉÍÓÚÇ\s]+$/.test(limpa)
        ) {
            personagens.add(limpa);
        }

    });

    localStorage.setItem(
        "patika_personagens",
        JSON.stringify([...personagens])
    );

}

function obterPersonagens() {

    return JSON.parse(
        localStorage.getItem("patika_personagens") || "[]"
    );

}

document.addEventListener("input", function(){

    const editor = document.querySelector("textarea");

    if (!editor) return;

    extrairPersonagens(editor.value);

});

window.obterPersonagens = obterPersonagens;


/* ============================================ */
/* DETECTOR DE CENAS                           */
/* ============================================ */

function extrairCenas(texto) {

    const linhas = texto.split("\n");

    const cenas = [];

    linhas.forEach((linha, index) => {

        if (/^(INT\.|EXT\.)/.test(linha.trim())) {

            cenas.push({

                titulo: linha.trim(),

                linha: index

            });

        }

    });

    localStorage.setItem(
        "patika_cenas",
        JSON.stringify(cenas)
    );

    return cenas;

}

window.extrairCenas = extrairCenas;


/* ============================================ */
/* PAINEL DE CENAS                             */
/* ============================================ */

function atualizarPainelCenas() {

    const editor = document.querySelector("textarea");

    const painel = document.getElementById("painelCenas");

    if (!editor || !painel) return;

    const cenas = extrairCenas(editor.value);

    painel.innerHTML = "";

    cenas.forEach(cena => {

        const div = document.createElement("div");

        div.className = "cena-item";

        div.innerText = cena.titulo;

        div.onclick = function(){

            irParaLinha(cena.linha);

        };

        painel.appendChild(div);

    });

}

window.atualizarPainelCenas = atualizarPainelCenas;


/* ============================================ */
/* NAVEGAR PARA LINHA                          */
/* ============================================ */

function irParaLinha(numeroLinha) {

    const editor = document.querySelector("textarea");

    if (!editor) return;

    const linhas = editor.value.split("\n");

    let pos = 0;

    for (let i = 0; i < numeroLinha; i++) {

        pos += linhas[i].length + 1;

    }

    editor.focus();

    editor.setSelectionRange(pos, pos);

}

window.irParaLinha = irParaLinha;


document.addEventListener("input", function(){

    atualizarPainelCenas();

});

document.addEventListener("DOMContentLoaded", function(){

    atualizarPainelCenas();

});


/* ============================================ */
/* MODO CARTÕES (INDEX CARDS)                  */
/* ============================================ */

function gerarCartoes() {

    const editor = document.querySelector("textarea");

    if (!editor) return;

    const texto = editor.value;

    const cenas = extrairCenas(texto);

    const container = document.getElementById("modoCartoesContainer");

    if (!container) return;

    container.innerHTML = "";

    cenas.forEach((cena, index) => {

        const card = document.createElement("div");

        card.className = "patika-card";

        card.draggable = true;

        card.innerHTML = `

            <div class="card-titulo">${cena.titulo}</div>

            <div class="card-numero">Cena ${index + 1}</div>

        `;

        card.onclick = () => irParaLinha(cena.linha);

        container.appendChild(card);

    });

}

window.gerarCartoes = gerarCartoes;


function ativarModoCartoes() {

    const container = document.getElementById("modoCartoesContainer");

    if (!container) return;

    container.style.display = "grid";

    gerarCartoes();

}

window.ativarModoCartoes = ativarModoCartoes;


document.addEventListener("DOMContentLoaded", function(){

    const fab = document.querySelector(".fab-container");

    if (!fab) return;

    const btn = document.createElement("button");

    btn.className = "fab-btn";

    btn.innerHTML = "🗂";

    btn.title = "Modo cartões";

    btn.onclick = ativarModoCartoes;

    fab.appendChild(btn);

});


document.addEventListener("input", function(){

    gerarCartoes();

});

