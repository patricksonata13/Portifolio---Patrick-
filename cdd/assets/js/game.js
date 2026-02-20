function salvarProgresso() {
    const progresso = {
        nivel: personagem.nivel,
        xp: personagem.xp,
        saude: personagem.saude,
        missaoAtual: missaoAtual.nome,
        inventario: inventario,
    };
    localStorage.setItem('progresso', JSON.stringify(progresso));
    alert("Progresso salvo!");
}

function carregarProgresso() {
    const progresso = JSON.parse(localStorage.getItem('progresso'));
    if (progresso) {
        personagem.nivel = progresso.nivel;
        personagem.xp = progresso.xp;
        personagem.saude = progresso.saude;
        missaoAtual = missoes.find(missao => missao.nome === progresso.missaoAtual);
        inventario = progresso.inventario;
        alert("Progresso carregado!");
    } else {
        alert("Nenhum progresso encontrado.");
    }
}
