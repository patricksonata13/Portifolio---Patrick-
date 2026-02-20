let inventario = ["Poção de Cura", "Escudo Mágico"];  // Adiciona itens mágicos

function adicionarItem(item) {
    inventario.push(item);
    console.log(`${item} adicionado ao inventário.`);
}

function usarItem(item) {
    if (inventario.includes(item)) {
        console.log(`Usando item: ${item}`);
        if (item === "Poção de Cura") {
            restaurarSaude(20); // Restaura 20 pontos de saúde
        } else if (item === "Escudo Mágico") {
            defender();  // Ativa a defesa
        }
        inventario.splice(inventario.indexOf(item), 1);
    } else {
        console.log("Item não encontrado no inventário.");
    }
}

function restaurarSaude(quantidade) {
    personagem.saude += quantidade;  // Restaura a saúde do personagem
    console.log(`Você usou a Poção de Cura! Saúde restaurada em ${quantidade}.`);
}

function mostrarInventario() {
    console.log("Inventário: ", inventario);
}
