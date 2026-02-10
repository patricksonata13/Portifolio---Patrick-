/**
 * PATIKA Engine v2.0 - Real Usage
 * Lógica: Teclas + Salvamento Automático Local
 */

const editor = document.getElementById('script-editor');
const projectNameDisplay = document.getElementById('project-name');

// 1. CARREGAR AO ABRIR
window.addEventListener('DOMContentLoaded', () => {
    const savedScript = localStorage.getItem('patika_current_script');
    if (savedScript) {
        editor.innerHTML = savedScript;
    }
});

// 2. SALVAR AUTOMÁTICO
function autoSave() {
    localStorage.setItem('patika_current_script', editor.innerHTML);
    // Simula um "Salvando..." discreto
    projectNameDisplay.innerText = "roteiro_v1.sdk (Salvo)";
    setTimeout(() => {
        projectNameDisplay.innerText = "roteiro_v1.sdk";
    }, 2000);
}

editor.addEventListener('keydown', (e) => {
    // Atalho TAB (Mudar Elemento)
    if (e.key === 'Tab') {
        e.preventDefault();
        const selection = window.getSelection();
        const currentElement = selection.anchorNode.parentElement;
        const types = ['slugline', 'action', 'character', 'parenthetical', 'dialogue'];
        let currentType = currentElement.className || 'action';
        let nextIndex = (types.indexOf(currentType) + 1) % types.length;
        currentElement.className = types[nextIndex];
        autoSave();
    }

    // Atalho ENTER (Lógica Final Draft)
    if (e.key === 'Enter') {
        setTimeout(() => {
            const selection = window.getSelection();
            const newElement = selection.anchorNode.parentElement;
            const prevElement = newElement.previousElementSibling;
            if (prevElement) {
                const prevType = prevElement.className;
                if (prevType === 'character') newElement.className = 'dialogue';
                else if (prevType === 'dialogue') newElement.className = 'action';
                else if (prevType === 'slugline') newElement.className = 'action';
                else newElement.className = 'action';
            }
            autoSave();
        }, 10);
    }
});

// Salva em cada alteração de texto
editor.addEventListener('input', autoSave);
