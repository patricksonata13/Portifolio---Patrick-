function salvarProgresso() {
    const progresso = {
        nivel: 1,
        xp: 500,
        inventario: ['Espada', 'Poção'],
        missao: 'Encontrar a chave'
    };
    localStorage.setItem('progresso', JSON.stringify(progresso));
    alert("Progresso salvo!");
}

function carregarProgresso() {
    const progresso = JSON.parse(localStorage.getItem('progresso'));
    if (progresso) {
        console.log(progresso);
        atualizarAtributos({forca: 10, agilidade: 12, inteligencia: 14, percepcao: 15, carisma: 11});
    } else {
        alert("Nenhum progresso encontrado.");
    }
}
