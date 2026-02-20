let atributos = {
    forca: 10,
    agilidade: 12,
    inteligencia: 14,
    percepcao: 15,
    carisma: 11
};

let inimigo = {
    nome: "Branquelo",
    saude: 100,
    forca: 8,
    defesa: 5
};

let jogador = {
    saude: 100,
    inventario: ['Espada', 'Poção'],
    xp: 0
};

// Função para atacar (usando dado d20)
function atacar() {
    const dado = Math.floor(Math.random() * 20) + 1;
    const dano = atributos.forca + dado - inimigo.defesa;
    if (dano > 0) {
        inimigo.saude -= dano;
        console.log(`Ataque: ${dano} de dano. Saúde do inimigo: ${inimigo.saude}`);
        if (inimigo.saude <= 0) {
            console.log("Inimigo derrotado!");
            jogador.xp += 50;
            console.log(`Você ganhou 50 XP! XP Total: ${jogador.xp}`);
        }
    } else {
        console.log("Ataque falhou! O inimigo se defendeu.");
    }
}

// Função para usar um item
function usarItem() {
    const item = "Poção de Cura"; // Exemplo de item
    console.log(`Você usou: ${item}`);
    jogador.saude += 20; // Cura 20 de saúde
    console.log(`Sua saúde agora é: ${jogador.saude}`);
}

// Função para salvar progresso
function salvarProgresso() {
    const progresso = {
        nivel: 1,
        xp: jogador.xp,
        inventario: jogador.inventario,
        saude: jogador.saude
    };
    localStorage.setItem('progresso', JSON.stringify(progresso));
    console.log("Progresso salvo!");
}

// Função para carregar progresso
function carregarProgresso() {
    const progresso = JSON.parse(localStorage.getItem('progresso'));
    if (progresso) {
        jogador.xp = progresso.xp;
        jogador.saude = progresso.saude;
        jogador.inventario = progresso.inventario;
        console.log("Progresso carregado.");
    } else {
        console.log("Nenhum progresso encontrado.");
    }
}
