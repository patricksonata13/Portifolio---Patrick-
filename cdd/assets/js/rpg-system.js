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

// Adicionar suporte a crafting e aliados no jogador padrão
if (!rpg.jogador.inventario) rpg.jogador.inventario = {};
if (!rpg.jogador.itens) rpg.jogador.itens = [];
if (!rpg.jogador.estatisticas) rpg.jogador.estatisticas = {};
if (!rpg.jogador.estatisticas.crafts) rpg.jogador.estatisticas.crafts = 0;

// Função para coletar materiais
rpg.coletarMaterial = function(material, quantidade = 1) {
    if (!this.jogador.inventario[material]) {
        this.jogador.inventario[material] = 0;
    }
    this.jogador.inventario[material] += quantidade;
    this.log(`📦 Coletou: ${material} x${quantidade}`, 'sucesso');
    this.salvarJogo();
};

// Função para coletar item craftado
rpg.coletarItem = function(itemId, quantidade = 1) {
    // Verificar se é um item especial
    const item = {
        id: itemId,
        nome: itemId.replace(/_/g, ' ').toUpperCase(),
        quantidade: quantidade
    };
    this.jogador.itens.push(item);
    this.log(`✨ Ganhou: ${item.nome}`, 'sucesso');
    this.salvarJogo();
};

// Salvar jogo automaticamente a cada minuto
setInterval(() => {
    if (window.rpg) {
        window.rpg.salvarJogo();
    }
}, 60000);
