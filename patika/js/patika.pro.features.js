// ============================================
// PATIKA PRO FEATURES MODULE
// Não altera o sistema existente
// Apenas adiciona novas funções
// ============================================

(function(){

    console.log("Patika Pro Features carregado");

    // Espera o sistema principal carregar
    document.addEventListener("DOMContentLoaded", function(){

        inicializarAutoSave();
        inicializarVersionamento();
        inicializarContadorPalavras();
        inicializarBackupLocal();

    });

    // ============================================
    // AUTO SAVE
    // ============================================

    function inicializarAutoSave(){

        const editor = document.querySelector("[contenteditable='true']");

        if(!editor) return;

        setInterval(()=>{

            const conteudo = editor.innerHTML;

            localStorage.setItem("patika_autosave", conteudo);

            console.log("AutoSave executado");

        }, 30000);

    }

    // ============================================
    // RESTORE AUTO SAVE
    // ============================================

    function restaurarAutoSave(){

        const editor = document.querySelector("[contenteditable='true']");

        if(!editor) return;

        const conteudo = localStorage.getItem("patika_autosave");

        if(conteudo){

            editor.innerHTML = conteudo;
            console.log("AutoSave restaurado");

        }

    }

    // ============================================
    // VERSIONAMENTO
    // ============================================

    function inicializarVersionamento(){

        window.patikaSalvarVersao = function(){

            const editor = document.querySelector("[contenteditable='true']");

            if(!editor) return;

            const versoes =
                JSON.parse(localStorage.getItem("patika_versoes") || "[]");

            versoes.push({

                data: new Date().toISOString(),
                conteudo: editor.innerHTML

            });

            localStorage.setItem(
                "patika_versoes",
                JSON.stringify(versoes)
            );

            console.log("Versão salva");

        };

    }

    // ============================================
    // CONTADOR DE PALAVRAS
    // ============================================

    function inicializarContadorPalavras(){

        const editor = document.querySelector("[contenteditable='true']");

        if(!editor) return;

        editor.addEventListener("input", function(){

            const texto = editor.innerText;

            const palavras =
                texto.trim().split(/\s+/).filter(Boolean).length;

            const caracteres = texto.length;

            atualizarUIContador(palavras, caracteres);

        });

    }

    function atualizarUIContador(palavras, caracteres){

        let contador =
            document.getElementById("patika-contador");

        if(!contador){

            contador = document.createElement("div");

            contador.id = "patika-contador";

            contador.style.position = "fixed";
            contador.style.bottom = "10px";
            contador.style.right = "20px";
            contador.style.background = "#1a1a1a";
            contador.style.color = "#00ff88";
            contador.style.padding = "6px 12px";
            contador.style.borderRadius = "6px";
            contador.style.fontSize = "12px";

            document.body.appendChild(contador);

        }

        contador.innerText =
            palavras + " palavras • " + caracteres + " caracteres";

    }

    // ============================================
    // BACKUP LOCAL
    // ============================================

    function inicializarBackupLocal(){

        window.patikaExportarBackup = function(){

            const editor =
                document.querySelector("[contenteditable='true']");

            if(!editor) return;

            const blob = new Blob(
                [editor.innerHTML],
                {type:"text/html"}
            );

            const link = document.createElement("a");

            link.href = URL.createObjectURL(blob);

            link.download =
                "patika-backup-" + Date.now() + ".html";

            link.click();

            console.log("Backup exportado");

        };

    }

    // Restaurar autosave automaticamente
    restaurarAutoSave();

})();
