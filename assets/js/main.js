document.addEventListener('DOMContentLoaded', () => {
    // Injeta o conteúdo do database.js nas folhas de roteiro ao carregar
    if (window.db) {
        if (document.getElementById('content-sobre')) {
            document.getElementById('content-sobre').innerHTML = window.db.sobre.text;
        }
        if (document.getElementById('content-perfil')) {
            document.getElementById('content-perfil').innerHTML = window.db.perfil.text;
        }
    }
});

function openTab(id) {
    const data = window.db[id];
    if (!data) return;

    const title = document.getElementById('tab-title');
    const text = document.getElementById('tab-text');
    const panel = document.getElementById('side-panel');

    title.innerText = data.title;
    text.innerHTML = data.text;
    panel.classList.add('active');
}

function closeTab() {
    document.getElementById('side-panel').classList.remove('active');
}
