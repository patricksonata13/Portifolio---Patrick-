let missoes = [
    { nome: "Encontrar a chave perdida", concluida: false },
    { nome: "Derrotar o Branquelo", concluida: false },
    { nome: "Explorar a caverna", concluida: false }
];

let missaoAtual = missoes[0];  // Missão inicial

function mostrarMissao() {
    alert(`Missão Atual: ${missaoAtual.nome}`);
}

function concluirMissao() {
    if (!missaoAtual.concluida) {
        missaoAtual.concluida = true;
        alert(`${missaoAtual.nome} concluída! Você ganhou 100 XP.`);
        ganharXP(100);  // Ganhar XP por concluir a missão

        // Passar para a próxima missão
        let proximaMissao = missoes.find(missao => !missao.concluida);
        if (proximaMissao) {
            missaoAtual = proximaMissao;
        } else {
            alert("Você completou todas as missões!");
        }
    } else {
        alert("Missão já concluída!");
    }
}
