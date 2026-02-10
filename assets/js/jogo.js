const db_afro = {
    'MÃE JUREMA': "MEMÓRIA VIVA: 85 anos. Seus olhos mostram o Rio antes da queda. 'Reinventar a vida dói, mas é nossa única tecnologia'.",
    'CAPITÃO RAFA': "ESTRATEGISTA: Ex-fuzileiro. Usa 'Táticas de Favela'. Transforma sucata em defesa. 'A CDD não cai'.",
    'DRA LÍVIA': "MÉDICA DO LIXO: Cura com mofo e oração quântica. 'Faço muito com nada, mas o Axé é o que fecha a ferida'.",
    'ORIXÁ-TEC': "KAYODÊ: Circuitos de ouro na pele. Fala com máquinas pré-colapso através de cânticos Yorubá.",
    'IBEJIS': "AS GÊMEAS: Yemi (Corpo) e Toke (Espírito). Uma vê o presente físico, a outra vê o rastro dos ancestrais.",
    'BARÕES': "FACÇÃO: Controlam a água no Nova América. Relação: Tensa. Fraqueza: Seca prolongada.",
    'QUEIMADOS': "MUTANTES: Vivem no Gramacho. Trocam tecnologia de reciclagem por comida da CDD.",
    'AXÉ': "SISTEMA: Sua força vital. Aumenta ao honrar a memória e proteger as crianças da 3001."
};

function processarJogo(cmd) {
    const out = document.getElementById('log-output');
    if(!out) return;
    
    let inputUpper = cmd.toUpperCase().trim();
    let p = document.createElement('p');
    p.style.margin = "8px 0";
    p.style.borderLeft = "2px solid #ffae00";
    p.style.paddingLeft = "8px";

    if (db_afro[inputUpper]) {
        p.innerHTML = `<span style="color:#ffae00">> REGISTRO:</span> ${db_afro[inputUpper]}`;
    } else if (inputUpper === 'HELP' || inputUpper === 'AJUDA') {
        p.innerHTML = `<span style="color:#00ffff">> BIO-SCANNER:</span> Tente 'Mãe Jurema', 'Capitão Rafa', 'Ibejis', 'Orixá-Tec' ou 'Barões'.`;
    } else {
        p.innerHTML = `<span style="color:#ff4444">> SIN-417:</span> DNA não identificado. Digite 'HELP' para ver a rede de aliados.`;
    }
    
    out.appendChild(p);
    const term = document.getElementById('sin-terminal');
    term.scrollTop = term.scrollHeight;
}

document.addEventListener('keydown', function(e) {
    if (e.target.id === 'game-input' && e.key === 'Enter') {
        processarJogo(e.target.value);
        e.target.value = '';
    }
});
