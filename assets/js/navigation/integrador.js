// ========================================
// INTEGRADOR DAS FUNÇÕES EXISTENTES
// ========================================

// Sobrescrever funções originais para integração com navegação
if (typeof mostrarSobre === 'function') {
    const originalSobre = mostrarSobre;
    window.mostrarSobre = function() {
        originalSobre();
        if (window.navegacao) {
            window.navegacao.registrarNavegacao('Sobre');
        }
    };
}

if (typeof mostrarPerfil === 'function') {
    const originalPerfil = mostrarPerfil;
    window.mostrarPerfil = function() {
        originalPerfil();
        if (window.navegacao) {
            window.navegacao.registrarNavegacao('Perfil');
        }
    };
}

if (typeof mostrarTrabalho === 'function') {
    const originalTrabalho = mostrarTrabalho;
    window.mostrarTrabalho = function() {
        originalTrabalho();
        if (window.navegacao) {
            window.navegacao.registrarNavegacao('Trabalho');
            window.navegacao.mostrarBotaoVoltar(true);
        }
    };
}

if (typeof fecharTrabalho === 'function') {
    const originalFechar = fecharTrabalho;
    window.fecharTrabalho = function() {
        originalFechar();
        if (window.navegacao) {
            window.navegacao.mostrarBotaoVoltar(window.navegacao.historico.length > 0);
        }
    };
}

console.log('✅ Funções integradas com navegação global');
