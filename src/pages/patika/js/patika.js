// ========================================
// PATIKA - Ferramenta de Roteiro
// ========================================

console.log('✅ PATIKA carregado!');

// Cores PATIKA
const cores = {
    primary: '#6c9a8f',
    secondary: '#e0e0e0',
    dark: '#0a0a0a',
    panel: '#0f0f0f'
};

// Sistema de modos
let modoAtual = 'convidado';
let projetos = [];

function selecionarModo(modo) {
    modoAtual = modo;
    document.querySelectorAll('.modo-info').forEach(el => {
        el.style.display = 'none';
    });
    document.getElementById(`modo-${modo}`).style.display = 'block';
    console.log(`✅ Modo ${modo} selecionado`);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ PATIKA pronto para uso');
});
