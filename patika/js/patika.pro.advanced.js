// ============================================
// PATIKA PRO ADVANCED MODULE
// Recursos profissionais isolados
// ============================================

(function(){

document.addEventListener("DOMContentLoaded", function(){

    inicializarNavegadorCenas();
    inicializarModoFoco();
    inicializarTimeline();

});

// ============================================
// NAVEGADOR DE CENAS
// ============================================

function inicializarNavegadorCenas(){

    const editor = document.querySelector("[contenteditable='true']");
    if(!editor) return;

    const sidebar = document.createElement("div");

    sidebar.id = "patika-scenes";
    sidebar.style.position = "fixed";
    sidebar.style.left = "0";
    sidebar.style.top = "60px";
    sidebar.style.width = "220px";
    sidebar.style.height = "100%";
    sidebar.style.background = "#f3f4f6";
    sidebar.style.borderRight = "1px solid #d1d5db";
    sidebar.style.padding = "10px";
    sidebar.style.overflowY = "auto";

    document.body.appendChild(sidebar);

    atualizarListaCenas();

    editor.addEventListener("input", atualizarListaCenas);

}

function atualizarListaCenas(){

    const editor = document.querySelector("[contenteditable='true']");
    const sidebar = document.getElementById("patika-scenes");

    if(!editor || !sidebar) return;

    const texto = editor.innerText;

    const cenas = texto.match(/(INT\.|EXT\.).*/g) || [];

    sidebar.innerHTML = "<strong>CENAS</strong><br><br>";

    cenas.forEach((cena, i)=>{

        const item = document.createElement("div");

        item.innerText = cena;

        item.style.cursor = "pointer";
        item.style.padding = "4px";
        item.style.fontSize = "12px";

        item.onclick = ()=> localizarCena(cena);

        sidebar.appendChild(item);

    });

}

function localizarCena(cena){

    const editor = document.querySelector("[contenteditable='true']");

    const range = document.createRange();
    const sel = window.getSelection();

    const walker = document.createTreeWalker(
        editor,
        NodeFilter.SHOW_TEXT
    );

    while(walker.nextNode()){

        if(walker.currentNode.nodeValue.includes(cena)){

            range.setStart(walker.currentNode,0);
            range.collapse(true);

            sel.removeAllRanges();
            sel.addRange(range);

            break;
        }
    }

}

// ============================================
// MODO FOCO
// ============================================

function inicializarModoFoco(){

    window.patikaModoFoco = function(){

        document.body.classList.toggle("patika-focus");

        if(document.body.classList.contains("patika-focus")){

            document.body.style.background = "#111";
            document.body.style.color = "#00ff88";

        }else{

            document.body.style.background = "";
            document.body.style.color = "";

        }

    }

}

// ============================================
// TIMELINE DE VERSÕES
// ============================================

function inicializarTimeline(){

    window.patikaTimeline = function(){

        const versoes =
            JSON.parse(localStorage.getItem("patika_versoes") || "[]");

        const painel = document.createElement("div");

        painel.style.position = "fixed";
        painel.style.right = "0";
        painel.style.top = "60px";
        painel.style.width = "300px";
        painel.style.height = "100%";
        painel.style.background = "#ffffff";
        painel.style.borderLeft = "1px solid #ccc";
        painel.style.padding = "10px";
        painel.style.overflowY = "auto";

        painel.innerHTML = "<strong>VERSÕES</strong><br><br>";

        versoes.reverse().forEach(v=>{

            const item = document.createElement("div");

            item.innerText =
                new Date(v.data).toLocaleString();

            item.style.cursor = "pointer";
            item.style.padding = "6px";
            item.style.borderBottom = "1px solid #eee";

            item.onclick = ()=> restaurarVersao(v.conteudo);

            painel.appendChild(item);

        });

        document.body.appendChild(painel);

    }

}

function restaurarVersao(conteudo){

    const editor = document.querySelector("[contenteditable='true']");

    if(editor)
        editor.innerHTML = conteudo;

}

})();
