// Editor básico do Patika
const editor = document.getElementById('editor');
const titleInput = document.querySelector('.title-input');
const wordCountEl = document.getElementById('wordCount');
const saveStatusEl = document.getElementById('saveStatus');
const saveBtn = document.getElementById('saveBtn');

// Carregar projeto salvo
function loadProject() {
    const saved = localStorage.getItem('patika_current');
    if (saved) {
        const project = JSON.parse(saved);
        editor.value = project.content || '';
        titleInput.value = project.title || 'Novo projeto';
        updateWordCount();
    }
}

// Salvar projeto
function saveProject() {
    const project = {
        title: titleInput.value || 'Sem título',
        content: editor.value,
        updated: new Date().toISOString(),
        wordCount: countWords(editor.value)
    };
    
    localStorage.setItem('patika_current', JSON.stringify(project));
    
    // Feedback visual
    saveStatusEl.textContent = '✓ Salvo agora';
    saveStatusEl.style.color = '#4CAF50';
    
    setTimeout(() => {
        saveStatusEl.textContent = '✓ Salvo';
        saveStatusEl.style.color = '#999';
    }, 2000);
    
    console.log('💾 Projeto salvo:', project.title);
}

// Contar palavras
function countWords(text) {
    return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function updateWordCount() {
    const words = countWords(editor.value);
    wordCountEl.textContent = `${words} palavra${words !== 1 ? 's' : ''}`;
}

// Event Listeners
editor.addEventListener('input', () => {
    updateWordCount();
    saveProject(); // Auto-save a cada alteração
});

titleInput.addEventListener('input', saveProject);

saveBtn.addEventListener('click', saveProject);

// Atalho Ctrl+S
document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        saveProject();
    }
});

// Auto-save periódico (5 segundos)
setInterval(() => {
    if (editor.value.length > 0) {
        saveProject();
    }
}, 5000);

// Inicializar
loadProject();
editor.focus();
