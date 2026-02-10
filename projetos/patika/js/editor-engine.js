/**
 * PATIKA Engine - O Cérebro do Editor
 * Inteligência de Teclas: Tab e Enter
 */

const editor = document.getElementById('script-editor');

editor.addEventListener('keydown', (e) => {
    // 1. Atalho de TAB (Mudar Elemento)
    if (e.key === 'Tab') {
        e.preventDefault();
        const selection = window.getSelection();
        const currentElement = selection.anchorNode.parentElement;
        
        // Ciclo de elementos: Slugline -> Action -> Character -> Parenthetical -> Dialogue
        const types = ['slugline', 'action', 'character', 'parenthetical', 'dialogue'];
        let currentType = currentElement.className || 'action';
        let nextIndex = (types.indexOf(currentType) + 1) % types.length;
        
        currentElement.className = types[nextIndex];
    }

    // 2. Atalho de ENTER (Lógica de Continuidade)
    if (e.key === 'Enter') {
        // Pequeno delay para deixar o navegador criar o novo elemento
        setTimeout(() => {
            const selection = window.getSelection();
            const newElement = selection.anchorNode.parentElement;
            const prevElement = newElement.previousElementSibling;

            if (prevElement) {
                const prevType = prevElement.className;

                // Lógica de fluxo do Final Draft:
                if (prevType === 'character') {
                    newElement.className = 'dialogue'; // Depois de Personagem vem Fala
                } else if (prevType === 'dialogue') {
                    newElement.className = 'action';   // Depois de Fala vem Ação
                } else if (prevType === 'slugline') {
                    newElement.className = 'action';   // Depois de Cena vem Ação
                } else {
                    newElement.className = 'action';   // Padrão é Ação
                }
            }
        }, 10);
    }
});

// Forçar Uppercase em Personagem e Slugline
editor.addEventListener('input', (e) => {
    const selection = window.getSelection();
    const currentElement = selection.anchorNode.parentElement;
    
    if (currentElement.className === 'character' || currentElement.className === 'slugline') {
        currentElement.style.textTransform = 'uppercase';
    }
});
