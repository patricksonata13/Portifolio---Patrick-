const editor = document.getElementById('script-editor');
let saveTimeout;

// 1. Carregar roteiro do Banco de Dados ao iniciar
async function loadScript() {
    const { data: { user } } = await window.supabaseClient.auth.getUser();
    if (!user) return;

    const { data, error } = await window.supabaseClient
        .from('roteiros')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

    if (data) {
        editor.innerHTML = data.corpo;
    }
}

// 2. Salvar no Banco de Dados (com Debounce para não sobrecarregar)
async function saveToCloud() {
    const { data: { user } } = await window.supabaseClient.auth.getUser();
    if (!user) return;

    const content = editor.innerHTML;
    
    const { error } = await window.supabaseClient
        .from('roteiros')
        .upsert({ 
            user_id: user.id, 
            corpo: content,
            updated_at: new Date() 
        }, { onConflict: 'user_id' }); // Mantém um roteiro por usuário por enquanto

    if (!error) {
        console.log("Salvo na nuvem!");
    }
}

// 3. Lógica de Teclas (Tab/Enter)
editor.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        e.preventDefault();
        const selection = window.getSelection();
        const element = selection.anchorNode.parentElement;
        const types = ['slugline', 'action', 'character', 'parenthetical', 'dialogue'];
        let currentIdx = types.indexOf(element.className);
        element.className = types[(currentIdx + 1) % types.length];
    }
});

// 4. Auto-save disparado por qualquer alteração
editor.addEventListener('input', () => {
    clearTimeout(saveTimeout);
    saveTimeout = setTimeout(saveToCloud, 2000); // Salva 2 segundos após parar de digitar
});

// Inicialização
loadScript();
